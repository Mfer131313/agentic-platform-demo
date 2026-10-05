/* Autopista Multimotor · alarma con aprobación: stock crítico BMW X3 + taller saturado por ausencia mecánico.
 * Escenario de la demo con datos sintéticos (MFM). Las funciones reciben el contexto H de la escena
 * (W workflow, C condición evaluada, sc alcance vigente, ids generados al aprobar, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Stock de vehículos disponibles por marca (2026-10-07 07:30). */
  const STOCK = [
    { brand: 'BMW', model: 'X3', trim: '20d', units: 1, critical: true, incoming: '2026-10-14', reorder: 5 },
    { brand: 'BMW', model: 'X5', trim: '40d', units: 8, critical: false, incoming: '2026-10-21', reorder: 3 },
    { brand: 'Audi', model: 'Q3', trim: '40 TDI', units: 12, critical: false, incoming: null, reorder: 5 },
    { brand: 'Audi', model: 'Q5', trim: 'e-tron', units: 3, critical: false, incoming: '2026-10-15', reorder: 4 },
    { brand: 'Volkswagen', model: 'Golf', trim: '1.5 TSI', units: 15, critical: false, incoming: null, reorder: 6 },
    { brand: 'Volkswagen', model: 'Tiguan', trim: '2.0 TDI', units: 7, critical: false, incoming: '2026-10-18', reorder: 5 },
    { brand: 'Skoda', model: 'Superb', trim: '2.0 TSI', units: 4, critical: false, incoming: '2026-10-19', reorder: 3 },
    { brand: 'Skoda', model: 'Octavia', trim: '1.5 TSI', units: 11, critical: false, incoming: null, reorder: 5 }
  ];

  /* Estado del taller: capacidad, especialistas, órdenes en cola. */
  const WORKSHOP = {
    total_capacity: 100,
    current_load: 70,
    specialists: [
      { brand: 'BMW', technicians: 5, available: 5, on_leave: 0 },
      { brand: 'Audi', technicians: 4, available: 4, on_leave: 0 },
      { brand: 'Volkswagen', technicians: 5, available: 3, on_leave: 1, note: 'medical_leave' },
      { brand: 'Skoda', technicians: 3, available: 3, on_leave: 0 }
    ],
    orders_queue: 23,
    scheduled_maintenance: 15,
    warranty_work: 8
  };

  /* Flota de alquiler: disponibilidad de 1000 vehículos. */
  const RENTAL_FLEET = {
    total: 1000,
    available: 847,
    on_maintenance: 78,
    rented: 75,
    utilization: 0.753,
    weekly_bookings: 200
  };

  /* Incidentes ordenados por timestamp. */
  const INCIDENTS = [
    { time: '05:30', severity: 'critical', title: 'Stock crítico: BMW X3', detail: '1 unidad disponible. Próxima recepción 14/10/2026. Cliente en espera.', status: 'escalated', owner: 'Jefe Venta BMW' },
    { time: '06:00', severity: 'high', title: 'Taller: ausencia de mecánico VW', detail: 'Baja médica. Capacidad reducida 30%. Reprogramación de mantenimiento preventivo.', status: 'in-progress', owner: 'Jefe Taller' },
    { time: '07:15', severity: 'medium', title: 'Retraso Audi Q3: pintura', detail: 'VIN-2026-MAD-AUDI-07 detectó rayón en transporte. Repinte: +2h. ETA revisada 17:00.', status: 'in-progress', owner: 'Jefe Taller' },
    { time: '07:30', severity: 'low', title: 'Reunión proveedores seguros', detail: 'Negociación Q4. Oficinas centrales Madrid. 11:00 hoy.', status: 'scheduled', owner: 'Responsable Operaciones' },
    { time: '06:00', severity: 'medium', title: 'Salesforce lag 15-20 min', detail: 'Retraso en sync de inventario con SAP. IT investigando. Usar datos SAP como referencia.', status: 'investigating', owner: 'Responsable Operaciones' }
  ];

  /* Métricas de KPI con umbrales. */
  const KPI_TRACKING = [
    { kpi: 'Entregas programadas hoy', threshold: '> 5', current: 8, status: 'ok' },
    { kpi: 'Órdenes taller en cola', threshold: '< 30', current: 23, status: 'ok' },
    { kpi: 'Ingresos proyectados hoy', threshold: '> 25000 EUR', current: 28500, status: 'ok' },
    { kpi: 'Flota disponible', threshold: '> 70%', current: 84.7, status: 'ok' },
    { kpi: 'Utilización alquiler', threshold: '> 70%', current: 75.3, status: 'ok' }
  ];

  /* Reglas de escalada automática. */
  const ESCALATION_RULES = [
    { trigger: 'Stock BMW/Audi < 2 unidades', action: 'Avisar Jefe Venta + Brand Manager', priority: 'critical' },
    { trigger: 'Retraso entrega > 4 horas', action: 'Notificar cliente + Finanzas', priority: 'critical' },
    { trigger: 'Taller sin personal > 50%', action: 'Escalar a Responsable Operaciones + CEO', priority: 'high' },
    { trigger: 'Flota disponible < 70%', action: 'Activar rentals backup + notification', priority: 'high' }
  ];

  /* Funciones de cálculo para el contexto H. */
  const criticalStock = (sc) => STOCK.filter((s) => s.critical).length;
  const workshopLoad = (sc) => Math.round((WORKSHOP.current_load / WORKSHOP.total_capacity) * 100);
  const workshopCapacity = (sc) => {
    const totalTechs = WORKSHOP.specialists.reduce((s, x) => s + x.available, 0);
    return Math.round((totalTechs / WORKSHOP.specialists.reduce((s, x) => s + x.technicians, 0)) * 100);
  };
  const rentalUtilization = (sc) => RENTAL_FLEET.utilization * 100;

  agenticPack('autopista', {
    alarma: {
      nav: 'Alarmas operativas',
      title: 'Centro de control de incidentes',
      icon: 'alert',
      page_title: 'Autopista Multimotor · Alertas y escaladas',
      alarm_id: 'ALM-AMS-0730',
      alarm_time: '07:30',
      source_system: 'ERP Integrado',
      asset: 'Centro operativo Madrid',
      location: 'Marqués de Soria · Madrid',
      facility_noun: 'concesionario',
      workflow_topic: 'operaciones comerciales',
      policy_ref: 'OPE-ALERT-001',
      procedures: 'OPE-ALERT-001 · OPE-STOCK-002 · OPE-WORKSHOP-003',
      decider_short: 'Operaciones',
      approval_node: 'Aprobación de operaciones',
      incidents: INCIDENTS,
      escalation_rules: ESCALATION_RULES,
      kpi_tracking: KPI_TRACKING,
      stock_summary: {
        total_critical: criticalStock(),
        total_models: STOCK.length,
        critical_brands: ['BMW X3']
      },
      workshop_summary: {
        current_load: workshopLoad(),
        capacity_pct: workshopCapacity(),
        orders_queue: WORKSHOP.orders_queue,
        specialists_absent: 1
      },
      rental_summary: {
        total: RENTAL_FLEET.total,
        available: RENTAL_FLEET.available,
        utilization_pct: rentalUtilization(),
        weekly_demand: RENTAL_FLEET.weekly_bookings
      },
      chart: {
        title: 'Estado operativo por línea de negocio',
        sub: '2026-10-07 07:30 · Autopista Multimotor Madrid',
        metrics: [
          { line: 'Venta directa', status: 'critical', detail: 'Stock bajo' },
          { line: 'Alquiler', status: 'ok', detail: 'Utilización 75.3%' },
          { line: 'Taller', status: 'warning', detail: 'Capacidad 70%' },
          { line: 'Suscripciones', status: 'ok', detail: '171 clientes activos' }
        ]
      },
      event_kv: [
        ['Centro operativo', 'Marqués de Soria · Madrid · 4 líneas de negocio'],
        ['Flota total', 'Venta (78 en stock) + Alquiler (1000) + Subscripción (171 activos)'],
        ['Sistemas', 'Salesforce CRM, SAP ERP, Odoo Inventory, iCare Workshop'],
        ['Especialistas', '4 marcas (BMW, Audi, VW, Skoda) · 17 técnicos · 1 ausencia médica']
      ],
      events: [
        { time: '05:30', end: '05:35', text: 'Alerta: Stock BMW X3 bajo (1 unidad)', system: 'SAP', tone: 'critical' },
        { time: '06:00', end: '08:00', text: 'Ausencia: Técnico especializado VW (baja médica)', system: 'HR', tone: 'high' },
        { time: '06:00', end: '06:20', text: 'Sync delay: Salesforce → SAP (15-20 min lag)', system: 'CRM', tone: 'medium' },
        { time: '07:15', end: '07:45', text: 'En curso: Reparación pintura Audi Q3 (VIN-2026-MAD-AUDI-07)', system: 'Workshop', tone: 'medium' }
      ]
    }
  });
})();
