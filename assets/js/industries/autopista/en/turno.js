agenticPack('autopista', {
  turno_en: {
    date: '2026-10-07',
    time: '07:30',
    shift: 'Morning Shift · Autopista Multimotor',
    summary: 'Monday morning at Madrid hub. Operational status for sales, rental, subscriptions, and workshop. Daily coordination meeting.',
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
    briefing: 'Sales: focus on Audi Q7 (high margins). Rental: peak corporate demand (FITUR event Oct 8-12). Workshop: staffing delays ongoing. Subscriptions: 15 contract renewals due this week.'
  }
});
