/* Norel Nutrición Animal · recall drill RET-2026-1028 (choline chloride 60% MP-2610-CC-118 with Salmonella), English.
 * Backwards: supplier Agroquímica Delta and goods receipt of 21/10/2026. Forwards: 4 premix batches (96 t), of which 31 t are still at
 * the Premix Plant (Spain) and 65 t were shipped on 148 delivery notes to 9 customers in Spain, Portugal and Morocco. Same customers and references
 * as the other scenes. Synthetic demonstration data (MFM). */
(function () {
  'use strict';

  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const S = {
    n0,
    lang: 'English',
    cliOne: 'customer', cliMany: 'customers', albOne: 'delivery note', albMany: 'delivery notes', lotsWord: 'batches', samplesWord: 'samples',
    list: (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`),
    kinds: { fab: 'Feed mill', int: 'Integrator group' },
    country: { es: 'Spain', pt: 'Portugal', ma: 'Morocco' },
    lotNames: ['Vitamin premix for pigs', 'Vitamin premix for pigs (lactation)', 'Vitamin and mineral premix for poultry', 'Vitamin and mineral premix for cattle'],
    chip: { sold: 'With customer', alm: 'Held in warehouse', mue: 'On the dock' },
    madeOn: 'Manufacturing date',
    actions: {
      sold: 'Notify the customer and collect the product at no cost',
      soldMa: 'Notify the customer, collect the product and export documents',
      alm: 'Block the batch in SAP QM and keep it in the warehouse',
      mue: 'Hold the load and block the batch in SAP QM'
    },
    andMore: (n) => ` and ${n} more`,
    subject: (n) => `[DRILL] Recall RET-2026-1028 · choline chloride 60% MP-2610-CC-118 · Salmonella · ${n} premix ${n === 1 ? 'batch' : 'batches'}`,
    greeting: (c) => `Dear ${c.label} team,`,
    intro: 'Norel Nutrición Animal has detected Salmonella in a laboratory test of a raw material (choline chloride 60%) that was used in premixes we supplied to you:',
    lCamp: (r, mp) => `Recall: ${r} · raw material ${mp}`,
    lLots: (l, n) => `Premix batch${n === 1 ? '' : 'es'}: ${l}`,
    lAlbs: (a, n) => `Delivery note${n === 1 ? '' : 's'}: ${a}`,
    lQty: (t) => `Quantity received: ${t}`,
    reason: 'Reason: positive Salmonella result in the raw material, pending confirmation in the retention samples of the premixes. Precautionary measure: do not use or sell the product, keep it identified and separated and do not add it to feed. If you have already added it, tell us the affected feed batches and where they went.',
    ask: 'Please reply to this notice with the stock you still hold, the quantities already added to feed and where they went. We will arrange the collection of the product and its replacement at no cost to you.',
    exportNote: 'As this is an export delivery, our logistics and export manager will coordinate with you the documents needed and the notice to the competent authority of your country (procedure PR-EXP-002).',
    clmNote: 'Your complaint CLM-2026-1028 about the vitamin E content of batch PRM-2610-0388 continues with Customer Service and is independent of this notice.',
    planned: (P) => `Your shipment ${P.ship} (order ${P.order}), planned for today at 16:00, is on hold: it includes product from the affected batches and we will offer you premix from other batches.`,
    drill: 'Reason for sending: recall drill (procedure PR-CAL-007). In a real recall, the final instructions agreed by Quality and Regulatory Affairs are given here.',
    sign: 'Kind regards,\nOperations and Quality · Norel Nutrición Animal\nOrder office · Madrid',
    from: 'Operations and Quality, Norel Nutrición Animal',
    to: (c) => `${c.label}`,
    autSubject: '[DRILL] Notification to the competent authority · RET-2026-1028 · Salmonella in choline chloride 60% · Regulation (EC) 178/2002, art. 19',
    autGreeting: 'To the competent authority for feed safety,',
    autIntro: 'Norel, S.A. (Norel Nutrición Animal) reports, under article 19 of Regulation (EC) 178/2002, that it has detected Salmonella in a raw material used to make premixes already placed on the market:',
    lAutQty: (a, b, c) => `Quantity: ${a} t of premix manufactured; ${b} t shipped and ${c} t in the warehouse under the operator control`,
    lDist: (c, p) => `Distribution: ${c} customers (feed mills and integrator groups) in ${p} countries`,
    autReason: 'Origin: choline chloride 60%, batch MP-2610-CC-118, supplier Agroquímica Delta, received on 21/10/2026. Positive Salmonella result (test LAB-2610-0933) reported by the laboratory on 28/10/2026 at 05:50. Retention samples of the four premix batches have been taken for testing.',
    autAsk: 'Measures taken: batch blocking, hold on pending shipments, notice to customers and collection of the product. Further information will follow as soon as the retention sample results are available, and the authorities of the destination countries will be informed through the appropriate channels.',
    autTo: 'Competent authority · feed safety',
    custBody: (n, t, ped) => `${n} ${n === 1 ? 'delivery note' : 'delivery notes'} with ${t} of premix (order ${ped}).`,
    maNote: 'Export to Morocco: the notice to the authority of the destination country is coordinated with Logistics and export (PR-EXP-002).',
    pcmNote: 'It has complaint CLM-2026-1028 open (vitamin E, batch PRM-2610-0388), independent of this recall.',
    gilNote: 'Poultry integrator group with questionnaire CUE-2026-052 in progress: the notice is coordinated with Norel Solutions.',
    plannedNote: (P) => `Shipment ${P.ship} (order ${P.order}), 3 t, today at 16:00: hold.`,
    channelCust: 'Email (Outlook) + call from Norel Solutions',
    noticeLang: 'Notice in English',
    custAction: (planned) => `Notice and collection of the product at no cost${planned ? ' and hold on the shipment due today' : ''}`,
    internal: 'Internal',
    autLabel: 'Competent authority · art. 19 of Regulation (EC) 178/2002',
    channelAut: 'Electronic notification + email from the Regulatory Affairs Manager',
    autMeta: ['Regulation (EC) 178/2002', 'Illustrative deadline: 4 h', 'Notice in English'],
    autBody: 'Initial notification with the origin (MP-2610-CC-118), the 4 premix batches, the 96 t and the distribution in 3 countries. It is extended when the retention sample results arrive.',
    autRefs: 'Art. 19 · Reg. (EC) 178/2002',
    autAction: 'Initial notification to the authority',
    logLabel: 'Logistics and export · shipments',
    channelLog: 'Microsoft Teams #shipments + order in SAP S/4HANA',
    logMeta: ['Dock of the Premix Plant (Spain)', '1 shipment today · 16:00'],
    logBody: 'Hold the loads on the dock (7 t), cancel the shipment due today EXP-26-10-0093 and locate the transports on the road in the last 5 days carrying product from the 4 batches.',
    logAction: 'Hold shipments and locate deliveries',
    labLabel: 'Laboratory (LIMS) · retention samples',
    channelLab: 'LIMS + notice in Microsoft Teams #laboratory',
    labMeta: ['Laboratory Manager', 'Result in 24-48 h'],
    labBody: 'Test the retention samples of the 4 premix batches for Salmonella (LAB-2610-0934 to 0937) and repeat the test of raw material batch MP-2610-CC-118 (LAB-2610-0933).',
    labAction: 'Prioritise the 5 Salmonella tests',
    solLabel: 'Norel Solutions · technical advice to customers',
    channelSol: 'Call from the technical adviser + follow-up email',
    solMeta: ['9 customers', 'Daily follow-up'],
    solBody: 'Support each customer in locating the product and replacing it with premix from other batches; collect the stock and what has been added to feed.',
    solAction: 'Follow-up call to each customer',
    nd: {
      prvK: 'Supplier', prvSub: 'Choline chloride 60%', prvMeta: 'Received on 21/10/2026',
      mpK: 'Raw material', mpSub: 'Choline chloride 60%', mpMeta: 'LAB-2610-0933 · 28/10 05:50', mpAlert: 'Salmonella positive',
      lotK: 'Premix', lotMeta: (t, d) => `${t} · made on ${d}`,
      almK: 'Warehouse', almSub: 'Finished product', almMeta: 'Premix Plant (Spain)', almAlert: 'Block in SAP QM',
      mueK: 'Dock', mueSub: (P) => `Pending load · ${P.ship} today 16:00`, mueMeta: 'Premix Plant (Spain)', mueAlert: 'Hold shipments',
      expK: 'Shipped', expSub: (a, c) => `${a} delivery notes · ${c} customers`, expMeta: 'From 23/10 to 27/10/2026',
      destK: 'Destination country', destSub: (c, a) => `${c} ${c === 1 ? 'customer' : 'customers'} · ${a} delivery notes`,
      autK: 'Authority', autT: 'Competent authority', autSub: 'Art. 19 notification'
    },
    pct100: '100.0%',
    loc: {
      alm: 'Finished product warehouse', almSub: 'Premix Plant (Spain) · SAP S/4HANA', almAct: 'Block the batches in SAP QM',
      mue: 'Shipping dock', mueSub: 'Premix Plant (Spain) · pending load', mueSub2: (P, c) => `${P.ship} · ${c} · today at 16:00`, mueAct: 'Hold the load and cancel the shipment due today',
      cust: (k) => `With customers · ${k}`, custAct: 'Notice and collection of the product at no cost', custActMa: 'Notice, collection and export documents'
    },
    fl: {
      seg1: 'Product', col1: 'Kilos',
      title1: (c) => `Recall ${c} → customers and warehouse`,
      in1: 'Premixes made with MP-2610-CC-118', in1Sub: (n) => `${n} premix batches · from 22/10 to 26/10/2026`,
      outsTitle: 'Current destination',
      oAlm: 'Finished product warehouse', oAlmSub: 'Premix Plant (Spain) · not shipped',
      oMue: 'Shipping dock', oMueSub: (P) => `Pending load · ${P.ship} today at 16:00`,
      seg2: 'Delivery notes', col2: 'Delivery notes',
      title2: (c) => `Recall ${c} → delivery notes by customer`,
      in2: 'Shipping delivery notes', in2Sub: (n) => `${n} delivery notes · from 23/10 to 27/10/2026`,
      outsTitle2: 'Delivery notes by customer',
      m1Sub: (c) => `${c.ped} · ${c.range}`
    },
    st: { mp: 'Raw material', fab: 'Manufacturing', est: 'Current status', dest: 'Destination', cli: 'Customers' },
    headline: (c, t) => `Recall ${c} · choline chloride 60% MP-2610-CC-118 · Salmonella · ${t} t of premix`,
    previewSide: (t, n) => `${t} t · ${n} notices`,
    genSub: (t, n) => `1 raw material · 4 batches · ${t} t · ${n} recipients`,
    step: [
      ['Locates the starting point', (mp) => `Batch ${mp} · choline chloride 60% from Agroquímica Delta · Salmonella positive (LAB-2610-0933) at 05:50 on 28/10/2026`],
      ['Backwards: supplier and goods receipt', (mp) => `Goods receipt of 21/10/2026 from Agroquímica Delta · supplier certificate filed · ${mp} not yet blocked in SAP QM`],
      ['Forwards: consumption in manufacturing', (n, t) => `${n} premix batches made with the raw material: PRM-2610-0417, 0418, 0421 and 0425 · ${t} t made from 22/10 to 26/10`],
      ['Forwards: destination of the premixes', (a, b, c, d) => `${a} t made = ${b} t at the plant (warehouse and dock) + ${c} t shipped on ${d} delivery notes`],
      ['Retention samples in the laboratory', (n) => `${n} retention samples of the premix batches under Salmonella testing (LAB-2610-0934 to 0937) · result in 24-48 h`],
      ['Planned shipments and dock loads', (P, t) => `Shipment ${P.ship} today at 16:00 (3 t for Piensos Cuenca Mediterráneo) to be held · 7 t on the dock out of ${t} t at the plant`],
      ['Delivery notes, orders and customers', (a, c, p) => `${a} delivery notes to ${c} customers in ${p} countries · orders from 23/10 to 27/10/2026 · 2 export customers (Morocco)`],
      ['Customer contacts and open queries', (n) => `${n} recipients verified (9 customers and the competent authority) · open complaint CLM-2026-1028 from Piensos Cuenca Mediterráneo, independent`],
      ['Status of each batch from SAP S/4HANA', (a, b, c) => `${a} t made: ${b} t at the plant and ${c} t shipped to customers`],
      ['Recall reconciliation: made vs destination', (t) => `Reconciled 100.0% · 0 kg unaccounted for · ${t} of ${t} t located`],
      ['Opens the recall record with one notice per recipient', (r, n) => `Recall ${r} as a draft · blocking of ${n} premix batches and the raw material in SAP QM proposed`],
      ['Prepares the notices without sending', (n) => `${n} notices pending approval (email) · notification to the competent authority (art. 19) as a draft`]
    ],
    mk: ['Starting point located', 'Backwards trace complete', 'Laboratory status queried', 'Shipments and customers identified', 'Contacts identified', 'Recall reconciliation closed', 'Record and notices prepared'],
    loc2: {
      label: 'Product located',
      sub: (o, s, a) => `${o} t on ${a} delivery notes · ${s} t at the plant`,
      short: (t, o, c, p, a, alm, mue) => `${t} of ${t} t located (${o} t shipped on ${a} delivery notes to ${c} customers in ${p} countries, ${alm} in the warehouse and ${mue} on the dock)`
    },
    kpiNotifyLabel: 'Recipients to notify',
    kpiNotifySub: () => '1 shipment today to hold · 16:00',
    bal: {
      title: 'Mass balance', kpiLabel: 'Mass balance reconciled',
      sub: 'Premixes made with the raw material up to their destination and delivery notes by customer · SAP S/4HANA, plant MES and LIMS',
      head: 'Recall RET-2026-1028', headSide: (n) => `${n} customers · 4 batches`,
      labels: { in: 'Made', losses: 'Justified losses', out: 'Shipped to customers', stock: 'At the plant' },
      detailTitle: 'Detail by flow',
      criterio: 'Criterion: the unaccounted difference is shown as it is, not spread out. Each batch is counted by its number in the plant MES; each shipment, by its delivery note in SAP S/4HANA; each test, by its code in the LIMS.',
      reportText: 'Batches and consumption declared in the plant MES; delivery notes and stock in SAP S/4HANA; Salmonella tests in the LIMS; customer queries in Salesforce CRM.'
    },
    prod: { title: 'Shipments with product from the affected batches', side: (n, a) => `${n} customers · ${a} delivery notes`, c1: 'Order', c2: 'Customer', c3: 'Dates', c4: 'Delivery notes', c5: 'Quantity', c6: 'Located' },
    un: {
      title: 'Delivery notes and stock', sub: (a, p) => `${a} delivery notes and ${p} plant positions · SAP S/4HANA and plant MES`,
      csv: 'Recall delivery notes and stock (CSV)', alb: 'Delivery note', lot: 'Premix batch', product: 'Product', where: 'Customer or location', detail: 'Detail', date: 'Date', order: 'Order or reference', qty: 'Quantity (kg)', state: 'Status', action: 'Action in a real recall',
      byLoc: 'By destination', refLabel: 'Recall', nLabel: 'Documents', qtyLabel: 'Quantity (kg)', listLabel: 'Delivery notes and stock'
    },
    cu: {
      title: 'Recipients to notify', sub: (n, t) => `${n} recipients with ${t} t shipped · 1 shipment today to hold`,
      holdsTitle: 'Actions at the plant',
      h1: (P) => `Hold shipment ${P.ship} (today at 16:00)`, h1Meta: (P, c) => ['3 t of premix', P.order, c],
      h1Body: (P) => `In a real recall, Logistics does not load the dock shipment reserved under ${P.order} and the customer is offered premix from other batches.`,
      h2: (t) => `Block in SAP QM the ${t} t still at the plant`, h2Meta: ['today', '4 premix batches', 'SAP S/4HANA'],
      h2Body: 'They are still available to ship: in a real recall the 4 premix batches and raw material MP-2610-CC-118 are blocked until the result is known. Listed by batch in the "Delivery notes and stock" tab and in the CSV.',
      h3: 'Prioritise the laboratory', h3Meta: (n) => [`${n} retention samples`, '24-48 h', 'LIMS'],
      h3Body: 'In a real recall the Salmonella tests of the retention samples are prioritised and the raw material test is repeated, to extend or close the notification to the authority.'
    },
    ap: {
      title: 'Recall and drill notices',
      s1: 'Recipients with product from the affected batches', s1v: (n, t) => `${n} recipients · ${t} t shipped`,
      s2: 'Shipment today to hold', s2v: (P) => `${P.ship} · today at 16:00 · 3 t`,
      s3: 'Block that would apply', s3v: (t) => `${t} t in warehouse and dock`, s3c: 'No block in drill',
      s4: 'Laboratory', s4v: (n) => `Prioritise the ${n} retention samples (tests in the LIMS)`,
      effects: (n) => [
        `Outlook: ${n} notices saved as drafts marked DRILL; nothing is sent`,
        'SAP S/4HANA: recall record and batch blocking in SAP QM as drafts, not applied',
        'Plant MES: no changes; in a drill no batch is blocked and no shipment is held',
        'Record {code} approved with the times of each activity'
      ]
    },
    rp: {
      objeto: 'Recall drill starting from {label}. It checks traceability backwards (supplier, receipt and testing) and forwards (premix batches, warehouse, delivery notes and customers), with the mass balance of the premixes made.',
      noAction: 'The exercise does not block batches, hold shipments or send notices.',
      results: (n, t) => [
        `${n} recipients (9 customers in Spain, Portugal and Morocco and the competent authority) and 1 shipment today that would be held.`,
        'The retention tests of the 4 batches (LAB-2610-0934 to 0937) decide whether the notification to the authority is extended or closed.',
        `${t} t in the plant warehouse and dock would be blocked.`
      ],
      bc1: 'Stage', bc2: 'Reference', bc3: 'Date', bc4: 'Detail',
      backRows: (lots, t) => [
        { etapa: 'Supplier', ref: 'Agroquímica Delta', fecha: '21/10/2026', det: 'Receipt of choline chloride 60% · batch MP-2610-CC-118 · supplier certificate filed' },
        { etapa: 'Testing', ref: 'LAB-2610-0933', fecha: '28/10/2026 05:50', det: 'Salmonella positive in a sample of batch MP-2610-CC-118 · LIMS' }
      ].concat(lots.map((l) => ({ etapa: 'Manufacturing', ref: l.code, fecha: l.date, det: `${l.t} of ${l.name.toLowerCase()} with the raw material` })), [
        { etapa: 'Retention', ref: 'LAB-2610-0934/0937', fecha: '28/10/2026', det: '4 retention samples under Salmonella testing · result in 24-48 h' },
        { etapa: 'Recall', ref: 'RET-2026-1028', fecha: '28/10/2026', det: `${t} t located · illustrative target: inform authorities and customers within 4 h` }
      ]),
      fwdExtra: (P, c, n, alm, mue) => [
        { ped: P.order, cliente: `${c} (shipment today, 3 t on the dock)`, date: '28/10/2026', n: 1, qty: '3 t' },
        { ped: 'DOCK', cliente: 'Shipping dock (pending load)', date: '—', n, qty: mue },
        { ped: 'WAREHOUSE', cliente: 'Finished product warehouse (not shipped)', date: '—', n, qty: alm }
      ],
      conclusion: 'Conclusion: the information needed for a recall is obtained in full and the 96 t reconcile batch by batch and delivery note by delivery note. Proposed improvements: link each raw material batch to the premix batches in the plant MES when they are made, and launch the notice to the authority from the recall record itself.',
      note: 'Drill: no batch has been blocked, no shipment has been held and no notice has been sent. Synthetic demonstration data.'
    },
    audit: { back: (mp, n) => `raw material ${mp} · supplier Agroquímica Delta · ${n} premix batches`, fwd: (t, a, c, p) => `${t} t · ${a} delivery notes · ${c} customers in ${p} countries` },
    say: (P, t, n) => [
      `What is actionable: ${P.ship} (today at 16:00) would be held and the ${t} t still at the plant would be blocked in SAP QM.`,
      `The notices go to ${n} recipients with their orders, batches and delivery notes; the competent authority receives the initial article 19 notification. In a drill nothing is sent. The Operations and Quality Manager decides.`
    ],
    title: 'Recall drill', nav: 'Recalls and drills', section: 'Quality',
    desc: 'Traceability exercise for product recalls: backwards and forwards genealogy, from the raw material to the premix batch, the delivery note and the customer, mass balance and recipients to notify, starting from a raw material or premix batch.',
    place: 'Premix Plant (Spain) · Madrid (order office)',
    approver: 'Operations and Quality Manager',
    agents: { trace: 'Traceability', bal: 'Mass balance', rec: 'Recall and notices' },
    targetText: 'Illustrative target: 4 h', todayEstimate: '3-6 h', timerRef: 'Demo target: 4 h', packLabel: 'Download the recall pack',
    setup: { title: 'Starting point', sub: 'A raw material batch or a premix batch' },
    m: {
      rawLabel: 'Raw material', rawNoun: 'the raw material batch', rawField: 'Raw material batch', rawEntry: (c) => `Batch ${c}`, rawOption: 'Choline chloride 60% · Salmonella positive (LAB-2610-0933) · 4 premix batches',
      premixLabel: 'Premix', premixNoun: 'the premix batch', premixField: 'Premix batch', premixEntry: (c) => `Batch ${c}`,
      premixOption: (n) => `${n} · made with MP-2610-CC-118`,
      premixHeadline: (c, mp) => `Batch ${c} · made with ${mp} → the full recall is traced`,
      premixResult: (c, n, mp) => `Batch ${c} · ${n.toLowerCase()} · made with raw material ${mp} (Salmonella positive) → the full recall RET-2026-1028 is traced`
    },
    reference: {
      title: 'Audit reference',
      sub: 'Objective of the exercise; Quality and Regulatory Affairs confirm the requirements of the authority and of the customers',
      items: [
        ['Regulation (EC) 178/2002, art. 19', 'Duty of the operator to withdraw non-compliant feed and to inform the competent authority and the customers. Illustrative target of the exercise: inform authorities and customers within 4 hours.'],
        ['Regulation (EC) 183/2005', 'Feed hygiene: traceability, Salmonella control in raw materials and the operator recall plan.'],
        ['PR-CAL-007', 'Internal procedure for batch recall and traceability: Operations and Quality decides the scope and approves the notices.']
      ],
      note: 'A drill does not block batches, hold shipments or send notices: it measures whether the information is obtained in full, reconciles and arrives on time.'
    },
    legend: { planned: 'Shipment today: hold', click: 'Each card summarises a phase of the recall' },
    noticeCfg: { title: 'Recall drill' },
    approvalCfg: { policy: 'PR-CAL-007 · blocking batches or holding shipments requires the approval of the Operations and Quality Manager', approveLabel: 'Approve and close drill', rejectPlaceholder: 'For example: the contact of an export customer still has to be confirmed' },
    clock: { title: 'Stopwatch against target', sub: 'Simulation times; they are not performance measurements of the systems' },
    reportCfg: { subtitle: 'Record of the traceability and recall exercise · Regulation (EC) 178/2002, art. 19 · PR-CAL-007' },
    compare: {
      rows: [
        { k: 'People involved', today: '4-5: Quality, Production, Logistics, Customer Care and Regulatory Affairs', agentic: '1: {approver} reviews and approves' },
        { k: 'Systems queried', today: '5-6 opened by hand: SAP, LIMS, MES, Salesforce, spreadsheets and email', agentic: '4 connectors queried by the agents: SAP S/4HANA, LIMS, plant MES and Salesforce CRM, plus Outlook for the notices' },
        { k: 'Steps', today: '20-30 queries, cross-checks of batches with delivery notes and stock, and manual calculations', agentic: '{steps} automatic steps and 1 approval' },
        { k: 'Mass balance', today: 'Spreadsheet with made, shipped and stock', agentic: 'Calculated by batch and delivery note: {reconciled} reconciled' }
      ]
    },
    presenter: (mp, v) => ({
      idle: [
        'Recall drill with traceability and mass balance; in the pilot Quality confirms the protocol and we measure the real time.',
        `The starting point is chosen: raw material batch ${mp} (choline chloride 60% with Salmonella) or an affected premix batch.`,
        'Agentic Platform goes through LIMS, SAP and the MES backwards to the supplier and the receipt, and forwards to the premix batches, the delivery notes and each customer, and reconciles the 96 t batch by batch.'
      ],
      nextIdle: `Press "Start drill" with batch ${mp} (or choose premix batch ${v}).`,
      nextRun: 'Press "View notice" for Piensos Cuenca Mediterráneo and then "Approve and close drill".',
      nextDone: '"Download the recall pack": CSV of delivery notes and printable record. Then, "Customer questionnaire" (right arrow).'
    })
  };


  const RET = 'RET-2026-1028';
  const MP = 'MP-2610-CC-118';
  const PLANNED = { cust: 'pcm', order: 'PV-26-10-0583', ship: 'EXP-26-10-0093', kg: 3000 };

  /* Lotes de premezcla con la materia prima: [id, código, fecha de fabricación, kg, kg en almacén, kg en el muelle] */
  const LOTS = [
    ['P17', 'PRM-2610-0417', '2026-10-22', 28000, 6000, 2000],
    ['P18', 'PRM-2610-0418', '2026-10-22', 24000, 5000, 2000],
    ['P21', 'PRM-2610-0421', '2026-10-23', 22000, 6000, 1000],
    ['P25', 'PRM-2610-0425', '2026-10-26', 22000, 7000, 2000]
  ].map(([id, code, date, kg, alm, mue], i) => ({ id, code, date, kg, alm, mue, shipped: kg - alm - mue, name: S.lotNames[i] }));

  /* Clientes: [id, cliente, tipo, localidad, país, toneladas por lote de premezcla (0417, 0418, 0421, 0425), albaranes, pedido] */
  const CUSTOMERS = [
    ['pcm', 'Piensos Cuenca Mediterráneo, S.A.', 'fab', 'Cuenca', 'es', [3, 2, 2, 1], 12, 'PV-26-10-0538'],
    ['gil', 'Grupo Integrador Levante', 'int', 'Valencia', 'es', [4, 3, 2, 2], 24, 'PV-26-10-0541'],
    ['peb', 'Piensos del Ebro, S.L.', 'fab', 'Zaragoza', 'es', [3, 3, 2, 1], 18, 'PV-26-10-0547'],
    ['ngm', 'Nutrición Ganadera Manchega, S.A.', 'fab', 'Ciudad Real', 'es', [2, 2, 2, 1], 14, 'PV-26-10-0552'],
    ['ptq', 'Piensos Tarraco, S.C.L.', 'fab', 'Tarragona', 'es', [2, 1, 1, 2], 12, 'PV-26-10-0556'],
    ['rdt', 'Rações do Tejo, Lda.', 'fab', 'Santarém', 'pt', [2, 2, 2, 2], 20, 'PV-26-10-0561'],
    ['acb', 'Alimentos Compostos Beira, S.A.', 'fab', 'Viseu', 'pt', [1, 1, 2, 1], 16, 'PV-26-10-0563'],
    ['pat', 'Provendes Atlas, S.A.R.L.', 'fab', 'Casablanca', 'ma', [2, 2, 1, 1], 18, 'PV-26-10-0570'],
    ['prf', 'Provendes du Rif, S.A.R.L.', 'fab', 'Tánger', 'ma', [1, 1, 1, 2], 14, 'PV-26-10-0574']
  ].map(([id, label, kind, city, country, cells, albs, ped]) => ({ id, label, kind, city, country, cells, albs, ped, kg: cells.reduce((s, t) => s + t, 0) * 1000 }));
  const CUST = {};
  CUSTOMERS.forEach((c) => { CUST[c.id] = c; });
  const COUNTRIES = ['es', 'pt', 'ma'];

  const N_ALB = CUSTOMERS.reduce((s, c) => s + c.albs, 0);
  const KG_IN = LOTS.reduce((s, l) => s + l.kg, 0);
  const KG_OUT = CUSTOMERS.reduce((s, c) => s + c.kg, 0);
  const KG_ALM = LOTS.reduce((s, l) => s + l.alm, 0);
  const KG_MUE = LOTS.reduce((s, l) => s + l.mue, 0);
  const KG_STK = KG_ALM + KG_MUE;
  const T_IN = KG_IN / 1000;
  const T_OUT = KG_OUT / 1000;
  const T_STK = KG_STK / 1000;
  const N_NOTIFY = CUSTOMERS.length + 1;
  const N_LOTS = LOTS.length;
  const N_COUNTRIES = COUNTRIES.length;
  const N_ROWS = N_ALB + 2 * N_LOTS;

  const fmtD = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '');
  const dm = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}` : '');
  const plural = (n, a, b) => `${n0(n)} ${n === 1 ? a : b}`;
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const pad = (n, w) => String(n).padStart(w, '0');
  const tons = (kg) => `${n0(kg / 1000)} t`;
  const kindOf = (c) => S.kinds[c.kind];
  const countryOf = (c) => S.country[c.country];
  const alb = (n) => plural(n, S.albOne, S.albMany);

  /* ---------------------------------------------------------------- Albaranes */

  const RAW = [];
  CUSTOMERS.forEach((c, ci) => {
    const total = sum(c.cells, (t) => t);
    const exact = c.cells.map((t) => (c.albs * t) / total);
    const cnt = exact.map((x) => Math.max(1, Math.floor(x)));
    let rest = c.albs - sum(cnt, (x) => x);
    const order = exact.map((x, i) => [x - Math.floor(x), i]).sort((a, b) => b[0] - a[0]);
    for (let k = 0; rest > 0; k = (k + 1) % order.length) { cnt[order[k][1]] += 1; rest -= 1; }
    c.cells.forEach((t, li) => {
      const n = cnt[li];
      const kg = t * 1000;
      const base = Math.floor(kg / n / 10) * 10;
      const day0 = Number(LOTS[li].date.slice(8, 10));
      const span = 27 - day0;
      for (let j = 0; j < n; j += 1) {
        const day = day0 + 1 + ((j + ci) % span);
        RAW.push({ cust: c.id, ci, li, kg: j === 0 ? kg - base * (n - 1) : base, date: `2026-10-${pad(day, 2)}` });
      }
    });
  });
  RAW.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : a.ci - b.ci || a.li - b.li));
  RAW.forEach((r, i) => { r.id = `ALB-26-10-${pad(1200 + i, 4)}`; });
  CUSTOMERS.forEach((c) => {
    const mine = RAW.filter((r) => r.cust === c.id);
    c.alb = mine;
    c.first = mine[0].date;
    c.last = mine[mine.length - 1].date;
    c.range = c.first === c.last ? fmtD(c.first) : `${dm(c.first)} - ${fmtD(c.last)}`;
  });

  const CHIPS = { sold: { status: 'shipped', label: S.chip.sold }, alm: { status: 'hold', label: S.chip.alm }, mue: { status: 'pending', label: S.chip.mue } };
  const unitRows = RAW.map((r) => {
    const c = CUST[r.cust];
    const l = LOTS[r.li];
    return { alb: r.id, lot: l.code, lotSub: l.name, where: c.label, whereSub: `${c.city} · ${countryOf(c)}`, fecha: fmtD(r.date), fechaSub: c.ped, qty: r.kg, estado: CHIPS.sold, accion: c.country === 'ma' ? S.actions.soldMa : S.actions.sold };
  });
  LOTS.forEach((l) => {
    unitRows.push({ alb: `STK-ALM-${l.code.slice(-4)}`, lot: l.code, lotSub: l.name, where: S.loc.alm, whereSub: S.loc.almSub, fecha: fmtD(l.date), fechaSub: S.madeOn, qty: l.alm, estado: CHIPS.alm, accion: S.actions.alm });
  });
  LOTS.forEach((l) => {
    unitRows.push({ alb: `STK-MUE-${l.code.slice(-4)}`, lot: l.code, lotSub: l.name, where: S.loc.mue, whereSub: S.loc.mueSub, fecha: fmtD(l.date), fechaSub: S.madeOn, qty: l.mue, estado: CHIPS.mue, accion: S.actions.mue });
  });

  /* ---------------------------------------------------------------- Avisos */

  function noticeOf(c) {
    const planned = c.id === PLANNED.cust;
    const lots = LOTS.filter((l, i) => c.cells[i] > 0).map((l) => l.code);
    const ids = c.alb.map((r) => r.id);
    const shown = ids.slice(0, 3).join(', ') + (ids.length > 3 ? S.andMore(ids.length - 3) : '');
    const subj = S.subject(lots.length);
    const parts = [
      S.greeting(c),
      S.intro,
      [S.lCamp(RET, MP), S.lLots(lots.join(', '), lots.length), S.lAlbs(shown, ids.length), S.lQty(tons(c.kg))].join('\n'),
      S.reason,
      S.ask
    ];
    if (c.country === 'ma') parts.push(S.exportNote);
    if (c.id === 'pcm') parts.push(S.clmNote);
    if (planned) parts.push(S.planned(PLANNED));
    parts.push(S.drill);
    parts.push(S.sign);
    return { lang: S.lang, headers: { From: S.from, To: S.to(c), Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [RET, lots[0]].concat(planned ? [PLANNED.ship] : []) };
  }
  function noticeAut() {
    const subj = S.autSubject;
    const parts = [S.autGreeting, S.autIntro, [S.lCamp(RET, MP), S.lLots(LOTS.map((l) => l.code).join(', '), N_LOTS), S.lAutQty(T_IN, T_OUT, T_STK), S.lDist(CUSTOMERS.length, N_COUNTRIES)].join('\n'), S.autReason, S.autAsk, S.drill, S.sign];
    return { lang: S.lang, headers: { From: S.from, To: S.autTo, Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [RET, LOTS[0].code] };
  }

  const items = CUSTOMERS.map((c) => {
    const body = [S.custBody(c.albs, tons(c.kg), c.ped)];
    if (c.country === 'ma') body.push(S.maNote);
    if (c.id === 'pcm') body.push(S.pcmNote);
    if (c.id === 'gil') body.push(S.gilNote);
    if (c.id === PLANNED.cust) body.push(S.plannedNote(PLANNED));
    return { id: c.id, label: c.label, icon: 'building', notify: true, channel: S.channelCust, meta: [`${c.city} · ${countryOf(c)}`, kindOf(c), S.noticeLang], body: body.join(' '), notice: noticeOf(c), refs: c.ped + (c.id === PLANNED.cust ? ` · ${PLANNED.order}` : ''), qtyText: tons(c.kg), action: S.custAction(c.id === PLANNED.cust) };
  });
  items.push({ id: 'aut', label: S.autLabel, icon: 'shield-check', notify: true, channel: S.channelAut, meta: S.autMeta, body: S.autBody, notice: noticeAut(), refs: S.autRefs, qtyText: tons(KG_IN), action: S.autAction });
  items.push({ id: 'logistica', label: S.logLabel, icon: 'truck', notify: false, chip: S.internal, channel: S.channelLog, meta: S.logMeta, body: S.logBody, refs: `${N_LOTS} ${S.lotsWord}`, qtyText: tons(KG_MUE), action: S.logAction });
  items.push({ id: 'laboratorio', label: S.labLabel, icon: 'flask', notify: false, chip: S.internal, channel: S.channelLab, meta: S.labMeta, body: S.labBody, refs: 'LIMS', qtyText: `${N_LOTS} ${S.samplesWord}`, action: S.labAction });
  items.push({ id: 'solutions', label: S.solLabel, icon: 'users', notify: false, chip: S.internal, channel: S.channelSol, meta: S.solMeta, body: S.solBody, refs: RET, qtyText: plural(CUSTOMERS.length, S.cliOne, S.cliMany), action: S.solAction });

  /* ---------------------------------------------------------------- Genealogía */

  const nodes = [
    { id: 'PRV', stage: 'mp', kicker: S.nd.prvK, title: 'Agroquímica Delta', sub: S.nd.prvSub, meta: S.nd.prvMeta, reveal: 1 },
    { id: 'MP', stage: 'mp', kicker: S.nd.mpK, title: MP, mono: true, sub: S.nd.mpSub, meta: S.nd.mpMeta, alert: S.nd.mpAlert, alertTone: true, reveal: 1 }
  ];
  LOTS.forEach((l) => nodes.push({ id: l.id, stage: 'fab', kicker: S.nd.lotK, title: l.code, mono: true, sub: l.name, meta: S.nd.lotMeta(tons(l.kg), dm(l.date)), tone: 'stock', reveal: 2 }));
  nodes.push(
    { id: 'ALM', stage: 'est', kicker: S.nd.almK, title: tons(KG_ALM), sub: S.nd.almSub, meta: S.nd.almMeta, alert: S.nd.almAlert, alertTone: true, tone: 'stock', reveal: 3 },
    { id: 'MUE', stage: 'est', kicker: S.nd.mueK, title: tons(KG_MUE), sub: S.nd.mueSub(PLANNED), meta: S.nd.mueMeta, alert: S.nd.mueAlert, alertTone: true, tone: 'planned', reveal: 3 },
    { id: 'EXP', stage: 'est', kicker: S.nd.expK, title: tons(KG_OUT), sub: S.nd.expSub(N_ALB, CUSTOMERS.length), meta: S.nd.expMeta, tone: 'shipped', reveal: 3 }
  );
  COUNTRIES.forEach((k) => {
    const cs = CUSTOMERS.filter((c) => c.country === k);
    nodes.push({ id: `D:${k}`, stage: 'dest', kicker: S.nd.destK, title: S.country[k], sub: S.nd.destSub(cs.length, sum(cs, (c) => c.albs)), meta: tons(sum(cs, (c) => c.kg)), tone: 'customer', reveal: 4 });
  });
  CUSTOMERS.forEach((c) => nodes.push({ id: `C:${c.id}`, stage: 'cli', kicker: kindOf(c), title: c.label.replace(/, (S\.[LA]\.|S\.C\.L\.|Lda\.|S\.A\.R\.L\.)$/, ''), sub: `${c.city} · ${tons(c.kg)}`, tone: 'customer', reveal: 5 }));
  nodes.push({ id: 'C:aut', stage: 'cli', kicker: S.nd.autK, title: S.nd.autT, sub: S.nd.autSub, tone: 'planned', reveal: 5 });
  const edges = [['PRV', 'MP']];
  LOTS.forEach((l) => { edges.push(['MP', l.id], [l.id, 'ALM'], [l.id, 'MUE'], [l.id, 'EXP']); });
  COUNTRIES.forEach((k) => { edges.push(['EXP', `D:${k}`]); });
  CUSTOMERS.forEach((c) => edges.push([`D:${c.country}`, `C:${c.id}`]));
  edges.push(['MUE', `C:${PLANNED.cust}`], ['EXP', 'C:aut']);

  /* ---------------------------------------------------------------- Tablas */

  const saleRows = CUSTOMERS.map((c) => ({ ped: c.ped, cliente: c.label, sub: `${kindOf(c)} · ${c.city} · ${countryOf(c)}`, date: c.range, n: c.albs, qty: tons(c.kg), located: S.pct100 }));
  const locRows = [
    { ref: RET, where: S.loc.mue, whereSub: S.loc.mueSub2(PLANNED, CUST[PLANNED.cust].label), n: N_LOTS, qty: KG_MUE, action: S.loc.mueAct, tone: 'crit' },
    { ref: RET, where: S.loc.alm, whereSub: S.loc.almSub, n: N_LOTS, qty: KG_ALM, action: S.loc.almAct, tone: 'crit' }
  ].concat(COUNTRIES.map((k) => {
    const cs = CUSTOMERS.filter((c) => c.country === k);
    return { ref: RET, where: S.loc.cust(S.country[k]), whereSub: `${plural(cs.length, S.cliOne, S.cliMany)} · ${S.list(cs.map((c) => c.city))}`, n: sum(cs, (c) => c.albs), qty: sum(cs, (c) => c.kg), action: k === 'ma' ? S.loc.custActMa : S.loc.custAct, tone: 'warn' };
  }));

  const outsSold = CUSTOMERS.map((c) => ({ label: c.label, sub: `${c.ped} · ${c.range} · ${c.city}`, stage: 'SAP', qty: c.kg }));
  const flowKg = {
    key: 'kg', seg: S.fl.seg1, main: true, unit: 'kg', colLabel: S.fl.col1,
    title: S.fl.title1(RET),
    inLabel: S.fl.in1, inSub: S.fl.in1Sub(N_LOTS), inStage: 'MES', inQty: KG_IN,
    phases: [],
    outsTitle: S.fl.outsTitle,
    outs: outsSold.concat([
      { label: S.fl.oAlm, sub: S.fl.oAlmSub, stage: 'SAP', qty: KG_ALM, kind: 'stock' },
      { label: S.fl.oMue, sub: S.fl.oMueSub(PLANNED), stage: 'MES', qty: KG_MUE, kind: 'stock' }
    ])
  };
  const flowAlb = {
    key: 'alb', seg: S.fl.seg2, unit: S.albMany, colLabel: S.fl.col2,
    title: S.fl.title2(RET),
    inLabel: S.fl.in2, inSub: S.fl.in2Sub(N_ALB), inStage: 'SAP', inQty: N_ALB,
    phases: [],
    outsTitle: S.fl.outsTitle2,
    outs: CUSTOMERS.map((c) => ({ label: c.label, sub: S.fl.m1Sub(c), stage: 'SAP', qty: c.albs }))
  };

  const SYSTEMS = ['SAP S/4HANA', 'LIMS', 'MES de planta', 'Salesforce CRM'];

  const scope = {
    headline: S.headline(RET, T_IN),
    previewSide: S.previewSide(T_IN, N_NOTIFY),
    startNode: 'MP',
    stages: [
      { id: 'mp', label: S.st.mp, icon: 'flask' },
      { id: 'fab', label: S.st.fab, icon: 'factory' },
      { id: 'est', label: S.st.est, icon: 'warehouse' },
      { id: 'dest', label: S.st.dest, icon: 'globe' },
      { id: 'cli', label: S.st.cli, icon: 'building', count: N_NOTIFY }
    ],
    nodes,
    edges,
    systems: SYSTEMS,
    genSub: S.genSub(T_IN, N_NOTIFY),
    steps: [
      { agent: 'trace', system: 'LIMS', action: S.step[0][0], result: S.step[0][1](MP), ms: 190, reveal: 0, mark: S.mk[0] },
      { agent: 'trace', system: 'SAP S/4HANA', action: S.step[1][0], result: S.step[1][1](MP), ms: 430, reveal: 1 },
      { agent: 'trace', system: 'MES de planta', action: S.step[2][0], result: S.step[2][1](N_LOTS, T_IN), ms: 520, reveal: 2, mark: S.mk[1] },
      { agent: 'trace', system: 'SAP S/4HANA', action: S.step[3][0], result: S.step[3][1](T_IN, T_STK, T_OUT, N_ALB), ms: 560, reveal: 3 },
      { agent: 'trace', system: 'LIMS', action: S.step[4][0], result: S.step[4][1](N_LOTS), ms: 470, reveal: 4, mark: S.mk[2] },
      { agent: 'trace', system: 'MES de planta', action: S.step[5][0], result: S.step[5][1](PLANNED, T_STK), ms: 380, tone: 'warn', reveal: 4 },
      { agent: 'trace', system: 'SAP S/4HANA', action: S.step[6][0], result: S.step[6][1](N_ALB, CUSTOMERS.length, N_COUNTRIES), ms: 590, reveal: 5, mark: S.mk[3] },
      { agent: 'trace', system: 'Salesforce CRM', action: S.step[7][0], result: S.step[7][1](N_NOTIFY), ms: 480, tone: 'warn', reveal: 5, mark: S.mk[4] },
      { agent: 'bal', system: 'SAP S/4HANA', action: S.step[8][0], result: S.step[8][1](T_IN, T_STK, T_OUT), ms: 420 },
      { agent: 'bal', system: 'Agentic Platform', action: S.step[9][0], result: S.step[9][1](T_IN), ms: 95, tone: 'ok', mark: S.mk[5] },
      { agent: 'rec', system: 'SAP S/4HANA', action: S.step[10][0], result: S.step[10][1](RET, N_LOTS), ms: 360 },
      { agent: 'rec', system: 'Outlook', action: S.step[11][0], result: S.step[11][1](N_NOTIFY), ms: 720, mark: S.mk[6] }
    ],
    located: { label: S.loc2.label, value: `${n0(T_IN)} / ${n0(T_IN)} t`, sub: S.loc2.sub(T_OUT, T_STK, N_ALB), icon: 'truck', short: S.loc2.short(T_IN, T_OUT, CUSTOMERS.length, N_COUNTRIES, N_ALB, tons(KG_ALM), tons(KG_MUE)) },
    kpiNotify: { label: S.kpiNotifyLabel, value: N_NOTIFY, sub: S.kpiNotifySub(PLANNED) },
    balance: {
      title: S.bal.title,
      kpiLabel: S.bal.kpiLabel,
      sub: S.bal.sub,
      head: S.bal.head,
      headSide: S.bal.headSide(CUSTOMERS.length),
      labels: S.bal.labels,
      detailTitle: S.bal.detailTitle,
      criterio: S.bal.criterio,
      reportText: S.bal.reportText,
      flows: [flowKg, flowAlb],
      product: {
        title: S.prod.title,
        side: S.prod.side(CUSTOMERS.length, N_ALB),
        cols: [
          { label: S.prod.c1, key: 'ped', mono: true },
          { label: S.prod.c2, key: 'cliente', sub: 'sub' },
          { label: S.prod.c3, key: 'date' },
          { label: S.prod.c4, key: 'n', num: true },
          { label: S.prod.c5, key: 'qty' },
          { label: S.prod.c6, key: 'located', num: true, ok: true }
        ],
        rows: saleRows
      }
    },
    units: {
      title: S.un.title,
      sub: S.un.sub(N_ALB, 2 * N_LOTS),
      icon: 'truck',
      csvLabel: S.un.csv,
      csvName: 'albaranes',
      csvCols: [
        { label: S.un.alb, key: 'alb' }, { label: S.un.lot, key: 'lot' }, { label: S.un.product, key: 'lotSub' }, { label: S.un.where, key: 'where' }, { label: S.un.detail, key: 'whereSub' },
        { label: S.un.date, key: 'fecha' }, { label: S.un.order, key: 'fechaSub' }, { label: S.un.qty, key: 'qty' }, { label: S.un.state, key: 'estado' }, { label: S.un.action, key: 'accion' }
      ],
      byLoc: { label: S.un.byLoc, refLabel: S.un.refLabel, whereLabel: S.un.where, nLabel: S.un.nLabel, qtyLabel: S.un.qtyLabel, actionLabel: S.un.action, rows: locRows },
      list: {
        label: S.un.listLabel,
        cols: [
          { label: S.un.alb, key: 'alb', mono: true },
          { label: S.un.lot, key: 'lot', mono: true, sub: 'lotSub' },
          { label: S.un.where, key: 'where', sub: 'whereSub' },
          { label: S.un.date, key: 'fecha', sub: 'fechaSub' },
          { label: S.un.qty, key: 'qty', num: true, fmt: 'num' },
          { label: S.un.state, key: 'estado', chip: true },
          { label: S.un.action, key: 'accion' }
        ],
        rows: unitRows
      }
    },
    customers: {
      title: S.cu.title,
      sub: S.cu.sub(N_NOTIFY, T_OUT),
      items,
      holdsTitle: S.cu.holdsTitle,
      holds: [
        { icon: 'truck', tone: 'crit', title: S.cu.h1(PLANNED), meta: S.cu.h1Meta(PLANNED, CUST[PLANNED.cust].label), body: S.cu.h1Body(PLANNED) },
        { icon: 'lock', tone: 'warn', title: S.cu.h2(T_STK), meta: S.cu.h2Meta, body: S.cu.h2Body },
        { icon: 'flask', tone: 'warn', title: S.cu.h3, meta: S.cu.h3Meta(N_LOTS), body: S.cu.h3Body }
      ]
    },
    approval: {
      titlePrefix: S.ap.title,
      scope: [
        { label: S.ap.s1, value: S.ap.s1v(N_NOTIFY, T_OUT), status: 'pending', chip: String(N_NOTIFY) },
        { label: S.ap.s2, value: S.ap.s2v(PLANNED) },
        { label: S.ap.s3, value: S.ap.s3v(T_STK), status: 'evaluate', chip: S.ap.s3c },
        { label: S.ap.s4, value: S.ap.s4v(N_LOTS) }
      ],
      effects: S.ap.effects(N_NOTIFY)
    },
    report: {
      objeto: S.rp.objeto,
      noAction: S.rp.noAction,
      results: S.rp.results(N_NOTIFY, T_STK),
      back: {
        cols: [{ label: S.rp.bc1, key: 'etapa' }, { label: S.rp.bc2, key: 'ref', mono: true }, { label: S.rp.bc3, key: 'fecha' }, { label: S.rp.bc4, key: 'det' }],
        rows: S.rp.backRows(LOTS.map((l) => ({ code: l.code, date: fmtD(l.date), t: tons(l.kg), name: l.name })), T_IN)
      },
      fwd: {
        cols: [{ label: S.prod.c1, key: 'ped', mono: true }, { label: S.prod.c2, key: 'cliente' }, { label: S.prod.c3, key: 'date' }, { label: S.prod.c4, key: 'n' }, { label: S.prod.c5, key: 'qty' }],
        rows: saleRows.concat(S.rp.fwdExtra(PLANNED, CUST[PLANNED.cust].label, N_LOTS, tons(KG_ALM), tons(KG_MUE)))
      },
      conclusion: S.rp.conclusion,
      note: S.rp.note
    },
    audit: { back: S.audit.back(MP, N_LOTS), fwd: S.audit.fwd(T_IN, N_ALB, CUSTOMERS.length, N_COUNTRIES) },
    say: S.say(PLANNED, T_STK, N_NOTIFY)
  };

  const sample = LOTS[0].code;

  const retirada = {
    title: S.title,
    nav: S.nav,
    section: S.section,
    desc: S.desc,
    place: S.place,
    approver: S.approver,
    regPrefix: 'SR-2026-',
    agents: S.agents,
    targetText: S.targetText,
    todayEstimate: S.todayEstimate,
    timerRef: S.timerRef,
    packLabel: S.packLabel,
    setup: S.setup,
    modes: {
      lote: { label: S.m.rawLabel, noun: S.m.rawNoun, field: S.m.rawField, icon: 'layers', format: MP, where: 'SAP S/4HANA · LIMS' },
      premezcla: { label: S.m.premixLabel, noun: S.m.premixNoun, field: S.m.premixField, icon: 'barcode', format: sample, where: 'MES de planta · SAP S/4HANA' }
    },
    entries: [
      { mode: 'lote', code: MP, scope: 'sal', label: S.m.rawEntry(MP), option: S.m.rawOption },
      { mode: 'premezcla', code: sample, scope: 'sal', label: S.m.premixEntry(sample), option: S.m.premixOption(LOTS[0].name), headline: S.m.premixHeadline(sample, MP), startNode: 'P17', startResult: S.m.premixResult(sample, LOTS[0].name, MP) }
    ],
    examples: [{ mode: 'lote', code: MP, label: S.m.rawEntry(MP) }, { mode: 'premezcla', code: sample, label: S.m.premixEntry(sample) }],
    reference: S.reference,
    legend: S.legend,
    notice: S.noticeCfg,
    approval: S.approvalCfg,
    clock: S.clock,
    report: S.reportCfg,
    compare: S.compare,
    presenter: S.presenter(MP, sample),
    scopes: { sal: scope }
  };

  agenticPackEn('norel', { retirada });
})();
