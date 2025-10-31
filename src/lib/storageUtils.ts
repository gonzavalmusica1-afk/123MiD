
'use client';

import { FirebaseStorage, getDownloadURL, ref, uploadBytes, deleteObject } from "firebase/storage";
import { User } from "firebase/auth";

/**
 * Handles the upload of a profile picture to Firebase Storage, deleting the old one if it exists.
 * @param storage Firebase Storage instance.
 * @param user The authenticated Firebase user.
 * @param profileId The ID of the profile (bracelet ID).
 * @param imageFile The new image file to upload.
 * @param oldPhotoUrl The URL of the old photo to delete (optional).
 * @returns The public URL of the newly uploaded image.
 * @throws An error if the upload fails.
 */
export async function uploadProfilePicture(
    storage: FirebaseStorage,
    user: User,
    profileId: string,
    imageFile: File,
    oldPhotoUrl?: string | null
): Promise<string> {
    // 1. Delete the old picture if it exists and is a Firebase Storage URL
    if (oldPhotoUrl && oldPhotoUrl.includes('firebasestorage.googleapis.com')) {
        try {
            const oldImageRef = ref(storage, oldPhotoUrl);
            await deleteObject(oldImageRef);
        } catch (error: any) {
            // It's not critical if the old image fails to delete, so we just log a warning.
            if (error.code !== 'storage/object-not-found') {
               console.warn("Could not delete old profile picture: ", error);
            }
        }
    }

    // 2. Create a reference for the new image
    const storageRef = ref(storage, `profile_pictures/${user.uid}/${profileId.toUpperCase()}_${Date.now()}`);

    // 3. Upload the new image
    try {
        const snapshot = await uploadBytes(storageRef, imageFile);
        const downloadURL = await getDownloadURL(snapshot.ref);
        return downloadURL;
    } catch (error) {
        console.error("Error uploading image: ", error);
        // Re-throw the error to be caught by the calling function's try-catch block
        throw new Error("No se pudo subir la nueva imagen. Inténtalo de nuevo.");
    }
}
