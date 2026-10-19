/* Guardián Ibérica Instalaciones · simulacro de retirada REC-2026-1019 (detector de movimiento PIR-200, lote PIR-2607-A de Sentinela Electronics: batería de litio con riesgo de sobrecalentamiento).
 * Hacia atrás: aviso del fabricante, lote y recepciones. Hacia delante: 912 hogares con 1.386 detectores instalados (Verisure 540, Sector Alarm 214, Prosegur Alarmas 158),
 * 960 detectores en almacén y 54 devueltos al fabricante. Mismos clientes y referencias que el resto de escenas. Datos sintéticos de demostración (MFM). */
(function () {
  'use strict';

  const n0 = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const S = {
    n0,
    lang: 'Español',
    detOne: 'detector', detMany: 'detectores', homeOne: 'hogar', homeMany: 'hogares',
    list: (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} y ${a[a.length - 1]}`),
    region: 'Comunitat Valenciana',
    dels: { VLC: 'Valencia', ALC: 'Alicante', CAS: 'Castellón' },
    pct100: '100,0 %',
    noVisit: 'Sin visita',
    chip: { visit: 'Visita programada', novisit: 'Sin visita' },
    actions: {
      visit: 'Mantener la visita de mantenimiento y sustituir el detector en ella',
      novisit: 'Aviso al titular y visita de sustitución sin coste'
    },
    modelOf: (n) => `${n} × PIR-200`,
    lotLine: (lot) => `Lote ${lot}`,
    subject: (n) => `[SIMULACRO] Aviso de seguridad REC-2026-1019 · detector PIR-200 · lote PIR-2607-A · ${n} ${n === 1 ? 'hogar' : 'hogares'}`,
    greeting: 'Estimado/a titular:',
    intro: (brand) => `El fabricante Sentinela Electronics ha comunicado un aviso de seguridad que afecta a detectores de movimiento que hemos instalado en su domicilio como instalador autorizado de ${brand}:`,
    lCamp: (c) => `Campaña: ${c} · Sentinela Electronics`,
    lDet: (lot) => `Detector: PIR-200, lote ${lot}`,
    lInst: (id, ser) => `Su instalación: ${id} · n.º de serie ${ser}`,
    reason: 'Motivo: la batería de litio del detector puede sobrecalentarse. Solución: sustitución gratuita del detector por una unidad de otro lote (unos 35 minutos, sin coste para usted).',
    ask: 'Le pedimos que reserve cita respondiendo a este aviso o al SMS que recibirá. Hasta la sustitución su alarma sigue funcionando; si nota calor, olor o hinchazón en el detector, no lo manipule y llámenos de inmediato a la línea técnica.',
    partnerLine: (brand) => `La sustitución no modifica su contrato con ${brand} ni su cuota.`,
    drill: 'Motivo del envío: simulacro de retirada de producto (procedimiento PR-QLT-006). En una retirada real, aquí se indican las instrucciones definitivas acordadas por Operaciones y Mantenimiento.',
    sign: 'Atentamente,\nOperaciones · Guardián Ibérica Instalaciones\nHub de Paterna (Valencia)',
    from: 'Operaciones, Guardián Ibérica Instalaciones',
    to: (label, n) => `Titulares de ${label} afectados (${n} hogares)`,
    brandBody: (h, d, v) => `${n0(h)} hogares con ${n0(d)} detectores del lote instalados · ${n0(v)} ya tienen visita de mantenimiento programada y ${n0(h - v)} no.`,
    secNote: 'Incluye la comprobación de la instalación de Marta Soler Pons (SA-2026-77412, Burjassot): tiene el caso CLM-2026-0619 abierto por falsas alarmas del PIR del salón; hay que verificar si su detector es del lote y coordinar el aviso con Atención al cliente.',
    channelBrand: 'SMS (Twilio) + correo + informe al portal del partner',
    noticeLang: 'Aviso en español',
    brandAction: 'Aviso y sustitución del detector sin coste',
    internal: 'Interno',
    almLabel: 'Almacén · 960 detectores del lote',
    channelAlm: 'Slack #almacen + bloqueo de stock en SAP Business One',
    almMeta: ['Paterna 620 · Alicante 210 · Castellón 130', '36 cargados en furgonetas'],
    almBody: 'Poner en cuarentena el stock del lote PIR-2607-A en los tres almacenes y descargar de las furgonetas los 36 detectores previstos para las instalaciones de hoy.',
    almAction: 'Cuarentena del lote y descarga de furgonetas',
    mantLabel: 'Mantenimiento · sustitución en 912 hogares',
    channelMant: 'Samsara Flota + órdenes OT en Salesforce',
    mantMeta: ['Sin visita: 772 hogares', '9 urgentes y 38 paneles sin respaldo en cola'],
    mantBody: 'Las 912 visitas suman 532 h de técnico en las rutas de Valencia, Alicante y Castellón: aprovechar las 140 visitas de mantenimiento ya programadas, priorizar los hogares con dos detectores y reforzar con técnicos de instalación.',
    hours: (n) => `${n0(n)} h`,
    mantAction: 'Reordenar rutas y programar las 772 visitas',
    fabLabel: 'Sentinela Electronics · gestor de calidad',
    chipFab: 'Informar',
    channelFab: 'Correo al gestor de calidad + portal de devoluciones (RMA)',
    fabMeta: ['Objetivo: localizar y avisar en 4 h', 'Campaña REC-2026-1019'],
    fabBody: 'Informe de avance: unidades localizadas, hogares avisados y detectores en cuarentena o devueltos. Devolución de los 960 del almacén cuando el fabricante lo indique.',
    fabAction: 'Informe de avance al fabricante',
    nd: {
      partnerK: 'Partner autorizado',
      bolK: 'Aviso del fabricante', bolSub: 'Sentinela Electronics · detector PIR-200', bolMeta: 'Emitido el 16/10/2026 · objetivo: avisar en 4 h', bolAlert: 'Riesgo de sobrecalentamiento',
      modK: 'Lote afectado', modSub: 'Detector PIR-200 · batería de litio', modMeta: '2.400 unidades recibidas en 07/2026 y 08/2026',
      entK: 'Recepción', entMeta: 'Almacén de Paterna',
      insK: 'Instalados en hogares', insSub: (bs) => `${n0(bs.reduce((s, b) => s + b.homes, 0))} hogares · ${bs.map((b) => `${b.label} ${n0(b.homes)}`).join(' · ')}`, insMeta: 'Portales de partner y Salesforce CRM', insAlert: 'Avisar en 4 h',
      almK: 'Almacén', almSub: (s) => `Paterna ${n0(s.pat + s.van)} · Alicante ${n0(s.alc)} · Castellón ${n0(s.cas)}`, almMeta: 'SAP Business One', almAlert: 'Cuarentena del lote',
      devK: 'Devueltos', devSub: 'Devolución (RMA) a Sentinela Electronics', devMeta: '08/09/2026',
      mpK: 'Con visita programada', mpSub: 'Mantenimiento anual PR-MAN-004', mpMeta: 'Del 22/10 al 30/10',
      msK: 'Por programar', msSub: (a) => `Verisure ${n0(a[0])} · Sector Alarm ${n0(a[1])} · Prosegur Alarmas ${n0(a[2])}`, msMeta: (h) => `912 visitas = ${n0(h)} h de técnico`, msAlert: 'Falta capacidad en ruta',
      mfK: 'Furgonetas de hoy', mfSub: (P) => `${P.n} instalaciones programadas · ${P.route}`, mfMeta: 'Samsara Flota', mfAlert: 'Retirar de las furgonetas'
    },
    loc: {
      van: 'Furgonetas de hoy', vanSub: (P) => `${P.n} instalaciones · ${P.route} · Samsara Flota`, vanAct: 'Retirar de las furgonetas y cambiar por otro lote',
      pat: 'Almacén Paterna', patSub: 'SAP Business One · disponible para instalar',
      alc: 'Almacén Alicante', cas: 'Almacén Castellón', stkSub: 'SAP Business One · disponible para instalar', stkAct: 'Bloquear la salida en SAP Business One',
      homes: (b) => `Hogares ${b}`, homesSub: (portal) => portal, homeAct: 'Aviso y visita de sustitución sin coste',
      ret: 'Devueltos al fabricante', retSub: 'RMA-2026-0908 · 08/09/2026', retAct: 'Ninguna: devolución cerrada'
    },
    fl: {
      seg1: 'Detectores', unit1: 'detectores', col1: 'Detectores',
      title1: (c) => `Campaña ${c} → hogares, almacén y devueltos`,
      in1: 'Recepciones del lote PIR-2607-A', in1Sub: 'Detector PIR-200 recibido en Paterna en 3 entregas', phase1: 'Devoluciones antes de la campaña', loss1: 'Devueltos al fabricante (RMA)',
      outsTitle: 'Destino actual',
      oBrandSub: (h, portal) => `${n0(h)} hogares · ${portal}`,
      oPat: 'Almacén Paterna', oPatSub: 'SAP Business One · disponibles para instalar',
      oVan: 'Furgonetas de hoy', oVanSub: (P) => `${P.n} instalaciones de hoy · ${P.route}`,
      oAlc: 'Almacén Alicante', oCas: 'Almacén Castellón', oStkSub: 'SAP Business One · disponibles para instalar',
      seg2: 'Visitas', col2: 'Minutos de técnico',
      title2: (c) => `Campaña ${c} → trabajo de técnicos`,
      in2: 'Sustitución en los hogares', in2Sub: (n, m) => `${n0(n)} hogares × ${m} min · sustitución del PIR-200`,
      outsTitle2: 'Estado del trabajo',
      m1: 'Con visita ya programada', m1Sub: (n) => `${n0(n)} hogares con mantenimiento PR-MAN-004`,
      m2: (b) => `${b} sin visita`, m2Sub: (n) => `${n0(n)} hogares por programar`
    },
    st: { fab: 'Fabricante', ent: 'Recepciones', est: 'Estado actual', tal: 'Mantenimiento', cli: 'Partners' },
    headline: (c, t) => `Campaña ${c} · detector PIR-200 · lote PIR-2607-A · batería de litio · ${n0(t)} detectores`,
    previewSide: (t, n) => `${n0(t)} detectores · ${n0(n)} avisos`,
    genSub: (t, n) => `1 aviso · 1 lote · ${n0(t)} detectores · ${n0(n)} destinatarios`,
    step: [
      ['Localiza el punto de partida', (c, lot) => `Campaña ${c} · lote ${lot} del detector PIR-200 · aviso de Sentinela Electronics del 16/10/2026 · objetivo: localizar y avisar en 4 h`],
      ['Hacia atrás: aviso del fabricante y lote', (c, lot, t) => `Aviso ${c} · lote ${lot} (${n0(t)} unidades) · batería de litio con riesgo de sobrecalentamiento · series PIR200-2607A-0001 a PIR200-2607A-${n0(t).replace('.', '')}`],
      ['Hacia atrás: recepciones en Guardián Ibérica', (t, r) => `${n0(t)} detectores recibidos: ${n0(r[0])} el 09/07, ${n0(r[1])} el 21/07 y ${n0(r[2])} el 04/08/2026 · cruce de series con el rango afectado`],
      ['Hacia delante: instalados, almacén y devueltos', (i, h, a, s, r) => `${n0(i)} instalados en ${n0(h)} hogares · ${n0(a)} en almacén (Paterna ${n0(s.pat + s.van)}, Alicante ${n0(s.alc)}, Castellón ${n0(s.cas)}) · ${n0(r)} devueltos al fabricante`],
      ['Rutas de hoy y furgonetas', (P) => `${P.det} detectores del lote cargados para ${P.n} de las 61 instalaciones de hoy · 118 mantenimientos y 9 urgentes en la misma flota`],
      ['Visitas de mantenimiento programadas', (v, u, h, n, m) => `${n0(v)} hogares ya tienen visita PR-MAN-004 · ${n0(u)} por programar · ${n0(n)} visitas × ${m} min = ${n0(h)} h de técnico`],
      ['Verisure: hogares y detectores del lote', (h, d) => `${n0(h)} hogares con ${n0(d)} detectores · contratos cruzados con el portal del partner`],
      ['Sector Alarm: hogares y detectores del lote', (h, d) => `${n0(h)} hogares con ${n0(d)} detectores · incluye SA-2026-77412 (caso CLM-2026-0619 abierto): comprobar si su PIR es del lote`],
      ['Prosegur Alarmas: hogares y detectores del lote', (h, d) => `${n0(h)} hogares con ${n0(d)} detectores · contratos cruzados con el portal del partner`],
      ['Contactos de los titulares y consultas abiertas', (n) => `${n0(n)} hogares con correo y teléfono verificados · 37 con teléfono desactualizado: aviso por correo y visita de cortesía`],
      ['Estado de cada detector desde SAP Business One', (t, r, a, i) => `${n0(t)} detectores: ${n0(r)} devueltos, ${n0(a)} en almacén y ${n0(i)} en hogares`],
      ['Cuadre de la campaña: recepciones frente a destino', (t) => `Conciliado 100,0 % · 0 detectores sin justificar · ${n0(t)} de ${n0(t)} localizados`],
      ['Abre el registro de la retirada con un aviso por marca', (n) => `Retirada en borrador · ${n0(n)} visitas de sustitución por programar`],
      ['Prepara los avisos sin enviar', (n, k) => `${n0(n)} avisos pendientes de aprobación (SMS y correo) · bloqueo de salida de ${n0(k)} detectores del almacén propuesto`]
    ],
    mk: ['Punto de partida localizado', 'Traza hacia atrás completa', 'Rutas y mantenimiento consultados', 'Hogares y marcas identificados', 'Contactos identificados', 'Cuadre de la campaña cerrado', 'Registro y avisos preparados'],
    loc2: {
      label: 'Detectores localizados',
      sub: (i, h, a, r) => `${n0(i)} en ${n0(h)} hogares · ${n0(a)} en almacén · ${n0(r)} devueltos`,
      short: (t, i, h, a, r) => `${n0(t)} de ${n0(t)} detectores localizados (${n0(i)} en ${n0(h)} hogares, ${n0(a)} en almacén y ${n0(r)} devueltos)`
    },
    kpiNotifyLabel: 'Hogares a avisar',
    kpiNotifySub: (P) => `${P.n} instalaciones de hoy a retener · ${P.det} detectores en furgonetas`,
    bal: {
      title: 'Balance de detectores', kpiLabel: 'Balance de detectores conciliado',
      sub: 'Detectores de la campaña desde la recepción hasta su destino y trabajo de técnicos · SAP Business One, Salesforce CRM y portales de partner',
      head: 'Campaña REC-2026-1019', headSide: (n) => `${n0(n)} hogares · 1 lote`,
      labels: { in: 'Recepciones', losses: 'Devoluciones justificadas', out: 'Instalados en hogares', stock: 'En almacén y furgonetas' },
      detailTitle: 'Detalle por flujo',
      criterio: 'Criterio: la diferencia sin justificar se muestra tal cual, no se reparte. Cada detector se cuenta por su n.º de serie en SAP Business One; cada hogar, por su contrato en el portal del partner; cada visita, por su orden de trabajo en Salesforce.',
      reportText: 'Detectores y devoluciones declarados en SAP Business One; contratos y hogares en los portales de Verisure, Sector Alarm y Prosegur Alarmas; órdenes de trabajo y consultas en Salesforce CRM; rutas en Samsara Flota.'
    },
    prod: { title: 'Instalaciones con detectores de la campaña', side: (g, d) => `${g} carteras · ${n0(d)} detectores`, c1: 'Cartera', c2: 'Marca y delegación', c3: 'Instalado entre', c4: 'Detectores', c5: 'Hogares', c6: 'Localizado' },
    un: {
      title: 'Hogares y detectores', sub: (t, h) => `${n0(h)} hogares con detectores del lote · ${n0(t)} detectores en total · SAP Business One, Salesforce CRM y portales de partner`,
      csv: 'Hogares de la campaña (CSV)', csvName: 'hogares', idLabel: 'Instalación', plate: 'N.º de serie', model: 'Detectores', where: 'Marca y contrato', detail: 'Contrato y localidad', cita: 'Visita', order: 'Orden', state: 'Estado', action: 'Acción en una retirada real',
      byLoc: 'Por ubicación', refLabel: 'Campaña', nLabel: 'Detectores', qtyLabel: 'Minutos de técnico', listLabel: 'Hogares afectados'
    },
    cu: {
      title: 'Destinatarios a avisar', sub: (n, d) => `${n0(n)} hogares con ${n0(d)} detectores · 14 instalaciones de hoy a retener`,
      holdsTitle: 'Acciones en el hub',
      h1: (P) => `Retener las ${P.n} instalaciones de hoy con detectores del lote`, h1Meta: (P) => [`${P.det} detectores`, P.route, 'Samsara Flota'],
      h1Body: (P) => `En una retirada real, el Jefe de instalaciones descarga de las furgonetas los ${P.det} detectores de la ${P.route} y los cambia por unidades de otro lote antes de salir.`,
      h2: (n) => `Bloquear la salida de los ${n0(n)} detectores del almacén`, h2Meta: ['hoy', 'Lote PIR-2607-A', 'SAP Business One'],
      h2Body: 'Siguen disponibles para instalar: en una retirada real se bloquean en SAP Business One hasta que el fabricante indique su destino. Listado por n.º de serie en la pestaña «Hogares afectados» y en el CSV.',
      h3: 'Reforzar el mantenimiento', h3Meta: (n, h) => [`${n0(n)} visitas`, `${n0(h)} h`, 'Samsara Flota'],
      h3Body: 'Las visitas de sustitución compiten con 118 mantenimientos, 9 urgentes y 38 paneles sin respaldo de la alarma ALM-COM-0611: en una retirada real se refuerzan las rutas con técnicos de instalación y se priorizan los hogares con dos detectores.'
    },
    ap: {
      title: 'Retirada y avisos del simulacro',
      s1: 'Hogares con detectores de la campaña', s1v: (n, d) => `${n0(n)} hogares · ${n0(d)} detectores`,
      s2: 'Instalaciones de hoy a retener', s2v: (P) => `${P.route} · ${P.n} instalaciones · ${P.det} detectores`,
      s3: 'Salida de almacén que se bloquearía', s3v: (n) => `${n0(n)} detectores en los tres almacenes`, s3c: 'Sin bloqueo en simulacro',
      s4: 'Mantenimiento', s4v: (n) => `Programar las ${n0(n)} visitas de sustitución pendientes (OT en Salesforce)`,
      effects: (n) => [
        `Twilio SMS y correo: ${n0(n)} avisos guardados como borrador con la marca SIMULACRO; no se envía nada`,
        `Salesforce CRM: registro de la retirada y ${n0(n)} solicitudes de visita en borrador, sin programar`,
        'SAP Business One: sin cambios; en un simulacro no se bloquea el stock ni se retiene ninguna salida',
        'Registro {code} aprobado con los tiempos de cada actividad'
      ]
    },
    rp: {
      objeto: 'Simulacro de retirada de producto con punto de partida en {label}. Se comprueba la trazabilidad hacia atrás (aviso del fabricante, lote y recepciones) y hacia delante (hogares por marca, almacén, furgonetas y mantenimiento), con el balance de detectores de la campaña.',
      noAction: 'El ejercicio no bloquea stock, no retiene salidas y no envía avisos.',
      results: (n, k) => [
        `${n0(n)} hogares en la Comunitat Valenciana (Verisure 540, Sector Alarm 214 y Prosegur Alarmas 158) y 14 instalaciones de hoy que se retendrían.`,
        'Las 912 visitas de sustitución suman 532 h de técnico y compiten con 118 mantenimientos y 9 urgencias: hace falta reforzar las rutas.',
        `Se bloquearía la salida de ${n0(k)} detectores del almacén.`
      ],
      bc1: 'Etapa', bc2: 'Referencia', bc3: 'Fecha', bc4: 'Detalle',
      backRows: (t, r, ret) => [
        { etapa: 'Fabricante', ref: 'REC-2026-1019', fecha: '16/10/2026', det: 'Aviso de Sentinela Electronics · detector PIR-200 · riesgo de sobrecalentamiento de la batería de litio' },
        { etapa: 'Lote', ref: 'PIR-2607-A', fecha: '07/2026', det: `Lote afectado · ${n0(t)} detectores recibidos en Guardián Ibérica` },
        { etapa: 'Recepción 1', ref: 'ENT-PIR-2607-1', fecha: '09/07/2026', det: `${n0(r[0])} detectores recibidos en el almacén de Paterna` },
        { etapa: 'Recepción 2', ref: 'ENT-PIR-2607-2', fecha: '21/07/2026', det: `${n0(r[1])} detectores recibidos` },
        { etapa: 'Recepción 3', ref: 'ENT-PIR-2607-3', fecha: '04/08/2026', det: `${n0(r[2])} detectores recibidos` },
        { etapa: 'Devoluciones', ref: 'RMA-2026-0908', fecha: '08/09/2026', det: `${n0(ret)} detectores devueltos al fabricante` },
        { etapa: 'Instalaciones', ref: 'INS-2026', fecha: '20/07 a 15/10/2026', det: '1.386 detectores instalados en 912 hogares · Verisure, Sector Alarm y Prosegur Alarmas' },
        { etapa: 'Retirada', ref: 'REC-2026-1019', fecha: '19/10/2026', det: `${n0(t)} detectores localizados · objetivo: localizar y avisar en 4 h` }
      ],
      fwdExtra: (P, s) => [
        { ped: 'FURGONETAS', cliente: `Furgonetas de hoy (${P.n} instalaciones, ${P.route})`, date: '19/10/2026', n: s.van, fin: '—' },
        { ped: 'ALM-VLC', cliente: 'Almacén Paterna (sin bloquear)', date: '—', n: s.pat, fin: '—' },
        { ped: 'ALM-ALC', cliente: 'Almacén Alicante (sin bloquear)', date: '—', n: s.alc, fin: '—' },
        { ped: 'ALM-CAS', cliente: 'Almacén Castellón (sin bloquear)', date: '—', n: s.cas, fin: '—' }
      ],
      conclusion: 'Conclusión: la información necesaria para una retirada se obtiene completa y la campaña cuadra detector a detector. Acciones de mejora propuestas: reservar capacidad de mantenimiento al abrirse cada campaña y vincular los n.º de serie del lote con las órdenes de instalación de las furgonetas en Samsara Flota.',
      note: 'Simulacro: no se ha bloqueado ningún detector, no se ha retenido ninguna salida y no se ha enviado ningún aviso. Datos sintéticos de demostración.'
    },
    audit: { back: 'aviso REC-2026-1019 · lote PIR-2607-A · recepciones 07/2026 y 08/2026', fwd: (t, n) => `${n0(t)} detectores · ${n0(n)} hogares · 14 instalaciones de hoy` },
    say: (P, k, n) => [
      `Lo accionable: la ${P.route} (${P.n} instalaciones de hoy) se retendría y se bloquearía la salida de ${n0(k)} detectores del almacén.`,
      `Los avisos van a ${n0(n)} hogares con su contrato y su n.º de serie; los titulares reciben SMS y correo. En un simulacro no se envía nada. Decide el Responsable de operaciones.`
    ],
    title: 'Simulacro de retirada de producto', nav: 'Retiradas de producto', section: 'Calidad',
    desc: 'Ejercicio de trazabilidad para campañas de retirada del fabricante: genealogía hacia atrás y hacia delante, del aviso al detector y al hogar, balance de detectores y titulares a avisar, a partir de una campaña o de un n.º de serie.',
    place: 'Hub de operaciones · Paterna (Valencia)',
    approver: 'Responsable de operaciones',
    agents: { trace: 'Trazabilidad', bal: 'Balance de detectores', rec: 'Retirada y avisos' },
    targetText: 'Objetivo ilustrativo: 4 h', todayEstimate: '2–5 h', timerRef: 'Objetivo demo: 4 h', packLabel: 'Descargar paquete de la retirada',
    setup: { title: 'Punto de partida', sub: 'Una campaña de retirada del fabricante o el n.º de serie de un detector' },
    m: {
      recall: 'Campaña', recallNoun: 'la campaña', recallField: 'Código de campaña', recallWhere: 'SAP Business One · Salesforce CRM', recallLabel: (c) => `Campaña ${c}`, recallOption: 'Detector PIR-200 · lote PIR-2607-A · batería de litio · 912 hogares',
      serLabel: 'N.º de serie', vinNoun: 'el n.º de serie', vinField: 'N.º de serie del detector', serWhere: 'SAP Business One · portales de partner',
      vinOption: (h) => `Detector instalado en ${h ? h.brand.label : 'un hogar'} · sin visita de sustitución programada`,
      vinHeadline: (v, c) => `Serie ${v} · instalado en un hogar (campaña ${c}) → se traza la campaña completa`,
      vinResult: (v, h, c) => `Detector ${v} · PIR-200 lote PIR-2607-A · instalación ${h ? h.id : ''} (${h ? h.brand.label : ''}) sin visita de sustitución → se traza la campaña ${c} completa`
    },
    reference: {
      title: 'Referencia de auditoría',
      sub: 'Objetivo del ejercicio; Operaciones confirma los requisitos del fabricante y de los partners',
      items: [
        ['Reglamento (UE) 2023/988', 'Seguridad general de los productos: el fabricante comunica la campaña y el distribuidor colabora en localizar y avisar a los usuarios afectados.'],
        ['Contratos de partner', 'Seguimiento de la campaña en el Verisure Partner Portal, el Sector Alarm Partner Hub y el Prosegur Partner Portal hasta cerrar cada expediente. Objetivo ilustrativo del ejercicio: localizar y avisar a todos los hogares en 4 horas.'],
        ['PR-QLT-006', 'Procedimiento interno de retirada de producto: Operaciones decide el alcance y aprueba los avisos.']
      ],
      note: 'Un simulacro no bloquea stock, no retiene salidas ni envía avisos: se mide si la información se obtiene completa, cuadra y a tiempo.'
    },
    legend: { planned: 'Salida de hoy: retener', click: 'Cada tarjeta resume una fase de la campaña' },
    noticeCfg: { title: 'Simulacro de retirada' },
    approvalCfg: { policy: 'PR-QLT-006 · bloquear stock o retener salidas requiere la aprobación del Responsable de operaciones', approveLabel: 'Aprobar y cerrar simulacro', rejectPlaceholder: 'Por ejemplo: falta confirmar el contacto de un titular con teléfono desactualizado' },
    clock: { title: 'Cronómetro frente a objetivo', sub: 'Tiempos de la simulación; no son medidas de rendimiento de los sistemas' },
    reportCfg: { subtitle: 'Registro del ejercicio de trazabilidad y retirada · Reglamento (UE) 2023/988 · PR-QLT-006' },
    compare: {
      rows: [
        { k: 'Personas implicadas', today: '3–4: Operaciones, Almacén, Soporte técnico y Atención al cliente', agentic: '1: {approver} revisa y aprueba' },
        { k: 'Sistemas consultados', today: '6–7 abiertos a mano: Salesforce, SAP, tres portales de partner, Samsara y hojas de cálculo', agentic: '7 conectores consultados por los agentes: SAP Business One, Salesforce CRM, los tres portales de partner, Samsara Flota y Twilio SMS' },
        { k: 'Pasos', today: '15–20 consultas, cruces de series con contratos y visitas y cálculos manuales', agentic: '{steps} pasos automáticos y 1 aprobación' },
        { k: 'Balance de detectores', today: 'Hoja de cálculo con recepciones, instalaciones, almacén y devoluciones', agentic: 'Calculado por n.º de serie y contrato: {reconciled} conciliado' }
      ]
    },
    presenter: (c, v) => ({
      idle: [
        'Simulacro de retirada con trazabilidad y balance de detectores; en el piloto Operaciones confirma el protocolo y medimos el tiempo real.',
        `Se elige el punto de partida: la campaña ${c} (batería de litio del PIR-200, lote PIR-2607-A) o el n.º de serie de un detector afectado.`,
        'Agentic Platform recorre SAP Business One, Salesforce y los tres portales de partner hacia atrás hasta el aviso y las recepciones, y hacia delante hasta los hogares, el almacén y las furgonetas, y cuadra la campaña detector a detector.'
      ],
      nextIdle: `Pulsar «Iniciar simulacro» con la campaña ${c} (o elegir «N.º de serie ${v}»).`,
      nextRun: 'Pulsar «Ver aviso» de una marca y después «Aprobar y cerrar simulacro».',
      nextDone: '«Descargar paquete de la retirada»: CSV de hogares y registro imprimible. Después, «Cuestionario de cliente» (flecha derecha).'
    })
  };


  const CAMP = 'REC-2026-1019';
  const LOT = 'PIR-2607-A';
  const SER_PFX = 'PIR200-2607A-';
  const PLANNED = { n: 14, det: 36, route: 'RUTA-INS-1019' };

  /* Marcas (portales de partner): hogares, detectores instalados y visitas de mantenimiento ya programadas */
  const BRANDS = [
    { id: 'ver', label: 'Verisure', short: 'VS', homes: 540, dets: 820, visits: 82, base: 30000, step: 3, portal: 'Verisure Partner Portal' },
    { id: 'sec', label: 'Sector Alarm', short: 'SA', homes: 214, dets: 325, visits: 33, base: 60000, step: 7, portal: 'Sector Alarm Partner Hub' },
    { id: 'pro', label: 'Prosegur Alarmas', short: 'PA', homes: 158, dets: 241, visits: 25, base: 40000, step: 5, portal: 'Prosegur Partner Portal' }
  ];
  const DELS = [
    { id: 'VLC', cities: ['Paterna', 'Valencia', 'Burjassot', 'Torrent', 'Mislata', 'Sagunto'] },
    { id: 'ALC', cities: ['Alicante', 'Elche', 'Benidorm', 'Elda'] },
    { id: 'CAS', cities: ['Castellón', 'Vila-real', 'Benicàssim'] }
  ];
  const RECS = [{ id: 'R1', date: '2026-07-09', n: 1200 }, { id: 'R2', date: '2026-07-21', n: 800 }, { id: 'R3', date: '2026-08-04', n: 400 }];
  const STK = { pat: 584, van: PLANNED.det, alc: 210, cas: 130 };
  const N_RET = 54;
  const MIN_JOB = 35;

  const fmtD = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '');
  const dm = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}` : '');
  const plural = (n, a, b) => `${n0(n)} ${n === 1 ? a : b}`;
  const det = (n) => plural(n, S.detOne, S.detMany);
  const home = (n) => plural(n, S.homeOne, S.homeMany);
  const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
  const pad = (n, w) => String(n).padStart(w, '0');
  const uniq = (a) => a.filter((x, i) => a.indexOf(x) === i);

  /* ---------------------------------------------------------------- Hogares (instalaciones) */

  const VISIT_DAYS = ['22', '23', '26', '27', '28', '29', '30'];
  const HOMES = [];
  let serial = 0;
  let seq = 0;
  BRANDS.forEach((b, bi) => {
    const extra = b.dets - b.homes;
    for (let i = 0; i < b.homes; i += 1) {
      seq += 1;
      const del = DELS[i % 10 < 6 ? 0 : i % 10 < 9 ? 1 : 2];
      const dets = 1 + (Math.floor(((i + 1) * extra) / b.homes) > Math.floor((i * extra) / b.homes) ? 1 : 0);
      const visit = Math.floor(((i + 1) * b.visits) / b.homes) > Math.floor((i * b.visits) / b.homes);
      const date = new Date(Date.UTC(2026, 6, 20 + ((i * 7 + bi * 11) % 88))).toISOString().slice(0, 10);
      const first = serial + 1;
      serial += dets;
      HOMES.push({
        brand: b, del, city: del.cities[i % del.cities.length], dets, visit, date, first,
        id: `INS-2026-${del.id}-${pad(10000 + seq, 5)}`,
        contract: `${b.short}-2026-${pad(b.base + i * b.step, 5)}`,
        ot: visit ? `OT-2026-${pad(5000 + seq, 5)}` : '',
        vdate: visit ? `${VISIT_DAYS[seq % VISIT_DAYS.length]}/10/2026` : ''
      });
    }
  });
  const serialOf = (h) => `${SER_PFX}${pad(h.first, 4)}`;
  const N_HOMES = HOMES.length;
  const N_INST = sum(HOMES, (h) => h.dets);
  const N_STK = STK.pat + STK.van + STK.alc + STK.cas;
  const N_STK_FREE = N_STK - STK.van;
  const TOTAL = N_INST + N_STK + N_RET;
  const N_VISIT = HOMES.filter((h) => h.visit).length;
  const N_UNSCHED = N_HOMES - N_VISIT;
  const minOf = (n) => n * MIN_JOB;
  const hoursOf = (n) => Math.round(minOf(n) / 60);
  const byBrand = (b) => HOMES.filter((h) => h.brand === b);

  const CHIPS = { visit: { status: 'pending', label: S.chip.visit }, novisit: { status: 'critical', label: S.chip.novisit } };
  const homeRows = HOMES.map((h) => ({
    vin: h.id,
    plate: h.dets === 1 ? serialOf(h) : `${serialOf(h)} +1`,
    model: S.modelOf(h.dets),
    modelSub: S.lotLine(LOT),
    where: h.brand.label,
    whereSub: `${h.contract} · ${h.city}`,
    cita: h.visit ? h.vdate : '—',
    citaSub: h.visit ? h.ot : S.noVisit,
    estado: h.visit ? CHIPS.visit : CHIPS.novisit,
    accion: h.visit ? S.actions.visit : S.actions.novisit
  }));

  /* ---------------------------------------------------------------- Avisos */

  function noticeOf(b) {
    const hs = byBrand(b);
    const h0 = hs[0];
    const subj = S.subject(b.homes);
    const parts = [
      S.greeting,
      S.intro(b.label),
      [S.lCamp(CAMP), S.lDet(LOT), S.lInst(h0.id, serialOf(h0))].join('\n'),
      S.reason,
      S.ask,
      S.partnerLine(b.label)
    ];
    parts.push(S.drill);
    parts.push(S.sign);
    return { lang: S.lang, headers: { From: S.from, To: S.to(b.label, b.homes), Subject: subj }, subject: subj, body: parts.join('\n\n'), highlights: [CAMP, h0.id] };
  }

  const items = BRANDS.map((b) => {
    const body = [S.brandBody(b.homes, b.dets, b.visits)];
    if (b.id === 'sec') body.push(S.secNote);
    return { id: b.id, label: b.label, icon: 'building', notify: true, channel: S.channelBrand, meta: [S.region, S.nd.partnerK, S.noticeLang], body: body.join(' '), notice: noticeOf(b), refs: `${b.short}-2026 · ${home(b.homes)}`, qtyText: det(b.dets), action: S.brandAction };
  });
  items.push({ id: 'almacen', label: S.almLabel, icon: 'warehouse', notify: false, chip: S.internal, channel: S.channelAlm, meta: S.almMeta, body: S.almBody, refs: LOT, qtyText: det(N_STK), action: S.almAction });
  items.push({ id: 'mant', label: S.mantLabel, icon: 'wrench', notify: false, chip: S.internal, channel: S.channelMant, meta: S.mantMeta, body: S.mantBody, refs: `${home(N_UNSCHED)}`, qtyText: S.hours(hoursOf(N_HOMES)), action: S.mantAction });
  items.push({ id: 'fab', label: S.fabLabel, icon: 'factory', notify: false, chip: S.chipFab, channel: S.channelFab, meta: S.fabMeta, body: S.fabBody, refs: CAMP, qtyText: det(TOTAL), action: S.fabAction });

  /* ---------------------------------------------------------------- Genealogía */

  const recNode = (r) => ({ id: r.id, stage: 'ent', kicker: S.nd.entK, title: fmtD(r.date), sub: det(r.n), meta: S.nd.entMeta, tone: 'shipped', reveal: 2 });
  const nodes = [
    { id: 'BOL', stage: 'fab', kicker: S.nd.bolK, title: CAMP, mono: true, sub: S.nd.bolSub, meta: S.nd.bolMeta, alert: S.nd.bolAlert, alertTone: true, reveal: 1 },
    { id: 'MOD', stage: 'fab', kicker: S.nd.modK, title: LOT, mono: true, sub: S.nd.modSub, meta: S.nd.modMeta, reveal: 1 }
  ].concat(RECS.map(recNode)).concat([
    { id: 'INS', stage: 'est', kicker: S.nd.insK, title: det(N_INST), sub: S.nd.insSub(BRANDS), meta: S.nd.insMeta, alert: S.nd.insAlert, alertTone: true, tone: 'customer', reveal: 3 },
    { id: 'ALM', stage: 'est', kicker: S.nd.almK, title: det(N_STK), sub: S.nd.almSub(STK), meta: S.nd.almMeta, alert: S.nd.almAlert, alertTone: true, tone: 'stock', reveal: 3 },
    { id: 'DEV', stage: 'est', kicker: S.nd.devK, title: det(N_RET), sub: S.nd.devSub, meta: S.nd.devMeta, tone: 'shipped', reveal: 3 },
    { id: 'MP', stage: 'tal', kicker: S.nd.mpK, title: home(N_VISIT), sub: S.nd.mpSub, meta: S.nd.mpMeta, tone: 'shipped', reveal: 4 },
    { id: 'MS', stage: 'tal', kicker: S.nd.msK, title: home(N_UNSCHED), sub: S.nd.msSub(BRANDS.map((b) => b.homes - b.visits)), meta: S.nd.msMeta(hoursOf(N_HOMES)), alert: S.nd.msAlert, alertTone: true, tone: 'planned', reveal: 4 },
    { id: 'MF', stage: 'tal', kicker: S.nd.mfK, title: det(PLANNED.det), sub: S.nd.mfSub(PLANNED), meta: S.nd.mfMeta, alert: S.nd.mfAlert, alertTone: true, tone: 'planned', reveal: 4 }
  ]);
  BRANDS.forEach((b) => nodes.push({ id: `C:${b.id}`, stage: 'cli', kicker: S.nd.partnerK, title: b.label, sub: `${home(b.homes)} · ${det(b.dets)}`, tone: 'customer', reveal: 5 }));
  const edges = [['BOL', 'MOD'], ['MOD', 'R1'], ['MOD', 'R2'], ['MOD', 'R3'], ['R1', 'INS'], ['R2', 'INS'], ['R3', 'INS'], ['R1', 'ALM'], ['R2', 'ALM'], ['R3', 'ALM'], ['R1', 'DEV'], ['INS', 'MP'], ['INS', 'MS'], ['ALM', 'MF']];
  BRANDS.forEach((b) => edges.push(['INS', `C:${b.id}`]));

  /* ---------------------------------------------------------------- Tablas */

  const groups = [];
  BRANDS.forEach((b) => DELS.forEach((d) => {
    const hs = HOMES.filter((h) => h.brand === b && h.del === d);
    const dates = hs.map((h) => h.date).sort();
    groups.push({ ped: `${b.short}-${d.id}`, cliente: `${b.label} · ${S.dels[d.id]}`, sub: `${home(hs.length)} · ${S.list(uniq(hs.map((h) => h.city)).slice(0, 3))}`, date: `${dm(dates[0])} – ${dm(dates[dates.length - 1])}`, n: sum(hs, (h) => h.dets), fin: n0(hs.length), located: S.pct100 });
  }));
  const saleRows = groups;

  const locRows = [
    { ref: CAMP, where: S.loc.van, whereSub: S.loc.vanSub(PLANNED), n: STK.van, qty: null, action: S.loc.vanAct, tone: 'crit' },
    { ref: CAMP, where: S.loc.pat, whereSub: S.loc.patSub, n: STK.pat, qty: null, action: S.loc.stkAct, tone: 'warn' },
    { ref: CAMP, where: S.loc.alc, whereSub: S.loc.stkSub, n: STK.alc, qty: null, action: S.loc.stkAct, tone: 'warn' },
    { ref: CAMP, where: S.loc.cas, whereSub: S.loc.stkSub, n: STK.cas, qty: null, action: S.loc.stkAct, tone: 'warn' }
  ].concat(BRANDS.map((b) => ({ ref: CAMP, where: S.loc.homes(b.label), whereSub: `${home(b.homes)} · ${S.loc.homesSub(b.portal)}`, n: b.dets, qty: minOf(b.homes), action: S.loc.homeAct, tone: 'warn' })))
    .concat([{ ref: CAMP, where: S.loc.ret, whereSub: S.loc.retSub, n: N_RET, qty: null, action: S.loc.retAct, tone: '' }]);

  const flowDet = {
    key: 'veh', seg: S.fl.seg1, main: true, unit: S.fl.unit1, colLabel: S.fl.col1,
    title: S.fl.title1(CAMP),
    inLabel: S.fl.in1, inSub: S.fl.in1Sub, inStage: 'SAP B1', inQty: TOTAL,
    phases: [{ title: S.fl.phase1, date: '2026-09-08', stages: [['SAP B1', S.fl.loss1, N_RET]] }],
    outsTitle: S.fl.outsTitle,
    outs: BRANDS.map((b) => ({ label: b.label, sub: S.fl.oBrandSub(b.homes, b.portal), stage: 'Portal', qty: b.dets }))
      .concat([
        { label: S.fl.oPat, sub: S.fl.oPatSub, stage: 'SAP B1', qty: STK.pat, kind: 'stock' },
        { label: S.fl.oVan, sub: S.fl.oVanSub(PLANNED), stage: 'Samsara', qty: STK.van, kind: 'stock' },
        { label: S.fl.oAlc, sub: S.fl.oStkSub, stage: 'SAP B1', qty: STK.alc, kind: 'stock' },
        { label: S.fl.oCas, sub: S.fl.oStkSub, stage: 'SAP B1', qty: STK.cas, kind: 'stock' }
      ])
  };
  const flowMin = {
    key: 'taller', seg: S.fl.seg2, unit: 'min', colLabel: S.fl.col2,
    title: S.fl.title2(CAMP),
    inLabel: S.fl.in2, inSub: S.fl.in2Sub(N_HOMES, MIN_JOB), inStage: 'Salesforce', inQty: minOf(N_HOMES),
    phases: [],
    outsTitle: S.fl.outsTitle2,
    outs: [{ label: S.fl.m1, sub: S.fl.m1Sub(N_VISIT), stage: 'Salesforce', qty: minOf(N_VISIT) }]
      .concat(BRANDS.map((b) => ({ label: S.fl.m2(b.label), sub: S.fl.m2Sub(b.homes - b.visits), stage: 'Salesforce', qty: minOf(b.homes - b.visits), kind: 'stock' })))
  };

  const SYSTEMS = ['SAP Business One', 'Salesforce CRM', 'Verisure Partner Portal', 'Sector Alarm Partner Hub', 'Prosegur Partner Portal', 'Samsara Flota', 'Twilio SMS'];
  const [VER, SEC, PRO] = BRANDS;

  const scope = {
    headline: S.headline(CAMP, TOTAL),
    previewSide: S.previewSide(TOTAL, N_HOMES),
    startNode: 'BOL',
    stages: [
      { id: 'fab', label: S.st.fab, icon: 'factory' },
      { id: 'ent', label: S.st.ent, icon: 'truck' },
      { id: 'est', label: S.st.est, icon: 'warehouse' },
      { id: 'tal', label: S.st.tal, icon: 'wrench' },
      { id: 'cli', label: S.st.cli, icon: 'building', count: N_HOMES }
    ],
    nodes,
    edges,
    systems: SYSTEMS,
    genSub: S.genSub(TOTAL, N_HOMES),
    steps: [
      { agent: 'trace', system: 'SAP Business One', action: S.step[0][0], result: S.step[0][1](CAMP, LOT), ms: 190, reveal: 0, mark: S.mk[0] },
      { agent: 'trace', system: 'SAP Business One', action: S.step[1][0], result: S.step[1][1](CAMP, LOT, TOTAL), ms: 430, reveal: 1 },
      { agent: 'trace', system: 'SAP Business One', action: S.step[2][0], result: S.step[2][1](TOTAL, RECS.map((r) => r.n)), ms: 520, reveal: 2, mark: S.mk[1] },
      { agent: 'trace', system: 'SAP Business One', action: S.step[3][0], result: S.step[3][1](N_INST, N_HOMES, N_STK, STK, N_RET), ms: 560, reveal: 3 },
      { agent: 'trace', system: 'Samsara Flota', action: S.step[4][0], result: S.step[4][1](PLANNED), ms: 470, tone: 'warn', reveal: 4, mark: S.mk[2] },
      { agent: 'trace', system: 'Salesforce CRM', action: S.step[5][0], result: S.step[5][1](N_VISIT, N_UNSCHED, hoursOf(N_HOMES), N_HOMES, MIN_JOB), ms: 380, tone: 'warn', reveal: 4 },
      { agent: 'trace', system: VER.portal, action: S.step[6][0], result: S.step[6][1](VER.homes, VER.dets), ms: 590, reveal: 5, mark: S.mk[3] },
      { agent: 'trace', system: SEC.portal, action: S.step[7][0], result: S.step[7][1](SEC.homes, SEC.dets), ms: 540, tone: 'warn', reveal: 5 },
      { agent: 'trace', system: PRO.portal, action: S.step[8][0], result: S.step[8][1](PRO.homes, PRO.dets), ms: 510, reveal: 5 },
      { agent: 'trace', system: 'Salesforce CRM', action: S.step[9][0], result: S.step[9][1](N_HOMES), ms: 480, tone: 'warn', reveal: 5, mark: S.mk[4] },
      { agent: 'bal', system: 'SAP Business One', action: S.step[10][0], result: S.step[10][1](TOTAL, N_RET, N_STK, N_INST), ms: 420 },
      { agent: 'bal', system: 'Agentic Platform', action: S.step[11][0], result: S.step[11][1](TOTAL), ms: 95, tone: 'ok', mark: S.mk[5] },
      { agent: 'rec', system: 'SAP Business One', action: S.step[12][0], result: S.step[12][1](N_HOMES), ms: 360 },
      { agent: 'rec', system: 'Twilio SMS', action: S.step[13][0], result: S.step[13][1](N_HOMES, N_STK_FREE), ms: 720, mark: S.mk[6] }
    ],
    located: { label: S.loc2.label, value: `${n0(TOTAL)} / ${n0(TOTAL)}`, sub: S.loc2.sub(N_INST, N_HOMES, N_STK, N_RET), icon: 'truck', short: S.loc2.short(TOTAL, N_INST, N_HOMES, N_STK, N_RET) },
    kpiNotify: { label: S.kpiNotifyLabel, value: N_HOMES, sub: S.kpiNotifySub(PLANNED) },
    balance: {
      title: S.bal.title,
      kpiLabel: S.bal.kpiLabel,
      sub: S.bal.sub,
      head: S.bal.head,
      headSide: S.bal.headSide(N_HOMES),
      labels: S.bal.labels,
      detailTitle: S.bal.detailTitle,
      criterio: S.bal.criterio,
      reportText: S.bal.reportText,
      flows: [flowDet, flowMin],
      product: {
        title: S.prod.title,
        side: S.prod.side(groups.length, N_INST),
        cols: [
          { label: S.prod.c1, key: 'ped', mono: true },
          { label: S.prod.c2, key: 'cliente', sub: 'sub' },
          { label: S.prod.c3, key: 'date' },
          { label: S.prod.c4, key: 'n', num: true },
          { label: S.prod.c5, key: 'fin', num: true },
          { label: S.prod.c6, key: 'located', num: true, ok: true }
        ],
        rows: saleRows
      }
    },
    units: {
      title: S.un.title,
      sub: S.un.sub(TOTAL, N_HOMES),
      icon: 'truck',
      csvLabel: S.un.csv,
      csvName: S.un.csvName,
      csvCols: [
        { label: S.un.idLabel, key: 'vin' }, { label: S.un.plate, key: 'plate' }, { label: S.un.model, key: 'model' }, { label: S.un.where, key: 'where' }, { label: S.un.detail, key: 'whereSub' },
        { label: S.un.cita, key: 'cita' }, { label: S.un.order, key: 'citaSub' }, { label: S.un.state, key: 'estado' }, { label: S.un.action, key: 'accion' }
      ],
      byLoc: { label: S.un.byLoc, refLabel: S.un.refLabel, whereLabel: S.un.where, nLabel: S.un.nLabel, qtyLabel: S.un.qtyLabel, actionLabel: S.un.action, rows: locRows },
      list: {
        label: S.un.listLabel,
        cols: [
          { label: S.un.idLabel, key: 'vin', mono: true, sub: 'plate' },
          { label: S.un.model, key: 'model', sub: 'modelSub' },
          { label: S.un.where, key: 'where', sub: 'whereSub' },
          { label: S.un.cita, key: 'cita', mono: true, sub: 'citaSub' },
          { label: S.un.state, key: 'estado', chip: true },
          { label: S.un.action, key: 'accion' }
        ],
        rows: homeRows
      }
    },
    customers: {
      title: S.cu.title,
      sub: S.cu.sub(N_HOMES, N_INST),
      items,
      holdsTitle: S.cu.holdsTitle,
      holds: [
        { icon: 'truck', tone: 'crit', title: S.cu.h1(PLANNED), meta: S.cu.h1Meta(PLANNED), body: S.cu.h1Body(PLANNED) },
        { icon: 'lock', tone: 'warn', title: S.cu.h2(N_STK_FREE), meta: S.cu.h2Meta, body: S.cu.h2Body },
        { icon: 'wrench', tone: 'warn', title: S.cu.h3, meta: S.cu.h3Meta(N_HOMES, hoursOf(N_HOMES)), body: S.cu.h3Body }
      ]
    },
    approval: {
      titlePrefix: S.ap.title,
      scope: [
        { label: S.ap.s1, value: S.ap.s1v(N_HOMES, N_INST), status: 'pending', chip: String(N_HOMES) },
        { label: S.ap.s2, value: S.ap.s2v(PLANNED) },
        { label: S.ap.s3, value: S.ap.s3v(N_STK_FREE), status: 'evaluate', chip: S.ap.s3c },
        { label: S.ap.s4, value: S.ap.s4v(N_UNSCHED) }
      ],
      effects: S.ap.effects(N_HOMES)
    },
    report: {
      objeto: S.rp.objeto,
      noAction: S.rp.noAction,
      results: S.rp.results(N_HOMES, N_STK_FREE),
      back: {
        cols: [{ label: S.rp.bc1, key: 'etapa' }, { label: S.rp.bc2, key: 'ref', mono: true }, { label: S.rp.bc3, key: 'fecha' }, { label: S.rp.bc4, key: 'det' }],
        rows: S.rp.backRows(TOTAL, RECS.map((r) => r.n), N_RET)
      },
      fwd: {
        cols: [{ label: S.prod.c1, key: 'ped', mono: true }, { label: S.prod.c2, key: 'cliente' }, { label: S.prod.c3, key: 'date' }, { label: S.prod.c4, key: 'n' }, { label: S.prod.c5, key: 'fin' }],
        rows: saleRows.concat(S.rp.fwdExtra(PLANNED, STK))
      },
      conclusion: S.rp.conclusion,
      note: S.rp.note
    },
    audit: { back: S.audit.back, fwd: S.audit.fwd(TOTAL, N_HOMES) },
    say: S.say(PLANNED, N_STK_FREE, N_HOMES)
  };

  const FIRST_NO = HOMES.find((h) => !h.visit);
  const sample = FIRST_NO ? serialOf(FIRST_NO) : `${SER_PFX}0040`;

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
      recall: { label: S.m.recall, noun: S.m.recallNoun, field: S.m.recallField, icon: 'layers', format: CAMP, where: S.m.recallWhere },
      vin: { label: S.m.serLabel, noun: S.m.vinNoun, field: S.m.vinField, icon: 'barcode', format: `${SER_PFX}0040`, where: S.m.serWhere }
    },
    entries: [
      { mode: 'recall', code: CAMP, scope: 'abs', label: S.m.recallLabel(CAMP), option: S.m.recallOption },
      { mode: 'vin', code: sample, scope: 'abs', label: `${S.m.serLabel} ${sample}`, option: S.m.vinOption(FIRST_NO), headline: S.m.vinHeadline(sample, CAMP), startNode: 'INS', startResult: S.m.vinResult(sample, FIRST_NO, CAMP) }
    ],
    examples: [{ mode: 'recall', code: CAMP, label: S.m.recallLabel(CAMP) }, { mode: 'vin', code: sample, label: `${S.m.serLabel} ${sample}` }],
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

  agenticPack('alarmas', { retirada });
})();
