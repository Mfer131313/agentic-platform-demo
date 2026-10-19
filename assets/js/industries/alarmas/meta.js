/* Guardián Ibérica Instalaciones · datos generales. Escenario de demostración con datos sintéticos (instalación, mantenimiento y soporte de alarmas residenciales). */
agenticPack('alarmas', {
  meta: {
    id: 'alarmas',
    industry: 'Instalación y mantenimiento de alarmas',
    company: 'Guardián Ibérica Instalaciones',
    legal: 'Guardián Ibérica Instalaciones, S.L.U.',
    short: 'GII',
    site: 'Hub de operaciones · Paterna (Valencia)',
    user_role: 'Responsable de operaciones',
    user_initials: 'RO',
    user_sub: 'Turno de mañana',
    today: '2026-10-19',
    weekday: 'lunes',
    clock_title: 'Hora del hub (Paterna)',
    theme: { brand: '#C2410C', dark: '#7C2D12', deep: '#431407', tint: '#FDEEE4' },
    connectors: ['Salesforce CRM', 'SAP Business One', 'Verisure Partner Portal', 'Sector Alarm Partner Hub', 'Prosegur Partner Portal', 'Samsara Flota', 'Twilio SMS', 'Google Workspace', 'Slack'],
    data_nouns: 'Instalaciones, paneles, sensores, órdenes de trabajo, clientes, lotes de equipos, contratos de marca',
    system_icons: {},
    trace: { noun: 'instalación', systems: 'Salesforce + SAP + Partner Portals', systems_short: 'Salesforce + SAP + Partner Portals', example: 'INS-2026-VLC-04417', quality_tab: 'Calidad' },
    doc_org: 'Guardián Ibérica Instalaciones · Cumplimiento',
    report_org: 'Guardián Ibérica Instalaciones · Operaciones'
  },
  roles: {
    decider: 'Responsable de operaciones',
    install_shift: 'Jefe de instalaciones',
    support_shift: 'Responsable de soporte técnico',
    maintenance_shift: 'Jefe de mantenimiento',
    warehouse_shift: 'Responsable de almacén',
    customer_care: 'Atención al cliente',
    compliance: 'DPO / Responsable de cumplimiento',
    finance: 'Responsable de finanzas'
  }
});
