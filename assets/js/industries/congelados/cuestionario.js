/* Empresa de Congelados · cuestionario técnico de proveedor del retailer UK (vía EC Foods UK Ltd). Escenario de la demo de referencia con datos sintéticos (MFM). */
agenticPack('congelados', {
  cuestionario: {
    agent: 'Cuestionarios de cliente',
    lang: 'en',
    default_sel: 'B1',
    reviewer: 'Responsable de Calidad de turno',
    assignee: 'Responsable de Calidad de planta',
    assignee_short: 'Calidad de planta',
    team: 'Calidad',
    assign_due: '2026-10-07',
    responder: 'Empresa de Congelados (planta de Fustiñana)',
    site: 'Fustiñana (FUS)',
    site_label: 'Planta',
    page_title: 'Cuestionario técnico · Retailer UK (marca blanca)',
    report_title: 'Respuesta a cuestionario técnico de proveedor',
    ref_label: 'Referencia del cliente',
    scope_meta_label: 'Productos',
    discard_placeholder: 'Por ejemplo: esta pregunta se responde con el certificado adjunto',
    save_system: 'Elara',
    qn: {
      code: 'CUE-2026-041',
      title: 'Supplier Technical Questionnaire 2026',
      customer: 'Retailer UK (marca blanca)',
      via: 'EC Foods UK Ltd',
      received: '2026-09-28T16:20',
      due: '2026-10-09',
      file: 'Supplier_Technical_Questionnaire_2026.xlsx',
      scope: 'UK-GUI-1000 · Guisante 1 kg (Garden Peas 1kg) y UK-MIX-600 · Salteado de verduras a la plancha 600 g, marca blanca del retailer UK',
      scope_short: 'UK-GUI-1000 · UK-MIX-600',
      scope_label: '2 productos de marca blanca'
    },
    email: {
      mailbox: 'buzón de Calidad',
      headers: {
        From: 'Technical Team, EC Foods UK Ltd <technical@ecfoods-uk.example>',
        To: 'Calidad, Empresa de Congelados <calidad@ec-demo.example>',
        Date: 'Mon, 28 Sep 2026 15:20 (UK time)',
        Subject: 'Supplier Technical Questionnaire 2026 - own-label frozen vegetables - response due 9 October'
      },
      text: 'Dear Quality Team,\n\nAs part of the annual supplier review, our UK retail customer has issued its Supplier Technical Questionnaire 2026 for the own-label frozen vegetables you supply:\n- Garden Peas 1kg (UK-GUI-1000)\n- Chargrilled vegetable mix 600g (UK-MIX-600)\n\nThe questionnaire has 15 questions in five sections: certification and audits, food safety controls, temperature and product control, traceability and incidents, and raw materials and sustainability.\n\nPlease answer every question in English and reference the procedure, record or certificate that supports each answer. We need the completed questionnaire by Friday 9 October 2026.\n\nKind regards,\n\nTechnical Team\nEC Foods UK Ltd',
      highlights: [
        { text: 'Garden Peas 1kg (UK-GUI-1000)', label: 'Producto', tone: 'brand' },
        { text: 'Chargrilled vegetable mix 600g (UK-MIX-600)', label: 'Producto', tone: 'brand' },
        { text: '15 questions', label: 'Preguntas', tone: 'brand' },
        { text: 'reference the procedure, record or certificate that supports each answer', label: 'Requisito' },
        { text: 'Friday 9 October 2026', label: 'Plazo' }
      ]
    },
    sections: [
      { id: 'A', es: 'Certificación y auditorías', en: 'Certification and audits' },
      { id: 'B', es: 'Controles de seguridad alimentaria', en: 'Food safety controls' },
      { id: 'C', es: 'Temperatura y control de producto', en: 'Temperature and product control' },
      { id: 'D', es: 'Trazabilidad e incidencias', en: 'Traceability and incidents' },
      { id: 'E', es: 'Materia prima y sostenibilidad', en: 'Raw materials and sustainability' }
    ],
    kpi: { label: 'Auditorías y visitas en 2025', value: 108, sub: 'Incluye inspecciones oficiales · 143 jornadas · Memoria de Sostenibilidad 2025', icon: 'shield-check' },
    sources_sub: 'Procedimientos, fichas, certificados y memoria',
    identify_result: 'Retailer UK (marca blanca) vía EC Foods UK · UK-GUI-1000 y UK-MIX-600',
    search_scope: 'procedimientos de Calidad, fichas técnicas, certificaciones y memoria',
    lookups: [
      { system: 'SAP', action: 'Consulta recepción y controles de calidad de los lotes de UK-GUI-1000 y UK-MIX-600', result: 'L26-231-FUS-GUI-01: REC-26-18233, 108 TR · L26-262-FUS-MIX-02: DM-4 conforme', ms: 520 },
      { system: 'MES Mapex', action: 'Lee la ruta de línea y los controles de proceso registrados', result: 'L2: despedregadora DP-2 y óptica OPT-2 · cloro libre del agua de lavado en LAV-1', ms: 480 },
      { system: 'Mecalux Easy WMS', action: 'Revisa el almacenamiento y las expediciones a EC Foods UK', result: '3 expediciones en camión a −25 °C con registro de temperatura conforme', ms: 410 },
      { system: 'Siemens Opcenter APS', action: 'Lee las reglas del plan de recepción de campaña', result: 'Del campo al túnel: 150 min como máximo', ms: 300 },
      { system: 'Elara', action: 'Busca reclamaciones abiertas y cerradas de este cliente', result: 'UKC-44718 abierta: piedra de 8 mm en L26-231-FUS-GUI-01', ms: 350, tone: 'warn' },
      { system: 'SCADA Galileo', action: 'Cruza el stock de este cliente con las alarmas de hoy', result: '7 palés de UK-MIX-600 estaban en C-07 durante la excursión (05:50–06:40)', ms: 390, tone: 'warn' }
    ],
    compare: {
      people: '2–3: Calidad de planta, Calidad de cliente y, según la pregunta, Agronomía o Mantenimiento',
      systems: '6–8: correo, Excel del cliente, Elara, SAP, carpeta de certificados, procedimientos y memoria de sostenibilidad',
      steps: 'Buscar la fuente de cada pregunta, copiar y adaptar respuestas de otros años, pedir datos a otros departamentos y montar el Excel',
      time: '2–4 h de trabajo de Calidad, repartidas en 2–3 días'
    },
    presenter: {
      before: [
        'Cada cliente de marca blanca trae su cuestionario técnico. En 2025 el grupo recibió 108 auditorías, visitas de cliente e inspecciones: 143 jornadas. Es trabajo de fondo que se come horas de Calidad.',
        'Este llega de EC Foods UK para el retailer del Reino Unido: {total} preguntas en inglés sobre el guisante 1 kg y el salteado de 600 g. Vuestros procedimientos están en español; da igual.',
        'Al pulsar, Agentic Platform busca en procedimientos, fichas técnicas, certificaciones y en los registros de SAP, Mapex, Easy WMS, Opcenter y Elara, y redacta cada respuesta con su fuente.'
      ],
      during: [
        '{drafted} de {total} con borrador y cita; cada cita se comprueba contra el texto de la fuente. {flagged} quedan para Calidad: Listeria, residuos y clorato, y defensa alimentaria. Sin documento que lo respalde, no se inventa nada.',
        'B1: además de responder, avisa de que este mismo cliente tiene abierta la reclamación UKC-44718 por una piedra y de que la malla de DP-2 sigue pendiente. Hoy eso depende de que alguien se acuerde.',
        'C1: 7 palés del salteado para este cliente estaban en C-07 durante la excursión de esta mañana. El cuestionario no vive aislado del resto de la planta.',
        'Nada sale sin aprobación: en bloque solo las de confianza alta; las de confianza media se revisan una a una.'
      ],
      next_during: 'Enseñar B1 (cita y aviso de la reclamación) y B4 (sin evidencia). Después «Aprobar las {alta} de confianza alta», aprobar {media_ids} una a una y «Asignar las {flagged} sin fuente a Calidad de planta».'
    },
    sources: {
      'PNT-CAL-012': {
        type: 'doc', kind: 'Procedimiento', code: 'PNT-CAL-012', title: 'Excursiones de temperatura en cámaras de producto congelado', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Excursiones de temperatura en cámaras de producto congelado' },
          { id: 'crit', heading: 'Criterio', text: 'Temperatura de aire por encima de −18 °C durante más de 15 min: bloqueo de calidad de los palés expuestos y evaluación (temperatura de producto, análisis sensorial, decisión de destino). Por encima de −15 °C: excursión crítica.' },
          { id: 'eval', heading: 'Evaluación', list: ['Medir la temperatura de producto con sonda en los palés expuestos (capa exterior y centro)', 'Análisis sensorial y de aspecto (cristales de hielo, apelmazado) por lote', 'Decisión de destino por lote: liberar, reclasificar o destruir'] }
        ]
      },
      'PNT-CAL-015': {
        type: 'doc', kind: 'Procedimiento', code: 'PNT-CAL-015', title: 'Bloqueo y liberación de producto (retención de calidad)', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Bloqueo y liberación de producto (retención de calidad)' },
          { id: 'crit', heading: 'Criterio', text: 'Todo bloqueo se registra en SAP QM (lote bloqueado) y en Easy WMS (palés inmovilizados, expediciones retenidas). Solo el Responsable de Calidad libera.' }
        ]
      },
      'PNT-CAL-020': {
        type: 'doc', kind: 'Procedimiento', code: 'PNT-CAL-020', title: 'Gestión de reclamaciones de cliente e informe 8D', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Gestión de reclamaciones de cliente e informe 8D' },
          { id: 'crit', heading: 'Criterio', text: 'Acuse de recibo en 24 h, contención en 48 h e informe 8D en el plazo pactado con el cliente (por defecto, 5 días hábiles).' }
        ]
      },
      'PNT-CAL-031': {
        type: 'doc', kind: 'Procedimiento', code: 'PNT-CAL-031', title: 'Control de cuerpos extraños: despedregadoras, ópticas y detectores de metales', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Control de cuerpos extraños: despedregadoras, ópticas y detectores de metales' },
          { id: 'crit', heading: 'Criterio', text: 'El detector de metales es un PCC: verificación con probetas cada 2 h. Si se supera, se retiene el producto envasado desde la última verificación correcta.' }
        ]
      },
      'IT-MAN-DP-02': {
        type: 'doc', kind: 'Instrucción técnica', code: 'IT-MAN-DP-02', title: 'Inspección y sustitución de mallas de despedregadora', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Objeto', text: 'Inspección y sustitución de mallas de despedregadora' },
          { id: 'crit', heading: 'Criterio', text: 'Inspección semanal de la malla; si hay desgaste, sustitución programada e inspección reforzada hasta cambiarla.' }
        ]
      },
      'FT-GUI': {
        type: 'doc', kind: 'Ficha técnica', code: 'FT-UK-GUI-1000', title: 'Ficha técnica · Guisante 1 kg (Garden Peas 1kg)', system: 'Procedimientos',
        org: 'Empresa de Congelados · Especificaciones de producto',
        sections: [
          { id: '1', heading: '1. Producto', text: 'Guisante 1 kg (Garden Peas 1kg) · guisante congelado IQF · Marca blanca retailer UK (vía EC Foods UK).' },
          { id: '2', heading: '2. Ingredientes', text: 'Ingredientes: guisante (100 %).' },
          { id: '3', heading: '3. Alérgenos', text: 'Alérgenos (Reglamento (UE) 1169/2011 y UK FIC): ninguno; sin etiquetado preventivo de alérgenos.' },
          { id: '4', heading: '4. Conservación y vida útil', text: 'Conservar a −18 °C o menos. Consumo preferente: 24 meses desde la fabricación.' },
          { id: '5', heading: '5. Fabricación', text: 'Línea L2 (guisante / judía verde), Fustiñana.' }
        ]
      },
      'FT-MIX': {
        type: 'doc', kind: 'Ficha técnica', code: 'FT-UK-MIX-600', title: 'Ficha técnica · Salteado de verduras a la plancha 600 g', system: 'Procedimientos',
        org: 'Empresa de Congelados · Especificaciones de producto',
        sections: [
          { id: '1', heading: '1. Producto', text: 'Salteado de verduras a la plancha 600 g · verduras asadas y a la plancha, congeladas IQF · Marca blanca retailer UK (vía EC Foods UK).' },
          { id: '2', heading: '2. Receta', text: 'Receta: pimiento rojo asado en tiras (30 %), calabacín a la plancha (30 %), berenjena a la plancha (20 %) y cebolla asada (20 %).' },
          { id: '3', heading: '3. Alérgenos', text: 'Alérgenos (Reglamento (UE) 1169/2011 y UK FIC): ninguno; sin etiquetado preventivo de alérgenos.' },
          { id: '4', heading: '4. Conservación y vida útil', text: 'Conservar a −18 °C o menos. Consumo preferente: 24 meses desde la fabricación.' },
          { id: '5', heading: '5. Fabricación', text: 'Asado y plancha en Arguedas (grill continuo GRL-1); mezcla y envasado en Fustiñana (Línea L5 (mezclas)). Etiquetado en inglés según la especificación del cliente.' }
        ]
      },
      'WEB-CERT': {
        type: 'doc', kind: 'Certificaciones', code: null, label: 'Web corporativa', title: 'Calidad y seguridad alimentaria · certificados por planta', system: 'Procedimientos',
        org: 'Web corporativa de Empresa de Congelados · consultada el 29/09/2026',
        sections: [
          { id: 'fus', heading: 'Fustiñana', text: 'Fustiñana: IFS Food (nivel superior), BRCGS Food Safety (grado AA+) y FSSC 22000.' },
          { id: 'nota', heading: 'Nota de indexación', text: 'La página no indica la entidad de certificación ni la fecha de caducidad de cada certificado.' }
        ]
      },
      'MEM-2025': {
        type: 'doc', kind: 'Memoria anual', code: null, label: 'Memoria 2025', title: 'Memoria de Sostenibilidad 2025', system: 'Procedimientos',
        org: 'Grupo Empresa de Congelados · publicada el 01/07/2026',
        sections: [
          { id: 'aud', heading: 'Auditorías e inspecciones', text: 'Auditorías, visitas de cliente e inspecciones en 2025: 108 (143 jornadas), sin sanciones.' },
          { id: 'agr', heading: 'Agricultura', text: 'Agricultores: unos 900, con 27.000 ha; el 100 % con verificación FSA de nivel plata.' }
        ]
      },
      'SAP-GUI': {
        type: 'record', kind: 'Registro de lote', code: 'L26-231-FUS-GUI-01', title: 'Lote L26-231-FUS-GUI-01 · origen y controles de calidad', system: 'SAP',
        org: 'SAP · registro de lote',
        sections: [
          { id: 'origen', heading: 'Origen y recepción', text: 'Guisante de AGR-0412 (P-0412-07, P-0412-09, Ribera navarra), cosecha 19/08/2026, recepción REC-26-18233 a las 10:42 (tenderómetro 108 TR), L2 turno mañana' },
          { id: 'qc', heading: 'Controles de calidad', list: ['Recepción: tenderómetro 108 TR (especificación 95-120 TR): conforme', 'Recepción: muestra de 2 kg sin piedras ni terrones (conforme)', 'Selectora óptica OPT-2: rechazo del 1,6 % en el turno (referencia 1,5 %)', 'Envasado ENV-4: control de peso y sellado conforme'] }
        ]
      },
      'WMS-GUI': {
        type: 'record', kind: 'Traza hacia delante', code: 'L26-231-FUS-GUI-01', title: 'Lote L26-231-FUS-GUI-01 · palés y expediciones', system: 'Mecalux Easy WMS',
        org: 'Mecalux Easy WMS · palés (SSCC) y expediciones',
        sections: [
          { id: 'fwd', heading: 'Palés y expediciones', text: '22 palés: 2 en SIL-3, 20 expedidos a EC Foods UK Ltd (filial EC, Reino Unido) (EXP-26-40911, EXP-26-40957)' }
        ]
      },
      'MAPEX-L2': {
        type: 'record', kind: 'Ruta de proceso', code: 'L2', title: 'Línea L2 (guisante / judía verde) · ruta del lote L26-231-FUS-GUI-01', system: 'MES Mapex',
        org: 'MES Mapex · orden de fabricación',
        sections: [
          { id: 'ruta', heading: 'Ruta registrada', text: 'limpieza LIM-2 → despedregadora DP-2 → escaldador ESC-2 → túnel IQF TUN-2 → óptica OPT-2 → envasado ENV-4' }
        ]
      },
      'MAPEX-LAV1': {
        type: 'record', kind: 'Control de proceso', code: 'LAV-1', title: 'Lavadora de verdura LAV-1 · cloro libre en el agua de lavado', system: 'MES Mapex',
        org: 'MES Mapex · lecturas de proceso',
        sections: [
          { id: 'ctl', heading: 'Control registrado', text: 'Lavadora de verdura LAV-1 · cloro libre en el agua de lavado · referencia 3 ppm' },
          { id: 'lect', heading: 'Última lectura', text: '2,6 ppm en el parte de las 06:00 del 29/09/2026.' }
        ]
      },
      'SAP-MIX': {
        type: 'record', kind: 'Registro de lote', code: 'L26-262-FUS-MIX-02', title: 'Lote L26-262-FUS-MIX-02 · controles de calidad', system: 'SAP QM',
        org: 'SAP QM · registro de lote',
        sections: [
          { id: 'qc', heading: 'Controles de calidad', list: ['Receta 30/30/20/20 % verificada con la báscula de dosificación', 'Detector de metales DM-4: verificaciones conformes', 'Especificación del cliente UK: etiquetado en inglés verificado'] }
        ]
      },
      'WMS-EXP': {
        type: 'record', kind: 'Expediciones', code: 'EXP · EC Foods UK', title: 'Expediciones a EC Foods UK Ltd · registro de temperatura', system: 'Mecalux Easy WMS',
        org: 'Mecalux Easy WMS · expediciones',
        sections: [
          { id: 'exp', heading: 'Últimas expediciones', list: ['EXP-26-40911 · 25/08/2026 16:10 · Camión frigorífico −25 °C · registro de temperatura conforme', 'EXP-26-40957 · 28/08/2026 15:30 · Camión frigorífico −25 °C · registro de temperatura conforme', 'EXP-26-41083 · 25/09/2026 14:20 · Camión frigorífico −25 °C · registro de temperatura conforme'] }
        ]
      },
      'WMS-FUS': {
        type: 'record', kind: 'Almacén', code: 'FUS', title: 'Fustiñana · almacenamiento de producto terminado', system: 'Mecalux Easy WMS',
        org: 'Mecalux Easy WMS · datos maestros de almacén',
        sections: [
          { id: 'alm', heading: 'Almacenamiento', text: '4 silos automáticos a −25 °C (Mecalux Easy WMS) + cámaras de expedición' }
        ]
      },
      'APS-CAMP': {
        type: 'record', kind: 'Regla de planificación', code: 'Campaña 2026', title: 'Plan de recepción de campaña · reglas', system: 'Siemens Opcenter APS',
        org: 'Siemens Opcenter APS · plan de recepción',
        sections: [
          { id: 'reglas', heading: 'Reglas de planificación', list: ['Del campo al túnel: 150 min como máximo', 'Carga en campo: 20 min', 'Franjas de recepción de 120 min, de 06:00 a 22:00'] }
        ]
      },
      'ELARA-RCL': {
        type: 'record', kind: 'Registro de reclamaciones', code: 'Reclamaciones', title: 'Reclamaciones de cliente registradas', system: 'Elara',
        org: 'Elara · reclamaciones y no conformidades',
        sections: [
          { id: 'res', heading: 'Resumen', text: '4 cerradas con no conformidad y causa raíz registradas; 1 abierta (UKC-44718).' },
          { id: 'det', heading: 'Reclamaciones cerradas', list: ['RCL-2026-0204 · 15/07/2026 · Producto apelmazado (bloques de hielo) en destino · NC-2026-0233 · causa: Rotura de frío en el transporte del cliente', 'RCL-2026-0131 · 07/05/2026 · Hilos en la judía verde por encima de especificación · NC-2026-0158 · causa: Ajuste de la despuntadora COR-3', 'RCL-2026-0042 · 20/02/2026 · Bolsa mal sellada (soldadura abierta) · NC-2026-0097 · causa: Temperatura de mordaza baja en ENV-2', 'RCL-2025-0311 · 14/11/2025 · Piedra de unos 6 mm en espinaca en porciones · NC-2025-0388 · causa: Malla de la despedregadora de la línea de hoja (planta de Alfaro) con desgaste'] }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'STQ 2026 · A1', sec: 'A', topic: 'Certificaciones GFSI', conf: 'media',
        qEn: 'Please list the GFSI-recognised certifications held by the supplying site, with grade, certification body and expiry date.',
        qEs: 'Indique las certificaciones reconocidas por GFSI del centro que suministra, con grado, entidad de certificación y fecha de caducidad.',
        en: 'Both products are packed and dispatched at our Fustiñana site, which is certified to IFS Food (higher level), BRCGS Food Safety (grade AA+) and FSSC 22000 [1]. Copies of the current certificates, showing the certification body and expiry date of each, will be attached to this questionnaire.',
        es: 'Los dos productos se envasan y se expiden en Fustiñana, centro certificado en IFS Food (nivel superior), BRCGS Food Safety (grado AA+) y FSSC 22000 [1]. Se adjuntarán las copias de los certificados vigentes, con la entidad de certificación y la fecha de caducidad de cada uno.',
        cites: [
          { src: 'WEB-CERT', q: 'Fustiñana: IFS Food (nivel superior), BRCGS Food Safety (grado AA+) y FSSC 22000' }
        ],
        gap: 'La entidad de certificación y la fecha de caducidad de cada certificado no aparecen en las fuentes indexadas. Adjunta los certificados vigentes antes de enviar.'
      },
      {
        id: 'A2', ref: 'STQ 2026 · A2', sec: 'A', topic: 'Auditorías del último año', conf: 'alta',
        qEn: 'How many audits (customer, certification and official) did your company receive in the last year, and were there any sanctions or enforcement actions?',
        qEs: '¿Cuántas auditorías (de cliente, de certificación y oficiales) recibió la empresa el último año? ¿Hubo sanciones o actuaciones de la autoridad?',
        en: 'In 2025 the Frozen Foods Company group received 108 audits, customer visits and official inspections, totalling 143 audit days, with no sanctions [1].',
        es: 'En 2025 el grupo Empresa de Congelados recibió 108 auditorías, visitas de cliente e inspecciones oficiales, con un total de 143 jornadas y sin sanciones [1].',
        cites: [
          { src: 'MEM-2025', q: 'Auditorías, visitas de cliente e inspecciones en 2025: 108 (143 jornadas), sin sanciones' }
        ],
        note: {
          tone: 'brand', icon: 'info', title: 'Dato de grupo',
          text: 'La memoria publica la cifra del grupo, sin desglose por planta. Si el cliente la pide solo para Fustiñana, la completa Calidad.'
        }
      },
      {
        id: 'B1', ref: 'STQ 2026 · B1', sec: 'B', topic: 'Piedras y cuerpos extraños de campo', conf: 'alta',
        qEn: 'Describe the controls in place to remove stones and other field foreign bodies from raw material, and how their effectiveness is maintained.',
        qEs: 'Describa los controles para eliminar piedras y otros cuerpos extraños de campo de la materia prima y cómo se mantiene su eficacia.',
        en: 'Raw material is sampled at intake and checked for stones and clods [1]. On the pea line, product passes through a cleaner-aspirator, a destoner and, after freezing, an optical sorter [2], under our foreign body control procedure [3]. Destoner meshes are inspected weekly; if wear is found, replacement is scheduled and inspection is reinforced until the mesh has been replaced [4].',
        es: 'La materia prima se muestrea en recepción para detectar piedras y terrones [1]. En la línea de guisante, el producto pasa por limpiadora-aventadora, despedregadora y, tras la congelación, selectora óptica [2], según el procedimiento de control de cuerpos extraños [3]. Las mallas de las despedregadoras se inspeccionan cada semana; si hay desgaste, se programa la sustitución y se refuerza la inspección hasta cambiarla [4].',
        cites: [
          { src: 'SAP-GUI', q: 'Recepción: muestra de 2 kg sin piedras ni terrones (conforme)' },
          { src: 'MAPEX-L2', q: 'limpieza LIM-2 → despedregadora DP-2 → escaldador ESC-2 → túnel IQF TUN-2 → óptica OPT-2 → envasado ENV-4' },
          { src: 'PNT-CAL-031', q: 'Control de cuerpos extraños: despedregadoras, ópticas y detectores de metales' },
          { src: 'IT-MAN-DP-02', q: 'Inspección semanal de la malla; si hay desgaste, sustitución programada e inspección reforzada hasta cambiarla' }
        ],
        note: {
          tone: 'warn', icon: 'link', title: 'Reclamación abierta de este cliente · UKC-44718',
          text: 'EC Foods UK tiene abierta la reclamación UKC-44718 (piedra de unos 8 mm en el lote [[lot:L26-231-FUS-GUI-01]]) y la malla de DP-2 sigue pendiente de repuesto (OT-26-07415, abierta desde el 18/08/2026, 42 días). Revisad que esta respuesta sea coherente con el informe 8D antes de enviarla.',
          outcome: 'reclamacion', with: { any: 'Estado de la reclamación: {label}.' },
          go: 'reclamacion', goLabel: 'Abrir la reclamación'
        }
      },
      {
        id: 'B2', ref: 'STQ 2026 · B2', sec: 'B', topic: 'Detección de metales (PCC)', conf: 'alta',
        qEn: 'Is metal detection a critical control point? How often are detectors verified, and what happens to product if a verification is missed or fails?',
        qEs: '¿La detección de metales es un punto de control crítico? ¿Con qué frecuencia se verifican los detectores y qué pasa con el producto si una verificación no se hace o no es conforme?',
        en: 'Yes. Metal detection is a critical control point in our HACCP plan, and detectors are verified with test pieces every 2 hours [1]. If a verification is not passed within that interval, all product packed since the last correct verification is held for a Quality decision [2]. Verification records for lot L26-262-FUS-MIX-02 of UK-MIX-600 are compliant [3].',
        es: 'Sí. La detección de metales es un punto de control crítico de nuestro plan APPCC y los detectores se verifican con probetas cada 2 horas [1]. Si la verificación no se supera en ese intervalo, se retiene todo el producto envasado desde la última verificación correcta hasta que decida Calidad [2]. Las verificaciones del lote L26-262-FUS-MIX-02 de UK-MIX-600 son conformes [3].',
        cites: [
          { src: 'PNT-CAL-031', q: 'El detector de metales es un PCC: verificación con probetas cada 2 h' },
          { src: 'PNT-CAL-031', q: 'se retiene el producto envasado desde la última verificación correcta' },
          { src: 'SAP-MIX', q: 'Detector de metales DM-4: verificaciones conformes' }
        ],
        note: {
          tone: 'brand', icon: 'activity', title: 'Estado de hoy en planta',
          text: 'El parte de las 06:00 marca DM-1 con la verificación vencida (3,5 h; máximo 2 h). DM-1 está en la línea L1 (maíz dulce) y no interviene en los productos de este cliente, así que la respuesta no cambia.'
        }
      },
      {
        id: 'B3', ref: 'STQ 2026 · B3', sec: 'B', topic: 'Alérgenos', conf: 'alta',
        qEn: 'Do the products supplied contain any of the 14 regulated allergens, or carry precautionary allergen labelling?',
        qEs: '¿Los productos suministrados contienen alguno de los 14 alérgenos regulados o llevan etiquetado preventivo de alérgenos?',
        en: 'No. According to the approved specifications, Garden Peas 1kg (UK-GUI-1000) is 100% peas [1], and the chargrilled vegetable mix 600g (UK-MIX-600) contains roasted red pepper strips, chargrilled courgette, chargrilled aubergine and roasted onion [2]. Neither product contains any of the 14 regulated allergens or carries precautionary allergen labelling [3][4].',
        es: 'No. Según las fichas técnicas aprobadas, el guisante 1 kg (UK-GUI-1000) es 100 % guisante [1] y el salteado de verduras a la plancha 600 g (UK-MIX-600) lleva pimiento rojo asado en tiras, calabacín a la plancha, berenjena a la plancha y cebolla asada [2]. Ninguno de los dos contiene alérgenos regulados ni lleva etiquetado preventivo de alérgenos [3][4].',
        cites: [
          { src: 'FT-GUI', q: 'Ingredientes: guisante (100 %)' },
          { src: 'FT-MIX', q: 'Receta: pimiento rojo asado en tiras (30 %), calabacín a la plancha (30 %), berenjena a la plancha (20 %) y cebolla asada (20 %)' },
          { src: 'FT-GUI', q: 'Alérgenos (Reglamento (UE) 1169/2011 y UK FIC): ninguno; sin etiquetado preventivo de alérgenos' },
          { src: 'FT-MIX', q: 'Alérgenos (Reglamento (UE) 1169/2011 y UK FIC): ninguno; sin etiquetado preventivo de alérgenos' }
        ]
      },
      {
        id: 'B4', ref: 'STQ 2026 · B4', sec: 'B', topic: 'Listeria ambiental', conf: 'none',
        qEn: 'Describe your environmental monitoring programme for Listeria in post-blanching and packing areas: sampling zones, frequency, trend analysis and corrective actions.',
        qEs: 'Describa el programa de muestreo ambiental de Listeria en las zonas posteriores al escaldado y de envasado: zonas de muestreo, frecuencia, análisis de tendencias y acciones correctoras.',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados trata el muestreo ambiental de Listeria y no hay resultados analíticos entre los registros consultados.',
          partial: [],
          missing: ['Plan de muestreo ambiental de Listeria: zonas, puntos y frecuencias', 'Resultados de los últimos meses y análisis de tendencias', 'Acciones correctoras ante un positivo']
        }
      },
      {
        id: 'B5', ref: 'STQ 2026 · B5', sec: 'B', topic: 'Residuos de plaguicidas y clorato', conf: 'none',
        qEn: 'Do you operate a risk-based testing plan for pesticide residues and chlorate? Please give the testing frequency, the scope and the accreditation of the laboratory used.',
        qEs: '¿Tienen un plan analítico basado en el riesgo para residuos de plaguicidas y clorato? Indique la frecuencia, el alcance y la acreditación del laboratorio.',
        flag: {
          reason: 'Solo hay evidencia indirecta: ningún documento indexado describe un plan analítico de residuos de plaguicidas ni de clorato.',
          partial: [
            { src: 'MAPEX-LAV1', q: 'cloro libre en el agua de lavado · referencia 3 ppm', why: 'Controlar el cloro del agua de lavado limita la formación de clorato, pero no es un análisis de residuos.' },
            { src: 'MEM-2025', q: 'el 100 % con verificación FSA de nivel plata', why: 'La verificación FSA de los agricultores no sustituye al plan analítico.' }
          ],
          missing: ['Plan analítico de residuos de plaguicidas y de clorato', 'Frecuencia y alcance de los análisis', 'Laboratorio y acreditación (por ejemplo, ISO/IEC 17025)', 'Resultados de los últimos análisis']
        }
      },
      {
        id: 'C1', ref: 'STQ 2026 · C1', sec: 'C', topic: 'Temperatura de almacenamiento', conf: 'alta',
        qEn: 'What are your storage temperature limits for frozen finished product, and what action is taken if a storage temperature deviation occurs?',
        qEs: '¿Qué límites de temperatura aplican al almacenamiento de producto congelado y qué se hace ante una desviación de temperatura?',
        en: 'Finished product is stored at −25 °C in four automated cold stores and in dispatch chambers [1]. If air temperature stays above −18 °C for more than 15 minutes, the exposed pallets are placed on quality hold and evaluated for product temperature and sensory quality [2], and a disposition decision is taken for each lot: release, reclassify or destroy [3]. An excursion above −15 °C is classed as critical [4].',
        es: 'El producto terminado se almacena a −25 °C en cuatro silos automáticos y en cámaras de expedición [1]. Si la temperatura de aire supera −18 °C durante más de 15 minutos, los palés expuestos quedan con bloqueo de calidad y se evalúan la temperatura de producto y el análisis sensorial [2], y se decide el destino de cada lote: liberar, reclasificar o destruir [3]. Por encima de −15 °C la excursión se considera crítica [4].',
        cites: [
          { src: 'WMS-FUS', q: '4 silos automáticos a −25 °C (Mecalux Easy WMS) + cámaras de expedición' },
          { src: 'PNT-CAL-012', q: 'Temperatura de aire por encima de −18 °C durante más de 15 min: bloqueo de calidad de los palés expuestos y evaluación (temperatura de producto, análisis sensorial, decisión de destino)' },
          { src: 'PNT-CAL-012', q: 'Decisión de destino por lote: liberar, reclasificar o destruir' },
          { src: 'PNT-CAL-012', q: 'Por encima de −15 °C: excursión crítica' }
        ],
        note: {
          tone: 'warn', icon: 'thermometer', title: 'Stock de este cliente en la excursión de C-07',
          text: '7 palés de UK-MIX-600 (lote [[lot:L26-262-FUS-MIX-02]]) estaban en C-07 durante la excursión de hoy (05:50–06:40, pico de −13,9 °C) y tienen salida planificada a este cliente (EXP-26-41109, 14:00). La respuesta describe el procedimiento, no el caso de hoy.',
          outcome: 'alarma', with: { approved: 'En la alarma de C-07: {label}.', any: 'En la alarma de C-07 se ha rechazado la propuesta de bloqueo.' },
          without: 'La decisión sobre esos palés se toma en la alarma de C-07.',
          go: 'alarma', goLabel: 'Abrir la alarma'
        }
      },
      {
        id: 'C2', ref: 'STQ 2026 · C2', sec: 'C', topic: 'Cadena de frío en el transporte', conf: 'alta',
        qEn: 'How is the cold chain maintained and recorded during transport to the UK?',
        qEs: '¿Cómo se mantiene y se registra la cadena de frío durante el transporte al Reino Unido?',
        en: 'Product leaves Fustiñana in refrigerated trucks at −25 °C, and the temperature record of each shipment is kept in our warehouse management system. The three most recent shipments to EC Foods UK, on 25 August, 28 August and 25 September 2026, all have compliant temperature records [1][2][3].',
        es: 'El producto sale de Fustiñana en camiones frigoríficos a −25 °C y el registro de temperatura de cada expedición queda en el sistema de gestión de almacén. Las tres últimas expediciones a EC Foods UK (25/08, 28/08 y 25/09/2026) tienen el registro de temperatura conforme [1][2][3].',
        cites: [
          { src: 'WMS-EXP', q: 'EXP-26-40911 · 25/08/2026 16:10 · Camión frigorífico −25 °C · registro de temperatura conforme' },
          { src: 'WMS-EXP', q: 'EXP-26-40957 · 28/08/2026 15:30 · Camión frigorífico −25 °C · registro de temperatura conforme' },
          { src: 'WMS-EXP', q: 'EXP-26-41083 · 25/09/2026 14:20 · Camión frigorífico −25 °C · registro de temperatura conforme' }
        ]
      },
      {
        id: 'C3', ref: 'STQ 2026 · C3', sec: 'C', topic: 'Retención y liberación de producto', conf: 'alta',
        qEn: 'How is non-conforming or suspect product placed on hold, and who is authorised to release it?',
        qEs: '¿Cómo se retiene el producto no conforme o sospechoso y quién está autorizado a liberarlo?',
        en: 'Every hold is recorded in SAP QM, where the lot is blocked, and in our warehouse management system, where the pallets are immobilised and any planned shipments are retained [1]. Only the Quality Manager can release held product [2].',
        es: 'Todo bloqueo se registra en SAP QM, donde el lote queda bloqueado, y en el sistema de gestión de almacén, donde los palés quedan inmovilizados y se retienen las expediciones planificadas [1]. Solo el Responsable de Calidad puede liberar el producto retenido [2].',
        cites: [
          { src: 'PNT-CAL-015', q: 'Todo bloqueo se registra en SAP QM (lote bloqueado) y en Easy WMS (palés inmovilizados, expediciones retenidas)' },
          { src: 'PNT-CAL-015', q: 'Solo el Responsable de Calidad libera' }
        ],
        note: {
          tone: 'ok', icon: 'check-circle', title: 'Aplicado hoy',
          text: 'Este procedimiento se ha aplicado esta mañana en la alarma de C-07:',
          outcome: 'alarma', requires: 'approved', with: { approved: '{label}.' }
        }
      },
      {
        id: 'D1', ref: 'STQ 2026 · D1', sec: 'D', topic: 'Trazabilidad y simulacro de retirada', conf: 'media',
        qEn: 'Can you trace a finished lot back to the grower and field, and forward to customers? State your target time for a full trace and the date and result of your last mock recall.',
        qEs: '¿Pueden trazar un lote terminado hacia atrás hasta el agricultor y la parcela, y hacia delante hasta los clientes? Indique el objetivo de tiempo de una traza completa y la fecha y el resultado del último simulacro de retirada.',
        en: 'Yes. Each lot is linked in SAP, MES Mapex and Mecalux Easy WMS to its intake, grower and fields, processing line, and to every pallet (SSCC) and shipment. For example, lot L26-231-FUS-GUI-01 traces back to grower AGR-0412, fields P-0412-07 and P-0412-09 and intake REC-26-18233 [1], and forward to 22 pallets: 20 shipped to EC Foods UK and 2 in stock at Fustiñana [2].',
        es: 'Sí. Cada lote queda vinculado en SAP, MES Mapex y Mecalux Easy WMS a su recepción, agricultor y parcelas, a la línea de proceso y a cada palé (SSCC) y expedición. Por ejemplo, el lote L26-231-FUS-GUI-01 se traza hacia atrás hasta el agricultor AGR-0412, las parcelas P-0412-07 y P-0412-09 y la recepción REC-26-18233 [1], y hacia delante hasta 22 palés: 20 expedidos a EC Foods UK y 2 en stock en Fustiñana [2].',
        cites: [
          { src: 'SAP-GUI', q: 'Guisante de AGR-0412 (P-0412-07, P-0412-09, Ribera navarra), cosecha 19/08/2026, recepción REC-26-18233 a las 10:42 (tenderómetro 108 TR), L2 turno mañana' },
          { src: 'WMS-GUI', q: '22 palés: 2 en SIL-3, 20 expedidos a EC Foods UK Ltd (filial EC, Reino Unido) (EXP-26-40911, EXP-26-40957)' }
        ],
        gap: 'El objetivo de tiempo de una traza completa y la fecha y el resultado del último simulacro de retirada no están en las fuentes indexadas.',
        gapGo: 'retirada', gapGoLabel: 'Hacer un simulacro ahora', gapOutcome: 'retirada'
      },
      {
        id: 'D2', ref: 'STQ 2026 · D2', sec: 'D', topic: 'Gestión de reclamaciones', conf: 'alta',
        qEn: 'Describe your customer complaint handling process, including response times and the root cause analysis method.',
        qEs: 'Describa el proceso de gestión de reclamaciones de cliente, con los plazos de respuesta y el método de análisis de causa raíz.',
        en: 'Complaints are handled under a documented procedure: acknowledgement within 24 hours, containment within 48 hours and an 8D report within the timescale agreed with the customer, 5 working days by default [1]. Each complaint is registered in our quality management system, and closed complaints are recorded with their non-conformity and root cause [2].',
        es: 'Las reclamaciones se gestionan según un procedimiento documentado: acuse de recibo en 24 horas, contención en 48 horas e informe 8D en el plazo pactado con el cliente, 5 días hábiles por defecto [1]. Cada reclamación se registra en el sistema de gestión de calidad y las cerradas quedan con su no conformidad y su causa raíz [2].',
        cites: [
          { src: 'PNT-CAL-020', q: 'Acuse de recibo en 24 h, contención en 48 h e informe 8D en el plazo pactado con el cliente (por defecto, 5 días hábiles)' },
          { src: 'ELARA-RCL', q: '4 cerradas con no conformidad y causa raíz registradas' }
        ],
        note: {
          tone: 'warn', icon: 'mail', title: 'Reclamación de este cliente · UKC-44718',
          text: 'Esta respuesta llegará con la reclamación UKC-44718 de este mismo cliente todavía abierta: el informe vence el 02/10/2026.',
          outcome: 'reclamacion', tone_done: 'brand',
          text_done: 'La reclamación UKC-44718 de este mismo cliente se ha gestionado en esta sesión:', with: { any: '{label}.' },
          go: 'reclamacion', goLabel: 'Abrir la reclamación'
        }
      },
      {
        id: 'D3', ref: 'STQ 2026 · D3', sec: 'D', topic: 'Defensa alimentaria y fraude', conf: 'none',
        qEn: 'Do you have a documented food defence plan and a food fraud vulnerability assessment? When were they last reviewed?',
        qEs: '¿Tienen documentados un plan de defensa alimentaria y una evaluación de vulnerabilidad frente al fraude alimentario? ¿Cuándo se revisaron por última vez?',
        flag: {
          reason: 'El plan de defensa alimentaria y la evaluación de vulnerabilidad frente al fraude no están entre los documentos indexados.',
          context: 'Fustiñana está certificada en IFS Food y BRCGS, que exigen ambos documentos: deberían existir en Calidad de planta. Agentic Platform no describe su contenido ni supone una fecha de revisión.',
          partial: [],
          missing: ['Plan de defensa alimentaria', 'Evaluación de vulnerabilidad frente al fraude alimentario', 'Fecha de la última revisión de cada documento']
        }
      },
      {
        id: 'E1', ref: 'STQ 2026 · E1', sec: 'E', topic: 'Agricultura sostenible (FSA)', conf: 'alta',
        qEn: 'What proportion of your growers are verified against a recognised sustainable agriculture standard, such as the SAI Platform FSA, and at what level?',
        qEs: '¿Qué proporción de sus agricultores está verificada con un estándar reconocido de agricultura sostenible, como la FSA de SAI Platform, y con qué nivel?',
        en: 'All of our growers are verified against the SAI Platform Farm Sustainability Assessment (FSA) at Silver level: around 900 growers farming some 27,000 hectares [1].',
        es: 'El 100 % de nuestros agricultores está verificado con la Farm Sustainability Assessment (FSA) de SAI Platform en nivel plata: unos 900 agricultores y unas 27.000 ha [1].',
        cites: [
          { src: 'MEM-2025', q: 'Agricultores: unos 900, con 27.000 ha; el 100 % con verificación FSA de nivel plata' }
        ]
      },
      {
        id: 'E2', ref: 'STQ 2026 · E2', sec: 'E', topic: 'Del campo al túnel y madurez', conf: 'alta',
        qEn: 'For peas, what is the maximum time from harvest to freezing, and how is maturity checked at intake?',
        qEs: 'Para el guisante, ¿cuál es el tiempo máximo desde la cosecha hasta la congelación y cómo se comprueba la madurez en recepción?',
        en: 'Harvesting and intake are planned so that raw material reaches the IQF tunnel no more than 150 minutes after leaving the field [1]. Pea maturity is checked at intake with a tenderometer against a specification of 95–120 TR; for example, intake REC-26-18233 measured 108 TR [2].',
        es: 'La cosecha y la recepción se planifican para que la materia prima llegue al túnel IQF como máximo 150 minutos después de salir del campo [1]. La madurez del guisante se mide en recepción con tenderómetro frente a una especificación de 95–120 TR; por ejemplo, la recepción REC-26-18233 dio 108 TR [2].',
        cites: [
          { src: 'APS-CAMP', q: 'Del campo al túnel: 150 min como máximo' },
          { src: 'SAP-GUI', q: 'Recepción: tenderómetro 108 TR (especificación 95-120 TR): conforme' }
        ]
      }
    ]
  }
});
