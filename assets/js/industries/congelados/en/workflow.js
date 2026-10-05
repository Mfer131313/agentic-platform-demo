/* Empresa de Congelados · From words to workflow (English). Escenario de la demo de referencia con datos sintéticos (MFM).
 * Same structure as ../workflow.js. Schema in the header of assets/js/scenes/workflow.js. Regex on folded text (lower case, no accents).
 * Temperatures are negative: the sign is part of the captured group (“−18 °C” folds to “-18  c”). */
agenticPackEn('congelados', {
  workflow: {
    space: 'Quality · Fustiñana',
    author: 'quality_shift',
    authorNoun: 'Quality',
    alarmMatch: 'cold room|temperature|cold chain|c[aá]mara|temperatura',
    approverRoles: ['quality_shift', 'quality_plant'],
    noArticleRoles: ['refrigeration_maintenance', 'line_maintenance'],
    defaultPolicy: 'PNT-CAL-015',
    approverRule: {
      policy: 'PNT-CAL-015',
      text: 'only Quality approves holds',
      note: 'Reassigned: PNT-CAL-015 reserves holds for Quality'
    },
    triggerExamples: '“When the temperature in a cold room exceeds…” or “Every day at 06:00…”',
    rolePatterns: [
      ['quality_shift', '\\bshift quality (?:manager|lead)\\b'],
      ['quality_plant', '\\bplant quality (?:manager|lead)\\b'],
      ['dispatch_shift', '\\bdispatch shift (?:manager|lead|supervisor)\\b|\\bdispatch supervisor\\b'],
      ['refrigeration_maintenance', '\\brefrigeration maintenance\\b'],
      ['line_maintenance', '\\bline maintenance\\b'],
      ['campaign_manager', '\\bcampaign manager\\b'],
      ['decider', '\\boperations director\\b|\\bdirector of operations\\b']
    ],
    outOfScope: [
      {
        id: 'finanzas',
        re: '\\b(?:buy\\w*|bought|sell\\w*|sold|invest\\w*|trad(?:e|es|ing))\\b[^.;]{0,60}\\b(?:shares?|stocks?|equities|bitcoins?|crypto\\w*|currenc(?:y|ies))\\b|\\bbank transfers?\\b|\\b(?:transfer|wire) (?:money|funds)\\b',
        title: 'Financial transaction',
        body: 'The text asks to buy or sell shares or to move money. No agent in the Quality · Fustiñana space trades on markets or makes payments, and Agentic Platform does not create steps that no enabled agent can perform.'
      },
      {
        id: 'personas',
        re: '\\b(?:evaluat\\w*|assess\\w*|scor\\w*|rank\\w*|monitor\\w*|measure|sanction\\w*|dismiss\\w*|fire)\\b[^.;]{0,45}\\b(?:workers?|employees?|staff|workforce|personnel|people|operators?)\\b',
        title: 'Assessment of people',
        body: 'The text asks to assess, monitor or score people. Workflows in this space work on equipment, lots, pallets and quality documents; they do not rate anyone’s performance.'
      },
      {
        id: 'control',
        re: '\\b(?:change|adjust|lower|raise|modify)\\b[^.;]{0,35}\\bsetpoints?\\b|\\b(?:start|stop|turn off|turn on|switch off|switch on)\\b[^.;]{0,30}\\b(?:compressors?|evaporators?|tunnels?|fans?|blanchers?)\\b',
        title: 'Action on plant control',
        body: 'The text asks to change setpoints or to start and stop equipment. Agentic Platform reads Galileo/SCADA and Mapex, but it does not write to plant control: those changes are made by plant staff from their own system.'
      }
    ],
    idle: [
      ['bell', 'brand', 'Trigger', 'A Galileo/SCADA alarm, an email in the Quality inbox or a set time.'],
      ['cpu', '', 'Steps and systems', 'Which agent performs each step and which system it reads or updates: SAP, Mapex, Easy WMS, Elara or Teams.'],
      ['user-check', 'warn', 'Human approval', 'Who decides before anything is held, retained or sent, under PNT-CAL-015.'],
      ['file-text', '', 'Outputs', 'Holds, non-conformities, notifications and reports produced by the workflow.']
    ],
    idleNote: 'Each element is linked to the sentence it comes from and checked against the Quality procedures before the draft is saved.',
    presenter: {
      idle: [
        'This is how Quality writes a procedure: in plain English, as in its SOP. Nothing to draw, nothing to program.',
        'Agentic Platform turns it into a platform workflow: trigger, agents in order, human approval and outputs, each linked to its sentence.',
        'To be clear: text-to-workflow generation is simulated here and its integration into Agentic Platform is validated in the pilot; workflows (Routines), the editor, approval and auditing are standard.'
      ],
      outOfScopeExample: 'Buy shares in a utility company when electricity prices fall'
    },

    templates: {
      alarma: {
        label: 'Cold chain',
        icon: 'thermometer',
        refs: 'PNT-CAL-012 and PNT-CAL-015',
        text: 'When the air temperature in a frozen-product cold room at Fustiñana exceeds −18 °C for more than 15 minutes, locate the pallets and lots present during the excursion and their planned shipments. Propose a quality hold on those pallets in SAP QM and Easy WMS, which the Shift Quality Lead must approve before it is applied. If the temperature exceeds −15 °C, classify the excursion as critical. Once the hold is approved, open a non-conformity in Elara with a draft 8D report and notify the Dispatch Shift Supervisor via Teams to hold the affected shipments.'
      },
      reclamacion: {
        label: 'Complaint',
        icon: 'mail',
        refs: 'PNT-CAL-020',
        text: 'When a customer complaint about a foreign body arrives in the Quality inbox, register it in Elara (lot, product, defect and response deadline) and send an acknowledgement within 24 h. Trace the lot backwards (grower, intake, line and foreign-body controls) and forwards (pallets and shipments). Prepare a draft 8D report under PNT-CAL-020, including similar complaints from the last 12 months, and the customer response in their language. The Plant Quality Manager must approve the customer response before it is sent; deliver the 8D report within 5 working days.'
      },
      parte: {
        label: 'Daily report',
        icon: 'activity',
        refs: 'PNT-CAL-015 and PNT-CAL-031',
        text: 'Every day at 06:00, review the readings from Fustiñana equipment in Mapex and Galileo (IQF tunnels, blanchers, optical sorters, ammonia compressors, evaporators, packing machines and metal detectors) and compare them with plant thresholds. For each machine in warning or critical state, open a maintenance ticket with the recommended action, without duplicating existing work orders. If a metal detector (CCP) has an overdue check, propose a hold on product packed since the last successful check, which the Shift Quality Lead must approve. Publish the daily report summary in the Maintenance Teams channel.'
      }
    },

    catalog: {
      cold_chain_monitor: {
        agent: 'Cold-chain monitor', icon: 'thermometer', systems: ['SCADA Galileo'],
        what: 'Reads the cold room temperature series, confirms the excursion and classifies it',
        name: 'Cold-chain break', verb: 'check the cold room', token: 'cadena-frio',
        keywords: ['\\bcold (?:chain|rooms?)\\b', '\\btemperatures?\\b', '\\bdegrees\\b', '\\bexcursions?\\b', '\\b(?:losing|loses|lost) (?:its )?cold\\b'],
        strong: ['\\bconfirm\\w*', '\\bclassif\\w*', '\\bmeasure\\b', '\\bmonitor(?:s|ing)?\\b']
      },
      complaint_intake: {
        agent: 'Complaint intake', icon: 'mail', systems: ['Outlook', 'Elara'],
        what: 'Registers the complaint and extracts lot, product, defect and deadline',
        name: 'Customer complaint', verb: 'register the complaint', token: 'reclamacion',
        keywords: ['\\bcomplain\\w*', '\\bforeign[- ]bod(?:y|ies)\\b'],
        strong: ['\\bregister\\w*', '\\blog\\b', '\\bextract\\b']
      },
      ec_plant_monitor: {
        agent: 'Daily plant report', icon: 'activity', systems: ['MES Mapex', 'SCADA Galileo', 'GMAO'], multi: 2,
        what: 'Compares the readings with plant thresholds and opens tickets without duplicating work orders',
        name: 'Daily plant report', verb: 'run the plant report', token: 'parte-planta',
        keywords: ['\\bdaily report\\b', '\\breadings from (?:the )?(?:\\w+ )?(?:equipment|machines)\\b', '\\bequipment\\b', '\\biqf tunnels?\\b', '\\bblanchers?\\b', '\\bcompressors?\\b', '\\bmetal detectors?\\b', '\\bmaintenance tickets?\\b'],
        strong: ['\\breview\\w*', '\\breadings\\b', '\\bmaintenance tickets?\\b']
      },
      campaign_planner: {
        agent: 'Campaign plan', icon: 'calendar', systems: ['Siemens Opcenter APS', 'SAP'],
        what: 'Compares the forecast field intake with tunnel capacity',
        name: 'Field intake campaign', verb: 'plan the campaign', token: 'campana',
        keywords: ['\\bcampaign\\b', '\\bharvest\\w*', '\\bfield intake\\b', '\\bplots?\\b'],
        strong: ['\\bplan(?:s|ning)?\\b']
      },
      lot_traceability: {
        agent: 'Traceability', icon: 'git-branch', systems: ['SAP', 'MES Mapex', 'Mecalux Easy WMS'],
        what: 'Locates pallets, lots and shipments, backwards and forwards',
        name: 'Lot traceability', verb: 'trace lots', token: 'traza',
        keywords: ['\\btraceab\\w*', '\\btrac(?:e|es|ed|ing)\\b', ['\\blots?\\b', '\\b(?:block\\w*|hold\\w*|quarantin\\w*|retain\\w*)\\s+(?:\\w+\\s+){0,2}$'], '\\b(?:locat|identif)\\w*\\s+(?:the\\s+|all\\s+)?(?:pallets|lots|shipments)\\b', '\\b(?:backwards?|forwards?)\\b'],
        strong: ['\\btrac(?:e|es|ing)\\b', '\\btraceab\\w*', '\\blocat\\w*', '\\bidentif\\w*']
      },
      quality_hold: {
        agent: 'Quality hold', icon: 'lock', systems: ['SAP QM', 'Mecalux Easy WMS'], hitl: true, restricted: true, gateVerb: 'applying the hold',
        what: 'Proposes the hold or retention and only applies it after approval',
        name: 'Quality hold', verb: 'hold', token: 'bloqueo',
        keywords: ['\\bquality hold\\b', '\\bhold on\\b', '\\bblock(?:ed|ing)?\\b', '\\bquarantin\\w*', '\\bretain\\w*'],
        strong: ['\\bquality hold\\b', '\\bhold on\\b', '\\bblock(?:ed|ing)?\\b', '\\bquarantin\\w*', '\\bretain\\w*']
      },
      quality_incident: {
        agent: 'Incidents', icon: 'clipboard', systems: ['Elara', 'Microsoft Teams'],
        what: 'Opens the non-conformity with the draft 8D and sends the notifications',
        name: 'Quality incident', verb: 'open an incident', token: 'incidencia',
        keywords: ['\\bincidents?\\b', '\\bnon[- ]conformit(?:y|ies)\\b', '\\b8d\\b', '\\bnotif(?:y|ies)\\b', '\\b(?:post|publish)\\w* the (?:\\w+ ){0,2}summary\\b'],
        strong: ['\\bnon[- ]conformity\\b', '\\b8d\\b', '\\bincidents?\\b', '\\b(?:post|publish)\\w* the (?:\\w+ ){0,2}summary\\b', '\\bnotif(?:y|ies)\\b']
      },
      notifier: {
        agent: 'Customer response', icon: 'send', systems: ['Outlook'], hitl: true, gateVerb: 'sending the response',
        what: 'Drafts the response in the customer’s language and sends it once approved',
        name: 'Customer response', verb: 'respond to the customer', token: 'respuesta',
        keywords: ['\\bcustomer response\\b', '\\b(?:reply|response|answer) to the customer\\b', '\\b(?:reply to|respond to|answer) the customer\\b'],
        strong: ['\\bcustomer response\\b', '\\b(?:reply|response|answer) to the customer\\b', '\\b(?:reply to|respond to|answer) the customer\\b']
      }
    },

    domains: {
      alarma: {
        first: 'cold_chain_monitor',
        slug: 'wf-cadena-frio-camaras',
        name: 'Temperature excursion in a cold room',
        approver: 'quality_shift',
        approverOptions: ['quality_shift', 'quality_plant'],
        policy: 'PNT-CAL-015',
        go: 'alarma',
        goLabel: 'Test it with the C-07 alarm',
        next: 'The next Galileo/SCADA temperature alarm runs it. The C-07 alarm (ALM-C07-0550) from 05:50 is still open.',
        trigger: {
          system: 'Galileo/SCADA', type: 'temperatura', icon: 'thermometer', badges: ['SCADA Galileo'],
          label: 'Air temperature > {threshold}', sub: 'for more than {minutes}',
          entry: 'Galileo/SCADA alarm received by webhook',
          full: 'Air temperature > {threshold} for more than {minutes}'
        },
        steps: {
          cold_chain_monitor: { sub: 'Critical > {critical}', what: 'Reads the air temperature series, confirms the excursion and classifies it (critical above {critical})' },
          lot_traceability: { sub: 'Lots and shipments', what: 'Pallets and lots present in the cold room during the excursion and their planned shipments' },
          quality_hold: { sub: 'After approval', what: 'Proposes a quality hold on the exposed pallets; it is applied in SAP QM and Easy WMS only after approval', outputs: [{ icon: 'lock', text: 'Quality hold in SAP QM and pallets blocked in Easy WMS, after approval' }] },
          quality_incident: { sub: 'NC, 8D and notification', systems: ['Elara', 'Microsoft Teams'], what: 'Opens the non-conformity in Elara with the draft 8D and notifies {al:notify} to hold the affected shipments', outputs: [{ icon: 'clipboard', text: 'Non-conformity in Elara with the draft 8D' }, { icon: 'message-square', text: 'Teams notification to {al:notify}' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Incident report (PDF) with the audit trail' }],
        params: [
          { key: 'threshold', label: 'Air threshold', name: 'Air threshold', type: 'number', unit: '°C', min: -25, max: -10, step: 0.5, value: -18, ref: 'PNT-CAL-012', hint: 'PNT-CAL-012: −18 °C', below: 'critical', extract: { from: 'trigger', re: '(-?\\d{1,2}(?:[.,]\\d{1,2})?)\\s*(?:degrees(?:\\s+(?:celsius|c))?|c)\\b' } },
          { key: 'minutes', label: 'For more than', name: 'Time above the threshold', type: 'number', unit: 'min', min: 1, max: 120, step: 1, value: 15, integer: true, ref: 'PNT-CAL-012', hint: 'PNT-CAL-012: 15 min', extract: { kind: 'minutes' } },
          { key: 'critical', label: 'Critical excursion', name: 'Critical excursion', type: 'number', unit: '°C', min: -20, max: -5, step: 0.5, value: -15, above: 'threshold', ref: 'PNT-CAL-012', hint: 'PNT-CAL-012: −15 °C', hl: 'Critical', extract: { from: 'sentence', near: '\\bcritic\\w*', re: '(-?\\d{1,2}(?:[.,]\\d{1,2})?)\\s*(?:degrees(?:\\s+(?:celsius|c))?|c)\\b' } },
          { key: 'approver', label: 'Approves the hold', ref: 'PNT-CAL-015', hint: 'PNT-CAL-015: only Quality holds and releases' },
          { key: 'notify', label: 'Notify', name: 'Notification', type: 'role', value: 'dispatch_shift', options: ['dispatch_shift', 'refrigeration_maintenance', 'quality_plant'], ref: 'Policy', hint: 'Via Microsoft Teams, to hold shipments', extract: { kind: 'role', cap: 'quality_incident' } }
        ],
        check: { id: 'umbral', ref: 'PNT-CAL-012', keys: ['threshold', 'minutes'], label: 'Threshold and time', describe: '{threshold} for more than {minutes}', extra: 'critical above {critical}', action: 'Checks the thresholds against PNT-CAL-012' },
        scenarios: [
          'a frozen-product cold room at Fustiñana exceeds {threshold} for more than {minutes}',
          'a temperature alarm goes off in a cold store or dispatch cold room (e.g. C-07 at Fustiñana)',
          'the user reports that a cold room is losing cold',
          'the lots and pallets exposed to a cold-chain break need to be assessed'
        ],
        testUtterance: 'Alarm: cold room C-07 at Fustiñana has been reading −14 °C for 40 minutes',
        matchGroups: [
          { re: '\\bcold rooms?\\b|\\bc-\\d{2}\\b|\\bsilos?\\b', w: 0.3, label: 'cold room' },
          { re: '\\btemperature\\w*|\\bdegrees\\b|\\d\\s*c\\b|\\bcold\\b', w: 0.3, label: 'temperature' },
          { re: '\\balarm\\w*|\\bexcursion\\w*|\\bexceed\\w*|\\breads?\\b|\\breading\\b|\\brising\\b|\\brises?\\b|\\brose\\b', w: 0.25, label: 'alarm' },
          { re: '\\bfustinana\\b', w: 0.07, label: 'Fustiñana' }
        ],
        config: {
          cold_chain_monitor: [['air_limit_c', '{=threshold}'], ['minutes_above', '{=minutes}'], ['critical_air_c', '{=critical}'], ['scope', 'Frozen-product cold rooms at Fustiñana']],
          quality_hold: [['approver', '{approver}'], ['policy', 'PNT-CAL-015']],
          quality_incident: [['template', '8D'], ['notify', '{notify}'], ['channel', 'Microsoft Teams']]
        },
        say: {
          draft: [
            'Every sentence is linked to what it understood: the trigger comes from “exceeds {threshold} for more than {minutes}”.',
            'Each step says which system it touches: Galileo for the temperature; SAP, Mapex and Easy WMS for pallets and lots; SAP QM for the hold; Elara and Teams for the incident.',
            'The hold is not applied without approval from Quality: PNT-CAL-015 requires it, and the workflow enforces it even if the text did not say so.'
          ],
          published: ['From now on, a Galileo/SCADA temperature alarm triggers it automatically. Let’s see it with this morning’s real alarm: C-07, 05:50.']
        }
      },
      reclamacion: {
        first: 'complaint_intake',
        slug: 'wf-reclamacion-cliente',
        name: 'Customer complaint about a foreign body',
        approver: 'quality_plant',
        approverOptions: ['quality_plant', 'quality_shift'],
        policy: 'PNT-CAL-020',
        go: 'reclamacion',
        goLabel: 'Test it with complaint UKC-44718',
        next: 'The next complaint email runs it. Complaint UKC-44718 is awaiting a response.',
        trigger: {
          system: 'Outlook', type: 'correo', icon: 'mail', badges: ['Outlook'],
          label: 'Complaint in the Quality inbox', sub: 'about a foreign body',
          entry: 'Quality inbox in Outlook',
          full: 'Customer complaint in the Quality inbox about a foreign body'
        },
        steps: {
          complaint_intake: { sub: 'Acknowledgement within {ack}', what: 'Registers the complaint in Elara, extracts lot, product, defect and deadline, and sends the acknowledgement within {ack}', outputs: [{ icon: 'clipboard', text: 'Complaint registered in Elara with the extracted data' }] },
          lot_traceability: { sub: 'Full trace', what: 'Traces the lot: grower, intake, line and foreign-body controls; pallets, SSCCs and shipments', outputs: [{ icon: 'git-branch', text: 'Lot trace with pallets and SSCCs' }] },
          quality_incident: { sub: '8D within {days}', systems: ['Elara', 'Procedimientos'], what: 'Prepares the draft 8D report (PNT-CAL-020) with similar complaints from the last {months}', outputs: [{ icon: 'file-text', text: 'Draft 8D report (PNT-CAL-020), due within {days}' }] },
          notifier: { sub: 'After approval', what: 'Drafts the response in the customer’s language; it is sent through Outlook only after approval', outputs: [{ icon: 'send', text: 'Customer response, sent after approval' }] }
        },
        params: [
          { key: 'ack', label: 'Acknowledgement', name: 'Acknowledgement', type: 'number', unit: 'h', min: 1, max: 72, step: 1, value: 24, integer: true, ref: 'PNT-CAL-020', hint: 'PNT-CAL-020: 24 h', extract: { from: 'text', re: '\\backnowledge?ment\\b[^.;]{0,40}?(\\d{1,3})\\s*(?:h|hours?)\\b' } },
          { key: 'days', label: '8D report', name: '8D deadline', type: 'number', unit: 'days', unitLong: 'working days', min: 1, max: 30, step: 1, value: 5, integer: true, ref: 'PNT-CAL-020', hint: 'PNT-CAL-020: 5 working days', hl: '8D deadline', extract: { from: 'text', re: '(\\d{1,2})\\s*(?:working|business) days\\b' } },
          { key: 'months', label: 'Complaint history', name: 'Complaint history', type: 'number', unit: 'months', min: 1, max: 36, step: 1, value: 12, integer: true, ref: 'Policy', hint: 'History from Elara', hl: 'History', extract: { from: 'text', re: '(\\d{1,2})\\s*months\\b' } },
          { key: 'approver', label: 'Approves the response', ref: 'PNT-CAL-020', hint: 'Before anything is sent to the customer' }
        ],
        check: { id: 'plazos', ref: 'PNT-CAL-020', keys: ['ack', 'days'], label: 'Deadlines', describe: 'acknowledgement within {ack} and 8D report within {days}', action: 'Checks the deadlines against PNT-CAL-020' },
        scenarios: [
          'a customer complaint about a defect or a foreign body in a lot arrives in the Quality inbox',
          'an international customer complains about a frozen product and the lot needs to be investigated',
          'a customer complaint needs to be registered as a non-conformity'
        ],
        testUtterance: 'We have received a complaint from a UK customer about a stone in lot L26-231-FUS-GUI-01',
        matchGroups: [
          { re: '\\bcomplain\\w*', w: 0.35, label: 'complaint' },
          { re: '\\bcustomers?\\b|\\bretailers?\\b', w: 0.2, label: 'customer' },
          { re: '\\bforeign[- ]bod(?:y|ies)\\b|\\bstones?\\b|\\bmetal\\b|\\bplastic\\b|\\bdefects?\\b', w: 0.25, label: 'defect' },
          { re: '\\blots?\\b|\\bbatch\\b|\\bl\\d{2}-\\d{3}', w: 0.12, label: 'lot' }
        ],
        config: {
          complaint_intake: [['ack_hours', '{=ack}'], ['system', 'Elara']],
          quality_incident: [['template', '8D · PNT-CAL-020'], ['deadline_working_days', '{=days}'], ['history_months', '{=months}']],
          notifier: [['language', 'the customer’s'], ['approver', '{approver}']]
        },
        say: {
          draft: [
            'Every sentence of the text is linked to what it understood: the email to the Quality inbox triggers the workflow and the deadlines come from the text itself.',
            'The trace reaches the grower, intake, the line and the foreign-body controls, and the 8D is prepared with similar complaints.',
            'Nothing goes to the customer without approval from {del:approver}; the response is drafted in the customer’s language.'
          ],
          published: ['The next complaint email runs it automatically. Let’s see it with complaint UKC-44718.']
        }
      },
      parte: {
        first: 'ec_plant_monitor',
        slug: 'wf-parte-diario-planta',
        name: 'Daily equipment report · Fustiñana',
        approver: 'quality_shift',
        approverOptions: ['quality_shift', 'quality_plant'],
        policy: 'PNT-CAL-015',
        go: 'turno',
        goLabel: 'See the shift daily report',
        next: 'It runs every day at {time}.',
        trigger: {
          system: 'Scheduled', type: 'programado', icon: 'clock', badges: [],
          label: 'Every day at {time}', sub: 'Scheduled',
          entry: 'Daily server schedule · {time}'
        },
        steps: {
          ec_plant_monitor: { sub: '11 machines', what: 'Reads 11 machines in Mapex and Galileo, compares them with 9 plant indicators and opens tickets in the GMAO without duplicating open work orders', outputs: [{ icon: 'ticket', text: 'Maintenance tickets in the GMAO, without duplicating open work orders' }] },
          quality_hold: { sub: 'If a CCP fails', gateVerb: 'holding product', what: 'If a metal detector (CCP) goes more than 2 h without a check, proposes holding product packed since the last successful check (PNT-CAL-031)', outputs: [{ icon: 'lock', text: 'Hold on packed product if a CCP fails, after approval' }] },
          quality_incident: { sub: 'Summary in Teams', systems: ['Microsoft Teams'], what: 'Posts the report summary in the “Maintenance · Fustiñana” channel', outputs: [{ icon: 'message-square', text: 'Summary in the “Maintenance · Fustiñana” Teams channel' }] }
        },
        extraOutputs: [{ icon: 'file-text', text: 'Daily equipment report (PDF)' }],
        params: [
          { key: 'time', label: 'Report time', name: 'Report time', type: 'time', value: '06:00', ref: 'Policy', hint: 'Readings from Mapex and Galileo', extract: { kind: 'time' } },
          { key: 'approver', label: 'Approves the hold', ref: 'PNT-CAL-015', hint: 'PNT-CAL-015 · PNT-CAL-031' }
        ],
        staticChecks: [
          { id: 'pcc', text: 'Metal detectors as CCPs: checked every 2 h (PNT-CAL-031)', stream: { action: 'Checks the report against PNT-CAL-031', result: 'DM-1 is a CCP: checked with test pieces every 2 h' } }
        ],
        rules: [{ key: 'noDuplicate', re: '\\bwithout duplicating\\b', label: 'Rule', check: 'Tickets without duplicating open GMAO work orders' }],
        scenarios: [
          'it is {time} and the daily equipment report for Fustiñana is due',
          'the user asks for the daily report on plant equipment',
          'the user asks which plant machines are causing problems today'
        ],
        testUtterance: 'Run the daily report for the Fustiñana plant',
        matchGroups: [
          { re: '\\breport\\b', w: 0.35, label: 'report' },
          { re: '\\bequipment\\b|\\bplant\\b|\\bmachines?\\b|\\blines?\\b', w: 0.3, label: 'equipment' },
          { re: '\\bdaily\\b|\\btoday\\b|\\bshift\\b', w: 0.15, label: 'daily' },
          { re: '\\bfustinana\\b', w: 0.1, label: 'Fustiñana' }
        ],
        config: {
          ec_plant_monitor: [['time', '{time}'], ['machines', '11'], ['indicators', '9'], ['tickets', 'GMAO, without duplicating open work orders']],
          quality_hold: [['approver', '{approver}'], ['policy', 'PNT-CAL-015 · PNT-CAL-031']],
          quality_incident: [['channel', 'Microsoft Teams · Maintenance · Fustiñana']]
        },
        say: {
          draft: [
            'The report is scheduled: every day at {time}, without anyone asking for it.',
            'It opens tickets only for items without an open GMAO work order, and it holds product only with approval from {del:approver}.'
          ],
          published: ['Tomorrow at {time} it runs on its own; today’s is in the shift summary.']
        }
      }
    }
  }
});
