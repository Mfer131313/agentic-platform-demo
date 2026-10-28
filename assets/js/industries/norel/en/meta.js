/* Norel Nutrición Animal · general data, English. Demo scenario with synthetic data (animal nutrition additives and premixes). */
agenticPackEn('norel', {
  meta: {
    id: 'norel',
    industry: 'Animal Nutrition (Additives and Premixes)',
    company: 'Norel Nutrición Animal',
    legal: 'Norel, S.A.',
    short: 'NOR',
    site: 'Order Office · Madrid / Premix Plant (Spain)',
    user_role: 'Operations and Quality Manager',
    user_initials: 'OQ',
    user_sub: 'Morning Shift',
    today: '2026-10-28',
    weekday: 'wednesday',
    clock_title: 'Plant Time (Spain)',
    theme: { brand: '#2E7D32', dark: '#1B4D1F', deep: '#0F2D12', tint: '#E8F3E9' },
    connectors: ['SAP S/4HANA', 'LIMS (laboratory)', 'Plant MES', 'Salesforce CRM', 'Microsoft Teams', 'Outlook', 'Power BI', 'SharePoint'],
    data_nouns: 'Raw materials, premix batches, production orders, lab tests, orders, shipments, customers',
    system_icons: {},
    trace: { noun: 'batch', systems: 'SAP + LIMS + MES', systems_short: 'SAP + LIMS + MES', example: 'PRM-2610-0417', quality_tab: 'Quality' },
    doc_org: 'Norel Nutrición Animal · Quality',
    report_org: 'Norel Nutrición Animal · Operations'
  },
  roles: {
    decider: 'Operations and Quality Manager',
    plant_shift: 'Plant Manager',
    qa_shift: 'Quality and Feed Safety Manager (HACCP)',
    lab_shift: 'Laboratory Manager',
    solutions: 'Norel Solutions (technical advisor)',
    customer_care: 'Customer Care and Orders',
    regulatory: 'Regulatory Affairs Manager',
    logistics: 'Logistics and Export Manager'
  }
});
