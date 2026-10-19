/* Guardián Ibérica Instalaciones · product withdrawal drill REC-2026-1019 (PIR-200 motion detector, lot PIR-2607-A from Sentinela Electronics: lithium battery with overheating risk), English.
 * Backwards: manufacturer notice, lot and receipts. Forwards: 912 homes with 1,386 installed detectors (Verisure 540, Sector Alarm 214, Prosegur Alarmas 158),
 * 960 detectors in the warehouse and 54 returned to the manufacturer. Same customers and references as the other scenes. Synthetic demonstration data (MFM). */
(function () {
  'use strict';

  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const S = {
    n0,
    lang: 'English',
    detOne: 'detector', detMany: 'detectors', homeOne: 'home', homeMany: 'homes',
    list: (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`),
    region: 'Valencian Community',
    dels: { VLC: 'Valencia', ALC: 'Alicante', CAS: 'Castellón' },
    pct100: '100.0%',
    noVisit: 'No visit',
    chip: { visit: 'Visit booked', novisit: 'No visit' },
    actions: {
      visit: 'Keep the maintenance visit and replace the detector during it',
      novisit: 'Notify the account holder and book a free replacement visit'
    },
    modelOf: (n) => `${n} × PIR-200`,
    lotLine: (lot) => `Lot ${lot}`,
    subject: (n) => `[DRILL] Safety notice REC-2026-1019 · PIR-200 detector · lot PIR-2607-A · ${n} ${n === 1 ? 'home' : 'homes'}`,
    greeting: 'Dear account holder:',
    intro: (brand) => `The manufacturer Sentinela Electronics has issued a safety notice that affects motion detectors we installed in your home as an authorised ${brand} installer:`,
    lCamp: (c) => `Campaign: ${c} · Sentinela Electronics`,
    lDet: (lot) => `Detector: PIR-200, lot ${lot}`,
    lInst: (id, ser) => `Your installation: ${id} · serial no. ${ser}`,
    reason: 'Reason: the lithium battery of the detector may overheat. Fix: free replacement of the detector with a unit from another lot (about 35 minutes, at no cost to you).',
    ask: 'Please book an appointment by replying to this notice or to the SMS you will receive. Until it is replaced your alarm keeps working; if you notice heat, a smell or swelling in the detector, do not handle it and call our technical line immediately.',
    partnerLine: (brand) => `The replacement does not change your contract with ${brand} or your fee.`,
    drill: 'Reason for sending: product withdrawal drill (procedure PR-QLT-006). In a real withdrawal, the final instructions agreed by Operations and Maintenance go here.',
    sign: 'Kind regards,\nOperations · Guardián Ibérica Instalaciones\nPaterna hub (Valencia)',
    from: 'Operations, Guardián Ibérica Instalaciones',
    to: (label, n) => `Affected ${label} account holders (${n} homes)`,
    brandBody: (h, d, v) => `${n0(h)} homes with ${n0(d)} detectors from the lot installed · ${n0(v)} already have a maintenance visit booked and ${n0(h - v)} do not.`,
    secNote: 'Includes checking the installation of Marta Soler Pons (SA-2026-77412, Burjassot): she has case CLM-2026-0619 open for living-room PIR false alarms; we need to verify whether her detector is from the lot and coordinate the notice with Customer Service.',
    channelBrand: 'SMS (Twilio) + email + report to the partner portal',
    noticeLang: 'Notice in English',
    brandAction: 'Notice and free detector replacement',
    internal: 'Internal',
    almLabel: 'Warehouse · 960 detectors from the lot',
    channelAlm: 'Slack #almacen + stock block in SAP Business One',
    almMeta: ['Paterna 620 · Alicante 210 · Castellón 130', '36 loaded on vans'],
    almBody: 'Put the PIR-2607-A stock in quarantine in the three warehouses and unload from the vans the 36 detectors planned for today installations.',
    almAction: 'Quarantine the lot and unload the vans',
    mantLabel: 'Maintenance · replacement in 912 homes',
    channelMant: 'Samsara Flota + work orders in Salesforce',
    mantMeta: ['No visit: 772 homes', '9 urgent jobs and 38 panels without backup in the queue'],
    mantBody: 'The 912 visits add up to 532 h of technician time on the Valencia, Alicante and Castellón routes: use the 140 maintenance visits already booked, prioritise homes with two detectors and reinforce with installation technicians.',
    hours: (n) => `${n0(n)} h`,
    mantAction: 'Reorder routes and book the 772 visits',
    fabLabel: 'Sentinela Electronics · quality contact',
    chipFab: 'Inform',
    channelFab: 'Email to the quality contact + returns portal (RMA)',
    fabMeta: ['Target: locate and notify within 4 h', 'Campaign REC-2026-1019'],
    fabBody: 'Progress report: units located, homes notified and detectors in quarantine or returned. Return of the 960 in the warehouse when the manufacturer indicates.',
    fabAction: 'Progress report to the manufacturer',
    nd: {
      partnerK: 'Authorised partner',
      bolK: 'Manufacturer notice', bolSub: 'Sentinela Electronics · PIR-200 detector', bolMeta: 'Issued on 16/10/2026 · target: notify within 4 h', bolAlert: 'Overheating risk',
      modK: 'Affected lot', modSub: 'PIR-200 detector · lithium battery', modMeta: '2,400 units received in 07/2026 and 08/2026',
      entK: 'Receipt', entMeta: 'Paterna warehouse',
      insK: 'Installed in homes', insSub: (bs) => `${n0(bs.reduce((s, b) => s + b.homes, 0))} homes · ${bs.map((b) => `${b.label} ${n0(b.homes)}`).join(' · ')}`, insMeta: 'Partner portals and Salesforce CRM', insAlert: 'Notify within 4 h',
      almK: 'Warehouse', almSub: (s) => `Paterna ${n0(s.pat + s.van)} · Alicante ${n0(s.alc)} · Castellón ${n0(s.cas)}`, almMeta: 'SAP Business One', almAlert: 'Quarantine the lot',
      devK: 'Returned', devSub: 'Return (RMA) to Sentinela Electronics', devMeta: '08/09/2026',
      mpK: 'Visit booked', mpSub: 'Annual maintenance PR-MAN-004', mpMeta: 'From 22/10 to 30/10',
      msK: 'To be booked', msSub: (a) => `Verisure ${n0(a[0])} · Sector Alarm ${n0(a[1])} · Prosegur Alarmas ${n0(a[2])}`, msMeta: (h) => `912 visits = ${n0(h)} h of technician time`, msAlert: 'Route capacity short',
      mfK: 'Vans today', mfSub: (P) => `${P.n} scheduled installations · ${P.route}`, mfMeta: 'Samsara Flota', mfAlert: 'Remove from the vans'
    },
    loc: {
      van: 'Vans today', vanSub: (P) => `${P.n} installations · ${P.route} · Samsara Flota`, vanAct: 'Remove from the vans and swap for another lot',
      pat: 'Paterna warehouse', patSub: 'SAP Business One · available to install',
      alc: 'Alicante warehouse', cas: 'Castellón warehouse', stkSub: 'SAP Business One · available to install', stkAct: 'Block dispatch in SAP Business One',
      homes: (b) => `${b} homes`, homesSub: (portal) => portal, homeAct: 'Notice and free replacement visit',
      ret: 'Returned to the manufacturer', retSub: 'RMA-2026-0908 · 08/09/2026', retAct: 'None: return closed'
    },
    fl: {
      seg1: 'Detectors', unit1: 'detectors', col1: 'Detectors',
      title1: (c) => `Campaign ${c} → homes, warehouse and returned`,
      in1: 'Receipts of lot PIR-2607-A', in1Sub: 'PIR-200 detector received in Paterna in 3 deliveries', phase1: 'Returns before the campaign', loss1: 'Returned to the manufacturer (RMA)',
      outsTitle: 'Current destination',
      oBrandSub: (h, portal) => `${n0(h)} homes · ${portal}`,
      oPat: 'Paterna warehouse', oPatSub: 'SAP Business One · available to install',
      oVan: 'Vans today', oVanSub: (P) => `${P.n} installations today · ${P.route}`,
      oAlc: 'Alicante warehouse', oCas: 'Castellón warehouse', oStkSub: 'SAP Business One · available to install',
      seg2: 'Visits', col2: 'Technician minutes',
      title2: (c) => `Campaign ${c} → technician work`,
      in2: 'Replacement in the homes', in2Sub: (n, m) => `${n0(n)} homes × ${m} min · PIR-200 replacement`,
      outsTitle2: 'Work status',
      m1: 'Visit already booked', m1Sub: (n) => `${n0(n)} homes with PR-MAN-004 maintenance`,
      m2: (b) => `${b} without a visit`, m2Sub: (n) => `${n0(n)} homes to book`
    },
    st: { fab: 'Manufacturer', ent: 'Receipts', est: 'Current status', tal: 'Maintenance', cli: 'Partners' },
    headline: (c, t) => `Campaign ${c} · PIR-200 detector · lot PIR-2607-A · lithium battery · ${n0(t)} detectors`,
    previewSide: (t, n) => `${n0(t)} detectors · ${n0(n)} notices`,
    genSub: (t, n) => `1 notice · 1 lot · ${n0(t)} detectors · ${n0(n)} recipients`,
    step: [
      ['Locates the starting point', (c, lot) => `Campaign ${c} · lot ${lot} of the PIR-200 detector · Sentinela Electronics notice of 16/10/2026 · target: locate and notify within 4 h`],
      ['Backwards: manufacturer notice and lot', (c, lot, t) => `Notice ${c} · lot ${lot} (${n0(t)} units) · lithium battery with overheating risk · serials PIR200-2607A-0001 to PIR200-2607A-${String(t).padStart(4, '0')}`],
      ['Backwards: receipts at Guardián Ibérica', (t, r) => `${n0(t)} detectors received: ${n0(r[0])} on 09/07, ${n0(r[1])} on 21/07 and ${n0(r[2])} on 04/08/2026 · serials cross-checked against the affected range`],
      ['Forwards: installed, warehouse and returned', (i, h, a, s, r) => `${n0(i)} installed in ${n0(h)} homes · ${n0(a)} in the warehouse (Paterna ${n0(s.pat + s.van)}, Alicante ${n0(s.alc)}, Castellón ${n0(s.cas)}) · ${n0(r)} returned to the manufacturer`],
      ['Today routes and vans', (P) => `${P.det} detectors from the lot loaded for ${P.n} of the 61 installations today · 118 maintenance jobs and 9 urgent ones on the same fleet`],
      ['Scheduled maintenance visits', (v, u, h, n, m) => `${n0(v)} homes already have a PR-MAN-004 visit · ${n0(u)} to book · ${n0(n)} visits × ${m} min = ${n0(h)} h of technician time`],
      ['Verisure: homes and detectors from the lot', (h, d) => `${n0(h)} homes with ${n0(d)} detectors · contracts cross-checked with the partner portal`],
      ['Sector Alarm: homes and detectors from the lot', (h, d) => `${n0(h)} homes with ${n0(d)} detectors · includes SA-2026-77412 (case CLM-2026-0619 open): check whether her PIR is from the lot`],
      ['Prosegur Alarmas: homes and detectors from the lot', (h, d) => `${n0(h)} homes with ${n0(d)} detectors · contracts cross-checked with the partner portal`],
      ['Account holder contacts and open queries', (n) => `${n0(n)} homes with email and phone verified · 37 with an outdated phone number: notice by email and courtesy visit`],
      ['Status of each detector from SAP Business One', (t, r, a, i) => `${n0(t)} detectors: ${n0(r)} returned, ${n0(a)} in the warehouse and ${n0(i)} in homes`],
      ['Campaign balance: receipts versus destination', (t) => `Reconciled 100.0% · 0 unaccounted detectors · ${n0(t)} of ${n0(t)} located`],
      ['Opens the withdrawal record with one notice per brand', (n) => `Withdrawal in draft · ${n0(n)} replacement visits to book`],
      ['Prepares the notices without sending', (n, k) => `${n0(n)} notices pending approval (SMS and email) · proposed dispatch block of ${n0(k)} warehouse detectors`]
    ],
    mk: ['Starting point located', 'Backward trace complete', 'Routes and maintenance queried', 'Homes and brands identified', 'Contacts identified', 'Campaign balance closed', 'Record and notices prepared'],
    loc2: {
      label: 'Detectors located',
      sub: (i, h, a, r) => `${n0(i)} in ${n0(h)} homes · ${n0(a)} in the warehouse · ${n0(r)} returned`,
      short: (t, i, h, a, r) => `${n0(t)} of ${n0(t)} detectors located (${n0(i)} in ${n0(h)} homes, ${n0(a)} in the warehouse and ${n0(r)} returned)`
    },
    kpiNotifyLabel: 'Homes to notify',
    kpiNotifySub: (P) => `${P.n} installations today to hold · ${P.det} detectors on vans`,
    bal: {
      title: 'Detector balance', kpiLabel: 'Detector balance reconciled',
      sub: 'Campaign detectors from receipt to destination and technician work · SAP Business One, Salesforce CRM and partner portals',
      head: 'Campaign REC-2026-1019', headSide: (n) => `${n0(n)} homes · 1 lot`,
      labels: { in: 'Receipts', losses: 'Justified returns', out: 'Installed in homes', stock: 'In warehouse and vans' },
      detailTitle: 'Detail by flow',
      criterio: 'Criterion: the unaccounted difference is shown as is, not spread. Each detector is counted by its serial number in SAP Business One; each home, by its contract in the partner portal; each visit, by its work order in Salesforce.',
      reportText: 'Detectors and returns declared in SAP Business One; contracts and homes in the Verisure, Sector Alarm and Prosegur Alarmas portals; work orders and queries in Salesforce CRM; routes in Samsara Flota.'
    },
    prod: { title: 'Installations with campaign detectors', side: (g, d) => `${g} portfolios · ${n0(d)} detectors`, c1: 'Portfolio', c2: 'Brand and branch', c3: 'Installed between', c4: 'Detectors', c5: 'Homes', c6: 'Located' },
    un: {
      title: 'Homes and detectors', sub: (t, h) => `${n0(h)} homes with detectors from the lot · ${n0(t)} detectors in total · SAP Business One, Salesforce CRM and partner portals`,
      csv: 'Campaign homes (CSV)', csvName: 'homes', idLabel: 'Installation', plate: 'Serial no.', model: 'Detectors', where: 'Brand and contract', detail: 'Contract and town', cita: 'Visit', order: 'Order', state: 'Status', action: 'Action in a real withdrawal',
      byLoc: 'By location', refLabel: 'Campaign', nLabel: 'Detectors', qtyLabel: 'Technician minutes', listLabel: 'Affected homes'
    },
    cu: {
      title: 'Recipients to notify', sub: (n, d) => `${n0(n)} homes with ${n0(d)} detectors · 14 installations today to hold`,
      holdsTitle: 'Actions at the hub',
      h1: (P) => `Hold the ${P.n} installations of today with detectors from the lot`, h1Meta: (P) => [`${P.det} detectors`, P.route, 'Samsara Flota'],
      h1Body: (P) => `In a real withdrawal, the Installations Lead unloads from the vans the ${P.det} detectors of ${P.route} and swaps them for units from another lot before they leave.`,
      h2: (n) => `Block the dispatch of the ${n0(n)} warehouse detectors`, h2Meta: ['today', 'Lot PIR-2607-A', 'SAP Business One'],
      h2Body: 'They are still available to install: in a real withdrawal they are blocked in SAP Business One until the manufacturer states their destination. Listed by serial number in the "Affected homes" tab and in the CSV.',
      h3: 'Reinforce maintenance', h3Meta: (n, h) => [`${n0(n)} visits`, `${n0(h)} h`, 'Samsara Flota'],
      h3Body: 'The replacement visits compete with 118 maintenance jobs, 9 urgent ones and 38 panels without backup from alarm ALM-COM-0611: in a real withdrawal the routes are reinforced with installation technicians and homes with two detectors are prioritised.'
    },
    ap: {
      title: 'Drill withdrawal and notices',
      s1: 'Homes with campaign detectors', s1v: (n, d) => `${n0(n)} homes · ${n0(d)} detectors`,
      s2: 'Installations today to hold', s2v: (P) => `${P.route} · ${P.n} installations · ${P.det} detectors`,
      s3: 'Warehouse dispatch that would be blocked', s3v: (n) => `${n0(n)} detectors in the three warehouses`, s3c: 'No block in the drill',
      s4: 'Maintenance', s4v: (n) => `Book the ${n0(n)} pending replacement visits (work orders in Salesforce)`,
      effects: (n) => [
        `Twilio SMS and email: ${n0(n)} notices saved as drafts with the DRILL mark; nothing is sent`,
        `Salesforce CRM: withdrawal record and ${n0(n)} visit requests in draft, not booked`,
        'SAP Business One: no changes; in a drill no stock is blocked and no dispatch is held',
        'Record {code} approved with the times of each activity'
      ]
    },
    rp: {
      objeto: 'Product withdrawal drill starting from {label}. Backward traceability (manufacturer notice, lot and receipts) and forward traceability (homes by brand, warehouse, vans and maintenance) are checked, with the campaign detector balance.',
      noAction: 'The exercise does not block stock, hold dispatches or send notices.',
      results: (n, k) => [
        `${n0(n)} homes in the Valencian Community (Verisure 540, Sector Alarm 214 and Prosegur Alarmas 158) and 14 installations today that would be held.`,
        'The 912 replacement visits add up to 532 h of technician time and compete with 118 maintenance jobs and 9 urgent ones: the routes need reinforcing.',
        `The dispatch of ${n0(k)} warehouse detectors would be blocked.`
      ],
      bc1: 'Stage', bc2: 'Reference', bc3: 'Date', bc4: 'Detail',
      backRows: (t, r, ret) => [
        { etapa: 'Manufacturer', ref: 'REC-2026-1019', fecha: '16/10/2026', det: 'Sentinela Electronics notice · PIR-200 detector · overheating risk of the lithium battery' },
        { etapa: 'Lot', ref: 'PIR-2607-A', fecha: '07/2026', det: `Affected lot · ${n0(t)} detectors received at Guardián Ibérica` },
        { etapa: 'Receipt 1', ref: 'ENT-PIR-2607-1', fecha: '09/07/2026', det: `${n0(r[0])} detectors received at the Paterna warehouse` },
        { etapa: 'Receipt 2', ref: 'ENT-PIR-2607-2', fecha: '21/07/2026', det: `${n0(r[1])} detectors received` },
        { etapa: 'Receipt 3', ref: 'ENT-PIR-2607-3', fecha: '04/08/2026', det: `${n0(r[2])} detectors received` },
        { etapa: 'Returns', ref: 'RMA-2026-0908', fecha: '08/09/2026', det: `${n0(ret)} detectors returned to the manufacturer` },
        { etapa: 'Installations', ref: 'INS-2026', fecha: '20/07 to 15/10/2026', det: '1,386 detectors installed in 912 homes · Verisure, Sector Alarm and Prosegur Alarmas' },
        { etapa: 'Withdrawal', ref: 'REC-2026-1019', fecha: '19/10/2026', det: `${n0(t)} detectors located · target: locate and notify within 4 h` }
      ],
      fwdExtra: (P, s) => [
        { ped: 'VANS', cliente: `Vans today (${P.n} installations, ${P.route})`, date: '19/10/2026', n: s.van, fin: '—' },
        { ped: 'ALM-VLC', cliente: 'Paterna warehouse (not blocked)', date: '—', n: s.pat, fin: '—' },
        { ped: 'ALM-ALC', cliente: 'Alicante warehouse (not blocked)', date: '—', n: s.alc, fin: '—' },
        { ped: 'ALM-CAS', cliente: 'Castellón warehouse (not blocked)', date: '—', n: s.cas, fin: '—' }
      ],
      conclusion: 'Conclusion: the information needed for a withdrawal is obtained in full and the campaign balances detector by detector. Proposed improvements: reserve maintenance capacity when each campaign opens and link the lot serial numbers to the installation orders of the vans in Samsara Flota.',
      note: 'Drill: no detector has been blocked, no dispatch has been held and no notice has been sent. Synthetic demonstration data.'
    },
    audit: { back: 'notice REC-2026-1019 · lot PIR-2607-A · receipts 07/2026 and 08/2026', fwd: (t, n) => `${n0(t)} detectors · ${n0(n)} homes · 14 installations today` },
    say: (P, k, n) => [
      `What is actionable: ${P.route} (${P.n} installations today) would be held and the dispatch of ${n0(k)} warehouse detectors would be blocked.`,
      `The notices go to ${n0(n)} homes with their contract and serial number; account holders receive SMS and email. In a drill nothing is sent. The Operations Manager decides.`
    ],
    title: 'Product withdrawal drill', nav: 'Product withdrawals', section: 'Quality',
    desc: 'Traceability exercise for manufacturer withdrawal campaigns: backward and forward genealogy, from the notice to the detector and the home, detector balance and account holders to notify, starting from a campaign or a serial number.',
    place: 'Operations hub · Paterna (Valencia)',
    approver: 'Operations Manager',
    agents: { trace: 'Traceability', bal: 'Detector balance', rec: 'Withdrawal and notices' },
    targetText: 'Illustrative target: 4 h', todayEstimate: '2–5 h', timerRef: 'Demo target: 4 h', packLabel: 'Download the withdrawal pack',
    setup: { title: 'Starting point', sub: 'A manufacturer withdrawal campaign or the serial number of a detector' },
    m: {
      recall: 'Campaign', recallNoun: 'the campaign', recallField: 'Campaign code', recallWhere: 'SAP Business One · Salesforce CRM', recallLabel: (c) => `Campaign ${c}`, recallOption: 'PIR-200 detector · lot PIR-2607-A · lithium battery · 912 homes',
      serLabel: 'Serial no.', vinNoun: 'the serial number', vinField: 'Detector serial number', serWhere: 'SAP Business One · partner portals',
      vinOption: (h) => `Detector installed in ${h ? h.brand.label : 'a home'} · no replacement visit booked`,
      vinHeadline: (v, c) => `Serial ${v} · installed in a home (campaign ${c}) → the whole campaign is traced`,
      vinResult: (v, h, c) => `Detector ${v} · PIR-200 lot PIR-2607-A · installation ${h ? h.id : ''} (${h ? h.brand.label : ''}) with no replacement visit → the whole campaign ${c} is traced`
    },
    reference: {
      title: 'Audit reference',
      sub: 'Objective of the exercise; Operations confirms the requirements of the manufacturer and the partners',
      items: [
        ['Regulation (EU) 2023/988', 'General product safety: the manufacturer announces the campaign and the distributor helps locate and notify the affected users.'],
        ['Partner contracts', 'Follow-up of the campaign in the Verisure Partner Portal, the Sector Alarm Partner Hub and the Prosegur Partner Portal until each file is closed. Illustrative objective of the exercise: locate and notify all homes within 4 hours.'],
        ['PR-QLT-006', 'Internal product withdrawal procedure: Operations decides the scope and approves the notices.']
      ],
      note: 'A drill does not block stock, hold dispatches or send notices: it measures whether the information is obtained in full, balances and on time.'
    },
    legend: { planned: 'Dispatch today: hold', click: 'Each card summarises one phase of the campaign' },
    noticeCfg: { title: 'Withdrawal drill' },
    approvalCfg: { policy: 'PR-QLT-006 · blocking stock or holding dispatches requires the approval of the Operations Manager', approveLabel: 'Approve and close drill', rejectPlaceholder: 'For example: the contact of an account holder with an outdated phone number is still to be confirmed' },
    clock: { title: 'Stopwatch versus target', sub: 'Simulation times; they are not system performance measurements' },
    reportCfg: { subtitle: 'Record of the traceability and withdrawal exercise · Regulation (EU) 2023/988 · PR-QLT-006' },
    compare: {
      rows: [
        { k: 'People involved', today: '3–4: Operations, Warehouse, Technical Support and Customer Service', agentic: '1: {approver} reviews and approves' },
        { k: 'Systems queried', today: '6–7 opened by hand: Salesforce, SAP, three partner portals, Samsara and spreadsheets', agentic: '7 connectors queried by the agents: SAP Business One, Salesforce CRM, the three partner portals, Samsara Flota and Twilio SMS' },
        { k: 'Steps', today: '15–20 queries, serial cross-checks against contracts and visits and manual calculations', agentic: '{steps} automatic steps and 1 approval' },
        { k: 'Detector balance', today: 'Spreadsheet with receipts, installations, warehouse and returns', agentic: 'Calculated by serial number and contract: {reconciled} reconciled' }
      ]
    },
    presenter: (c, v) => ({
      idle: [
        'Withdrawal drill with traceability and detector balance; in the pilot Operations confirms the protocol and we measure the real time.',
        `The starting point is chosen: campaign ${c} (lithium battery of the PIR-200, lot PIR-2607-A) or the serial number of an affected detector.`,
        'Agentic Platform walks through SAP Business One, Salesforce and the three partner portals backwards to the notice and the receipts, and forwards to the homes, the warehouse and the vans, and balances the campaign detector by detector.'
      ],
      nextIdle: `Press "Start drill" with campaign ${c} (or choose "Serial no. ${v}").`,
      nextRun: 'Press "View notice" for a brand and then "Approve and close drill".',
      nextDone: '"Download the withdrawal pack": CSV of homes and printable record. Then "Customer questionnaire" (right arrow).'
    })
  };


  const CAMP = 'REC-2026-1019';
  const LOT = 'PIR-2607-A';
  const SER_PFX = 'PIR200-2607A-';
  const PLANNED = { n: 14, det: 36, route: 'RUTA-INS-1019' };

  /* Marcas (portales de partner): hogares, detectores instalados y visitas de mantenimiento ya programadas */
  const BRANDS = [
    { id: 'ver', label: 'Verisure', short: 'VS', homes: 540, dets: 820, visits: 82, base: 30000, step: 3, portal: 'Verisure Partner Portal' },
    { id: 'sec', label: 'Sector Alarm', short: 'SA', homes: 214, dets: 325, visits: 33, base: 60000, step: 7, portal: 'Sector Alarm Partner Hub' },
    { id: 'pro', label: 'Prosegur Alarmas', short: 'PA', homes: 158, dets: 241, visits: 25, base: 40000, step: 5, portal: 'Prosegur Partner Portal' }
  ];
  const DELS = [
    { id: 'VLC', cities: ['Paterna', 'Valencia', 'Burjassot', 'Torrent', 'Mislata', 'Sagunto'] },
    { id: 'ALC', cities: ['Alicante', 'Elche', 'Benidorm', 'Elda'] },
    { id: 'CAS', cities: ['Castellón', 'Vila-real', 'Benicàssim'] }
  ];
  const RECS = [{ id: 'R1', date: '2026-07-09', n: 1200 }, { id: 'R2', date: '2026-07-21', n: 800 }, { id: 'R3', date: '2026-08-04', n: 400 }];
  const STK = { pat: 584, van: PLANNED.det, alc: 210, cas: 130 };
  const N_RET = 54;
  const MIN_JOB = 35;

  const fmtD = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '');
  const dm = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}` : '');
  const plural = (n, a, b) => `${n0(n)} ${n === 1 ? a : b}`;
  const det = (n) => plural(n, S.detOne, S.detMany);
  const home = (n) => plural(n, S.homeOne, S.homeMany);
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const pad = (n, w) => String(n).padStart(w, '0');
  const uniq = (a) => a.filter((x, i) => a.indexOf(x) === i);

  /* ---------------------------------------------------------------- Hogares (instalaciones) */

  const VISIT_DAYS = ['22', '23', '26', '27', '28', '29', '30'];
  const HOMES = [];
  let serial = 0;
  let seq = 0;
  BRANDS.forEach((b, bi) => {
    const extra = b.dets - b.homes;
    for (let i = 0; i < b.homes; i += 1) {
      seq += 1;
      const del = DELS[i % 10 < 6 ? 0 : i % 10 < 9 ? 1 : 2];
      const dets = 1 + (Math.floor(((i + 1) * extra) / b.homes) > Math.floor((i * extra) / b.homes) ? 1 : 0);
      const visit = Math.floor(((i + 1) * b.visits) / b.homes) > Math.floor((i * b.visits) / b.homes);
      const date = new Date(Date.UTC(2026, 6, 20 + ((i * 7 + bi * 11) % 88))).toISOString().slice(0, 10);
      const first = serial + 1;
      serial += dets;
      HOMES.push({
        brand: b, del, city: del.cities[i % del.cities.length], dets, visit, date, first,
        id: `INS-2026-${del.id}-${pad(10000 + seq, 5)}`,
        contract: `${b.short}-2026-${pad(b.base + i * b.step, 5)}`,
        ot: visit ? `OT-2026-${pad(5000 + seq, 5)}` : '',
        vdate: visit ? `${VISIT_DAYS[seq % VISIT_DAYS.length]}/10/2026` : ''
      });
    }
  });
  const serialOf = (h) => `${SER_PFX}${pad(h.first, 4)}`;
  const N_HOMES = HOMES.length;
  const N_INST = sum(HOMES, (h) => h.dets);
  const N_STK = STK.pat + STK.van + STK.alc + STK.cas;
  const N_STK_FREE = N_STK - STK.van;
  const TOTAL = N_INST + N_STK + N_RET;
  const N_VISIT = HOMES.filter((h) => h.visit).length;
  const N_UNSCHED = N_HOMES - N_VISIT;
  const minOf = (n) => n * MIN_JOB;
  const hoursOf = (n) => Math.round(minOf(n) / 60);
  const byBrand = (b) => HOMES.filter((h) => h.brand === b);

  const CHIPS = { visit: { status: 'pending', label: S.chip.visit }, novisit: { status: 'critical', label: S.chip.novisit } };
  const homeRows = HOMES.map((h) => ({
    vin: h.id,
    plate: h.dets === 1 ? serialOf(h) : `${serialOf(h)} +1`,
    model: S.modelOf(h.dets),
    modelSub: S.lotLine(LOT),
    where: h.brand.label,
    whereSub: `${h.contract} · ${h.city}`,
    cita: h.visit ? h.vdate : '—',
    citaSub: h.visit ? h.ot : S.noVisit,
    estado: h.visit ? CHIPS.visit : CHIPS.novisit,
    accion: h.visit ? S.actions.visit : S.actions.novisit
  }));

  /* ---------------------------------------------------------------- Avisos */

  function noticeOf(b) {
    const hs = byBrand(b);
    const h0 = hs[0];
    const subj = S.subject(b.homes);
    const parts = [
      S.greeting,
      S.intro(b.label),
      [S.lCamp(CAMP), S.lDet(LOT), S.lInst(h0.id, serialOf(h0))].join('\n'),
      S.reason,
      S.ask,
      S.partnerLine(b.label)
    ];
    parts.push(S.drill);
    parts.push(S.sign);
    return { lang: S.lang, headers: { From: S.from, To: S.to(b.label, b.homes), Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [CAMP, h0.id] };
  }

  const items = BRANDS.map((b) => {
    const body = [S.brandBody(b.homes, b.dets, b.visits)];
    if (b.id === 'sec') body.push(S.secNote);
    return { id: b.id, label: b.label, icon: 'building', notify: true, channel: S.channelBrand, meta: [S.region, S.nd.partnerK, S.noticeLang], body: body.join(' '), notice: noticeOf(b), refs: `${b.short}-2026 · ${home(b.homes)}`, qtyText: det(b.dets), action: S.brandAction };
  });
  items.push({ id: 'almacen', label: S.almLabel, icon: 'warehouse', notify: false, chip: S.internal, channel: S.channelAlm, meta: S.almMeta, body: S.almBody, refs: LOT, qtyText: det(N_STK), action: S.almAction });
  items.push({ id: 'mant', label: S.mantLabel, icon: 'wrench', notify: false, chip: S.internal, channel: S.channelMant, meta: S.mantMeta, body: S.mantBody, refs: `${home(N_UNSCHED)}`, qtyText: S.hours(hoursOf(N_HOMES)), action: S.mantAction });
  items.push({ id: 'fab', label: S.fabLabel, icon: 'factory', notify: false, chip: S.chipFab, channel: S.channelFab, meta: S.fabMeta, body: S.fabBody, refs: CAMP, qtyText: det(TOTAL), action: S.fabAction });

  /* ---------------------------------------------------------------- Genealogía */

  const recNode = (r) => ({ id: r.id, stage: 'ent', kicker: S.nd.entK, title: fmtD(r.date), sub: det(r.n), meta: S.nd.entMeta, tone: 'shipped', reveal: 2 });
  const nodes = [
    { id: 'BOL', stage: 'fab', kicker: S.nd.bolK, title: CAMP, mono: true, sub: S.nd.bolSub, meta: S.nd.bolMeta, alert: S.nd.bolAlert, alertTone: true, reveal: 1 },
    { id: 'MOD', stage: 'fab', kicker: S.nd.modK, title: LOT, mono: true, sub: S.nd.modSub, meta: S.nd.modMeta, reveal: 1 }
  ].concat(RECS.map(recNode)).concat([
    { id: 'INS', stage: 'est', kicker: S.nd.insK, title: det(N_INST), sub: S.nd.insSub(BRANDS), meta: S.nd.insMeta, alert: S.nd.insAlert, alertTone: true, tone: 'customer', reveal: 3 },
    { id: 'ALM', stage: 'est', kicker: S.nd.almK, title: det(N_STK), sub: S.nd.almSub(STK), meta: S.nd.almMeta, alert: S.nd.almAlert, alertTone: true, tone: 'stock', reveal: 3 },
    { id: 'DEV', stage: 'est', kicker: S.nd.devK, title: det(N_RET), sub: S.nd.devSub, meta: S.nd.devMeta, tone: 'shipped', reveal: 3 },
    { id: 'MP', stage: 'tal', kicker: S.nd.mpK, title: home(N_VISIT), sub: S.nd.mpSub, meta: S.nd.mpMeta, tone: 'shipped', reveal: 4 },
    { id: 'MS', stage: 'tal', kicker: S.nd.msK, title: home(N_UNSCHED), sub: S.nd.msSub(BRANDS.map((b) => b.homes - b.visits)), meta: S.nd.msMeta(hoursOf(N_HOMES)), alert: S.nd.msAlert, alertTone: true, tone: 'planned', reveal: 4 },
    { id: 'MF', stage: 'tal', kicker: S.nd.mfK, title: det(PLANNED.det), sub: S.nd.mfSub(PLANNED), meta: S.nd.mfMeta, alert: S.nd.mfAlert, alertTone: true, tone: 'planned', reveal: 4 }
  ]);
  BRANDS.forEach((b) => nodes.push({ id: `C:${b.id}`, stage: 'cli', kicker: S.nd.partnerK, title: b.label, sub: `${home(b.homes)} · ${det(b.dets)}`, tone: 'customer', reveal: 5 }));
  const edges = [['BOL', 'MOD'], ['MOD', 'R1'], ['MOD', 'R2'], ['MOD', 'R3'], ['R1', 'INS'], ['R2', 'INS'], ['R3', 'INS'], ['R1', 'ALM'], ['R2', 'ALM'], ['R3', 'ALM'], ['R1', 'DEV'], ['INS', 'MP'], ['INS', 'MS'], ['ALM', 'MF']];
  BRANDS.forEach((b) => edges.push(['INS', `C:${b.id}`]));

  /* ---------------------------------------------------------------- Tablas */

  const groups = [];
  BRANDS.forEach((b) => DELS.forEach((d) => {
    const hs = HOMES.filter((h) => h.brand === b && h.del === d);
    const dates = hs.map((h) => h.date).sort();
    groups.push({ ped: `${b.short}-${d.id}`, cliente: `${b.label} · ${S.dels[d.id]}`, sub: `${home(hs.length)} · ${S.list(uniq(hs.map((h) => h.city)).slice(0, 3))}`, date: `${dm(dates[0])} – ${dm(dates[dates.length - 1])}`, n: sum(hs, (h) => h.dets), fin: n0(hs.length), located: S.pct100 });
  }));
  const saleRows = groups;

  const locRows = [
    { ref: CAMP, where: S.loc.van, whereSub: S.loc.vanSub(PLANNED), n: STK.van, qty: null, action: S.loc.vanAct, tone: 'crit' },
    { ref: CAMP, where: S.loc.pat, whereSub: S.loc.patSub, n: STK.pat, qty: null, action: S.loc.stkAct, tone: 'warn' },
    { ref: CAMP, where: S.loc.alc, whereSub: S.loc.stkSub, n: STK.alc, qty: null, action: S.loc.stkAct, tone: 'warn' },
    { ref: CAMP, where: S.loc.cas, whereSub: S.loc.stkSub, n: STK.cas, qty: null, action: S.loc.stkAct, tone: 'warn' }
  ].concat(BRANDS.map((b) => ({ ref: CAMP, where: S.loc.homes(b.label), whereSub: `${home(b.homes)} · ${S.loc.homesSub(b.portal)}`, n: b.dets, qty: minOf(b.homes), action: S.loc.homeAct, tone: 'warn' })))
    .concat([{ ref: CAMP, where: S.loc.ret, whereSub: S.loc.retSub, n: N_RET, qty: null, action: S.loc.retAct, tone: '' }]);

  const flowDet = {
    key: 'veh', seg: S.fl.seg1, main: true, unit: S.fl.unit1, colLabel: S.fl.col1,
    title: S.fl.title1(CAMP),
    inLabel: S.fl.in1, inSub: S.fl.in1Sub, inStage: 'SAP B1', inQty: TOTAL,
    phases: [{ title: S.fl.phase1, date: '2026-09-08', stages: [['SAP B1', S.fl.loss1, N_RET]] }],
    outsTitle: S.fl.outsTitle,
    outs: BRANDS.map((b) => ({ label: b.label, sub: S.fl.oBrandSub(b.homes, b.portal), stage: 'Portal', qty: b.dets }))
      .concat([
        { label: S.fl.oPat, sub: S.fl.oPatSub, stage: 'SAP B1', qty: STK.pat, kind: 'stock' },
        { label: S.fl.oVan, sub: S.fl.oVanSub(PLANNED), stage: 'Samsara', qty: STK.van, kind: 'stock' },
        { label: S.fl.oAlc, sub: S.fl.oStkSub, stage: 'SAP B1', qty: STK.alc, kind: 'stock' },
        { label: S.fl.oCas, sub: S.fl.oStkSub, stage: 'SAP B1', qty: STK.cas, kind: 'stock' }
      ])
  };
  const flowMin = {
    key: 'taller', seg: S.fl.seg2, unit: 'min', colLabel: S.fl.col2,
    title: S.fl.title2(CAMP),
    inLabel: S.fl.in2, inSub: S.fl.in2Sub(N_HOMES, MIN_JOB), inStage: 'Salesforce', inQty: minOf(N_HOMES),
    phases: [],
    outsTitle: S.fl.outsTitle2,
    outs: [{ label: S.fl.m1, sub: S.fl.m1Sub(N_VISIT), stage: 'Salesforce', qty: minOf(N_VISIT) }]
      .concat(BRANDS.map((b) => ({ label: S.fl.m2(b.label), sub: S.fl.m2Sub(b.homes - b.visits), stage: 'Salesforce', qty: minOf(b.homes - b.visits), kind: 'stock' })))
  };

  const SYSTEMS = ['SAP Business One', 'Salesforce CRM', 'Verisure Partner Portal', 'Sector Alarm Partner Hub', 'Prosegur Partner Portal', 'Samsara Flota', 'Twilio SMS'];
  const [VER, SEC, PRO] = BRANDS;

  const scope = {
    headline: S.headline(CAMP, TOTAL),
    previewSide: S.previewSide(TOTAL, N_HOMES),
    startNode: 'BOL',
    stages: [
      { id: 'fab', label: S.st.fab, icon: 'factory' },
      { id: 'ent', label: S.st.ent, icon: 'truck' },
      { id: 'est', label: S.st.est, icon: 'warehouse' },
      { id: 'tal', label: S.st.tal, icon: 'wrench' },
      { id: 'cli', label: S.st.cli, icon: 'building', count: N_HOMES }
    ],
    nodes,
    edges,
    systems: SYSTEMS,
    genSub: S.genSub(TOTAL, N_HOMES),
    steps: [
      { agent: 'trace', system: 'SAP Business One', action: S.step[0][0], result: S.step[0][1](CAMP, LOT), ms: 190, reveal: 0, mark: S.mk[0] },
      { agent: 'trace', system: 'SAP Business One', action: S.step[1][0], result: S.step[1][1](CAMP, LOT, TOTAL), ms: 430, reveal: 1 },
      { agent: 'trace', system: 'SAP Business One', action: S.step[2][0], result: S.step[2][1](TOTAL, RECS.map((r) => r.n)), ms: 520, reveal: 2, mark: S.mk[1] },
      { agent: 'trace', system: 'SAP Business One', action: S.step[3][0], result: S.step[3][1](N_INST, N_HOMES, N_STK, STK, N_RET), ms: 560, reveal: 3 },
      { agent: 'trace', system: 'Samsara Flota', action: S.step[4][0], result: S.step[4][1](PLANNED), ms: 470, tone: 'warn', reveal: 4, mark: S.mk[2] },
      { agent: 'trace', system: 'Salesforce CRM', action: S.step[5][0], result: S.step[5][1](N_VISIT, N_UNSCHED, hoursOf(N_HOMES), N_HOMES, MIN_JOB), ms: 380, tone: 'warn', reveal: 4 },
      { agent: 'trace', system: VER.portal, action: S.step[6][0], result: S.step[6][1](VER.homes, VER.dets), ms: 590, reveal: 5, mark: S.mk[3] },
      { agent: 'trace', system: SEC.portal, action: S.step[7][0], result: S.step[7][1](SEC.homes, SEC.dets), ms: 540, tone: 'warn', reveal: 5 },
      { agent: 'trace', system: PRO.portal, action: S.step[8][0], result: S.step[8][1](PRO.homes, PRO.dets), ms: 510, reveal: 5 },
      { agent: 'trace', system: 'Salesforce CRM', action: S.step[9][0], result: S.step[9][1](N_HOMES), ms: 480, tone: 'warn', reveal: 5, mark: S.mk[4] },
      { agent: 'bal', system: 'SAP Business One', action: S.step[10][0], result: S.step[10][1](TOTAL, N_RET, N_STK, N_INST), ms: 420 },
      { agent: 'bal', system: 'Agentic Platform', action: S.step[11][0], result: S.step[11][1](TOTAL), ms: 95, tone: 'ok', mark: S.mk[5] },
      { agent: 'rec', system: 'SAP Business One', action: S.step[12][0], result: S.step[12][1](N_HOMES), ms: 360 },
      { agent: 'rec', system: 'Twilio SMS', action: S.step[13][0], result: S.step[13][1](N_HOMES, N_STK_FREE), ms: 720, mark: S.mk[6] }
    ],
    located: { label: S.loc2.label, value: `${n0(TOTAL)} / ${n0(TOTAL)}`, sub: S.loc2.sub(N_INST, N_HOMES, N_STK, N_RET), icon: 'truck', short: S.loc2.short(TOTAL, N_INST, N_HOMES, N_STK, N_RET) },
    kpiNotify: { label: S.kpiNotifyLabel, value: N_HOMES, sub: S.kpiNotifySub(PLANNED) },
    balance: {
      title: S.bal.title,
      kpiLabel: S.bal.kpiLabel,
      sub: S.bal.sub,
      head: S.bal.head,
      headSide: S.bal.headSide(N_HOMES),
      labels: S.bal.labels,
      detailTitle: S.bal.detailTitle,
      criterio: S.bal.criterio,
      reportText: S.bal.reportText,
      flows: [flowDet, flowMin],
      product: {
        title: S.prod.title,
        side: S.prod.side(groups.length, N_INST),
        cols: [
          { label: S.prod.c1, key: 'ped', mono: true },
          { label: S.prod.c2, key: 'cliente', sub: 'sub' },
          { label: S.prod.c3, key: 'date' },
          { label: S.prod.c4, key: 'n', num: true },
          { label: S.prod.c5, key: 'fin', num: true },
          { label: S.prod.c6, key: 'located', num: true, ok: true }
        ],
        rows: saleRows
      }
    },
    units: {
      title: S.un.title,
      sub: S.un.sub(TOTAL, N_HOMES),
      icon: 'truck',
      csvLabel: S.un.csv,
      csvName: S.un.csvName,
      csvCols: [
        { label: S.un.idLabel, key: 'vin' }, { label: S.un.plate, key: 'plate' }, { label: S.un.model, key: 'model' }, { label: S.un.where, key: 'where' }, { label: S.un.detail, key: 'whereSub' },
        { label: S.un.cita, key: 'cita' }, { label: S.un.order, key: 'citaSub' }, { label: S.un.state, key: 'estado' }, { label: S.un.action, key: 'accion' }
      ],
      byLoc: { label: S.un.byLoc, refLabel: S.un.refLabel, whereLabel: S.un.where, nLabel: S.un.nLabel, qtyLabel: S.un.qtyLabel, actionLabel: S.un.action, rows: locRows },
      list: {
        label: S.un.listLabel,
        cols: [
          { label: S.un.idLabel, key: 'vin', mono: true, sub: 'plate' },
          { label: S.un.model, key: 'model', sub: 'modelSub' },
          { label: S.un.where, key: 'where', sub: 'whereSub' },
          { label: S.un.cita, key: 'cita', mono: true, sub: 'citaSub' },
          { label: S.un.state, key: 'estado', chip: true },
          { label: S.un.action, key: 'accion' }
        ],
        rows: homeRows
      }
    },
    customers: {
      title: S.cu.title,
      sub: S.cu.sub(N_HOMES, N_INST),
      items,
      holdsTitle: S.cu.holdsTitle,
      holds: [
        { icon: 'truck', tone: 'crit', title: S.cu.h1(PLANNED), meta: S.cu.h1Meta(PLANNED), body: S.cu.h1Body(PLANNED) },
        { icon: 'lock', tone: 'warn', title: S.cu.h2(N_STK_FREE), meta: S.cu.h2Meta, body: S.cu.h2Body },
        { icon: 'wrench', tone: 'warn', title: S.cu.h3, meta: S.cu.h3Meta(N_HOMES, hoursOf(N_HOMES)), body: S.cu.h3Body }
      ]
    },
    approval: {
      titlePrefix: S.ap.title,
      scope: [
        { label: S.ap.s1, value: S.ap.s1v(N_HOMES, N_INST), status: 'pending', chip: String(N_HOMES) },
        { label: S.ap.s2, value: S.ap.s2v(PLANNED) },
        { label: S.ap.s3, value: S.ap.s3v(N_STK_FREE), status: 'evaluate', chip: S.ap.s3c },
        { label: S.ap.s4, value: S.ap.s4v(N_UNSCHED) }
      ],
      effects: S.ap.effects(N_HOMES)
    },
    report: {
      objeto: S.rp.objeto,
      noAction: S.rp.noAction,
      results: S.rp.results(N_HOMES, N_STK_FREE),
      back: {
        cols: [{ label: S.rp.bc1, key: 'etapa' }, { label: S.rp.bc2, key: 'ref', mono: true }, { label: S.rp.bc3, key: 'fecha' }, { label: S.rp.bc4, key: 'det' }],
        rows: S.rp.backRows(TOTAL, RECS.map((r) => r.n), N_RET)
      },
      fwd: {
        cols: [{ label: S.prod.c1, key: 'ped', mono: true }, { label: S.prod.c2, key: 'cliente' }, { label: S.prod.c3, key: 'date' }, { label: S.prod.c4, key: 'n' }, { label: S.prod.c5, key: 'fin' }],
        rows: saleRows.concat(S.rp.fwdExtra(PLANNED, STK))
      },
      conclusion: S.rp.conclusion,
      note: S.rp.note
    },
    audit: { back: S.audit.back, fwd: S.audit.fwd(TOTAL, N_HOMES) },
    say: S.say(PLANNED, N_STK_FREE, N_HOMES)
  };

  const FIRST_NO = HOMES.find((h) => !h.visit);
  const sample = FIRST_NO ? serialOf(FIRST_NO) : `${SER_PFX}0040`;

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
      recall: { label: S.m.recall, noun: S.m.recallNoun, field: S.m.recallField, icon: 'layers', format: CAMP, where: S.m.recallWhere },
      vin: { label: S.m.serLabel, noun: S.m.vinNoun, field: S.m.vinField, icon: 'barcode', format: `${SER_PFX}0040`, where: S.m.serWhere }
    },
    entries: [
      { mode: 'recall', code: CAMP, scope: 'abs', label: S.m.recallLabel(CAMP), option: S.m.recallOption },
      { mode: 'vin', code: sample, scope: 'abs', label: `${S.m.serLabel} ${sample}`, option: S.m.vinOption(FIRST_NO), headline: S.m.vinHeadline(sample, CAMP), startNode: 'INS', startResult: S.m.vinResult(sample, FIRST_NO, CAMP) }
    ],
    examples: [{ mode: 'recall', code: CAMP, label: S.m.recallLabel(CAMP) }, { mode: 'vin', code: sample, label: `${S.m.serLabel} ${sample}` }],
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

  agenticPackEn('alarmas', { retirada });
})();
