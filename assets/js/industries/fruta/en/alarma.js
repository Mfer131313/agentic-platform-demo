/* Subtropicales Axarquía · alarm with approval: temperature deviation in controlled ripening room CM-06 (Hass avocado, lot AH-2611-118).
 * Demo scenario with synthetic data (MFM). The functions receive the scene context H
 * (W workflow, C evaluated condition, sc current scope, ids generated on approval, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Air temperature of room CM-06 (sensor TT-CM06-01), one reading every 5 min from 05:00 to 07:00. Compressor CP-06 failed at 03:40. */
  const TEMPS = [6.6, 6.8, 7.0, 7.2, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8.3, 8.7, 9.1, 9.4, 9.7, 9.9, 10.2, 10.5, 10.7, 10.9, 11.0, 11.1, 11.2, 11.3, 11.4];
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = TEMPS.map((v, i) => ({ time: hhmm(300 + i * 5), value: v }));

  /* Orders served with the 9 pallets of lot AH-2611-118 in CM-06 (by row): 9 pallets, 13,995 kg (14 t). */
  const ORDERS = [
    { id: 'ECO-2026-1120', title: 'Hass avocado size 18 · ready to eat', sub: 'Online shop · today orders', lane: 1, count: 1, first: 9, of: 9, kgpp: 1555, cost: 2.5, hold: 'EXP-26-6101' },
    { id: 'PED-2026-44790', title: 'Hass avocado size 18 · ready to eat', sub: 'Hipermercados Costa Verde, S.A. (Spain)', lane: 2, count: 3, first: 1, of: 9, kgpp: 1555, cost: 2.4, hold: 'EXP-26-6102' },
    { id: 'PED-2026-44795', title: 'Hass avocado size 18 · ready to eat', sub: 'Marché Soleil SAS (France)', lane: 3, count: 3, first: 4, of: 9, kgpp: 1555, cost: 2.4, hold: 'EXP-26-6103' },
    { id: 'PED-2026-44801', title: 'Hass avocado size 18 · ready to eat', sub: 'Frischmarkt Süd GmbH (Germany)', lane: 4, count: 2, first: 7, of: 9, kgpp: 1555, cost: 2.4, hold: 'EXP-26-6104' }
  ];
  /* Pallets of the same lot outside CM-06 (CM-03, not exposed) and already shipped before the alarm. */
  const ELSE = {
    'PED-2026-44790': [{ loc: 'CM-03', count: 4, note: 'AH-2611-118 · CM-03 · 6.2 °C, within limits' }]
  };
  const GONE = {
    'PED-2026-44795': [{ id: 'ALB-26-9102', date: '2026-11-19', time: '17:40', count: 3, to: 'Marché Soleil SAS (France)' }]
  };
  /* Identifier of each pallet in CM-06: PAL-AH-2611-118-<n>. */
  const UNITS = [];
  ORDERS.forEach((l) => {
    for (let k = 0; k < l.count; k += 1) {
      const n = l.first + k;
      UNITS.push({ item: l.id, product: l.title, pallet: `${n}/${l.of}`, sscc: `PAL-AH-2611-118-${String(n).padStart(2, '0')}`, kg: l.kgpp, position: `CM-06 · row ${l.lane} · slot ${k + 1}`, hold: l.hold });
    }
  });

  const ROLE = {
    qa_shift: 'Quality and Food Safety Manager', ripening_shift: 'Ripening and Cold Chain Manager', packing_shift: 'Packing and Packaging Manager',
    ecommerce: 'Online Shop Manager', customer_care: 'Customer Care', logistics: 'Shipping and Export Manager',
    lab_shift: 'Laboratory Manager', decider: 'Operations and Quality Manager'
  };
  const TEAMS = 'Quality and shipping · Packing centre';
  const ANT_ITEM = 'PED-2026-44795';
  const lots = (sc) => sc.items.length;
  const hasAnt = (sc) => sc.items.some((l) => l.id === ANT_ITEM);
  const palsOf = (sc, h) => sc.items.filter((l) => l.hold === h.id).reduce((s, l) => s + l.count, 0);

  agenticPackEn('fruta', {
    alarma: {
      nav: 'CM-06 alarm',
      title: 'Cold-chain alarm in progress',
      icon: 'thermometer',
      page_title: 'Room CM-06 · temperature deviation',
      alarm_id: 'ALM-FRIO-0612',
      alarm_time: '05:50',
      source_system: 'Room monitoring',
      asset: 'ripening room CM-06',
      location: 'Axarquía Packing Centre (Málaga) · Controlled ripening room 6',
      excursion_noun: 'deviation',
      workflow_topic: 'cold chain and ripening',
      policy_ref: 'PR-MAD-002',
      procedures: 'PR-MAD-002 · PR-TRZ-003',
      decider_short: 'Quality and Food Safety',
      decider_of: 'of Quality and Food Safety',
      approval_node: 'Quality approval',
      measure: { short: 'air temperature', col: 'Air', unit: '°C', dec: 1, icon: 'thermometer' },
      setpoint: 6,
      setpoint_label: 'setpoint',
      limit: 8,
      critical: 10,
      min_minutes: 15,
      interval_min: 5,
      series: SERIES,
      peak: 11.4,
      peak_time: '07:00',
      current: 11.4,
      current_time: '07:00',
      current_note: 'still above the limit since 05:50',
      chart: {
        title: 'Room CM-06 · air temperature',
        sub: 'Setpoint 6.0 °C · now 11.4 °C (07:00)',
        tab: 'Temperature',
        series_label: 'Air (TT-CM06-01)',
        yTicks: [6, 8, 10, 12],
        xTicks: ['05:00', '05:30', '06:00', '06:30', '07:00']
      },
      event_kv: [
        ['Room', 'CM-06 · Controlled ripening room 6 · capacity 24 pallets'],
        ['Sensor', 'TT-CM06-01 · air · reading every 5 min · setpoint 6.0 °C'],
        ['Equipment', 'CP-06 (compressor, stopped since 03:40) · EV-06 (evaporator)'],
        ['Contents', '9 pallets of Hass avocado size 18 · lot AH-2611-118 · 14 t']
      ],
      events: [
        { time: '05:05', end: '05:50', text: 'Compressor CP-06 is still stopped after the 03:40 trip and the room is losing cold', equipment: 'CP-06', tone: 'brand', band: 'CP-06 stopped' },
        { time: '05:50', text: 'Room monitoring alarm: air temperature above 8 °C in CM-06', ref: 'ALM-FRIO-0612', tone: 'crit' },
        { time: '05:55', end: '06:30', text: 'Reset attempt on CP-06 fails; EV-06 keeps moving air without cooling', equipment: 'CP-06', tone: 'warn', band: 'Failed reset of CP-06', bandTone: 'warn' },
        { time: '06:20', text: 'Air temperature exceeds 10 °C: critical deviation', tone: 'crit' },
        { time: '06:30', text: 'The Packing and Packaging Manager suspends loading at the docks with fruit from CM-06', equipment: 'Shipping', tone: 'warn' }
      ],
      probable_cause: 'Hypothesis to be confirmed by the Ripening and Cold Chain Manager: compressor CP-06 tripped at 03:40 (high-pressure protection) and the standby compressor did not start; the alarm was raised at 05:50, when the 8 °C limit was crossed.',
      backup: { id: 'wf-cadena-frio-respaldo', name: 'Temperature deviation in ripening rooms', version: 'v1', threshold: 8, minutes: 15, critical: 10, approver: ROLE.qa_shift },
      untouched: 'SAP S/4HANA, the WMS, LIMS, the online shop (PrestaShop), Outlook or Microsoft Teams',
      apply_systems: 'SAP S/4HANA, WMS, LIMS, Online shop (PrestaShop), Outlook and Microsoft Teams',
      llm_cost_usd: 0.04,
      ids: [
        { key: 'blq', prefix: 'BLQ-2026-', start: 1311, label: 'Hold' },
        { key: 'nc', prefix: 'NC-2026-', start: 704, label: 'Nonconformity' },
        { key: 'ot', prefix: 'OT-2026-', start: 5217, label: 'Work order' }
      ],
      block_id_key: 'blq',
      proposer: 'blq',
      lanes: [
        { id: 'mon', name: 'Room monitor', short: 'Monitor', icon: 'thermometer', systems: ['Room monitoring'], idle: 'Confirms the deviation with the room readings', gsub: 'confirms the deviation', gsys: ['Room monitoring'] },
        { id: 'traz', name: 'Traceability', icon: 'git-branch', systems: ['WMS', 'SAP S/4HANA', 'Field traceability'], idle: 'Locates pallets, lot and orders', gsub: 'pallets, lot and orders', gsys: ['WMS', 'SAP', 'Field'] },
        { id: 'blq', phase: 2, name: 'Quality', icon: 'lock', systems: ['SAP S/4HANA', 'WMS', 'LIMS'], idle: 'Prepares the lot hold and the firmness and colour sampling and requests Quality approval', gsub: 'holds and samples', gsys: ['SAP', 'WMS', 'LIMS'] },
        { id: 'man', phase: 2, name: 'Maintenance', icon: 'wrench', systems: ['SAP S/4HANA', 'WMS', 'Microsoft Teams'], idle: 'Opens the compressor work order and the pallet transfer to CM-02', gsub: 'WO and transfer to CM-02', gsys: ['SAP', 'WMS', 'Teams'] },
        { id: 'log', phase: 2, name: 'Logistics and orders', icon: 'truck', systems: ['WMS', 'Online shop (PrestaShop)', 'Outlook', 'Microsoft Teams'], idle: 'Reassigns shipments and notifies customers', gsub: 'reassigns and notifies', gsys: ['WMS', 'PrestaShop', 'Outlook', 'Teams'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'Room monitoring', verb: 'Querying', action: 'Reads sensor TT-CM06-01 from 05:00 to 07:00, one reading every 5 min', result: `${SERIES.length} readings, no gaps · now ${H.fv(11.4)} (07:00)`, ms: 1850, set: { volume: `${SERIES.length} temperature readings` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'Room monitoring', verb: 'Querying', action: 'Cross-checks the deviation with the state of compressor CP-06 and evaporator EV-06', result: `CP-06 stopped since 03:40 and failed reset 05:55–06:30: hypothesis for the ${ROLE.ripening_shift}`, tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} readings · 5 events`, result: `Deviation confirmed: ${H.C.above} min above · peak ${H.fv(11.4)}` } },
            { lane: 'traz', system: 'WMS', verb: 'Querying', action: 'Lists the pallets located in CM-06 since 03:40, by row', result: `${a.count} pallets (${H.fmt.kg(a.qty)}) in ${lots(a)} rows`, ms: 2100, set: { volume: `${a.count} pallets` } },
            { lane: 'traz', system: 'Field traceability', verb: 'Querying', action: 'Resolves lot, farms and growers of the pallets', result: 'A single lot, AH-2611-118 · Hass avocado size 18 · 14 t, from Axarquía farms', ms: 1900, set: { volume: `${a.count} pallets · 1 lot` } },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Querying', action: 'Resolves the orders that will consume the pallets', result: `${lots(a)} destinations: 3 supermarkets (Spain, France and Germany) and today online-shop orders · ${H.fmt.eur(a.value)} at standard cost`, ms: 2600, set: { volume: `${a.count} pallets · ${lots(a)} orders` }, reveal: 'lots' },
            { lane: 'traz', system: 'WMS', verb: 'Querying', action: 'Looks for pallets of the same lot outside CM-06', result: `${a.elseTotal} pallets in CM-03, to be assessed · ${H.goneTotal} pallets already shipped before the alarm`, ms: 1700, reveal: 'map' },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Querying', action: 'Checks the planned shipments of those pallets', result: `${a.holds.length} planned shipments; the first, ${H.first.id}, at ${H.first.time} at ${H.first.where}`, tone: 'warn', ms: 2200, set: { volume: `${a.count} pallets · ${lots(a)} orders · ${a.holds.length} shipments`, result: `First affected shipment at ${H.first.time}` }, milestone: 'traz', audit: { action: 'Pallets, lot and orders identified', detail: `${a.count} pallets of lot AH-2611-118 in CM-06 · ${lots(a)} orders · ${a.holds.length} planned shipments · ${a.elseTotal} pallets of the same lot in CM-03 · ${H.goneTotal} pallets already shipped` } },
            { lane: 'blq', node: 'apr', system: 'Procedimientos', verb: 'Analysing', action: 'Applies PR-MAD-002 and PR-TRZ-003 to this deviation', result: 'Hold the lot, sample firmness and colour, move the pallets to CM-02 and reassign the shipments; only Quality and Food Safety releases', ms: 1300 },
            { lane: 'blq', node: 'apr', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the hold proposal and its rationale with the evidence', result: `Proposal: ${a.count} pallets of lot AH-2611-118 on hold, transfer to CM-02 and ${a.holds.length} shipments held; ${a.elseTotal} pallets in CM-03, to be assessed`, ms: 7000, set: { volume: `${a.count} pallets · ${a.holds.length} shipments` } },
            { lane: 'blq', node: 'apr', system: 'Agentic Platform', verb: 'Evaluating', action: `Requests approval from the ${H.W.approver} before writing to SAP S/4HANA and the WMS`, result: 'Awaiting the Quality and Food Safety decision', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Proposal sent to Quality' }, milestone: 'prop', audit: { action: 'Hold proposal sent for approval', detail: `${a.count} pallets of lot AH-2611-118 · approver ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          const ships = sc.holds.map((h) => h.id).join(', ');
          return [
            { lane: 'blq', system: 'SAP S/4HANA', verb: 'Applying', action: `Records the quality hold of lot AH-2611-118 (${sc.count} pallets in CM-06)`, result: `${ids.blq} · ${sc.count} pallets in "on hold" status`, tone: 'ok', ms: 2400, milestone: 'blq', audit: { action: 'Hold applied', detail: `${ids.blq} · SAP S/4HANA · lot AH-2611-118 · ${sc.count} pallets of ${lots(sc)} orders` } },
            { lane: 'blq', system: 'WMS', verb: 'Applying', action: `Immobilises the ${sc.count} pallets and holds their shipments`, result: `${sc.count} pallets immobilised · ${sc.holds.length} shipments held, the first ${H.holdWhen(sc.holds[0]).includes('/') ? 'on' : 'at'} ${H.holdWhen(sc.holds[0])}`, tone: 'ok', ms: 2100, set: { result: `${ids.blq} applied · ${sc.holds.length} shipments held` }, milestone: 'wms', audit: { action: 'Pallets immobilised and shipments held', detail: `WMS · ${sc.count} pallets · ${ships}` } },
            { lane: 'blq', system: 'LIMS', verb: 'Applying', action: 'Schedules the firmness and colour sampling of the exposed pallets', result: `${sc.count} pallets to sample · results before ${H.first.time}`, tone: 'ok', ms: 1500, audit: { action: 'Firmness and colour sampling scheduled', detail: `LIMS · ${sc.count} pallets of lot AH-2611-118 · report to decide their fate` } },
            { lane: 'blq', system: 'SAP S/4HANA', verb: 'Applying', action: 'Opens the nonconformity with the temperature curve, the events and the pallets', result: `${ids.nc} opened${hasAnt(sc) ? ' · precedent NC-2026-0521 linked' : ''}`, tone: 'ok', ms: 1900, set: { volume: '1 nonconformity' }, milestone: 'nc', audit: { action: 'Nonconformity opened', detail: `${ids.nc} · SAP S/4HANA · temperature deviation in CM-06` } },
            { lane: 'blq', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the 8D (D1–D8) with owners by role', result: '8D draft ready for Quality review', ms: 7800, set: { volume: '1 nonconformity · 8D in draft' }, milestone: 'd8', audit: { action: '8D draft written', detail: `${ids.nc} · D1–D8 · pending Quality review` } },
            { lane: 'man', system: 'SAP S/4HANA', verb: 'Applying', action: 'Opens the priority 1 work order for compressor CP-06', result: `${ids.ot} opened · assigned to the ${ROLE.ripening_shift}`, tone: 'ok', ms: 1700, set: { volume: '1 nonconformity · 1 WO' }, milestone: 'ot', audit: { action: 'Work order opened', detail: `${ids.ot} · SAP S/4HANA · compressor CP-06 of CM-06 · priority 1` } },
            { lane: 'man', system: 'WMS', verb: 'Applying', action: `Generates the transfer of the ${sc.count} held pallets to room CM-02`, result: `${sc.count} pallets in transfer to CM-02 (setpoint 6.0 °C, free slots available)`, tone: 'ok', ms: 1800, audit: { action: 'Transfer to CM-02 generated', detail: `WMS · ${sc.count} pallets · CM-06 → CM-02 · held until the Quality decision` } },
            { lane: 'man', system: 'Microsoft Teams', verb: 'Sending', action: `Notifies the ${ROLE.ripening_shift} and the ${ROLE.packing_shift}`, result: `Notice posted in the "${TEAMS}" channel`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 nonconformity · 1 WO · 1 notice', result: `${ids.nc} opened · ${ids.ot} assigned` }, milestone: 'teams', audit: { action: 'Notice sent via Teams', detail: `${ROLE.ripening_shift} and ${ROLE.packing_shift} · channel "${TEAMS}"` } },
            { lane: 'log', system: 'WMS', verb: 'Applying', action: `Proposes reassigning the ${sc.holds.length} held shipments with available fruit from other lots`, result: `${sc.holds.length} reassignments proposed, to be confirmed by the ${ROLE.logistics}`, tone: 'ok', ms: 1600, audit: { action: 'Shipment reassignment proposed', detail: `WMS · ${ships} · pending confirmation by the ${ROLE.logistics}` } },
            { lane: 'log', system: 'Online shop (PrestaShop)', verb: 'Applying', action: 'Flags today online-shop orders with fruit from CM-06 for a delivery review', result: 'Affected orders of today flagged in PrestaShop, none cancelled', tone: 'ok', ms: 1400, audit: { action: 'Online orders flagged', detail: `PrestaShop · today orders with fruit from lot AH-2611-118 · owner ${ROLE.ecommerce}` } },
            { lane: 'log', system: 'Outlook', verb: 'Preparing', action: `Saves the notice to the 3 supermarkets with affected orders as drafts, for the ${ROLE.logistics} to review and ${ROLE.customer_care} to send`, result: '3 notice drafts in Outlook, not sent', tone: 'ok', ms: 1200, audit: { action: 'Customer notices in draft', detail: `${ids.nc} · 3 supermarkets · pending review by the ${ROLE.logistics}` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Pallets in CM-06 during the deviation', value: H.all.count, sub: `${lots(H.all)} orders · ${H.fmt.kg(H.all.qty)} · already shipped: ${H.goneTotal} pallets`, icon: 'pallet' },
        { label: 'First affected shipment', value: H.first.time, sub: `${H.first.id} · ${H.first.where} · ${H.pl(H.holdCount(H.all, H.first))}${held ? ' · held' : ''}`, icon: 'truck' }
      ],
      scope: {
        icon: 'pallet',
        unit: ['pallet', 'pallets'],
        item_noun: ['order', 'orders'],
        qty_unit: 'kg',
        per_square: 1,
        items: ORDERS.map((l) => Object.assign({
          id: l.id, title: l.title, sub: l.sub, group: `Row ${l.lane}`, group_short: `Row ${l.lane}`,
          count: l.count, qty: l.count * l.kgpp, value: Math.round(l.count * l.kgpp * l.cost * 100) / 100, hold: l.hold
        }, ELSE[l.id] ? { elsewhere: ELSE[l.id] } : {}, GONE[l.id] ? { gone: GONE[l.id] } : {})),
        holds: {
          'EXP-26-6101': { date: '2026-11-20', time: '09:00', where: 'Dock 1', label: 'Online shop · today orders' },
          'EXP-26-6102': { date: '2026-11-20', time: '11:30', where: 'Dock 2', label: 'Hipermercados Costa Verde, S.A. (Spain)' },
          'EXP-26-6103': { date: '2026-11-20', time: '14:00', where: 'Dock 3', label: 'Marché Soleil SAS (France) · export' },
          'EXP-26-6104': { date: '2026-11-21', time: '07:30', where: 'Dock 4', label: 'Frischmarkt Süd GmbH (Germany) · export' }
        },
        units: UNITS,
        csv_name: 'pallets-cm-06-deviation',
        csv_cols: [
          { label: 'Order', key: 'item' },
          { label: 'Product', key: 'product' },
          { label: 'Pallet', key: 'pallet' },
          { label: 'Pallet ID', key: 'sscc', text: true },
          { label: 'Kg', key: 'kg' },
          { label: 'Location', key: 'position' },
          { label: 'Planned shipment', key: 'hold' }
        ],
        labels: {
          items_title: 'Affected orders and pallets',
          items_systems: 'WMS and SAP S/4HANA',
          items_where: 'pallets in CM-06,',
          item_col: 'Order',
          at_col: 'In CM-06',
          group_col: 'Row',
          hold_col: 'Planned shipment',
          else_col: 'Outside CM-06',
          else_none: 'No stock',
          gone_verb: 'shipped',
          exposed: 'Exposed',
          blocked: 'On hold',
          unblocked: 'Not on hold',
          block_noun: 'hold',
          block_verb: 'Hold',
          hold_verb: 'Hold',
          held: 'Held',
          holds_label: 'Planned shipments',
          holds_first: 'the first',
          scope_main: 'Pallets in CM-06 during the deviation',
          else_scope: 'Same lot in CM-03',
          else_decision: 'To be assessed',
          map_title: 'Pallet locations',
          map_sub: 'WMS · Axarquía Packing Centre',
          zone_title: 'CM-06 · Controlled ripening room 6',
          zone_sub: '4 rows · 24 slots',
          else_title: 'Same lot in CM-03',
          else_sub: 'not in CM-06 · to be assessed',
          gone_title: 'Shipped before the alarm',
          legend_exposed: 'Exposed to the deviation',
          legend_else: 'To be assessed in CM-03',
          csv_button: 'Download pallets (CSV)',
          value_label: 'at standard cost',
          report_scope: 'Scope of the hold'
        }
      },
      text: {
        proposal_title: 'hold proposal',
        stop_without: 'proposing the hold',
        activates: 'the hold',
        no_proposal: 'no hold proposal',
        idle_log: 'The run stops at the approval: nothing is written to SAP S/4HANA, the WMS or the online shop without the Quality and Food Safety decision.',
        approve_action: 'Approves the hold',
        scope_short: (H) => `${H.pl(H.sc.count)} of ${H.fmt.plural(lots(H.sc), 'order', 'orders')} and ${H.fmt.plural(H.sc.holds.length, 'shipment held', 'shipments held')}`,
        audit_approved: 'Hold approved',
        audit_approved_detail: (H) => `${H.ids.blq} · ${H.sc.count} pallets of lot AH-2611-118 in CM-06 · ${H.sc.holds.length} shipments held${H.sc.out.length ? ` · scope edited (without ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Hold ${H.ids.blq} approved · ${H.sc.count} pallets`,
        audit_rejected: 'Hold rejected',
        outcome_rejected: 'Hold rejected · no actions applied',
        toast_done: (H) => `${H.ids.blq} applied · ${H.ids.nc} and ${H.ids.ot} opened · notice sent via Teams`,
        presenter_applying: 'After approval: hold in SAP S/4HANA, pallets immobilised in the WMS, sampling in LIMS, nonconformity and compressor work order, transfer to CM-02, online orders flagged and customer notice drafts.',
        reject_nothing: 'no hold in SAP S/4HANA, no pallets immobilised in the WMS, no sampling in LIMS, no nonconformity, no work order, no transfer to CM-02 and no notices',
        edit_intro: 'PR-MAD-002 requires holding all the exposed pallets of the room.'
      },
      approval: {
        id: 'blq-cm-06',
        approve_label: 'Approve hold',
        policy: 'PR-MAD-002 · PR-TRZ-003 · only Quality and Food Safety releases',
        title: (H) => `Quality hold · ${H.pl(H.sc.count)} of Hass avocado in CM-06`,
        summary: (H) => `Reason: air above ${H.fv(H.C.threshold)} for ${H.C.above} min (${H.span}), longer than the ${H.C.minutes} min set by ${H.W.backup ? 'PR-MAD-002' : 'the workflow'}${H.critMin ? `, and ${H.critMin} min above ${H.fv(H.crit)}: critical deviation` : ''}. The pallets of lot AH-2611-118 are held until firmness and colour are measured and their fate is decided, they are moved to CM-02, shipments are held and the notice to the affected customers is prepared.`,
        extra_scope: () => [],
        effects: (H) => [
          `SAP S/4HANA: quality hold of lot AH-2611-118 (${H.sc.count} pallets in CM-06)`,
          `WMS: ${H.sc.count} pallets immobilised, ${H.sc.holds.length} shipments held and transfer to CM-02`,
          'LIMS: firmness and colour sampling of the exposed pallets',
          'SAP S/4HANA: nonconformity with an 8D draft and work order for compressor CP-06',
          'Online shop (PrestaShop): affected orders of today flagged, none cancelled',
          `Microsoft Teams: notice to the ${ROLE.ripening_shift} and the ${ROLE.packing_shift}`,
          'Outlook: 3 supermarket notice drafts, not sent'
        ],
        applied: (H) => [
          `SAP S/4HANA: ${H.ids.blq} · lot AH-2611-118 (${H.sc.count} pallets)`,
          `WMS: ${H.sc.count} pallets immobilised, ${H.sc.holds.length} shipments held and transfer to CM-02`,
          `LIMS: sampling of ${H.sc.count} pallets`,
          `SAP S/4HANA: ${H.ids.nc} with an 8D draft and ${H.ids.ot} for CP-06`,
          'Online shop (PrestaShop): orders of today flagged',
          `Microsoft Teams: notice to the ${ROLE.ripening_shift} and the ${ROLE.packing_shift}`,
          'Outlook: 3 supermarket notice drafts, not sent'
        ]
      },
      result: {
        title: (H) => `Hold ${H.ids.blq} applied and nonconformity ${H.ids.nc} opened`,
        stats: (H) => [
          { label: 'Pallets on hold', value: H.sc.count, tone: 'crit' },
          { label: 'Shipments held', value: H.sc.holds.length },
          { label: 'Pallets already shipped to assess', value: H.goneTotal, tone: 'warn' },
          { label: 'Pallets in CM-03 to assess', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Hold ${H.ids.blq}`, systems: ['SAP S/4HANA', 'WMS', 'LIMS'],
            kv: [
              ['Status', App.chip('blocked')],
              ['Scope', `${H.pl(H.sc.count)} · ${H.fmt.plural(lots(H.sc), 'order', 'orders')} · ${H.fmt.kg(H.sc.qty)}`],
              ['Value at standard cost', H.fmt.eur(H.sc.value)],
              ['Shipments held', H.sc.holds.map((h) => h.id).join(', ')],
              ['Released by', `${ROLE.qa_shift} (PR-TRZ-003)`]
            ],
            next: 'Next step per PR-MAD-002: measure firmness, colour and pulp temperature in a sample from each row and decide the fate of each pallet (release, reclassify for processing or destroy).',
            buttons: [{ action: 'csv', label: 'Pallets on hold (CSV)' }]
          },
          {
            icon: 'wrench', title: `WO ${H.ids.ot} and transfer to CM-02`, systems: ['SAP S/4HANA', 'WMS'], chip: ['running', 'Priority 1'],
            kv: [
              ['Equipment', 'Compressor CP-06 · room CM-06'],
              ['Assigned to', ROLE.ripening_shift],
              ['Transfer', `${H.pl(H.sc.count)} to CM-02, held until the Quality decision`]
            ]
          },
          {
            icon: 'clipboard', title: `Nonconformity ${H.ids.nc}`, systems: ['SAP S/4HANA'], chip: ['draft', '8D in draft'],
            items: D8(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Download 8D draft (PDF)' }]
          },
          {
            icon: 'send', title: 'Notice to ripening and packing', systems: ['Microsoft Teams'], note: H.run.endAt ? `sent at ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              icon: 'message-square', from: 'Agentic Platform · Maintenance agent', channel: `channel "${TEAMS}"`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: ROLE.packing_shift, text: `Hold ${H.ids.blq} of lot AH-2611-118, approved by ${H.decision ? H.decision.by : H.W.approver}${H.decision ? ` at ${H.fmt.time(H.decision.at)}` : ''}. Do not load fruit from CM-06 until Quality decides otherwise:` },
                { to: ROLE.ripening_shift, text: `Check compressor CP-06 (${H.ids.ot}, priority 1) and supervise the transfer of the pallets to CM-02. Details in ${H.ids.nc} (SAP S/4HANA).` }
              ],
              list: H.sc.holds.map((h) => `${h.id} · ${H.holdWhen(h)} · ${h.where} · ${H.pl(palsOf(H.sc, h))}`)
            }
          }
        ]
      },
      doc: {
        code: 'REG-CAL-020-02',
        lane: 'blq',
        heading: 'Disciplines D1–D8',
        col_d: 'D',
        title: (H) => `8D report · ${H.ids.nc}`,
        subtitle: 'Nonconformity for temperature deviation in room CM-06 · draft for review',
        filename: (H) => `8d-draft-${H.ids.nc}`,
        meta: (H) => [['Nonconformity', H.ids.nc], ['Linked hold', H.ids.blq], ['Work order', H.ids.ot]],
        items: (H) => D8(H),
        reviewer: ROLE.qa_shift,
        approver: ROLE.decider,
        note: 'Draft generated from the run evidence. The target dates are a proposal: the 8D team confirms them. The root cause is a hypothesis until the Ripening and Cold Chain Manager confirms it.'
      },
      report: {
        noun: 'incident report',
        code: 'REG-CAL-012-07',
        title: 'Incident report · room CM-06',
        subtitle: 'Temperature deviation in controlled ripening',
        filename: 'incident-report-cm-06',
        site_label: 'Centre',
        site: 'Axarquía Packing Centre (Málaga)',
        description: (H) => `On 20/11/2026 at 05:50, room monitoring raised alarm ALM-FRIO-0612 in controlled ripening room CM-06 (setpoint ${H.fv(6)}), with compressor CP-06 stopped since 03:40. Air temperature (sensor TT-CM06-01) was ${H.C.above} min above ${H.fv(H.C.threshold)} (${H.span}), with a peak of ${H.fv(11.4)} at 07:00 and ${H.critMin} min above ${H.fv(H.crit)}. At 07:00 the room was still at ${H.fv(11.4)}. There were ${H.all.count} pallets of Hass avocado size 18 (lot AH-2611-118, 14 t) for ${lots(H.all)} orders: 3 supermarkets and the online shop.`,
        criteria: 'PR-MAD-002 (controlled ripening: if air exceeds 8 °C for more than 15 min the exposed lot is held) and PR-TRZ-003 (lot traceability and recall; only Quality and Food Safety releases).',
        actions: (H) => [
          `SAP S/4HANA · ${H.ids.blq}: quality hold of lot AH-2611-118 (${H.sc.count} pallets, ${H.fmt.kg(H.sc.qty)}; ${H.fmt.eur(H.sc.value)} at standard cost).`,
          `WMS: ${H.sc.count} pallets immobilised and moved to CM-02; shipments held: ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)}, ${h.where})`).join(', ')}.`,
          `LIMS: firmness and colour sampling of the ${H.sc.count} exposed pallets.`,
          `SAP S/4HANA · ${H.ids.nc}: nonconformity opened with an 8D draft (REG-CAL-020-02); ${H.ids.ot}: work order for compressor CP-06.`,
          'Online shop (PrestaShop): today orders with fruit from CM-06 flagged, none cancelled.',
          `Microsoft Teams: notice to the ${ROLE.ripening_shift} and the ${ROLE.packing_shift} in the "${TEAMS}" channel.`,
          'Outlook: 3 notice drafts for the supermarkets with affected orders, not sent.'
        ],
        pending: (H) => [
          'Measure firmness, colour and pulp temperature in a sample from each row (Laboratory Manager).',
          'Decide the fate of each pallet: release, reclassify for processing (guacamole and cold press) or destroy.',
          `Confirm the shipment reassignment and the customer notice: ${ROLE.logistics} and ${ROLE.customer_care}.`,
          `Review the flagged online orders before dispatch: ${ROLE.ecommerce}.`
        ].concat(H && hasAnt(H.sc) ? ['Precedent in SAP S/4HANA: NC-2026-0521 (27/10/2026), trip of the same compressor CP-06 on high pressure, solved by cleaning the condenser (closed). Relevant for the root cause and the maintenance plan.'] : []),
        reviewer: ROLE.decider,
        final_step: 'Fate of the pallets',
        final_role: ROLE.qa_shift,
        note: 'Document subject to Quality and Food Safety review; it does not replace the decision on the fate of the product.'
      },
      not_applied: (H) => [
        { sys: 'SAP S/4HANA', text: 'No quality hold, nonconformity or work order' },
        { sys: 'WMS', text: `No pallet immobilised or moved; the ${H.all.holds.length} shipments remain planned` },
        { sys: 'LIMS', text: 'No sampling scheduled' },
        { sys: 'Online shop (PrestaShop)', text: 'Today orders not flagged' },
        { sys: 'Outlook', text: 'No customer notice drafts' }
      ],
      compare: [
        { k: 'People involved', today: '4–5: quality, ripening and cold chain, shipping, online shop and customer care', now: 'Quality and Food Safety reviews and decides; ripening, shipping and customers receive the notice with the data' },
        { k: 'Systems queried by hand', today: '5–6: room monitoring, WMS, SAP, LIMS, online shop and email or phone', now: 'None: the agents query 6 systems and every data point is kept in the log' },
        { k: 'Steps', today: '12–15 manual steps, with waits between people', steps: true },
        { k: 'Time to hold and NC', today: '1–3 h', measured: true },
        { k: 'Audit evidence', today: 'Scattered across emails, screenshots and spreadsheets', now: 'Report REG-CAL-012-07 and the run audit log' }
      ],
      presenter: {
        intro: () => '05:50 alarm in ripening room CM-06: compressor stopped since 03:40, 11.4 °C at 07:00 against a 6.0 °C setpoint and 75 min above 8 °C. The first affected shipment leaves today at 09:00.',
        agents: 'Five agents, each with its own system: room monitoring for the temperature; WMS, SAP and field traceability for pallets, lot and orders; SAP, WMS and LIMS for the hold and the sampling; SAP, WMS and Teams for the work order and the transfer to CM-02; WMS, PrestaShop and Outlook for shipments and customers.',
        waiting: (H) => [
          `The ${H.sc.elseTotal} pallets of the same lot in CM-03 stay "to be assessed": they were not in CM-06. The ${H.goneTotal} pallets already shipped go to follow-up. Nothing has been written to SAP S/4HANA or the WMS yet.`,
          'The scope can be edited (remove an order, with a reason) or rejected: if rejected, nothing is applied and it is logged for audit.'
        ],
        rejected: ['Rejected: nothing has been held, neither in SAP S/4HANA nor in the WMS, and there is no nonconformity, work order or notice. The reason is kept in the audit log.', 'The decision always belongs to Quality and Food Safety; the run can be repeated at any time.'],
        done: (H) => [
          `Applied after approval: ${H.ids.blq} in SAP S/4HANA, ${H.sc.count} pallets immobilised and ${H.sc.holds.length} shipments held in the WMS, sampling in LIMS, ${H.ids.nc} with the 8D in draft, ${H.ids.ot} for CP-06, transfer to CM-02, a notice via Teams and 3 supermarket notice drafts in Outlook.`,
          'The incident report comes out as a controlled document: code, revision, approvals and run log, ready for an IFS Food or GLOBALG.A.P. audit.'
        ],
        next: { done: 'Open "Download incident report" and then go to "Claim" (right arrow).', no_trigger: 'Go to "From words to workflow", leave 15 min and run again.' }
      }
    }
  });

  /* 8D draft (D1–D8) written by the Quality agent. */
  function D8(H) {
    const sc = H.sc;
    const ant = hasAnt(sc)
      ? ' Precedent in SAP S/4HANA: NC-2026-0521 (27/10/2026), trip of the same compressor CP-06 on high pressure, solved by cleaning the condenser (closed); keep it in mind for the root cause.'
      : '';
    return [
      { d: 'D1', t: 'Team', text: `Lead: ${ROLE.qa_shift}. Team: ${ROLE.ripening_shift}, ${ROLE.packing_shift}, ${ROLE.logistics}, ${ROLE.ecommerce} and ${ROLE.customer_care}.`, owner: ROLE.qa_shift, due: '2026-11-20' },
      { d: 'D2', t: 'Problem description', text: `On 20/11/2026 the air in ripening room CM-06 exceeded ${H.fv(8)} from 05:50 (75 min, ongoing), with compressor CP-06 stopped since 03:40, a peak of ${H.fv(11.4)} at 07:00 and 45 min above ${H.fv(10)}. There were ${H.all.count} pallets of Hass avocado size 18 (lot AH-2611-118, 14 t).${ant}`, owner: ROLE.qa_shift, due: '2026-11-20' },
      { d: 'D3', t: 'Containment', text: `${H.ids.blq}: ${sc.count} pallets held in SAP S/4HANA and immobilised in the WMS; ${sc.holds.length} shipments held and transfer to CM-02. Sample firmness and colour in the exposed pallets.${sc.elseTotal ? ` Assess the ${sc.elseTotal} pallets of the same lot in CM-03, which were not in CM-06.` : ''}`, owner: ROLE.packing_shift, due: '2026-11-20' },
      { d: 'D4', t: 'Root cause (hypothesis)', text: 'Hypothesis to be confirmed by the Ripening and Cold Chain Manager: compressor CP-06 tripped at 03:40 (high-pressure protection) and the standby compressor did not start, with no warning until the temperature crossed 8 °C.', owner: ROLE.ripening_shift, due: '2026-11-24' },
      { d: 'D5', t: 'Proposed corrective actions', text: `Repair CP-06 (${H.ids.ot}); review the automatic start of the standby compressor; add an early temperature warning at 7 °C in room monitoring.`, owner: ROLE.ripening_shift, due: '2026-11-27' },
      { d: 'D6', t: 'Implementation and verification', text: 'Verify the temperature recovery of CM-06 and the standby start in a controlled test. Decide the fate of each pallet under PR-MAD-002: release, reclassify for processing or destroy.', owner: ROLE.qa_shift, due: '2026-12-01' },
      { d: 'D7', t: 'Prevention', text: 'Extend the early warning and the standby test to the other ripening rooms of the centre and update PR-MAD-002 if needed.', owner: ROLE.qa_shift, due: '2026-12-11' },
      { d: 'D8', t: 'Closure', text: `Close ${H.ids.nc} after verifying effectiveness and recording the decision on the fate of the ${sc.count} pallets.`, owner: ROLE.decider, due: '2026-12-18' }
    ];
  }
})();
