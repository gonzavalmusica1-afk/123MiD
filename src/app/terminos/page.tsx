import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Términos de Servicio',
    description: 'Lee los términos y condiciones de uso de la plataforma 123MiD. Al usar nuestro servicio, aceptas estos términos.',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold font-headline mb-4">Términos de Servicio</h1>
                <div className="space-y-6 text-muted-foreground">
                    <p>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    
                    <h2 className="text-2xl font-bold text-foreground">1. Aceptación de los Términos</h2>
                    <p>
                        Bienvenido a 123MiD. Al acceder o utilizar nuestro sitio web y nuestros servicios, usted acepta estar sujeto a estos Términos de Servicio y a nuestra Política de Privacidad. Si no está de acuerdo con alguna parte de los términos, no podrá acceder al servicio.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground">2. Descripción del Servicio</h2>
                    <p>
                        123MiD proporciona pulseras de emergencia médica y una plataforma en línea donde los usuarios pueden almacenar su información médica para que sea accesible en caso de emergencia. La precisión y la integridad de la información proporcionada son responsabilidad exclusiva del usuario.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground">3. Cuentas de Usuario</h2>
                    <p>
                        Para utilizar ciertas funciones del servicio, debe registrarse para obtener una cuenta. Usted es responsable de salvaguardar su contraseña y de cualquier actividad o acción bajo su cuenta. Usted se compromete a no divulgar su contraseña a ningún tercero.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground">4. Privacidad y Datos Personales</h2>
                    <p>
                        Su privacidad es importante para nosotros. Nuestra Política de Privacidad explica cómo recopilamos, usamos y protegemos su información personal. Al usar nuestros servicios, usted acepta la recopilación y el uso de información de acuerdo con nuestra política de privacidad.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground">5. Limitación de Responsabilidad</h2>
                    <p>
                        123MiD no es un proveedor de servicios médicos. El servicio se proporciona "tal cual" y no garantizamos que el servicio sea ininterrumpido, seguro o libre de errores. En ningún caso 123MiD será responsable de ningún daño indirecto, incidental, especial, consecuente o punitivo.
                    </p>
                    
                    <p>[...]</p>
                </div>
            </div>
        </div>
    );
}
