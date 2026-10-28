/* Norel Nutrición Animal · traceability records (raw materials, premix batches and recall campaigns), English.
 * Read by App.traceModal from DATA.trace[code] (upper-case keys).
 * Demo scenario with synthetic data (MFM). */
agenticPackEn('norel', {
  trace: (function () {
    'use strict';

    /* ------------------------------------------------------------ Utilities */
    const n = (v) => String(v);
    const t = (v) => `${n(Math.round(v * 100) / 100)} t`;
    const sum = (a, f) => a.reduce((s, x) => s + f(x), 0);
    const COUNTRY = { ES: 'Spain', PT: 'Portugal', MA: 'Morocco' };

    /* ------------------------------------------------------------ Master data (synthetic) */
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

    /* Premix batches made with MP-2610-CC-118. ship: [customer, tonnes, delivery notes]. */
    const LOTS = [
      { code: 'PRM-2610-0417', product: 'Swine vitamin premix', sku: 'NOR-PRM-VIT-POR', date: '2026-10-22', shift: 'morning', line: 'Line P-1', made: 28, stock: 4, cc: 5.6, bb: '04/2027', order: 'OF-2610-0551',
        ship: [['EBR', 5, 12], ['CAS', 4, 9], ['CUE', 3, 6], ['GUA', 4, 8], ['GIL', 3, 5], ['TEJ', 2, 4], ['BEI', 1, 2], ['ATL', 2, 2]] },
      { code: 'PRM-2610-0418', product: 'Vitamin and mineral premix for broilers', sku: 'NOR-PRM-VM-AVI', date: '2026-10-22', shift: 'afternoon', line: 'Line P-2', made: 24, stock: 6, cc: 4.8, bb: '04/2027', order: 'OF-2610-0552',
        ship: [['EBR', 3, 7], ['CAS', 2, 5], ['GIL', 4, 8], ['GUA', 3, 6], ['TEJ', 2, 4], ['BEI', 2, 4], ['ATL', 1, 2], ['CAB', 1, 1]] },
      { code: 'PRM-2610-0421', product: 'Premix for weaned piglets', sku: 'NOR-PRM-LEC', date: '2026-10-24', shift: 'morning', line: 'Line P-1', made: 22, stock: 8, cc: 4.4, bb: '04/2027', order: 'OF-2610-0560',
        ship: [['EBR', 2, 6], ['CUE', 2, 5], ['CAS', 2, 5], ['GUA', 2, 5], ['GIL', 2, 4], ['TEJ', 1, 3], ['ATL', 2, 4], ['CAB', 1, 3]] },
      { code: 'PRM-2610-0425', product: 'Premix for breeding sows', sku: 'NOR-PRM-REP', date: '2026-10-26', shift: 'morning', line: 'Line P-2', made: 22, stock: 13, cc: 4.4, bb: '04/2027', order: 'OF-2610-0567',
        ship: [['EBR', 2, 6], ['CUE', 1, 4], ['CAS', 1, 4], ['GUA', 1, 3], ['GIL', 1, 3], ['TEJ', 1, 3], ['BEI', 1, 2], ['ATL', 1, 3]] }
    ];
    LOTS.forEach((L) => {
      L.shipped = sum(L.ship, (s) => s[1]);
      L.docs = sum(L.ship, (s) => s[2]);
    });
    const TOTAL = { made: sum(LOTS, (L) => L.made), stock: sum(LOTS, (L) => L.stock), shipped: sum(LOTS, (L) => L.shipped), docs: sum(LOTS, (L) => L.docs) };
    const ALARM = { when: '2026-10-28 05:50', stage: 'Salmonella alarm', detail: 'LIMS records Salmonella positive in 25 g in the sample of batch MP-2610-CC-118 (test LAB-2610-0933)', ref: 'ALM-LAB-0550', tone: 'crit' };
    const BLOCK_NOTE = { title: 'Block pending approval', body: 'Blocking the raw material batch and the derived products in SAP QM is approved by the Quality and Feed Safety Manager (PR-CAL-007).', tone: 'crit', icon: 'shield' };
    const CHIP = { shipped: { status: 'shipped', label: 'Shipped' }, hold: { status: 'critical', label: 'Hold and block' }, ok: { status: 'ok', label: 'Compliant' } };

    /* ------------------------------------------------------------ Premix batch affected by Salmonella */
    function lotRecord(L) {
      const byCountry = ['ES', 'PT', 'MA'].map((cc) => {
        const rows = L.ship.filter((s) => cust(s[0]).cc === cc);
        return { cc, cust: rows.length, t: sum(rows, (s) => s[1]), docs: sum(rows, (s) => s[2]) };
      }).filter((r) => r.cust);
      return {
        kind: 'Batch',
        title: `Batch ${L.code} · ${L.product}`,
        summary: [
          ['Product', L.product],
          ['SKU', L.sku],
          ['Plant and line', `Premix Plant (Spain) · ${L.line}`],
          ['Production', `${L.date.slice(8)}/10/2026 · ${L.shift} shift · ${L.order}`],
          ['Produced', t(L.made)],
          ['Raw material concerned', `MP-2610-CC-118 · choline chloride 60 % · ${t(L.cc)} consumed`],
          ['Balance', `${t(L.stock)} in warehouse + ${t(L.shipped)} shipped (${L.docs} delivery notes, ${L.ship.length} customers)`],
          ['Best before', L.bb]
        ],
        back: [
          { when: '2026-10-21 09:40', stage: 'Raw material receipt', detail: 'Choline chloride 60 % from Agroquímica Delta, batch MP-2610-CC-118 (20 t). Released with the supplier certificate.', ref: 'MP-2610-CC-118', tone: 'brand' },
          { when: `${L.date} 07:30`, stage: 'Production', detail: `${L.order} on ${L.line} of the Premix Plant (Spain): ${t(L.cc)} of MP-2610-CC-118 consumed. ${L.shift.charAt(0).toUpperCase() + L.shift.slice(1)} shift.`, ref: L.order, tone: 'brand' },
          { when: `${L.date} 15:00`, stage: 'Batch quality', detail: 'Content verification (PR-LAB-005) and line cross-contamination control (PR-PRO-003): compliant.', ref: L.code, tone: 'ok' },
          { when: `${L.date} 17:30`, stage: 'Shipments', detail: `${L.docs} delivery notes to ${L.ship.length} customers (${t(L.shipped)}); ${t(L.stock)} remain in the finished-goods warehouse.`, ref: L.order, tone: 'brand' },
          ALARM
        ],
        forward: {
          title: 'Batch destination by country',
          cols: [
            { key: 'dest', label: 'Destination', mono: true, sub: 'what' },
            { key: 'tons', label: 'Tonnes' },
            { key: 'docs', label: 'Delivery notes' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: [{ dest: 'ALM-PT', what: 'Finished-goods warehouse (Premix Plant)', tons: t(L.stock), docs: '—', status: CHIP.hold }]
            .concat(byCountry.map((r) => ({ dest: r.cc, what: `${COUNTRY[r.cc]} · ${r.cust} ${r.cust === 1 ? 'customer' : 'customers'}`, tons: t(r.t), docs: String(r.docs), status: CHIP.shipped }))),
          note: { title: 'Campaign RET-2026-1028', body: `Batch balance: ${t(L.made)} = ${t(L.stock)} in warehouse + ${t(L.shipped)} shipped. Goal: inform the authorities and customers within 4 h.`, icon: 'truck' }
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
        },
        quality: [
          'Vitamin and trace mineral content verification of the batch (PR-LAB-005): compliant.',
          'Line cleaning and cross-contamination (PR-PRO-003): compliant.',
          'Pending result: Salmonella positive in the raw material choline chloride 60 % MP-2610-CC-118; the batch itself has not been tested yet.'
        ],
        notes: [BLOCK_NOTE, { title: 'Product already shipped', body: `${t(L.shipped)} of this batch are at ${L.ship.length} customers in Spain, Portugal and Morocco. Locate and hold before it is incorporated into feed.`, tone: 'warn', icon: 'truck' }]
      };
    }

    /* ------------------------------------------------------------ Raw material concerned */
    function rawRecord() {
      return {
        kind: 'Raw material',
        title: 'Batch MP-2610-CC-118 · Choline chloride 60 %',
        summary: [
          ['Raw material', 'Choline chloride 60 % (nutritional additive)'],
          ['Supplier', 'Agroquímica Delta'],
          ['Received', '21/10/2026 · 20 t'],
          ['Test', 'LAB-2610-0933 · Salmonella in 25 g: positive'],
          ['Consumed', `${t(sum(LOTS, (L) => L.cc))} in ${LOTS.length} premix batches`],
          ['Remaining in raw material warehouse', `${t(20 - sum(LOTS, (L) => L.cc))} blocked`],
          ['Derived product', `${t(TOTAL.made)} · ${t(TOTAL.stock)} in warehouse + ${t(TOTAL.shipped)} shipped`],
          ['Campaign', 'RET-2026-1028']
        ],
        back: [
          { when: '2026-10-21 09:40', stage: 'Receipt', detail: 'Batch from Agroquímica Delta unloaded at the raw material dock. Supplier delivery note and certificate of analysis.', ref: 'RCP-2610-0312', tone: 'brand' },
          { when: '2026-10-21 11:20', stage: 'Sampling and release', detail: 'Sample taken for LIMS (PR-CAL-004). Released for conditional use with the supplier certificate while the in-house test is completed.', ref: 'LAB-2610-0891', tone: 'warn' }
        ].concat(LOTS.map((L) => ({ when: `${L.date} 07:30`, stage: 'Consumption in production', detail: `${L.code} · ${L.product}: ${t(L.cc)} (${L.order})`, ref: L.code, tone: 'brand' })), [ALARM]),
        forward: {
          title: 'Premix batches made with the raw material',
          cols: [
            { key: 'lot', label: 'Batch', mono: true, sub: 'what' },
            { key: 'made', label: 'Produced' },
            { key: 'stock', label: 'In warehouse' },
            { key: 'shipped', label: 'Shipped' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: LOTS.map((L) => ({ lot: L.code, what: L.product, made: t(L.made), stock: t(L.stock), shipped: t(L.shipped), status: CHIP.hold })),
          note: { title: 'Campaign balance', body: `${t(TOTAL.made)} produced = ${t(TOTAL.stock)} in warehouse + ${t(TOTAL.shipped)} shipped to 9 customers in 148 delivery notes (Spain, Portugal and Morocco).`, icon: 'scale' }
        },
        units: {
          label: 'Batches',
          cols: [
            { key: 'lot', label: 'Batch', mono: true, sub: 'what' },
            { key: 'made', label: 'Produced' },
            { key: 'stock', label: 'In warehouse' },
            { key: 'shipped', label: 'Shipped' },
            { key: 'docs', label: 'Delivery notes' }
          ],
          rows: LOTS.map((L) => ({ lot: L.code, what: L.product, made: t(L.made), stock: t(L.stock), shipped: t(L.shipped), docs: String(L.docs) }))
        },
        quality: [
          'Receiving test LAB-2610-0933: Salmonella detected in 25 g (limit: absence in 25 g).',
          'Applicable procedures: raw material Salmonella sampling and control (PR-CAL-004) and batch recall and traceability (PR-CAL-007).',
          'SAP QM status: pending block, subject to approval by the Quality and Feed Safety Manager.'
        ],
        notes: [BLOCK_NOTE, { title: 'Supplier Agroquímica Delta', body: 'Raise a nonconformity with the supplier and request its investigation and testing of neighbouring batches. The 20 t of choline are in quarantine except for what was already consumed.', tone: 'warn', icon: 'building' }]
      };
    }

    /* ------------------------------------------------------------ Recall campaign */
    function campaignRecord() {
      const rows = CUSTOMERS.map((c) => {
        const own = LOTS.map((L) => ({ L, s: L.ship.find((x) => x[0] === c.id) })).filter((x) => x.s);
        return { cust: c.label, country: COUNTRY[c.cc], tons: t(sum(own, (x) => x.s[1])), docs: String(sum(own, (x) => x.s[2])), lots: own.map((x) => x.L.code.slice(-4)).join(', '), status: { status: 'pending', label: 'To notify' } };
      });
      return {
        kind: 'Recall campaign',
        title: 'Campaign RET-2026-1028 · Salmonella in choline chloride 60 %',
        summary: [
          ['Origin', 'MP-2610-CC-118 · Agroquímica Delta'],
          ['Premix batches', LOTS.map((L) => L.code).join(', ')],
          ['Produced', t(TOTAL.made)],
          ['In warehouse', t(TOTAL.stock)],
          ['Shipped', `${t(TOTAL.shipped)} · ${TOTAL.docs} delivery notes`],
          ['Customers and countries', '9 customers · Spain, Portugal and Morocco'],
          ['Goal', 'Inform the authorities and customers within 4 h'],
          ['Legal basis', 'Regulation (EC) 178/2002, art. 19']
        ],
        back: [
          { when: '2026-10-21 09:40', stage: 'Raw material receipt', detail: 'Choline chloride 60 % MP-2610-CC-118 from Agroquímica Delta (20 t).', ref: 'MP-2610-CC-118', tone: 'brand' },
          { when: '2026-10-22 07:30', stage: 'First batch produced', detail: 'PRM-2610-0417 with 5.6 t of choline; then 0418, 0421 and 0425.', ref: 'PRM-2610-0417', tone: 'brand' },
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
            { step: 'BLOCK', what: 'Block the batch in SAP QM and the 4 derived batches', owner: 'Quality and Feed Safety Manager', status: { status: 'pending', label: 'Pending approval' } },
            { step: 'HOLD', what: `Hold ${t(TOTAL.stock)} in the warehouse and shipments in transit`, owner: 'Logistics and Export Manager', status: { status: 'planned', label: 'Planned' } },
            { step: 'NOTIFY', what: 'Notify the 9 customers and locate the product', owner: 'Customer Care and Norel Solutions', status: { status: 'planned', label: 'Planned' } },
            { step: 'AUTH', what: 'Notify the competent authority (art. 19, Regulation (EC) 178/2002)', owner: 'Regulatory Affairs Manager', status: { status: 'planned', label: 'Planned' } }
          ],
          note: { title: '4-hour deadline', body: 'The goal of the drill is to inform the authorities and customers within 4 h of the 05:50 alarm.', icon: 'clock' }
        },
        units: {
          label: 'Customers',
          cols: [
            { key: 'cust', label: 'Customer', mono: true, sub: 'country' },
            { key: 'tons', label: 'Tonnes' },
            { key: 'docs', label: 'Delivery notes' },
            { key: 'lots', label: 'Batches (0417…)' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows
        },
        quality: [
          `Balance: ${t(TOTAL.made)} produced = ${t(TOTAL.stock)} in warehouse + ${t(TOTAL.shipped)} shipped.`,
          `${TOTAL.docs} delivery notes located in SAP for 9 customers in 3 countries.`,
          'Procedures: PR-CAL-007 (batch recall and traceability) and PR-EXP-002 (export and health documentation).'
        ],
        notes: [{ title: 'Export', body: 'Customers in Portugal and Morocco require notice together with the export health documentation (PR-EXP-002).', tone: 'warn', icon: 'truck' }]
      };
    }

    /* ------------------------------------------------------------ Claimed batch (vitamin E) */
    function claimedRecord() {
      const ships = [['CUE', 10, 'ALB-2610-1188', '2026-10-15'], ['CAS', 8, 'ALB-2610-1191', '2026-10-16']];
      return {
        kind: 'Batch',
        title: 'Batch PRM-2610-0388 · Vitamin and trace mineral premix for dairy cattle',
        summary: [
          ['Product', 'Vitamin and trace mineral premix for dairy cattle'],
          ['SKU', 'NOR-PRM-VAC-LEC'],
          ['Plant and line', 'Premix Plant (Spain) · Line P-2'],
          ['Production', '13/10/2026 · morning shift · OF-2610-0498'],
          ['Produced', t(18)],
          ['Vitamin E', 'MP-2610-VE-044 · Vitaminas Iberia'],
          ['Claim', 'CLM-2026-1028 · Piensos Cuenca Mediterráneo, S.A.'],
          ['Customer report', 'LAB-CLI-2610-77 · vitamin E −18 % versus declared']
        ],
        back: [
          { when: '2026-10-06 10:15', stage: 'Vitamin E receipt', detail: 'Vitamin E 50 % from Vitaminas Iberia, batch MP-2610-VE-044 (12 t). Certificate content compliant.', ref: 'MP-2610-VE-044', tone: 'brand' },
          { when: '2026-10-13 08:00', stage: 'Production', detail: 'OF-2610-0498 on line P-2: 18 t with vitamin E from MP-2610-VE-044. Morning shift.', ref: 'OF-2610-0498', tone: 'brand' },
          { when: '2026-10-13 14:30', stage: 'Content verification', detail: 'In-house vitamin and trace mineral analysis (PR-LAB-005). Retained sample kept in the laboratory.', ref: 'LAB-2610-0845', tone: 'ok' },
          { when: '2026-10-15 16:00', stage: 'Shipment', detail: 'Delivery of 10 t to Piensos Cuenca Mediterráneo and 8 t to Nutral Castilla.', ref: 'ALB-2610-1188', tone: 'brand' },
          { when: '2026-10-28 08:05', stage: 'Claim', detail: 'Piensos Cuenca Mediterráneo reports a vitamin E content 18 % below the declared value (report LAB-CLI-2610-77). Acknowledgement within 24 h; 8D report within 10 working days.', ref: 'CLM-2026-1028', tone: 'crit' }
        ],
        forward: {
          title: 'Batch deliveries',
          cols: [
            { key: 'ref', label: 'Delivery note', mono: true, sub: 'what' },
            { key: 'when', label: 'Date' },
            { key: 'tons', label: 'Tonnes' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: ships.map((s) => ({ ref: s[2], what: cust(s[0]).label, when: `${s[3].slice(8)}/10/2026`, tons: t(s[1]), status: s[0] === 'CUE' ? { status: 'open', label: 'Claimed' } : { status: 'evaluate', label: 'To verify' } })),
          note: { title: 'Scope of the claim', body: 'Only Piensos Cuenca Mediterráneo has complained. Verify the content in the retained sample before deciding whether the other customer must be notified.', icon: 'scale' }
        },
        units: {
          label: 'Customers',
          cols: [
            { key: 'cust', label: 'Customer', mono: true, sub: 'country' },
            { key: 'tons', label: 'Tonnes' },
            { key: 'doc', label: 'Delivery note' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: ships.map((s) => ({ cust: cust(s[0]).label, country: COUNTRY[cust(s[0]).cc], tons: t(s[1]), doc: s[2], status: s[0] === 'CUE' ? { status: 'open', label: 'Claimed' } : { status: 'evaluate', label: 'To verify' } }))
        },
        quality: [
          'Batch content verification on 13/10 (PR-LAB-005): results in LIMS, pending comparison with the customer report.',
          'Retained sample kept to repeat the vitamin E analysis.',
          'Deadlines: customer acknowledgement within 24 h and 8D report within 10 working days.'
        ],
        notes: [{ title: 'Claim CLM-2026-1028', body: 'The customer reports 18 % less vitamin E than declared. Compare their laboratory method with PR-LAB-005 before accepting the cause.', tone: 'crit', icon: 'mail' }]
      };
    }

    /* ------------------------------------------------------------ Vitamin E concerned */
    function vitaminRecord() {
      return {
        kind: 'Raw material',
        title: 'Batch MP-2610-VE-044 · Vitamin E 50 %',
        summary: [
          ['Raw material', 'Vitamin E (DL-alpha-tocopheryl acetate) 50 %'],
          ['Supplier', 'Vitaminas Iberia'],
          ['Received', '06/10/2026 · 12 t'],
          ['Consumed', `${t(7.2)} in 2 premix batches`],
          ['Claimed batch', 'PRM-2610-0388 (CLM-2026-1028)'],
          ['Other batch consuming it', 'PRM-2610-0392'],
          ['Labelling', 'Additive declaration according to Regulation (EC) 1831/2003'],
          ['Status', 'Under laboratory review']
        ],
        back: [
          { when: '2026-10-06 10:15', stage: 'Receipt', detail: 'Batch from Vitaminas Iberia unloaded at the raw material dock. Certificate of analysis with compliant content.', ref: 'RCP-2610-0298', tone: 'brand' },
          { when: '2026-10-06 12:00', stage: 'Sampling and release', detail: 'Receiving sample in LIMS and release for use.', ref: 'LAB-2610-0761', tone: 'ok' },
          { when: '2026-10-13 08:00', stage: 'Consumption in production', detail: 'OF-2610-0498 consumes 3.6 t for PRM-2610-0388.', ref: 'PRM-2610-0388', tone: 'brand' },
          { when: '2026-10-14 08:00', stage: 'Consumption in production', detail: 'Second premix of the week with 3.6 t of the same vitamin E.', ref: 'PRM-2610-0392', tone: 'brand' },
          { when: '2026-10-28 08:05', stage: 'Claim', detail: 'Vitamin E content 18 % below the declared value in PRM-2610-0388, according to the customer.', ref: 'CLM-2026-1028', tone: 'crit' }
        ],
        forward: {
          title: 'Premix batches that consume it',
          cols: [
            { key: 'lot', label: 'Batch', mono: true, sub: 'what' },
            { key: 'tons', label: 'Vitamin E' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: [
            { lot: 'PRM-2610-0388', what: 'Premix for dairy cattle', tons: t(3.6), status: { status: 'open', label: 'Claimed' } },
            { lot: 'PRM-2610-0392', what: 'Vitamin and trace mineral premix', tons: t(3.6), status: { status: 'evaluate', label: 'To verify' } }
          ],
          note: { title: 'Extended verification', body: 'Analyse the retained sample of both batches and the remaining vitamin E before replying to the customer.', icon: 'flask' }
        },
        quality: [
          'Supplier certificate of analysis: content compliant.',
          'Content verification (PR-LAB-005): retained sample still to be analysed.',
          'Additive declaration: PR-REG-002.'
        ],
        notes: [{ title: 'Possible cause', body: 'Hypothesis to be confirmed: loss of activity during storage or dosing. There is not enough evidence yet.', tone: 'warn', icon: 'flask' }]
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
