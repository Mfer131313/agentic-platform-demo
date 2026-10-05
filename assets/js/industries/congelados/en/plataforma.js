/* Empresa de Congelados · "How Agentic Platform fits" (English): architecture, demo versus pilot, hours calculator,
 * IT questions and audit log. Reference demo scenario with synthetic data (MFM). */
agenticPackEn('congelados', {
  plataforma: {
    nav: 'How it fits at EC',
    title: 'How it fits at Frozen Foods Company',
    actor: 'quality_shift',
    site: { kind: 'Plant', name: 'Fustiñana (FUS)', realm: 'Quality' },
    pageMeta: [
      { icon: 'factory', text: 'Fustiñana plant' },
      { icon: 'server', text: 'Installed on your infrastructure' },
      { icon: 'user-check', text: 'Human approval before updates' }
    ],
    kpis: [
      { label: 'Proposed pilot', value: '6–8', unit: 'weeks', sub: '1 use case · Fustiñana · Quality realm', icon: 'calendar' },
      { label: 'Systems connected in the pilot', value: '1–2', unit: 'read-only', sub: 'Through an API or a database replica', icon: 'database' },
      { label: 'Pilot users', value: '5–10', sub: 'SSO with Microsoft Entra ID', icon: 'users' }
    ],
    arch: {
      title: 'Reference architecture at Fustiñana',
      sso: 'SSO access · Microsoft Entra ID',
      ssoShort: 'Microsoft Entra ID SSO',
      console: 'Web console and alerts in Microsoft Teams',
      consoleShort: 'Web console and Teams'
    },
    deploy: {
      cpd: { seg: 'Own data centre', label: 'Own data centre · virtual machine with Docker Compose', zone: 'Frozen Foods Company data centre · VM with Docker Compose', text: 'A virtual machine in your data centre with Docker Compose: application, Postgres database and Qdrant vector store.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'Frozen Foods Company Kubernetes cluster · Helm', text: 'Helm deployment on your Kubernetes cluster: application, Postgres database and Qdrant vector store.' },
      cloud: { seg: 'Own cloud', label: 'Frozen Foods Company cloud (Azure, AWS or GCP)', zone: 'Frozen Foods Company cloud subscription (Azure, AWS or GCP)', text: 'The same installation in your cloud subscription, in the region you choose.' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'EU region, under the Frozen Foods Company contract', exit: 'Only the text of each request leaves your network', note: 'Connected through the Agentic Platform LiteLLM gateway; confirmed in weeks 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'With the account and region contracted by Frozen Foods Company', exit: 'Only the text of each request leaves your network', note: 'Provider included as standard in the Agentic Platform model catalogue.' },
      local: { seg: 'Local model', name: 'Local model', local: true, place: 'GPU server in your data centre (Ollama, LM Studio or llama.cpp)', exit: 'Inference runs inside your network', note: 'Quality and speed are sized to your server. IT also reviews the connector and telemetry flows.' }
    },
    people: ['quality_shift', 'quality_plant', 'dispatch_shift', 'refrigeration_maintenance', 'line_maintenance'],
    peopleShort: ['Shift Quality', 'Plant Quality', 'Dispatch Shift Manager', 'Refrigeration Maintenance', 'Line Maintenance'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Visual editor, versions and dry run' },
      { icon: 'cpu', title: 'Plant agents', text: 'Cold chain, traceability, holds, complaints and daily report', agents: true },
      { icon: 'user-check', title: 'Human approval', text: 'Nothing is written to a system without its owner', approval: true },
      { icon: 'book-open', title: 'Procedures with citations', text: 'Every answer links its source; without a source, it says so' },
      { icon: 'history', title: 'Audit log', text: 'Append-only and exportable' },
      { icon: 'key', title: 'Permissions by role and realm', text: 'Each plant or department sees its own data' },
      { icon: 'gauge', title: 'Cost per request', text: 'USD estimate and budget per realm' },
      { icon: 'shield', title: 'Model gateway', text: 'Masks personal data before the model', gateway: true }
    ],
    tiles: [
      { name: 'SAP · SAP QM', icon: 'database', text: 'Reads lots, orders and shipments. Proposes the quality hold.', write: true },
      { name: 'MES Mapex', icon: 'factory', text: 'Reads production by line and shift.', write: false },
      { name: 'Siemens Opcenter APS', icon: 'calendar', text: 'Reads capacities and the campaign plan.', write: false },
      { name: 'Mecalux Easy WMS', icon: 'warehouse', text: 'Reads pallets, locations and shipments. Proposes pallet holds.', write: true },
      { name: 'SCADA Galileo', icon: 'activity', text: 'Reads temperatures and alarms. Does not act on plant control.', write: false },
      { name: 'Elara', icon: 'clipboard', text: 'Reads NCs, complaints and documents. Prepares draft NCs and 8D reports.', write: true },
      { name: 'Microsoft 365', icon: 'mail', text: 'Alerts in Teams and drafts in Outlook. Sending to the customer is approved.', write: true }
    ],
    decisions: {
      deploy: ['It does not depend on MFM cloud services. Your IT team or a managed service runs it.'],
      llm: 'The model is changed through configuration, without touching the workflows; OpenAI or AWS Bedrock in the EU are also supported.',
      access: [
        'SSO with Microsoft Entra ID (OIDC) or SAML 2.0. Permissions by role and realm: the "Quality · Fustiñana" realm only sees its own procedures and data.',
        'The gateway masks personal data before calling the model; ID card (DNI, NIE) and IBAN formats are added in the pilot.'
      ],
      hitl: 'Placing a hold in SAP QM, opening an NC in Elara or emailing the customer requires approval by the owner. Rejecting applies nothing and is logged with the reason.',
      cost: 'The per-realm budget separates the spend of each plant or department (Quality, Dispatch and Maintenance).',
      limits: [
        'It does not replace SAP, MES Mapex, Siemens Opcenter APS, Mecalux Easy WMS or Elara.',
        'It does not act on plant control: Galileo/SCADA is read-only.',
        'It does not release product: the Quality Manager decides (PNT-CAL-015).',
        'It does not assign tasks or assess people: it works with lots, equipment and documents.'
      ]
    },
    faqTitle: 'Common questions from IT',
    faqSub: 'Short answers for the conversation with the technical team',
    faq: [
      { topic: 'Integration', q: 'Where is it installed?', a: 'On a virtual machine in your data centre with Docker Compose, on Kubernetes with Helm, or in your cloud subscription. It does not depend on MFM cloud services.' },
      { topic: 'Security', q: 'How do users sign in?', a: 'With Microsoft Entra ID SSO (OIDC) or SAML 2.0. Permissions are by role and by realm (plant or department).' },
      { topic: 'Data', q: 'What data leaves our network?', a: 'With a local model, inference runs on your network. With an external one, the content sent and the contract are reviewed. Connector, telemetry and masking flows are validated with IT.' },
      { topic: 'Integration', q: 'Are there SAP, MES or SCADA connectors?', a: 'Not as standard. In the pilot they are built for 1–2 systems, through an API or a read-only database replica; reading Postgres databases already works.' },
      { topic: 'Scale', q: 'How many users does it support?', a: 'Concurrency is sized and verified with load tests. Each realm has limits on requests per minute, tokens per day and budget.' },
      { topic: 'Language', q: 'What language does it work in?', a: 'Chat and agents in Spanish; replies to customers in their own language. The Agentic Platform administration console is in English.' },
      { topic: 'Cost', q: 'Licence and price?', a: 'They are set out in the commercial proposal (SOW).' }
    ],
    seen: [
      { scene: 'turno', label: 'Shift summary', icon: 'activity', title: 'Night shift summary at Fustiñana', text: 'Cold room C-07 excursion, complaint UKC-44718 and the daily equipment report with the 06:00 readings (DM-1 unverified, DP-2 screen); the agent prepares the summary and leaves it for review.', agents: ['Daily plant report'], approver: 'quality_shift', outcome: 'parte' },
      { scene: 'workflow', label: 'From words to workflow', icon: 'workflow', title: 'Written procedure → published workflow', text: 'The temperature excursion procedure (PNT-CAL-012, with the PNT-CAL-015 hold) becomes a workflow with a trigger, agents in sequence, approval and a dry run.', agents: ['Workflow generator'], approver: 'quality_plant' },
      { scene: 'alarma', label: 'C-07 alarm', icon: 'thermometer', title: 'Temperature excursion in cold room C-07', text: 'ALM-C07-0550 at 05:50: 50 min above −18 °C and a peak of −13.9 °C at 06:25; 6 lots and 38 pallets (28,592 kg) to hold in SAP QM and Easy WMS, an incident in Elara and a notice to Dispatch.', agents: ['Cold chain monitor', 'Traceability', 'Quality hold', 'Incidents'], approver: 'quality_shift', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Complaint UKC-44718', icon: 'mail', title: '8 mm stone in 1 kg peas', text: 'EC Foods UK Ltd reports a foreign body in Garden Peas 1kg, lot L26-231-FUS-GUI-01: lot trace, history, draft NC and 8D, and an English reply before 2 October.', agents: ['Customer complaints', 'Traceability'], approver: 'quality_plant', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Recall drill', icon: 'git-branch', title: 'Recall drill for lot L26-261-FUS-GUI-03', text: 'Backward and forward genealogy (parcel, intake, bulk, lot, pallets, shipments and customers), mass balance in kg, pallets by SSCC and customer notice, for the IFS Food and BRCGS drills.', agents: ['Traceability'], approver: 'quality_shift', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Customer questionnaire', icon: 'list-checks', title: 'Supplier Technical Questionnaire 2026', text: 'The UK retailer’s 15 questions, received from EC Foods UK Ltd, answered in English with citations from procedures, specification sheets and certificates; those without evidence are left for Quality.', agents: ['Customer questionnaires'], approver: 'quality_plant', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedures', icon: 'book-open', title: 'Questions with citations', text: 'Temperature excursions, hold and release, complaints and 8D, foreign bodies and destoner screens: every answer links the current section and, if there is no source, says so.', agents: ['Procedures'] }
    ],
    honesty: [
      { aspect: 'Console, workflows (Routines) and editor', demo: 'This console, in the browser, with the workflows published in the session', pilot: 'Agentic Platform installed on your infrastructure; Routines with visual editor, versions and dry run', origin: 'serie' },
      { aspect: 'Workflow from a written procedure', demo: 'Simulated generator in the browser, with three templates', pilot: 'Integrated into Agentic Platform and validated with your procedures; each workflow is reviewed before publishing', origin: 'demo' },
      { aspect: 'Frozen Foods Company agents', demo: 'Cold chain, traceability, holds, incidents, complaints and daily report, on synthetic data', pilot: 'Those of the chosen use case, adapted to your data and procedures', origin: 'demo' },
      { aspect: 'Connectors (SAP, MES Mapex, Siemens Opcenter APS, Mecalux Easy WMS, SCADA Galileo and Elara)', demo: 'Simulated in the browser', pilot: 'Reading 1–2 systems through an API or a read-only database replica. There are no standard connectors for SAP, MES or SCADA', origin: 'piloto' },
      { aspect: 'Alarm trigger', demo: 'When the C-07 alarm is opened', pilot: 'Webhook from Galileo/SCADA or periodic polling (cron): Agentic Platform has no agent scheduler of its own', origin: 'piloto' },
      { aspect: 'Language model', demo: 'No calls: the answers are prepared', pilot: 'The one Frozen Foods Company chooses (Azure OpenAI, Gemini or local), through the Agentic Platform gateway', origin: 'serie' },
      { aspect: 'Human approval', demo: 'Approval cards; rejecting applies nothing', pilot: 'The same, with SSO and role permissions. Nothing is written to SAP in the pilot: drafts and tickets approved by a person', origin: 'serie' },
      { aspect: 'Procedures with citations', demo: '5 synthetic documents (PNT-CAL-012, PNT-CAL-015, PNT-CAL-020, PNT-CAL-031 and IT-MAN-DP-02)', pilot: 'Your current procedures, with per-realm permissions; target ≥90 % correct citations', origin: 'serie' },
      { aspect: 'Audit log', demo: 'For this session, stored in the browser and exportable to JSON or CSV', pilot: 'In the Agentic Platform database, append-only, with each person’s SSO identity; exportable to CSV', origin: 'serie' },
      { aspect: 'Cost per request', demo: 'Estimate shown at the end of each run', pilot: 'Measured per request in USD, by realm and by use case, with daily and monthly budget', origin: 'serie' },
      { aspect: 'Data and actions', demo: 'Synthetic and mutually consistent, prepared by MFM; actions never leave the browser', pilot: 'Your data in read mode and 20–30 historical cases, anonymised if needed', origin: 'datos' }
    ],
    writes: 'None in SAP during the pilot: drafts and tickets approved by a person',
    cases: {
      A: {
        label: 'Use case A', short: 'Use case A · Customer complaint', title: 'Customer complaint: NC, 8D and reply',
        systems: ['Elara', 'SAP', 'MES Mapex'], systemsText: 'Elara and SAP/MES Mapex',
        trigger: 'Incoming email in the Quality mailbox (Outlook)',
        output: 'Complaint summary, lot trace, draft NC and 8D and a reply in the customer’s language, for approval',
        scene: 'reclamacion', sceneLabel: 'Complaint UKC-44718',
        accuracy: '≥90 % of 30 historical complaints correctly extracted (lot, product, defect and deadline)',
        accuracyHow: 'Comparison with the Quality record in Elara'
      },
      B: {
        label: 'Use case B', short: 'Use case B · Temperature excursion', title: 'Temperature excursion: lots, hold with approval and incident',
        systems: ['SCADA Galileo', 'Mecalux Easy WMS'], systemsText: 'Galileo/SCADA temperatures and Mecalux Easy WMS',
        trigger: 'Galileo/SCADA alarm via webhook or periodic polling (cron)',
        output: 'Affected pallets and lots, hold proposal for approval, draft incident and Teams alert',
        scene: 'alarma', sceneLabel: 'C-07 alarm',
        accuracy: '100 % of affected pallets and lots identified in 20 scenarios',
        accuracyHow: 'Comparison with the Easy WMS movements of each scenario'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Access, installation and baseline', detail: 'Read access, installation and measurement of current time', result: 'Criteria signed off and baseline measured' },
      { from: 3, to: 5, title: 'Connectors, agents and workflow', detail: 'Tests with 20–30 historical cases', result: 'Accuracy measured on historical cases' },
      { from: 6, to: 7, title: 'Parallel use', detail: 'Real cases, with the current process as fallback', result: 'Acceptance of the drafts by Quality' },
      { from: 8, to: 8, title: 'Evaluation and decision', detail: 'Measured criteria and final report', result: 'Final report and decision' }
    ],
    criteria: [
      { name: 'Time', target: 'Trace and draft in under 15 min', how: 'Timed against the baseline from weeks 1–2' },
      { name: 'Usefulness', target: 'Quality accepts the draft with minor edits in ≥70 % of cases', how: 'Review of each draft by Quality' },
      { name: 'Citations', target: '≥90 % of 50 reference questions with the correct citation', how: 'Evaluation tool included in Agentic Platform' },
      { name: 'Control', target: 'No action without approval; 100 % in the audit log', how: 'Review of the exported log' },
      { name: 'Cost', target: 'Model cost per case measured and within the realm budget', how: 'Cost report per realm (USD, estimate)' }
    ],
    gives: {
      client: ['Quality owner and IT contact', 'Read access to 1–2 systems', '20–30 historical cases, anonymised if needed', 'Current procedures', '2–3 h a week from Quality'],
      mfm: ['Installation on your infrastructure', 'Read connectors', 'Agents and workflow for the use case', 'User training', 'Final report with the measured criteria']
    },
    pilot: {
      sub: 'One use case, one plant (Fustiñana), one realm (Quality) and 5–10 users, on your infrastructure and with your model',
      after: 'After the pilot: campaign intake planning (measurable in the 2027 pea campaign) or a daily report connected to the historian or SCADA.',
      nextTitle: 'Next step: 2-hour workshop with Quality and IT',
      nextBody: 'To choose the use case, confirm read access and set the baseline the pilot will be measured against.'
    },
    calc: {
      fteHours: 1720,
      note: 'Hours of repetitive work that Quality, shift managers and Maintenance can devote to other tasks.',
      rows: [
        { id: 'reclamacion', label: 'Customer complaint: NC, 8D and reply', who: 'Plant Quality', scene: 'reclamacion', seen: 'Complaint UKC-44718', n: 4, before: 180, after: 45, basis: 'Summary, lot trace, NC, 8D and reply' },
        { id: 'excursion', label: 'Temperature excursion: lots, hold and incident', who: 'Shift Quality', scene: 'alarma', seen: 'C-07 alarm', n: 2, before: 150, after: 15, basis: 'Exposed pallets and lots, hold and incident' },
        { id: 'cuestionario', label: 'Customer questionnaire or tender', who: 'Plant Quality', scene: 'cuestionario', seen: 'Customer questionnaire', n: 6, before: 180, after: 60, basis: 'With citations from procedures, specification sheets and certificates' },
        { id: 'traza', label: 'Full trace or recall drill', who: 'Plant Quality', scene: 'retirada', seen: 'Recall drill', n: 1, before: 180, after: 20, basis: 'Genealogy, mass balance and customers' },
        { id: 'consultas', label: 'Questions on procedures', who: 'Quality and shift managers', scene: 'procedimientos', seen: 'Procedures', n: 40, before: 10, after: 3, basis: 'Search in the current procedures' },
        { id: 'parte', label: 'Daily equipment report', who: 'Maintenance and shift managers', scene: 'turno', seen: 'Shift summary', n: 22, before: 30, after: 10, basis: '1 report × 22 days' }
      ]
    },
    auditEmpty: 'Generate the daily report, publish a workflow or approve a hold: each step will appear here with its time, actor and view.',
    auditPilot: 'The log lives in the Agentic Platform database, identifies each person by their SSO, can be filtered by person, action and date, and is exported to CSV. In this demo it lives in this browser and is cleared with "Reset demo".',
    proposal: {
      code: 'PIL-FUS-2026-01',
      filename: 'agentic-pilot-proposal-fustinana',
      objective: 'To measure, with a real use case and signed-off criteria, how much Quality time Agentic Platform frees up and with what accuracy, without changing SAP, MES Mapex, Siemens Opcenter APS, Mecalux Easy WMS, Galileo/SCADA or Elara. Agentic Platform reads from those systems, reasons with the procedures and proposes; a person approves before anything is written.',
      extraArch: [['Masking', 'Personal data masked before the model; ID card (DNI, NIE) and IBAN formats are added in the pilot']],
      compliance: [
        ['IFS Food v8 · BRCGS · FSSC 22000', 'Agentic Platform prepares traces, recall drills, NCs and 8D reports that Quality signs; the certified management system at Fustiñana does not change'],
        ['HACCP', 'Critical control points (metal detectors, cold room temperatures) stay in their equipment and records; Agentic Platform reads them and alerts'],
        ['Product release', 'The Quality Manager decides (PNT-CAL-015); Galileo/SCADA is read-only and plant control is not touched'],
        ['GDPR', 'MFM as data processor; the gateway masks personal data before the model']
      ],
      signatures: [{ role: 'quality_plant', note: 'Agrees with the scope and criteria' }, { role: 'IT · Frozen Foods Company', note: 'Agrees with the access and the deployment' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform replaces nothing: it sits on top of SAP, Mapex, Opcenter, Easy WMS, Galileo and Elara. It reads, reasons with your procedures and proposes; before writing to a system, a person approves.',
        'It runs on your infrastructure, with your Microsoft Entra ID SSO and the model you choose. With a local model, inference stays on your network; IT validates the other flows.',
        'The dashed amber lines are the only writes, and always after approval. Galileo/SCADA is read-only: plant control is not touched.'
      ],
      piloto: [
        'To be honest: today’s data is synthetic and the demo does not call any model. Standard in Agentic Platform: Routines, human approval, audit, answers with citations and cost per request.',
        'Built for this demo: the workflow generator and the Frozen Foods Company agents. SAP, Mapex or SCADA connectors do not exist as standard: they are built in the pilot, in read mode.',
        '6–8 week pilot: one use case, Fustiñana, Quality realm, 5–10 users. The acceptance criteria are signed off in week 1 and measured in week 8.'
      ],
      horas: [
        'Ask how many complaints, questionnaires or alarms they handle a month and enter them: the calculator is theirs.',
        '"With Agentic Platform" includes review and approval by a person. These are hours of repetitive work that Quality can devote to other tasks.',
        'These are assumptions for discussion: the real baseline is measured in weeks 1–2 of the pilot.'
      ],
      registro: [
        'Everything we have done today is here: {n}, by people and by agents, with time, actor and view.',
        'Filter by "Decisions": every approval and every rejection, with its reason. Nothing is edited or deleted from the console; it is exported to JSON or CSV.',
        'Close: we propose a 2-hour workshop with Quality and IT to choose the use case and set the baseline.'
      ],
      next: {
        arquitectura: 'Click "Local model" to show the model moving into their network; then the "Demo and pilot" tab.',
        piloto: 'Choose use case A or B with them and open the "Hours calculator" tab.',
        horas: 'Enter their monthly cases and open "Audit log" to close.',
        registro: 'Click "Download pilot proposal (PDF)" and propose a date for the 2-hour workshop.'
      }
    },
    tour: [
      'Agentic Platform sits on top of SAP, Mapex, Opcenter, Easy WMS, Galileo and Elara: it reads, prepares proposals and a person approves before anything is written.',
      'With a local model, inference runs inside your infrastructure; the other flows are validated with IT.',
      'Today’s use cases, from the C-07 alarm to complaint UKC-44718, and what is standard in Agentic Platform, what was built for this demo and what is built in the pilot.',
      '6–8 week pilot: one use case, Fustiñana, Quality realm and acceptance criteria signed off in week 1.',
      'Hours freed up with editable assumptions; the real baseline is measured in the pilot.',
      'Everything done in the session is kept in the audit log: human decisions, agent steps and export.'
    ]
  }
});
