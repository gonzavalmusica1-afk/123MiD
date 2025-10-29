
"use client"

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Shield, ShieldCheck, ShieldQuestion, Loader2, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useProfiles } from "@/context/ProfileContext";
import { placeholderImages } from "@/lib/placeholder-images";
import { useEffect, useState } from "react";

const statusIcons: { [key: string]: React.ReactNode } = {
    "Público": <ShieldCheck className="h-5 w-5 text-green-600" />,
    "Privado": <Shield className="h-5 w-5 text-primary" />,
    "Sin configurar": <ShieldQuestion className="h-5 w-5 text-gray-500" />,
}

export default function DashboardPage() {
    const { profiles, loadingProfiles } = useProfiles();
    const [isClient, setIsClient] = useState(false);
    const userImage = placeholderImages.find(p => p.id === "user-profile");
    const petImage = placeholderImages.find(p => p.id === "pet-profile");

    useEffect(() => {
        setIsClient(true);
    }, []);
    
    return (
        <div className="flex min-h-[calc(100vh-10rem)] flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 bg-muted/40">
            <div className="max-w-6xl mx-auto w-full">
                <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">Mi Panel</h1>
                        <p className="text-muted-foreground">Gestiona tus perfiles de emergencia 123MiD.</p>
                    </div>
                    <Button asChild className="w-full sm:w-auto">
                        <Link href="/dashboard/registrar">
                            <Plus className="mr-2" />
                            Registrar Nueva Pulsera
                        </Link>
                    </Button>
                </header>

                <div className="grid gap-4">
                    
                    {!isClient || loadingProfiles ? (
                         <div className="flex justify-center items-center py-20">
                            <Loader2 className="h-10 w-10 animate-spin text-primary" />
                         </div>
                    ) : profiles.length > 0 ? (
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {profiles.map(bracelet => {
                                const fallbackImage = bracelet.profileType === 'pet' ? petImage : userImage;
                                const imageUrl = bracelet.photoUrl || fallbackImage?.imageUrl;
                                const imageHint = bracelet.photoUrl ? bracelet.name : fallbackImage?.imageHint;
                                return (
                                <Card key={bracelet.id} className="flex flex-col transition-all hover:shadow-md">
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <div className="flex items-center gap-3">
                                            {bracelet.type !== 'unconfigured' && (
                                                <Avatar>
                                                    <AvatarImage src={imageUrl} alt={bracelet.name} data-ai-hint={imageHint} />
                                                    <AvatarFallback>{bracelet.name?.substring(0, 2) || 'AV'}</AvatarFallback>
                                                </Avatar>
                                            )}
                                            <CardTitle className="text-base font-medium">{bracelet.name}</CardTitle>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                            {statusIcons[bracelet.status]}
                                            <span>{bracelet.status}</span>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow flex flex-col justify-between">
                                        <div>
                                            <div className="text-lg font-bold font-mono tracking-wider">{bracelet.id}</div>
                                            <p className="text-xs text-muted-foreground">
                                                {bracelet.type === 'unconfigured' ? 'Perfil sin configurar' : (bracelet.type === 'pet' ? 'Mascota' : 'Persona')}
                                            </p>
                                        </div>
                                        <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                                            <Link href={`/dashboard/perfil/${bracelet.id.toLowerCase()}/editar`}>
                                                {bracelet.type === "unconfigured" ? 'Configurar Perfil' : 'Editar Perfil'}
                                                <ArrowRight className="ml-2"/>
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            )})}
                        </div>
                    ) : (
                        <div className="text-center py-20 bg-background rounded-lg border-2 border-dashed">
                             <h3 className="text-xl font-semibold">No tienes pulseras registradas</h3>
                             <p className="text-muted-foreground mt-2 mb-4">Cuando registres una pulsera, aparecerá aquí.</p>
                             <Button asChild>
                                <Link href="/dashboard/registrar">
                                    <Plus className="mr-2" />
                                    Registrar mi Primera Pulsera
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

