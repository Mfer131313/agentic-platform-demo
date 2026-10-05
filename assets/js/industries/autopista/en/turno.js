/* Autopista Multimotor · shift summary (scene «turno»), English. Demo scenario with synthetic data (MFM). */
agenticPackEn('autopista', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((360 + i * 5) / 60)).padStart(2, '0')}:${String((360 + i * 5) % 60).padStart(2, '0')}`;
    /* Brand workshop load (% of effective capacity), every 5 min from 06:00 to 07:30. */
    const LOAD = [70, 70, 71, 70, 71, 70, 71, 72, 76, 81, 86, 90, 94, 98, 101, 103, 104, 103, 102];
    const AGENT = 'Daily operations report';

    const items = [
      { code: 'RCL-GOLF', name: 'Volkswagen Golf ABS recall (REC-VW-2026-001)', tag: 'RECALL', area: 'Rental fleet and VW brand workshop', metric: 'vehicles pending update', reading: '35 vehicles', baseline: '0 vehicles', limits: 'warning > 10 · critical > 25 vehicles', status: 'critical',
        note: 'Safety recall: 35 of the 47 affected Golf in the fleet still lack the ABS module update (12 done). Manufacturer deadline: 2026-11-15. Schedule them and take the pending ones off the road until updated.' },
      { code: 'STK-X3', name: 'BMW X3 20d stock', area: 'Marqués de Soria lot · Odoo Inventory', metric: 'units available', reading: '1 unit', baseline: '5 units', limits: 'warning < 3 · critical < 2 units', status: 'critical',
        note: 'Only 1 BMW X3 left on the lot with a customer waiting; the next delivery is 2026-10-14. Reserve the unit and ask BMW to bring the delivery forward.' },
      { code: 'TEC-VW', name: 'Volkswagen brand workshop', area: 'Marqués de Soria workshop · iCare Workshop', metric: 'load over effective capacity', reading: '102% load', baseline: '70% load', limits: 'warning > 85 · critical > 100%', status: 'critical',
        note: 'A VW technician is on sick leave: effective capacity −30% and load above 100%. Reassign urgent orders to Skoda and Audi technicians and reschedule preventive maintenance.' },
      { code: 'APR-01', name: 'Banco Sabadell financing · contract APR', area: 'Salesforce CRM · SAP (finance)', metric: 'gap between invoiced APR and contracted APR', reading: '+0.26 pp', baseline: '3.99% contract', limits: 'warning > 0.10 · critical > 0.25 pp', status: 'critical',
        note: 'The contract signed by José María López sets 3.99%; the financing invoice applies 4.25% (overcharge claimed: EUR 2,400). Finance must decide on the correction.' },
      { code: 'Q3-AUD', name: 'Audi Q3 delivery · repaint', area: 'Body shop', metric: 'delay against delivery time', reading: '+2 h', baseline: '0 h', limits: 'warning > 1 · critical > 4 h', status: 'warning',
        note: 'Scratch found in transport: 2 extra hours of repainting, new estimated time 17:00. Notify the customer and reschedule the delivery.' },
      { code: 'ALQ-MTO', name: 'Rental fleet in maintenance', area: 'Rental fleet (~1,000 vehicles)', metric: 'vehicles in the workshop at once', reading: '78 vehicles', baseline: '60 vehicles', limits: 'warning > 70 · critical > 100 vehicles', status: 'warning',
        note: 'Parallel maintenance above the usual level with high corporate demand: risk of running short of availability for this weeks contracts.' },
      { code: 'SUS-REN', name: '6-month subscription renewals', area: 'Subscriptions · Salesforce CRM', metric: 'renewals in the next 7 days', reading: '12 renewals', baseline: '8 renewals', limits: 'warning > 10 · critical > 16', status: 'warning',
        note: 'Churn risk if the workshop cannot absorb subscription maintenance; opportunity to upsell a higher model at renewal.' },
      { code: 'ENT-HOY', name: 'Scheduled vehicle deliveries', area: 'Sales · Salesforce CRM', metric: 'deliveries scheduled today', reading: '8 deliveries', baseline: '≥ 5 deliveries', limits: 'warning < 5 · critical < 3', status: null, note: '' },
      { code: 'COL-TAL', name: 'Workshop order queue', area: 'Workshop · iCare Workshop', metric: 'orders in queue', reading: '23 orders', baseline: '< 30 orders', limits: 'warning > 30 · critical > 40', status: null, note: '' },
      { code: 'ALQ-ACT', name: 'Rental vehicles on the road', area: 'Rental · SAP ERP', metric: 'active rental contracts today', reading: '156 vehicles', baseline: '140 vehicles', limits: 'warning < 100 · critical < 60', status: null, note: '' },
      { code: 'PAG-STR', name: 'Subscription fee collection', area: 'Stripe Payments', metric: 'fees collected', reading: '98.6%', baseline: '98%', limits: 'warning < 96 · critical < 93%', status: null, note: '' }
    ];

    const news = [
      { id: 'OPS-2026-2201', equipment: 'RCL-GOLF', priority: 'Urgent · Recall', tone: 'crit', owner: 'Workshop Manager and VW Brand Manager',
        action: 'Schedule the 35 pending fleet Golf (47 affected, 12 already updated) and pull non-updated ones from rental before 2026-11-15. Answers REC-VW-2026-001.' },
      { id: 'OPS-2026-2202', equipment: 'STK-X3', priority: 'High', tone: 'crit', owner: 'Sales Shift Supervisor',
        action: 'Reserve the only BMW X3 for the waiting customer, ask BMW to bring forward the 2026-10-14 delivery and offer the Audi Q5 e-tron as a premium alternative.' },
      { id: 'OPS-2026-2203', equipment: 'TEC-VW', priority: 'High', tone: 'crit', owner: 'Workshop Manager',
        action: 'VW workshop load at 102% with one technician fewer (capacity −30%): reassign urgent orders to Skoda and Audi technicians and reschedule preventive maintenance.' },
      { id: 'OPS-2026-2204', equipment: 'Q3-AUD', priority: 'Medium', tone: 'warn', owner: 'Workshop Manager',
        action: 'Audi Q3 repaint for the transport scratch (+2 h, new estimated time 17:00): notify the customer by SMS and reschedule todays delivery.' },
      { id: 'OPS-2026-2205', equipment: 'ALQ-MTO', priority: 'Medium', tone: 'warn', owner: 'Rental Fleet Manager',
        action: '78 rental vehicles in the workshop at once (reference 60): stagger maintenance and book the recall-pending Golf into the lowest-demand window.' }
    ];
    const updates = [
      { id: 'CLM-2026-001', equipment: 'APR-01', priority: 'High (proposed)', tone: 'crit', owner: 'Finance Manager',
        action: 'The evidence of the discrepancy (4.25% invoiced APR vs 3.99% in the signed contract, EUR 2,400) is added to the open case of José María López. No duplicate case is created.' },
      { id: 'SUB-REN-2026-10', equipment: 'SUS-REN', priority: 'No change', tone: 'warn', owner: 'Subscription Manager',
        action: 'Todays reading (12 renewals in 7 days) is added to the open renewals list. No duplicate ticket is created.' }
    ];

    return {
      title: 'Madrid (Marqués de Soria) · morning shift',
      nav: 'Shift summary',
      clockLabel: 'Hub time',
      decider: 'the Operations Manager',
      kpis: [
        { label: 'Workshop orders affected', value: 9, sub: '7 vehicles · VW workshop load at 102%', icon: 'wrench', tone: 'crit', href: '#alarma' },
        { label: 'Deliveries at risk', value: 3, sub: '8 scheduled today · the first at 11:00', icon: 'box', href: '#alarma' },
        { label: 'Open complaints', value: 1, sub: 'CLM-2026-001 · reply due by 2026-10-09', icon: 'mail', href: '#reclamacion' },
        { label: 'Indicators with an alert', value: '7 of 11', sub: '4 critical · 3 warnings · 07:00 readings', icon: 'activity', action: 'scroll-parte' }
      ],
      map: {
        title: 'Hub floor plan · Madrid (Marqués de Soria)',
        sub: 'Readings from the 07:00 report and the workshop at 07:30 · select an item to see its detail',
        icon: 'factory',
        readonly: 'Agentic Platform reads Salesforce CRM, SAP ERP, Odoo Inventory and iCare Workshop; it does not change contracts or invoices on its own',
        zones: [
          { id: 'vta', title: 'Sales and deliveries', sub: 'Salesforce CRM · BMW, Audi, Volkswagen, Skoda and Seat', items: [
            { code: 'CRM-VTA', name: 'Direct sales pipeline', reading: null, status: null, note: 'Focus of the day on Audi Q3 (high margins) and on the customer waiting for the BMW X3.', kv: [['Brands', 'BMW · Audi · Volkswagen · Skoda · Seat'], ['System', 'Salesforce CRM']] },
            { code: 'STK-X3', name: 'BMW X3 20d stock', reading: '1 unit', status: 'crit', go: 'alarma', goLabel: 'Open the alarm',
              note: '1 unit left on the lot with a customer waiting; the next delivery is 2026-10-14. Reserve it and ask BMW to bring it forward.',
              kv: [['Reorder level', '5 units'], ['Limits', 'warning < 3 · critical < 2 units'], ['Next delivery', '2026-10-14'], ['Source', 'Odoo Inventory']] },
            { code: 'Q3-AUD', name: 'Audi Q3 · delivery with repaint', reading: '+2 h', status: 'warn', note: 'Scratch found in transport: 2 h repaint, new estimated time 17:00.', kv: [['Reference', '0 h delay'], ['New time', '17:00'], ['Source', 'iCare Workshop']] },
            { code: 'ENT-HOY', name: 'Todays deliveries', reading: '8', status: 'ok', kv: [['Reference', '≥ 5 deliveries'], ['The first', '11:00']] }
          ] },
          { id: 'tal', title: 'Brand workshop', sub: 'iCare Workshop · Volkswagen, Audi, Skoda and BMW', items: [
            { code: 'TEC-VW', name: 'Volkswagen workshop', reading: '102%', status: 'crit', go: 'alarma', goLabel: 'Open the alarm',
              note: 'A VW technician is on sick leave: effective capacity −30%. Peak of 104% at 07:20, 40 min above 85% and 20 min above 100%.',
              kv: [['Reference', '70% load'], ['Limits', 'warning > 85 · critical > 100%'], ['Orders affected', '9 · 7 vehicles'], ['Rule', 'POL-OPS-012']] },
            { code: 'COL-TAL', name: 'Workshop order queue', reading: '23', status: 'ok', kv: [['Reference', '< 30 orders']] },
            { code: 'RCL-GOLF', name: 'Volkswagen Golf ABS recall', reading: '35 pend.', status: 'crit', tags: ['REC-VW-2026-001'], go: 'retirada', goLabel: 'Open the recall',
              note: 'Safety recall on the ABS module: 47 fleet Golf affected, 12 updated and 35 pending. Manufacturer deadline: 2026-11-15.',
              kv: [['Affected', '47 vehicles'], ['Pending', '35'], ['Deadline', '2026-11-15'], ['Source', 'iCare Workshop · SAP ERP']] },
            { code: 'TEC-SKO', name: 'Skoda and Audi workshop', reading: null, status: null, note: 'Technicians with capacity to absorb the urgent Volkswagen orders.', kv: [['Use', 'Redirecting urgent orders']] }
          ] },
          { id: 'alq', title: 'Rental', sub: 'Fleet of ~1,000 vehicles', items: [
            { code: 'ALQ-ACT', name: 'Vehicles on the road', reading: '156', status: 'ok', kv: [['Reference', '140 vehicles'], ['System', 'SAP ERP']] },
            { code: 'ALQ-MTO', name: 'Fleet in maintenance', reading: '78', status: 'warn', note: 'Parallel maintenance above the usual level with high corporate demand.', kv: [['Reference', '60 vehicles'], ['Limits', 'warning > 70 · critical > 100'], ['Source', 'iCare Workshop']] }
          ] },
          { id: 'sus', title: 'Subscriptions', sub: '6-month contracts', items: [
            { code: 'SUS-REN', name: 'Upcoming renewals', reading: '12', status: 'warn', note: 'Churn risk if the workshop cannot absorb maintenance; opportunity to upsell a higher model.', kv: [['Reference', '8 renewals'], ['Active', '171 subscriptions']] },
            { code: 'PAG-STR', name: 'Fee collection', reading: '98.6%', status: 'ok', kv: [['Reference', '98%'], ['System', 'Stripe Payments']] }
          ] },
          { id: 'fin', title: 'Financing and signature', sub: 'Banco Sabadell · DocuSign · SAP ERP', items: [
            { code: 'APR-01', name: 'Financing contract of José María López', reading: '+0.26 pp', status: 'crit', tags: ['VIN-2026-MAD-SEAT-03', 'CLM-2026-001'], go: 'reclamacion', goLabel: 'Open the complaint',
              note: 'The signed contract sets a 3.99% APR and the invoice applies 4.25%. Overcharge claimed: EUR 2,400. Finance decides the correction.',
              kv: [['Contract APR', '3.99%'], ['Invoiced APR', '4.25%'], ['Lender', 'Banco Sabadell'], ['Contract', 'DocuSign']] },
            { code: 'DOC-SIGN', name: 'Signed contracts (DocuSign)', reading: null, status: null, kv: [['Use', 'Sales, rental and subscription contracts']] }
          ] },
          { id: 'com', title: 'Communication', sub: 'Customer care and team', items: [
            { code: 'SMS', name: 'Customer notices (Twilio SMS)', reading: null, status: null, kv: [['Use', 'Delivery time changes and workshop appointments']] },
            { code: 'SLK', name: 'Channel «Operations · Madrid»', reading: null, status: null, kv: [['System', 'Slack'], ['Use', 'Daily report summary']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'wrench',
          title: 'VW workshop · overload from technician absence',
          meta: ['Alarm 06:50 · ALM-TLR-0650'],
          systems: ['iCare Workshop'],
          body: 'Load peaked at 104% at 07:20; 40 min above 85%. 9 orders on 7 vehicles affected and the only BMW X3 on the lot is still unassigned. The first committed delivery goes out at 11:00.'
        },
        complaint: {
          icon: 'mail',
          title: 'Complaint CLM-2026-001 · APR 4.25% instead of 3.99%',
          meta: ['10/02 10:14', 'José María López', 'Private customer · Banco Sabadell financing'],
          body: 'Claims EUR 2,400 of overcharge: the signed contract sets 3.99% and the invoice applies 4.25%. Vehicle',
          trace: 'VIN-2026-MAD-SEAT-03',
          after: 'The customer demands a written reply within 5 working days.',
          due: 'Due 10/09',
          goLabel: 'Open complaint'
        }
      },
      chart: {
        title: 'VW workshop · load over capacity',
        sub: 'Volkswagen brand workshop · reference 70% · now 102% (07:30)',
        icon: 'wrench',
        tabLabel: 'Load',
        chart: {
          series: LOAD.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '%',
          threshold: { value: 85, label: 'Warning 85%', legend: 'Warning 85% · 40 min above' },
          critical: { value: 100, label: 'Critical 100%', legend: 'Critical 100% · 20 min above' },
          peak: { x: '07:20', y: 104, label: '104% · 07:20' },
          yTicks: [60, 75, 90, 105],
          xTicks: ['06:00', '06:30', '07:00', '07:30'],
          annotations: [{ x: '06:50', label: 'Alarm 06:50' }],
          bands: [
            { from: '06:35', to: '07:00', label: 'VW technician absent' },
            { from: '07:10', to: '07:25', label: 'Urgent orders without technician', tone: 'warn' }
          ],
          seriesLabel: 'Load (iCare Workshop)',
          shadeLabel: 'Overload since 06:50'
        },
        events: [
          { time: '06:35', end: '06:40', text: 'A VW technician reports sick leave by SMS', tone: 'brand', tag: 'TEC-VW' },
          { time: '06:40', end: '07:00', text: 'Effective capacity of the VW workshop drops by 30%', tone: 'brand', tag: 'TEC-VW' },
          { time: '06:50', text: 'iCare alarm: VW workshop load above 85%', tone: 'crit', tag: 'ALM-TLR-0650' },
          { time: '07:10', end: '07:25', text: 'Load exceeds 100%: 3 of todays deliveries depend on orders in this workshop', tone: 'warn', tag: 'ENT-HOY' },
          { time: '07:20', text: 'Peak of 104%; the Workshop Manager starts reassigning orders to Skoda and Audi', tone: 'warn', tag: 'TEC-SKO' },
          { time: '07:30', text: 'Load falls to 102%, still above 100%', tone: 'warn' }
        ],
        cause: 'Hypothesis to be confirmed by the Workshop Manager: the sick leave of a VW technician (capacity −30%) coincides with 23 orders in the queue, 9 of them tied to todays deliveries and to the Golf ABS recall.',
        system: 'iCare Workshop',
        footer: 'Reading every 5 min'
      },
      parte: {
        agent: AGENT,
        title: 'Daily operations report',
        sub: '07:00 readings · 11 indicators of the Madrid hub · operations thresholds',
        colItem: 'Indicator',
        systems: ['Salesforce CRM', 'SAP ERP'],
        inboxTitle: 'Daily operations report · 07:00 readings',
        inboxCount: '11 indicators',
        inboxPending: '4 critical, one of them a safety recall (Golf ABS), and 3 warnings pending review.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'Odoo Inventory', action: 'Reads the stock of 8 models from 5 brands and the expected deliveries', result: 'BMW X3: 1 unit; next delivery on 2026-10-14', ms: 640 },
          { agent: AGENT, system: 'iCare Workshop', action: 'Queries workshop load, the order queue and technician absences', result: 'VW workshop at 102%; 23 orders in queue', ms: 520 },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compares each reading with its operations thresholds (11 indicators)', result: '4 critical · 3 warnings · 4 with no issues', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'SAP ERP', action: 'Checks open recalls and the affected fleet', result: 'REC-VW-2026-001: 35 of 47 Golf pending; deadline 2026-11-15', ms: 380, tone: 'crit' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Looks up open cases and renewals for the indicators with an alert', result: 'CLM-2026-001 (APR) and SUB-REN-2026-10 (renewals)', ms: 470 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Cross-checks the alerts against open complaints', result: 'CLM-2026-001: 4.25% APR vs 3.99% on VIN-2026-MAD-SEAT-03', ms: 350, tone: 'warn' },
          { agent: AGENT, system: 'Language model', action: 'Drafts the recommended action for each alert (7 calls)', result: '7 drafts, each with its reference procedure', ms: 6100 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Creates OPS-2026-2201 for RCL-GOLF · urgent priority · recall', result: 'Created and assigned to Workshop Manager and VW Brand Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Creates OPS-2026-2202 for STK-X3 · high priority', result: 'Created and assigned to Sales Shift Supervisor', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'iCare Workshop', action: 'Creates OPS-2026-2203 for TEC-VW · high priority', result: 'Created and assigned to Workshop Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'iCare Workshop', action: 'Creates OPS-2026-2204 for Q3-AUD · medium priority', result: 'Created and assigned to Workshop Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'SAP ERP', action: 'Creates OPS-2026-2205 for ALQ-MTO · medium priority', result: 'Created and assigned to Rental Fleet Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Updates CLM-2026-001 (José María López APR) with todays reading', result: 'Evidence added · high priority proposed · no duplicate case', ms: 220 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Updates SUB-REN-2026-10 (renewals) with todays reading', result: 'Reading added · no duplicate ticket', ms: 220 },
          { agent: AGENT, system: 'Slack', action: 'Posts the summary to the channel «Operations · Madrid»', result: 'Sent: 4 critical, 3 warnings and 5 tickets', ms: 410, tone: 'ok' }
        ],
        stats: [
          { label: 'Indicators reviewed', value: 11 },
          { label: 'Tickets created', value: 5, tone: 'ok' },
          { label: 'Cases updated, no duplicates', value: 2 },
          { label: 'Pending safety recalls', value: 1, tone: 'crit' }
        ],
        relation: {
          title: 'Possible link to complaint CLM-2026-001',
          body: 'The financing of VIN-2026-MAD-SEAT-03 (José María López, Banco Sabadell) invoices a 4.25% APR against the 3.99% in the signed contract: +0.26 pp and EUR 2,400 of overcharge. The same mismatch in terms may affect other contracts processed with the same financing template.',
          more: 'Finance should review the financing contracts signed in recent weeks before replying. To be confirmed by the Finance Manager.',
          plain: 'The financing of VIN-2026-MAD-SEAT-03 (José María López, Banco Sabadell) invoices a 4.25% APR against the 3.99% in the signed contract: +0.26 pp and EUR 2,400 of overcharge. Finance should review contracts signed in recent weeks with the same template before replying. To be confirmed by the Finance Manager.',
          go: 'reclamacion',
          goLabel: 'Open the complaint'
        },
        policy: 'Policy applied: operations tickets are created without prior approval; taking a vehicle off the road, correcting a financing invoice or refunding a customer requires the approval of the Operations Manager (POL-OPS-015).',
        channel: 'Operations · Madrid',
        resultSummary: '5 tickets created, 2 existing cases updated and summary posted to Slack.',
        auditRequest: 'Madrid · 07:00 readings · 11 indicators',
        auditNew: 'Operations ticket created',
        auditUpdate: 'Operations case updated',
        reportTitle: 'Daily operations report · Madrid',
        reportCode: 'PD-APM-20261007',
        reportMeta: [['Hub', 'Madrid (Marqués de Soria)'], ['Shift', 'Morning'], ['Indicators reviewed', '11'], ['Critical · warnings', '4 · 3']],
        reportSummary: 'Of 11 indicators reviewed, 4 are critical and 3 are in warning. The Volkswagen Golf ABS recall has 35 fleet vehicles pending. 5 operations tickets were created and 2 existing cases were updated, without duplicating them.',
        signatures: [{ role: 'Operations Manager', note: 'Reviewed' }, { role: 'Workshop Manager', note: 'Received' }]
      },
      presenter: {
        say: [
          'This is how the Operations Manager starts the shift in Madrid: everything that needs a decision, in a single inbox.',
          'The data comes from their systems: Salesforce customers and cases, SAP orders and fleet, Odoo stock and iCare Workshop orders. Here it is synthetic but consistent.',
          'The hub plan summarises the operation at a glance: grey is normal, colour needs attention. The VW workshop is red; selecting it shows its orders, the Golf recall and the deliveries that depend on it.',
          'Three items: the VW workshop alarm of 06:50 (9 orders; the first delivery goes out at 11:00), complaint CLM-2026-001 from José María López and the report with 4 critical items, one of them a safety recall.'
        ],
        sayBefore: ['Generate daily report: it reviews 11 indicators, does not duplicate open cases and creates the tickets. Watch the time.'],
        sayAfter: [
          'The link Agentic Platform finds: the invoiced APR does not match the signed contract of VIN-2026-MAD-SEAT-03 and more contracts may share the same template. Nobody had to cross three systems.',
          'And it does not duplicate: two cases that were already open are updated instead of opening new tickets.'
        ],
        next: 'Press «Generate daily report» and comment on the log while it runs.',
        nextAfter: 'Go to «From words to workflow» (right arrow) to build the response to the VW workshop alarm from the written procedure.'
      }
    };
  })()
});
