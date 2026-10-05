agenticPack('autopista', {
  trace: {
    title: 'Trazabilidad de vehículo: VIN-2026-MAD-SEAT-03',
    subtitle: 'Seat Ibiza 1.0 TSI · 63.500 €',
    type: 'vehicle-sales-lifecycle',
    timeline: [
      { date: '2026-09-15', time: '14:00', event: 'Llegada a hub', status: 'completed', detail: 'Recepción de concesionario. Inspección inicial. Sin defectos.' },
      { date: '2026-09-16', time: '09:30', event: 'Stock en inventario', status: 'completed', detail: 'Fotografías para Salesforce CRM. Precio publicado en web.' },
      { date: '2026-10-01', time: '16:45', event: 'Interés de cliente', status: 'completed', detail: 'Visitante presencial. Test drive solicitado.' },
      { date: '2026-10-04', time: '11:00', event: 'Test drive realizado', status: 'completed', detail: 'Cliente: José María López. Resultado: positivo. Referencia SAP: PED-2026-0847.' },
      { date: '2026-10-05', time: '10:15', event: 'Solicitud de financiación', status: 'completed', detail: 'Banco Sabadell. Aprobado en 24 h. TAE 3.99%. Cuotas mensuales: 324 €.' },
      { date: '2026-10-07', time: '09:00', event: 'Firma de contrato', status: 'in-progress', detail: 'Hoy. Entrega programada: 10:30. Transferencia del título de propiedad.' },
      { date: '2026-10-07', time: '10:30', event: 'Entrega prevista', status: 'pending', detail: 'Cierre de venta. Entrega de llaves. Factura en plataforma.' }
    ],
    actors: [
      { role: 'Vendedor', name: 'Carlos Martínez', department: 'Venta Seat' },
      { role: 'Cliente', name: 'José María López', contact: '91-555-0147' },
      { role: 'Financiera', name: 'Banco Sabadell', ref: 'HIPOTECA-2026-18472' }
    ],
    systems_involved: ['Salesforce', 'SAP ERP', 'Sistema de Financiación', 'Registro de Trafico']
  }
});
