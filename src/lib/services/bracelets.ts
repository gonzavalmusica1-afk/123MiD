
'use client';
import { doc, getDoc, runTransaction, Timestamp, updateDoc, setDoc } from "firebase/firestore";
import { Firestore } from "firebase/firestore";

export async function claimBracelet(db: Firestore, braceletId: string, userId: string, pin: string): Promise<{ success: boolean; message: string; id?: string; code?: string; }> {
    const braceletRef = doc(db, "bracelets", braceletId.toUpperCase());
    
    try {
        const snap = await getDoc(braceletRef);

        if (!snap.exists()) {
             return { success: false, message: "Esta pulsera no existe. Verifica el ID ingresado." };
        }

        const data = snap.data();

        if (data.userId) {
            if (data.userId === userId) {
                return { success: false, message: "Esta pulsera ya está registrada en tu cuenta.", code: "ALREADY_OWNED", id: braceletId.toUpperCase() };
            } else {
                 return { success: false, message: "Esta pulsera ya fue reclamada por otro usuario." };
            }
        }

        if (data.pin !== pin) {
            return { success: false, message: "El PIN ingresado no es correcto." };
        }
        
        await updateDoc(braceletRef, {
            userId: userId,
            claimed: true,
            claimedAt: Timestamp.now(),
            name: "Nuevo Perfil",
            status: "Sin configurar",
            type: "unconfigured",
            privacy: "public",
        });
        return { success: true, message: "Pulsera reclamada con éxito.", id: braceletId.toUpperCase() };

    } catch (error: any) {
        console.error("Error claiming bracelet: ", error);
        // This will now only catch unexpected server errors, not logical ones.
        throw new Error("Ocurrió un error inesperado en el servidor al reclamar la pulsera.");
    }
}
