
"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import React, { useState } from "react"
import { useAuth } from "@/firebase"
import { sendPasswordResetEmail } from "firebase/auth"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"

export default function ForgotPasswordPage() {
  const auth = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string

    if (!email) {
      toast({
        variant: "destructive",
        title: "Correo Requerido",
        description: "Por favor, ingresa tu correo electrónico.",
      })
      setIsLoading(false)
      return
    }

    try {
      await sendPasswordResetEmail(auth, email)
      toast({
        title: "Correo Enviado",
        description:
          "Si existe una cuenta con ese correo, recibirás un enlace para restablecer tu contraseña.",
      })
      setEmailSent(true)
    } catch (error: any) {
      // No mostramos errores específicos para no revelar si un correo existe o no
      console.error("Error sending password reset email:", error)
      toast({
        title: "Correo Enviado",
        description:
          "Si existe una cuenta con ese correo, recibirás un enlace para restablecer tu contraseña.",
      })
      setEmailSent(true) // Aún mostramos el mensaje de éxito por seguridad
    } finally {
      setIsLoading(false)
    }
  }

  if (emailSent) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
        <Card className="mx-auto max-w-sm w-full text-center">
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Revisa tu Correo</CardTitle>
            <CardDescription>
              Hemos enviado un enlace a tu correo electrónico para que puedas
              restablecer tu contraseña.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/login")}>
              Volver a Iniciar Sesión
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)] py-12">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader>
          <CardTitle className="text-2xl font-headline">
            Recuperar Contraseña
          </CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico y te enviaremos un enlace para
            restablecer tu contraseña.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordReset} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="nombre@ejemplo.com"
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Enviar Correo de Recuperación"
              )}
            </Button>
            <Button variant="outline" asChild>
                <Link href="/login">Cancelar</Link>
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
