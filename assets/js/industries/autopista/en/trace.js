agenticPackEn('autopista', {
  trace: {
    nav: 'Vehicle Lifecycle Trace',
    title: 'Vehicle Traceability Dashboard',
    icon: 'route',
    page_title: 'Autopista Multimotor · Traceability',
    summary: 'Seat Ibiza 1.0 TSI €63,500 lifecycle tracking: hub arrival (15/9) → inventory (16/9) → customer inquiry (1/10) → test drive (4/10) → financing approved (5/10) → signature in progress (7/10) → delivery pending 10:30.',
    status: 'in-progress',
    title_detail: 'Vehicle Traceability: VIN-2026-MAD-SEAT-03',
    subtitle: 'Seat Ibiza 1.0 TSI · €63,500',
    type: 'vehicle-sales-lifecycle',
    timeline: [
      { date: '2026-09-15', time: '14:00', event: 'Hub Arrival', status: 'completed', detail: 'Dealership reception. Initial inspection. No defects detected.' },
      { date: '2026-09-16', time: '09:30', event: 'Inventory Stock', status: 'completed', detail: '360-degree photography for Salesforce CRM. Listed on company website.' },
      { date: '2026-10-01', time: '16:45', event: 'Customer Inquiry', status: 'completed', detail: 'In-person visitor. Test drive requested.' },
      { date: '2026-10-04', time: '11:00', event: 'Test Drive Completed', status: 'completed', detail: 'Customer: José María López. Result: positive. SAP Reference: PED-2026-0847.' },
      { date: '2026-10-05', time: '10:15', event: 'Financing Request', status: 'completed', detail: 'Banco Sabadell. Approved within 24h. APR 3.99%. Monthly payments: €324.' },
      { date: '2026-10-07', time: '09:00', event: 'Contract Signature', status: 'in-progress', detail: 'Today. Scheduled delivery: 10:30. Title transfer.' },
      { date: '2026-10-07', time: '10:30', event: 'Scheduled Delivery', status: 'pending', detail: 'Sale closure. Key handover. Invoice on platform.' }
    ],
    actors: [
      { role: 'Salesperson', name: 'Carlos Martínez', department: 'Seat Sales' },
      { role: 'Customer', name: 'José María López', contact: '+34-91-555-0147' },
      { role: 'Lender', name: 'Banco Sabadell', ref: 'HIPOTECA-2026-18472' }
    ],
    systems_involved: ['Salesforce', 'SAP ERP', 'Financing System', 'Traffic Registry'],
    financing: {
      amount: 63500,
      down_payment: 22225,
      down_payment_pct: '35%',
      term_months: 60,
      monthly_payment: 324,
      apr: 3.99,
      bank: 'Banco Sabadell',
      reference: 'HIPOTECA-2026-18472'
    },
    chart: {
      title: 'Lifecycle events and compliance milestones',
      sub: 'VIN-2026-MAD-SEAT-03 · Seat Ibiza · Customer José María López',
      stages: [
        { stage: 'Intake', completed: '✓', date: '15/9', detail: 'Hub arrival, inspection clean' },
        { stage: 'Marketing', completed: '✓', date: '16/9', detail: '360° photos, website listing' },
        { stage: 'Sales', completed: '✓', date: '4/10', detail: 'Test drive positive, SAP reference' },
        { stage: 'Finance', completed: '✓', date: '5/10', detail: 'Banco Sabadell approved, APR 3.99%' },
        { stage: 'Contract', in_progress: '⧖', date: '7/10 09:00', detail: 'Signature in progress' },
        { stage: 'Delivery', pending: '◯', date: '7/10 10:30', detail: 'Keys & title transfer' }
      ]
    },
    event_kv: [
      ['Vehicle', 'Seat Ibiza 1.0 TSI · VIN-2026-MAD-SEAT-03 · €63,500 sale price'],
      ['Customer', 'José María López · +34-91-555-0147 · Madrid location'],
      ['Finance', 'Banco Sabadell · €41,275 loan · 60 months · €324/month · APR 3.99%'],
      ['Timeline', '22 days hub-to-delivery · 7 events · Signature today 09:00 · Delivery pending 10:30']
    ]
  }
});
