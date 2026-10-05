/* Autopista Multimotor · recall drill REC-VW-2026-001 (VW Golf/Passat 2024-2026, potential ABS module failure), English.
 * Backwards: manufacturer bulletin, ABS module and 2024-2026 receipts. Forwards: 98 vehicles (47 rental fleet, 9 subscriptions,
 * 6 showroom, 34 with 8 customers and 2 write-offs) and the VW workshop. Same customers and references as the other scenes. Synthetic demonstration data (MFM). */
(function () {
  'use strict';

  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const S = {
    n0,
    lang: 'English',
    vehOne: 'vehicle', vehMany: 'vehicles', cliOne: 'customer', cliMany: 'customers',
    list: (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`),
    region: 'Community of Madrid',
    kinds: { part: 'Private', emp: 'Company', rent: 'Leasing' },
    fleetWhere: 'Rental fleet · Marqués de Soria hub', fleetSub: 'Odoo Inventory · on the road or at the hub',
    done: 'Done', noCita: 'No appointment',
    subWhere: '6-month subscription', subSub: 'Salesforce CRM · active contract',
    stkWhere: 'Madrid showroom', stkSub: 'Odoo Inventory · available to sell',
    resSub: (P) => `${P.order} · ${P.ship} · delivery today at 17:00`,
    bajaWhere: 'Fleet write-off', bajaSub: 'Total loss · 12/08/2026',
    chip: { ok: 'Repaired', cita: 'Appointment booked', nocita: 'No appointment', sub: 'Subscriber to notify', stk: 'Sale not blocked', res: 'Delivery today', sold: 'With customer', baja: 'Written off' },
    entry: (y) => `Received ${y}`,
    actions: {
      ok: 'None: firmware and pressure sensor updated',
      cita: 'Keep the appointment and reassign its rental bookings',
      nocita: 'Book an appointment in iCare Workshop',
      sub: 'Notify the subscriber and book at the VW workshop',
      stk: 'Block the sale in Odoo and SAP',
      res: 'Hold today\'s delivery and offer another unit',
      sold: 'Notify the customer and book a free repair',
      baja: 'None: permanent write-off'
    },
    andMore: (n) => ` and ${n} more`,
    subject: (n) => `[DRILL] Recall campaign REC-VW-2026-001 · VW Golf/Passat · ABS module · ${n} ${n === 1 ? 'vehicle' : 'vehicles'}`,
    greeting: (c) => (c.kind === 'part' ? `Dear ${c.label}:` : `Dear ${c.label} team:`),
    intro: 'Volkswagen has announced a safety recall campaign that affects vehicles we supplied to you at Autopista Multimotor:',
    lCamp: (c) => `Campaign: ${c} · Volkswagen Golf/Passat 2024-2026`,
    lVins: (v, n) => `Vehicle${n === 1 ? '' : 's'} (VIN): ${v}`,
    lOrder: (p, d) => `Sales order: ${p} of ${d}`,
    reason: 'Reason: possible ABS module failure, with a risk of reduced brake pressure under certain conditions. Fix: firmware update and, where needed, replacement of the pressure sensor (about 90 minutes, at no cost to you).',
    askRent: 'Please tell us when the vehicles are available so we can repair them in batches at our VW workshop at the Marqués de Soria hub. Until then they can stay in use with care; if you notice any abnormal brake behaviour, stop and let us know.',
    ask: 'Please book an appointment at our VW workshop at the Marqués de Soria hub by replying to this notice. Until the repair you can keep driving with care; if you notice any abnormal brake behaviour, stop and let us know.',
    financed: 'The repair does not affect your financing agreement with Banco Sabadell. Your query about the APR (3.99% versus 4.25%) continues with Customer Care and is separate from this notice.',
    planned: (P) => `Your order ${P.order}, due for delivery today at 17:00, is on hold: the showroom unit reserved for you is affected by the campaign and we will offer you another unit from a different batch.`,
    drill: 'Reason for sending: recall drill (procedure PR-OPS-014). In a real recall, the final instructions agreed by Operations and the Workshop go here.',
    sign: 'Kind regards,\nOperations · Autopista Multimotor\nMadrid hub (Marqués de Soria)',
    from: 'Operations, Autopista Multimotor',
    to: (c) => `${c.label}`,
    subTo: '6-month subscribers · Autopista Multimotor',
    subGreeting: 'Dear subscriber:',
    lSub: 'Service: 6-month subscription with a VW Golf/Passat from our subscription fleet',
    askSub: 'We will contact you by SMS to set your appointment at the VW workshop. The repair and a courtesy car during it are included in your subscription at no cost. Until then you can keep driving with care.',
    custBody: (n, ped, d) => `${n} ${n === 1 ? 'vehicle sold' : 'vehicles sold'} with order ${ped} (${d}).`,
    rentNote: 'Leasing company: it warns its drivers.',
    jmlNote: 'Financed with Banco Sabadell; open query about the APR (3.99% versus 4.25%) with Customer Care.',
    plannedNote: (P) => `Order ${P.order}: 1 showroom unit reserved for ${P.ship}, today at 17:00: hold.`,
    channelCust: 'Email + SMS (Twilio) + call from the salesperson',
    noticeLang: 'Notice in English',
    custAction: (planned) => `Notice and free repair appointment${planned ? ' and hold of today\'s delivery' : ''}`,
    subLabel: '6-month subscribers (9 contracts)',
    channelSub: 'SMS (Twilio) + email',
    subMeta: '6-month subscription',
    subBody: '9 subscription-fleet vehicles affected. Appointment at the VW workshop and a courtesy car during the repair, included in the subscription.',
    subAction: 'Notice, appointment and courtesy car',
    internal: 'Internal',
    flotaLabel: 'Rental fleet management · 47 vehicles',
    channelFlota: 'Slack #rental-fleet + order in Odoo Inventory',
    flotaMeta: ['Marqués de Soria hub', '12 repaired · 20 booked · 15 without appointment'],
    flotaBody: 'Reassign the bookings of the 35 pending vehicles to other models while they wait for their appointment, and schedule the 15 without one before 15/11/2026.',
    flotaAction: 'Reassign bookings and schedule appointments',
    tallerLabel: 'VW workshop · iCare Workshop',
    channelTaller: 'iCare Workshop + notice in Slack #workshop',
    tallerMeta: ['Capacity at 70%', 'One VW technician short'],
    tallerBody: 'The 84 pending repairs add up to 126 h with one VW technician fewer: redirect non-urgent orders and add a certified technician from another brand.',
    hours: (n) => `${String(n * 1.5).replace(/\.0$/, '')} h`,
    tallerAction: 'Reinforce the VW shift and reorder the queue',
    vwLabel: 'Volkswagen · brand manager',
    chipVw: 'Inform',
    channelVw: 'Manufacturer portal + brand manager email',
    vwMeta: ['Deadline 15/11/2026', 'Campaign REC-VW-2026-001'],
    vwBody: 'Weekly progress report: vehicles located, repaired and pending. Campaign closure with the sealing of each file.',
    vwAction: 'Weekly progress report',
    nd: {
      bolK: 'Manufacturer bulletin', bolSub: 'Volkswagen · Golf/Passat 2024-2026', bolMeta: 'Issued 30/09/2026 · deadline 15/11/2026', bolAlert: 'Potential ABS failure',
      modK: 'ABS module', modSub: 'Affected batches 2407 to 2605', modMeta: 'Firmware + pressure sensor',
      entK: 'Receipts', entMeta: 'Golf and Passat received',
      floK: 'Rental fleet', floSub: (a, b, c) => `${a} repaired · ${b} booked · ${c} without appointment`, floMeta: 'Fleet of 1,012 units', floAlert: 'Reassign bookings',
      susK: 'Subscriptions', susSub: '6-month contracts', susMeta: 'Salesforce CRM',
      stkK: 'Showroom', stkSub: (P) => `1 reserved for ${P.ship}`, stkMeta: 'Delivery today at 17:00', stkAlert: 'Block the sale',
      venK: 'Sales', venSub: (n) => `${n} customers`, venMeta: '12/12/2024 to 06/05/2026',
      bajK: 'Write-offs', bajSub: 'Total loss', bajMeta: '12/08/2026',
      trK: 'Repaired', trSub: 'Firmware + sensor · iCare Workshop', trMeta: '24/09 to 06/10',
      tcK: 'Booked', tcSub: 'Rental fleet', tcMeta: '08/10 to 30/10',
      tsK: 'To schedule', tsSub: (a, b, c, d) => `${a} fleet · ${b} subscription · ${c} customers · ${d} showroom`, tsMeta: '84 repairs = 126 h', tsAlert: 'One VW technician short',
      subCliK: 'Subscription', subCliT: '6-month subscribers'
    },
    cash: 'Cash / company', pct100: '100.0%',
    loc: {
      res: 'Showroom · reserved', resSub: (P, c) => `${P.order} · ${c} · delivery today at 17:00`, resAct: 'Hold the delivery and offer another unit',
      stk: 'Madrid showroom', stkSub: 'Odoo Inventory · available to sell', stkAct: 'Block the sale in Odoo and SAP',
      nocita: 'Rental fleet · no appointment', nocitaSub: 'iCare Workshop · to schedule', nocitaAct: 'Book an appointment in iCare Workshop',
      cita: 'Rental fleet · booked', citaSub: 'iCare Workshop · 08/10 to 30/10', citaAct: 'Keep the appointment and reassign bookings',
      ok: 'Rental fleet · repaired', okSub: 'Firmware + pressure sensor', okAct: 'None',
      sub: '6-month subscription', subSub: 'Salesforce CRM · active contracts', subAct: 'Notice, appointment and courtesy car',
      cust: (k) => `With customers · ${k}`, custAct: 'Notice and free repair appointment',
      baja: 'Fleet write-off', bajaSub: 'Total loss · 12/08/2026', bajaAct: 'None: permanent write-off'
    },
    fl: {
      seg1: 'Vehicles', unit1: 'vehicles', col1: 'Vehicles',
      title1: (c) => `Campaign ${c} → customers, fleet and showroom`,
      in1: 'Receipts with affected ABS module', in1Sub: 'Golf and Passat 2024-2026 received by Autopista Multimotor', phase1: 'Permanent write-offs before the campaign', loss1: 'Total loss · fleet and registration write-off',
      outsTitle: 'Current destination',
      oSub: '6-month subscribers', oSubSub: 'Active contracts · Salesforce CRM',
      oFleetOk: 'Rental fleet · repaired', oFleetOkSub: 'iCare Workshop · firmware + sensor',
      oFleetCita: 'Rental fleet · booked', oFleetCitaSub: 'iCare Workshop · 08/10 to 30/10',
      oFleetNo: 'Rental fleet · no appointment', oFleetNoSub: 'To schedule in iCare Workshop',
      oRes: (P) => `Reserved for ${P.ship}`, oResSub: (P) => `Showroom · ${P.order} · today at 17:00`,
      oStk: 'Madrid showroom', oStkSub: 'Available to sell (not blocked)',
      seg2: 'Workshop', col2: 'Workshop minutes',
      title2: (c) => `Campaign ${c} → workshop work`,
      in2: 'Campaign work', in2Sub: (n, m) => `${n} vehicles × ${m} min · firmware + pressure sensor`,
      outsTitle2: 'Work status',
      m1: 'Done', m1Sub: (n) => `${n} fleet vehicles repaired`,
      m2: 'Appointment booked', m2Sub: (n) => `${n} fleet vehicles`,
      m3: 'Fleet without appointment', m3Sub: (n) => `${n} vehicles to schedule`,
      m4: 'Customer vehicles', m4Sub: (n) => `${n} vehicles to schedule`,
      m5: 'Subscriptions', m5Sub: (n) => `${n} vehicles to schedule`,
      m6: 'Showroom', m6Sub: (n) => `${n} vehicles before they are sold`
    },
    st: { fab: 'Manufacturer', ent: 'Receipts', est: 'Current status', tal: 'Workshop', cli: 'Customers' },
    headline: (c, t) => `Campaign ${c} · VW Golf/Passat 2024-2026 · potential ABS module failure · ${t} vehicles`,
    previewSide: (t, n) => `${t} vehicles · ${n} notices`,
    genSub: (t, n) => `1 bulletin · 1 module · ${t} vehicles · ${n} recipients`,
    step: [
      ['Locates the starting point', (c) => `Campaign ${c} · VW Golf/Passat 2024-2026 · Volkswagen bulletin of 30/09/2026 · deadline 15/11/2026`],
      ['Backwards: manufacturer bulletin and ABS module', (c) => `Bulletin ${c} · ABS modules from batches MABS-2407 to MABS-2605 · VIN range supplied by Volkswagen España`],
      ['Backwards: receipts at Autopista Multimotor', (t, a, b, c) => `${t} vehicles received since 2024: ${a} in 2024, ${b} in 2025 and ${c} in 2026 · VINs matched against the affected range`],
      ['Forwards: fleet, subscriptions and showroom', (f, s, k, b) => `${f} rental-fleet vehicles (1,012 units) · ${s} on subscription · ${k} in the showroom · ${b} total-loss write-offs`],
      ['Repairs done and workshop appointments', (a, b, c) => `${a} repaired (firmware + pressure sensor) · ${b} booked between 08/10 and 30/10 · ${c} without appointment`],
      ['VW workshop capacity', (n) => `One VW technician short · ${n} pending repairs = 126 h · capacity at 70% (23 orders in the queue)`],
      ['Sales to customers, orders and financing', (n, c) => `${n} vehicles sold to ${c} customers · orders from 12/12/2024 to 06/05/2026 · Banco Sabadell financing on 1 deal`],
      ['Customer contacts and open queries', (n) => `${n} recipients verified (8 customers and the subscribers) · open query from José María López about the APR (3.99% versus 4.25%)`],
      ['Status of each vehicle from Odoo Inventory', (t, b, f, s, k, v) => `${t} vehicles: ${b} write-offs, ${f} in the fleet, ${s} on subscription, ${k} in the showroom and ${v} with customers`],
      ['Campaign reconciliation: receipts against destination', (t) => `Reconciled 100.0% · 0 vehicles unaccounted for · ${t} of ${t} located`],
      ['Opens the recall record with a notice per recipient', (n) => `Recall in draft · ${n} repair appointments to schedule`],
      ['Prepares the notices without sending', (n, k) => `${n} notices pending approval (email and SMS) · sales block proposed for ${k} showroom vehicles`]
    ],
    mk: ['Starting point located', 'Backward trace complete', 'Workshop status queried', 'Sales and customers identified', 'Contacts identified', 'Campaign reconciliation closed', 'Record and notices prepared'],
    loc2: {
      label: 'Vehicles located',
      sub: (v, f, s, k, b) => `${v} with customers · ${f} in fleet · ${s} on subscription · ${k} in showroom · ${b} write-offs`,
      short: (t, v, c, f, s, k, b) => `${t} of ${t} vehicles located (${v} with ${c} customers, ${f} in the fleet, ${s} on subscription, ${k} in the showroom and ${b} write-offs)`
    },
    kpiNotifyLabel: 'Recipients to notify',
    kpiNotifySub: (P) => '1 delivery today to hold · 17:00',
    bal: {
      title: 'Vehicle balance', kpiLabel: 'Vehicle balance reconciled',
      sub: 'Campaign vehicles from receipt to destination, and workshop work · Odoo Inventory, iCare Workshop and SAP ERP',
      head: 'Campaign REC-VW-2026-001', headSide: (n) => `${n} sales orders · 1 module`,
      labels: { in: 'Receipts', losses: 'Justified write-offs', out: 'With customer or subscriber', stock: 'In fleet and showroom' },
      detailTitle: 'Detail by flow',
      criterio: 'Criterion: the unexplained difference is shown as it is, not spread around. Each vehicle is counted by its VIN in Odoo Inventory; each sale by its order in SAP ERP; each repair by its work order in iCare Workshop.',
      reportText: 'Vehicles and write-offs declared in Odoo Inventory; sales and orders in SAP ERP; work orders and appointments in iCare Workshop; subscription contracts and queries in Salesforce CRM.'
    },
    prod: { title: 'Sales with campaign vehicles', side: (n, v) => `${n} orders · ${v} vehicles`, c1: 'Order', c2: 'Customer', c3: 'Delivery', c4: 'Vehicles', c5: 'Financing', c6: 'Located' },
    un: {
      title: 'Vehicles and locations', sub: (t) => `${t} vehicles (VIN) · Odoo Inventory, iCare Workshop and SAP ERP`,
      csv: 'Campaign vehicles (CSV)', plate: 'Plate', model: 'Model', where: 'Location or customer', detail: 'Detail', cita: 'Workshop appointment', order: 'Order', state: 'Status', action: 'Action in a real recall',
      byLoc: 'By location', refLabel: 'Campaign', nLabel: 'Vehicles', qtyLabel: 'Workshop minutes', listLabel: 'Vehicles (VIN)'
    },
    cu: {
      title: 'Recipients to notify', sub: (n, v) => `${n} recipients with ${v} vehicles · 1 delivery today to hold`,
      holdsTitle: 'Actions at the hub',
      h1: (P) => `Hold delivery ${P.ship} (today at 17:00)`, h1Meta: (P, c) => ['1 campaign vehicle', P.order, c],
      h1Body: (P) => `In a real recall, the delivery manager does not hand over the showroom unit reserved in ${P.order} and offers another unit from a different batch.`,
      h2: (n) => `Block the sale of the ${n} free showroom vehicles`, h2Meta: ['today', 'Golf/Passat 2024-2026', 'Odoo and SAP'],
      h2Body: 'They are still available to sell: in a real recall they are blocked in Odoo Inventory and SAP ERP until repaired. List by VIN in the "Vehicles (VIN)" tab and in the CSV.',
      h3: 'Reinforce the VW workshop', h3Meta: (n) => [`${n} repairs`, '126 h', 'iCare Workshop'],
      h3Body: 'One VW technician short: in a real recall, help is requested from another certified brand and the 23 queued orders are reordered so the 15/11/2026 deadline is not missed.'
    },
    ap: {
      title: 'Recall and drill notices',
      s1: 'Recipients with campaign vehicles', s1v: (n, v) => `${n} recipients · ${v} vehicles`,
      s2: 'Delivery today to hold', s2v: (P) => `${P.ship} · today at 17:00 · 1 vehicle`,
      s3: 'Sale that would be blocked', s3v: (n) => `${n} vehicles in the showroom`, s3c: 'No block in a drill',
      s4: 'Workshop', s4v: (n) => `Schedule the ${n} fleet vehicles without an appointment (work orders in iCare Workshop)`,
      effects: (n) => [
        `Twilio SMS and email: ${n} notices saved as drafts marked DRILL; nothing is sent`,
        `SAP ERP: recall record and ${n} appointment requests in draft, not released`,
        'Odoo Inventory: no changes; in a drill no sale is blocked and no delivery is held',
        'Record {code} approved with the timings of each activity'
      ]
    },
    rp: {
      objeto: 'Recall drill starting from {label}. It checks backward traceability (bulletin, ABS module and receipts) and forward traceability (fleet, sales, subscriptions and workshop), with the campaign vehicle balance.',
      noAction: 'The exercise does not block sales, hold deliveries or send notices.',
      results: (n, k) => [
        `${n} recipients in the Community of Madrid (8 customers and the subscribers) and 1 delivery today that would be held.`,
        'The VW workshop is one technician short: the 84 pending repairs (126 h) need reinforcement to meet the 15/11/2026 deadline.',
        `The sale of ${k} free showroom vehicles would be blocked.`
      ],
      bc1: 'Stage', bc2: 'Reference', bc3: 'Date', bc4: 'Detail',
      backRows: (t, a, b, c) => [
        { etapa: 'Manufacturer', ref: 'REC-VW-2026-001', fecha: '30/09/2026', det: 'Volkswagen bulletin · Golf/Passat 2024-2026 · potential ABS module failure' },
        { etapa: 'ABS module', ref: 'MABS-2407/2605', fecha: '07/2024 to 05/2026', det: 'Affected batches · firmware update and pressure sensor where needed' },
        { etapa: 'Receipts 2024', ref: 'ENT-VW-2024', fecha: '2024', det: `${a} vehicles received at Autopista Multimotor` },
        { etapa: 'Receipts 2025', ref: 'ENT-VW-2025', fecha: '2025', det: `${b} vehicles received` },
        { etapa: 'Receipts 2026', ref: 'ENT-VW-2026', fecha: '2026', det: `${c} vehicles received` },
        { etapa: 'Write-offs', ref: 'SIN-2026-0812', fecha: '12/08/2026', det: '2 total-loss vehicles · fleet and registration write-off' },
        { etapa: 'Workshop', ref: 'iCare Workshop', fecha: '24/09 to 06/10/2026', det: '12 vehicles repaired · 20 booked · capacity at 70%' },
        { etapa: 'Recall', ref: 'REC-VW-2026-001', fecha: '07/10/2026', det: `${t} vehicles located · deadline 15/11/2026` }
      ],
      fwdExtra: (P, c, f, s, k) => [
        { ped: P.order, cliente: `${c} (today's delivery, reserved in the showroom)`, date: '07/10/2026', n: 1, fin: '—' },
        { ped: 'FLEET', cliente: 'Rental fleet (47 vehicles)', date: '—', n: f, fin: '—' },
        { ped: 'SUBSCR.', cliente: '6-month subscriptions', date: '—', n: s, fin: '—' },
        { ped: 'SHOWROOM', cliente: 'Madrid showroom (not blocked)', date: '—', n: k, fin: '—' }
      ],
      conclusion: 'Conclusion: the information needed for a recall is obtained in full and the campaign reconciles vehicle by vehicle. Proposed improvements: reserve VW workshop capacity when each campaign opens and link campaign VINs to rental bookings in Odoo.',
      note: 'Drill: no sale has been blocked, no delivery has been held and no notice has been sent. Synthetic demonstration data.'
    },
    audit: { back: 'bulletin REC-VW-2026-001 · ABS module MABS-2407/2605 · receipts 2024-2026', fwd: (t, n) => `${t} vehicles · ${n} recipients · 1 delivery today` },
    say: (P, k, n) => [
      `What is actionable: ${P.ship} (today at 17:00) would be held and the sale of the ${k} free showroom vehicles would be blocked.`,
      `The notices go to ${n} recipients with their order and VINs; subscribers get an SMS. In a drill nothing is sent. The Operations Manager decides.`
    ],
    title: 'Recall drill', nav: 'Recalls and withdrawals', section: 'Calidad',
    desc: 'Traceability exercise for manufacturer recall campaigns: backward and forward genealogy, from the bulletin to the vehicle and the customer, vehicle balance and recipients to notify, starting from a campaign or a VIN.',
    place: 'Operations hub · Madrid (Marqués de Soria)',
    approver: 'Operations Manager',
    agents: { trace: 'Traceability', bal: 'Vehicle balance', rec: 'Recall and notices' },
    targetText: 'Illustrative target: 4 h', todayEstimate: '2–5 h', timerRef: 'Demo target: 4 h', packLabel: 'Download recall pack',
    setup: { title: 'Starting point', sub: 'A manufacturer recall campaign or the VIN of a vehicle' },
    m: {
      recall: 'Campaign', recallNoun: 'the campaign', recallField: 'Campaign code', recallLabel: (c) => `Campaign ${c}`, recallOption: 'VW Golf/Passat 2024-2026 · ABS module · deadline 15/11/2026',
      vinNoun: 'the VIN', vinField: 'Vehicle VIN',
      vinOption: (v) => `${v ? v.model : 'Golf'} · rental fleet · no repair appointment`,
      vinHeadline: (v, c) => `VIN ${v} · rental fleet (campaign ${c}) → the whole campaign is traced`,
      vinResult: (v, x, c) => `Vehicle ${v} · VW ${x ? x.model : 'Golf'} · plate ${x ? x.plate : ''} · rental fleet with no repair appointment → the whole campaign ${c} is traced`
    },
    reference: {
      title: 'Audit reference',
      sub: 'Goal of the exercise; Operations confirms the manufacturer\'s and its customers\' requirements',
      items: [
        ['Regulation (EU) 2018/858', 'Type-approval and market surveillance: the manufacturer announces the campaign and the distributor helps locate and repair the affected vehicles.'],
        ['VW distribution agreement', 'Tracking campaign progress until the 15/11/2026 deadline and closing each file. Illustrative target for the exercise: locate every vehicle within 4 hours.'],
        ['PR-OPS-014', 'Internal recall procedure: Operations decides the scope and approves the notices.']
      ],
      note: 'A drill does not block sales, hold deliveries or send notices: it measures whether the information is obtained in full, reconciles and on time.'
    },
    legend: { planned: 'Today\'s delivery: hold', click: 'Each card summarises a campaign stage' },
    noticeCfg: { title: 'Recall drill' },
    approvalCfg: { policy: 'PR-OPS-014 · blocking sales or holding deliveries requires the Operations Manager\'s approval', approveLabel: 'Approve and close drill', rejectPlaceholder: 'For example: a leasing customer\'s contact still needs confirming' },
    clock: { title: 'Stopwatch vs target', sub: 'Simulation timings; not performance measurements of the systems' },
    reportCfg: { subtitle: 'Record of the traceability and recall exercise · Regulation (EU) 2018/858 · PR-OPS-014' },
    compare: {
      rows: [
        { k: 'People involved', today: '3–4: Operations, Workshop, Sales and Customer Care', agentic: '1: {approver} reviews and approves' },
        { k: 'Systems queried', today: '5–6 opened by hand: Salesforce, SAP, Odoo, iCare, spreadsheets and email', agentic: '5 connectors queried by the agents: SAP ERP, Odoo Inventory, iCare Workshop, Salesforce CRM and Twilio SMS' },
        { k: 'Steps', today: '15–20 queries, matching VINs to orders and appointments and manual calculations', agentic: '{steps} automatic steps and 1 approval' },
        { k: 'Vehicle balance', today: 'Spreadsheet with receipts, sales, fleet and appointments', agentic: 'Calculated by VIN and order: {reconciled} reconciled' }
      ]
    },
    presenter: (c, v) => ({
      idle: [
        'Recall drill with traceability and vehicle balance; in the pilot, Operations confirms the protocol and we measure the real time.',
        `Choose the starting point: campaign ${c} (ABS failure on VW Golf/Passat) or the VIN of an affected vehicle.`,
        'Agentic Platform works through SAP, Odoo, iCare and Salesforce backwards to the bulletin and receipts, and forwards to the fleet, the workshop and every customer, and reconciles the campaign vehicle by vehicle.'
      ],
      nextIdle: `Click «Start drill» with campaign ${c} (or choose «VIN ${v}»).`,
      nextRun: 'Click «View notice» for José María López and then «Approve and close drill».',
      nextDone: '«Download recall pack»: vehicle CSV and printable record. Then «Customer questionnaire» (right arrow).'
    })
  };


  const CAMP = 'REC-VW-2026-001';
  const VIN_PFX = 'VIN-2026-MAD-VW-';
  const PLANNED = { cust: 'cdr', order: 'PV-26-10-0418', ship: 'ENT-26-10-0092' };
  const KIDS = { jml: 'user', abr: 'user', rdm: 'key' };

  /* Clientes con vehículos de la campaña: [id, cliente, tipo, localidad, vehículos, fecha de entrega, pedido, año de entrada] */
  const CUSTOMERS = [
    ['jml', 'José María López', 'part', 'Madrid', 1, '2026-03-14', 'PV-26-03-0212', 2026],
    ['trh', 'Transportes Rápidos Henares, S.L.', 'emp', 'Alcalá de Henares', 6, '2025-11-20', 'PV-25-11-0634', 2025],
    ['cvh', 'Consultoría Vallehermoso, S.L.', 'emp', 'Madrid', 4, '2026-01-29', 'PV-26-01-0095', 2026],
    ['ghc', 'Grupo Hotelero Chamberí, S.A.', 'emp', 'Madrid', 5, '2026-02-18', 'PV-26-02-0161', 2026],
    ['cdr', 'Clínica Dental Retiro, S.L.', 'emp', 'Madrid', 2, '2025-07-09', 'PV-25-07-0388', 2025],
    ['abr', 'Ana Belén Ruiz Ortega', 'part', 'Pozuelo de Alarcón', 1, '2026-05-06', 'PV-26-05-0274', 2026],
    ['rdm', 'Renting Directo Madrid, S.A.', 'rent', 'Getafe', 11, '2024-12-12', 'PV-24-12-0719', 2024],
    ['aba', 'Autoescuela Barajas, S.L.', 'emp', 'Madrid', 4, '2025-09-25', 'PV-25-09-0502', 2025]
  ].map(([id, label, kind, city, n, date, ped, year]) => ({ id, label, kind, city, n, date, ped, year, region: S.region, financed: id === 'jml' }));
  const CUST = {};
  CUSTOMERS.forEach((c) => { CUST[c.id] = c; });

  const N_FLEET_OK = 12; const N_FLEET_CITA = 20; const N_FLEET_NO = 15; const N_SUB = 9; const N_STK_FREE = 5; const N_STK_RES = 1; const N_BAJA = 2;
  const N_SOLD = CUSTOMERS.reduce((s, c) => s + c.n, 0);
  const N_FLEET = N_FLEET_OK + N_FLEET_CITA + N_FLEET_NO;
  const N_STK = N_STK_FREE + N_STK_RES;
  const TOTAL = N_FLEET + N_SUB + N_STK + N_SOLD + N_BAJA;
  const N_TODO = TOTAL - N_BAJA - N_FLEET_OK;
  const N_UNSCHED = N_TODO - N_FLEET_CITA;
  const MIN_JOB = 90;
  const N_CUST_NOTIFY = CUSTOMERS.length + 1;

  const fmtD = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '');
  const dm = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}` : '');
  const plural = (n, a, b) => `${n0(n)} ${n === 1 ? a : b}`;
  const veh = (n) => plural(n, S.vehOne, S.vehMany);
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const pad = (n, w) => String(n).padStart(w, '0');
  const kindOf = (c) => S.kinds[c.kind];

  /* ---------------------------------------------------------------- Vehículos (VIN) */

  let seed = 261007;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  const LET = 'BCDFGHJKLMNPRSTVWXYZ';
  const plate = () => `${1000 + Math.floor(rnd() * 8999)} ${LET[Math.floor(rnd() * 20)]}${LET[Math.floor(rnd() * 20)]}${LET[Math.floor(rnd() * 20)]}`;
  const MODELS = ['Golf 1.5 eTSI', 'Golf 2.0 TDI', 'Passat 2.0 TDI', 'Golf GTD'];
  const VEH = [];
  function addVeh(n, f) {
    for (let i = 0; i < n; i += 1) {
      const k = VEH.length + 1;
      VEH.push(Object.assign({ vin: `${VIN_PFX}${pad(k, 3)}`, plate: plate(), model: MODELS[k % MODELS.length] }, f(i, k)));
    }
  }
  addVeh(N_FLEET_OK, (i) => ({ cat: 'ok', year: 2024, where: S.fleetWhere, whereSub: S.fleetSub, cita: S.done, citaSub: `${pad(29 + (i % 2) * 0 + Math.floor(i / 2) * 0, 2)}/09`.replace(/^\d+\/09$/, i < 6 ? `${pad(24 + i, 2)}/09` : `${pad(i - 5, 2)}/10`) }));
  addVeh(N_FLEET_CITA, (i, k) => ({ cat: 'cita', year: 2025, where: S.fleetWhere, whereSub: S.fleetSub, cita: `${pad(8 + Math.floor(i * 1.1), 2)}/10/2026`, citaSub: `OT-26-10-${pad(300 + k, 4)}` }));
  addVeh(N_FLEET_NO, (i) => ({ cat: 'nocita', year: i < 8 ? 2024 : 2025, where: S.fleetWhere, whereSub: S.fleetSub, cita: '—', citaSub: S.noCita }));
  addVeh(N_SUB, (i) => ({ cat: 'sub', year: i < 5 ? 2025 : 2026, where: S.subWhere, whereSub: S.subSub, cita: '—', citaSub: S.noCita }));
  addVeh(N_STK_FREE, () => ({ cat: 'stk', year: 2026, where: S.stkWhere, whereSub: S.stkSub, cita: '—', citaSub: S.noCita }));
  addVeh(N_STK_RES, () => ({ cat: 'res', year: 2026, where: S.stkWhere, whereSub: S.resSub(PLANNED), cita: '—', citaSub: S.noCita, cust: PLANNED.cust }));
  CUSTOMERS.forEach((c) => addVeh(c.n, () => ({ cat: 'sold', year: c.year, cust: c.id, where: c.label, whereSub: `${c.city} · ${kindOf(c)}`, cita: '—', citaSub: S.noCita, ped: c.ped, date: fmtD(c.date) })));
  addVeh(N_BAJA, () => ({ cat: 'baja', year: 2026, where: S.bajaWhere, whereSub: S.bajaSub, cita: '—', citaSub: '—' }));
  const VINS_OF = (id) => VEH.filter((v) => v.cust === id && v.cat === 'sold').map((v) => v.vin);
  const byYear = (y) => VEH.filter((v) => v.year === y).length;

  const CHIPS = { ok: { status: 'done', label: S.chip.ok }, cita: { status: 'pending', label: S.chip.cita }, nocita: { status: 'critical', label: S.chip.nocita }, sub: { status: 'pending', label: S.chip.sub }, stk: { status: 'hold', label: S.chip.stk }, res: { status: 'pending', label: S.chip.res }, sold: { status: 'shipped', label: S.chip.sold }, baja: { status: 'neutral', label: S.chip.baja } };
  const vehRows = VEH.map((v) => ({ vin: v.vin, plate: v.plate, model: v.model, modelSub: S.entry(v.year), where: v.where, whereSub: v.whereSub, cita: v.cita, citaSub: v.citaSub, estado: CHIPS[v.cat], accion: S.actions[v.cat] }));

  /* ---------------------------------------------------------------- Avisos */

  function noticeOf(c) {
    const planned = c.id === PLANNED.cust;
    const vins = VINS_OF(c.id);
    const shown = vins.slice(0, 3).join(', ') + (vins.length > 3 ? S.andMore(vins.length - 3) : '');
    const subj = S.subject(c.n);
    const parts = [
      S.greeting(c),
      S.intro,
      [S.lCamp(CAMP), S.lVins(shown, c.n), S.lOrder(c.ped, fmtD(c.date))].join('\n'),
      S.reason,
      c.kind === 'rent' ? S.askRent : S.ask
    ];
    if (c.financed) parts.push(S.financed);
    if (planned) parts.push(S.planned(PLANNED));
    parts.push(S.drill);
    parts.push(S.sign);
    return { lang: S.lang, headers: { From: S.from, To: S.to(c), Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [CAMP, vins[0]].concat(planned ? [PLANNED.ship] : []) };
  }
  function noticeSub() {
    const vins = VEH.filter((v) => v.cat === 'sub').map((v) => v.vin);
    const subj = S.subject(N_SUB);
    const parts = [S.subGreeting, S.intro, [S.lCamp(CAMP), S.lVins(`${vins.slice(0, 3).join(', ')}${S.andMore(vins.length - 3)}`, N_SUB), S.lSub].join('\n'), S.reason, S.askSub, S.drill, S.sign];
    return { lang: S.lang, headers: { From: S.from, To: S.subTo, Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [CAMP, vins[0]] };
  }

  const items = CUSTOMERS.map((c) => {
    const body = [S.custBody(c.n, c.ped, dm(c.date))];
    if (c.kind === 'rent') body.push(S.rentNote);
    if (c.id === 'jml') body.push(S.jmlNote);
    if (c.id === PLANNED.cust) body.push(S.plannedNote(PLANNED));
    return { id: c.id, label: c.label, icon: KIDS[c.id] || 'building', notify: true, channel: S.channelCust, meta: [`${c.city} · ${c.region}`, kindOf(c), S.noticeLang], body: body.join(' '), notice: noticeOf(c), refs: c.ped + (c.id === PLANNED.cust ? ` · ${PLANNED.order}` : ''), qtyText: veh(c.n), action: S.custAction(c.id === PLANNED.cust) };
  });
  items.push({ id: 'sub', label: S.subLabel, icon: 'users', notify: true, channel: S.channelSub, meta: [S.region, S.subMeta, S.noticeLang], body: S.subBody, notice: noticeSub(), refs: `${N_SUB} VIN`, qtyText: veh(N_SUB), action: S.subAction });
  items.push({ id: 'flota', label: S.flotaLabel, icon: 'key', notify: false, chip: S.internal, channel: S.channelFlota, meta: S.flotaMeta, body: S.flotaBody, refs: `${N_FLEET} VIN`, qtyText: veh(N_FLEET), action: S.flotaAction });
  items.push({ id: 'taller', label: S.tallerLabel, icon: 'wrench', notify: false, chip: S.internal, channel: S.channelTaller, meta: S.tallerMeta, body: S.tallerBody, refs: 'iCare Taller', qtyText: S.hours(N_TODO), action: S.tallerAction });
  items.push({ id: 'vw', label: S.vwLabel, icon: 'factory', notify: false, chip: S.chipVw, channel: S.channelVw, meta: S.vwMeta, body: S.vwBody, refs: CAMP, qtyText: veh(TOTAL), action: S.vwAction });

  /* ---------------------------------------------------------------- Genealogía */

  const nodes = [
    { id: 'BOL', stage: 'fab', kicker: S.nd.bolK, title: CAMP, mono: true, sub: S.nd.bolSub, meta: S.nd.bolMeta, alert: S.nd.bolAlert, alertTone: true, reveal: 1 },
    { id: 'MOD', stage: 'fab', kicker: S.nd.modK, title: 'MABS-2407/2605', mono: true, sub: S.nd.modSub, meta: S.nd.modMeta, reveal: 1 },
    { id: 'E24', stage: 'ent', kicker: S.nd.entK, title: '2024', sub: veh(byYear(2024)), meta: S.nd.entMeta, tone: 'shipped', reveal: 2 },
    { id: 'E25', stage: 'ent', kicker: S.nd.entK, title: '2025', sub: veh(byYear(2025)), meta: S.nd.entMeta, tone: 'shipped', reveal: 2 },
    { id: 'E26', stage: 'ent', kicker: S.nd.entK, title: '2026', sub: veh(byYear(2026)), meta: S.nd.entMeta, tone: 'shipped', reveal: 2 },
    { id: 'FLO', stage: 'est', kicker: S.nd.floK, title: veh(N_FLEET), sub: S.nd.floSub(N_FLEET_OK, N_FLEET_CITA, N_FLEET_NO), meta: S.nd.floMeta, alert: S.nd.floAlert, alertTone: true, tone: 'stock', reveal: 3 },
    { id: 'SUS', stage: 'est', kicker: S.nd.susK, title: veh(N_SUB), sub: S.nd.susSub, meta: S.nd.susMeta, tone: 'customer', reveal: 3 },
    { id: 'STK', stage: 'est', kicker: S.nd.stkK, title: veh(N_STK), sub: S.nd.stkSub(PLANNED), meta: S.nd.stkMeta, alert: S.nd.stkAlert, alertTone: true, tone: 'planned', reveal: 3 },
    { id: 'VEN', stage: 'est', kicker: S.nd.venK, title: veh(N_SOLD), sub: S.nd.venSub(CUSTOMERS.length), meta: S.nd.venMeta, tone: 'shipped', reveal: 3 },
    { id: 'BAJ', stage: 'est', kicker: S.nd.bajK, title: veh(N_BAJA), sub: S.nd.bajSub, meta: S.nd.bajMeta, tone: 'stock', reveal: 3 },
    { id: 'TR', stage: 'tal', kicker: S.nd.trK, title: veh(N_FLEET_OK), sub: S.nd.trSub, meta: S.nd.trMeta, tone: 'customer', reveal: 4 },
    { id: 'TC', stage: 'tal', kicker: S.nd.tcK, title: veh(N_FLEET_CITA), sub: S.nd.tcSub, meta: S.nd.tcMeta, tone: 'shipped', reveal: 4 },
    { id: 'TS', stage: 'tal', kicker: S.nd.tsK, title: veh(N_UNSCHED), sub: S.nd.tsSub(N_FLEET_NO, N_SUB, N_SOLD, N_STK), meta: S.nd.tsMeta, alert: S.nd.tsAlert, alertTone: true, tone: 'planned', reveal: 4 }
  ];
  CUSTOMERS.forEach((c) => nodes.push({ id: `C:${c.id}`, stage: 'cli', kicker: kindOf(c), title: c.label.replace(/, S\.[LA]\.$/, ''), sub: `${c.city} · ${veh(c.n)}`, tone: 'customer', reveal: 5 }));
  nodes.push({ id: 'C:sub', stage: 'cli', kicker: S.nd.subCliK, title: S.nd.subCliT, sub: `Madrid · ${veh(N_SUB)}`, tone: 'customer', reveal: 5 });
  const edges = [['BOL', 'MOD'], ['MOD', 'E24'], ['MOD', 'E25'], ['MOD', 'E26'], ['E24', 'FLO'], ['E25', 'FLO'], ['E24', 'VEN'], ['E25', 'VEN'], ['E26', 'VEN'], ['E25', 'SUS'], ['E26', 'SUS'], ['E26', 'STK'], ['E26', 'BAJ'], ['FLO', 'TR'], ['FLO', 'TC'], ['FLO', 'TS'], ['SUS', 'TS'], ['VEN', 'TS'], ['STK', 'TS']];
  CUSTOMERS.forEach((c) => edges.push(['VEN', `C:${c.id}`]));
  edges.push(['SUS', 'C:sub'], ['STK', `C:${PLANNED.cust}`]);

  /* ---------------------------------------------------------------- Tablas */

  const saleRows = CUSTOMERS.map((c) => ({ ped: c.ped, cliente: c.label, sub: `${kindOf(c)} · ${c.city}`, date: fmtD(c.date), n: c.n, fin: c.financed ? 'Banco Sabadell' : S.cash, located: S.pct100 }));
  const minOf = (n) => n * MIN_JOB;
  const locRows = [
    { ref: CAMP, where: S.loc.res, whereSub: S.loc.resSub(PLANNED, CUST[PLANNED.cust].label), n: N_STK_RES, qty: minOf(N_STK_RES), action: S.loc.resAct, tone: 'crit' },
    { ref: CAMP, where: S.loc.stk, whereSub: S.loc.stkSub, n: N_STK_FREE, qty: minOf(N_STK_FREE), action: S.loc.stkAct, tone: 'warn' },
    { ref: CAMP, where: S.loc.nocita, whereSub: S.loc.nocitaSub, n: N_FLEET_NO, qty: minOf(N_FLEET_NO), action: S.loc.nocitaAct, tone: 'crit' },
    { ref: CAMP, where: S.loc.cita, whereSub: S.loc.citaSub, n: N_FLEET_CITA, qty: minOf(N_FLEET_CITA), action: S.loc.citaAct, tone: 'warn' },
    { ref: CAMP, where: S.loc.ok, whereSub: S.loc.okSub, n: N_FLEET_OK, qty: 0, action: S.loc.okAct, tone: '' },
    { ref: CAMP, where: S.loc.sub, whereSub: S.loc.subSub, n: N_SUB, qty: minOf(N_SUB), action: S.loc.subAct, tone: 'warn' }
  ].concat(['part', 'emp', 'rent'].map((k) => {
    const cs = CUSTOMERS.filter((c) => c.kind === k);
    return { ref: CAMP, where: S.loc.cust(S.kinds[k]), whereSub: `${plural(cs.length, S.cliOne, S.cliMany)} · ${S.list(cs.map((c) => c.city).filter((x, i, a) => a.indexOf(x) === i))}`, n: sum(cs, (c) => c.n), qty: minOf(sum(cs, (c) => c.n)), action: S.loc.custAct, tone: 'warn' };
  })).concat([{ ref: CAMP, where: S.loc.baja, whereSub: S.loc.bajaSub, n: N_BAJA, qty: 0, action: S.loc.bajaAct, tone: '' }]);

  const outsSold = CUSTOMERS.map((c) => ({ label: c.label, sub: `${c.ped} · ${dm(c.date)} · ${c.city}`, stage: 'SAP ERP', qty: c.n }));
  const flowVeh = {
    key: 'veh', seg: S.fl.seg1, main: true, unit: S.fl.unit1, colLabel: S.fl.col1,
    title: S.fl.title1(CAMP),
    inLabel: S.fl.in1, inSub: S.fl.in1Sub, inStage: 'Odoo', inQty: TOTAL,
    phases: [{ title: S.fl.phase1, date: '2026-08-12', stages: [['Odoo', S.fl.loss1, N_BAJA]] }],
    outsTitle: S.fl.outsTitle,
    outs: outsSold.concat([
      { label: S.fl.oSub, sub: S.fl.oSubSub, stage: 'Salesforce', qty: N_SUB },
      { label: S.fl.oFleetOk, sub: S.fl.oFleetOkSub, stage: 'iCare', qty: N_FLEET_OK, kind: 'stock' },
      { label: S.fl.oFleetCita, sub: S.fl.oFleetCitaSub, stage: 'iCare', qty: N_FLEET_CITA, kind: 'stock' },
      { label: S.fl.oFleetNo, sub: S.fl.oFleetNoSub, stage: 'Odoo', qty: N_FLEET_NO, kind: 'stock' },
      { label: S.fl.oRes(PLANNED), sub: S.fl.oResSub(PLANNED), stage: 'Odoo', qty: N_STK_RES, kind: 'stock' },
      { label: S.fl.oStk, sub: S.fl.oStkSub, stage: 'Odoo', qty: N_STK_FREE, kind: 'stock' }
    ])
  };
  const flowMin = {
    key: 'taller', seg: S.fl.seg2, unit: 'min', colLabel: S.fl.col2,
    title: S.fl.title2(CAMP),
    inLabel: S.fl.in2, inSub: S.fl.in2Sub(TOTAL - N_BAJA, MIN_JOB), inStage: 'iCare', inQty: minOf(TOTAL - N_BAJA),
    phases: [],
    outsTitle: S.fl.outsTitle2,
    outs: [
      { label: S.fl.m1, sub: S.fl.m1Sub(N_FLEET_OK), stage: 'iCare', qty: minOf(N_FLEET_OK) },
      { label: S.fl.m2, sub: S.fl.m2Sub(N_FLEET_CITA), stage: 'iCare', qty: minOf(N_FLEET_CITA), kind: 'stock' },
      { label: S.fl.m3, sub: S.fl.m3Sub(N_FLEET_NO), stage: 'iCare', qty: minOf(N_FLEET_NO), kind: 'stock' },
      { label: S.fl.m4, sub: S.fl.m4Sub(N_SOLD), stage: 'iCare', qty: minOf(N_SOLD), kind: 'stock' },
      { label: S.fl.m5, sub: S.fl.m5Sub(N_SUB), stage: 'iCare', qty: minOf(N_SUB), kind: 'stock' },
      { label: S.fl.m6, sub: S.fl.m6Sub(N_STK), stage: 'iCare', qty: minOf(N_STK), kind: 'stock' }
    ]
  };

  const SYSTEMS = ['SAP ERP', 'Odoo Inventario', 'iCare Taller', 'Salesforce CRM'];

  const scope = {
    headline: S.headline(CAMP, TOTAL),
    previewSide: S.previewSide(TOTAL, N_CUST_NOTIFY),
    startNode: 'BOL',
    stages: [
      { id: 'fab', label: S.st.fab, icon: 'factory' },
      { id: 'ent', label: S.st.ent, icon: 'truck' },
      { id: 'est', label: S.st.est, icon: 'warehouse' },
      { id: 'tal', label: S.st.tal, icon: 'wrench' },
      { id: 'cli', label: S.st.cli, icon: 'building', count: N_CUST_NOTIFY }
    ],
    nodes,
    edges,
    systems: SYSTEMS,
    genSub: S.genSub(TOTAL, N_CUST_NOTIFY),
    steps: [
      { agent: 'trace', system: 'SAP ERP', action: S.step[0][0], result: S.step[0][1](CAMP), ms: 190, reveal: 0, mark: S.mk[0] },
      { agent: 'trace', system: 'SAP ERP', action: S.step[1][0], result: S.step[1][1](CAMP), ms: 430, reveal: 1 },
      { agent: 'trace', system: 'Odoo Inventario', action: S.step[2][0], result: S.step[2][1](TOTAL, byYear(2024), byYear(2025), byYear(2026)), ms: 520, reveal: 2, mark: S.mk[1] },
      { agent: 'trace', system: 'Odoo Inventario', action: S.step[3][0], result: S.step[3][1](N_FLEET, N_SUB, N_STK, N_BAJA), ms: 560, reveal: 3 },
      { agent: 'trace', system: 'iCare Taller', action: S.step[4][0], result: S.step[4][1](N_FLEET_OK, N_FLEET_CITA, N_FLEET_NO), ms: 470, reveal: 4, mark: S.mk[2] },
      { agent: 'trace', system: 'iCare Taller', action: S.step[5][0], result: S.step[5][1](N_TODO), ms: 380, tone: 'warn', reveal: 4 },
      { agent: 'trace', system: 'SAP ERP', action: S.step[6][0], result: S.step[6][1](N_SOLD, CUSTOMERS.length), ms: 590, reveal: 5, mark: S.mk[3] },
      { agent: 'trace', system: 'Salesforce CRM', action: S.step[7][0], result: S.step[7][1](N_CUST_NOTIFY), ms: 480, tone: 'warn', reveal: 5, mark: S.mk[4] },
      { agent: 'bal', system: 'Odoo Inventario', action: S.step[8][0], result: S.step[8][1](TOTAL, N_BAJA, N_FLEET, N_SUB, N_STK, N_SOLD), ms: 420 },
      { agent: 'bal', system: 'Agentic Platform', action: S.step[9][0], result: S.step[9][1](TOTAL), ms: 95, tone: 'ok', mark: S.mk[5] },
      { agent: 'rec', system: 'SAP ERP', action: S.step[10][0], result: S.step[10][1](N_UNSCHED), ms: 360 },
      { agent: 'rec', system: 'Twilio SMS', action: S.step[11][0], result: S.step[11][1](N_CUST_NOTIFY, N_STK_FREE), ms: 720, mark: S.mk[6] }
    ],
    located: { label: S.loc2.label, value: `${n0(TOTAL)} / ${n0(TOTAL)}`, sub: S.loc2.sub(N_SOLD, N_FLEET, N_SUB, N_STK, N_BAJA), icon: 'truck', short: S.loc2.short(TOTAL, N_SOLD, CUSTOMERS.length, N_FLEET, N_SUB, N_STK, N_BAJA) },
    kpiNotify: { label: S.kpiNotifyLabel, value: N_CUST_NOTIFY, sub: S.kpiNotifySub(PLANNED) },
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
      flows: [flowVeh, flowMin],
      product: {
        title: S.prod.title,
        side: S.prod.side(CUSTOMERS.length, N_SOLD),
        cols: [
          { label: S.prod.c1, key: 'ped', mono: true },
          { label: S.prod.c2, key: 'cliente', sub: 'sub' },
          { label: S.prod.c3, key: 'date' },
          { label: S.prod.c4, key: 'n', num: true },
          { label: S.prod.c5, key: 'fin' },
          { label: S.prod.c6, key: 'located', num: true, ok: true }
        ],
        rows: saleRows
      }
    },
    units: {
      title: S.un.title,
      sub: S.un.sub(TOTAL),
      icon: 'truck',
      csvLabel: S.un.csv,
      csvName: 'vehiculos',
      csvCols: [
        { label: 'VIN', key: 'vin' }, { label: S.un.plate, key: 'plate' }, { label: S.un.model, key: 'model' }, { label: S.un.where, key: 'where' }, { label: S.un.detail, key: 'whereSub' },
        { label: S.un.cita, key: 'cita' }, { label: S.un.order, key: 'citaSub' }, { label: S.un.state, key: 'estado' }, { label: S.un.action, key: 'accion' }
      ],
      byLoc: { label: S.un.byLoc, refLabel: S.un.refLabel, whereLabel: S.un.where, nLabel: S.un.nLabel, qtyLabel: S.un.qtyLabel, actionLabel: S.un.action, rows: locRows },
      list: {
        label: S.un.listLabel,
        cols: [
          { label: 'VIN', key: 'vin', mono: true, sub: 'plate' },
          { label: S.un.model, key: 'model', sub: 'modelSub' },
          { label: S.un.where, key: 'where', sub: 'whereSub' },
          { label: S.un.cita, key: 'cita', mono: true, sub: 'citaSub' },
          { label: S.un.state, key: 'estado', chip: true },
          { label: S.un.action, key: 'accion' }
        ],
        rows: vehRows
      }
    },
    customers: {
      title: S.cu.title,
      sub: S.cu.sub(N_CUST_NOTIFY, N_SOLD + N_SUB),
      items,
      holdsTitle: S.cu.holdsTitle,
      holds: [
        { icon: 'truck', tone: 'crit', title: S.cu.h1(PLANNED), meta: S.cu.h1Meta(PLANNED, CUST[PLANNED.cust].label), body: S.cu.h1Body(PLANNED) },
        { icon: 'lock', tone: 'warn', title: S.cu.h2(N_STK_FREE), meta: S.cu.h2Meta, body: S.cu.h2Body },
        { icon: 'wrench', tone: 'warn', title: S.cu.h3, meta: S.cu.h3Meta(N_TODO), body: S.cu.h3Body }
      ]
    },
    approval: {
      titlePrefix: S.ap.title,
      scope: [
        { label: S.ap.s1, value: S.ap.s1v(N_CUST_NOTIFY, N_SOLD + N_SUB), status: 'pending', chip: String(N_CUST_NOTIFY) },
        { label: S.ap.s2, value: S.ap.s2v(PLANNED) },
        { label: S.ap.s3, value: S.ap.s3v(N_STK_FREE), status: 'evaluate', chip: S.ap.s3c },
        { label: S.ap.s4, value: S.ap.s4v(N_FLEET_NO) }
      ],
      effects: S.ap.effects(N_CUST_NOTIFY)
    },
    report: {
      objeto: S.rp.objeto,
      noAction: S.rp.noAction,
      results: S.rp.results(N_CUST_NOTIFY, N_STK_FREE),
      back: {
        cols: [{ label: S.rp.bc1, key: 'etapa' }, { label: S.rp.bc2, key: 'ref', mono: true }, { label: S.rp.bc3, key: 'fecha' }, { label: S.rp.bc4, key: 'det' }],
        rows: S.rp.backRows(TOTAL, byYear(2024), byYear(2025), byYear(2026))
      },
      fwd: {
        cols: [{ label: S.prod.c1, key: 'ped', mono: true }, { label: S.prod.c2, key: 'cliente' }, { label: S.prod.c3, key: 'date' }, { label: S.prod.c4, key: 'n' }, { label: S.prod.c5, key: 'fin' }],
        rows: saleRows.concat(S.rp.fwdExtra(PLANNED, CUST[PLANNED.cust].label, N_FLEET, N_SUB, N_STK_FREE))
      },
      conclusion: S.rp.conclusion,
      note: S.rp.note
    },
    audit: { back: S.audit.back, fwd: S.audit.fwd(TOTAL, N_CUST_NOTIFY) },
    say: S.say(PLANNED, N_STK_FREE, N_CUST_NOTIFY)
  };

  const FIRST_NO = VEH.find((v) => v.cat === 'nocita');
  const sample = FIRST_NO ? FIRST_NO.vin : `${VIN_PFX}040`;

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
      recall: { label: S.m.recall, noun: S.m.recallNoun, field: S.m.recallField, icon: 'layers', format: CAMP, where: 'SAP ERP · Odoo Inventario' },
      vin: { label: 'VIN', noun: S.m.vinNoun, field: S.m.vinField, icon: 'barcode', format: `${VIN_PFX}040`, where: 'Odoo Inventario · iCare Taller' }
    },
    entries: [
      { mode: 'recall', code: CAMP, scope: 'abs', label: S.m.recallLabel(CAMP), option: S.m.recallOption },
      { mode: 'vin', code: sample, scope: 'abs', label: `VIN ${sample}`, option: S.m.vinOption(FIRST_NO), headline: S.m.vinHeadline(sample, CAMP), startNode: 'FLO', startResult: S.m.vinResult(sample, FIRST_NO, CAMP) }
    ],
    examples: [{ mode: 'recall', code: CAMP, label: S.m.recallLabel(CAMP) }, { mode: 'vin', code: sample, label: `VIN ${sample}` }],
    reference: S.reference,
    legend: S.legend,
    notice: S.noticeCfg,
    approval: S.approvalCfg,
    clock: S.clock,
    report: S.reportCfg,
    compare: S.compare,
    presenter: S.presenter(CAMP, sample),
    scopes: { abs: scope }
  };

  agenticPackEn('autopista', { retirada });
})();
