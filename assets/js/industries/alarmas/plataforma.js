/* Guardián Ibérica Instalaciones · «Cómo encaja Agentic Platform»: arquitectura, demo frente a piloto, calculadora de horas,
 * preguntas de Sistemas y registro de auditoría. Escenario de la demo con datos sintéticos (MFM). */
agenticPack('alarmas', {
  plataforma: {
    nav: 'Cómo encaja en GII',
    title: 'Cómo encaja en Guardián Ibérica Instalaciones',
    actor: 'decider',
    site: { kind: 'Hub', name: 'Paterna (Valencia)', realm: 'Operaciones' },
    pageMeta: [
      { icon: 'building', text: 'Hub de operaciones de Paterna' },
      { icon: 'server', text: 'Instalación en su infraestructura' },
      { icon: 'user-check', text: 'Aprobación humana antes de escribir' }
    ],
    kpis: [
      { label: 'Piloto propuesto', value: '6–8', unit: 'semanas', sub: '1 caso · Hub de Paterna · realm de Operaciones', icon: 'calendar' },
      { label: 'Sistemas conectados en el piloto', value: '1–2', unit: 'solo lectura', sub: 'Por API o réplica de base de datos', icon: 'database' },
      { label: 'Usuarios del piloto', value: '5–10', sub: 'SSO con Google Workspace', icon: 'users' }
    ],
    arch: {
      title: 'Arquitectura de referencia en el hub de Paterna',
      sso: 'Acceso con SSO · Google Workspace',
      ssoShort: 'SSO de Google Workspace',
      console: 'Consola web y avisos en Slack',
      consoleShort: 'Consola web y Slack'
    },
    deploy: {
      cpd: { seg: 'CPD propio', label: 'CPD propio · máquina virtual con Docker Compose', zone: 'CPD de Guardián Ibérica Instalaciones · VM con Docker Compose', text: 'Una máquina virtual en su CPD con Docker Compose: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'Clúster Kubernetes de Guardián Ibérica Instalaciones · Helm', text: 'Despliegue con Helm en su clúster Kubernetes: aplicación, base de datos Postgres y almacén vectorial Qdrant.' },
      cloud: { seg: 'Nube propia', label: 'Nube de Guardián Ibérica Instalaciones (Azure, AWS o GCP)', zone: 'Suscripción en la nube de Guardián Ibérica Instalaciones (Azure, AWS o GCP)', text: 'La misma instalación en su suscripción de nube, en la región que elijan.' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'Región UE, con el contrato de Guardián Ibérica Instalaciones', exit: 'Sale de su red solo el texto de cada petición', note: 'Conexión por la pasarela LiteLLM de Agentic Platform; se confirma en las semanas 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'Con la cuenta y la región que contrate Guardián Ibérica Instalaciones', exit: 'Sale de su red solo el texto de cada petición', note: 'Proveedor incluido de serie en el catálogo de modelos de Agentic Platform.' },
      local: { seg: 'Modelo local', name: 'Modelo local', local: true, place: 'Servidor con GPU en su CPD (Ollama, LM Studio o llama.cpp)', exit: 'La inferencia se ejecuta dentro de su red', note: 'La calidad y la velocidad se dimensionan con su servidor. Sistemas revisa también los flujos de conectores y telemetría.' }
    },
    people: ['decider', 'install_shift', 'support_shift', 'maintenance_shift', 'warehouse_shift', 'finance'],
    peopleShort: ['Responsable de operaciones', 'Jefe de instalaciones', 'Soporte técnico', 'Jefe de mantenimiento', 'Almacén', 'Finanzas'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Editor visual, versiones y prueba en seco' },
      { icon: 'cpu', title: 'Agentes de operaciones', text: 'Comunicaciones de paneles, mantenimiento, almacén, retiradas, reclamaciones y parte de turno', agents: true },
      { icon: 'user-check', title: 'Aprobación humana', text: 'Nada se escribe en un sistema sin su responsable', approval: true },
      { icon: 'book-open', title: 'Procedimientos con citas', text: 'Cada respuesta enlaza su fuente; sin fuente, lo dice' },
      { icon: 'history', title: 'Registro de auditoría', text: 'De solo añadir y exportable' },
      { icon: 'key', title: 'Permisos por rol y realm', text: 'Cada área y cada marca ve lo suyo' },
      { icon: 'gauge', title: 'Coste por petición', text: 'Estimación en USD y presupuesto por realm' },
      { icon: 'shield', title: 'Pasarela de modelos', text: 'Enmascara datos personales antes del modelo', gateway: true }
    ],
    tiles: [
      { name: 'Salesforce CRM', icon: 'users', text: 'Lee clientes, contratos y reclamaciones. Prepara respuestas y abonos para aprobar.', write: true },
      { name: 'SAP Business One', icon: 'database', text: 'Lee pedidos, facturas y stock de equipos. Propone órdenes de compra y reposición.', write: true },
      { name: 'Verisure Partner Portal', icon: 'shield', text: 'Lee contratos, instalaciones y estado de paneles de la marca. Solo lectura.', write: false },
      { name: 'Sector Alarm Partner Hub', icon: 'shield', text: 'Lee contratos, cargos y estado de paneles de la marca. Solo lectura.', write: false },
      { name: 'Prosegur Partner Portal', icon: 'shield', text: 'Lee contratos, homologación y cuestionarios de la marca. Solo lectura.', write: false },
      { name: 'Samsara Flota', icon: 'truck', text: 'Lee la posición y la disponibilidad de las furgonetas de los técnicos. Solo lectura.', write: false },
      { name: 'Twilio SMS', icon: 'message-square', text: 'Prepara SMS a clientes. El envío se aprueba.', write: true }
    ],
    decisions: {
      deploy: ['No depende de servicios de MFM en la nube. Lo opera su equipo de Sistemas o un servicio gestionado.'],
      llm: 'Se cambia de modelo por configuración, sin tocar los workflows; también admite OpenAI o AWS Bedrock en la UE.',
      access: [
        'SSO con Google Workspace (OIDC) o SAML 2.0. Permisos por rol y por realm: el realm «Operaciones · Paterna» solo ve sus procedimientos y sus datos.',
        'La pasarela enmascara datos personales antes de llamar al modelo; los formatos DNI, NIE e IBAN se añaden en el piloto.'
      ],
      hitl: 'Cambiar una vía de comunicación de un panel, enviar un SMS a un cliente, abonar un cargo o responder a una reclamación requiere la aprobación de su responsable. Rechazar no aplica nada y queda registrado con el motivo.',
      cost: 'El presupuesto por realm permite separar el gasto de cada área (Instalaciones, Mantenimiento, Soporte técnico y Postventa).',
      limits: [
        'No sustituye Salesforce, SAP Business One, los portales de Verisure, Sector Alarm y Prosegur Alarmas, Samsara ni Twilio.',
        'No gestiona paneles ni centrales receptoras de alarmas: las marcas siguen operando su vigilancia.',
        'No decide abonos ni penalizaciones de contrato: lo decide el responsable de Finanzas.',
        'No asigna tareas ni evalúa a personas: trabaja con instalaciones, equipos y documentos.'
      ]
    },
    faqTitle: 'Preguntas habituales de Sistemas',
    faqSub: 'Respuestas cortas para la conversación con el equipo técnico',
    faq: [
      { topic: 'Integración', q: '¿Dónde se instala?', a: 'En una máquina virtual de su CPD con Docker Compose o en Kubernetes con Helm, o en su suscripción de nube. No depende de servicios de MFM en la nube.' },
      { topic: 'Seguridad', q: '¿Cómo entran los usuarios?', a: 'Con SSO de Google Workspace (OIDC) o SAML 2.0. Los permisos van por rol y por realm (área o marca).' },
      { topic: 'Datos', q: '¿Qué datos salen de nuestra red?', a: 'Con un modelo local, la inferencia se ejecuta en su red. Con uno externo, se revisa el contenido enviado y el contrato. Los flujos de conectores, telemetría y enmascarado se validan con Sistemas.' },
      { topic: 'Integración', q: '¿Hay conectores de Salesforce, SAP Business One o los portales de partner?', a: 'No de serie. En el piloto se construyen para 1–2 sistemas, por API o réplica de base de datos de solo lectura; los portales de partner se leen sin escribir en ellos y la lectura de bases de datos Postgres ya funciona.' },
      { topic: 'Seguridad', q: '¿Puede acceder a las cámaras o a los paneles de los clientes?', a: 'No. Solo lee datos de gestión (contratos, órdenes, estado de comunicación). Las imágenes de videoverificación no pasan por Agentic Platform; su tratamiento sigue el procedimiento PR-RGPD-002.' },
      { topic: 'Escala', q: '¿Cuántos usuarios soporta?', a: 'La concurrencia se dimensiona y se verifica con pruebas de carga. Cada realm tiene límites de peticiones por minuto, de tokens al día y de presupuesto.' },
      { topic: 'Idioma', q: '¿En qué idioma trabaja?', a: 'El chat y los agentes, en español; las respuestas al cliente, en su idioma. La consola de administración de Agentic Platform está en inglés.' },
      { topic: 'Coste', q: '¿Licencia y precio?', a: 'Se concretan en la propuesta comercial (SOW).' }
    ],
    seen: [
      { scene: 'turno', label: 'Resumen del turno', icon: 'activity', title: 'Resumen del turno del lunes 19/10/2026 en Paterna', text: '61 instalaciones programadas, 118 mantenimientos y 9 órdenes urgentes (OT-2026-xxxxx) entre Instalaciones, Mantenimiento, Soporte técnico, Postventa, Almacén y Flota; el agente prepara el resumen y lo deja para revisar.', agents: ['Parte de turno'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'De palabras a workflow', icon: 'workflow', title: 'Procedimiento escrito → workflow', text: 'El procedimiento PR-COM-003 (pérdida de comunicación de panel) se convierte en un workflow con detección, conmutación a la vía de respaldo, visita y aviso al cliente, con aprobación y prueba en seco.', agents: ['Generador de workflows'], approver: 'support_shift' },
      { scene: 'alarma', label: 'Caída de comunicación', icon: 'alert-triangle', title: 'Caída 4G de 214 paneles en Valencia Norte (ALM-COM-0611)', text: 'Desde las 05:10, tras un mantenimiento del operador móvil, 214 paneles de Sector Alarm y Verisure pierden la comunicación 4G (pico de 241 a las 05:42): propuesta de conmutación a la vía de respaldo, visita prioritaria a los 38 paneles sin respaldo y SMS por Twilio, para aprobar.', agents: ['Soporte técnico', 'Despacho y mantenimiento', 'Clientes'], approver: 'support_shift', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Falsas alarmas y cargos', icon: 'mail', title: 'Reclamación de Marta Soler Pons (CLM-2026-0619)', text: 'La clienta de Burjassot, con contrato Sector Alarm SA-2026-77412, reclama dos cargos de desplazamiento de vigilante (2 x 39,00 €) por falsas alarmas del 12 y 14/10/2026 y amenaza con la baja con penalización de 180 €: la causa es un sensor PIR del salón con batería baja sin aviso. Borrador de respuesta y propuesta de abono para aprobar.', agents: ['Reclamaciones de cliente', 'Trazabilidad de instalaciones'], approver: 'finance', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Retirada PIR-2607-A', icon: 'git-branch', title: 'Retirada del lote PIR-2607-A (REC-2026-1019)', text: 'El detector PIR-200 de Sentinela Electronics tiene riesgo de sobrecalentamiento de la batería de litio: 2.400 recibidas, 1.386 instaladas en 912 hogares (Verisure 540, Sector Alarm 214, Prosegur Alarmas 158), 960 en almacén y 54 devueltas; objetivo, localizar y avisar en 4 h (PR-QLT-006).', agents: ['Trazabilidad de instalaciones', 'Retiradas de producto'], approver: 'warehouse_shift', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Homologación de Prosegur', icon: 'list-checks', title: 'Cuestionario de homologación de Prosegur Alarmas (HOM-2026-031)', text: 'El cuestionario anual de instaladores partner (habilitación de empresa de seguridad, UNE-EN 50131, certificación de instaladores, RGPD y videoverificación, seguros y subcontratas), respondido con citas; las preguntas sin evidencia quedan para el responsable.', agents: ['Cuestionarios de cliente'], approver: 'compliance', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedimientos', icon: 'book-open', title: 'Preguntas con citas', text: 'Instalación, mantenimiento, falsas alarmas, videoverificación, pérdida de comunicación, baja y retirada de producto: cada respuesta enlaza el apartado vigente (PR-INS-001, PR-MAN-004, PR-SOP-007, PR-RGPD-002, PR-COM-003, PR-BAJ-005 y PR-QLT-006) y, si no hay fuente, lo dice.', agents: ['Procedimientos'] }
    ],
    honesty: [
      { aspect: 'Consola, workflows (Routines) y editor', demo: 'Esta consola, en el navegador, con los workflows publicados en la sesión', pilot: 'Agentic Platform instalado en su infraestructura; Routines con editor visual, versiones y prueba en seco', origin: 'serie' },
      { aspect: 'Workflow a partir de un procedimiento escrito', demo: 'Generador simulado en el navegador, con tres plantillas', pilot: 'Se integra en Agentic Platform y se valida con sus procedimientos; cada workflow se revisa antes de publicarlo', origin: 'demo' },
      { aspect: 'Agentes de Guardián Ibérica Instalaciones', demo: 'Comunicaciones de paneles, mantenimiento, trazabilidad de instalaciones, retiradas, reclamaciones y parte de turno, sobre datos sintéticos', pilot: 'Los del caso elegido, adaptados a sus datos y procedimientos', origin: 'demo' },
      { aspect: 'Conectores (Salesforce, SAP Business One, portales de Verisure, Sector Alarm y Prosegur Alarmas, Samsara y Twilio)', demo: 'Simulados en el navegador', pilot: 'Lectura de 1–2 sistemas por API o réplica de base de datos de solo lectura. No hay conectores de serie para Salesforce, SAP ni los portales de partner', origin: 'piloto' },
      { aspect: 'Disparo por alarma', demo: 'Al abrir la caída de comunicación ALM-COM-0611', pilot: 'Webhook desde el portal de partner o consulta periódica (cron): Agentic Platform no tiene planificador propio de agentes', origin: 'piloto' },
      { aspect: 'Modelo de lenguaje', demo: 'Ninguna llamada: las respuestas están preparadas', pilot: 'El que elija Guardián Ibérica Instalaciones (Azure OpenAI, Gemini o local), a través de la pasarela de Agentic Platform', origin: 'serie' },
      { aspect: 'Aprobación humana', demo: 'Tarjetas de aprobación; rechazar no aplica nada', pilot: 'Igual, con SSO y permisos por rol. En el piloto no se escribe en SAP ni en los portales: borradores y tickets que aprueba una persona', origin: 'serie' },
      { aspect: 'Procedimientos con citas', demo: '7 documentos sintéticos (PR-INS-001, PR-MAN-004, PR-SOP-007, PR-RGPD-002, PR-COM-003, PR-BAJ-005 y PR-QLT-006)', pilot: 'Sus procedimientos vigentes, con permisos por realm; objetivo ≥90 % de citas correctas', origin: 'serie' },
      { aspect: 'Registro de auditoría', demo: 'De esta sesión, guardado en el navegador y exportable a JSON o CSV', pilot: 'En la base de datos de Agentic Platform, de solo añadir, con la identidad SSO de cada persona; exportable a CSV', origin: 'serie' },
      { aspect: 'Coste por petición', demo: 'Estimación mostrada al final de las ejecuciones', pilot: 'Medido por petición en USD, por realm y por caso, con presupuesto diario y mensual', origin: 'serie' },
      { aspect: 'Datos y acciones', demo: 'Sintéticos y coherentes entre sí, preparados por MFM; las acciones no salen del navegador', pilot: 'Sus datos en modo lectura y 20–30 casos históricos, anonimizados si hace falta', origin: 'datos' }
    ],
    writes: 'Ninguna en SAP ni en los portales de partner durante el piloto: borradores y tickets que aprueba una persona',
    cases: {
      A: {
        label: 'Caso A', short: 'Caso A · Reclamación de cliente', title: 'Reclamación de cliente: contrato, cargos y respuesta',
        systems: ['Salesforce CRM', 'SAP Business One', 'Sector Alarm Partner Hub'], systemsText: 'Salesforce CRM y SAP Business One',
        trigger: 'Correo entrante en el buzón de Atención al cliente (Gmail)',
        output: 'Ficha de la reclamación, contrato y cargos cotejados, borrador de respuesta y propuesta de abono, para aprobar',
        scene: 'reclamacion', sceneLabel: 'Falsas alarmas y cargos',
        accuracy: '≥90 % de 30 reclamaciones históricas bien extraídas (contrato, equipo, importe y plazo)',
        accuracyHow: 'Comparación con el registro de Atención al cliente en Salesforce'
      },
      B: {
        label: 'Caso B', short: 'Caso B · Caída de comunicación de paneles', title: 'Caída de comunicación de paneles: conmutación, visitas y aviso',
        systems: ['Verisure Partner Portal', 'Sector Alarm Partner Hub', 'Samsara Flota'], systemsText: 'estado de paneles de los portales de partner y disponibilidad de Samsara Flota',
        trigger: 'Alerta del portal de partner por webhook o consulta periódica (cron)',
        output: 'Paneles afectados y sin respaldo, propuesta de conmutación y de visitas prioritarias para aprobar, borrador de SMS y aviso en Slack',
        scene: 'alarma', sceneLabel: 'Caída de comunicación',
        accuracy: '100 % de paneles afectados y sin respaldo identificados en 20 escenarios',
        accuracyHow: 'Comparación con el estado de paneles de los portales y las órdenes de trabajo de cada escenario'
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
      sub: 'Un caso, un hub (Paterna), un realm (Operaciones) y 5–10 usuarios, en su infraestructura y con su modelo',
      after: 'Después del piloto: trazabilidad de retiradas de producto sobre toda la cartera (medible en la campaña REC-2026-1019 del lote PIR-2607-A) o respuesta automática a los cuestionarios de homologación de las tres marcas.',
      nextTitle: 'Siguiente paso: taller de 2 horas con Operaciones y Sistemas',
      nextBody: 'Para elegir el caso, confirmar los accesos de lectura y fijar la línea base con la que se medirá el piloto.'
    },
    calc: {
      fteHours: 1720,
      note: 'Horas de trabajo repetitivo que Operaciones, los jefes de turno y Soporte técnico pueden dedicar a otras tareas.',
      rows: [
        { id: 'reclamacion', label: 'Reclamación de cliente: contrato, cargos y respuesta (CLM-2026-0619)', who: 'Atención al cliente y Finanzas', scene: 'reclamacion', seen: 'Falsas alarmas y cargos', n: 12, before: 120, after: 30, basis: 'Ficha, contrato, cargos, respuesta y propuesta de abono' },
        { id: 'excursion', label: 'Caída de comunicación de paneles: conmutación y visitas (ALM-COM-0611)', who: 'Soporte técnico y Mantenimiento', scene: 'alarma', seen: 'Caída de comunicación', n: 8, before: 90, after: 15, basis: 'Paneles afectados, respaldo, visitas y aviso' },
        { id: 'cuestionario', label: 'Cuestionario de homologación de una marca (HOM-2026-031)', who: 'Cumplimiento y Operaciones', scene: 'cuestionario', seen: 'Homologación de Prosegur', n: 6, before: 150, after: 50, basis: 'Con citas de procedimientos, certificados y pólizas' },
        { id: 'traza', label: 'Traza de lote o campaña de retirada (REC-2026-1019)', who: 'Responsable de almacén', scene: 'retirada', seen: 'Retirada PIR-2607-A', n: 3, before: 180, after: 30, basis: 'Unidades por lote, hogares afectados y avisos' },
        { id: 'consultas', label: 'Consultas a procedimientos', who: 'Instalaciones, mantenimiento, soporte y postventa', scene: 'procedimientos', seen: 'Procedimientos', n: 60, before: 10, after: 3, basis: 'Búsqueda en los procedimientos vigentes' },
        { id: 'parte', label: 'Parte de turno', who: 'Responsable de operaciones', scene: 'turno', seen: 'Resumen del turno', n: 22, before: 30, after: 10, basis: '1 parte × 22 días' }
      ]
    },
    auditEmpty: 'Genera el parte de turno, publica un workflow o aprueba una conmutación de respaldo: cada paso aparecerá aquí con su hora, su actor y su vista.',
    auditPilot: 'El registro vive en la base de datos de Agentic Platform, identifica a cada persona por su SSO, se filtra por persona, acción y fecha y se exporta a CSV. En esta demo vive en este navegador y se borra con «Reiniciar demo».',
    proposal: {
      code: 'PIL-GII-2026-01',
      filename: 'propuesta-piloto-agentic-alarmas',
      objective: 'Medir, con un caso real y criterios firmados, cuánto tiempo de Operaciones libera Agentic Platform y con qué exactitud, sin cambiar Salesforce, SAP Business One, los portales de partner de Verisure, Sector Alarm y Prosegur Alarmas, Samsara ni Twilio. Agentic Platform lee de esos sistemas, razona con los procedimientos y propone; una persona aprueba antes de escribir.',
      extraArch: [['Enmascarado', 'Datos personales enmascarados antes del modelo; los formatos DNI, NIE e IBAN se añaden en el piloto']],
      compliance: [
        ['Seguridad privada', 'GII mantiene su habilitación como empresa de seguridad (Ley 5/2014, Orden INT/316/2011); Agentic Platform no vigila ni gestiona alarmas, solo prepara la gestión interna'],
        ['Campañas de retirada del fabricante', 'La retirada del lote PIR-2607-A sigue los canales de Sentinela Electronics y de cada marca; Agentic Platform cruza lotes, hogares y almacén, lee y avisa'],
        ['Decisión comercial', 'Abonos, penalizaciones y respuestas los aprueba el responsable; SAP y los portales de partner solo se leen en el piloto'],
        ['RGPD', 'MFM como encargado del tratamiento; la pasarela enmascara datos personales antes del modelo y la videoverificación sigue PR-RGPD-002']
      ],
      signatures: [{ role: 'decider', note: 'Conforme con el alcance y los criterios' }, { role: 'Sistemas · Guardián Ibérica Instalaciones', note: 'Conforme con los accesos y el despliegue' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform no sustituye nada: va encima de Salesforce, SAP Business One, los portales de Verisure, Sector Alarm y Prosegur Alarmas, Samsara y Twilio. Lee, razona con vuestros procedimientos y propone; antes de escribir en un sistema, aprueba una persona.',
        'Se instala en vuestra infraestructura, con vuestro SSO de Google Workspace y el modelo que elijáis. Con un modelo local, la inferencia queda en su red; Sistemas valida los demás flujos.',
        'Las líneas discontinuas en ámbar son las únicas escrituras, y siempre tras aprobación. Los portales de partner solo se leen: no se toca la vigilancia de las marcas.'
      ],
      piloto: [
        'Lo honesto: los datos de hoy son sintéticos y la demo no llama a ningún modelo. De serie en Agentic Platform: Routines, aprobación humana, auditoría, respuestas con citas y coste por petición.',
        'Construido para esta demo: el generador de workflows y los agentes de Guardián Ibérica Instalaciones. Los conectores de Salesforce, SAP o los portales de partner no existen de serie: se construyen en el piloto, en modo lectura.',
        'Piloto de 6–8 semanas: un caso, el hub de Paterna, realm de Operaciones, 5–10 usuarios. Los criterios de aceptación se firman en la semana 1 y se miden en la 8.'
      ],
      horas: [
        'Preguntad cuántas reclamaciones, cuestionarios de homologación o caídas de comunicación tienen al mes y escribidlo: la calculadora es suya.',
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
      'Agentic Platform va encima de Salesforce, SAP Business One, los portales de partner, Samsara y Twilio: lee, prepara propuestas y una persona aprueba antes de escribir.',
      'Con un modelo local, la inferencia entra en su infraestructura; los demás flujos se validan con Sistemas.',
      'Los casos de hoy, de la caída de 214 paneles (ALM-COM-0611) a la reclamación CLM-2026-0619, la retirada REC-2026-1019 y la homologación HOM-2026-031, y qué es de serie en Agentic Platform, qué se ha construido para esta demo y qué se construye en el piloto.',
      'Piloto de 6–8 semanas: un caso, el hub de Paterna, realm de Operaciones y criterios de aceptación firmados en la semana 1.',
      'Horas liberadas con supuestos editables; la línea base real se mide en el piloto.',
      'Todo lo hecho en la sesión queda en el registro de auditoría: decisiones humanas, pasos de los agentes y exportación.'
    ]
  }
});
