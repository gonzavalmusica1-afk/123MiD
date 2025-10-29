
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

    const ref = doc(firestore, 'bracelets', id.toUpperCase());
    const snap = await getDoc(ref);

    if (!snap.exists()) {
      return NextResponse.json(
        { success: false, message: 'La pulsera no existe o fue eliminada.' },
        { status: 404 }
      );
    }

    const data = snap.data();
    
    // Si la pulsera no está reclamada, no se puede ver.
    if (!data.userId) {
       return NextResponse.json(
        {
          success: false,
          message:
            'Esta pulsera aún no ha sido activada por su propietario.',
        },
        { status: 403 }
      );
    }

    // Si es público, verificar el PIN.
    if (data.pin !== pin) {
      return NextResponse.json(
        { success: false, message: 'El PIN ingresado es incorrecto.' },
        { status: 403 }
      );
    }
    
    // Si el PIN es correcto, ahora verificar la privacidad
    if (data.privacy !== 'public') {
      return NextResponse.json(
        {
          success: false,
          message:
            'Este perfil es privado. Solo el propietario puede acceder desde su panel.',
        },
        { status: 403 }
      );
    }


    // Ocultar información sensible antes de devolver la respuesta.
    const { pin: _pin, userId: _userId, ...publicProfile } = data;

    return NextResponse.json({
      success: true,
      message: 'PIN verificado correctamente.',
      profile: publicProfile,
    });
  } catch (error: any) {
    console.error('Error en /api/verify-pin:', error);
    return NextResponse.json(
      { success: false, message: 'Error interno del servidor.' },
      { status: 500 }
    );
  }
}

    