/* Norel Nutrición Animal · shift summary (scene «turno»), English. Demo scenario with synthetic data (MFM). */
agenticPackEn('norel', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((330 + i * 5) / 60)).padStart(2, '0')}:${String((330 + i * 5) % 60).padStart(2, '0')}`;
    /* Laboratory (LIMS) load over test capacity (%), every 5 min from 05:30 to 07:00. */
    const LOAD = [62, 63, 62, 63, 64, 78, 89, 96, 101, 104, 105, 104, 103, 102, 101, 100, 99, 98, 97];
    const AGENT = 'Daily operations and quality report';

    const items = [
      { code: 'SAL-CC118', name: 'Salmonella in choline chloride 60 % (MP-2610-CC-118)', tag: 'ALARM', area: 'Laboratory (LIMS) · Raw material receiving', metric: 'Salmonella in 25 g (test LAB-2610-0933)', reading: 'Positive', baseline: 'Absent in 25 g', limits: 'critical = presence in 25 g', status: 'critical',
        note: 'Positive in a sample of the raw material received on 21/10 (supplier Agroquímica Delta). It has already been used in 4 premix batches (PRM-2610-0417, 0418, 0421 and 0425; 96 t). Blocking the batch in SAP QM and the derived products requires approval from the Quality and Feed Safety Manager.' },
      { code: 'RET-PRM', name: 'Premixes shipped with MP-2610-CC-118', area: 'Warehouse and shipping · SAP S/4HANA', metric: 'tonnes already shipped to customers', reading: '65 t', baseline: '0 t', limits: 'warning > 0 · critical > 0 t', status: 'critical',
        note: 'Of the 96 t produced, 31 t are still in the finished-goods warehouse and 65 t have been shipped to 9 customers (feed mills in Spain, Portugal and Morocco) in 148 shipments. Campaign RET-2026-1028: inform the authorities and customers within 4 h.' },
      { code: 'CLM-VITE', name: 'Vitamin E in PRM-2610-0388 (claim CLM-2026-1028)', area: 'Piensos Cuenca Mediterráneo, S.A. · Laboratory (LIMS)', metric: 'vitamin E content versus declared', reading: '−18 %', baseline: 'within ±10 %', limits: 'warning < −10 · critical < −15 %', status: 'critical',
        note: 'The customer claims a vitamin E content 18 % below the declared value in the premix for dairy cattle (report LAB-CLI-2610-77). The batch consumes vitamin E MP-2610-VE-044. Acknowledgement within 24 h; 8D report within 10 working days.' },
      { code: 'STK-CC', name: 'Choline chloride 60 % coverage after the block', area: 'Raw material receiving · SAP S/4HANA', metric: 'days of production coverage', reading: '2 days', baseline: '12 days', limits: 'warning < 8 · critical < 5 days', status: 'critical',
        note: 'Once MP-2610-CC-118 is blocked, only 2 days of stock remain for the premixes that use choline. Place an urgent replenishment order with an alternative supplier, with a Salmonella test before unloading.' },
      { code: 'LAB-COLA', name: 'Laboratory load (LIMS)', area: 'Laboratory · LIMS (laboratory)', metric: 'load over test capacity', reading: '97 % load', baseline: '62 % load', limits: 'warning > 85 · critical > 100 %', status: 'warning',
        note: 'The Salmonella confirmation tests and the vitamin E retained sample pushed the load to a peak of 105 % at 06:20. Prioritise the confirmations and postpone non-urgent routine tests.' },
      { code: 'CUE-052', name: 'Supplier audit questionnaire from Grupo Integrador Levante', area: 'Salesforce CRM · SharePoint', metric: 'days until the questionnaire is due', reading: '6 days', baseline: '≥ 10 days', limits: 'warning < 10 · critical < 3 days', status: 'warning',
        note: 'Case CUE-2026-052: GMP+ B2 / FAMI-QS, HACCP, traceability, feed hygiene and recall plan. Some questions have no evidence in the documentation and need human review.' },
      { code: 'PED-RIE', name: 'Open orders with committed date at risk', area: 'Customer care and orders · SAP S/4HANA', metric: 'orders with delivery at risk', reading: '11 orders', baseline: '< 6 orders', limits: 'warning > 8 · critical > 15 orders', status: 'warning',
        note: 'Holding the 31 t in the warehouse and the possible choline block affect orders for swine and poultry premixes. Warn customers with dates at risk and offer alternatives through Norel Solutions.' },
      { code: 'OF-HOY', name: 'Production orders today', area: 'Premix production · Plant MES', metric: 'production orders scheduled today', reading: '14 orders', baseline: '≥ 12 orders', limits: 'warning < 8 · critical < 5', status: null, note: '' },
      { code: 'PED-CUR', name: 'Open orders', area: 'Customer care and orders · SAP S/4HANA', metric: 'open orders', reading: '126 orders', baseline: '120 orders', limits: 'warning > 160 · critical > 200', status: null, note: '' },
      { code: 'REC-MP', name: 'Raw materials released at receiving', area: 'Receiving · LIMS (laboratory)', metric: 'receipts released without incident (week)', reading: '94 %', baseline: '95 %', limits: 'warning < 90 · critical < 85 %', status: null, note: '' },
      { code: 'NS-CON', name: 'Norel Solutions technical enquiries', area: 'Norel Solutions · Salesforce CRM', metric: 'open enquiries', reading: '9 enquiries', baseline: '< 15 enquiries', limits: 'warning > 15 · critical > 25', status: null, note: '' }
    ];

    const news = [
      { id: 'OPS-2026-2801', equipment: 'SAL-CC118', priority: 'Urgent · Feed safety', tone: 'crit', owner: 'Quality and Feed Safety Manager (HACCP)',
        action: 'Block MP-2610-CC-118 in SAP QM and the 4 derived premix batches (96 t), hold the 31 t in the warehouse and confirm the result with the Laboratory Manager. Follows PR-CAL-004 and PR-CAL-007.' },
      { id: 'OPS-2026-2802', equipment: 'RET-PRM', priority: 'Urgent · Recall', tone: 'crit', owner: 'Logistics and Export Manager',
        action: 'Locate the 148 shipments of the 65 t sent to 9 customers (Spain, Portugal and Morocco), hold any still in transit and prepare the notification to the competent authority (Regulation (EC) 178/2002, art. 19). Campaign RET-2026-1028.' },
      { id: 'OPS-2026-2803', equipment: 'STK-CC', priority: 'High', tone: 'crit', owner: 'Plant Manager',
        action: 'Order choline chloride 60 % from an alternative supplier with a Salmonella test before unloading and reschedule the production orders that use it (2 days of coverage).' },
      { id: 'OPS-2026-2804', equipment: 'LAB-COLA', priority: 'Medium', tone: 'warn', owner: 'Laboratory Manager',
        action: 'Prioritise the Salmonella confirmation tests and the vitamin E retained sample; postpone non-urgent routine tests until the load drops below 85 %.' },
      { id: 'OPS-2026-2805', equipment: 'PED-RIE', priority: 'Medium', tone: 'warn', owner: 'Customer Care and Orders',
        action: '11 orders with committed dates at risk: warn the customers and propose, with Norel Solutions, alternative premixes without choline from the blocked batch.' }
    ];
    const updates = [
      { id: 'CLM-2026-1028', equipment: 'CLM-VITE', priority: 'High (proposed)', tone: 'crit', owner: 'Quality and Feed Safety Manager (HACCP)',
        action: 'Today\'s reading (vitamin E −18 % versus declared in PRM-2610-0388, report LAB-CLI-2610-77) is added to the open case of Piensos Cuenca Mediterráneo. No duplicate case is created.' },
      { id: 'CUE-2026-052', equipment: 'CUE-052', priority: 'No change', tone: 'warn', owner: 'Regulatory Affairs Manager',
        action: 'Today\'s reading (6 days until the due date) is added to the open questionnaire of Grupo Integrador Levante. No duplicate ticket is created.' }
    ];

    return {
      title: 'Madrid (order office) and Premix Plant (Spain) · morning shift',
      nav: 'Shift summary',
      clockLabel: 'Plant time',
      decider: 'Operations and Quality Manager',
      kpis: [
        { label: 'Premix batches affected', value: 4, sub: '96 t · 31 t in the warehouse and 65 t shipped', icon: 'flask', tone: 'crit', href: '#alarma' },
        { label: 'Customers to notify', value: 9, sub: '148 shipments · Spain, Portugal and Morocco', icon: 'truck', href: '#retirada' },
        { label: 'Open claims', value: 1, sub: 'CLM-2026-1028 · acknowledgement in 24 h, 8D report in 10 working days', icon: 'mail', href: '#reclamacion' },
        { label: 'Indicators with alerts', value: '7 of 11', sub: '4 critical · 3 warnings · readings at 07:00', icon: 'activity', action: 'scroll-parte' }
      ],
      map: {
        title: 'Operations map · Madrid and Premix Plant (Spain)',
        sub: 'Readings from the 07:00 report and the laboratory at 07:00 · click an item for details · 14 production orders today · 126 open orders · 3 critical',
        icon: 'factory',
        readonly: 'Agentic Platform reads SAP S/4HANA, LIMS, Plant MES and Salesforce CRM; it does not release or block batches on its own',
        zones: [
          { id: 'rec', title: 'Raw material receiving', sub: 'SAP S/4HANA · LIMS (laboratory)', items: [
            { code: 'MP-2610-CC-118', name: 'Choline chloride 60 % · batch MP-2610-CC-118', reading: 'Positive', status: 'crit', tags: ['Agroquímica Delta', 'LAB-2610-0933'], go: 'alarma', goLabel: 'Open the alarm',
              note: 'Salmonella in 25 g in a sample of the batch received on 21/10. Used in 4 premix batches (96 t).',
              kv: [['Supplier', 'Agroquímica Delta'], ['Received', '21/10/2026'], ['Limit', 'absent in 25 g'], ['Source', 'LIMS']] },
            { code: 'STK-CC', name: 'Choline chloride 60 % coverage', reading: '2 days', status: 'crit', note: 'After blocking the batch, only 2 days of production stock remain.', kv: [['Baseline', '12 days'], ['Limits', 'warning < 8 · critical < 5 days'], ['Source', 'SAP S/4HANA']] },
            { code: 'REC-MP', name: 'Raw materials released', reading: '94 %', status: 'ok', kv: [['Baseline', '95 %'], ['System', 'LIMS']] }
          ] },
          { id: 'fab', title: 'Premix production', sub: 'Plant MES · Premix Plant (Spain)', items: [
            { code: 'OF-HOY', name: 'Production orders today', reading: '14', status: 'ok', kv: [['Baseline', '≥ 12 orders'], ['System', 'Plant MES']] },
            { code: 'PRM-2610-0417', name: 'Swine vitamin premix', reading: '28 t', status: 'crit', tags: ['PRM-2610-0417'], note: 'First batch made with MP-2610-CC-118; 4 t in the warehouse and 24 t shipped.', kv: [['Produced', '22/10/2026'], ['Warehouse', '4 t'], ['Shipped', '24 t'], ['Source', 'Plant MES · SAP S/4HANA']] },
            { code: 'PRM-2610-0388', name: 'Vitamin and trace mineral premix for dairy cattle', reading: '−18 % vit. E', status: 'crit', tags: ['CLM-2026-1028'], go: 'reclamacion', goLabel: 'Open the claim', note: 'Batch claimed by Piensos Cuenca Mediterráneo; it consumes vitamin E MP-2610-VE-044.', kv: [['Customer report', 'LAB-CLI-2610-77'], ['Deadlines', 'acknowledgement 24 h · 8D report in 10 working days']] }
          ] },
          { id: 'lab', title: 'Laboratory (LIMS)', sub: 'Raw material and finished product testing', items: [
            { code: 'LAB-COLA', name: 'Laboratory load', reading: '97 %', status: 'warn', note: 'Peak of 105 % at 06:20, 65 min above 85 % and 35 min above 100 %.', kv: [['Baseline', '62 % load'], ['Limits', 'warning > 85 · critical > 100 %'], ['Source', 'LIMS']] },
            { code: 'LAB-2610-0933', name: 'Salmonella test', reading: 'Positive', status: 'crit', tags: ['MP-2610-CC-118'], go: 'alarma', goLabel: 'Open the alarm', kv: [['Method', 'presence in 25 g'], ['Procedure', 'PR-CAL-004']] }
          ] },
          { id: 'alm', title: 'Warehouse and shipping', sub: 'SAP S/4HANA · Logistics and export', items: [
            { code: 'RET-PRM', name: 'Premixes shipped with affected choline', reading: '65 t', status: 'crit', tags: ['RET-2026-1028'], go: 'retirada', goLabel: 'Open the recall',
              note: '148 shipments to 9 customers in Spain, Portugal and Morocco. Goal: inform the authorities and customers within 4 h.',
              kv: [['Produced', '96 t'], ['In warehouse', '31 t'], ['Shipped', '65 t'], ['Countries', 'Spain · Portugal · Morocco']] },
            { code: 'ALM-PT', name: 'Finished-goods warehouse', reading: '31 t', status: 'warn', note: 'Product from the 4 batches pending hold and block in SAP QM.', kv: [['Procedure', 'PR-CAL-007']] }
          ] },
          { id: 'sol', title: 'Norel Solutions and order handling', sub: 'Salesforce CRM · technical advice', items: [
            { code: 'PED-CUR', name: 'Open orders', reading: '126', status: 'ok', kv: [['Baseline', '120 orders'], ['Critical', '3'], ['System', 'SAP S/4HANA']] },
            { code: 'PED-RIE', name: 'Orders with date at risk', reading: '11', status: 'warn', note: 'They involve swine and poultry premixes with choline from the blocked batch.', kv: [['Baseline', '< 6 orders'], ['Limits', 'warning > 8 · critical > 15']] },
            { code: 'CUE-052', name: 'Questionnaire from Grupo Integrador Levante', reading: '6 days', status: 'warn', tags: ['CUE-2026-052'], go: 'cuestionario', goLabel: 'Open the questionnaire', note: 'Additives supplier audit: GMP+ B2 / FAMI-QS, HACCP, traceability and recall plan.', kv: [['Baseline', '≥ 10 days'], ['System', 'Salesforce CRM · SharePoint']] },
            { code: 'NS-CON', name: 'Norel Solutions technical enquiries', reading: '9', status: 'ok', kv: [['Baseline', '< 15 enquiries']] }
          ] },
          { id: 'com', title: 'Communication', sub: 'Customer care and team', items: [
            { code: 'OUT', name: 'Customer notices (Outlook)', reading: null, status: null, kv: [['Use', 'Hold notices, claim acknowledgements and replies']] },
            { code: 'TMS', name: 'Channel «Operations and quality · Norel»', reading: null, status: null, kv: [['System', 'Microsoft Teams'], ['Use', 'Daily report summary']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'flask',
          title: 'Laboratory · Salmonella in choline chloride 60 % (MP-2610-CC-118)',
          meta: ['Alarm 05:50 · ALM-LAB-0550'],
          systems: ['LIMS (laboratory)'],
          body: 'Positive Salmonella result in 25 g (test LAB-2610-0933) in the batch of choline chloride 60 % received on 21/10 from Agroquímica Delta. It was already used in 4 premix batches (96 t): 31 t are still in the warehouse and 65 t have been shipped to 9 customers.'
        },
        complaint: {
          icon: 'mail',
          title: 'Claim CLM-2026-1028 · vitamin E 18 % below declared',
          meta: ['28/10 08:05', 'Piensos Cuenca Mediterráneo, S.A.', 'Feed mill for ruminants · report LAB-CLI-2610-77'],
          body: 'Claims that the vitamin and trace mineral premix for dairy cattle has a vitamin E content 18 % below the declared value. Batch',
          trace: 'PRM-2610-0388',
          after: 'Deadlines: acknowledgement within 24 h and 8D report within 10 working days.',
          due: 'Acknowledge before 29/10',
          goLabel: 'Open claim'
        }
      },
      chart: {
        title: 'Laboratory · load over test capacity',
        sub: 'Laboratory (LIMS) · baseline 62 % · now 97 % (07:00)',
        icon: 'flask',
        tabLabel: 'Load',
        chart: {
          series: LOAD.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '%',
          threshold: { value: 85, label: 'Warning 85 %', legend: 'Warning 85 % · 65 min above' },
          critical: { value: 100, label: 'Critical 100 %', legend: 'Critical 100 % · 35 min above' },
          peak: { x: '06:20', y: 105, label: '105 % · 06:20' },
          yTicks: [60, 75, 90, 105],
          xTicks: ['05:30', '06:00', '06:30', '07:00'],
          annotations: [{ x: '05:50', label: 'Alarm 05:50' }],
          bands: [
            { from: '05:50', to: '06:00', label: 'Salmonella positive' },
            { from: '06:10', to: '06:40', label: 'Confirmation tests', tone: 'warn' }
          ],
          seriesLabel: 'Load (LIMS)',
          shadeLabel: 'Overload since 06:10'
        },
        events: [
          { time: '05:50', text: 'LIMS records the Salmonella positive in MP-2610-CC-118 (test LAB-2610-0933)', tone: 'crit', tag: 'ALM-LAB-0550' },
          { time: '05:55', end: '06:00', text: 'The Laboratory Manager launches the repeat and confirmation of the test', tone: 'brand', tag: 'LAB-2610-0933' },
          { time: '06:00', end: '06:10', text: 'Load exceeds 85 %: tests on other samples of the batch are added', tone: 'warn', tag: 'LAB-COLA' },
          { time: '06:10', end: '06:40', text: 'Load exceeds 100 %: Salmonella confirmations and the vitamin E retained sample of PRM-2610-0388', tone: 'warn', tag: 'CLM-VITE' },
          { time: '06:20', text: 'Peak of 105 % in the laboratory', tone: 'warn', tag: 'LAB-COLA' },
          { time: '07:00', text: 'Load drops to 97 %, still above 85 %', tone: 'warn' }
        ],
        cause: 'Hypothesis to be confirmed by the Laboratory Manager: the Salmonella positive and the vitamin E retained sample coincide with the morning receiving routine and saturate test capacity.',
        system: 'LIMS (laboratory)',
        footer: 'Reading every 5 min'
      },
      parte: {
        agent: AGENT,
        title: 'Daily operations and quality report',
        sub: 'Readings at 07:00 · 11 indicators for Madrid and the Premix Plant (Spain) · operations and quality thresholds',
        colItem: 'Indicator',
        systems: ['LIMS (laboratory)', 'SAP S/4HANA'],
        inboxTitle: 'Daily operations and quality report · readings at 07:00',
        inboxCount: '11 indicators',
        inboxPending: '4 critical, one of them a Salmonella positive with product already shipped, and 3 warnings pending review.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'LIMS (laboratory)', action: 'Reads overnight test results and the laboratory load', result: 'LAB-2610-0933: Salmonella positive in MP-2610-CC-118', ms: 620 },
          { agent: AGENT, system: 'Plant MES', action: 'Queries today\'s production orders and the batches that consumed the raw material', result: '14 orders today; 4 premix batches with MP-2610-CC-118', ms: 520 },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compares each reading against its operations and quality thresholds (11 indicators)', result: '4 critical · 3 warnings · 4 with no issues', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Calculates the balance of the 4 batches and locates the shipments', result: '96 t = 31 t in warehouse + 65 t shipped to 9 customers (148 shipments)', ms: 410, tone: 'crit' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Looks for open cases and questionnaires for the indicators with alerts', result: 'CLM-2026-1028 (vitamin E) and CUE-2026-052 (questionnaire)', ms: 470 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Cross-checks the alerts against open claims', result: 'CLM-2026-1028: vitamin E −18 % in PRM-2610-0388 (MP-2610-VE-044)', ms: 350, tone: 'warn' },
          { agent: AGENT, system: 'Language model', action: 'Drafts the recommended action for each alert (7 calls)', result: '7 drafts, each with its reference procedure', ms: 6100 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Creates OPS-2026-2801 for SAL-CC118 · urgent priority · feed safety', result: 'Created and assigned to Quality and Feed Safety Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Creates OPS-2026-2802 for RET-PRM · urgent priority · recall', result: 'Created and assigned to Logistics and Export Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Creates OPS-2026-2803 for STK-CC · high priority', result: 'Created and assigned to Plant Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'LIMS (laboratory)', action: 'Creates OPS-2026-2804 for LAB-COLA · medium priority', result: 'Created and assigned to Laboratory Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Creates OPS-2026-2805 for PED-RIE · medium priority', result: 'Created and assigned to Customer Care and Orders', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Updates CLM-2026-1028 (Piensos Cuenca Mediterráneo vitamin E) with today\'s reading', result: 'Evidence added · high priority proposed · no duplicate case', ms: 220 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Updates CUE-2026-052 (Grupo Integrador Levante questionnaire) with today\'s reading', result: 'Reading added · no duplicate ticket', ms: 220 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Posts the summary to the channel «Operations and quality · Norel»', result: 'Sent: 4 critical, 3 warnings and 5 tickets', ms: 410, tone: 'ok' }
        ],
        stats: [
          { label: 'Indicators reviewed', value: 11 },
          { label: 'Tickets created', value: 5, tone: 'ok' },
          { label: 'Cases updated, not duplicated', value: 2 },
          { label: 'Feed safety alerts', value: 1, tone: 'crit' }
        ],
        relation: {
          title: 'Possible link to claim CLM-2026-1028',
          body: 'Vitamin E MP-2610-VE-044 in PRM-2610-0388 (Piensos Cuenca Mediterráneo) is claimed to have a content 18 % below the declared value, and the same vitamin E batch was also used in another premix this week. The content should be verified in the retained sample and in the other batches that consumed it before replying.',
          more: 'The laboratory holds the retained sample of PRM-2610-0388; the in-house analysis (PR-LAB-005) must be compared with the customer report LAB-CLI-2610-77. To be confirmed by the Laboratory Manager.',
          plain: 'Vitamin E MP-2610-VE-044 in PRM-2610-0388 (Piensos Cuenca Mediterráneo) is claimed to have a content 18 % below the declared value, and the same vitamin E batch was also used in another premix this week. The content should be verified in the retained sample and in the other batches that consumed it before replying. To be confirmed by the Laboratory Manager.',
          go: 'reclamacion',
          goLabel: 'Open the claim'
        },
        policy: 'Policy applied: operations and quality tickets are created without prior approval; blocking a batch in SAP QM, holding shipments, notifying customers or notifying the competent authority requires the approval of the Quality and Feed Safety Manager (PR-CAL-007).',
        channel: 'Operations and quality · Norel',
        resultSummary: '5 tickets created, 2 existing cases updated and summary posted to Teams.',
        auditRequest: 'Madrid and Premix Plant · readings at 07:00 · 11 indicators',
        auditNew: 'Operations ticket created',
        auditUpdate: 'Operations case updated',
        reportTitle: 'Daily operations and quality report · Madrid and Premix Plant',
        reportCode: 'PD-NOR-20261028',
        reportMeta: [['Site', 'Madrid (order office) and Premix Plant (Spain)'], ['Shift', 'Morning'], ['Indicators reviewed', '11'], ['Critical · warnings', '4 · 3']],
        reportSummary: 'Of 11 indicators reviewed, 4 are critical and 3 are at warning level. The Salmonella positive in choline chloride MP-2610-CC-118 affects 4 premix batches (96 t), with 65 t already shipped to 9 customers. 5 tickets were created and 2 existing cases were updated, without duplicating them.',
        signatures: [{ role: 'Operations and Quality Manager', note: 'Reviewed' }, { role: 'Quality and Feed Safety Manager (HACCP)', note: 'Received' }]
      },
      presenter: {
        say: [
          'This is how the Norel Operations and Quality Manager starts the shift: whatever needs a decision, in a single inbox.',
          'The data comes from their systems: SAP S/4HANA orders and batches, LIMS tests, Plant MES orders and Salesforce cases. Here it is synthetic, but consistent across systems.',
          'The map summarises the operation at a glance: grey is normal, colour needs attention. Choline chloride MP-2610-CC-118 is red; click it to see the 4 premix batches that used it and their shipments.',
          'Three items: the 05:50 LIMS alarm (Salmonella, 96 t of premix, 65 t already shipped), claim CLM-2026-1028 from Piensos Cuenca Mediterráneo and the report with 4 critical items.'
        ],
        sayBefore: ['Generate daily report: it reviews 11 indicators, does not duplicate open cases and creates the tickets. Watch the time.'],
        sayAfter: [
          'Link found by Agentic Platform: the claimed vitamin E shares a raw material batch with another premix this week. Nobody had to cross-check three systems.',
          'And it does not duplicate: two cases that were already open are updated instead of opening new tickets.'
        ],
        next: 'Click «Generate daily report» and comment on the log while it runs.',
        nextAfter: 'Go to «From words to workflow» (right arrow) to build the response to the Salmonella alarm from the written procedure.'
      }
    };
  })()
});
