/* Empresa de Congelados · De palabras a workflow. Escenario de la demo de referencia con datos sintéticos (MFM).
 * Esquema documentado en la cabecera de assets/js/scenes/workflow.js. Regex sobre texto plegado (minúsculas, sin tildes).
 * Las temperaturas son negativas: el signo forma parte del grupo capturado («−18 °C» se pliega a «-18  c»). */
agenticPack('congelados', {
  workflow: {
    space: 'Calidad · Fustiñana',
    author: 'quality_shift',
    authorNoun: 'Calidad',
    alarmMatch: 'c[aá]mara|temperatura|cadena de fr[ií]o',
    approverRoles: ['quality_shift', 'quality_plant'],
    defaultPolicy: 'PNT-CAL-015',
    approverRule: {
      policy: 'PNT-CAL-015',
      text: 'solo Calidad aprueba bloqueos',
      note: 'Reasignada: PNT-CAL-015 reserva los bloqueos a Calidad'
    },
    triggerExamples: '«Cuando la temperatura de una cámara supere…» o «Cada día a las 06:00…»',
    rolePatterns: [
      ['quality_shift', '\\bresponsable de calidad de turno\\b|\\bcalidad de turno\\b'],
      ['quality_plant', '\\bresponsable de calidad de planta\\b|\\bcalidad de planta\\b'],
      ['dispatch_shift', '\\bjefe de turno de expedicion\\b|\\bjefe de expedicion\\b'],
      ['refrigeration_maintenance', '\\bmantenimiento frigorifico\\b'],
      ['line_maintenance', '\\bmantenimiento de linea\\b'],
      ['campaign_manager', '\\bjefe de campana\\b'],
      ['decider', '\\bdirector de operaciones\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:compr(?:a|ar|e|en|as)|vend(?:e|er|a|an)|invert(?:ir)?|inviert(?:e|a|an))\\b[^.;]{0,50}\\b(?:acciones (?:de|en)\\b|bolsa|bitcoins?|criptomonedas?|divisas|fondos de inversion)|\\btransferencias? bancarias?\\b|\\btransferir dinero\\b',
        title: 'Operación financiera',
        body: 'El texto pide comprar o vender acciones o mover dinero. Ningún agente del espacio Calidad · Fustiñana opera en mercados ni hace pagos, y Agentic Platform no crea pasos que no correspondan a un agente habilitado.'
      },
      {
        id: 'personas',
        re: '\\b(?:evalu\\w*|puntu\\w*|vigil\\w*|control\\w*|medir|mida|sancion\\w*|despid\\w*|rank\\w*)\\b[^.;]{0,40}\\b(?:trabajador\\w*|operari\\w*|emplead\\w*|plantilla|personal|personas)\\b',
        title: 'Evaluación de personas',
        body: 'El texto pide evaluar, vigilar o puntuar a personas. Los workflows de este espacio trabajan sobre equipos, lotes, palés y documentos de calidad; no valoran el desempeño de nadie.'
      },
      {
        id: 'control',
        re: '\\b(?:cambi\\w*|modific\\w*|ajust\\w*|baj(?:ar|e|a)|sub(?:ir|e|a))\\b[^.;]{0,30}\\b(?:consignas?|setpoints?)\\b|\\b(?:parar|pare|paren|arrancar|arranque|apagar|apague|encender|encienda)\\b[^.;]{0,25}\\b(?:compresor\\w*|evaporador\\w*|tunel\\w*|ventilador\\w*|escaldador\\w*)\\b',
        title: 'Actuación sobre el control de planta',
        body: 'El texto pide cambiar consignas o arrancar y parar equipos. Agentic Platform lee Galileo/SCADA y Mapex, pero no escribe en el control de planta: esos cambios los hace el personal de planta desde su sistema.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Disparador', 'Una alarma de Galileo/SCADA, un correo en el buzón de Calidad o una hora fija.'],
      ['cpu', '', 'Pasos y sistemas', 'Qué agente hace cada paso y qué sistema consulta o actualiza: SAP, Mapex, Easy WMS, Elara o Teams.'],
      ['user-check', 'warn', 'Aprobación humana', 'Quién decide antes de bloquear, retener o enviar, según PNT-CAL-015.'],
      ['file-text', '', 'Salidas', 'Bloqueos, no conformidades, avisos e informes que deja el workflow.']
    ],
    idleNote: 'Cada elemento queda enlazado con la frase del texto de la que sale y se contrasta con los procedimientos de Calidad antes de guardar el borrador.',
    presenter: {
      idle: [
        'Así escribe Calidad un procedimiento: en castellano, como en su PNT. No hay que dibujar ni programar nada.',
        'Agentic Platform lo convierte en un workflow de la plataforma: disparador, agentes en orden, aprobación humana y salidas, cada uno enlazado a su frase.',
        'Honestidad: el generador desde texto se simula aquí y su integración en Agentic Platform se valida en el piloto; los workflows (Routines), el editor, la aprobación y la auditoría son de serie.'
      ],
      outOfScopeExample: 'Compra acciones de una eléctrica cuando baje la luz'
    },

    templates: {
      alarma: {
        label: 'Cadena de frío',
        icon: 'thermometer',
        refs: 'PNT-CAL-012 y PNT-CAL-015',
        text: 'Cuando la temperatura de aire de una cámara de producto congelado de Fustiñana supere −18 °C durante más de 15 minutos, localizar los palés y lotes que estaban en la cámara durante la excursión y sus expediciones planificadas. Proponer el bloqueo de calidad de esos palés en SAP QM y en Easy WMS, que debe aprobar el Responsable de Calidad de turno antes de aplicarse. Si la temperatura supera −15 °C, tratarla como excursión crítica. Una vez aprobado el bloqueo, abrir una no conformidad en Elara con el borrador del 8D y avisar por Teams al Jefe de turno de expedición para retener las expediciones afectadas.'
      },
      reclamacion: {
        label: 'Reclamación',
        icon: 'mail',
        refs: 'PNT-CAL-020',
        text: 'Cuando llegue al buzón de Calidad una reclamación de cliente por cuerpo extraño, registrarla en Elara (lote, producto, defecto y plazo de respuesta) y enviar el acuse de recibo en 24 h. Trazar el lote hacia atrás (agricultor, recepción, línea y controles de cuerpos extraños) y hacia delante (palés y expediciones). Preparar el borrador del informe 8D según PNT-CAL-020, con las reclamaciones similares de los últimos 12 meses, y la respuesta al cliente en su idioma. La respuesta la aprueba el Responsable de Calidad de planta antes de enviarla; el informe 8D se entrega en 5 días hábiles.'
      },
      parte: {
        label: 'Parte diario',
        icon: 'activity',
        refs: 'PNT-CAL-015 y PNT-CAL-031',
        text: 'Cada día a las 06:00, revisar las lecturas de los equipos de Fustiñana en Mapex y Galileo (túneles IQF, escaldadores, selectoras ópticas, compresores de amoniaco, evaporadores, envasadoras y detectores de metales) y compararlas con los umbrales de planta. Para cada equipo en aviso o crítico, abrir un ticket de mantenimiento con la acción recomendada, sin duplicar las órdenes que ya estén abiertas. Si un detector de metales (PCC) tiene la verificación vencida, proponer la retención del producto envasado desde la última verificación correcta, que debe aprobar el Responsable de Calidad de turno. Publicar el resumen del parte en el canal de Teams de Mantenimiento.'
      }
    },

    catalog: {
      cold_chain_monitor: {
        agent: 'Monitor de cadena de frío', icon: 'thermometer', systems: ['SCADA Galileo'],
        what: 'Lee la serie de temperatura de la cámara, confirma la excursión y la clasifica',
        name: 'Rotura de cadena de frío', verb: 'revisar la cámara', token: 'cadena-frio',
        keywords: ['cadena de frio', '\\bcamaras?\\b', '\\btemperaturas?\\b', '\\bgrados\\b', '\\bexcursion(?:es)?\\b', '\\brotura de(?:l)? frio\\b', '\\b(?:pierd|perd)\\w*\\s+(?:el\\s+|de\\s+)?frio\\b'],
        strong: ['\\bconfirm\\w*', '\\bclasific\\w*', '\\bmedir\\b', '\\bvigil\\w*']
      },
      complaint_intake: {
        agent: 'Entrada de reclamaciones', icon: 'mail', systems: ['Outlook', 'Elara'],
        what: 'Registra la reclamación y extrae lote, producto, defecto y plazo',
        name: 'Reclamación de cliente', verb: 'registrar la reclamación', token: 'reclamacion',
        keywords: ['\\breclam\\w*', '\\bquej\\w*', '\\bcuerpo extrano\\b'],
        strong: ['\\bregistr\\w*', '\\bextraer\\b', '\\bdar de alta\\b']
      },
      ec_plant_monitor: {
        agent: 'Parte diario de planta', icon: 'activity', systems: ['MES Mapex', 'SCADA Galileo', 'GMAO'], multi: 2,
        what: 'Compara las lecturas con los umbrales de planta y abre tickets sin duplicar órdenes',
        name: 'Parte diario de planta', verb: 'hacer el parte de planta', token: 'parte-planta',
        keywords: ['\\bparte diario\\b', '\\blecturas de (?:los |las )?(?:equipos|maquinas)\\b', '\\btunel(?:es)? iqf\\b', '\\bescaldador\\w*', '\\bcompresor\\w*', '\\bdetector(?:es)? de metales\\b', '\\btickets? de mantenimiento\\b'],
        strong: ['\\brevis(?:ar|a|e)\\b', '\\blecturas\\b', '\\btickets? de mantenimiento\\b']
      },
      campaign_planner: {
        agent: 'Plan de campaña', icon: 'calendar', systems: ['Siemens Opcenter APS', 'SAP'],
        what: 'Compara la recepción de campo prevista con la capacidad de los túneles',
        name: 'Campaña de recepción de campo', verb: 'planificar la campaña', token: 'campana',
        keywords: ['\\bcampana\\b', '\\brecepcion de campo\\b', '\\bcosecha\\w*', '\\bparcelas?\\b'],
        strong: ['\\bplanific\\w*']
      },
      lot_traceability: {
        agent: 'Trazabilidad', icon: 'git-branch', systems: ['SAP', 'MES Mapex', 'Mecalux Easy WMS'],
        what: 'Localiza palés, lotes y expediciones, hacia atrás y hacia delante',
        name: 'Trazabilidad de lotes', verb: 'trazar lotes', token: 'traza',
        keywords: ['\\btrazab\\w*', '\\btraz(?:a|ar|alo|ala|alos|alas|ado|ados|ada|adas)\\b', ['\\blotes?\\b', '\\b(?:bloque\\w*|reten\\w*|retien\\w*|inmoviliz\\w*)\\s+(?:\\w+\\s+){0,2}$'], '\\b(?:localiz|identific)\\w*\\s+(?:los\\s+|las\\s+)?(?:pales|lotes|expediciones)\\b', '\\bhacia (?:atras|delante)\\b', '\\bde donde viene\\b'],
        strong: ['\\btraz(?:a|ar|alo|ala|alos|alas)\\b', '\\btrazab\\w*', '\\blocaliz\\w*', '\\bidentific\\w*']
      },
      quality_hold: {
        agent: 'Bloqueo de calidad', icon: 'lock', systems: ['SAP QM', 'Mecalux Easy WMS'], hitl: true, restricted: true, gateVerb: 'aplicar el bloqueo',
        what: 'Propone el bloqueo o la retención y solo lo aplica tras la aprobación',
        name: 'Bloqueo de calidad', verb: 'bloquear', token: 'bloqueo',
        keywords: ['\\bbloque\\w*', '\\breten\\w*', '\\bretien\\w*', '\\bcuarentena\\b', '\\binmoviliz\\w*'],
        strong: ['\\bbloque\\w*', '\\breten\\w*', '\\bretien\\w*', '\\binmoviliz\\w*', '\\bcuarentena\\b']
      },
      quality_incident: {
        agent: 'Incidencias', icon: 'clipboard', systems: ['Elara', 'Microsoft Teams'],
        what: 'Abre la no conformidad con el borrador del 8D y envía los avisos',
        name: 'Incidencia de calidad', verb: 'abrir incidencia', token: 'incidencia',
        keywords: ['\\bincidencias?\\b', '\\bno conformidad(?:es)?\\b', '\\b8d\\b', '\\binforme\\b', '\\bavis(?:ar|e|a|en)\\b', '\\bnotific(?:ar|a|e|en)\\b', '\\bpublic\\w* el resumen\\b'],
        strong: ['\\bno conformidad\\b', '\\b8d\\b', '\\bincidencias?\\b', '\\bpublic\\w* el resumen\\b', '\\bavis(?:ar|e|a|en)\\b']
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
        slug: 'wf-cadena-frio-camaras',
        name: 'Excursión de temperatura en cámara',
        approver: 'quality_shift',
        approverOptions: ['quality_shift', 'quality_plant'],
        policy: 'PNT-CAL-015',
        go: 'alarma',
        goLabel: 'Probarlo con la alarma de C-07',
        next: 'La próxima alarma de temperatura de Galileo/SCADA lo ejecuta. La de C-07 (ALM-C07-0550) de las 05:50 sigue abierta.',
        trigger: {
          system: 'Galileo/SCADA', type: 'temperatura', icon: 'thermometer', badges: ['SCADA Galileo'],
          label: 'Temperatura de aire > {threshold}', sub: 'más de {minutes}',
          entry: 'Alarma de Galileo/SCADA recibida por webhook',
          full: 'Temperatura de aire > {threshold} durante más de {minutes}'
        },
        steps: {
          cold_chain_monitor: { sub: 'Crítica > {critical}', what: 'Lee la serie de temperatura de aire, confirma la excursión y la clasifica (crítica por encima de {critical})' },
          lot_traceability: { sub: 'Lotes y expediciones', what: 'Palés y lotes que estaban en la cámara durante la excursión y sus expediciones planificadas' },
          quality_hold: { sub: 'Tras aprobar', what: 'Propone el bloqueo de calidad de los palés expuestos; se aplica en SAP QM y Easy WMS solo tras la aprobación', outputs: [{ icon: 'lock', text: 'Bloqueo de calidad en SAP QM y palés inmovilizados en Easy WMS, tras aprobar' }] },
          quality_incident: { sub: 'NC, 8D y aviso', systems: ['Elara', 'Microsoft Teams'], what: 'Abre la no conformidad en Elara con el borrador del 8D y avisa {al:notify} para retener las expediciones afectadas', outputs: [{ icon: 'clipboard', text: 'No conformidad en Elara con el borrador del 8D' }, { icon: 'message-square', text: 'Aviso por Teams {al:notify}' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Informe de incidencia (PDF) con el registro de auditoría' }],
        params: [
          { key: 'threshold', label: 'Umbral de aire', name: 'Umbral de aire', type: 'number', unit: '°C', min: -25, max: -10, step: 0.5, value: -18, ref: 'PNT-CAL-012', hint: 'PNT-CAL-012: −18 °C', below: 'critical', extract: { from: 'trigger', re: '(-?\\d{1,2}(?:[.,]\\d{1,2})?)\\s*(?:grados(?:\\s+centigrados)?|c)\\b' } },
          { key: 'minutes', label: 'Durante más de', name: 'Tiempo por encima del umbral', type: 'number', unit: 'min', min: 1, max: 120, step: 1, value: 15, integer: true, ref: 'PNT-CAL-012', hint: 'PNT-CAL-012: 15 min', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Excursión crítica', name: 'Excursión crítica', type: 'number', unit: '°C', min: -20, max: -5, step: 0.5, value: -15, above: 'threshold', ref: 'PNT-CAL-012', hint: 'PNT-CAL-012: −15 °C', hl: 'Crítico', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(-?\\d{1,2}(?:[.,]\\d{1,2})?)\\s*(?:grados(?:\\s+centigrados)?|c)\\b' } },
          { key: 'approver', label: 'Aprueba el bloqueo', ref: 'PNT-CAL-015', hint: 'PNT-CAL-015: solo Calidad bloquea y libera' },
          { key: 'notify', label: 'Aviso a', name: 'Aviso', type: 'role', value: 'dispatch_shift', options: ['dispatch_shift', 'refrigeration_maintenance', 'quality_plant'], ref: 'Política', hint: 'Por Microsoft Teams, para retener expediciones', extract: { kind: 'role', cap: 'quality_incident' } }
        ],
        check: { id: 'umbral', ref: 'PNT-CAL-012', keys: ['threshold', 'minutes'], label: 'Umbral y tiempo', describe: '{threshold} durante más de {minutes}', extra: 'crítica por encima de {critical}', action: 'Contrasta los umbrales con PNT-CAL-012' },
        scenarios: [
          'una cámara de producto congelado de Fustiñana supera {threshold} durante más de {minutes}',
          'salta una alarma de temperatura en una cámara de frío o de expedición (p. ej. la C-07 de Fustiñana)',
          'el usuario informa de que una cámara pierde frío',
          'hay que evaluar los lotes y palés expuestos a una rotura de la cadena de frío'
        ],
        testUtterance: 'Alarma: la cámara C-07 de Fustiñana marca −14 °C desde hace 40 minutos',
        matchGroups: [
          { re: '\\bcamaras?\\b|\\bc-\\d{2}\\b|\\bsilos?\\b', w: 0.3, label: 'cámara' },
          { re: '\\btemperatura\\w*|\\bgrados\\b|\\d\\s*c\\b|\\bfrio\\b', w: 0.3, label: 'temperatura' },
          { re: '\\balarma\\w*|\\bexcursion\\w*|\\bsupera\\w*|\\bmarca\\b|\\bpierd\\w*|\\bsube\\b|\\bsubido\\b', w: 0.25, label: 'alarma' },
          { re: '\\bfustinana\\b', w: 0.07, label: 'Fustiñana' }
        ],
        config: {
          cold_chain_monitor: [['limite_aire_c', '{=threshold}'], ['minutos_por_encima', '{=minutes}'], ['critico_aire_c', '{=critical}'], ['ambito', 'Cámaras de producto congelado de Fustiñana']],
          quality_hold: [['aprobador', '{approver}'], ['politica', 'PNT-CAL-015']],
          quality_incident: [['plantilla', '8D'], ['aviso_a', '{notify}'], ['canal', 'Microsoft Teams']]
        },
        say: {
          draft: [
            'Cada frase está enlazada con lo que ha entendido: el disparador sale de «supere {threshold} durante más de {minutes}».',
            'Cada paso dice qué sistema toca: Galileo para la temperatura; SAP, Mapex y Easy WMS para palés y lotes; SAP QM para el bloqueo; Elara y Teams para la incidencia.',
            'El bloqueo no se aplica sin la aprobación de Calidad: lo exige PNT-CAL-015 y el workflow lo respeta aunque el texto no lo dijera.'
          ],
          published: ['Desde ahora, una alarma de temperatura de Galileo/SCADA lo dispara sola. Lo vemos con la alarma real de esta mañana: C-07, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-cliente',
        name: 'Reclamación de cliente por cuerpo extraño',
        approver: 'quality_plant',
        approverOptions: ['quality_plant', 'quality_shift'],
        policy: 'PNT-CAL-020',
        go: 'reclamacion',
        goLabel: 'Probarlo con la reclamación UKC-44718',
        next: 'El próximo correo de reclamación lo ejecuta. La reclamación UKC-44718 está pendiente de respuesta.',
        trigger: {
          system: 'Outlook', type: 'correo', icon: 'mail', badges: ['Outlook'],
          label: 'Reclamación en el buzón de Calidad', sub: 'por cuerpo extraño',
          entry: 'Buzón de Calidad en Outlook',
          full: 'Reclamación de cliente en el buzón de Calidad por cuerpo extraño'
        },
        steps: {
          complaint_intake: { sub: 'Acuse en {ack}', what: 'Registra la reclamación en Elara, extrae lote, producto, defecto y plazo, y envía el acuse de recibo en {ack}', outputs: [{ icon: 'clipboard', text: 'Reclamación registrada en Elara con sus datos extraídos' }] },
          lot_traceability: { sub: 'Traza completa', what: 'Traza el lote: agricultor, recepción, línea y controles de cuerpos extraños; palés, SSCC y expediciones', outputs: [{ icon: 'git-branch', text: 'Traza del lote con palés y SSCC' }] },
          quality_incident: { sub: '8D en {days}', systems: ['Elara', 'Procedimientos'], what: 'Prepara el borrador del informe 8D (PNT-CAL-020) con las reclamaciones similares de los últimos {months}', outputs: [{ icon: 'file-text', text: 'Borrador del informe 8D (PNT-CAL-020), a entregar en {days}' }] },
          notifier: { sub: 'Tras aprobar', what: 'Redacta la respuesta en el idioma del cliente; se envía por Outlook solo después de aprobarla', outputs: [{ icon: 'send', text: 'Respuesta al cliente, enviada tras la aprobación' }] }
        },
        params: [
          { key: 'ack', label: 'Acuse de recibo', name: 'Acuse de recibo', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'PNT-CAL-020', hint: 'PNT-CAL-020: 24 h', extract: { from: 'text', re: '\\bacuse de recibo\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|horas)\\b' } },
          { key: 'days', label: 'Informe 8D', name: 'Plazo del 8D', type: 'number', unit: 'días', unitLong: 'días hábiles', min: 1, max: 30, step: 1, value: 5, integer: true, ref: 'PNT-CAL-020', hint: 'PNT-CAL-020: 5 días hábiles', hl: 'Plazo del 8D', extract: { from: 'text', re: '(\\d{1,2})\\s*dias habiles\\b' } },
          { key: 'months', label: 'Histórico de reclamaciones', name: 'Histórico de reclamaciones', type: 'number', unit: 'meses', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Política', hint: 'Histórico de Elara', hl: 'Histórico', extract: { from: 'text', re: '(\\d{1,2})\\s*meses\\b' } },
          { key: 'approver', label: 'Aprueba la respuesta', ref: 'PNT-CAL-020', hint: 'Antes de enviar nada al cliente' }
        ],
        check: { id: 'plazos', ref: 'PNT-CAL-020', keys: ['ack', 'days'], label: 'Plazos', describe: 'acuse en {ack} e informe 8D en {days}', action: 'Contrasta los plazos con PNT-CAL-020' },
        scenarios: [
          'llega al buzón de Calidad la reclamación de un cliente por un defecto o un cuerpo extraño en un lote',
          'un cliente internacional se queja de un producto congelado y hay que investigar el lote',
          'hay que registrar una reclamación de cliente como no conformidad'
        ],
        testUtterance: 'Nos ha llegado una reclamación de un cliente del Reino Unido por una piedra en el lote L26-231-FUS-GUI-01',
        matchGroups: [
          { re: '\\breclam\\w*|\\bquej\\w*', w: 0.35, label: 'reclamación' },
          { re: '\\bclientes?\\b', w: 0.2, label: 'cliente' },
          { re: '\\bcuerpos? extran\\w*|\\bpiedras?\\b|\\bmetal\\w*|\\bplastico\\w*|\\bdefecto\\w*', w: 0.25, label: 'defecto' },
          { re: '\\blotes?\\b|\\bl\\d{2}-\\d{3}', w: 0.12, label: 'lote' }
        ],
        config: {
          complaint_intake: [['acuse_horas', '{=ack}'], ['sistema', 'Elara']],
          quality_incident: [['plantilla', '8D · PNT-CAL-020'], ['plazo_dias_habiles', '{=days}'], ['historico_meses', '{=months}']],
          notifier: [['idioma', 'el del cliente'], ['aprobador', '{approver}']]
        },
        say: {
          draft: [
            'Cada frase del texto está enlazada con lo que ha entendido: el correo al buzón de Calidad dispara el workflow y los plazos salen del propio texto.',
            'La traza llega al agricultor, la recepción, la línea y los controles de cuerpos extraños, y el 8D se prepara con las reclamaciones similares.',
            'Nada sale hacia el cliente sin la aprobación del {approver}; la respuesta se redacta en el idioma del cliente.'
          ],
          published: ['El próximo correo de reclamación lo ejecuta solo. Lo vemos con la reclamación UKC-44718.']
        }
      },
      parte: {
        first: 'ec_plant_monitor',
        slug: 'wf-parte-diario-planta',
        name: 'Parte diario de equipos · Fustiñana',
        approver: 'quality_shift',
        approverOptions: ['quality_shift', 'quality_plant'],
        policy: 'PNT-CAL-015',
        go: 'turno',
        goLabel: 'Ver el parte diario del turno',
        next: 'Se ejecuta cada día a las {time}.',
        trigger: {
          system: 'Programado', type: 'programado', icon: 'clock', badges: [],
          label: 'Cada día a las {time}', sub: 'Programado',
          entry: 'Programación diaria del servidor · {time}'
        },
        steps: {
          ec_plant_monitor: { sub: '11 equipos', what: 'Lee 11 equipos en Mapex y Galileo, los compara con 9 indicadores de planta y abre tickets en la GMAO sin duplicar órdenes abiertas', outputs: [{ icon: 'ticket', text: 'Tickets de mantenimiento en la GMAO, sin duplicar órdenes abiertas' }] },
          quality_hold: { sub: 'Si falla un PCC', gateVerb: 'retener producto', what: 'Si un detector de metales (PCC) supera 2 h sin verificar, propone retener el producto envasado desde la última verificación correcta (PNT-CAL-031)', outputs: [{ icon: 'lock', text: 'Retención del producto envasado si falla un PCC, tras aprobar' }] },
          quality_incident: { sub: 'Resumen en Teams', systems: ['Microsoft Teams'], what: 'Publica el resumen del parte en el canal «Mantenimiento · Fustiñana»', outputs: [{ icon: 'message-square', text: 'Resumen en el canal de Teams «Mantenimiento · Fustiñana»' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Parte diario de equipos (PDF)' }],
        params: [
          { key: 'time', label: 'Hora del parte', name: 'Hora del parte', type: 'time', value: '06:00', ref: 'Política', hint: 'Lecturas de Mapex y Galileo', extract: { kind: 'time' } },
          { key: 'approver', label: 'Aprueba la retención', ref: 'PNT-CAL-015', hint: 'PNT-CAL-015 · PNT-CAL-031' }
        ],
        staticChecks: [
          { id: 'pcc', text: 'Detectores de metales como PCC: verificación cada 2 h (PNT-CAL-031)', stream: { action: 'Contrasta el parte con PNT-CAL-031', result: 'DM-1 es PCC: verificación con probetas cada 2 h' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bsin duplicar\\b', label: 'Regla', check: 'Tickets sin duplicar las órdenes abiertas de la GMAO' }],
        scenarios: [
          'son las {time} y toca el parte diario de los equipos de Fustiñana',
          'el usuario pide el parte diario de los equipos de la planta',
          'el usuario pregunta qué equipos de la planta están dando problemas hoy'
        ],
        testUtterance: 'Haz el parte diario de la planta de Fustiñana',
        matchGroups: [
          { re: '\\bparte\\b', w: 0.35, label: 'parte' },
          { re: '\\bequipos?\\b|\\bplanta\\b|\\bmaquinas?\\b|\\blineas?\\b', w: 0.3, label: 'equipos' },
          { re: '\\bdiario\\b|\\bhoy\\b|\\bturno\\b', w: 0.15, label: 'diario' },
          { re: '\\bfustinana\\b', w: 0.1, label: 'Fustiñana' }
        ],
        config: {
          ec_plant_monitor: [['hora', '{time}'], ['equipos', '11'], ['indicadores', '9'], ['tickets', 'GMAO, sin duplicar órdenes abiertas']],
          quality_hold: [['aprobador', '{approver}'], ['politica', 'PNT-CAL-015 · PNT-CAL-031']],
          quality_incident: [['canal', 'Microsoft Teams · Mantenimiento · Fustiñana']]
        },
        say: {
          draft: [
            'El parte es programado: cada día a las {time}, sin que nadie lo pida.',
            'Abre tickets solo para lo que no tenga ya una orden abierta en la GMAO, y retiene producto solo con la aprobación del {approver}.'
          ],
          published: ['Mañana a las {time} lo ejecuta solo; el de hoy está en el resumen del turno.']
        }
      }
    }
  }
});
