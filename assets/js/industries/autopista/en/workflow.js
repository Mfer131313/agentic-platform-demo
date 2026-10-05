agenticPackEn('autopista', {
  workflow: {
    nav: 'Sales Workflow Example',
    title: 'Workflow Orchestration: Request → Contract',
    icon: 'flow',
    page_title: 'Autopista Multimotor · Workflow',
    input: 'Looking for an automatic Seat Ibiza mid-range, financed with 20k€ down payment, for use in Madrid.',
    description: 'How Agentic Platform converts text requests into structured sales orders.',
    summary: 'Customer request parsed → 3 inventory candidates found (Seat Ibiza automatic, €64-65k) → Financing pre-approved (APR 3.99%, 60 months) → Contract drafted → Signature pending.',
    status: 'in-progress',
    scenario: 'Customer calls contact center: "Looking for an automatic Seat Ibiza mid-range, financed with 20k€ down payment, for use in Madrid." Platform extracts entities (brand, model, transmission, price, city), generates inventory search plan (filter: Seat Ibiza, automatic, price ≤ €65k, stock in Madrid), proposes high-margin alternatives, and drafts contract with pre-approved financing.',
    steps: [
      { step: 1, action: 'Request Capture', input: 'Free text via chat or SMS', output: 'Extracted entities: {brand: Seat, model: Ibiza, transmission: automatic, financing: 80%, down_payment: 20000, location: Madrid}' },
      { step: 2, action: 'Inventory Search', input: 'Structured filters', output: 'Candidates: VIN-2026-MAD-SEAT-03 (€64,500), VIN-2026-BCN-SEAT-15 (€65,200, Barcelona stock)' },
      { step: 3, action: 'Financing Approval', input: 'Customer data + vehicle', output: 'Pre-approval: APR 3.99%, monthly payment €324, 60-month term. Document: HIPOTECA-2026-18472' },
      { step: 4, action: 'Proposal Drafting', input: 'Entities + financing', output: 'Contract PDF draft sent to customer by email and SMS. Includes: vehicle description, price, monthly payment, recommended insurance.' },
      { step: 5, action: 'Customer Approval', input: 'Digital e-signature', output: 'Contract signed. SAP Status: "Order Confirmed". Reference: PED-2026-0847.' },
      { step: 6, action: 'Invoice Generation', input: 'Contract + financing data', output: 'Invoice issued. Delivery scheduled. Customer confirmation email.' }
    ],
    key_integrations: ['Salesforce (CRM)', 'SAP (ERP + financing)', 'Twilio (SMS)', 'Stripe (initial payments)', 'DocuSign (signatures)'],
    approval_gates: [
      { gate: 'Financing Approval', owned_by: 'Finance Manager', escalation: '> €70,000' },
      { gate: 'Contract Review', owned_by: 'Legal Advisor', escalation: 'VIP Customer or special terms' }
    ],
    chart: {
      title: 'Workflow orchestration: request to signature',
      sub: 'Customer: José María López · Seat Ibiza €64,500 · Down payment €20,000 · Term 60 months',
      workflow_stages: [
        { stage: 'Capture', status: 'done', detail: 'NLP extracts: Seat Ibiza, automatic, €20k down, Madrid' },
        { stage: 'Inventory', status: 'done', detail: '3 candidates located (Madrid + Barcelona)' },
        { stage: 'Finance', status: 'done', detail: 'Banco Sabadell pre-approval: APR 3.99%, €324/month' },
        { stage: 'Contract', status: 'done', detail: 'PDF draft sent via email + SMS' },
        { stage: 'Signature', status: 'in-progress', detail: 'DocuSign e-signature awaiting customer' },
        { stage: 'Delivery', status: 'pending', detail: 'Invoice generation + logistics coordination' }
      ]
    },
    event_kv: [
      ['Customer', 'José María López · Madrid · Down payment €20,000 budget'],
      ['Vehicle', 'Seat Ibiza automatic · VIN-2026-MAD-SEAT-03 · €64,500'],
      ['Finance', 'Banco Sabadell · 60 months · €324/month · APR 3.99%'],
      ['Integrations', 'Salesforce + SAP + Twilio + Stripe + DocuSign']
    ]
  }
});
