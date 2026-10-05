agenticPack('autopista', {
  cuestionario: {
    title: 'Encuesta de satisfacción cliente',
    subtitle: 'Calidad de servicio y experiencia de compra',
    type: 'survey-feedback',
    active_surveys: [
      { id: 'ENC-2026-Q4-VENTA', name: 'Encuesta Experiencia Venta Directa', target: 'Clientes con compra realizada últimos 30 días', created: '2026-10-01', response_rate: '34%', responses_received: 127, responses_target: 375, status: 'active', sections: [
          { section: 'Información pre-compra', questions: 3, avg_score: '4.2/5', comment: 'Claridad en specs técnicas y opciones financieras' },
          { section: 'Proceso de venta', questions: 4, avg_score: '4.5/5', comment: 'Velocidad paperwork, cortesía vendedor' },
          { section: 'Términos financiación', questions: 3, avg_score: '3.8/5', comment: 'Transparencia TAE, cuotas mensuales' },
          { section: 'Entrega vehículo', questions: 3, avg_score: '4.6/5', comment: 'Puntualidad, estado vehículo, documentación' },
          { section: 'Satisfacción general', questions: 2, avg_score: '4.3/5', comment: 'Recomendación a amigos/familia' }
        ]
      },
      { id: 'ENC-2026-Q4-ALQUILER', name: 'Encuesta Experiencia Rent-a-Car', target: 'Clientes con devolución de vehículo últimos 60 días', created: '2026-10-01', response_rate: '41%', responses_received: 218, responses_target: 530, status: 'active', sections: [
          { section: 'Reserva y entrega', questions: 3, avg_score: '4.4/5', comment: 'Facilidad plataforma, tiempo check-in' },
          { section: 'Condición vehículo', questions: 3, avg_score: '4.2/5', comment: 'Limpieza, mantenimiento, accesorios' },
          { section: 'Soporte durante alquiler', questions: 3, avg_score: '3.9/5', comment: 'Disponibilidad 24h, respuesta a incidencias' },
          { section: 'Proceso devolución', questions: 3, avg_score: '4.1/5', comment: 'Inspección clara, resolución daños' },
          { section: 'Precio vs valor', questions: 2, avg_score: '3.7/5', comment: 'Tarifa justa, extras justificados' },
          { section: 'Lealtad', questions: 1, avg_score: '4.0/5', comment: 'Vuelta a alquilar con nosotros' }
        ]
      },
      { id: 'ENC-2026-Q4-SUSCRIPCION', name: 'Encuesta Programas Suscripción', target: 'Clientes con suscripción activa > 3 meses', created: '2026-09-15', response_rate: '52%', responses_received: 89, responses_target: 171, status: 'active', sections: [
          { section: 'Selección vehículos', questions: 3, avg_score: '4.3/5', comment: 'Variedad, actualizaciones modelo' },
          { section: 'Proceso cambio vehículo', questions: 2, avg_score: '4.5/5', comment: 'Facilidad, tiempo entrega' },
          { section: 'Mantenimiento incluido', questions: 3, avg_score: '4.7/5', comment: 'Cobertura completa, sin sorpresas' },
          { section: 'Servicio técnico', questions: 3, avg_score: '4.2/5', comment: 'Respuesta tiempos, calidad reparaciones' },
          { section: 'Flexibilidad contrato', questions: 2, avg_score: '4.0/5', comment: 'Cambios de plazo, cancelación si es necesario' },
          { section: 'Comparación con propiedad', questions: 2, avg_score: '4.4/5', comment: 'Relación coste vs beneficios' }
        ]
      },
      { id: 'ENC-2026-Q4-TALLER', name: 'Encuesta Servicio Técnico Taller', target: 'Clientes con servicio últimos 90 días', created: '2026-09-20', response_rate: '47%', responses_received: 156, responses_target: 332, status: 'active', sections: [
          { section: 'Atención recepción', questions: 2, avg_score: '4.3/5', comment: 'Amabilidad, diagnóstico inicial' },
          { section: 'Transparencia precio', questions: 3, avg_score: '3.9/5', comment: 'Presupuesto claro, cambios comunicados' },
          { section: 'Calidad reparación', questions: 3, avg_score: '4.6/5', comment: 'Defectos rectificados, durabilidad' },
          { section: 'Cumplimiento plazo', questions: 2, avg_score: '4.1/5', comment: 'Entrega puntual, respeto estimado' },
          { section: 'Experiencia de cortesía', questions: 2, avg_score: '4.4/5', comment: 'Coche de sustitución, zona espera' },
          { section: 'Recomendación taller', questions: 1, avg_score: '4.2/5', comment: 'Volvería, recomendaría' }
        ]
      }
    ],
    key_metrics: [
      { metric: 'Net Promoter Score (NPS) Venta', current: 48, benchmark: 50, trend: 'stagnant' },
      { metric: 'Customer Satisfaction (CSAT) Alquiler', current: 4.1, benchmark: 4.3, trend: 'declining', concern: 'Precio vs valor bajando' },
      { metric: 'Customer Effort Score (CES) Suscripción', current: 1.8, benchmark: 1.5, trend: 'improving' },
      { metric: 'Overall Brand Satisfaction', current: 4.2, benchmark: 4.4, trend: 'stable' }
    ],
    actions_pending: [
      { action: 'Mejorar transparencia TAE en proceso venta', priority: 'high', owner: 'Responsable Finanzas', deadline: '2026-10-20' },
      { action: 'Capacitación staff atención devoluciones alquiler', priority: 'medium', owner: 'Gestor Flota', deadline: '2026-10-31' },
      { action: 'Revisar política de cargos por combustible y daños', priority: 'high', owner: 'Responsable Operaciones', deadline: '2026-10-15' },
      { action: 'Crear protocolo respuesta 24h para soporte alquiler', priority: 'high', owner: 'Gestor Flota', deadline: '2026-10-10' }
    ]
  }
});
