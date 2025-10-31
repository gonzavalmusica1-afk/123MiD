
import { Metadata } from "next";
import TermsAndConditionsText from "@/components/legal/TermsAndConditionsText";

export const metadata: Metadata = {
    title: 'Términos de Servicio',
    description: 'Lee los términos y condiciones de uso de la plataforma 123MiD. Al usar nuestro servicio, aceptas estos términos.',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold font-headline mb-8">Términos y Condiciones</h1>
                <div className="space-y-6 text-muted-foreground">
                    <TermsAndConditionsText />
                </div>
            </div>
        </div>
    );
}
