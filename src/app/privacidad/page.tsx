
import { Metadata } from "next";
import PrivacyPolicyText from "@/components/legal/PrivacyPolicyText";

export const metadata: Metadata = {
    title: 'Política de Privacidad',
    description: 'Conoce cómo 123MiD protege y utiliza tu información personal y médica. Tu seguridad y privacidad son nuestra prioridad.',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold font-headline mb-8">Política de Privacidad</h1>
                <div className="space-y-6 text-muted-foreground">
                    <PrivacyPolicyText />
                </div>
            </div>
        </div>
    );
}
