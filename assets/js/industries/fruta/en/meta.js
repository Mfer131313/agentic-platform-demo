/* Subtropicales Axarquía · general data, English. Demo scenario with synthetic data (fresh and processed avocado and mango, and online shop). */
agenticPackEn('fruta', {
  meta: {
    id: 'fruta',
    industry: 'Subtropical Fruit (Avocado and Mango)',
    company: 'Subtropicales Axarquía',
    legal: 'Subtropicales Axarquía, S.A.',
    short: 'SAX',
    site: 'Axarquía Packing Centre (Málaga)',
    user_role: 'Operations and Quality Manager',
    user_initials: 'OQ',
    user_sub: 'Morning Shift',
    today: '2026-11-20',
    weekday: 'friday',
    clock_title: 'Centre Time (Spain)',
    theme: { brand: '#5F7F1E', dark: '#3F5512', deep: '#222E0A', tint: '#F0F4E1' },
    connectors: ['SAP S/4HANA', 'Field traceability', 'LIMS', 'WMS', 'Online shop (PrestaShop)', 'Microsoft Teams', 'Outlook', 'Power BI'],
    data_nouns: 'Fruit lots, ripening rooms, residue analyses, supermarket orders, online shop orders, shipments, customers',
    system_icons: {},
    trace: { noun: 'lot', systems: 'SAP + Field traceability + LIMS', systems_short: 'SAP + Traceability + LIMS', example: 'AH-2611-118', quality_tab: 'Quality' },
    doc_org: 'Subtropicales Axarquía · Quality',
    report_org: 'Subtropicales Axarquía · Operations'
  },
  roles: {
    decider: 'Operations and Quality Manager',
    reception_shift: 'Reception and Field Manager',
    ripening_shift: 'Ripening and Cold Chain Manager',
    packing_shift: 'Packing and Packaging Manager',
    processing_shift: 'Processing Manager',
    qa_shift: 'Quality and Food Safety Manager',
    lab_shift: 'Laboratory Manager',
    ecommerce: 'Online Shop Manager',
    logistics: 'Shipping and Export Manager',
    customer_care: 'Customer Care'
  }
});
