/* Autopista Multimotor · procedimientos estandarizados. 4 procesos operativos por línea de negocio (MFM).
 * Las funciones reciben el contexto H de la escena. */
(function () {
  'use strict';

  /* Procedimientos estándar: venta, alquiler, suscripción, taller. */
  const PROCEDURES = [
    {
      id: 'PROC-VENTA-001',
      name: 'Venta directa de vehículos',
      owner: 'Jefe de Venta',
      duration: '5-10 días',
      key_systems: ['Salesforce CRM', 'SAP ERP', 'DocuSign', 'Banco', 'Tráfico'],
      steps: [
        { step: 1, action: 'Contacto cliente', detail: 'Recibir consulta, registrar en Salesforce' },
        { step: 2, action: 'Asesoramiento', detail: 'Presentar opciones, especificaciones, financiación' },
        { step: 3, action: 'Test drive', detail: 'Programar test drive 30-45min, autorización' },
        { step: 4, action: 'Negociación', detail: 'Cotización escrita, márgenes en SAP' },
        { step: 5, action: 'Solicitud financiación', detail: 'Documentos cliente, banco (24-48h)' },
        { step: 6, action: 'Redacción contrato', detail: 'DocuSign borrador, revisar TAE exacta' },
        { step: 7, action: 'Firma digital', detail: 'Esperar firma cliente y banco (72h máx)' },
        { step: 8, action: 'Preparación entrega', detail: 'Inspección final, limpieza, combustible' },
        { step: 9, action: 'Entrega vehículo', detail: 'Llaves, documentación, conformidad' },
        { step: 10, action: 'Matriculación', detail: 'Cita Tráfico, placa (5-10 días)' }
      ],
      success_metric: 'Cierre < 10 días, CSAT > 4.2/5'
    },
    {
      id: 'PROC-ALQUILER-001',
      name: 'Proceso rent-a-car (flota 1000)',
      owner: 'Gestor Flota Alquiler',
      duration: '1-30 días',
      key_systems: ['Web/App Reservas', 'Odoo Inventory', 'GPS', 'SAP Finance', 'Stripe'],
      steps: [
        { step: 1, action: 'Búsqueda y reserva', detail: 'Cliente busca web, reserva con depósito' },
        { step: 2, action: 'Confirmación', detail: 'Email con itinerario, tarifa, seguros' },
        { step: 3, action: 'Check-in', detail: 'Verificar identidad, carnet, asignar vehículo' },
        { step: 4, action: 'Inspección entrega', detail: 'Fotos 360°, combustible, km, test luces' },
        { step: 5, action: 'Entrega vehículo', detail: 'Llaves, ubicación combustible, emergencia' },
        { step: 6, action: 'Monitoreo', detail: 'Telemetría GPS activa, alertas velocidad' },
        { step: 7, action: 'Gestión incidencias', detail: 'Cliente reporta daño via app 24h' },
        { step: 8, action: 'Devolución', detail: 'Devolución en hora, inspección rápida' },
        { step: 9, action: 'Evaluación daños', detail: 'Taller verifica vs entrada, avalúo' },
        { step: 10, action: 'Liquidación', detail: 'Cargo combustible/daños, reembolso' }
      ],
      success_metric: 'Ocupación > 85%, daños < 5%, devolución 15min'
    },
    {
      id: 'PROC-SUSCRIPCION-001',
      name: 'Suscripción vehicular (6-24 meses)',
      owner: 'Responsable Suscripciones',
      duration: '6/12/24 meses',
      key_systems: ['Salesforce', 'SAP Finance', 'DocuSign', 'Stripe', 'iCare'],
      steps: [
        { step: 1, action: 'Consulta y asesoramiento', detail: 'Cliente explora catálogo, filtros' },
        { step: 2, action: 'Selección vehículo', detail: 'Elige vehículo y plan, validar crédito' },
        { step: 3, action: 'Contrato suscripción', detail: 'DocuSign: mantenimiento, seguros, incluye' },
        { step: 4, action: 'Pago inicial', detail: 'Stripe: primer pago mensual, recibo' },
        { step: 5, action: 'Entrega vehículo', detail: 'Inspección inicial, llaves, documentación' },
        { step: 6, action: 'Mantenimiento preventivo', detail: 'Agenda automática: 10k, 20k, 12m ITV' },
        { step: 7, action: 'Cambio vehículo', detail: 'A 6 meses: cambio sin coste adicional' },
        { step: 8, action: 'Gestión daños', detail: 'Normales incluidos, accidente > €500 póliza' },
        { step: 9, action: 'Renovación', detail: 'Ofrecer renovación o finalización' },
        { step: 10, action: 'Devolución final', detail: 'Inspección, limpieza, preparar siguiente' }
      ],
      success_metric: 'Retención > 70%, cambios < 3d, CSAT > 4.4/5'
    },
    {
      id: 'PROC-TALLER-001',
      name: 'Servicio técnico especializado',
      owner: 'Jefe de Taller',
      duration: '1-5 días',
      key_systems: ['iCare Taller', 'SAP Piezas', 'OBD', 'Citas'],
      steps: [
        { step: 1, action: 'Recepción vehículo', detail: 'Cliente explica síntomas, registrar km' },
        { step: 2, action: 'Inspección inicial', detail: 'Técnico asesor verifica, lista puntos' },
        { step: 3, action: 'Diagnóstico', detail: 'Análisis OBD, pruebas funcionales' },
        { step: 4, action: 'Presupuesto', detail: 'Detallado (piezas + MOD), enviar cliente' },
        { step: 5, action: 'Aprobación cliente', detail: 'Teléfono o app, autoriza reparación' },
        { step: 6, action: 'Reparación', detail: 'Técnico especializado, registra tiempo' },
        { step: 7, action: 'Control calidad', detail: 'Jefe taller revisa, reprueba si falla' },
        { step: 8, action: 'Prueba carretera', detail: 'Test drive 10-20km verificar' },
        { step: 9, action: 'Limpieza', detail: 'Interno/externo, llantas, interior' },
        { step: 10, action: 'Entrega', detail: 'Explicar trabajos, factura, resguardo' }
      ],
      success_metric: 'Primera correcto > 95%, < 2d, CSAT > 4.5/5'
    }
  ];

  /* Funciones para contexto H. */
  const totalProcedures = (sc) => PROCEDURES.length;
  const procedures_by_owner = (sc) => PROCEDURES.map((p) => p.owner).filter((v, i, a) => a.indexOf(v) === i).length;

  agenticPack('autopista', {
    procedimientos: {
      nav: 'Procedimientos operativos',
      title: 'Centro de procesos estandarizados',
      icon: 'list-check',
      page_title: 'Autopista Multimotor · Procedimientos operativos',
      summary: '4 procedimientos estandarizados: Venta (5-10 días), Alquiler (1-30 días), Suscripción (6-24 meses), Taller (1-5 días). Cada uno con 10 pasos, sistemas, métricas de éxito.',
      status: 'current',
      total_procedures: totalProcedures(),
      procedures: PROCEDURES,
      chart: {
        title: 'Procedimientos operativos por línea de negocio',
        sub: 'Autopista Multimotor · 4 líneas · 40 pasos totales',
        procedures_overview: [
          { proc: 'Venta', steps: 10, duration: '5-10 días', metric: 'CSAT > 4.2' },
          { proc: 'Alquiler', steps: 10, duration: '1-30 días', metric: 'Ocupación > 85%' },
          { proc: 'Suscripción', steps: 10, duration: '6-24 meses', metric: 'Retención > 70%' },
          { proc: 'Taller', steps: 10, duration: '1-5 días', metric: 'Primera correcto > 95%' }
        ]
      },
      event_kv: [
        ['Venta', 'PROC-VENTA-001 · 10 pasos · 5-10 días · Salesforce + SAP + DocuSign + Banco'],
        ['Alquiler', 'PROC-ALQUILER-001 · 10 pasos · 1-30 días · App + Odoo + GPS + Stripe'],
        ['Suscripción', 'PROC-SUSCRIPCION-001 · 10 pasos · 6-24 meses · Salesforce + SAP + iCare'],
        ['Taller', 'PROC-TALLER-001 · 10 pasos · 1-5 días · iCare + OBD + SAP Piezas']
      ]
    }
  });
})();
