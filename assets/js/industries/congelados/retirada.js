/*
 * Empresa de Congelados · simulacro de retirada del lote L26-261-FUS-GUI-03 (Guisante fino 1 kg, marca Verleal, retail ES).
 * Hacia atrás: parcelas P-0455-02 y P-0455-05 (AGR-0455, Cortes) → recepción REC-26-09412 (25/06/2026, 26,1 t) →
 * granel G26-176-FUS-GUI (línea L2, SIL-2) → reenvasado en L4 el 18/09/2026.
 * Hacia delante: 22 palés (17.600 kg): 4 expedidos en EXP-26-41102 (28/09 18:40), 8 en C-07 para EXP-26-41107
 * (hoy 11:00, muelle 3) y 10 en SIL-3. Mismos códigos, SSCC y cifras que CN_DATA.trace y que la demo de referencia.
 * Datos sintéticos de demostración (MFM).
 */
(function () {
  'use strict';

  const LOT = 'L26-261-FUS-GUI-03';
  const GRANEL = 'G26-176-FUS-GUI';
  const REC = 'REC-26-09412';
  const SHIP_DONE = 'EXP-26-41102';
  const SHIP_PLAN = 'EXP-26-41107';
  const CUSTOMER = 'Plataforma logística retail ES';
  const KG_PALLET = 800;

  /* SSCC (GS1): extensión 3 + prefijo 8412345 + día juliano del lote + secuencia + n.º de palé + dígito de control.
     Mismo algoritmo que congelados/trace.js, para que cada palé coincida con la traza del lote. */
  function sscc(day, seq, k) {
    const body = `38412345${day}${seq}${String(k).padStart(4, '0')}`;
    let s = 0;
    for (let i = body.length - 1, w = 3; i >= 0; i--, w = 4 - w) s += Number(body[i]) * w;
    return body + ((10 - (s % 10)) % 10);
  }

  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  /* ---------------------------------------------------------------- Palés (SSCC) */

  const PALLETS = [];
  for (let k = 1; k <= 22; k += 1) {
    let loc;
    if (k <= 4) {
      loc = { where: 'Expedido a cliente', whereSub: `${CUSTOMER} · camión frigorífico −25 °C`, ship: SHIP_DONE, date: '28/09/2026 18:40', estado: { status: 'shipped', label: 'Expedido' }, accion: 'Aviso al cliente y retirada' };
    } else if (k <= 12) {
      loc = { where: 'C-07 · Cámara de expedición 7', whereSub: `calle 2 · hueco ${k - 4}`, ship: SHIP_PLAN, date: 'Hoy 11:00 (planificada)', estado: { status: 'evaluate', label: 'En stock · a evaluar' }, accion: 'Retener en muelle y evaluar tras la excursión de C-07' };
    } else {
      loc = { where: 'SIL-3 · Silo automático 3', whereSub: 'Fustiñana', ship: '—', date: '—', estado: { status: 'ok', label: 'En stock' }, accion: 'Bloquear en Easy WMS y SAP QM' };
    }
    PALLETS.push(Object.assign({ n: `${k}/22`, sscc: sscc('261', '03', k), kg: KG_PALLET }, loc));
  }

  /* ---------------------------------------------------------------- Genealogía */

  const nodes = [
    { id: 'P2', stage: 'campo', kicker: 'Parcela', title: 'P-0455-02', mono: true, lot: 'P-0455-02', sub: 'AGR-0455 · Cortes', meta: 'guisante · 5,1 ha', reveal: 1 },
    { id: 'P5', stage: 'campo', kicker: 'Parcela', title: 'P-0455-05', mono: true, lot: 'P-0455-05', sub: 'AGR-0455 · Cortes', meta: 'guisante · 4,4 ha', reveal: 1 },
    { id: 'REC', stage: 'rec', kicker: 'Recepción', title: REC, mono: true, sub: '25/06 07:18 · 26,1 t', meta: 'AGR-0455', reveal: 1 },
    { id: 'GRA', stage: 'granel', kicker: 'Granel', title: GRANEL, mono: true, lot: GRANEL, sub: 'L2 · 25/06', meta: 'SIL-2: quedan 2.550 kg', reveal: 2 },
    { id: 'LOT', stage: 'lote', kicker: 'Lote', title: LOT, mono: true, lot: LOT, sub: 'Guisante fino 1 kg', meta: 'L4 · 18/09 · 22 palés', reveal: 2 },
    { id: 'PX', stage: 'pales', kicker: 'Palés', title: '4 expedidos', sub: '3.200 kg', meta: 'Entregados a cliente', tone: 'shipped', reveal: 3 },
    { id: 'PC', stage: 'pales', kicker: 'Palés', title: '8 en C-07', sub: '6.400 kg', meta: 'Expuestos a la excursión de hoy', alertTone: true, tone: 'planned', reveal: 3 },
    { id: 'PS', stage: 'pales', kicker: 'Palés', title: '10 en SIL-3', sub: '8.000 kg', meta: 'En almacén', tone: 'stock', reveal: 3 },
    { id: 'E1', stage: 'exp', kicker: 'Expedición', title: SHIP_DONE, mono: true, lot: SHIP_DONE, sub: '28/09 18:40 · expedida', meta: '4 palés', tone: 'shipped', reveal: 4 },
    { id: 'E2', stage: 'exp', kicker: 'Expedición', title: SHIP_PLAN, mono: true, lot: SHIP_PLAN, sub: 'hoy 11:00 · planificada', meta: '8 palés · Muelle 3', alert: 'Retener en muelle', alertTone: true, tone: 'planned', reveal: 4 },
    { id: 'CLI', stage: 'cli', kicker: 'Cliente', title: CUSTOMER, sub: 'España · Retail', tone: 'customer', reveal: 5 }
  ];
  const edges = [['P2', 'REC'], ['P5', 'REC'], ['REC', 'GRA'], ['GRA', 'LOT'], ['LOT', 'PX'], ['LOT', 'PC'], ['LOT', 'PS'], ['PX', 'E1'], ['PC', 'E2'], ['E1', 'CLI'], ['E2', 'CLI']];

  /* ---------------------------------------------------------------- Tablas */

  const palletRows = PALLETS.map((p) => Object.assign({}, p));
  const locRows = [
    { ref: LOT, tag: true, where: 'C-07 · Cámara de expedición 7', whereSub: `calle 2 · para ${SHIP_PLAN} (hoy 11:00)`, n: 8, qty: 6400, action: `Retener ${SHIP_PLAN} en muelle y evaluar tras la excursión`, tone: 'crit' },
    { ref: LOT, tag: true, where: 'SIL-3 · Silo automático 3', whereSub: 'Fustiñana · Mecalux Easy WMS', n: 10, qty: 8000, action: 'Bloquear en Easy WMS y SAP QM', tone: 'warn' },
    { ref: LOT, tag: true, where: `En cliente · ${CUSTOMER}`, whereSub: `${SHIP_DONE} · 28/09/2026 18:40`, n: 4, qty: 3200, action: 'Aviso al cliente y retirada', tone: 'warn' }
  ];
  const prodRows = [{ lot: LOT, prod: 'Guisante fino 1 kg', made: 17600, pal: 22, shipped: 3200, stock: 14400, where: 'C-07 8 · SIL-3 10', diff: 0, rec: '100,0 %' }];

  /* ---------------------------------------------------------------- Aviso al cliente */

  const NOTICE = (function () {
    const subj = `[SIMULACRO] Retirada del lote ${LOT} · Guisante fino 1 kg · 4 palés entregados`;
    const body = [
      'Estimado equipo de Calidad de Plataforma logística retail ES:',
      'Les comunicamos un ejercicio de retirada del siguiente lote de Empresa de Congelados:',
      [
        'Producto: Guisante fino 1 kg · marca Verleal · SKU VL-GUI-1000',
        `Lote: ${LOT} · fabricado el 18/09/2026 en Fustiñana (L4) · consumo preferente 09/2028`,
        `Suministro entregado: 4 palés (3.200 kg) en ${SHIP_DONE} del 28/09/2026`,
        `Suministro planificado: 8 palés (6.400 kg) en ${SHIP_PLAN}, hoy a las 11:00 (muelle 3): se retiene en muelle`
      ].join('\n'),
      'Les pedimos que aparten los palés del lote que tengan en sus instalaciones y que nos confirmen los SSCC recibidos. Les enviaremos las instrucciones definitivas de recogida y reposición.',
      'Motivo del envío: simulacro de retirada (procedimiento PNT-CAL-015). En una retirada real, aquí se indican las instrucciones definitivas acordadas por Calidad.',
      'Atentamente,\nCalidad · Empresa de Congelados\nPlanta de Fustiñana'
    ];
    return {
      lang: 'Español',
      headers: { From: 'Calidad, Empresa de Congelados', To: `Equipo de Calidad · ${CUSTOMER}`, Subject: subj },
      subject: subj,
      body: body.join('\n\n'),
      highlights: [LOT, SHIP_DONE, SHIP_PLAN]
    };
  }());

  const items = [{
    id: 'cli-ret-es',
    label: CUSTOMER,
    icon: 'truck',
    notify: true,
    meta: ['España · Retail', 'Aviso en español'],
    body: `Recibido: 4 palés (3.200 kg) en ${SHIP_DONE} del 28/09. Planificado: 8 palés en ${SHIP_PLAN}, hoy a las 11:00 (Muelle 3): retener.`,
    notice: NOTICE,
    refs: `${SHIP_DONE} · ${SHIP_PLAN}`,
    qtyText: '4 palés entregados · 8 a retener',
    action: 'Aviso y retención del envío planificado'
  }];

  /* ---------------------------------------------------------------- Alcance */

  const scope = {
    headline: `Guisante fino 1 kg · lote ${LOT} · 22 palés fabricados en L4 el 18/09/2026`,
    previewSide: '1 lote · 22 palés',
    startNode: 'LOT',
    stages: [
      { id: 'campo', label: 'Campo', icon: 'leaf' },
      { id: 'rec', label: 'Recepción', icon: 'scale' },
      { id: 'granel', label: 'Granel', icon: 'box' },
      { id: 'lote', label: 'Lote', icon: 'layers' },
      { id: 'pales', label: 'Palés', icon: 'pallet' },
      { id: 'exp', label: 'Expediciones', icon: 'truck' },
      { id: 'cli', label: 'Clientes', icon: 'building' }
    ],
    nodes,
    edges,
    systems: ['SAP', 'MES Mapex', 'Mecalux Easy WMS'],
    genSub: `1 recepción · 22 SSCC · 1 cliente`,
    steps: [
      { agent: 'trace', system: 'SAP', action: 'Localiza el punto de partida', result: `Guisante fino 1 kg · lote ${LOT} · fabricado el 18/09/2026 en L4 · 22 palés`, ms: 180, reveal: 0, mark: 'Punto de partida localizado' },
      { agent: 'trace', system: 'SAP', action: 'Hacia atrás: recepción, agricultor y parcelas', result: `Recepción ${REC} del 25/06/2026 (26,1 t) · agricultor AGR-0455 · parcelas P-0455-02 y P-0455-05`, ms: 420, reveal: 1, mark: 'Traza hacia atrás completa' },
      { agent: 'trace', system: 'MES Mapex', action: 'Granel de origen y consumos del reenvasado', result: `Granel ${GRANEL} (campaña en L2, SIL-2) · 21 octavines consumidos en L4 el 18/09 (17.850 kg)`, ms: 600, reveal: 2, mark: 'Lotes y consumos identificados' },
      { agent: 'trace', system: 'Mecalux Easy WMS', action: 'Palés del lote por SSCC y ubicación', result: '22 palés · 4 expedidos · 8 en C-07 (excursión de hoy) · 10 en SIL-3', ms: 1000, reveal: 3, mark: 'Palés localizados por SSCC' },
      { agent: 'trace', system: 'SAP', action: 'Expediciones y clientes', result: `${SHIP_DONE} (28/09, 4 palés) y ${SHIP_PLAN} planificada hoy a las 11:00 (8 palés, muelle 3) · 1 cliente: ${CUSTOMER}`, ms: 400, reveal: 4, tone: 'warn', mark: 'Expediciones y clientes identificados' },
      { agent: 'trace', system: 'SAP', action: 'Contacto de calidad del cliente', result: `1 contacto verificado · ${CUSTOMER}`, ms: 100, reveal: 5 },
      { agent: 'bal', system: 'MES Mapex', action: 'Mermas por etapa de la ruta del lote', result: '9 conceptos de merma declarados en LIM-2, DP-2, ESC-2, TUN-2, OPT-2, CRB-4 y ENV-2 · 5.889 kg', ms: 300 },
      { agent: 'bal', system: 'Agentic Platform', action: 'Cuadre de kilos de la recepción al destino', result: 'Recibido 26.100 kg · mermas 5.889 kg · producto terminado 17.600 kg · granel restante 2.550 kg · 61 kg sin justificar (99,8 % conciliado)', ms: 300, tone: 'ok', mark: 'Balance de masas cerrado' },
      { agent: 'rec', system: 'Elara', action: 'Abre el registro del simulacro', result: 'Registro en borrador con los tiempos de cada actividad', ms: 300 },
      { agent: 'rec', system: 'Outlook', action: 'Prepara el aviso sin enviar', result: `1 aviso a ${CUSTOMER} pendiente de aprobación · retención de ${SHIP_PLAN} propuesta`, ms: 200, mark: 'Registro y avisos preparados' }
    ],
    located: { label: 'Palés localizados', value: '22 de 22', sub: '17.600 kg · 18 palés en almacén', icon: 'pallet', short: '22 de 22 palés localizados' },
    kpiNotify: { label: 'Clientes a notificar', value: 1, sub: `1 expedición a retener · hoy 11:00` },
    balance: {
      title: 'Balance de masas',
      kpiLabel: 'Balance de masas conciliado',
      sub: 'Kilos de la recepción al destino · mermas declaradas en MES Mapex, stock en Mecalux Easy WMS',
      head: 'Materia prima',
      headSide: '1 recepción · 9 conceptos de merma',
      labels: { in: 'Recibido', losses: 'Mermas justificadas', out: 'A producto terminado', stock: 'Granel restante' },
      detailTitle: 'Detalle por recepción',
      criterio: 'Criterio: la diferencia sin justificar se muestra tal cual, no se reparte entre las mermas. Cada merma cita la etapa de la ruta del lote que la declara en MES Mapex.',
      reportText: 'Recepción en SAP; mermas por etapa declaradas en MES Mapex; palés por SSCC y granel restante en Mecalux Easy WMS; expediciones y clientes en SAP.',
      flows: [
        {
          key: 'REC', seg: 'Recepción', main: true, unit: 'kg', colLabel: 'Kg',
          title: `Recepción ${REC} → granel ${GRANEL} → lote ${LOT}`,
          inLabel: `Recibido · ${REC}`, inSub: '25/06/2026 07:18 · AGR-0455 · P-0455-02 y P-0455-05', inStage: 'SAP', inQty: 26100,
          phases: [
            { title: 'Campaña en L2 · granel', date: '2026-06-25', extra: `${GRANEL}: 20.400 kg (24 octavines)`, stages: [
              ['LIM-2', 'Vaina, hoja y tierra (aventado)', 1540],
              ['LIM-2', 'Guisante partido y bajo calibre (cribas), a alimentación animal', 2190],
              ['DP-2', 'Piedras y terrones', 31],
              ['ESC-2', 'Escaldado: exudado y arrastre', 1150],
              ['TUN-2', 'Congelación IQF: deshidratación', 440],
              ['OPT-2', 'Rechazo de la selectora óptica (1,5 % del flujo)', 311]
            ] },
            { title: 'Reenvasado en L4', date: '2026-09-18', extra: '21 octavines consumidos (17.850 kg)', stages: [
              ['CRB-4', 'Terrones de hielo y guisante partido (criba)', 118],
              ['ENV-2', 'Sobrellenado de bolsas (0,5 %)', 88],
              ['ENV-2', 'Bolsas rechazadas y muestras de retención', 21]
            ] }
          ],
          outsTitle: 'Salidas',
          outs: [
            { label: `Producto terminado ${LOT}`, sub: '22 palés · Guisante fino 1 kg', stage: 'SAP', qty: 17600 },
            { label: `Granel restante ${GRANEL}`, sub: '3 octavines en Silo automático 2 (Fustiñana)', stage: 'Easy WMS', qty: 2550, kind: 'stock' }
          ]
        }
      ],
      product: {
        title: 'Producto terminado',
        side: '17.600 kg · 3.200 kg expedidos · 14.400 kg en almacén',
        cols: [
          { label: 'Lote', key: 'lot', lot: true, sub: 'prod' },
          { label: 'Producido (kg)', key: 'made', num: true, fmt: 'num', sub: 'palLabel' },
          { label: 'Expedido (kg)', key: 'shipped', num: true, fmt: 'num' },
          { label: 'En almacén (kg)', key: 'stock', num: true, fmt: 'num', sub: 'where' },
          { label: 'Diferencia (kg)', key: 'diff', num: true, fmt: 'num' },
          { label: 'Conciliado', key: 'rec', num: true, ok: true }
        ],
        rows: prodRows.map((r) => Object.assign({ palLabel: `${r.pal} palés` }, r))
      }
    },
    units: {
      title: 'Palés y ubicaciones',
      sub: `22 palés (SSCC) · 17.600 kg · Mecalux Easy WMS y SAP`,
      icon: 'pallet',
      csvLabel: 'SSCC (CSV)',
      csvName: 'sscc',
      csvCols: [
        { label: 'Palé', key: 'n' }, { label: 'SSCC', key: 'sscc' }, { label: 'Kg', key: 'kg' },
        { label: 'Ubicación o cliente', key: 'where' }, { label: 'Detalle', key: 'whereSub' }, { label: 'Expedición', key: 'ship' }, { label: 'Fecha', key: 'date' },
        { label: 'Estado', key: 'estado' }, { label: 'Acción en una retirada real', key: 'accion' }
      ],
      byLoc: { label: 'Por ubicación', refLabel: 'Lote', whereLabel: 'Ubicación', nLabel: 'Palés', qtyLabel: 'Kg', actionLabel: 'Acción en una retirada real', rows: locRows },
      list: {
        label: 'SSCC',
        cols: [
          { label: 'Palé', key: 'n' },
          { label: 'SSCC', key: 'sscc', mono: true },
          { label: 'Kg', key: 'kg', num: true, fmt: 'num' },
          { label: 'Ubicación o cliente', key: 'where', sub: 'whereSub' },
          { label: 'Expedición', key: 'ship', mono: true, sub: 'date' },
          { label: 'Estado', key: 'estado', chip: true },
          { label: 'Acción en una retirada real', key: 'accion' }
        ],
        rows: palletRows
      }
    },
    customers: {
      title: 'Clientes a notificar',
      sub: '1 cliente con producto entregado · 1 expedición planificada a retener',
      items,
      holdsTitle: 'Expediciones a retener en muelle',
      holds: [
        { icon: 'truck', tone: 'crit', title: `Retener ${SHIP_PLAN} en Muelle 3`, meta: ['hoy a las 11:00', '8 palés', CUSTOMER], body: 'En una retirada real, el jefe de turno de expedición no carga estos palés: 8 en C-07. SSCC en la pestaña «SSCC» y en el CSV.' }
      ]
    },
    approval: {
      titlePrefix: 'Avisos a clientes y cierre del simulacro',
      scope: [
        { label: 'Clientes con producto entregado', value: CUSTOMER, status: 'pending', chip: '1' },
        { label: 'Expediciones planificadas a retener', value: `${SHIP_PLAN} · hoy 11:00` },
        { label: 'Palés en almacén que se bloquearían', value: '18 · C-07 8 · SIL-3 10', status: 'evaluate', chip: 'Sin bloqueo en simulacro' },
        { label: 'Granel restante del mismo origen', value: '2.550 kg' }
      ],
      effects: [
        'Outlook: {n} aviso guardado como borrador con la marca SIMULACRO (español); no se envía nada',
        'Elara: registro {code} aprobado con los tiempos de cada actividad',
        'SAP QM y Mecalux Easy WMS: sin cambios; en un simulacro no se bloquea stock'
      ]
    },
    report: {
      objeto: 'Simulacro de retirada con punto de partida en {label}. Se comprueba la trazabilidad hacia atrás (recepción, granel y parcelas) y hacia delante (palés, expediciones y cliente), con el balance de masas desde la recepción.',
      noAction: 'El ejercicio no bloquea existencias, no retiene expediciones y no envía avisos.',
      results: [
        `1 cliente con producto entregado (${CUSTOMER}, ${SHIP_DONE}) y 1 expedición planificada que se retendría (${SHIP_PLAN}, hoy a las 11:00, muelle 3).`,
        '8 palés del lote estaban en C-07 durante la excursión de hoy (05:50–06:40); 10 siguen en SIL-3.',
        `Quedan 2.550 kg del granel de origen ${GRANEL} en SIL-2.`
      ],
      back: {
        cols: [{ label: 'Etapa', key: 'etapa' }, { label: 'Referencia', key: 'ref', mono: true }, { label: 'Fecha', key: 'fecha' }, { label: 'Detalle', key: 'det' }],
        rows: [
          { etapa: 'Campo', ref: 'AGR-0455', fecha: '25/06/2026', det: 'Agricultor AGR-0455 · parcelas P-0455-02 (5,1 ha) y P-0455-05 (4,4 ha) · Cortes · guisante' },
          { etapa: 'Recepción', ref: REC, fecha: '25/06/2026 07:18', det: '26,1 t · tenderómetro 102 TR (especificación 95-120 TR)' },
          { etapa: 'Campaña (granel)', ref: GRANEL, fecha: '25/06/2026', det: 'Línea L2: LIM-2 → DP-2 → ESC-2 → TUN-2 → OPT-2 · 20.400 kg en 24 octavines · SIL-2' },
          { etapa: 'Reenvasado', ref: 'L4', fecha: '18/09/2026', det: 'TOL-4 → CRB-4 → ENV-2 → DM-2 · 21 octavines consumidos (17.850 kg) · turno de mañana' },
          { etapa: 'Calidad', ref: LOT, fecha: '18/09/2026', det: 'Control de peso y sellado conformes; detector de metales DM-2 verificado cada 2 h' }
        ]
      },
      fwd: {
        cols: [{ label: 'Ubicación o expedición', key: 'dest', mono: true }, { label: 'Palés', key: 'pal' }, { label: 'Kg', key: 'kg' }, { label: 'Cliente o estado', key: 'cli' }],
        rows: [
          { dest: SHIP_DONE, pal: '4', kg: '3.200', cli: `${CUSTOMER} · expedida el 28/09/2026 18:40` },
          { dest: SHIP_PLAN, pal: '8', kg: '6.400', cli: `${CUSTOMER} · planificada hoy 11:00 · muelle 3 · palés en C-07` },
          { dest: 'SIL-3', pal: '10', kg: '8.000', cli: 'En stock · Silo automático 3' }
        ]
      },
      conclusion: 'Conclusión: la información necesaria para una retirada se obtiene completa y el lote cuadra al 99,8 %; los 61 kg sin justificar se muestran tal cual, sin repartirlos entre las mermas.',
      note: 'Simulacro: no se ha bloqueado stock, no se ha retenido ninguna expedición y no se ha enviado ningún aviso. Datos sintéticos de demostración.'
    },
    audit: { back: `parcelas P-0455-02 y P-0455-05 · recepción ${REC} · granel ${GRANEL}`, fwd: '22 palés · 2 expediciones · 1 cliente' },
    say: [
      `Lo accionable: ${SHIP_PLAN} (hoy a las 11:00) se retendría en el muelle 3 y los 10 palés de SIL-3 se bloquearían.`,
      'El aviso va al único cliente con producto entregado, con su expedición y el número de palés. En un simulacro no se envía nada. Decide Calidad.'
    ]
  };

  agenticPack('congelados', {
    retirada: {
      title: 'Simulacro de retirada',
      nav: 'Simulacro de retirada',
      section: 'Calidad',
      desc: 'Ejercicio de trazabilidad y retirada para los simulacros de IFS Food y BRCGS: genealogía hacia atrás y hacia delante, balance de masas y clientes a notificar, a partir de un lote, una parcela o un granel de campaña.',
      place: 'Planta de Fustiñana',
      approver: 'Responsable de Calidad de turno',
      regPrefix: 'SR-2026-',
      agents: { trace: 'Trazabilidad', bal: 'Balance de masas', rec: 'Registro y avisos' },
      targetText: 'Objetivo ilustrativo: 4 h',
      todayEstimate: '1–4 h',
      timerRef: 'Objetivo demo: 4 h',
      packLabel: 'Descargar paquete de retirada',
      setup: { title: 'Punto de partida', sub: 'Un lote de producto terminado, todos los lotes de una parcela o un granel de campaña' },
      modes: {
        lote: { label: 'Lote', noun: 'el lote', field: 'Código de lote', icon: 'layers', format: 'L26-261-FUS-GUI-03', where: 'SAP/Mapex' },
        parcela: { label: 'Parcela', noun: 'la parcela', field: 'Código de parcela', icon: 'leaf', format: 'P-0455-02', where: 'SAP' },
        granel: { label: 'Granel', noun: 'el granel', field: 'Código de granel', icon: 'box', format: 'G26-176-FUS-GUI', where: 'MES Mapex' }
      },
      defaultMode: 'lote',
      entries: [
        { mode: 'lote', code: LOT, scope: 'gui03', label: `Lote ${LOT}`, option: 'Guisante fino 1 kg · Verleal (retail ES) · fabricado el 18/09/2026 en L4' },
        { mode: 'parcela', code: 'P-0455-02', scope: 'gui03', label: 'Parcela P-0455-02', option: 'AGR-0455 · Cortes · guisante · 5,1 ha', startNode: 'P2', headline: `Parcela P-0455-02 (AGR-0455, Cortes) · 1 lote trazado: ${LOT}`, startResult: `Parcela P-0455-02 · agricultor AGR-0455 · guisante · 5,1 ha → recepción ${REC} → lote ${LOT}` },
        { mode: 'parcela', code: 'P-0455-05', scope: 'gui03', label: 'Parcela P-0455-05', option: 'AGR-0455 · Cortes · guisante · 4,4 ha', startNode: 'P5', headline: `Parcela P-0455-05 (AGR-0455, Cortes) · 1 lote trazado: ${LOT}`, startResult: `Parcela P-0455-05 · agricultor AGR-0455 · guisante · 4,4 ha → recepción ${REC} → lote ${LOT}` },
        { mode: 'granel', code: GRANEL, scope: 'gui03', label: `Granel ${GRANEL}`, option: 'L2 · 25/06/2026 · SIL-2', startNode: 'GRA', headline: `Granel ${GRANEL} (campaña en L2 del 25/06/2026) · 1 lote trazado: ${LOT}`, startResult: `Granel ${GRANEL} · línea L2 · 25/06/2026 · SIL-2 (quedan 2.550 kg) → lote ${LOT}` }
      ],
      examples: [
        { mode: 'lote', code: LOT, label: `Lote ${LOT}` },
        { mode: 'parcela', code: 'P-0455-02', label: 'Parcela P-0455-02' },
        { mode: 'granel', code: GRANEL, label: `Granel ${GRANEL}` }
      ],
      reference: {
        title: 'Referencia de auditoría',
        sub: 'Objetivo del ejercicio; Calidad confirma los requisitos de su certificación vigente',
        items: [
          ['BRCGS Food', 'Objetivo ilustrativo: trazabilidad en 4 horas. Confirmar alcance, periodicidad y plazos con Calidad y la edición aplicable.'],
          ['IFS Food v8', 'El ejercicio muestra trazabilidad hacia atrás y hacia delante, con balance de masas. Calidad valida el protocolo aplicable.'],
          ['FSSC 22000', 'El simulacro permite revisar la eficacia del procedimiento de retirada; no acredita cumplimiento por sí solo.']
        ],
        note: 'Un simulacro no bloquea stock ni envía avisos: se mide si la información se obtiene completa, cuadra en kilos y a tiempo.'
      },
      legend: { planned: 'Expedición planificada: retener', click: 'Pulsa un lote para ver su traza completa' },
      notice: { title: 'Simulacro de retirada' },
      approval: { policy: 'PNT-CAL-015 · retener o bloquear producto requiere la aprobación de Calidad', approveLabel: 'Aprobar y cerrar simulacro', rejectPlaceholder: 'Por ejemplo: falta confirmar el contacto de calidad del cliente' },
      clock: { title: 'Cronómetro frente a auditoría', sub: 'Tiempos de la simulación; no son medidas de rendimiento de producción' },
      report: { subtitle: 'Registro del ejercicio de trazabilidad y retirada · PNT-CAL-015' },
      compare: {
        rows: [
          { k: 'Personas implicadas', today: '3–4: Calidad, Logística, Producción y Compras de campo', agentic: '1: {approver} revisa y aprueba' },
          { k: 'Sistemas consultados', today: '3–4 abiertos a mano: SAP, MES Mapex, Mecalux Easy WMS y hojas de cálculo', agentic: '3 conectores consultados por los agentes: SAP, MES Mapex y Mecalux Easy WMS' },
          { k: 'Pasos', today: '15–20 consultas, cruces de SSCC con expediciones y cálculos manuales', agentic: '{steps} pasos automáticos y 1 aprobación' },
          { k: 'Balance de masas', today: 'Hoja de cálculo con recepción, mermas, producto terminado y granel', agentic: 'Calculado por etapa de la ruta: {reconciled} conciliado' }
        ]
      },
      presenter: {
        idle: [
          'Simulacro de retirada con trazabilidad y balance de masas; en el piloto Calidad confirma el protocolo y medimos el tiempo real.',
          'Se elige el punto de partida: el lote L26-261-FUS-GUI-03, una parcela o el granel de campaña.',
          'Agentic Platform recorre SAP, MES Mapex y Mecalux Easy WMS hacia atrás hasta la parcela y hacia delante hasta cada palé y cliente, y cuadra los kilos de la recepción al producto terminado.'
        ],
        nextIdle: 'Pulsar «Iniciar simulacro» con el lote L26-261-FUS-GUI-03 (o elegir «Parcela P-0455-02»).',
        nextRun: 'Pulsar «Ver aviso» del cliente y después «Aprobar y cerrar simulacro».',
        nextDone: '«Descargar paquete de retirada»: CSV de SSCC y registro imprimible. Después, «Cuestionario de cliente» (flecha derecha).'
      },
      scopes: { gui03: scope }
    }
  });
}());
