/* Subtropicales Axarquía · complaint CLM-2026-1120 (35% of the ready-to-eat avocado pieces arrive hard because of uneven ripening in lot AH-2611-092, from Supermercados Levante Fresh). English version.
 * Demo scenario with synthetic data (MFM). */
agenticPackEn('fruta', {
  reclamacion: {
    code: 'CLM-2026-1120',
    nav: 'Complaint CLM-2026-1120',
    title: 'Complaint CLM-2026-1120',
    agent: 'Customer complaints',
    analyze_label: 'Analyse complaint',
    nc: 'NC-2026-1120',
    form: { code: 'REG-CAL-012-02', rev: '3' },
    received: { date: '2026-11-19', time: '17:05' },
    due: '2026-12-03',
    holidays: [],
    customer_line: 'Supermercados Levante Fresh, S.A. · supermarket chain · Valencia',
    due_line: 'Acknowledgement within 24 h · 8D report before 03/12/2026',
    cust_name: 'Marta Sanchis (Supermercados Levante Fresh)',
    cust_addr: 'calidad@supermercados-levante-fresh.example',
    own_name: 'Customer Care, Subtropicales Axarquía',
    own_addr: 'atencion.cliente@subtropicales-axarquia.example',
    mail_domain: 'subtropicales-axarquia.example',
    mail_sub: 'calidad@supermercados-levante-fresh.example · mailbox atencion.cliente@subtropicales-axarquia.example · Spanish',
    mail_title: 'Customer email',
    mail_tab_label: 'Email (Spanish)',
    attachments: ['CLM-2026-1120_informe_INS-LF-2611-33.pdf', 'CLM-2026-1120_albaran_ALB-26-11-1471.pdf'],
    email_text: [
      'From: Marta Sanchis <calidad@supermercados-levante-fresh.example>',
      'To: Atención al cliente, Subtropicales Axarquía <atencion.cliente@subtropicales-axarquia.example>',
      'Date: Thu, 19 Nov 2026 17:05 (hora de Madrid)',
      'Subject: Reclamación - Aguacate ready to eat con maduración dispar - Lote AH-2611-092 - Pedido PED-2026-44718',
      '',
      'Buenas tardes:',
      '',
      'Les escribimos desde el departamento de calidad de Supermercados Levante Fresh, S.A. para reclamar por el aguacate "ready to eat" que nos suministraron el pasado 16/11/2026.',
      '',
      'Producto: Aguacate Hass ready to eat, bandeja de 4 piezas',
      'Lote: AH-2611-092',
      'Albarán: ALB-26-11-1471 (6 palés, 4,8 t) · Pedido: PED-2026-44718',
      'Informe de inspección: INS-LF-2611-33 (nuestras tiendas, 18/11/2026)',
      '',
      'Según nuestra inspección en 4 tiendas, el 35 % de las piezas llega duro (maduración dispar): 42 de las 120 piezas revisadas no están en el punto de consumo que indica la etiqueta. Hemos retirado de la venta las bandejas afectadas y conservamos unas 90 bandejas separadas en nuestra plataforma de Valencia. Adjuntamos el informe de inspección y el albarán.',
      '',
      'Solicitamos que analicen el lote, que nos expliquen la causa de la maduración dispar y nos indiquen las medidas correctivas, y que abonen la parte afectada.',
      '',
      'Les pedimos el acuse de recibo en 24 horas y un informe 8D por escrito en un plazo de 10 días hábiles. Indíquennos por favor el número de su expediente.',
      '',
      'Un saludo,',
      '',
      'Marta Sanchis',
      'Responsable de calidad',
      'Supermercados Levante Fresh, S.A.'
    ].join('\n'),
    mail_extra: {
      label: 'English translation',
      note: 'Control translation for the review; the original in Spanish is the one that counts.',
      headers: { From: 'Agentic Platform · control translation of the email from calidad@supermercados-levante-fresh.example', Date: 'Thu, 19 Nov 2026 17:05', Subject: 'Complaint · Ready-to-eat avocado with uneven ripening · Lot AH-2611-092 · Order PED-2026-44718' },
      text: [
        'Good afternoon,',
        '',
        'We are writing from the quality department of Supermercados Levante Fresh, S.A. to complain about the "ready to eat" avocado you supplied to us on 16/11/2026.',
        '',
        'Product: Ready-to-eat Hass avocado, tray of 4 pieces',
        'Lot: AH-2611-092',
        'Delivery note: ALB-26-11-1471 (6 pallets, 4.8 t) · Order: PED-2026-44718',
        'Inspection report: INS-LF-2611-33 (our stores, 18/11/2026)',
        '',
        'According to our inspection in 4 stores, 35% of the pieces arrive hard (uneven ripening): 42 of the 120 pieces checked are not at the eating stage indicated on the label. We have withdrawn the affected trays from sale and are keeping about 90 trays set aside at our Valencia platform. We attach the inspection report and the delivery note.',
        '',
        'We ask that you analyse the lot, explain the cause of the uneven ripening and tell us the corrective measures, and credit the affected part.',
        '',
        'We ask for an acknowledgement of receipt within 24 hours and a written 8D report within 10 working days. Please let us know your case number.',
        '',
        'Kind regards,',
        '',
        'Marta Sanchis',
        'Quality Manager',
        'Supermercados Levante Fresh, S.A.'
      ].join('\n'),
      highlights: [
        { text: 'at the eating stage indicated on the label', label: 'Declared eating stage', tone: 'ok' },
        { text: '35% of the pieces arrive hard (uneven ripening)', label: 'Hard pieces per customer', tone: 'crit' },
        { text: 'within 24 hours', label: 'Deadline', tone: 'warn' },
        { text: 'within 10 working days', label: 'Deadline', tone: 'warn' }
      ]
    },
    highlights: [
      { text: 'Aguacate Hass ready to eat, bandeja de 4 piezas', label: 'Product', tone: 'brand' },
      { text: 'AH-2611-092', label: 'Lot', tone: 'brand' },
      { text: 'ALB-26-11-1471', label: 'Delivery note', tone: 'brand' },
      { text: 'INS-LF-2611-33', label: 'Customer report' },
      { text: 'en el punto de consumo que indica la etiqueta', label: 'Declared eating stage', tone: 'ok' },
      { text: 'el 35 % de las piezas llega duro (maduración dispar)', label: 'Hard pieces per customer', tone: 'crit' },
      { text: 'Adjuntamos el informe de inspección y el albarán.', label: 'Evidence' },
      { text: 'Hemos retirado de la venta las bandejas afectadas', label: 'Customer containment' },
      { text: 'el acuse de recibo en 24 horas', label: 'Deadline' },
      { text: 'en un plazo de 10 días hábiles', label: 'Deadline' }
    ],
    run: {
      title: '"Customer complaint" workflow',
      sub: 'Triggered when a complaint reaches the Customer Care mailbox · PR-MAD-002',
      graph_title: 'Customer complaint workflow',
      idle_footer: 'Reads the email, extracts and validates the data, traces the lot and prepares the 8D and the reply. Nothing goes out without the approval of the Operations and Quality Manager.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Customer email', sub: 'Customer Care mailbox', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extraction and validation', systems: ['Modelo de lenguaje', 'SAP S/4HANA'], icon: 'search' },
        { id: 'traza', label: 'Lot trace', systems: ['SAP S/4HANA', 'Trazabilidad de campo', 'WMS', 'LIMS'], icon: 'git-branch' },
        { id: 'historico', label: 'History, 8D and reply', systems: ['SAP S/4HANA', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Operations and quality approval', sub: 'Operations and Quality Manager' },
        { id: 'salida', kind: 'output', label: 'Reply and containment', systems: ['Outlook', 'SAP S/4HANA', 'WMS'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'approved' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Lots from the same plots · P-0418 and P-0733', value: 3, tone: 'warn' },
        { label: 'Hard pieces · 35% per the customer vs 22% at the ripening exit', value: '35%', tone: 'warn' },
        { label: 'Similar complaint · CLM-2026-0934', value: 1, tone: 'warn' },
        { label: 'Working days left for the 8D report · due 03/12/2026', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Reads the email from calidad@supermercados-levante-fresh.example in the atencion.cliente@subtropicales-axarquia.example mailbox (19/11/2026 17:05)', result: 'Customer complaint in Spanish · 2 documents attached (report INS-LF-2611-33 and delivery note)', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extracts the complaint data', result: 'AH-2611-092 · ready-to-eat Hass avocado, tray of 4 pieces · 35% hard pieces (42 of 120) in 4 stores · report INS-LF-2611-33 · asks for analysis and credit · acknowledgement within 24 h and 8D report within 10 working days', ms: 2900 },
      { system: 'SAP S/4HANA', action: 'Validates the extracted customer and order', result: 'The customer exists: Supermercados Levante Fresh, S.A. (Valencia) · order PED-2026-44718 with delivery note ALB-26-11-1471 of 16/11/2026. Matches the email', ms: 410, tone: 'ok' },
      { system: 'SAP S/4HANA', action: 'Delivery note and lot delivered', result: 'ALB-26-11-1471: 6 pallets (4.8 t) of AH-2611-092 delivered on 16/11/2026 · label "ready to eat" · transport at 6.2 °C, compliant', ms: 380 },
      { system: 'Trazabilidad de campo', action: 'Origin of the lot', result: 'AH-2611-092 received on 05/11/2026 (10 t) from two growers: P-0418 (plot AX-1187, 6.2 t, harvested on 03/11) and P-0733 (plot AX-0942, 3.8 t, harvested on 04/11)', ms: 350 },
      { system: 'LIMS', action: 'Analysis of the lot at receipt and at the ripening exit', result: 'LAB-2611-0791 (05/11/2026): dry matter of 24.0% in P-0418 and 20.9% in P-0733 (lot average 22.8% vs a minimum of 21.0%) · LAB-2611-0824 (11/11/2026): 22% of pieces above 2.5 kgf vs a limit of 25% · lot released', ms: 520, tone: 'warn' },
      { system: 'WMS', action: 'Ripening in room CM-03', result: 'MAD-2611-0306 of 06/11/2026: 10 t with a single RTE-2 programme (ethylene 24 h, 18 °C, 5 days) for both origins · exit on 11/11/2026 · temperature and ethylene within range', ms: 430, tone: 'warn' },
      { system: 'SAP S/4HANA', action: 'Other lots from the same plots', result: 'AH-2611-097 (6 t, shipped to Hipermercados Ibérica Fresca on 17/11/2026) and AH-2611-101 (4 t ripening in CM-04) · remaining stock of AH-2611-092: 1.4 t in the warehouse', ms: 460, tone: 'warn' },
      { system: 'LIMS', action: 'Retention sample of AH-2611-092', result: '20 pieces kept in the retention room · available to repeat firmness and dry matter by grower (PR-MAD-002) · result in 24 h', ms: 390 },
      { system: 'SAP S/4HANA', action: 'Looks for similar complaints in the last 12 months (SAP QM)', result: '4 product complaints · 1 similar: CLM-2026-0934 (ready-to-eat avocado with hard pieces in AH-2609-061)', ms: 540, tone: 'warn' },
      { system: 'Procedimientos', action: 'Consults PR-MAD-002 and PR-REC-001', result: '8D report within 10 working days: before 03/12/2026 · PR-MAD-002 sets the ripening programme per lot and the limit of 25% of pieces out of range · PR-REC-001 only requires the lot average dry matter (minimum 21.0%)', ms: 380 },
      { system: 'Modelo de lenguaje', action: 'Drafts the 8D (D1–D8) with owners by role and dates', result: 'Complete draft · the mix of two origins with different dry matter in a single ripening programme remains a hypothesis to be confirmed', ms: 5200 },
      { system: 'SAP S/4HANA', action: 'Registers the nonconformity and links it to the complaint', result: 'NC-2026-1120 opened as a draft (SAP QM) · linked to CLM-2026-1120', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Drafts the reply in Spanish and its control translation', result: 'Draft ready: acknowledgement, reference NC-2026-1120, precautionary hold on the remaining stock and report date · pending approval', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'AH-2611-092',
      noun: 'lot',
      label: 'Avocado lot',
      fix_title: 'the lot in the complaint',
      systems: 'SAP/Traceability',
      systems_short: 'SAP/Traceability',
      fix_text: 'If the customer copied the lot number wrongly, type the correct one. Agentic Platform looks it up in SAP and field traceability and checks that it matches the product in the complaint before changing anything.',
      same_body: 'It exists in SAP and field traceability and matches the ready-to-eat Hass avocado delivered to Supermercados Levante Fresh. No changes.',
      unknown_hint: 'If the customer lot number is doubtful, ask for a photo of the tray label or of the delivery note.',
      mismatch_body: 'It exists in SAP, but it is not lot AH-2611-092 in the complaint: the record is not changed.',
      known: {
        'AH-2611-097': { kind: 'mismatch', title: 'Lot AH-2611-097 does not match this complaint', body: 'It exists in SAP and comes from the same plots (P-0418 and P-0733), but it was shipped to Hipermercados Ibérica Fresca, with no open complaint. The complaint is about lot AH-2611-092: the record is not changed.' },
        'AH-2611-118': { kind: 'mismatch', title: 'AH-2611-118 belongs to another incident, not to this complaint', body: 'It is the size 18 Hass avocado in room CM-06, affected by the temperature alarm ALM-FRIO-0612. It is not the lot claimed by Supermercados Levante Fresh. The record is not changed.' },
        'MG-2611-KE-031': { kind: 'mismatch', title: 'Lot MG-2611-KE-031 does not match this complaint', body: 'It is a Keitt mango receipt lot included in recall RET-2026-1120 because of the pesticide residue found in the LIMS. It is not the avocado in the complaint. The record is not changed.' }
      }
    },
    sheet: {
      sub: 'Data extracted from the email and checked in SAP S/4HANA, field traceability, WMS and LIMS',
      empty_text: 'Agentic Platform will extract the product, the lot, the delivery note, the percentage of hard pieces, the report and the deadline from the email and check them in SAP, field traceability, WMS and LIMS before preparing the 8D and the reply.',
      rows: [
        { k: 'Reference', v: 'CLM-2026-1120', code: true, sub: 'Customer complaint reference' },
        { k: 'Customer', v: 'Supermercados Levante Fresh, S.A.', sub: 'Supermarket chain · SAP customer · Valencia · contact: Marta Sanchis, Quality Manager' },
        { k: 'Product', v: 'Ready-to-eat Hass avocado, tray of 4 pieces', ok: 'Matches order PED-2026-44718 in SAP' },
        { k: 'Lot', lot: true, ok: 'Exists in SAP and field traceability · received on 05/11/2026 · delivered on 16/11/2026 (4.8 t)' },
        { k: 'Delivery note', v: 'ALB-26-11-1471', code: true, ok: 'Matches SAP · 6 pallets, 4.8 t' },
        { k: 'Discrepancy', v: 'Hard pieces: 35% in its inspection (42 of 120 pieces in 4 stores) vs 22% at our ripening exit', sub: 'Exit analysis: 22% of pieces above 2.5 kgf (LAB-2611-0824)' },
        { k: 'Request', v: 'Analyse the lot, explain the cause of the uneven ripening and credit the affected part', sub: 'The customer has withdrawn the affected trays from sale and holds about 90 trays set aside' },
        { k: 'Evidence', v: '2 documents attached · report INS-LF-2611-33 and delivery note' },
        { k: 'Dates', v: 'Delivery: 16/11/2026 · customer inspection: 18/11/2026 · at Customer Care: 19/11/2026 17:05' },
        { k: 'Deadline', v: 'Acknowledgement within 24 h · 8D report before 03/12/2026', due: true, sub: '10 working days from receipt · PR-MAD-002' },
        { k: 'Record', v: 'NC-2026-1120', code: true, sub: 'Nonconformity in SAP QM, linked to the complaint' }
      ]
    },
    requests: {
      title: 'What the customer asks for',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Acknowledgement of receipt and case number', meta: ['Reply to the customer · NC-2026-1120'], quote: 'Indíquennos por favor el número de su expediente', side: { pending: { status: 'waiting', label: 'Pending approval' }, approved: { status: 'sent', label: 'Sent' }, rejected: { status: 'rejected', label: 'Not sent' } } },
        { icon: 'clock', tone: 'warn', title: 'Analysis of the lot with the retention sample', meta: ['D3 · LIMS · PR-MAD-002'], quote: 'analicen el lote', side: { status: 'review', label: 'To repeat within 24 h' } },
        { icon: 'clock', tone: 'warn', title: 'Cause of the uneven ripening and corrective measures', meta: ['D4, D5 and D7 of the 8D'], quote: 'que nos expliquen la causa de la maduración dispar y nos indiquen las medidas correctivas', side: { status: 'review', label: 'Hypothesis' } },
        { icon: 'clock', tone: 'warn', title: 'Credit the affected part', meta: ['D5 · after the analysis'], quote: 'que abonen la parte afectada', side: { status: 'review', label: 'Still to assess' } },
        { icon: 'check-circle', tone: 'ok', title: 'Can the remaining stock at the centre be held?', meta: ['D3 · 1.4 t of AH-2611-092 and 4 t of AH-2611-101'], quote: 'Hemos retirado de la venta las bandejas afectadas', side: { pending: { status: 'ok', label: 'Located' }, approved: { status: 'hold', label: 'Remaining stock held' }, rejected: { status: 'ok', label: 'Located' } } },
        { icon: 'calendar', tone: 'warn', title: 'Acknowledgement within 24 h and 8D report within 10 working days', meta: ['Sending the 8D (D1–D5)'], quote: 'en un plazo de 10 días hábiles', side: { status: 'pending', label: 'Before 03/12' } }
      ]
    },
    trace: {
      title: 'Trace of lot AH-2611-092',
      sub: 'SAP S/4HANA, field traceability, WMS and LIMS · backwards and forwards',
      button_code: 'AH-2611-092',
      button_label: 'Full trace · 7 documents',
      back_title: 'Backwards',
      back: [
        { time: '05/11', title: 'Receipt · two growers', text: 'Receipt of AH-2611-092 (10 t): P-0418 (plot AX-1187, 6.2 t, dry matter of 24.0%) and P-0733 (plot AX-0942, 3.8 t, dry matter of 20.9%, below the minimum of 21.0%). Only the lot average (22.8%) is checked.', tone: 'warn', ref: 'AH-2611-092', chip: { status: 'open', label: 'Low dry matter in one origin' } },
        { time: '06/11', title: 'Ripening · room CM-03', text: 'MAD-2611-0306 · 10 t with a single RTE-2 programme (ethylene 24 h, 18 °C, 5 days) for both origins · temperature and ethylene within range', tone: 'brand', ref: 'MAD-2611-0306' },
        { time: '11/11', timeSub: '09:40', title: 'Ripening exit of AH-2611-092', text: 'LAB-2611-0824: 22% of pieces above 2.5 kgf vs a limit of 25% · lot released · 20 retention pieces kept', tone: 'ok', ref: 'LAB-2611-0824' },
        { time: '16/11', title: 'Process · from field to customer', route: ['P-0418/0733', 'CM-03', 'LAB-0824', 'AH-092', 'ALB-1471', 'SLF'], route_mark: 'AH-092', text: 'Delivery note ALB-26-11-1471 · 6 pallets (4.8 t) delivered to Supermercados Levante Fresh from the Axarquía Packing Centre', tone: 'brand' },
        { time: '16/11', title: 'Lot controls', text: 'Transport temperature of 6.2 °C compliant · exit analysis compliant · no different ripening programme for the dry matter of each grower', tone: 'warn' }
      ],
      fwd_title: 'Forwards',
      fwd_cols: { id: 'Movement', qty: 'Quantity', when: 'Date', status: 'Status' },
      fwd: [
        { id: 'ALB-26-11-1471', dest: 'Delivery to Supermercados Levante Fresh', sub: 'PED-2026-44718 · AH-2611-092', qty: '4.8 t', when: '16/11/2026', status: { pending: { status: 'shipped', label: 'Delivered' }, approved: { status: 'shipped', label: 'Delivered' }, rejected: { status: 'shipped', label: 'Delivered' } } },
        { id: 'STK-AH092', dest: 'Remaining stock of AH-2611-092 at the centre', sub: 'Finished product warehouse · WMS', qty: '1.4 t', when: '20/11/2026', status: { pending: { status: 'pending', label: 'Hold proposed' }, approved: { status: 'hold', label: 'Held' }, rejected: { status: 'pending', label: 'Hold proposed' } } },
        { id: 'STK-AH101', dest: 'Lot AH-2611-101 ripening (same plots)', sub: 'Room CM-04 · WMS', qty: '4 t', when: '20/11/2026', status: { pending: { status: 'pending', label: 'Hold proposed' }, approved: { status: 'hold', label: 'Held' }, rejected: { status: 'pending', label: 'Hold proposed' } } }
      ],
      fwd_note: 'The same plots (P-0418 and P-0733) also supplied AH-2611-097 (6 t, shipped to Hipermercados Ibérica Fresca on 17/11) and AH-2611-101 (4 t ripening in CM-04): if the hypothesis is confirmed, they must be reviewed. The customer holds about 90 trays set aside and has already withdrawn the affected ones from sale in 4 stores.',
      hypothesis: {
        title: 'Probable cause hypothesis · to be confirmed by the Laboratory',
        icon: 'wrench',
        paras: [
          'The two origins of the lot have different dry matter (24.0% and 20.9%) and ripened together under a single programme; the fruit from P-0733, with less dry matter, may have ripened at a different pace. In CLM-2026-0934 the cause was of that type.',
          'To be clarified: our exit analysis (22% hard pieces) and the customer inspection (35%) differ by 13 points. It may also be due to storage in the stores, a cold chain that is too cold at destination or the sampling of the inspection.',
          'It will be confirmed by repeating firmness and dry matter by grower on the retention sample, reviewing the store temperatures and the transport record. Until then the cause is not communicated to the customer.'
        ]
      }
    },
    history: {
      sub: 'SAP S/4HANA · product complaints in SAP QM · last 12 months',
      col_id: 'Complaint',
      col_product: 'Product and lot',
      col_cause: 'Root cause',
      rows: [
        { id: 'CLM-2026-0934', date: '2026-09-24', product: 'Ready-to-eat Hass avocado, tray of 2 pieces', lot: 'AH-2609-061', description: 'Hard pieces on delivery in 3 stores (30% per the customer)', category: 'Ripening', customer_label: 'Supermarket chain', root_cause: 'Two harvests with different dry matter loaded in the same ripening run under a single programme', nc: 'NC-2026-0301', status: 'closed (09/10/2026)', similar: true },
        { id: 'CLM-2026-0872', date: '2026-08-12', product: 'Keitt mango size 8, 4 kg box', lot: 'MG-2608-KE-019', description: 'Pieces with chilling damage on delivery', category: 'Cold chain', customer_label: 'Wholesaler', root_cause: 'Cold chain break in the truck during loading', nc: 'NC-2026-0262', status: 'closed', similar: false },
        { id: 'CLM-2026-0655', date: '2026-06-30', product: 'Fresh guacamole 200 g', lot: 'GU-2606-014', description: 'Product darkening before the best-before date', category: 'Product quality', customer_label: 'Supermarket chain', root_cause: 'Residual oxygen in the packaging because of a poor seal', nc: 'NC-2026-0210', status: 'closed', similar: false },
        { id: 'CLM-2026-0431', date: '2026-04-21', product: '4 kg box from the online shop', lot: 'AH-2604-044', description: 'Box with bruised fruit from transport', category: 'Logistics', customer_label: 'End consumer (online shop)', root_cause: 'Packaging with slack in the 4 kg box', nc: 'NC-2026-0148', status: 'closed', similar: false }
      ],
      note: {
        title: 'Same type of cause as CLM-2026-0934',
        body: 'Hard pieces in ready-to-eat avocado (24/09/2026): two harvests with different dry matter in a single ripening run under one programme; NC-2026-0301 closed (09/10/2026). If the AH-2611-092 hypothesis is confirmed, it would be the second uneven ripening caused by mixing origins in under two months: the 8D proposes in D7 to separate by dry matter at receipt and to set a ripening programme per origin.'
      }
    },
    plan: {
      title: '8D draft · NC-2026-1120',
      sub: 'Acknowledgement within 24 h · to the customer before 03/12/2026 with D1–D5; D6–D8 in follow-up',
      col_label: 'Discipline',
      containment_status: { pending: { text: 'Pending approval', tone: 'warn' }, approved: { text: 'Applied', tone: 'ok' }, rejected: { text: 'Not applied', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Team', owner: ['Operations and Quality Manager'], date: '2026-11-20', status: { text: 'Proposed', tone: 'draft' }, lead: 'Lead: Operations and Quality Manager.', items: ['Laboratory Manager: repetition of firmness and dry matter on the retention sample', 'Ripening and Cold Chain Manager: loading and programme of room CM-03', 'Reception and Field Manager: origins and dry matter by grower', 'Quality and Food Safety Manager: hold in SAP QM and review of the release criterion', 'Customer Care: contact with the customer'], note: 'External contact: Marta Sanchis, from Supermercados Levante Fresh. The customer also received mango included in recall RET-2026-1120, which is independent.' },
        { d: 'D2', title: 'Problem description', owner: ['Customer Care'], date: '2026-11-20', status: { text: 'Complete', tone: 'ok' }, lead: 'Supermercados Levante Fresh complains because in its inspection 35% of the pieces of lot AH-2611-092 arrive hard, with uneven ripening.', items: ['Lot AH-2611-092 (10 t, received on 05/11/2026), 4.8 t delivered on 16/11/2026 with delivery note ALB-26-11-1471', 'Exit analysis: 22% of pieces out of range (LAB-2611-0824); customer inspection: 35%, 42 of 120 pieces in 4 stores (INS-LF-2611-33)', 'The customer has withdrawn the affected trays from sale and holds about 90 trays set aside', 'Evidence: report and delivery note attached; complaint received on 19/11/2026 17:05'] },
        { d: 'D3', title: 'Containment', owner: ['Quality and Food Safety Manager', 'Laboratory Manager'], date: '2026-11-20', containment: true, items: ['Hold in SAP QM and in the WMS the remaining stock of AH-2611-092 (1.4 t) and lot AH-2611-101 (4 t in CM-04). Requires approval (PR-MAD-002)', 'Repeat firmness and dry matter by grower on the retention sample (result in 24 h)', 'Review lot AH-2611-097 (shipped to Hipermercados Ibérica Fresca), from the same plots', 'Keep the customer informed in writing with reference NC-2026-1120'] },
        { d: 'D4', title: 'Root cause', owner: ['Laboratory Manager', 'Ripening and Cold Chain Manager'], date: '2026-11-27', status: { text: 'Hypothesis', tone: 'warn' }, lead: 'Main hypothesis, to be confirmed: the fruit from P-0733 has less dry matter and ripened at a different pace from that of P-0418 within a single ripening programme.', items: ['In favour: CLM-2026-0934 had a cause of the same type; receipt only checks the lot average dry matter', 'To be clarified: our exit analysis (22%) does not confirm the customer 35%; it may be due to storage in store, temperature at destination or the sampling of the inspection', 'Verification: firmness and dry matter by grower on the retention sample, review of the store temperatures and a 5-whys analysis'] },
        { d: 'D5', title: 'Corrective actions', owner: ['Operations and Quality Manager'], date: '2026-12-03', status: { text: 'Planned', tone: 'info' }, items: ['Credit the affected part of AH-2611-092, depending on the analysis result and the agreement with the customer', 'If the cause is confirmed, separate the origins and review AH-2611-097 and AH-2611-101'] },
        { d: 'D6', title: 'Implementation and effectiveness', owner: ['Ripening and Cold Chain Manager'], date: '2026-12-11', status: { text: 'Planned', tone: 'info' }, items: ['Confirm with the customer that the next deliveries arrive at the eating stage (joint inspection)', 'Check that there are no other customers with hard pieces in lots from P-0418 and P-0733'] },
        { d: 'D7', title: 'Prevention of recurrence', owner: ['Quality and Food Safety Manager'], date: '2026-12-18', status: { text: 'Planned', tone: 'info' }, items: ['Review PR-REC-001: check dry matter by grower and not only the lot average (cause of the same type as NC-2026-0301)', 'Review PR-MAD-002: one ripening programme per origin and do not load together origins with more than 2 points of difference in dry matter', 'Block in SAP QM the lots with mixed origins and no assigned programme before loading them into the room'] },
        { d: 'D8', title: 'Closure and recognition', owner: ['Operations and Quality Manager'], date: '2026-12-23', status: { text: 'Planned', tone: 'info' }, items: ['Final report to Supermercados Levante Fresh and closure of NC-2026-1120 in SAP QM with the effectiveness evidence', 'Recognition of the team'] }
      ]
    },
    reply: {
      to_label: 'to the customer',
      subject: 'RE: Reclamación - Aguacate ready to eat con maduración dispar - Lote AH-2611-092 - Pedido PED-2026-44718 - Ref. NC-2026-1120',
      sub: 'To calidad@supermercados-levante-fresh.example · in Spanish',
      tab_label: 'Spanish · is sent',
      text: [
        'Estimada Sra. Sanchis:',
        '',
        'Gracias por su correo del 19 de noviembre de 2026. Confirmamos la recepción de su reclamación CLM-2026-1120 sobre la maduración del lote AH-2611-092 de aguacate Hass ready to eat (albarán ALB-26-11-1471): su inspección indica que el 35 % de las piezas llega duro. Lamentamos las molestias que esto le ha causado.',
        '',
        'Su número de expediente es NC-2026-1120. Estamos revisando el caso con nuestro Laboratorio y con Calidad, y la reclamación se documentará en un informe 8D.',
        '',
        'Primeros datos de nuestros registros:',
        '- Entrega: hemos localizado el lote AH-2611-092, recibido el 05/11/2026 y entregado el 16/11/2026 (6 palés, 4,8 t, albarán ALB-26-11-1471).',
        '- Análisis: nuestro análisis de la salida de maduración del 11/11/2026 dio un 22 % de piezas por encima del límite de firmeza. Repetiremos el ensayo en la muestra de retención.',
        '- Existencias: hemos propuesto retener de forma cautelar el remanente del lote que conservamos en el centro.',
        '',
        'Próximos pasos:',
        '- El resultado del nuevo ensayo estará en unas 24 horas y se lo comunicaremos.',
        '- Le enviaremos por escrito el informe con la explicación de la diferencia y las medidas correctivas, a más tardar el 3 de diciembre de 2026.',
        '- Le agradeceríamos que nos envíe fotografías de las bandejas afectadas, la temperatura de conservación en cada tienda y la fecha y hora de recepción, y que mantenga aparte las bandejas que conserva. Nuestro equipo de Calidad se pondrá en contacto con usted.',
        '',
        'Un saludo,',
        '',
        'Atención al cliente',
        'Subtropicales Axarquía · Centro de manipulado de la Axarquía (Málaga)',
        'atencion.cliente@subtropicales-axarquia.example'
      ].join('\n'),
      highlights: [
        { text: 'NC-2026-1120', label: 'Reference', tone: 'brand' },
        { text: 'hemos propuesto retener de forma cautelar el remanente', label: 'Containment', tone: 'brand' },
        { text: 'a más tardar el 3 de diciembre de 2026', label: 'Commitment', tone: 'brand' }
      ],
      llm_instructions: [
        'Warm, formal and professional tone, from Subtropicales Axarquía Customer Care to Marta Sanchis, Quality Manager of Supermercados Levante Fresh, a supermarket chain complaining about the uneven ripening of a ready-to-eat avocado. Express regret for the inconvenience without admitting fault.',
        'Thank her for her email of 19 November 2026 and acknowledge receipt of complaint CLM-2026-1120 about lot AH-2611-092 (ready-to-eat Hass avocado, delivery note ALB-26-11-1471): her inspection shows that 35% of the pieces arrive hard.',
        'Give the case number NC-2026-1120 and say that it is being reviewed with the Laboratory and Quality and will be documented in an 8D report.',
        'First facts: lot received on 05/11/2026 and delivered on 16/11/2026 (6 pallets, 4.8 t); the analysis at the ripening exit of 11/11/2026 gave 22% of pieces above the firmness limit and will be repeated on the retention sample (result in about 24 hours); a precautionary hold on the remaining stock at the centre is proposed.',
        'Next steps: communicate the result of the new test, send in writing the report with the explanation and the corrective measures by 3 December 2026 at the latest, ask for photographs, the storage temperature in each store and the date and time of receipt, and that she keeps the trays set aside; say that Quality will contact her.',
        'Do not anticipate the cause (neither the mix of origins with different dry matter nor the earlier complaint CLM-2026-0934) and do not promise credit or judge the customer figure as right or wrong. Do not mention recall RET-2026-1120.',
        'Write in Spanish. Signature: Atención al cliente · Subtropicales Axarquía · Centro de manipulado de la Axarquía (Málaga) · atencion.cliente@subtropicales-axarquia.example'
      ],
      criterion: 'Drafting criterion: confirms facts from SAP, field traceability, WMS and LIMS and commits to dates; does not anticipate the cause (the mixed origins hypothesis is not confirmed) and does not promise credit.',
      control: {
        label: 'Control translation (English)',
        note: 'Control translation for Quality and for the approver; it is not sent.',
        edited_note: 'The translation corresponds to Agentic Platform draft; the edited version includes changes by Operations in the Spanish text.',
        subject: 'RE: Complaint - Avocado ready to eat with uneven ripening - Lot AH-2611-092 - Order PED-2026-44718 - Ref. NC-2026-1120',
        text: [
          'Dear Ms Sanchis,',
          '',
          'Thank you for your email of 19 November 2026. We confirm receipt of your complaint CLM-2026-1120 about the ripening of lot AH-2611-092 of ready-to-eat Hass avocado (delivery note ALB-26-11-1471): your inspection shows that 35% of the pieces arrive hard. We are sorry for the inconvenience.',
          '',
          'Your case number is NC-2026-1120. We are reviewing the case with our Laboratory and with Quality, and the complaint will be documented in an 8D report.',
          '',
          'Initial findings from our records:',
          '- Delivery: we have located lot AH-2611-092, received on 05/11/2026 and delivered on 16/11/2026 (6 pallets, 4.8 t, delivery note ALB-26-11-1471).',
          '- Analysis: our analysis at the ripening exit of 11/11/2026 gave 22% of pieces above the firmness limit. We will repeat the test on the retention sample.',
          '- Stock: we have proposed a precautionary hold on the remaining stock of the lot that we hold at the centre.',
          '',
          'Next steps:',
          '- The result of the new test will be available in about 24 hours and we will tell you.',
          '- We will send you in writing the report with the explanation of the difference and the corrective measures, by 3 December 2026 at the latest.',
          '- We would be grateful if you could send us photographs of the affected trays, the storage temperature in each store and the date and time of receipt, and keep the trays that you hold set aside. Our Quality team will contact you.',
          '',
          'Kind regards,',
          '',
          'Customer Care',
          'Subtropicales Axarquía · Axarquía Packing Centre (Málaga)',
          'atencion.cliente@subtropicales-axarquia.example'
        ].join('\n')
      }
    },
    approval: {
      title: 'Reply to Supermercados Levante Fresh and containment',
      approver: 'Operations and Quality Manager',
      policy: 'PR-MAD-002 · PR-REC-001',
      summary: {
        pending: 'Agentic Platform has prepared the reply in Spanish for calidad@supermercados-levante-fresh.example and the precautionary hold on the remaining stock. Nothing is sent or held until Operations and Quality approves.',
        approved: 'Operations and Quality has approved the reply and the containment. Agentic Platform has sent the email to calidad@supermercados-levante-fresh.example, held the remaining stock in SAP QM and in the WMS and updated NC-2026-1120.',
        rejected: 'Operations and Quality has rejected the proposal: the reply has not been sent and no stock has been held.'
      },
      scope: [
        { label: 'Reply in Spanish', state: { pending: { status: 'pending', chip: 'Send' }, approved: { status: 'sent', chip: 'Sent' }, rejected: { status: 'rejected', chip: 'Not sent' } } },
        { label: 'Remaining stock of AH-2611-092 and lot AH-2611-101', value: '1.4 t + 4 t · SAP QM and WMS', state: { pending: { status: 'pending', chip: 'Hold' }, approved: { status: 'hold', chip: 'Held' }, rejected: { status: 'rejected', chip: 'Not held' } } },
        { label: 'Credit for the affected part', value: '4.8 t delivered · AH-2611-092', state: { status: 'evaluate', chip: 'After the analysis' } }
      ],
      effects: [
        'Outlook: reply sent from atencion.cliente@subtropicales-axarquia.example',
        'SAP S/4HANA: remaining stock of AH-2611-092 held in SAP QM and complaint CLM-2026-1120 moved to "In progress" with the reply attached',
        'WMS: lot AH-2611-101 held in room CM-04 until firmness is confirmed'
      ],
      approve_label: 'Approve and send',
      next_step: 'Next step: repeat firmness and dry matter on the retention sample (D3) and send the 8D report before 03/12/2026.',
      toast_approved: 'Reply sent to Supermercados Levante Fresh · remaining stock held in SAP QM and WMS',
      reject_text: 'The reply is not sent and no stock is held. The reason is kept in the audit log.',
      reject_placeholder: 'For example: wait for the result of the new test before replying',
      reject_audit: 'nothing is sent or held',
      toast_rejected: 'Reply rejected: nothing has been sent and no stock has been held'
    },
    compare: {
      rows: [
        { k: 'People involved', hoy: '4–5: Customer Care, Quality, Laboratory, Ripening and Reception', pro_strong: '1', pro: ': Operations and Quality reviews, corrects if needed and approves' },
        { k: 'Systems to open', hoy: '6: Outlook, SAP, field traceability, LIMS, WMS and spreadsheets', pro_strong: '1', pro: ': this console; Agentic Platform queries all 5' }
      ],
      steps_today: '15–20 searches, cross-checks and write-ups by hand',
      time_label: 'Trace, 8D draft and reply',
      time_today: '3–6 h of work, spread over 1–2 days',
      footer: 'Proposed acceptance criterion for the pilot: trace and draft in under 15 minutes, and Operations and Quality accepts the draft with minor edits in at least 70% of cases.'
    },
    audit: {
      requested: { action: 'Complaint analysis requested', detail: 'CLM-2026-1120 · email from calidad@supermercados-levante-fresh.example of 19/11/2026 17:05' },
      analyzed: { action: 'Complaint analysed', detail: 'CLM-2026-1120 · lot AH-2611-092' },
      after_analysis: [
        { action: 'Nonconformity registered as draft', detail: 'NC-2026-1120 · SAP QM · linked to CLM-2026-1120' },
        { action: '8D draft prepared', detail: 'NC-2026-1120 · D1–D8 · mixed origins as a hypothesis' },
        { action: 'Customer reply drafted', detail: 'CLM-2026-1120 · Spanish · version 1 · pending approval' }
      ],
      approved: { action: 'Reply approved and sent', detail: 'CLM-2026-1120 · to calidad@supermercados-levante-fresh.example · NC-2026-1120' },
      after_approval: [
        { action: 'Precautionary hold applied', detail: 'SAP QM and WMS · AH-2611-092 (1.4 t) and AH-2611-101 (4 t)' },
        { action: 'Case updated', detail: 'NC-2026-1120 · In progress · reply attached' }
      ]
    },
    outcome_label: 'Reply sent · NC-2026-1120 in progress',
    toast_analyzed: 'Complaint analysed · 8D and reply drafted',
    status_chips: { idle: 'Open · not analysed', pending: 'Awaiting approval', approved: 'Reply sent · 8D in progress', rejected: 'Reply rejected' },
    report: {
      button: 'Download 8D report',
      title: '8D report · complaint CLM-2026-1120',
      subtitle: 'Uneven ripening of ready-to-eat avocado · lot AH-2611-092 · Supermercados Levante Fresh, S.A.',
      filename: '8D-report-NC-2026-1120-CLM-2026-1120',
      meta: [['Site', 'Axarquía Packing Centre (Málaga)'], ['Complaint', 'CLM-2026-1120 · 19/11/2026'], ['Lot', 'AH-2611-092'], ['Report to customer', 'before 03/12/2026']],
      state: { pending: 'Draft · pending approval', approved: 'Approved for sending · D4 open', rejected: 'Draft · reply rejected' },
      summary: [
        'Complaint from Supermercados Levante Fresh about the uneven ripening of lot AH-2611-092 of ready-to-eat Hass avocado: its inspection (INS-LF-2611-33) shows 35% hard pieces (42 of 120 in 4 stores); our analysis at the ripening exit (LAB-2611-0824) gave 22% of pieces above 2.5 kgf. 4.8 t were delivered on 16/11/2026 and the customer has withdrawn the affected trays from sale.',
        'Cause hypothesis, to be confirmed by the Laboratory: two origins with different dry matter (24.0% and 20.9%) ripened together under a single programme; storage in the stores and the sampling of the inspection are also being assessed.'
      ],
      trace_heading: 'Annex A · Lot trace',
      trace_rows: [
        { etapa: 'Receipt', fecha: '05/11/2026', detalle: 'Receipt of 10 t from two growers: P-0418 (6.2 t, dry matter of 24.0%) and P-0733 (3.8 t, 20.9%); only the lot average (22.8%) is checked', ref: 'AH-2611-092' },
        { etapa: 'Ripening', fecha: '06/11/2026', detalle: 'Loading of 10 t in room CM-03 with a single RTE-2 programme (ethylene 24 h, 18 °C, 5 days) · WMS', ref: 'MAD-2611-0306' },
        { etapa: 'Exit', fecha: '11/11/2026 09:40', detalle: '22% of pieces above 2.5 kgf vs a limit of 25% · lot released · 20 retention pieces kept', ref: 'LAB-2611-0824' },
        { etapa: 'Lot', fecha: '12/11/2026', detalle: 'Lot of ready-to-eat Hass avocado, tray of 4 pieces · SAP S/4HANA', ref: 'AH-2611-092' },
        { etapa: 'Controls', fecha: '16/11/2026', detalle: 'Room temperature and ethylene (compliant); exit analysis (compliant); transport at 6.2 °C (compliant); no different ripening programme for the dry matter of each grower', ref: '—' },
        { etapa: 'Delivery', fecha: '16/11/2026', detalle: '6 pallets (4.8 t) delivered to Supermercados Levante Fresh, S.A. (Valencia) · order PED-2026-44718', ref: 'ALB-26-11-1471' },
        { etapa: 'Complaint', fecha: '18/11/2026', detalle: 'Customer inspection in 4 stores with 35% hard pieces', ref: 'INS-LF-2611-33' },
        { etapa: 'Other lots', fecha: '17/11 and 18/11/2026', detalle: 'Lots from the same plots: AH-2611-097 (6 t shipped to Hipermercados Ibérica Fresca) and AH-2611-101 (4 t ripening in CM-04)', ref: 'AH-2611-097/101' }
      ],
      units: {
        heading: 'Annex B · Documents and movements of the file (7)',
        cols: [{ label: 'No.', key: 'n', num: true }, { label: 'Document', key: 'doc' }, { label: 'Reference', key: 'ref', mono: true }, { label: 'Date', key: 'fecha' }, { label: 'Status', key: 'estado', status: true }, { label: 'System', key: 'sistema' }],
        rows: [
          { n: '1', doc: 'Receipt of 10 t from two growers', ref: 'AH-2611-092', fecha: '05/11/2026', estado: 'Received', sistema: 'Trazabilidad de campo' },
          { n: '2', doc: 'Ripening load of 10 t in CM-03', ref: 'MAD-2611-0306', fecha: '06/11/2026', estado: 'Closed', sistema: 'WMS' },
          { n: '3', doc: 'Firmness analysis at the ripening exit', ref: 'LAB-2611-0824', fecha: '11/11/2026', estado: 'Released', sistema: 'LIMS' },
          { n: '4', doc: 'Ready-to-eat avocado lot', ref: 'AH-2611-092', fecha: '12/11/2026', estado: 'Under review', sistema: 'SAP S/4HANA' },
          { n: '5', doc: 'Delivery note of 4.8 t to Supermercados Levante Fresh', ref: 'ALB-26-11-1471', fecha: '16/11/2026', estado: 'Delivered', sistema: 'SAP S/4HANA' },
          { n: '6', doc: 'Remaining stock of AH-2611-092 (1.4 t)', ref: 'STK-AH092', fecha: '20/11/2026', estado: 'Available', estado_after: 'Held', sistema: 'WMS' },
          { n: '7', doc: 'Lot AH-2611-101 ripening (4 t)', ref: 'STK-AH101', fecha: '20/11/2026', estado: 'Available', estado_after: 'Held', sistema: 'WMS' }
        ]
      },
      history_heading: 'Annex C · Previous complaints (12 months)',
      approvals: [
        { paso: '8D and reply drafts', rol: 'Agentic Platform · Customer complaints agent', kind: 'agent' },
        { paso: 'Reply to the customer and containment (D3)', rol: 'Operations and Quality Manager', kind: 'reply' },
        { paso: 'Root cause confirmation (D4)', rol: 'Laboratory Manager', kind: 'pending' },
        { paso: 'Closure of the 8D (D8)', rol: 'Quality and Food Safety Manager', kind: 'pending' }
      ],
      second_signer: { role: 'Quality and Food Safety Manager', note: 'Cause confirmation (D4) and closure (D8) · pending' }
    },
    presenter: {
      running: 'While it runs: point out the LIMS line (low dry matter in one origin) and the WMS line (a single ripening programme for both). If needed, "Speed up".',
      idle: [
        'Email from Marta Sanchis, of Supermercados Levante Fresh: her inspection shows 35% hard pieces in lot AH-2611-092 of ready-to-eat avocado. It arrived on Thursday 19/11 at 17:05, in Spanish and with deadlines: acknowledgement within 24 h and 8D report within 10 working days.',
        'In production, Agentic Platform analyses it as soon as it reaches the Customer Care mailbox. Here we launch it by hand to see what it does and which systems it queries.'
      ],
      pending: [
        'What is highlighted in the email is what Agentic Platform has extracted. Each item is checked in SAP, field traceability, WMS and LIMS: the lot exists, the delivery note matches and the exit analysis was compliant.',
        'The trace: receipt on 05/11 from two growers, ripening in CM-03 on 06/11, exit on 11/11 with 22% of pieces out of range and delivery of 4.8 t on 16/11. The same plots are in two other lots.',
        'The fact that changes the investigation: the two origins have different dry matter and ripened under a single programme. It is a hypothesis, not the cause: the Laboratory confirms it with a new test.',
        'History: in September there was an uneven ripening with a cause of the same type (CLM-2026-0934). The 8D covers it in prevention (D7).',
        'The reply in Spanish confirms facts and dates and does not anticipate the cause or promise credit. It does not go out until Operations and Quality approves it.'
      ],
      approved: [
        'Approved: reply sent, remaining stock held and nonconformity NC-2026-1120 in progress in SAP QM. Everything is kept in the audit log.',
        'The comparison below: today, 4–5 people and 6 systems for hours; here, one review and one approval. The "today" figure is measured in the pilot, not invented.',
        'The 8D report downloads as a controlled document: code, revision, status, approvals and page number.'
      ],
      next: {
        idle: 'Press "Analyse complaint" and read aloud two lines of the log: the system queried and what it finds.',
        pending: 'Press "Review and approve" (above) or scroll down to the reply and press "Approve and send". Optional: "Correct" the lot with a non-existent one to show it does not invent data.',
        approved: 'Press "Download 8D report" and show the document header. Then move on to "Procedures" in the sidebar.'
      }
    }
  }
});
