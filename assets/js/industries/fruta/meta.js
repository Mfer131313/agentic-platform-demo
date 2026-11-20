/* Subtropicales Axarquía · datos generales. Escenario de demostración con datos sintéticos (aguacate y mango frescos y procesados, y tienda online). */
agenticPack('fruta', {
  meta: {
    id: 'fruta',
    industry: 'Frutas subtropicales (aguacate y mango)',
    company: 'Subtropicales Axarquía',
    legal: 'Subtropicales Axarquía, S.A.',
    short: 'SAX',
    site: 'Centro de manipulado de la Axarquía (Málaga)',
    user_role: 'Responsable de operaciones y calidad',
    user_initials: 'RC',
    user_sub: 'Turno de mañana',
    today: '2026-11-20',
    weekday: 'viernes',
    clock_title: 'Hora del centro (España)',
    theme: { brand: '#5F7F1E', dark: '#3F5512', deep: '#222E0A', tint: '#F0F4E1' },
    connectors: ['SAP S/4HANA', 'Trazabilidad de campo', 'LIMS', 'WMS', 'Tienda online (PrestaShop)', 'Microsoft Teams', 'Outlook', 'Power BI'],
    data_nouns: 'Lotes de fruta, cámaras de maduración, análisis de residuos, pedidos de supermercados, pedidos de la tienda online, expediciones, clientes',
    system_icons: {},
    trace: { noun: 'lote', systems: 'SAP + Trazabilidad de campo + LIMS', systems_short: 'SAP + Trazabilidad + LIMS', example: 'AH-2611-118', quality_tab: 'Calidad' },
    doc_org: 'Subtropicales Axarquía · Calidad',
    report_org: 'Subtropicales Axarquía · Operaciones'
  },
  roles: {
    decider: 'Responsable de operaciones y calidad',
    reception_shift: 'Jefe de recepción y campo',
    ripening_shift: 'Responsable de maduración y frío',
    packing_shift: 'Jefe de manipulado y envasado',
    processing_shift: 'Responsable de procesado',
    qa_shift: 'Responsable de calidad y seguridad alimentaria',
    lab_shift: 'Jefe de laboratorio',
    ecommerce: 'Responsable de la tienda online',
    logistics: 'Responsable de expediciones y exportación',
    customer_care: 'Atención al cliente'
  }
});
