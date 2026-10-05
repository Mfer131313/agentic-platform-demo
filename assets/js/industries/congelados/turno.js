/* Empresa de Congelados · resumen del turno (escena «turno»). Escenario de la demo de referencia con datos sintéticos (MFM). */
agenticPack('congelados', {
  turno: (function () {
    'use strict';
    const hhmm = (i) => `${String(Math.floor((300 + i * 5) / 60)).padStart(2, '0')}:${String((300 + i * 5) % 60).padStart(2, '0')}`;
    /* Temperatura de aire de la cámara C-07 (sensor TT-C07-01), cada 5 min de 05:00 a 07:00. */
    const TEMP = [-22.1, -22, -22.2, -22.1, -21.9, -22, -22.1, -21.5, -20.7, -19.4, -17.8, -17.1, -16.5, -15.9, -15.3, -14.8, -14.2,
      -13.9, -14.4, -16.6, -18.4, -19.3, -19.9, -20.3, -20.5];
    const AGENT = 'Parte diario de planta';

    const items = [
      { code: 'DM-1', name: 'Detector de metales DM-1', tag: 'PCC', area: 'Línea L1 (maíz dulce), salida de envasado', metric: 'horas desde la última verificación', reading: '3,5 h', baseline: '2 h', limits: 'aviso > 1,75 · crítico > 2 h', status: 'critical',
        note: 'PCC: verificación con probetas vencida (3,5 h; máximo 2 h). Verificar ya y retener el producto envasado desde la última verificación correcta (02:30).' },
      { code: 'ESC-3', name: 'Escaldador de banda ESC-3', area: 'Línea L3 (judía verde)', metric: 'temperatura del agua de escaldado', reading: '86,4 °C agua', baseline: '92 °C agua', limits: 'aviso ±2 · crítico ±4 °C', status: 'critical',
        note: 'Agua por debajo de consigna: riesgo de escaldado insuficiente; verificar con ensayo de peroxidasa.' },
      { code: 'OPT-2', name: 'Selectora óptica OPT-2', area: 'Línea L2 (judía verde)', metric: 'tasa de rechazo', reading: '4,8 % rechazo', baseline: '1,5 % rechazo', limits: 'aviso > 2,5 · crítico > 4 %', status: 'critical',
        note: 'Rechazo triplicado: posible aumento de piedras y terrones en la entrada; revisar la despedregadora DP-2 (malla con desgaste anotado el 2026-08-18, OT-26-07415 abierta).' },
      { code: 'NH3-C2', name: 'Compresor de amoniaco NH3-C2', area: 'Sala de máquinas frigorífica', metric: 'vibración', reading: '6,2 mm/s RMS', baseline: '2,2 mm/s RMS', limits: 'aviso > 4,5 · crítico > 6 mm/s', status: 'critical',
        note: 'Vibración por encima de 6 mm/s: riesgo de avería del compresor de amoniaco; inspeccionar y valorar el relevo con NH3-C1.' },
      { code: 'TUN-1', name: 'Túnel IQF TUN-1', area: 'Línea L1 (maíz dulce)', metric: 'temperatura de aire del túnel', reading: '−29,5 °C aire', baseline: '−35 °C aire', limits: 'aviso > −32 · crítico > −28 °C', status: 'warning',
        note: 'Aire 5,5 °C más caliente que la consigna: revisar desescarche de evaporadores y carga; mañana entra maíz de fin de campaña.' },
      { code: 'EV-SIL3', name: 'Evaporador EV-SIL3 (silo automático 3)', area: 'Silo automático 3', metric: 'horas desde el último desescarche', reading: '14 h', baseline: '8 h', limits: 'aviso > 10 · crítico > 16 h', status: 'warning',
        note: 'Desescarche pendiente: el silo 3 está a −23,9 °C (consigna −25 °C), aún dentro de límites.' },
      { code: 'ENV-5', name: 'Envasadora de mezclas ENV-5', area: 'Sala de envasado (mezclas)', metric: 'paradas por hora', reading: '7 paradas/h', baseline: '2 paradas/h', limits: 'aviso > 4 · crítico > 9 paradas/h', status: 'warning',
        note: 'Atascos de film en la mordaza; ya hay una orden de trabajo abierta.' },
      { code: 'TUN-2', name: 'Túnel IQF TUN-2', area: 'Línea L2 (judía verde)', metric: 'temperatura de aire del túnel', reading: '−35,4 °C aire', baseline: '−35 °C aire', limits: 'aviso > −32 · crítico > −28 °C', status: null, note: '' },
      { code: 'NH3-C1', name: 'Compresor de amoniaco NH3-C1', area: 'Sala de máquinas frigorífica', metric: 'vibración', reading: '2,3 mm/s RMS', baseline: '2,1 mm/s RMS', limits: 'aviso > 4,5 · crítico > 6 mm/s', status: null, note: '' },
      { code: 'LAV-1', name: 'Lavadora de verdura LAV-1', area: 'Línea L1 (maíz dulce)', metric: 'cloro libre en el agua de lavado', reading: '2,6 ppm', baseline: '3 ppm', limits: 'aviso ±1 · crítico ±2 ppm', status: null, note: '' },
      { code: 'CAL-B1', name: 'Caldera de vapor CAL-B1', area: 'Sala de calderas', metric: 'presión de vapor', reading: '9,8 bar', baseline: '10 bar', limits: 'aviso < 8,5 · crítico < 7,5 bar', status: null, note: '' }
    ];

    const news = [
      { id: 'MNT-2026-1184', equipment: 'DM-1', priority: 'Urgente · PCC', tone: 'crit', owner: 'Mantenimiento de línea y Calidad de turno',
        action: 'Verificar DM-1 con probetas ahora (3,5 h sin verificar; máximo 2 h). Calidad decide la retención del producto envasado desde las 02:30 (PNT-CAL-031).' },
      { id: 'MNT-2026-1185', equipment: 'NH3-C2', priority: 'Alta', tone: 'crit', owner: 'Mantenimiento frigorífico',
        action: 'Inspeccionar el compresor: 6,2 mm/s RMS (referencia 2,2). Valorar el relevo con NH3-C1, que está en rango.' },
      { id: 'MNT-2026-1186', equipment: 'ESC-3', priority: 'Alta', tone: 'crit', owner: 'Mantenimiento de línea',
        action: 'Agua de escaldado a 86,4 °C (consigna 92 °C): revisar el aporte de vapor y verificar con ensayo de peroxidasa. La caldera CAL-B1 está en rango (9,8 bar), así que la causa probable es local.' },
      { id: 'MNT-2026-1187', equipment: 'TUN-1', priority: 'Media', tone: 'warn', owner: 'Mantenimiento frigorífico',
        action: 'Aire del túnel a −29,5 °C (consigna −35 °C): revisar desescarche y carga antes de la entrada de maíz de fin de campaña del 30/09.' },
      { id: 'MNT-2026-1188', equipment: 'EV-SIL3', priority: 'Media', tone: 'warn', owner: 'Mantenimiento frigorífico',
        action: 'Programar el desescarche de EV-SIL3 (14 h desde el último). El silo 3 sigue dentro de límites (−23,9 °C).' }
    ];
    const updates = [
      { id: 'OT-26-07415', equipment: 'OPT-2', priority: 'Alta (propuesta)', tone: 'crit', owner: 'Mantenimiento de línea',
        action: 'Se añade la evidencia de OPT-2 (rechazo 4,8 %, referencia 1,5 %) a la orden de la malla de DP-2, abierta desde el 18/08/2026 y pendiente de repuesto.' },
      { id: 'OT-26-08812', equipment: 'ENV-5', priority: 'Sin cambios', tone: 'warn', owner: 'Mantenimiento de línea',
        action: 'Se añade la lectura de hoy (7 paradas/h) a la orden abierta por atascos de film. No se crea un ticket duplicado.' }
    ];

    return {
      title: 'Fustiñana · turno de mañana',
      nav: 'Resumen del turno',
      clockLabel: 'Hora de planta',
      decider: 'Calidad',
      kpis: [
        { label: 'Palés en C-07 durante la excursión', value: 38, sub: '6 lotes · 28.592 kg', icon: 'pallet', tone: 'crit', href: '#alarma' },
        { label: 'Lotes afectados', value: 6, sub: '5 expediciones planificadas · la primera a las 09:30', icon: 'box', href: '#alarma' },
        { label: 'Reclamaciones abiertas', value: 1, sub: 'UKC-44718 · respuesta antes del 02/10/2026', icon: 'mail', href: '#reclamacion' },
        { label: 'Equipos con alerta', value: '7 de 11', sub: '4 críticos · 3 avisos · lecturas de las 06:00', icon: 'activity', action: 'scroll-parte' }
      ],
      map: {
        title: 'Plano de planta · Fustiñana',
        sub: 'Lecturas del parte de las 06:00 y de las cámaras a las 07:00 · pulsa un elemento para ver su detalle',
        icon: 'factory',
        readonly: 'Agentic Platform lee SCADA Galileo, MES Mapex y Easy WMS; no actúa sobre el control de planta',
        zones: [
          { id: 'rec', title: 'Recepción', sub: 'Campo y laboratorio', items: [
            { code: 'BAS', name: 'Básculas de entrada', reading: null, status: null, kv: [['Uso', 'Pesaje y tarjeta del remolque'], ['Sistema', 'SAP']] },
            { code: 'TLV', name: 'Tolvas de recepción', reading: null, status: null, note: 'Mañana (30/09) entra maíz dulce y judía verde de fin de campaña. TUN-1 está en aviso (aire −29,5 °C frente a −35 °C): si no se corrige, capacidad efectiva del 85 %.', kv: [['Alimenta', 'Líneas L1 a L3'], ['Sistema', 'MES Mapex']] },
            { code: 'LAB', name: 'Laboratorio de Calidad', reading: null, status: null, note: 'Verificación con probetas de DM-1 (PCC · PNT-CAL-031) y ensayo de peroxidasa recomendado para ESC-3.', kv: [['Ensayos', 'Recepción, proceso y producto'], ['Sistema', 'Elara']] }
          ] },
          { id: 'l12', title: 'Líneas L1 y L2', sub: 'Maíz dulce · guisante y judía verde', items: [
            { code: 'LAV-1', name: 'Lavadora LAV-1', reading: '2,6 ppm', status: 'ok', kv: [['Indicador', 'Cloro libre en el agua de lavado'], ['Consigna', '3 ppm']] },
            { code: 'TUN-1', name: 'Túnel IQF TUN-1', reading: '−29,5 °C', status: 'warn', note: 'Aire 5,5 °C más caliente que la consigna: revisar desescarche de evaporadores y carga; mañana entra maíz de fin de campaña.', kv: [['Consigna', '−35 °C'], ['Límites', 'aviso > −32 · crítico > −28 °C'], ['Fuente', 'SCADA Galileo']] },
            { code: 'DM-1', name: 'Detector de metales DM-1', reading: '3,5 h', status: 'crit', tags: ['PCC'],
              note: 'PCC: verificación con probetas vencida. Retener el producto envasado en ENV-3 desde la última verificación correcta (02:30): lo decide Calidad.',
              kv: [['Máximo', '2 h'], ['Última verificación correcta', '02:30'], ['Procedimiento', 'PNT-CAL-031'], ['Fuente', 'MES Mapex · Elara']] },
            { code: 'DP-2', name: 'Despedregadora DP-2', reading: null, status: null, tags: ['OT-26-07415'], go: 'reclamacion', goLabel: 'Abrir la reclamación',
              note: 'Malla con desgaste anotado el 18/08/2026; la orden OT-26-07415 sigue abierta, pendiente de repuesto. Va antes de OPT-2 en L2, la línea del lote reclamado.',
              kv: [['Orden abierta', 'OT-26-07415 · desde el 18/08/2026'], ['Días abierta', '42'], ['Instrucción', 'IT-MAN-DP-02']] },
            { code: 'TUN-2', name: 'Túnel IQF TUN-2', reading: '−35,4 °C', status: 'ok', kv: [['Consigna', '−35 °C']] },
            { code: 'OPT-2', name: 'Selectora óptica OPT-2', reading: '4,8 %', status: 'crit', note: 'Rechazo triplicado: posible aumento de piedras y terrones en la entrada; revisar la despedregadora DP-2.', kv: [['Referencia', '1,5 %'], ['Límites', 'aviso > 2,5 · crítico > 4 %'], ['Fuente', 'MES Mapex']] }
          ] },
          { id: 'l35', title: 'Líneas L3 a L5', sub: 'Judía y brócoli · reenvasado · mezclas', items: [
            { code: 'ESC-3', name: 'Escaldador de banda ESC-3', reading: '86,4 °C', status: 'crit', note: 'Agua por debajo de consigna: riesgo de escaldado insuficiente. La caldera CAL-B1 está en rango, así que la causa probable es local.', kv: [['Consigna', '92 °C'], ['Límites', 'aviso ±2 · crítico ±4 °C'], ['Caldera CAL-B1', '9,8 bar · en rango']] },
            { code: 'OPT-3', name: 'Selectora óptica OPT-3', reading: null, status: null, kv: [['Línea', 'L3 · judía verde y brócoli']] },
            { code: 'DM-2', name: 'Detector de metales DM-2', reading: null, status: null, kv: [['Línea', 'L4 · reenvasado desde granel']] },
            { code: 'ENV-5', name: 'Envasadora de mezclas ENV-5', reading: '7 paradas/h', status: 'warn', tags: ['OT-26-08812'], note: 'Atascos de film en la mordaza; ya hay una orden de trabajo abierta.', kv: [['Referencia', '2 paradas/h'], ['Orden abierta', 'OT-26-08812']] }
          ] },
          { id: 'frio', title: 'Frío y servicios', sub: 'Sala de máquinas NH3 y calderas', items: [
            { code: 'NH3-C1', name: 'Compresor NH3-C1', reading: '2,3 mm/s', status: 'ok', kv: [['Referencia', '2,1 mm/s RMS']] },
            { code: 'NH3-C2', name: 'Compresor NH3-C2', reading: '6,2 mm/s', status: 'crit', note: 'Vibración por encima de 6 mm/s: riesgo de avería del compresor de amoniaco; inspeccionar y valorar el relevo con NH3-C1, que está en rango.', kv: [['Referencia', '2,2 mm/s RMS'], ['Límites', 'aviso > 4,5 · crítico > 6 mm/s'], ['Fuente', 'SCADA Galileo']] },
            { code: 'CAL-B1', name: 'Caldera de vapor CAL-B1', reading: '9,8 bar', status: 'ok', kv: [['Consigna', '10 bar']] }
          ] },
          { id: 'alm', title: 'Almacén automático', sub: 'Mecalux Easy WMS · −25 °C', items: [
            { code: 'SIL-1', name: 'Silo automático 1', reading: '−25,2 °C', status: 'ok', tags: ['L26-258-FUS-BRO-01'], note: '12 palés del lote L26-258-FUS-BRO-01, expuesto en C-07: a evaluar. Guarda también el granel G26-132-FUS-BRO.', kv: [['Consigna', '−25 °C'], ['Capacidad', '27.000 palés']] },
            { code: 'SIL-2', name: 'Silo automático 2', reading: '−24,9 °C', status: 'ok', tags: ['L26-255-ALF-ESP-04'], note: '7 palés del lote L26-255-ALF-ESP-04, expuesto en C-07: a evaluar. Guarda también el granel G26-176-FUS-GUI.', kv: [['Consigna', '−25 °C'], ['Capacidad', '34.000 palés']] },
            { code: 'SIL-3', name: 'Silo automático 3', reading: '−23,9 °C', status: 'ok', tags: ['L26-261-FUS-GUI-03', 'L26-231-FUS-GUI-01'], note: '10 palés del lote L26-261-FUS-GUI-03, expuesto en C-07, y los 2 palés que quedan del lote reclamado L26-231-FUS-GUI-01. Desescarche de EV-SIL3 pendiente.', kv: [['Consigna', '−25 °C'], ['Capacidad', '83.000 palés'], ['Evaporador', 'EV-SIL3 · 14 h sin desescarche']] },
            { code: 'SIL-4', name: 'Silo automático 4', reading: '−25,1 °C', status: 'ok', tags: ['L26-263-FUS-MAI-02'], note: '18 palés del lote L26-263-FUS-MAI-02, expuesto en C-07: a evaluar.', kv: [['Consigna', '−25 °C'], ['Capacidad', '16.000 palés']] },
            { code: 'EV-SIL3', name: 'Evaporador EV-SIL3', reading: '14 h', status: 'warn', note: 'Desescarche pendiente: el silo 3 está a −23,9 °C (consigna −25 °C), aún dentro de límites.', kv: [['Referencia', '8 h'], ['Límites', 'aviso > 10 · crítico > 16 h']] }
          ] },
          { id: 'exp', title: 'Cámaras de expedición', sub: 'SCADA Galileo · −22 °C', items: [
            { code: 'C-06', name: 'Cámara de expedición 6', reading: '−22,3 °C', status: 'ok', kv: [['Consigna', '−22 °C'], ['Capacidad', '240 palés']] },
            { code: 'C-07', name: 'Cámara de expedición 7', reading: '−20,5 °C', status: 'crit', tags: ['ALM-C07-0550'], go: 'alarma', goLabel: 'Abrir la alarma',
              note: 'Excursión de 05:50 a 06:40: pico de −13,9 °C a las 06:25, 50 min por encima de −18 °C y 20 min por encima de −15 °C. 38 palés de 6 lotes expuestos; la primera expedición afectada, EXP-26-41106, sale a las 09:30 por el muelle 2.',
              kv: [['Consigna', '−22 °C'], ['Ahora (07:00)', '−20,5 °C'], ['Palés expuestos', '38 · 28.592 kg'], ['Sensor', 'TT-C07-01'], ['Regla', 'PNT-CAL-012']] },
            { code: 'C-08', name: 'Cámara de expedición 8', reading: '−21,8 °C', status: 'ok', kv: [['Consigna', '−22 °C'], ['Capacidad', '240 palés']] },
            { code: 'EV-07', name: 'Evaporador EV-07', reading: null, status: null, note: 'Desescarche programado de 05:40 a 06:05 (parada de ventiladores desde las 05:35).', kv: [['Cámara', 'C-07']] },
            { code: 'P-07', name: 'Puerta rápida P-07', reading: null, status: 'warn', note: 'Sensor de puerta abierta de 05:52 a 06:31: la puerta rápida no completó el cierre. Cierre manual a las 06:31 por el Jefe de turno de expedición.', kv: [['Cámara', 'C-07'], ['Estado', 'Revisar cierre']] }
          ] },
          { id: 'mue', title: 'Muelles de carga', sub: 'Expediciones planificadas', items: [
            { code: 'M1', name: 'Muelle de carga 1', reading: null, status: null, kv: [['Estado', 'Sin expedición asignada']] },
            { code: 'M2', name: 'Muelle de carga 2', reading: 'EXP-26-41106 · 09:30', status: 'warn', tags: ['L26-258-FUS-BRO-01'], note: '6 palés de C-07 (calle 1) pendientes de decisión.', kv: [['Cliente', 'Distribuidor foodservice ES (zona centro)'], ['Transporte', 'Camión frigorífico −25 °C']] },
            { code: 'M3', name: 'Muelle de carga 3', reading: 'EXP-26-41107 · 11:00', status: 'warn', tags: ['L26-261-FUS-GUI-03', 'L26-255-ALF-ESP-04'], note: '13 palés de C-07 (calles 2 y 3) pendientes de decisión.', kv: [['Cliente', 'Plataforma logística retail ES'], ['Transporte', 'Camión frigorífico −25 °C']] },
            { code: 'M4', name: 'Muelle de carga 4', reading: 'EXP-26-41109 · 14:00', status: 'warn', tags: ['L26-262-FUS-MIX-02'], note: '7 palés de C-07 (calle 4) pendientes de decisión.', kv: [['Cliente', 'EC Foods UK Ltd (filial EC, Reino Unido)'], ['Transporte', 'Camión frigorífico −25 °C']] },
            { code: 'M5', name: 'Muelle de carga 5', reading: 'EXP-26-41111 · 16:30', status: 'warn', tags: ['L26-259-FUS-JUD-01'], note: '6 palés de C-07 (calle 5) pendientes de decisión.', kv: [['Cliente', 'Importador Francia'], ['Transporte', 'Camión frigorífico −25 °C']] },
            { code: 'M6', name: 'Muelle de carga 6', reading: 'EXP-26-41118 · 30/09 07:00', status: 'warn', tags: ['L26-263-FUS-MAI-02'], note: '6 palés de C-07 (calle 6) pendientes de decisión.', kv: [['Cliente', 'EC Frozen Foods LLC (filial EC, EE. UU.)'], ['Transporte', 'Contenedor reefer (consolidación, salida por puerto)']] }
          ] }
        ]
      },
      inbox: {
        alarm: {
          icon: 'thermometer',
          title: 'Cámara C-07 · excursión de temperatura',
          meta: ['Alarma 05:50 · ALM-C07-0550'],
          systems: ['SCADA Galileo'],
          body: 'Pico de −13,9 °C a las 06:25; 50 min por encima de −18 °C. 38 palés de 6 lotes expuestos. La primera expedición afectada, EXP-26-41106, sale a las 09:30 (Muelle 2).'
        },
        complaint: {
          icon: 'mail',
          title: 'Reclamación UKC-44718 · piedra en guisante 1 kg',
          meta: ['26/09 10:14', 'EC Foods UK Ltd', 'Retailer UK (marca blanca)'],
          body: 'Piedra de unos 8 mm, sin lesiones. Lote',
          trace: 'L26-231-FUS-GUI-01',
          after: 'El cliente pide informe de investigación en 5 días hábiles.',
          due: 'Vence el 02/10',
          goLabel: 'Abrir reclamación'
        }
      },
      chart: {
        title: 'Cámara C-07 · temperatura de aire',
        sub: 'Cámara de expedición 7 · consigna −22 °C · ahora −20,5 °C (07:00)',
        icon: 'thermometer',
        tabLabel: 'Temperatura',
        chart: {
          series: TEMP.map((v, i) => ({ time: hhmm(i), value: v })),
          unit: '°C',
          threshold: { value: -18, label: 'Límite −18 °C', legend: 'Límite −18 °C · 50 min por encima' },
          critical: { value: -15, label: 'Crítico −15 °C', legend: 'Crítico −15 °C · 20 min por encima' },
          peak: { x: '06:25', y: -13.9, label: '−13,9 °C · 06:25' },
          yTicks: [-24, -21, -18, -15, -12],
          xTicks: ['05:00', '05:30', '06:00', '06:30', '07:00'],
          annotations: [{ x: '05:50', label: 'Alarma 05:50' }],
          bands: [
            { from: '05:40', to: '06:05', label: 'Desescarche EV-07' },
            { from: '05:52', to: '06:31', label: 'Puerta P-07 abierta', tone: 'warn' }
          ],
          seriesLabel: 'Aire (TT-C07-01)',
          shadeLabel: 'Excursión 05:50–06:40'
        },
        events: [
          { time: '05:35', end: '05:40', text: 'Parada de ventiladores de EV-07 (inicio del ciclo de desescarche)', tone: 'brand', tag: 'EV-07' },
          { time: '05:40', end: '06:05', text: 'Desescarche programado de EV-07', tone: 'brand', tag: 'EV-07' },
          { time: '05:50', text: 'Alarma SCADA: temperatura de aire por encima de -18 °C', tone: 'crit', tag: 'ALM-C07-0550' },
          { time: '05:52', end: '06:31', text: 'Sensor de puerta P-07 abierta: la puerta rápida no completa el cierre', tone: 'warn', tag: 'P-07' },
          { time: '06:31', text: 'Cierre manual de P-07 por el Jefe de turno de expedición', tone: 'warn', tag: 'P-07' },
          { time: '06:40', text: 'La temperatura de aire vuelve por debajo de -18 °C', tone: 'ok' }
        ],
        cause: 'Hipótesis a confirmar por Mantenimiento frigorífico: el desescarche de EV-07 (05:40-06:05) se solapó con un fallo de cierre de la puerta rápida P-07 (sensor de puerta abierta 05:52-06:31).',
        system: 'SCADA Galileo',
        footer: 'Lectura cada 5 min'
      },
      parte: {
        agent: AGENT,
        title: 'Parte diario de equipos',
        sub: 'Lecturas de las 06:00 · 11 equipos de Fustiñana · umbrales de planta',
        colItem: 'Equipo',
        systems: ['MES Mapex', 'SCADA Galileo'],
        inboxTitle: 'Parte diario de equipos · lecturas de las 06:00',
        inboxCount: '11 equipos',
        inboxPending: '4 críticos, uno de ellos un PCC (DM-1), y 3 avisos pendientes de revisar.',
        items,
        news,
        updates,
        steps: [
          { agent: AGENT, system: 'MES Mapex', action: 'Lee las lecturas de las 06:00 de 11 equipos (líneas L1, L2, L3 y L5, frío y servicios)', result: '11 lecturas recibidas, sin huecos', ms: 640 },
          { agent: AGENT, system: 'SCADA Galileo', action: 'Consulta túneles, evaporadores y compresores de amoniaco', result: 'EV-SIL3 lleva 14 h sin desescarche; NH3-C2 vibra a 6,2 mm/s', ms: 520 },
          { agent: AGENT, system: 'Agentic Platform', action: 'Compara cada lectura con sus umbrales de planta (9 indicadores)', result: '4 críticos · 3 avisos · 4 sin incidencias', ms: 60, tone: 'crit' },
          { agent: AGENT, system: 'Elara', action: 'Comprueba los PCC y sus registros de verificación', result: 'DM-1 es PCC: verificación vencida (3,5 h; máximo 2 h)', ms: 380, tone: 'crit' },
          { agent: AGENT, system: 'GMAO', action: 'Busca órdenes abiertas de los equipos con alerta y de su línea', result: 'OT-26-08812 (ENV-5) y OT-26-07415 (DP-2, antes de OPT-2 en L2)', ms: 470 },
          { agent: AGENT, system: 'Elara', action: 'Cruza las alertas con las reclamaciones abiertas', result: 'UKC-44718: piedra de 8 mm en un lote de L2 del 19/08', ms: 350, tone: 'warn' },
          { agent: AGENT, system: 'Modelo de lenguaje', action: 'Redacta la acción recomendada de cada alerta (7 llamadas)', result: '7 borradores, cada uno con su procedimiento de referencia', ms: 6100 },
          { agent: AGENT, system: 'GMAO', action: 'Crea MNT-2026-1184 para DM-1 · prioridad urgente · pcc', result: 'Creado y asignado a Mantenimiento de línea y Calidad de turno', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'GMAO', action: 'Crea MNT-2026-1185 para NH3-C2 · prioridad alta', result: 'Creado y asignado a Mantenimiento frigorífico', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'GMAO', action: 'Crea MNT-2026-1186 para ESC-3 · prioridad alta', result: 'Creado y asignado a Mantenimiento de línea', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'GMAO', action: 'Crea MNT-2026-1187 para TUN-1 · prioridad media', result: 'Creado y asignado a Mantenimiento frigorífico', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'GMAO', action: 'Crea MNT-2026-1188 para EV-SIL3 · prioridad media', result: 'Creado y asignado a Mantenimiento frigorífico', ms: 240, tone: 'ok' },
          { agent: AGENT, system: 'GMAO', action: 'Actualiza OT-26-07415 (malla de DP-2) con la lectura de hoy', result: 'Evidencia añadida · prioridad alta propuesta · sin ticket duplicado', ms: 220 },
          { agent: AGENT, system: 'GMAO', action: 'Actualiza OT-26-08812 (ENV-5) con la lectura de hoy', result: 'Lectura añadida · sin ticket duplicado', ms: 220 },
          { agent: AGENT, system: 'Microsoft Teams', action: 'Publica el resumen en el canal «Mantenimiento · Fustiñana»', result: 'Enviado: 4 críticos, 3 avisos y 5 tickets', ms: 410, tone: 'ok' }
        ],
        stats: [
          { label: 'Equipos revisados', value: 11 },
          { label: 'Tickets creados', value: 5, tone: 'ok' },
          { label: 'Órdenes actualizadas, sin duplicar', value: 2 },
          { label: 'PCC con verificación vencida', value: 1, tone: 'crit' }
        ],
        relation: {
          title: 'Posible relación con la reclamación UKC-44718',
          body: 'Selectora óptica OPT-2 (L2) rechaza el 4,8 % de producto (referencia 1,5 %) y la malla de la despedregadora DP-2 sigue pendiente de repuesto: OT-26-07415, abierta desde el 18/08/2026 (42 días). La reclamación UKC-44718 (piedra de 8 mm) es del lote L26-231-FUS-GUI-01, procesado en L2 el 19/08/2026, un día después de anotarse el desgaste.',
          more: 'IT-MAN-DP-02 pide inspección reforzada de la malla hasta sustituirla. A confirmar por Calidad.',
          plain: 'OPT-2 (L2) rechaza el 4,8 % (referencia 1,5 %) y la malla de DP-2 sigue pendiente de repuesto (OT-26-07415, abierta desde el 18/08/2026, 42 días). La reclamación UKC-44718 (piedra de 8 mm) corresponde al lote L26-231-FUS-GUI-01, procesado en L2 el 19/08/2026. IT-MAN-DP-02 pide inspección reforzada hasta sustituir la malla. A confirmar por Calidad.',
          go: 'reclamacion',
          goLabel: 'Abrir la reclamación'
        },
        policy: 'Política aplicada: los tickets de mantenimiento se crean sin aprobación previa; retener o bloquear producto (por ejemplo, el envasado desde la última verificación correcta de DM-1) requiere la aprobación de Calidad (PNT-CAL-015).',
        channel: 'Mantenimiento · Fustiñana',
        resultSummary: '5 tickets creados en la GMAO, 2 órdenes existentes actualizadas y resumen publicado en Microsoft Teams.',
        auditRequest: 'Fustiñana · lecturas de las 06:00 · 11 equipos',
        auditNew: 'Ticket de mantenimiento creado',
        auditUpdate: 'Orden de mantenimiento actualizada',
        reportTitle: 'Parte diario de equipos · Fustiñana',
        reportCode: 'PD-FUS-20260929',
        reportMeta: [['Planta', 'Fustiñana (FUS)'], ['Turno', 'Mañana'], ['Equipos revisados', '11'], ['Críticos · avisos', '4 · 3']],
        reportSummary: 'De 11 equipos revisados, 4 están en estado crítico y 3 en aviso. El detector de metales DM-1 es un PCC con la verificación vencida. Se han creado 5 tickets de mantenimiento y se han actualizado 2 órdenes existentes, sin duplicarlas.',
        signatures: [{ role: 'Responsable de Calidad de turno', note: 'Revisado' }, { role: 'Mantenimiento de línea', note: 'Recibido' }]
      },
      presenter: {
        say: [
          'Así empieza el turno el Responsable de Calidad en Fustiñana: lo que pide una decisión, en una sola bandeja.',
          'Los datos llegan de sus sistemas: temperaturas de Galileo/SCADA, lotes de SAP, palés de Easy WMS y lecturas de Mapex. Aquí son sintéticos, pero coherentes entre sí.',
          'El plano de Fustiñana resume la planta de un vistazo: gris lo normal, color lo que pide atención. C-07 está en rojo; al pulsarla se ven sus palés, los silos con palés de los mismos lotes y los muelles de las expediciones afectadas.',
          'Tres asuntos: la alarma de C-07 de las 05:50 (38 palés; la primera expedición sale a las 09:30), la reclamación UKC-44718 del Reino Unido y el parte con 4 críticos, uno de ellos un PCC.'
        ],
        sayBefore: ['Generar parte diario: revisa 11 equipos, no duplica órdenes abiertas y crea los tickets. Fijaos en el tiempo.'],
        sayAfter: [
          'Relación que encuentra Agentic Platform: OPT-2 rechaza el triple, la malla de DP-2 lleva 42 días pendiente y la piedra de la reclamación es de un lote de L2. Nadie ha tenido que cruzar tres sistemas.',
          'Y no duplica: dos órdenes ya abiertas se actualizan en lugar de abrir tickets nuevos.'
        ],
        next: 'Pulsar «Generar parte diario» y comentar el registro mientras se ejecuta.',
        nextAfter: 'Ir a «De palabras a workflow» (flecha derecha) para crear la respuesta a la alarma de C-07 a partir del procedimiento escrito.'
      }
    };
  })()
});
