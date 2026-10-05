/* Autopista Multimotor · reclamaciones de clientes. Ejemplo: disputa APR en financiación (MFM).
 * Las funciones reciben el contexto H de la escena. */
(function () {
  'use strict';

  /* Claims activos. */
  const CLAIMS = [
    {
      id: 'CLM-2026-001',
      date: '2026-10-01',
      type: 'financing',
      severity: 'critical',
      customer: 'Roberto García',
      vehicle: 'BMW X5 40d',
      amount: 2400,
      issue: 'APR discrepancy: Contrato dice 3.99%, factura menciona 4.25%. Reclamación de sobrecoste.',
      status: 'escalated',
      owner: 'Finanzas'
    },
    {
      id: 'CLM-2026-002',
      date: '2026-10-02',
      type: 'defect',
      severity: 'high',
      customer: 'María Rodríguez',
      vehicle: 'Audi Q3 (rental)',
      amount: 1200,
      issue: 'Defecto tapicería en asientos traseros. Alquiler 7 días, reclamación de reembolso.',
      status: 'investigating',
      owner: 'Taller'
    },
    {
      id: 'CLM-2026-003',
      date: '2026-10-03',
      type: 'rental-damage',
      severity: 'high',
      customer: 'Carlos López',
      vehicle: 'Volkswagen Golf (rental)',
      amount: 800,
      issue: 'Raya en puerta lateral durante alquiler. Cliente reclama no estar implicado. Análisis pericial pendiente.',
      status: 'pending-inspection',
      owner: 'Seguros'
    },
    {
      id: 'CLM-2026-004',
      date: '2026-09-28',
      type: 'maintenance',
      severity: 'medium',
      customer: 'Ana Fernández',
      vehicle: 'Subscription (BMW X3)',
      amount: 350,
      issue: 'Revisión programada omitida de contrato de suscripción. Cliente pagó revisión adicional. Reembolso solicitado.',
      status: 'in-resolution',
      owner: 'Atención cliente'
    },
    {
      id: 'CLM-2026-005',
      date: '2026-10-04',
      type: 'fuel-surcharge',
      severity: 'low',
      customer: 'Pedro Jiménez',
      vehicle: 'Rental (Skoda Octavia)',
      amount: 45,
      issue: 'Cargo de combustible: cliente reclama depósito lleno al retorno. Foto del ticket contradice.',
      status: 'closed-rejected',
      owner: 'Alquiler'
    }
  ];

  /* Complaint types statistics. */
  const COMPLAINT_TYPES = [
    { type: 'APR/Financing disputes', frequency: 'Medium', avg_resolution_days: 15, success_rate: 65, example: 'CLM-2026-001' },
    { type: 'Defects (tapicería, electronics)', frequency: 'High', avg_resolution_days: 8, success_rate: 80, example: 'CLM-2026-002' },
    { type: 'Rental damage (scratches, impacts)', frequency: 'High', avg_resolution_days: 12, success_rate: 70, example: 'CLM-2026-003' },
    { type: 'Missed maintenance', frequency: 'Medium', avg_resolution_days: 5, success_rate: 85, example: 'CLM-2026-004' },
    { type: 'Fuel & surcharges', frequency: 'Low', avg_resolution_days: 3, success_rate: 40, example: 'CLM-2026-005' }
  ];

  /* Resolution channels. */
  const RESOLUTION_CHANNELS = [
    { channel: 'Direct negotiation (customer care)', success_rate: 65, avg_days: 5, escalation: 'Finance review if > 1000 EUR' },
    { channel: 'Workshop inspection (defect verification)', success_rate: 80, avg_days: 8, escalation: 'Warranty claim if defect confirmed' },
    { channel: 'Bank arbitration (financing disputes)', success_rate: 70, avg_days: 20, escalation: 'Legal if bank declines' },
    { channel: 'Insurance claim (rental damage)', success_rate: 75, avg_days: 15, escalation: 'Third-party inspection' },
    { channel: 'Legal firm (last resort)', success_rate: 85, avg_days: 45, escalation: 'Litigation' }
  ];

  /* Funciones para contexto H. */
  const activeClaims = (sc) => CLAIMS.filter((c) => c.status !== 'closed-rejected').length;
  const criticalClaims = (sc) => CLAIMS.filter((c) => c.severity === 'critical').length;
  const totalAmount = (sc) => CLAIMS.reduce((sum, c) => sum + c.amount, 0);

  agenticPack('autopista', {
    reclamacion: {
      nav: 'Reclamaciones',
      title: 'Centro de resolución de reclamaciones',
      icon: 'alert-triangle',
      page_title: 'Autopista Multimotor · Reclamaciones activas',
      summary: '5 reclamaciones activas. Crítica: disputa APR (€2.400). Media: defectos y daño alquiler. Canales: negociación directa, inspección, arbitraje bancario, seguro, legal.',
      status: 'operational',
      active_count: activeClaims(),
      critical_count: criticalClaims(),
      total_amount: totalAmount(),
      claims: CLAIMS,
      complaint_types: COMPLAINT_TYPES,
      resolution_channels: RESOLUTION_CHANNELS,
      chart: {
        title: 'Estado de reclamaciones y resolución',
        sub: '2026-10-07 · Autopista Multimotor',
        claims_by_status: [
          { status: 'Escalada', count: 1, amount: 2400 },
          { status: 'Investigando', count: 1, amount: 1200 },
          { status: 'Inspección pendiente', count: 1, amount: 800 },
          { status: 'Resolución', count: 1, amount: 350 },
          { status: 'Cerrada (rechazada)', count: 1, amount: 45 }
        ],
        typical_resolution_times: [
          { type: 'Combustible', days: 3 },
          { type: 'Mantenimiento', days: 5 },
          { type: 'Defectos', days: 8 },
          { type: 'APR', days: 15 },
          { type: 'Daño alquiler', days: 12 }
        ]
      },
      event_kv: [
        ['Crítica', 'CLM-2026-001: APR 3.99% vs 4.25% · €2.400 · escalada a Finanzas'],
        ['Altas', 'Defectos (CLM-2026-002) · Daño rental (CLM-2026-003)'],
        ['Canales', 'Negociación 65% (5d) | Taller 80% (8d) | Banco 70% (20d) | Legal 85% (45d)'],
        ['Próximo paso', 'CLM-2026-001: arbitraje bancario; CLM-2026-003: pericia de seguros']
      ]
    }
  });
})();
