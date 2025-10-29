
"use client"

import { LogOut, LayoutDashboard, PlusCircle } from "lucide-react";
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

const MedicalCrossIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
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
  

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const isDashboard = pathname.startsWith('/dashboard');

  const handleLogout = () => {
    auth.signOut();
    router.push('/');
  }

  return (
    <header className="px-4 lg:px-6 h-16 flex items-center border-b bg-background shadow-sm">
      <Link className="flex items-center justify-center" href="/">
        <MedicalCrossIcon className="h-6 w-6 text-primary" />
        <span className="ml-2 text-lg font-semibold font-headline">123MiD</span>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
        {isUserLoading ? (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
        ) : user ? (
          <div className="flex items-center gap-4">
            {isDashboard && (
                 <Button asChild className="gap-1">
                    <Link href="/dashboard/registrar">
                        <PlusCircle className="h-4 w-4" />
                        Registrar Pulsera
                    </Link>
                </Button>
            )}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src={user.photoURL || undefined} alt="Avatar" />
                    <AvatarFallback>{user.displayName?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase() || 'U'}</AvatarFallback>
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
          <>
            <Button variant="ghost" asChild>
                <Link href="/login">Iniciar Sesión</Link>
            </Button>
            <Button asChild>
                <Link href="/signup">Registrarse</Link>
            </Button>
          </>
        )}
      </nav>
    </header>
  );
}
