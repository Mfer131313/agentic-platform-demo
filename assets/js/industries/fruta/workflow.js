/* Subtropicales Axarquía · De palabras a workflow. Escenario de la demo con datos sintéticos (MFM).
 * Esquema documentado en la cabecera de assets/js/scenes/workflow.js. Regex sobre texto plegado (minúsculas, sin tildes).
 * La temperatura es ascendente: el umbral queda por debajo del nivel crítico. */
agenticPack('fruta', {
  workflow: {
    space: 'Operaciones y calidad · Axarquía',
    author: 'decider',
    authorNoun: 'Operaciones y calidad',
    alarmMatch: 'temperatura|camara|maduracion|frio|compresor|cm-\\d',
    approverRoles: ['qa_shift', 'decider'],
    feminineRoles: ['customer_care'],
    defaultPolicy: 'PR-TRZ-003',
    approverRule: {
      policy: 'PR-TRZ-003',
      text: 'solo Calidad y seguridad alimentaria aprueba retenciones y retiradas',
      note: 'Reasignada: PR-TRZ-003 reserva las retenciones y las retiradas a Calidad y seguridad alimentaria'
    },
    triggerExamples: '«Cuando el control de cámaras registre una temperatura de aire superior a…» o «Cada día a las 07:00…»',
    rolePatterns: [
      ['qa_shift', '\\bresponsable de calidad y seguridad alimentaria\\b|\\bresponsable de calidad\\b'],
      ['reception_shift', '\\bjefe de recepcion y campo\\b|\\bjefe de recepcion\\b'],
      ['ripening_shift', '\\bresponsable de maduracion y frio\\b|\\bresponsable de maduracion\\b'],
      ['packing_shift', '\\bjefe de manipulado y envasado\\b|\\bjefe de manipulado\\b'],
      ['processing_shift', '\\bresponsable de procesado\\b'],
      ['lab_shift', '\\bjefe de laboratorio\\b'],
      ['ecommerce', '\\bresponsable de la tienda online\\b|\\bresponsable de tienda online\\b'],
      ['customer_care', '\\batencion al cliente\\b'],
      ['logistics', '\\bresponsable de expediciones y exportacion\\b|\\bresponsable de expediciones\\b'],
      ['decider', '\\bresponsable de operaciones y calidad\\b|\\bresponsable de operaciones\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:compr(?:a|ar|e|en|as)|vend(?:e|er|a|an)|invert(?:ir)?|inviert(?:e|a|an))\\b[^.;]{0,50}\\b(?:acciones (?:de|en)\\b|bolsa|bitcoins?|criptomonedas?|divisas|fondos de inversion)|\\btransferencias? bancarias?\\b|\\btransferir dinero\\b',
        title: 'Operación financiera',
        body: 'El texto pide comprar o vender acciones o mover dinero. Ningún agente del espacio Operaciones y calidad · Axarquía opera en mercados ni hace pagos, y Agentic Platform no crea pasos que no correspondan a un agente habilitado.'
      },
      {
        id: 'personas',
        re: '\\b(?:evalu\\w*|puntu\\w*|vigil\\w*|control\\w*|medir|mida|sancion\\w*|despid\\w*|rank\\w*)\\b[^.;]{0,40}\\b(?:trabajador\\w*|operari\\w*|emplead\\w*|plantilla|personal|personas|agricultor\\w*|comercial\\w*|tecnic\\w*)\\b',
        title: 'Evaluación de personas',
        body: 'El texto pide evaluar, vigilar o puntuar a personas. Los workflows de este espacio trabajan sobre lotes, cámaras, pedidos, resultados de laboratorio y casos de clientes; no valoran el desempeño de nadie.'
      },
      {
        id: 'control',
        re: '\\b(?:cambi\\w*|modific\\w*|ajust\\w*|baj(?:ar|e|a)|sub(?:ir|e|a))\\b[^.;]{0,30}\\b(?:precios?|tarifas?|ofertas?|consignas?|calibres?|especificacion\\w*)\\b',
        title: 'Cambio de precios, consignas o especificaciones',
        body: 'El texto pide cambiar precios, ofertas, consignas de cámara o especificaciones de producto. Agentic Platform lee SAP S/4HANA, el WMS y la tienda online, pero no modifica precios ni escribe consignas en las cámaras: esos cambios los hacen Comercial y Mantenimiento desde sus sistemas.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Disparador', 'Una alarma de temperatura de una cámara, un correo en el buzón de Atención al cliente o una hora fija.'],
      ['cpu', '', 'Pasos y sistemas', 'Qué agente hace cada paso y qué sistema consulta o actualiza: SAP S/4HANA, Trazabilidad de campo, LIMS, WMS, la tienda online (PrestaShop), Outlook o Microsoft Teams.'],
      ['user-check', 'warn', 'Aprobación humana', 'Quién decide antes de retener, trasladar o enviar, según PR-TRZ-003.'],
      ['file-text', '', 'Salidas', 'Retenciones, órdenes de trabajo, casos, avisos e informes que deja el workflow.']
    ],
    idleNote: 'Cada elemento queda enlazado con la frase del texto de la que sale y se contrasta con los procedimientos de Calidad antes de guardar el borrador.',
    presenter: {
      idle: [
        'Así escribe Operaciones y calidad un procedimiento: en castellano, como en su documento de proceso. No hay que dibujar ni programar nada.',
        'Agentic Platform lo convierte en un workflow de la plataforma: disparador, agentes en orden, aprobación humana y salidas, cada uno enlazado a su frase.',
        'Honestidad: el generador desde texto se simula aquí y su integración en Agentic Platform se valida en el piloto; los workflows (Routines), el editor, la aprobación y la auditoría son de serie.'
      ],
      outOfScopeExample: 'Compra acciones de una cadena de supermercados cuando baje la bolsa'
    },

    templates: {
      alarma: {
        label: 'Frío en maduración',
        icon: 'thermometer',
        refs: 'PR-MAD-002 y PR-TRZ-003',
        text: 'Cuando el control de cámaras registre una temperatura de aire superior a 8 °C durante más de 15 minutos en una cámara de maduración, localizar el lote, los palés en cámara y los pedidos de supermercados y de la tienda online que dependen de ellos. Proponer la retención de calidad del lote en SAP S/4HANA y la inmovilización de los palés en el WMS, que debe aprobar el Responsable de calidad y seguridad alimentaria antes de aplicarse. Si la temperatura supera 10 °C, tratarla como crítica. Una vez aprobada la retención, abrir la no conformidad en SAP S/4HANA con el borrador del 8D y la orden de trabajo del compresor, y avisar por Microsoft Teams al Responsable de maduración y frío para trasladar los palés a otra cámara.'
      },
      reclamacion: {
        label: 'Reclamación',
        icon: 'mail',
        refs: 'PR-MAD-002',
        text: 'Cuando llegue al buzón de Atención al cliente una reclamación de un cliente por maduración dispar en aguacate ready to eat, registrarla en SAP S/4HANA (cliente, pedido, lote, defecto reclamado y plazo de respuesta) y enviar el acuse de recibo en 24 h. Trazar el lote hacia atrás (finca, recepción y maduración) y hacia delante (pedidos y expediciones) y verificar en LIMS la firmeza de las muestras de retención según PR-MAD-002. Preparar el borrador del informe 8D, con las reclamaciones similares de los últimos 12 meses, y la respuesta al cliente en su idioma. La respuesta la aprueba el Responsable de calidad y seguridad alimentaria antes de enviarla; el informe 8D se entrega en 10 días hábiles.'
      },
      parte: {
        label: 'Parte diario',
        icon: 'activity',
        refs: 'PR-CAL-004 y PR-TRZ-003',
        text: 'Cada día a las 07:00, revisar en SAP S/4HANA, el WMS, LIMS y la tienda online el estado del centro de manipulado (camiones de fruta recibidos, cámaras de maduración, resultados de laboratorio pendientes, órdenes de procesado, pedidos online a servir y expediciones del día) y compararlo con los umbrales de operaciones. Para cada indicador en aviso o crítico, abrir un ticket con la acción recomendada, sin duplicar los tickets que ya estén abiertos. Si una cámara supera el límite de temperatura o un lote tiene un resultado de laboratorio pendiente o de residuos por encima del LMR, proponer retener el lote hasta su liberación, que debe aprobar el Responsable de calidad y seguridad alimentaria. Publicar el resumen del parte en el canal de Microsoft Teams de Operaciones y calidad.'
      }
    },

    catalog: {
      cold_chain_monitor: {
        agent: 'Monitor de cámaras', icon: 'thermometer', systems: ['Control de cámaras', 'SAP S/4HANA'],
        what: 'Lee la temperatura de la cámara, confirma la desviación y la clasifica',
        name: 'Desviación de temperatura en cámara', verb: 'revisar la temperatura de la cámara', token: 'temperatura',
        keywords: ['\\btemperatura de aire\\b', '\\bcamaras? de maduracion\\b', '\\bcontrol de camaras\\b', '\\bgrados\\b', '\\bcompresor\\b'],
        strong: ['\\bconfirm\\w*', '\\bclasific\\w*', '\\bmedir\\b', '\\bvigil\\w*']
      },
      complaint_intake: {
        agent: 'Entrada de reclamaciones', icon: 'mail', systems: ['Outlook', 'SAP S/4HANA'],
        what: 'Registra la reclamación y extrae cliente, pedido, lote, defecto reclamado y plazo',
        name: 'Reclamación de cliente', verb: 'registrar la reclamación', token: 'reclamacion',
        keywords: ['\\breclam\\w*', '\\bquej\\w*', '\\bmaduracion dispar\\b'],
        strong: ['\\bregistr\\w*', '\\bextraer\\b', '\\bdar de alta\\b']
      },
      ec_plant_monitor: {
        agent: 'Parte diario de operaciones y calidad', icon: 'activity', systems: ['SAP S/4HANA', 'WMS', 'LIMS', 'Tienda online (PrestaShop)'], multi: 2,
        what: 'Compara los indicadores del centro con los umbrales y abre tickets sin duplicar los abiertos',
        name: 'Parte diario de operaciones y calidad', verb: 'hacer el parte del centro', token: 'parte-centro',
        keywords: ['\\bparte diario\\b', '\\bestado del centro\\b', '\\bindicador(?:es)?\\b', '\\bumbrales de operaciones\\b', '\\btickets? con la accion\\b', '\\btickets? que ya\\b'],
        strong: ['\\brevis(?:ar|a|e)\\b', '\\bindicador(?:es)?\\b', '\\bticket\\w*']
      },
      campaign_planner: {
        agent: 'Plan de maduración', icon: 'calendar', systems: ['SAP S/4HANA', 'WMS'],
        what: 'Compara los pedidos con la fruta en cámara y con la capacidad de maduración',
        name: 'Plan de maduración', verb: 'planificar la maduración', token: 'plan-maduracion',
        keywords: ['\\bplan de maduracion\\b', '\\bordenes de maduracion\\b', '\\bplanificacion de la maduracion\\b'],
        strong: ['\\bplanific\\w*']
      },
      lot_traceability: {
        agent: 'Trazabilidad de lotes', icon: 'git-branch', systems: ['SAP S/4HANA', 'Trazabilidad de campo', 'WMS', 'LIMS'],
        what: 'Localiza lotes, fincas, palés, pedidos y expediciones, hacia atrás y hacia delante',
        name: 'Trazabilidad de lotes', verb: 'trazar lotes', token: 'traza',
        keywords: ['\\btrazab\\w*', '\\btraz(?:a|ar|alo|ala|alos|alas|ado|ados|ada|adas)\\b', '\\b(?:localiz|identific)\\w*\\s+(?:los\\s+|las\\s+)?(?:lotes|pales|pedidos|expediciones|clientes)\\b', '\\bhacia (?:atras|delante)\\b'],
        strong: ['\\btraz(?:a|ar|alo|ala|alos|alas)\\b', '\\btrazab\\w*', '\\blocaliz\\w*', '\\bidentific\\w*']
      },
      quality_hold: {
        agent: 'Retención de calidad', icon: 'lock', systems: ['SAP S/4HANA', 'WMS'], hitl: true, restricted: true, gateVerb: 'aplicar la retención',
        what: 'Propone la retención de calidad del lote y de los palés y solo la aplica tras la aprobación',
        name: 'Retención de calidad', verb: 'retener lotes', token: 'retencion',
        keywords: ['\\bbloque\\w*', '\\binmoviliz\\w*', '\\breten\\w*', '\\bretien\\w*', '\\bcuarentena\\b'],
        strong: ['\\bbloque\\w*', '\\binmoviliz\\w*', '\\breten\\w*', '\\bretien\\w*', '\\bcuarentena\\b']
      },
      quality_incident: {
        agent: 'No conformidades y avisos', icon: 'clipboard', systems: ['SAP S/4HANA', 'Microsoft Teams'],
        what: 'Abre la no conformidad con el borrador del 8D y la OT, y envía los avisos',
        name: 'No conformidad', verb: 'abrir la no conformidad', token: 'no-conformidad',
        keywords: ['\\bno conformidad(?:es)?\\b', '\\b8d\\b', '\\binforme\\b', '\\bavis(?:ar|e|a|en)\\b', '\\bnotific(?:ar|a|e|en)\\b', '\\bpublic\\w* el resumen\\b'],
        strong: ['\\bno conformidad(?:es)?\\b', '\\binforme\\b', '\\bpublic\\w* el resumen\\b', '\\bavis(?:ar|e|a|en)\\b']
      },
      notifier: {
        agent: 'Respuesta al cliente', icon: 'send', systems: ['Outlook'], hitl: true, gateVerb: 'enviar la respuesta',
        what: 'Redacta la respuesta en el idioma del cliente y la envía tras aprobarla',
        name: 'Respuesta al cliente', verb: 'responder al cliente', token: 'respuesta',
        keywords: ['\\brespuesta al cliente\\b', '\\bresponder al cliente\\b', '\\bcontestar al cliente\\b'],
        strong: ['\\brespuesta al cliente\\b', '\\bresponder al cliente\\b', '\\bcontestar al cliente\\b']
      }
    },

    domains: {
      alarma: {
        first: 'cold_chain_monitor',
        slug: 'wf-desviacion-temperatura-camara',
        name: 'Desviación de temperatura en cámara de maduración',
        approver: 'qa_shift',
        approverOptions: ['qa_shift', 'decider'],
        policy: 'PR-TRZ-003',
        go: 'alarma',
        goLabel: 'Probarlo con la alarma de la cámara CM-06',
        next: 'La próxima alarma de temperatura lo ejecuta. La de la cámara CM-06 (ALM-FRIO-0612) de las 05:50 sigue abierta.',
        trigger: {
          system: 'Control de cámaras', type: 'temperatura', icon: 'thermometer', badges: ['Control de cámaras'],
          label: 'Temperatura de aire > {threshold}', sub: 'más de {minutes}',
          entry: 'Alarma del control de cámaras recibida por webhook',
          full: 'Temperatura de aire > {threshold} durante más de {minutes} en una cámara de maduración'
        },
        steps: {
          cold_chain_monitor: { sub: 'Crítica > {critical}', what: 'Lee la temperatura de la cámara, confirma la desviación y la clasifica (crítica por encima de {critical})' },
          lot_traceability: { sub: 'Lote, palés y pedidos', what: 'Lote y palés que había en la cámara, y los pedidos de supermercados y de la tienda online que dependen de ellos' },
          quality_hold: { sub: 'Tras aprobar', what: 'Propone la retención de calidad del lote; se aplica en SAP S/4HANA y en el WMS solo tras la aprobación', outputs: [{ icon: 'lock', text: 'Retención de calidad en SAP S/4HANA y palés inmovilizados en el WMS, tras aprobar' }] },
          quality_incident: { sub: 'NC, OT y aviso', systems: ['SAP S/4HANA', 'Microsoft Teams'], what: 'Abre la no conformidad en SAP S/4HANA con el borrador del 8D y la orden de trabajo del compresor, y avisa {al:notify} para trasladar los palés a otra cámara', outputs: [{ icon: 'clipboard', text: 'No conformidad en SAP S/4HANA con el borrador del 8D' }, { icon: 'wrench', text: 'Orden de trabajo del compresor y traslado a otra cámara' }, { icon: 'message-square', text: 'Aviso por Teams {al:notify}' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Informe de incidencia (PDF) con el registro de auditoría' }],
        params: [
          { key: 'threshold', label: 'Umbral de temperatura', name: 'Umbral de temperatura', type: 'number', unit: '°C', min: 4, max: 15, step: 0.5, value: 8, below: 'critical', ref: 'PR-MAD-002', hint: 'PR-MAD-002: 8 °C', extract: { from: 'trigger', re: '(-?\\d{1,2}(?:[.,]\\d{1,2})?)\\s*(?:grados(?:\\s+centigrados)?|c)\\b' } },
          { key: 'minutes', label: 'Durante más de', name: 'Tiempo por encima del umbral', type: 'number', unit: 'min', min: 1, max: 120, step: 1, value: 15, integer: true, ref: 'PR-MAD-002', hint: 'PR-MAD-002: 15 min', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Desviación crítica', name: 'Desviación crítica', type: 'number', unit: '°C', min: 6, max: 20, step: 0.5, value: 10, above: 'threshold', ref: 'PR-MAD-002', hint: 'PR-MAD-002: 10 °C', hl: 'Crítico', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(-?\\d{1,2}(?:[.,]\\d{1,2})?)\\s*(?:grados(?:\\s+centigrados)?|c)\\b' } },
          { key: 'approver', label: 'Aprueba la retención', ref: 'PR-TRZ-003', hint: 'PR-TRZ-003: solo Calidad y seguridad alimentaria retiene y libera' },
          { key: 'notify', label: 'Aviso a', name: 'Aviso', type: 'role', value: 'ripening_shift', options: ['ripening_shift', 'packing_shift', 'logistics'], ref: 'Política', hint: 'Por Microsoft Teams, para trasladar los palés y reasignar expediciones', extract: { kind: 'role', cap: 'quality_incident' } }
        ],
        check: { id: 'umbral', ref: 'PR-MAD-002', keys: ['threshold', 'minutes'], label: 'Umbral y tiempo', describe: '{threshold} durante más de {minutes}', extra: 'crítico por encima de {critical}', action: 'Contrasta los umbrales con PR-MAD-002' },
        scenarios: [
          'el control de cámaras registra una temperatura de aire superior a {threshold} durante más de {minutes} en una cámara de maduración',
          'salta una alarma de frío por un fallo de compresor en una cámara de maduración (p. ej. CM-06)',
          'el usuario informa de que una cámara con aguacate o mango está por encima de su consigna',
          'hay que evaluar los palés y los pedidos expuestos a una cámara de maduración fuera de temperatura'
        ],
        testUtterance: 'Alarma: la cámara de maduración CM-06 marca 11,4 °C desde hace 40 minutos y el compresor está parado',
        matchGroups: [
          { re: '\\bcamaras?\\b|\\bcm-\\d|\\bmaduracion\\b|\\bpales?\\b|\\blotes?\\b|\\baguacates?\\b', w: 0.3, label: 'cámara' },
          { re: '\\btemperatura\\b|\\bgrados\\b|\\bcompresor\\b|\\bfrio\\b|\\bconsigna\\b', w: 0.3, label: 'temperatura' },
          { re: '\\balarma\\w*|\\bsupera\\w*|\\bdesde hace\\b|\\bdetect\\w*|\\bconfirm\\w*', w: 0.25, label: 'alarma' },
          { re: '\\bcentro\\b|\\baxarquia\\b|\\bmanipulado\\b', w: 0.07, label: 'centro' }
        ],
        config: {
          cold_chain_monitor: [['limite_c', '{=threshold}'], ['minutos_por_encima', '{=minutes}'], ['critico_c', '{=critical}'], ['ambito', 'Cámaras de maduración controlada del centro de manipulado (Axarquía)']],
          quality_hold: [['aprobador', '{approver}'], ['politica', 'PR-TRZ-003']],
          quality_incident: [['plantilla', '8D'], ['aviso_a', '{notify}'], ['canal', 'Microsoft Teams']]
        },
        say: {
          draft: [
            'Cada frase está enlazada con lo que ha entendido: el disparador sale de «superior a {threshold} durante más de {minutes}».',
            'Cada paso dice qué sistema toca: el control de cámaras para la temperatura; SAP S/4HANA, Trazabilidad de campo y el WMS para lote, palés y pedidos; SAP S/4HANA y el WMS para la retención; SAP S/4HANA y Teams para la incidencia.',
            'La retención no se aplica sin la aprobación de Calidad y seguridad alimentaria: lo exige PR-TRZ-003 y el workflow lo respeta aunque el texto no lo dijera.'
          ],
          published: ['Desde ahora, una alarma de temperatura de una cámara de maduración lo dispara sola. Lo vemos con la alarma real de esta mañana: cámara CM-06, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-maduracion-dispar',
        name: 'Reclamación de cliente por maduración dispar',
        approver: 'qa_shift',
        approverOptions: ['qa_shift', 'decider'],
        policy: 'PR-MAD-002',
        go: 'reclamacion',
        goLabel: 'Probarlo con la reclamación CLM-2026-1120',
        next: 'El próximo correo de reclamación lo ejecuta. La reclamación CLM-2026-1120 (35 % de piezas duras en el pedido PED-2026-44718) está abierta.',
        trigger: {
          system: 'Correo', type: 'correo', icon: 'mail', badges: ['Outlook'],
          label: 'Reclamación en el buzón de Atención al cliente', sub: 'por maduración dispar',
          entry: 'Buzón de Atención al cliente',
          full: 'Reclamación de cliente en el buzón de Atención al cliente por maduración dispar en aguacate ready to eat'
        },
        steps: {
          complaint_intake: { sub: 'Acuse en {ack}', what: 'Registra la reclamación en SAP S/4HANA, extrae cliente, pedido, lote, defecto reclamado y plazo, y envía el acuse de recibo en {ack}', outputs: [{ icon: 'clipboard', text: 'Reclamación registrada en SAP S/4HANA con sus datos extraídos' }] },
          lot_traceability: { sub: 'Traza y verificación', what: 'Traza el lote hacia atrás (finca, recepción y maduración) y hacia delante (pedidos y expediciones) y verifica en LIMS la firmeza de las muestras de retención (PR-MAD-002)', outputs: [{ icon: 'git-branch', text: 'Traza del lote con finca, maduración y pedidos, y verificación de firmeza en LIMS' }] },
          quality_incident: { sub: '8D en {days}', systems: ['SAP S/4HANA', 'Procedimientos'], what: 'Prepara el borrador del informe 8D con las reclamaciones similares de los últimos {months}', outputs: [{ icon: 'file-text', text: 'Borrador del informe 8D (PR-MAD-002), a entregar en {days}' }] },
          notifier: { sub: 'Tras aprobar', what: 'Redacta la respuesta en el idioma del cliente; se envía por correo solo después de aprobarla', outputs: [{ icon: 'send', text: 'Respuesta al cliente, enviada tras la aprobación' }] }
        },
        params: [
          { key: 'ack', label: 'Acuse de recibo', name: 'Acuse de recibo', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'PR-MAD-002', hint: 'PR-MAD-002: 24 h', extract: { from: 'text', re: '\\bacuse de recibo\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|horas)\\b' } },
          { key: 'days', label: 'Informe 8D', name: 'Plazo del informe 8D', type: 'number', unit: 'días', unitLong: 'días hábiles', min: 1, max: 30, step: 1, value: 10, integer: true, ref: 'PR-MAD-002', hint: 'PR-MAD-002: 10 días hábiles', hl: 'Plazo del informe', extract: { from: 'text', re: '(\\d{1,2})\\s*dias habiles\\b' } },
          { key: 'months', label: 'Histórico de reclamaciones', name: 'Histórico de reclamaciones', type: 'number', unit: 'meses', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Política', hint: 'Histórico de SAP S/4HANA', hl: 'Histórico', extract: { from: 'text', re: '(\\d{1,2})\\s*meses\\b' } },
          { key: 'approver', label: 'Aprueba la respuesta', ref: 'PR-MAD-002', hint: 'Antes de enviar nada al cliente' }
        ],
        check: { id: 'plazos', ref: 'PR-MAD-002', keys: ['ack', 'days'], label: 'Plazos', describe: 'acuse en {ack} e informe 8D en {days}', action: 'Contrasta los plazos con PR-MAD-002' },
        scenarios: [
          'llega al buzón de Atención al cliente la reclamación de un cliente por maduración dispar en aguacate ready to eat',
          'una cadena de supermercados se queja de que parte de las piezas llega dura a sus tiendas y hay que revisar el expediente',
          'hay que registrar una reclamación de cliente como caso en SAP S/4HANA'
        ],
        testUtterance: 'Nos ha llegado una reclamación de Supermercados Levante Fresh: en el pedido PED-2026-44718 de aguacate ready to eat el 35 % de las piezas llega duro en 4 tiendas',
        matchGroups: [
          { re: '\\breclam\\w*|\\bquej\\w*', w: 0.35, label: 'reclamación' },
          { re: '\\bclientes?\\b|\\bsupermercados?\\b|\\btiendas?\\b', w: 0.2, label: 'cliente' },
          { re: '\\baguacate\\w*|\\bmango\\w*|\\bduro\\w*|\\bduras?\\b|\\bmadura\\w*|\\bdispar\\w*|\\bfirmeza\\b|\\bpiezas\\b', w: 0.25, label: 'maduración' },
          { re: '\\blotes?\\b|\\bped-\\d{4}|\\bclm-\\d{4}|\\bah-\\d{4}', w: 0.12, label: 'lote' }
        ],
        config: {
          complaint_intake: [['acuse_horas', '{=ack}'], ['sistema', 'SAP S/4HANA']],
          quality_incident: [['plantilla', '8D · PR-MAD-002'], ['plazo_dias_habiles', '{=days}'], ['historico_meses', '{=months}']],
          notifier: [['idioma', 'el del cliente'], ['aprobador', '{approver}']]
        },
        say: {
          draft: [
            'Cada frase del texto está enlazada con lo que ha entendido: el correo al buzón de Atención al cliente dispara el workflow y los plazos salen del propio texto.',
            'La traza llega a la finca, la maduración y los pedidos del lote, la firmeza se verifica en LIMS y el 8D se prepara con las reclamaciones similares.',
            'Nada sale hacia el cliente sin la aprobación del {approver}; la respuesta se redacta en el idioma del cliente.'
          ],
          published: ['El próximo correo de reclamación lo ejecuta solo. Lo vemos con la reclamación CLM-2026-1120.']
        }
      },
      parte: {
        first: 'ec_plant_monitor',
        slug: 'wf-parte-diario-centro',
        name: 'Parte diario de operaciones y calidad · Axarquía',
        approver: 'qa_shift',
        approverOptions: ['qa_shift', 'decider'],
        policy: 'PR-TRZ-003',
        go: 'turno',
        goLabel: 'Ver el parte diario del turno',
        next: 'Se ejecuta cada día a las {time}.',
        trigger: {
          system: 'Programado', type: 'programado', icon: 'clock', badges: [],
          label: 'Cada día a las {time}', sub: 'Programado',
          entry: 'Programación diaria del servidor · {time}'
        },
        steps: {
          ec_plant_monitor: { sub: '11 indicadores', what: 'Lee SAP S/4HANA, el WMS, LIMS y la tienda online, compara 11 indicadores del centro de manipulado con los umbrales de operaciones y abre tickets sin duplicar los abiertos', outputs: [{ icon: 'ticket', text: 'Tickets de operaciones, sin duplicar los ya abiertos' }] },
          quality_hold: { sub: 'Si hay lote sin liberar', gateVerb: 'retener lotes', what: 'Si una cámara supera el límite de temperatura o un lote tiene un resultado de laboratorio pendiente o de residuos por encima del LMR, propone retener el lote hasta su liberación (PR-CAL-004)', outputs: [{ icon: 'lock', text: 'Retención de lotes sin liberar, tras aprobar' }] },
          quality_incident: { sub: 'Resumen en Teams', systems: ['Microsoft Teams'], what: 'Publica el resumen del parte en el canal «Operaciones y calidad · Axarquía»', outputs: [{ icon: 'message-square', text: 'Resumen en el canal de Teams «Operaciones y calidad · Axarquía»' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Parte diario de operaciones y calidad (PDF)' }],
        params: [
          { key: 'time', label: 'Hora del parte', name: 'Hora del parte', type: 'time', value: '07:00', ref: 'Política', hint: 'Lecturas de SAP S/4HANA, el WMS, LIMS y la tienda online', extract: { kind: 'time' } },
          { key: 'approver', label: 'Aprueba la retención', ref: 'PR-TRZ-003', hint: 'PR-TRZ-003 · PR-CAL-004' }
        ],
        staticChecks: [
          { id: 'lmr', text: 'Lotes con residuo de plaguicida por encima del LMR (como el mango MG-2611-KE-031): no se expiden hasta liberar el análisis (PR-CAL-004)', stream: { action: 'Contrasta el parte con PR-CAL-004', result: 'MG-2611-KE-031: residuo por encima del LMR (LAB-2611-0871); 6 t retenidas en almacén y 12 t expedidas en trazabilidad' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bsin duplicar\\b', label: 'Regla', check: 'Tickets sin duplicar los que ya estén abiertos' }],
        scenarios: [
          'son las {time} y toca el parte diario de operaciones y calidad del centro de manipulado',
          'el usuario pide el parte diario del centro',
          'el usuario pregunta qué indicadores de operaciones o de calidad están en aviso hoy'
        ],
        testUtterance: 'Haz el parte diario del centro de manipulado',
        matchGroups: [
          { re: '\\bparte\\b', w: 0.35, label: 'parte' },
          { re: '\\bcentro\\b|\\boperaciones\\b|\\bcalidad\\b|\\bindicadores?\\b|\\bpedidos\\b', w: 0.3, label: 'operaciones' },
          { re: '\\bdiario\\b|\\bhoy\\b|\\bturno\\b', w: 0.15, label: 'diario' },
          { re: '\\bmanipulado\\b|\\baxarquia\\b', w: 0.1, label: 'centro' }
        ],
        config: {
          ec_plant_monitor: [['hora', '{time}'], ['sistemas', '4'], ['indicadores', '11'], ['tickets', 'sin duplicar los ya abiertos']],
          quality_hold: [['aprobador', '{approver}'], ['politica', 'PR-TRZ-003 · PR-CAL-004']],
          quality_incident: [['canal', 'Teams · Operaciones y calidad · Axarquía']]
        },
        say: {
          draft: [
            'El parte es programado: cada día a las {time}, sin que nadie lo pida.',
            'Abre tickets solo para lo que no tenga ya uno abierto, y retiene lotes solo con la aprobación del {approver}.'
          ],
          published: ['Mañana a las {time} lo ejecuta solo; el de hoy está en el resumen del turno.']
        }
      }
    }
  }
});
