/* Subtropicales Axarquía · resumen del turno (escena «turno»). Escenario de la demo con datos sintéticos (MFM). */
agenticPack('fruta', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((330 + i * 5) / 60)).padStart(2, '0')}:${String((330 + i * 5) % 60).padStart(2, '0')}`;
    /* Temperatura de la cámara de maduración CM-06 (°C), cada 5 min de 05:30 a 07:00. */
    const TEMP = [11.3, 11.3, 11.3, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4, 11.4];
    const AGENT = 'Parte diario de operaciones y calidad';

    const items = [
      { code: 'TEMP-CM06', name: 'Temperatura de la cámara CM-06 (lote AH-2611-118)', tag: 'ALARMA', area: 'Maduración y frío · Trazabilidad de campo', metric: 'temperatura de la cámara frente a la consigna', reading: '11,4 °C', baseline: '6,0 °C', limits: 'aviso > 8 · crítico > 10 °C', status: 'critical',
        note: 'Desviación desde las 03:40 por fallo de compresor. La cámara contiene 9 palés de aguacate Hass calibre 18 (lote AH-2611-118, 14 t) destinados a 3 pedidos de supermercados y a los pedidos de la tienda online de hoy. Retener el lote y trasladarlo a CM-02 exige la aprobación del Responsable de calidad y seguridad alimentaria.' },
      { code: 'RET-MGO', name: 'Mango Keitt expedido con residuo de plaguicida por encima del LMR', area: 'Almacén y expediciones · SAP S/4HANA', metric: 'toneladas ya expedidas a clientes', reading: '12 t', baseline: '0 t', limits: 'aviso > 0 · crítico > 0 t', status: 'critical',
        note: 'El LIMS detectó residuo por encima del límite máximo (LMR) en el lote de recepción MG-2611-KE-031 (18 t del productor Agrícola La Vega 417, informe LAB-2611-0871). Balance: 6 t en almacén y 12 t expedidas a 11 clientes de España, Francia y Alemania, más 640 pedidos de la tienda online. Campaña RET-2026-1120: informar a la autoridad y a los clientes en 4 h.' },
      { code: 'CLM-RYE', name: 'Maduración dispar en el pedido PED-2026-44718 (reclamación CLM-2026-1120)', area: 'Supermercados Levante Fresh, S.A. · Calidad', metric: 'piezas duras en aguacate ready to eat', reading: '35 %', baseline: '< 10 %', limits: 'aviso > 15 · crítico > 25 %', status: 'critical',
        note: 'El cliente reclama que el 35 % de las piezas del lote AH-2611-092 llega duro en 4 tiendas y pide abono y análisis. Acuse en 24 h; informe 8D en 10 días hábiles.' },
      { code: 'STK-HASS', name: 'Cobertura de aguacate Hass ready to eat tras la retención', area: 'Maduración y frío · WMS', metric: 'días de cobertura de pedidos', reading: '1,5 días', baseline: '4 días', limits: 'aviso < 3 · crítico < 2 días', status: 'critical',
        note: 'Con los 14 t de CM-06 retenidos, solo queda aguacate ready to eat para 1,5 días de pedidos. Valorar fruta de importación (Chile, Perú) y reprogramar la maduración de otras cámaras.' },
      { code: 'LAB-COLA', name: 'Carga del laboratorio (LIMS)', area: 'Laboratorio · LIMS', metric: 'carga sobre la capacidad de análisis', reading: '92 % carga', baseline: '60 % carga', limits: 'aviso > 85 · crítico > 100 %', status: 'warning',
        note: 'El análisis de confirmación de residuos del mango y el muestreo de firmeza y color de CM-06 elevan la carga. Priorizar las confirmaciones y posponer los análisis de rutina no urgentes.' },
      { code: 'CUE-063', name: 'Cuestionario de auditoría de Handelsgruppe Nordfrisch', area: 'Calidad · SAP S/4HANA', metric: 'días hasta el vencimiento del cuestionario', reading: '5 días', baseline: '≥ 10 días', limits: 'aviso < 10 · crítico < 3 días', status: 'warning',
        note: 'Caso CUE-2026-063: GLOBALG.A.P., GRASP, IFS Food, trazabilidad, LMR y plan de residuos, agua, ESG y huella, plan de retirada, alérgenos (procesado) y control de plagas. Algunas preguntas no tienen evidencia y requieren revisión humana.' },
      { code: 'PED-RIE', name: 'Pedidos con fecha de entrega en riesgo', area: 'Tienda online (PrestaShop) · WMS', metric: 'pedidos con entrega en riesgo', reading: '38 pedidos', baseline: '< 15 pedidos', limits: 'aviso > 25 · crítico > 50 pedidos', status: 'warning',
        note: 'La retención de CM-06 y el posible bloqueo de mango afectan a pedidos de supermercados y de la tienda online. Avisar a los clientes con fecha en riesgo y ofrecer alternativas.' },
      { code: 'CAM-HOY', name: 'Camiones de fruta recibidos', area: 'Recepción de fruta · Trazabilidad de campo', metric: 'camiones recibidos hoy', reading: '38 camiones', baseline: '≥ 30 camiones', limits: 'aviso < 20 · crítico < 12', status: null, note: '' },
      { code: 'PED-ONL', name: 'Pedidos online a servir', area: 'Tienda online (PrestaShop)', metric: 'pedidos online a servir', reading: '214 pedidos', baseline: '190 pedidos', limits: 'aviso > 300 · crítico > 400', status: null, note: '' },
      { code: 'MAD-OK', name: 'Cámaras de maduración dentro de consigna', area: 'Maduración y frío · Trazabilidad de campo', metric: 'cámaras dentro de consigna', reading: '11 de 12', baseline: '12 de 12', limits: 'aviso < 11 · crítico < 10', status: null, note: '' },
      { code: 'EXP-HOY', name: 'Expediciones del día a tiempo', area: 'Expediciones · SAP S/4HANA', metric: 'expediciones a tiempo (semana)', reading: '96 %', baseline: '95 %', limits: 'aviso < 90 · crítico < 85 %', status: null, note: '' }
    ];

    const news = [
      { id: 'OPS-2026-3101', equipment: 'TEMP-CM06', priority: 'Urgente · Calidad del producto', tone: 'crit', owner: 'Responsable de calidad y seguridad alimentaria',
        action: 'Retener el lote AH-2611-118 (9 palés, 14 t), muestrear firmeza y color y decidir su destino; abrir la orden de trabajo del compresor de CM-06 y trasladar el producto a CM-02. Responde a PR-MAD-002.' },
      { id: 'OPS-2026-3102', equipment: 'RET-MGO', priority: 'Urgente · Retirada', tone: 'crit', owner: 'Responsable de expediciones y exportación',
        action: 'Localizar las expediciones de los 12 t de mango Keitt enviados a 11 clientes (España, Francia y Alemania) y los 640 pedidos de la tienda online, retener los 6 t del almacén y preparar la notificación a la autoridad (Reglamento (CE) 178/2002, art. 19). Campaña RET-2026-1120.' },
      { id: 'OPS-2026-3103', equipment: 'STK-HASS', priority: 'Alta', tone: 'crit', owner: 'Responsable de maduración y frío',
        action: 'Reprogramar la maduración de las otras cámaras y valorar fruta de importación (Chile, Perú) para cubrir la cobertura de 1,5 días de aguacate ready to eat.' },
      { id: 'OPS-2026-3104', equipment: 'LAB-COLA', priority: 'Media', tone: 'warn', owner: 'Jefe de laboratorio',
        action: 'Priorizar la confirmación del residuo del lote MG-2611-KE-031 y el muestreo de CM-06; posponer los análisis de rutina no urgentes hasta que la carga baje del 85 %.' },
      { id: 'OPS-2026-3105', equipment: 'PED-RIE', priority: 'Media', tone: 'warn', owner: 'Responsable de la tienda online',
        action: '38 pedidos con entrega en riesgo: avisar a los clientes y ofrecer fruta alternativa de otras cámaras o del lote de importación.' }
    ];
    const updates = [
      { id: 'CLM-2026-1120', equipment: 'CLM-RYE', priority: 'Alta (propuesta)', tone: 'crit', owner: 'Responsable de calidad y seguridad alimentaria',
        action: 'Se añade la lectura de hoy (35 % de piezas duras en el pedido PED-2026-44718, lote AH-2611-092) al caso abierto de Supermercados Levante Fresh. No se crea un caso duplicado.' },
      { id: 'CUE-2026-063', equipment: 'CUE-063', priority: 'Sin cambios', tone: 'warn', owner: 'Responsable de calidad y seguridad alimentaria',
        action: 'Se añade la lectura de hoy (5 días hasta el vencimiento) al cuestionario abierto de Handelsgruppe Nordfrisch. No se crea un ticket duplicado.' }
    ];

    return {
      title: 'Centro de manipulado de la Axarquía (Málaga) · turno de mañana',
      nav: 'Resumen del turno',
      clockLabel: 'Hora del centro',
      decider: 'Responsable de operaciones y calidad',
      kpis: [
        { label: 'Lotes de mango en retirada', value: 3, sub: '18 t · 6 t en almacén y 12 t expedidas', icon: 'flask', tone: 'crit', href: '#retirada' },
        { label: 'Clientes por avisar', value: 11, sub: 'España, Francia y Alemania · y 640 pedidos online', icon: 'truck', href: '#retirada' },
        { label: 'Reclamaciones abiertas', value: 1, sub: 'CLM-2026-1120 · acuse en 24 h, informe 8D en 10 días hábiles', icon: 'mail', href: '#reclamacion' },
        { label: 'Indicadores con alerta', value: '7 de 11', sub: '4 críticos · 3 avisos · lecturas de las 07:00', icon: 'activity', action: 'scroll-parte' }
      ],
      map: {
        title: 'Plano de operaciones · Centro de manipulado de la Axarquía (Málaga)',
        sub: 'Lecturas del parte de las 07:00 · pulsa un elemento para ver su detalle · 38 camiones de fruta recibidos · 214 pedidos online a servir · 3 críticos',
        icon: 'factory',
        readonly: 'Agentic Platform lee SAP S/4HANA, Trazabilidad de campo, LIMS, WMS y la tienda online; no retiene ni libera lotes por su cuenta',
        zones: [
          { id: 'rec', title: 'Recepción de fruta', sub: 'Trazabilidad de campo · LIMS', items: [
            { code: 'MG-2611-KE-031', name: 'Mango Keitt · lote de recepción MG-2611-KE-031', reading: 'Residuo > LMR', status: 'crit', tags: ['Agrícola La Vega 417', 'LAB-2611-0871'], go: 'retirada', goLabel: 'Abrir la retirada',
              note: 'Residuo de plaguicida por encima del LMR en el lote recibido (18 t). Pasó a 3 lotes de manipulado.',
              kv: [['Productor', 'Agrícola La Vega 417'], ['Cantidad', '18 t'], ['Informe', 'LAB-2611-0871'], ['Fuente', 'LIMS']] },
            { code: 'CAM-HOY', name: 'Camiones de fruta recibidos', reading: '38', status: 'ok', kv: [['Referencia', '≥ 30 camiones'], ['Sistema', 'Trazabilidad de campo']] }
          ] },
          { id: 'mad', title: 'Maduración y frío', sub: 'Cámaras de maduración controlada · WMS', items: [
            { code: 'CM-06', name: 'Cámara de maduración CM-06', reading: '11,4 °C', status: 'crit', tags: ['AH-2611-118', 'ALM-FRIO-0612'], go: 'alarma', goLabel: 'Abrir la alarma',
              note: 'Fallo de compresor desde las 03:40. Contiene 9 palés de aguacate Hass calibre 18 (14 t).',
              kv: [['Consigna', '6,0 °C'], ['Límites', 'aviso > 8 · crítico > 10 °C'], ['Lote', 'AH-2611-118'], ['Fuente', 'Trazabilidad de campo']] },
            { code: 'STK-HASS', name: 'Cobertura de aguacate ready to eat', reading: '1,5 días', status: 'crit', note: 'Con CM-06 retenida solo queda stock para 1,5 días de pedidos.', kv: [['Referencia', '4 días'], ['Límites', 'aviso < 3 · crítico < 2 días'], ['Fuente', 'WMS']] },
            { code: 'MAD-OK', name: 'Cámaras dentro de consigna', reading: '11 de 12', status: 'ok', kv: [['Referencia', '12 de 12'], ['Sistema', 'Trazabilidad de campo']] }
          ] },
          { id: 'man', title: 'Manipulado y envasado', sub: 'WMS · calibrado y envasado de fruta fresca', items: [
            { code: 'MN-2611-0204', name: 'Mango Keitt manipulado · lote MN-2611-0204', reading: '8 t', status: 'crit', tags: ['MG-2611-KE-031'], note: 'Primer lote de manipulado con el mango afectado; 3 t en almacén y 5 t expedidas.', kv: [['Manipulado', '18/11/2026'], ['Almacén', '3 t'], ['Expedidas', '5 t'], ['Fuente', 'WMS · SAP S/4HANA']] },
            { code: 'AH-2611-092', name: 'Aguacate Hass ready to eat · lote AH-2611-092', reading: '35 % duro', status: 'crit', tags: ['CLM-2026-1120'], go: 'reclamacion', goLabel: 'Abrir la reclamación', note: 'Lote del pedido PED-2026-44718 reclamado por Supermercados Levante Fresh por maduración dispar.', kv: [['Pedido', 'PED-2026-44718'], ['Plazos', 'acuse 24 h · informe 8D en 10 días hábiles']] }
          ] },
          { id: 'pro', title: 'Procesado', sub: 'Guacamole, salsas frescas y cold press · APPCC', items: [
            { code: 'PRO-HOY', name: 'Órdenes de procesado de hoy', reading: '9', status: 'ok', kv: [['Referencia', '≥ 8 órdenes'], ['Procedimiento', 'PR-PRO-005']] },
            { code: 'LAB-COLA', name: 'Carga del laboratorio', reading: '92 %', status: 'warn', note: 'Confirmación del residuo del mango y muestreo de CM-06 en paralelo.', kv: [['Referencia', '60 % de carga'], ['Límites', 'aviso > 85 · crítico > 100 %'], ['Fuente', 'LIMS']] }
          ] },
          { id: 'tie', title: 'Tienda online', sub: 'Tienda online (PrestaShop) · cajas de 2 y 4 kg', items: [
            { code: 'PED-ONL', name: 'Pedidos online a servir', reading: '214', status: 'ok', kv: [['Referencia', '190 pedidos'], ['Críticos', '3'], ['Sistema', 'Tienda online (PrestaShop)']] },
            { code: 'PED-RIE', name: 'Pedidos con fecha en riesgo', reading: '38', status: 'warn', note: 'Incluye pedidos servidos desde CM-06 y pedidos con mango del lote en retirada.', kv: [['Referencia', '< 15 pedidos'], ['Límites', 'aviso > 25 · crítico > 50']] },
            { code: 'CUE-063', name: 'Cuestionario de Handelsgruppe Nordfrisch', reading: '5 días', status: 'warn', tags: ['CUE-2026-063'], go: 'cuestionario', goLabel: 'Abrir el cuestionario', note: 'Auditoría de proveedor de fruta: GLOBALG.A.P., GRASP, IFS Food, trazabilidad y plan de retirada.', kv: [['Referencia', '≥ 10 días'], ['Sistema', 'SAP S/4HANA']] }
          ] },
          { id: 'exp', title: 'Expediciones', sub: 'SAP S/4HANA · Expediciones y exportación', items: [
            { code: 'RET-MGO', name: 'Mango expedido con residuo > LMR', reading: '12 t', status: 'crit', tags: ['RET-2026-1120'], go: 'retirada', goLabel: 'Abrir la retirada',
              note: '11 clientes en España, Francia y Alemania y 640 pedidos de la tienda online. Objetivo: informar a la autoridad y a los clientes en 4 h.',
              kv: [['Recibido', '18 t'], ['En almacén', '6 t'], ['Expedidas', '12 t'], ['Países', 'España · Francia · Alemania']] },
            { code: 'EXP-HOY', name: 'Expediciones a tiempo', reading: '96 %', status: 'ok', kv: [['Referencia', '95 %'], ['Sistema', 'SAP S/4HANA']] }
          ] },
          { id: 'com', title: 'Comunicación', sub: 'Atención al cliente y equipo', items: [
            { code: 'OUT', name: 'Avisos a clientes (Outlook)', reading: null, status: null, kv: [['Uso', 'Avisos de retención, acuses de reclamación y respuestas']] },
            { code: 'TMS', name: 'Canal «Operaciones y calidad · SAX»', reading: null, status: null, kv: [['Sistema', 'Microsoft Teams'], ['Uso', 'Resumen del parte diario']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'flask',
          title: 'Maduración y frío · Desviación de temperatura en la cámara CM-06 (lote AH-2611-118)',
          meta: ['Alarma 05:50 · ALM-FRIO-0612'],
          systems: ['Trazabilidad de campo'],
          body: 'La cámara de maduración controlada CM-06 está a 11,4 °C frente a la consigna de 6,0 °C desde las 03:40 (fallo de compresor). Contiene 9 palés de aguacate Hass calibre 18 (lote AH-2611-118, 14 t) destinados a 3 pedidos de supermercados y a los pedidos de la tienda online de hoy.'
        },
        complaint: {
          icon: 'mail',
          title: 'Reclamación CLM-2026-1120 · 35 % de las piezas duras en aguacate ready to eat',
          meta: ['20/11 08:05', 'Supermercados Levante Fresh, S.A.', 'Cadena de supermercados · pedido PED-2026-44718'],
          body: 'Reclama que en el pedido de aguacate ready to eat el 35 % de las piezas llega duro (maduración dispar) en 4 tiendas, y pide abono y análisis. Lote',
          trace: 'AH-2611-092',
          after: 'Plazos: acuse en 24 h e informe 8D en 10 días hábiles.',
          due: 'Acuse antes del 21/11',
          goLabel: 'Abrir reclamación'
        }
      },
      chart: {
        title: 'Cámara CM-06 · temperatura frente a la consigna',
        sub: 'Maduración y frío · consigna 6,0 °C · ahora 11,4 °C (07:00)',
        icon: 'flask',
        tabLabel: 'Temperatura',
        chart: {
          series: TEMP.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '°C',
          threshold: { value: 8, label: 'Aviso 8 °C', legend: 'Aviso 8 °C · por encima desde las 03:40' },
          critical: { value: 10, label: 'Crítico 10 °C', legend: 'Crítico 10 °C · por encima desde las 03:40' },
          peak: { x: '05:45', y: 11.4, label: '11,4 °C · 05:45' },
          yTicks: [6, 8, 10, 12],
          xTicks: ['05:30', '06:00', '06:30', '07:00'],
          annotations: [{ x: '05:50', label: 'Alarma 05:50' }],
          bands: [
            { from: '05:50', to: '06:00', label: 'Alarma ALM-FRIO-0612' },
            { from: '06:10', to: '06:40', label: 'Muestreo de firmeza y color', tone: 'warn' }
          ],
          seriesLabel: 'Temperatura CM-06',
          shadeLabel: 'Por encima de la consigna desde las 03:40'
        },
        events: [
          { time: '05:50', text: 'Trazabilidad de campo registra la desviación de temperatura en CM-06 (11,4 °C frente a 6,0 °C)', tone: 'crit', tag: 'ALM-FRIO-0612' },
          { time: '05:55', end: '06:00', text: 'El Responsable de maduración y frío confirma el fallo de compresor y abre la orden de trabajo', tone: 'brand', tag: 'CM-06' },
          { time: '06:00', end: '06:10', text: 'Calidad propone la retención del lote AH-2611-118 (9 palés, 14 t)', tone: 'warn', tag: 'AH-2611-118' },
          { time: '06:10', end: '06:40', text: 'Muestreo de firmeza y color del lote y preparación del traslado a CM-02', tone: 'warn', tag: 'LAB-COLA' },
          { time: '06:20', text: 'Logística revisa los 3 pedidos de supermercados y los pedidos online afectados', tone: 'warn', tag: 'PED-RIE' },
          { time: '07:00', text: 'La cámara sigue en 11,4 °C, todavía por encima de la consigna', tone: 'warn' }
        ],
        cause: 'Hipótesis a confirmar por el Responsable de maduración y frío: fallo del compresor de CM-06 desde las 03:40; el producto se debe trasladar a CM-02 y evaluar con el muestreo de firmeza y color.',
        system: 'Trazabilidad de campo',
        footer: 'Lectura cada 5 min'
      },
      parte: {
        agent: AGENT,
        title: 'Parte diario de operaciones y calidad',
        sub: 'Lecturas de las 07:00 · 11 indicadores del Centro de manipulado de la Axarquía (Málaga) · umbrales de operaciones y calidad',
        colItem: 'Indicador',
        systems: ['Trazabilidad de campo', 'SAP S/4HANA'],
        inboxTitle: 'Parte diario de operaciones y calidad · lecturas de las 07:00',
        inboxCount: '11 indicadores',
        inboxPending: '4 críticos, uno de ellos un residuo por encima del LMR con producto ya expedido, y 3 avisos pendientes de revisar.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'Trazabilidad de campo', action: 'Lee las temperaturas de las cámaras de maduración y los camiones recibidos esta noche', result: 'CM-06 a 11,4 °C frente a 6,0 °C; 38 camiones recibidos', ms: 620 },
          { agent: AGENT, system: 'LIMS', action: 'Consulta los resultados de residuos y la carga del laboratorio', result: 'LAB-2611-0871: residuo por encima del LMR en MG-2611-KE-031', ms: 520 },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compara cada lectura con sus umbrales de operaciones y calidad (11 indicadores)', result: '4 críticos · 3 avisos · 4 sin incidencias', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Calcula el balance de los 3 lotes de mango y localiza las expediciones', result: '18 t = 6 t en almacén + 12 t expedidas a 11 clientes y 640 pedidos online', ms: 410, tone: 'crit' },
          { agent: AGENT, system: 'Tienda online (PrestaShop)', action: 'Busca los pedidos online afectados y los casos abiertos de los indicadores con alerta', result: '640 pedidos con mango del lote; CLM-2026-1120 y CUE-2026-063 abiertos', ms: 470 },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Cruza las alertas con las reclamaciones abiertas', result: 'CLM-2026-1120: 35 % de piezas duras en AH-2611-092 (PED-2026-44718)', ms: 350, tone: 'warn' },
          { agent: AGENT, system: 'Modelo de lenguaje', action: 'Redacta la acción recomendada de cada alerta (7 llamadas)', result: '7 borradores, cada uno con su procedimiento de referencia', ms: 6100 },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Crea OPS-2026-3101 para TEMP-CM06 · prioridad urgente · calidad del producto', result: 'Creado y asignado a Responsable de calidad y seguridad alimentaria', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Crea OPS-2026-3102 para RET-MGO · prioridad urgente · retirada', result: 'Creado y asignado a Responsable de expediciones y exportación', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'WMS', action: 'Crea OPS-2026-3103 para STK-HASS · prioridad alta', result: 'Creado y asignado a Responsable de maduración y frío', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'LIMS', action: 'Crea OPS-2026-3104 para LAB-COLA · prioridad media', result: 'Creado y asignado a Jefe de laboratorio', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Tienda online (PrestaShop)', action: 'Crea OPS-2026-3105 para PED-RIE · prioridad media', result: 'Creado y asignado a Responsable de la tienda online', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Actualiza CLM-2026-1120 (maduración dispar de Supermercados Levante Fresh) con la lectura de hoy', result: 'Evidencia añadida · prioridad alta propuesta · sin caso duplicado', ms: 220 },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Actualiza CUE-2026-063 (cuestionario de Handelsgruppe Nordfrisch) con la lectura de hoy', result: 'Lectura añadida · sin ticket duplicado', ms: 220 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Publica el resumen en el canal «Operaciones y calidad · SAX»', result: 'Enviado: 4 críticos, 3 avisos y 5 tickets', ms: 410, tone: 'ok' }
        ],
        stats: [
          { label: 'Indicadores revisados', value: 11 },
          { label: 'Tickets creados', value: 5, tone: 'ok' },
          { label: 'Casos actualizados, sin duplicar', value: 2 },
          { label: 'Alertas de seguridad alimentaria', value: 1, tone: 'crit' }
        ],
        relation: {
          title: 'Posible relación con la reclamación CLM-2026-1120',
          body: 'La maduración dispar del lote AH-2611-092 (Supermercados Levante Fresh) coincide con una cámara de maduración que ya tuvo desviaciones de temperatura la semana pasada, y el mismo lote se sirvió también a otros clientes. Conviene verificar el historial de temperatura y la firmeza de las demás entregas antes de responder.',
          more: 'El laboratorio dispone de muestras del lote; el análisis de firmeza y color (PR-MAD-002) debe contrastarse con el informe del cliente. A confirmar por el Responsable de calidad y seguridad alimentaria.',
          plain: 'La maduración dispar del lote AH-2611-092 (Supermercados Levante Fresh) coincide con una cámara de maduración que ya tuvo desviaciones de temperatura la semana pasada, y el mismo lote se sirvió también a otros clientes. Conviene verificar el historial de temperatura y la firmeza de las demás entregas antes de responder. A confirmar por el Responsable de calidad y seguridad alimentaria.',
          go: 'reclamacion',
          goLabel: 'Abrir la reclamación'
        },
        policy: 'Política aplicada: los tickets de operaciones y calidad se crean sin aprobación previa; retener un lote, bloquear expediciones, avisar a clientes o notificar a la autoridad requiere la aprobación del Responsable de calidad y seguridad alimentaria (PR-TRZ-003).',
        channel: 'Operaciones y calidad · SAX',
        resultSummary: '5 tickets creados, 2 casos existentes actualizados y resumen publicado en Teams.',
        auditRequest: 'Centro de manipulado de la Axarquía · lecturas de las 07:00 · 11 indicadores',
        auditNew: 'Ticket de operaciones creado',
        auditUpdate: 'Caso de operaciones actualizado',
        reportTitle: 'Parte diario de operaciones y calidad · Centro de manipulado de la Axarquía',
        reportCode: 'PD-SAX-20261120',
        reportMeta: [['Centro', 'Centro de manipulado de la Axarquía (Málaga)'], ['Turno', 'Mañana'], ['Indicadores revisados', '11'], ['Críticos · avisos', '4 · 3']],
        reportSummary: 'De 11 indicadores revisados, 4 están en estado crítico y 3 en aviso. La desviación de temperatura en CM-06 afecta a 14 t de aguacate Hass (lote AH-2611-118) y el residuo por encima del LMR en el mango MG-2611-KE-031 deja 12 t ya expedidas a 11 clientes y 640 pedidos online. Se han creado 5 tickets y se han actualizado 2 casos existentes, sin duplicarlos.',
        signatures: [{ role: 'Responsable de operaciones y calidad', note: 'Revisado' }, { role: 'Responsable de calidad y seguridad alimentaria', note: 'Recibido' }]
      },
      presenter: {
        say: [
          'Así empieza el turno el Responsable de operaciones y calidad de Subtropicales Axarquía: lo que pide una decisión, en una sola bandeja.',
          'Los datos llegan de sus sistemas: pedidos y lotes de SAP S/4HANA, temperaturas de la trazabilidad de campo, análisis del LIMS, el WMS y la tienda online. Aquí son sintéticos, pero coherentes entre sí.',
          'El plano resume la operación de un vistazo: gris lo normal, color lo que pide atención. La cámara CM-06 está en rojo; al pulsarla se ven los 9 palés de aguacate Hass y los pedidos a los que iban.',
          'Tres asuntos: la alarma de frío de las 05:50 (CM-06 a 11,4 °C, 14 t de aguacate), la reclamación CLM-2026-1120 de Supermercados Levante Fresh y el parte con 4 críticos.'
        ],
        sayBefore: ['Generar parte diario: revisa 11 indicadores, no duplica casos abiertos y crea los tickets. Fijaos en el tiempo.'],
        sayAfter: [
          'Relación que encuentra Agentic Platform: el aguacate reclamado comparte cámara de maduración con una desviación de la semana pasada. Nadie ha tenido que cruzar tres sistemas.',
          'Y no duplica: dos casos ya abiertos se actualizan en lugar de abrir tickets nuevos.'
        ],
        next: 'Pulsar «Generar parte diario» y comentar el registro mientras se ejecuta.',
        nextAfter: 'Ir a «De palabras a workflow» (flecha derecha) para crear la respuesta a la alarma de frío a partir del procedimiento escrito.'
      }
    };
  })()
});
