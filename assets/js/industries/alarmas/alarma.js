/* Guardián Ibérica Instalaciones · alarma con aprobación: caída de comunicación 4G de 214 paneles en Valencia Norte tras un mantenimiento del operador móvil.
 * Escenario de la demo con datos sintéticos (MFM). Las funciones reciben el contexto H de la escena
 * (W workflow, C condición evaluada, sc alcance vigente, ids generados al aprobar, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Paneles sin comunicación 4G en Valencia Norte (portales de partner), una lectura cada 2 min de 05:00 a 06:00. */
  const COUNTS = [2, 2, 3, 2, 3, 58, 112, 163, 196, 214, 221, 226, 229, 231, 233, 235, 236, 237, 238, 239, 240, 241, 238, 232, 224, 214, 205, 190, 150, 96, 38];
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = COUNTS.map((v, i) => ({ time: hhmm(300 + i * 2), value: v }));

  /* Grupos de paneles sin comunicación a las 05:50: 214 paneles, 38 sin vía de respaldo IP. */
  const ITEMS = [
    { id: 'SA-RES-VLCN', title: 'Sector Alarm · residencial', sub: 'Hogares de Burjassot, Godella y Rocafort', zone: 'Burjassot', count: 62, nobk: 14, fee: 42, code: 'SAR', hold: 'VIS-26-61103' },
    { id: 'VER-RES-VLCN', title: 'Verisure · residencial', sub: 'Hogares de Benimaclet, Orriols y Campanar', zone: 'Benimaclet', count: 58, nobk: 9, fee: 44, code: 'VER', hold: 'VIS-26-61104' },
    { id: 'VER-NEG-VLCN', title: 'Verisure · pequeño negocio', sub: 'Comercios con vigilancia contratada', zone: 'Campanar', count: 24, nobk: 6, fee: 69, code: 'VEN', hold: 'VIS-26-61101' },
    { id: 'SA-NEG-VLCN', title: 'Sector Alarm · pequeño negocio', sub: 'Comercios y oficinas con videoverificación', zone: 'Orriols', count: 28, nobk: 5, fee: 67, code: 'SAN', hold: 'VIS-26-61102' },
    { id: 'PRO-RES-VLCN', title: 'Prosegur Alarmas · residencial', sub: 'Hogares de Rocafort y Godella', zone: 'Rocafort', count: 27, nobk: 3, fee: 43, code: 'PRR', hold: 'VIS-26-61105' },
    { id: 'PRO-NEG-VLCN', title: 'Prosegur Alarmas · pequeño negocio', sub: 'Comercios de barrio', zone: 'Rocafort', count: 15, nobk: 1, fee: 66, code: 'PRN', hold: 'VIS-26-61105' }
  ];
  /* Paneles de las mismas celdas con señal 4G degradada pero sin corte, y paneles ya restablecidos antes de la alarma. */
  const ELSE = {
    'SA-RES-VLCN': [{ loc: 'CELDA-VLC-N3', count: 11, note: 'Paneles de Sector Alarm con señal 4G degradada, sin corte' }],
    'VER-RES-VLCN': [{ loc: 'CELDA-VLC-N4', count: 9, note: 'Paneles de Verisure con señal 4G degradada, sin corte' }],
    'VER-NEG-VLCN': [{ loc: 'CELDA-VLC-N3', count: 4, note: 'Comercios de Verisure con señal 4G degradada, sin corte' }],
    'PRO-RES-VLCN': [{ loc: 'CELDA-VLC-NO2', count: 6, note: 'Paneles de Prosegur Alarmas con señal 4G degradada, sin corte' }]
  };
  const GONE = {
    'SA-RES-VLCN': [{ id: 'RST-26-61090', date: '2026-10-19', time: '05:44', count: 12, to: 'Paneles de Sector Alarm que recuperaron el 4G por sí solos' }],
    'VER-RES-VLCN': [{ id: 'RST-26-61091', date: '2026-10-19', time: '05:46', count: 15, to: 'Paneles de Verisure que recuperaron el 4G por sí solos' }]
  };
  /* Paneles afectados: PAN-VLC-<grupo>-<n>; los primeros de cada grupo son los que no tienen vía de respaldo IP. */
  const UNITS = [];
  ITEMS.forEach((l) => {
    for (let k = 0; k < l.count; k += 1) {
      UNITS.push({ item: l.id, product: l.title, pallet: `${k + 1}/${l.count}`, sscc: `PAN-VLC-${l.code}-${String(k + 1).padStart(3, '0')}`, kg: k < l.nobk ? 'Sin respaldo' : 'Con respaldo IP', position: `Valencia Norte · ${l.zone}`, hold: l.hold });
    }
  });

  const ROLE = {
    ops: 'Responsable de operaciones', support: 'Responsable de soporte técnico', support_shift: 'Responsable de soporte técnico',
    maintenance_shift: 'Jefe de mantenimiento', install_shift: 'Jefe de instalaciones', customer_care: 'Atención al cliente', decider: 'Responsable de operaciones'
  };
  const TEAMS = '#soporte-tecnico-vlc';
  const ANT_LOT = 'VER-NEG-VLCN';
  const lots = (sc) => sc.items.length;
  const hasAnt = (sc) => sc.items.some((l) => l.id === ANT_LOT);
  const palsOf = (sc, h) => sc.items.filter((l) => l.hold === h.id).reduce((s, l) => s + l.qty, 0);
  const nobk = (H, q) => `${H.fmt.num(q)} sin respaldo`;

  agenticPack('alarmas', {
    alarma: {
      nav: 'Alarma de comunicación',
      title: 'Alarma de comunicación en ejecución',
      icon: 'activity',
      page_title: 'Valencia Norte · caída de comunicación 4G',
      alarm_id: 'ALM-COM-0611',
      alarm_time: '05:50',
      source_system: 'Sector Alarm Partner Hub',
      asset: 'paneles de Valencia Norte',
      location: 'Valencia Norte · Burjassot, Benimaclet, Campanar y Rocafort',
      excursion_noun: 'caída',
      workflow_topic: 'comunicación de paneles',
      policy_ref: 'PR-COM-003',
      procedures: 'PR-COM-003 · PR-SOP-007',
      decider_short: 'Soporte técnico',
      approval_node: 'Aprobación de Soporte técnico',
      measure: { short: 'paneles sin comunicación', col: 'Paneles', unit: 'paneles', dec: 0, icon: 'activity' },
      setpoint: 2,
      setpoint_label: 'nivel habitual',
      limit: 40,
      critical: 150,
      min_minutes: 10,
      interval_min: 2,
      series: SERIES,
      peak: 241,
      peak_time: '05:42',
      current: 38,
      current_time: '06:00',
      current_note: 'por debajo del límite desde las 06:00',
      chart: {
        title: 'Valencia Norte · paneles sin comunicación 4G',
        sub: 'Nivel habitual 2 paneles · ahora 38 (06:00)',
        tab: 'Paneles',
        series_label: 'Paneles sin comunicación (portales de partner)',
        yTicks: [0, 50, 100, 150, 200, 250],
        xTicks: ['05:00', '05:20', '05:40', '06:00']
      },
      event_kv: [
        ['Zona', 'Valencia Norte · Burjassot, Benimaclet, Campanar, Orriols y Rocafort'],
        ['Fuente', 'Partner Hub y portales de partner · comunicación 4G · lectura cada 2 min'],
        ['Operador móvil', 'Mantenimiento en las celdas de Valencia Norte desde las 05:10'],
        ['Sede', 'Guardián Ibérica Instalaciones · Paterna (Valencia)']
      ],
      events: [
        { time: '05:10', end: '05:20', text: 'El operador móvil inicia un mantenimiento en las celdas de Valencia Norte sin aviso previo al instalador', equipment: 'Red 4G', tone: 'brand', band: 'Mantenimiento del operador' },
        { time: '05:10', end: '05:20', text: 'Los paneles pierden la comunicación 4G: de 3 a 214 en 10 min', equipment: 'Paneles', tone: 'warn', band: 'Caída de paneles', bandTone: 'warn' },
        { time: '05:42', text: 'Pico de la caída: 241 paneles sin comunicación', tone: 'warn' },
        { time: '05:50', text: 'Alarma del Partner Hub: más de 40 paneles sin comunicación 4G', ref: 'ALM-COM-0611', tone: 'crit' },
        { time: '05:52', end: '06:00', text: 'Soporte técnico comprueba las celdas: 176 paneles tienen vía de respaldo IP y 38 no', equipment: 'Soporte técnico', tone: 'brand', band: 'Verificación de respaldo' },
        { time: '05:56', text: 'El operador móvil restablece parte de las celdas y la caída baja a 150 paneles', tone: 'ok' },
        { time: '06:00', text: 'Quedan 38 paneles sin comunicación y sin vía de respaldo: sin supervisión remota', tone: 'warn' }
      ],
      probable_cause: 'Hipótesis a confirmar por el Responsable de soporte técnico: el mantenimiento del operador móvil en las celdas de Valencia Norte (desde las 05:10) dejó sin 4G a los paneles; 38 de ellos no tienen vía de respaldo IP y siguen sin supervisión remota.',
      backup: { id: 'wf-comunicacion-respaldo', name: 'Pérdida de comunicación de paneles', version: 'v1', threshold: 40, minutes: 10, critical: 150, approver: ROLE.support },
      untouched: 'los portales de partner, Salesforce CRM, SAP Business One, Twilio SMS ni Slack',
      apply_systems: 'los portales de partner, Salesforce CRM, Twilio SMS y Slack',
      llm_cost_usd: 0.04,
      ids: [
        { key: 'blq', prefix: 'OT-2026-', start: 31207, label: 'Orden de trabajo' },
        { key: 'nc', prefix: 'INC-2026-0', start: 612, label: 'Incidencia' }
      ],
      block_id_key: 'blq',
      proposer: 'blq',
      lanes: [
        { id: 'mon', name: 'Monitor de comunicación', short: 'Monitor', icon: 'activity', systems: ['Sector Alarm Partner Hub', 'Verisure Partner Portal'], idle: 'Confirma la caída con las lecturas de los portales de partner', gsub: 'confirma la caída', gsys: ['Partner Hub', 'Verisure'] },
        { id: 'traz', name: 'Trazabilidad', icon: 'git-branch', systems: ['Salesforce CRM', 'SAP Business One', 'Prosegur Partner Portal'], idle: 'Localiza paneles, clientes y vías de respaldo', gsub: 'paneles, clientes y respaldo', gsys: ['Salesforce', 'SAP', 'Prosegur'] },
        { id: 'blq', phase: 2, name: 'Conmutación y visitas', icon: 'calendar', systems: ['Verisure Partner Portal', 'Salesforce CRM'], idle: 'Prepara la conmutación y las visitas y pide la aprobación de Soporte técnico', gsub: 'conmuta y programa visitas', gsys: ['Partners', 'Salesforce'] },
        { id: 'inc', phase: 2, name: 'Incidencias y avisos', icon: 'clipboard', systems: ['Salesforce CRM', 'Twilio SMS', 'Slack'], idle: 'Abre la incidencia, avisa a los clientes y despacha mantenimiento', gsub: 'incidencia, SMS y aviso', gsys: ['Salesforce', 'Twilio', 'Slack'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'Sector Alarm Partner Hub', verb: 'Consultando', action: 'Lee el estado de comunicación 4G de los paneles de Valencia Norte de 05:00 a 06:00, una lectura cada 2 min', result: `${SERIES.length} lecturas, sin huecos · ahora ${H.fv(38)} (06:00)`, ms: 1850, set: { volume: `${SERIES.length} lecturas de comunicación` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'Verisure Partner Portal', verb: 'Consultando', action: 'Cruza la caída con el calendario de mantenimiento del operador móvil y el estado de las celdas', result: `Mantenimiento del operador desde las 05:10 en las celdas de Valencia Norte, sin aviso previo: hipótesis para el ${ROLE.support}`, tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} lecturas · 7 eventos`, result: `Caída confirmada: ${H.C.above} min por encima · pico ${H.fv(241)}` } },
            { lane: 'traz', system: 'Sector Alarm Partner Hub', verb: 'Consultando', action: `Lista los paneles sin comunicación entre ${H.C.start} y ${H.C.end}, por marca y segmento`, result: `${a.count} paneles en ${lots(a)} grupos`, ms: 2100, set: { volume: `${a.count} paneles` } },
            { lane: 'traz', system: 'Salesforce CRM', verb: 'Consultando', action: 'Resuelve cliente, contrato y servicio contratado (vigilancia, videoverificación) de cada panel', result: `${lots(a)} grupos de contratos · ${H.fmt.eur(a.value)} de cuota mensual`, ms: 2600, set: { volume: `${a.count} paneles · ${lots(a)} grupos` }, reveal: 'lots' },
            { lane: 'traz', system: 'SAP Business One', verb: 'Consultando', action: `Confirma modelo de panel, módulo 4G y vía de respaldo IP de los ${lots(a)} grupos`, result: `${a.count - a.qty} paneles con respaldo IP y ${a.qty} sin respaldo: los comercios con vigilancia contratada son lo más sensible`, ms: 1900 },
            { lane: 'traz', system: 'Prosegur Partner Portal', verb: 'Consultando', action: 'Busca paneles de las mismas celdas con señal degradada pero sin corte', result: `${a.elseTotal} paneles en CELDA-VLC-N3, N4 y NO2, a evaluar · ${H.goneTotal} ya restablecidos antes de la alarma`, ms: 1700, reveal: 'map' },
            { lane: 'traz', system: 'Salesforce CRM', verb: 'Consultando', action: 'Consulta las visitas y los compromisos de servicio de los paneles sin respaldo', result: `${a.holds.length} ventanas de visita; la primera, ${H.first.id}, a las ${H.first.time} en ${H.first.where}`, tone: 'warn', ms: 2200, set: { volume: `${a.count} paneles · ${lots(a)} grupos · ${a.holds.length} visitas`, result: `Primera visita prioritaria a las ${H.first.time}` }, milestone: 'traz', audit: { action: 'Paneles y contratos identificados', detail: `${a.count} paneles de ${lots(a)} grupos sin comunicación · ${a.qty} sin respaldo IP · ${a.holds.length} ventanas de visita · ${a.elseTotal} paneles con señal degradada en las mismas celdas` } },
            { lane: 'blq', node: 'apr', system: 'Procedimientos', verb: 'Analizando', action: 'Aplica PR-COM-003 y PR-SOP-007 a esta caída', result: 'Conmutar a la vía de respaldo los paneles que la tienen, visitar con prioridad los que no y avisar a los clientes; solo Soporte técnico aprueba', ms: 1300 },
            { lane: 'blq', node: 'apr', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta la propuesta de conmutación y visitas con las evidencias', result: `Propuesta: ${a.count - a.qty} paneles a la vía de respaldo y ${a.qty} visitas prioritarias en ${a.holds.length} ventanas; ${a.elseTotal} paneles con señal degradada, a evaluar`, ms: 7000, set: { volume: `${a.count} paneles · ${a.qty} visitas` } },
            { lane: 'blq', node: 'apr', system: 'Agentic Platform', verb: 'Evaluando', action: `Pide la aprobación del ${H.W.approver} antes de escribir en los portales de partner y en Salesforce`, result: 'Esperando la decisión de Soporte técnico', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Propuesta enviada a Soporte técnico' }, milestone: 'prop', audit: { action: 'Propuesta de conmutación y visitas enviada a aprobación', detail: `${a.count} paneles de ${lots(a)} grupos · ${a.qty} visitas prioritarias · aprueba ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          const ships = sc.holds.map((h) => h.id).join(', ');
          return [
            { lane: 'blq', system: 'Verisure Partner Portal', verb: 'Aplicando', action: `Fuerza la conmutación a la vía de respaldo IP de ${H.pl(sc.count - sc.qty)} con respaldo y verifica su supervisión`, result: `${ids.blq} · ${sc.count - sc.qty} paneles supervisados por IP`, tone: 'ok', ms: 2400, milestone: 'blq', audit: { action: 'Conmutación aplicada', detail: `${ids.blq} · portales de partner · ${sc.count - sc.qty} paneles de ${lots(sc)} grupos a la vía de respaldo` } },
            { lane: 'blq', system: 'Salesforce CRM', verb: 'Aplicando', action: `Programa ${sc.qty} visitas prioritarias a los paneles sin respaldo y asigna sus ${sc.holds.length} ventanas`, result: `${sc.qty} visitas programadas · ${sc.holds.length} ventanas, la primera ${H.holdWhen(sc.holds[0]).includes('/') ? 'el' : 'a las'} ${H.holdWhen(sc.holds[0])}`, tone: 'ok', ms: 2100, set: { result: `${ids.blq} aplicado · ${sc.holds.length} ventanas de visita` }, milestone: 'wms', audit: { action: 'Visitas prioritarias programadas', detail: `Salesforce CRM · ${sc.qty} paneles sin respaldo · ${ships}` } },
            { lane: 'inc', system: 'Salesforce CRM', verb: 'Aplicando', action: 'Abre la incidencia de comunicación con la curva de paneles, los eventos y la lista de paneles', result: `${ids.nc} abierta${hasAnt(sc) ? ' · antecedente INC-2026-0463 enlazado' : ''}`, tone: 'ok', ms: 1900, set: { volume: '1 incidencia' }, milestone: 'nc', audit: { action: 'Incidencia abierta', detail: `${ids.nc} · Salesforce CRM · caída de comunicación en Valencia Norte` } },
            { lane: 'inc', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta el borrador de 8D (D1–D8) con responsables por rol', result: 'Borrador de 8D listo para la revisión de Soporte técnico', ms: 7800, set: { volume: '1 incidencia · 8D en borrador' }, milestone: 'd8', audit: { action: 'Borrador de 8D redactado', detail: `${ids.nc} · D1–D8 · pendiente de revisión de Soporte técnico` } },
            { lane: 'inc', system: 'Twilio SMS', verb: 'Enviando', action: `Envía un SMS a los clientes de los ${sc.count} paneles afectados con el estado de su alarma`, result: `${sc.count} SMS enviados por Twilio`, tone: 'ok', ms: 1600, set: { volume: '1 incidencia · 8D · SMS enviados' }, audit: { action: 'SMS enviados a los clientes', detail: `Twilio SMS · ${sc.count} clientes de ${lots(sc)} grupos` } },
            { lane: 'inc', system: 'Slack', verb: 'Enviando', action: `Avisa al ${ROLE.maintenance_shift} y a ${ROLE.customer_care}`, result: `Aviso publicado en el canal ${TEAMS}`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 incidencia · 8D · SMS · 1 aviso', result: `${ids.nc} abierta · mantenimiento avisado` }, milestone: 'teams', audit: { action: 'Aviso enviado por Slack', detail: `${ROLE.maintenance_shift} y ${ROLE.customer_care} · canal ${TEAMS}` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Paneles sin comunicación 4G', value: H.all.count, sub: `${lots(H.all)} grupos · ${nobk(H, H.all.qty)}`, icon: 'activity' },
        { label: 'Primera visita prioritaria', value: H.first.time, sub: `${H.first.id} · ${H.first.where} · ${nobk(H, palsOf(H.all, H.first))}${held ? ' · programada' : ''}`, icon: 'calendar' }
      ],
      scope: {
        icon: 'activity',
        unit: ['panel', 'paneles'],
        item_noun: ['grupo', 'grupos'],
        qty_unit: 'sin respaldo',
        per_square: 1,
        items: ITEMS.map((l) => Object.assign({
          id: l.id, title: l.title, sub: l.sub, group: l.zone, group_short: l.zone,
          count: l.count, qty: l.nobk, value: l.count * l.fee, hold: l.hold
        }, ELSE[l.id] ? { elsewhere: ELSE[l.id] } : {}, GONE[l.id] ? { gone: GONE[l.id] } : {})),
        holds: {
          'VIS-26-61101': { date: '2026-10-19', time: '08:00', where: 'Campanar', label: 'Comercios con vigilancia contratada (Verisure): 6 paneles sin respaldo' },
          'VIS-26-61102': { date: '2026-10-19', time: '08:45', where: 'Orriols', label: 'Comercios y oficinas de Sector Alarm con videoverificación: 5 paneles sin respaldo' },
          'VIS-26-61103': { date: '2026-10-19', time: '09:30', where: 'Burjassot y Godella', label: 'Hogares de Sector Alarm: 14 paneles sin respaldo' },
          'VIS-26-61104': { date: '2026-10-19', time: '10:30', where: 'Benimaclet y Orriols', label: 'Hogares de Verisure: 9 paneles sin respaldo' },
          'VIS-26-61105': { date: '2026-10-19', time: '12:00', where: 'Rocafort', label: 'Hogares y comercios de Prosegur Alarmas: 4 paneles sin respaldo' }
        },
        units: UNITS,
        csv_name: 'paneles-sin-comunicacion-valencia-norte',
        csv_cols: [
          { label: 'Grupo', key: 'item' },
          { label: 'Marca y segmento', key: 'product' },
          { label: 'Panel', key: 'pallet' },
          { label: 'ID de panel', key: 'sscc', text: true },
          { label: 'Vía de respaldo', key: 'kg' },
          { label: 'Zona', key: 'position' },
          { label: 'Visita prioritaria', key: 'hold' }
        ],
        labels: {
          items_title: 'Grupos de paneles afectados',
          items_systems: 'los portales de partner y Salesforce CRM',
          items_where: 'paneles sin comunicación,',
          item_col: 'Grupo',
          at_col: 'Sin comunicación',
          group_col: 'Zona',
          hold_col: 'Visita prioritaria',
          else_col: 'Señal degradada',
          else_none: 'Sin paneles',
          gone_verb: 'restablecidos',
          exposed: 'Afectado',
          blocked: 'Conmutado',
          unblocked: 'Sin conmutar',
          block_noun: 'conmutación',
          block_verb: 'Conmutar y visitar',
          hold_verb: 'Programar',
          held: 'Programadas',
          holds_label: 'Visitas prioritarias',
          holds_first: 'la primera',
          scope_main: 'Paneles sin comunicación 4G',
          else_scope: 'Paneles con señal degradada en las mismas celdas',
          else_decision: 'A evaluar',
          map_title: 'Ubicación de los paneles',
          map_sub: 'Partner Hub · Valencia Norte',
          zone_title: 'Valencia Norte · cobertura 4G',
          zone_sub: '6 grupos · 214 paneles',
          else_title: 'Mismas celdas con señal degradada',
          else_sub: 'sin corte · a evaluar',
          gone_title: 'Restablecidos antes de la alarma',
          legend_exposed: 'Sin comunicación 4G',
          legend_else: 'A evaluar: señal degradada',
          csv_button: 'Descargar paneles (CSV)',
          value_label: 'de cuota mensual',
          report_scope: 'Alcance de la conmutación'
        }
      },
      text: {
        proposal_title: 'propuesta de conmutación y visitas',
        stop_without: 'proponer la conmutación',
        activates: 'la conmutación',
        no_proposal: 'sin propuesta de conmutación',
        idle_log: 'La ejecución se detiene en la aprobación: nada se escribe en los portales de partner ni en Salesforce sin la decisión de Soporte técnico.',
        approve_action: 'Aprueba la conmutación y las visitas',
        scope_short: (H) => `${H.pl(H.sc.count)} de ${H.fmt.plural(lots(H.sc), 'grupo', 'grupos')} y ${H.fmt.plural(H.sc.holds.length, 'visita prioritaria', 'visitas prioritarias')}`,
        audit_approved: 'Conmutación y visitas aprobadas',
        audit_approved_detail: (H) => `${H.ids.blq} · ${H.sc.count} paneles de ${lots(H.sc)} grupos · ${H.sc.qty} visitas en ${H.sc.holds.length} ventanas${H.sc.out.length ? ` · alcance editado (sin ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Conmutación ${H.ids.blq} aprobada · ${H.sc.count} paneles`,
        audit_rejected: 'Conmutación rechazada',
        outcome_rejected: 'Conmutación rechazada · sin acciones aplicadas',
        toast_done: (H) => `${H.ids.blq} aplicada · ${H.ids.nc} abierta · aviso enviado por Slack`,
        presenter_applying: 'Tras la aprobación: conmutación en los portales de partner, visitas en Salesforce, SMS a los clientes por Twilio y aviso por Slack.',
        reject_nothing: 'ni conmutación en los portales de partner, ni visitas en Salesforce, ni SMS a los clientes, ni aviso por Slack',
        edit_intro: 'PR-COM-003 pide conmutar todos los paneles con respaldo y visitar con prioridad los que no lo tienen.'
      },
      approval: {
        id: 'conm-paneles-vlc',
        approve_label: 'Aprobar conmutación y visitas',
        policy: 'PR-COM-003 · PR-SOP-007 · solo Soporte técnico aprueba',
        title: (H) => `Conmutación y visitas · ${H.pl(H.sc.count)} sin comunicación en Valencia Norte`,
        summary: (H) => `Motivo: ${H.fv(241)} como pico y más de ${H.fv(H.C.threshold)} durante ${H.C.above} min (${H.span}), por encima de los ${H.C.minutes} min que fija ${H.W.backup ? 'PR-COM-003' : 'el workflow'}${H.critMin ? `, y ${H.critMin} min por encima de ${H.fv(H.crit)}: caída crítica` : ''}. Se conmutan a la vía de respaldo los paneles que la tienen y se visita con prioridad a los ${H.sc.qty} que no, para recuperar la supervisión remota.`,
        extra_scope: () => [],
        effects: (H) => [
          `Portales de partner: conmutación a la vía de respaldo IP de ${H.pl(H.sc.count - H.sc.qty)}`,
          `Salesforce CRM: ${H.sc.qty} visitas prioritarias en ${H.sc.holds.length} ventanas`,
          'Twilio SMS: aviso a los clientes de los paneles afectados',
          `Slack: aviso al ${ROLE.maintenance_shift} y a ${ROLE.customer_care}`
        ],
        applied: (H) => [
          `Portales de partner: ${H.ids.blq} · ${H.sc.count - H.sc.qty} paneles a la vía de respaldo`,
          `Salesforce CRM: ${H.sc.qty} visitas prioritarias programadas en ${H.sc.holds.length} ventanas`,
          `Salesforce CRM: ${H.ids.nc} con borrador de 8D`,
          `Twilio SMS y Slack: clientes y ${ROLE.maintenance_shift} avisados`
        ]
      },
      result: {
        title: (H) => `Conmutación ${H.ids.blq} aplicada e incidencia ${H.ids.nc} abierta`,
        stats: (H) => [
          { label: 'Paneles conmutados a respaldo', value: H.sc.count - H.sc.qty, tone: 'crit' },
          { label: 'Visitas prioritarias', value: H.sc.qty },
          { label: 'Grupos de paneles', value: lots(H.sc) },
          { label: 'Paneles con señal degradada a evaluar', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'calendar', tone: 'crit', title: `Orden de trabajo ${H.ids.blq}`, systems: ['Verisure Partner Portal', 'Salesforce CRM'],
            kv: [
              ['Estado', App.chip('blocked', 'Conmutado')],
              ['Alcance', `${H.pl(H.sc.count)} · ${H.fmt.plural(lots(H.sc), 'grupo', 'grupos')} · ${nobk(H, H.sc.qty)}`],
              ['Cuota mensual afectada', H.fmt.eur(H.sc.value)],
              ['Visitas programadas', H.sc.holds.map((h) => h.id).join(', ')],
              ['Aprueba', `${ROLE.support} (PR-COM-003)`]
            ],
            next: 'Siguiente paso según PR-COM-003: confirmar con el operador móvil el cierre del mantenimiento y reclamar el aviso previo que no recibimos como instalador.',
            buttons: [{ action: 'csv', label: 'Paneles afectados (CSV)' }]
          },
          {
            icon: 'clipboard', title: `Incidencia ${H.ids.nc}`, systems: ['Salesforce CRM'], chip: ['draft', '8D en borrador'],
            items: D8(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Descargar borrador 8D (PDF)' }]
          },
          {
            icon: 'send', title: 'Aviso a mantenimiento', systems: ['Slack', 'Twilio SMS'], note: H.run.endAt ? `enviado a las ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              icon: 'message-square', from: 'Agentic Platform · agente Incidencias', channel: `canal ${TEAMS}`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: ROLE.maintenance_shift, text: `Conmutación ${H.ids.blq} de Valencia Norte, aprobada por ${H.decision ? H.decision.by : H.W.approver}${H.decision ? ` a las ${H.fmt.time(H.decision.at)}` : ''}. Despachar las visitas prioritarias, empezando por los comercios con vigilancia contratada:` },
                { to: ROLE.customer_care, text: `Los clientes de los ${H.sc.count} paneles ya han recibido un SMS de Twilio; atender las llamadas de los ${H.sc.qty} sin respaldo. Detalle en ${H.ids.nc} (Salesforce CRM).` }
              ],
              list: H.sc.holds.map((h) => `${h.id} · ${H.holdWhen(h)} · ${h.where} · ${palsOf(H.sc, h)} visitas`)
            }
          }
        ]
      },
      doc: {
        code: 'REG-COM-020-02',
        lane: 'inc',
        heading: 'Disciplinas D1–D8',
        col_d: 'D',
        title: (H) => `Informe 8D · ${H.ids.nc}`,
        subtitle: 'Incidencia por caída de comunicación 4G en Valencia Norte · borrador para revisión',
        filename: (H) => `borrador-8d-${H.ids.nc}`,
        meta: (H) => [['Incidencia', H.ids.nc], ['Orden de trabajo asociada', H.ids.blq]],
        items: (H) => D8(H),
        reviewer: ROLE.support,
        approver: ROLE.ops,
        note: 'Borrador generado a partir de las evidencias de la ejecución. Las fechas objetivo son una propuesta: las confirma el equipo del 8D. La causa raíz es una hipótesis hasta que el Responsable de soporte técnico la confirme.'
      },
      report: {
        noun: 'informe de incidencia',
        code: 'REG-COM-012-07',
        title: 'Informe de incidencia · comunicación de paneles',
        subtitle: 'Caída de comunicación 4G',
        filename: 'informe-incidencia-comunicacion-paneles',
        site_label: 'Zona',
        site: 'Valencia Norte',
        description: (H) => `El 19/10/2026 a las 05:50, el Sector Alarm Partner Hub emitió la alarma ALM-COM-0611 en Valencia Norte (nivel habitual ${H.fv(2)}). Los paneles sin comunicación 4G estuvieron ${H.C.above} min por encima de ${H.fv(H.C.threshold)} (${H.span}), con un pico de ${H.fv(241)} a las 05:42 y ${H.critMin} min por encima de ${H.fv(H.crit)}. A las 06:00 quedaban ${H.fv(38)} sin comunicación. Había ${H.all.count} paneles de ${lots(H.all)} grupos sin comunicación a las 05:50, ${H.all.qty} de ellos sin vía de respaldo IP.`,
        criteria: 'PR-COM-003 (escalada si más de 40 paneles pierden la comunicación durante más de 10 min) y PR-SOP-007 (atención al cliente tras una incidencia de supervisión; solo Soporte técnico aprueba la conmutación).',
        actions: (H) => [
          `Portales de partner · ${H.ids.blq}: ${H.sc.count - H.sc.qty} paneles de ${lots(H.sc)} grupos conmutados a la vía de respaldo IP.`,
          `Salesforce CRM: ${H.sc.qty} visitas prioritarias a paneles sin respaldo; ventanas: ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)}, ${h.where})`).join(', ')}.`,
          `Salesforce CRM · ${H.ids.nc}: incidencia abierta con borrador de 8D (REG-COM-020-02).`,
          `Twilio SMS: aviso a los clientes de ${H.sc.count} paneles. Slack: aviso al ${ROLE.maintenance_shift} y a ${ROLE.customer_care} en el canal ${TEAMS}.`
        ],
        pending: (H) => [
          'Confirmar con el operador móvil el cierre del mantenimiento y el estado de las celdas de Valencia Norte.',
          'Evaluar los paneles con señal degradada en CELDA-VLC-N3, N4 y NO2 antes de que caigan.',
          'Valorar la instalación de una vía de respaldo IP en los paneles que no la tienen, empezando por los comercios con vigilancia.',
          `Contacto con los clientes sin respaldo hasta restablecer la supervisión: ${ROLE.customer_care}.`
        ].concat(H && hasAnt(H.sc) ? ['Antecedente en Salesforce CRM: INC-2026-0463 (24/09/2026), caída de comunicación en un comercio de Verisure por un cambio de antena del operador (cerrada). Relevante para priorizar la visita a los comercios con vigilancia contratada.'] : []),
        reviewer: ROLE.ops,
        final_step: 'Plan de respaldo IP',
        final_role: ROLE.support,
        note: 'Documento sujeto a la revisión de Operaciones; no sustituye la decisión sobre las instalaciones sin respaldo.'
      },
      not_applied: (H) => [
        { sys: 'Portales de partner', text: 'Sin conmutación a la vía de respaldo' },
        { sys: 'Salesforce CRM', text: `Ninguna visita programada; las ${H.all.holds.length} ventanas siguen sin asignar` },
        { sys: 'Twilio SMS', text: 'Sin SMS a los clientes' },
        { sys: 'Slack', text: 'Sin aviso a mantenimiento' }
      ],
      compare: [
        { k: 'Personas que intervienen', today: '3–4: soporte técnico, mantenimiento, atención al cliente y despacho', now: 'Soporte técnico revisa y decide; mantenimiento y atención al cliente reciben el aviso con los datos' },
        { k: 'Sistemas que se consultan a mano', today: '5–6: tres portales de partner, Salesforce, SAP, hojas de cálculo y teléfono', now: 'Ninguno: los agentes consultan 5 sistemas y cada dato queda en el registro' },
        { k: 'Pasos', today: '10–12 pasos manuales, con esperas entre personas', steps: true },
        { k: 'Tiempo hasta la conmutación y las visitas', today: '1–3 h', measured: true },
        { k: 'Evidencia para la auditoría', today: 'Repartida entre correos, capturas y hojas de cálculo', now: 'Informe REG-COM-012-07 y registro de auditoría de la ejecución' }
      ],
      presenter: {
        intro: () => 'Alarma de las 05:50 en Valencia Norte: 214 paneles sin comunicación 4G, pico de 241 a las 05:42 y 50 min por encima de 40. La primera visita prioritaria es a las 08:00.',
        agents: 'Cuatro agentes, cada uno con su sistema: los portales de partner para la comunicación; Salesforce, SAP y Prosegur para paneles, clientes y respaldo; los portales y Salesforce para la conmutación y las visitas; Salesforce, Twilio y Slack para la incidencia y los avisos.',
        waiting: (H) => [
          `Los ${H.sc.elseTotal} paneles con señal degradada en las mismas celdas quedan «a evaluar»: no han caído. Todavía no se ha escrito nada en los portales de partner ni en Salesforce.`,
          'Se puede editar el alcance (quitar un grupo, con motivo) o rechazar: si se rechaza, no se aplica nada y queda en auditoría.'
        ],
        rejected: ['Rechazado: no se ha conmutado nada ni se han programado visitas, y no hay incidencia ni aviso. El motivo queda en el registro de auditoría.', 'La decisión es siempre de Soporte técnico; se puede volver a ejecutar cuando se quiera.'],
        done: (H) => [
          `Aplicado tras la aprobación: ${H.ids.blq} con ${H.sc.count - H.sc.qty} paneles a la vía de respaldo, ${H.sc.qty} visitas prioritarias en Salesforce, ${H.ids.nc} con el 8D en borrador, SMS a los clientes y aviso por Slack.`,
          'El informe de incidencia sale como documento controlado: código, revisión, aprobaciones y registro de la ejecución, listo para una auditoría de partner.'
        ],
        next: { done: 'Abrir «Descargar informe de incidencia» y después ir a «Reclamación» (flecha derecha).', no_trigger: 'Ir a «De palabras a workflow», dejar 10 min y volver a ejecutar.' }
      }
    }
  });

  /* Borrador de 8D (D1–D8) que redacta el agente de Incidencias. */
  function D8(H) {
    const sc = H.sc;
    const ant = hasAnt(sc)
      ? ' Antecedente en Salesforce CRM: INC-2026-0463 (24/09/2026), caída de comunicación en un comercio de Verisure por un cambio de antena del operador (cerrada); tenerlo en cuenta al priorizar la visita a los comercios con vigilancia contratada.'
      : '';
    return [
      { d: 'D1', t: 'Equipo', text: `Líder: ${ROLE.support}. Equipo: ${ROLE.maintenance_shift}, ${ROLE.customer_care} y ${ROLE.install_shift}.`, owner: ROLE.support, due: '2026-10-19' },
      { d: 'D2', t: 'Descripción del problema', text: `El 19/10/2026 los paneles sin comunicación 4G en Valencia Norte superaron ${H.fv(40)} durante ${H.C.above} min (${H.span}), con un pico de ${H.fv(241)} a las 05:42 y ${H.critMin} min por encima de ${H.fv(150)}. Había ${H.all.count} paneles de ${lots(H.all)} grupos sin comunicación a las 05:50, ${H.all.qty} sin vía de respaldo IP.${ant}`, owner: ROLE.support, due: '2026-10-19' },
      { d: 'D3', t: 'Contención', text: `${H.ids.blq}: ${sc.count - sc.qty} paneles conmutados a la vía de respaldo IP; ${sc.qty} visitas prioritarias programadas en ${sc.holds.length} ventanas. Avisar a cada cliente por SMS y atender las llamadas de los paneles sin respaldo.${sc.elseTotal ? ` Evaluar los ${sc.elseTotal} paneles con señal degradada en las mismas celdas, que no han caído.` : ''}`, owner: ROLE.maintenance_shift, due: '2026-10-19' },
      { d: 'D4', t: 'Causa raíz (hipótesis)', text: 'Hipótesis a confirmar por el Responsable de soporte técnico: el mantenimiento del operador móvil en las celdas de Valencia Norte (desde las 05:10) dejó sin 4G a los paneles; 38 de ellos no tienen vía de respaldo IP.', owner: ROLE.support, due: '2026-10-21' },
      { d: 'D5', t: 'Acciones correctivas propuestas', text: 'Exigir al operador móvil el aviso previo de los mantenimientos en las celdas de nuestra cartera; instalar una vía de respaldo IP en los paneles que no la tienen; valorar una alerta temprana al superar 40 paneles sin comunicación.', owner: ROLE.support, due: '2026-10-26' },
      { d: 'D6', t: 'Implantación y verificación', text: 'Verificar la comunicación de los paneles en la siguiente ventana de mantenimiento del operador y la puntualidad de las visitas prioritarias.', owner: ROLE.ops, due: '2026-10-30' },
      { d: 'D7', t: 'Prevención', text: 'Extender la regla de respaldo IP al resto de zonas de Valencia, Alicante y Castellón y actualizar PR-COM-003 si procede.', owner: ROLE.ops, due: '2026-11-13' },
      { d: 'D8', t: 'Cierre', text: `Cerrar ${H.ids.nc} tras verificar la eficacia y confirmar la supervisión remota de los ${sc.count} paneles afectados.`, owner: ROLE.ops, due: '2026-11-20' }
    ];
  }
})();
