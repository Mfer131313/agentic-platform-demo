/* Hornalba · operación global: red de plantas, parque de máquinas y PLC, ficha de máquina y datos de PLC. */
(function () {
  'use strict';
  const App = window.App;
  const HB = window.HB;
  const { html, raw, icon, fmt, chip, card, kpi, table, pageHead, button, callout, kv, tabs, timeline, segmented } = App;
  const { PLANTS, MACHINES, EVENTS, T } = HB;
  const EN = !!(window.CN_I18N && window.CN_I18N.english);
  const graphNodes = (nodes) => nodes.map((n) => Object.assign({}, n, { label: T(n.label), sub: n.sub && T(n.sub), kindLabel: n.kindLabel && T(n.kindLabel), systems: n.systems && n.systems.map(T) }));
  HB.graphNodes = graphNodes;

  const HQ_UTC = 1;
  const localTime = (p) => fmt.time(new Date(App.now().getTime() + (p.utc - HQ_UTC) * 3600000));
  const TONE = { ok: 'ok', warn: 'warn', crit: 'crit' };
  const decided = () => { const o = App.outcome('incidente'); return o ? o.status : null; };
  /* La salud de la espiral de Valdecierzo cambia cuando se aprueba la intervención. */
  const statusOf = (m) => (m.id === 'VCZ-L3-ESP-01' && decided() === 'approved' ? 'warn' : m.status);
  const healthOf = (m) => (m.id === 'VCZ-L3-ESP-01' && decided() === 'approved' ? 71 : m.health);
  const rulOf = (m) => (m.id === 'VCZ-L3-ESP-01' && decided() === 'approved' ? 16 : m.rul);
  HB.rulOf = rulOf;
  HB.statusOf = statusOf;
  HB.healthOf = healthOf;

  function healthBar(v) {
    const tone = v < 65 ? 'crit' : v < 80 ? 'warn' : 'ok';
    return html`<span class="hb-health tone-${tone}" title="Índice de salud ${v} de 100"><span class="hb-health-track"><span style="width:${v}%"></span></span><b>${v}</b></span>`;
  }
  HB.healthBar = healthBar;
  const plantStatus = (p) => {
    const ms = MACHINES.filter((m) => m.plant === p.id).map(statusOf);
    return ms.includes('crit') ? 'crit' : ms.includes('warn') ? 'warn' : 'ok';
  };
  const alertsOf = (p) => MACHINES.filter((m) => m.plant === p.id && statusOf(m) !== 'ok').length;
  const edgeChip = (p) => (p.edge === 'ok' ? chip('ok', 'Conectado') : p.edge === 'warn' ? chip('warn', 'Con retardo') : chip('brand', 'En alta'));

  /* ---------------------------------------------------------------- Mapa del mundo en puntos */
  const LAND = [
    [[-168, 66], [-156, 71], [-125, 70], [-95, 72], [-80, 73], [-62, 60], [-55, 52], [-66, 44], [-76, 35], [-81, 25], [-90, 29], [-97, 26], [-97, 21], [-87, 21], [-83, 9], [-79, 9], [-92, 14], [-105, 20], [-115, 30], [-124, 40], [-124, 49], [-135, 58], [-152, 59], [-166, 54]],
    [[-55, 60], [-45, 60], [-20, 70], [-18, 80], [-60, 80], [-68, 76]],
    [[-79, 9], [-72, 12], [-60, 10], [-50, 0], [-35, -6], [-39, -15], [-48, -26], [-58, -35], [-65, -42], [-69, -55], [-74, -50], [-71, -30], [-70, -18], [-81, -5], [-77, 4]],
    [[-17, 15], [-16, 28], [-6, 36], [10, 37], [20, 31], [32, 31], [43, 12], [51, 12], [40, -3], [40, -16], [33, -26], [26, -34], [18, -34], [12, -17], [9, 0], [8, 4], [-8, 4], [-14, 9]],
    [[-9, 37], [-9, 43.5], [-2, 43.5], [-5, 48.5], [2, 51], [8, 54], [8, 57], [11, 56], [12, 54.5], [21, 55], [24, 59], [30, 60], [22, 65], [18, 60], [12, 56], [11, 59], [5, 59], [6, 62], [15, 69], [28, 71], [40, 66], [68, 69], [75, 73], [105, 77], [140, 72], [180, 69], [170, 60], [156, 51], [155, 59], [141, 53], [135, 43], [129, 35], [122, 40], [122, 31], [117, 23], [108, 21], [109, 12], [105, 9], [100, 13.5], [99, 8], [104, 1], [100, 3], [98, 9], [94, 17], [89, 22], [80, 13], [77, 8], [72, 20], [66, 25], [57, 25], [48, 30], [52, 24], [60, 22], [52, 16], [43, 13], [35, 28], [36, 36], [27, 37], [26, 40], [23, 38], [20, 40], [13.5, 45.5], [18, 40], [16, 38], [8, 44], [3, 43], [0, 39], [-2, 36.7], [-5.5, 36]],
    [[-5.5, 50], [1.5, 51], [1.7, 53], [-2, 56], [-5, 58.5], [-5, 54], [-3, 53], [-5, 52]],
    [[-10, 52], [-6, 52], [-6, 55], [-10, 54]],
    [[130, 31], [140, 35], [142, 40], [145, 44], [141, 45], [139, 38], [131, 34]],
    [[95, 5], [106, -6], [115, -8], [106, -2], [100, 2]],
    [[109, 1], [117, 7], [119, 1], [116, -4], [110, -3]],
    [[132, -1], [147, -6], [150, -10], [141, -9], [131, -3]],
    [[113, -22], [122, -18], [130, -12], [137, -12], [142, -11], [146, -19], [153, -26], [150, -37], [140, -38], [131, -32], [115, -34]]
  ];
  function inPoly(x, y, poly) {
    let inside = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i];
      const [xj, yj] = poly[j];
      if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }
  const W = 960;
  const H = 420;
  const X = (lon) => ((lon + 170) / 350) * W;
  const Y = (lat) => ((78 - lat) / 135) * H;
  let dotsCache = null;
  function dots() {
    if (dotsCache) return dotsCache;
    let out = '';
    for (let py = 4; py < H; py += 7) {
      for (let px = 4; px < W; px += 7) {
        const lon = (px / W) * 350 - 170;
        const lat = 78 - (py / H) * 135;
        if (LAND.some((p) => inPoly(lon, lat, p))) out += `M${px} ${py}h.01`;
      }
    }
    dotsCache = out;
    return out;
  }
  /* Burbuja por país; dx/dy separan las que se pisan en Europa */
  const COUNTRY_POS = { ES: [-16, 18], FR: [-38, -16], DE: [-8, -36], IT: [18, 28], PL: [32, -8], US: [0, 0], MX: [0, 0], VN: [0, 0] };
  function worldMap(selected) {
    const countries = [];
    PLANTS.forEach((p) => {
      let c = countries.find((x) => x.cc === p.cc);
      if (!c) { c = { cc: p.cc, name: p.country, plants: [] }; countries.push(c); }
      c.plants.push(p);
    });
    const marks = countries.map((c) => {
      const lat = c.plants.reduce((s, p) => s + p.lat, 0) / c.plants.length;
      const lon = c.plants.reduce((s, p) => s + p.lon, 0) / c.plants.length;
      const [dx, dy] = COUNTRY_POS[c.cc] || [0, 0];
      const x = X(lon); const y = Y(lat); const bx = x + dx; const by = y + dy;
      const st = c.plants.map(plantStatus);
      const tone = st.includes('crit') ? 'crit' : st.includes('warn') ? 'warn' : 'ok';
      const r = 11 + Math.min(c.plants.length, 5) * 1.4;
      const right = bx > W - 110;
      const labelBelow = c.cc === 'ES' || c.cc === 'MX';
      const showLabel = !['FR', 'PL', 'DE', 'IT'].includes(c.cc);
      return `<g class="hb-mark tone-${tone}${selected === c.cc ? ' is-on' : ''}" data-cc="${c.cc}" tabindex="0" role="button" aria-label="${c.name}: ${c.plants.length} plantas">
        <title>${c.name} · ${c.plants.map((p) => p.name).join(', ')}</title>
        ${dx || dy ? `<line class="hb-lead" x1="${x}" y1="${y}" x2="${bx}" y2="${by}"/><circle class="hb-anchor" cx="${x}" cy="${y}" r="2"/>` : ''}
        ${tone === 'crit' ? `<circle class="hb-pulse" cx="${bx}" cy="${by}" r="${r}"/>` : ''}
        <circle class="hb-bubble" cx="${bx}" cy="${by}" r="${r}"/>
        <text class="hb-count" x="${bx}" y="${by + 4}">${c.plants.length}</text>
        <text class="hb-cc" ${showLabel ? '' : 'data-no-translate'} x="${bx}" y="${labelBelow || !showLabel ? by + r + 12 : by - r - 6}" text-anchor="${right ? 'end' : 'middle'}">${showLabel ? c.name : c.cc}</text>
      </g>`;
    }).join('');
    return raw(`<svg class="hb-map" viewBox="0 0 ${W} ${H}" role="group" aria-label="Mapa de plantas por país"><path class="hb-dots" d="${dots()}"/>${marks}</svg>`);
  }

  /* ---------------------------------------------------------------- 1 · Red de plantas */
  App.scene({
    id: 'red', order: 10, section: 'Operación global', nav: 'Red de plantas', title: 'Red global de plantas', icon: 'globe',
    presenter: {
      say: ['Una sola vista de las plantas, de Zaragoza a Vietnam, con la hora local de cada una.', 'El grupo tiene 26 plantas; aquí representamos 13. Todo es ficticio.', 'La noche ya está resumida: lo que exige una decisión aparece primero.'],
      next: 'Pulsa un país del mapa para filtrar y luego «Revisar y decidir».'
    },
    badge: () => (decided() ? null : { text: '1', tone: 'crit' }),
    render(root, ctx) {
      const sel = ctx.vars.cc || null;
      const sum = (k) => PLANTS.reduce((s, p) => s + p[k], 0);
      const oee = PLANTS.reduce((s, p) => s + p.oee * p.machines, 0) / sum('machines');
      const rows = PLANTS.filter((p) => !sel || p.cc === sel);
      const st = decided();
      root.innerHTML = String(html`
        ${pageHead({ title: 'Red global de plantas', meta: [{ icon: 'factory', text: '13 de 26 plantas representadas' }, { icon: 'globe', text: '8 países' }, { icon: 'clock', text: 'Jueves 26/11 · seguimiento por husos horarios' }], actions: button({ label: 'Revisar el panel con el agente', icon: 'list-checks', attrs: { 'data-go': 'panel' } }) })}
        ${st ? callout({ tone: st === 'approved' ? 'ok' : 'warn', title: st === 'approved' ? 'Valdecierzo: intervención aprobada y en curso' : 'Valdecierzo: propuesta rechazada, la espiral sigue en vigilancia', body: html`<span>El detalle y la evidencia quedan en la decisión y en el registro de auditoría.</span>`, actions: button({ label: 'Ver la decisión', size: 'sm', attrs: { 'data-go': 'incidente' } }) })
    : callout({ tone: 'crit', title: 'Una decisión no puede esperar: congelador espiral de Valdecierzo, línea 3', body: html`<span>La vibración del motor ha pasado de 3,1 a 7,6 mm/s en 13 días. Si falla, la línea para unas 30 horas.</span>`, actions: button({ label: 'Revisar y decidir', variant: 'primary', size: 'sm', icon: 'arrow-right', attrs: { 'data-go': 'incidente' } }) })}
        <div class="kpis mt-4">
          ${kpi({ label: 'Plantas con datos en vivo', value: '12', unit: 'de 13', icon: 'factory', sub: 'Redfield en proceso de alta', href: '#datos' })}
          ${kpi({ label: 'Autómatas registrados', value: fmt.int(sum('plcs') - 46), icon: 'cpu', sub: `${fmt.int(sum('machines'))} máquinas`, href: '#flota' })}
          ${kpi({ label: 'Variables vigiladas', value: fmt.num(sum('tags') / 1000, 0), unit: 'mil', icon: 'activity', sub: 'Lectura cada 1 a 5 segundos' })}
          ${kpi({ label: 'OEE ponderado de la red', value: fmt.num(oee, 1), unit: '%', icon: 'gauge', sub: 'Últimos 7 días (sintético)' })}
        </div>
        <div class="grid cols-8-4 section">
          ${card({ title: 'Dónde está pasando algo', sub: 'Número de plantas por país; el color es el peor estado. Pulsa para filtrar la tabla.', icon: 'map-pin',
    actions: sel ? button({ label: 'Ver todos los países', size: 'sm', variant: 'ghost', attrs: { 'data-all': '1' } }) : '',
    body: html`<div class="hb-map-wrap">${worldMap(sel)}</div><div class="hb-legend"><span><i class="tone-ok"></i>Normal</span><span><i class="tone-warn"></i>Vigilar</span><span><i class="tone-crit"></i>Actuar</span></div>` })}
          ${card({ title: 'Anoche en la red', sub: 'Horas en CET', icon: 'history', flush: true,
    body: html`<ul class="hb-events">${EVENTS.map((e) => (e.go === 'reclamacion' && App.outcome('reclamacion') ? Object.assign({}, e, { tone: 'ok', text: App.outcome('reclamacion').status === 'approved' ? 'Respondida y stock bloqueado.' : 'Respuesta rechazada; sigue abierta.' }) : e)).map((e) => (e.go === 'incidente' && st ? Object.assign({}, e, { tone: st === 'approved' ? 'ok' : 'warn', text: st === 'approved' ? 'Plan aprobado y en ejecución.' : 'Propuesta rechazada; sigue en vigilancia.' }) : e)).map((e) => html`<li><button type="button" data-go="${e.go}" class="hb-event tone-${e.tone}"><span class="hb-event-time">${e.time}</span><span><span class="hb-event-title">${e.title}</span><span class="hb-event-sub">${HB.plant(e.plant).name} · ${e.text}</span></span></button></li>`)}</ul>` })}
        </div>
        <div class="section">
          ${card({ title: sel ? `Plantas en ${rows[0].country}` : 'Plantas', sub: 'Pulsa una planta para ver sus máquinas y autómatas', icon: 'factory', flush: true,
    body: table({
      rows, clickable: true, rowKey: 'id', rowClass: (p) => 'tone-' + plantStatus(p),
      cols: [
        { label: 'Planta', render: (p) => html`<strong>${p.name}</strong><span class="sub">${p.country} · ${p.place}</span>` },
        { label: 'Actividad', render: (p) => p.focus },
        { label: 'Hora local', render: (p) => html`<span class="code">${localTime(p)}</span>` },
        { label: 'PLC', num: true, render: (p) => (p.edge === 'onboarding' ? `71 de ${p.plcs}` : fmt.int(p.plcs)) },
        { label: 'OEE', num: true, render: (p) => fmt.pct(p.oee, 1) },
        { label: 'Máquinas en alerta', num: true, render: (p) => { const n = alertsOf(p); return n ? chip(TONE[plantStatus(p)], String(n)) : '0'; } },
        { label: 'Conexión', render: edgeChip }
      ]
    }) })}
        </div>`);
      ctx.on('click', '[data-cc]', (e, el) => { const cc = el.getAttribute('data-cc'); ctx.vars.cc = ctx.vars.cc === cc ? null : cc; ctx.rerender(); });
      ctx.on('keydown', '[data-cc]', (e, el) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ctx.vars.cc = el.getAttribute('data-cc'); ctx.rerender(); } });
      ctx.on('click', '[data-all]', () => { ctx.vars.cc = null; ctx.rerender(); });
      ctx.on('click', 'tr[data-key]', (e, el) => ctx.go('flota', el.getAttribute('data-key')));
    }
  });

  /* ---------------------------------------------------------------- 2 · Parque de máquinas y PLC */
  const daysSince = (iso) => fmt.days(iso.slice(0, 10), '2026-11-26');
  const backupOf = (m) => ((App.state.scenes.maquina || {}).backups || {})[m.id] || m.plc.backup;
  HB.backupOf = backupOf;

  App.scene({
    id: 'flota', order: 20, section: 'Operación global', nav: 'Máquinas y PLC', title: 'Parque de máquinas y autómatas', icon: 'cpu',
    presenter: {
      say: ['Este es el inventario que hoy suele estar repartido entre portátiles, hojas de cálculo y la memoria de cada planta.', 'De cada autómata: modelo, firmware, red, programa y última copia, con independencia del fabricante.', 'La muestra son 29 máquinas; el diseño es el mismo para varios miles.'],
      next: 'Filtra por «Con firmware pendiente» y abre VCZ-L3-ESP-01.'
    },
    render(root, ctx) {
      const v = ctx.vars;
      if (v.plant === undefined) v.plant = ctx.params[0] || '';
      v.vendor = v.vendor || '';
      v.show = v.show || 'all';
      v.q = v.q || '';
      const filtered = () => MACHINES.filter((m) => (!v.plant || m.plant === v.plant)
        && (!v.vendor || m.vendor === v.vendor)
        && (v.show === 'all' || (v.show === 'alert' && statusOf(m) !== 'ok') || (v.show === 'fw' && m.plc.outdated) || (v.show === 'bk' && daysSince(backupOf(m)) > 30))
        && (!v.q || `${m.id} ${m.type} ${T(m.type)} ${m.plc.model} ${m.plc.ip} ${HB.plant(m.plant).name} ${T(HB.plant(m.plant).name)}`.toLowerCase().includes(v.q.toLowerCase())));
      const vendors = Object.keys(HB.PLC).map((k) => ({ k, n: PLANTS.filter((p) => p.vendor === k).reduce((s, p) => s + (p.edge === 'onboarding' ? 71 : p.plcs), 0) })).sort((a, b) => b.n - a.n);
      const max = vendors[0].n;
      const tbl = () => table({
        rows: filtered(), clickable: true, rowKey: 'id', rowClass: (m) => 'tone-' + statusOf(m), empty: 'Ninguna máquina cumple los filtros.',
        cols: [
          { label: 'Máquina', render: (m) => html`<span class="code">${m.id}</span><span class="sub">${m.type}</span>` },
          { label: 'Planta', render: (m) => html`${HB.plant(m.plant).name}<span class="sub">${m.line} · criticidad ${m.crit}</span>` },
          { label: 'Autómata', render: (m) => html`${m.plc.model}<span class="sub">${m.plc.proto}</span>` },
          { label: 'Firmware', render: (m) => html`<span class="code">${m.plc.fw}</span>${m.plc.outdated ? html`<span class="sub t-warn">Disponible ${m.plc.latest}</span>` : html`<span class="sub">Al día</span>`}` },
          { label: 'Última copia', render: (m) => { const d = daysSince(backupOf(m)); return d > 30 ? chip('crit', `Hace ${d} días`) : d <= 0 ? 'Hoy' : `Hace ${d} ${d === 1 ? 'día' : 'días'}`; } },
          { label: 'Salud', render: (m) => healthBar(healthOf(m)) },
          { label: 'Vida útil estimada', num: true, render: (m) => (m.rul ? `${rulOf(m)} días` : '—') }
        ]
      });
      const count = () => `${filtered().length} de ${MACHINES.length} máquinas de la muestra`;
      root.innerHTML = String(html`
        ${pageHead({ title: 'Parque de máquinas y autómatas', desc: 'Registro único de cada máquina y su PLC, sea cual sea el fabricante.', actions: button({ label: 'Exportar registro (CSV)', icon: 'download', attrs: { 'data-csv': '1' } }) })}
        <div class="grid cols-7-5">
          ${card({ title: 'Autómatas por fabricante', sub: '13 plantas representadas · cifras sintéticas', icon: 'bar-chart', body: html`<div class="hb-bars">${vendors.map((x) => html`<div class="hb-bar"><span>${x.k}</span><span class="hb-bar-track"><span style="width:${(x.n / max) * 100}%"></span></span><b>${x.n}</b></div>`)}</div>` })}
          ${card({ title: 'Riesgos en la muestra', icon: 'shield', body: App.stats([
    { value: MACHINES.filter((m) => m.plc.outdated).length, label: 'PLC con firmware pendiente', tone: 'warn' },
    { value: MACHINES.filter((m) => daysSince(backupOf(m)) > 30).length, label: 'Copias de programa caducadas', tone: 'crit' },
    { value: MACHINES.filter((m) => statusOf(m) !== 'ok').length, label: 'Máquinas a vigilar o actuar' }
  ]) })}
        </div>
        <div class="section">
          <div class="hb-filters">
            <label class="field"><span class="label">Planta</span><select class="select" id="f-plant"><option value="">Todas</option>${PLANTS.map((p) => html`<option value="${p.id}" ${v.plant === p.id ? raw('selected') : ''}>${p.name}</option>`)}</select></label>
            <label class="field"><span class="label">Fabricante del PLC</span><select class="select" id="f-vendor"><option value="">Todos</option>${Object.keys(HB.PLC).map((k) => html`<option ${v.vendor === k ? raw('selected') : ''}>${k}</option>`)}</select></label>
            <label class="field hb-grow"><span class="label">Buscar</span><input class="input" id="f-q" type="search" placeholder="Código, tipo, modelo o IP" value="${v.q}"></label>
            ${segmented({ name: 'show', label: 'Mostrar', value: v.show, options: [{ value: 'all', label: 'Todas' }, { value: 'alert', label: 'En alerta' }, { value: 'fw', label: 'Con firmware pendiente' }, { value: 'bk', label: 'Copia caducada' }] })}
          </div>
          ${card({ title: html`<span id="f-count">${count()}</span>`, flush: true, body: html`<div id="f-table">${tbl()}</div>` })}
        </div>`);
      const refresh = () => { ctx.$('#f-table').innerHTML = String(tbl()); ctx.$('#f-count').textContent = count(); };
      ctx.on('change', '#f-plant', (e, el) => { v.plant = el.value; refresh(); });
      ctx.on('change', '#f-vendor', (e, el) => { v.vendor = el.value; refresh(); });
      ctx.on('input', '#f-q', (e, el) => { v.q = el.value; refresh(); });
      ctx.on('segchange', '.seg', (e) => { v.show = e.detail.value; refresh(); });
      ctx.on('click', 'tr[data-key]', (e, el) => ctx.go('maquina', el.getAttribute('data-key')));
      ctx.on('click', '[data-csv]', () => {
        App.downloadFile('hornalba-registro-plc-demo.csv', 'text/csv', App.csv({
          rows: filtered(),
          cols: [
            { label: 'Máquina', key: 'id' }, { label: 'Tipo', value: (m) => T(m.type) }, { label: 'Planta', value: (m) => T(HB.plant(m.plant).name) }, { label: 'Línea', value: (m) => T(m.line) },
            { label: 'Fabricante', key: 'vendor' }, { label: 'Modelo', value: (m) => m.plc.model }, { label: 'Referencia', value: (m) => m.plc.order },
            { label: 'Número de serie', value: (m) => m.plc.serial }, { label: 'Firmware', value: (m) => m.plc.fw }, { label: 'IP', value: (m) => m.plc.ip },
            { label: 'Programa', value: (m) => m.plc.program }, { label: 'Última copia', value: (m) => backupOf(m) }, { label: 'Salud', value: (m) => healthOf(m) }
          ].map((c) => Object.assign(c, { label: T(c.label) }))
        }));
      });
    }
  });

  /* ---------------------------------------------------------------- 3 · Ficha digital de máquina */
  App.scene({
    id: 'maquina', order: 30, section: 'Operación global', nav: 'Ficha de máquina', title: 'Ficha digital de máquina', icon: 'clipboard',
    presenter: {
      say: ['Cada máquina tiene una ficha viva: estado, autómata, variables, programa e historial.', 'Las variables conservan la dirección original del PLC y además un nombre común para toda la red.', 'Con ese nombre común se comparan máquinas gemelas de países distintos.'],
      next: 'Abre las pestañas «Variables» y «Programa y copias».'
    },
    render(root, ctx) {
      const m = HB.machine(ctx.params[0]) || HB.machine('VCZ-L3-ESP-01');
      const p = HB.plant(m.plant);
      const tags = HB.tagsFor(m);
      const approved = m.id === 'VCZ-L3-ESP-01' && decided() === 'approved';
      if (approved) { tags[0].value = 5.9; tags[1].value = 20.4; tags[3].value = (App.outcome('incidente') || {}).speed || 92; tags[4].value = 1610; }
      const vib = tags[0].value;
      const trend = HB.trendFor(m).slice();
      if (approved) trend[trend.length - 1] = { time: '26/11', value: 7.6 };
      const twins = MACHINES.filter((x) => x.id !== m.id && x.type.split(' ')[0] === m.type.split(' ')[0]);
      const fmtVal = (t) => (typeof t.value === 'number' ? fmt.num(t.value, t.dec) : t.value);
      const toneVal = (t) => (typeof t.value !== 'number' || t.warn == null ? '' : (t.name.includes('air_temp') || t.name.includes('core_temp') ? (t.value > t.crit ? 't-crit' : t.value > t.warn ? 't-warn' : '') : (t.value >= t.crit ? 't-crit' : t.value >= t.warn ? 't-warn' : '')));
      const st = statusOf(m);
      const bk = backupOf(m);
      const bkDays = daysSince(bk);
      const major = 3 + (MACHINES.indexOf(m) % 4);

      const tabState = html`
        <div class="kpis">
          ${kpi({ label: 'Índice de salud', value: String(healthOf(m)), unit: 'de 100', icon: 'activity', tone: st === 'ok' ? 'ok' : st })}
          ${kpi({ label: 'Vida útil restante', value: m.rul ? String(rulOf(m)) : 'Sin riesgo', unit: m.rul ? 'días' : '', icon: 'calendar', sub: m.rul ? 'Estimación del modelo (sintética)' : 'Nada previsto en 90 días' })}
          ${kpi({ label: tags[0].desc, value: fmt.num(vib, tags[0].dec), unit: tags[0].unit, icon: 'bar-chart', tone: toneVal(tags[0]) === 't-crit' ? 'crit' : toneVal(tags[0]) ? 'warn' : '' })}
          ${kpi({ label: tags[1].desc, value: fmt.num(tags[1].value, tags[1].dec), unit: tags[1].unit, icon: 'gauge' })}
        </div>
        <div class="grid cols-8-4 section">
          ${card({ title: `${tags[0].desc} · últimos 14 días`, sub: 'Media diaria', icon: 'activity', body: App.lineChart({ series: trend, threshold: { value: tags[0].warn, label: T(`Aviso ${fmt.num(tags[0].warn)}`) }, critical: { value: tags[0].crit, label: T(`Actuar ${fmt.num(tags[0].crit)}`) }, unit: 'mm/s', height: 240, seriesLabel: T(tags[0].desc), legend: false }) })}
          ${card({ title: 'Máquinas del mismo tipo', sub: 'Comparación entre plantas', icon: 'layers', flush: true, body: table({ rows: twins, clickable: true, rowKey: 'id', dense: true, empty: 'No hay otra igual en la muestra.', cols: [{ label: 'Máquina', render: (x) => html`<span class="code">${x.id}</span><span class="sub">${HB.plant(x.plant).name}</span>` }, { label: 'Salud', render: (x) => healthBar(healthOf(x)) }] }) })}
        </div>`;

      const P = m.plc;
      const tabPlc = html`<div class="grid cols-2">
        ${card({ title: 'Identificación', icon: 'barcode', body: kv([['Nombre', html`<span class="code">${P.tag}</span>`], ['Fabricante', m.vendor], ['Modelo', P.model], ['Referencia', html`<span class="code">${P.order}</span>`], ['Número de serie', html`<span class="code">${P.serial}</span>`], ['Firmware', html`<span class="code">${P.fw}</span> ${P.outdated ? chip('warn', `Disponible ${P.latest}`) : chip('ok', 'Al día')}`], ['Instalado', P.installed.split('-').reverse().join('/')], ['Entradas y salidas', P.io]]) })}
        ${card({ title: 'Red y funcionamiento', icon: 'route', body: kv([['Dirección IP', html`<span class="code">${P.ip}</span>`], ['Red industrial', P.vlan], ['MAC', html`<span class="code">${P.mac}</span>`], ['Protocolos', P.proto], ['Herramienta de ingeniería', P.tool], ['Tiempo de ciclo', `${P.cycle} ms`], ['Carga de CPU', `${P.cpu} %`], ['Equipo edge', html`<span class="code">EDGE-${p.cc}-${p.code}-01</span> · solo lectura salvo consignas autorizadas`]]) })}
      </div>`;

      const tabTags = card({ title: 'Variables en vivo', sub: 'Valores simulados que se actualizan solos', icon: 'activity', flush: true, actions: chip('running', 'Leyendo'),
        body: table({ rows: tags, cols: [
          { label: 'Variable', render: (t) => html`<span class="code">${t.name}</span><span class="sub">${t.desc}</span>` },
          { label: 'Dirección en el PLC', render: (t) => html`<span class="code">${t.addr}</span>` },
          { label: 'Valor', num: true, render: (t) => html`<span class="hb-live ${toneVal(t)}" data-live="${t.name}">${fmtVal(t)}</span> ${t.unit}` },
          { label: 'Aviso / actuar', num: true, render: (t) => (t.warn == null ? '—' : `${fmt.num(t.warn)} / ${fmt.num(t.crit)}`) },
          { label: 'Muestreo', render: (t) => t.rate }
        ] }) });

      const versions = [
        { v: `v${major}.${(MACHINES.indexOf(m) * 3) % 10}`, date: bk, who: 'Copia automática', ref: 'En producción', hash: 'a91f…3c0e' },
        { v: `v${major}.${((MACHINES.indexOf(m) * 3) % 10 + 9) % 10}`, date: '2026-09-14T22:40:00', who: 'Ingeniería de planta', ref: 'CAM-2026-0288', hash: '77bd…91a4' },
        { v: `v${major - 1}.8`, date: '2026-05-03T06:15:00', who: 'Fabricante de la máquina', ref: 'CAM-2026-0102', hash: '0c42…fe17' }
      ];
      const tabProg = html`
        ${bkDays > 30 ? callout({ tone: 'crit', title: `La última copia tiene ${bkDays} días`, body: html`<span>Si el autómata fallara hoy, se recuperaría una versión que puede no ser la que está en marcha.</span>` }) : ''}
        <div class="${bkDays > 30 ? 'mt-4' : ''}">${card({ title: `Programa ${P.program}`, sub: 'Cada versión queda guardada con su huella y la orden que la justifica', icon: 'git-branch', flush: true,
    actions: html`${button({ label: 'Comparar con la anterior', size: 'sm', icon: 'eye', attrs: { 'data-diff': '1' } })}${button({ label: 'Pedir copia ahora', size: 'sm', variant: 'primary', icon: 'save', attrs: { 'data-backup': '1' } })}`,
    body: table({ rows: versions, dense: true, cols: [{ label: 'Versión', render: (r) => html`<span class="code">${r.v}</span>` }, { label: 'Fecha', render: (r) => fmt.date(r.date) }, { label: 'Origen', key: 'who' }, { label: 'Justificación', key: 'ref' }, { label: 'Huella', render: (r) => html`<span class="code">${r.hash}</span>` }] }) })}</div>`;

      const hist = [
        ...(m.id === 'VCZ-L3-ESP-01' ? [
          ...(approved ? [{ time: '26/11', timeSub: 'hoy', title: 'Intervención aprobada', text: 'Velocidad reducida y orden de trabajo creada para el viernes.', tone: 'ok' }] : []),
          { time: '26/11', timeSub: '05:50', title: 'Alarma de vibración (7,1 mm/s)', text: 'Detectada por el agente de vigilancia.', tone: 'crit' },
          { time: '23/11', title: 'Aviso de vibración (4,5 mm/s)', text: 'Quedó en observación.', tone: 'warn' },
          { time: '09/10', title: 'Engrase de rodamientos', text: 'Orden preventiva cerrada.', tone: 'ok' }
        ] : [
          { time: '24/11', title: st === 'ok' ? 'Revisión de turno sin hallazgos' : 'Aviso del agente de vigilancia', text: st === 'ok' ? 'Variables dentro de su comportamiento habitual.' : 'Una variable se aleja de su comportamiento habitual.', tone: st === 'ok' ? 'ok' : 'warn' },
          { time: '09/10', title: 'Mantenimiento preventivo', text: 'Orden cerrada en SAP PM.', tone: 'ok' }
        ]),
        { time: '14/09', title: 'Cambio de programa CAM-2026-0288', text: 'Ajuste de receta autorizado.', tone: 'brand' },
        { time: P.installed.split('-').reverse().join('/'), title: 'Puesta en marcha del autómata', text: P.model }
      ];

      root.innerHTML = String(html`
        ${pageHead({ title: `${m.type} · ${m.id}`, meta: [{ icon: 'map-pin', text: `${p.name} (${p.country}) · ${m.line}` }, { icon: 'clock', text: `Hora local ${localTime(p)}` }, html`${chip(st === 'ok' ? 'ok' : st, st === 'ok' ? 'Normal' : st === 'warn' ? 'Vigilar' : 'Actuar')}`],
          actions: html`<label class="sr-only" for="m-sel">Cambiar de máquina</label><select class="select hb-msel" id="m-sel">${MACHINES.map((x) => html`<option value="${x.id}" ${x.id === m.id ? raw('selected') : ''}>${x.id} · ${x.type}</option>`)}</select>` })}
        ${m.id === 'VCZ-L3-ESP-01' && !decided() ? html`<div class="mb-4">${callout({ tone: 'crit', title: 'Hay una propuesta esperando tu decisión', actions: button({ label: 'Revisar y decidir', size: 'sm', variant: 'primary', attrs: { 'data-go': 'incidente' } }) })}</div>` : ''}
        ${tabs({ id: 'ficha', label: 'Secciones de la ficha', active: ctx.vars.tab || 'estado', tabs: [
    { id: 'estado', label: 'Estado', icon: 'activity', body: tabState },
    { id: 'plc', label: 'Autómata', icon: 'cpu', body: tabPlc },
    { id: 'variables', label: 'Variables', icon: 'list-checks', count: tags.length, body: tabTags },
    { id: 'programa', label: 'Programa y copias', icon: 'git-branch', body: tabProg },
    { id: 'historial', label: 'Historial', icon: 'history', body: card({ body: timeline({ items: hist }) }) }
  ] })}`);

      ctx.on('tabchange', '[data-tabs]', (e) => { ctx.vars.tab = e.detail.tab; });
      ctx.on('change', '#m-sel', (e, el) => ctx.go('maquina', el.value));
      ctx.on('click', 'tr[data-key]', (e, el) => ctx.go('maquina', el.getAttribute('data-key')));
      ctx.on('click', '[data-backup]', () => {
        const all = Object.assign({}, ctx.local.backups, { [m.id]: App.nowISO() });
        ctx.setLocal({ backups: all });
        ctx.audit('Copia de programa solicitada', `${m.id} · ${P.program} · lectura desde el edge, sin parar la máquina (simulado)`);
        ctx.toast('Copia del programa guardada en el repositorio (simulado)', { tone: 'ok', icon: 'save' });
        ctx.rerender();
      });
      ctx.on('click', '[data-diff]', () => ctx.modal({
        title: 'Cambios respecto a la versión anterior', kicker: `${m.id} · ${versions[1].v} → ${versions[0].v}`, size: 'lg',
        body: html`<p class="slate mb-4">La plataforma compara bloques y parámetros. No modifica el programa.</p>${table({ dense: true, rows: [
          { b: 'Receta / consigna de velocidad', a: '96 %', n: '100 %', r: 'CAM-2026-0288' },
          { b: 'Temporizador de desescarche', a: '420 s', n: '390 s', r: 'CAM-2026-0288' },
          { b: 'Límite de intensidad (aviso)', a: '21,0 A', n: '22,0 A', r: 'CAM-2026-0288' },
          { b: 'Bloques de seguridad', a: 'Sin cambios', n: 'Sin cambios', r: '—' }
        ], cols: [{ label: 'Bloque o parámetro', key: 'b' }, { label: 'Antes', key: 'a' }, { label: 'Ahora', key: 'n' }, { label: 'Orden', key: 'r' }] })}`
      }));
      /* Lecturas simuladas */
      ctx.every(1500, () => {
        tags.forEach((t) => {
          if (typeof t.value !== 'number' || t.name.includes('setpoint')) return;
          const el = ctx.$(`[data-live="${t.name}"]`);
          if (!el) return;
          const jitter = t.name.includes('count') ? Math.floor(Math.random() * 3) : (Math.random() - 0.5) * Math.abs(t.value) * 0.008;
          if (t.name.includes('count')) t.value += jitter;
          const shown = t.name.includes('count') ? t.value : t.value + jitter;
          el.textContent = fmt.num(shown, t.dec);
        });
      });
    }
  });

  /* ---------------------------------------------------------------- 4 · Datos de cada PLC */
  const MODEL = [
    { cat: 'Identidad', what: 'Planta, línea, máquina, fabricante, modelo, referencia, número de serie, firmware', src: 'Descubrimiento + SAP PM', freq: 'Al alta y ante cambios', keep: 'Vida del activo', store: 'Registro de activos' },
    { cat: 'Red y accesos', what: 'IP, VLAN, MAC, protocolos, puertos, usuarios y accesos de ingeniería', src: 'Edge', freq: 'Diaria', keep: '5 años', store: 'Registro de activos' },
    { cat: 'Programa', what: 'Copia completa, versión, huella, diferencias y orden que autoriza el cambio', src: 'Herramienta del fabricante', freq: 'Diaria y ante cambios', keep: 'Todas las versiones', store: 'Repositorio de programas' },
    { cat: 'Configuración', what: 'Parámetros, recetas, consignas, límites y módulos de E/S', src: 'PLC', freq: 'Ante cambios', keep: 'Historial completo', store: 'Registro de activos' },
    { cat: 'Señales', what: 'Vibración, intensidad, temperatura, presión, velocidad, estados, contadores', src: 'PLC y sensores', freq: '1 a 5 s', keep: '90 días a resolución completa, 5 años agregado', store: 'Histórico de series' },
    { cat: 'Alarmas y eventos', what: 'Alarmas, paradas, microparadas, rearmes y cambios de modo', src: 'PLC y SCADA', freq: 'Al ocurrir', keep: '5 años', store: 'Eventos' },
    { cat: 'Mantenimiento', what: 'Órdenes, averías, causas, repuestos, horas y costes', src: 'SAP PM / GMAO', freq: 'Cada 15 min', keep: 'Vida del activo', store: 'Eventos' },
    { cat: 'Contexto', what: 'Producto, lote, turno, plan de producción y ventanas de limpieza', src: 'MES y planificación', freq: 'Cada 5 min', keep: '5 años', store: 'Eventos' },
    { cat: 'Documentación', what: 'Manuales, esquemas eléctricos, procedimientos y análisis de riesgo', src: 'Gestor documental', freq: 'Ante cambios', keep: 'Vigente e histórico', store: 'Documentos' }
  ];
  const MAPPING = [
    { id: 1, native: 'Program:Main.Oven3.Z1_PV', type: 'REAL', to: 'zone1.temperature', unit: '°C', conf: 98 },
    { id: 2, native: 'Program:Main.Oven3.Z2_PV', type: 'REAL', to: 'zone2.temperature', unit: '°C', conf: 98 },
    { id: 3, native: 'Program:Main.Oven3.BeltTmr', type: 'DINT', to: 'belt.bake_time', unit: 's → min', conf: 91 },
    { id: 4, native: 'MCC_07.VFD_Exh.OutCurrent', type: 'REAL', to: 'drive.motor.current', unit: 'A', conf: 94 },
    { id: 5, native: 'MCC_07.VFD_Exh.Spd_Ref', type: 'REAL', to: 'process.speed_setpoint', unit: '%', conf: 92 },
    { id: 6, native: 'N7[42]', type: 'INT', to: 'burner.gas_flow', unit: 'm³/h ×10', conf: 62 },
    { id: 7, native: 'B3:4/7', type: 'BOOL', to: 'sin propuesta fiable', unit: '—', conf: 31 }
  ];
  const UNS = `hornalba/
└─ es/valdecierzo/linea-3/congelador-espiral-01/
   ├─ identidad          (retenido)
   ├─ estado             marcha · parada · alarma
   ├─ senales/drive/motor/vibration_rms
   ├─ senales/drive/motor/current
   ├─ alarmas
   ├─ programa           versión + huella
   └─ ordenes            vínculo con SAP PM`;
  const UNS_EN = `hornalba/
└─ es/valdecierzo/line-3/spiral-freezer-01/
   ├─ identity           (retained)
   ├─ state              running · stopped · alarm
   ├─ signals/drive/motor/vibration_rms
   ├─ signals/drive/motor/current
   ├─ alarms
   ├─ program            version + hash
   └─ work-orders        link to SAP PM`;
  const PAYLOAD = `{
  "asset": "VCZ-L3-ESP-01",
  "signal": "drive.motor.vibration_rms",
  "value": 7.62,
  "unit": "mm/s",
  "quality": "good",
  "ts": "2026-11-26T06:00:00Z",
  "source": {
    "plc": "PLC-VCZ-L3-ESP-01",
    "address": "DB120.DBD0",
    "edge": "EDGE-ES-VCZ-01"
  }
}`;

  App.scene({
    id: 'datos', order: 40, section: 'Operación global', nav: 'Datos de PLC', title: 'Cómo se recogen y guardan los datos de cada PLC', icon: 'database',
    presenter: {
      say: ['La base de todo: un equipo en cada planta lee los PLC sin tocarlos y publica los datos con un nombre común.', 'Dar de alta una planta nueva no es meses de integración a mano: los agentes proponen y la ingeniería valida.', 'Redfield, recién incorporada al grupo, es un buen ejemplo de planta a dar de alta.'],
      next: 'Pulsa «Descubrir PLC» y acepta las equivalencias con alta confianza.'
    },
    render(root, ctx) {
      const found = !!ctx.local.found;
      const ok = ctx.local.ok || [];
      const flow = App.planGraph({
        title: T('Recorrido del dato'), layout: 'auto', nodeWidth: 164,
        nodes: graphNodes([
          { id: 'plc', kind: 'trigger', kindLabel: 'Planta', label: 'PLC y variadores', sub: 'Siemens, Rockwell, Schneider…', status: 'done' },
          { id: 'edge', kind: 'action', kindLabel: 'Planta', label: 'Equipo edge', sub: 'Lee y guarda si cae la red', systems: ['OPC UA'], icon: 'server', status: 'done' },
          { id: 'uns', kind: 'action', kindLabel: 'Transporte', label: 'Espacio de nombres único', sub: 'Mismo nombre en toda la red', systems: ['MQTT'], icon: 'route', status: 'done' },
          { id: 'reg', kind: 'output', kindLabel: 'Guardado', label: 'Activos y programas', icon: 'database', status: 'done' },
          { id: 'ts', kind: 'output', kindLabel: 'Guardado', label: 'Series y eventos', icon: 'bar-chart', status: 'done' },
          { id: 'ag', kind: 'agent', kindLabel: 'Decisión', label: 'Capa de agentes', sub: 'Vigila, diagnostica, planifica', status: 'done' }
        ]),
        edges: [['plc', 'edge'], ['edge', 'uns'], ['uns', 'reg'], ['uns', 'ts'], ['reg', 'ag'], ['ts', 'ag']]
      });
      const mapping = table({ dense: true, rows: MAPPING, cols: [
        { label: 'Variable en el PLC', render: (r) => html`<span class="code">${r.native}</span><span class="sub">${r.type}</span>` },
        { label: 'Nombre común propuesto', render: (r) => html`<span class="code">${r.to}</span><span class="sub">${r.unit}</span>` },
        { label: 'Confianza', num: true, render: (r) => chip(r.conf >= 90 ? 'ok' : r.conf >= 50 ? 'warn' : 'crit', `${r.conf} %`) },
        { label: 'Validación', render: (r) => (ok.includes(r.id) ? chip('ok', 'Validada') : r.conf >= 50 ? button({ label: 'Validar', size: 'sm', attrs: { 'data-ok': r.id } }) : html`<span class="muted">Requiere ir a planta</span>`) }
      ] });
      root.innerHTML = String(html`
        ${pageHead({ title: 'Cómo se recogen y guardan los datos de cada PLC', desc: 'Lectura en planta, un nombre común para toda la red y un historial que sirve para decidir.' })}
        ${card({ title: 'Recorrido del dato', icon: 'route', body: flow })}
        <div class="section">${card({ title: 'Qué se guarda de cada autómata', sub: 'Propuesta de modelo de datos; frecuencias y plazos a acordar con cada planta', icon: 'database', flush: true,
    body: table({ rows: MODEL, cols: [{ label: 'Bloque', render: (r) => html`<strong>${r.cat}</strong><span class="sub">${r.store}</span>` }, { label: 'Datos', key: 'what' }, { label: 'Origen', key: 'src' }, { label: 'Frecuencia', key: 'freq' }, { label: 'Conservación', key: 'keep' }] }) })}</div>
        <div class="grid cols-2 section">
          ${card({ title: 'Nombre único por variable', sub: 'Estructura empresa / país / planta / línea / máquina', icon: 'route', body: html`<pre class="hb-code">${EN ? UNS_EN : UNS}</pre>` })}
          ${card({ title: 'Ejemplo de lectura', sub: 'Siempre se conserva de dónde viene', icon: 'file-text', actions: button({ label: 'Copiar', size: 'sm', icon: 'copy', attrs: { 'data-copy': PAYLOAD } }), body: html`<pre class="hb-code">${PAYLOAD}</pre>` })}
        </div>
        <div class="section">${card({ title: 'Alta de una planta: Redfield (Texas)', sub: found ? `${ok.length} de ${MAPPING.length} equivalencias validadas en la muestra` : '71 de 117 autómatas descubiertos. Falta el área de hornos.', icon: 'plus',
    actions: found ? button({ label: 'Validar las de confianza alta', size: 'sm', variant: 'primary', icon: 'check', disabled: MAPPING.filter((r) => r.conf >= 90).every((r) => ok.includes(r.id)), attrs: { 'data-okall': '1' } }) : button({ label: 'Descubrir PLC (solo lectura)', variant: 'primary', size: 'sm', icon: 'search', attrs: { 'data-discover': '1' } }),
    body: found ? mapping : html`<div id="disc"><p class="slate">El agente recorre la red industrial desde el edge, identifica cada autómata, lee su lista de variables y propone el nombre común. Nada se escribe en los PLC.</p></div>` })}</div>`);
      ctx.on('click', '[data-discover]', (e, el) => {
        el.disabled = true;
        ctx.audit('Descubrimiento de PLC iniciado', 'Redfield · área de hornos · modo lectura (simulado)');
        const stream = App.reasoningStream(ctx.$('#disc'), [
          { agent: 'Ciberseguridad OT', system: 'Edge', action: 'Comprobar ventana autorizada y modo lectura', result: 'Permitido: solo consultas de identificación y lectura', ms: 900 },
          { agent: 'Orquestador', system: 'Edge', action: 'Recorrer la red OT-110', result: '46 autómatas y 19 variadores responden', ms: 1600 },
          { agent: 'Conocimiento', system: 'Registro de activos', action: 'Identificar modelo, firmware y número de serie', result: 'ControlLogix, CompactLogix y 6 SLC 500 antiguos', ms: 1200, tone: 'warn' },
          { agent: 'Conocimiento', system: 'Repositorio de programas', action: 'Buscar copias de programa existentes', result: '29 sin copia localizada', ms: 1100, tone: 'warn' },
          { agent: 'Conocimiento', system: 'Registro de activos', action: 'Proponer nombre común para las variables', result: '4.180 propuestas · 81 % con confianza alta', ms: 1500, tone: 'ok' }
        ], { signal: ctx.signal, title: 'Descubrimiento en Redfield' });
        stream.done.then(() => ctx.after(500, () => { ctx.setLocal({ found: true }); ctx.rerender(); }));
      });
      const validate = (ids) => {
        ctx.setLocal({ ok: Array.from(new Set(ok.concat(ids))) });
        ctx.audit('Equivalencias de variables validadas', `Redfield · ${ids.length} variable(s)`);
        ctx.rerender();
      };
      ctx.on('click', '[data-ok]', (e, el) => validate([Number(el.getAttribute('data-ok'))]));
      ctx.on('click', '[data-okall]', () => validate(MAPPING.filter((r) => r.conf >= 90).map((r) => r.id)));
    }
  });
})();
