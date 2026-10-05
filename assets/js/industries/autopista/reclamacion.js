agenticPack('autopista', {
  reclamacion: {
    title: 'Centro de reclamaciones',
    subtitle: 'Gestión de quejas y disputas cliente',
    type: 'claims-management',
    active_claims: [
      { id: 'REC-2026-0451', date_opened: '2026-10-01', client: 'Empresa de Transportes Ibérica', vehicle: 'BMW X5 (VIN-2026-MAD-BMW-12)', line: 'Venta', priority: 'high', status: 'open', title: 'Defecto en tapicería: costuras rotas', detail: 'Cliente reporta costuras rotas en asiento conductor tras 500 km. Solicita sustitución de tapicería o devolución. Compra: 2026-09-28, bajo garantía.', assigned_to: 'Especialista Calidad BMW', action: 'Inspección taller, evaluación cobertura garantía' },
      { id: 'REC-2026-0512', date_opened: '2026-10-03', client: 'José María López', vehicle: 'Seat Ibiza (VIN-2026-MAD-SEAT-03)', line: 'Venta', priority: 'critical', status: 'escalated', title: 'Disputa con condiciones de financiación', detail: 'Cliente alega que TAE acordada es 3.99% pero documento dice 4.25%. Solicita rectificación o cancelación sin penalidad. Banco Sabadell solicitó revisión de contrato.', assigned_to: 'Responsable Finanzas', action: 'Revisión documento original + comunicación Banco Sabadell' },
      { id: 'REC-2026-0498', date_opened: '2026-09-29', client: 'Hotel Costa del Sol', vehicle: 'Audi A6 Rent-a-Car', line: 'Alquiler', priority: 'medium', status: 'pending_inspection', title: 'Daño en parachoques trasero', detail: 'Cliente devolvió vehículo con abolladura en parachoques trasero (2026-10-02). Reclamación por daño no presente en salida. Depósito en disputa.', assigned_to: 'Gestor Flota Alquiler', action: 'Foto comparativa entrada/salida, avalúo taller' },
      { id: 'REC-2026-0487', date_opened: '2026-09-25', client: 'Consultora Tech, S.L.', vehicle: 'VW Multivan (Suscripción)', line: 'Suscripción', priority: 'medium', status: 'under_review', title: 'Mantenimiento programado no realizado', detail: 'Cliente reporta que revisión programada para 2026-09-20 fue omitida. Vehículo llegó a taller (2026-10-01) con falta de aceite. Solicita compensación por negligencia.', assigned_to: 'Responsable Suscripciones', action: 'Verificar calendario mantenimiento, revisar registros taller' },
      { id: 'REC-2026-0502', date_opened: '2026-10-02', client: 'Directiva Seguros Hispana', vehicle: 'Skoda Superb Rent-a-Car', line: 'Alquiler', priority: 'high', status: 'awaiting_client', title: 'Cargo adicional por combustible no justificado', detail: 'Cliente rechaza cargo de €85 por combustible. Devolvió tanque lleno según contrato. Disputa: medidor muestras inconsistencias. Solicita devolución o prueba de consumo real.', assigned_to: 'Gestor Flota Alquiler', action: 'Revisar telemetría, histórico combustible del vehículo' }
    ],
    common_complaint_types: [
      { type: 'vehicle_defect', frequency: 'high', examples: 'Defectos de tapicería, luces, sistemas electrónicos', resolution_time: '5-10 días', typical_outcome: 'Reparación garantía o sustitución' },
      { type: 'financing_dispute', frequency: 'medium', examples: 'TAE incorrecta, términos no comunicados, cuota errónea', resolution_time: '10-15 días', typical_outcome: 'Rectificación contrato o devolución parcial' },
      { type: 'rental_damage', frequency: 'high', examples: 'Abolladuras, rayones, daños no reportados en devolución', resolution_time: '7-14 días', typical_outcome: 'Avalúo + cargo de reparación o devolución depósito' },
      { type: 'maintenance_failure', frequency: 'medium', examples: 'Servicios no realizados, retrasos en reparación, mantenimiento preventivo omitido', resolution_time: '5-10 días', typical_outcome: 'Compensación o servicio gratuito futuro' },
      { type: 'fuel_dispute', frequency: 'medium', examples: 'Cargos adicionales sin justificación, inconsistencias en medición', resolution_time: '3-7 días', typical_outcome: 'Devolución de cargo o validación con telemetría' }
    ],
    resolution_channels: [
      { channel: 'Negociación directa', success_rate: '65%', avg_time: '3-5 días' },
      { channel: 'Inspección técnica taller', success_rate: '80%', avg_time: '5-10 días' },
      { channel: 'Arbitraje Banco (financiación)', success_rate: '70%', avg_time: '15-30 días' },
      { channel: 'Gestoría legal externa', success_rate: '85%', avg_time: '30-60 días' }
    ]
  }
});
