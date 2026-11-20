/* Subtropicales Axarquía · alarma con aprobación: desviación de temperatura en la cámara de maduración controlada CM-06 (aguacate Hass, lote AH-2611-118).
 * Escenario de la demo con datos sintéticos (MFM). Las funciones reciben el contexto H de la escena
 * (W workflow, C condición evaluada, sc alcance vigente, ids generados al aprobar, fmt, fv, pl…). */
(function () {
  'use strict';

  /* Temperatura de aire de la cámara CM-06 (sonda TT-CM06-01), una lectura cada 5 min de 05:00 a 07:00. El compresor CP-06 falló a las 03:40. */
  const TEMPS = [6.6, 6.8, 7.0, 7.2, 7.4, 7.5, 7.6, 7.7, 7.8, 7.9, 8.3, 8.7, 9.1, 9.4, 9.7, 9.9, 10.2, 10.5, 10.7, 10.9, 11.0, 11.1, 11.2, 11.3, 11.4];
  const hhmm = (m) => `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
  const SERIES = TEMPS.map((v, i) => ({ time: hhmm(300 + i * 5), value: v }));

  /* Pedidos servidos con los 9 palés del lote AH-2611-118 que hay en CM-06 (por fila): 9 palés, 13.995 kg (14 t). */
  const ORDERS = [
    { id: 'ECO-2026-1120', title: 'Aguacate Hass calibre 18 · ready to eat', sub: 'Tienda online · pedidos de hoy', lane: 1, count: 1, first: 9, of: 9, kgpp: 1555, cost: 2.5, hold: 'EXP-26-6101' },
    { id: 'PED-2026-44790', title: 'Aguacate Hass calibre 18 · ready to eat', sub: 'Hipermercados Costa Verde, S.A. (España)', lane: 2, count: 3, first: 1, of: 9, kgpp: 1555, cost: 2.4, hold: 'EXP-26-6102' },
    { id: 'PED-2026-44795', title: 'Aguacate Hass calibre 18 · ready to eat', sub: 'Marché Soleil SAS (Francia)', lane: 3, count: 3, first: 4, of: 9, kgpp: 1555, cost: 2.4, hold: 'EXP-26-6103' },
    { id: 'PED-2026-44801', title: 'Aguacate Hass calibre 18 · ready to eat', sub: 'Frischmarkt Süd GmbH (Alemania)', lane: 4, count: 2, first: 7, of: 9, kgpp: 1555, cost: 2.4, hold: 'EXP-26-6104' }
  ];
  /* Palés del mismo lote fuera de CM-06 (CM-03, no expuestos) y ya expedidos antes de la alarma. */
  const ELSE = {
    'PED-2026-44790': [{ loc: 'CM-03', count: 4, note: 'AH-2611-118 · CM-03 · 6,2 °C, en límites' }]
  };
  const GONE = {
    'PED-2026-44795': [{ id: 'ALB-26-9102', date: '2026-11-19', time: '17:40', count: 3, to: 'Marché Soleil SAS (Francia)' }]
  };
  /* Identificador de cada palé en CM-06: PAL-AH-2611-118-<n>. */
  const UNITS = [];
  ORDERS.forEach((l) => {
    for (let k = 0; k < l.count; k += 1) {
      const n = l.first + k;
      UNITS.push({ item: l.id, product: l.title, pallet: `${n}/${l.of}`, sscc: `PAL-AH-2611-118-${String(n).padStart(2, '0')}`, kg: l.kgpp, position: `CM-06 · fila ${l.lane} · hueco ${k + 1}`, hold: l.hold });
    }
  });

  const ROLE = {
    qa_shift: 'Responsable de calidad y seguridad alimentaria', ripening_shift: 'Responsable de maduración y frío', packing_shift: 'Jefe de manipulado y envasado',
    ecommerce: 'Responsable de la tienda online', customer_care: 'Atención al cliente', logistics: 'Responsable de expediciones y exportación',
    lab_shift: 'Jefe de laboratorio', decider: 'Responsable de operaciones y calidad'
  };
  const TEAMS = 'Calidad y expediciones · Centro de manipulado';
  const ANT_ITEM = 'PED-2026-44795';
  const lots = (sc) => sc.items.length;
  const hasAnt = (sc) => sc.items.some((l) => l.id === ANT_ITEM);
  const palsOf = (sc, h) => sc.items.filter((l) => l.hold === h.id).reduce((s, l) => s + l.count, 0);

  agenticPack('fruta', {
    alarma: {
      nav: 'Alarma CM-06',
      title: 'Alarma de frío en ejecución',
      icon: 'thermometer',
      page_title: 'Cámara CM-06 · desviación de temperatura',
      alarm_id: 'ALM-FRIO-0612',
      alarm_time: '05:50',
      source_system: 'Control de cámaras',
      asset: 'cámara de maduración CM-06',
      location: 'Centro de manipulado de la Axarquía (Málaga) · Cámara de maduración controlada 6',
      excursion_noun: 'desviación',
      workflow_topic: 'cadena de frío y maduración',
      policy_ref: 'PR-MAD-002',
      procedures: 'PR-MAD-002 · PR-TRZ-003',
      decider_short: 'Calidad y seguridad alimentaria',
      decider_of: 'de Calidad y seguridad alimentaria',
      approval_node: 'Aprobación de Calidad',
      measure: { short: 'temperatura de aire', col: 'Aire', unit: '°C', dec: 1, icon: 'thermometer' },
      setpoint: 6,
      setpoint_label: 'consigna',
      limit: 8,
      critical: 10,
      min_minutes: 15,
      interval_min: 5,
      series: SERIES,
      peak: 11.4,
      peak_time: '07:00',
      current: 11.4,
      current_time: '07:00',
      current_note: 'sigue por encima del límite desde las 05:50',
      chart: {
        title: 'Cámara CM-06 · temperatura de aire',
        sub: 'Consigna 6,0 °C · ahora 11,4 °C (07:00)',
        tab: 'Temperatura',
        series_label: 'Aire (TT-CM06-01)',
        yTicks: [6, 8, 10, 12],
        xTicks: ['05:00', '05:30', '06:00', '06:30', '07:00']
      },
      event_kv: [
        ['Cámara', 'CM-06 · Cámara de maduración controlada 6 · capacidad 24 palés'],
        ['Sonda', 'TT-CM06-01 · aire · lectura cada 5 min · consigna 6,0 °C'],
        ['Equipos', 'CP-06 (compresor, parado desde las 03:40) · EV-06 (evaporador)'],
        ['Contenido', '9 palés de aguacate Hass calibre 18 · lote AH-2611-118 · 14 t']
      ],
      events: [
        { time: '05:05', end: '05:50', text: 'El compresor CP-06 sigue parado tras el disparo de las 03:40 y la cámara pierde frío', equipment: 'CP-06', tone: 'brand', band: 'CP-06 parado' },
        { time: '05:50', text: 'Alarma de control de cámaras: temperatura de aire por encima de 8 °C en CM-06', ref: 'ALM-FRIO-0612', tone: 'crit' },
        { time: '05:55', end: '06:30', text: 'Intento de rearme de CP-06 sin éxito; EV-06 sigue moviendo aire sin frío', equipment: 'CP-06', tone: 'warn', band: 'Rearme fallido de CP-06', bandTone: 'warn' },
        { time: '06:20', text: 'La temperatura de aire supera los 10 °C: desviación crítica', tone: 'crit' },
        { time: '06:30', text: 'El Jefe de manipulado y envasado suspende la carga de los muelles con fruta de CM-06', equipment: 'Expediciones', tone: 'warn' }
      ],
      probable_cause: 'Hipótesis a confirmar por el Responsable de maduración y frío: disparo del compresor CP-06 a las 03:40 (protección por alta presión) sin arranque del compresor de reserva; la alarma se activó a las 05:50, al cruzar el límite de 8 °C.',
      backup: { id: 'wf-cadena-frio-respaldo', name: 'Desviación de temperatura en cámaras de maduración', version: 'v1', threshold: 8, minutes: 15, critical: 10, approver: ROLE.qa_shift },
      untouched: 'SAP S/4HANA, WMS, LIMS, la tienda online (PrestaShop), Outlook ni Microsoft Teams',
      apply_systems: 'SAP S/4HANA, WMS, LIMS, Tienda online (PrestaShop), Outlook y Microsoft Teams',
      llm_cost_usd: 0.04,
      ids: [
        { key: 'blq', prefix: 'BLQ-2026-', start: 1311, label: 'Retención' },
        { key: 'nc', prefix: 'NC-2026-', start: 704, label: 'No conformidad' },
        { key: 'ot', prefix: 'OT-2026-', start: 5217, label: 'Orden de trabajo' }
      ],
      block_id_key: 'blq',
      proposer: 'blq',
      lanes: [
        { id: 'mon', name: 'Monitor de cámaras', short: 'Monitor', icon: 'thermometer', systems: ['Control de cámaras'], idle: 'Confirma la desviación con las lecturas de la cámara', gsub: 'confirma la desviación', gsys: ['Control de cámaras'] },
        { id: 'traz', name: 'Trazabilidad', icon: 'git-branch', systems: ['WMS', 'SAP S/4HANA', 'Trazabilidad de campo'], idle: 'Localiza palés, lote y pedidos', gsub: 'palés, lote y pedidos', gsys: ['WMS', 'SAP', 'Campo'] },
        { id: 'blq', phase: 2, name: 'Calidad', icon: 'lock', systems: ['SAP S/4HANA', 'WMS', 'LIMS'], idle: 'Prepara la retención del lote y el muestreo de firmeza y color y pide la aprobación de Calidad', gsub: 'retiene y muestrea', gsys: ['SAP', 'WMS', 'LIMS'] },
        { id: 'man', phase: 2, name: 'Mantenimiento', icon: 'wrench', systems: ['SAP S/4HANA', 'WMS', 'Microsoft Teams'], idle: 'Abre la OT del compresor y el traslado de los palés a CM-02', gsub: 'OT y traslado a CM-02', gsys: ['SAP', 'WMS', 'Teams'] },
        { id: 'log', phase: 2, name: 'Logística y pedidos', icon: 'truck', systems: ['WMS', 'Tienda online (PrestaShop)', 'Outlook', 'Microsoft Teams'], idle: 'Reasigna las expediciones y avisa a los clientes', gsub: 'reasigna y avisa', gsys: ['WMS', 'PrestaShop', 'Outlook', 'Teams'] }
      ],
      steps: {
        p1: (H) => {
          const a = H.all;
          return [
            { lane: 'mon', system: 'Control de cámaras', verb: 'Consultando', action: 'Lee la sonda TT-CM06-01 de 05:00 a 07:00, una lectura cada 5 min', result: `${SERIES.length} lecturas, sin huecos · ahora ${H.fv(11.4)} (07:00)`, ms: 1850, set: { volume: `${SERIES.length} lecturas de temperatura` } },
            { lane: 'mon', system: 'Agentic Platform', eval: true, ms: 90 },
            { lane: 'mon', system: 'Control de cámaras', verb: 'Consultando', action: 'Cruza la desviación con el estado del compresor CP-06 y del evaporador EV-06', result: `CP-06 parado desde las 03:40 y rearme fallido 05:55–06:30: hipótesis para el ${ROLE.ripening_shift}`, tone: 'warn', ms: 1400, set: { volume: `${SERIES.length} lecturas · 5 eventos`, result: `Desviación confirmada: ${H.C.above} min por encima · pico ${H.fv(11.4)}` } },
            { lane: 'traz', system: 'WMS', verb: 'Consultando', action: 'Lista los palés ubicados en CM-06 desde las 03:40, por fila', result: `${a.count} palés (${H.fmt.kg(a.qty)}) en ${lots(a)} filas`, ms: 2100, set: { volume: `${a.count} palés` } },
            { lane: 'traz', system: 'Trazabilidad de campo', verb: 'Consultando', action: 'Resuelve lote, fincas y productores de los palés', result: `Un solo lote, AH-2611-118 · aguacate Hass calibre 18 · 14 t, de fincas de la Axarquía`, ms: 1900, set: { volume: `${a.count} palés · 1 lote` } },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Consultando', action: 'Resuelve los pedidos que van a consumir los palés', result: `${lots(a)} destinos: 3 supermercados (España, Francia y Alemania) y los pedidos de la tienda online de hoy · ${H.fmt.eur(a.value)} a coste estándar`, ms: 2600, set: { volume: `${a.count} palés · ${lots(a)} pedidos` }, reveal: 'lots' },
            { lane: 'traz', system: 'WMS', verb: 'Consultando', action: 'Busca palés del mismo lote fuera de CM-06', result: `${a.elseTotal} palés en CM-03, a evaluar · ${H.goneTotal} palés ya expedidos antes de la alarma`, ms: 1700, reveal: 'map' },
            { lane: 'traz', system: 'SAP S/4HANA', verb: 'Consultando', action: 'Consulta las expediciones planificadas de esos palés', result: `${a.holds.length} expediciones; la primera, ${H.first.id}, a las ${H.first.time} por el ${H.first.where}`, tone: 'warn', ms: 2200, set: { volume: `${a.count} palés · ${lots(a)} pedidos · ${a.holds.length} expediciones`, result: `Primera expedición afectada a las ${H.first.time}` }, milestone: 'traz', audit: { action: 'Palés, lote y pedidos identificados', detail: `${a.count} palés del lote AH-2611-118 en CM-06 · ${lots(a)} pedidos · ${a.holds.length} expediciones planificadas · ${a.elseTotal} palés del mismo lote en CM-03 · ${H.goneTotal} palés ya expedidos` } },
            { lane: 'blq', node: 'apr', system: 'Procedimientos', verb: 'Analizando', action: 'Aplica PR-MAD-002 y PR-TRZ-003 a esta desviación', result: 'Retener el lote, muestrear firmeza y color, trasladar los palés a CM-02 y reasignar las expediciones; solo Calidad y seguridad alimentaria libera', ms: 1300 },
            { lane: 'blq', node: 'apr', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta la propuesta de retención y su motivo con las evidencias', result: `Propuesta: ${a.count} palés del lote AH-2611-118 retenidos, traslado a CM-02 y ${a.holds.length} expediciones retenidas; ${a.elseTotal} palés en CM-03, a evaluar`, ms: 7000, set: { volume: `${a.count} palés · ${a.holds.length} expediciones` } },
            { lane: 'blq', node: 'apr', system: 'Agentic Platform', verb: 'Evaluando', action: `Pide la aprobación del ${H.W.approver} antes de escribir en SAP S/4HANA y en el WMS`, result: 'Esperando la decisión de Calidad y seguridad alimentaria', tone: 'warn', ms: 60, wait: 1500, set: { result: 'Propuesta enviada a Calidad' }, milestone: 'prop', audit: { action: 'Propuesta de retención enviada a aprobación', detail: `${a.count} palés del lote AH-2611-118 · aprueba ${H.W.approver}` } }
          ];
        },
        p2: (H) => {
          const sc = H.sc;
          const ids = H.ids;
          const ships = sc.holds.map((h) => h.id).join(', ');
          return [
            { lane: 'blq', system: 'SAP S/4HANA', verb: 'Aplicando', action: `Registra la retención de calidad del lote AH-2611-118 (${sc.count} palés en CM-06)`, result: `${ids.blq} · ${sc.count} palés en estado «retenido»`, tone: 'ok', ms: 2400, milestone: 'blq', audit: { action: 'Retención aplicada', detail: `${ids.blq} · SAP S/4HANA · lote AH-2611-118 · ${sc.count} palés de ${lots(sc)} pedidos` } },
            { lane: 'blq', system: 'WMS', verb: 'Aplicando', action: `Inmoviliza los ${sc.count} palés y retiene sus expediciones`, result: `${sc.count} palés inmovilizados · ${sc.holds.length} expediciones retenidas, la primera ${H.holdWhen(sc.holds[0]).includes('/') ? 'el' : 'a las'} ${H.holdWhen(sc.holds[0])}`, tone: 'ok', ms: 2100, set: { result: `${ids.blq} aplicado · ${sc.holds.length} expediciones retenidas` }, milestone: 'wms', audit: { action: 'Palés inmovilizados y expediciones retenidas', detail: `WMS · ${sc.count} palés · ${ships}` } },
            { lane: 'blq', system: 'LIMS', verb: 'Aplicando', action: 'Programa el muestreo de firmeza y color de los palés expuestos', result: `${sc.count} palés a muestrear · resultados antes de las ${H.first.time}`, tone: 'ok', ms: 1500, audit: { action: 'Muestreo de firmeza y color programado', detail: `LIMS · ${sc.count} palés del lote AH-2611-118 · informe para decidir el destino` } },
            { lane: 'blq', system: 'SAP S/4HANA', verb: 'Aplicando', action: 'Abre la no conformidad con la curva de temperatura, los eventos y los palés', result: `${ids.nc} abierta${hasAnt(sc) ? ' · antecedente NC-2026-0521 enlazado' : ''}`, tone: 'ok', ms: 1900, set: { volume: '1 no conformidad' }, milestone: 'nc', audit: { action: 'No conformidad abierta', detail: `${ids.nc} · SAP S/4HANA · desviación de temperatura en CM-06` } },
            { lane: 'blq', system: 'Modelo de lenguaje', verb: 'Redactando', action: 'Redacta el borrador de 8D (D1–D8) con responsables por rol', result: 'Borrador de 8D listo para la revisión de Calidad', ms: 7800, set: { volume: '1 no conformidad · 8D en borrador' }, milestone: 'd8', audit: { action: 'Borrador de 8D redactado', detail: `${ids.nc} · D1–D8 · pendiente de revisión de Calidad` } },
            { lane: 'man', system: 'SAP S/4HANA', verb: 'Aplicando', action: 'Abre la orden de trabajo de prioridad 1 para el compresor CP-06', result: `${ids.ot} abierta · asignada a ${ROLE.ripening_shift}`, tone: 'ok', ms: 1700, set: { volume: '1 no conformidad · 1 OT' }, milestone: 'ot', audit: { action: 'Orden de trabajo abierta', detail: `${ids.ot} · SAP S/4HANA · compresor CP-06 de CM-06 · prioridad 1` } },
            { lane: 'man', system: 'WMS', verb: 'Aplicando', action: `Genera el traslado de los ${sc.count} palés retenidos a la cámara CM-02`, result: `${sc.count} palés en traslado a CM-02 (consigna 6,0 °C, con hueco libre)`, tone: 'ok', ms: 1800, audit: { action: 'Traslado a CM-02 generado', detail: `WMS · ${sc.count} palés · CM-06 → CM-02 · retenidos hasta la decisión de Calidad` } },
            { lane: 'man', system: 'Microsoft Teams', verb: 'Enviando', action: `Avisa al ${ROLE.ripening_shift} y al ${ROLE.packing_shift}`, result: `Aviso publicado en el canal «${TEAMS}»`, tone: 'ok', ms: 900, wait: 1600, set: { volume: '1 no conformidad · 1 OT · 1 aviso', result: `${ids.nc} abierta · ${ids.ot} asignada` }, milestone: 'teams', audit: { action: 'Aviso enviado por Teams', detail: `${ROLE.ripening_shift} y ${ROLE.packing_shift} · canal «${TEAMS}»` } },
            { lane: 'log', system: 'WMS', verb: 'Aplicando', action: `Propone reasignar las ${sc.holds.length} expediciones retenidas con fruta disponible de otros lotes`, result: `${sc.holds.length} reasignaciones propuestas, a confirmar por el ${ROLE.logistics}`, tone: 'ok', ms: 1600, audit: { action: 'Reasignación de expediciones propuesta', detail: `WMS · ${ships} · pendiente de confirmación de ${ROLE.logistics}` } },
            { lane: 'log', system: 'Tienda online (PrestaShop)', verb: 'Aplicando', action: 'Marca los pedidos de hoy de la tienda online con fruta de CM-06 para revisar su entrega', result: 'Pedidos de hoy afectados señalados en PrestaShop, sin cancelar ninguno', tone: 'ok', ms: 1400, audit: { action: 'Pedidos online señalados', detail: `PrestaShop · pedidos de hoy con fruta del lote AH-2611-118 · a cargo de ${ROLE.ecommerce}` } },
            { lane: 'log', system: 'Outlook', verb: 'Preparando', action: `Deja en borradores el aviso a los 3 supermercados con pedidos afectados, para que lo revise ${ROLE.logistics} y lo envíe ${ROLE.customer_care}`, result: '3 borradores de aviso en Outlook, sin enviar', tone: 'ok', ms: 1200, audit: { action: 'Avisos a clientes en borrador', detail: `${ids.nc} · 3 supermercados · pendientes de revisión de ${ROLE.logistics}` } }
          ];
        }
      },
      kpis: (H, held) => [
        { label: 'Palés en CM-06 durante la desviación', value: H.all.count, sub: `${lots(H.all)} pedidos · ${H.fmt.kg(H.all.qty)} · ya expedidos: ${H.goneTotal} palés`, icon: 'pallet' },
        { label: 'Primera expedición afectada', value: H.first.time, sub: `${H.first.id} · ${H.first.where} · ${H.pl(H.holdCount(H.all, H.first))}${held ? ' · retenida' : ''}`, icon: 'truck' }
      ],
      scope: {
        icon: 'pallet',
        unit: ['palé', 'palés'],
        item_noun: ['pedido', 'pedidos'],
        qty_unit: 'kg',
        per_square: 1,
        items: ORDERS.map((l) => Object.assign({
          id: l.id, title: l.title, sub: l.sub, group: `Fila ${l.lane}`, group_short: `Fila ${l.lane}`,
          count: l.count, qty: l.count * l.kgpp, value: Math.round(l.count * l.kgpp * l.cost * 100) / 100, hold: l.hold
        }, ELSE[l.id] ? { elsewhere: ELSE[l.id] } : {}, GONE[l.id] ? { gone: GONE[l.id] } : {})),
        holds: {
          'EXP-26-6101': { date: '2026-11-20', time: '09:00', where: 'Muelle 1', label: 'Tienda online · pedidos de hoy' },
          'EXP-26-6102': { date: '2026-11-20', time: '11:30', where: 'Muelle 2', label: 'Hipermercados Costa Verde, S.A. (España)' },
          'EXP-26-6103': { date: '2026-11-20', time: '14:00', where: 'Muelle 3', label: 'Marché Soleil SAS (Francia) · exportación' },
          'EXP-26-6104': { date: '2026-11-21', time: '07:30', where: 'Muelle 4', label: 'Frischmarkt Süd GmbH (Alemania) · exportación' }
        },
        units: UNITS,
        csv_name: 'pales-cm-06-desviacion',
        csv_cols: [
          { label: 'Pedido', key: 'item' },
          { label: 'Producto', key: 'product' },
          { label: 'Palé', key: 'pallet' },
          { label: 'ID de palé', key: 'sscc', text: true },
          { label: 'Kg', key: 'kg' },
          { label: 'Ubicación', key: 'position' },
          { label: 'Expedición planificada', key: 'hold' }
        ],
        labels: {
          items_title: 'Pedidos y palés afectados',
          items_systems: 'WMS y SAP S/4HANA',
          items_where: 'palés en CM-06,',
          item_col: 'Pedido',
          at_col: 'En CM-06',
          group_col: 'Fila',
          hold_col: 'Expedición planificada',
          else_col: 'Fuera de CM-06',
          else_none: 'Sin existencias',
          gone_verb: 'expedidos',
          exposed: 'Expuesto',
          blocked: 'Retenido',
          unblocked: 'Sin retención',
          block_noun: 'retención',
          block_verb: 'Retener',
          hold_verb: 'Retener',
          held: 'Retenidas',
          holds_label: 'Expediciones planificadas',
          holds_first: 'la primera',
          scope_main: 'Palés en CM-06 durante la desviación',
          else_scope: 'Mismo lote en CM-03',
          else_decision: 'A evaluar',
          map_title: 'Ubicación de los palés',
          map_sub: 'WMS · Centro de manipulado de la Axarquía',
          zone_title: 'CM-06 · Cámara de maduración controlada 6',
          zone_sub: '4 filas · 24 huecos',
          else_title: 'Mismo lote en CM-03',
          else_sub: 'no estuvieron en CM-06 · a evaluar',
          gone_title: 'Expedidos antes de la alarma',
          legend_exposed: 'Expuesto a la desviación',
          legend_else: 'A evaluar en CM-03',
          csv_button: 'Descargar palés (CSV)',
          value_label: 'a coste estándar',
          report_scope: 'Alcance de la retención'
        }
      },
      text: {
        proposal_title: 'propuesta de retención',
        stop_without: 'proponer la retención',
        activates: 'la retención',
        no_proposal: 'sin propuesta de retención',
        idle_log: 'La ejecución se detiene en la aprobación: nada se escribe en SAP S/4HANA, en el WMS ni en la tienda online sin la decisión de Calidad y seguridad alimentaria.',
        approve_action: 'Aprueba la retención',
        scope_short: (H) => `${H.pl(H.sc.count)} de ${H.fmt.plural(lots(H.sc), 'pedido', 'pedidos')} y ${H.fmt.plural(H.sc.holds.length, 'expedición retenida', 'expediciones retenidas')}`,
        audit_approved: 'Retención aprobada',
        audit_approved_detail: (H) => `${H.ids.blq} · ${H.sc.count} palés del lote AH-2611-118 en CM-06 · ${H.sc.holds.length} expediciones retenidas${H.sc.out.length ? ` · alcance editado (sin ${H.sc.out.map((l) => l.id).join(', ')})` : ''}`,
        outcome_approved: (H) => `Retención ${H.ids.blq} aprobada · ${H.sc.count} palés`,
        audit_rejected: 'Retención rechazada',
        outcome_rejected: 'Retención rechazada · sin acciones aplicadas',
        toast_done: (H) => `${H.ids.blq} aplicado · ${H.ids.nc} y ${H.ids.ot} abiertas · aviso enviado por Teams`,
        presenter_applying: 'Tras la aprobación: retención en SAP S/4HANA, palés inmovilizados en el WMS, muestreo en LIMS, no conformidad y OT del compresor, traslado a CM-02, pedidos online señalados y borradores de aviso a clientes.',
        reject_nothing: 'ni retención en SAP S/4HANA, ni palés inmovilizados en el WMS, ni muestreo en LIMS, ni no conformidad, ni OT, ni traslado a CM-02, ni avisos',
        edit_intro: 'PR-MAD-002 pide retener todos los palés expuestos de la cámara.'
      },
      approval: {
        id: 'blq-cm-06',
        approve_label: 'Aprobar retención',
        policy: 'PR-MAD-002 · PR-TRZ-003 · solo Calidad y seguridad alimentaria libera',
        title: (H) => `Retención de calidad · ${H.pl(H.sc.count)} de aguacate Hass en CM-06`,
        summary: (H) => `Motivo: aire por encima de ${H.fv(H.C.threshold)} durante ${H.C.above} min (${H.span}), más de los ${H.C.minutes} min que fija ${H.W.backup ? 'PR-MAD-002' : 'el workflow'}${H.critMin ? `, y ${H.critMin} min por encima de ${H.fv(H.crit)}: desviación crítica` : ''}. Se retienen los palés del lote AH-2611-118 hasta medir firmeza y color y decidir su destino, se trasladan a CM-02, se retienen las expediciones y se prepara el aviso a los clientes afectados.`,
        extra_scope: () => [],
        effects: (H) => [
          `SAP S/4HANA: retención de calidad del lote AH-2611-118 (${H.sc.count} palés en CM-06)`,
          `WMS: ${H.sc.count} palés inmovilizados, ${H.sc.holds.length} expediciones retenidas y traslado a CM-02`,
          'LIMS: muestreo de firmeza y color de los palés expuestos',
          'SAP S/4HANA: no conformidad con borrador de 8D y orden de trabajo del compresor CP-06',
          'Tienda online (PrestaShop): pedidos de hoy afectados señalados, sin cancelar',
          `Microsoft Teams: aviso a ${ROLE.ripening_shift} y ${ROLE.packing_shift}`,
          'Outlook: 3 borradores de aviso a supermercados, sin enviar'
        ],
        applied: (H) => [
          `SAP S/4HANA: ${H.ids.blq} · lote AH-2611-118 (${H.sc.count} palés)`,
          `WMS: ${H.sc.count} palés inmovilizados, ${H.sc.holds.length} expediciones retenidas y traslado a CM-02`,
          `LIMS: muestreo de ${H.sc.count} palés`,
          `SAP S/4HANA: ${H.ids.nc} con borrador de 8D y ${H.ids.ot} para CP-06`,
          'Tienda online (PrestaShop): pedidos de hoy señalados',
          `Microsoft Teams: aviso a ${ROLE.ripening_shift} y ${ROLE.packing_shift}`,
          'Outlook: 3 borradores de aviso a supermercados, sin enviar'
        ]
      },
      result: {
        title: (H) => `Retención ${H.ids.blq} aplicada y no conformidad ${H.ids.nc} abierta`,
        stats: (H) => [
          { label: 'Palés retenidos', value: H.sc.count, tone: 'crit' },
          { label: 'Expediciones retenidas', value: H.sc.holds.length },
          { label: 'Palés ya expedidos a evaluar', value: H.goneTotal, tone: 'warn' },
          { label: 'Palés en CM-03 a evaluar', value: H.sc.elseTotal, tone: 'warn' }
        ],
        tiles: (H) => [
          {
            icon: 'lock', tone: 'crit', title: `Retención ${H.ids.blq}`, systems: ['SAP S/4HANA', 'WMS', 'LIMS'],
            kv: [
              ['Estado', App.chip('blocked')],
              ['Alcance', `${H.pl(H.sc.count)} · ${H.fmt.plural(lots(H.sc), 'pedido', 'pedidos')} · ${H.fmt.kg(H.sc.qty)}`],
              ['Valor a coste estándar', H.fmt.eur(H.sc.value)],
              ['Expediciones retenidas', H.sc.holds.map((h) => h.id).join(', ')],
              ['Libera', `${ROLE.qa_shift} (PR-TRZ-003)`]
            ],
            next: 'Siguiente paso según PR-MAD-002: medir firmeza, color y temperatura de pulpa en una muestra de cada fila y decidir el destino de cada palé (liberar, reclasificar para procesado o destruir).',
            buttons: [{ action: 'csv', label: 'Palés retenidos (CSV)' }]
          },
          {
            icon: 'wrench', title: `OT ${H.ids.ot} y traslado a CM-02`, systems: ['SAP S/4HANA', 'WMS'], chip: ['running', 'Prioridad 1'],
            kv: [
              ['Equipo', 'Compresor CP-06 · cámara CM-06'],
              ['Asignada a', ROLE.ripening_shift],
              ['Traslado', `${H.pl(H.sc.count)} a CM-02, retenidos hasta la decisión de Calidad`]
            ]
          },
          {
            icon: 'clipboard', title: `No conformidad ${H.ids.nc}`, systems: ['SAP S/4HANA'], chip: ['draft', '8D en borrador'],
            items: D8(H),
            buttons: [{ action: 'report-doc', icon: 'printer', label: 'Descargar borrador 8D (PDF)' }]
          },
          {
            icon: 'send', title: 'Aviso a maduración y manipulado', systems: ['Microsoft Teams'], note: H.run.endAt ? `enviado a las ${H.fmt.time(H.run.endAt)}` : '',
            message: {
              icon: 'message-square', from: 'Agentic Platform · agente Mantenimiento', channel: `canal «${TEAMS}»`, at: H.run.endAt ? H.fmt.time(H.run.endAt) : '',
              paras: [
                { to: ROLE.packing_shift, text: `Retención ${H.ids.blq} del lote AH-2611-118, aprobada por ${H.decision ? H.decision.by : H.W.approver}${H.decision ? ` a las ${H.fmt.time(H.decision.at)}` : ''}. No cargar fruta de CM-06 hasta nueva decisión de Calidad:` },
                { to: ROLE.ripening_shift, text: `Revisar el compresor CP-06 (${H.ids.ot}, prioridad 1) y supervisar el traslado de los palés a CM-02. Detalle en ${H.ids.nc} (SAP S/4HANA).` }
              ],
              list: H.sc.holds.map((h) => `${h.id} · ${H.holdWhen(h)} · ${h.where} · ${H.pl(palsOf(H.sc, h))}`)
            }
          }
        ]
      },
      doc: {
        code: 'REG-CAL-020-02',
        lane: 'blq',
        heading: 'Disciplinas D1–D8',
        col_d: 'D',
        title: (H) => `Informe 8D · ${H.ids.nc}`,
        subtitle: 'No conformidad por desviación de temperatura en la cámara CM-06 · borrador para revisión',
        filename: (H) => `borrador-8d-${H.ids.nc}`,
        meta: (H) => [['No conformidad', H.ids.nc], ['Retención asociada', H.ids.blq], ['Orden de trabajo', H.ids.ot]],
        items: (H) => D8(H),
        reviewer: ROLE.qa_shift,
        approver: ROLE.decider,
        note: 'Borrador generado a partir de las evidencias de la ejecución. Las fechas objetivo son una propuesta: las confirma el equipo del 8D. La causa raíz es una hipótesis hasta que el Responsable de maduración y frío la confirme.'
      },
      report: {
        noun: 'informe de incidencia',
        code: 'REG-CAL-012-07',
        title: 'Informe de incidencia · cámara CM-06',
        subtitle: 'Desviación de temperatura en maduración controlada',
        filename: 'informe-incidencia-cm-06',
        site_label: 'Centro',
        site: 'Centro de manipulado de la Axarquía (Málaga)',
        description: (H) => `El 20/11/2026 a las 05:50, el control de cámaras emitió la alarma ALM-FRIO-0612 en la cámara de maduración controlada CM-06 (consigna ${H.fv(6)}), con el compresor CP-06 parado desde las 03:40. La temperatura de aire (sonda TT-CM06-01) estuvo ${H.C.above} min por encima de ${H.fv(H.C.threshold)} (${H.span}), con un pico de ${H.fv(11.4)} a las 07:00 y ${H.critMin} min por encima de ${H.fv(H.crit)}. A las 07:00 la cámara seguía a ${H.fv(11.4)}. Había ${H.all.count} palés de aguacate Hass calibre 18 (lote AH-2611-118, 14 t) destinados a ${lots(H.all)} pedidos: 3 supermercados y la tienda online.`,
        criteria: 'PR-MAD-002 (maduración controlada: si el aire supera 8 °C durante más de 15 min se retiene el lote expuesto) y PR-TRZ-003 (trazabilidad y retirada de lotes; solo Calidad y seguridad alimentaria libera).',
        actions: (H) => [
          `SAP S/4HANA · ${H.ids.blq}: retención de calidad del lote AH-2611-118 (${H.sc.count} palés, ${H.fmt.kg(H.sc.qty)}; ${H.fmt.eur(H.sc.value)} a coste estándar).`,
          `WMS: ${H.sc.count} palés inmovilizados y trasladados a CM-02; expediciones retenidas: ${H.sc.holds.map((h) => `${h.id} (${H.holdWhen(h)}, ${h.where})`).join(', ')}.`,
          `LIMS: muestreo de firmeza y color de los ${H.sc.count} palés expuestos.`,
          `SAP S/4HANA · ${H.ids.nc}: no conformidad abierta con borrador de 8D (REG-CAL-020-02); ${H.ids.ot}: orden de trabajo del compresor CP-06.`,
          'Tienda online (PrestaShop): pedidos de hoy con fruta de CM-06 señalados, sin cancelar.',
          `Microsoft Teams: aviso a ${ROLE.ripening_shift} y ${ROLE.packing_shift} en el canal «${TEAMS}».`,
          'Outlook: 3 borradores de aviso a los supermercados con pedidos afectados, sin enviar.'
        ],
        pending: (H) => [
          'Medir firmeza, color y temperatura de pulpa en una muestra de cada fila (Jefe de laboratorio).',
          'Decisión de destino por palé: liberar, reclasificar para procesado (guacamole y cold press) o destruir.',
          `Confirmar la reasignación de expediciones y el aviso a clientes: ${ROLE.logistics} y ${ROLE.customer_care}.`,
          `Revisar los pedidos online señalados antes de su envío: ${ROLE.ecommerce}.`
        ].concat(H && hasAnt(H.sc) ? ['Antecedente en SAP S/4HANA: NC-2026-0521 (27/10/2026), disparo del mismo compresor CP-06 por alta presión, resuelto con la limpieza del condensador (cerrada). Relevante para la causa raíz y para el plan de mantenimiento.'] : []),
        reviewer: ROLE.decider,
        final_step: 'Destino de los palés',
        final_role: ROLE.qa_shift,
        note: 'Documento sujeto a la revisión de Calidad y seguridad alimentaria; no sustituye la decisión de destino del producto.'
      },
      not_applied: (H) => [
        { sys: 'SAP S/4HANA', text: 'Sin retención de calidad, no conformidad ni orden de trabajo' },
        { sys: 'WMS', text: `Ningún palé inmovilizado ni trasladado; las ${H.all.holds.length} expediciones siguen planificadas` },
        { sys: 'LIMS', text: 'Sin muestreo programado' },
        { sys: 'Tienda online (PrestaShop)', text: 'Pedidos de hoy sin señalar' },
        { sys: 'Outlook', text: 'Sin borradores de aviso a clientes' }
      ],
      compare: [
        { k: 'Personas que intervienen', today: '4–5: calidad, maduración y frío, expediciones, tienda online y atención al cliente', now: 'Calidad y seguridad alimentaria revisa y decide; maduración, expediciones y clientes reciben el aviso con los datos' },
        { k: 'Sistemas que se consultan a mano', today: '5–6: control de cámaras, WMS, SAP, LIMS, tienda online y correo o teléfono', now: 'Ninguno: los agentes consultan 6 sistemas y cada dato queda en el registro' },
        { k: 'Pasos', today: '12–15 pasos manuales, con esperas entre personas', steps: true },
        { k: 'Tiempo hasta la retención y la NC', today: '1–3 h', measured: true },
        { k: 'Evidencia para la auditoría', today: 'Repartida entre correos, capturas y hojas de cálculo', now: 'Informe REG-CAL-012-07 y registro de auditoría de la ejecución' }
      ],
      presenter: {
        intro: () => 'Alarma de las 05:50 en la cámara de maduración CM-06: compresor parado desde las 03:40, 11,4 °C a las 07:00 frente a los 6,0 °C de consigna y 75 min por encima de 8 °C. La primera expedición afectada sale hoy a las 09:00.',
        agents: 'Cinco agentes, cada uno con su sistema: control de cámaras para la temperatura; WMS, SAP y la trazabilidad de campo para palés, lote y pedidos; SAP, WMS y LIMS para la retención y el muestreo; SAP, WMS y Teams para la OT y el traslado a CM-02; WMS, PrestaShop y Outlook para expediciones y clientes.',
        waiting: (H) => [
          `Los ${H.sc.elseTotal} palés del mismo lote en CM-03 quedan «a evaluar»: no estuvieron en CM-06. Los ${H.goneTotal} palés ya expedidos pasan a seguimiento. Todavía no se ha escrito nada en SAP S/4HANA ni en el WMS.`,
          'Se puede editar el alcance (quitar un pedido, con motivo) o rechazar: si se rechaza, no se aplica nada y queda en auditoría.'
        ],
        rejected: ['Rechazado: no se ha retenido nada, ni en SAP S/4HANA ni en el WMS, y no hay no conformidad, orden de trabajo ni avisos. El motivo queda en el registro de auditoría.', 'La decisión es siempre de Calidad y seguridad alimentaria; se puede volver a ejecutar cuando se quiera.'],
        done: (H) => [
          `Aplicado tras la aprobación: ${H.ids.blq} en SAP S/4HANA, ${H.sc.count} palés inmovilizados y ${H.sc.holds.length} expediciones retenidas en el WMS, muestreo en LIMS, ${H.ids.nc} con el 8D en borrador, ${H.ids.ot} para CP-06, traslado a CM-02, aviso por Teams y 3 borradores de aviso a supermercados en Outlook.`,
          'El informe de incidencia sale como documento controlado: código, revisión, aprobaciones y registro de la ejecución, listo para una auditoría IFS Food o GLOBALG.A.P.'
        ],
        next: { done: 'Abrir «Descargar informe de incidencia» y después ir a «Reclamación» (flecha derecha).', no_trigger: 'Ir a «De palabras a workflow», dejar 15 min y volver a ejecutar.' }
      }
    }
  });

  /* Borrador de 8D (D1–D8) que redacta el agente de Calidad. */
  function D8(H) {
    const sc = H.sc;
    const ant = hasAnt(sc)
      ? ' Antecedente en SAP S/4HANA: NC-2026-0521 (27/10/2026), disparo del mismo compresor CP-06 por alta presión, resuelto con la limpieza del condensador (cerrada); tenerlo en cuenta en la causa raíz.'
      : '';
    return [
      { d: 'D1', t: 'Equipo', text: `Líder: ${ROLE.qa_shift}. Equipo: ${ROLE.ripening_shift}, ${ROLE.packing_shift}, ${ROLE.logistics}, ${ROLE.ecommerce} y ${ROLE.customer_care}.`, owner: ROLE.qa_shift, due: '2026-11-20' },
      { d: 'D2', t: 'Descripción del problema', text: `El 20/11/2026 el aire de la cámara de maduración CM-06 superó ${H.fv(8)} desde las 05:50 (75 min, en curso), con el compresor CP-06 parado desde las 03:40, un pico de ${H.fv(11.4)} a las 07:00 y 45 min por encima de ${H.fv(10)}. Había ${H.all.count} palés de aguacate Hass calibre 18 (lote AH-2611-118, 14 t).${ant}`, owner: ROLE.qa_shift, due: '2026-11-20' },
      { d: 'D3', t: 'Contención', text: `${H.ids.blq}: ${sc.count} palés retenidos en SAP S/4HANA e inmovilizados en el WMS; ${sc.holds.length} expediciones retenidas y traslado a CM-02. Muestrear firmeza y color en los palés expuestos.${sc.elseTotal ? ` Evaluar los ${sc.elseTotal} palés del mismo lote en CM-03, que no estuvieron en CM-06.` : ''}`, owner: ROLE.packing_shift, due: '2026-11-20' },
      { d: 'D4', t: 'Causa raíz (hipótesis)', text: 'Hipótesis a confirmar por el Responsable de maduración y frío: disparo del compresor CP-06 a las 03:40 (protección por alta presión) sin arranque del compresor de reserva, sin aviso hasta que la temperatura cruzó 8 °C.', owner: ROLE.ripening_shift, due: '2026-11-24' },
      { d: 'D5', t: 'Acciones correctivas propuestas', text: `Reparar CP-06 (${H.ids.ot}); revisar el arranque automático del compresor de reserva; añadir un aviso temprano de temperatura a 7 °C en el control de cámaras.`, owner: ROLE.ripening_shift, due: '2026-11-27' },
      { d: 'D6', t: 'Implantación y verificación', text: 'Verificar la recuperación de temperatura de CM-06 y el arranque de la reserva en una prueba controlada. Decisión de destino por palé según PR-MAD-002: liberar, reclasificar para procesado o destruir.', owner: ROLE.qa_shift, due: '2026-12-01' },
      { d: 'D7', t: 'Prevención', text: 'Extender el aviso temprano y la prueba de la reserva al resto de cámaras de maduración del centro y actualizar PR-MAD-002 si procede.', owner: ROLE.qa_shift, due: '2026-12-11' },
      { d: 'D8', t: 'Cierre', text: `Cerrar ${H.ids.nc} tras verificar la eficacia y registrar la decisión de destino de los ${sc.count} palés.`, owner: ROLE.decider, due: '2026-12-18' }
    ];
  }
})();
