/* Subtropicales Axarquía · From words to workflow (English). Demo scenario with synthetic data (MFM).
 * Same structure as ../workflow.js. Schema in the header of assets/js/scenes/workflow.js. Regex on folded text (lower case, no accents).
 * The temperature is ascending: the threshold sits below the critical level. */
agenticPackEn('fruta', {
  workflow: {
    space: 'Operations and Quality · Axarquía',
    author: 'decider',
    authorNoun: 'Operations and Quality',
    alarmMatch: 'temperature|cold room|ripening|cold chain|compressor|cm-\\d|c[aá]mara|temperatura',
    approverRoles: ['qa_shift', 'decider'],
    noArticleRoles: ['customer_care'],
    defaultPolicy: 'PR-TRZ-003',
    approverRule: {
      policy: 'PR-TRZ-003',
      text: 'only Quality and Food Safety approves holds and recalls',
      note: 'Reassigned: PR-TRZ-003 reserves holds and recalls for Quality and Food Safety'
    },
    triggerExamples: '"When room monitoring records an air temperature above…" or "Every day at 07:00…"',
    rolePatterns: [
      ['qa_shift', '\\bquality and food safety manager\\b|\\bquality manager\\b'],
      ['reception_shift', '\\breception and field manager\\b|\\breception manager\\b'],
      ['ripening_shift', '\\bripening and cold chain manager\\b|\\bripening manager\\b'],
      ['packing_shift', '\\bpacking and packaging manager\\b|\\bpacking manager\\b'],
      ['processing_shift', '\\bprocessing manager\\b'],
      ['lab_shift', '\\blaboratory manager\\b|\\blab manager\\b'],
      ['ecommerce', '\\bonline shop manager\\b|\\bonline store manager\\b'],
      ['customer_care', '\\bcustomer care\\b'],
      ['logistics', '\\bshipping and export manager\\b|\\bshipping manager\\b'],
      ['decider', '\\boperations and quality manager\\b|\\boperations manager\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:buy\\w*|bought|sell\\w*|sold|invest\\w*|trad(?:e|es|ing))\\b[^.;]{0,60}\\b(?:shares?|stocks? in|equities|bitcoins?|crypto\\w*|currenc(?:y|ies))\\b|\\bbank transfers?\\b|\\b(?:transfer|wire) (?:money|funds)\\b',
        title: 'Financial transaction',
        body: 'The text asks to buy or sell shares or to move money. No agent in the Operations and Quality · Axarquía space trades on markets or makes payments, and Agentic Platform does not create steps that no enabled agent can perform.'
      },
      {
        id: 'personas',
        re: '\\b(?:evaluat\\w*|assess\\w*|scor\\w*|rank\\w*|monitor\\w*|measure|sanction\\w*|dismiss\\w*|fire)\\b[^.;]{0,45}\\b(?:workers?|employees?|staff|workforce|personnel|people|operators?|growers?|farmers?|salespeople|technicians?)\\b',
        title: 'Assessment of people',
        body: 'The text asks to assess, monitor or score people. Workflows in this space work on lots, ripening rooms, orders, laboratory results and customer cases; they do not rate anyone performance.'
      },
      {
        id: 'control',
        re: '\\b(?:change|adjust|lower|raise|modify)\\b[^.;]{0,35}\\b(?:prices?|rates?|offers?|setpoints?|sizes?|specifications?)\\b',
        title: 'Change of prices, setpoints or specifications',
        body: 'The text asks to change prices, offers, room setpoints or product specifications. Agentic Platform reads SAP S/4HANA, the WMS and the online shop, but it does not modify prices or write setpoints to the rooms: those changes are made by Sales and Maintenance from their own systems.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Trigger', 'A room temperature alarm, an email in the Customer Care inbox or a set time.'],
      ['cpu', '', 'Steps and systems', 'Which agent performs each step and which system it reads or updates: SAP S/4HANA, Field traceability, LIMS, the WMS, the online shop (PrestaShop), Outlook or Microsoft Teams.'],
      ['user-check', 'warn', 'Human approval', 'Who decides before anything is held, moved or sent, under PR-TRZ-003.'],
      ['file-text', '', 'Outputs', 'Holds, work orders, cases, notices and reports produced by the workflow.']
    ],
    idleNote: 'Each element is linked to the sentence it comes from and checked against the Quality procedures before the draft is saved.',
    presenter: {
      idle: [
        'This is how Operations and Quality writes a procedure: in plain English, as in its process document. Nothing to draw, nothing to program.',
        'Agentic Platform turns it into a platform workflow: trigger, agents in order, human approval and outputs, each linked to its sentence.',
        'To be clear: text-to-workflow generation is simulated here and its integration into Agentic Platform is validated in the pilot; workflows (Routines), the editor, approval and auditing are standard.'
      ],
      outOfScopeExample: 'Buy shares in a supermarket chain when the stock market falls'
    },

    templates: {
      alarma: {
        label: 'Cold in ripening',
        icon: 'thermometer',
        refs: 'PR-MAD-002 and PR-TRZ-003',
        text: 'When room monitoring records an air temperature above 8 °C for more than 15 minutes in a ripening room, locate the lot, the pallets in the room and the supermarket and online-shop orders that depend on them. Propose the quality hold of the lot in SAP S/4HANA and the immobilisation of the pallets in the WMS, which the Quality and Food Safety Manager must approve before it is applied. If the temperature exceeds 10 °C, treat it as critical. Once the hold is approved, open the nonconformity in SAP S/4HANA with the 8D draft and the compressor work order, and notify the Ripening and Cold Chain Manager via Microsoft Teams to move the pallets to another room.'
      },
      reclamacion: {
        label: 'Complaint',
        icon: 'mail',
        refs: 'PR-MAD-002',
        text: 'When a customer complaint about uneven ripening in ready-to-eat avocado arrives in the Customer Care inbox, register it in SAP S/4HANA (customer, order, lot, defect claimed and response deadline) and send an acknowledgement within 24 h. Trace the lot backwards (farm, reception and ripening) and forwards (orders and shipments) and verify in LIMS the firmness of the retained samples under PR-MAD-002. Prepare the draft 8D report, including similar complaints from the last 12 months, and the customer response in their language. The Quality and Food Safety Manager must approve the response before it is sent; deliver the 8D report within 10 working days.'
      },
      parte: {
        label: 'Daily report',
        icon: 'activity',
        refs: 'PR-CAL-004 and PR-TRZ-003',
        text: 'Every day at 07:00, review in SAP S/4HANA, the WMS, LIMS and the online shop the status of the packing centre (fruit trucks received, ripening rooms, pending laboratory results, processing orders, online orders to serve and shipments of the day) and compare it with the operations thresholds. For each indicator in warning or critical state, open a ticket with the recommended action, without duplicating tickets that are already open. If a room exceeds the temperature limit or a lot has a pending laboratory result or a residue above the MRL, propose holding the lot until it is released, which the Quality and Food Safety Manager must approve. Publish the report summary in the Operations and Quality Microsoft Teams channel.'
      }
    },

    catalog: {
      cold_chain_monitor: {
        agent: 'Room monitor', icon: 'thermometer', systems: ['Room monitoring', 'SAP S/4HANA'],
        what: 'Reads the room temperature, confirms the deviation and classifies it',
        name: 'Room temperature deviation', verb: 'check the room temperature', token: 'temperatura',
        keywords: ['\\bair temperature\\b', '\\bripening rooms?\\b', '\\broom monitoring\\b', '\\bdegrees\\b', '\\bcompressor\\b'],
        strong: ['\\bconfirm\\w*', '\\bclassif\\w*', '\\bmeasure\\b', '\\bmonitor(?:s|ing)?\\b']
      },
      complaint_intake: {
        agent: 'Complaint intake', icon: 'mail', systems: ['Outlook', 'SAP S/4HANA'],
        what: 'Registers the complaint and extracts customer, order, lot, defect claimed and deadline',
        name: 'Customer complaint', verb: 'register the complaint', token: 'reclamacion',
        keywords: ['\\bcomplain\\w*', '\\buneven ripening\\b'],
        strong: ['\\bregister\\w*', '\\blog\\b', '\\bextract\\b']
      },
      ec_plant_monitor: {
        agent: 'Daily operations and quality report', icon: 'activity', systems: ['SAP S/4HANA', 'WMS', 'LIMS', 'Online shop (PrestaShop)'], multi: 2,
        what: 'Compares the centre indicators with thresholds and opens tickets without duplicating open ones',
        name: 'Daily operations and quality report', verb: 'run the centre report', token: 'parte-centro',
        keywords: ['\\bdaily report\\b', '\\bstatus of the (?:\\w+ ){0,2}centre\\b', '\\bindicators?\\b', '\\boperations thresholds\\b', '\\btickets? with the\\b', '\\btickets? that are\\b'],
        strong: ['\\breview\\w*', '\\bindicators?\\b', '\\btickets?\\b']
      },
      campaign_planner: {
        agent: 'Ripening plan', icon: 'calendar', systems: ['SAP S/4HANA', 'WMS'],
        what: 'Compares orders with the fruit in rooms and the ripening capacity',
        name: 'Ripening plan', verb: 'plan the ripening', token: 'plan-maduracion',
        keywords: ['\\bripening plan\\b', '\\bripening orders\\b', '\\bripening planning\\b'],
        strong: ['\\bplan(?:s|ning)?\\b']
      },
      lot_traceability: {
        agent: 'Lot traceability', icon: 'git-branch', systems: ['SAP S/4HANA', 'Field traceability', 'WMS', 'LIMS'],
        what: 'Locates lots, farms, pallets, orders and shipments, backwards and forwards',
        name: 'Lot traceability', verb: 'trace lots', token: 'traza',
        keywords: ['\\btraceab\\w*', '\\btrac(?:e|es|ed|ing)\\b', '\\b(?:locat|identif)\\w*\\s+(?:the\\s+|all\\s+)?(?:lots|pallets|orders|shipments|customers)\\b', '\\b(?:backwards?|forwards?)\\b'],
        strong: ['\\btrac(?:e|es|ing)\\b', '\\btraceab\\w*', '\\blocat\\w*', '\\bidentif\\w*']
      },
      quality_hold: {
        agent: 'Quality hold', icon: 'lock', systems: ['SAP S/4HANA', 'WMS'], hitl: true, restricted: true, gateVerb: 'applying the hold',
        what: 'Proposes the quality hold of the lot and pallets and only applies it after approval',
        name: 'Quality hold', verb: 'hold lots', token: 'retencion',
        keywords: ['\\bblock(?:ed|ing)?\\b', '\\bimmobili[sz]\\w*', '\\bhold(?:ing)?\\b', '\\bquarantin\\w*', '\\bretain\\w*'],
        strong: ['\\bblock(?:ed|ing)?\\b', '\\bimmobili[sz]\\w*', '\\bhold(?:ing)?\\b', '\\bquarantin\\w*', '\\bretain\\w*']
      },
      quality_incident: {
        agent: 'Nonconformities and notices', icon: 'clipboard', systems: ['SAP S/4HANA', 'Microsoft Teams'],
        what: 'Opens the nonconformity with the 8D draft and the work order, and sends the notices',
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
        slug: 'wf-desviacion-temperatura-camara',
        name: 'Temperature deviation in ripening room',
        approver: 'qa_shift',
        approverOptions: ['qa_shift', 'decider'],
        policy: 'PR-TRZ-003',
        go: 'alarma',
        goLabel: 'Test it with the room CM-06 alarm',
        next: 'The next temperature alarm runs it. The room CM-06 alarm (ALM-FRIO-0612) from 05:50 is still open.',
        trigger: {
          system: 'Room monitoring', type: 'temperatura', icon: 'thermometer', badges: ['Room monitoring'],
          label: 'Air temperature > {threshold}', sub: 'for more than {minutes}',
          entry: 'Room monitoring alarm received by webhook',
          full: 'Air temperature > {threshold} for more than {minutes} in a ripening room'
        },
        steps: {
          cold_chain_monitor: { sub: 'Critical > {critical}', what: 'Reads the room temperature, confirms the deviation and classifies it (critical above {critical})' },
          lot_traceability: { sub: 'Lot, pallets and orders', what: 'Lot and pallets that were in the room, and the supermarket and online-shop orders that depend on them' },
          quality_hold: { sub: 'After approval', what: 'Proposes the quality hold of the lot; it is applied in SAP S/4HANA and the WMS only after approval', outputs: [{ icon: 'lock', text: 'Quality hold in SAP S/4HANA and pallets immobilised in the WMS, after approval' }] },
          quality_incident: { sub: 'NC, WO and notice', systems: ['SAP S/4HANA', 'Microsoft Teams'], what: 'Opens the nonconformity in SAP S/4HANA with the 8D draft and the compressor work order, and notifies {al:notify} to move the pallets to another room', outputs: [{ icon: 'clipboard', text: 'Nonconformity in SAP S/4HANA with the 8D draft' }, { icon: 'wrench', text: 'Compressor work order and transfer to another room' }, { icon: 'message-square', text: 'Teams notice to {al:notify}' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Incident report (PDF) with the audit trail' }],
        params: [
          { key: 'threshold', label: 'Temperature threshold', name: 'Temperature threshold', type: 'number', unit: '°C', min: 4, max: 15, step: 0.5, value: 8, below: 'critical', ref: 'PR-MAD-002', hint: 'PR-MAD-002: 8 °C', extract: { from: 'trigger', re: '(-?\\d{1,2}(?:[.,]\\d{1,2})?)\\s*(?:degrees(?:\\s+(?:celsius|c))?|c)\\b' } },
          { key: 'minutes', label: 'For more than', name: 'Time above the threshold', type: 'number', unit: 'min', min: 1, max: 120, step: 1, value: 15, integer: true, ref: 'PR-MAD-002', hint: 'PR-MAD-002: 15 min', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Critical deviation', name: 'Critical deviation', type: 'number', unit: '°C', min: 6, max: 20, step: 0.5, value: 10, above: 'threshold', ref: 'PR-MAD-002', hint: 'PR-MAD-002: 10 °C', hl: 'Critical', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(-?\\d{1,2}(?:[.,]\\d{1,2})?)\\s*(?:degrees(?:\\s+(?:celsius|c))?|c)\\b' } },
          { key: 'approver', label: 'Approves the hold', ref: 'PR-TRZ-003', hint: 'PR-TRZ-003: only Quality and Food Safety holds and releases' },
          { key: 'notify', label: 'Notify', name: 'Notification', type: 'role', value: 'ripening_shift', options: ['ripening_shift', 'packing_shift', 'logistics'], ref: 'Policy', hint: 'Via Microsoft Teams, to move the pallets and reassign shipments', extract: { kind: 'role', cap: 'quality_incident' } }
        ],
        check: { id: 'umbral', ref: 'PR-MAD-002', keys: ['threshold', 'minutes'], label: 'Threshold and time', describe: '{threshold} for more than {minutes}', extra: 'critical above {critical}', action: 'Checks the thresholds against PR-MAD-002' },
        scenarios: [
          'room monitoring records an air temperature above {threshold} for more than {minutes} in a ripening room',
          'a cold alarm goes off for a compressor failure in a ripening room (e.g. CM-06)',
          'the user reports that a room with avocado or mango is above its setpoint',
          'the pallets and orders exposed to a ripening room out of temperature need to be assessed'
        ],
        testUtterance: 'Alarm: ripening room CM-06 reads 11.4 °C for 40 minutes and the compressor is stopped',
        matchGroups: [
          { re: '\\brooms?\\b|\\bcm-\\d|\\bripening\\b|\\bpallets?\\b|\\blots?\\b|\\bavocados?\\b', w: 0.3, label: 'room' },
          { re: '\\btemperature\\b|\\bdegrees\\b|\\bcompressor\\b|\\bcold\\b|\\bsetpoint\\b', w: 0.3, label: 'temperature' },
          { re: '\\balarm\\w*|\\bexceed\\w*|\\bfor \\d+ minutes\\b|\\bdetect\\w*|\\bconfirm\\w*', w: 0.25, label: 'alarm' },
          { re: '\\bcentre\\b|\\baxarquia\\b|\\bpacking\\b', w: 0.07, label: 'centre' }
        ],
        config: {
          cold_chain_monitor: [['limit_c', '{=threshold}'], ['minutes_above', '{=minutes}'], ['critical_c', '{=critical}'], ['scope', 'Controlled ripening rooms of the packing centre (Axarquía)']],
          quality_hold: [['approver', '{approver}'], ['policy', 'PR-TRZ-003']],
          quality_incident: [['template', '8D'], ['notify', '{notify}'], ['channel', 'Microsoft Teams']]
        },
        say: {
          draft: [
            'Every sentence is linked to what it understood: the trigger comes from "above {threshold} for more than {minutes}".',
            'Each step says which system it touches: room monitoring for the temperature; SAP S/4HANA, Field traceability and the WMS for lot, pallets and orders; SAP S/4HANA and the WMS for the hold; SAP S/4HANA and Teams for the incident.',
            'The hold is not applied without approval from Quality and Food Safety: PR-TRZ-003 requires it, and the workflow enforces it even if the text did not say so.'
          ],
          published: ['From now on, a temperature alarm in a ripening room triggers it automatically. Let us see it with this morning real alarm: room CM-06, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-maduracion-dispar',
        name: 'Customer complaint about uneven ripening',
        approver: 'qa_shift',
        approverOptions: ['qa_shift', 'decider'],
        policy: 'PR-MAD-002',
        go: 'reclamacion',
        goLabel: 'Test it with complaint CLM-2026-1120',
        next: 'The next complaint email runs it. Complaint CLM-2026-1120 (35% hard pieces in order PED-2026-44718) is open.',
        trigger: {
          system: 'Email', type: 'correo', icon: 'mail', badges: ['Outlook'],
          label: 'Complaint in the Customer Care inbox', sub: 'about uneven ripening',
          entry: 'Customer Care inbox',
          full: 'Customer complaint in the Customer Care inbox about uneven ripening in ready-to-eat avocado'
        },
        steps: {
          complaint_intake: { sub: 'Acknowledgement within {ack}', what: 'Registers the complaint in SAP S/4HANA, extracts customer, order, lot, defect claimed and deadline, and sends the acknowledgement within {ack}', outputs: [{ icon: 'clipboard', text: 'Complaint registered in SAP S/4HANA with the extracted data' }] },
          lot_traceability: { sub: 'Trace and verification', what: 'Traces the lot backwards (farm, reception and ripening) and forwards (orders and shipments) and verifies in LIMS the firmness of the retained samples (PR-MAD-002)', outputs: [{ icon: 'git-branch', text: 'Lot trace with farm, ripening and orders, and firmness verification in LIMS' }] },
          quality_incident: { sub: '8D within {days}', systems: ['SAP S/4HANA', 'Procedimientos'], what: 'Prepares the draft 8D report with similar complaints from the last {months}', outputs: [{ icon: 'file-text', text: 'Draft 8D report (PR-MAD-002), due within {days}' }] },
          notifier: { sub: 'After approval', what: 'Drafts the response in the customer language; it is sent by email only after approval', outputs: [{ icon: 'send', text: 'Customer response, sent after approval' }] }
        },
        params: [
          { key: 'ack', label: 'Acknowledgement', name: 'Acknowledgement', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'PR-MAD-002', hint: 'PR-MAD-002: 24 h', extract: { from: 'text', re: '\\backnowledge?ment\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|hours?)\\b' } },
          { key: 'days', label: '8D report', name: '8D report deadline', type: 'number', unit: 'days', unitLong: 'working days', min: 1, max: 30, step: 1, value: 10, integer: true, ref: 'PR-MAD-002', hint: 'PR-MAD-002: 10 working days', hl: 'Report deadline', extract: { from: 'text', re: '(\\d{1,2})\\s*(?:working|business) days\\b' } },
          { key: 'months', label: 'Complaint history', name: 'Complaint history', type: 'number', unit: 'months', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Policy', hint: 'History from SAP S/4HANA', hl: 'History', extract: { from: 'text', re: '(\\d{1,2})\\s*months\\b' } },
          { key: 'approver', label: 'Approves the response', ref: 'PR-MAD-002', hint: 'Before anything is sent to the customer' }
        ],
        check: { id: 'plazos', ref: 'PR-MAD-002', keys: ['ack', 'days'], label: 'Deadlines', describe: 'acknowledgement within {ack} and 8D report within {days}', action: 'Checks the deadlines against PR-MAD-002' },
        scenarios: [
          'a customer complaint about uneven ripening in ready-to-eat avocado arrives in the Customer Care inbox',
          'a supermarket chain complains that part of the pieces arrive hard at its stores and the file needs to be reviewed',
          'a customer complaint needs to be registered as a case in SAP S/4HANA'
        ],
        testUtterance: 'We have received a complaint from Supermercados Levante Fresh: in order PED-2026-44718 of ready-to-eat avocado 35% of the pieces arrive hard in 4 stores',
        matchGroups: [
          { re: '\\bcomplain\\w*', w: 0.35, label: 'complaint' },
          { re: '\\bcustomers?\\b|\\bsupermarkets?\\b|\\bstores?\\b|\\bsupermercados\\b', w: 0.2, label: 'customer' },
          { re: '\\bavocados?\\b|\\bmango\\w*|\\bhard\\b|\\bripen\\w*|\\buneven\\b|\\bfirmness\\b|\\bpieces\\b', w: 0.25, label: 'ripening' },
          { re: '\\blots?\\b|\\bped-\\d{4}|\\bclm-\\d{4}|\\bah-\\d{4}', w: 0.12, label: 'lot' }
        ],
        config: {
          complaint_intake: [['ack_hours', '{=ack}'], ['system', 'SAP S/4HANA']],
          quality_incident: [['template', '8D · PR-MAD-002'], ['deadline_working_days', '{=days}'], ['history_months', '{=months}']],
          notifier: [['language', 'the customer language'], ['approver', '{approver}']]
        },
        say: {
          draft: [
            'Every sentence of the text is linked to what it understood: the email to the Customer Care inbox triggers the workflow and the deadlines come from the text itself.',
            'The trace reaches the farm, the ripening and the orders of the lot, the firmness is verified in LIMS and the 8D is prepared with similar complaints.',
            'Nothing goes to the customer without approval from {del:approver}; the response is drafted in the customer language.'
          ],
          published: ['The next complaint email runs it automatically. Let us see it with complaint CLM-2026-1120.']
        }
      },
      parte: {
        first: 'ec_plant_monitor',
        slug: 'wf-parte-diario-centro',
        name: 'Daily operations and quality report · Axarquía',
        approver: 'qa_shift',
        approverOptions: ['qa_shift', 'decider'],
        policy: 'PR-TRZ-003',
        go: 'turno',
        goLabel: 'See the shift daily report',
        next: 'It runs every day at {time}.',
        trigger: {
          system: 'Scheduled', type: 'programado', icon: 'clock', badges: [],
          label: 'Every day at {time}', sub: 'Scheduled',
          entry: 'Daily server schedule · {time}'
        },
        steps: {
          ec_plant_monitor: { sub: '11 indicators', what: 'Reads SAP S/4HANA, the WMS, LIMS and the online shop, compares 11 packing-centre indicators with the operations thresholds and opens tickets without duplicating open ones', outputs: [{ icon: 'ticket', text: 'Operations tickets, without duplicating open ones' }] },
          quality_hold: { sub: 'If a lot is unreleased', gateVerb: 'holding lots', what: 'If a room exceeds the temperature limit or a lot has a pending laboratory result or a residue above the MRL, proposes holding the lot until it is released (PR-CAL-004)', outputs: [{ icon: 'lock', text: 'Hold on unreleased lots, after approval' }] },
          quality_incident: { sub: 'Summary in Teams', systems: ['Microsoft Teams'], what: 'Posts the report summary in the "Operations and Quality · Axarquía" channel', outputs: [{ icon: 'message-square', text: 'Summary in the "Operations and Quality · Axarquía" Teams channel' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Daily operations and quality report (PDF)' }],
        params: [
          { key: 'time', label: 'Report time', name: 'Report time', type: 'time', value: '07:00', ref: 'Policy', hint: 'Readings from SAP S/4HANA, the WMS, LIMS and the online shop', extract: { kind: 'time' } },
          { key: 'approver', label: 'Approves the hold', ref: 'PR-TRZ-003', hint: 'PR-TRZ-003 · PR-CAL-004' }
        ],
        staticChecks: [
          { id: 'lmr', text: 'Lots with a pesticide residue above the MRL (such as mango MG-2611-KE-031): not shipped until the analysis is released (PR-CAL-004)', stream: { action: 'Checks the report against PR-CAL-004', result: 'MG-2611-KE-031: residue above the MRL (LAB-2611-0871); 6 t held in the warehouse and 12 t shipped in traceability' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bwithout duplicating\\b', label: 'Rule', check: 'Tickets without duplicating those already open' }],
        scenarios: [
          'it is {time} and the daily operations and quality report for the packing centre is due',
          'the user asks for the daily report on the centre',
          'the user asks which operations or quality indicators are in warning today'
        ],
        testUtterance: 'Run the daily report for the packing centre',
        matchGroups: [
          { re: '\\breport\\b', w: 0.35, label: 'report' },
          { re: '\\bcentre\\b|\\boperations\\b|\\bquality\\b|\\bindicators?\\b|\\borders\\b', w: 0.3, label: 'operations' },
          { re: '\\bdaily\\b|\\btoday\\b|\\bshift\\b', w: 0.15, label: 'daily' },
          { re: '\\bpacking\\b|\\baxarquia\\b', w: 0.1, label: 'centre' }
        ],
        config: {
          ec_plant_monitor: [['time', '{time}'], ['systems', '4'], ['indicators', '11'], ['tickets', 'without duplicating open ones']],
          quality_hold: [['approver', '{approver}'], ['policy', 'PR-TRZ-003 · PR-CAL-004']],
          quality_incident: [['channel', 'Teams · Operations and Quality · Axarquía']]
        },
        say: {
          draft: [
            'The report is scheduled: every day at {time}, without anyone asking for it.',
            'It opens tickets only for items without an open one, and it holds lots only with approval from {del:approver}.'
          ],
          published: ['Tomorrow at {time} it runs on its own; today is in the shift summary.']
        }
      }
    }
  }
});
