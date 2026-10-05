/* Empresa de Congelados · datos generales. Escenario de la demo de referencia con datos sintéticos de demostración (MFM). */
agenticPack('congelados', {
  meta: {
    id: 'congelados',
    industry: 'Alimentación congelada',
    company: 'Empresa de Congelados',
    legal: 'Empresa de Congelados, S.A.U.',
    short: 'EC',
    site: 'Planta principal y hub logístico (Fustiñana)',
    user_role: 'Director de operaciones',
    user_initials: 'DO',
    user_sub: 'Turno de noche',
    today: '2026-09-29',
    weekday: 'martes',
    clock_title: 'Hora de la planta (Fustiñana)',
    theme: { brand: '#496C60', dark: '#344E45', deep: '#1F2E29', tint: '#EEF3F1' },
    connectors: ['SAP', 'SAP QM', 'MES Mapex', 'Siemens Opcenter APS', 'Mecalux Easy WMS', 'SCADA Galileo', 'Elara', 'Microsoft Teams'],
    data_nouns: 'Lotes, palés, cámaras, órdenes de fabricación, clientes y procedimientos',
    system_icons: {},
    trace: { noun: 'lote', systems: 'SAP, MES Mapex y Mecalux Easy WMS', systems_short: 'SAP + Mapex + Easy WMS', example: 'L26-261-FUS-GUI-03', quality_tab: 'Calidad' },
    doc_org: 'Empresa de Congelados · Calidad',
    report_org: 'Empresa de Congelados · Operaciones'
  },
  roles: {
    decider: 'Director de operaciones',
    quality_shift: 'Responsable de Calidad de turno',
    dispatch_shift: 'Jefe de turno de expedición',
    refrigeration_maintenance: 'Mantenimiento frigorífico',
    quality_plant: 'Responsable de Calidad de planta',
    line_maintenance: 'Mantenimiento de línea',
    campaign_manager: 'Jefe de campaña',
    customer_quality: 'Equipo de Calidad del cliente'
  }
});
