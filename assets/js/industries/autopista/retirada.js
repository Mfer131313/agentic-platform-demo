agenticPack('autopista', {
  retirada: {
    title: 'Gestión de retiradas y recalls',
    subtitle: 'Boletines de servicio y recall de seguridad',
    type: 'recall-management',
    active_recalls: [
      { id: 'REC-VW-2026-001', date_issued: '2026-09-30', manufacturer: 'Volkswagen Group', model_range: 'VW Golf/Passat (2024-2026)', severity: 'critical', status: 'in_progress', title: 'Recall: Fallo potencial sistema de frenado', detail: 'Defecto identificado en módulo ABS. Posibilidad de reducción de presión de frenado bajo condiciones específicas. Afecta a ~2,500 unidades en España. Solución: actualización firmware + sustitución sensor de presión si es necesario.', affected_units_in_fleet: 47, units_serviced: 12, units_pending: 35, deadline: '2026-11-15', assigned_to: 'Jefe Taller Volkswagen', action: 'Contactar propietarios, programar citas, coordinar con Volkswagen para piezas' },
      { id: 'REC-BMW-2026-002', date_issued: '2026-10-01', manufacturer: 'BMW', model_range: 'BMW X5/X7 (2023-2025)', severity: 'high', status: 'in_progress', title: 'Recall: Riesgo de incendio batería híbrida', detail: 'Riesgo potencial de cortocircuito interno en batería híbrida de alto voltaje. Solución: sustitución completa batería + sistema de refrigeración mejorado.', affected_units_in_fleet: 18, units_serviced: 3, units_pending: 15, deadline: '2026-11-30', assigned_to: 'Jefe Taller BMW', action: 'Citas prioritarias, piezas a disposición, garantía 10 años batería nueva' },
      { id: 'REC-AUDI-2026-001', date_issued: '2026-09-15', manufacturer: 'Audi', model_range: 'Audi A4/A6 (2022-2024)', severity: 'medium', status: 'completed', title: 'Recall: Revisión cierres de puertas', detail: 'Riesgo de apertura no deseada de puerta trasera bajo frenada brusca. Solución: reajuste mecanismo cierre + lubricación. Recall completado para todas las unidades Audi en flota.', affected_units_in_fleet: 52, units_serviced: 52, units_pending: 0, deadline: '2026-10-01', assigned_to: 'Jefe Taller Audi', action: 'Completado - informar clientes de resolución' },
      { id: 'REC-SKODA-2026-001', date_issued: '2026-09-25', manufacturer: 'Skoda', model_range: 'Skoda Superb/Octavia (2023-2025)', severity: 'low', status: 'scheduled', title: 'Boletín Servicio: Actualización software infotainment', detail: 'Actualización de software infotainment para mejorar estabilidad y compatibilidad con asistentes de voz. No es mandatory pero recomendado. Toma ~45 minutos.', affected_units_in_fleet: 31, units_serviced: 0, units_pending: 31, deadline: '2026-12-31', assigned_to: 'Especialista Electrónico Skoda', action: 'Ofrecer a clientes suscripción durante mantenimiento programado' }
    ],
    recall_status_summary: {
      total_active: 4,
      critical: 1,
      high: 1,
      medium: 1,
      low: 1,
      total_units_affected: 148,
      units_completed: 67,
      compliance_rate: '45.3%',
      at_risk_deadline: 'REC-VW-2026-001 (2026-11-15)'
    },
    notification_process: [
      { step: 1, action: 'Detección recall', source: 'Boletín fabricante o AEPD (Autoridad)', timeline: 'Inmediato' },
      { step: 2, action: 'Verificación en base de datos', source: 'Cruzar VIN/modelo con recall list', timeline: '2 horas' },
      { step: 3, action: 'Contacto cliente', method: 'Email + SMS + llamada', timeline: '24 horas' },
      { step: 4, action: 'Programación cita', source: 'Sistema calendario taller', timeline: 'Dentro de 5 días' },
      { step: 5, action: 'Ejecución recall', location: 'Taller especializado por marca', timeline: 'Según complejidad (30min-3h)' },
      { step: 6, action: 'Cierre expediente', certification: 'Documento sellado + registro Fabricante', timeline: 'Inmediato post-servicio' }
    ]
  }
});
