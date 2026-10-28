/* Norel Nutrición Animal · datos generales. Escenario de demostración con datos sintéticos (aditivos y premezclas para nutrición animal). */
agenticPack('norel', {
  meta: {
    id: 'norel',
    industry: 'Nutrición animal (aditivos y premezclas)',
    company: 'Norel Nutrición Animal',
    legal: 'Norel, S.A.',
    short: 'NOR',
    site: 'Oficina de pedidos · Madrid / Planta de premezclas (España)',
    user_role: 'Responsable de operaciones y calidad',
    user_initials: 'RC',
    user_sub: 'Turno de mañana',
    today: '2026-10-28',
    weekday: 'miércoles',
    clock_title: 'Hora de planta (España)',
    theme: { brand: '#2E7D32', dark: '#1B4D1F', deep: '#0F2D12', tint: '#E8F3E9' },
    connectors: ['SAP S/4HANA', 'LIMS (laboratorio)', 'MES de planta', 'Salesforce CRM', 'Microsoft Teams', 'Outlook', 'Power BI', 'SharePoint'],
    data_nouns: 'Materias primas, lotes de premezcla, órdenes de fabricación, ensayos de laboratorio, pedidos, expediciones, clientes',
    system_icons: {},
    trace: { noun: 'lote', systems: 'SAP + LIMS + MES', systems_short: 'SAP + LIMS + MES', example: 'PRM-2610-0417', quality_tab: 'Calidad' },
    doc_org: 'Norel Nutrición Animal · Calidad',
    report_org: 'Norel Nutrición Animal · Operaciones'
  },
  roles: {
    decider: 'Responsable de operaciones y calidad',
    plant_shift: 'Jefe de planta',
    qa_shift: 'Responsable de calidad y seguridad alimentaria (APPCC)',
    lab_shift: 'Jefe de laboratorio',
    solutions: 'Norel Solutions (asesor técnico)',
    customer_care: 'Atención al cliente y pedidos',
    regulatory: 'Responsable de asuntos regulatorios',
    logistics: 'Responsable de logística y exportación'
  }
});
