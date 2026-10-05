/* Autopista Multimotor · traza de vehículo. Ciclo de vida de un BMW X3 en venta (MFM).
 * Las funciones reciben el contexto H de la escena. */
(function () {
  'use strict';

  /* VIN y datos del vehículo. */
  const VIN = 'VIN-2026-MAD-BMW-04';
  const VEHICLE = {
    brand: 'BMW',
    model: 'X3',
    trim: '20d xDrive',
    year: 2026,
    color: 'Gris Oyster',
    price: 67500,
    sku: 'BMW-X3-20D-2026-004'
  };

  /* Timeline de eventos: arribada → inventario → consulta cliente → venta → entrega. */
  const TIMELINE = [
    { date: '2026-09-20', time: '09:15', step: 1, status: 'completed', event: 'Recepción del fabricante', detail: 'Llegada a centro logístico Madrid desde Dingolfing (Alemania).', system: 'Logistics', actor: 'Equipo recepción' },
    { date: '2026-09-20', time: '14:30', step: 2, status: 'completed', event: 'Inspección técnica', detail: 'Verificación: motor, transmisión, sistemas de seguridad, pinturas. Estado: OK sin defectos.', system: 'QA', actor: 'Inspector técnico' },
    { date: '2026-09-21', time: '08:00', step: 3, status: 'completed', event: 'Registro en inventario', detail: 'Carga en SAP ERP + Odoo Inventory. Disponible para venta.', system: 'SAP', actor: 'Jefe stock' },
    { date: '2026-09-22', time: '10:45', step: 4, status: 'completed', event: 'Consulta de cliente', detail: 'Cliente Roberto Pérez (DNI 12345678) llama: BMW X3 gris. Revisión online de ficha. Proposición: 35% down, financiación a 60 meses.', system: 'Salesforce CRM', actor: 'Comercial venta BMW' },
    { date: '2026-09-23', time: '16:20', step: 5, status: 'completed', event: 'Pre-aprobación financiera', detail: 'Banco Sabadell: límite de crédito €47,000. APR 3.99%. Mensualidad: €747 (60 meses). Aprobado.', system: 'Finance', actor: 'Finanzas + Banco' },
    { date: '2026-09-24', time: '11:00', step: 6, status: 'completed', event: 'Firma de contrato', detail: 'Cliente firma en oficina Madrid. Condiciones: Entrada €23,625 (35%). Seguro integral incluido. Entrega: 07/10.', system: 'DocuSign', actor: 'Comercial venta' },
    { date: '2026-09-25', time: '09:30', step: 7, status: 'completed', event: 'Preparación para entrega', detail: 'Vehículo movido a zona de presentación. Detalles finales: limpieza, revisión software, matriculación en proceso.', system: 'Logistics', actor: 'Preparador entregas' },
    { date: '2026-10-07', time: '16:00', step: 8, status: 'in-progress', event: 'Entrega a cliente', detail: 'Recepción cliente, explicación sistemas, entrega llaves. Matriculación: MAD-2026-BMW (pendiente).', system: 'Salesforce', actor: 'Gestor entrega' }
  ];

  /* Sistemas involucrados en el ciclo. */
  const SYSTEMS_INVOLVED = [
    { system: 'Logistics (MES)', role: 'Recepción, almacenaje, movimientos' },
    { system: 'QA (Inspección)', role: 'Verificación técnica y visual' },
    { system: 'SAP ERP', role: 'Inventario, stock, coste' },
    { system: 'Odoo Inventory', role: 'Seguimiento real-time' },
    { system: 'Salesforce CRM', role: 'Lead → Oportunidad → Contrato' },
    { system: 'Finance (Stripe)', role: 'Procesamiento de pagos' },
    { system: 'Banco Sabadell', role: 'Financiación (APR 3.99%)' },
    { system: 'DocuSign', role: 'Contratos digitales' }
  ];

  /* Funciones para cálculo de contexto H. */
  const daysInSystem = (sc) => 17;
  const completedSteps = (sc) => TIMELINE.filter((e) => e.status === 'completed').length;
  const totalSteps = (sc) => TIMELINE.length;
  const progressPct = (sc) => Math.round((completedSteps(sc) / totalSteps(sc)) * 100);

  agenticPack('autopista', {
    trace: {
      nav: 'Ejemplo: BMW X3',
      title: 'Traza de vehículo: ciclo de vida en venta',
      icon: 'path',
      page_title: 'Autopista Multimotor · Traza VIN-2026-MAD-BMW-04',
      vin: VIN,
      vehicle: VEHICLE,
      summary: 'Vehículo BMW X3 gris entrada el 20/09. Cliente aprobado 23/09 (APR 3.99%, Banco Sabadell). Entrega en progreso 07/10 (matriculación pendiente).',
      status: 'in-delivery',
      status_pct: progressPct(),
      days_in_system: daysInSystem(),
      timeline: TIMELINE,
      finance: {
        price: VEHICLE.price,
        down_payment: 23625,
        down_pct: 35,
        financed: 43875,
        monthly: 747,
        months: 60,
        apr: 3.99,
        bank: 'Banco Sabadell',
        customer: 'Roberto Pérez (DNI 12345678)'
      },
      systems_involved: SYSTEMS_INVOLVED,
      chart: {
        title: 'Progreso de traza: BMW X3 gris',
        sub: 'VIN-2026-MAD-BMW-04 · Desde recepción a entrega',
        steps_completed: completedSteps(),
        steps_total: totalSteps(),
        current_step: 'Entrega a cliente (en progreso)',
        timeline_labels: ['Recepción', 'Inspección', 'Inventario', 'Consulta', 'Finanzas', 'Contrato', 'Preparación', 'Entrega']
      },
      event_kv: [
        ['VIN', 'VIN-2026-MAD-BMW-04 · BMW X3 20d gris oyster 2026'],
        ['Cliente', 'Roberto Pérez (DNI 12345678) · Madrid'],
        ['Precio', '67,500 EUR · Financiación Banco Sabadell (APR 3.99%)'],
        ['Sistemas', 'SAP + Odoo + Salesforce + Finance + DocuSign + Logistics']
      ]
    }
  });
})();
