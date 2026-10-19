/* Guardián Ibérica Instalaciones · De palabras a workflow. Escenario de la demo con datos sintéticos (MFM).
 * Esquema documentado en la cabecera de assets/js/scenes/workflow.js. Regex sobre texto plegado (minúsculas, sin tildes).
 * La criticidad es un umbral ascendente: el crítico queda por encima del umbral de aviso. */
agenticPack('alarmas', {
  workflow: {
    space: 'Operaciones · Paterna',
    author: 'decider',
    authorNoun: 'Operaciones',
    alarmMatch: 'comunicacion|paneles|supervision remota|sin conexion',
    approverRoles: ['support_shift', 'decider'],
    defaultPolicy: 'PR-COM-003',
    approverRule: {
      policy: 'PR-COM-003',
      text: 'solo Soporte técnico y Operaciones aprueban conmutaciones y visitas prioritarias',
      note: 'Reasignada: PR-COM-003 reserva las conmutaciones y las visitas prioritarias a Soporte técnico y Operaciones'
    },
    triggerExamples: '«Cuando más de 40 paneles pierdan la comunicación…» o «Cada día a las 07:00…»',
    rolePatterns: [
      ['support_shift', '\\bresponsable de soporte tecnico\\b|\\bsoporte tecnico\\b'],
      ['install_shift', '\\bjefe de instalaciones\\b'],
      ['maintenance_shift', '\\bjefe de mantenimiento\\b'],
      ['warehouse_shift', '\\bresponsable de almacen\\b'],
      ['compliance', '\\bdpo\\b|\\bresponsable de cumplimiento\\b'],
      ['finance', '\\bresponsable de finanzas\\b|\\bfinanzas\\b'],
      ['customer_care', '\\batencion al cliente\\b'],
      ['decider', '\\bresponsable de operaciones\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:compr(?:a|ar|e|en|as)|vend(?:e|er|a|an)|invert(?:ir)?|inviert(?:e|a|an))\\b[^.;]{0,50}\\b(?:acciones (?:de|en)\\b|bolsa|bitcoins?|criptomonedas?|divisas|fondos de inversion)|\\btransferencias? bancarias?\\b|\\btransferir dinero\\b',
        title: 'Operación financiera',
        body: 'El texto pide comprar o vender acciones o mover dinero. Ningún agente del espacio Operaciones · Paterna opera en mercados ni hace pagos, y Agentic Platform no crea pasos que no correspondan a un agente habilitado.'
      },
      {
        id: 'personas',
        re: '\\b(?:evalu\\w*|puntu\\w*|vigil\\w*|control\\w*|medir|mida|sancion\\w*|despid\\w*|rank\\w*)\\b[^.;]{0,40}\\b(?:trabajador\\w*|operari\\w*|emplead\\w*|plantilla|personal|personas|tecnic\\w*|instalador\\w*|operador\\w*)\\b',
        title: 'Evaluación de personas',
        body: 'El texto pide evaluar, vigilar o puntuar a personas. Los workflows de este espacio trabajan sobre paneles, instalaciones, órdenes de trabajo y casos de clientes; no valoran el desempeño de nadie.'
      },
      {
        id: 'control',
        re: '\\b(?:cambi\\w*|modific\\w*|ajust\\w*|baj(?:ar|e|a)|sub(?:ir|e|a))\\b[^.;]{0,30}\\b(?:precios?|tarifas?|cuotas?|penalizacion\\w*|condiciones del contrato)\\b',
        title: 'Cambio de precios o condiciones',
        body: 'El texto pide cambiar precios, cuotas o condiciones contractuales. Agentic Platform lee Salesforce, SAP y los portales de partner, pero no fija condiciones comerciales: esos cambios los aprueba Finanzas desde su sistema.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Disparador', 'Una alarma de comunicación del Verisure Partner Portal, un correo en el buzón de Atención al cliente o una hora fija.'],
      ['cpu', '', 'Pasos y sistemas', 'Qué agente hace cada paso y qué sistema consulta o actualiza: Salesforce CRM, SAP Business One, los portales de partner, Twilio SMS o Slack.'],
      ['user-check', 'warn', 'Aprobación humana', 'Quién decide antes de conmutar, visitar o enviar, según PR-COM-003.'],
      ['file-text', '', 'Salidas', 'Órdenes de trabajo, casos, avisos e informes que deja el workflow.']
    ],
    idleNote: 'Cada elemento queda enlazado con la frase del texto de la que sale y se contrasta con los procedimientos de Operaciones antes de guardar el borrador.',
    presenter: {
      idle: [
        'Así escribe Operaciones un procedimiento: en castellano, como en su documento de proceso. No hay que dibujar ni programar nada.',
        'Agentic Platform lo convierte en un workflow de la plataforma: disparador, agentes en orden, aprobación humana y salidas, cada uno enlazado a su frase.',
        'Honestidad: el generador desde texto se simula aquí y su integración en Agentic Platform se valida en el piloto; los workflows (Routines), el editor, la aprobación y la auditoría son de serie.'
      ],
      outOfScopeExample: 'Compra acciones de un fabricante de sensores cuando baje la bolsa'
    },

    templates: {
      alarma: {
        label: 'Pérdida de comunicación',
        icon: 'activity',
        refs: 'PR-COM-003',
        text: 'Cuando más de 40 paneles pierdan la comunicación 4G durante más de 10 minutos, localizar los paneles afectados, su marca (Verisure, Sector Alarm o Prosegur Alarmas), su cliente y si tienen vía de respaldo IP. Proponer la conmutación a la vía de respaldo y una visita prioritaria a los paneles sin respaldo, que debe aprobar el Responsable de soporte técnico antes de aplicarse. Si pierden la comunicación más de 150 paneles, tratarlo como crítico. Una vez aprobada la propuesta, abrir una incidencia en Salesforce con el resumen del caso, avisar por Slack al Jefe de mantenimiento para despachar las visitas y mandar un SMS a los clientes afectados.'
      },
      reclamacion: {
        label: 'Reclamación',
        icon: 'mail',
        refs: 'PR-SOP-007',
        text: 'Cuando llegue al buzón de Atención al cliente una reclamación de un cliente por cargos de desplazamiento de vigilante, registrarla en Salesforce (cliente, contrato, importe reclamado y plazo de respuesta) y enviar el acuse de recibo en 24 h. Trazar la instalación y el contrato (panel, sensores, historial de falsas alarmas y avisos de batería, y cargos del partner). Preparar el borrador del informe de revisión según PR-SOP-007, con las reclamaciones similares de los últimos 12 meses, y la respuesta al cliente en su idioma. La respuesta la aprueba el Responsable de finanzas antes de enviarla; el informe de revisión se entrega en 10 días hábiles.'
      },
      parte: {
        label: 'Parte diario',
        icon: 'activity',
        refs: 'PR-MAN-004 y PR-QLT-006',
        text: 'Cada día a las 07:00, revisar en Salesforce CRM, SAP Business One y Samsara Flota el estado del hub de Paterna (instalaciones programadas, mantenimientos preventivos, órdenes urgentes, stock en almacén y furgonetas disponibles) y compararlo con los umbrales de operaciones. Para cada indicador en aviso o crítico, abrir un ticket con la acción recomendada, sin duplicar los tickets que ya estén abiertos. Si un detector del lote PIR-2607-A de la campaña REC-2026-1019 sigue en almacén o instalado sin visita, proponer su retención hasta que pase la revisión, que debe aprobar el Responsable de soporte técnico. Publicar el resumen del parte en el canal de Slack de Operaciones.'
      }
    },

    catalog: {
      cold_chain_monitor: {
        agent: 'Monitor de comunicación', icon: 'activity', systems: ['Verisure Partner Portal', 'Sector Alarm Partner Hub', 'Prosegur Partner Portal'],
        what: 'Lee los paneles sin comunicación, confirma que superan el umbral y lo clasifica',
        name: 'Pérdida de comunicación de paneles', verb: 'revisar la comunicación', token: 'comunicacion',
        keywords: ['\\bpaneles?\\b', '\\bcomunicacion\\b', '\\bsupervision remota\\b', '\\bpierd\\w* la comunicacion\\b'],
        strong: ['\\bconfirm\\w*', '\\bclasific\\w*', '\\bmedir\\b', '\\bvigil\\w*']
      },
      complaint_intake: {
        agent: 'Entrada de reclamaciones', icon: 'mail', systems: ['Correo', 'Salesforce CRM'],
        what: 'Registra la reclamación y extrae cliente, contrato, importe y plazo',
        name: 'Reclamación de cliente', verb: 'registrar la reclamación', token: 'reclamacion',
        keywords: ['\\breclam\\w*', '\\bquej\\w*', '\\bcargos?\\b'],
        strong: ['\\bregistr\\w*', '\\bextraer\\b', '\\bdar de alta\\b']
      },
      ec_plant_monitor: {
        agent: 'Parte diario de operaciones', icon: 'activity', systems: ['Salesforce CRM', 'SAP Business One', 'Samsara Flota'], multi: 2,
        what: 'Compara los indicadores del hub con los umbrales y abre tickets sin duplicar los abiertos',
        name: 'Parte diario de operaciones', verb: 'hacer el parte del hub', token: 'parte-hub',
        keywords: ['\\bparte diario\\b', '\\bestado del hub\\b', '\\bindicador(?:es)?\\b', '\\bumbrales de operaciones\\b', '\\btickets? con la accion\\b', '\\btickets? que ya\\b'],
        strong: ['\\brevis(?:ar|a|e)\\b', '\\bindicador(?:es)?\\b', '\\bticket\\w*']
      },
      campaign_planner: {
        agent: 'Plan de visitas', icon: 'calendar', systems: ['Salesforce CRM', 'Samsara Flota'],
        what: 'Compara las visitas previstas con los técnicos disponibles y las furgonetas de cada zona',
        name: 'Plan de visitas', verb: 'planificar las visitas', token: 'plan-visitas',
        keywords: ['\\bplan de visitas\\b', '\\bplanificacion de visitas\\b', '\\bruta\\w* de tecnicos\\b'],
        strong: ['\\bplanific\\w*']
      },
      lot_traceability: {
        agent: 'Trazabilidad de instalaciones', icon: 'git-branch', systems: ['Salesforce CRM', 'SAP Business One', 'Verisure Partner Portal', 'Sector Alarm Partner Hub', 'Prosegur Partner Portal'],
        what: 'Localiza paneles, sensores, contratos y clientes de una instalación o lote, hacia atrás y hacia delante',
        name: 'Trazabilidad de instalaciones', verb: 'trazar instalaciones', token: 'traza',
        keywords: ['\\btrazab\\w*', '\\btraz(?:a|ar|alo|ala|alos|alas|ado|ados|ada|adas)\\b', '\\b(?:localiz|identific)\\w*\\s+(?:los\\s+|las\\s+)?(?:paneles|sensores|contratos|clientes|instalaciones|detectores)\\b', '\\bhacia (?:atras|delante)\\b'],
        strong: ['\\btraz(?:a|ar|alo|ala|alos|alas)\\b', '\\btrazab\\w*', '\\blocaliz\\w*', '\\bidentific\\w*']
      },
      quality_hold: {
        agent: 'Conmutación o visita', icon: 'lock', systems: ['Verisure Partner Portal', 'Sector Alarm Partner Hub', 'Prosegur Partner Portal', 'SAP Business One'], hitl: true, restricted: true, gateVerb: 'aplicar la conmutación',
        what: 'Propone la conmutación a la vía de respaldo, la visita prioritaria o la retención del equipo y solo las aplica tras la aprobación',
        name: 'Conmutación, visita o retención', verb: 'conmutar, visitar o retener', token: 'conmutacion',
        keywords: ['\\bconmut\\w*', '\\bvisita prioritaria\\b', '\\bvia de respaldo\\b', '\\bbloque\\w*', '\\breten\\w*', '\\bretien\\w*', '\\bcuarentena\\b', '\\binmoviliz\\w*'],
        strong: ['\\bconmut\\w*', '\\bvisita prioritaria\\b', '\\bbloque\\w*', '\\breten\\w*', '\\bretien\\w*', '\\binmoviliz\\w*', '\\bcuarentena\\b']
      },
      quality_incident: {
        agent: 'Incidencias', icon: 'clipboard', systems: ['Salesforce CRM', 'Slack', 'Twilio SMS'],
        what: 'Abre la incidencia con el resumen del caso y envía los avisos',
        name: 'Incidencia de operaciones', verb: 'abrir incidencia', token: 'incidencia',
        keywords: ['\\bincidencias?\\b', '\\binforme\\b', '\\bavis(?:ar|e|a|en)\\b', '\\bnotific(?:ar|a|e|en)\\b', '\\bpublic\\w* el resumen\\b', '\\bsms\\b'],
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
        slug: 'wf-perdida-comunicacion-paneles',
        name: 'Pérdida de comunicación de paneles',
        approver: 'support_shift',
        approverOptions: ['support_shift', 'decider'],
        policy: 'PR-COM-003',
        go: 'alarma',
        goLabel: 'Probarlo con la alarma de Valencia Norte',
        next: 'La próxima alarma de comunicación de los portales de partner lo ejecuta. La de Valencia Norte (ALM-COM-0611) de las 05:50 sigue abierta.',
        trigger: {
          system: 'Verisure Partner Portal', type: 'comunicacion', icon: 'activity', badges: ['Verisure Partner Portal', 'Sector Alarm Partner Hub'],
          label: 'Paneles sin comunicación > {threshold}', sub: 'más de {minutes}',
          entry: 'Alarma de comunicación recibida por webhook del portal de partner',
          full: 'Más de {threshold} paneles sin comunicación 4G durante más de {minutes}'
        },
        steps: {
          cold_chain_monitor: { sub: 'Crítica > {critical}', what: 'Lee los paneles sin comunicación 4G, confirma el corte y lo clasifica (crítico por encima de {critical} paneles)' },
          lot_traceability: { sub: 'Marca, cliente y respaldo', what: 'Paneles afectados con su marca (Verisure, Sector Alarm o Prosegur Alarmas), su cliente y si tienen vía de respaldo IP' },
          quality_hold: { sub: 'Tras aprobar', what: 'Propone la conmutación a la vía de respaldo y la visita prioritaria a los paneles sin respaldo; se aplica en los portales de partner y se programa en Salesforce solo tras la aprobación', outputs: [{ icon: 'lock', text: 'Conmutación a la vía de respaldo y visitas prioritarias programadas, tras aprobar' }] },
          quality_incident: { sub: 'Caso, aviso y SMS', systems: ['Salesforce CRM', 'Slack', 'Twilio SMS'], what: 'Abre la incidencia en Salesforce con el resumen del caso, avisa {al:notify} para despachar las visitas y manda un SMS a los clientes afectados', outputs: [{ icon: 'clipboard', text: 'Incidencia en Salesforce con el resumen del caso' }, { icon: 'message-square', text: 'Aviso por Slack {al:notify}' }, { icon: 'send', text: 'SMS por Twilio a los clientes afectados' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Informe de incidencia (PDF) con el registro de auditoría' }],
        params: [
          { key: 'threshold', label: 'Paneles sin comunicación', name: 'Paneles sin comunicación', type: 'number', unit: 'paneles', min: 5, max: 200, step: 5, value: 40, integer: true, below: 'critical', ref: 'PR-COM-003', hint: 'PR-COM-003: 40 paneles', extract: { from: 'trigger', re: '(\\d{1,3})\\s*paneles\\b' } },
          { key: 'minutes', label: 'Durante más de', name: 'Tiempo sin comunicación', type: 'number', unit: 'min', min: 1, max: 120, step: 1, value: 10, integer: true, ref: 'PR-COM-003', hint: 'PR-COM-003: 10 min', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Corte crítico', name: 'Corte crítico', type: 'number', unit: 'paneles', min: 10, max: 500, step: 10, value: 150, integer: true, above: 'threshold', ref: 'PR-COM-003', hint: 'PR-COM-003: 150 paneles', hl: 'Crítico', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,3})\\s*paneles\\b' } },
          { key: 'approver', label: 'Aprueba la conmutación', ref: 'PR-COM-003', hint: 'PR-COM-003: solo Soporte técnico y Operaciones aprueban' },
          { key: 'notify', label: 'Aviso a', name: 'Aviso', type: 'role', value: 'maintenance_shift', options: ['maintenance_shift', 'install_shift', 'customer_care'], ref: 'Política', hint: 'Por Slack, para despachar las visitas', extract: { kind: 'role', cap: 'quality_incident' } }
        ],
        check: { id: 'umbral', ref: 'PR-COM-003', keys: ['threshold', 'minutes'], label: 'Umbral y tiempo', describe: 'más de {threshold} durante más de {minutes}', extra: 'crítico por encima de {critical}', action: 'Contrasta los umbrales con PR-COM-003' },
        scenarios: [
          'más de {threshold} paneles pierden la comunicación 4G durante más de {minutes}',
          'salta una alarma de comunicación en paneles de Verisure, Sector Alarm o Prosegur Alarmas (p. ej. Valencia Norte)',
          'el usuario informa de que unos paneles han dejado de supervisarse en remoto',
          'hay que valorar las instalaciones sin supervisión por una caída de comunicación'
        ],
        testUtterance: 'Alarma: 214 paneles sin comunicación 4G en Valencia Norte desde las 05:10',
        matchGroups: [
          { re: '\\bpaneles?\\b|\\binstalaciones?\\b|\\bcentrales?\\b|\\balarm\\w*', w: 0.3, label: 'paneles' },
          { re: '\\bcomunicacion\\b|\\b4g\\b|\\bconexion\\b|\\bsupervision\\b|\\bcaida\\b|\\bcorte\\b', w: 0.3, label: 'comunicación' },
          { re: '\\bsin comunicacion\\b|\\bpierd\\w*|\\bdesde las\\b|\\boperador movil\\b', w: 0.25, label: 'corte' },
          { re: '\\bvalencia\\b|\\bpaterna\\b|\\bnorte\\b', w: 0.07, label: 'Valencia Norte' }
        ],
        config: {
          cold_chain_monitor: [['paneles_umbral', '{=threshold}'], ['minutos_sin_comunicacion', '{=minutes}'], ['paneles_criticos', '{=critical}'], ['ambito', 'Paneles de Verisure, Sector Alarm y Prosegur Alarmas de Valencia, Alicante y Castellón']],
          quality_hold: [['aprobador', '{approver}'], ['politica', 'PR-COM-003']],
          quality_incident: [['plantilla', 'Incidencia de comunicación'], ['aviso_a', '{notify}'], ['canal', 'Slack + SMS']]
        },
        say: {
          draft: [
            'Cada frase está enlazada con lo que ha entendido: el disparador sale de «más de {threshold} paneles… durante más de {minutes}».',
            'Cada paso dice qué sistema toca: los portales de partner para la comunicación y la conmutación; Salesforce y SAP Business One para clientes y contratos; Salesforce, Slack y Twilio para la incidencia y los avisos.',
            'La conmutación y las visitas no se aplican sin la aprobación de Soporte técnico: lo exige PR-COM-003 y el workflow lo respeta aunque el texto no lo dijera.'
          ],
          published: ['Desde ahora, una alarma de comunicación de los portales de partner lo dispara sola. Lo vemos con la alarma real de esta mañana: Valencia Norte, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-cargos-vigilante',
        name: 'Reclamación de cliente por cargos de desplazamiento de vigilante',
        approver: 'finance',
        approverOptions: ['finance', 'decider'],
        policy: 'PR-SOP-007',
        go: 'reclamacion',
        goLabel: 'Probarlo con la reclamación CLM-2026-0619',
        next: 'El próximo correo de reclamación lo ejecuta. La reclamación CLM-2026-0619 (2 cargos de 39,00 € por falsas alarmas) está escalada a Finanzas.',
        trigger: {
          system: 'Correo', type: 'correo', icon: 'mail', badges: ['Correo'],
          label: 'Reclamación en el buzón de Atención al cliente', sub: 'por cargos de vigilante',
          entry: 'Buzón de Atención al cliente',
          full: 'Reclamación de cliente en el buzón de Atención al cliente por cargos de desplazamiento de vigilante'
        },
        steps: {
          complaint_intake: { sub: 'Acuse en {ack}', what: 'Registra la reclamación en Salesforce, extrae cliente, contrato, importe y plazo, y envía el acuse de recibo en {ack}', outputs: [{ icon: 'clipboard', text: 'Reclamación registrada en Salesforce con sus datos extraídos' }] },
          lot_traceability: { sub: 'Traza completa', what: 'Traza la instalación y el contrato: panel, sensores, historial de falsas alarmas y avisos de batería, y cargos del partner', outputs: [{ icon: 'git-branch', text: 'Traza de la instalación con contrato, sensores y cargos' }] },
          quality_incident: { sub: 'Informe en {days}', systems: ['Salesforce CRM', 'Procedimientos'], what: 'Prepara el borrador del informe de revisión (PR-SOP-007) con las reclamaciones similares de los últimos {months}', outputs: [{ icon: 'file-text', text: 'Borrador del informe de revisión (PR-SOP-007), a entregar en {days}' }] },
          notifier: { sub: 'Tras aprobar', what: 'Redacta la respuesta en el idioma del cliente; se envía por correo solo después de aprobarla', outputs: [{ icon: 'send', text: 'Respuesta al cliente, enviada tras la aprobación' }] }
        },
        params: [
          { key: 'ack', label: 'Acuse de recibo', name: 'Acuse de recibo', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'PR-SOP-007', hint: 'PR-SOP-007: 24 h', extract: { from: 'text', re: '\\bacuse de recibo\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|horas)\\b' } },
          { key: 'days', label: 'Informe de revisión', name: 'Plazo del informe', type: 'number', unit: 'días', unitLong: 'días hábiles', min: 1, max: 30, step: 1, value: 10, integer: true, ref: 'PR-SOP-007', hint: 'PR-SOP-007: 10 días hábiles', hl: 'Plazo del informe', extract: { from: 'text', re: '(\\d{1,2})\\s*dias habiles\\b' } },
          { key: 'months', label: 'Histórico de reclamaciones', name: 'Histórico de reclamaciones', type: 'number', unit: 'meses', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Política', hint: 'Histórico de Salesforce', hl: 'Histórico', extract: { from: 'text', re: '(\\d{1,2})\\s*meses\\b' } },
          { key: 'approver', label: 'Aprueba la respuesta', ref: 'PR-SOP-007', hint: 'Antes de enviar nada al cliente' }
        ],
        check: { id: 'plazos', ref: 'PR-SOP-007', keys: ['ack', 'days'], label: 'Plazos', describe: 'acuse en {ack} e informe en {days}', action: 'Contrasta los plazos con PR-SOP-007' },
        scenarios: [
          'llega al buzón de Atención al cliente la reclamación de un cliente por cargos de desplazamiento de vigilante tras una falsa alarma',
          'un cliente se queja de que le han cobrado un desplazamiento por una falsa alarma y amenaza con darse de baja',
          'hay que registrar una reclamación de cliente como caso en Salesforce'
        ],
        testUtterance: 'Nos ha llegado una reclamación de Marta Soler Pons: le han cobrado dos desplazamientos de vigilante por falsas alarmas del 12 y 14 de octubre y amenaza con la baja',
        matchGroups: [
          { re: '\\breclam\\w*|\\bquej\\w*', w: 0.35, label: 'reclamación' },
          { re: '\\bclientes?\\b', w: 0.2, label: 'cliente' },
          { re: '\\bcargos?\\b|\\bdesplazamientos?\\b|\\bvigilante\\b|\\bfalsas? alarmas?\\b|\\bpenalizacion\\w*|\\bbaja\\b', w: 0.25, label: 'cargos' },
          { re: '\\bcontratos?\\b|\\bsa-\\d{4}|\\bclm-\\d{4}|\\binstalacion\\w*', w: 0.12, label: 'contrato' }
        ],
        config: {
          complaint_intake: [['acuse_horas', '{=ack}'], ['sistema', 'Salesforce CRM']],
          quality_incident: [['plantilla', 'Informe de revisión · PR-SOP-007'], ['plazo_dias_habiles', '{=days}'], ['historico_meses', '{=months}']],
          notifier: [['idioma', 'el del cliente'], ['aprobador', '{approver}']]
        },
        say: {
          draft: [
            'Cada frase del texto está enlazada con lo que ha entendido: el correo al buzón de Atención al cliente dispara el workflow y los plazos salen del propio texto.',
            'La traza llega al panel, a los sensores, al historial de falsas alarmas y a los cargos del partner, y el informe se prepara con las reclamaciones similares.',
            'Nada sale hacia el cliente sin la aprobación del {approver}; la respuesta se redacta en el idioma del cliente.'
          ],
          published: ['El próximo correo de reclamación lo ejecuta solo. Lo vemos con la reclamación CLM-2026-0619.']
        }
      },
      parte: {
        first: 'ec_plant_monitor',
        slug: 'wf-parte-diario-hub',
        name: 'Parte diario de operaciones · Paterna',
        approver: 'support_shift',
        approverOptions: ['support_shift', 'decider'],
        policy: 'PR-COM-003',
        go: 'turno',
        goLabel: 'Ver el parte diario del turno',
        next: 'Se ejecuta cada día a las {time}.',
        trigger: {
          system: 'Programado', type: 'programado', icon: 'clock', badges: [],
          label: 'Cada día a las {time}', sub: 'Programado',
          entry: 'Programación diaria del servidor · {time}'
        },
        steps: {
          ec_plant_monitor: { sub: '12 indicadores', what: 'Lee Salesforce, SAP Business One y Samsara Flota, compara 12 indicadores del hub con los umbrales de operaciones y abre tickets sin duplicar los abiertos', outputs: [{ icon: 'ticket', text: 'Tickets de operaciones, sin duplicar los ya abiertos' }] },
          quality_hold: { sub: 'Si hay retirada', gateVerb: 'retener detectores', what: 'Si un detector del lote PIR-2607-A (campaña REC-2026-1019) sigue en almacén o instalado sin visita, propone retenerlo hasta que pase la revisión (PR-QLT-006)', outputs: [{ icon: 'lock', text: 'Retención de los detectores del lote PIR-2607-A, tras aprobar' }] },
          quality_incident: { sub: 'Resumen en Slack', systems: ['Slack'], what: 'Publica el resumen del parte en el canal «Operaciones · Paterna»', outputs: [{ icon: 'message-square', text: 'Resumen en el canal de Slack «Operaciones · Paterna»' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Parte diario de operaciones (PDF)' }],
        params: [
          { key: 'time', label: 'Hora del parte', name: 'Hora del parte', type: 'time', value: '07:00', ref: 'Política', hint: 'Lecturas de Salesforce, SAP y Samsara', extract: { kind: 'time' } },
          { key: 'approver', label: 'Aprueba la retención', ref: 'PR-COM-003', hint: 'PR-MAN-004 · PR-QLT-006' }
        ],
        staticChecks: [
          { id: 'recall', text: 'Lote PIR-2607-A del detector PIR-200: los detectores en almacén no se instalan hasta pasar la revisión (PR-QLT-006)', stream: { action: 'Contrasta el parte con PR-QLT-006', result: 'REC-2026-1019: 1.386 instalados en 912 hogares, 960 en almacén y 54 devueltos' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bsin duplicar\\b', label: 'Regla', check: 'Tickets sin duplicar los que ya estén abiertos' }],
        scenarios: [
          'son las {time} y toca el parte diario de operaciones del hub de Paterna',
          'el usuario pide el parte diario del hub',
          'el usuario pregunta qué indicadores de operaciones están en aviso hoy'
        ],
        testUtterance: 'Haz el parte diario del hub de Paterna',
        matchGroups: [
          { re: '\\bparte\\b', w: 0.35, label: 'parte' },
          { re: '\\bhub\\b|\\boperaciones\\b|\\binstalaciones\\b|\\bmantenimientos?\\b|\\bindicadores?\\b|\\bflota\\b', w: 0.3, label: 'operaciones' },
          { re: '\\bdiario\\b|\\bhoy\\b|\\bturno\\b', w: 0.15, label: 'diario' },
          { re: '\\bpaterna\\b|\\bvalencia\\b', w: 0.1, label: 'Paterna' }
        ],
        config: {
          ec_plant_monitor: [['hora', '{time}'], ['sistemas', '3'], ['indicadores', '12'], ['tickets', 'sin duplicar los ya abiertos']],
          quality_hold: [['aprobador', '{approver}'], ['politica', 'PR-MAN-004 · PR-QLT-006']],
          quality_incident: [['canal', 'Slack · Operaciones · Paterna']]
        },
        say: {
          draft: [
            'El parte es programado: cada día a las {time}, sin que nadie lo pida.',
            'Abre tickets solo para lo que no tenga ya uno abierto, y retiene detectores solo con la aprobación del {approver}.'
          ],
          published: ['Mañana a las {time} lo ejecuta solo; el de hoy está en el resumen del turno.']
        }
      }
    }
  }
});
