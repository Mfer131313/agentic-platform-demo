/* Subtropicales Axarquía · recall drill RET-2026-1120 (Keitt mango MG-2611-KE-031 with a pesticide residue above the maximum residue limit, MRL), English.
 * Backwards: grower Agrícola La Vega 417 and goods receipt of 09/11/2026. Forwards: 3 packing lots (18 t), of which 6 t are still at
 * the Axarquía Packing Centre and 12 t were shipped on 35 delivery notes to 11 customers in Spain, France and Germany and on 640 online shop orders.
 * Same customers and references as the other scenes. Synthetic demonstration data (MFM). */
(function () {
  'use strict';

  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const S = {
    n0,
    lang: 'English',
    cliOne: 'customer', cliMany: 'customers', albOne: 'shipment', albMany: 'shipments', lotsWord: 'lots', samplesWord: 'samples',
    list: (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`),
    kinds: { sup: 'Supermarket chain', may: 'Wholesaler', shop: 'Online shop' },
    country: { es: 'Spain', fr: 'France', de: 'Germany' },
    cityNames: { Marsella: 'Marseille', Hamburgo: 'Hamburg', 'Fráncfort': 'Frankfurt', 'Múnich': 'Munich' },
    shopLabel: 'Online shop · end consumers',
    shopRef: '640 web orders',
    lotNames: ['Keitt mango size 8, 4 kg box', 'Keitt mango size 10, 4 kg box', 'Ready-to-eat Keitt mango, 2 kg tray'],
    chip: { sold: 'With customer', alm: 'Held in warehouse', mue: 'On the dock' },
    madeOn: 'Packing date',
    actions: {
      sold: 'Notify the customer and collect the product at no cost',
      soldEx: 'Notify the customer, collect the product and export documents',
      soldShop: 'Notify the consumer and refund the order',
      alm: 'Block the lot in SAP QM and keep it in the warehouse',
      mue: 'Hold the load and block the lot in SAP QM'
    },
    andMore: (n) => ` and ${n} more`,
    subject: (n) => `[DRILL] Recall RET-2026-1120 · Keitt mango MG-2611-KE-031 · pesticide residue above the MRL · ${n} packing ${n === 1 ? 'lot' : 'lots'}`,
    greeting: (c) => `Dear ${c.label} team,`,
    intro: 'Subtropicales Axarquía has detected, in a laboratory test, a pesticide residue above the maximum residue limit (MRL) in a receipt lot of Keitt mango that we packed and shipped to your company:',
    lCamp: (r, mp) => `Recall: ${r} · receipt lot ${mp}`,
    lLots: (l, n) => `Packing lot${n === 1 ? '' : 's'}: ${l}`,
    lAlbs: (a, n) => `Delivery note${n === 1 ? '' : 's'}: ${a}`,
    lQty: (t) => `Quantity received: ${t}`,
    reason: 'Reason: residue test result above the MRL of Regulation (EC) 396/2005 in the receipt lot, pending confirmation in the retention samples of the packing lots. Precautionary measure: do not sell or market the product, keep it identified and separated and do not make it available to consumers. If you have already sold it, tell us the affected stores and dates.',
    ask: 'Please reply to this notice with the stock you still hold, the quantities already sold and where they went. We will arrange the collection of the product and its replacement or credit at no cost to you.',
    exportNote: 'As this is an export delivery, our Shipping and Export Manager will coordinate with you the documents needed and the notice to the competent authority of your country (procedure PR-EXP-004).',
    clmNote: 'Your complaint CLM-2026-1120 about the ripening of the avocado of lot AH-2611-092 continues with Customer Care and is independent of this notice.',
    planned: (P) => `Your shipment ${P.ship} (order ${P.order}), planned for today at 16:00, is on hold: it includes mango from the affected lots and we will offer you fruit from other lots.`,
    drill: 'Reason for sending: recall drill (procedure PR-TRZ-003). In a real recall, the final instructions agreed by Quality and the authority are given here.',
    sign: 'Kind regards,\nOperations and Quality · Subtropicales Axarquía\nAxarquía Packing Centre (Málaga)',
    from: 'Operations and Quality, Subtropicales Axarquía',
    to: (c) => `${c.label}`,
    shopSubject: '[DRILL] Important notice about your mango order · Recall RET-2026-1120',
    shopGreeting: 'Dear customer,',
    shopIntro: 'Subtropicales Axarquía has detected, in a laboratory test, a pesticide residue above the maximum residue limit (MRL) in a lot of Keitt mango that we sent you from our online shop:',
    shopOrders: (n) => `Your order: included among the ${n} affected online shop orders`,
    shopReason: 'Reason: residue test result above the MRL in the receipt lot of the mango, pending confirmation in the retention samples. Precautionary measure: do not eat the mango in your order and keep it in its packaging.',
    shopAsk: 'You do not need to do anything else: we will refund your whole order and, if you wish, send you fruit from other lots at no cost. If you have any questions, reply to this email and Customer Care will help you.',
    autSubject: '[DRILL] Notification to the competent authority · RET-2026-1120 · pesticide residue above the MRL in Keitt mango · Regulation (EC) 178/2002, art. 19',
    autGreeting: 'To the competent authority for food safety,',
    autIntro: 'Subtropicales Axarquía, S.A. reports, under article 19 of Regulation (EC) 178/2002, that it has detected a pesticide residue above the maximum residue limit (MRL) of Regulation (EC) 396/2005 in a lot of mango already placed on the market:',
    lAutQty: (a, b, c) => `Quantity: ${a} t of mango packed; ${b} t shipped and ${c} t at the centre under the operator control`,
    lDist: (c, p, w) => `Distribution: ${c} customers (supermarket chains and wholesalers) in ${p} countries and ${w} online shop orders`,
    autReason: 'Origin: Keitt mango, receipt lot MG-2611-KE-031 (18 t), grower Agrícola La Vega 417, received on 09/11/2026. Residue test result above the MRL (report LAB-2611-0871) reported by the laboratory on 20/11/2026 at 08:10. Retention samples of the three packing lots have been taken for testing.',
    autAsk: 'Measures taken: lot blocking, hold on pending shipments, notice to customers and to online shop consumers and collection of the product. Further information will follow as soon as the retention sample results are available, and the authorities of France and Germany will be informed through the appropriate channels.',
    autTo: 'Competent authority · food safety',
    custBody: (n, t, ped) => `${n} ${n === 1 ? 'delivery note' : 'delivery notes'} with ${t} of mango (order ${ped}).`,
    exNote: (k) => `Export to ${S.country[k]}: the notice to the authority of the destination country is coordinated with Shipping and Export (PR-EXP-004).`,
    levNote: 'It has complaint CLM-2026-1120 open (avocado, lot AH-2611-092), independent of this recall.',
    norNote: 'German chain with supplier questionnaire CUE-2026-063 in progress (it includes the MRLs): the notice is coordinated with Quality and Food Safety.',
    plannedNote: (P) => `Shipment ${P.ship} (order ${P.order}), 1 t, today at 16:00: hold.`,
    channelCust: 'Email (Outlook) + call from Customer Care',
    channelShop: 'Online shop (PrestaShop): email to each customer + notice on the website',
    shopBody: (n, t) => `${n} online shop orders with ${t} of mango (2 and 4 kg boxes). Individual notice to each consumer with the refund of the order.`,
    shopAction: 'Notice to consumers and refund of the orders',
    noticeLang: 'Notice in English',
    custAction: (planned) => `Notice and collection of the product at no cost${planned ? ' and hold on the shipment due today' : ''}`,
    internal: 'Internal',
    autLabel: 'Competent authority · art. 19 of Regulation (EC) 178/2002',
    channelAut: 'Electronic notification + email from the Quality and Food Safety Manager',
    autMeta: ['Regulation (EC) 178/2002', 'Illustrative deadline: 4 h', 'Notice in English'],
    autBody: 'Initial notification with the origin (MG-2611-KE-031), the 3 packing lots, the 18 t and the distribution in 3 countries. It is extended when the retention sample results arrive.',
    autRefs: 'Art. 19 · Reg. (EC) 178/2002',
    autAction: 'Initial notification to the authority',
    logLabel: 'Shipping and export · shipments',
    channelLog: 'Microsoft Teams #shipments + order in SAP S/4HANA',
    logMeta: ['Dock of the Axarquía Packing Centre', '1 shipment today · 16:00'],
    logBody: 'Hold the loads on the dock (1 t), cancel the shipment due today EXP-26-11-0211 and locate the transports on the road in the last 9 days carrying mango from the 3 lots.',
    logAction: 'Hold shipments and locate deliveries',
    labLabel: 'Laboratory (LIMS) · retention samples',
    channelLab: 'LIMS + notice in Microsoft Teams #laboratory',
    labMeta: ['Laboratory Manager', 'Result in 24-48 h'],
    labBody: 'Test the retention samples of the 3 packing lots for pesticide residues (LAB-2611-0872 to 0874) and repeat the test of receipt lot MG-2611-KE-031 (LAB-2611-0871).',
    labAction: 'Prioritise the 4 residue tests',
    solLabel: 'Customer Care and online shop · follow-up',
    channelSol: 'Call from Customer Care + follow-up email + PrestaShop',
    solMeta: ['11 customers and 640 web orders', 'Daily follow-up'],
    solBody: 'Support each customer in locating the product and replacing it with fruit from other lots; handle the refunds of the online shop orders (PR-ECO-002).',
    solAction: 'Follow-up call to each customer and refund in the shop',
    nd: {
      prvK: 'Grower', prvSub: 'Keitt mango · 18 t', prvMeta: 'Received on 09/11/2026',
      mpK: 'Receipt lot', mpSub: 'Keitt mango · 18 t', mpMeta: 'LAB-2611-0871 · 20/11 08:10', mpAlert: 'Residue above the MRL',
      lotK: 'Packing', lotMeta: (t, d) => `${t} · packed on ${d}`,
      almK: 'Warehouse', almSub: 'Finished product', almMeta: 'Axarquía Packing Centre', almAlert: 'Block in SAP QM',
      mueK: 'Dock', mueSub: (P) => `Pending load · ${P.ship} today 16:00`, mueMeta: 'Axarquía Packing Centre', mueAlert: 'Hold shipments',
      expK: 'Shipped', expSub: (a, c) => `${a} shipments · ${c} customers and online shop`, expMeta: 'From 11/11 to 19/11/2026',
      destK: 'Destination country', destSub: (c, a, sh) => `${c} ${c === 1 ? 'customer' : 'customers'}${sh ? ' and the online shop' : ''} · ${a} shipments`,
      autK: 'Authority', autT: 'Competent authority', autSub: 'Art. 19 notification'
    },
    pct100: '100.0%',
    loc: {
      alm: 'Finished product warehouse', almSub: 'Axarquía Packing Centre · SAP S/4HANA', almAct: 'Block the lots in SAP QM',
      mue: 'Shipping dock', mueSub: 'Axarquía Packing Centre · pending load', mueSub2: (P, c) => `${P.ship} · ${c} · today at 16:00`, mueAct: 'Hold the load and cancel the shipment due today',
      cust: (k) => `With customers · ${k}`, andShop: ' and the online shop', custAct: 'Notice and collection of the product at no cost and refund of the web orders', custActEx: 'Notice, collection and export documents'
    },
    fl: {
      seg1: 'Product', col1: 'Kilos',
      title1: (c) => `Recall ${c} → customers and warehouse`,
      in1: 'Mango packed from MG-2611-KE-031', in1Sub: (n) => `${n} packing lots · from 10/11 to 13/11/2026`,
      outsTitle: 'Current destination',
      oAlm: 'Finished product warehouse', oAlmSub: 'Axarquía Packing Centre · not shipped',
      oMue: 'Shipping dock', oMueSub: (P) => `Pending load · ${P.ship} today at 16:00`,
      seg2: 'Shipments', col2: 'Shipments',
      title2: (c) => `Recall ${c} → shipments by customer`,
      in2: 'Delivery notes and online shop orders', in2Sub: (n) => `${n} shipments · from 11/11 to 19/11/2026`,
      outsTitle2: 'Shipments by customer',
      m1Sub: (c) => `${c.ped} · ${c.range}`
    },
    st: { mp: 'Receipt lot', fab: 'Packing', est: 'Current status', dest: 'Destination', cli: 'Customers' },
    headline: (c, t) => `Recall ${c} · Keitt mango MG-2611-KE-031 · pesticide residue above the MRL · ${t} t of mango`,
    previewSide: (t, n) => `${t} t · ${n} notices`,
    genSub: (t, n) => `1 receipt lot · 3 lots · ${t} t · ${n} recipients`,
    step: [
      ['Locates the starting point', (mp) => `Lot ${mp} · Keitt mango from Agrícola La Vega 417 · pesticide residue above the MRL (LAB-2611-0871) at 08:10 on 20/11/2026`],
      ['Backwards: grower and goods receipt', (mp) => `Goods receipt of 09/11/2026 from Agrícola La Vega 417 · field record and grower GLOBALG.A.P. certificate filed · ${mp} not yet blocked in SAP QM`],
      ['Forwards: packing lots', (n, t) => `${n} packing lots with the mango: MN-2611-0418, 0419 and 0423 · ${t} t packed from 10/11 to 13/11`],
      ['Forwards: destination of the mango', (a, b, c, d) => `${a} t packed = ${b} t at the centre (warehouse and dock) + ${c} t shipped on ${d} shipments`],
      ['Retention samples in the laboratory', (n) => `${n} retention samples of the packing lots under residue testing (LAB-2611-0872 to 0874) · result in 24-48 h`],
      ['Planned shipments and dock loads', (P, t) => `Shipment ${P.ship} today at 16:00 (1 t for Hipermercados Ibérica Fresca) to be held · 1 t on the dock out of ${t} t at the centre`],
      ['Delivery notes, orders and customers', (a, c, p, w, b) => `${a} shipments: ${b} delivery notes to ${c} customers in ${p} countries and ${w} online shop orders · from 11/11 to 19/11/2026 · 6 export customers (France and Germany)`],
      ['Customer contacts and shop orders', (n) => `${n} recipients verified (11 customers, the online shop with its 640 orders and the competent authority) · open complaint CLM-2026-1120 from Supermercados Levante Fresh, independent`],
      ['Status of each lot from SAP S/4HANA', (a, b, c) => `${a} t packed: ${b} t at the centre and ${c} t shipped`],
      ['Recall reconciliation: packed vs destination', (t) => `Reconciled 100.0% · 0 kg unaccounted for · ${t} of ${t} t located`],
      ['Opens the recall record with one notice per recipient', (r, n) => `Recall ${r} as a draft · blocking of ${n} packing lots and the receipt lot in SAP QM proposed`],
      ['Prepares the notices without sending', (n) => `${n} notices pending approval (email and online shop) · notification to the competent authority (art. 19) as a draft`]
    ],
    mk: ['Starting point located', 'Backwards trace complete', 'Laboratory status queried', 'Shipments and customers identified', 'Contacts identified', 'Recall reconciliation closed', 'Record and notices prepared'],
    loc2: {
      label: 'Product located',
      sub: (o, s, a) => `${o} t on ${a} shipments · ${s} t at the centre`,
      short: (t, o, c, p, a, alm, mue) => `${t} of ${t} t located (${o} t shipped on ${a} shipments to ${c} customers in ${p} countries and to the online shop, ${alm} in the warehouse and ${mue} on the dock)`
    },
    kpiNotifyLabel: 'Recipients to notify',
    kpiNotifySub: () => '1 shipment today to hold · 16:00',
    bal: {
      title: 'Mass balance', kpiLabel: 'Mass balance reconciled',
      sub: 'Mango packed from the receipt lot up to its destination and shipments by customer · SAP S/4HANA, WMS, field traceability and LIMS',
      head: 'Recall RET-2026-1120', headSide: (n) => `${n} customers and online shop · 3 lots`,
      labels: { in: 'Packed', losses: 'Justified losses', out: 'Shipped to customers', stock: 'At the centre' },
      detailTitle: 'Detail by flow',
      criterio: 'Criterion: the unaccounted difference is shown as it is, not spread out. Each lot is counted by its number in SAP and the WMS; each shipment, by its delivery note or order; each test, by its code in the LIMS.',
      reportText: 'Lots and stock declared in SAP S/4HANA and the WMS; origin in field traceability; residue tests in the LIMS; web orders in the online shop (PrestaShop).'
    },
    prod: { title: 'Shipments with mango from the affected lots', side: (n, a) => `${n} customers and online shop · ${a} shipments`, c1: 'Order', c2: 'Customer', c3: 'Dates', c4: 'Shipments', c5: 'Quantity', c6: 'Located' },
    un: {
      title: 'Shipments and stock', sub: (a, p) => `${a} shipments and ${p} centre positions · SAP S/4HANA and WMS`,
      csv: 'Recall shipments and stock (CSV)', alb: 'Shipment', lot: 'Packing lot', product: 'Product', where: 'Customer or location', detail: 'Detail', date: 'Date', order: 'Order or reference', qty: 'Quantity (kg)', state: 'Status', action: 'Action in a real recall',
      byLoc: 'By destination', refLabel: 'Recall', nLabel: 'Documents', qtyLabel: 'Quantity (kg)', listLabel: 'Shipments and stock'
    },
    cu: {
      title: 'Recipients to notify', sub: (n, t) => `${n} recipients with ${t} t shipped · 1 shipment today to hold`,
      holdsTitle: 'Actions at the centre',
      h1: (P) => `Hold shipment ${P.ship} (today at 16:00)`, h1Meta: (P, c) => ['1 t of mango', P.order, c],
      h1Body: (P) => `In a real recall, Shipping does not load the dock shipment reserved under ${P.order} and the customer is offered fruit from other lots.`,
      h2: (t) => `Block in SAP QM the ${t} t still at the centre`, h2Meta: ['today', '3 packing lots', 'SAP S/4HANA'],
      h2Body: 'They are still available to ship: in a real recall the 3 packing lots and receipt lot MG-2611-KE-031 are blocked until the result is known. Listed by lot in the "Shipments and stock" tab and in the CSV.',
      h3: 'Prioritise the laboratory', h3Meta: (n) => [`${n} retention samples`, '24-48 h', 'LIMS'],
      h3Body: 'In a real recall the residue tests of the retention samples are prioritised and the receipt lot test is repeated, to extend or close the notification to the authority.'
    },
    ap: {
      title: 'Recall and drill notices',
      s1: 'Recipients with mango from the affected lots', s1v: (n, t) => `${n} recipients · ${t} t shipped`,
      s2: 'Shipment today to hold', s2v: (P) => `${P.ship} · today at 16:00 · 1 t`,
      s3: 'Block that would apply', s3v: (t) => `${t} t in warehouse and dock`, s3c: 'No block in drill',
      s4: 'Laboratory', s4v: (n) => `Prioritise the ${n} retention samples (tests in the LIMS)`,
      effects: (n) => [
        `Outlook and online shop: ${n} notices saved as drafts marked DRILL; nothing is sent`,
        'SAP S/4HANA: recall record and lot blocking in SAP QM as drafts, not applied',
        'WMS: no changes; in a drill no lot is blocked and no shipment is held',
        'Record {code} approved with the times of each activity'
      ]
    },
    rp: {
      objeto: 'Recall drill starting from {label}. It checks traceability backwards (grower, receipt and testing) and forwards (packing lots, warehouse, shipments, customers and online shop), with the mass balance of the mango packed.',
      noAction: 'The exercise does not block lots, hold shipments or send notices.',
      results: (n, t) => [
        `${n} recipients (11 customers in Spain, France and Germany, the online shop with 640 orders and the competent authority) and 1 shipment today that would be held.`,
        'The retention tests of the 3 lots (LAB-2611-0872 to 0874) decide whether the notification to the authority is extended or closed.',
        `${t} t in the centre warehouse and dock would be blocked.`
      ],
      bc1: 'Stage', bc2: 'Reference', bc3: 'Date', bc4: 'Detail',
      backRows: (lots, t) => [
        { etapa: 'Grower', ref: 'Agrícola La Vega 417', fecha: '09/11/2026', det: 'Receipt of Keitt mango · lot MG-2611-KE-031 (18 t) · field record and certificate filed' },
        { etapa: 'Testing', ref: 'LAB-2611-0871', fecha: '20/11/2026 08:10', det: 'Pesticide residue above the MRL in a sample of lot MG-2611-KE-031 · LIMS' }
      ].concat(lots.map((l) => ({ etapa: 'Packing', ref: l.code, fecha: l.date, det: `${l.t} of ${l.name} with the mango of the receipt lot` })), [
        { etapa: 'Retention', ref: 'LAB-2611-0872/0874', fecha: '20/11/2026', det: '3 retention samples under residue testing · result in 24-48 h' },
        { etapa: 'Recall', ref: 'RET-2026-1120', fecha: '20/11/2026', det: `${t} t located · illustrative target: inform authorities and customers within 4 h` }
      ]),
      fwdExtra: (P, c, n, alm, mue) => [
        { ped: P.order, cliente: `${c} (shipment today, 1 t on the dock)`, date: '20/11/2026', n: 1, qty: '1 t' },
        { ped: 'DOCK', cliente: 'Shipping dock (pending load)', date: '—', n, qty: mue },
        { ped: 'WAREHOUSE', cliente: 'Finished product warehouse (not shipped)', date: '—', n, qty: alm }
      ],
      conclusion: 'Conclusion: the information needed for a recall is obtained in full and the 18 t reconcile lot by lot and shipment by shipment. Proposed improvements: link each receipt lot to the packing lots in SAP when they are created, and launch the notice to the authority and to the online shop from the recall record itself.',
      note: 'Drill: no lot has been blocked, no shipment has been held and no notice has been sent. Synthetic demonstration data.'
    },
    audit: { back: (mp, n) => `receipt lot ${mp} · grower Agrícola La Vega 417 · ${n} packing lots`, fwd: (t, a, c, p) => `${t} t · ${a} shipments · ${c} customers in ${p} countries and online shop` },
    say: (P, t, n) => [
      `What is actionable: ${P.ship} (today at 16:00) would be held and the ${t} t still at the centre would be blocked in SAP QM.`,
      `The notices go to ${n} recipients with their orders, lots and shipments; the competent authority receives the initial article 19 notification and the 640 online shop orders receive their notice. In a drill nothing is sent. The Operations and Quality Manager decides.`
    ],
    title: 'Recall drill', nav: 'Recalls and drills', section: 'Quality',
    desc: 'Traceability exercise for product recalls: backwards and forwards genealogy, from the receipt lot to the packing lot, the shipment and the customer or online shop order, mass balance and recipients to notify, starting from a receipt lot or a packing lot.',
    place: 'Axarquía Packing Centre (Málaga)',
    approver: 'Operations and Quality Manager',
    agents: { trace: 'Traceability', bal: 'Mass balance', rec: 'Recall and notices' },
    targetText: 'Illustrative target: 4 h', todayEstimate: '3-6 h', timerRef: 'Demo target: 4 h', packLabel: 'Download the recall pack',
    setup: { title: 'Starting point', sub: 'A receipt lot or a packing lot' },
    m: {
      rawLabel: 'Receipt lot', rawNoun: 'the receipt lot', rawField: 'Receipt lot', rawEntry: (c) => `Lot ${c}`, rawOption: 'Keitt mango · residue above the MRL (LAB-2611-0871) · 3 packing lots',
      packLabel: 'Packing', packNoun: 'the packing lot', packField: 'Packing lot', packEntry: (c) => `Lot ${c}`,
      packOption: (n) => `${n} · packed with MG-2611-KE-031`,
      packHeadline: (c, mp) => `Lot ${c} · packed with ${mp} → the full recall is traced`,
      packResult: (c, n, mp) => `Lot ${c} · ${n} · packed with receipt lot ${mp} (residue above the MRL) → the full recall RET-2026-1120 is traced`
    },
    reference: {
      title: 'Audit reference',
      sub: 'Objective of the exercise; Quality confirms the requirements of the authority and of the customers',
      items: [
        ['Regulation (EC) 178/2002, art. 19', 'Duty of the operator to withdraw non-compliant food and to inform the competent authority and the customers. Illustrative target of the exercise: inform authorities and customers within 4 hours.'],
        ['Regulation (EC) 396/2005', 'Maximum residue levels (MRLs) of pesticides in food of plant origin: a lot above the MRL cannot be marketed.'],
        ['PR-TRZ-003', 'Internal procedure for lot traceability and recall: Operations and Quality decides the scope and approves the notices.']
      ],
      note: 'A drill does not block lots, hold shipments or send notices: it measures whether the information is obtained in full, reconciles and arrives on time.'
    },
    legend: { planned: 'Shipment today: hold', click: 'Each card summarises a phase of the recall' },
    noticeCfg: { title: 'Recall drill' },
    approvalCfg: { policy: 'PR-TRZ-003 · blocking lots or holding shipments requires the approval of the Operations and Quality Manager', approveLabel: 'Approve and close drill', rejectPlaceholder: 'For example: the contact of an export customer still has to be confirmed' },
    clock: { title: 'Stopwatch against target', sub: 'Simulation times; they are not performance measurements of the systems' },
    reportCfg: { subtitle: 'Record of the traceability and recall exercise · Regulation (EC) 178/2002, art. 19 · PR-TRZ-003' },
    compare: {
      rows: [
        { k: 'People involved', today: '4-5: Quality, Reception, Shipping, Customer Care and the online shop', agentic: '1: {approver} reviews and approves' },
        { k: 'Systems queried', today: '5-6 opened by hand: SAP, WMS, LIMS, field traceability, the online shop and spreadsheets', agentic: '5 connectors queried by the agents: SAP S/4HANA, field traceability, LIMS, WMS and the online shop (PrestaShop), plus Outlook for the notices' },
        { k: 'Steps', today: '20-30 queries, cross-checks of lots with shipments and stock, and manual calculations', agentic: '{steps} automatic steps and 1 approval' },
        { k: 'Mass balance', today: 'Spreadsheet with packed, shipped and stock', agentic: 'Calculated by lot and shipment: {reconciled} reconciled' }
      ]
    },
    presenter: (mp, v) => ({
      idle: [
        'Recall drill with traceability and mass balance; in the pilot Quality confirms the protocol and we measure the real time.',
        `The starting point is chosen: receipt lot ${mp} (Keitt mango with a pesticide residue above the MRL) or an affected packing lot.`,
        'Agentic Platform goes through the LIMS, SAP, the WMS and field traceability backwards to the grower and the receipt, and forwards to the packing lots, the shipments, each customer and the 640 online shop orders, and reconciles the 18 t lot by lot.'
      ],
      nextIdle: `Press "Start drill" with lot ${mp} (or choose packing lot ${v}).`,
      nextRun: 'Press "View notice" for Supermercados Levante Fresh and then "Approve and close drill".',
      nextDone: '"Download the recall pack": CSV of shipments and printable record. Then, "Customer questionnaire" (right arrow).'
    })
  };

  const RET = 'RET-2026-1120';
  const MP = 'MG-2611-KE-031';
  const PLANNED = { cust: 'ibf', order: 'PED-2026-44911', ship: 'EXP-26-11-0211', kg: 1000 };

  /* Lotes de manipulado con el mango: [id, código, fecha de manipulado, kg, kg en almacén, kg en el muelle] */
  const LOTS = [
    ['M18', 'MN-2611-0418', '2026-11-10', 8000, 2500, 500],
    ['M19', 'MN-2611-0419', '2026-11-11', 6000, 1700, 300],
    ['M23', 'MN-2611-0423', '2026-11-13', 4000, 800, 200]
  ].map(([id, code, date, kg, alm, mue], i) => ({ id, code, date, kg, alm, mue, shipped: kg - alm - mue, name: S.lotNames[i] }));

  /* Clientes: [id, cliente, tipo, localidad, país, toneladas por lote de manipulado (0418, 0419, 0423), expediciones, pedido] */
  const CUSTOMERS = [
    ['lev', 'Supermercados Levante Fresh, S.A.', 'sup', 'Valencia', 'es', [0.8, 0.6, 0.4], 4, 'PED-2026-44902'],
    ['ibf', 'Hipermercados Ibérica Fresca, S.A.', 'sup', 'Madrid', 'es', [0.7, 0.5, 0.3], 4, 'PED-2026-44911'],
    ['mca', 'Mercamálaga Frutas, S.L.', 'may', 'Málaga', 'es', [0.5, 0.4, 0.3], 3, 'PED-2026-44917'],
    ['gal', 'Distribuidora Frutera Galaica, S.Coop.', 'may', 'Vigo', 'es', [0.4, 0.3, 0.2], 3, 'PED-2026-44923'],
    ['tar', 'Frutas Tarraco Mayoristas, S.L.', 'may', 'Tarragona', 'es', [0.3, 0.2, 0.1], 3, 'PED-2026-44928'],
    ['mar', 'Grands Marchés du Sud, S.A.S.', 'sup', 'Lyon', 'fr', [0.4, 0.3, 0.2], 3, 'PED-2026-44931'],
    ['prm', 'Primeurs de Provence, S.A.R.L.', 'may', 'Marsella', 'fr', [0.3, 0.2, 0.2], 3, 'PED-2026-44936'],
    ['fre', 'Fruits Express Rungis, S.A.S.', 'may', 'Rungis', 'fr', [0.3, 0.2, 0.1], 3, 'PED-2026-44940'],
    ['nor', 'Handelsgruppe Nordfrisch GmbH', 'sup', 'Hamburgo', 'de', [0.3, 0.3, 0.2], 3, 'PED-2026-44944'],
    ['obs', 'Obst-Großmarkt Rhein-Main GmbH', 'may', 'Fráncfort', 'de', [0.2, 0.2, 0.2], 3, 'PED-2026-44949'],
    ['sdf', 'Südfrucht Import Bayern GmbH', 'may', 'Múnich', 'de', [0.1, 0.1, 0.2], 3, 'PED-2026-44953'],
    ['tie', S.shopLabel, 'shop', 'Málaga', 'es', [0.7, 0.7, 0.6], 640, S.shopRef]
  ].map(([id, label, kind, city, country, cells, albs, ped]) => ({ id, label, kind, city, country, cells, albs, ped, kg: Math.round(cells.reduce((s, t) => s + t, 0) * 1000) }));
  const CUST = {};
  CUSTOMERS.forEach((c) => { CUST[c.id] = c; });
  const SHOP = CUST.tie;
  const CLIENTS = CUSTOMERS.filter((c) => c.kind !== 'shop');
  const COUNTRIES = ['es', 'fr', 'de'];

  const N_ALB = CUSTOMERS.reduce((s, c) => s + c.albs, 0);
  const N_ALB_B2B = CLIENTS.reduce((s, c) => s + c.albs, 0);
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

  const fmtD = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '');
  const dm = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}` : '');
  const plural = (n, a, b) => `${n0(n)} ${n === 1 ? a : b}`;
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const pad = (n, w) => String(n).padStart(w, '0');
  const tons = (kg) => `${n0(kg / 1000)} t`;
  const kindOf = (c) => S.kinds[c.kind];
  const countryOf = (c) => S.country[c.country];
  const cityOf = (c) => (S.cityNames && S.cityNames[c.city]) || c.city;
  const alb = (n) => plural(n, S.albOne, S.albMany);

  /* ---------------------------------------------------------------- Expediciones */

  const RAW = [];
  CUSTOMERS.forEach((c, ci) => {
    const total = sum(c.cells, (t) => t);
    const exact = c.cells.map((t) => (c.albs * t) / total);
    const cnt = exact.map((x, i) => (c.cells[i] > 0 ? Math.max(1, Math.floor(x)) : 0));
    let rest = c.albs - sum(cnt, (x) => x);
    const order = exact.map((x, i) => [x - Math.floor(x), i]).filter((o) => c.cells[o[1]] > 0).sort((a, b) => b[0] - a[0]);
    for (let k = 0; rest > 0; k = (k + 1) % order.length) { cnt[order[k][1]] += 1; rest -= 1; }
    c.cells.forEach((t, li) => {
      const n = cnt[li];
      if (!n) return;
      const kg = Math.round(t * 1000);
      const per = kg / n;
      const step = per >= 100 ? 10 : 1;
      const base = Math.floor(per / step) * step;
      const rem = kg - base * n;
      const day0 = Number(LOTS[li].date.slice(8, 10));
      const span = 19 - day0;
      for (let j = 0; j < n; j += 1) {
        const day = day0 + 1 + ((j + ci) % span);
        const q = c.kind === 'shop' ? base + (j < rem ? 1 : 0) : (j === 0 ? kg - base * (n - 1) : base);
        RAW.push({ cust: c.id, ci, li, kg: q, date: `2026-11-${pad(day, 2)}` });
      }
    });
  });
  RAW.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : a.ci - b.ci || a.li - b.li));
  RAW.forEach((r, i) => { r.id = `${r.cust === 'tie' ? 'PW-2611' : 'ALB-26-11'}-${pad(1200 + i, 4)}`; });
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
    return { alb: r.id, lot: l.code, lotSub: l.name, where: c.label, whereSub: `${cityOf(c)} · ${countryOf(c)}`, fecha: fmtD(r.date), fechaSub: c.ped, qty: r.kg, estado: CHIPS.sold, accion: c.kind === 'shop' ? S.actions.soldShop : c.country !== 'es' ? S.actions.soldEx : S.actions.sold };
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
    if (c.country !== 'es') parts.push(S.exportNote);
    if (c.id === 'lev') parts.push(S.clmNote);
    if (planned) parts.push(S.planned(PLANNED));
    parts.push(S.drill);
    parts.push(S.sign);
    return { lang: S.lang, headers: { From: S.from, To: S.to(c), Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [RET, lots[0]].concat(planned ? [PLANNED.ship] : []) };
  }
  function noticeShop(c) {
    const subj = S.shopSubject;
    const lots = LOTS.map((l) => l.code);
    const parts = [S.shopGreeting, S.shopIntro, [S.lCamp(RET, MP), S.lLots(lots.join(', '), lots.length), S.shopOrders(c.albs), S.lQty(tons(c.kg))].join('\n'), S.shopReason, S.shopAsk, S.drill, S.sign];
    return { lang: S.lang, headers: { From: S.from, To: S.to(c), Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [RET, lots[0]] };
  }
  function noticeAut() {
    const subj = S.autSubject;
    const parts = [S.autGreeting, S.autIntro, [S.lCamp(RET, MP), S.lLots(LOTS.map((l) => l.code).join(', '), N_LOTS), S.lAutQty(T_IN, T_OUT, T_STK), S.lDist(CLIENTS.length, N_COUNTRIES, SHOP.albs)].join('\n'), S.autReason, S.autAsk, S.drill, S.sign];
    return { lang: S.lang, headers: { From: S.from, To: S.autTo, Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [RET, LOTS[0].code] };
  }

  const items = CUSTOMERS.map((c) => {
    if (c.kind === 'shop') {
      return { id: c.id, label: c.label, icon: 'box', notify: true, channel: S.channelShop, meta: [`${cityOf(c)} · ${countryOf(c)}`, kindOf(c), S.noticeLang], body: S.shopBody(c.albs, tons(c.kg)), notice: noticeShop(c), refs: c.ped, qtyText: tons(c.kg), action: S.shopAction };
    }
    const body = [S.custBody(c.albs, tons(c.kg), c.ped)];
    if (c.country !== 'es') body.push(S.exNote(c.country));
    if (c.id === 'lev') body.push(S.levNote);
    if (c.id === 'nor') body.push(S.norNote);
    if (c.id === PLANNED.cust) body.push(S.plannedNote(PLANNED));
    return { id: c.id, label: c.label, icon: 'building', notify: true, channel: S.channelCust, meta: [`${cityOf(c)} · ${countryOf(c)}`, kindOf(c), S.noticeLang], body: body.join(' '), notice: noticeOf(c), refs: c.ped + (c.id === PLANNED.cust ? ` · ${PLANNED.order}` : ''), qtyText: tons(c.kg), action: S.custAction(c.id === PLANNED.cust) };
  });
  items.push({ id: 'aut', label: S.autLabel, icon: 'shield-check', notify: true, channel: S.channelAut, meta: S.autMeta, body: S.autBody, notice: noticeAut(), refs: S.autRefs, qtyText: tons(KG_IN), action: S.autAction });
  items.push({ id: 'logistica', label: S.logLabel, icon: 'truck', notify: false, chip: S.internal, channel: S.channelLog, meta: S.logMeta, body: S.logBody, refs: `${N_LOTS} ${S.lotsWord}`, qtyText: tons(KG_MUE), action: S.logAction });
  items.push({ id: 'laboratorio', label: S.labLabel, icon: 'flask', notify: false, chip: S.internal, channel: S.channelLab, meta: S.labMeta, body: S.labBody, refs: 'LIMS', qtyText: `${N_LOTS} ${S.samplesWord}`, action: S.labAction });
  items.push({ id: 'solutions', label: S.solLabel, icon: 'users', notify: false, chip: S.internal, channel: S.channelSol, meta: S.solMeta, body: S.solBody, refs: RET, qtyText: plural(CLIENTS.length, S.cliOne, S.cliMany), action: S.solAction });

  /* ---------------------------------------------------------------- Genealogía */

  const nodes = [
    { id: 'PRV', stage: 'mp', kicker: S.nd.prvK, title: 'Agrícola La Vega 417', sub: S.nd.prvSub, meta: S.nd.prvMeta, reveal: 1 },
    { id: 'MP', stage: 'mp', kicker: S.nd.mpK, title: MP, mono: true, sub: S.nd.mpSub, meta: S.nd.mpMeta, alert: S.nd.mpAlert, alertTone: true, reveal: 1 }
  ];
  LOTS.forEach((l) => nodes.push({ id: l.id, stage: 'fab', kicker: S.nd.lotK, title: l.code, mono: true, sub: l.name, meta: S.nd.lotMeta(tons(l.kg), dm(l.date)), tone: 'stock', reveal: 2 }));
  nodes.push(
    { id: 'ALM', stage: 'est', kicker: S.nd.almK, title: tons(KG_ALM), sub: S.nd.almSub, meta: S.nd.almMeta, alert: S.nd.almAlert, alertTone: true, tone: 'stock', reveal: 3 },
    { id: 'MUE', stage: 'est', kicker: S.nd.mueK, title: tons(KG_MUE), sub: S.nd.mueSub(PLANNED), meta: S.nd.mueMeta, alert: S.nd.mueAlert, alertTone: true, tone: 'planned', reveal: 3 },
    { id: 'EXP', stage: 'est', kicker: S.nd.expK, title: tons(KG_OUT), sub: S.nd.expSub(N_ALB, CLIENTS.length), meta: S.nd.expMeta, tone: 'shipped', reveal: 3 }
  );
  COUNTRIES.forEach((k) => {
    const cs = CUSTOMERS.filter((c) => c.country === k);
    nodes.push({ id: `D:${k}`, stage: 'dest', kicker: S.nd.destK, title: S.country[k], sub: S.nd.destSub(cs.filter((c) => c.kind !== 'shop').length, sum(cs, (c) => c.albs), cs.some((c) => c.kind === 'shop')), meta: tons(sum(cs, (c) => c.kg)), tone: 'customer', reveal: 4 });
  });
  CUSTOMERS.forEach((c) => nodes.push({ id: `C:${c.id}`, stage: 'cli', kicker: kindOf(c), title: c.label.replace(/,? (S\.A\.S\.|S\.A\.R\.L\.|S\.Coop\.|S\.A\.|S\.L\.|GmbH)$/, ''), sub: `${cityOf(c)} · ${tons(c.kg)}`, tone: 'customer', reveal: 5 }));
  nodes.push({ id: 'C:aut', stage: 'cli', kicker: S.nd.autK, title: S.nd.autT, sub: S.nd.autSub, tone: 'planned', reveal: 5 });
  const edges = [['PRV', 'MP']];
  LOTS.forEach((l) => { edges.push(['MP', l.id], [l.id, 'ALM'], [l.id, 'MUE'], [l.id, 'EXP']); });
  COUNTRIES.forEach((k) => { edges.push(['EXP', `D:${k}`]); });
  CUSTOMERS.forEach((c) => edges.push([`D:${c.country}`, `C:${c.id}`]));
  edges.push(['MUE', `C:${PLANNED.cust}`], ['EXP', 'C:aut']);

  /* ---------------------------------------------------------------- Tablas */

  const saleRows = CUSTOMERS.map((c) => ({ ped: c.ped, cliente: c.label, sub: `${kindOf(c)} · ${cityOf(c)} · ${countryOf(c)}`, date: c.range, n: c.albs, qty: tons(c.kg), located: S.pct100 }));
  const locRows = [
    { ref: RET, where: S.loc.mue, whereSub: S.loc.mueSub2(PLANNED, CUST[PLANNED.cust].label), n: N_LOTS, qty: KG_MUE, action: S.loc.mueAct, tone: 'crit' },
    { ref: RET, where: S.loc.alm, whereSub: S.loc.almSub, n: N_LOTS, qty: KG_ALM, action: S.loc.almAct, tone: 'crit' }
  ].concat(COUNTRIES.map((k) => {
    const cs = CUSTOMERS.filter((c) => c.country === k);
    const cl = cs.filter((c) => c.kind !== 'shop');
    const hasShop = cs.some((c) => c.kind === 'shop');
    return { ref: RET, where: S.loc.cust(S.country[k]), whereSub: `${plural(cl.length, S.cliOne, S.cliMany)}${hasShop ? S.loc.andShop : ''} · ${S.list(cl.map((c) => cityOf(c)))}`, n: sum(cs, (c) => c.albs), qty: sum(cs, (c) => c.kg), action: k !== 'es' ? S.loc.custActEx : S.loc.custAct, tone: 'warn' };
  }));

  const outsSold = CUSTOMERS.map((c) => ({ label: c.label, sub: `${c.ped} · ${c.range} · ${cityOf(c)}`, stage: 'SAP', qty: c.kg }));
  const flowKg = {
    key: 'kg', seg: S.fl.seg1, main: true, unit: 'kg', colLabel: S.fl.col1,
    title: S.fl.title1(RET),
    inLabel: S.fl.in1, inSub: S.fl.in1Sub(N_LOTS), inStage: 'SAP', inQty: KG_IN,
    phases: [],
    outsTitle: S.fl.outsTitle,
    outs: outsSold.concat([
      { label: S.fl.oAlm, sub: S.fl.oAlmSub, stage: 'WMS', qty: KG_ALM, kind: 'stock' },
      { label: S.fl.oMue, sub: S.fl.oMueSub(PLANNED), stage: 'WMS', qty: KG_MUE, kind: 'stock' }
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

  const SYSTEMS = ['SAP S/4HANA', 'LIMS', 'WMS', 'Trazabilidad de campo', 'Tienda online (PrestaShop)'];

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
      { agent: 'trace', system: 'Trazabilidad de campo', action: S.step[1][0], result: S.step[1][1](MP), ms: 430, reveal: 1 },
      { agent: 'trace', system: 'WMS', action: S.step[2][0], result: S.step[2][1](N_LOTS, T_IN), ms: 520, reveal: 2, mark: S.mk[1] },
      { agent: 'trace', system: 'SAP S/4HANA', action: S.step[3][0], result: S.step[3][1](T_IN, T_STK, T_OUT, N_ALB), ms: 560, reveal: 3 },
      { agent: 'trace', system: 'LIMS', action: S.step[4][0], result: S.step[4][1](N_LOTS), ms: 470, reveal: 4, mark: S.mk[2] },
      { agent: 'trace', system: 'WMS', action: S.step[5][0], result: S.step[5][1](PLANNED, T_STK), ms: 380, tone: 'warn', reveal: 4 },
      { agent: 'trace', system: 'SAP S/4HANA', action: S.step[6][0], result: S.step[6][1](N_ALB, CLIENTS.length, N_COUNTRIES, SHOP.albs, N_ALB_B2B), ms: 590, reveal: 5, mark: S.mk[3] },
      { agent: 'trace', system: 'Tienda online (PrestaShop)', action: S.step[7][0], result: S.step[7][1](N_NOTIFY), ms: 480, tone: 'warn', reveal: 5, mark: S.mk[4] },
      { agent: 'bal', system: 'SAP S/4HANA', action: S.step[8][0], result: S.step[8][1](T_IN, T_STK, T_OUT), ms: 420 },
      { agent: 'bal', system: 'Agentic Platform', action: S.step[9][0], result: S.step[9][1](T_IN), ms: 95, tone: 'ok', mark: S.mk[5] },
      { agent: 'rec', system: 'SAP S/4HANA', action: S.step[10][0], result: S.step[10][1](RET, N_LOTS), ms: 360 },
      { agent: 'rec', system: 'Outlook', action: S.step[11][0], result: S.step[11][1](N_NOTIFY), ms: 720, mark: S.mk[6] }
    ],
    located: { label: S.loc2.label, value: `${n0(T_IN)} / ${n0(T_IN)} t`, sub: S.loc2.sub(T_OUT, T_STK, N_ALB), icon: 'truck', short: S.loc2.short(T_IN, T_OUT, CLIENTS.length, N_COUNTRIES, N_ALB, tons(KG_ALM), tons(KG_MUE)) },
    kpiNotify: { label: S.kpiNotifyLabel, value: N_NOTIFY, sub: S.kpiNotifySub(PLANNED) },
    balance: {
      title: S.bal.title,
      kpiLabel: S.bal.kpiLabel,
      sub: S.bal.sub,
      head: S.bal.head,
      headSide: S.bal.headSide(CLIENTS.length),
      labels: S.bal.labels,
      detailTitle: S.bal.detailTitle,
      criterio: S.bal.criterio,
      reportText: S.bal.reportText,
      flows: [flowKg, flowAlb],
      product: {
        title: S.prod.title,
        side: S.prod.side(CLIENTS.length, N_ALB),
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
      csvName: 'expediciones',
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
    audit: { back: S.audit.back(MP, N_LOTS), fwd: S.audit.fwd(T_IN, N_ALB, CLIENTS.length, N_COUNTRIES) },
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
      manipulado: { label: S.m.packLabel, noun: S.m.packNoun, field: S.m.packField, icon: 'barcode', format: sample, where: 'WMS · SAP S/4HANA' }
    },
    entries: [
      { mode: 'lote', code: MP, scope: 'sal', label: S.m.rawEntry(MP), option: S.m.rawOption },
      { mode: 'manipulado', code: sample, scope: 'sal', label: S.m.packEntry(sample), option: S.m.packOption(LOTS[0].name), headline: S.m.packHeadline(sample, MP), startNode: 'M18', startResult: S.m.packResult(sample, LOTS[0].name, MP) }
    ],
    examples: [{ mode: 'lote', code: MP, label: S.m.rawEntry(MP) }, { mode: 'manipulado', code: sample, label: S.m.packEntry(sample) }],
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

  agenticPackEn('fruta', { retirada });
})();
