/* Subtropicales Axarquía · registros de trazabilidad (lotes de recepción, lotes de manipulado, cámaras y campañas de retirada).
 * Los lee App.traceModal desde DATA.trace[código] (claves en mayúsculas).
 * Escenario de demostración con datos sintéticos (MFM). */
agenticPack('fruta', {
  trace: (function () {
    'use strict';

    /* ------------------------------------------------------------ Utilidades */
    const n = (v) => String(v).replace('.', ',');
    const t = (v) => `${n(Math.round(v * 100) / 100)} t`;
    const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
    const COUNTRY = { ES: 'España', FR: 'Francia', DE: 'Alemania' };

    /* ------------------------------------------------------------ Datos maestros (sintéticos) */
    const CUSTOMERS = [
      { id: 'SUP', label: 'Supermercados Levante Fresh, S.A.', cc: 'ES' },
      { id: 'MAY', label: 'Mercamálaga Mayoristas, S.L.', cc: 'ES' },
      { id: 'IBE', label: 'Supermercados Ibérica Fresca, S.A.', cc: 'ES' },
      { id: 'ALM', label: 'Hipermercados Costa Sol, S.A.', cc: 'ES' },
      { id: 'MER', label: 'Mercado Central Valencia Mayoristas, S.L.', cc: 'ES' },
      { id: 'FR1', label: 'Primeurs Sud-Ouest, S.A.S.', cc: 'FR' },
      { id: 'FR2', label: 'Marché Fraîcheur France, S.A.', cc: 'FR' },
      { id: 'FR3', label: 'Groupe Verger Atlantique, S.A.S.', cc: 'FR' },
      { id: 'DE1', label: 'Obst und Gemüse Rhein-Ruhr GmbH', cc: 'DE' },
      { id: 'DE2', label: 'Frischelogistik Süd GmbH', cc: 'DE' },
      { id: 'DE3', label: 'Südobst Großhandel GmbH', cc: 'DE' }
    ];
    const cust = (id) => CUSTOMERS.find((c) => c.id === id);

    /* Lotes de manipulado del mango Keitt MG-2611-KE-031. ship: [cliente, toneladas, albaranes]; online: [toneladas, pedidos]. */
    const LOTS = [
      { code: 'MN-2611-0204', product: 'Mango Keitt calibre 8, caja de 4 kg', sku: 'SAX-MGO-KE-08', date: '2026-11-18', shift: 'mañana', line: 'Línea F-1', made: 8, stock: 3, kg: 8, bb: '30/11/2026', order: 'OM-2611-0311',
        ship: [['SUP', 0.8, 3], ['MAY', 0.6, 2], ['IBE', 0.5, 2], ['ALM', 0.4, 2], ['FR1', 0.5, 2], ['FR2', 0.4, 1], ['DE1', 0.6, 2], ['DE2', 0.5, 2], ['DE3', 0.3, 1]], online: [0.4, 260] },
      { code: 'MN-2611-0207', product: 'Mango Keitt calibre 10, caja de 4 kg', sku: 'SAX-MGO-KE-10', date: '2026-11-18', shift: 'tarde', line: 'Línea F-2', made: 6, stock: 2, kg: 6, bb: '30/11/2026', order: 'OM-2611-0314',
        ship: [['SUP', 0.5, 2], ['MER', 0.5, 2], ['IBE', 0.4, 1], ['FR1', 0.4, 2], ['FR3', 0.6, 2], ['DE1', 0.5, 2], ['DE2', 0.4, 1], ['DE3', 0.4, 1]], online: [0.3, 240] },
      { code: 'MN-2611-0211', product: 'Mango Keitt calibre 12, caja de 2 kg', sku: 'SAX-MGO-KE-12', date: '2026-11-19', shift: 'mañana', line: 'Línea F-1', made: 4, stock: 1, kg: 4, bb: '01/12/2026', order: 'OM-2611-0320',
        ship: [['MAY', 0.4, 1], ['ALM', 0.4, 1], ['MER', 0.3, 1], ['FR2', 0.5, 2], ['FR3', 0.4, 1], ['DE1', 0.3, 1], ['DE3', 0.4, 1]], online: [0.3, 140] }
    ];
    LOTS.forEach((L) => {
      L.shipped = sum(L.ship, (s) => s[1]) + L.online[0];
      L.docs = sum(L.ship, (s) => s[2]);
      L.orders = L.online[1];
    });
    const TOTAL = { made: sum(LOTS, (L) => L.made), stock: sum(LOTS, (L) => L.stock), shipped: sum(LOTS, (L) => L.shipped), docs: sum(LOTS, (L) => L.docs), orders: sum(LOTS, (L) => L.orders) };
    const ALARM = { when: '2026-11-20 06:30', stage: 'Alarma de residuos (LMR)', detail: 'El LIMS registra un residuo de plaguicida por encima del LMR en el lote de recepción de mango Keitt MG-2611-KE-031 (informe LAB-2611-0871)', ref: 'LAB-2611-0871', tone: 'crit' };
    const BLOCK_NOTE = { title: 'Bloqueo pendiente de aprobación', body: 'La retención del lote de recepción y de los lotes de manipulado derivados la aprueba el Responsable de calidad y seguridad alimentaria (PR-TRZ-003).', tone: 'crit', icon: 'shield' };
    const CHIP = { shipped: { status: 'shipped', label: 'Expedido' }, hold: { status: 'critical', label: 'Retener y bloquear' }, ok: { status: 'ok', label: 'Conforme' } };

    /* ------------------------------------------------------------ Lote de manipulado afectado por el residuo */
    function lotRecord(L) {
      const byCountry = ['ES', 'FR', 'DE'].map((cc) => {
        const rows = L.ship.filter((s) => cust(s[0]).cc === cc);
        return { cc, cust: rows.length, t: sum(rows, (s) => s[1]), docs: sum(rows, (s) => s[2]) };
      }).filter((r) => r.cust);
      return {
        kind: 'Lote',
        title: `Lote ${L.code} · ${L.product}`,
        summary: [
          ['Producto', L.product],
          ['SKU', L.sku],
          ['Centro y línea', `Centro de manipulado de la Axarquía · ${L.line}`],
          ['Manipulado', `${L.date.slice(8)}/11/2026 · turno de ${L.shift} · ${L.order}`],
          ['Producido', t(L.made)],
          ['Lote de recepción en cuestión', `MG-2611-KE-031 · mango Keitt · ${t(L.kg)} manipuladas`],
          ['Balance', `${t(L.stock)} en almacén + ${t(L.shipped)} expedidas (${L.docs} albaranes, ${L.ship.length} clientes y ${L.orders} pedidos online)`],
          ['Consumo preferente', L.bb]
        ],
        back: [
          { when: '2026-11-17 08:30', stage: 'Recepción de la fruta', detail: 'Mango Keitt de Agrícola La Vega 417, lote MG-2611-KE-031 (18 t). Liberado con la documentación de campo.', ref: 'MG-2611-KE-031', tone: 'brand' },
          { when: `${L.date} 07:30`, stage: 'Manipulado', detail: `${L.order} en la ${L.line.toLowerCase()} del Centro de manipulado: se manipulan ${t(L.kg)} de MG-2611-KE-031. Turno de ${L.shift}.`, ref: L.order, tone: 'brand' },
          { when: `${L.date} 13:00`, stage: 'Calidad del lote', detail: 'Control de calibre, color y firmeza (PR-REC-001): conforme. Sin análisis de residuos propio del lote de manipulado.', ref: L.code, tone: 'ok' },
          { when: `${L.date} 17:30`, stage: 'Expediciones', detail: `${L.docs} albaranes a ${L.ship.length} clientes y ${L.orders} pedidos de la tienda online (${t(L.shipped)}); ${t(L.stock)} quedan en el almacén.`, ref: L.order, tone: 'brand' },
          ALARM
        ],
        forward: {
          title: 'Destino del lote por país',
          cols: [
            { key: 'dest', label: 'Destino', mono: true, sub: 'what' },
            { key: 'tons', label: 'Toneladas' },
            { key: 'docs', label: 'Albaranes' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: [{ dest: 'ALM-FR', what: 'Almacén de producto terminado (Centro de manipulado)', tons: t(L.stock), docs: '—', status: CHIP.hold }]
            .concat(byCountry.map((r) => ({ dest: r.cc, what: `${COUNTRY[r.cc]} · ${r.cust} ${r.cust === 1 ? 'cliente' : 'clientes'}`, tons: t(r.t), docs: String(r.docs), status: CHIP.shipped })))
            .concat([{ dest: 'TIENDA', what: `Tienda online (PrestaShop) · ${L.orders} pedidos`, tons: t(L.online[0]), docs: String(L.orders), status: CHIP.shipped }]),
          note: { title: 'Campaña RET-2026-1120', body: `Balance del lote: ${t(L.made)} = ${t(L.stock)} en almacén + ${t(L.shipped)} expedidas. Objetivo: avisar a la autoridad y a los clientes en 4 h.`, icon: 'truck' }
        },
        units: {
          label: 'Clientes',
          cols: [
            { key: 'cust', label: 'Cliente', mono: true, sub: 'country' },
            { key: 'tons', label: 'Toneladas' },
            { key: 'docs', label: 'Albaranes' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: L.ship.map((s) => ({ cust: cust(s[0]).label, country: COUNTRY[cust(s[0]).cc], tons: t(s[1]), docs: String(s[2]), status: CHIP.shipped }))
            .concat([{ cust: 'Tienda online (PrestaShop)', country: `${L.orders} pedidos de consumidor final`, tons: t(L.online[0]), docs: String(L.orders), status: CHIP.shipped }])
        },
        quality: [
          'Control de calibre, color y firmeza del lote (PR-REC-001): conforme.',
          'Maduración y temperatura de la fruta manipulada (PR-MAD-002): conforme.',
          'Resultado pendiente: residuo de plaguicida por encima del LMR en el lote de recepción MG-2611-KE-031; el lote de manipulado no se ha analizado todavía.'
        ],
        notes: [BLOCK_NOTE, { title: 'Producto ya expedido', body: `${t(L.shipped)} de este lote están en ${L.ship.length} clientes de España, Francia y Alemania y en ${L.orders} pedidos online. Localizar y retener antes de que lleguen al consumidor.`, tone: 'warn', icon: 'truck' }]
      };
    }

    /* ------------------------------------------------------------ Lote de recepción en cuestión */
    function rawRecord() {
      return {
        kind: 'Lote de recepción',
        title: 'Lote MG-2611-KE-031 · Mango Keitt',
        summary: [
          ['Producto', 'Mango Keitt fresco'],
          ['Productor', 'Agrícola La Vega 417'],
          ['Recepción', '17/11/2026 · 18 t'],
          ['Análisis', 'LAB-2611-0871 · residuo de plaguicida por encima del LMR'],
          ['Manipulado', `${t(sum(LOTS, (L) => L.kg))} en ${LOTS.length} lotes de manipulado`],
          ['Remanente en recepción', `${t(18 - sum(LOTS, (L) => L.kg))} sin manipular`],
          ['Producto derivado', `${t(TOTAL.made)} · ${t(TOTAL.stock)} en almacén + ${t(TOTAL.shipped)} expedidas`],
          ['Campaña', 'RET-2026-1120']
        ],
        back: [
          { when: '2026-11-17 08:30', stage: 'Recepción', detail: 'Descarga del lote de Agrícola La Vega 417 en el muelle de recepción. Albarán del productor y documentación de campo.', ref: 'RCP-2611-0287', tone: 'brand' },
          { when: '2026-11-17 10:15', stage: 'Muestreo y liberación', detail: 'Muestra tomada para el LIMS (PR-CAL-004). Liberada para manipulado mientras se completa el análisis de residuos.', ref: 'LAB-2611-0812', tone: 'warn' }
        ].concat(LOTS.map((L) => ({ when: `${L.date} 07:30`, stage: 'Manipulado', detail: `${L.code} · ${L.product}: ${t(L.kg)} (${L.order})`, ref: L.code, tone: 'brand' })), [ALARM]),
        forward: {
          title: 'Lotes de manipulado del mango recibido',
          cols: [
            { key: 'lot', label: 'Lote', mono: true, sub: 'what' },
            { key: 'made', label: 'Producido' },
            { key: 'stock', label: 'En almacén' },
            { key: 'shipped', label: 'Expedido' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: LOTS.map((L) => ({ lot: L.code, what: L.product, made: t(L.made), stock: t(L.stock), shipped: t(L.shipped), status: CHIP.hold })),
          note: { title: 'Balance de la campaña', body: `${t(TOTAL.made)} recibidas = ${t(TOTAL.stock)} en almacén + ${t(TOTAL.shipped)} expedidas a 11 clientes en ${TOTAL.docs} albaranes (España, Francia y Alemania) y ${TOTAL.orders} pedidos de la tienda online.`, icon: 'scale' }
        },
        units: {
          label: 'Lotes',
          cols: [
            { key: 'lot', label: 'Lote', mono: true, sub: 'what' },
            { key: 'made', label: 'Producido' },
            { key: 'stock', label: 'En almacén' },
            { key: 'shipped', label: 'Expedido' },
            { key: 'docs', label: 'Albaranes' }
          ],
          rows: LOTS.map((L) => ({ lot: L.code, what: L.product, made: t(L.made), stock: t(L.stock), shipped: t(L.shipped), docs: String(L.docs) }))
        },
        quality: [
          'Análisis de recepción LAB-2611-0871: residuo de plaguicida por encima del límite máximo de residuos (Reglamento (CE) 396/2005).',
          'Procedimiento aplicable: LMR y análisis de residuos (PR-CAL-004) y trazabilidad y retirada de lotes (PR-TRZ-003).',
          'Estado en el sistema: pendiente de retención por aprobación del Responsable de calidad y seguridad alimentaria.'
        ],
        notes: [BLOCK_NOTE, { title: 'Productor Agrícola La Vega 417', body: 'Abrir una no conformidad al productor, pedir su registro de tratamientos fitosanitarios y analizar los lotes vecinos de la misma parcela.', tone: 'warn', icon: 'building' }]
      };
    }

    /* ------------------------------------------------------------ Campaña de retirada */
    function campaignRecord() {
      const rows = CUSTOMERS.map((c) => {
        const own = LOTS.map((L) => ({ L, s: L.ship.find((x) => x[0] === c.id) })).filter((x) => x.s);
        return { cust: c.label, country: COUNTRY[c.cc], tons: t(sum(own, (x) => x.s[1])), docs: String(sum(own, (x) => x.s[2])), lots: own.map((x) => x.L.code.slice(-4)).join(', '), status: { status: 'pending', label: 'Por avisar' } };
      }).concat([{ cust: 'Tienda online (PrestaShop)', country: `${TOTAL.orders} pedidos`, tons: t(sum(LOTS, (L) => L.online[0])), docs: String(TOTAL.orders), lots: LOTS.map((L) => L.code.slice(-4)).join(', '), status: { status: 'pending', label: 'Por avisar' } }]);
      return {
        kind: 'Campaña de retirada',
        title: 'Campaña RET-2026-1120 · Residuo de plaguicida en mango Keitt',
        summary: [
          ['Origen', 'MG-2611-KE-031 · Agrícola La Vega 417'],
          ['Lotes de manipulado', LOTS.map((L) => L.code).join(', ')],
          ['Recibido', t(TOTAL.made)],
          ['En almacén', t(TOTAL.stock)],
          ['Expedido', `${t(TOTAL.shipped)} · ${TOTAL.docs} albaranes`],
          ['Clientes y países', '11 clientes · España, Francia y Alemania · y 640 pedidos online'],
          ['Objetivo', 'Avisar a la autoridad y a los clientes en 4 h'],
          ['Base legal', 'Reglamento (CE) 178/2002, art. 19 · Reglamento (CE) 396/2005']
        ],
        back: [
          { when: '2026-11-17 08:30', stage: 'Recepción de la fruta', detail: 'Mango Keitt MG-2611-KE-031 de Agrícola La Vega 417 (18 t).', ref: 'MG-2611-KE-031', tone: 'brand' },
          { when: '2026-11-18 07:30', stage: 'Primer lote manipulado', detail: 'MN-2611-0204 con 8 t de mango; después 0207 y 0211.', ref: 'MN-2611-0204', tone: 'brand' },
          ALARM
        ],
        forward: {
          title: 'Plan de la campaña',
          cols: [
            { key: 'step', label: 'Paso', mono: true, sub: 'what' },
            { key: 'owner', label: 'Responsable' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: [
            { step: 'BLOQ', what: 'Retención del lote de recepción y de los 3 lotes de manipulado', owner: 'Responsable de calidad y seguridad alimentaria', status: { status: 'pending', label: 'Pendiente de aprobación' } },
            { step: 'RETEN', what: `Retener ${t(TOTAL.stock)} del almacén y las expediciones en tránsito`, owner: 'Responsable de expediciones y exportación', status: { status: 'planned', label: 'Planificada' } },
            { step: 'AVISO', what: 'Avisar a los 11 clientes y a los 640 pedidos de la tienda online', owner: 'Atención al cliente y Responsable de la tienda online', status: { status: 'planned', label: 'Planificada' } },
            { step: 'AUTOR', what: 'Notificar a la autoridad competente (art. 19, Reglamento (CE) 178/2002)', owner: 'Responsable de calidad y seguridad alimentaria', status: { status: 'planned', label: 'Planificada' } }
          ],
          note: { title: 'Plazo de 4 horas', body: 'El objetivo del simulacro es avisar a la autoridad y a los clientes en 4 h desde la detección del residuo en el LIMS.', icon: 'clock' }
        },
        units: {
          label: 'Clientes',
          cols: [
            { key: 'cust', label: 'Cliente', mono: true, sub: 'country' },
            { key: 'tons', label: 'Toneladas' },
            { key: 'docs', label: 'Albaranes' },
            { key: 'lots', label: 'Lotes (0204…)' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows
        },
        quality: [
          `Balance: ${t(TOTAL.made)} recibidas = ${t(TOTAL.stock)} en almacén + ${t(TOTAL.shipped)} expedidas.`,
          `${TOTAL.docs} albaranes localizados en SAP para 11 clientes de 3 países y ${TOTAL.orders} pedidos en la tienda online.`,
          'Procedimientos: PR-TRZ-003 (trazabilidad y retirada de lotes) y PR-EXP-004 (exportación y documentación fitosanitaria).'
        ],
        notes: [{ title: 'Exportación', body: 'Los clientes de Francia y Alemania requieren aviso con la documentación fitosanitaria de exportación (PR-EXP-004).', tone: 'warn', icon: 'truck' }]
      };
    }

    /* ------------------------------------------------------------ Lote reclamado (maduración dispar) */
    function claimedRecord() {
      const ships = [['SUP', 5, 'ALB-2611-2041', '2026-11-17'], ['IBE', 4, 'ALB-2611-2044', '2026-11-17'], ['MAY', 3, 'ALB-2611-2047', '2026-11-18']];
      return {
        kind: 'Lote',
        title: 'Lote AH-2611-092 · Aguacate Hass ready to eat',
        summary: [
          ['Producto', 'Aguacate Hass ready to eat'],
          ['SKU', 'SAX-AGU-HASS-RTE'],
          ['Centro y cámara', 'Centro de manipulado de la Axarquía · CM-03'],
          ['Maduración', '10/11/2026 a 15/11/2026 · maduración controlada'],
          ['Producido', t(12)],
          ['Pedido reclamado', 'PED-2026-44718 · Supermercados Levante Fresh, S.A.'],
          ['Reclamación', 'CLM-2026-1120 · 35 % de piezas duras en 4 tiendas'],
          ['Estado', 'Análisis de firmeza y color en curso']
        ],
        back: [
          { when: '2026-11-08 09:00', stage: 'Recepción de la fruta', detail: 'Aguacate Hass de la red de agricultores de la Axarquía, lote de recepción AH-2611-092 (12 t). Calibre y madurez de campo conformes.', ref: 'RCP-2611-0261', tone: 'brand' },
          { when: '2026-11-10 07:30', stage: 'Maduración controlada', detail: 'Entrada en CM-03 con la curva de temperatura y etileno de PR-MAD-002. Registro de temperatura en Trazabilidad de campo.', ref: 'CM-03', tone: 'brand' },
          { when: '2026-11-15 14:30', stage: 'Control de firmeza', detail: 'Control de firmeza y color antes de la expedición (PR-MAD-002). Contramuestra conservada en el laboratorio.', ref: 'LAB-2611-0798', tone: 'ok' },
          { when: '2026-11-17 16:00', stage: 'Expedición', detail: 'Entrega de 5 t a Supermercados Levante Fresh (PED-2026-44718), 4 t a Supermercados Ibérica Fresca y 3 t a Mercamálaga Mayoristas.', ref: 'ALB-2611-2041', tone: 'brand' },
          { when: '2026-11-20 08:05', stage: 'Reclamación', detail: 'Supermercados Levante Fresh comunica que el 35 % de las piezas llega duro (maduración dispar) en 4 tiendas. Acuse en 24 h; informe 8D en 10 días hábiles.', ref: 'CLM-2026-1120', tone: 'crit' }
        ],
        forward: {
          title: 'Entregas del lote',
          cols: [
            { key: 'ref', label: 'Albarán', mono: true, sub: 'what' },
            { key: 'when', label: 'Fecha' },
            { key: 'tons', label: 'Toneladas' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: ships.map((s) => ({ ref: s[2], what: cust(s[0]).label, when: `${s[3].slice(8)}/11/2026`, tons: t(s[1]), status: s[0] === 'SUP' ? { status: 'open', label: 'Reclamado' } : { status: 'evaluate', label: 'A verificar' } })),
          note: { title: 'Alcance de la reclamación', body: 'Solo Supermercados Levante Fresh ha reclamado. Verificar la firmeza en la contramuestra antes de valorar si hay que avisar a los otros clientes.', icon: 'scale' }
        },
        units: {
          label: 'Clientes',
          cols: [
            { key: 'cust', label: 'Cliente', mono: true, sub: 'country' },
            { key: 'tons', label: 'Toneladas' },
            { key: 'doc', label: 'Albarán' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: ships.map((s) => ({ cust: cust(s[0]).label, country: COUNTRY[cust(s[0]).cc], tons: t(s[1]), doc: s[2], status: s[0] === 'SUP' ? { status: 'open', label: 'Reclamado' } : { status: 'evaluate', label: 'A verificar' } }))
        },
        quality: [
          'Control de firmeza y color del lote el 15/11 (PR-MAD-002): resultados en LIMS, pendientes de contrastar con el informe del cliente.',
          'Contramuestra conservada para repetir el análisis de firmeza.',
          'Plazos: acuse al cliente en 24 h e informe 8D en 10 días hábiles.'
        ],
        notes: [{ title: 'Reclamación CLM-2026-1120', body: 'El cliente informa de un 35 % de piezas duras en 4 tiendas. Revisar el historial de temperatura y etileno de CM-03 y la cadena de frío del transporte antes de aceptar la causa.', tone: 'crit', icon: 'mail' }]
      };
    }

    /* ------------------------------------------------------------ Lote en la cámara CM-06 (alarma de frío) */
    function coldRecord() {
      const dests = [['SUP', 4, 'Pedido de supermercado'], ['IBE', 3, 'Pedido de supermercado'], ['FR1', 3, 'Pedido de supermercado']];
      return {
        kind: 'Lote',
        title: 'Lote AH-2611-118 · Aguacate Hass calibre 18',
        summary: [
          ['Producto', 'Aguacate Hass calibre 18 en maduración controlada'],
          ['Cámara', 'CM-06 · consigna 6,0 °C'],
          ['Cantidad', '9 palés · 14 t'],
          ['Alarma', 'ALM-FRIO-0612 · 11,4 °C desde las 03:40 (fallo de compresor)'],
          ['Traslado propuesto', 'CM-02 (pendiente de aprobación)'],
          ['Destino', '3 pedidos de supermercados y pedidos de la tienda online de hoy'],
          ['Aprueba', 'Responsable de calidad y seguridad alimentaria'],
          ['Procedimiento', 'PR-MAD-002 Maduración controlada']
        ],
        back: [
          { when: '2026-11-17 09:00', stage: 'Recepción de la fruta', detail: 'Aguacate Hass calibre 18, lote de recepción AH-2611-118 (14 t), de la red de agricultores de la Axarquía.', ref: 'RCP-2611-0290', tone: 'brand' },
          { when: '2026-11-18 14:00', stage: 'Entrada en cámara', detail: 'Entrada en CM-06 con consigna de 6,0 °C (9 palés).', ref: 'CM-06', tone: 'brand' },
          { when: '2026-11-20 03:40', stage: 'Fallo de compresor', detail: 'La temperatura de CM-06 empieza a subir por encima de la consigna.', ref: 'CM-06', tone: 'warn' },
          { when: '2026-11-20 05:50', stage: 'Alarma de frío', detail: 'Trazabilidad de campo registra 11,4 °C frente a la consigna de 6,0 °C.', ref: 'ALM-FRIO-0612', tone: 'crit' }
        ],
        forward: {
          title: 'Destino previsto del lote',
          cols: [
            { key: 'dest', label: 'Destino', mono: true, sub: 'what' },
            { key: 'tons', label: 'Toneladas' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: dests.map((d) => ({ dest: cust(d[0]).label, what: d[2], tons: t(d[1]), status: { status: 'evaluate', label: 'A reasignar' } }))
            .concat([
              { dest: 'TIENDA', what: 'Pedidos de la tienda online de hoy', tons: t(1.5), status: { status: 'evaluate', label: 'A reasignar' } },
              { dest: 'CM-06', what: 'Resto en cámara (retenido)', tons: t(2.5), status: CHIP.hold }
            ]),
          note: { title: 'Decisión pendiente', body: 'Retener el lote, muestrear firmeza y color y, según el resultado, trasladarlo a CM-02 o reasignar las expediciones. Lo aprueba el Responsable de calidad y seguridad alimentaria.', icon: 'scale' }
        },
        quality: [
          'Temperatura de CM-06 fuera de consigna desde las 03:40 (PR-MAD-002).',
          'Pendiente: muestreo de firmeza y color del lote antes de decidir su destino.',
          'Orden de trabajo del compresor y traslado a CM-02 propuestos por Mantenimiento.'
        ],
        notes: [{ title: 'Pedidos afectados', body: '3 pedidos de supermercados y los pedidos de la tienda online de hoy dependen de este lote. Avisar a los clientes si hay que reasignar o retrasar las expediciones.', tone: 'warn', icon: 'truck' }]
      };
    }

    const out = {};
    LOTS.forEach((L) => { out[L.code] = lotRecord(L); });
    out['MG-2611-KE-031'] = rawRecord();
    out['RET-2026-1120'] = campaignRecord();
    out['AH-2611-092'] = claimedRecord();
    out['AH-2611-118'] = coldRecord();
    return out;
  })()
});
