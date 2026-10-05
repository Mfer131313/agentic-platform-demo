/* Autopista Multimotor · alarm with approval: VW workshop capacity saturation (Marqués de Soria) after a technician's medical leave.
 * Demo scenario with synthetic data (MFM). The functions receive the scene context H
 * (W workflow, C evaluated condition, sc current scope, ids generated on approval, fmt, fv, pl…). */
(function () {
  'use strict';

  /* VW workshop bay load (iCare Workshop), one reading every 5 min from 05:00 to 07:00. */
  const LOAD = [69, 70, 70, 71, 70, 71, 72, 76, 81, 85, 88, 91, 94, 96, 98, 99, 97, 96, 93, 90, 87, 84, 82, 81, 80];
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = LOAD.map((v, i) => ({ time: hhmm(300 + i * 5), value: v }));

  /* Order groups with vehicles in the VW workshop bays during the saturation: 33 vehicles, 72.5 workshop hours. */
  const RATE = 89; /* workshop rate, EUR per hour */
  const ITEMS = [
    { id: 'CAM-VW-GOLF-ABS', title: 'ABS campaign · Golf 1.5 TSI', sub: 'VW safety recall · private customers', lane: 1, count: 6, first: 1, of: 18, code: 'GOL', hpp: 1.5, hold: 'ENT-26-70412' },
    { id: 'OT-VW-TIGUAN-30K', title: '30,000 km service · Tiguan 2.0 TDI', sub: '6-month subscription customers', lane: 2, count: 5, first: 2, of: 12, code: 'TIG', hpp: 2.5, hold: 'ENT-26-70413' },
    { id: 'OT-VW-POLO-FRE', title: 'Brake replacement · Polo 1.0 TSI', sub: 'Rental fleet (Madrid)', lane: 3, count: 7, first: 4, of: 20, code: 'POL', hpp: 2, hold: 'ENT-26-70415' },
    { id: 'OT-SEAT-LEON-PRE', title: 'Delivery preparation · Seat León 1.5 TSI', sub: 'Private sales (includes José María López)', lane: 4, count: 4, first: 3, of: 8, code: 'SEAT', hpp: 3, hold: 'ENT-26-70417' },
    { id: 'OT-VW-TROC-GAR', title: 'Warranty repair · T-Roc 1.5 TSI', sub: 'Brand warranty', lane: 5, count: 5, first: 1, of: 9, code: 'TRO', hpp: 2, hold: 'ENT-26-70415' },
    { id: 'OT-VW-ID4-PRE', title: 'Delivery preparation · ID.4', sub: 'Private sales · delivery 08/10', lane: 6, count: 6, first: 1, of: 6, code: 'ID4', hpp: 2.5, hold: 'ENT-26-70421' }
  ];
  /* Vehicles of the same groups outside the bays (lot, rental fleet) and already served before the alarm. */
  const ELSE = {
    'CAM-VW-GOLF-ABS': [{ loc: 'LOT-A', count: 12, note: 'Golf 1.5 TSI from the ABS campaign on the sales lot, no appointment' }],
    'OT-VW-TIGUAN-30K': [{ loc: 'LOT-B', count: 4, note: 'Subscription Tiguans with the service pending, no appointment' }],
    'OT-VW-POLO-FRE': [{ loc: 'RENTAL-FLEET', count: 9, note: 'Rental Polos with brakes at the wear limit' }],
    'OT-VW-ID4-PRE': [{ loc: 'LOT-C', count: 3, note: 'ID.4 on the lot with preparation pending' }]
  };
  const GONE = {
    'CAM-VW-GOLF-ABS': [{ id: 'ENT-26-70388', date: '2026-10-05', time: '17:40', count: 4, to: 'Customers served in the ABS campaign (05/10 appointment)' }],
    'OT-VW-POLO-FRE': [{ id: 'ENT-26-70391', date: '2026-10-06', time: '12:10', count: 9, to: 'Madrid rental fleet (returned to fleet)' }],
    'OT-VW-TIGUAN-30K': [{ id: 'ENT-26-70396', date: '2026-10-06', time: '18:20', count: 3, to: '6-month subscription customers' }]
  };
  /* Vehicles in the bays: VIN-2026-MAD-<model>-<n>. */
  const UNITS = [];
  ITEMS.forEach((l) => {
    for (let k = 0; k < l.count; k += 1) {
      const n = l.first + k;
      UNITS.push({ item: l.id, product: l.title, pallet: `${n}/${l.of}`, sscc: `VIN-2026-MAD-${l.code}-${String(n).padStart(2, '0')}`, kg: l.hpp, position: `VW workshop · bay ${l.lane} · slot ${k + 1}`, hold: l.hold });
    }
  });

  const ROLE = {
    ops: 'Operations Manager', workshop_shift: 'Workshop Manager', customer_care: 'Customer Care Team',
    brand_manager: 'Brand Manager', sales_shift: 'Sales Shift Supervisor', decider: 'Operations Manager'
  };
  const TEAMS = '#taller-vw-madrid';
  const ANT_LOT = 'OT-SEAT-LEON-PRE';
  const lots = (sc) => sc.items.length;
  const hasAnt = (sc) => sc.items.some((l) => l.id === ANT_LOT);
  const palsOf = (sc, h) => sc.items.filter((l) => l.hold === h.id).reduce((s, l) => s + l.count, 0);
  const hrs = (H, q) => `${H.fmt.num(q)} h`;

  agenticPackEn('autopista', {
    alarma: {
      nav: 'VW workshop alarm',
      title: 'VW workshop alarm in progress',
      icon: 'activity',
      page_title: 'VW workshop · capacity saturation',
      alarm_id: 'ALM-VW-0550',
      alarm_time: '05:50',
      source_system: 'iCare Workshop',
      asset: 'VW workshop',
      location: 'Madrid · Marqués de Soria · VW brand workshop',
      excursion_noun: 'saturation',
      workflow_topic: 'workshop capacity',
      policy_ref: 'OPE-WORKSHOP-003',
      procedures: 'OPE-ALERT-001 · OPE-WORKSHOP-003',
      decider_short: 'Operations',
      approval_node: 'Operations approval',
      measure: { short: 'VW workshop load', col: 'Load', unit: '%', dec: 0, icon: 'activity' },
      setpoint: 70,
      setpoint_label: 'usual load',
      limit: 85,
      critical: 95,
      min_minutes: 15,
      interval_min: 5,
      series: SERIES,
      peak: 99,
      peak_time: '06:15',
      current: 80,
      current_time: '07:00',
      current_note: 'below the limit since 06:45',
      chart: {
        title: 'VW workshop · bay load',
        sub: 'Usual load 70 % · now 80 % (07:00)',
        tab: 'Load',
        series_label: 'Load (iCare Workshop)',
        yTicks: [60, 70, 80, 90, 100],
        xTicks: ['05:00', '05:30', '06:00', '06:30', '07:00']
      },
      event_kv: [
        ['Workshop', 'VW workshop · Madrid (Marqués de Soria) · 6 bays'],
        ['Source', 'iCare Workshop · bay load · reading every 5 min'],
        ['Staff', 'VW platform: 5 technicians · 1 on medical leave · 4 available'],
        ['Site', 'Autopista Multimotor · Madrid (Marqués de Soria)']
      ],
      events: [
        { time: '05:35', end: '05:40', text: 'Medical-leave notice for one VW platform technician (1 of 5)', equipment: 'VW staff', tone: 'brand' },
        { time: '05:40', end: '06:05', text: 'iCare Workshop reassigns the scheduled-maintenance appointments among the available technicians', equipment: 'iCare Workshop', tone: 'brand', band: 'Appointment reassignment' },
        { time: '05:50', text: 'iCare alarm: VW workshop load above 85 %', ref: 'ALM-VW-0550', tone: 'crit' },
        { time: '05:52', end: '06:31', text: '6 Golfs from the ABS campaign arrive without an appointment: bays 1 to 3 saturated', equipment: 'Bays 1-3', tone: 'warn', band: 'ABS campaign walk-ins', bandTone: 'warn' },
        { time: '06:31', text: 'The Workshop Manager closes the schedule to new appointments for the day', equipment: 'Schedule', tone: 'warn' },
        { time: '06:40', text: 'Workshop load drops back below 85 %', tone: 'ok' }
      ],
      probable_cause: 'Hypothesis to be confirmed by the Workshop Manager: the medical leave of a VW technician (platform capacity at 80 %) coincided with the walk-in arrival of 6 Golfs from the ABS recall campaign (05:52-06:31).',
      backup: { id: 'wf-taller-respaldo', name: 'Workshop capacity saturation', version: 'v1', threshold: 85, minutes: 15, critical: 95, approver: ROLE.ops },
      untouched: 'iCare Workshop, Salesforce CRM, SAP ERP or Slack',
      apply_systems: 'iCare Workshop, Salesforce CRM, SAP ERP and Slack',
      llm_cost_usd: 0.04,
      ids: [
        { key: 'blq', prefix: 'REP-2026-', start: 317, label: 'Rescheduling' },
        { key: 'nc', prefix: 'INC-2026-', start: 508, label: 'Incident' }
      ],
      block_id_key: 'blq',
      proposer: 'blq',
      lanes: [
        { id: 'mon', name: 'Capacity monitor', short: 'Monitor', icon: 'activity', systems: ['iCare Workshop'], idle: 'Confirms the saturation with the iCare readings', gsub: 'confirms the saturation', gsys: ['iCare Workshop'] },
        { id: 'traz', name: 'Traceability', icon: 'git-branch', systems: ['Odoo Inventory', 'SAP ERP', 'Salesforce CRM'], idle: 'Locates vehicles, orders and deliveries', gsub: 'vehicles, orders and deliveries', gsys: ['Odoo', 'SAP', 'Salesforce'] },
        { id: 'blq', phase: 2, name: 'Rescheduling', icon: 'calendar', systems: ['iCare Workshop', 'Salesforce CRM'], idle: 'Prepares the rescheduling and requests Operations approval', gsub: 'reschedules and reassigns', gsys: ['iCare Workshop', 'Salesforce'] },
        { id: 'inc', phase: 2, name: 'Incidents', icon: 'clipboard', systems: ['SAP ERP', 'Slack'], idle: 'Opens the incident and notifies the workshop', gsub: 'incident, 8D and notice', gsys: ['SAP', 'Slack'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'iCare Workshop', verb: 'Querying', action: 'Reads the VW workshop bay load from 05:00 to 07:00, one reading every 5 min', result: `${SERIES.length} readings, no gaps · now ${H.fv(80)} (07:00)`, ms: 1850, set: { volume: `${SERIES.length} load readings` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'iCare Workshop', verb: 'Querying', action: 'Cross-checks the saturation with the workshop staffing and walk-in arrivals', result: `Medical leave of one VW technician and 6 ABS-campaign Golfs without appointment (05:52–06:31): hypothesis for the ${ROLE.workshop_shift}`, tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} readings · 6 events`, result: `Saturation confirmed: ${H.C.above} min above · peak ${H.fv(99)}` } },
            { lane: 'traz', system: 'iCare Workshop', verb: 'Querying', action: `Lists the vehicles in the VW workshop bays between ${H.C.start} and ${H.C.end}, by bay`, result: `${a.count} vehicles (${a.count} VIN) in ${lots(a)} bays`, ms: 2100, set: { volume: `${a.count} VIN` } },
            { lane: 'traz', system: 'Salesforce CRM', verb: 'Querying', action: 'Resolves customer, order type and delivery commitment for each VIN', result: `${lots(a)} order groups · ${hrs(H, a.qty)} of workshop time · ${H.fmt.eur(a.value)} at workshop rate`, ms: 2600, set: { volume: `${a.count} VIN · ${lots(a)} groups` }, reveal: 'lots' },
            { lane: 'traz', system: 'SAP ERP', verb: 'Querying', action: `Confirms model, work order and financing of the ${lots(a)} groups`, result: 'Open orders in iCare with SAP registration; the Seat León delivery for José María López (Banco Sabadell) is the most sensitive', ms: 1900 },
            { lane: 'traz', system: 'Odoo Inventory', verb: 'Querying', action: 'Looks for vehicles of the same groups outside the bays', result: `${a.elseTotal} vehicles in LOT-A, LOT-B, LOT-C and RENTAL-FLEET, to be assessed · ${H.goneTotal} already served before the alarm`, ms: 1700, reveal: 'map' },
            { lane: 'traz', system: 'Salesforce CRM', verb: 'Querying', action: 'Checks the committed deliveries and appointments for those vehicles', result: `${a.holds.length} commitments; the first, ${H.first.id}, at ${H.first.time} at ${H.first.where}`, tone: 'warn', ms: 2200, set: { volume: `${a.count} VIN · ${lots(a)} groups · ${a.holds.length} deliveries`, result: `First affected delivery at ${H.first.time}` }, milestone: 'traz', audit: { action: 'Vehicles and orders identified', detail: `${a.count} vehicles (VIN) of ${lots(a)} groups in the VW workshop · ${a.holds.length} committed deliveries · ${a.elseTotal} vehicles of the same groups on the lot and in the fleet` } },
            { lane: 'blq', node: 'apr', system: 'Procedimientos', verb: 'Analysing', action: 'Applies OPE-ALERT-001 and OPE-WORKSHOP-003 to this saturation', result: 'Reschedule the orders with no immediate commitment and notify customers; only Operations approves', ms: 1300 },
            { lane: 'blq', node: 'apr', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the rescheduling proposal and its rationale with the evidence', result: `Proposal: ${a.count} vehicles of ${lots(a)} groups and ${a.holds.length} deliveries rescheduled; ${a.elseTotal} vehicles on the lot and in the fleet, to be assessed`, ms: 7000, set: { volume: `${a.count} vehicles · ${a.holds.length} deliveries` } },
            { lane: 'blq', node: 'apr', system: 'Agentic Platform', verb: 'Evaluating', action: `Requests approval from the ${H.W.approver} before writing to iCare Workshop and Salesforce`, result: 'Awaiting the Operations decision', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Proposal sent to Operations' }, milestone: 'prop', audit: { action: 'Rescheduling proposal sent for approval', detail: `${a.count} vehicles of ${lots(a)} groups · approver ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          const ships = sc.holds.map((h) => h.id).join(', ');
          return [
            { lane: 'blq', system: 'iCare Workshop', verb: 'Applying', action: `Records the rescheduling of ${lots(sc)} VW workshop order groups`, result: `${ids.blq} · ${sc.count} vehicles in "rescheduled" status`, tone: 'ok', ms: 2400, milestone: 'blq', audit: { action: 'Rescheduling applied', detail: `${ids.blq} · iCare Workshop · ${sc.count} vehicles of ${lots(sc)} groups` } },
            { lane: 'blq', system: 'Salesforce CRM', verb: 'Applying', action: `Reschedules the ${sc.count} vehicles and reassigns their ${sc.holds.length} deliveries`, result: `${sc.count} VIN rescheduled · ${sc.holds.length} deliveries reassigned, the first ${H.holdWhen(sc.holds[0]).includes('/') ? 'on' : 'at'} ${H.holdWhen(sc.holds[0])}`, tone: 'ok', ms: 2100, set: { result: `${ids.blq} applied · ${sc.holds.length} deliveries reassigned` }, milestone: 'wms', audit: { action: 'Vehicles rescheduled and deliveries reassigned', detail: `Salesforce CRM · ${sc.count} VIN · ${ships}` } },
            { lane: 'inc', system: 'SAP ERP', verb: 'Applying', action: 'Opens the capacity incident with the load curve, the events and the VINs', result: `${ids.nc} opened${hasAnt(sc) ? ' · precedent INC-2026-0471 linked' : ''}`, tone: 'ok', ms: 1900, set: { volume: '1 incident' }, milestone: 'nc', audit: { action: 'Incident opened', detail: `${ids.nc} · SAP ERP · VW workshop saturation` } },
            { lane: 'inc', system: 'Modelo de lenguaje', verb: 'Drafting', action: 'Drafts the 8D (D1–D8) with owners by role', result: '8D draft ready for Operations review', ms: 7800, set: { volume: '1 incident · 8D in draft' }, milestone: 'd8', audit: { action: '8D draft written', detail: `${ids.nc} · D1–D8 · pending Operations review` } },
            { lane: 'inc', system: 'Slack', verb: 'Sending', action: `Notifies the ${ROLE.workshop_shift} and the ${ROLE.customer_care}`, result: `Notice posted in the ${TEAMS} channel`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 incident · 8D · 1 notice', result: `${ids.nc} opened · workshop notified` }, milestone: 'teams', audit: { action: 'Notice sent via Slack', detail: `${ROLE.workshop_shift} and ${ROLE.customer_care} · channel ${TEAMS}` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Vehicles in the VW workshop during the saturation', value: H.all.count, sub: `${lots(H.all)} groups · ${hrs(H, H.all.qty)} of workshop time`, icon: 'truck' },
        { label: 'First affected delivery', value: H.first.time, sub: `${H.first.id} · ${H.first.where} · ${H.pl(H.holdCount(H.all, H.first))}${held ? ' · reassigned' : ''}`, icon: 'calendar' }
      ],
      scope: {
        icon: 'truck',
        unit: ['vehicle', 'vehicles'],
        item_noun: ['group', 'groups'],
        qty_unit: 'h',
        per_square: 1,
        items: ITEMS.map((l) => Object.assign({
          id: l.id, title: l.title, sub: l.sub, group: `Bay ${l.lane}`, group_short: `Bay ${l.lane}`,
          count: l.count, qty: l.count * l.hpp, value: Math.round(l.count * l.hpp * RATE * 100) / 100, hold: l.hold
        }, ELSE[l.id] ? { elsewhere: ELSE[l.id] } : {}, GONE[l.id] ? { gone: GONE[l.id] } : {})),
        holds: {
          'ENT-26-70412': { date: '2026-10-07', time: '09:30', where: 'Bay 1', label: 'Golf ABS campaign customers (09:30 appointments)' },
          'ENT-26-70413': { date: '2026-10-07', time: '11:00', where: 'Bay 2', label: 'Subscription customers (Tiguan 30,000 km)' },
          'ENT-26-70415': { date: '2026-10-07', time: '14:00', where: 'Bay 3', label: 'Madrid rental fleet and T-Roc warranty jobs' },
          'ENT-26-70417': { date: '2026-10-07', time: '16:30', where: 'Delivery area', label: 'José María López · Seat León (VIN-2026-MAD-SEAT-03) · Banco Sabadell financing' },
          'ENT-26-70421': { date: '2026-10-08', time: '08:30', where: 'Delivery area', label: 'Private customers · ID.4 deliveries' }
        },
        units: UNITS,
        csv_name: 'vin-vw-workshop-saturation',
        csv_cols: [
          { label: 'Group', key: 'item' },
          { label: 'Model and job', key: 'product' },
          { label: 'Vehicle', key: 'pallet' },
          { label: 'VIN', key: 'sscc', text: true },
          { label: 'Workshop hours', key: 'kg' },
          { label: 'Location', key: 'position' },
          { label: 'Committed delivery', key: 'hold' }
        ],
        labels: {
          items_title: 'Affected order groups and vehicles',
          items_systems: 'iCare Workshop and Salesforce CRM',
          items_where: 'vehicles in the VW workshop,',
          item_col: 'Group',
          at_col: 'In workshop',
          group_col: 'Bay',
          hold_col: 'Committed delivery',
          else_col: 'Outside workshop',
          else_none: 'No vehicles',
          gone_verb: 'served',
          exposed: 'Affected',
          blocked: 'Rescheduled',
          unblocked: 'Not rescheduled',
          block_noun: 'rescheduling',
          block_verb: 'Reschedule',
          hold_verb: 'Reassign',
          held: 'Reassigned',
          holds_label: 'Committed deliveries',
          holds_first: 'the first',
          scope_main: 'Vehicles in the VW workshop during the saturation',
          else_scope: 'Same groups on the lot and in the fleet',
          else_decision: 'To be assessed',
          map_title: 'Vehicle locations',
          map_sub: 'Odoo Inventory · Madrid',
          zone_title: 'VW workshop · Marqués de Soria',
          zone_sub: '6 bays · 33 slots',
          else_title: 'Same groups on the lot and in the fleet',
          else_sub: 'were not in the bays · to be assessed',
          gone_title: 'Served before the alarm',
          legend_exposed: 'Affected by the saturation',
          legend_else: 'To be assessed on the lot or in the fleet',
          csv_button: 'Download VINs (CSV)',
          value_label: 'at workshop rate',
          report_scope: 'Scope of the rescheduling'
        }
      },
      text: {
        proposal_title: 'rescheduling proposal',
        stop_without: 'proposing the rescheduling',
        activates: 'the rescheduling',
        no_proposal: 'no rescheduling proposal',
        idle_log: 'The run stops at the approval: nothing is written to iCare Workshop or Salesforce without the Operations decision.',
        approve_action: 'Approves the rescheduling',
        scope_short: (H) => `${H.pl(H.sc.count)} of ${H.fmt.plural(lots(H.sc), 'group', 'groups')} and ${H.fmt.plural(H.sc.holds.length, 'delivery reassigned', 'deliveries reassigned')}`,
        audit_approved: 'Rescheduling approved',
        audit_approved_detail: (H) => `${H.ids.blq} · ${H.sc.count} vehicles of ${lots(H.sc)} groups in the VW workshop · ${H.sc.holds.length} deliveries reassigned${H.sc.out.length ? ` · scope edited (without ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Rescheduling ${H.ids.blq} approved · ${H.sc.count} vehicles`,
        audit_rejected: 'Rescheduling rejected',
        outcome_rejected: 'Rescheduling rejected · no actions applied',
        toast_done: (H) => `${H.ids.blq} applied · ${H.ids.nc} opened · notice sent via Slack`,
        presenter_applying: 'After approval: rescheduling in iCare Workshop, deliveries reassigned in Salesforce, incident in SAP and notice via Slack.',
        reject_nothing: 'no rescheduling in iCare Workshop, no deliveries reassigned in Salesforce, no incident in SAP and no notice via Slack',
        edit_intro: 'OPE-WORKSHOP-003 requires rescheduling every order with no immediate commitment.'
      },
      approval: {
        id: 'rep-taller-vw',
        approve_label: 'Approve rescheduling',
        policy: 'OPE-ALERT-001 · OPE-WORKSHOP-003 · only Operations approves',
        title: (H) => `Workshop rescheduling · ${H.pl(H.sc.count)} in the VW workshop`,
        summary: (H) => `Reason: load above ${H.fv(H.C.threshold)} for ${H.C.above} min (${H.span}), longer than the ${H.C.minutes} min set by ${H.W.backup ? 'OPE-WORKSHOP-003' : 'the workflow'}${H.critMin ? `, and ${H.critMin} min above ${H.fv(H.crit)}: critical saturation` : ''}. The affected orders are rescheduled and customers are notified until the VW platform staffing is restored.`,
        extra_scope: () => [],
        effects: (H) => [
          `iCare Workshop: rescheduling of ${lots(H.sc)} groups (${H.sc.count} vehicles in the VW workshop)`,
          `Salesforce CRM: ${H.sc.count} vehicles rescheduled and ${H.sc.holds.length} deliveries reassigned`,
          'SAP ERP: incident with an 8D draft',
          `Slack: notice to the ${ROLE.workshop_shift} and the ${ROLE.customer_care}`
        ],
        applied: (H) => [
          `iCare Workshop: ${H.ids.blq} · ${lots(H.sc)} groups (${H.sc.count} vehicles)`,
          `Salesforce CRM: ${H.sc.count} vehicles rescheduled and ${H.sc.holds.length} deliveries reassigned`,
          `SAP ERP: ${H.ids.nc} with an 8D draft`,
          `Slack: notice to the ${ROLE.workshop_shift} and the ${ROLE.customer_care}`
        ]
      },
      result: {
        title: (H) => `Rescheduling ${H.ids.blq} applied and incident ${H.ids.nc} opened`,
        stats: (H) => [
          { label: 'Vehicles rescheduled', value: H.sc.count, tone: 'crit' },
          { label: 'Deliveries reassigned', value: H.sc.holds.length },
          { label: 'Groups rescheduled', value: lots(H.sc) },
          { label: 'Vehicles on the lot and in the fleet to assess', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'calendar', tone: 'crit', title: `Rescheduling ${H.ids.blq}`, systems: ['iCare Workshop', 'Salesforce CRM'],
            kv: [
              ['Status', App.chip('blocked', 'Rescheduled')],
              ['Scope', `${H.pl(H.sc.count)} · ${H.fmt.plural(lots(H.sc), 'group', 'groups')} · ${hrs(H, H.sc.qty)}`],
              ['Value at workshop rate', H.fmt.eur(H.sc.value)],
              ['Deliveries reassigned', H.sc.holds.map((h) => h.id).join(', ')],
              ['Approved by', `${ROLE.ops} (OPE-WORKSHOP-003)`]
            ],
            next: 'Next step per OPE-WORKSHOP-003: confirm the return date of the VW technician with HR and consider support from a technician of another brand with VW training.',
            buttons: [{ action: 'csv', label: 'Rescheduled VINs (CSV)' }]
          },
          {
            icon: 'clipboard', title: `Incident ${H.ids.nc}`, systems: ['SAP ERP'], chip: ['draft', '8D in draft'],
            items: D8(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Download 8D draft (PDF)' }]
          },
          {
            icon: 'send', title: 'Notice to the workshop', systems: ['Slack'], note: H.run.endAt ? `sent at ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              icon: 'message-square', from: 'Agentic Platform · Incidents agent', channel: `channel ${TEAMS}`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: ROLE.workshop_shift, text: `VW workshop rescheduling ${H.ids.blq}, approved by ${H.decision ? H.decision.by : H.W.approver}${H.decision ? ` at ${H.fmt.time(H.decision.at)}` : ''}. Do not assign new appointments to the VW platform until Operations decides otherwise:` },
                { to: ROLE.customer_care, text: `Notify the customers of the reassigned deliveries, starting with José María López (Seat León, VIN-2026-MAD-SEAT-03). Details in ${H.ids.nc} (SAP ERP).` }
              ],
              list: H.sc.holds.map((h) => `${h.id} · ${H.holdWhen(h)} · ${h.where} · ${H.pl(palsOf(H.sc, h))}`)
            }
          }
        ]
      },
      doc: {
        code: 'REG-OPE-020-02',
        lane: 'inc',
        heading: 'Disciplines D1–D8',
        col_d: 'D',
        title: (H) => `8D report · ${H.ids.nc}`,
        subtitle: 'Incident for VW workshop saturation (Marqués de Soria) · draft for review',
        filename: (H) => `8d-draft-${H.ids.nc}`,
        meta: (H) => [['Incident', H.ids.nc], ['Linked rescheduling', H.ids.blq]],
        items: (H) => D8(H),
        reviewer: ROLE.workshop_shift,
        approver: ROLE.ops,
        note: 'Draft generated from the run evidence. The target dates are a proposal: the 8D team confirms them. The root cause is a hypothesis until the Workshop Manager confirms it.'
      },
      report: {
        noun: 'incident report',
        code: 'REG-OPE-012-07',
        title: 'Incident report · VW workshop',
        subtitle: 'Capacity saturation',
        filename: 'incident-report-vw-workshop',
        site_label: 'Site',
        site: 'Madrid · Marqués de Soria',
        description: (H) => `On 07/10/2026 at 05:50, iCare Workshop raised alarm ALM-VW-0550 for the VW workshop (usual load ${H.fv(70)}). The bay load was ${H.C.above} min above ${H.fv(H.C.threshold)} (${H.span}), with a peak of ${H.fv(99)} at 06:15 and ${H.critMin} min above ${H.fv(H.crit)}. At 07:00 the load was ${H.fv(80)}. There were ${H.all.count} vehicles from ${lots(H.all)} order groups in the bays.`,
        criteria: 'OPE-ALERT-001 (escalation if the workshop load exceeds 85 % for more than 15 min) and OPE-WORKSHOP-003 (rescheduling of orders with no immediate commitment; only Operations approves).',
        actions: (H) => [
          `iCare Workshop · ${H.ids.blq}: rescheduling of ${lots(H.sc)} groups (${H.sc.count} vehicles, ${hrs(H, H.sc.qty)} of workshop time; ${H.fmt.eur(H.sc.value)} at workshop rate).`,
          `Salesforce CRM: ${H.sc.count} VINs rescheduled; deliveries reassigned: ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)}, ${h.where})`).join(', ')}.`,
          `SAP ERP · ${H.ids.nc}: incident opened with an 8D draft (REG-OPE-020-02).`,
          `Slack: notice to the ${ROLE.workshop_shift} and the ${ROLE.customer_care} in the ${TEAMS} channel.`
        ],
        pending: (H) => [
          'Confirm with HR the return date of the VW technician on medical leave.',
          'Consider support from a technician of another brand with VW training during the week.',
          'Confirm with the Brand Manager the additional slots for the Golf ABS campaign.',
          `Contact with each customer of the reassigned deliveries: ${ROLE.customer_care}.`
        ].concat(H && hasAnt(H.sc) ? ['Precedent in SAP ERP: INC-2026-0471 (22/09/2026), delivery delay of another Seat due to a missing technician (closed). Relevant for prioritising the delivery for José María López (VIN-2026-MAD-SEAT-03).'] : []),
        reviewer: ROLE.ops,
        final_step: 'Capacity plan',
        final_role: ROLE.workshop_shift,
        note: 'Document subject to Operations review; it does not replace the decision on workshop staffing.'
      },
      not_applied: (H) => [
        { sys: 'iCare Workshop', text: 'No order rescheduling' },
        { sys: 'Salesforce CRM', text: `No delivery reassigned; the ${H.all.holds.length} commitments remain planned` },
        { sys: 'SAP ERP', text: 'No incident' },
        { sys: 'Slack', text: 'No notice to the workshop' }
      ],
      compare: [
        { k: 'People involved', today: '3–4: Workshop Manager, customer care, sales and brand manager', now: 'Operations reviews and decides; workshop and customer care receive the notice with the data' },
        { k: 'Systems queried by hand', today: '5–6: iCare, Salesforce, SAP, Odoo, spreadsheets and phone', now: 'None: the agents query 4 systems and every data point is kept in the log' },
        { k: 'Steps', today: '10–12 manual steps, with waits between people', steps: true },
        { k: 'Time to rescheduling and incident', today: '1–3 h', measured: true },
        { k: 'Audit evidence', today: 'Scattered across emails, screenshots and spreadsheets', now: 'Report REG-OPE-012-07 and the run audit log' }
      ],
      presenter: {
        intro: () => '05:50 alarm in the VW workshop: peak of 99 % at 06:15 and 55 min above 85 %. The first affected delivery is at 09:30.',
        agents: 'Four agents, each with its own system: iCare for the load; Odoo, SAP and Salesforce for vehicles, orders and deliveries; iCare and Salesforce for the rescheduling; SAP and Slack for the incident.',
        waiting: (H) => [
          `The ${H.sc.elseTotal} vehicles of the same groups on the lot and in the fleet stay "to be assessed": they were not in the bays. Nothing has been written to iCare Workshop or Salesforce yet.`,
          'The scope can be edited (remove a group, with a reason) or rejected: if rejected, nothing is applied and it is logged for audit.'
        ],
        rejected: ['Rejected: nothing has been rescheduled, neither in iCare Workshop nor in Salesforce, and there is no incident or notice. The reason is kept in the audit log.', 'The decision always belongs to Operations; the run can be repeated at any time.'],
        done: (H) => [
          `Applied after approval: ${H.ids.blq} in iCare Workshop, ${H.sc.count} vehicles rescheduled and ${H.sc.holds.length} deliveries reassigned in Salesforce, ${H.ids.nc} in SAP with the 8D in draft and a notice via Slack.`,
          'The incident report comes out as a controlled document: code, revision, approvals and run log, ready for a brand audit.'
        ],
        next: { done: 'Open "Download incident report" and then go to "Claim" (right arrow).', no_trigger: 'Go to "From words to workflow", leave 15 min and run again.' }
      }
    }
  });

  /* 8D draft (D1–D8) written by the Incidents agent. */
  function D8(H) {
    const sc = H.sc;
    const ant = hasAnt(sc)
      ? ' Precedent in SAP ERP: INC-2026-0471 (22/09/2026), delivery delay of another Seat due to a missing technician (closed); keep it in mind when prioritising the delivery for José María López (VIN-2026-MAD-SEAT-03, Banco Sabadell financing).'
      : '';
    return [
      { d: 'D1', t: 'Team', text: `Lead: ${ROLE.ops}. Team: ${ROLE.workshop_shift}, ${ROLE.customer_care} and ${ROLE.brand_manager}.`, owner: ROLE.ops, due: '2026-10-07' },
      { d: 'D2', t: 'Problem description', text: `On 07/10/2026 the VW workshop load exceeded ${H.fv(85)} for 55 min (05:50–06:45), with a peak of ${H.fv(99)} at 06:15 and 25 min above ${H.fv(95)}. There were ${H.all.count} vehicles from ${lots(H.all)} order groups in the bays.${ant}`, owner: ROLE.ops, due: '2026-10-07' },
      { d: 'D3', t: 'Containment', text: `${H.ids.blq}: ${sc.count} vehicles rescheduled in iCare Workshop; ${sc.holds.length} deliveries reassigned in Salesforce. Notify each customer and close the schedule to new VW platform appointments.${sc.elseTotal ? ` Assess the ${sc.elseTotal} vehicles of the same groups on the lot and in the fleet, which were not in the bays.` : ''}`, owner: ROLE.workshop_shift, due: '2026-10-07' },
      { d: 'D4', t: 'Root cause (hypothesis)', text: 'Hypothesis to be confirmed by the Workshop Manager: the medical leave of a VW technician (platform capacity at 80 %) coincided with the walk-in arrival of 6 Golfs from the ABS campaign (05:52–06:31).', owner: ROLE.workshop_shift, due: '2026-10-09' },
      { d: 'D5', t: 'Proposed corrective actions', text: 'Require appointments for the Golf ABS campaign; define a support technician from another brand with VW training; consider an early alert when the load exceeds 80 % in iCare.', owner: ROLE.workshop_shift, due: '2026-10-14' },
      { d: 'D6', t: 'Implementation and verification', text: 'Verify the VW workshop load on the next full working day and the punctuality of the reassigned deliveries.', owner: ROLE.ops, due: '2026-10-16' },
      { d: 'D7', t: 'Prevention', text: 'Extend the cross-brand support rule to the rest of the workshop platforms and update OPE-WORKSHOP-003 if needed.', owner: ROLE.ops, due: '2026-10-23' },
      { d: 'D8', t: 'Closure', text: `Close ${H.ids.nc} after verifying effectiveness and confirming the delivery of the ${sc.count} rescheduled vehicles.`, owner: ROLE.ops, due: '2026-10-30' }
    ];
  }
})();
