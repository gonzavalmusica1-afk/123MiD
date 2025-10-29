
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { CheckCircle, HeartPulse, PawPrint, Search, Loader2, Plus, ShieldCheck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/placeholder-images";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from 'react';

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === "hero");
  const braceletImage = placeholderImages.find(p => p.id === "bracelet");
  const router = useRouter();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [braceletId, setBraceletId] = useState('');
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);

  const handleIdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const id = (formData.get("id") as string)?.trim();

    if (!id) {
      toast({
        variant: "destructive",
        title: "ID Requerido",
        description: "Por favor, ingresa el ID de la pulsera.",
      });
      return;
    }
    
    setBraceletId(id.toLowerCase());
    setIsPinModalOpen(true);
  };
  
  const handlePinSubmit = (pin: string) => {
    setIsLoading(true);
    setIsPinModalOpen(false);
    // Redirect to the profile page with the PIN as a query parameter
    // The profile page will handle the verification logic
    router.push(`/perfil/${braceletId}?pin=${pin}`);
  };


  return (
    <div className="flex flex-col min-h-[100dvh]">

      {/* HERO */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-accent">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            {heroImage && (
              <Image
                alt="Hero"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover sm:w-full lg:order-last lg:aspect-square"
                data-ai-hint={heroImage.imageHint}
                height={600}
                src={heroImage.imageUrl}
                width={600}
                priority
              />
            )}
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Información que Salva Vidas, al Instante
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  123MiD te conecta con tu información médica crucial en momentos de emergencia.
                  Una solución simple y segura para ti, tu familia y tus mascotas.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/signup">Crear mi Cuenta Gratis</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/perfil/demostracion">Ver Perfil de Muestra</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🚑 ACCESO PARA RESCATISTAS */}
      <section id="rescuer" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
        <div className="container px-4 md:px-6">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 font-headline">
                <Search className="h-6 w-6 text-primary" />
                Acceso para Rescatistas
              </CardTitle>
              <CardDescription>
                ¿Encontraste a alguien con una pulsera 123MiD? Ingresa su ID para acceder al perfil de emergencia.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={handleIdSubmit}
                className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2"
              >
                <div className="grid gap-1.5 flex-grow w-full">
                  <Label htmlFor="rescuer-id">ID de la Pulsera</Label>
                  <Input id="rescuer-id" name="id" type="text" placeholder="AV-XXXXX" disabled={isLoading} />
                </div>
                <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
                   {isLoading ? <Loader2 className="animate-spin" /> : "Buscar"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* PIN Modal */}
      <Dialog open={isPinModalOpen} onOpenChange={setIsPinModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center font-headline text-2xl">Verificar PIN</DialogTitle>
            <DialogDescription className="text-center">
              Ingresa el PIN de 4 dígitos para la pulsera <span className="font-bold text-primary">{braceletId.toUpperCase()}</span>.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-center space-y-4 py-4">
            <InputOTP maxLength={4} onComplete={handlePinSubmit}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
        </DialogContent>
      </Dialog>


      {/* FEATURES */}
      <section id="features" className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-secondary px-3 py-1 text-sm text-secondary-foreground">
                Características Clave
              </div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">
                Tranquilidad para Todos
              </h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Nuestros perfiles de emergencia están diseñados para ofrecer máxima seguridad y facilidad de uso
                cuando más lo necesitas.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-12 py-12 lg:grid-cols-3">
            {[
                {
                  icon: <HeartPulse className="h-10 w-10 text-primary" />,
                  title: "Perfiles de Emergencia",
                  description: "Almacena información vital como tipo de sangre, alergias, y contactos de emergencia.",
                },
                {
                  icon: <ShieldCheck className="h-10 w-10 text-primary" />,
                  title: "Control Total de tu Privacidad",
                  description: "Elige entre perfiles públicos o privados. Tú decides quién accede a tu información.",
                },
                {
                  icon: <PawPrint className="h-10 w-10 text-primary" />,
                  title: "Soporte para Mascotas",
                  description: "Crea perfiles también para tus mascotas, asegurando su bienestar en cualquier situación.",
                },
              ].map((feature, index) => (
              <div key={index} className="grid gap-4 text-center">
                <div className="flex justify-center items-center">{feature.icon}</div>
                <h3 className="text-xl font-bold font-headline">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-accent">
        <div className="container grid items-center gap-6 px-4 md:px-6 lg:grid-cols-2 lg:gap-10">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
              ¿Cómo Funciona?
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed">
              En tres simples pasos, tu información vital estará protegida y accesible.
            </p>
            <ul className="grid gap-4">
              <li className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-bold">1. Registra tu Pulsera</h3>
                  <p className="text-muted-foreground">
                    Crea tu cuenta y activa tu pulsera con el ID y PIN únicos que vienen con ella.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-bold">2. Completa tu Perfil</h3>
                  <p className="text-muted-foreground">
                    Añade tu información médica, contactos de emergencia y una foto. ¡No olvides a tus mascotas!
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-bold">3. Elige tu Privacidad</h3>
                  <p className="text-muted-foreground">
                    Configura tu perfil como público para emergencias, o privado para máxima discreción.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          {braceletImage && (
            <div className="flex justify-center">
              <Image
                alt="Pulsera 123MiD"
                className="overflow-hidden rounded-xl object-contain"
                data-ai-hint={braceletImage.imageHint}
                height="400"
                src={braceletImage.imageUrl}
                width="400"
              />
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <Card>
            <CardHeader className="items-center text-center">
              <CardTitle className="text-2xl md:text-3xl font-bold tracking-tighter font-headline">
                ¿Listo para Proteger a los Tuyos?
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center text-center space-y-4">
              <p className="max-w-md text-muted-foreground">
                Únete a la comunidad de 123MiD hoy mismo. La seguridad empieza con un simple paso.
              </p>
              <Button asChild size="lg">
                <Link href="/signup">Comenzar Ahora</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

    