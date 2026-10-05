/* Autopista Multimotor · From words to workflow (English). Demo scenario with synthetic data (MFM).
 * Same structure as ../workflow.js. Schema in the header of assets/js/scenes/workflow.js. Regex on folded text (lower case, no accents).
 * Critical stock is a descending threshold: the minimum sits above the critical level. */
agenticPackEn('autopista', {
  workflow: {
    space: 'Operations · Madrid',
    author: 'decider',
    authorNoun: 'Operations',
    alarmMatch: 'stock|units available|available units|inventory',
    approverRoles: ['brand_manager', 'finance'],
    noArticleRoles: [],
    defaultPolicy: 'POL-OPS-015',
    approverRule: {
      policy: 'POL-OPS-015',
      text: 'only Brand and Finance approve orders and holds',
      note: 'Reassigned: POL-OPS-015 reserves orders and holds for Brand and Finance'
    },
    triggerExamples: '“When the stock of a model falls below…” or “Every day at 07:00…”',
    rolePatterns: [
      ['brand_manager', '\\bbrand manager\\b'],
      ['finance', '\\bfinance manager\\b'],
      ['sales_shift', '\\bsales shift (?:manager|lead|supervisor)\\b|\\bsales supervisor\\b'],
      ['workshop_shift', '\\bworkshop manager\\b'],
      ['rental_shift', '\\brental fleet manager\\b'],
      ['subscription_shift', '\\bsubscription manager\\b'],
      ['customer_care', '\\bcustomer care team\\b'],
      ['decider', '\\boperations manager\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:buy\\w*|bought|sell\\w*|sold|invest\\w*|trad(?:e|es|ing))\\b[^.;]{0,60}\\b(?:shares?|stocks? in|equities|bitcoins?|crypto\\w*|currenc(?:y|ies))\\b|\\bbank transfers?\\b|\\b(?:transfer|wire) (?:money|funds)\\b',
        title: 'Financial transaction',
        body: 'The text asks to buy or sell shares or to move money. No agent in the Operations · Madrid space trades on markets or makes payments, and Agentic Platform does not create steps that no enabled agent can perform.'
      },
      {
        id: 'personas',
        re: '\\b(?:evaluat\\w*|assess\\w*|scor\\w*|rank\\w*|monitor\\w*|measure|sanction\\w*|dismiss\\w*|fire)\\b[^.;]{0,45}\\b(?:workers?|employees?|staff|workforce|personnel|people|operators?|salespeople|mechanics?)\\b',
        title: 'Assessment of people',
        body: 'The text asks to assess, monitor or score people. Workflows in this space work on vehicles, orders, contracts and customer cases; they do not rate anyone’s performance.'
      },
      {
        id: 'control',
        re: '\\b(?:change|adjust|lower|raise|modify)\\b[^.;]{0,35}\\b(?:prices?|rates?|apr|interest rates?|financing (?:terms|conditions))\\b',
        title: 'Change of prices or terms',
        body: 'The text asks to change prices, rates or financing terms. Agentic Platform reads Salesforce, SAP and Banco Sabadell offers, but it does not set commercial terms: those changes are approved by Finance from its own system.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Trigger', 'A stock alarm in Odoo Inventory, an email in the Customer Care inbox or a set time.'],
      ['cpu', '', 'Steps and systems', 'Which agent performs each step and which system it reads or updates: SAP ERP, Odoo Inventory, Salesforce CRM, iCare Workshop or Slack.'],
      ['user-check', 'warn', 'Human approval', 'Who decides before anything is ordered, held or sent, under POL-OPS-015.'],
      ['file-text', '', 'Outputs', 'Orders, cases, notifications and reports produced by the workflow.']
    ],
    idleNote: 'Each element is linked to the sentence it comes from and checked against the Operations procedures before the draft is saved.',
    presenter: {
      idle: [
        'This is how Operations writes a procedure: in plain English, as in its process document. Nothing to draw, nothing to program.',
        'Agentic Platform turns it into a platform workflow: trigger, agents in order, human approval and outputs, each linked to its sentence.',
        'To be clear: text-to-workflow generation is simulated here and its integration into Agentic Platform is validated in the pilot; workflows (Routines), the editor, approval and auditing are standard.'
      ],
      outOfScopeExample: 'Buy shares in a carmaker when the stock market falls'
    },

    templates: {
      alarma: {
        label: 'Critical stock',
        icon: 'box',
        refs: 'POL-OPS-012 and POL-OPS-015',
        text: 'When the available stock of a model at the Madrid hub falls below 5 units for more than 24 hours, locate the reservations and planned deliveries for that model and the customers waiting. Propose an urgent replenishment order to the manufacturer in SAP ERP and reserve the remaining unit in Odoo Inventory, which the Brand Manager must approve before it is applied. If stock falls below 2 units, treat it as critical. Once the order is approved, open an incident in Salesforce with the case summary and notify the Sales Shift Supervisor via Slack to reschedule the affected deliveries.'
      },
      reclamacion: {
        label: 'Complaint',
        icon: 'mail',
        refs: 'POL-FIN-020',
        text: 'When a customer complaint about a financing discrepancy arrives in the Customer Care inbox, register it in Salesforce (customer, vehicle, contract, amount claimed and response deadline) and send an acknowledgement within 24 h. Trace the vehicle and the contract (VIN, sales order, offer signed in DocuSign and Banco Sabadell terms). Prepare a draft review report under POL-FIN-020, including similar complaints from the last 12 months, and the customer response in their language. The Finance Manager must approve the customer response before it is sent; deliver the review report within 5 working days.'
      },
      parte: {
        label: 'Daily report',
        icon: 'activity',
        refs: 'POL-OPS-015 and POL-OPS-031',
        text: 'Every day at 07:00, review the status of the Madrid hub in iCare Workshop, Odoo Inventory and Salesforce CRM (vehicles available per brand, workshop orders in the queue, rental fleet, subscriptions and deliveries of the day) and compare it with the operations thresholds. For each indicator in warning or critical state, open a ticket with the recommended action, without duplicating tickets that are already open. If a rental vehicle affected by the Volkswagen ABS recall (REC-VW-2026-001) is still pending workshop service, propose holding it until it goes through the workshop, which the Brand Manager must approve. Publish the report summary in the Operations Slack channel.'
      }
    },

    catalog: {
      cold_chain_monitor: {
        agent: 'Stock monitor', icon: 'box', systems: ['Odoo Inventory', 'SAP ERP'],
        what: 'Reads the available stock of the model, confirms it is below the minimum and classifies it',
        name: 'Critical stock of a model', verb: 'check the stock', token: 'stock',
        keywords: ['\\bstock\\b', '\\bunits available\\b', '\\bavailable units\\b', '\\bfalls below \\d+ units\\b'],
        strong: ['\\bconfirm\\w*', '\\bclassif\\w*', '\\bmeasure\\b', '\\bmonitor(?:s|ing)?\\b']
      },
      complaint_intake: {
        agent: 'Complaint intake', icon: 'mail', systems: ['Email', 'Salesforce CRM'],
        what: 'Registers the complaint and extracts customer, vehicle, contract, amount and deadline',
        name: 'Customer complaint', verb: 'register the complaint', token: 'reclamacion',
        keywords: ['\\bcomplain\\w*', '\\bdiscrepanc(?:y|ies)\\b'],
        strong: ['\\bregister\\w*', '\\blog\\b', '\\bextract\\b']
      },
      ec_plant_monitor: {
        agent: 'Daily operations report', icon: 'activity', systems: ['iCare Workshop', 'Odoo Inventory', 'Salesforce CRM'], multi: 2,
        what: 'Compares the hub indicators with thresholds and opens tickets without duplicating open ones',
        name: 'Daily operations report', verb: 'run the hub report', token: 'parte-hub',
        keywords: ['\\bdaily report\\b', '\\bstatus of the \\w+ hub\\b', '\\bindicators?\\b', '\\boperations thresholds\\b', '\\btickets? with the\\b', '\\btickets? that are\\b'],
        strong: ['\\breview\\w*', '\\bindicators?\\b', '\\btickets?\\b']
      },
      campaign_planner: {
        agent: 'Delivery plan', icon: 'calendar', systems: ['Salesforce CRM', 'SAP ERP'],
        what: 'Compares planned deliveries with unit availability and workshop preparation',
        name: 'Delivery plan', verb: 'plan the deliveries', token: 'plan-entregas',
        keywords: ['\\bdelivery plan\\b', '\\bregistration\\b', '\\bdelivery preparation\\b'],
        strong: ['\\bplan(?:s|ning)?\\b']
      },
      lot_traceability: {
        agent: 'Vehicle traceability', icon: 'git-branch', systems: ['SAP ERP', 'Odoo Inventory', 'Salesforce CRM'],
        what: 'Locates reservations, orders, contracts and deliveries of a vehicle or model, backwards and forwards',
        name: 'Vehicle traceability', verb: 'trace vehicles', token: 'traza',
        keywords: ['\\btraceab\\w*', '\\btrac(?:e|es|ed|ing)\\b', '\\b(?:locat|identif)\\w*\\s+(?:the\\s+|all\\s+)?(?:reservations|deliveries|orders|vehicles|contracts)\\b', '\\bvin\\b', '\\b(?:backwards?|forwards?)\\b'],
        strong: ['\\btrac(?:e|es|ing)\\b', '\\btraceab\\w*', '\\blocat\\w*', '\\bidentif\\w*']
      },
      quality_hold: {
        agent: 'Order or hold', icon: 'lock', systems: ['SAP ERP', 'Odoo Inventory'], hitl: true, restricted: true, gateVerb: 'applying the order',
        what: 'Proposes the urgent order or the vehicle hold and only applies it after approval',
        name: 'Order or hold', verb: 'order or hold', token: 'pedido',
        keywords: ['\\burgent replenishment order\\b', '\\bholding it\\b', '\\bhold on\\b', '\\bblock(?:ed|ing)?\\b', '\\bquarantin\\w*', '\\bretain\\w*'],
        strong: ['\\burgent replenishment order\\b', '\\bholding it\\b', '\\bhold on\\b', '\\bblock(?:ed|ing)?\\b', '\\bquarantin\\w*', '\\bretain\\w*']
      },
      quality_incident: {
        agent: 'Incidents', icon: 'clipboard', systems: ['Salesforce CRM', 'Slack'],
        what: 'Opens the incident with the case summary and sends the notifications',
        name: 'Operations incident', verb: 'open an incident', token: 'incidencia',
        keywords: ['\\bincidents?\\b', '\\breview report\\b', '\\bnotif(?:y|ies)\\b', '\\b(?:post|publish)\\w* the (?:\\w+ ){0,2}summary\\b'],
        strong: ['\\bincidents?\\b', '\\breview report\\b', '\\b(?:post|publish)\\w* the (?:\\w+ ){0,2}summary\\b', '\\bnotif(?:y|ies)\\b']
      },
      notifier: {
        agent: 'Customer response', icon: 'send', systems: ['Email'], hitl: true, gateVerb: 'sending the response',
        what: 'Drafts the response in the customer’s language and sends it once approved',
        name: 'Customer response', verb: 'respond to the customer', token: 'respuesta',
        keywords: ['\\bcustomer response\\b', '\\b(?:reply|response|answer) to the customer\\b', '\\b(?:reply to|respond to|answer) the customer\\b'],
        strong: ['\\bcustomer response\\b', '\\b(?:reply|response|answer) to the customer\\b', '\\b(?:reply to|respond to|answer) the customer\\b']
      }
    },

    domains: {
      alarma: {
        first: 'cold_chain_monitor',
        slug: 'wf-stock-critico-modelo',
        name: 'Critical stock of a model',
        approver: 'brand_manager',
        approverOptions: ['brand_manager', 'finance'],
        policy: 'POL-OPS-015',
        go: 'alarma',
        goLabel: 'Test it with the BMW X3 alarm',
        next: 'The next Odoo Inventory stock alarm runs it. The BMW X3 20d alarm (1 unit) from 07:30 is still open.',
        trigger: {
          system: 'Odoo Inventory', type: 'stock', icon: 'box', badges: ['Odoo Inventory'],
          label: 'Stock < {threshold}', sub: 'for more than {hours}',
          entry: 'Odoo Inventory stock alarm received by webhook',
          full: 'Available stock < {threshold} for more than {hours}'
        },
        steps: {
          cold_chain_monitor: { sub: 'Critical < {critical}', what: 'Reads the available stock of the model, confirms it is below the minimum and classifies it (critical below {critical})' },
          lot_traceability: { sub: 'Reservations and deliveries', what: 'Reservations, planned deliveries and waiting customers for that model, such as the BMW X3 20d for José María López' },
          quality_hold: { sub: 'After approval', what: 'Proposes the urgent replenishment order to the manufacturer; it is applied in SAP ERP and the unit is reserved in Odoo Inventory only after approval', outputs: [{ icon: 'lock', text: 'Urgent order in SAP ERP and remaining unit reserved in Odoo Inventory, after approval' }] },
          quality_incident: { sub: 'Case and notification', systems: ['Salesforce CRM', 'Slack'], what: 'Opens the incident in Salesforce with the case summary and notifies {al:notify} to reschedule the affected deliveries', outputs: [{ icon: 'clipboard', text: 'Incident in Salesforce with the case summary' }, { icon: 'message-square', text: 'Slack notification to {al:notify}' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Incident report (PDF) with the audit trail' }],
        params: [
          { key: 'threshold', label: 'Minimum stock', name: 'Minimum stock', type: 'number', unit: 'units', min: 1, max: 30, step: 1, value: 5, integer: true, above: 'critical', ref: 'POL-OPS-012', hint: 'POL-OPS-012: 5 units', extract: { from: 'trigger', re: '(\\d{1,2})\\s*units?\\b' } },
          { key: 'hours', label: 'For more than', name: 'Time below the minimum', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'POL-OPS-012', hint: 'POL-OPS-012: 24 h', extract: { from: 'text', re: '(\\d{1,3})\\s*hours?\\b' } },
          { key: 'critical', label: 'Critical stock', name: 'Critical stock', type: 'number', unit: 'units', min: 0, max: 10, step: 1, value: 2, integer: true, below: 'threshold', ref: 'POL-OPS-012', hint: 'POL-OPS-012: 2 units', hl: 'Critical', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,2})\\s*units?\\b' } },
          { key: 'approver', label: 'Approves the order', ref: 'POL-OPS-015', hint: 'POL-OPS-015: only Brand and Finance approve orders' },
          { key: 'notify', label: 'Notify', name: 'Notification', type: 'role', value: 'sales_shift', options: ['sales_shift', 'workshop_shift', 'customer_care'], ref: 'Policy', hint: 'Via Slack, to reschedule deliveries', extract: { kind: 'role', cap: 'quality_incident' } }
        ],
        check: { id: 'umbral', ref: 'POL-OPS-012', keys: ['threshold', 'hours'], label: 'Threshold and time', describe: 'below {threshold} for more than {hours}', extra: 'critical below {critical}', action: 'Checks the thresholds against POL-OPS-012' },
        scenarios: [
          'the available stock of a model at the Madrid hub falls below {threshold} for more than {hours}',
          'a stock alarm goes off for a BMW, Audi, Volkswagen, Skoda or Seat model (e.g. the BMW X3 20d)',
          'the user reports that few units of a model are left',
          'the reservations and deliveries affected by critical stock need to be assessed'
        ],
        testUtterance: 'Alarm: the BMW X3 20d has had 1 unit available in Madrid for 30 hours',
        matchGroups: [
          { re: '\\bstock\\b|\\bunits?\\b|\\bmodel\\b|\\bx3\\b|\\bvin-\\d{4}', w: 0.3, label: 'stock' },
          { re: '\\bavailable\\b|\\bleft\\b|\\bremain\\w*|\\bcritical\\b|\\blow\\b|\\bfalls?\\b', w: 0.3, label: 'availability' },
          { re: '\\balarm\\w*|\\bexceed\\w*|\\bbelow\\b|\\bfor \\d+ hours\\b|\\bsince\\b', w: 0.25, label: 'alarm' },
          { re: '\\bmadrid\\b', w: 0.07, label: 'Madrid' }
        ],
        config: {
          cold_chain_monitor: [['minimum_stock_units', '{=threshold}'], ['hours_below', '{=hours}'], ['critical_stock_units', '{=critical}'], ['scope', 'BMW, Audi, Volkswagen, Skoda and Seat models at the Madrid hub']],
          quality_hold: [['approver', '{approver}'], ['policy', 'POL-OPS-015']],
          quality_incident: [['template', 'Stock incident'], ['notify', '{notify}'], ['channel', 'Slack']]
        },
        say: {
          draft: [
            'Every sentence is linked to what it understood: the trigger comes from “falls below {threshold} for more than {hours}”.',
            'Each step says which system it touches: Odoo Inventory for the stock; SAP ERP and Salesforce for reservations and deliveries; SAP ERP for the order; Salesforce and Slack for the incident.',
            'The order is not applied without approval from Brand: POL-OPS-015 requires it, and the workflow enforces it even if the text did not say so.'
          ],
          published: ['From now on, an Odoo Inventory stock alarm triggers it automatically. Let’s see it with this morning’s real alarm: BMW X3 20d, 07:30.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-financiacion',
        name: 'Customer complaint about a financing discrepancy',
        approver: 'finance',
        approverOptions: ['finance', 'brand_manager'],
        policy: 'POL-FIN-020',
        go: 'reclamacion',
        goLabel: 'Test it with complaint CLM-2026-001',
        next: 'The next complaint email runs it. Complaint CLM-2026-001 (APR 3.99% versus 4.25%) is escalated to Finance.',
        trigger: {
          system: 'Email', type: 'correo', icon: 'mail', badges: ['Email'],
          label: 'Complaint in the Customer Care inbox', sub: 'about financing',
          entry: 'Customer Care inbox',
          full: 'Customer complaint in the Customer Care inbox about a financing discrepancy'
        },
        steps: {
          complaint_intake: { sub: 'Acknowledgement within {ack}', what: 'Registers the complaint in Salesforce, extracts customer, vehicle, contract, amount and deadline, and sends the acknowledgement within {ack}', outputs: [{ icon: 'clipboard', text: 'Complaint registered in Salesforce with the extracted data' }] },
          lot_traceability: { sub: 'Full trace', what: 'Traces the vehicle and the contract: VIN, sales order in SAP, offer signed in DocuSign and Banco Sabadell terms', outputs: [{ icon: 'git-branch', text: 'Vehicle trace with VIN, order and signed contract' }] },
          quality_incident: { sub: 'Report within {days}', systems: ['Salesforce CRM', 'Procedimientos'], what: 'Prepares the draft review report (POL-FIN-020) with similar complaints from the last {months}', outputs: [{ icon: 'file-text', text: 'Draft review report (POL-FIN-020), due within {days}' }] },
          notifier: { sub: 'After approval', what: 'Drafts the response in the customer’s language; it is sent by email only after approval', outputs: [{ icon: 'send', text: 'Customer response, sent after approval' }] }
        },
        params: [
          { key: 'ack', label: 'Acknowledgement', name: 'Acknowledgement', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'POL-FIN-020', hint: 'POL-FIN-020: 24 h', extract: { from: 'text', re: '\\backnowledge?ment\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|hours?)\\b' } },
          { key: 'days', label: 'Review report', name: 'Report deadline', type: 'number', unit: 'days', unitLong: 'working days', min: 1, max: 30, step: 1, value: 5, integer: true, ref: 'POL-FIN-020', hint: 'POL-FIN-020: 5 working days', hl: 'Report deadline', extract: { from: 'text', re: '(\\d{1,2})\\s*(?:working|business) days\\b' } },
          { key: 'months', label: 'Complaint history', name: 'Complaint history', type: 'number', unit: 'months', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Policy', hint: 'History from Salesforce', hl: 'History', extract: { from: 'text', re: '(\\d{1,2})\\s*months\\b' } },
          { key: 'approver', label: 'Approves the response', ref: 'POL-FIN-020', hint: 'Before anything is sent to the customer' }
        ],
        check: { id: 'plazos', ref: 'POL-FIN-020', keys: ['ack', 'days'], label: 'Deadlines', describe: 'acknowledgement within {ack} and review report within {days}', action: 'Checks the deadlines against POL-FIN-020' },
        scenarios: [
          'a customer complaint about a financing discrepancy on their vehicle arrives in the Customer Care inbox',
          'a customer complains that the APR on the invoice does not match the contract and the file needs to be reviewed',
          'a customer complaint needs to be registered as a case in Salesforce'
        ],
        testUtterance: 'We have received a complaint from Roberto García: the contract for his BMW X5 40d says an APR of 3.99% and the invoice says 4.25%',
        matchGroups: [
          { re: '\\bcomplain\\w*', w: 0.35, label: 'complaint' },
          { re: '\\bcustomers?\\b', w: 0.2, label: 'customer' },
          { re: '\\bapr\\b|\\bfinancing\\b|\\binvoice\\b|\\binterest\\b|\\bdiscrepanc\\w*|\\boverch\\w*', w: 0.25, label: 'financing' },
          { re: '\\bvehicles?\\b|\\bcontracts?\\b|\\bvin-\\d{4}|\\bclm-\\d{4}', w: 0.12, label: 'vehicle' }
        ],
        config: {
          complaint_intake: [['ack_hours', '{=ack}'], ['system', 'Salesforce CRM']],
          quality_incident: [['template', 'Review report · POL-FIN-020'], ['deadline_working_days', '{=days}'], ['history_months', '{=months}']],
          notifier: [['language', 'the customer’s'], ['approver', '{approver}']]
        },
        say: {
          draft: [
            'Every sentence of the text is linked to what it understood: the email to the Customer Care inbox triggers the workflow and the deadlines come from the text itself.',
            'The trace reaches the VIN, the sales order, the offer signed in DocuSign and the Banco Sabadell terms, and the report is prepared with similar complaints.',
            'Nothing goes to the customer without approval from {del:approver}; the response is drafted in the customer’s language.'
          ],
          published: ['The next complaint email runs it automatically. Let’s see it with complaint CLM-2026-001.']
        }
      },
      parte: {
        first: 'ec_plant_monitor',
        slug: 'wf-parte-diario-hub',
        name: 'Daily operations report · Madrid',
        approver: 'brand_manager',
        approverOptions: ['brand_manager', 'finance'],
        policy: 'POL-OPS-015',
        go: 'turno',
        goLabel: 'See the shift daily report',
        next: 'It runs every day at {time}.',
        trigger: {
          system: 'Scheduled', type: 'programado', icon: 'clock', badges: [],
          label: 'Every day at {time}', sub: 'Scheduled',
          entry: 'Daily server schedule · {time}'
        },
        steps: {
          ec_plant_monitor: { sub: '12 indicators', what: 'Reads iCare Workshop, Odoo Inventory and Salesforce, compares 12 hub indicators with the operations thresholds and opens tickets without duplicating open ones', outputs: [{ icon: 'ticket', text: 'Operations tickets, without duplicating open ones' }] },
          quality_hold: { sub: 'If there is a recall', gateVerb: 'holding vehicles', what: 'If a rental vehicle affected by the Volkswagen ABS recall (REC-VW-2026-001) is still pending workshop service, proposes holding it until it goes through the workshop (POL-OPS-031)', outputs: [{ icon: 'lock', text: 'Hold on rental vehicles affected by the recall, after approval' }] },
          quality_incident: { sub: 'Summary in Slack', systems: ['Slack'], what: 'Posts the report summary in the “Operations · Madrid” channel', outputs: [{ icon: 'message-square', text: 'Summary in the “Operations · Madrid” Slack channel' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Daily operations report (PDF)' }],
        params: [
          { key: 'time', label: 'Report time', name: 'Report time', type: 'time', value: '07:00', ref: 'Policy', hint: 'Readings from iCare, Odoo and Salesforce', extract: { kind: 'time' } },
          { key: 'approver', label: 'Approves the hold', ref: 'POL-OPS-015', hint: 'POL-OPS-015 · POL-OPS-031' }
        ],
        staticChecks: [
          { id: 'recall', text: 'Volkswagen ABS recall: affected rental Golfs do not leave until serviced (POL-OPS-031)', stream: { action: 'Checks the report against POL-OPS-031', result: 'REC-VW-2026-001: 35 of 47 units pending; deadline 2026-11-15' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bwithout duplicating\\b', label: 'Rule', check: 'Tickets without duplicating those already open' }],
        scenarios: [
          'it is {time} and the daily operations report for the Madrid hub is due',
          'the user asks for the daily report on the hub',
          'the user asks which operations indicators are in warning today'
        ],
        testUtterance: 'Run the daily report for the Madrid hub',
        matchGroups: [
          { re: '\\breport\\b', w: 0.35, label: 'report' },
          { re: '\\bhub\\b|\\boperations\\b|\\bworkshop\\b|\\bindicators?\\b|\\bfleet\\b', w: 0.3, label: 'operations' },
          { re: '\\bdaily\\b|\\btoday\\b|\\bshift\\b', w: 0.15, label: 'daily' },
          { re: '\\bmadrid\\b', w: 0.1, label: 'Madrid' }
        ],
        config: {
          ec_plant_monitor: [['time', '{time}'], ['systems', '3'], ['indicators', '12'], ['tickets', 'without duplicating open ones']],
          quality_hold: [['approver', '{approver}'], ['policy', 'POL-OPS-015 · POL-OPS-031']],
          quality_incident: [['channel', 'Slack · Operations · Madrid']]
        },
        say: {
          draft: [
            'The report is scheduled: every day at {time}, without anyone asking for it.',
            'It opens tickets only for items without an open one, and it holds vehicles only with approval from {del:approver}.'
          ],
          published: ['Tomorrow at {time} it runs on its own; today’s is in the shift summary.']
        }
      }
    }
  }
});
