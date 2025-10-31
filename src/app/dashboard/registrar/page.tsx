
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useProfiles } from "@/context/ProfileContext"
import React, { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Loader2, ChevronRight } from "lucide-react"
import { useUser, useStorage } from "@/firebase"
import type { Profile } from "@/lib/profiles"
import LegalStep from "./legal"
import ProfileForm from "@/components/ProfileForm"
import { uploadProfilePicture } from "@/lib/storageUtils"

export default function RegisterBraceletPage() {
    const router = useRouter();
    const { claimBracelet, updateProfile } = useProfiles();
    const { user } = useUser();
    const storage = useStorage();
    const { toast } = useToast();

    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    const [step, setStep] = useState<'claim' | 'legal' | 'edit'>('claim');
    const [claimedProfile, setClaimedProfile] = useState<Profile | null>(null);
    const [profileType, setProfileType] = useState<'person' | 'pet'>('person');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);


    const handleClaimSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.currentTarget);
        const id = (formData.get("id") as string).toUpperCase();
        const pin = formData.get("pin") as string;

        try {
            const result = await claimBracelet(id, pin);
            
            if (result.success && result.id) {
                toast({ title: "Pulsera Verificada", description: "Ahora puedes completar los datos del perfil." });
                const newProfile: Profile = {
                    id: result.id,
                    pin: pin,
                    name: "Nuevo Perfil",
                    status: "Sin configurar",
                    type: "unconfigured",
                    privacy: "public",
                    userId: user?.uid,
                }
                setClaimedProfile(newProfile);
                setStep('legal');
            } else {
                 if (result.code === 'ALREADY_OWNED' && result.id) {
                    toast({
                        title: "Pulsera ya registrada",
                        description: "Ya eres dueño de esta pulsera. Te redirigimos para que la edites.",
                    });
                    router.push(`/dashboard/perfil/${result.id.toLowerCase()}/editar`);
                    return;
                }
                 toast({ variant: "destructive", title: "Error al registrar", description: result.message });
            }
        } catch (error: any) {
             toast({ variant: "destructive", title: "Error", description: error.message || "No se pudo verificar la pulsera." });
        } finally {
            setIsLoading(false);
        }
    }

    const handleLegalAccept = () => {
        setProfileType('person');
        setStep('edit');
    };
    
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


    const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!claimedProfile || !user || !storage) return;
        
        setIsSubmitting(true);
        
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        let photoUrl = '';

        try {
            if (imageFile) {
                photoUrl = await uploadProfilePicture(storage, user, claimedProfile.id, imageFile);
            }

            const updatedData = {
                name: data.name as string,
                profileType: data.profileType as 'person' | 'pet',
                type: data.profileType as 'person' | 'pet',
                status: "Público",
                photoUrl: photoUrl || null,
                dob: data.dob as string,
                bloodType: data['blood-type'] as string,
                allergies: data.allergies as string,
                conditions: data.conditions as string,
                privacy: data.privacy as 'public' | 'private',
                contacts: [{
                    name: data['contact-name-1'] as string,
                    relation: data['contact-relation-1'] as string,
                    phone: data['contact-phone-1'] as string
                }].filter(c => c.name || c.phone)
            };

            await updateProfile(claimedProfile.id, updatedData);
            toast({ title: "Perfil Configurado", description: "Tu pulsera está lista y ha sido añadida a tu panel." });
            router.push('/dashboard');
        } catch (error: any) {
            toast({ variant: "destructive", title: "Error al guardar", description: error.message || "No se pudo guardar el perfil." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const isSaving = isLoading || isSubmitting;


    return (
        <div className="flex flex-col items-center justify-start min-h-[calc(100vh-10rem)] py-8 bg-muted/40 px-4">
            <div className="w-full max-w-4xl">
                 <div className="mb-8 flex justify-start">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Link href="/dashboard" className="hover:text-foreground">Panel</Link>
                        <ChevronRight className="h-4 w-4" />
                        <span className="font-medium text-foreground">
                            {step === 'claim' && 'Registrar Pulsera'}
                            {step === 'legal' && 'Términos y Condiciones'}
                            {step === 'edit' && `Configurar Perfil (${claimedProfile?.id})`}
                        </span>
                    </div>
                </div>

                {step === 'claim' && (
                     <Card className="mx-auto max-w-sm w-full">
                        <CardHeader>
                            <CardTitle className="text-2xl font-headline">Registrar Nueva Pulsera</CardTitle>
                            <CardDescription>
                                Ingresa el ID y PIN que se encuentran en tu pulsera 123MiD para vincularla a tu cuenta.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleClaimSubmit} className="grid gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="id">ID de la Pulsera</Label>
                                    <Input
                                        id="id"
                                        name="id"
                                        type="text"
                                        placeholder="AV-XXXXX"
                                        required
                                        disabled={isLoading}
                                        autoCapitalize="characters"
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="pin">PIN de Seguridad (4 dígitos)</Label>
                                    <Input id="pin" name="pin" type="text" placeholder="XXXX" required disabled={isLoading} />
                                </div>
                                <div className="flex flex-col gap-2 mt-2">
                                    <Button type="submit" className="w-full" disabled={isLoading}>
                                        {isLoading ? <Loader2 className="animate-spin" /> : "Verificar y Continuar"}
                                    </Button>
                                    <Button variant="outline" asChild>
                                        <Link href="/dashboard">Cancelar</Link>
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {step === 'legal' && <LegalStep onAccept={handleLegalAccept} />}


                {step === 'edit' && claimedProfile && (
                    <>
                        <div className="mb-6 text-center">
                            <h1 className="text-2xl font-bold font-headline">Pulsera Verificada: Configura el Perfil</h1>
                            <p className="text-muted-foreground">Estás configurando la pulsera <span className="font-semibold text-primary">{claimedProfile.id}</span>. Completa los datos a continuación.</p>
                        </div>
                        <ProfileForm
                            profile={claimedProfile}
                            isSubmitting={isSubmitting}
                            imagePreview={imagePreview}
                            profileType={profileType}
                            onImageChange={handleImageChange}
                            onProfileTypeChange={setProfileType}
                            onSubmit={handleEditSubmit}
                            isEditMode={false}
                        />
                    </>
                )}

            </div>
        </div>
    )
}
