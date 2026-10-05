/* Empresa de Congelados · shift summary (scene «turno»), English. Reference demo scenario with synthetic data (MFM). */
agenticPackEn('congelados', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((300 + i * 5) / 60)).padStart(2, '0')}:${String((300 + i * 5) % 60).padStart(2, '0')}`;
    /* Air temperature in chamber C-07 (sensor TT-C07-01), every 5 min from 05:00 to 07:00. */
    const TEMP = [-22.1, -22, -22.2, -22.1, -21.9, -22, -22.1, -21.5, -20.7, -19.4, -17.8, -17.1, -16.5, -15.9, -15.3, -14.8, -14.2,
      -13.9, -14.4, -16.6, -18.4, -19.3, -19.9, -20.3, -20.5];
    const AGENT = 'Daily plant report';

    const items = [
      { code: 'DM-1', name: 'Metal detector DM-1', tag: 'CCP', area: 'Line L1 (sweet corn), packing outlet', metric: 'hours since last verification', reading: '3.5 h', baseline: '2 h', limits: 'warning > 1.75 · critical > 2 h', status: 'critical',
        note: 'CCP: test-piece verification overdue (3.5 h; maximum 2 h). Verify now and hold the product packed since the last correct verification (02:30).' },
      { code: 'ESC-3', name: 'Belt blancher ESC-3', area: 'Line L3 (green beans)', metric: 'blanching water temperature', reading: '86.4 °C water', baseline: '92 °C water', limits: 'warning ±2 · critical ±4 °C', status: 'critical',
        note: 'Water below setpoint: risk of under-blanching; verify with a peroxidase test.' },
      { code: 'OPT-2', name: 'Optical sorter OPT-2', area: 'Line L2 (green beans)', metric: 'reject rate', reading: '4.8% rejected', baseline: '1.5% rejected', limits: 'warning > 2.5 · critical > 4%', status: 'critical',
        note: 'Reject rate tripled: possible increase in stones and clods at the infeed; check destoner DP-2 (mesh wear noted on 2026-08-18, OT-26-07415 open).' },
      { code: 'NH3-C2', name: 'Ammonia compressor NH3-C2', area: 'Refrigeration machine room', metric: 'vibration', reading: '6.2 mm/s RMS', baseline: '2.2 mm/s RMS', limits: 'warning > 4.5 · critical > 6 mm/s', status: 'critical',
        note: 'Vibration above 6 mm/s: risk of ammonia compressor failure; inspect and consider switching over to NH3-C1.' },
      { code: 'TUN-1', name: 'IQF tunnel TUN-1', area: 'Line L1 (sweet corn)', metric: 'tunnel air temperature', reading: '−29.5 °C air', baseline: '−35 °C air', limits: 'warning > −32 · critical > −28 °C', status: 'warning',
        note: 'Air 5.5 °C warmer than setpoint: check evaporator defrost and load; end-of-season sweet corn arrives tomorrow.' },
      { code: 'EV-SIL3', name: 'Evaporator EV-SIL3 (automated silo 3)', area: 'Automated silo 3', metric: 'hours since last defrost', reading: '14 h', baseline: '8 h', limits: 'warning > 10 · critical > 16 h', status: 'warning',
        note: 'Defrost pending: silo 3 is at −23.9 °C (setpoint −25 °C), still within limits.' },
      { code: 'ENV-5', name: 'Mixed-vegetable packer ENV-5', area: 'Packing room (mixes)', metric: 'stops per hour', reading: '7 stops/h', baseline: '2 stops/h', limits: 'warning > 4 · critical > 9 stops/h', status: 'warning',
        note: 'Film jams in the sealing jaw; a work order is already open.' },
      { code: 'TUN-2', name: 'IQF tunnel TUN-2', area: 'Line L2 (green beans)', metric: 'tunnel air temperature', reading: '−35.4 °C air', baseline: '−35 °C air', limits: 'warning > −32 · critical > −28 °C', status: null, note: '' },
      { code: 'NH3-C1', name: 'Ammonia compressor NH3-C1', area: 'Refrigeration machine room', metric: 'vibration', reading: '2.3 mm/s RMS', baseline: '2.1 mm/s RMS', limits: 'warning > 4.5 · critical > 6 mm/s', status: null, note: '' },
      { code: 'LAV-1', name: 'Vegetable washer LAV-1', area: 'Line L1 (sweet corn)', metric: 'free chlorine in wash water', reading: '2.6 ppm', baseline: '3 ppm', limits: 'warning ±1 · critical ±2 ppm', status: null, note: '' },
      { code: 'CAL-B1', name: 'Steam boiler CAL-B1', area: 'Boiler room', metric: 'steam pressure', reading: '9.8 bar', baseline: '10 bar', limits: 'warning < 8.5 · critical < 7.5 bar', status: null, note: '' }
    ];

    const news = [
      { id: 'MNT-2026-1184', equipment: 'DM-1', priority: 'Urgent · CCP', tone: 'crit', owner: 'Line Maintenance and Shift Quality',
        action: 'Verify DM-1 with test pieces now (3.5 h without verification; maximum 2 h). Quality decides whether to hold the product packed since 02:30 (PNT-CAL-031).' },
      { id: 'MNT-2026-1185', equipment: 'NH3-C2', priority: 'High', tone: 'crit', owner: 'Refrigeration Maintenance',
        action: 'Inspect the compressor: 6.2 mm/s RMS (reference 2.2). Consider switching over to NH3-C1, which is within range.' },
      { id: 'MNT-2026-1186', equipment: 'ESC-3', priority: 'High', tone: 'crit', owner: 'Line Maintenance',
        action: 'Blanching water at 86.4 °C (setpoint 92 °C): check the steam supply and verify with a peroxidase test. Boiler CAL-B1 is within range (9.8 bar), so the likely cause is local.' },
      { id: 'MNT-2026-1187', equipment: 'TUN-1', priority: 'Medium', tone: 'warn', owner: 'Refrigeration Maintenance',
        action: 'Tunnel air at −29.5 °C (setpoint −35 °C): check defrost and load before the end-of-season sweet corn arrives on 30/09.' },
      { id: 'MNT-2026-1188', equipment: 'EV-SIL3', priority: 'Medium', tone: 'warn', owner: 'Refrigeration Maintenance',
        action: 'Schedule the defrost of EV-SIL3 (14 h since the last one). Silo 3 is still within limits (−23.9 °C).' }
    ];
    const updates = [
      { id: 'OT-26-07415', equipment: 'OPT-2', priority: 'High (proposed)', tone: 'crit', owner: 'Line Maintenance',
        action: 'The OPT-2 evidence (4.8% rejected, reference 1.5%) is added to the work order for the DP-2 mesh, open since 18/08/2026 and awaiting the spare part.' },
      { id: 'OT-26-08812', equipment: 'ENV-5', priority: 'No change', tone: 'warn', owner: 'Line Maintenance',
        action: 'Today’s reading (7 stops/h) is added to the work order already open for film jams. No duplicate ticket is created.' }
    ];

    return {
      title: 'Fustiñana · morning shift',
      nav: 'Shift summary',
      clockLabel: 'Plant time',
      decider: 'Quality',
      kpis: [
        { label: 'Pallets in C-07 during the excursion', value: 38, sub: '6 lots · 28,592 kg', icon: 'pallet', tone: 'crit', href: '#alarma' },
        { label: 'Lots affected', value: 6, sub: '5 planned shipments · the first at 09:30', icon: 'box', href: '#alarma' },
        { label: 'Open complaints', value: 1, sub: 'UKC-44718 · reply due by 02/10/2026', icon: 'mail', href: '#reclamacion' },
        { label: 'Equipment with alerts', value: '7 of 11', sub: '4 critical · 3 warnings · 06:00 readings', icon: 'activity', action: 'scroll-parte' }
      ],
      map: {
        title: 'Plant layout · Fustiñana',
        sub: 'Readings from the 06:00 report and the chambers at 07:00 · click an element to see its details',
        icon: 'factory',
        readonly: 'Agentic Platform reads SCADA Galileo, MES Mapex and Easy WMS; it does not act on plant control',
        zones: [
          { id: 'rec', title: 'Intake', sub: 'Field and laboratory', items: [
            { code: 'BAS', name: 'Weighbridges', reading: null, status: null, kv: [['Use', 'Weighing and trailer card'], ['System', 'SAP']] },
            { code: 'TLV', name: 'Intake hoppers', reading: null, status: null, note: 'Tomorrow (30/09) end-of-season sweet corn and green beans arrive. TUN-1 is in warning (air −29.5 °C against −35 °C): if not corrected, effective capacity drops to 85%.', kv: [['Feeds', 'Lines L1 to L3'], ['System', 'MES Mapex']] },
            { code: 'LAB', name: 'Quality laboratory', reading: null, status: null, note: 'Test-piece verification of DM-1 (CCP · PNT-CAL-031) and peroxidase test recommended for ESC-3.', kv: [['Tests', 'Intake, process and product'], ['System', 'Elara']] }
          ] },
          { id: 'l12', title: 'Lines L1 and L2', sub: 'Sweet corn · peas and green beans', items: [
            { code: 'LAV-1', name: 'Washer LAV-1', reading: '2.6 ppm', status: 'ok', kv: [['Indicator', 'Free chlorine in wash water'], ['Setpoint', '3 ppm']] },
            { code: 'TUN-1', name: 'IQF tunnel TUN-1', reading: '−29.5 °C', status: 'warn', note: 'Air 5.5 °C warmer than setpoint: check evaporator defrost and load; end-of-season sweet corn arrives tomorrow.', kv: [['Setpoint', '−35 °C'], ['Limits', 'warning > −32 · critical > −28 °C'], ['Source', 'SCADA Galileo']] },
            { code: 'DM-1', name: 'Metal detector DM-1', reading: '3.5 h', status: 'crit', tags: ['CCP'],
              note: 'CCP: test-piece verification overdue. Hold the product packed on ENV-3 since the last correct verification (02:30): Quality decides.',
              kv: [['Maximum', '2 h'], ['Last correct verification', '02:30'], ['Procedure', 'PNT-CAL-031'], ['Source', 'MES Mapex · Elara']] },
            { code: 'DP-2', name: 'Destoner DP-2', reading: null, status: null, tags: ['OT-26-07415'], go: 'reclamacion', goLabel: 'Open the complaint',
              note: 'Mesh wear noted on 18/08/2026; work order OT-26-07415 is still open, awaiting the spare part. It sits before OPT-2 on L2, the line of the complained lot.',
              kv: [['Open work order', 'OT-26-07415 · since 18/08/2026'], ['Days open', '42'], ['Instruction', 'IT-MAN-DP-02']] },
            { code: 'TUN-2', name: 'IQF tunnel TUN-2', reading: '−35.4 °C', status: 'ok', kv: [['Setpoint', '−35 °C']] },
            { code: 'OPT-2', name: 'Optical sorter OPT-2', reading: '4.8%', status: 'crit', note: 'Reject rate tripled: possible increase in stones and clods at the infeed; check destoner DP-2.', kv: [['Reference', '1.5%'], ['Limits', 'warning > 2.5 · critical > 4%'], ['Source', 'MES Mapex']] }
          ] },
          { id: 'l35', title: 'Lines L3 to L5', sub: 'Beans and broccoli · repacking · mixes', items: [
            { code: 'ESC-3', name: 'Belt blancher ESC-3', reading: '86.4 °C', status: 'crit', note: 'Water below setpoint: risk of under-blanching. Boiler CAL-B1 is within range, so the likely cause is local.', kv: [['Setpoint', '92 °C'], ['Limits', 'warning ±2 · critical ±4 °C'], ['Boiler CAL-B1', '9.8 bar · within range']] },
            { code: 'OPT-3', name: 'Optical sorter OPT-3', reading: null, status: null, kv: [['Line', 'L3 · green beans and broccoli']] },
            { code: 'DM-2', name: 'Metal detector DM-2', reading: null, status: null, kv: [['Line', 'L4 · repacking from bulk']] },
            { code: 'ENV-5', name: 'Mixed-vegetable packer ENV-5', reading: '7 stops/h', status: 'warn', tags: ['OT-26-08812'], note: 'Film jams in the sealing jaw; a work order is already open.', kv: [['Reference', '2 stops/h'], ['Open work order', 'OT-26-08812']] }
          ] },
          { id: 'frio', title: 'Refrigeration and utilities', sub: 'NH3 machine room and boilers', items: [
            { code: 'NH3-C1', name: 'Compressor NH3-C1', reading: '2.3 mm/s', status: 'ok', kv: [['Reference', '2.1 mm/s RMS']] },
            { code: 'NH3-C2', name: 'Compressor NH3-C2', reading: '6.2 mm/s', status: 'crit', note: 'Vibration above 6 mm/s: risk of ammonia compressor failure; inspect and consider switching over to NH3-C1, which is within range.', kv: [['Reference', '2.2 mm/s RMS'], ['Limits', 'warning > 4.5 · critical > 6 mm/s'], ['Source', 'SCADA Galileo']] },
            { code: 'CAL-B1', name: 'Steam boiler CAL-B1', reading: '9.8 bar', status: 'ok', kv: [['Setpoint', '10 bar']] }
          ] },
          { id: 'alm', title: 'Automated warehouse', sub: 'Mecalux Easy WMS · −25 °C', items: [
            { code: 'SIL-1', name: 'Automated silo 1', reading: '−25.2 °C', status: 'ok', tags: ['L26-258-FUS-BRO-01'], note: '12 pallets of lot L26-258-FUS-BRO-01, which was exposed in C-07: to be assessed. It also holds bulk lot G26-132-FUS-BRO.', kv: [['Setpoint', '−25 °C'], ['Capacity', '27,000 pallets']] },
            { code: 'SIL-2', name: 'Automated silo 2', reading: '−24.9 °C', status: 'ok', tags: ['L26-255-ALF-ESP-04'], note: '7 pallets of lot L26-255-ALF-ESP-04, which was exposed in C-07: to be assessed. It also holds bulk lot G26-176-FUS-GUI.', kv: [['Setpoint', '−25 °C'], ['Capacity', '34,000 pallets']] },
            { code: 'SIL-3', name: 'Automated silo 3', reading: '−23.9 °C', status: 'ok', tags: ['L26-261-FUS-GUI-03', 'L26-231-FUS-GUI-01'], note: '10 pallets of lot L26-261-FUS-GUI-03, exposed in C-07, and the 2 remaining pallets of the complained lot L26-231-FUS-GUI-01. EV-SIL3 defrost pending.', kv: [['Setpoint', '−25 °C'], ['Capacity', '83,000 pallets'], ['Evaporator', 'EV-SIL3 · 14 h without defrost']] },
            { code: 'SIL-4', name: 'Automated silo 4', reading: '−25.1 °C', status: 'ok', tags: ['L26-263-FUS-MAI-02'], note: '18 pallets of lot L26-263-FUS-MAI-02, which was exposed in C-07: to be assessed.', kv: [['Setpoint', '−25 °C'], ['Capacity', '16,000 pallets']] },
            { code: 'EV-SIL3', name: 'Evaporator EV-SIL3', reading: '14 h', status: 'warn', note: 'Defrost pending: silo 3 is at −23.9 °C (setpoint −25 °C), still within limits.', kv: [['Reference', '8 h'], ['Limits', 'warning > 10 · critical > 16 h']] }
          ] },
          { id: 'exp', title: 'Dispatch chambers', sub: 'SCADA Galileo · −22 °C', items: [
            { code: 'C-06', name: 'Dispatch chamber 6', reading: '−22.3 °C', status: 'ok', kv: [['Setpoint', '−22 °C'], ['Capacity', '240 pallets']] },
            { code: 'C-07', name: 'Dispatch chamber 7', reading: '−20.5 °C', status: 'crit', tags: ['ALM-C07-0550'], go: 'alarma', goLabel: 'Open the alarm',
              note: 'Excursion from 05:50 to 06:40: peak of −13.9 °C at 06:25, 50 min above −18 °C and 20 min above −15 °C. 38 pallets from 6 lots exposed; the first affected shipment, EXP-26-41106, leaves at 09:30 from dock 2.',
              kv: [['Setpoint', '−22 °C'], ['Now (07:00)', '−20.5 °C'], ['Pallets exposed', '38 · 28,592 kg'], ['Sensor', 'TT-C07-01'], ['Rule', 'PNT-CAL-012']] },
            { code: 'C-08', name: 'Dispatch chamber 8', reading: '−21.8 °C', status: 'ok', kv: [['Setpoint', '−22 °C'], ['Capacity', '240 pallets']] },
            { code: 'EV-07', name: 'Evaporator EV-07', reading: null, status: null, note: 'Scheduled defrost from 05:40 to 06:05 (fans stopped from 05:35).', kv: [['Chamber', 'C-07']] },
            { code: 'P-07', name: 'Rapid door P-07', reading: null, status: 'warn', note: 'Door-open sensor from 05:52 to 06:31: the rapid door did not close fully. Closed manually at 06:31 by the Dispatch Shift Manager.', kv: [['Chamber', 'C-07'], ['Status', 'Check closing']] }
          ] },
          { id: 'mue', title: 'Loading docks', sub: 'Planned shipments', items: [
            { code: 'M1', name: 'Loading dock 1', reading: null, status: null, kv: [['Status', 'No shipment assigned']] },
            { code: 'M2', name: 'Loading dock 2', reading: 'EXP-26-41106 · 09:30', status: 'warn', tags: ['L26-258-FUS-BRO-01'], note: '6 pallets from C-07 (lane 1) awaiting a decision.', kv: [['Customer', 'Foodservice distributor ES (central region)'], ['Transport', 'Refrigerated truck −25 °C']] },
            { code: 'M3', name: 'Loading dock 3', reading: 'EXP-26-41107 · 11:00', status: 'warn', tags: ['L26-261-FUS-GUI-03', 'L26-255-ALF-ESP-04'], note: '13 pallets from C-07 (lanes 2 and 3) awaiting a decision.', kv: [['Customer', 'Retail logistics platform ES'], ['Transport', 'Refrigerated truck −25 °C']] },
            { code: 'M4', name: 'Loading dock 4', reading: 'EXP-26-41109 · 14:00', status: 'warn', tags: ['L26-262-FUS-MIX-02'], note: '7 pallets from C-07 (lane 4) awaiting a decision.', kv: [['Customer', 'EC Foods UK Ltd (EC subsidiary, United Kingdom)'], ['Transport', 'Refrigerated truck −25 °C']] },
            { code: 'M5', name: 'Loading dock 5', reading: 'EXP-26-41111 · 16:30', status: 'warn', tags: ['L26-259-FUS-JUD-01'], note: '6 pallets from C-07 (lane 5) awaiting a decision.', kv: [['Customer', 'Importer France'], ['Transport', 'Refrigerated truck −25 °C']] },
            { code: 'M6', name: 'Loading dock 6', reading: 'EXP-26-41118 · 30/09 07:00', status: 'warn', tags: ['L26-263-FUS-MAI-02'], note: '6 pallets from C-07 (lane 6) awaiting a decision.', kv: [['Customer', 'EC Frozen Foods LLC (EC subsidiary, USA)'], ['Transport', 'Reefer container (consolidation, departure by port)']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'thermometer',
          title: 'Chamber C-07 · temperature excursion',
          meta: ['Alarm 05:50 · ALM-C07-0550'],
          systems: ['SCADA Galileo'],
          body: 'Peak of −13.9 °C at 06:25; 50 min above −18 °C. 38 pallets from 6 lots exposed. The first affected shipment, EXP-26-41106, leaves at 09:30 (Dock 2).'
        },
        complaint: {
          icon: 'mail',
          title: 'Complaint UKC-44718 · stone in peas 1 kg',
          meta: ['26/09 10:14', 'EC Foods UK Ltd', 'UK retailer (own label)'],
          body: 'Stone of about 8 mm, no injury. Lot',
          trace: 'L26-231-FUS-GUI-01',
          after: 'The customer asks for an investigation report within 5 working days.',
          due: 'Due 02/10',
          goLabel: 'Open complaint'
        }
      },
      chart: {
        title: 'Chamber C-07 · air temperature',
        sub: 'Dispatch chamber 7 · setpoint −22 °C · now −20.5 °C (07:00)',
        icon: 'thermometer',
        tabLabel: 'Temperature',
        chart: {
          series: TEMP.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '°C',
          threshold: { value: -18, label: 'Limit −18 °C', legend: 'Limit −18 °C · 50 min above' },
          critical: { value: -15, label: 'Critical −15 °C', legend: 'Critical −15 °C · 20 min above' },
          peak: { x: '06:25', y: -13.9, label: '−13.9 °C · 06:25' },
          yTicks: [-24, -21, -18, -15, -12],
          xTicks: ['05:00', '05:30', '06:00', '06:30', '07:00'],
          annotations: [{ x: '05:50', label: 'Alarm 05:50' }],
          bands: [
            { from: '05:40', to: '06:05', label: 'EV-07 defrost' },
            { from: '05:52', to: '06:31', label: 'Door P-07 open', tone: 'warn' }
          ],
          seriesLabel: 'Air (TT-C07-01)',
          shadeLabel: 'Excursion 05:50–06:40'
        },
        events: [
          { time: '05:35', end: '05:40', text: 'EV-07 fans stop (start of the defrost cycle)', tone: 'brand', tag: 'EV-07' },
          { time: '05:40', end: '06:05', text: 'Scheduled defrost of EV-07', tone: 'brand', tag: 'EV-07' },
          { time: '05:50', text: 'SCADA alarm: air temperature above -18 °C', tone: 'crit', tag: 'ALM-C07-0550' },
          { time: '05:52', end: '06:31', text: 'Door sensor P-07 open: the rapid door does not close fully', tone: 'warn', tag: 'P-07' },
          { time: '06:31', text: 'P-07 closed manually by the Dispatch Shift Manager', tone: 'warn', tag: 'P-07' },
          { time: '06:40', text: 'Air temperature back below -18 °C', tone: 'ok' }
        ],
        cause: 'Hypothesis to be confirmed by Refrigeration Maintenance: the EV-07 defrost (05:40-06:05) overlapped with a closing failure of rapid door P-07 (door-open sensor 05:52-06:31).',
        system: 'SCADA Galileo',
        footer: 'Reading every 5 min'
      },
      parte: {
        agent: AGENT,
        title: 'Daily equipment report',
        sub: '06:00 readings · 11 items of equipment at Fustiñana · plant thresholds',
        colItem: 'Equipment',
        systems: ['MES Mapex', 'SCADA Galileo'],
        inboxTitle: 'Daily equipment report · 06:00 readings',
        inboxCount: '11 items of equipment',
        inboxPending: '4 critical, one of them a CCP (DM-1), and 3 warnings pending review.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'MES Mapex', action: 'Reads the 06:00 readings from 11 items of equipment (lines L1, L2, L3 and L5, refrigeration and utilities)', result: '11 readings received, no gaps', ms: 640 },
          { agent: AGENT, system: 'SCADA Galileo', action: 'Queries tunnels, evaporators and ammonia compressors', result: 'EV-SIL3 has gone 14 h without defrost; NH3-C2 vibrating at 6.2 mm/s', ms: 520 },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compares each reading with its plant thresholds (9 indicators)', result: '4 critical · 3 warnings · 4 without issues', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'Elara', action: 'Checks the CCPs and their verification records', result: 'DM-1 is a CCP: verification overdue (3.5 h; maximum 2 h)', ms: 380, tone: 'crit' },
          { agent: AGENT, system: 'GMAO', action: 'Looks for open work orders on the equipment with alerts and on its line', result: 'OT-26-08812 (ENV-5) and OT-26-07415 (DP-2, upstream of OPT-2 on L2)', ms: 470 },
          { agent: AGENT, system: 'Elara', action: 'Cross-checks the alerts against open complaints', result: 'UKC-44718: 8 mm stone in an L2 lot from 19/08', ms: 350, tone: 'warn' },
          { agent: AGENT, system: 'Language model', action: 'Drafts the recommended action for each alert (7 calls)', result: '7 drafts, each with its reference procedure', ms: 6100 },
          { agent: AGENT, system: 'GMAO', action: 'Creates MNT-2026-1184 for DM-1 · priority urgent · CCP', result: 'Created and assigned to Line Maintenance and Shift Quality', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'GMAO', action: 'Creates MNT-2026-1185 for NH3-C2 · priority high', result: 'Created and assigned to Refrigeration Maintenance', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'GMAO', action: 'Creates MNT-2026-1186 for ESC-3 · priority high', result: 'Created and assigned to Line Maintenance', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'GMAO', action: 'Creates MNT-2026-1187 for TUN-1 · priority medium', result: 'Created and assigned to Refrigeration Maintenance', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'GMAO', action: 'Creates MNT-2026-1188 for EV-SIL3 · priority medium', result: 'Created and assigned to Refrigeration Maintenance', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'GMAO', action: 'Updates OT-26-07415 (DP-2 mesh) with today’s reading', result: 'Evidence added · high priority proposed · no duplicate ticket', ms: 220 },
          { agent: AGENT, system: 'GMAO', action: 'Updates OT-26-08812 (ENV-5) with today’s reading', result: 'Reading added · no duplicate ticket', ms: 220 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Posts the summary in the «Maintenance · Fustiñana» channel', result: 'Sent: 4 critical, 3 warnings and 5 tickets', ms: 410, tone: 'ok' }
        ],
        stats: [
          { label: 'Equipment reviewed', value: 11 },
          { label: 'Tickets created', value: 5, tone: 'ok' },
          { label: 'Work orders updated, not duplicated', value: 2 },
          { label: 'CCPs with overdue verification', value: 1, tone: 'crit' }
        ],
        relation: {
          title: 'Possible link to complaint UKC-44718',
          body: 'Optical sorter OPT-2 (L2) is rejecting 4.8% of product (reference 1.5%) and the mesh on destoner DP-2 is still awaiting its spare part: OT-26-07415, open since 18/08/2026 (42 days). Complaint UKC-44718 (8 mm stone) concerns lot L26-231-FUS-GUI-01, processed on L2 on 19/08/2026, the day after the wear was noted.',
          more: 'IT-MAN-DP-02 requires reinforced inspection of the mesh until it is replaced. To be confirmed by Quality.',
          plain: 'OPT-2 (L2) is rejecting 4.8% (reference 1.5%) and the DP-2 mesh is still awaiting its spare part (OT-26-07415, open since 18/08/2026, 42 days). Complaint UKC-44718 (8 mm stone) concerns lot L26-231-FUS-GUI-01, processed on L2 on 19/08/2026. IT-MAN-DP-02 requires reinforced inspection until the mesh is replaced. To be confirmed by Quality.',
          go: 'reclamacion',
          goLabel: 'Open the complaint'
        },
        policy: 'Policy applied: maintenance tickets are created without prior approval; holding or blocking product (for example, product packed since the last correct DM-1 verification) requires Quality approval (PNT-CAL-015).',
        channel: 'Maintenance · Fustiñana',
        resultSummary: '5 tickets created in the GMAO, 2 existing work orders updated and summary posted in Microsoft Teams.',
        auditRequest: 'Fustiñana · 06:00 readings · 11 items of equipment',
        auditNew: 'Maintenance ticket created',
        auditUpdate: 'Maintenance work order updated',
        reportTitle: 'Daily equipment report · Fustiñana',
        reportCode: 'PD-FUS-20260929',
        reportMeta: [['Plant', 'Fustiñana (FUS)'], ['Shift', 'Morning'], ['Equipment reviewed', '11'], ['Critical · warnings', '4 · 3']],
        reportSummary: 'Of the 11 items of equipment reviewed, 4 are critical and 3 are in warning. Metal detector DM-1 is a CCP with overdue verification. 5 maintenance tickets have been created and 2 existing work orders updated, without duplicating them.',
        signatures: [{ role: 'Shift Quality Manager', note: 'Reviewed' }, { role: 'Line Maintenance', note: 'Received' }]
      },
      presenter: {
        say: [
          'This is how the Shift Quality Manager at Fustiñana starts the shift: everything that needs a decision, in a single inbox.',
          'The data comes from their systems: temperatures from Galileo/SCADA, lots from SAP, pallets from Easy WMS and readings from Mapex. Here it is synthetic, but consistent throughout.',
          'The Fustiñana layout sums up the plant at a glance: grey is normal, colour is what needs attention. C-07 is red; click it to see its pallets, the silos holding pallets from the same lots and the docks of the affected shipments.',
          'Three items: the C-07 alarm at 05:50 (38 pallets; the first shipment leaves at 09:30), complaint UKC-44718 from the United Kingdom and the report with 4 critical items, one of them a CCP.'
        ],
        sayBefore: ['Generate daily report: it reviews 11 items of equipment, does not duplicate open work orders and creates the tickets. Watch the time it takes.'],
        sayAfter: [
          'The link Agentic Platform finds: OPT-2 is rejecting three times the usual rate, the DP-2 mesh has been pending for 42 days and the stone in the complaint comes from an L2 lot. Nobody had to cross-check three systems.',
          'And it does not duplicate: two work orders that were already open are updated instead of opening new tickets.'
        ],
        next: 'Click «Generate daily report» and comment on the log while it runs.',
        nextAfter: 'Go to «From words to workflow» (right arrow) to build the response to the C-07 alarm from the written procedure.'
      }
    };
  })()
});
