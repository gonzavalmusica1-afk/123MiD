
'use server';
import { NextResponse } from 'next/server';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '@/firebase/server';

export async function POST(request: Request) {
  try {
    const { id, pin } = await request.json();

    if (!id || !pin) {
      return NextResponse.json(
        { success: false, message: 'ID y PIN son requeridos.' },
        { status: 400 }
      );
    }

    const braceletRef = doc(firestore, 'bracelets', id.toUpperCase());
    const snap = await getDoc(braceletRef);

    if (!snap.exists()) {
      return NextResponse.json(
        { success: false, message: "Este perfil no existe." },
        { status: 404 }
      );
    }

    const data = snap.data();
    
    // NEW: Check if the bracelet is claimed/configured.
    if (!data.claimed) {
        return NextResponse.json(
            { success: false, message: "Esta pulsera no está activa o no ha sido configurada." },
            { status: 403 }
        );
    }
    
    if (data.privacy !== "public") {
      return NextResponse.json(
          { success: false, message: "Este perfil no está disponible públicamente." },
          { status: 403 }
      );
    }

    if (data.pin !== pin) {
      return NextResponse.json(
        { success: false, message: "El PIN ingresado no es correcto." },
        { status: 403 }
      );
    }

    // Ocultar información sensible antes de devolver la respuesta.
    const { pin: _pin, userId: _userId, ...publicProfile } = data;

    return NextResponse.json({
      success: true,
      profile: publicProfile,
    });
  } catch (error: any) {
    console.error('🔥 Error interno en /api/verify-pin:', error.message || error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}
