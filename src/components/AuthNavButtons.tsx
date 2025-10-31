
"use client";

import { Button } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import Link from "next/link";

interface AuthNavButtonsProps {
  isMobile?: boolean;
}

export function AuthNavButtons({ isMobile = false }: AuthNavButtonsProps) {
  const content = (
    <>
      <Button variant="ghost" asChild>
        <Link href="/login">Iniciar Sesión</Link>
      </Button>
      <Button asChild>
        <Link href="/signup">Registrarse</Link>
      </Button>
    </>
  );

  if (isMobile) {
    return (
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
  }

  return content;
}
