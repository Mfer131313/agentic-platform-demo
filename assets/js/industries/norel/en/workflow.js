/* Norel Nutrición Animal · From words to workflow (English). Demo scenario with synthetic data (MFM).
 * Same structure as ../workflow.js. Schema in the header of assets/js/scenes/workflow.js. Regex on folded text (lower case, no accents).
 * The Salmonella signal is ascending: the threshold sits below the critical level. */
agenticPackEn('norel', {
  workflow: {
    space: 'Operations and Quality · Madrid',
    author: 'decider',
    authorNoun: 'Operations and Quality',
    alarmMatch: 'salmonella|lims|raw material|rfu|laboratory',
    approverRoles: ['qa_shift', 'decider'],
    noArticleRoles: ['solutions'],
    defaultPolicy: 'PR-CAL-007',
    approverRule: {
      policy: 'PR-CAL-007',
      text: 'only Quality and Food Safety approves blocks and recalls',
      note: 'Reassigned: PR-CAL-007 reserves blocks and recalls for Quality and Food Safety'
    },
    triggerExamples: '"When LIMS records a Salmonella signal above…" or "Every day at 07:00…"',
    rolePatterns: [
      ['qa_shift', '\\bquality and food safety manager\\b|\\bquality manager\\b'],
      ['plant_shift', '\\bplant manager\\b'],
      ['lab_shift', '\\blaboratory manager\\b|\\blab manager\\b'],
      ['solutions', '\\bnorel solutions\\b'],
      ['customer_care', '\\bcustomer care and orders\\b|\\bcustomer care\\b'],
      ['regulatory', '\\bregulatory affairs manager\\b|\\bregulatory affairs\\b'],
      ['logistics', '\\blogistics and export manager\\b|\\blogistics manager\\b'],
      ['decider', '\\boperations and quality manager\\b|\\boperations manager\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:buy\\w*|bought|sell\\w*|sold|invest\\w*|trad(?:e|es|ing))\\b[^.;]{0,60}\\b(?:shares?|stocks? in|equities|bitcoins?|crypto\\w*|currenc(?:y|ies))\\b|\\bbank transfers?\\b|\\b(?:transfer|wire) (?:money|funds)\\b',
        title: 'Financial transaction',
        body: 'The text asks to buy or sell shares or to move money. No agent in the Operations and Quality · Madrid space trades on markets or makes payments, and Agentic Platform does not create steps that no enabled agent can perform.'
      },
      {
        id: 'personas',
        re: '\\b(?:evaluat\\w*|assess\\w*|scor\\w*|rank\\w*|monitor\\w*|measure|sanction\\w*|dismiss\\w*|fire)\\b[^.;]{0,45}\\b(?:workers?|employees?|staff|workforce|personnel|people|operators?|salespeople|technicians?)\\b',
        title: 'Assessment of people',
        body: 'The text asks to assess, monitor or score people. Workflows in this space work on lots, orders, laboratory results and customer cases; they do not rate anyone performance.'
      },
      {
        id: 'control',
        re: '\\b(?:change|adjust|lower|raise|modify)\\b[^.;]{0,35}\\b(?:formulas?|formulations?|doses?|dosage|specifications?|prices?|rates?)\\b',
        title: 'Change of formulas or specifications',
        body: 'The text asks to change formulas, doses, specifications or prices. Agentic Platform reads SAP S/4HANA and LIMS, but it does not modify formulations or additive declarations (Regulation (EC) 1831/2003): those changes are approved by Regulatory Affairs from its own system.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Trigger', 'A positive result in LIMS, an email in the Customer Care inbox or a set time.'],
      ['cpu', '', 'Steps and systems', 'Which agent performs each step and which system it reads or updates: SAP S/4HANA, LIMS, the plant MES, Salesforce, Outlook or Microsoft Teams.'],
      ['user-check', 'warn', 'Human approval', 'Who decides before anything is blocked, held or sent, under PR-CAL-007.'],
      ['file-text', '', 'Outputs', 'Blocks, cases, notices and reports produced by the workflow.']
    ],
    idleNote: 'Each element is linked to the sentence it comes from and checked against the Quality procedures before the draft is saved.',
    presenter: {
      idle: [
        'This is how Operations and Quality writes a procedure: in plain English, as in its process document. Nothing to draw, nothing to program.',
        'Agentic Platform turns it into a platform workflow: trigger, agents in order, human approval and outputs, each linked to its sentence.',
        'To be clear: text-to-workflow generation is simulated here and its integration into Agentic Platform is validated in the pilot; workflows (Routines), the editor, approval and auditing are standard.'
      ],
      outOfScopeExample: 'Buy shares in a feed manufacturer when the stock market falls'
    },

    templates: {
      alarma: {
        label: 'Salmonella in raw material',
        icon: 'flask',
        refs: 'PR-CAL-004 and PR-CAL-007',
        text: 'When LIMS records a Salmonella amplification signal above 100 RFU for more than 15 minutes in a raw-material sample, locate the premix lots made with that raw-material lot, their pallets in the warehouse and their shipments to customers. Propose the quality block of the raw-material lot and of the premix lots in SAP S/4HANA and the immobilisation of the pallets in the plant MES, which the Quality and Food Safety Manager must approve before it is applied. If the signal exceeds 300 RFU, treat it as critical. Once the block is approved, open the nonconformity in SAP S/4HANA with the 8D draft and notify the Plant Manager via Microsoft Teams to hold the shipments.'
      },
      reclamacion: {
        label: 'Complaint',
        icon: 'mail',
        refs: 'PR-LAB-005',
        text: 'When a customer complaint about a vitamin content below the declared value in a premix arrives in the Customer Care inbox, register it in Salesforce (customer, lot, product, parameter claimed, customer report and response deadline) and send an acknowledgement within 24 h. Trace the lot backwards (raw materials and suppliers) and forwards (shipments) and verify the declared content in LIMS under PR-LAB-005. Prepare the draft 8D report, including similar complaints from the last 12 months, and the customer response in their language. The Quality and Food Safety Manager must approve the response before it is sent; deliver the 8D report within 10 working days.'
      },
      parte: {
        label: 'Daily report',
        icon: 'activity',
        refs: 'PR-CAL-004 and PR-CAL-007',
        text: 'Every day at 07:00, review in SAP S/4HANA, the plant MES and LIMS the status of the premix plant and the order office (raw materials received, production orders of the day, pending laboratory results, product in the warehouse and open orders) and compare it with the operations thresholds. For each indicator in warning or critical state, open a ticket with the recommended action, without duplicating tickets that are already open. If a raw material with a pending or positive laboratory result appears in a production order of the day, propose blocking the order until it is released, which the Quality and Food Safety Manager must approve. Publish the report summary in the Operations and Quality Microsoft Teams channel.'
      }
    },

    catalog: {
      cold_chain_monitor: {
        agent: 'Laboratory monitor', icon: 'flask', systems: ['LIMS', 'SAP S/4HANA'],
        what: 'Reads the assay signal in LIMS, confirms the positive and classifies it',
        name: 'Salmonella positive in raw material', verb: 'check the laboratory result', token: 'salmonella',
        keywords: ['\\bsalmonella\\b', '\\bamplification signal\\b', '\\blims\\b', '\\brfu\\b', '\\bpositive\\b'],
        strong: ['\\bconfirm\\w*', '\\bclassif\\w*', '\\bmeasure\\b', '\\bmonitor(?:s|ing)?\\b']
      },
      complaint_intake: {
        agent: 'Complaint intake', icon: 'mail', systems: ['Outlook', 'Salesforce CRM'],
        what: 'Registers the complaint and extracts customer, lot, product, parameter claimed and deadline',
        name: 'Customer complaint', verb: 'register the complaint', token: 'reclamacion',
        keywords: ['\\bcomplain\\w*', '\\bcontent below\\b'],
        strong: ['\\bregister\\w*', '\\blog\\b', '\\bextract\\b']
      },
      ec_plant_monitor: {
        agent: 'Daily operations and quality report', icon: 'activity', systems: ['SAP S/4HANA', 'Plant MES', 'LIMS'], multi: 2,
        what: 'Compares the plant indicators with thresholds and opens tickets without duplicating open ones',
        name: 'Daily operations and quality report', verb: 'run the plant report', token: 'parte-planta',
        keywords: ['\\bdaily report\\b', '\\bstatus of the \\w+(?: \\w+)? plant\\b', '\\bindicators?\\b', '\\boperations thresholds\\b', '\\btickets? with the\\b', '\\btickets? that are\\b'],
        strong: ['\\breview\\w*', '\\bindicators?\\b', '\\btickets?\\b']
      },
      campaign_planner: {
        agent: 'Production plan', icon: 'calendar', systems: ['SAP S/4HANA', 'Plant MES'],
        what: 'Compares production orders with raw-material and line availability',
        name: 'Production plan', verb: 'plan the production', token: 'plan-fabricacion',
        keywords: ['\\bproduction plan\\b', '\\bproduction orders\\b', '\\bproduction planning\\b'],
        strong: ['\\bplan(?:s|ning)?\\b']
      },
      lot_traceability: {
        agent: 'Lot traceability', icon: 'git-branch', systems: ['SAP S/4HANA', 'Plant MES', 'LIMS'],
        what: 'Locates raw-material lots, premix lots, pallets and shipments, backwards and forwards',
        name: 'Lot traceability', verb: 'trace lots', token: 'traza',
        keywords: ['\\btraceab\\w*', '\\btrac(?:e|es|ed|ing)\\b', '\\b(?:locat|identif)\\w*\\s+(?:the\\s+|all\\s+)?(?:lots|pallets|shipments|customers)\\b', '\\b(?:backwards?|forwards?)\\b'],
        strong: ['\\btrac(?:e|es|ing)\\b', '\\btraceab\\w*', '\\blocat\\w*', '\\bidentif\\w*']
      },
      quality_hold: {
        agent: 'Quality block', icon: 'lock', systems: ['SAP S/4HANA', 'Plant MES'], hitl: true, restricted: true, gateVerb: 'applying the block',
        what: 'Proposes the quality block of lots and pallets and only applies it after approval',
        name: 'Quality block', verb: 'block lots', token: 'bloqueo',
        keywords: ['\\bblock(?:ed|ing)?\\b', '\\bimmobili[sz]\\w*', '\\bhold(?:ing)?\\b', '\\bquarantin\\w*', '\\bretain\\w*'],
        strong: ['\\bblock(?:ed|ing)?\\b', '\\bimmobili[sz]\\w*', '\\bhold(?:ing)?\\b', '\\bquarantin\\w*', '\\bretain\\w*']
      },
      quality_incident: {
        agent: 'Nonconformities and notices', icon: 'clipboard', systems: ['SAP S/4HANA', 'Microsoft Teams'],
        what: 'Opens the nonconformity with the 8D draft and sends the notices',
        name: 'Nonconformity', verb: 'open the nonconformity', token: 'no-conformidad',
        keywords: ['\\bnonconformit(?:y|ies)\\b', '\\b8d\\b', '\\breport\\b', '\\bnotif(?:y|ies)\\b', '\\b(?:post|publish)\\w* the (?:\\w+ ){0,2}summary\\b'],
        strong: ['\\bnonconformit(?:y|ies)\\b', '\\b(?:post|publish)\\w* the (?:\\w+ ){0,2}summary\\b', '\\bnotif(?:y|ies)\\b']
      },
      notifier: {
        agent: 'Customer response', icon: 'send', systems: ['Outlook'], hitl: true, gateVerb: 'sending the response',
        what: 'Drafts the response in the customer language and sends it once approved',
        name: 'Customer response', verb: 'respond to the customer', token: 'respuesta',
        keywords: ['\\bcustomer response\\b', '\\b(?:reply|response|answer) to the customer\\b', '\\b(?:reply to|respond to|answer) the customer\\b'],
        strong: ['\\bcustomer response\\b', '\\b(?:reply|response|answer) to the customer\\b', '\\b(?:reply to|respond to|answer) the customer\\b']
      }
    },

    domains: {
      alarma: {
        first: 'cold_chain_monitor',
        slug: 'wf-salmonella-materia-prima',
        name: 'Salmonella positive in raw material',
        approver: 'qa_shift',
        approverOptions: ['qa_shift', 'decider'],
        policy: 'PR-CAL-007',
        go: 'alarma',
        goLabel: 'Test it with the MP-2610-CC-118 alarm',
        next: 'The next LIMS alarm runs it. The MP-2610-CC-118 alarm (ALM-LIMS-0550) from 05:50 is still open.',
        trigger: {
          system: 'LIMS', type: 'laboratorio', icon: 'flask', badges: ['LIMS'],
          label: 'Salmonella signal > {threshold}', sub: 'for more than {minutes}',
          entry: 'LIMS alarm received by webhook',
          full: 'Salmonella amplification signal > {threshold} for more than {minutes}'
        },
        steps: {
          cold_chain_monitor: { sub: 'Critical > {critical}', what: 'Reads the assay signal in LIMS, confirms the positive and classifies it (critical above {critical})' },
          lot_traceability: { sub: 'Lots, pallets and shipments', what: 'Premix lots made with the raw material, their pallets in the warehouse and their shipments to customers' },
          quality_hold: { sub: 'After approval', what: 'Proposes the quality block of the raw material and of the premix lots; it is applied in SAP S/4HANA and the plant MES only after approval', outputs: [{ icon: 'lock', text: 'Quality block in SAP S/4HANA and pallets immobilised in the plant MES, after approval' }] },
          quality_incident: { sub: 'NC, 8D and notice', systems: ['SAP S/4HANA', 'Microsoft Teams'], what: 'Opens the nonconformity in SAP S/4HANA with the 8D draft and notifies {al:notify} to hold the affected shipments', outputs: [{ icon: 'clipboard', text: 'Nonconformity in SAP S/4HANA with the 8D draft' }, { icon: 'message-square', text: 'Teams notice to {al:notify}' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Incident report (PDF) with the audit trail' }],
        params: [
          { key: 'threshold', label: 'Signal threshold', name: 'Signal threshold', type: 'number', unit: 'RFU', min: 20, max: 400, step: 5, value: 100, integer: true, below: 'critical', ref: 'PR-CAL-004', hint: 'PR-CAL-004: 100 RFU', extract: { from: 'trigger', re: '(\\d{1,4})\\s*rfu\\b' } },
          { key: 'minutes', label: 'For more than', name: 'Time above the threshold', type: 'number', unit: 'min', min: 1, max: 120, step: 1, value: 15, integer: true, ref: 'PR-CAL-004', hint: 'PR-CAL-004: 15 min', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Critical positive', name: 'Critical positive', type: 'number', unit: 'RFU', min: 100, max: 800, step: 5, value: 300, integer: true, above: 'threshold', ref: 'PR-CAL-004', hint: 'PR-CAL-004: 300 RFU', hl: 'Critical', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(\\d{1,4})\\s*rfu\\b' } },
          { key: 'approver', label: 'Approves the block', ref: 'PR-CAL-007', hint: 'PR-CAL-007: only Quality and Food Safety blocks and releases' },
          { key: 'notify', label: 'Notify', name: 'Notification', type: 'role', value: 'plant_shift', options: ['plant_shift', 'logistics', 'customer_care'], ref: 'Policy', hint: 'Via Microsoft Teams, to hold shipments', extract: { kind: 'role', cap: 'quality_incident' } }
        ],
        check: { id: 'umbral', ref: 'PR-CAL-004', keys: ['threshold', 'minutes'], label: 'Threshold and time', describe: '{threshold} for more than {minutes}', extra: 'critical above {critical}', action: 'Checks the thresholds against PR-CAL-004' },
        scenarios: [
          'LIMS records a Salmonella signal above {threshold} for more than {minutes} in a raw-material sample',
          'a laboratory alarm goes off for a Salmonella positive in a raw material (e.g. MP-2610-CC-118)',
          'the user reports that a raw material tested positive in a microbiological analysis',
          'the premix lots and shipments exposed to a contaminated raw material need to be assessed'
        ],
        testUtterance: 'Alarm: choline chloride MP-2610-CC-118 has tested positive for Salmonella in LIMS for 40 minutes',
        matchGroups: [
          { re: '\\braw materials?\\b|\\bmp-\\d{4}|\\bcholine\\b|\\bpremix\\w*|\\blots?\\b', w: 0.3, label: 'raw material' },
          { re: '\\bsalmonella\\b|\\bpositive\\w*|\\blims\\b|\\brfu\\b|\\bmicrobiolog\\w*|\\blaborator\\w*', w: 0.3, label: 'laboratory' },
          { re: '\\balarm\\w*|\\bexceed\\w*|\\bfor \\d+ minutes\\b|\\bdetect\\w*|\\bconfirm\\w*', w: 0.25, label: 'alarm' },
          { re: '\\bplant\\b|\\bpremix plant\\b', w: 0.07, label: 'plant' }
        ],
        config: {
          cold_chain_monitor: [['limit_rfu', '{=threshold}'], ['minutes_above', '{=minutes}'], ['critical_rfu', '{=critical}'], ['scope', 'Raw materials of the premix plant (Spain)']],
          quality_hold: [['approver', '{approver}'], ['policy', 'PR-CAL-007']],
          quality_incident: [['template', '8D'], ['notify', '{notify}'], ['channel', 'Microsoft Teams']]
        },
        say: {
          draft: [
            'Every sentence is linked to what it understood: the trigger comes from "above {threshold} for more than {minutes}".',
            'Each step says which system it touches: LIMS for the result; SAP S/4HANA and the plant MES for lots, pallets and shipments; SAP S/4HANA and the MES for the block; SAP S/4HANA and Teams for the incident.',
            'The block is not applied without approval from Quality and Food Safety: PR-CAL-007 requires it, and the workflow enforces it even if the text did not say so.'
          ],
          published: ['From now on, a LIMS alarm for a Salmonella positive triggers it automatically. Let us see it with this morning real alarm: MP-2610-CC-118, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-contenido-aditivo',
        name: 'Customer complaint about content below the declared value',
        approver: 'qa_shift',
        approverOptions: ['qa_shift', 'decider'],
        policy: 'PR-LAB-005',
        go: 'reclamacion',
        goLabel: 'Test it with complaint CLM-2026-1028',
        next: 'The next complaint email runs it. Complaint CLM-2026-1028 (vitamin E 18% below the declared value) is open.',
        trigger: {
          system: 'Email', type: 'correo', icon: 'mail', badges: ['Outlook'],
          label: 'Complaint in the Customer Care inbox', sub: 'about declared content',
          entry: 'Customer Care inbox',
          full: 'Customer complaint in the Customer Care inbox about a content below the declared value in a premix'
        },
        steps: {
          complaint_intake: { sub: 'Acknowledgement within {ack}', what: 'Registers the complaint in Salesforce, extracts customer, lot, product, parameter claimed, customer report and deadline, and sends the acknowledgement within {ack}', outputs: [{ icon: 'clipboard', text: 'Complaint registered in Salesforce with the extracted data' }] },
          lot_traceability: { sub: 'Trace and verification', what: 'Traces the lot backwards (raw materials and suppliers) and forwards (shipments) and verifies the declared content in LIMS (PR-LAB-005)', outputs: [{ icon: 'git-branch', text: 'Lot trace with raw materials, shipments and verification in LIMS' }] },
          quality_incident: { sub: '8D within {days}', systems: ['Salesforce CRM', 'Procedimientos'], what: 'Prepares the draft 8D report with similar complaints from the last {months}', outputs: [{ icon: 'file-text', text: 'Draft 8D report (PR-LAB-005), due within {days}' }] },
          notifier: { sub: 'After approval', what: 'Drafts the response in the customer language; it is sent by email only after approval', outputs: [{ icon: 'send', text: 'Customer response, sent after approval' }] }
        },
        params: [
          { key: 'ack', label: 'Acknowledgement', name: 'Acknowledgement', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'PR-LAB-005', hint: 'PR-LAB-005: 24 h', extract: { from: 'text', re: '\\backnowledge?ment\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|hours?)\\b' } },
          { key: 'days', label: '8D report', name: '8D report deadline', type: 'number', unit: 'days', unitLong: 'working days', min: 1, max: 30, step: 1, value: 10, integer: true, ref: 'PR-LAB-005', hint: 'PR-LAB-005: 10 working days', hl: 'Report deadline', extract: { from: 'text', re: '(\\d{1,2})\\s*(?:working|business) days\\b' } },
          { key: 'months', label: 'Complaint history', name: 'Complaint history', type: 'number', unit: 'months', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Policy', hint: 'History from Salesforce', hl: 'History', extract: { from: 'text', re: '(\\d{1,2})\\s*months\\b' } },
          { key: 'approver', label: 'Approves the response', ref: 'PR-LAB-005', hint: 'Before anything is sent to the customer' }
        ],
        check: { id: 'plazos', ref: 'PR-LAB-005', keys: ['ack', 'days'], label: 'Deadlines', describe: 'acknowledgement within {ack} and 8D report within {days}', action: 'Checks the deadlines against PR-LAB-005' },
        scenarios: [
          'a customer complaint about a vitamin content below the declared value in a premix arrives in the Customer Care inbox',
          'a feed mill complains that its analysis does not match the lot declaration and the file needs to be reviewed',
          'a customer complaint needs to be registered as a case in Salesforce'
        ],
        testUtterance: 'We have received a complaint from Piensos Cuenca Mediterráneo: their analysis of lot PRM-2610-0388 shows a vitamin E content 18% below the declared value',
        matchGroups: [
          { re: '\\bcomplain\\w*', w: 0.35, label: 'complaint' },
          { re: '\\bcustomers?\\b|\\bfeed mill\\b|\\bpiensos\\b', w: 0.2, label: 'customer' },
          { re: '\\bvitamin\\w*|\\btrace element\\w*|\\bcontent\\b|\\bdeclared\\b|\\banalysis\\b|\\bbelow\\b|\\bdeviation\\w*', w: 0.25, label: 'content' },
          { re: '\\blots?\\b|\\bprm-\\d{4}|\\bclm-\\d{4}|\\bmp-\\d{4}', w: 0.12, label: 'lot' }
        ],
        config: {
          complaint_intake: [['ack_hours', '{=ack}'], ['system', 'Salesforce CRM']],
          quality_incident: [['template', '8D · PR-LAB-005'], ['deadline_working_days', '{=days}'], ['history_months', '{=months}']],
          notifier: [['language', 'the customer language'], ['approver', '{approver}']]
        },
        say: {
          draft: [
            'Every sentence of the text is linked to what it understood: the email to the Customer Care inbox triggers the workflow and the deadlines come from the text itself.',
            'The trace reaches the raw materials, suppliers and shipments of the lot, the declared content is verified in LIMS and the 8D is prepared with similar complaints.',
            'Nothing goes to the customer without approval from {del:approver}; the response is drafted in the customer language.'
          ],
          published: ['The next complaint email runs it automatically. Let us see it with complaint CLM-2026-1028.']
        }
      },
      parte: {
        first: 'ec_plant_monitor',
        slug: 'wf-parte-diario-planta',
        name: 'Daily operations and quality report · Madrid',
        approver: 'qa_shift',
        approverOptions: ['qa_shift', 'decider'],
        policy: 'PR-CAL-007',
        go: 'turno',
        goLabel: 'See the shift daily report',
        next: 'It runs every day at {time}.',
        trigger: {
          system: 'Scheduled', type: 'programado', icon: 'clock', badges: [],
          label: 'Every day at {time}', sub: 'Scheduled',
          entry: 'Daily server schedule · {time}'
        },
        steps: {
          ec_plant_monitor: { sub: '12 indicators', what: 'Reads SAP S/4HANA, the plant MES and LIMS, compares 12 premix-plant indicators with the operations thresholds and opens tickets without duplicating open ones', outputs: [{ icon: 'ticket', text: 'Operations tickets, without duplicating open ones' }] },
          quality_hold: { sub: 'If a raw material is unreleased', gateVerb: 'blocking orders', what: 'If a raw material with a pending or positive laboratory result appears in a production order of the day, proposes blocking the order until it is released (PR-CAL-004)', outputs: [{ icon: 'lock', text: 'Block on orders with unreleased raw material, after approval' }] },
          quality_incident: { sub: 'Summary in Teams', systems: ['Microsoft Teams'], what: 'Posts the report summary in the "Operations and Quality · Madrid" channel', outputs: [{ icon: 'message-square', text: 'Summary in the "Operations and Quality · Madrid" Teams channel' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Daily operations and quality report (PDF)' }],
        params: [
          { key: 'time', label: 'Report time', name: 'Report time', type: 'time', value: '07:00', ref: 'Policy', hint: 'Readings from SAP S/4HANA, the plant MES and LIMS', extract: { kind: 'time' } },
          { key: 'approver', label: 'Approves the block', ref: 'PR-CAL-007', hint: 'PR-CAL-007 · PR-CAL-004' }
        ],
        staticChecks: [
          { id: 'mp', text: 'High-risk raw materials (such as choline chloride): not consumed until the Salmonella analysis is released (PR-CAL-004)', stream: { action: 'Checks the report against PR-CAL-004', result: 'MP-2610-CC-118: Salmonella positive (LAB-2610-0933); blocked and not consumed in today orders' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bwithout duplicating\\b', label: 'Rule', check: 'Tickets without duplicating those already open' }],
        scenarios: [
          'it is {time} and the daily operations and quality report for the premix plant is due',
          'the user asks for the daily report on the plant',
          'the user asks which operations or quality indicators are in warning today'
        ],
        testUtterance: 'Run the daily report for the premix plant',
        matchGroups: [
          { re: '\\breport\\b', w: 0.35, label: 'report' },
          { re: '\\bplant\\b|\\boperations\\b|\\bquality\\b|\\bindicators?\\b|\\borders\\b', w: 0.3, label: 'operations' },
          { re: '\\bdaily\\b|\\btoday\\b|\\bshift\\b', w: 0.15, label: 'daily' },
          { re: '\\bpremix\\b|\\bmadrid\\b', w: 0.1, label: 'plant' }
        ],
        config: {
          ec_plant_monitor: [['time', '{time}'], ['systems', '3'], ['indicators', '12'], ['tickets', 'without duplicating open ones']],
          quality_hold: [['approver', '{approver}'], ['policy', 'PR-CAL-007 · PR-CAL-004']],
          quality_incident: [['channel', 'Teams · Operations and Quality · Madrid']]
        },
        say: {
          draft: [
            'The report is scheduled: every day at {time}, without anyone asking for it.',
            'It opens tickets only for items without an open one, and it blocks orders only with approval from {del:approver}.'
          ],
          published: ['Tomorrow at {time} it runs on its own; today is in the shift summary.']
        }
      }
    }
  }
});
