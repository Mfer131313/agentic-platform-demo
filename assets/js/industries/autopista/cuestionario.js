/* Autopista Multimotor · cuestionario de satisfacción. Encuestas por línea de negocio (MFM).
 * Las funciones reciben el contexto H de la escena. */
(function () {
  'use strict';

  /* Surveys activas. */
  const SURVEYS = [
    {
      id: 'ENC-VENTA',
      name: 'Encuesta Venta Directa',
      target_group: 'Clientes compra últimos 30 días',
      response_rate: 34,
      responses: 127,
      target: 375,
      status: 'active',
      sections: [
        { section: 'Información pre-compra', score: 4.2, detail: 'Claridad specs, opciones financieras' },
        { section: 'Proceso venta', score: 4.5, detail: 'Velocidad paperwork, cortesía' },
        { section: 'Transparencia TAE', score: 3.8, detail: 'Claridad en cuotas mensuales' },
        { section: 'Entrega vehículo', score: 4.6, detail: 'Puntualidad, estado, documentación' },
        { section: 'Satisfacción general', score: 4.3, detail: 'Recomendación' }
      ]
    },
    {
      id: 'ENC-ALQUILER',
      name: 'Encuesta Rent-a-Car',
      target_group: 'Clientes devolución últimos 60 días',
      response_rate: 41,
      responses: 218,
      target: 530,
      status: 'active',
      sections: [
        { section: 'Reserva y entrega', score: 4.4, detail: 'Facilidad plataforma, check-in' },
        { section: 'Condición vehículo', score: 4.2, detail: 'Limpieza, mantenimiento' },
        { section: 'Soporte 24h', score: 3.9, detail: 'Disponibilidad, respuesta incidencias' },
        { section: 'Devolución', score: 4.1, detail: 'Inspección clara, resolución' },
        { section: 'Precio vs valor', score: 3.7, detail: 'Tarifa justa, extras justificados' },
        { section: 'Lealtad', score: 4.0, detail: 'Vuelta a alquilar' }
      ]
    },
    {
      id: 'ENC-SUSCRIPCION',
      name: 'Encuesta Programas Suscripción',
      target_group: 'Clientes suscripción > 3 meses',
      response_rate: 52,
      responses: 89,
      target: 171,
      status: 'active',
      sections: [
        { section: 'Selección vehículos', score: 4.3, detail: 'Variedad, actualizaciones' },
        { section: 'Cambio vehículo', score: 4.5, detail: 'Facilidad, tiempo entrega' },
        { section: 'Mantenimiento', score: 4.7, detail: 'Cobertura completa' },
        { section: 'Servicio técnico', score: 4.2, detail: 'Tiempos respuesta, calidad' },
        { section: 'Flexibilidad', score: 4.0, detail: 'Cambios, cancelación' },
        { section: 'vs propiedad', score: 4.4, detail: 'Relación coste vs beneficios' }
      ]
    },
    {
      id: 'ENC-TALLER',
      name: 'Encuesta Servicio Técnico',
      target_group: 'Clientes servicio últimos 90 días',
      response_rate: 47,
      responses: 156,
      target: 332,
      status: 'active',
      sections: [
        { section: 'Atención recepción', score: 4.3, detail: 'Amabilidad, diagnóstico' },
        { section: 'Transparencia precio', score: 3.9, detail: 'Presupuesto claro' },
        { section: 'Calidad reparación', score: 4.6, detail: 'Defectos rectificados' },
        { section: 'Cumplimiento plazo', score: 4.1, detail: 'Entrega puntual' },
        { section: 'Cortesía', score: 4.4, detail: 'Coche sustitución, zona espera' },
        { section: 'Recomendación', score: 4.2, detail: 'Volvería, recomendaría' }
      ]
    }
  ];

  /* Métricas clave. */
  const KEY_METRICS = [
    { metric: 'NPS (Venta)', value: 48, benchmark: 50, trend: 'stable', detail: 'Detractor: transparencia TAE' },
    { metric: 'CSAT (Alquiler)', value: 4.1, benchmark: 4.3, trend: 'declining', detail: 'Problema: precio vs valor' },
    { metric: 'CES (Suscripción)', value: 1.8, benchmark: 1.5, trend: 'improving', detail: 'Esfuerzo cliente en declive' },
    { metric: 'Brand Satisfaction', value: 4.2, benchmark: 4.4, trend: 'stable', detail: 'Global: ligeramente bajo' }
  ];

  /* Acciones prioritarias. */
  const PENDING_ACTIONS = [
    { action: 'Mejorar transparencia TAE en venta', priority: 'high', owner: 'Finanzas', deadline: '2026-10-20' },
    { action: 'Capacitación staff devoluciones alquiler', priority: 'medium', owner: 'Flota', deadline: '2026-10-31' },
    { action: 'Revisar política cargos combustible/daños', priority: 'high', owner: 'Operaciones', deadline: '2026-10-15' },
    { action: 'Protocolo soporte 24h alquiler', priority: 'high', owner: 'Flota', deadline: '2026-10-10' }
  ];

  /* Funciones para contexto H. */
  const activeSurveys = (sc) => SURVEYS.filter((s) => s.status === 'active').length;
  const avgResponseRate = (sc) => Math.round(SURVEYS.reduce((s, s2) => s + s2.response_rate, 0) / SURVEYS.length);
  const avgNPS = (sc) => Math.round(KEY_METRICS.find((m) => m.metric.includes('NPS')).value);

  agenticPack('autopista', {
    cuestionario: {
      nav: 'Encuestas de satisfacción',
      title: 'Centro de calidad y satisfacción cliente',
      icon: 'star',
      page_title: 'Autopista Multimotor · Satisfacción cliente',
      summary: '4 encuestas activas (venta, alquiler, suscripción, taller). NPS 48 (benchmark 50). CSAT alquiler bajando (precio vs valor). Respuesta media 44%. 4 acciones prioritarias para octubre.',
      status: 'operational',
      active_surveys: activeSurveys(),
      avg_response_rate: avgResponseRate(),
      surveys: SURVEYS,
      key_metrics: KEY_METRICS,
      pending_actions: PENDING_ACTIONS,
      chart: {
        title: 'Satisfacción por línea de negocio',
        sub: '2026-10-07 · Autopista Multimotor',
        satisfaction_scores: [
          { line: 'Venta', nps: 48, csat: 4.3, trend: 'stable' },
          { line: 'Alquiler', nps: 42, csat: 4.1, trend: 'declining' },
          { line: 'Suscripción', nps: 52, csat: 4.4, trend: 'improving' },
          { line: 'Taller', nps: 50, csat: 4.2, trend: 'stable' }
        ],
        top_concerns: [
          { issue: 'Transparencia TAE (venta)', impact: 'High', action: 'Mejorar términos finanziación' },
          { issue: 'Precio vs valor (alquiler)', impact: 'High', action: 'Revisar estructura tarifas' },
          { issue: 'Soporte 24h (alquiler)', impact: 'Medium', action: 'Crear protocolo respuesta' },
          { issue: 'Cargos daños (alquiler)', impact: 'Medium', action: 'Revisar política cargos' }
        ]
      },
      event_kv: [
        ['Venta', 'NPS 48 · CSAT 4.3 · Respuesta 34% · Preocupación: transparencia APR'],
        ['Alquiler', 'NPS 42 · CSAT 4.1 (declina) · Respuesta 41% · Problema: precio vs valor'],
        ['Suscripción', 'NPS 52 · CSAT 4.4 · Respuesta 52% · Mejorando: satisfacción mantenimiento'],
        ['Taller', 'NPS 50 · CSAT 4.2 · Respuesta 47% · Estable: calidad + disponibilidad']
      ]
    }
  });
})();
