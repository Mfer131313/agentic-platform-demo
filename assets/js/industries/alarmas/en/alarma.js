/* Guardián Ibérica Instalaciones · alarm with approval: 4G communication loss on 214 panels in Valencia North after a mobile operator maintenance window.
 * Demo scenario with synthetic data (MFM). The functions receive the scene context H
 * (W workflow, C evaluated condition, sc current scope, ids generated on approval, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Panels without 4G communication in Valencia North (partner portals), one reading every 2 min from 05:00 to 06:00. */
  const COUNTS = [2, 2, 3, 2, 3, 58, 112, 163, 196, 214, 221, 226, 229, 231, 233, 235, 236, 237, 238, 239, 240, 241, 238, 232, 224, 214, 205, 190, 150, 96, 38];
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = COUNTS.map((v, i) => ({ time: hhmm(300 + i * 2), value: v }));

  /* Groups of panels without communication at 05:50: 214 panels, 38 without an IP backup path. */
  const ITEMS = [
    { id: 'SA-RES-VLCN', title: 'Sector Alarm · residential', sub: 'Homes in Burjassot, Godella and Rocafort', zone: 'Burjassot', count: 62, nobk: 14, fee: 42, code: 'SAR', hold: 'VIS-26-61103' },
    { id: 'VER-RES-VLCN', title: 'Verisure · residential', sub: 'Homes in Benimaclet, Orriols and Campanar', zone: 'Benimaclet', count: 58, nobk: 9, fee: 44, code: 'VER', hold: 'VIS-26-61104' },
    { id: 'VER-NEG-VLCN', title: 'Verisure · small business', sub: 'Shops with contracted guard service', zone: 'Campanar', count: 24, nobk: 6, fee: 69, code: 'VEN', hold: 'VIS-26-61101' },
    { id: 'SA-NEG-VLCN', title: 'Sector Alarm · small business', sub: 'Shops and offices with video verification', zone: 'Orriols', count: 28, nobk: 5, fee: 67, code: 'SAN', hold: 'VIS-26-61102' },
    { id: 'PRO-RES-VLCN', title: 'Prosegur Alarmas · residential', sub: 'Homes in Rocafort and Godella', zone: 'Rocafort', count: 27, nobk: 3, fee: 43, code: 'PRR', hold: 'VIS-26-61105' },
    { id: 'PRO-NEG-VLCN', title: 'Prosegur Alarmas · small business', sub: 'Neighbourhood shops', zone: 'Rocafort', count: 15, nobk: 1, fee: 66, code: 'PRN', hold: 'VIS-26-61105' }
  ];
  /* Panels in the same cells with degraded 4G signal but no outage, and panels already restored before the alarm. */
  const ELSE = {
    'SA-RES-VLCN': [{ loc: 'CELDA-VLC-N3', count: 11, note: 'Sector Alarm panels with degraded 4G signal, no outage' }],
    'VER-RES-VLCN': [{ loc: 'CELDA-VLC-N4', count: 9, note: 'Verisure panels with degraded 4G signal, no outage' }],
    'VER-NEG-VLCN': [{ loc: 'CELDA-VLC-N3', count: 4, note: 'Verisure shops with degraded 4G signal, no outage' }],
    'PRO-RES-VLCN': [{ loc: 'CELDA-VLC-NO2', count: 6, note: 'Prosegur Alarmas panels with degraded 4G signal, no outage' }]
  };
  const GONE = {
    'SA-RES-VLCN': [{ id: 'RST-26-61090', date: '2026-10-19', time: '05:44', count: 12, to: 'Sector Alarm panels that recovered 4G on their own' }],
    'VER-RES-VLCN': [{ id: 'RST-26-61091', date: '2026-10-19', time: '05:46', count: 15, to: 'Verisure panels that recovered 4G on their own' }]
  };
  /* Affected panels: PAN-VLC-<group>-<n>; the first ones of each group are those without an IP backup path. */
  const UNITS = [];
  ITEMS.forEach((l) => {
    for (let k = 0; k < l.count; k += 1) {
      UNITS.push({ item: l.id, product: l.title, pallet: `${k + 1}/${l.count}`, sscc: `PAN-VLC-${l.code}-${String(k + 1).padStart(3, '0')}`, kg: k < l.nobk ? 'No backup' : 'IP backup', position: `Valencia North · ${l.zone}`, hold: l.hold });
    }
  });

  const ROLE = {
    ops: 'Operations Manager', support: 'Technical Support Manager', support_shift: 'Technical Support Manager',
    maintenance_shift: 'Maintenance Manager', install_shift: 'Installation Manager', customer_care: 'Customer Care', decider: 'Operations Manager'
  };
  const TEAMS = '#soporte-tecnico-vlc';
  const ANT_LOT = 'VER-NEG-VLCN';
  const lots = (sc) => sc.items.length;
  const hasAnt = (sc) => sc.items.some((l) => l.id === ANT_LOT);
  const palsOf = (sc, h) => sc.items.filter((l) => l.hold === h.id).reduce((s, l) => s + l.qty, 0);
  const nobk = (H, q) => `${H.fmt.num(q)} without backup`;

  agenticPackEn('alarmas', {
    alarma: {
      nav: 'Communication alarm',
      title: 'Communication alarm in progress',
      icon: 'activity',
      page_title: 'Valencia North · 4G communication loss',
      alarm_id: 'ALM-COM-0611',
      alarm_time: '05:50',
      source_system: 'Sector Alarm Partner Hub',
      asset: 'Valencia North panels',
      location: 'Valencia North · Burjassot, Benimaclet, Campanar and Rocafort',
      excursion_noun: 'outage',
      workflow_topic: 'panel communication',
      policy_ref: 'PR-COM-003',
      procedures: 'PR-COM-003 · PR-SOP-007',
      decider_short: 'Technical Support',
      approval_node: 'Technical Support approval',
      measure: { short: 'panels without communication', col: 'Panels', unit: 'panels', dec: 0, icon: 'activity' },
      setpoint: 2,
      setpoint_label: 'usual level',
      limit: 40,
      critical: 150,
      min_minutes: 10,
      interval_min: 2,
      series: SERIES,
      peak: 241,
      peak_time: '05:42',
      current: 38,
      current_time: '06:00',
      current_note: 'below the limit since 06:00',
      chart: {
        title: 'Valencia North · panels without 4G communication',
        sub: 'Usual level 2 panels · now 38 (06:00)',
        tab: 'Panels',
        series_label: 'Panels without communication (partner portals)',
        yTicks: [0, 50, 100, 150, 200, 250],
        xTicks: ['05:00', '05:20', '05:40', '06:00']
      },
      event_kv: [
        ['Area', 'Valencia North · Burjassot, Benimaclet, Campanar, Orriols and Rocafort'],
        ['Source', 'Partner Hub and partner portals · 4G communication · reading every 2 min'],
        ['Mobile operator', 'Maintenance on the Valencia North cells since 05:10'],
        ['Site', 'Guardián Ibérica Instalaciones · Paterna (Valencia)']
      ],
      events: [
        { time: '05:10', end: '05:20', text: 'The mobile operator starts maintenance on the Valencia North cells without prior notice to the installer', equipment: '4G network', tone: 'brand', band: 'Operator maintenance' },
        { time: '05:10', end: '05:20', text: 'Panels lose 4G communication: from 3 to 214 in 10 min', equipment: 'Panels', tone: 'warn', band: 'Panel outage', bandTone: 'warn' },
        { time: '05:42', text: 'Outage peak: 241 panels without communication', tone: 'warn' },
        { time: '05:50', text: 'Partner Hub alarm: more than 40 panels without 4G communication', ref: 'ALM-COM-0611', tone: 'crit' },
        { time: '05:52', end: '06:00', text: 'Technical Support checks the cells: 176 panels have an IP backup path and 38 do not', equipment: 'Technical Support', tone: 'brand', band: 'Backup check' },
        { time: '05:56', text: 'The mobile operator restores part of the cells and the outage falls to 150 panels', tone: 'ok' },
        { time: '06:00', text: '38 panels remain without communication and without an IP backup path: no remote monitoring', tone: 'warn' }
      ],
      probable_cause: 'Hypothesis to be confirmed by the Technical Support Manager: the mobile operator maintenance on the Valencia North cells (since 05:10) left the panels without 4G; 38 of them have no IP backup path and remain without remote monitoring.',
      backup: { id: 'wf-comunicacion-respaldo', name: 'Panel communication loss', version: 'v1', threshold: 40, minutes: 10, critical: 150, approver: ROLE.support },
      untouched: 'the partner portals, Salesforce CRM, SAP Business One, Twilio SMS or Slack',
      apply_systems: 'the partner portals, Salesforce CRM, Twilio SMS and Slack',
      llm_cost_usd: 0.04,
      ids: [
        { key: 'blq', prefix: 'OT-2026-', start: 31207, label: 'Work order' },
        { key: 'nc', prefix: 'INC-2026-0', start: 612, label: 'Incident' }
      ],
      block_id_key: 'blq',
      proposer: 'blq',
      lanes: [
        { id: 'mon', name: 'Communication monitor', short: 'Monitor', icon: 'activity', systems: ['Sector Alarm Partner Hub', 'Verisure Partner Portal'], idle: 'Confirms the outage with the partner portal readings', gsub: 'confirms the outage', gsys: ['Partner Hub', 'Verisure'] },
        { id: 'traz', name: 'Traceability', icon: 'git-branch', systems: ['Salesforce CRM', 'SAP Business One', 'Prosegur Partner Portal'], idle: 'Locates panels, customers and backup paths', gsub: 'panels, customers and backup', gsys: ['Salesforce', 'SAP', 'Prosegur'] },
        { id: 'blq', phase: 2, name: 'Failover and visits', icon: 'calendar', systems: ['Verisure Partner Portal', 'Salesforce CRM'], idle: 'Prepares the failover and the visits and requests Technical Support approval', gsub: 'switches over and schedules visits', gsys: ['Partners', 'Salesforce'] },
        { id: 'inc', phase: 2, name: 'Incidents and alerts', icon: 'clipboard', systems: ['Salesforce CRM', 'Twilio SMS', 'Slack'], idle: 'Opens the incident, alerts customers and dispatches maintenance', gsub: 'incident, SMS and alert', gsys: ['Salesforce', 'Twilio', 'Slack'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'Sector Alarm Partner Hub', verb: 'Querying', action: 'Reads the 4G communication status of the Valencia North panels from 05:00 to 06:00, one reading every 2 min', result: `${SERIES.length} readings, no gaps · now ${H.fv(38)} (06:00)`, ms: 1850, set: { volume: `${SERIES.length} communication readings` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'Verisure Partner Portal', verb: 'Querying', action: 'Cross-checks the outage with the mobile operator maintenance calendar and the cell status', result: `Operator maintenance since 05:10 on the Valencia North cells, without prior notice: hypothesis for the ${ROLE.support}`, tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} readings · 7 events`, result: `Outage confirmed: ${H.C.above} min above · peak ${H.fv(241)}` } },
            { lane: 'traz', system: 'Sector Alarm Partner Hub', verb: 'Querying', action: `Lists the panels without communication between ${H.C.start} and ${H.C.end}, by brand and segment`, result: `${a.count} panels in ${lots(a)} groups`, ms: 2100, set: { volume: `${a.count} panels` } },
            { lane: 'traz', system: 'Salesforce CRM', verb: 'Querying', action: 'Resolves customer, contract and contracted service (guard service, video verification) for each panel', result: `${lots(a)} contract groups · ${H.fmt.eur(a.value)} in monthly fees`, ms: 2600, set: { volume: `${a.count} panels · ${lots(a)} groups` }, reveal: 'lots' },
            { lane: 'traz', system: 'SAP Business One', verb: 'Querying', action: `Confirms panel model, 4G module and IP backup path for the ${lots(a)} groups`, result: `${a.count - a.qty} panels with IP backup and ${a.qty} without: shops with contracted guard service are the most sensitive`, ms: 1900 },
            { lane: 'traz', system: 'Prosegur Partner Portal', verb: 'Querying', action: 'Looks for panels in the same cells with degraded signal but no outage', result: `${a.elseTotal} panels in CELDA-VLC-N3, N4 and NO2, to assess · ${H.goneTotal} already restored before the alarm`, ms: 1700, reveal: 'map' },
            { lane: 'traz', system: 'Salesforce CRM', verb: 'Querying', action: 'Checks the visits and service commitments for the panels without backup', result: `${a.holds.length} visit windows; the first, ${H.first.id}, at ${H.first.time} in ${H.first.where}`, tone: 'warn', ms: 2200, set: { volume: `${a.count} panels · ${lots(a)} groups · ${a.holds.length} visits`, result: `First priority visit at ${H.first.time}` }, milestone: 'traz', audit: { action: 'Panels and contracts identified', detail: `${a.count} panels in ${lots(a)} groups without communication · ${a.qty} without IP backup · ${a.holds.length} visit windows · ${a.elseTotal} panels with degraded signal in the same cells` } },
            { lane: 'blq', node: 'apr', system: 'Procedures', verb: 'Analysing', action: 'Applies PR-COM-003 and PR-SOP-007 to this outage', result: 'Switch panels that have a backup path to it, visit the others with priority and alert customers; only Technical Support approves', ms: 1300 },
            { lane: 'blq', node: 'apr', system: 'Language model', verb: 'Drafting', action: 'Drafts the failover and visit proposal with the evidence', result: `Proposal: ${a.count - a.qty} panels to the backup path and ${a.qty} priority visits in ${a.holds.length} windows; ${a.elseTotal} panels with degraded signal, to assess`, ms: 7000, set: { volume: `${a.count} panels · ${a.qty} visits` } },
            { lane: 'blq', node: 'apr', system: 'Agentic Platform', verb: 'Evaluating', action: `Requests approval from the ${H.W.approver} before writing to the partner portals and Salesforce`, result: 'Waiting for the Technical Support decision', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Proposal sent to Technical Support' }, milestone: 'prop', audit: { action: 'Failover and visit proposal sent for approval', detail: `${a.count} panels in ${lots(a)} groups · ${a.qty} priority visits · approver ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          const ships = sc.holds.map((h) => h.id).join(', ');
          return [
            { lane: 'blq', system: 'Verisure Partner Portal', verb: 'Applying', action: `Forces the switch to the IP backup path for ${H.pl(sc.count - sc.qty)} with backup and verifies their monitoring`, result: `${ids.blq} · ${sc.count - sc.qty} panels monitored over IP`, tone: 'ok', ms: 2400, milestone: 'blq', audit: { action: 'Failover applied', detail: `${ids.blq} · partner portals · ${sc.count - sc.qty} panels in ${lots(sc)} groups to the backup path` } },
            { lane: 'blq', system: 'Salesforce CRM', verb: 'Applying', action: `Schedules ${sc.qty} priority visits to the panels without backup and assigns their ${sc.holds.length} windows`, result: `${sc.qty} visits scheduled · ${sc.holds.length} windows, the first ${H.holdWhen(sc.holds[0]).includes('/') ? 'on' : 'at'} ${H.holdWhen(sc.holds[0])}`, tone: 'ok', ms: 2100, set: { result: `${ids.blq} applied · ${sc.holds.length} visit windows` }, milestone: 'wms', audit: { action: 'Priority visits scheduled', detail: `Salesforce CRM · ${sc.qty} panels without backup · ${ships}` } },
            { lane: 'inc', system: 'Salesforce CRM', verb: 'Applying', action: 'Opens the communication incident with the panel curve, the events and the panel list', result: `${ids.nc} opened${hasAnt(sc) ? ' · precedent INC-2026-0463 linked' : ''}`, tone: 'ok', ms: 1900, set: { volume: '1 incident' }, milestone: 'nc', audit: { action: 'Incident opened', detail: `${ids.nc} · Salesforce CRM · communication outage in Valencia North` } },
            { lane: 'inc', system: 'Language model', verb: 'Drafting', action: 'Drafts the 8D (D1–D8) with owners by role', result: '8D draft ready for Technical Support review', ms: 7800, set: { volume: '1 incident · 8D drafted' }, milestone: 'd8', audit: { action: '8D draft written', detail: `${ids.nc} · D1–D8 · pending Technical Support review` } },
            { lane: 'inc', system: 'Twilio SMS', verb: 'Sending', action: `Sends an SMS to the customers of the ${sc.count} affected panels with the status of their alarm`, result: `${sc.count} SMS sent via Twilio`, tone: 'ok', ms: 1600, set: { volume: '1 incident · 8D · SMS sent' }, audit: { action: 'SMS sent to customers', detail: `Twilio SMS · ${sc.count} customers in ${lots(sc)} groups` } },
            { lane: 'inc', system: 'Slack', verb: 'Sending', action: `Notifies the ${ROLE.maintenance_shift} and ${ROLE.customer_care}`, result: `Notification posted in channel ${TEAMS}`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 incident · 8D · SMS · 1 alert', result: `${ids.nc} opened · maintenance notified` }, milestone: 'teams', audit: { action: 'Slack notification sent', detail: `${ROLE.maintenance_shift} and ${ROLE.customer_care} · channel ${TEAMS}` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Panels without 4G communication', value: H.all.count, sub: `${lots(H.all)} groups · ${nobk(H, H.all.qty)}`, icon: 'activity' },
        { label: 'First priority visit', value: H.first.time, sub: `${H.first.id} · ${H.first.where} · ${nobk(H, palsOf(H.all, H.first))}${held ? ' · scheduled' : ''}`, icon: 'calendar' }
      ],
      scope: {
        icon: 'activity',
        unit: ['panel', 'panels'],
        item_noun: ['group', 'groups'],
        qty_unit: 'without backup',
        per_square: 1,
        items: ITEMS.map((l) => Object.assign({
          id: l.id, title: l.title, sub: l.sub, group: l.zone, group_short: l.zone,
          count: l.count, qty: l.nobk, value: l.count * l.fee, hold: l.hold
        }, ELSE[l.id] ? { elsewhere: ELSE[l.id] } : {}, GONE[l.id] ? { gone: GONE[l.id] } : {})),
        holds: {
          'VIS-26-61101': { date: '2026-10-19', time: '08:00', where: 'Campanar', label: 'Shops with contracted guard service (Verisure): 6 panels without backup' },
          'VIS-26-61102': { date: '2026-10-19', time: '08:45', where: 'Orriols', label: 'Sector Alarm shops and offices with video verification: 5 panels without backup' },
          'VIS-26-61103': { date: '2026-10-19', time: '09:30', where: 'Burjassot and Godella', label: 'Sector Alarm homes: 14 panels without backup' },
          'VIS-26-61104': { date: '2026-10-19', time: '10:30', where: 'Benimaclet and Orriols', label: 'Verisure homes: 9 panels without backup' },
          'VIS-26-61105': { date: '2026-10-19', time: '12:00', where: 'Rocafort', label: 'Prosegur Alarmas homes and shops: 4 panels without backup' }
        },
        units: UNITS,
        csv_name: 'panels-without-communication-valencia-north',
        csv_cols: [
          { label: 'Group', key: 'item' },
          { label: 'Brand and segment', key: 'product' },
          { label: 'Panel', key: 'pallet' },
          { label: 'Panel ID', key: 'sscc', text: true },
          { label: 'Backup path', key: 'kg' },
          { label: 'Area', key: 'position' },
          { label: 'Priority visit', key: 'hold' }
        ],
        labels: {
          items_title: 'Groups of affected panels',
          items_systems: 'the partner portals and Salesforce CRM',
          items_where: 'panels without communication,',
          item_col: 'Group',
          at_col: 'Without communication',
          group_col: 'Area',
          hold_col: 'Priority visit',
          else_col: 'Degraded signal',
          else_none: 'No panels',
          gone_verb: 'restored',
          exposed: 'Affected',
          blocked: 'Switched over',
          unblocked: 'Not switched',
          block_noun: 'failover',
          block_verb: 'Switch over and visit',
          hold_verb: 'Schedule',
          held: 'Scheduled',
          holds_label: 'Priority visits',
          holds_first: 'the first',
          scope_main: 'Panels without 4G communication',
          else_scope: 'Panels with degraded signal in the same cells',
          else_decision: 'To assess',
          map_title: 'Panel locations',
          map_sub: 'Partner Hub · Valencia North',
          zone_title: 'Valencia North · 4G coverage',
          zone_sub: '6 groups · 214 panels',
          else_title: 'Same cells with degraded signal',
          else_sub: 'no outage · to assess',
          gone_title: 'Restored before the alarm',
          legend_exposed: 'Without 4G communication',
          legend_else: 'To assess: degraded signal',
          csv_button: 'Download panels (CSV)',
          value_label: 'in monthly fees',
          report_scope: 'Scope of the failover'
        }
      },
      text: {
        proposal_title: 'failover and visit proposal',
        stop_without: 'propose the failover',
        activates: 'the failover',
        no_proposal: 'no failover proposal',
        idle_log: 'Execution stops at approval: nothing is written to the partner portals or Salesforce without the Technical Support decision.',
        approve_action: 'Approves the failover and the visits',
        scope_short: (H) => `${H.pl(H.sc.count)} in ${H.fmt.plural(lots(H.sc), 'group', 'groups')} and ${H.fmt.plural(H.sc.holds.length, 'priority visit', 'priority visits')}`,
        audit_approved: 'Failover and visits approved',
        audit_approved_detail: (H) => `${H.ids.blq} · ${H.sc.count} panels in ${lots(H.sc)} groups · ${H.sc.qty} visits in ${H.sc.holds.length} windows${H.sc.out.length ? ` · scope edited (without ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Failover ${H.ids.blq} approved · ${H.sc.count} panels`,
        audit_rejected: 'Failover rejected',
        outcome_rejected: 'Failover rejected · no actions applied',
        toast_done: (H) => `${H.ids.blq} applied · ${H.ids.nc} opened · Slack notification sent`,
        presenter_applying: 'After approval: failover in the partner portals, visits in Salesforce, SMS to customers via Twilio and a Slack notification.',
        reject_nothing: 'no failover in the partner portals, no visits in Salesforce, no SMS to customers and no Slack notification',
        edit_intro: 'PR-COM-003 requires switching every panel that has a backup path and visiting with priority those that do not.'
      },
      approval: {
        id: 'conm-paneles-vlc',
        approve_label: 'Approve failover and visits',
        policy: 'PR-COM-003 · PR-SOP-007 · only Technical Support approves',
        title: (H) => `Failover and visits · ${H.pl(H.sc.count)} without communication in Valencia North`,
        summary: (H) => `Reason: peak of ${H.fv(241)} and more than ${H.fv(H.C.threshold)} for ${H.C.above} min (${H.span}), above the ${H.C.minutes} min set by ${H.W.backup ? 'PR-COM-003' : 'the workflow'}${H.critMin ? `, and ${H.critMin} min above ${H.fv(H.crit)}: critical outage` : ''}. Panels that have a backup path are switched to it and the ${H.sc.qty} that do not are visited with priority to restore remote monitoring.`,
        extra_scope: () => [],
        effects: (H) => [
          `Partner portals: switch ${H.pl(H.sc.count - H.sc.qty)} to the IP backup path`,
          `Salesforce CRM: ${H.sc.qty} priority visits in ${H.sc.holds.length} windows`,
          'Twilio SMS: notification to the customers of the affected panels',
          `Slack: notification to the ${ROLE.maintenance_shift} and ${ROLE.customer_care}`
        ],
        applied: (H) => [
          `Partner portals: ${H.ids.blq} · ${H.sc.count - H.sc.qty} panels to the backup path`,
          `Salesforce CRM: ${H.sc.qty} priority visits scheduled in ${H.sc.holds.length} windows`,
          `Salesforce CRM: ${H.ids.nc} with 8D draft`,
          `Twilio SMS and Slack: customers and ${ROLE.maintenance_shift} notified`
        ]
      },
      result: {
        title: (H) => `Failover ${H.ids.blq} applied and incident ${H.ids.nc} opened`,
        stats: (H) => [
          { label: 'Panels switched to backup', value: H.sc.count - H.sc.qty, tone: 'crit' },
          { label: 'Priority visits', value: H.sc.qty },
          { label: 'Panel groups', value: lots(H.sc) },
          { label: 'Panels with degraded signal to assess', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'calendar', tone: 'crit', title: `Work order ${H.ids.blq}`, systems: ['Verisure Partner Portal', 'Salesforce CRM'],
            kv: [
              ['Status', App.chip('blocked', 'Switched over')],
              ['Scope', `${H.pl(H.sc.count)} · ${H.fmt.plural(lots(H.sc), 'group', 'groups')} · ${nobk(H, H.sc.qty)}`],
              ['Monthly fees affected', H.fmt.eur(H.sc.value)],
              ['Scheduled visits', H.sc.holds.map((h) => h.id).join(', ')],
              ['Approved by', `${ROLE.support} (PR-COM-003)`]
            ],
            next: 'Next step under PR-COM-003: confirm with the mobile operator that the maintenance has ended and claim the prior notice we did not receive as installer.',
            buttons: [{ action: 'csv', label: 'Affected panels (CSV)' }]
          },
          {
            icon: 'clipboard', title: `Incident ${H.ids.nc}`, systems: ['Salesforce CRM'], chip: ['draft', '8D drafted'],
            items: D8(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Download 8D draft (PDF)' }]
          },
          {
            icon: 'send', title: 'Maintenance notification', systems: ['Slack', 'Twilio SMS'], note: H.run.endAt ? `sent at ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              icon: 'message-square', from: 'Agentic Platform · Incidents agent', channel: `channel ${TEAMS}`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: ROLE.maintenance_shift, text: `Valencia North failover ${H.ids.blq}, approved by ${H.decision ? H.decision.by : H.W.approver}${H.decision ? ` at ${H.fmt.time(H.decision.at)}` : ''}. Dispatch the priority visits, starting with the shops with contracted guard service:` },
                { to: ROLE.customer_care, text: `The customers of the ${H.sc.count} panels have already received a Twilio SMS; handle calls from the ${H.sc.qty} without backup. Details in ${H.ids.nc} (Salesforce CRM).` }
              ],
              list: H.sc.holds.map((h) => `${h.id} · ${H.holdWhen(h)} · ${h.where} · ${palsOf(H.sc, h)} visits`)
            }
          }
        ]
      },
      doc: {
        code: 'REG-COM-020-02',
        lane: 'inc',
        heading: 'Disciplines D1–D8',
        col_d: 'D',
        title: (H) => `8D report · ${H.ids.nc}`,
        subtitle: '4G communication outage in Valencia North · draft for review',
        filename: (H) => `8d-draft-${H.ids.nc}`,
        meta: (H) => [['Incident', H.ids.nc], ['Associated work order', H.ids.blq]],
        items: (H) => D8(H),
        reviewer: ROLE.support,
        approver: ROLE.ops,
        note: 'Draft generated from the execution evidence. Target dates are a proposal: the 8D team confirms them. The root cause is a hypothesis until the Technical Support Manager confirms it.'
      },
      report: {
        noun: 'incident report',
        code: 'REG-COM-012-07',
        title: 'Incident report · panel communication',
        subtitle: '4G communication outage',
        filename: 'incident-report-panel-communication',
        site_label: 'Area',
        site: 'Valencia North',
        description: (H) => `On 19/10/2026 at 05:50, the Sector Alarm Partner Hub raised alarm ALM-COM-0611 in Valencia North (usual level ${H.fv(2)}). Panels without 4G communication stayed ${H.C.above} min above ${H.fv(H.C.threshold)} (${H.span}), with a peak of ${H.fv(241)} at 05:42 and ${H.critMin} min above ${H.fv(H.crit)}. At 06:00, ${H.fv(38)} were still without communication. At 05:50 there were ${H.all.count} panels in ${lots(H.all)} groups without communication, ${H.all.qty} of them without an IP backup path.`,
        criteria: 'PR-COM-003 (escalation if more than 40 panels lose communication for more than 10 min) and PR-SOP-007 (customer care after a monitoring incident; only Technical Support approves the failover).',
        actions: (H) => [
          `Partner portals · ${H.ids.blq}: ${H.sc.count - H.sc.qty} panels in ${lots(H.sc)} groups switched to the IP backup path.`,
          `Salesforce CRM: ${H.sc.qty} priority visits to panels without backup; windows: ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)}, ${h.where})`).join(', ')}.`,
          `Salesforce CRM · ${H.ids.nc}: incident opened with 8D draft (REG-COM-020-02).`,
          `Twilio SMS: notification to the customers of ${H.sc.count} panels. Slack: notification to the ${ROLE.maintenance_shift} and ${ROLE.customer_care} in channel ${TEAMS}.`
        ],
        pending: (H) => [
          'Confirm with the mobile operator that the maintenance has ended and the status of the Valencia North cells.',
          'Assess the panels with degraded signal in CELDA-VLC-N3, N4 and NO2 before they drop.',
          'Consider installing an IP backup path on the panels that do not have one, starting with shops with guard service.',
          `Contact the customers without backup until monitoring is restored: ${ROLE.customer_care}.`
        ].concat(H && hasAnt(H.sc) ? ['Precedent in Salesforce CRM: INC-2026-0463 (24/09/2026), communication loss at a Verisure shop after an operator antenna change (closed). Relevant to prioritising visits to shops with contracted guard service.'] : []),
        reviewer: ROLE.ops,
        final_step: 'IP backup plan',
        final_role: ROLE.support,
        note: 'Document subject to Operations review; it does not replace the decision on installations without backup.'
      },
      not_applied: (H) => [
        { sys: 'Partner portals', text: 'No switch to the backup path' },
        { sys: 'Salesforce CRM', text: `No visit scheduled; the ${H.all.holds.length} windows remain unassigned` },
        { sys: 'Twilio SMS', text: 'No SMS to customers' },
        { sys: 'Slack', text: 'No notification to maintenance' }
      ],
      compare: [
        { k: 'People involved', today: '3–4: technical support, maintenance, customer care and dispatch', now: 'Technical Support reviews and decides; maintenance and customer care receive the notification with the data' },
        { k: 'Systems queried by hand', today: '5–6: three partner portals, Salesforce, SAP, spreadsheets and phone', now: 'None: the agents query 5 systems and every data point is recorded' },
        { k: 'Steps', today: '10–12 manual steps, with waits between people', steps: true },
        { k: 'Time to failover and visits', today: '1–3 h', measured: true },
        { k: 'Audit evidence', today: 'Spread across emails, screenshots and spreadsheets', now: 'Report REG-COM-012-07 and execution audit trail' }
      ],
      presenter: {
        intro: () => 'Alarm at 05:50 in Valencia North: 214 panels without 4G communication, peak of 241 at 05:42 and 50 min above 40. The first priority visit is at 08:00.',
        agents: 'Four agents, each with its own system: the partner portals for communication; Salesforce, SAP and Prosegur for panels, customers and backup; the portals and Salesforce for the failover and visits; Salesforce, Twilio and Slack for the incident and notifications.',
        waiting: (H) => [
          `The ${H.sc.elseTotal} panels with degraded signal in the same cells stay under assessment: they have not dropped. Nothing has been written to the partner portals or Salesforce yet.`,
          'The scope can be edited (remove a group, with a reason) or rejected: if rejected, nothing is applied and it is logged for audit.'
        ],
        rejected: ['Rejected: nothing has been switched over and no visits scheduled, with no incident or notification. The reason is kept in the audit log.', 'The decision always rests with Technical Support; it can be run again at any time.'],
        done: (H) => [
          `Applied after approval: ${H.ids.blq} with ${H.sc.count - H.sc.qty} panels to the backup path, ${H.sc.qty} priority visits in Salesforce, ${H.ids.nc} with the 8D drafted, SMS to customers and a Slack notification.`,
          'The incident report comes out as a controlled document: code, revision, approvals and execution log, ready for a partner audit.'
        ],
        next: { done: 'Open Download incident report and then go to Complaint (right arrow).', no_trigger: 'Go to From words to workflow, wait 10 min and run again.' }
      }
    }
  });

  /* 8D draft (D1–D8) written by the Incidents agent. */
  function D8(H) {
    const sc = H.sc;
    const ant = hasAnt(sc)
      ? ' Precedent in Salesforce CRM: INC-2026-0463 (24/09/2026), communication loss at a Verisure shop after an operator antenna change (closed); take it into account when prioritising visits to shops with contracted guard service.'
      : '';
    return [
      { d: 'D1', t: 'Team', text: `Lead: ${ROLE.support}. Team: ${ROLE.maintenance_shift}, ${ROLE.customer_care} and ${ROLE.install_shift}.`, owner: ROLE.support, due: '2026-10-19' },
      { d: 'D2', t: 'Problem description', text: `On 19/10/2026 panels without 4G communication in Valencia North exceeded ${H.fv(40)} for ${H.C.above} min (${H.span}), with a peak of ${H.fv(241)} at 05:42 and ${H.critMin} min above ${H.fv(150)}. At 05:50 there were ${H.all.count} panels in ${lots(H.all)} groups without communication, ${H.all.qty} without an IP backup path.${ant}`, owner: ROLE.support, due: '2026-10-19' },
      { d: 'D3', t: 'Containment', text: `${H.ids.blq}: ${sc.count - sc.qty} panels switched to the IP backup path; ${sc.qty} priority visits scheduled in ${sc.holds.length} windows. Notify each customer by SMS and handle calls from panels without backup.${sc.elseTotal ? ` Assess the ${sc.elseTotal} panels with degraded signal in the same cells, which have not dropped.` : ''}`, owner: ROLE.maintenance_shift, due: '2026-10-19' },
      { d: 'D4', t: 'Root cause (hypothesis)', text: 'Hypothesis to be confirmed by the Technical Support Manager: the mobile operator maintenance on the Valencia North cells (since 05:10) left the panels without 4G; 38 of them have no IP backup path.', owner: ROLE.support, due: '2026-10-21' },
      { d: 'D5', t: 'Proposed corrective actions', text: 'Require prior notice from the mobile operator for maintenance on the cells that serve our portfolio; install an IP backup path on the panels that lack one; consider an early alert when more than 40 panels lose communication.', owner: ROLE.support, due: '2026-10-26' },
      { d: 'D6', t: 'Implementation and verification', text: 'Verify panel communication in the next operator maintenance window and the punctuality of the priority visits.', owner: ROLE.ops, due: '2026-10-30' },
      { d: 'D7', t: 'Prevention', text: 'Extend the IP backup rule to the rest of the zones in Valencia, Alicante and Castellón and update PR-COM-003 if needed.', owner: ROLE.ops, due: '2026-11-13' },
      { d: 'D8', t: 'Closure', text: `Close ${H.ids.nc} after verifying effectiveness and confirming remote monitoring of the ${sc.count} affected panels.`, owner: ROLE.ops, due: '2026-11-20' }
    ];
  }
})();
