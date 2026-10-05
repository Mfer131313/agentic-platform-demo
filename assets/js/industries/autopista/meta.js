/* Autopista Multimotor · datos generales. Escenario de demostración con datos sintéticos (venta, alquiler, suscripción y taller). */
agenticPack('autopista', {
  meta: {
    id: 'autopista',
    industry: 'Distribución y servicios de automoción',
    company: 'Autopista Multimotor',
    legal: 'Autopista Multimotor, S.L.U.',
    short: 'APM',
    site: 'Hub de operaciones · Madrid (Marqués de Soria)',
    user_role: 'Responsable de operaciones',
    user_initials: 'RO',
    user_sub: 'Turno de mañana',
    today: '2026-10-07',
    weekday: 'lunes',
    clock_title: 'Hora del hub (Madrid)',
    theme: { brand: '#1A4B7E', dark: '#0F2F4F', deep: '#0A1B2E', tint: '#E6F0F7' },
    connectors: ['Salesforce CRM', 'SAP ERP', 'Odoo Inventario', 'iCare Taller', 'Stripe Pagos', 'Twilio SMS', 'Google Workspace', 'Slack'],
    data_nouns: 'Vehículos, pedidos de venta, contratos de alquiler, suscripciones, órdenes de taller, clientes',
    system_icons: {},
    trace: { noun: 'vehículo', systems: 'Salesforce + SAP + Odoo', systems_short: 'Salesforce + SAP + Odoo', example: 'VIN-2026-MAD-SEAT-03', quality_tab: 'Taller' },
    doc_org: 'Autopista Multimotor · Calidad',
    report_org: 'Autopista Multimotor · Operaciones'
  },
  roles: {
    decider: 'Responsable de operaciones',
    sales_shift: 'Jefe de turno de ventas',
    rental_shift: 'Gestor de flota de alquiler',
    subscription_shift: 'Responsable de suscripciones',
    workshop_shift: 'Jefe de taller',
    brand_manager: 'Gestor de marca (Seat/Volkswagen/Audi/Skoda)',
    customer_care: 'Equipo de atención al cliente',
    finance: 'Responsable de finanzas'
  }
});
