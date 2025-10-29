
"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/firebase"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

export default function SignupPage() {
  const router = useRouter();
  const auth = useAuth();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    
    if (!email || !password) {
        toast({ variant: "destructive", title: "Campos Incompletos", description: "Por favor, completa el correo y la contraseña." });
        setIsLoading(false);
        return;
    }
    
    if (password.length < 6) {
        toast({ variant: "destructive", title: "Contraseña insegura", description: "La contraseña debe tener al menos 6 caracteres." });
        setIsLoading(false);
        return;
    }

    try {
        await createUserWithEmailAndPassword(auth, email, password);
        router.push("/dashboard");
    } catch (error: any) {
        let errorMessage = "Ocurrió un error durante el registro.";
        if (error.code === 'auth/email-already-in-use') {
            errorMessage = "Este correo electrónico ya está registrado. Intenta iniciar sesión.";
        }
        toast({ variant: "destructive", title: "Error de Registro", description: errorMessage });
    } finally {
        setIsLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
        <Card className="mx-auto max-w-sm w-full">
            <CardHeader>
                <CardTitle className="text-xl font-headline">Crear una Cuenta</CardTitle>
                <CardDescription>
                Ingresa tus datos para registrarte y empezar a usar 123MiD.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSignup} className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="first-name">Nombre</Label>
                        <Input id="first-name" placeholder="Juan Pérez" required disabled={isLoading} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="email">Correo Electrónico</Label>
                        <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="tu@correo.com"
                        required
                        disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Contraseña (mín. 6 caracteres)</Label>
                        <Input id="password" name="password" type="password" required disabled={isLoading}/>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="terms" required />
                        <Label htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                            Acepto los <Link href="/terminos" className="underline hover:text-primary">Términos de Servicio</Link>
                        </Label>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? <Loader2 className="animate-spin" /> : "Crear Cuenta"}
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm">
                    ¿Ya tienes una cuenta?{" "}
                    <Link href="/login" className="underline hover:text-primary">
                        Inicia Sesión
                    </Link>
                </div>
            </CardContent>
        </Card>
    </div>
  )
}
