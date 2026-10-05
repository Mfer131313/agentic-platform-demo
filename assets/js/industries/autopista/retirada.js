/* Autopista Multimotor · retirada y recalls. Gestión de boletines de servicio (MFM).
 * Las funciones reciben el contexto H de la escena. */
(function () {
  'use strict';

  /* Recalls activos: Volkswagen, BMW, Audi, Skoda. */
  const RECALLS = [
    {
      id: 'REC-VW-2026-001',
      manufacturer: 'Volkswagen',
      model: 'Golf/Passat',
      years: '2024-2026',
      severity: 'critical',
      title: 'Recall: Fallo potencial sistema ABS',
      detail: 'Defecto en módulo ABS. Riesgo reducción presión de frenado. Afecta ~2500 unidades en España.',
      affected_fleet: 47,
      serviced: 12,
      pending: 35,
      deadline: '2026-11-15',
      action: 'Actualización firmware + sustitución sensor presión',
      status: 'in-progress'
    },
    {
      id: 'REC-BMW-2026-002',
      manufacturer: 'BMW',
      model: 'X5/X7',
      years: '2023-2025',
      severity: 'high',
      title: 'Recall: Riesgo incendio batería híbrida',
      detail: 'Riesgo cortocircuito interno en batería híbrida. Solución: sustitución completa + refrigeración mejorada.',
      affected_fleet: 18,
      serviced: 3,
      pending: 15,
      deadline: '2026-11-30',
      action: 'Sustitución batería + garantía 10 años',
      status: 'in-progress'
    },
    {
      id: 'REC-AUDI-2026-001',
      manufacturer: 'Audi',
      model: 'A4/A6',
      years: '2022-2024',
      severity: 'medium',
      title: 'Recall: Revisión cierres puertas',
      detail: 'Riesgo apertura no deseada puerta trasera bajo frenada brusca. Solución: reajuste + lubricación.',
      affected_fleet: 52,
      serviced: 52,
      pending: 0,
      deadline: '2026-10-01',
      action: 'Reajuste mecanismo, lubricación',
      status: 'completed'
    },
    {
      id: 'REC-SKODA-2026-001',
      manufacturer: 'Skoda',
      model: 'Superb/Octavia',
      years: '2023-2025',
      severity: 'low',
      title: 'Boletín: Actualización software infotainment',
      detail: 'Actualización infotainment por estabilidad. No mandatory pero recomendado (~45 min).',
      affected_fleet: 31,
      serviced: 0,
      pending: 31,
      deadline: '2026-12-31',
      action: 'Software update, ofrecer en mantenimiento',
      status: 'scheduled'
    }
  ];

  /* Proceso de notificación y ejecución. */
  const NOTIFICATION_PROCESS = [
    { step: 1, action: 'Detección recall', timeline: 'Inmediato', detail: 'Boletín fabricante o AEPD' },
    { step: 2, action: 'Verificación BD', timeline: '2 horas', detail: 'Cruzar VIN/modelo con lista' },
    { step: 3, action: 'Contacto cliente', timeline: '24 horas', detail: 'Email + SMS + llamada' },
    { step: 4, action: 'Programación cita', timeline: '5 días', detail: 'Sistema calendario taller' },
    { step: 5, action: 'Ejecución recall', timeline: '30 min - 3h', detail: 'Taller especializado por marca' },
    { step: 6, action: 'Cierre expediente', timeline: 'Inmediato', detail: 'Documento sellado + registro' }
  ];

  /* Funciones para contexto H. */
  const totalRecalls = (sc) => RECALLS.length;
  const criticalRecalls = (sc) => RECALLS.filter((r) => r.severity === 'critical').length;
  const totalAffected = (sc) => RECALLS.reduce((s, r) => s + r.affected_fleet, 0);
  const totalCompliance = (sc) => {
    const total = totalAffected(sc);
    const done = RECALLS.reduce((s, r) => s + r.serviced, 0);
    return Math.round((done / total) * 100);
  };

  agenticPack('autopista', {
    retirada: {
      nav: 'Recalls y retiradas',
      title: 'Centro de gestión de recalls',
      icon: 'tool',
      page_title: 'Autopista Multimotor · Recalls de seguridad',
      summary: '4 recalls activos en flota. Crítica: VW Golf ABS (47 unidades). Alta: BMW X5 batería (18 unidades). Complétada: Audi cierres (52/52). Programada: Skoda infotainment (31 pendientes).',
      status: 'in-progress',
      total_recalls: totalRecalls(),
      critical_count: criticalRecalls(),
      total_affected: totalAffected(),
      compliance_pct: totalCompliance(),
      recalls: RECALLS,
      notification_process: NOTIFICATION_PROCESS,
      chart: {
        title: 'Estado de cumplimiento de recalls',
        sub: '2026-10-07 · Autopista Multimotor',
        compliance_by_recall: [
          { recall: 'VW-001 (ABS)', compliance: '25.5%', status: 'at-risk', deadline: '2026-11-15' },
          { recall: 'BMW-002 (Batería)', compliance: '16.7%', status: 'at-risk', deadline: '2026-11-30' },
          { recall: 'AUDI-001 (Puertas)', compliance: '100%', status: 'completed', deadline: '2026-10-01' },
          { recall: 'SKODA-001 (SW)', compliance: '0%', status: 'scheduled', deadline: '2026-12-31' }
        ],
        overall_rate: totalCompliance()
      },
      event_kv: [
        ['Crítica', 'REC-VW-2026-001: ABS VW Golf · 47 unidades · 35 pendientes · deadline 15/11'],
        ['Riesgo', 'REC-BMW-2026-002: Batería híbrida BMW X5 · 18 unidades · 15 pendientes · deadline 30/11'],
        ['Completada', 'REC-AUDI-2026-001: Cierres puertas Audi · 52/52 · finalizada'],
        ['Próxima', 'REC-SKODA-2026-001: Infotainment Skoda · 31 pendientes · ofrecer en mantenimiento']
      ]
    }
  });
})();
