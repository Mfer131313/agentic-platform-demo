/* Autopista Multimotor · resumen del turno (escena «turno»). Escenario de la demo con datos sintéticos (MFM). */
agenticPack('autopista', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((360 + i * 5) / 60)).padStart(2, '0')}:${String((360 + i * 5) % 60).padStart(2, '0')}`;
    /* Carga del taller de marca (% sobre capacidad efectiva), cada 5 min de 06:00 a 07:30. */
    const LOAD = [70, 70, 71, 70, 71, 70, 71, 72, 76, 81, 86, 90, 94, 98, 101, 103, 104, 103, 102];
    const AGENT = 'Parte diario de operaciones';

    const items = [
      { code: 'RCL-GOLF', name: 'Recall ABS Volkswagen Golf (REC-VW-2026-001)', tag: 'RECALL', area: 'Flota de alquiler y taller de marca VW', metric: 'vehículos pendientes de actualización', reading: '35 vehículos', baseline: '0 vehículos', limits: 'aviso > 10 · crítico > 25 vehículos', status: 'critical',
        note: 'Recall de seguridad: 35 de los 47 Golf afectados de la flota siguen sin actualizar el módulo ABS (12 hechos). Plazo del fabricante: 15/11/2026. Citarlos y retirar de la calle los pendientes hasta la actualización.' },
      { code: 'STK-X3', name: 'Stock BMW X3 20d', area: 'Campa de Marqués de Soria · Odoo Inventario', metric: 'unidades disponibles', reading: '1 unidad', baseline: '5 unidades', limits: 'aviso < 3 · crítico < 2 unidades', status: 'critical',
        note: 'Queda 1 BMW X3 en campa con un cliente en espera; la próxima recepción es el 14/10/2026. Reservar la unidad y pedir a BMW que adelante la entrega.' },
      { code: 'TEC-VW', name: 'Taller de marca Volkswagen', area: 'Taller Marqués de Soria · iCare Taller', metric: 'carga sobre capacidad efectiva', reading: '102 % carga', baseline: '70 % carga', limits: 'aviso > 85 · crítico > 100 %', status: 'critical',
        note: 'Baja médica de un técnico VW: capacidad efectiva −30 % y carga por encima del 100 %. Reasignar las órdenes urgentes a los técnicos Skoda y Audi y reprogramar el mantenimiento preventivo.' },
      { code: 'APR-01', name: 'Financiación Banco Sabadell · APR del contrato', area: 'Salesforce CRM · SAP (finanzas)', metric: 'diferencia entre APR facturado y APR contratado', reading: '+0,26 pp', baseline: '3,99 % contrato', limits: 'aviso > 0,10 · crítico > 0,25 pp', status: 'critical',
        note: 'El contrato firmado por José María López fija el 3,99 %; la factura de financiación aplica el 4,25 % (sobrecoste reclamado de 2.400 EUR). Finanzas debe decidir la rectificación.' },
      { code: 'Q3-AUD', name: 'Entrega Audi Q3 · repintado', area: 'Taller de carrocería', metric: 'retraso sobre la hora de entrega', reading: '+2 h', baseline: '0 h', limits: 'aviso > 1 · crítico > 4 h', status: 'warning',
        note: 'Rayón detectado en el transporte: repintado de 2 h adicionales, nueva hora estimada 17:00. Avisar al cliente y reprogramar la entrega.' },
      { code: 'ALQ-MTO', name: 'Flota de alquiler en mantenimiento', area: 'Flota de alquiler (~1.000 vehículos)', metric: 'vehículos en taller a la vez', reading: '78 vehículos', baseline: '60 vehículos', limits: 'aviso > 70 · crítico > 100 vehículos', status: 'warning',
        note: 'Mantenimiento en paralelo por encima de lo habitual con demanda corporativa alta: riesgo de quedarse sin disponibilidad para los contratos de la semana.' },
      { code: 'SUS-REN', name: 'Renovaciones de suscripción de 6 meses', area: 'Suscripciones · Salesforce CRM', metric: 'renovaciones en los próximos 7 días', reading: '12 renovaciones', baseline: '8 renovaciones', limits: 'aviso > 10 · crítico > 16', status: 'warning',
        note: 'Riesgo de baja si el taller no absorbe el mantenimiento de las suscripciones; oportunidad de ofrecer un modelo superior en la renovación.' },
      { code: 'ENT-HOY', name: 'Entregas de vehículos programadas', area: 'Ventas · Salesforce CRM', metric: 'entregas programadas hoy', reading: '8 entregas', baseline: '≥ 5 entregas', limits: 'aviso < 5 · crítico < 3', status: null, note: '' },
      { code: 'COL-TAL', name: 'Cola de órdenes de taller', area: 'Taller · iCare Taller', metric: 'órdenes en cola', reading: '23 órdenes', baseline: '< 30 órdenes', limits: 'aviso > 30 · crítico > 40', status: null, note: '' },
      { code: 'ALQ-ACT', name: 'Vehículos de alquiler en circulación', area: 'Alquiler · SAP ERP', metric: 'contratos de alquiler activos hoy', reading: '156 vehículos', baseline: '140 vehículos', limits: 'aviso < 100 · crítico < 60', status: null, note: '' },
      { code: 'PAG-STR', name: 'Cobro de cuotas de suscripción', area: 'Stripe Pagos', metric: 'cuotas cobradas', reading: '98,6 %', baseline: '98 %', limits: 'aviso < 96 · crítico < 93 %', status: null, note: '' }
    ];

    const news = [
      { id: 'OPS-2026-2201', equipment: 'RCL-GOLF', priority: 'Urgente · Recall', tone: 'crit', owner: 'Jefe de taller y Gestor de marca VW',
        action: 'Citar los 35 Golf de la flota pendientes (47 afectados, 12 ya actualizados) y retirar de alquiler los que no estén actualizados antes del 15/11/2026. Responde a REC-VW-2026-001.' },
      { id: 'OPS-2026-2202', equipment: 'STK-X3', priority: 'Alta', tone: 'crit', owner: 'Jefe de turno de ventas',
        action: 'Reservar el único BMW X3 para el cliente en espera, pedir a BMW que adelante la recepción del 14/10/2026 y ofrecer el Audi Q5 e-tron como alternativa premium.' },
      { id: 'OPS-2026-2203', equipment: 'TEC-VW', priority: 'Alta', tone: 'crit', owner: 'Jefe de taller',
        action: 'Carga del taller VW al 102 % con un técnico menos (capacidad −30 %): reasignar las órdenes urgentes a técnicos Skoda y Audi y reprogramar el mantenimiento preventivo.' },
      { id: 'OPS-2026-2204', equipment: 'Q3-AUD', priority: 'Media', tone: 'warn', owner: 'Jefe de taller',
        action: 'Repintado del Audi Q3 por el rayón del transporte (+2 h, nueva hora estimada 17:00): avisar al cliente por SMS y reprogramar la entrega de hoy.' },
      { id: 'OPS-2026-2205', equipment: 'ALQ-MTO', priority: 'Media', tone: 'warn', owner: 'Gestor de flota de alquiler',
        action: '78 vehículos de alquiler en taller a la vez (referencia 60): escalonar el mantenimiento y reservar los Golf pendientes de recall para la ventana de menor demanda.' }
    ];
    const updates = [
      { id: 'CLM-2026-001', equipment: 'APR-01', priority: 'Alta (propuesta)', tone: 'crit', owner: 'Responsable de finanzas',
        action: 'Se añade la evidencia de la discrepancia (APR 4,25 % facturado frente a 3,99 % del contrato firmado, 2.400 EUR) al caso abierto de José María López. No se crea un caso duplicado.' },
      { id: 'SUB-REN-2026-10', equipment: 'SUS-REN', priority: 'Sin cambios', tone: 'warn', owner: 'Responsable de suscripciones',
        action: 'Se añade la lectura de hoy (12 renovaciones en 7 días) a la lista de renovaciones abierta. No se crea un ticket duplicado.' }
    ];

    return {
      title: 'Madrid (Marqués de Soria) · turno de mañana',
      nav: 'Resumen del turno',
      clockLabel: 'Hora del hub',
      decider: 'Responsable de operaciones',
      kpis: [
        { label: 'Órdenes de taller afectadas', value: 9, sub: '7 vehículos · carga del taller VW al 102 %', icon: 'wrench', tone: 'crit', href: '#alarma' },
        { label: 'Entregas en riesgo', value: 3, sub: '8 programadas hoy · la primera a las 11:00', icon: 'box', href: '#alarma' },
        { label: 'Reclamaciones abiertas', value: 1, sub: 'CLM-2026-001 · respuesta antes del 09/10/2026', icon: 'mail', href: '#reclamacion' },
        { label: 'Indicadores con alerta', value: '7 de 11', sub: '4 críticos · 3 avisos · lecturas de las 07:00', icon: 'activity', action: 'scroll-parte' }
      ],
      map: {
        title: 'Plano del hub · Madrid (Marqués de Soria)',
        sub: 'Lecturas del parte de las 07:00 y del taller a las 07:30 · pulsa un elemento para ver su detalle',
        icon: 'factory',
        readonly: 'Agentic Platform lee Salesforce CRM, SAP ERP, Odoo Inventario e iCare Taller; no modifica contratos ni facturas por su cuenta',
        zones: [
          { id: 'vta', title: 'Ventas y entregas', sub: 'Salesforce CRM · BMW, Audi, Volkswagen, Skoda y Seat', items: [
            { code: 'CRM-VTA', name: 'Pipeline de venta directa', reading: null, status: null, note: 'Foco del día en Audi Q3 (márgenes altos) y en el cliente en espera del BMW X3.', kv: [['Marcas', 'BMW · Audi · Volkswagen · Skoda · Seat'], ['Sistema', 'Salesforce CRM']] },
            { code: 'STK-X3', name: 'Stock BMW X3 20d', reading: '1 ud', status: 'crit', go: 'alarma', goLabel: 'Abrir la alarma',
              note: 'Queda 1 unidad en campa con un cliente en espera; la próxima recepción es el 14/10/2026. Reservarla y pedir adelanto a BMW.',
              kv: [['Reposición', '5 unidades'], ['Límites', 'aviso < 3 · crítico < 2 unidades'], ['Próxima recepción', '14/10/2026'], ['Fuente', 'Odoo Inventario']] },
            { code: 'Q3-AUD', name: 'Audi Q3 · entrega con repintado', reading: '+2 h', status: 'warn', note: 'Rayón detectado en el transporte: repintado de 2 h, nueva hora estimada 17:00.', kv: [['Referencia', '0 h de retraso'], ['Nueva hora', '17:00'], ['Fuente', 'iCare Taller']] },
            { code: 'ENT-HOY', name: 'Entregas de hoy', reading: '8', status: 'ok', kv: [['Referencia', '≥ 5 entregas'], ['La primera', '11:00']] }
          ] },
          { id: 'tal', title: 'Taller de marca', sub: 'iCare Taller · Volkswagen, Audi, Skoda y BMW', items: [
            { code: 'TEC-VW', name: 'Taller Volkswagen', reading: '102 %', status: 'crit', go: 'alarma', goLabel: 'Abrir la alarma',
              note: 'Baja médica de un técnico VW: capacidad efectiva −30 %. Pico del 104 % a las 07:20, 40 min por encima del 85 % y 20 min por encima del 100 %.',
              kv: [['Referencia', '70 % de carga'], ['Límites', 'aviso > 85 · crítico > 100 %'], ['Órdenes afectadas', '9 · 7 vehículos'], ['Regla', 'POL-OPS-012']] },
            { code: 'COL-TAL', name: 'Cola de órdenes de taller', reading: '23', status: 'ok', kv: [['Referencia', '< 30 órdenes']] },
            { code: 'RCL-GOLF', name: 'Recall ABS Volkswagen Golf', reading: '35 pend.', status: 'crit', tags: ['REC-VW-2026-001'], go: 'retirada', goLabel: 'Abrir la retirada',
              note: 'Recall de seguridad sobre el módulo ABS: 47 Golf de la flota afectados, 12 actualizados y 35 pendientes. Plazo del fabricante: 15/11/2026.',
              kv: [['Afectados', '47 vehículos'], ['Pendientes', '35'], ['Plazo', '15/11/2026'], ['Fuente', 'iCare Taller · SAP ERP']] },
            { code: 'TEC-SKO', name: 'Taller Skoda y Audi', reading: null, status: null, note: 'Técnicos con capacidad para absorber las órdenes urgentes de Volkswagen.', kv: [['Uso', 'Redirección de órdenes urgentes']] }
          ] },
          { id: 'alq', title: 'Alquiler', sub: 'Flota de ~1.000 vehículos', items: [
            { code: 'ALQ-ACT', name: 'Vehículos en circulación', reading: '156', status: 'ok', kv: [['Referencia', '140 vehículos'], ['Sistema', 'SAP ERP']] },
            { code: 'ALQ-MTO', name: 'Flota en mantenimiento', reading: '78', status: 'warn', note: 'Mantenimiento en paralelo por encima de lo habitual con demanda corporativa alta.', kv: [['Referencia', '60 vehículos'], ['Límites', 'aviso > 70 · crítico > 100'], ['Fuente', 'iCare Taller']] }
          ] },
          { id: 'sus', title: 'Suscripciones', sub: 'Contratos de 6 meses', items: [
            { code: 'SUS-REN', name: 'Renovaciones próximas', reading: '12', status: 'warn', note: 'Riesgo de baja si el taller no absorbe el mantenimiento; oportunidad de upsell a un modelo superior.', kv: [['Referencia', '8 renovaciones'], ['Activas', '171 suscripciones']] },
            { code: 'PAG-STR', name: 'Cobro de cuotas', reading: '98,6 %', status: 'ok', kv: [['Referencia', '98 %'], ['Sistema', 'Stripe Pagos']] }
          ] },
          { id: 'fin', title: 'Financiación y firma', sub: 'Banco Sabadell · DocuSign · SAP ERP', items: [
            { code: 'APR-01', name: 'Contrato de financiación de José María López', reading: '+0,26 pp', status: 'crit', tags: ['VIN-2026-MAD-SEAT-03', 'CLM-2026-001'], go: 'reclamacion', goLabel: 'Abrir la reclamación',
              note: 'El contrato firmado fija un APR del 3,99 % y la factura aplica el 4,25 %. Sobrecoste reclamado: 2.400 EUR. La rectificación la decide Finanzas.',
              kv: [['APR contrato', '3,99 %'], ['APR facturado', '4,25 %'], ['Entidad', 'Banco Sabadell'], ['Contrato', 'DocuSign']] },
            { code: 'DOC-SIGN', name: 'Contratos firmados (DocuSign)', reading: null, status: null, kv: [['Uso', 'Contratos de venta, alquiler y suscripción']] }
          ] },
          { id: 'com', title: 'Comunicación', sub: 'Atención al cliente y equipo', items: [
            { code: 'SMS', name: 'Avisos a clientes (Twilio SMS)', reading: null, status: null, kv: [['Uso', 'Cambios de hora de entrega y citas de taller']] },
            { code: 'SLK', name: 'Canal «Operaciones · Madrid»', reading: null, status: null, kv: [['Sistema', 'Slack'], ['Uso', 'Resumen del parte diario']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'wrench',
          title: 'Taller VW · sobrecarga por ausencia de técnico',
          meta: ['Alarma 06:50 · ALM-TLR-0650'],
          systems: ['iCare Taller'],
          body: 'Pico del 104 % de carga a las 07:20; 40 min por encima del 85 %. 9 órdenes de 7 vehículos afectadas y el único BMW X3 en campa sigue sin asignar. La primera entrega comprometida sale a las 11:00.'
        },
        complaint: {
          icon: 'mail',
          title: 'Reclamación CLM-2026-001 · APR 4,25 % en lugar de 3,99 %',
          meta: ['02/10 10:14', 'José María López', 'Cliente particular · financiación Banco Sabadell'],
          body: 'Reclama 2.400 EUR de sobrecoste: el contrato firmado fija el 3,99 % y la factura aplica el 4,25 %. Vehículo',
          trace: 'VIN-2026-MAD-SEAT-03',
          after: 'El cliente exige respuesta por escrito en 5 días hábiles.',
          due: 'Vence el 09/10',
          goLabel: 'Abrir reclamación'
        }
      },
      chart: {
        title: 'Taller VW · carga sobre capacidad',
        sub: 'Taller de marca Volkswagen · referencia 70 % · ahora 102 % (07:30)',
        icon: 'wrench',
        tabLabel: 'Carga',
        chart: {
          series: LOAD.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '%',
          threshold: { value: 85, label: 'Aviso 85 %', legend: 'Aviso 85 % · 40 min por encima' },
          critical: { value: 100, label: 'Crítico 100 %', legend: 'Crítico 100 % · 20 min por encima' },
          peak: { x: '07:20', y: 104, label: '104 % · 07:20' },
          yTicks: [60, 75, 90, 105],
          xTicks: ['06:00', '06:30', '07:00', '07:30'],
          annotations: [{ x: '06:50', label: 'Alarma 06:50' }],
          bands: [
            { from: '06:35', to: '07:00', label: 'Baja del técnico VW' },
            { from: '07:10', to: '07:25', label: 'Órdenes urgentes sin técnico', tone: 'warn' }
          ],
          seriesLabel: 'Carga (iCare Taller)',
          shadeLabel: 'Sobrecarga desde 06:50'
        },
        events: [
          { time: '06:35', end: '06:40', text: 'Un técnico VW comunica su baja médica por SMS', tone: 'brand', tag: 'TEC-VW' },
          { time: '06:40', end: '07:00', text: 'La capacidad efectiva del taller VW baja un 30 %', tone: 'brand', tag: 'TEC-VW' },
          { time: '06:50', text: 'Alarma de iCare: carga del taller VW por encima del 85 %', tone: 'crit', tag: 'ALM-TLR-0650' },
          { time: '07:10', end: '07:25', text: 'La carga supera el 100 %: 3 entregas de hoy dependen de órdenes de este taller', tone: 'warn', tag: 'ENT-HOY' },
          { time: '07:20', text: 'Pico del 104 %; el Jefe de taller empieza a reasignar órdenes a Skoda y Audi', tone: 'warn', tag: 'TEC-SKO' },
          { time: '07:30', text: 'La carga baja al 102 %, todavía por encima de 100 %', tone: 'warn' }
        ],
        cause: 'Hipótesis a confirmar por el Jefe de taller: la baja médica de un técnico VW (capacidad −30 %) coincide con 23 órdenes en cola, 9 de ellas ligadas a entregas de hoy y al recall ABS del Golf.',
        system: 'iCare Taller',
        footer: 'Lectura cada 5 min'
      },
      parte: {
        agent: AGENT,
        title: 'Parte diario de operaciones',
        sub: 'Lecturas de las 07:00 · 11 indicadores del hub de Madrid · umbrales de operaciones',
        colItem: 'Indicador',
        systems: ['Salesforce CRM', 'SAP ERP'],
        inboxTitle: 'Parte diario de operaciones · lecturas de las 07:00',
        inboxCount: '11 indicadores',
        inboxPending: '4 críticos, uno de ellos un recall de seguridad (Golf ABS), y 3 avisos pendientes de revisar.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'Odoo Inventario', action: 'Lee el stock de 8 modelos de 5 marcas y las recepciones previstas', result: 'BMW X3: 1 unidad; próxima recepción el 14/10/2026', ms: 640 },
          { agent: AGENT, system: 'iCare Taller', action: 'Consulta la carga del taller, la cola de órdenes y las ausencias de técnicos', result: 'Taller VW al 102 %; 23 órdenes en cola', ms: 520 },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compara cada lectura con sus umbrales de operaciones (11 indicadores)', result: '4 críticos · 3 avisos · 4 sin incidencias', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'SAP ERP', action: 'Comprueba los recalls abiertos y la flota afectada', result: 'REC-VW-2026-001: 35 de 47 Golf pendientes; plazo 15/11/2026', ms: 380, tone: 'crit' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Busca casos y renovaciones abiertas de los indicadores con alerta', result: 'CLM-2026-001 (APR) y SUB-REN-2026-10 (renovaciones)', ms: 470 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Cruza las alertas con las reclamaciones abiertas', result: 'CLM-2026-001: APR 4,25 % frente a 3,99 % en VIN-2026-MAD-SEAT-03', ms: 350, tone: 'warn' },
          { agent: AGENT, system: 'Modelo de lenguaje', action: 'Redacta la acción recomendada de cada alerta (7 llamadas)', result: '7 borradores, cada uno con su procedimiento de referencia', ms: 6100 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Crea OPS-2026-2201 para RCL-GOLF · prioridad urgente · recall', result: 'Creado y asignado a Jefe de taller y Gestor de marca VW', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Crea OPS-2026-2202 para STK-X3 · prioridad alta', result: 'Creado y asignado a Jefe de turno de ventas', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'iCare Taller', action: 'Crea OPS-2026-2203 para TEC-VW · prioridad alta', result: 'Creado y asignado a Jefe de taller', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'iCare Taller', action: 'Crea OPS-2026-2204 para Q3-AUD · prioridad media', result: 'Creado y asignado a Jefe de taller', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'SAP ERP', action: 'Crea OPS-2026-2205 para ALQ-MTO · prioridad media', result: 'Creado y asignado a Gestor de flota de alquiler', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Actualiza CLM-2026-001 (APR de José María López) con la lectura de hoy', result: 'Evidencia añadida · prioridad alta propuesta · sin caso duplicado', ms: 220 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Actualiza SUB-REN-2026-10 (renovaciones) con la lectura de hoy', result: 'Lectura añadida · sin ticket duplicado', ms: 220 },
          { agent: AGENT, system: 'Slack', action: 'Publica el resumen en el canal «Operaciones · Madrid»', result: 'Enviado: 4 críticos, 3 avisos y 5 tickets', ms: 410, tone: 'ok' }
        ],
        stats: [
          { label: 'Indicadores revisados', value: 11 },
          { label: 'Tickets creados', value: 5, tone: 'ok' },
          { label: 'Casos actualizados, sin duplicar', value: 2 },
          { label: 'Recalls de seguridad pendientes', value: 1, tone: 'crit' }
        ],
        relation: {
          title: 'Posible relación con la reclamación CLM-2026-001',
          body: 'La financiación de VIN-2026-MAD-SEAT-03 (José María López, Banco Sabadell) factura un APR del 4,25 % frente al 3,99 % del contrato firmado: +0,26 pp y 2.400 EUR de sobrecoste. El mismo desajuste de condiciones puede afectar a otros contratos tramitados con la misma plantilla de financiación.',
          more: 'Finanzas debería revisar los contratos de financiación firmados en las últimas semanas antes de responder. A confirmar por el Responsable de finanzas.',
          plain: 'La financiación de VIN-2026-MAD-SEAT-03 (José María López, Banco Sabadell) factura un APR del 4,25 % frente al 3,99 % del contrato firmado: +0,26 pp y 2.400 EUR de sobrecoste. Finanzas debería revisar los contratos firmados en las últimas semanas con la misma plantilla antes de responder. A confirmar por el Responsable de finanzas.',
          go: 'reclamacion',
          goLabel: 'Abrir la reclamación'
        },
        policy: 'Política aplicada: los tickets de operaciones se crean sin aprobación previa; retirar un vehículo de la calle, rectificar una factura de financiación o reembolsar al cliente requiere la aprobación del Responsable de operaciones (POL-OPS-015).',
        channel: 'Operaciones · Madrid',
        resultSummary: '5 tickets creados, 2 casos existentes actualizados y resumen publicado en Slack.',
        auditRequest: 'Madrid · lecturas de las 07:00 · 11 indicadores',
        auditNew: 'Ticket de operaciones creado',
        auditUpdate: 'Caso de operaciones actualizado',
        reportTitle: 'Parte diario de operaciones · Madrid',
        reportCode: 'PD-APM-20261007',
        reportMeta: [['Hub', 'Madrid (Marqués de Soria)'], ['Turno', 'Mañana'], ['Indicadores revisados', '11'], ['Críticos · avisos', '4 · 3']],
        reportSummary: 'De 11 indicadores revisados, 4 están en estado crítico y 3 en aviso. El recall ABS del Volkswagen Golf tiene 35 vehículos de la flota pendientes. Se han creado 5 tickets de operaciones y se han actualizado 2 casos existentes, sin duplicarlos.',
        signatures: [{ role: 'Responsable de operaciones', note: 'Revisado' }, { role: 'Jefe de taller', note: 'Recibido' }]
      },
      presenter: {
        say: [
          'Así empieza el turno el Responsable de operaciones en Madrid: lo que pide una decisión, en una sola bandeja.',
          'Los datos llegan de sus sistemas: clientes y casos de Salesforce, pedidos y flota de SAP, stock de Odoo y órdenes de iCare Taller. Aquí son sintéticos, pero coherentes entre sí.',
          'El plano del hub resume la operación de un vistazo: gris lo normal, color lo que pide atención. El taller VW está en rojo; al pulsarlo se ven sus órdenes, el recall del Golf y las entregas que dependen de él.',
          'Tres asuntos: la alarma del taller VW de las 06:50 (9 órdenes; la primera entrega sale a las 11:00), la reclamación CLM-2026-001 de José María López y el parte con 4 críticos, uno de ellos un recall de seguridad.'
        ],
        sayBefore: ['Generar parte diario: revisa 11 indicadores, no duplica casos abiertos y crea los tickets. Fijaos en el tiempo.'],
        sayAfter: [
          'Relación que encuentra Agentic Platform: el APR facturado no coincide con el contrato firmado de VIN-2026-MAD-SEAT-03 y puede haber más contratos con la misma plantilla. Nadie ha tenido que cruzar tres sistemas.',
          'Y no duplica: dos casos ya abiertos se actualizan en lugar de abrir tickets nuevos.'
        ],
        next: 'Pulsar «Generar parte diario» y comentar el registro mientras se ejecuta.',
        nextAfter: 'Ir a «De palabras a workflow» (flecha derecha) para crear la respuesta a la alarma del taller VW a partir del procedimiento escrito.'
      }
    };
  })()
});
