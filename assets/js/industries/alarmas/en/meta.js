agenticPackEn('alarmas', {
  meta: {
    id: 'alarmas',
    industry: 'Alarm Installation and Maintenance',
    company: 'Guardián Ibérica Instalaciones',
    legal: 'Guardián Ibérica Instalaciones, S.L.U.',
    short: 'GII',
    site: 'Operations Hub · Paterna (Valencia)',
    user_role: 'Operations Manager',
    user_initials: 'OM',
    user_sub: 'Morning Shift',
    today: '2026-10-19',
    weekday: 'monday',
    clock_title: 'Hub Time (Paterna)',
    theme: { brand: '#C2410C', dark: '#7C2D12', deep: '#431407', tint: '#FDEEE4' },
    connectors: ['Salesforce CRM', 'SAP Business One', 'Verisure Partner Portal', 'Sector Alarm Partner Hub', 'Prosegur Partner Portal', 'Samsara Fleet', 'Twilio SMS', 'Google Workspace', 'Slack'],
    data_nouns: 'Installations, panels, sensors, work orders, customers, equipment lots, brand contracts',
    system_icons: {},
    trace: { noun: 'installation', systems: 'Salesforce + SAP + Partner Portals', systems_short: 'Salesforce + SAP + Partner Portals', example: 'INS-2026-VLC-04417', quality_tab: 'Quality' },
    doc_org: 'Guardián Ibérica Instalaciones · Compliance',
    report_org: 'Guardián Ibérica Instalaciones · Operations'
  },
  roles: {
    decider: 'Operations Manager',
    install_shift: 'Installation Manager',
    support_shift: 'Technical Support Manager',
    maintenance_shift: 'Maintenance Manager',
    warehouse_shift: 'Warehouse Manager',
    customer_care: 'Customer Care',
    compliance: 'DPO / Compliance Officer',
    finance: 'Finance Manager'
  }
});
