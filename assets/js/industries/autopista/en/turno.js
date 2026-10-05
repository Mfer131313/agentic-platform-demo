agenticPackEn('autopista', {
  turno: {
    nav: 'Daily Shift Report',
    title: 'Operational Shift Dashboard',
    icon: 'clock',
    page_title: 'Autopista Multimotor · Daily Report',
    date: '2026-10-07',
    time: '07:30',
    shift: 'Morning Shift · Autopista Multimotor',
    summary: 'Monday morning at Madrid hub. 8 deliveries scheduled, 23 workshop orders in queue, 1,847 rental vehicles active, 171 subscriptions. Revenue target €28,500 on-track.',
    status: 'on-track',
    kpis: [
      { label: 'Scheduled deliveries today', value: '8', status: 'on-track' },
      { label: 'Workshop orders in queue', value: '23', status: 'warning' },
      { label: 'Rental vehicles in circulation', value: '1,847', status: 'on-track' },
      { label: 'Active subscriptions', value: '171', status: 'on-track' },
      { label: 'Projected revenue today (€)', value: '28,500', status: 'on-track' }
    ],
    incidents: [
      { type: 'alert', priority: 'high', title: 'Critical Stock: BMW X3 2.0d', detail: 'Only 1 unit in inventory. Next delivery: 18/10. Recommendation: Offer Audi Q3 as premium alternative.' },
      { type: 'alert', priority: 'medium', title: 'Workshop: Specialist Technician Missing', detail: 'Medical leave of VW specialist. Capacity reduced 30%. Non-urgent services rescheduled to week 12/10.' },
      { type: 'info', priority: 'low', title: 'Meeting with Insurance Provider', detail: '11:00. Madrid offices. Negotiating Q4 commissions and policy terms.' }
    ],
    briefing: 'Sales: focus on Audi Q7 (high margins). Rental: peak corporate demand (FITUR event Oct 8-12). Workshop: staffing delays ongoing. Subscriptions: 15 contract renewals due this week.',
    business_lines: [
      { line: 'Sales (Venta)', focus: 'Premium models (Q7, X5)', opportunity: 'Audi Q3 alternative margins', risk: 'BMW stock critical' },
      { line: 'Rental (Alquiler)', focus: 'Corporate demand peak (FITUR)', opportunity: 'High occupancy rates', risk: 'Fleet maintenance window' },
      { line: 'Subscriptions', focus: '15 renewals this week', opportunity: 'Upgrade offers', risk: 'Churn risk detection' },
      { line: 'Workshop (Taller)', focus: 'Capacity recovery', opportunity: 'Premium diagnostics', risk: 'Staff absence 30% capacity' }
    ],
    chart: {
      title: 'Daily operational shift summary',
      sub: '2026-10-07 · Morning Shift 07:30 UTC',
      business_performance: [
        { line: 'Sales', scheduled: 8, completed: 0, revenue_target: '€12,000', status: 'in-progress' },
        { line: 'Rental', active: 1847, occupancy: '92%', revenue_target: '€8,500', status: 'on-track' },
        { line: 'Subscriptions', active: 171, renewals: 15, revenue_target: '€6,000', status: 'monitoring' },
        { line: 'Workshop', queued: 23, capacity: '70%', revenue_target: '€2,000', status: 'warning' }
      ]
    },
    event_kv: [
      ['Sales', '8 deliveries scheduled · Focus: Audi Q7 (high margins) · Alert: BMW X3 stock critical (1 unit)'],
      ['Rental', '1,847 vehicles active · 92% occupancy · Peak corporate demand (FITUR 8-12 Oct)'],
      ['Workshop', '23 orders queued · Capacity 70% (technician absent) · Rescheduled non-urgent to 12/10'],
      ['Revenue', '€28,500 projected · All business lines on/near target · 15 subscription renewals this week']
    ]
  }
});
