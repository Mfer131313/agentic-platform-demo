/* Autopista Multimotor · turno de mañana. Escenario de la demo con datos sintéticos (MFM).
 * Las funciones reciben el contexto H de la escena. */
(function () {
  'use strict';

  /* Datos del turno de operaciones (2026-10-07 07:30). */
  const SHIFT_DATE = '2026-10-07';
  const SHIFT_TIME = '07:30';
  const SHIFT_NAME = 'Turno de mañana';
  const SHIFT_TEAM = 'Équipo central Madrid';

  /* Métricas de KPI por línea de negocio. */
  const KPI_METRICS = [
    { label: 'Entregas programadas hoy', value: 8, unit: '', status: 'ok', threshold: '> 5' },
    { label: 'Órdenes de taller en cola', value: 23, unit: '', status: 'ok', threshold: '< 30' },
    { label: 'Vehículos alquilados hoy', value: 156, unit: '', status: 'ok', threshold: '> 100' },
    { label: 'Suscripciones activas', value: 171, unit: '', status: 'ok', threshold: '> 150' },
    { label: 'Ingresos proyectados (EUR)', value: 28500, unit: 'EUR', status: 'ok', threshold: '> 25000' }
  ];

  /* Incidentes y alertas del turno. */
  const SHIFT_INCIDENTS = [
    { priority: 'critical', type: 'stock', title: 'Stock crítico: BMW X3', detail: '1 unidad en inventario. Cliente en espera. Próxima recepción 14/10/2026.', line: 'Venta', owner: 'Jefe Venta BMW', status: 'escalated' },
    { priority: 'high', type: 'workshop', title: 'Taller: ausencia de técnico VW', detail: 'Baja médica. Capacidad taller -30%. Reprogramar mantenimiento preventivo.', line: 'Taller', owner: 'Jefe Taller', status: 'in-progress' },
    { priority: 'medium', type: 'delivery', title: 'Retraso Audi Q3: pintura', detail: 'Rayón detectado en transporte. Repinte +2 horas. ETA revisada 17:00.', line: 'Venta', owner: 'Jefe Taller', status: 'in-progress' },
    { priority: 'low', type: 'meeting', title: 'Reunión proveedores seguros', detail: 'Negociación Q4 2026. 11:00 en oficinas centrales Madrid.', line: 'Operaciones', owner: 'Responsable Operaciones', status: 'scheduled' }
  ];

  /* Briefing operativo por línea de negocio. */
  const BUSINESS_LINES = [
    { line: 'Venta directa', focus: 'Enfoque en Audi Q3 (márgenes altos). BMW X3 stock crítico.', opportunity: 'Sugerir Audi Q5 e-tron como alternativa premium.', risk: 'Stock bajo para demanda semanal esperada.' },
    { line: 'Alquiler (1000 vehículos)', focus: 'Pico de demanda corporativa (evento FITUR). 156 en circulación hoy.', opportunity: 'Expandir flota Volkswagen/Skoda (menores márgenes, alta rotación).', risk: 'Mantenimiento de 78 vehículos en paralelo.' },
    { line: 'Suscripciones 6 meses', focus: '171 clientes activos. 12 renovaciones próximas.', opportunity: 'Upsell a modelos superiores en renovación.', risk: 'Churn si taller no absorbe demanda de mantenimiento.' },
    { line: 'Taller especializado', focus: 'Capacidad al 70% (23 órdenes en cola). Ausencia técnico VW.', opportunity: 'Redirecto de órdenes urgentes a especialistas Skoda/Audi.', risk: 'Retrasos > 4h pueden escalar a cliente premium.' }
  ];

  /* Funciones para contexto H. */
  const totalKpis = (sc) => KPI_METRICS.length;
  const criticalIncidents = (sc) => SHIFT_INCIDENTS.filter((i) => i.priority === 'critical').length;
  const onTimeDelivery = (sc) => KPI_METRICS.find((k) => k.label.includes('Entregas')).value;

  agenticPack('autopista', {
    turno: {
      nav: 'Turno de mañana',
      title: 'Resumen de operaciones: turno matutino',
      icon: 'briefcase',
      page_title: 'Autopista Multimotor · Turno de mañana (07:30)',
      date: SHIFT_DATE,
      time: SHIFT_TIME,
      shift_name: SHIFT_NAME,
      shift_team: SHIFT_TEAM,
      weekday: 'lunes',
      summary: 'Lunes por la mañana en el hub central de Madrid. Estado crítico: stock BMW X3, ausencia técnico VW. Demanda alta por FITUR (alquiler corporativo). 8 entregas programadas, 171 suscripciones activas.',
      kpis: KPI_METRICS,
      incidents: SHIFT_INCIDENTS,
      business_lines: BUSINESS_LINES,
      briefing: 'Venta: márgenes altos en Audi, stock bajo en premium. Alquiler: demanda corporativa FITUR. Taller: -30% capacidad por ausencia. Suscripción: 12 renovaciones en agenda.',
      critical_count: criticalIncidents(),
      total_metrics: totalKpis(),
      chart: {
        title: 'Estado de KPIs · Turno de mañana',
        sub: '2026-10-07 07:30 · Autopista Multimotor',
        metrics: [
          { kpi: 'Entregas', value: 8, target: 5, status: 'ok' },
          { kpi: 'Taller (cola)', value: 23, target: 30, status: 'ok' },
          { kpi: 'Alquiler (activos)', value: 156, target: 100, status: 'ok' },
          { kpi: 'Suscripciones', value: 171, target: 150, status: 'ok' },
          { kpi: 'Ingresos (EUR)', value: 28500, target: 25000, status: 'ok' }
        ]
      },
      event_kv: [
        ['Turno', 'Mañana (06:00-14:00) · Madrid Marqués de Soria'],
        ['Equipos', 'Venta, Alquiler, Suscripción, Taller especializado · 4 marcas'],
        ['Demanda', 'Evento FITUR (corporativo alquiler) · Stock crítico (BMW X3)'],
        ['Incidentes', '1 crítico (stock) · 3 activos (taller, entrega, reunion)']
      ]
    }
  });
})();
