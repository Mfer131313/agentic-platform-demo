/* Subtropicales Axarquía · simulacro de retirada RET-2026-1120 (mango Keitt MG-2611-KE-031 con un residuo de plaguicida por encima del límite máximo, LMR).
 * Hacia atrás: productor Agrícola La Vega 417 y recepción del 09/11/2026. Hacia delante: 3 lotes de manipulado (18 t), de los que 6 t siguen en
 * el Centro de manipulado de la Axarquía y 12 t se expidieron en 35 albaranes a 11 clientes de España, Francia y Alemania y en 640 pedidos de la tienda online.
 * Mismos clientes y referencias que el resto de escenas. Datos sintéticos de demostración (MFM). */
(function () {
  'use strict';

  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const S = {
    n0,
    lang: 'Español',
    cliOne: 'cliente', cliMany: 'clientes', albOne: 'expedición', albMany: 'expediciones', lotsWord: 'lotes', samplesWord: 'muestras',
    list: (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} y ${a[a.length - 1]}`),
    kinds: { sup: 'Cadena de supermercados', may: 'Mayorista', shop: 'Tienda online' },
    country: { es: 'España', fr: 'Francia', de: 'Alemania' },
    shopLabel: 'Tienda online · clientes finales',
    shopRef: '640 pedidos web',
    lotNames: ['Mango Keitt calibre 8, caja de 4 kg', 'Mango Keitt calibre 10, caja de 4 kg', 'Mango Keitt ready to eat, bandeja de 2 kg'],
    chip: { sold: 'Con cliente', alm: 'Retenido en almacén', mue: 'En el muelle' },
    madeOn: 'Fecha de manipulado',
    actions: {
      sold: 'Aviso al cliente y retirada del producto sin coste',
      soldEx: 'Aviso al cliente, retirada y documentación de exportación',
      soldShop: 'Aviso al consumidor y reembolso del pedido',
      alm: 'Bloquear el lote en SAP QM y mantenerlo en almacén',
      mue: 'Retener la carga y bloquear el lote en SAP QM'
    },
    andMore: (n) => ` y ${n} más`,
    subject: (n) => `[SIMULACRO] Retirada RET-2026-1120 · mango Keitt MG-2611-KE-031 · residuo de plaguicida por encima del LMR · ${n} ${n === 1 ? 'lote' : 'lotes'} de manipulado`,
    greeting: (c) => `Estimado equipo de ${c.label}:`,
    intro: 'Subtropicales Axarquía ha detectado en un análisis de laboratorio un residuo de plaguicida por encima del límite máximo (LMR) en un lote de recepción de mango Keitt que hemos manipulado y expedido a su empresa:',
    lCamp: (r, mp) => `Retirada: ${r} · lote de recepción ${mp}`,
    lLots: (l, n) => `Lote${n === 1 ? '' : 's'} de manipulado: ${l}`,
    lAlbs: (a, n) => `${n === 1 ? 'Albarán' : 'Albaranes'}: ${a}`,
    lQty: (t) => `Cantidad recibida: ${t}`,
    reason: 'Motivo: resultado del análisis de residuos por encima del LMR del Reglamento (CE) 396/2005 en el lote de recepción, pendiente de confirmar en las muestras de retención de los lotes de manipulado. Medida preventiva: no comercialice ni venda el producto, manténgalo identificado y separado y no lo ponga a disposición del consumidor. Si ya lo ha vendido, indíquenos las tiendas y las fechas afectadas.',
    ask: 'Le pedimos que responda a este aviso con las existencias que conserva, las cantidades ya vendidas y sus destinos. Coordinaremos la recogida del producto y su sustitución o abono sin coste para usted.',
    exportNote: 'Por tratarse de una entrega de exportación, nuestro Responsable de expediciones y exportación coordinará con usted la documentación necesaria y el aviso a la autoridad competente de su país (procedimiento PR-EXP-004).',
    clmNote: 'Su reclamación CLM-2026-1120 sobre la maduración del aguacate del lote AH-2611-092 sigue su curso en Atención al cliente y es independiente de este aviso.',
    planned: (P) => `Su expedición ${P.ship} (pedido ${P.order}), prevista hoy a las 16:00, queda retenida: incluye mango de los lotes afectados y le propondremos fruta de otros lotes.`,
    drill: 'Motivo del envío: simulacro de retirada (procedimiento PR-TRZ-003). En una retirada real, aquí se indican las instrucciones definitivas acordadas por Calidad y la autoridad.',
    sign: 'Atentamente,\nOperaciones y calidad · Subtropicales Axarquía\nCentro de manipulado de la Axarquía (Málaga)',
    from: 'Operaciones y calidad, Subtropicales Axarquía',
    to: (c) => `${c.label}`,
    shopSubject: '[SIMULACRO] Aviso importante sobre su pedido de mango · Retirada RET-2026-1120',
    shopGreeting: 'Estimado cliente:',
    shopIntro: 'Subtropicales Axarquía ha detectado en un análisis de laboratorio un residuo de plaguicida por encima del límite máximo (LMR) en un lote de mango Keitt que le hemos enviado desde nuestra tienda online:',
    shopOrders: (n) => `Su pedido: incluido entre los ${n} pedidos de la tienda online afectados`,
    shopReason: 'Motivo: resultado del análisis de residuos por encima del LMR en el lote de recepción del mango, pendiente de confirmar en las muestras de retención. Medida preventiva: no consuma el mango de su pedido y consérvelo en su embalaje.',
    shopAsk: 'No tiene que hacer nada más: le reembolsaremos el pedido completo y, si lo desea, le enviaremos fruta de otros lotes sin coste. Si tiene dudas, responda a este correo y Atención al cliente le atenderá.',
    autSubject: '[SIMULACRO] Notificación a la autoridad competente · RET-2026-1120 · residuo de plaguicida por encima del LMR en mango Keitt · Reglamento (CE) 178/2002, art. 19',
    autGreeting: 'A la autoridad competente en materia de seguridad alimentaria:',
    autIntro: 'Subtropicales Axarquía, S.A. comunica, conforme al artículo 19 del Reglamento (CE) 178/2002, que ha detectado un residuo de plaguicida por encima del límite máximo (LMR) del Reglamento (CE) 396/2005 en un lote de mango ya puesto en el mercado:',
    lAutQty: (a, b, c) => `Cantidad: ${a} t de mango manipuladas; ${b} t expedidas y ${c} t en el centro bajo control del operador`,
    lDist: (c, p, w) => `Distribución: ${c} clientes (cadenas de supermercados y mayoristas) en ${p} países y ${w} pedidos de la tienda online`,
    autReason: 'Origen: mango Keitt, lote de recepción MG-2611-KE-031 (18 t), productor Agrícola La Vega 417, recibido el 09/11/2026. Resultado del análisis de residuos por encima del LMR (informe LAB-2611-0871) comunicado por el laboratorio el 20/11/2026 a las 08:10. Se han tomado muestras de retención de los tres lotes de manipulado para su análisis.',
    autAsk: 'Medidas adoptadas: bloqueo de los lotes, retención de las expediciones pendientes, aviso a los clientes y a los consumidores de la tienda online y recogida del producto. Se remitirá información adicional en cuanto estén los resultados de las muestras de retención y se informará a las autoridades de Francia y Alemania por los cauces correspondientes.',
    autTo: 'Autoridad competente · seguridad alimentaria',
    custBody: (n, t, ped) => `${n} ${n === 1 ? 'albarán' : 'albaranes'} con ${t} de mango (pedido ${ped}).`,
    exNote: (k) => `Exportación a ${S.country[k]}: se coordina con Expediciones y exportación el aviso a la autoridad del país de destino (PR-EXP-004).`,
    levNote: 'Tiene abierta la reclamación CLM-2026-1120 (aguacate, lote AH-2611-092), independiente de esta retirada.',
    norNote: 'Cadena alemana con el cuestionario de proveedor CUE-2026-063 en curso (incluye los LMR): el aviso se coordina con Calidad y seguridad alimentaria.',
    plannedNote: (P) => `Expedición ${P.ship} (pedido ${P.order}), 1 t, hoy a las 16:00: retener.`,
    channelCust: 'Correo (Outlook) + llamada de Atención al cliente',
    channelShop: 'Tienda online (PrestaShop): correo a cada cliente + aviso en la web',
    shopBody: (n, t) => `${n} pedidos de la tienda online con ${t} de mango (cajas de 2 y 4 kg). Aviso individual a cada consumidor con el reembolso del pedido.`,
    shopAction: 'Aviso a los consumidores y reembolso de los pedidos',
    noticeLang: 'Aviso en español',
    custAction: (planned) => `Aviso y retirada del producto sin coste${planned ? ' y retención de la expedición de hoy' : ''}`,
    internal: 'Interno',
    autLabel: 'Autoridad competente · art. 19 del Reglamento (CE) 178/2002',
    channelAut: 'Notificación electrónica + correo del Responsable de calidad y seguridad alimentaria',
    autMeta: ['Reglamento (CE) 178/2002', 'Plazo ilustrativo: 4 h', 'Aviso en español'],
    autBody: 'Notificación inicial con el origen (MG-2611-KE-031), los 3 lotes de manipulado, las 18 t y la distribución en 3 países. Se amplía cuando llegue el resultado de las muestras de retención.',
    autRefs: 'Art. 19 · Reg. (CE) 178/2002',
    autAction: 'Notificación inicial a la autoridad',
    logLabel: 'Expediciones y exportación · expediciones',
    channelLog: 'Microsoft Teams #expediciones + orden en SAP S/4HANA',
    logMeta: ['Muelle del Centro de manipulado de la Axarquía', '1 expedición de hoy · 16:00'],
    logBody: 'Retener las cargas del muelle (1 t), anular la expedición EXP-26-11-0211 de hoy y localizar los transportes en ruta de los últimos 9 días con mango de los 3 lotes.',
    logAction: 'Retener expediciones y localizar entregas',
    labLabel: 'Laboratorio (LIMS) · muestras de retención',
    channelLab: 'LIMS + aviso en Microsoft Teams #laboratorio',
    labMeta: ['Jefe de laboratorio', 'Resultado en 24-48 h'],
    labBody: 'Analizar los residuos de plaguicidas en las muestras de retención de los 3 lotes de manipulado (LAB-2611-0872 a 0874) y repetir el ensayo del lote MG-2611-KE-031 (LAB-2611-0871).',
    labAction: 'Priorizar los 4 ensayos de residuos',
    solLabel: 'Atención al cliente y tienda online · seguimiento',
    channelSol: 'Llamada de Atención al cliente + correo de seguimiento + PrestaShop',
    solMeta: ['11 clientes y 640 pedidos web', 'Seguimiento diario'],
    solBody: 'Acompañar a cada cliente en la localización del producto y en la sustitución por fruta de otros lotes; gestionar los reembolsos de los pedidos de la tienda online (PR-ECO-002).',
    solAction: 'Llamada de seguimiento a cada cliente y reembolso en la tienda',
    nd: {
      prvK: 'Productor', prvSub: 'Mango Keitt · 18 t', prvMeta: 'Recibido el 09/11/2026',
      mpK: 'Lote de recepción', mpSub: 'Mango Keitt · 18 t', mpMeta: 'LAB-2611-0871 · 20/11 08:10', mpAlert: 'Residuo por encima del LMR',
      lotK: 'Manipulado', lotMeta: (t, d) => `${t} · manipulado el ${d}`,
      almK: 'Almacén', almSub: 'Producto terminado', almMeta: 'Centro de manipulado de la Axarquía', almAlert: 'Bloquear en SAP QM',
      mueK: 'Muelle', mueSub: (P) => `Carga pendiente · ${P.ship} hoy 16:00`, mueMeta: 'Centro de manipulado de la Axarquía', mueAlert: 'Retener expediciones',
      expK: 'Expedido', expSub: (a, c) => `${a} expediciones · ${c} clientes y tienda online`, expMeta: 'Del 11/11 al 19/11/2026',
      destK: 'País de destino', destSub: (c, a, sh) => `${c} ${c === 1 ? 'cliente' : 'clientes'}${sh ? ' y la tienda online' : ''} · ${a} expediciones`,
      autK: 'Autoridad', autT: 'Autoridad competente', autSub: 'Notificación art. 19'
    },
    pct100: '100,0 %',
    loc: {
      alm: 'Almacén de producto terminado', almSub: 'Centro de manipulado de la Axarquía · SAP S/4HANA', almAct: 'Bloquear los lotes en SAP QM',
      mue: 'Muelle de expediciones', mueSub: 'Centro de manipulado de la Axarquía · carga pendiente', mueSub2: (P, c) => `${P.ship} · ${c} · hoy a las 16:00`, mueAct: 'Retener la carga y anular la expedición de hoy',
      cust: (k) => `Con clientes · ${k}`, andShop: ' y la tienda online', custAct: 'Aviso y retirada del producto sin coste y reembolso de los pedidos web', custActEx: 'Aviso, retirada y documentación de exportación'
    },
    fl: {
      seg1: 'Producto', col1: 'Kilos',
      title1: (c) => `Retirada ${c} → clientes y almacén`,
      in1: 'Mango manipulado desde MG-2611-KE-031', in1Sub: (n) => `${n} lotes de manipulado · del 10/11 al 13/11/2026`,
      outsTitle: 'Destino actual',
      oAlm: 'Almacén de producto terminado', oAlmSub: 'Centro de manipulado de la Axarquía · sin expedir',
      oMue: 'Muelle de expediciones', oMueSub: (P) => `Carga pendiente · ${P.ship} hoy a las 16:00`,
      seg2: 'Expediciones', col2: 'Expediciones',
      title2: (c) => `Retirada ${c} → expediciones por cliente`,
      in2: 'Albaranes y pedidos de la tienda online', in2Sub: (n) => `${n} expediciones · del 11/11 al 19/11/2026`,
      outsTitle2: 'Expediciones por cliente',
      m1Sub: (c) => `${c.ped} · ${c.range}`
    },
    st: { mp: 'Lote de recepción', fab: 'Manipulado', est: 'Estado actual', dest: 'Destino', cli: 'Clientes' },
    headline: (c, t) => `Retirada ${c} · mango Keitt MG-2611-KE-031 · residuo de plaguicida por encima del LMR · ${t} t de mango`,
    previewSide: (t, n) => `${t} t · ${n} avisos`,
    genSub: (t, n) => `1 lote de recepción · 3 lotes · ${t} t · ${n} destinatarios`,
    step: [
      ['Localiza el punto de partida', (mp) => `Lote ${mp} · mango Keitt de Agrícola La Vega 417 · residuo de plaguicida por encima del LMR (LAB-2611-0871) a las 08:10 del 20/11/2026`],
      ['Hacia atrás: productor y recepción', (mp) => `Recepción del 09/11/2026 de Agrícola La Vega 417 · registro de campo y certificado GLOBALG.A.P. del productor archivados · ${mp} aún sin bloquear en SAP QM`],
      ['Hacia delante: lotes de manipulado', (n, t) => `${n} lotes de manipulado con el mango: MN-2611-0418, 0419 y 0423 · ${t} t manipuladas del 10/11 al 13/11`],
      ['Hacia delante: destino del mango', (a, b, c, d) => `${a} t manipuladas = ${b} t en el centro (almacén y muelle) + ${c} t expedidas en ${d} expediciones`],
      ['Muestras de retención en el laboratorio', (n) => `${n} muestras de retención de los lotes de manipulado en análisis de residuos (LAB-2611-0872 a 0874) · resultado en 24-48 h`],
      ['Expediciones previstas y cargas del muelle', (P, t) => `Expedición ${P.ship} de hoy a las 16:00 (1 t para Hipermercados Ibérica Fresca) a retener · 1 t en el muelle de ${t} t en el centro`],
      ['Albaranes, pedidos y clientes', (a, c, p, w, b) => `${a} expediciones: ${b} albaranes a ${c} clientes de ${p} países y ${w} pedidos de la tienda online · del 11/11 al 19/11/2026 · 6 clientes de exportación (Francia y Alemania)`],
      ['Contactos de clientes y pedidos de la tienda', (n) => `${n} destinatarios verificados (11 clientes, la tienda online con sus 640 pedidos y la autoridad competente) · reclamación abierta CLM-2026-1120 de Supermercados Levante Fresh, independiente`],
      ['Estado de cada lote desde SAP S/4HANA', (a, b, c) => `${a} t manipuladas: ${b} t en el centro y ${c} t expedidas`],
      ['Cuadre de la retirada: manipulado frente a destino', (t) => `Conciliado 100,0 % · 0 kg sin justificar · ${t} de ${t} t localizadas`],
      ['Abre el registro de retirada con un aviso por destinatario', (r, n) => `Retirada ${r} en borrador · bloqueo de ${n} lotes de manipulado y del lote de recepción en SAP QM propuesto`],
      ['Prepara los avisos sin enviar', (n) => `${n} avisos pendientes de aprobación (correo y tienda online) · notificación a la autoridad competente (art. 19) en borrador`]
    ],
    mk: ['Punto de partida localizado', 'Traza hacia atrás completa', 'Estado del laboratorio consultado', 'Expediciones y clientes identificados', 'Contactos identificados', 'Cuadre de la retirada cerrado', 'Registro y avisos preparados'],
    loc2: {
      label: 'Producto localizado',
      sub: (o, s, a) => `${o} t en ${a} expediciones · ${s} t en el centro`,
      short: (t, o, c, p, a, alm, mue) => `${t} de ${t} t localizadas (${o} t expedidas en ${a} expediciones a ${c} clientes de ${p} países y a la tienda online, ${alm} en almacén y ${mue} en el muelle)`
    },
    kpiNotifyLabel: 'Destinatarios a avisar',
    kpiNotifySub: () => '1 expedición de hoy a retener · 16:00',
    bal: {
      title: 'Balance de masas', kpiLabel: 'Balance de masas conciliado',
      sub: 'Mango manipulado desde el lote de recepción hasta su destino y expediciones por cliente · SAP S/4HANA, WMS, Trazabilidad de campo y LIMS',
      head: 'Retirada RET-2026-1120', headSide: (n) => `${n} clientes y tienda online · 3 lotes`,
      labels: { in: 'Manipulado', losses: 'Mermas justificadas', out: 'Expedido a clientes', stock: 'En el centro' },
      detailTitle: 'Detalle por flujo',
      criterio: 'Criterio: la diferencia sin justificar se muestra tal cual, no se reparte. Cada lote se cuenta por su número en SAP y el WMS; cada expedición, por su albarán o pedido; cada ensayo, por su código en el LIMS.',
      reportText: 'Lotes y existencias declarados en SAP S/4HANA y el WMS; origen en Trazabilidad de campo; ensayos de residuos en el LIMS; pedidos web en la tienda online (PrestaShop).'
    },
    prod: { title: 'Expediciones con mango de los lotes afectados', side: (n, a) => `${n} clientes y tienda online · ${a} expediciones`, c1: 'Pedido', c2: 'Cliente', c3: 'Fechas', c4: 'Expediciones', c5: 'Cantidad', c6: 'Localizado' },
    un: {
      title: 'Expediciones y existencias', sub: (a, p) => `${a} expediciones y ${p} posiciones del centro · SAP S/4HANA y WMS`,
      csv: 'Expediciones y existencias de la retirada (CSV)', alb: 'Expedición', lot: 'Lote de manipulado', product: 'Producto', where: 'Cliente o ubicación', detail: 'Detalle', date: 'Fecha', order: 'Pedido o referencia', qty: 'Cantidad (kg)', state: 'Estado', action: 'Acción en una retirada real',
      byLoc: 'Por destino', refLabel: 'Retirada', nLabel: 'Documentos', qtyLabel: 'Cantidad (kg)', listLabel: 'Expediciones y existencias'
    },
    cu: {
      title: 'Destinatarios a avisar', sub: (n, t) => `${n} destinatarios con ${t} t expedidas · 1 expedición de hoy a retener`,
      holdsTitle: 'Acciones en el centro',
      h1: (P) => `Retener la expedición ${P.ship} (hoy a las 16:00)`, h1Meta: (P, c) => ['1 t de mango', P.order, c],
      h1Body: (P) => `En una retirada real, Expediciones no carga la expedición del muelle reservada en ${P.order} y se propone al cliente fruta de otros lotes.`,
      h2: (t) => `Bloquear en SAP QM las ${t} t que siguen en el centro`, h2Meta: ['hoy', '3 lotes de manipulado', 'SAP S/4HANA'],
      h2Body: 'Siguen disponibles para expedir: en una retirada real se bloquean los 3 lotes de manipulado y el lote de recepción MG-2611-KE-031 hasta conocer el resultado. Listado por lote en la pestaña «Expediciones y existencias» y en el CSV.',
      h3: 'Priorizar el laboratorio', h3Meta: (n) => [`${n} muestras de retención`, '24-48 h', 'LIMS'],
      h3Body: 'En una retirada real se priorizan los ensayos de residuos de las muestras de retención y se repite el del lote de recepción, para ampliar o cerrar la notificación a la autoridad.'
    },
    ap: {
      title: 'Retirada y avisos del simulacro',
      s1: 'Destinatarios con mango de los lotes afectados', s1v: (n, t) => `${n} destinatarios · ${t} t expedidas`,
      s2: 'Expedición de hoy a retener', s2v: (P) => `${P.ship} · hoy a las 16:00 · 1 t`,
      s3: 'Bloqueo que se aplicaría', s3v: (t) => `${t} t en almacén y muelle`, s3c: 'Sin bloqueo en simulacro',
      s4: 'Laboratorio', s4v: (n) => `Priorizar las ${n} muestras de retención (ensayos en el LIMS)`,
      effects: (n) => [
        `Outlook y tienda online: ${n} avisos guardados como borrador con la marca SIMULACRO; no se envía nada`,
        'SAP S/4HANA: registro de la retirada y bloqueo de lotes en SAP QM en borrador, sin aplicar',
        'WMS: sin cambios; en un simulacro no se bloquea ningún lote ni se retiene ninguna expedición',
        'Registro {code} aprobado con los tiempos de cada actividad'
      ]
    },
    rp: {
      objeto: 'Simulacro de retirada con punto de partida en {label}. Se comprueba la trazabilidad hacia atrás (productor, recepción y análisis) y hacia delante (lotes de manipulado, almacén, expediciones, clientes y tienda online), con el balance de masas del mango manipulado.',
      noAction: 'El ejercicio no bloquea lotes, no retiene expediciones y no envía avisos.',
      results: (n, t) => [
        `${n} destinatarios (11 clientes de España, Francia y Alemania, la tienda online con 640 pedidos y la autoridad competente) y 1 expedición de hoy que se retendría.`,
        'Los ensayos de retención de los 3 lotes (LAB-2611-0872 a 0874) deciden si la notificación a la autoridad se amplía o se cierra.',
        `Se bloquearían ${t} t en almacén y muelle del centro.`
      ],
      bc1: 'Etapa', bc2: 'Referencia', bc3: 'Fecha', bc4: 'Detalle',
      backRows: (lots, t) => [
        { etapa: 'Productor', ref: 'Agrícola La Vega 417', fecha: '09/11/2026', det: 'Recepción de mango Keitt · lote MG-2611-KE-031 (18 t) · registro de campo y certificado archivados' },
        { etapa: 'Análisis', ref: 'LAB-2611-0871', fecha: '20/11/2026 08:10', det: 'Residuo de plaguicida por encima del LMR en una muestra del lote MG-2611-KE-031 · LIMS' }
      ].concat(lots.map((l) => ({ etapa: 'Manipulado', ref: l.code, fecha: l.date, det: `${l.t} de ${l.name} con el mango del lote de recepción` })), [
        { etapa: 'Retención', ref: 'LAB-2611-0872/0874', fecha: '20/11/2026', det: '3 muestras de retención en análisis de residuos · resultado en 24-48 h' },
        { etapa: 'Retirada', ref: 'RET-2026-1120', fecha: '20/11/2026', det: `${t} t localizadas · objetivo ilustrativo: informar a autoridades y clientes en 4 h` }
      ]),
      fwdExtra: (P, c, n, alm, mue) => [
        { ped: P.order, cliente: `${c} (expedición de hoy, 1 t en el muelle)`, date: '20/11/2026', n: 1, qty: '1 t' },
        { ped: 'MUELLE', cliente: 'Muelle de expediciones (carga pendiente)', date: '—', n, qty: mue },
        { ped: 'ALMACÉN', cliente: 'Almacén de producto terminado (sin expedir)', date: '—', n, qty: alm }
      ],
      conclusion: 'Conclusión: la información necesaria para una retirada se obtiene completa y las 18 t cuadran lote a lote y expedición a expedición. Acciones de mejora propuestas: enlazar en SAP cada lote de recepción con los lotes de manipulado al crearlos y lanzar el aviso a la autoridad y a la tienda online desde el propio registro de la retirada.',
      note: 'Simulacro: no se ha bloqueado ningún lote, no se ha retenido ninguna expedición y no se ha enviado ningún aviso. Datos sintéticos de demostración.'
    },
    audit: { back: (mp, n) => `lote de recepción ${mp} · productor Agrícola La Vega 417 · ${n} lotes de manipulado`, fwd: (t, a, c, p) => `${t} t · ${a} expediciones · ${c} clientes en ${p} países y tienda online` },
    say: (P, t, n) => [
      `Lo accionable: ${P.ship} (hoy a las 16:00) se retendría y se bloquearían en SAP QM las ${t} t que siguen en el centro.`,
      `Los avisos van a ${n} destinatarios con sus pedidos, lotes y expediciones; la autoridad competente recibe la notificación inicial del artículo 19 y los 640 pedidos de la tienda online reciben su aviso. En un simulacro no se envía nada. Decide el Responsable de operaciones y calidad.`
    ],
    title: 'Simulacro de retirada', nav: 'Retiradas y simulacros', section: 'Calidad',
    desc: 'Ejercicio de trazabilidad para retiradas de producto: genealogía hacia atrás y hacia delante, del lote de recepción al lote de manipulado, a la expedición y al cliente o al pedido de la tienda online, balance de masas y destinatarios a avisar, a partir de un lote de recepción o de manipulado.',
    place: 'Centro de manipulado de la Axarquía (Málaga)',
    approver: 'Responsable de operaciones y calidad',
    agents: { trace: 'Trazabilidad', bal: 'Balance de masas', rec: 'Retirada y avisos' },
    targetText: 'Objetivo ilustrativo: 4 h', todayEstimate: '3-6 h', timerRef: 'Objetivo demo: 4 h', packLabel: 'Descargar paquete de la retirada',
    setup: { title: 'Punto de partida', sub: 'Un lote de recepción o un lote de manipulado' },
    m: {
      rawLabel: 'Lote de recepción', rawNoun: 'el lote de recepción', rawField: 'Lote de recepción', rawEntry: (c) => `Lote ${c}`, rawOption: 'Mango Keitt · residuo por encima del LMR (LAB-2611-0871) · 3 lotes de manipulado',
      packLabel: 'Manipulado', packNoun: 'el lote de manipulado', packField: 'Lote de manipulado', packEntry: (c) => `Lote ${c}`,
      packOption: (n) => `${n} · manipulado con MG-2611-KE-031`,
      packHeadline: (c, mp) => `Lote ${c} · manipulado con ${mp} → se traza la retirada completa`,
      packResult: (c, n, mp) => `Lote ${c} · ${n} · manipulado con el lote de recepción ${mp} (residuo por encima del LMR) → se traza la retirada RET-2026-1120 completa`
    },
    reference: {
      title: 'Referencia de auditoría',
      sub: 'Objetivo del ejercicio; Calidad confirma los requisitos de la autoridad y de los clientes',
      items: [
        ['Reglamento (CE) 178/2002, art. 19', 'Obligación del operador de retirar el alimento no conforme y de informar a la autoridad competente y a los clientes. Objetivo ilustrativo del ejercicio: informar a autoridades y clientes en 4 horas.'],
        ['Reglamento (CE) 396/2005', 'Límites máximos de residuos (LMR) de plaguicidas en alimentos de origen vegetal: un lote por encima del LMR no puede comercializarse.'],
        ['PR-TRZ-003', 'Procedimiento interno de trazabilidad y retirada de lotes: Operaciones y calidad decide el alcance y aprueba los avisos.']
      ],
      note: 'Un simulacro no bloquea lotes, no retiene expediciones ni envía avisos: se mide si la información se obtiene completa, cuadra y a tiempo.'
    },
    legend: { planned: 'Expedición de hoy: retener', click: 'Cada tarjeta resume una fase de la retirada' },
    noticeCfg: { title: 'Simulacro de retirada' },
    approvalCfg: { policy: 'PR-TRZ-003 · bloquear lotes o retener expediciones requiere la aprobación del Responsable de operaciones y calidad', approveLabel: 'Aprobar y cerrar simulacro', rejectPlaceholder: 'Por ejemplo: falta confirmar el contacto de un cliente de exportación' },
    clock: { title: 'Cronómetro frente a objetivo', sub: 'Tiempos de la simulación; no son medidas de rendimiento de los sistemas' },
    reportCfg: { subtitle: 'Registro del ejercicio de trazabilidad y retirada · Reglamento (CE) 178/2002, art. 19 · PR-TRZ-003' },
    compare: {
      rows: [
        { k: 'Personas implicadas', today: '4-5: Calidad, Recepción, Expediciones, Atención al cliente y la tienda online', agentic: '1: {approver} revisa y aprueba' },
        { k: 'Sistemas consultados', today: '5-6 abiertos a mano: SAP, WMS, LIMS, Trazabilidad de campo, la tienda online y hojas de cálculo', agentic: '5 conectores consultados por los agentes: SAP S/4HANA, Trazabilidad de campo, LIMS, WMS y la tienda online (PrestaShop), más Outlook para los avisos' },
        { k: 'Pasos', today: '20-30 consultas, cruces de lotes con expediciones y existencias y cálculos manuales', agentic: '{steps} pasos automáticos y 1 aprobación' },
        { k: 'Balance de masas', today: 'Hoja de cálculo con manipulado, expedido y existencias', agentic: 'Calculado por lote y expedición: {reconciled} conciliado' }
      ]
    },
    presenter: (mp, v) => ({
      idle: [
        'Simulacro de retirada con trazabilidad y balance de masas; en el piloto Calidad confirma el protocolo y medimos el tiempo real.',
        `Se elige el punto de partida: el lote de recepción ${mp} (mango Keitt con un residuo de plaguicida por encima del LMR) o un lote de manipulado afectado.`,
        'Agentic Platform recorre el LIMS, SAP, el WMS y Trazabilidad de campo hacia atrás hasta el productor y la recepción, y hacia delante hasta los lotes de manipulado, las expediciones, cada cliente y los 640 pedidos de la tienda online, y cuadra las 18 t lote a lote.'
      ],
      nextIdle: `Pulsar «Iniciar simulacro» con el lote ${mp} (o elegir el lote de manipulado ${v}).`,
      nextRun: 'Pulsar «Ver aviso» de Supermercados Levante Fresh y después «Aprobar y cerrar simulacro».',
      nextDone: '«Descargar paquete de la retirada»: CSV de expediciones y registro imprimible. Después, «Cuestionario de cliente» (flecha derecha).'
    })
  };

  const RET = 'RET-2026-1120';
  const MP = 'MG-2611-KE-031';
  const PLANNED = { cust: 'ibf', order: 'PED-2026-44911', ship: 'EXP-26-11-0211', kg: 1000 };

  /* Lotes de manipulado con el mango: [id, código, fecha de manipulado, kg, kg en almacén, kg en el muelle] */
  const LOTS = [
    ['M18', 'MN-2611-0418', '2026-11-10', 8000, 2500, 500],
    ['M19', 'MN-2611-0419', '2026-11-11', 6000, 1700, 300],
    ['M23', 'MN-2611-0423', '2026-11-13', 4000, 800, 200]
  ].map(([id, code, date, kg, alm, mue], i) => ({ id, code, date, kg, alm, mue, shipped: kg - alm - mue, name: S.lotNames[i] }));

  /* Clientes: [id, cliente, tipo, localidad, país, toneladas por lote de manipulado (0418, 0419, 0423), expediciones, pedido] */
  const CUSTOMERS = [
    ['lev', 'Supermercados Levante Fresh, S.A.', 'sup', 'Valencia', 'es', [0.8, 0.6, 0.4], 4, 'PED-2026-44902'],
    ['ibf', 'Hipermercados Ibérica Fresca, S.A.', 'sup', 'Madrid', 'es', [0.7, 0.5, 0.3], 4, 'PED-2026-44911'],
    ['mca', 'Mercamálaga Frutas, S.L.', 'may', 'Málaga', 'es', [0.5, 0.4, 0.3], 3, 'PED-2026-44917'],
    ['gal', 'Distribuidora Frutera Galaica, S.Coop.', 'may', 'Vigo', 'es', [0.4, 0.3, 0.2], 3, 'PED-2026-44923'],
    ['tar', 'Frutas Tarraco Mayoristas, S.L.', 'may', 'Tarragona', 'es', [0.3, 0.2, 0.1], 3, 'PED-2026-44928'],
    ['mar', 'Grands Marchés du Sud, S.A.S.', 'sup', 'Lyon', 'fr', [0.4, 0.3, 0.2], 3, 'PED-2026-44931'],
    ['prm', 'Primeurs de Provence, S.A.R.L.', 'may', 'Marsella', 'fr', [0.3, 0.2, 0.2], 3, 'PED-2026-44936'],
    ['fre', 'Fruits Express Rungis, S.A.S.', 'may', 'Rungis', 'fr', [0.3, 0.2, 0.1], 3, 'PED-2026-44940'],
    ['nor', 'Handelsgruppe Nordfrisch GmbH', 'sup', 'Hamburgo', 'de', [0.3, 0.3, 0.2], 3, 'PED-2026-44944'],
    ['obs', 'Obst-Großmarkt Rhein-Main GmbH', 'may', 'Fráncfort', 'de', [0.2, 0.2, 0.2], 3, 'PED-2026-44949'],
    ['sdf', 'Südfrucht Import Bayern GmbH', 'may', 'Múnich', 'de', [0.1, 0.1, 0.2], 3, 'PED-2026-44953'],
    ['tie', S.shopLabel, 'shop', 'Málaga', 'es', [0.7, 0.7, 0.6], 640, S.shopRef]
  ].map(([id, label, kind, city, country, cells, albs, ped]) => ({ id, label, kind, city, country, cells, albs, ped, kg: Math.round(cells.reduce((s, t) => s + t, 0) * 1000) }));
  const CUST = {};
  CUSTOMERS.forEach((c) => { CUST[c.id] = c; });
  const SHOP = CUST.tie;
  const CLIENTS = CUSTOMERS.filter((c) => c.kind !== 'shop');
  const COUNTRIES = ['es', 'fr', 'de'];

  const N_ALB = CUSTOMERS.reduce((s, c) => s + c.albs, 0);
  const N_ALB_B2B = CLIENTS.reduce((s, c) => s + c.albs, 0);
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

  const fmtD = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '');
  const dm = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}` : '');
  const plural = (n, a, b) => `${n0(n)} ${n === 1 ? a : b}`;
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const pad = (n, w) => String(n).padStart(w, '0');
  const tons = (kg) => `${n0(kg / 1000)} t`;
  const kindOf = (c) => S.kinds[c.kind];
  const countryOf = (c) => S.country[c.country];
  const cityOf = (c) => (S.cityNames && S.cityNames[c.city]) || c.city;
  const alb = (n) => plural(n, S.albOne, S.albMany);

  /* ---------------------------------------------------------------- Expediciones */

  const RAW = [];
  CUSTOMERS.forEach((c, ci) => {
    const total = sum(c.cells, (t) => t);
    const exact = c.cells.map((t) => (c.albs * t) / total);
    const cnt = exact.map((x, i) => (c.cells[i] > 0 ? Math.max(1, Math.floor(x)) : 0));
    let rest = c.albs - sum(cnt, (x) => x);
    const order = exact.map((x, i) => [x - Math.floor(x), i]).filter((o) => c.cells[o[1]] > 0).sort((a, b) => b[0] - a[0]);
    for (let k = 0; rest > 0; k = (k + 1) % order.length) { cnt[order[k][1]] += 1; rest -= 1; }
    c.cells.forEach((t, li) => {
      const n = cnt[li];
      if (!n) return;
      const kg = Math.round(t * 1000);
      const per = kg / n;
      const step = per >= 100 ? 10 : 1;
      const base = Math.floor(per / step) * step;
      const rem = kg - base * n;
      const day0 = Number(LOTS[li].date.slice(8, 10));
      const span = 19 - day0;
      for (let j = 0; j < n; j += 1) {
        const day = day0 + 1 + ((j + ci) % span);
        const q = c.kind === 'shop' ? base + (j < rem ? 1 : 0) : (j === 0 ? kg - base * (n - 1) : base);
        RAW.push({ cust: c.id, ci, li, kg: q, date: `2026-11-${pad(day, 2)}` });
      }
    });
  });
  RAW.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : a.ci - b.ci || a.li - b.li));
  RAW.forEach((r, i) => { r.id = `${r.cust === 'tie' ? 'PW-2611' : 'ALB-26-11'}-${pad(1200 + i, 4)}`; });
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
    return { alb: r.id, lot: l.code, lotSub: l.name, where: c.label, whereSub: `${cityOf(c)} · ${countryOf(c)}`, fecha: fmtD(r.date), fechaSub: c.ped, qty: r.kg, estado: CHIPS.sold, accion: c.kind === 'shop' ? S.actions.soldShop : c.country !== 'es' ? S.actions.soldEx : S.actions.sold };
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
    if (c.country !== 'es') parts.push(S.exportNote);
    if (c.id === 'lev') parts.push(S.clmNote);
    if (planned) parts.push(S.planned(PLANNED));
    parts.push(S.drill);
    parts.push(S.sign);
    return { lang: S.lang, headers: { From: S.from, To: S.to(c), Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [RET, lots[0]].concat(planned ? [PLANNED.ship] : []) };
  }
  function noticeShop(c) {
    const subj = S.shopSubject;
    const lots = LOTS.map((l) => l.code);
    const parts = [S.shopGreeting, S.shopIntro, [S.lCamp(RET, MP), S.lLots(lots.join(', '), lots.length), S.shopOrders(c.albs), S.lQty(tons(c.kg))].join('\n'), S.shopReason, S.shopAsk, S.drill, S.sign];
    return { lang: S.lang, headers: { From: S.from, To: S.to(c), Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [RET, lots[0]] };
  }
  function noticeAut() {
    const subj = S.autSubject;
    const parts = [S.autGreeting, S.autIntro, [S.lCamp(RET, MP), S.lLots(LOTS.map((l) => l.code).join(', '), N_LOTS), S.lAutQty(T_IN, T_OUT, T_STK), S.lDist(CLIENTS.length, N_COUNTRIES, SHOP.albs)].join('\n'), S.autReason, S.autAsk, S.drill, S.sign];
    return { lang: S.lang, headers: { From: S.from, To: S.autTo, Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [RET, LOTS[0].code] };
  }

  const items = CUSTOMERS.map((c) => {
    if (c.kind === 'shop') {
      return { id: c.id, label: c.label, icon: 'box', notify: true, channel: S.channelShop, meta: [`${cityOf(c)} · ${countryOf(c)}`, kindOf(c), S.noticeLang], body: S.shopBody(c.albs, tons(c.kg)), notice: noticeShop(c), refs: c.ped, qtyText: tons(c.kg), action: S.shopAction };
    }
    const body = [S.custBody(c.albs, tons(c.kg), c.ped)];
    if (c.country !== 'es') body.push(S.exNote(c.country));
    if (c.id === 'lev') body.push(S.levNote);
    if (c.id === 'nor') body.push(S.norNote);
    if (c.id === PLANNED.cust) body.push(S.plannedNote(PLANNED));
    return { id: c.id, label: c.label, icon: 'building', notify: true, channel: S.channelCust, meta: [`${cityOf(c)} · ${countryOf(c)}`, kindOf(c), S.noticeLang], body: body.join(' '), notice: noticeOf(c), refs: c.ped + (c.id === PLANNED.cust ? ` · ${PLANNED.order}` : ''), qtyText: tons(c.kg), action: S.custAction(c.id === PLANNED.cust) };
  });
  items.push({ id: 'aut', label: S.autLabel, icon: 'shield-check', notify: true, channel: S.channelAut, meta: S.autMeta, body: S.autBody, notice: noticeAut(), refs: S.autRefs, qtyText: tons(KG_IN), action: S.autAction });
  items.push({ id: 'logistica', label: S.logLabel, icon: 'truck', notify: false, chip: S.internal, channel: S.channelLog, meta: S.logMeta, body: S.logBody, refs: `${N_LOTS} ${S.lotsWord}`, qtyText: tons(KG_MUE), action: S.logAction });
  items.push({ id: 'laboratorio', label: S.labLabel, icon: 'flask', notify: false, chip: S.internal, channel: S.channelLab, meta: S.labMeta, body: S.labBody, refs: 'LIMS', qtyText: `${N_LOTS} ${S.samplesWord}`, action: S.labAction });
  items.push({ id: 'solutions', label: S.solLabel, icon: 'users', notify: false, chip: S.internal, channel: S.channelSol, meta: S.solMeta, body: S.solBody, refs: RET, qtyText: plural(CLIENTS.length, S.cliOne, S.cliMany), action: S.solAction });

  /* ---------------------------------------------------------------- Genealogía */

  const nodes = [
    { id: 'PRV', stage: 'mp', kicker: S.nd.prvK, title: 'Agrícola La Vega 417', sub: S.nd.prvSub, meta: S.nd.prvMeta, reveal: 1 },
    { id: 'MP', stage: 'mp', kicker: S.nd.mpK, title: MP, mono: true, sub: S.nd.mpSub, meta: S.nd.mpMeta, alert: S.nd.mpAlert, alertTone: true, reveal: 1 }
  ];
  LOTS.forEach((l) => nodes.push({ id: l.id, stage: 'fab', kicker: S.nd.lotK, title: l.code, mono: true, sub: l.name, meta: S.nd.lotMeta(tons(l.kg), dm(l.date)), tone: 'stock', reveal: 2 }));
  nodes.push(
    { id: 'ALM', stage: 'est', kicker: S.nd.almK, title: tons(KG_ALM), sub: S.nd.almSub, meta: S.nd.almMeta, alert: S.nd.almAlert, alertTone: true, tone: 'stock', reveal: 3 },
    { id: 'MUE', stage: 'est', kicker: S.nd.mueK, title: tons(KG_MUE), sub: S.nd.mueSub(PLANNED), meta: S.nd.mueMeta, alert: S.nd.mueAlert, alertTone: true, tone: 'planned', reveal: 3 },
    { id: 'EXP', stage: 'est', kicker: S.nd.expK, title: tons(KG_OUT), sub: S.nd.expSub(N_ALB, CLIENTS.length), meta: S.nd.expMeta, tone: 'shipped', reveal: 3 }
  );
  COUNTRIES.forEach((k) => {
    const cs = CUSTOMERS.filter((c) => c.country === k);
    nodes.push({ id: `D:${k}`, stage: 'dest', kicker: S.nd.destK, title: S.country[k], sub: S.nd.destSub(cs.filter((c) => c.kind !== 'shop').length, sum(cs, (c) => c.albs), cs.some((c) => c.kind === 'shop')), meta: tons(sum(cs, (c) => c.kg)), tone: 'customer', reveal: 4 });
  });
  CUSTOMERS.forEach((c) => nodes.push({ id: `C:${c.id}`, stage: 'cli', kicker: kindOf(c), title: c.label.replace(/,? (S\.A\.S\.|S\.A\.R\.L\.|S\.Coop\.|S\.A\.|S\.L\.|GmbH)$/, ''), sub: `${cityOf(c)} · ${tons(c.kg)}`, tone: 'customer', reveal: 5 }));
  nodes.push({ id: 'C:aut', stage: 'cli', kicker: S.nd.autK, title: S.nd.autT, sub: S.nd.autSub, tone: 'planned', reveal: 5 });
  const edges = [['PRV', 'MP']];
  LOTS.forEach((l) => { edges.push(['MP', l.id], [l.id, 'ALM'], [l.id, 'MUE'], [l.id, 'EXP']); });
  COUNTRIES.forEach((k) => { edges.push(['EXP', `D:${k}`]); });
  CUSTOMERS.forEach((c) => edges.push([`D:${c.country}`, `C:${c.id}`]));
  edges.push(['MUE', `C:${PLANNED.cust}`], ['EXP', 'C:aut']);

  /* ---------------------------------------------------------------- Tablas */

  const saleRows = CUSTOMERS.map((c) => ({ ped: c.ped, cliente: c.label, sub: `${kindOf(c)} · ${cityOf(c)} · ${countryOf(c)}`, date: c.range, n: c.albs, qty: tons(c.kg), located: S.pct100 }));
  const locRows = [
    { ref: RET, where: S.loc.mue, whereSub: S.loc.mueSub2(PLANNED, CUST[PLANNED.cust].label), n: N_LOTS, qty: KG_MUE, action: S.loc.mueAct, tone: 'crit' },
    { ref: RET, where: S.loc.alm, whereSub: S.loc.almSub, n: N_LOTS, qty: KG_ALM, action: S.loc.almAct, tone: 'crit' }
  ].concat(COUNTRIES.map((k) => {
    const cs = CUSTOMERS.filter((c) => c.country === k);
    const cl = cs.filter((c) => c.kind !== 'shop');
    const hasShop = cs.some((c) => c.kind === 'shop');
    return { ref: RET, where: S.loc.cust(S.country[k]), whereSub: `${plural(cl.length, S.cliOne, S.cliMany)}${hasShop ? S.loc.andShop : ''} · ${S.list(cl.map((c) => cityOf(c)))}`, n: sum(cs, (c) => c.albs), qty: sum(cs, (c) => c.kg), action: k !== 'es' ? S.loc.custActEx : S.loc.custAct, tone: 'warn' };
  }));

  const outsSold = CUSTOMERS.map((c) => ({ label: c.label, sub: `${c.ped} · ${c.range} · ${cityOf(c)}`, stage: 'SAP', qty: c.kg }));
  const flowKg = {
    key: 'kg', seg: S.fl.seg1, main: true, unit: 'kg', colLabel: S.fl.col1,
    title: S.fl.title1(RET),
    inLabel: S.fl.in1, inSub: S.fl.in1Sub(N_LOTS), inStage: 'SAP', inQty: KG_IN,
    phases: [],
    outsTitle: S.fl.outsTitle,
    outs: outsSold.concat([
      { label: S.fl.oAlm, sub: S.fl.oAlmSub, stage: 'WMS', qty: KG_ALM, kind: 'stock' },
      { label: S.fl.oMue, sub: S.fl.oMueSub(PLANNED), stage: 'WMS', qty: KG_MUE, kind: 'stock' }
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

  const SYSTEMS = ['SAP S/4HANA', 'LIMS', 'WMS', 'Trazabilidad de campo', 'Tienda online (PrestaShop)'];

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
      { agent: 'trace', system: 'Trazabilidad de campo', action: S.step[1][0], result: S.step[1][1](MP), ms: 430, reveal: 1 },
      { agent: 'trace', system: 'WMS', action: S.step[2][0], result: S.step[2][1](N_LOTS, T_IN), ms: 520, reveal: 2, mark: S.mk[1] },
      { agent: 'trace', system: 'SAP S/4HANA', action: S.step[3][0], result: S.step[3][1](T_IN, T_STK, T_OUT, N_ALB), ms: 560, reveal: 3 },
      { agent: 'trace', system: 'LIMS', action: S.step[4][0], result: S.step[4][1](N_LOTS), ms: 470, reveal: 4, mark: S.mk[2] },
      { agent: 'trace', system: 'WMS', action: S.step[5][0], result: S.step[5][1](PLANNED, T_STK), ms: 380, tone: 'warn', reveal: 4 },
      { agent: 'trace', system: 'SAP S/4HANA', action: S.step[6][0], result: S.step[6][1](N_ALB, CLIENTS.length, N_COUNTRIES, SHOP.albs, N_ALB_B2B), ms: 590, reveal: 5, mark: S.mk[3] },
      { agent: 'trace', system: 'Tienda online (PrestaShop)', action: S.step[7][0], result: S.step[7][1](N_NOTIFY), ms: 480, tone: 'warn', reveal: 5, mark: S.mk[4] },
      { agent: 'bal', system: 'SAP S/4HANA', action: S.step[8][0], result: S.step[8][1](T_IN, T_STK, T_OUT), ms: 420 },
      { agent: 'bal', system: 'Agentic Platform', action: S.step[9][0], result: S.step[9][1](T_IN), ms: 95, tone: 'ok', mark: S.mk[5] },
      { agent: 'rec', system: 'SAP S/4HANA', action: S.step[10][0], result: S.step[10][1](RET, N_LOTS), ms: 360 },
      { agent: 'rec', system: 'Outlook', action: S.step[11][0], result: S.step[11][1](N_NOTIFY), ms: 720, mark: S.mk[6] }
    ],
    located: { label: S.loc2.label, value: `${n0(T_IN)} / ${n0(T_IN)} t`, sub: S.loc2.sub(T_OUT, T_STK, N_ALB), icon: 'truck', short: S.loc2.short(T_IN, T_OUT, CLIENTS.length, N_COUNTRIES, N_ALB, tons(KG_ALM), tons(KG_MUE)) },
    kpiNotify: { label: S.kpiNotifyLabel, value: N_NOTIFY, sub: S.kpiNotifySub(PLANNED) },
    balance: {
      title: S.bal.title,
      kpiLabel: S.bal.kpiLabel,
      sub: S.bal.sub,
      head: S.bal.head,
      headSide: S.bal.headSide(CLIENTS.length),
      labels: S.bal.labels,
      detailTitle: S.bal.detailTitle,
      criterio: S.bal.criterio,
      reportText: S.bal.reportText,
      flows: [flowKg, flowAlb],
      product: {
        title: S.prod.title,
        side: S.prod.side(CLIENTS.length, N_ALB),
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
      csvName: 'expediciones',
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
    audit: { back: S.audit.back(MP, N_LOTS), fwd: S.audit.fwd(T_IN, N_ALB, CLIENTS.length, N_COUNTRIES) },
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
      manipulado: { label: S.m.packLabel, noun: S.m.packNoun, field: S.m.packField, icon: 'barcode', format: sample, where: 'WMS · SAP S/4HANA' }
    },
    entries: [
      { mode: 'lote', code: MP, scope: 'sal', label: S.m.rawEntry(MP), option: S.m.rawOption },
      { mode: 'manipulado', code: sample, scope: 'sal', label: S.m.packEntry(sample), option: S.m.packOption(LOTS[0].name), headline: S.m.packHeadline(sample, MP), startNode: 'M18', startResult: S.m.packResult(sample, LOTS[0].name, MP) }
    ],
    examples: [{ mode: 'lote', code: MP, label: S.m.rawEntry(MP) }, { mode: 'manipulado', code: sample, label: S.m.packEntry(sample) }],
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

  agenticPack('fruta', { retirada });
})();
