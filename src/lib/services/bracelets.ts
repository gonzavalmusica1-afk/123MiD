
'use client';
import { doc, getDoc, Timestamp, updateDoc } from "firebase/firestore";
import { Firestore } from "firebase/firestore";

export async function claimBracelet(
  db: Firestore,
  braceletId: string,
  userId: string,
  pin: string
): Promise<{ success: boolean; message: string; id?: string; code?: string }> {
  const braceletRef = doc(db, "bracelets", braceletId.toUpperCase());

  try {
    // 1️⃣ Obtener la pulsera
    const snap = await getDoc(braceletRef);

    // 2️⃣ Si NO existe — detener aquí
    if (!snap.exists()) {
      return { success: false, message: "Esta pulsera no existe. Verifica el ID ingresado." };
    }

    // 3️⃣ Obtener los datos existentes
    const data = snap.data();

    // 4️⃣ Validar propietario
    if (data.userId) {
      if (data.userId === userId) {
        return { 
            success: false, 
            message: "Esta pulsera ya está registrada en tu cuenta.",
            id: braceletId.toUpperCase(),
            code: "ALREADY_OWNED" 
        };
      } else {
        return { success: false, message: "Esta pulsera ya fue reclamada por otro usuario." };
      }
    }

    // 5️⃣ Validar PIN
    if (data.pin !== pin) {
      return { success: false, message: "El PIN ingresado no es correcto." };
    }

    // 6️⃣ Reclamar
    await updateDoc(braceletRef, {
      userId,
      claimed: true,
      claimedAt: Timestamp.now(),
      pin: pin, // 👈 Necesario para validación de reglas
      privacy: "public",
      name: "Nuevo Perfil",
      status: "Sin configurar",
      type: "unconfigured",
      profileType: null,
    });

    return { success: true, message: "Pulsera reclamada con éxito.", id: braceletId.toUpperCase() };

  } catch (error: any) {
    console.error("🔥 Error interno en claimBracelet():", error?.message || error);
    // ⚠️ Solo mostramos error genérico si Firestore lanza algo inesperado
    return { success: false, message: "Ocurrió un error inesperado al reclamar la pulsera." };
  }
}
