/* Norel Nutrición Animal · alarma con aprobación: positivo de Salmonella en la materia prima MP-2610-CC-118 (colina cloruro 60 %).
 * Escenario de la demo con datos sintéticos (MFM). Las funciones reciben el contexto H de la escena
 * (W workflow, C condición evaluada, sc alcance vigente, ids generados al aprobar, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Señal de amplificación de Salmonella (PCR en tiempo real, ensayo LAB-2610-0933) en LIMS, una lectura cada 5 min de 05:00 a 07:00. */
  const RFU = [21, 20, 22, 21, 23, 22, 24, 31, 48, 77, 118, 172, 231, 286, 341, 392, 431, 458, 471, 468, 474, 470, 472, 469, 471];
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = RFU.map((v, i) => ({ time: hhmm(300 + i * 5), value: v }));

  /* Lotes de premezcla fabricados con MP-2610-CC-118 con palés aún en el almacén de producto terminado (por calle): 31 palés de 1.000 kg. */
  const LOTS = [
    { id: 'PRM-2610-0417', title: 'Premezcla vitamínica de porcino', sub: 'Porcino de cebo · 27 palés fabricados', lane: 1, count: 8, first: 20, of: 27, code: '0417', kgpp: 1000, cost: 2.6, hold: 'EXP-26-5201' },
    { id: 'PRM-2610-0418', title: 'Premezcla de oligoelementos de avicultura', sub: 'Avicultura de carne · 20 palés fabricados', lane: 2, count: 7, first: 14, of: 20, code: '0418', kgpp: 1000, cost: 2.9, hold: 'EXP-26-5202' },
    { id: 'PRM-2610-0421', title: 'Núcleo vitamínico-mineral de rumiantes', sub: 'Vacuno de leche · 26 palés fabricados', lane: 3, count: 9, first: 18, of: 26, code: '0421', kgpp: 1000, cost: 2.2, hold: 'EXP-26-5203' },
    { id: 'PRM-2610-0425', title: 'Premezcla de acuicultura', sub: 'Acuicultura · 23 palés fabricados', lane: 4, count: 7, first: 17, of: 23, code: '0425', kgpp: 1000, cost: 3.1, hold: 'EXP-26-5204' }
  ];
  /* Existencias del mismo origen fuera del almacén de producto terminado (a evaluar) y palés ya expedidos a los 9 clientes: 65 palés. */
  const ELSE = {
    'PRM-2610-0417': [{ loc: 'ALM-MP', count: 6, note: 'Colina cloruro MP-2610-CC-118 sin consumir en el almacén de materias primas' }],
    'PRM-2610-0421': [{ loc: 'ENSACADO-2', count: 3, note: 'Premezcla del lote en la tolva de ensacado, sin paletizar' }]
  };
  const GONE = {
    'PRM-2610-0417': [
      { id: 'ALB-26-7312', date: '2026-10-23', time: '09:10', count: 8, to: 'Piensos del Ebro, S.A. (España)' },
      { id: 'ALB-26-7318', date: '2026-10-24', time: '11:30', count: 6, to: 'Nutrición Castellana, S.L. (España)' },
      { id: 'ALB-26-7335', date: '2026-10-26', time: '08:45', count: 5, to: 'Ração Lusitana, Lda. (Portugal)' }
    ],
    'PRM-2610-0418': [
      { id: 'ALB-26-7321', date: '2026-10-24', time: '14:20', count: 7, to: 'Cooperativa Agropienso del Sur (España)' },
      { id: 'ALB-26-7340', date: '2026-10-26', time: '16:05', count: 6, to: 'Piensos Galaico, S.A. (España)' }
    ],
    'PRM-2610-0421': [
      { id: 'ALB-26-7329', date: '2026-10-25', time: '10:15', count: 9, to: 'Compostos do Tejo, S.A. (Portugal)' },
      { id: 'ALB-26-7344', date: '2026-10-27', time: '07:50', count: 8, to: 'Nutri Maghreb, SARL (Marruecos)' }
    ],
    'PRM-2610-0425': [
      { id: 'ALB-26-7338', date: '2026-10-26', time: '12:40', count: 9, to: 'Agropienso Manchego, S.L. (España)' },
      { id: 'ALB-26-7351', date: '2026-10-27', time: '15:25', count: 7, to: 'Aliments Atlas, SARL (Marruecos)' }
    ]
  };
  /* Identificador de cada palé en almacén: PAL-2610-<lote>-<n>. */
  const UNITS = [];
  LOTS.forEach((l) => {
    for (let k = 0; k < l.count; k += 1) {
      const n = l.first + k;
      UNITS.push({ item: l.id, product: l.title, pallet: `${n}/${l.of}`, sscc: `PAL-2610-${l.code}-${String(n).padStart(2, '0')}`, kg: l.kgpp, position: `Almacén PT · calle ${l.lane} · hueco ${k + 1}`, hold: l.hold });
    }
  });

  const ROLE = {
    qa_shift: 'Responsable de calidad y seguridad alimentaria', plant_shift: 'Jefe de planta', lab_shift: 'Jefe de laboratorio',
    solutions: 'Norel Solutions', customer_care: 'Atención al cliente y pedidos', regulatory: 'Responsable de asuntos regulatorios',
    logistics: 'Responsable de logística y exportación', decider: 'Responsable de operaciones y calidad'
  };
  const TEAMS = 'Calidad y expediciones · Planta de premezclas';
  const ANT_LOT = 'PRM-2610-0421';
  const lots = (sc) => sc.items.length;
  const hasAnt = (sc) => sc.items.some((l) => l.id === ANT_LOT);
  const palsOf = (sc, h) => sc.items.filter((l) => l.hold === h.id).reduce((s, l) => s + l.count, 0);

  agenticPack('norel', {
    alarma: {
      nav: 'Alarma Salmonella',
      title: 'Alarma de Salmonella en ejecución',
      icon: 'flask',
      page_title: 'MP-2610-CC-118 · positivo de Salmonella',
      alarm_id: 'ALM-LIMS-0550',
      alarm_time: '05:50',
      source_system: 'LIMS',
      asset: 'materia prima MP-2610-CC-118',
      location: 'Planta de premezclas (España) · Laboratorio de control de calidad',
      excursion_noun: 'positivo',
      workflow_topic: 'seguridad alimentaria de materias primas',
      policy_ref: 'PR-CAL-004',
      procedures: 'PR-CAL-004 · PR-CAL-007',
      decider_short: 'Calidad y seguridad alimentaria',
      decider_of: 'de Calidad y seguridad alimentaria',
      approval_node: 'Aprobación de Calidad',
      measure: { short: 'señal de Salmonella (PCR)', col: 'Señal', unit: 'RFU', dec: 0, icon: 'flask' },
      setpoint: 20,
      setpoint_label: 'línea base',
      limit: 100,
      critical: 300,
      min_minutes: 15,
      interval_min: 5,
      series: SERIES,
      peak: 474,
      peak_time: '06:40',
      current: 471,
      current_time: '07:00',
      current_note: 'sigue por encima del límite: positivo confirmado',
      chart: {
        title: 'MP-2610-CC-118 · señal de amplificación de Salmonella',
        sub: 'Línea base 20 RFU · ahora 471 RFU (07:00)',
        tab: 'Señal',
        series_label: 'Señal PCR (LIMS · LAB-2610-0933)',
        yTicks: [0, 100, 200, 300, 400, 500],
        xTicks: ['05:00', '05:30', '06:00', '06:30', '07:00']
      },
      event_kv: [
        ['Materia prima', 'MP-2610-CC-118 · colina cloruro 60 % · proveedor Agroquímica Delta · recibida el 21/10'],
        ['Ensayo', 'LAB-2610-0933 · PCR en tiempo real de Salmonella · lectura cada 5 min'],
        ['Fabricación', '4 lotes de premezcla (PRM-2610-0417, 0418, 0421 y 0425) · 96 t'],
        ['Planta', 'Norel Nutrición Animal · Planta de premezclas (España)']
      ],
      events: [
        { time: '05:20', end: '05:35', text: 'Preparación del ensayo de confirmación de la muestra de MP-2610-CC-118', equipment: 'LIMS', tone: 'brand' },
        { time: '05:35', end: '05:50', text: 'Amplificación por PCR en tiempo real de la muestra (ensayo LAB-2610-0933)', equipment: 'Termociclador', tone: 'brand', band: 'Amplificación PCR' },
        { time: '05:50', text: 'Alarma LIMS: señal de Salmonella por encima de 100 RFU en MP-2610-CC-118', ref: 'ALM-LIMS-0550', tone: 'crit' },
        { time: '05:55', end: '06:25', text: 'La contramuestra del mismo lote confirma el positivo de Salmonella', equipment: 'Contramuestra', tone: 'warn', band: 'Confirmación de la contramuestra', bandTone: 'warn' },
        { time: '06:25', text: 'El Jefe de planta suspende la carga de expediciones del almacén de producto terminado', equipment: 'Expediciones', tone: 'warn' },
        { time: '06:40', text: 'La señal se estabiliza en torno a 470 RFU: positivo confirmado', tone: 'crit' }
      ],
      probable_cause: 'Hipótesis a confirmar por el Jefe de laboratorio: el lote MP-2610-CC-118 de colina cloruro, recibido el 21/10 de Agroquímica Delta, llegó contaminado con Salmonella; el muestreo de recepción (PR-CAL-004) no lo detectó.',
      backup: { id: 'wf-salmonella-respaldo', name: 'Positivo de Salmonella en materia prima', version: 'v1', threshold: 100, minutes: 15, critical: 300, approver: ROLE.qa_shift },
      untouched: 'SAP S/4HANA, el MES de planta, Outlook ni Microsoft Teams',
      apply_systems: 'SAP S/4HANA, MES de planta, Microsoft Teams y Outlook',
      llm_cost_usd: 0.04,
      ids: [
        { key: 'blq', prefix: 'BLQ-2026-', start: 1203, label: 'Bloqueo' },
        { key: 'nc', prefix: 'NC-2026-', start: 612, label: 'No conformidad' }
      ],
      block_id_key: 'blq',
      proposer: 'blq',
      lanes: [
        { id: 'mon', name: 'Monitor de laboratorio', short: 'Monitor', icon: 'flask', systems: ['LIMS'], idle: 'Confirma el positivo con las lecturas de LIMS', gsub: 'confirma el positivo', gsys: ['LIMS'] },
        { id: 'traz', name: 'Trazabilidad', icon: 'git-branch', systems: ['SAP S/4HANA', 'MES de planta', 'LIMS'], idle: 'Localiza lotes de premezcla, palés y expediciones', gsub: 'lotes, palés y expediciones', gsys: ['SAP', 'MES', 'LIMS'] },
        { id: 'blq', phase: 2, name: 'Calidad y logística', icon: 'lock', systems: ['SAP S/4HANA', 'MES de planta'], idle: 'Prepara el bloqueo y la retención de expediciones y pide la aprobación de Calidad', gsub: 'bloquea y retiene', gsys: ['SAP', 'MES'] },
        { id: 'inc', phase: 2, name: 'Incidencias y clientes', icon: 'clipboard', systems: ['SAP S/4HANA', 'Microsoft Teams', 'Outlook'], idle: 'Abre la no conformidad y prepara el aviso a clientes', gsub: 'NC, 8D y aviso', gsys: ['SAP', 'Teams', 'Outlook'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'LIMS', verb: 'Consultando', action: 'Lee la señal de amplificación de Salmonella del ensayo LAB-2610-0933 de 05:00 a 07:00, una lectura cada 5 min', result: `${SERIES.length} lecturas, sin huecos · ahora ${H.fv(471)} (07:00)`, ms: 1850, set: { volume: `${SERIES.length} lecturas de señal` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'LIMS', verb: 'Consultando', action: 'Cruza el positivo con la contramuestra y con el historial del proveedor Agroquímica Delta', result: `Contramuestra positiva (05:55–06:25) y lote recibido el 21/10: hipótesis para el ${ROLE.lab_shift}`, tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} lecturas · 6 eventos`, result: `Positivo confirmado: ${H.C.above} min por encima · pico ${H.fv(474)}` } },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Consultando', action: 'Localiza los lotes de premezcla fabricados con MP-2610-CC-118, hacia delante', result: `${lots(a)} lotes de premezcla · 96 t fabricadas`, ms: 2100, set: { volume: `${lots(a)} lotes · 96 t` } },
            { lane: 'traz', system: 'MES de planta', verb: 'Consultando', action: 'Resuelve las órdenes de fabricación, el consumo de materia prima y los palés de cada lote', result: `${lots(a)} lotes · ${a.count} palés en almacén (${H.fmt.kg(a.qty)}) · ${H.fmt.eur(a.value)} a coste estándar`, ms: 2600, set: { volume: `${lots(a)} lotes · ${a.count} palés en almacén` }, reveal: 'lots' },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Consultando', action: `Cuenta las expediciones de los ${lots(a)} lotes: ${a.count} palés en almacén y ${H.goneTotal} palés ya expedidos`, result: `96 t = ${a.count} t en almacén de producto terminado + ${H.goneTotal} t expedidas a 9 clientes de España, Portugal y Marruecos`, ms: 1900 },
            { lane: 'traz', system: 'MES de planta', verb: 'Consultando', action: 'Busca existencias del mismo origen fuera del almacén de producto terminado', result: `${a.elseTotal} palés entre el almacén de materias primas y la línea de ensacado, a evaluar · ${H.goneTotal} palés ya expedidos antes de la alarma`, ms: 1700, reveal: 'map' },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Consultando', action: 'Consulta las expediciones planificadas de esos palés', result: `${a.holds.length} expediciones planificadas; la primera, ${H.first.id}, a las ${H.first.time} en ${H.first.where}`, tone: 'warn', ms: 2200, set: { volume: `${a.count} palés · ${lots(a)} lotes · ${a.holds.length} expediciones`, result: `Primera expedición afectada a las ${H.first.time}` }, milestone: 'traz', audit: { action: 'Lotes y palés identificados', detail: `${a.count} palés de ${lots(a)} lotes de premezcla en almacén · ${a.holds.length} expediciones planificadas · ${H.goneTotal} palés ya expedidos a 9 clientes · ${a.elseTotal} palés del mismo origen fuera del almacén` } },
            { lane: 'blq', node: 'apr', system: 'Procedimientos', verb: 'Analizando', action: 'Aplica PR-CAL-004 y PR-CAL-007 a este positivo', result: 'Bloquear el lote de materia prima y los lotes de premezcla, retener las expediciones y avisar a los clientes; solo Calidad y seguridad alimentaria libera', ms: 1300 },
            { lane: 'blq', node: 'apr', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta la propuesta de bloqueo y su motivo con las evidencias', result: `Propuesta: ${a.count} palés de ${lots(a)} lotes bloqueados y ${a.holds.length} expediciones retenidas; ${a.elseTotal} palés fuera del almacén, a evaluar`, ms: 7000, set: { volume: `${a.count} palés · ${a.holds.length} expediciones` } },
            { lane: 'blq', node: 'apr', system: 'Agentic Platform', verb: 'Evaluando', action: `Pide la aprobación del ${H.W.approver} antes de escribir en SAP S/4HANA y en el MES de planta`, result: 'Esperando la decisión de Calidad y seguridad alimentaria', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Propuesta enviada a Calidad' }, milestone: 'prop', audit: { action: 'Propuesta de bloqueo enviada a aprobación', detail: `${a.count} palés de ${lots(a)} lotes · aprueba ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          const ships = sc.holds.map((h) => h.id).join(', ');
          return [
            { lane: 'blq', system: 'SAP S/4HANA', verb: 'Aplicando', action: `Registra el bloqueo de calidad (SAP QM) de MP-2610-CC-118 y de ${lots(sc)} lotes de premezcla`, result: `${ids.blq} · ${sc.count} palés en estado «bloqueado»`, tone: 'ok', ms: 2400, milestone: 'blq', audit: { action: 'Bloqueo aplicado', detail: `${ids.blq} · SAP S/4HANA · MP-2610-CC-118 y ${sc.count} palés de ${lots(sc)} lotes` } },
            { lane: 'blq', system: 'MES de planta', verb: 'Aplicando', action: `Inmoviliza los ${sc.count} palés y retiene sus ${sc.holds.length} expediciones`, result: `${sc.count} palés inmovilizados · ${sc.holds.length} expediciones retenidas, la primera ${H.holdWhen(sc.holds[0]).includes('/') ? 'el' : 'a las'} ${H.holdWhen(sc.holds[0])}`, tone: 'ok', ms: 2100, set: { result: `${ids.blq} aplicado · ${sc.holds.length} expediciones retenidas` }, milestone: 'wms', audit: { action: 'Palés inmovilizados y expediciones retenidas', detail: `MES de planta · ${sc.count} palés · ${ships}` } },
            { lane: 'inc', system: 'SAP S/4HANA', verb: 'Aplicando', action: 'Abre la no conformidad con el resultado de LIMS, la trazabilidad y los 9 clientes expuestos', result: `${ids.nc} abierta${hasAnt(sc) ? ' · antecedente NC-2026-0398 enlazado' : ''}`, tone: 'ok', ms: 1900, set: { volume: '1 no conformidad' }, milestone: 'nc', audit: { action: 'No conformidad abierta', detail: `${ids.nc} · SAP S/4HANA · Salmonella en MP-2610-CC-118` } },
            { lane: 'inc', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta el borrador de 8D (D1–D8) con responsables por rol y el aviso a los 9 clientes', result: 'Borrador de 8D y de aviso a clientes listos para la revisión de Calidad', ms: 7800, set: { volume: '1 no conformidad · 8D en borrador' }, milestone: 'd8', audit: { action: 'Borrador de 8D redactado', detail: `${ids.nc} · D1–D8 · pendiente de revisión de Calidad` } },
            { lane: 'inc', system: 'Microsoft Teams', verb: 'Enviando', action: `Avisa al ${ROLE.plant_shift}, al ${ROLE.logistics} y a ${ROLE.customer_care}`, result: `Aviso publicado en el canal «${TEAMS}»`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 no conformidad · 8D · 1 aviso', result: `${ids.nc} abierta · planta y logística avisadas` }, milestone: 'teams', audit: { action: 'Aviso enviado por Teams', detail: `${ROLE.plant_shift}, ${ROLE.logistics} y ${ROLE.customer_care} · canal «${TEAMS}»` } },
            { lane: 'inc', system: 'Outlook', verb: 'Preparando', action: `Deja en borradores el aviso a los 9 clientes expuestos, para que lo revise ${ROLE.solutions} y lo envíe ${ROLE.customer_care}`, result: '9 borradores de aviso en Outlook, sin enviar', tone: 'ok', ms: 1200, audit: { action: 'Avisos a clientes en borrador', detail: `${ids.nc} · 9 clientes · pendientes de revisión de ${ROLE.solutions}` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Palés de premezcla en almacén', value: H.all.count, sub: `${lots(H.all)} lotes · ${H.fmt.kg(H.all.qty)} · ya expedidos: ${H.goneTotal} palés a 9 clientes`, icon: 'pallet' },
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
          'EXP-26-5201': { date: '2026-10-28', time: '10:00', where: 'Muelle 2', label: 'Piensos del Ebro, S.A. (España)' },
          'EXP-26-5202': { date: '2026-10-28', time: '12:30', where: 'Muelle 3', label: 'Cooperativa Agropienso del Sur (España)' },
          'EXP-26-5203': { date: '2026-10-28', time: '15:00', where: 'Muelle 4', label: 'Ração Lusitana, Lda. (Portugal)' },
          'EXP-26-5204': { date: '2026-10-29', time: '07:30', where: 'Muelle 5', label: 'Nutri Maghreb, SARL (Marruecos) · exportación' }
        },
        units: UNITS,
        csv_name: 'pales-premezcla-salmonella',
        csv_cols: [
          { label: 'Lote', key: 'item' },
          { label: 'Producto', key: 'product' },
          { label: 'Palé', key: 'pallet' },
          { label: 'ID de palé', key: 'sscc', text: true },
          { label: 'Kg', key: 'kg' },
          { label: 'Ubicación', key: 'position' },
          { label: 'Expedición planificada', key: 'hold' }
        ],
        labels: {
          items_title: 'Lotes de premezcla y palés afectados',
          items_systems: 'SAP S/4HANA y MES de planta',
          items_where: 'palés en el almacén de producto terminado,',
          item_col: 'Lote',
          at_col: 'En almacén',
          group_col: 'Calle',
          hold_col: 'Expedición planificada',
          else_col: 'Fuera del almacén de PT',
          else_none: 'Sin existencias',
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
          scope_main: 'Palés de premezcla en el almacén de producto terminado',
          else_scope: 'Mismo origen fuera del almacén de producto terminado',
          else_decision: 'A evaluar',
          map_title: 'Ubicación de los palés',
          map_sub: 'MES de planta · Planta de premezclas (España)',
          zone_title: 'Almacén de producto terminado',
          zone_sub: '4 calles · 120 huecos',
          else_title: 'Mismo origen fuera del almacén de PT',
          else_sub: 'materia prima y ensacado · a evaluar',
          gone_title: 'Expedidos a clientes antes de la alarma',
          legend_exposed: 'Expuesto al positivo',
          legend_else: 'A evaluar fuera del almacén',
          csv_button: 'Descargar palés (CSV)',
          value_label: 'a coste estándar',
          report_scope: 'Alcance del bloqueo'
        }
      },
      text: {
        proposal_title: 'propuesta de bloqueo',
        stop_without: 'proponer el bloqueo',
        activates: 'el bloqueo',
        no_proposal: 'sin propuesta de bloqueo',
        idle_log: 'La ejecución se detiene en la aprobación: nada se escribe en SAP S/4HANA ni en el MES de planta sin la decisión de Calidad y seguridad alimentaria.',
        approve_action: 'Aprueba el bloqueo',
        scope_short: (H) => `${H.pl(H.sc.count)} de ${H.fmt.plural(lots(H.sc), 'lote', 'lotes')} y ${H.fmt.plural(H.sc.holds.length, 'expedición retenida', 'expediciones retenidas')}`,
        audit_approved: 'Bloqueo aprobado',
        audit_approved_detail: (H) => `${H.ids.blq} · ${H.sc.count} palés de ${lots(H.sc)} lotes de premezcla · ${H.sc.holds.length} expediciones retenidas${H.sc.out.length ? ` · alcance editado (sin ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Bloqueo ${H.ids.blq} aprobado · ${H.sc.count} palés`,
        audit_rejected: 'Bloqueo rechazado',
        outcome_rejected: 'Bloqueo rechazado · sin acciones aplicadas',
        toast_done: (H) => `${H.ids.blq} aplicado · ${H.ids.nc} abierta · aviso enviado por Teams`,
        presenter_applying: 'Tras la aprobación: bloqueo en SAP S/4HANA, palés inmovilizados en el MES, no conformidad, aviso por Teams y borradores de aviso a clientes en Outlook.',
        reject_nothing: 'ni bloqueo en SAP S/4HANA, ni palés inmovilizados en el MES, ni no conformidad, ni aviso por Teams, ni borradores para los clientes',
        edit_intro: 'PR-CAL-007 pide bloquear todos los lotes fabricados con la materia prima positiva.'
      },
      approval: {
        id: 'blq-mp-cc-118',
        approve_label: 'Aprobar bloqueo',
        policy: 'PR-CAL-004 · PR-CAL-007 · solo Calidad y seguridad alimentaria libera',
        title: (H) => `Bloqueo de calidad · ${H.pl(H.sc.count)} de premezcla con MP-2610-CC-118`,
        summary: (H) => `Motivo: señal de Salmonella por encima de ${H.fv(H.C.threshold)} durante ${H.C.above} min (${H.span}), más de los ${H.C.minutes} min que fija ${H.W.backup ? 'PR-CAL-004' : 'el workflow'}${H.critMin ? `, y ${H.critMin} min por encima de ${H.fv(H.crit)}: positivo crítico` : ''}. Se bloquean el lote de materia prima y los palés de premezcla en almacén, se retienen las expediciones y se prepara el aviso a los 9 clientes que ya recibieron producto, hasta decidir el destino de cada lote.`,
        extra_scope: () => [],
        effects: (H) => [
          `SAP S/4HANA: bloqueo de calidad de MP-2610-CC-118 y de ${lots(H.sc)} lotes de premezcla (${H.sc.count} palés en almacén)`,
          `MES de planta: ${H.sc.count} palés inmovilizados y ${H.sc.holds.length} expediciones retenidas`,
          'SAP S/4HANA: no conformidad con borrador de 8D',
          `Microsoft Teams: aviso a ${ROLE.plant_shift}, ${ROLE.logistics} y ${ROLE.customer_care}`,
          'Outlook: 9 borradores de aviso a clientes, sin enviar'
        ],
        applied: (H) => [
          `SAP S/4HANA: ${H.ids.blq} · ${lots(H.sc)} lotes (${H.sc.count} palés)`,
          `MES de planta: ${H.sc.count} palés inmovilizados y ${H.sc.holds.length} expediciones retenidas`,
          `SAP S/4HANA: ${H.ids.nc} con borrador de 8D`,
          `Microsoft Teams: aviso a ${ROLE.plant_shift}, ${ROLE.logistics} y ${ROLE.customer_care}`,
          'Outlook: 9 borradores de aviso a clientes, sin enviar'
        ]
      },
      result: {
        title: (H) => `Bloqueo ${H.ids.blq} aplicado y no conformidad ${H.ids.nc} abierta`,
        stats: (H) => [
          { label: 'Palés bloqueados', value: H.sc.count, tone: 'crit' },
          { label: 'Expediciones retenidas', value: H.sc.holds.length },
          { label: 'Palés ya expedidos a 9 clientes', value: H.goneTotal, tone: 'crit' },
          { label: 'Palés fuera del almacén a evaluar', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Bloqueo ${H.ids.blq}`, systems: ['SAP S/4HANA', 'MES de planta'],
            kv: [
              ['Estado', App.chip('blocked')],
              ['Alcance', `${H.pl(H.sc.count)} · ${H.fmt.plural(lots(H.sc), 'lote', 'lotes')} · ${H.fmt.kg(H.sc.qty)}`],
              ['Valor a coste estándar', H.fmt.eur(H.sc.value)],
              ['Expediciones retenidas', H.sc.holds.map((h) => h.id).join(', ')],
              ['Libera', `${ROLE.qa_shift} (PR-CAL-007)`]
            ],
            next: 'Siguiente paso según PR-CAL-007: valorar la retirada de los 65 palés ya expedidos a 9 clientes (campaña RET-2026-1028) y evaluar con Asuntos regulatorios la notificación a la autoridad competente (Reglamento (CE) 178/2002, art. 19).',
            buttons: [{ action: 'csv', label: 'Palés bloqueados (CSV)' }]
          },
          {
            icon: 'clipboard', title: `No conformidad ${H.ids.nc}`, systems: ['SAP S/4HANA'], chip: ['draft', '8D en borrador'],
            items: D8(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Descargar borrador 8D (PDF)' }]
          },
          {
            icon: 'send', title: 'Aviso a planta y logística', systems: ['Microsoft Teams'], note: H.run.endAt ? `enviado a las ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              icon: 'message-square', from: 'Agentic Platform · agente Incidencias', channel: `canal «${TEAMS}»`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: ROLE.plant_shift, text: `Bloqueo de calidad ${H.ids.blq} de MP-2610-CC-118 y sus lotes de premezcla, aprobado por ${H.decision ? H.decision.by : H.W.approver}${H.decision ? ` a las ${H.fmt.time(H.decision.at)}` : ''}. No cargar ni expedir hasta nueva decisión de Calidad:` },
                { to: ROLE.logistics, text: `Retener las expediciones listadas y localizar los 65 palés ya entregados a 9 clientes de España, Portugal y Marruecos. ${ROLE.customer_care} y ${ROLE.solutions} preparan el aviso a clientes. Detalle en ${H.ids.nc} (SAP S/4HANA).` }
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
        subtitle: 'No conformidad por Salmonella en la materia prima MP-2610-CC-118 · borrador para revisión',
        filename: (H) => `borrador-8d-${H.ids.nc}`,
        meta: (H) => [['No conformidad', H.ids.nc], ['Bloqueo asociado', H.ids.blq]],
        items: (H) => D8(H),
        reviewer: ROLE.qa_shift,
        approver: ROLE.decider,
        note: 'Borrador generado a partir de las evidencias de la ejecución. Las fechas objetivo son una propuesta: las confirma el equipo del 8D. La causa raíz es una hipótesis hasta que el Jefe de laboratorio la confirme.'
      },
      report: {
        noun: 'informe de incidencia',
        code: 'REG-CAL-012-07',
        title: 'Informe de incidencia · MP-2610-CC-118',
        subtitle: 'Positivo de Salmonella en materia prima',
        filename: 'informe-incidencia-mp-2610-cc-118',
        site_label: 'Planta',
        site: 'Planta de premezclas (España)',
        description: (H) => `El 28/10/2026 a las 05:50, LIMS emitió la alarma ALM-LIMS-0550 por un resultado positivo de Salmonella en una muestra de la materia prima MP-2610-CC-118 (colina cloruro 60 %, proveedor Agroquímica Delta, recibida el 21/10; ensayo LAB-2610-0933, línea base ${H.fv(20)}). La señal estuvo ${H.C.above} min por encima de ${H.fv(H.C.threshold)} (${H.span}), con un pico de ${H.fv(474)} a las 06:40 y ${H.critMin} min por encima de ${H.fv(H.crit)}. A las 07:00 la señal era de ${H.fv(471)}. La materia prima se usó en 4 lotes de premezcla (96 t): ${H.all.count} t siguen en el almacén de producto terminado y ${H.goneTotal} t se expidieron a 9 clientes.`,
        criteria: 'PR-CAL-004 (muestreo y control de Salmonella en materias primas: un positivo bloquea el lote) y PR-CAL-007 (retirada y trazabilidad de lotes; solo Calidad y seguridad alimentaria libera).',
        actions: (H) => [
          `SAP S/4HANA · ${H.ids.blq}: bloqueo de calidad de MP-2610-CC-118 y de ${lots(H.sc)} lotes de premezcla (${H.sc.count} palés, ${H.fmt.kg(H.sc.qty)}; ${H.fmt.eur(H.sc.value)} a coste estándar).`,
          `MES de planta: ${H.sc.count} palés inmovilizados; expediciones retenidas: ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)}, ${h.where})`).join(', ')}.`,
          `SAP S/4HANA · ${H.ids.nc}: no conformidad abierta con borrador de 8D (REG-CAL-020-02).`,
          `Microsoft Teams: aviso a ${ROLE.plant_shift}, ${ROLE.logistics} y ${ROLE.customer_care} en el canal «${TEAMS}».`,
          'Outlook: 9 borradores de aviso a los clientes que ya recibieron producto, sin enviar.'
        ],
        pending: (H) => [
          'Confirmar el resultado con el laboratorio de referencia y con la contramuestra retenida (Jefe de laboratorio).',
          `Evaluar con ${ROLE.regulatory} la notificación a la autoridad competente (Reglamento (CE) 178/2002, art. 19).`,
          'Valorar la retirada de los 65 palés expedidos a 9 clientes (campaña RET-2026-1028) y la reclamación al proveedor Agroquímica Delta.',
          `Aviso a cada cliente expuesto: ${ROLE.customer_care} con ${ROLE.solutions}.`
        ].concat(H && hasAnt(H.sc) ? ['Antecedente en SAP S/4HANA: NC-2026-0398 (14/08/2026), hallazgo de Enterobacteriaceae en un lote de colina cloruro del mismo proveedor (cerrada). Relevante para decidir el destino de PRM-2610-0421 y la calificación de Agroquímica Delta.'] : []),
        reviewer: ROLE.decider,
        final_step: 'Destino de los lotes',
        final_role: ROLE.qa_shift,
        note: 'Documento sujeto a la revisión de Calidad y seguridad alimentaria; no sustituye la decisión de destino del producto ni la notificación a la autoridad.'
      },
      not_applied: (H) => [
        { sys: 'SAP S/4HANA', text: 'Sin bloqueo de calidad ni no conformidad' },
        { sys: 'MES de planta', text: `Ningún palé inmovilizado; las ${H.all.holds.length} expediciones siguen planificadas` },
        { sys: 'Microsoft Teams', text: 'Sin aviso a planta y logística' },
        { sys: 'Outlook', text: 'Sin borradores de aviso a clientes' }
      ],
      compare: [
        { k: 'Personas que intervienen', today: '4–5: laboratorio, calidad, planta, logística y atención al cliente', now: 'Calidad y seguridad alimentaria revisa y decide; planta, logística y clientes reciben el aviso con los datos' },
        { k: 'Sistemas que se consultan a mano', today: '5–6: LIMS, SAP, MES, hojas de albaranes, correo y teléfono', now: 'Ninguno: los agentes consultan 3 sistemas y cada dato queda en el registro' },
        { k: 'Pasos', today: '12–15 pasos manuales, con esperas entre personas', steps: true },
        { k: 'Tiempo hasta el bloqueo y la NC', today: '2–4 h', measured: true },
        { k: 'Evidencia para la auditoría', today: 'Repartida entre correos, capturas y hojas de cálculo', now: 'Informe REG-CAL-012-07 y registro de auditoría de la ejecución' }
      ],
      presenter: {
        intro: () => 'Alarma de las 05:50 en LIMS: positivo de Salmonella en MP-2610-CC-118, con un pico de 474 RFU a las 06:40 y 75 min por encima de 100 RFU. La primera expedición afectada sale hoy a las 10:00.',
        agents: 'Cuatro agentes, cada uno con su sistema: LIMS para el resultado; SAP y el MES de planta para lotes, palés y expediciones; SAP y el MES para el bloqueo; SAP, Teams y Outlook para la incidencia y el aviso a clientes.',
        waiting: (H) => [
          `Los ${H.sc.elseTotal} palés del mismo origen fuera del almacén quedan «a evaluar»; los ${H.goneTotal} palés ya expedidos a 9 clientes pasan a la retirada. Todavía no se ha escrito nada en SAP S/4HANA ni en el MES de planta.`,
          'Se puede editar el alcance (quitar un lote, con motivo) o rechazar: si se rechaza, no se aplica nada y queda en auditoría.'
        ],
        rejected: ['Rechazado: no se ha bloqueado nada, ni en SAP S/4HANA ni en el MES de planta, y no hay no conformidad ni aviso. El motivo queda en el registro de auditoría.', 'La decisión es siempre de Calidad y seguridad alimentaria; se puede volver a ejecutar cuando se quiera.'],
        done: (H) => [
          `Aplicado tras la aprobación: ${H.ids.blq} en SAP S/4HANA, ${H.sc.count} palés inmovilizados y ${H.sc.holds.length} expediciones retenidas en el MES, ${H.ids.nc} con el 8D en borrador, aviso por Teams y 9 borradores de aviso a clientes en Outlook.`,
          'El informe de incidencia sale como documento controlado: código, revisión, aprobaciones y registro de la ejecución, listo para una auditoría GMP+ o FAMI-QS.'
        ],
        next: { done: 'Abrir «Descargar informe de incidencia» y después ir a «Reclamación» (flecha derecha).', no_trigger: 'Ir a «De palabras a workflow», dejar 15 min y volver a ejecutar.' }
      }
    }
  });

  /* Borrador de 8D (D1–D8) que redacta el agente de Incidencias. */
  function D8(H) {
    const sc = H.sc;
    const ant = hasAnt(sc)
      ? ' Antecedente en SAP S/4HANA: NC-2026-0398 (14/08/2026), hallazgo de Enterobacteriaceae en un lote de colina cloruro del mismo proveedor (cerrada); tenerlo en cuenta al decidir el destino de PRM-2610-0421 y la calificación de Agroquímica Delta.'
      : '';
    return [
      { d: 'D1', t: 'Equipo', text: `Líder: ${ROLE.qa_shift}. Equipo: ${ROLE.lab_shift}, ${ROLE.plant_shift}, ${ROLE.logistics}, ${ROLE.customer_care} y ${ROLE.regulatory}.`, owner: ROLE.qa_shift, due: '2026-10-28' },
      { d: 'D2', t: 'Descripción del problema', text: `El 28/10/2026 LIMS registró un positivo de Salmonella en la materia prima MP-2610-CC-118 (colina cloruro 60 %, Agroquímica Delta, recibida el 21/10): señal por encima de ${H.fv(100)} desde las 05:50 (75 min, en curso), con un pico de ${H.fv(474)} a las 06:40 y 55 min por encima de ${H.fv(300)}. Se usó en 4 lotes de premezcla (96 t): ${H.all.count} t en almacén y ${H.goneTotal} t expedidas a 9 clientes.${ant}`, owner: ROLE.qa_shift, due: '2026-10-28' },
      { d: 'D3', t: 'Contención', text: `${H.ids.blq}: MP-2610-CC-118 y ${sc.count} palés de premezcla bloqueados en SAP S/4HANA e inmovilizados en el MES; ${sc.holds.length} expediciones retenidas. Localizar y avisar a los 9 clientes que ya recibieron producto.${sc.elseTotal ? ` Evaluar los ${sc.elseTotal} palés del mismo origen fuera del almacén de producto terminado.` : ''}`, owner: ROLE.plant_shift, due: '2026-10-28' },
      { d: 'D4', t: 'Causa raíz (hipótesis)', text: 'Hipótesis a confirmar por el Jefe de laboratorio: el lote MP-2610-CC-118 de colina cloruro llegó contaminado con Salmonella desde Agroquímica Delta y el muestreo de recepción (PR-CAL-004) no lo detectó.', owner: ROLE.lab_shift, due: '2026-10-30' },
      { d: 'D5', t: 'Acciones correctivas propuestas', text: 'Reclamar al proveedor y reforzar su calificación; ampliar el muestreo de recepción de colina cloruro; valorar el análisis previo a la liberación de las materias primas de riesgo.', owner: ROLE.qa_shift, due: '2026-11-04' },
      { d: 'D6', t: 'Implantación y verificación', text: 'Verificar con análisis de las siguientes recepciones del proveedor y la limpieza de las líneas afectadas (PR-PRO-003).', owner: ROLE.lab_shift, due: '2026-11-11' },
      { d: 'D7', t: 'Prevención', text: 'Actualizar PR-CAL-004 con el nuevo plan de muestreo y extender la medida al resto de materias primas de origen similar.', owner: ROLE.qa_shift, due: '2026-11-25' },
      { d: 'D8', t: 'Cierre', text: `Cerrar ${H.ids.nc} tras verificar la eficacia y decidir el destino de los 4 lotes de premezcla y de los ${sc.count} palés bloqueados.`, owner: ROLE.decider, due: '2026-12-02' }
    ];
  }
})();
