/* Guardián Ibérica Instalaciones · cuestionario de homologación anual de instaladores partner de Prosegur Alarmas (HOM-2026-031). Escenario de demostración con datos sintéticos (MFM). */
agenticPack('alarmas', {
  cuestionario: {
    agent: 'Cuestionarios de cliente',
    lang: 'es',
    default_sel: 'B1',
    reviewer: 'Responsable de operaciones',
    assignee: 'Responsable de cumplimiento (DPO)',
    assignee_short: 'Cumplimiento',
    team: 'Cumplimiento',
    assign_due: '2026-10-27',
    responder: 'Guardián Ibérica Instalaciones, S.L.U. (Hub de Paterna)',
    site: 'Paterna (Valencia)',
    site_label: 'Hub',
    page_title: 'Homologación de instalador · Prosegur Alarmas',
    report_title: 'Respuesta a cuestionario de homologación de instalador partner',
    ref_label: 'Referencia de la marca',
    scope_meta_label: 'Servicios',
    discard_placeholder: 'Por ejemplo: esta pregunta se responde con el certificado adjunto',
    save_system: 'Salesforce CRM',
    qn: {
      code: 'HOM-2026-031',
      title: 'Cuestionario de homologación anual de instaladores partner 2026',
      customer: 'Prosegur Alarmas',
      via: 'Oficina de Homologación de Partners de Prosegur Alarmas',
      received: '2026-10-12T10:15',
      due: '2026-10-30',
      file: 'Prosegur_Alarmas_Homologacion_Instaladores_2026.xlsx',
      scope: 'Instalación y mantenimiento de los sistemas de alarma de Prosegur Alarmas (10.700 instalaciones activas) como instalador partner autorizado',
      scope_short: 'Prosegur Alarmas · 10.700 instalaciones',
      scope_label: '2 servicios (instalación y mantenimiento)'
    },
    email: {
      mailbox: 'buzón de Cumplimiento',
      headers: {
        From: 'Oficina de Homologación de Partners, Prosegur Alarmas <homologacion@prosegur-alarmas.example>',
        To: 'Cumplimiento, Guardián Ibérica Instalaciones <cumplimiento@gii-demo.example>',
        Date: 'lun, 12 oct 2026 10:15 (hora de Madrid)',
        Subject: 'Homologación anual de instaladores partner 2026 (HOM-2026-031) - respuesta antes del 30 de octubre'
      },
      text: 'Buenos días:\n\nDentro de la homologación anual de nuestros instaladores partner, Prosegur Alarmas ha emitido el cuestionario HOM-2026-031 para los servicios que prestáis en nuestro nombre:\n- Instalación de sistemas de alarma\n- Mantenimiento de las instalaciones de Prosegur Alarmas\n\nEl cuestionario tiene 15 preguntas en cinco bloques: habilitación y certificaciones, instalación, equipos y mantenimiento, servicio y continuidad, datos personales y trazabilidad, y seguros y formación.\n\nResponded a todas las preguntas e indicad el procedimiento, registro o certificado que respalda cada respuesta. Necesitamos el cuestionario completo antes del viernes 30 de octubre de 2026.\n\nUn saludo,\n\nOficina de Homologación de Partners\nProsegur Alarmas',
      highlights: [
        { text: 'Instalación de sistemas de alarma', label: 'Servicio', tone: 'brand' },
        { text: 'Mantenimiento de las instalaciones de Prosegur Alarmas', label: 'Servicio', tone: 'brand' },
        { text: '15 preguntas', label: 'Preguntas', tone: 'brand' },
        { text: 'indicad el procedimiento, registro o certificado que respalda cada respuesta', label: 'Requisito' },
        { text: 'viernes 30 de octubre de 2026', label: 'Plazo' }
      ]
    },
    sections: [
      { id: 'A', es: 'Habilitación y certificaciones' },
      { id: 'B', es: 'Instalación, equipos y mantenimiento' },
      { id: 'C', es: 'Servicio y continuidad' },
      { id: 'D', es: 'Datos personales y trazabilidad' },
      { id: 'E', es: 'Seguros y formación' }
    ],
    kpi: { label: 'Auditorías y visitas en 2025', value: 11, sub: 'Incluye inspecciones oficiales · 14 jornadas · Memoria 2025', icon: 'shield-check' },
    sources_sub: 'Procedimientos, certificaciones, pólizas y memoria',
    identify_result: 'Prosegur Alarmas vía Oficina de Homologación de Partners · HOM-2026-031',
    search_scope: 'procedimientos de Operaciones, certificaciones, pólizas y memoria anual',
    lookups: [
      { system: 'Salesforce CRM', action: 'Consulta las instalaciones activas de Prosegur Alarmas y sus órdenes de trabajo', result: '10.700 instalaciones activas · pruebas y fotos registradas en las órdenes del último trimestre', ms: 480 },
      { system: 'SAP Business One', action: 'Lee las compras de equipos y los lotes instalados', result: 'INS-2026-VLC-04417: FAC-PA-26-3318 · recepción en Paterna · instalación de grado 2 conforme', ms: 520 },
      { system: 'Prosegur Partner Portal', action: 'Comprueba el alta de las instalaciones y el estado de la homologación anual', result: 'HOM-2026-031 abierta · altas confirmadas en 24 h en el último trimestre', ms: 400 },
      { system: 'Salesforce CRM', action: 'Busca las revisiones anuales realizadas y las reclamaciones abiertas', result: '9.870 de 10.700 revisiones anuales realizadas · CLM-2026-0619 abierta (otra marca)', ms: 350, tone: 'warn' },
      { system: 'Twilio SMS', action: 'Lee los avisos enviados en las últimas incidencias de comunicación', result: 'ALM-COM-0590: conmutación a respaldo IP en 22 min · avisos por SMS enviados', ms: 300 },
      { system: 'SAP Business One', action: 'Cruza los equipos de Prosegur Alarmas con los lotes en retirada de hoy', result: 'Lote PIR-2607-A: 158 hogares de Prosegur Alarmas con unidades instaladas', ms: 390, tone: 'warn' }
    ],
    compare: {
      people: '2-3: Operaciones, Cumplimiento y, según la pregunta, Mantenimiento o Soporte técnico',
      systems: '6-8: correo, Excel de la marca, Salesforce, SAP Business One, portal de partner, carpeta de certificados y procedimientos',
      steps: 'Buscar la fuente de cada pregunta, copiar y adaptar respuestas de otros años, pedir datos a otros departamentos y montar el Excel',
      time: '3-5 h de trabajo de Operaciones y Cumplimiento, repartidas en 2-3 días'
    },
    presenter: {
      before: [
        'Cada marca partner trae su homologación anual. En 2025 Guardián Ibérica Instalaciones recibió 11 auditorías de partner, visitas de cliente e inspecciones: 14 jornadas. Es trabajo de fondo que se come horas de Operaciones y de Cumplimiento.',
        'Este llega de Prosegur Alarmas, caso HOM-2026-031: {total} preguntas sobre habilitación, instalación, mantenimiento, datos personales y seguros, con 10.700 instalaciones de la marca en juego.',
        'Al pulsar, Agentic Platform busca en procedimientos, certificaciones y pólizas, y en los registros de Salesforce, SAP Business One, el portal de partner y Twilio, y redacta cada respuesta con su fuente.'
      ],
      during: [
        '{drafted} de {total} con borrador y cita; cada cita se comprueba contra el texto de la fuente. {flagged} quedan para Cumplimiento y Operaciones: certificación personal de los instaladores, subcontratas y continuidad y ciberseguridad. Sin documento que lo respalde, no se inventa nada.',
        'B1: además de responder, avisa de que el lote PIR-2607-A del detector PIR-200 está en retirada y de que 158 hogares de Prosegur Alarmas tienen unidades instaladas. Hoy eso depende de que alguien se acuerde.',
        'C1: la caída de comunicación de 214 paneles de hoy está en marcha mientras se contesta. El cuestionario no vive aislado del resto de la operación.',
        'Nada sale sin aprobación: en bloque solo las de confianza alta; las de confianza media se revisan una a una.'
      ],
      next_during: 'Enseñar B1 (cita y aviso de la campaña) y B4 (sin evidencia). Después «Aprobar las {alta} de confianza alta», aprobar {media_ids} una a una y «Asignar las {flagged} sin fuente a Cumplimiento».'
    },
    sources: {
      'PR-INS-001': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-INS-001', title: 'Instalación y puesta en marcha (grado 2)', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Instalación y puesta en marcha (grado 2)' },
          { id: 'crit', heading: 'Criterio', text: 'La instalación se ejecuta como grado 2 de UNE-EN 50131: panel con comunicación principal 4G y una vía de respaldo IP, sirena interior y detectores de cada zona definida con el cliente. Antes de dar la instalación por terminada se prueban cada detector, la sirena y la comunicación con la central receptora.' },
          { id: 'eval', heading: 'Evaluación', list: ['Prueba de comunicación 4G y de la vía de respaldo IP con la central receptora de alarmas', 'Comprobación del nivel de batería del panel y de cada sensor inalámbrico', 'Alta en el portal de partner de la marca en un máximo de 24 h desde la puesta en marcha'] }
        ]
      },
      'PR-MAN-004': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-MAN-004', title: 'Mantenimiento preventivo anual', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Mantenimiento preventivo anual' },
          { id: 'crit', heading: 'Criterio', text: 'Revisión preventiva anual de cada instalación: prueba de detectores, sirena y comunicación, y sustitución de toda batería por debajo del 30 % de carga en la propia visita. Un aviso de batería baja sin acuse en 48 h genera una visita de sustitución.' }
        ]
      },
      'PR-SOP-007': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-SOP-007', title: 'Gestión de falsas alarmas', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Gestión de falsas alarmas' },
          { id: 'crit', heading: 'Criterio', text: 'Dos o más falsas alarmas en 30 días en la misma instalación abren un análisis técnico en 48 h. Los cargos de desplazamiento de vigilante solo se repercuten al cliente si la causa es imputable a él. Acuse de reclamación en 24 h y resolución en 10 días hábiles.' }
        ]
      },
      'PR-RGPD-002': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-RGPD-002', title: 'Videoverificación y datos personales', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Videoverificación y datos personales' },
          { id: 'crit', heading: 'Criterio', text: 'La videoverificación solo se activa con el consentimiento firmado del cliente y sobre las zonas acordadas. Las imágenes se conservan como máximo 30 días y el acceso queda limitado a los operadores con perfil autorizado. Las brechas con riesgo para las personas se notifican a la AEPD en un máximo de 72 h.' }
        ]
      },
      'PR-COM-003': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-COM-003', title: 'Pérdida de comunicación de panel', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Pérdida de comunicación de panel' },
          { id: 'crit', heading: 'Criterio', text: 'Pérdida de comunicación: panel sin conexión con la central receptora durante más de 10 min. Caída masiva: más de 50 paneles sin comunicación en la misma zona. Ante una caída masiva se conmuta a la vía de respaldo IP y se verifica que los paneles vuelven a supervisarse; los paneles sin respaldo reciben visita prioritaria en un máximo de 24 h.' },
          { id: 'eval', heading: 'Evaluación', list: ['Aprueba el plan de una caída masiva el Responsable de soporte técnico', 'Aviso a los clientes afectados por Twilio SMS y comunicación a la marca por su portal de partner'] }
        ]
      },
      'PR-BAJ-005': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-BAJ-005', title: 'Baja de cliente y retirada de equipos', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Baja de cliente y retirada de equipos' },
          { id: 'crit', heading: 'Criterio', text: 'Acuse de la baja en 24 h y retirada de los equipos en 15 días hábiles, con borrado de claves, imágenes y datos del cliente antes de retirar el panel.' }
        ]
      },
      'PR-QLT-006': {
        type: 'doc', kind: 'Procedimiento', code: 'PR-QLT-006', title: 'Retirada de producto', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Retirada de producto' },
          { id: 'crit', heading: 'Criterio', text: 'Todo lote retirado se bloquea en SAP Business One y las instalaciones con unidades del lote se localizan por el código de lote en Salesforce CRM. Solo el Responsable de operaciones libera un lote retirado.' }
        ]
      },
      'WEB-CERT': {
        type: 'doc', kind: 'Certificaciones', code: null, label: 'Web corporativa', title: 'Habilitación y certificaciones · hub de Paterna', system: 'Procedimientos',
        org: 'Web corporativa de Guardián Ibérica Instalaciones · consultada el 13/10/2026',
        sections: [
          { id: 'hab', heading: 'Habilitación', text: 'Guardián Ibérica Instalaciones, S.L.U. está habilitada como empresa de seguridad privada e inscrita en el registro de empresas de seguridad (Ley 5/2014 y Orden INT/316/2011); instalaciones de grado 2 según UNE-EN 50131; instalador autorizado de Verisure, Sector Alarm y Prosegur Alarmas.' },
          { id: 'nota', heading: 'Nota de indexación', text: 'La página no indica el número de inscripción en el registro ni la fecha de la última verificación de la habilitación.' }
        ]
      },
      'MEM-2025': {
        type: 'doc', kind: 'Memoria anual', code: null, label: 'Memoria 2025', title: 'Memoria anual 2025', system: 'Procedimientos',
        org: 'Guardián Ibérica Instalaciones, S.L.U. · publicada el 01/07/2026',
        sections: [
          { id: 'aud', heading: 'Auditorías e inspecciones', text: 'Auditorías de partner, visitas de cliente e inspecciones en 2025: 11 (14 jornadas), sin sanciones.' },
          { id: 'pla', heading: 'Plantilla', text: 'Plantilla: 74 técnicos instaladores y 12 operadores de soporte técnico, el 100 % con formación anual de marca.' },
          { id: 'car', heading: 'Cartera', text: 'Cartera: unas 38.000 instalaciones activas (Verisure 15.200, Sector Alarm 12.100 y Prosegur Alarmas 10.700).' }
        ]
      },
      'POL-RC': {
        type: 'doc', kind: 'Póliza', code: null, label: 'Póliza RC', title: 'Póliza de responsabilidad civil de empresa de seguridad', system: 'Procedimientos',
        org: 'Guardián Ibérica Instalaciones · seguros',
        sections: [
          { id: 'rc', heading: 'Cobertura', text: 'Póliza de responsabilidad civil de empresa de seguridad privada: límite de 3.000.000 EUR por siniestro y año, con vigencia hasta el 31/12/2026.' },
          { id: 'ext', heading: 'Alcance', text: 'Cubre los daños personales, materiales y consecuenciales causados durante la instalación y el mantenimiento de los sistemas de alarma.' }
        ]
      },
      'SF-ORD': {
        type: 'record', kind: 'Órdenes de trabajo', code: 'Prosegur Alarmas', title: 'Instalaciones de Prosegur Alarmas · órdenes de trabajo', system: 'Salesforce CRM',
        org: 'Salesforce CRM · órdenes de trabajo',
        sections: [
          { id: 'ord', heading: 'Instalaciones', list: ['10.700 instalaciones activas de Prosegur Alarmas', 'Pruebas, fotos y firma del cliente registradas en la orden de trabajo de todas las instalaciones del último trimestre', 'Altas en el Prosegur Partner Portal confirmadas en 24 h en el último trimestre'] }
        ]
      },
      'SF-MAN': {
        type: 'record', kind: 'Revisiones anuales', code: 'Prosegur Alarmas', title: 'Mantenimiento preventivo de las instalaciones de Prosegur Alarmas', system: 'Salesforce CRM',
        org: 'Salesforce CRM · plan de mantenimiento',
        sections: [
          { id: 'rev', heading: 'Revisiones', list: ['Revisiones anuales realizadas en 2025: 9.870 de 10.700 instalaciones (92,2 %)', 'Revisiones pendientes con cita programada: 830'] }
        ]
      },
      'SF-FALSAS': {
        type: 'record', kind: 'Registro de reclamaciones', code: 'Reclamaciones', title: 'Reclamaciones por falsas alarmas registradas', system: 'Salesforce CRM',
        org: 'Salesforce CRM · reclamaciones y casos',
        sections: [
          { id: 'res', heading: 'Resumen', text: '5 cerradas con causa raíz y acción correctora registradas; 1 abierta (CLM-2026-0619).' },
          { id: 'det', heading: 'Reclamaciones cerradas', list: ['CLM-2026-0488 · 03/06/2026 · Cargo de vigilante por una falsa alarma · causa: Mascota en zona sin inmunidad · cargo repercutido al cliente', 'CLM-2026-0311 · 21/04/2026 · Falsas alarmas repetidas · causa: Detector mal orientado en la instalación · cargos anulados y abonados'] }
        ]
      },
      'COM-LOG': {
        type: 'record', kind: 'Incidencias', code: 'Comunicación', title: 'Soporte técnico · incidencias de comunicación recientes', system: 'Salesforce CRM',
        org: 'Salesforce CRM · incidencias de soporte técnico',
        sections: [
          { id: 'inc', heading: 'Últimas incidencias', list: ['ALM-COM-0488 · 12/08/2026 · 37 paneles · caída del operador móvil · conmutados a respaldo IP en 18 min · cerrada conforme', 'ALM-COM-0552 · 02/09/2026 · 12 paneles · fallo de antena · conmutados a respaldo IP en 9 min · cerrada conforme', 'ALM-COM-0590 · 30/09/2026 · 61 paneles · mantenimiento del operador móvil · conmutados a respaldo IP en 22 min · cerrada conforme'] }
        ]
      },
      'SAP-INS': {
        type: 'record', kind: 'Ficha de instalación', code: 'INS-2026-VLC-04417', title: 'Instalación INS-2026-VLC-04417 · origen y alta', system: 'SAP Business One',
        org: 'SAP Business One · ficha de instalación',
        sections: [
          { id: 'origen', heading: 'Origen y alta', text: 'Panel de alarma de la compra al fabricante FAC-PA-26-3318 (02/09/2026), recepción en el hub de Paterna a las 09:15, instalación de grado 2 conforme el 14/09/2026 y alta en el Prosegur Partner Portal' }
        ]
      },
      'SF-INS': {
        type: 'record', kind: 'Traza hacia delante', code: 'INS-2026-VLC-04417', title: 'Instalación INS-2026-VLC-04417 · contrato y órdenes de trabajo', system: 'Salesforce CRM',
        org: 'Salesforce CRM · historial de la instalación',
        sections: [
          { id: 'fwd', heading: 'Contrato y órdenes', text: '1 contrato: PA-2026-30871 de Prosegur Alarmas, instalado el 14/09/2026 con 4 detectores y 2 órdenes de trabajo (OT-2026-01120, OT-2026-01198)' }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'HOM 2026 · A1', sec: 'A', topic: 'Habilitación como empresa de seguridad', conf: 'media',
        qEs: 'Acredite la habilitación de la empresa como empresa de seguridad privada (Ley 5/2014 y Orden INT/316/2011), con el número de inscripción en el registro y la fecha de la última verificación.',
        es: 'Guardián Ibérica Instalaciones, S.L.U. está habilitada como empresa de seguridad privada e inscrita en el registro de empresas de seguridad conforme a la Ley 5/2014 y la Orden INT/316/2011 [1]. Se adjuntará el certificado de inscripción vigente, con su número y la fecha de la última verificación.',
        cites: [
          { src: 'WEB-CERT', q: 'está habilitada como empresa de seguridad privada e inscrita en el registro de empresas de seguridad (Ley 5/2014 y Orden INT/316/2011)' }
        ],
        gap: 'El número de inscripción y la fecha de la última verificación de la habilitación no aparecen en las fuentes indexadas. Adjunta el certificado de inscripción vigente antes de enviar.'
      },
      {
        id: 'A2', ref: 'HOM 2026 · A2', sec: 'A', topic: 'Auditorías del último año', conf: 'alta',
        qEs: '¿Cuántas auditorías (de marca, de cliente y oficiales) recibió la empresa el último año? ¿Hubo sanciones o actuaciones de la autoridad?',
        es: 'En 2025 Guardián Ibérica Instalaciones recibió 11 auditorías de partner, visitas de cliente e inspecciones oficiales, con un total de 14 jornadas y sin sanciones [1].',
        cites: [
          { src: 'MEM-2025', q: 'Auditorías de partner, visitas de cliente e inspecciones en 2025: 11 (14 jornadas), sin sanciones' }
        ],
        note: {
          tone: 'brand', icon: 'info', title: 'Dato de empresa',
          text: 'La memoria publica la cifra de toda la empresa, sin desglose por marca. Si Prosegur Alarmas la pide solo para sus instalaciones, la completa Cumplimiento.'
        }
      },
      {
        id: 'B1', ref: 'HOM 2026 · B1', sec: 'B', topic: 'Instalación y puesta en marcha (grado 2)', conf: 'alta',
        qEs: 'Describa cómo se ejecuta una instalación de grado 2 según UNE-EN 50131, las pruebas de puesta en marcha y el alta de la instalación en el portal de la marca.',
        es: 'Toda instalación se ejecuta como grado 2 de UNE-EN 50131: panel con comunicación principal 4G y una vía de respaldo IP, sirena interior y detectores de cada zona definida con el cliente [1]. Antes de darla por terminada se prueba la comunicación 4G y de respaldo IP con la central receptora y se comprueba el nivel de batería del panel y de cada sensor [2][3]. La instalación se da de alta en el portal de partner en un máximo de 24 h desde la puesta en marcha [4], y las pruebas, las fotos y la firma del cliente quedan registradas en la orden de trabajo [5].',
        cites: [
          { src: 'PR-INS-001', q: 'La instalación se ejecuta como grado 2 de UNE-EN 50131: panel con comunicación principal 4G y una vía de respaldo IP, sirena interior y detectores de cada zona definida con el cliente' },
          { src: 'PR-INS-001', q: 'Prueba de comunicación 4G y de la vía de respaldo IP con la central receptora de alarmas' },
          { src: 'PR-INS-001', q: 'Comprobación del nivel de batería del panel y de cada sensor inalámbrico' },
          { src: 'PR-INS-001', q: 'Alta en el portal de partner de la marca en un máximo de 24 h desde la puesta en marcha' },
          { src: 'SF-ORD', q: 'Pruebas, fotos y firma del cliente registradas en la orden de trabajo de todas las instalaciones del último trimestre' }
        ],
        note: {
          tone: 'warn', icon: 'link', title: 'Lote en retirada · PIR-2607-A · REC-2026-1019',
          text: 'El lote PIR-2607-A del detector PIR-200 (Sentinela Electronics) está en retirada por el riesgo de sobrecalentamiento de su batería de litio: 158 hogares de Prosegur Alarmas tienen unidades instaladas (912 hogares entre las tres marcas). Revisad que esta respuesta sea coherente con la campaña antes de enviarla.',
          outcome: 'retirada', with: { any: 'Estado de la campaña: {label}.' },
          go: 'retirada', goLabel: 'Abrir la campaña'
        }
      },
      {
        id: 'B2', ref: 'HOM 2026 · B2', sec: 'B', topic: 'Mantenimiento preventivo anual', conf: 'alta',
        qEs: '¿Realizan un mantenimiento preventivo anual de las instalaciones? Indique su contenido, el tratamiento de las baterías y el porcentaje de revisiones realizadas el último año.',
        es: 'Sí. Cada instalación tiene una revisión preventiva anual con prueba de detectores, sirena y comunicación, y sustitución de toda batería por debajo del 30 % de carga en la propia visita [1]. Un aviso de batería baja sin acuse en 48 h genera una visita de sustitución [2]. En 2025 se realizaron 9.870 de las 10.700 revisiones anuales de Prosegur Alarmas (92,2 %), y las 830 pendientes tienen cita programada [3][4].',
        cites: [
          { src: 'PR-MAN-004', q: 'Revisión preventiva anual de cada instalación: prueba de detectores, sirena y comunicación, y sustitución de toda batería por debajo del 30 % de carga en la propia visita' },
          { src: 'PR-MAN-004', q: 'Un aviso de batería baja sin acuse en 48 h genera una visita de sustitución' },
          { src: 'SF-MAN', q: 'Revisiones anuales realizadas en 2025: 9.870 de 10.700 instalaciones (92,2 %)' },
          { src: 'SF-MAN', q: 'Revisiones pendientes con cita programada: 830' }
        ],
        note: {
          tone: 'brand', icon: 'activity', title: 'Estado de hoy en el hub',
          text: 'El tablero marca hoy 118 mantenimientos programados, 9 de ellos urgentes. No cambian los datos anuales de Prosegur Alarmas, así que la respuesta no cambia.'
        }
      },
      {
        id: 'B3', ref: 'HOM 2026 · B3', sec: 'B', topic: 'Gestión de falsas alarmas', conf: 'alta',
        qEs: '¿Cómo gestionan las falsas alarmas y los cargos que generan al cliente? Indique los plazos de reclamación y cómo se registran las causas.',
        es: 'Dos o más falsas alarmas en 30 días en la misma instalación abren un análisis técnico en 48 h [1]. Los cargos de desplazamiento de vigilante solo se repercuten al cliente si la causa es imputable a él [1]. Las reclamaciones se acusan en 24 h y se resuelven en 10 días hábiles [1], y se registran en el CRM con su causa raíz y su acción correctora: las 5 cerradas en 2026 la tienen registrada [2].',
        cites: [
          { src: 'PR-SOP-007', q: 'Dos o más falsas alarmas en 30 días en la misma instalación abren un análisis técnico en 48 h. Los cargos de desplazamiento de vigilante solo se repercuten al cliente si la causa es imputable a él. Acuse de reclamación en 24 h y resolución en 10 días hábiles.' },
          { src: 'SF-FALSAS', q: '5 cerradas con causa raíz y acción correctora registradas' }
        ],
        note: {
          tone: 'warn', icon: 'mail', title: 'Reclamación abierta de otra marca · CLM-2026-0619',
          text: 'GII tiene abierta la reclamación CLM-2026-0619 de una clienta de Sector Alarm (Burjassot): cargos de desplazamiento de vigilante por dos falsas alarmas, con causa raíz probable en un sensor PIR de salón con batería baja sin aviso. No afecta a Prosegur Alarmas, pero revisad que esta respuesta sea coherente con el análisis antes de enviarla.',
          outcome: 'reclamacion', tone_done: 'brand',
          text_done: 'La reclamación CLM-2026-0619 se ha gestionado en esta sesión:', with: { any: '{label}.' },
          go: 'reclamacion', goLabel: 'Abrir la reclamación'
        }
      },
      {
        id: 'B4', ref: 'HOM 2026 · B4', sec: 'B', topic: 'Certificación de los instaladores', conf: 'none',
        qEs: 'Aporte la relación de técnicos instaladores con su acreditación profesional, su cualificación según UNE-EN 50131 y las certificaciones de cada marca, con las fechas de caducidad.',
        flag: {
          reason: 'Solo hay evidencia indirecta: ningún documento indexado relaciona a los técnicos con su acreditación personal ni con su cualificación.',
          partial: [
            { src: 'MEM-2025', q: 'el 100 % con formación anual de marca', why: 'La formación anual de marca no acredita la certificación de cada instalador ni su cualificación UNE-EN 50131.' },
            { src: 'WEB-CERT', q: 'instalaciones de grado 2 según UNE-EN 50131', why: 'Acredita el grado de las instalaciones, no la certificación personal de los técnicos.' }
          ],
          missing: ['Relación de técnicos con su acreditación profesional y su fecha de caducidad', 'Certificados de cualificación UNE-EN 50131 de los instaladores', 'Certificados de formación de cada marca partner', 'Registro de formación continua con fechas']
        }
      },
      {
        id: 'B5', ref: 'HOM 2026 · B5', sec: 'B', topic: 'Subcontratas', conf: 'none',
        qEs: '¿Subcontratan total o parcialmente la instalación o el mantenimiento? En caso afirmativo, indique las empresas, su habilitación y las cláusulas de protección de datos de los contratos.',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados trata la subcontratación de instalaciones o de mantenimiento.',
          partial: [
            { src: 'MEM-2025', q: 'Plantilla: 74 técnicos instaladores y 12 operadores de soporte técnico', why: 'Describe la plantilla propia, pero no indica si se subcontratan servicios ni a quién.' }
          ],
          missing: ['Relación de subcontratistas de instalación y mantenimiento', 'Contratos de subcontratación con cláusulas de protección de datos y de seguridad', 'Evidencia de que cada subcontrata está habilitada como empresa de seguridad']
        }
      },
      {
        id: 'C1', ref: 'HOM 2026 · C1', sec: 'C', topic: 'Pérdida de comunicación de paneles', conf: 'alta',
        qEs: '¿Qué hacen cuando un panel pierde la comunicación con la central receptora y qué ocurre si afecta a muchos paneles a la vez?',
        es: 'Un panel sin conexión con la central receptora durante más de 10 min se trata como pérdida de comunicación [1]. Si hay más de 50 paneles sin comunicación en la misma zona, es una caída masiva: se conmuta a la vía de respaldo IP y se verifica que los paneles vuelven a supervisarse [2], y los paneles sin respaldo reciben visita prioritaria en un máximo de 24 h [3]. El plan lo aprueba el Responsable de soporte técnico [4] y se avisa a los clientes afectados por SMS y a la marca por su portal de partner [5].',
        cites: [
          { src: 'PR-COM-003', q: 'Pérdida de comunicación: panel sin conexión con la central receptora durante más de 10 min' },
          { src: 'PR-COM-003', q: 'Caída masiva: más de 50 paneles sin comunicación en la misma zona. Ante una caída masiva se conmuta a la vía de respaldo IP y se verifica que los paneles vuelven a supervisarse' },
          { src: 'PR-COM-003', q: 'los paneles sin respaldo reciben visita prioritaria en un máximo de 24 h' },
          { src: 'PR-COM-003', q: 'Aprueba el plan de una caída masiva el Responsable de soporte técnico' },
          { src: 'PR-COM-003', q: 'Aviso a los clientes afectados por Twilio SMS y comunicación a la marca por su portal de partner' }
        ],
        note: {
          tone: 'warn', icon: 'thermometer', title: 'Caída de comunicación en curso · ALM-COM-0611',
          text: '214 paneles (principalmente de Sector Alarm y Verisure) llevan sin comunicación 4G desde las 05:10 en Valencia Norte tras un mantenimiento del operador móvil; 38 no tienen vía de respaldo y necesitan visita prioritaria. La respuesta describe el procedimiento, no el caso de hoy.',
          outcome: 'alarma', with: { approved: 'En la alarma del turno: {label}.', any: 'En la alarma del turno se ha rechazado la propuesta.' },
          without: 'La decisión sobre esos paneles se toma en la alarma del turno.',
          go: 'alarma', goLabel: 'Abrir la alarma'
        }
      },
      {
        id: 'C2', ref: 'HOM 2026 · C2', sec: 'C', topic: 'Tiempos de conmutación a respaldo', conf: 'alta',
        qEs: 'Facilite ejemplos recientes de pérdidas de comunicación de paneles, con el tiempo hasta recuperar la supervisión.',
        es: 'Las tres últimas caídas de comunicación se resolvieron conmutando los paneles a la vía de respaldo IP en 22 minutos como máximo y se cerraron conformes: 37 paneles el 12/08/2026 en 18 minutos [1], 12 paneles el 02/09/2026 en 9 minutos [2] y 61 paneles el 30/09/2026 en 22 minutos [3].',
        cites: [
          { src: 'COM-LOG', q: 'ALM-COM-0488 · 12/08/2026 · 37 paneles · caída del operador móvil · conmutados a respaldo IP en 18 min · cerrada conforme' },
          { src: 'COM-LOG', q: 'ALM-COM-0552 · 02/09/2026 · 12 paneles · fallo de antena · conmutados a respaldo IP en 9 min · cerrada conforme' },
          { src: 'COM-LOG', q: 'ALM-COM-0590 · 30/09/2026 · 61 paneles · mantenimiento del operador móvil · conmutados a respaldo IP en 22 min · cerrada conforme' }
        ],
        note: {
          tone: 'ok', icon: 'check-circle', title: 'Aplicado hoy',
          text: 'Este procedimiento se ha aplicado esta mañana en la alarma del turno:',
          outcome: 'alarma', requires: 'approved', with: { approved: '{label}.' }
        }
      },
      {
        id: 'C3', ref: 'HOM 2026 · C3', sec: 'C', topic: 'Baja de cliente y retirada de equipos', conf: 'alta',
        qEs: '¿Qué proceso siguen cuando un cliente de la marca solicita la baja y cómo retiran los equipos y los datos?',
        es: 'La baja se acusa en 24 h y los equipos se retiran en un máximo de 15 días hábiles [1]. Antes de retirar el panel se borran las claves, las imágenes y los datos del cliente [1].',
        cites: [
          { src: 'PR-BAJ-005', q: 'Acuse de la baja en 24 h y retirada de los equipos en 15 días hábiles, con borrado de claves, imágenes y datos del cliente antes de retirar el panel' }
        ]
      },
      {
        id: 'D1', ref: 'HOM 2026 · D1', sec: 'D', topic: 'Trazabilidad de la instalación y simulacro de retirada', conf: 'media',
        qEs: '¿Pueden trazar una instalación hacia atrás hasta el fabricante y hacia delante hasta el contrato y las órdenes de trabajo? Indique el objetivo de tiempo de una traza completa y la fecha y el resultado del último simulacro de retirada de producto.',
        es: 'Sí. Cada instalación queda vinculada en Salesforce y SAP Business One a la compra del equipo, a su lote, a su contrato y a cada orden de trabajo. Por ejemplo, INS-2026-VLC-04417 se traza hacia atrás hasta la compra al fabricante FAC-PA-26-3318, con la instalación de grado 2 conforme [1], y hacia delante hasta el contrato PA-2026-30871 de Prosegur Alarmas, instalado el 14/09/2026, y 2 órdenes de trabajo [2]. En una retirada, las instalaciones con unidades de un lote se localizan por el código de lote [3].',
        cites: [
          { src: 'SAP-INS', q: 'Panel de alarma de la compra al fabricante FAC-PA-26-3318 (02/09/2026), recepción en el hub de Paterna a las 09:15, instalación de grado 2 conforme el 14/09/2026 y alta en el Prosegur Partner Portal' },
          { src: 'SF-INS', q: '1 contrato: PA-2026-30871 de Prosegur Alarmas, instalado el 14/09/2026 con 4 detectores y 2 órdenes de trabajo (OT-2026-01120, OT-2026-01198)' },
          { src: 'PR-QLT-006', q: 'las instalaciones con unidades del lote se localizan por el código de lote en Salesforce CRM' }
        ],
        gap: 'El objetivo de tiempo de una traza completa y la fecha y el resultado del último simulacro de retirada no están en las fuentes indexadas.',
        gapGo: 'retirada', gapGoLabel: 'Hacer un simulacro ahora', gapOutcome: 'retirada'
      },
      {
        id: 'D2', ref: 'HOM 2026 · D2', sec: 'D', topic: 'Videoverificación y protección de datos', conf: 'alta',
        qEs: 'Describa cómo cumplen el RGPD en la videoverificación: consentimiento, conservación de imágenes, control de accesos y notificación de brechas.',
        es: 'La videoverificación solo se activa con el consentimiento firmado del cliente y sobre las zonas acordadas [1]. Las imágenes se conservan como máximo 30 días y el acceso queda limitado a los operadores con perfil autorizado [2]. Las brechas con riesgo para las personas se notifican a la AEPD en un máximo de 72 h [3].',
        cites: [
          { src: 'PR-RGPD-002', q: 'La videoverificación solo se activa con el consentimiento firmado del cliente y sobre las zonas acordadas' },
          { src: 'PR-RGPD-002', q: 'Las imágenes se conservan como máximo 30 días y el acceso queda limitado a los operadores con perfil autorizado' },
          { src: 'PR-RGPD-002', q: 'Las brechas con riesgo para las personas se notifican a la AEPD en un máximo de 72 h' }
        ]
      },
      {
        id: 'D3', ref: 'HOM 2026 · D3', sec: 'D', topic: 'Continuidad de negocio y ciberseguridad', conf: 'none',
        qEs: '¿Tienen documentado un plan de continuidad de negocio y las medidas de ciberseguridad de las comunicaciones de los paneles (cifrado, gestión de claves y respuesta ante incidentes)? ¿Cuándo se revisaron por última vez?',
        flag: {
          reason: 'El plan de continuidad de negocio y las medidas de ciberseguridad de las comunicaciones no están entre los documentos indexados.',
          context: 'Como empresa de seguridad privada que opera sistemas de alarma, Guardián Ibérica Instalaciones debería disponer de ambos documentos en Operaciones o en Cumplimiento. Agentic Platform no describe su contenido ni supone una fecha de revisión.',
          partial: [],
          missing: ['Plan de continuidad de negocio', 'Medidas de ciberseguridad de las comunicaciones de los paneles', 'Fecha de la última revisión de cada documento']
        }
      },
      {
        id: 'E1', ref: 'HOM 2026 · E1', sec: 'E', topic: 'Plantilla y formación', conf: 'alta',
        qEs: '¿Cuántos técnicos y operadores forman la plantilla que presta el servicio y qué formación reciben cada año?',
        es: 'La plantilla está formada por 74 técnicos instaladores y 12 operadores de soporte técnico, el 100 % con formación anual de marca [1].',
        cites: [
          { src: 'MEM-2025', q: 'Plantilla: 74 técnicos instaladores y 12 operadores de soporte técnico, el 100 % con formación anual de marca' }
        ]
      },
      {
        id: 'E2', ref: 'HOM 2026 · E2', sec: 'E', topic: 'Seguro de responsabilidad civil', conf: 'alta',
        qEs: '¿Disponen de seguro de responsabilidad civil de empresa de seguridad? Indique el límite de cobertura, su alcance y su vigencia.',
        es: 'Sí. La póliza de responsabilidad civil de empresa de seguridad privada tiene un límite de 3.000.000 EUR por siniestro y año, con vigencia hasta el 31/12/2026 [1], y cubre los daños personales, materiales y consecuenciales causados durante la instalación y el mantenimiento de los sistemas de alarma [2].',
        cites: [
          { src: 'POL-RC', q: 'límite de 3.000.000 EUR por siniestro y año, con vigencia hasta el 31/12/2026' },
          { src: 'POL-RC', q: 'Cubre los daños personales, materiales y consecuenciales causados durante la instalación y el mantenimiento de los sistemas de alarma' }
        ]
      }
    ]
  }
});
