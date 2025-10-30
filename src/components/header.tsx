
"use client"

import { LogOut, LayoutDashboard, PlusCircle, Search, Menu, LifeBuoy } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth, useUser } from "@/firebase";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

const MedicalCrossIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 1V7" />
      <path d="M12 17V23" />
      <path d="M1 12H7" />
      <path d="M17 12H23" />
    </svg>
  );

function RescuerAccessModal({ asChild = false }: { asChild?: boolean }) {
  const router = useRouter();
  const { toast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);
  const [isIdModalOpen, setIsIdModalOpen] = useState(false);

  const handleIdSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const id = (formData.get("id") as string)?.trim();

    if (!id) {
      toast({
        variant: "destructive",
        title: "ID Requerido",
        description: "Por favor, ingresa el ID de la pulsera.",
      });
      setIsLoading(false);
      return;
    }
    
    setIsIdModalOpen(false);
    router.push(`/perfil/${id.toLowerCase()}`);
  };

  const handleOpenChange = (isOpen: boolean) => {
    setIsIdModalOpen(isOpen);
    if (!isOpen) {
      setIsLoading(false);
    }
  }
  
  const TriggerComponent = asChild ? (
    <div className="w-full flex items-center justify-between">
      <div className="flex items-center gap-4">
        <LifeBuoy className="h-5 w-5 text-primary" />
        <span>Acceso Rescatista</span>
      </div>
    </div>
  ) : (
    <Button variant="outline" className="font-bold shadow-sm hover:shadow-md transition-shadow border-primary/50 text-primary hover:bg-primary/5 hover:text-primary">
      <Search className="mr-2 h-4 w-4 text-primary" />
      Acceso Rescatista
    </Button>
  );

  return (
      <Dialog open={isIdModalOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          {TriggerComponent}
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2 font-headline">
              <Search className="h-6 w-6 text-primary" />
              Acceso para Rescatistas
            </DialogTitle>
            <DialogDescription>
              Ingresa el ID de la pulsera para acceder al perfil de emergencia.
            </DialogDescription>
          </DialogHeader>
          <form
            onSubmit={handleIdSubmit}
            className="flex flex-col sm:flex-row items-stretch sm:items-end gap-2 pt-4"
          >
            <div className="grid gap-1.5 flex-grow w-full">
              <Label htmlFor="rescuer-id-modal">ID de la Pulsera</Label>
              <Input id="rescuer-id-modal" name="id" type="text" placeholder="AV-XXXXX" disabled={isLoading} autoFocus />
            </div>
            <Button type="submit" className="w-full sm:w-auto" disabled={isLoading}>
               {isLoading ? <Loader2 className="animate-spin" /> : "Buscar"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
  )
}
  

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const isDashboard = pathname.startsWith('/dashboard');
  const isMobile = useIsMobile();

  const handleLogout = () => {
    auth.signOut();
    router.push('/');
  }
  
  const guestLinks = (
      <>
        <SheetClose asChild>
          <Button variant="ghost" asChild className="w-full justify-start text-base py-6">
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
        </SheetClose>
        <SheetClose asChild>
          <Button asChild className="w-full justify-start text-base py-6">
            <Link href="/signup">Registrarse</Link>
          </Button>
        </SheetClose>
      </>
    );

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background shadow-sm">
      <Link className="flex items-center justify-center" href="/">
        <MedicalCrossIcon className="h-6 w-6" />
        <span className="ml-2 text-lg font-semibold font-headline">123MiD</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        {isUserLoading ? (
            <div className="h-10 w-44 rounded-md bg-muted animate-pulse" />
        ) : user ? (
          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL || undefined} alt="Avatar" />
                    <AvatarFallback>{user.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{user.displayName || "Usuario"}</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push('/dashboard')}>
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  <span>Panel</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <RescuerAccessModal />
            {isMobile ? (
                 <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Abrir Menú</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                        <nav className="flex flex-col gap-4 pt-10">
                            {guestLinks}
                        </nav>
                    </SheetContent>
                </Sheet>
            ) : (
              <>
                <Button variant="ghost" asChild>
                    <Link href="/login">Iniciar Sesión</Link>
                </Button>
                <Button asChild>
                    <Link href="/signup">Registrarse</Link>
                </Button>
              </>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
