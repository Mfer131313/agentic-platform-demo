/* Empresa de Congelados · reclamación UKC-44718 (piedra en guisante de marca blanca, vía EC Foods UK Ltd). Versión en inglés.
 * Escenario de la demo de referencia con datos sintéticos (MFM). */
agenticPackEn('congelados', {
  reclamacion: {
    code: 'UKC-44718',
    nav: 'Complaint UKC-44718',
    title: 'Complaint UKC-44718',
    agent: 'Customer complaints',
    analyze_label: 'Analyse complaint',
    nc: 'NC-2026-0419',
    form: { code: 'REG-CAL-020-02', rev: '3' },
    received: { date: '2026-09-26', time: '10:14' },
    due: '2026-10-02',
    holidays: [],
    customer_line: 'EC Foods UK Ltd (EC subsidiary, United Kingdom) · UK retailer (private label)',
    due_line: 'Report due by 02/10/2026',
    cust_name: 'Quality Assurance, EC Foods UK Ltd',
    cust_addr: 'qa.team@ec-foods-uk.example',
    own_name: 'Quality, Frozen Foods Company',
    own_addr: 'calidad@ec-demo.example',
    mail_domain: 'ec-demo.example',
    mail_sub: 'qa.team@ec-foods-uk.example · mailbox calidad@ec-demo.example · English',
    mail_title: 'Customer’s email',
    mail_tab_label: 'Email (English)',
    attachments: ['UKC-44718_photo_1.jpg', 'UKC-44718_photo_2.jpg'],
    email_text: [
      'From: Quality Assurance, EC Foods UK Ltd <qa.team@ec-foods-uk.example>',
      'To: Quality, Frozen Foods Company <calidad@ec-demo.example>',
      'Date: Sat, 26 Sep 2026 09:14 (UK time)',
      'Subject: Customer complaint - foreign body (stone) - Garden Peas 1kg - Lot L26-231-FUS-GUI-01 - Ref UKC-44718',
      '',
      'Dear Quality Team,',
      '',
      'We have received a consumer complaint through our UK retail customer (own-label frozen range) about the product below, and we need your support to investigate it as a priority.',
      '',
      'Product: Garden Peas 1kg (retailer own label)',
      'Lot code: L26-231-FUS-GUI-01',
      'Best before: 08/2028',
      'Consumer reference: UKC-44718',
      'Complaint received by the retailer: 24/09/2026',
      '',
      'The consumer reports finding a small, hard foreign body, which appears to be a stone of approximately 8 mm, while serving the product. No injury has been reported. The consumer has kept the item and the retailer has shared two photographs (attached). The physical sample is on its way to our UK office and we will forward it to you as soon as we receive it.',
      '',
      'As this is a physical contamination complaint on a retailer own-label product, our customer requests a full investigation report within 5 working days, including:',
      '- traceability of the lot (raw material, harvest, intake and processing line);',
      '- the stone-removal and foreign-body controls on the line (destoner, optical sorting) and their records for the production date;',
      '- root cause, corrective and preventive actions;',
      '- confirmation of whether any other stock from the same lot is affected.',
      '',
      'Please confirm receipt and let us know your investigation reference.',
      '',
      'Kind regards,',
      '',
      'Quality Assurance Team',
      'EC Foods UK Ltd'
    ].join('\n'),
    mail_extra: {
      label: 'Spanish translation',
      note: 'Control translation for the plant’s Quality team, who work in Spanish; the English original is the one that counts.',
      headers: { From: 'Agentic Platform · control translation of the email from qa.team@ec-foods-uk.example', Date: 'Sat, 26 Sep 2026 10:14', Subject: 'Reclamación de cliente · cuerpo extraño (piedra) · Garden Peas 1kg · lote L26-231-FUS-GUI-01 · ref. UKC-44718' },
      text: [
        'Estimado equipo de Calidad:',
        '',
        'Hemos recibido una reclamación de un consumidor a través de nuestro cliente minorista del Reino Unido (gama de congelados de marca propia) sobre el producto indicado abajo, y necesitamos vuestro apoyo para investigarla con prioridad.',
        '',
        'Producto: Garden Peas 1kg (marca propia del minorista)',
        'Código de lote: L26-231-FUS-GUI-01',
        'Consumo preferente: 08/2028',
        'Referencia del consumidor: UKC-44718',
        'Reclamación recibida por el minorista: 24/09/2026',
        '',
        'El consumidor indica que, al servir el producto, encontró un cuerpo extraño pequeño y duro que parece una piedra de unos 8 mm. No se han comunicado lesiones. El consumidor conserva el objeto y el minorista ha compartido dos fotografías (adjuntas). La muestra física está de camino a nuestra oficina del Reino Unido y os la enviaremos en cuanto la recibamos.',
        '',
        'Al tratarse de una reclamación por contaminación física en un producto de marca propia del minorista, nuestro cliente pide un informe de investigación completo en un plazo de 5 días hábiles, que incluya:',
        '- la trazabilidad del lote (materia prima, cosecha, recepción y línea de proceso);',
        '- los controles de eliminación de piedras y de cuerpos extraños de la línea (despedregadora, selección óptica) y sus registros de la fecha de producción;',
        '- la causa raíz y las acciones correctivas y preventivas;',
        '- la confirmación de si hay otro stock del mismo lote afectado.',
        '',
        'Os pedimos que confirméis la recepción y nos indiquéis vuestra referencia de investigación.',
        '',
        'Un saludo,',
        '',
        'Equipo de Quality Assurance',
        'EC Foods UK Ltd'
      ].join('\n'),
      highlights: [
        { text: 'una piedra de unos 8 mm', label: 'Defect', tone: 'crit' },
        { text: 'No se han comunicado lesiones.', label: 'No injury', tone: 'ok' },
        { text: 'en un plazo de 5 días hábiles', label: 'Deadline', tone: 'warn' }
      ]
    },
    highlights: [
      { text: 'Garden Peas 1kg', label: 'Product', tone: 'brand' },
      { text: 'L26-231-FUS-GUI-01', label: 'Lot', tone: 'brand' },
      { text: '08/2028', label: 'Best before', tone: 'brand' },
      { text: 'UKC-44718', label: 'Ref.' },
      { text: 'stone of approximately 8 mm', label: 'Defect', tone: 'crit' },
      { text: 'No injury has been reported', label: 'No injury', tone: 'ok' },
      { text: 'two photographs (attached)', label: 'Evidence' },
      { text: 'The physical sample is on its way', label: 'Sample' },
      { text: 'within 5 working days', label: 'Deadline' }
    ],
    run: {
      title: '“Customer complaint” workflow',
      sub: 'Triggered when a complaint reaches the Quality mailbox · PNT-CAL-020',
      graph_title: 'Customer complaint workflow',
      idle_footer: 'Reads the email, extracts and validates the data, traces the lot and prepares the 8D and the reply. Nothing goes out without Quality’s approval.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Customer email', sub: 'Quality mailbox', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extraction and validation', systems: ['Modelo de lenguaje', 'SAP'], icon: 'search' },
        { id: 'traza', label: 'Lot trace', systems: ['SAP', 'MES Mapex', 'Easy WMS', 'GMAO'], icon: 'git-branch' },
        { id: 'historico', label: 'History, 8D and reply', systems: ['Elara', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Quality approval', sub: 'Shift Quality Lead' },
        { id: 'salida', kind: 'output', label: 'Reply and containment', systems: ['Outlook', 'SAP QM', 'Elara'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'approved' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Pallets in the lot · 20 dispatched and 2 in SIL-3', value: 22 },
        { label: 'Open work order on DP-2 · 42 days', value: 'OT-26-07415', tone: 'warn' },
        { label: 'Similar complaint · RCL-2025-0311', value: 1, tone: 'warn' },
        { label: 'Working days left for the report · due 02/10/2026', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Reads the email from qa.team@ec-foods-uk.example in the calidad@ec-demo.example mailbox (26/09/2026 10:14)', result: 'Customer complaint in English · 2 photos attached', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extracts the complaint data', result: 'Lot L26-231-FUS-GUI-01 · Garden Peas 1kg · stone of about 8 mm · no injury · ref. UKC-44718 · report within 5 working days', ms: 2900 },
      { system: 'SAP', action: 'Validates the extracted lot and product', result: 'The lot exists: Peas 1 kg (Garden Peas 1kg), SKU UK-GUI-1000, best before 08/2028. Matches the email', ms: 410, tone: 'ok' },
      { system: 'SAP', action: 'Raw material origin', result: 'AGR-0412 (Ribaforada) · fields P-0412-07 and P-0412-09 · harvested on 19/08/2026', ms: 380 },
      { system: 'SAP', action: 'Intake REC-26-18233', result: '19/08/2026 10:42 · 24.6 t · tenderometer 108 TR · 2 kg sample free of stones', ms: 350 },
      { system: 'MES Mapex', action: 'Route and process controls on 19/08/2026', result: 'Line L2, morning shift: LIM-2, DP-2, ESC-2, TUN-2, OPT-2 and ENV-4 · OPT-2 rejected 1.6 % (baseline 1.5 %)', ms: 520 },
      { system: 'GMAO', action: 'Looks for open work orders on the route equipment', result: 'OT-26-07415 · DP-2: screen wear recorded at the weekly inspection (18/08/2026) · open, waiting for spare part', ms: 430, tone: 'warn' },
      { system: 'Mecalux Easy WMS', action: 'Locates the lot’s pallets', result: '22 pallets · 17,600 kg: 20 dispatched and 2 in SIL-3', ms: 460 },
      { system: 'SAP', action: 'Lot shipments', result: 'EXP-26-40911 (12 pallets, 25/08) and EXP-26-40957 (8 pallets, 28/08) to EC Foods UK Ltd · temperature record compliant', ms: 390 },
      { system: 'Elara', action: 'Looks for similar complaints in the last 12 months', result: '4 complaints with a non-conformity · 1 similar: RCL-2025-0311 (stone of about 6 mm in spinach portions)', ms: 540, tone: 'warn' },
      { system: 'Procedimientos', action: 'Checks PNT-CAL-020, PNT-CAL-031 and IT-MAN-DP-02', result: '8D report within 5 working days: by 02/10/2026 · IT-MAN-DP-02 requires reinforced screen inspection until it is replaced', ms: 380 },
      { system: 'Modelo de lenguaje', action: 'Drafts the 8D (D1–D8) with owners by role and dates', result: 'Full draft · the link with DP-2 remains a hypothesis to be confirmed', ms: 5200 },
      { system: 'Elara', action: 'Records the non-conformity and links it to the complaint', result: 'NC-2026-0419 opened as a draft · linked to UKC-44718', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Drafts the reply in English and its Spanish control translation', result: 'Draft ready: acknowledgement, reference NC-2026-0419, containment and report date · pending approval', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'L26-231-FUS-GUI-01',
      noun: 'lot',
      label: 'Lot code',
      fix_title: 'the complaint’s lot',
      systems: 'SAP/Mapex',
      systems_short: 'SAP/Mapex',
      fix_text: 'If the customer has copied the code wrongly, type the correct lot. Agentic Platform looks it up in SAP/Mapex and checks that it matches the product complained about before changing anything.',
      same_body: 'It exists in SAP/Mapex and corresponds to Peas 1 kg (Garden Peas 1kg) (SKU UK-GUI-1000). No changes.',
      unknown_hint: 'If the customer’s code is doubtful, ask for a photo of the pack label.',
      mismatch_body: 'It exists in SAP, but it is not Garden Peas 1kg (SKU UK-GUI-1000), the product complained about: the record is not changed.',
      known: {
        'L26-261-FUS-GUI-03': { kind: 'mismatch', title: 'Lot L26-261-FUS-GUI-03 does not belong to this complaint', body: 'It exists in SAP, but it is Fine peas 1 kg (SKU VL-GUI-1000), produced on 18/09/2026 on Line L4 (repacking from bulk). The complaint is about Garden Peas 1kg (SKU UK-GUI-1000): the record is not changed.' },
        'L26-262-FUS-MIX-02': { kind: 'mismatch', title: 'Lot L26-262-FUS-MIX-02 does not belong to this complaint', body: 'It exists in SAP, but it is Griddled vegetable stir-fry 600 g (SKU UK-MIX-600), produced on 19/09/2026 on Line L5 (mixes). The complaint is about Garden Peas 1kg (SKU UK-GUI-1000): the record is not changed.' },
        'L25-310-ALF-ESP-02': { kind: 'mismatch', title: 'L25-310-ALF-ESP-02 is the lot of complaint RCL-2025-0311, not this one', body: 'It is Spinach portions 1 kg from the Alfaro plant, from closed complaint RCL-2025-0311 (stone of about 6 mm). It appears in the history as a similar case, but it is not the lot complained about. The record is not changed.' }
      }
    },
    sheet: {
      sub: 'Data extracted from the email and checked in SAP and Elara',
      empty_text: 'Agentic Platform will extract the lot, product, defect, reference and deadline from the email, and check them in SAP before preparing the 8D and the reply.',
      rows: [
        { k: 'Reference', v: 'UKC-44718', code: true, sub: 'Consumer reference at the retailer' },
        { k: 'Customer', v: 'EC Foods UK Ltd (EC subsidiary, United Kingdom)', sub: 'CLI-FWF-UK · end customer: UK retailer (private label)' },
        { k: 'Product', v: 'Peas 1 kg (Garden Peas 1kg)', ok: 'SKU UK-GUI-1000 · matches the lot in SAP' },
        { k: 'Lot', lot: true, ok: 'Exists in SAP/Mapex · produced on 19/08/2026 on Line L2' },
        { k: 'Best before', v: '08/2028', ok: 'Matches SAP' },
        { k: 'Defect', v: 'Foreign body: stone of about 8 mm', sub: 'Physical hazard: hard object of 7 mm or more' },
        { k: 'Injuries', v: 'No', sub: '“No injury has been reported”' },
        { k: 'Evidence', v: '2 photos attached · physical sample on its way' },
        { k: 'Dates', v: 'Retailer: 24/09/2026 · Quality: 26/09/2026 10:14' },
        { k: 'Deadline', v: 'Report due by 02/10/2026', due: true, sub: '5 working days from receipt · PNT-CAL-020' },
        { k: 'Record', v: 'NC-2026-0419', code: true, sub: 'Non-conformity in Elara, linked to the complaint' }
      ]
    },
    requests: {
      title: 'What the customer asks for',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Acknowledgement and investigation reference', meta: ['Reply to the customer · NC-2026-0419'], quote: 'Please confirm receipt and let us know your investigation reference', side: { pending: { status: 'waiting', label: 'Pending approval' }, approved: { status: 'sent', label: 'Sent' }, rejected: { status: 'rejected', label: 'Not sent' } } },
        { icon: 'check-circle', tone: 'ok', title: 'Lot traceability: raw material, harvest, intake and line', meta: ['D2 and annex A of the 8D'], quote: 'traceability of the lot (raw material, harvest, intake and processing line)', side: { status: 'ok', label: 'Gathered' } },
        { icon: 'clock', tone: 'warn', title: 'Destoning and foreign-body controls, with their records for 19/08/2026', meta: ['D4 · DP-2, OPT-2 and OT-26-07415'], quote: 'the stone-removal and foreign-body controls on the line (destoner, optical sorting) and their records for the production date', side: { status: 'review', label: 'To be assessed' } },
        { icon: 'clock', tone: 'warn', title: 'Root cause and corrective and preventive actions', meta: ['D4, D5 and D7 of the 8D'], quote: 'root cause, corrective and preventive actions', side: { status: 'review', label: 'Hypothesis' } },
        { icon: 'check-circle', tone: 'ok', title: 'Is any other stock from the same lot affected?', meta: ['D3 · 20 pallets dispatched and 2 in SIL-3'], quote: 'confirmation of whether any other stock from the same lot is affected', side: { pending: { status: 'ok', label: 'Located' }, approved: { status: 'hold', label: '2 pallets on hold' }, rejected: { status: 'ok', label: 'Located' } } },
        { icon: 'calendar', tone: 'warn', title: 'Full report within 5 working days', meta: ['8D sent with D1–D5'], quote: 'within 5 working days', side: { status: 'pending', label: 'By 02/10' } }
      ]
    },
    trace: {
      title: 'Trace of lot L26-231-FUS-GUI-01',
      sub: 'SAP, MES Mapex, Mecalux Easy WMS and GMAO · backward and forward',
      button_code: 'L26-231-FUS-GUI-01',
      button_label: 'Full trace · 22 SSCC',
      back_title: 'Backward',
      back: [
        { time: '18/08', title: 'Maintenance · destoner DP-2', text: 'Screen wear recorded at the weekly inspection; replacement scheduled.', tone: 'warn', ref: 'OT-26-07415', chip: { status: 'open', label: 'Open, waiting for spare part' } },
        { time: '19/08', title: 'Field · harvest', text: 'AGR-0412 (Ribaforada, Ribera navarra) · fields P-0412-07 and P-0412-09 · peas', tone: 'brand', ref: 'AGR-0412' },
        { time: '19/08', timeSub: '10:42', title: 'Intake REC-26-18233', text: '24.6 t · tenderometer 108 TR (specification 95–120 TR) · 2 kg sample free of stones and clods', tone: 'ok', ref: 'REC-26-18233' },
        { time: '19/08', title: 'Processing · Line L2, morning shift', route: ['LIM-2', 'DP-2', 'ESC-2', 'TUN-2', 'OPT-2', 'ENV-4'], route_mark: 'DP-2', text: 'Packed on ENV-4 · 22 pallets, 17,600 kg', tone: 'brand' },
        { time: '19/08', title: 'Shift controls', text: 'OPT-2: 1.6 % rejection (baseline 1.5 %) · ENV-4: weight and seal compliant', tone: 'ok' }
      ],
      fwd_title: 'Forward',
      fwd_cols: { id: 'Destination', qty: 'Pallets', when: 'Date', status: 'Status' },
      fwd: [
        { id: 'EXP-26-40911', dest: 'EC Foods UK Ltd', sub: 'UK retailer (private label)', qty: '12', when: '25/08/2026 16:10', status: { pending: { status: 'shipped', label: 'Dispatched' }, approved: { status: 'shipped', label: 'Dispatched' }, rejected: { status: 'shipped', label: 'Dispatched' } } },
        { id: 'EXP-26-40957', dest: 'EC Foods UK Ltd', sub: 'UK retailer (private label)', qty: '8', when: '28/08/2026 15:30', status: { pending: { status: 'shipped', label: 'Dispatched' }, approved: { status: 'shipped', label: 'Dispatched' }, rejected: { status: 'shipped', label: 'Dispatched' } } },
        { id: 'SIL-3', dest: 'Automatic silo 3 (Fustiñana)', sub: 'SSCC 384123452310100214 and 384123452310100221', qty: '2', when: 'In stock', status: { pending: { status: 'pending', label: 'Hold proposed' }, approved: { status: 'hold', label: 'On hold' }, rejected: { status: 'pending', label: 'Hold proposed' } } }
      ],
      fwd_note: '22 pallets · 17,600 kg · refrigerated truck at −25 °C · temperature record compliant on both shipments.',
      hypothesis: {
        title: 'Probable cause hypothesis · to be confirmed by Quality',
        icon: 'wrench',
        paras: [
          'Screen wear on destoner DP-2 was recorded on 18/08/2026 (OT-26-07415, open, waiting for spare part) and this lot went through DP-2 on 19/08/2026, one day later.',
          'Still to clarify: the 2 kg intake sample was free of stones and OPT-2 rejected 1.6 % on that shift (baseline 1.5 %). Today OPT-2 is rejecting 4.8 % (baseline 1.5 %) and the work order is still open (42 days).',
          'It will be confirmed with the customer’s sample, the screen inspection and the OPT-2 records. Until then it is not communicated to the customer.'
        ]
      }
    },
    history: {
      sub: 'Elara · complaints with a non-conformity · last 12 months',
      col_id: 'Complaint',
      col_product: 'Product and lot',
      col_cause: 'Root cause',
      rows: [
        { id: 'RCL-2025-0311', date: '2025-11-14', product: 'Spinach portions 1 kg (Verleal)', lot: 'L25-310-ALF-ESP-02', description: 'Stone of about 6 mm in spinach portions', category: 'Foreign body', customer_label: 'Spanish retail logistics platform', root_cause: 'Worn destoner screen on the leaf line (Alfaro plant)', nc: 'NC-2025-0388', status: 'closed (02/12/2025)', similar: true },
        { id: 'RCL-2026-0204', date: '2026-07-15', product: 'Sweetcorn 450 g', lot: 'L26-160-FUS-MAI-01', description: 'Caked product (ice blocks) at destination', category: 'Quality', customer_label: 'EC Frozen Foods LLC (EC subsidiary, USA)', root_cause: 'Cold chain break during the customer’s transport', nc: 'NC-2026-0233', status: 'closed', similar: false },
        { id: 'RCL-2026-0131', date: '2026-05-07', product: 'Round green beans 1 kg', lot: 'L26-118-FUS-JUD-02', description: 'Strings in the green beans above specification', category: 'Quality', customer_label: 'French importer', root_cause: 'Setting of the topping machine COR-3', nc: 'NC-2026-0158', status: 'closed', similar: false },
        { id: 'RCL-2026-0042', date: '2026-02-20', product: 'Fine peas 1 kg (Verleal)', lot: 'L26-041-FUS-GUI-02', description: 'Badly sealed bag (open seal)', category: 'Packaging', customer_label: 'Spanish retail logistics platform', root_cause: 'Low jaw temperature on ENV-2', nc: 'NC-2026-0097', status: 'closed', similar: false }
      ],
      note: {
        title: 'Same type of cause as RCL-2025-0311',
        body: 'Stone of about 6 mm in spinach portions (14/11/2025): worn destoner screen on the leaf line (Alfaro plant); NC-2025-0388 closed (02/12/2025). If the DP-2 hypothesis is confirmed, it would be the second stone caused by a worn screen in less than a year: the 8D proposes in D7 reviewing the screens at every plant.'
      }
    },
    plan: {
      title: '8D draft · NC-2026-0419',
      sub: 'PNT-CAL-020 · to the customer by 02/10/2026 with D1–D5; D6–D8 followed up',
      col_label: 'Discipline',
      containment_status: { pending: { text: 'Pending approval', tone: 'warn' }, approved: { text: 'Applied', tone: 'ok' }, rejected: { text: 'Not applied', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Team', owner: ['Plant Quality Manager'], date: '2026-09-29', status: { text: 'Proposed', tone: 'draft' }, lead: 'Leader: Plant Quality Manager.', items: ['Shift Quality Lead: investigation and contact with the customer', 'Line Maintenance: DP-2 and OPT-2 (line L2)', 'Campaign Manager: raw material from AGR-0412', 'Dispatch Shift Supervisor: stock in SIL-3 and shipments'], note: 'External contact: Quality Assurance, EC Foods UK Ltd.' },
        { d: 'D2', title: 'Problem description', owner: ['Shift Quality Lead'], date: '2026-09-29', status: { text: 'Complete', tone: 'ok' }, lead: 'A UK consumer found a stone of about 8 mm while serving Garden Peas 1kg (a retailer’s private label, via EC Foods UK Ltd). No injury.', items: ['Lot L26-231-FUS-GUI-01, best before 08/2028, produced on 19/08/2026 on Line L2, morning shift: 22 pallets, 17,600 kg', 'Complaint at the retailer on 24/09/2026; at Quality, on 26/09/2026 10:14', 'Physical hazard: hard object of 7 mm or more', 'Evidence: 2 photos; physical sample on its way'] },
        { d: 'D3', title: 'Containment', owner: ['Shift Quality Lead', 'Line Maintenance'], date: '2026-09-29', containment: true, items: ['Hold the lot’s 2 pallets in SIL-3 (SSCC 384123452310100214 and 384123452310100221) in SAP QM and Easy WMS. Requires approval (PNT-CAL-015)', 'Ask EC Foods UK Ltd for the remaining stock from EXP-26-40911 (12 pallets) and EXP-26-40957 (8 pallets)', 'Reinforced inspection of the DP-2 screen until it is replaced (IT-MAN-DP-02)', 'Review in SAP and Mapex the lots processed on L2 since 18/08/2026, the date the wear was recorded'] },
        { d: 'D4', title: 'Root cause', owner: ['Plant Quality Manager', 'Line Maintenance'], date: '2026-10-01', status: { text: 'Hypothesis', tone: 'warn' }, lead: 'Main hypothesis, to be confirmed: the worn screen of destoner DP-2 (recorded on 18/08/2026; OT-26-07415 open, waiting for spare part) let the stone through during production on 19/08/2026.', items: ['For: the lot went through DP-2 one day after the wear was recorded; RCL-2025-0311 had a cause of the same type (Alfaro plant)', 'Still to clarify: the 2 kg intake sample was free of stones and OPT-2 rejected 1.6 % on that shift (baseline 1.5 %)', 'Verification: examination of the customer’s sample, screen inspection, OPT-2 records for 19/08/2026 and 5-whys analysis'] },
        { d: 'D5', title: 'Corrective actions', owner: ['Line Maintenance'], date: '2026-10-02', status: { text: 'Planned', tone: 'info' }, items: ['Replace the DP-2 screen and close OT-26-07415', 'Check the OPT-2 setting for stones with reference samples'] },
        { d: 'D6', title: 'Implementation and effectiveness', owner: ['Shift Quality Lead'], date: '2026-10-09', status: { text: 'Planned', tone: 'info' }, items: ['After the screen change, OPT-2 rejection at its baseline (1.5 %) for 5 shifts; today it is at 4.8 %', 'Reinforced inspection of L2 finished product, free of stones'] },
        { d: 'D7', title: 'Preventing recurrence', owner: ['Plant Quality Manager'], date: '2026-10-16', status: { text: 'Planned', tone: 'info' }, items: ['Revise IT-MAN-DP-02: maximum time to work with a worn screen and minimum stock of spare screens', 'Extend the screen review to the destoners at every plant (same type of cause as NC-2025-0388, Alfaro plant)', 'Automatic alert when an optical sorter’s rejection doubles its baseline'] },
        { d: 'D8', title: 'Closure and recognition', owner: ['Plant Quality Manager'], date: '2026-10-23', status: { text: 'Planned', tone: 'info' }, items: ['Final report to EC Foods UK Ltd and closure of NC-2026-0419 in Elara with the effectiveness evidence', 'Recognition of the team'] }
      ]
    },
    reply: {
      to_label: 'to the customer',
      subject: 'RE: Customer complaint - foreign body (stone) - Garden Peas 1kg - Lot L26-231-FUS-GUI-01 - Ref UKC-44718 - EC ref. NC-2026-0419',
      sub: 'To qa.team@ec-foods-uk.example · in English',
      tab_label: 'English · to be sent',
      text: [
        'Dear Quality Assurance Team,',
        '',
        'Thank you for your email of 26 September 2026. We confirm receipt of consumer complaint UKC-44718 (foreign body: a stone of approximately 8 mm) concerning Garden Peas 1kg, lot L26-231-FUS-GUI-01, best before 08/2028. We are sorry for the concern caused to the consumer and note that no injury has been reported.',
        '',
        'Our investigation reference is NC-2026-0419. The complaint is being handled under our customer complaint procedure and will be documented in an 8D report.',
        '',
        'Initial findings from our records:',
        '- Traceability: the lot was produced at our Fustiñana plant on 19/08/2026 (line L2, morning shift) from peas harvested and received on the same day (grower AGR-0412, intake REC-26-18233).',
        '- Distribution: 22 pallets (17,600 kg) were produced. 20 pallets were dispatched to EC Foods UK Ltd (EXP-26-40911 on 25/08/2026 and EXP-26-40957 on 28/08/2026). The remaining 2 pallets at our warehouse have been placed on quality hold.',
        '- Foreign-body controls: we are reviewing the destoner and optical sorting records for the production date, together with the maintenance records of line L2.',
        '',
        'Next steps:',
        '- We will examine the physical sample as soon as it arrives. Please send it for the attention of our Quality department in Fustiñana, quoting NC-2026-0419.',
        '- We will send you the investigation report, including root cause and corrective and preventive actions, by 2 October 2026.',
        '- To confirm whether any other stock is affected, could you please let us know the quantity of lot L26-231-FUS-GUI-01 still held by EC Foods UK and by the retailer?',
        '',
        'Kind regards,',
        '',
        'Quality Department',
        'Frozen Foods Company · Fustiñana plant',
        'calidad@ec-demo.example'
      ].join('\n'),
      highlights: [
        { text: 'NC-2026-0419', label: 'Reference', tone: 'brand' },
        { text: 'have been placed on quality hold', label: 'Containment', tone: 'brand' },
        { text: 'by 2 October 2026', label: 'Commitment', tone: 'brand' }
      ],
      llm_instructions: [
        'Formal, professional tone, from the supplying plant to the Quality Assurance team of EC Foods UK Ltd, the group’s UK subsidiary complaining on behalf of a private-label retailer (greeting “Dear Quality Assurance Team,”). Express regret for the consumer’s concern without admitting fault.',
        'Thank them for the email of 26 September 2026 and acknowledge consumer complaint UKC-44718 (foreign body: a stone of approximately 8 mm) concerning Garden Peas 1kg, lot L26-231-FUS-GUI-01, best before 08/2028; note that no injury has been reported.',
        'Give the investigation reference NC-2026-0419 and say that the complaint is handled under the customer complaint procedure and will be documented in an 8D report.',
        'Initial findings: the lot was produced at Fustiñana on 19/08/2026 (line L2, morning shift) from peas harvested and received the same day (grower AGR-0412, intake REC-26-18233); 22 pallets (17,600 kg), 20 dispatched to EC Foods UK Ltd (EXP-26-40911 on 25/08/2026 and EXP-26-40957 on 28/08/2026) and the remaining 2 placed on quality hold; the destoner, optical sorting and line L2 maintenance records are being reviewed.',
        'Next steps: examine the physical sample as soon as it arrives (send it to Quality in Fustiñana quoting NC-2026-0419), send the report with root cause and corrective and preventive actions by 2 October 2026, and ask how much stock of the lot EC Foods UK and the retailer still hold.',
        'Do not anticipate the cause (not the DP-2 destoner screen, not work order OT-26-07415, not the earlier complaint RCL-2025-0311) and do not mention a product recall.',
        'Sign as: Quality Department · Frozen Foods Company · Fustiñana plant · calidad@ec-demo.example'
      ],
      criterion: 'Drafting criterion: confirms facts from SAP and Easy WMS and commits to dates; does not anticipate the cause (the DP-2 hypothesis is not confirmed) or mention a recall.',
      control: {
        label: 'Spanish control translation',
        note: 'Control translation for the approver at the plant, who works in Spanish; it is not sent.',
        edited_note: 'The translation refers to Agentic Platform’s draft; the edited version includes Quality’s changes to the English text.',
        subject: 'RE: Reclamación de cliente · ref. UKC-44718 · ref. EC NC-2026-0419',
        text: [
          'Estimado equipo de Quality Assurance:',
          '',
          'Gracias por su correo del 26 de septiembre de 2026. Confirmamos la recepción de la reclamación del consumidor UKC-44718 (cuerpo extraño: una piedra de unos 8 mm) sobre Garden Peas 1kg, lote L26-231-FUS-GUI-01, consumo preferente 08/2028. Lamentamos la preocupación causada al consumidor y tomamos nota de que no se han comunicado lesiones.',
          '',
          'Nuestra referencia de investigación es NC-2026-0419. La reclamación se gestiona según nuestro procedimiento de reclamaciones de cliente y se documentará en un informe 8D.',
          '',
          'Primeros datos de nuestros registros:',
          '- Trazabilidad: el lote se fabricó en nuestra planta de Fustiñana el 19/08/2026 (línea L2, turno de mañana) con guisante cosechado y recibido el mismo día (agricultor AGR-0412, recepción REC-26-18233).',
          '- Distribución: se fabricaron 22 palés (17.600 kg). 20 palés se expidieron a EC Foods UK Ltd (EXP-26-40911 el 25/08/2026 y EXP-26-40957 el 28/08/2026). Los 2 palés que quedan en nuestro almacén se han retenido por Calidad.',
          '- Controles de cuerpos extraños: estamos revisando los registros de la despedregadora y de la selección óptica de la fecha de producción, junto con los registros de mantenimiento de la línea L2.',
          '',
          'Próximos pasos:',
          '- Examinaremos la muestra física en cuanto llegue. Les rogamos que la envíen a la atención de nuestro departamento de Calidad en Fustiñana, indicando NC-2026-0419.',
          '- Les enviaremos el informe de investigación, con la causa raíz y las acciones correctivas y preventivas, a más tardar el 2 de octubre de 2026.',
          '- Para confirmar si hay otro stock afectado, ¿pueden indicarnos la cantidad del lote L26-231-FUS-GUI-01 que conservan EC Foods UK y el minorista?',
          '',
          'Un saludo,',
          '',
          'Departamento de Calidad',
          'Empresa de Congelados · planta de Fustiñana',
          'calidad@ec-demo.example'
        ].join('\n')
      }
    },
    approval: {
      title: 'Reply to EC Foods UK Ltd and containment',
      approver: 'Shift Quality Lead',
      policy: 'PNT-CAL-020 · PNT-CAL-015',
      summary: {
        pending: 'Agentic Platform has prepared the reply in English for qa.team@ec-foods-uk.example and the hold on the lot’s remaining stock. Nothing is sent or held until Quality approves it.',
        approved: 'Quality has approved the reply and the containment. Agentic Platform has sent the email to qa.team@ec-foods-uk.example, put the lot’s stock on hold and updated NC-2026-0419.',
        rejected: 'Quality has rejected the proposal: the reply has not been sent and no pallet has been put on hold.'
      },
      scope: [
        { label: 'Reply in English', state: { pending: { status: 'pending', chip: 'Send' }, approved: { status: 'sent', chip: 'Sent' }, rejected: { status: 'rejected', chip: 'Not sent' } } },
        { label: 'Pallets in SIL-3', value: '2 pallets · 1,600 kg', state: { pending: { status: 'pending', chip: 'Hold' }, approved: { status: 'hold', chip: 'On hold' }, rejected: { status: 'rejected', chip: 'Not held' } } },
        { label: 'Dispatched pallets', value: '20 pallets', state: { status: 'evaluate', chip: 'Ask the customer' } }
      ],
      effects: [
        'Outlook: reply sent from calidad@ec-demo.example',
        'SAP QM and Easy WMS: quality block on the lot and 2 pallets immobilised in SIL-3',
        'Elara: NC-2026-0419 moves to “In progress” with the reply attached'
      ],
      approve_label: 'Approve and send',
      next_step: 'Next step: confirm the cause with the sample (D4) and send the 8D report by 02/10/2026.',
      toast_approved: 'Reply sent to EC Foods UK Ltd · 2 pallets on hold in SIL-3',
      reject_text: 'The reply is not sent and no pallet is put on hold. The reason is kept in the audit log.',
      reject_placeholder: 'For example: wait for the sample before replying',
      reject_audit: 'nothing is sent or held',
      toast_rejected: 'Reply rejected: nothing has been sent and no pallet has been put on hold'
    },
    compare: {
      rows: [
        { k: 'People involved', hoy: '3–4: Quality, Production, Maintenance and Dispatch', pro_strong: '1', pro: ': Quality reviews, corrects if needed and approves' },
        { k: 'Systems to open', hoy: '6: Outlook, SAP, Mapex, Easy WMS, GMAO and Elara', pro_strong: '1', pro: ': this console; Agentic Platform queries all 6' }
      ],
      steps_today: '12–15 searches, cross-checks and drafts by hand',
      time_label: 'Trace, draft 8D and reply',
      time_today: '2–5 h of work, spread over 1–2 days',
      footer: 'Proposed acceptance criterion for the pilot: trace and draft in under 15 minutes, and Quality accepts the draft with minor edits in at least 70 % of cases.'
    },
    audit: {
      requested: { action: 'Complaint analysis requested', detail: 'UKC-44718 · email from qa.team@ec-foods-uk.example of 26/09/2026 10:14' },
      analyzed: { action: 'Complaint analysed', detail: 'UKC-44718 · lot L26-231-FUS-GUI-01' },
      after_analysis: [
        { action: 'Non-conformity recorded as a draft', detail: 'NC-2026-0419 · Elara · linked to UKC-44718' },
        { action: '8D draft prepared', detail: 'NC-2026-0419 · D1–D8 · DP-2 cause as a hypothesis' },
        { action: 'Reply to the customer drafted', detail: 'UKC-44718 · English · version 1 · pending approval' }
      ],
      approved: { action: 'Reply approved and sent', detail: 'UKC-44718 · to qa.team@ec-foods-uk.example · NC-2026-0419' },
      after_approval: [
        { action: 'Quality hold applied', detail: 'SAP QM and Easy WMS · lot L26-231-FUS-GUI-01 · 2 pallets in SIL-3' },
        { action: 'Non-conformity updated', detail: 'NC-2026-0419 · In progress · reply attached' }
      ]
    },
    outcome_label: 'Reply sent · NC-2026-0419 in progress',
    toast_analyzed: 'Complaint analysed · 8D and reply drafted',
    status_chips: { idle: 'Open · not analysed', pending: 'Awaiting approval', approved: 'Reply sent · 8D in progress', rejected: 'Reply rejected' },
    report: {
      button: 'Download 8D report',
      title: '8D report · complaint UKC-44718',
      subtitle: 'Foreign body (stone of about 8 mm) in Garden Peas 1kg · lot L26-231-FUS-GUI-01 · EC Foods UK Ltd (EC subsidiary, United Kingdom), UK retailer (private label)',
      filename: '8D-report-NC-2026-0419-UKC-44718',
      meta: [['Plant', 'Fustiñana (FUS)'], ['Complaint', 'UKC-44718 · 26/09/2026'], ['Lot', 'L26-231-FUS-GUI-01'], ['Report to the customer', 'by 02/10/2026']],
      state: { pending: 'Draft · pending approval', approved: 'Approved for sending · D4 open', rejected: 'Draft · reply rejected' },
      summary: [
        'Complaint from EC Foods UK Ltd (EC subsidiary, United Kingdom) on behalf of a UK retailer (private label): stone of about 8 mm in Garden Peas 1kg, lot L26-231-FUS-GUI-01. No injury. The lot was produced on 19/08/2026 on Line L2; 20 of its 22 pallets have been dispatched and 2 remain in SIL-3.',
        'Cause hypothesis, to be confirmed with the sample: wear of the destoner DP-2 screen (OT-26-07415, open since 18/08/2026).'
      ],
      trace_heading: 'Annex A · Lot trace',
      trace_rows: [
        { etapa: 'Field', fecha: '19/08/2026', detalle: 'Grower AGR-0412 · fields P-0412-07, P-0412-09 (Ribera navarra) · peas', ref: 'AGR-0412' },
        { etapa: 'Intake', fecha: '19/08/2026 10:42', detalle: 'Ticket REC-26-18233 · tenderometer 108 TR · 24.6 t', ref: 'REC-26-18233' },
        { etapa: 'Processing', fecha: '19/08/2026', detalle: 'Line L2 (peas / green beans): cleaner LIM-2, destoner DP-2, blancher ESC-2, IQF tunnel TUN-2, optical sorter OPT-2, packer ENV-4 · morning shift', ref: 'L2' },
        { etapa: 'Quality', fecha: '19/08/2026', detalle: 'Intake: tenderometer 108 TR (specification 95-120 TR): compliant; Intake: 2 kg sample free of stones and clods (compliant); Optical sorter OPT-2: 1.6 % rejection on the shift (baseline 1.5 %); Packer ENV-4: weight and seal check compliant', ref: '—' },
        { etapa: 'Maintenance', fecha: '18/08/2026', detalle: 'Destoner DP-2: screen wear recorded at the weekly inspection; replacement scheduled. OT-26-07415: open, waiting for spare part', ref: 'OT-26-07415' },
        { etapa: 'Shipment', fecha: '25/08/2026 16:10', detalle: '12 pallets to EC Foods UK Ltd (EC subsidiary, United Kingdom) · UK retailer (private label) · refrigerated truck −25 °C', ref: 'EXP-26-40911' },
        { etapa: 'Shipment', fecha: '28/08/2026 15:30', detalle: '8 pallets to EC Foods UK Ltd (EC subsidiary, United Kingdom) · UK retailer (private label) · refrigerated truck −25 °C', ref: 'EXP-26-40957' },
        { etapa: 'Stock', fecha: '29/09/2026', detalle: '2 pallets in Automatic silo 3 (Fustiñana)', ref: 'SIL-3' }
      ],
      units: {
        heading: 'Annex B · Lot pallets (22 SSCC)',
        cols: [{ label: 'Pallet', key: 'pale', num: true }, { label: 'SSCC', key: 'sscc', mono: true }, { label: 'Kg', key: 'kg', num: true }, { label: 'Location', key: 'ubicacion' }, { label: 'Status', key: 'estado', status: true }, { label: 'Shipment', key: 'expedicion' }],
        rows: [
          '384123452310100016', '384123452310100023', '384123452310100030', '384123452310100047', '384123452310100054', '384123452310100061',
          '384123452310100078', '384123452310100085', '384123452310100092', '384123452310100108', '384123452310100115', '384123452310100122',
          '384123452310100139', '384123452310100146', '384123452310100153', '384123452310100160', '384123452310100177', '384123452310100184',
          '384123452310100191', '384123452310100207', '384123452310100214', '384123452310100221'
        ].map((sscc, i) => (i < 20
          ? { pale: `${i + 1}/22`, sscc, kg: '800', ubicacion: 'Dispatched', estado: 'Dispatched', expedicion: i < 12 ? 'EXP-26-40911' : 'EXP-26-40957' }
          : { pale: `${i + 1}/22`, sscc, kg: '800', ubicacion: 'Automatic silo 3 (Fustiñana)', estado: 'In stock', estado_after: 'On hold', expedicion: '—' }))
      },
      history_heading: 'Annex C · Previous complaints (12 months)',
      approvals: [
        { paso: '8D and reply drafts', rol: 'Agentic Platform · Customer complaints agent', kind: 'agent' },
        { paso: 'Reply to the customer and containment (D3)', rol: 'Shift Quality Lead', kind: 'reply' },
        { paso: 'Root cause confirmation (D4)', rol: 'Plant Quality Manager', kind: 'pending' },
        { paso: '8D closure (D8)', rol: 'Plant Quality Manager', kind: 'pending' }
      ],
      second_signer: { role: 'Plant Quality Manager', note: 'Cause confirmation (D4) and closure (D8) · pending' }
    },
    presenter: {
      running: 'While it runs: point out the GMAO line (the DP-2 screen work order, open since 18/08) and the Elara line (similar complaint). If needed, “Speed up”.',
      idle: [
        'Email from EC Foods UK Ltd, Frozen Foods Company’s UK subsidiary, on behalf of a private-label retailer: a stone of about 8 mm in 1 kg peas. It arrived on Saturday 26/09 at 10:14, in English and with a deadline.',
        'In production, Agentic Platform analyses it as soon as it reaches the Quality mailbox. Here we launch it by hand to see what it does and which systems it queries.'
      ],
      pending: [
        'What is highlighted in the email is what Agentic Platform has extracted. Each item is checked in SAP: the lot exists and the product matches.',
        'The trace: harvest on 19/08 from AGR-0412, intake REC-26-18233 at 10:42 and line L2. 20 pallets are already in the UK and 2 are still in SIL-3.',
        'The finding that changes the investigation: the DP-2 screen had a work order open since 18/08, one day before the lot was produced. It is a hypothesis, not the cause: Quality confirms it with the sample.',
        'History: in November 2025 there was a stone in spinach with a cause of the same type at the Alfaro plant (RCL-2025-0311). The 8D includes it under prevention (D7).',
        'The English reply confirms facts and dates and does not anticipate the cause. It does not go out until Quality approves it.'
      ],
      approved: [
        'Approved: reply sent, 2 pallets on hold in SIL-3 and NC-2026-0419 in progress in Elara. Everything is in the audit log.',
        'The comparison below: today, 3–4 people and 6 systems for hours; here, one review and one approval. The “today” figure is measured in the pilot, not made up.',
        'The 8D report downloads as a controlled document: code, revision, status, approvals and page number.'
      ],
      next: {
        idle: 'Press “Analyse complaint” and read out two lines of the log: the system queried and what it finds.',
        pending: 'Press “Review and approve” (at the top) or scroll down to the reply and press “Approve and send”. Optional: “Correct” the lot with a non-existent one to show that it does not make up data.',
        approved: 'Press “Download 8D report” and show the document header. Then move on to “Procedures” in the sidebar.'
      }
    }
  }
});
