agenticPack('autopista', {
  workflow_en: {
    title: 'Request to Contract: Sales Process',
    description: 'How Agentic Platform converts text requests into structured sales orders.',
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
    ]
  }
});
