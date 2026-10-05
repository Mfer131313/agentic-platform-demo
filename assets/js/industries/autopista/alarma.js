/* Autopista Multimotor · alarma con aprobación: saturación del taller VW (Marqués de Soria) por baja médica de un técnico.
 * Escenario de la demo con datos sintéticos (MFM). Las funciones reciben el contexto H de la escena
 * (W workflow, C condición evaluada, sc alcance vigente, ids generados al aprobar, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Carga de boxes del taller VW (iCare Taller), una lectura cada 5 min de 05:00 a 07:00. */
  const LOAD = [69, 70, 70, 71, 70, 71, 72, 76, 81, 85, 88, 91, 94, 96, 98, 99, 97, 96, 93, 90, 87, 84, 82, 81, 80];
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = LOAD.map((v, i) => ({ time: hhmm(300 + i * 5), value: v }));

  /* Grupos de órdenes con vehículos en los boxes del taller VW durante la saturación: 33 vehículos, 72,5 h de taller. */
  const RATE = 89; /* tarifa de taller, EUR por hora */
  const ITEMS = [
    { id: 'CAM-VW-GOLF-ABS', title: 'Campaña ABS · Golf 1.5 TSI', sub: 'Retirada de seguridad VW · clientes particulares', lane: 1, count: 6, first: 1, of: 18, code: 'GOL', hpp: 1.5, hold: 'ENT-26-70412' },
    { id: 'OT-VW-TIGUAN-30K', title: 'Revisión 30.000 km · Tiguan 2.0 TDI', sub: 'Clientes de suscripción a 6 meses', lane: 2, count: 5, first: 2, of: 12, code: 'TIG', hpp: 2.5, hold: 'ENT-26-70413' },
    { id: 'OT-VW-POLO-FRE', title: 'Cambio de frenos · Polo 1.0 TSI', sub: 'Flota de alquiler (Madrid)', lane: 3, count: 7, first: 4, of: 20, code: 'POL', hpp: 2, hold: 'ENT-26-70415' },
    { id: 'OT-SEAT-LEON-PRE', title: 'Preparación de entrega · Seat León 1.5 TSI', sub: 'Venta a particulares (incluye a José María López)', lane: 4, count: 4, first: 3, of: 8, code: 'SEAT', hpp: 3, hold: 'ENT-26-70417' },
    { id: 'OT-VW-TROC-GAR', title: 'Reparación en garantía · T-Roc 1.5 TSI', sub: 'Garantía de marca', lane: 5, count: 5, first: 1, of: 9, code: 'TRO', hpp: 2, hold: 'ENT-26-70415' },
    { id: 'OT-VW-ID4-PRE', title: 'Preparación de entrega · ID.4', sub: 'Venta a particulares · entrega 08/10', lane: 6, count: 6, first: 1, of: 6, code: 'ID4', hpp: 2.5, hold: 'ENT-26-70421' }
  ];
  /* Vehículos de los mismos grupos fuera de los boxes (campa, flota de alquiler) y ya atendidos antes de la alarma. */
  const ELSE = {
    'CAM-VW-GOLF-ABS': [{ loc: 'CAMPA-A', count: 12, note: 'Golf 1.5 TSI de la campaña ABS en campa de ventas, sin cita' }],
    'OT-VW-TIGUAN-30K': [{ loc: 'CAMPA-B', count: 4, note: 'Tiguan de suscripción con la revisión pendiente, sin cita' }],
    'OT-VW-POLO-FRE': [{ loc: 'FLOTA-ALQ', count: 9, note: 'Polo de la flota de alquiler con frenos en el límite de desgaste' }],
    'OT-VW-ID4-PRE': [{ loc: 'CAMPA-C', count: 3, note: 'ID.4 en campa con la preparación pendiente' }]
  };
  const GONE = {
    'CAM-VW-GOLF-ABS': [{ id: 'ENT-26-70388', date: '2026-10-05', time: '17:40', count: 4, to: 'Clientes atendidos en la campaña ABS (cita del 05/10)' }],
    'OT-VW-POLO-FRE': [{ id: 'ENT-26-70391', date: '2026-10-06', time: '12:10', count: 9, to: 'Flota de alquiler Madrid (devueltos a flota)' }],
    'OT-VW-TIGUAN-30K': [{ id: 'ENT-26-70396', date: '2026-10-06', time: '18:20', count: 3, to: 'Clientes de suscripción a 6 meses' }]
  };
  /* Vehículos en los boxes: VIN-2026-MAD-<modelo>-<n>. */
  const UNITS = [];
  ITEMS.forEach((l) => {
    for (let k = 0; k < l.count; k += 1) {
      const n = l.first + k;
      UNITS.push({ item: l.id, product: l.title, pallet: `${n}/${l.of}`, sscc: `VIN-2026-MAD-${l.code}-${String(n).padStart(2, '0')}`, kg: l.hpp, position: `Taller VW · box ${l.lane} · plaza ${k + 1}`, hold: l.hold });
    }
  });

  const ROLE = {
    ops: 'Responsable de operaciones', workshop_shift: 'Jefe de taller', customer_care: 'Equipo de atención al cliente',
    brand_manager: 'Gestor de marca', sales_shift: 'Jefe de turno de ventas', decider: 'Responsable de operaciones'
  };
  const TEAMS = '#taller-vw-madrid';
  const ANT_LOT = 'OT-SEAT-LEON-PRE';
  const lots = (sc) => sc.items.length;
  const hasAnt = (sc) => sc.items.some((l) => l.id === ANT_LOT);
  const palsOf = (sc, h) => sc.items.filter((l) => l.hold === h.id).reduce((s, l) => s + l.count, 0);
  const hrs = (H, q) => `${H.fmt.num(q)} h`;

  agenticPack('autopista', {
    alarma: {
      nav: 'Alarma taller VW',
      title: 'Alarma del taller VW en ejecución',
      icon: 'activity',
      page_title: 'Taller VW · saturación de capacidad',
      alarm_id: 'ALM-VW-0550',
      alarm_time: '05:50',
      source_system: 'iCare Taller',
      asset: 'taller VW',
      location: 'Madrid · Marqués de Soria · Taller de marca VW',
      excursion_noun: 'saturación',
      workflow_topic: 'capacidad del taller',
      policy_ref: 'OPE-WORKSHOP-003',
      procedures: 'OPE-ALERT-001 · OPE-WORKSHOP-003',
      decider_short: 'Operaciones',
      approval_node: 'Aprobación de Operaciones',
      measure: { short: 'carga del taller VW', col: 'Carga', unit: '%', dec: 0, icon: 'activity' },
      setpoint: 70,
      setpoint_label: 'carga habitual',
      limit: 85,
      critical: 95,
      min_minutes: 15,
      interval_min: 5,
      series: SERIES,
      peak: 99,
      peak_time: '06:15',
      current: 80,
      current_time: '07:00',
      current_note: 'por debajo del límite desde las 06:45',
      chart: {
        title: 'Taller VW · carga de boxes',
        sub: 'Carga habitual 70 % · ahora 80 % (07:00)',
        tab: 'Carga',
        series_label: 'Carga (iCare Taller)',
        yTicks: [60, 70, 80, 90, 100],
        xTicks: ['05:00', '05:30', '06:00', '06:30', '07:00']
      },
      event_kv: [
        ['Taller', 'Taller VW · Madrid (Marqués de Soria) · 6 boxes'],
        ['Fuente', 'iCare Taller · carga de boxes · lectura cada 5 min'],
        ['Plantilla', 'Plataforma VW: 5 técnicos · 1 de baja médica · 4 disponibles'],
        ['Sede', 'Autopista Multimotor · Madrid (Marqués de Soria)']
      ],
      events: [
        { time: '05:35', end: '05:40', text: 'Parte de baja médica de un técnico de la plataforma VW (1 de 5)', equipment: 'Plantilla VW', tone: 'brand' },
        { time: '05:40', end: '06:05', text: 'iCare Taller reasigna las citas de preventivo entre los técnicos disponibles', equipment: 'iCare Taller', tone: 'brand', band: 'Reasignación de citas' },
        { time: '05:50', text: 'Alarma iCare: carga del taller VW por encima del 85 %', ref: 'ALM-VW-0550', tone: 'crit' },
        { time: '05:52', end: '06:31', text: 'Llegan sin cita 6 Golf de la campaña ABS: los boxes 1 a 3 quedan saturados', equipment: 'Boxes 1-3', tone: 'warn', band: 'Campaña ABS sin cita', bandTone: 'warn' },
        { time: '06:31', text: 'El Jefe de taller cierra la agenda de citas nuevas del día', equipment: 'Agenda', tone: 'warn' },
        { time: '06:40', text: 'La carga del taller vuelve por debajo del 85 %', tone: 'ok' }
      ],
      probable_cause: 'Hipótesis a confirmar por el Jefe de taller: la baja médica de un técnico VW (capacidad de la plataforma al 80 %) coincidió con la llegada sin cita de 6 Golf de la campaña de retirada ABS (05:52-06:31).',
      backup: { id: 'wf-taller-respaldo', name: 'Saturación de capacidad del taller', version: 'v1', threshold: 85, minutes: 15, critical: 95, approver: ROLE.ops },
      untouched: 'iCare Taller, Salesforce CRM, SAP ERP ni Slack',
      apply_systems: 'iCare Taller, Salesforce CRM, SAP ERP y Slack',
      llm_cost_usd: 0.04,
      ids: [
        { key: 'blq', prefix: 'REP-2026-', start: 317, label: 'Reprogramación' },
        { key: 'nc', prefix: 'INC-2026-', start: 508, label: 'Incidencia' }
      ],
      block_id_key: 'blq',
      proposer: 'blq',
      lanes: [
        { id: 'mon', name: 'Monitor de capacidad', short: 'Monitor', icon: 'activity', systems: ['iCare Taller'], idle: 'Confirma la saturación con las lecturas de iCare', gsub: 'confirma la saturación', gsys: ['iCare Taller'] },
        { id: 'traz', name: 'Trazabilidad', icon: 'git-branch', systems: ['Odoo Inventario', 'SAP ERP', 'Salesforce CRM'], idle: 'Localiza vehículos, órdenes y entregas', gsub: 'vehículos, órdenes y entregas', gsys: ['Odoo', 'SAP', 'Salesforce'] },
        { id: 'blq', phase: 2, name: 'Reprogramación', icon: 'calendar', systems: ['iCare Taller', 'Salesforce CRM'], idle: 'Prepara la reprogramación y pide la aprobación de Operaciones', gsub: 'reprograma y reasigna', gsys: ['iCare Taller', 'Salesforce'] },
        { id: 'inc', phase: 2, name: 'Incidencias', icon: 'clipboard', systems: ['SAP ERP', 'Slack'], idle: 'Abre la incidencia y avisa al taller', gsub: 'incidencia, 8D y aviso', gsys: ['SAP', 'Slack'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'iCare Taller', verb: 'Consultando', action: 'Lee la carga de boxes del taller VW de 05:00 a 07:00, una lectura cada 5 min', result: `${SERIES.length} lecturas, sin huecos · ahora ${H.fv(80)} (07:00)`, ms: 1850, set: { volume: `${SERIES.length} lecturas de carga` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'iCare Taller', verb: 'Consultando', action: 'Cruza la saturación con la plantilla del taller y las citas sin reserva', result: `Baja médica de un técnico VW y 6 Golf de la campaña ABS sin cita (05:52–06:31): hipótesis para el ${ROLE.workshop_shift}`, tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} lecturas · 6 eventos`, result: `Saturación confirmada: ${H.C.above} min por encima · pico ${H.fv(99)}` } },
            { lane: 'traz', system: 'iCare Taller', verb: 'Consultando', action: `Lista los vehículos en los boxes del taller VW entre ${H.C.start} y ${H.C.end}, por box`, result: `${a.count} vehículos (${a.count} VIN) en ${lots(a)} boxes`, ms: 2100, set: { volume: `${a.count} VIN` } },
            { lane: 'traz', system: 'Salesforce CRM', verb: 'Consultando', action: 'Resuelve cliente, tipo de orden y compromiso de entrega de cada VIN', result: `${lots(a)} grupos de órdenes · ${hrs(H, a.qty)} de taller · ${H.fmt.eur(a.value)} a tarifa de taller`, ms: 2600, set: { volume: `${a.count} VIN · ${lots(a)} grupos` }, reveal: 'lots' },
            { lane: 'traz', system: 'SAP ERP', verb: 'Consultando', action: `Confirma modelo, orden de trabajo y financiación de los ${lots(a)} grupos`, result: 'Órdenes abiertas en iCare con alta en SAP; la entrega del Seat León de José María López (Banco Sabadell) es la más sensible', ms: 1900 },
            { lane: 'traz', system: 'Odoo Inventario', verb: 'Consultando', action: 'Busca vehículos de los mismos grupos fuera de los boxes', result: `${a.elseTotal} vehículos en CAMPA-A, CAMPA-B, CAMPA-C y FLOTA-ALQ, a evaluar · ${H.goneTotal} ya atendidos antes de la alarma`, ms: 1700, reveal: 'map' },
            { lane: 'traz', system: 'Salesforce CRM', verb: 'Consultando', action: 'Consulta las entregas y citas comprometidas de esos vehículos', result: `${a.holds.length} compromisos; el primero, ${H.first.id}, a las ${H.first.time} en ${H.first.where}`, tone: 'warn', ms: 2200, set: { volume: `${a.count} VIN · ${lots(a)} grupos · ${a.holds.length} entregas`, result: `Primera entrega afectada a las ${H.first.time}` }, milestone: 'traz', audit: { action: 'Vehículos y órdenes identificados', detail: `${a.count} vehículos (VIN) de ${lots(a)} grupos en el taller VW · ${a.holds.length} entregas comprometidas · ${a.elseTotal} vehículos de los mismos grupos en campa y flota` } },
            { lane: 'blq', node: 'apr', system: 'Procedimientos', verb: 'Analizando', action: 'Aplica OPE-ALERT-001 y OPE-WORKSHOP-003 a esta saturación', result: 'Reprogramar las órdenes sin compromiso inmediato y avisar a los clientes; solo Operaciones aprueba', ms: 1300 },
            { lane: 'blq', node: 'apr', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta la propuesta de reprogramación y su motivo con las evidencias', result: `Propuesta: ${a.count} vehículos de ${lots(a)} grupos y ${a.holds.length} entregas reprogramadas; ${a.elseTotal} vehículos en campa y flota, a evaluar`, ms: 7000, set: { volume: `${a.count} vehículos · ${a.holds.length} entregas` } },
            { lane: 'blq', node: 'apr', system: 'Agentic Platform', verb: 'Evaluando', action: `Pide la aprobación del ${H.W.approver} antes de escribir en iCare Taller y Salesforce`, result: 'Esperando la decisión de Operaciones', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Propuesta enviada a Operaciones' }, milestone: 'prop', audit: { action: 'Propuesta de reprogramación enviada a aprobación', detail: `${a.count} vehículos de ${lots(a)} grupos · aprueba ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          const ships = sc.holds.map((h) => h.id).join(', ');
          return [
            { lane: 'blq', system: 'iCare Taller', verb: 'Aplicando', action: `Registra la reprogramación de ${lots(sc)} grupos de órdenes del taller VW`, result: `${ids.blq} · ${sc.count} vehículos en estado «reprogramado»`, tone: 'ok', ms: 2400, milestone: 'blq', audit: { action: 'Reprogramación aplicada', detail: `${ids.blq} · iCare Taller · ${sc.count} vehículos de ${lots(sc)} grupos` } },
            { lane: 'blq', system: 'Salesforce CRM', verb: 'Aplicando', action: `Reprograma los ${sc.count} vehículos y reasigna sus ${sc.holds.length} entregas`, result: `${sc.count} VIN reprogramados · ${sc.holds.length} entregas reasignadas, la primera ${H.holdWhen(sc.holds[0]).includes('/') ? 'el' : 'a las'} ${H.holdWhen(sc.holds[0])}`, tone: 'ok', ms: 2100, set: { result: `${ids.blq} aplicado · ${sc.holds.length} entregas reasignadas` }, milestone: 'wms', audit: { action: 'Vehículos reprogramados y entregas reasignadas', detail: `Salesforce CRM · ${sc.count} VIN · ${ships}` } },
            { lane: 'inc', system: 'SAP ERP', verb: 'Aplicando', action: 'Abre la incidencia de capacidad con la curva de carga, los eventos y los VIN', result: `${ids.nc} abierta${hasAnt(sc) ? ' · antecedente INC-2026-0471 enlazado' : ''}`, tone: 'ok', ms: 1900, set: { volume: '1 incidencia' }, milestone: 'nc', audit: { action: 'Incidencia abierta', detail: `${ids.nc} · SAP ERP · saturación del taller VW` } },
            { lane: 'inc', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta el borrador de 8D (D1–D8) con responsables por rol', result: 'Borrador de 8D listo para la revisión de Operaciones', ms: 7800, set: { volume: '1 incidencia · 8D en borrador' }, milestone: 'd8', audit: { action: 'Borrador de 8D redactado', detail: `${ids.nc} · D1–D8 · pendiente de revisión de Operaciones` } },
            { lane: 'inc', system: 'Slack', verb: 'Enviando', action: `Avisa al ${ROLE.workshop_shift} y al ${ROLE.customer_care}`, result: `Aviso publicado en el canal ${TEAMS}`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 incidencia · 8D · 1 aviso', result: `${ids.nc} abierta · taller avisado` }, milestone: 'teams', audit: { action: 'Aviso enviado por Slack', detail: `${ROLE.workshop_shift} y ${ROLE.customer_care} · canal ${TEAMS}` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Vehículos en el taller VW durante la saturación', value: H.all.count, sub: `${lots(H.all)} grupos · ${hrs(H, H.all.qty)} de taller`, icon: 'truck' },
        { label: 'Primera entrega afectada', value: H.first.time, sub: `${H.first.id} · ${H.first.where} · ${H.pl(H.holdCount(H.all, H.first))}${held ? ' · reasignada' : ''}`, icon: 'calendar' }
      ],
      scope: {
        icon: 'truck',
        unit: ['vehículo', 'vehículos'],
        item_noun: ['grupo', 'grupos'],
        qty_unit: 'h',
        per_square: 1,
        items: ITEMS.map((l) => Object.assign({
          id: l.id, title: l.title, sub: l.sub, group: `Box ${l.lane}`, group_short: `Box ${l.lane}`,
          count: l.count, qty: l.count * l.hpp, value: Math.round(l.count * l.hpp * RATE * 100) / 100, hold: l.hold
        }, ELSE[l.id] ? { elsewhere: ELSE[l.id] } : {}, GONE[l.id] ? { gone: GONE[l.id] } : {})),
        holds: {
          'ENT-26-70412': { date: '2026-10-07', time: '09:30', where: 'Box 1', label: 'Clientes de la campaña ABS Golf (citas de las 09:30)' },
          'ENT-26-70413': { date: '2026-10-07', time: '11:00', where: 'Box 2', label: 'Clientes de suscripción (Tiguan 30.000 km)' },
          'ENT-26-70415': { date: '2026-10-07', time: '14:00', where: 'Box 3', label: 'Flota de alquiler Madrid y garantías T-Roc' },
          'ENT-26-70417': { date: '2026-10-07', time: '16:30', where: 'Zona de entregas', label: 'José María López · Seat León (VIN-2026-MAD-SEAT-03) · financiación Banco Sabadell' },
          'ENT-26-70421': { date: '2026-10-08', time: '08:30', where: 'Zona de entregas', label: 'Clientes particulares · entrega de ID.4' }
        },
        units: UNITS,
        csv_name: 'vin-taller-vw-saturacion',
        csv_cols: [
          { label: 'Grupo', key: 'item' },
          { label: 'Modelo y trabajo', key: 'product' },
          { label: 'Vehículo', key: 'pallet' },
          { label: 'VIN', key: 'sscc', text: true },
          { label: 'Horas de taller', key: 'kg' },
          { label: 'Ubicación', key: 'position' },
          { label: 'Entrega comprometida', key: 'hold' }
        ],
        labels: {
          items_title: 'Grupos de órdenes y vehículos afectados',
          items_systems: 'iCare Taller y Salesforce CRM',
          items_where: 'vehículos en el taller VW,',
          item_col: 'Grupo',
          at_col: 'En taller',
          group_col: 'Box',
          hold_col: 'Entrega comprometida',
          else_col: 'Fuera del taller',
          else_none: 'Sin vehículos',
          gone_verb: 'atendidos',
          exposed: 'Afectado',
          blocked: 'Reprogramado',
          unblocked: 'Sin reprogramar',
          block_noun: 'reprogramación',
          block_verb: 'Reprogramar',
          hold_verb: 'Reasignar',
          held: 'Reasignadas',
          holds_label: 'Entregas comprometidas',
          holds_first: 'la primera',
          scope_main: 'Vehículos en el taller VW durante la saturación',
          else_scope: 'Mismos grupos en campa y flota',
          else_decision: 'A evaluar',
          map_title: 'Ubicación de los vehículos',
          map_sub: 'Odoo Inventario · Madrid',
          zone_title: 'Taller VW · Marqués de Soria',
          zone_sub: '6 boxes · 33 plazas',
          else_title: 'Mismos grupos en campa y flota',
          else_sub: 'no estuvieron en los boxes · a evaluar',
          gone_title: 'Atendidos antes de la alarma',
          legend_exposed: 'Afectado por la saturación',
          legend_else: 'A evaluar en campa o flota',
          csv_button: 'Descargar VIN (CSV)',
          value_label: 'a tarifa de taller',
          report_scope: 'Alcance de la reprogramación'
        }
      },
      text: {
        proposal_title: 'propuesta de reprogramación',
        stop_without: 'proponer la reprogramación',
        activates: 'la reprogramación',
        no_proposal: 'sin propuesta de reprogramación',
        idle_log: 'La ejecución se detiene en la aprobación: nada se escribe en iCare Taller ni en Salesforce sin la decisión de Operaciones.',
        approve_action: 'Aprueba la reprogramación',
        scope_short: (H) => `${H.pl(H.sc.count)} de ${H.fmt.plural(lots(H.sc), 'grupo', 'grupos')} y ${H.fmt.plural(H.sc.holds.length, 'entrega reasignada', 'entregas reasignadas')}`,
        audit_approved: 'Reprogramación aprobada',
        audit_approved_detail: (H) => `${H.ids.blq} · ${H.sc.count} vehículos de ${lots(H.sc)} grupos en el taller VW · ${H.sc.holds.length} entregas reasignadas${H.sc.out.length ? ` · alcance editado (sin ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Reprogramación ${H.ids.blq} aprobada · ${H.sc.count} vehículos`,
        audit_rejected: 'Reprogramación rechazada',
        outcome_rejected: 'Reprogramación rechazada · sin acciones aplicadas',
        toast_done: (H) => `${H.ids.blq} aplicado · ${H.ids.nc} abierta · aviso enviado por Slack`,
        presenter_applying: 'Tras la aprobación: reprogramación en iCare Taller, entregas reasignadas en Salesforce, incidencia en SAP y aviso por Slack.',
        reject_nothing: 'ni reprogramación en iCare Taller, ni entregas reasignadas en Salesforce, ni incidencia en SAP, ni aviso por Slack',
        edit_intro: 'OPE-WORKSHOP-003 pide reprogramar todas las órdenes sin compromiso inmediato.'
      },
      approval: {
        id: 'rep-taller-vw',
        approve_label: 'Aprobar reprogramación',
        policy: 'OPE-ALERT-001 · OPE-WORKSHOP-003 · solo Operaciones aprueba',
        title: (H) => `Reprogramación del taller · ${H.pl(H.sc.count)} en el taller VW`,
        summary: (H) => `Motivo: carga por encima de ${H.fv(H.C.threshold)} durante ${H.C.above} min (${H.span}), más de los ${H.C.minutes} min que fija ${H.W.backup ? 'OPE-WORKSHOP-003' : 'el workflow'}${H.critMin ? `, y ${H.critMin} min por encima de ${H.fv(H.crit)}: saturación crítica` : ''}. Se reprograman las órdenes afectadas y se avisa a los clientes hasta recuperar la plantilla de la plataforma VW.`,
        extra_scope: () => [],
        effects: (H) => [
          `iCare Taller: reprogramación de ${lots(H.sc)} grupos (${H.sc.count} vehículos en el taller VW)`,
          `Salesforce CRM: ${H.sc.count} vehículos reprogramados y ${H.sc.holds.length} entregas reasignadas`,
          'SAP ERP: incidencia con borrador de 8D',
          `Slack: aviso al ${ROLE.workshop_shift} y al ${ROLE.customer_care}`
        ],
        applied: (H) => [
          `iCare Taller: ${H.ids.blq} · ${lots(H.sc)} grupos (${H.sc.count} vehículos)`,
          `Salesforce CRM: ${H.sc.count} vehículos reprogramados y ${H.sc.holds.length} entregas reasignadas`,
          `SAP ERP: ${H.ids.nc} con borrador de 8D`,
          `Slack: aviso al ${ROLE.workshop_shift} y al ${ROLE.customer_care}`
        ]
      },
      result: {
        title: (H) => `Reprogramación ${H.ids.blq} aplicada e incidencia ${H.ids.nc} abierta`,
        stats: (H) => [
          { label: 'Vehículos reprogramados', value: H.sc.count, tone: 'crit' },
          { label: 'Entregas reasignadas', value: H.sc.holds.length },
          { label: 'Grupos reprogramados', value: lots(H.sc) },
          { label: 'Vehículos en campa y flota a evaluar', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'calendar', tone: 'crit', title: `Reprogramación ${H.ids.blq}`, systems: ['iCare Taller', 'Salesforce CRM'],
            kv: [
              ['Estado', App.chip('blocked', 'Reprogramado')],
              ['Alcance', `${H.pl(H.sc.count)} · ${H.fmt.plural(lots(H.sc), 'grupo', 'grupos')} · ${hrs(H, H.sc.qty)}`],
              ['Valor a tarifa de taller', H.fmt.eur(H.sc.value)],
              ['Entregas reasignadas', H.sc.holds.map((h) => h.id).join(', ')],
              ['Aprueba', `${ROLE.ops} (OPE-WORKSHOP-003)`]
            ],
            next: 'Siguiente paso según OPE-WORKSHOP-003: confirmar con RR. HH. la reincorporación del técnico VW y valorar el apoyo de un técnico de otra marca con formación VW.',
            buttons: [{ action: 'csv', label: 'VIN reprogramados (CSV)' }]
          },
          {
            icon: 'clipboard', title: `Incidencia ${H.ids.nc}`, systems: ['SAP ERP'], chip: ['draft', '8D en borrador'],
            items: D8(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Descargar borrador 8D (PDF)' }]
          },
          {
            icon: 'send', title: 'Aviso al taller', systems: ['Slack'], note: H.run.endAt ? `enviado a las ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              icon: 'message-square', from: 'Agentic Platform · agente Incidencias', channel: `canal ${TEAMS}`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: ROLE.workshop_shift, text: `Reprogramación ${H.ids.blq} del taller VW, aprobada por ${H.decision ? H.decision.by : H.W.approver}${H.decision ? ` a las ${H.fmt.time(H.decision.at)}` : ''}. No asignar citas nuevas a la plataforma VW hasta nueva decisión de Operaciones:` },
                { to: ROLE.customer_care, text: `Avisar a los clientes de las entregas reasignadas, empezando por José María López (Seat León, VIN-2026-MAD-SEAT-03). Detalle en ${H.ids.nc} (SAP ERP).` }
              ],
              list: H.sc.holds.map((h) => `${h.id} · ${H.holdWhen(h)} · ${h.where} · ${H.pl(palsOf(H.sc, h))}`)
            }
          }
        ]
      },
      doc: {
        code: 'REG-OPE-020-02',
        lane: 'inc',
        heading: 'Disciplinas D1–D8',
        col_d: 'D',
        title: (H) => `Informe 8D · ${H.ids.nc}`,
        subtitle: 'Incidencia por saturación del taller VW (Marqués de Soria) · borrador para revisión',
        filename: (H) => `borrador-8d-${H.ids.nc}`,
        meta: (H) => [['Incidencia', H.ids.nc], ['Reprogramación asociada', H.ids.blq]],
        items: (H) => D8(H),
        reviewer: ROLE.workshop_shift,
        approver: ROLE.ops,
        note: 'Borrador generado a partir de las evidencias de la ejecución. Las fechas objetivo son una propuesta: las confirma el equipo del 8D. La causa raíz es una hipótesis hasta que el Jefe de taller la confirme.'
      },
      report: {
        noun: 'informe de incidencia',
        code: 'REG-OPE-012-07',
        title: 'Informe de incidencia · taller VW',
        subtitle: 'Saturación de capacidad',
        filename: 'informe-incidencia-taller-vw',
        site_label: 'Sede',
        site: 'Madrid · Marqués de Soria',
        description: (H) => `El 07/10/2026 a las 05:50, iCare Taller emitió la alarma ALM-VW-0550 en el taller VW (carga habitual ${H.fv(70)}). La carga de boxes estuvo ${H.C.above} min por encima de ${H.fv(H.C.threshold)} (${H.span}), con un pico de ${H.fv(99)} a las 06:15 y ${H.critMin} min por encima de ${H.fv(H.crit)}. A las 07:00 la carga era del ${H.fv(80)}. Había ${H.all.count} vehículos de ${lots(H.all)} grupos de órdenes en los boxes.`,
        criteria: 'OPE-ALERT-001 (escalada si la carga del taller supera el 85 % durante más de 15 min) y OPE-WORKSHOP-003 (reprogramación de las órdenes sin compromiso inmediato; solo Operaciones aprueba).',
        actions: (H) => [
          `iCare Taller · ${H.ids.blq}: reprogramación de ${lots(H.sc)} grupos (${H.sc.count} vehículos, ${hrs(H, H.sc.qty)} de taller; ${H.fmt.eur(H.sc.value)} a tarifa de taller).`,
          `Salesforce CRM: ${H.sc.count} VIN reprogramados; entregas reasignadas: ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)}, ${h.where})`).join(', ')}.`,
          `SAP ERP · ${H.ids.nc}: incidencia abierta con borrador de 8D (REG-OPE-020-02).`,
          `Slack: aviso al ${ROLE.workshop_shift} y al ${ROLE.customer_care} en el canal ${TEAMS}.`
        ],
        pending: (H) => [
          'Confirmar con RR. HH. la fecha de reincorporación del técnico VW de baja médica.',
          'Valorar el apoyo de un técnico de otra marca con formación VW durante la semana.',
          'Confirmar con el Gestor de marca las plazas adicionales de la campaña ABS del Golf.',
          `Contacto con cada cliente de las entregas reasignadas: ${ROLE.customer_care}.`
        ].concat(H && hasAnt(H.sc) ? ['Antecedente en SAP ERP: INC-2026-0471 (22/09/2026), retraso de entrega de otro Seat por falta de técnico (cerrada). Relevante para priorizar la entrega de José María López (VIN-2026-MAD-SEAT-03).'] : []),
        reviewer: ROLE.ops,
        final_step: 'Plan de capacidad',
        final_role: ROLE.workshop_shift,
        note: 'Documento sujeto a la revisión de Operaciones; no sustituye la decisión sobre la plantilla del taller.'
      },
      not_applied: (H) => [
        { sys: 'iCare Taller', text: 'Sin reprogramación de órdenes' },
        { sys: 'Salesforce CRM', text: `Ninguna entrega reasignada; los ${H.all.holds.length} compromisos siguen planificados` },
        { sys: 'SAP ERP', text: 'Sin incidencia' },
        { sys: 'Slack', text: 'Sin aviso al taller' }
      ],
      compare: [
        { k: 'Personas que intervienen', today: '3–4: Jefe de taller, atención al cliente, ventas y gestor de marca', now: 'Operaciones revisa y decide; taller y atención al cliente reciben el aviso con los datos' },
        { k: 'Sistemas que se consultan a mano', today: '5–6: iCare, Salesforce, SAP, Odoo, hojas de cálculo y teléfono', now: 'Ninguno: los agentes consultan 4 sistemas y cada dato queda en el registro' },
        { k: 'Pasos', today: '10–12 pasos manuales, con esperas entre personas', steps: true },
        { k: 'Tiempo hasta la reprogramación y la incidencia', today: '1–3 h', measured: true },
        { k: 'Evidencia para la auditoría', today: 'Repartida entre correos, capturas y hojas de cálculo', now: 'Informe REG-OPE-012-07 y registro de auditoría de la ejecución' }
      ],
      presenter: {
        intro: () => 'Alarma de las 05:50 en el taller VW: pico del 99 % a las 06:15 y 55 min por encima del 85 %. La primera entrega afectada es a las 09:30.',
        agents: 'Cuatro agentes, cada uno con su sistema: iCare para la carga; Odoo, SAP y Salesforce para vehículos, órdenes y entregas; iCare y Salesforce para la reprogramación; SAP y Slack para la incidencia.',
        waiting: (H) => [
          `Los ${H.sc.elseTotal} vehículos de los mismos grupos en campa y flota quedan «a evaluar»: no estuvieron en los boxes. Todavía no se ha escrito nada en iCare Taller ni en Salesforce.`,
          'Se puede editar el alcance (quitar un grupo, con motivo) o rechazar: si se rechaza, no se aplica nada y queda en auditoría.'
        ],
        rejected: ['Rechazado: no se ha reprogramado nada, ni en iCare Taller ni en Salesforce, y no hay incidencia ni aviso. El motivo queda en el registro de auditoría.', 'La decisión es siempre de Operaciones; se puede volver a ejecutar cuando se quiera.'],
        done: (H) => [
          `Aplicado tras la aprobación: ${H.ids.blq} en iCare Taller, ${H.sc.count} vehículos reprogramados y ${H.sc.holds.length} entregas reasignadas en Salesforce, ${H.ids.nc} en SAP con el 8D en borrador y aviso por Slack.`,
          'El informe de incidencia sale como documento controlado: código, revisión, aprobaciones y registro de la ejecución, listo para una auditoría de marca.'
        ],
        next: { done: 'Abrir «Descargar informe de incidencia» y después ir a «Reclamación» (flecha derecha).', no_trigger: 'Ir a «De palabras a workflow», dejar 15 min y volver a ejecutar.' }
      }
    }
  });

  /* Borrador de 8D (D1–D8) que redacta el agente de Incidencias. */
  function D8(H) {
    const sc = H.sc;
    const ant = hasAnt(sc)
      ? ' Antecedente en SAP ERP: INC-2026-0471 (22/09/2026), retraso de entrega de otro Seat por falta de técnico (cerrada); tenerlo en cuenta al priorizar la entrega de José María López (VIN-2026-MAD-SEAT-03, financiación Banco Sabadell).'
      : '';
    return [
      { d: 'D1', t: 'Equipo', text: `Líder: ${ROLE.ops}. Equipo: ${ROLE.workshop_shift}, ${ROLE.customer_care} y ${ROLE.brand_manager}.`, owner: ROLE.ops, due: '2026-10-07' },
      { d: 'D2', t: 'Descripción del problema', text: `El 07/10/2026 la carga del taller VW superó ${H.fv(85)} durante 55 min (05:50–06:45), con un pico de ${H.fv(99)} a las 06:15 y 25 min por encima de ${H.fv(95)}. Había ${H.all.count} vehículos de ${lots(H.all)} grupos de órdenes en los boxes.${ant}`, owner: ROLE.ops, due: '2026-10-07' },
      { d: 'D3', t: 'Contención', text: `${H.ids.blq}: ${sc.count} vehículos reprogramados en iCare Taller; ${sc.holds.length} entregas reasignadas en Salesforce. Avisar a cada cliente y cerrar la agenda de citas nuevas de la plataforma VW.${sc.elseTotal ? ` Evaluar los ${sc.elseTotal} vehículos de los mismos grupos en campa y flota, que no estuvieron en los boxes.` : ''}`, owner: ROLE.workshop_shift, due: '2026-10-07' },
      { d: 'D4', t: 'Causa raíz (hipótesis)', text: 'Hipótesis a confirmar por el Jefe de taller: la baja médica de un técnico VW (capacidad de la plataforma al 80 %) coincidió con la llegada sin cita de 6 Golf de la campaña ABS (05:52–06:31).', owner: ROLE.workshop_shift, due: '2026-10-09' },
      { d: 'D5', t: 'Acciones correctivas propuestas', text: 'Exigir cita para la campaña ABS del Golf; definir un técnico de apoyo de otra marca con formación VW; valorar una alerta temprana de carga por encima del 80 % en iCare.', owner: ROLE.workshop_shift, due: '2026-10-14' },
      { d: 'D6', t: 'Implantación y verificación', text: 'Verificar la carga del taller VW en la siguiente jornada completa y la puntualidad de las entregas reasignadas.', owner: ROLE.ops, due: '2026-10-16' },
      { d: 'D7', t: 'Prevención', text: 'Extender la regla de apoyo entre marcas al resto de plataformas del taller y actualizar OPE-WORKSHOP-003 si procede.', owner: ROLE.ops, due: '2026-10-23' },
      { d: 'D8', t: 'Cierre', text: `Cerrar ${H.ids.nc} tras verificar la eficacia y confirmar la entrega de los ${sc.count} vehículos reprogramados.`, owner: ROLE.ops, due: '2026-10-30' }
    ];
  }
})();
