import { Timestamp } from "firebase/firestore";

export type ProfileContact = {
    name: string;
    relation: string;
    phone: string;
};

export type Profile = {
    id: string; // Corresponds to braceletId
    name: string;
    status: "Público" | "Privado" | "Sin configurar";
    type: "person" | "pet" | "unconfigured";
    profileType?: "person" | "pet";
    privacy: "public" | "private";
    photoUrl?: string; // URL of the profile photo
    dob?: string;
    bloodType?: string; // Or breed for pets
    allergies?: string;
    conditions?: string;
    contacts?: ProfileContact[];
    userId?: string; // Link to the user who claimed the bracelet
    pin?: string;
};


export type MedicalProfile = {
    id?: string;
    name: string;
    birthDate?: Timestamp;
    medicalConditions?: string;
    allergies?: string;
    medications?: string;
    profilePictureURL?: string;
    privacySetting: 'Public' | 'Private';
};

export const initialProfiles: Profile[] = [];
