/* Autopista Multimotor · complaint REC-2026-0512 (APR dispute on José María López's Seat Ibiza financing with Banco Sabadell). English version.
 * Demo scenario with synthetic data (MFM). */
agenticPackEn('autopista', {
  reclamacion: {
    code: 'REC-2026-0512',
    nav: 'Complaint REC-2026-0512',
    title: 'Complaint REC-2026-0512',
    agent: 'Customer complaints',
    analyze_label: 'Analyse complaint',
    nc: 'CAS-2026-0512',
    form: { code: 'REG-ATC-012-02', rev: '3' },
    received: { date: '2026-10-03', time: '10:14' },
    due: '2026-10-09',
    holidays: [],
    customer_line: 'José María López · private customer · Seat Ibiza financed with Banco Sabadell',
    due_line: 'Reply before 09/10/2026',
    cust_name: 'José María López',
    cust_addr: 'jm.lopez@correo-demo.example',
    own_name: 'Customer Service, Autopista Multimotor',
    own_addr: 'atencion.cliente@autopista-multimotor.example',
    mail_domain: 'autopista-multimotor.example',
    mail_sub: 'jm.lopez@correo-demo.example · mailbox atencion.cliente@autopista-multimotor.example · Spanish',
    mail_title: 'Customer email',
    mail_tab_label: 'Email (Spanish)',
    attachments: ['REC-2026-0512_oferta_firmada.pdf', 'REC-2026-0512_contrato_financiacion.pdf'],
    email_text: [
      'From: José María López <jm.lopez@correo-demo.example>',
      'To: Atención al cliente, Autopista Multimotor <atencion.cliente@autopista-multimotor.example>',
      'Date: Sat, 03 Oct 2026 10:14 (hora de Madrid)',
      'Subject: Reclamación - TAE de la financiación distinta de la acordada - Seat Ibiza VIN-2026-MAD-SEAT-03 - Contrato FIN-2026-08841',
      '',
      'Buenos días:',
      '',
      'Compré un Seat Ibiza en su concesionario de Madrid y necesito que revisen con urgencia las condiciones de mi financiación.',
      '',
      'Vehículo: Seat Ibiza 1.0 TSI FR',
      'Bastidor: VIN-2026-MAD-SEAT-03',
      'Contrato de financiación: FIN-2026-08841 (Banco Sabadell)',
      'Fecha de la firma: 18/09/2026',
      'Referencia de la oferta: Q-2026-5127-02',
      '',
      'En la oferta que firmé el 16/09/2026 se me indicaba una TAE del 3,99 %, pero el contrato que me han pasado a la firma el 18/09/2026 recoge una TAE del 4,25 %. Nadie me avisó del cambio y lo he visto ahora, al revisar el cuadro de amortización. Adjunto la oferta firmada y el contrato.',
      '',
      'Solicito que se corrija el contrato a la TAE acordada del 3,99 %, o que se me permita cancelarlo sin penalización. Les pido que no se cobre la primera cuota hasta que se aclare.',
      '',
      'Les pido una respuesta por escrito en un plazo de 5 días hábiles, con la explicación de la diferencia y la copia de los documentos firmados. Confirmen por favor la recepción e indíquenme el número de su expediente.',
      '',
      'Un saludo,',
      '',
      'José María López'
    ].join('\n'),
    mail_extra: {
      label: 'English translation',
      note: 'Control translation for the review; the original in Spanish is the one that counts.',
      headers: { From: 'Agentic Platform · control translation of the email from jm.lopez@correo-demo.example', Date: 'Sat, 03 Oct 2026 10:14', Subject: 'Complaint · APR different from the agreed one · Seat Ibiza VIN-2026-MAD-SEAT-03 · contract FIN-2026-08841' },
      text: [
        'Good morning,',
        '',
        'I bought a Seat Ibiza at your Madrid dealership and I need you to urgently review the terms of my financing.',
        '',
        'Vehicle: Seat Ibiza 1.0 TSI FR',
        'Chassis number: VIN-2026-MAD-SEAT-03',
        'Financing contract: FIN-2026-08841 (Banco Sabadell)',
        'Signing date: 18/09/2026',
        'Offer reference: Q-2026-5127-02',
        '',
        'The offer I signed on 16/09/2026 stated an APR of 3.99%, but the contract I was given to sign on 18/09/2026 shows an APR of 4.25%. Nobody told me about the change and I have only now seen it, while reviewing the amortisation schedule. I attach the signed offer and the contract.',
        '',
        'I request that the contract be corrected to the agreed APR of 3.99%, or that I be allowed to cancel it without penalty. Please do not collect the first instalment until this is clarified.',
        '',
        'I ask for a written reply within 5 working days, with the explanation of the difference and a copy of the signed documents. Please confirm receipt and let me know your case number.',
        '',
        'Kind regards,',
        '',
        'José María López'
      ].join('\n'),
      highlights: [
        { text: 'an APR of 3.99%', label: 'Agreed APR', tone: 'ok' },
        { text: 'an APR of 4.25%', label: 'APR in contract', tone: 'crit' },
        { text: 'within 5 working days', label: 'Deadline', tone: 'warn' }
      ]
    },
    highlights: [
      { text: 'Seat Ibiza 1.0 TSI FR', label: 'Vehicle', tone: 'brand' },
      { text: 'VIN-2026-MAD-SEAT-03', label: 'VIN', tone: 'brand' },
      { text: 'FIN-2026-08841', label: 'Contract', tone: 'brand' },
      { text: 'Q-2026-5127-02', label: 'Offer' },
      { text: 'TAE del 3,99 %', label: 'Agreed APR', tone: 'ok' },
      { text: 'TAE del 4,25 %', label: 'APR in contract', tone: 'crit' },
      { text: 'Adjunto la oferta firmada y el contrato.', label: 'Evidence' },
      { text: 'no se cobre la primera cuota', label: 'Collection' },
      { text: 'en un plazo de 5 días hábiles', label: 'Deadline' }
    ],
    run: {
      title: '“Customer complaint” workflow',
      sub: 'Triggered when a complaint reaches the Customer Service mailbox · PNT-ATC-012',
      graph_title: 'Customer complaint workflow',
      idle_footer: 'Reads the email, extracts and validates the data, traces the sale and prepares the 8D and the reply. Nothing goes out without the Operations Manager’s approval.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Customer email', sub: 'Customer Service mailbox', systems: ['Google Workspace'], icon: 'mail' },
        { id: 'extraccion', label: 'Extraction and validation', systems: ['Modelo de lenguaje', 'Salesforce CRM'], icon: 'search' },
        { id: 'traza', label: 'Sale trace', systems: ['Salesforce CRM', 'DocuSign', 'SAP ERP', 'Odoo Inventario'], icon: 'git-branch' },
        { id: 'historico', label: 'History, 8D and reply', systems: ['Salesforce CRM', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Operations approval', sub: 'Operations Manager' },
        { id: 'salida', kind: 'output', label: 'Reply and containment', systems: ['Google Workspace', 'SAP ERP', 'Salesforce CRM'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'approved' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Contract instalments · 48 months, the 1st due on 01/11', value: 48 },
        { label: 'APR difference · 3.99% agreed vs 4.25%', value: '+0.26 pp', tone: 'warn' },
        { label: 'Similar complaint · REC-2026-0318', value: 1, tone: 'warn' },
        { label: 'Working days left for the reply · due 09/10/2026', due: true }
      ]
    },
    steps: [
      { system: 'Google Workspace', action: 'Reads the email from jm.lopez@correo-demo.example in the atencion.cliente@autopista-multimotor.example mailbox (03/10/2026 10:14)', result: 'Customer complaint in Spanish · 2 documents attached (signed offer and contract)', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extracts the complaint data', result: 'VIN-2026-MAD-SEAT-03 · Seat Ibiza 1.0 TSI FR · contract FIN-2026-08841 · APR 3.99% agreed vs 4.25% in the contract · reply within 5 working days', ms: 2900 },
      { system: 'Salesforce CRM', action: 'Validates the extracted vehicle and customer', result: 'The vehicle exists: Seat Ibiza 1.0 TSI FR, VIN-2026-MAD-SEAT-03, sold to José María López on 18/09/2026. Matches the email', ms: 410, tone: 'ok' },
      { system: 'Salesforce CRM', action: 'Origin of the sale', result: 'Opportunity OPP-2026-5127 · quote Q-2026-5127-02 of 12/09/2026 with 48-month financing at APR 3.99% (Banco Sabadell campaign)', ms: 380 },
      { system: 'DocuSign', action: 'Signed documents of the transaction', result: 'Offer ENV-DS-77412 signed on 16/09/2026 with APR 3.99% · contract ENV-DS-77590 signed on 18/09/2026 with APR 4.25%', ms: 350 },
      { system: 'SAP ERP', action: 'Financing contract FIN-2026-08841', result: 'EUR 16,900 over 48 months · APR 4.25% · instalment of EUR 382.87 (at 3.99% it would be EUR 380.97: EUR 1.90 a month and EUR 91.00 in total)', ms: 520 },
      { system: 'SAP ERP', action: 'Banco Sabadell rates in force on the signing day', result: 'CAMP-SAB-0926 (3.99%) closed on 15/09/2026; from 16/09 the standard rate of 4.25% applies · the Salesforce quote was not updated', ms: 430, tone: 'warn' },
      { system: 'Odoo Inventario', action: 'Locates the vehicle', result: 'Seat Ibiza 1.0 TSI FR delivered on 24/09/2026 from the Madrid hub · no delivery issues', ms: 460 },
      { system: 'Stripe Pagos', action: 'Payments and disbursement of the transaction', result: 'STR-PAY-90412: EUR 3,000 deposit collected on 18/09 · Banco Sabadell disbursed EUR 16,900 on 22/09 · 1st instalment (SEPA) scheduled for 01/11/2026', ms: 390 },
      { system: 'Salesforce CRM', action: 'Looks for similar complaints in the last 12 months', result: '4 complaints with an open case · 1 similar: REC-2026-0318 (APR 2.99% offered and 3.49% in the contract)', ms: 540, tone: 'warn' },
      { system: 'Procedimientos', action: 'Consults PNT-ATC-012, PNT-FIN-007 and IT-VEN-FIN-02', result: '8D report within 5 working days: before 09/10/2026 · IT-VEN-FIN-02 requires comparing the APR of the offer and the contract before signing', ms: 380 },
      { system: 'Modelo de lenguaje', action: 'Drafts the 8D (D1–D8) with owners by role and dates', result: 'Complete draft · the link to the expired campaign remains a hypothesis to be confirmed', ms: 5200 },
      { system: 'Salesforce CRM', action: 'Registers the case and links it to the complaint', result: 'CAS-2026-0512 opened as a draft · linked to REC-2026-0512', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Drafts the reply in Spanish and its control translation', result: 'Draft ready: acknowledgement, reference CAS-2026-0512, pause of the 1st instalment and report date · pending approval', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'VIN-2026-MAD-SEAT-03',
      noun: 'vehicle',
      label: 'Chassis number (VIN)',
      fix_title: 'the vehicle in the complaint',
      systems: 'Salesforce/SAP',
      systems_short: 'Salesforce/SAP',
      fix_text: 'If the customer copied the chassis number wrongly, type the correct VIN. Agentic Platform looks it up in Salesforce and SAP and checks that it matches the vehicle in the complaint before changing anything.',
      same_body: 'It exists in Salesforce/SAP and matches the Seat Ibiza 1.0 TSI FR sold to José María López. No changes.',
      unknown_hint: 'If the customer’s VIN is doubtful, ask for a photo of the registration document or of the contract.',
      mismatch_body: 'It exists in Salesforce, but it is not the Seat Ibiza VIN-2026-MAD-SEAT-03 in the complaint: the record is not changed.',
      known: {
        'VIN-2026-MAD-BMW-04': { kind: 'mismatch', title: 'Vehicle VIN-2026-MAD-BMW-04 does not match this complaint', body: 'It exists in Odoo, but it is a BMW X3 in critical stock at the Madrid hub, with no sale attached. The complaint is about the Seat Ibiza VIN-2026-MAD-SEAT-03: the record is not changed.' },
        'VIN-2026-MAD-BMW-12': { kind: 'mismatch', title: 'VIN-2026-MAD-BMW-12 is the vehicle of another complaint, not this one', body: 'It is a BMW X5 40d belonging to Empresa de Transportes Ibérica, with complaint REC-2026-0451 open for broken upholstery seams. It is not the vehicle claimed by José María López. The record is not changed.' },
        'VIN-2026-MAD-VW-07': { kind: 'mismatch', title: 'Vehicle VIN-2026-MAD-VW-07 does not match this complaint', body: 'It exists in iCare Taller, but it is a VW Golf affected by the ABS recall campaign, unrelated to José María López’s financing. The record is not changed.' }
      }
    },
    sheet: {
      sub: 'Data extracted from the email and checked in Salesforce, DocuSign and SAP',
      empty_text: 'Agentic Platform will extract the vehicle, the contract, the APR, the reference and the deadline from the email and check them in Salesforce and SAP before preparing the 8D and the reply.',
      rows: [
        { k: 'Reference', v: 'REC-2026-0512', code: true, sub: 'Customer complaint reference' },
        { k: 'Customer', v: 'José María López', sub: 'Private customer · Salesforce customer · financing with Banco Sabadell' },
        { k: 'Vehicle', v: 'Seat Ibiza 1.0 TSI FR', ok: 'Matches the sales order in SAP' },
        { k: 'Chassis number', lot: true, ok: 'Exists in Salesforce/SAP · sold on 18/09/2026 · delivered on 24/09/2026' },
        { k: 'Contract', v: 'FIN-2026-08841', code: true, ok: 'Matches SAP · EUR 16,900 over 48 months' },
        { k: 'Discrepancy', v: 'APR 3.99% in the offer vs 4.25% in the contract', sub: 'Difference of EUR 1.90 a month and EUR 91.00 in total' },
        { k: 'Request', v: 'Correct the APR or cancel without penalty', sub: 'And do not collect the first instalment until clarified' },
        { k: 'Evidence', v: '2 documents attached · offer and contract signed in DocuSign' },
        { k: 'Dates', v: 'Offer: 16/09/2026 · contract: 18/09/2026 · at Customer Service: 03/10/2026 10:14' },
        { k: 'Deadline', v: 'Reply before 09/10/2026', due: true, sub: '5 working days from receipt · PNT-ATC-012' },
        { k: 'Record', v: 'CAS-2026-0512', code: true, sub: 'Case in Salesforce, linked to the complaint' }
      ]
    },
    requests: {
      title: 'What the customer asks for',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Acknowledgement of receipt and case number', meta: ['Reply to the customer · CAS-2026-0512'], quote: 'Confirmen por favor la recepción e indíquenme el número de su expediente', side: { pending: { status: 'waiting', label: 'Pending approval' }, approved: { status: 'sent', label: 'Sent' }, rejected: { status: 'rejected', label: 'Not sent' } } },
        { icon: 'check-circle', tone: 'ok', title: 'Copy of the signed offer and contract', meta: ['D2 and annex A of the 8D'], quote: 'la copia de los documentos firmados', side: { status: 'ok', label: 'Gathered' } },
        { icon: 'clock', tone: 'warn', title: 'Explanation of the difference between 3.99% and 4.25%', meta: ['D4 · campaign CAMP-SAB-0926 and FIN-2026-08841'], quote: 'con la explicación de la diferencia', side: { status: 'review', label: 'Still to assess' } },
        { icon: 'clock', tone: 'warn', title: 'Correct the contract to the agreed APR or cancel without penalty', meta: ['D4, D5 and D7 of the 8D'], quote: 'Solicito que se corrija el contrato a la TAE acordada del 3,99 %, o que se me permita cancelarlo sin penalización', side: { status: 'review', label: 'Hypothesis' } },
        { icon: 'check-circle', tone: 'ok', title: 'Can the first instalment be paused?', meta: ['D3 · 1st SEPA instalment of 01/11/2026'], quote: 'Les pido que no se cobre la primera cuota hasta que se aclare', side: { pending: { status: 'ok', label: 'Located' }, approved: { status: 'hold', label: '1st instalment paused' }, rejected: { status: 'ok', label: 'Located' } } },
        { icon: 'calendar', tone: 'warn', title: 'Written reply within 5 working days', meta: ['Sending the 8D (D1–D5)'], quote: 'en un plazo de 5 días hábiles', side: { status: 'pending', label: 'Before 09/10' } }
      ]
    },
    trace: {
      title: 'Trace of vehicle VIN-2026-MAD-SEAT-03',
      sub: 'Salesforce CRM, DocuSign, SAP ERP, Odoo Inventario and Stripe · backwards and forwards',
      button_code: 'VIN-2026-MAD-SEAT-03',
      button_label: 'Full trace · 7 documents',
      back_title: 'Backwards',
      back: [
        { time: '15/09', title: 'Financing · Banco Sabadell campaign', text: 'The promotional 3.99% rate for the Seat Ibiza was valid until 15/09/2026; from 16/09 the standard rate of 4.25% applies.', tone: 'warn', ref: 'CAMP-SAB-0926', chip: { status: 'open', label: 'Expired on 15/09, not updated in the quote' } },
        { time: '16/09', title: 'Sale · offer signed in DocuSign', text: 'Q-2026-5127-02 (12/09/2026) · EUR 16,900 over 48 months · APR 3.99% · signed by José María López with ENV-DS-77412', tone: 'brand', ref: 'Q-2026-5127-02' },
        { time: '18/09', timeSub: '10:42', title: 'Financing contract FIN-2026-08841', text: 'EUR 16,900 over 48 months · APR 4.25% · instalment of EUR 382.87 (the offer said EUR 380.97) · signed with ENV-DS-77590', tone: 'warn', ref: 'FIN-2026-08841' },
        { time: '18/09', title: 'Process · financed sale in Madrid', route: ['OPP-5127', 'Q-02', 'ENV-DS-77412', 'FIN-08841', 'ENV-DS-77590', 'SO-14203'], route_mark: 'FIN-08841', text: 'Order SO-2026-14203 · delivery on 24/09/2026 from Odoo Inventario', tone: 'brand' },
        { time: '18/09', title: 'Sale controls', text: 'Identity and scoring approved by Banco Sabadell · documentation complete · no automatic control comparing the APR of the offer with that of the contract', tone: 'ok' }
      ],
      fwd_title: 'Forwards',
      fwd_cols: { id: 'Movement', qty: 'Amount', when: 'Date', status: 'Status' },
      fwd: [
        { id: 'STR-PAY-90412', dest: 'Deposit for the transaction', sub: 'Stripe Pagos · José María López', qty: 'EUR 3,000', when: '18/09/2026 12:05', status: { pending: { status: 'shipped', label: 'Collected' }, approved: { status: 'shipped', label: 'Collected' }, rejected: { status: 'shipped', label: 'Collected' } } },
        { id: 'SAB-DES-0922', dest: 'Banco Sabadell disbursement', sub: 'FIN-2026-08841 · financed principal', qty: 'EUR 16,900', when: '22/09/2026 09:30', status: { pending: { status: 'shipped', label: 'Disbursed' }, approved: { status: 'shipped', label: 'Disbursed' }, rejected: { status: 'shipped', label: 'Disbursed' } } },
        { id: 'CUOTA-1', dest: 'First instalment (SEPA direct debit)', sub: 'FIN-2026-08841 · instalment of EUR 382.87 vs EUR 380.97 in the offer', qty: 'EUR 382.87', when: '01/11/2026', status: { pending: { status: 'pending', label: 'Pause proposed' }, approved: { status: 'hold', label: 'Paused' }, rejected: { status: 'pending', label: 'Pause proposed' } } }
      ],
      fwd_note: '48 instalments · EUR 18,377.68 at the contract APR vs EUR 18,286.68 at the agreed one: EUR 91.00 difference in total. No instalment has been collected yet.',
      hypothesis: {
        title: 'Probable cause hypothesis · to be confirmed by Finance',
        icon: 'wrench',
        paras: [
          'Campaign CAMP-SAB-0926 at 3.99% closed on 15/09/2026 and offer Q-2026-5127-02 was signed on 16/09 with that rate; the contract was generated on 18/09 with the standard rate of 4.25%.',
          'To be clarified: the offer was issued on 12/09, within the campaign, and Banco Sabadell may have honoured the rate for offers signed up to a certain date. The bank was asked for its validity criterion and there is no answer yet.',
          'It will be confirmed with the original offer document, the campaign terms and Banco Sabadell’s answer. Until then the cause is not communicated to the customer.'
        ]
      }
    },
    history: {
      sub: 'Salesforce CRM · complaints with an open case · last 12 months',
      col_id: 'Complaint',
      col_product: 'Vehicle and chassis number',
      col_cause: 'Root cause',
      rows: [
        { id: 'REC-2026-0318', date: '2026-06-12', product: 'Seat Arona 1.0 TSI (financed sale)', lot: 'VIN-2026-MAD-SEAT-01', description: 'APR 2.99% offered and 3.49% in the financing contract', category: 'Financing', customer_label: 'Private customer', root_cause: 'Salesforce quote template with an already expired campaign rate', nc: 'CAS-2026-0318', status: 'closed (30/06/2026)', similar: true },
        { id: 'REC-2026-0204', date: '2026-07-15', product: 'Audi Q3 (rental)', lot: 'VIN-2026-MAD-AUDI-09', description: 'Scratch on the door that the customer denies causing', category: 'Rental', customer_label: 'Corporate rental company', root_cause: 'Incomplete pick-up photos at vehicle handover', nc: 'CAS-2026-0233', status: 'closed', similar: false },
        { id: 'REC-2026-0131', date: '2026-05-07', product: 'VW Golf 1.5 TSI', lot: 'VIN-2026-MAD-VW-02', description: 'Parking sensor failure after delivery', category: 'Quality', customer_label: 'Private customer', root_cause: 'Sensor connector badly fitted in the pre-delivery inspection', nc: 'CAS-2026-0158', status: 'closed', similar: false },
        { id: 'REC-2026-0042', date: '2026-02-20', product: 'Skoda Octavia (subscription)', lot: 'VIN-2026-MAD-SKO-05', description: '15,000 km service not carried out', category: 'Maintenance', customer_label: 'Private subscriber', root_cause: 'iCare Taller reminder not sent to the customer', nc: 'CAS-2026-0097', status: 'closed', similar: false }
      ],
      note: {
        title: 'Same type of cause as REC-2026-0318',
        body: 'APR 2.99% offered and 3.49% in the contract (12/06/2026): Salesforce quote template with an expired campaign rate; CAS-2026-0318 closed (30/06/2026). If the CAMP-SAB-0926 hypothesis is confirmed, it would be the second APR discrepancy caused by an expired financing campaign in under four months: the 8D proposes in D7 a control comparing the APR of the offer and the contract before signing.'
      }
    },
    plan: {
      title: '8D draft · CAS-2026-0512',
      sub: 'PNT-ATC-012 · to the customer before 09/10/2026 with D1–D5; D6–D8 in follow-up',
      col_label: 'Discipline',
      containment_status: { pending: { text: 'Pending approval', tone: 'warn' }, approved: { text: 'Applied', tone: 'ok' }, rejected: { text: 'Not applied', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Team', owner: ['Operations Manager'], date: '2026-10-07', status: { text: 'Proposed', tone: 'draft' }, lead: 'Lead: Operations Manager.', items: ['Customer service team: investigation and contact with the customer', 'Finance Manager: contract FIN-2026-08841 and communication with Banco Sabadell', 'Sales Shift Lead: offer Q-2026-5127-02 and quote template', 'Operations Manager: collection of the first instalment and delivery'], note: 'External contact: José María López and the Banco Sabadell account manager.' },
        { d: 'D2', title: 'Problem description', owner: ['Customer service team'], date: '2026-10-07', status: { text: 'Complete', tone: 'ok' }, lead: 'José María López complains because the financing contract for his Seat Ibiza shows an APR of 4.25% while the signed offer said 3.99%.', items: ['Vehicle VIN-2026-MAD-SEAT-03, contract FIN-2026-08841: EUR 16,900 over 48 months, sold on 18/09/2026 and delivered on 24/09/2026', 'Offer signed on 16/09/2026 (ENV-DS-77412); contract signed on 18/09/2026 (ENV-DS-77590)', 'Difference of EUR 1.90 a month and EUR 91.00 in total; no instalment has been collected yet', 'Evidence: offer and contract in DocuSign; complaint received on 03/10/2026 10:14'] },
        { d: 'D3', title: 'Containment', owner: ['Operations Manager', 'Finance Manager'], date: '2026-10-07', containment: true, items: ['Pause collection of the first instalment of FIN-2026-08841 (SEPA of 01/11/2026) in SAP ERP. Requires approval (PNT-FIN-007)', 'Ask Banco Sabadell to confirm the rate applicable to offers signed on 16/09/2026', 'Keep the customer informed in writing with reference CAS-2026-0512', 'Review in Salesforce and SAP the financed sales between 16/09/2026 and today with an expired campaign'] },
        { d: 'D4', title: 'Root cause', owner: ['Finance Manager', 'Sales Shift Lead'], date: '2026-10-08', status: { text: 'Hypothesis', tone: 'warn' }, lead: 'Main hypothesis, to be confirmed: the offer was signed on 16/09/2026 with the rate of campaign CAMP-SAB-0926, which had closed on 15/09, and the contract of 18/09 was generated with the standard rate of 4.25%.', items: ['In favour: the offer was signed one day after the campaign closed; REC-2026-0318 had a cause of the same type (expired campaign rate)', 'To be clarified: quote Q-2026-5127-02 dates from 12/09, within the campaign, and the bank may honour the rate for signed offers', 'Verification: original offer document, campaign terms, Banco Sabadell’s answer and a 5-whys analysis'] },
        { d: 'D5', title: 'Corrective actions', owner: ['Finance Manager'], date: '2026-10-09', status: { text: 'Planned', tone: 'info' }, items: ['Correct FIN-2026-08841 to the agreed APR or formalise the cancellation without penalty, as per the bank’s criterion', 'Issue the corrected amortisation schedule and reschedule the first instalment'] },
        { d: 'D6', title: 'Implementation and effectiveness', owner: ['Customer service team'], date: '2026-10-16', status: { text: 'Planned', tone: 'info' }, items: ['Confirm with the customer that the corrected schedule is the agreed one and that the first instalment is collected at the right APR', 'Check that there are no other financed sales with the same difference'] },
        { d: 'D7', title: 'Prevention of recurrence', owner: ['Operations Manager'], date: '2026-10-23', status: { text: 'Planned', tone: 'info' }, items: ['Review IT-VEN-FIN-02: compare the APR of the offer with that of the contract before sending it for signature in DocuSign', 'Block in Salesforce the quotes whose financing campaign has expired (cause of the same type as CAS-2026-0318)', 'Automatic alert when the SAP ERP contract has an APR different from the offer'] },
        { d: 'D8', title: 'Closure and recognition', owner: ['Operations Manager'], date: '2026-10-30', status: { text: 'Planned', tone: 'info' }, items: ['Final report to José María López and closure of CAS-2026-0512 in Salesforce with the effectiveness evidence', 'Recognition of the team'] }
      ]
    },
    reply: {
      to_label: 'to the customer',
      subject: 'RE: Reclamación - TAE de la financiación distinta de la acordada - Seat Ibiza VIN-2026-MAD-SEAT-03 - Contrato FIN-2026-08841 - Ref. CAS-2026-0512',
      sub: 'To jm.lopez@correo-demo.example · in Spanish',
      tab_label: 'Spanish · is sent',
      text: [
        'Estimado Sr. López:',
        '',
        'Gracias por su correo del 3 de octubre de 2026. Confirmamos la recepción de su reclamación REC-2026-0512 sobre la TAE del contrato de financiación FIN-2026-08841 de su Seat Ibiza 1.0 TSI FR (VIN-2026-MAD-SEAT-03): su oferta del 16/09/2026 indicaba una TAE del 3,99 % y el contrato del 18/09/2026 recoge un 4,25 %. Lamentamos las molestias que esto le ha causado.',
        '',
        'Su número de expediente es CAS-2026-0512. Estamos revisando la operación con nuestro equipo de Finanzas y con Banco Sabadell, y la reclamación se documentará en un informe 8D.',
        '',
        'Primeros datos de nuestros registros:',
        '- Documentos: hemos localizado la oferta firmada el 16/09/2026 (3,99 %) y el contrato firmado el 18/09/2026 (4,25 %), ambos en DocuSign. Le adjuntaremos copia de los dos.',
        '- Importe: sobre 16.900 € a 48 meses, la diferencia sería de 1,90 € al mes y 91,00 € en total.',
        '- Cobros: no se ha cobrado ninguna cuota. Hemos propuesto pausar el cobro de la primera, prevista para el 01/11/2026, hasta aclarar la situación.',
        '',
        'Próximos pasos:',
        '- Pediremos a Banco Sabadell que confirme la tarifa aplicable a su oferta.',
        '- Le enviaremos por escrito el informe con la explicación de la diferencia y la solución, a más tardar el 9 de octubre de 2026.',
        '- Si lo desea, puede indicarnos si prefiere la corrección del contrato o su cancelación, para tenerlo en cuenta en la propuesta.',
        '',
        'Un saludo,',
        '',
        'Atención al cliente',
        'Autopista Multimotor · Madrid',
        'atencion.cliente@autopista-multimotor.example'
      ].join('\n'),
      highlights: [
        { text: 'CAS-2026-0512', label: 'Reference', tone: 'brand' },
        { text: 'Hemos propuesto pausar el cobro de la primera', label: 'Containment', tone: 'brand' },
        { text: 'a más tardar el 9 de octubre de 2026', label: 'Commitment', tone: 'brand' }
      ],
      llm_instructions: [
        'Warm, formal and professional tone, from Autopista Multimotor Customer Service to José María López, a private customer complaining about the APR of his Seat Ibiza financing. Express regret for the inconvenience without admitting fault.',
        'Thank him for his email of 3 October 2026 and acknowledge receipt of complaint REC-2026-0512 about contract FIN-2026-08841 (Seat Ibiza 1.0 TSI FR, VIN-2026-MAD-SEAT-03): the offer of 16/09/2026 said APR 3.99% and the contract of 18/09/2026 shows 4.25%.',
        'Give the case number CAS-2026-0512 and say that it is being reviewed with Finance and Banco Sabadell and will be documented in an 8D report.',
        'First facts: offer and contract located in DocuSign (a copy will be attached); on EUR 16,900 over 48 months the difference would be EUR 1.90 a month and EUR 91.00 in total; no instalment has been collected and pausing the first one, due on 01/11/2026, is proposed.',
        'Next steps: ask Banco Sabadell to confirm the applicable rate, send in writing the report with the explanation and the solution by 9 October 2026 at the latest, and ask whether the customer prefers correction of the contract or cancellation.',
        'Do not anticipate the cause (neither campaign CAMP-SAB-0926 expired on 15/09 nor the earlier complaint REC-2026-0318) and do not promise cancellation without penalty or the 3.99% APR.',
        'Write in Spanish. Signature: Atención al cliente · Autopista Multimotor · Madrid · atencion.cliente@autopista-multimotor.example'
      ],
      criterion: 'Drafting criterion: confirms facts from Salesforce, DocuSign and SAP and commits to dates; does not anticipate the cause (the expired-campaign hypothesis is not confirmed) and does not promise the APR or the cancellation.',
      control: {
        label: 'Control translation (English)',
        note: 'Control translation for Group Compliance and for the approver; it is not sent.',
        edited_note: 'The translation corresponds to Agentic Platform’s draft; the edited version includes changes by Operations in the Spanish text.',
        subject: 'RE: Complaint - APR different from the agreed one - Seat Ibiza VIN-2026-MAD-SEAT-03 - Contract FIN-2026-08841 - Ref. CAS-2026-0512',
        text: [
          'Dear Mr López,',
          '',
          'Thank you for your email of 3 October 2026. We confirm receipt of your complaint REC-2026-0512 about the APR in financing contract FIN-2026-08841 for your Seat Ibiza 1.0 TSI FR (VIN-2026-MAD-SEAT-03): your offer of 16/09/2026 stated an APR of 3.99% and the contract of 18/09/2026 shows 4.25%. We are sorry for the inconvenience.',
          '',
          'Your case number is CAS-2026-0512. We are reviewing the transaction with our Finance team and with Banco Sabadell, and the complaint will be documented in an 8D report.',
          '',
          'Initial findings from our records:',
          '- Documents: we have located the offer signed on 16/09/2026 (3.99%) and the contract signed on 18/09/2026 (4.25%), both in DocuSign. We will send you a copy of both.',
          '- Amount: on EUR 16,900 over 48 months, the difference would be EUR 1.90 per month and EUR 91.00 in total.',
          '- Payments: no instalment has been collected. We have proposed pausing collection of the first one, due on 01/11/2026, until the situation is clarified.',
          '',
          'Next steps:',
          '- We will ask Banco Sabadell to confirm the rate that applies to your offer.',
          '- We will send you in writing the report with the explanation of the difference and the solution, by 9 October 2026 at the latest.',
          '- If you wish, you can tell us whether you prefer the contract to be corrected or cancelled, so we can take it into account in our proposal.',
          '',
          'Kind regards,',
          '',
          'Customer Service',
          'Autopista Multimotor · Madrid',
          'atencion.cliente@autopista-multimotor.example'
        ].join('\n')
      }
    },
    approval: {
      title: 'Reply to José María López and containment',
      approver: 'Operations Manager',
      policy: 'PNT-ATC-012 · PNT-FIN-007',
      summary: {
        pending: 'Agentic Platform has prepared the reply in Spanish for jm.lopez@correo-demo.example and the pause of the first instalment collection. Nothing is sent or paused until Operations approves.',
        approved: 'Operations has approved the reply and the containment. Agentic Platform has sent the email to jm.lopez@correo-demo.example, paused the first instalment and updated CAS-2026-0512.',
        rejected: 'Operations has rejected the proposal: the reply has not been sent and no instalment has been paused.'
      },
      scope: [
        { label: 'Reply in Spanish', state: { pending: { status: 'pending', chip: 'Send' }, approved: { status: 'sent', chip: 'Sent' }, rejected: { status: 'rejected', chip: 'Not sent' } } },
        { label: 'First instalment (SEPA)', value: 'EUR 382.87 · 01/11/2026', state: { pending: { status: 'pending', chip: 'Pause' }, approved: { status: 'hold', chip: 'Paused' }, rejected: { status: 'rejected', chip: 'Not paused' } } },
        { label: 'Contract FIN-2026-08841', value: 'EUR 16,900 · 48 months', state: { status: 'evaluate', chip: 'Ask the bank' } }
      ],
      effects: [
        'Google Workspace: reply sent from atencion.cliente@autopista-multimotor.example',
        'SAP ERP: collection of the first instalment paused on FIN-2026-08841',
        'Salesforce CRM: CAS-2026-0512 moves to “In progress” with the reply attached'
      ],
      approve_label: 'Approve and send',
      next_step: 'Next step: confirm the cause with Banco Sabadell (D4) and send the 8D report before 09/10/2026.',
      toast_approved: 'Reply sent to José María López · 1st instalment paused on FIN-2026-08841',
      reject_text: 'The reply is not sent and no instalment is paused. The reason is kept in the audit log.',
      reject_placeholder: 'For example: wait for Banco Sabadell’s answer before replying',
      reject_audit: 'nothing is sent or paused',
      toast_rejected: 'Reply rejected: nothing has been sent and no instalment has been paused'
    },
    compare: {
      rows: [
        { k: 'People involved', hoy: '3–4: Customer Service, Sales, Finance and the bank', pro_strong: '1', pro: ': Operations reviews, corrects if needed and approves' },
        { k: 'Systems to open', hoy: '6: Google Workspace, Salesforce, DocuSign, SAP, Stripe and Odoo', pro_strong: '1', pro: ': this console; Agentic Platform queries all 6' }
      ],
      steps_today: '12–15 searches, cross-checks and write-ups by hand',
      time_label: 'Trace, 8D draft and reply',
      time_today: '2–5 h of work, spread over 1–2 days',
      footer: 'Proposed acceptance criterion for the pilot: trace and draft in under 15 minutes, and Operations accepts the draft with minor edits in at least 70% of cases.'
    },
    audit: {
      requested: { action: 'Complaint analysis requested', detail: 'REC-2026-0512 · email from jm.lopez@correo-demo.example of 03/10/2026 10:14' },
      analyzed: { action: 'Complaint analysed', detail: 'REC-2026-0512 · vehicle VIN-2026-MAD-SEAT-03' },
      after_analysis: [
        { action: 'Case registered as draft', detail: 'CAS-2026-0512 · Salesforce CRM · linked to REC-2026-0512' },
        { action: '8D draft prepared', detail: 'CAS-2026-0512 · D1–D8 · expired campaign as a hypothesis' },
        { action: 'Customer reply drafted', detail: 'REC-2026-0512 · Spanish · version 1 · pending approval' }
      ],
      approved: { action: 'Reply approved and sent', detail: 'REC-2026-0512 · to jm.lopez@correo-demo.example · CAS-2026-0512' },
      after_approval: [
        { action: 'Collection pause applied', detail: 'SAP ERP · FIN-2026-08841 · 1st instalment of 01/11/2026' },
        { action: 'Case updated', detail: 'CAS-2026-0512 · In progress · reply attached' }
      ]
    },
    outcome_label: 'Reply sent · CAS-2026-0512 in progress',
    toast_analyzed: 'Complaint analysed · 8D and reply drafted',
    status_chips: { idle: 'Open · not analysed', pending: 'Awaiting approval', approved: 'Reply sent · 8D in progress', rejected: 'Reply rejected' },
    report: {
      button: 'Download 8D report',
      title: '8D report · complaint REC-2026-0512',
      subtitle: 'APR dispute (3.99% agreed vs 4.25% in the contract) · Seat Ibiza VIN-2026-MAD-SEAT-03 · contract FIN-2026-08841 · José María López, Banco Sabadell',
      filename: '8D-report-CAS-2026-0512-REC-2026-0512',
      meta: [['Site', 'Madrid (Marqués de Soria)'], ['Complaint', 'REC-2026-0512 · 03/10/2026'], ['Vehicle', 'VIN-2026-MAD-SEAT-03'], ['Report to customer', 'before 09/10/2026']],
      state: { pending: 'Draft · pending approval', approved: 'Approved for sending · D4 open', rejected: 'Draft · reply rejected' },
      summary: [
        'Complaint from José María López about the financing of his Seat Ibiza 1.0 TSI FR with Banco Sabadell: the offer of 16/09/2026 said APR 3.99% and contract FIN-2026-08841 of 18/09/2026 shows 4.25%. It is EUR 16,900 over 48 months; the difference is EUR 1.90 a month and EUR 91.00 in total. No instalment has been collected.',
        'Cause hypothesis, to be confirmed with Banco Sabadell: campaign CAMP-SAB-0926 closed on 15/09/2026 and the contract was generated with the standard rate.'
      ],
      trace_heading: 'Annex A · Sale trace',
      trace_rows: [
        { etapa: 'Financing', fecha: '15/09/2026', detalle: 'Closing of the Banco Sabadell campaign with APR 3.99% for the Seat Ibiza; from 16/09 the standard rate of 4.25% applies', ref: 'CAMP-SAB-0926' },
        { etapa: 'Quote', fecha: '12/09/2026', detalle: 'Opportunity OPP-2026-5127 · EUR 16,900 over 48 months · APR 3.99% · Salesforce CRM', ref: 'Q-2026-5127-02' },
        { etapa: 'Offer', fecha: '16/09/2026', detalle: 'Offer signed by the customer in DocuSign with APR 3.99%', ref: 'ENV-DS-77412' },
        { etapa: 'Contract', fecha: '18/09/2026 10:42', detalle: 'Financing contract signed in DocuSign with APR 4.25% · instalment of EUR 382.87 · SAP ERP', ref: 'FIN-2026-08841' },
        { etapa: 'Controls', fecha: '18/09/2026', detalle: 'Identity and scoring approved by Banco Sabadell (compliant); documentation complete (compliant); no control comparing the APR of the offer with that of the contract', ref: '—' },
        { etapa: 'Payment', fecha: '18/09/2026 12:05', detalle: 'EUR 3,000 deposit collected in Stripe Pagos', ref: 'STR-PAY-90412' },
        { etapa: 'Disbursement', fecha: '22/09/2026 09:30', detalle: 'Banco Sabadell disburses EUR 16,900 to Autopista Multimotor', ref: 'SAB-DES-0922' },
        { etapa: 'Delivery', fecha: '24/09/2026', detalle: 'Seat Ibiza 1.0 TSI FR delivered from the Madrid hub · Odoo Inventario · order SO-2026-14203', ref: 'VIN-2026-MAD-SEAT-03' }
      ],
      units: {
        heading: 'Annex B · Documents and movements of the file (7)',
        cols: [{ label: 'No.', key: 'n', num: true }, { label: 'Document', key: 'doc' }, { label: 'Reference', key: 'ref', mono: true }, { label: 'Date', key: 'fecha' }, { label: 'Status', key: 'estado', status: true }, { label: 'System', key: 'sistema' }],
        rows: [
          { n: '1', doc: 'Quote with APR 3.99%', ref: 'Q-2026-5127-02', fecha: '12/09/2026', estado: 'Valid', sistema: 'Salesforce CRM' },
          { n: '2', doc: 'Signed offer with APR 3.99%', ref: 'ENV-DS-77412', fecha: '16/09/2026', estado: 'Signed', sistema: 'DocuSign' },
          { n: '3', doc: 'Financing contract with APR 4.25%', ref: 'FIN-2026-08841', fecha: '18/09/2026', estado: 'Under review', sistema: 'SAP ERP' },
          { n: '4', doc: 'Sales order for the Seat Ibiza', ref: 'SO-2026-14203', fecha: '18/09/2026', estado: 'Delivered', sistema: 'SAP ERP' },
          { n: '5', doc: 'Deposit of EUR 3,000', ref: 'STR-PAY-90412', fecha: '18/09/2026', estado: 'Collected', sistema: 'Stripe Pagos' },
          { n: '6', doc: 'Disbursement of EUR 16,900', ref: 'SAB-DES-0922', fecha: '22/09/2026', estado: 'Disbursed', sistema: 'SAP ERP' },
          { n: '7', doc: 'First instalment (SEPA) of EUR 382.87', ref: 'CUOTA-1', fecha: '01/11/2026', estado: 'Scheduled', estado_after: 'Paused', sistema: 'SAP ERP' }
        ]
      },
      history_heading: 'Annex C · Previous complaints (12 months)',
      approvals: [
        { paso: '8D and reply drafts', rol: 'Agentic Platform · Customer complaints agent', kind: 'agent' },
        { paso: 'Reply to the customer and containment (D3)', rol: 'Operations Manager', kind: 'reply' },
        { paso: 'Root cause confirmation (D4)', rol: 'Finance Manager', kind: 'pending' },
        { paso: 'Closure of the 8D (D8)', rol: 'Finance Manager', kind: 'pending' }
      ],
      second_signer: { role: 'Finance Manager', note: 'Cause confirmation (D4) and closure (D8) · pending' }
    },
    presenter: {
      running: 'While it runs: point out the SAP line (the Banco Sabadell campaign closed on 15/09) and the Salesforce line (similar complaint). If needed, “Speed up”.',
      idle: [
        'Email from José María López, a private customer, about the financing of his Seat Ibiza: the contract APR is 4.25% and the signed offer said 3.99%. It arrived on Saturday 03/10 at 10:14, in Spanish and with a deadline.',
        'In production, Agentic Platform analyses it as soon as it reaches the Customer Service mailbox. Here we launch it by hand to see what it does and which systems it queries.'
      ],
      pending: [
        'What is highlighted in the email is what Agentic Platform has extracted. Each item is checked in Salesforce and SAP: the vehicle exists, the contract matches and both documents are signed in DocuSign.',
        'The trace: quote of 12/09, offer signed on 16/09 and contract of 18/09 for EUR 16,900 over 48 months. The deposit is collected, Banco Sabadell has disbursed and the first instalment is due on 01/11.',
        'The fact that changes the investigation: the 3.99% campaign closed on 15/09, one day before the offer was signed. It is a hypothesis, not the cause: Finance confirms it with Banco Sabadell.',
        'History: in June there was an APR discrepancy with a cause of the same type (REC-2026-0318). The 8D covers it in prevention (D7).',
        'The reply in Spanish confirms facts and dates and does not anticipate the cause or promise the APR. It does not go out until Operations approves it.'
      ],
      approved: [
        'Approved: reply sent, first instalment paused and case CAS-2026-0512 in progress in Salesforce. Everything is kept in the audit log.',
        'The comparison below: today, 3–4 people and 6 systems for hours; here, one review and one approval. The “today” figure is measured in the pilot, not invented.',
        'The 8D report downloads as a controlled document: code, revision, status, approvals and page number.'
      ],
      next: {
        idle: 'Press “Analyse complaint” and read aloud two lines of the log: the system queried and what it finds.',
        pending: 'Press “Review and approve” (above) or scroll down to the reply and press “Approve and send”. Optional: “Correct” the VIN with a non-existent one to show it does not invent data.',
        approved: 'Press “Download 8D report” and show the document header. Then move on to “Procedures” in the sidebar.'
      }
    }
  }
});
