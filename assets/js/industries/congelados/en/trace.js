/* Empresa de Congelados · traceability records (finished-product lots, bulk lots, shipments, growers and plots), English.
 * Read by App.traceModal from CN_DATA.trace[code] (upper-case keys).
 * Reference demo scenario with synthetic data (MFM). */
agenticPackEn('congelados', {
  trace: (function () {
    'use strict';

    /* ------------------------------------------------------------ Helpers */
    const n = (v) => {
      const [i, f] = String(v).split('.');
      return i.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (f ? `.${f}` : '');
    };
    const d = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '—');
    const pl = (k, one, many) => `${n(k)} ${k === 1 ? one : many}`;
    const list = (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`);
    /* SSCC (GS1): extension digit 3 + company prefix 8412345 + lot Julian day + sequence + pallet no. + check digit. */
    function sscc(day, seq, k) {
      const body = `38412345${day}${seq}${String(k).padStart(4, '0')}`;
      let s = 0;
      for (let i = body.length - 1, w = 3; i >= 0; i--, w = 4 - w) s += Number(body[i]) * w;
      return body + ((10 - (s % 10)) % 10);
    }
    const LOC = {
      'C-07': 'Dispatch chamber 7 (Fustiñana)',
      'SIL-1': 'Automated silo 1 (Fustiñana)',
      'SIL-2': 'Automated silo 2 (Fustiñana)',
      'SIL-3': 'Automated silo 3 (Fustiñana)',
      'SIL-4': 'Automated silo 4 (Fustiñana)'
    };
    const EXC = 'C-07 excursion from 05:50 to 06:40 (peak of −13.9 °C at 06:25; 50 min above −18 °C)';

    /* ------------------------------------------------------------ Master data */
    const CUSTOMERS = {
      'CLI-RET-ES': { label: 'Retail logistics platform ES', country: 'Spain', channel: 'Retail' },
      'CLI-FS-ES': { label: 'Foodservice distributor ES (central region)', country: 'Spain', channel: 'Foodservice' },
      'CLI-FWF-UK': { label: 'EC Foods UK Ltd (EC subsidiary, United Kingdom)', end: 'UK retailer (own label)', country: 'United Kingdom', channel: 'UK retail' },
      'CLI-IMP-FR': { label: 'Importer France', country: 'France', channel: 'Export' },
      'CLI-ECUS': { label: 'EC Frozen Foods LLC (EC subsidiary, USA)', country: 'USA', channel: 'Export' }
    };
    const TRUCK = 'Refrigerated truck −25 °C';
    /* [date, time, status, customer, transport, dock, temperature record] */
    const SHIPMENTS = {
      'EXP-26-40911': ['2026-08-25', '16:10', 'shipped', 'CLI-FWF-UK', TRUCK, null, 'compliant'],
      'EXP-26-40957': ['2026-08-28', '15:30', 'shipped', 'CLI-FWF-UK', TRUCK, null, 'compliant'],
      'EXP-26-41071': ['2026-09-23', '17:45', 'shipped', 'CLI-IMP-FR', TRUCK, null, 'compliant'],
      'EXP-26-41083': ['2026-09-25', '14:20', 'shipped', 'CLI-FWF-UK', TRUCK, null, 'compliant'],
      'EXP-26-41102': ['2026-09-28', '18:40', 'shipped', 'CLI-RET-ES', TRUCK, null, 'compliant'],
      'EXP-26-41106': ['2026-09-29', '09:30', 'planned', 'CLI-FS-ES', TRUCK, 'Dock 2', null],
      'EXP-26-41107': ['2026-09-29', '11:00', 'planned', 'CLI-RET-ES', TRUCK, 'Dock 3', null],
      'EXP-26-41109': ['2026-09-29', '14:00', 'planned', 'CLI-FWF-UK', TRUCK, 'Dock 4', null],
      'EXP-26-41111': ['2026-09-29', '16:30', 'planned', 'CLI-IMP-FR', TRUCK, 'Dock 5', null],
      'EXP-26-41118': ['2026-09-30', '07:00', 'planned', 'CLI-ECUS', 'Reefer container (consolidation, departure by port)', 'Dock 6', null]
    };
    /* [area, municipality, crops] · all with a 2026 season contract */
    const GROWERS = {
      'AGR-0412': ['Ribera navarra', 'Ribaforada', ['peas', 'green beans']],
      'AGR-0455': ['Ribera navarra', 'Cortes', ['peas']],
      'AGR-0388': ['Ribera navarra', 'Cadreita', ['broccoli']],
      'AGR-0291': ['Rioja Baja', 'Alfaro', ['spinach']],
      'AGR-0527': ['Ribera navarra', 'Castejón', ['green beans']],
      'AGR-0540': ['Ribera navarra', 'Cortes', ['green beans']],
      'AGR-0561': ['Ribera navarra', 'Ribaforada', ['green beans']],
      'AGR-0613': ['Ribera navarra', 'Valtierra', ['sweet corn']],
      'AGR-0634': ['Ribera navarra', 'Cadreita', ['sweet corn']],
      'AGR-0658': ['Ribera navarra', 'Milagro', ['sweet corn']],
      'AGR-0671': ['Ribera navarra', 'Castejón', ['sweet corn']],
      'AGR-0702': ['Ribera navarra', 'Arguedas', ['peppers', 'aubergine']],
      'AGR-0718': ['Ribera navarra', 'Tudela', ['courgette']],
      'AGR-0719': ['Ribera alta del Ebro', 'Mendavia', ['sweet corn']],
      'AGR-0741': ['Ribera navarra', 'Cabanillas', ['onion']]
    };
    /* [grower, crop, hectares, sowing] · municipality and area are the grower’s */
    const PARCELS = {
      'P-0412-07': ['AGR-0412', 'peas', 4.2, '2026-05-28'],
      'P-0412-09': ['AGR-0412', 'peas', 3.6, '2026-05-30'],
      'P-0455-02': ['AGR-0455', 'peas', 5.1, '2026-03-10'],
      'P-0455-05': ['AGR-0455', 'peas', 4.4, '2026-03-12'],
      'P-0388-01': ['AGR-0388', 'broccoli', 6, '2026-02-20'],
      'P-0291-03': ['AGR-0291', 'spinach', 3.8, '2026-02-15'],
      'P-0527-03': ['AGR-0527', 'green beans', 5.5, '2026-07-01'],
      'P-0613-11': ['AGR-0613', 'sweet corn', 1.2, '2026-06-01'],
      'P-0613-12': ['AGR-0613', 'sweet corn', 0.9, '2026-06-03'],
      'P-0702-04': ['AGR-0702', 'peppers', 2.6, '2026-05-05'],
      'P-0702-06': ['AGR-0702', 'aubergine', 1.9, '2026-05-08'],
      'P-0718-02': ['AGR-0718', 'courgette', 2.2, '2026-06-10'],
      'P-0741-01': ['AGR-0741', 'onion', 3, '2026-03-01']
    };
    /* Harvest plan for 30/09 (end of season) · [plot, grower, crop, expected t, maturity index, km, slot, field→tunnel min, within rule, past maturity, tunnel] */
    const CAMPAIGN = [
      ['P-0613-14', 'AGR-0613', 'sweet corn', 20, 0.88, 19, '06-08', 89, true, false, 'TUN-1'],
      ['P-0634-03', 'AGR-0634', 'sweet corn', 21, 0.9, 23, '08-10', 93, true, false, 'TUN-1'],
      ['P-0634-05', 'AGR-0634', 'sweet corn', 18, 0.86, 23, '10-12', 93, true, false, 'TUN-1'],
      ['P-0658-01', 'AGR-0658', 'sweet corn', 16, 0.84, 36, '12-14', 107, true, false, 'TUN-1'],
      ['P-0658-02', 'AGR-0658', 'sweet corn', 17, 0.83, 36, '14-16', 107, true, false, 'TUN-1'],
      ['P-0671-07', 'AGR-0671', 'sweet corn', 13, 0.81, 26, '14-16', 97, true, false, 'TUN-1'],
      ['P-0613-15', 'AGR-0613', 'sweet corn', 19, 1.03, 19, '16-18', 89, true, true, 'TUN-1'],
      ['P-0719-02', 'AGR-0719', 'sweet corn', 14, 0.87, 78, '18-20', 160, false, false, 'TUN-1'],
      ['P-0527-05', 'AGR-0527', 'green beans', 12, 0.84, 26, '06-08', 87, true, false, 'TUN-2'],
      ['P-0527-06', 'AGR-0527', 'green beans', 13, 0.86, 26, '08-10', 87, true, false, 'TUN-2'],
      ['P-0540-02', 'AGR-0540', 'green beans', 11, 0.8, 16, '10-12', 77, true, false, 'TUN-2'],
      ['P-0540-03', 'AGR-0540', 'green beans', 10, 0.78, 16, '12-14', 77, true, false, 'TUN-2'],
      ['P-0561-01', 'AGR-0561', 'green beans', 12, 0.88, 8, '14-16', 69, true, false, 'TUN-2'],
      ['P-0540-04', 'AGR-0540', 'green beans', 9, 0.79, 16, '14-16', 77, true, false, 'TUN-2'],
      ['P-0561-02', 'AGR-0561', 'green beans', 10, 0.9, 8, '16-18', 69, true, false, 'TUN-2']
    ];
    const OPTIMAL = { 'sweet corn': '0.80-0.95', 'green beans': '0.75-0.92' };

    /* Source bulk lots (season processing) */
    const BULKS = {
      'G26-176-FUS-GUI': { crop: 'peas', product: 'IQF peas in bulk', plant: 'Fustiñana', date: '2026-06-25', line: 'Line L2 (peas / green beans)', route: 'cleaning LIM-2 → destoner DP-2 → blancher ESC-2 → IQF tunnel TUN-2 → optical sorter OPT-2', storage: 'SIL-2', storageLabel: 'Automated silo 2 (Fustiñana)', grower: 'AGR-0455', parcels: ['P-0455-02', 'P-0455-05'], intake: ['REC-26-09412', '07:18', 26.1], maturity: 'tenderometer 102 TR (specification 95-120 TR)' },
      'G26-132-FUS-BRO': { crop: 'broccoli', product: 'IQF broccoli florets in bulk', plant: 'Fustiñana', date: '2026-05-12', line: 'Line L3 (green beans / broccoli)', route: 'trimmer/cutter COR-3 → blancher ESC-3 → IQF tunnel TUN-1 → optical sorter OPT-3', storage: 'SIL-1', storageLabel: 'Automated silo 1 (Fustiñana)', grower: 'AGR-0388', parcels: ['P-0388-01'], intake: ['REC-26-06120', '06:55', 18.4], maturity: 'compact head, no flowering; floret size 30-50 mm' },
      'G26-098-ALF-ESP': { crop: 'spinach', product: 'IQF spinach portions in bulk', plant: 'Alfaro', date: '2026-04-08', line: 'Leaf line L1 (Alfaro)', route: 'washer LAV-A1 → blancher ESC-A1 → portioner PRT-A1 → IQF tunnel TUN-A2', storage: 'ALF-C1', storageLabel: 'Bulk chamber 1 (Alfaro)', grower: 'AGR-0291', parcels: ['P-0291-03'], intake: ['REC-26-04877', '08:30', 15.2], maturity: 'whole leaf, no bolting' },
      'G26-240-ARG-PIM': { crop: 'peppers', product: 'Roasted red pepper strips in bulk', plant: 'Arguedas', date: '2026-08-28', line: 'Grill line G1 (Arguedas)', route: 'grill GRL-1 → IQF tunnel TUN-A1', storage: 'ARG-C3', storageLabel: 'Chamber ARG-C3 (Arguedas)', grower: 'AGR-0702', parcels: ['P-0702-04'], intake: ['REC-26-19905', '08:10', 12.8], maturity: '' },
      'G26-236-ARG-CAL': { crop: 'courgette', product: 'Grilled courgette in bulk', plant: 'Arguedas', date: '2026-08-24', line: 'Grill line G1 (Arguedas)', route: 'grill GRL-1 → IQF tunnel TUN-A1', storage: 'ARG-C3', storageLabel: 'Chamber ARG-C3 (Arguedas)', grower: 'AGR-0718', parcels: ['P-0718-02'], intake: ['REC-26-19511', '07:45', 14.1], maturity: '' },
      'G26-238-ARG-BER': { crop: 'aubergine', product: 'Grilled aubergine in bulk', plant: 'Arguedas', date: '2026-08-26', line: 'Grill line G1 (Arguedas)', route: 'grill GRL-1 → IQF tunnel TUN-A1', storage: 'ARG-C3', storageLabel: 'Chamber ARG-C3 (Arguedas)', grower: 'AGR-0702', parcels: ['P-0702-06'], intake: ['REC-26-19730', '09:05', 9.6], maturity: '' },
      'G26-229-ARG-CEB': { crop: 'onion', product: 'Roasted onion in bulk', plant: 'Arguedas', date: '2026-08-17', line: 'Grill line G1 (Arguedas)', route: 'grill GRL-1 → IQF tunnel TUN-A1', storage: 'ARG-C3', storageLabel: 'Chamber ARG-C3 (Arguedas)', grower: 'AGR-0741', parcels: ['P-0741-01'], intake: ['REC-26-18010', '11:20', 10.2], maturity: '' }
    };

    /* Finished-product lots. alloc: pallet allocation in SSCC numbering order. */
    const LOTS = [
      {
        code: 'L26-261-FUS-GUI-03', product: 'Fine peas 1 kg', brand: 'Verleal (retail ES)', sku: 'VL-GUI-1000',
        plant: 'Fustiñana', line: 'Line L4 (repacking from bulk)', date: '2026-09-18', shift: 'morning', bb: '09/2028', kgPallet: 800,
        origin: 'Bulk G26-176-FUS-GUI (25/06/2026)', bulk: 'G26-176-FUS-GUI', growers: ['AGR-0455'], parcels: ['P-0455-02', 'P-0455-05'], intakes: [['REC-26-09412', '2026-06-25', '07:18', 26.1, 'tenderometer 102 TR']],
        sscc: ['261', '03'],
        alloc: [{ k: 4, ship: 'EXP-26-41102' }, { k: 8, loc: 'C-07', lane: 2, plan: 'EXP-26-41107' }, { k: 10, loc: 'SIL-3' }],
        steps: [
          ['2026-06-25', 'Field', 'Grower AGR-0455 · plots P-0455-02, P-0455-05 (Ribera navarra) · peas', 'AGR-0455'],
          ['2026-06-25 07:18', 'Intake', 'Ticket REC-26-09412 · tenderometer 102 TR · 26.1 t', 'REC-26-09412'],
          ['2026-06-25', 'Season processing (bulk)', 'Line L2 (peas / green beans): cleaning LIM-2 → destoner DP-2 → blancher ESC-2 → IQF tunnel TUN-2 → optical sorter OPT-2 → bulk G26-176-FUS-GUI in Automated silo 2 (Fustiñana)', 'G26-176-FUS-GUI'],
          ['2026-09-18', 'Repacking', 'Line L4 (repacking from bulk): octabin tipper TOL-4 → declodding screen CRB-4 → packing ENV-2 → metal detector DM-2 · morning shift', 'L4'],
          ['2026-09-18', 'Quality', 'Source bulk: tenderometer 102 TR at intake (specification 95-120 TR); Repacking: weight and seal checks compliant (sampling every 30 min); Metal detector DM-2 verified every 2 h during the shift: compliant', '']
        ],
        qc: ['Source bulk: tenderometer 102 TR at intake (specification 95-120 TR)', 'Repacking: weight and seal checks compliant (sampling every 30 min)', 'Metal detector DM-2 verified every 2 h during the shift: compliant'],
        balance: '22 pallets: 8 in C-07, 10 in SIL-3, 4 shipped to Retail logistics platform ES (EXP-26-41102)'
      },
      {
        code: 'L26-258-FUS-BRO-01', product: 'Broccoli florets 2.5 kg', brand: 'EC foodservice', sku: 'EC-BRO-2500',
        plant: 'Fustiñana', line: 'Line L4 (repacking from bulk)', date: '2026-09-15', shift: 'afternoon', bb: '09/2028', kgPallet: 720,
        origin: 'Bulk G26-132-FUS-BRO (12/05/2026)', bulk: 'G26-132-FUS-BRO', growers: ['AGR-0388'], parcels: ['P-0388-01'], intakes: [['REC-26-06120', '2026-05-12', '06:55', 18.4, 'compact head, floret size 30-50 mm']],
        sscc: ['258', '01'],
        alloc: [{ k: 6, loc: 'C-07', lane: 1, plan: 'EXP-26-41106' }, { k: 12, loc: 'SIL-1' }],
        steps: [
          ['2026-05-12', 'Field', 'Grower AGR-0388 · plot P-0388-01 (Ribera navarra) · broccoli', 'AGR-0388'],
          ['2026-05-12 06:55', 'Intake', 'Ticket REC-26-06120 · Compact head, no flowering; floret size 30-50 mm · 18.4 t', 'REC-26-06120'],
          ['2026-05-12', 'Season processing (bulk)', 'Line L3 (green beans / broccoli): trimmer/cutter COR-3 → blancher ESC-3 → IQF tunnel TUN-1 → optical sorter OPT-3 → bulk G26-132-FUS-BRO in Automated silo 1 (Fustiñana)', 'G26-132-FUS-BRO'],
          ['2026-09-15', 'Repacking', 'Line L4 (repacking from bulk): octabin tipper TOL-4 → declodding screen CRB-4 → packing ENV-1 → metal detector DM-2 · afternoon shift', 'L4'],
          ['2026-09-15', 'Quality', 'Florets: size 30-50 mm compliant; Metal detector DM-2: verifications compliant', '']
        ],
        qc: ['Florets: size 30-50 mm compliant', 'Metal detector DM-2: verifications compliant'],
        balance: '18 pallets: 6 in C-07, 12 in SIL-1'
      },
      {
        code: 'L26-262-FUS-MIX-02', product: 'Chargrilled vegetable stir-fry 600 g', brand: 'UK retailer own label (via EC Foods UK)', sku: 'UK-MIX-600',
        plant: 'Fustiñana', line: 'Line L5 (mixes)', date: '2026-09-19', shift: 'morning', bb: '09/2028', kgPallet: 648,
        origin: 'Mix of 4 components', bulks: ['G26-240-ARG-PIM', 'G26-236-ARG-CAL', 'G26-238-ARG-BER', 'G26-229-ARG-CEB'], growers: ['AGR-0702', 'AGR-0718', 'AGR-0741'], parcels: ['P-0702-04', 'P-0718-02', 'P-0702-06', 'P-0741-01'],
        intakes: [['REC-26-19905', '2026-08-28', '08:10', 12.8, 'peppers'], ['REC-26-19511', '2026-08-24', '07:45', 14.1, 'courgette'], ['REC-26-19730', '2026-08-26', '09:05', 9.6, 'aubergine'], ['REC-26-18010', '2026-08-17', '11:20', 10.2, 'onion']],
        sscc: ['262', '02'],
        alloc: [{ k: 9, ship: 'EXP-26-41083' }, { k: 7, loc: 'C-07', lane: 4, plan: 'EXP-26-41109' }],
        steps: [
          ['2026-08-28', 'Component', 'Roasted red pepper strips (30%) · bulk G26-240-ARG-PIM · Arguedas: grill GRL-1 → IQF tunnel TUN-A1 · grower AGR-0702 (P-0702-04)', 'G26-240-ARG-PIM'],
          ['2026-08-24', 'Component', 'Grilled courgette (30%) · bulk G26-236-ARG-CAL · Arguedas: grill GRL-1 → IQF tunnel TUN-A1 · grower AGR-0718 (P-0718-02)', 'G26-236-ARG-CAL'],
          ['2026-08-26', 'Component', 'Grilled aubergine (20%) · bulk G26-238-ARG-BER · Arguedas: grill GRL-1 → IQF tunnel TUN-A1 · grower AGR-0702 (P-0702-06)', 'G26-238-ARG-BER'],
          ['2026-08-17', 'Component', 'Roasted onion (20%) · bulk G26-229-ARG-CEB · Arguedas: grill GRL-1 → IQF tunnel TUN-A1 · grower AGR-0741 (P-0741-01)', 'G26-229-ARG-CEB'],
          ['2026-09-19', 'Mixing and packing', 'Line L5 (mixes): dosing DOS-5 → mixer MZ-5 → packing ENV-5 → metal detector DM-4 · morning shift', 'L5'],
          ['2026-09-19', 'Quality', 'Recipe 30/30/20/20% verified with the dosing scale; Metal detector DM-4: verifications compliant; UK customer specification: English labelling verified', '']
        ],
        qc: ['Recipe 30/30/20/20% verified with the dosing scale', 'Metal detector DM-4: verifications compliant', 'UK customer specification: English labelling verified'],
        balance: '16 pallets: 7 in C-07, 9 shipped to EC Foods UK Ltd (EC subsidiary, United Kingdom) (EXP-26-41083)'
      },
      {
        code: 'L26-255-ALF-ESP-04', product: 'Spinach portions 1 kg', brand: 'Verleal', sku: 'VL-ESP-1000',
        plant: 'Alfaro', line: 'Packing line L2 (Alfaro)', date: '2026-09-12', shift: 'morning', bb: '09/2028', kgPallet: 800,
        origin: 'Bulk G26-098-ALF-ESP (08/04/2026)', bulk: 'G26-098-ALF-ESP', growers: ['AGR-0291'], parcels: ['P-0291-03'], intakes: [['REC-26-04877', '2026-04-08', '08:30', 15.2, 'whole leaf, no bolting']],
        sscc: ['255', '04'],
        alloc: [{ k: 5, loc: 'C-07', lane: 3, plan: 'EXP-26-41107' }, { k: 7, loc: 'SIL-2' }],
        transfer: { code: 'TRF-26-3310', date: '2026-09-14', time: '12:15', from: 'ALF', to: 'FUS', pallets: 12, transport: TRUCK },
        steps: [
          ['2026-04-08', 'Field', 'Grower AGR-0291 · plot P-0291-03 (Rioja Baja) · spinach', 'AGR-0291'],
          ['2026-04-08 08:30', 'Intake', 'Ticket REC-26-04877 · Whole leaf, no bolting · 15.2 t', 'REC-26-04877'],
          ['2026-04-08', 'Season processing (bulk)', 'Leaf line L1 (Alfaro): washer LAV-A1 → blancher ESC-A1 → portioner PRT-A1 → IQF tunnel TUN-A2 → bulk G26-098-ALF-ESP in Bulk chamber 1 (Alfaro)', 'G26-098-ALF-ESP'],
          ['2026-09-12', 'Repacking', 'Packing line L2 (Alfaro): packing ENV-A2 → metal detector DM-A1 · morning shift', 'ALF-L2'],
          ['2026-09-14', 'Transfer', 'ALF → FUS · 12 pallets · Refrigerated truck -25 °C', 'TRF-26-3310'],
          ['2026-09-12', 'Quality', 'Portions: average weight compliant; Metal detector DM-A1: verifications compliant', '']
        ],
        qc: ['Portions: average weight compliant', 'Metal detector DM-A1: verifications compliant'],
        balance: '12 pallets: 5 in C-07, 7 in SIL-2'
      },
      {
        code: 'L26-259-FUS-JUD-01', product: 'Round green beans 1 kg', brand: 'Importer France', sku: 'FR-JUD-1000',
        plant: 'Fustiñana', line: 'Line L3 (green beans / broccoli)', date: '2026-09-16', shift: 'afternoon', bb: '09/2028', kgPallet: 800,
        origin: 'Field · AGR-0527 · harvested 16/09/2026', growers: ['AGR-0527'], parcels: ['P-0527-03'], intakes: [['REC-26-21045', '2026-09-16', '15:20', 21.8, 'maturity index 0.83 (optimum 0.75-0.92)']],
        sscc: ['259', '01'],
        alloc: [{ k: 14, ship: 'EXP-26-41071' }, { k: 6, loc: 'C-07', lane: 5, plan: 'EXP-26-41111' }],
        steps: [
          ['2026-09-16', 'Field', 'Grower AGR-0527 · plot P-0527-03 (Ribera navarra) · green beans', 'AGR-0527'],
          ['2026-09-16 15:20', 'Intake', 'Ticket REC-26-21045 · maturity index 0.83 · 21.8 t', 'REC-26-21045'],
          ['2026-09-16', 'Processing', 'Line L3 (green beans / broccoli): cleaning LIM-3 → trimmer/cutter COR-3 → blancher ESC-3 → IQF tunnel TUN-2 → optical sorter OPT-3 → packing ENV-3 · afternoon shift', 'L3'],
          ['2026-09-16', 'Quality', 'Intake: maturity index 0.83 (optimum 0.75-0.92); Peroxidase test after blanching: negative (compliant); Optical sorter OPT-3: 1.2% rejected', '']
        ],
        qc: ['Intake: maturity index 0.83 (optimum 0.75-0.92)', 'Peroxidase test after blanching: negative (compliant)', 'Optical sorter OPT-3: 1.2% rejected'],
        balance: '20 pallets: 6 in C-07, 14 shipped to Importer France (EXP-26-41071)'
      },
      {
        code: 'L26-263-FUS-MAI-02', product: 'Sweet corn 450 g', brand: 'EC Frozen Foods LLC (USA)', sku: 'US-MAI-450',
        plant: 'Fustiñana', line: 'Line L1 (sweet corn)', date: '2026-09-20', shift: 'morning', bb: '09/2028', kgPallet: 756,
        origin: 'Field · AGR-0613 · harvested 20/09/2026', growers: ['AGR-0613'], parcels: ['P-0613-11', 'P-0613-12'], intakes: [['REC-26-21390', '2026-09-20', '06:40', 32.5, 'maturity index 0.88 (optimum 0.80-0.95), 15.1 °Brix']],
        sscc: ['263', '02'],
        alloc: [{ k: 6, loc: 'C-07', lane: 6, plan: 'EXP-26-41118' }, { k: 18, loc: 'SIL-4' }],
        steps: [
          ['2026-09-20', 'Field', 'Grower AGR-0613 · plots P-0613-11, P-0613-12 (Ribera navarra) · sweet corn', 'AGR-0613'],
          ['2026-09-20 06:40', 'Intake', 'Ticket REC-26-21390 · maturity index 0.88, 15.1 °Brix · 32.5 t', 'REC-26-21390'],
          ['2026-09-20', 'Processing', 'Line L1 (sweet corn): cutter DES-1 → washer LAV-1 → blancher ESC-1 → IQF tunnel TUN-1 → optical sorter OPT-1 → packing ENV-3 → metal detector DM-1 · morning shift', 'L1'],
          ['2026-09-20', 'Quality', 'Intake: maturity index 0.88 (optimum 0.80-0.95), 15.1 °Brix; Metal detector DM-1 (CCP): verifications every 2 h compliant that day; US labelling (English, 16 oz) verified', '']
        ],
        qc: ['Intake: maturity index 0.88 (optimum 0.80-0.95), 15.1 °Brix', 'Metal detector DM-1 (CCP): verifications every 2 h compliant that day', 'US labelling (English, 16 oz) verified'],
        balance: '24 pallets: 6 in C-07, 18 in SIL-4'
      },
      {
        code: 'L26-231-FUS-GUI-01', product: 'Peas 1 kg (Garden Peas 1kg)', brand: 'UK retailer own label (via EC Foods UK)', sku: 'UK-GUI-1000',
        plant: 'Fustiñana', line: 'Line L2 (peas / green beans)', date: '2026-08-19', shift: 'morning', bb: '08/2028', kgPallet: 800,
        origin: 'Field · AGR-0412 · harvested 19/08/2026', growers: ['AGR-0412'], parcels: ['P-0412-07', 'P-0412-09'], intakes: [['REC-26-18233', '2026-08-19', '10:42', 24.6, 'tenderometer 108 TR (specification 95-120 TR)']],
        sscc: ['231', '01'], complaint: true,
        alloc: [{ k: 12, ship: 'EXP-26-40911' }, { k: 8, ship: 'EXP-26-40957' }, { k: 2, loc: 'SIL-3' }],
        steps: [
          ['2026-08-19', 'Field', 'Grower AGR-0412 · plots P-0412-07, P-0412-09 (Ribera navarra) · peas', 'AGR-0412'],
          ['2026-08-19 10:42', 'Intake', 'Ticket REC-26-18233 · tenderometer 108 TR · 24.6 t', 'REC-26-18233'],
          ['2026-08-19', 'Processing', 'Line L2 (peas / green beans): cleaning LIM-2 → destoner DP-2 → blancher ESC-2 → IQF tunnel TUN-2 → optical sorter OPT-2 → packing ENV-4 · morning shift', 'L2'],
          ['2026-08-19', 'Quality', 'Intake: tenderometer 108 TR (specification 95-120 TR): compliant; Intake: 2 kg sample free of stones and clods (compliant); Optical sorter OPT-2: 1.6% rejected during the shift (reference 1.5%); Packing ENV-4: weight and seal checks compliant', ''],
          ['2026-08-18', 'Maintenance', 'Destoner DP-2: mesh wear noted at the weekly inspection; replacement scheduled. OT-26-07415: open, awaiting spare part', 'OT-26-07415']
        ],
        qc: ['Intake: tenderometer 108 TR (specification 95-120 TR): compliant', 'Intake: 2 kg sample free of stones and clods (compliant)', 'Optical sorter OPT-2: 1.6% rejected during the shift (reference 1.5%)', 'Packing ENV-4: weight and seal checks compliant'],
        maint: [{ eq: 'DP-2', wo: 'OT-26-07415', date: '2026-08-18', status: 'open, awaiting spare part', text: 'Mesh wear noted at the weekly inspection; replacement scheduled' }],
        balance: '22 pallets: 2 in SIL-3, 20 shipped to EC Foods UK Ltd (EC subsidiary, United Kingdom) (EXP-26-40911, EXP-26-40957)'
      }
    ];

    /* ------------------------------------------------------------ Derived */
    LOTS.forEach((L) => {
      L.pallets = L.alloc.reduce((s, a) => s + a.k, 0);
      L.kg = L.pallets * L.kgPallet;
      let k = 0;
      L.units = [];
      L.alloc.forEach((a) => {
        for (let h = 1; h <= a.k; h++) {
          k += 1;
          L.units.push({
            n: `${k}/${L.pallets}`,
            sscc: sscc(L.sscc[0], L.sscc[1], k),
            kg: n(L.kgPallet),
            loc: a.ship ? 'Shipped' : LOC[a.loc],
            pos: a.lane ? `lane ${a.lane} · slot ${h}` : '',
            status: a.ship ? { status: 'shipped', label: 'Shipped' } : { status: 'ok', label: 'In stock' },
            ship: a.ship || a.plan || '—',
            _ship: a.ship || a.plan || null,
            _lot: L.code
          });
        }
      });
      L.c07 = L.alloc.find((a) => a.loc === 'C-07') || null;
    });
    const lotsOfShipment = (id) => LOTS.filter((L) => L.alloc.some((a) => a.ship === id || a.plan === id));
    const lotsOfGrower = (g) => LOTS.filter((L) => L.growers.includes(g));
    const lotsOfParcel = (p) => LOTS.filter((L) => L.parcels.includes(p));
    const lotsOfBulk = (b) => LOTS.filter((L) => L.bulk === b || (L.bulks || []).includes(b));
    const shipLabel = (id) => {
      const s = SHIPMENTS[id];
      return `${id} · ${d(s[0])} ${s[1]}`;
    };
    const tone = (stage) => (stage === 'Maintenance' ? 'warn' : stage === 'Quality' ? 'ok' : 'brand');
    const COMPLAINT_STEP = { when: '2026-09-26 10:14', stage: 'Complaint', detail: 'EC Foods UK Ltd reports a complaint from a UK consumer: stone of about 8 mm, no injury. It asks for an investigation report within 5 working days', ref: 'UKC-44718', tone: 'crit' };
    const COMPLAINT_NOTE = { title: 'Complaint UKC-44718', body: 'Stone of about 8 mm in a pack from this lot, processed on L2 the day after the wear on the DP-2 mesh was noted. Reply to the customer due by 2026-10-02.', tone: 'crit', icon: 'mail' };
    const UNIT_COLS = [
      { key: 'n', label: 'Pallet' },
      { key: 'sscc', label: 'SSCC', mono: true },
      { key: 'kg', label: 'Kg' },
      { key: 'loc', label: 'Location', sub: 'pos' },
      { key: 'status', label: 'Status', chip: true },
      { key: 'ship', label: 'Shipment' }
    ];
    const cleanUnits = (rows) => rows.map((u) => ({ n: u.n, sscc: u.sscc, kg: u.kg, loc: u.loc, pos: u.pos, status: u.status, ship: u.ship }));

    /* ------------------------------------------------------------ Finished-product lot */
    function lotRecord(L) {
      const back = L.steps.map(([when, stage, detail, ref]) => ({ when, stage, detail, ref, tone: tone(stage) }));
      if (L.c07) back.push({ when: '2026-09-29 05:50', stage: 'Excursion in C-07', detail: `${pl(L.c07.k, 'pallet', 'pallets')} in lane ${L.c07.lane} during the ${EXC}`, ref: 'ALM-C07-0550', tone: 'crit' });
      if (L.complaint) back.push(COMPLAINT_STEP);
      const rows = [];
      L.alloc.forEach((a) => {
        if (a.ship) return;
        rows.push({
          dest: a.loc, what: `${LOC[a.loc]}${a.lane ? ` · lane ${a.lane}` : ''}`, pallets: String(a.k),
          when: a.plan ? `For ${shipLabel(a.plan)}` : '—', client: a.plan ? CUSTOMERS[SHIPMENTS[a.plan][3]].label : '—', end: '',
          status: a.loc === 'C-07' ? { status: 'evaluate', label: 'In stock · to be assessed' } : { status: 'ok', label: 'In stock' }
        });
      });
      const ships = Array.from(new Set(L.alloc.map((a) => a.ship || a.plan).filter(Boolean)));
      ships.forEach((id) => {
        const s = SHIPMENTS[id];
        const c = CUSTOMERS[s[3]];
        rows.push({
          dest: id, what: s[5] ? `${s[5]} · ${s[4]}` : s[4], pallets: String(L.alloc.filter((a) => a.ship === id || a.plan === id).reduce((t, a) => t + a.k, 0)),
          when: `${d(s[0])} ${s[1]}`, client: c.label, end: c.end || '',
          status: s[2] === 'shipped' ? { status: 'shipped', label: 'Shipped' } : { status: 'planned', label: 'Planned' }
        });
      });
      const notes = (L.maint || []).map((m) => ({ title: `${m.eq} · ${m.wo} (${m.status})`, body: `${m.text} · noted on ${m.date}`, tone: 'warn', icon: 'wrench' }));
      if (L.c07) notes.push({ title: 'Hold to be decided by Quality', body: `The ${L.c07.k} pallets in lane ${L.c07.lane} were in the ${EXC}. PNT-CAL-012 requires them to be assessed before loading ${shipLabel(L.c07.plan)}.`, tone: 'crit', icon: 'thermometer' });
      if (L.complaint) notes.push(COMPLAINT_NOTE);
      return {
        kind: 'Lot',
        title: `Lot ${L.code} · ${L.product}`,
        summary: [
          ['Product', L.product],
          ['Brand and channel', L.brand],
          ['SKU', L.sku],
          ['Plant and line', `${L.plant} · ${L.line}`],
          ['Production', `${d(L.date)} · ${L.shift} shift`],
          ['Best before', L.bb],
          ['Produced', `${pl(L.pallets, 'pallet', 'pallets')} · ${n(L.kg)} kg`],
          ['Origin', L.origin]
        ],
        back,
        forward: {
          title: 'Stock by location and shipments',
          cols: [
            { key: 'dest', label: 'Location or shipment', mono: true, sub: 'what' },
            { key: 'pallets', label: 'Pallets' },
            { key: 'when', label: 'Date' },
            { key: 'client', label: 'Customer', sub: 'end' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows,
          note: L.transfer
            ? { title: `Transfer ${L.transfer.code}`, body: `${L.transfer.pallets} pallets from ${L.transfer.from} to ${L.transfer.to} on ${d(L.transfer.date)} at ${L.transfer.time} · ${L.transfer.transport}. Balance: ${L.balance}.`, icon: 'truck' }
            : { title: 'Lot balance', body: `${L.balance}.`, icon: 'scale' }
        },
        units: { label: 'Pallets (SSCC)', cols: UNIT_COLS, rows: cleanUnits(L.units) },
        quality: L.qc.slice(),
        notes
      };
    }

    /* ------------------------------------------------------------ Source bulk lot */
    function bulkRecord(code) {
      const B = BULKS[code];
      const lots = lotsOfBulk(code);
      const g = GROWERS[B.grower];
      return {
        kind: 'Bulk lot',
        title: `Bulk ${code} · ${B.product}`,
        summary: [
          ['Product', B.product],
          ['Season processing', `${d(B.date)} · ${B.line}`],
          ['Route', B.route],
          ['Stored in', `${B.storageLabel} · ${B.storage}`],
          ['Grower', `${B.grower} · ${g[1]} (${g[0]})`],
          ['Plots', B.parcels.join(', ')],
          ['Intake', `${B.intake[0]} · ${d(B.date)} ${B.intake[1]} · ${n(B.intake[2])} t`],
          ['Traced lots', lots.map((L) => L.code).join(', ')]
        ],
        back: [
          { when: B.date, stage: 'Field', detail: `Grower ${B.grower} · plots ${B.parcels.join(', ')} (${g[0]}) · ${B.crop}`, ref: B.grower },
          { when: `${B.date} ${B.intake[1]}`, stage: 'Intake', detail: `Ticket ${B.intake[0]}${B.maturity ? ` · ${B.maturity}` : ''} · ${n(B.intake[2])} t`, ref: B.intake[0] },
          { when: B.date, stage: 'Season processing', detail: `${B.line}: ${B.route} → ${B.storageLabel}`, ref: code }
        ],
        forward: {
          title: 'Finished-product lots',
          cols: [
            { key: 'lot', label: 'Lot', mono: true, sub: 'what' },
            { key: 'when', label: 'Production' },
            { key: 'pallets', label: 'Pallets' },
            { key: 'where', label: 'Plant and line' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: lots.map((L) => ({ lot: L.code, what: L.product, when: d(L.date), pallets: String(L.pallets), where: `${L.plant} · ${L.line}`, status: L.c07 ? { status: 'evaluate', label: 'Pallets in C-07' } : { status: 'ok', label: 'Traced' } })),
          note: { title: 'Bulk location', body: `${B.storageLabel}, at −25 °C.`, icon: 'warehouse' }
        },
        quality: [B.maturity ? `Intake: ${B.maturity}.` : `Intake ${B.intake[0]} compliant.`, `Season processing: ${B.route}.`],
        notes: []
      };
    }

    /* ------------------------------------------------------------ Shipment */
    function shipmentRecord(id) {
      const s = SHIPMENTS[id];
      const c = CUSTOMERS[s[3]];
      const lots = lotsOfShipment(id);
      const units = LOTS.reduce((acc, L) => acc.concat(L.units.filter((u) => u._ship === id)), []);
      const kg = units.reduce((t, u) => t + Number(u.kg.replace(/,/g, '')), 0);
      const shipped = s[2] === 'shipped';
      const c07 = lots.filter((L) => L.c07 && L.c07.plan === id);
      const back = lots.map((L) => ({ when: L.date, stage: 'Production', detail: `${L.code} · ${L.product} · ${L.plant}, ${L.line}`, ref: L.code, tone: 'brand' }));
      if (c07.length) back.push({ when: '2026-09-29 05:50', stage: 'Excursion in C-07', detail: `${pl(c07.reduce((t, L) => t + L.c07.k, 0), 'pallet', 'pallets')} of the shipment were in the ${EXC}`, ref: 'ALM-C07-0550', tone: 'crit' });
      back.push({ when: `${s[0]} ${s[1]}`, stage: shipped ? 'Dispatch' : 'Planned departure', detail: `${s[5] ? `${s[5]} · ` : ''}${s[4]} · ${c.label}`, ref: id, tone: shipped ? 'ok' : 'brand' });
      if (lots.some((L) => L.complaint)) back.push(COMPLAINT_STEP);
      back.sort((a, b) => a.when.localeCompare(b.when));
      const notes = [];
      if (c07.length) notes.push({ title: 'Pallets awaiting a decision', body: `The pallets come from C-07 (lane ${list(c07.map((L) => String(L.c07.lane)))}). Load them only if Quality releases them after assessing the excursion (PNT-CAL-012).`, tone: 'crit', icon: 'thermometer' });
      if (lots.some((L) => L.complaint)) notes.push({ title: 'Shipment with the complained lot', body: 'It includes pallets of lot L26-231-FUS-GUI-01, subject of complaint UKC-44718.', tone: 'warn', icon: 'mail' });
      return {
        kind: 'Shipment',
        title: `Shipment ${id} · ${c.label}`,
        summary: [
          ['Date and time', `${d(s[0])} ${s[1]}`],
          ['Status', shipped ? 'Shipped' : 'Planned'],
          ['Customer', c.label],
          ['End customer', c.end || '—'],
          ['Origin', 'Fustiñana (FUS)'],
          ['Dock', s[5] || '—'],
          ['Transport', s[4]],
          ['Load', `${pl(units.length, 'pallet', 'pallets')} · ${n(kg)} kg · ${pl(lots.length, 'lot', 'lots')}`]
        ],
        back,
        forward: {
          title: 'Lots in the shipment',
          cols: [
            { key: 'lot', label: 'Lot', mono: true, sub: 'what' },
            { key: 'pallets', label: 'Pallets' },
            { key: 'kg', label: 'Kg' },
            { key: 'from', label: 'Picked from' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: lots.map((L) => {
            const k = L.units.filter((u) => u._ship === id).length;
            const a = L.alloc.find((x) => x.ship === id || x.plan === id);
            return {
              lot: L.code, what: L.product, pallets: String(k), kg: n(k * L.kgPallet),
              from: a.loc ? `${LOC[a.loc]} · lane ${a.lane}` : 'Shipped',
              status: shipped ? { status: 'shipped', label: 'Shipped' } : a.loc === 'C-07' ? { status: 'evaluate', label: 'To be assessed (excursion)' } : { status: 'planned', label: 'Planned' }
            };
          }),
          note: { title: shipped ? 'Delivered' : 'Planned load', body: `${c.label}${c.end ? ` · ${c.end}` : ''} · ${c.country} · ${c.channel} channel.`, icon: 'truck' }
        },
        units: { label: 'Pallets (SSCC)', cols: UNIT_COLS, rows: cleanUnits(units) },
        quality: [
          `Transport: ${s[4]}.`,
          shipped ? `Transport temperature record: ${s[6]}.` : 'Transport temperature record: pending (planned shipment).'
        ],
        notes
      };
    }

    /* ------------------------------------------------------------ Grower */
    function growerRecord(id) {
      const g = GROWERS[id];
      const own = Object.keys(PARCELS).filter((p) => PARCELS[p][0] === id);
      const plan = CAMPAIGN.filter((c) => c[1] === id);
      const lots = lotsOfGrower(id);
      const back = own.map((p) => ({ when: PARCELS[p][3], stage: 'Sowing', detail: `Plot ${p} · ${PARCELS[p][1]} · ${n(PARCELS[p][2])} ha`, ref: p, tone: 'brand' }));
      lots.forEach((L) => L.intakes.forEach((it) => {
        if (L.parcels.some((p) => PARCELS[p] && PARCELS[p][0] === id) && !back.some((b) => b.ref === it[0]) && (L.growers.length === 1 || it[4] && GROWERS[id][2].includes(it[4]))) {
          back.push({ when: `${it[1]} ${it[2]}`, stage: 'Delivery at intake', detail: `Ticket ${it[0]} · ${n(it[3])} t · ${it[4]}`, ref: it[0], tone: 'ok' });
        }
      }));
      back.sort((a, b) => a.when.localeCompare(b.when));
      const rows = lots.map((L) => ({
        ref: L.code, what: L.product, when: d(L.date), qty: pl(L.pallets, 'pallet', 'pallets'),
        status: L.complaint ? { status: 'open', label: 'Complained (UKC-44718)' } : L.c07 ? { status: 'evaluate', label: 'Pallets in C-07' } : { status: 'ok', label: 'Traced' }
      })).concat(plan.map((c) => ({
        ref: c[0], what: `Planned harvest · slot ${c[6]} h · ${c[10]}`, when: '30/09/2026', qty: `${n(c[3])} t`,
        status: !c[8] ? { status: 'critical', label: `Outside the rule (${c[7]} min)` } : c[9] ? { status: 'warning', label: 'Past maturity' } : { status: 'planned', label: 'Planned' }
      })));
      return {
        kind: 'Grower',
        title: `Grower ${id} · ${g[1]}`,
        summary: [
          ['Area', g[0]],
          ['Municipality', g[1]],
          ['Crops', list(g[2])],
          ['Contract', '2026 season contract'],
          ['Plots', own.concat(plan.map((c) => c[0])).join(', ') || '—'],
          ['Traced lots', lots.map((L) => L.code).join(', ') || 'None in the available traces'],
          ['Harvest planned for 30/09', plan.length ? `${pl(plan.length, 'plot', 'plots')} · ${n(plan.reduce((t, c) => t + c[3], 0))} t` : '—']
        ],
        back,
        forward: {
          title: 'Traced lots and planned harvest',
          cols: [
            { key: 'ref', label: 'Lot or plot', mono: true, sub: 'what' },
            { key: 'when', label: 'Date' },
            { key: 'qty', label: 'Quantity' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows,
          note: { title: 'Harvest plan', body: 'The plan for 30/09 (end of the sweet corn and green bean season) is proposed by the Campaign Manager in Siemens Opcenter APS; rule: maximum 150 min from field to tunnel.', icon: 'leaf' }
        },
        units: {
          label: 'Plots',
          cols: [
            { key: 'code', label: 'Plot', mono: true, sub: 'crop' },
            { key: 'mun', label: 'Municipality' },
            { key: 'ha', label: 'Area' },
            { key: 'sow', label: 'Sowing' }
          ],
          rows: own.map((p) => ({ code: p, crop: PARCELS[p][1], mun: g[1], ha: `${n(PARCELS[p][2])} ha`, sow: d(PARCELS[p][3]) }))
            .concat(plan.map((c) => ({ code: c[0], crop: c[2], mun: g[1], ha: '—', sow: '—' })))
        },
        quality: lots.map((L) => `${L.code}: ${L.intakes.filter((it) => L.growers.length === 1 || g[2].includes(it[4])).map((it) => `${it[0]} · ${it[4]}`).join('; ')}`)
          .concat(plan.map((c) => `${c[0]}: maturity index ${n(c[4])} (optimum ${OPTIMAL[c[2]]}) · ${n(c[5])} km · ${c[7]} min from field to tunnel`)),
        notes: plan.filter((c) => !c[8] || c[9]).map((c) => (!c[8]
          ? { title: `${c[0]} outside the 150-min rule`, body: `At ${n(c[5])} km, the harvest would reach the tunnel in ${c[7]} min. Reschedule the slot or the plot.`, tone: 'crit', icon: 'clock' }
          : { title: `${c[0]} past maturity`, body: `Index ${n(c[4])}, above the optimum ${OPTIMAL[c[2]]}: bring the harvest forward.`, tone: 'warn', icon: 'leaf' }))
      };
    }

    /* ------------------------------------------------------------ Plot */
    function parcelRecord(id) {
      const P = PARCELS[id];
      if (P) {
        const g = GROWERS[P[0]];
        const lots = lotsOfParcel(id);
        const back = [{ when: P[3], stage: 'Sowing', detail: `${P[1]} · ${n(P[2])} ha · ${g[1]} (${g[0]})`, ref: id, tone: 'brand' }];
        lots.forEach((L) => L.intakes.filter((it) => L.growers.length === 1 || it[4] === P[1]).forEach((it) => back.push({ when: `${it[1]} ${it[2]}`, stage: 'Harvest and intake', detail: `Ticket ${it[0]} · ${it[4]} · ${n(it[3])} t (grower delivery)`, ref: it[0], tone: 'ok' })));
        return {
          kind: 'Plot',
          title: `Plot ${id} · ${P[1]}`,
          summary: [
            ['Grower', P[0]],
            ['Municipality and area', `${g[1]} · ${g[0]}`],
            ['Crop', P[1]],
            ['Area', `${n(P[2])} ha`],
            ['Sowing', d(P[3])],
            ['Traced lots', lots.map((L) => L.code).join(', ') || '—']
          ],
          back,
          forward: {
            title: 'Lots with produce from the plot',
            cols: [
              { key: 'lot', label: 'Lot', mono: true, sub: 'what' },
              { key: 'when', label: 'Production' },
              { key: 'pallets', label: 'Pallets' },
              { key: 'status', label: 'Status', chip: true }
            ],
            rows: lots.map((L) => ({ lot: L.code, what: L.product, when: d(L.date), pallets: String(L.pallets), status: L.complaint ? { status: 'open', label: 'Complained (UKC-44718)' } : L.c07 ? { status: 'evaluate', label: 'Pallets in C-07' } : { status: 'ok', label: 'Traced' } }))
          },
          quality: lots.map((L) => `${L.code}: ${L.qc[0]}`),
          notes: []
        };
      }
      const c = CAMPAIGN.find((x) => x[0] === id);
      const g = GROWERS[c[1]];
      return {
        kind: 'Plot',
        title: `Plot ${id} · ${c[2]}`,
        summary: [
          ['Grower', c[1]],
          ['Municipality and area', `${g[1]} · ${g[0]}`],
          ['Crop', c[2]],
          ['Planned harvest', `30/09/2026 · slot ${c[6]} h`],
          ['Expected yield', `${n(c[3])} t`],
          ['Maturity index', `${n(c[4])} (optimum ${OPTIMAL[c[2]]})`],
          ['Distance to Fustiñana', `${n(c[5])} km`],
          ['Field to tunnel', `${c[7]} min (maximum 150 min) · ${c[10]}`]
        ],
        back: [
          { when: '2026-09-29', stage: 'Maturity sampling', detail: `Index ${n(c[4])} (optimum ${OPTIMAL[c[2]]})`, ref: id, tone: c[9] ? 'warn' : 'ok' },
          { when: '2026-09-30', stage: 'Planned harvest', detail: `Slot ${c[6]} h · ${n(c[3])} t to tunnel ${c[10]} in ${c[7]} min`, ref: c[10], tone: c[8] ? 'brand' : 'crit' }
        ],
        forward: {
          title: 'Harvest plan for 30/09',
          cols: [
            { key: 'slot', label: 'Slot', mono: true, sub: 'tunnel' },
            { key: 'qty', label: 'Tonnes' },
            { key: 'time', label: 'Field → tunnel' },
            { key: 'status', label: 'Status', chip: true }
          ],
          rows: [{ slot: `${c[6]} h`, tunnel: c[10], qty: `${n(c[3])} t`, time: `${c[7]} min`, status: !c[8] ? { status: 'critical', label: 'Outside the rule' } : c[9] ? { status: 'warning', label: 'Past maturity' } : { status: 'planned', label: 'Planned' } }]
        },
        quality: [`Maturity index ${n(c[4])} (optimum ${OPTIMAL[c[2]]}).`, `Plant rule: maximum 150 min from field to tunnel; this plot, ${c[7]} min.`],
        notes: !c[8]
          ? [{ title: 'Outside the 150-min rule', body: `At ${n(c[5])} km, the harvest would reach the tunnel in ${c[7]} min. Reschedule the slot or the plot.`, tone: 'crit', icon: 'clock' }]
          : c[9] ? [{ title: 'Past maturity', body: `Index ${n(c[4])}, above the optimum ${OPTIMAL[c[2]]}: bring the harvest forward.`, tone: 'warn', icon: 'leaf' }] : []
      };
    }

    /* ------------------------------------------------------------ Index (upper-case keys) */
    const out = {};
    LOTS.forEach((L) => { out[L.code] = lotRecord(L); });
    Object.keys(BULKS).forEach((k) => { out[k] = bulkRecord(k); });
    Object.keys(SHIPMENTS).forEach((k) => { out[k] = shipmentRecord(k); });
    Object.keys(GROWERS).forEach((k) => { out[k] = growerRecord(k); });
    Object.keys(PARCELS).forEach((k) => { out[k] = parcelRecord(k); });
    CAMPAIGN.forEach((c) => { out[c[0]] = parcelRecord(c[0]); });
    out['TRF-26-3310'] = out['L26-255-ALF-ESP-04'];
    return out;
  })()
});
