/* Empresa de Congelados · approval alarm (English): temperature excursion in dispatch cold room C-07 (Fustiñana).
 * Reference demo scenario with synthetic data (MFM). The functions receive the scene context H
 * (W workflow, C evaluated condition, sc current scope, ids generated on approval, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Air temperature of cold room C-07 (sensor TT-C07-01), one reading every 5 min from 05:00 to 07:00. */
  const TEMPS = [-22.1, -22.0, -22.2, -22.1, -21.9, -22.0, -22.1, -21.5, -20.7, -19.4, -17.8, -17.1, -16.5, -15.9, -15.3, -14.8, -14.2, -13.9, -14.4, -16.6, -18.4, -19.3, -19.9, -20.3, -20.5];
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = TEMPS.map((v, i) => ({ time: hhmm(300 + i * 5), value: v }));

  /* Lots with pallets in C-07 during the excursion (by lane): 38 pallets, 28,592 kg. */
  const LOTS = [
    { id: 'L26-258-FUS-BRO-01', title: 'Broccoli florets 2.5 kg', sub: 'EC foodservice', lane: 1, count: 6, first: 1, of: 18, kgpp: 720, cost: 1.75, hold: 'EXP-26-41106' },
    { id: 'L26-261-FUS-GUI-03', title: 'Fine peas 1 kg', sub: 'Verleal (retail ES)', lane: 2, count: 8, first: 5, of: 22, kgpp: 800, cost: 1.6, hold: 'EXP-26-41107' },
    { id: 'L26-255-ALF-ESP-04', title: 'Spinach portions 1 kg', sub: 'Verleal', lane: 3, count: 5, first: 1, of: 12, kgpp: 800, cost: 1.5, hold: 'EXP-26-41107' },
    { id: 'L26-262-FUS-MIX-02', title: 'Chargrilled vegetable mix 600 g', sub: 'UK retailer private label (via EC Foods UK Ltd)', lane: 4, count: 7, first: 10, of: 16, kgpp: 648, cost: 2.4, hold: 'EXP-26-41109' },
    { id: 'L26-259-FUS-JUD-01', title: 'Round green beans 1 kg', sub: 'Importer France', lane: 5, count: 6, first: 15, of: 20, kgpp: 800, cost: 1.55, hold: 'EXP-26-41111' },
    { id: 'L26-263-FUS-MAI-02', title: 'Sweet corn 450 g', sub: 'EC Frozen Foods LLC (USA)', lane: 6, count: 6, first: 1, of: 24, kgpp: 756, cost: 1.7, hold: 'EXP-26-41118' }
  ];
  /* Pallets of the same lots outside C-07 (automatic silos, not exposed) and already shipped before the alarm. */
  const ELSE = {
    'L26-258-FUS-BRO-01': [{ loc: 'SIL-1', count: 12, note: 'BRO-01 · automatic silo 1' }],
    'L26-261-FUS-GUI-03': [{ loc: 'SIL-3', count: 10, note: 'GUI-03 · −23.9 °C, within limits' }],
    'L26-255-ALF-ESP-04': [{ loc: 'SIL-2', count: 7, note: 'ESP-04 · automatic silo 2' }],
    'L26-263-FUS-MAI-02': [{ loc: 'SIL-4', count: 18, note: 'MAI-02 · automatic silo 4' }]
  };
  const GONE = {
    'L26-261-FUS-GUI-03': [{ id: 'EXP-26-41102', date: '2026-09-28', time: '18:40', count: 4, to: 'Spanish retail logistics platform' }],
    'L26-262-FUS-MIX-02': [{ id: 'EXP-26-41083', date: '2026-09-25', time: '14:20', count: 9, to: 'EC Foods UK Ltd (EC subsidiary, United Kingdom) · UK retailer (private label)' }],
    'L26-259-FUS-JUD-01': [{ id: 'EXP-26-41071', date: '2026-09-23', time: '17:45', count: 14, to: 'Importer France' }]
  };
  /* SSCC of the pallets in C-07: extension 3 + company prefix 8412345 + lot + pallet number + GS1 check digit. */
  const gs1 = (s) => { let t = 0; for (let i = 0; i < s.length; i += 1) t += Number(s[s.length - 1 - i]) * (i % 2 === 0 ? 3 : 1); return (10 - (t % 10)) % 10; };
  const UNITS = [];
  LOTS.forEach((l) => {
    const p = l.id.split('-');
    for (let k = 0; k < l.count; k += 1) {
      const n = l.first + k;
      const base = `38412345${p[1]}${p[4]}${String(n).padStart(4, '0')}`;
      UNITS.push({ item: l.id, product: l.title, pallet: `${n}/${l.of}`, sscc: `${base}${gs1(base)}`, kg: l.kgpp, position: `C-07 · lane ${l.lane} · slot ${k + 1}`, hold: l.hold });
    }
  });

  const ROLE = {
    quality_shift: 'Shift Quality Lead', dispatch_shift: 'Dispatch Shift Supervisor', refrigeration_maintenance: 'Refrigeration Maintenance',
    quality_plant: 'Plant Quality Manager', decider: 'Operations Director'
  };
  const TEAMS = 'Dispatch · Fustiñana';
  const ANT_LOT = 'L26-263-FUS-MAI-02';
  const lots = (sc) => sc.items.length;
  const hasAnt = (sc) => sc.items.some((l) => l.id === ANT_LOT);
  const palsOf = (sc, h) => sc.items.filter((l) => l.hold === h.id).reduce((s, l) => s + l.count, 0);

  agenticPackEn('congelados', {
    alarma: {
      nav: 'C-07 alarm',
      title: 'C-07 alarm in progress',
      icon: 'thermometer',
      page_title: 'Cold room C-07 · temperature excursion',
      alarm_id: 'ALM-C07-0550',
      alarm_time: '05:50',
      source_system: 'SCADA Galileo',
      asset: 'cold room C-07',
      location: 'Fustiñana · Dispatch cold room 7',
      excursion_noun: 'excursion',
      workflow_topic: 'cold chain',
      policy_ref: 'PNT-CAL-012',
      procedures: 'PNT-CAL-012 · PNT-CAL-015',
      decider_short: 'Quality',
      approval_node: 'Quality approval',
      measure: { short: 'air temperature', col: 'Air', unit: '°C', dec: 1, icon: 'thermometer' },
      setpoint: -22,
      setpoint_label: 'setpoint',
      limit: -18,
      critical: -15,
      min_minutes: 15,
      interval_min: 5,
      series: SERIES,
      peak: -13.9,
      peak_time: '06:25',
      current: -20.5,
      current_time: '07:00',
      current_note: 'below the limit since 06:40',
      chart: {
        title: 'Cold room C-07 · air temperature',
        sub: 'Setpoint −22 °C · now −20.5 °C (07:00)',
        tab: 'Temperature',
        series_label: 'Air (TT-C07-01)',
        yTicks: [-24, -21, -18, -15, -12],
        xTicks: ['05:00', '05:30', '06:00', '06:30', '07:00']
      },
      event_kv: [
        ['Cold room', 'C-07 · Dispatch cold room 7 · capacity 240 pallets'],
        ['Sensor', 'TT-C07-01 · air · reading every 5 min'],
        ['Equipment', 'EV-07 (evaporator) · P-07 (fast door)'],
        ['Plant', 'Fustiñana (FUS) · main plant and logistics hub']
      ],
      events: [
        { time: '05:35', end: '05:40', text: 'EV-07 fans stop (start of the defrost cycle)', equipment: 'EV-07', tone: 'brand' },
        { time: '05:40', end: '06:05', text: 'Scheduled defrost of EV-07', equipment: 'EV-07', tone: 'brand', band: 'EV-07 defrost' },
        { time: '05:50', text: 'SCADA alarm: air temperature above -18 °C', ref: 'ALM-C07-0550', tone: 'crit' },
        { time: '05:52', end: '06:31', text: 'P-07 door-open sensor: the fast door does not close fully', equipment: 'P-07', tone: 'warn', band: 'P-07 door open', bandTone: 'warn' },
        { time: '06:31', text: 'P-07 closed manually by the Dispatch Shift Supervisor', equipment: 'P-07', tone: 'warn' },
        { time: '06:40', text: 'Air temperature drops back below -18 °C', tone: 'ok' }
      ],
      probable_cause: 'Hypothesis to be confirmed by Refrigeration Maintenance: the EV-07 defrost (05:40-06:05) overlapped with a closing failure of fast door P-07 (door-open sensor 05:52-06:31).',
      backup: { id: 'wf-cadena-frio-respaldo', name: 'Temperature excursion in cold rooms', version: 'v1', threshold: -18, minutes: 15, critical: -15, approver: ROLE.quality_shift },
      untouched: 'SAP QM, Easy WMS, Elara or Teams',
      apply_systems: 'SAP QM, Easy WMS, Elara and Teams',
      llm_cost_usd: 0.04,
      ids: [
        { key: 'blq', prefix: 'BLQ-2026-', start: 917, label: 'Quality hold' },
        { key: 'nc', prefix: 'NC-2026-', start: 418, label: 'Non-conformity' }
      ],
      block_id_key: 'blq',
      proposer: 'blq',
      lanes: [
        { id: 'mon', name: 'Cold chain monitor', short: 'Monitor', icon: 'thermometer', systems: ['SCADA Galileo'], idle: 'Confirms the excursion with the Galileo readings', gsub: 'confirms the excursion', gsys: ['SCADA Galileo'] },
        { id: 'traz', name: 'Traceability', icon: 'git-branch', systems: ['Mecalux Easy WMS', 'SAP', 'MES Mapex'], idle: 'Locates pallets, lots and shipments', gsub: 'pallets, lots and shipments', gsys: ['Easy WMS', 'SAP', 'MES Mapex'] },
        { id: 'blq', phase: 2, name: 'Quality hold', icon: 'lock', systems: ['SAP QM', 'Mecalux Easy WMS'], idle: 'Prepares the hold and requests Quality approval', gsub: 'holds and retains', gsys: ['SAP QM', 'Easy WMS'] },
        { id: 'inc', phase: 2, name: 'Incidents', icon: 'clipboard', systems: ['Elara', 'Microsoft Teams'], idle: 'Opens the non-conformity and notifies dispatch', gsub: 'NC, 8D and notice', gsys: ['Elara', 'Teams'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'SCADA Galileo', verb: 'Querying', action: 'Reads sensor TT-C07-01 from 05:00 to 07:00, one reading every 5 min', result: `${SERIES.length} readings, no gaps · now ${H.fv(-20.5)} (07:00)`, ms: 1850, set: { volume: `${SERIES.length} temperature readings` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'SCADA Galileo', verb: 'Querying', action: 'Cross-checks the excursion with the events of evaporator EV-07 and door P-07', result: `Defrost 05:40–06:05 and door open 05:52–06:31: hypothesis for ${ROLE.refrigeration_maintenance}`, tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} readings · 6 events`, result: `Excursion confirmed: ${H.C.above} min above · peak ${H.fv(-13.9)}` } },
            { lane: 'traz', system: 'Mecalux Easy WMS', verb: 'Querying', action: `Lists the pallets located in C-07 between ${H.C.start} and ${H.C.end}, by lane`, result: `${a.count} pallets (${a.count} SSCC) in ${lots(a)} lanes`, ms: 2100, set: { volume: `${a.count} SSCC` } },
            { lane: 'traz', system: 'SAP', verb: 'Querying', action: 'Resolves lot, product and customer for each SSCC', result: `${lots(a)} lots · ${H.fmt.kg(a.qty)} · ${H.fmt.eur(a.value)} at standard cost`, ms: 2600, set: { volume: `${a.count} SSCC · ${lots(a)} lots` }, reveal: 'lots' },
            { lane: 'traz', system: 'MES Mapex', verb: 'Querying', action: `Confirms line, shift and production date of the ${lots(a)} lots`, result: '5 lots from Fustiñana (L1, L3, L4 and L5) and 1 from the Alfaro plant, transferred with TRF-26-3310', ms: 1900 },
            { lane: 'traz', system: 'Mecalux Easy WMS', verb: 'Querying', action: 'Looks for pallets of the same lots outside C-07', result: `${a.elseTotal} pallets in SIL-1, SIL-2, SIL-3 and SIL-4, to be assessed · ${H.goneTotal} already shipped before the alarm`, ms: 1700, reveal: 'map' },
            { lane: 'traz', system: 'SAP', verb: 'Querying', action: 'Checks the planned shipments for those pallets', result: `${a.holds.length} shipments; the first, ${H.first.id}, at ${H.first.time} from ${H.first.where}`, tone: 'warn', ms: 2200, set: { volume: `${a.count} SSCC · ${lots(a)} lots · ${a.holds.length} shipments`, result: `First affected shipment at ${H.first.time}` }, milestone: 'traz', audit: { action: 'Pallets and lots identified', detail: `${a.count} pallets (SSCC) of ${lots(a)} lots in C-07 · ${a.holds.length} planned shipments · ${a.elseTotal} pallets of the same lots in silos` } },
            { lane: 'blq', node: 'apr', system: 'Procedimientos', verb: 'Analysing', action: 'Applies PNT-CAL-012 and PNT-CAL-015 to this excursion', result: 'Hold the exposed pallets and assess the product lot by lot; only Quality releases', ms: 1300 },
            { lane: 'blq', node: 'apr', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the hold proposal and its rationale with the evidence', result: `Proposal: ${a.count} pallets of ${lots(a)} lots and ${a.holds.length} shipments retained; ${a.elseTotal} pallets in silos, to be assessed`, ms: 7000, set: { volume: `${a.count} pallets · ${a.holds.length} shipments` } },
            { lane: 'blq', node: 'apr', system: 'Agentic Platform', verb: 'Evaluating', action: `Requests approval from the ${H.W.approver} before writing to SAP QM and Easy WMS`, result: 'Awaiting the Quality decision', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Proposal sent to Quality' }, milestone: 'prop', audit: { action: 'Hold proposal sent for approval', detail: `${a.count} pallets of ${lots(a)} lots · approver: ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          const ships = sc.holds.map((h) => h.id).join(', ');
          return [
            { lane: 'blq', system: 'SAP QM', verb: 'Applying', action: `Records the quality hold on ${lots(sc)} lots in C-07`, result: `${ids.blq} · ${sc.count} pallets in "blocked" status`, tone: 'ok', ms: 2400, milestone: 'blq', audit: { action: 'Quality hold applied', detail: `${ids.blq} · SAP QM · ${sc.count} pallets of ${lots(sc)} lots` } },
            { lane: 'blq', system: 'Mecalux Easy WMS', verb: 'Applying', action: `Immobilises the ${sc.count} pallets and retains their shipments`, result: `${sc.count} SSCC immobilised · ${sc.holds.length} shipments retained, the first ${H.holdWhen(sc.holds[0]).includes('/') ? 'on' : 'at'} ${H.holdWhen(sc.holds[0])}`, tone: 'ok', ms: 2100, set: { result: `${ids.blq} applied · ${sc.holds.length} shipments retained` }, milestone: 'wms', audit: { action: 'Pallets immobilised and shipments retained', detail: `Mecalux Easy WMS · ${sc.count} SSCC · ${ships}` } },
            { lane: 'inc', system: 'Elara', verb: 'Applying', action: 'Opens the non-conformity with the curve, the events and the SSCC', result: `${ids.nc} opened${hasAnt(sc) ? ' · precedent RCL-2026-0204 linked' : ''}`, tone: 'ok', ms: 1900, set: { volume: '1 non-conformity' }, milestone: 'nc', audit: { action: 'Non-conformity opened', detail: `${ids.nc} · Elara · temperature excursion in C-07` } },
            { lane: 'inc', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the 8D (D1–D8) with owners by role', result: '8D draft ready for Quality review', ms: 7800, set: { volume: '1 non-conformity · 8D in draft' }, milestone: 'd8', audit: { action: '8D draft written', detail: `${ids.nc} · D1–D8 · pending Quality review` } },
            { lane: 'inc', system: 'Microsoft Teams', verb: 'Sending', action: `Notifies the ${ROLE.dispatch_shift} and ${ROLE.refrigeration_maintenance}`, result: `Notice posted in the "${TEAMS}" channel`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 non-conformity · 8D · 1 notice', result: `${ids.nc} opened · dispatch notified` }, milestone: 'teams', audit: { action: 'Notice sent via Microsoft Teams', detail: `${ROLE.dispatch_shift} and ${ROLE.refrigeration_maintenance} · "${TEAMS}" channel` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Pallets in C-07 during the excursion', value: H.all.count, sub: `${lots(H.all)} lots · ${H.fmt.kg(H.all.qty)}`, icon: 'pallet' },
        { label: 'First affected shipment', value: H.first.time, sub: `${H.first.id} · ${H.first.where} · ${H.pl(H.holdCount(H.all, H.first))}${held ? ' · retained' : ''}`, icon: 'truck' }
      ],
      scope: {
        icon: 'pallet',
        unit: ['pallet', 'pallets'],
        item_noun: ['lot', 'lots'],
        qty_unit: 'kg',
        per_square: 1,
        items: LOTS.map((l) => Object.assign({
          id: l.id, title: l.title, sub: l.sub, group: `Lane ${l.lane}`, group_short: `Lane ${l.lane}`,
          count: l.count, qty: l.count * l.kgpp, value: Math.round(l.count * l.kgpp * l.cost * 100) / 100, hold: l.hold
        }, ELSE[l.id] ? { elsewhere: ELSE[l.id] } : {}, GONE[l.id] ? { gone: GONE[l.id] } : {})),
        holds: {
          'EXP-26-41106': { date: '2026-09-29', time: '09:30', where: 'Bay 2', label: 'Foodservice distributor ES (central area)' },
          'EXP-26-41107': { date: '2026-09-29', time: '11:00', where: 'Bay 3', label: 'Spanish retail logistics platform' },
          'EXP-26-41109': { date: '2026-09-29', time: '14:00', where: 'Bay 4', label: 'EC Foods UK Ltd (EC subsidiary, United Kingdom)' },
          'EXP-26-41111': { date: '2026-09-29', time: '16:30', where: 'Bay 5', label: 'Importer France' },
          'EXP-26-41118': { date: '2026-09-30', time: '07:00', where: 'Bay 6', label: 'EC Frozen Foods LLC (EC subsidiary, USA)' }
        },
        units: UNITS,
        csv_name: 'sscc-c-07-excursion',
        csv_cols: [
          { label: 'Lot', key: 'item' },
          { label: 'Product', key: 'product' },
          { label: 'Pallet', key: 'pallet' },
          { label: 'SSCC', key: 'sscc', text: true },
          { label: 'Kg', key: 'kg' },
          { label: 'Location', key: 'position' },
          { label: 'Planned shipment', key: 'hold' }
        ],
        labels: {
          items_title: 'Affected lots and pallets',
          items_systems: 'Mecalux Easy WMS and SAP',
          items_where: 'pallets in C-07,',
          item_col: 'Lot',
          at_col: 'In C-07',
          group_col: 'Lane',
          hold_col: 'Planned shipment',
          else_col: 'Outside C-07',
          else_none: 'No stock',
          gone_verb: 'shipped',
          exposed: 'Exposed',
          blocked: 'On hold',
          unblocked: 'Not on hold',
          block_noun: 'hold',
          block_verb: 'Hold',
          hold_verb: 'Retain',
          held: 'Retained',
          holds_label: 'Planned shipments',
          holds_first: 'the first',
          scope_main: 'Pallets in C-07 during the excursion',
          else_scope: 'Same lots in silos',
          else_decision: 'To be assessed',
          map_title: 'Pallet locations',
          map_sub: 'Mecalux Easy WMS · Fustiñana',
          zone_title: 'C-07 · Dispatch cold room 7',
          zone_sub: '6 lanes · 240 slots',
          else_title: 'Same lots in automatic silos',
          else_sub: 'were not in C-07 · to be assessed',
          gone_title: 'Shipped before the alarm',
          legend_exposed: 'Exposed to the excursion',
          legend_else: 'To be assessed in silo',
          csv_button: 'Download SSCC (CSV)',
          value_label: 'at standard cost',
          report_scope: 'Scope of the hold'
        }
      },
      text: {
        proposal_title: 'hold proposal',
        stop_without: 'proposing a hold',
        activates: 'the hold',
        no_proposal: 'no hold proposal',
        idle_log: 'The run stops at the approval: nothing is written to SAP QM or Easy WMS without the Quality decision.',
        approve_action: 'Approves the hold',
        scope_short: (H) => `${H.pl(H.sc.count)} of ${H.fmt.plural(lots(H.sc), 'lot', 'lots')} and ${H.fmt.plural(H.sc.holds.length, 'shipment retained', 'shipments retained')}`,
        audit_approved: 'Hold approved',
        audit_approved_detail: (H) => `${H.ids.blq} · ${H.sc.count} pallets of ${lots(H.sc)} lots in C-07 · ${H.sc.holds.length} shipments retained${H.sc.out.length ? ` · scope edited (without ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Hold ${H.ids.blq} approved · ${H.sc.count} pallets`,
        audit_rejected: 'Hold rejected',
        outcome_rejected: 'Hold rejected · no actions applied',
        toast_done: (H) => `${H.ids.blq} applied · ${H.ids.nc} opened · notice sent via Teams`,
        presenter_applying: 'After approval: hold in SAP QM, immobilisation in Easy WMS, non-conformity in Elara and notice via Teams.',
        reject_nothing: 'no hold in SAP QM, no immobilisation in Easy WMS, no non-conformity in Elara and no notice via Teams',
        edit_intro: 'PNT-CAL-012 requires holding every exposed pallet.'
      },
      approval: {
        id: 'blq-c07',
        approve_label: 'Approve hold',
        policy: 'PNT-CAL-012 · PNT-CAL-015 · only Quality releases',
        title: (H) => `Quality hold · ${H.pl(H.sc.count)} in C-07`,
        summary: (H) => `Reason: air above ${H.fv(H.C.threshold)} for ${H.C.above} min (${H.span}), longer than the ${H.C.minutes} min set by ${H.W.backup ? 'PNT-CAL-012' : 'the workflow'}${H.critMin ? `, and ${H.critMin} min above ${H.fv(H.crit)}: critical excursion` : ''}. The exposed pallets are held until the product temperature is measured and a disposition is decided for each lot.`,
        extra_scope: () => [],
        effects: (H) => [
          `SAP QM: quality hold on ${lots(H.sc)} lots (${H.sc.count} pallets in C-07)`,
          `Mecalux Easy WMS: ${H.sc.count} pallets immobilised and ${H.sc.holds.length} shipments retained`,
          'Elara: non-conformity with an 8D draft',
          `Microsoft Teams: notice to the ${ROLE.dispatch_shift} and ${ROLE.refrigeration_maintenance}`
        ],
        applied: (H) => [
          `SAP QM: ${H.ids.blq} · ${lots(H.sc)} lots (${H.sc.count} pallets)`,
          `Mecalux Easy WMS: ${H.sc.count} pallets immobilised and ${H.sc.holds.length} shipments retained`,
          `Elara: ${H.ids.nc} with an 8D draft`,
          `Microsoft Teams: notice to the ${ROLE.dispatch_shift} and ${ROLE.refrigeration_maintenance}`
        ]
      },
      result: {
        title: (H) => `Hold ${H.ids.blq} applied and non-conformity ${H.ids.nc} opened`,
        stats: (H) => [
          { label: 'Pallets on hold', value: H.sc.count, tone: 'crit' },
          { label: 'Shipments retained', value: H.sc.holds.length },
          { label: 'Lots on hold', value: lots(H.sc) },
          { label: 'Pallets in silos to assess', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Hold ${H.ids.blq}`, systems: ['SAP QM', 'Mecalux Easy WMS'],
            kv: [
              ['Status', App.chip('blocked')],
              ['Scope', `${H.pl(H.sc.count)} · ${H.fmt.plural(lots(H.sc), 'lot', 'lots')} · ${H.fmt.kg(H.sc.qty)}`],
              ['Value at standard cost', H.fmt.eur(H.sc.value)],
              ['Shipments retained', H.sc.holds.map((h) => h.id).join(', ')],
              ['Released by', `${ROLE.quality_shift} (PNT-CAL-015)`]
            ],
            next: 'Next step under PNT-CAL-012: measure the product temperature with a probe on the exposed pallets, outer layer and core.',
            buttons: [{ action: 'csv', label: 'SSCC on hold (CSV)' }]
          },
          {
            icon: 'clipboard', title: `Non-conformity ${H.ids.nc}`, systems: ['Elara'], chip: ['draft', '8D in draft'],
            items: D8(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Download 8D draft (PDF)' }]
          },
          {
            icon: 'send', title: 'Notice to dispatch', systems: ['Microsoft Teams'], note: H.run.endAt ? `sent at ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              icon: 'message-square', from: 'Agentic Platform · Incidents agent', channel: `"${TEAMS}" channel`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: ROLE.dispatch_shift, text: `Quality hold ${H.ids.blq} in C-07, approved by the ${H.decision ? H.decision.by : H.W.approver}${H.decision ? ` at ${H.fmt.time(H.decision.at)}` : ''}. Do not load until Quality decides:` },
                { to: ROLE.refrigeration_maintenance, text: `Please check the closing of door P-07 and the EV-07 defrost (cause hypothesis). Details in ${H.ids.nc} (Elara).` }
              ],
              list: H.sc.holds.map((h) => `${h.id} · ${H.holdWhen(h)} · ${h.where} · ${H.pl(palsOf(H.sc, h))}`)
            }
          }
        ]
      },
      doc: {
        code: 'REG-CAL-020-02',
        lane: 'inc',
        heading: 'Disciplines D1–D8',
        col_d: 'D',
        title: (H) => `8D report · ${H.ids.nc}`,
        subtitle: 'Non-conformity for a temperature excursion in cold room C-07 · draft for review',
        filename: (H) => `8d-draft-${H.ids.nc}`,
        meta: (H) => [['Non-conformity', H.ids.nc], ['Related hold', H.ids.blq]],
        items: (H) => D8(H),
        reviewer: ROLE.quality_shift,
        approver: ROLE.quality_plant,
        note: 'Draft generated from the evidence of the run. Target dates are a proposal: the 8D team confirms them. The root cause is a hypothesis until Refrigeration Maintenance confirms it.'
      },
      report: {
        noun: 'incident report',
        code: 'REG-CAL-012-07',
        title: 'Incident report · cold room C-07',
        subtitle: 'Temperature excursion',
        filename: 'incident-report-c-07',
        site_label: 'Plant',
        site: 'Fustiñana (FUS)',
        description: (H) => `On 29/09/2026 at 05:50, SCADA Galileo raised alarm ALM-C07-0550 in cold room C-07 (Dispatch cold room 7, setpoint ${H.fv(-22)}). Air temperature (sensor TT-C07-01) was above ${H.fv(H.C.threshold)} for ${H.C.above} min (${H.span}), peaking at ${H.fv(-13.9)} at 06:25, with ${H.critMin} min above ${H.fv(H.crit)}. At 07:00 the room was at ${H.fv(-20.5)}. There were ${H.all.count} pallets of ${lots(H.all)} lots in the room.`,
        criteria: 'PNT-CAL-012 (hold the exposed pallets if the air exceeds −18 °C for more than 15 min) and PNT-CAL-015 (record the hold in SAP QM and Easy WMS; only Quality releases).',
        actions: (H) => [
          `SAP QM · ${H.ids.blq}: quality hold on ${lots(H.sc)} lots (${H.sc.count} pallets, ${H.fmt.kg(H.sc.qty)}; ${H.fmt.eur(H.sc.value)} at standard cost).`,
          `Mecalux Easy WMS: ${H.sc.count} SSCC immobilised; shipments retained: ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)}, ${h.where})`).join(', ')}.`,
          `Elara · ${H.ids.nc}: non-conformity opened with an 8D draft (REG-CAL-020-02).`,
          `Microsoft Teams: notice to the ${ROLE.dispatch_shift} and ${ROLE.refrigeration_maintenance} in the "${TEAMS}" channel.`
        ],
        pending: (H) => [
          'Measure the product temperature with a probe on the exposed pallets (outer layer and core).',
          'Sensory and visual check (ice crystals, clumping) per lot.',
          'Disposition decision per lot: release, downgrade or destroy.',
          `Release or disposition of each lot: only the ${ROLE.quality_shift} or the ${ROLE.quality_plant} (PNT-CAL-015).`
        ].concat(H && hasAnt(H.sc) ? ['Precedent in Elara: RCL-2026-0204 (15/07/2026), clumped product (ice blocks) at destination; cause: cold-chain break during the customer’s transport (NC-2026-0233, closed). Relevant to the disposition of L26-263-FUS-MAI-02.'] : []),
        reviewer: ROLE.quality_plant,
        final_step: 'Disposition of the lots',
        final_role: ROLE.quality_shift,
        note: 'Document subject to Quality review; it does not replace the product disposition decision.'
      },
      not_applied: (H) => [
        { sys: 'SAP QM', text: 'No quality hold' },
        { sys: 'Mecalux Easy WMS', text: `No pallet immobilised; the ${H.all.holds.length} shipments remain planned` },
        { sys: 'Elara', text: 'No non-conformity' },
        { sys: 'Microsoft Teams', text: 'No notice to dispatch' }
      ],
      compare: [
        { k: 'People involved', today: '3–4: Quality, dispatch, warehouse and refrigeration maintenance', now: 'Quality reviews and decides; dispatch and maintenance receive the notice with the data' },
        { k: 'Systems checked by hand', today: '5–6: Galileo, Easy WMS, SAP, SAP QM, Elara and email or phone', now: 'None: the agents query 7 systems and every data point is logged' },
        { k: 'Steps', today: '10–12 manual steps, with waits between people', steps: true },
        { k: 'Time to hold and NC', today: '1–3 h', measured: true },
        { k: 'Audit evidence', today: 'Scattered across emails, screenshots and spreadsheets', now: 'Report REG-CAL-012-07 and the audit log of the run' }
      ],
      presenter: {
        intro: () => 'Alarm at 05:50 in cold room C-07: peak of −13.9 °C at 06:25 and 50 min above −18 °C. The first affected shipment leaves at 09:30.',
        agents: 'Four agents, each with its own systems: Galileo for temperature; Easy WMS, SAP and Mapex for pallets, lots and shipments; SAP QM for the hold; Elara and Teams for the incident.',
        waiting: (H) => [
          `The ${H.sc.elseTotal} pallets of the same lots in silos stay "to be assessed": they were not in C-07. Nothing has been written to SAP QM or Easy WMS yet.`,
          'You can edit the scope (remove a lot, with a reason) or reject: if rejected, nothing is applied and it is recorded in the audit log.'
        ],
        rejected: ['Rejected: nothing has been held in SAP QM or Easy WMS, and there is no non-conformity or notice. The reason is recorded in the audit log.', 'The decision always belongs to Quality; the workflow can be run again at any time.'],
        done: (H) => [
          `Applied after approval: ${H.ids.blq} in SAP QM, ${H.sc.count} pallets immobilised and ${H.sc.holds.length} shipments retained in Easy WMS, ${H.ids.nc} in Elara with the 8D in draft and a notice via Teams.`,
          'The incident report comes out as a controlled document: code, revision, approvals and run log, ready for an IFS or BRCGS audit.'
        ],
        next: { done: 'Open "Download incident report" and then go to "Complaint UKC-44718" (right arrow).', no_trigger: 'Go to "From words to workflow", set 15 min and run it again.' }
      }
    }
  });

  /* 8D draft (D1–D8) written by the Incidents agent. */
  function D8(H) {
    const sc = H.sc;
    const ant = hasAnt(sc)
      ? ' Precedent in Elara: RCL-2026-0204 (15/07/2026), sweet corn 450 g for EC Frozen Foods LLC (EC subsidiary, USA): clumped product (ice blocks) at destination due to a cold-chain break during the customer’s transport (NC-2026-0233, closed); take it into account when deciding the disposition of L26-263-FUS-MAI-02.'
      : '';
    return [
      { d: 'D1', t: 'Team', text: `Lead: ${ROLE.quality_shift}. Team: ${ROLE.dispatch_shift}, ${ROLE.refrigeration_maintenance} and ${ROLE.quality_plant}.`, owner: ROLE.quality_shift, due: '2026-09-29' },
      { d: 'D2', t: 'Problem description', text: `On 29/09/2026 the air in cold room C-07 exceeded ${H.fv(-18)} for 50 min (05:50–06:40), peaking at ${H.fv(-13.9)} at 06:25, with 20 min above ${H.fv(-15)}. There were ${H.all.count} pallets of ${lots(H.all)} lots in the room.${ant}`, owner: ROLE.quality_shift, due: '2026-09-29' },
      { d: 'D3', t: 'Containment', text: `${H.ids.blq}: ${sc.count} pallets held in SAP QM and immobilised in Easy WMS; ${sc.holds.length} shipments retained. Measure the product temperature with a probe (outer layer and core) on the exposed pallets.${sc.elseTotal ? ` Assess the ${sc.elseTotal} pallets of the same lots in silos, which were not in C-07.` : ''}`, owner: ROLE.quality_shift, due: '2026-09-29' },
      { d: 'D4', t: 'Root cause (hypothesis)', text: 'Hypothesis to be confirmed by Refrigeration Maintenance: the EV-07 defrost (05:40–06:05) overlapped with a closing failure of fast door P-07 (door-open sensor 05:52–06:31).', owner: ROLE.refrigeration_maintenance, due: '2026-10-01' },
      { d: 'D5', t: 'Proposed corrective actions', text: 'Check the closing of fast door P-07 and its sensor; review the EV-07 defrost schedule against dock activity; consider a door-open alert in Galileo.', owner: ROLE.refrigeration_maintenance, due: '2026-10-06' },
      { d: 'D6', t: 'Implementation and verification', text: 'Verify the closing of P-07 and the temperature recovery in the next defrost cycle. Disposition per lot under PNT-CAL-012: release, downgrade or destroy.', owner: ROLE.quality_plant, due: '2026-10-09' },
      { d: 'D7', t: 'Prevention', text: 'Extend the door and defrost review to the other dispatch cold rooms in Fustiñana and update the defrost work instruction if needed.', owner: ROLE.quality_plant, due: '2026-10-16' },
      { d: 'D8', t: 'Closure', text: `Close ${H.ids.nc} after verifying effectiveness and record the disposition of the ${lots(sc)} lots.`, owner: ROLE.quality_plant, due: '2026-10-30' }
    ];
  }
})();
