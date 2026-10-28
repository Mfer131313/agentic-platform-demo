/* Norel Nutrición Animal · De palabras a workflow. Escenario de la demo con datos sintéticos (MFM).
 * Esquema documentado en la cabecera de assets/js/scenes/workflow.js. Regex sobre texto plegado (minúsculas, sin tildes).
 * La señal de Salmonella es ascendente: el umbral queda por debajo del nivel crítico. */
agenticPack('norel', {
  workflow: {
    space: 'Operaciones y calidad · Madrid',
    author: 'decider',
    authorNoun: 'Operaciones y calidad',
    alarmMatch: 'salmonella|lims|materia prima|rfu|laboratorio',
    approverRoles: ['qa_shift', 'decider'],
    feminineRoles: ['customer_care'],
    defaultPolicy: 'PR-CAL-007',
    approverRule: {
      policy: 'PR-CAL-007',
      text: 'solo Calidad y seguridad alimentaria aprueba bloqueos y retiradas',
      note: 'Reasignada: PR-CAL-007 reserva los bloqueos y las retiradas a Calidad y seguridad alimentaria'
    },
    triggerExamples: '«Cuando el LIMS registre una señal de Salmonella superior a…» o «Cada día a las 07:00…»',
    rolePatterns: [
      ['qa_shift', '\\bresponsable de calidad y seguridad alimentaria\\b|\\bresponsable de calidad\\b'],
      ['plant_shift', '\\bjefe de planta\\b'],
      ['lab_shift', '\\bjefe de laboratorio\\b'],
      ['solutions', '\\bnorel solutions\\b'],
      ['customer_care', '\\batencion al cliente y pedidos\\b|\\batencion al cliente\\b'],
      ['regulatory', '\\bresponsable de asuntos regulatorios\\b|\\basuntos regulatorios\\b'],
      ['logistics', '\\bresponsable de logistica y exportacion\\b|\\bresponsable de logistica\\b'],
      ['decider', '\\bresponsable de operaciones y calidad\\b|\\bresponsable de operaciones\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:compr(?:a|ar|e|en|as)|vend(?:e|er|a|an)|invert(?:ir)?|inviert(?:e|a|an))\\b[^.;]{0,50}\\b(?:acciones (?:de|en)\\b|bolsa|bitcoins?|criptomonedas?|divisas|fondos de inversion)|\\btransferencias? bancarias?\\b|\\btransferir dinero\\b',
        title: 'Operación financiera',
        body: 'El texto pide comprar o vender acciones o mover dinero. Ningún agente del espacio Operaciones y calidad · Madrid opera en mercados ni hace pagos, y Agentic Platform no crea pasos que no correspondan a un agente habilitado.'
      },
      {
        id: 'personas',
        re: '\\b(?:evalu\\w*|puntu\\w*|vigil\\w*|control\\w*|medir|mida|sancion\\w*|despid\\w*|rank\\w*)\\b[^.;]{0,40}\\b(?:trabajador\\w*|operari\\w*|emplead\\w*|plantilla|personal|personas|comercial\\w*|tecnic\\w*)\\b',
        title: 'Evaluación de personas',
        body: 'El texto pide evaluar, vigilar o puntuar a personas. Los workflows de este espacio trabajan sobre lotes, pedidos, resultados de laboratorio y casos de clientes; no valoran el desempeño de nadie.'
      },
      {
        id: 'control',
        re: '\\b(?:cambi\\w*|modific\\w*|ajust\\w*|baj(?:ar|e|a)|sub(?:ir|e|a))\\b[^.;]{0,30}\\b(?:formulas?|formulacion\\w*|dosis|dosificacion\\w*|especificacion\\w*|precios?|tarifas?)\\b',
        title: 'Cambio de fórmulas o especificaciones',
        body: 'El texto pide cambiar fórmulas, dosis, especificaciones o precios. Agentic Platform lee SAP S/4HANA y LIMS, pero no modifica formulaciones ni declaraciones de aditivos (Reglamento (CE) 1831/2003): esos cambios los aprueba Asuntos regulatorios desde su sistema.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Disparador', 'Un resultado positivo en LIMS, un correo en el buzón de Atención al cliente o una hora fija.'],
      ['cpu', '', 'Pasos y sistemas', 'Qué agente hace cada paso y qué sistema consulta o actualiza: SAP S/4HANA, LIMS, el MES de planta, Salesforce, Outlook o Microsoft Teams.'],
      ['user-check', 'warn', 'Aprobación humana', 'Quién decide antes de bloquear, retener o enviar, según PR-CAL-007.'],
      ['file-text', '', 'Salidas', 'Bloqueos, casos, avisos e informes que deja el workflow.']
    ],
    idleNote: 'Cada elemento queda enlazado con la frase del texto de la que sale y se contrasta con los procedimientos de Calidad antes de guardar el borrador.',
    presenter: {
      idle: [
        'Así escribe Operaciones y calidad un procedimiento: en castellano, como en su documento de proceso. No hay que dibujar ni programar nada.',
        'Agentic Platform lo convierte en un workflow de la plataforma: disparador, agentes en orden, aprobación humana y salidas, cada uno enlazado a su frase.',
        'Honestidad: el generador desde texto se simula aquí y su integración en Agentic Platform se valida en el piloto; los workflows (Routines), el editor, la aprobación y la auditoría son de serie.'
      ],
      outOfScopeExample: 'Compra acciones de un fabricante de piensos cuando baje la bolsa'
    },

    templates: {
      alarma: {
        label: 'Salmonella en materia prima',
        icon: 'flask',
        refs: 'PR-CAL-004 y PR-CAL-007',
        text: 'Cuando el LIMS registre una señal de amplificación de Salmonella superior a 100 RFU durante más de 15 minutos en una muestra de materia prima, localizar los lotes de premezcla fabricados con ese lote de materia prima, sus palés en almacén y sus expediciones a clientes. Proponer el bloqueo de calidad del lote de materia prima y de los lotes de premezcla en SAP S/4HANA y la inmovilización de los palés en el MES de planta, que debe aprobar el Responsable de calidad y seguridad alimentaria antes de aplicarse. Si la señal supera 300 RFU, tratarla como crítica. Una vez aprobado el bloqueo, abrir la no conformidad en SAP S/4HANA con el borrador del 8D y avisar por Microsoft Teams al Jefe de planta para retener las expediciones.'
      },
      reclamacion: {
        label: 'Reclamación',
        icon: 'mail',
        refs: 'PR-LAB-005',
        text: 'Cuando llegue al buzón de Atención al cliente una reclamación de un cliente por un contenido de vitamina inferior al declarado en una premezcla, registrarla en Salesforce (cliente, lote, producto, parámetro reclamado, informe del cliente y plazo de respuesta) y enviar el acuse de recibo en 24 h. Trazar el lote hacia atrás (materias primas y proveedores) y hacia delante (expediciones) y verificar en LIMS el contenido declarado según PR-LAB-005. Preparar el borrador del informe 8D, con las reclamaciones similares de los últimos 12 meses, y la respuesta al cliente en su idioma. La respuesta la aprueba el Responsable de calidad y seguridad alimentaria antes de enviarla; el informe 8D se entrega en 10 días hábiles.'
      },
      parte: {
        label: 'Parte diario',
        icon: 'activity',
        refs: 'PR-CAL-004 y PR-CAL-007',
        text: 'Cada día a las 07:00, revisar en SAP S/4HANA, el MES de planta y LIMS el estado de la planta de premezclas y de la oficina de pedidos (materias primas recibidas, órdenes de fabricación del día, resultados de laboratorio pendientes, producto en almacén y pedidos en curso) y compararlo con los umbrales de operaciones. Para cada indicador en aviso o crítico, abrir un ticket con la acción recomendada, sin duplicar los tickets que ya estén abiertos. Si una materia prima con resultado de laboratorio pendiente o positivo figura en una orden de fabricación del día, proponer bloquear la orden hasta su liberación, que debe aprobar el Responsable de calidad y seguridad alimentaria. Publicar el resumen del parte en el canal de Microsoft Teams de Operaciones y calidad.'
      }
    },

    catalog: {
      cold_chain_monitor: {
        agent: 'Monitor de laboratorio', icon: 'flask', systems: ['LIMS', 'SAP S/4HANA'],
        what: 'Lee la señal del ensayo en LIMS, confirma el positivo y lo clasifica',
        name: 'Positivo de Salmonella en materia prima', verb: 'revisar el resultado de laboratorio', token: 'salmonella',
        keywords: ['\\bsalmonella\\b', '\\bsenal de amplificacion\\b', '\\blims\\b', '\\brfu\\b', '\\bresultado\\b[^.;]{0,30}\\bpositivo\\b'],
        strong: ['\\bconfirm\\w*', '\\bclasific\\w*', '\\bmedir\\b', '\\bvigil\\w*']
      },
      complaint_intake: {
        agent: 'Entrada de reclamaciones', icon: 'mail', systems: ['Outlook', 'Salesforce CRM'],
        what: 'Registra la reclamación y extrae cliente, lote, producto, parámetro reclamado y plazo',
        name: 'Reclamación de cliente', verb: 'registrar la reclamación', token: 'reclamacion',
        keywords: ['\\breclam\\w*', '\\bquej\\w*', '\\bcontenido\\b[^.;]{0,30}\\binferior\\b'],
        strong: ['\\bregistr\\w*', '\\bextraer\\b', '\\bdar de alta\\b']
      },
      ec_plant_monitor: {
        agent: 'Parte diario de operaciones y calidad', icon: 'activity', systems: ['SAP S/4HANA', 'MES de planta', 'LIMS'], multi: 2,
        what: 'Compara los indicadores de la planta con los umbrales y abre tickets sin duplicar los abiertos',
        name: 'Parte diario de operaciones y calidad', verb: 'hacer el parte de la planta', token: 'parte-planta',
        keywords: ['\\bparte diario\\b', '\\bestado de la planta\\b', '\\bindicador(?:es)?\\b', '\\bumbrales de operaciones\\b', '\\btickets? con la accion\\b', '\\btickets? que ya\\b'],
        strong: ['\\brevis(?:ar|a|e)\\b', '\\bindicador(?:es)?\\b', '\\bticket\\w*']
      },
      campaign_planner: {
        agent: 'Plan de fabricación', icon: 'calendar', systems: ['SAP S/4HANA', 'MES de planta'],
        what: 'Compara las órdenes de fabricación con la disponibilidad de materias primas y de línea',
        name: 'Plan de fabricación', verb: 'planificar la fabricación', token: 'plan-fabricacion',
        keywords: ['\\bplan de fabricacion\\b', '\\bordenes de fabricacion\\b', '\\bplanificacion de la fabricacion\\b'],
        strong: ['\\bplanific\\w*']
      },
      lot_traceability: {
        agent: 'Trazabilidad de lotes', icon: 'git-branch', systems: ['SAP S/4HANA', 'MES de planta', 'LIMS'],
        what: 'Localiza lotes de materia prima, lotes de premezcla, palés y expediciones, hacia atrás y hacia delante',
        name: 'Trazabilidad de lotes', verb: 'trazar lotes', token: 'traza',
        keywords: ['\\btrazab\\w*', '\\btraz(?:a|ar|alo|ala|alos|alas|ado|ados|ada|adas)\\b', '\\b(?:localiz|identific)\\w*\\s+(?:los\\s+|las\\s+)?(?:lotes|pales|expediciones|clientes)\\b', '\\bhacia (?:atras|delante)\\b'],
        strong: ['\\btraz(?:a|ar|alo|ala|alos|alas)\\b', '\\btrazab\\w*', '\\blocaliz\\w*', '\\bidentific\\w*']
      },
      quality_hold: {
        agent: 'Bloqueo de calidad', icon: 'lock', systems: ['SAP S/4HANA', 'MES de planta'], hitl: true, restricted: true, gateVerb: 'aplicar el bloqueo',
        what: 'Propone el bloqueo de calidad de los lotes y de los palés y solo lo aplica tras la aprobación',
        name: 'Bloqueo de calidad', verb: 'bloquear lotes', token: 'bloqueo',
        keywords: ['\\bbloque\\w*', '\\binmoviliz\\w*', '\\breten\\w*', '\\bretien\\w*', '\\bcuarentena\\b'],
        strong: ['\\bbloque\\w*', '\\binmoviliz\\w*', '\\breten\\w*', '\\bretien\\w*', '\\bcuarentena\\b']
      },
      quality_incident: {
        agent: 'No conformidades y avisos', icon: 'clipboard', systems: ['SAP S/4HANA', 'Microsoft Teams'],
        what: 'Abre la no conformidad con el borrador del 8D y envía los avisos',
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
        slug: 'wf-salmonella-materia-prima',
        name: 'Positivo de Salmonella en materia prima',
        approver: 'qa_shift',
        approverOptions: ['qa_shift', 'decider'],
        policy: 'PR-CAL-007',
        go: 'alarma',
        goLabel: 'Probarlo con la alarma de MP-2610-CC-118',
        next: 'La próxima alarma de LIMS lo ejecuta. La de MP-2610-CC-118 (ALM-LIMS-0550) de las 05:50 sigue abierta.',
        trigger: {
          system: 'LIMS', type: 'laboratorio', icon: 'flask', badges: ['LIMS'],
          label: 'Señal de Salmonella > {threshold}', sub: 'más de {minutes}',
          entry: 'Alarma de LIMS recibida por webhook',
          full: 'Señal de amplificación de Salmonella > {threshold} durante más de {minutes}'
        },
        steps: {
          cold_chain_monitor: { sub: 'Crítica > {critical}', what: 'Lee la señal del ensayo en LIMS, confirma el positivo y lo clasifica (crítico por encima de {critical})' },
          lot_traceability: { sub: 'Lotes, palés y expediciones', what: 'Lotes de premezcla fabricados con la materia prima, sus palés en almacén y sus expediciones a clientes' },
          quality_hold: { sub: 'Tras aprobar', what: 'Propone el bloqueo de calidad de la materia prima y de los lotes de premezcla; se aplica en SAP S/4HANA y en el MES de planta solo tras la aprobación', outputs: [{ icon: 'lock', text: 'Bloqueo de calidad en SAP S/4HANA y palés inmovilizados en el MES de planta, tras aprobar' }] },
          quality_incident: { sub: 'NC, 8D y aviso', systems: ['SAP S/4HANA', 'Microsoft Teams'], what: 'Abre la no conformidad en SAP S/4HANA con el borrador del 8D y avisa {al:notify} para retener las expediciones afectadas', outputs: [{ icon: 'clipboard', text: 'No conformidad en SAP S/4HANA con el borrador del 8D' }, { icon: 'message-square', text: 'Aviso por Teams {al:notify}' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Informe de incidencia (PDF) con el registro de auditoría' }],
        params: [
          { key: 'threshold', label: 'Umbral de señal', name: 'Umbral de señal', type: 'number', unit: 'RFU', min: 20, max: 400, step: 5, value: 100, integer: true, below: 'critical', ref: 'PR-CAL-004', hint: 'PR-CAL-004: 100 RFU', extract: { from: 'trigger', re: '(\\d{1,4})\\s*rfu\\b' } },
          { key: 'minutes', label: 'Durante más de', name: 'Tiempo por encima del umbral', type: 'number', unit: 'min', min: 1, max: 120, step: 1, value: 15, integer: true, ref: 'PR-CAL-004', hint: 'PR-CAL-004: 15 min', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Positivo crítico', name: 'Positivo crítico', type: 'number', unit: 'RFU', min: 100, max: 800, step: 5, value: 300, integer: true, above: 'threshold', ref: 'PR-CAL-004', hint: 'PR-CAL-004: 300 RFU', hl: 'Crítico', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,4})\\s*rfu\\b' } },
          { key: 'approver', label: 'Aprueba el bloqueo', ref: 'PR-CAL-007', hint: 'PR-CAL-007: solo Calidad y seguridad alimentaria bloquea y libera' },
          { key: 'notify', label: 'Aviso a', name: 'Aviso', type: 'role', value: 'plant_shift', options: ['plant_shift', 'logistics', 'customer_care'], ref: 'Política', hint: 'Por Microsoft Teams, para retener expediciones', extract: { kind: 'role', cap: 'quality_incident' } }
        ],
        check: { id: 'umbral', ref: 'PR-CAL-004', keys: ['threshold', 'minutes'], label: 'Umbral y tiempo', describe: '{threshold} durante más de {minutes}', extra: 'crítico por encima de {critical}', action: 'Contrasta los umbrales con PR-CAL-004' },
        scenarios: [
          'el LIMS registra una señal de Salmonella superior a {threshold} durante más de {minutes} en una muestra de materia prima',
          'salta una alarma de laboratorio por un positivo de Salmonella en una materia prima (p. ej. MP-2610-CC-118)',
          'el usuario informa de que una materia prima ha dado positivo en un análisis microbiológico',
          'hay que evaluar los lotes de premezcla y las expediciones expuestos a una materia prima contaminada'
        ],
        testUtterance: 'Alarma: la colina cloruro MP-2610-CC-118 da positivo de Salmonella en LIMS desde hace 40 minutos',
        matchGroups: [
          { re: '\\bmaterias? primas?\\b|\\bmp-\\d{4}|\\bcolina\\b|\\bpremezclas?\\b|\\blotes?\\b', w: 0.3, label: 'materia prima' },
          { re: '\\bsalmonella\\b|\\bpositivo\\w*|\\blims\\b|\\brfu\\b|\\bmicrobiolog\\w*|\\blaboratorio\\b', w: 0.3, label: 'laboratorio' },
          { re: '\\balarma\\w*|\\bsupera\\w*|\\bdesde hace\\b|\\bdetect\\w*|\\bconfirm\\w*', w: 0.25, label: 'alarma' },
          { re: '\\bplanta\\b|\\bpremezclas\\b', w: 0.07, label: 'planta' }
        ],
        config: {
          cold_chain_monitor: [['limite_rfu', '{=threshold}'], ['minutos_por_encima', '{=minutes}'], ['critico_rfu', '{=critical}'], ['ambito', 'Materias primas de la planta de premezclas (España)']],
          quality_hold: [['aprobador', '{approver}'], ['politica', 'PR-CAL-007']],
          quality_incident: [['plantilla', '8D'], ['aviso_a', '{notify}'], ['canal', 'Microsoft Teams']]
        },
        say: {
          draft: [
            'Cada frase está enlazada con lo que ha entendido: el disparador sale de «superior a {threshold} durante más de {minutes}».',
            'Cada paso dice qué sistema toca: LIMS para el resultado; SAP S/4HANA y el MES de planta para lotes, palés y expediciones; SAP S/4HANA y el MES para el bloqueo; SAP S/4HANA y Teams para la incidencia.',
            'El bloqueo no se aplica sin la aprobación de Calidad y seguridad alimentaria: lo exige PR-CAL-007 y el workflow lo respeta aunque el texto no lo dijera.'
          ],
          published: ['Desde ahora, una alarma de LIMS por un positivo de Salmonella lo dispara sola. Lo vemos con la alarma real de esta mañana: MP-2610-CC-118, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-contenido-aditivo',
        name: 'Reclamación de cliente por contenido inferior al declarado',
        approver: 'qa_shift',
        approverOptions: ['qa_shift', 'decider'],
        policy: 'PR-LAB-005',
        go: 'reclamacion',
        goLabel: 'Probarlo con la reclamación CLM-2026-1028',
        next: 'El próximo correo de reclamación lo ejecuta. La reclamación CLM-2026-1028 (vitamina E un 18 % inferior a lo declarado) está abierta.',
        trigger: {
          system: 'Correo', type: 'correo', icon: 'mail', badges: ['Outlook'],
          label: 'Reclamación en el buzón de Atención al cliente', sub: 'por contenido declarado',
          entry: 'Buzón de Atención al cliente',
          full: 'Reclamación de cliente en el buzón de Atención al cliente por un contenido inferior al declarado en una premezcla'
        },
        steps: {
          complaint_intake: { sub: 'Acuse en {ack}', what: 'Registra la reclamación en Salesforce, extrae cliente, lote, producto, parámetro reclamado, informe del cliente y plazo, y envía el acuse de recibo en {ack}', outputs: [{ icon: 'clipboard', text: 'Reclamación registrada en Salesforce con sus datos extraídos' }] },
          lot_traceability: { sub: 'Traza y verificación', what: 'Traza el lote hacia atrás (materias primas y proveedores) y hacia delante (expediciones) y verifica en LIMS el contenido declarado (PR-LAB-005)', outputs: [{ icon: 'git-branch', text: 'Traza del lote con materias primas, expediciones y verificación en LIMS' }] },
          quality_incident: { sub: '8D en {days}', systems: ['Salesforce CRM', 'Procedimientos'], what: 'Prepara el borrador del informe 8D con las reclamaciones similares de los últimos {months}', outputs: [{ icon: 'file-text', text: 'Borrador del informe 8D (PR-LAB-005), a entregar en {days}' }] },
          notifier: { sub: 'Tras aprobar', what: 'Redacta la respuesta en el idioma del cliente; se envía por correo solo después de aprobarla', outputs: [{ icon: 'send', text: 'Respuesta al cliente, enviada tras la aprobación' }] }
        },
        params: [
          { key: 'ack', label: 'Acuse de recibo', name: 'Acuse de recibo', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'PR-LAB-005', hint: 'PR-LAB-005: 24 h', extract: { from: 'text', re: '\\bacuse de recibo\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|horas)\\b' } },
          { key: 'days', label: 'Informe 8D', name: 'Plazo del informe 8D', type: 'number', unit: 'días', unitLong: 'días hábiles', min: 1, max: 30, step: 1, value: 10, integer: true, ref: 'PR-LAB-005', hint: 'PR-LAB-005: 10 días hábiles', hl: 'Plazo del informe', extract: { from: 'text', re: '(\\d{1,2})\\s*dias habiles\\b' } },
          { key: 'months', label: 'Histórico de reclamaciones', name: 'Histórico de reclamaciones', type: 'number', unit: 'meses', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Política', hint: 'Histórico de Salesforce', hl: 'Histórico', extract: { from: 'text', re: '(\\d{1,2})\\s*meses\\b' } },
          { key: 'approver', label: 'Aprueba la respuesta', ref: 'PR-LAB-005', hint: 'Antes de enviar nada al cliente' }
        ],
        check: { id: 'plazos', ref: 'PR-LAB-005', keys: ['ack', 'days'], label: 'Plazos', describe: 'acuse en {ack} e informe 8D en {days}', action: 'Contrasta los plazos con PR-LAB-005' },
        scenarios: [
          'llega al buzón de Atención al cliente la reclamación de un cliente por un contenido de vitamina inferior al declarado en una premezcla',
          'una fábrica de piensos se queja de que su análisis no coincide con la declaración del lote y hay que revisar el expediente',
          'hay que registrar una reclamación de cliente como caso en Salesforce'
        ],
        testUtterance: 'Nos ha llegado una reclamación de Piensos Cuenca Mediterráneo: su análisis del lote PRM-2610-0388 da un contenido de vitamina E un 18 % inferior al declarado',
        matchGroups: [
          { re: '\\breclam\\w*|\\bquej\\w*', w: 0.35, label: 'reclamación' },
          { re: '\\bclientes?\\b|\\bpiensos\\b|\\bfabrica\\b', w: 0.2, label: 'cliente' },
          { re: '\\bvitamina\\w*|\\boligoelement\\w*|\\bcontenido\\b|\\bdeclarad\\w*|\\banalisis\\b|\\binferior\\b|\\bdesviacion\\w*', w: 0.25, label: 'contenido' },
          { re: '\\blotes?\\b|\\bprm-\\d{4}|\\bclm-\\d{4}|\\bmp-\\d{4}', w: 0.12, label: 'lote' }
        ],
        config: {
          complaint_intake: [['acuse_horas', '{=ack}'], ['sistema', 'Salesforce CRM']],
          quality_incident: [['plantilla', '8D · PR-LAB-005'], ['plazo_dias_habiles', '{=days}'], ['historico_meses', '{=months}']],
          notifier: [['idioma', 'el del cliente'], ['aprobador', '{approver}']]
        },
        say: {
          draft: [
            'Cada frase del texto está enlazada con lo que ha entendido: el correo al buzón de Atención al cliente dispara el workflow y los plazos salen del propio texto.',
            'La traza llega a las materias primas, los proveedores y las expediciones del lote, el contenido declarado se verifica en LIMS y el 8D se prepara con las reclamaciones similares.',
            'Nada sale hacia el cliente sin la aprobación del {approver}; la respuesta se redacta en el idioma del cliente.'
          ],
          published: ['El próximo correo de reclamación lo ejecuta solo. Lo vemos con la reclamación CLM-2026-1028.']
        }
      },
      parte: {
        first: 'ec_plant_monitor',
        slug: 'wf-parte-diario-planta',
        name: 'Parte diario de operaciones y calidad · Madrid',
        approver: 'qa_shift',
        approverOptions: ['qa_shift', 'decider'],
        policy: 'PR-CAL-007',
        go: 'turno',
        goLabel: 'Ver el parte diario del turno',
        next: 'Se ejecuta cada día a las {time}.',
        trigger: {
          system: 'Programado', type: 'programado', icon: 'clock', badges: [],
          label: 'Cada día a las {time}', sub: 'Programado',
          entry: 'Programación diaria del servidor · {time}'
        },
        steps: {
          ec_plant_monitor: { sub: '12 indicadores', what: 'Lee SAP S/4HANA, el MES de planta y LIMS, compara 12 indicadores de la planta de premezclas con los umbrales de operaciones y abre tickets sin duplicar los abiertos', outputs: [{ icon: 'ticket', text: 'Tickets de operaciones, sin duplicar los ya abiertos' }] },
          quality_hold: { sub: 'Si hay MP sin liberar', gateVerb: 'bloquear órdenes', what: 'Si una materia prima con resultado de laboratorio pendiente o positivo figura en una orden de fabricación del día, propone bloquear la orden hasta su liberación (PR-CAL-004)', outputs: [{ icon: 'lock', text: 'Bloqueo de órdenes con materia prima sin liberar, tras aprobar' }] },
          quality_incident: { sub: 'Resumen en Teams', systems: ['Microsoft Teams'], what: 'Publica el resumen del parte en el canal «Operaciones y calidad · Madrid»', outputs: [{ icon: 'message-square', text: 'Resumen en el canal de Teams «Operaciones y calidad · Madrid»' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Parte diario de operaciones y calidad (PDF)' }],
        params: [
          { key: 'time', label: 'Hora del parte', name: 'Hora del parte', type: 'time', value: '07:00', ref: 'Política', hint: 'Lecturas de SAP S/4HANA, el MES de planta y LIMS', extract: { kind: 'time' } },
          { key: 'approver', label: 'Aprueba el bloqueo', ref: 'PR-CAL-007', hint: 'PR-CAL-007 · PR-CAL-004' }
        ],
        staticChecks: [
          { id: 'mp', text: 'Materias primas de riesgo (como la colina cloruro): no se consumen hasta liberar el análisis de Salmonella (PR-CAL-004)', stream: { action: 'Contrasta el parte con PR-CAL-004', result: 'MP-2610-CC-118: positivo de Salmonella (LAB-2610-0933); bloqueada y sin consumo en las órdenes de hoy' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bsin duplicar\\b', label: 'Regla', check: 'Tickets sin duplicar los que ya estén abiertos' }],
        scenarios: [
          'son las {time} y toca el parte diario de operaciones y calidad de la planta de premezclas',
          'el usuario pide el parte diario de la planta',
          'el usuario pregunta qué indicadores de operaciones o de calidad están en aviso hoy'
        ],
        testUtterance: 'Haz el parte diario de la planta de premezclas',
        matchGroups: [
          { re: '\\bparte\\b', w: 0.35, label: 'parte' },
          { re: '\\bplanta\\b|\\boperaciones\\b|\\bcalidad\\b|\\bindicadores?\\b|\\bpedidos\\b', w: 0.3, label: 'operaciones' },
          { re: '\\bdiario\\b|\\bhoy\\b|\\bturno\\b', w: 0.15, label: 'diario' },
          { re: '\\bpremezclas\\b|\\bmadrid\\b', w: 0.1, label: 'planta' }
        ],
        config: {
          ec_plant_monitor: [['hora', '{time}'], ['sistemas', '3'], ['indicadores', '12'], ['tickets', 'sin duplicar los ya abiertos']],
          quality_hold: [['aprobador', '{approver}'], ['politica', 'PR-CAL-007 · PR-CAL-004']],
          quality_incident: [['canal', 'Teams · Operaciones y calidad · Madrid']]
        },
        say: {
          draft: [
            'El parte es programado: cada día a las {time}, sin que nadie lo pida.',
            'Abre tickets solo para lo que no tenga ya uno abierto, y bloquea órdenes solo con la aprobación del {approver}.'
          ],
          published: ['Mañana a las {time} lo ejecuta solo; el de hoy está en el resumen del turno.']
        }
      }
    }
  }
});
