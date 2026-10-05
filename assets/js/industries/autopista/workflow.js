/* Autopista Multimotor · workflow de venta. Orquestación: consulta → búsqueda → financiación → contrato → entrega (MFM).
 * Las funciones reciben el contexto H de la escena. */
(function () {
  'use strict';

  /* Scenario: Customer call (entrada de NLP). */
  const CUSTOMER_INPUT = 'Busco un Seat Ibiza automático con 20.000 euros de entrada, en la zona de Madrid.';
  const EXTRACTED_ENTITIES = {
    brand_preference: 'Seat',
    model: 'Ibiza',
    transmission: 'automático',
    budget_down: 20000,
    location: 'Madrid',
    timeframe: 'immediate'
  };

  /* Workflow steps (etapas de orquestación). */
  const WORKFLOW_STEPS = [
    {
      step: 1,
      name: 'Capture & Entity Extract',
      status: 'completed',
      duration: '< 1 min',
      input: CUSTOMER_INPUT,
      output: EXTRACTED_ENTITIES,
      system: 'CRM + NLP',
      action: 'Procesar entrada de voz/texto, extraer intención y entities'
    },
    {
      step: 2,
      name: 'Inventory Search',
      status: 'completed',
      duration: '< 30s',
      criteria: { brand: 'Seat', model: 'Ibiza', transmission: 'auto' },
      candidates: [
        { sku: 'SEAT-IBIZA-AUTO-026-001', color: 'Blanco, año 2025', price: 18500, availability: 'in-stock' },
        { sku: 'SEAT-IBIZA-AUTO-026-002', color: 'Gris, año 2026', price: 20000, availability: 'in-stock' },
        { sku: 'SEAT-IBIZA-AUTO-026-003', color: 'Negro, año 2026', price: 21500, availability: 'in-stock' }
      ],
      system: 'SAP ERP + Odoo Inventory',
      action: 'Buscar coincidencias en inventario'
    },
    {
      step: 3,
      name: 'Financing Pre-Approval',
      status: 'completed',
      duration: '< 2 min',
      customer_profile: { income: '45000 EUR/year', credit_score: 720, existing_credit: 0 },
      approved_options: [
        { months: 60, down_payment: 20000, monthly: 340, apr: 3.99, bank: 'Banco Sabadell' },
        { months: 48, down_payment: 20000, monthly: 402, apr: 3.85, bank: 'Banco Sabadell' },
        { months: 72, down_payment: 20000, monthly: 290, apr: 4.25, bank: 'Banco Sabadell' }
      ],
      system: 'Finance System + Bank',
      action: 'Consultar pre-aprobación con banco (scoring 2-3 min)'
    },
    {
      step: 4,
      name: 'Proposal Drafting',
      status: 'completed',
      duration: '< 5 min',
      selected_vehicle: { sku: 'SEAT-IBIZA-AUTO-026-002', price: 20000 },
      selected_financing: { months: 60, monthly: 340, apr: 3.99 },
      contract_pdf: 'PED-2026-001847.pdf',
      proposal: 'Seat Ibiza gris 2026 · 20.000 EUR entrada · 60 meses a 340 EUR/mes · APR 3.99% Banco Sabadell',
      system: 'Salesforce + DocuSign',
      action: 'Generar PDF de contrato con términos y condiciones'
    },
    {
      step: 5,
      name: 'Customer Approval',
      status: 'completed',
      duration: '< 10 min',
      customer_action: 'Firma digital de contrato',
      signed_at: '2026-10-07 10:45',
      customer_name: 'José María López',
      reference: 'HIPOTECA-2026-18472',
      system: 'DocuSign + Salesforce',
      action: 'Cliente confirma y firma contrato (firma electrónica DocuSign)'
    },
    {
      step: 6,
      name: 'Invoice Generation & Delivery Scheduling',
      status: 'in-progress',
      duration: '< 15 min',
      invoice_id: 'INV-2026-001847',
      delivery_date: '2026-10-07',
      delivery_time: '10:30',
      payment_status: 'down_payment_received',
      system: 'SAP Finance + Logistics',
      action: 'Generar factura, coordinar logística, preparar vehículo para entrega'
    }
  ];

  /* Approval gates in workflow. */
  const APPROVAL_GATES = [
    { gate: 'Finance (>70k escalation)', role: 'Finance Manager', triggered: false, reason: 'Total < 70k' },
    { gate: 'Legal Review (VIP or special)', role: 'Legal', triggered: false, reason: 'Standard customer' },
    { gate: 'Compliance Check', role: 'Compliance', triggered: true, reason: 'Age verification + AML check' }
  ];

  /* Integrations en el workflow. */
  const INTEGRATIONS = [
    { service: 'Salesforce CRM', use: 'Lead capture, oportunidad, contacto cliente', status: 'active' },
    { service: 'SAP ERP', use: 'Búsqueda de inventario, validación de precio', status: 'active' },
    { service: 'Stripe', use: 'Procesamiento de entrada (20.000 EUR)', status: 'active' },
    { service: 'Banco Sabadell', use: 'Pre-aprobación, financiación 60 meses', status: 'active' },
    { service: 'DocuSign', use: 'Firma digital de contrato', status: 'active' },
    { service: 'Twilio SMS', use: 'Confirmación, notificaciones a cliente', status: 'pending' },
    { service: 'Logistics (iCare)', use: 'Preparación y entrega del vehículo', status: 'pending' }
  ];

  /* Funciones para contexto H. */
  const completedSteps = (sc) => WORKFLOW_STEPS.filter((s) => s.status === 'completed').length;
  const totalSteps = (sc) => WORKFLOW_STEPS.length;
  const progressPct = (sc) => Math.round((completedSteps(sc) / totalSteps(sc)) * 100);

  agenticPack('autopista', {
    workflow: {
      nav: 'Ejemplo: venta de Seat Ibiza',
      title: 'Workflow de venta: orquestación de sistemas',
      icon: 'flow',
      page_title: 'Autopista Multimotor · Workflow: Consulta → Venta',
      input: CUSTOMER_INPUT,
      entities: EXTRACTED_ENTITIES,
      status: 'in-progress',
      progress_pct: progressPct(),
      summary: 'Cliente solicita Seat Ibiza automático €20k entrada. Búsqueda localiza 3 candidatos. Financiación pre-aprobada (APR 3.99%, 60m a €340). Contrato firmado 10:45. Entrega en progreso (Logistics).',
      steps: WORKFLOW_STEPS,
      approval_gates: APPROVAL_GATES,
      integrations: INTEGRATIONS,
      completed: completedSteps(),
      total: totalSteps(),
      chart: {
        title: 'Orquestación de venta: Seat Ibiza',
        sub: 'Cliente: José María López · Entrada: 20.000 EUR · APR 3.99% · 60 meses',
        stages: [
          { stage: 'Capture', status: 'done', detail: 'NLP extrae: Seat Ibiza, automático, 20k down' },
          { stage: 'Inventory', status: 'done', detail: '3 candidatos encontrados en SAP + Odoo' },
          { stage: 'Finance', status: 'done', detail: 'Banco aprueba: 60m a 340 EUR/mes (APR 3.99%)' },
          { stage: 'Contract', status: 'done', detail: 'DocuSign: contrato firmado 10:45' },
          { stage: 'Delivery', status: 'in-progress', detail: 'Logistics prepara el vehículo' }
        ]
      },
      event_kv: [
        ['Cliente', 'José María López · Madrid · presupuesto 20.000 EUR entrada'],
        ['Vehículo', 'Seat Ibiza gris automático 2026 · 20.000 EUR total precio'],
        ['Financiación', 'Banco Sabadell · 60 meses · 340 EUR/mes · APR 3.99%'],
        ['Sistemas', 'Salesforce + SAP + Stripe + Banco + DocuSign + Logistics']
      ]
    }
  });
})();
