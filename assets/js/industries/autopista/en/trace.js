agenticPack('autopista', {
  trace_en: {
    title: 'Vehicle Traceability: VIN-2026-MAD-SEAT-03',
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
    systems_involved: ['Salesforce', 'SAP ERP', 'Financing System', 'Traffic Registry']
  }
});
