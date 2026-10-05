/* Empresa de Congelados · «Cómo encaja Agentic Platform»: arquitectura, demo frente a piloto, calculadora de horas,
 * preguntas de Sistemas y registro de auditoría. Escenario de la demo de referencia con datos sintéticos (MFM). */
agenticPack('congelados', {
  plataforma: {
    nav: 'Cómo encaja en EC',
    title: 'Cómo encaja en Empresa de Congelados',
    actor: 'quality_shift',
    site: { kind: 'Planta', name: 'Fustiñana (FUS)', realm: 'Calidad' },
    pageMeta: [
      { icon: 'factory', text: 'Planta de Fustiñana' },
      { icon: 'server', text: 'Instalación en su infraestructura' },
      { icon: 'user-check', text: 'Aprobación humana antes de escribir' }
    ],
    kpis: [
      { label: 'Piloto propuesto', value: '6–8', unit: 'semanas', sub: '1 caso · Fustiñana · realm de Calidad', icon: 'calendar' },
      { label: 'Sistemas conectados en el piloto', value: '1–2', unit: 'solo lectura', sub: 'Por API o réplica de base de datos', icon: 'database' },
      { label: 'Usuarios del piloto', value: '5–10', sub: 'SSO con Microsoft Entra ID', icon: 'users' }
    ],
    arch: {
      title: 'Arquitectura de referencia en Fustiñana',
      sso: 'Acceso con SSO · Microsoft Entra ID',
      ssoShort: 'SSO de Microsoft Entra ID',
      console: 'Consola web y avisos en Microsoft Teams',
      consoleShort: 'Consola web y Teams'
    },
    deploy: {
      cpd: { seg: 'CPD propio', label: 'CPD propio · máquina virtual con Docker Compose', zone: 'CPD de Empresa de Congelados · VM con Docker Compose', text: 'Una máquina virtual en su CPD con Docker Compose: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'Clúster Kubernetes de Empresa de Congelados · Helm', text: 'Despliegue con Helm en su clúster Kubernetes: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      cloud: { seg: 'Nube propia', label: 'Nube de Empresa de Congelados (Azure, AWS o GCP)', zone: 'Suscripción en la nube de Empresa de Congelados (Azure, AWS o GCP)', text: 'La misma instalación en su suscripción de nube, en la región que elijan.' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'Región UE, con el contrato de Empresa de Congelados', exit: 'Sale de su red solo el texto de cada petición', note: 'Conexión por la pasarela LiteLLM de Agentic Platform; se confirma en las semanas 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'Con la cuenta y la región que contrate Empresa de Congelados', exit: 'Sale de su red solo el texto de cada petición', note: 'Proveedor incluido de serie en el catálogo de modelos de Agentic Platform.' },
      local: { seg: 'Modelo local', name: 'Modelo local', local: true, place: 'Servidor con GPU en su CPD (Ollama, LM Studio o llama.cpp)', exit: 'La inferencia se ejecuta dentro de su red', note: 'La calidad y la velocidad se dimensionan con su servidor. Sistemas revisa también los flujos de conectores y telemetría.' }
    },
    people: ['quality_shift', 'quality_plant', 'dispatch_shift', 'refrigeration_maintenance', 'line_maintenance'],
    peopleShort: ['Calidad de turno', 'Calidad de planta', 'Jefe de turno de expedición', 'Mantenimiento frigorífico', 'Mantenimiento de línea'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Editor visual, versiones y prueba en seco' },
      { icon: 'cpu', title: 'Agentes de planta', text: 'Cadena de frío, trazabilidad, bloqueo, reclamaciones y parte diario', agents: true },
      { icon: 'user-check', title: 'Aprobación humana', text: 'Nada se escribe en un sistema sin su responsable', approval: true },
      { icon: 'book-open', title: 'Procedimientos con citas', text: 'Cada respuesta enlaza su fuente; sin fuente, lo dice' },
      { icon: 'history', title: 'Registro de auditoría', text: 'De solo añadir y exportable' },
      { icon: 'key', title: 'Permisos por rol y realm', text: 'Cada planta o departamento ve lo suyo' },
      { icon: 'gauge', title: 'Coste por petición', text: 'Estimación en USD y presupuesto por realm' },
      { icon: 'shield', title: 'Pasarela de modelos', text: 'Enmascara datos personales antes del modelo', gateway: true }
    ],
    tiles: [
      { name: 'SAP · SAP QM', icon: 'database', text: 'Lee lotes, pedidos y expediciones. Propone el bloqueo de calidad.', write: true },
      { name: 'MES Mapex', icon: 'factory', text: 'Lee la producción por línea y turno.', write: false },
      { name: 'Siemens Opcenter APS', icon: 'calendar', text: 'Lee capacidades y el plan de campaña.', write: false },
      { name: 'Mecalux Easy WMS', icon: 'warehouse', text: 'Lee palés, ubicaciones y expediciones. Propone inmovilizar palés.', write: true },
      { name: 'SCADA Galileo', icon: 'activity', text: 'Lee temperaturas y alarmas. No actúa sobre el control de planta.', write: false },
      { name: 'Elara', icon: 'clipboard', text: 'Lee NC, reclamaciones y documentos. Prepara borradores de NC y 8D.', write: true },
      { name: 'Microsoft 365', icon: 'mail', text: 'Avisos en Teams y borradores en Outlook. El envío al cliente se aprueba.', write: true }
    ],
    decisions: {
      deploy: ['No depende de servicios de MFM en la nube. Lo opera su equipo de Sistemas o un servicio gestionado.'],
      llm: 'Se cambia de modelo por configuración, sin tocar los workflows; también admite OpenAI o AWS Bedrock en la UE.',
      access: [
        'SSO con Microsoft Entra ID (OIDC) o SAML 2.0. Permisos por rol y por realm: el realm «Calidad · Fustiñana» solo ve sus procedimientos y sus datos.',
        'La pasarela enmascara datos personales antes de llamar al modelo; los formatos DNI, NIE e IBAN se añaden en el piloto.'
      ],
      hitl: 'Bloquear en SAP QM, abrir una NC en Elara o enviar un correo al cliente requiere la aprobación de su responsable. Rechazar no aplica nada y queda registrado con el motivo.',
      cost: 'El presupuesto por realm permite separar el gasto de cada planta o departamento (Calidad, Expedición y Mantenimiento).',
      limits: [
        'No sustituye SAP, MES Mapex, Siemens Opcenter APS, Mecalux Easy WMS ni Elara.',
        'No actúa sobre el control de planta: Galileo/SCADA solo se lee.',
        'No libera producto: lo decide el Responsable de Calidad (PNT-CAL-015).',
        'No asigna tareas ni evalúa a personas: trabaja con lotes, equipos y documentos.'
      ]
    },
    faqTitle: 'Preguntas habituales de Sistemas',
    faqSub: 'Respuestas cortas para la conversación con el equipo técnico',
    faq: [
      { topic: 'Integración', q: '¿Dónde se instala?', a: 'En una máquina virtual de su CPD con Docker Compose o en Kubernetes con Helm, o en su suscripción de nube. No depende de servicios de MFM en la nube.' },
      { topic: 'Seguridad', q: '¿Cómo entran los usuarios?', a: 'Con SSO de Microsoft Entra ID (OIDC) o SAML 2.0. Los permisos van por rol y por realm (planta o departamento).' },
      { topic: 'Datos', q: '¿Qué datos salen de nuestra red?', a: 'Con un modelo local, la inferencia se ejecuta en su red. Con uno externo, se revisa el contenido enviado y el contrato. Los flujos de conectores, telemetría y enmascarado se validan con Sistemas.' },
      { topic: 'Integración', q: '¿Hay conectores de SAP, MES o SCADA?', a: 'No de serie. En el piloto se construyen para 1–2 sistemas, por API o réplica de base de datos de solo lectura; la lectura de bases de datos Postgres ya funciona.' },
      { topic: 'Escala', q: '¿Cuántos usuarios soporta?', a: 'La concurrencia se dimensiona y se verifica con pruebas de carga. Cada realm tiene límites de peticiones por minuto, de tokens al día y de presupuesto.' },
      { topic: 'Idioma', q: '¿En qué idioma trabaja?', a: 'El chat y los agentes, en español; las respuestas al cliente, en su idioma. La consola de administración de Agentic Platform está en inglés.' },
      { topic: 'Coste', q: '¿Licencia y precio?', a: 'Se concretan en la propuesta comercial (SOW).' }
    ],
    seen: [
      { scene: 'turno', label: 'Resumen del turno', icon: 'activity', title: 'Resumen del turno de noche en Fustiñana', text: 'Excursión de la cámara C-07, reclamación UKC-44718 y parte diario de equipos con las lecturas de las 06:00 (DM-1 sin verificar, malla de DP-2); el agente prepara el resumen y lo deja para revisar.', agents: ['Parte diario de planta'], approver: 'quality_shift', outcome: 'parte' },
      { scene: 'workflow', label: 'De palabras a workflow', icon: 'workflow', title: 'Procedimiento escrito → workflow publicado', text: 'El procedimiento de excursiones de temperatura (PNT-CAL-012, con el bloqueo de PNT-CAL-015) se convierte en un workflow con disparador, agentes en orden, aprobación y prueba en seco.', agents: ['Generador de workflows'], approver: 'quality_plant' },
      { scene: 'alarma', label: 'Alarma C-07', icon: 'thermometer', title: 'Excursión de temperatura en la cámara C-07', text: 'ALM-C07-0550 a las 05:50: 50 min por encima de −18 °C y pico de −13,9 °C a las 06:25; 6 lotes y 38 palés (28.592 kg) a bloquear en SAP QM y Easy WMS, incidencia en Elara y aviso a Expedición.', agents: ['Monitor de cadena de frío', 'Trazabilidad', 'Bloqueo de calidad', 'Incidencias'], approver: 'quality_shift', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Reclamación UKC-44718', icon: 'mail', title: 'Piedra de 8 mm en guisante 1 kg', text: 'EC Foods UK Ltd reclama por un cuerpo extraño en Garden Peas 1kg, lote L26-231-FUS-GUI-01: traza del lote, histórico, borrador de NC y 8D y respuesta en inglés antes del 2 de octubre.', agents: ['Reclamaciones de cliente', 'Trazabilidad'], approver: 'quality_plant', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Simulacro de retirada', icon: 'git-branch', title: 'Simulacro de retirada del lote L26-261-FUS-GUI-03', text: 'Genealogía hacia atrás y hacia delante (parcela, recepción, granel, lote, palés, expediciones y clientes), balance de masas en kg, palés por SSCC y aviso a clientes, para los simulacros de IFS Food y BRCGS.', agents: ['Trazabilidad'], approver: 'quality_shift', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Cuestionario de cliente', icon: 'list-checks', title: 'Supplier Technical Questionnaire 2026', text: 'Las 15 preguntas del retailer del Reino Unido, recibidas de EC Foods UK Ltd, respondidas en inglés con citas de procedimientos, fichas técnicas y certificados; las que no tienen evidencia quedan para Calidad.', agents: ['Cuestionarios de cliente'], approver: 'quality_plant', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedimientos', icon: 'book-open', title: 'Preguntas con citas', text: 'Excursiones de temperatura, bloqueo y liberación, reclamaciones y 8D, cuerpos extraños y mallas de despedregadora: cada respuesta enlaza el apartado vigente y, si no hay fuente, lo dice.', agents: ['Procedimientos'] }
    ],
    honesty: [
      { aspect: 'Consola, workflows (Routines) y editor', demo: 'Esta consola, en el navegador, con los workflows publicados en la sesión', pilot: 'Agentic Platform instalado en su infraestructura; Routines con editor visual, versiones y prueba en seco', origin: 'serie' },
      { aspect: 'Workflow a partir de un procedimiento escrito', demo: 'Generador simulado en el navegador, con tres plantillas', pilot: 'Se integra en Agentic Platform y se valida con sus procedimientos; cada workflow se revisa antes de publicarlo', origin: 'demo' },
      { aspect: 'Agentes de Empresa de Congelados', demo: 'Cadena de frío, trazabilidad, bloqueo, incidencias, reclamaciones y parte diario, sobre datos sintéticos', pilot: 'Los del caso elegido, adaptados a sus datos y procedimientos', origin: 'demo' },
      { aspect: 'Conectores (SAP, MES Mapex, Siemens Opcenter APS, Mecalux Easy WMS, SCADA Galileo y Elara)', demo: 'Simulados en el navegador', pilot: 'Lectura de 1–2 sistemas por API o réplica de base de datos de solo lectura. No hay conectores de serie para SAP, MES ni SCADA', origin: 'piloto' },
      { aspect: 'Disparo por alarma', demo: 'Al abrir la alarma de C-07', pilot: 'Webhook desde Galileo/SCADA o consulta periódica (cron): Agentic Platform no tiene planificador propio de agentes', origin: 'piloto' },
      { aspect: 'Modelo de lenguaje', demo: 'Ninguna llamada: las respuestas están preparadas', pilot: 'El que elija Empresa de Congelados (Azure OpenAI, Gemini o local), a través de la pasarela de Agentic Platform', origin: 'serie' },
      { aspect: 'Aprobación humana', demo: 'Tarjetas de aprobación; rechazar no aplica nada', pilot: 'Igual, con SSO y permisos por rol. En el piloto no se escribe en SAP: borradores y tickets que aprueba una persona', origin: 'serie' },
      { aspect: 'Procedimientos con citas', demo: '5 documentos sintéticos (PNT-CAL-012, PNT-CAL-015, PNT-CAL-020, PNT-CAL-031 e IT-MAN-DP-02)', pilot: 'Sus procedimientos vigentes, con permisos por realm; objetivo ≥90 % de citas correctas', origin: 'serie' },
      { aspect: 'Registro de auditoría', demo: 'De esta sesión, guardado en el navegador y exportable a JSON o CSV', pilot: 'En la base de datos de Agentic Platform, de solo añadir, con la identidad SSO de cada persona; exportable a CSV', origin: 'serie' },
      { aspect: 'Coste por petición', demo: 'Estimación mostrada al final de las ejecuciones', pilot: 'Medido por petición en USD, por realm y por caso, con presupuesto diario y mensual', origin: 'serie' },
      { aspect: 'Datos y acciones', demo: 'Sintéticos y coherentes entre sí, preparados por MFM; las acciones no salen del navegador', pilot: 'Sus datos en modo lectura y 20–30 casos históricos, anonimizados si hace falta', origin: 'datos' }
    ],
    writes: 'Ninguna en SAP durante el piloto: borradores y tickets que aprueba una persona',
    cases: {
      A: {
        label: 'Caso A', short: 'Caso A · Reclamación de cliente', title: 'Reclamación de cliente: NC, 8D y respuesta',
        systems: ['Elara', 'SAP', 'MES Mapex'], systemsText: 'Elara y SAP/MES Mapex',
        trigger: 'Correo entrante en el buzón de Calidad (Outlook)',
        output: 'Ficha de la reclamación, traza del lote, borrador de NC y 8D y respuesta en el idioma del cliente, para aprobar',
        scene: 'reclamacion', sceneLabel: 'Reclamación UKC-44718',
        accuracy: '≥90 % de 30 reclamaciones históricas bien extraídas (lote, producto, defecto y plazo)',
        accuracyHow: 'Comparación con el registro de Calidad en Elara'
      },
      B: {
        label: 'Caso B', short: 'Caso B · Excursión de temperatura', title: 'Excursión de temperatura: lotes, bloqueo con aprobación e incidencia',
        systems: ['SCADA Galileo', 'Mecalux Easy WMS'], systemsText: 'temperaturas de Galileo/SCADA y Mecalux Easy WMS',
        trigger: 'Alarma de Galileo/SCADA por webhook o consulta periódica (cron)',
        output: 'Palés y lotes afectados, propuesta de bloqueo para aprobar, borrador de incidencia y aviso en Teams',
        scene: 'alarma', sceneLabel: 'Alarma C-07',
        accuracy: '100 % de palés y lotes afectados identificados en 20 escenarios',
        accuracyHow: 'Comparación con los movimientos de Easy WMS de cada escenario'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Accesos, instalación y línea base', detail: 'Accesos de lectura, instalación y medición del tiempo actual', result: 'Criterios firmados y línea base medida' },
      { from: 3, to: 5, title: 'Conectores, agentes y workflow', detail: 'Pruebas con 20–30 casos históricos', result: 'Exactitud medida con casos históricos' },
      { from: 6, to: 7, title: 'Uso en paralelo', detail: 'Casos reales, con el proceso actual como respaldo', result: 'Aceptación de los borradores por Calidad' },
      { from: 8, to: 8, title: 'Evaluación y decisión', detail: 'Criterios medidos e informe final', result: 'Informe final y decisión' }
    ],
    criteria: [
      { name: 'Tiempo', target: 'Traza y borrador en menos de 15 min', how: 'Cronometrado frente a la línea base de las semanas 1–2' },
      { name: 'Utilidad', target: 'Calidad acepta el borrador con ediciones menores en ≥70 % de los casos', how: 'Revisión de cada borrador por Calidad' },
      { name: 'Citas', target: '≥90 % de 50 preguntas de referencia con la cita correcta', how: 'Herramienta de evaluación incluida en Agentic Platform' },
      { name: 'Control', target: 'Ninguna acción sin aprobación; el 100 % en el registro de auditoría', how: 'Revisión del registro exportado' },
      { name: 'Coste', target: 'Coste del modelo por caso medido y dentro del presupuesto del realm', how: 'Informe de coste por realm (USD, estimación)' }
    ],
    gives: {
      client: ['Responsable en Calidad y contacto de Sistemas', 'Accesos de lectura a 1–2 sistemas', '20–30 casos históricos, anonimizados si hace falta', 'Procedimientos vigentes', '2–3 h a la semana de Calidad'],
      mfm: ['Instalación en su infraestructura', 'Conectores de lectura', 'Agentes y workflow del caso', 'Formación de los usuarios', 'Informe final con los criterios medidos']
    },
    pilot: {
      sub: 'Un caso, una planta (Fustiñana), un realm (Calidad) y 5–10 usuarios, en su infraestructura y con su modelo',
      after: 'Después del piloto: planificación de la recepción en campaña (medible en la campaña de guisante de 2027) o parte diario conectado al historian o al SCADA.',
      nextTitle: 'Siguiente paso: taller de 2 horas con Calidad y Sistemas',
      nextBody: 'Para elegir el caso, confirmar los accesos de lectura y fijar la línea base con la que se medirá el piloto.'
    },
    calc: {
      fteHours: 1720,
      note: 'Horas de trabajo repetitivo que Calidad, los jefes de turno y Mantenimiento pueden dedicar a otras tareas.',
      rows: [
        { id: 'reclamacion', label: 'Reclamación de cliente: NC, 8D y respuesta', who: 'Calidad de planta', scene: 'reclamacion', seen: 'Reclamación UKC-44718', n: 4, before: 180, after: 45, basis: 'Ficha, traza del lote, NC, 8D y respuesta' },
        { id: 'excursion', label: 'Excursión de temperatura: lotes, bloqueo e incidencia', who: 'Calidad de turno', scene: 'alarma', seen: 'Alarma C-07', n: 2, before: 150, after: 15, basis: 'Palés y lotes expuestos, bloqueo e incidencia' },
        { id: 'cuestionario', label: 'Cuestionario o pliego de cliente', who: 'Calidad de planta', scene: 'cuestionario', seen: 'Cuestionario de cliente', n: 6, before: 180, after: 60, basis: 'Con citas de procedimientos, fichas técnicas y certificados' },
        { id: 'traza', label: 'Traza completa o simulacro de retirada', who: 'Calidad de planta', scene: 'retirada', seen: 'Simulacro de retirada', n: 1, before: 180, after: 20, basis: 'Genealogía, balance de masas y clientes' },
        { id: 'consultas', label: 'Consultas a procedimientos', who: 'Calidad y jefes de turno', scene: 'procedimientos', seen: 'Procedimientos', n: 40, before: 10, after: 3, basis: 'Búsqueda en los procedimientos vigentes' },
        { id: 'parte', label: 'Parte diario de equipos', who: 'Mantenimiento y jefes de turno', scene: 'turno', seen: 'Resumen del turno', n: 22, before: 30, after: 10, basis: '1 parte × 22 días' }
      ]
    },
    auditEmpty: 'Genera el parte diario, publica un workflow o aprueba un bloqueo: cada paso aparecerá aquí con su hora, su actor y su vista.',
    auditPilot: 'El registro vive en la base de datos de Agentic Platform, identifica a cada persona por su SSO, se filtra por persona, acción y fecha y se exporta a CSV. En esta demo vive en este navegador y se borra con «Reiniciar demo».',
    proposal: {
      code: 'PIL-FUS-2026-01',
      filename: 'propuesta-piloto-agentic-fustinana',
      objective: 'Medir, con un caso real y criterios firmados, cuánto tiempo de Calidad libera Agentic Platform y con qué exactitud, sin cambiar SAP, MES Mapex, Siemens Opcenter APS, Mecalux Easy WMS, Galileo/SCADA ni Elara. Agentic Platform lee de esos sistemas, razona con los procedimientos y propone; una persona aprueba antes de escribir.',
      extraArch: [['Enmascarado', 'Datos personales enmascarados antes del modelo; los formatos DNI, NIE e IBAN se añaden en el piloto']],
      compliance: [
        ['IFS Food v8 · BRCGS · FSSC 22000', 'Agentic Platform prepara trazas, simulacros de retirada, NC y 8D que firma Calidad; el sistema de gestión certificado de Fustiñana no cambia'],
        ['APPCC', 'Los puntos de control crítico (detectores de metales, temperaturas de cámara) siguen en sus equipos y registros; Agentic Platform los lee y avisa'],
        ['Liberación de producto', 'La decide el Responsable de Calidad (PNT-CAL-015); Galileo/SCADA solo se lee y no se toca el control de planta'],
        ['RGPD', 'MFM como encargado del tratamiento; la pasarela enmascara datos personales antes del modelo']
      ],
      signatures: [{ role: 'quality_plant', note: 'Conforme con el alcance y los criterios' }, { role: 'Sistemas · Empresa de Congelados', note: 'Conforme con los accesos y el despliegue' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform no sustituye nada: va encima de SAP, Mapex, Opcenter, Easy WMS, Galileo y Elara. Lee, razona con vuestros procedimientos y propone; antes de escribir en un sistema, aprueba una persona.',
        'Se instala en vuestra infraestructura, con vuestro SSO de Microsoft Entra ID y el modelo que elijáis. Con un modelo local, la inferencia queda en su red; Sistemas valida los demás flujos.',
        'Las líneas discontinuas en ámbar son las únicas escrituras, y siempre tras aprobación. Galileo/SCADA solo se lee: no se toca el control de planta.'
      ],
      piloto: [
        'Lo honesto: los datos de hoy son sintéticos y la demo no llama a ningún modelo. De serie en Agentic Platform: Routines, aprobación humana, auditoría, respuestas con citas y coste por petición.',
        'Construido para esta demo: el generador de workflows y los agentes de Empresa de Congelados. Los conectores de SAP, Mapex o SCADA no existen de serie: se construyen en el piloto, en modo lectura.',
        'Piloto de 6–8 semanas: un caso, Fustiñana, realm de Calidad, 5–10 usuarios. Los criterios de aceptación se firman en la semana 1 y se miden en la 8.'
      ],
      horas: [
        'Preguntad cuántas reclamaciones, cuestionarios o alarmas tienen al mes y escribidlo: la calculadora es suya.',
        '«Con Agentic Platform» incluye la revisión y la aprobación de una persona. Son horas de trabajo repetitivo que Calidad puede dedicar a otras tareas.',
        'Son supuestos para conversar: la línea base real se mide en las semanas 1–2 del piloto.'
      ],
      registro: [
        'Todo lo que hemos hecho hoy está aquí: {n}, de personas y de agentes, con hora, actor y vista.',
        'Filtrad por «Decisiones»: cada aprobación y cada rechazo, con su motivo. Nada se edita ni se borra desde la consola; se exporta a JSON o CSV.',
        'Cierre: proponemos un taller de 2 horas con Calidad y Sistemas para elegir el caso y fijar la línea base.'
      ],
      next: {
        arquitectura: 'Pulsar «Modelo local» para enseñar que el modelo entra en su red; después, pestaña «Demo y piloto».',
        piloto: 'Elegir con ellos el caso A o B y abrir la pestaña «Calculadora de horas».',
        horas: 'Escribir sus casos al mes y abrir «Registro de auditoría» para cerrar.',
        registro: 'Pulsar «Descargar propuesta de piloto (PDF)» y proponer fecha para el taller de 2 horas.'
      }
    },
    tour: [
      'Agentic Platform va encima de SAP, Mapex, Opcenter, Easy WMS, Galileo y Elara: lee, prepara propuestas y una persona aprueba antes de escribir.',
      'Con un modelo local, la inferencia entra en su infraestructura; los demás flujos se validan con Sistemas.',
      'Los casos de hoy, de la alarma de C-07 a la reclamación UKC-44718, y qué es de serie en Agentic Platform, qué se ha construido para esta demo y qué se construye en el piloto.',
      'Piloto de 6–8 semanas: un caso, Fustiñana, realm de Calidad y criterios de aceptación firmados en la semana 1.',
      'Horas liberadas con supuestos editables; la línea base real se mide en el piloto.',
      'Todo lo hecho en la sesión queda en el registro de auditoría: decisiones humanas, pasos de los agentes y exportación.'
    ]
  }
});
