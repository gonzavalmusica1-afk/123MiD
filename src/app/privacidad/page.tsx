import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Política de Privacidad',
    description: 'Conoce cómo 123MiD protege y utiliza tu información personal y médica. Tu seguridad y privacidad son nuestra prioridad.',
};

export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold font-headline mb-4">Política de Privacidad</h1>
                <div className="space-y-6 text-muted-foreground">
                    <p>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    
                    <h2 className="text-2xl font-bold text-foreground">1. Introducción</h2>
                    <p>
                        Esta Política de Privacidad describe cómo 123MiD ("nosotros", "nuestro") recopila, utiliza y comparte información sobre usted a través de nuestras plataformas en línea. Al utilizar nuestro servicio, usted acepta la recopilación, transferencia, almacenamiento, divulgación y uso de su información como se describe en esta Política de Privacidad.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground">2. Información que Recopilamos</h2>
                    <p>
                        Recopilamos información que usted nos proporciona directamente, como cuando crea una cuenta, completa su perfil médico o se comunica con nosotros. Esto puede incluir:
                    </p>
                    <ul>
                        <li>- Información de la cuenta: Nombre, correo electrónico, contraseña.</li>
                        <li>- Información Médica: Tipo de sangre, alergias, condiciones médicas, contactos de emergencia, etc.</li>
                        <li>- Información de la mascota: Si aplica, detalles sobre su mascota.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-foreground">3. Cómo Usamos la Información</h2>
                    <p>
                        Utilizamos la información que recopilamos para:
                    </p>
                    <ul>
                        <li>- Proporcionar, mantener y mejorar nuestros servicios.</li>
                        <li>- Permitir el acceso a su perfil médico en caso de emergencia, según su configuración de privacidad.</li>
                        <li>- Comunicarnos con usted sobre su cuenta y nuestros servicios.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-foreground">4. Cómo Compartimos la Información</h2>
                    <p>
                        No compartimos su información personal con terceros, excepto en las siguientes circunstancias:
                    </p>
                    <ul>
                        <li>- Con su consentimiento, como cuando configura su perfil como "Público".</li>
                        <li>- Para cumplir con la ley o responder a procesos legales.</li>
                        <li>- Para proteger los derechos y la propiedad de 123MiD, nuestros agentes, clientes y otros.</li>
                    </ul>

                    <h2 className="text-2xl font-bold text-foreground">5. Seguridad de los Datos</h2>
                    <p>
                        Tomamos medidas razonables para proteger su información personal contra pérdida, robo, uso indebido y acceso no autorizado. Utilizamos Firebase Authentication, Firestore y Firebase Storage, que proporcionan capas de seguridad robustas para proteger sus datos.
                    </p>
                    
                    <p>[...]</p>
                </div>
            </div>
        </div>
    );
}
