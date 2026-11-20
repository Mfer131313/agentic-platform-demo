/* Subtropicales Axarquía · shift summary (scene «turno»), English. Demo scenario with synthetic data (MFM). */
agenticPackEn('fruta', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((330 + i * 5) / 60)).padStart(2, '0')}:${String((330 + i * 5) % 60).padStart(2, '0')}`;
    /* Temperature of ripening room CM-06 (°C), every 5 min from 05:30 to 07:00. */
    const TEMP = [11.3, 11.3, 11.3, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4];
    const AGENT = 'Daily operations and quality report';

    const items = [
      { code: 'TEMP-CM06', name: 'Temperature of room CM-06 (lot AH-2611-118)', tag: 'ALARM', area: 'Ripening and cold chain · Field traceability', metric: 'room temperature versus setpoint', reading: '11.4 °C', baseline: '6.0 °C', limits: 'warning > 8 · critical > 10 °C', status: 'critical',
        note: 'Deviation since 03:40 due to a compressor failure. The room holds 9 pallets of Hass avocado size 18 (lot AH-2611-118, 14 t) earmarked for 3 supermarket orders and for today online shop orders. Holding the lot and moving it to CM-02 requires approval from the Quality and Food Safety Manager.' },
      { code: 'RET-MGO', name: 'Keitt mango shipped with a pesticide residue above the MRL', area: 'Warehouse and shipping · SAP S/4HANA', metric: 'tonnes already shipped to customers', reading: '12 t', baseline: '0 t', limits: 'warning > 0 · critical > 0 t', status: 'critical',
        note: 'LIMS detected a residue above the maximum residue limit (MRL) in receiving lot MG-2611-KE-031 (18 t from grower Agrícola La Vega 417, report LAB-2611-0871). Balance: 6 t in the warehouse and 12 t shipped to 11 customers in Spain, France and Germany, plus 640 online shop orders. Campaign RET-2026-1120: inform the authority and customers within 4 h.' },
      { code: 'CLM-RYE', name: 'Uneven ripening in order PED-2026-44718 (claim CLM-2026-1120)', area: 'Supermercados Levante Fresh, S.A. · Quality', metric: 'hard pieces in ready-to-eat avocado', reading: '35 %', baseline: '< 10 %', limits: 'warning > 15 · critical > 25 %', status: 'critical',
        note: 'The customer claims that 35 % of the pieces of lot AH-2611-092 arrive hard in 4 stores and asks for a credit note and analysis. Acknowledgement within 24 h; 8D report within 10 working days.' },
      { code: 'STK-HASS', name: 'Ready-to-eat Hass avocado cover after the hold', area: 'Ripening and cold chain · WMS', metric: 'days of order cover', reading: '1.5 days', baseline: '4 days', limits: 'warning < 3 · critical < 2 days', status: 'critical',
        note: 'With the 14 t in CM-06 on hold, there is ready-to-eat avocado for only 1.5 days of orders. Consider imported fruit (Chile, Peru) and rescheduling ripening in other rooms.' },
      { code: 'LAB-COLA', name: 'Laboratory load (LIMS)', area: 'Laboratory · LIMS', metric: 'load over analysis capacity', reading: '92 % load', baseline: '60 % load', limits: 'warning > 85 · critical > 100 %', status: 'warning',
        note: 'The confirmation of the mango residue and the firmness and colour sampling of CM-06 push the load up. Prioritise confirmations and postpone non-urgent routine analyses.' },
      { code: 'CUE-063', name: 'Audit questionnaire from Handelsgruppe Nordfrisch', area: 'Quality · SAP S/4HANA', metric: 'days until the questionnaire is due', reading: '5 days', baseline: '≥ 10 days', limits: 'warning < 10 · critical < 3 days', status: 'warning',
        note: 'Case CUE-2026-063: GLOBALG.A.P., GRASP, IFS Food, traceability, MRL and residue plan, water, ESG and footprint, recall plan, allergens (processing) and pest control. Some questions have no evidence and need human review.' },
      { code: 'PED-RIE', name: 'Orders with delivery date at risk', area: 'Online shop (PrestaShop) · WMS', metric: 'orders with delivery at risk', reading: '38 orders', baseline: '< 15 orders', limits: 'warning > 25 · critical > 50 orders', status: 'warning',
        note: 'The hold on CM-06 and the possible mango block affect supermarket and online shop orders. Notify customers with a date at risk and offer alternatives.' },
      { code: 'CAM-HOY', name: 'Fruit trucks received', area: 'Fruit receiving · Field traceability', metric: 'trucks received today', reading: '38 trucks', baseline: '≥ 30 trucks', limits: 'warning < 20 · critical < 12', status: null, note: '' },
      { code: 'PED-ONL', name: 'Online orders to ship', area: 'Online shop (PrestaShop)', metric: 'online orders to ship', reading: '214 orders', baseline: '190 orders', limits: 'warning > 300 · critical > 400', status: null, note: '' },
      { code: 'MAD-OK', name: 'Ripening rooms within setpoint', area: 'Ripening and cold chain · Field traceability', metric: 'rooms within setpoint', reading: '11 of 12', baseline: '12 of 12', limits: 'warning < 11 · critical < 10', status: null, note: '' },
      { code: 'EXP-HOY', name: 'On-time shipments of the day', area: 'Shipping · SAP S/4HANA', metric: 'on-time shipments (week)', reading: '96 %', baseline: '95 %', limits: 'warning < 90 · critical < 85 %', status: null, note: '' }
    ];

    const news = [
      { id: 'OPS-2026-3101', equipment: 'TEMP-CM06', priority: 'Urgent · Product quality', tone: 'crit', owner: 'Quality and Food Safety Manager',
        action: 'Hold lot AH-2611-118 (9 pallets, 14 t), sample firmness and colour and decide its destination; open the work order for the CM-06 compressor and move the product to CM-02. Follows PR-MAD-002.' },
      { id: 'OPS-2026-3102', equipment: 'RET-MGO', priority: 'Urgent · Recall', tone: 'crit', owner: 'Shipping and Export Manager',
        action: 'Locate the shipments of the 12 t of Keitt mango sent to 11 customers (Spain, France and Germany) and the 640 online shop orders, hold the 6 t in the warehouse and prepare the notification to the authority (Regulation (EC) 178/2002, art. 19). Campaign RET-2026-1120.' },
      { id: 'OPS-2026-3103', equipment: 'STK-HASS', priority: 'High', tone: 'crit', owner: 'Ripening and Cold Chain Manager',
        action: 'Reschedule ripening in the other rooms and consider imported fruit (Chile, Peru) to cover the 1.5 days of ready-to-eat avocado cover.' },
      { id: 'OPS-2026-3104', equipment: 'LAB-COLA', priority: 'Medium', tone: 'warn', owner: 'Laboratory Manager',
        action: 'Prioritise the confirmation of the residue in lot MG-2611-KE-031 and the CM-06 sampling; postpone non-urgent routine analyses until the load drops below 85 %.' },
      { id: 'OPS-2026-3105', equipment: 'PED-RIE', priority: 'Medium', tone: 'warn', owner: 'Online Shop Manager',
        action: '38 orders with delivery at risk: notify customers and offer alternative fruit from other rooms or from the imported lot.' }
    ];
    const updates = [
      { id: 'CLM-2026-1120', equipment: 'CLM-RYE', priority: 'High (proposed)', tone: 'crit', owner: 'Quality and Food Safety Manager',
        action: 'Today reading (35 % hard pieces in order PED-2026-44718, lot AH-2611-092) is added to the open case of Supermercados Levante Fresh. No duplicate case is created.' },
      { id: 'CUE-2026-063', equipment: 'CUE-063', priority: 'Unchanged', tone: 'warn', owner: 'Quality and Food Safety Manager',
        action: 'Today reading (5 days until the due date) is added to the open questionnaire of Handelsgruppe Nordfrisch. No duplicate ticket is created.' }
    ];

    return {
      title: 'Axarquía Packing Centre (Málaga) · morning shift',
      nav: 'Shift summary',
      clockLabel: 'Centre time',
      decider: 'Operations and Quality Manager',
      kpis: [
        { label: 'Mango lots in recall', value: 3, sub: '18 t · 6 t in warehouse and 12 t shipped', icon: 'flask', tone: 'crit', href: '#retirada' },
        { label: 'Customers to notify', value: 11, sub: 'Spain, France and Germany · and 640 online orders', icon: 'truck', href: '#retirada' },
        { label: 'Open claims', value: 1, sub: 'CLM-2026-1120 · acknowledge within 24 h, 8D report within 10 working days', icon: 'mail', href: '#reclamacion' },
        { label: 'Indicators in alert', value: '7 of 11', sub: '4 critical · 3 warnings · readings at 07:00', icon: 'activity', action: 'scroll-parte' }
      ],
      map: {
        title: 'Operations map · Axarquía Packing Centre (Málaga)',
        sub: 'Readings from the 07:00 report · click an item for details · 38 fruit trucks received · 214 online orders to ship · 3 critical',
        icon: 'factory',
        readonly: 'Agentic Platform reads SAP S/4HANA, Field traceability, LIMS, WMS and the online shop; it does not hold or release lots on its own',
        zones: [
          { id: 'rec', title: 'Fruit receiving', sub: 'Field traceability · LIMS', items: [
            { code: 'MG-2611-KE-031', name: 'Keitt mango · receiving lot MG-2611-KE-031', reading: 'Residue > MRL', status: 'crit', tags: ['Agrícola La Vega 417', 'LAB-2611-0871'], go: 'retirada', goLabel: 'Open the recall',
              note: 'Pesticide residue above the MRL in the lot received (18 t). It went into 3 packing lots.',
              kv: [['Grower', 'Agrícola La Vega 417'], ['Quantity', '18 t'], ['Report', 'LAB-2611-0871'], ['Source', 'LIMS']] },
            { code: 'CAM-HOY', name: 'Fruit trucks received', reading: '38', status: 'ok', kv: [['Reference', '≥ 30 trucks'], ['System', 'Field traceability']] }
          ] },
          { id: 'mad', title: 'Ripening and cold chain', sub: 'Controlled ripening rooms · WMS', items: [
            { code: 'CM-06', name: 'Ripening room CM-06', reading: '11.4 °C', status: 'crit', tags: ['AH-2611-118', 'ALM-FRIO-0612'], go: 'alarma', goLabel: 'Open the alarm',
              note: 'Compressor failure since 03:40. It holds 9 pallets of Hass avocado size 18 (14 t).',
              kv: [['Setpoint', '6.0 °C'], ['Limits', 'warning > 8 · critical > 10 °C'], ['Lot', 'AH-2611-118'], ['Source', 'Field traceability']] },
            { code: 'STK-HASS', name: 'Ready-to-eat avocado cover', reading: '1.5 days', status: 'crit', note: 'With CM-06 on hold, stock covers only 1.5 days of orders.', kv: [['Reference', '4 days'], ['Limits', 'warning < 3 · critical < 2 days'], ['Source', 'WMS']] },
            { code: 'MAD-OK', name: 'Rooms within setpoint', reading: '11 of 12', status: 'ok', kv: [['Reference', '12 of 12'], ['System', 'Field traceability']] }
          ] },
          { id: 'man', title: 'Packing and packaging', sub: 'WMS · grading and packing of fresh fruit', items: [
            { code: 'MN-2611-0204', name: 'Packed Keitt mango · lot MN-2611-0204', reading: '8 t', status: 'crit', tags: ['MG-2611-KE-031'], note: 'First packing lot made with the affected mango; 3 t in the warehouse and 5 t shipped.', kv: [['Packed', '18/11/2026'], ['Warehouse', '3 t'], ['Shipped', '5 t'], ['Source', 'WMS · SAP S/4HANA']] },
            { code: 'AH-2611-092', name: 'Ready-to-eat Hass avocado · lot AH-2611-092', reading: '35 % hard', status: 'crit', tags: ['CLM-2026-1120'], go: 'reclamacion', goLabel: 'Open the claim', note: 'Lot of order PED-2026-44718 claimed by Supermercados Levante Fresh for uneven ripening.', kv: [['Order', 'PED-2026-44718'], ['Deadlines', 'acknowledge 24 h · 8D report within 10 working days']] }
          ] },
          { id: 'pro', title: 'Processing', sub: 'Guacamole, fresh sauces and cold press · HACCP', items: [
            { code: 'PRO-HOY', name: 'Processing orders today', reading: '9', status: 'ok', kv: [['Reference', '≥ 8 orders'], ['Procedure', 'PR-PRO-005']] },
            { code: 'LAB-COLA', name: 'Laboratory load', reading: '92 %', status: 'warn', note: 'Mango residue confirmation and CM-06 sampling running in parallel.', kv: [['Reference', '60 % load'], ['Limits', 'warning > 85 · critical > 100 %'], ['Source', 'LIMS']] }
          ] },
          { id: 'tie', title: 'Online shop', sub: 'Online shop (PrestaShop) · 2 kg and 4 kg boxes', items: [
            { code: 'PED-ONL', name: 'Online orders to ship', reading: '214', status: 'ok', kv: [['Reference', '190 orders'], ['Critical', '3'], ['System', 'Online shop (PrestaShop)']] },
            { code: 'PED-RIE', name: 'Orders with date at risk', reading: '38', status: 'warn', note: 'Includes orders served from CM-06 and orders with mango from the lot in recall.', kv: [['Reference', '< 15 orders'], ['Limits', 'warning > 25 · critical > 50']] },
            { code: 'CUE-063', name: 'Questionnaire from Handelsgruppe Nordfrisch', reading: '5 days', status: 'warn', tags: ['CUE-2026-063'], go: 'cuestionario', goLabel: 'Open the questionnaire', note: 'Fruit supplier audit: GLOBALG.A.P., GRASP, IFS Food, traceability and recall plan.', kv: [['Reference', '≥ 10 days'], ['System', 'SAP S/4HANA']] }
          ] },
          { id: 'exp', title: 'Shipping', sub: 'SAP S/4HANA · Shipping and export', items: [
            { code: 'RET-MGO', name: 'Mango shipped with residue > MRL', reading: '12 t', status: 'crit', tags: ['RET-2026-1120'], go: 'retirada', goLabel: 'Open the recall',
              note: '11 customers in Spain, France and Germany and 640 online shop orders. Goal: inform the authority and customers within 4 h.',
              kv: [['Received', '18 t'], ['In warehouse', '6 t'], ['Shipped', '12 t'], ['Countries', 'Spain · France · Germany']] },
            { code: 'EXP-HOY', name: 'On-time shipments', reading: '96 %', status: 'ok', kv: [['Reference', '95 %'], ['System', 'SAP S/4HANA']] }
          ] },
          { id: 'com', title: 'Communication', sub: 'Customer care and team', items: [
            { code: 'OUT', name: 'Customer notices (Outlook)', reading: null, status: null, kv: [['Use', 'Hold notices, claim acknowledgements and replies']] },
            { code: 'TMS', name: 'Channel «Operations and quality · SAX»', reading: null, status: null, kv: [['System', 'Microsoft Teams'], ['Use', 'Daily report summary']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'flask',
          title: 'Ripening and cold chain · Temperature deviation in room CM-06 (lot AH-2611-118)',
          meta: ['Alarm 05:50 · ALM-FRIO-0612'],
          systems: ['Field traceability'],
          body: 'Controlled ripening room CM-06 is at 11.4 °C against a setpoint of 6.0 °C since 03:40 (compressor failure). It holds 9 pallets of Hass avocado size 18 (lot AH-2611-118, 14 t) earmarked for 3 supermarket orders and for today online shop orders.'
        },
        complaint: {
          icon: 'mail',
          title: 'Claim CLM-2026-1120 · 35 % of ready-to-eat avocado pieces hard',
          meta: ['20/11 08:05', 'Supermercados Levante Fresh, S.A.', 'Supermarket chain · order PED-2026-44718'],
          body: 'Claims that in the ready-to-eat avocado order 35 % of the pieces arrive hard (uneven ripening) in 4 stores, and asks for a credit note and analysis. Lot',
          trace: 'AH-2611-092',
          after: 'Deadlines: acknowledgement within 24 h and 8D report within 10 working days.',
          due: 'Acknowledge before 21/11',
          goLabel: 'Open claim'
        }
      },
      chart: {
        title: 'Room CM-06 · temperature versus setpoint',
        sub: 'Ripening and cold chain · setpoint 6.0 °C · now 11.4 °C (07:00)',
        icon: 'flask',
        tabLabel: 'Temperature',
        chart: {
          series: TEMP.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '°C',
          threshold: { value: 8, label: 'Warning 8 °C', legend: 'Warning 8 °C · above since 03:40' },
          critical: { value: 10, label: 'Critical 10 °C', legend: 'Critical 10 °C · above since 03:40' },
          peak: { x: '05:45', y: 11.4, label: '11.4 °C · 05:45' },
          yTicks: [6, 8, 10, 12],
          xTicks: ['05:30', '06:00', '06:30', '07:00'],
          annotations: [{ x: '05:50', label: 'Alarm 05:50' }],
          bands: [
            { from: '05:50', to: '06:00', label: 'Alarm ALM-FRIO-0612' },
            { from: '06:10', to: '06:40', label: 'Firmness and colour sampling', tone: 'warn' }
          ],
          seriesLabel: 'CM-06 temperature',
          shadeLabel: 'Above setpoint since 03:40'
        },
        events: [
          { time: '05:50', text: 'Field traceability records the temperature deviation in CM-06 (11.4 °C versus 6.0 °C)', tone: 'crit', tag: 'ALM-FRIO-0612' },
          { time: '05:55', end: '06:00', text: 'The Ripening and Cold Chain Manager confirms the compressor failure and opens the work order', tone: 'brand', tag: 'CM-06' },
          { time: '06:00', end: '06:10', text: 'Quality proposes holding lot AH-2611-118 (9 pallets, 14 t)', tone: 'warn', tag: 'AH-2611-118' },
          { time: '06:10', end: '06:40', text: 'Firmness and colour sampling of the lot and preparation of the move to CM-02', tone: 'warn', tag: 'LAB-COLA' },
          { time: '06:20', text: 'Logistics reviews the 3 supermarket orders and the online shop orders affected', tone: 'warn', tag: 'PED-RIE' },
          { time: '07:00', text: 'The room is still at 11.4 °C, above the setpoint', tone: 'warn' }
        ],
        cause: 'Hypothesis to be confirmed by the Ripening and Cold Chain Manager: CM-06 compressor failure since 03:40; the product must be moved to CM-02 and assessed with firmness and colour sampling.',
        system: 'Field traceability',
        footer: 'Reading every 5 min'
      },
      parte: {
        agent: AGENT,
        title: 'Daily operations and quality report',
        sub: 'Readings at 07:00 · 11 indicators from the Axarquía Packing Centre (Málaga) · operations and quality thresholds',
        colItem: 'Indicator',
        systems: ['Field traceability', 'SAP S/4HANA'],
        inboxTitle: 'Daily operations and quality report · readings at 07:00',
        inboxCount: '11 indicators',
        inboxPending: '4 critical, one of them a residue above the MRL with product already shipped, and 3 warnings pending review.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'Field traceability', action: 'Reads the ripening room temperatures and the trucks received overnight', result: 'CM-06 at 11.4 °C versus 6.0 °C; 38 trucks received', ms: 620 },
          { agent: AGENT, system: 'LIMS', action: 'Checks the residue results and the laboratory load', result: 'LAB-2611-0871: residue above the MRL in MG-2611-KE-031', ms: 520 },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compares each reading with its operations and quality thresholds (11 indicators)', result: '4 critical · 3 warnings · 4 with no issues', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Calculates the balance of the 3 mango lots and locates the shipments', result: '18 t = 6 t in warehouse + 12 t shipped to 11 customers and 640 online orders', ms: 410, tone: 'crit' },
          { agent: AGENT, system: 'Online shop (PrestaShop)', action: 'Looks up the affected online orders and the open cases of the indicators in alert', result: '640 orders with mango from the lot; CLM-2026-1120 and CUE-2026-063 open', ms: 470 },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Cross-checks the alerts against open claims', result: 'CLM-2026-1120: 35 % hard pieces in AH-2611-092 (PED-2026-44718)', ms: 350, tone: 'warn' },
          { agent: AGENT, system: 'Language model', action: 'Drafts the recommended action for each alert (7 calls)', result: '7 drafts, each with its reference procedure', ms: 6100 },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Creates OPS-2026-3101 for TEMP-CM06 · urgent priority · product quality', result: 'Created and assigned to Quality and Food Safety Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Creates OPS-2026-3102 for RET-MGO · urgent priority · recall', result: 'Created and assigned to Shipping and Export Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'WMS', action: 'Creates OPS-2026-3103 for STK-HASS · high priority', result: 'Created and assigned to Ripening and Cold Chain Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'LIMS', action: 'Creates OPS-2026-3104 for LAB-COLA · medium priority', result: 'Created and assigned to Laboratory Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Online shop (PrestaShop)', action: 'Creates OPS-2026-3105 for PED-RIE · medium priority', result: 'Created and assigned to Online Shop Manager', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Updates CLM-2026-1120 (uneven ripening from Supermercados Levante Fresh) with today reading', result: 'Evidence added · high priority proposed · no duplicate case', ms: 220 },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Updates CUE-2026-063 (questionnaire from Handelsgruppe Nordfrisch) with today reading', result: 'Reading added · no duplicate ticket', ms: 220 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Posts the summary to the channel «Operations and quality · SAX»', result: 'Sent: 4 critical, 3 warnings and 5 tickets', ms: 410, tone: 'ok' }
        ],
        stats: [
          { label: 'Indicators reviewed', value: 11 },
          { label: 'Tickets created', value: 5, tone: 'ok' },
          { label: 'Cases updated, not duplicated', value: 2 },
          { label: 'Food safety alerts', value: 1, tone: 'crit' }
        ],
        relation: {
          title: 'Possible link to claim CLM-2026-1120',
          body: 'The uneven ripening of lot AH-2611-092 (Supermercados Levante Fresh) coincides with a ripening room that already had temperature deviations last week, and the same lot was also served to other customers. The temperature history and the firmness of the other deliveries should be verified before replying.',
          more: 'The laboratory holds samples of the lot; the firmness and colour analysis (PR-MAD-002) must be compared with the customer report. To be confirmed by the Quality and Food Safety Manager.',
          plain: 'The uneven ripening of lot AH-2611-092 (Supermercados Levante Fresh) coincides with a ripening room that already had temperature deviations last week, and the same lot was also served to other customers. The temperature history and the firmness of the other deliveries should be verified before replying. To be confirmed by the Quality and Food Safety Manager.',
          go: 'reclamacion',
          goLabel: 'Open the claim'
        },
        policy: 'Policy applied: operations and quality tickets are created without prior approval; holding a lot, blocking shipments, notifying customers or notifying the authority requires approval from the Quality and Food Safety Manager (PR-TRZ-003).',
        channel: 'Operations and quality · SAX',
        resultSummary: '5 tickets created, 2 existing cases updated and summary posted to Teams.',
        auditRequest: 'Axarquía Packing Centre · readings at 07:00 · 11 indicators',
        auditNew: 'Operations ticket created',
        auditUpdate: 'Operations case updated',
        reportTitle: 'Daily operations and quality report · Axarquía Packing Centre',
        reportCode: 'PD-SAX-20261120',
        reportMeta: [['Centre', 'Axarquía Packing Centre (Málaga)'], ['Shift', 'Morning'], ['Indicators reviewed', '11'], ['Critical · warnings', '4 · 3']],
        reportSummary: 'Of 11 indicators reviewed, 4 are critical and 3 are in warning. The temperature deviation in CM-06 affects 14 t of Hass avocado (lot AH-2611-118) and the residue above the MRL in mango MG-2611-KE-031 leaves 12 t already shipped to 11 customers and 640 online orders. 5 tickets were created and 2 existing cases were updated, without duplicating them.',
        signatures: [{ role: 'Operations and Quality Manager', note: 'Reviewed' }, { role: 'Quality and Food Safety Manager', note: 'Received' }]
      },
      presenter: {
        say: [
          'This is how the Operations and Quality Manager of Subtropicales Axarquía starts the shift: everything that needs a decision, in a single inbox.',
          'The data comes from their systems: orders and lots from SAP S/4HANA, temperatures from field traceability, LIMS analyses, the WMS and the online shop. Here it is synthetic, but consistent across systems.',
          'The map summarises the operation at a glance: grey is normal, colour needs attention. Room CM-06 is red; click it to see the 9 pallets of Hass avocado and the orders they were meant for.',
          'Three matters: the 05:50 cold chain alarm (CM-06 at 11.4 °C, 14 t of avocado), claim CLM-2026-1120 from Supermercados Levante Fresh and the report with 4 critical items.'
        ],
        sayBefore: ['Generate daily report: it reviews 11 indicators, does not duplicate open cases and creates the tickets. Watch the time.'],
        sayAfter: [
          'Link found by Agentic Platform: the claimed avocado shares a ripening room with a deviation from last week. Nobody had to cross-check three systems.',
          'And it does not duplicate: two cases that were already open are updated instead of opening new tickets.'
        ],
        next: 'Click «Generate daily report» and comment on the log while it runs.',
        nextAfter: 'Go to «From words to workflow» (right arrow) to build the response to the cold chain alarm from the written procedure.'
      }
    };
  })()
});
