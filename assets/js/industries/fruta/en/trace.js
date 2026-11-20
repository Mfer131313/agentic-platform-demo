/* Subtropicales Axarquía · traceability records (receiving lots, packing lots, rooms and recall campaigns), English.
 * Read by App.traceModal from DATA.trace[code] (upper-case keys).
 * Demo scenario with synthetic data (MFM). */
agenticPackEn('fruta', {
  trace: (function () {
    'use strict';

    /* ------------------------------------------------------------ Utilities */
    const n = (v) => String(v);
    const t = (v) => `${n(Math.round(v * 100) / 100)} t`;
    const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
    const COUNTRY = { ES: 'Spain', FR: 'France', DE: 'Germany' };

    /* ------------------------------------------------------------ Master data (synthetic) */
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

    /* Packing lots of Keitt mango MG-2611-KE-031. ship: [customer, tonnes, delivery notes]; online: [tonnes, orders]. */
    const LOTS = [
      { code: 'MN-2611-0204', product: 'Keitt mango size 8, 4 kg box', sku: 'SAX-MGO-KE-08', date: '2026-11-18', shift: 'morning', line: 'Line F-1', made: 8, stock: 3, kg: 8, bb: '30/11/2026', order: 'OM-2611-0311',
        ship: [['SUP', 0.8, 3], ['MAY', 0.6, 2], ['IBE', 0.5, 2], ['ALM', 0.4, 2], ['FR1', 0.5, 2], ['FR2', 0.4, 1], ['DE1', 0.6, 2], ['DE2', 0.5, 2], ['DE3', 0.3, 1]], online: [0.4, 260] },
      { code: 'MN-2611-0207', product: 'Keitt mango size 10, 4 kg box', sku: 'SAX-MGO-KE-10', date: '2026-11-18', shift: 'afternoon', line: 'Line F-2', made: 6, stock: 2, kg: 6, bb: '30/11/2026', order: 'OM-2611-0314',
        ship: [['SUP', 0.5, 2], ['MER', 0.5, 2], ['IBE', 0.4, 1], ['FR1', 0.4, 2], ['FR3', 0.6, 2], ['DE1', 0.5, 2], ['DE2', 0.4, 1], ['DE3', 0.4, 1]], online: [0.3, 240] },
      { code: 'MN-2611-0211', product: 'Keitt mango size 12, 2 kg box', sku: 'SAX-MGO-KE-12', date: '2026-11-19', shift: 'morning', line: 'Line F-1', made: 4, stock: 1, kg: 4, bb: '01/12/2026', order: 'OM-2611-0320',
        ship: [['MAY', 0.4, 1], ['ALM', 0.4, 1], ['MER', 0.3, 1], ['FR2', 0.5, 2], ['FR3', 0.4, 1], ['DE1', 0.3, 1], ['DE3', 0.4, 1]], online: [0.3, 140] }
    ];
    LOTS.forEach((L) => {
      L.shipped = sum(L.ship, (s) => s[1]) + L.online[0];
      L.docs = sum(L.ship, (s) => s[2]);
      L.orders = L.online[1];
    });
    const TOTAL = { made: sum(LOTS, (L) => L.made), stock: sum(LOTS, (L) => L.stock), shipped: sum(LOTS, (L) => L.shipped), docs: sum(LOTS, (L) => L.docs), orders: sum(LOTS, (L) => L.orders) };
    const ALARM = { when: '2026-11-20 06:30', stage: 'Residue alarm (MRL)', detail: 'LIMS records a pesticide residue above the MRL in receiving lot of Keitt mango MG-2611-KE-031 (report LAB-2611-0871)', ref: 'LAB-2611-0871', tone: 'crit' };
    const BLOCK_NOTE = { title: 'Block pending approval', body: 'Holding the receiving lot and the derived packing lots is approved by the Quality and Food Safety Manager (PR-TRZ-003).', tone: 'crit', icon: 'shield' };
    const CHIP = { shipped: { status: 'shipped', label: 'Shipped' }, hold: { status: 'critical', label: 'Hold and block' }, ok: { status: 'ok', label: 'Compliant' } };

    /* ------------------------------------------------------------ Packing lot affected by the residue */
    function lotRecord(L) {
      const byCountry = ['ES', 'FR', 'DE'].map((cc) => {
        const rows = L.ship.filter((s) => cust(s[0]).cc === cc);
        return { cc, cust: rows.length, t: sum(rows, (s) => s[1]), docs: sum(rows, (s) => s[2]) };
      }).filter((r) => r.cust);
      return {
        kind: 'Lot',
        title: `Lot ${L.code} · ${L.product}`,
        summary: [
          ['Product', L.product],
          ['SKU', L.sku],
          ['Centre and line', `Axarquía Packing Centre · ${L.line}`],
          ['Packing', `${L.date.slice(8)}/11/2026 · ${L.shift} shift · ${L.order}`],
          ['Produced', t(L.made)],
          ['Receiving lot concerned', `MG-2611-KE-031 · Keitt mango · ${t(L.kg)} packed`],
          ['Balance', `${t(L.stock)} in warehouse + ${t(L.shipped)} shipped (${L.docs} delivery notes, ${L.ship.length} customers and ${L.orders} online orders)`],
          ['Best before', L.bb]
        ],
        back: [
          { when: '2026-11-17 08:30', stage: 'Fruit receipt', detail: 'Keitt mango from Agrícola La Vega 417, lot MG-2611-KE-031 (18 t). Released with the field documentation.', ref: 'MG-2611-KE-031', tone: 'brand' },
          { when: `${L.date} 07:30`, stage: 'Packing', detail: `${L.order} on ${L.line.toLowerCase()} of the Packing Centre: ${t(L.kg)} of MG-2611-KE-031 packed. ${L.shift.charAt(0).toUpperCase() + L.shift.slice(1)} shift.`, ref: L.order, tone: 'brand' },
          { when: `${L.date} 13:00`, stage: 'Lot quality', detail: 'Size, colour and firmness check (PR-REC-001): compliant. No own residue analysis of the packing lot.', ref: L.code, tone: 'ok' },
          { when: `${L.date} 17:30`, stage: 'Shipments', detail: `${L.docs} delivery notes to ${L.ship.length} customers and ${L.orders} online shop orders (${t(L.shipped)}); ${t(L.stock)} remain in the warehouse.`, ref: L.order, tone: 'brand' },
          ALARM
        ],
        forward: {
          title: 'Lot destination by country',
          cols: [
            { key: 'dest', label: 'Destination', mono: true, sub: 'what' },
            { key: 'tons', label: 'Tonnes' },
            { key: 'docs', label: 'Delivery notes' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: [{ dest: 'ALM-FR', what: 'Finished-goods warehouse (Packing Centre)', tons: t(L.stock), docs: '—', status: CHIP.hold }]
            .concat(byCountry.map((r) => ({ dest: r.cc, what: `${COUNTRY[r.cc]} · ${r.cust} ${r.cust === 1 ? 'customer' : 'customers'}`, tons: t(r.t), docs: String(r.docs), status: CHIP.shipped })))
            .concat([{ dest: 'SHOP', what: `Online shop (PrestaShop) · ${L.orders} orders`, tons: t(L.online[0]), docs: String(L.orders), status: CHIP.shipped }]),
          note: { title: 'Campaign RET-2026-1120', body: `Lot balance: ${t(L.made)} = ${t(L.stock)} in warehouse + ${t(L.shipped)} shipped. Goal: notify the authority and customers within 4 h.`, icon: 'truck' }
        },
        units: {
          label: 'Customers',
          cols: [
            { key: 'cust', label: 'Customer', mono: true, sub: 'country' },
            { key: 'tons', label: 'Tonnes' },
            { key: 'docs', label: 'Delivery notes' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: L.ship.map((s) => ({ cust: cust(s[0]).label, country: COUNTRY[cust(s[0]).cc], tons: t(s[1]), docs: String(s[2]), status: CHIP.shipped }))
            .concat([{ cust: 'Online shop (PrestaShop)', country: `${L.orders} end-consumer orders`, tons: t(L.online[0]), docs: String(L.orders), status: CHIP.shipped }])
        },
        quality: [
          'Size, colour and firmness check of the lot (PR-REC-001): compliant.',
          'Ripening and temperature of the packed fruit (PR-MAD-002): compliant.',
          'Pending result: pesticide residue above the MRL in receiving lot MG-2611-KE-031; the packing lot has not been analysed yet.'
        ],
        notes: [BLOCK_NOTE, { title: 'Product already shipped', body: `${t(L.shipped)} of this lot are at ${L.ship.length} customers in Spain, France and Germany and in ${L.orders} online orders. Locate and hold before it reaches the consumer.`, tone: 'warn', icon: 'truck' }]
      };
    }

    /* ------------------------------------------------------------ Receiving lot concerned */
    function rawRecord() {
      return {
        kind: 'Receiving lot',
        title: 'Lot MG-2611-KE-031 · Keitt mango',
        summary: [
          ['Product', 'Fresh Keitt mango'],
          ['Grower', 'Agrícola La Vega 417'],
          ['Receipt', '17/11/2026 · 18 t'],
          ['Analysis', 'LAB-2611-0871 · pesticide residue above the MRL'],
          ['Packed', `${t(sum(LOTS, (L) => L.kg))} in ${LOTS.length} packing lots`],
          ['Remaining at receiving', `${t(18 - sum(LOTS, (L) => L.kg))} unpacked`],
          ['Derived product', `${t(TOTAL.made)} · ${t(TOTAL.stock)} in warehouse + ${t(TOTAL.shipped)} shipped`],
          ['Campaign', 'RET-2026-1120']
        ],
        back: [
          { when: '2026-11-17 08:30', stage: 'Receipt', detail: 'Unloading of the Agrícola La Vega 417 lot at the receiving dock. Grower delivery note and field documentation.', ref: 'RCP-2611-0287', tone: 'brand' },
          { when: '2026-11-17 10:15', stage: 'Sampling and release', detail: 'Sample taken for LIMS (PR-CAL-004). Released for packing while the residue analysis is completed.', ref: 'LAB-2611-0812', tone: 'warn' }
        ].concat(LOTS.map((L) => ({ when: `${L.date} 07:30`, stage: 'Packing', detail: `${L.code} · ${L.product}: ${t(L.kg)} (${L.order})`, ref: L.code, tone: 'brand' })), [ALARM]),
        forward: {
          title: 'Packing lots of the mango received',
          cols: [
            { key: 'lot', label: 'Lot', mono: true, sub: 'what' },
            { key: 'made', label: 'Produced' },
            { key: 'stock', label: 'In warehouse' },
            { key: 'shipped', label: 'Shipped' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: LOTS.map((L) => ({ lot: L.code, what: L.product, made: t(L.made), stock: t(L.stock), shipped: t(L.shipped), status: CHIP.hold })),
          note: { title: 'Campaign balance', body: `${t(TOTAL.made)} received = ${t(TOTAL.stock)} in warehouse + ${t(TOTAL.shipped)} shipped to 11 customers in ${TOTAL.docs} delivery notes (Spain, France and Germany) and ${TOTAL.orders} online shop orders.`, icon: 'scale' }
        },
        units: {
          label: 'Lots',
          cols: [
            { key: 'lot', label: 'Lot', mono: true, sub: 'what' },
            { key: 'made', label: 'Produced' },
            { key: 'stock', label: 'In warehouse' },
            { key: 'shipped', label: 'Shipped' },
            { key: 'docs', label: 'Delivery notes' }
          ],
          rows: LOTS.map((L) => ({ lot: L.code, what: L.product, made: t(L.made), stock: t(L.stock), shipped: t(L.shipped), docs: String(L.docs) }))
        },
        quality: [
          'Receiving analysis LAB-2611-0871: pesticide residue above the maximum residue limit (Regulation (EC) 396/2005).',
          'Applicable procedure: MRL and residue analysis (PR-CAL-004) and lot traceability and recall (PR-TRZ-003).',
          'System status: pending hold by approval of the Quality and Food Safety Manager.'
        ],
        notes: [BLOCK_NOTE, { title: 'Grower Agrícola La Vega 417', body: 'Open a non-conformity with the grower, request their plant protection treatment records and analyse neighbouring lots from the same plot.', tone: 'warn', icon: 'building' }]
      };
    }

    /* ------------------------------------------------------------ Recall campaign */
    function campaignRecord() {
      const rows = CUSTOMERS.map((c) => {
        const own = LOTS.map((L) => ({ L, s: L.ship.find((x) => x[0] === c.id) })).filter((x) => x.s);
        return { cust: c.label, country: COUNTRY[c.cc], tons: t(sum(own, (x) => x.s[1])), docs: String(sum(own, (x) => x.s[2])), lots: own.map((x) => x.L.code.slice(-4)).join(', '), status: { status: 'pending', label: 'To notify' } };
      }).concat([{ cust: 'Online shop (PrestaShop)', country: `${TOTAL.orders} orders`, tons: t(sum(LOTS, (L) => L.online[0])), docs: String(TOTAL.orders), lots: LOTS.map((L) => L.code.slice(-4)).join(', '), status: { status: 'pending', label: 'To notify' } }]);
      return {
        kind: 'Recall campaign',
        title: 'Campaign RET-2026-1120 · Pesticide residue in Keitt mango',
        summary: [
          ['Origin', 'MG-2611-KE-031 · Agrícola La Vega 417'],
          ['Packing lots', LOTS.map((L) => L.code).join(', ')],
          ['Received', t(TOTAL.made)],
          ['In warehouse', t(TOTAL.stock)],
          ['Shipped', `${t(TOTAL.shipped)} · ${TOTAL.docs} delivery notes`],
          ['Customers and countries', '11 customers · Spain, France and Germany · and 640 online orders'],
          ['Goal', 'Notify the authority and customers within 4 h'],
          ['Legal basis', 'Regulation (EC) 178/2002, art. 19 · Regulation (EC) 396/2005']
        ],
        back: [
          { when: '2026-11-17 08:30', stage: 'Fruit receipt', detail: 'Keitt mango MG-2611-KE-031 from Agrícola La Vega 417 (18 t).', ref: 'MG-2611-KE-031', tone: 'brand' },
          { when: '2026-11-18 07:30', stage: 'First lot packed', detail: 'MN-2611-0204 with 8 t of mango; then 0207 and 0211.', ref: 'MN-2611-0204', tone: 'brand' },
          ALARM
        ],
        forward: {
          title: 'Campaign plan',
          cols: [
            { key: 'step', label: 'Step', mono: true, sub: 'what' },
            { key: 'owner', label: 'Owner' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: [
            { step: 'BLOCK', what: 'Hold the receiving lot and the 3 packing lots', owner: 'Quality and Food Safety Manager', status: { status: 'pending', label: 'Pending approval' } },
            { step: 'HOLD', what: `Hold ${t(TOTAL.stock)} in the warehouse and shipments in transit`, owner: 'Shipping and Export Manager', status: { status: 'planned', label: 'Planned' } },
            { step: 'NOTIFY', what: 'Notify the 11 customers and the 640 online shop orders', owner: 'Customer Care and Online Shop Manager', status: { status: 'planned', label: 'Planned' } },
            { step: 'AUTH', what: 'Notify the competent authority (art. 19, Regulation (EC) 178/2002)', owner: 'Quality and Food Safety Manager', status: { status: 'planned', label: 'Planned' } }
          ],
          note: { title: '4-hour deadline', body: 'The goal of the drill is to notify the authority and customers within 4 h of the residue being detected in LIMS.', icon: 'clock' }
        },
        units: {
          label: 'Customers',
          cols: [
            { key: 'cust', label: 'Customer', mono: true, sub: 'country' },
            { key: 'tons', label: 'Tonnes' },
            { key: 'docs', label: 'Delivery notes' },
            { key: 'lots', label: 'Lots (0204…)' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows
        },
        quality: [
          `Balance: ${t(TOTAL.made)} received = ${t(TOTAL.stock)} in warehouse + ${t(TOTAL.shipped)} shipped.`,
          `${TOTAL.docs} delivery notes located in SAP for 11 customers in 3 countries and ${TOTAL.orders} orders in the online shop.`,
          'Procedures: PR-TRZ-003 (lot traceability and recall) and PR-EXP-004 (export and phytosanitary documentation).'
        ],
        notes: [{ title: 'Export', body: 'Customers in France and Germany require notice with the export phytosanitary documentation (PR-EXP-004).', tone: 'warn', icon: 'truck' }]
      };
    }

    /* ------------------------------------------------------------ Claimed lot (uneven ripening) */
    function claimedRecord() {
      const ships = [['SUP', 5, 'ALB-2611-2041', '2026-11-17'], ['IBE', 4, 'ALB-2611-2044', '2026-11-17'], ['MAY', 3, 'ALB-2611-2047', '2026-11-18']];
      return {
        kind: 'Lot',
        title: 'Lot AH-2611-092 · Ready-to-eat Hass avocado',
        summary: [
          ['Product', 'Ready-to-eat Hass avocado'],
          ['SKU', 'SAX-AGU-HASS-RTE'],
          ['Centre and room', 'Axarquía Packing Centre · CM-03'],
          ['Ripening', '10/11/2026 to 15/11/2026 · controlled ripening'],
          ['Produced', t(12)],
          ['Claimed order', 'PED-2026-44718 · Supermercados Levante Fresh, S.A.'],
          ['Claim', 'CLM-2026-1120 · 35 % hard pieces in 4 stores'],
          ['Status', 'Firmness and colour analysis in progress']
        ],
        back: [
          { when: '2026-11-08 09:00', stage: 'Fruit receipt', detail: 'Hass avocado from the Axarquía grower network, receiving lot AH-2611-092 (12 t). Field size and maturity compliant.', ref: 'RCP-2611-0261', tone: 'brand' },
          { when: '2026-11-10 07:30', stage: 'Controlled ripening', detail: 'Entry into CM-03 with the temperature and ethylene curve of PR-MAD-002. Temperature log in Field traceability.', ref: 'CM-03', tone: 'brand' },
          { when: '2026-11-15 14:30', stage: 'Firmness check', detail: 'Firmness and colour check before shipping (PR-MAD-002). Retained sample kept in the laboratory.', ref: 'LAB-2611-0798', tone: 'ok' },
          { when: '2026-11-17 16:00', stage: 'Shipment', detail: 'Delivery of 5 t to Supermercados Levante Fresh (PED-2026-44718), 4 t to Supermercados Ibérica Fresca and 3 t to Mercamálaga Mayoristas.', ref: 'ALB-2611-2041', tone: 'brand' },
          { when: '2026-11-20 08:05', stage: 'Claim', detail: 'Supermercados Levante Fresh reports that 35 % of the pieces arrive hard (uneven ripening) in 4 stores. Acknowledgement within 24 h; 8D report within 10 working days.', ref: 'CLM-2026-1120', tone: 'crit' }
        ],
        forward: {
          title: 'Lot deliveries',
          cols: [
            { key: 'ref', label: 'Delivery note', mono: true, sub: 'what' },
            { key: 'when', label: 'Date' },
            { key: 'tons', label: 'Tonnes' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: ships.map((s) => ({ ref: s[2], what: cust(s[0]).label, when: `${s[3].slice(8)}/11/2026`, tons: t(s[1]), status: s[0] === 'SUP' ? { status: 'open', label: 'Claimed' } : { status: 'evaluate', label: 'To verify' } })),
          note: { title: 'Scope of the claim', body: 'Only Supermercados Levante Fresh has claimed. Verify firmness in the retained sample before deciding whether to notify the other customers.', icon: 'scale' }
        },
        units: {
          label: 'Customers',
          cols: [
            { key: 'cust', label: 'Customer', mono: true, sub: 'country' },
            { key: 'tons', label: 'Tonnes' },
            { key: 'doc', label: 'Delivery note' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: ships.map((s) => ({ cust: cust(s[0]).label, country: COUNTRY[cust(s[0]).cc], tons: t(s[1]), doc: s[2], status: s[0] === 'SUP' ? { status: 'open', label: 'Claimed' } : { status: 'evaluate', label: 'To verify' } }))
        },
        quality: [
          'Firmness and colour check of the lot on 15/11 (PR-MAD-002): results in LIMS, pending comparison with the customer report.',
          'Retained sample kept to repeat the firmness analysis.',
          'Deadlines: acknowledgement to the customer within 24 h and 8D report within 10 working days.'
        ],
        notes: [{ title: 'Claim CLM-2026-1120', body: 'The customer reports 35 % hard pieces in 4 stores. Review the temperature and ethylene history of CM-03 and the transport cold chain before accepting the cause.', tone: 'crit', icon: 'mail' }]
      };
    }

    /* ------------------------------------------------------------ Lot in room CM-06 (cold chain alarm) */
    function coldRecord() {
      const dests = [['SUP', 4, 'Supermarket order'], ['IBE', 3, 'Supermarket order'], ['FR1', 3, 'Supermarket order']];
      return {
        kind: 'Lot',
        title: 'Lot AH-2611-118 · Hass avocado size 18',
        summary: [
          ['Product', 'Hass avocado size 18 in controlled ripening'],
          ['Room', 'CM-06 · setpoint 6.0 °C'],
          ['Quantity', '9 pallets · 14 t'],
          ['Alarm', 'ALM-FRIO-0612 · 11.4 °C since 03:40 (compressor failure)'],
          ['Proposed move', 'CM-02 (pending approval)'],
          ['Destination', '3 supermarket orders and today online shop orders'],
          ['Approver', 'Quality and Food Safety Manager'],
          ['Procedure', 'PR-MAD-002 Controlled ripening']
        ],
        back: [
          { when: '2026-11-17 09:00', stage: 'Fruit receipt', detail: 'Hass avocado size 18, receiving lot AH-2611-118 (14 t), from the Axarquía grower network.', ref: 'RCP-2611-0290', tone: 'brand' },
          { when: '2026-11-18 14:00', stage: 'Room entry', detail: 'Entry into CM-06 with a setpoint of 6.0 °C (9 pallets).', ref: 'CM-06', tone: 'brand' },
          { when: '2026-11-20 03:40', stage: 'Compressor failure', detail: 'The temperature of CM-06 starts to rise above the setpoint.', ref: 'CM-06', tone: 'warn' },
          { when: '2026-11-20 05:50', stage: 'Cold chain alarm', detail: 'Field traceability records 11.4 °C against the setpoint of 6.0 °C.', ref: 'ALM-FRIO-0612', tone: 'crit' }
        ],
        forward: {
          title: 'Planned destination of the lot',
          cols: [
            { key: 'dest', label: 'Destination', mono: true, sub: 'what' },
            { key: 'tons', label: 'Tonnes' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: dests.map((d) => ({ dest: cust(d[0]).label, what: d[2], tons: t(d[1]), status: { status: 'evaluate', label: 'To reassign' } }))
            .concat([
              { dest: 'SHOP', what: 'Online shop orders for today', tons: t(1.5), status: { status: 'evaluate', label: 'To reassign' } },
              { dest: 'CM-06', what: 'Remainder in room (on hold)', tons: t(2.5), status: CHIP.hold }
            ]),
          note: { title: 'Pending decision', body: 'Hold the lot, sample firmness and colour and, depending on the result, move it to CM-02 or reassign the shipments. Approved by the Quality and Food Safety Manager.', icon: 'scale' }
        },
        quality: [
          'CM-06 temperature out of setpoint since 03:40 (PR-MAD-002).',
          'Pending: firmness and colour sampling of the lot before deciding its destination.',
          'Compressor work order and move to CM-02 proposed by Maintenance.'
        ],
        notes: [{ title: 'Orders affected', body: '3 supermarket orders and today online shop orders depend on this lot. Notify customers if shipments must be reassigned or delayed.', tone: 'warn', icon: 'truck' }]
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
