agenticPack('autopista', {
  procedimientos: {
    title: 'Procedimientos operativos',
    subtitle: 'Workflows y procesos estandarizados',
    type: 'process-documentation',
    procedures: [
      {
        id: 'PROC-VENTA-001',
        name: 'Venta directa de vehículos',
        owner: 'Jefe de Venta',
        description: 'Proceso completo de venta desde consulta inicial hasta entrega y matriculación',
        steps: [
          { step: 1, action: 'Contacto cliente', details: 'Recibir consulta (presencial, llamada, email, chat), registrar en CRM Salesforce' },
          { step: 2, action: 'Asesoramiento vehículo', details: 'Presentar opciones disponibles, especificaciones técnicas, opciones de financiación' },
          { step: 3, action: 'Test drive', details: 'Programar test drive (30-45min), completar autorización prueba' },
          { step: 4, action: 'Negociación y oferta', details: 'Presentar cotización escrita, márgenes por marca en SAP, obtener aprobación inicial' },
          { step: 5, action: 'Solicitud financiación', details: 'Recopilar documentos cliente, enviar a banco, esperar pre-aprobación (24-48h)' },
          { step: 6, action: 'Redacción contrato', details: 'Generar contrato borrador (DocuSign), revisar términos, comunicar TAE exacta' },
          { step: 7, action: 'Firma digital', details: 'Enviar vía DocuSign, esperar firma cliente y banco (72h máximo)' },
          { step: 8, action: 'Preparación entrega', details: 'Coordinar con taller para inspección final, limpieza, carga combustible' },
          { step: 9, action: 'Entrega vehículo', details: 'Entrega llaves, documentación, recorrer características, solicitar firma de conformidad' },
          { step: 10, action: 'Matriculación', details: 'Gestionar cita Tráfico, obtener placa y permiso circulación en 5-10 días' }
        ],
        duration: '5-10 días',
        key_systems: ['Salesforce CRM', 'SAP ERP', 'DocuSign', 'Sistema Banco', 'Registro Tráfico'],
        success_metrics: 'Venta cerrada en < 10 días, satisfacción cliente > 4.2/5'
      },
      {
        id: 'PROC-ALQUILER-001',
        name: 'Proceso de alquiler rent-a-car',
        owner: 'Gestor Flota Alquiler',
        description: 'Reserva, entrega y devolución de vehículos alquiler de flota 1000 unidades',
        steps: [
          { step: 1, action: 'Búsqueda y reserva', details: 'Cliente busca en web/app, ve disponibilidad real (Odoo Inventory), reserva con depósito' },
          { step: 2, action: 'Confirmación reserva', details: 'Email de confirmación con itinerario, tarifa desglosada, póliza seguros' },
          { step: 3, action: 'Check-in', details: 'Cliente llega a mostrador, verificar identidad y carnet conducir, asignar vehículo' },
          { step: 4, action: 'Inspección entrega', details: 'Fotografias 360°, registrar estado combustible y kilometraje en sistema, test luces/frenos' },
          { step: 5, action: 'Entrega vehículo', details: 'Entrega llaves, explicar ubicación depósito combustible, sistemas de emergencia' },
          { step: 6, action: 'Monitoreo uso', details: 'Telemetría GPS activa, alertas de exceso velocidad o salida zona permitida' },
          { step: 7, action: 'Gestión incidencias', details: 'Cliente reporta daño/accidente via app 24h, coordinación con taller' },
          { step: 8, action: 'Devolución vehículo', details: 'Cliente devuelve en hora convenida, inspección rápida, fotografias comparativa' },
          { step: 9, action: 'Evaluación estado', details: 'Taller verifica daños vs entrada, avalúo si hay desperfectos, genera reporte' },
          { step: 10, action: 'Liquidación', details: 'Cálculo cargo combustible/daños, procesamiento depósito, reembolso o factura adicional' }
        ],
        duration: '1-30 días (según duración alquiler)',
        key_systems: ['Web/App Reservas', 'Odoo Inventory', 'Telemetría GPS', 'SAP Finanzas', 'Stripe Pagos'],
        success_metrics: 'Ocupación flota > 85%, daños reportados < 5%, devoluciones en 15min'
      },
      {
        id: 'PROC-SUSCRIPCION-001',
        name: 'Gestión de suscripción vehicular',
        owner: 'Responsable Suscripciones',
        description: 'Contratación, cambios de vehículo y mantenimiento incluido (ciclos 6 meses)',
        steps: [
          { step: 1, action: 'Consulta y asesoramiento', details: 'Cliente explora catálogo disponible, filtrar por marca/tipo, presupuesto mensual' },
          { step: 2, action: 'Selección vehículo', details: 'Cliente elige vehículo y plan (6/12/24 meses), validar crédito' },
          { step: 3, action: 'Contrato suscripción', details: 'Generar contrato (DocuSign), detallar qué incluye (mantenimiento, seguros, rueda de repuesto)' },
          { step: 4, action: 'Pago inicial', details: 'Procesar primer pago mensual (Stripe), enviar recibo y calendario de pagos' },
          { step: 5, action: 'Entrega vehículo', details: 'Coordinar con taller, inspección inicial, entrega llaves y documentación' },
          { step: 6, action: 'Mantenimiento preventivo', details: 'Agenda automática según km/meses: cambio aceite (10k km), revisión (20k km), ITV (12 meses)' },
          { step: 7, action: 'Cambio de vehículo', details: 'A los 6 meses: cliente puede cambiar modelo/marca sin coste adicional, devolución antiguo' },
          { step: 8, action: 'Gestión daños', details: 'Daños normales incluidos, daños accidente > €500 cubiertos por póliza cliente' },
          { step: 9, action: 'Renovación', details: 'A final de ciclo: ofrecer renovación o finalización, procesar último pago' },
          { step: 10, action: 'Devolución final', details: 'Inspección final taller, limpiar, preparar para siguiente cliente o subasta' }
        ],
        duration: '6/12/24 meses',
        key_systems: ['Salesforce CRM', 'SAP Finanzas', 'DocuSign', 'Stripe Pagos', 'iCare Taller'],
        success_metrics: 'Tasa retención > 70%, cambios en tiempo < 3 días, satisfacción > 4.4/5'
      },
      {
        id: 'PROC-TALLER-001',
        name: 'Servicio técnico y reparación',
        owner: 'Jefe de Taller',
        description: 'Recepción, diagnóstico, reparación y entrega de vehículos en taller por marca',
        steps: [
          { step: 1, action: 'Recepción vehículo', details: 'Cliente explica síntomas/solicitud, registrar km, datos contacto en iCare' },
          { step: 2, action: 'Inspección inicial', details: 'Técnico asesor verifica vehículo, lista de puntos a revisar' },
          { step: 3, action: 'Diagnóstico', details: 'Análisis OBD, pruebas funcionales, identificar causas raíz' },
          { step: 4, action: 'Presupuesto', details: 'Generar presupuesto detallado (piezas + mano de obra), enviar cliente para aprobación' },
          { step: 5, action: 'Aprobación cliente', details: 'Cliente aprueba por teléfono o app, autoriza reparación y acceso a datos vehículo' },
          { step: 6, action: 'Reparación', details: 'Técnico especializado por marca ejecuta trabajos, registra tiempos y materiales en iCare' },
          { step: 7, action: 'Control calidad', details: 'Jefe taller revisa trabajo, reprueba si no cumple estándares, realiza ajustes' },
          { step: 8, action: 'Prueba carretera', details: 'Test drive 10-20km para verificar funcionamiento correcto' },
          { step: 9, action: 'Limpieza', details: 'Lavar vehículo interno/externo, detalle de llantas y interior' },
          { step: 10, action: 'Entrega', details: 'Entregar vehículo, explicar trabajos realizados, entregar factura y resguardo' }
        ],
        duration: '1-5 días (según complejidad)',
        key_systems: ['iCare Taller', 'SAP Inventario Piezas', 'OBD Diagnóstico', 'Sistema Citas'],
        success_metrics: 'Primera vez correcto > 95%, tiempo promedio < 2 días, satisfacción > 4.5/5'
      }
    ]
  }
});
