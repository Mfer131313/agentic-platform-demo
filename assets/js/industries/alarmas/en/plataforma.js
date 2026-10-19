/* Guardián Ibérica Instalaciones · "How Agentic Platform fits" (English): architecture, demo versus pilot, hours calculator,
 * IT questions and audit log. Demo scenario with synthetic data (MFM). */
agenticPackEn('alarmas', {
  plataforma: {
    nav: 'How it fits at GII',
    title: 'How it fits at Guardián Ibérica Instalaciones',
    actor: 'decider',
    site: { kind: 'Hub', name: 'Paterna (Valencia)', realm: 'Operations' },
    pageMeta: [
      { icon: 'building', text: 'Paterna operations hub' },
      { icon: 'server', text: 'Installed on your infrastructure' },
      { icon: 'user-check', text: 'Human approval before updates' }
    ],
    kpis: [
      { label: 'Proposed pilot', value: '6–8', unit: 'weeks', sub: '1 use case · Paterna hub · Operations realm', icon: 'calendar' },
      { label: 'Systems connected in the pilot', value: '1–2', unit: 'read-only', sub: 'Through an API or a database replica', icon: 'database' },
      { label: 'Pilot users', value: '5–10', sub: 'SSO with Google Workspace', icon: 'users' }
    ],
    arch: {
      title: 'Reference architecture at the Paterna hub',
      sso: 'SSO access · Google Workspace',
      ssoShort: 'Google Workspace SSO',
      console: 'Web console and alerts in Slack',
      consoleShort: 'Web console and Slack'
    },
    deploy: {
      cpd: { seg: 'Own data centre', label: 'Own data centre · virtual machine with Docker Compose', zone: 'Guardián Ibérica Instalaciones data centre · VM with Docker Compose', text: 'A virtual machine in your data centre with Docker Compose: application, Postgres database and Qdrant vector store.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'Guardián Ibérica Instalaciones Kubernetes cluster · Helm', text: 'Helm deployment on your Kubernetes cluster: application, Postgres database and Qdrant vector store.' },
      cloud: { seg: 'Own cloud', label: 'Guardián Ibérica Instalaciones cloud (Azure, AWS or GCP)', zone: 'Guardián Ibérica Instalaciones cloud subscription (Azure, AWS or GCP)', text: 'The same installation in your cloud subscription, in the region you choose.' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'EU region, under the Guardián Ibérica Instalaciones contract', exit: 'Only the text of each request leaves your network', note: 'Connected through the Agentic Platform LiteLLM gateway; confirmed in weeks 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'With the account and region contracted by Guardián Ibérica Instalaciones', exit: 'Only the text of each request leaves your network', note: 'Provider included as standard in the Agentic Platform model catalogue.' },
      local: { seg: 'Local model', name: 'Local model', local: true, place: 'GPU server in your data centre (Ollama, LM Studio or llama.cpp)', exit: 'Inference runs inside your network', note: 'Quality and speed are sized to your server. IT also reviews the connector and telemetry flows.' }
    },
    people: ['decider', 'install_shift', 'support_shift', 'maintenance_shift', 'warehouse_shift', 'finance'],
    peopleShort: ['Operations Manager', 'Installations Manager', 'Technical Support', 'Maintenance Manager', 'Warehouse', 'Finance'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Visual editor, versions and dry run' },
      { icon: 'cpu', title: 'Operations agents', text: 'Panel communications, maintenance, warehouse, recalls, complaints and shift report', agents: true },
      { icon: 'user-check', title: 'Human approval', text: 'Nothing is written to a system without its owner', approval: true },
      { icon: 'book-open', title: 'Procedures with citations', text: 'Every answer links its source; without a source, it says so' },
      { icon: 'history', title: 'Audit log', text: 'Append-only and exportable' },
      { icon: 'key', title: 'Permissions by role and realm', text: 'Each area and each brand sees its own data' },
      { icon: 'gauge', title: 'Cost per request', text: 'USD estimate and budget per realm' },
      { icon: 'shield', title: 'Model gateway', text: 'Masks personal data before the model', gateway: true }
    ],
    tiles: [
      { name: 'Salesforce CRM', icon: 'users', text: 'Reads customers, contracts and complaints. Prepares replies and credits for approval.', write: true },
      { name: 'SAP Business One', icon: 'database', text: 'Reads orders, invoices and equipment stock. Proposes purchase and replenishment orders.', write: true },
      { name: 'Verisure Partner Portal', icon: 'shield', text: 'Reads the brand contracts, installations and panel status. Read-only.', write: false },
      { name: 'Sector Alarm Partner Hub', icon: 'shield', text: 'Reads the brand contracts, charges and panel status. Read-only.', write: false },
      { name: 'Prosegur Partner Portal', icon: 'shield', text: 'Reads the brand contracts, approval status and questionnaires. Read-only.', write: false },
      { name: 'Samsara Fleet', icon: 'truck', text: 'Reads the position and availability of the technicians\' vans. Read-only.', write: false },
      { name: 'Twilio SMS', icon: 'message-square', text: 'Prepares SMS messages to customers. Sending is approved.', write: true }
    ],
    decisions: {
      deploy: ['It does not depend on MFM cloud services. Your IT team or a managed service runs it.'],
      llm: 'The model is changed through configuration, without touching the workflows; OpenAI or AWS Bedrock in the EU are also supported.',
      access: [
        'SSO with Google Workspace (OIDC) or SAML 2.0. Permissions by role and realm: the "Operations · Paterna" realm only sees its own procedures and data.',
        'The gateway masks personal data before calling the model; ID card (DNI, NIE) and IBAN formats are added in the pilot.'
      ],
      hitl: 'Switching a panel to its backup channel, sending an SMS to a customer, crediting a charge or replying to a complaint requires approval by the owner. Rejecting applies nothing and is logged with the reason.',
      cost: 'The per-realm budget separates the spend of each area (Installations, Maintenance, Technical Support and After-sales).',
      limits: [
        'It does not replace Salesforce, SAP Business One, the Verisure, Sector Alarm and Prosegur Alarmas portals, Samsara or Twilio.',
        'It does not manage panels or alarm receiving centres: the brands keep running their monitoring.',
        'It does not decide credits or contract penalties: the Finance Manager decides.',
        'It does not assign tasks or assess people: it works with installations, equipment and documents.'
      ]
    },
    faqTitle: 'Common questions from IT',
    faqSub: 'Short answers for the conversation with the technical team',
    faq: [
      { topic: 'Integration', q: 'Where is it installed?', a: 'On a virtual machine in your data centre with Docker Compose, on Kubernetes with Helm, or in your cloud subscription. It does not depend on MFM cloud services.' },
      { topic: 'Security', q: 'How do users sign in?', a: 'With Google Workspace SSO (OIDC) or SAML 2.0. Permissions are by role and by realm (area or brand).' },
      { topic: 'Data', q: 'What data leaves our network?', a: 'With a local model, inference runs on your network. With an external one, the content sent and the contract are reviewed. Connector, telemetry and masking flows are validated with IT.' },
      { topic: 'Integration', q: 'Are there Salesforce, SAP Business One or partner portal connectors?', a: 'Not as standard. In the pilot they are built for 1–2 systems, through an API or a read-only database replica; the partner portals are read without writing to them, and reading Postgres databases already works.' },
      { topic: 'Security', q: 'Can it access customers\' cameras or panels?', a: 'No. It only reads management data (contracts, work orders, communication status). Video verification images do not go through Agentic Platform; their handling follows procedure PR-RGPD-002.' },
      { topic: 'Scale', q: 'How many users does it support?', a: 'Concurrency is sized and verified with load tests. Each realm has limits on requests per minute, tokens per day and budget.' },
      { topic: 'Language', q: 'What language does it work in?', a: 'Chat and agents in Spanish; replies to customers in their own language. The Agentic Platform administration console is in English.' },
      { topic: 'Cost', q: 'Licence and price?', a: 'They are set out in the commercial proposal (SOW).' }
    ],
    seen: [
      { scene: 'turno', label: 'Shift summary', icon: 'activity', title: 'Shift summary for Monday 19/10/2026 in Paterna', text: '61 installations scheduled, 118 maintenance visits and 9 urgent work orders (OT-2026-xxxxx) across Installations, Maintenance, Technical Support, After-sales, Warehouse and Fleet; the agent prepares the summary and leaves it for review.', agents: ['Shift report'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'From words to workflow', icon: 'workflow', title: 'Written procedure → workflow', text: 'Procedure PR-COM-003 (panel communication loss) becomes a workflow with detection, switchover to the backup channel, visit and customer notice, with approval and a dry run.', agents: ['Workflow generator'], approver: 'support_shift' },
      { scene: 'alarma', label: 'Communication outage', icon: 'alert-triangle', title: '4G outage on 214 panels in Valencia North (ALM-COM-0611)', text: 'Since 05:10, after a mobile operator maintenance window, 214 Sector Alarm and Verisure panels have lost their 4G link (peak of 241 at 05:42): a proposal to switch to the backup channel, priority visits to the 38 panels with no backup and SMS through Twilio, for approval.', agents: ['Technical support', 'Dispatch and maintenance', 'Customers'], approver: 'support_shift', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'False alarms and charges', icon: 'mail', title: 'Complaint from Marta Soler Pons (CLM-2026-0619)', text: 'The customer in Burjassot, under Sector Alarm contract SA-2026-77412, disputes two guard call-out charges (2 x EUR 39.00) for false alarms on 12 and 14/10/2026 and threatens to cancel with a EUR 180 penalty: the cause is a living-room PIR sensor with a low battery and no warning. Draft reply and credit proposal for approval.', agents: ['Customer complaints', 'Installation traceability'], approver: 'finance', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'PIR-2607-A recall', icon: 'git-branch', title: 'Recall of batch PIR-2607-A (REC-2026-1019)', text: 'The Sentinela Electronics PIR-200 detector has a lithium battery overheating risk: 2,400 received, 1,386 installed in 912 homes (Verisure 540, Sector Alarm 214, Prosegur Alarmas 158), 960 in the warehouse and 54 returned; target, locate and notify within 4 h (PR-QLT-006).', agents: ['Installation traceability', 'Product recalls'], approver: 'warehouse_shift', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Prosegur approval', icon: 'list-checks', title: 'Prosegur Alarmas approval questionnaire (HOM-2026-031)', text: 'The annual partner-installer questionnaire (security company licensing, UNE-EN 50131, installer certification, GDPR and video verification, insurance and subcontractors), answered with citations; questions without evidence are left for the owner.', agents: ['Customer questionnaires'], approver: 'compliance', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedures', icon: 'book-open', title: 'Questions with citations', text: 'Installation, maintenance, false alarms, video verification, communication loss, customer cancellation and product recall: every answer links the current section (PR-INS-001, PR-MAN-004, PR-SOP-007, PR-RGPD-002, PR-COM-003, PR-BAJ-005 and PR-QLT-006) and, if there is no source, says so.', agents: ['Procedures'] }
    ],
    honesty: [
      { aspect: 'Console, workflows (Routines) and editor', demo: 'This console, in the browser, with the workflows published in the session', pilot: 'Agentic Platform installed on your infrastructure; Routines with visual editor, versions and dry run', origin: 'serie' },
      { aspect: 'Workflow from a written procedure', demo: 'Simulated generator in the browser, with three templates', pilot: 'Integrated into Agentic Platform and validated with your procedures; each workflow is reviewed before publishing', origin: 'demo' },
      { aspect: 'Guardián Ibérica Instalaciones agents', demo: 'Panel communications, maintenance, installation traceability, recalls, complaints and shift report, on synthetic data', pilot: 'Those of the chosen use case, adapted to your data and procedures', origin: 'demo' },
      { aspect: 'Connectors (Salesforce, SAP Business One, Verisure, Sector Alarm and Prosegur Alarmas portals, Samsara and Twilio)', demo: 'Simulated in the browser', pilot: 'Reading 1–2 systems through an API or a read-only database replica. There are no standard connectors for Salesforce, SAP or the partner portals', origin: 'piloto' },
      { aspect: 'Alarm trigger', demo: 'When the ALM-COM-0611 communication outage is opened', pilot: 'Webhook from the partner portal or periodic polling (cron): Agentic Platform has no agent scheduler of its own', origin: 'piloto' },
      { aspect: 'Language model', demo: 'No calls: the answers are prepared', pilot: 'The one Guardián Ibérica Instalaciones chooses (Azure OpenAI, Gemini or local), through the Agentic Platform gateway', origin: 'serie' },
      { aspect: 'Human approval', demo: 'Approval cards; rejecting applies nothing', pilot: 'The same, with SSO and role permissions. Nothing is written to SAP or the portals in the pilot: drafts and tickets approved by a person', origin: 'serie' },
      { aspect: 'Procedures with citations', demo: '7 synthetic documents (PR-INS-001, PR-MAN-004, PR-SOP-007, PR-RGPD-002, PR-COM-003, PR-BAJ-005 and PR-QLT-006)', pilot: 'Your current procedures, with per-realm permissions; target ≥90 % correct citations', origin: 'serie' },
      { aspect: 'Audit log', demo: 'For this session, stored in the browser and exportable to JSON or CSV', pilot: 'In the Agentic Platform database, append-only, with each person\'s SSO identity; exportable to CSV', origin: 'serie' },
      { aspect: 'Cost per request', demo: 'Estimate shown at the end of each run', pilot: 'Measured per request in USD, by realm and by use case, with daily and monthly budget', origin: 'serie' },
      { aspect: 'Data and actions', demo: 'Synthetic and mutually consistent, prepared by MFM; actions never leave the browser', pilot: 'Your data in read mode and 20–30 historical cases, anonymised if needed', origin: 'datos' }
    ],
    writes: 'None in SAP or the partner portals during the pilot: drafts and tickets approved by a person',
    cases: {
      A: {
        label: 'Use case A', short: 'Use case A · Customer complaint', title: 'Customer complaint: contract, charges and reply',
        systems: ['Salesforce CRM', 'SAP Business One', 'Sector Alarm Partner Hub'], systemsText: 'Salesforce CRM and SAP Business One',
        trigger: 'Incoming email in the Customer Care mailbox (Gmail)',
        output: 'Complaint summary, contract and charges cross-checked, draft reply and a credit proposal, for approval',
        scene: 'reclamacion', sceneLabel: 'False alarms and charges',
        accuracy: '≥90 % of 30 historical complaints correctly extracted (contract, equipment, amount and deadline)',
        accuracyHow: 'Comparison with the Customer Care record in Salesforce'
      },
      B: {
        label: 'Use case B', short: 'Use case B · Panel communication outage', title: 'Panel communication outage: switchover, visits and notice',
        systems: ['Verisure Partner Portal', 'Sector Alarm Partner Hub', 'Samsara Fleet'], systemsText: 'panel status from the partner portals and Samsara Fleet availability',
        trigger: 'Partner portal alert via webhook or periodic polling (cron)',
        output: 'Affected panels and those without backup, switchover and priority visit proposal for approval, draft SMS and Slack alert',
        scene: 'alarma', sceneLabel: 'Communication outage',
        accuracy: '100 % of affected panels and those without backup identified in 20 scenarios',
        accuracyHow: 'Comparison with the portal panel status and the work orders of each scenario'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Access, installation and baseline', detail: 'Read access, installation and measurement of current time', result: 'Criteria signed off and baseline measured' },
      { from: 3, to: 5, title: 'Connectors, agents and workflow', detail: 'Tests with 20–30 historical cases', result: 'Accuracy measured on historical cases' },
      { from: 6, to: 7, title: 'Parallel use', detail: 'Real cases, with the current process as fallback', result: 'Acceptance of the drafts by Operations' },
      { from: 8, to: 8, title: 'Evaluation and decision', detail: 'Measured criteria and final report', result: 'Final report and decision' }
    ],
    criteria: [
      { name: 'Time', target: 'Reply and draft in under 15 min', how: 'Timed against the baseline from weeks 1–2' },
      { name: 'Usefulness', target: 'Operations accepts the draft with minor edits in ≥70 % of cases', how: 'Review of each draft by Operations' },
      { name: 'Citations', target: '≥90 % of 50 reference questions with the correct citation', how: 'Evaluation tool included in Agentic Platform' },
      { name: 'Control', target: 'No action without approval; 100 % in the audit log', how: 'Review of the exported log' },
      { name: 'Cost', target: 'Model cost per case measured and within the realm budget', how: 'Cost report per realm (USD, estimate)' }
    ],
    gives: {
      client: ['Operations owner and IT contact', 'Read access to 1–2 systems', '20–30 historical cases, anonymised if needed', 'Current procedures', '2–3 h a week from Operations'],
      mfm: ['Installation on your infrastructure', 'Read connectors', 'Agents and workflow for the use case', 'User training', 'Final report with the measured criteria']
    },
    pilot: {
      sub: 'One use case, one hub (Paterna), one realm (Operations) and 5–10 users, on your infrastructure and with your model',
      after: 'After the pilot: product recall tracking across the whole portfolio (measurable in campaign REC-2026-1019 for batch PIR-2607-A) or automatic answers to the approval questionnaires of the three brands.',
      nextTitle: 'Next step: 2-hour workshop with Operations and IT',
      nextBody: 'To choose the use case, confirm read access and set the baseline the pilot will be measured against.'
    },
    calc: {
      fteHours: 1720,
      note: 'Hours of repetitive work that Operations, shift supervisors and Technical Support can devote to other tasks.',
      rows: [
        { id: 'reclamacion', label: 'Customer complaint: contract, charges and reply (CLM-2026-0619)', who: 'Customer Care and Finance', scene: 'reclamacion', seen: 'False alarms and charges', n: 12, before: 120, after: 30, basis: 'Summary, contract, charges, reply and credit proposal' },
        { id: 'excursion', label: 'Panel communication outage: switchover and visits (ALM-COM-0611)', who: 'Technical Support and Maintenance', scene: 'alarma', seen: 'Communication outage', n: 8, before: 90, after: 15, basis: 'Affected panels, backup, visits and notice' },
        { id: 'cuestionario', label: 'Brand approval questionnaire (HOM-2026-031)', who: 'Compliance and Operations', scene: 'cuestionario', seen: 'Prosegur approval', n: 6, before: 150, after: 50, basis: 'With citations from procedures, certificates and policies' },
        { id: 'traza', label: 'Batch trace or recall campaign (REC-2026-1019)', who: 'Warehouse Manager', scene: 'retirada', seen: 'PIR-2607-A recall', n: 3, before: 180, after: 30, basis: 'Units by batch, affected homes and notices' },
        { id: 'consultas', label: 'Questions on procedures', who: 'Installations, maintenance, support and after-sales', scene: 'procedimientos', seen: 'Procedures', n: 60, before: 10, after: 3, basis: 'Search in the current procedures' },
        { id: 'parte', label: 'Shift report', who: 'Operations Manager', scene: 'turno', seen: 'Shift summary', n: 22, before: 30, after: 10, basis: '1 report × 22 days' }
      ]
    },
    auditEmpty: 'Generate the shift report, publish a workflow or approve a backup switchover: each step will appear here with its time, actor and view.',
    auditPilot: 'The log lives in the Agentic Platform database, identifies each person by their SSO, can be filtered by person, action and date, and is exported to CSV. In this demo it lives in this browser and is cleared with "Reset demo".',
    proposal: {
      code: 'PIL-GII-2026-01',
      filename: 'agentic-pilot-proposal-alarmas',
      objective: 'To measure, with a real use case and signed-off criteria, how much Operations time Agentic Platform frees up and with what accuracy, without changing Salesforce, SAP Business One, the Verisure, Sector Alarm and Prosegur Alarmas partner portals, Samsara or Twilio. Agentic Platform reads from those systems, reasons with the procedures and proposes; a person approves before anything is written.',
      extraArch: [['Masking', 'Personal data masked before the model; ID card (DNI, NIE) and IBAN formats are added in the pilot']],
      compliance: [
        ['Private security', 'GII keeps its licence as a security company (Law 5/2014, Order INT/316/2011); Agentic Platform does not monitor or manage alarms, it only prepares internal management'],
        ['Manufacturer recall campaigns', 'The recall of batch PIR-2607-A follows the channels of Sentinela Electronics and of each brand; Agentic Platform matches batches, homes and warehouse, reads and alerts'],
        ['Commercial decisions', 'Credits, penalties and replies are approved by the owner; SAP and the partner portals are read-only in the pilot'],
        ['GDPR', 'MFM as data processor; the gateway masks personal data before the model and video verification follows PR-RGPD-002']
      ],
      signatures: [{ role: 'decider', note: 'Agrees with the scope and criteria' }, { role: 'IT · Guardián Ibérica Instalaciones', note: 'Agrees with the access and the deployment' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform replaces nothing: it sits on top of Salesforce, SAP Business One, the Verisure, Sector Alarm and Prosegur Alarmas portals, Samsara and Twilio. It reads, reasons with your procedures and proposes; before writing to a system, a person approves.',
        'It runs on your infrastructure, with your Google Workspace SSO and the model you choose. With a local model, inference stays on your network; IT validates the other flows.',
        'The dashed amber lines are the only writes, and always after approval. The partner portals are read-only: the brands\' monitoring is untouched.'
      ],
      piloto: [
        'To be honest: today\'s data is synthetic and the demo does not call any model. Standard in Agentic Platform: Routines, human approval, audit, answers with citations and cost per request.',
        'Built for this demo: the workflow generator and the Guardián Ibérica Instalaciones agents. Salesforce, SAP or partner portal connectors do not exist as standard: they are built in the pilot, in read mode.',
        '6–8 week pilot: one use case, the Paterna hub, Operations realm, 5–10 users. The acceptance criteria are signed off in week 1 and measured in week 8.'
      ],
      horas: [
        'Ask how many complaints, approval questionnaires or communication outages they handle a month and enter them: the calculator is theirs.',
        '"With Agentic Platform" includes review and approval by a person. These are hours of repetitive work that Operations can devote to other tasks.',
        'These are assumptions for discussion: the real baseline is measured in weeks 1–2 of the pilot.'
      ],
      registro: [
        'Everything we have done today is here: {n}, by people and by agents, with time, actor and view.',
        'Filter by "Decisions": every approval and every rejection, with its reason. Nothing is edited or deleted from the console; it is exported to JSON or CSV.',
        'Close: we propose a 2-hour workshop with Operations and IT to choose the use case and set the baseline.'
      ],
      next: {
        arquitectura: 'Click "Local model" to show the model moving into their network; then the "Demo and pilot" tab.',
        piloto: 'Choose use case A or B with them and open the "Hours calculator" tab.',
        horas: 'Enter their monthly cases and open "Audit log" to close.',
        registro: 'Click "Download pilot proposal (PDF)" and propose a date for the 2-hour workshop.'
      }
    },
    tour: [
      'Agentic Platform sits on top of Salesforce, SAP Business One, the partner portals, Samsara and Twilio: it reads, prepares proposals and a person approves before anything is written.',
      'With a local model, inference runs inside your infrastructure; the other flows are validated with IT.',
      'Today\'s use cases, from the 214-panel outage (ALM-COM-0611) to complaint CLM-2026-0619, recall REC-2026-1019 and approval HOM-2026-031, and what is standard in Agentic Platform, what was built for this demo and what is built in the pilot.',
      '6–8 week pilot: one use case, the Paterna hub, Operations realm and acceptance criteria signed off in week 1.',
      'Hours freed up with editable assumptions; the real baseline is measured in the pilot.',
      'Everything done in the session is kept in the audit log: human decisions, agent steps and export.'
    ]
  }
});
