/* Hornalba · decisiones: incidente con aprobación, plan de mantenimiento, automatizaciones y preguntas a la red. */
(function () {
  'use strict';
  const App = window.App;
  const HB = window.HB;
  const { html, raw, icon, fmt, chip, card, kpi, table, pageHead, button, callout, kv, segmented, timeline } = App;
  const { T } = HB;
  const APPROVER = 'Dirección global de Mantenimiento';

  /* ---------------------------------------------------------------- 5 · Incidente: congelador espiral */
  const RATE = 6200;
  const planFor = (speed) => {
    const loss = Math.round((100 - speed) * 0.9 * 10) / 10;
    return { speed, loss, vib: speed <= 88 ? 5.4 : speed <= 92 ? 5.9 : 6.7, risk: speed <= 88 ? 6 : speed <= 92 ? 11 : 24 };
  };
  const DIAG = [
    { agent: 'Vigilancia de señales', system: 'Histórico de series', action: 'Revisar 14 días de VCZ-L3-ESP-01', result: 'Vibración de 3,1 a 7,6 mm/s; intensidad +23 %; rodamiento 73 °C', ms: 1100, tone: 'crit' },
    { agent: 'Orquestador', system: 'SCADA', action: 'Descartar causas de proceso', result: 'Carga, receta y temperatura de aire sin cambios', ms: 900 },
    { agent: 'Ciberseguridad OT', system: 'Repositorio de programas', action: 'Comprobar cambios en el PLC', result: 'Sin cambios desde la orden CAM-2026-0288', ms: 800, tone: 'ok' },
    { agent: 'Vigilancia de señales', system: 'Histórico de series', action: 'Comparar con las espirales de La Ribera, Nowa Wola, Pinewood y Binh Lac', result: 'Nowa Wola mostró la misma curva en marzo antes de fallar el rodamiento', ms: 1500, tone: 'warn' },
    { agent: 'Diagnóstico', system: 'SAP PM', action: 'Leer la avería de Nowa Wola y sus causas', result: 'Rodamiento lado accionamiento · 31 h de parada · sello dañado en lavado', ms: 1200 },
    { agent: 'Conocimiento', system: 'Manuales', action: 'Buscar el límite del fabricante', result: 'Por encima de 7,1 mm/s: reducir carga y sustituir en un máximo de 72 h', ms: 900 },
    { agent: 'Repuestos', system: 'Almacén de repuestos', action: 'Localizar rodamiento y sellos', result: 'Sin stock en Valdecierzo · 2 unidades en La Ribera (entrega 27/11, 14:00)', ms: 900 },
    { agent: 'Planificación', system: 'Plan de producción', action: 'Buscar ventana de intervención', result: 'Limpieza programada el viernes 27/11 a las 22:00 · 5 h disponibles', ms: 1000, tone: 'ok' }
  ];
  const DOC = {
    code: 'MAN-ESP-07 · extracto ficticio', title: 'Congelador espiral: diagnóstico de vibraciones del grupo de arrastre', version: '4', date: '2025-06-12', owner: 'Ingeniería global',
    sections: [
      { id: '6.2', heading: '6.2 Umbrales', text: 'Aviso a partir de 4,5 mm/s RMS. Por encima de 7,1 mm/s RMS, reducir la carga del arrastre y sustituir el rodamiento en un máximo de 72 horas de funcionamiento.' },
      { id: '6.3', heading: '6.3 Comprobaciones', text: 'Verificar alineación, estado de sellos y entrada de agua de lavado. No modificar los enclavamientos de seguridad.' }
    ],
    highlight: { section: '6.2', text: 'sustituir el rodamiento en un máximo de 72 horas', tone: 'crit' }
  };

  /* El documento resalta un fragmento: se traduce entero antes de pintarlo para no partir las frases. */
  const manual = () => Object.assign({}, DOC, {
    title: T(DOC.title), owner: T(DOC.owner), org: T(App.data.meta.doc_org), code: T(DOC.code),
    sections: DOC.sections.map((s) => Object.assign({}, s, { heading: T(s.heading), text: T(s.text) })),
    highlight: Object.assign({}, DOC.highlight, { text: T(DOC.highlight.text) })
  });

  App.scene({
    id: 'incidente', order: 50, section: 'Decisiones', nav: 'Decisión pendiente', title: 'Congelador espiral de Valdecierzo · línea 3', icon: 'alert-triangle',
    badge: () => (App.outcome('incidente') ? null : { text: '1', tone: 'crit' }),
    presenter: {
      say: ['Aquí está el valor: los agentes juntan en un minuto lo que hoy exige varias llamadas entre plantas.', 'La pista decisiva viene de una máquina gemela en Polonia.', 'Nadie toca el PLC sin aprobación, y nunca la seguridad. El límite está en la política, no en la buena voluntad del agente.'],
      next: 'Pulsa «Lanzar diagnóstico», ajusta la velocidad si quieres y aprueba.'
    },
    render(root, ctx) {
      const L = ctx.local;
      const status = L.status || 'idle';
      const speed = L.speed || 92;
      const P = planFor(speed);
      const done = status === 'approved';
      const diagnosed = status !== 'idle';
      const series = HB.VIB_3H.concat(done ? [{ time: '07:10', value: 7.3 }, { time: '07:20', value: 6.7 }, { time: '07:30', value: 6.2 }, { time: '07:40', value: P.vib }] : []);

      const options = table({ dense: true, rowClass: (r) => (r.rec ? 'is-selected' : ''), rows: [
        { o: 'Seguir como está', stop: '30 h no planificadas', risk: '86 %', cost: 0.86 * 30 * RATE, note: 'Probable rotura antes del domingo' },
        { o: `Bajar al ${speed} % y cambiar el viernes`, stop: '0 h fuera de la ventana de limpieza', risk: `${P.risk} %`, cost: (P.risk / 100) * 30 * RATE + (P.loss / 100) * 39 * 2400, note: `${fmt.num(P.loss)} % menos de capacidad durante 39 h`, rec: true },
        { o: 'Parar ahora y esperar el repuesto', stop: '36 h', risk: '0 %', cost: 36 * RATE, note: 'La pieza llega mañana a las 14:00' }
      ], cols: [
        { label: 'Opción', render: (r) => html`<strong>${r.o}</strong>${r.rec ? html` ${chip('brand', 'Recomendada')}` : ''}<span class="sub">${r.note}</span>` },
        { label: 'Parada', key: 'stop' },
        { label: 'Riesgo de rotura', num: true, key: 'risk' },
        { label: 'Coste esperado', num: true, render: (r) => fmt.eur(Math.round(r.cost / 100) * 100, 0) }
      ] });

      const approval = App.approvalCard({
        id: 'esp', status: status === 'approved' ? 'approved' : status === 'rejected' ? 'rejected' : 'pending',
        approver: APPROVER, decidedBy: APPROVER, decidedAt: L.at, editable: true, editLabel: 'Cambiar velocidad',
        approveLabel: 'Aprobar el plan',
        title: 'Reducir velocidad ahora y sustituir el rodamiento el viernes',
        summary: 'Causa probable: rodamiento del lado accionamiento dañado, con posible entrada de agua por el sello. Confianza 86 %.',
        scope: [
          { label: 'Consigna belt.speed_setpoint (DB121.DBD0)', value: `100 % → ${speed} %` },
          { label: 'Límite permitido por la política', value: '85 % a 100 %' },
          { label: 'Intervención', value: 'Vie 27/11 · 22:00 a 03:00' },
          { label: 'Cadena de seguridad', value: 'No se toca' }
        ],
        effects: [
          `El edge de Valdecierzo escribe la consigna ${speed} % y verifica la lectura de vuelta`,
          'Se crea la orden de trabajo en SAP PM con la evidencia adjunta',
          'Se reservan 1 rodamiento y 2 sellos en La Ribera y se pide el transporte',
          'Planificación mueve 2 órdenes de producción a la línea 1',
          'Aviso por Teams al jefe de turno de Valdecierzo',
          'Si la vibración supera 9 mm/s, el agente pide parada controlada'
        ],
        policy: 'Nivel 2: el agente actúa solo con aprobación'
      });

      root.innerHTML = String(html`
        ${pageHead({ title: 'Congelador espiral de Valdecierzo · línea 3', meta: [html`<span class="code">VCZ-L3-ESP-01</span>`, { icon: 'clock', text: 'Alarma a las 05:50' }, html`${status === 'approved' ? chip('ok', 'Plan en ejecución') : status === 'rejected' ? chip('neutral', 'Propuesta rechazada') : chip('crit', 'Pendiente de decisión')}`], actions: button({ label: 'Ver ficha de la máquina', icon: 'clipboard', attrs: { 'data-go': 'maquina/VCZ-L3-ESP-01' } }) })}
        <div class="grid cols-8-4">
          ${card({ title: 'Vibración del motor de arrastre', sub: done ? 'Tras aplicar la nueva consigna (evolución simulada)' : 'Últimas 3 horas, cada 10 minutos', icon: 'activity', body: App.lineChart({ series, threshold: { value: 4.5, label: T('Aviso 4,5') }, critical: { value: 7.1, label: T('Actuar 7,1') }, unit: 'mm/s', height: 230, legend: false, seriesLabel: T('Vibración'), annotations: done ? [{ x: '07:10', label: T(`Consigna ${speed} %`) }] : [] }) })}
          ${card({ title: 'Lo que está en juego', icon: 'scale', body: kv([['Producto', 'Bollería congelada, línea 3'], ['Parada si falla', '30 h estimadas'], ['Coste por hora', fmt.eur(RATE, 0)], ['Impacto sin actuar', fmt.eur(30 * RATE, 0)], ['Producto en la espiral', 'Aprox. 2,1 t en riesgo']]) })}
        </div>
        <div class="section">${card({ title: 'Diagnóstico de los agentes', sub: diagnosed ? 'Evidencia usada para la propuesta' : 'Consulta histórico, programa, máquinas gemelas, SAP, manual, almacén y plan', icon: 'search',
    actions: diagnosed ? '' : button({ label: 'Lanzar diagnóstico', variant: 'primary', icon: 'play', size: 'sm', attrs: { 'data-run': '1' } }),
    body: html`<div id="diag">${diagnosed ? '' : html`<p class="slate">Todo se lee. Ninguna acción se ejecuta durante el diagnóstico.</p>`}</div>` })}</div>
        ${diagnosed ? html`
          <div class="section">${card({ title: 'Evidencia', icon: 'file-text', flush: true, body: table({ dense: true, rows: [
    { s: 'Histórico de series', e: 'Curva de vibración, intensidad y temperatura de 14 días', a: { label: 'Ver variables', go: 'maquina/VCZ-L3-ESP-01' } },
    { s: 'Máquina gemela', e: 'NWL-L5-ESP-02 · avería del 18/03/2026 con la misma curva (31 h de parada)', a: { label: 'Ver la gemela', go: 'maquina/NWL-L5-ESP-02' } },
    { s: 'Manual MAN-ESP-07 §6.2', e: 'Sustituir en un máximo de 72 h por encima de 7,1 mm/s', a: { label: 'Abrir cita', doc: true } },
    { s: 'Almacén', e: 'Rodamiento 22218: 0 en Valdecierzo, 2 en La Ribera' }
  ], cols: [{ label: 'Fuente', render: (r) => html`<strong>${r.s}</strong>` }, { label: 'Qué muestra', key: 'e' }, { label: '', render: (r) => (r.a ? (r.a.doc ? button({ label: r.a.label, size: 'sm', attrs: { 'data-doc-open': '1' } }) : button({ label: r.a.label, size: 'sm', attrs: { 'data-go': r.a.go } })) : '') }] }) })}</div>
          <div class="section">${card({ title: 'Opciones comparadas', sub: 'Costes sintéticos: parada más capacidad perdida', icon: 'scale', flush: true, body: options })}</div>
          <div class="section" id="approval">${approval}</div>
          ${status === 'approved' ? html`<div class="section">${card({ title: 'Ejecución', icon: 'check-circle', body: html`<div id="exec"></div>` })}</div>` : ''}
          ${status === 'rejected' ? html`<div class="section">${callout({ tone: 'warn', title: 'Propuesta rechazada', body: html`<span>Motivo: ${L.reason}. La máquina sigue en vigilancia cada minuto y la decisión queda registrada.</span>`, actions: button({ label: 'Reconsiderar', size: 'sm', attrs: { 'data-reopen': '1' } }) })}</div>` : ''}
        ` : ''}`);

      if (diagnosed) App.reasoningStream(ctx.$('#diag'), DIAG, { signal: ctx.signal, title: 'Registro del diagnóstico', instant: true, maxHeight: 300 });
      if (status === 'approved') {
        App.reasoningStream(ctx.$('#exec'), [
          { agent: 'Orquestador', system: 'Edge', action: `Escribir consigna ${speed} % y leer de vuelta`, result: `Confirmado ${speed} % en PLC-VCZ-L3-ESP-01`, ms: 900, tone: 'ok' },
          { agent: 'Planificación', system: 'SAP PM', action: 'Crear orden de trabajo', result: `${L.wo} · viernes 22:00 · 2 técnicos`, ms: 800, tone: 'ok' },
          { agent: 'Repuestos', system: 'Almacén de repuestos', action: 'Reservar en La Ribera y pedir transporte', result: 'Reserva confirmada · llegada 27/11 14:00', ms: 800, tone: 'ok' },
          { agent: 'Planificación', system: 'Plan de producción', action: 'Mover 2 órdenes a la línea 1', result: 'Sin retrasos en expediciones', ms: 700, tone: 'ok' },
          { agent: 'Orquestador', system: 'Teams', action: 'Avisar al jefe de turno de Valdecierzo', result: 'Mensaje enviado (simulado)', ms: 500, tone: 'ok' },
          { agent: 'Vigilancia de señales', system: 'Histórico de series', action: 'Comprobar el efecto a los 30 minutos', result: `Vibración en descenso: ${fmt.num(P.vib)} mm/s`, ms: 1000, tone: 'ok' }
        ], { signal: ctx.signal, title: 'Acciones aplicadas (simuladas)', instant: !ctx.vars.animate });
        ctx.vars.animate = false;
      }

      ctx.on('click', '[data-run]', (e, el) => {
        el.disabled = true;
        ctx.audit('Diagnóstico lanzado', 'VCZ-L3-ESP-01 · solo lectura');
        const s = App.reasoningStream(ctx.$('#diag'), DIAG, { signal: ctx.signal, title: 'Registro del diagnóstico', maxHeight: 300 });
        s.done.then(() => ctx.after(700, () => { ctx.setLocal({ status: 'diagnosed' }); ctx.rerender(); const a = ctx.$('#approval'); if (a) a.scrollIntoView({ behavior: 'smooth', block: 'center' }); }));
      });
      ctx.on('click', '[data-doc-open]', () => ctx.modal({ title: 'Cita del manual', size: 'lg', body: App.docPreview(manual()) }));
      ctx.on('click', '[data-approval]', async (e, el) => {
        const act = el.getAttribute('data-approval');
        if (act === 'approve') {
          const wo = App.seq('OT-VCZ-2026-', 4471, 4);
          ctx.vars.animate = true;
          ctx.setLocal({ status: 'approved', at: App.nowISO(), wo, speed });
          App.outcome('incidente', { status: 'approved', speed, wo });
          ctx.audit('Plan de intervención aprobado', `VCZ-L3-ESP-01 · consigna ${speed} % · ${wo} · reserva en La Ribera (simulado)`);
          ctx.rerender();
          const x = ctx.$('#exec'); if (x) x.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else if (act === 'reject') {
          const reason = await App.promptText({ title: 'Rechazar la propuesta', label: 'Motivo', required: true, placeholder: 'Por ejemplo: hay un técnico revisando la máquina ahora', confirmLabel: 'Rechazar' });
          if (reason == null || !ctx.alive()) return;
          ctx.setLocal({ status: 'rejected', at: App.nowISO(), reason });
          App.outcome('incidente', { status: 'rejected' });
          ctx.audit('Propuesta rechazada', `VCZ-L3-ESP-01 · ${reason}`);
          ctx.rerender();
        } else {
          let next = speed;
          const m = ctx.modal({ title: 'Cambiar la velocidad propuesta', size: 'sm',
            body: html`<p class="slate mb-4">Solo se admiten valores dentro del límite de la política. Menos velocidad reduce el riesgo y también la capacidad.</p>${segmented({ name: 'speed', label: 'Velocidad de banda', value: speed, options: [88, 92, 96].map((v) => ({ value: v, label: `${v} %` })) })}`,
            actions: [{ label: 'Cancelar' }, { label: 'Recalcular', variant: 'primary', onClick: () => { ctx.setLocal({ speed: next }); ctx.audit('Alcance de la propuesta modificado', `Velocidad ${next} %`); ctx.after(30, () => ctx.rerender()); } }] });
          m.body.addEventListener('segchange', (ev) => { next = Number(ev.detail.value); });
        }
      });
      ctx.on('click', '[data-reopen]', () => { ctx.setLocal({ status: 'diagnosed' }); App.outcome('incidente', null); ctx.rerender(); });
    }
  });

  /* ---------------------------------------------------------------- 6 · Plan de mantenimiento de la red */
  const value = (d) => d.prob * d.hNo * d.cph - 0.05 * d.hNo * d.cph - d.hPlan * d.cph * 0.15;
  App.scene({
    id: 'mantenimiento', order: 60, section: 'Decisiones', nav: 'Plan de mantenimiento', title: 'Decisiones de mantenimiento de la red', icon: 'wrench',
    presenter: {
      say: ['Se pasa de mantener por calendario a decidir por riesgo y dinero.', 'Cada intervención se coloca en una ventana de limpieza o cambio de formato.', 'El almacén deja de ser de cada planta: se ve el repuesto en toda la red.'],
      next: 'Marca o desmarca intervenciones y aprueba el plan.'
    },
    render(root, ctx) {
      const dec = App.outcome('incidente');
      const list = HB.BACKLOG.slice().sort((a, b) => value(b) - value(a));
      const sel = ctx.local.sel || list.filter((d) => value(d) > 15000).map((d) => d.id);
      const orders = Object.assign({}, ctx.local.orders);
      if (dec && dec.status === 'approved') orders['DEC-2601'] = dec.wo;
      const rc = App.outcome('reclamacion');
      if (rc && rc.status === 'approved') orders['DEC-2602'] = rc.wo;
      const chosen = list.filter((d) => sel.includes(d.id) && !orders[d.id]);
      const avoided = list.filter((d) => sel.includes(d.id)).reduce((s, d) => s + value(d), 0);
      const hours = list.filter((d) => sel.includes(d.id)).reduce((s, d) => s + d.prob * d.hNo, 0);
      const fw = Object.keys(HB.PLC).map((k) => ({ vendor: k, n: HB.MACHINES.filter((m) => m.vendor === k && m.plc.outdated).length, from: HB.PLC[k].fw, to: HB.PLC[k].latest })).filter((x) => x.n);

      root.innerHTML = String(html`
        ${pageHead({ title: 'Decisiones de mantenimiento de la red', desc: 'Ordenadas por pérdida que se evita. Probabilidades, horas y costes son sintéticos.' })}
        <div class="kpis">
          ${kpi({ label: 'Decisiones abiertas', value: String(list.length), icon: 'list-checks', sub: 'En 8 plantas' })}
          ${kpi({ label: 'Incluidas en el plan', value: String(sel.length), icon: 'calendar', sub: `${chosen.length} sin orden de trabajo` })}
          ${kpi({ label: 'Pérdida esperada que se evita', value: fmt.num(avoided / 1000, 0), unit: 'mil €', icon: 'euro', tone: 'ok', sub: 'Próximos 30 días' })}
          ${kpi({ label: 'Horas de parada no planificada', value: fmt.num(hours, 0), unit: 'h', icon: 'clock', sub: 'Esperadas si no se actúa' })}
        </div>
        <div class="section">${card({ title: 'Cartera de intervenciones', icon: 'wrench', flush: true,
    actions: button({ label: chosen.length ? `Aprobar plan (${chosen.length})` : 'Plan aprobado', variant: 'primary', size: 'sm', icon: 'check', disabled: !chosen.length, attrs: { 'data-plan': '1' } }),
    body: table({ rows: list, rowClass: (d) => (orders[d.id] ? 'tone-ok' : ''), cols: [
      { label: 'Máquina', render: (d) => { const m = HB.machine(d.machine); return html`<label class="check"><input type="checkbox" data-inc="${d.id}" ${sel.includes(d.id) ? raw('checked') : ''} ${orders[d.id] ? raw('disabled') : ''}><span class="code">${d.machine}</span></label><span class="sub">${m.type} · ${HB.plant(m.plant).name}</span>`; } },
      { label: 'Qué hacer', render: (d) => html`${d.what}<span class="sub">Hoy: ${d.now.toLowerCase()}</span>` },
      { label: 'Riesgo 30 días', num: true, render: (d) => chip(d.prob > 0.6 ? 'crit' : d.prob > 0.35 ? 'warn' : 'neutral', fmt.pct(d.prob * 100, 0)) },
      { label: 'Parada: fallo / plan', num: true, render: (d) => `${d.hNo} h / ${d.hPlan} h` },
      { label: 'Se evita', num: true, render: (d) => fmt.eur(Math.round(value(d) / 100) * 100, 0) },
      { label: 'Repuesto', render: (d) => html`${d.part}<span class="sub ${d.stock.startsWith('Plazo') ? 't-warn' : ''}">${d.stock}</span>` },
      { label: 'Ventana', render: (d) => html`${d.window}${orders[d.id] ? html`<span class="sub t-ok">${orders[d.id]} creada</span>` : ''}` }
    ] }) })}</div>
        <div class="grid cols-2 section">
          ${card({ title: 'Campaña de firmware', sub: 'Una decisión para toda la red, por oleadas', icon: 'shield', actions: ctx.local.campaign ? chip('ok', 'Preparada') : button({ label: 'Preparar oleadas', size: 'sm', icon: 'calendar', attrs: { 'data-camp': '1' } }),
    body: html`${table({ dense: true, rows: fw, cols: [{ label: 'Fabricante', key: 'vendor' }, { label: 'PLC en la muestra', num: true, key: 'n' }, { label: 'Versión', render: (x) => html`<span class="code">${x.from} → ${x.to}</span>` }] })}${ctx.local.campaign ? html`<div class="mt-4">${timeline({ compact: true, items: [{ time: 'Ola 1', title: 'Banco de pruebas y una línea no crítica', text: 'La Ribera · semana del 07/12', tone: 'brand' }, { time: 'Ola 2', title: 'Resto de criticidad B y C', text: 'Paradas semanales de enero', tone: 'brand' }, { time: 'Ola 3', title: 'Criticidad A', text: 'Solo con copia verificada y plan de vuelta atrás', tone: 'brand' }] })}</div>` : ''}` })}
          ${card({ title: 'Patrón detectado entre plantas', sub: 'Algo que ninguna planta ve por sí sola', icon: 'repeat', body: html`<p class="slate">Tres averías de rodamiento en congeladores espiral en 18 meses comparten el mismo sello y lavado a presión en el lado accionamiento.</p>${kv([['Máquinas expuestas', 'VCZ-L3-ESP-01, BNL-L2-ESP-01, PNW-L2-ESP-01'], ['Propuesta', 'Cambiar sello y protocolo de lavado en las 5 espirales'], ['Decide', 'Ingeniería global']])}<div class="mt-4">${ctx.local.std ? chip('ok', 'Propuesta enviada a Ingeniería global') : button({ label: 'Proponer cambio de estándar', size: 'sm', icon: 'send', attrs: { 'data-std': '1' } })}</div>` })}
        </div>`);
      ctx.on('change', '[data-inc]', (e, el) => {
        const id = el.getAttribute('data-inc');
        ctx.setLocal({ sel: el.checked ? sel.concat(id) : sel.filter((x) => x !== id) });
        ctx.rerender();
      });
      ctx.on('click', '[data-plan]', async () => {
        const ok = await App.confirm({ title: 'Aprobar el plan', confirmLabel: 'Aprobar y crear órdenes', icon: 'check', body: html`<p class="slate">Se crearán ${chosen.length} órdenes de trabajo en SAP PM, se reservarán repuestos y cada planta recibirá su calendario. Todo es simulado.</p>` });
        if (!ok || !ctx.alive()) return;
        const next = Object.assign({}, ctx.local.orders);
        chosen.forEach((d) => { next[d.id] = App.seq('OT-2026-', 8120, 4); });
        ctx.setLocal({ orders: next, sel });
        ctx.audit('Plan de mantenimiento aprobado', chosen.map((d) => `${d.machine} → ${next[d.id]}`).join(' · '));
        ctx.toast(`${chosen.length} órdenes creadas (simulado)`, { tone: 'ok' });
        ctx.rerender();
      });
      ctx.on('click', '[data-camp]', () => { ctx.setLocal({ campaign: true }); ctx.audit('Campaña de firmware preparada', '3 oleadas · sin cambios aplicados'); ctx.rerender(); });
      ctx.on('click', '[data-std]', () => { ctx.setLocal({ std: true }); ctx.audit('Propuesta de estándar enviada', 'Sello y protocolo de lavado en congeladores espiral'); ctx.rerender(); });
    }
  });

  /* ---------------------------------------------------------------- 7 · De palabras a automatización */
  const TEMPLATES = [
    { id: 'vib', label: 'Vibración en espirales', match: /vibra|rodamiento|bearing|motor|espiral|spiral/i, name: 'Vigilancia de vibración en congeladores espiral',
      text: 'Si la vibración de cualquier motor de espiral supera 4,5 mm/s durante 10 minutos, compara con las máquinas gemelas, busca el repuesto y propón una ventana. Antes de cambiar nada en el PLC, pide aprobación.',
      scope: '5 congeladores espiral en 4 países',
      nodes: [['t', 'trigger', 'Vibración > 4,5 mm/s', '10 min seguidos', ['Edge']], ['d', 'agent', 'Diagnóstico', 'Gemelas e histórico', ['Histórico de series']], ['r', 'agent', 'Repuesto y ventana', 'Toda la red', ['Almacén de repuestos', 'Plan de producción']], ['a', 'approval', 'Aprobación', 'Jefatura de planta', ['Teams']], ['o', 'output', 'Orden y consigna', 'Dentro de límites', ['SAP PM', 'Edge']]] },
    { id: 'prog', label: 'Cambios de programa', match: /programa|program\b|cambio|change|firmware|autoriz|authori[sz]|acceso|access/i, name: 'Cambios de programa sin autorización',
      text: 'Cuando cambie el programa de cualquier PLC, comprueba que existe una orden de cambio aprobada. Si no existe, avisa a ciberseguridad y a la planta, guarda las dos versiones y abre un incidente.',
      scope: 'Todos los autómatas registrados',
      nodes: [['t', 'trigger', 'Huella del programa distinta', 'Revisión diaria y por evento', ['Repositorio de programas']], ['d', 'agent', 'Buscar orden aprobada', 'Quién, cuándo y qué', ['SAP PM']], ['c', 'decision', '¿Autorizado?', 'Sí: archivar · No: seguir', []], ['a', 'agent', 'Ciberseguridad OT', 'Diferencias y accesos', ['Registro de activos']], ['o', 'output', 'Incidente y aviso', 'Planta y seguridad', ['Teams']]] },
    { id: 'ene', label: 'Energía por tonelada', match: /energ|kwh|consum|fr[ií]o|\baire\b|\bair\b|\bgas\b|refriger/i, name: 'Consumo anómalo de energía por tonelada',
      text: 'Cada mañana, compara el consumo por tonelada de frío, hornos y aire comprimido de cada planta con sus últimas 6 semanas. Si sube más de un 8 %, explica la causa probable y propón qué revisar.',
      scope: '13 plantas',
      nodes: [['t', 'trigger', 'Cada día a las 06:00', 'Hora local', []], ['d', 'agent', 'Energía', 'kWh por tonelada', ['Histórico de series', 'MES']], ['c', 'decision', '¿Sube más del 8 %?', 'Frente a 6 semanas', []], ['x', 'agent', 'Diagnóstico', 'Causa probable', ['SCADA']], ['o', 'output', 'Parte a la planta', 'Con evidencia', ['Teams']]] }
  ];
  App.scene({
    id: 'automatizar', order: 70, section: 'Decisiones', nav: 'Crear automatización', title: 'De palabras a automatización', icon: 'workflow',
    presenter: {
      say: ['El jefe de mantenimiento describe la regla como se la diría a su equipo.', 'La plataforma la convierte en pasos visibles, con sus sistemas y su punto de aprobación.', 'Una vez publicada, se aplica en todas las plantas que correspondan.'],
      next: 'Elige un ejemplo, pulsa «Convertir» y publica.'
    },
    render(root, ctx) {
      const v = ctx.vars;
      const tpl = TEMPLATES.find((t) => t.id === v.tpl);
      const published = App.state.workflows;
      const graph = tpl ? App.planGraph({ title: T(tpl.name), nodeWidth: 168, nodes: HB.graphNodes(tpl.nodes.map(([id, kind, label, sub, systems]) => ({ id, kind, label, sub, systems, status: 'pending' }))), edges: tpl.nodes.slice(1).map((n, i) => [tpl.nodes[i][0], n[0]]) }) : '';
      root.innerHTML = String(html`
        ${pageHead({ title: 'De palabras a automatización', desc: 'Describe qué debe pasar. La plataforma propone los pasos y respeta la política de autonomía.' })}
        ${card({ title: 'Qué quieres que ocurra', icon: 'edit', body: html`
          <div class="btn-group mb-2">${TEMPLATES.map((t) => button({ label: t.label, size: 'sm', attrs: { 'data-tpl': t.id } }))}</div>
          <label class="sr-only" for="wf-text">Descripción de la regla</label>
          <textarea class="textarea" id="wf-text" placeholder="Por ejemplo: si la vibración de una espiral sube, avisa y propón una ventana de mantenimiento…">${v.text || ''}</textarea>
          <div class="mt-3">${button({ label: 'Convertir en automatización', variant: 'primary', icon: 'workflow', attrs: { 'data-build': '1' } })}</div>` })}
        ${v.nomatch ? html`<div class="section">${callout({ tone: 'warn', title: 'Esta demostración solo reconoce tres temas', body: html`<span>Escribe sobre vibración, cambios de programa o energía, o elige un ejemplo. En un piloto, un modelo interpreta la frase.</span>` })}</div>` : ''}
        ${tpl ? html`<div class="section">${card({ title: tpl.name, sub: `Alcance: ${tpl.scope}`, icon: 'git-branch', actions: published.some((w) => w.id === tpl.id) ? chip('ok', 'Publicado') : html`${button({ label: 'Probar con datos de anoche', size: 'sm', icon: 'play', attrs: { 'data-test': '1' } })}${button({ label: 'Publicar', size: 'sm', variant: 'primary', icon: 'upload', attrs: { 'data-pub': '1' } })}`, body: html`${graph}<div id="wf-test" class="mt-4"></div>` })}</div>` : ''}
        <div class="section">${card({ title: 'Publicadas en esta sesión', icon: 'list-checks', flush: true, body: table({ dense: true, rows: published, empty: 'Todavía no has publicado ninguna.', cols: [{ label: 'Automatización', render: (w) => html`<strong>${w.name}</strong>` }, { label: 'Alcance', key: 'scope' }, { label: 'Publicada', render: (w) => fmt.time(w.at) }, { label: 'Estado', render: () => chip('active', 'Activa') }] }) })}</div>`);
      ctx.on('input', '#wf-text', (e, el) => { v.text = el.value; });
      ctx.on('click', '[data-tpl]', (e, el) => { const t = TEMPLATES.find((x) => x.id === el.getAttribute('data-tpl')); v.text = t.text; v.tpl = null; v.nomatch = false; ctx.rerender(); });
      ctx.on('click', '[data-build]', () => {
        const text = (v.text || '').trim();
        if (!text) { ctx.toast('Escribe la regla o elige un ejemplo', { tone: 'warn' }); return; }
        const exact = TEMPLATES.find((t) => t.text === text || T(t.text) === text);
        const order = [TEMPLATES[1], TEMPLATES[2], TEMPLATES[0]];
        const t = exact || order.find((x) => x.match.test(text));
        v.tpl = t ? t.id : null;
        v.nomatch = !t;
        if (t) ctx.audit('Automatización generada desde texto', t.name);
        ctx.rerender();
      });
      ctx.on('click', '[data-pub]', () => {
        App.update((s) => { s.workflows.push({ id: tpl.id, name: tpl.name, scope: tpl.scope, at: App.nowISO() }); });
        ctx.audit('Automatización publicada', `${tpl.name} · ${tpl.scope}`);
        ctx.toast('Publicada (simulado)', { tone: 'ok' });
        ctx.rerender();
      });
      ctx.on('click', '[data-test]', () => {
        App.reasoningStream(ctx.$('#wf-test'), tpl.nodes.map(([, kind, label, sub, systems], i) => ({ agent: label, system: systems[0], action: sub, ms: 600 + i * 120, tone: kind === 'approval' ? 'warn' : 'ok',
          result: kind === 'trigger' ? (tpl.id === 'vib' ? '3 espirales habrían disparado: Valdecierzo, Binh Lac y Pinewood' : tpl.id === 'prog' ? '1 cambio en Pinewood' : '13 plantas evaluadas') : kind === 'approval' ? 'Se habría pedido aprobación; en la prueba no se envía' : kind === 'decision' ? (tpl.id === 'prog' ? 'Sí, orden CAM-2026-0391' : 'Puerto Sur +11 % en frío') : 'Correcto, sin efectos reales' })), { signal: ctx.signal, title: 'Prueba sin efectos' });
      });
    }
  });

  /* ---------------------------------------------------------------- 8 · Preguntar a la red */
  const QA = [
    { id: 'fw', q: '¿Qué autómatas críticos tienen firmware pendiente?', match: /firmware|vulnerab|actualiz|versi[oó]n|update|version/i,
      a: () => { const r = HB.MACHINES.filter((m) => m.crit === 'A' && m.plc.outdated); return html`<p>Hay <strong>${r.length} autómatas de criticidad A</strong> con firmware pendiente en la muestra.</p>${table({ dense: true, rows: r, cols: [{ label: 'Máquina', render: (m) => html`<span class="code">${m.id}</span>` }, { label: 'Planta', render: (m) => HB.plant(m.plant).name }, { label: 'Autómata', render: (m) => m.plc.model }, { label: 'Versión', render: (m) => html`<span class="code">${m.plc.fw} → ${m.plc.latest}</span>` }] })}`; }, src: ['Registro de activos'] },
    { id: 'stop', q: '¿Qué máquinas pueden parar en menos de 30 días?', match: /parar|fallar|30 d|riesgo|aver|stop|fail|risk|breakdown/i,
      a: () => { const r = HB.MACHINES.filter((m) => m.rul && m.rul <= 30).sort((a, b) => a.rul - b.rul); return html`<p><strong>${r.length} máquinas</strong> tienen una vida útil estimada de 30 días o menos. La más urgente es VCZ-L3-ESP-01.</p>${table({ dense: true, rows: r, cols: [{ label: 'Máquina', render: (m) => html`<span class="code">${m.id}</span><span class="sub">${m.type}</span>` }, { label: 'Planta', render: (m) => HB.plant(m.plant).name }, { label: 'Días', num: true, render: (m) => HB.rulOf(m) }, { label: 'Salud', render: (m) => HB.healthBar(HB.healthOf(m)) }] })}`; }, src: ['Histórico de series', 'SAP PM'] },
    { id: 'bnl', q: '¿Por qué ha bajado el OEE de Binh Lac esta semana?', match: /binh|vietnam|oee/i,
      a: () => html`<p>El OEE de Binh Lac está en <strong>71,4 %</strong>. La mayor pérdida sintética de la semana viene del congelador espiral de la línea 2: descongelaciones fuera de ciclo.</p>${table({ dense: true, rows: [{ c: 'Descongelación fuera de ciclo (BNL-L2-ESP-01)', h: '6,5 h', p: '−3,9 puntos' }, { c: 'Cambios de formato más largos en laminadora', h: '2,8 h', p: '−1,6 puntos' }, { c: 'Microparadas de envasado', h: '1,4 h', p: '−0,8 puntos' }], cols: [{ label: 'Causa', key: 'c' }, { label: 'Horas', num: true, key: 'h' }, { label: 'Efecto', num: true, key: 'p' }] })}<p class="mt-3">Siguiente paso propuesto: revisar la electroválvula de desescarche el sábado 05/12 (repuesto con plazo de 9 días).</p>`, src: ['MES', 'Histórico de series', 'SAP PM'] },
    { id: 'how', q: '¿Cada cuánto hay que cambiar el rodamiento de la espiral si vibra?', match: /rodamiento|bearing|manual|c[oó]mo|how (do|to|often)|procedimiento|procedure/i,
      a: () => html`<p>Con vibración por encima de <strong>7,1 mm/s</strong>, el manual pide reducir la carga y sustituir el rodamiento en un máximo de <strong>72 horas</strong>, revisando alineación y sellos.</p><p class="mt-2">${button({ label: 'MAN-ESP-07 §6.2', size: 'sm', icon: 'book-open', attrs: { 'data-cite': '1' } })}</p>`, src: ['Manuales'] },
    { id: 'bk', q: '¿De qué PLC no podríamos recuperar el programa hoy?', match: /copia|backup|back-up|respaldo|recuper|recover|restore/i,
      a: () => { const r = HB.MACHINES.filter((m) => fmt.days(HB.backupOf(m).slice(0, 10), '2026-11-26') > 30); return r.length ? html`<p><strong>${r.length} autómata</strong> de la muestra tiene la copia caducada. Además, en Redfield hay 29 sin copia localizada.</p>${table({ dense: true, rows: r, cols: [{ label: 'Máquina', render: (m) => html`<span class="code">${m.id}</span>` }, { label: 'Planta', render: (m) => HB.plant(m.plant).name }, { label: 'Última copia', render: (m) => fmt.date(HB.backupOf(m).slice(0, 10)) }] })}` : html`<p>En la muestra todas las copias tienen menos de 30 días. En Redfield quedan 29 autómatas sin copia localizada.</p>`; }, src: ['Repositorio de programas'] }
  ];
  App.scene({
    id: 'preguntar', order: 80, section: 'Decisiones', nav: 'Preguntar a la red', title: 'Preguntar a la red de plantas', icon: 'message-square',
    presenter: {
      say: ['Preguntas en lenguaje normal sobre todas las plantas a la vez.', 'Cada respuesta dice de dónde sale; si no hay fuente, lo reconoce.', 'En un piloto se puede preguntar en el idioma de cada planta.'],
      next: 'Pulsa una de las preguntas sugeridas.'
    },
    render(root, ctx) {
      const asked = ctx.vars.asked || (ctx.vars.asked = []);
      const answerCard = (item) => {
        const qa = QA.find((x) => x.id === item.id);
        return card({ title: item.typed ? html`<span data-no-translate>${item.q}</span>` : item.q, icon: 'message-square', body: qa ? html`${qa.a()}<div class="mt-3">${App.sysList(qa.src)}</div>` : html`<p class="slate">No tengo una fuente para responder a eso en esta demostración. Prueba una de las preguntas sugeridas.</p>` });
      };
      root.innerHTML = String(html`
        ${pageHead({ title: 'Preguntar a la red de plantas', desc: 'Respuestas preparadas sobre datos sintéticos, con sus fuentes.' })}
        ${card({ body: html`<form id="ask" class="hb-ask"><label class="sr-only" for="ask-q">Tu pregunta</label><input class="input" id="ask-q" placeholder="Escribe una pregunta sobre máquinas, PLC o mantenimiento" autocomplete="off"><button class="btn btn-primary" type="submit">${icon('send')}<span>Preguntar</span></button></form><div class="btn-group mt-3">${QA.map((x) => button({ label: x.q, size: 'sm', attrs: { 'data-q': x.id } }))}</div>` })}
        <div class="stack section" aria-live="polite">${asked.length ? asked.map(answerCard) : html`<p class="muted">Las respuestas aparecerán aquí, la más reciente arriba.</p>`}</div>`);
      const ask = (q, id) => {
        const hit = id ? QA.find((x) => x.id === id) : [QA[4], QA[0], QA[2], QA[3], QA[1]].find((x) => x.match.test(q));
        asked.unshift({ q, id: hit ? hit.id : null, typed: !id });
        ctx.audit('Consulta a la red', q);
        ctx.rerender();
      };
      ctx.on('click', '[data-q]', (e, el) => { const x = QA.find((y) => y.id === el.getAttribute('data-q')); ask(x.q, x.id); });
      ctx.on('submit', '#ask', (e) => { e.preventDefault(); const q = ctx.$('#ask-q').value.trim(); if (q) ask(q); });
      ctx.on('click', '[data-cite]', () => ctx.modal({ title: 'Cita del manual', size: 'lg', body: App.docPreview(manual()) }));
    }
  });
})();
