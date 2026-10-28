/* Norel Nutrición Animal · alarm with approval: Salmonella-positive raw material MP-2610-CC-118 (choline chloride 60 %).
 * Demo scenario with synthetic data (MFM). The functions receive the scene context H
 * (W workflow, C evaluated condition, sc current scope, ids generated on approval, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Salmonella amplification signal (real-time PCR, assay LAB-2610-0933) in LIMS, one reading every 5 min from 05:00 to 07:00. */
  const RFU = [21, 20, 22, 21, 23, 22, 24, 31, 48, 77, 118, 172, 231, 286, 341, 392, 431, 458, 471, 468, 474, 470, 472, 469, 471];
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = RFU.map((v, i) => ({ time: hhmm(300 + i * 5), value: v }));

  /* Premix lots made with MP-2610-CC-118 with pallets still in the finished-goods warehouse (by aisle): 31 pallets of 1,000 kg. */
  const LOTS = [
    { id: 'PRM-2610-0417', title: 'Swine vitamin premix', sub: 'Fattening pigs · 27 pallets made', lane: 1, count: 8, first: 20, of: 27, code: '0417', kgpp: 1000, cost: 2.6, hold: 'EXP-26-5201' },
    { id: 'PRM-2610-0418', title: 'Poultry trace-element premix', sub: 'Broilers · 20 pallets made', lane: 2, count: 7, first: 14, of: 20, code: '0418', kgpp: 1000, cost: 2.9, hold: 'EXP-26-5202' },
    { id: 'PRM-2610-0421', title: 'Ruminant vitamin-mineral core', sub: 'Dairy cattle · 26 pallets made', lane: 3, count: 9, first: 18, of: 26, code: '0421', kgpp: 1000, cost: 2.2, hold: 'EXP-26-5203' },
    { id: 'PRM-2610-0425', title: 'Aquaculture premix', sub: 'Aquaculture · 23 pallets made', lane: 4, count: 7, first: 17, of: 23, code: '0425', kgpp: 1000, cost: 3.1, hold: 'EXP-26-5204' }
  ];
  /* Stock of the same origin outside the finished-goods warehouse (to be assessed) and pallets already shipped to the 9 customers: 65 pallets. */
  const ELSE = {
    'PRM-2610-0417': [{ loc: 'ALM-MP', count: 6, note: 'Choline chloride MP-2610-CC-118 not yet consumed in the raw-materials warehouse' }],
    'PRM-2610-0421': [{ loc: 'BAGGING-2', count: 3, note: 'Premix of the lot in the bagging hopper, not yet palletised' }]
  };
  const GONE = {
    'PRM-2610-0417': [
      { id: 'ALB-26-7312', date: '2026-10-23', time: '09:10', count: 8, to: 'Piensos del Ebro, S.A. (Spain)' },
      { id: 'ALB-26-7318', date: '2026-10-24', time: '11:30', count: 6, to: 'Nutrición Castellana, S.L. (Spain)' },
      { id: 'ALB-26-7335', date: '2026-10-26', time: '08:45', count: 5, to: 'Ração Lusitana, Lda. (Portugal)' }
    ],
    'PRM-2610-0418': [
      { id: 'ALB-26-7321', date: '2026-10-24', time: '14:20', count: 7, to: 'Cooperativa Agropienso del Sur (Spain)' },
      { id: 'ALB-26-7340', date: '2026-10-26', time: '16:05', count: 6, to: 'Piensos Galaico, S.A. (Spain)' }
    ],
    'PRM-2610-0421': [
      { id: 'ALB-26-7329', date: '2026-10-25', time: '10:15', count: 9, to: 'Compostos do Tejo, S.A. (Portugal)' },
      { id: 'ALB-26-7344', date: '2026-10-27', time: '07:50', count: 8, to: 'Nutri Maghreb, SARL (Morocco)' }
    ],
    'PRM-2610-0425': [
      { id: 'ALB-26-7338', date: '2026-10-26', time: '12:40', count: 9, to: 'Agropienso Manchego, S.L. (Spain)' },
      { id: 'ALB-26-7351', date: '2026-10-27', time: '15:25', count: 7, to: 'Aliments Atlas, SARL (Morocco)' }
    ]
  };
  /* Identifier of each pallet in the warehouse: PAL-2610-<lot>-<n>. */
  const UNITS = [];
  LOTS.forEach((l) => {
    for (let k = 0; k < l.count; k += 1) {
      const n = l.first + k;
      UNITS.push({ item: l.id, product: l.title, pallet: `${n}/${l.of}`, sscc: `PAL-2610-${l.code}-${String(n).padStart(2, '0')}`, kg: l.kgpp, position: `FG warehouse · aisle ${l.lane} · slot ${k + 1}`, hold: l.hold });
    }
  });

  const ROLE = {
    qa_shift: 'Quality and Food Safety Manager', plant_shift: 'Plant Manager', lab_shift: 'Laboratory Manager',
    solutions: 'Norel Solutions', customer_care: 'Customer Care and Orders', regulatory: 'Regulatory Affairs Manager',
    logistics: 'Logistics and Export Manager', decider: 'Operations and Quality Manager'
  };
  const TEAMS = 'Quality and shipping · Premix plant';
  const ANT_LOT = 'PRM-2610-0421';
  const lots = (sc) => sc.items.length;
  const hasAnt = (sc) => sc.items.some((l) => l.id === ANT_LOT);
  const palsOf = (sc, h) => sc.items.filter((l) => l.hold === h.id).reduce((s, l) => s + l.count, 0);

  agenticPackEn('norel', {
    alarma: {
      nav: 'Salmonella alarm',
      title: 'Salmonella alarm in progress',
      icon: 'flask',
      page_title: 'MP-2610-CC-118 · Salmonella positive',
      alarm_id: 'ALM-LIMS-0550',
      alarm_time: '05:50',
      source_system: 'LIMS',
      asset: 'raw material MP-2610-CC-118',
      location: 'Premix plant (Spain) · Quality control laboratory',
      excursion_noun: 'positive',
      workflow_topic: 'raw-material food safety',
      policy_ref: 'PR-CAL-004',
      procedures: 'PR-CAL-004 · PR-CAL-007',
      decider_short: 'Quality and Food Safety',
      decider_of: 'of Quality and Food Safety',
      approval_node: 'Quality approval',
      measure: { short: 'Salmonella signal (PCR)', col: 'Signal', unit: 'RFU', dec: 0, icon: 'flask' },
      setpoint: 20,
      setpoint_label: 'baseline',
      limit: 100,
      critical: 300,
      min_minutes: 15,
      interval_min: 5,
      series: SERIES,
      peak: 474,
      peak_time: '06:40',
      current: 471,
      current_time: '07:00',
      current_note: 'still above the limit: positive confirmed',
      chart: {
        title: 'MP-2610-CC-118 · Salmonella amplification signal',
        sub: 'Baseline 20 RFU · now 471 RFU (07:00)',
        tab: 'Signal',
        series_label: 'PCR signal (LIMS · LAB-2610-0933)',
        yTicks: [0, 100, 200, 300, 400, 500],
        xTicks: ['05:00', '05:30', '06:00', '06:30', '07:00']
      },
      event_kv: [
        ['Raw material', 'MP-2610-CC-118 · choline chloride 60 % · supplier Agroquímica Delta · received 21/10'],
        ['Assay', 'LAB-2610-0933 · real-time PCR for Salmonella · reading every 5 min'],
        ['Production', '4 premix lots (PRM-2610-0417, 0418, 0421 and 0425) · 96 t'],
        ['Plant', 'Norel Nutrición Animal · Premix plant (Spain)']
      ],
      events: [
        { time: '05:20', end: '05:35', text: 'Preparation of the confirmation assay for the MP-2610-CC-118 sample', equipment: 'LIMS', tone: 'brand' },
        { time: '05:35', end: '05:50', text: 'Real-time PCR amplification of the sample (assay LAB-2610-0933)', equipment: 'Thermal cycler', tone: 'brand', band: 'PCR amplification' },
        { time: '05:50', text: 'LIMS alarm: Salmonella signal above 100 RFU in MP-2610-CC-118', ref: 'ALM-LIMS-0550', tone: 'crit' },
        { time: '05:55', end: '06:25', text: 'The retained counter-sample of the same lot confirms the Salmonella positive', equipment: 'Counter-sample', tone: 'warn', band: 'Counter-sample confirmation', bandTone: 'warn' },
        { time: '06:25', text: 'The Plant Manager suspends loading of shipments from the finished-goods warehouse', equipment: 'Shipping', tone: 'warn' },
        { time: '06:40', text: 'The signal stabilises around 470 RFU: positive confirmed', tone: 'crit' }
      ],
      probable_cause: 'Hypothesis to be confirmed by the Laboratory Manager: the choline chloride lot MP-2610-CC-118, received on 21/10 from Agroquímica Delta, arrived contaminated with Salmonella; the receiving sampling (PR-CAL-004) did not detect it.',
      backup: { id: 'wf-salmonella-respaldo', name: 'Salmonella positive in raw material', version: 'v1', threshold: 100, minutes: 15, critical: 300, approver: ROLE.qa_shift },
      untouched: 'SAP S/4HANA, the plant MES, Outlook or Microsoft Teams',
      apply_systems: 'SAP S/4HANA, the plant MES, Microsoft Teams and Outlook',
      llm_cost_usd: 0.04,
      ids: [
        { key: 'blq', prefix: 'BLQ-2026-', start: 1203, label: 'Block' },
        { key: 'nc', prefix: 'NC-2026-', start: 612, label: 'Nonconformity' }
      ],
      block_id_key: 'blq',
      proposer: 'blq',
      lanes: [
        { id: 'mon', name: 'Laboratory monitor', short: 'Monitor', icon: 'flask', systems: ['LIMS'], idle: 'Confirms the positive with the LIMS readings', gsub: 'confirms the positive', gsys: ['LIMS'] },
        { id: 'traz', name: 'Traceability', icon: 'git-branch', systems: ['SAP S/4HANA', 'Plant MES', 'LIMS'], idle: 'Locates premix lots, pallets and shipments', gsub: 'lots, pallets and shipments', gsys: ['SAP', 'MES', 'LIMS'] },
        { id: 'blq', phase: 2, name: 'Quality and logistics', icon: 'lock', systems: ['SAP S/4HANA', 'Plant MES'], idle: 'Prepares the block and the shipment hold and requests Quality approval', gsub: 'blocks and holds', gsys: ['SAP', 'MES'] },
        { id: 'inc', phase: 2, name: 'Incidents and customers', icon: 'clipboard', systems: ['SAP S/4HANA', 'Microsoft Teams', 'Outlook'], idle: 'Opens the nonconformity and prepares the customer notice', gsub: 'NC, 8D and notice', gsys: ['SAP', 'Teams', 'Outlook'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'LIMS', verb: 'Querying', action: 'Reads the Salmonella amplification signal of assay LAB-2610-0933 from 05:00 to 07:00, one reading every 5 min', result: `${SERIES.length} readings, no gaps · now ${H.fv(471)} (07:00)`, ms: 1850, set: { volume: `${SERIES.length} signal readings` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'LIMS', verb: 'Querying', action: 'Cross-checks the positive with the counter-sample and with the history of the supplier Agroquímica Delta', result: `Counter-sample positive (05:55–06:25) and lot received on 21/10: hypothesis for the ${ROLE.lab_shift}`, tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} readings · 6 events`, result: `Positive confirmed: ${H.C.above} min above · peak ${H.fv(474)}` } },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Querying', action: 'Locates the premix lots made with MP-2610-CC-118, forwards', result: `${lots(a)} premix lots · 96 t produced`, ms: 2100, set: { volume: `${lots(a)} lots · 96 t` } },
            { lane: 'traz', system: 'Plant MES', verb: 'Querying', action: 'Resolves the production orders, the raw-material consumption and the pallets of each lot', result: `${lots(a)} lots · ${a.count} pallets in the warehouse (${H.fmt.kg(a.qty)}) · ${H.fmt.eur(a.value)} at standard cost`, ms: 2600, set: { volume: `${lots(a)} lots · ${a.count} pallets in warehouse` }, reveal: 'lots' },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Querying', action: `Counts the shipments of the ${lots(a)} lots: ${a.count} pallets in the warehouse and ${H.goneTotal} pallets already shipped`, result: `96 t = ${a.count} t in the finished-goods warehouse + ${H.goneTotal} t shipped to 9 customers in Spain, Portugal and Morocco`, ms: 1900 },
            { lane: 'traz', system: 'Plant MES', verb: 'Querying', action: 'Looks for stock of the same origin outside the finished-goods warehouse', result: `${a.elseTotal} pallets between the raw-materials warehouse and the bagging line, to be assessed · ${H.goneTotal} pallets already shipped before the alarm`, ms: 1700, reveal: 'map' },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Querying', action: 'Checks the planned shipments of those pallets', result: `${a.holds.length} planned shipments; the first, ${H.first.id}, at ${H.first.time} at ${H.first.where}`, tone: 'warn', ms: 2200, set: { volume: `${a.count} pallets · ${lots(a)} lots · ${a.holds.length} shipments`, result: `First affected shipment at ${H.first.time}` }, milestone: 'traz', audit: { action: 'Lots and pallets identified', detail: `${a.count} pallets of ${lots(a)} premix lots in the warehouse · ${a.holds.length} planned shipments · ${H.goneTotal} pallets already shipped to 9 customers · ${a.elseTotal} pallets of the same origin outside the warehouse` } },
            { lane: 'blq', node: 'apr', system: 'Procedimientos', verb: 'Analysing', action: 'Applies PR-CAL-004 and PR-CAL-007 to this positive', result: 'Block the raw-material lot and the premix lots, hold the shipments and notify customers; only Quality and Food Safety releases', ms: 1300 },
            { lane: 'blq', node: 'apr', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the block proposal and its rationale with the evidence', result: `Proposal: ${a.count} pallets of ${lots(a)} lots blocked and ${a.holds.length} shipments held; ${a.elseTotal} pallets outside the warehouse, to be assessed`, ms: 7000, set: { volume: `${a.count} pallets · ${a.holds.length} shipments` } },
            { lane: 'blq', node: 'apr', system: 'Agentic Platform', verb: 'Evaluating', action: `Requests approval from the ${H.W.approver} before writing to SAP S/4HANA and the plant MES`, result: 'Awaiting the Quality and Food Safety decision', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Proposal sent to Quality' }, milestone: 'prop', audit: { action: 'Block proposal sent for approval', detail: `${a.count} pallets of ${lots(a)} lots · approver ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          const ships = sc.holds.map((h) => h.id).join(', ');
          return [
            { lane: 'blq', system: 'SAP S/4HANA', verb: 'Applying', action: `Records the quality block (SAP QM) of MP-2610-CC-118 and of ${lots(sc)} premix lots`, result: `${ids.blq} · ${sc.count} pallets in "blocked" status`, tone: 'ok', ms: 2400, milestone: 'blq', audit: { action: 'Block applied', detail: `${ids.blq} · SAP S/4HANA · MP-2610-CC-118 and ${sc.count} pallets of ${lots(sc)} lots` } },
            { lane: 'blq', system: 'Plant MES', verb: 'Applying', action: `Immobilises the ${sc.count} pallets and holds their ${sc.holds.length} shipments`, result: `${sc.count} pallets immobilised · ${sc.holds.length} shipments held, the first ${H.holdWhen(sc.holds[0]).includes('/') ? 'on' : 'at'} ${H.holdWhen(sc.holds[0])}`, tone: 'ok', ms: 2100, set: { result: `${ids.blq} applied · ${sc.holds.length} shipments held` }, milestone: 'wms', audit: { action: 'Pallets immobilised and shipments held', detail: `Plant MES · ${sc.count} pallets · ${ships}` } },
            { lane: 'inc', system: 'SAP S/4HANA', verb: 'Applying', action: 'Opens the nonconformity with the LIMS result, the traceability and the 9 exposed customers', result: `${ids.nc} opened${hasAnt(sc) ? ' · precedent NC-2026-0398 linked' : ''}`, tone: 'ok', ms: 1900, set: { volume: '1 nonconformity' }, milestone: 'nc', audit: { action: 'Nonconformity opened', detail: `${ids.nc} · SAP S/4HANA · Salmonella in MP-2610-CC-118` } },
            { lane: 'inc', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the 8D (D1–D8) with owners by role and the notice to the 9 customers', result: '8D and customer notice drafts ready for Quality review', ms: 7800, set: { volume: '1 nonconformity · 8D in draft' }, milestone: 'd8', audit: { action: '8D draft written', detail: `${ids.nc} · D1–D8 · pending Quality review` } },
            { lane: 'inc', system: 'Microsoft Teams', verb: 'Sending', action: `Notifies the ${ROLE.plant_shift}, the ${ROLE.logistics} and ${ROLE.customer_care}`, result: `Notice posted in the "${TEAMS}" channel`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 nonconformity · 8D · 1 notice', result: `${ids.nc} opened · plant and logistics notified` }, milestone: 'teams', audit: { action: 'Notice sent via Teams', detail: `${ROLE.plant_shift}, ${ROLE.logistics} and ${ROLE.customer_care} · channel "${TEAMS}"` } },
            { lane: 'inc', system: 'Outlook', verb: 'Preparing', action: `Saves the notice to the 9 exposed customers as drafts, for ${ROLE.solutions} to review and ${ROLE.customer_care} to send`, result: '9 notice drafts in Outlook, not sent', tone: 'ok', ms: 1200, audit: { action: 'Customer notices in draft', detail: `${ids.nc} · 9 customers · pending review by ${ROLE.solutions}` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Premix pallets in the warehouse', value: H.all.count, sub: `${lots(H.all)} lots · ${H.fmt.kg(H.all.qty)} · already shipped: ${H.goneTotal} pallets to 9 customers`, icon: 'pallet' },
        { label: 'First affected shipment', value: H.first.time, sub: `${H.first.id} · ${H.first.where} · ${H.pl(H.holdCount(H.all, H.first))}${held ? ' · held' : ''}`, icon: 'truck' }
      ],
      scope: {
        icon: 'pallet',
        unit: ['pallet', 'pallets'],
        item_noun: ['lot', 'lots'],
        qty_unit: 'kg',
        per_square: 1,
        items: LOTS.map((l) => Object.assign({
          id: l.id, title: l.title, sub: l.sub, group: `Aisle ${l.lane}`, group_short: `Aisle ${l.lane}`,
          count: l.count, qty: l.count * l.kgpp, value: Math.round(l.count * l.kgpp * l.cost * 100) / 100, hold: l.hold
        }, ELSE[l.id] ? { elsewhere: ELSE[l.id] } : {}, GONE[l.id] ? { gone: GONE[l.id] } : {})),
        holds: {
          'EXP-26-5201': { date: '2026-10-28', time: '10:00', where: 'Dock 2', label: 'Piensos del Ebro, S.A. (Spain)' },
          'EXP-26-5202': { date: '2026-10-28', time: '12:30', where: 'Dock 3', label: 'Cooperativa Agropienso del Sur (Spain)' },
          'EXP-26-5203': { date: '2026-10-28', time: '15:00', where: 'Dock 4', label: 'Ração Lusitana, Lda. (Portugal)' },
          'EXP-26-5204': { date: '2026-10-29', time: '07:30', where: 'Dock 5', label: 'Nutri Maghreb, SARL (Morocco) · export' }
        },
        units: UNITS,
        csv_name: 'premix-pallets-salmonella',
        csv_cols: [
          { label: 'Lot', key: 'item' },
          { label: 'Product', key: 'product' },
          { label: 'Pallet', key: 'pallet' },
          { label: 'Pallet ID', key: 'sscc', text: true },
          { label: 'Kg', key: 'kg' },
          { label: 'Location', key: 'position' },
          { label: 'Planned shipment', key: 'hold' }
        ],
        labels: {
          items_title: 'Affected premix lots and pallets',
          items_systems: 'SAP S/4HANA and plant MES',
          items_where: 'pallets in the finished-goods warehouse,',
          item_col: 'Lot',
          at_col: 'In warehouse',
          group_col: 'Aisle',
          hold_col: 'Planned shipment',
          else_col: 'Outside FG warehouse',
          else_none: 'No stock',
          gone_verb: 'shipped',
          exposed: 'Exposed',
          blocked: 'Blocked',
          unblocked: 'Not blocked',
          block_noun: 'block',
          block_verb: 'Block',
          hold_verb: 'Hold',
          held: 'Held',
          holds_label: 'Planned shipments',
          holds_first: 'the first',
          scope_main: 'Premix pallets in the finished-goods warehouse',
          else_scope: 'Same origin outside the finished-goods warehouse',
          else_decision: 'To be assessed',
          map_title: 'Pallet locations',
          map_sub: 'Plant MES · Premix plant (Spain)',
          zone_title: 'Finished-goods warehouse',
          zone_sub: '4 aisles · 120 slots',
          else_title: 'Same origin outside the FG warehouse',
          else_sub: 'raw material and bagging · to be assessed',
          gone_title: 'Shipped to customers before the alarm',
          legend_exposed: 'Exposed to the positive',
          legend_else: 'To be assessed outside the warehouse',
          csv_button: 'Download pallets (CSV)',
          value_label: 'at standard cost',
          report_scope: 'Scope of the block'
        }
      },
      text: {
        proposal_title: 'block proposal',
        stop_without: 'proposing the block',
        activates: 'the block',
        no_proposal: 'no block proposal',
        idle_log: 'The run stops at the approval: nothing is written to SAP S/4HANA or the plant MES without the Quality and Food Safety decision.',
        approve_action: 'Approves the block',
        scope_short: (H) => `${H.pl(H.sc.count)} of ${H.fmt.plural(lots(H.sc), 'lot', 'lots')} and ${H.fmt.plural(H.sc.holds.length, 'shipment held', 'shipments held')}`,
        audit_approved: 'Block approved',
        audit_approved_detail: (H) => `${H.ids.blq} · ${H.sc.count} pallets of ${lots(H.sc)} premix lots · ${H.sc.holds.length} shipments held${H.sc.out.length ? ` · scope edited (without ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Block ${H.ids.blq} approved · ${H.sc.count} pallets`,
        audit_rejected: 'Block rejected',
        outcome_rejected: 'Block rejected · no actions applied',
        toast_done: (H) => `${H.ids.blq} applied · ${H.ids.nc} opened · notice sent via Teams`,
        presenter_applying: 'After approval: block in SAP S/4HANA, pallets immobilised in the MES, nonconformity, notice via Teams and customer notice drafts in Outlook.',
        reject_nothing: 'no block in SAP S/4HANA, no pallets immobilised in the MES, no nonconformity, no notice via Teams and no customer drafts',
        edit_intro: 'PR-CAL-007 requires blocking every lot made with the positive raw material.'
      },
      approval: {
        id: 'blq-mp-cc-118',
        approve_label: 'Approve block',
        policy: 'PR-CAL-004 · PR-CAL-007 · only Quality and Food Safety releases',
        title: (H) => `Quality block · ${H.pl(H.sc.count)} of premix with MP-2610-CC-118`,
        summary: (H) => `Reason: Salmonella signal above ${H.fv(H.C.threshold)} for ${H.C.above} min (${H.span}), longer than the ${H.C.minutes} min set by ${H.W.backup ? 'PR-CAL-004' : 'the workflow'}${H.critMin ? `, and ${H.critMin} min above ${H.fv(H.crit)}: critical positive` : ''}. The raw-material lot and the premix pallets in the warehouse are blocked, shipments are held and the notice to the 9 customers who already received product is prepared, until the fate of each lot is decided.`,
        extra_scope: () => [],
        effects: (H) => [
          `SAP S/4HANA: quality block of MP-2610-CC-118 and of ${lots(H.sc)} premix lots (${H.sc.count} pallets in the warehouse)`,
          `Plant MES: ${H.sc.count} pallets immobilised and ${H.sc.holds.length} shipments held`,
          'SAP S/4HANA: nonconformity with an 8D draft',
          `Microsoft Teams: notice to the ${ROLE.plant_shift}, the ${ROLE.logistics} and ${ROLE.customer_care}`,
          'Outlook: 9 customer notice drafts, not sent'
        ],
        applied: (H) => [
          `SAP S/4HANA: ${H.ids.blq} · ${lots(H.sc)} lots (${H.sc.count} pallets)`,
          `Plant MES: ${H.sc.count} pallets immobilised and ${H.sc.holds.length} shipments held`,
          `SAP S/4HANA: ${H.ids.nc} with an 8D draft`,
          `Microsoft Teams: notice to the ${ROLE.plant_shift}, the ${ROLE.logistics} and ${ROLE.customer_care}`,
          'Outlook: 9 customer notice drafts, not sent'
        ]
      },
      result: {
        title: (H) => `Block ${H.ids.blq} applied and nonconformity ${H.ids.nc} opened`,
        stats: (H) => [
          { label: 'Pallets blocked', value: H.sc.count, tone: 'crit' },
          { label: 'Shipments held', value: H.sc.holds.length },
          { label: 'Pallets already shipped to 9 customers', value: H.goneTotal, tone: 'crit' },
          { label: 'Pallets outside the warehouse to assess', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Block ${H.ids.blq}`, systems: ['SAP S/4HANA', 'Plant MES'],
            kv: [
              ['Status', App.chip('blocked')],
              ['Scope', `${H.pl(H.sc.count)} · ${H.fmt.plural(lots(H.sc), 'lot', 'lots')} · ${H.fmt.kg(H.sc.qty)}`],
              ['Value at standard cost', H.fmt.eur(H.sc.value)],
              ['Shipments held', H.sc.holds.map((h) => h.id).join(', ')],
              ['Released by', `${ROLE.qa_shift} (PR-CAL-007)`]
            ],
            next: 'Next step per PR-CAL-007: assess the recall of the 65 pallets already shipped to 9 customers (campaign RET-2026-1028) and, with Regulatory Affairs, the notification to the competent authority (Regulation (EC) 178/2002, art. 19).',
            buttons: [{ action: 'csv', label: 'Blocked pallets (CSV)' }]
          },
          {
            icon: 'clipboard', title: `Nonconformity ${H.ids.nc}`, systems: ['SAP S/4HANA'], chip: ['draft', '8D in draft'],
            items: D8(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Download 8D draft (PDF)' }]
          },
          {
            icon: 'send', title: 'Notice to plant and logistics', systems: ['Microsoft Teams'], note: H.run.endAt ? `sent at ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              icon: 'message-square', from: 'Agentic Platform · Incidents agent', channel: `channel "${TEAMS}"`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: ROLE.plant_shift, text: `Quality block ${H.ids.blq} of MP-2610-CC-118 and its premix lots, approved by ${H.decision ? H.decision.by : H.W.approver}${H.decision ? ` at ${H.fmt.time(H.decision.at)}` : ''}. Do not load or ship until Quality decides otherwise:` },
                { to: ROLE.logistics, text: `Hold the listed shipments and locate the 65 pallets already delivered to 9 customers in Spain, Portugal and Morocco. ${ROLE.customer_care} and ${ROLE.solutions} are preparing the customer notice. Details in ${H.ids.nc} (SAP S/4HANA).` }
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
        subtitle: 'Nonconformity for Salmonella in raw material MP-2610-CC-118 · draft for review',
        filename: (H) => `8d-draft-${H.ids.nc}`,
        meta: (H) => [['Nonconformity', H.ids.nc], ['Linked block', H.ids.blq]],
        items: (H) => D8(H),
        reviewer: ROLE.qa_shift,
        approver: ROLE.decider,
        note: 'Draft generated from the run evidence. The target dates are a proposal: the 8D team confirms them. The root cause is a hypothesis until the Laboratory Manager confirms it.'
      },
      report: {
        noun: 'incident report',
        code: 'REG-CAL-012-07',
        title: 'Incident report · MP-2610-CC-118',
        subtitle: 'Salmonella positive in raw material',
        filename: 'incident-report-mp-2610-cc-118',
        site_label: 'Plant',
        site: 'Premix plant (Spain)',
        description: (H) => `On 28/10/2026 at 05:50, LIMS raised alarm ALM-LIMS-0550 for a Salmonella-positive result in a sample of raw material MP-2610-CC-118 (choline chloride 60 %, supplier Agroquímica Delta, received 21/10; assay LAB-2610-0933, baseline ${H.fv(20)}). The signal was ${H.C.above} min above ${H.fv(H.C.threshold)} (${H.span}), with a peak of ${H.fv(474)} at 06:40 and ${H.critMin} min above ${H.fv(H.crit)}. At 07:00 the signal was ${H.fv(471)}. The raw material was used in 4 premix lots (96 t): ${H.all.count} t remain in the finished-goods warehouse and ${H.goneTotal} t were shipped to 9 customers.`,
        criteria: 'PR-CAL-004 (sampling and control of Salmonella in raw materials: a positive blocks the lot) and PR-CAL-007 (lot recall and traceability; only Quality and Food Safety releases).',
        actions: (H) => [
          `SAP S/4HANA · ${H.ids.blq}: quality block of MP-2610-CC-118 and of ${lots(H.sc)} premix lots (${H.sc.count} pallets, ${H.fmt.kg(H.sc.qty)}; ${H.fmt.eur(H.sc.value)} at standard cost).`,
          `Plant MES: ${H.sc.count} pallets immobilised; shipments held: ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)}, ${h.where})`).join(', ')}.`,
          `SAP S/4HANA · ${H.ids.nc}: nonconformity opened with an 8D draft (REG-CAL-020-02).`,
          `Microsoft Teams: notice to the ${ROLE.plant_shift}, the ${ROLE.logistics} and ${ROLE.customer_care} in the "${TEAMS}" channel.`,
          'Outlook: 9 notice drafts for the customers who already received product, not sent.'
        ],
        pending: (H) => [
          'Confirm the result with the reference laboratory and the retained counter-sample (Laboratory Manager).',
          `Assess with the ${ROLE.regulatory} the notification to the competent authority (Regulation (EC) 178/2002, art. 19).`,
          'Assess the recall of the 65 pallets shipped to 9 customers (campaign RET-2026-1028) and the claim against the supplier Agroquímica Delta.',
          `Notice to each exposed customer: ${ROLE.customer_care} with ${ROLE.solutions}.`
        ].concat(H && hasAnt(H.sc) ? ['Precedent in SAP S/4HANA: NC-2026-0398 (14/08/2026), Enterobacteriaceae finding in a choline chloride lot from the same supplier (closed). Relevant for deciding the fate of PRM-2610-0421 and the qualification of Agroquímica Delta.'] : []),
        reviewer: ROLE.decider,
        final_step: 'Fate of the lots',
        final_role: ROLE.qa_shift,
        note: 'Document subject to Quality and Food Safety review; it does not replace the decision on the fate of the product or the notification to the authority.'
      },
      not_applied: (H) => [
        { sys: 'SAP S/4HANA', text: 'No quality block and no nonconformity' },
        { sys: 'Plant MES', text: `No pallet immobilised; the ${H.all.holds.length} shipments remain planned` },
        { sys: 'Microsoft Teams', text: 'No notice to plant and logistics' },
        { sys: 'Outlook', text: 'No customer notice drafts' }
      ],
      compare: [
        { k: 'People involved', today: '4–5: laboratory, quality, plant, logistics and customer care', now: 'Quality and Food Safety reviews and decides; plant, logistics and customers receive the notice with the data' },
        { k: 'Systems queried by hand', today: '5–6: LIMS, SAP, MES, delivery-note spreadsheets, email and phone', now: 'None: the agents query 3 systems and every data point is kept in the log' },
        { k: 'Steps', today: '12–15 manual steps, with waits between people', steps: true },
        { k: 'Time to block and NC', today: '2–4 h', measured: true },
        { k: 'Audit evidence', today: 'Scattered across emails, screenshots and spreadsheets', now: 'Report REG-CAL-012-07 and the run audit log' }
      ],
      presenter: {
        intro: () => '05:50 alarm in LIMS: Salmonella positive in MP-2610-CC-118, with a peak of 474 RFU at 06:40 and 75 min above 100 RFU. The first affected shipment leaves today at 10:00.',
        agents: 'Four agents, each with its own system: LIMS for the result; SAP and the plant MES for lots, pallets and shipments; SAP and the MES for the block; SAP, Teams and Outlook for the incident and the customer notice.',
        waiting: (H) => [
          `The ${H.sc.elseTotal} pallets of the same origin outside the warehouse stay "to be assessed"; the ${H.goneTotal} pallets already shipped to 9 customers go to the recall. Nothing has been written to SAP S/4HANA or the plant MES yet.`,
          'The scope can be edited (remove a lot, with a reason) or rejected: if rejected, nothing is applied and it is logged for audit.'
        ],
        rejected: ['Rejected: nothing has been blocked, neither in SAP S/4HANA nor in the plant MES, and there is no nonconformity or notice. The reason is kept in the audit log.', 'The decision always belongs to Quality and Food Safety; the run can be repeated at any time.'],
        done: (H) => [
          `Applied after approval: ${H.ids.blq} in SAP S/4HANA, ${H.sc.count} pallets immobilised and ${H.sc.holds.length} shipments held in the MES, ${H.ids.nc} with the 8D in draft, a notice via Teams and 9 customer notice drafts in Outlook.`,
          'The incident report comes out as a controlled document: code, revision, approvals and run log, ready for a GMP+ or FAMI-QS audit.'
        ],
        next: { done: 'Open "Download incident report" and then go to "Claim" (right arrow).', no_trigger: 'Go to "From words to workflow", leave 15 min and run again.' }
      }
    }
  });

  /* 8D draft (D1–D8) written by the Incidents agent. */
  function D8(H) {
    const sc = H.sc;
    const ant = hasAnt(sc)
      ? ' Precedent in SAP S/4HANA: NC-2026-0398 (14/08/2026), Enterobacteriaceae finding in a choline chloride lot from the same supplier (closed); keep it in mind when deciding the fate of PRM-2610-0421 and the qualification of Agroquímica Delta.'
      : '';
    return [
      { d: 'D1', t: 'Team', text: `Lead: ${ROLE.qa_shift}. Team: ${ROLE.lab_shift}, ${ROLE.plant_shift}, ${ROLE.logistics}, ${ROLE.customer_care} and ${ROLE.regulatory}.`, owner: ROLE.qa_shift, due: '2026-10-28' },
      { d: 'D2', t: 'Problem description', text: `On 28/10/2026 LIMS recorded a Salmonella positive in raw material MP-2610-CC-118 (choline chloride 60 %, Agroquímica Delta, received 21/10): signal above ${H.fv(100)} since 05:50 (75 min, ongoing), with a peak of ${H.fv(474)} at 06:40 and 55 min above ${H.fv(300)}. It was used in 4 premix lots (96 t): ${H.all.count} t in the warehouse and ${H.goneTotal} t shipped to 9 customers.${ant}`, owner: ROLE.qa_shift, due: '2026-10-28' },
      { d: 'D3', t: 'Containment', text: `${H.ids.blq}: MP-2610-CC-118 and ${sc.count} premix pallets blocked in SAP S/4HANA and immobilised in the MES; ${sc.holds.length} shipments held. Locate and notify the 9 customers who already received product.${sc.elseTotal ? ` Assess the ${sc.elseTotal} pallets of the same origin outside the finished-goods warehouse.` : ''}`, owner: ROLE.plant_shift, due: '2026-10-28' },
      { d: 'D4', t: 'Root cause (hypothesis)', text: 'Hypothesis to be confirmed by the Laboratory Manager: the choline chloride lot MP-2610-CC-118 arrived contaminated with Salmonella from Agroquímica Delta and the receiving sampling (PR-CAL-004) did not detect it.', owner: ROLE.lab_shift, due: '2026-10-30' },
      { d: 'D5', t: 'Proposed corrective actions', text: 'Claim against the supplier and reinforce its qualification; extend receiving sampling of choline chloride; consider pre-release testing of high-risk raw materials.', owner: ROLE.qa_shift, due: '2026-11-04' },
      { d: 'D6', t: 'Implementation and verification', text: 'Verify with testing of the supplier next deliveries and cleaning of the affected lines (PR-PRO-003).', owner: ROLE.lab_shift, due: '2026-11-11' },
      { d: 'D7', t: 'Prevention', text: 'Update PR-CAL-004 with the new sampling plan and extend the measure to other raw materials of similar origin.', owner: ROLE.qa_shift, due: '2026-11-25' },
      { d: 'D8', t: 'Closure', text: `Close ${H.ids.nc} after verifying effectiveness and deciding the fate of the 4 premix lots and the ${sc.count} blocked pallets.`, owner: ROLE.decider, due: '2026-12-02' }
    ];
  }
})();
