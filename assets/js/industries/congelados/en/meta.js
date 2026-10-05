/* Frozen Foods Company · general data (English). Reference demo scenario with synthetic data (MFM). */
agenticPackEn('congelados', {
  meta: {
    id: 'congelados',
    industry: 'Frozen food',
    company: 'Frozen Foods Company',
    legal: 'Empresa de Congelados, S.A.U.',
    short: 'EC',
    site: 'Main plant and logistics hub (Fustiñana)',
    user_role: 'Operations Director',
    user_initials: 'OD',
    user_sub: 'Night shift',
    clock_title: 'Plant time (Fustiñana)',
    data_nouns: 'Lots, pallets, cold rooms, production orders, customers and procedures',
    trace: { noun: 'lot', systems: 'SAP, MES Mapex and Mecalux Easy WMS', systems_short: 'SAP + Mapex + Easy WMS', example: 'L26-261-FUS-GUI-03', quality_tab: 'Quality' },
    doc_org: 'Frozen Foods Company · Quality',
    report_org: 'Frozen Foods Company · Operations'
  },
  roles: {
    decider: 'Operations Director',
    quality_shift: 'Shift Quality Lead',
    dispatch_shift: 'Dispatch Shift Supervisor',
    refrigeration_maintenance: 'Refrigeration Maintenance',
    quality_plant: 'Plant Quality Manager',
    line_maintenance: 'Line Maintenance',
    campaign_manager: 'Campaign Manager',
    customer_quality: 'Customer Quality team'
  }
});
