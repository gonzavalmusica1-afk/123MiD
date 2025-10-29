
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UploadCloud, User, Dog, Trash2, Loader2, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from "react";
import { useProfiles } from "@/context/ProfileContext";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { useToast } from "@/hooks/use-toast";
import { useUser, useStorage } from "@/firebase";

export default function EditProfilePage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const { getProfileById, updateProfile, deleteProfile } = useProfiles();
    const { user } = useUser();
    const storage = useStorage();
    const { toast } = useToast();
    
    const id = params.id;
    const profile = getProfileById(id);

    const [profileType, setProfileType] = useState(profile?.profileType || 'person');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(profile?.photoUrl || null);
    const [isUploading, setIsUploading] = useState(false);
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
            setIsUploading(true);
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
                setIsUploading(false);
                return;
            }
            setIsUploading(false);
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
    const isSaving = isSubmitting || isUploading;

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
                <form onSubmit={handleSubmit}>
                    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:grid-cols-1 lg:grid-cols-[2fr_1fr] md:gap-8">
                        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Información del Perfil</CardTitle>
                                    <CardDescription>Esta información será visible en caso de emergencia si el perfil es público.</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label htmlFor="name">Nombre Completo</Label>
                                        <Input name="name" id="name" type="text" className="w-full" defaultValue={profile.name === 'Sin Perfil' ? '' : profile.name} required />
                                    </div>
                                    
                                    <div className="grid gap-3">
                                        <Label>Foto de Perfil</Label>
                                        <div className="flex items-center gap-4">
                                            <Avatar className="h-20 w-20">
                                                <AvatarImage src={imagePreview || undefined} alt="Foto de perfil" />
                                                <AvatarFallback>{profile.name?.substring(0,2).toUpperCase() || 'AV'}</AvatarFallback>
                                            </Avatar>
                                            <Label htmlFor="photo-upload" className="cursor-pointer">
                                                <div className="flex items-center gap-2 border rounded-md px-3 py-2 text-sm hover:bg-accent">
                                                    <UploadCloud className="h-4 w-4" />
                                                    {isUploading ? 'Subiendo...' : 'Cambiar Foto'}
                                                </div>
                                            </Label>
                                            <Input name="photo" id="photo-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} disabled={isSaving}/>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="grid gap-3">
                                            <Label htmlFor="dob">{profileType === 'pet' ? 'Fecha de Nacimiento / Adopción' : 'Fecha de Nacimiento'}</Label>
                                            <Input name="dob" id="dob" type="date" defaultValue={profile.dob} />
                                        </div>
                                        <div className="grid gap-3">
                                            <Label htmlFor="blood-type">{profileType === 'pet' ? 'Especie y Raza' : 'Tipo de Sangre'}</Label>
                                            <Input name="blood-type" id="blood-type" type="text" placeholder={profileType === 'pet' ? 'Ej: Perro, Golden Retriever' : 'Ej: O+'} defaultValue={profile.bloodType} />
                                        </div>
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="allergies">Alergias</Label>
                                        <Textarea name="allergies" id="allergies" defaultValue={profile.allergies} placeholder="Ej: Penicilina, Nueces, Polen..." />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label htmlFor="conditions">Condiciones Médicas {profileType === 'pet' && 'o Comportamiento'}</Label>
                                        <Textarea name="conditions" id="conditions" defaultValue={profile.conditions} placeholder="Ej: Asma, Diabetes, Ansiedad por separación..." />
                                    </div>

                                    <div className="grid gap-3">
                                        <Label>Contacto de Emergencia {profileType === 'pet' && '/ Veterinario'}</Label>
                                        <div className="grid gap-4">
                                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                                <Input name="contact-name-1" type="text" placeholder="Nombre del contacto" defaultValue={profile.contacts?.[0]?.name} />
                                                <Input name="contact-relation-1" type="text" placeholder="Relación" defaultValue={profile.contacts?.[0]?.relation} />
                                                <Input name="contact-phone-1" type="tel" placeholder="Teléfono" defaultValue={profile.contacts?.[0]?.phone} />
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="grid auto-rows-max items-start gap-4 md:gap-8">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Configuración del Perfil</CardTitle>
                                </CardHeader>
                                <CardContent className="grid gap-6">
                                    <div className="grid gap-3">
                                        <Label>Tipo de Perfil</Label>
                                        <RadioGroup name="profileType" value={profileType} onValueChange={setProfileType} className="flex gap-4">
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
                                        <RadioGroup name="privacy" defaultValue={profile.privacy || "public"} className="flex flex-col gap-2">
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
                                        <Button size="lg" className="w-full" type="submit" disabled={isSaving}>
                                            {isSaving ? <Loader2 className="animate-spin" /> : "Guardar Cambios"}
                                        </Button>
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
                                                    Esta acción no se puede deshacer. La pulsera <span className="font-semibold text-primary">{id.toUpperCase()}</span> será desvinculada de tu cuenta y sus datos de perfil se reiniciarán.
                                                    Podrás volver a registrarla en el futuro si lo necesitas.
                                                </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={handleDelete}>Confirmar y Desvincular</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
