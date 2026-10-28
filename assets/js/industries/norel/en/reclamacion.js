/* Norel Nutrición Animal · complaint CLM-2026-1028 (vitamin E 18% lower than declared in premix batch PRM-2610-0388, from Piensos Cuenca Mediterráneo). English version.
 * Demo scenario with synthetic data (MFM). */
agenticPackEn('norel', {
  reclamacion: {
    code: 'CLM-2026-1028',
    nav: 'Complaint CLM-2026-1028',
    title: 'Complaint CLM-2026-1028',
    agent: 'Customer complaints',
    analyze_label: 'Analyse complaint',
    nc: 'NC-2026-1028',
    form: { code: 'REG-CAL-012-02', rev: '3' },
    received: { date: '2026-10-27', time: '16:20' },
    due: '2026-11-10',
    holidays: [],
    customer_line: 'Piensos Cuenca Mediterráneo, S.A. · feed mill for ruminants · Cuenca',
    due_line: 'Acknowledgement within 24 h · 8D report before 10/11/2026',
    cust_name: 'Elena Marín (Piensos Cuenca Mediterráneo)',
    cust_addr: 'calidad@piensos-cuenca-mediterraneo.example',
    own_name: 'Customer Care and Orders, Norel Nutrición Animal',
    own_addr: 'atencion.cliente@norel-nutricion.example',
    mail_domain: 'norel-nutricion.example',
    mail_sub: 'calidad@piensos-cuenca-mediterraneo.example · mailbox atencion.cliente@norel-nutricion.example · Spanish',
    mail_title: 'Customer email',
    mail_tab_label: 'Email (Spanish)',
    attachments: ['CLM-2026-1028_informe_LAB-CLI-2610-77.pdf', 'CLM-2026-1028_albaran_ALB-26-10-1088.pdf'],
    email_text: [
      'From: Elena Marín <calidad@piensos-cuenca-mediterraneo.example>',
      'To: Atención al cliente y pedidos, Norel Nutrición Animal <atencion.cliente@norel-nutricion.example>',
      'Date: Tue, 27 Oct 2026 16:20 (hora de Madrid)',
      'Subject: Reclamación - Vitamina E inferior a la declarada - Premezcla vacuno de leche lote PRM-2610-0388 - Informe LAB-CLI-2610-77',
      '',
      'Buenos días:',
      '',
      'Les escribimos desde el departamento de calidad de Piensos Cuenca Mediterráneo, S.A. para reclamar por el lote de premezcla que nos suministraron el pasado 16/10/2026.',
      '',
      'Producto: Premezcla de vitaminas y oligoelementos para vacuno de leche',
      'Lote: PRM-2610-0388',
      'Albarán: ALB-26-10-1088 (10 t) · Pedido: PV-26-10-0471',
      'Informe de análisis: LAB-CLI-2610-77 (nuestro laboratorio, 26/10/2026)',
      '',
      'Según nuestro análisis, el contenido de vitamina E es de 9.840 mg/kg, un 18 % inferior a los 12.000 mg/kg declarados en la etiqueta. Con este lote hemos fabricado 3 lotes de pienso para vacuno de leche y hemos suspendido su uso; nos quedan unas 4 t en el silo. Adjuntamos el informe de análisis y el albarán.',
      '',
      'Solicitamos que analicen la muestra de retención del lote, que nos expliquen la causa de la diferencia y nos indiquen las medidas correctivas, y que sustituyan o abonen la parte afectada.',
      '',
      'Les pedimos el acuse de recibo en 24 horas y un informe 8D por escrito en un plazo de 10 días hábiles. Indíquennos por favor el número de su expediente.',
      '',
      'Un saludo,',
      '',
      'Elena Marín',
      'Responsable de calidad',
      'Piensos Cuenca Mediterráneo, S.A.'
    ].join('\n'),
    mail_extra: {
      label: 'English translation',
      note: 'Control translation for the review; the original in Spanish is the one that counts.',
      headers: { From: 'Agentic Platform · control translation of the email from calidad@piensos-cuenca-mediterraneo.example', Date: 'Tue, 27 Oct 2026 16:20', Subject: 'Complaint · Vitamin E lower than declared · Dairy cattle premix batch PRM-2610-0388 · Report LAB-CLI-2610-77' },
      text: [
        'Good morning,',
        '',
        'We are writing from the quality department of Piensos Cuenca Mediterráneo, S.A. to complain about the premix batch you supplied to us on 16/10/2026.',
        '',
        'Product: Vitamin and trace mineral premix for dairy cattle',
        'Batch: PRM-2610-0388',
        'Delivery note: ALB-26-10-1088 (10 t) · Order: PV-26-10-0471',
        'Analysis report: LAB-CLI-2610-77 (our laboratory, 26/10/2026)',
        '',
        'According to our analysis, the vitamin E content is 9,840 mg/kg, 18% lower than the 12,000 mg/kg declared on the label. We have made 3 batches of dairy cattle feed with this batch and have suspended its use; we have about 4 t left in the silo. We attach the analysis report and the delivery note.',
        '',
        'We ask that you analyse the retention sample of the batch, explain the cause of the difference and tell us the corrective measures, and replace or credit the affected part.',
        '',
        'We ask for an acknowledgement of receipt within 24 hours and a written 8D report within 10 working days. Please let us know your case number.',
        '',
        'Kind regards,',
        '',
        'Elena Marín',
        'Quality Manager',
        'Piensos Cuenca Mediterráneo, S.A.'
      ].join('\n'),
      highlights: [
        { text: '12,000 mg/kg declared on the label', label: 'Declared vitamin E', tone: 'ok' },
        { text: '9,840 mg/kg, 18% lower', label: 'Vitamin E per customer', tone: 'crit' },
        { text: 'within 24 hours', label: 'Deadline', tone: 'warn' },
        { text: 'within 10 working days', label: 'Deadline', tone: 'warn' }
      ]
    },
    highlights: [
      { text: 'Premezcla de vitaminas y oligoelementos para vacuno de leche', label: 'Product', tone: 'brand' },
      { text: 'PRM-2610-0388', label: 'Batch', tone: 'brand' },
      { text: 'ALB-26-10-1088', label: 'Delivery note', tone: 'brand' },
      { text: 'LAB-CLI-2610-77', label: 'Customer report' },
      { text: '12.000 mg/kg declarados', label: 'Declared vitamin E', tone: 'ok' },
      { text: '9.840 mg/kg, un 18 % inferior', label: 'Vitamin E per customer', tone: 'crit' },
      { text: 'Adjuntamos el informe de análisis y el albarán.', label: 'Evidence' },
      { text: 'hemos suspendido su uso', label: 'Customer containment' },
      { text: 'el acuse de recibo en 24 horas', label: 'Deadline' },
      { text: 'en un plazo de 10 días hábiles', label: 'Deadline' }
    ],
    run: {
      title: '"Customer complaint" workflow',
      sub: 'Triggered when a complaint reaches the Customer Care and Orders mailbox · PR-LAB-005',
      graph_title: 'Customer complaint workflow',
      idle_footer: 'Reads the email, extracts and validates the data, traces the batch and prepares the 8D and the reply. Nothing goes out without the approval of the Operations and Quality Manager.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Customer email', sub: 'Customer Care and Orders mailbox', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extraction and validation', systems: ['Modelo de lenguaje', 'Salesforce CRM'], icon: 'search' },
        { id: 'traza', label: 'Batch trace', systems: ['Salesforce CRM', 'SAP S/4HANA', 'MES de planta', 'LIMS'], icon: 'git-branch' },
        { id: 'historico', label: 'History, 8D and reply', systems: ['Salesforce CRM', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Operations and quality approval', sub: 'Operations and Quality Manager' },
        { id: 'salida', kind: 'output', label: 'Reply and containment', systems: ['Outlook', 'SAP S/4HANA', 'Salesforce CRM'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'approved' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Batches with the same vitamin E · MP-2610-VE-044', value: 3, tone: 'warn' },
        { label: 'Vitamin E difference · 12,000 declared vs 9,840 mg/kg', value: '-18%', tone: 'warn' },
        { label: 'Similar complaint · CLM-2026-0731', value: 1, tone: 'warn' },
        { label: 'Working days left for the 8D report · due 10/11/2026', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Reads the email from calidad@piensos-cuenca-mediterraneo.example in the atencion.cliente@norel-nutricion.example mailbox (27/10/2026 16:20)', result: 'Customer complaint in Spanish · 2 documents attached (report LAB-CLI-2610-77 and delivery note)', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extracts the complaint data', result: 'PRM-2610-0388 · vitamin and trace mineral premix for dairy cattle · vitamin E 9,840 mg/kg vs 12,000 declared (-18%) · report LAB-CLI-2610-77 · acknowledgement within 24 h and 8D report within 10 working days', ms: 2900 },
      { system: 'Salesforce CRM', action: 'Validates the extracted customer and order', result: 'The customer exists: Piensos Cuenca Mediterráneo, S.A. (Cuenca) · order PV-26-10-0471 with delivery note ALB-26-10-1088 of 16/10/2026. Matches the email', ms: 410, tone: 'ok' },
      { system: 'SAP S/4HANA', action: 'Delivery note and batch delivered', result: 'ALB-26-10-1088: 10 t of PRM-2610-0388 delivered on 16/10/2026 · label with vitamin E of 12,000 mg/kg declared', ms: 380 },
      { system: 'MES de planta', action: 'Manufacturing order of the batch', result: 'OF-2610-0388 of 13/10/2026 at the Premix Plant (Spain) · consumes MP-2610-VE-044 (vitamin E acetate 50%) · weighing within tolerance and line cleaning compliant (PR-PRO-003)', ms: 350 },
      { system: 'LIMS', action: 'Release analysis of the batch', result: 'LAB-2610-0871 (14/10/2026): vitamin E 11,950 mg/kg vs 12,000 declared (-0.4%) · batch released · retention sample kept', ms: 520 },
      { system: 'SAP S/4HANA', action: 'Raw material MP-2610-VE-044', result: 'Received on 06/10/2026 from Nutrivit Ingredients, S.L. · supplier certificate with a potency of 50.4% · no own potency test at receipt', ms: 430, tone: 'warn' },
      { system: 'SAP S/4HANA', action: 'Other batches made with the same raw material', result: 'PRM-2610-0391 (14 t, delivered to Piensos del Ebro on 19/10/2026) and PRM-2610-0402 (12 t in the warehouse) · remaining stock of PRM-2610-0388: 2 t · remaining stock of MP-2610-VE-044: 1.2 t', ms: 460, tone: 'warn' },
      { system: 'LIMS', action: 'Retention sample of PRM-2610-0388', result: 'Available to repeat the vitamin E test by HPLC (PR-LAB-005) · result in 48 h', ms: 390 },
      { system: 'Salesforce CRM', action: 'Looks for similar complaints in the last 12 months', result: '4 complaints with an open case · 1 similar: CLM-2026-0731 (vitamin A 14% lower than declared in PRM-2607-0215)', ms: 540, tone: 'warn' },
      { system: 'Procedimientos', action: 'Consults PR-LAB-005 and PR-REG-002', result: '8D report within 10 working days: before 10/11/2026 · PR-LAB-005 requires repeating the test on the retention sample with a reference method before concluding · PR-REG-002 sets the additive declaration', ms: 380 },
      { system: 'Modelo de lenguaje', action: 'Drafts the 8D (D1–D8) with owners by role and dates', result: 'Complete draft · the potency of the vitamin E in MP-2610-VE-044 remains a hypothesis to be confirmed', ms: 5200 },
      { system: 'SAP S/4HANA', action: 'Registers the nonconformity and links it to the complaint', result: 'NC-2026-1028 opened as a draft (SAP QM) · linked to CLM-2026-1028', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Drafts the reply in Spanish and its control translation', result: 'Draft ready: acknowledgement, reference NC-2026-1028, precautionary block of the remaining stock and report date · pending approval', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'PRM-2610-0388',
      noun: 'batch',
      label: 'Premix batch',
      fix_title: 'the batch in the complaint',
      systems: 'SAP/MES',
      systems_short: 'SAP/MES',
      fix_text: 'If the customer copied the batch number wrongly, type the correct one. Agentic Platform looks it up in SAP and the MES and checks that it matches the product in the complaint before changing anything.',
      same_body: 'It exists in SAP and the MES and matches the vitamin and trace mineral premix for dairy cattle delivered to Piensos Cuenca Mediterráneo. No changes.',
      unknown_hint: 'If the customer batch number is doubtful, ask for a photo of the bag label or of the delivery note.',
      mismatch_body: 'It exists in SAP, but it is not batch PRM-2610-0388 in the complaint: the record is not changed.',
      known: {
        'PRM-2610-0391': { kind: 'mismatch', title: 'Batch PRM-2610-0391 does not match this complaint', body: 'It exists in SAP and was made with the same vitamin E (MP-2610-VE-044), but it is a vitamin and mineral premix for poultry delivered to Piensos del Ebro, with no open complaint. The complaint is about batch PRM-2610-0388: the record is not changed.' },
        'PRM-2610-0417': { kind: 'mismatch', title: 'PRM-2610-0417 belongs to another incident, not to this complaint', body: 'It is a vitamin premix for pigs included in recall RET-2026-1028 because of the Salmonella found in MP-2610-CC-118. It is not the batch claimed by Piensos Cuenca Mediterráneo. The record is not changed.' },
        'PRM-2610-0402': { kind: 'mismatch', title: 'Batch PRM-2610-0402 does not match this complaint', body: 'It exists in the MES, but it is a 12 t batch still in the finished product warehouse, with no deliveries and no complaint. The record is not changed.' }
      }
    },
    sheet: {
      sub: 'Data extracted from the email and checked in SAP S/4HANA, the plant MES and the LIMS',
      empty_text: 'Agentic Platform will extract the product, the batch, the delivery note, the claimed content, the report and the deadline from the email and check them in SAP, the MES and the LIMS before preparing the 8D and the reply.',
      rows: [
        { k: 'Reference', v: 'CLM-2026-1028', code: true, sub: 'Customer complaint reference' },
        { k: 'Customer', v: 'Piensos Cuenca Mediterráneo, S.A.', sub: 'Feed mill for ruminants · Salesforce customer · Cuenca · contact: Elena Marín, Quality Manager' },
        { k: 'Product', v: 'Vitamin and trace mineral premix for dairy cattle', ok: 'Matches order PV-26-10-0471 in SAP' },
        { k: 'Batch', lot: true, ok: 'Exists in SAP and the MES · made on 13/10/2026 · delivered on 16/10/2026 (10 t)' },
        { k: 'Delivery note', v: 'ALB-26-10-1088', code: true, ok: 'Matches SAP · 10 t' },
        { k: 'Discrepancy', v: 'Vitamin E: 9,840 mg/kg in its analysis vs 12,000 mg/kg declared (-18%)', sub: 'Our release analysis: 11,950 mg/kg (LAB-2610-0871)' },
        { k: 'Request', v: 'Analyse the retention sample, explain the cause and replace or credit the affected part', sub: 'The customer has suspended use and holds about 4 t in the silo' },
        { k: 'Evidence', v: '2 documents attached · report LAB-CLI-2610-77 and delivery note' },
        { k: 'Dates', v: 'Delivery: 16/10/2026 · customer analysis: 26/10/2026 · at Customer Care: 27/10/2026 16:20' },
        { k: 'Deadline', v: 'Acknowledgement within 24 h · 8D report before 10/11/2026', due: true, sub: '10 working days from receipt · PR-LAB-005' },
        { k: 'Record', v: 'NC-2026-1028', code: true, sub: 'Nonconformity in SAP QM, linked to the complaint' }
      ]
    },
    requests: {
      title: 'What the customer asks for',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Acknowledgement of receipt and case number', meta: ['Reply to the customer · NC-2026-1028'], quote: 'Indíquennos por favor el número de su expediente', side: { pending: { status: 'waiting', label: 'Pending approval' }, approved: { status: 'sent', label: 'Sent' }, rejected: { status: 'rejected', label: 'Not sent' } } },
        { icon: 'clock', tone: 'warn', title: 'Analysis of the retention sample of the batch', meta: ['D3 · LIMS · PR-LAB-005'], quote: 'analicen la muestra de retención del lote', side: { status: 'review', label: 'To repeat within 48 h' } },
        { icon: 'clock', tone: 'warn', title: 'Cause of the difference and corrective measures', meta: ['D4, D5 and D7 of the 8D'], quote: 'que nos expliquen la causa de la diferencia y nos indiquen las medidas correctivas', side: { status: 'review', label: 'Hypothesis' } },
        { icon: 'clock', tone: 'warn', title: 'Replace or credit the affected part', meta: ['D5 · after the analysis'], quote: 'que sustituyan o abonen la parte afectada', side: { status: 'review', label: 'Still to assess' } },
        { icon: 'check-circle', tone: 'ok', title: 'Can the remaining stock at the plant be blocked?', meta: ['D3 · 2 t of PRM-2610-0388 and 1.2 t of MP-2610-VE-044'], quote: 'hemos suspendido su uso', side: { pending: { status: 'ok', label: 'Located' }, approved: { status: 'hold', label: 'Remaining stock blocked' }, rejected: { status: 'ok', label: 'Located' } } },
        { icon: 'calendar', tone: 'warn', title: 'Acknowledgement within 24 h and 8D report within 10 working days', meta: ['Sending the 8D (D1–D5)'], quote: 'en un plazo de 10 días hábiles', side: { status: 'pending', label: 'Before 10/11' } }
      ]
    },
    trace: {
      title: 'Trace of batch PRM-2610-0388',
      sub: 'SAP S/4HANA, plant MES and LIMS · backwards and forwards',
      button_code: 'PRM-2610-0388',
      button_label: 'Full trace · 7 documents',
      back_title: 'Backwards',
      back: [
        { time: '06/10', title: 'Raw material · vitamin E acetate 50%', text: 'Receipt of MP-2610-VE-044 from Nutrivit Ingredients, S.L. with a supplier certificate of 50.4% potency. Potency was not tested at receipt.', tone: 'warn', ref: 'MP-2610-VE-044', chip: { status: 'open', label: 'Potency not verified at receipt' } },
        { time: '13/10', title: 'Manufacturing · order in the plant MES', text: 'OF-2610-0388 · 12 t of vitamin and trace mineral premix for dairy cattle · vitamin E weighing within tolerance · line cleaning compliant', tone: 'brand', ref: 'OF-2610-0388' },
        { time: '14/10', timeSub: '09:12', title: 'Release of batch PRM-2610-0388', text: 'LAB-2610-0871: vitamin E 11,950 mg/kg vs 12,000 declared (-0.4%) · batch released · retention sample kept', tone: 'ok', ref: 'LAB-2610-0871' },
        { time: '16/10', title: 'Process · from raw material to customer', route: ['VE-044', 'OF-0388', 'LAB-0871', 'PRM-0388', 'ALB-1088', 'PCM'], route_mark: 'PRM-0388', text: 'Delivery note ALB-26-10-1088 · 10 t delivered to Piensos Cuenca Mediterráneo from the Premix Plant (Spain)', tone: 'brand' },
        { time: '16/10', title: 'Batch controls', text: 'Weighing and line cleaning compliant · release analysis compliant · no potency control of the vitamin E per raw material batch at receipt', tone: 'warn' }
      ],
      fwd_title: 'Forwards',
      fwd_cols: { id: 'Movement', qty: 'Quantity', when: 'Date', status: 'Status' },
      fwd: [
        { id: 'ALB-26-10-1088', dest: 'Delivery to Piensos Cuenca Mediterráneo', sub: 'PV-26-10-0471 · PRM-2610-0388', qty: '10 t', when: '16/10/2026', status: { pending: { status: 'shipped', label: 'Delivered' }, approved: { status: 'shipped', label: 'Delivered' }, rejected: { status: 'shipped', label: 'Delivered' } } },
        { id: 'STK-0388', dest: 'Remaining stock of PRM-2610-0388 at the plant', sub: 'Finished product warehouse · SAP QM', qty: '2 t', when: '28/10/2026', status: { pending: { status: 'pending', label: 'Block proposed' }, approved: { status: 'hold', label: 'Blocked' }, rejected: { status: 'pending', label: 'Block proposed' } } },
        { id: 'STK-VE044', dest: 'Remaining stock of MP-2610-VE-044', sub: 'Raw materials warehouse · SAP QM', qty: '1.2 t', when: '28/10/2026', status: { pending: { status: 'pending', label: 'Block proposed' }, approved: { status: 'hold', label: 'Blocked' }, rejected: { status: 'pending', label: 'Block proposed' } } }
      ],
      fwd_note: 'The same vitamin E (MP-2610-VE-044) was also used in PRM-2610-0391 (14 t, delivered to Piensos del Ebro on 19/10) and in PRM-2610-0402 (12 t in the warehouse): if the hypothesis is confirmed, they must be reviewed. The customer holds about 4 t of PRM-2610-0388 in the silo and has already made 3 batches of feed.',
      hypothesis: {
        title: 'Probable cause hypothesis · to be confirmed by the Laboratory',
        icon: 'wrench',
        paras: [
          'The actual potency of the vitamin E in MP-2610-VE-044 could be lower than the supplier certificate (50.4%), without having been detected at receipt; in CLM-2026-0731 the cause was of that type with vitamin A.',
          'To be clarified: Norel release analysis (11,950 mg/kg) and the customer analysis (9,840 mg/kg) differ by 18%. It may also be due to sampling in the customer silo (segregation) or to the analytical method of each laboratory.',
          'It will be confirmed by repeating the HPLC test on the retention sample, comparing the raw material and reviewing the customer method and sampling point. Until then the cause is not communicated to the customer.'
        ]
      }
    },
    history: {
      sub: 'Salesforce CRM · complaints with an open case · last 12 months',
      col_id: 'Complaint',
      col_product: 'Product and batch',
      col_cause: 'Root cause',
      rows: [
        { id: 'CLM-2026-0731', date: '2026-07-21', product: 'Vitamin premix for beef cattle', lot: 'PRM-2607-0215', description: 'Vitamin A 14% lower than declared according to the customer analysis', category: 'Additive content', customer_label: 'Feed mill', root_cause: 'Potency of the vitamin A raw material batch lower than the supplier certificate', nc: 'NC-2026-0188', status: 'closed (06/08/2026)', similar: true },
        { id: 'CLM-2026-0644', date: '2026-06-10', product: 'Premix for aquaculture', lot: 'PRM-2606-0102', description: 'Product caking in the bag after transport', category: 'Physical quality', customer_label: 'Integrator group', root_cause: 'High product moisture at bagging', nc: 'NC-2026-0161', status: 'closed', similar: false },
        { id: 'CLM-2026-0452', date: '2026-05-04', product: 'ADDIPETS additive for pets', lot: 'PRM-2605-0067', description: 'Label with a wrong additive declaration', category: 'Labelling', customer_label: 'Pet food manufacturer', root_cause: 'Label template with an earlier version of the declaration (PR-REG-002)', nc: 'NC-2026-0117', status: 'closed', similar: false },
        { id: 'CLM-2026-0208', date: '2026-03-18', product: 'Premix for poultry', lot: 'PRM-2603-0044', description: 'Pallets with damaged bags on delivery', category: 'Logistics', customer_label: 'Integrator group', root_cause: 'Incorrect load stowage on the truck', nc: 'NC-2026-0063', status: 'closed', similar: false }
      ],
      note: {
        title: 'Same type of cause as CLM-2026-0731',
        body: 'Vitamin A 14% lower than declared (21/07/2026): raw material potency lower than the supplier certificate; NC-2026-0188 closed (06/08/2026). If the MP-2610-VE-044 hypothesis is confirmed, it would be the second vitamin content difference caused by raw material potency in under four months: the 8D proposes in D7 to verify vitamin potency at the receipt of each raw material batch.'
      }
    },
    plan: {
      title: '8D draft · NC-2026-1028',
      sub: 'Acknowledgement within 24 h · to the customer before 10/11/2026 with D1–D5; D6–D8 in follow-up',
      col_label: 'Discipline',
      containment_status: { pending: { text: 'Pending approval', tone: 'warn' }, approved: { text: 'Applied', tone: 'ok' }, rejected: { text: 'Not applied', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Team', owner: ['Operations and Quality Manager'], date: '2026-10-28', status: { text: 'Proposed', tone: 'draft' }, lead: 'Lead: Operations and Quality Manager.', items: ['Laboratory Manager: repetition of the vitamin E test and comparison of methods', 'Plant Manager: order OF-2610-0388, weighings and line cleaning', 'Quality and Feed Safety Manager (HACCP): block in SAP QM and review of raw material receipt', 'Norel Solutions (technical advisor) and Customer Care and Orders: contact with the customer'], note: 'External contact: Elena Marín, from Piensos Cuenca Mediterráneo, and the supplier Nutrivit Ingredients. The customer also appears in recall RET-2026-1028, which is independent.' },
        { d: 'D2', title: 'Problem description', owner: ['Customer Care and Orders'], date: '2026-10-28', status: { text: 'Complete', tone: 'ok' }, lead: 'Piensos Cuenca Mediterráneo complains because its analysis shows a vitamin E content of 9,840 mg/kg in PRM-2610-0388, 18% lower than the 12,000 mg/kg declared.', items: ['Batch PRM-2610-0388 (12 t, made on 13/10/2026), 10 t delivered on 16/10/2026 with delivery note ALB-26-10-1088', 'Norel release analysis: 11,950 mg/kg (LAB-2610-0871); customer analysis: 9,840 mg/kg (LAB-CLI-2610-77)', 'The customer has made 3 batches of feed with the product, has suspended its use and holds about 4 t in the silo', 'Evidence: report and delivery note attached; complaint received on 27/10/2026 16:20'] },
        { d: 'D3', title: 'Containment', owner: ['Quality and Feed Safety Manager (HACCP)', 'Laboratory Manager'], date: '2026-10-28', containment: true, items: ['Block in SAP QM the remaining stock of PRM-2610-0388 (2 t) and of MP-2610-VE-044 (1.2 t). Requires approval (PR-LAB-005)', 'Repeat the vitamin E test by HPLC on the retention sample of the batch (result in 48 h)', 'Review batches PRM-2610-0391 (delivered to Piensos del Ebro) and PRM-2610-0402 (in the warehouse), made with the same raw material', 'Keep the customer informed in writing with reference NC-2026-1028'] },
        { d: 'D4', title: 'Root cause', owner: ['Laboratory Manager', 'Plant Manager'], date: '2026-11-04', status: { text: 'Hypothesis', tone: 'warn' }, lead: 'Main hypothesis, to be confirmed: the potency of the vitamin E in MP-2610-VE-044 is lower than the supplier certificate and was not detected at receipt.', items: ['In favour: CLM-2026-0731 had a cause of the same type (vitamin A potency lower than the certificate); there is no own potency test at receipt', 'To be clarified: Norel release analysis (11,950 mg/kg) does not confirm the difference; it may be due to sampling in the customer silo or to the analytical method', 'Verification: HPLC test on the retention sample and on the raw material, review of the customer method and a 5-whys analysis'] },
        { d: 'D5', title: 'Corrective actions', owner: ['Operations and Quality Manager'], date: '2026-11-10', status: { text: 'Planned', tone: 'info' }, items: ['Replace or credit the affected part of PRM-2610-0388, depending on the analysis result and the agreement with the customer', 'If the cause is confirmed, claim from the supplier Nutrivit Ingredients and review PRM-2610-0391 and PRM-2610-0402'] },
        { d: 'D6', title: 'Implementation and effectiveness', owner: ['Norel Solutions (technical advisor)'], date: '2026-11-20', status: { text: 'Planned', tone: 'info' }, items: ['Confirm with the customer that the replaced product meets the declaration (joint analysis)', 'Check that there are no other customers with vitamin E differences in batches made with MP-2610-VE-044'] },
        { d: 'D7', title: 'Prevention of recurrence', owner: ['Quality and Feed Safety Manager (HACCP)'], date: '2026-11-27', status: { text: 'Planned', tone: 'info' }, items: ['Review PR-LAB-005: verify the potency of vitamins at the receipt of each raw material batch (cause of the same type as NC-2026-0188)', 'Block in SAP QM the vitamin batches without potency verification before their use in manufacturing', 'Review with Regulatory Affairs the declaration of vitamins on the label (PR-REG-002)'] },
        { d: 'D8', title: 'Closure and recognition', owner: ['Operations and Quality Manager'], date: '2026-12-04', status: { text: 'Planned', tone: 'info' }, items: ['Final report to Piensos Cuenca Mediterráneo and closure of NC-2026-1028 in SAP QM with the effectiveness evidence', 'Recognition of the team'] }
      ]
    },
    reply: {
      to_label: 'to the customer',
      subject: 'RE: Reclamación - Vitamina E inferior a la declarada - Premezcla vacuno de leche lote PRM-2610-0388 - Informe LAB-CLI-2610-77 - Ref. NC-2026-1028',
      sub: 'To calidad@piensos-cuenca-mediterraneo.example · in Spanish',
      tab_label: 'Spanish · is sent',
      text: [
        'Estimada Sra. Marín:',
        '',
        'Gracias por su correo del 27 de octubre de 2026. Confirmamos la recepción de su reclamación CLM-2026-1028 sobre el contenido de vitamina E del lote PRM-2610-0388 de premezcla de vitaminas y oligoelementos para vacuno de leche (albarán ALB-26-10-1088): su análisis indica 9.840 mg/kg frente a los 12.000 mg/kg declarados. Lamentamos las molestias que esto le ha causado.',
        '',
        'Su número de expediente es NC-2026-1028. Estamos revisando el caso con nuestro Laboratorio y con Calidad, y la reclamación se documentará en un informe 8D.',
        '',
        'Primeros datos de nuestros registros:',
        '- Entrega: hemos localizado el lote PRM-2610-0388, fabricado el 13/10/2026 y entregado el 16/10/2026 (10 t, albarán ALB-26-10-1088).',
        '- Análisis: nuestro análisis de liberación del 14/10/2026 dio 11.950 mg/kg. Repetiremos el ensayo en la muestra de retención con un método de referencia.',
        '- Existencias: hemos propuesto bloquear de forma cautelar el remanente del lote que conservamos en la planta.',
        '',
        'Próximos pasos:',
        '- El resultado del nuevo ensayo estará en unas 48 horas y se lo comunicaremos.',
        '- Le enviaremos por escrito el informe con la explicación de la diferencia y las medidas correctivas, a más tardar el 10 de noviembre de 2026.',
        '- Le agradeceríamos que nos indique el método analítico, la fecha y el punto de toma de la muestra, y que mantenga aparte las 4 t que conserva en el silo. Su asesor técnico de Norel Solutions se pondrá en contacto con usted.',
        '',
        'Un saludo,',
        '',
        'Atención al cliente y pedidos',
        'Norel Nutrición Animal · Madrid',
        'atencion.cliente@norel-nutricion.example'
      ].join('\n'),
      highlights: [
        { text: 'NC-2026-1028', label: 'Reference', tone: 'brand' },
        { text: 'hemos propuesto bloquear de forma cautelar el remanente', label: 'Containment', tone: 'brand' },
        { text: 'a más tardar el 10 de noviembre de 2026', label: 'Commitment', tone: 'brand' }
      ],
      llm_instructions: [
        'Warm, formal and professional tone, from Norel Nutrición Animal Customer Care and Orders to Elena Marín, Quality Manager of Piensos Cuenca Mediterráneo, a feed mill complaining about the vitamin E of a premix. Express regret for the inconvenience without admitting fault.',
        'Thank her for her email of 27 October 2026 and acknowledge receipt of complaint CLM-2026-1028 about batch PRM-2610-0388 (vitamin and trace mineral premix for dairy cattle, delivery note ALB-26-10-1088): her analysis shows 9,840 mg/kg of vitamin E against 12,000 mg/kg declared.',
        'Give the case number NC-2026-1028 and say that it is being reviewed with the Laboratory and Quality and will be documented in an 8D report.',
        'First facts: batch made on 13/10/2026 and delivered on 16/10/2026 (10 t); the release analysis of 14/10/2026 gave 11,950 mg/kg and will be repeated on the retention sample with a reference method (result in about 48 hours); a precautionary block of the remaining stock at the plant is proposed.',
        'Next steps: communicate the result of the new test, send in writing the report with the explanation and the corrective measures by 10 November 2026 at the latest, ask for the analytical method, the date and the sampling point and that she keeps the 4 t in the silo set aside; say that Norel Solutions will contact her.',
        'Do not anticipate the cause (neither the potency of the vitamin E in MP-2610-VE-044 nor the earlier complaint CLM-2026-0731) and do not promise replacement or credit or judge the customer figure as right or wrong. Do not mention recall RET-2026-1028.',
        'Write in Spanish. Signature: Atención al cliente y pedidos · Norel Nutrición Animal · Madrid · atencion.cliente@norel-nutricion.example'
      ],
      criterion: 'Drafting criterion: confirms facts from SAP, the MES and the LIMS and commits to dates; does not anticipate the cause (the raw material potency hypothesis is not confirmed) and does not promise replacement or credit.',
      control: {
        label: 'Control translation (English)',
        note: 'Control translation for Regulatory Affairs and for the approver; it is not sent.',
        edited_note: 'The translation corresponds to Agentic Platform draft; the edited version includes changes by Operations in the Spanish text.',
        subject: 'RE: Complaint - Vitamin E lower than declared - Dairy cattle premix batch PRM-2610-0388 - Report LAB-CLI-2610-77 - Ref. NC-2026-1028',
        text: [
          'Dear Ms Marín,',
          '',
          'Thank you for your email of 27 October 2026. We confirm receipt of your complaint CLM-2026-1028 about the vitamin E content of batch PRM-2610-0388 of vitamin and trace mineral premix for dairy cattle (delivery note ALB-26-10-1088): your analysis shows 9,840 mg/kg against the 12,000 mg/kg declared. We are sorry for the inconvenience.',
          '',
          'Your case number is NC-2026-1028. We are reviewing the case with our Laboratory and with Quality, and the complaint will be documented in an 8D report.',
          '',
          'Initial findings from our records:',
          '- Delivery: we have located batch PRM-2610-0388, made on 13/10/2026 and delivered on 16/10/2026 (10 t, delivery note ALB-26-10-1088).',
          '- Analysis: our release analysis of 14/10/2026 gave 11,950 mg/kg. We will repeat the test on the retention sample with a reference method.',
          '- Stock: we have proposed a precautionary block of the remaining stock of the batch that we hold at the plant.',
          '',
          'Next steps:',
          '- The result of the new test will be available in about 48 hours and we will tell you.',
          '- We will send you in writing the report with the explanation of the difference and the corrective measures, by 10 November 2026 at the latest.',
          '- We would be grateful if you could tell us the analytical method, the date and the sampling point, and keep the 4 t that you hold in the silo set aside. Your Norel Solutions technical advisor will contact you.',
          '',
          'Kind regards,',
          '',
          'Customer Care and Orders',
          'Norel Nutrición Animal · Madrid',
          'atencion.cliente@norel-nutricion.example'
        ].join('\n')
      }
    },
    approval: {
      title: 'Reply to Piensos Cuenca Mediterráneo and containment',
      approver: 'Operations and Quality Manager',
      policy: 'PR-LAB-005 · PR-REG-002',
      summary: {
        pending: 'Agentic Platform has prepared the reply in Spanish for calidad@piensos-cuenca-mediterraneo.example and the precautionary block of the remaining stock. Nothing is sent or blocked until Operations and Quality approves.',
        approved: 'Operations and Quality has approved the reply and the containment. Agentic Platform has sent the email to calidad@piensos-cuenca-mediterraneo.example, blocked the remaining stock in SAP QM and updated NC-2026-1028.',
        rejected: 'Operations and Quality has rejected the proposal: the reply has not been sent and no stock has been blocked.'
      },
      scope: [
        { label: 'Reply in Spanish', state: { pending: { status: 'pending', chip: 'Send' }, approved: { status: 'sent', chip: 'Sent' }, rejected: { status: 'rejected', chip: 'Not sent' } } },
        { label: 'Remaining stock of PRM-2610-0388 and MP-2610-VE-044', value: '2 t + 1.2 t · SAP QM', state: { pending: { status: 'pending', chip: 'Block' }, approved: { status: 'hold', chip: 'Blocked' }, rejected: { status: 'rejected', chip: 'Not blocked' } } },
        { label: 'Replacement or credit of the affected part', value: '10 t delivered · PRM-2610-0388', state: { status: 'evaluate', chip: 'After the analysis' } }
      ],
      effects: [
        'Outlook: reply sent from atencion.cliente@norel-nutricion.example',
        'SAP S/4HANA: remaining stock of PRM-2610-0388 and MP-2610-VE-044 blocked in SAP QM',
        'Salesforce CRM: the Piensos Cuenca Mediterráneo case moves to "In progress" with the reply attached'
      ],
      approve_label: 'Approve and send',
      next_step: 'Next step: repeat the vitamin E test on the retention sample (D3) and send the 8D report before 10/11/2026.',
      toast_approved: 'Reply sent to Piensos Cuenca Mediterráneo · remaining stock blocked in SAP QM',
      reject_text: 'The reply is not sent and no stock is blocked. The reason is kept in the audit log.',
      reject_placeholder: 'For example: wait for the result of the new test before replying',
      reject_audit: 'nothing is sent or blocked',
      toast_rejected: 'Reply rejected: nothing has been sent and no stock has been blocked'
    },
    compare: {
      rows: [
        { k: 'People involved', hoy: '4–5: Customer Care, Quality, Laboratory, Plant and Norel Solutions', pro_strong: '1', pro: ': Operations and Quality reviews, corrects if needed and approves' },
        { k: 'Systems to open', hoy: '6: Outlook, Salesforce, SAP, MES, LIMS and SharePoint', pro_strong: '1', pro: ': this console; Agentic Platform queries all 5' }
      ],
      steps_today: '15–20 searches, cross-checks and write-ups by hand',
      time_label: 'Trace, 8D draft and reply',
      time_today: '3–6 h of work, spread over 1–2 days',
      footer: 'Proposed acceptance criterion for the pilot: trace and draft in under 15 minutes, and Operations and Quality accepts the draft with minor edits in at least 70% of cases.'
    },
    audit: {
      requested: { action: 'Complaint analysis requested', detail: 'CLM-2026-1028 · email from calidad@piensos-cuenca-mediterraneo.example of 27/10/2026 16:20' },
      analyzed: { action: 'Complaint analysed', detail: 'CLM-2026-1028 · batch PRM-2610-0388' },
      after_analysis: [
        { action: 'Nonconformity registered as draft', detail: 'NC-2026-1028 · SAP QM · linked to CLM-2026-1028' },
        { action: '8D draft prepared', detail: 'NC-2026-1028 · D1–D8 · vitamin E potency as a hypothesis' },
        { action: 'Customer reply drafted', detail: 'CLM-2026-1028 · Spanish · version 1 · pending approval' }
      ],
      approved: { action: 'Reply approved and sent', detail: 'CLM-2026-1028 · to calidad@piensos-cuenca-mediterraneo.example · NC-2026-1028' },
      after_approval: [
        { action: 'Precautionary block applied', detail: 'SAP QM · PRM-2610-0388 (2 t) and MP-2610-VE-044 (1.2 t)' },
        { action: 'Case updated', detail: 'NC-2026-1028 · In progress · reply attached' }
      ]
    },
    outcome_label: 'Reply sent · NC-2026-1028 in progress',
    toast_analyzed: 'Complaint analysed · 8D and reply drafted',
    status_chips: { idle: 'Open · not analysed', pending: 'Awaiting approval', approved: 'Reply sent · 8D in progress', rejected: 'Reply rejected' },
    report: {
      button: 'Download 8D report',
      title: '8D report · complaint CLM-2026-1028',
      subtitle: 'Vitamin E 18% lower than declared · batch PRM-2610-0388 · Piensos Cuenca Mediterráneo, S.A.',
      filename: '8D-report-NC-2026-1028-CLM-2026-1028',
      meta: [['Site', 'Premix Plant (Spain) · Madrid'], ['Complaint', 'CLM-2026-1028 · 27/10/2026'], ['Batch', 'PRM-2610-0388'], ['Report to customer', 'before 10/11/2026']],
      state: { pending: 'Draft · pending approval', approved: 'Approved for sending · D4 open', rejected: 'Draft · reply rejected' },
      summary: [
        'Complaint from Piensos Cuenca Mediterráneo about the vitamin E content of batch PRM-2610-0388 of premix for dairy cattle: its analysis (LAB-CLI-2610-77) shows 9,840 mg/kg against 12,000 mg/kg declared (-18%); Norel release analysis (LAB-2610-0871) gave 11,950 mg/kg. 10 t were delivered on 16/10/2026 and the customer has suspended its use.',
        'Cause hypothesis, to be confirmed by the Laboratory: potency of the vitamin E in MP-2610-VE-044 lower than the supplier certificate, not detected at receipt; the customer sampling and the analytical method are also being assessed.'
      ],
      trace_heading: 'Annex A · Batch trace',
      trace_rows: [
        { etapa: 'Raw material', fecha: '06/10/2026', detalle: 'Receipt of vitamin E acetate 50% from Nutrivit Ingredients, S.L. with a certificate of 50.4% potency; no potency test at receipt', ref: 'MP-2610-VE-044' },
        { etapa: 'Manufacturing', fecha: '13/10/2026', detalle: 'Manufacturing order of 12 t of premix for dairy cattle at the Premix Plant (Spain) · plant MES', ref: 'OF-2610-0388' },
        { etapa: 'Release', fecha: '14/10/2026 09:12', detalle: 'Vitamin E 11,950 mg/kg vs 12,000 declared (-0.4%) · batch released · retention sample kept', ref: 'LAB-2610-0871' },
        { etapa: 'Batch', fecha: '14/10/2026', detalle: 'Batch of vitamin and trace mineral premix for dairy cattle · SAP S/4HANA', ref: 'PRM-2610-0388' },
        { etapa: 'Controls', fecha: '16/10/2026', detalle: 'Weighing (compliant); line cleaning (compliant); release analysis (compliant); no potency control of the vitamin E per raw material batch at receipt', ref: '—' },
        { etapa: 'Delivery', fecha: '16/10/2026', detalle: '10 t delivered to Piensos Cuenca Mediterráneo, S.A. (Cuenca) · order PV-26-10-0471', ref: 'ALB-26-10-1088' },
        { etapa: 'Complaint', fecha: '26/10/2026', detalle: 'Customer analysis with a vitamin E of 9,840 mg/kg', ref: 'LAB-CLI-2610-77' },
        { etapa: 'Other batches', fecha: '15/10 and 20/10/2026', detalle: 'Batches made with the same raw material: PRM-2610-0391 (14 t delivered to Piensos del Ebro) and PRM-2610-0402 (12 t in the warehouse)', ref: 'PRM-2610-0391/0402' }
      ],
      units: {
        heading: 'Annex B · Documents and movements of the file (7)',
        cols: [{ label: 'No.', key: 'n', num: true }, { label: 'Document', key: 'doc' }, { label: 'Reference', key: 'ref', mono: true }, { label: 'Date', key: 'fecha' }, { label: 'Status', key: 'estado', status: true }, { label: 'System', key: 'sistema' }],
        rows: [
          { n: '1', doc: 'Receipt of vitamin E acetate 50%', ref: 'MP-2610-VE-044', fecha: '06/10/2026', estado: 'Received', sistema: 'SAP S/4HANA' },
          { n: '2', doc: 'Manufacturing order of 12 t', ref: 'OF-2610-0388', fecha: '13/10/2026', estado: 'Closed', sistema: 'MES de planta' },
          { n: '3', doc: 'Vitamin E release analysis', ref: 'LAB-2610-0871', fecha: '14/10/2026', estado: 'Released', sistema: 'LIMS' },
          { n: '4', doc: 'Premix batch for dairy cattle', ref: 'PRM-2610-0388', fecha: '14/10/2026', estado: 'Under review', sistema: 'SAP S/4HANA' },
          { n: '5', doc: 'Delivery note of 10 t to Piensos Cuenca Mediterráneo', ref: 'ALB-26-10-1088', fecha: '16/10/2026', estado: 'Delivered', sistema: 'SAP S/4HANA' },
          { n: '6', doc: 'Remaining stock of PRM-2610-0388 (2 t)', ref: 'STK-0388', fecha: '28/10/2026', estado: 'Available', estado_after: 'Blocked', sistema: 'SAP S/4HANA' },
          { n: '7', doc: 'Remaining stock of MP-2610-VE-044 (1.2 t)', ref: 'STK-VE044', fecha: '28/10/2026', estado: 'Available', estado_after: 'Blocked', sistema: 'SAP S/4HANA' }
        ]
      },
      history_heading: 'Annex C · Previous complaints (12 months)',
      approvals: [
        { paso: '8D and reply drafts', rol: 'Agentic Platform · Customer complaints agent', kind: 'agent' },
        { paso: 'Reply to the customer and containment (D3)', rol: 'Operations and Quality Manager', kind: 'reply' },
        { paso: 'Root cause confirmation (D4)', rol: 'Laboratory Manager', kind: 'pending' },
        { paso: 'Closure of the 8D (D8)', rol: 'Quality and Feed Safety Manager (HACCP)', kind: 'pending' }
      ],
      second_signer: { role: 'Quality and Feed Safety Manager (HACCP)', note: 'Cause confirmation (D4) and closure (D8) · pending' }
    },
    presenter: {
      running: 'While it runs: point out the SAP line (vitamin E received without a potency test) and the Salesforce line (similar vitamin A complaint). If needed, "Speed up".',
      idle: [
        'Email from Elena Marín, of Piensos Cuenca Mediterráneo: her analysis shows 18% less vitamin E than declared in batch PRM-2610-0388. It arrived on Tuesday 27/10 at 16:20, in Spanish and with deadlines: acknowledgement within 24 h and 8D report within 10 working days.',
        'In production, Agentic Platform analyses it as soon as it reaches the Customer Care and Orders mailbox. Here we launch it by hand to see what it does and which systems it queries.'
      ],
      pending: [
        'What is highlighted in the email is what Agentic Platform has extracted. Each item is checked in SAP, the MES and the LIMS: the batch exists, the delivery note matches and the release analysis was compliant.',
        'The trace: vitamin E received on 06/10, manufacturing on 13/10, release on 14/10 with 11,950 mg/kg and delivery of 10 t on 16/10. The same raw material is in two other batches.',
        'The fact that changes the investigation: the potency of MP-2610-VE-044 only appears in the supplier certificate. It is a hypothesis, not the cause: the Laboratory confirms it with a new test.',
        'History: in July there was a vitamin A difference with a cause of the same type (CLM-2026-0731). The 8D covers it in prevention (D7).',
        'The reply in Spanish confirms facts and dates and does not anticipate the cause or promise replacement. It does not go out until Operations and Quality approves it.'
      ],
      approved: [
        'Approved: reply sent, remaining stock blocked and nonconformity NC-2026-1028 in progress in SAP QM. Everything is kept in the audit log.',
        'The comparison below: today, 4–5 people and 6 systems for hours; here, one review and one approval. The "today" figure is measured in the pilot, not invented.',
        'The 8D report downloads as a controlled document: code, revision, status, approvals and page number.'
      ],
      next: {
        idle: 'Press "Analyse complaint" and read aloud two lines of the log: the system queried and what it finds.',
        pending: 'Press "Review and approve" (above) or scroll down to the reply and press "Approve and send". Optional: "Correct" the batch with a non-existent one to show it does not invent data.',
        approved: 'Press "Download 8D report" and show the document header. Then move on to "Procedures" in the sidebar.'
      }
    }
  }
});
