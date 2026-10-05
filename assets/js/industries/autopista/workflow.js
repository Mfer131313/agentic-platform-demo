/* Autopista Multimotor · De palabras a workflow. Escenario de la demo con datos sintéticos (MFM).
 * Esquema documentado en la cabecera de assets/js/scenes/workflow.js. Regex sobre texto plegado (minúsculas, sin tildes).
 * El stock crítico se expresa como umbral descendente: el mínimo queda por encima del crítico. */
agenticPack('autopista', {
  workflow: {
    space: 'Operaciones · Madrid',
    author: 'decider',
    authorNoun: 'Operaciones',
    alarmMatch: 'stock|unidades disponibles|existencias|inventario',
    approverRoles: ['brand_manager', 'finance'],
    defaultPolicy: 'POL-OPS-015',
    approverRule: {
      policy: 'POL-OPS-015',
      text: 'solo Marca y Finanzas aprueban pedidos y retenciones',
      note: 'Reasignada: POL-OPS-015 reserva los pedidos y retenciones a Marca y Finanzas'
    },
    triggerExamples: '«Cuando el stock de un modelo baje de…» o «Cada día a las 07:00…»',
    rolePatterns: [
      ['brand_manager', '\\bgestor de marca\\b|\\bresponsable de marca\\b'],
      ['finance', '\\bresponsable de finanzas\\b|\\bfinanzas\\b'],
      ['sales_shift', '\\bjefe de turno de ventas\\b|\\bjefe de ventas\\b'],
      ['workshop_shift', '\\bjefe de taller\\b'],
      ['rental_shift', '\\bgestor de flota de alquiler\\b|\\bgestor de flota\\b'],
      ['subscription_shift', '\\bresponsable de suscripciones\\b'],
      ['customer_care', '\\bequipo de atencion al cliente\\b'],
      ['decider', '\\bresponsable de operaciones\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:compr(?:a|ar|e|en|as)|vend(?:e|er|a|an)|invert(?:ir)?|inviert(?:e|a|an))\\b[^.;]{0,50}\\b(?:acciones (?:de|en)\\b|bolsa|bitcoins?|criptomonedas?|divisas|fondos de inversion)|\\btransferencias? bancarias?\\b|\\btransferir dinero\\b',
        title: 'Operación financiera',
        body: 'El texto pide comprar o vender acciones o mover dinero. Ningún agente del espacio Operaciones · Madrid opera en mercados ni hace pagos, y Agentic Platform no crea pasos que no correspondan a un agente habilitado.'
      },
      {
        id: 'personas',
        re: '\\b(?:evalu\\w*|puntu\\w*|vigil\\w*|control\\w*|medir|mida|sancion\\w*|despid\\w*|rank\\w*)\\b[^.;]{0,40}\\b(?:trabajador\\w*|operari\\w*|emplead\\w*|plantilla|personal|personas|vendedor\\w*|mecanic\\w*)\\b',
        title: 'Evaluación de personas',
        body: 'El texto pide evaluar, vigilar o puntuar a personas. Los workflows de este espacio trabajan sobre vehículos, pedidos, contratos y casos de clientes; no valoran el desempeño de nadie.'
      },
      {
        id: 'control',
        re: '\\b(?:cambi\\w*|modific\\w*|ajust\\w*|baj(?:ar|e|a)|sub(?:ir|e|a))\\b[^.;]{0,30}\\b(?:precios?|tarifas?|tae|tipos? de interes|condiciones de financiacion)\\b',
        title: 'Cambio de precios o condiciones',
        body: 'El texto pide cambiar precios, tarifas o condiciones de financiación. Agentic Platform lee Salesforce, SAP y las ofertas de Banco Sabadell, pero no fija condiciones comerciales: esos cambios los aprueba Finanzas desde su sistema.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Disparador', 'Una alarma de stock en Odoo Inventario, un correo en el buzón de Atención al cliente o una hora fija.'],
      ['cpu', '', 'Pasos y sistemas', 'Qué agente hace cada paso y qué sistema consulta o actualiza: SAP ERP, Odoo Inventario, Salesforce CRM, iCare Taller o Slack.'],
      ['user-check', 'warn', 'Aprobación humana', 'Quién decide antes de pedir, retener o enviar, según POL-OPS-015.'],
      ['file-text', '', 'Salidas', 'Pedidos, casos, avisos e informes que deja el workflow.']
    ],
    idleNote: 'Cada elemento queda enlazado con la frase del texto de la que sale y se contrasta con los procedimientos de Operaciones antes de guardar el borrador.',
    presenter: {
      idle: [
        'Así escribe Operaciones un procedimiento: en castellano, como en su documento de proceso. No hay que dibujar ni programar nada.',
        'Agentic Platform lo convierte en un workflow de la plataforma: disparador, agentes en orden, aprobación humana y salidas, cada uno enlazado a su frase.',
        'Honestidad: el generador desde texto se simula aquí y su integración en Agentic Platform se valida en el piloto; los workflows (Routines), el editor, la aprobación y la auditoría son de serie.'
      ],
      outOfScopeExample: 'Compra acciones de un fabricante de coches cuando baje la bolsa'
    },

    templates: {
      alarma: {
        label: 'Stock crítico',
        icon: 'box',
        refs: 'POL-OPS-012 y POL-OPS-015',
        text: 'Cuando el stock disponible de un modelo en el hub de Madrid baje de 5 unidades durante más de 24 horas, localizar las reservas y las entregas planificadas de ese modelo y los clientes en espera. Proponer un pedido urgente de reposición a la marca en SAP ERP y reservar la unidad restante en Odoo Inventario, que debe aprobar el Gestor de marca antes de aplicarse. Si el stock baja de 2 unidades, tratarlo como crítico. Una vez aprobado el pedido, abrir una incidencia en Salesforce con el resumen del caso y avisar por Slack al Jefe de turno de ventas para reprogramar las entregas afectadas.'
      },
      reclamacion: {
        label: 'Reclamación',
        icon: 'mail',
        refs: 'POL-FIN-020',
        text: 'Cuando llegue al buzón de Atención al cliente una reclamación de un cliente por una discrepancia en la financiación, registrarla en Salesforce (cliente, vehículo, contrato, importe reclamado y plazo de respuesta) y enviar el acuse de recibo en 24 h. Trazar el vehículo y el contrato (VIN, pedido de venta, oferta firmada en DocuSign y condiciones de Banco Sabadell). Preparar el borrador del informe de revisión según POL-FIN-020, con las reclamaciones similares de los últimos 12 meses, y la respuesta al cliente en su idioma. La respuesta la aprueba el Responsable de finanzas antes de enviarla; el informe de revisión se entrega en 5 días hábiles.'
      },
      parte: {
        label: 'Parte diario',
        icon: 'activity',
        refs: 'POL-OPS-015 y POL-OPS-031',
        text: 'Cada día a las 07:00, revisar en iCare Taller, Odoo Inventario y Salesforce CRM el estado del hub de Madrid (vehículos disponibles por marca, órdenes de taller en cola, flota de alquiler, suscripciones y entregas del día) y compararlo con los umbrales de operaciones. Para cada indicador en aviso o crítico, abrir un ticket con la acción recomendada, sin duplicar los tickets que ya estén abiertos. Si un vehículo de alquiler afectado por el recall ABS de Volkswagen (REC-VW-2026-001) sigue pendiente de paso por taller, proponer su retención hasta que pase por taller, que debe aprobar el Gestor de marca. Publicar el resumen del parte en el canal de Slack de Operaciones.'
      }
    },

    catalog: {
      cold_chain_monitor: {
        agent: 'Monitor de stock', icon: 'box', systems: ['Odoo Inventario', 'SAP ERP'],
        what: 'Lee el stock disponible del modelo, confirma que baja del mínimo y lo clasifica',
        name: 'Stock crítico de un modelo', verb: 'revisar el stock', token: 'stock',
        keywords: ['\\bstock\\b', '\\bunidades disponibles\\b', '\\bexistencias\\b', '\\bbaje de \\d+ unidades\\b'],
        strong: ['\\bconfirm\\w*', '\\bclasific\\w*', '\\bmedir\\b', '\\bvigil\\w*']
      },
      complaint_intake: {
        agent: 'Entrada de reclamaciones', icon: 'mail', systems: ['Correo', 'Salesforce CRM'],
        what: 'Registra la reclamación y extrae cliente, vehículo, contrato, importe y plazo',
        name: 'Reclamación de cliente', verb: 'registrar la reclamación', token: 'reclamacion',
        keywords: ['\\breclam\\w*', '\\bquej\\w*', '\\bdiscrepancia\\b'],
        strong: ['\\bregistr\\w*', '\\bextraer\\b', '\\bdar de alta\\b']
      },
      ec_plant_monitor: {
        agent: 'Parte diario de operaciones', icon: 'activity', systems: ['iCare Taller', 'Odoo Inventario', 'Salesforce CRM'], multi: 2,
        what: 'Compara los indicadores del hub con los umbrales y abre tickets sin duplicar los abiertos',
        name: 'Parte diario de operaciones', verb: 'hacer el parte del hub', token: 'parte-hub',
        keywords: ['\\bparte diario\\b', '\\bestado del hub\\b', '\\bindicador(?:es)?\\b', '\\bumbrales de operaciones\\b', '\\btickets? con la accion\\b', '\\btickets? que ya\\b'],
        strong: ['\\brevis(?:ar|a|e)\\b', '\\bindicador(?:es)?\\b', '\\bticket\\w*']
      },
      campaign_planner: {
        agent: 'Plan de entregas', icon: 'calendar', systems: ['Salesforce CRM', 'SAP ERP'],
        what: 'Compara las entregas previstas con la disponibilidad de unidades y la preparación en taller',
        name: 'Plan de entregas', verb: 'planificar las entregas', token: 'plan-entregas',
        keywords: ['\\bplan de entregas\\b', '\\bmatriculacion\\w*', '\\bpreparacion de entregas\\b'],
        strong: ['\\bplanific\\w*']
      },
      lot_traceability: {
        agent: 'Trazabilidad de vehículos', icon: 'git-branch', systems: ['SAP ERP', 'Odoo Inventario', 'Salesforce CRM'],
        what: 'Localiza reservas, pedidos, contratos y entregas de un vehículo o modelo, hacia atrás y hacia delante',
        name: 'Trazabilidad de vehículos', verb: 'trazar vehículos', token: 'traza',
        keywords: ['\\btrazab\\w*', '\\btraz(?:a|ar|alo|ala|alos|alas|ado|ados|ada|adas)\\b', '\\b(?:localiz|identific)\\w*\\s+(?:los\\s+|las\\s+)?(?:reservas|entregas|pedidos|vehiculos|contratos)\\b', '\\bvin\\b', '\\bhacia (?:atras|delante)\\b'],
        strong: ['\\btraz(?:a|ar|alo|ala|alos|alas)\\b', '\\btrazab\\w*', '\\blocaliz\\w*', '\\bidentific\\w*']
      },
      quality_hold: {
        agent: 'Pedido o retención', icon: 'lock', systems: ['SAP ERP', 'Odoo Inventario'], hitl: true, restricted: true, gateVerb: 'aplicar el pedido',
        what: 'Propone el pedido urgente o la retención del vehículo y solo los aplica tras la aprobación',
        name: 'Pedido o retención', verb: 'pedir o retener', token: 'pedido',
        keywords: ['\\bpedido urgente\\b', '\\bbloque\\w*', '\\breten\\w*', '\\bretien\\w*', '\\bcuarentena\\b', '\\binmoviliz\\w*'],
        strong: ['\\bpedido urgente\\b', '\\bbloque\\w*', '\\breten\\w*', '\\bretien\\w*', '\\binmoviliz\\w*', '\\bcuarentena\\b']
      },
      quality_incident: {
        agent: 'Incidencias', icon: 'clipboard', systems: ['Salesforce CRM', 'Slack'],
        what: 'Abre la incidencia con el resumen del caso y envía los avisos',
        name: 'Incidencia de operaciones', verb: 'abrir incidencia', token: 'incidencia',
        keywords: ['\\bincidencias?\\b', '\\binforme\\b', '\\bavis(?:ar|e|a|en)\\b', '\\bnotific(?:ar|a|e|en)\\b', '\\bpublic\\w* el resumen\\b'],
        strong: ['\\bincidencias?\\b', '\\binforme\\b', '\\bpublic\\w* el resumen\\b', '\\bavis(?:ar|e|a|en)\\b']
      },
      notifier: {
        agent: 'Respuesta al cliente', icon: 'send', systems: ['Correo'], hitl: true, gateVerb: 'enviar la respuesta',
        what: 'Redacta la respuesta en el idioma del cliente y la envía tras aprobarla',
        name: 'Respuesta al cliente', verb: 'responder al cliente', token: 'respuesta',
        keywords: ['\\brespuesta al cliente\\b', '\\bresponder al cliente\\b', '\\bcontestar al cliente\\b'],
        strong: ['\\brespuesta al cliente\\b', '\\bresponder al cliente\\b', '\\bcontestar al cliente\\b']
      }
    },

    domains: {
      alarma: {
        first: 'cold_chain_monitor',
        slug: 'wf-stock-critico-modelo',
        name: 'Stock crítico de un modelo',
        approver: 'brand_manager',
        approverOptions: ['brand_manager', 'finance'],
        policy: 'POL-OPS-015',
        go: 'alarma',
        goLabel: 'Probarlo con la alarma del BMW X3',
        next: 'La próxima alarma de stock de Odoo Inventario lo ejecuta. La del BMW X3 20d (1 unidad) de las 07:30 sigue abierta.',
        trigger: {
          system: 'Odoo Inventario', type: 'stock', icon: 'box', badges: ['Odoo Inventario'],
          label: 'Stock < {threshold}', sub: 'más de {hours}',
          entry: 'Alarma de stock de Odoo Inventario recibida por webhook',
          full: 'Stock disponible < {threshold} durante más de {hours}'
        },
        steps: {
          cold_chain_monitor: { sub: 'Crítico < {critical}', what: 'Lee el stock disponible del modelo, confirma que baja del mínimo y lo clasifica (crítico por debajo de {critical})' },
          lot_traceability: { sub: 'Reservas y entregas', what: 'Reservas, entregas planificadas y clientes en espera de ese modelo, como el BMW X3 20d de José María López' },
          quality_hold: { sub: 'Tras aprobar', what: 'Propone el pedido urgente de reposición a la marca; se aplica en SAP ERP y se reserva la unidad en Odoo Inventario solo tras la aprobación', outputs: [{ icon: 'lock', text: 'Pedido urgente en SAP ERP y unidad restante reservada en Odoo Inventario, tras aprobar' }] },
          quality_incident: { sub: 'Caso y aviso', systems: ['Salesforce CRM', 'Slack'], what: 'Abre la incidencia en Salesforce con el resumen del caso y avisa {al:notify} para reprogramar las entregas afectadas', outputs: [{ icon: 'clipboard', text: 'Incidencia en Salesforce con el resumen del caso' }, { icon: 'message-square', text: 'Aviso por Slack {al:notify}' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Informe de incidencia (PDF) con el registro de auditoría' }],
        params: [
          { key: 'threshold', label: 'Stock mínimo', name: 'Stock mínimo', type: 'number', unit: 'uds', unitLong: 'unidades', min: 1, max: 30, step: 1, value: 5, integer: true, above: 'critical', ref: 'POL-OPS-012', hint: 'POL-OPS-012: 5 unidades', extract: { from: 'trigger', re: '(\\d{1,2})\\s*(?:unidades|uds)\\b' } },
          { key: 'hours', label: 'Durante más de', name: 'Tiempo por debajo del mínimo', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'POL-OPS-012', hint: 'POL-OPS-012: 24 h', extract: { from: 'text', re: '(\\d{1,3})\\s*horas\\b' } },
          { key: 'critical', label: 'Stock crítico', name: 'Stock crítico', type: 'number', unit: 'uds', unitLong: 'unidades', min: 0, max: 10, step: 1, value: 2, integer: true, below: 'threshold', ref: 'POL-OPS-012', hint: 'POL-OPS-012: 2 unidades', hl: 'Crítico', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,2})\\s*(?:unidades|uds)\\b' } },
          { key: 'approver', label: 'Aprueba el pedido', ref: 'POL-OPS-015', hint: 'POL-OPS-015: solo Marca y Finanzas aprueban pedidos' },
          { key: 'notify', label: 'Aviso a', name: 'Aviso', type: 'role', value: 'sales_shift', options: ['sales_shift', 'workshop_shift', 'customer_care'], ref: 'Política', hint: 'Por Slack, para reprogramar entregas', extract: { kind: 'role', cap: 'quality_incident' } }
        ],
        check: { id: 'umbral', ref: 'POL-OPS-012', keys: ['threshold', 'hours'], label: 'Umbral y tiempo', describe: 'menos de {threshold} durante más de {hours}', extra: 'crítico por debajo de {critical}', action: 'Contrasta los umbrales con POL-OPS-012' },
        scenarios: [
          'el stock disponible de un modelo en el hub de Madrid baja de {threshold} durante más de {hours}',
          'salta una alarma de stock de un modelo de BMW, Audi, Volkswagen, Skoda o Seat (p. ej. el BMW X3 20d)',
          'el usuario informa de que quedan pocas unidades de un modelo',
          'hay que valorar las reservas y entregas afectadas por un stock crítico'
        ],
        testUtterance: 'Alarma: el BMW X3 20d tiene 1 unidad disponible en Madrid desde hace 30 horas',
        matchGroups: [
          { re: '\\bstock\\b|\\bunidades?\\b|\\bmodelo\\b|\\bx3\\b|\\bvin-\\d{4}', w: 0.3, label: 'stock' },
          { re: '\\bdisponibles?\\b|\\bquedan?\\b|\\bagot\\w*|\\bcritic\\w*|\\bbaja\\w*', w: 0.3, label: 'disponibilidad' },
          { re: '\\balarma\\w*|\\bsupera\\w*|\\bbajo\\b|\\bdesde hace\\b|\\bpierd\\w*', w: 0.25, label: 'alarma' },
          { re: '\\bmadrid\\b', w: 0.07, label: 'Madrid' }
        ],
        config: {
          cold_chain_monitor: [['stock_minimo_uds', '{=threshold}'], ['horas_por_debajo', '{=hours}'], ['stock_critico_uds', '{=critical}'], ['ambito', 'Modelos de BMW, Audi, Volkswagen, Skoda y Seat del hub de Madrid']],
          quality_hold: [['aprobador', '{approver}'], ['politica', 'POL-OPS-015']],
          quality_incident: [['plantilla', 'Incidencia de stock'], ['aviso_a', '{notify}'], ['canal', 'Slack']]
        },
        say: {
          draft: [
            'Cada frase está enlazada con lo que ha entendido: el disparador sale de «baje de {threshold} durante más de {hours}».',
            'Cada paso dice qué sistema toca: Odoo Inventario para el stock; SAP ERP y Salesforce para reservas y entregas; SAP ERP para el pedido; Salesforce y Slack para la incidencia.',
            'El pedido no se aplica sin la aprobación de Marca: lo exige POL-OPS-015 y el workflow lo respeta aunque el texto no lo dijera.'
          ],
          published: ['Desde ahora, una alarma de stock de Odoo Inventario lo dispara sola. Lo vemos con la alarma real de esta mañana: BMW X3 20d, 07:30.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-financiacion',
        name: 'Reclamación de cliente por discrepancia en la financiación',
        approver: 'finance',
        approverOptions: ['finance', 'brand_manager'],
        policy: 'POL-FIN-020',
        go: 'reclamacion',
        goLabel: 'Probarlo con la reclamación CLM-2026-001',
        next: 'El próximo correo de reclamación lo ejecuta. La reclamación CLM-2026-001 (TAE 3,99 % frente a 4,25 %) está escalada a Finanzas.',
        trigger: {
          system: 'Correo', type: 'correo', icon: 'mail', badges: ['Correo'],
          label: 'Reclamación en el buzón de Atención al cliente', sub: 'por financiación',
          entry: 'Buzón de Atención al cliente',
          full: 'Reclamación de cliente en el buzón de Atención al cliente por una discrepancia en la financiación'
        },
        steps: {
          complaint_intake: { sub: 'Acuse en {ack}', what: 'Registra la reclamación en Salesforce, extrae cliente, vehículo, contrato, importe y plazo, y envía el acuse de recibo en {ack}', outputs: [{ icon: 'clipboard', text: 'Reclamación registrada en Salesforce con sus datos extraídos' }] },
          lot_traceability: { sub: 'Traza completa', what: 'Traza el vehículo y el contrato: VIN, pedido de venta en SAP, oferta firmada en DocuSign y condiciones de Banco Sabadell', outputs: [{ icon: 'git-branch', text: 'Traza del vehículo con VIN, pedido y contrato firmado' }] },
          quality_incident: { sub: 'Informe en {days}', systems: ['Salesforce CRM', 'Procedimientos'], what: 'Prepara el borrador del informe de revisión (POL-FIN-020) con las reclamaciones similares de los últimos {months}', outputs: [{ icon: 'file-text', text: 'Borrador del informe de revisión (POL-FIN-020), a entregar en {days}' }] },
          notifier: { sub: 'Tras aprobar', what: 'Redacta la respuesta en el idioma del cliente; se envía por correo solo después de aprobarla', outputs: [{ icon: 'send', text: 'Respuesta al cliente, enviada tras la aprobación' }] }
        },
        params: [
          { key: 'ack', label: 'Acuse de recibo', name: 'Acuse de recibo', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'POL-FIN-020', hint: 'POL-FIN-020: 24 h', extract: { from: 'text', re: '\\bacuse de recibo\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|horas)\\b' } },
          { key: 'days', label: 'Informe de revisión', name: 'Plazo del informe', type: 'number', unit: 'días', unitLong: 'días hábiles', min: 1, max: 30, step: 1, value: 5, integer: true, ref: 'POL-FIN-020', hint: 'POL-FIN-020: 5 días hábiles', hl: 'Plazo del informe', extract: { from: 'text', re: '(\\d{1,2})\\s*dias habiles\\b' } },
          { key: 'months', label: 'Histórico de reclamaciones', name: 'Histórico de reclamaciones', type: 'number', unit: 'meses', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Política', hint: 'Histórico de Salesforce', hl: 'Histórico', extract: { from: 'text', re: '(\\d{1,2})\\s*meses\\b' } },
          { key: 'approver', label: 'Aprueba la respuesta', ref: 'POL-FIN-020', hint: 'Antes de enviar nada al cliente' }
        ],
        check: { id: 'plazos', ref: 'POL-FIN-020', keys: ['ack', 'days'], label: 'Plazos', describe: 'acuse en {ack} e informe en {days}', action: 'Contrasta los plazos con POL-FIN-020' },
        scenarios: [
          'llega al buzón de Atención al cliente la reclamación de un cliente por una discrepancia en la financiación de su vehículo',
          'un cliente se queja de que la TAE de la factura no coincide con la del contrato y hay que revisar el expediente',
          'hay que registrar una reclamación de cliente como caso en Salesforce'
        ],
        testUtterance: 'Nos ha llegado una reclamación de Roberto García: el contrato de su BMW X5 40d dice una TAE del 3,99 % y la factura el 4,25 %',
        matchGroups: [
          { re: '\\breclam\\w*|\\bquej\\w*', w: 0.35, label: 'reclamación' },
          { re: '\\bclientes?\\b', w: 0.2, label: 'cliente' },
          { re: '\\btae\\b|\\bfinanciacion\\b|\\bfactura\\b|\\bapr\\b|\\bintereses?\\b|\\bdiscrepancia\\w*|\\bsobrecoste\\b', w: 0.25, label: 'financiación' },
          { re: '\\bvehiculos?\\b|\\bcontratos?\\b|\\bvin-\\d{4}|\\bclm-\\d{4}', w: 0.12, label: 'vehículo' }
        ],
        config: {
          complaint_intake: [['acuse_horas', '{=ack}'], ['sistema', 'Salesforce CRM']],
          quality_incident: [['plantilla', 'Informe de revisión · POL-FIN-020'], ['plazo_dias_habiles', '{=days}'], ['historico_meses', '{=months}']],
          notifier: [['idioma', 'el del cliente'], ['aprobador', '{approver}']]
        },
        say: {
          draft: [
            'Cada frase del texto está enlazada con lo que ha entendido: el correo al buzón de Atención al cliente dispara el workflow y los plazos salen del propio texto.',
            'La traza llega al VIN, al pedido de venta, a la oferta firmada en DocuSign y a las condiciones de Banco Sabadell, y el informe se prepara con las reclamaciones similares.',
            'Nada sale hacia el cliente sin la aprobación del {approver}; la respuesta se redacta en el idioma del cliente.'
          ],
          published: ['El próximo correo de reclamación lo ejecuta solo. Lo vemos con la reclamación CLM-2026-001.']
        }
      },
      parte: {
        first: 'ec_plant_monitor',
        slug: 'wf-parte-diario-hub',
        name: 'Parte diario de operaciones · Madrid',
        approver: 'brand_manager',
        approverOptions: ['brand_manager', 'finance'],
        policy: 'POL-OPS-015',
        go: 'turno',
        goLabel: 'Ver el parte diario del turno',
        next: 'Se ejecuta cada día a las {time}.',
        trigger: {
          system: 'Programado', type: 'programado', icon: 'clock', badges: [],
          label: 'Cada día a las {time}', sub: 'Programado',
          entry: 'Programación diaria del servidor · {time}'
        },
        steps: {
          ec_plant_monitor: { sub: '12 indicadores', what: 'Lee iCare Taller, Odoo Inventario y Salesforce, compara 12 indicadores del hub con los umbrales de operaciones y abre tickets sin duplicar los abiertos', outputs: [{ icon: 'ticket', text: 'Tickets de operaciones, sin duplicar los ya abiertos' }] },
          quality_hold: { sub: 'Si hay recall', gateVerb: 'retener vehículos', what: 'Si un vehículo de alquiler afectado por el recall ABS de Volkswagen (REC-VW-2026-001) sigue pendiente de taller, propone retenerlo hasta que pase por taller (POL-OPS-031)', outputs: [{ icon: 'lock', text: 'Retención de vehículos de alquiler afectados por el recall, tras aprobar' }] },
          quality_incident: { sub: 'Resumen en Slack', systems: ['Slack'], what: 'Publica el resumen del parte en el canal «Operaciones · Madrid»', outputs: [{ icon: 'message-square', text: 'Resumen en el canal de Slack «Operaciones · Madrid»' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Parte diario de operaciones (PDF)' }],
        params: [
          { key: 'time', label: 'Hora del parte', name: 'Hora del parte', type: 'time', value: '07:00', ref: 'Política', hint: 'Lecturas de iCare, Odoo y Salesforce', extract: { kind: 'time' } },
          { key: 'approver', label: 'Aprueba la retención', ref: 'POL-OPS-015', hint: 'POL-OPS-015 · POL-OPS-031' }
        ],
        staticChecks: [
          { id: 'recall', text: 'Recall ABS de Volkswagen: los Golf de alquiler afectados no salen hasta pasar por taller (POL-OPS-031)', stream: { action: 'Contrasta el parte con POL-OPS-031', result: 'REC-VW-2026-001: 35 de 47 unidades pendientes; fecha límite 2026-11-15' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bsin duplicar\\b', label: 'Regla', check: 'Tickets sin duplicar los que ya estén abiertos' }],
        scenarios: [
          'son las {time} y toca el parte diario de operaciones del hub de Madrid',
          'el usuario pide el parte diario del hub',
          'el usuario pregunta qué indicadores de operaciones están en aviso hoy'
        ],
        testUtterance: 'Haz el parte diario del hub de Madrid',
        matchGroups: [
          { re: '\\bparte\\b', w: 0.35, label: 'parte' },
          { re: '\\bhub\\b|\\boperaciones\\b|\\btaller\\b|\\bindicadores?\\b|\\bflota\\b', w: 0.3, label: 'operaciones' },
          { re: '\\bdiario\\b|\\bhoy\\b|\\bturno\\b', w: 0.15, label: 'diario' },
          { re: '\\bmadrid\\b', w: 0.1, label: 'Madrid' }
        ],
        config: {
          ec_plant_monitor: [['hora', '{time}'], ['sistemas', '3'], ['indicadores', '12'], ['tickets', 'sin duplicar los ya abiertos']],
          quality_hold: [['aprobador', '{approver}'], ['politica', 'POL-OPS-015 · POL-OPS-031']],
          quality_incident: [['canal', 'Slack · Operaciones · Madrid']]
        },
        say: {
          draft: [
            'El parte es programado: cada día a las {time}, sin que nadie lo pida.',
            'Abre tickets solo para lo que no tenga ya uno abierto, y retiene vehículos solo con la aprobación del {approver}.'
          ],
          published: ['Mañana a las {time} lo ejecuta solo; el de hoy está en el resumen del turno.']
        }
      }
    }
  }
});
