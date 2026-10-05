/* Empresa de Congelados · alarma con aprobación: excursión de temperatura en la cámara de expedición C-07 (Fustiñana).
 * Escenario de la demo de referencia con datos sintéticos (MFM). Las funciones reciben el contexto H de la escena
 * (W workflow, C condición evaluada, sc alcance vigente, ids generados al aprobar, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Temperatura de aire de la cámara C-07 (sonda TT-C07-01), una lectura cada 5 min de 05:00 a 07:00. */
  const TEMPS = [-22.1, -22.0, -22.2, -22.1, -21.9, -22.0, -22.1, -21.5, -20.7, -19.4, -17.8, -17.1, -16.5, -15.9, -15.3, -14.8, -14.2, -13.9, -14.4, -16.6, -18.4, -19.3, -19.9, -20.3, -20.5];
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = TEMPS.map((v, i) => ({ time: hhmm(300 + i * 5), value: v }));

  /* Lotes con palés en C-07 durante la excursión (por calle): 38 palés, 28.592 kg. */
  const LOTS = [
    { id: 'L26-258-FUS-BRO-01', title: 'Brócoli floretes 2,5 kg', sub: 'EC foodservice', lane: 1, count: 6, first: 1, of: 18, kgpp: 720, cost: 1.75, hold: 'EXP-26-41106' },
    { id: 'L26-261-FUS-GUI-03', title: 'Guisante fino 1 kg', sub: 'Verleal (retail ES)', lane: 2, count: 8, first: 5, of: 22, kgpp: 800, cost: 1.6, hold: 'EXP-26-41107' },
    { id: 'L26-255-ALF-ESP-04', title: 'Espinaca en porciones 1 kg', sub: 'Verleal', lane: 3, count: 5, first: 1, of: 12, kgpp: 800, cost: 1.5, hold: 'EXP-26-41107' },
    { id: 'L26-262-FUS-MIX-02', title: 'Salteado de verduras a la plancha 600 g', sub: 'Marca blanca retailer UK (vía EC Foods UK Ltd)', lane: 4, count: 7, first: 10, of: 16, kgpp: 648, cost: 2.4, hold: 'EXP-26-41109' },
    { id: 'L26-259-FUS-JUD-01', title: 'Judía verde redonda 1 kg', sub: 'Importador Francia', lane: 5, count: 6, first: 15, of: 20, kgpp: 800, cost: 1.55, hold: 'EXP-26-41111' },
    { id: 'L26-263-FUS-MAI-02', title: 'Maíz dulce 450 g', sub: 'EC Frozen Foods LLC (EE. UU.)', lane: 6, count: 6, first: 1, of: 24, kgpp: 756, cost: 1.7, hold: 'EXP-26-41118' }
  ];
  /* Palés de los mismos lotes fuera de C-07 (silos automáticos, no expuestos) y ya expedidos antes de la alarma. */
  const ELSE = {
    'L26-258-FUS-BRO-01': [{ loc: 'SIL-1', count: 12, note: 'BRO-01 · silo automático 1' }],
    'L26-261-FUS-GUI-03': [{ loc: 'SIL-3', count: 10, note: 'GUI-03 · −23,9 °C, en límites' }],
    'L26-255-ALF-ESP-04': [{ loc: 'SIL-2', count: 7, note: 'ESP-04 · silo automático 2' }],
    'L26-263-FUS-MAI-02': [{ loc: 'SIL-4', count: 18, note: 'MAI-02 · silo automático 4' }]
  };
  const GONE = {
    'L26-261-FUS-GUI-03': [{ id: 'EXP-26-41102', date: '2026-09-28', time: '18:40', count: 4, to: 'Plataforma logística retail ES' }],
    'L26-262-FUS-MIX-02': [{ id: 'EXP-26-41083', date: '2026-09-25', time: '14:20', count: 9, to: 'EC Foods UK Ltd (filial EC, Reino Unido) · retailer UK (marca blanca)' }],
    'L26-259-FUS-JUD-01': [{ id: 'EXP-26-41071', date: '2026-09-23', time: '17:45', count: 14, to: 'Importador Francia' }]
  };
  /* SSCC de los palés en C-07: extensión 3 + prefijo de empresa 8412345 + lote + número de palé + dígito de control GS1. */
  const gs1 = (s) => { let t = 0; for (let i = 0; i < s.length; i += 1) t += Number(s[s.length - 1 - i]) * (i % 2 === 0 ? 3 : 1); return (10 - (t % 10)) % 10; };
  const UNITS = [];
  LOTS.forEach((l) => {
    const p = l.id.split('-');
    for (let k = 0; k < l.count; k += 1) {
      const n = l.first + k;
      const base = `38412345${p[1]}${p[4]}${String(n).padStart(4, '0')}`;
      UNITS.push({ item: l.id, product: l.title, pallet: `${n}/${l.of}`, sscc: `${base}${gs1(base)}`, kg: l.kgpp, position: `C-07 · calle ${l.lane} · hueco ${k + 1}`, hold: l.hold });
    }
  });

  const ROLE = {
    quality_shift: 'Responsable de Calidad de turno', dispatch_shift: 'Jefe de turno de expedición', refrigeration_maintenance: 'Mantenimiento frigorífico',
    quality_plant: 'Responsable de Calidad de planta', decider: 'Director de operaciones'
  };
  const TEAMS = 'Expedición · Fustiñana';
  const ANT_LOT = 'L26-263-FUS-MAI-02';
  const lots = (sc) => sc.items.length;
  const hasAnt = (sc) => sc.items.some((l) => l.id === ANT_LOT);
  const palsOf = (sc, h) => sc.items.filter((l) => l.hold === h.id).reduce((s, l) => s + l.count, 0);

  agenticPack('congelados', {
    alarma: {
      nav: 'Alarma C-07',
      title: 'Alarma C-07 en ejecución',
      icon: 'thermometer',
      page_title: 'Cámara C-07 · excursión de temperatura',
      alarm_id: 'ALM-C07-0550',
      alarm_time: '05:50',
      source_system: 'SCADA Galileo',
      asset: 'cámara C-07',
      location: 'Fustiñana · Cámara de expedición 7',
      excursion_noun: 'excursión',
      workflow_topic: 'cadena de frío',
      policy_ref: 'PNT-CAL-012',
      procedures: 'PNT-CAL-012 · PNT-CAL-015',
      decider_short: 'Calidad',
      approval_node: 'Aprobación de Calidad',
      measure: { short: 'temperatura de aire', col: 'Aire', unit: '°C', dec: 1, icon: 'thermometer' },
      setpoint: -22,
      setpoint_label: 'consigna',
      limit: -18,
      critical: -15,
      min_minutes: 15,
      interval_min: 5,
      series: SERIES,
      peak: -13.9,
      peak_time: '06:25',
      current: -20.5,
      current_time: '07:00',
      current_note: 'por debajo del límite desde las 06:40',
      chart: {
        title: 'Cámara C-07 · temperatura de aire',
        sub: 'Consigna −22 °C · ahora −20,5 °C (07:00)',
        tab: 'Temperatura',
        series_label: 'Aire (TT-C07-01)',
        yTicks: [-24, -21, -18, -15, -12],
        xTicks: ['05:00', '05:30', '06:00', '06:30', '07:00']
      },
      event_kv: [
        ['Cámara', 'C-07 · Cámara de expedición 7 · capacidad 240 palés'],
        ['Sonda', 'TT-C07-01 · aire · lectura cada 5 min'],
        ['Equipos', 'EV-07 (evaporador) · P-07 (puerta rápida)'],
        ['Planta', 'Fustiñana (FUS) · planta principal y hub logístico']
      ],
      events: [
        { time: '05:35', end: '05:40', text: 'Parada de ventiladores de EV-07 (inicio del ciclo de desescarche)', equipment: 'EV-07', tone: 'brand' },
        { time: '05:40', end: '06:05', text: 'Desescarche programado de EV-07', equipment: 'EV-07', tone: 'brand', band: 'Desescarche EV-07' },
        { time: '05:50', text: 'Alarma SCADA: temperatura de aire por encima de -18 °C', ref: 'ALM-C07-0550', tone: 'crit' },
        { time: '05:52', end: '06:31', text: 'Sensor de puerta P-07 abierta: la puerta rápida no completa el cierre', equipment: 'P-07', tone: 'warn', band: 'Puerta P-07 abierta', bandTone: 'warn' },
        { time: '06:31', text: 'Cierre manual de P-07 por el Jefe de turno de expedición', equipment: 'P-07', tone: 'warn' },
        { time: '06:40', text: 'La temperatura de aire vuelve por debajo de -18 °C', tone: 'ok' }
      ],
      probable_cause: 'Hipótesis a confirmar por Mantenimiento frigorífico: el desescarche de EV-07 (05:40-06:05) se solapó con un fallo de cierre de la puerta rápida P-07 (sensor de puerta abierta 05:52-06:31).',
      backup: { id: 'wf-cadena-frio-respaldo', name: 'Excursión de temperatura en cámaras', version: 'v1', threshold: -18, minutes: 15, critical: -15, approver: ROLE.quality_shift },
      untouched: 'SAP QM, Easy WMS, Elara ni Teams',
      apply_systems: 'SAP QM, Easy WMS, Elara y Teams',
      llm_cost_usd: 0.04,
      ids: [
        { key: 'blq', prefix: 'BLQ-2026-', start: 917, label: 'Bloqueo' },
        { key: 'nc', prefix: 'NC-2026-', start: 418, label: 'No conformidad' }
      ],
      block_id_key: 'blq',
      proposer: 'blq',
      lanes: [
        { id: 'mon', name: 'Monitor de cadena de frío', short: 'Monitor', icon: 'thermometer', systems: ['SCADA Galileo'], idle: 'Confirma la excursión con las lecturas de Galileo', gsub: 'confirma la excursión', gsys: ['SCADA Galileo'] },
        { id: 'traz', name: 'Trazabilidad', icon: 'git-branch', systems: ['Mecalux Easy WMS', 'SAP', 'MES Mapex'], idle: 'Localiza palés, lotes y expediciones', gsub: 'palés, lotes y expediciones', gsys: ['Easy WMS', 'SAP', 'MES Mapex'] },
        { id: 'blq', phase: 2, name: 'Bloqueo de calidad', icon: 'lock', systems: ['SAP QM', 'Mecalux Easy WMS'], idle: 'Prepara el bloqueo y pide la aprobación de Calidad', gsub: 'bloquea y retiene', gsys: ['SAP QM', 'Easy WMS'] },
        { id: 'inc', phase: 2, name: 'Incidencias', icon: 'clipboard', systems: ['Elara', 'Microsoft Teams'], idle: 'Abre la no conformidad y avisa a expedición', gsub: 'NC, 8D y aviso', gsys: ['Elara', 'Teams'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'SCADA Galileo', verb: 'Consultando', action: 'Lee la sonda TT-C07-01 de 05:00 a 07:00, una lectura cada 5 min', result: `${SERIES.length} lecturas, sin huecos · ahora ${H.fv(-20.5)} (07:00)`, ms: 1850, set: { volume: `${SERIES.length} lecturas de temperatura` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'SCADA Galileo', verb: 'Consultando', action: 'Cruza la excursión con los eventos del evaporador EV-07 y de la puerta P-07', result: `Desescarche 05:40–06:05 y puerta abierta 05:52–06:31: hipótesis para ${ROLE.refrigeration_maintenance}`, tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} lecturas · 6 eventos`, result: `Excursión confirmada: ${H.C.above} min por encima · pico ${H.fv(-13.9)}` } },
            { lane: 'traz', system: 'Mecalux Easy WMS', verb: 'Consultando', action: `Lista los palés ubicados en C-07 entre ${H.C.start} y ${H.C.end}, por calle`, result: `${a.count} palés (${a.count} SSCC) en ${lots(a)} calles`, ms: 2100, set: { volume: `${a.count} SSCC` } },
            { lane: 'traz', system: 'SAP', verb: 'Consultando', action: 'Resuelve lote, producto y cliente de cada SSCC', result: `${lots(a)} lotes · ${H.fmt.kg(a.qty)} · ${H.fmt.eur(a.value)} a coste estándar`, ms: 2600, set: { volume: `${a.count} SSCC · ${lots(a)} lotes` }, reveal: 'lots' },
            { lane: 'traz', system: 'MES Mapex', verb: 'Consultando', action: `Confirma línea, turno y fecha de fabricación de los ${lots(a)} lotes`, result: '5 lotes de Fustiñana (L1, L3, L4 y L5) y 1 de la planta de Alfaro, trasladado con TRF-26-3310', ms: 1900 },
            { lane: 'traz', system: 'Mecalux Easy WMS', verb: 'Consultando', action: 'Busca palés de los mismos lotes fuera de C-07', result: `${a.elseTotal} palés en SIL-1, SIL-2, SIL-3 y SIL-4, a evaluar · ${H.goneTotal} ya expedidos antes de la alarma`, ms: 1700, reveal: 'map' },
            { lane: 'traz', system: 'SAP', verb: 'Consultando', action: 'Consulta las expediciones planificadas de esos palés', result: `${a.holds.length} expediciones; la primera, ${H.first.id}, a las ${H.first.time} por el ${H.first.where}`, tone: 'warn', ms: 2200, set: { volume: `${a.count} SSCC · ${lots(a)} lotes · ${a.holds.length} expediciones`, result: `Primera expedición afectada a las ${H.first.time}` }, milestone: 'traz', audit: { action: 'Palés y lotes identificados', detail: `${a.count} palés (SSCC) de ${lots(a)} lotes en C-07 · ${a.holds.length} expediciones planificadas · ${a.elseTotal} palés de los mismos lotes en silos` } },
            { lane: 'blq', node: 'apr', system: 'Procedimientos', verb: 'Analizando', action: 'Aplica PNT-CAL-012 y PNT-CAL-015 a esta excursión', result: 'Bloquear los palés expuestos y evaluar el producto por lote; solo Calidad libera', ms: 1300 },
            { lane: 'blq', node: 'apr', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta la propuesta de bloqueo y su motivo con las evidencias', result: `Propuesta: ${a.count} palés de ${lots(a)} lotes y ${a.holds.length} expediciones retenidas; ${a.elseTotal} palés en silos, a evaluar`, ms: 7000, set: { volume: `${a.count} palés · ${a.holds.length} expediciones` } },
            { lane: 'blq', node: 'apr', system: 'Agentic Platform', verb: 'Evaluando', action: `Pide la aprobación de ${H.W.approver} antes de escribir en SAP QM y Easy WMS`, result: 'Esperando la decisión de Calidad', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Propuesta enviada a Calidad' }, milestone: 'prop', audit: { action: 'Propuesta de bloqueo enviada a aprobación', detail: `${a.count} palés de ${lots(a)} lotes · aprueba ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          const ships = sc.holds.map((h) => h.id).join(', ');
          return [
            { lane: 'blq', system: 'SAP QM', verb: 'Aplicando', action: `Registra el bloqueo de calidad de ${lots(sc)} lotes en C-07`, result: `${ids.blq} · ${sc.count} palés en estado «bloqueado»`, tone: 'ok', ms: 2400, milestone: 'blq', audit: { action: 'Bloqueo de calidad aplicado', detail: `${ids.blq} · SAP QM · ${sc.count} palés de ${lots(sc)} lotes` } },
            { lane: 'blq', system: 'Mecalux Easy WMS', verb: 'Aplicando', action: `Inmoviliza los ${sc.count} palés y retiene sus expediciones`, result: `${sc.count} SSCC inmovilizados · ${sc.holds.length} expediciones retenidas, la primera ${H.holdWhen(sc.holds[0]).includes('/') ? 'el' : 'a las'} ${H.holdWhen(sc.holds[0])}`, tone: 'ok', ms: 2100, set: { result: `${ids.blq} aplicado · ${sc.holds.length} expediciones retenidas` }, milestone: 'wms', audit: { action: 'Palés inmovilizados y expediciones retenidas', detail: `Mecalux Easy WMS · ${sc.count} SSCC · ${ships}` } },
            { lane: 'inc', system: 'Elara', verb: 'Aplicando', action: 'Abre la no conformidad con la curva, los eventos y los SSCC', result: `${ids.nc} abierta${hasAnt(sc) ? ' · antecedente RCL-2026-0204 enlazado' : ''}`, tone: 'ok', ms: 1900, set: { volume: '1 no conformidad' }, milestone: 'nc', audit: { action: 'No conformidad abierta', detail: `${ids.nc} · Elara · excursión de temperatura en C-07` } },
            { lane: 'inc', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta el borrador de 8D (D1–D8) con responsables por rol', result: 'Borrador de 8D listo para la revisión de Calidad', ms: 7800, set: { volume: '1 no conformidad · 8D en borrador' }, milestone: 'd8', audit: { action: 'Borrador de 8D redactado', detail: `${ids.nc} · D1–D8 · pendiente de revisión de Calidad` } },
            { lane: 'inc', system: 'Microsoft Teams', verb: 'Enviando', action: `Avisa a ${ROLE.dispatch_shift} y a ${ROLE.refrigeration_maintenance}`, result: `Aviso publicado en el canal «${TEAMS}»`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 no conformidad · 8D · 1 aviso', result: `${ids.nc} abierta · expedición avisada` }, milestone: 'teams', audit: { action: 'Aviso enviado por Microsoft Teams', detail: `${ROLE.dispatch_shift} y ${ROLE.refrigeration_maintenance} · canal «${TEAMS}»` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Palés en C-07 durante la excursión', value: H.all.count, sub: `${lots(H.all)} lotes · ${H.fmt.kg(H.all.qty)}`, icon: 'pallet' },
        { label: 'Primera expedición afectada', value: H.first.time, sub: `${H.first.id} · ${H.first.where} · ${H.pl(H.holdCount(H.all, H.first))}${held ? ' · retenida' : ''}`, icon: 'truck' }
      ],
      scope: {
        icon: 'pallet',
        unit: ['palé', 'palés'],
        item_noun: ['lote', 'lotes'],
        qty_unit: 'kg',
        per_square: 1,
        items: LOTS.map((l) => Object.assign({
          id: l.id, title: l.title, sub: l.sub, group: `Calle ${l.lane}`, group_short: `Calle ${l.lane}`,
          count: l.count, qty: l.count * l.kgpp, value: Math.round(l.count * l.kgpp * l.cost * 100) / 100, hold: l.hold
        }, ELSE[l.id] ? { elsewhere: ELSE[l.id] } : {}, GONE[l.id] ? { gone: GONE[l.id] } : {})),
        holds: {
          'EXP-26-41106': { date: '2026-09-29', time: '09:30', where: 'Muelle 2', label: 'Distribuidor foodservice ES (zona centro)' },
          'EXP-26-41107': { date: '2026-09-29', time: '11:00', where: 'Muelle 3', label: 'Plataforma logística retail ES' },
          'EXP-26-41109': { date: '2026-09-29', time: '14:00', where: 'Muelle 4', label: 'EC Foods UK Ltd (filial EC, Reino Unido)' },
          'EXP-26-41111': { date: '2026-09-29', time: '16:30', where: 'Muelle 5', label: 'Importador Francia' },
          'EXP-26-41118': { date: '2026-09-30', time: '07:00', where: 'Muelle 6', label: 'EC Frozen Foods LLC (filial EC, EE. UU.)' }
        },
        units: UNITS,
        csv_name: 'sscc-c-07-excursion',
        csv_cols: [
          { label: 'Lote', key: 'item' },
          { label: 'Producto', key: 'product' },
          { label: 'Palé', key: 'pallet' },
          { label: 'SSCC', key: 'sscc', text: true },
          { label: 'Kg', key: 'kg' },
          { label: 'Ubicación', key: 'position' },
          { label: 'Expedición planificada', key: 'hold' }
        ],
        labels: {
          items_title: 'Lotes y palés afectados',
          items_systems: 'Mecalux Easy WMS y SAP',
          items_where: 'palés en C-07,',
          item_col: 'Lote',
          at_col: 'En C-07',
          group_col: 'Calle',
          hold_col: 'Expedición planificada',
          else_col: 'Fuera de C-07',
          else_none: 'Sin stock',
          gone_verb: 'expedidos',
          exposed: 'Expuesto',
          blocked: 'Bloqueado',
          unblocked: 'Sin bloqueo',
          block_noun: 'bloqueo',
          block_verb: 'Bloquear',
          hold_verb: 'Retener',
          held: 'Retenidas',
          holds_label: 'Expediciones planificadas',
          holds_first: 'la primera',
          scope_main: 'Palés en C-07 durante la excursión',
          else_scope: 'Mismos lotes en silos',
          else_decision: 'A evaluar',
          map_title: 'Ubicación de los palés',
          map_sub: 'Mecalux Easy WMS · Fustiñana',
          zone_title: 'C-07 · Cámara de expedición 7',
          zone_sub: '6 calles · 240 huecos',
          else_title: 'Mismos lotes en silos automáticos',
          else_sub: 'no estuvieron en C-07 · a evaluar',
          gone_title: 'Expedidos antes de la alarma',
          legend_exposed: 'Expuesto a la excursión',
          legend_else: 'A evaluar en silo',
          csv_button: 'Descargar SSCC (CSV)',
          value_label: 'a coste estándar',
          report_scope: 'Alcance del bloqueo'
        }
      },
      text: {
        proposal_title: 'propuesta de bloqueo',
        stop_without: 'proponer bloqueo',
        activates: 'el bloqueo',
        no_proposal: 'sin propuesta de bloqueo',
        idle_log: 'La ejecución se detiene en la aprobación: nada se escribe en SAP QM ni en Easy WMS sin la decisión de Calidad.',
        approve_action: 'Aprueba el bloqueo',
        scope_short: (H) => `${H.pl(H.sc.count)} de ${H.fmt.plural(lots(H.sc), 'lote', 'lotes')} y ${H.fmt.plural(H.sc.holds.length, 'expedición retenida', 'expediciones retenidas')}`,
        audit_approved: 'Bloqueo aprobado',
        audit_approved_detail: (H) => `${H.ids.blq} · ${H.sc.count} palés de ${lots(H.sc)} lotes en C-07 · ${H.sc.holds.length} expediciones retenidas${H.sc.out.length ? ` · alcance editado (sin ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Bloqueo ${H.ids.blq} aprobado · ${H.sc.count} palés`,
        audit_rejected: 'Bloqueo rechazado',
        outcome_rejected: 'Bloqueo rechazado · sin acciones aplicadas',
        toast_done: (H) => `${H.ids.blq} aplicado · ${H.ids.nc} abierta · aviso enviado por Teams`,
        presenter_applying: 'Tras la aprobación: bloqueo en SAP QM, inmovilización en Easy WMS, no conformidad en Elara y aviso por Teams.',
        reject_nothing: 'ni bloqueo en SAP QM, ni inmovilización en Easy WMS, ni no conformidad en Elara, ni aviso por Teams',
        edit_intro: 'PNT-CAL-012 pide bloquear todos los palés expuestos.'
      },
      approval: {
        id: 'blq-c07',
        approve_label: 'Aprobar bloqueo',
        policy: 'PNT-CAL-012 · PNT-CAL-015 · solo Calidad libera',
        title: (H) => `Bloqueo de calidad · ${H.pl(H.sc.count)} en C-07`,
        summary: (H) => `Motivo: aire por encima de ${H.fv(H.C.threshold)} durante ${H.C.above} min (${H.span}), más de los ${H.C.minutes} min que fija ${H.W.backup ? 'PNT-CAL-012' : 'el workflow'}${H.critMin ? `, y ${H.critMin} min por encima de ${H.fv(H.crit)}: excursión crítica` : ''}. Se bloquean los palés expuestos hasta medir la temperatura de producto y decidir el destino de cada lote.`,
        extra_scope: () => [],
        effects: (H) => [
          `SAP QM: bloqueo de calidad de ${lots(H.sc)} lotes (${H.sc.count} palés en C-07)`,
          `Mecalux Easy WMS: ${H.sc.count} palés inmovilizados y ${H.sc.holds.length} expediciones retenidas`,
          'Elara: no conformidad con borrador de 8D',
          `Microsoft Teams: aviso a ${ROLE.dispatch_shift} y ${ROLE.refrigeration_maintenance}`
        ],
        applied: (H) => [
          `SAP QM: ${H.ids.blq} · ${lots(H.sc)} lotes (${H.sc.count} palés)`,
          `Mecalux Easy WMS: ${H.sc.count} palés inmovilizados y ${H.sc.holds.length} expediciones retenidas`,
          `Elara: ${H.ids.nc} con borrador de 8D`,
          `Microsoft Teams: aviso a ${ROLE.dispatch_shift} y ${ROLE.refrigeration_maintenance}`
        ]
      },
      result: {
        title: (H) => `Bloqueo ${H.ids.blq} aplicado y no conformidad ${H.ids.nc} abierta`,
        stats: (H) => [
          { label: 'Palés bloqueados', value: H.sc.count, tone: 'crit' },
          { label: 'Expediciones retenidas', value: H.sc.holds.length },
          { label: 'Lotes con bloqueo', value: lots(H.sc) },
          { label: 'Palés en silos a evaluar', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Bloqueo ${H.ids.blq}`, systems: ['SAP QM', 'Mecalux Easy WMS'],
            kv: [
              ['Estado', App.chip('blocked')],
              ['Alcance', `${H.pl(H.sc.count)} · ${H.fmt.plural(lots(H.sc), 'lote', 'lotes')} · ${H.fmt.kg(H.sc.qty)}`],
              ['Valor a coste estándar', H.fmt.eur(H.sc.value)],
              ['Expediciones retenidas', H.sc.holds.map((h) => h.id).join(', ')],
              ['Libera', `${ROLE.quality_shift} (PNT-CAL-015)`]
            ],
            next: 'Siguiente paso según PNT-CAL-012: medir la temperatura de producto con sonda en los palés expuestos, capa exterior y centro.',
            buttons: [{ action: 'csv', label: 'SSCC bloqueados (CSV)' }]
          },
          {
            icon: 'clipboard', title: `No conformidad ${H.ids.nc}`, systems: ['Elara'], chip: ['draft', '8D en borrador'],
            items: D8(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Descargar borrador 8D (PDF)' }]
          },
          {
            icon: 'send', title: 'Aviso a expedición', systems: ['Microsoft Teams'], note: H.run.endAt ? `enviado a las ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              icon: 'message-square', from: 'Agentic Platform · agente Incidencias', channel: `canal «${TEAMS}»`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: ROLE.dispatch_shift, text: `Bloqueo de calidad ${H.ids.blq} en C-07, aprobado por ${H.decision ? H.decision.by : H.W.approver}${H.decision ? ` a las ${H.fmt.time(H.decision.at)}` : ''}. No cargar hasta nueva decisión de Calidad:` },
                { to: ROLE.refrigeration_maintenance, text: `Revisar el cierre de la puerta P-07 y el desescarche de EV-07 (hipótesis de causa). Detalle en ${H.ids.nc} (Elara).` }
              ],
              list: H.sc.holds.map((h) => `${h.id} · ${H.holdWhen(h)} · ${h.where} · ${H.pl(palsOf(H.sc, h))}`)
            }
          }
        ]
      },
      doc: {
        code: 'REG-CAL-020-02',
        lane: 'inc',
        heading: 'Disciplinas D1–D8',
        col_d: 'D',
        title: (H) => `Informe 8D · ${H.ids.nc}`,
        subtitle: 'No conformidad por excursión de temperatura en la cámara C-07 · borrador para revisión',
        filename: (H) => `borrador-8d-${H.ids.nc}`,
        meta: (H) => [['No conformidad', H.ids.nc], ['Bloqueo asociado', H.ids.blq]],
        items: (H) => D8(H),
        reviewer: ROLE.quality_shift,
        approver: ROLE.quality_plant,
        note: 'Borrador generado a partir de las evidencias de la ejecución. Las fechas objetivo son una propuesta: las confirma el equipo del 8D. La causa raíz es una hipótesis hasta que Mantenimiento frigorífico la confirme.'
      },
      report: {
        noun: 'informe de incidencia',
        code: 'REG-CAL-012-07',
        title: 'Informe de incidencia · cámara C-07',
        subtitle: 'Excursión de temperatura',
        filename: 'informe-incidencia-c-07',
        site_label: 'Planta',
        site: 'Fustiñana (FUS)',
        description: (H) => `El 29/09/2026 a las 05:50, SCADA Galileo emitió la alarma ALM-C07-0550 en la cámara C-07 (Cámara de expedición 7, consigna ${H.fv(-22)}). La temperatura de aire (sonda TT-C07-01) estuvo ${H.C.above} min por encima de ${H.fv(H.C.threshold)} (${H.span}), con un pico de ${H.fv(-13.9)} a las 06:25 y ${H.critMin} min por encima de ${H.fv(H.crit)}. A las 07:00 la cámara estaba a ${H.fv(-20.5)}. Había ${H.all.count} palés de ${lots(H.all)} lotes en la cámara.`,
        criteria: 'PNT-CAL-012 (bloqueo de los palés expuestos si el aire supera −18 °C durante más de 15 min) y PNT-CAL-015 (registro del bloqueo en SAP QM y Easy WMS; solo Calidad libera).',
        actions: (H) => [
          `SAP QM · ${H.ids.blq}: bloqueo de calidad de ${lots(H.sc)} lotes (${H.sc.count} palés, ${H.fmt.kg(H.sc.qty)}; ${H.fmt.eur(H.sc.value)} a coste estándar).`,
          `Mecalux Easy WMS: ${H.sc.count} SSCC inmovilizados; expediciones retenidas: ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)}, ${h.where})`).join(', ')}.`,
          `Elara · ${H.ids.nc}: no conformidad abierta con borrador de 8D (REG-CAL-020-02).`,
          `Microsoft Teams: aviso a ${ROLE.dispatch_shift} y ${ROLE.refrigeration_maintenance} en el canal «${TEAMS}».`
        ],
        pending: (H) => [
          'Medir la temperatura de producto con sonda en los palés expuestos (capa exterior y centro).',
          'Análisis sensorial y de aspecto (cristales de hielo, apelmazado) por lote.',
          'Decisión de destino por lote: liberar, reclasificar o destruir.',
          `Liberación o destino de cada lote: solo ${ROLE.quality_shift} o ${ROLE.quality_plant} (PNT-CAL-015).`
        ].concat(H && hasAnt(H.sc) ? ['Antecedente en Elara: RCL-2026-0204 (15/07/2026), producto apelmazado (bloques de hielo) en destino; causa: rotura de frío en el transporte del cliente (NC-2026-0233, cerrada). Relevante para decidir el destino de L26-263-FUS-MAI-02.'] : []),
        reviewer: ROLE.quality_plant,
        final_step: 'Destino de los lotes',
        final_role: ROLE.quality_shift,
        note: 'Documento sujeto a la revisión de Calidad; no sustituye la decisión de destino del producto.'
      },
      not_applied: (H) => [
        { sys: 'SAP QM', text: 'Sin bloqueo de calidad' },
        { sys: 'Mecalux Easy WMS', text: `Ningún palé inmovilizado; las ${H.all.holds.length} expediciones siguen planificadas` },
        { sys: 'Elara', text: 'Sin no conformidad' },
        { sys: 'Microsoft Teams', text: 'Sin aviso a expedición' }
      ],
      compare: [
        { k: 'Personas que intervienen', today: '3–4: Calidad, expedición, almacén y mantenimiento frigorífico', now: 'Calidad revisa y decide; expedición y mantenimiento reciben el aviso con los datos' },
        { k: 'Sistemas que se consultan a mano', today: '5–6: Galileo, Easy WMS, SAP, SAP QM, Elara y correo o teléfono', now: 'Ninguno: los agentes consultan 7 sistemas y cada dato queda en el registro' },
        { k: 'Pasos', today: '10–12 pasos manuales, con esperas entre personas', steps: true },
        { k: 'Tiempo hasta el bloqueo y la NC', today: '1–3 h', measured: true },
        { k: 'Evidencia para la auditoría', today: 'Repartida entre correos, capturas y hojas de cálculo', now: 'Informe REG-CAL-012-07 y registro de auditoría de la ejecución' }
      ],
      presenter: {
        intro: () => 'Alarma de las 05:50 en la cámara C-07: pico de −13,9 °C a las 06:25 y 50 min por encima de −18 °C. La primera expedición afectada sale a las 09:30.',
        agents: 'Cuatro agentes, cada uno con su sistema: Galileo para la temperatura; Easy WMS, SAP y Mapex para palés, lotes y expediciones; SAP QM para el bloqueo; Elara y Teams para la incidencia.',
        waiting: (H) => [
          `Los ${H.sc.elseTotal} palés de los mismos lotes en silos quedan «a evaluar»: no estuvieron en C-07. Todavía no se ha escrito nada en SAP QM ni en Easy WMS.`,
          'Se puede editar el alcance (quitar un lote, con motivo) o rechazar: si se rechaza, no se aplica nada y queda en auditoría.'
        ],
        rejected: ['Rechazado: no se ha bloqueado nada, ni en SAP QM ni en Easy WMS, y no hay no conformidad ni aviso. El motivo queda en el registro de auditoría.', 'La decisión es siempre de Calidad; se puede volver a ejecutar cuando se quiera.'],
        done: (H) => [
          `Aplicado tras la aprobación: ${H.ids.blq} en SAP QM, ${H.sc.count} palés inmovilizados y ${H.sc.holds.length} expediciones retenidas en Easy WMS, ${H.ids.nc} en Elara con el 8D en borrador y aviso por Teams.`,
          'El informe de incidencia sale como documento controlado: código, revisión, aprobaciones y registro de la ejecución, listo para una auditoría IFS o BRCGS.'
        ],
        next: { done: 'Abrir «Descargar informe de incidencia» y después ir a «Reclamación UKC-44718» (flecha derecha).', no_trigger: 'Ir a «De palabras a workflow», dejar 15 min y volver a ejecutar.' }
      }
    }
  });

  /* Borrador de 8D (D1–D8) que redacta el agente de Incidencias. */
  function D8(H) {
    const sc = H.sc;
    const ant = hasAnt(sc)
      ? ' Antecedente en Elara: RCL-2026-0204 (15/07/2026), maíz dulce 450 g para EC Frozen Foods LLC (filial EC, EE. UU.): producto apelmazado (bloques de hielo) en destino por rotura de frío en el transporte del cliente (NC-2026-0233, cerrada); tenerlo en cuenta al decidir el destino de L26-263-FUS-MAI-02.'
      : '';
    return [
      { d: 'D1', t: 'Equipo', text: `Líder: ${ROLE.quality_shift}. Equipo: ${ROLE.dispatch_shift}, ${ROLE.refrigeration_maintenance} y ${ROLE.quality_plant}.`, owner: ROLE.quality_shift, due: '2026-09-29' },
      { d: 'D2', t: 'Descripción del problema', text: `El 29/09/2026 el aire de la cámara C-07 superó ${H.fv(-18)} durante 50 min (05:50–06:40), con un pico de ${H.fv(-13.9)} a las 06:25 y 20 min por encima de ${H.fv(-15)}. Había ${H.all.count} palés de ${lots(H.all)} lotes en la cámara.${ant}`, owner: ROLE.quality_shift, due: '2026-09-29' },
      { d: 'D3', t: 'Contención', text: `${H.ids.blq}: ${sc.count} palés bloqueados en SAP QM e inmovilizados en Easy WMS; ${sc.holds.length} expediciones retenidas. Medir la temperatura de producto con sonda (capa exterior y centro) en los palés expuestos.${sc.elseTotal ? ` Evaluar los ${sc.elseTotal} palés de los mismos lotes en silos, que no estuvieron en C-07.` : ''}`, owner: ROLE.quality_shift, due: '2026-09-29' },
      { d: 'D4', t: 'Causa raíz (hipótesis)', text: 'Hipótesis a confirmar por Mantenimiento frigorífico: el desescarche de EV-07 (05:40–06:05) se solapó con un fallo de cierre de la puerta rápida P-07 (sensor de puerta abierta 05:52–06:31).', owner: ROLE.refrigeration_maintenance, due: '2026-10-01' },
      { d: 'D5', t: 'Acciones correctivas propuestas', text: 'Revisar el cierre de la puerta rápida P-07 y su sensor; revisar la programación del desescarche de EV-07 frente a la actividad del muelle; valorar un aviso de puerta abierta en Galileo.', owner: ROLE.refrigeration_maintenance, due: '2026-10-06' },
      { d: 'D6', t: 'Implantación y verificación', text: 'Verificar el cierre de P-07 y la recuperación de temperatura en el siguiente ciclo de desescarche. Decisión de destino por lote según PNT-CAL-012: liberar, reclasificar o destruir.', owner: ROLE.quality_plant, due: '2026-10-09' },
      { d: 'D7', t: 'Prevención', text: 'Extender la revisión de puertas y desescarches al resto de cámaras de expedición de Fustiñana y actualizar la instrucción de desescarche si procede.', owner: ROLE.quality_plant, due: '2026-10-16' },
      { d: 'D8', t: 'Cierre', text: `Cerrar ${H.ids.nc} tras verificar la eficacia y registrar la decisión de destino de los ${lots(sc)} lotes.`, owner: ROLE.quality_plant, due: '2026-10-30' }
    ];
  }
})();
