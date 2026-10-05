agenticPack('autopista', {
  alarma: {
    title: 'Alertas operativas del hub',
    subtitle: 'Incidentes en tiempo real',
    type: 'incident-management',
    incidents: [
      { id: 'ALR-001', date: '2026-10-07', time: '07:45', severity: 'critical', title: 'Stock crítico: Seat Ibiza 1.0 TSI', detail: 'Solo 2 unidades en inventario. Próxima recepción: 15/10/2026. Recomendación: ofrecer Audi A1 como alternativa de gama media con márgenes más altos.', status: 'open', assigned_to: 'Jefe de Venta Seat', action: 'Contactar cliente, presentar alternativa' },
      { id: 'ALR-002', date: '2026-10-06', time: '16:30', severity: 'high', title: 'Falta mecánico especializado Volkswagen', detail: 'Baja médica de técnico especializado. Capacidad de taller reducida 30%. Revisiones programadas no urgentes serán reprogramadas para semana del 12/10.', status: 'open', assigned_to: 'Jefe de Taller', action: 'Redistribuir carga, reprogramar no urgentes' },
      { id: 'ALR-003', date: '2026-10-07', time: '11:00', severity: 'low', title: 'Reunión con proveedor de seguros', detail: 'Negociación de comisiones y pólizas Q4 2026. Oficinas centrales, Madrid.', status: 'scheduled', assigned_to: 'Responsable de Operaciones', action: 'Preparar propuesta de descuentos por volumen' },
      { id: 'ALR-004', date: '2026-10-05', time: '19:20', severity: 'medium', title: 'Retraso entrega Audi Q3 (VIN-2026-MAD-AUDI-07)', detail: 'Inspección post-transporte detectó rayón en puerta lateral. Taller local solicitó 2 horas adicionales para repinte.', status: 'in-progress', assigned_to: 'Jefe de Taller', action: 'Confirmar ETA revisada (17:00 hoy), notificar cliente' },
      { id: 'ALR-005', date: '2026-10-07', time: '06:00', severity: 'medium', title: 'Sistema Salesforce: lag en sincronización', detail: 'Retraso de 15-20 minutos en actualización de inventario desde SAP. Monitorear. Soporte IT contactado.', status: 'investigating', assigned_to: 'Responsable de Operaciones', action: 'Verificar con IT, usar datos de SAP si es crítico' }
    ],
    escalation_rules: [
      { trigger: 'Stock < 3 unidades', action: 'Avisar Jefe de Venta + Brand Manager', priority: 'high' },
      { trigger: 'Retraso entrega > 4 horas', action: 'Notificar cliente + Responsable Finanzas', priority: 'critical' },
      { trigger: 'Falta personal taller > 50%', action: 'Escalar a Responsable de Operaciones', priority: 'high' }
    ],
    kpi_alerts: [
      { kpi: 'Entregas programadas', threshold: '< 5', current: '8', status: 'ok', alert: false },
      { kpi: 'Órdenes taller en cola', threshold: '> 30', current: '23', status: 'ok', alert: false },
      { kpi: 'Ingresos proyectados', threshold: '< 25000 €', current: '28500 €', status: 'ok', alert: false }
    ]
  }
});
