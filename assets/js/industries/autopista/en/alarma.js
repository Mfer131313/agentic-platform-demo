agenticPackEn('autopista', {
  alarma: {
    nav: 'Operational Alerts',
    title: 'Incident Management Dashboard',
    icon: 'alert-circle',
    page_title: 'Autopista Multimotor · Alerts',
    summary: '5 incidents tracked: 1 critical stock alert (BMW X3, 1 unit), 1 high priority (workshop staff absence reducing capacity 30%), 3 medium/low (delivery delay, sync lag, meeting). Real-time escalation rules active.',
    status: 'active',
    incidents: [
      { id: 'ALR-001', date: '2026-10-07', time: '07:45', severity: 'critical', title: 'Critical Stock: BMW X3 2.0d', detail: 'Only 1 unit in inventory. Next delivery: 18/10/2026. Recommendation: offer Audi Q3 as mid-range alternative with higher margins.', status: 'open', assigned_to: 'BMW Sales Lead', action: 'Contact customer, present alternative' },
      { id: 'ALR-002', date: '2026-10-06', time: '16:30', severity: 'high', title: 'Missing VW Specialist Technician', detail: 'Medical leave of VW specialist technician. Workshop capacity reduced 30%. Non-urgent services rescheduled to week 12/10.', status: 'open', assigned_to: 'Workshop Manager', action: 'Redistribute workload, reschedule non-urgent' },
      { id: 'ALR-003', date: '2026-10-07', time: '11:00', severity: 'low', title: 'Insurance Provider Meeting', detail: 'Q4 2026 commission and policy negotiation. Madrid headquarters.', status: 'scheduled', assigned_to: 'Operations Manager', action: 'Prepare volume discount proposal' },
      { id: 'ALR-004', date: '2026-10-05', time: '19:20', severity: 'medium', title: 'Delayed Audi Q3 Delivery (VIN-2026-MAD-AUDI-07)', detail: 'Post-transport inspection found scratch on driver door. Local workshop requested 2 additional hours for repainting.', status: 'in-progress', assigned_to: 'Workshop Manager', action: 'Confirm revised ETA (17:00 today), notify customer' },
      { id: 'ALR-005', date: '2026-10-07', time: '06:00', severity: 'medium', title: 'Salesforce: Inventory Sync Lag', detail: 'Sync delay of 15-20 minutes from SAP. Monitoring ongoing. IT support contacted.', status: 'investigating', assigned_to: 'Operations Manager', action: 'Verify with IT, use SAP data if critical' }
    ],
    escalation_rules: [
      { trigger: 'Stock < 3 units', action: 'Alert Sales Lead + Brand Manager', priority: 'high' },
      { trigger: 'Delivery delay > 4 hours', action: 'Notify customer + Finance Manager', priority: 'critical' },
      { trigger: 'Workshop staff absence > 50%', action: 'Escalate to Operations Manager', priority: 'high' }
    ],
    kpi_alerts: [
      { kpi: 'Scheduled deliveries', threshold: '< 5', current: '8', status: 'ok', alert: false },
      { kpi: 'Workshop orders queued', threshold: '> 30', current: '23', status: 'ok', alert: false },
      { kpi: 'Projected revenue', threshold: '< €25,000', current: '€28,500', status: 'ok', alert: false }
    ],
    chart: {
      title: 'Incident tracking and escalation',
      sub: '2026-10-07 · Autopista Multimotor',
      incident_severity: [
        { severity: 'Critical', count: 1, avg_response_time: '< 15 min', escalation_path: 'Operations Manager + Brand Manager' },
        { severity: 'High', count: 1, avg_response_time: '< 30 min', escalation_path: 'Workshop Manager + Operations' },
        { severity: 'Medium', count: 2, avg_response_time: '< 60 min', escalation_path: 'Department Head' },
        { severity: 'Low', count: 1, avg_response_time: '< 4h', escalation_path: 'Assigned Team' }
      ]
    },
    event_kv: [
      ['Critical', 'ALR-001: BMW X3 stock critical (1 unit) · Next delivery 18/10 · Action: Contact customer with Audi Q3 alternative'],
      ['High', 'ALR-002: Workshop capacity reduced 30% (VW specialist medical leave) · Non-urgent services rescheduled'],
      ['Medium', 'ALR-004: Audi Q3 delayed (repainting 2h) · ALR-005: Salesforce sync lag 15-20 min (monitoring)'],
      ['Escalation', '3 rules active: stock alert → sales + brand, delivery delay → customer + finance, staff absence → ops']
    ]
  }
});
