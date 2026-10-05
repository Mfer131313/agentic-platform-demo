/* Autopista Multimotor · cuestionario de homologación de proveedor de movilidad de un cliente corporativo (Iberian Transport Company). Escenario de demostración con datos sintéticos (MFM). */
agenticPack('autopista', {
  cuestionario: {
    agent: 'Cuestionarios de cliente',
    lang: 'en',
    default_sel: 'B1',
    reviewer: 'Responsable de Calidad de turno',
    assignee: 'Responsable de Calidad del hub',
    assignee_short: 'Calidad del hub',
    team: 'Calidad',
    assign_due: '2026-10-07',
    responder: 'Autopista Multimotor, S.L.U. (Hub de Madrid)',
    site: 'Madrid (Marqués de Soria)',
    site_label: 'Hub',
    page_title: 'Cuestionario de proveedor · Iberian Transport Company',
    report_title: 'Respuesta a cuestionario de homologación de proveedor',
    ref_label: 'Referencia del cliente',
    scope_meta_label: 'Servicios',
    discard_placeholder: 'Por ejemplo: esta pregunta se responde con el certificado adjunto',
    save_system: 'Salesforce CRM',
    qn: {
      code: 'CUE-2026-041',
      title: 'Vendor Mobility Questionnaire 2026',
      customer: 'Iberian Transport Company',
      via: 'ITC Procurement Office',
      received: '2026-09-28T16:20',
      due: '2026-10-09',
      file: 'Vendor_Mobility_Questionnaire_2026.xlsx',
      scope: 'SUB-2026-0188 · Suscripción corporativa de 6 meses (12 vehículos: 6 VW Golf, 4 Skoda Octavia y 2 SEAT León) y ALQ-CORP · Alquiler corporativo de corta duración de Iberian Transport Company',
      scope_short: 'SUB-2026-0188 · ALQ-CORP',
      scope_label: '2 servicios de movilidad'
    },
    email: {
      mailbox: 'buzón de Calidad',
      headers: {
        From: 'Procurement Office, Iberian Transport Company <procurement@iberiantransport.example>',
        To: 'Calidad, Autopista Multimotor <calidad@apm-demo.example>',
        Date: 'Mon, 28 Sep 2026 15:20 (Madrid time)',
        Subject: 'Vendor Mobility Questionnaire 2026 - subscription and rental services - response due 9 October'
      },
      text: 'Dear Quality Team,\n\nAs part of the annual review of our mobility suppliers, Iberian Transport Company has issued its Vendor Mobility Questionnaire 2026 for the services you provide to us:\n- Corporate subscription SUB-2026-0188 (12 vehicles, 6 months)\n- Corporate short-term rental (ALQ-CORP)\n\nThe questionnaire has 15 questions in five sections: certification and audits, vehicle safety and integrity, availability and service levels, traceability and incidents, and compliance and sustainability.\n\nPlease answer every question in English and reference the procedure, record or certificate that supports each answer. We need the completed questionnaire by Friday 9 October 2026.\n\nKind regards,\n\nProcurement Office\nIberian Transport Company',
      highlights: [
        { text: 'Corporate subscription SUB-2026-0188 (12 vehicles, 6 months)', label: 'Servicio', tone: 'brand' },
        { text: 'Corporate short-term rental (ALQ-CORP)', label: 'Servicio', tone: 'brand' },
        { text: '15 questions', label: 'Preguntas', tone: 'brand' },
        { text: 'reference the procedure, record or certificate that supports each answer', label: 'Requisito' },
        { text: 'Friday 9 October 2026', label: 'Plazo' }
      ]
    },
    sections: [
      { id: 'A', es: 'Certificación y auditorías', en: 'Certification and audits' },
      { id: 'B', es: 'Seguridad e integridad del vehículo', en: 'Vehicle safety and integrity' },
      { id: 'C', es: 'Disponibilidad y niveles de servicio', en: 'Availability and service levels' },
      { id: 'D', es: 'Trazabilidad e incidencias', en: 'Traceability and incidents' },
      { id: 'E', es: 'Cumplimiento y sostenibilidad', en: 'Compliance and sustainability' }
    ],
    kpi: { label: 'Auditorías y visitas en 2025', value: 23, sub: 'Incluye inspecciones oficiales · 31 jornadas · Memoria de Sostenibilidad 2025', icon: 'shield-check' },
    sources_sub: 'Procedimientos, fichas de servicio, certificados y memoria',
    identify_result: 'Iberian Transport Company vía ITC Procurement Office · SUB-2026-0188 y ALQ-CORP',
    search_scope: 'procedimientos de Calidad, fichas de servicio, certificaciones y memoria',
    lookups: [
      { system: 'SAP ERP', action: 'Consulta el contrato, la compra al fabricante y las altas de los vehículos de SUB-2026-0188', result: 'VIN-2026-MAD-VW-021: FAC-VW-26-4471, PDI conforme · contrato SUB-2026-0188 con 12 vehículos', ms: 520 },
      { system: 'Odoo Inventario', action: 'Lee la ruta de entrega y las inspecciones registradas de la flota del cliente', result: 'Entrega del 01/09/2026: PDI de 42 puntos conforme en los 12 vehículos', ms: 480 },
      { system: 'iCare Taller', action: 'Revisa el historial de taller y las campañas de fabricante abiertas', result: '6 Golf en alcance de REC-VW-2026-001 (ABS) · revisiones de 10.000 km conformes', ms: 410 },
      { system: 'DocuSign', action: 'Comprueba el contrato firmado y sus condiciones', result: 'SUB-2026-0188 firmado el 25/08/2026 · mantenimiento, seguro y vehículo de sustitución incluidos', ms: 300 },
      { system: 'Salesforce CRM', action: 'Busca reclamaciones abiertas y cerradas de este cliente', result: 'REC-2026-0451 abierta: costuras rotas en el asiento de un BMW X5', ms: 350, tone: 'warn' },
      { system: 'iCare Taller', action: 'Cruza los servicios de este cliente con las incidencias de hoy', result: '3 servicios de Golf de SUB-2026-0188 afectados por la baja de un técnico VW (capacidad del taller -30 %)', ms: 390, tone: 'warn' }
    ],
    compare: {
      people: '2-3: Calidad del hub, Calidad de cliente y, según la pregunta, Taller o Finanzas',
      systems: '6-8: correo, Excel del cliente, Salesforce, SAP, carpeta de certificados, procedimientos y memoria de sostenibilidad',
      steps: 'Buscar la fuente de cada pregunta, copiar y adaptar respuestas de otros años, pedir datos a otros departamentos y montar el Excel',
      time: '2-4 h de trabajo de Calidad, repartidas en 2-3 días'
    },
    presenter: {
      before: [
        'Cada cliente corporativo trae su cuestionario de proveedor. En 2025 Autopista Multimotor recibió 23 auditorías de marca, visitas de cliente e inspecciones: 31 jornadas. Es trabajo de fondo que se come horas de Calidad.',
        'Este llega de Iberian Transport Company: {total} preguntas en inglés sobre su suscripción corporativa de 12 vehículos y el alquiler corporativo. Vuestros procedimientos están en español; da igual.',
        'Al pulsar, Agentic Platform busca en procedimientos, fichas de servicio y certificaciones, y en los registros de SAP, Odoo, iCare, DocuSign y Salesforce, y redacta cada respuesta con su fuente.'
      ],
      during: [
        '{drafted} de {total} con borrador y cita; cada cita se comprueba contra el texto de la fuente. {flagged} quedan para Calidad: protección de datos de telemetría, baterías de vehículos electrificados y continuidad de negocio. Sin documento que lo respalde, no se inventa nada.',
        'B1: además de responder, avisa de que este mismo cliente tiene abierta la reclamación REC-2026-0451 por unas costuras rotas y de que 6 de sus Golf siguen pendientes de la campaña ABS. Hoy eso depende de que alguien se acuerde.',
        'C1: 3 servicios de Golf de este cliente están afectados por la baja del técnico VW de hoy. El cuestionario no vive aislado del resto del hub.',
        'Nada sale sin aprobación: en bloque solo las de confianza alta; las de confianza media se revisan una a una.'
      ],
      next_during: 'Enseñar B1 (cita y aviso de la reclamación) y B4 (sin evidencia). Después «Aprobar las {alta} de confianza alta», aprobar {media_ids} una a una y «Asignar las {flagged} sin fuente a Calidad del hub».'
    },
    sources: {
      'PNT-CAL-012': {
        type: 'doc', kind: 'Procedimiento', code: 'PNT-CAL-012', title: 'Capacidad del taller y reprogramación de servicios', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Capacidad del taller y reprogramación de servicios' },
          { id: 'crit', heading: 'Criterio', text: 'Capacidad del taller por debajo del 80 % durante más de 24 h: reprogramación de los servicios no urgentes, aviso al cliente y prioridad para los vehículos de suscripción y de campaña de seguridad. Si el vehículo queda inmovilizado más de 24 h: vehículo de sustitución.' },
          { id: 'eval', heading: 'Evaluación', list: ['Medir la capacidad disponible por especialidad de marca (técnicos y puestos de trabajo)', 'Revisar las citas de las próximas 2 semanas y su prioridad', 'Decisión por servicio: mantener la cita, reprogramar o derivar a otro taller de la red de marca'] }
        ]
      },
      'PNT-CAL-015': {
        type: 'doc', kind: 'Procedimiento', code: 'PNT-CAL-015', title: 'Inmovilización y liberación de vehículos (retención de calidad)', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Inmovilización y liberación de vehículos (retención de calidad)' },
          { id: 'crit', heading: 'Criterio', text: 'Toda inmovilización se registra en SAP (vehículo bloqueado para entrega) y en Odoo Inventario (unidad inmovilizada, entregas retenidas). Solo el Responsable de Calidad libera.' }
        ]
      },
      'PNT-CAL-020': {
        type: 'doc', kind: 'Procedimiento', code: 'PNT-CAL-020', title: 'Gestión de reclamaciones de cliente y análisis de causa raíz', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Gestión de reclamaciones de cliente y análisis de causa raíz' },
          { id: 'crit', heading: 'Criterio', text: 'Acuse de recibo en 24 h, propuesta de solución en 5 días hábiles y cierre en el plazo pactado con el cliente (por defecto, 15 días hábiles).' }
        ]
      },
      'PNT-CAL-031': {
        type: 'doc', kind: 'Procedimiento', code: 'PNT-CAL-031', title: 'Inspección pre-entrega (PDI) y controles de seguridad del vehículo', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Inspección pre-entrega (PDI) y controles de seguridad del vehículo' },
          { id: 'crit', heading: 'Criterio', text: 'Los controles de seguridad (frenos, neumáticos y luces) son obligatorios: verificación en cada entrega y cada 10.000 km. Si una verificación no se supera, el vehículo queda inmovilizado hasta la decisión de Calidad.' }
        ]
      },
      'IT-TAL-VIN-02': {
        type: 'doc', kind: 'Instrucción técnica', code: 'IT-TAL-VIN-02', title: 'Consulta de campañas de fabricante por VIN y revisión de frenos', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Consulta de campañas de fabricante por VIN y revisión de frenos' },
          { id: 'crit', heading: 'Criterio', text: 'Consulta semanal de campañas de fabricante por VIN; si hay un vehículo afectado, cita en taller y revisión reforzada hasta cerrar la campaña.' }
        ]
      },
      'FT-SUB': {
        type: 'doc', kind: 'Ficha de servicio', code: 'FS-SUB-CORP-6M', title: 'Ficha de servicio · Suscripción corporativa de 6 meses', system: 'Procedimientos',
        org: 'Autopista Multimotor · Especificaciones de servicio',
        sections: [
          { id: '1', heading: '1. Servicio', text: 'Suscripción corporativa de 6 meses · vehículos de marca VW, Skoda y SEAT con cambio de vehículo a los 6 meses sin coste adicional.' },
          { id: '2', heading: '2. Incluye', text: 'Incluye: mantenimiento preventivo, seguro a todo riesgo con franquicia de 500 EUR y vehículo de sustitución en reparaciones de más de 24 h.' },
          { id: '3', heading: '3. Exclusiones', text: 'Exclusiones: multas de tráfico, combustible y daños por uso indebido. Sin cargos ocultos ni penalización por cancelación de la suscripción a partir del mes 3.' },
          { id: '4', heading: '4. Plazos', text: 'Entrega en 5 días hábiles desde la firma del contrato. Cambio de vehículo en 3 días hábiles.' },
          { id: '5', heading: '5. Gestión', text: 'Contrato firmado con DocuSign y cobro mensual con Stripe. Gestión del contrato en Salesforce y SAP.' }
        ]
      },
      'FT-ALQ': {
        type: 'doc', kind: 'Ficha de servicio', code: 'FS-ALQ-CORP', title: 'Ficha de servicio · Alquiler corporativo de corta duración', system: 'Procedimientos',
        org: 'Autopista Multimotor · Especificaciones de servicio',
        sections: [
          { id: '1', heading: '1. Servicio', text: 'Alquiler corporativo de corta duración · flota de unas 1.000 unidades de BMW, Audi, Volkswagen, Skoda y SEAT con entrega en el hub o en la sede del cliente.' },
          { id: '2', heading: '2. Incluye', text: 'Incluye: seguro a todo riesgo con franquicia de 600 EUR, asistencia 24 h y kilometraje ilimitado.' },
          { id: '3', heading: '3. Exclusiones', text: 'Exclusiones: multas de tráfico, combustible y daños por uso indebido. Cargos por combustible y daños solo con inspección de devolución y fotos 360.' },
          { id: '4', heading: '4. Conservación', text: 'Limpieza e inspección de cada vehículo en cada devolución, con mantenimiento cada 10.000 km.' },
          { id: '5', heading: '5. Gestión', text: 'Reserva en la plataforma web y gestión de la flota en Odoo Inventario. Pagos con Stripe.' }
        ]
      },
      'WEB-CERT': {
        type: 'doc', kind: 'Certificaciones', code: null, label: 'Web corporativa', title: 'Calidad y certificaciones · hub de Madrid', system: 'Procedimientos',
        org: 'Web corporativa de Autopista Multimotor · consultada el 29/09/2026',
        sections: [
          { id: 'mad', heading: 'Hub de Madrid', text: 'Hub de Madrid (Marqués de Soria): ISO 9001, ISO 14001 y ISO 45001; red oficial de servicio de VW, Audi, SEAT, Skoda y BMW.' },
          { id: 'nota', heading: 'Nota de indexación', text: 'La página no indica la entidad de certificación ni la fecha de caducidad de cada certificado.' }
        ]
      },
      'MEM-2025': {
        type: 'doc', kind: 'Memoria anual', code: null, label: 'Memoria 2025', title: 'Memoria de Sostenibilidad 2025', system: 'Procedimientos',
        org: 'Autopista Multimotor, S.L.U. · publicada el 01/07/2026',
        sections: [
          { id: 'aud', heading: 'Auditorías e inspecciones', text: 'Auditorías de marca, visitas de cliente e inspecciones en 2025: 23 (31 jornadas), sin sanciones.' },
          { id: 'tal', heading: 'Plantilla de taller', text: 'Plantilla de taller: 24 técnicos, el 100 % con formación anual de marca.' },
          { id: 'flo', heading: 'Flota', text: 'Flota de alquiler: unas 1.000 unidades, el 38 % con etiqueta ECO o 0 emisiones.' }
        ]
      },
      'ODOO-SUB': {
        type: 'record', kind: 'Registro de entrega', code: 'SUB-2026-0188', title: 'Contrato SUB-2026-0188 · entrega e inspecciones', system: 'Odoo Inventario',
        org: 'Odoo Inventario · registro de entrega',
        sections: [
          { id: 'ent', heading: 'Entrega', text: 'Entrega de los 12 vehículos a Iberian Transport Company el 01/09/2026, dentro del plazo de 5 días hábiles; contrato firmado el 25/08/2026 con DocuSign.' },
          { id: 'pdi', heading: 'Inspecciones', list: ['PDI de 42 puntos conforme en los 12 vehículos', 'Fotos 360 con kilometraje y nivel de combustible registrados en la entrega', 'Campañas de fabricante consultadas por VIN antes de la entrega: ninguna abierta a fecha 01/09/2026'] }
        ]
      },
      'ODOO-RUTA': {
        type: 'record', kind: 'Ruta de proceso', code: 'PDI', title: 'Ruta de preparación y entrega de vehículos de suscripción', system: 'Odoo Inventario',
        org: 'Odoo Inventario · orden de entrega',
        sections: [
          { id: 'ruta', heading: 'Ruta registrada', text: 'recepción del vehículo → PDI 42 puntos → preparación y limpieza → fotos 360 → firma de entrega en DocuSign' }
        ]
      },
      'ICARE-REV': {
        type: 'record', kind: 'Revisiones de seguridad', code: 'SUB-2026-0188', title: 'Revisiones de seguridad de los vehículos de SUB-2026-0188', system: 'iCare Taller',
        org: 'iCare Taller · órdenes de revisión',
        sections: [
          { id: 'qc', heading: 'Revisiones', list: ['Frenos, neumáticos y luces verificados en los 12 vehículos en la entrega del 01/09/2026', 'Revisiones de 10.000 km realizadas: 5 vehículos, todas conformes', 'Mantenimiento preventivo agendado en iCare para los 12 vehículos'] }
        ]
      },
      'SAP-VIN': {
        type: 'record', kind: 'Ficha de vehículo', code: 'VIN-2026-MAD-VW-021', title: 'Vehículo VIN-2026-MAD-VW-021 · origen y alta en flota', system: 'SAP ERP',
        org: 'SAP ERP · ficha de vehículo',
        sections: [
          { id: 'origen', heading: 'Origen y alta', text: 'VW Golf 1.5 TSI de la compra al fabricante FAC-VW-26-4471 (28/08/2026), recepción en el hub de Madrid a las 10:42, PDI de 42 puntos conforme y alta en flota de suscripción' }
        ]
      },
      'ODOO-VIN': {
        type: 'record', kind: 'Traza hacia delante', code: 'VIN-2026-MAD-VW-021', title: 'Vehículo VIN-2026-MAD-VW-021 · contrato y órdenes de taller', system: 'Odoo Inventario',
        org: 'Odoo Inventario · movimientos del vehículo',
        sections: [
          { id: 'fwd', heading: 'Contrato y taller', text: '1 contrato: SUB-2026-0188 con Iberian Transport Company, entrega 01/09/2026 y 2 órdenes de taller (OT-26-3084, OT-26-3110)' }
        ]
      },
      'ASIST-24': {
        type: 'record', kind: 'Incidencias', code: 'Asistencia 24 h', title: 'Asistencia 24 h · incidencias de Iberian Transport Company', system: 'Twilio SMS',
        org: 'Twilio SMS · avisos de asistencia',
        sections: [
          { id: 'inc', heading: 'Últimas incidencias', list: ['INC-26-1180 · 25/08/2026 16:10 · Aviso de pinchazo · asistencia en 38 min · cerrada conforme', 'INC-26-1204 · 28/08/2026 15:30 · Luz de aceite · asistencia en 41 min · cerrada conforme', 'INC-26-1297 · 25/09/2026 14:20 · Batería descargada · asistencia en 35 min · cerrada conforme'] }
        ]
      },
      'ICARE-TAL': {
        type: 'record', kind: 'Taller', code: 'MAD', title: 'Madrid · capacidad del taller de marca', system: 'iCare Taller',
        org: 'iCare Taller · datos maestros del taller',
        sections: [
          { id: 'cap', heading: 'Capacidad', text: 'Taller de Madrid: 14 puestos de trabajo, 24 técnicos de marca y cita de mantenimiento en 48 h' }
        ]
      },
      'ODOO-PLAN': {
        type: 'record', kind: 'Regla de planificación', code: 'Flota 2026', title: 'Plan de entregas y cambios de vehículo · reglas', system: 'Odoo Inventario',
        org: 'Odoo Inventario · plan de entregas',
        sections: [
          { id: 'reglas', heading: 'Reglas de planificación', list: ['Del contrato a la entrega: 5 días hábiles como máximo', 'Cambio de vehículo de suscripción: 3 días hábiles como máximo', 'Franjas de entrega de 60 min, de 08:00 a 20:00'] }
        ]
      },
      'ICARE-CAMP': {
        type: 'record', kind: 'Campañas de fabricante', code: 'Campañas', title: 'Campañas de fabricante abiertas en la flota', system: 'iCare Taller',
        org: 'iCare Taller · campañas de recall',
        sections: [
          { id: 'abiertas', heading: 'Campañas abiertas', list: ['REC-VW-2026-001 · ABS VW Golf/Passat · 47 unidades · 12 revisadas · 35 pendientes · plazo 15/11/2026', 'REC-BMW-2026-002 · Batería híbrida BMW X5/X7 · 18 unidades · 3 revisadas · 15 pendientes · plazo 30/11/2026'] }
        ]
      },
      'SF-RCL': {
        type: 'record', kind: 'Registro de reclamaciones', code: 'Reclamaciones', title: 'Reclamaciones de cliente registradas', system: 'Salesforce CRM',
        org: 'Salesforce CRM · reclamaciones y casos',
        sections: [
          { id: 'res', heading: 'Resumen', text: '4 cerradas con causa raíz y acción correctora registradas; 1 abierta (REC-2026-0451).' },
          { id: 'det', heading: 'Reclamaciones cerradas', list: ['REC-2026-0204 · 15/07/2026 · Cargo de combustible no justificado en un alquiler · causa: Lectura errónea del indicador en la devolución', 'REC-2026-0131 · 07/05/2026 · Daños no registrados en la entrega de un alquiler · causa: Fotos 360 incompletas en el check-in', 'REC-2026-0042 · 20/02/2026 · Revisión programada no realizada · causa: Cita no agendada en iCare', 'REC-2025-0311 · 14/11/2025 · Retraso en la entrega de un vehículo de suscripción · causa: Inspección de transporte con rayón y repintado'] }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'VMQ 2026 · A1', sec: 'A', topic: 'Certificaciones de calidad', conf: 'media',
        qEn: 'Please list the quality and management-system certifications held by the supplying site, with scope, certification body and expiry date.',
        qEs: 'Indique las certificaciones de calidad y de sistemas de gestión del centro que presta el servicio, con alcance, entidad de certificación y fecha de caducidad.',
        en: 'Both services are provided from our Madrid hub, which holds ISO 9001, ISO 14001 and ISO 45001 and is an official service network site for VW, Audi, SEAT, Skoda and BMW [1]. Copies of the current certificates, showing the certification body and expiry date of each, will be attached to this questionnaire.',
        es: 'Los dos servicios se prestan desde nuestro hub de Madrid, que cuenta con ISO 9001, ISO 14001 e ISO 45001 y es centro de la red oficial de servicio de VW, Audi, SEAT, Skoda y BMW [1]. Se adjuntarán las copias de los certificados vigentes, con la entidad de certificación y la fecha de caducidad de cada uno.',
        cites: [
          { src: 'WEB-CERT', q: 'Hub de Madrid (Marqués de Soria): ISO 9001, ISO 14001 y ISO 45001; red oficial de servicio de VW, Audi, SEAT, Skoda y BMW' }
        ],
        gap: 'La entidad de certificación y la fecha de caducidad de cada certificado no aparecen en las fuentes indexadas. Adjunta los certificados vigentes antes de enviar.'
      },
      {
        id: 'A2', ref: 'VMQ 2026 · A2', sec: 'A', topic: 'Auditorías del último año', conf: 'alta',
        qEn: 'How many audits (brand, customer and official) did your company receive in the last year, and were there any sanctions or enforcement actions?',
        qEs: '¿Cuántas auditorías (de marca, de cliente y oficiales) recibió la empresa el último año? ¿Hubo sanciones o actuaciones de la autoridad?',
        en: 'In 2025 Autopista Multimotor received 23 brand audits, customer visits and official inspections, totalling 31 audit days, with no sanctions [1].',
        es: 'En 2025 Autopista Multimotor recibió 23 auditorías de marca, visitas de cliente e inspecciones oficiales, con un total de 31 jornadas y sin sanciones [1].',
        cites: [
          { src: 'MEM-2025', q: 'Auditorías de marca, visitas de cliente e inspecciones en 2025: 23 (31 jornadas), sin sanciones' }
        ],
        note: {
          tone: 'brand', icon: 'info', title: 'Dato de empresa',
          text: 'La memoria publica la cifra de toda la empresa, sin desglose por centro. Si el cliente la pide solo para el hub de Madrid, la completa Calidad.'
        }
      },
      {
        id: 'B1', ref: 'VMQ 2026 · B1', sec: 'B', topic: 'Defectos y estado del vehículo en la entrega', conf: 'alta',
        qEn: 'Describe the controls in place to make sure vehicles are delivered free of defects and with open manufacturer campaigns checked, and how their effectiveness is maintained.',
        qEs: 'Describa los controles para que los vehículos se entreguen sin defectos y con las campañas abiertas del fabricante comprobadas, y cómo se mantiene su eficacia.',
        en: 'Every vehicle undergoes a 42-point pre-delivery inspection, with 360-degree photos, mileage and fuel level recorded at handover [1]. The registered route is vehicle intake, inspection, preparation and cleaning, photos and a delivery signature [2], under our pre-delivery inspection procedure [3]. Open manufacturer campaigns are checked weekly by VIN; if a vehicle is affected, a workshop appointment is booked and inspection is reinforced until the campaign is closed [4].',
        es: 'Todo vehículo pasa una inspección pre-entrega de 42 puntos, con fotos 360, kilometraje y nivel de combustible registrados en la entrega [1]. La ruta registrada es recepción del vehículo, inspección, preparación y limpieza, fotos y firma de entrega [2], según el procedimiento de inspección pre-entrega [3]. Las campañas abiertas de fabricante se consultan cada semana por VIN; si hay un vehículo afectado, se reserva cita en taller y se refuerza la revisión hasta cerrar la campaña [4].',
        cites: [
          { src: 'ODOO-SUB', q: 'PDI de 42 puntos conforme en los 12 vehículos' },
          { src: 'ODOO-RUTA', q: 'recepción del vehículo → PDI 42 puntos → preparación y limpieza → fotos 360 → firma de entrega en DocuSign' },
          { src: 'PNT-CAL-031', q: 'Inspección pre-entrega (PDI) y controles de seguridad del vehículo' },
          { src: 'IT-TAL-VIN-02', q: 'Consulta semanal de campañas de fabricante por VIN; si hay un vehículo afectado, cita en taller y revisión reforzada hasta cerrar la campaña' }
        ],
        note: {
          tone: 'warn', icon: 'link', title: 'Reclamación abierta de este cliente · REC-2026-0451',
          text: 'Iberian Transport Company tiene abierta la reclamación REC-2026-0451 (costuras rotas en el asiento del conductor de un BMW X5, VIN-2026-MAD-BMW-12) y 6 de sus Golf de SUB-2026-0188 siguen pendientes de la campaña ABS REC-VW-2026-001 (plazo 15/11/2026). Revisad que esta respuesta sea coherente con el análisis de la reclamación antes de enviarla.',
          outcome: 'reclamacion', with: { any: 'Estado de la reclamación: {label}.' },
          go: 'reclamacion', goLabel: 'Abrir la reclamación'
        }
      },
      {
        id: 'B2', ref: 'VMQ 2026 · B2', sec: 'B', topic: 'Controles de seguridad (frenos, neumáticos, luces)', conf: 'alta',
        qEn: 'Are safety checks on brakes, tyres and lights mandatory? How often are they verified, and what happens to a vehicle if a check is missed or fails?',
        qEs: '¿Son obligatorios los controles de seguridad de frenos, neumáticos y luces? ¿Con qué frecuencia se verifican y qué pasa con el vehículo si un control no se hace o no es conforme?',
        en: 'Yes. Brake, tyre and light checks are mandatory and are verified at every delivery and every 10,000 km [1]. If a check is not passed, the vehicle is immobilised until Quality decides [2]. The safety checks of the 12 vehicles of SUB-2026-0188 are compliant [3].',
        es: 'Sí. Los controles de frenos, neumáticos y luces son obligatorios y se verifican en cada entrega y cada 10.000 km [1]. Si un control no se supera, el vehículo queda inmovilizado hasta que decida Calidad [2]. Las revisiones de seguridad de los 12 vehículos de SUB-2026-0188 son conformes [3].',
        cites: [
          { src: 'PNT-CAL-031', q: 'Los controles de seguridad (frenos, neumáticos y luces) son obligatorios: verificación en cada entrega y cada 10.000 km' },
          { src: 'PNT-CAL-031', q: 'el vehículo queda inmovilizado hasta la decisión de Calidad' },
          { src: 'ICARE-REV', q: 'Revisiones de 10.000 km realizadas: 5 vehículos, todas conformes' }
        ],
        note: {
          tone: 'brand', icon: 'activity', title: 'Estado de hoy en el hub',
          text: 'iCare marca hoy una revisión de 10.000 km vencida desde hace 4 días en un SEAT Ibiza de alquiler. No pertenece a SUB-2026-0188 ni al alquiler de este cliente, así que la respuesta no cambia.'
        }
      },
      {
        id: 'B3', ref: 'VMQ 2026 · B3', sec: 'B', topic: 'Seguro, mantenimiento y exclusiones', conf: 'alta',
        qEn: 'What is included in the subscription and rental services (maintenance, insurance, replacement vehicle), and are there any exclusions or hidden charges?',
        qEs: '¿Qué incluyen los servicios de suscripción y alquiler (mantenimiento, seguro, vehículo de sustitución) y hay exclusiones o cargos ocultos?',
        en: 'According to the approved service sheets, the subscription includes preventive maintenance, comprehensive insurance with a 500 EUR excess and a replacement vehicle for repairs longer than 24 h [1], and the rental includes comprehensive insurance with a 600 EUR excess, 24 h assistance and unlimited mileage [2]. Both services exclude only traffic fines, fuel and misuse damage [3][4], with no hidden charges.',
        es: 'Según las fichas de servicio aprobadas, la suscripción incluye mantenimiento preventivo, seguro a todo riesgo con franquicia de 500 EUR y vehículo de sustitución en reparaciones de más de 24 h [1], y el alquiler incluye seguro a todo riesgo con franquicia de 600 EUR, asistencia 24 h y kilometraje ilimitado [2]. Ambos servicios excluyen solo multas de tráfico, combustible y daños por uso indebido [3][4], sin cargos ocultos.',
        cites: [
          { src: 'FT-SUB', q: 'Incluye: mantenimiento preventivo, seguro a todo riesgo con franquicia de 500 EUR y vehículo de sustitución en reparaciones de más de 24 h' },
          { src: 'FT-ALQ', q: 'Incluye: seguro a todo riesgo con franquicia de 600 EUR, asistencia 24 h y kilometraje ilimitado' },
          { src: 'FT-SUB', q: 'Exclusiones: multas de tráfico, combustible y daños por uso indebido. Sin cargos ocultos ni penalización por cancelación de la suscripción a partir del mes 3' },
          { src: 'FT-ALQ', q: 'Exclusiones: multas de tráfico, combustible y daños por uso indebido. Cargos por combustible y daños solo con inspección de devolución y fotos 360' }
        ]
      },
      {
        id: 'B4', ref: 'VMQ 2026 · B4', sec: 'B', topic: 'Protección de datos de telemetría', conf: 'none',
        qEn: 'Describe your data protection programme for vehicle telematics and customer data: GDPR governance, data retention, access controls and breach notification.',
        qEs: 'Describa el programa de protección de datos de telemetría del vehículo y de datos de cliente: gobierno del RGPD, plazos de conservación, controles de acceso y notificación de brechas.',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados trata la protección de datos de telemetría y no hay registros de brechas entre los consultados.',
          partial: [],
          missing: ['Política de protección de datos y delegado de protección de datos', 'Plazos de conservación de la telemetría GPS y controles de acceso', 'Procedimiento de notificación de brechas y resultados de las últimas auditorías']
        }
      },
      {
        id: 'B5', ref: 'VMQ 2026 · B5', sec: 'B', topic: 'Baterías de vehículos electrificados', conf: 'none',
        qEn: 'Do you operate a risk-based inspection plan for hybrid and electric vehicle batteries? Please give the inspection frequency, the scope and the high-voltage certification of the technicians.',
        qEs: '¿Tienen un plan de inspección basado en el riesgo para baterías de vehículos híbridos y eléctricos? Indique la frecuencia, el alcance y la certificación de alta tensión de los técnicos.',
        flag: {
          reason: 'Solo hay evidencia indirecta: ningún documento indexado describe un plan de inspección de baterías ni la certificación de alta tensión de los técnicos.',
          partial: [
            { src: 'ICARE-CAMP', q: 'REC-BMW-2026-002 · Batería híbrida BMW X5/X7 · 18 unidades · 3 revisadas · 15 pendientes · plazo 30/11/2026', why: 'Muestra que se atiende la campaña del fabricante, pero no es un plan de inspección de baterías.' },
            { src: 'MEM-2025', q: 'el 100 % con formación anual de marca', why: 'La formación de marca no sustituye al plan de inspección ni acredita la certificación de alta tensión.' }
          ],
          missing: ['Plan de inspección de baterías de vehículos híbridos y eléctricos', 'Frecuencia y alcance de las inspecciones', 'Certificación de alta tensión de los técnicos (por ejemplo, formación de marca HV)', 'Resultados de las últimas inspecciones']
        }
      },
      {
        id: 'C1', ref: 'VMQ 2026 · C1', sec: 'C', topic: 'Capacidad del taller y plazos de servicio', conf: 'alta',
        qEn: 'What are your service levels for scheduled maintenance, and what action is taken if workshop capacity drops?',
        qEs: '¿Qué niveles de servicio aplican al mantenimiento programado y qué se hace si baja la capacidad del taller?',
        en: 'Our Madrid workshop has 14 work bays, 24 brand technicians and a maintenance appointment available within 48 hours [1]. If workshop capacity stays below 80% for more than 24 hours, non-urgent services are rescheduled with notice to the customer, with priority for subscription and safety-campaign vehicles [2], and a decision is taken for each service: keep the appointment, reschedule or refer it to another workshop in the brand network [3]. If a vehicle is immobilised for more than 24 hours, a replacement vehicle is provided [4].',
        es: 'Nuestro taller de Madrid tiene 14 puestos de trabajo, 24 técnicos de marca y cita de mantenimiento en 48 horas [1]. Si la capacidad del taller baja del 80 % durante más de 24 horas, se reprograman los servicios no urgentes con aviso al cliente y prioridad para los vehículos de suscripción y de campaña de seguridad [2], y se decide cada servicio: mantener la cita, reprogramar o derivar a otro taller de la red de marca [3]. Si el vehículo queda inmovilizado más de 24 horas, se entrega vehículo de sustitución [4].',
        cites: [
          { src: 'ICARE-TAL', q: 'Taller de Madrid: 14 puestos de trabajo, 24 técnicos de marca y cita de mantenimiento en 48 h' },
          { src: 'PNT-CAL-012', q: 'Capacidad del taller por debajo del 80 % durante más de 24 h: reprogramación de los servicios no urgentes, aviso al cliente y prioridad para los vehículos de suscripción y de campaña de seguridad' },
          { src: 'PNT-CAL-012', q: 'Decisión por servicio: mantener la cita, reprogramar o derivar a otro taller de la red de marca' },
          { src: 'PNT-CAL-012', q: 'Si el vehículo queda inmovilizado más de 24 h: vehículo de sustitución' }
        ],
        note: {
          tone: 'warn', icon: 'thermometer', title: 'Servicios de este cliente afectados hoy en el taller',
          text: '3 servicios de Golf de SUB-2026-0188 (citas del 08 y el 09/10/2026) están afectados por la baja del técnico especialista VW (capacidad del taller -30 % desde el 06/10, 16:30). La respuesta describe el procedimiento, no el caso de hoy.',
          outcome: 'alarma', with: { approved: 'En la alarma del turno: {label}.', any: 'En la alarma del turno se ha rechazado la propuesta.' },
          without: 'La decisión sobre esos servicios se toma en la alarma del turno.',
          go: 'alarma', goLabel: 'Abrir la alarma'
        }
      },
      {
        id: 'C2', ref: 'VMQ 2026 · C2', sec: 'C', topic: 'Asistencia 24 h y telemetría', conf: 'alta',
        qEn: 'How is 24-hour roadside assistance provided and recorded for your customers vehicles?',
        qEs: '¿Cómo se presta y se registra la asistencia en carretera 24 h para los vehículos de los clientes?',
        en: 'Every vehicle is covered by 24 h assistance, and each incident is logged with its response time in our messaging and case system. The three most recent incidents of Iberian Transport Company, on 25 August, 28 August and 25 September 2026, were attended within 41 minutes and closed as compliant [1][2][3].',
        es: 'Todos los vehículos tienen asistencia 24 h y cada incidencia queda registrada con su tiempo de respuesta en nuestro sistema de avisos y casos. Las tres últimas incidencias de Iberian Transport Company (25/08, 28/08 y 25/09/2026) se atendieron en 41 minutos como máximo y se cerraron conformes [1][2][3].',
        cites: [
          { src: 'ASIST-24', q: 'INC-26-1180 · 25/08/2026 16:10 · Aviso de pinchazo · asistencia en 38 min · cerrada conforme' },
          { src: 'ASIST-24', q: 'INC-26-1204 · 28/08/2026 15:30 · Luz de aceite · asistencia en 41 min · cerrada conforme' },
          { src: 'ASIST-24', q: 'INC-26-1297 · 25/09/2026 14:20 · Batería descargada · asistencia en 35 min · cerrada conforme' }
        ]
      },
      {
        id: 'C3', ref: 'VMQ 2026 · C3', sec: 'C', topic: 'Inmovilización y liberación de vehículos', conf: 'alta',
        qEn: 'How is a non-conforming or suspect vehicle placed on hold, and who is authorised to release it?',
        qEs: '¿Cómo se inmoviliza un vehículo no conforme o sospechoso y quién está autorizado a liberarlo?',
        en: 'Every hold is recorded in SAP, where the vehicle is blocked for delivery, and in our inventory system, where the unit is immobilised and any planned deliveries are held [1]. Only the Quality Manager can release a held vehicle [2].',
        es: 'Toda inmovilización se registra en SAP, donde el vehículo queda bloqueado para entrega, y en el sistema de inventario, donde la unidad queda inmovilizada y se retienen las entregas planificadas [1]. Solo el Responsable de Calidad puede liberar el vehículo retenido [2].',
        cites: [
          { src: 'PNT-CAL-015', q: 'Toda inmovilización se registra en SAP (vehículo bloqueado para entrega) y en Odoo Inventario (unidad inmovilizada, entregas retenidas)' },
          { src: 'PNT-CAL-015', q: 'Solo el Responsable de Calidad libera' }
        ],
        note: {
          tone: 'ok', icon: 'check-circle', title: 'Aplicado hoy',
          text: 'Este procedimiento se ha aplicado esta mañana en la alarma del turno:',
          outcome: 'alarma', requires: 'approved', with: { approved: '{label}.' }
        }
      },
      {
        id: 'D1', ref: 'VMQ 2026 · D1', sec: 'D', topic: 'Trazabilidad del vehículo y simulacro de retirada', conf: 'media',
        qEn: 'Can you trace a vehicle back to the manufacturer and forward to the customer contract and workshop history? State your target time for a full trace and the date and result of your last mock recall.',
        qEs: '¿Pueden trazar un vehículo hacia atrás hasta el fabricante y hacia delante hasta el contrato del cliente y el historial de taller? Indique el objetivo de tiempo de una traza completa y la fecha y el resultado del último simulacro de retirada.',
        en: 'Yes. Each vehicle is linked in SAP, Odoo Inventory and iCare Workshop to its manufacturer purchase, its customer contract and every workshop order. For example, VIN-2026-MAD-VW-021 traces back to the manufacturer invoice FAC-VW-26-4471, with a compliant pre-delivery inspection [1], and forward to contract SUB-2026-0188 with Iberian Transport Company, delivered on 1 September 2026, and 2 workshop orders [2].',
        es: 'Sí. Cada vehículo queda vinculado en SAP, Odoo Inventario e iCare Taller a su compra al fabricante, a su contrato de cliente y a cada orden de taller. Por ejemplo, VIN-2026-MAD-VW-021 se traza hacia atrás hasta la factura del fabricante FAC-VW-26-4471, con la inspección pre-entrega conforme [1], y hacia delante hasta el contrato SUB-2026-0188 con Iberian Transport Company, entregado el 01/09/2026, y 2 órdenes de taller [2].',
        cites: [
          { src: 'SAP-VIN', q: 'VW Golf 1.5 TSI de la compra al fabricante FAC-VW-26-4471 (28/08/2026), recepción en el hub de Madrid a las 10:42, PDI de 42 puntos conforme y alta en flota de suscripción' },
          { src: 'ODOO-VIN', q: '1 contrato: SUB-2026-0188 con Iberian Transport Company, entrega 01/09/2026 y 2 órdenes de taller (OT-26-3084, OT-26-3110)' }
        ],
        gap: 'El objetivo de tiempo de una traza completa y la fecha y el resultado del último simulacro de retirada no están en las fuentes indexadas.',
        gapGo: 'retirada', gapGoLabel: 'Hacer un simulacro ahora', gapOutcome: 'retirada'
      },
      {
        id: 'D2', ref: 'VMQ 2026 · D2', sec: 'D', topic: 'Gestión de reclamaciones', conf: 'alta',
        qEn: 'Describe your customer complaint handling process, including response times and the root cause analysis method.',
        qEs: 'Describa el proceso de gestión de reclamaciones de cliente, con los plazos de respuesta y el método de análisis de causa raíz.',
        en: 'Complaints are handled under a documented procedure: acknowledgement within 24 hours, a proposed solution within 5 working days and closure within the timescale agreed with the customer, 15 working days by default [1]. Each complaint is registered in our CRM, and closed complaints are recorded with their root cause and corrective action [2].',
        es: 'Las reclamaciones se gestionan según un procedimiento documentado: acuse de recibo en 24 horas, propuesta de solución en 5 días hábiles y cierre en el plazo pactado con el cliente, 15 días hábiles por defecto [1]. Cada reclamación se registra en el CRM y las cerradas quedan con su causa raíz y su acción correctora [2].',
        cites: [
          { src: 'PNT-CAL-020', q: 'Acuse de recibo en 24 h, propuesta de solución en 5 días hábiles y cierre en el plazo pactado con el cliente (por defecto, 15 días hábiles)' },
          { src: 'SF-RCL', q: '4 cerradas con causa raíz y acción correctora registradas' }
        ],
        note: {
          tone: 'warn', icon: 'mail', title: 'Reclamación de este cliente · REC-2026-0451',
          text: 'Esta respuesta llegará con la reclamación REC-2026-0451 de este mismo cliente todavía abierta: la propuesta de solución vence el 08/10/2026.',
          outcome: 'reclamacion', tone_done: 'brand',
          text_done: 'La reclamación REC-2026-0451 de este mismo cliente se ha gestionado en esta sesión:', with: { any: '{label}.' },
          go: 'reclamacion', goLabel: 'Abrir la reclamación'
        }
      },
      {
        id: 'D3', ref: 'VMQ 2026 · D3', sec: 'D', topic: 'Continuidad de negocio y prevención del fraude', conf: 'none',
        qEn: 'Do you have a documented business continuity plan and an anti-fraud and anti-money-laundering risk assessment? When were they last reviewed?',
        qEs: '¿Tienen documentados un plan de continuidad de negocio y una evaluación de riesgo de fraude y de blanqueo de capitales? ¿Cuándo se revisaron por última vez?',
        flag: {
          reason: 'El plan de continuidad de negocio y la evaluación de riesgo de fraude y blanqueo no están entre los documentos indexados.',
          context: 'Como sujeto obligado en la venta de vehículos, Autopista Multimotor debe disponer de la evaluación de riesgo de blanqueo: debería existir en Calidad o Finanzas. Agentic Platform no describe su contenido ni supone una fecha de revisión.',
          partial: [],
          missing: ['Plan de continuidad de negocio', 'Evaluación de riesgo de fraude y de blanqueo de capitales', 'Fecha de la última revisión de cada documento']
        }
      },
      {
        id: 'E1', ref: 'VMQ 2026 · E1', sec: 'E', topic: 'Flota de bajas emisiones', conf: 'alta',
        qEn: 'What proportion of your rental fleet holds an ECO or zero-emission label?',
        qEs: '¿Qué proporción de su flota de alquiler tiene etiqueta ECO o de cero emisiones?',
        en: 'Our rental fleet is around 1,000 vehicles, 38% of which hold an ECO or zero-emission label [1].',
        es: 'Nuestra flota de alquiler es de unas 1.000 unidades, el 38 % con etiqueta ECO o 0 emisiones [1].',
        cites: [
          { src: 'MEM-2025', q: 'Flota de alquiler: unas 1.000 unidades, el 38 % con etiqueta ECO o 0 emisiones' }
        ]
      },
      {
        id: 'E2', ref: 'VMQ 2026 · E2', sec: 'E', topic: 'Plazo de entrega y estado en la entrega', conf: 'alta',
        qEn: 'For subscription vehicles, what is the maximum time from contract signature to delivery, and how is vehicle condition checked at handover?',
        qEs: 'Para los vehículos de suscripción, ¿cuál es el plazo máximo desde la firma del contrato hasta la entrega y cómo se comprueba el estado del vehículo en la entrega?',
        en: 'Deliveries are planned so that the vehicle is handed over no more than 5 working days after the contract is signed [1]. Condition is checked at handover with the pre-delivery inspection; for example, the 12 vehicles of SUB-2026-0188 were delivered on 1 September 2026 within that period [2].',
        es: 'Las entregas se planifican para que el vehículo se entregue como máximo 5 días hábiles después de firmar el contrato [1]. El estado se comprueba en la entrega con la inspección pre-entrega; por ejemplo, los 12 vehículos de SUB-2026-0188 se entregaron el 01/09/2026 dentro de ese plazo [2].',
        cites: [
          { src: 'ODOO-PLAN', q: 'Del contrato a la entrega: 5 días hábiles como máximo' },
          { src: 'ODOO-SUB', q: 'Entrega de los 12 vehículos a Iberian Transport Company el 01/09/2026, dentro del plazo de 5 días hábiles' }
        ]
      }
    ]
  }
});
