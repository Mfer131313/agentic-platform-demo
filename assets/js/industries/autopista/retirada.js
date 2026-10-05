/* Autopista Multimotor · simulacro de recall REC-VW-2026-001 (VW Golf/Passat 2024-2026, fallo potencial del módulo ABS).
 * Hacia atrás: boletín del fabricante, módulo ABS y entradas 2024-2026. Hacia delante: 98 vehículos (47 de flota de alquiler,
 * 9 en suscripción, 6 en showroom, 34 con 8 clientes y 2 bajas) y taller VW. Mismos clientes y referencias que el resto de escenas. Datos sintéticos de demostración (MFM). */
(function () {
  'use strict';

  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const dec1 = (x) => String(x).replace('.', ',');
  const S = {
    n0,
    lang: 'Español',
    vehOne: 'vehículo', vehMany: 'vehículos', cliOne: 'cliente', cliMany: 'clientes',
    list: (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} y ${a[a.length - 1]}`),
    region: 'Comunidad de Madrid',
    kinds: { part: 'Particular', emp: 'Empresa', rent: 'Renting' },
    fleetWhere: 'Flota de alquiler · Hub Marqués de Soria', fleetSub: 'Odoo Inventario · en circulación o en el hub',
    done: 'Realizada', noCita: 'Sin cita',
    subWhere: 'Suscripción de 6 meses', subSub: 'Salesforce CRM · contrato activo',
    stkWhere: 'Showroom Madrid', stkSub: 'Odoo Inventario · disponible para vender',
    resSub: (P) => `${P.order} · ${P.ship} · entrega hoy a las 17:00`,
    bajaWhere: 'Baja de flota', bajaSub: 'Siniestro total · 12/08/2026',
    chip: { ok: 'Reparado', cita: 'Cita programada', nocita: 'Sin cita', sub: 'Suscriptor a avisar', stk: 'Venta sin bloquear', res: 'Entrega de hoy', sold: 'Con cliente', baja: 'Baja' },
    entry: (y) => `Entrada ${y}`,
    actions: {
      ok: 'Ninguna: firmware y sensor de presión actualizados',
      cita: 'Mantener la cita y reasignar sus reservas de alquiler',
      nocita: 'Programar cita en iCare Taller',
      sub: 'Aviso al suscriptor y cita en el taller VW',
      stk: 'Bloquear la venta en Odoo y SAP',
      res: 'Retener la entrega de hoy y ofrecer otra unidad',
      sold: 'Aviso al cliente y cita de reparación sin coste',
      baja: 'Ninguna: baja definitiva'
    },
    andMore: (n) => ` y ${n} más`,
    subject: (n) => `[SIMULACRO] Campaña de revisión REC-VW-2026-001 · VW Golf/Passat · módulo ABS · ${n} ${n === 1 ? 'vehículo' : 'vehículos'}`,
    greeting: (c) => (c.kind === 'part' ? `Estimado/a ${c.label}:` : `Estimado equipo de ${c.label}:`),
    intro: 'Volkswagen ha comunicado una campaña de revisión de seguridad que afecta a vehículos que le hemos suministrado en Autopista Multimotor:',
    lCamp: (c) => `Campaña: ${c} · Volkswagen Golf/Passat 2024-2026`,
    lVins: (v, n) => `Vehículo${n === 1 ? '' : 's'} (VIN): ${v}`,
    lOrder: (p, d) => `Pedido de venta: ${p} del ${d}`,
    reason: 'Motivo: posible fallo del módulo ABS, con riesgo de reducción de la presión de frenado en determinadas condiciones. Solución: actualización de firmware y, si procede, sustitución del sensor de presión (unos 90 minutos, sin coste para usted).',
    askRent: 'Les pedimos que nos indiquen la disponibilidad de los vehículos para programar su reparación en bloques en nuestro taller VW del hub de Marqués de Soria. Hasta entonces pueden seguir utilizándolos con prudencia; si observan un comportamiento anómalo del freno, deben detenerse y avisarnos.',
    ask: 'Le pedimos que reserve cita en nuestro taller VW del hub de Marqués de Soria respondiendo a este aviso. Hasta la reparación puede seguir circulando con prudencia; si nota un comportamiento anómalo del freno, deténgase y avísenos.',
    financed: 'La reparación no afecta a su contrato de financiación con Banco Sabadell. Su consulta sobre la TAE (3,99 % frente a 4,25 %) sigue su curso en Atención al cliente y es independiente de este aviso.',
    planned: (P) => `Su pedido ${P.order}, con entrega prevista hoy a las 17:00, se retiene: la unidad del showroom reservada para usted está afectada por la campaña y le propondremos otra unidad de otro lote.`,
    drill: 'Motivo del envío: simulacro de recall (procedimiento PR-OPS-014). En un recall real, aquí se indican las instrucciones definitivas acordadas por Operaciones y Taller.',
    sign: 'Atentamente,\nOperaciones · Autopista Multimotor\nHub de Madrid (Marqués de Soria)',
    from: 'Operaciones, Autopista Multimotor',
    to: (c) => `${c.label}`,
    subTo: 'Suscriptores de 6 meses · Autopista Multimotor',
    subGreeting: 'Estimado/a suscriptor/a:',
    lSub: 'Servicio: suscripción de 6 meses con un VW Golf/Passat de nuestra flota de suscripción',
    askSub: 'Le contactaremos por SMS para fijar su cita en el taller VW. La reparación y el vehículo de cortesía durante la misma están incluidos en su suscripción, sin coste. Hasta entonces puede seguir circulando con prudencia.',
    custBody: (n, ped, d) => `${n} ${n === 1 ? 'vehículo vendido' : 'vehículos vendidos'} con el pedido ${ped} (${d}).`,
    rentNote: 'Empresa de renting: avisa a sus conductores.',
    jmlNote: 'Financiado con Banco Sabadell; consulta abierta sobre la TAE (3,99 % frente a 4,25 %) en Atención al cliente.',
    plannedNote: (P) => `Pedido ${P.order}: 1 unidad del showroom reservada para ${P.ship}, hoy a las 17:00: retener.`,
    channelCust: 'Correo + SMS (Twilio) + llamada del comercial',
    noticeLang: 'Aviso en español',
    custAction: (planned) => `Aviso y cita de reparación sin coste${planned ? ' y retención de la entrega de hoy' : ''}`,
    subLabel: 'Suscriptores de 6 meses (9 contratos)',
    channelSub: 'SMS (Twilio) + correo',
    subMeta: 'Suscripción 6 meses',
    subBody: '9 vehículos de la flota de suscripción afectados. Cita en el taller VW y vehículo de cortesía durante la reparación, incluidos en la suscripción.',
    subAction: 'Aviso, cita y vehículo de cortesía',
    internal: 'Interno',
    flotaLabel: 'Gestión de flota de alquiler · 47 vehículos',
    channelFlota: 'Slack #flota-alquiler + orden en Odoo Inventario',
    flotaMeta: ['Hub de Marqués de Soria', '12 reparados · 20 con cita · 15 sin cita'],
    flotaBody: 'Reasignar las reservas de los 35 vehículos pendientes a otros modelos mientras esperan su cita y programar los 15 sin cita antes del 15/11/2026.',
    flotaAction: 'Reasignar reservas y programar citas',
    tallerLabel: 'Taller VW · iCare Taller',
    channelTaller: 'iCare Taller + aviso en Slack #taller',
    tallerMeta: ['Capacidad al 70 %', 'Falta un técnico VW'],
    tallerBody: 'Las 84 reparaciones pendientes suman 126 h con un técnico VW menos: redirigir las órdenes no urgentes y reforzar con un técnico de otra marca certificado.',
    hours: (n) => `${dec1(n * 1.5).replace(/,0$/, '')} h`,
    tallerAction: 'Reforzar el turno VW y reordenar la cola',
    vwLabel: 'Volkswagen · gestor de marca',
    chipVw: 'Informar',
    channelVw: 'Portal del fabricante + correo del gestor de marca',
    vwMeta: ['Plazo 15/11/2026', 'Campaña REC-VW-2026-001'],
    vwBody: 'Informe de avance semanal: vehículos localizados, reparados y pendientes. Cierre de la campaña con el sellado de cada expediente.',
    vwAction: 'Informe de avance semanal',
    nd: {
      bolK: 'Boletín del fabricante', bolSub: 'Volkswagen · Golf/Passat 2024-2026', bolMeta: 'Emitido el 30/09/2026 · plazo 15/11/2026', bolAlert: 'Fallo potencial del ABS',
      modK: 'Módulo ABS', modSub: 'Lotes afectados 2407 a 2605', modMeta: 'Firmware + sensor de presión',
      entK: 'Entradas', entMeta: 'Golf y Passat recibidos',
      floK: 'Flota de alquiler', floSub: (a, b, c) => `${a} reparados · ${b} con cita · ${c} sin cita`, floMeta: 'Flota de 1.012 unidades', floAlert: 'Reasignar reservas',
      susK: 'Suscripciones', susSub: 'Contratos de 6 meses', susMeta: 'Salesforce CRM',
      stkK: 'Showroom', stkSub: (P) => `1 reservado para ${P.ship}`, stkMeta: 'Entrega hoy a las 17:00', stkAlert: 'Bloquear la venta',
      venK: 'Ventas', venSub: (n) => `${n} clientes`, venMeta: '12/12/2024 a 06/05/2026',
      bajK: 'Bajas', bajSub: 'Siniestro total', bajMeta: '12/08/2026',
      trK: 'Reparados', trSub: 'Firmware + sensor · iCare Taller', trMeta: 'Del 24/09 al 06/10',
      tcK: 'Con cita', tcSub: 'Flota de alquiler', tcMeta: 'Del 08/10 al 30/10',
      tsK: 'Por programar', tsSub: (a, b, c, d) => `${a} de flota · ${b} suscripción · ${c} clientes · ${d} exposición`, tsMeta: '84 reparaciones = 126 h', tsAlert: 'Falta un técnico VW',
      subCliK: 'Suscripción', subCliT: 'Suscriptores 6 meses'
    },
    cash: 'Contado / empresa', pct100: '100,0 %',
    loc: {
      res: 'Showroom · reservado', resSub: (P, c) => `${P.order} · ${c} · entrega hoy a las 17:00`, resAct: 'Retener la entrega y ofrecer otra unidad',
      stk: 'Showroom Madrid', stkSub: 'Odoo Inventario · disponibles para vender', stkAct: 'Bloquear la venta en Odoo y SAP',
      nocita: 'Flota de alquiler · sin cita', nocitaSub: 'iCare Taller · por programar', nocitaAct: 'Programar cita en iCare Taller',
      cita: 'Flota de alquiler · con cita', citaSub: 'iCare Taller · del 08/10 al 30/10', citaAct: 'Mantener la cita y reasignar reservas',
      ok: 'Flota de alquiler · reparados', okSub: 'Firmware + sensor de presión', okAct: 'Ninguna',
      sub: 'Suscripción de 6 meses', subSub: 'Salesforce CRM · contratos activos', subAct: 'Aviso, cita y vehículo de cortesía',
      cust: (k) => `Con clientes · ${k}`, custAct: 'Aviso y cita de reparación sin coste',
      baja: 'Baja de flota', bajaSub: 'Siniestro total · 12/08/2026', bajaAct: 'Ninguna: baja definitiva'
    },
    fl: {
      seg1: 'Vehículos', unit1: 'vehículos', col1: 'Vehículos',
      title1: (c) => `Campaña ${c} → clientes, flota y exposición`,
      in1: 'Entradas con módulo ABS afectado', in1Sub: 'Golf y Passat 2024-2026 recibidos por Autopista Multimotor', phase1: 'Bajas definitivas antes de la campaña', loss1: 'Siniestro total · baja de flota y de matrícula',
      outsTitle: 'Destino actual',
      oSub: 'Suscriptores de 6 meses', oSubSub: 'Contratos activos · Salesforce CRM',
      oFleetOk: 'Flota de alquiler · reparados', oFleetOkSub: 'iCare Taller · firmware + sensor',
      oFleetCita: 'Flota de alquiler · con cita', oFleetCitaSub: 'iCare Taller · del 08/10 al 30/10',
      oFleetNo: 'Flota de alquiler · sin cita', oFleetNoSub: 'Por programar en iCare Taller',
      oRes: (P) => `Reservado para ${P.ship}`, oResSub: (P) => `Showroom · ${P.order} · hoy a las 17:00`,
      oStk: 'Showroom Madrid', oStkSub: 'Disponibles para vender (sin bloquear)',
      seg2: 'Taller', col2: 'Minutos de taller',
      title2: (c) => `Campaña ${c} → trabajo de taller`,
      in2: 'Trabajo de la campaña', in2Sub: (n, m) => `${n} vehículos × ${m} min · firmware + sensor de presión`,
      outsTitle2: 'Estado del trabajo',
      m1: 'Realizado', m1Sub: (n) => `${n} vehículos de flota reparados`,
      m2: 'Con cita programada', m2Sub: (n) => `${n} vehículos de flota`,
      m3: 'Flota sin cita', m3Sub: (n) => `${n} vehículos por programar`,
      m4: 'Vehículos de clientes', m4Sub: (n) => `${n} vehículos por programar`,
      m5: 'Suscripciones', m5Sub: (n) => `${n} vehículos por programar`,
      m6: 'Showroom', m6Sub: (n) => `${n} vehículos antes de venderlos`
    },
    st: { fab: 'Fabricante', ent: 'Entradas', est: 'Estado actual', tal: 'Taller', cli: 'Clientes' },
    headline: (c, t) => `Campaña ${c} · VW Golf/Passat 2024-2026 · fallo potencial del módulo ABS · ${t} vehículos`,
    previewSide: (t, n) => `${t} vehículos · ${n} avisos`,
    genSub: (t, n) => `1 boletín · 1 módulo · ${t} vehículos · ${n} destinatarios`,
    step: [
      ['Localiza el punto de partida', (c) => `Campaña ${c} · VW Golf/Passat 2024-2026 · boletín de Volkswagen del 30/09/2026 · plazo 15/11/2026`],
      ['Hacia atrás: boletín del fabricante y módulo ABS', (c) => `Boletín de ${c} · módulos ABS de los lotes MABS-2407 a MABS-2605 · rango de VIN comunicado por Volkswagen España`],
      ['Hacia atrás: entradas a Autopista Multimotor', (t, a, b, c) => `${t} vehículos recibidos desde 2024: ${a} en 2024, ${b} en 2025 y ${c} en 2026 · cruce de VIN con el rango afectado`],
      ['Hacia delante: flota, suscripciones y showroom', (f, s, k, b) => `${f} vehículos de la flota de alquiler (1.012 uds) · ${s} en suscripción · ${k} en showroom · ${b} bajas por siniestro total`],
      ['Reparaciones realizadas y citas de taller', (a, b, c) => `${a} reparados (firmware + sensor de presión) · ${b} con cita entre el 08/10 y el 30/10 · ${c} sin cita`],
      ['Capacidad del taller VW', (n) => `Falta un técnico VW · ${n} reparaciones pendientes = 126 h · capacidad al 70 % (23 órdenes en cola)`],
      ['Ventas a clientes, pedidos y financiación', (n, c) => `${n} vehículos vendidos a ${c} clientes · pedidos del 12/12/2024 al 06/05/2026 · financiación con Banco Sabadell en 1 operación`],
      ['Contactos de clientes y consultas abiertas', (n) => `${n} destinatarios verificados (8 clientes y los suscriptores) · consulta abierta de José María López sobre la TAE (3,99 % frente a 4,25 %)`],
      ['Estado de cada vehículo desde Odoo Inventario', (t, b, f, s, k, v) => `${t} vehículos: ${b} bajas, ${f} en flota, ${s} en suscripción, ${k} en showroom y ${v} con clientes`],
      ['Cuadre de la campaña: entradas frente a destino', (t) => `Conciliado 100,0 % · 0 vehículos sin justificar · ${t} de ${t} localizados`],
      ['Abre el registro del recall con un aviso por destinatario', (n) => `Recall en borrador · ${n} citas de reparación por programar`],
      ['Prepara los avisos sin enviar', (n, k) => `${n} avisos pendientes de aprobación (correo y SMS) · bloqueo de venta de ${k} vehículos del showroom propuesto`]
    ],
    mk: ['Punto de partida localizado', 'Traza hacia atrás completa', 'Estado del taller consultado', 'Ventas y clientes identificados', 'Contactos identificados', 'Cuadre de la campaña cerrado', 'Registro y avisos preparados'],
    loc2: {
      label: 'Vehículos localizados',
      sub: (v, f, s, k, b) => `${v} con clientes · ${f} en flota · ${s} en suscripción · ${k} en showroom · ${b} bajas`,
      short: (t, v, c, f, s, k, b) => `${t} de ${t} vehículos localizados (${v} con ${c} clientes, ${f} en flota, ${s} en suscripción, ${k} en showroom y ${b} bajas)`
    },
    kpiNotifyLabel: 'Destinatarios a avisar',
    kpiNotifySub: (P) => '1 entrega de hoy a retener · 17:00',
    bal: {
      title: 'Balance de vehículos', kpiLabel: 'Balance de vehículos conciliado',
      sub: 'Vehículos de la campaña desde la entrada hasta su destino y trabajo de taller · Odoo Inventario, iCare Taller y SAP ERP',
      head: 'Campaña REC-VW-2026-001', headSide: (n) => `${n} pedidos de venta · 1 módulo`,
      labels: { in: 'Entradas', losses: 'Bajas justificadas', out: 'Con cliente o suscriptor', stock: 'En flota y showroom' },
      detailTitle: 'Detalle por flujo',
      criterio: 'Criterio: la diferencia sin justificar se muestra tal cual, no se reparte. Cada vehículo se cuenta por su VIN en Odoo Inventario; cada venta, por su pedido en SAP ERP; cada reparación, por su orden en iCare Taller.',
      reportText: 'Vehículos y bajas declarados en Odoo Inventario; ventas y pedidos en SAP ERP; órdenes y citas en iCare Taller; contratos de suscripción y consultas en Salesforce CRM.'
    },
    prod: { title: 'Ventas con vehículos de la campaña', side: (n, v) => `${n} pedidos · ${v} vehículos`, c1: 'Pedido', c2: 'Cliente', c3: 'Entrega', c4: 'Vehículos', c5: 'Financiación', c6: 'Localizado' },
    un: {
      title: 'Vehículos y ubicaciones', sub: (t) => `${t} vehículos (VIN) · Odoo Inventario, iCare Taller y SAP ERP`,
      csv: 'Vehículos de la campaña (CSV)', plate: 'Matrícula', model: 'Modelo', where: 'Ubicación o cliente', detail: 'Detalle', cita: 'Cita de taller', order: 'Orden', state: 'Estado', action: 'Acción en un recall real',
      byLoc: 'Por ubicación', refLabel: 'Campaña', nLabel: 'Vehículos', qtyLabel: 'Minutos de taller', listLabel: 'Vehículos (VIN)'
    },
    cu: {
      title: 'Destinatarios a avisar', sub: (n, v) => `${n} destinatarios con ${v} vehículos · 1 entrega de hoy a retener`,
      holdsTitle: 'Acciones en el hub',
      h1: (P) => `Retener la entrega ${P.ship} (hoy a las 17:00)`, h1Meta: (P, c) => ['1 vehículo de la campaña', P.order, c],
      h1Body: (P) => `En un recall real, el gestor de entregas no entrega la unidad del showroom reservada en ${P.order} y propone otra unidad de otro lote.`,
      h2: (n) => `Bloquear la venta de los ${n} vehículos libres del showroom`, h2Meta: ['hoy', 'Golf/Passat 2024-2026', 'Odoo y SAP'],
      h2Body: 'Siguen disponibles para vender: en un recall real se bloquean en Odoo Inventario y SAP ERP hasta su reparación. Listado por VIN en la pestaña «Vehículos (VIN)» y en el CSV.',
      h3: 'Reforzar el taller VW', h3Meta: (n) => [`${n} reparaciones`, '126 h', 'iCare Taller'],
      h3Body: 'Falta un técnico VW: en un recall real se pide refuerzo a otra marca certificada y se reordenan las 23 órdenes en cola para no superar el plazo del 15/11/2026.'
    },
    ap: {
      title: 'Recall y avisos del simulacro',
      s1: 'Destinatarios con vehículos de la campaña', s1v: (n, v) => `${n} destinatarios · ${v} vehículos`,
      s2: 'Entrega de hoy a retener', s2v: (P) => `${P.ship} · hoy a las 17:00 · 1 vehículo`,
      s3: 'Venta que se bloquearía', s3v: (n) => `${n} vehículos en el showroom`, s3c: 'Sin bloqueo en simulacro',
      s4: 'Taller', s4v: (n) => `Programar los ${n} vehículos de flota sin cita (OT en iCare Taller)`,
      effects: (n) => [
        `Twilio SMS y correo: ${n} avisos guardados como borrador con la marca SIMULACRO; no se envía nada`,
        `SAP ERP: registro del recall y ${n} solicitudes de cita en borrador, sin liberar`,
        'Odoo Inventario: sin cambios; en un simulacro no se bloquea la venta ni se retiene ninguna entrega',
        'Registro {code} aprobado con los tiempos de cada actividad'
      ]
    },
    rp: {
      objeto: 'Simulacro de recall con punto de partida en {label}. Se comprueba la trazabilidad hacia atrás (boletín, módulo ABS y entradas) y hacia delante (flota, ventas, suscripciones y taller), con el balance de vehículos de la campaña.',
      noAction: 'El ejercicio no bloquea ventas, no retiene entregas y no envía avisos.',
      results: (n, k) => [
        `${n} destinatarios en la Comunidad de Madrid (8 clientes y los suscriptores) y 1 entrega de hoy que se retendría.`,
        'El taller VW tiene un técnico menos: las 84 reparaciones pendientes (126 h) exigen refuerzo para cumplir el plazo del 15/11/2026.',
        `Se bloquearía la venta de ${k} vehículos libres del showroom.`
      ],
      bc1: 'Etapa', bc2: 'Referencia', bc3: 'Fecha', bc4: 'Detalle',
      backRows: (t, a, b, c) => [
        { etapa: 'Fabricante', ref: 'REC-VW-2026-001', fecha: '30/09/2026', det: 'Boletín de Volkswagen · Golf/Passat 2024-2026 · fallo potencial del módulo ABS' },
        { etapa: 'Módulo ABS', ref: 'MABS-2407/2605', fecha: '07/2024 a 05/2026', det: 'Lotes afectados · actualización de firmware y sensor de presión si procede' },
        { etapa: 'Entradas 2024', ref: 'ENT-VW-2024', fecha: '2024', det: `${a} vehículos recibidos en Autopista Multimotor` },
        { etapa: 'Entradas 2025', ref: 'ENT-VW-2025', fecha: '2025', det: `${b} vehículos recibidos` },
        { etapa: 'Entradas 2026', ref: 'ENT-VW-2026', fecha: '2026', det: `${c} vehículos recibidos` },
        { etapa: 'Bajas', ref: 'SIN-2026-0812', fecha: '12/08/2026', det: '2 vehículos con siniestro total · baja de flota y de matrícula' },
        { etapa: 'Taller', ref: 'iCare Taller', fecha: '24/09 a 06/10/2026', det: '12 vehículos reparados · 20 con cita · capacidad al 70 %' },
        { etapa: 'Recall', ref: 'REC-VW-2026-001', fecha: '07/10/2026', det: `${t} vehículos localizados · plazo 15/11/2026` }
      ],
      fwdExtra: (P, c, f, s, k) => [
        { ped: P.order, cliente: `${c} (entrega de hoy, reservado en el showroom)`, date: '07/10/2026', n: 1, fin: '—' },
        { ped: 'FLOTA', cliente: 'Flota de alquiler (47 vehículos)', date: '—', n: f, fin: '—' },
        { ped: 'SUSCR.', cliente: 'Suscripciones de 6 meses', date: '—', n: s, fin: '—' },
        { ped: 'SHOWROOM', cliente: 'Showroom Madrid (sin bloquear)', date: '—', n: k, fin: '—' }
      ],
      conclusion: 'Conclusión: la información necesaria para un recall se obtiene completa y la campaña cuadra vehículo a vehículo. Acciones de mejora propuestas: reservar capacidad de taller VW al abrirse cada campaña y enlazar los VIN de la campaña con las reservas de alquiler en Odoo.',
      note: 'Simulacro: no se ha bloqueado ninguna venta, no se ha retenido ninguna entrega y no se ha enviado ningún aviso. Datos sintéticos de demostración.'
    },
    audit: { back: 'boletín REC-VW-2026-001 · módulo ABS MABS-2407/2605 · entradas 2024-2026', fwd: (t, n) => `${t} vehículos · ${n} destinatarios · 1 entrega de hoy` },
    say: (P, k, n) => [
      `Lo accionable: ${P.ship} (hoy a las 17:00) se retendría y se bloquearía la venta de los ${k} vehículos libres del showroom.`,
      `Los avisos van a ${n} destinatarios con su pedido y sus VIN; los suscriptores reciben SMS. En un simulacro no se envía nada. Decide el Responsable de operaciones.`
    ],
    title: 'Simulacro de recall', nav: 'Recalls y retiradas', section: 'Calidad',
    desc: 'Ejercicio de trazabilidad para campañas de recall del fabricante: genealogía hacia atrás y hacia delante, del boletín al vehículo y al cliente, balance de vehículos y destinatarios a avisar, a partir de una campaña o de un VIN.',
    place: 'Hub de operaciones · Madrid (Marqués de Soria)',
    approver: 'Responsable de operaciones',
    agents: { trace: 'Trazabilidad', bal: 'Balance de vehículos', rec: 'Recall y avisos' },
    targetText: 'Objetivo ilustrativo: 4 h', todayEstimate: '2–5 h', timerRef: 'Objetivo demo: 4 h', packLabel: 'Descargar paquete del recall',
    setup: { title: 'Punto de partida', sub: 'Una campaña de recall del fabricante o el VIN de un vehículo' },
    m: {
      recall: 'Campaña', recallNoun: 'la campaña', recallField: 'Código de campaña', recallLabel: (c) => `Campaña ${c}`, recallOption: 'VW Golf/Passat 2024-2026 · módulo ABS · plazo 15/11/2026',
      vinNoun: 'el VIN', vinField: 'VIN del vehículo',
      vinOption: (v) => `${v ? v.model : 'Golf'} · flota de alquiler · sin cita de reparación`,
      vinHeadline: (v, c) => `VIN ${v} · flota de alquiler (campaña ${c}) → se traza la campaña completa`,
      vinResult: (v, x, c) => `Vehículo ${v} · VW ${x ? x.model : 'Golf'} · matrícula ${x ? x.plate : ''} · flota de alquiler sin cita de reparación → se traza la campaña ${c} completa`
    },
    reference: {
      title: 'Referencia de auditoría',
      sub: 'Objetivo del ejercicio; Operaciones confirma los requisitos del fabricante y de sus clientes',
      items: [
        ['Reglamento (UE) 2018/858', 'Homologación y vigilancia del mercado: el fabricante comunica la campaña y el distribuidor colabora en localizar y reparar los vehículos afectados.'],
        ['Contrato de distribución VW', 'Seguimiento del avance de la campaña hasta el plazo del 15/11/2026 y cierre de cada expediente. Objetivo ilustrativo del ejercicio: localizar todos los vehículos en 4 horas.'],
        ['PR-OPS-014', 'Procedimiento interno de recall: Operaciones decide el alcance y aprueba los avisos.']
      ],
      note: 'Un simulacro no bloquea ventas, no retiene entregas ni envía avisos: se mide si la información se obtiene completa, cuadra y a tiempo.'
    },
    legend: { planned: 'Entrega de hoy: retener', click: 'Cada tarjeta resume una fase de la campaña' },
    noticeCfg: { title: 'Simulacro de recall' },
    approvalCfg: { policy: 'PR-OPS-014 · bloquear ventas o retener entregas requiere la aprobación del Responsable de operaciones', approveLabel: 'Aprobar y cerrar simulacro', rejectPlaceholder: 'Por ejemplo: falta confirmar el contacto de un cliente de renting' },
    clock: { title: 'Cronómetro frente a objetivo', sub: 'Tiempos de la simulación; no son medidas de rendimiento de los sistemas' },
    reportCfg: { subtitle: 'Registro del ejercicio de trazabilidad y recall · Reglamento (UE) 2018/858 · PR-OPS-014' },
    compare: {
      rows: [
        { k: 'Personas implicadas', today: '3–4: Operaciones, Taller, Ventas y Atención al cliente', agentic: '1: {approver} revisa y aprueba' },
        { k: 'Sistemas consultados', today: '5–6 abiertos a mano: Salesforce, SAP, Odoo, iCare, hojas de cálculo y correo', agentic: '5 conectores consultados por los agentes: SAP ERP, Odoo Inventario, iCare Taller, Salesforce CRM y Twilio SMS' },
        { k: 'Pasos', today: '15–20 consultas, cruces de VIN con pedidos y citas y cálculos manuales', agentic: '{steps} pasos automáticos y 1 aprobación' },
        { k: 'Balance de vehículos', today: 'Hoja de cálculo con entradas, ventas, flota y citas', agentic: 'Calculado por VIN y pedido: {reconciled} conciliado' }
      ]
    },
    presenter: (c, v) => ({
      idle: [
        'Simulacro de recall con trazabilidad y balance de vehículos; en el piloto Operaciones confirma el protocolo y medimos el tiempo real.',
        `Se elige el punto de partida: la campaña ${c} (fallo del ABS en VW Golf/Passat) o el VIN de un vehículo afectado.`,
        'Agentic Platform recorre SAP, Odoo, iCare y Salesforce hacia atrás hasta el boletín y las entradas, y hacia delante hasta la flota, el taller y cada cliente, y cuadra la campaña vehículo a vehículo.'
      ],
      nextIdle: `Pulsar «Iniciar simulacro» con la campaña ${c} (o elegir «VIN ${v}»).`,
      nextRun: 'Pulsar «Ver aviso» de José María López y después «Aprobar y cerrar simulacro».',
      nextDone: '«Descargar paquete del recall»: CSV de vehículos y registro imprimible. Después, «Cuestionario de cliente» (flecha derecha).'
    })
  };


  const CAMP = 'REC-VW-2026-001';
  const VIN_PFX = 'VIN-2026-MAD-VW-';
  const PLANNED = { cust: 'cdr', order: 'PV-26-10-0418', ship: 'ENT-26-10-0092' };
  const KIDS = { jml: 'user', abr: 'user', rdm: 'key' };

  /* Clientes con vehículos de la campaña: [id, cliente, tipo, localidad, vehículos, fecha de entrega, pedido, año de entrada] */
  const CUSTOMERS = [
    ['jml', 'José María López', 'part', 'Madrid', 1, '2026-03-14', 'PV-26-03-0212', 2026],
    ['trh', 'Transportes Rápidos Henares, S.L.', 'emp', 'Alcalá de Henares', 6, '2025-11-20', 'PV-25-11-0634', 2025],
    ['cvh', 'Consultoría Vallehermoso, S.L.', 'emp', 'Madrid', 4, '2026-01-29', 'PV-26-01-0095', 2026],
    ['ghc', 'Grupo Hotelero Chamberí, S.A.', 'emp', 'Madrid', 5, '2026-02-18', 'PV-26-02-0161', 2026],
    ['cdr', 'Clínica Dental Retiro, S.L.', 'emp', 'Madrid', 2, '2025-07-09', 'PV-25-07-0388', 2025],
    ['abr', 'Ana Belén Ruiz Ortega', 'part', 'Pozuelo de Alarcón', 1, '2026-05-06', 'PV-26-05-0274', 2026],
    ['rdm', 'Renting Directo Madrid, S.A.', 'rent', 'Getafe', 11, '2024-12-12', 'PV-24-12-0719', 2024],
    ['aba', 'Autoescuela Barajas, S.L.', 'emp', 'Madrid', 4, '2025-09-25', 'PV-25-09-0502', 2025]
  ].map(([id, label, kind, city, n, date, ped, year]) => ({ id, label, kind, city, n, date, ped, year, region: S.region, financed: id === 'jml' }));
  const CUST = {};
  CUSTOMERS.forEach((c) => { CUST[c.id] = c; });

  const N_FLEET_OK = 12; const N_FLEET_CITA = 20; const N_FLEET_NO = 15; const N_SUB = 9; const N_STK_FREE = 5; const N_STK_RES = 1; const N_BAJA = 2;
  const N_SOLD = CUSTOMERS.reduce((s, c) => s + c.n, 0);
  const N_FLEET = N_FLEET_OK + N_FLEET_CITA + N_FLEET_NO;
  const N_STK = N_STK_FREE + N_STK_RES;
  const TOTAL = N_FLEET + N_SUB + N_STK + N_SOLD + N_BAJA;
  const N_TODO = TOTAL - N_BAJA - N_FLEET_OK;
  const N_UNSCHED = N_TODO - N_FLEET_CITA;
  const MIN_JOB = 90;
  const N_CUST_NOTIFY = CUSTOMERS.length + 1;

  const fmtD = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '');
  const dm = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}` : '');
  const plural = (n, a, b) => `${n0(n)} ${n === 1 ? a : b}`;
  const veh = (n) => plural(n, S.vehOne, S.vehMany);
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const pad = (n, w) => String(n).padStart(w, '0');
  const kindOf = (c) => S.kinds[c.kind];

  /* ---------------------------------------------------------------- Vehículos (VIN) */

  let seed = 261007;
  const rnd = () => { seed = (seed * 1103515245 + 12345) % 2147483648; return seed / 2147483648; };
  const LET = 'BCDFGHJKLMNPRSTVWXYZ';
  const plate = () => `${1000 + Math.floor(rnd() * 8999)} ${LET[Math.floor(rnd() * 20)]}${LET[Math.floor(rnd() * 20)]}${LET[Math.floor(rnd() * 20)]}`;
  const MODELS = ['Golf 1.5 eTSI', 'Golf 2.0 TDI', 'Passat 2.0 TDI', 'Golf GTD'];
  const VEH = [];
  function addVeh(n, f) {
    for (let i = 0; i < n; i += 1) {
      const k = VEH.length + 1;
      VEH.push(Object.assign({ vin: `${VIN_PFX}${pad(k, 3)}`, plate: plate(), model: MODELS[k % MODELS.length] }, f(i, k)));
    }
  }
  addVeh(N_FLEET_OK, (i) => ({ cat: 'ok', year: 2024, where: S.fleetWhere, whereSub: S.fleetSub, cita: S.done, citaSub: `${pad(29 + (i % 2) * 0 + Math.floor(i / 2) * 0, 2)}/09`.replace(/^\d+\/09$/, i < 6 ? `${pad(24 + i, 2)}/09` : `${pad(i - 5, 2)}/10`) }));
  addVeh(N_FLEET_CITA, (i, k) => ({ cat: 'cita', year: 2025, where: S.fleetWhere, whereSub: S.fleetSub, cita: `${pad(8 + Math.floor(i * 1.1), 2)}/10/2026`, citaSub: `OT-26-10-${pad(300 + k, 4)}` }));
  addVeh(N_FLEET_NO, (i) => ({ cat: 'nocita', year: i < 8 ? 2024 : 2025, where: S.fleetWhere, whereSub: S.fleetSub, cita: '—', citaSub: S.noCita }));
  addVeh(N_SUB, (i) => ({ cat: 'sub', year: i < 5 ? 2025 : 2026, where: S.subWhere, whereSub: S.subSub, cita: '—', citaSub: S.noCita }));
  addVeh(N_STK_FREE, () => ({ cat: 'stk', year: 2026, where: S.stkWhere, whereSub: S.stkSub, cita: '—', citaSub: S.noCita }));
  addVeh(N_STK_RES, () => ({ cat: 'res', year: 2026, where: S.stkWhere, whereSub: S.resSub(PLANNED), cita: '—', citaSub: S.noCita, cust: PLANNED.cust }));
  CUSTOMERS.forEach((c) => addVeh(c.n, () => ({ cat: 'sold', year: c.year, cust: c.id, where: c.label, whereSub: `${c.city} · ${kindOf(c)}`, cita: '—', citaSub: S.noCita, ped: c.ped, date: fmtD(c.date) })));
  addVeh(N_BAJA, () => ({ cat: 'baja', year: 2026, where: S.bajaWhere, whereSub: S.bajaSub, cita: '—', citaSub: '—' }));
  const VINS_OF = (id) => VEH.filter((v) => v.cust === id && v.cat === 'sold').map((v) => v.vin);
  const byYear = (y) => VEH.filter((v) => v.year === y).length;

  const CHIPS = { ok: { status: 'done', label: S.chip.ok }, cita: { status: 'pending', label: S.chip.cita }, nocita: { status: 'critical', label: S.chip.nocita }, sub: { status: 'pending', label: S.chip.sub }, stk: { status: 'hold', label: S.chip.stk }, res: { status: 'pending', label: S.chip.res }, sold: { status: 'shipped', label: S.chip.sold }, baja: { status: 'neutral', label: S.chip.baja } };
  const vehRows = VEH.map((v) => ({ vin: v.vin, plate: v.plate, model: v.model, modelSub: S.entry(v.year), where: v.where, whereSub: v.whereSub, cita: v.cita, citaSub: v.citaSub, estado: CHIPS[v.cat], accion: S.actions[v.cat] }));

  /* ---------------------------------------------------------------- Avisos */

  function noticeOf(c) {
    const planned = c.id === PLANNED.cust;
    const vins = VINS_OF(c.id);
    const shown = vins.slice(0, 3).join(', ') + (vins.length > 3 ? S.andMore(vins.length - 3) : '');
    const subj = S.subject(c.n);
    const parts = [
      S.greeting(c),
      S.intro,
      [S.lCamp(CAMP), S.lVins(shown, c.n), S.lOrder(c.ped, fmtD(c.date))].join('\n'),
      S.reason,
      c.kind === 'rent' ? S.askRent : S.ask
    ];
    if (c.financed) parts.push(S.financed);
    if (planned) parts.push(S.planned(PLANNED));
    parts.push(S.drill);
    parts.push(S.sign);
    return { lang: S.lang, headers: { From: S.from, To: S.to(c), Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [CAMP, vins[0]].concat(planned ? [PLANNED.ship] : []) };
  }
  function noticeSub() {
    const vins = VEH.filter((v) => v.cat === 'sub').map((v) => v.vin);
    const subj = S.subject(N_SUB);
    const parts = [S.subGreeting, S.intro, [S.lCamp(CAMP), S.lVins(`${vins.slice(0, 3).join(', ')}${S.andMore(vins.length - 3)}`, N_SUB), S.lSub].join('\n'), S.reason, S.askSub, S.drill, S.sign];
    return { lang: S.lang, headers: { From: S.from, To: S.subTo, Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [CAMP, vins[0]] };
  }

  const items = CUSTOMERS.map((c) => {
    const body = [S.custBody(c.n, c.ped, dm(c.date))];
    if (c.kind === 'rent') body.push(S.rentNote);
    if (c.id === 'jml') body.push(S.jmlNote);
    if (c.id === PLANNED.cust) body.push(S.plannedNote(PLANNED));
    return { id: c.id, label: c.label, icon: KIDS[c.id] || 'building', notify: true, channel: S.channelCust, meta: [`${c.city} · ${c.region}`, kindOf(c), S.noticeLang], body: body.join(' '), notice: noticeOf(c), refs: c.ped + (c.id === PLANNED.cust ? ` · ${PLANNED.order}` : ''), qtyText: veh(c.n), action: S.custAction(c.id === PLANNED.cust) };
  });
  items.push({ id: 'sub', label: S.subLabel, icon: 'users', notify: true, channel: S.channelSub, meta: [S.region, S.subMeta, S.noticeLang], body: S.subBody, notice: noticeSub(), refs: `${N_SUB} VIN`, qtyText: veh(N_SUB), action: S.subAction });
  items.push({ id: 'flota', label: S.flotaLabel, icon: 'key', notify: false, chip: S.internal, channel: S.channelFlota, meta: S.flotaMeta, body: S.flotaBody, refs: `${N_FLEET} VIN`, qtyText: veh(N_FLEET), action: S.flotaAction });
  items.push({ id: 'taller', label: S.tallerLabel, icon: 'wrench', notify: false, chip: S.internal, channel: S.channelTaller, meta: S.tallerMeta, body: S.tallerBody, refs: 'iCare Taller', qtyText: S.hours(N_TODO), action: S.tallerAction });
  items.push({ id: 'vw', label: S.vwLabel, icon: 'factory', notify: false, chip: S.chipVw, channel: S.channelVw, meta: S.vwMeta, body: S.vwBody, refs: CAMP, qtyText: veh(TOTAL), action: S.vwAction });

  /* ---------------------------------------------------------------- Genealogía */

  const nodes = [
    { id: 'BOL', stage: 'fab', kicker: S.nd.bolK, title: CAMP, mono: true, sub: S.nd.bolSub, meta: S.nd.bolMeta, alert: S.nd.bolAlert, alertTone: true, reveal: 1 },
    { id: 'MOD', stage: 'fab', kicker: S.nd.modK, title: 'MABS-2407/2605', mono: true, sub: S.nd.modSub, meta: S.nd.modMeta, reveal: 1 },
    { id: 'E24', stage: 'ent', kicker: S.nd.entK, title: '2024', sub: veh(byYear(2024)), meta: S.nd.entMeta, tone: 'shipped', reveal: 2 },
    { id: 'E25', stage: 'ent', kicker: S.nd.entK, title: '2025', sub: veh(byYear(2025)), meta: S.nd.entMeta, tone: 'shipped', reveal: 2 },
    { id: 'E26', stage: 'ent', kicker: S.nd.entK, title: '2026', sub: veh(byYear(2026)), meta: S.nd.entMeta, tone: 'shipped', reveal: 2 },
    { id: 'FLO', stage: 'est', kicker: S.nd.floK, title: veh(N_FLEET), sub: S.nd.floSub(N_FLEET_OK, N_FLEET_CITA, N_FLEET_NO), meta: S.nd.floMeta, alert: S.nd.floAlert, alertTone: true, tone: 'stock', reveal: 3 },
    { id: 'SUS', stage: 'est', kicker: S.nd.susK, title: veh(N_SUB), sub: S.nd.susSub, meta: S.nd.susMeta, tone: 'customer', reveal: 3 },
    { id: 'STK', stage: 'est', kicker: S.nd.stkK, title: veh(N_STK), sub: S.nd.stkSub(PLANNED), meta: S.nd.stkMeta, alert: S.nd.stkAlert, alertTone: true, tone: 'planned', reveal: 3 },
    { id: 'VEN', stage: 'est', kicker: S.nd.venK, title: veh(N_SOLD), sub: S.nd.venSub(CUSTOMERS.length), meta: S.nd.venMeta, tone: 'shipped', reveal: 3 },
    { id: 'BAJ', stage: 'est', kicker: S.nd.bajK, title: veh(N_BAJA), sub: S.nd.bajSub, meta: S.nd.bajMeta, tone: 'stock', reveal: 3 },
    { id: 'TR', stage: 'tal', kicker: S.nd.trK, title: veh(N_FLEET_OK), sub: S.nd.trSub, meta: S.nd.trMeta, tone: 'customer', reveal: 4 },
    { id: 'TC', stage: 'tal', kicker: S.nd.tcK, title: veh(N_FLEET_CITA), sub: S.nd.tcSub, meta: S.nd.tcMeta, tone: 'shipped', reveal: 4 },
    { id: 'TS', stage: 'tal', kicker: S.nd.tsK, title: veh(N_UNSCHED), sub: S.nd.tsSub(N_FLEET_NO, N_SUB, N_SOLD, N_STK), meta: S.nd.tsMeta, alert: S.nd.tsAlert, alertTone: true, tone: 'planned', reveal: 4 }
  ];
  CUSTOMERS.forEach((c) => nodes.push({ id: `C:${c.id}`, stage: 'cli', kicker: kindOf(c), title: c.label.replace(/, S\.[LA]\.$/, ''), sub: `${c.city} · ${veh(c.n)}`, tone: 'customer', reveal: 5 }));
  nodes.push({ id: 'C:sub', stage: 'cli', kicker: S.nd.subCliK, title: S.nd.subCliT, sub: `Madrid · ${veh(N_SUB)}`, tone: 'customer', reveal: 5 });
  const edges = [['BOL', 'MOD'], ['MOD', 'E24'], ['MOD', 'E25'], ['MOD', 'E26'], ['E24', 'FLO'], ['E25', 'FLO'], ['E24', 'VEN'], ['E25', 'VEN'], ['E26', 'VEN'], ['E25', 'SUS'], ['E26', 'SUS'], ['E26', 'STK'], ['E26', 'BAJ'], ['FLO', 'TR'], ['FLO', 'TC'], ['FLO', 'TS'], ['SUS', 'TS'], ['VEN', 'TS'], ['STK', 'TS']];
  CUSTOMERS.forEach((c) => edges.push(['VEN', `C:${c.id}`]));
  edges.push(['SUS', 'C:sub'], ['STK', `C:${PLANNED.cust}`]);

  /* ---------------------------------------------------------------- Tablas */

  const saleRows = CUSTOMERS.map((c) => ({ ped: c.ped, cliente: c.label, sub: `${kindOf(c)} · ${c.city}`, date: fmtD(c.date), n: c.n, fin: c.financed ? 'Banco Sabadell' : S.cash, located: S.pct100 }));
  const minOf = (n) => n * MIN_JOB;
  const locRows = [
    { ref: CAMP, where: S.loc.res, whereSub: S.loc.resSub(PLANNED, CUST[PLANNED.cust].label), n: N_STK_RES, qty: minOf(N_STK_RES), action: S.loc.resAct, tone: 'crit' },
    { ref: CAMP, where: S.loc.stk, whereSub: S.loc.stkSub, n: N_STK_FREE, qty: minOf(N_STK_FREE), action: S.loc.stkAct, tone: 'warn' },
    { ref: CAMP, where: S.loc.nocita, whereSub: S.loc.nocitaSub, n: N_FLEET_NO, qty: minOf(N_FLEET_NO), action: S.loc.nocitaAct, tone: 'crit' },
    { ref: CAMP, where: S.loc.cita, whereSub: S.loc.citaSub, n: N_FLEET_CITA, qty: minOf(N_FLEET_CITA), action: S.loc.citaAct, tone: 'warn' },
    { ref: CAMP, where: S.loc.ok, whereSub: S.loc.okSub, n: N_FLEET_OK, qty: 0, action: S.loc.okAct, tone: '' },
    { ref: CAMP, where: S.loc.sub, whereSub: S.loc.subSub, n: N_SUB, qty: minOf(N_SUB), action: S.loc.subAct, tone: 'warn' }
  ].concat(['part', 'emp', 'rent'].map((k) => {
    const cs = CUSTOMERS.filter((c) => c.kind === k);
    return { ref: CAMP, where: S.loc.cust(S.kinds[k]), whereSub: `${plural(cs.length, S.cliOne, S.cliMany)} · ${S.list(cs.map((c) => c.city).filter((x, i, a) => a.indexOf(x) === i))}`, n: sum(cs, (c) => c.n), qty: minOf(sum(cs, (c) => c.n)), action: S.loc.custAct, tone: 'warn' };
  })).concat([{ ref: CAMP, where: S.loc.baja, whereSub: S.loc.bajaSub, n: N_BAJA, qty: 0, action: S.loc.bajaAct, tone: '' }]);

  const outsSold = CUSTOMERS.map((c) => ({ label: c.label, sub: `${c.ped} · ${dm(c.date)} · ${c.city}`, stage: 'SAP ERP', qty: c.n }));
  const flowVeh = {
    key: 'veh', seg: S.fl.seg1, main: true, unit: S.fl.unit1, colLabel: S.fl.col1,
    title: S.fl.title1(CAMP),
    inLabel: S.fl.in1, inSub: S.fl.in1Sub, inStage: 'Odoo', inQty: TOTAL,
    phases: [{ title: S.fl.phase1, date: '2026-08-12', stages: [['Odoo', S.fl.loss1, N_BAJA]] }],
    outsTitle: S.fl.outsTitle,
    outs: outsSold.concat([
      { label: S.fl.oSub, sub: S.fl.oSubSub, stage: 'Salesforce', qty: N_SUB },
      { label: S.fl.oFleetOk, sub: S.fl.oFleetOkSub, stage: 'iCare', qty: N_FLEET_OK, kind: 'stock' },
      { label: S.fl.oFleetCita, sub: S.fl.oFleetCitaSub, stage: 'iCare', qty: N_FLEET_CITA, kind: 'stock' },
      { label: S.fl.oFleetNo, sub: S.fl.oFleetNoSub, stage: 'Odoo', qty: N_FLEET_NO, kind: 'stock' },
      { label: S.fl.oRes(PLANNED), sub: S.fl.oResSub(PLANNED), stage: 'Odoo', qty: N_STK_RES, kind: 'stock' },
      { label: S.fl.oStk, sub: S.fl.oStkSub, stage: 'Odoo', qty: N_STK_FREE, kind: 'stock' }
    ])
  };
  const flowMin = {
    key: 'taller', seg: S.fl.seg2, unit: 'min', colLabel: S.fl.col2,
    title: S.fl.title2(CAMP),
    inLabel: S.fl.in2, inSub: S.fl.in2Sub(TOTAL - N_BAJA, MIN_JOB), inStage: 'iCare', inQty: minOf(TOTAL - N_BAJA),
    phases: [],
    outsTitle: S.fl.outsTitle2,
    outs: [
      { label: S.fl.m1, sub: S.fl.m1Sub(N_FLEET_OK), stage: 'iCare', qty: minOf(N_FLEET_OK) },
      { label: S.fl.m2, sub: S.fl.m2Sub(N_FLEET_CITA), stage: 'iCare', qty: minOf(N_FLEET_CITA), kind: 'stock' },
      { label: S.fl.m3, sub: S.fl.m3Sub(N_FLEET_NO), stage: 'iCare', qty: minOf(N_FLEET_NO), kind: 'stock' },
      { label: S.fl.m4, sub: S.fl.m4Sub(N_SOLD), stage: 'iCare', qty: minOf(N_SOLD), kind: 'stock' },
      { label: S.fl.m5, sub: S.fl.m5Sub(N_SUB), stage: 'iCare', qty: minOf(N_SUB), kind: 'stock' },
      { label: S.fl.m6, sub: S.fl.m6Sub(N_STK), stage: 'iCare', qty: minOf(N_STK), kind: 'stock' }
    ]
  };

  const SYSTEMS = ['SAP ERP', 'Odoo Inventario', 'iCare Taller', 'Salesforce CRM'];

  const scope = {
    headline: S.headline(CAMP, TOTAL),
    previewSide: S.previewSide(TOTAL, N_CUST_NOTIFY),
    startNode: 'BOL',
    stages: [
      { id: 'fab', label: S.st.fab, icon: 'factory' },
      { id: 'ent', label: S.st.ent, icon: 'truck' },
      { id: 'est', label: S.st.est, icon: 'warehouse' },
      { id: 'tal', label: S.st.tal, icon: 'wrench' },
      { id: 'cli', label: S.st.cli, icon: 'building', count: N_CUST_NOTIFY }
    ],
    nodes,
    edges,
    systems: SYSTEMS,
    genSub: S.genSub(TOTAL, N_CUST_NOTIFY),
    steps: [
      { agent: 'trace', system: 'SAP ERP', action: S.step[0][0], result: S.step[0][1](CAMP), ms: 190, reveal: 0, mark: S.mk[0] },
      { agent: 'trace', system: 'SAP ERP', action: S.step[1][0], result: S.step[1][1](CAMP), ms: 430, reveal: 1 },
      { agent: 'trace', system: 'Odoo Inventario', action: S.step[2][0], result: S.step[2][1](TOTAL, byYear(2024), byYear(2025), byYear(2026)), ms: 520, reveal: 2, mark: S.mk[1] },
      { agent: 'trace', system: 'Odoo Inventario', action: S.step[3][0], result: S.step[3][1](N_FLEET, N_SUB, N_STK, N_BAJA), ms: 560, reveal: 3 },
      { agent: 'trace', system: 'iCare Taller', action: S.step[4][0], result: S.step[4][1](N_FLEET_OK, N_FLEET_CITA, N_FLEET_NO), ms: 470, reveal: 4, mark: S.mk[2] },
      { agent: 'trace', system: 'iCare Taller', action: S.step[5][0], result: S.step[5][1](N_TODO), ms: 380, tone: 'warn', reveal: 4 },
      { agent: 'trace', system: 'SAP ERP', action: S.step[6][0], result: S.step[6][1](N_SOLD, CUSTOMERS.length), ms: 590, reveal: 5, mark: S.mk[3] },
      { agent: 'trace', system: 'Salesforce CRM', action: S.step[7][0], result: S.step[7][1](N_CUST_NOTIFY), ms: 480, tone: 'warn', reveal: 5, mark: S.mk[4] },
      { agent: 'bal', system: 'Odoo Inventario', action: S.step[8][0], result: S.step[8][1](TOTAL, N_BAJA, N_FLEET, N_SUB, N_STK, N_SOLD), ms: 420 },
      { agent: 'bal', system: 'Agentic Platform', action: S.step[9][0], result: S.step[9][1](TOTAL), ms: 95, tone: 'ok', mark: S.mk[5] },
      { agent: 'rec', system: 'SAP ERP', action: S.step[10][0], result: S.step[10][1](N_UNSCHED), ms: 360 },
      { agent: 'rec', system: 'Twilio SMS', action: S.step[11][0], result: S.step[11][1](N_CUST_NOTIFY, N_STK_FREE), ms: 720, mark: S.mk[6] }
    ],
    located: { label: S.loc2.label, value: `${n0(TOTAL)} / ${n0(TOTAL)}`, sub: S.loc2.sub(N_SOLD, N_FLEET, N_SUB, N_STK, N_BAJA), icon: 'truck', short: S.loc2.short(TOTAL, N_SOLD, CUSTOMERS.length, N_FLEET, N_SUB, N_STK, N_BAJA) },
    kpiNotify: { label: S.kpiNotifyLabel, value: N_CUST_NOTIFY, sub: S.kpiNotifySub(PLANNED) },
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
      flows: [flowVeh, flowMin],
      product: {
        title: S.prod.title,
        side: S.prod.side(CUSTOMERS.length, N_SOLD),
        cols: [
          { label: S.prod.c1, key: 'ped', mono: true },
          { label: S.prod.c2, key: 'cliente', sub: 'sub' },
          { label: S.prod.c3, key: 'date' },
          { label: S.prod.c4, key: 'n', num: true },
          { label: S.prod.c5, key: 'fin' },
          { label: S.prod.c6, key: 'located', num: true, ok: true }
        ],
        rows: saleRows
      }
    },
    units: {
      title: S.un.title,
      sub: S.un.sub(TOTAL),
      icon: 'truck',
      csvLabel: S.un.csv,
      csvName: 'vehiculos',
      csvCols: [
        { label: 'VIN', key: 'vin' }, { label: S.un.plate, key: 'plate' }, { label: S.un.model, key: 'model' }, { label: S.un.where, key: 'where' }, { label: S.un.detail, key: 'whereSub' },
        { label: S.un.cita, key: 'cita' }, { label: S.un.order, key: 'citaSub' }, { label: S.un.state, key: 'estado' }, { label: S.un.action, key: 'accion' }
      ],
      byLoc: { label: S.un.byLoc, refLabel: S.un.refLabel, whereLabel: S.un.where, nLabel: S.un.nLabel, qtyLabel: S.un.qtyLabel, actionLabel: S.un.action, rows: locRows },
      list: {
        label: S.un.listLabel,
        cols: [
          { label: 'VIN', key: 'vin', mono: true, sub: 'plate' },
          { label: S.un.model, key: 'model', sub: 'modelSub' },
          { label: S.un.where, key: 'where', sub: 'whereSub' },
          { label: S.un.cita, key: 'cita', mono: true, sub: 'citaSub' },
          { label: S.un.state, key: 'estado', chip: true },
          { label: S.un.action, key: 'accion' }
        ],
        rows: vehRows
      }
    },
    customers: {
      title: S.cu.title,
      sub: S.cu.sub(N_CUST_NOTIFY, N_SOLD + N_SUB),
      items,
      holdsTitle: S.cu.holdsTitle,
      holds: [
        { icon: 'truck', tone: 'crit', title: S.cu.h1(PLANNED), meta: S.cu.h1Meta(PLANNED, CUST[PLANNED.cust].label), body: S.cu.h1Body(PLANNED) },
        { icon: 'lock', tone: 'warn', title: S.cu.h2(N_STK_FREE), meta: S.cu.h2Meta, body: S.cu.h2Body },
        { icon: 'wrench', tone: 'warn', title: S.cu.h3, meta: S.cu.h3Meta(N_TODO), body: S.cu.h3Body }
      ]
    },
    approval: {
      titlePrefix: S.ap.title,
      scope: [
        { label: S.ap.s1, value: S.ap.s1v(N_CUST_NOTIFY, N_SOLD + N_SUB), status: 'pending', chip: String(N_CUST_NOTIFY) },
        { label: S.ap.s2, value: S.ap.s2v(PLANNED) },
        { label: S.ap.s3, value: S.ap.s3v(N_STK_FREE), status: 'evaluate', chip: S.ap.s3c },
        { label: S.ap.s4, value: S.ap.s4v(N_FLEET_NO) }
      ],
      effects: S.ap.effects(N_CUST_NOTIFY)
    },
    report: {
      objeto: S.rp.objeto,
      noAction: S.rp.noAction,
      results: S.rp.results(N_CUST_NOTIFY, N_STK_FREE),
      back: {
        cols: [{ label: S.rp.bc1, key: 'etapa' }, { label: S.rp.bc2, key: 'ref', mono: true }, { label: S.rp.bc3, key: 'fecha' }, { label: S.rp.bc4, key: 'det' }],
        rows: S.rp.backRows(TOTAL, byYear(2024), byYear(2025), byYear(2026))
      },
      fwd: {
        cols: [{ label: S.prod.c1, key: 'ped', mono: true }, { label: S.prod.c2, key: 'cliente' }, { label: S.prod.c3, key: 'date' }, { label: S.prod.c4, key: 'n' }, { label: S.prod.c5, key: 'fin' }],
        rows: saleRows.concat(S.rp.fwdExtra(PLANNED, CUST[PLANNED.cust].label, N_FLEET, N_SUB, N_STK_FREE))
      },
      conclusion: S.rp.conclusion,
      note: S.rp.note
    },
    audit: { back: S.audit.back, fwd: S.audit.fwd(TOTAL, N_CUST_NOTIFY) },
    say: S.say(PLANNED, N_STK_FREE, N_CUST_NOTIFY)
  };

  const FIRST_NO = VEH.find((v) => v.cat === 'nocita');
  const sample = FIRST_NO ? FIRST_NO.vin : `${VIN_PFX}040`;

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
      recall: { label: S.m.recall, noun: S.m.recallNoun, field: S.m.recallField, icon: 'layers', format: CAMP, where: 'SAP ERP · Odoo Inventario' },
      vin: { label: 'VIN', noun: S.m.vinNoun, field: S.m.vinField, icon: 'barcode', format: `${VIN_PFX}040`, where: 'Odoo Inventario · iCare Taller' }
    },
    entries: [
      { mode: 'recall', code: CAMP, scope: 'abs', label: S.m.recallLabel(CAMP), option: S.m.recallOption },
      { mode: 'vin', code: sample, scope: 'abs', label: `VIN ${sample}`, option: S.m.vinOption(FIRST_NO), headline: S.m.vinHeadline(sample, CAMP), startNode: 'FLO', startResult: S.m.vinResult(sample, FIRST_NO, CAMP) }
    ],
    examples: [{ mode: 'recall', code: CAMP, label: S.m.recallLabel(CAMP) }, { mode: 'vin', code: sample, label: `VIN ${sample}` }],
    reference: S.reference,
    legend: S.legend,
    notice: S.noticeCfg,
    approval: S.approvalCfg,
    clock: S.clock,
    report: S.reportCfg,
    compare: S.compare,
    presenter: S.presenter(CAMP, sample),
    scopes: { abs: scope }
  };

  agenticPack('autopista', { retirada });
})();
