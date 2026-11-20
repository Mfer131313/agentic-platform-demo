/* Subtropicales Axarquía · «Cómo encaja Agentic Platform»: arquitectura, demo frente a piloto, calculadora de horas,
 * preguntas de Sistemas y registro de auditoría. Escenario de la demo con datos sintéticos (MFM). */
agenticPack('fruta', {
  plataforma: {
    nav: 'Cómo encaja en SAX',
    title: 'Cómo encaja en Subtropicales Axarquía',
    actor: 'decider',
    site: { kind: 'Hub', name: 'Centro de manipulado de la Axarquía (Málaga)', realm: 'Operaciones y Calidad' },
    pageMeta: [
      { icon: 'building', text: 'Centro de manipulado y procesado de la Axarquía' },
      { icon: 'server', text: 'Instalación en su infraestructura' },
      { icon: 'user-check', text: 'Aprobación humana antes de escribir' }
    ],
    kpis: [
      { label: 'Piloto propuesto', value: '6–8', unit: 'semanas', sub: '1 caso · Centro de manipulado de la Axarquía · realm de Operaciones y Calidad', icon: 'calendar' },
      { label: 'Sistemas conectados en el piloto', value: '1–2', unit: 'solo lectura', sub: 'Por API o réplica de base de datos', icon: 'database' },
      { label: 'Usuarios del piloto', value: '5–10', sub: 'SSO con Microsoft Entra ID', icon: 'users' }
    ],
    arch: {
      title: 'Arquitectura de referencia en el Centro de manipulado de la Axarquía',
      sso: 'Acceso con SSO · Microsoft Entra ID',
      ssoShort: 'SSO de Microsoft Entra ID',
      console: 'Consola web y avisos en Teams',
      consoleShort: 'Consola web y Teams'
    },
    deploy: {
      cpd: { seg: 'CPD propio', label: 'CPD propio · máquina virtual con Docker Compose', zone: 'CPD de SAX · VM con Docker Compose', text: 'Una máquina virtual en su CPD con Docker Compose: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'Clúster Kubernetes de SAX · Helm', text: 'Despliegue con Helm en su clúster Kubernetes: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      cloud: { seg: 'Nube propia', label: 'Nube de SAX (Azure, AWS o GCP)', zone: 'Suscripción en la nube de SAX (Azure, AWS o GCP)', text: 'La misma instalación en su suscripción de nube, en la región que elijan.' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'Región UE, con el contrato de SAX', exit: 'Sale de su red solo el texto de cada petición', note: 'Conexión por la pasarela LiteLLM de Agentic Platform; se confirma en las semanas 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'Con la cuenta y la región que contrate SAX', exit: 'Sale de su red solo el texto de cada petición', note: 'Proveedor incluido de serie en el catálogo de modelos de Agentic Platform.' },
      local: { seg: 'Modelo local', name: 'Modelo local', local: true, place: 'Servidor con GPU en su CPD (Ollama, LM Studio o llama.cpp)', exit: 'La inferencia se ejecuta dentro de su red', note: 'La calidad y la velocidad se dimensionan con su servidor. Sistemas revisa también los flujos de conectores y telemetría.' }
    },
    people: ['decider', 'reception_shift', 'ripening_shift', 'qa_shift', 'lab_shift', 'customer_care'],
    peopleShort: ['Responsable de operaciones y calidad', 'Jefe de recepción y campo', 'Maduración y frío', 'Calidad y seguridad alimentaria', 'Jefe de laboratorio', 'Atención al cliente'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Editor visual, versiones y prueba en seco' },
      { icon: 'cpu', title: 'Agentes de operaciones y calidad', text: 'Calidad, maduración y frío, laboratorio, trazabilidad, reclamaciones y parte de turno', agents: true },
      { icon: 'user-check', title: 'Aprobación humana', text: 'Nada se escribe en un sistema sin su responsable', approval: true },
      { icon: 'book-open', title: 'Procedimientos con citas', text: 'Cada respuesta enlaza su fuente; sin fuente, lo dice' },
      { icon: 'history', title: 'Registro de auditoría', text: 'De solo añadir y exportable' },
      { icon: 'key', title: 'Permisos por rol y realm', text: 'Cada área ve lo suyo' },
      { icon: 'gauge', title: 'Coste por petición', text: 'Estimación en USD y presupuesto por realm' },
      { icon: 'shield', title: 'Pasarela de modelos', text: 'Enmascara datos personales antes del modelo', gateway: true }
    ],
    tiles: [
      { name: 'SAP S/4HANA', icon: 'database', text: 'Lee lotes, pedidos, albaranes y calidad (QM). Propone bloqueos de lote y retenciones de expedición para aprobar.', write: true },
      { name: 'Trazabilidad de campo', icon: 'factory', text: 'Lee parcelas, productores, entradas de fruta y lotes de recepción. No escribe.', write: false },
      { name: 'LIMS y WMS', icon: 'flask', text: 'Lee ensayos y residuos por lote (LIMS) y palés y ubicaciones de cámara (WMS). No escribe.', write: false },
      { name: 'Tienda online', icon: 'users', text: 'Lee pedidos, clientes y reclamaciones (PrestaShop). Prepara avisos y respuestas para aprobar.', write: true }
    ],
    decisions: {
      deploy: ['No depende de servicios de MFM en la nube. Lo opera su equipo de Sistemas o un servicio gestionado.'],
      llm: 'Se cambia de modelo por configuración, sin tocar los workflows; también admite OpenAI o AWS Bedrock en la UE.',
      access: [
        'SSO con Microsoft Entra ID (OIDC) o SAML 2.0. Permisos por rol y por realm: el realm «Operaciones y Calidad» solo ve sus procedimientos y sus datos.',
        'La pasarela enmascara datos personales antes de llamar al modelo; los formatos DNI, NIE e IBAN se añaden en el piloto.'
      ],
      hitl: 'Retener un lote en SAP QM, retener una expedición, enviar un aviso a un cliente o una notificación a la autoridad requiere la aprobación de su responsable. Rechazar no aplica nada y queda registrado con el motivo.',
      cost: 'El presupuesto por realm permite separar el gasto de cada área (Calidad, Maduración y frío, Laboratorio y Atención al cliente).',
      limits: [
        'No sustituye SAP S/4HANA, la trazabilidad de campo, el LIMS, el WMS ni la tienda online.',
        'No libera ni retiene lotes por sí solo: la decisión la toma el Responsable de calidad y seguridad alimentaria.',
        'No notifica a las autoridades ni a los clientes sin aprobación humana.',
        'No asigna tareas ni evalúa a personas: trabaja con lotes, ensayos, pedidos y documentos.'
      ]
    },
    faqTitle: 'Preguntas habituales de Sistemas',
    faqSub: 'Respuestas cortas para la conversación con el equipo técnico',
    faq: [
      { topic: 'Integración', q: '¿Dónde se instala?', a: 'En una máquina virtual de su CPD con Docker Compose o en Kubernetes con Helm, o en su suscripción de nube. No depende de servicios de MFM en la nube.' },
      { topic: 'Seguridad', q: '¿Cómo entran los usuarios?', a: 'Con SSO de Microsoft Entra ID (OIDC) o SAML 2.0, y avisos en Teams. Los permisos van por rol y por realm (área o departamento).' },
      { topic: 'Datos', q: '¿Qué datos salen de nuestra red?', a: 'Con un modelo local, la inferencia se ejecuta en su red. Con uno externo, se revisa el contenido enviado y el contrato. Los flujos de conectores, telemetría y enmascarado se validan con Sistemas.' },
      { topic: 'Integración', q: '¿Hay conectores de SAP S/4HANA, trazabilidad de campo, LIMS, WMS o tienda online?', a: 'No de serie. En el piloto se construyen para 1–2 sistemas, por API o réplica de base de datos de solo lectura; la lectura de bases de datos Postgres ya funciona.' },
      { topic: 'Escala', q: '¿Cuántos usuarios soporta?', a: 'La concurrencia se dimensiona y se verifica con pruebas de carga. Cada realm tiene límites de peticiones por minuto, de tokens al día y de presupuesto.' },
      { topic: 'Idioma', q: '¿En qué idioma trabaja?', a: 'El chat y los agentes, en español; las respuestas al cliente, en su idioma (importante con ventas en España, Francia y Alemania). La consola de administración de Agentic Platform está en inglés.' },
      { topic: 'Coste', q: '¿Licencia y precio?', a: 'Se concretan en la propuesta comercial (SOW).' }
    ],
    seen: [
      { scene: 'turno', label: 'Resumen del turno', icon: 'activity', title: 'Resumen del turno de mañana: Centro de manipulado de la Axarquía', text: '38 camiones de fruta recibidos, 214 pedidos online a servir y 3 críticos, con el estado de Recepción de fruta, Maduración y frío, Manipulado y envasado, Procesado, Tienda online y Expediciones; el agente prepara el parte y lo deja para revisar.', agents: ['Parte de turno'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'De palabras a workflow', icon: 'workflow', title: 'Procedimiento escrito → workflow de calidad', text: 'El procedimiento PR-CAL-004 de LMR y análisis de residuos se convierte en un workflow con recepción, muestreo, resultado del LIMS y retención del lote, con aprobación y prueba en seco.', agents: ['Generador de workflows'], approver: 'qa_shift' },
      { scene: 'alarma', label: 'Alarma de frío', icon: 'alert-triangle', title: 'Desviación de temperatura en la cámara CM-06 (lote AH-2611-118)', text: 'A las 05:50 la alarma ALM-FRIO-0612 marca 11,4 °C frente a la consigna de 6,0 °C desde las 03:40 (fallo de compresor): 9 palés de aguacate Hass calibre 18 (14 t) destinados a 3 pedidos de supermercados y a los pedidos online de hoy; propuesta de retención del lote, traslado a CM-02, orden de trabajo y reasignación de expediciones para aprobar.', agents: ['Calidad', 'Mantenimiento', 'Logística y pedidos'], approver: 'qa_shift', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Reclamación CLM-2026-1120', icon: 'mail', title: '35 % de piezas duras en el pedido PED-2026-44718', text: 'Supermercados Levante Fresh, S.A. reclama por correo que el 35 % del aguacate "ready to eat" (lote AH-2611-092) llega duro en 4 tiendas: lote, registro de maduración, resultados de laboratorio, borrador de respuesta y plan 8D para aprobar (acuse en 24 h, informe en 10 días hábiles).', agents: ['Reclamaciones de cliente', 'Trazabilidad de lotes'], approver: 'qa_shift', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Simulacro RET-2026-1120', icon: 'git-branch', title: 'Simulacro de retirada: de MG-2611-KE-031 a 11 clientes y 640 pedidos online', text: 'La campaña RET-2026-1120 recorre el lote de mango Keitt, 3 lotes de manipulado, las expediciones a 11 clientes en 3 países (España, Francia y Alemania) y 640 pedidos de la tienda online; balance de 18 t = 6 t en almacén + 12 t expedidas, con el objetivo de avisar a autoridad y clientes en 4 h (Reglamento (CE) 178/2002, art. 19).', agents: ['Trazabilidad de lotes', 'Retiradas'], approver: 'qa_shift', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Cuestionario CUE-2026-063', icon: 'list-checks', title: 'Cuestionario de Handelsgruppe Nordfrisch respondido con citas', text: 'El cuestionario de auditoría de proveedor de fruta (GLOBALG.A.P., GRASP, IFS Food, trazabilidad, LMR y plan de residuos, agua, ESG y huella, plan de retirada, alérgenos en procesado, control de plagas), respondido con citas de procedimientos; las preguntas sin evidencia quedan para el responsable.', agents: ['Cuestionarios de cliente'], approver: 'qa_shift', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedimientos', icon: 'book-open', title: 'Preguntas con citas', text: 'Recepción y muestreo, maduración controlada, LMR, trazabilidad y retirada, procesado y APPCC, pedidos online y exportación: cada respuesta enlaza el apartado vigente (PR-REC-001, PR-MAD-002, PR-CAL-004, PR-TRZ-003, PR-PRO-005, PR-ECO-002 y PR-EXP-004) y, si no hay fuente, lo dice.', agents: ['Procedimientos'] }
    ],
    honesty: [
      { aspect: 'Consola, workflows (Routines) y editor', demo: 'Esta consola, en el navegador, con los workflows publicados en la sesión', pilot: 'Agentic Platform instalado en su infraestructura; Routines con editor visual, versiones y prueba en seco', origin: 'serie' },
      { aspect: 'Workflow a partir de un procedimiento escrito', demo: 'Generador simulado en el navegador, con tres plantillas', pilot: 'Se integra en Agentic Platform y se valida con sus procedimientos; cada workflow se revisa antes de publicarlo', origin: 'demo' },
      { aspect: 'Agentes de SAX', demo: 'Calidad, mantenimiento, logística y pedidos, trazabilidad de lotes, retiradas, reclamaciones y parte de turno, sobre datos sintéticos', pilot: 'Los del caso elegido, adaptados a sus datos y procedimientos', origin: 'demo' },
      { aspect: 'Conectores (SAP S/4HANA, trazabilidad de campo, LIMS, WMS y tienda online)', demo: 'Simulados en el navegador', pilot: 'Lectura de 1–2 sistemas por API o réplica de base de datos de solo lectura. No hay conectores de serie para SAP, LIMS ni WMS', origin: 'piloto' },
      { aspect: 'Disparo por alarma', demo: 'Al abrir la alarma de frío ALM-FRIO-0612 de la cámara CM-06', pilot: 'Webhook desde el sistema de control de cámaras o SAP, o consulta periódica (cron): Agentic Platform no tiene planificador propio de agentes', origin: 'piloto' },
      { aspect: 'Modelo de lenguaje', demo: 'Ninguna llamada: las respuestas están preparadas', pilot: 'El que elija SAX (Azure OpenAI, Gemini o local), a través de la pasarela de Agentic Platform', origin: 'serie' },
      { aspect: 'Aprobación humana', demo: 'Tarjetas de aprobación; rechazar no aplica nada', pilot: 'Igual, con SSO y permisos por rol. En el piloto no se escribe en SAP: borradores y tickets que aprueba una persona', origin: 'serie' },
      { aspect: 'Procedimientos con citas', demo: '7 documentos sintéticos (PR-REC-001, PR-MAD-002, PR-CAL-004, PR-TRZ-003, PR-PRO-005, PR-ECO-002 y PR-EXP-004)', pilot: 'Sus procedimientos vigentes, con permisos por realm; objetivo ≥90 % de citas correctas', origin: 'serie' },
      { aspect: 'Registro de auditoría', demo: 'De esta sesión, guardado en el navegador y exportable a JSON o CSV', pilot: 'En la base de datos de Agentic Platform, de solo añadir, con la identidad SSO de cada persona; exportable a CSV', origin: 'serie' },
      { aspect: 'Coste por petición', demo: 'Estimación mostrada al final de las ejecuciones', pilot: 'Medido por petición en USD, por realm y por caso, con presupuesto diario y mensual', origin: 'serie' },
      { aspect: 'Datos y acciones', demo: 'Sintéticos y coherentes entre sí, preparados por MFM; las acciones no salen del navegador', pilot: 'Sus datos en modo lectura y 20–30 casos históricos, anonimizados si hace falta', origin: 'datos' }
    ],
    writes: 'Ninguna en SAP durante el piloto: borradores y tickets que aprueba una persona',
    cases: {
      A: {
        label: 'Caso A', short: 'Caso A · Reclamación de cliente', title: 'Reclamación de cliente: lote, maduración y respuesta 8D',
        systems: ['Tienda online', 'SAP S/4HANA', 'LIMS y WMS'], systemsText: 'tienda online, SAP S/4HANA, LIMS y WMS',
        trigger: 'Correo entrante en el buzón de Atención al cliente (Outlook)',
        output: 'Ficha de la reclamación CLM-2026-1120, lote y registro de maduración cotejados, borrador de respuesta y plan 8D, para aprobar',
        scene: 'reclamacion', sceneLabel: 'Reclamación CLM-2026-1120',
        accuracy: '≥90 % de 30 reclamaciones históricas bien extraídas (cliente, lote, defecto y plazo)',
        accuracyHow: 'Comparación con el registro de reclamaciones y SAP QM'
      },
      B: {
        label: 'Caso B', short: 'Caso B · Alarma de frío y retirada', title: 'Desviación de frío y residuos: retención, traslado y trazabilidad',
        systems: ['LIMS y WMS', 'SAP S/4HANA', 'Trazabilidad de campo'], systemsText: 'WMS, LIMS, lotes de SAP S/4HANA y trazabilidad de campo',
        trigger: 'Alarma de temperatura o resultado del LIMS por webhook o consulta periódica (cron)',
        output: 'Palés, lotes y expediciones afectados, propuesta de retención y traslado para aprobar, aviso a clientes y notificación a la autoridad en borrador',
        scene: 'alarma', sceneLabel: 'Alarma de frío ALM-FRIO-0612',
        accuracy: '100 % de palés, lotes, expediciones y clientes afectados identificados en 20 escenarios',
        accuracyHow: 'Comparación con las ubicaciones del WMS y las expediciones de SAP de cada escenario'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Accesos, instalación y línea base', detail: 'Accesos de lectura, instalación y medición del tiempo actual', result: 'Criterios firmados y línea base medida' },
      { from: 3, to: 5, title: 'Conectores, agentes y workflow', detail: 'Pruebas con 20–30 casos históricos', result: 'Exactitud medida con casos históricos' },
      { from: 6, to: 7, title: 'Uso en paralelo', detail: 'Casos reales, con el proceso actual como respaldo', result: 'Aceptación de los borradores por Operaciones y Calidad' },
      { from: 8, to: 8, title: 'Evaluación y decisión', detail: 'Criterios medidos e informe final', result: 'Informe final y decisión' }
    ],
    criteria: [
      { name: 'Tiempo', target: 'Respuesta y borrador en menos de 15 min', how: 'Cronometrado frente a la línea base de las semanas 1–2' },
      { name: 'Utilidad', target: 'Calidad acepta el borrador con ediciones menores en ≥70 % de los casos', how: 'Revisión de cada borrador por Calidad' },
      { name: 'Citas', target: '≥90 % de 50 preguntas de referencia con la cita correcta', how: 'Herramienta de evaluación incluida en Agentic Platform' },
      { name: 'Control', target: 'Ninguna acción sin aprobación; el 100 % en el registro de auditoría', how: 'Revisión del registro exportado' },
      { name: 'Coste', target: 'Coste del modelo por caso medido y dentro del presupuesto del realm', how: 'Informe de coste por realm (USD, estimación)' }
    ],
    gives: {
      client: ['Responsable en Operaciones y Calidad y contacto de Sistemas', 'Accesos de lectura a 1–2 sistemas', '20–30 casos históricos, anonimizados si hace falta', 'Procedimientos vigentes', '2–3 h a la semana de Calidad'],
      mfm: ['Instalación en su infraestructura', 'Conectores de lectura', 'Agentes y workflow del caso', 'Formación de los usuarios', 'Informe final con los criterios medidos']
    },
    pilot: {
      sub: 'Un caso, el Centro de manipulado de la Axarquía, un realm (Operaciones y Calidad) y 5–10 usuarios, en su infraestructura y con su modelo',
      after: 'Después del piloto: trazabilidad de lotes sobre toda la fruta recibida (medible en un simulacro de retirada como RET-2026-1120) o cuestionarios de clientes conectados a la documentación de calidad.',
      nextTitle: 'Siguiente paso: taller de 2 horas con Operaciones, Calidad y Sistemas',
      nextBody: 'Para elegir el caso, confirmar los accesos de lectura y fijar la línea base con la que se medirá el piloto.'
    },
    calc: {
      fteHours: 1720,
      note: 'Horas de trabajo repetitivo que Calidad, Laboratorio, Maduración y Atención al cliente pueden dedicar a otras tareas.',
      rows: [
        { id: 'reclamacion', label: 'Reclamación de cliente: lote, maduración y respuesta 8D', who: 'Calidad y Atención al cliente', scene: 'reclamacion', seen: 'Reclamación CLM-2026-1120', n: 10, before: 180, after: 45, basis: 'Ficha, lote, registro de maduración, respuesta y plan 8D' },
        { id: 'excursion', label: 'Alarma de frío: retención, traslado y aviso', who: 'Responsable de calidad y seguridad alimentaria', scene: 'alarma', seen: 'Alarma de frío ALM-FRIO-0612', n: 2, before: 240, after: 45, basis: 'Palés afectados, retención en SAP QM, traslado a CM-02 y aviso a clientes' },
        { id: 'cuestionario', label: 'Cuestionario de auditoría de cliente', who: 'Calidad y Seguridad alimentaria', scene: 'cuestionario', seen: 'Cuestionario CUE-2026-063', n: 5, before: 240, after: 70, basis: 'Con citas de procedimientos y certificados' },
        { id: 'traza', label: 'Trazabilidad de lote o simulacro de retirada', who: 'Calidad y Expediciones', scene: 'retirada', seen: 'Simulacro RET-2026-1120', n: 3, before: 300, after: 40, basis: 'Lote de recepción, lotes de manipulado, expediciones, pedidos online y balance de toneladas' },
        { id: 'consultas', label: 'Consultas a procedimientos', who: 'Recepción, Maduración, Laboratorio, Calidad y Atención al cliente', scene: 'procedimientos', seen: 'Procedimientos', n: 60, before: 10, after: 3, basis: 'Búsqueda en los procedimientos vigentes' },
        { id: 'parte', label: 'Parte de turno', who: 'Responsable de operaciones y calidad', scene: 'turno', seen: 'Resumen del turno', n: 22, before: 30, after: 10, basis: '1 parte × 22 días' }
      ]
    },
    auditEmpty: 'Genera el parte de turno, publica un workflow o aprueba una retención de lote: cada paso aparecerá aquí con su hora, su actor y su vista.',
    auditPilot: 'El registro vive en la base de datos de Agentic Platform, identifica a cada persona por su SSO, se filtra por persona, acción y fecha y se exporta a CSV. En esta demo vive en este navegador y se borra con «Reiniciar demo».',
    proposal: {
      code: 'PIL-SAX-2026-01',
      filename: 'propuesta-piloto-agentic-sax',
      objective: 'Medir, con un caso real y criterios firmados, cuánto tiempo de Calidad y Operaciones libera Agentic Platform y con qué exactitud, sin cambiar SAP S/4HANA, la trazabilidad de campo, el LIMS, el WMS ni la tienda online. Agentic Platform lee de esos sistemas, razona con los procedimientos y propone; una persona aprueba antes de escribir.',
      extraArch: [['Enmascarado', 'Datos personales enmascarados antes del modelo; los formatos DNI, NIE e IBAN se añaden en el piloto']],
      compliance: [
        ['Seguridad alimentaria', 'Agentic Platform cruza lotes, resultados y procedimientos (APPCC, GLOBALG.A.P., GRASP, IFS Food, Reglamento (CE) 396/2005 sobre LMR; certificaciones citadas como referencia) y prepara borradores; la decisión la toma el Responsable de calidad y seguridad alimentaria'],
        ['Retirada y notificación', 'La notificación a la autoridad competente (Reglamento (CE) 178/2002, art. 19) la aprueba y envía una persona; Agentic Platform prepara el borrador y el balance de lotes'],
        ['Decisión de calidad', 'Retenciones, liberaciones y avisos a clientes los aprueba el responsable; SAP, la trazabilidad de campo, el LIMS y el WMS solo se leen en el piloto'],
        ['RGPD', 'MFM como encargado del tratamiento; la pasarela enmascara datos personales antes del modelo']
      ],
      signatures: [{ role: 'decider', note: 'Conforme con el alcance y los criterios' }, { role: 'Sistemas · SAX', note: 'Conforme con los accesos y el despliegue' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform no sustituye nada: va encima de SAP S/4HANA, la trazabilidad de campo, el LIMS, el WMS y la tienda online. Lee, razona con vuestros procedimientos y propone; antes de escribir en un sistema, aprueba una persona.',
        'Se instala en vuestra infraestructura, con vuestro SSO de Microsoft Entra ID y el modelo que elijáis. Con un modelo local, la inferencia queda en su red; Sistemas valida los demás flujos.',
        'Las líneas discontinuas en ámbar son las únicas escrituras, y siempre tras aprobación. La trazabilidad de campo, el LIMS y el WMS solo se leen.'
      ],
      piloto: [
        'Lo honesto: los datos de hoy son sintéticos y la demo no llama a ningún modelo. De serie en Agentic Platform: Routines, aprobación humana, auditoría, respuestas con citas y coste por petición.',
        'Construido para esta demo: el generador de workflows y los agentes de SAX. Los conectores de SAP, LIMS o WMS no existen de serie: se construyen en el piloto, en modo lectura.',
        'Piloto de 6–8 semanas: un caso, el Centro de manipulado de la Axarquía, realm de Operaciones y Calidad, 5–10 usuarios. Los criterios de aceptación se firman en la semana 1 y se miden en la 8.'
      ],
      horas: [
        'Preguntad cuántas reclamaciones, cuestionarios o alarmas de frío tienen al mes y escribidlo: la calculadora es suya.',
        '«Con Agentic Platform» incluye la revisión y la aprobación de una persona. Son horas de trabajo repetitivo que Calidad puede dedicar a otras tareas.',
        'Son supuestos para conversar: la línea base real se mide en las semanas 1–2 del piloto.'
      ],
      registro: [
        'Todo lo que hemos hecho hoy está aquí: {n}, de personas y de agentes, con hora, actor y vista.',
        'Filtrad por «Decisiones»: cada aprobación y cada rechazo, con su motivo. Nada se edita ni se borra desde la consola; se exporta a JSON o CSV.',
        'Cierre: proponemos un taller de 2 horas con Operaciones, Calidad y Sistemas para elegir el caso y fijar la línea base.'
      ],
      next: {
        arquitectura: 'Pulsar «Modelo local» para enseñar que el modelo entra en su red; después, pestaña «Demo y piloto».',
        piloto: 'Elegir con ellos el caso A o B y abrir la pestaña «Calculadora de horas».',
        horas: 'Escribir sus casos al mes y abrir «Registro de auditoría» para cerrar.',
        registro: 'Pulsar «Descargar propuesta de piloto (PDF)» y proponer fecha para el taller de 2 horas.'
      }
    },
    tour: [
      'Agentic Platform va encima de SAP S/4HANA, la trazabilidad de campo, el LIMS, el WMS y la tienda online: lee, prepara propuestas y una persona aprueba antes de escribir.',
      'Con un modelo local, la inferencia entra en su infraestructura; los demás flujos se validan con Sistemas.',
      'Los casos de hoy, de la alarma de frío ALM-FRIO-0612 a la reclamación CLM-2026-1120 y el simulacro RET-2026-1120, y qué es de serie en Agentic Platform, qué se ha construido para esta demo y qué se construye en el piloto.',
      'Piloto de 6–8 semanas: un caso, el Centro de manipulado de la Axarquía, realm de Operaciones y Calidad y criterios de aceptación firmados en la semana 1.',
      'Horas liberadas con supuestos editables; la línea base real se mide en el piloto.',
      'Todo lo hecho en la sesión queda en el registro de auditoría: decisiones humanas, pasos de los agentes y exportación.'
    ]
  }
});
