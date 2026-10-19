/* Guardián Ibérica Instalaciones · consulta de procedimientos de Operaciones con citas. Escenario de demostración con datos sintéticos (MFM). */
agenticPack('alarmas', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedimientos',
    title: 'Preguntar a los procedimientos',
    agent: 'Procedimientos',
    system: 'Salesforce Knowledge',
    source: 'Salesforce Knowledge · documentos controlados de Operaciones',
    indexed_at: '2026-10-19T06:00',
    doc_org: 'Guardián Ibérica Instalaciones · Operaciones',
    ui: {
      page_title: 'Consulta de procedimientos de Operaciones',
      intro_title: 'Pregunta sobre los procedimientos del hub de Paterna',
      intro_text: 'Cada frase de la respuesta cita el documento y el apartado de donde sale. Si ningún documento indexado lo recoge, la consulta lo indica y no responde.',
      placeholder: 'Escribe una pregunta sobre los procedimientos de Operaciones',
      context_title: 'Aplicado al hub de Paterna hoy',
      permission: 'Operaciones · Paterna',
      asker_initials: 'RO',
      asker_role: 'Responsable de operaciones',
      route_to: 'Operaciones y Cumplimiento'
    },
    report: { title: 'Consulta de procedimientos de Operaciones', code_prefix: 'CON-PROC', filename: 'consulta-procedimientos', scope_label: 'Sede', scope: 'Paterna (Valencia) · hub de GII' },
    presenter: {
      say: [
        'Consulta de los procedimientos de Operaciones: la respuesta sale solo de los documentos controlados, y cada frase lleva su cita al documento y al apartado.',
        'Hay siete documentos indexados: instalación y puesta en marcha, mantenimiento preventivo, falsas alarmas, videoverificación y datos personales, pérdida de comunicación de panel, baja de cliente y retirada de producto. Aquí son sintéticos; en el piloto, los suyos vigentes.'
      ],
      say_empty: 'Sirve para formar a técnicos y operadores nuevos, para preparar las homologaciones de las marcas y para contestar a clientes con la referencia exacta.',
      say_answered: 'Al pulsar una cita se abre el documento con el pasaje exacto resaltado. Y la respuesta se cruza con lo que pasa hoy: la caída de comunicación ALM-COM-0611, la reclamación CLM-2026-0619 o la campaña REC-2026-1019.',
      say_none: 'Cuando no hay fuente lo dice y no inventa: ni respuesta ni cita. Si el tema está en un documento que no está indexado, lo nombra (PR-QLT-010) y permite derivar la pregunta a Operaciones.',
      next_empty: 'Pulsar «¿Qué hacer si un panel de alarma pierde la comunicación 4G?» y después la cita 1 para ver el pasaje resaltado.',
      next_answered: 'Escribir una pregunta sin fuente, por ejemplo «¿Cada cuánto hacemos el simulacro de retirada?», y pulsar «Preguntar».',
      next_done: 'Pasar a la siguiente escena con la flecha derecha.'
    },

    docs: [
      {
        code: 'PR-INS-001',
        title: 'Instalación y puesta en marcha (grado 2)',
        short: 'Instalación y puesta en marcha',
        type: 'Procedimiento',
        version: '5',
        date: '2026-03-10',
        owner: 'Instalaciones',
        summary: 'Instalación de grado 2 según UNE-EN 50131: panel con comunicación 4G y vía de respaldo IP, prueba de cada detector y de la comunicación con la central receptora, y alta en el portal de la marca en 24 h.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Instalación de grado 2 según UNE-EN 50131: panel con comunicación 4G y vía de respaldo IP, prueba de cada detector y de la comunicación con la central receptora, y alta en el portal de la marca en 24 h.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Definir cómo se instala y se pone en marcha una alarma residencial o de pequeño negocio de grado 2 según UNE-EN 50131, para las tres marcas de las que Guardián Ibérica Instalaciones es instalador autorizado.',
            'Aplica a instalaciones nuevas y ampliaciones de Verisure, Sector Alarm y Prosegur Alarmas realizadas por los técnicos del hub de Paterna y de las delegaciones de Alicante y Castellón.'
          ] },
          { id: '2', heading: '2. Responsabilidades', list: [
            'Técnico instalador: instala, prueba y deja constancia fotográfica de la instalación.',
            'Jefe de instalaciones: asigna la orden de trabajo, revisa las instalaciones con incidencia y firma las excepciones.',
            'Atención al cliente: confirma la cita y entrega el manual y las claves de acceso.'
          ] },
          { id: '3', heading: '3. Criterio de instalación', text: [
            'La instalación se ejecuta como grado 2 de UNE-EN 50131: panel con comunicación principal 4G y una vía de respaldo IP, sirena interior y detectores de cada zona definida con el cliente.',
            'Los equipos se instalan solo si proceden de un lote con recepción registrada en SAP Business One; los lotes bloqueados no se instalan.'
          ] },
          { id: '4', heading: '4. Puesta en marcha y pruebas', text: [
            'Antes de dar la instalación por terminada, el técnico realiza las pruebas siguientes y las registra en la orden de trabajo:'
          ], list: [
            'Prueba de cada detector y de la sirena.',
            'Prueba de comunicación 4G y de la vía de respaldo IP con la central receptora de alarmas.',
            'Comprobación del nivel de batería del panel y de cada sensor inalámbrico.',
            'Fotos del panel, de cada detector y de la sirena.',
            'Formación al cliente y firma de la entrega.'
          ] },
          { id: '5', heading: '5. Alta en la marca', text: [
            'La instalación se da de alta en el portal de partner de la marca (Verisure Partner Portal, Sector Alarm Partner Hub o Prosegur Partner Portal) en un máximo de 24 h desde la puesta en marcha.',
            'Hasta que el alta no figura confirmada, la instalación no se factura ni cuenta como activa.'
          ] },
          { id: '6', heading: '6. Registros', list: [
            'Orden de trabajo, pruebas y fotos: Salesforce CRM.',
            'Equipos y lote de cada unidad instalada: SAP Business One.',
            'Alta del contrato: portal de partner de la marca.'
          ] },
          { id: '7', heading: '7. Código de instalación', text: [
            'Formato INS-<año>-<delegación>-<nº>. Ejemplo: INS-2026-VLC-04417 es la instalación 04417 registrada en la delegación de Valencia en 2026.'
          ] }
        ]
      },
      {
        code: 'PR-MAN-004',
        title: 'Mantenimiento preventivo anual',
        short: 'Mantenimiento preventivo',
        type: 'Procedimiento',
        version: '4',
        date: '2026-02-16',
        owner: 'Mantenimiento',
        summary: 'Revisión anual de cada instalación con prueba de detectores, sirena y comunicación, y sustitución de baterías por debajo del 30 %. Un aviso de batería baja sin acuse en 48 h genera una visita.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Revisión anual de cada instalación con prueba de detectores, sirena y comunicación, y sustitución de baterías por debajo del 30 %. Un aviso de batería baja sin acuse en 48 h genera una visita.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Mantener operativas las instalaciones activas (unas 38.000) con una revisión preventiva anual y atender los avisos de batería baja antes de que provoquen falsas alarmas o pérdida de supervisión.'
          ] },
          { id: '2', heading: '2. Plan anual', text: [
            'Salesforce CRM genera la visita anual de cada instalación y Twilio SMS avisa al cliente con 7 días de antelación.'
          ] },
          { id: '3', heading: '3. Contenido de la revisión', text: [
            'El técnico de mantenimiento realiza en cada visita:'
          ], list: [
            'Prueba de cada detector, de la sirena y de la comunicación 4G y de respaldo.',
            'Medición de la batería del panel y de cada sensor inalámbrico.',
            'Sustitución de toda batería por debajo del 30 % de carga en la propia visita.',
            'Actualización del firmware del panel si la marca lo ha publicado.',
            'Registro del resultado y de las fotos en la orden de trabajo.'
          ] },
          { id: '4', heading: '4. Aviso de batería baja', text: [
            'Un sensor con batería baja genera un aviso en el portal de partner de la marca y en Salesforce CRM.',
            'Si el aviso no se acusa en 48 h, se programa una visita de sustitución con aviso al cliente por Twilio SMS.',
            'Un sensor con batería baja no puede quedar sin atender hasta la siguiente revisión anual.'
          ] },
          { id: '5', heading: '5. Prioridad', text: [
            'Los mantenimientos urgentes (aviso de batería baja sin acuse, fallo de comunicación o sensor sin respuesta) se atienden antes que los preventivos programados.'
          ] },
          { id: '6', heading: '6. Registros', list: [
            'Plan, visitas y resultados: Salesforce CRM.',
            'Baterías y repuestos: SAP Business One.',
            'Avisos a clientes: Twilio SMS, con copia en Salesforce CRM.'
          ] }
        ]
      },
      {
        code: 'PR-SOP-007',
        title: 'Gestión de falsas alarmas',
        short: 'Falsas alarmas',
        type: 'Procedimiento',
        version: '6',
        date: '2026-04-14',
        owner: 'Soporte técnico',
        summary: 'Dos falsas alarmas en 30 días abren un análisis técnico en 48 h. Los cargos de desplazamiento de vigilante solo se repercuten si la causa es imputable al cliente. Acuse de reclamación en 24 h y resolución en 10 días hábiles.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Dos falsas alarmas en 30 días abren un análisis técnico en 48 h. Los cargos de desplazamiento de vigilante solo se repercuten si la causa es imputable al cliente. Acuse de reclamación en 24 h y resolución en 10 días hábiles.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Definir cómo se analiza una falsa alarma, a quién se imputan los cargos que genera y cómo se responde al cliente que reclama.'
          ] },
          { id: '2', heading: '2. Definiciones', list: [
            'Falsa alarma: activación de la alarma sin intrusión ni emergencia real.',
            'Falsa alarma repetida: dos o más falsas alarmas en 30 días en la misma instalación.',
            'Cargo de desplazamiento de vigilante: importe que la marca repercute al cliente cuando se envía un vigilante a una activación.'
          ] },
          { id: '3', heading: '3. Análisis de la causa', text: [
            'Una falsa alarma repetida abre un análisis técnico en 48 h, remoto o con visita, que revisa:'
          ], list: [
            'Estado y batería de los sensores de la zona que activó la alarma.',
            'Registro de eventos del panel y de la comunicación.',
            'Cambios recientes en la instalación o en las costumbres del cliente, como mascotas, obras o ventanas abiertas.'
          ] },
          { id: '4', heading: '4. Imputación de cargos', text: [
            'Los cargos de desplazamiento de vigilante solo se repercuten al cliente cuando la causa de la falsa alarma es imputable a él.',
            'Si la causa es un fallo del equipo o del servicio (sensor con batería baja, mala instalación o fallo de comunicación), los cargos se anulan y el importe se abona al cliente.',
            'Mientras el análisis está abierto, no se tramita ningún cargo nuevo sobre esa instalación.'
          ] },
          { id: '5', heading: '5. Plazos de reclamación', list: [
            'Acuse de recibo al cliente: 24 h desde la recepción.',
            'Resolución: 10 días hábiles desde la recepción.',
            'Toda reclamación se registra en Salesforce CRM con la causa raíz confirmada con evidencia.'
          ] },
          { id: '6', heading: '6. Respuesta al cliente', text: [
            'La respuesta se redacta en el idioma del cliente y la aprueba el Responsable de operaciones antes de enviarla.',
            'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.'
          ] },
          { id: '7', heading: '7. Baja del cliente', text: [
            'Si el cliente amenaza con la baja por falsas alarmas, se avisa a Atención al cliente y se aplica PR-BAJ-005 una vez cerrada la reclamación.'
          ] },
          { id: '8', heading: '8. Registros', list: [
            'Reclamación, causa y plazos: Salesforce CRM.',
            'Abonos y facturas rectificativas: SAP Business One.'
          ] }
        ]
      },
      {
        code: 'PR-RGPD-002',
        title: 'Videoverificación y datos personales',
        short: 'Videoverificación y RGPD',
        type: 'Procedimiento',
        version: '3',
        date: '2026-05-26',
        owner: 'Cumplimiento',
        summary: 'La videoverificación solo se activa con consentimiento y sobre las zonas acordadas; las imágenes se conservan como máximo 30 días y las brechas con riesgo se notifican a la AEPD en 72 h.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'La videoverificación solo se activa con consentimiento y sobre las zonas acordadas; las imágenes se conservan como máximo 30 días y las brechas con riesgo se notifican a la AEPD en 72 h.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Fijar cómo se tratan los datos personales y las imágenes en la instalación, la videoverificación y el soporte técnico. Guardián Ibérica Instalaciones actúa como encargado del tratamiento de la marca de cada cliente.'
          ] },
          { id: '2', heading: '2. Videoverificación', list: [
            'Solo se activa con el consentimiento firmado del cliente y sobre las zonas acordadas en la instalación.',
            'Las cámaras no pueden orientarse a la vía pública ni a espacios de terceros.',
            'Las imágenes solo se consultan cuando salta una alarma y por el personal autorizado.'
          ] },
          { id: '3', heading: '3. Conservación y acceso', text: [
            'Las imágenes se conservan como máximo 30 días, salvo que una autoridad las requiera.',
            'El acceso a las imágenes queda limitado a los operadores de soporte técnico con perfil autorizado y cada consulta se registra.'
          ] },
          { id: '4', heading: '4. Brechas de datos', text: [
            'Toda sospecha de brecha de datos se comunica al DPO el mismo día.',
            'La brecha con riesgo para las personas se notifica a la AEPD en un máximo de 72 h y, si procede, a los clientes afectados y a la marca.'
          ] },
          { id: '5', heading: '5. Derechos de los interesados', text: [
            'Las solicitudes de acceso, rectificación o supresión se responden en un mes y se registran en Salesforce CRM.'
          ] },
          { id: '6', heading: '6. Registros', list: [
            'Consentimientos y solicitudes de derechos: Salesforce CRM.',
            'Accesos a imágenes: registro del sistema de videoverificación.',
            'Brechas y notificaciones: registro del DPO.'
          ] }
        ]
      },
      {
        code: 'PR-COM-003',
        title: 'Pérdida de comunicación de panel',
        short: 'Pérdida de comunicación',
        type: 'Procedimiento',
        version: '3',
        date: '2026-06-09',
        owner: 'Soporte técnico',
        summary: 'Un panel sin comunicación más de 10 min genera una alerta; más de 50 paneles en la misma zona es una caída masiva. Se conmuta a la vía de respaldo IP y los paneles sin respaldo reciben visita prioritaria en 24 h.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Un panel sin comunicación más de 10 min genera una alerta; más de 50 paneles en la misma zona es una caída masiva. Se conmuta a la vía de respaldo IP y los paneles sin respaldo reciben visita prioritaria en 24 h.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Mantener la supervisión remota de las instalaciones cuando un panel o un grupo de paneles pierde la comunicación con la central receptora. Aplica a los paneles de las tres marcas con comunicación 4G.'
          ] },
          { id: '2', heading: '2. Definiciones', list: [
            'Pérdida de comunicación: panel sin conexión con la central receptora durante más de 10 min.',
            'Caída masiva: pérdida de comunicación de más de 50 paneles en la misma zona.',
            'Panel sin respaldo: panel sin vía de comunicación IP alternativa operativa.'
          ] },
          { id: '3', heading: '3. Responsabilidades', list: [
            'Soporte técnico: detecta la alerta, conmuta a la vía de respaldo y verifica la supervisión.',
            'Responsable de soporte técnico: aprueba el plan de una caída masiva.',
            'Jefe de mantenimiento: asigna las visitas prioritarias a los paneles sin respaldo.',
            'Atención al cliente: informa a los clientes afectados.'
          ] },
          { id: '4', heading: '4. Actuación', text: [
            'Ante una pérdida de comunicación individual, Soporte técnico comprueba la línea 4G y el panel de forma remota.',
            'Ante una caída masiva, se conmuta a la vía de respaldo IP de los paneles que la tienen y se verifica que vuelven a supervisarse.',
            'Los paneles sin respaldo reciben visita prioritaria en un máximo de 24 h y, mientras tanto, el cliente es informado de que la instalación no tiene supervisión remota.'
          ] },
          { id: '5', heading: '5. Comunicación', list: [
            'Aviso a los clientes afectados por Twilio SMS.',
            'Comunicación a la marca por su portal de partner.',
            'Seguimiento en el canal de Slack de soporte técnico hasta recuperar todos los paneles.'
          ] },
          { id: '6', heading: '6. Cierre', text: [
            'El incidente se cierra cuando todos los paneles afectados vuelven a supervisarse; la causa y los paneles visitados quedan en Salesforce CRM.'
          ] }
        ]
      },
      {
        code: 'PR-BAJ-005',
        title: 'Baja de cliente y retirada de equipos',
        short: 'Baja y retirada de equipos',
        type: 'Procedimiento',
        version: '4',
        date: '2026-03-30',
        owner: 'Atención al cliente',
        summary: 'Acuse de la baja en 24 h, retirada de equipos en 15 días hábiles y desactivación del panel en el portal de la marca. La penalización la fija el contrato de la marca y se suspende si hay una reclamación abierta por fallo del servicio.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Acuse de la baja en 24 h, retirada de equipos en 15 días hábiles y desactivación del panel en el portal de la marca. La penalización la fija el contrato de la marca y se suspende si hay una reclamación abierta por fallo del servicio.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Definir cómo se gestiona la baja de un cliente de cualquiera de las tres marcas, la retirada de los equipos y el borrado de sus datos.'
          ] },
          { id: '2', heading: '2. Plazos', list: [
            'Acuse de la solicitud de baja al cliente: 24 h.',
            'Retirada de los equipos: 15 días hábiles desde la solicitud.',
            'Desactivación del panel y de los datos del cliente: el mismo día de la retirada.'
          ] },
          { id: '3', heading: '3. Penalización por baja', text: [
            'La penalización por baja anticipada es la que fija el contrato de la marca (por ejemplo, 180 EUR en un contrato de Sector Alarm) y la aplica la marca.',
            'Si el cliente tiene una reclamación abierta por fallo del equipo o del servicio, no se tramita la penalización hasta cerrar la reclamación según PR-SOP-007.'
          ] },
          { id: '4', heading: '4. Retirada de equipos', list: [
            'Los equipos propiedad de la marca se retiran, se etiquetan y se devuelven al almacén.',
            'Antes de retirar el panel se borran las claves, las imágenes y los datos del cliente.',
            'Se entrega al cliente un justificante de retirada firmado.'
          ] },
          { id: '5', heading: '5. Registros', list: [
            'Solicitud y plazos: Salesforce CRM.',
            'Equipos retirados: SAP Business One.',
            'Baja del contrato: portal de partner de la marca.'
          ] }
        ]
      },
      {
        code: 'PR-QLT-006',
        title: 'Retirada de producto',
        short: 'Retirada de producto',
        type: 'Procedimiento',
        version: '2',
        date: '2026-08-24',
        owner: 'Almacén',
        summary: 'Un lote con riesgo de seguridad se bloquea en SAP Business One, se localizan sus instalaciones por lote y se avisa a los clientes afectados. Solo el Responsable de operaciones libera un lote retirado.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Un lote con riesgo de seguridad se bloquea en SAP Business One, se localizan sus instalaciones por lote y se avisa a los clientes afectados. Solo el Responsable de operaciones libera un lote retirado.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Asegurar que ningún producto con un defecto de seguridad se instala y que los ya instalados se localizan y se sustituyen. Aplica a todos los equipos de las tres marcas.'
          ] },
          { id: '2', heading: '2. Responsabilidades', list: [
            'Responsable de almacén: bloquea el lote y cuenta las unidades en almacén, instaladas y devueltas.',
            'Jefe de instalaciones: programa las visitas de sustitución.',
            'Responsable de operaciones: aprueba la campaña y es el único que libera un lote retirado.',
            'Atención al cliente: avisa a los clientes afectados.'
          ] },
          { id: '3', heading: '3. Bloqueo del lote', text: [
            'Todo lote retirado se bloquea en SAP Business One y en el almacén físico con etiqueta de retención.',
            'SAP Business One no permite asignar a una orden de trabajo una unidad de un lote bloqueado.'
          ] },
          { id: '4', heading: '4. Localización de instalaciones', text: [
            'Las instalaciones con unidades del lote se localizan por el código de lote en Salesforce CRM y SAP Business One, y se agrupan por marca y delegación.'
          ] },
          { id: '5', heading: '5. Aviso y sustitución', list: [
            'Se avisa a los clientes afectados por Twilio SMS y por llamada.',
            'Las instalaciones con riesgo para la seguridad se visitan por orden de prioridad.',
            'Se informa a las marcas por su portal de partner y al fabricante.'
          ] },
          { id: '6', heading: '6. Producto ya instalado', text: [
            'Si parte del lote ya está instalada, el Responsable de operaciones lanza la campaña de aviso y de simulacro según PR-QLT-010 (Simulacro de retirada y comunicación a clientes).'
          ] },
          { id: '7', heading: '7. Destino de las unidades', text: [
            'Las unidades en almacén se devuelven al fabricante o se destruyen con certificado.',
            'Ningún lote se libera por vencimiento de plazo.'
          ] }
        ]
      }
    ],

    unindexed: {
      'PR-QLT-010': { title: 'Simulacro de retirada y comunicación a clientes', mentionedIn: { doc: 'PR-QLT-006', sec: '6', quote: 'según PR-QLT-010 (Simulacro de retirada y comunicación a clientes)' } }
    },

    suggested: ['comunicacion', 'falsas', 'plazos', 'retirada', 'mantenimiento', 'imagenes'],

    intents: [
      {
        id: 'comunicacion', icon: 'alert-triangle', topic: 'Pérdida de comunicación · actuación', scope: 'local',
        q: '¿Qué hacer si un panel de alarma pierde la comunicación 4G?',
        anchors: ['comunicación', 'comunicacion', '4g', 'panel', 'paneles', 'supervisión', 'caída', 'caida'],
        terms: ['pierde', 'pierden', 'perdida', 'respaldo', 'conmutar', 'conmuta', 'alarma', 'conexión', 'hacer', 'actuar', 'soporte', 'masiva'],
        min: 3,
        blocks: [
          { t: 'Un panel sin conexión con la central receptora durante más de 10 min es una pérdida de comunicación.', c: [['PR-COM-003', 2, 'Pérdida de comunicación: panel sin conexión con la central receptora durante más de 10 min.']] },
          { t: 'Soporte técnico comprueba la línea 4G y el panel de forma remota.', c: [['PR-COM-003', 4, 'Ante una pérdida de comunicación individual, Soporte técnico comprueba la línea 4G y el panel de forma remota.']] },
          { t: 'Si hay más de 50 paneles en la misma zona es una caída masiva: se conmuta a la vía de respaldo IP y se verifica que vuelven a supervisarse.', c: [['PR-COM-003', 2, 'Caída masiva: pérdida de comunicación de más de 50 paneles en la misma zona.'], ['PR-COM-003', 4, 'Ante una caída masiva, se conmuta a la vía de respaldo IP de los paneles que la tienen y se verifica que vuelven a supervisarse.']] },
          { t: 'Se avisa a los clientes afectados por Twilio SMS y a la marca por su portal de partner.', c: [['PR-COM-003', 5, 'Aviso a los clientes afectados por Twilio SMS.'], ['PR-COM-003', 5, 'Comunicación a la marca por su portal de partner.']] }
        ],
        context: {
          systems: ['Salesforce CRM', 'Twilio SMS'],
          text: 'Alarma ALM-COM-0611 de hoy: 214 paneles sin comunicación 4G en Valencia Norte desde las 05:10 tras un mantenimiento del operador móvil (pico de 241 a las 05:42). Es una caída masiva por el apartado 2 y requiere la aprobación del Responsable de soporte técnico.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma ALM-COM-0611'
        },
        followups: ['sin-respaldo', 'aprobacion']
      },
      {
        id: 'sin-respaldo', icon: 'wrench', topic: 'Pérdida de comunicación · paneles sin respaldo', scope: 'local',
        q: '¿Qué se hace con los paneles que no tienen vía de respaldo?',
        anchors: ['sin respaldo', 'respaldo', 'visita prioritaria', 'prioritaria'],
        terms: ['panel', 'paneles', 'vía', 'ip', 'supervisión', 'visita', 'cliente', 'alternativa', 'informar'],
        min: 3,
        blocks: [
          { t: 'Los paneles sin respaldo reciben visita prioritaria en un máximo de 24 h.', c: [['PR-COM-003', 4, 'Los paneles sin respaldo reciben visita prioritaria en un máximo de 24 h']] },
          { t: 'Mientras tanto, se informa al cliente de que la instalación no tiene supervisión remota.', c: [['PR-COM-003', 4, 'el cliente es informado de que la instalación no tiene supervisión remota']] },
          { t: 'El Jefe de mantenimiento asigna esas visitas prioritarias.', c: [['PR-COM-003', 3, 'Jefe de mantenimiento: asigna las visitas prioritarias a los paneles sin respaldo.']] }
        ],
        context: {
          systems: ['Salesforce CRM', 'Samsara Flota'],
          text: 'En la alarma de hoy, 38 de los 214 paneles no tienen vía de respaldo IP: por el apartado 4 reciben visita prioritaria en un máximo de 24 h y mientras tanto sus clientes deben saber que la instalación no tiene supervisión remota.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma ALM-COM-0611'
        },
        followups: ['comunicacion', 'aprobacion']
      },
      {
        id: 'aprobacion', icon: 'users', topic: 'Pérdida de comunicación · responsabilidades', scope: 'local',
        q: '¿Quién hace qué ante una caída masiva de comunicación?',
        anchors: ['responsable', 'responsables', 'responsabilidad', 'responsabilidades', 'aprueba', 'aprobación', 'aprobar'],
        terms: ['quién', 'hace', 'decide', 'caída', 'masiva', 'plan', 'comunicación', 'paneles', 'soporte'],
        min: 4,
        blocks: [
          { intro: { t: 'Reparto de responsabilidades ante una pérdida de comunicación:' }, list: [
            { t: 'Soporte técnico: detecta la alerta, conmuta a la vía de respaldo y verifica la supervisión.', c: [['PR-COM-003', 3, 'Soporte técnico: detecta la alerta, conmuta a la vía de respaldo y verifica la supervisión.']] },
            { t: 'Responsable de soporte técnico: aprueba el plan de una caída masiva.', c: [['PR-COM-003', 3, 'Responsable de soporte técnico: aprueba el plan de una caída masiva.']] },
            { t: 'Jefe de mantenimiento: asigna las visitas prioritarias a los paneles sin respaldo.', c: [['PR-COM-003', 3, 'Jefe de mantenimiento: asigna las visitas prioritarias a los paneles sin respaldo.']] },
            { t: 'Atención al cliente: informa a los clientes afectados.', c: [['PR-COM-003', 3, 'Atención al cliente: informa a los clientes afectados.']] }
          ] },
          { t: 'El incidente se cierra cuando todos los paneles afectados vuelven a supervisarse.', c: [['PR-COM-003', 6, 'El incidente se cierra cuando todos los paneles afectados vuelven a supervisarse']] }
        ],
        context: {
          systems: ['Slack', 'Salesforce CRM'],
          text: 'En la alarma de hoy el Responsable de soporte técnico es quien aprueba el plan: conmutación a respaldo IP, visita prioritaria a los 38 paneles sin respaldo y SMS a los clientes.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma ALM-COM-0611'
        },
        followups: ['comunicacion', 'sin-respaldo']
      },
      {
        id: 'instalacion', icon: 'shield-check', topic: 'Instalación · requisitos de grado 2', scope: 'local',
        q: '¿Qué exige una instalación de grado 2 según UNE-EN 50131?',
        anchors: ['grado 2', 'une-en 50131', '50131', 'grado'],
        terms: ['instalación', 'instalacion', 'exige', 'panel', 'requisitos', 'alarma', 'detectores', 'sirena', 'lote'],
        min: 3,
        blocks: [
          { t: 'Panel con comunicación principal 4G y una vía de respaldo IP, sirena interior y detectores de cada zona definida con el cliente.', c: [['PR-INS-001', 3, 'La instalación se ejecuta como grado 2 de UNE-EN 50131: panel con comunicación principal 4G y una vía de respaldo IP, sirena interior y detectores de cada zona definida con el cliente.']] },
          { t: 'Los equipos deben proceder de un lote con recepción registrada en SAP Business One; los lotes bloqueados no se instalan.', c: [['PR-INS-001', 3, 'Los equipos se instalan solo si proceden de un lote con recepción registrada en SAP Business One; los lotes bloqueados no se instalan.']] }
        ],
        followups: ['puesta', 'codigo']
      },
      {
        id: 'puesta', icon: 'clipboard-check', topic: 'Instalación · puesta en marcha y alta', scope: 'local',
        q: '¿Qué pruebas se hacen en la puesta en marcha de una instalación?',
        anchors: ['puesta en marcha', 'puesta', 'pruebas', 'prueba'],
        terms: ['instalación', 'instalacion', 'detector', 'comunicación', 'batería', 'fotos', 'técnico', 'sirena', 'entrega', 'alta'],
        min: 3,
        blocks: [
          { intro: { t: 'Antes de dar la instalación por terminada, el técnico realiza estas pruebas y las registra en la orden de trabajo:', c: [['PR-INS-001', 4, 'Antes de dar la instalación por terminada, el técnico realiza las pruebas siguientes y las registra en la orden de trabajo:']] }, list: [
            { t: 'Prueba de cada detector y de la sirena.', c: [['PR-INS-001', 4, 'Prueba de cada detector y de la sirena.']] },
            { t: 'Prueba de comunicación 4G y de la vía de respaldo IP con la central receptora.', c: [['PR-INS-001', 4, 'Prueba de comunicación 4G y de la vía de respaldo IP con la central receptora de alarmas.']] },
            { t: 'Comprobación del nivel de batería del panel y de cada sensor inalámbrico.', c: [['PR-INS-001', 4, 'Comprobación del nivel de batería del panel y de cada sensor inalámbrico.']] },
            { t: 'Fotos de la instalación, formación al cliente y firma de la entrega.', c: [['PR-INS-001', 4, 'Fotos del panel, de cada detector y de la sirena.'], ['PR-INS-001', 4, 'Formación al cliente y firma de la entrega.']] }
          ] },
          { t: 'Después se da de alta en el portal de partner de la marca en un máximo de 24 h.', c: [['PR-INS-001', 5, 'en un máximo de 24 h desde la puesta en marcha']] }
        ],
        context: {
          systems: ['Salesforce CRM'],
          text: 'Hoy hay 61 instalaciones programadas: cada una debe cerrar sus pruebas en la orden de trabajo antes del alta en el portal de la marca.',
          go: 'turno', goLabel: 'Ver parte diario'
        },
        followups: ['codigo', 'mantenimiento']
      },
      {
        id: 'codigo', icon: 'barcode', topic: 'Código de instalación', scope: 'local',
        q: '¿Cómo se lee el código de instalación?',
        anchors: ['código de instalación', 'codigo de instalacion', 'formato ins', 'ins-2026-vlc-04417'],
        terms: ['código', 'leer', 'lee', 'significa', 'interpreta', 'formato', 'delegación', 'instalación'],
        min: 2,
        blocks: [
          { t: 'Formato INS-<año>-<delegación>-<nº>.', c: [['PR-INS-001', 7, 'Formato INS-<año>-<delegación>-<nº>.']] },
          { t: 'Por ejemplo, INS-2026-VLC-04417 es la instalación 04417 registrada en la delegación de Valencia en 2026.', c: [['PR-INS-001', 7, 'INS-2026-VLC-04417 es la instalación 04417 registrada en la delegación de Valencia en 2026']] }
        ],
        context: {
          systems: ['Salesforce CRM', 'SAP Business One'],
          text: 'Traza completa de la instalación del ejemplo, desde la recepción del equipo hasta el alta en el portal de la marca:',
          lot: 'INS-2026-VLC-04417'
        },
        followups: ['instalacion', 'puesta']
      },
      {
        id: 'mantenimiento', icon: 'calendar', topic: 'Mantenimiento preventivo anual', scope: 'local',
        q: '¿Qué incluye el mantenimiento preventivo anual de una instalación?',
        anchors: ['mantenimiento', 'preventivo', 'revisión anual', 'revision anual'],
        terms: ['incluye', 'anual', 'instalación', 'baterías', 'sensores', 'visita', 'revisión', 'prueba', 'firmware'],
        min: 3,
        blocks: [
          { intro: { t: 'La visita anual la genera Salesforce CRM y el cliente recibe un SMS con 7 días de antelación. En cada visita el técnico realiza:', c: [['PR-MAN-004', 2, 'Salesforce CRM genera la visita anual de cada instalación y Twilio SMS avisa al cliente con 7 días de antelación.']] }, list: [
            { t: 'Prueba de cada detector, de la sirena y de la comunicación 4G y de respaldo.', c: [['PR-MAN-004', 3, 'Prueba de cada detector, de la sirena y de la comunicación 4G y de respaldo.']] },
            { t: 'Medición de la batería del panel y de cada sensor inalámbrico.', c: [['PR-MAN-004', 3, 'Medición de la batería del panel y de cada sensor inalámbrico.']] },
            { t: 'Sustitución de toda batería por debajo del 30 % de carga en la propia visita.', c: [['PR-MAN-004', 3, 'Sustitución de toda batería por debajo del 30 % de carga en la propia visita.']] },
            { t: 'Actualización del firmware del panel y registro del resultado en la orden de trabajo.', c: [['PR-MAN-004', 3, 'Actualización del firmware del panel si la marca lo ha publicado.'], ['PR-MAN-004', 3, 'Registro del resultado y de las fotos en la orden de trabajo.']] }
          ] }
        ],
        context: {
          systems: ['Salesforce CRM'],
          text: 'El tablero de hoy marca 118 mantenimientos programados, 9 de ellos urgentes. Por el apartado 5, los urgentes se atienden antes que los preventivos.',
          go: 'turno', goLabel: 'Ver parte diario'
        },
        followups: ['bateria', 'falsas']
      },
      {
        id: 'bateria', icon: 'gauge', topic: 'Mantenimiento · aviso de batería baja', scope: 'local',
        q: '¿Qué hacer cuando un sensor avisa de batería baja?',
        anchors: ['batería', 'bateria', 'baterías', 'pilas', 'sensor', 'sensores'],
        terms: ['baja', 'aviso', 'avisa', 'sustituir', 'sustitución', 'acuse', 'visita', 'cliente', 'hacer', 'urgente'],
        min: 3,
        blocks: [
          { t: 'Un sensor con batería baja genera un aviso en el portal de partner de la marca y en Salesforce CRM.', c: [['PR-MAN-004', 4, 'Un sensor con batería baja genera un aviso en el portal de partner de la marca y en Salesforce CRM.']] },
          { t: 'Si el aviso no se acusa en 48 h, se programa una visita de sustitución con aviso al cliente por Twilio SMS.', c: [['PR-MAN-004', 4, 'Si el aviso no se acusa en 48 h, se programa una visita de sustitución con aviso al cliente por Twilio SMS.']] },
          { t: 'Los avisos sin acuse se atienden como mantenimiento urgente, antes que los preventivos programados.', c: [['PR-MAN-004', 5, 'Los mantenimientos urgentes (aviso de batería baja sin acuse, fallo de comunicación o sensor sin respuesta) se atienden antes que los preventivos programados.']] }
        ],
        context: {
          systems: ['Salesforce CRM', 'Sector Alarm Partner Hub'],
          text: 'CLM-2026-0619: el sensor PIR del salón de la clienta tenía la batería baja sin que se generara ningún aviso. Esa es la causa raíz que investiga la reclamación y que el apartado 4 debería haber evitado.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación CLM-2026-0619'
        },
        followups: ['falsas', 'mantenimiento']
      },
      {
        id: 'falsas', icon: 'search', topic: 'Falsas alarmas · análisis de la causa', scope: 'all',
        q: '¿Qué se hace tras una falsa alarma repetida en una instalación?',
        anchors: ['falsa alarma', 'falsas alarmas', 'falsa', 'falsas'],
        terms: ['repetida', 'repetidas', 'análisis', 'causa', '30 días', 'instalación', 'hacer', 'cliente', 'técnico'],
        min: 3,
        blocks: [
          { t: 'Dos o más falsas alarmas en 30 días en la misma instalación abren un análisis técnico en 48 h, remoto o con visita.', c: [['PR-SOP-007', 2, 'Falsa alarma repetida: dos o más falsas alarmas en 30 días en la misma instalación.'], ['PR-SOP-007', 3, 'Una falsa alarma repetida abre un análisis técnico en 48 h, remoto o con visita, que revisa:']] },
          { intro: { t: 'El análisis revisa como mínimo:' }, list: [
            { t: 'El estado y la batería de los sensores de la zona que activó la alarma.', c: [['PR-SOP-007', 3, 'Estado y batería de los sensores de la zona que activó la alarma.']] },
            { t: 'El registro de eventos del panel y de la comunicación.', c: [['PR-SOP-007', 3, 'Registro de eventos del panel y de la comunicación.']] },
            { t: 'Los cambios recientes en la instalación o en las costumbres del cliente.', c: [['PR-SOP-007', 3, 'Cambios recientes en la instalación o en las costumbres del cliente, como mascotas, obras o ventanas abiertas.']] }
          ] }
        ],
        context: {
          systems: ['Salesforce CRM'],
          text: 'CLM-2026-0619: la clienta Marta Soler Pons (Burjassot, contrato SA-2026-77412 de Sector Alarm) tuvo falsas alarmas el 12 y el 14/10/2026, dos en menos de 30 días, es decir, repetidas. La causa raíz probable es un sensor PIR de salón con batería baja.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación CLM-2026-0619'
        },
        followups: ['cargos', 'bateria']
      },
      {
        id: 'cargos', icon: 'mail', topic: 'Falsas alarmas · cargos de vigilante', scope: 'all',
        q: '¿Se pueden cobrar al cliente los cargos de desplazamiento de vigilante por una falsa alarma?',
        anchors: ['cargo', 'cargos', 'desplazamiento', 'vigilante', 'vigilantes'],
        terms: ['falsa', 'alarma', 'cobrar', 'cliente', 'imputable', 'anula', 'abono', 'importe'],
        min: 3,
        blocks: [
          { t: 'Solo cuando la causa de la falsa alarma es imputable al cliente.', c: [['PR-SOP-007', 4, 'Los cargos de desplazamiento de vigilante solo se repercuten al cliente cuando la causa de la falsa alarma es imputable a él.']] },
          { t: 'Si la causa es un fallo del equipo o del servicio, los cargos se anulan y el importe se abona al cliente.', c: [['PR-SOP-007', 4, 'Si la causa es un fallo del equipo o del servicio (sensor con batería baja, mala instalación o fallo de comunicación), los cargos se anulan y el importe se abona al cliente.']] },
          { t: 'Mientras el análisis sigue abierto, no se tramita ningún cargo nuevo sobre esa instalación.', c: [['PR-SOP-007', 4, 'Mientras el análisis está abierto, no se tramita ningún cargo nuevo sobre esa instalación.']] }
        ],
        context: {
          systems: ['Salesforce CRM', 'SAP Business One'],
          text: 'CLM-2026-0619: dos cargos de desplazamiento de vigilante de 39,00 EUR (78,00 EUR en total) por las falsas alarmas del 12 y el 14/10/2026. Si se confirma que la causa es la batería baja del sensor PIR, por el apartado 4 hay que anularlos y abonarlos.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación CLM-2026-0619'
        },
        followups: ['plazos', 'falsas']
      },
      {
        id: 'plazos', icon: 'list-checks', topic: 'Reclamaciones de cliente · plazos', scope: 'all',
        q: '¿Qué plazos tenemos para responder a una reclamación de cliente?',
        anchors: ['reclamación', 'reclamaciones', 'queja', 'quejas'],
        terms: ['plazo', 'plazos', 'tiempo', 'responder', 'contestar', 'acuse', 'días', 'horas', 'cuándo', 'enviar', 'límite', 'vence', 'tenemos', 'gestiona', 'gestionar', 'gestión', 'proceso', 'procedimiento'],
        min: 3,
        blocks: [
          { intro: { t: 'Plazos del procedimiento de falsas alarmas y reclamaciones:' }, list: [
            { t: 'Acuse de recibo al cliente en 24 h desde la recepción.', c: [['PR-SOP-007', 5, 'Acuse de recibo al cliente: 24 h desde la recepción.']] },
            { t: 'Resolución en 10 días hábiles desde la recepción.', c: [['PR-SOP-007', 5, 'Resolución: 10 días hábiles desde la recepción.']] }
          ] },
          { t: 'La respuesta se redacta en el idioma del cliente y la aprueba el Responsable de operaciones antes de enviarla.', c: [['PR-SOP-007', 6, 'La respuesta se redacta en el idioma del cliente y la aprueba el Responsable de operaciones antes de enviarla.']] },
          { t: 'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces es una hipótesis en investigación.', c: [['PR-SOP-007', 6, 'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.']] }
        ],
        context: {
          systems: ['Salesforce CRM'],
          text: 'Reclamación CLM-2026-0619 (Marta Soler Pons, Burjassot): el acuse de 24 h y la resolución en 10 días hábiles corren desde su recepción. El email de la clienta está en español y la respuesta se redacta en su idioma.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación CLM-2026-0619'
        },
        followups: ['falsas', 'penalizacion']
      },
      {
        id: 'penalizacion', icon: 'unlock', topic: 'Baja · penalización con reclamación abierta', scope: 'all',
        q: '¿Se aplica la penalización por baja si el cliente tiene una reclamación abierta?',
        anchors: ['penalización', 'penalizacion', 'penalizar', 'permanencia'],
        terms: ['baja', 'reclamación', 'abierta', 'cliente', 'contrato', '180', 'aplica', 'marca'],
        min: 3,
        blocks: [
          { t: 'La penalización por baja anticipada la fija el contrato de la marca y la aplica la marca.', c: [['PR-BAJ-005', 3, 'La penalización por baja anticipada es la que fija el contrato de la marca']] },
          { t: 'Con una reclamación abierta por fallo del equipo o del servicio, no se tramita hasta cerrar la reclamación según PR-SOP-007.', c: [['PR-BAJ-005', 3, 'no se tramita la penalización hasta cerrar la reclamación según PR-SOP-007']] },
          { t: 'Si el cliente amenaza con la baja por falsas alarmas, se avisa a Atención al cliente.', c: [['PR-SOP-007', 7, 'Si el cliente amenaza con la baja por falsas alarmas, se avisa a Atención al cliente']] }
        ],
        context: {
          systems: ['Salesforce CRM'],
          text: 'La clienta de CLM-2026-0619 amenaza con la baja y una penalización de 180 EUR en su contrato SA-2026-77412 de Sector Alarm: mientras la reclamación siga abierta y la causa apunte a un fallo del equipo, la penalización queda suspendida.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación CLM-2026-0619'
        },
        followups: ['baja', 'plazos']
      },
      {
        id: 'baja', icon: 'truck', topic: 'Baja de cliente y retirada de equipos', scope: 'all',
        q: '¿Qué pasos se siguen cuando un cliente pide la baja del servicio?',
        anchors: ['baja', 'darse de baja', 'cancelar', 'cancelación', 'retirada de equipos'],
        terms: ['cliente', 'pide', 'solicita', 'servicio', 'equipos', 'plazo', 'retirar', 'retirada', 'datos'],
        min: 3,
        blocks: [
          { intro: { t: 'Plazos de la baja:' }, list: [
            { t: 'Acuse de la solicitud al cliente en 24 h.', c: [['PR-BAJ-005', 2, 'Acuse de la solicitud de baja al cliente: 24 h.']] },
            { t: 'Retirada de los equipos en 15 días hábiles desde la solicitud.', c: [['PR-BAJ-005', 2, 'Retirada de los equipos: 15 días hábiles desde la solicitud.']] },
            { t: 'Desactivación del panel y de los datos del cliente el mismo día de la retirada.', c: [['PR-BAJ-005', 2, 'Desactivación del panel y de los datos del cliente: el mismo día de la retirada.']] }
          ] },
          { t: 'Antes de retirar el panel se borran las claves, las imágenes y los datos del cliente.', c: [['PR-BAJ-005', 4, 'Antes de retirar el panel se borran las claves, las imágenes y los datos del cliente.']] },
          { t: 'Se entrega al cliente un justificante de retirada firmado.', c: [['PR-BAJ-005', 4, 'Se entrega al cliente un justificante de retirada firmado.']] }
        ],
        followups: ['penalizacion']
      },
      {
        id: 'imagenes', icon: 'lock', topic: 'Videoverificación · imágenes y accesos', scope: 'all',
        q: '¿Cuánto tiempo se conservan las imágenes de videoverificación?',
        anchors: ['imágenes', 'imagenes', 'videoverificación', 'videoverificacion', 'cámara', 'cámaras', 'conservan', 'conservación'],
        terms: ['tiempo', 'plazo', 'acceso', 'accede', 'acceder', 'consentimiento', 'cliente', 'días', 'zonas'],
        min: 2,
        blocks: [
          { t: 'Como máximo 30 días, salvo que una autoridad las requiera.', c: [['PR-RGPD-002', 3, 'Las imágenes se conservan como máximo 30 días, salvo que una autoridad las requiera.']] },
          { t: 'El acceso queda limitado a los operadores de soporte técnico con perfil autorizado y cada consulta se registra.', c: [['PR-RGPD-002', 3, 'El acceso a las imágenes queda limitado a los operadores de soporte técnico con perfil autorizado y cada consulta se registra.']] },
          { t: 'La videoverificación solo se activa con el consentimiento firmado del cliente y sobre las zonas acordadas.', c: [['PR-RGPD-002', 2, 'Solo se activa con el consentimiento firmado del cliente y sobre las zonas acordadas en la instalación.']] }
        ],
        followups: ['brecha']
      },
      {
        id: 'brecha', icon: 'shield', topic: 'Datos personales · brechas', scope: 'all',
        q: '¿En cuánto tiempo hay que notificar una brecha de datos personales?',
        anchors: ['brecha', 'brechas', 'aepd', 'filtración'],
        terms: ['notificar', 'plazo', 'datos', 'personales', 'dpo', '72', 'horas', 'clientes', 'tiempo'],
        min: 3,
        blocks: [
          { t: 'Toda sospecha de brecha se comunica al DPO el mismo día.', c: [['PR-RGPD-002', 4, 'Toda sospecha de brecha de datos se comunica al DPO el mismo día.']] },
          { t: 'La brecha con riesgo para las personas se notifica a la AEPD en un máximo de 72 h y, si procede, a los clientes afectados y a la marca.', c: [['PR-RGPD-002', 4, 'La brecha con riesgo para las personas se notifica a la AEPD en un máximo de 72 h y, si procede, a los clientes afectados y a la marca.']] }
        ],
        followups: ['imagenes']
      },
      {
        id: 'retirada', icon: 'package', topic: 'Retirada de producto · bloqueo y localización', scope: 'local',
        q: '¿Qué hacer con un lote de producto con riesgo de seguridad?',
        anchors: ['lote', 'lotes', 'retirada', 'retirar', 'retirado', 'recall'],
        terms: ['producto', 'riesgo', 'seguridad', 'bloquear', 'bloqueo', 'defecto', 'unidades', 'hacer', 'instalaciones', 'detector'],
        min: 3,
        blocks: [
          { t: 'El lote se bloquea en SAP Business One y en el almacén físico con etiqueta de retención.', c: [['PR-QLT-006', 3, 'Todo lote retirado se bloquea en SAP Business One y en el almacén físico con etiqueta de retención.']] },
          { t: 'SAP Business One no permite asignar a una orden de trabajo una unidad de un lote bloqueado.', c: [['PR-QLT-006', 3, 'SAP Business One no permite asignar a una orden de trabajo una unidad de un lote bloqueado.']] },
          { t: 'Las instalaciones con unidades del lote se localizan por el código de lote en Salesforce CRM y SAP Business One.', c: [['PR-QLT-006', 4, 'Las instalaciones con unidades del lote se localizan por el código de lote en Salesforce CRM y SAP Business One']] },
          { t: 'Se avisa a los clientes afectados por Twilio SMS y por llamada, y se visitan primero las instalaciones con riesgo para la seguridad.', c: [['PR-QLT-006', 5, 'Se avisa a los clientes afectados por Twilio SMS y por llamada.'], ['PR-QLT-006', 5, 'Las instalaciones con riesgo para la seguridad se visitan por orden de prioridad.']] }
        ],
        context: {
          systems: ['SAP Business One', 'Salesforce CRM'],
          text: 'Lote PIR-2607-A del detector PIR-200 (Sentinela Electronics, batería de litio con riesgo de sobrecalentamiento): 2.400 unidades recibidas, 1.386 instaladas en 912 hogares (Verisure 540, Sector Alarm 214, Prosegur Alarmas 158), 960 en almacén y 54 devueltas. Campaña REC-2026-1019.',
          outcome: 'retirada',
          go: 'retirada', goLabel: 'Abrir campaña REC-2026-1019'
        },
        followups: ['instalado', 'liberar']
      },
      {
        id: 'instalado', icon: 'truck', topic: 'Retirada de producto · unidades ya instaladas', scope: 'local', kind: 'partial',
        q: '¿Qué se hace si el producto retirado ya está instalado en los hogares?',
        anchors: ['=instalado', '=instalada', '=instalados', '=instaladas', 'ya instalado', 'en los hogares', 'en hogares'],
        terms: ['producto', 'lote', 'unidades', 'clientes', 'campaña', 'retirada', 'simulacro'],
        min: 2,
        blocks: [
          { t: 'Si parte del lote ya está instalada, el Responsable de operaciones lanza la campaña de aviso y de simulacro según PR-QLT-010.', c: [['PR-QLT-006', 6, 'el Responsable de operaciones lanza la campaña de aviso y de simulacro según PR-QLT-010 (Simulacro de retirada y comunicación a clientes)']] }
        ],
        note: 'PR-QLT-010 (Simulacro de retirada y comunicación a clientes) no está entre los documentos indexados: los pasos de la campaña no se pueden detallar desde esta consulta.',
        followups: ['liberar']
      },
      {
        id: 'liberar', icon: 'unlock', topic: 'Retirada de producto · liberación de un lote', scope: 'local',
        q: '¿Quién puede liberar un lote retirado?',
        anchors: ['liberar', 'liberación', 'libera', 'liberarlo', 'desbloquear'],
        terms: ['quién', 'lote', 'retirado', 'bloqueado', 'devolver', 'destruir', 'autoriza', 'puede'],
        min: 3,
        blocks: [
          { t: 'Solo el Responsable de operaciones.', c: [['PR-QLT-006', 2, 'Responsable de operaciones: aprueba la campaña y es el único que libera un lote retirado.']] },
          { t: 'Las unidades en almacén se devuelven al fabricante o se destruyen con certificado.', c: [['PR-QLT-006', 7, 'Las unidades en almacén se devuelven al fabricante o se destruyen con certificado.']] },
          { t: 'Ningún lote se libera por vencimiento de plazo.', c: [['PR-QLT-006', 7, 'Ningún lote se libera por vencimiento de plazo.']] }
        ],
        followups: ['retirada', 'instalado']
      }
    ],

    /* Preguntas sobre otra sede cuando la respuesta sale de un documento del hub de Paterna (scope 'local'). */
    other_scopes: {
      topic: 'Otra sede',
      words: ['madrid', 'barcelona', 'sevilla', 'bilbao', 'málaga', 'zaragoza'],
      reason: 'Los documentos indexados sobre este tema son del hub de Paterna (Valencia); no hay evidencia para {x}.'
    },

    gaps: [
      { id: 'simulacro', topic: 'Simulacro y comunicación de retirada', anchors: ['simulacro', 'simulacros', 'simulacro de retirada', 'aviso masivo', 'comunicación masiva'],
        reason: 'Ningún documento indexado describe el simulacro ni los pasos de una campaña de aviso a clientes.', related: 'PR-QLT-010' },
      { id: 'cra', topic: 'Central receptora y fuerzas de seguridad', anchors: ['central receptora', 'cra', 'policía', 'policia', 'guardia civil', 'fuerzas de seguridad'],
        reason: 'Ningún documento indexado describe la actuación de la central receptora ni el aviso a las fuerzas de seguridad.' },
      { id: 'certificados', topic: 'Habilitación y certificaciones', anchors: ['certificado', 'certificados', 'certificación', 'certificaciones', 'iso', 'habilitación', 'homologación', 'auditoría', 'auditorías'],
        reason: 'Los certificados, la habilitación y los informes de auditoría de las marcas no están entre los documentos indexados.' },
      { id: 'subcontratas', topic: 'Subcontratas', anchors: ['subcontrata', 'subcontratas', 'subcontratar', 'subcontratación', 'externos'],
        reason: 'Ningún documento indexado trata la subcontratación de instalaciones o de mantenimiento.' },
      { id: 'precio', topic: 'Precios, descuentos y márgenes', anchors: ['precio', 'precios', 'cuesta', 'cuestan', 'descuento', 'descuentos', 'tarifa', 'tarifas', 'margen', 'comisión'],
        reason: 'Precios, descuentos y márgenes no forman parte de los procedimientos de Operaciones indexados.' },
      { id: 'personal', topic: 'Condiciones laborales', anchors: ['vacaciones', 'nómina', 'salario', 'sueldo', 'convenio', 'plantilla', 'despido', 'horario'],
        reason: 'Las condiciones laborales no forman parte de los procedimientos de Operaciones indexados.' }
    ]
  }
});

/* Resumen canónico por código (datos de procedimientos): se completa sin pisar lo que ya hayan puesto otros ficheros.
   PR-COM-003 lleva además los parámetros que usan otras escenas (umbrales de la caída de comunicación). */
(function (id) {
  'use strict';
  const pack = window.AGENTIC_INDUSTRIES[id];
  const procs = pack.procedures = pack.procedures || {};
  pack.procedimientos.docs.forEach((d) => {
    const cur = procs[d.code] = procs[d.code] || {};
    if (!cur.title) cur.title = d.title;
    if (!cur.summary) cur.summary = d.summary;
    if (!cur.version) cur.version = d.version;
  });
  const extra = {
    'PR-COM-003': {
      lost_comm_minutes: 10,
      mass_outage_panels: 50,
      priority_visit_hours: 24
    }
  };
  Object.keys(extra).forEach((code) => {
    const cur = procs[code] = procs[code] || {};
    Object.keys(extra[code]).forEach((k) => { if (cur[k] == null) cur[k] = extra[code][k]; });
  });
})('alarmas');
