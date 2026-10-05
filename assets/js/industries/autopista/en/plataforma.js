/* Autopista Multimotor · "How Agentic Platform fits" (English): architecture, demo versus pilot, hours calculator,
 * IT questions and audit log. Demo scenario with synthetic data (MFM). */
agenticPackEn('autopista', {
  plataforma: {
    nav: 'How it fits at APM',
    title: 'How it fits at Autopista Multimotor',
    actor: 'decider',
    site: { kind: 'Hub', name: 'Madrid (Marqués de Soria)', realm: 'Operations' },
    pageMeta: [
      { icon: 'building', text: 'Madrid operations hub' },
      { icon: 'server', text: 'Installed on your infrastructure' },
      { icon: 'user-check', text: 'Human approval before updates' }
    ],
    kpis: [
      { label: 'Proposed pilot', value: '6–8', unit: 'weeks', sub: '1 use case · Madrid hub · Operations realm', icon: 'calendar' },
      { label: 'Systems connected in the pilot', value: '1–2', unit: 'read-only', sub: 'Through an API or a database replica', icon: 'database' },
      { label: 'Pilot users', value: '5–10', sub: 'SSO with Google Workspace', icon: 'users' }
    ],
    arch: {
      title: 'Reference architecture at the Madrid hub',
      sso: 'SSO access · Google Workspace',
      ssoShort: 'Google Workspace SSO',
      console: 'Web console and alerts in Slack',
      consoleShort: 'Web console and Slack'
    },
    deploy: {
      cpd: { seg: 'Own data centre', label: 'Own data centre · virtual machine with Docker Compose', zone: 'Autopista Multimotor data centre · VM with Docker Compose', text: 'A virtual machine in your data centre with Docker Compose: application, Postgres database and Qdrant vector store.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'Autopista Multimotor Kubernetes cluster · Helm', text: 'Helm deployment on your Kubernetes cluster: application, Postgres database and Qdrant vector store.' },
      cloud: { seg: 'Own cloud', label: 'Autopista Multimotor cloud (Azure, AWS or GCP)', zone: 'Autopista Multimotor cloud subscription (Azure, AWS or GCP)', text: 'The same installation in your cloud subscription, in the region you choose.' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'EU region, under the Autopista Multimotor contract', exit: 'Only the text of each request leaves your network', note: 'Connected through the Agentic Platform LiteLLM gateway; confirmed in weeks 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'With the account and region contracted by Autopista Multimotor', exit: 'Only the text of each request leaves your network', note: 'Provider included as standard in the Agentic Platform model catalogue.' },
      local: { seg: 'Local model', name: 'Local model', local: true, place: 'GPU server in your data centre (Ollama, LM Studio or llama.cpp)', exit: 'Inference runs inside your network', note: 'Quality and speed are sized to your server. IT also reviews the connector and telemetry flows.' }
    },
    people: ['decider', 'sales_shift', 'rental_shift', 'subscription_shift', 'workshop_shift', 'finance'],
    peopleShort: ['Operations Manager', 'Sales Shift Supervisor', 'Rental Fleet', 'Subscriptions', 'Workshop Manager', 'Finance'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Visual editor, versions and dry run' },
      { icon: 'cpu', title: 'Operations agents', text: 'Stock, fleet, workshop, financing, recalls, complaints and shift report', agents: true },
      { icon: 'user-check', title: 'Human approval', text: 'Nothing is written to a system without its owner', approval: true },
      { icon: 'book-open', title: 'Procedures with citations', text: 'Every answer links its source; without a source, it says so' },
      { icon: 'history', title: 'Audit log', text: 'Append-only and exportable' },
      { icon: 'key', title: 'Permissions by role and realm', text: 'Each business line sees its own data' },
      { icon: 'gauge', title: 'Cost per request', text: 'USD estimate and budget per realm' },
      { icon: 'shield', title: 'Model gateway', text: 'Masks personal data before the model', gateway: true }
    ],
    tiles: [
      { name: 'Salesforce CRM', icon: 'users', text: 'Reads customers, opportunities and complaints. Prepares offers and replies for approval.', write: true },
      { name: 'SAP ERP', icon: 'database', text: 'Reads orders, contracts and invoices. Proposes stock reservations and factory orders.', write: true },
      { name: 'Odoo Inventory', icon: 'warehouse', text: 'Reads vehicle stock and the rental fleet unit by unit.', write: false },
      { name: 'iCare Workshop', icon: 'wrench', text: 'Reads orders, loads and capacity. Proposes rescheduling workshop appointments.', write: true },
      { name: 'Stripe Payments', icon: 'euro', text: 'Reads payments, subscription instalments and arrears.', write: false },
      { name: 'Twilio SMS', icon: 'message-square', text: 'Prepares SMS messages to customers. Sending is approved.', write: true },
      { name: 'DocuSign e-signature', icon: 'file-text', text: 'Reads signature status. Prepares draft contracts for approval.', write: true }
    ],
    decisions: {
      deploy: ['It does not depend on MFM cloud services. Your IT team or a managed service runs it.'],
      llm: 'The model is changed through configuration, without touching the workflows; OpenAI or AWS Bedrock in the EU are also supported.',
      access: [
        'SSO with Google Workspace (OIDC) or SAML 2.0. Permissions by role and realm: the "Operations · Madrid" realm only sees its own procedures and data.',
        'The gateway masks personal data before calling the model; ID card (DNI, NIE) and IBAN formats are added in the pilot.'
      ],
      hitl: 'Reserving stock in SAP, rescheduling the workshop in iCare, sending an SMS or a contract to the customer requires approval by the owner. Rejecting applies nothing and is logged with the reason.',
      cost: 'The per-realm budget separates the spend of each business line (Sales, Rental, Subscription and Workshop).',
      limits: [
        'It does not replace Salesforce, SAP, Odoo Inventory, iCare Workshop, Stripe, Twilio or DocuSign.',
        'It does not move money: Stripe is read-only and payments stay as they are today.',
        'It does not decide financing or contract terms: the Finance Manager decides.',
        'It does not assign tasks or assess people: it works with vehicles, orders and documents.'
      ]
    },
    faqTitle: 'Common questions from IT',
    faqSub: 'Short answers for the conversation with the technical team',
    faq: [
      { topic: 'Integration', q: 'Where is it installed?', a: 'On a virtual machine in your data centre with Docker Compose, on Kubernetes with Helm, or in your cloud subscription. It does not depend on MFM cloud services.' },
      { topic: 'Security', q: 'How do users sign in?', a: 'With Google Workspace SSO (OIDC) or SAML 2.0. Permissions are by role and by realm (business line or department).' },
      { topic: 'Data', q: 'What data leaves our network?', a: 'With a local model, inference runs on your network. With an external one, the content sent and the contract are reviewed. Connector, telemetry and masking flows are validated with IT.' },
      { topic: 'Integration', q: 'Are there Salesforce, SAP or Odoo connectors?', a: 'Not as standard. In the pilot they are built for 1–2 systems, through an API or a read-only database replica; reading Postgres databases already works.' },
      { topic: 'Scale', q: 'How many users does it support?', a: 'Concurrency is sized and verified with load tests. Each realm has limits on requests per minute, tokens per day and budget.' },
      { topic: 'Language', q: 'What language does it work in?', a: 'Chat and agents in Spanish; replies to customers in their own language. The Agentic Platform administration console is in English.' },
      { topic: 'Cost', q: 'Licence and price?', a: 'They are set out in the commercial proposal (SOW).' }
    ],
    seen: [
      { scene: 'turno', label: 'Shift summary', icon: 'activity', title: 'Morning shift summary in Madrid', text: 'Critical BMW X3 stock, a VW technician off sick in the workshop, 8 deliveries scheduled, 23 workshop orders in the queue and the shift report with the 07:30 readings; the agent prepares the summary and leaves it for review.', agents: ['Shift report'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'From words to workflow', icon: 'workflow', title: 'Customer enquiry → sales workflow', text: 'José María López’s request (an automatic Seat Ibiza with EUR 20,000 down) goes through capture, stock search, financing with Banco Sabadell, the DocuSign contract and delivery, with approval and a dry run.', agents: ['Workflow generator'], approver: 'sales_shift' },
      { scene: 'alarma', label: 'Stock and workshop alarm', icon: 'alert-triangle', title: 'Critical BMW X3 stock and workshop short of a VW technician', text: 'A single BMW X3 unit with a customer waiting and the next delivery on 14/10/2026, and the workshop at 70 % capacity: a reservation and appointment rescheduling proposal for approval.', agents: ['Stock monitor', 'Workshop and capacity', 'Vehicle traceability'], approver: 'decider', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'APR dispute', icon: 'mail', title: 'APR dispute: 3.99 % versus 4.25 %', text: 'A customer complains because the Banco Sabadell financing contract says 3.99 % and the invoice says 4.25 %: contract, history, draft reply and a credit proposal for approval.', agents: ['Customer complaints', 'Vehicle traceability'], approver: 'finance', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'VW Golf recall (ABS)', icon: 'git-branch', title: 'VW Golf ABS module recall', text: 'Campaign REC-VW-2026-001 affects 47 fleet units: 12 already serviced and 35 pending before 15/11/2026, with VIN traceability (for example, VIN-2026-MAD-SEAT-03 at the hub), customers and workshop appointments.', agents: ['Vehicle traceability', 'Recalls'], approver: 'workshop_shift', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Customer questionnaire', icon: 'list-checks', title: 'Customer questionnaire answered with citations', text: 'A customer’s questions, answered in their own language with citations from procedures, contracts and specification sheets; those without evidence are left for the owner.', agents: ['Customer questionnaires'], approver: 'decider', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedures', icon: 'book-open', title: 'Questions with citations', text: 'Direct sales, rental, 6-month subscription and brand workshop: every answer links the current section (PROC-VENTA-001, PROC-ALQUILER-001, PROC-SUSCRIPCION-001 and PROC-TALLER-001) and, if there is no source, says so.', agents: ['Procedures'] }
    ],
    honesty: [
      { aspect: 'Console, workflows (Routines) and editor', demo: 'This console, in the browser, with the workflows published in the session', pilot: 'Agentic Platform installed on your infrastructure; Routines with visual editor, versions and dry run', origin: 'serie' },
      { aspect: 'Workflow from a written procedure', demo: 'Simulated generator in the browser, with three templates', pilot: 'Integrated into Agentic Platform and validated with your procedures; each workflow is reviewed before publishing', origin: 'demo' },
      { aspect: 'Autopista Multimotor agents', demo: 'Stock, workshop, vehicle traceability, recalls, complaints and shift report, on synthetic data', pilot: 'Those of the chosen use case, adapted to your data and procedures', origin: 'demo' },
      { aspect: 'Connectors (Salesforce, SAP, Odoo Inventory, iCare Workshop, Stripe, Twilio and DocuSign)', demo: 'Simulated in the browser', pilot: 'Reading 1–2 systems through an API or a read-only database replica. There are no standard connectors for Salesforce, SAP or iCare', origin: 'piloto' },
      { aspect: 'Alarm trigger', demo: 'When the BMW X3 stock alarm is opened', pilot: 'Webhook from Odoo or iCare, or periodic polling (cron): Agentic Platform has no agent scheduler of its own', origin: 'piloto' },
      { aspect: 'Language model', demo: 'No calls: the answers are prepared', pilot: 'The one Autopista Multimotor chooses (Azure OpenAI, Gemini or local), through the Agentic Platform gateway', origin: 'serie' },
      { aspect: 'Human approval', demo: 'Approval cards; rejecting applies nothing', pilot: 'The same, with SSO and role permissions. Nothing is written to SAP in the pilot: drafts and tickets approved by a person', origin: 'serie' },
      { aspect: 'Procedures with citations', demo: '4 synthetic documents (PROC-VENTA-001, PROC-ALQUILER-001, PROC-SUSCRIPCION-001 and PROC-TALLER-001)', pilot: 'Your current procedures, with per-realm permissions; target ≥90 % correct citations', origin: 'serie' },
      { aspect: 'Audit log', demo: 'For this session, stored in the browser and exportable to JSON or CSV', pilot: 'In the Agentic Platform database, append-only, with each person’s SSO identity; exportable to CSV', origin: 'serie' },
      { aspect: 'Cost per request', demo: 'Estimate shown at the end of each run', pilot: 'Measured per request in USD, by realm and by use case, with daily and monthly budget', origin: 'serie' },
      { aspect: 'Data and actions', demo: 'Synthetic and mutually consistent, prepared by MFM; actions never leave the browser', pilot: 'Your data in read mode and 20–30 historical cases, anonymised if needed', origin: 'datos' }
    ],
    writes: 'None in SAP during the pilot: drafts and tickets approved by a person',
    cases: {
      A: {
        label: 'Use case A', short: 'Use case A · Customer complaint', title: 'Customer complaint: contract, APR and reply',
        systems: ['Salesforce CRM', 'SAP ERP', 'Odoo Inventory'], systemsText: 'Salesforce CRM and SAP ERP',
        trigger: 'Incoming email in the Customer Care mailbox (Gmail)',
        output: 'Complaint summary, contract and invoice cross-checked, draft reply and a credit proposal, for approval',
        scene: 'reclamacion', sceneLabel: 'APR dispute',
        accuracy: '≥90 % of 30 historical complaints correctly extracted (vehicle, contract, amount and deadline)',
        accuracyHow: 'Comparison with the Customer Care record in Salesforce'
      },
      B: {
        label: 'Use case B', short: 'Use case B · Critical stock and workshop', title: 'Critical stock and overloaded workshop: reservation, rescheduling and alert',
        systems: ['Odoo Inventory', 'iCare Workshop'], systemsText: 'Odoo Inventory stock and iCare Workshop loads',
        trigger: 'Odoo or iCare alert via webhook or periodic polling (cron)',
        output: 'Affected units and appointments, reservation and rescheduling proposal for approval, draft SMS and Slack alert',
        scene: 'alarma', sceneLabel: 'Stock and workshop alarm',
        accuracy: '100 % of affected units and appointments identified in 20 scenarios',
        accuracyHow: 'Comparison with the Odoo movements and iCare orders of each scenario'
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
      sub: 'One use case, one hub (Madrid), one realm (Operations) and 5–10 users, on your infrastructure and with your model',
      after: 'After the pilot: brand recall tracking across the whole fleet (measurable in the November VW Golf campaign) or workshop planning connected to iCare.',
      nextTitle: 'Next step: 2-hour workshop with Operations and IT',
      nextBody: 'To choose the use case, confirm read access and set the baseline the pilot will be measured against.'
    },
    calc: {
      fteHours: 1720,
      note: 'Hours of repetitive work that Operations, shift supervisors and the workshop can devote to other tasks.',
      rows: [
        { id: 'reclamacion', label: 'Customer complaint: contract, APR and reply', who: 'Customer Care and Finance', scene: 'reclamacion', seen: 'APR dispute', n: 12, before: 120, after: 30, basis: 'Summary, contract, invoice, reply and credit proposal' },
        { id: 'excursion', label: 'Critical stock and overloaded workshop: reservation and rescheduling', who: 'Operations Manager', scene: 'alarma', seen: 'Stock and workshop alarm', n: 8, before: 90, after: 15, basis: 'Units, affected appointments, reservation and alert' },
        { id: 'cuestionario', label: 'Customer questionnaire or tender', who: 'Operations', scene: 'cuestionario', seen: 'Customer questionnaire', n: 6, before: 150, after: 50, basis: 'With citations from procedures, contracts and specification sheets' },
        { id: 'traza', label: 'Vehicle trace or recall campaign', who: 'Workshop Manager', scene: 'retirada', seen: 'VW Golf recall (ABS)', n: 3, before: 180, after: 30, basis: 'Units by VIN, service status and appointments' },
        { id: 'consultas', label: 'Questions on procedures', who: 'Sales, rental, subscriptions and workshop', scene: 'procedimientos', seen: 'Procedures', n: 60, before: 10, after: 3, basis: 'Search in the current procedures' },
        { id: 'parte', label: 'Shift report', who: 'Operations Manager', scene: 'turno', seen: 'Shift summary', n: 22, before: 30, after: 10, basis: '1 report × 22 days' }
      ]
    },
    auditEmpty: 'Generate the shift report, publish a workflow or approve a reservation: each step will appear here with its time, actor and view.',
    auditPilot: 'The log lives in the Agentic Platform database, identifies each person by their SSO, can be filtered by person, action and date, and is exported to CSV. In this demo it lives in this browser and is cleared with "Reset demo".',
    proposal: {
      code: 'PIL-APM-2026-01',
      filename: 'agentic-pilot-proposal-autopista',
      objective: 'To measure, with a real use case and signed-off criteria, how much Operations time Agentic Platform frees up and with what accuracy, without changing Salesforce, SAP, Odoo Inventory, iCare Workshop, Stripe, Twilio or DocuSign. Agentic Platform reads from those systems, reasons with the procedures and proposes; a person approves before anything is written.',
      extraArch: [['Masking', 'Personal data masked before the model; ID card (DNI, NIE) and IBAN formats are added in the pilot']],
      compliance: [
        ['Consumer credit and APR', 'Agentic Platform cross-checks contract and invoice and prepares the reply; the decision on the Banco Sabadell financing is made by Finance'],
        ['Manufacturer recall campaigns', 'Recalls (VW, BMW, Audi and Skoda) stay in each brand’s channels; Agentic Platform matches the fleet VINs, reads and alerts'],
        ['Commercial decisions', 'Reservations, credits and contracts are approved by the owner; Stripe and SAP are read-only in the pilot'],
        ['GDPR', 'MFM as data processor; the gateway masks personal data before the model']
      ],
      signatures: [{ role: 'decider', note: 'Agrees with the scope and criteria' }, { role: 'IT · Autopista Multimotor', note: 'Agrees with the access and the deployment' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform replaces nothing: it sits on top of Salesforce, SAP, Odoo, iCare, Stripe, Twilio and DocuSign. It reads, reasons with your procedures and proposes; before writing to a system, a person approves.',
        'It runs on your infrastructure, with your Google Workspace SSO and the model you choose. With a local model, inference stays on your network; IT validates the other flows.',
        'The dashed amber lines are the only writes, and always after approval. Stripe is read-only: no money is moved.'
      ],
      piloto: [
        'To be honest: today’s data is synthetic and the demo does not call any model. Standard in Agentic Platform: Routines, human approval, audit, answers with citations and cost per request.',
        'Built for this demo: the workflow generator and the Autopista Multimotor agents. Salesforce, SAP or iCare connectors do not exist as standard: they are built in the pilot, in read mode.',
        '6–8 week pilot: one use case, the Madrid hub, Operations realm, 5–10 users. The acceptance criteria are signed off in week 1 and measured in week 8.'
      ],
      horas: [
        'Ask how many complaints, questionnaires or stock alerts they handle a month and enter them: the calculator is theirs.',
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
      'Agentic Platform sits on top of Salesforce, SAP, Odoo, iCare, Stripe, Twilio and DocuSign: it reads, prepares proposals and a person approves before anything is written.',
      'With a local model, inference runs inside your infrastructure; the other flows are validated with IT.',
      'Today’s use cases, from the BMW X3 stock alarm to the APR dispute and the VW Golf recall, and what is standard in Agentic Platform, what was built for this demo and what is built in the pilot.',
      '6–8 week pilot: one use case, the Madrid hub, Operations realm and acceptance criteria signed off in week 1.',
      'Hours freed up with editable assumptions; the real baseline is measured in the pilot.',
      'Everything done in the session is kept in the audit log: human decisions, agent steps and export.'
    ]
  }
});
