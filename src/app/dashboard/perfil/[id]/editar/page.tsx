
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { useProfiles } from "@/context/ProfileContext";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useToast } from "@/hooks/use-toast";
import { useUser, useStorage } from "@/firebase";
import ProfileForm from "@/components/ProfileForm";

export default function EditProfilePage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const { getProfileById, updateProfile, deleteProfile } = useProfiles();
    const { user } = useUser();
    const storage = useStorage();
    const { toast } = useToast();
    
    const id = params.id;
    const profile = getProfileById(id);

    const [profileType, setProfileType] = useState<'person' | 'pet'>('person');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (profile) {
            setProfileType(profile.profileType || 'person');
            if (profile.photoUrl) {
                setImagePreview(profile.photoUrl);
            }
        }
    }, [profile]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                toast({ variant: "destructive", title: "Imagen demasiado grande", description: "La imagen no puede pesar más de 5MB." });
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };
    
    if (!profile) {
        return (
            <div className="flex min-h-[calc(100vh-10rem)] w-full flex-col items-center justify-center bg-muted/40 p-4">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Perfil no encontrado</CardTitle>
                        <CardDescription>No pudimos encontrar un perfil con el ID <span className="font-semibold text-primary">{id.toUpperCase()}</span> en tu cuenta.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button asChild>
                            <Link href="/dashboard">Volver al Panel</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        let photoUrl = profile.photoUrl || '';

        if (imageFile && user && storage) {
            // Delete old picture if it exists and it's a firebase storage url
            if (profile.photoUrl && profile.photoUrl.includes('firebasestorage.googleapis.com')) {
                try {
                    const oldImageRef = ref(storage, profile.photoUrl);
                    await deleteObject(oldImageRef);
                } catch (error: any) {
                    // It's not critical if the old image fails to delete, so we just log it
                    if (error.code !== 'storage/object-not-found') {
                       console.warn("Could not delete old profile picture: ", error);
                    }
                }
            }

            const storageRef = ref(storage, `profile_pictures/${user.uid}/${id.toUpperCase()}_${Date.now()}`);
            try {
                const snapshot = await uploadBytes(storageRef, imageFile);
                photoUrl = await getDownloadURL(snapshot.ref);
            } catch (error) {
                console.error("Error uploading image: ", error);
                toast({ variant: "destructive", title: "Error al subir imagen", description: "No se pudo subir la nueva imagen. Inténtalo de nuevo." });
                setIsSubmitting(false);
                return;
            }
        }

        const updatedData = {
            name: data.name as string,
            profileType: data.profileType as 'person' | 'pet',
            photoUrl: photoUrl,
            dob: data.dob as string,
            bloodType: data['blood-type'] as string,
            allergies: data.allergies as string,
            conditions: data.conditions as string,
            privacy: data.privacy as 'public' | 'private',
            contacts: [{
                name: data['contact-name-1'] as string,
                relation: data['contact-relation-1'] as string,
                phone: data['contact-phone-1'] as string
            }].filter(c => c.name || c.phone) // Filter out empty contacts
        };

        await updateProfile(id, updatedData);
        toast({ title: "Perfil Actualizado", description: "Tus cambios han sido guardados." });
        setIsSubmitting(false);
        router.push('/dashboard');
    }

    const handleDelete = async () => {
        await deleteProfile(id);
        toast({ title: "Perfil Desvinculado", description: `La pulsera ${id.toUpperCase()} ha sido desvinculada de tu cuenta.` });
        router.push('/dashboard');
    }

    return (
        <div className="flex min-h-[calc(100vh-10rem)] w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4">
                <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                     <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/dashboard" className="hover:text-foreground">Panel</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="font-medium text-foreground">Editar Perfil ({id.toUpperCase()})</span>
                    </div>
                </header>
                <div className="p-4 sm:px-6 sm:py-0">
                    <ProfileForm 
                        profile={profile}
                        isSubmitting={isSubmitting}
                        imagePreview={imagePreview}
                        imageFile={imageFile}
                        profileType={profileType}
                        onImageChange={handleImageChange}
                        onProfileTypeChange={setProfileType}
                        onSubmit={handleSubmit}
                        onDelete={handleDelete}
                        isEditMode={true}
                    />
                </div>
            </div>
        </div>
    )
}
