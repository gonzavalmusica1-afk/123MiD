
"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Profile } from '@/lib/profiles';
import { useUser, useFirestore, useStorage, useMemoFirebase } from '@/firebase';
import { collection, query, where, doc, updateDoc, Firestore } from 'firebase/firestore';
import { useCollection } from '@/firebase/firestore/use-collection';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { claimBracelet as claimBraceletService } from '@/lib/services/bracelets';
import { ref, deleteObject } from 'firebase/storage';

interface ProfileContextType {
    profiles: Profile[];
    loadingProfiles: boolean;
    getProfileById: (id: string) => Profile | undefined;
    claimBracelet: (id: string, pin: string) => Promise<{ success: boolean; message: string; id?: string, code?: string }>;
    updateProfile: (id: string, updatedData: Partial<Profile>) => Promise<void>;
    addProfile: (newProfile: Profile) => void;
    deleteProfile: (id: string) => Promise<void>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export function ProfileProvider({ children }: { children: ReactNode }) {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const storage = useStorage();
    const [profiles, setProfiles] = useState<Profile[]>([]);
    
    const userBraceletsQuery = useMemoFirebase(() => {
        if (!firestore || !user?.uid) {
            return null;
        }
        return query(collection(firestore, "bracelets"), where("userId", "==", user.uid));
    }, [firestore, user?.uid]);

    const { data: userBracelets, isLoading: collectionIsLoading } = useCollection<Profile>(userBraceletsQuery);

    useEffect(() => {
        if (userBracelets) {
             const mappedProfiles = userBracelets.map(b => ({
                ...b,
                id: b.id,
                status: b.privacy === 'public' ? 'Público' : (b.privacy === 'private' ? 'Privado' : 'Sin configurar'),
                type: b.profileType || 'unconfigured'
            }));
            setProfiles(mappedProfiles);
        } else if (!isUserLoading && !user) {
            setProfiles([]);
        }
    }, [userBracelets, user, isUserLoading]);


    const getProfileById = (id: string) => {
        return profiles.find(p => p.id.toLowerCase() === id.toLowerCase());
    };

    const claimBracelet = async (id: string, pin: string): Promise<{ success: boolean; message: string; id?: string, code?: string }> => {
        if (!user || !firestore) {
            return { success: false, message: "Usuario no autenticado." };
        }
        try {
            return await claimBraceletService(firestore, id.toUpperCase(), user.uid, pin);
        } catch (error: any) {
            return { success: false, message: error.message || "Ocurrió un error desconocido." };
        }
    };
    
    const addProfile = (newProfile: Profile) => {
        // This might be used for creating profiles directly without a bracelet
    };

    const updateProfile = async (id: string, updatedData: Partial<Omit<Profile, 'id' | 'pin'>>) => {
        if (!user || !firestore) return;
        const braceletRef = doc(firestore, "bracelets", id.toUpperCase());
        
        const dataToUpdate = {
            ...updatedData,
            userId: user.uid, // Ensure userId is always present for security rules
        };
        
        updateDoc(braceletRef, dataToUpdate).catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: braceletRef.path,
                operation: 'update',
                requestResourceData: dataToUpdate,
            });
            errorEmitter.emit('permission-error', permissionError);
        });
    };

    const deleteProfile = async (id: string) => {
        if (!user || !firestore || !storage) return;

        const profileToUnclaim = profiles.find(p => p.id.toLowerCase() === id.toLowerCase());
        
        if (profileToUnclaim?.photoUrl && profileToUnclaim.photoUrl.includes('firebasestorage.googleapis.com')) {
            try {
                const imageRef = ref(storage, profileToUnclaim.photoUrl);
                await deleteObject(imageRef);
            } catch (error: any) {
                if (error.code !== 'storage/object-not-found') {
                    console.warn("Could not delete profile picture on unclaim: ", error);
                }
            }
        }
        
        const braceletRef = doc(firestore, "bracelets", id.toUpperCase());

        const dataToUpdate = {
             userId: null,
             claimed: false,
             name: "Sin Perfil",
             status: "Sin configurar",
             type: "unconfigured",
             profileType: null,
             photoUrl: null,
             dob: null,
             bloodType: null,
             allergies: null,
             conditions: null,
             contacts: [],
             privacy: "public",
        }

        updateDoc(braceletRef, dataToUpdate).catch(serverError => {
            const permissionError = new FirestorePermissionError({
                path: braceletRef.path,
                operation: 'update',
                requestResourceData: dataToUpdate
            });
            errorEmitter.emit('permission-error', permissionError);
        });
    }

    const loadingProfiles = isUserLoading || (!!user && collectionIsLoading);

    return (
        <ProfileContext.Provider value={{ profiles, loadingProfiles, getProfileById, claimBracelet, updateProfile, addProfile, deleteProfile }}>
            {children}
        </ProfileContext.Provider>
    );
}

export function useProfiles() {
    const context = useContext(ProfileContext);
    if (context === undefined) {
        throw new Error('useProfiles must be used within a ProfileProvider');
    }
    return context;
}
