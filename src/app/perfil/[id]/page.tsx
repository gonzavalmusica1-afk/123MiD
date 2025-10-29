
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { placeholderImages } from "@/lib/placeholder-images"
import { Loader2, AlertTriangle, Lock } from "lucide-react"
import React, { useState, useEffect, Suspense, lazy } from "react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { useParams, useSearchParams } from "next/navigation"
import { Profile } from "@/lib/profiles"

// Mock Data for the demo profile
const DemoProfileData = {
    name: "Juan Pérez (Demostración)",
    dob: "1985-04-23",
    bloodType: "O+",
    allergies: "Penicilina, Nueces",
    conditions: "Asma, Hipertensión",
    contacts: [
        { name: "Ana Pérez", relation: "Esposa", phone: "+1 (555) 123-4567" },
        { name: "Dr. Carlos Ruiz", relation: "Médico", phone: "+1 (555) 987-6543" },
    ],
    photoUrl: placeholderImages.find(p => p.id === "user-profile")?.imageUrl,
    profileType: 'person' as 'person' | 'pet'
}

const ProfileView = lazy(() => import('./ProfileView'));


function PinForm({ id, onVerified }: { id: string; onVerified: (profile: Profile) => void }) {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState(false);
    const pinFromQuery = searchParams.get('pin');
    const [accessDenied, setAccessDenied] = useState(false);
    const [errorMessage, setErrorMessage] = useState("El acceso a este perfil ha sido denegado.");

    const checkProfile = async (pin: string) => {
        setIsLoading(true);
        setAccessDenied(false);
        try {
            const response = await fetch('/api/verify-pin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, pin }),
            });

            const result = await response.json();

            if (result.success && result.profile) {
                onVerified(result.profile);
            } else {
                setAccessDenied(true);
                setErrorMessage(result.message || 'Error al verificar el perfil.');
                if(response.status !== 403 && response.status !== 404){
                     toast({ variant: "destructive", title: "Error", description: result.message || 'No se pudo verificar la pulsera.' });
                }
            }

        } catch (error: any) {
            setAccessDenied(true);
            setErrorMessage(error.message || "Ocurrió un error inesperado.");
            toast({ variant: "destructive", title: "Error de Red", description: "No se pudo conectar con el servidor." });
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        if (pinFromQuery) {
            checkProfile(pinFromQuery);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pinFromQuery, id]);


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const pin = formData.get("pin") as string;
        checkProfile(pin);
    }

    if (pinFromQuery && isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 bg-muted/40 text-center px-4">
                <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
                <h1 className="text-2xl font-bold">Verificando acceso...</h1>
                <p className="text-muted-foreground">Por favor, espera un momento.</p>
            </div>
        )
    }

    if (accessDenied && pinFromQuery) {
         return (
            <div className="flex flex-col items-center justify-center min-h-[calc(100vh-10rem)] py-12 bg-muted/40 text-center px-4">
                 <AlertTriangle className="h-12 w-12 text-destructive mb-4" />
                <h1 className="text-2xl font-bold">Acceso Denegado</h1>
                <p className="text-muted-foreground max-w-md">{errorMessage}</p>
                 <Button asChild className="mt-6">
                    <Link href="/">Volver al Inicio</Link>
                </Button>
            </div>
        )
    }

    // This form is shown if there is no PIN in the URL, or if there was an error
    // and the user needs to retry.
    return (
        <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12 bg-muted/40 px-4">
            <Card className="mx-auto max-w-sm w-full">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl font-headline flex items-center justify-center gap-2"><Lock className="h-6 w-6"/> Acceso al Perfil</CardTitle>
                    <CardDescription>
                        Para ver el perfil <span className="font-bold">{id.toUpperCase()}</span>, ingresa el PIN de 4 dígitos.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     {accessDenied && !pinFromQuery && (
                        <div className="bg-destructive/10 text-destructive text-sm rounded-md p-3 text-center mb-4">
                           {errorMessage}
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="pin">PIN de Seguridad</Label>
                            <Input
                                id="pin"
                                name="pin"
                                type="password"
                                placeholder="****"
                                maxLength={4}
                                required
                                disabled={isLoading}
                                autoFocus
                            />
                        </div>
                        <div className="flex flex-col gap-2 mt-2">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? <Loader2 className="animate-spin"/> : 'Acceder al Perfil'}
                            </Button>
                            <Button variant="outline" asChild>
                                <Link href="/">Volver al Inicio</Link>
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

function PublicProfilePageContent() {
    const params = useParams<{ id: string }>();
    const [verifiedProfile, setVerifiedProfile] = useState<Profile | null>(null);
    const id = params?.id || '';

    if (id === 'demostracion') {
        const demoData: Partial<Profile> = DemoProfileData;
        return <ProfileView profile={demoData} />
    }
  
    if (verifiedProfile) {
      return <ProfileView profile={verifiedProfile} />;
    }

    return <PinForm id={id} onVerified={setVerifiedProfile} />;
}


export default function PublicProfilePage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-[calc(100vh-10rem)]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        }>
            <PublicProfilePageContent />
        </Suspense>
    )
}
