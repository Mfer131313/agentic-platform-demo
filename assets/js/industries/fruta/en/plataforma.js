/* Subtropicales Axarquía · "How Agentic Platform fits" (English): architecture, demo versus pilot, hours calculator,
 * IT questions and audit log. Demo scenario with synthetic data (MFM). */
agenticPackEn('fruta', {
  plataforma: {
    nav: 'How it fits at SAX',
    title: 'How it fits at Subtropicales Axarquía',
    actor: 'decider',
    site: { kind: 'Hub', name: 'Axarquía Packing Centre (Málaga)', realm: 'Operations and Quality' },
    pageMeta: [
      { icon: 'building', text: 'Axarquía packing and processing centre' },
      { icon: 'server', text: 'Installed on your infrastructure' },
      { icon: 'user-check', text: 'Human approval before updates' }
    ],
    kpis: [
      { label: 'Proposed pilot', value: '6–8', unit: 'weeks', sub: '1 use case · Axarquía Packing Centre · Operations and Quality realm', icon: 'calendar' },
      { label: 'Systems connected in the pilot', value: '1–2', unit: 'read-only', sub: 'Through an API or a database replica', icon: 'database' },
      { label: 'Pilot users', value: '5–10', sub: 'SSO with Microsoft Entra ID', icon: 'users' }
    ],
    arch: {
      title: 'Reference architecture at the Axarquía Packing Centre',
      sso: 'SSO access · Microsoft Entra ID',
      ssoShort: 'Microsoft Entra ID SSO',
      console: 'Web console and alerts in Teams',
      consoleShort: 'Web console and Teams'
    },
    deploy: {
      cpd: { seg: 'Own data centre', label: 'Own data centre · virtual machine with Docker Compose', zone: 'SAX data centre · VM with Docker Compose', text: 'A virtual machine in your data centre with Docker Compose: application, Postgres database and Qdrant vector store.' },
      k8s: { seg: 'Kubernetes', label: 'Kubernetes · Helm', zone: 'SAX Kubernetes cluster · Helm', text: 'Helm deployment on your Kubernetes cluster: application, Postgres database and Qdrant vector store.' },
      cloud: { seg: 'Own cloud', label: 'SAX cloud (Azure, AWS or GCP)', zone: 'SAX cloud subscription (Azure, AWS or GCP)', text: 'The same installation in your cloud subscription, in the region you choose.' }
    },
    llm: {
      azure: { seg: 'Azure OpenAI', name: 'Azure OpenAI', local: false, place: 'EU region, under the SAX contract', exit: 'Only the text of each request leaves your network', note: 'Connected through the Agentic Platform LiteLLM gateway; confirmed in weeks 1–2.' },
      gemini: { seg: 'Gemini', name: 'Google Gemini', local: false, place: 'With the account and region contracted by SAX', exit: 'Only the text of each request leaves your network', note: 'Provider included as standard in the Agentic Platform model catalogue.' },
      local: { seg: 'Local model', name: 'Local model', local: true, place: 'GPU server in your data centre (Ollama, LM Studio or llama.cpp)', exit: 'Inference runs inside your network', note: 'Quality and speed are sized to your server. IT also reviews the connector and telemetry flows.' }
    },
    people: ['decider', 'reception_shift', 'ripening_shift', 'qa_shift', 'lab_shift', 'customer_care'],
    peopleShort: ['Operations and Quality Manager', 'Reception and Field Manager', 'Ripening and Cold Chain', 'Quality and Food Safety', 'Laboratory Manager', 'Customer Care'],
    modules: [
      { icon: 'workflow', title: 'Workflows (Routines)', text: 'Visual editor, versions and dry run' },
      { icon: 'cpu', title: 'Operations and quality agents', text: 'Quality, ripening and cold chain, laboratory, traceability, complaints and shift report', agents: true },
      { icon: 'user-check', title: 'Human approval', text: 'Nothing is written to a system without its owner', approval: true },
      { icon: 'book-open', title: 'Procedures with citations', text: 'Every answer links its source; without a source, it says so' },
      { icon: 'history', title: 'Audit log', text: 'Append-only and exportable' },
      { icon: 'key', title: 'Permissions by role and realm', text: 'Each area sees its own data' },
      { icon: 'gauge', title: 'Cost per request', text: 'USD estimate and budget per realm' },
      { icon: 'shield', title: 'Model gateway', text: 'Masks personal data before the model', gateway: true }
    ],
    tiles: [
      { name: 'SAP S/4HANA', icon: 'database', text: 'Reads batches, orders, delivery notes and quality (QM). Proposes batch holds and shipment holds for approval.', write: true },
      { name: 'Field traceability', icon: 'factory', text: 'Reads plots, growers, fruit intakes and receiving batches. Does not write.', write: false },
      { name: 'LIMS and WMS', icon: 'flask', text: 'Reads assays and residues by batch (LIMS) and pallets and cold-room locations (WMS). Does not write.', write: false },
      { name: 'Online shop', icon: 'users', text: 'Reads orders, customers and complaints (PrestaShop). Prepares notices and replies for approval.', write: true }
    ],
    decisions: {
      deploy: ['It does not depend on MFM cloud services. Your IT team or a managed service runs it.'],
      llm: 'The model is changed through configuration, without touching the workflows; OpenAI or AWS Bedrock in the EU are also supported.',
      access: [
        'SSO with Microsoft Entra ID (OIDC) or SAML 2.0. Permissions by role and realm: the "Operations and Quality" realm only sees its own procedures and data.',
        'The gateway masks personal data before calling the model; ID card (DNI, NIE) and IBAN formats are added in the pilot.'
      ],
      hitl: 'Holding a batch in SAP QM, holding a shipment, sending a notice to a customer or a notification to the authority requires approval by the owner. Rejecting applies nothing and is logged with the reason.',
      cost: 'The per-realm budget separates the spend of each area (Quality, Ripening and Cold Chain, Laboratory and Customer Care).',
      limits: [
        'It does not replace SAP S/4HANA, field traceability, the LIMS, the WMS or the online shop.',
        'It does not release or hold batches on its own: the Quality and Food Safety Manager decides.',
        'It does not notify authorities or customers without human approval.',
        'It does not assign tasks or assess people: it works with batches, assays, orders and documents.'
      ]
    },
    faqTitle: 'Common questions from IT',
    faqSub: 'Short answers for the conversation with the technical team',
    faq: [
      { topic: 'Integration', q: 'Where is it installed?', a: 'On a virtual machine in your data centre with Docker Compose, on Kubernetes with Helm, or in your cloud subscription. It does not depend on MFM cloud services.' },
      { topic: 'Security', q: 'How do users sign in?', a: 'With Microsoft Entra ID SSO (OIDC) or SAML 2.0, with alerts in Teams. Permissions are by role and by realm (area or department).' },
      { topic: 'Data', q: 'What data leaves our network?', a: 'With a local model, inference runs on your network. With an external one, the content sent and the contract are reviewed. Connector, telemetry and masking flows are validated with IT.' },
      { topic: 'Integration', q: 'Are there connectors for SAP S/4HANA, field traceability, LIMS, WMS or the online shop?', a: 'Not as standard. In the pilot they are built for 1–2 systems, through an API or a read-only database replica; reading Postgres databases already works.' },
      { topic: 'Scale', q: 'How many users does it support?', a: 'Concurrency is sized and verified with load tests. Each realm has limits on requests per minute, tokens per day and budget.' },
      { topic: 'Language', q: 'What language does it work in?', a: 'Chat and agents in Spanish; replies to customers in their own language (important with sales in Spain, France and Germany). The Agentic Platform administration console is in English.' },
      { topic: 'Cost', q: 'Licence and price?', a: 'They are set out in the commercial proposal (SOW).' }
    ],
    seen: [
      { scene: 'turno', label: 'Shift summary', icon: 'activity', title: 'Morning shift summary: Axarquía Packing Centre', text: '38 fruit trucks received, 214 online orders to serve and 3 critical, with the status of Fruit receiving, Ripening and cold chain, Packing, Processing, Online shop and Dispatch; the agent prepares the report and leaves it for review.', agents: ['Shift report'], approver: 'decider', outcome: 'parte' },
      { scene: 'workflow', label: 'From words to workflow', icon: 'workflow', title: 'Written procedure → quality workflow', text: 'Procedure PR-CAL-004 on MRLs and residue analysis becomes a workflow with receiving, sampling, the LIMS result and batch hold, with approval and a dry run.', agents: ['Workflow generator'], approver: 'qa_shift' },
      { scene: 'alarma', label: 'Cold-chain alarm', icon: 'alert-triangle', title: 'Temperature deviation in room CM-06 (batch AH-2611-118)', text: 'At 05:50 alarm ALM-FRIO-0612 shows 11.4 °C against a 6.0 °C setpoint since 03:40 (compressor failure): 9 pallets of Hass avocado size 18 (14 t) intended for 3 supermarket orders and today\'s online orders; a batch hold, transfer to CM-02, work order and shipment reassignment proposal for approval.', agents: ['Quality', 'Maintenance', 'Logistics and orders'], approver: 'qa_shift', outcome: 'alarma' },
      { scene: 'reclamacion', label: 'Complaint CLM-2026-1120', icon: 'mail', title: '35 % of pieces hard in order PED-2026-44718', text: 'Supermercados Levante Fresh, S.A. complains by email that 35 % of the ready-to-eat avocado (batch AH-2611-092) arrives hard in 4 stores: batch, ripening record, laboratory results, draft reply and 8D plan for approval (acknowledgement in 24 h, report in 10 working days).', agents: ['Customer complaints', 'Batch traceability'], approver: 'qa_shift', outcome: 'reclamacion' },
      { scene: 'retirada', label: 'Drill RET-2026-1120', icon: 'git-branch', title: 'Recall drill: from MG-2611-KE-031 to 11 customers and 640 online orders', text: 'Campaign RET-2026-1120 follows the Keitt mango batch, 3 packing batches, shipments to 11 customers in 3 countries (Spain, France and Germany) and 640 online shop orders; a balance of 18 t = 6 t in the warehouse + 12 t shipped, with the goal of informing the authority and customers within 4 h (Regulation (EC) 178/2002, art. 19).', agents: ['Batch traceability', 'Recalls'], approver: 'qa_shift', outcome: 'retirada' },
      { scene: 'cuestionario', label: 'Questionnaire CUE-2026-063', icon: 'list-checks', title: 'Handelsgruppe Nordfrisch questionnaire answered with citations', text: 'The fruit supplier audit questionnaire (GLOBALG.A.P., GRASP, IFS Food, traceability, MRLs and residue plan, water, ESG and footprint, recall plan, allergens in processing, pest control), answered with citations from procedures; questions without evidence are left for the owner.', agents: ['Customer questionnaires'], approver: 'qa_shift', outcome: 'cuestionario' },
      { scene: 'procedimientos', label: 'Procedures', icon: 'book-open', title: 'Questions with citations', text: 'Receiving and sampling, controlled ripening, MRLs, traceability and recall, processing and HACCP, online orders and export: every answer links the current section (PR-REC-001, PR-MAD-002, PR-CAL-004, PR-TRZ-003, PR-PRO-005, PR-ECO-002 and PR-EXP-004) and, if there is no source, says so.', agents: ['Procedures'] }
    ],
    honesty: [
      { aspect: 'Console, workflows (Routines) and editor', demo: 'This console, in the browser, with the workflows published in the session', pilot: 'Agentic Platform installed on your infrastructure; Routines with visual editor, versions and dry run', origin: 'serie' },
      { aspect: 'Workflow from a written procedure', demo: 'Simulated generator in the browser, with three templates', pilot: 'Integrated into Agentic Platform and validated with your procedures; each workflow is reviewed before publishing', origin: 'demo' },
      { aspect: 'SAX agents', demo: 'Quality, maintenance, logistics and orders, batch traceability, recalls, complaints and shift report, on synthetic data', pilot: 'Those of the chosen use case, adapted to your data and procedures', origin: 'demo' },
      { aspect: 'Connectors (SAP S/4HANA, field traceability, LIMS, WMS and online shop)', demo: 'Simulated in the browser', pilot: 'Reading 1–2 systems through an API or a read-only database replica. There are no standard connectors for SAP, LIMS or WMS', origin: 'piloto' },
      { aspect: 'Alarm trigger', demo: 'When the cold-chain alarm ALM-FRIO-0612 for room CM-06 is opened', pilot: 'Webhook from the room control system or SAP, or periodic polling (cron): Agentic Platform has no agent scheduler of its own', origin: 'piloto' },
      { aspect: 'Language model', demo: 'No calls: the answers are prepared', pilot: 'The one SAX chooses (Azure OpenAI, Gemini or local), through the Agentic Platform gateway', origin: 'serie' },
      { aspect: 'Human approval', demo: 'Approval cards; rejecting applies nothing', pilot: 'The same, with SSO and role permissions. Nothing is written to SAP in the pilot: drafts and tickets approved by a person', origin: 'serie' },
      { aspect: 'Procedures with citations', demo: '7 synthetic documents (PR-REC-001, PR-MAD-002, PR-CAL-004, PR-TRZ-003, PR-PRO-005, PR-ECO-002 and PR-EXP-004)', pilot: 'Your current procedures, with per-realm permissions; target ≥90 % correct citations', origin: 'serie' },
      { aspect: 'Audit log', demo: 'For this session, stored in the browser and exportable to JSON or CSV', pilot: 'In the Agentic Platform database, append-only, with each person SSO identity; exportable to CSV', origin: 'serie' },
      { aspect: 'Cost per request', demo: 'Estimate shown at the end of each run', pilot: 'Measured per request in USD, by realm and by use case, with daily and monthly budget', origin: 'serie' },
      { aspect: 'Data and actions', demo: 'Synthetic and mutually consistent, prepared by MFM; actions never leave the browser', pilot: 'Your data in read mode and 20–30 historical cases, anonymised if needed', origin: 'datos' }
    ],
    writes: 'None in SAP during the pilot: drafts and tickets approved by a person',
    cases: {
      A: {
        label: 'Use case A', short: 'Use case A · Customer complaint', title: 'Customer complaint: batch, ripening and 8D reply',
        systems: ['Online shop', 'SAP S/4HANA', 'LIMS and WMS'], systemsText: 'online shop, SAP S/4HANA, LIMS and WMS',
        trigger: 'Incoming email in the Customer Care mailbox (Outlook)',
        output: 'Complaint CLM-2026-1120 summary, batch and ripening record cross-checked, draft reply and 8D plan, for approval',
        scene: 'reclamacion', sceneLabel: 'Complaint CLM-2026-1120',
        accuracy: '≥90 % of 30 historical complaints correctly extracted (customer, batch, defect and deadline)',
        accuracyHow: 'Comparison with the complaint record and SAP QM'
      },
      B: {
        label: 'Use case B', short: 'Use case B · Cold-chain alarm and recall', title: 'Cold-chain deviation and residues: hold, transfer and traceability',
        systems: ['LIMS and WMS', 'SAP S/4HANA', 'Field traceability'], systemsText: 'WMS, LIMS, SAP S/4HANA batches and field traceability',
        trigger: 'Temperature alarm or LIMS result via webhook or periodic polling (cron)',
        output: 'Affected pallets, batches and shipments, hold and transfer proposal for approval, customer notice and authority notification as drafts',
        scene: 'alarma', sceneLabel: 'Cold-chain alarm ALM-FRIO-0612',
        accuracy: '100 % of affected pallets, batches, shipments and customers identified in 20 scenarios',
        accuracyHow: 'Comparison with the WMS locations and SAP shipments of each scenario'
      }
    },
    phases: [
      { from: 1, to: 2, title: 'Access, installation and baseline', detail: 'Read access, installation and measurement of current time', result: 'Criteria signed off and baseline measured' },
      { from: 3, to: 5, title: 'Connectors, agents and workflow', detail: 'Tests with 20–30 historical cases', result: 'Accuracy measured on historical cases' },
      { from: 6, to: 7, title: 'Parallel use', detail: 'Real cases, with the current process as fallback', result: 'Acceptance of the drafts by Operations and Quality' },
      { from: 8, to: 8, title: 'Evaluation and decision', detail: 'Measured criteria and final report', result: 'Final report and decision' }
    ],
    criteria: [
      { name: 'Time', target: 'Reply and draft in under 15 min', how: 'Timed against the baseline from weeks 1–2' },
      { name: 'Usefulness', target: 'Quality accepts the draft with minor edits in ≥70 % of cases', how: 'Review of each draft by Quality' },
      { name: 'Citations', target: '≥90 % of 50 reference questions with the correct citation', how: 'Evaluation tool included in Agentic Platform' },
      { name: 'Control', target: 'No action without approval; 100 % in the audit log', how: 'Review of the exported log' },
      { name: 'Cost', target: 'Model cost per case measured and within the realm budget', how: 'Cost report per realm (USD, estimate)' }
    ],
    gives: {
      client: ['Operations and Quality owner and IT contact', 'Read access to 1–2 systems', '20–30 historical cases, anonymised if needed', 'Current procedures', '2–3 h a week from Quality'],
      mfm: ['Installation on your infrastructure', 'Read connectors', 'Agents and workflow for the use case', 'User training', 'Final report with the measured criteria']
    },
    pilot: {
      sub: 'One use case, the Axarquía Packing Centre, one realm (Operations and Quality) and 5–10 users, on your infrastructure and with your model',
      after: 'After the pilot: batch traceability across all fruit received (measurable in a recall drill such as RET-2026-1120) or customer questionnaires connected to the quality documentation.',
      nextTitle: 'Next step: 2-hour workshop with Operations, Quality and IT',
      nextBody: 'To choose the use case, confirm read access and set the baseline the pilot will be measured against.'
    },
    calc: {
      fteHours: 1720,
      note: 'Hours of repetitive work that Quality, Laboratory, Ripening and Customer Care can devote to other tasks.',
      rows: [
        { id: 'reclamacion', label: 'Customer complaint: batch, ripening and 8D reply', who: 'Quality and Customer Care', scene: 'reclamacion', seen: 'Complaint CLM-2026-1120', n: 10, before: 180, after: 45, basis: 'Summary, batch, ripening record, reply and 8D plan' },
        { id: 'excursion', label: 'Cold-chain alarm: hold, transfer and notice', who: 'Quality and Food Safety Manager', scene: 'alarma', seen: 'Cold-chain alarm ALM-FRIO-0612', n: 2, before: 240, after: 45, basis: 'Affected pallets, SAP QM hold, transfer to CM-02 and customer notice' },
        { id: 'cuestionario', label: 'Customer audit questionnaire', who: 'Quality and Food Safety', scene: 'cuestionario', seen: 'Questionnaire CUE-2026-063', n: 5, before: 240, after: 70, basis: 'With citations from procedures and certificates' },
        { id: 'traza', label: 'Batch trace or recall drill', who: 'Quality and Dispatch', scene: 'retirada', seen: 'Drill RET-2026-1120', n: 3, before: 300, after: 40, basis: 'Receiving batch, packing batches, shipments, online orders and tonnage balance' },
        { id: 'consultas', label: 'Questions on procedures', who: 'Reception, Ripening, Laboratory, Quality and Customer Care', scene: 'procedimientos', seen: 'Procedures', n: 60, before: 10, after: 3, basis: 'Search in the current procedures' },
        { id: 'parte', label: 'Shift report', who: 'Operations and Quality Manager', scene: 'turno', seen: 'Shift summary', n: 22, before: 30, after: 10, basis: '1 report × 22 days' }
      ]
    },
    auditEmpty: 'Generate the shift report, publish a workflow or approve a batch hold: each step will appear here with its time, actor and view.',
    auditPilot: 'The log lives in the Agentic Platform database, identifies each person by their SSO, can be filtered by person, action and date, and is exported to CSV. In this demo it lives in this browser and is cleared with "Reset demo".',
    proposal: {
      code: 'PIL-SAX-2026-01',
      filename: 'agentic-pilot-proposal-sax',
      objective: 'To measure, with a real use case and signed-off criteria, how much Quality and Operations time Agentic Platform frees up and with what accuracy, without changing SAP S/4HANA, field traceability, the LIMS, the WMS or the online shop. Agentic Platform reads from those systems, reasons with the procedures and proposes; a person approves before anything is written.',
      extraArch: [['Masking', 'Personal data masked before the model; ID card (DNI, NIE) and IBAN formats are added in the pilot']],
      compliance: [
        ['Food safety', 'Agentic Platform cross-checks batches, results and procedures (HACCP, GLOBALG.A.P., GRASP, IFS Food, Regulation (EC) 396/2005 on MRLs; certifications cited as reference) and prepares drafts; the decision is made by the Quality and Food Safety Manager'],
        ['Recall and notification', 'Notification to the competent authority (Regulation (EC) 178/2002, art. 19) is approved and sent by a person; Agentic Platform prepares the draft and the batch balance'],
        ['Quality decisions', 'Holds, releases and customer notices are approved by the owner; SAP, field traceability, the LIMS and the WMS are read-only in the pilot'],
        ['GDPR', 'MFM as data processor; the gateway masks personal data before the model']
      ],
      signatures: [{ role: 'decider', note: 'Agrees with the scope and criteria' }, { role: 'IT · SAX', note: 'Agrees with the access and the deployment' }]
    },
    presenter: {
      arquitectura: [
        'Agentic Platform replaces nothing: it sits on top of SAP S/4HANA, field traceability, the LIMS, the WMS and the online shop. It reads, reasons with your procedures and proposes; before writing to a system, a person approves.',
        'It runs on your infrastructure, with your Microsoft Entra ID SSO and the model you choose. With a local model, inference stays on your network; IT validates the other flows.',
        'The dashed amber lines are the only writes, and always after approval. Field traceability, the LIMS and the WMS are read-only.'
      ],
      piloto: [
        'To be honest: today data is synthetic and the demo does not call any model. Standard in Agentic Platform: Routines, human approval, audit, answers with citations and cost per request.',
        'Built for this demo: the workflow generator and the SAX agents. SAP, LIMS or WMS connectors do not exist as standard: they are built in the pilot, in read mode.',
        '6–8 week pilot: one use case, the Axarquía Packing Centre, Operations and Quality realm, 5–10 users. The acceptance criteria are signed off in week 1 and measured in week 8.'
      ],
      horas: [
        'Ask how many complaints, questionnaires or cold-chain alarms they handle a month and enter them: the calculator is theirs.',
        '"With Agentic Platform" includes review and approval by a person. These are hours of repetitive work that Quality can devote to other tasks.',
        'These are assumptions for discussion: the real baseline is measured in weeks 1–2 of the pilot.'
      ],
      registro: [
        'Everything we have done today is here: {n}, by people and by agents, with time, actor and view.',
        'Filter by "Decisions": every approval and every rejection, with its reason. Nothing is edited or deleted from the console; it is exported to JSON or CSV.',
        'Close: we propose a 2-hour workshop with Operations, Quality and IT to choose the use case and set the baseline.'
      ],
      next: {
        arquitectura: 'Click "Local model" to show the model moving into their network; then the "Demo and pilot" tab.',
        piloto: 'Choose use case A or B with them and open the "Hours calculator" tab.',
        horas: 'Enter their monthly cases and open "Audit log" to close.',
        registro: 'Click "Download pilot proposal (PDF)" and propose a date for the 2-hour workshop.'
      }
    },
    tour: [
      'Agentic Platform sits on top of SAP S/4HANA, field traceability, the LIMS, the WMS and the online shop: it reads, prepares proposals and a person approves before anything is written.',
      'With a local model, inference runs inside your infrastructure; the other flows are validated with IT.',
      'Today use cases, from cold-chain alarm ALM-FRIO-0612 to complaint CLM-2026-1120 and the RET-2026-1120 drill, and what is standard in Agentic Platform, what was built for this demo and what is built in the pilot.',
      '6–8 week pilot: one use case, the Axarquía Packing Centre, Operations and Quality realm and acceptance criteria signed off in week 1.',
      'Hours freed up with editable assumptions; the real baseline is measured in the pilot.',
      'Everything done in the session is kept in the audit log: human decisions, agent steps and export.'
    ]
  }
});
