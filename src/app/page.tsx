
"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { CheckCircle, HeartPulse, PawPrint, ShieldCheck, ShieldAlert } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { placeholderImages } from "@/lib/placeholder-images";
import ProfileView from "./perfil/[id]/ProfileView";
import type { Profile } from "@/lib/profiles";

const DemoProfileData = {
    name: "Juan Pérez (Demo)",
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

export default function Home() {
  const braceletImage = placeholderImages.find(p => p.id === "bracelet");
  const demoProfile: Partial<Profile> = DemoProfileData;
  const heroImage = placeholderImages.find(p => p.id === "hero");


  return (
    <div className="flex flex-col min-h-[100dvh]">

      {/* HERO */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-accent">
        <div className="container px-4 md:px-6">
          <div className="grid gap-12 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_500px]">
             <div className="flex flex-col justify-center space-y-4 order-1 text-center lg:text-left lg:order-1">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                  Información que Salva Vidas, al Instante
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto lg:mx-0">
                  123MiD te conecta con tu información médica crucial en momentos de emergencia.
                  Una solución simple y segura para ti, tu familia y tus mascotas.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center lg:justify-start">
                <Button asChild size="lg">
                  <Link href="/signup">Crear mi Cuenta Gratis</Link>
                </Button>
              </div>
            </div>
            {/* iPhone Mockup */}
            <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl order-2 lg:order-2">
                <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
                <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
                <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
                <div className="rounded-[2rem] overflow-y-auto w-full h-full bg-white dark:bg-black">
                    {/* Simplified Profile View */}
                    <div className="min-h-full bg-muted/40">
                         <ProfileView profile={demoProfile} isMockup={true} />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

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
              En solo 3 pasos, tu información vital estará protegida y accesible para quien más lo necesita.
            </p>
             <ul className="grid gap-6">
              <li className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-bold">1. Regístrate y Activa tu Pulsera</h3>
                  <p className="text-muted-foreground">
                    Crea tu cuenta gratis y vincula la pulsera que ya posees usando su ID y PIN únicos.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <CheckCircle className="mt-1 h-6 w-6 flex-shrink-0 text-primary" />
                <div>
                  <h3 className="font-bold">2. Completa tu Perfil y Privacidad</h3>
                  <p className="text-muted-foreground">
                    Añade tu información médica esencial, contactos de emergencia y elige quién puede ver tus datos.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <ShieldAlert className="mt-1 h-6 w-6 flex-shrink-0 text-destructive" />
                <div>
                  <h3 className="font-bold">3. ¡Listo para Emergencias!</h3>
                  <p className="text-muted-foreground">
                    Si ocurre una emergencia, un rescatista podrá escanear el QR o ingresar el ID y PIN para acceder a tu información vital y ayudarte eficazmente.
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
