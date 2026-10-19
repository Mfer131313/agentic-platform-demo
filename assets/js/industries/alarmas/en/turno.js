/* Guardián Ibérica Instalaciones · shift summary (scene «turno»), English. Demo scenario with synthetic data (MFM). */
agenticPackEn('alarmas', {
  turno: (function () {
    'use strict';
    /* Panels without 4G communication in Valencia North, 05:00 to 06:30 (readings every 5 min plus the 05:42 peak). */
    const PANELES = [['05:00', 0], ['05:05', 0], ['05:10', 9], ['05:15', 47], ['05:20', 96], ['05:25', 148], ['05:30', 191], ['05:35', 224], ['05:40', 238], ['05:42', 241], ['05:45', 236], ['05:50', 214], ['05:55', 214], ['06:00', 214], ['06:05', 214], ['06:10', 214], ['06:15', 214], ['06:20', 214], ['06:25', 214], ['06:30', 214]];
    const AGENT = 'Daily operations report';

    const items = [
      { code: 'COM-4G', name: 'Panels without 4G communication · Valencia North (ALM-COM-0611)', tag: 'ALARM', area: 'Technical support · Partner Portals of the three brands', metric: 'panels without communication', reading: '214 panels', baseline: '0 panels', limits: 'warning > 50 · critical > 100 panels', status: 'critical',
        note: '4G network down since 05:10 after a mobile operator maintenance window: 214 panels (peak of 241 at 05:42), mostly Sector Alarm and Verisure, without remote supervision. Switch to the backup path and visit the 38 without one.' },
      { code: 'PIR-2607', name: 'Lot PIR-2607-A · PIR-200 detector (REC-2026-1019)', tag: 'RECALL', area: 'Warehouse and homes with the detector installed', metric: 'homes pending notification', reading: '912 homes', baseline: '0 homes', limits: 'warning > 50 · critical > 200 homes', status: 'critical',
        note: 'Lithium battery with overheating risk (manufacturer Sentinela Electronics): 1,386 units installed in 912 homes (Verisure 540, Sector Alarm 214, Prosegur Alarmas 158), 960 in the warehouse and 54 returned. Goal: locate and notify within 4 h.' },
      { code: 'FAL-0619', name: 'Call-out charges claimed · Marta Soler Pons (CLM-2026-0619)', area: 'Salesforce CRM · Sector Alarm Partner Hub', metric: 'amount claimed for false alarms', reading: 'EUR 78.00', baseline: 'EUR 0', limits: 'warning > 0 · critical > EUR 39', status: 'critical',
        note: 'Two security guard call-out charges (2 x EUR 39.00) for false alarms on 2026-10-12 and 2026-10-14 under contract SA-2026-77412; the customer threatens to cancel and incur a EUR 180 penalty. Root cause: living room PIR sensor with a low battery and no warning.' },
      { code: 'COL-SOP', name: 'Technical line queue', area: 'Technical support · 12 operators', metric: 'calls on hold', reading: '47 calls', baseline: '< 12 calls', limits: 'warning > 25 · critical > 40 calls', status: 'critical',
        note: 'The communication outage drives calls from customers who see the fault notice on their panel. Prioritise Valencia North calls and send an information SMS to bring the queue down.' },
      { code: 'SIN-RESP', name: 'Panels without a backup path · Valencia North', area: 'Technical support · Partner Portals', metric: 'panels with no IP backup or second SIM', reading: '38 panels', baseline: '0 panels', limits: 'warning > 20 · critical > 50 panels', status: 'warning',
        note: 'Of the 214 panels down, 176 switch to the backup path; the other 38 have no IP or second SIM and need a priority visit today.' },
      { code: 'MNT-VENC', name: 'Overdue preventive maintenance', area: 'Maintenance · SAP Business One', metric: 'annual checks overdue by more than 30 days', reading: '27 checks', baseline: '15 checks', limits: 'warning > 20 · critical > 40 checks', status: 'warning',
        note: 'Todays priority visits push back PR-MAN-004 checks. Reschedule them this week so the brands contractual deadline is not exceeded.' },
      { code: 'STK-BAT', name: 'Spare lithium batteries', area: 'Paterna warehouse · SAP Business One', metric: 'units available', reading: '420 units', baseline: '900 units', limits: 'warning < 600 · critical < 300 units', status: 'warning',
        note: 'The PIR-2607-A lot recall and low-battery replacements draw down stock: order replenishment before it falls below 300 units.' },
      { code: 'INS-HOY', name: 'Scheduled installations', area: 'Installations · Salesforce CRM', metric: 'installations scheduled today', reading: '61 installations', baseline: '≥ 50 installations', limits: 'warning < 40 · critical < 25', status: null, note: '' },
      { code: 'MNT-HOY', name: 'Scheduled maintenance visits', area: 'Maintenance · SAP Business One', metric: 'maintenance visits scheduled today', reading: '118 visits', baseline: '≥ 100 visits', limits: 'warning < 80 · critical < 60', status: null, note: '' },
      { code: 'OT-URG', name: 'Urgent work orders', area: 'Dispatch · Salesforce CRM', metric: 'urgent orders open', reading: '9 orders', baseline: '< 15 orders', limits: 'warning > 15 · critical > 25', status: null, note: '' },
      { code: 'FLT-RUTA', name: 'Operational vans', area: 'Fleet · Samsara Fleet', metric: 'vans on the road', reading: '58 of 62', baseline: '≥ 55 vans', limits: 'warning < 50 · critical < 42', status: null, note: '' }
    ];

    const news = [
      { id: 'OT-2026-31101', equipment: 'COM-4G', priority: 'Urgent · Alarm', tone: 'crit', owner: 'Technical Support Manager',
        action: 'Switch the 176 panels that have one to the backup path, verify each signal and open the incident with the mobile operator. Responds to ALM-COM-0611 and PR-COM-003.' },
      { id: 'OT-2026-31102', equipment: 'SIN-RESP', priority: 'High', tone: 'crit', owner: 'Maintenance Manager',
        action: 'Priority visit to the 38 Valencia North panels without a backup path, starting with Sector Alarm: fit a second SIM or IP repeater and check remote supervision.' },
      { id: 'OT-2026-31103', equipment: 'PIR-2607', priority: 'Urgent · Recall', tone: 'crit', owner: 'Warehouse Manager and Customer Care',
        action: 'Block the 960 PIR-200 detectors of lot PIR-2607-A in the warehouse and locate the 912 homes with the unit installed to notify within 4 h. Responds to REC-2026-1019 and PR-QLT-006.' },
      { id: 'OT-2026-31104', equipment: 'COL-SOP', priority: 'Medium', tone: 'warn', owner: 'Technical Support Manager',
        action: 'Queue of 47 calls: route Valencia North calls to a single script, reinforce the line with 2 operators from the afternoon shift and send the information SMS through Twilio.' },
      { id: 'OT-2026-31105', equipment: 'STK-BAT', priority: 'Medium', tone: 'warn', owner: 'Warehouse Manager',
        action: 'Lithium battery stock at 420 units (reference 900): order replenishment from the supplier and reserve what is needed for the PIR-2607-A lot replacements.' }
    ];
    const updates = [
      { id: 'CLM-2026-0619', equipment: 'FAL-0619', priority: 'High (proposed)', tone: 'crit', owner: 'Customer Care',
        action: 'The evidence is added (living room PIR sensor with a low battery and no warning, false alarms on 2026-10-12 and 2026-10-14) to the open case of Marta Soler Pons. No duplicate case is created.' },
      { id: 'MNT-VENC-2026-10', equipment: 'MNT-VENC', priority: 'No change', tone: 'warn', owner: 'Maintenance Manager',
        action: 'Todays reading (27 overdue checks) is added to the open overdue maintenance list. No duplicate ticket is created.' }
    ];

    return {
      title: 'Paterna (Valencia) · morning shift',
      nav: 'Shift summary',
      clockLabel: 'Hub time',
      decider: 'the Operations Manager',
      kpis: [
        { label: 'Panels without communication', value: 214, sub: 'Valencia North · 38 without a backup path', icon: 'activity', tone: 'crit', href: '#alarma' },
        { label: 'Priority visits', value: 38, sub: '61 installations and 118 maintenance visits today · 9 urgent', icon: 'wrench', href: '#alarma' },
        { label: 'Open complaints', value: 1, sub: 'CLM-2026-0619 · acknowledge in 24 h, resolve in 10 working days', icon: 'mail', href: '#reclamacion' },
        { label: 'Indicators with an alert', value: '7 of 11', sub: '4 critical · 3 warnings · 06:00 readings', icon: 'activity', action: 'scroll-parte' }
      ],
      map: {
        title: 'Hub floor plan · Paterna (Valencia)',
        sub: 'Readings from the 06:00 report and the panels at 06:30 · select an item to see its detail',
        icon: 'factory',
        readonly: 'Agentic Platform reads Salesforce CRM, SAP Business One, the Partner Portals of the three brands and Samsara Fleet; it does not change contracts, invoices or panel configuration on its own',
        zones: [
          { id: 'ins', title: 'Installations', sub: 'Salesforce CRM · 74 installer technicians', items: [
            { code: 'INS-HOY', name: 'Installations today', reading: '61', status: 'ok', kv: [['Reference', '≥ 50 installations'], ['Procedure', 'PR-INS-001 (grade 2)'], ['Branches', 'Paterna · Alicante · Castellón']] },
            { code: 'CRM-INS', name: 'Brand contracts', reading: null, status: null, note: 'Portfolio of about 38,000 active installations: Verisure 15,200, Sector Alarm 12,100 and Prosegur Alarmas 10,700.', kv: [['Brands', 'Verisure · Sector Alarm · Prosegur Alarmas'], ['System', 'Salesforce CRM']] },
            { code: 'PIR-2607', name: 'Lot PIR-2607-A · homes with the detector', reading: '912', status: 'crit', tags: ['REC-2026-1019'], go: 'retirada', goLabel: 'Open the recall',
              note: '1,386 PIR-200 detectors installed in 912 homes: Verisure 540, Sector Alarm 214 and Prosegur Alarmas 158. Lithium battery with overheating risk.',
              kv: [['Received', '2,400 units'], ['Installed', '1,386'], ['In warehouse', '960'], ['Returned', '54'], ['Manufacturer', 'Sentinela Electronics']] }
          ] },
          { id: 'man', title: 'Maintenance', sub: 'SAP Business One · annual check PR-MAN-004', items: [
            { code: 'MNT-HOY', name: 'Maintenance visits today', reading: '118', status: 'ok', kv: [['Reference', '≥ 100 visits'], ['Urgent', '9 orders']] },
            { code: 'SIN-RESP', name: 'Panels without a backup path', reading: '38', status: 'warn', go: 'alarma', goLabel: 'Open the alarm',
              note: 'Valencia North panels with no IP or second SIM: no remote supervision until the visit.', kv: [['Limits', 'warning > 20 · critical > 50 panels'], ['Alarm', 'ALM-COM-0611']] },
            { code: 'MNT-VENC', name: 'Overdue checks', reading: '27', status: 'warn', note: 'Annual checks more than 30 days late; todays priority visits push them back.', kv: [['Reference', '15 checks'], ['Limits', 'warning > 20 · critical > 40']] }
          ] },
          { id: 'sop', title: 'Technical support', sub: 'Technical line and ARC · 12 operators', items: [
            { code: 'COM-4G', name: 'Panels without 4G communication', reading: '214', status: 'crit', go: 'alarma', goLabel: 'Open the alarm',
              note: 'Down since 05:10 after a mobile operator maintenance window. Peak of 241 panels at 05:42; alarm at 05:50. Mainly Sector Alarm and Verisure.',
              kv: [['Reference', '0 panels'], ['Limits', 'warning > 50 · critical > 100 panels'], ['Alarm', 'ALM-COM-0611'], ['Procedure', 'PR-COM-003']] },
            { code: 'COL-SOP', name: 'Technical line queue', reading: '47', status: 'crit', note: 'Calls from customers who see the communication fault notice on their panel.', kv: [['Reference', '< 12 calls'], ['Limits', 'warning > 25 · critical > 40']] },
            { code: 'PRT-HUB', name: 'Partner Portals', reading: null, status: null, kv: [['Systems', 'Verisure Partner Portal · Sector Alarm Partner Hub · Prosegur Partner Portal'], ['Use', 'Panel status and incident openings']] }
          ] },
          { id: 'pos', title: 'After-sales and customer care', sub: 'Salesforce CRM · Twilio SMS', items: [
            { code: 'FAL-0619', name: 'Complaint from Marta Soler Pons', reading: 'EUR 78', status: 'crit', tags: ['INS-2026-VLC-04417', 'CLM-2026-0619'], go: 'reclamacion', goLabel: 'Open the complaint',
              note: 'Two security guard call-out charges (2 x EUR 39.00) for false alarms on 2026-10-12 and 2026-10-14. Root cause: PIR sensor with a low battery and no warning. The compensation is decided by the Operations Manager.',
              kv: [['Contract', 'Sector Alarm SA-2026-77412'], ['Cancellation penalty', 'EUR 180'], ['Deadline', 'Acknowledge 24 h · resolve 10 working days'], ['Procedure', 'PR-SOP-007']] },
            { code: 'SMS', name: 'Customer notices (Twilio SMS)', reading: null, status: null, kv: [['Use', 'Communication incidents, visit appointments and recall notices']] },
            { code: 'SLK', name: 'Channel «Operations · Paterna»', reading: null, status: null, kv: [['System', 'Slack'], ['Use', 'Daily report summary']] }
          ] },
          { id: 'alm', title: 'Warehouse', sub: 'SAP Business One · Paterna warehouse', items: [
            { code: 'STK-BAT', name: 'Spare lithium batteries', reading: '420', status: 'warn', note: 'Low-battery replacements and the PIR-2607-A lot recall draw down stock.', kv: [['Reference', '900 units'], ['Limits', 'warning < 600 · critical < 300 units'], ['System', 'SAP Business One']] },
            { code: 'PIR-ALM', name: 'Lot PIR-2607-A in warehouse', reading: '960', status: 'crit', note: '960 uninstalled PIR-200 detectors: blocked until further notice under recall REC-2026-1019.', kv: [['Status', 'Precautionary block'], ['Procedure', 'PR-QLT-006']] }
          ] },
          { id: 'flt', title: 'Fleet', sub: 'Samsara Fleet · 62 vans', items: [
            { code: 'FLT-RUTA', name: 'Vans on the road', reading: '58', status: 'ok', kv: [['Reference', '≥ 55 vans'], ['System', 'Samsara Fleet']] },
            { code: 'OT-URG', name: 'Urgent orders open', reading: '9', status: 'ok', kv: [['Reference', '< 15 orders'], ['System', 'Salesforce CRM']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'activity',
          title: 'Panels without 4G communication · Valencia North',
          meta: ['Alarm 05:50 · ALM-COM-0611'],
          systems: ['Sector Alarm Partner Hub', 'Verisure Partner Portal'],
          body: 'Peak of 241 panels at 05:42; 214 are still without communication since 05:10 after a mobile operator maintenance window. 38 have no backup path and are left without remote supervision. The technical line already has 47 calls waiting.'
        },
        complaint: {
          icon: 'mail',
          title: 'Complaint CLM-2026-0619 · call-out charges for false alarms',
          meta: ['10/19 07:42', 'Marta Soler Pons', 'Private customer · Sector Alarm contract SA-2026-77412'],
          body: 'She claims two charges of EUR 39.00 for false alarms on 10/12 and 10/14 and warns she will cancel if the EUR 180 penalty is applied. Installation',
          trace: 'INS-2026-VLC-04417',
          after: 'Acknowledge within 24 h and resolve within 10 working days.',
          due: 'Acknowledge by 10/20',
          goLabel: 'Open complaint'
        }
      },
      chart: {
        title: 'Panels without 4G communication',
        sub: 'Valencia North · reference 0 panels · now 214 (06:30)',
        icon: 'activity',
        tabLabel: 'Panels',
        chart: {
          series: PANELES.map(([t, v]) => ({ time: t, value: v })),
          unit: 'panels',
          threshold: { value: 50, label: 'Warning 50', legend: 'Warning 50 panels · 74 min above' },
          critical: { value: 100, label: 'Critical 100', legend: 'Critical 100 panels · 69 min above' },
          peak: { x: '05:42', y: 241, label: '241 panels · 05:42' },
          yTicks: [0, 80, 160, 240],
          xTicks: ['05:00', '05:30', '06:00', '06:30'],
          annotations: [{ x: '05:50', label: 'Alarm 05:50' }],
          bands: [
            { from: '05:10', to: '05:40', label: 'Mobile operator maintenance' },
            { from: '05:45', to: '05:55', label: 'Partial recovery on retry', tone: 'warn' }
          ],
          seriesLabel: 'Panels without communication (Partner Portals)',
          shadeLabel: 'No remote supervision since 05:10'
        },
        events: [
          { time: '05:10', end: '05:40', text: 'The mobile operator starts a 4G network maintenance window in Valencia North', tone: 'brand', tag: 'COM-4G' },
          { time: '05:15', text: 'The first panels lose communication: 47 within five minutes', tone: 'brand', tag: 'COM-4G' },
          { time: '05:42', text: 'Peak of 241 panels without communication, mostly Sector Alarm and Verisure', tone: 'warn', tag: 'COM-4G' },
          { time: '05:50', text: 'Partner Portal alarm: 214 panels without communication', tone: 'crit', tag: 'ALM-COM-0611' },
          { time: '06:00', end: '06:30', text: 'The technical line exceeds 40 calls on hold', tone: 'warn', tag: 'COL-SOP' },
          { time: '06:30', text: '214 panels are still down; 38 have no backup path', tone: 'warn', tag: 'SIN-RESP' }
        ],
        cause: 'Hypothesis to be confirmed by the Technical Support Manager: the mobile operator maintenance left Valencia North panels without stable 4G coverage, and those with no IP backup or second SIM have not regained the signal.',
        system: 'Partner Portals',
        footer: 'Reading every 5 min'
      },
      parte: {
        agent: AGENT,
        title: 'Daily operations report',
        sub: '06:00 readings · 11 indicators of the Paterna hub · operations thresholds',
        colItem: 'Indicator',
        systems: ['Salesforce CRM', 'SAP Business One'],
        inboxTitle: 'Daily operations report · 06:00 readings',
        inboxCount: '11 indicators',
        inboxPending: '4 critical, one of them the PIR-2607-A lot recall, and 3 warnings to review.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'Verisure Partner Portal', action: 'Reads the communication status of the Valencia North panels', result: '214 panels without communication across the three brands; 38 without backup', ms: 640 },
          { agent: AGENT, system: 'Samsara Fleet', action: 'Checks the vans on the road and the technicians positions', result: '58 of 62 vans operational; 9 urgent orders', ms: 520 },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compares each reading with its operations thresholds (11 indicators)', result: '4 critical · 3 warnings · 4 with no issues', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'SAP Business One', action: 'Checks lot PIR-2607-A and the battery stock', result: 'REC-2026-1019: 912 homes with the unit; 960 in warehouse; batteries 420 units', ms: 380, tone: 'crit' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Looks for open cases and lists for the indicators with an alert', result: 'CLM-2026-0619 (false alarms) and MNT-VENC-2026-10 (overdue checks)', ms: 470 },
          { agent: AGENT, system: 'Sector Alarm Partner Hub', action: 'Cross-checks the alerts with open complaints', result: 'CLM-2026-0619: PIR sensor with a low battery at INS-2026-VLC-04417', ms: 350, tone: 'warn' },
          { agent: AGENT, system: 'Language model', action: 'Drafts the recommended action for each alert (7 calls)', result: '7 drafts, each with its reference procedure', ms: 6100 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Creates OT-2026-31101 for COM-4G · urgent priority · alarm', result: 'Created and assigned to the Technical Support Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Creates OT-2026-31102 for SIN-RESP · high priority', result: 'Created and assigned to the Maintenance Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Creates OT-2026-31103 for PIR-2607 · urgent priority · recall', result: 'Created and assigned to Warehouse and Customer Care', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Creates OT-2026-31104 for COL-SOP · medium priority', result: 'Created and assigned to the Technical Support Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'SAP Business One', action: 'Creates OT-2026-31105 for STK-BAT · medium priority', result: 'Created and assigned to the Warehouse Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Updates CLM-2026-0619 (Marta Soler Pons) with todays reading', result: 'Evidence added · high priority proposed · no duplicate case', ms: 220 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Updates MNT-VENC-2026-10 (overdue checks) with todays reading', result: 'Reading added · no duplicate ticket', ms: 220 },
          { agent: AGENT, system: 'Slack', action: 'Posts the summary to the channel «Operations · Paterna»', result: 'Sent: 4 critical, 3 warnings and 5 tickets', ms: 410, tone: 'ok' }
        ],
        stats: [
          { label: 'Indicators reviewed', value: 11 },
          { label: 'Tickets created', value: 5, tone: 'ok' },
          { label: 'Cases updated, no duplicates', value: 2 },
          { label: 'Open product recalls', value: 1, tone: 'crit' }
        ],
        relation: {
          title: 'Possible link to complaint CLM-2026-0619',
          body: 'The living room PIR sensor of Marta Soler Pons (INS-2026-VLC-04417, Sector Alarm) had a low battery and raised no warning, which caused the false alarms on 10/12 and 10/14 with two EUR 39.00 charges. The same missing battery warning may affect other sensors in the portfolio and the detectors of lot PIR-2607-A.',
          more: 'Technical support should review the battery telemetry of the installed PIR sensors before replying. To be confirmed by the Technical Support Manager.',
          plain: 'The living room PIR sensor of Marta Soler Pons (INS-2026-VLC-04417, Sector Alarm) had a low battery and raised no warning, which caused the false alarms on 10/12 and 10/14 with two EUR 39.00 charges. Technical support should review the battery telemetry of the installed PIR sensors before replying. To be confirmed by the Technical Support Manager.',
          go: 'reclamacion',
          goLabel: 'Open the complaint'
        },
        policy: 'Policy applied: work orders are created without prior approval; switching a customer panel, notifying homes about a recall or crediting charges to a customer requires the approval of the manager (POL-OPS-015).',
        channel: 'Operations · Paterna',
        resultSummary: '5 tickets created, 2 existing cases updated and summary posted to Slack.',
        auditRequest: 'Paterna · 06:00 readings · 11 indicators',
        auditNew: 'Work order created',
        auditUpdate: 'Operations case updated',
        reportTitle: 'Daily operations report · Paterna',
        reportCode: 'PD-GII-20261019',
        reportMeta: [['Hub', 'Paterna (Valencia)'], ['Shift', 'Morning'], ['Indicators reviewed', '11'], ['Critical · warnings', '4 · 3']],
        reportSummary: 'Of 11 indicators reviewed, 4 are critical and 3 are on warning. The 4G communication outage leaves 214 panels without remote supervision and the PIR-2607-A lot recall affects 912 homes. 5 work orders were created and 2 existing cases were updated, with no duplicates.',
        signatures: [{ role: 'Operations Manager', note: 'Reviewed' }, { role: 'Technical Support Manager', note: 'Received' }]
      },
      presenter: {
        say: [
          'This is how the Operations Manager starts the shift in Paterna: what needs a decision, in a single inbox.',
          'The data comes from their systems: customers and orders from Salesforce, warehouse and billing from SAP Business One, panel status from the Verisure, Sector Alarm and Prosegur Alarmas portals, and the Samsara fleet. Here it is synthetic, but consistent across systems.',
          'The hub floor plan summarises the operation at a glance: grey is normal, colour needs attention. Technical support is red; selecting it shows the down panels, the call queue and the visits that depend on it.',
          'Three matters: the 05:50 communication alarm (214 panels without remote supervision), complaint CLM-2026-0619 from Marta Soler Pons and the report with 4 critical items, one of them the PIR-2607-A lot recall.'
        ],
        sayBefore: ['Generate daily report: it reviews 11 indicators, does not duplicate open cases and creates the work orders. Watch the time.'],
        sayAfter: [
          'The link Agentic Platform finds: the customer sensor had a low battery with no warning and there may be more in the portfolio, including those of lot PIR-2607-A. Nobody had to cross-check three systems.',
          'And it does not duplicate: two cases that were already open are updated instead of opening new tickets.'
        ],
        next: 'Press «Generate daily report» and comment on the log while it runs.',
        nextAfter: 'Go to «From words to workflow» (right arrow) to build the response to the communication outage from the written procedure.'
      }
    };
  })()
});
