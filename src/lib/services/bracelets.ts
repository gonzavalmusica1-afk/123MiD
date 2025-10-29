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
    const snap = await getDoc(braceletRef);

    // 1️⃣ Verificar existencia
    if (!snap.exists()) {
      return { success: false, message: "Esta pulsera no existe. Verifica el ID ingresado." };
    }

    const data = snap.data();

    // 2️⃣ Verificar si ya tiene dueño
    if (data.userId) {
      if (data.userId === userId) {
        // 🔹 Se devuelve también el id para permitir redirección automática
        return {
          success: false,
          message: "Esta pulsera ya está registrada en tu cuenta.",
          code: "ALREADY_OWNED",
          id: braceletId.toUpperCase(),
        };
      }
      return { success: false, message: "Esta pulsera ya fue reclamada por otro usuario." };
    }

    // 3️⃣ Validar el PIN
    if (data.pin !== pin) {
      return { success: false, message: "El PIN ingresado no es correcto." };
    }

    // 4️⃣ Reclamar la pulsera
    await updateDoc(braceletRef, {
      userId,
      claimed: true,
      claimedAt: Timestamp.now(),
      name: "Nuevo Perfil",
      status: "Sin configurar",
      type: "unconfigured",
      privacy: "public",
    });

    return { success: true, message: "Pulsera reclamada con éxito.", id: braceletId.toUpperCase() };

  } catch (error: any) {
    console.error("🔥 Error interno en claimBracelet():", error?.message || error);
    return { success: false, message: "Ocurrió un error inesperado al reclamar la pulsera." };
  }
}
