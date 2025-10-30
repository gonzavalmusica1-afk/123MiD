import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Términos de Servicio',
    description: 'Lee los términos y condiciones de uso de la plataforma 123MiD. Al usar nuestro servicio, aceptas estos términos.',
};

export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24 lg:py-32">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-4xl font-bold font-headline mb-4">Términos y Condiciones</h1>
                <div className="space-y-6 text-muted-foreground">
                    <p>Fecha de versión: 23 de octubre de 2025</p>
                    
                    <h3 className="text-2xl font-bold text-foreground pt-4">1) Objeto</h3>
                    <p>123MiD ofrece manillas/etiquetas con QR vinculadas a un perfil médico en línea para uso en emergencias. No es un dispositivo médico ni sustituye atención profesional.</p>

                    <h3 className="text-2xl font-bold text-foreground pt-4">2) Cuenta y uso</h3>
                    <ul className="list-disc pl-5 space-y-2">
                       <li>Debes registrar información veraz y mantener la confidencialidad de tus credenciales.</li>
                       <li>Eres responsable del contenido que publiques y de configurar qué se muestra en modo público de emergencia.</li>
                       <li>Prohibido el uso para fines ilícitos o que vulneren derechos de terceros.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-foreground pt-4">3) Contenido y licencias</h3>
                    <p>Tú conservas la titularidad de tus datos. Nos concedes una licencia limitada para alojarlos y mostrarlos según tu configuración a fin de prestar el servicio.</p>
                    
                    <h3 className="text-2xl font-bold text-foreground pt-4">4) Planes y pagos</h3>
                    <ul className="list-disc pl-5 space-y-2">
                       <li>El acceso básico es gratuito. El plan Plus es de pago anual e incluye funcionalidades adicionales (p. ej., alertas por escaneo, recordatorios, documentos).</li>
                       <li>Pagos procesados por la pasarela de pagos elegida por 123MiD; la pasarela es la responsable del tratamiento de datos financieros.</li>
                       <li>Renovaciones y cancelaciones: puedes cancelar la renovación antes del siguiente periodo; pagos ya cursados no son reembolsables salvo ley aplicable.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-foreground pt-4">5) Limitación de responsabilidad</h3>
                    <ul className="list-disc pl-5 space-y-2">
                       <li>123MiD no garantiza disponibilidad ininterrumpida. No somos responsables por daños indirectos o pérdida de datos por causas fuera de control razonable.</li>
                       <li>En todo caso, la responsabilidad total frente al usuario se limita a los valores pagados por el servicio en los 12 meses previos al evento.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-foreground pt-4">6) Privacidad y protección de datos</h3>
                    <p>Regida por la Política de Privacidad de 123MiD incluida en esta web.</p>
                    
                    <h3 className="text-2xl font-bold text-foreground pt-4">7) Propiedad intelectual</h3>
                    <p>Marcas, logos, diseño del sitio y software son de 123MiD o licenciantes. No se concede licencia distinta a lo previsto en estos Términos.</p>
                    
                    <h3 className="text-2xl font-bold text-foreground pt-4">8) Jurisdicción</h3>
                    <p>Estos Términos se rigen por las leyes de Colombia. Controversias ante los jueces de Bogotá D. C., salvo normas imperativas distintas.</p>
                    
                    <h3 className="text-2xl font-bold text-foreground pt-4">9) Cambios a los Términos</h3>
                    <p>Podremos actualizar estos Términos publicando la nueva versión. El uso posterior implica aceptación.</p>
                    
                    <p>Si tienes preguntas sobre estos documentos, escríbenos a <a href="mailto:contacto@123mid.com" className="text-primary underline">contacto@123mid.com</a></p>
                </div>
            </div>
        </div>
    );
}
