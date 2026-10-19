/* Guardián Ibérica Instalaciones · From words to workflow (English). Demo scenario with synthetic data (MFM).
 * Same structure as ../workflow.js. Schema in the header of assets/js/scenes/workflow.js. Regex on folded text (lower case, no accents).
 * Severity is an ascending threshold: the critical level sits above the warning threshold. */
agenticPackEn('alarmas', {
  workflow: {
    space: 'Operations · Paterna',
    author: 'decider',
    authorNoun: 'Operations',
    alarmMatch: 'communication|panels|remote monitoring|offline',
    approverRoles: ['support_shift', 'decider'],
    noArticleRoles: [],
    defaultPolicy: 'PR-COM-003',
    approverRule: {
      policy: 'PR-COM-003',
      text: 'only Technical Support and Operations approve failovers and priority visits',
      note: 'Reassigned: PR-COM-003 reserves failovers and priority visits for Technical Support and Operations'
    },
    triggerExamples: 'When more than 40 panels lose communication... or Every day at 07:00...',
    rolePatterns: [
      ['support_shift', '\\btechnical support (?:manager|lead)\\b|\\bsupport manager\\b'],
      ['install_shift', '\\binstallation (?:manager|lead)\\b|\\binstallations (?:manager|lead)\\b'],
      ['maintenance_shift', '\\bmaintenance (?:manager|lead)\\b'],
      ['warehouse_shift', '\\bwarehouse manager\\b'],
      ['compliance', '\\bdpo\\b|\\bcompliance (?:manager|officer)\\b'],
      ['finance', '\\bfinance manager\\b'],
      ['customer_care', '\\bcustomer care\\b'],
      ['decider', '\\boperations manager\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:buy\\w*|bought|sell\\w*|sold|invest\\w*|trad(?:e|es|ing))\\b[^.;]{0,60}\\b(?:shares?|stocks? in|equities|bitcoins?|crypto\\w*|currenc(?:y|ies))\\b|\\bbank transfers?\\b|\\b(?:transfer|wire) (?:money|funds)\\b',
        title: 'Financial transaction',
        body: 'The text asks to buy or sell shares or to move money. No agent in the Operations · Paterna space trades on markets or makes payments, and Agentic Platform does not create steps that no enabled agent can perform.'
      },
      {
        id: 'personas',
        re: '\\b(?:evaluat\\w*|assess\\w*|scor\\w*|rank\\w*|monitor\\w*|measure|sanction\\w*|dismiss\\w*|fire)\\b[^.;]{0,45}\\b(?:workers?|employees?|staff|workforce|personnel|people|operators?|technicians?|installers?)\\b',
        title: 'Assessment of people',
        body: 'The text asks to assess, monitor or score people. Workflows in this space work on panels, installations, work orders and customer cases; they do not rate anyone\'s performance.'
      },
      {
        id: 'control',
        re: '\\b(?:change|adjust|lower|raise|modify)\\b[^.;]{0,35}\\b(?:prices?|rates?|fees?|penalt(?:y|ies)|contract (?:terms|conditions))\\b',
        title: 'Change of prices or terms',
        body: 'The text asks to change prices, fees or contract terms. Agentic Platform reads Salesforce, SAP and the partner portals, but it does not set commercial terms: those changes are approved by Finance from its own system.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Trigger', 'A communication alarm in the Verisure Partner Portal, an email in the Customer Care inbox or a set time.'],
      ['cpu', '', 'Steps and systems', 'Which agent performs each step and which system it reads or updates: Salesforce CRM, SAP Business One, the partner portals, Twilio SMS or Slack.'],
      ['user-check', 'warn', 'Human approval', 'Who decides before anything is switched over, visited or sent, under PR-COM-003.'],
      ['file-text', '', 'Outputs', 'Work orders, cases, notifications and reports produced by the workflow.']
    ],
    idleNote: 'Each element is linked to the sentence it comes from and checked against the Operations procedures before the draft is saved.',
    presenter: {
      idle: [
        'This is how Operations writes a procedure: in plain English, as in its process document. Nothing to draw, nothing to program.',
        'Agentic Platform turns it into a platform workflow: trigger, agents in order, human approval and outputs, each linked to its sentence.',
        'To be clear: text-to-workflow generation is simulated here and its integration into Agentic Platform is validated in the pilot; workflows (Routines), the editor, approval and auditing are standard.'
      ],
      outOfScopeExample: 'Buy shares in a sensor manufacturer when the stock market falls'
    },

    templates: {
      alarma: {
        label: 'Communication loss',
        icon: 'activity',
        refs: 'PR-COM-003',
        text: 'When more than 40 panels lose 4G communication for more than 10 minutes, locate the affected panels, their brand (Verisure, Sector Alarm or Prosegur Alarmas), their customer and whether they have an IP backup path. Propose switching to the backup path and a priority visit to the panels without backup, which the Technical Support Manager must approve before it is applied. If more than 150 panels lose communication, treat it as critical. Once the proposal is approved, open an incident in Salesforce with the case summary, notify the Maintenance Manager via Slack to dispatch the visits and send an SMS to the affected customers.'
      },
      reclamacion: {
        label: 'Complaint',
        icon: 'mail',
        refs: 'PR-SOP-007',
        text: 'When a customer complaint about guard call-out charges arrives in the Customer Care inbox, register it in Salesforce (customer, contract, amount claimed and response deadline) and send an acknowledgement within 24 h. Trace the installation and the contract (panel, sensors, false alarm history and battery alerts, and partner charges). Prepare a draft review report under PR-SOP-007, including similar complaints from the last 12 months, and the customer response in their language. The Finance Manager must approve the customer response before it is sent; deliver the review report within 10 working days.'
      },
      parte: {
        label: 'Daily report',
        icon: 'activity',
        refs: 'PR-MAN-004 and PR-QLT-006',
        text: 'Every day at 07:00, review the status of the Paterna hub in Salesforce CRM, SAP Business One and Samsara Fleet (scheduled installations, preventive maintenance, urgent work orders, warehouse stock and available vans) and compare it with the operations thresholds. For each indicator in warning or critical state, open a ticket with the recommended action, without duplicating tickets that are already open. If a detector from lot PIR-2607-A of campaign REC-2026-1019 is still in the warehouse or installed without a visit, propose holding it until it passes review, which the Technical Support Manager must approve. Publish the report summary in the Operations Slack channel.'
      }
    },

    catalog: {
      cold_chain_monitor: {
        agent: 'Communication monitor', icon: 'activity', systems: ['Verisure Partner Portal', 'Sector Alarm Partner Hub', 'Prosegur Partner Portal'],
        what: 'Reads the panels without communication, confirms they exceed the threshold and classifies the outage',
        name: 'Panel communication loss', verb: 'check the communication', token: 'comunicacion',
        keywords: ['\\bpanels?\\b', '\\bcommunication\\b', '\\bremote monitoring\\b', '\\blos(?:e|es|s|ing) (?:4g )?communication\\b'],
        strong: ['\\bconfirm\\w*', '\\bclassif\\w*', '\\bmeasure\\b', '\\bmonitor(?:s|ing)?\\b']
      },
      complaint_intake: {
        agent: 'Complaint intake', icon: 'mail', systems: ['Email', 'Salesforce CRM'],
        what: 'Registers the complaint and extracts customer, contract, amount and deadline',
        name: 'Customer complaint', verb: 'register the complaint', token: 'reclamacion',
        keywords: ['\\bcomplain\\w*', '\\bcharges?\\b'],
        strong: ['\\bregister\\w*', '\\blog\\b', '\\bextract\\b']
      },
      ec_plant_monitor: {
        agent: 'Daily operations report', icon: 'activity', systems: ['Salesforce CRM', 'SAP Business One', 'Samsara Fleet'], multi: 2,
        what: 'Compares the hub indicators with thresholds and opens tickets without duplicating open ones',
        name: 'Daily operations report', verb: 'run the hub report', token: 'parte-hub',
        keywords: ['\\bdaily report\\b', '\\bstatus of the \\w+ hub\\b', '\\bindicators?\\b', '\\boperations thresholds\\b', '\\btickets? with the\\b', '\\btickets? that are\\b'],
        strong: ['\\breview\\w*', '\\bindicators?\\b', '\\btickets?\\b']
      },
      campaign_planner: {
        agent: 'Visit plan', icon: 'calendar', systems: ['Salesforce CRM', 'Samsara Fleet'],
        what: 'Compares planned visits with available technicians and the vans of each zone',
        name: 'Visit plan', verb: 'plan the visits', token: 'plan-visitas',
        keywords: ['\\bvisit plan\\b', '\\bvisit planning\\b', '\\btechnician routes?\\b'],
        strong: ['\\bplan(?:s|ning)?\\b']
      },
      lot_traceability: {
        agent: 'Installation traceability', icon: 'git-branch', systems: ['Salesforce CRM', 'SAP Business One', 'Verisure Partner Portal', 'Sector Alarm Partner Hub', 'Prosegur Partner Portal'],
        what: 'Locates panels, sensors, contracts and customers of an installation or lot, backwards and forwards',
        name: 'Installation traceability', verb: 'trace installations', token: 'traza',
        keywords: ['\\btraceab\\w*', '\\btrac(?:e|es|ed|ing)\\b', '\\b(?:locat|identif)\\w*\\s+(?:the\\s+|all\\s+)?(?:affected\\s+)?(?:panels|sensors|contracts|customers|installations|detectors)\\b', '\\b(?:backwards?|forwards?)\\b'],
        strong: ['\\btrac(?:e|es|ing)\\b', '\\btraceab\\w*', '\\blocat\\w*', '\\bidentif\\w*']
      },
      quality_hold: {
        agent: 'Failover or visit', icon: 'lock', systems: ['Verisure Partner Portal', 'Sector Alarm Partner Hub', 'Prosegur Partner Portal', 'SAP Business One'], hitl: true, restricted: true, gateVerb: 'applying the failover',
        what: 'Proposes the switch to the backup path, the priority visit or the equipment hold and only applies them after approval',
        name: 'Failover, visit or hold', verb: 'switch over, visit or hold', token: 'conmutacion',
        keywords: ['\\bswitch(?:ing)? to the backup\\b', '\\bfailover\\b', '\\bpriority visit\\b', '\\bbackup path\\b', '\\bholding it\\b', '\\bhold on\\b', '\\bblock(?:ed|ing)?\\b', '\\bquarantin\\w*', '\\bretain\\w*'],
        strong: ['\\bswitch(?:ing)? to the backup\\b', '\\bfailover\\b', '\\bpriority visit\\b', '\\bholding it\\b', '\\bhold on\\b', '\\bblock(?:ed|ing)?\\b', '\\bquarantin\\w*', '\\bretain\\w*']
      },
      quality_incident: {
        agent: 'Incidents', icon: 'clipboard', systems: ['Salesforce CRM', 'Slack', 'Twilio SMS'],
        what: 'Opens the incident with the case summary and sends the notifications',
        name: 'Operations incident', verb: 'open an incident', token: 'incidencia',
        keywords: ['\\bincidents?\\b', '\\breview report\\b', '\\bnotif(?:y|ies)\\b', '\\b(?:post|publish)\\w* the (?:\\w+ ){0,2}summary\\b', '\\bsms\\b'],
        strong: ['\\bincidents?\\b', '\\breview report\\b', '\\b(?:post|publish)\\w* the (?:\\w+ ){0,2}summary\\b', '\\bnotif(?:y|ies)\\b']
      },
      notifier: {
        agent: 'Customer response', icon: 'send', systems: ['Email'], hitl: true, gateVerb: 'sending the response',
        what: 'Drafts the response in the language of the customer and sends it once approved',
        name: 'Customer response', verb: 'respond to the customer', token: 'respuesta',
        keywords: ['\\bcustomer response\\b', '\\b(?:reply|response|answer) to the customer\\b', '\\b(?:reply to|respond to|answer) the customer\\b'],
        strong: ['\\bcustomer response\\b', '\\b(?:reply|response|answer) to the customer\\b', '\\b(?:reply to|respond to|answer) the customer\\b']
      }
    },

    domains: {
      alarma: {
        first: 'cold_chain_monitor',
        slug: 'wf-perdida-comunicacion-paneles',
        name: 'Panel communication loss',
        approver: 'support_shift',
        approverOptions: ['support_shift', 'decider'],
        policy: 'PR-COM-003',
        go: 'alarma',
        goLabel: 'Test it with the Valencia North alarm',
        next: 'The next communication alarm from the partner portals runs it. The Valencia North alarm (ALM-COM-0611) from 05:50 is still open.',
        trigger: {
          system: 'Verisure Partner Portal', type: 'comunicacion', icon: 'activity', badges: ['Verisure Partner Portal', 'Sector Alarm Partner Hub'],
          label: 'Panels offline > {threshold}', sub: 'for more than {minutes}',
          entry: 'Communication alarm received by webhook from the partner portal',
          full: 'More than {threshold} panels without 4G communication for more than {minutes}'
        },
        steps: {
          cold_chain_monitor: { sub: 'Critical > {critical}', what: 'Reads the panels without 4G communication, confirms the outage and classifies it (critical above {critical} panels)' },
          lot_traceability: { sub: 'Brand, customer and backup', what: 'Affected panels with their brand (Verisure, Sector Alarm or Prosegur Alarmas), their customer and whether they have an IP backup path' },
          quality_hold: { sub: 'After approval', what: 'Proposes switching to the backup path and a priority visit to the panels without backup; it is applied in the partner portals and scheduled in Salesforce only after approval', outputs: [{ icon: 'lock', text: 'Switch to the backup path and priority visits scheduled, after approval' }] },
          quality_incident: { sub: 'Case, alert and SMS', systems: ['Salesforce CRM', 'Slack', 'Twilio SMS'], what: 'Opens the incident in Salesforce with the case summary, notifies {al:notify} to dispatch the visits and sends an SMS to the affected customers', outputs: [{ icon: 'clipboard', text: 'Incident in Salesforce with the case summary' }, { icon: 'message-square', text: 'Slack notification to {al:notify}' }, { icon: 'send', text: 'SMS via Twilio to the affected customers' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Incident report (PDF) with the audit trail' }],
        params: [
          { key: 'threshold', label: 'Panels offline', name: 'Panels offline', type: 'number', unit: 'panels', min: 5, max: 200, step: 5, value: 40, integer: true, below: 'critical', ref: 'PR-COM-003', hint: 'PR-COM-003: 40 panels', extract: { from: 'trigger', re: '(\\d{1,3})\\s*panels?\\b' } },
          { key: 'minutes', label: 'For more than', name: 'Time without communication', type: 'number', unit: 'min', min: 1, max: 120, step: 1, value: 10, integer: true, ref: 'PR-COM-003', hint: 'PR-COM-003: 10 min', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Critical outage', name: 'Critical outage', type: 'number', unit: 'panels', min: 10, max: 500, step: 10, value: 150, integer: true, above: 'threshold', ref: 'PR-COM-003', hint: 'PR-COM-003: 150 panels', hl: 'Critical', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,3})\\s*panels?\\b' } },
          { key: 'approver', label: 'Approves the failover', ref: 'PR-COM-003', hint: 'PR-COM-003: only Technical Support and Operations approve' },
          { key: 'notify', label: 'Notify', name: 'Notification', type: 'role', value: 'maintenance_shift', options: ['maintenance_shift', 'install_shift', 'customer_care'], ref: 'Policy', hint: 'Via Slack, to dispatch the visits', extract: { kind: 'role', cap: 'quality_incident' } }
        ],
        check: { id: 'umbral', ref: 'PR-COM-003', keys: ['threshold', 'minutes'], label: 'Threshold and time', describe: 'more than {threshold} for more than {minutes}', extra: 'critical above {critical}', action: 'Checks the thresholds against PR-COM-003' },
        scenarios: [
          'more than {threshold} panels lose 4G communication for more than {minutes}',
          'a communication alarm goes off for Verisure, Sector Alarm or Prosegur Alarmas panels (e.g. Valencia North)',
          'the user reports that some panels are no longer monitored remotely',
          'the installations left unmonitored by a communication outage need to be assessed'
        ],
        testUtterance: 'Alarm: 214 panels without 4G communication in Valencia North since 05:10',
        matchGroups: [
          { re: '\\bpanels?\\b|\\binstallations?\\b|\\balarm\\w*', w: 0.3, label: 'panels' },
          { re: '\\bcommunication\\b|\\b4g\\b|\\bconnection\\b|\\bmonitoring\\b|\\boutage\\b|\\boffline\\b', w: 0.3, label: 'communication' },
          { re: '\\bwithout communication\\b|\\blos(?:t|e|es|s)\\b|\\bsince\\b|\\bmobile operator\\b', w: 0.25, label: 'outage' },
          { re: '\\bvalencia\\b|\\bpaterna\\b|\\bnorth\\b', w: 0.07, label: 'Valencia North' }
        ],
        config: {
          cold_chain_monitor: [['panels_threshold', '{=threshold}'], ['minutes_offline', '{=minutes}'], ['critical_panels', '{=critical}'], ['scope', 'Verisure, Sector Alarm and Prosegur Alarmas panels in Valencia, Alicante and Castellón']],
          quality_hold: [['approver', '{approver}'], ['policy', 'PR-COM-003']],
          quality_incident: [['template', 'Communication incident'], ['notify', '{notify}'], ['channel', 'Slack + SMS']]
        },
        say: {
          draft: [
            'Every sentence is linked to what it understood: the trigger comes from more than {threshold} panels... for more than {minutes}.',
            'Each step says which system it touches: the partner portals for communication and failover; Salesforce and SAP Business One for customers and contracts; Salesforce, Slack and Twilio for the incident and the notifications.',
            'The failover and the visits are not applied without approval from Technical Support: PR-COM-003 requires it, and the workflow enforces it even if the text did not say so.'
          ],
          published: ["From now on, a communication alarm from the partner portals triggers it automatically. Let's see it with this morning's real alarm: Valencia North, 05:50."]
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-cargos-vigilante',
        name: 'Customer complaint about guard call-out charges',
        approver: 'finance',
        approverOptions: ['finance', 'decider'],
        policy: 'PR-SOP-007',
        go: 'reclamacion',
        goLabel: 'Test it with complaint CLM-2026-0619',
        next: 'The next complaint email runs it. Complaint CLM-2026-0619 (2 charges of 39.00 EUR for false alarms) is escalated to Finance.',
        trigger: {
          system: 'Email', type: 'correo', icon: 'mail', badges: ['Email'],
          label: 'Complaint in the Customer Care inbox', sub: 'about guard charges',
          entry: 'Customer Care inbox',
          full: 'Customer complaint in the Customer Care inbox about guard call-out charges'
        },
        steps: {
          complaint_intake: { sub: 'Acknowledgement within {ack}', what: 'Registers the complaint in Salesforce, extracts customer, contract, amount and deadline, and sends the acknowledgement within {ack}', outputs: [{ icon: 'clipboard', text: 'Complaint registered in Salesforce with the extracted data' }] },
          lot_traceability: { sub: 'Full trace', what: 'Traces the installation and the contract: panel, sensors, false alarm history and battery alerts, and partner charges', outputs: [{ icon: 'git-branch', text: 'Installation trace with contract, sensors and charges' }] },
          quality_incident: { sub: 'Report within {days}', systems: ['Salesforce CRM', 'Procedimientos'], what: 'Prepares the draft review report (PR-SOP-007) with similar complaints from the last {months}', outputs: [{ icon: 'file-text', text: 'Draft review report (PR-SOP-007), due within {days}' }] },
          notifier: { sub: 'After approval', what: 'Drafts the response in the language of the customer; it is sent by email only after approval', outputs: [{ icon: 'send', text: 'Customer response, sent after approval' }] }
        },
        params: [
          { key: 'ack', label: 'Acknowledgement', name: 'Acknowledgement', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'PR-SOP-007', hint: 'PR-SOP-007: 24 h', extract: { from: 'text', re: '\\backnowledge?ment\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|hours?)\\b' } },
          { key: 'days', label: 'Review report', name: 'Report deadline', type: 'number', unit: 'days', unitLong: 'working days', min: 1, max: 30, step: 1, value: 10, integer: true, ref: 'PR-SOP-007', hint: 'PR-SOP-007: 10 working days', hl: 'Report deadline', extract: { from: 'text', re: '(\\d{1,2})\\s*(?:working|business) days\\b' } },
          { key: 'months', label: 'Complaint history', name: 'Complaint history', type: 'number', unit: 'months', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Policy', hint: 'History from Salesforce', hl: 'History', extract: { from: 'text', re: '(\\d{1,2})\\s*months\\b' } },
          { key: 'approver', label: 'Approves the response', ref: 'PR-SOP-007', hint: 'Before anything is sent to the customer' }
        ],
        check: { id: 'plazos', ref: 'PR-SOP-007', keys: ['ack', 'days'], label: 'Deadlines', describe: 'acknowledgement within {ack} and review report within {days}', action: 'Checks the deadlines against PR-SOP-007' },
        scenarios: [
          'a customer complaint about guard call-out charges after a false alarm arrives in the Customer Care inbox',
          'a customer complains of being charged a call-out for a false alarm and threatens to cancel',
          'a customer complaint needs to be registered as a case in Salesforce'
        ],
        testUtterance: 'We have received a complaint from Marta Soler Pons: she was charged two guard call-outs for false alarms on 12 and 14 October and threatens to cancel',
        matchGroups: [
          { re: '\\bcomplain\\w*', w: 0.35, label: 'complaint' },
          { re: '\\bcustomers?\\b', w: 0.2, label: 'customer' },
          { re: '\\bcharges?\\b|\\bcall-?outs?\\b|\\bguard\\b|\\bfalse alarms?\\b|\\bpenalt\\w*|\\bcancel\\w*', w: 0.25, label: 'charges' },
          { re: '\\bcontracts?\\b|\\bsa-\\d{4}|\\bclm-\\d{4}|\\binstallation\\w*', w: 0.12, label: 'contract' }
        ],
        config: {
          complaint_intake: [['ack_hours', '{=ack}'], ['system', 'Salesforce CRM']],
          quality_incident: [['template', 'Review report · PR-SOP-007'], ['deadline_working_days', '{=days}'], ['history_months', '{=months}']],
          notifier: [['language', 'that of the customer'], ['approver', '{approver}']]
        },
        say: {
          draft: [
            'Every sentence of the text is linked to what it understood: the email to the Customer Care inbox triggers the workflow and the deadlines come from the text itself.',
            'The trace reaches the panel, the sensors, the false alarm history and the partner charges, and the report is prepared with similar complaints.',
            'Nothing goes to the customer without approval from {del:approver}; the response is drafted in the language of the customer.'
          ],
          published: ['The next complaint email runs it automatically. Let\'s see it with complaint CLM-2026-0619.']
        }
      },
      parte: {
        first: 'ec_plant_monitor',
        slug: 'wf-parte-diario-hub',
        name: 'Daily operations report · Paterna',
        approver: 'support_shift',
        approverOptions: ['support_shift', 'decider'],
        policy: 'PR-COM-003',
        go: 'turno',
        goLabel: 'See the shift daily report',
        next: 'It runs every day at {time}.',
        trigger: {
          system: 'Scheduled', type: 'programado', icon: 'clock', badges: [],
          label: 'Every day at {time}', sub: 'Scheduled',
          entry: 'Daily server schedule · {time}'
        },
        steps: {
          ec_plant_monitor: { sub: '12 indicators', what: 'Reads Salesforce, SAP Business One and Samsara Fleet, compares 12 hub indicators with the operations thresholds and opens tickets without duplicating open ones', outputs: [{ icon: 'ticket', text: 'Operations tickets, without duplicating open ones' }] },
          quality_hold: { sub: 'If there is a recall', gateVerb: 'holding detectors', what: 'If a detector from lot PIR-2607-A (campaign REC-2026-1019) is still in the warehouse or installed without a visit, proposes holding it until it passes review (PR-QLT-006)', outputs: [{ icon: 'lock', text: 'Hold on the detectors of lot PIR-2607-A, after approval' }] },
          quality_incident: { sub: 'Summary in Slack', systems: ['Slack'], what: 'Posts the report summary in the Operations · Paterna channel', outputs: [{ icon: 'message-square', text: 'Summary in the Operations · Paterna Slack channel' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Daily operations report (PDF)' }],
        params: [
          { key: 'time', label: 'Report time', name: 'Report time', type: 'time', value: '07:00', ref: 'Policy', hint: 'Readings from Salesforce, SAP and Samsara', extract: { kind: 'time' } },
          { key: 'approver', label: 'Approves the hold', ref: 'PR-COM-003', hint: 'PR-MAN-004 · PR-QLT-006' }
        ],
        staticChecks: [
          { id: 'recall', text: 'Lot PIR-2607-A of the PIR-200 detector: detectors in the warehouse are not installed until they pass review (PR-QLT-006)', stream: { action: 'Checks the report against PR-QLT-006', result: 'REC-2026-1019: 1,386 installed in 912 homes, 960 in the warehouse and 54 returned' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bwithout duplicating\\b', label: 'Rule', check: 'Tickets without duplicating those already open' }],
        scenarios: [
          'it is {time} and the daily operations report for the Paterna hub is due',
          'the user asks for the daily report on the hub',
          'the user asks which operations indicators are in warning today'
        ],
        testUtterance: 'Run the daily report for the Paterna hub',
        matchGroups: [
          { re: '\\breport\\b', w: 0.35, label: 'report' },
          { re: '\\bhub\\b|\\boperations\\b|\\binstallations\\b|\\bmaintenance\\b|\\bindicators?\\b|\\bfleet\\b', w: 0.3, label: 'operations' },
          { re: '\\bdaily\\b|\\btoday\\b|\\bshift\\b', w: 0.15, label: 'daily' },
          { re: '\\bpaterna\\b|\\bvalencia\\b', w: 0.1, label: 'Paterna' }
        ],
        config: {
          ec_plant_monitor: [['time', '{time}'], ['systems', '3'], ['indicators', '12'], ['tickets', 'without duplicating open ones']],
          quality_hold: [['approver', '{approver}'], ['policy', 'PR-MAN-004 · PR-QLT-006']],
          quality_incident: [['channel', 'Slack · Operations · Paterna']]
        },
        say: {
          draft: [
            'The report is scheduled: every day at {time}, without anyone asking for it.',
            'It opens tickets only for items without an open one, and it holds detectors only with approval from {del:approver}.'
          ],
          published: ["Tomorrow at {time} it runs on its own; today's report is in the shift summary."]
        }
      }
    }
  }
});
