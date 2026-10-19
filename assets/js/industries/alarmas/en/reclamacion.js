/* Guardián Ibérica Instalaciones · complaint CLM-2026-0619 (two security guard call-out charges for false alarms on Marta Soler Pons contract SA-2026-77412 with Sector Alarm). English version.
 * Demo scenario with synthetic data (MFM). */
agenticPackEn('alarmas', {
  reclamacion: {
    code: 'CLM-2026-0619',
    nav: 'Complaint CLM-2026-0619',
    title: 'Complaint CLM-2026-0619',
    agent: 'Customer complaints',
    analyze_label: 'Analyse complaint',
    nc: 'CAS-2026-0619',
    form: { code: 'REG-ATC-006-02', rev: '2' },
    received: { date: '2026-10-19', time: '08:32' },
    due: '2026-11-02',
    holidays: [],
    customer_line: 'Marta Soler Pons · private customer · Burjassot · Sector Alarm contract SA-2026-77412',
    due_line: 'Acknowledgement before 20/10/2026 · resolution before 02/11/2026',
    cust_name: 'Marta Soler Pons',
    cust_addr: 'marta.soler@correo-demo.example',
    own_name: 'Customer Service, Guardián Ibérica Instalaciones',
    own_addr: 'atencion.cliente@guardian-iberica.example',
    mail_domain: 'guardian-iberica.example',
    mail_sub: 'marta.soler@correo-demo.example · mailbox atencion.cliente@guardian-iberica.example · Spanish',
    mail_title: 'Customer email',
    mail_tab_label: 'Email (Spanish)',
    attachments: ['CLM-2026-0619_aviso_facturacion.pdf', 'CLM-2026-0619_contrato_SA-2026-77412.pdf'],
    email_text: [
      'From: Marta Soler Pons <marta.soler@correo-demo.example>',
      'To: Atención al cliente, Guardián Ibérica Instalaciones <atencion.cliente@guardian-iberica.example>',
      'Date: Mon, 19 Oct 2026 08:32 (hora de Madrid)',
      'Subject: Reclamación - Dos cargos de desplazamiento de vigilante por falsas alarmas - Contrato SA-2026-77412 - Burjassot',
      '',
      'Buenos días:',
      '',
      'Les escribo por los dos cargos de «desplazamiento de vigilante» que me han llegado en el aviso de facturación de octubre y que no me corresponde pagar.',
      '',
      'Titular: Marta Soler Pons (Burjassot)',
      'Contrato de Sector Alarm: SA-2026-77412',
      'Falsas alarmas: 12/10/2026 y 14/10/2026, de madrugada',
      'Cargos: 2 x 39,00 € = 78,00 €',
      '',
      'Las dos veces saltó la alarma del salón sin que hubiera nadie en casa ni ocurriera nada, y la central mandó a un vigilante. Creo que el sensor de movimiento del salón estaba fallando: nadie me avisó de que tuviera la batería baja, no recibí ningún mensaje y en la aplicación no vi nada. Adjunto el aviso de facturación y el contrato.',
      '',
      'Solicito que se anulen los dos cargos y que revisen y arreglen el sensor cuanto antes. Si no se resuelve, daré de baja el contrato y no estoy dispuesta a pagar la penalización de 180 € por la baja.',
      '',
      'Les pido una respuesta por escrito en un plazo máximo de 10 días hábiles, con la explicación de lo ocurrido. Confirmen por favor la recepción e indíquenme el número de su expediente.',
      '',
      'Un saludo,',
      '',
      'Marta Soler Pons'
    ].join('\n'),
    mail_extra: {
      label: 'English translation',
      note: 'Control translation for the review; the original in Spanish is the one that counts.',
      headers: { From: 'Agentic Platform · control translation of the email from marta.soler@correo-demo.example', Date: 'Mon, 19 Oct 2026 08:32', Subject: 'Complaint · Two security guard call-out charges for false alarms · contract SA-2026-77412 · Burjassot' },
      text: [
        'Good morning,',
        '',
        'I am writing about the two "security guard call-out" charges that appeared on my October billing notice and that I should not have to pay.',
        '',
        'Account holder: Marta Soler Pons (Burjassot)',
        'Sector Alarm contract: SA-2026-77412',
        'False alarms: 12/10/2026 and 14/10/2026, in the early hours',
        'Charges: 2 x EUR 39.00 = EUR 78.00',
        '',
        'Both times the living-room alarm went off with nobody at home and nothing happening, and the control centre sent a guard. I think the living-room motion sensor was failing: nobody told me its battery was low, I received no message and I saw nothing in the app. I attach the billing notice and the contract.',
        '',
        'I request that the two charges be cancelled and that you check and fix the sensor as soon as possible. If it is not resolved, I will cancel the contract and I am not willing to pay the EUR 180 cancellation penalty.',
        '',
        'I ask for a written reply within a maximum of 10 working days, with an explanation of what happened. Please confirm receipt and let me know your case number.',
        '',
        'Kind regards,',
        '',
        'Marta Soler Pons'
      ].join('\n'),
      highlights: [
        { text: 'SA-2026-77412', label: 'Contract', tone: 'brand' },
        { text: '2 x EUR 39.00 = EUR 78.00', label: 'Charges', tone: 'crit' },
        { text: 'nobody told me its battery was low', label: 'Cause reported', tone: 'warn' },
        { text: 'within a maximum of 10 working days', label: 'Deadline', tone: 'warn' }
      ]
    },
    highlights: [
      { text: 'SA-2026-77412', label: 'Contract', tone: 'brand' },
      { text: '12/10/2026 y 14/10/2026', label: 'False alarms', tone: 'crit' },
      { text: '2 x 39,00 € = 78,00 €', label: 'Charges', tone: 'crit' },
      { text: 'sensor de movimiento del salón', label: 'Equipment', tone: 'brand' },
      { text: 'nadie me avisó de que tuviera la batería baja', label: 'Cause reported', tone: 'warn' },
      { text: 'Adjunto el aviso de facturación y el contrato.', label: 'Evidence' },
      { text: 'penalización de 180 € por la baja', label: 'Cancellation', tone: 'warn' },
      { text: 'en un plazo máximo de 10 días hábiles', label: 'Deadline' }
    ],
    run: {
      title: 'Customer complaint workflow',
      sub: 'Triggered when a complaint reaches the Customer Service mailbox · PR-SOP-007',
      graph_title: 'Customer complaint workflow',
      idle_footer: 'Reads the email, extracts and validates the data, traces the installation and prepares the 8D and the reply. Nothing goes out without the approval of the Operations Manager.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Customer email', sub: 'Customer Service mailbox', systems: ['Google Workspace'], icon: 'mail' },
        { id: 'extraccion', label: 'Extraction and validation', systems: ['Modelo de lenguaje', 'Salesforce CRM'], icon: 'search' },
        { id: 'traza', label: 'Installation trace', systems: ['Salesforce CRM', 'Sector Alarm Partner Hub', 'SAP Business One', 'Twilio SMS'], icon: 'git-branch' },
        { id: 'historico', label: 'History, 8D and reply', systems: ['Salesforce CRM', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Operations approval', sub: 'Operations Manager' },
        { id: 'salida', kind: 'output', label: 'Reply and containment', systems: ['Google Workspace', 'Sector Alarm Partner Hub', 'Salesforce CRM'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'approved' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'False alarms claimed · 12/10 and 14/10', value: 2 },
        { label: 'Charges that can be held · 2 x EUR 39.00 guard call-out', value: 'EUR 78.00', tone: 'warn' },
        { label: 'Similar complaint · CLM-2026-0457', value: 1, tone: 'warn' },
        { label: 'Working days left for the resolution · due 02/11/2026', due: true }
      ]
    },
    steps: [
      { system: 'Google Workspace', action: 'Reads the email from marta.soler@correo-demo.example in the atencion.cliente@guardian-iberica.example mailbox (19/10/2026 08:32)', result: 'Customer complaint in Spanish · 2 documents attached (billing notice and contract)', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extracts the complaint data', result: 'Contract SA-2026-77412 · false alarms of 12 and 14/10/2026 · 2 x EUR 39.00 = EUR 78.00 · living-room sensor with a low battery and no notice · threat to cancel with a EUR 180 penalty · resolution within 10 working days', ms: 2900 },
      { system: 'Salesforce CRM', action: 'Validates the extracted customer and installation', result: 'The customer exists: Marta Soler Pons, Burjassot, Sector Alarm contract SA-2026-77412, installation INS-2026-VLC-02318. Matches the email', ms: 410, tone: 'ok' },
      { system: 'Sector Alarm Partner Hub', action: 'Contract and equipment of the installation', result: 'SA-2026-77412 active since 14/03/2025 · 4G panel, 3 door contacts and 1 PIR motion detector in the living room · cancellation penalty of EUR 180 within the first minimum-term cycle', ms: 380 },
      { system: 'Sector Alarm Partner Hub', action: 'Installation events from 05/10 to 14/10/2026', result: '05/10 low battery on the living-room PIR (8%) · 12/10 03:12 and 14/10 02:47 living-room PIR alarm verified as false by the CRA · 2 guard call-outs at EUR 39.00', ms: 520, tone: 'warn' },
      { system: 'Twilio SMS', action: 'Notice to the customer for the low-battery event of 05/10', result: 'SMS sent on 05/10/2026 to the phone number held in the CRM: not delivered (number out of service) · no notice in the customer app', ms: 430, tone: 'warn' },
      { system: 'Salesforce CRM', action: 'Contact details of the customer', result: 'CRM phone number from 03/2025 · the customer changed mobile in 05/2026 and it was not updated in the CRM · email address current', ms: 360, tone: 'warn' },
      { system: 'SAP Business One', action: 'Billing and maintenance of the installation', result: 'October billing notice with EUR 78.00 of guard charges, SEPA collection on 01/11/2026 · annual maintenance PR-MAN-004 done in 02/2026 with no issues', ms: 460 },
      { system: 'Samsara Flota', action: 'Technician availability in the Burjassot area', result: 'Slot on 21/10/2026 in the morning · proposed PIR check visit OT-2026-08412 on the VLC-Norte route', ms: 390 },
      { system: 'Salesforce CRM', action: 'Looks for similar complaints in the last 12 months', result: '4 complaints with an open case · 1 similar: CLM-2026-0457 (guard charge after a low battery with no notice, Verisure)', ms: 540, tone: 'warn' },
      { system: 'Procedimientos', action: 'Consults PR-SOP-007, PR-BAJ-005 and PR-MAN-004', result: 'Acknowledgement within 24 h and resolution within 10 working days: before 02/11/2026 · PR-SOP-007: a false alarm caused by equipment or maintenance failure is not passed on to the customer', ms: 380 },
      { system: 'Modelo de lenguaje', action: 'Drafts the 8D (D1–D8) with owners by role and dates', result: 'Complete draft · the notice sent to the old phone number remains a hypothesis to be confirmed', ms: 5200 },
      { system: 'Salesforce CRM', action: 'Registers the case and links it to the complaint', result: 'CAS-2026-0619 opened as a draft · linked to CLM-2026-0619', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Drafts the reply in Spanish and its control translation', result: 'Draft ready: acknowledgement, reference CAS-2026-0619, hold of the EUR 78.00 and check visit · pending approval', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'INS-2026-VLC-02318',
      noun: 'installation',
      label: 'Installation',
      fix_title: 'the installation in the complaint',
      systems: 'Salesforce/Partner Hub',
      systems_short: 'Salesforce/Partner Hub',
      fix_text: 'If the customer wrote the installation code wrongly, type the correct one. Agentic Platform looks it up in Salesforce and in the partner portal and checks that it matches the installation in the complaint before changing anything.',
      same_body: 'It exists in Salesforce and in the Sector Alarm portal and matches contract SA-2026-77412 of Marta Soler Pons. No changes.',
      unknown_hint: 'If the code given by the customer is doubtful, ask for a photo of the contract or of the panel label.',
      mismatch_body: 'It exists in Salesforce, but it is not installation INS-2026-VLC-02318 in the complaint: the record is not changed.',
      known: {
        'INS-2026-VLC-04417': { kind: 'mismatch', title: 'Installation INS-2026-VLC-04417 does not match this complaint', body: 'It exists in Salesforce, but it is a Verisure contract in Valencia with no false alarms or guard charges. The complaint is about installation INS-2026-VLC-02318: the record is not changed.' },
        'INS-2026-ALC-01172': { kind: 'mismatch', title: 'INS-2026-ALC-01172 is the installation of another complaint, not this one', body: 'It is a Prosegur Alarmas shop in Alicante, with complaint CLM-2026-0588 open for a badly aimed video verification camera. It is not the installation claimed by Marta Soler Pons. The record is not changed.' },
        'INS-2026-CAS-00861': { kind: 'mismatch', title: 'Installation INS-2026-CAS-00861 does not match this complaint', body: 'It exists in the partner portal, but it is a home in Castellón with a detector from lot PIR-2607-A, unrelated to the charges of Marta Soler Pons. The record is not changed.' }
      }
    },
    sheet: {
      sub: 'Data extracted from the email and checked in Salesforce, Sector Alarm Partner Hub and SAP',
      empty_text: 'Agentic Platform will extract the installation, the contract, the charges, the dates and the deadline from the email and check them in Salesforce and in the Sector Alarm portal before preparing the 8D and the reply.',
      rows: [
        { k: 'Reference', v: 'CLM-2026-0619', code: true, sub: 'Customer complaint reference' },
        { k: 'Customer', v: 'Marta Soler Pons', sub: 'Private customer · Burjassot · Salesforce customer · Sector Alarm contract' },
        { k: 'Contract', v: 'SA-2026-77412', code: true, ok: 'Active in Sector Alarm Partner Hub since 14/03/2025' },
        { k: 'Installation', lot: true, ok: 'Exists in Salesforce and in the portal · 4G panel with a PIR in the living room' },
        { k: 'Discrepancy', v: '2 guard charges (2 x EUR 39.00) for living-room PIR false alarms', sub: 'Low battery from 05/10 with no notice delivered to the customer' },
        { k: 'Request', v: 'Cancel the EUR 78.00 and fix the sensor', sub: 'And do not collect the EUR 180 penalty if she cancels' },
        { k: 'Evidence', v: '2 documents attached · billing notice and contract' },
        { k: 'Dates', v: 'False alarms: 12/10/2026 and 14/10/2026 · at Customer Service: 19/10/2026 08:32' },
        { k: 'Deadline', v: 'Acknowledgement before 20/10 and resolution before 02/11/2026', due: true, sub: '24 h for the acknowledgement and 10 working days to resolve · PR-SOP-007' },
        { k: 'Record', v: 'CAS-2026-0619', code: true, sub: 'Case in Salesforce, linked to the complaint' }
      ]
    },
    requests: {
      title: 'What the customer asks for',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Acknowledgement of receipt and case number', meta: ['Reply to the customer · CAS-2026-0619'], quote: 'Confirmen por favor la recepción e indíquenme el número de su expediente', side: { pending: { status: 'waiting', label: 'Pending approval' }, approved: { status: 'sent', label: 'Sent' }, rejected: { status: 'rejected', label: 'Not sent' } } },
        { icon: 'check-circle', tone: 'ok', title: 'Explanation of what happened', meta: ['D2 and annex A of the 8D'], quote: 'con la explicación de lo ocurrido', side: { status: 'ok', label: 'Gathered' } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Cancel the two EUR 39.00 guard call-out charges', meta: ['D3 and D5 · SEPA collection of 01/11/2026'], quote: 'Solicito que se anulen los dos cargos', side: { pending: { status: 'review', label: 'Hold proposed' }, approved: { status: 'hold', label: 'Charges held' }, rejected: { status: 'review', label: 'Hold proposed' } } },
        { icon: 'clock', tone: 'warn', title: 'Check and fix the living-room sensor', meta: ['D5 · visit OT-2026-08412 proposed'], quote: 'revisen y arreglen el sensor cuanto antes', side: { status: 'review', label: 'Visit to be approved' } },
        { icon: 'clock', tone: 'warn', title: 'Do not collect the EUR 180 penalty if she cancels', meta: ['D4 and D5 · PR-BAJ-005 and Sector Alarm criterion'], quote: 'no estoy dispuesta a pagar la penalización de 180 € por la baja', side: { status: 'review', label: 'Ask Sector Alarm' } },
        { icon: 'calendar', tone: 'warn', title: 'Written reply within 10 working days', meta: ['Sending the 8D (D1–D5)'], quote: 'en un plazo máximo de 10 días hábiles', side: { status: 'pending', label: 'Before 02/11' } }
      ]
    },
    trace: {
      title: 'Trace of installation INS-2026-VLC-02318',
      sub: 'Salesforce CRM, Sector Alarm Partner Hub, Twilio SMS and SAP Business One · backwards and forwards',
      button_code: 'INS-2026-VLC-02318',
      button_label: 'Full trace · 7 records',
      back_title: 'Backwards',
      back: [
        { time: '14/03/2025', title: 'Installation and commissioning · PR-INS-001', text: '4G panel, 3 door contacts and 1 PIR motion detector in the living room, grade 2 · contract SA-2026-77412 registered with Sector Alarm', tone: 'brand', ref: 'INS-2026-VLC-02318' },
        { time: '02/2026', title: 'Annual preventive maintenance · PR-MAN-004', text: 'Check with no issues · PIR battery at 61% · CRM contact phone still valid', tone: 'ok', ref: 'OT-2026-01977' },
        { time: '05/2026', title: 'The customer changes mobile', text: 'The new number was not given to Customer Service nor updated in Salesforce; the Sector Alarm portal still holds the previous number', tone: 'warn', ref: 'Salesforce CRM', chip: { status: 'open', label: 'Contact detail not updated' } },
        { time: '05/10', timeSub: '07:41', title: 'Low-battery event on the living-room PIR', text: 'The Sector Alarm portal logs the battery at 8% and sends the customer notice by SMS; no maintenance order is created', tone: 'warn', ref: 'EV-SA-1005-0741' },
        { time: '05/10', title: 'Process · low-battery notice', route: ['Living-room PIR', '4G panel', 'Partner Hub', 'Twilio SMS', 'Old phone', 'Not delivered'], route_mark: 'Old phone', text: 'SMS sent to the previous number: not delivered, with no second attempt or notice in the app', tone: 'brand' },
        { time: '05/10', title: 'Notice controls', text: 'Event received and notice sent (compliant) · no control that detects an undelivered SMS and opens a maintenance order', tone: 'ok' }
      ],
      fwd_title: 'Forwards',
      fwd_cols: { id: 'Movement', qty: 'Amount', when: 'Date', status: 'Status' },
      fwd: [
        { id: 'ALM-FA-1012', dest: 'False alarm on the living-room PIR', sub: 'CRA · guard call-out', qty: 'EUR 39.00', when: '12/10/2026 03:12', status: { pending: { status: 'shipped', label: 'Charge issued' }, approved: { status: 'shipped', label: 'Charge issued' }, rejected: { status: 'shipped', label: 'Charge issued' } } },
        { id: 'ALM-FA-1014', dest: 'False alarm on the living-room PIR', sub: 'CRA · guard call-out', qty: 'EUR 39.00', when: '14/10/2026 02:47', status: { pending: { status: 'shipped', label: 'Charge issued' }, approved: { status: 'shipped', label: 'Charge issued' }, rejected: { status: 'shipped', label: 'Charge issued' } } },
        { id: 'REC-SEPA-1101', dest: 'November SEPA direct debit with the charges', sub: 'SAP Business One · SA-2026-77412 · includes EUR 78.00 of guard charges', qty: 'EUR 78.00', when: '01/11/2026', status: { pending: { status: 'pending', label: 'Hold proposed' }, approved: { status: 'hold', label: 'Held' }, rejected: { status: 'pending', label: 'Hold proposed' } } }
      ],
      fwd_note: '2 false alarms · EUR 78.00 in guard charges not yet collected. The EUR 180 cancellation penalty would only apply if the customer filed a cancellation, which she has not requested.',
      hypothesis: {
        title: 'Probable cause hypothesis · to be confirmed by Technical Support',
        icon: 'wrench',
        paras: [
          'The low-battery notice of 05/10/2026 was sent by SMS to the previous phone number of the customer, was not delivered, and there was no second attempt or maintenance order; the PIR stayed at 8% battery until the false alarms of 12 and 14/10.',
          'To be clarified: the guard charge is issued by Sector Alarm and it is not clear whether its criterion exempts false alarms caused by equipment failure; its criterion was requested and there is no answer yet.',
          'It will be confirmed with the panel event log, the Twilio report and the answer from Sector Alarm. Until then the cause is not communicated to the customer.'
        ]
      }
    },
    history: {
      sub: 'Salesforce CRM · complaints with an open case · last 12 months',
      col_id: 'Complaint',
      col_product: 'Installation and contract',
      col_cause: 'Root cause',
      rows: [
        { id: 'CLM-2026-0457', date: '2026-08-03', product: 'Verisure · home in Valencia', lot: 'INS-2026-VLC-01904', description: 'Guard charge after a false alarm caused by a low battery with no notice', category: 'False alarm', customer_label: 'Private customer', root_cause: 'Low-battery notice sent to an outdated phone number in the CRM', nc: 'CAS-2026-0457', status: 'closed (21/08/2026)', similar: true },
        { id: 'CLM-2026-0388', date: '2026-07-10', product: 'Prosegur Alarmas · shop in Alicante', lot: 'INS-2026-ALC-01172', description: 'Video verification camera with images and no prior notice', category: 'Privacy', customer_label: 'Small business', root_cause: 'Information sign not placed at the installation (PR-RGPD-002)', nc: 'CAS-2026-0388', status: 'closed', similar: false },
        { id: 'CLM-2026-0312', date: '2026-05-12', product: 'Sector Alarm · home in Paterna', lot: 'INS-2026-VLC-00977', description: 'Fee collected after cancellation', category: 'Cancellation', customer_label: 'Private customer', root_cause: 'Cancellation logged in the portal but not passed on to billing (PR-BAJ-005)', nc: 'CAS-2026-0312', status: 'closed', similar: false },
        { id: 'CLM-2026-0140', date: '2026-02-18', product: 'Verisure · home in Castellón', lot: 'INS-2026-CAS-00433', description: 'Annual check not carried out on time', category: 'Maintenance', customer_label: 'Private customer', root_cause: 'PR-MAN-004 order unassigned for lack of a slot on the route', nc: 'CAS-2026-0140', status: 'closed', similar: false }
      ],
      note: {
        title: 'Same type of cause as CLM-2026-0457',
        body: 'Guard charge after a false alarm caused by a low battery with no notice (03/08/2026): notice sent to an outdated phone number in the CRM; CAS-2026-0457 closed (21/08/2026). If the undelivered SMS hypothesis is confirmed, it would be the second false alarm caused by an undelivered low-battery notice in under three months: the 8D proposes in D7 a control that opens a maintenance order when the low-battery SMS is not delivered.'
      }
    },
    plan: {
      title: '8D draft · CAS-2026-0619',
      sub: 'PR-SOP-007 · to the customer before 02/11/2026 with D1–D5; D6–D8 in follow-up',
      col_label: 'Discipline',
      containment_status: { pending: { text: 'Pending approval', tone: 'warn' }, approved: { text: 'Applied', tone: 'ok' }, rejected: { text: 'Not applied', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Team', owner: ['Operations Manager'], date: '2026-10-20', status: { text: 'Proposed', tone: 'draft' }, lead: 'Lead: Operations Manager.', items: ['Customer Service: investigation and contact with the customer', 'Technical Support Manager: panel events and low-battery notices', 'Maintenance Manager: PIR check visit and PR-MAN-004', 'Finance Manager: guard charges and the November SEPA debit'], note: 'External contact: Marta Soler Pons and the Sector Alarm Partner Hub account manager.' },
        { d: 'D2', title: 'Problem description', owner: ['Customer Service'], date: '2026-10-20', status: { text: 'Complete', tone: 'ok' }, lead: 'Marta Soler Pons complains because she has been charged for two guard call-outs for false alarms that, in her view, were caused by a sensor with a low battery that nobody told her about.', items: ['Installation INS-2026-VLC-02318, Sector Alarm contract SA-2026-77412: false alarms of 12/10/2026 03:12 and 14/10/2026 02:47', 'Two charges of EUR 39.00 (EUR 78.00) not yet collected; SEPA debit of 01/11/2026', 'Living-room PIR battery at 8% since 05/10; notice SMS not delivered to the previous phone number', 'Evidence: billing notice and contract; complaint received on 19/10/2026 08:32'] },
        { d: 'D3', title: 'Containment', owner: ['Operations Manager', 'Finance Manager'], date: '2026-10-20', containment: true, items: ['Hold the two guard charges (EUR 78.00) from the SEPA debit of 01/11/2026 in SAP Business One. Requires approval (PR-SOP-007)', 'Ask Sector Alarm to confirm whether false alarms caused by equipment failure are exempt from the charge', 'Propose visit OT-2026-08412 on 21/10/2026 to check the PIR and replace its battery', 'Update the customer phone number and review in Salesforce the low-battery notices not delivered in the last week'] },
        { d: 'D4', title: 'Root cause', owner: ['Technical Support Manager', 'Customer Service'], date: '2026-10-22', status: { text: 'Hypothesis', tone: 'warn' }, lead: 'Main hypothesis, to be confirmed: the low-battery notice of 05/10/2026 was sent by SMS to the previous phone number of the customer, was not delivered, and no maintenance order was created.', items: ['In favour: the SMS is logged as not delivered in Twilio; CLM-2026-0457 had a cause of the same type (outdated phone number in the CRM)', 'To be clarified: the Sector Alarm criterion on the guard charge for false alarms caused by equipment failure', 'Verification: panel event log, Twilio delivery report, Sector Alarm answer and a 5-whys analysis'] },
        { d: 'D5', title: 'Corrective actions', owner: ['Maintenance Manager', 'Finance Manager'], date: '2026-10-23', status: { text: 'Planned', tone: 'info' }, items: ['Replace the living-room PIR battery and check the other sensors in the installation', 'Request from Sector Alarm a credit note for the two charges or their cancellation, as per its criterion, and do not apply the cancellation penalty while the case is open'] },
        { d: 'D6', title: 'Implementation and effectiveness', owner: ['Customer Service'], date: '2026-10-30', status: { text: 'Planned', tone: 'info' }, items: ['Confirm with the customer that the sensor works, that the phone number is updated and that the November debit does not include the charges', 'Check that there are no other installations with the same low battery and no notice'] },
        { d: 'D7', title: 'Prevention of recurrence', owner: ['Technical Support Manager'], date: '2026-11-13', status: { text: 'Planned', tone: 'info' }, items: ['Open a maintenance order when the low-battery SMS is not delivered or the panel does not confirm the notice', 'Review PR-SOP-007: second notice by email and app before treating a low-battery event as communicated', 'Ask for the phone number to be confirmed at every PR-MAN-004 visit and every contact with Customer Service'] },
        { d: 'D8', title: 'Closure and recognition', owner: ['Operations Manager'], date: '2026-11-20', status: { text: 'Planned', tone: 'info' }, items: ['Final report to Marta Soler Pons and closure of CAS-2026-0619 in Salesforce with the effectiveness evidence', 'Recognition of the team'] }
      ]
    },
    reply: {
      to_label: 'to the customer',
      subject: 'RE: Reclamación - Dos cargos de desplazamiento de vigilante por falsas alarmas - Contrato SA-2026-77412 - Burjassot - Ref. CAS-2026-0619',
      sub: 'To marta.soler@correo-demo.example · in Spanish',
      tab_label: 'Spanish · is sent',
      text: [
        'Estimada Sra. Soler:',
        '',
        'Gracias por su correo del 19 de octubre de 2026. Confirmamos la recepción de su reclamación CLM-2026-0619 sobre los dos cargos de desplazamiento de vigilante de su contrato SA-2026-77412 de Sector Alarm, por las falsas alarmas del 12 y el 14 de octubre. Lamentamos las molestias que esto le ha causado.',
        '',
        'Su número de expediente es CAS-2026-0619. Estamos revisando lo ocurrido con nuestro equipo de Soporte técnico y con Sector Alarm, y la reclamación se documentará en un informe 8D.',
        '',
        'Primeros datos de nuestros registros:',
        '- Sensor: el detector de movimiento del salón comunicó el 5 de octubre un nivel de batería bajo. Enviamos un aviso por SMS, pero consta como no entregado.',
        '- Cargos: son dos de 39,00 € (78,00 € en total) y todavía no se han cobrado; el recibo está previsto para el 01/11/2026. Hemos propuesto retenerlos hasta aclarar la situación.',
        '- Baja: no consta ninguna solicitud de baja, así que no se ha aplicado ninguna penalización.',
        '',
        'Próximos pasos:',
        '- Proponemos una visita de nuestro técnico el 21/10/2026 por la mañana para revisar el sensor y cambiar la batería. Le llamaremos para confirmarla.',
        '- Pediremos a Sector Alarm que confirme el tratamiento de los dos cargos.',
        '- Le enviaremos por escrito el informe con la explicación y la solución, a más tardar el 2 de noviembre de 2026.',
        '- Para que los avisos le lleguen, le agradeceríamos que nos confirmara su teléfono móvil actual.',
        '',
        'Un saludo,',
        '',
        'Atención al cliente',
        'Guardián Ibérica Instalaciones · Paterna (Valencia)',
        'atencion.cliente@guardian-iberica.example'
      ].join('\n'),
      highlights: [
        { text: 'CAS-2026-0619', label: 'Reference', tone: 'brand' },
        { text: 'Hemos propuesto retenerlos hasta aclarar la situación.', label: 'Containment', tone: 'brand' },
        { text: 'a más tardar el 2 de noviembre de 2026', label: 'Commitment', tone: 'brand' }
      ],
      llm_instructions: [
        'Warm, formal and professional tone, from Guardián Ibérica Instalaciones Customer Service to Marta Soler Pons, a private customer in Burjassot complaining about two security guard call-out charges after false alarms. Express regret for the inconvenience without admitting fault.',
        'Thank her for her email of 19 October 2026 and acknowledge receipt of complaint CLM-2026-0619 about the two charges on her Sector Alarm contract SA-2026-77412 for the false alarms of 12 and 14 October.',
        'Give the case number CAS-2026-0619 and say that it is being reviewed with Technical Support and Sector Alarm and will be documented in an 8D report.',
        'First facts: the living-room detector reported a low battery on 5 October and the notice SMS is logged as not delivered; the two charges total EUR 78.00 and have not been collected, and holding them before the 01/11/2026 debit is proposed; there is no cancellation request or penalty.',
        'Next steps: technician visit on 21/10/2026 in the morning to check the sensor and replace the battery, ask Sector Alarm to confirm how the charges are treated, send the report in writing by 2 November 2026 at the latest and ask for her current mobile number.',
        'Do not anticipate the cause (neither the old CRM phone number nor the earlier complaint CLM-2026-0457) and do not promise cancellation of the charges or exemption from the EUR 180 penalty.',
        'Write in Spanish. Signature: Atención al cliente · Guardián Ibérica Instalaciones · Paterna (Valencia) · atencion.cliente@guardian-iberica.example'
      ],
      criterion: 'Drafting criterion: confirms facts from Salesforce, Sector Alarm Partner Hub and SAP and commits to dates; does not anticipate the cause (the undelivered SMS hypothesis is not confirmed) and does not promise cancellation of the charges or exemption from the penalty.',
      control: {
        label: 'Control translation (English)',
        note: 'Control translation for the DPO and for the approver; it is not sent.',
        edited_note: 'The translation corresponds to the Agentic Platform draft; the edited version includes changes by Operations in the Spanish text.',
        subject: 'RE: Complaint - Two security guard call-out charges for false alarms - Contract SA-2026-77412 - Burjassot - Ref. CAS-2026-0619',
        text: [
          'Dear Ms Soler,',
          '',
          'Thank you for your email of 19 October 2026. We confirm receipt of your complaint CLM-2026-0619 about the two security guard call-out charges on your Sector Alarm contract SA-2026-77412, for the false alarms of 12 and 14 October. We are sorry for the inconvenience.',
          '',
          'Your case number is CAS-2026-0619. We are reviewing what happened with our Technical Support team and with Sector Alarm, and the complaint will be documented in an 8D report.',
          '',
          'Initial findings from our records:',
          '- Sensor: the living-room motion detector reported a low battery level on 5 October. We sent an SMS notice, but it is recorded as not delivered.',
          '- Charges: there are two of EUR 39.00 (EUR 78.00 in total) and they have not been collected yet; the direct debit is scheduled for 01/11/2026. We have proposed holding them until the situation is clarified.',
          '- Cancellation: there is no record of a cancellation request, so no penalty has been applied.',
          '',
          'Next steps:',
          '- We propose a visit by our technician on 21/10/2026 in the morning to check the sensor and replace the battery. We will call you to confirm it.',
          '- We will ask Sector Alarm to confirm how the two charges are treated.',
          '- We will send you in writing the report with the explanation and the solution, by 2 November 2026 at the latest.',
          '- So that the notices reach you, we would appreciate it if you could confirm your current mobile number.',
          '',
          'Kind regards,',
          '',
          'Customer Service',
          'Guardián Ibérica Instalaciones · Paterna (Valencia)',
          'atencion.cliente@guardian-iberica.example'
        ].join('\n')
      }
    },
    approval: {
      title: 'Reply to Marta Soler Pons and containment',
      approver: 'Operations Manager',
      policy: 'PR-SOP-007 · PR-BAJ-005',
      summary: {
        pending: 'Agentic Platform has prepared the reply in Spanish for marta.soler@correo-demo.example and the hold of the two guard charges. Nothing is sent or held until Operations approves.',
        approved: 'Operations has approved the reply and the containment. Agentic Platform has sent the email to marta.soler@correo-demo.example, held the two charges and updated CAS-2026-0619.',
        rejected: 'Operations has rejected the proposal: the reply has not been sent and no charge has been held.'
      },
      scope: [
        { label: 'Reply in Spanish', state: { pending: { status: 'pending', chip: 'Send' }, approved: { status: 'sent', chip: 'Sent' }, rejected: { status: 'rejected', chip: 'Not sent' } } },
        { label: 'Guard charges (SEPA)', value: '2 x EUR 39.00 · 01/11/2026', state: { pending: { status: 'pending', chip: 'Hold' }, approved: { status: 'hold', chip: 'Held' }, rejected: { status: 'rejected', chip: 'Not held' } } },
        { label: 'Contract SA-2026-77412', value: 'Cancellation penalty EUR 180', state: { status: 'evaluate', chip: 'Ask Sector Alarm' } }
      ],
      effects: [
        'Google Workspace: reply sent from atencion.cliente@guardian-iberica.example',
        'SAP Business One: two guard charges held on the 01/11/2026 debit of SA-2026-77412',
        'Salesforce CRM: CAS-2026-0619 moves to "In progress" with the reply attached and visit OT-2026-08412 proposed'
      ],
      approve_label: 'Approve and send',
      next_step: 'Next step: confirm the cause with Technical Support and Sector Alarm (D4) and send the 8D report before 02/11/2026.',
      toast_approved: 'Reply sent to Marta Soler Pons · charges held on SA-2026-77412',
      reject_text: 'The reply is not sent and no charge is held. The reason is kept in the audit log.',
      reject_placeholder: 'For example: wait for the answer from Sector Alarm before replying',
      reject_audit: 'nothing is sent or held',
      toast_rejected: 'Reply rejected: nothing has been sent and no charge has been held'
    },
    compare: {
      rows: [
        { k: 'People involved', hoy: '3–4: Customer Service, Technical Support, Maintenance and Finance', pro_strong: '1', pro: ': Operations reviews, corrects if needed and approves' },
        { k: 'Systems to open', hoy: '6: Google Workspace, Salesforce, Sector Alarm portal, SAP, Twilio and Samsara', pro_strong: '1', pro: ': this console; Agentic Platform queries all 6' }
      ],
      steps_today: '12–15 searches, cross-checks and write-ups by hand',
      time_label: 'Trace, 8D draft and reply',
      time_today: '2–4 h of work, spread over 1–2 days',
      footer: 'Proposed acceptance criterion for the pilot: trace and draft in under 15 minutes, and Operations accepts the draft with minor edits in at least 70% of cases.'
    },
    audit: {
      requested: { action: 'Complaint analysis requested', detail: 'CLM-2026-0619 · email from marta.soler@correo-demo.example of 19/10/2026 08:32' },
      analyzed: { action: 'Complaint analysed', detail: 'CLM-2026-0619 · installation INS-2026-VLC-02318' },
      after_analysis: [
        { action: 'Case registered as draft', detail: 'CAS-2026-0619 · Salesforce CRM · linked to CLM-2026-0619' },
        { action: '8D draft prepared', detail: 'CAS-2026-0619 · D1–D8 · undelivered SMS as a hypothesis' },
        { action: 'Customer reply drafted', detail: 'CLM-2026-0619 · Spanish · version 1 · pending approval' }
      ],
      approved: { action: 'Reply approved and sent', detail: 'CLM-2026-0619 · to marta.soler@correo-demo.example · CAS-2026-0619' },
      after_approval: [
        { action: 'Charge hold applied', detail: 'SAP Business One · SA-2026-77412 · 2 x EUR 39.00 of the 01/11/2026 debit' },
        { action: 'Case updated', detail: 'CAS-2026-0619 · In progress · reply attached · visit OT-2026-08412 proposed' }
      ]
    },
    outcome_label: 'Reply sent · CAS-2026-0619 in progress',
    toast_analyzed: 'Complaint analysed · 8D and reply drafted',
    status_chips: { idle: 'Open · not analysed', pending: 'Awaiting approval', approved: 'Reply sent · 8D in progress', rejected: 'Reply rejected' },
    report: {
      button: 'Download 8D report',
      title: '8D report · complaint CLM-2026-0619',
      subtitle: 'Guard charges for false alarms (2 x EUR 39.00) · installation INS-2026-VLC-02318 · contract SA-2026-77412 · Marta Soler Pons, Sector Alarm',
      filename: '8D-report-CAS-2026-0619-CLM-2026-0619',
      meta: [['Site', 'Paterna (Valencia)'], ['Complaint', 'CLM-2026-0619 · 19/10/2026'], ['Installation', 'INS-2026-VLC-02318'], ['Report to customer', 'before 02/11/2026']],
      state: { pending: 'Draft · pending approval', approved: 'Approved for sending · D4 open', rejected: 'Draft · reply rejected' },
      summary: [
        'Complaint from Marta Soler Pons about two guard call-out charges (2 x EUR 39.00) after the false alarms of 12 and 14/10/2026 on her Sector Alarm contract SA-2026-77412. The living-room motion detector had a low battery from 05/10 and the SMS notice was not delivered. The charges have not been collected and there is no cancellation request.',
        'Cause hypothesis, to be confirmed with Technical Support and Sector Alarm: the low-battery SMS was sent to a previous phone number of the customer, with no second attempt or maintenance order.'
      ],
      trace_heading: 'Annex A · Installation trace',
      trace_rows: [
        { etapa: 'Installation', fecha: '14/03/2025', detalle: '4G panel, 3 door contacts and 1 PIR detector in the living room, grade 2 · contract SA-2026-77412 registered', ref: 'INS-2026-VLC-02318' },
        { etapa: 'Maintenance', fecha: '02/2026', detalle: 'Annual check with no issues · PIR battery at 61% · PR-MAN-004', ref: 'OT-2026-01977' },
        { etapa: 'Contact', fecha: '05/2026', detalle: 'The customer changes mobile; the phone number in the CRM and in the Sector Alarm portal is not updated', ref: 'Salesforce CRM' },
        { etapa: 'Event', fecha: '05/10/2026 07:41', detalle: 'Low battery on the living-room PIR (8%) · notice by SMS to the previous phone number · not delivered', ref: 'EV-SA-1005-0741' },
        { etapa: 'Controls', fecha: '05/10/2026', detalle: 'Event received and notice sent (compliant); no control that detects an undelivered SMS and opens a maintenance order', ref: '—' },
        { etapa: 'False alarm', fecha: '12/10/2026 03:12', detalle: 'Living-room PIR alarm verified as false by the CRA · guard call-out of EUR 39.00', ref: 'ALM-FA-1012' },
        { etapa: 'False alarm', fecha: '14/10/2026 02:47', detalle: 'Second living-room PIR alarm verified as false · guard call-out of EUR 39.00', ref: 'ALM-FA-1014' },
        { etapa: 'Billing', fecha: '01/11/2026', detalle: 'November SEPA debit with the two charges (EUR 78.00) · SAP Business One', ref: 'REC-SEPA-1101' }
      ],
      units: {
        heading: 'Annex B · Records of the file (7)',
        cols: [{ label: 'No.', key: 'n', num: true }, { label: 'Record', key: 'doc' }, { label: 'Reference', key: 'ref', mono: true }, { label: 'Date', key: 'fecha' }, { label: 'Status', key: 'estado', status: true }, { label: 'System', key: 'sistema' }],
        rows: [
          { n: '1', doc: 'Alarm contract with Sector Alarm', ref: 'SA-2026-77412', fecha: '14/03/2025', estado: 'Active', sistema: 'Sector Alarm Partner Hub' },
          { n: '2', doc: 'Installation and commissioning', ref: 'INS-2026-VLC-02318', fecha: '14/03/2025', estado: 'Closed', sistema: 'Salesforce CRM' },
          { n: '3', doc: 'Low-battery event on the PIR', ref: 'EV-SA-1005-0741', fecha: '05/10/2026', estado: 'Unattended', sistema: 'Sector Alarm Partner Hub' },
          { n: '4', doc: 'Low-battery notice SMS', ref: 'SMS-TW-1005-0742', fecha: '05/10/2026', estado: 'Not delivered', sistema: 'Twilio SMS' },
          { n: '5', doc: 'False alarm and EUR 39.00 charge', ref: 'ALM-FA-1012', fecha: '12/10/2026', estado: 'Issued', sistema: 'Sector Alarm Partner Hub' },
          { n: '6', doc: 'False alarm and EUR 39.00 charge', ref: 'ALM-FA-1014', fecha: '14/10/2026', estado: 'Issued', sistema: 'Sector Alarm Partner Hub' },
          { n: '7', doc: 'SEPA debit with the two charges', ref: 'REC-SEPA-1101', fecha: '01/11/2026', estado: 'Scheduled', estado_after: 'Held', sistema: 'SAP Business One' }
        ]
      },
      history_heading: 'Annex C · Previous complaints (12 months)',
      approvals: [
        { paso: '8D and reply drafts', rol: 'Agentic Platform · Customer complaints agent', kind: 'agent' },
        { paso: 'Reply to the customer and containment (D3)', rol: 'Operations Manager', kind: 'reply' },
        { paso: 'Root cause confirmation (D4)', rol: 'Technical Support Manager', kind: 'pending' },
        { paso: 'Closure of the 8D (D8)', rol: 'Technical Support Manager', kind: 'pending' }
      ],
      second_signer: { role: 'Technical Support Manager', note: 'Cause confirmation (D4) and closure (D8) · pending' }
    },
    presenter: {
      running: 'While it runs: point out the Sector Alarm portal line (low battery on 05/10) and the Twilio line (SMS not delivered). If needed, "Speed up".',
      idle: [
        'Email from Marta Soler Pons, a private customer in Burjassot, about two guard charges after false alarms: she says the living-room sensor had a low battery and nobody told her. It arrived on Monday 19/10 at 08:32, in Spanish and with a deadline.',
        'In production, Agentic Platform analyses it as soon as it reaches the Customer Service mailbox. Here we launch it by hand to see what it does and which systems it queries.'
      ],
      pending: [
        'What is highlighted in the email is what Agentic Platform has extracted. Each item is checked in Salesforce and in the Sector Alarm portal: the installation exists, the contract matches and both false alarms are logged at the control centre.',
        'The trace: low battery on 05/10, SMS not delivered, false alarms on 12 and 14/10, and a SEPA debit on 01/11 with EUR 78.00. Nothing has been collected yet.',
        'The fact that changes the investigation: the SMS went to the previous phone number of the customer. It is a hypothesis, not the cause: Technical Support confirms it with Sector Alarm.',
        'History: in August there was a false alarm with a cause of the same type (CLM-2026-0457). The 8D covers it in prevention (D7).',
        'The reply in Spanish confirms facts and dates and does not anticipate the cause or promise cancellation. It does not go out until Operations approves it.'
      ],
      approved: [
        'Approved: reply sent, charges held and case CAS-2026-0619 in progress in Salesforce. Everything is kept in the audit log.',
        'The comparison below: today, 3–4 people and 6 systems for hours; here, one review and one approval. The "today" figure is measured in the pilot, not invented.',
        'The 8D report downloads as a controlled document: code, revision, status, approvals and page number.'
      ],
      next: {
        idle: 'Press "Analyse complaint" and read aloud two lines of the log: the system queried and what it finds.',
        pending: 'Press "Review and approve" (above) or scroll down to the reply and press "Approve and send". Optional: "Correct" the installation code with a non-existent one to show it does not invent data.',
        approved: 'Press "Download 8D report" and show the document header. Then move on to "Procedures" in the sidebar.'
      }
    }
  }
});
