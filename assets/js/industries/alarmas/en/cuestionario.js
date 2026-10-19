/* Guardián Ibérica Instalaciones · annual partner installer approval questionnaire from Prosegur Alarmas (HOM-2026-031), English. Demonstration scenario with synthetic data (MFM). */
agenticPackEn('alarmas', {
  cuestionario: {
    agent: 'Customer questionnaires',
    lang: 'en',
    default_sel: 'B1',
    reviewer: 'Operations Manager',
    assignee: 'Compliance Manager (DPO)',
    assignee_short: 'Compliance',
    team: 'Compliance',
    assign_due: '2026-10-27',
    responder: 'Guardián Ibérica Instalaciones, S.L.U. (Paterna hub)',
    site: 'Paterna (Valencia)',
    site_label: 'Hub',
    page_title: 'Installer approval · Prosegur Alarmas',
    report_title: 'Response to partner installer approval questionnaire',
    ref_label: 'Brand reference',
    scope_meta_label: 'Services',
    discard_placeholder: 'For example: this question is answered with the attached certificate',
    save_system: 'Salesforce CRM',
    qn: {
      code: 'HOM-2026-031',
      title: 'Annual partner installer approval questionnaire 2026',
      customer: 'Prosegur Alarmas',
      via: 'Prosegur Alarmas Partner Approval Office',
      received: '2026-10-12T10:15',
      due: '2026-10-30',
      file: 'Prosegur_Alarmas_Homologacion_Instaladores_2026.xlsx',
      scope: 'Installation and maintenance of the Prosegur Alarmas alarm systems (10,700 active installations) as an authorised partner installer',
      scope_short: 'Prosegur Alarmas · 10,700 installations',
      scope_label: '2 services (installation and maintenance)'
    },
    email: {
      mailbox: 'Compliance mailbox',
      headers: {
        From: 'Partner Approval Office, Prosegur Alarmas <homologacion@prosegur-alarmas.example>',
        To: 'Compliance, Guardián Ibérica Instalaciones <cumplimiento@gii-demo.example>',
        Date: 'Mon, 12 Oct 2026 10:15 (Madrid time)',
        Subject: 'Annual partner installer approval 2026 (HOM-2026-031) - response due 30 October'
      },
      text: 'Good morning,\n\nAs part of the annual approval of our partner installers, Prosegur Alarmas has issued questionnaire HOM-2026-031 for the services you provide on our behalf:\n- Installation of alarm systems\n- Maintenance of Prosegur Alarmas installations\n\nThe questionnaire has 15 questions in five sections: authorisation and certifications, installation, equipment and maintenance, service and continuity, personal data and traceability, and insurance and training.\n\nPlease answer every question and state the procedure, record or certificate that supports each answer. We need the completed questionnaire by Friday 30 October 2026.\n\nKind regards,\n\nPartner Approval Office\nProsegur Alarmas',
      highlights: [
        { text: 'Installation of alarm systems', label: 'Service', tone: 'brand' },
        { text: 'Maintenance of Prosegur Alarmas installations', label: 'Service', tone: 'brand' },
        { text: '15 questions', label: 'Questions', tone: 'brand' },
        { text: 'state the procedure, record or certificate that supports each answer', label: 'Requirement' },
        { text: 'Friday 30 October 2026', label: 'Deadline' }
      ]
    },
    sections: [
      { id: 'A', en: 'Authorisation and certifications' },
      { id: 'B', en: 'Installation, equipment and maintenance' },
      { id: 'C', en: 'Service and continuity' },
      { id: 'D', en: 'Personal data and traceability' },
      { id: 'E', en: 'Insurance and training' }
    ],
    kpi: { label: 'Audits and visits in 2025', value: 11, sub: 'Includes official inspections · 14 audit days · Annual Report 2025', icon: 'shield-check' },
    sources_sub: 'Procedures, certifications, policies and annual report',
    identify_result: 'Prosegur Alarmas via Partner Approval Office · HOM-2026-031',
    search_scope: 'Operations procedures, certifications, policies and annual report',
    lookups: [
      { system: 'Salesforce CRM', action: 'Checks the active Prosegur Alarmas installations and their work orders', result: '10,700 active installations · tests and photos recorded in the work orders of the last quarter', ms: 480 },
      { system: 'SAP Business One', action: 'Reads the equipment purchases and the installed lots', result: 'INS-2026-VLC-04417: FAC-PA-26-3318 · received in Paterna · grade 2 installation compliant', ms: 520 },
      { system: 'Prosegur Partner Portal', action: 'Checks the activation of the installations and the status of the annual approval', result: 'HOM-2026-031 open · activations confirmed within 24 h in the last quarter', ms: 400 },
      { system: 'Salesforce CRM', action: 'Searches the annual services carried out and the open complaints', result: '9,870 of 10,700 annual services carried out · CLM-2026-0619 open (another brand)', ms: 350, tone: 'warn' },
      { system: 'Twilio SMS', action: 'Reads the alerts sent in the latest communication incidents', result: 'ALM-COM-0590: switch to IP backup in 22 min · SMS alerts sent', ms: 300 },
      { system: 'SAP Business One', action: 'Cross-checks the Prosegur Alarmas equipment with the lots being recalled today', result: 'Lot PIR-2607-A: 158 Prosegur Alarmas homes with installed units', ms: 390, tone: 'warn' }
    ],
    compare: {
      people: '2-3: Operations, Compliance and, depending on the question, Maintenance or Technical Support',
      systems: '6-8: email, the brand Excel file, Salesforce, SAP Business One, partner portal, certificates folder and procedures',
      steps: 'Find the source for each question, copy and adapt answers from previous years, ask other departments for data and build the Excel file',
      time: '3-5 h of Operations and Compliance work, spread over 2-3 days'
    },
    presenter: {
      before: [
        'Each partner brand brings its annual approval. In 2025 Guardián Ibérica Instalaciones received 11 partner audits, customer visits and inspections, totalling 14 audit days. It is background work that eats up hours in Operations and Compliance.',
        'This one comes from Prosegur Alarmas, case HOM-2026-031: {total} questions on authorisation, installation, maintenance, personal data and insurance, with 10,700 installations of the brand at stake.',
        'When you press the button, Agentic Platform searches the procedures, certifications and policies, plus the records in Salesforce, SAP Business One, the partner portal and Twilio, and drafts each answer with its source.'
      ],
      during: [
        '{drafted} of {total} have a cited draft; every citation is checked against the source text. {flagged} are left for Compliance and Operations: personal certification of the installers, subcontractors and continuity and cybersecurity. No supporting document, nothing invented.',
        'B1: besides answering, it warns that lot PIR-2607-A of the PIR-200 detector is being recalled and that 158 Prosegur Alarmas homes have installed units. Today that depends on someone remembering.',
        'C1: the communication outage of 214 panels is under way while the questionnaire is being answered. The questionnaire does not live in isolation from the rest of the operation.',
        'Nothing goes out without approval: bulk approval only for high-confidence answers; medium-confidence ones are reviewed one by one.'
      ],
      next_during: 'Show B1 (citation and campaign warning) and B4 (no evidence). Then "Approve the {alta} high-confidence answers", approve {media_ids} one by one and "Assign the {flagged} without a source to Compliance".'
    },
    sources: {
      'PR-INS-001': {
        type: 'doc', kind: 'Procedure', code: 'PR-INS-001', title: 'Installation and commissioning (grade 2)', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Installation and commissioning (grade 2)' },
          { id: 'crit', heading: 'Criterion', text: 'The installation is carried out as grade 2 of UNE-EN 50131: panel with 4G main communication and an IP backup path, indoor siren and detectors in each zone defined with the customer. Before the installation is completed, each detector, the siren and the communication with the receiving centre are tested.' },
          { id: 'eval', heading: 'Assessment', list: ['Test of 4G communication and of the IP backup path with the alarm receiving centre', 'Check of the battery level of the panel and of each wireless sensor', 'Activation in the brand partner portal within 24 h of commissioning'] }
        ]
      },
      'PR-MAN-004': {
        type: 'doc', kind: 'Procedure', code: 'PR-MAN-004', title: 'Annual preventive maintenance', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Annual preventive maintenance' },
          { id: 'crit', heading: 'Criterion', text: 'Annual preventive service of each installation: test of detectors, siren and communication, and replacement of any battery below 30% charge during the visit itself. A low-battery alert not acknowledged within 48 h triggers a replacement visit.' }
        ]
      },
      'PR-SOP-007': {
        type: 'doc', kind: 'Procedure', code: 'PR-SOP-007', title: 'False alarm management', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'False alarm management' },
          { id: 'crit', heading: 'Criterion', text: 'Two or more false alarms in 30 days at the same installation open a technical analysis within 48 h. Guard call-out charges are passed on to the customer only if the cause is attributable to the customer. Complaint acknowledgement within 24 h and resolution within 10 working days.' }
        ]
      },
      'PR-RGPD-002': {
        type: 'doc', kind: 'Procedure', code: 'PR-RGPD-002', title: 'Video verification and personal data', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Video verification and personal data' },
          { id: 'crit', heading: 'Criterion', text: 'Video verification is activated only with the signed consent of the customer and on the agreed zones. Images are kept for 30 days at most and access is limited to operators with an authorised profile. Breaches that put people at risk are notified to the AEPD within 72 h at most.' }
        ]
      },
      'PR-COM-003': {
        type: 'doc', kind: 'Procedure', code: 'PR-COM-003', title: 'Panel communication loss', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Panel communication loss' },
          { id: 'crit', heading: 'Criterion', text: 'Communication loss: panel with no connection to the receiving centre for more than 10 min. Mass outage: more than 50 panels without communication in the same area. In a mass outage the panels are switched to the IP backup path and checked to be supervised again; panels without a backup receive a priority visit within 24 h at most.' },
          { id: 'eval', heading: 'Assessment', list: ['The plan for a mass outage is approved by the Technical Support Manager', 'Alert to the affected customers by Twilio SMS and notification to the brand through its partner portal'] }
        ]
      },
      'PR-BAJ-005': {
        type: 'doc', kind: 'Procedure', code: 'PR-BAJ-005', title: 'Customer cancellation and equipment removal', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Customer cancellation and equipment removal' },
          { id: 'crit', heading: 'Criterion', text: 'Cancellation acknowledged within 24 h and equipment removed within 15 working days, with keys, images and customer data erased before the panel is removed.' }
        ]
      },
      'PR-QLT-006': {
        type: 'doc', kind: 'Procedure', code: 'PR-QLT-006', title: 'Product recall', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Product recall' },
          { id: 'crit', heading: 'Criterion', text: 'Every recalled lot is blocked in SAP Business One and the installations with units of the lot are located by lot code in Salesforce CRM. Only the Operations Manager releases a recalled lot.' }
        ]
      },
      'WEB-CERT': {
        type: 'doc', kind: 'Certifications', code: null, label: 'Corporate website', title: 'Authorisation and certifications · Paterna hub', system: 'Procedimientos',
        org: 'Guardián Ibérica Instalaciones corporate website · accessed on 13/10/2026',
        sections: [
          { id: 'hab', heading: 'Authorisation', text: 'Guardián Ibérica Instalaciones, S.L.U. is authorised as a private security company and registered in the security company register (Law 5/2014 and Order INT/316/2011); grade 2 installations according to UNE-EN 50131; authorised installer of Verisure, Sector Alarm and Prosegur Alarmas.' },
          { id: 'nota', heading: 'Indexing note', text: 'The page does not state the registration number in the register or the date of the latest verification of the authorisation.' }
        ]
      },
      'MEM-2025': {
        type: 'doc', kind: 'Annual report', code: null, label: 'Report 2025', title: 'Annual Report 2025', system: 'Procedimientos',
        org: 'Guardián Ibérica Instalaciones, S.L.U. · published on 01/07/2026',
        sections: [
          { id: 'aud', heading: 'Audits and inspections', text: 'Partner audits, customer visits and inspections in 2025: 11 (14 audit days), no sanctions.' },
          { id: 'pla', heading: 'Staff', text: 'Staff: 74 installer technicians and 12 technical support operators, 100% with annual brand training.' },
          { id: 'car', heading: 'Portfolio', text: 'Portfolio: around 38,000 active installations (Verisure 15,200, Sector Alarm 12,100 and Prosegur Alarmas 10,700).' }
        ]
      },
      'POL-RC': {
        type: 'doc', kind: 'Policy', code: null, label: 'Liability policy', title: 'Public liability policy for security companies', system: 'Procedimientos',
        org: 'Guardián Ibérica Instalaciones · insurance',
        sections: [
          { id: 'rc', heading: 'Cover', text: 'Public liability policy for private security companies: limit of 3,000,000 EUR per claim and year, valid until 31/12/2026.' },
          { id: 'ext', heading: 'Scope', text: 'Covers personal injury, property damage and consequential loss caused during the installation and maintenance of alarm systems.' }
        ]
      },
      'SF-ORD': {
        type: 'record', kind: 'Work orders', code: 'Prosegur Alarmas', title: 'Prosegur Alarmas installations · work orders', system: 'Salesforce CRM',
        org: 'Salesforce CRM · work orders',
        sections: [
          { id: 'ord', heading: 'Installations', list: ['10,700 active Prosegur Alarmas installations', 'Tests, photos and customer signature recorded in the work order of every installation of the last quarter', 'Activations in the Prosegur Partner Portal confirmed within 24 h in the last quarter'] }
        ]
      },
      'SF-MAN': {
        type: 'record', kind: 'Annual services', code: 'Prosegur Alarmas', title: 'Preventive maintenance of the Prosegur Alarmas installations', system: 'Salesforce CRM',
        org: 'Salesforce CRM · maintenance plan',
        sections: [
          { id: 'rev', heading: 'Services', list: ['Annual services carried out in 2025: 9,870 of 10,700 installations (92.2%)', 'Pending services with an appointment scheduled: 830'] }
        ]
      },
      'SF-FALSAS': {
        type: 'record', kind: 'Complaints register', code: 'Complaints', title: 'Registered false alarm complaints', system: 'Salesforce CRM',
        org: 'Salesforce CRM · complaints and cases',
        sections: [
          { id: 'res', heading: 'Summary', text: '5 closed with root cause and corrective action recorded; 1 open (CLM-2026-0619).' },
          { id: 'det', heading: 'Closed complaints', list: ['CLM-2026-0488 · 03/06/2026 · Guard call-out charge for a false alarm · cause: Pet in a zone without pet immunity · charge passed on to the customer', 'CLM-2026-0311 · 21/04/2026 · Repeated false alarms · cause: Detector wrongly aimed at installation · charges cancelled and refunded'] }
        ]
      },
      'COM-LOG': {
        type: 'record', kind: 'Incidents', code: 'Communication', title: 'Technical support · recent communication incidents', system: 'Salesforce CRM',
        org: 'Salesforce CRM · technical support incidents',
        sections: [
          { id: 'inc', heading: 'Latest incidents', list: ['ALM-COM-0488 · 12/08/2026 · 37 panels · mobile operator outage · switched to IP backup in 18 min · closed compliant', 'ALM-COM-0552 · 02/09/2026 · 12 panels · antenna failure · switched to IP backup in 9 min · closed compliant', 'ALM-COM-0590 · 30/09/2026 · 61 panels · mobile operator maintenance · switched to IP backup in 22 min · closed compliant'] }
        ]
      },
      'SAP-INS': {
        type: 'record', kind: 'Installation record', code: 'INS-2026-VLC-04417', title: 'Installation INS-2026-VLC-04417 · origin and activation', system: 'SAP Business One',
        org: 'SAP Business One · installation record',
        sections: [
          { id: 'origen', heading: 'Origin and activation', text: 'Alarm panel from manufacturer purchase FAC-PA-26-3318 (02/09/2026), received at the Paterna hub at 09:15, grade 2 installation compliant on 14/09/2026 and activation in the Prosegur Partner Portal' }
        ]
      },
      'SF-INS': {
        type: 'record', kind: 'Forward trace', code: 'INS-2026-VLC-04417', title: 'Installation INS-2026-VLC-04417 · contract and work orders', system: 'Salesforce CRM',
        org: 'Salesforce CRM · installation history',
        sections: [
          { id: 'fwd', heading: 'Contract and orders', text: '1 contract: PA-2026-30871 of Prosegur Alarmas, installed 14/09/2026 with 4 detectors and 2 work orders (OT-2026-01120, OT-2026-01198)' }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'HOM 2026 · A1', sec: 'A', topic: 'Authorisation as a security company', conf: 'media',
        qEn: 'Please prove the authorisation of the company as a private security company (Law 5/2014 and Order INT/316/2011), with the registration number and the date of the latest verification.',
        en: 'Guardián Ibérica Instalaciones, S.L.U. is authorised as a private security company and registered in the security company register under Law 5/2014 and Order INT/316/2011 [1]. The current registration certificate, with its number and the date of the latest verification, will be attached.',
        cites: [
          { src: 'WEB-CERT', q: 'is authorised as a private security company and registered in the security company register (Law 5/2014 and Order INT/316/2011)' }
        ],
        gap: 'The registration number and the date of the latest verification of the authorisation do not appear in the indexed sources. Attach the current registration certificate before sending.'
      },
      {
        id: 'A2', ref: 'HOM 2026 · A2', sec: 'A', topic: 'Audits in the last year', conf: 'alta',
        qEn: 'How many audits (brand, customer and official) did your company receive in the last year, and were there any sanctions or enforcement actions?',
        en: 'In 2025 Guardián Ibérica Instalaciones received 11 partner audits, customer visits and official inspections, totalling 14 audit days, with no sanctions [1].',
        cites: [
          { src: 'MEM-2025', q: 'Partner audits, customer visits and inspections in 2025: 11 (14 audit days), no sanctions' }
        ],
        note: {
          tone: 'brand', icon: 'info', title: 'Company-wide figure',
          text: 'The report publishes the company-wide figure, with no breakdown by brand. If Prosegur Alarmas asks for its own installations only, Compliance completes it.'
        }
      },
      {
        id: 'B1', ref: 'HOM 2026 · B1', sec: 'B', topic: 'Installation and commissioning (grade 2)', conf: 'alta',
        qEn: 'Describe how a grade 2 installation according to UNE-EN 50131 is carried out, the commissioning tests and the activation of the installation in the brand portal.',
        en: 'Every installation is carried out as grade 2 of UNE-EN 50131: panel with 4G main communication and an IP backup path, indoor siren and detectors in each zone defined with the customer [1]. Before it is completed, 4G and IP backup communication with the receiving centre is tested and the battery level of the panel and of each sensor is checked [2][3]. The installation is activated in the partner portal within 24 h of commissioning [4], and the tests, photos and customer signature are recorded in the work order [5].',
        cites: [
          { src: 'PR-INS-001', q: 'The installation is carried out as grade 2 of UNE-EN 50131: panel with 4G main communication and an IP backup path, indoor siren and detectors in each zone defined with the customer' },
          { src: 'PR-INS-001', q: 'Test of 4G communication and of the IP backup path with the alarm receiving centre' },
          { src: 'PR-INS-001', q: 'Check of the battery level of the panel and of each wireless sensor' },
          { src: 'PR-INS-001', q: 'Activation in the brand partner portal within 24 h of commissioning' },
          { src: 'SF-ORD', q: 'Tests, photos and customer signature recorded in the work order of every installation of the last quarter' }
        ],
        note: {
          tone: 'warn', icon: 'link', title: 'Lot being recalled · PIR-2607-A · REC-2026-1019',
          text: 'Lot PIR-2607-A of the PIR-200 detector (Sentinela Electronics) is being recalled because the lithium battery may overheat: 158 Prosegur Alarmas homes have installed units (912 homes across the three brands). Check that this answer is consistent with the campaign before sending it.',
          outcome: 'retirada', with: { any: 'Campaign status: {label}.' },
          go: 'retirada', goLabel: 'Open the campaign'
        }
      },
      {
        id: 'B2', ref: 'HOM 2026 · B2', sec: 'B', topic: 'Annual preventive maintenance', conf: 'alta',
        qEn: 'Do you carry out annual preventive maintenance of the installations? Please give its content, how batteries are handled and the percentage of services completed last year.',
        en: 'Yes. Each installation has an annual preventive service with a test of detectors, siren and communication, and replacement of any battery below 30% charge during the visit itself [1]. A low-battery alert not acknowledged within 48 h triggers a replacement visit [2]. In 2025, 9,870 of the 10,700 annual services of Prosegur Alarmas were carried out (92.2%), and the 830 pending ones have an appointment scheduled [3][4].',
        cites: [
          { src: 'PR-MAN-004', q: 'Annual preventive service of each installation: test of detectors, siren and communication, and replacement of any battery below 30% charge during the visit itself' },
          { src: 'PR-MAN-004', q: 'A low-battery alert not acknowledged within 48 h triggers a replacement visit' },
          { src: 'SF-MAN', q: 'Annual services carried out in 2025: 9,870 of 10,700 installations (92.2%)' },
          { src: 'SF-MAN', q: 'Pending services with an appointment scheduled: 830' }
        ],
        note: {
          tone: 'brand', icon: 'activity', title: 'Status at the hub today',
          text: 'The board shows 118 maintenance visits scheduled today, 9 of them urgent. The annual Prosegur Alarmas data do not change, so the answer does not change.'
        }
      },
      {
        id: 'B3', ref: 'HOM 2026 · B3', sec: 'B', topic: 'False alarm management', conf: 'alta',
        qEn: 'How do you manage false alarms and the charges they generate for the customer? Please give the complaint deadlines and how causes are recorded.',
        en: 'Two or more false alarms in 30 days at the same installation open a technical analysis within 48 h [1]. Guard call-out charges are passed on to the customer only if the cause is attributable to the customer [1]. Complaints are acknowledged within 24 h and resolved within 10 working days [1], and they are recorded in the CRM with their root cause and corrective action: the 5 closed in 2026 have it recorded [2].',
        cites: [
          { src: 'PR-SOP-007', q: 'Two or more false alarms in 30 days at the same installation open a technical analysis within 48 h. Guard call-out charges are passed on to the customer only if the cause is attributable to the customer. Complaint acknowledgement within 24 h and resolution within 10 working days.' },
          { src: 'SF-FALSAS', q: '5 closed with root cause and corrective action recorded' }
        ],
        note: {
          tone: 'warn', icon: 'mail', title: 'Open complaint from another brand · CLM-2026-0619',
          text: 'GII has complaint CLM-2026-0619 open from a Sector Alarm customer (Burjassot): guard call-out charges for two false alarms, with a probable root cause in a living-room PIR sensor with a low battery and no alert. It does not affect Prosegur Alarmas, but check that this answer is consistent with the analysis before sending it.',
          outcome: 'reclamacion', tone_done: 'brand',
          text_done: 'Complaint CLM-2026-0619 was handled in this session:', with: { any: '{label}.' },
          go: 'reclamacion', goLabel: 'Open the complaint'
        }
      },
      {
        id: 'B4', ref: 'HOM 2026 · B4', sec: 'B', topic: 'Installer certification', conf: 'none',
        qEn: 'Please provide the list of installer technicians with their professional accreditation, their UNE-EN 50131 qualification and the certifications of each brand, with expiry dates.',
        flag: {
          reason: 'There is only indirect evidence: no indexed document links the technicians to their personal accreditation or qualification.',
          partial: [
            { src: 'MEM-2025', q: '100% with annual brand training', why: 'Annual brand training does not prove the certification of each installer or their UNE-EN 50131 qualification.' },
            { src: 'WEB-CERT', q: 'grade 2 installations according to UNE-EN 50131', why: 'It shows the grade of the installations, not the personal certification of the technicians.' }
          ],
          missing: ['List of technicians with their professional accreditation and expiry date', 'UNE-EN 50131 qualification certificates of the installers', 'Training certificates of each partner brand', 'Continuing training record with dates']
        }
      },
      {
        id: 'B5', ref: 'HOM 2026 · B5', sec: 'B', topic: 'Subcontractors', conf: 'none',
        qEn: 'Do you subcontract installation or maintenance, in whole or in part? If so, please give the companies, their authorisation and the data protection clauses of the contracts.',
        flag: {
          reason: 'None of the {doc_count} indexed documents covers the subcontracting of installation or maintenance.',
          partial: [
            { src: 'MEM-2025', q: 'Staff: 74 installer technicians and 12 technical support operators', why: 'It describes the own workforce, but does not say whether services are subcontracted or to whom.' }
          ],
          missing: ['List of installation and maintenance subcontractors', 'Subcontracting contracts with data protection and security clauses', 'Evidence that each subcontractor is authorised as a security company']
        }
      },
      {
        id: 'C1', ref: 'HOM 2026 · C1', sec: 'C', topic: 'Panel communication loss', conf: 'alta',
        qEn: 'What do you do when a panel loses communication with the receiving centre, and what happens if it affects many panels at once?',
        en: 'A panel with no connection to the receiving centre for more than 10 min is treated as a communication loss [1]. If more than 50 panels have no communication in the same area, it is a mass outage: the panels are switched to the IP backup path and checked to be supervised again [2], and panels without a backup receive a priority visit within 24 h at most [3]. The plan is approved by the Technical Support Manager [4], and the affected customers are alerted by SMS and the brand through its partner portal [5].',
        cites: [
          { src: 'PR-COM-003', q: 'Communication loss: panel with no connection to the receiving centre for more than 10 min' },
          { src: 'PR-COM-003', q: 'Mass outage: more than 50 panels without communication in the same area. In a mass outage the panels are switched to the IP backup path and checked to be supervised again' },
          { src: 'PR-COM-003', q: 'panels without a backup receive a priority visit within 24 h at most' },
          { src: 'PR-COM-003', q: 'The plan for a mass outage is approved by the Technical Support Manager' },
          { src: 'PR-COM-003', q: 'Alert to the affected customers by Twilio SMS and notification to the brand through its partner portal' }
        ],
        note: {
          tone: 'warn', icon: 'thermometer', title: 'Communication outage in progress · ALM-COM-0611',
          text: '214 panels (mainly Sector Alarm and Verisure) have had no 4G communication since 05:10 in Valencia North after a mobile operator maintenance; 38 have no backup path and need a priority visit. The answer describes the procedure, not the case of today.',
          outcome: 'alarma', with: { approved: 'In the shift alarm: {label}.', any: 'In the shift alarm, the proposal was rejected.' },
          without: 'The decision on those panels is taken in the shift alarm.',
          go: 'alarma', goLabel: 'Open the alarm'
        }
      },
      {
        id: 'C2', ref: 'HOM 2026 · C2', sec: 'C', topic: 'Switch-to-backup times', conf: 'alta',
        qEn: 'Please give recent examples of panel communication losses, with the time taken to restore supervision.',
        en: 'The three latest communication outages were resolved by switching the panels to the IP backup path in 22 minutes at most and were closed as compliant: 37 panels on 12/08/2026 in 18 minutes [1], 12 panels on 02/09/2026 in 9 minutes [2] and 61 panels on 30/09/2026 in 22 minutes [3].',
        cites: [
          { src: 'COM-LOG', q: 'ALM-COM-0488 · 12/08/2026 · 37 panels · mobile operator outage · switched to IP backup in 18 min · closed compliant' },
          { src: 'COM-LOG', q: 'ALM-COM-0552 · 02/09/2026 · 12 panels · antenna failure · switched to IP backup in 9 min · closed compliant' },
          { src: 'COM-LOG', q: 'ALM-COM-0590 · 30/09/2026 · 61 panels · mobile operator maintenance · switched to IP backup in 22 min · closed compliant' }
        ],
        note: {
          tone: 'ok', icon: 'check-circle', title: 'Applied today',
          text: 'This procedure was applied this morning in the shift alarm:',
          outcome: 'alarma', requires: 'approved', with: { approved: '{label}.' }
        }
      },
      {
        id: 'C3', ref: 'HOM 2026 · C3', sec: 'C', topic: 'Customer cancellation and equipment removal', conf: 'alta',
        qEn: 'What process do you follow when a customer of the brand requests cancellation, and how do you remove the equipment and the data?',
        en: 'Cancellation is acknowledged within 24 h and the equipment is removed within 15 working days at most [1]. Before the panel is removed, the keys, images and customer data are erased [1].',
        cites: [
          { src: 'PR-BAJ-005', q: 'Cancellation acknowledged within 24 h and equipment removed within 15 working days, with keys, images and customer data erased before the panel is removed' }
        ]
      },
      {
        id: 'D1', ref: 'HOM 2026 · D1', sec: 'D', topic: 'Installation traceability and mock recall', conf: 'media',
        qEn: 'Can you trace an installation back to the manufacturer and forward to the contract and work orders? State your target time for a full trace and the date and result of your last mock product recall.',
        en: 'Yes. Each installation is linked in Salesforce and SAP Business One to the equipment purchase, its lot, its contract and every work order. For example, INS-2026-VLC-04417 traces back to the manufacturer purchase FAC-PA-26-3318, with a compliant grade 2 installation [1], and forward to contract PA-2026-30871 of Prosegur Alarmas, installed on 14/09/2026, and 2 work orders [2]. In a recall, the installations with units of a lot are located by lot code [3].',
        cites: [
          { src: 'SAP-INS', q: 'Alarm panel from manufacturer purchase FAC-PA-26-3318 (02/09/2026), received at the Paterna hub at 09:15, grade 2 installation compliant on 14/09/2026 and activation in the Prosegur Partner Portal' },
          { src: 'SF-INS', q: '1 contract: PA-2026-30871 of Prosegur Alarmas, installed 14/09/2026 with 4 detectors and 2 work orders (OT-2026-01120, OT-2026-01198)' },
          { src: 'PR-QLT-006', q: 'the installations with units of the lot are located by lot code in Salesforce CRM' }
        ],
        gap: 'The target time for a full trace and the date and result of the last mock recall are not in the indexed sources.',
        gapGo: 'retirada', gapGoLabel: 'Run a mock recall now', gapOutcome: 'retirada'
      },
      {
        id: 'D2', ref: 'HOM 2026 · D2', sec: 'D', topic: 'Video verification and data protection', conf: 'alta',
        qEn: 'Describe how you comply with the GDPR in video verification: consent, image retention, access control and breach notification.',
        en: 'Video verification is activated only with the signed consent of the customer and on the agreed zones [1]. Images are kept for 30 days at most and access is limited to operators with an authorised profile [2]. Breaches that put people at risk are notified to the AEPD within 72 h at most [3].',
        cites: [
          { src: 'PR-RGPD-002', q: 'Video verification is activated only with the signed consent of the customer and on the agreed zones' },
          { src: 'PR-RGPD-002', q: 'Images are kept for 30 days at most and access is limited to operators with an authorised profile' },
          { src: 'PR-RGPD-002', q: 'Breaches that put people at risk are notified to the AEPD within 72 h at most' }
        ]
      },
      {
        id: 'D3', ref: 'HOM 2026 · D3', sec: 'D', topic: 'Business continuity and cybersecurity', conf: 'none',
        qEn: 'Do you have a documented business continuity plan and cybersecurity measures for panel communications (encryption, key management and incident response)? When were they last reviewed?',
        flag: {
          reason: 'The business continuity plan and the cybersecurity measures for communications are not among the indexed documents.',
          context: 'As a private security company operating alarm systems, Guardián Ibérica Instalaciones should hold both documents in Operations or Compliance. Agentic Platform does not describe their content or assume a review date.',
          partial: [],
          missing: ['Business continuity plan', 'Cybersecurity measures for panel communications', 'Date of the last review of each document']
        }
      },
      {
        id: 'E1', ref: 'HOM 2026 · E1', sec: 'E', topic: 'Staff and training', conf: 'alta',
        qEn: 'How many technicians and operators make up the staff providing the service, and what training do they receive each year?',
        en: 'The staff is made up of 74 installer technicians and 12 technical support operators, 100% with annual brand training [1].',
        cites: [
          { src: 'MEM-2025', q: 'Staff: 74 installer technicians and 12 technical support operators, 100% with annual brand training' }
        ]
      },
      {
        id: 'E2', ref: 'HOM 2026 · E2', sec: 'E', topic: 'Public liability insurance', conf: 'alta',
        qEn: 'Do you hold public liability insurance for security companies? Please give the limit of cover, its scope and its validity.',
        en: 'Yes. The public liability policy for private security companies has a limit of 3,000,000 EUR per claim and year, valid until 31/12/2026 [1], and covers personal injury, property damage and consequential loss caused during the installation and maintenance of alarm systems [2].',
        cites: [
          { src: 'POL-RC', q: 'limit of 3,000,000 EUR per claim and year, valid until 31/12/2026' },
          { src: 'POL-RC', q: 'Covers personal injury, property damage and consequential loss caused during the installation and maintenance of alarm systems' }
        ]
      }
    ]
  }
});
