
import Link from 'next/link';

export default function PrivacyPolicyText() {
    return (
        <>
            <p>Fecha de versión: 23 de octubre de 2025. Vigencia: inmediata.</p>
            <p>Esta Política aplica al sitio web y a la web app de 123MiD, así como a los servicios asociados a las pulseras de identificación de emergencia con ID y PIN. Está redactada en lenguaje claro y cumple con la Ley 1581 de 2012 y el Decreto 1377 de 2013 de Colombia. Si no estás de acuerdo, por favor no uses el servicio.</p>
            
            <h3 className="font-semibold text-foreground">1) Responsable del tratamiento</h3>
            <ul className="list-disc pl-5">
                <li>Responsable: 123MiD</li>
                <li>Dirección y domicilio: [Indicar dirección y ciudad]</li>
                <li>Correo para derechos de datos y PQRS: <a href="mailto:contacto@123mid.com" className="text-primary underline">contacto@123mid.com</a></li>
                <li>Canales de contacto adicionales: [URL de ayuda o formulario, si aplica]</li>
                <li>Delegado de Protección de Datos (si aplica): [Nombre o “N/A”]</li>
            </ul>

            <h3 className="font-semibold text-foreground">2) Datos que tratamos</h3>
            <ul className="list-disc pl-5">
                <li>Identificación y contacto: nombre, correo, teléfono.</li>
                <li>Datos de salud que decides registrar de forma voluntaria y libre: alergias, condiciones médicas, medicamentos, contactos de emergencia, grupo sanguíneo, otra información crítica para emergencias.</li>
                <li>Imagen de perfil: foto de la persona o mascota.</li>
                <li>Cookies y tecnologías similares: únicamente las necesarias para funcionamiento y analítica esencial.</li>
            </ul>
            <p><strong>Nota sobre datos sensibles:</strong> Los datos de salud son sensibles. Su suministro es opcional, y su tratamiento requiere tu autorización explícita.</p>

            <h3 className="font-semibold text-foreground">3) Finalidades</h3>
            <ul className="list-disc pl-5">
               <li>Crear y mantener tu cuenta.</li>
               <li>Crear y administrar perfiles de emergencia.</li>
               <li>Mostrar datos críticos cuando una persona con legitimación accede con ID y PIN, de acuerdo con tu configuración de privacidad.</li>
               <li>Prevenir fraude, seguridad de la información y cumplimiento de obligaciones legales.</li>
            </ul>

            <h3 className="font-semibold text-foreground">4) Bases legales</h3>
             <ul className="list-disc pl-5">
               <li>Autorización previa, expresa e informada del titular.</li>
               <li>Cumplimiento de deberes legales y contractuales.</li>
               <li>Interés legítimo en seguridad, continuidad y mejora del servicio, sin afectar tus derechos y libertades fundamentales.</li>
           </ul>

           <h3 className="font-semibold text-foreground">5) Configuración de privacidad y acceso con ID y PIN</h3>
           <ul className="list-disc pl-5">
               <li>Perfil Privado: solo tú (usuario autenticado) accedes a lectura y edición.</li>
               <li>Perfil Público Restringido: acceso de solo lectura para rescatistas que ingresen el ID y PIN correctos.</li>
               <li>Registramos bitácoras mínimas de acceso para fines de seguridad y auditoría.</li>
           </ul>

           <h3 className="font-semibold text-foreground">6) Tu control y derechos</h3>
           <ul className="list-disc pl-5">
               <li>Puedes ver, actualizar, corregir, ocultar o borrar campos de tu perfil y eliminar tu cuenta cuando quieras.</li>
               <li>Derechos de Habeas Data: conocer, acceder, actualizar, rectificar, suprimir y revocar autorización.</li>
               <li>Canales: <a href="mailto:contacto@123mid.com" className="text-primary underline">contacto@123mid.com</a></li>
               <li>Tiempos de respuesta: hasta 10 días hábiles para consultas y hasta 15 días hábiles para reclamos, prorrogables según la ley previa notificación.</li>
               <li>La supresión puede no proceder cuando exista deber legal o contractual de conservar información.</li>
           </ul>

           <h3 className="font-semibold text-foreground">7) Encargados, transferencias y ubicaciones</h3>
           <ul className="list-disc pl-5">
               <li>Encargados tecnológicos: proveedores de hosting, bases de datos, almacenamiento de archivos e infraestructura, analítica esencial, mensajería. Todos actúan bajo acuerdos de confidencialidad y seguridad.</li>
           </ul>

            <h3 className="font-semibold text-foreground">8) Seguridad de la información</h3>
            <p>Cifrado en tránsito (TLS) y medidas administrativas, técnicas y físicas proporcionales al riesgo. Principios de minimización, control de acceso, registro de eventos y copias de seguridad. Ningún sistema es infalible; notificaremos incidentes de seguridad graves conforme a la normativa aplicable y a nuestros procedimientos internos.</p>
            
            <h3 className="font-semibold text-foreground">9) Retención</h3>
            <p>Conservamos los datos mientras la cuenta esté activa y por el tiempo necesario para obligaciones legales, prevención de fraudes, facturación y defensa de reclamaciones. Pasado ese tiempo, anonimizamos o eliminamos de forma segura. Puedes solicitar eliminación anticipada conforme a la ley.</p>
            
            <h3 className="font-semibold text-foreground">10) Menores de edad</h3>
            <p>Perfiles de menores deben ser gestionados por madres, padres o representantes legales, quienes otorgan la autorización correspondiente y configuran la visibilidad del perfil.</p>

            <h3 className="font-semibold text-foreground">11) Cookies y analítica</h3>
            <p>Usamos cookies necesarias para autenticación, seguridad y funcionamiento. Analítica esencial para entender uso agregado y mejorar el servicio, sin perfilar a nivel individual con fines publicitarios. Puedes gestionar cookies desde tu navegador. El bloqueo de cookies necesarias puede afectar el funcionamiento.</p>
            
            <h3 className="font-semibold text-foreground">12) Cambios a esta Política</h3>
            <p>Publicaremos actualizaciones en esta página y, si son cambios materiales, lo comunicaremos por medios visibles. El uso posterior implica aceptación de la versión vigente.</p>

            <h3 className="font-semibold text-foreground">13) Autorización informada</h3>
            <p>Al crear cuenta, activar pulsera o registrar datos de salud, declaras que lees y aceptas esta Política y autorizas el tratamiento, incluyendo datos sensibles que decidas aportar voluntariamente.</p>

            <h3 className="font-semibold text-foreground">14) Cómo ejercer tus derechos</h3>
            <p>Escribe a <a href="mailto:contacto@123mid.com" className="text-primary underline">contacto@123mid.com</a> con el asunto “Derechos de datos”. Indica tu nombre completo, correo registrado, petición concreta y, de ser necesario, documentos de soporte. Te responderemos dentro de los plazos legales.</p>
            
            <h3 className="font-semibold text-foreground">15) Información adicional para rescatistas</h3>
            <p>El acceso de emergencia de solo lectura exige coincidencia exacta de ID y PIN y respeta la visibilidad que configuraste. No se permite descarga masiva o automatizada de datos. Se registran eventos mínimos de acceso para fines de seguridad y auditoría.</p>

            <h3 className="font-semibold text-foreground">16) Marco complementario</h3>
            <p>Aplicamos principios de legalidad, finalidad, libertad, veracidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad. Para conceptos no previstos, se acudirá a la regulación colombiana vigente y a guías de la SIC.</p>
        </>
    );
}
