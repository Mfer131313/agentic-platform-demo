/* Guardián Ibérica Instalaciones · Operations procedure search with citations (English). Demo scenario with synthetic data (MFM). */
agenticPackEn('alarmas', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedures',
    title: 'Ask the procedures',
    agent: 'Procedures',
    system: 'Salesforce Knowledge',
    source: 'Salesforce Knowledge · controlled Operations documents',
    indexed_at: '2026-10-19T06:00',
    doc_org: 'Guardián Ibérica Instalaciones · Operations',
    ui: {
      page_title: 'Operations procedure search',
      intro_title: 'Ask about the Paterna hub procedures',
      intro_text: 'Every sentence of the answer cites the document and the section it comes from. If no indexed document covers it, the search says so and does not answer.',
      placeholder: 'Type a question about the Operations procedures',
      context_title: 'Applied to the Paterna hub today',
      permission: 'Operations · Paterna',
      asker_initials: 'OM',
      asker_role: 'Operations Manager',
      route_to: 'Operations and Compliance'
    },
    report: { title: 'Operations procedure search', code_prefix: 'CON-PROC', filename: 'procedure-search', scope_label: 'Site', scope: 'Paterna (Valencia) · GII hub' },
    presenter: {
      say: [
        'Search of the Operations procedures: the answer comes only from the controlled documents, and every sentence carries its citation to the document and section.',
        'Seven documents are indexed: installation and commissioning, preventive maintenance, false alarms, video verification and personal data, panel communication loss, customer cancellation and product recall. Here they are synthetic; in the pilot, your current ones.'
      ],
      say_empty: 'It helps to train new technicians and operators, to prepare the brand approvals and to answer customers with the exact reference.',
      say_answered: 'Clicking a citation opens the document with the exact passage highlighted. And the answer is cross-checked with what is happening today: the communication outage ALM-COM-0611, complaint CLM-2026-0619 or campaign REC-2026-1019.',
      say_none: 'When there is no source it says so and invents nothing: no answer and no citation. If the topic is in a document that is not indexed, it names it (PR-QLT-010) and lets you route the question to Operations.',
      next_empty: 'Click "What should we do if an alarm panel loses 4G communication?" and then citation 1 to see the highlighted passage.',
      next_answered: 'Type a question with no source, for example "How often do we run the recall drill?", and click "Ask".',
      next_done: 'Move on to the next scene with the right arrow.'
    },

    docs: [
      {
        code: 'PR-INS-001',
        title: 'Installation and commissioning (grade 2)',
        short: 'Installation and commissioning',
        type: 'Procedure',
        version: '5',
        date: '2026-03-10',
        owner: 'Installations',
        summary: 'Grade 2 installation according to UNE-EN 50131: panel with 4G communication and an IP backup path, test of each detector and of the communication with the receiving centre, and activation in the brand portal within 24 h.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'Grade 2 installation according to UNE-EN 50131: panel with 4G communication and an IP backup path, test of each detector and of the communication with the receiving centre, and activation in the brand portal within 24 h.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Define how a grade 2 residential or small-business alarm is installed and commissioned according to UNE-EN 50131, for the three brands of which Guardián Ibérica Instalaciones is an authorised installer.',
            'It applies to new installations and extensions for Verisure, Sector Alarm and Prosegur Alarmas carried out by the technicians of the Paterna hub and of the Alicante and Castellón branches.'
          ] },
          { id: '2', heading: '2. Responsibilities', list: [
            'Installer technician: installs, tests and leaves photographic evidence of the installation.',
            'Installations Manager: assigns the work order, reviews installations with incidents and signs off exceptions.',
            'Customer Care: confirms the appointment and hands over the manual and the access codes.'
          ] },
          { id: '3', heading: '3. Installation criterion', text: [
            'The installation is carried out as grade 2 of UNE-EN 50131: panel with 4G main communication and an IP backup path, indoor siren and detectors in each zone defined with the customer.',
            'Equipment is installed only if it comes from a lot with a receipt recorded in SAP Business One; blocked lots are not installed.'
          ] },
          { id: '4', heading: '4. Commissioning and tests', text: [
            'Before completing the installation, the technician carries out the following tests and records them in the work order:'
          ], list: [
            'Test of each detector and of the siren.',
            'Test of 4G communication and of the IP backup path with the alarm receiving centre.',
            'Check of the battery level of the panel and of each wireless sensor.',
            'Photos of the panel, of each detector and of the siren.',
            'Customer training and signature of the handover.'
          ] },
          { id: '5', heading: '5. Activation with the brand', text: [
            'The installation is activated in the brand partner portal (Verisure Partner Portal, Sector Alarm Partner Hub or Prosegur Partner Portal) within 24 h of commissioning.',
            'Until the activation is confirmed, the installation is not invoiced and does not count as active.'
          ] },
          { id: '6', heading: '6. Records', list: [
            'Work order, tests and photos: Salesforce CRM.',
            'Equipment and lot of each installed unit: SAP Business One.',
            'Contract activation: brand partner portal.'
          ] },
          { id: '7', heading: '7. Installation code', text: [
            'Format INS-<year>-<branch>-<no.>. Example: INS-2026-VLC-04417 is installation 04417 recorded at the Valencia branch in 2026.'
          ] }
        ]
      },
      {
        code: 'PR-MAN-004',
        title: 'Annual preventive maintenance',
        short: 'Preventive maintenance',
        type: 'Procedure',
        version: '4',
        date: '2026-02-16',
        owner: 'Maintenance',
        summary: 'Annual service of each installation with a test of detectors, siren and communication, and replacement of batteries below 30%. A low-battery alert not acknowledged within 48 h triggers a visit.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'Annual service of each installation with a test of detectors, siren and communication, and replacement of batteries below 30%. A low-battery alert not acknowledged within 48 h triggers a visit.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Keep the active installations (around 38,000) operational with an annual preventive service and handle low-battery alerts before they cause false alarms or loss of supervision.'
          ] },
          { id: '2', heading: '2. Annual plan', text: [
            'Salesforce CRM generates the annual visit of each installation and Twilio SMS alerts the customer 7 days in advance.'
          ] },
          { id: '3', heading: '3. Service content', text: [
            'At each visit the maintenance technician carries out:'
          ], list: [
            'Test of each detector, of the siren and of 4G and backup communication.',
            'Measurement of the battery of the panel and of each wireless sensor.',
            'Replacement of any battery below 30% charge during the visit itself.',
            'Update of the panel firmware if the brand has published one.',
            'Recording of the result and the photos in the work order.'
          ] },
          { id: '4', heading: '4. Low-battery alert', text: [
            'A sensor with a low battery generates an alert in the brand partner portal and in Salesforce CRM.',
            'If the alert is not acknowledged within 48 h, a replacement visit is scheduled with an SMS alert to the customer through Twilio.',
            'A sensor with a low battery cannot be left unattended until the next annual service.'
          ] },
          { id: '5', heading: '5. Priority', text: [
            'Urgent maintenance (low-battery alert without acknowledgement, communication failure or unresponsive sensor) is handled before scheduled preventive visits.'
          ] },
          { id: '6', heading: '6. Records', list: [
            'Plan, visits and results: Salesforce CRM.',
            'Batteries and spare parts: SAP Business One.',
            'Customer alerts: Twilio SMS, copied to Salesforce CRM.'
          ] }
        ]
      },
      {
        code: 'PR-SOP-007',
        title: 'False alarm management',
        short: 'False alarms',
        type: 'Procedure',
        version: '6',
        date: '2026-04-14',
        owner: 'Technical Support',
        summary: 'Two false alarms in 30 days open a technical analysis within 48 h. Guard call-out charges are passed on only if the cause is attributable to the customer. Complaint acknowledgement within 24 h and resolution within 10 working days.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'Two false alarms in 30 days open a technical analysis within 48 h. Guard call-out charges are passed on only if the cause is attributable to the customer. Complaint acknowledgement within 24 h and resolution within 10 working days.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Define how a false alarm is analysed, to whom the resulting charges are attributed and how to reply to a customer who complains.'
          ] },
          { id: '2', heading: '2. Definitions', list: [
            'False alarm: activation of the alarm without an intrusion or a real emergency.',
            'Repeated false alarm: two or more false alarms in 30 days at the same installation.',
            'Guard call-out charge: amount the brand passes on to the customer when a guard is sent to an activation.'
          ] },
          { id: '3', heading: '3. Cause analysis', text: [
            'A repeated false alarm opens a technical analysis within 48 h, remote or on site, which reviews:'
          ], list: [
            'Status and battery of the sensors in the zone that triggered the alarm.',
            'Event log of the panel and of the communication.',
            'Recent changes in the installation or in the habits of the customer, such as pets, building work or open windows.'
          ] },
          { id: '4', heading: '4. Allocation of charges', text: [
            'Guard call-out charges are passed on to the customer only when the cause of the false alarm is attributable to the customer.',
            'If the cause is a failure of the equipment or of the service (low-battery sensor, poor installation or communication failure), the charges are cancelled and the amount is refunded to the customer.',
            'While the analysis is open, no new charge is processed on that installation.'
          ] },
          { id: '5', heading: '5. Complaint deadlines', list: [
            'Acknowledgement to the customer: 24 h from receipt.',
            'Resolution: 10 working days from receipt.',
            'Every complaint is recorded in Salesforce CRM with the root cause confirmed with evidence.'
          ] },
          { id: '6', heading: '6. Reply to the customer', text: [
            'The reply is written in the language of the customer and approved by the Operations Manager before it is sent.',
            'A cause is communicated as confirmed only when there is evidence; until then it is presented as a hypothesis under investigation.'
          ] },
          { id: '7', heading: '7. Customer cancellation', text: [
            'If the customer threatens to cancel because of false alarms, Customer Care is alerted and PR-BAJ-005 is applied once the complaint is closed.'
          ] },
          { id: '8', heading: '8. Records', list: [
            'Complaint, cause and deadlines: Salesforce CRM.',
            'Refunds and credit notes: SAP Business One.'
          ] }
        ]
      },
      {
        code: 'PR-RGPD-002',
        title: 'Video verification and personal data',
        short: 'Video verification and GDPR',
        type: 'Procedure',
        version: '3',
        date: '2026-05-26',
        owner: 'Compliance',
        summary: 'Video verification is activated only with consent and on the agreed zones; images are kept for 30 days at most and breaches that put people at risk are notified to the AEPD within 72 h.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'Video verification is activated only with consent and on the agreed zones; images are kept for 30 days at most and breaches that put people at risk are notified to the AEPD within 72 h.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Set how personal data and images are handled in installation, video verification and technical support. Guardián Ibérica Instalaciones acts as data processor for the brand of each customer.'
          ] },
          { id: '2', heading: '2. Video verification', list: [
            'It is activated only with the signed consent of the customer and on the zones agreed at installation.',
            'Cameras must not be aimed at the public road or at third-party spaces.',
            'Images are consulted only when an alarm is triggered and by authorised staff.'
          ] },
          { id: '3', heading: '3. Retention and access', text: [
            'Images are kept for 30 days at most, unless an authority requires them.',
            'Access to images is limited to technical support operators with an authorised profile and every consultation is logged.'
          ] },
          { id: '4', heading: '4. Data breaches', text: [
            'Any suspected data breach is reported to the DPO on the same day.',
            'A breach that puts people at risk is notified to the AEPD within 72 h at most and, where applicable, to the affected customers and the brand.'
          ] },
          { id: '5', heading: '5. Data subject rights', text: [
            'Requests for access, rectification or erasure are answered within one month and recorded in Salesforce CRM.'
          ] },
          { id: '6', heading: '6. Records', list: [
            'Consents and rights requests: Salesforce CRM.',
            'Image access: log of the video verification system.',
            'Breaches and notifications: DPO register.'
          ] }
        ]
      },
      {
        code: 'PR-COM-003',
        title: 'Panel communication loss',
        short: 'Communication loss',
        type: 'Procedure',
        version: '3',
        date: '2026-06-09',
        owner: 'Technical Support',
        summary: 'A panel with no communication for more than 10 min raises an alert; more than 50 panels in the same area is a mass outage. Panels are switched to the IP backup path and panels without a backup receive a priority visit within 24 h.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'A panel with no communication for more than 10 min raises an alert; more than 50 panels in the same area is a mass outage. Panels are switched to the IP backup path and panels without a backup receive a priority visit within 24 h.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Keep remote supervision of the installations when a panel or a group of panels loses communication with the receiving centre. It applies to the panels of the three brands with 4G communication.'
          ] },
          { id: '2', heading: '2. Definitions', list: [
            'Communication loss: panel with no connection to the receiving centre for more than 10 min.',
            'Mass outage: communication loss of more than 50 panels in the same area.',
            'Panel without backup: panel with no operational alternative IP communication path.'
          ] },
          { id: '3', heading: '3. Responsibilities', list: [
            'Technical Support: detects the alert, switches to the backup path and verifies supervision.',
            'Technical Support Manager: approves the plan for a mass outage.',
            'Maintenance Manager: assigns the priority visits to panels without backup.',
            'Customer Care: informs the affected customers.'
          ] },
          { id: '4', heading: '4. Action', text: [
            'In an individual communication loss, Technical Support checks the 4G line and the panel remotely.',
            'In a mass outage, panels that have one are switched to the IP backup path and checked to be supervised again.',
            'Panels without backup receive a priority visit within 24 h at most and, in the meantime, the customer is told that the installation has no remote supervision.'
          ] },
          { id: '5', heading: '5. Communication', list: [
            'Alert to the affected customers by Twilio SMS.',
            'Notification to the brand through its partner portal.',
            'Follow-up in the technical support Slack channel until all panels are recovered.'
          ] },
          { id: '6', heading: '6. Closure', text: [
            'The incident is closed when all affected panels are supervised again; the cause and the panels visited are recorded in Salesforce CRM.'
          ] }
        ]
      },
      {
        code: 'PR-BAJ-005',
        title: 'Customer cancellation and equipment removal',
        short: 'Cancellation and equipment removal',
        type: 'Procedure',
        version: '4',
        date: '2026-03-30',
        owner: 'Customer Care',
        summary: 'Cancellation acknowledged within 24 h, equipment removed within 15 working days and panel deactivated in the brand portal. The penalty is set by the brand contract and is suspended if there is an open complaint about a service failure.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'Cancellation acknowledged within 24 h, equipment removed within 15 working days and panel deactivated in the brand portal. The penalty is set by the brand contract and is suspended if there is an open complaint about a service failure.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Define how the cancellation of a customer of any of the three brands, the removal of the equipment and the erasure of their data are handled.'
          ] },
          { id: '2', heading: '2. Deadlines', list: [
            'Acknowledgement of the cancellation request to the customer: 24 h.',
            'Equipment removal: 15 working days from the request.',
            'Deactivation of the panel and of the customer data: on the day of removal.'
          ] },
          { id: '3', heading: '3. Early cancellation penalty', text: [
            'The early cancellation penalty is the one set by the brand contract (for example, 180 EUR in a Sector Alarm contract) and it is applied by the brand.',
            'If the customer has an open complaint about a failure of the equipment or of the service, the penalty is not processed until the complaint is closed according to PR-SOP-007.'
          ] },
          { id: '4', heading: '4. Equipment removal', list: [
            'Equipment owned by the brand is removed, labelled and returned to the warehouse.',
            'Before the panel is removed, the keys, images and customer data are erased.',
            'The customer is given a signed removal receipt.'
          ] },
          { id: '5', heading: '5. Records', list: [
            'Request and deadlines: Salesforce CRM.',
            'Removed equipment: SAP Business One.',
            'Contract cancellation: brand partner portal.'
          ] }
        ]
      },
      {
        code: 'PR-QLT-006',
        title: 'Product recall',
        short: 'Product recall',
        type: 'Procedure',
        version: '2',
        date: '2026-08-24',
        owner: 'Warehouse',
        summary: 'A lot with a safety risk is blocked in SAP Business One, its installations are located by lot and the affected customers are alerted. Only the Operations Manager releases a recalled lot.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'A lot with a safety risk is blocked in SAP Business One, its installations are located by lot and the affected customers are alerted. Only the Operations Manager releases a recalled lot.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Make sure no product with a safety defect is installed and that those already installed are located and replaced. It applies to all equipment of the three brands.'
          ] },
          { id: '2', heading: '2. Responsibilities', list: [
            'Warehouse Manager: blocks the lot and counts the units in the warehouse, installed and returned.',
            'Installations Manager: schedules the replacement visits.',
            'Operations Manager: approves the campaign and is the only one who releases a recalled lot.',
            'Customer Care: alerts the affected customers.'
          ] },
          { id: '3', heading: '3. Lot block', text: [
            'Every recalled lot is blocked in SAP Business One and in the physical warehouse with a hold label.',
            'SAP Business One does not allow a unit from a blocked lot to be assigned to a work order.'
          ] },
          { id: '4', heading: '4. Locating installations', text: [
            'Installations with units of the lot are located by lot code in Salesforce CRM and SAP Business One, and grouped by brand and branch.'
          ] },
          { id: '5', heading: '5. Alert and replacement', list: [
            'Affected customers are alerted by Twilio SMS and by phone call.',
            'Installations with a safety risk are visited in order of priority.',
            'The brands are informed through their partner portal, and so is the manufacturer.'
          ] },
          { id: '6', heading: '6. Product already installed', text: [
            'If part of the lot is already installed, the Operations Manager launches the alert and drill campaign according to PR-QLT-010 (Recall drill and customer communication).'
          ] },
          { id: '7', heading: '7. Fate of the units', text: [
            'Units in the warehouse are returned to the manufacturer or destroyed with a certificate.',
            'No lot is released because a deadline has expired.'
          ] }
        ]
      }
    ],

    unindexed: {
      'PR-QLT-010': { title: 'Recall drill and customer communication', mentionedIn: { doc: 'PR-QLT-006', sec: '6', quote: 'according to PR-QLT-010 (Recall drill and customer communication)' } }
    },

    suggested: ['comunicacion', 'falsas', 'plazos', 'retirada', 'mantenimiento', 'imagenes'],

    intents: [
      {
        id: 'comunicacion', icon: 'alert-triangle', topic: 'Communication loss · action', scope: 'local',
        q: 'What should we do if an alarm panel loses 4G communication?',
        anchors: ['communication', '4g', 'panel', 'panels', 'supervision', 'outage'],
        terms: ['loses', 'lose', 'lost', 'loss', 'backup', 'switch', 'alarm', 'connection', 'act', 'support', 'mass'],
        min: 3,
        blocks: [
          { t: 'A panel with no connection to the receiving centre for more than 10 min is a communication loss.', c: [['PR-COM-003', 2, 'Communication loss: panel with no connection to the receiving centre for more than 10 min.']] },
          { t: 'Technical Support checks the 4G line and the panel remotely.', c: [['PR-COM-003', 4, 'In an individual communication loss, Technical Support checks the 4G line and the panel remotely.']] },
          { t: 'If more than 50 panels in the same area are affected it is a mass outage: panels are switched to the IP backup path and checked to be supervised again.', c: [['PR-COM-003', 2, 'Mass outage: communication loss of more than 50 panels in the same area.'], ['PR-COM-003', 4, 'In a mass outage, panels that have one are switched to the IP backup path and checked to be supervised again.']] },
          { t: 'The affected customers are alerted by Twilio SMS and the brand through its partner portal.', c: [['PR-COM-003', 5, 'Alert to the affected customers by Twilio SMS.'], ['PR-COM-003', 5, 'Notification to the brand through its partner portal.']] }
        ],
        context: {
          systems: ['Salesforce CRM', 'Twilio SMS'],
          text: 'Alarm ALM-COM-0611 today: 214 panels without 4G communication in Valencia North since 05:10 after a mobile operator maintenance (peak of 241 at 05:42). It is a mass outage under section 2 and needs the approval of the Technical Support Manager.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Open alarm ALM-COM-0611'
        },
        followups: ['sin-respaldo', 'aprobacion']
      },
      {
        id: 'sin-respaldo', icon: 'wrench', topic: 'Communication loss · panels without backup', scope: 'local',
        q: 'What is done with panels that have no backup path?',
        anchors: ['without backup', 'backup', 'priority visit', 'priority'],
        terms: ['panel', 'panels', 'path', 'ip', 'supervision', 'visit', 'customer', 'alternative', 'inform'],
        min: 3,
        blocks: [
          { t: 'Panels without backup receive a priority visit within 24 h at most.', c: [['PR-COM-003', 4, 'Panels without backup receive a priority visit within 24 h at most']] },
          { t: 'In the meantime, the customer is told that the installation has no remote supervision.', c: [['PR-COM-003', 4, 'the customer is told that the installation has no remote supervision']] },
          { t: 'The Maintenance Manager assigns those priority visits.', c: [['PR-COM-003', 3, 'Maintenance Manager: assigns the priority visits to panels without backup.']] }
        ],
        context: {
          systems: ['Salesforce CRM', 'Samsara Flota'],
          text: 'In the alarm of today, 38 of the 214 panels have no IP backup path: under section 4 they receive a priority visit within 24 h at most and in the meantime their customers must know that the installation has no remote supervision.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Open alarm ALM-COM-0611'
        },
        followups: ['comunicacion', 'aprobacion']
      },
      {
        id: 'aprobacion', icon: 'users', topic: 'Communication loss · responsibilities', scope: 'local',
        q: 'Who does what in a mass communication outage?',
        anchors: ['responsible', 'responsibility', 'responsibilities', 'approves', 'approval', 'approve'],
        terms: ['who', 'does', 'decides', 'outage', 'mass', 'plan', 'communication', 'panels', 'support'],
        min: 4,
        blocks: [
          { intro: { t: 'Split of responsibilities in a communication loss:' }, list: [
            { t: 'Technical Support: detects the alert, switches to the backup path and verifies supervision.', c: [['PR-COM-003', 3, 'Technical Support: detects the alert, switches to the backup path and verifies supervision.']] },
            { t: 'Technical Support Manager: approves the plan for a mass outage.', c: [['PR-COM-003', 3, 'Technical Support Manager: approves the plan for a mass outage.']] },
            { t: 'Maintenance Manager: assigns the priority visits to panels without backup.', c: [['PR-COM-003', 3, 'Maintenance Manager: assigns the priority visits to panels without backup.']] },
            { t: 'Customer Care: informs the affected customers.', c: [['PR-COM-003', 3, 'Customer Care: informs the affected customers.']] }
          ] },
          { t: 'The incident is closed when all affected panels are supervised again.', c: [['PR-COM-003', 6, 'The incident is closed when all affected panels are supervised again']] }
        ],
        context: {
          systems: ['Slack', 'Salesforce CRM'],
          text: 'In the alarm of today the Technical Support Manager is the one who approves the plan: switch to IP backup, priority visit to the 38 panels without backup and SMS to the customers.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Open alarm ALM-COM-0611'
        },
        followups: ['comunicacion', 'sin-respaldo']
      },
      {
        id: 'instalacion', icon: 'shield-check', topic: 'Installation · grade 2 requirements', scope: 'local',
        q: 'What does a grade 2 installation under UNE-EN 50131 require?',
        anchors: ['grade 2', 'une-en 50131', '50131', 'grade'],
        terms: ['installation', 'require', 'requires', 'panel', 'requirements', 'alarm', 'detectors', 'siren', 'lot'],
        min: 3,
        blocks: [
          { t: 'Panel with 4G main communication and an IP backup path, indoor siren and detectors in each zone defined with the customer.', c: [['PR-INS-001', 3, 'The installation is carried out as grade 2 of UNE-EN 50131: panel with 4G main communication and an IP backup path, indoor siren and detectors in each zone defined with the customer.']] },
          { t: 'Equipment must come from a lot with a receipt recorded in SAP Business One; blocked lots are not installed.', c: [['PR-INS-001', 3, 'Equipment is installed only if it comes from a lot with a receipt recorded in SAP Business One; blocked lots are not installed.']] }
        ],
        followups: ['puesta', 'codigo']
      },
      {
        id: 'puesta', icon: 'clipboard-check', topic: 'Installation · commissioning and activation', scope: 'local',
        q: 'What tests are carried out when commissioning an installation?',
        anchors: ['commissioning', 'commission', 'tests', 'test'],
        terms: ['installation', 'detector', 'communication', 'battery', 'photos', 'technician', 'siren', 'handover', 'activation'],
        min: 3,
        blocks: [
          { intro: { t: 'Before completing the installation, the technician carries out these tests and records them in the work order:', c: [['PR-INS-001', 4, 'Before completing the installation, the technician carries out the following tests and records them in the work order:']] }, list: [
            { t: 'Test of each detector and of the siren.', c: [['PR-INS-001', 4, 'Test of each detector and of the siren.']] },
            { t: 'Test of 4G communication and of the IP backup path with the receiving centre.', c: [['PR-INS-001', 4, 'Test of 4G communication and of the IP backup path with the alarm receiving centre.']] },
            { t: 'Check of the battery level of the panel and of each wireless sensor.', c: [['PR-INS-001', 4, 'Check of the battery level of the panel and of each wireless sensor.']] },
            { t: 'Photos of the installation, customer training and signature of the handover.', c: [['PR-INS-001', 4, 'Photos of the panel, of each detector and of the siren.'], ['PR-INS-001', 4, 'Customer training and signature of the handover.']] }
          ] },
          { t: 'It is then activated in the brand partner portal within 24 h.', c: [['PR-INS-001', 5, 'within 24 h of commissioning']] }
        ],
        context: {
          systems: ['Salesforce CRM'],
          text: 'There are 61 installations scheduled today: each one must close its tests in the work order before activation in the brand portal.',
          go: 'turno', goLabel: 'View daily report'
        },
        followups: ['codigo', 'mantenimiento']
      },
      {
        id: 'codigo', icon: 'barcode', topic: 'Installation code', scope: 'local',
        q: 'How is the installation code read?',
        anchors: ['installation code', 'code format', 'ins-2026-vlc-04417'],
        terms: ['code', 'read', 'reads', 'means', 'interpret', 'format', 'branch', 'installation'],
        min: 2,
        blocks: [
          { t: 'Format INS-<year>-<branch>-<no.>.', c: [['PR-INS-001', 7, 'Format INS-<year>-<branch>-<no.>.']] },
          { t: 'For example, INS-2026-VLC-04417 is installation 04417 recorded at the Valencia branch in 2026.', c: [['PR-INS-001', 7, 'INS-2026-VLC-04417 is installation 04417 recorded at the Valencia branch in 2026']] }
        ],
        context: {
          systems: ['Salesforce CRM', 'SAP Business One'],
          text: 'Full trace of the example installation, from the receipt of the equipment to its activation in the brand portal:',
          lot: 'INS-2026-VLC-04417'
        },
        followups: ['instalacion', 'puesta']
      },
      {
        id: 'mantenimiento', icon: 'calendar', topic: 'Annual preventive maintenance', scope: 'local',
        q: 'What does the annual preventive maintenance of an installation include?',
        anchors: ['maintenance', 'preventive', 'annual service'],
        terms: ['include', 'includes', 'annual', 'installation', 'batteries', 'sensors', 'visit', 'service', 'test', 'firmware'],
        min: 3,
        blocks: [
          { intro: { t: 'Salesforce CRM generates the annual visit and the customer receives an SMS 7 days in advance. At each visit the technician carries out:', c: [['PR-MAN-004', 2, 'Salesforce CRM generates the annual visit of each installation and Twilio SMS alerts the customer 7 days in advance.']] }, list: [
            { t: 'Test of each detector, of the siren and of 4G and backup communication.', c: [['PR-MAN-004', 3, 'Test of each detector, of the siren and of 4G and backup communication.']] },
            { t: 'Measurement of the battery of the panel and of each wireless sensor.', c: [['PR-MAN-004', 3, 'Measurement of the battery of the panel and of each wireless sensor.']] },
            { t: 'Replacement of any battery below 30% charge during the visit itself.', c: [['PR-MAN-004', 3, 'Replacement of any battery below 30% charge during the visit itself.']] },
            { t: 'Update of the panel firmware and recording of the result in the work order.', c: [['PR-MAN-004', 3, 'Update of the panel firmware if the brand has published one.'], ['PR-MAN-004', 3, 'Recording of the result and the photos in the work order.']] }
          ] }
        ],
        context: {
          systems: ['Salesforce CRM'],
          text: 'The board today shows 118 maintenance visits scheduled, 9 of them urgent. Under section 5, urgent ones are handled before preventive ones.',
          go: 'turno', goLabel: 'View daily report'
        },
        followups: ['bateria', 'falsas']
      },
      {
        id: 'bateria', icon: 'gauge', topic: 'Maintenance · low-battery alert', scope: 'local',
        q: 'What should we do when a sensor reports a low battery?',
        anchors: ['battery', 'batteries', 'sensor', 'sensors'],
        terms: ['low', 'alert', 'replace', 'replacement', 'acknowledge', 'acknowledged', 'visit', 'customer', 'urgent'],
        min: 3,
        blocks: [
          { t: 'A sensor with a low battery generates an alert in the brand partner portal and in Salesforce CRM.', c: [['PR-MAN-004', 4, 'A sensor with a low battery generates an alert in the brand partner portal and in Salesforce CRM.']] },
          { t: 'If the alert is not acknowledged within 48 h, a replacement visit is scheduled with an SMS alert to the customer through Twilio.', c: [['PR-MAN-004', 4, 'If the alert is not acknowledged within 48 h, a replacement visit is scheduled with an SMS alert to the customer through Twilio.']] },
          { t: 'Alerts without acknowledgement are handled as urgent maintenance, before scheduled preventive visits.', c: [['PR-MAN-004', 5, 'Urgent maintenance (low-battery alert without acknowledgement, communication failure or unresponsive sensor) is handled before scheduled preventive visits.']] }
        ],
        context: {
          systems: ['Salesforce CRM', 'Sector Alarm Partner Hub'],
          text: 'CLM-2026-0619: the living-room PIR sensor of the customer had a low battery with no alert generated. That is the root cause the complaint is investigating and the one section 4 should have prevented.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open complaint CLM-2026-0619'
        },
        followups: ['falsas', 'mantenimiento']
      },
      {
        id: 'falsas', icon: 'search', topic: 'False alarms · cause analysis', scope: 'all',
        q: 'What is done after a repeated false alarm at an installation?',
        anchors: ['false alarm', 'false alarms', 'false'],
        terms: ['repeated', 'analysis', 'cause', '30 days', 'installation', 'customer', 'technical'],
        min: 3,
        blocks: [
          { t: 'Two or more false alarms in 30 days at the same installation open a technical analysis within 48 h, remote or on site.', c: [['PR-SOP-007', 2, 'Repeated false alarm: two or more false alarms in 30 days at the same installation.'], ['PR-SOP-007', 3, 'A repeated false alarm opens a technical analysis within 48 h, remote or on site, which reviews:']] },
          { intro: { t: 'The analysis reviews at least:' }, list: [
            { t: 'The status and battery of the sensors in the zone that triggered the alarm.', c: [['PR-SOP-007', 3, 'Status and battery of the sensors in the zone that triggered the alarm.']] },
            { t: 'The event log of the panel and of the communication.', c: [['PR-SOP-007', 3, 'Event log of the panel and of the communication.']] },
            { t: 'Recent changes in the installation or in the habits of the customer.', c: [['PR-SOP-007', 3, 'Recent changes in the installation or in the habits of the customer, such as pets, building work or open windows.']] }
          ] }
        ],
        context: {
          systems: ['Salesforce CRM'],
          text: 'CLM-2026-0619: the customer Marta Soler Pons (Burjassot, Sector Alarm contract SA-2026-77412) had false alarms on 12 and 14/10/2026, two in less than 30 days, so repeated. The probable root cause is a living-room PIR sensor with a low battery.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open complaint CLM-2026-0619'
        },
        followups: ['cargos', 'bateria']
      },
      {
        id: 'cargos', icon: 'mail', topic: 'False alarms · guard call-out charges', scope: 'all',
        q: 'Can guard call-out charges for a false alarm be passed on to the customer?',
        anchors: ['charge', 'charges', 'call-out', 'guard', 'guards'],
        terms: ['false', 'alarm', 'pass', 'customer', 'attributable', 'cancelled', 'refund', 'amount'],
        min: 3,
        blocks: [
          { t: 'Only when the cause of the false alarm is attributable to the customer.', c: [['PR-SOP-007', 4, 'Guard call-out charges are passed on to the customer only when the cause of the false alarm is attributable to the customer.']] },
          { t: 'If the cause is a failure of the equipment or of the service, the charges are cancelled and the amount is refunded to the customer.', c: [['PR-SOP-007', 4, 'If the cause is a failure of the equipment or of the service (low-battery sensor, poor installation or communication failure), the charges are cancelled and the amount is refunded to the customer.']] },
          { t: 'While the analysis is open, no new charge is processed on that installation.', c: [['PR-SOP-007', 4, 'While the analysis is open, no new charge is processed on that installation.']] }
        ],
        context: {
          systems: ['Salesforce CRM', 'SAP Business One'],
          text: 'CLM-2026-0619: two guard call-out charges of 39.00 EUR (78.00 EUR in total) for the false alarms of 12 and 14/10/2026. If the cause is confirmed as the low battery of the PIR sensor, section 4 requires cancelling and refunding them.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open complaint CLM-2026-0619'
        },
        followups: ['plazos', 'falsas']
      },
      {
        id: 'plazos', icon: 'list-checks', topic: 'Customer complaints · deadlines', scope: 'all',
        q: 'What deadlines do we have to reply to a customer complaint?',
        anchors: ['complaint', 'complaints', 'grievance'],
        terms: ['deadline', 'deadlines', 'time', 'reply', 'respond', 'answer', 'acknowledgement', 'days', 'hours', 'when', 'send', 'limit', 'due', 'handle', 'handled', 'process', 'procedure'],
        min: 3,
        blocks: [
          { intro: { t: 'Deadlines of the false alarm and complaints procedure:' }, list: [
            { t: 'Acknowledgement to the customer within 24 h of receipt.', c: [['PR-SOP-007', 5, 'Acknowledgement to the customer: 24 h from receipt.']] },
            { t: 'Resolution within 10 working days of receipt.', c: [['PR-SOP-007', 5, 'Resolution: 10 working days from receipt.']] }
          ] },
          { t: 'The reply is written in the language of the customer and approved by the Operations Manager before it is sent.', c: [['PR-SOP-007', 6, 'The reply is written in the language of the customer and approved by the Operations Manager before it is sent.']] },
          { t: 'A cause is communicated as confirmed only when there is evidence; until then it is a hypothesis under investigation.', c: [['PR-SOP-007', 6, 'A cause is communicated as confirmed only when there is evidence; until then it is presented as a hypothesis under investigation.']] }
        ],
        context: {
          systems: ['Salesforce CRM'],
          text: 'Complaint CLM-2026-0619 (Marta Soler Pons, Burjassot): the 24 h acknowledgement and the 10-working-day resolution run from its receipt. The email of the customer is in Spanish and the reply is written in her language.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open complaint CLM-2026-0619'
        },
        followups: ['falsas', 'penalizacion']
      },
      {
        id: 'penalizacion', icon: 'unlock', topic: 'Cancellation · penalty with an open complaint', scope: 'all',
        q: 'Is the cancellation penalty applied if the customer has an open complaint?',
        anchors: ['penalty', 'penalties', 'penalise', 'lock-in'],
        terms: ['cancellation', 'cancel', 'complaint', 'open', 'customer', 'contract', '180', 'applied', 'brand'],
        min: 3,
        blocks: [
          { t: 'The early cancellation penalty is set by the brand contract and applied by the brand.', c: [['PR-BAJ-005', 3, 'The early cancellation penalty is the one set by the brand contract']] },
          { t: 'With an open complaint about a failure of the equipment or of the service, it is not processed until the complaint is closed according to PR-SOP-007.', c: [['PR-BAJ-005', 3, 'the penalty is not processed until the complaint is closed according to PR-SOP-007']] },
          { t: 'If the customer threatens to cancel because of false alarms, Customer Care is alerted.', c: [['PR-SOP-007', 7, 'If the customer threatens to cancel because of false alarms, Customer Care is alerted']] }
        ],
        context: {
          systems: ['Salesforce CRM'],
          text: 'The customer in CLM-2026-0619 threatens to cancel with a 180 EUR penalty on her Sector Alarm contract SA-2026-77412: while the complaint stays open and the cause points to an equipment failure, the penalty is suspended.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open complaint CLM-2026-0619'
        },
        followups: ['baja', 'plazos']
      },
      {
        id: 'baja', icon: 'truck', topic: 'Customer cancellation and equipment removal', scope: 'all',
        q: 'What steps are followed when a customer asks to cancel the service?',
        anchors: ['cancel', 'cancellation', 'cancelling', 'equipment removal'],
        terms: ['customer', 'asks', 'requests', 'service', 'equipment', 'deadline', 'remove', 'removal', 'data'],
        min: 3,
        blocks: [
          { intro: { t: 'Cancellation deadlines:' }, list: [
            { t: 'Acknowledgement of the request to the customer within 24 h.', c: [['PR-BAJ-005', 2, 'Acknowledgement of the cancellation request to the customer: 24 h.']] },
            { t: 'Equipment removed within 15 working days of the request.', c: [['PR-BAJ-005', 2, 'Equipment removal: 15 working days from the request.']] },
            { t: 'Panel and customer data deactivated on the day of removal.', c: [['PR-BAJ-005', 2, 'Deactivation of the panel and of the customer data: on the day of removal.']] }
          ] },
          { t: 'Before the panel is removed, the keys, images and customer data are erased.', c: [['PR-BAJ-005', 4, 'Before the panel is removed, the keys, images and customer data are erased.']] },
          { t: 'The customer is given a signed removal receipt.', c: [['PR-BAJ-005', 4, 'The customer is given a signed removal receipt.']] }
        ],
        followups: ['penalizacion']
      },
      {
        id: 'imagenes', icon: 'lock', topic: 'Video verification · images and access', scope: 'all',
        q: 'How long are video verification images kept?',
        anchors: ['images', 'image', 'video verification', 'camera', 'cameras', 'kept', 'retention'],
        terms: ['long', 'time', 'period', 'access', 'accessed', 'consent', 'customer', 'days', 'zones'],
        min: 2,
        blocks: [
          { t: 'For 30 days at most, unless an authority requires them.', c: [['PR-RGPD-002', 3, 'Images are kept for 30 days at most, unless an authority requires them.']] },
          { t: 'Access is limited to technical support operators with an authorised profile and every consultation is logged.', c: [['PR-RGPD-002', 3, 'Access to images is limited to technical support operators with an authorised profile and every consultation is logged.']] },
          { t: 'Video verification is activated only with the signed consent of the customer and on the agreed zones.', c: [['PR-RGPD-002', 2, 'It is activated only with the signed consent of the customer and on the zones agreed at installation.']] }
        ],
        followups: ['brecha']
      },
      {
        id: 'brecha', icon: 'shield', topic: 'Personal data · breaches', scope: 'all',
        q: 'How soon must a personal data breach be notified?',
        anchors: ['breach', 'breaches', 'aepd', 'leak'],
        terms: ['notified', 'notify', 'deadline', 'data', 'personal', 'dpo', '72', 'hours', 'customers', 'soon'],
        min: 3,
        blocks: [
          { t: 'Any suspected breach is reported to the DPO on the same day.', c: [['PR-RGPD-002', 4, 'Any suspected data breach is reported to the DPO on the same day.']] },
          { t: 'A breach that puts people at risk is notified to the AEPD within 72 h at most and, where applicable, to the affected customers and the brand.', c: [['PR-RGPD-002', 4, 'A breach that puts people at risk is notified to the AEPD within 72 h at most and, where applicable, to the affected customers and the brand.']] }
        ],
        followups: ['imagenes']
      },
      {
        id: 'retirada', icon: 'package', topic: 'Product recall · block and location', scope: 'local',
        q: 'What should we do with a lot of product that has a safety risk?',
        anchors: ['lot', 'lots', 'recall', 'recalled', 'withdraw', 'withdrawal'],
        terms: ['product', 'risk', 'safety', 'block', 'blocked', 'defect', 'units', 'installations', 'detector'],
        min: 3,
        blocks: [
          { t: 'The lot is blocked in SAP Business One and in the physical warehouse with a hold label.', c: [['PR-QLT-006', 3, 'Every recalled lot is blocked in SAP Business One and in the physical warehouse with a hold label.']] },
          { t: 'SAP Business One does not allow a unit from a blocked lot to be assigned to a work order.', c: [['PR-QLT-006', 3, 'SAP Business One does not allow a unit from a blocked lot to be assigned to a work order.']] },
          { t: 'Installations with units of the lot are located by lot code in Salesforce CRM and SAP Business One.', c: [['PR-QLT-006', 4, 'Installations with units of the lot are located by lot code in Salesforce CRM and SAP Business One']] },
          { t: 'Affected customers are alerted by Twilio SMS and by phone call, and installations with a safety risk are visited first.', c: [['PR-QLT-006', 5, 'Affected customers are alerted by Twilio SMS and by phone call.'], ['PR-QLT-006', 5, 'Installations with a safety risk are visited in order of priority.']] }
        ],
        context: {
          systems: ['SAP Business One', 'Salesforce CRM'],
          text: 'Lot PIR-2607-A of the PIR-200 detector (Sentinela Electronics, lithium battery with an overheating risk): 2,400 units received, 1,386 installed in 912 homes (Verisure 540, Sector Alarm 214, Prosegur Alarmas 158), 960 in the warehouse and 54 returned. Campaign REC-2026-1019.',
          outcome: 'retirada',
          go: 'retirada', goLabel: 'Open campaign REC-2026-1019'
        },
        followups: ['instalado', 'liberar']
      },
      {
        id: 'instalado', icon: 'truck', topic: 'Product recall · units already installed', scope: 'local', kind: 'partial',
        q: 'What is done if the recalled product is already installed in homes?',
        anchors: ['=installed', 'already installed', 'in homes', 'in the homes'],
        terms: ['product', 'lot', 'units', 'customers', 'campaign', 'recall', 'drill'],
        min: 2,
        blocks: [
          { t: 'If part of the lot is already installed, the Operations Manager launches the alert and drill campaign according to PR-QLT-010.', c: [['PR-QLT-006', 6, 'the Operations Manager launches the alert and drill campaign according to PR-QLT-010 (Recall drill and customer communication)']] }
        ],
        note: 'PR-QLT-010 (Recall drill and customer communication) is not among the indexed documents: the steps of the campaign cannot be detailed from this search.',
        followups: ['liberar']
      },
      {
        id: 'liberar', icon: 'unlock', topic: 'Product recall · releasing a lot', scope: 'local',
        q: 'Who can release a recalled lot?',
        anchors: ['release', 'releases', 'released', 'unblock'],
        terms: ['who', 'lot', 'recalled', 'blocked', 'return', 'destroy', 'authorises', 'can'],
        min: 3,
        blocks: [
          { t: 'Only the Operations Manager.', c: [['PR-QLT-006', 2, 'Operations Manager: approves the campaign and is the only one who releases a recalled lot.']] },
          { t: 'Units in the warehouse are returned to the manufacturer or destroyed with a certificate.', c: [['PR-QLT-006', 7, 'Units in the warehouse are returned to the manufacturer or destroyed with a certificate.']] },
          { t: 'No lot is released because a deadline has expired.', c: [['PR-QLT-006', 7, 'No lot is released because a deadline has expired.']] }
        ],
        followups: ['retirada', 'instalado']
      }
    ],

    other_scopes: {
      topic: 'Another site',
      words: ['madrid', 'barcelona', 'seville', 'sevilla', 'bilbao', 'malaga', 'zaragoza'],
      reason: 'The indexed documents on this topic are from the Paterna hub (Valencia); there is no evidence for {x}.'
    },

    gaps: [
      { id: 'simulacro', topic: 'Recall drill and communication', anchors: ['drill', 'drills', 'recall drill', 'mass alert', 'mass communication'],
        reason: 'No indexed document describes the drill or the steps of a customer alert campaign.', related: 'PR-QLT-010' },
      { id: 'cra', topic: 'Receiving centre and security forces', anchors: ['receiving centre', 'receiving center', 'cra', 'police', 'civil guard', 'security forces'],
        reason: 'No indexed document describes the action of the receiving centre or the alert to the security forces.' },
      { id: 'certificados', topic: 'Authorisation and certifications', anchors: ['certificate', 'certificates', 'certification', 'certifications', 'iso', 'authorisation', 'approval', 'audit', 'audits'],
        reason: 'Certificates, authorisation and brand audit reports are not among the indexed documents.' },
      { id: 'subcontratas', topic: 'Subcontractors', anchors: ['subcontractor', 'subcontractors', 'subcontract', 'subcontracting', 'outsourced'],
        reason: 'No indexed document covers the subcontracting of installation or maintenance.' },
      { id: 'precio', topic: 'Prices, discounts and margins', anchors: ['price', 'prices', 'cost', 'costs', 'discount', 'discounts', 'rate', 'rates', 'margin', 'commission'],
        reason: 'Prices, discounts and margins are not part of the indexed Operations procedures.' },
      { id: 'personal', topic: 'Working conditions', anchors: ['holidays', 'payroll', 'salary', 'wage', 'collective agreement', 'headcount', 'dismissal', 'working hours'],
        reason: 'Working conditions are not part of the indexed Operations procedures.' }
    ]
  }
});

/* Canonical summary by code (procedure data): filled in without overwriting what other files may have set.
   PR-COM-003 also carries the parameters other scenes use (communication outage thresholds). */
(function (id) {
  'use strict';
  const pack = window.AGENTIC_INDUSTRIES_EN[id];
  const procs = pack.procedures = pack.procedures || {};
  pack.procedimientos.docs.forEach((d) => {
    const cur = procs[d.code] = procs[d.code] || {};
    if (!cur.title) cur.title = d.title;
    if (!cur.summary) cur.summary = d.summary;
    if (!cur.version) cur.version = d.version;
  });
  const extra = {
    'PR-COM-003': {
      lost_comm_minutes: 10,
      mass_outage_panels: 50,
      priority_visit_hours: 24
    }
  };
  Object.keys(extra).forEach((code) => {
    const cur = procs[code] = procs[code] || {};
    Object.keys(extra[code]).forEach((k) => { if (cur[k] == null) cur[k] = extra[code][k]; });
  });
})('alarmas');
