
"use client"

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud, User, Dog, Trash2, Loader2 } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "./ui/alert-dialog";
import { useProfiles } from "@/context/ProfileContext";
import { useUser, useStorage } from "@/firebase";
import { useToast } from "@/hooks/use-toast";
import { uploadProfilePicture } from "@/lib/storageUtils";
import { Profile } from "@/lib/profiles";

interface ProfileFormProps {
    profile: Partial<Profile>;
    onSave: () => void;
    onDelete?: () => void;
    isEditMode: boolean;
}

export default function ProfileForm({
    profile,
    onSave,
    onDelete,
    isEditMode
}: ProfileFormProps) {
    const { updateProfile } = useProfiles();
    const { user } = useUser();
    const storage = useStorage();
    const { toast } = useToast();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [profileType, setProfileType] = useState<'person' | 'pet'>(profile?.profileType || 'person');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(profile?.photoUrl || null);

    useEffect(() => {
        // Update local state if the profile prop changes
        setProfileType(profile?.profileType || 'person');
        setImagePreview(profile?.photoUrl || null);
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user || !storage || !profile.id) return;

        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        
        let photoUrl = profile.photoUrl || '';

        try {
            if (imageFile) {
                photoUrl = await uploadProfilePicture(storage, user, profile.id, imageFile, profile.photoUrl);
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
                }].filter(c => c.name || c.phone) // Filter out empty contacts
            };

            await updateProfile(profile.id, updatedData);
            
            toast({ 
                title: isEditMode ? "Perfil Actualizado" : "Perfil Configurado", 
                description: isEditMode ? "Tus cambios han sido guardados." : "Tu pulsera está lista y ha sido añadida a tu panel." 
            });

            onSave();

        } catch (error: any) {
            toast({ variant: "destructive", title: "Error al Guardar", description: error.message || "No se pudo guardar el perfil." });
        } finally {
            setIsSubmitting(false);
        }
    }


    return (
        <form onSubmit={handleSubmit}>
            <div className="grid flex-1 items-start gap-4 md:grid-cols-1 lg:grid-cols-[2fr_1fr] md:gap-8">
                <div className="grid auto-rows-max items-start gap-4 md:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Información del Perfil</CardTitle>
                            <CardDescription>Esta información será visible en caso de emergencia si el perfil es público.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Nombre Completo</Label>
                                <Input name="name" id="name" type="text" className="w-full" defaultValue={profile?.name === 'Sin Perfil' || profile?.name === "Nuevo Perfil" ? '' : profile?.name} required />
                            </div>
                            
                            <div className="grid gap-3">
                                <Label>Foto de Perfil (Opcional)</Label>
                                <div className="flex items-center gap-4">
                                    <Avatar className="h-20 w-20">
                                        <AvatarImage src={imagePreview || undefined} alt="Foto de perfil" />
                                        <AvatarFallback>{profile?.name?.substring(0,2).toUpperCase() || 'AV'}</AvatarFallback>
                                    </Avatar>
                                    <Label htmlFor="photo-upload" className="cursor-pointer">
                                        <div className="flex items-center gap-2 border rounded-md px-3 py-2 text-sm hover:bg-accent">
                                            <UploadCloud className="h-4 w-4" />
                                            {isSubmitting ? 'Subiendo...' : 'Cambiar Foto'}
                                        </div>
                                    </Label>
                                    <Input name="photo" id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} disabled={isSubmitting}/>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="grid gap-3">
                                    <Label htmlFor="dob">{profileType === 'pet' ? 'Fecha de Nacimiento / Adopción' : 'Fecha de Nacimiento'}</Label>
                                    <Input name="dob" id="dob" type="date" defaultValue={profile?.dob} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="blood-type">{profileType === 'pet' ? 'Especie y Raza' : 'Tipo de Sangre'}</Label>
                                    <Input name="blood-type" id="blood-type" type="text" placeholder={profileType === 'pet' ? 'Ej: Perro, Golden Retriever' : 'Ej: O+'} defaultValue={profile?.bloodType} />
                                </div>
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="allergies">Alergias</Label>
                                <Textarea name="allergies" id="allergies" defaultValue={profile?.allergies} placeholder="Ej: Penicilina, Nueces, Polen..." />
                            </div>

                            <div className="grid gap-3">
                                <Label htmlFor="conditions">Condiciones Médicas {profileType === 'pet' && 'o Comportamiento'}</Label>
                                <Textarea name="conditions" id="conditions" defaultValue={profile?.conditions} placeholder="Ej: Asma, Diabetes, Ansiedad por separación..." />
                            </div>

                            <div className="grid gap-3">
                                <Label>Contacto de Emergencia {profileType === 'pet' && '/ Veterinario'}</Label>
                                <div className="grid gap-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                        <Input name="contact-name-1" type="text" placeholder="Nombre del contacto" defaultValue={profile?.contacts?.[0]?.name} />
                                        <Input name="contact-relation-1" type="text" placeholder="Relación" defaultValue={profile?.contacts?.[0]?.relation} />
                                        <Input name="contact-phone-1" type="tel" placeholder="Teléfono" defaultValue={profile?.contacts?.[0]?.phone} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid auto-rows-max items-start gap-4 md:gap-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Configuración {isEditMode && "del Perfil"}</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-6">
                            <div className="grid gap-3">
                                <Label>Tipo de Perfil</Label>
                                <RadioGroup name="profileType" value={profileType} onValueChange={(value) => setProfileType(value as 'person' | 'pet')} className="flex gap-4">
                                    <div aria-label="Persona" className="flex flex-1 items-center justify-center gap-2 border rounded-md p-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent cursor-pointer">
                                        <RadioGroupItem value="person" id="person" />
                                        <Label htmlFor="person" className="cursor-pointer flex items-center gap-2">
                                            <User className="h-5 w-5" />
                                            Persona
                                        </Label>
                                    </div>
                                    <div aria-label="Mascota" className="flex flex-1 items-center justify-center gap-2 border rounded-md p-3 has-[[data-state=checked]]:border-primary has-[[data-state=checked]]:bg-accent cursor-pointer">
                                        <RadioGroupItem value="pet" id="pet" />
                                        <Label htmlFor="pet" className="cursor-pointer flex items-center gap-2">
                                            <Dog className="h-5 w-5" />
                                            Mascota
                                        </Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <div className="grid gap-3">
                                <Label>Privacidad del Perfil</Label>
                                <RadioGroup name="privacy" defaultValue={profile?.privacy || "public"} className="flex flex-col gap-2">
                                    <div className="flex items-center gap-2">
                                        <RadioGroupItem value="public" id="public" />
                                        <Label htmlFor="public" className="text-sm font-normal cursor-pointer">
                                            Público (Recomendado)
                                        </Label>
                                    </div>
                                    <p className="text-xs text-muted-foreground ml-6">Cualquier persona con el ID y PIN puede ver la información.</p>

                                    <div className="flex items-center gap-2 mt-2">
                                        <RadioGroupItem value="private" id="private" />
                                        <Label htmlFor="private" className="text-sm font-normal cursor-pointer">
                                            Privado
                                        </Label>
                                    </div>
                                    <p className="text-xs text-muted-foreground ml-6">Solo tú puedes ver y gestionar la información del perfil.</p>
                                </RadioGroup>
                            </div>
                            <div className="grid gap-2">
                                <Button size="lg" className="w-full" type="submit" disabled={isSubmitting}>
                                    {isSubmitting ? <Loader2 className="animate-spin" /> : isEditMode ? "Guardar Cambios" : "Guardar y Finalizar"}
                                </Button>
                                
                                {isEditMode ? (
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" size="sm" className="gap-2 mt-4" type="button">
                                                <Trash2 className="h-4 w-4"/>
                                                Desvincular Pulsera
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                            <AlertDialogTitle>¿Desvincular pulsera?</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Esta acción no se puede deshacer. La pulsera <span className="font-semibold text-primary">{profile?.id?.toUpperCase()}</span> será desvinculada de tu cuenta y sus datos de perfil se reiniciarán.
                                                Podrás volver a registrarla en el futuro si lo necesitas.
                                            </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={onDelete}>Confirmar y Desvincular</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                ) : (
                                    <Button variant="outline" size="lg" asChild type="button">
                                       <Link href="/dashboard">Cancelar</Link>
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </form>
    );
}
