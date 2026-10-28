/* Norel Nutrición Animal · «Cómo encaja Agentic Platform»: arquitectura, demo frente a piloto, calculadora de horas,
 * preguntas de Sistemas y registro de auditoría. Escenario de la demo con datos sintéticos (MFM). */
agenticPack('norel', {
  plataforma: {
    nav: 'Cómo encaja en Norel',
    title: 'Cómo encaja en Norel Nutrición Animal',
    actor: 'decider',
    site: { kind: 'Hub', name: 'Madrid y Planta de premezclas (España)', realm: 'Operaciones y Calidad' },
    pageMeta: [
      { icon: 'building', text: 'Oficina de pedidos de Madrid y planta de premezclas' },
      { icon: 'server', text: 'Instalación en su infraestructura' },
      { icon: 'user-check', text: 'Aprobación humana antes de escribir' }
    ],
    kpis: [
      { label: 'Piloto propuesto', value: '6–8', unit: 'semanas', sub: '1 caso · Madrid y planta de premezclas · realm de Operaciones y Calidad', icon: 'calendar' },
      { label: 'Sistemas conectados en el piloto', value: '1–2', unit: 'solo lectura', sub: 'Por API o réplica de base de datos', icon: 'database' },
      { label: 'Usuarios del piloto', value: '5–10', sub: 'SSO con Microsoft Entra ID', icon: 'users' }
    ],
    arch: {
      title: 'Arquitectura de referencia en Madrid y la planta de premezclas',
      sso: 'Acceso con SSO · Microsoft Entra ID',
      ssoShort: 'SSO de Microsoft Entra ID',
      console: 'Consola web y avisos en Teams',
      consoleShort: 'Consola web y Teams'
    },
    deploy: {
      cpd: { seg: 'CPD propio', label: 'CPD propio · máquina virtual con Docker Compose', zone: 'CPD de Norel · VM con Docker Compose', text: 'Una máquina virtual en su CPD con Docker Compose: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'Clúster Kubernetes de Norel · Helm', text: 'Despliegue con Helm en su clúster Kubernetes: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      cloud: { seg: 'Nube propia', label: 'Nube de Norel (Azure, AWS o GCP)', zone: 'Suscripción en la nube de Norel (Azure, AWS o GCP)', text: 'La misma instalación en su suscripción de nube, en la región que elijan.' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'Región UE, con el contrato de Norel', exit: 'Sale de su red solo el texto de cada petición', note: 'Conexión por la pasarela LiteLLM de Agentic Platform; se confirma en las semanas 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'Con la cuenta y la región que contrate Norel', exit: 'Sale de su red solo el texto de cada petición', note: 'Proveedor incluido de serie en el catálogo de modelos de Agentic Platform.' },
      local: { seg: 'Modelo local', name: 'Modelo local', local: true, place: 'Servidor con GPU en su CPD (Ollama, LM Studio o llama.cpp)', exit: 'La inferencia se ejecuta dentro de su red', note: 'La calidad y la velocidad se dimensionan con su servidor. Sistemas revisa también los flujos de conectores y telemetría.' }
    },
    people: ['decider', 'plant_shift', 'qa_shift', 'lab_shift', 'solutions', 'customer_care'],
    peopleShort: ['Responsable de operaciones y calidad', 'Jefe de planta', 'Calidad y APPCC', 'Jefe de laboratorio', 'Norel Solutions', 'Atención al cliente'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Editor visual, versiones y prueba en seco' },
      { icon: 'cpu', title: 'Agentes de operaciones y calidad', text: 'Calidad, planificación, laboratorio, trazabilidad, reclamaciones y parte de turno', agents: true },
      { icon: 'user-check', title: 'Aprobación humana', text: 'Nada se escribe en un sistema sin su responsable', approval: true },
      { icon: 'book-open', title: 'Procedimientos con citas', text: 'Cada respuesta enlaza su fuente; sin fuente, lo dice' },
      { icon: 'history', title: 'Registro de auditoría', text: 'De solo añadir y exportable' },
      { icon: 'key', title: 'Permisos por rol y realm', text: 'Cada área ve lo suyo' },
      { icon: 'gauge', title: 'Coste por petición', text: 'Estimación en USD y presupuesto por realm' },
      { icon: 'shield', title: 'Pasarela de modelos', text: 'Enmascara datos personales antes del modelo', gateway: true }
    ],
    tiles: [
      { name: 'SAP S/4HANA', icon: 'database', text: 'Lee lotes, pedidos, albaranes y calidad (QM). Propone bloqueos de lote y retenciones de expedición para aprobar.', write: true },
      { name: 'LIMS (laboratorio)', icon: 'flask', text: 'Lee ensayos, resultados y muestras por lote. No escribe.', write: false },
      { name: 'MES de planta', icon: 'factory', text: 'Lee órdenes de fabricación, consumos de materias primas y limpiezas de línea.', write: false },
      { name: 'Salesforce CRM', icon: 'users', text: 'Lee clientes, reclamaciones y contactos. Prepara avisos y respuestas para aprobar.', write: true }
    ],
    decisions: {
      deploy: ['No depende de servicios de MFM en la nube. Lo opera su equipo de Sistemas o un servicio gestionado.'],
      llm: 'Se cambia de modelo por configuración, sin tocar los workflows; también admite OpenAI o AWS Bedrock en la UE.',
      access: [
        'SSO con Microsoft Entra ID (OIDC) o SAML 2.0. Permisos por rol y por realm: el realm «Operaciones y Calidad» solo ve sus procedimientos y sus datos.',
        'La pasarela enmascara datos personales antes de llamar al modelo; los formatos DNI, NIE e IBAN se añaden en el piloto.'
      ],
      hitl: 'Bloquear un lote en SAP QM, retener una expedición, enviar un aviso a un cliente o una notificación a la autoridad requiere la aprobación de su responsable. Rechazar no aplica nada y queda registrado con el motivo.',
      cost: 'El presupuesto por realm permite separar el gasto de cada área (Calidad, Producción, Laboratorio y Atención al cliente).',
      limits: [
        'No sustituye SAP S/4HANA, el LIMS, el MES ni Salesforce.',
        'No libera ni bloquea lotes por sí solo: la decisión la toma el Responsable de calidad y seguridad alimentaria.',
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
      { topic: 'Integración', q: '¿Hay conectores de SAP S/4HANA, LIMS, MES o Salesforce?', a: 'No de serie. En el piloto se construyen para 1–2 sistemas, por API o réplica de base de datos de solo lectura; la lectura de bases de datos Postgres ya funciona.' },
      { topic: 'Escala', q: '¿Cuántos usuarios soporta?', a: 'La concurrencia se dimensiona y se verifica con pruebas de carga. Cada realm tiene límites de peticiones por minuto, de tokens al día y de presupuesto.' },
      { topic: 'Idioma', q: '¿En qué idioma trabaja?', a: 'El chat y los agentes, en español; las respuestas al cliente, en su idioma (importante con ventas a más de 70 países). La consola de administración de Agentic Platform está en inglés.' },
      { topic: 'Coste', q: '¿Licencia y precio?', a: 'Se concretan en la propuesta comercial (SOW).' }
    ],
    seen: [
      { scene: 'turno', label: 'Resumen del turno', icon: 'activity', title: 'Resumen del turno de mañana: Madrid y planta de premezclas', text: '14 órdenes de fabricación hoy, 126 pedidos en curso y 3 críticos, con el estado de Recepción, Fabricación, Laboratorio, Almacén y expediciones, Norel Solutions y atención de pedidos; el agente prepara el parte y lo deja para revisar.', agents: ['Parte de turno'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'De palabras a workflow', icon: 'workflow', title: 'Procedimiento escrito → workflow de calidad', text: 'El procedimiento PR-CAL-004 de muestreo y control de Salmonella en materias primas se convierte en un workflow con recepción, muestreo, resultado del LIMS y bloqueo del lote, con aprobación y prueba en seco.', agents: ['Generador de workflows'], approver: 'qa_shift' },
      { scene: 'alarma', label: 'Alarma de Salmonella', icon: 'alert-triangle', title: 'Salmonella en colina cloruro 60 % (lote MP-2610-CC-118)', text: 'A las 05:50 el LIMS (ensayo LAB-2610-0933) da positivo en la materia prima de Agroquímica Delta, recibida el 21/10: ya está en 4 lotes de premezcla (96 t), con 31 t en almacén y 65 t expedidas a 9 clientes; propuesta de bloqueo en SAP QM, retención de expediciones y aviso para aprobar.', agents: ['Calidad', 'Planificación y logística', 'Atención al cliente y Norel Solutions'], approver: 'qa_shift', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Reclamación CLM-2026-1028', icon: 'mail', title: 'Vitamina E un 18 % por debajo en PRM-2610-0388', text: 'Piensos Cuenca Mediterráneo, S.A. reclama por correo que la premezcla para vacuno de leche tiene un 18 % menos de vitamina E que lo declarado (informe LAB-CLI-2610-77): lote, consumo de MP-2610-VE-044, resultados de laboratorio, borrador de respuesta y plan 8D para aprobar (acuse en 24 h, informe en 10 días hábiles).', agents: ['Reclamaciones de cliente', 'Trazabilidad de lotes'], approver: 'qa_shift', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Simulacro RET-2026-1028', icon: 'git-branch', title: 'Simulacro de retirada: de MP-2610-CC-118 a 9 clientes', text: 'La campaña RET-2026-1028 recorre la materia prima, 4 lotes de premezcla, 148 albaranes y 9 clientes en 3 países; balance de 96 t = 31 t en almacén + 65 t expedidas, con el objetivo de informar a autoridades y clientes en 4 h (Reglamento (CE) 178/2002, art. 19).', agents: ['Trazabilidad de lotes', 'Retiradas'], approver: 'regulatory', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Cuestionario CUE-2026-052', icon: 'list-checks', title: 'Cuestionario de Grupo Integrador Levante respondido con citas', text: 'El cuestionario de auditoría de proveedor de aditivos (GMP+ B2 / FAMI-QS, APPCC, trazabilidad, Salmonella, retirada, REACH, ESG), respondido con citas de procedimientos; las preguntas sin evidencia quedan para el responsable.', agents: ['Cuestionarios de cliente'], approver: 'qa_shift', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedimientos', icon: 'book-open', title: 'Preguntas con citas', text: 'APPCC, control de Salmonella, retirada y trazabilidad, contaminación cruzada, etiquetado, verificación de contenidos y exportación: cada respuesta enlaza el apartado vigente (PR-CAL-001, PR-CAL-004, PR-CAL-007, PR-PRO-003, PR-REG-002, PR-LAB-005 y PR-EXP-002) y, si no hay fuente, lo dice.', agents: ['Procedimientos'] }
    ],
    honesty: [
      { aspect: 'Consola, workflows (Routines) y editor', demo: 'Esta consola, en el navegador, con los workflows publicados en la sesión', pilot: 'Agentic Platform instalado en su infraestructura; Routines con editor visual, versiones y prueba en seco', origin: 'serie' },
      { aspect: 'Workflow a partir de un procedimiento escrito', demo: 'Generador simulado en el navegador, con tres plantillas', pilot: 'Se integra en Agentic Platform y se valida con sus procedimientos; cada workflow se revisa antes de publicarlo', origin: 'demo' },
      { aspect: 'Agentes de Norel', demo: 'Calidad, planificación y logística, trazabilidad de lotes, retiradas, reclamaciones y parte de turno, sobre datos sintéticos', pilot: 'Los del caso elegido, adaptados a sus datos y procedimientos', origin: 'demo' },
      { aspect: 'Conectores (SAP S/4HANA, LIMS, MES de planta y Salesforce)', demo: 'Simulados en el navegador', pilot: 'Lectura de 1–2 sistemas por API o réplica de base de datos de solo lectura. No hay conectores de serie para SAP, LIMS ni MES', origin: 'piloto' },
      { aspect: 'Disparo por alarma', demo: 'Al abrir la alarma de Salmonella del lote MP-2610-CC-118', pilot: 'Webhook desde el LIMS o SAP, o consulta periódica (cron): Agentic Platform no tiene planificador propio de agentes', origin: 'piloto' },
      { aspect: 'Modelo de lenguaje', demo: 'Ninguna llamada: las respuestas están preparadas', pilot: 'El que elija Norel (Azure OpenAI, Gemini o local), a través de la pasarela de Agentic Platform', origin: 'serie' },
      { aspect: 'Aprobación humana', demo: 'Tarjetas de aprobación; rechazar no aplica nada', pilot: 'Igual, con SSO y permisos por rol. En el piloto no se escribe en SAP: borradores y tickets que aprueba una persona', origin: 'serie' },
      { aspect: 'Procedimientos con citas', demo: '7 documentos sintéticos (PR-CAL-001, PR-CAL-004, PR-CAL-007, PR-PRO-003, PR-REG-002, PR-LAB-005 y PR-EXP-002)', pilot: 'Sus procedimientos vigentes, con permisos por realm; objetivo ≥90 % de citas correctas', origin: 'serie' },
      { aspect: 'Registro de auditoría', demo: 'De esta sesión, guardado en el navegador y exportable a JSON o CSV', pilot: 'En la base de datos de Agentic Platform, de solo añadir, con la identidad SSO de cada persona; exportable a CSV', origin: 'serie' },
      { aspect: 'Coste por petición', demo: 'Estimación mostrada al final de las ejecuciones', pilot: 'Medido por petición en USD, por realm y por caso, con presupuesto diario y mensual', origin: 'serie' },
      { aspect: 'Datos y acciones', demo: 'Sintéticos y coherentes entre sí, preparados por MFM; las acciones no salen del navegador', pilot: 'Sus datos en modo lectura y 20–30 casos históricos, anonimizados si hace falta', origin: 'datos' }
    ],
    writes: 'Ninguna en SAP durante el piloto: borradores y tickets que aprueba una persona',
    cases: {
      A: {
        label: 'Caso A', short: 'Caso A · Reclamación de cliente', title: 'Reclamación de cliente: lote, laboratorio y respuesta 8D',
        systems: ['Salesforce CRM', 'SAP S/4HANA', 'LIMS (laboratorio)'], systemsText: 'Salesforce CRM, SAP S/4HANA y LIMS',
        trigger: 'Correo entrante en el buzón de Atención al cliente (Outlook)',
        output: 'Ficha de la reclamación CLM-2026-1028, lote y resultados del LIMS cotejados, borrador de respuesta y plan 8D, para aprobar',
        scene: 'reclamacion', sceneLabel: 'Reclamación CLM-2026-1028',
        accuracy: '≥90 % de 30 reclamaciones históricas bien extraídas (cliente, lote, parámetro y plazo)',
        accuracyHow: 'Comparación con el registro de reclamaciones en Salesforce y SAP QM'
      },
      B: {
        label: 'Caso B', short: 'Caso B · Alarma de Salmonella y retirada', title: 'Salmonella en una materia prima: bloqueo, retención y trazabilidad',
        systems: ['LIMS (laboratorio)', 'SAP S/4HANA', 'MES de planta'], systemsText: 'resultados del LIMS, lotes de SAP S/4HANA y consumos del MES',
        trigger: 'Resultado positivo del LIMS por webhook o consulta periódica (cron)',
        output: 'Lotes de premezcla y expediciones afectados, propuesta de bloqueo y retención para aprobar, aviso a clientes y notificación a la autoridad en borrador',
        scene: 'alarma', sceneLabel: 'Alarma de Salmonella',
        accuracy: '100 % de lotes, albaranes y clientes afectados identificados en 20 escenarios',
        accuracyHow: 'Comparación con los consumos del MES y las expediciones de SAP de cada escenario'
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
      sub: 'Un caso, Madrid y la planta de premezclas, un realm (Operaciones y Calidad) y 5–10 usuarios, en su infraestructura y con su modelo',
      after: 'Después del piloto: trazabilidad de lotes sobre todas las materias primas (medible en un simulacro de retirada como RET-2026-1028) o cuestionarios de clientes conectados a la documentación de calidad.',
      nextTitle: 'Siguiente paso: taller de 2 horas con Operaciones, Calidad y Sistemas',
      nextBody: 'Para elegir el caso, confirmar los accesos de lectura y fijar la línea base con la que se medirá el piloto.'
    },
    calc: {
      fteHours: 1720,
      note: 'Horas de trabajo repetitivo que Calidad, Laboratorio, Planta y Atención al cliente pueden dedicar a otras tareas.',
      rows: [
        { id: 'reclamacion', label: 'Reclamación de cliente: lote, laboratorio y respuesta 8D', who: 'Calidad y Atención al cliente', scene: 'reclamacion', seen: 'Reclamación CLM-2026-1028', n: 10, before: 180, after: 45, basis: 'Ficha, lote, resultados del LIMS, respuesta y plan 8D' },
        { id: 'excursion', label: 'Alarma de Salmonella: bloqueo, retención y aviso', who: 'Responsable de calidad y seguridad alimentaria', scene: 'alarma', seen: 'Alarma de Salmonella', n: 2, before: 240, after: 45, basis: 'Lotes afectados, bloqueo en SAP QM, retención de expediciones y aviso a clientes' },
        { id: 'cuestionario', label: 'Cuestionario de auditoría de cliente', who: 'Calidad y Asuntos regulatorios', scene: 'cuestionario', seen: 'Cuestionario CUE-2026-052', n: 5, before: 240, after: 70, basis: 'Con citas de procedimientos y certificados' },
        { id: 'traza', label: 'Trazabilidad de lote o simulacro de retirada', who: 'Calidad y Logística', scene: 'retirada', seen: 'Simulacro RET-2026-1028', n: 3, before: 300, after: 40, basis: 'Materia prima, lotes, albaranes, clientes y balance de toneladas' },
        { id: 'consultas', label: 'Consultas a procedimientos', who: 'Planta, Laboratorio, Calidad y Atención al cliente', scene: 'procedimientos', seen: 'Procedimientos', n: 60, before: 10, after: 3, basis: 'Búsqueda en los procedimientos vigentes' },
        { id: 'parte', label: 'Parte de turno', who: 'Responsable de operaciones y calidad', scene: 'turno', seen: 'Resumen del turno', n: 22, before: 30, after: 10, basis: '1 parte × 22 días' }
      ]
    },
    auditEmpty: 'Genera el parte de turno, publica un workflow o aprueba un bloqueo de lote: cada paso aparecerá aquí con su hora, su actor y su vista.',
    auditPilot: 'El registro vive en la base de datos de Agentic Platform, identifica a cada persona por su SSO, se filtra por persona, acción y fecha y se exporta a CSV. En esta demo vive en este navegador y se borra con «Reiniciar demo».',
    proposal: {
      code: 'PIL-NOR-2026-01',
      filename: 'propuesta-piloto-agentic-norel',
      objective: 'Medir, con un caso real y criterios firmados, cuánto tiempo de Calidad y Operaciones libera Agentic Platform y con qué exactitud, sin cambiar SAP S/4HANA, el LIMS, el MES ni Salesforce. Agentic Platform lee de esos sistemas, razona con los procedimientos y propone; una persona aprueba antes de escribir.',
      extraArch: [['Enmascarado', 'Datos personales enmascarados antes del modelo; los formatos DNI, NIE e IBAN se añaden en el piloto']],
      compliance: [
        ['Seguridad alimentaria y piensos', 'Agentic Platform cruza lotes, resultados y procedimientos (APPCC, GMP+ B2 / FAMI-QS, Reglamento (CE) 183/2005) y prepara borradores; la decisión la toma el Responsable de calidad y seguridad alimentaria'],
        ['Retirada y notificación', 'La notificación a la autoridad competente (Reglamento (CE) 178/2002, art. 19) la aprueba y envía una persona; Agentic Platform prepara el borrador y el balance de lotes'],
        ['Decisión de calidad', 'Bloqueos, liberaciones y avisos a clientes los aprueba el responsable; SAP, el LIMS y el MES solo se leen en el piloto'],
        ['RGPD', 'MFM como encargado del tratamiento; la pasarela enmascara datos personales antes del modelo']
      ],
      signatures: [{ role: 'decider', note: 'Conforme con el alcance y los criterios' }, { role: 'Sistemas · Norel', note: 'Conforme con los accesos y el despliegue' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform no sustituye nada: va encima de SAP S/4HANA, el LIMS, el MES y Salesforce. Lee, razona con vuestros procedimientos y propone; antes de escribir en un sistema, aprueba una persona.',
        'Se instala en vuestra infraestructura, con vuestro SSO de Microsoft Entra ID y el modelo que elijáis. Con un modelo local, la inferencia queda en su red; Sistemas valida los demás flujos.',
        'Las líneas discontinuas en ámbar son las únicas escrituras, y siempre tras aprobación. El LIMS y el MES solo se leen.'
      ],
      piloto: [
        'Lo honesto: los datos de hoy son sintéticos y la demo no llama a ningún modelo. De serie en Agentic Platform: Routines, aprobación humana, auditoría, respuestas con citas y coste por petición.',
        'Construido para esta demo: el generador de workflows y los agentes de Norel. Los conectores de SAP, LIMS o MES no existen de serie: se construyen en el piloto, en modo lectura.',
        'Piloto de 6–8 semanas: un caso, Madrid y la planta de premezclas, realm de Operaciones y Calidad, 5–10 usuarios. Los criterios de aceptación se firman en la semana 1 y se miden en la 8.'
      ],
      horas: [
        'Preguntad cuántas reclamaciones, cuestionarios o alertas de laboratorio tienen al mes y escribidlo: la calculadora es suya.',
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
      'Agentic Platform va encima de SAP S/4HANA, el LIMS, el MES y Salesforce: lee, prepara propuestas y una persona aprueba antes de escribir.',
      'Con un modelo local, la inferencia entra en su infraestructura; los demás flujos se validan con Sistemas.',
      'Los casos de hoy, de la alarma de Salmonella a la reclamación CLM-2026-1028 y el simulacro RET-2026-1028, y qué es de serie en Agentic Platform, qué se ha construido para esta demo y qué se construye en el piloto.',
      'Piloto de 6–8 semanas: un caso, Madrid y la planta de premezclas, realm de Operaciones y Calidad y criterios de aceptación firmados en la semana 1.',
      'Horas liberadas con supuestos editables; la línea base real se mide en el piloto.',
      'Todo lo hecho en la sesión queda en el registro de auditoría: decisiones humanas, pasos de los agentes y exportación.'
    ]
  }
});
