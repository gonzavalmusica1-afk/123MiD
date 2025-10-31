
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from 'next/navigation';
import { useProfiles } from "@/context/ProfileContext";
import { useToast } from "@/hooks/use-toast";
import ProfileForm from "@/components/ProfileForm";

export default function EditProfilePage() {
    const router = useRouter();
    const params = useParams<{ id: string }>();
    const { getProfileById, deleteProfile } = useProfiles();
    const { toast } = useToast();
    
    const id = params.id;
    const profile = getProfileById(id);

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

    const handleDelete = async () => {
        if (!profile) return;
        await deleteProfile(profile.id);
        toast({ title: "Perfil Desvinculado", description: `La pulsera ${profile.id.toUpperCase()} ha sido desvinculada de tu cuenta.` });
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
                        onDelete={handleDelete}
                        onSave={() => router.push('/dashboard')}
                        isEditMode={true}
                    />
                </div>
            </div>
        </div>
    )
}
