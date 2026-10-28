/* Norel Nutrición Animal · resumen del turno (escena «turno»). Escenario de la demo con datos sintéticos (MFM). */
agenticPack('norel', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((330 + i * 5) / 60)).padStart(2, '0')}:${String((330 + i * 5) % 60).padStart(2, '0')}`;
    /* Carga del laboratorio (LIMS) sobre capacidad de ensayo (%), cada 5 min de 05:30 a 07:00. */
    const LOAD = [62, 63, 62, 63, 64, 78, 89, 96, 101, 104, 105, 104, 103, 102, 101, 100, 99, 98, 97];
    const AGENT = 'Parte diario de operaciones y calidad';

    const items = [
      { code: 'SAL-CC118', name: 'Salmonella en colina cloruro 60 % (MP-2610-CC-118)', tag: 'ALARMA', area: 'Laboratorio (LIMS) · Recepción de materias primas', metric: 'Salmonella en 25 g (ensayo LAB-2610-0933)', reading: 'Positivo', baseline: 'Ausente en 25 g', limits: 'crítico = presencia en 25 g', status: 'critical',
        note: 'Positivo en una muestra de la materia prima recibida el 21/10 (proveedor Agroquímica Delta). Ya se ha usado en 4 lotes de premezcla (PRM-2610-0417, 0418, 0421 y 0425; 96 t). Bloquear el lote en SAP QM y los productos derivados exige la aprobación del Responsable de calidad y seguridad alimentaria.' },
      { code: 'RET-PRM', name: 'Premezclas expedidas con MP-2610-CC-118', area: 'Almacén y expediciones · SAP S/4HANA', metric: 'toneladas ya expedidas a clientes', reading: '65 t', baseline: '0 t', limits: 'aviso > 0 · crítico > 0 t', status: 'critical',
        note: 'De las 96 t producidas, 31 t siguen en el almacén de producto terminado y 65 t están expedidas a 9 clientes (fábricas de piensos de España, Portugal y Marruecos) en 148 expediciones. Campaña RET-2026-1028: informar a las autoridades y a los clientes en 4 h.' },
      { code: 'CLM-VITE', name: 'Vitamina E en PRM-2610-0388 (reclamación CLM-2026-1028)', area: 'Piensos Cuenca Mediterráneo, S.A. · Laboratorio (LIMS)', metric: 'contenido de vitamina E frente al declarado', reading: '−18 %', baseline: 'dentro de ±10 %', limits: 'aviso < −10 · crítico < −15 %', status: 'critical',
        note: 'El cliente reclama un contenido de vitamina E un 18 % inferior al declarado en la premezcla para vacuno de leche (informe LAB-CLI-2610-77). El lote consume la vitamina E MP-2610-VE-044. Acuse en 24 h; informe 8D en 10 días hábiles.' },
      { code: 'STK-CC', name: 'Cobertura de colina cloruro 60 % tras el bloqueo', area: 'Recepción de materias primas · SAP S/4HANA', metric: 'días de cobertura de producción', reading: '2 días', baseline: '12 días', limits: 'aviso < 8 · crítico < 5 días', status: 'critical',
        note: 'Al bloquear MP-2610-CC-118 solo queda stock para 2 días de las premezclas que llevan colina. Pedir una reposición urgente a un proveedor alternativo con análisis de Salmonella previo a la descarga.' },
      { code: 'LAB-COLA', name: 'Carga del laboratorio (LIMS)', area: 'Laboratorio · LIMS (laboratorio)', metric: 'carga sobre la capacidad de ensayo', reading: '97 % carga', baseline: '62 % carga', limits: 'aviso > 85 · crítico > 100 %', status: 'warning',
        note: 'Los ensayos de confirmación de Salmonella y la contramuestra de vitamina E llevaron la carga a un pico del 105 % a las 06:20. Priorizar las confirmaciones y posponer los ensayos de rutina no urgentes.' },
      { code: 'CUE-052', name: 'Cuestionario de auditoría de Grupo Integrador Levante', area: 'Salesforce CRM · SharePoint', metric: 'días hasta el vencimiento del cuestionario', reading: '6 días', baseline: '≥ 10 días', limits: 'aviso < 10 · crítico < 3 días', status: 'warning',
        note: 'Caso CUE-2026-052: GMP+ B2 / FAMI-QS, APPCC, trazabilidad, higiene de piensos y plan de retirada. Algunas preguntas no tienen evidencia en la documentación y requieren revisión humana.' },
      { code: 'PED-RIE', name: 'Pedidos en curso con fecha comprometida en riesgo', area: 'Atención al cliente y pedidos · SAP S/4HANA', metric: 'pedidos con entrega en riesgo', reading: '11 pedidos', baseline: '< 6 pedidos', limits: 'aviso > 8 · crítico > 15 pedidos', status: 'warning',
        note: 'La retención de las 31 t del almacén y el posible bloqueo de colina afectan a pedidos de premezclas de porcino y avicultura. Avisar a los clientes con fecha en riesgo y ofrecer alternativas desde Norel Solutions.' },
      { code: 'OF-HOY', name: 'Órdenes de fabricación de hoy', area: 'Fabricación de premezclas · MES de planta', metric: 'órdenes de fabricación programadas hoy', reading: '14 órdenes', baseline: '≥ 12 órdenes', limits: 'aviso < 8 · crítico < 5', status: null, note: '' },
      { code: 'PED-CUR', name: 'Pedidos en curso', area: 'Atención al cliente y pedidos · SAP S/4HANA', metric: 'pedidos abiertos', reading: '126 pedidos', baseline: '120 pedidos', limits: 'aviso > 160 · crítico > 200', status: null, note: '' },
      { code: 'REC-MP', name: 'Materias primas liberadas en recepción', area: 'Recepción · LIMS (laboratorio)', metric: 'recepciones liberadas sin incidencia (semana)', reading: '94 %', baseline: '95 %', limits: 'aviso < 90 · crítico < 85 %', status: null, note: '' },
      { code: 'NS-CON', name: 'Consultas técnicas de Norel Solutions', area: 'Norel Solutions · Salesforce CRM', metric: 'consultas abiertas', reading: '9 consultas', baseline: '< 15 consultas', limits: 'aviso > 15 · crítico > 25', status: null, note: '' }
    ];

    const news = [
      { id: 'OPS-2026-2801', equipment: 'SAL-CC118', priority: 'Urgente · Seguridad del pienso', tone: 'crit', owner: 'Responsable de calidad y seguridad alimentaria (APPCC)',
        action: 'Bloquear MP-2610-CC-118 en SAP QM y los 4 lotes de premezcla derivados (96 t), retener los 31 t del almacén y confirmar el resultado con el Jefe de laboratorio. Responde a PR-CAL-004 y PR-CAL-007.' },
      { id: 'OPS-2026-2802', equipment: 'RET-PRM', priority: 'Urgente · Retirada', tone: 'crit', owner: 'Responsable de logística y exportación',
        action: 'Localizar las 148 expediciones de los 65 t enviados a 9 clientes (España, Portugal y Marruecos), retener las que sigan en tránsito y preparar la notificación a la autoridad competente (Reglamento (CE) 178/2002, art. 19). Campaña RET-2026-1028.' },
      { id: 'OPS-2026-2803', equipment: 'STK-CC', priority: 'Alta', tone: 'crit', owner: 'Jefe de planta',
        action: 'Pedir colina cloruro 60 % a un proveedor alternativo con análisis de Salmonella previo a la descarga y reprogramar las órdenes de fabricación que la llevan (2 días de cobertura).' },
      { id: 'OPS-2026-2804', equipment: 'LAB-COLA', priority: 'Media', tone: 'warn', owner: 'Jefe de laboratorio',
        action: 'Priorizar los ensayos de confirmación de Salmonella y la contramuestra de vitamina E; posponer los ensayos de rutina no urgentes hasta que la carga baje del 85 %.' },
      { id: 'OPS-2026-2805', equipment: 'PED-RIE', priority: 'Media', tone: 'warn', owner: 'Atención al cliente y pedidos',
        action: '11 pedidos con fecha comprometida en riesgo: avisar a los clientes y proponer con Norel Solutions premezclas alternativas sin colina del lote bloqueado.' }
    ];
    const updates = [
      { id: 'CLM-2026-1028', equipment: 'CLM-VITE', priority: 'Alta (propuesta)', tone: 'crit', owner: 'Responsable de calidad y seguridad alimentaria (APPCC)',
        action: 'Se añade la lectura de hoy (vitamina E −18 % frente al declarado en PRM-2610-0388, informe LAB-CLI-2610-77) al caso abierto de Piensos Cuenca Mediterráneo. No se crea un caso duplicado.' },
      { id: 'CUE-2026-052', equipment: 'CUE-052', priority: 'Sin cambios', tone: 'warn', owner: 'Responsable de asuntos regulatorios',
        action: 'Se añade la lectura de hoy (6 días hasta el vencimiento) al cuestionario abierto de Grupo Integrador Levante. No se crea un ticket duplicado.' }
    ];

    return {
      title: 'Madrid (oficina de pedidos) y Planta de premezclas (España) · turno de mañana',
      nav: 'Resumen del turno',
      clockLabel: 'Hora de planta',
      decider: 'Responsable de operaciones y calidad',
      kpis: [
        { label: 'Lotes de premezcla afectados', value: 4, sub: '96 t · 31 t en almacén y 65 t expedidas', icon: 'flask', tone: 'crit', href: '#alarma' },
        { label: 'Clientes por avisar', value: 9, sub: '148 expediciones · España, Portugal y Marruecos', icon: 'truck', href: '#retirada' },
        { label: 'Reclamaciones abiertas', value: 1, sub: 'CLM-2026-1028 · acuse en 24 h, informe 8D en 10 días hábiles', icon: 'mail', href: '#reclamacion' },
        { label: 'Indicadores con alerta', value: '7 de 11', sub: '4 críticos · 3 avisos · lecturas de las 07:00', icon: 'activity', action: 'scroll-parte' }
      ],
      map: {
        title: 'Plano de operaciones · Madrid y Planta de premezclas (España)',
        sub: 'Lecturas del parte de las 07:00 y del laboratorio a las 07:00 · pulsa un elemento para ver su detalle · 14 órdenes de fabricación hoy · 126 pedidos en curso · 3 críticos',
        icon: 'factory',
        readonly: 'Agentic Platform lee SAP S/4HANA, LIMS, MES de planta y Salesforce CRM; no libera ni bloquea lotes por su cuenta',
        zones: [
          { id: 'rec', title: 'Recepción de materias primas', sub: 'SAP S/4HANA · LIMS (laboratorio)', items: [
            { code: 'MP-2610-CC-118', name: 'Colina cloruro 60 % · lote MP-2610-CC-118', reading: 'Positivo', status: 'crit', tags: ['Agroquímica Delta', 'LAB-2610-0933'], go: 'alarma', goLabel: 'Abrir la alarma',
              note: 'Salmonella en 25 g en una muestra del lote recibido el 21/10. Usado en 4 lotes de premezcla (96 t).',
              kv: [['Proveedor', 'Agroquímica Delta'], ['Recepción', '21/10/2026'], ['Límite', 'ausente en 25 g'], ['Fuente', 'LIMS']] },
            { code: 'STK-CC', name: 'Cobertura de colina cloruro 60 %', reading: '2 días', status: 'crit', note: 'Tras el bloqueo del lote solo queda stock para 2 días de producción.', kv: [['Referencia', '12 días'], ['Límites', 'aviso < 8 · crítico < 5 días'], ['Fuente', 'SAP S/4HANA']] },
            { code: 'REC-MP', name: 'Materias primas liberadas', reading: '94 %', status: 'ok', kv: [['Referencia', '95 %'], ['Sistema', 'LIMS']] }
          ] },
          { id: 'fab', title: 'Fabricación de premezclas', sub: 'MES de planta · Planta de premezclas (España)', items: [
            { code: 'OF-HOY', name: 'Órdenes de fabricación de hoy', reading: '14', status: 'ok', kv: [['Referencia', '≥ 12 órdenes'], ['Sistema', 'MES de planta']] },
            { code: 'PRM-2610-0417', name: 'Premezcla vitamínica de porcino', reading: '28 t', status: 'crit', tags: ['PRM-2610-0417'], note: 'Primer lote fabricado con MP-2610-CC-118; 4 t en almacén y 24 t expedidas.', kv: [['Fabricado', '22/10/2026'], ['Almacén', '4 t'], ['Expedidas', '24 t'], ['Fuente', 'MES de planta · SAP S/4HANA']] },
            { code: 'PRM-2610-0388', name: 'Premezcla de vitaminas y oligoelementos para vacuno de leche', reading: '−18 % vit. E', status: 'crit', tags: ['CLM-2026-1028'], go: 'reclamacion', goLabel: 'Abrir la reclamación', note: 'Lote reclamado por Piensos Cuenca Mediterráneo; consume la vitamina E MP-2610-VE-044.', kv: [['Informe del cliente', 'LAB-CLI-2610-77'], ['Plazos', 'acuse 24 h · informe 8D en 10 días hábiles']] }
          ] },
          { id: 'lab', title: 'Laboratorio (LIMS)', sub: 'Ensayos de materias primas y producto terminado', items: [
            { code: 'LAB-COLA', name: 'Carga del laboratorio', reading: '97 %', status: 'warn', note: 'Pico del 105 % a las 06:20, 65 min por encima del 85 % y 35 min por encima del 100 %.', kv: [['Referencia', '62 % de carga'], ['Límites', 'aviso > 85 · crítico > 100 %'], ['Fuente', 'LIMS']] },
            { code: 'LAB-2610-0933', name: 'Ensayo de Salmonella', reading: 'Positivo', status: 'crit', tags: ['MP-2610-CC-118'], go: 'alarma', goLabel: 'Abrir la alarma', kv: [['Método', 'presencia en 25 g'], ['Procedimiento', 'PR-CAL-004']] }
          ] },
          { id: 'alm', title: 'Almacén y expediciones', sub: 'SAP S/4HANA · Logística y exportación', items: [
            { code: 'RET-PRM', name: 'Premezclas expedidas con colina afectada', reading: '65 t', status: 'crit', tags: ['RET-2026-1028'], go: 'retirada', goLabel: 'Abrir la retirada',
              note: '148 expediciones a 9 clientes en España, Portugal y Marruecos. Objetivo: informar a las autoridades y a los clientes en 4 h.',
              kv: [['Producido', '96 t'], ['En almacén', '31 t'], ['Expedidas', '65 t'], ['Países', 'España · Portugal · Marruecos']] },
            { code: 'ALM-PT', name: 'Almacén de producto terminado', reading: '31 t', status: 'warn', note: 'Producto de los 4 lotes pendiente de retención y bloqueo en SAP QM.', kv: [['Procedimiento', 'PR-CAL-007']] }
          ] },
          { id: 'sol', title: 'Norel Solutions y atención de pedidos', sub: 'Salesforce CRM · asesoramiento técnico', items: [
            { code: 'PED-CUR', name: 'Pedidos en curso', reading: '126', status: 'ok', kv: [['Referencia', '120 pedidos'], ['Críticos', '3'], ['Sistema', 'SAP S/4HANA']] },
            { code: 'PED-RIE', name: 'Pedidos con fecha en riesgo', reading: '11', status: 'warn', note: 'Afectan a premezclas de porcino y avicultura con colina del lote bloqueado.', kv: [['Referencia', '< 6 pedidos'], ['Límites', 'aviso > 8 · crítico > 15']] },
            { code: 'CUE-052', name: 'Cuestionario de Grupo Integrador Levante', reading: '6 días', status: 'warn', tags: ['CUE-2026-052'], go: 'cuestionario', goLabel: 'Abrir el cuestionario', note: 'Auditoría de proveedor de aditivos: GMP+ B2 / FAMI-QS, APPCC, trazabilidad y plan de retirada.', kv: [['Referencia', '≥ 10 días'], ['Sistema', 'Salesforce CRM · SharePoint']] },
            { code: 'NS-CON', name: 'Consultas técnicas de Norel Solutions', reading: '9', status: 'ok', kv: [['Referencia', '< 15 consultas']] }
          ] },
          { id: 'com', title: 'Comunicación', sub: 'Atención al cliente y equipo', items: [
            { code: 'OUT', name: 'Avisos a clientes (Outlook)', reading: null, status: null, kv: [['Uso', 'Avisos de retención, acuses de reclamación y respuestas']] },
            { code: 'TMS', name: 'Canal «Operaciones y calidad · Norel»', reading: null, status: null, kv: [['Sistema', 'Microsoft Teams'], ['Uso', 'Resumen del parte diario']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'flask',
          title: 'Laboratorio · Salmonella en colina cloruro 60 % (MP-2610-CC-118)',
          meta: ['Alarma 05:50 · ALM-LAB-0550'],
          systems: ['LIMS (laboratorio)'],
          body: 'Resultado positivo de Salmonella en 25 g (ensayo LAB-2610-0933) en el lote de colina cloruro 60 % recibido el 21/10 de Agroquímica Delta. Ya se usó en 4 lotes de premezcla (96 t): 31 t siguen en almacén y 65 t están expedidas a 9 clientes.'
        },
        complaint: {
          icon: 'mail',
          title: 'Reclamación CLM-2026-1028 · vitamina E un 18 % inferior al declarado',
          meta: ['28/10 08:05', 'Piensos Cuenca Mediterráneo, S.A.', 'Fábrica de piensos para rumiantes · informe LAB-CLI-2610-77'],
          body: 'Reclama que la premezcla de vitaminas y oligoelementos para vacuno de leche presenta un contenido de vitamina E un 18 % inferior al declarado. Lote',
          trace: 'PRM-2610-0388',
          after: 'Plazos: acuse en 24 h e informe 8D en 10 días hábiles.',
          due: 'Acuse antes del 29/10',
          goLabel: 'Abrir reclamación'
        }
      },
      chart: {
        title: 'Laboratorio · carga sobre capacidad de ensayo',
        sub: 'Laboratorio (LIMS) · referencia 62 % · ahora 97 % (07:00)',
        icon: 'flask',
        tabLabel: 'Carga',
        chart: {
          series: LOAD.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '%',
          threshold: { value: 85, label: 'Aviso 85 %', legend: 'Aviso 85 % · 65 min por encima' },
          critical: { value: 100, label: 'Crítico 100 %', legend: 'Crítico 100 % · 35 min por encima' },
          peak: { x: '06:20', y: 105, label: '105 % · 06:20' },
          yTicks: [60, 75, 90, 105],
          xTicks: ['05:30', '06:00', '06:30', '07:00'],
          annotations: [{ x: '05:50', label: 'Alarma 05:50' }],
          bands: [
            { from: '05:50', to: '06:00', label: 'Positivo de Salmonella' },
            { from: '06:10', to: '06:40', label: 'Ensayos de confirmación', tone: 'warn' }
          ],
          seriesLabel: 'Carga (LIMS)',
          shadeLabel: 'Sobrecarga desde 06:10'
        },
        events: [
          { time: '05:50', text: 'LIMS registra el positivo de Salmonella en MP-2610-CC-118 (ensayo LAB-2610-0933)', tone: 'crit', tag: 'ALM-LAB-0550' },
          { time: '05:55', end: '06:00', text: 'El Jefe de laboratorio lanza la repetición y la confirmación del ensayo', tone: 'brand', tag: 'LAB-2610-0933' },
          { time: '06:00', end: '06:10', text: 'La carga supera el 85 %: se suman ensayos de otras muestras del lote', tone: 'warn', tag: 'LAB-COLA' },
          { time: '06:10', end: '06:40', text: 'La carga supera el 100 %: confirmaciones de Salmonella y contramuestra de vitamina E de PRM-2610-0388', tone: 'warn', tag: 'CLM-VITE' },
          { time: '06:20', text: 'Pico del 105 % en el laboratorio', tone: 'warn', tag: 'LAB-COLA' },
          { time: '07:00', text: 'La carga baja al 97 %, todavía por encima del 85 %', tone: 'warn' }
        ],
        cause: 'Hipótesis a confirmar por el Jefe de laboratorio: el positivo de Salmonella y la contramuestra de vitamina E coinciden con la rutina de recepción de la mañana y saturan la capacidad de ensayo.',
        system: 'LIMS (laboratorio)',
        footer: 'Lectura cada 5 min'
      },
      parte: {
        agent: AGENT,
        title: 'Parte diario de operaciones y calidad',
        sub: 'Lecturas de las 07:00 · 11 indicadores de Madrid y la Planta de premezclas (España) · umbrales de operaciones y calidad',
        colItem: 'Indicador',
        systems: ['LIMS (laboratorio)', 'SAP S/4HANA'],
        inboxTitle: 'Parte diario de operaciones y calidad · lecturas de las 07:00',
        inboxCount: '11 indicadores',
        inboxPending: '4 críticos, uno de ellos un positivo de Salmonella con producto ya expedido, y 3 avisos pendientes de revisar.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'LIMS (laboratorio)', action: 'Lee los resultados de ensayo de la noche y la carga del laboratorio', result: 'LAB-2610-0933: Salmonella positiva en MP-2610-CC-118', ms: 620 },
          { agent: AGENT, system: 'MES de planta', action: 'Consulta las órdenes de fabricación de hoy y los lotes que consumieron la materia prima', result: '14 órdenes hoy; 4 lotes de premezcla con MP-2610-CC-118', ms: 520 },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compara cada lectura con sus umbrales de operaciones y calidad (11 indicadores)', result: '4 críticos · 3 avisos · 4 sin incidencias', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Calcula el balance de los 4 lotes y localiza las expediciones', result: '96 t = 31 t en almacén + 65 t expedidas a 9 clientes (148 expediciones)', ms: 410, tone: 'crit' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Busca casos y cuestionarios abiertos de los indicadores con alerta', result: 'CLM-2026-1028 (vitamina E) y CUE-2026-052 (cuestionario)', ms: 470 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Cruza las alertas con las reclamaciones abiertas', result: 'CLM-2026-1028: vitamina E −18 % en PRM-2610-0388 (MP-2610-VE-044)', ms: 350, tone: 'warn' },
          { agent: AGENT, system: 'Modelo de lenguaje', action: 'Redacta la acción recomendada de cada alerta (7 llamadas)', result: '7 borradores, cada uno con su procedimiento de referencia', ms: 6100 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Crea OPS-2026-2801 para SAL-CC118 · prioridad urgente · seguridad del pienso', result: 'Creado y asignado a Responsable de calidad y seguridad alimentaria', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Crea OPS-2026-2802 para RET-PRM · prioridad urgente · retirada', result: 'Creado y asignado a Responsable de logística y exportación', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'SAP S/4HANA', action: 'Crea OPS-2026-2803 para STK-CC · prioridad alta', result: 'Creado y asignado a Jefe de planta', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'LIMS (laboratorio)', action: 'Crea OPS-2026-2804 para LAB-COLA · prioridad media', result: 'Creado y asignado a Jefe de laboratorio', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Crea OPS-2026-2805 para PED-RIE · prioridad media', result: 'Creado y asignado a Atención al cliente y pedidos', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Actualiza CLM-2026-1028 (vitamina E de Piensos Cuenca Mediterráneo) con la lectura de hoy', result: 'Evidencia añadida · prioridad alta propuesta · sin caso duplicado', ms: 220 },
          { agent: AGENT, system: 'Salesforce CRM', action: 'Actualiza CUE-2026-052 (cuestionario de Grupo Integrador Levante) con la lectura de hoy', result: 'Lectura añadida · sin ticket duplicado', ms: 220 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Publica el resumen en el canal «Operaciones y calidad · Norel»', result: 'Enviado: 4 críticos, 3 avisos y 5 tickets', ms: 410, tone: 'ok' }
        ],
        stats: [
          { label: 'Indicadores revisados', value: 11 },
          { label: 'Tickets creados', value: 5, tone: 'ok' },
          { label: 'Casos actualizados, sin duplicar', value: 2 },
          { label: 'Alertas de seguridad del pienso', value: 1, tone: 'crit' }
        ],
        relation: {
          title: 'Posible relación con la reclamación CLM-2026-1028',
          body: 'La vitamina E MP-2610-VE-044 de PRM-2610-0388 (Piensos Cuenca Mediterráneo) se reclama con un contenido un 18 % inferior al declarado, y el mismo lote de vitamina E se usó también en otra premezcla de la semana. Conviene verificar el contenido en la contramuestra y en los demás lotes que la consumieron antes de responder.',
          more: 'El laboratorio dispone de la contramuestra de PRM-2610-0388; el análisis propio (PR-LAB-005) debe contrastarse con el informe LAB-CLI-2610-77 del cliente. A confirmar por el Jefe de laboratorio.',
          plain: 'La vitamina E MP-2610-VE-044 de PRM-2610-0388 (Piensos Cuenca Mediterráneo) se reclama con un contenido un 18 % inferior al declarado, y el mismo lote de vitamina E se usó también en otra premezcla de la semana. Conviene verificar el contenido en la contramuestra y en los demás lotes que la consumieron antes de responder. A confirmar por el Jefe de laboratorio.',
          go: 'reclamacion',
          goLabel: 'Abrir la reclamación'
        },
        policy: 'Política aplicada: los tickets de operaciones y calidad se crean sin aprobación previa; bloquear un lote en SAP QM, retener expediciones, avisar a clientes o notificar a la autoridad competente requiere la aprobación del Responsable de calidad y seguridad alimentaria (PR-CAL-007).',
        channel: 'Operaciones y calidad · Norel',
        resultSummary: '5 tickets creados, 2 casos existentes actualizados y resumen publicado en Teams.',
        auditRequest: 'Madrid y Planta de premezclas · lecturas de las 07:00 · 11 indicadores',
        auditNew: 'Ticket de operaciones creado',
        auditUpdate: 'Caso de operaciones actualizado',
        reportTitle: 'Parte diario de operaciones y calidad · Madrid y Planta de premezclas',
        reportCode: 'PD-NOR-20261028',
        reportMeta: [['Centro', 'Madrid (oficina de pedidos) y Planta de premezclas (España)'], ['Turno', 'Mañana'], ['Indicadores revisados', '11'], ['Críticos · avisos', '4 · 3']],
        reportSummary: 'De 11 indicadores revisados, 4 están en estado crítico y 3 en aviso. El positivo de Salmonella en la colina cloruro MP-2610-CC-118 afecta a 4 lotes de premezcla (96 t), con 65 t ya expedidas a 9 clientes. Se han creado 5 tickets y se han actualizado 2 casos existentes, sin duplicarlos.',
        signatures: [{ role: 'Responsable de operaciones y calidad', note: 'Revisado' }, { role: 'Responsable de calidad y seguridad alimentaria (APPCC)', note: 'Recibido' }]
      },
      presenter: {
        say: [
          'Así empieza el turno el Responsable de operaciones y calidad de Norel: lo que pide una decisión, en una sola bandeja.',
          'Los datos llegan de sus sistemas: pedidos y lotes de SAP S/4HANA, ensayos del LIMS, órdenes del MES de planta y casos de Salesforce. Aquí son sintéticos, pero coherentes entre sí.',
          'El plano resume la operación de un vistazo: gris lo normal, color lo que pide atención. La colina cloruro MP-2610-CC-118 está en rojo; al pulsarla se ven los 4 lotes de premezcla que la usaron y las expediciones.',
          'Tres asuntos: la alarma del LIMS de las 05:50 (Salmonella, 96 t de premezcla, 65 t ya expedidas), la reclamación CLM-2026-1028 de Piensos Cuenca Mediterráneo y el parte con 4 críticos.'
        ],
        sayBefore: ['Generar parte diario: revisa 11 indicadores, no duplica casos abiertos y crea los tickets. Fijaos en el tiempo.'],
        sayAfter: [
          'Relación que encuentra Agentic Platform: la vitamina E reclamada comparte lote de materia prima con otra premezcla de la semana. Nadie ha tenido que cruzar tres sistemas.',
          'Y no duplica: dos casos ya abiertos se actualizan en lugar de abrir tickets nuevos.'
        ],
        next: 'Pulsar «Generar parte diario» y comentar el registro mientras se ejecuta.',
        nextAfter: 'Ir a «De palabras a workflow» (flecha derecha) para crear la respuesta a la alarma de Salmonella a partir del procedimiento escrito.'
      }
    };
  })()
});
