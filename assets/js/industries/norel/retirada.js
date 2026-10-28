/* Norel Nutrición Animal · simulacro de retirada RET-2026-1028 (colina cloruro 60 % MP-2610-CC-118 con Salmonella).
 * Hacia atrás: proveedor Agroquímica Delta y recepción del 21/10/2026. Hacia delante: 4 lotes de premezcla (96 t), de los que 31 t siguen en
 * la Planta de premezclas (España) y 65 t se expidieron en 148 albaranes a 9 clientes de España, Portugal y Marruecos. Mismos clientes y referencias
 * que el resto de escenas. Datos sintéticos de demostración (MFM). */
(function () {
  'use strict';

  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const S = {
    n0,
    lang: 'Español',
    cliOne: 'cliente', cliMany: 'clientes', albOne: 'albarán', albMany: 'albaranes', lotsWord: 'lotes', samplesWord: 'muestras',
    list: (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} y ${a[a.length - 1]}`),
    kinds: { fab: 'Fábrica de piensos', int: 'Grupo integrador' },
    country: { es: 'España', pt: 'Portugal', ma: 'Marruecos' },
    lotNames: ['Premezcla vitamínica de porcino', 'Premezcla vitamínica de porcino (lactación)', 'Premezcla de vitaminas y minerales de avicultura', 'Premezcla de vitaminas y minerales de vacuno'],
    chip: { sold: 'Con cliente', alm: 'Retenido en almacén', mue: 'En el muelle' },
    madeOn: 'Fecha de fabricación',
    actions: {
      sold: 'Aviso al cliente y retirada del producto sin coste',
      soldMa: 'Aviso al cliente, retirada y documentación de exportación',
      alm: 'Bloquear el lote en SAP QM y mantenerlo en almacén',
      mue: 'Retener la carga y bloquear el lote en SAP QM'
    },
    andMore: (n) => ` y ${n} más`,
    subject: (n) => `[SIMULACRO] Retirada RET-2026-1028 · colina cloruro 60 % MP-2610-CC-118 · Salmonella · ${n} ${n === 1 ? 'lote' : 'lotes'} de premezcla`,
    greeting: (c) => `Estimado equipo de ${c.label}:`,
    intro: 'Norel Nutrición Animal ha detectado en un análisis de laboratorio la presencia de Salmonella en una materia prima (colina cloruro 60 %) que se ha utilizado en premezclas que le hemos suministrado:',
    lCamp: (r, mp) => `Retirada: ${r} · materia prima ${mp}`,
    lLots: (l, n) => `Lote${n === 1 ? '' : 's'} de premezcla: ${l}`,
    lAlbs: (a, n) => `${n === 1 ? 'Albarán' : 'Albaranes'}: ${a}`,
    lQty: (t) => `Cantidad recibida: ${t}`,
    reason: 'Motivo: resultado positivo de Salmonella en la materia prima, pendiente de confirmar en las muestras de retención de las premezclas. Medida preventiva: no utilice ni comercialice el producto, manténgalo identificado y separado y no lo incorpore a pienso. Si ya lo ha incorporado, indíquenos las partidas de pienso afectadas y su destino.',
    ask: 'Le pedimos que responda a este aviso con las existencias que conserva, las cantidades ya incorporadas a pienso y sus destinos. Coordinaremos la recogida del producto y su sustitución sin coste para usted.',
    exportNote: 'Por tratarse de una entrega de exportación, nuestro responsable de logística y exportación coordinará con usted la documentación necesaria y el aviso a la autoridad competente de su país (procedimiento PR-EXP-002).',
    clmNote: 'Su reclamación CLM-2026-1028 sobre el contenido de vitamina E del lote PRM-2610-0388 sigue su curso en Atención al cliente y es independiente de este aviso.',
    planned: (P) => `Su expedición ${P.ship} (pedido ${P.order}), prevista hoy a las 16:00, queda retenida: incluye producto de los lotes afectados y le propondremos premezcla de otros lotes.`,
    drill: 'Motivo del envío: simulacro de retirada (procedimiento PR-CAL-007). En una retirada real, aquí se indican las instrucciones definitivas acordadas por Calidad y Asuntos regulatorios.',
    sign: 'Atentamente,\nOperaciones y calidad · Norel Nutrición Animal\nOficina de pedidos · Madrid',
    from: 'Operaciones y calidad, Norel Nutrición Animal',
    to: (c) => `${c.label}`,
    autSubject: '[SIMULACRO] Notificación a la autoridad competente · RET-2026-1028 · Salmonella en colina cloruro 60 % · Reglamento (CE) 178/2002, art. 19',
    autGreeting: 'A la autoridad competente en materia de seguridad de los piensos:',
    autIntro: 'Norel, S.A. (Norel Nutrición Animal) comunica, conforme al artículo 19 del Reglamento (CE) 178/2002, que ha detectado Salmonella en una materia prima utilizada en la fabricación de premezclas ya puestas en el mercado:',
    lAutQty: (a, b, c) => `Cantidad: ${a} t de premezcla fabricadas; ${b} t expedidas y ${c} t en almacén bajo control del operador`,
    lDist: (c, p) => `Distribución: ${c} clientes (fábricas de piensos y grupos integradores) en ${p} países`,
    autReason: 'Origen: colina cloruro 60 %, lote MP-2610-CC-118, proveedor Agroquímica Delta, recibido el 21/10/2026. Resultado positivo de Salmonella (ensayo LAB-2610-0933) comunicado por el laboratorio el 28/10/2026 a las 05:50. Se han tomado muestras de retención de los cuatro lotes de premezcla para su análisis.',
    autAsk: 'Medidas adoptadas: bloqueo de los lotes, retención de las expediciones pendientes, aviso a los clientes y recogida del producto. Se remitirá información adicional en cuanto estén los resultados de las muestras de retención y se informará a las autoridades de los países de destino por los cauces correspondientes.',
    autTo: 'Autoridad competente · seguridad de los piensos',
    custBody: (n, t, ped) => `${n} ${n === 1 ? 'albarán' : 'albaranes'} con ${t} de premezcla (pedido ${ped}).`,
    maNote: 'Exportación a Marruecos: se coordina con Logística y exportación el aviso a la autoridad del país de destino (PR-EXP-002).',
    pcmNote: 'Tiene abierta la reclamación CLM-2026-1028 (vitamina E, lote PRM-2610-0388), independiente de esta retirada.',
    gilNote: 'Grupo integrador avícola con el cuestionario CUE-2026-052 en curso: el aviso se coordina con Norel Solutions.',
    plannedNote: (P) => `Expedición ${P.ship} (pedido ${P.order}), 3 t, hoy a las 16:00: retener.`,
    channelCust: 'Correo (Outlook) + llamada de Norel Solutions',
    noticeLang: 'Aviso en español',
    custAction: (planned) => `Aviso y retirada del producto sin coste${planned ? ' y retención de la expedición de hoy' : ''}`,
    internal: 'Interno',
    autLabel: 'Autoridad competente · art. 19 del Reglamento (CE) 178/2002',
    channelAut: 'Notificación electrónica + correo del Responsable de asuntos regulatorios',
    autMeta: ['Reglamento (CE) 178/2002', 'Plazo ilustrativo: 4 h', 'Aviso en español'],
    autBody: 'Notificación inicial con el origen (MP-2610-CC-118), los 4 lotes de premezcla, las 96 t y la distribución en 3 países. Se amplía cuando llegue el resultado de las muestras de retención.',
    autRefs: 'Art. 19 · Reg. (CE) 178/2002',
    autAction: 'Notificación inicial a la autoridad',
    logLabel: 'Logística y exportación · expediciones',
    channelLog: 'Microsoft Teams #expediciones + orden en SAP S/4HANA',
    logMeta: ['Muelle de la Planta de premezclas (España)', '1 expedición de hoy · 16:00'],
    logBody: 'Retener las cargas del muelle (7 t), anular la expedición EXP-26-10-0093 de hoy y localizar los transportes en ruta de los últimos 5 días con producto de los 4 lotes.',
    logAction: 'Retener expediciones y localizar entregas',
    labLabel: 'Laboratorio (LIMS) · muestras de retención',
    channelLab: 'LIMS + aviso en Microsoft Teams #laboratorio',
    labMeta: ['Jefe de laboratorio', 'Resultado en 24-48 h'],
    labBody: 'Analizar la Salmonella en las muestras de retención de los 4 lotes de premezcla (LAB-2610-0934 a 0937) y repetir el ensayo del lote MP-2610-CC-118 (LAB-2610-0933).',
    labAction: 'Priorizar los 5 ensayos de Salmonella',
    solLabel: 'Norel Solutions · asesoramiento técnico a clientes',
    channelSol: 'Llamada del asesor técnico + correo de seguimiento',
    solMeta: ['9 clientes', 'Seguimiento diario'],
    solBody: 'Acompañar a cada cliente en la localización del producto y en la sustitución por premezcla de otros lotes; recoger las existencias y lo incorporado a pienso.',
    solAction: 'Llamada de seguimiento a cada cliente',
    nd: {
      prvK: 'Proveedor', prvSub: 'Colina cloruro 60 %', prvMeta: 'Recibido el 21/10/2026',
      mpK: 'Materia prima', mpSub: 'Colina cloruro 60 %', mpMeta: 'LAB-2610-0933 · 28/10 05:50', mpAlert: 'Salmonella positivo',
      lotK: 'Premezcla', lotMeta: (t, d) => `${t} · fabricado el ${d}`,
      almK: 'Almacén', almSub: 'Producto terminado', almMeta: 'Planta de premezclas (España)', almAlert: 'Bloquear en SAP QM',
      mueK: 'Muelle', mueSub: (P) => `Carga pendiente · ${P.ship} hoy 16:00`, mueMeta: 'Planta de premezclas (España)', mueAlert: 'Retener expediciones',
      expK: 'Expedido', expSub: (a, c) => `${a} albaranes · ${c} clientes`, expMeta: 'Del 23/10 al 27/10/2026',
      destK: 'País de destino', destSub: (c, a) => `${c} ${c === 1 ? 'cliente' : 'clientes'} · ${a} albaranes`,
      autK: 'Autoridad', autT: 'Autoridad competente', autSub: 'Notificación art. 19'
    },
    pct100: '100,0 %',
    loc: {
      alm: 'Almacén de producto terminado', almSub: 'Planta de premezclas (España) · SAP S/4HANA', almAct: 'Bloquear los lotes en SAP QM',
      mue: 'Muelle de expediciones', mueSub: 'Planta de premezclas (España) · carga pendiente', mueSub2: (P, c) => `${P.ship} · ${c} · hoy a las 16:00`, mueAct: 'Retener la carga y anular la expedición de hoy',
      cust: (k) => `Con clientes · ${k}`, custAct: 'Aviso y retirada del producto sin coste', custActMa: 'Aviso, retirada y documentación de exportación'
    },
    fl: {
      seg1: 'Producto', col1: 'Kilos',
      title1: (c) => `Retirada ${c} → clientes y almacén`,
      in1: 'Premezclas fabricadas con MP-2610-CC-118', in1Sub: (n) => `${n} lotes de premezcla · del 22/10 al 26/10/2026`,
      outsTitle: 'Destino actual',
      oAlm: 'Almacén de producto terminado', oAlmSub: 'Planta de premezclas (España) · sin expedir',
      oMue: 'Muelle de expediciones', oMueSub: (P) => `Carga pendiente · ${P.ship} hoy a las 16:00`,
      seg2: 'Albaranes', col2: 'Albaranes',
      title2: (c) => `Retirada ${c} → albaranes por cliente`,
      in2: 'Albaranes de expedición', in2Sub: (n) => `${n} albaranes · del 23/10 al 27/10/2026`,
      outsTitle2: 'Albaranes por cliente',
      m1Sub: (c) => `${c.ped} · ${c.range}`
    },
    st: { mp: 'Materia prima', fab: 'Fabricación', est: 'Estado actual', dest: 'Destino', cli: 'Clientes' },
    headline: (c, t) => `Retirada ${c} · colina cloruro 60 % MP-2610-CC-118 · Salmonella · ${t} t de premezcla`,
    previewSide: (t, n) => `${t} t · ${n} avisos`,
    genSub: (t, n) => `1 materia prima · 4 lotes · ${t} t · ${n} destinatarios`,
    step: [
      ['Localiza el punto de partida', (mp) => `Lote ${mp} · colina cloruro 60 % de Agroquímica Delta · Salmonella positivo (LAB-2610-0933) a las 05:50 del 28/10/2026`],
      ['Hacia atrás: proveedor y recepción', (mp) => `Entrada de mercancías del 21/10/2026 de Agroquímica Delta · certificado del proveedor archivado · ${mp} aún sin bloquear en SAP QM`],
      ['Hacia delante: consumo en fabricación', (n, t) => `${n} lotes de premezcla con la materia prima: PRM-2610-0417, 0418, 0421 y 0425 · ${t} t fabricadas del 22/10 al 26/10`],
      ['Hacia delante: destino de las premezclas', (a, b, c, d) => `${a} t fabricadas = ${b} t en la planta (almacén y muelle) + ${c} t expedidas en ${d} albaranes`],
      ['Muestras de retención en el laboratorio', (n) => `${n} muestras de retención de los lotes de premezcla en análisis de Salmonella (LAB-2610-0934 a 0937) · resultado en 24-48 h`],
      ['Expediciones previstas y cargas del muelle', (P, t) => `Expedición ${P.ship} de hoy a las 16:00 (3 t para Piensos Cuenca Mediterráneo) a retener · 7 t en el muelle de ${t} t en la planta`],
      ['Albaranes, pedidos y clientes', (a, c, p) => `${a} albaranes a ${c} clientes de ${p} países · pedidos del 23/10 al 27/10/2026 · 2 clientes de exportación (Marruecos)`],
      ['Contactos de clientes y consultas abiertas', (n) => `${n} destinatarios verificados (9 clientes y la autoridad competente) · reclamación abierta CLM-2026-1028 de Piensos Cuenca Mediterráneo, independiente`],
      ['Estado de cada lote desde SAP S/4HANA', (a, b, c) => `${a} t fabricadas: ${b} t en la planta y ${c} t expedidas a clientes`],
      ['Cuadre de la retirada: fabricado frente a destino', (t) => `Conciliado 100,0 % · 0 kg sin justificar · ${t} de ${t} t localizadas`],
      ['Abre el registro de retirada con un aviso por destinatario', (r, n) => `Retirada ${r} en borrador · bloqueo de ${n} lotes de premezcla y de la materia prima en SAP QM propuesto`],
      ['Prepara los avisos sin enviar', (n) => `${n} avisos pendientes de aprobación (correo) · notificación a la autoridad competente (art. 19) en borrador`]
    ],
    mk: ['Punto de partida localizado', 'Traza hacia atrás completa', 'Estado del laboratorio consultado', 'Expediciones y clientes identificados', 'Contactos identificados', 'Cuadre de la retirada cerrado', 'Registro y avisos preparados'],
    loc2: {
      label: 'Producto localizado',
      sub: (o, s, a) => `${o} t en ${a} albaranes · ${s} t en la planta`,
      short: (t, o, c, p, a, alm, mue) => `${t} de ${t} t localizadas (${o} t expedidas en ${a} albaranes a ${c} clientes de ${p} países, ${alm} en almacén y ${mue} en el muelle)`
    },
    kpiNotifyLabel: 'Destinatarios a avisar',
    kpiNotifySub: () => '1 expedición de hoy a retener · 16:00',
    bal: {
      title: 'Balance de masas', kpiLabel: 'Balance de masas conciliado',
      sub: 'Premezclas fabricadas con la materia prima hasta su destino y albaranes por cliente · SAP S/4HANA, MES de planta y LIMS',
      head: 'Retirada RET-2026-1028', headSide: (n) => `${n} clientes · 4 lotes`,
      labels: { in: 'Fabricado', losses: 'Mermas justificadas', out: 'Expedido a clientes', stock: 'En la planta' },
      detailTitle: 'Detalle por flujo',
      criterio: 'Criterio: la diferencia sin justificar se muestra tal cual, no se reparte. Cada lote se cuenta por su número en el MES de planta; cada expedición, por su albarán en SAP S/4HANA; cada ensayo, por su código en el LIMS.',
      reportText: 'Lotes y consumos declarados en el MES de planta; albaranes y existencias en SAP S/4HANA; ensayos de Salmonella en el LIMS; consultas de clientes en Salesforce CRM.'
    },
    prod: { title: 'Expediciones con producto de los lotes afectados', side: (n, a) => `${n} clientes · ${a} albaranes`, c1: 'Pedido', c2: 'Cliente', c3: 'Fechas', c4: 'Albaranes', c5: 'Cantidad', c6: 'Localizado' },
    un: {
      title: 'Albaranes y existencias', sub: (a, p) => `${a} albaranes y ${p} posiciones de planta · SAP S/4HANA y MES de planta`,
      csv: 'Albaranes y existencias de la retirada (CSV)', alb: 'Albarán', lot: 'Lote de premezcla', product: 'Producto', where: 'Cliente o ubicación', detail: 'Detalle', date: 'Fecha', order: 'Pedido o referencia', qty: 'Cantidad (kg)', state: 'Estado', action: 'Acción en una retirada real',
      byLoc: 'Por destino', refLabel: 'Retirada', nLabel: 'Documentos', qtyLabel: 'Cantidad (kg)', listLabel: 'Albaranes y existencias'
    },
    cu: {
      title: 'Destinatarios a avisar', sub: (n, t) => `${n} destinatarios con ${t} t expedidas · 1 expedición de hoy a retener`,
      holdsTitle: 'Acciones en la planta',
      h1: (P) => `Retener la expedición ${P.ship} (hoy a las 16:00)`, h1Meta: (P, c) => ['3 t de premezcla', P.order, c],
      h1Body: (P) => `En una retirada real, Logística no carga la expedición del muelle reservada en ${P.order} y se propone al cliente premezcla de otros lotes.`,
      h2: (t) => `Bloquear en SAP QM las ${t} t que siguen en la planta`, h2Meta: ['hoy', '4 lotes de premezcla', 'SAP S/4HANA'],
      h2Body: 'Siguen disponibles para expedir: en una retirada real se bloquean los 4 lotes de premezcla y la materia prima MP-2610-CC-118 hasta conocer el resultado. Listado por lote en la pestaña «Albaranes y existencias» y en el CSV.',
      h3: 'Priorizar el laboratorio', h3Meta: (n) => [`${n} muestras de retención`, '24-48 h', 'LIMS'],
      h3Body: 'En una retirada real se priorizan los ensayos de Salmonella de las muestras de retención y se repite el de la materia prima, para ampliar o cerrar la notificación a la autoridad.'
    },
    ap: {
      title: 'Retirada y avisos del simulacro',
      s1: 'Destinatarios con producto de los lotes afectados', s1v: (n, t) => `${n} destinatarios · ${t} t expedidas`,
      s2: 'Expedición de hoy a retener', s2v: (P) => `${P.ship} · hoy a las 16:00 · 3 t`,
      s3: 'Bloqueo que se aplicaría', s3v: (t) => `${t} t en almacén y muelle`, s3c: 'Sin bloqueo en simulacro',
      s4: 'Laboratorio', s4v: (n) => `Priorizar las ${n} muestras de retención (ensayos en el LIMS)`,
      effects: (n) => [
        `Outlook: ${n} avisos guardados como borrador con la marca SIMULACRO; no se envía nada`,
        `SAP S/4HANA: registro de la retirada y bloqueo de lotes en SAP QM en borrador, sin aplicar`,
        'MES de planta: sin cambios; en un simulacro no se bloquea ningún lote ni se retiene ninguna expedición',
        'Registro {code} aprobado con los tiempos de cada actividad'
      ]
    },
    rp: {
      objeto: 'Simulacro de retirada con punto de partida en {label}. Se comprueba la trazabilidad hacia atrás (proveedor, recepción y análisis) y hacia delante (lotes de premezcla, almacén, albaranes y clientes), con el balance de masas de las premezclas fabricadas.',
      noAction: 'El ejercicio no bloquea lotes, no retiene expediciones y no envía avisos.',
      results: (n, t) => [
        `${n} destinatarios (9 clientes de España, Portugal y Marruecos y la autoridad competente) y 1 expedición de hoy que se retendría.`,
        'Los ensayos de retención de los 4 lotes (LAB-2610-0934 a 0937) deciden si la notificación a la autoridad se amplía o se cierra.',
        `Se bloquearían ${t} t en almacén y muelle de la planta.`
      ],
      bc1: 'Etapa', bc2: 'Referencia', bc3: 'Fecha', bc4: 'Detalle',
      backRows: (lots, t) => [
        { etapa: 'Proveedor', ref: 'Agroquímica Delta', fecha: '21/10/2026', det: 'Entrada de colina cloruro 60 % · lote MP-2610-CC-118 · certificado del proveedor archivado' },
        { etapa: 'Análisis', ref: 'LAB-2610-0933', fecha: '28/10/2026 05:50', det: 'Salmonella positivo en una muestra del lote MP-2610-CC-118 · LIMS' }
      ].concat(lots.map((l) => ({ etapa: 'Fabricación', ref: l.code, fecha: l.date, det: `${l.t} de ${l.name.toLowerCase()} con la materia prima` })), [
        { etapa: 'Retención', ref: 'LAB-2610-0934/0937', fecha: '28/10/2026', det: '4 muestras de retención en análisis de Salmonella · resultado en 24-48 h' },
        { etapa: 'Retirada', ref: 'RET-2026-1028', fecha: '28/10/2026', det: `${t} t localizadas · objetivo ilustrativo: informar a autoridades y clientes en 4 h` }
      ]),
      fwdExtra: (P, c, n, alm, mue) => [
        { ped: P.order, cliente: `${c} (expedición de hoy, 3 t en el muelle)`, date: '28/10/2026', n: 1, qty: '3 t' },
        { ped: 'MUELLE', cliente: 'Muelle de expediciones (carga pendiente)', date: '—', n, qty: mue },
        { ped: 'ALMACÉN', cliente: 'Almacén de producto terminado (sin expedir)', date: '—', n, qty: alm }
      ],
      conclusion: 'Conclusión: la información necesaria para una retirada se obtiene completa y las 96 t cuadran lote a lote y albarán a albarán. Acciones de mejora propuestas: enlazar en el MES de planta cada lote de materia prima con los lotes de premezcla al fabricarlos y lanzar el aviso a la autoridad desde el propio registro de la retirada.',
      note: 'Simulacro: no se ha bloqueado ningún lote, no se ha retenido ninguna expedición y no se ha enviado ningún aviso. Datos sintéticos de demostración.'
    },
    audit: { back: (mp, n) => `materia prima ${mp} · proveedor Agroquímica Delta · ${n} lotes de premezcla`, fwd: (t, a, c, p) => `${t} t · ${a} albaranes · ${c} clientes en ${p} países` },
    say: (P, t, n) => [
      `Lo accionable: ${P.ship} (hoy a las 16:00) se retendría y se bloquearían en SAP QM las ${t} t que siguen en la planta.`,
      `Los avisos van a ${n} destinatarios con sus pedidos, lotes y albaranes; la autoridad competente recibe la notificación inicial del artículo 19. En un simulacro no se envía nada. Decide el Responsable de operaciones y calidad.`
    ],
    title: 'Simulacro de retirada', nav: 'Retiradas y simulacros', section: 'Calidad',
    desc: 'Ejercicio de trazabilidad para retiradas de producto: genealogía hacia atrás y hacia delante, de la materia prima al lote de premezcla, al albarán y al cliente, balance de masas y destinatarios a avisar, a partir de un lote de materia prima o de premezcla.',
    place: 'Planta de premezclas (España) · Madrid (oficina de pedidos)',
    approver: 'Responsable de operaciones y calidad',
    agents: { trace: 'Trazabilidad', bal: 'Balance de masas', rec: 'Retirada y avisos' },
    targetText: 'Objetivo ilustrativo: 4 h', todayEstimate: '3-6 h', timerRef: 'Objetivo demo: 4 h', packLabel: 'Descargar paquete de la retirada',
    setup: { title: 'Punto de partida', sub: 'Un lote de materia prima o un lote de premezcla' },
    m: {
      rawLabel: 'Materia prima', rawNoun: 'el lote de materia prima', rawField: 'Lote de materia prima', rawEntry: (c) => `Lote ${c}`, rawOption: 'Colina cloruro 60 % · Salmonella positivo (LAB-2610-0933) · 4 lotes de premezcla',
      premixLabel: 'Premezcla', premixNoun: 'el lote de premezcla', premixField: 'Lote de premezcla', premixEntry: (c) => `Lote ${c}`,
      premixOption: (n) => `${n} · fabricado con MP-2610-CC-118`,
      premixHeadline: (c, mp) => `Lote ${c} · fabricado con ${mp} → se traza la retirada completa`,
      premixResult: (c, n, mp) => `Lote ${c} · ${n.toLowerCase()} · fabricado con la materia prima ${mp} (Salmonella positivo) → se traza la retirada RET-2026-1028 completa`
    },
    reference: {
      title: 'Referencia de auditoría',
      sub: 'Objetivo del ejercicio; Calidad y Asuntos regulatorios confirman los requisitos de la autoridad y de los clientes',
      items: [
        ['Reglamento (CE) 178/2002, art. 19', 'Obligación del operador de retirar el pienso no conforme y de informar a la autoridad competente y a los clientes. Objetivo ilustrativo del ejercicio: informar a autoridades y clientes en 4 horas.'],
        ['Reglamento (CE) 183/2005', 'Higiene de los piensos: trazabilidad, control de Salmonella en materias primas y plan de retirada del operador.'],
        ['PR-CAL-007', 'Procedimiento interno de retirada y trazabilidad de lotes: Operaciones y calidad decide el alcance y aprueba los avisos.']
      ],
      note: 'Un simulacro no bloquea lotes, no retiene expediciones ni envía avisos: se mide si la información se obtiene completa, cuadra y a tiempo.'
    },
    legend: { planned: 'Expedición de hoy: retener', click: 'Cada tarjeta resume una fase de la retirada' },
    noticeCfg: { title: 'Simulacro de retirada' },
    approvalCfg: { policy: 'PR-CAL-007 · bloquear lotes o retener expediciones requiere la aprobación del Responsable de operaciones y calidad', approveLabel: 'Aprobar y cerrar simulacro', rejectPlaceholder: 'Por ejemplo: falta confirmar el contacto de un cliente de exportación' },
    clock: { title: 'Cronómetro frente a objetivo', sub: 'Tiempos de la simulación; no son medidas de rendimiento de los sistemas' },
    reportCfg: { subtitle: 'Registro del ejercicio de trazabilidad y retirada · Reglamento (CE) 178/2002, art. 19 · PR-CAL-007' },
    compare: {
      rows: [
        { k: 'Personas implicadas', today: '4-5: Calidad, Producción, Logística, Atención al cliente y Asuntos regulatorios', agentic: '1: {approver} revisa y aprueba' },
        { k: 'Sistemas consultados', today: '5-6 abiertos a mano: SAP, LIMS, MES, Salesforce, hojas de cálculo y correo', agentic: '4 conectores consultados por los agentes: SAP S/4HANA, LIMS, MES de planta y Salesforce CRM, más Outlook para los avisos' },
        { k: 'Pasos', today: '20-30 consultas, cruces de lotes con albaranes y existencias y cálculos manuales', agentic: '{steps} pasos automáticos y 1 aprobación' },
        { k: 'Balance de masas', today: 'Hoja de cálculo con fabricado, expedido y existencias', agentic: 'Calculado por lote y albarán: {reconciled} conciliado' }
      ]
    },
    presenter: (mp, v) => ({
      idle: [
        'Simulacro de retirada con trazabilidad y balance de masas; en el piloto Calidad confirma el protocolo y medimos el tiempo real.',
        `Se elige el punto de partida: el lote de materia prima ${mp} (colina cloruro 60 % con Salmonella) o un lote de premezcla afectado.`,
        'Agentic Platform recorre LIMS, SAP y el MES hacia atrás hasta el proveedor y la recepción, y hacia delante hasta los lotes de premezcla, los albaranes y cada cliente, y cuadra las 96 t lote a lote.'
      ],
      nextIdle: `Pulsar «Iniciar simulacro» con el lote ${mp} (o elegir el lote de premezcla ${v}).`,
      nextRun: 'Pulsar «Ver aviso» de Piensos Cuenca Mediterráneo y después «Aprobar y cerrar simulacro».',
      nextDone: '«Descargar paquete de la retirada»: CSV de albaranes y registro imprimible. Después, «Cuestionario de cliente» (flecha derecha).'
    })
  };


  const RET = 'RET-2026-1028';
  const MP = 'MP-2610-CC-118';
  const PLANNED = { cust: 'pcm', order: 'PV-26-10-0583', ship: 'EXP-26-10-0093', kg: 3000 };

  /* Lotes de premezcla con la materia prima: [id, código, fecha de fabricación, kg, kg en almacén, kg en el muelle] */
  const LOTS = [
    ['P17', 'PRM-2610-0417', '2026-10-22', 28000, 6000, 2000],
    ['P18', 'PRM-2610-0418', '2026-10-22', 24000, 5000, 2000],
    ['P21', 'PRM-2610-0421', '2026-10-23', 22000, 6000, 1000],
    ['P25', 'PRM-2610-0425', '2026-10-26', 22000, 7000, 2000]
  ].map(([id, code, date, kg, alm, mue], i) => ({ id, code, date, kg, alm, mue, shipped: kg - alm - mue, name: S.lotNames[i] }));

  /* Clientes: [id, cliente, tipo, localidad, país, toneladas por lote de premezcla (0417, 0418, 0421, 0425), albaranes, pedido] */
  const CUSTOMERS = [
    ['pcm', 'Piensos Cuenca Mediterráneo, S.A.', 'fab', 'Cuenca', 'es', [3, 2, 2, 1], 12, 'PV-26-10-0538'],
    ['gil', 'Grupo Integrador Levante', 'int', 'Valencia', 'es', [4, 3, 2, 2], 24, 'PV-26-10-0541'],
    ['peb', 'Piensos del Ebro, S.L.', 'fab', 'Zaragoza', 'es', [3, 3, 2, 1], 18, 'PV-26-10-0547'],
    ['ngm', 'Nutrición Ganadera Manchega, S.A.', 'fab', 'Ciudad Real', 'es', [2, 2, 2, 1], 14, 'PV-26-10-0552'],
    ['ptq', 'Piensos Tarraco, S.C.L.', 'fab', 'Tarragona', 'es', [2, 1, 1, 2], 12, 'PV-26-10-0556'],
    ['rdt', 'Rações do Tejo, Lda.', 'fab', 'Santarém', 'pt', [2, 2, 2, 2], 20, 'PV-26-10-0561'],
    ['acb', 'Alimentos Compostos Beira, S.A.', 'fab', 'Viseu', 'pt', [1, 1, 2, 1], 16, 'PV-26-10-0563'],
    ['pat', 'Provendes Atlas, S.A.R.L.', 'fab', 'Casablanca', 'ma', [2, 2, 1, 1], 18, 'PV-26-10-0570'],
    ['prf', 'Provendes du Rif, S.A.R.L.', 'fab', 'Tánger', 'ma', [1, 1, 1, 2], 14, 'PV-26-10-0574']
  ].map(([id, label, kind, city, country, cells, albs, ped]) => ({ id, label, kind, city, country, cells, albs, ped, kg: cells.reduce((s, t) => s + t, 0) * 1000 }));
  const CUST = {};
  CUSTOMERS.forEach((c) => { CUST[c.id] = c; });
  const COUNTRIES = ['es', 'pt', 'ma'];

  const N_ALB = CUSTOMERS.reduce((s, c) => s + c.albs, 0);
  const KG_IN = LOTS.reduce((s, l) => s + l.kg, 0);
  const KG_OUT = CUSTOMERS.reduce((s, c) => s + c.kg, 0);
  const KG_ALM = LOTS.reduce((s, l) => s + l.alm, 0);
  const KG_MUE = LOTS.reduce((s, l) => s + l.mue, 0);
  const KG_STK = KG_ALM + KG_MUE;
  const T_IN = KG_IN / 1000;
  const T_OUT = KG_OUT / 1000;
  const T_STK = KG_STK / 1000;
  const N_NOTIFY = CUSTOMERS.length + 1;
  const N_LOTS = LOTS.length;
  const N_COUNTRIES = COUNTRIES.length;
  const N_ROWS = N_ALB + 2 * N_LOTS;

  const fmtD = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '');
  const dm = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}` : '');
  const plural = (n, a, b) => `${n0(n)} ${n === 1 ? a : b}`;
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const pad = (n, w) => String(n).padStart(w, '0');
  const tons = (kg) => `${n0(kg / 1000)} t`;
  const kindOf = (c) => S.kinds[c.kind];
  const countryOf = (c) => S.country[c.country];
  const alb = (n) => plural(n, S.albOne, S.albMany);

  /* ---------------------------------------------------------------- Albaranes */

  const RAW = [];
  CUSTOMERS.forEach((c, ci) => {
    const total = sum(c.cells, (t) => t);
    const exact = c.cells.map((t) => (c.albs * t) / total);
    const cnt = exact.map((x) => Math.max(1, Math.floor(x)));
    let rest = c.albs - sum(cnt, (x) => x);
    const order = exact.map((x, i) => [x - Math.floor(x), i]).sort((a, b) => b[0] - a[0]);
    for (let k = 0; rest > 0; k = (k + 1) % order.length) { cnt[order[k][1]] += 1; rest -= 1; }
    c.cells.forEach((t, li) => {
      const n = cnt[li];
      const kg = t * 1000;
      const base = Math.floor(kg / n / 10) * 10;
      const day0 = Number(LOTS[li].date.slice(8, 10));
      const span = 27 - day0;
      for (let j = 0; j < n; j += 1) {
        const day = day0 + 1 + ((j + ci) % span);
        RAW.push({ cust: c.id, ci, li, kg: j === 0 ? kg - base * (n - 1) : base, date: `2026-10-${pad(day, 2)}` });
      }
    });
  });
  RAW.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : a.ci - b.ci || a.li - b.li));
  RAW.forEach((r, i) => { r.id = `ALB-26-10-${pad(1200 + i, 4)}`; });
  CUSTOMERS.forEach((c) => {
    const mine = RAW.filter((r) => r.cust === c.id);
    c.alb = mine;
    c.first = mine[0].date;
    c.last = mine[mine.length - 1].date;
    c.range = c.first === c.last ? fmtD(c.first) : `${dm(c.first)} - ${fmtD(c.last)}`;
  });

  const CHIPS = { sold: { status: 'shipped', label: S.chip.sold }, alm: { status: 'hold', label: S.chip.alm }, mue: { status: 'pending', label: S.chip.mue } };
  const unitRows = RAW.map((r) => {
    const c = CUST[r.cust];
    const l = LOTS[r.li];
    return { alb: r.id, lot: l.code, lotSub: l.name, where: c.label, whereSub: `${c.city} · ${countryOf(c)}`, fecha: fmtD(r.date), fechaSub: c.ped, qty: r.kg, estado: CHIPS.sold, accion: c.country === 'ma' ? S.actions.soldMa : S.actions.sold };
  });
  LOTS.forEach((l) => {
    unitRows.push({ alb: `STK-ALM-${l.code.slice(-4)}`, lot: l.code, lotSub: l.name, where: S.loc.alm, whereSub: S.loc.almSub, fecha: fmtD(l.date), fechaSub: S.madeOn, qty: l.alm, estado: CHIPS.alm, accion: S.actions.alm });
  });
  LOTS.forEach((l) => {
    unitRows.push({ alb: `STK-MUE-${l.code.slice(-4)}`, lot: l.code, lotSub: l.name, where: S.loc.mue, whereSub: S.loc.mueSub, fecha: fmtD(l.date), fechaSub: S.madeOn, qty: l.mue, estado: CHIPS.mue, accion: S.actions.mue });
  });

  /* ---------------------------------------------------------------- Avisos */

  function noticeOf(c) {
    const planned = c.id === PLANNED.cust;
    const lots = LOTS.filter((l, i) => c.cells[i] > 0).map((l) => l.code);
    const ids = c.alb.map((r) => r.id);
    const shown = ids.slice(0, 3).join(', ') + (ids.length > 3 ? S.andMore(ids.length - 3) : '');
    const subj = S.subject(lots.length);
    const parts = [
      S.greeting(c),
      S.intro,
      [S.lCamp(RET, MP), S.lLots(lots.join(', '), lots.length), S.lAlbs(shown, ids.length), S.lQty(tons(c.kg))].join('\n'),
      S.reason,
      S.ask
    ];
    if (c.country === 'ma') parts.push(S.exportNote);
    if (c.id === 'pcm') parts.push(S.clmNote);
    if (planned) parts.push(S.planned(PLANNED));
    parts.push(S.drill);
    parts.push(S.sign);
    return { lang: S.lang, headers: { From: S.from, To: S.to(c), Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [RET, lots[0]].concat(planned ? [PLANNED.ship] : []) };
  }
  function noticeAut() {
    const subj = S.autSubject;
    const parts = [S.autGreeting, S.autIntro, [S.lCamp(RET, MP), S.lLots(LOTS.map((l) => l.code).join(', '), N_LOTS), S.lAutQty(T_IN, T_OUT, T_STK), S.lDist(CUSTOMERS.length, N_COUNTRIES)].join('\n'), S.autReason, S.autAsk, S.drill, S.sign];
    return { lang: S.lang, headers: { From: S.from, To: S.autTo, Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [RET, LOTS[0].code] };
  }

  const items = CUSTOMERS.map((c) => {
    const body = [S.custBody(c.albs, tons(c.kg), c.ped)];
    if (c.country === 'ma') body.push(S.maNote);
    if (c.id === 'pcm') body.push(S.pcmNote);
    if (c.id === 'gil') body.push(S.gilNote);
    if (c.id === PLANNED.cust) body.push(S.plannedNote(PLANNED));
    return { id: c.id, label: c.label, icon: 'building', notify: true, channel: S.channelCust, meta: [`${c.city} · ${countryOf(c)}`, kindOf(c), S.noticeLang], body: body.join(' '), notice: noticeOf(c), refs: c.ped + (c.id === PLANNED.cust ? ` · ${PLANNED.order}` : ''), qtyText: tons(c.kg), action: S.custAction(c.id === PLANNED.cust) };
  });
  items.push({ id: 'aut', label: S.autLabel, icon: 'shield-check', notify: true, channel: S.channelAut, meta: S.autMeta, body: S.autBody, notice: noticeAut(), refs: S.autRefs, qtyText: tons(KG_IN), action: S.autAction });
  items.push({ id: 'logistica', label: S.logLabel, icon: 'truck', notify: false, chip: S.internal, channel: S.channelLog, meta: S.logMeta, body: S.logBody, refs: `${N_LOTS} ${S.lotsWord}`, qtyText: tons(KG_MUE), action: S.logAction });
  items.push({ id: 'laboratorio', label: S.labLabel, icon: 'flask', notify: false, chip: S.internal, channel: S.channelLab, meta: S.labMeta, body: S.labBody, refs: 'LIMS', qtyText: `${N_LOTS} ${S.samplesWord}`, action: S.labAction });
  items.push({ id: 'solutions', label: S.solLabel, icon: 'users', notify: false, chip: S.internal, channel: S.channelSol, meta: S.solMeta, body: S.solBody, refs: RET, qtyText: plural(CUSTOMERS.length, S.cliOne, S.cliMany), action: S.solAction });

  /* ---------------------------------------------------------------- Genealogía */

  const nodes = [
    { id: 'PRV', stage: 'mp', kicker: S.nd.prvK, title: 'Agroquímica Delta', sub: S.nd.prvSub, meta: S.nd.prvMeta, reveal: 1 },
    { id: 'MP', stage: 'mp', kicker: S.nd.mpK, title: MP, mono: true, sub: S.nd.mpSub, meta: S.nd.mpMeta, alert: S.nd.mpAlert, alertTone: true, reveal: 1 }
  ];
  LOTS.forEach((l) => nodes.push({ id: l.id, stage: 'fab', kicker: S.nd.lotK, title: l.code, mono: true, sub: l.name, meta: S.nd.lotMeta(tons(l.kg), dm(l.date)), tone: 'stock', reveal: 2 }));
  nodes.push(
    { id: 'ALM', stage: 'est', kicker: S.nd.almK, title: tons(KG_ALM), sub: S.nd.almSub, meta: S.nd.almMeta, alert: S.nd.almAlert, alertTone: true, tone: 'stock', reveal: 3 },
    { id: 'MUE', stage: 'est', kicker: S.nd.mueK, title: tons(KG_MUE), sub: S.nd.mueSub(PLANNED), meta: S.nd.mueMeta, alert: S.nd.mueAlert, alertTone: true, tone: 'planned', reveal: 3 },
    { id: 'EXP', stage: 'est', kicker: S.nd.expK, title: tons(KG_OUT), sub: S.nd.expSub(N_ALB, CUSTOMERS.length), meta: S.nd.expMeta, tone: 'shipped', reveal: 3 }
  );
  COUNTRIES.forEach((k) => {
    const cs = CUSTOMERS.filter((c) => c.country === k);
    nodes.push({ id: `D:${k}`, stage: 'dest', kicker: S.nd.destK, title: S.country[k], sub: S.nd.destSub(cs.length, sum(cs, (c) => c.albs)), meta: tons(sum(cs, (c) => c.kg)), tone: 'customer', reveal: 4 });
  });
  CUSTOMERS.forEach((c) => nodes.push({ id: `C:${c.id}`, stage: 'cli', kicker: kindOf(c), title: c.label.replace(/, (S\.[LA]\.|S\.C\.L\.|Lda\.|S\.A\.R\.L\.)$/, ''), sub: `${c.city} · ${tons(c.kg)}`, tone: 'customer', reveal: 5 }));
  nodes.push({ id: 'C:aut', stage: 'cli', kicker: S.nd.autK, title: S.nd.autT, sub: S.nd.autSub, tone: 'planned', reveal: 5 });
  const edges = [['PRV', 'MP']];
  LOTS.forEach((l) => { edges.push(['MP', l.id], [l.id, 'ALM'], [l.id, 'MUE'], [l.id, 'EXP']); });
  COUNTRIES.forEach((k) => { edges.push(['EXP', `D:${k}`]); });
  CUSTOMERS.forEach((c) => edges.push([`D:${c.country}`, `C:${c.id}`]));
  edges.push(['MUE', `C:${PLANNED.cust}`], ['EXP', 'C:aut']);

  /* ---------------------------------------------------------------- Tablas */

  const saleRows = CUSTOMERS.map((c) => ({ ped: c.ped, cliente: c.label, sub: `${kindOf(c)} · ${c.city} · ${countryOf(c)}`, date: c.range, n: c.albs, qty: tons(c.kg), located: S.pct100 }));
  const locRows = [
    { ref: RET, where: S.loc.mue, whereSub: S.loc.mueSub2(PLANNED, CUST[PLANNED.cust].label), n: N_LOTS, qty: KG_MUE, action: S.loc.mueAct, tone: 'crit' },
    { ref: RET, where: S.loc.alm, whereSub: S.loc.almSub, n: N_LOTS, qty: KG_ALM, action: S.loc.almAct, tone: 'crit' }
  ].concat(COUNTRIES.map((k) => {
    const cs = CUSTOMERS.filter((c) => c.country === k);
    return { ref: RET, where: S.loc.cust(S.country[k]), whereSub: `${plural(cs.length, S.cliOne, S.cliMany)} · ${S.list(cs.map((c) => c.city))}`, n: sum(cs, (c) => c.albs), qty: sum(cs, (c) => c.kg), action: k === 'ma' ? S.loc.custActMa : S.loc.custAct, tone: 'warn' };
  }));

  const outsSold = CUSTOMERS.map((c) => ({ label: c.label, sub: `${c.ped} · ${c.range} · ${c.city}`, stage: 'SAP', qty: c.kg }));
  const flowKg = {
    key: 'kg', seg: S.fl.seg1, main: true, unit: 'kg', colLabel: S.fl.col1,
    title: S.fl.title1(RET),
    inLabel: S.fl.in1, inSub: S.fl.in1Sub(N_LOTS), inStage: 'MES', inQty: KG_IN,
    phases: [],
    outsTitle: S.fl.outsTitle,
    outs: outsSold.concat([
      { label: S.fl.oAlm, sub: S.fl.oAlmSub, stage: 'SAP', qty: KG_ALM, kind: 'stock' },
      { label: S.fl.oMue, sub: S.fl.oMueSub(PLANNED), stage: 'MES', qty: KG_MUE, kind: 'stock' }
    ])
  };
  const flowAlb = {
    key: 'alb', seg: S.fl.seg2, unit: S.albMany, colLabel: S.fl.col2,
    title: S.fl.title2(RET),
    inLabel: S.fl.in2, inSub: S.fl.in2Sub(N_ALB), inStage: 'SAP', inQty: N_ALB,
    phases: [],
    outsTitle: S.fl.outsTitle2,
    outs: CUSTOMERS.map((c) => ({ label: c.label, sub: S.fl.m1Sub(c), stage: 'SAP', qty: c.albs }))
  };

  const SYSTEMS = ['SAP S/4HANA', 'LIMS', 'MES de planta', 'Salesforce CRM'];

  const scope = {
    headline: S.headline(RET, T_IN),
    previewSide: S.previewSide(T_IN, N_NOTIFY),
    startNode: 'MP',
    stages: [
      { id: 'mp', label: S.st.mp, icon: 'flask' },
      { id: 'fab', label: S.st.fab, icon: 'factory' },
      { id: 'est', label: S.st.est, icon: 'warehouse' },
      { id: 'dest', label: S.st.dest, icon: 'globe' },
      { id: 'cli', label: S.st.cli, icon: 'building', count: N_NOTIFY }
    ],
    nodes,
    edges,
    systems: SYSTEMS,
    genSub: S.genSub(T_IN, N_NOTIFY),
    steps: [
      { agent: 'trace', system: 'LIMS', action: S.step[0][0], result: S.step[0][1](MP), ms: 190, reveal: 0, mark: S.mk[0] },
      { agent: 'trace', system: 'SAP S/4HANA', action: S.step[1][0], result: S.step[1][1](MP), ms: 430, reveal: 1 },
      { agent: 'trace', system: 'MES de planta', action: S.step[2][0], result: S.step[2][1](N_LOTS, T_IN), ms: 520, reveal: 2, mark: S.mk[1] },
      { agent: 'trace', system: 'SAP S/4HANA', action: S.step[3][0], result: S.step[3][1](T_IN, T_STK, T_OUT, N_ALB), ms: 560, reveal: 3 },
      { agent: 'trace', system: 'LIMS', action: S.step[4][0], result: S.step[4][1](N_LOTS), ms: 470, reveal: 4, mark: S.mk[2] },
      { agent: 'trace', system: 'MES de planta', action: S.step[5][0], result: S.step[5][1](PLANNED, T_STK), ms: 380, tone: 'warn', reveal: 4 },
      { agent: 'trace', system: 'SAP S/4HANA', action: S.step[6][0], result: S.step[6][1](N_ALB, CUSTOMERS.length, N_COUNTRIES), ms: 590, reveal: 5, mark: S.mk[3] },
      { agent: 'trace', system: 'Salesforce CRM', action: S.step[7][0], result: S.step[7][1](N_NOTIFY), ms: 480, tone: 'warn', reveal: 5, mark: S.mk[4] },
      { agent: 'bal', system: 'SAP S/4HANA', action: S.step[8][0], result: S.step[8][1](T_IN, T_STK, T_OUT), ms: 420 },
      { agent: 'bal', system: 'Agentic Platform', action: S.step[9][0], result: S.step[9][1](T_IN), ms: 95, tone: 'ok', mark: S.mk[5] },
      { agent: 'rec', system: 'SAP S/4HANA', action: S.step[10][0], result: S.step[10][1](RET, N_LOTS), ms: 360 },
      { agent: 'rec', system: 'Outlook', action: S.step[11][0], result: S.step[11][1](N_NOTIFY), ms: 720, mark: S.mk[6] }
    ],
    located: { label: S.loc2.label, value: `${n0(T_IN)} / ${n0(T_IN)} t`, sub: S.loc2.sub(T_OUT, T_STK, N_ALB), icon: 'truck', short: S.loc2.short(T_IN, T_OUT, CUSTOMERS.length, N_COUNTRIES, N_ALB, tons(KG_ALM), tons(KG_MUE)) },
    kpiNotify: { label: S.kpiNotifyLabel, value: N_NOTIFY, sub: S.kpiNotifySub(PLANNED) },
    balance: {
      title: S.bal.title,
      kpiLabel: S.bal.kpiLabel,
      sub: S.bal.sub,
      head: S.bal.head,
      headSide: S.bal.headSide(CUSTOMERS.length),
      labels: S.bal.labels,
      detailTitle: S.bal.detailTitle,
      criterio: S.bal.criterio,
      reportText: S.bal.reportText,
      flows: [flowKg, flowAlb],
      product: {
        title: S.prod.title,
        side: S.prod.side(CUSTOMERS.length, N_ALB),
        cols: [
          { label: S.prod.c1, key: 'ped', mono: true },
          { label: S.prod.c2, key: 'cliente', sub: 'sub' },
          { label: S.prod.c3, key: 'date' },
          { label: S.prod.c4, key: 'n', num: true },
          { label: S.prod.c5, key: 'qty' },
          { label: S.prod.c6, key: 'located', num: true, ok: true }
        ],
        rows: saleRows
      }
    },
    units: {
      title: S.un.title,
      sub: S.un.sub(N_ALB, 2 * N_LOTS),
      icon: 'truck',
      csvLabel: S.un.csv,
      csvName: 'albaranes',
      csvCols: [
        { label: S.un.alb, key: 'alb' }, { label: S.un.lot, key: 'lot' }, { label: S.un.product, key: 'lotSub' }, { label: S.un.where, key: 'where' }, { label: S.un.detail, key: 'whereSub' },
        { label: S.un.date, key: 'fecha' }, { label: S.un.order, key: 'fechaSub' }, { label: S.un.qty, key: 'qty' }, { label: S.un.state, key: 'estado' }, { label: S.un.action, key: 'accion' }
      ],
      byLoc: { label: S.un.byLoc, refLabel: S.un.refLabel, whereLabel: S.un.where, nLabel: S.un.nLabel, qtyLabel: S.un.qtyLabel, actionLabel: S.un.action, rows: locRows },
      list: {
        label: S.un.listLabel,
        cols: [
          { label: S.un.alb, key: 'alb', mono: true },
          { label: S.un.lot, key: 'lot', mono: true, sub: 'lotSub' },
          { label: S.un.where, key: 'where', sub: 'whereSub' },
          { label: S.un.date, key: 'fecha', sub: 'fechaSub' },
          { label: S.un.qty, key: 'qty', num: true, fmt: 'num' },
          { label: S.un.state, key: 'estado', chip: true },
          { label: S.un.action, key: 'accion' }
        ],
        rows: unitRows
      }
    },
    customers: {
      title: S.cu.title,
      sub: S.cu.sub(N_NOTIFY, T_OUT),
      items,
      holdsTitle: S.cu.holdsTitle,
      holds: [
        { icon: 'truck', tone: 'crit', title: S.cu.h1(PLANNED), meta: S.cu.h1Meta(PLANNED, CUST[PLANNED.cust].label), body: S.cu.h1Body(PLANNED) },
        { icon: 'lock', tone: 'warn', title: S.cu.h2(T_STK), meta: S.cu.h2Meta, body: S.cu.h2Body },
        { icon: 'flask', tone: 'warn', title: S.cu.h3, meta: S.cu.h3Meta(N_LOTS), body: S.cu.h3Body }
      ]
    },
    approval: {
      titlePrefix: S.ap.title,
      scope: [
        { label: S.ap.s1, value: S.ap.s1v(N_NOTIFY, T_OUT), status: 'pending', chip: String(N_NOTIFY) },
        { label: S.ap.s2, value: S.ap.s2v(PLANNED) },
        { label: S.ap.s3, value: S.ap.s3v(T_STK), status: 'evaluate', chip: S.ap.s3c },
        { label: S.ap.s4, value: S.ap.s4v(N_LOTS) }
      ],
      effects: S.ap.effects(N_NOTIFY)
    },
    report: {
      objeto: S.rp.objeto,
      noAction: S.rp.noAction,
      results: S.rp.results(N_NOTIFY, T_STK),
      back: {
        cols: [{ label: S.rp.bc1, key: 'etapa' }, { label: S.rp.bc2, key: 'ref', mono: true }, { label: S.rp.bc3, key: 'fecha' }, { label: S.rp.bc4, key: 'det' }],
        rows: S.rp.backRows(LOTS.map((l) => ({ code: l.code, date: fmtD(l.date), t: tons(l.kg), name: l.name })), T_IN)
      },
      fwd: {
        cols: [{ label: S.prod.c1, key: 'ped', mono: true }, { label: S.prod.c2, key: 'cliente' }, { label: S.prod.c3, key: 'date' }, { label: S.prod.c4, key: 'n' }, { label: S.prod.c5, key: 'qty' }],
        rows: saleRows.concat(S.rp.fwdExtra(PLANNED, CUST[PLANNED.cust].label, N_LOTS, tons(KG_ALM), tons(KG_MUE)))
      },
      conclusion: S.rp.conclusion,
      note: S.rp.note
    },
    audit: { back: S.audit.back(MP, N_LOTS), fwd: S.audit.fwd(T_IN, N_ALB, CUSTOMERS.length, N_COUNTRIES) },
    say: S.say(PLANNED, T_STK, N_NOTIFY)
  };

  const sample = LOTS[0].code;

  const retirada = {
    title: S.title,
    nav: S.nav,
    section: S.section,
    desc: S.desc,
    place: S.place,
    approver: S.approver,
    regPrefix: 'SR-2026-',
    agents: S.agents,
    targetText: S.targetText,
    todayEstimate: S.todayEstimate,
    timerRef: S.timerRef,
    packLabel: S.packLabel,
    setup: S.setup,
    modes: {
      lote: { label: S.m.rawLabel, noun: S.m.rawNoun, field: S.m.rawField, icon: 'layers', format: MP, where: 'SAP S/4HANA · LIMS' },
      premezcla: { label: S.m.premixLabel, noun: S.m.premixNoun, field: S.m.premixField, icon: 'barcode', format: sample, where: 'MES de planta · SAP S/4HANA' }
    },
    entries: [
      { mode: 'lote', code: MP, scope: 'sal', label: S.m.rawEntry(MP), option: S.m.rawOption },
      { mode: 'premezcla', code: sample, scope: 'sal', label: S.m.premixEntry(sample), option: S.m.premixOption(LOTS[0].name), headline: S.m.premixHeadline(sample, MP), startNode: 'P17', startResult: S.m.premixResult(sample, LOTS[0].name, MP) }
    ],
    examples: [{ mode: 'lote', code: MP, label: S.m.rawEntry(MP) }, { mode: 'premezcla', code: sample, label: S.m.premixEntry(sample) }],
    reference: S.reference,
    legend: S.legend,
    notice: S.noticeCfg,
    approval: S.approvalCfg,
    clock: S.clock,
    report: S.reportCfg,
    compare: S.compare,
    presenter: S.presenter(MP, sample),
    scopes: { sal: scope }
  };

  agenticPack('norel', { retirada });
})();
