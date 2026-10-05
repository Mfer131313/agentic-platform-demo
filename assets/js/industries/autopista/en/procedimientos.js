(function () {
  'use strict';

  const PROCEDURES = [
    {
      id: 'PROC-VENTA-001',
      name: 'Direct Vehicle Sales',
      owner: 'Sales Manager',
      description: 'Complete sales process from initial inquiry to delivery and registration',
      steps: [
        { step: 1, action: 'Customer Contact', details: 'Receive inquiry (in-person, call, email, chat), register in Salesforce CRM' },
        { step: 2, action: 'Vehicle Advisory', details: 'Present available options, technical specs, financing alternatives' },
        { step: 3, action: 'Test Drive', details: 'Schedule test drive (30-45min), complete test authorization' },
        { step: 4, action: 'Negotiation & Quote', details: 'Present written quote, check SAP brand margins, get initial approval' },
        { step: 5, action: 'Financing Request', details: 'Collect customer documents, send to bank, await pre-approval (24-48h)' },
        { step: 6, action: 'Contract Drafting', details: 'Generate contract draft (DocuSign), review terms, communicate exact APR' },
        { step: 7, action: 'Digital Signature', details: 'Send via DocuSign, await customer and bank signature (72h max)' },
        { step: 8, action: 'Delivery Preparation', details: 'Coordinate with workshop for final inspection, cleaning, fuel top-up' },
        { step: 9, action: 'Vehicle Delivery', details: 'Deliver keys, documentation, feature walkthrough, get conformity signature' },
        { step: 10, action: 'Registration', details: 'Book Traffic appointment, obtain plates and circulation permit (5-10 days)' }
      ],
      duration: '5-10 days',
      key_systems: ['Salesforce CRM', 'SAP ERP', 'DocuSign', 'Bank System', 'Traffic Registry'],
      success_metrics: 'Sale closed in < 10 days, customer satisfaction > 4.2/5'
    },
    {
      id: 'PROC-ALQUILER-001',
      name: 'Rental Process',
      owner: 'Rental Fleet Manager',
      description: 'Booking, delivery and return of rental vehicles from 1,000-unit fleet',
      steps: [
        { step: 1, action: 'Search and Booking', details: 'Customer searches web/app, sees real availability (Odoo), books with deposit' },
        { step: 2, action: 'Booking Confirmation', details: 'Confirmation email with itinerary, itemized rates, insurance policy' },
        { step: 3, action: 'Check-in', details: 'Customer arrives at counter, verify ID and driving license, assign vehicle' },
        { step: 4, action: 'Delivery Inspection', details: '360° photos, record fuel level and mileage in system, test lights/brakes' },
        { step: 5, action: 'Vehicle Delivery', details: 'Deliver keys, explain fuel location, emergency systems' },
        { step: 6, action: 'Usage Monitoring', details: 'Active GPS telemetry, alerts for speeding or zone violations' },
        { step: 7, action: 'Incident Management', details: 'Customer reports damage/accident via app within 24h, workshop coordination' },
        { step: 8, action: 'Vehicle Return', details: 'Customer returns on scheduled time, quick inspection, comparative photos' },
        { step: 9, action: 'Condition Assessment', details: 'Workshop verifies damage vs entry, estimates repair if needed, generates report' },
        { step: 10, action: 'Settlement', details: 'Calculate fuel/damage charges, process deposit, refund or additional invoice' }
      ],
      duration: '1-30 days (per rental duration)',
      key_systems: ['Booking Web/App', 'Odoo Inventory', 'GPS Telemetry', 'SAP Finance', 'Stripe Payments'],
      success_metrics: 'Fleet occupancy > 85%, reported damage < 5%, returns within 15min'
    },
    {
      id: 'PROC-SUSCRIPCION-001',
      name: 'Vehicle Subscription Management',
      owner: 'Subscription Manager',
      description: 'Contracts, vehicle exchanges, and included maintenance (6-month cycles)',
      steps: [
        { step: 1, action: 'Consultation & Advisory', details: 'Customer explores available catalog, filters by brand/type, monthly budget' },
        { step: 2, action: 'Vehicle Selection', details: 'Customer chooses vehicle and plan (6/12/24 months), credit validation' },
        { step: 3, action: 'Subscription Contract', details: 'Generate contract (DocuSign), detail what is included (maintenance, insurance, spare tire)' },
        { step: 4, action: 'Initial Payment', details: 'Process first monthly payment (Stripe), send receipt and payment schedule' },
        { step: 5, action: 'Vehicle Delivery', details: 'Coordinate with workshop, initial inspection, deliver keys and documentation' },
        { step: 6, action: 'Preventive Maintenance', details: 'Auto-schedule per km/months: oil change (10k km), review (20k km), MOT (12 months)' },
        { step: 7, action: 'Vehicle Exchange', details: 'At 6 months: customer can swap model/brand at no cost, return old vehicle' },
        { step: 8, action: 'Damage Management', details: 'Normal wear covered, accidents > €500 covered by customer policy' },
        { step: 9, action: 'Renewal', details: 'At cycle end: offer renewal or termination, process final payment' },
        { step: 10, action: 'Final Return', details: 'Workshop final inspection, cleaning, prepare for next customer or auction' }
      ],
      duration: '6/12/24 months',
      key_systems: ['Salesforce CRM', 'SAP Finance', 'DocuSign', 'Stripe Payments', 'iCare Workshop'],
      success_metrics: 'Retention rate > 70%, exchanges < 3 days, satisfaction > 4.4/5'
    },
    {
      id: 'PROC-TALLER-001',
      name: 'Workshop Technical Service',
      owner: 'Workshop Manager',
      description: 'Reception, diagnosis, repair and delivery of vehicles by brand',
      steps: [
        { step: 1, action: 'Vehicle Reception', details: 'Customer explains symptoms/request, record mileage, contact info in iCare' },
        { step: 2, action: 'Initial Inspection', details: 'Advisor technician inspects vehicle, notes checklist items' },
        { step: 3, action: 'Diagnosis', details: 'OBD analysis, functional tests, identify root cause' },
        { step: 4, action: 'Estimate', details: 'Generate detailed estimate (parts + labor), send to customer for approval' },
        { step: 5, action: 'Customer Approval', details: 'Customer approves by phone or app, authorizes repair and data access' },
        { step: 6, action: 'Repair Execution', details: 'Brand specialist technician executes work, logs times/materials in iCare' },
        { step: 7, action: 'Quality Control', details: 'Workshop manager reviews work, rejects if not meeting standards, adjusts' },
        { step: 8, action: 'Road Test', details: '10-20km test drive to verify correct operation' },
        { step: 9, action: 'Cleaning', details: 'Wash vehicle inside/out, tire shine, interior detail' },
        { step: 10, action: 'Delivery', details: 'Deliver vehicle, explain completed work, provide invoice and receipt' }
      ],
      duration: '1-5 days (per complexity)',
      key_systems: ['iCare Workshop', 'SAP Parts Inventory', 'OBD Diagnostics', 'Appointment System'],
      success_metrics: 'First-time correct > 95%, avg time < 2 days, satisfaction > 4.5/5'
    }
  ];

  function allProcedures() {
    return PROCEDURES.length;
  }

  function totalSteps() {
    return PROCEDURES.reduce((sum, p) => sum + p.steps.length, 0);
  }

  agenticPackEn('autopista', {
    procedimientos: {
      nav: 'Operating Procedures',
      title: 'Operating Procedures',
      icon: 'book-open',
      page_title: 'Autopista Multimotor · Procedures',
      summary: `${allProcedures()} standardized procedures: Direct Sales (10 steps, 5-10 days), Rental (10 steps, 1-30 days), Subscriptions (10 steps, 6-24 months), Workshop Service (10 steps, 1-5 days). Total ${totalSteps()} documented workflow steps across all business lines. Coverage: Salesforce CRM, SAP ERP, DocuSign, Odoo, iCare, GPS telemetry. Success metrics tracked: sales satisfaction > 4.2/5, fleet occupancy > 85%, subscription retention > 70%, workshop quality > 95%.`,
      status: 'active',
      type: 'process-documentation',
      procedures: PROCEDURES,
      chart: {
        title: 'Procedure coverage and workflow complexity',
        sub: '2026-10-07 · Autopista Multimotor',
        procedures_overview: [
          { procedure: 'Direct Sales', steps: 10, duration: '5-10 days', key_systems: 5, success_metric: 'Satisfaction > 4.2/5' },
          { procedure: 'Rental', steps: 10, duration: '1-30 days', key_systems: 5, success_metric: 'Occupancy > 85%' },
          { procedure: 'Subscriptions', steps: 10, duration: '6-24 months', key_systems: 5, success_metric: 'Retention > 70%' },
          { procedure: 'Workshop', steps: 10, duration: '1-5 days', key_systems: 4, success_metric: 'Quality > 95%' }
        ]
      },
      event_kv: [
        ['Sales Process', 'Direct Sales: 10 steps, 5-10 days, success metric: deal closure < 10 days, satisfaction > 4.2/5'],
        ['Rental Workflow', 'Rental: 10 steps, 1-30 days per rental, success metric: occupancy > 85%, damage < 5%, return punctuality'],
        ['Subscription Cycle', 'Subscriptions: 10 steps, 6-24 month contracts, success metric: retention > 70%, exchanges < 3 days'],
        ['Workshop Service', 'Workshop: 10 steps, 1-5 days per service, success metric: first-time correct > 95%, satisfaction > 4.5/5']
      ]
    }
  });
})();
