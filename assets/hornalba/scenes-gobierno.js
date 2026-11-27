/* Hornalba · gobierno y despliegue: capa agéntica y su autonomía; arquitectura, piloto y valor. */
(function () {
  'use strict';
  const App = window.App;
  const HB = window.HB;
  const { html, raw, icon, fmt, chip, card, kpi, table, pageHead, button, callout, kv, segmented, timeline } = App;

  /* ---------------------------------------------------------------- 9 · Capa de agentes */
  const LEVELS = [{ value: 'prop', label: 'Propone' }, { value: 'apr', label: 'Con aprobación' }, { value: 'auto', label: 'Actúa solo' }];
  const ACTIONS = [
    { id: 'read', label: 'Leer variables, alarmas y configuración', who: '—', fixed: 'Siempre (solo lectura)' },
    { id: 'backup', label: 'Copiar el programa de un PLC', who: 'Ingeniería de planta', def: 'auto', max: 2 },
    { id: 'wo', label: 'Crear una orden de trabajo', who: 'Jefatura de mantenimiento', def: 'apr', max: 2 },
    { id: 'part', label: 'Reservar y trasladar repuestos', who: 'Jefatura de mantenimiento', def: 'apr', max: 2 },
    { id: 'set', label: 'Cambiar una consigna autorizada, dentro de límites', who: 'Jefatura de planta', def: 'apr', max: 1 },
    { id: 'stop', label: 'Pedir parada controlada de una máquina', who: 'Jefatura de turno', def: 'apr', max: 1 },
    { id: 'code', label: 'Modificar el programa o actualizar firmware', who: 'Ingeniería, con su herramienta', fixed: 'Nunca el agente' },
    { id: 'safe', label: 'Seguridad: paradas de emergencia y PLC de seguridad', who: 'Nadie a través de la plataforma', fixed: 'Nunca' }
  ];
  App.scene({
    id: 'agentes', order: 90, section: 'Gobierno y despliegue', nav: 'Agentes y autonomía', title: 'La capa agéntica y sus límites', icon: 'users',
    presenter: {
      say: ['Ocho agentes con un encargo concreto cada uno, coordinados por un orquestador.', 'La autonomía se decide por tipo de acción, y se puede ampliar a medida que se gana confianza.', 'Hay cosas que no se pueden activar: tocar la lógica del PLC o la seguridad.'],
      next: 'Intenta subir la autonomía de una acción y mira el registro de auditoría.'
    },
    render(root, ctx) {
      const pol = ctx.local.pol || {};
      const lvl = (a) => pol[a.id] || a.def;
      root.innerHTML = String(html`
        ${pageHead({ title: 'La capa agéntica y sus límites', desc: 'Por encima de los PLC y de los sistemas de planta. No sustituye al autómata, al SCADA ni al sistema de mantenimiento.' })}
        <div class="hb-agents">${HB.AGENTS.map((a) => html`<article class="card hb-agent"><div class="hb-agent-head"><span class="card-icon">${icon(a.icon, 18)}</span><h2 class="card-title">${a.name}</h2></div><p class="slate small">${a.does}</p><div class="hb-agent-foot">${App.sysList(a.reads)}<span class="muted xs">${fmt.int(a.runs)} ejecuciones en 24 h</span></div></article>`)}</div>
        <div class="section">${card({ title: 'Qué puede hacer cada uno sin preguntar', sub: 'Política de toda la red. Cada planta puede ser más estricta, nunca menos.', icon: 'shield-check', flush: true,
    body: table({ rows: ACTIONS, cols: [
      { label: 'Acción', render: (a) => html`<strong>${a.label}</strong>` },
      { label: 'Nivel de autonomía', render: (a) => (a.fixed ? html`<span class="hb-locked">${icon(a.id === 'read' ? 'eye' : 'lock', 14)}${a.fixed}</span>` : segmented({ name: a.id, label: a.label, value: lvl(a), options: LEVELS.slice(0, a.max + 1) })) },
      { label: 'Quién aprueba', render: (a) => (!a.fixed && lvl(a) === 'auto' ? 'Se informa después' : a.who) }
    ] }) })}</div>
        <div class="grid cols-3 section">
          ${card({ title: 'Si cae la red', icon: 'server', body: html`<p class="slate">La planta sigue produciendo igual. El edge guarda las lecturas y las envía al recuperar la conexión.</p>` })}
          ${card({ title: 'Si un agente se equivoca', icon: 'history', body: html`<p class="slate">Toda escritura pasa por límites en el edge, se verifica leyendo de vuelta y queda registrada con la forma de deshacerla.</p>` })}
          ${card({ title: 'Si alguien pregunta quién fue', icon: 'file-text', body: html`<p class="slate">Cada propuesta guarda su evidencia, quién la aprobó y qué se ejecutó.</p>${button({ label: 'Ver registro de auditoría', size: 'sm', class: 'mt-3', attrs: { 'data-open-audit': '1' } })}` })}
        </div>`);
      ctx.on('segchange', '.seg', (e) => {
        const a = ACTIONS.find((x) => x.id === e.detail.name);
        ctx.setLocal({ pol: Object.assign({}, ctx.local.pol, { [a.id]: e.detail.value }) });
        ctx.audit('Política de autonomía cambiada', `${a.label} → ${LEVELS.find((l) => l.value === e.detail.value).label}`);
        ctx.rerender();
      });
    }
  });

  /* ---------------------------------------------------------------- 10 · Arquitectura, piloto y valor */
  const LAYERS = [
    { name: 'Personas y aplicaciones', where: 'Central y planta', items: ['Consola de la red', 'Aprobaciones en Teams', 'Preguntas en lenguaje normal', 'Cuadros de dirección'], hi: false },
    { name: 'Capa agéntica', where: 'Central', items: ['Orquestador', 'Agentes especialistas', 'Política de autonomía', 'Auditoría y coste por petición'], hi: true },
    { name: 'Plataforma de datos', where: 'Nube o centro de datos de Hornalba', items: ['Registro de activos y PLC', 'Histórico de series', 'Eventos y órdenes', 'Programas y documentos'], hi: false },
    { name: 'Conectores de negocio', where: 'Central y planta', items: ['ERP y mantenimiento', 'MES y planificación', 'SCADA', 'Almacén de repuestos'], hi: false },
    { name: 'Equipo edge en cada planta', where: 'Zona intermedia (DMZ industrial)', items: ['Lectura OPC UA y protocolos nativos', 'Almacenamiento local', 'Lista cerrada de escrituras', 'Solo conexiones salientes'], hi: false },
    { name: 'Máquinas y control', where: 'Red industrial de planta', items: ['PLC y variadores', 'PLC de seguridad (aislado)', 'Sensores añadidos', 'HMI'], hi: false }
  ];
  const ROADMAP = [
    { time: 'Fase 0', timeSub: '4–6 sem.', title: 'Descubrimiento en una planta', text: 'Inventario real de PLC, redes, SCADA, sistema de mantenimiento y copias de programa. Resultado: mapa de partida y plan de piloto.', tone: 'brand' },
    { time: 'Fase 1', timeSub: '12 sem.', title: 'Piloto en una línea, solo lectura', text: 'Una línea completa en una planta española: edge, registro, histórico, ficha de máquina y avisos. Sin escrituras.', tone: 'brand' },
    { time: 'Fase 2', timeSub: '4–6 meses', title: 'Tres plantas con tres fabricantes', text: 'Añadir una planta de Estados Unidos y la de Vietnam. Órdenes de trabajo con aprobación y comparación entre gemelas.', tone: 'brand' },
    { time: 'Fase 3', timeSub: '12–24 meses', title: 'Despliegue global', text: 'Resto de plantas por oleadas. Consignas autorizadas donde la planta lo apruebe. Alta estándar para plantas adquiridas.', tone: 'brand' }
  ];
  const QUESTIONS = [
    '¿Cuántas plantas y líneas entran en el alcance y cuál es la primera?',
    '¿Qué fabricantes y antigüedades de PLC hay realmente? ¿Existe un inventario?',
    '¿Qué SCADA, MES, ERP y sistema de mantenimiento usa cada planta?',
    '¿Están separadas las redes industriales? ¿Quién autoriza conexiones?',
    '¿Qué garantías o contratos de fabricantes limitan el acceso a sus máquinas?',
    '¿Cuánto cuesta hoy una hora de parada por tipo de línea?',
    '¿Qué requisitos fijan ciberseguridad (IEC 62443, NIS2) y la residencia de los datos en cada país?'
  ];
  App.scene({
    id: 'hoja', order: 100, section: 'Gobierno y despliegue', nav: 'Arquitectura y piloto', title: 'Cómo se construye y por dónde empezar', icon: 'layers',
    presenter: {
      say: ['Se empieza leyendo, en una línea, sin tocar ningún PLC.', 'El valor se calcula con las cifras del cliente; las que se ven son supuestos de ejemplo.', 'Cerramos con las preguntas que necesitamos contestar para dimensionar el proyecto.'],
      next: 'Mueve los supuestos de la calculadora y acuerda la planta del piloto.'
    },
    render(root, ctx) {
      const s = Object.assign({ lines: 54, hours: 6, cost: 4000, red: 25 }, ctx.local.sim);
      const total = (x) => x.lines * x.hours * 12 * x.cost * (x.red / 100);
      const lost = (x) => x.lines * x.hours * 12;
      const SL = [
        { k: 'lines', label: 'Líneas dentro del alcance', min: 4, max: 120, step: 2, u: '' },
        { k: 'hours', label: 'Horas de parada no planificada por línea y mes', min: 1, max: 20, step: 1, u: ' h' },
        { k: 'cost', label: 'Coste de una hora de parada', min: 1000, max: 10000, step: 250, u: ' €' },
        { k: 'red', label: 'Reducción de paradas no planificadas', min: 5, max: 45, step: 5, u: ' %' }
      ];
      root.innerHTML = String(html`
        ${pageHead({ title: 'Cómo se construye y por dónde empezar', desc: 'Propuesta de partida, pendiente de contrastar en las plantas.' })}
        ${card({ title: 'Arquitectura por capas', sub: 'De la máquina a la decisión; los datos suben y las órdenes bajan solo con permiso', icon: 'layers', body: html`<div class="hb-layers">${LAYERS.map((l) => html`<div class="hb-layer${l.hi ? ' is-hi' : ''}"><div class="hb-layer-name"><strong>${l.name}</strong><span>${l.where}</span></div><ul>${l.items.map((i) => html`<li>${i}</li>`)}</ul></div>`)}</div>` })}
        <div class="grid cols-2 section">
          ${card({ title: 'Hoja de ruta', sub: 'Duraciones orientativas', icon: 'route', body: timeline({ items: ROADMAP }) })}
          ${card({ title: 'Valor: calculadora de partida', sub: 'Supuestos de ejemplo, para ajustar con cifras reales.', icon: 'euro', body: html`
            <div class="hb-sliders">${SL.map((x) => html`<label class="hb-slider"><span>${x.label}<b data-out="${x.k}">${fmt.num(s[x.k])}${x.u}</b></span><input type="range" id="sl-${x.k}" data-k="${x.k}" data-u="${x.u}" min="${x.min}" max="${x.max}" step="${x.step}" value="${s[x.k]}"></label>`)}</div>
            <div class="hb-result"><span>Pérdida evitada al año</span><strong id="r-total">${fmt.num(total(s) / 1e6, 1)} M€</strong><span class="muted small">sobre <b id="r-hours">${fmt.int(lost(s))}</b> horas de parada al año en el alcance. Antes de descontar la inversión y la operación.</span></div>` })}
        </div>
        <div class="grid cols-2 section">
          ${card({ title: 'Cómo sabremos que funciona', icon: 'gauge', flush: true, body: table({ dense: true, rows: [
    { k: 'PLC inventariados con copia vigente', t: '100 % de la línea piloto' },
    { k: 'Averías avisadas con más de 48 h', t: 'Al menos 1 de cada 2' },
    { k: 'Avisos útiles sobre el total', t: 'Más del 70 %' },
    { k: 'Tiempo de diagnóstico', t: 'De horas a minutos' },
    { k: 'Escrituras fuera de política', t: 'Cero' }
  ], cols: [{ label: 'Indicador', key: 'k' }, { label: 'Objetivo propuesto', key: 't' }] }) })}
          ${card({ title: 'Lo que necesitamos saber', sub: 'Marca lo que ya esté contestado', icon: 'list-checks', body: html`<div class="hb-checks">${QUESTIONS.map((q, i) => html`<label class="check"><input type="checkbox" data-qi="${i}" ${(ctx.local.qs || []).includes(i) ? raw('checked') : ''}><span>${q}</span></label>`)}</div><div class="mt-4">${button({ label: 'Copiar las preguntas pendientes', size: 'sm', icon: 'copy', attrs: { 'data-copyq': '1' } })}</div>` })}
        </div>`);
      ctx.on('input', 'input[type="range"]', (e, el) => {
        const k = el.getAttribute('data-k');
        s[k] = Number(el.value);
        ctx.$(`[data-out="${k}"]`).textContent = `${fmt.num(s[k])}${el.getAttribute('data-u')}`;
        ctx.$('#r-total').textContent = `${fmt.num(total(s) / 1e6, 1)} M€`;
        ctx.$('#r-hours').textContent = fmt.int(lost(s));
      });
      ctx.on('change', 'input[type="range"]', () => ctx.setLocal({ sim: Object.assign({}, s) }));
      ctx.on('change', '[data-qi]', () => ctx.setLocal({ qs: ctx.$$('[data-qi]').filter((x) => x.checked).map((x) => Number(x.getAttribute('data-qi'))) }));
      ctx.on('click', '[data-copyq]', () => App.copyText(QUESTIONS.filter((q, i) => !(ctx.local.qs || []).includes(i)).map((q) => `- ${HB.T(q)}`).join('\n'), 'Preguntas copiadas'));
    }
  });
})();
