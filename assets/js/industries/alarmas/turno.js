/* Guardián Ibérica Instalaciones · resumen del turno (escena «turno»). Escenario de la demo con datos sintéticos (MFM). */
agenticPack('alarmas', {
  turno: (function () {
    'use strict';
    /* Paneles sin comunicación 4G en Valencia Norte, de 05:00 a 06:30 (lecturas cada 5 min y el pico de las 05:42). */
    const PANELES = [['05:00', 0], ['05:05', 0], ['05:10', 9], ['05:15', 47], ['05:20', 96], ['05:25', 148], ['05:30', 191], ['05:35', 224], ['05:40', 238], ['05:42', 241], ['05:45', 236], ['05:50', 214], ['05:55', 214], ['06:00', 214], ['06:05', 214], ['06:10', 214], ['06:15', 214], ['06:20', 214], ['06:25', 214], ['06:30', 214]];
    const AGENT = 'Parte diario de operaciones';

    const items = [
      { code: 'COM-4G', name: 'Paneles sin comunicación 4G · Valencia Norte (ALM-COM-0611)', tag: 'ALARMA', area: 'Soporte técnico · Partner Portals de las tres marcas', metric: 'paneles sin comunicación', reading: '214 paneles', baseline: '0 paneles', limits: 'aviso > 50 · crítico > 100 paneles', status: 'critical',
        note: 'Caída de la red 4G desde las 05:10 tras un mantenimiento del operador móvil: 214 paneles (pico de 241 a las 05:42), sobre todo Sector Alarm y Verisure, sin supervisión remota. Conmutar a la vía de respaldo y visitar los 38 sin respaldo.' },
      { code: 'PIR-2607', name: 'Lote PIR-2607-A · detector PIR-200 (REC-2026-1019)', tag: 'RETIRADA', area: 'Almacén y hogares con detector instalado', metric: 'hogares pendientes de aviso', reading: '912 hogares', baseline: '0 hogares', limits: 'aviso > 50 · crítico > 200 hogares', status: 'critical',
        note: 'Batería de litio con riesgo de sobrecalentamiento (fabricante Sentinela Electronics): 1.386 unidades instaladas en 912 hogares (Verisure 540, Sector Alarm 214, Prosegur Alarmas 158), 960 en almacén y 54 devueltas. Objetivo: localizar y avisar en 4 h.' },
      { code: 'FAL-0619', name: 'Cargos de desplazamiento reclamados · Marta Soler Pons (CLM-2026-0619)', area: 'Salesforce CRM · Sector Alarm Partner Hub', metric: 'importe reclamado por falsas alarmas', reading: '78,00 EUR', baseline: '0 EUR', limits: 'aviso > 0 · crítico > 39 EUR', status: 'critical',
        note: 'Dos cargos de desplazamiento de vigilante (2 x 39,00 EUR) por falsas alarmas del 12 y 14/10/2026 en el contrato SA-2026-77412; la clienta amenaza con la baja y una penalización de 180 EUR. Causa raíz: sensor PIR del salón con batería baja sin aviso.' },
      { code: 'COL-SOP', name: 'Cola de la línea técnica', area: 'Soporte técnico · 12 operadores', metric: 'llamadas en espera', reading: '47 llamadas', baseline: '< 12 llamadas', limits: 'aviso > 25 · crítico > 40 llamadas', status: 'critical',
        note: 'La caída de comunicación dispara las llamadas de clientes que ven el aviso de fallo en su panel. Priorizar las de Valencia Norte y enviar un SMS informativo para bajar la cola.' },
      { code: 'SIN-RESP', name: 'Paneles sin vía de respaldo · Valencia Norte', area: 'Soporte técnico · Partner Portals', metric: 'paneles sin respaldo IP ni segunda SIM', reading: '38 paneles', baseline: '0 paneles', limits: 'aviso > 20 · crítico > 50 paneles', status: 'warning',
        note: 'De los 214 paneles caídos, 176 conmutan a la vía de respaldo; los otros 38 no tienen IP ni segunda SIM y requieren visita prioritaria hoy.' },
      { code: 'MNT-VENC', name: 'Mantenimientos preventivos vencidos', area: 'Mantenimiento · SAP Business One', metric: 'revisiones anuales vencidas hace más de 30 días', reading: '27 revisiones', baseline: '15 revisiones', limits: 'aviso > 20 · crítico > 40 revisiones', status: 'warning',
        note: 'Las visitas prioritarias de hoy desplazan revisiones del PR-MAN-004. Reprogramarlas esta semana para no superar el plazo contractual de las marcas.' },
      { code: 'STK-BAT', name: 'Baterías de litio de repuesto', area: 'Almacén de Paterna · SAP Business One', metric: 'unidades disponibles', reading: '420 uds', baseline: '900 uds', limits: 'aviso < 600 · crítico < 300 uds', status: 'warning',
        note: 'La retirada del lote PIR-2607-A y las sustituciones por batería baja consumen stock: pedir reposición antes de que baje de las 300 unidades.' },
      { code: 'INS-HOY', name: 'Instalaciones programadas', area: 'Instalaciones · Salesforce CRM', metric: 'instalaciones programadas hoy', reading: '61 instalaciones', baseline: '≥ 50 instalaciones', limits: 'aviso < 40 · crítico < 25', status: null, note: '' },
      { code: 'MNT-HOY', name: 'Mantenimientos programados', area: 'Mantenimiento · SAP Business One', metric: 'mantenimientos programados hoy', reading: '118 mantenimientos', baseline: '≥ 100 mantenimientos', limits: 'aviso < 80 · crítico < 60', status: null, note: '' },
      { code: 'OT-URG', name: 'Órdenes de trabajo urgentes', area: 'Despacho · Salesforce CRM', metric: 'órdenes urgentes abiertas', reading: '9 órdenes', baseline: '< 15 órdenes', limits: 'aviso > 15 · crítico > 25', status: null, note: '' },
      { code: 'FLT-RUTA', name: 'Furgonetas operativas', area: 'Flota · Samsara Flota', metric: 'furgonetas en ruta', reading: '58 de 62', baseline: '≥ 55 furgonetas', limits: 'aviso < 50 · crítico < 42', status: null, note: '' }
    ];

    const news = [
      { id: 'OT-2026-31101', equipment: 'COM-4G', priority: 'Urgente · Alarma', tone: 'crit', owner: 'Responsable de soporte técnico',
        action: 'Conmutar a la vía de respaldo los 176 paneles que la tienen, verificar la señal de cada uno y abrir la incidencia con el operador móvil. Responde a ALM-COM-0611 y al PR-COM-003.' },
      { id: 'OT-2026-31102', equipment: 'SIN-RESP', priority: 'Alta', tone: 'crit', owner: 'Jefe de mantenimiento',
        action: 'Visita prioritaria a los 38 paneles sin vía de respaldo de Valencia Norte, empezando por los de Sector Alarm: instalar segunda SIM o repetidor IP y comprobar la supervisión remota.' },
      { id: 'OT-2026-31103', equipment: 'PIR-2607', priority: 'Urgente · Retirada', tone: 'crit', owner: 'Responsable de almacén y Atención al cliente',
        action: 'Bloquear los 960 detectores PIR-200 del lote PIR-2607-A en almacén y localizar los 912 hogares con equipo instalado para avisar en 4 h. Responde a REC-2026-1019 y al PR-QLT-006.' },
      { id: 'OT-2026-31104', equipment: 'COL-SOP', priority: 'Media', tone: 'warn', owner: 'Responsable de soporte técnico',
        action: 'Cola de 47 llamadas: derivar las de Valencia Norte a un guion único, reforzar la línea con 2 operadores del turno de tarde y enviar el SMS informativo por Twilio.' },
      { id: 'OT-2026-31105', equipment: 'STK-BAT', priority: 'Media', tone: 'warn', owner: 'Responsable de almacén',
        action: 'Stock de baterías de litio en 420 unidades (referencia 900): pedir reposición al proveedor y reservar las necesarias para las sustituciones del lote PIR-2607-A.' }
    ];
    const updates = [
      { id: 'CLM-2026-0619', equipment: 'FAL-0619', priority: 'Alta (propuesta)', tone: 'crit', owner: 'Atención al cliente',
        action: 'Se añade la evidencia (sensor PIR del salón con batería baja sin aviso, falsas alarmas del 12 y 14/10/2026) al caso abierto de Marta Soler Pons. No se crea un caso duplicado.' },
      { id: 'MNT-VENC-2026-10', equipment: 'MNT-VENC', priority: 'Sin cambios', tone: 'warn', owner: 'Jefe de mantenimiento',
        action: 'Se añade la lectura de hoy (27 revisiones vencidas) a la lista de mantenimientos vencidos abierta. No se crea un ticket duplicado.' }
    ];

    return {
      title: 'Paterna (Valencia) · turno de mañana',
      nav: 'Resumen del turno',
      clockLabel: 'Hora del hub',
      decider: 'Responsable de operaciones',
      kpis: [
        { label: 'Paneles sin comunicación', value: 214, sub: 'Valencia Norte · 38 sin vía de respaldo', icon: 'activity', tone: 'crit', href: '#alarma' },
        { label: 'Visitas prioritarias', value: 38, sub: '61 instalaciones y 118 mantenimientos hoy · 9 urgentes', icon: 'wrench', href: '#alarma' },
        { label: 'Reclamaciones abiertas', value: 1, sub: 'CLM-2026-0619 · acuse en 24 h, resolución en 10 días hábiles', icon: 'mail', href: '#reclamacion' },
        { label: 'Indicadores con alerta', value: '7 de 11', sub: '4 críticos · 3 avisos · lecturas de las 06:00', icon: 'activity', action: 'scroll-parte' }
      ],
      map: {
        title: 'Plano del hub · Paterna (Valencia)',
        sub: 'Lecturas del parte de las 06:00 y de los paneles a las 06:30 · pulsa un elemento para ver su detalle',
        icon: 'factory',
        readonly: 'Agentic Platform lee Salesforce CRM, SAP Business One, los Partner Portals de las tres marcas y Samsara Flota; no modifica contratos, facturas ni la configuración de los paneles por su cuenta',
        zones: [
          { id: 'ins', title: 'Instalaciones', sub: 'Salesforce CRM · 74 técnicos instaladores', items: [
            { code: 'INS-HOY', name: 'Instalaciones de hoy', reading: '61', status: 'ok', kv: [['Referencia', '≥ 50 instalaciones'], ['Procedimiento', 'PR-INS-001 (grado 2)'], ['Delegaciones', 'Paterna · Alicante · Castellón']] },
            { code: 'CRM-INS', name: 'Contratos de marca', reading: null, status: null, note: 'Cartera de unas 38.000 instalaciones activas: Verisure 15.200, Sector Alarm 12.100 y Prosegur Alarmas 10.700.', kv: [['Marcas', 'Verisure · Sector Alarm · Prosegur Alarmas'], ['Sistema', 'Salesforce CRM']] },
            { code: 'PIR-2607', name: 'Lote PIR-2607-A · hogares con detector', reading: '912', status: 'crit', tags: ['REC-2026-1019'], go: 'retirada', goLabel: 'Abrir la retirada',
              note: '1.386 detectores PIR-200 instalados en 912 hogares: Verisure 540, Sector Alarm 214 y Prosegur Alarmas 158. Batería de litio con riesgo de sobrecalentamiento.',
              kv: [['Recibidas', '2.400 unidades'], ['Instaladas', '1.386'], ['En almacén', '960'], ['Devueltas', '54'], ['Fabricante', 'Sentinela Electronics']] }
          ] },
          { id: 'man', title: 'Mantenimiento', sub: 'SAP Business One · revisión anual PR-MAN-004', items: [
            { code: 'MNT-HOY', name: 'Mantenimientos de hoy', reading: '118', status: 'ok', kv: [['Referencia', '≥ 100 mantenimientos'], ['Urgentes', '9 órdenes']] },
            { code: 'SIN-RESP', name: 'Paneles sin vía de respaldo', reading: '38', status: 'warn', go: 'alarma', goLabel: 'Abrir la alarma',
              note: 'Paneles de Valencia Norte sin IP ni segunda SIM: sin supervisión remota hasta la visita.', kv: [['Límites', 'aviso > 20 · crítico > 50 paneles'], ['Alarma', 'ALM-COM-0611']] },
            { code: 'MNT-VENC', name: 'Revisiones vencidas', reading: '27', status: 'warn', note: 'Revisiones anuales con más de 30 días de retraso; las visitas prioritarias de hoy las desplazan.', kv: [['Referencia', '15 revisiones'], ['Límites', 'aviso > 20 · crítico > 40']] }
          ] },
          { id: 'sop', title: 'Soporte técnico', sub: 'Línea técnica y CRA · 12 operadores', items: [
            { code: 'COM-4G', name: 'Paneles sin comunicación 4G', reading: '214', status: 'crit', go: 'alarma', goLabel: 'Abrir la alarma',
              note: 'Caída desde las 05:10 tras un mantenimiento del operador móvil. Pico de 241 paneles a las 05:42; alarma a las 05:50. Principalmente Sector Alarm y Verisure.',
              kv: [['Referencia', '0 paneles'], ['Límites', 'aviso > 50 · crítico > 100 paneles'], ['Alarma', 'ALM-COM-0611'], ['Procedimiento', 'PR-COM-003']] },
            { code: 'COL-SOP', name: 'Cola de la línea técnica', reading: '47', status: 'crit', note: 'Llamadas de clientes que ven el aviso de fallo de comunicación en su panel.', kv: [['Referencia', '< 12 llamadas'], ['Límites', 'aviso > 25 · crítico > 40']] },
            { code: 'PRT-HUB', name: 'Partner Portals', reading: null, status: null, kv: [['Sistemas', 'Verisure Partner Portal · Sector Alarm Partner Hub · Prosegur Partner Portal'], ['Uso', 'Estado de paneles y aperturas de incidencia']] }
          ] },
          { id: 'pos', title: 'Postventa y atención al cliente', sub: 'Salesforce CRM · Twilio SMS', items: [
            { code: 'FAL-0619', name: 'Reclamación de Marta Soler Pons', reading: '78 EUR', status: 'crit', tags: ['INS-2026-VLC-04417', 'CLM-2026-0619'], go: 'reclamacion', goLabel: 'Abrir la reclamación',
              note: 'Dos cargos de desplazamiento de vigilante (2 x 39,00 EUR) por falsas alarmas del 12 y 14/10/2026. Causa raíz: sensor PIR con batería baja sin aviso. La compensación la decide el Responsable de operaciones.',
              kv: [['Contrato', 'Sector Alarm SA-2026-77412'], ['Penalización por baja', '180 EUR'], ['Plazo', 'Acuse 24 h · resolución 10 días hábiles'], ['Procedimiento', 'PR-SOP-007']] },
            { code: 'SMS', name: 'Avisos a clientes (Twilio SMS)', reading: null, status: null, kv: [['Uso', 'Incidencias de comunicación, citas de visita y avisos de retirada']] },
            { code: 'SLK', name: 'Canal «Operaciones · Paterna»', reading: null, status: null, kv: [['Sistema', 'Slack'], ['Uso', 'Resumen del parte diario']] }
          ] },
          { id: 'alm', title: 'Almacén', sub: 'SAP Business One · almacén de Paterna', items: [
            { code: 'STK-BAT', name: 'Baterías de litio de repuesto', reading: '420', status: 'warn', note: 'Las sustituciones por batería baja y la retirada del lote PIR-2607-A consumen stock.', kv: [['Referencia', '900 unidades'], ['Límites', 'aviso < 600 · crítico < 300 uds'], ['Sistema', 'SAP Business One']] },
            { code: 'PIR-ALM', name: 'Lote PIR-2607-A en almacén', reading: '960', status: 'crit', note: '960 detectores PIR-200 sin instalar: bloqueados hasta nueva orden de la retirada REC-2026-1019.', kv: [['Estado', 'Bloqueo preventivo'], ['Procedimiento', 'PR-QLT-006']] }
          ] },
          { id: 'flt', title: 'Flota', sub: 'Samsara Flota · 62 furgonetas', items: [
            { code: 'FLT-RUTA', name: 'Furgonetas en ruta', reading: '58', status: 'ok', kv: [['Referencia', '≥ 55 furgonetas'], ['Sistema', 'Samsara Flota']] },
            { code: 'OT-URG', name: 'Órdenes urgentes abiertas', reading: '9', status: 'ok', kv: [['Referencia', '< 15 órdenes'], ['Sistema', 'Salesforce CRM']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'activity',
          title: 'Paneles sin comunicación 4G · Valencia Norte',
          meta: ['Alarma 05:50 · ALM-COM-0611'],
          systems: ['Sector Alarm Partner Hub', 'Verisure Partner Portal'],
          body: 'Pico de 241 paneles a las 05:42; 214 siguen sin comunicación desde las 05:10 tras un mantenimiento del operador móvil. 38 no tienen vía de respaldo y quedan sin supervisión remota. La línea técnica ya acumula 47 llamadas.'
        },
        complaint: {
          icon: 'mail',
          title: 'Reclamación CLM-2026-0619 · cargos de desplazamiento por falsas alarmas',
          meta: ['19/10 07:42', 'Marta Soler Pons', 'Cliente particular · contrato Sector Alarm SA-2026-77412'],
          body: 'Reclama dos cargos de 39,00 EUR por falsas alarmas del 12 y 14/10 y avisa de que se dará de baja si le aplican la penalización de 180 EUR. Instalación',
          trace: 'INS-2026-VLC-04417',
          after: 'Acuse en 24 h y resolución en 10 días hábiles.',
          due: 'Acuse hasta el 20/10',
          goLabel: 'Abrir reclamación'
        }
      },
      chart: {
        title: 'Paneles sin comunicación 4G',
        sub: 'Valencia Norte · referencia 0 paneles · ahora 214 (06:30)',
        icon: 'activity',
        tabLabel: 'Paneles',
        chart: {
          series: PANELES.map(([t, v]) => ({ time: t, value: v })),
          unit: 'paneles',
          threshold: { value: 50, label: 'Aviso 50', legend: 'Aviso 50 paneles · 74 min por encima' },
          critical: { value: 100, label: 'Crítico 100', legend: 'Crítico 100 paneles · 69 min por encima' },
          peak: { x: '05:42', y: 241, label: '241 paneles · 05:42' },
          yTicks: [0, 80, 160, 240],
          xTicks: ['05:00', '05:30', '06:00', '06:30'],
          annotations: [{ x: '05:50', label: 'Alarma 05:50' }],
          bands: [
            { from: '05:10', to: '05:40', label: 'Mantenimiento del operador móvil' },
            { from: '05:45', to: '05:55', label: 'Recuperación parcial por reintento', tone: 'warn' }
          ],
          seriesLabel: 'Paneles sin comunicación (Partner Portals)',
          shadeLabel: 'Sin supervisión remota desde las 05:10'
        },
        events: [
          { time: '05:10', end: '05:40', text: 'El operador móvil inicia un mantenimiento de la red 4G en Valencia Norte', tone: 'brand', tag: 'COM-4G' },
          { time: '05:15', text: 'Los primeros paneles pierden la comunicación: 47 en cinco minutos', tone: 'brand', tag: 'COM-4G' },
          { time: '05:42', text: 'Pico de 241 paneles sin comunicación, sobre todo Sector Alarm y Verisure', tone: 'warn', tag: 'COM-4G' },
          { time: '05:50', text: 'Alarma de los Partner Portals: 214 paneles sin comunicación', tone: 'crit', tag: 'ALM-COM-0611' },
          { time: '06:00', end: '06:30', text: 'La línea técnica supera las 40 llamadas en espera', tone: 'warn', tag: 'COL-SOP' },
          { time: '06:30', text: 'Siguen 214 paneles caídos; 38 no tienen vía de respaldo', tone: 'warn', tag: 'SIN-RESP' }
        ],
        cause: 'Hipótesis a confirmar por el Responsable de soporte técnico: el mantenimiento del operador móvil dejó sin cobertura 4G estable a los paneles de Valencia Norte y los que no tienen respaldo IP ni segunda SIM no han recuperado la señal.',
        system: 'Partner Portals',
        footer: 'Lectura cada 5 min'
      },
      parte: {
        agent: AGENT,
        title: 'Parte diario de operaciones',
        sub: 'Lecturas de las 06:00 · 11 indicadores del hub de Paterna · umbrales de operaciones',
        colItem: 'Indicador',
        systems: ['Salesforce CRM', 'SAP Business One'],
        inboxTitle: 'Parte diario de operaciones · lecturas de las 06:00',
        inboxCount: '11 indicadores',
        inboxPending: '4 críticos, uno de ellos la retirada del lote PIR-2607-A, y 3 avisos pendientes de revisar.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'Verisure Partner Portal', action: 'Lee el estado de comunicación de los paneles de Valencia Norte', result: '214 paneles sin comunicación en las tres marcas; 38 sin respaldo', ms: 640 },
          { agent: AGENT, system: 'Samsara Flota', action: 'Consulta las furgonetas en ruta y la posición de los técnicos', result: '58 de 62 furgonetas operativas; 9 órdenes urgentes', ms: 520 },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compara cada lectura con sus umbrales de operaciones (11 indicadores)', result: '4 críticos · 3 avisos · 4 sin incidencias', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'SAP Business One', action: 'Comprueba el lote PIR-2607-A y el stock de baterías', result: 'REC-2026-1019: 912 hogares con equipo; 960 en almacén; baterías 420 uds', ms: 380, tone: 'crit' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Busca casos y listas abiertas de los indicadores con alerta', result: 'CLM-2026-0619 (falsas alarmas) y MNT-VENC-2026-10 (revisiones vencidas)', ms: 470 },
          { agent: AGENT, system: 'Sector Alarm Partner Hub', action: 'Cruza las alertas con las reclamaciones abiertas', result: 'CLM-2026-0619: sensor PIR con batería baja en INS-2026-VLC-04417', ms: 350, tone: 'warn' },
          { agent: AGENT, system: 'Modelo de lenguaje', action: 'Redacta la acción recomendada de cada alerta (7 llamadas)', result: '7 borradores, cada uno con su procedimiento de referencia', ms: 6100 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Crea OT-2026-31101 para COM-4G · prioridad urgente · alarma', result: 'Creado y asignado al Responsable de soporte técnico', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Crea OT-2026-31102 para SIN-RESP · prioridad alta', result: 'Creado y asignado al Jefe de mantenimiento', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Crea OT-2026-31103 para PIR-2607 · prioridad urgente · retirada', result: 'Creado y asignado a Almacén y Atención al cliente', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Crea OT-2026-31104 para COL-SOP · prioridad media', result: 'Creado y asignado al Responsable de soporte técnico', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'SAP Business One', action: 'Crea OT-2026-31105 para STK-BAT · prioridad media', result: 'Creado y asignado al Responsable de almacén', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Actualiza CLM-2026-0619 (Marta Soler Pons) con la lectura de hoy', result: 'Evidencia añadida · prioridad alta propuesta · sin caso duplicado', ms: 220 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Actualiza MNT-VENC-2026-10 (revisiones vencidas) con la lectura de hoy', result: 'Lectura añadida · sin ticket duplicado', ms: 220 },
          { agent: AGENT, system: 'Slack', action: 'Publica el resumen en el canal «Operaciones · Paterna»', result: 'Enviado: 4 críticos, 3 avisos y 5 tickets', ms: 410, tone: 'ok' }
        ],
        stats: [
          { label: 'Indicadores revisados', value: 11 },
          { label: 'Tickets creados', value: 5, tone: 'ok' },
          { label: 'Casos actualizados, sin duplicar', value: 2 },
          { label: 'Retiradas de producto abiertas', value: 1, tone: 'crit' }
        ],
        relation: {
          title: 'Posible relación con la reclamación CLM-2026-0619',
          body: 'El sensor PIR del salón de Marta Soler Pons (INS-2026-VLC-04417, Sector Alarm) tenía la batería baja y no generó aviso, lo que provocó las falsas alarmas del 12 y 14/10 con dos cargos de 39,00 EUR. La misma falta de aviso de batería puede afectar a otros sensores de la cartera y a los detectores del lote PIR-2607-A.',
          more: 'Soporte técnico debería revisar la telemetría de batería de los PIR instalados antes de responder. A confirmar por el Responsable de soporte técnico.',
          plain: 'El sensor PIR del salón de Marta Soler Pons (INS-2026-VLC-04417, Sector Alarm) tenía la batería baja y no generó aviso, lo que provocó las falsas alarmas del 12 y 14/10 con dos cargos de 39,00 EUR. Soporte técnico debería revisar la telemetría de batería de los PIR instalados antes de responder. A confirmar por el Responsable de soporte técnico.',
          go: 'reclamacion',
          goLabel: 'Abrir la reclamación'
        },
        policy: 'Política aplicada: las órdenes de trabajo se crean sin aprobación previa; conmutar paneles de un cliente, avisar a los hogares de una retirada o abonar cargos al cliente requiere la aprobación del responsable (POL-OPS-015).',
        channel: 'Operaciones · Paterna',
        resultSummary: '5 tickets creados, 2 casos existentes actualizados y resumen publicado en Slack.',
        auditRequest: 'Paterna · lecturas de las 06:00 · 11 indicadores',
        auditNew: 'Orden de trabajo creada',
        auditUpdate: 'Caso de operaciones actualizado',
        reportTitle: 'Parte diario de operaciones · Paterna',
        reportCode: 'PD-GII-20261019',
        reportMeta: [['Hub', 'Paterna (Valencia)'], ['Turno', 'Mañana'], ['Indicadores revisados', '11'], ['Críticos · avisos', '4 · 3']],
        reportSummary: 'De 11 indicadores revisados, 4 están en estado crítico y 3 en aviso. La caída de comunicación 4G deja 214 paneles sin supervisión remota y la retirada del lote PIR-2607-A afecta a 912 hogares. Se han creado 5 órdenes de trabajo y se han actualizado 2 casos existentes, sin duplicarlos.',
        signatures: [{ role: 'Responsable de operaciones', note: 'Revisado' }, { role: 'Responsable de soporte técnico', note: 'Recibido' }]
      },
      presenter: {
        say: [
          'Así empieza el turno el Responsable de operaciones en Paterna: lo que pide una decisión, en una sola bandeja.',
          'Los datos llegan de sus sistemas: clientes y órdenes de Salesforce, almacén y facturación de SAP Business One, el estado de los paneles en los portales de Verisure, Sector Alarm y Prosegur Alarmas, y la flota de Samsara. Aquí son sintéticos, pero coherentes entre sí.',
          'El plano del hub resume la operación de un vistazo: gris lo normal, color lo que pide atención. Soporte técnico está en rojo; al pulsarlo se ven los paneles caídos, la cola de llamadas y las visitas que dependen de ello.',
          'Tres asuntos: la alarma de comunicación de las 05:50 (214 paneles sin supervisión remota), la reclamación CLM-2026-0619 de Marta Soler Pons y el parte con 4 críticos, uno de ellos la retirada del lote PIR-2607-A.'
        ],
        sayBefore: ['Generar parte diario: revisa 11 indicadores, no duplica casos abiertos y crea las órdenes de trabajo. Fijaos en el tiempo.'],
        sayAfter: [
          'Relación que encuentra Agentic Platform: el sensor de la clienta tenía la batería baja sin aviso y puede haber más en la cartera, incluidos los del lote PIR-2607-A. Nadie ha tenido que cruzar tres sistemas.',
          'Y no duplica: dos casos ya abiertos se actualizan en lugar de abrir tickets nuevos.'
        ],
        next: 'Pulsar «Generar parte diario» y comentar el registro mientras se ejecuta.',
        nextAfter: 'Ir a «De palabras a workflow» (flecha derecha) para crear la respuesta a la caída de comunicación a partir del procedimiento escrito.'
      }
    };
  })()
});
