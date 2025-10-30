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
                    <p>Fecha de versión: 23 de octubre de 2025</p>
                    <p>Esta Política aplica al sitio y 123MiD (manillas médicas con QR y perfil en línea). Se redacta en lenguaje claro y cumple con la Ley 1581 de 2012 y el Decreto 1377 de 2013 (Habeas Data) de Colombia.</p>
                    
                    <h3 className="text-2xl font-bold text-foreground pt-4">1) Responsable del tratamiento</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Responsable: 123MiD</li>
                        <li>Finalidad: proveer perfiles médicos de emergencia vinculados a QR, gestión de cuenta y facturación del plan Plus.</li>
                        <li>Contacto para derechos de datos: <a href="mailto:contacto@123mid.com" className="text-primary underline">contacto@123mid.com</a></li>
                    </ul>

                    <h3 className="text-2xl font-bold text-foreground pt-4">2) Datos que tratamos</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        <li>Identificación y contacto: nombre, correo, teléfono.</li>
                        <li>Datos de salud que decides registrar: alergias, medicamentos, contactos de emergencia, documentos médicos.</li>
                        <li>Datos de uso: IP aproximada, dispositivo, analítica esencial del sitio.</li>
                        <li>Pagos (solo Plus): referencia de transacción y estado. El número de tarjeta se procesa en la pasarela y no se almacena en 123MiD.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-foreground pt-4">3) Finalidades</h3>
                    <ul className="list-disc pl-5 space-y-2">
                       <li>Crear y mantener tu cuenta y perfil público de emergencia que tú configuras.</li>
                       <li>Mostrar datos críticos al escanear tu QR según permisos que definas.</li>
                       <li>Enviar notificaciones del servicio y, en Plus, recordatorios.</li>
                       <li>Cumplir obligaciones legales y de seguridad.</li>
                    </ul>

                    <h3 className="text-2xl font-bold text-foreground pt-4">4) Bases legales</h3>
                     <ul className="list-disc pl-5 space-y-2">
                       <li>Autorización del titular.</li>
                       <li>Cumplimiento de deberes legales.</li>
                       <li>Interés legítimo para seguridad y mejora del servicio.</li>
                   </ul>

                   <h3 className="text-2xl font-bold text-foreground pt-4">5) Tu control y derechos</h3>
                   <ul className="list-disc pl-5 space-y-2">
                       <li>Puedes ver, editar, ocultar o borrar campos de tu perfil y eliminar tu cuenta en cualquier momento.</li>
                       <li>Derechos: conocer, actualizar, rectificar, suprimir y revocar autorización. Solicítalos vía <a href="mailto:contacto@123mid.com" className="text-primary underline">contacto@123mid.com</a>. Respuesta en máximo 15 días hábiles.</li>
                   </ul>

                   <h3 className="text-2xl font-bold text-foreground pt-4">6) Transferencias y encargados</h3>
                   <ul className="list-disc pl-5 space-y-2">
                       <li>Proveedores tecnológicos que alojan y operan el servicio bajo acuerdos de confidencialidad y seguridad.</li>
                       <li>Pagos Plus: la pasarela de pagos procesa los datos financieros.</li>
                   </ul>

                    <h3 className="text-2xl font-bold text-foreground pt-4">7) Seguridad</h3>
                    <p>Ciframos comunicaciones y aplicamos medidas administrativas, técnicas y físicas proporcionales al riesgo. Ningún sistema es infalible.</p>
                    
                    <h3 className="text-2xl font-bold text-foreground pt-4">8) Retención</h3>
                    <p>Conservamos tus datos mientras tengas cuenta activa y por tiempos necesarios para obligaciones legales o defensa de reclamaciones. Luego se anonimizan o eliminan de forma segura.</p>
                    
                    <h3 className="text-2xl font-bold text-foreground pt-4">9) Menores de edad</h3>
                    <p>El servicio debe ser gestionado por madres, padres o representantes legales para perfiles de menores, con la debida autorización.</p>
                    
                    <h3 className="text-2xl font-bold text-foreground pt-4">10) Cambios a esta Política</h3>
                    <p>Publicaremos actualizaciones en esta página. El uso posterior implica aceptación de la versión vigente.</p>
                </div>
            </div>
        </div>
    );
}
