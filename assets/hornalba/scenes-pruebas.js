/* Hornalba · las tres pruebas comunes a las demos: parte de la red con agente, reclamación de cliente y simulacro de caída de planta. */
(function () {
  'use strict';
  const App = window.App;
  const HB = window.HB;
  const { html, raw, icon, fmt, chip, card, kpi, table, pageHead, button, callout, kv, segmented, timeline, tabs } = App;
  const { T } = HB;
  const EN = !!(window.CN_I18N && window.CN_I18N.english);
  const eur = (v) => fmt.eur(Math.round(v / 100) * 100, 0);

  /* ================================================================ Parte de la red */

  /* [indicador, lectura, unidad, referencia, decimales, observación, acción propuesta] */
  const FINDINGS = {
    'VCZ-L3-ESP-01': ['Vibración del motor de arrastre', 7.62, 'mm/s', 7.1, 2, 'Sube desde hace 13 días; propuesta de intervención preparada.', 'Reducir velocidad y sustituir el rodamiento el viernes.'],
    'VCZ-L1-ENV-01': ['Desviación de temperatura de sellado', 6.4, '°C', 4, 1, 'La mordaza inferior tarda más en recuperar temperatura.', 'Revisar la resistencia de la mordaza en el próximo cambio de formato.'],
    'ROB-SV-AIR-02': ['Presión diferencial del separador', 0.82, 'bar', 0.7, 2, 'El separador de aceite está cerca de su límite.', 'Cambiar separador con el compresor de reserva en marcha.'],
    'MTB-L2-FER-01': ['Desviación de humedad', 7.5, '%', 5, 1, 'La humedad oscila en la zona 2 de la cámara.', 'Comprobar el humidificador y la sonda de la zona 2.'],
    'RIB-SV-FRI-01': ['Temperatura de descarga del compresor', 94, '°C', 90, 0, 'Temperatura de descarga por encima de lo habitual.', 'Revisar la refrigeración del aceite esta semana.'],
    'PSU-L1-PAL-01': ['Intensidad del eje 4', 11.8, 'A', 10, 1, 'Picos de intensidad y dos rearmes en el turno de noche.', 'Sustituir el mazo de cables del eje 4.'],
    'STA-L1-LAM-01': ['Antigüedad de la copia del programa', 116, 'días', 30, 0, 'Copia caducada y reductor del eje 2 con vibración creciente.', 'Copiar el programa en la próxima parada y cambiar el reductor.'],
    'NWL-L2-FRD-01': ['Deriva de la temperatura del aceite', 3.1, '°C', 2, 1, 'El intercambiador pierde rendimiento.', 'Limpiar el intercambiador y revisar la bomba de aceite.'],
    'ESF-L1-AMA-01': ['Intensidad del motor principal', 19.1, 'A', 17, 1, 'Consumo alto con la misma receta.', 'Revisar la transmisión y el engrase.'],
    'PNW-L2-ESP-01': ['Tensión de banda', 1790, 'N', 1700, 0, 'La banda trabaja por encima de la tensión recomendada.', 'Retensar la banda y sustituir tres rodillos.'],
    'RDF-L3-HOR-01': ['Desviación de la zona 2 del horno', 9, '°C', 6, 0, 'La zona 2 no mantiene la consigna.', 'Revisar el quemador y la sonda de la zona 2.'],
    'VAZ-L2-ENV-02': ['Atascos por turno', 14, 'paradas', 6, 0, 'Patrón de desgaste de las mordazas de sellado.', 'Sustituir las mordazas en el cambio de formato del domingo.'],
    'BNL-L2-ESP-01': ['Desescarches fuera de ciclo en 7 días', 5, 'veces', 1, 0, 'Afectan a la temperatura del producto.', 'Revisar la válvula de desescarche y la sonda.'],
    'BNL-L1-LAM-01': ['Diferencia de velocidad entre rodillos', 2.4, '%', 1.5, 1, 'Puede alterar el laminado de la masa.', 'Ajustar la sincronización de los rodillos.']
  };
  const DECISION_OF = {};
  HB.BACKLOG.forEach((d) => { DECISION_OF[d.machine] = d.id; });
  const NEW_IDS = {};
  Object.keys(FINDINGS).filter((id) => !DECISION_OF[id]).forEach((id, i) => { NEW_IDS[id] = `AV-2026-${String(731 + i).padStart(4, '0')}`; });
  const PLANT_RESULT = {
    valdecierzo: ['1 crítica: rodamiento de la espiral · 1 aviso en envasado', 'crit'],
    robledal: ['1 aviso: separador del compresor', 'warn'],
    montalbar: ['1 aviso: humedad en fermentación', 'warn'],
    ribera: ['1 aviso: compresor de frío', 'warn'],
    puertosur: ['1 aviso en el paletizador · datos con retardo', 'warn'],
    saintaubin: ['Copia de programa caducada y reductor con vibración', 'warn'],
    nowawola: ['1 aviso: aceite de la freidora', 'warn'],
    colverde: ['Todo en rango', 'ok'],
    eschenfeld: ['1 aviso: consumo de la amasadora', 'warn'],
    pinewood: ['1 aviso: tensión de la banda', 'warn'],
    redfield: ['1 aviso: horno · planta aún en alta, vista parcial', 'warn'],
    valleazul: ['1 aviso: atascos en envasado', 'warn'],
    binhlac: ['2 avisos: desescarche de la espiral y laminadora', 'warn']
  };
  function finding(m) {
    const f = FINDINGS[m.id];
    if (f) {
      const [metric, value, unit, ref, dec, note, action] = f;
      return { metric, reading: `${fmt.num(value, dec)} ${unit}`, ref: `aviso > ${fmt.num(ref)} ${unit}`, note, action };
    }
    const t = HB.tagsFor(m)[0];
    return { metric: t.desc, reading: `${fmt.num(t.value, t.dec)} ${t.unit}`, ref: t.warn == null ? '—' : `aviso > ${fmt.num(t.warn)} ${t.unit}`, note: '', action: '' };
  }
  function ticketOf(m) {
    if (!FINDINGS[m.id]) return null;
    const dec = DECISION_OF[m.id];
    const done = App.outcome('incidente');
    const wo = m.id === 'VCZ-L3-ESP-01' && done && done.status === 'approved' ? done.wo : null;
    return { id: wo || dec || NEW_IDS[m.id], kind: dec ? 'upd' : 'new' };
  }
  const reviewSteps = () => [
    { agent: 'Orquestador', system: 'Registro de activos', action: 'Reunir las tarjetas del panel', result: `${HB.MACHINES.length} máquinas de ${HB.PLANTS.length} plantas`, ms: 600 },
    ...HB.PLANTS.map((p) => ({ plant: p.id, agent: 'Vigilancia de señales', system: 'Histórico de series', action: `Revisar ${p.name}`, result: PLANT_RESULT[p.id][0], tone: PLANT_RESULT[p.id][1], ms: 520 })),
    { agent: 'Diagnóstico', system: 'SAP PM', action: 'Cruzar hallazgos con órdenes y decisiones abiertas', result: '8 ya tenían decisión abierta · 6 son nuevos', ms: 900 },
    { agent: 'Diagnóstico', system: 'Histórico de series', action: 'Buscar patrones entre plantas', result: 'Tres espirales con síntomas en el lado de arrastre o desescarche', tone: 'warn', ms: 1000 },
    { agent: 'Planificación', system: 'SAP PM', action: 'Crear avisos y actualizar decisiones', result: '6 avisos creados · 8 decisiones actualizadas', tone: 'ok', ms: 900 },
    { agent: 'Orquestador', system: 'Teams', action: 'Publicar el resumen a las jefaturas de planta', result: 'Enviado en el idioma de cada planta (simulado)', tone: 'ok', ms: 600 }
  ];

  App.scene({
    id: 'panel', order: 15, section: 'Operación global', nav: 'Parte de la red', title: 'Parte de la red: todas las tarjetas', icon: 'list-checks',
    badge: (s) => (s.outcomes.parte ? null : { text: '1', tone: 'warn' }),
    presenter: {
      say: ['Cada tarjeta es una máquina, con su indicador más relevante ahora mismo.', 'Revisar esto planta por planta lleva la mañana; el agente lo hace en segundos y deja los avisos creados.', 'Lo que ya tenía una decisión abierta se actualiza, no se duplica.'],
      next: 'Pulsa «Revisar el panel con el agente» y mira cómo recorre las plantas.'
    },
    render(root, ctx) {
      const rep = ctx.local.report || null;
      const filter = ctx.local.filter || 'all';
      const list = HB.MACHINES;
      const st = (m) => HB.statusOf(m);
      const count = (k) => list.filter((m) => st(m) === k).length;
      const found = list.filter((m) => FINDINGS[m.id]);
      const visible = (m) => filter === 'all' || st(m) === filter;

      const cardsHtml = () => html`<div class="hb-board">${HB.PLANTS.map((p) => {
        const ms = list.filter((m) => m.plant === p.id);
        return html`<section class="hb-col" data-plant="${p.id}" ${ms.some(visible) ? '' : raw('hidden')}>
          <header><strong>${p.name}</strong><span>${p.country}</span></header>
          ${ms.map((m) => { const f = finding(m); const t = rep ? ticketOf(m) : null; return html`<button type="button" class="hb-tile tone-${st(m)}${rep ? ' is-reviewed' : ''}" data-tile="${m.id}" ${visible(m) ? '' : raw('hidden')}>
            <span class="hb-tile-top"><span class="code">${m.id}</span><span class="hb-tile-check">${icon(st(m) === 'ok' ? 'check-circle' : 'alert-triangle', 14)}</span></span>
            <span class="hb-tile-name">${m.type}</span>
            <span class="hb-tile-read">${f.reading}</span>
            <span class="hb-tile-metric">${f.metric}</span>
            ${t ? html`<span class="hb-tile-ticket">${t.id}</span>` : ''}
          </button>`; })}
        </section>`;
      })}</div>`;

      const ticketRows = found.slice().sort((a, b) => (st(b) === 'crit') - (st(a) === 'crit'));
      const result = rep ? html`<div class="section" id="parte-result">${card({ title: `Parte generado a las ${fmt.time(rep.at)}`, sub: 'Hallazgos, responsables y acción propuesta', icon: 'file-text', flush: true,
        actions: html`${button({ label: 'Ver en auditoría', size: 'sm', icon: 'history', attrs: { 'data-open-audit': '1' } })}${button({ label: 'Descargar parte (PDF)', size: 'sm', variant: 'primary', icon: 'printer', attrs: { 'data-report': '1' } })}`,
        body: html`<div class="card-body stack">
          ${App.stats([{ label: 'Tarjetas revisadas', value: list.length }, { label: 'Críticas', value: count('crit'), tone: 'crit' }, { label: 'Avisos', value: count('warn'), tone: 'warn' }, { label: 'Avisos nuevos creados', value: Object.keys(NEW_IDS).length }, { label: 'Decisiones actualizadas', value: found.length - Object.keys(NEW_IDS).length, tone: 'ok' }])}
          ${callout({ tone: 'warn', icon: 'repeat', title: 'Lo que ninguna planta ve por sí sola', body: html`<span>Las espirales de Valdecierzo, Pinewood y Binh Lac presentan síntomas a la vez. Conviene revisar el estándar de sellos, tensado y desescarche en toda la red.</span>`, actions: button({ label: 'Ver el plan de mantenimiento', size: 'sm', attrs: { 'data-go': 'mantenimiento' } }) })}
        </div>
        ${table({ dense: true, rows: ticketRows, rowClass: (m) => 'tone-' + st(m), cols: [
          { label: 'Aviso o decisión', render: (m) => { const t = ticketOf(m); return html`<span class="code">${t.id}</span><span class="sub">${t.kind === 'new' ? 'Nuevo' : 'Actualizada'}</span>`; } },
          { label: 'Máquina', render: (m) => html`<span class="code">${m.id}</span><span class="sub">${m.type}</span>` },
          { label: 'Responsable', render: (m) => html`Jefatura de mantenimiento<span class="sub">${HB.plant(m.plant).name}</span>` },
          { label: 'Qué ha visto', render: (m) => finding(m).note },
          { label: 'Acción propuesta', render: (m) => finding(m).action }
        ] })}
        <div class="card-body"><details class="run-log"><summary>${icon('chevron-right', 16)}<span>Registro de ejecución del agente</span></summary><div class="mt-2" id="parte-log"></div></details></div>` })}</div>` : '';

      root.innerHTML = String(html`
        ${pageHead({ title: 'Parte de la red: todas las tarjetas', meta: [{ icon: 'calendar', text: 'Jueves 26/11/2026' }, { icon: 'clock', text: 'Lecturas de las 07:00 (CET)' }],
          actions: rep ? button({ label: 'Descargar parte (PDF)', icon: 'printer', attrs: { 'data-report': '1' } }) : button({ label: 'Revisar el panel con el agente', variant: 'primary', icon: 'play', attrs: { 'data-review': '1' } }) })}
        <div class="kpis">
          ${kpi({ label: 'Máquinas en el panel', value: String(list.length), icon: 'factory', sub: 'Muestra de 13 plantas' })}
          ${kpi({ label: 'Críticas', value: String(count('crit')), icon: 'alert-circle', tone: count('crit') ? 'crit' : 'ok' })}
          ${kpi({ label: 'Avisos', value: String(count('warn')), icon: 'alert-triangle', tone: 'warn' })}
          ${kpi({ label: 'En rango', value: String(count('ok')), icon: 'check-circle', tone: 'ok' })}
        </div>
        <div id="run" class="section" hidden></div>
        ${result}
        <div class="section">${card({ title: 'Panel de máquinas', sub: 'Pulsa una tarjeta para ver su detalle', icon: 'activity',
          actions: segmented({ name: 'board', label: 'Filtrar tarjetas', value: filter, options: [{ value: 'all', label: 'Todas', count: list.length }, { value: 'crit', label: 'Críticas', count: count('crit'), tone: 'crit' }, { value: 'warn', label: 'Avisos', count: count('warn'), tone: 'warn' }, { value: 'ok', label: 'En rango', count: count('ok'), tone: 'ok' }] }),
          body: cardsHtml() })}</div>`);

      if (rep) App.reasoningStream(ctx.$('#parte-log'), reviewSteps(), { title: 'Agente de parte diario', instant: true, start: rep.startedAt, maxHeight: 420 });

      ctx.on('segchange', '[data-seg="board"]', (e) => {
        ctx.setLocal({ filter: e.detail.value });
        const f = e.detail.value;
        ctx.$$('[data-tile]').forEach((el) => { el.hidden = f !== 'all' && st(HB.machine(el.getAttribute('data-tile'))) !== f; });
        ctx.$$('.hb-col').forEach((col) => { col.hidden = !col.querySelector('[data-tile]:not([hidden])'); });
      });
      ctx.on('click', '[data-tile]', (e, el) => {
        const m = HB.machine(el.getAttribute('data-tile'));
        const f = finding(m);
        const t = rep ? ticketOf(m) : null;
        ctx.modal({ title: html`${m.type} · <span class="code">${m.id}</span>`, kicker: HB.plant(m.plant).name,
          body: kv([['Indicador', f.metric], ['Lectura', f.reading], ['Referencia', f.ref], ['Observación', f.note || 'Sin incidencias'], f.action ? ['Acción propuesta', f.action] : null, t ? ['Aviso o decisión', html`<span class="code">${t.id}</span>`] : null]),
          actions: [{ label: 'Cerrar' }, { label: 'Ver ficha de la máquina', variant: 'primary', onClick: () => { ctx.after(20, () => ctx.go('maquina', m.id)); } }] });
      });
      ctx.on('click', '[data-review]', (e, el) => {
        if (ctx.vars.busy) return;
        ctx.vars.busy = true;
        el.disabled = true;
        ctx.$('[data-seg="board"] [data-value="all"]').click();
        const host = ctx.$('#run');
        host.hidden = false;
        const startedAt = App.nowISO();
        ctx.audit('Revisión del panel solicitada', `${list.length} tarjetas`);
        const steps = reviewSteps();
        const run = App.reasoningStream(host, steps, { title: 'Agente de parte diario', signal: ctx.signal, maxHeight: 250, start: startedAt, minDelay: 380,
          onStep: (s, k) => {
            if (s.plant) { const col = ctx.$(`.hb-col[data-plant="${s.plant}"]`); col.classList.remove('is-scanning'); col.querySelectorAll('[data-tile]').forEach((t) => t.classList.add('is-reviewed')); }
            const next = steps[k + 1];
            if (next && next.plant) ctx.$(`.hb-col[data-plant="${next.plant}"]`).classList.add('is-scanning');
          } });
        run.done.then((res) => ctx.after(500, () => {
          ctx.vars.busy = false;
          ctx.setLocal({ report: { at: App.nowISO(), startedAt, ms: res.ms } });
          App.outcome('parte', { status: 'done' });
          ctx.audit('Parte de la red generado', `${found.length} hallazgos · 6 avisos creados · 8 decisiones actualizadas`, 'Agente de parte diario');
          ctx.toast('Parte generado · 6 avisos creados (simulado)', { tone: 'ok' });
          ctx.rerender();
          requestAnimationFrame(() => { const r = ctx.$('#parte-result'); if (r) r.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
        }));
      });
      ctx.on('click', '[data-report]', () => App.printableReport({
        title: 'Parte de la red de plantas', subtitle: 'Revisión de todas las tarjetas del panel', code: 'PARTE-2026-11-26', filename: 'hornalba-parte-de-la-red',
        meta: [['Tarjetas revisadas', String(list.length)], ['Plantas', String(HB.PLANTS.length)], ['Lecturas', '26/11/2026 07:00 CET']],
        sections: [
          { heading: '1. Resumen', text: 'Una máquina crítica en Valdecierzo con propuesta de intervención y trece avisos repartidos por la red. Seis avisos son nuevos y ocho corresponden a decisiones ya abiertas.' },
          { heading: '2. Hallazgos y acciones', table: { cols: [{ label: 'Aviso o decisión', render: (m) => ticketOf(m).id }, { label: 'Máquina', render: (m) => m.id }, { label: 'Planta', render: (m) => HB.plant(m.plant).name }, { label: 'Indicador', render: (m) => finding(m).metric }, { label: 'Lectura', render: (m) => finding(m).reading }, { label: 'Acción propuesta', render: (m) => finding(m).action }], rows: ticketRows } },
          { heading: '3. Patrón entre plantas', text: 'Las espirales de Valdecierzo, Pinewood y Binh Lac presentan síntomas a la vez. Conviene revisar el estándar de sellos, tensado y desescarche en toda la red.' },
          { heading: '4. Máquinas en rango', list: list.filter((m) => !FINDINGS[m.id]).map((m) => html`${m.id} · ${m.type} · ${finding(m).reading}`) }
        ],
        signatures: [{ role: 'Dirección global de Mantenimiento', note: 'Firma' }, { role: 'Jefatura de planta', note: 'Firma' }]
      }));
    }
  });

  /* ================================================================ Reclamación de cliente */

  const MAIL = {
    headers: { From: 'QA Team, Lotus Bay Hospitality <qa@lotusbay-hospitality.example>', To: 'Quality, Binh Lac plant <quality.bnl@hornalba-demo.example>', Date: 'Wed, 25 Nov 2026 18:40 (Binh Lac)', Subject: 'Quality complaint - croissants stuck together with ice - Lot BNL-261118-L2 - Ref LBH-2026-0417' },
    text: `Dear Quality Team,

Two of our hotel kitchens have complained about the product below.

Product: Butter Croissant 70 g, frozen ready to bake
Lot code: BNL-261118-L2
Our reference: LBH-2026-0417
Delivery: 21/11/2026, 48 cases

Many pieces arrived stuck together in blocks with a visible layer of ice crystals. After baking they are flat and the layers are uneven. No foreign bodies and no health issue have been reported. Two photographs are attached and we have kept 6 cases for inspection.

Please confirm receipt within 24 hours and send us your investigation report within 5 working days, including:
- production record and freezing conditions of the lot;
- whether other lots are affected;
- root cause, corrective and preventive actions;
- credit for the affected cases.

Kind regards,
QA Team, Lotus Bay Hospitality`
  };
  const HIGHLIGHTS = [['Butter Croissant 70 g', 'Producto', 'brand'], ['BNL-261118-L2', 'Lote', 'brand'], ['LBH-2026-0417', 'Ref.', ''], ['48 cases', 'Cantidad', ''], ['stuck together in blocks with a visible layer of ice crystals', 'Defecto', 'crit'], ['No foreign bodies and no health issue have been reported', 'Sin riesgo sanitario declarado', 'ok'], ['within 24 hours', 'Plazo', ''], ['within 5 working days', 'Plazo', '']];
  const REPLY_EN = `Dear QA Team,

Thank you for your message. We confirm receipt of complaint LBH-2026-0417 about lot BNL-261118-L2. Our internal reference is NC-BNL-2026-0192.

Our first review of the freezing records shows a temperature deviation on 18 November that may explain the ice and the pieces stuck together. We have held the remaining stock from the affected production hours, including a second lot, BNL-261120-L2.

Please do not use the 48 cases delivered on 21 November. We will arrange their collection and replacement, and our commercial team will confirm the credit.

You will receive the full investigation report, with root cause and actions, by 2 December.

Kind regards,
Quality, Binh Lac plant`;
  const REPLY_ES = `Estimado equipo de Calidad:

Gracias por su mensaje. Confirmamos la recepción de la reclamación LBH-2026-0417 sobre el lote BNL-261118-L2. Nuestra referencia interna es NC-BNL-2026-0192.

La primera revisión de los registros de congelación muestra una desviación de temperatura el 18 de noviembre que puede explicar el hielo y las piezas pegadas. Hemos retenido el stock restante de las horas de producción afectadas, incluido un segundo lote, BNL-261120-L2.

Rogamos no utilicen las 48 cajas entregadas el 21 de noviembre. Organizaremos su recogida y reposición, y nuestro equipo comercial confirmará el abono.

Recibirán el informe completo, con causa raíz y acciones, antes del 2 de diciembre.

Un saludo,
Calidad, planta de Binh Lac`;
  const AIR = [-34.1, -34.0, -34.2, -33.8, -34.0, -30.5, -26.4, -23.1, -22.0, -22.6, -25.3, -29.8, -32.9, -33.8, -34.0].map((value, i) => { const mm = 8 * 60 + 45 + i * 7; return { time: `${String(Math.floor(mm / 60)).padStart(2, '0')}:${String(mm % 60).padStart(2, '0')}`, value }; });
  const RC_STEPS = [
    { agent: 'Conocimiento', system: 'Outlook', action: 'Leer el correo en inglés y extraer los datos', result: '8 datos extraídos · sin riesgo sanitario declarado', ms: 1100 },
    { agent: 'Orquestador', system: 'MES', action: 'Comprobar el lote BNL-261118-L2', result: 'Existe · línea 2 · 18/11 de 06:00 a 14:00 · 1.240 cajas', ms: 900, tone: 'ok' },
    { agent: 'Vigilancia de señales', system: 'Histórico de series', action: 'Leer el PLC de la espiral BNL-L2-ESP-01 en esas horas', result: 'Aire del túnel de −34 °C a −22 °C entre las 09:20 y las 10:00', ms: 1400, tone: 'crit' },
    { agent: 'Diagnóstico', system: 'SCADA', action: 'Explicar la subida de temperatura', result: 'Desescarche fuera de ciclo en plena producción · salida del producto a −11 °C', ms: 1200, tone: 'crit' },
    { agent: 'Ciberseguridad OT', system: 'Repositorio de programas', action: 'Comprobar cambios en el programa del PLC', result: 'Sin cambios esa semana', ms: 700, tone: 'ok' },
    { agent: 'Orquestador', system: 'MES', action: 'Acotar las cajas producidas durante la desviación', result: '318 cajas del lote reclamado', ms: 1000 },
    { agent: 'Vigilancia de señales', system: 'Histórico de series', action: 'Buscar la misma desviación en otros días', result: '20/11: lote BNL-261120-L2, 96 cajas más', ms: 1100, tone: 'warn' },
    { agent: 'Repuestos', system: 'WMS', action: 'Localizar las cajas', result: '308 en almacén · 48 en Lotus Bay Hospitality · 58 en otro distribuidor', ms: 900, tone: 'warn' },
    { agent: 'Diagnóstico', system: 'SAP PM', action: 'Relacionar con averías abiertas', result: 'Coincide con DEC-2602: válvula de desescarche', ms: 800 },
    { agent: 'Conocimiento', system: 'Manuales', action: 'Preparar el informe 8D y la respuesta en inglés', result: 'Borradores listos para revisión', ms: 1500, tone: 'ok' }
  ];
  const LOTS = [
    { lot: 'BNL-261118-L2', where: 'Almacén de Binh Lac', cases: 212, act: 'Bloquear' },
    { lot: 'BNL-261118-L2', where: 'Lotus Bay Hospitality', cases: 48, act: 'Recoger y reponer' },
    { lot: 'BNL-261118-L2', where: 'Segundo distribuidor', cases: 58, act: 'Avisar y bloquear' },
    { lot: 'BNL-261120-L2', where: 'Almacén de Binh Lac', cases: 96, act: 'Bloquear' }
  ];
  const REPORT_8D = [
    { id: 'D1', heading: 'D1 · Equipo', text: 'Calidad y Mantenimiento de la planta de Binh Lac, con apoyo de Ingeniería global.' },
    { id: 'D2', heading: 'D2 · Problema', text: 'Croissants congelados pegados en bloques, con cristales de hielo y laminado irregular tras el horneado. Lote BNL-261118-L2.' },
    { id: 'D3', heading: 'D3 · Contención', text: 'Bloqueo de 308 cajas en almacén, recogida de 48 en el cliente y aviso al segundo distribuidor por 58 cajas.' },
    { id: 'D4', heading: 'D4 · Causa raíz (provisional)', text: 'Desescarche fuera de ciclo del congelador espiral BNL-L2-ESP-01 durante la producción. El producto salió a −11 °C frente a un límite de −18 °C y volvió a congelarse en la caja. Causa técnica probable: válvula de desescarche; pendiente de confirmar al desmontarla.' },
    { id: 'D5', heading: 'D5 · Acciones correctivas', text: 'Sustituir la electroválvula de desescarche y verificar la sonda. Fecha prevista: 05/12.' },
    { id: 'D6', heading: 'D6 · Implantación y comprobación', text: 'Hasta la reparación, desescarche solo fuera de producción y aviso si la salida del producto supera −18 °C durante 5 minutos.' },
    { id: 'D7', heading: 'D7 · Prevención', text: 'Llevar la misma regla de temperatura de salida a las cinco espirales de la red y revisar el programa de desescarche.' },
    { id: 'D8', heading: 'D8 · Cierre', text: 'Pendiente de verificar eficacia durante dos semanas y de la conformidad del cliente.' }
  ];

  App.scene({
    id: 'reclamacion', order: 82, section: 'Calidad y continuidad', nav: 'Reclamación de cliente', title: 'Reclamación LBH-2026-0417', icon: 'mail',
    badge: (s) => (s.outcomes.reclamacion ? null : { text: '1', tone: 'warn' }),
    presenter: {
      say: ['Una reclamación llega en inglés a la planta de Binh Lac.', 'La diferencia es que el agente puede ir a los datos del PLC de la hora exacta en que se fabricó el lote.', 'Encuentra la causa, otro lote afectado y dónde están las cajas. La respuesta no sale sin aprobación.'],
      next: 'Pulsa «Analizar reclamación», revisa la curva de temperatura y aprueba.'
    },
    render(root, ctx) {
      const L = ctx.local;
      const status = L.status || 'new';
      const analysed = status !== 'new';
      const reply = L.reply || REPLY_EN;
      const mail = App.emailView({ headers: MAIL.headers, text: MAIL.text, attachments: ['LBH-0417_photo_1.jpg', 'LBH-0417_photo_2.jpg'], highlights: analysed ? HIGHLIGHTS.map(([text, label, tone]) => ({ text, label: T(label), tone })) : [] });
      const flow = App.planGraph({ title: T('Análisis de la reclamación'), nodeWidth: 160, nodes: HB.graphNodes([
        { id: 'a', kind: 'trigger', label: 'Correo del cliente', sub: 'En inglés', systems: ['Outlook'] },
        { id: 'b', kind: 'agent', label: 'Extraer y validar', sub: 'Lote y producto', systems: ['MES'] },
        { id: 'c', kind: 'agent', label: 'Leer el PLC', sub: 'Horas de fabricación', systems: ['Histórico de series'] },
        { id: 'd', kind: 'agent', label: 'Alcance e informe', sub: 'Otros lotes y 8D', systems: ['WMS', 'SAP PM'] },
        { id: 'e', kind: 'approval', label: 'Aprobación de Calidad', sub: 'Planta de Binh Lac' },
        { id: 'f', kind: 'output', label: 'Respuesta y contención', systems: ['Outlook', 'WMS'] }
      ]).map((n, i) => Object.assign(n, { status: !analysed ? 'pending' : i < 4 ? 'done' : i === 4 ? (status === 'approved' ? 'done' : status === 'rejected' ? 'rejected' : 'waiting') : (status === 'approved' ? 'done' : 'pending') })), edges: [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']] });

      const approval = App.approvalCard({
        id: 'rc', status: status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'pending', approver: 'Responsable de Calidad de Binh Lac', decidedBy: 'Responsable de Calidad de Binh Lac', decidedAt: L.at, editable: true, editLabel: 'Editar respuesta', approveLabel: 'Aprobar y enviar',
        title: 'Enviar la respuesta, bloquear stock y abrir la orden',
        summary: 'Causa probable: desescarche fuera de ciclo durante la producción. El acuse al cliente vence hoy a las 18:40 de Binh Lac.',
        scope: [{ label: 'Cajas a bloquear en almacén', value: '308' }, { label: 'Cajas a recoger o avisar', value: '106' }, { label: 'Lotes afectados', value: '2' }, { label: 'Abono al cliente', value: 'Lo confirma Comercial' }],
        effects: ['El almacén bloquea las 308 cajas', 'Se envía la respuesta al cliente en inglés', 'Se crea la orden de trabajo de la válvula de desescarche', 'Se activa el aviso de temperatura de salida del producto en la línea 2', 'Se avisa al segundo distribuidor'],
        policy: 'Nada sale al cliente sin aprobación'
      });

      root.innerHTML = String(html`
        ${pageHead({ title: 'Reclamación LBH-2026-0417', meta: [{ icon: 'mail', text: 'Recibida el 25/11 a las 18:40 (Binh Lac)' }, { icon: 'map-pin', text: 'Planta de Binh Lac · cliente ficticio' }, { icon: 'calendar', text: 'Informe antes del 02/12' }, html`${status === 'approved' ? chip('ok', 'Respondida') : status === 'rejected' ? chip('neutral', 'Respuesta rechazada') : analysed ? chip('waiting', 'Esperando aprobación') : chip('pending', 'Sin analizar')}`],
          actions: analysed ? button({ label: 'Descargar informe 8D', icon: 'printer', attrs: { 'data-8d': '1' } }) : button({ label: 'Analizar reclamación', variant: 'primary', icon: 'play', attrs: { 'data-analyse': '1' } }) })}
        ${card({ title: analysed ? 'Análisis completado' : 'Qué hará el agente', icon: 'workflow', body: html`${flow}<div id="rc-run" class="mt-4" ${analysed ? raw('hidden') : ''}></div>${analysed ? html`<div class="mt-4">${App.stats([{ label: 'Cajas afectadas en dos lotes', value: 414, tone: 'warn' }, { label: 'Todavía en nuestro almacén', value: 308, tone: 'ok' }, { label: 'Ya entregadas', value: 106, tone: 'crit' }, { label: 'Días hábiles para el informe', value: 4 }])}</div><details class="run-log mt-4"><summary>${icon('chevron-right', 16)}<span>Registro de ejecución del agente</span></summary><div class="mt-2" id="rc-log"></div></details>` : ''}` })}
        ${analysed ? html`<div class="grid cols-7-5 section">
          ${card({ title: 'Lo que registró el PLC el 18/11', sub: 'Temperatura de aire del túnel · hora de Binh Lac · BNL-L2-ESP-01', icon: 'thermometer', iconTone: 'crit',
            actions: button({ label: 'Ver la máquina', size: 'sm', attrs: { 'data-go': 'maquina/BNL-L2-ESP-01' } }),
            body: html`${App.lineChart({ series: AIR, threshold: { value: -30, label: T('Aviso −30') }, critical: { value: -27, label: T('Crítico −27') }, unit: '°C', height: 230, legend: false, seriesLabel: T('Temperatura de aire del túnel'), annotations: [{ x: '09:20', label: T('Desescarche') }] })}<p class="slate small mt-2">El producto de esas horas salió a −11 °C. El límite es −18 °C.</p>` })}
          ${card({ title: 'Dónde están las cajas', icon: 'warehouse', flush: true, body: table({ dense: true, rows: LOTS, cols: [{ label: 'Lote', render: (r) => html`<span class="code">${r.lot}</span><span class="sub">${r.where}</span>` }, { label: 'Cajas', num: true, key: 'cases' }, { label: 'Acción', render: (r) => (status === 'approved' ? chip('ok', r.act) : r.act) }] }) })}
        </div>` : ''}
        <div class="grid ${analysed ? 'cols-2' : ''} section">
          ${card({ title: 'Correo del cliente', sub: analysed ? 'Resaltado lo que el agente ha extraído. El texto no se modifica.' : 'Tal como ha llegado', icon: 'mail', body: mail })}
          ${analysed ? card({ title: 'Ficha de la reclamación', icon: 'clipboard', body: kv([['Cliente', 'Lotus Bay Hospitality (ficticio)'], ['Producto', 'Croissant de mantequilla 70 g, congelado'], ['Lote', html`<span class="code">BNL-261118-L2</span>`], ['Fabricado', '18/11 · línea 2 · 06:00 a 14:00'], ['Defecto', 'Piezas pegadas, hielo y laminado irregular'], ['Riesgo sanitario', 'No declarado; lo confirma Calidad'], ['Evidencias', '2 fotos y 6 cajas guardadas por el cliente'], ['Plazos', 'Acuse en 24 h · informe en 5 días hábiles'], ['Registro', html`<span class="code">NC-BNL-2026-0192</span>`]]) }) : ''}
        </div>
        ${analysed ? html`<div class="grid cols-2 section">
          ${card({ title: 'Informe 8D', sub: 'Borrador preparado por el agente', icon: 'file-text', body: html`<div class="hb-scroll">${App.docPreview({ code: '8D-LBH-2026-0417', title: 'Informe de investigación', org: 'Hornalba · Calidad (documento de ejemplo)', sections: REPORT_8D })}</div>` })}
          ${card({ title: 'Respuesta al cliente', sub: L.reply ? 'Editada por Calidad' : 'Borrador en el idioma del cliente', icon: 'send', body: EN || L.reply ? App.emailView({ headers: { To: MAIL.headers.From, Subject: 'Re: ' + MAIL.headers.Subject }, text: reply })
            : tabs({ id: 'rc-reply', label: 'Idioma de la respuesta', tabs: [{ id: 'en', label: 'Se envía (inglés)', body: App.emailView({ headers: { To: MAIL.headers.From, Subject: 'Re: ' + MAIL.headers.Subject }, text: reply }) }, { id: 'es', label: 'Traducción al español', body: App.emailView({ text: REPLY_ES }) }] }) })}
        </div>
        <div class="section" id="rc-approval">${approval}</div>` : ''}
        ${status === 'approved' ? html`<div class="grid cols-2 section">
          ${card({ title: 'Ejecución', icon: 'check-circle', body: html`<div id="rc-exec"></div>` })}
          ${card({ title: 'Esta reclamación: antes y ahora', sub: 'Estimación frente a simulación', icon: 'scale', flush: true, body: table({ dense: true, rows: [{ k: 'Localizar lote y horas', a: '2 a 4 horas', b: 'Segundos' }, { k: 'Revisar registros de la máquina', a: '1 a 2 días', b: 'Segundos' }, { k: 'Detectar otros lotes', a: 'A menudo no se hace', b: 'Automático' }, { k: 'Redactar 8D y respuesta', a: 'Medio día', b: 'Borrador para revisar' }], cols: [{ label: 'Tarea', key: 'k' }, { label: 'Hoy · estimación', key: 'a' }, { label: 'Con agentes', key: 'b' }] }) })}
        </div>` : ''}
        ${status === 'rejected' ? html`<div class="section">${callout({ tone: 'warn', title: 'Respuesta rechazada', body: html`<span>Motivo: ${L.reason}. No se ha enviado ni bloqueado nada.</span>`, actions: button({ label: 'Reconsiderar', size: 'sm', attrs: { 'data-reopen': '1' } }) })}</div>` : ''}`);

      if (analysed) App.reasoningStream(ctx.$('#rc-log'), RC_STEPS, { title: 'Agente de reclamaciones', instant: true, start: L.startedAt, maxHeight: 360 });
      if (status === 'approved') {
        App.reasoningStream(ctx.$('#rc-exec'), [
          { agent: 'Orquestador', system: 'WMS', action: 'Bloquear las cajas', result: '308 cajas bloqueadas', ms: 700, tone: 'ok' },
          { agent: 'Conocimiento', system: 'Outlook', action: 'Enviar la respuesta', result: 'Enviada a Lotus Bay Hospitality (simulado)', ms: 600, tone: 'ok' },
          { agent: 'Planificación', system: 'SAP PM', action: 'Crear la orden de la válvula', result: `${L.wo} · 05/12`, ms: 700, tone: 'ok' },
          { agent: 'Vigilancia de señales', system: 'Edge', action: 'Activar el aviso de temperatura de salida', result: 'Activo en la línea 2; no cambia el programa del PLC', ms: 700, tone: 'ok' },
          { agent: 'Orquestador', system: 'Outlook', action: 'Avisar al segundo distribuidor', result: 'Aviso enviado (simulado)', ms: 500, tone: 'ok' }
        ], { title: 'Acciones aplicadas (simuladas)', signal: ctx.signal, instant: !ctx.vars.animate });
        ctx.vars.animate = false;
      }

      ctx.on('click', '[data-analyse]', (e, el) => {
        el.disabled = true;
        const startedAt = App.nowISO();
        ctx.audit('Análisis de reclamación lanzado', 'LBH-2026-0417 · solo lectura');
        const run = App.reasoningStream(ctx.$('#rc-run'), RC_STEPS, { title: 'Agente de reclamaciones', signal: ctx.signal, maxHeight: 340, start: startedAt });
        run.done.then(() => ctx.after(600, () => {
          ctx.setLocal({ status: 'analysed', startedAt });
          ctx.audit('Reclamación analizada', 'LBH-2026-0417 · 2 lotes · 414 cajas · 8D y respuesta en borrador', 'Agente de reclamaciones');
          ctx.toast('Reclamación analizada · pendiente de aprobación', { tone: 'ok' });
          ctx.rerender();
        }));
      });
      ctx.on('click', '[data-approval]', async (e, el) => {
        const act = el.getAttribute('data-approval');
        if (act === 'approve') {
          const wo = App.seq('OT-BNL-2026-', 1182, 4);
          ctx.vars.animate = true;
          ctx.setLocal({ status: 'approved', at: App.nowISO(), wo });
          App.outcome('reclamacion', { status: 'approved', wo });
          ctx.audit('Respuesta a reclamación aprobada', `LBH-2026-0417 · 308 cajas bloqueadas · ${wo} (simulado)`, 'Responsable de Calidad de Binh Lac');
          ctx.rerender();
          const x = ctx.$('#rc-exec'); if (x) x.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (act === 'reject') {
          const reason = await App.promptText({ title: 'Rechazar la respuesta', label: 'Motivo', required: true, placeholder: 'Por ejemplo: falta el análisis de las muestras', confirmLabel: 'Rechazar' });
          if (reason == null || !ctx.alive()) return;
          ctx.setLocal({ status: 'rejected', at: App.nowISO(), reason });
          App.outcome('reclamacion', { status: 'rejected' });
          ctx.audit('Respuesta a reclamación rechazada', reason);
          ctx.rerender();
        } else {
          const m = ctx.modal({ title: 'Editar la respuesta al cliente', size: 'lg',
            body: html`<label class="sr-only" for="rc-text">Texto de la respuesta</label><textarea class="textarea" id="rc-text" rows="16" data-no-translate></textarea>`,
            actions: [{ label: 'Cancelar' }, { label: 'Guardar versión', variant: 'primary', onClick: (api) => { const v = api.body.querySelector('textarea').value.trim(); if (!v) return false; ctx.setLocal({ reply: v === REPLY_EN ? null : v }); ctx.audit('Respuesta editada', 'LBH-2026-0417'); ctx.after(30, () => ctx.rerender()); return undefined; } }] });
          m.body.querySelector('textarea').value = reply;
        }
      });
      ctx.on('click', '[data-reopen]', () => { ctx.setLocal({ status: 'analysed' }); App.outcome('reclamacion', null); ctx.rerender(); });
      ctx.on('click', '[data-8d]', () => App.printableReport({
        title: 'Informe 8D · LBH-2026-0417', subtitle: 'Borrador pendiente de verificación', code: '8D-LBH-2026-0417', filename: 'hornalba-8d-lbh-2026-0417',
        meta: [['Cliente', 'Lotus Bay Hospitality (ficticio)'], ['Lote', 'BNL-261118-L2'], ['Registro', 'NC-BNL-2026-0192']],
        sections: REPORT_8D.map((s) => ({ heading: s.heading, text: s.text })).concat([
          { heading: 'Anexo · Cajas afectadas', table: { cols: [{ label: 'Lote', key: 'lot' }, { label: 'Ubicación', key: 'where' }, { label: 'Cajas', key: 'cases', num: true }, { label: 'Acción', key: 'act' }], rows: LOTS } },
          { heading: 'Anexo · Temperatura de aire del túnel el 18/11', table: { cols: [{ label: 'Hora', key: 'time' }, { label: 'Temperatura', num: true, render: (r) => fmt.temp(r.value, 1) }], rows: AIR } }
        ]),
        signatures: [{ role: 'Responsable de Calidad de Binh Lac', note: 'Firma' }, { role: 'Jefatura de mantenimiento', note: 'Firma' }]
      }));
    }
  });

  /* ================================================================ Simulacro de caída de planta */

  /* fam: [producto, t/semana, días de stock fuera de la planta, margen €/t, [[planta que ayuda, t/semana, días para arrancar, sobrecoste €/t]]] */
  const SCEN = {
    valdecierzo: { cold: 640, customers: 38, fam: [
      ['Pan de masa madre', 900, 2, 520, [['robledal', 320, 1, 60], ['puertosur', 180, 1, 90], ['colverde', 120, 3, 210]]],
      ['Panecillos para hostelería', 420, 2, 410, [['robledal', 200, 1, 55], ['eschenfeld', 100, 4, 190]]],
      ['Bollería congelada', 300, 3, 690, [['ribera', 220, 2, 80], ['montalbar', 90, 1, 45]]]] },
    saintaubin: { cold: 210, customers: 17, fam: [
      ['Bollería', 380, 2, 640, [['ribera', 240, 2, 110], ['montalbar', 120, 2, 130]]],
      ['Pastelería', 140, 4, 880, [['nowawola', 60, 3, 240]]]] },
    nowawola: { cold: 880, customers: 64, fam: [
      ['Rosquillas', 1100, 4, 910, [['ribera', 180, 3, 160], ['saintaubin', 90, 4, 190]]],
      ['Bollería', 420, 2, 640, [['ribera', 200, 2, 140], ['colverde', 90, 2, 80]]]] },
    pinewood: { cold: 390, customers: 29, fam: [
      ['Trenzas', 520, 3, 760, [['redfield', 210, 4, 130]]],
      ['Panecillos', 240, 2, 430, [['redfield', 160, 2, 110], ['valleazul', 60, 5, 260]]]] },
    binhlac: { cold: 140, customers: 22, fam: [
      ['Croissants', 160, 5, 820, [['saintaubin', 60, 21, 620], ['montalbar', 80, 21, 580]]],
      ['Pastelería', 60, 8, 900, [['nowawola', 30, 21, 700]]]] }
  };
  const CAUSES = {
    power: { label: 'Corte eléctrico', autonomy: 36, steps: [['Orquestador', 'Edge', 'Detectar que el edge pasa a batería', 'Sin alimentación en toda la planta', 'crit'], ['Vigilancia de señales', 'Histórico de series', 'Estimar la autonomía de las cámaras', '36 horas antes de superar −18 °C', 'warn']],
      restart: [['1', 'Energía y servicios', 'Subestación, aire comprimido y caldera'], ['2', 'Frío', 'Central frigorífica y cámaras antes que las líneas'], ['3', 'Autómatas', 'Comprobar que cada PLC arranca con su programa y consignas'], ['4', 'Líneas', 'Arranque escalonado y primer producto retenido hasta verificar']] },
    cold: { label: 'Fallo de la central de frío', autonomy: 24, steps: [['Vigilancia de señales', 'Histórico de series', 'Detectar pérdida de presión en la central frigorífica', 'Compresores parados', 'crit'], ['Vigilancia de señales', 'Histórico de series', 'Estimar la autonomía de las cámaras', '24 horas antes de superar −18 °C', 'warn']],
      restart: [['1', 'Contener', 'Cerrar cámaras y mover producto por prioridad'], ['2', 'Reparar la central', 'Fabricante del equipo y comprobación de fugas'], ['3', 'Bajar temperatura', 'Espirales y cámaras en consigna antes de producir'], ['4', 'Líneas', 'Arranque escalonado con registro de temperatura']] },
    cyber: { label: 'Ciberataque a los PLC', autonomy: null, steps: [['Ciberseguridad OT', 'Repositorio de programas', 'Detectar programas cambiados sin orden', 'Huellas distintas en varios autómatas', 'crit'], ['Ciberseguridad OT', 'Edge', 'Proponer aislar la red industrial', 'Requiere decisión de una persona; el agente no corta la red', 'warn']],
      restart: [['1', 'Aislar', 'Separar la red industrial y conservar evidencias'], ['2', 'Verificar copias', 'Comparar huellas y elegir la última versión autorizada'], ['3', 'Restaurar', 'Ingeniería carga los programas con la herramienta del fabricante'], ['4', 'Validar', 'Pruebas de seguridad antes de volver a producir']] }
  };
  const DAYS = [{ value: 1, label: '24 h' }, { value: 3, label: '72 h' }, { value: 7, label: '7 días' }, { value: 21, label: '21 días' }];

  function simulate(plantId, cause, days) {
    const s = SCEN[plantId];
    const fam = s.fam.map(([name, week, stockDays, margin, alts]) => {
      const demand = (week * days) / 7;
      const stock = Math.min(demand, (week * stockDays) / 7);
      let rest = demand - stock;
      const moves = [];
      alts.forEach(([pid, cap, lead, extra]) => {
        const t = Math.min(rest, (cap / 7) * Math.max(0, days - lead));
        if (t >= 0.5) { moves.push({ plant: pid, t, extra }); rest -= t; }
      });
      const gap = rest < 0.5 ? 0 : rest;
      return { name, demand, stock, moves, gap, margin, alts, cover: Math.floor(((demand - gap) / demand) * 100), cost: moves.reduce((a, m) => a + m.t * m.extra, 0), lost: gap * margin };
    });
    const sum = (k) => fam.reduce((a, f) => a + f[k], 0);
    const demand = sum('demand');
    const plcs = HB.MACHINES.filter((m) => m.plant === plantId).map((m) => {
      const age = fmt.days(HB.backupOf(m).slice(0, 10), '2026-11-26');
      return { m, age, ready: age <= 30 };
    });
    return {
      fam, demand, gap: sum('gap'), cover: Math.floor(((demand - sum('gap')) / demand) * 100), cost: sum('cost'), lost: sum('lost'), plcs,
      receivers: Array.from(new Set(fam.flatMap((f) => f.moves.map((m) => m.plant)))),
      customers: sum('gap') ? s.customers : Math.round(s.customers * Math.min(1, days / 7)),
      cold: cause === 'cyber' ? 0 : s.cold
    };
  }
  function drillSteps(run, R) {
    const p = HB.plant(run.plant);
    const c = CAUSES[run.cause];
    const mk = ([agent, system, action, result, tone], ms) => ({ agent, system, action, result, tone, ms });
    return [
      mk(c.steps[0], 700), mk(c.steps[1], 800),
      mk(['Orquestador', 'Registro de activos', `Inventariar lo que se para en ${p.name}`, `${p.lines} líneas y ${p.plcs} autómatas`], 700),
      mk(['Planificación', 'MES', 'Calcular la demanda afectada', `${fmt.num(R.demand, 0)} t en el periodo`], 900),
      mk(['Planificación', 'Plan de producción', 'Buscar capacidad compatible en otras plantas', R.receivers.length ? `${R.receivers.length} plantas pueden ayudar` : 'Ninguna llega a tiempo: solo hay stock', R.receivers.length ? 'ok' : 'warn'], 1300),
      mk(['Repuestos', 'WMS', 'Comprobar stock fuera de la planta y producto en riesgo', R.cold ? `${fmt.num(R.cold, 0)} t en las cámaras de la planta` : 'Cámaras no afectadas', R.cold ? 'warn' : 'ok'], 900),
      mk(['Ciberseguridad OT', 'Repositorio de programas', 'Comprobar que los programas se pueden recuperar', R.plcs.every((x) => x.ready) ? 'Todas las copias de la muestra están vigentes' : 'Hay copias caducadas: retrasan el arranque', R.plcs.every((x) => x.ready) ? 'ok' : 'crit'], 900),
      mk(['Conocimiento', 'Outlook', 'Preparar avisos a clientes y al comité de crisis', `${R.customers} clientes en los borradores`], 900),
      mk(['Orquestador', 'Agentic Platform', 'Montar el plan de contingencia', `${R.cover} % de la demanda cubierta`, R.cover >= 90 ? 'ok' : R.cover >= 60 ? 'warn' : 'crit'], 800)
    ];
  }

  App.scene({
    id: 'caida', order: 84, section: 'Calidad y continuidad', nav: 'Caída de una planta', title: 'Simulacro de caída de una planta', icon: 'alert-circle',
    presenter: {
      say: ['¿Qué pasa si mañana se para una planta entera? Hoy la respuesta se construye a base de llamadas.', 'Aquí se elige planta, causa y duración, y sale quién puede fabricar qué, y qué se queda sin cubrir.', 'Prueba Nowa Wola a 7 días: enseña de qué depende de una sola planta. Y Saint-Aubin con ciberataque: la copia caducada importa.'],
      next: 'Elige planta, causa y duración y pulsa «Iniciar simulacro».'
    },
    render(root, ctx) {
      const L = ctx.local;
      const cfg = Object.assign({ plant: 'nowawola', cause: 'power', days: 7 }, ctx.vars.cfg || L.cfg);
      const run = L.run || null;
      const header = pageHead({ title: 'Simulacro de caída de una planta', meta: [{ icon: 'shield', text: 'Ejercicio: no se envía nada ni se toca ninguna planta' }, run ? { icon: 'hash', text: run.code } : null],
        actions: run ? html`${button({ label: 'Nuevo simulacro', icon: 'plus', attrs: { 'data-new': '1' } })}${button({ label: 'Descargar informe (PDF)', variant: 'primary', icon: 'printer', attrs: { 'data-pdf': '1' } })}` : '' });

      if (!run) {
        root.innerHTML = String(html`${header}
          ${card({ title: 'Qué quieres poner a prueba', icon: 'sliders', body: html`<div class="hb-drill">
            <label class="field"><span class="label">Planta que cae</span><select class="select" id="dr-plant">${Object.keys(SCEN).map((id) => html`<option value="${id}" ${cfg.plant === id ? raw('selected') : ''}>${HB.plant(id).name} · ${HB.plant(id).country}</option>`)}</select></label>
            <div class="field"><span class="label">Causa</span>${segmented({ name: 'cause', label: 'Causa', value: cfg.cause, options: Object.keys(CAUSES).map((k) => ({ value: k, label: CAUSES[k].label })) })}</div>
            <div class="field"><span class="label">Duración</span>${segmented({ name: 'days', label: 'Duración', value: cfg.days, options: DAYS })}</div>
            <div>${button({ label: 'Iniciar simulacro', variant: 'primary', icon: 'play', attrs: { 'data-start': '1' } })}</div>
          </div><div id="dr-run" class="mt-4"></div>` })}
          <div class="section">${callout({ tone: 'brand', title: 'Qué usa el simulacro', body: html`<span>Capacidades, stocks, márgenes y clientes son sintéticos. En un piloto saldrían del plan de producción, el almacén y el registro de PLC.</span>` })}</div>`);
        ctx.on('change', '#dr-plant', (e, el) => { ctx.vars.cfg = Object.assign(cfg, { plant: el.value }); });
        ctx.on('segchange', '.seg', (e) => { cfg[e.detail.name] = e.detail.name === 'days' ? Number(e.detail.value) : e.detail.value; ctx.vars.cfg = cfg; });
        ctx.on('click', '[data-start]', (e, el) => {
          el.disabled = true;
          const R = simulate(cfg.plant, cfg.cause, cfg.days);
          const startedAt = App.nowISO();
          ctx.audit('Simulacro de caída iniciado', `${HB.plant(cfg.plant).name} · ${CAUSES[cfg.cause].label} · ${DAYS.find((d) => d.value === cfg.days).label}`);
          const s = App.reasoningStream(ctx.$('#dr-run'), drillSteps(cfg, R), { title: 'Orquestador de contingencias', signal: ctx.signal, maxHeight: 360, start: startedAt });
          s.done.then((res) => ctx.after(600, () => {
            const code = App.seq('SIM-2026-', 7, 3);
            ctx.setLocal({ cfg: Object.assign({}, cfg), run: Object.assign({}, cfg, { code, startedAt, ms: res.ms, status: 'pending' }) });
            ctx.audit('Plan de contingencia preparado', `${code} · ${R.cover} % de la demanda cubierta`, 'Orquestador de contingencias');
            ctx.vars.cfg = null;
            ctx.rerender();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }));
        });
        return;
      }

      const p = HB.plant(run.plant);
      const c = CAUSES[run.cause];
      const R = simulate(run.plant, run.cause, run.days);
      const period = DAYS.find((d) => d.value === run.days).label;
      const tone = R.cover >= 90 ? 'ok' : R.cover >= 60 ? 'warn' : 'crit';
      const outdated = R.plcs.filter((x) => !x.ready);
      const moveText = (f) => (f.moves.length ? f.moves.map((m) => html`<span class="hb-move">${HB.plant(m.plant).name} · ${fmt.num(m.t, 0)} t</span>`) : html`<span class="muted">Nadie llega a tiempo</span>`);
      const graph = App.planGraph({ title: T('Reparto de la producción'), nodeWidth: 190, nodes: HB.graphNodes([
        { id: 'down', kind: 'trigger', kindLabel: 'Planta caída', label: p.name, sub: c.label, status: 'error' },
        ...R.fam.map((f, i) => ({ id: 'f' + i, kind: 'action', kindLabel: 'Producto', label: f.name, sub: `${f.cover} % cubierto`, status: f.cover >= 90 ? 'done' : f.cover >= 60 ? 'waiting' : 'error' })),
        ...R.receivers.map((id) => ({ id: 'r' + id, kind: 'output', kindLabel: 'Fabrica', label: HB.plant(id).name, sub: `${fmt.num(R.fam.reduce((a, f) => a + f.moves.filter((m) => m.plant === id).reduce((b, m) => b + m.t, 0), 0), 0)} t`, status: 'done' }))
      ]), edges: R.fam.flatMap((f, i) => [['down', 'f' + i], ...f.moves.map((m) => ['f' + i, 'r' + m.plant])]) });

      const approval = App.approvalCard({
        id: 'drill', status: run.status, approver: 'Comité de crisis', decidedBy: 'Comité de crisis', decidedAt: run.at, approveLabel: 'Activar el plan (simulacro)',
        title: `Plan de contingencia para ${p.name}`,
        summary: R.gap ? `Quedan ${fmt.num(R.gap, 0)} t sin cubrir. Hay que decidir a qué clientes se prioriza.` : 'Toda la demanda del periodo queda cubierta con stock y traslados.',
        scope: [{ label: 'Duración supuesta', value: period }, { label: 'Producción que se traslada', value: `${fmt.num(R.fam.reduce((a, f) => a + f.moves.reduce((b, m) => b + m.t, 0), 0), 0)} t` }, { label: 'Sobrecoste de fabricar y transportar', value: eur(R.cost) }, { label: 'Margen perdido por lo no cubierto', value: eur(R.lost) }],
        effects: [R.receivers.length ? 'Reservar capacidad en las plantas receptoras' : 'Priorizar el stock existente entre clientes', R.cold ? 'Pedir transporte frigorífico para el producto en riesgo' : 'Mantener las cámaras vigiladas', 'Enviar a cada cliente su aviso, tras revisión comercial', run.cause === 'cyber' ? 'Convocar a ciberseguridad y preparar la restauración de programas' : 'Convocar a mantenimiento y al proveedor del equipo'],
        policy: 'En un simulacro no se ejecuta ninguna acción real'
      });

      root.innerHTML = String(html`${header}
        ${callout({ tone: 'crit', icon: 'alert-circle', title: `Simulacro: ${p.name} parada durante ${period}`, body: html`<span>${c.label}. Hora de inicio ficticia: hoy a las ${fmt.time(run.startedAt)} (CET).</span>` })}
        <div class="kpis mt-4">
          ${kpi({ label: 'Demanda cubierta', value: String(R.cover), unit: '%', icon: 'gauge', tone, sub: `Cubiertas ${fmt.num(R.demand - R.gap, 0)} de ${fmt.num(R.demand, 0)} t` })}
          ${kpi({ label: 'Impacto económico estimado', value: fmt.num((R.cost + R.lost) / 1000, 0), unit: 'mil €', icon: 'euro', sub: 'Sobrecoste más margen perdido' })}
          ${kpi({ label: 'Producto en riesgo en cámaras', value: fmt.num(R.cold, 0), unit: 't', icon: 'snowflake', tone: R.cold ? 'warn' : 'ok', sub: R.cold ? `Autonomía de ${c.autonomy} h` : 'El frío sigue en marcha' })}
          ${kpi({ label: 'Clientes a avisar', value: String(R.customers), icon: 'mail', sub: 'Borradores preparados' })}
        </div>
        <div class="section">${card({ title: 'Reparto de la producción', sub: 'Quién puede fabricar qué mientras dure la parada', icon: 'git-branch', body: graph })}</div>
        <div class="section">${card({ title: 'Cobertura por producto', icon: 'scale', flush: true, body: table({ rows: R.fam, rowClass: (f) => (f.cover >= 90 ? 'tone-ok' : f.cover >= 60 ? 'tone-warn' : 'tone-crit'), cols: [
          { label: 'Producto', render: (f) => html`<strong>${f.name}</strong>` },
          { label: 'Demanda', num: true, render: (f) => `${fmt.num(f.demand, 0)} t` },
          { label: 'Desde stock', num: true, render: (f) => `${fmt.num(f.stock, 0)} t` },
          { label: 'Se fabrica en', render: moveText },
          { label: 'Sin cubrir', num: true, render: (f) => (f.gap ? chip('crit', `${fmt.num(f.gap, 0)} t`) : '0 t') },
          { label: 'Cubierto', num: true, render: (f) => `${f.cover} %` }
        ] }) })}</div>
        <div class="grid cols-2 section">
          ${card({ title: '¿Se pueden recuperar los autómatas?', sub: `Muestra de ${p.name}`, icon: 'cpu', flush: true, body: html`${table({ dense: true, rows: R.plcs, cols: [{ label: 'Máquina', render: (x) => html`<span class="code">${x.m.id}</span><span class="sub">${x.m.type}</span>` }, { label: 'Antigüedad de la copia', num: true, render: (x) => `${fmt.num(x.age, 0)} días` }, { label: 'Estado', render: (x) => (x.ready ? chip('ok', 'Recuperable') : chip('crit', 'Copia caducada')) }] })}${outdated.length && run.cause === 'cyber' ? html`<div class="card-body">${callout({ tone: 'crit', title: 'El arranque se alarga', body: html`<span>Sin una copia vigente habría que reconstruir el programa con el fabricante: se estiman 3 días más.</span>`, actions: button({ label: 'Ver la máquina', size: 'sm', attrs: { 'data-go': 'maquina/' + outdated[0].m.id } }) })}</div>` : ''}` })}
          ${card({ title: 'Orden de rearranque', sub: c.label, icon: 'rotate-ccw', body: timeline({ items: c.restart.map(([n, title, text]) => ({ time: `Paso ${n}`, title, text, tone: 'brand' })) }) })}
        </div>
        <div class="section">${approval}</div>
        <div class="grid cols-2 section">
          ${card({ title: 'Cronómetro', sub: 'Tiempo de la simulación frente a una estimación de hoy', icon: 'clock', body: App.stats([{ label: 'Plan con agentes (simulado)', value: fmt.dur(Math.round(run.ms / 100) / 10), tone: 'ok' }, { label: 'Primer plan hoy (estimación)', value: '4–8 h' }, { label: 'Plan completo hoy (estimación)', value: '1–2 días' }]) })}
          ${card({ title: 'Registro del simulacro', icon: 'history', body: html`<div id="dr-log"></div><div class="mt-3">${button({ label: 'Descargar reparto (CSV)', size: 'sm', icon: 'download', attrs: { 'data-csv': '1' } })}</div>` })}
        </div>`);
      App.reasoningStream(ctx.$('#dr-log'), drillSteps(run, R), { title: 'Orquestador de contingencias', instant: true, start: run.startedAt, maxHeight: 220 });

      ctx.on('click', '[data-new]', () => { ctx.setLocal({ run: null }); ctx.rerender(); });
      ctx.on('click', '[data-approval]', async (e, el) => {
        if (el.getAttribute('data-approval') === 'approve') {
          ctx.setLocal({ run: Object.assign({}, run, { status: 'approved', at: App.nowISO() }) });
          ctx.audit('Plan de contingencia activado (simulacro)', `${run.code} · ${p.name} · sin acciones reales`, 'Comité de crisis');
          ctx.toast('Plan activado en el simulacro: no se ha enviado nada', { tone: 'ok' });
        } else {
          const reason = await App.promptText({ title: 'Rechazar el plan', label: 'Motivo', required: true, placeholder: 'Por ejemplo: la planta receptora no tiene personal', confirmLabel: 'Rechazar' });
          if (reason == null || !ctx.alive()) return;
          ctx.setLocal({ run: Object.assign({}, run, { status: 'rejected', at: App.nowISO() }) });
          ctx.audit('Plan de contingencia rechazado (simulacro)', reason, 'Comité de crisis');
        }
        ctx.rerender();
      });
      const rows = R.fam.map((f) => ({ name: f.name, demand: fmt.num(f.demand, 0), stock: fmt.num(f.stock, 0), moves: f.moves.map((m) => `${T(HB.plant(m.plant).name)} ${fmt.num(m.t, 0)} t`).join(' + ') || '—', gap: fmt.num(f.gap, 0), cover: `${f.cover} %` }));
      const cols = [{ label: 'Producto', key: 'name' }, { label: 'Demanda (t)', key: 'demand' }, { label: 'Desde stock (t)', key: 'stock' }, { label: 'Se fabrica en', key: 'moves' }, { label: 'Sin cubrir (t)', key: 'gap' }, { label: 'Cubierto', key: 'cover' }];
      ctx.on('click', '[data-csv]', () => App.downloadFile(`hornalba-${run.code.toLowerCase()}.csv`, 'text/csv', App.csv({ rows: rows.map((r) => Object.assign({}, r, { name: T(r.name) })), cols: cols.map((c2) => ({ key: c2.key, label: T(c2.label) })) })));
      ctx.on('click', '[data-pdf]', () => App.printableReport({
        title: `Simulacro de caída · ${p.name}`, subtitle: `${c.label} · ${period}`, code: run.code, filename: `hornalba-${run.code.toLowerCase()}`,
        meta: [['Demanda cubierta', `${R.cover} %`], ['Impacto económico estimado', eur(R.cost + R.lost)], ['Clientes a avisar', String(R.customers)]],
        sections: [
          { heading: '1. Cobertura por producto', table: { cols, rows } },
          { heading: '2. Copias de programa', table: { cols: [{ label: 'Máquina', render: (x) => x.m.id }, { label: 'Antigüedad de la copia', render: (x) => `${fmt.num(x.age, 0)} días` }, { label: 'Estado', render: (x) => (x.ready ? 'Recuperable' : 'Copia caducada') }], rows: R.plcs } },
          { heading: '3. Orden de rearranque', table: { cols: [{ label: 'Paso', render: (r) => r[0] }, { label: 'Actividad', render: (r) => r[1] }, { label: 'Detalle', render: (r) => r[2] }], rows: c.restart } },
          { heading: '4. Alcance del ejercicio', text: 'Simulacro con datos sintéticos. No se ha enviado ningún aviso ni se ha actuado sobre ninguna planta.' }
        ],
        signatures: [{ role: 'Comité de crisis', note: 'Firma' }, { role: 'Dirección global de Mantenimiento', note: 'Firma' }]
      }));
    }
  });
})();
