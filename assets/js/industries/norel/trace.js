/* Norel Nutrición Animal · registros de trazabilidad (materias primas, lotes de premezcla y campañas de retirada).
 * Los lee App.traceModal desde DATA.trace[código] (claves en mayúsculas).
 * Escenario de demostración con datos sintéticos (MFM). */
agenticPack('norel', {
  trace: (function () {
    'use strict';

    /* ------------------------------------------------------------ Utilidades */
    const n = (v) => String(v).replace('.', ',');
    const t = (v) => `${n(Math.round(v * 100) / 100)} t`;
    const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
    const COUNTRY = { ES: 'España', PT: 'Portugal', MA: 'Marruecos' };

    /* ------------------------------------------------------------ Datos maestros (sintéticos) */
    const CUSTOMERS = [
      { id: 'EBR', label: 'Piensos del Ebro, S.A.', cc: 'ES' },
      { id: 'CAS', label: 'Nutral Castilla, S.L.', cc: 'ES' },
      { id: 'CUE', label: 'Piensos Cuenca Mediterráneo, S.A.', cc: 'ES' },
      { id: 'GUA', label: 'Piensos Guadiana, S.A.', cc: 'ES' },
      { id: 'GIL', label: 'Grupo Integrador Levante', cc: 'ES' },
      { id: 'TEJ', label: 'Rações do Tejo, Lda.', cc: 'PT' },
      { id: 'BEI', label: 'Rações Beira Atlântico, S.A.', cc: 'PT' },
      { id: 'ATL', label: 'Aliments du Maghreb Atlas, S.A.R.L.', cc: 'MA' },
      { id: 'CAB', label: 'Nutri-Feed Casablanca, S.A.', cc: 'MA' }
    ];
    const cust = (id) => CUSTOMERS.find((c) => c.id === id);

    /* Lotes de premezcla fabricados con MP-2610-CC-118. ship: [cliente, toneladas, albaranes]. */
    const LOTS = [
      { code: 'PRM-2610-0417', product: 'Premezcla vitamínica de porcino', sku: 'NOR-PRM-VIT-POR', date: '2026-10-22', shift: 'mañana', line: 'Línea P-1', made: 28, stock: 4, cc: 5.6, bb: '04/2027', order: 'OF-2610-0551',
        ship: [['EBR', 5, 12], ['CAS', 4, 9], ['CUE', 3, 6], ['GUA', 4, 8], ['GIL', 3, 5], ['TEJ', 2, 4], ['BEI', 1, 2], ['ATL', 2, 2]] },
      { code: 'PRM-2610-0418', product: 'Premezcla vitamínico-mineral para pollo de engorde', sku: 'NOR-PRM-VM-AVI', date: '2026-10-22', shift: 'tarde', line: 'Línea P-2', made: 24, stock: 6, cc: 4.8, bb: '04/2027', order: 'OF-2610-0552',
        ship: [['EBR', 3, 7], ['CAS', 2, 5], ['GIL', 4, 8], ['GUA', 3, 6], ['TEJ', 2, 4], ['BEI', 2, 4], ['ATL', 1, 2], ['CAB', 1, 1]] },
      { code: 'PRM-2610-0421', product: 'Premezcla para lechones destetados', sku: 'NOR-PRM-LEC', date: '2026-10-24', shift: 'mañana', line: 'Línea P-1', made: 22, stock: 8, cc: 4.4, bb: '04/2027', order: 'OF-2610-0560',
        ship: [['EBR', 2, 6], ['CUE', 2, 5], ['CAS', 2, 5], ['GUA', 2, 5], ['GIL', 2, 4], ['TEJ', 1, 3], ['ATL', 2, 4], ['CAB', 1, 3]] },
      { code: 'PRM-2610-0425', product: 'Premezcla para cerdas reproductoras', sku: 'NOR-PRM-REP', date: '2026-10-26', shift: 'mañana', line: 'Línea P-2', made: 22, stock: 13, cc: 4.4, bb: '04/2027', order: 'OF-2610-0567',
        ship: [['EBR', 2, 6], ['CUE', 1, 4], ['CAS', 1, 4], ['GUA', 1, 3], ['GIL', 1, 3], ['TEJ', 1, 3], ['BEI', 1, 2], ['ATL', 1, 3]] }
    ];
    LOTS.forEach((L) => {
      L.shipped = sum(L.ship, (s) => s[1]);
      L.docs = sum(L.ship, (s) => s[2]);
    });
    const TOTAL = { made: sum(LOTS, (L) => L.made), stock: sum(LOTS, (L) => L.stock), shipped: sum(LOTS, (L) => L.shipped), docs: sum(LOTS, (L) => L.docs) };
    const ALARM = { when: '2026-10-28 05:50', stage: 'Alarma de Salmonella', detail: 'LIMS registra Salmonella positiva en 25 g en la muestra del lote MP-2610-CC-118 (ensayo LAB-2610-0933)', ref: 'ALM-LAB-0550', tone: 'crit' };
    const BLOCK_NOTE = { title: 'Bloqueo pendiente de aprobación', body: 'El bloqueo en SAP QM del lote de materia prima y de los productos derivados lo aprueba el Responsable de calidad y seguridad alimentaria (PR-CAL-007).', tone: 'crit', icon: 'shield' };
    const CHIP = { shipped: { status: 'shipped', label: 'Expedido' }, hold: { status: 'critical', label: 'Retener y bloquear' }, ok: { status: 'ok', label: 'Conforme' } };

    /* ------------------------------------------------------------ Lote de premezcla afectado por la Salmonella */
    function lotRecord(L) {
      const byCountry = ['ES', 'PT', 'MA'].map((cc) => {
        const rows = L.ship.filter((s) => cust(s[0]).cc === cc);
        return { cc, cust: rows.length, t: sum(rows, (s) => s[1]), docs: sum(rows, (s) => s[2]) };
      }).filter((r) => r.cust);
      return {
        kind: 'Lote',
        title: `Lote ${L.code} · ${L.product}`,
        summary: [
          ['Producto', L.product],
          ['SKU', L.sku],
          ['Planta y línea', `Planta de premezclas (España) · ${L.line}`],
          ['Fabricación', `${L.date.slice(8)}/10/2026 · turno de ${L.shift} · ${L.order}`],
          ['Producido', t(L.made)],
          ['Materia prima en cuestión', `MP-2610-CC-118 · colina cloruro 60 % · ${t(L.cc)} consumidas`],
          ['Balance', `${t(L.stock)} en almacén + ${t(L.shipped)} expedidas (${L.docs} albaranes, ${L.ship.length} clientes)`],
          ['Consumo preferente', L.bb]
        ],
        back: [
          { when: '2026-10-21 09:40', stage: 'Recepción de la materia prima', detail: 'Colina cloruro 60 % de Agroquímica Delta, lote MP-2610-CC-118 (20 t). Liberada con el certificado del proveedor.', ref: 'MP-2610-CC-118', tone: 'brand' },
          { when: `${L.date} 07:30`, stage: 'Fabricación', detail: `${L.order} en la ${L.line.toLowerCase()} de la Planta de premezclas (España): se consumen ${t(L.cc)} de MP-2610-CC-118. Turno de ${L.shift}.`, ref: L.order, tone: 'brand' },
          { when: `${L.date} 15:00`, stage: 'Calidad del lote', detail: 'Verificación de contenidos (PR-LAB-005) y control de contaminación cruzada de la línea (PR-PRO-003): conformes.', ref: L.code, tone: 'ok' },
          { when: `${L.date} 17:30`, stage: 'Expediciones', detail: `${L.docs} albaranes a ${L.ship.length} clientes (${t(L.shipped)}); ${t(L.stock)} quedan en el almacén de producto terminado.`, ref: L.order, tone: 'brand' },
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
          rows: [{ dest: 'ALM-PT', what: 'Almacén de producto terminado (Planta de premezclas)', tons: t(L.stock), docs: '—', status: CHIP.hold }]
            .concat(byCountry.map((r) => ({ dest: r.cc, what: `${COUNTRY[r.cc]} · ${r.cust} ${r.cust === 1 ? 'cliente' : 'clientes'}`, tons: t(r.t), docs: String(r.docs), status: CHIP.shipped }))),
          note: { title: 'Campaña RET-2026-1028', body: `Balance del lote: ${t(L.made)} = ${t(L.stock)} en almacén + ${t(L.shipped)} expedidas. Objetivo: informar a las autoridades y a los clientes en 4 h.`, icon: 'truck' }
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
        },
        quality: [
          'Verificación de contenidos de vitaminas y oligoelementos del lote (PR-LAB-005): conforme.',
          'Limpieza y contaminación cruzada de la línea (PR-PRO-003): conforme.',
          'Resultado pendiente: Salmonella positiva en la materia prima colina cloruro 60 % MP-2610-CC-118; el lote no se ha analizado todavía.'
        ],
        notes: [BLOCK_NOTE, { title: 'Producto ya expedido', body: `${t(L.shipped)} de este lote están en ${L.ship.length} clientes de España, Portugal y Marruecos. Localizar y retener antes de que se incorporen a piensos.`, tone: 'warn', icon: 'truck' }]
      };
    }

    /* ------------------------------------------------------------ Materia prima en cuestión */
    function rawRecord() {
      return {
        kind: 'Materia prima',
        title: 'Lote MP-2610-CC-118 · Colina cloruro 60 %',
        summary: [
          ['Materia prima', 'Colina cloruro 60 % (aditivo nutricional)'],
          ['Proveedor', 'Agroquímica Delta'],
          ['Recepción', '21/10/2026 · 20 t'],
          ['Ensayo', 'LAB-2610-0933 · Salmonella en 25 g: positivo'],
          ['Consumida', `${t(sum(LOTS, (L) => L.cc))} en ${LOTS.length} lotes de premezcla`],
          ['Remanente en almacén de materias primas', `${t(20 - sum(LOTS, (L) => L.cc))} bloqueadas`],
          ['Producto derivado', `${t(TOTAL.made)} · ${t(TOTAL.stock)} en almacén + ${t(TOTAL.shipped)} expedidas`],
          ['Campaña', 'RET-2026-1028']
        ],
        back: [
          { when: '2026-10-21 09:40', stage: 'Recepción', detail: 'Descarga del lote de Agroquímica Delta en el muelle de materias primas. Albarán del proveedor y certificado de análisis.', ref: 'RCP-2610-0312', tone: 'brand' },
          { when: '2026-10-21 11:20', stage: 'Muestreo y liberación', detail: 'Muestra tomada para LIMS (PR-CAL-004). Liberada en uso condicionado con el certificado del proveedor mientras se completa el ensayo propio.', ref: 'LAB-2610-0891', tone: 'warn' }
        ].concat(LOTS.map((L) => ({ when: `${L.date} 07:30`, stage: 'Consumo en fabricación', detail: `${L.code} · ${L.product}: ${t(L.cc)} (${L.order})`, ref: L.code, tone: 'brand' })), [ALARM]),
        forward: {
          title: 'Lotes de premezcla fabricados con la materia prima',
          cols: [
            { key: 'lot', label: 'Lote', mono: true, sub: 'what' },
            { key: 'made', label: 'Producido' },
            { key: 'stock', label: 'En almacén' },
            { key: 'shipped', label: 'Expedido' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: LOTS.map((L) => ({ lot: L.code, what: L.product, made: t(L.made), stock: t(L.stock), shipped: t(L.shipped), status: CHIP.hold })),
          note: { title: 'Balance de la campaña', body: `${t(TOTAL.made)} producidas = ${t(TOTAL.stock)} en almacén + ${t(TOTAL.shipped)} expedidas a 9 clientes en 148 albaranes (España, Portugal y Marruecos).`, icon: 'scale' }
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
          'Ensayo de recepción LAB-2610-0933: Salmonella detectada en 25 g (límite: ausencia en 25 g).',
          'Procedimiento aplicable: muestreo y control de Salmonella en materias primas (PR-CAL-004) y retirada y trazabilidad de lotes (PR-CAL-007).',
          'Estado en SAP QM: pendiente de bloqueo por aprobación del Responsable de calidad y seguridad alimentaria.'
        ],
        notes: [BLOCK_NOTE, { title: 'Proveedor Agroquímica Delta', body: 'Abrir una no conformidad al proveedor y pedir su investigación y el análisis de los lotes vecinos. Los 20 t de colina están en cuarentena salvo lo ya consumido.', tone: 'warn', icon: 'building' }]
      };
    }

    /* ------------------------------------------------------------ Campaña de retirada */
    function campaignRecord() {
      const rows = CUSTOMERS.map((c) => {
        const own = LOTS.map((L) => ({ L, s: L.ship.find((x) => x[0] === c.id) })).filter((x) => x.s);
        return { cust: c.label, country: COUNTRY[c.cc], tons: t(sum(own, (x) => x.s[1])), docs: String(sum(own, (x) => x.s[2])), lots: own.map((x) => x.L.code.slice(-4)).join(', '), status: { status: 'pending', label: 'Por avisar' } };
      });
      return {
        kind: 'Campaña de retirada',
        title: 'Campaña RET-2026-1028 · Salmonella en colina cloruro 60 %',
        summary: [
          ['Origen', 'MP-2610-CC-118 · Agroquímica Delta'],
          ['Lotes de premezcla', LOTS.map((L) => L.code).join(', ')],
          ['Producido', t(TOTAL.made)],
          ['En almacén', t(TOTAL.stock)],
          ['Expedido', `${t(TOTAL.shipped)} · ${TOTAL.docs} albaranes`],
          ['Clientes y países', '9 clientes · España, Portugal y Marruecos'],
          ['Objetivo', 'Informar a las autoridades y a los clientes en 4 h'],
          ['Base legal', 'Reglamento (CE) 178/2002, art. 19']
        ],
        back: [
          { when: '2026-10-21 09:40', stage: 'Recepción de la materia prima', detail: 'Colina cloruro 60 % MP-2610-CC-118 de Agroquímica Delta (20 t).', ref: 'MP-2610-CC-118', tone: 'brand' },
          { when: '2026-10-22 07:30', stage: 'Primer lote fabricado', detail: 'PRM-2610-0417 con 5,6 t de colina; después 0418, 0421 y 0425.', ref: 'PRM-2610-0417', tone: 'brand' },
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
            { step: 'BLOQ', what: 'Bloqueo del lote en SAP QM y de los 4 lotes derivados', owner: 'Responsable de calidad y seguridad alimentaria', status: { status: 'pending', label: 'Pendiente de aprobación' } },
            { step: 'RETEN', what: `Retener ${t(TOTAL.stock)} del almacén y las expediciones en tránsito`, owner: 'Responsable de logística y exportación', status: { status: 'planned', label: 'Planificada' } },
            { step: 'AVISO', what: 'Avisar a los 9 clientes y localizar el producto', owner: 'Atención al cliente y Norel Solutions', status: { status: 'planned', label: 'Planificada' } },
            { step: 'AUTOR', what: 'Notificar a la autoridad competente (art. 19, Reglamento (CE) 178/2002)', owner: 'Responsable de asuntos regulatorios', status: { status: 'planned', label: 'Planificada' } }
          ],
          note: { title: 'Plazo de 4 horas', body: 'El objetivo del simulacro es informar a las autoridades y a los clientes en 4 h desde la alarma de las 05:50.', icon: 'clock' }
        },
        units: {
          label: 'Clientes',
          cols: [
            { key: 'cust', label: 'Cliente', mono: true, sub: 'country' },
            { key: 'tons', label: 'Toneladas' },
            { key: 'docs', label: 'Albaranes' },
            { key: 'lots', label: 'Lotes (0417…)' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows
        },
        quality: [
          `Balance: ${t(TOTAL.made)} producidas = ${t(TOTAL.stock)} en almacén + ${t(TOTAL.shipped)} expedidas.`,
          `${TOTAL.docs} albaranes localizados en SAP para 9 clientes de 3 países.`,
          'Procedimientos: PR-CAL-007 (retirada y trazabilidad de lotes) y PR-EXP-002 (exportación y documentación sanitaria).'
        ],
        notes: [{ title: 'Exportación', body: 'Los clientes de Portugal y Marruecos requieren aviso con la documentación sanitaria de exportación (PR-EXP-002).', tone: 'warn', icon: 'truck' }]
      };
    }

    /* ------------------------------------------------------------ Lote reclamado (vitamina E) */
    function claimedRecord() {
      const ships = [['CUE', 10, 'ALB-2610-1188', '2026-10-15'], ['CAS', 8, 'ALB-2610-1191', '2026-10-16']];
      return {
        kind: 'Lote',
        title: 'Lote PRM-2610-0388 · Premezcla de vitaminas y oligoelementos para vacuno de leche',
        summary: [
          ['Producto', 'Premezcla de vitaminas y oligoelementos para vacuno de leche'],
          ['SKU', 'NOR-PRM-VAC-LEC'],
          ['Planta y línea', 'Planta de premezclas (España) · Línea P-2'],
          ['Fabricación', '13/10/2026 · turno de mañana · OF-2610-0498'],
          ['Producido', t(18)],
          ['Vitamina E', 'MP-2610-VE-044 · Vitaminas Iberia'],
          ['Reclamación', 'CLM-2026-1028 · Piensos Cuenca Mediterráneo, S.A.'],
          ['Informe del cliente', 'LAB-CLI-2610-77 · vitamina E −18 % frente al declarado']
        ],
        back: [
          { when: '2026-10-06 10:15', stage: 'Recepción de la vitamina E', detail: 'Vitamina E 50 % de Vitaminas Iberia, lote MP-2610-VE-044 (12 t). Contenido del certificado conforme.', ref: 'MP-2610-VE-044', tone: 'brand' },
          { when: '2026-10-13 08:00', stage: 'Fabricación', detail: 'OF-2610-0498 en la línea P-2: 18 t con vitamina E de MP-2610-VE-044. Turno de mañana.', ref: 'OF-2610-0498', tone: 'brand' },
          { when: '2026-10-13 14:30', stage: 'Verificación de contenidos', detail: 'Análisis propio de vitaminas y oligoelementos (PR-LAB-005). Contramuestra conservada en el laboratorio.', ref: 'LAB-2610-0845', tone: 'ok' },
          { when: '2026-10-15 16:00', stage: 'Expedición', detail: 'Entrega de 10 t a Piensos Cuenca Mediterráneo y 8 t a Nutral Castilla.', ref: 'ALB-2610-1188', tone: 'brand' },
          { when: '2026-10-28 08:05', stage: 'Reclamación', detail: 'Piensos Cuenca Mediterráneo comunica un contenido de vitamina E un 18 % inferior al declarado (informe LAB-CLI-2610-77). Acuse en 24 h; informe 8D en 10 días hábiles.', ref: 'CLM-2026-1028', tone: 'crit' }
        ],
        forward: {
          title: 'Entregas del lote',
          cols: [
            { key: 'ref', label: 'Albarán', mono: true, sub: 'what' },
            { key: 'when', label: 'Fecha' },
            { key: 'tons', label: 'Toneladas' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: ships.map((s) => ({ ref: s[2], what: cust(s[0]).label, when: `${s[3].slice(8)}/10/2026`, tons: t(s[1]), status: s[0] === 'CUE' ? { status: 'open', label: 'Reclamado' } : { status: 'evaluate', label: 'A verificar' } })),
          note: { title: 'Alcance de la reclamación', body: 'Solo Piensos Cuenca Mediterráneo ha reclamado. Verificar el contenido en la contramuestra antes de valorar si hay que avisar al otro cliente.', icon: 'scale' }
        },
        units: {
          label: 'Clientes',
          cols: [
            { key: 'cust', label: 'Cliente', mono: true, sub: 'country' },
            { key: 'tons', label: 'Toneladas' },
            { key: 'doc', label: 'Albarán' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: ships.map((s) => ({ cust: cust(s[0]).label, country: COUNTRY[cust(s[0]).cc], tons: t(s[1]), doc: s[2], status: s[0] === 'CUE' ? { status: 'open', label: 'Reclamado' } : { status: 'evaluate', label: 'A verificar' } }))
        },
        quality: [
          'Verificación de contenidos del lote el 13/10 (PR-LAB-005): resultados en LIMS, pendientes de contrastar con el informe del cliente.',
          'Contramuestra conservada para repetir el análisis de vitamina E.',
          'Plazos: acuse al cliente en 24 h e informe 8D en 10 días hábiles.'
        ],
        notes: [{ title: 'Reclamación CLM-2026-1028', body: 'El cliente informa de un 18 % menos de vitamina E que lo declarado. Comparar el método de su laboratorio con el de PR-LAB-005 antes de aceptar la causa.', tone: 'crit', icon: 'mail' }]
      };
    }

    /* ------------------------------------------------------------ Vitamina E en cuestión */
    function vitaminRecord() {
      return {
        kind: 'Materia prima',
        title: 'Lote MP-2610-VE-044 · Vitamina E 50 %',
        summary: [
          ['Materia prima', 'Vitamina E (acetato de DL-alfa-tocoferilo) 50 %'],
          ['Proveedor', 'Vitaminas Iberia'],
          ['Recepción', '06/10/2026 · 12 t'],
          ['Consumida', `${t(7.2)} en 2 lotes de premezcla`],
          ['Lote reclamado', 'PRM-2610-0388 (CLM-2026-1028)'],
          ['Otro lote que la consume', 'PRM-2610-0392'],
          ['Etiquetado', 'Declaración de aditivos conforme al Reglamento (CE) 1831/2003'],
          ['Estado', 'En revisión por el laboratorio']
        ],
        back: [
          { when: '2026-10-06 10:15', stage: 'Recepción', detail: 'Descarga del lote de Vitaminas Iberia en el muelle de materias primas. Certificado de análisis con contenido conforme.', ref: 'RCP-2610-0298', tone: 'brand' },
          { when: '2026-10-06 12:00', stage: 'Muestreo y liberación', detail: 'Muestra de recepción en LIMS y liberación para uso.', ref: 'LAB-2610-0761', tone: 'ok' },
          { when: '2026-10-13 08:00', stage: 'Consumo en fabricación', detail: 'OF-2610-0498 consume 3,6 t para PRM-2610-0388.', ref: 'PRM-2610-0388', tone: 'brand' },
          { when: '2026-10-14 08:00', stage: 'Consumo en fabricación', detail: 'Segunda premezcla de la semana con 3,6 t de la misma vitamina E.', ref: 'PRM-2610-0392', tone: 'brand' },
          { when: '2026-10-28 08:05', stage: 'Reclamación', detail: 'Contenido de vitamina E un 18 % inferior al declarado en PRM-2610-0388 según el cliente.', ref: 'CLM-2026-1028', tone: 'crit' }
        ],
        forward: {
          title: 'Lotes de premezcla que la consumen',
          cols: [
            { key: 'lot', label: 'Lote', mono: true, sub: 'what' },
            { key: 'tons', label: 'Vitamina E' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: [
            { lot: 'PRM-2610-0388', what: 'Premezcla para vacuno de leche', tons: t(3.6), status: { status: 'open', label: 'Reclamado' } },
            { lot: 'PRM-2610-0392', what: 'Premezcla de vitaminas y oligoelementos', tons: t(3.6), status: { status: 'evaluate', label: 'A verificar' } }
          ],
          note: { title: 'Verificación ampliada', body: 'Analizar la contramuestra de ambos lotes y la vitamina E restante antes de contestar al cliente.', icon: 'flask' }
        },
        quality: [
          'Certificado de análisis del proveedor: contenido conforme.',
          'Verificación de contenidos (PR-LAB-005): contramuestra por analizar.',
          'Declaración de aditivos: PR-REG-002.'
        ],
        notes: [{ title: 'Posible causa', body: 'Hipótesis a confirmar: pérdida de actividad por almacenamiento o dosificación. Aún no hay evidencia suficiente.', tone: 'warn', icon: 'flask' }]
      };
    }

    const out = {};
    LOTS.forEach((L) => { out[L.code] = lotRecord(L); });
    out['MP-2610-CC-118'] = rawRecord();
    out['RET-2026-1028'] = campaignRecord();
    out['PRM-2610-0388'] = claimedRecord();
    out['MP-2610-VE-044'] = vitaminRecord();
    return out;
  })()
});
