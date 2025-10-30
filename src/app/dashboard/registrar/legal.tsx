
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function LegalStep({ onAccept }: { onAccept: () => void }) {
    const [privacyAccepted, setPrivacyAccepted] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    
    const canContinue = privacyAccepted && termsAccepted;

    return (
        <Card className="mx-auto w-full max-w-3xl">
            <CardContent className="pt-6">
                <div className="space-y-8">
                     {/* Privacy Policy */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold font-headline">Política de Privacidad</h2>
                        <div className="h-64 overflow-y-auto p-4 border rounded-md text-sm text-muted-foreground space-y-4">
                             <p>Fecha de versión: 23 de octubre de 2025</p>
                             <p>Esta Política aplica al sitio y 123MiD (manillas médicas con QR y perfil en línea). Se redacta en lenguaje claro y cumple con la Ley 1581 de 2012 y el Decreto 1377 de 2013 (Habeas Data) de Colombia.</p>
                             <h3 className="font-semibold text-foreground">1) Responsable del tratamiento</h3>
                             <ul className="list-disc pl-5">
                                 <li>Responsable: 123MiD</li>
                                 <li>Finalidad: proveer perfiles médicos de emergencia vinculados a QR, gestión de cuenta y facturación del plan Plus.</li>
                                 <li>Contacto para derechos de datos: <a href="mailto:contacto@123mid.com" className="text-primary underline">contacto@123mid.com</a></li>
                             </ul>
                             <h3 className="font-semibold text-foreground">2) Datos que tratamos</h3>
                             <ul className="list-disc pl-5">
                                 <li>Identificación y contacto: nombre, correo, teléfono.</li>
                                 <li>Datos de salud que decides registrar: alergias, medicamentos, contactos de emergencia, documentos médicos.</li>
                                 <li>Datos de uso: IP aproximada, dispositivo, analítica esencial del sitio.</li>
                                 <li>Pagos (solo Plus): referencia de transacción y estado. El número de tarjeta se procesa en la pasarela y no se almacena en 123MiD.</li>
                             </ul>
                             <h3 className="font-semibold text-foreground">3) Finalidades</h3>
                             <ul className="list-disc pl-5">
                                <li>Crear y mantener tu cuenta y perfil público de emergencia que tú configuras.</li>
                                <li>Mostrar datos críticos al escanear tu QR según permisos que definas.</li>
                                <li>Enviar notificaciones del servicio y, en Plus, recordatorios.</li>
                                <li>Cumplir obligaciones legales y de seguridad.</li>
                             </ul>
                             <h3 className="font-semibold text-foreground">4) Bases legales</h3>
                              <ul className="list-disc pl-5">
                                <li>Autorización del titular.</li>
                                <li>Cumplimiento de deberes legales.</li>
                                <li>Interés legítimo para seguridad y mejora del servicio.</li>
                            </ul>
                            <h3 className="font-semibold text-foreground">5) Tu control y derechos</h3>
                            <ul className="list-disc pl-5">
                                <li>Puedes ver, editar, ocultar o borrar campos de tu perfil y eliminar tu cuenta en cualquier momento.</li>
                                <li>Derechos: conocer, actualizar, rectificar, suprimir y revocar autorización. Solicítalos vía <a href="mailto:contacto@123mid.com" className="text-primary underline">contacto@123mid.com</a>. Respuesta en máximo 15 días hábiles.</li>
                            </ul>
                            <h3 className="font-semibold text-foreground">6) Transferencias y encargados</h3>
                            <ul className="list-disc pl-5">
                                <li>Proveedores tecnológicos que alojan y operan el servicio bajo acuerdos de confidencialidad y seguridad.</li>
                                <li>Pagos Plus: la pasarela de pagos procesa los datos financieros.</li>
                            </ul>
                             <h3 className="font-semibold text-foreground">7) Seguridad</h3>
                             <p>Ciframos comunicaciones y aplicamos medidas administrativas, técnicas y físicas proporcionales al riesgo. Ningún sistema es infalible.</p>
                             <h3 className="font-semibold text-foreground">8) Retención</h3>
                             <p>Conservamos tus datos mientras tengas cuenta activa y por tiempos necesarios para obligaciones legales o defensa de reclamaciones. Luego se anonimizan o eliminan de forma segura.</p>
                             <h3 className="font-semibold text-foreground">9) Menores de edad</h3>
                             <p>El servicio debe ser gestionado por madres, padres o representantes legales para perfiles de menores, con la debida autorización.</p>
                             <h3 className="font-semibold text-foreground">10) Cambios a esta Política</h3>
                             <p>Publicaremos actualizaciones en esta página. El uso posterior implica aceptación de la versión vigente.</p>
                        </div>
                        <div className="flex items-center space-x-2">
                             <Checkbox id="privacy-check" onCheckedChange={(checked) => setPrivacyAccepted(Boolean(checked))} />
                             <Label htmlFor="privacy-check" className="text-sm font-medium leading-none cursor-pointer">
                                 Acepto la Política de Privacidad.
                             </Label>
                         </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold font-headline">Términos y Condiciones</h2>
                        <div className="h-64 overflow-y-auto p-4 border rounded-md text-sm text-muted-foreground space-y-4">
                            <p>Fecha de versión: 23 de octubre de 2025</p>
                            <h3 className="font-semibold text-foreground">1) Objeto</h3>
                            <p>123MiD ofrece manillas/etiquetas con QR vinculadas a un perfil médico en línea para uso en emergencias. No es un dispositivo médico ni sustituye atención profesional.</p>
                            <h3 className="font-semibold text-foreground">2) Cuenta y uso</h3>
                             <ul className="list-disc pl-5">
                                <li>Debes registrar información veraz y mantener la confidencialidad de tus credenciales.</li>
                                <li>Eres responsable del contenido que publiques y de configurar qué se muestra en modo público de emergencia.</li>
                                <li>Prohibido el uso para fines ilícitos o que vulneren derechos de terceros.</li>
                             </ul>
                             <h3 className="font-semibold text-foreground">3) Contenido y licencias</h3>
                             <p>Tú conservas la titularidad de tus datos. Nos concedes una licencia limitada para alojarlos y mostrarlos según tu configuración a fin de prestar el servicio.</p>
                             <h3 className="font-semibold text-foreground">4) Planes y pagos</h3>
                             <ul className="list-disc pl-5">
                                <li>El acceso básico es gratuito. El plan Plus es de pago anual e incluye funcionalidades adicionales (p. ej., alertas por escaneo, recordatorios, documentos).</li>
                                <li>Pagos procesados por la pasarela de pagos elegida por 123MiD; la pasarela es la responsable del tratamiento de datos financieros.</li>
                                <li>Renovaciones y cancelaciones: puedes cancelar la renovación antes del siguiente periodo; pagos ya cursados no son reembolsables salvo ley aplicable.</li>
                             </ul>
                             <h3 className="font-semibold text-foreground">5) Limitación de responsabilidad</h3>
                             <ul className="list-disc pl-5">
                                <li>123MiD no garantiza disponibilidad ininterrumpida. No somos responsables por daños indirectos o pérdida de datos por causas fuera de control razonable.</li>
                                <li>En todo caso, la responsabilidad total frente al usuario se limita a los valores pagados por el servicio en los 12 meses previos al evento.</li>
                             </ul>
                             <h3 className="font-semibold text-foreground">6) Privacidad y protección de datos</h3>
                             <p>Regida por la Política de Privacidad de 123MiD incluida arriba.</p>
                             <h3 className="font-semibold text-foreground">7) Propiedad intelectual</h3>
                             <p>Marcas, logos, diseño del sitio y software son de 123MiD o licenciantes. No se concede licencia distinta a lo previsto en estos Términos.</p>
                             <h3 className="font-semibold text-foreground">8) Jurisdicción</h3>
                             <p>Estos Términos se rigen por las leyes de Colombia. Controversias ante los jueces de Bogotá D. C., salvo normas imperativas distintas.</p>
                             <h3 className="font-semibold text-foreground">9) Cambios a los Términos</h3>
                             <p>Podremos actualizar estos Términos publicando la nueva versión. El uso posterior implica aceptación.</p>
                             <p>Si tienes preguntas sobre estos documentos, escríbenos a <a href="mailto:contacto@123mid.com" className="text-primary underline">contacto@123mid.com</a></p>
                        </div>
                        <div className="flex items-center space-x-2">
                             <Checkbox id="terms-check" onCheckedChange={(checked) => setTermsAccepted(Boolean(checked))} />
                             <Label htmlFor="terms-check" className="text-sm font-medium leading-none cursor-pointer">
                                 Acepto los Términos y Condiciones.
                             </Label>
                         </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-8">
                     <Button variant="outline" asChild>
                         <Link href="/dashboard">Cancelar</Link>
                     </Button>
                    <Button onClick={onAccept} disabled={!canContinue}>
                        Continuar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
