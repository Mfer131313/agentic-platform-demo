agenticPackEn('autopista', {
  reclamacion: {
    nav: 'Claims Management',
    title: 'Claims Resolution Center',
    icon: 'alert-triangle',
    page_title: 'Autopista Multimotor · Claims',
    summary: '5 active claims: critical financing dispute (José María López), high defect claim (Iberian Transport upholstery), high fuel surcharge (Hispana Insurance), medium rental damage (Hotel Costa del Sol), medium maintenance failure (Tech Consultancy). Resolution channels: negotiation 65% (3-5d), workshop 80% (5-10d), bank arbitration 70% (15-30d), legal 85% (30-60d).',
    status: 'operational',
    type: 'claims-management',
    active_claims: [
      { id: 'REC-2026-0451', date_opened: '2026-10-01', client: 'Iberian Transport Company', vehicle: 'BMW X5 (VIN-2026-MAD-BMW-12)', line: 'Sales', priority: 'high', status: 'open', title: 'Seat Upholstery Defect: Broken Seams', detail: 'Customer reports broken seams in driver seat after 500 km. Requests upholstery replacement or return. Purchase: 2026-09-28, under warranty.', assigned_to: 'BMW Quality Specialist', action: 'Workshop inspection, warranty coverage evaluation' },
      { id: 'REC-2026-0512', date_opened: '2026-10-03', client: 'José María López', vehicle: 'Seat Ibiza (VIN-2026-MAD-SEAT-03)', line: 'Sales', priority: 'critical', status: 'escalated', title: 'Financing Terms Dispute', detail: 'Customer claims agreed APR 3.99% but document shows 4.25%. Requests correction or penalty-free cancellation. Banco Sabadell requested contract review.', assigned_to: 'Finance Manager', action: 'Original document review + Banco Sabadell communication' },
      { id: 'REC-2026-0498', date_opened: '2026-09-29', client: 'Hotel Costa del Sol', vehicle: 'Audi A6 Rental', line: 'Rental', priority: 'medium', status: 'pending_inspection', title: 'Rear Bumper Damage', detail: 'Customer returned vehicle with rear bumper dent (2026-10-02). Claims damage not present at pickup. Deposit in dispute.', assigned_to: 'Rental Fleet Manager', action: 'Comparative photos entry/exit, workshop estimate' },
      { id: 'REC-2026-0487', date_opened: '2026-09-25', client: 'Tech Consultancy, S.L.', vehicle: 'VW Multivan (Subscription)', line: 'Subscription', priority: 'medium', status: 'under_review', title: 'Scheduled Maintenance Not Performed', detail: 'Customer reports scheduled 2026-09-20 review was missed. Vehicle arrived at workshop (2026-10-01) low on oil. Requests compensation for negligence.', assigned_to: 'Subscription Manager', action: 'Verify maintenance schedule, review workshop logs' },
      { id: 'REC-2026-0502', date_opened: '2026-10-02', client: 'Hispana Insurance', vehicle: 'Skoda Superb Rental', line: 'Rental', priority: 'high', status: 'awaiting_client', title: 'Unjustified Fuel Surcharge', detail: 'Customer disputes €85 fuel charge. Returned tank full per contract. Dispute: gauge inconsistency. Requests refund or proof of actual consumption.', assigned_to: 'Rental Fleet Manager', action: 'Review vehicle telemetry, fuel consumption history' }
    ],
    common_complaint_types: [
      { type: 'vehicle_defect', frequency: 'high', examples: 'Upholstery defects, light malfunctions, electronics issues', resolution_time: '5-10 days', typical_outcome: 'Warranty repair or replacement' },
      { type: 'financing_dispute', frequency: 'medium', examples: 'Incorrect APR, undisclosed terms, wrong payment amount', resolution_time: '10-15 days', typical_outcome: 'Contract correction or partial refund' },
      { type: 'rental_damage', frequency: 'high', examples: 'Dents, scratches, unreported damage at return', resolution_time: '7-14 days', typical_outcome: 'Repair estimate + charge or deposit refund' },
      { type: 'maintenance_failure', frequency: 'medium', examples: 'Missed services, repair delays, skipped preventive maintenance', resolution_time: '5-10 days', typical_outcome: 'Compensation or free future service' },
      { type: 'fuel_dispute', frequency: 'medium', examples: 'Unjustified surcharges, gauge inconsistencies', resolution_time: '3-7 days', typical_outcome: 'Charge reversal or telemetry validation' }
    ],
    resolution_channels: [
      { channel: 'Direct Negotiation', success_rate: '65%', avg_time: '3-5 days' },
      { channel: 'Technical Workshop Inspection', success_rate: '80%', avg_time: '5-10 days' },
      { channel: 'Bank Arbitration (Financing)', success_rate: '70%', avg_time: '15-30 days' },
      { channel: 'External Legal Firm', success_rate: '85%', avg_time: '30-60 days' }
    ],
    chart: {
      title: 'Claims status and resolution channels',
      sub: '2026-10-07 · Autopista Multimotor',
      claims_by_type: [
        { type: 'Vehicle Defect', count: 1, status: 'open', resolution_days: '5-10', channel: 'Workshop' },
        { type: 'Financing Dispute', count: 1, status: 'escalated', resolution_days: '10-15', channel: 'Bank Arbitration' },
        { type: 'Rental Damage', count: 1, status: 'pending_inspection', resolution_days: '7-14', channel: 'Workshop + Insurance' },
        { type: 'Maintenance Failure', count: 1, status: 'under_review', resolution_days: '5-10', channel: 'Internal Review' },
        { type: 'Fuel Dispute', count: 1, status: 'awaiting_client', resolution_days: '3-7', channel: 'Telemetry' }
      ]
    },
    event_kv: [
      ['Critical', 'REC-2026-0512: José María López · Financing APR discrepancy (3.99% vs 4.25%) · Banco Sabadell involved'],
      ['High', 'REC-2026-0451: Iberian Transport · BMW X5 upholstery defect · REC-2026-0502: Hispana Insurance · Fuel surcharge dispute'],
      ['Medium', 'REC-2026-0498: Hotel Costa del Sol · Rental damage (bumper dent) · REC-2026-0487: Tech Consultancy · Maintenance failure'],
      ['Channels', 'Negotiation 65% (3-5d) | Workshop 80% (5-10d) | Bank Arbitration 70% (15-30d) | Legal 85% (30-60d)']
    ]
  }
});
