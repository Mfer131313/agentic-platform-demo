/* Autopista Multimotor · «Cómo encaja Agentic Platform»: arquitectura, demo frente a piloto, calculadora de horas,
 * preguntas de Sistemas y registro de auditoría. Escenario de la demo con datos sintéticos (MFM). */
agenticPack('autopista', {
  plataforma: {
    nav: 'Cómo encaja en APM',
    title: 'Cómo encaja en Autopista Multimotor',
    actor: 'decider',
    site: { kind: 'Hub', name: 'Madrid (Marqués de Soria)', realm: 'Operaciones' },
    pageMeta: [
      { icon: 'building', text: 'Hub de operaciones de Madrid' },
      { icon: 'server', text: 'Instalación en su infraestructura' },
      { icon: 'user-check', text: 'Aprobación humana antes de escribir' }
    ],
    kpis: [
      { label: 'Piloto propuesto', value: '6–8', unit: 'semanas', sub: '1 caso · Hub de Madrid · realm de Operaciones', icon: 'calendar' },
      { label: 'Sistemas conectados en el piloto', value: '1–2', unit: 'solo lectura', sub: 'Por API o réplica de base de datos', icon: 'database' },
      { label: 'Usuarios del piloto', value: '5–10', sub: 'SSO con Google Workspace', icon: 'users' }
    ],
    arch: {
      title: 'Arquitectura de referencia en el hub de Madrid',
      sso: 'Acceso con SSO · Google Workspace',
      ssoShort: 'SSO de Google Workspace',
      console: 'Consola web y avisos en Slack',
      consoleShort: 'Consola web y Slack'
    },
    deploy: {
      cpd: { seg: 'CPD propio', label: 'CPD propio · máquina virtual con Docker Compose', zone: 'CPD de Autopista Multimotor · VM con Docker Compose', text: 'Una máquina virtual en su CPD con Docker Compose: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'Clúster Kubernetes de Autopista Multimotor · Helm', text: 'Despliegue con Helm en su clúster Kubernetes: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      cloud: { seg: 'Nube propia', label: 'Nube de Autopista Multimotor (Azure, AWS o GCP)', zone: 'Suscripción en la nube de Autopista Multimotor (Azure, AWS o GCP)', text: 'La misma instalación en su suscripción de nube, en la región que elijan.' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'Región UE, con el contrato de Autopista Multimotor', exit: 'Sale de su red solo el texto de cada petición', note: 'Conexión por la pasarela LiteLLM de Agentic Platform; se confirma en las semanas 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'Con la cuenta y la región que contrate Autopista Multimotor', exit: 'Sale de su red solo el texto de cada petición', note: 'Proveedor incluido de serie en el catálogo de modelos de Agentic Platform.' },
      local: { seg: 'Modelo local', name: 'Modelo local', local: true, place: 'Servidor con GPU en su CPD (Ollama, LM Studio o llama.cpp)', exit: 'La inferencia se ejecuta dentro de su red', note: 'La calidad y la velocidad se dimensionan con su servidor. Sistemas revisa también los flujos de conectores y telemetría.' }
    },
    people: ['decider', 'sales_shift', 'rental_shift', 'subscription_shift', 'workshop_shift', 'finance'],
    peopleShort: ['Responsable de operaciones', 'Jefe de turno de ventas', 'Flota de alquiler', 'Suscripciones', 'Jefe de taller', 'Finanzas'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Editor visual, versiones y prueba en seco' },
      { icon: 'cpu', title: 'Agentes de operaciones', text: 'Stock, flota, taller, financiación, recalls, reclamaciones y parte de turno', agents: true },
      { icon: 'user-check', title: 'Aprobación humana', text: 'Nada se escribe en un sistema sin su responsable', approval: true },
      { icon: 'book-open', title: 'Procedimientos con citas', text: 'Cada respuesta enlaza su fuente; sin fuente, lo dice' },
      { icon: 'history', title: 'Registro de auditoría', text: 'De solo añadir y exportable' },
      { icon: 'key', title: 'Permisos por rol y realm', text: 'Cada línea de negocio ve lo suyo' },
      { icon: 'gauge', title: 'Coste por petición', text: 'Estimación en USD y presupuesto por realm' },
      { icon: 'shield', title: 'Pasarela de modelos', text: 'Enmascara datos personales antes del modelo', gateway: true }
    ],
    tiles: [
      { name: 'Salesforce CRM', icon: 'users', text: 'Lee clientes, oportunidades y reclamaciones. Prepara ofertas y respuestas para aprobar.', write: true },
      { name: 'SAP ERP', icon: 'database', text: 'Lee pedidos, contratos y facturas. Propone reservas de stock y pedidos a fábrica.', write: true },
      { name: 'Odoo Inventory', icon: 'warehouse', text: 'Lee stock de vehículos y la flota de alquiler por unidad.', write: false },
      { name: 'iCare Taller', icon: 'wrench', text: 'Lee órdenes, cargas y capacidad. Propone reprogramar citas de taller.', write: true },
      { name: 'Stripe Pagos', icon: 'euro', text: 'Lee cobros, cuotas de suscripción e impagos.', write: false },
      { name: 'Twilio SMS', icon: 'message-square', text: 'Prepara SMS a clientes. El envío se aprueba.', write: true },
      { name: 'DocuSign e-firma', icon: 'file-text', text: 'Lee el estado de las firmas. Prepara borradores de contrato para aprobar.', write: true }
    ],
    decisions: {
      deploy: ['No depende de servicios de MFM en la nube. Lo opera su equipo de Sistemas o un servicio gestionado.'],
      llm: 'Se cambia de modelo por configuración, sin tocar los workflows; también admite OpenAI o AWS Bedrock en la UE.',
      access: [
        'SSO con Google Workspace (OIDC) o SAML 2.0. Permisos por rol y por realm: el realm «Operaciones · Madrid» solo ve sus procedimientos y sus datos.',
        'La pasarela enmascara datos personales antes de llamar al modelo; los formatos DNI, NIE e IBAN se añaden en el piloto.'
      ],
      hitl: 'Reservar stock en SAP, reprogramar el taller en iCare, enviar un SMS o un contrato al cliente requiere la aprobación de su responsable. Rechazar no aplica nada y queda registrado con el motivo.',
      cost: 'El presupuesto por realm permite separar el gasto de cada línea de negocio (Venta, Alquiler, Suscripción y Taller).',
      limits: [
        'No sustituye Salesforce, SAP, Odoo Inventory, iCare Taller, Stripe, Twilio ni DocuSign.',
        'No mueve dinero: Stripe solo se lee y los cobros siguen como hoy.',
        'No decide la financiación ni las condiciones de un contrato: lo decide el responsable de Finanzas.',
        'No asigna tareas ni evalúa a personas: trabaja con vehículos, pedidos y documentos.'
      ]
    },
    faqTitle: 'Preguntas habituales de Sistemas',
    faqSub: 'Respuestas cortas para la conversación con el equipo técnico',
    faq: [
      { topic: 'Integración', q: '¿Dónde se instala?', a: 'En una máquina virtual de su CPD con Docker Compose o en Kubernetes con Helm, o en su suscripción de nube. No depende de servicios de MFM en la nube.' },
      { topic: 'Seguridad', q: '¿Cómo entran los usuarios?', a: 'Con SSO de Google Workspace (OIDC) o SAML 2.0. Los permisos van por rol y por realm (línea de negocio o departamento).' },
      { topic: 'Datos', q: '¿Qué datos salen de nuestra red?', a: 'Con un modelo local, la inferencia se ejecuta en su red. Con uno externo, se revisa el contenido enviado y el contrato. Los flujos de conectores, telemetría y enmascarado se validan con Sistemas.' },
      { topic: 'Integración', q: '¿Hay conectores de Salesforce, SAP u Odoo?', a: 'No de serie. En el piloto se construyen para 1–2 sistemas, por API o réplica de base de datos de solo lectura; la lectura de bases de datos Postgres ya funciona.' },
      { topic: 'Escala', q: '¿Cuántos usuarios soporta?', a: 'La concurrencia se dimensiona y se verifica con pruebas de carga. Cada realm tiene límites de peticiones por minuto, de tokens al día y de presupuesto.' },
      { topic: 'Idioma', q: '¿En qué idioma trabaja?', a: 'El chat y los agentes, en español; las respuestas al cliente, en su idioma. La consola de administración de Agentic Platform está en inglés.' },
      { topic: 'Coste', q: '¿Licencia y precio?', a: 'Se concretan en la propuesta comercial (SOW).' }
    ],
    seen: [
      { scene: 'turno', label: 'Resumen del turno', icon: 'activity', title: 'Resumen del turno de mañana en Madrid', text: 'Stock crítico de BMW X3, taller con un técnico de VW de baja, 8 entregas programadas, 23 órdenes de taller en cola y el parte de turno con las lecturas de las 07:30; el agente prepara el resumen y lo deja para revisar.', agents: ['Parte de turno'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'De palabras a workflow', icon: 'workflow', title: 'Consulta de cliente → workflow de venta', text: 'La petición de José María López (un Seat Ibiza automático con 20.000 EUR de entrada) recorre captura, búsqueda de stock, financiación con Banco Sabadell, contrato en DocuSign y entrega, con aprobación y prueba en seco.', agents: ['Generador de workflows'], approver: 'sales_shift' },
      { scene: 'alarma', label: 'Alarma de stock y taller', icon: 'alert-triangle', title: 'Stock crítico de BMW X3 y taller sin técnico de VW', text: 'Una sola unidad de BMW X3 con cliente en espera y recepción el 14/10/2026, y el taller al 70 % de capacidad: propuesta de reserva y de reprogramación de citas para aprobar.', agents: ['Monitor de stock', 'Taller y capacidad', 'Trazabilidad de vehículos'], approver: 'decider', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Disputa de TAE', icon: 'mail', title: 'Disputa de TAE: 3,99 % frente a 4,25 %', text: 'Un cliente reclama porque el contrato de financiación con Banco Sabadell dice 3,99 % y la factura 4,25 %: contrato, historial, borrador de respuesta y propuesta de abono para aprobar.', agents: ['Reclamaciones de cliente', 'Trazabilidad de vehículos'], approver: 'finance', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Recall VW Golf (ABS)', icon: 'git-branch', title: 'Recall del módulo ABS del VW Golf', text: 'La campaña REC-VW-2026-001 afecta a 47 unidades de la flota: 12 ya revisadas y 35 pendientes antes del 15/11/2026, con trazabilidad por VIN (por ejemplo, VIN-2026-MAD-SEAT-03 en el hub), clientes y citas de taller.', agents: ['Trazabilidad de vehículos', 'Recalls'], approver: 'workshop_shift', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Cuestionario de cliente', icon: 'list-checks', title: 'Cuestionario de cliente respondido con citas', text: 'Las preguntas de un cliente, respondidas en su idioma con citas de procedimientos, contratos y fichas; las que no tienen evidencia quedan para el responsable.', agents: ['Cuestionarios de cliente'], approver: 'decider', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedimientos', icon: 'book-open', title: 'Preguntas con citas', text: 'Venta directa, alquiler, suscripción de 6 meses y taller de marca: cada respuesta enlaza el apartado vigente (PROC-VENTA-001, PROC-ALQUILER-001, PROC-SUSCRIPCION-001 y PROC-TALLER-001) y, si no hay fuente, lo dice.', agents: ['Procedimientos'] }
    ],
    honesty: [
      { aspect: 'Consola, workflows (Routines) y editor', demo: 'Esta consola, en el navegador, con los workflows publicados en la sesión', pilot: 'Agentic Platform instalado en su infraestructura; Routines con editor visual, versiones y prueba en seco', origin: 'serie' },
      { aspect: 'Workflow a partir de un procedimiento escrito', demo: 'Generador simulado en el navegador, con tres plantillas', pilot: 'Se integra en Agentic Platform y se valida con sus procedimientos; cada workflow se revisa antes de publicarlo', origin: 'demo' },
      { aspect: 'Agentes de Autopista Multimotor', demo: 'Stock, taller, trazabilidad de vehículos, recalls, reclamaciones y parte de turno, sobre datos sintéticos', pilot: 'Los del caso elegido, adaptados a sus datos y procedimientos', origin: 'demo' },
      { aspect: 'Conectores (Salesforce, SAP, Odoo Inventory, iCare Taller, Stripe, Twilio y DocuSign)', demo: 'Simulados en el navegador', pilot: 'Lectura de 1–2 sistemas por API o réplica de base de datos de solo lectura. No hay conectores de serie para Salesforce, SAP ni iCare', origin: 'piloto' },
      { aspect: 'Disparo por alarma', demo: 'Al abrir la alarma de stock de BMW X3', pilot: 'Webhook desde Odoo o iCare, o consulta periódica (cron): Agentic Platform no tiene planificador propio de agentes', origin: 'piloto' },
      { aspect: 'Modelo de lenguaje', demo: 'Ninguna llamada: las respuestas están preparadas', pilot: 'El que elija Autopista Multimotor (Azure OpenAI, Gemini o local), a través de la pasarela de Agentic Platform', origin: 'serie' },
      { aspect: 'Aprobación humana', demo: 'Tarjetas de aprobación; rechazar no aplica nada', pilot: 'Igual, con SSO y permisos por rol. En el piloto no se escribe en SAP: borradores y tickets que aprueba una persona', origin: 'serie' },
      { aspect: 'Procedimientos con citas', demo: '4 documentos sintéticos (PROC-VENTA-001, PROC-ALQUILER-001, PROC-SUSCRIPCION-001 y PROC-TALLER-001)', pilot: 'Sus procedimientos vigentes, con permisos por realm; objetivo ≥90 % de citas correctas', origin: 'serie' },
      { aspect: 'Registro de auditoría', demo: 'De esta sesión, guardado en el navegador y exportable a JSON o CSV', pilot: 'En la base de datos de Agentic Platform, de solo añadir, con la identidad SSO de cada persona; exportable a CSV', origin: 'serie' },
      { aspect: 'Coste por petición', demo: 'Estimación mostrada al final de las ejecuciones', pilot: 'Medido por petición en USD, por realm y por caso, con presupuesto diario y mensual', origin: 'serie' },
      { aspect: 'Datos y acciones', demo: 'Sintéticos y coherentes entre sí, preparados por MFM; las acciones no salen del navegador', pilot: 'Sus datos en modo lectura y 20–30 casos históricos, anonimizados si hace falta', origin: 'datos' }
    ],
    writes: 'Ninguna en SAP durante el piloto: borradores y tickets que aprueba una persona',
    cases: {
      A: {
        label: 'Caso A', short: 'Caso A · Reclamación de cliente', title: 'Reclamación de cliente: contrato, TAE y respuesta',
        systems: ['Salesforce CRM', 'SAP ERP', 'Odoo Inventory'], systemsText: 'Salesforce CRM y SAP ERP',
        trigger: 'Correo entrante en el buzón de Atención al cliente (Gmail)',
        output: 'Ficha de la reclamación, contrato y factura cotejados, borrador de respuesta y propuesta de abono, para aprobar',
        scene: 'reclamacion', sceneLabel: 'Disputa de TAE',
        accuracy: '≥90 % de 30 reclamaciones históricas bien extraídas (vehículo, contrato, importe y plazo)',
        accuracyHow: 'Comparación con el registro de Atención al cliente en Salesforce'
      },
      B: {
        label: 'Caso B', short: 'Caso B · Stock crítico y taller', title: 'Stock crítico y taller saturado: reserva, reprogramación y aviso',
        systems: ['Odoo Inventory', 'iCare Taller'], systemsText: 'stock de Odoo Inventory y cargas de iCare Taller',
        trigger: 'Alerta de Odoo o iCare por webhook o consulta periódica (cron)',
        output: 'Unidades y citas afectadas, propuesta de reserva y reprogramación para aprobar, borrador de SMS y aviso en Slack',
        scene: 'alarma', sceneLabel: 'Alarma de stock y taller',
        accuracy: '100 % de unidades y citas afectadas identificadas en 20 escenarios',
        accuracyHow: 'Comparación con los movimientos de Odoo y las órdenes de iCare de cada escenario'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Accesos, instalación y línea base', detail: 'Accesos de lectura, instalación y medición del tiempo actual', result: 'Criterios firmados y línea base medida' },
      { from: 3, to: 5, title: 'Conectores, agentes y workflow', detail: 'Pruebas con 20–30 casos históricos', result: 'Exactitud medida con casos históricos' },
      { from: 6, to: 7, title: 'Uso en paralelo', detail: 'Casos reales, con el proceso actual como respaldo', result: 'Aceptación de los borradores por Operaciones' },
      { from: 8, to: 8, title: 'Evaluación y decisión', detail: 'Criterios medidos e informe final', result: 'Informe final y decisión' }
    ],
    criteria: [
      { name: 'Tiempo', target: 'Respuesta y borrador en menos de 15 min', how: 'Cronometrado frente a la línea base de las semanas 1–2' },
      { name: 'Utilidad', target: 'Operaciones acepta el borrador con ediciones menores en ≥70 % de los casos', how: 'Revisión de cada borrador por Operaciones' },
      { name: 'Citas', target: '≥90 % de 50 preguntas de referencia con la cita correcta', how: 'Herramienta de evaluación incluida en Agentic Platform' },
      { name: 'Control', target: 'Ninguna acción sin aprobación; el 100 % en el registro de auditoría', how: 'Revisión del registro exportado' },
      { name: 'Coste', target: 'Coste del modelo por caso medido y dentro del presupuesto del realm', how: 'Informe de coste por realm (USD, estimación)' }
    ],
    gives: {
      client: ['Responsable en Operaciones y contacto de Sistemas', 'Accesos de lectura a 1–2 sistemas', '20–30 casos históricos, anonimizados si hace falta', 'Procedimientos vigentes', '2–3 h a la semana de Operaciones'],
      mfm: ['Instalación en su infraestructura', 'Conectores de lectura', 'Agentes y workflow del caso', 'Formación de los usuarios', 'Informe final con los criterios medidos']
    },
    pilot: {
      sub: 'Un caso, un hub (Madrid), un realm (Operaciones) y 5–10 usuarios, en su infraestructura y con su modelo',
      after: 'Después del piloto: seguimiento de los recalls de marca sobre toda la flota (medible en la campaña del VW Golf de noviembre) o planificación del taller conectada a iCare.',
      nextTitle: 'Siguiente paso: taller de 2 horas con Operaciones y Sistemas',
      nextBody: 'Para elegir el caso, confirmar los accesos de lectura y fijar la línea base con la que se medirá el piloto.'
    },
    calc: {
      fteHours: 1720,
      note: 'Horas de trabajo repetitivo que Operaciones, los jefes de turno y el taller pueden dedicar a otras tareas.',
      rows: [
        { id: 'reclamacion', label: 'Reclamación de cliente: contrato, TAE y respuesta', who: 'Atención al cliente y Finanzas', scene: 'reclamacion', seen: 'Disputa de TAE', n: 12, before: 120, after: 30, basis: 'Ficha, contrato, factura, respuesta y propuesta de abono' },
        { id: 'excursion', label: 'Stock crítico y taller saturado: reserva y reprogramación', who: 'Responsable de operaciones', scene: 'alarma', seen: 'Alarma de stock y taller', n: 8, before: 90, after: 15, basis: 'Unidades, citas afectadas, reserva y aviso' },
        { id: 'cuestionario', label: 'Cuestionario o pliego de cliente', who: 'Operaciones', scene: 'cuestionario', seen: 'Cuestionario de cliente', n: 6, before: 150, after: 50, basis: 'Con citas de procedimientos, contratos y fichas' },
        { id: 'traza', label: 'Traza de vehículo o campaña de recall', who: 'Jefe de taller', scene: 'retirada', seen: 'Recall VW Golf (ABS)', n: 3, before: 180, after: 30, basis: 'Unidades por VIN, estado de revisión y citas' },
        { id: 'consultas', label: 'Consultas a procedimientos', who: 'Ventas, alquiler, suscripciones y taller', scene: 'procedimientos', seen: 'Procedimientos', n: 60, before: 10, after: 3, basis: 'Búsqueda en los procedimientos vigentes' },
        { id: 'parte', label: 'Parte de turno', who: 'Responsable de operaciones', scene: 'turno', seen: 'Resumen del turno', n: 22, before: 30, after: 10, basis: '1 parte × 22 días' }
      ]
    },
    auditEmpty: 'Genera el parte de turno, publica un workflow o aprueba una reserva: cada paso aparecerá aquí con su hora, su actor y su vista.',
    auditPilot: 'El registro vive en la base de datos de Agentic Platform, identifica a cada persona por su SSO, se filtra por persona, acción y fecha y se exporta a CSV. En esta demo vive en este navegador y se borra con «Reiniciar demo».',
    proposal: {
      code: 'PIL-APM-2026-01',
      filename: 'propuesta-piloto-agentic-autopista',
      objective: 'Medir, con un caso real y criterios firmados, cuánto tiempo de Operaciones libera Agentic Platform y con qué exactitud, sin cambiar Salesforce, SAP, Odoo Inventory, iCare Taller, Stripe, Twilio ni DocuSign. Agentic Platform lee de esos sistemas, razona con los procedimientos y propone; una persona aprueba antes de escribir.',
      extraArch: [['Enmascarado', 'Datos personales enmascarados antes del modelo; los formatos DNI, NIE e IBAN se añaden en el piloto']],
      compliance: [
        ['Crédito al consumo y TAE', 'Agentic Platform coteja contrato y factura y prepara la respuesta; la decisión sobre la financiación con Banco Sabadell la toma Finanzas'],
        ['Campañas de retirada del fabricante', 'Los recalls (VW, BMW, Audi y Skoda) siguen en los canales de cada marca; Agentic Platform cruza los VIN de la flota, lee y avisa'],
        ['Decisión comercial', 'Reservas, abonos y contratos los aprueba el responsable; Stripe y SAP solo se leen en el piloto'],
        ['RGPD', 'MFM como encargado del tratamiento; la pasarela enmascara datos personales antes del modelo']
      ],
      signatures: [{ role: 'decider', note: 'Conforme con el alcance y los criterios' }, { role: 'Sistemas · Autopista Multimotor', note: 'Conforme con los accesos y el despliegue' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform no sustituye nada: va encima de Salesforce, SAP, Odoo, iCare, Stripe, Twilio y DocuSign. Lee, razona con vuestros procedimientos y propone; antes de escribir en un sistema, aprueba una persona.',
        'Se instala en vuestra infraestructura, con vuestro SSO de Google Workspace y el modelo que elijáis. Con un modelo local, la inferencia queda en su red; Sistemas valida los demás flujos.',
        'Las líneas discontinuas en ámbar son las únicas escrituras, y siempre tras aprobación. Stripe solo se lee: no se mueve dinero.'
      ],
      piloto: [
        'Lo honesto: los datos de hoy son sintéticos y la demo no llama a ningún modelo. De serie en Agentic Platform: Routines, aprobación humana, auditoría, respuestas con citas y coste por petición.',
        'Construido para esta demo: el generador de workflows y los agentes de Autopista Multimotor. Los conectores de Salesforce, SAP o iCare no existen de serie: se construyen en el piloto, en modo lectura.',
        'Piloto de 6–8 semanas: un caso, el hub de Madrid, realm de Operaciones, 5–10 usuarios. Los criterios de aceptación se firman en la semana 1 y se miden en la 8.'
      ],
      horas: [
        'Preguntad cuántas reclamaciones, cuestionarios o alertas de stock tienen al mes y escribidlo: la calculadora es suya.',
        '«Con Agentic Platform» incluye la revisión y la aprobación de una persona. Son horas de trabajo repetitivo que Operaciones puede dedicar a otras tareas.',
        'Son supuestos para conversar: la línea base real se mide en las semanas 1–2 del piloto.'
      ],
      registro: [
        'Todo lo que hemos hecho hoy está aquí: {n}, de personas y de agentes, con hora, actor y vista.',
        'Filtrad por «Decisiones»: cada aprobación y cada rechazo, con su motivo. Nada se edita ni se borra desde la consola; se exporta a JSON o CSV.',
        'Cierre: proponemos un taller de 2 horas con Operaciones y Sistemas para elegir el caso y fijar la línea base.'
      ],
      next: {
        arquitectura: 'Pulsar «Modelo local» para enseñar que el modelo entra en su red; después, pestaña «Demo y piloto».',
        piloto: 'Elegir con ellos el caso A o B y abrir la pestaña «Calculadora de horas».',
        horas: 'Escribir sus casos al mes y abrir «Registro de auditoría» para cerrar.',
        registro: 'Pulsar «Descargar propuesta de piloto (PDF)» y proponer fecha para el taller de 2 horas.'
      }
    },
    tour: [
      'Agentic Platform va encima de Salesforce, SAP, Odoo, iCare, Stripe, Twilio y DocuSign: lee, prepara propuestas y una persona aprueba antes de escribir.',
      'Con un modelo local, la inferencia entra en su infraestructura; los demás flujos se validan con Sistemas.',
      'Los casos de hoy, de la alarma de stock de BMW X3 a la disputa de TAE y el recall del VW Golf, y qué es de serie en Agentic Platform, qué se ha construido para esta demo y qué se construye en el piloto.',
      'Piloto de 6–8 semanas: un caso, el hub de Madrid, realm de Operaciones y criterios de aceptación firmados en la semana 1.',
      'Horas liberadas con supuestos editables; la línea base real se mide en el piloto.',
      'Todo lo hecho en la sesión queda en el registro de auditoría: decisiones humanas, pasos de los agentes y exportación.'
    ]
  }
});
