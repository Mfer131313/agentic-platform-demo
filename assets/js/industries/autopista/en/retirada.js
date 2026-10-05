agenticPackEn('autopista', {
  retirada: {
    nav: 'Recalls and Bulletins',
    title: 'Safety Recalls Management',
    icon: 'tool',
    page_title: 'Autopista Multimotor · Recalls',
    summary: '4 active recalls: critical VW Golf ABS (47 units, 25.5% compliant), high BMW X5 battery (18 units, 16.7%), completed Audi door latches (52/52), scheduled Skoda infotainment (31 pending). Overall compliance: 45.3%. Critical deadline: 15/11.',
    status: 'in-progress',
    type: 'recall-management',
    active_recalls: [
      { id: 'REC-VW-2026-001', date_issued: '2026-09-30', manufacturer: 'Volkswagen Group', model_range: 'VW Golf/Passat (2024-2026)', severity: 'critical', status: 'in_progress', title: 'Recall: Potential Braking System Failure', detail: 'ABS module defect identified. Risk of brake pressure reduction under specific conditions. Affects ~2,500 units in Spain. Solution: firmware update + pressure sensor replacement if needed.', affected_units_in_fleet: 47, units_serviced: 12, units_pending: 35, deadline: '2026-11-15', assigned_to: 'VW Workshop Manager', action: 'Contact owners, schedule appointments, coordinate VW parts' },
      { id: 'REC-BMW-2026-002', date_issued: '2026-10-01', manufacturer: 'BMW', model_range: 'BMW X5/X7 (2023-2025)', severity: 'high', status: 'in_progress', title: 'Recall: Hybrid Battery Fire Risk', detail: 'Potential internal short circuit in hybrid high-voltage battery. Solution: complete battery replacement + improved cooling system.', affected_units_in_fleet: 18, units_serviced: 3, units_pending: 15, deadline: '2026-11-30', assigned_to: 'BMW Workshop Manager', action: 'Priority appointments, available parts, 10-year battery warranty' },
      { id: 'REC-AUDI-2026-001', date_issued: '2026-09-15', manufacturer: 'Audi', model_range: 'Audi A4/A6 (2022-2024)', severity: 'medium', status: 'completed', title: 'Recall: Door Latch Review', detail: 'Risk of unwanted rear door opening during hard braking. Solution: door latch mechanism adjustment + lubrication. Completed for all Audi units in fleet.', affected_units_in_fleet: 52, units_serviced: 52, units_pending: 0, deadline: '2026-10-01', assigned_to: 'Audi Workshop Manager', action: 'Completed - inform customers of resolution' },
      { id: 'REC-SKODA-2026-001', date_issued: '2026-09-25', manufacturer: 'Skoda', model_range: 'Skoda Superb/Octavia (2023-2025)', severity: 'low', status: 'scheduled', title: 'Service Bulletin: Infotainment Software Update', detail: 'Software update for improved stability and voice assistant compatibility. Not mandatory but recommended. Takes ~45 minutes.', affected_units_in_fleet: 31, units_serviced: 0, units_pending: 31, deadline: '2026-12-31', assigned_to: 'Skoda Electronics Specialist', action: 'Offer to subscription customers during scheduled maintenance' }
    ],
    recall_status_summary: {
      total_active: 4,
      critical: 1,
      high: 1,
      medium: 1,
      low: 1,
      total_units_affected: 148,
      units_completed: 67,
      compliance_rate: '45.3%',
      at_risk_deadline: 'REC-VW-2026-001 (2026-11-15)'
    },
    notification_process: [
      { step: 1, action: 'Recall Detection', source: 'Manufacturer bulletin or AEPD (Authority)', timeline: 'Immediate' },
      { step: 2, action: 'Database Verification', source: 'Cross-check VIN/model with recall list', timeline: '2 hours' },
      { step: 3, action: 'Customer Contact', method: 'Email + SMS + phone call', timeline: '24 hours' },
      { step: 4, action: 'Appointment Scheduling', source: 'Workshop calendar system', timeline: 'Within 5 days' },
      { step: 5, action: 'Recall Execution', location: 'Specialized workshop by brand', timeline: 'Per complexity (30min-3h)' },
      { step: 6, action: 'File Closure', certification: 'Sealed document + Manufacturer registration', timeline: 'Immediate post-service' }
    ],
    chart: {
      title: 'Recall compliance tracking',
      sub: '2026-10-07 · Autopista Multimotor',
      compliance_by_recall: [
        { recall: 'VW-001 (ABS)', affected: 47, serviced: 12, compliance: '25.5%', status: 'at-risk', deadline: '2026-11-15' },
        { recall: 'BMW-002 (Battery)', affected: 18, serviced: 3, compliance: '16.7%', status: 'at-risk', deadline: '2026-11-30' },
        { recall: 'AUDI-001 (Doors)', affected: 52, serviced: 52, compliance: '100%', status: 'completed', deadline: '2026-10-01' },
        { recall: 'SKODA-001 (SW)', affected: 31, serviced: 0, compliance: '0%', status: 'scheduled', deadline: '2026-12-31' }
      ],
      overall_compliance: '45.3%'
    },
    event_kv: [
      ['Critical', 'REC-VW-2026-001: ABS VW Golf · 47 units · 35 pending · deadline 15/11'],
      ['At Risk', 'REC-BMW-2026-002: Hybrid battery BMW X5 · 18 units · 15 pending · deadline 30/11'],
      ['Completed', 'REC-AUDI-2026-001: Door latches Audi · 52/52 · finished'],
      ['Scheduled', 'REC-SKODA-2026-001: Infotainment Skoda · 31 pending · offer in regular maintenance']
    ]
  }
});
