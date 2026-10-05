/* Empresa de Congelados · registros de trazabilidad (lotes de producto terminado, graneles, expediciones, agricultores y parcelas).
 * Los lee App.traceModal desde CN_DATA.trace[código] (claves en mayúsculas).
 * Escenario de la demo de referencia con datos sintéticos (MFM). */
agenticPack('congelados', {
  trace: (function () {
    'use strict';

    /* ------------------------------------------------------------ Utilidades */
    const n = (v) => {
      const [i, f] = String(v).split('.');
      return i.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (f ? `,${f}` : '');
    };
    const d = (iso) => (iso ? `${iso.slice(8, 10)}/${iso.slice(5, 7)}/${iso.slice(0, 4)}` : '—');
    const pl = (k, one, many) => `${n(k)} ${k === 1 ? one : many}`;
    const list = (a) => (a.length < 2 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} y ${a[a.length - 1]}`);
    /* SSCC (GS1): extensión 3 + prefijo de empresa 8412345 + día juliano del lote + secuencia + n.º de palé + dígito de control. */
    function sscc(day, seq, k) {
      const body = `38412345${day}${seq}${String(k).padStart(4, '0')}`;
      let s = 0;
      for (let i = body.length - 1, w = 3; i >= 0; i--, w = 4 - w) s += Number(body[i]) * w;
      return body + ((10 - (s % 10)) % 10);
    }
    const LOC = {
      'C-07': 'Cámara de expedición 7 (Fustiñana)',
      'SIL-1': 'Silo automático 1 (Fustiñana)',
      'SIL-2': 'Silo automático 2 (Fustiñana)',
      'SIL-3': 'Silo automático 3 (Fustiñana)',
      'SIL-4': 'Silo automático 4 (Fustiñana)'
    };
    const EXC = 'excursión de C-07 de 05:50 a 06:40 (pico de −13,9 °C a las 06:25; 50 min por encima de −18 °C)';

    /* ------------------------------------------------------------ Datos maestros */
    const CUSTOMERS = {
      'CLI-RET-ES': { label: 'Plataforma logística retail ES', country: 'España', channel: 'Retail' },
      'CLI-FS-ES': { label: 'Distribuidor foodservice ES (zona centro)', country: 'España', channel: 'Foodservice' },
      'CLI-FWF-UK': { label: 'EC Foods UK Ltd (filial EC, Reino Unido)', end: 'Retailer UK (marca blanca)', country: 'Reino Unido', channel: 'Retail UK' },
      'CLI-IMP-FR': { label: 'Importador Francia', country: 'Francia', channel: 'Exportación' },
      'CLI-ECUS': { label: 'EC Frozen Foods LLC (filial EC, EE. UU.)', country: 'EE. UU.', channel: 'Exportación' }
    };
    const TRUCK = 'Camión frigorífico −25 °C';
    /* [fecha, hora, estado, cliente, transporte, muelle, registro de temperatura] */
    const SHIPMENTS = {
      'EXP-26-40911': ['2026-08-25', '16:10', 'expedida', 'CLI-FWF-UK', TRUCK, null, 'conforme'],
      'EXP-26-40957': ['2026-08-28', '15:30', 'expedida', 'CLI-FWF-UK', TRUCK, null, 'conforme'],
      'EXP-26-41071': ['2026-09-23', '17:45', 'expedida', 'CLI-IMP-FR', TRUCK, null, 'conforme'],
      'EXP-26-41083': ['2026-09-25', '14:20', 'expedida', 'CLI-FWF-UK', TRUCK, null, 'conforme'],
      'EXP-26-41102': ['2026-09-28', '18:40', 'expedida', 'CLI-RET-ES', TRUCK, null, 'conforme'],
      'EXP-26-41106': ['2026-09-29', '09:30', 'planificada', 'CLI-FS-ES', TRUCK, 'Muelle 2', null],
      'EXP-26-41107': ['2026-09-29', '11:00', 'planificada', 'CLI-RET-ES', TRUCK, 'Muelle 3', null],
      'EXP-26-41109': ['2026-09-29', '14:00', 'planificada', 'CLI-FWF-UK', TRUCK, 'Muelle 4', null],
      'EXP-26-41111': ['2026-09-29', '16:30', 'planificada', 'CLI-IMP-FR', TRUCK, 'Muelle 5', null],
      'EXP-26-41118': ['2026-09-30', '07:00', 'planificada', 'CLI-ECUS', 'Contenedor reefer (consolidación, salida por puerto)', 'Muelle 6', null]
    };
    /* [zona, municipio, cultivos] · todos con contrato de campaña 2026 */
    const GROWERS = {
      'AGR-0412': ['Ribera navarra', 'Ribaforada', ['guisante', 'judía verde']],
      'AGR-0455': ['Ribera navarra', 'Cortes', ['guisante']],
      'AGR-0388': ['Ribera navarra', 'Cadreita', ['brócoli']],
      'AGR-0291': ['Rioja Baja', 'Alfaro', ['espinaca']],
      'AGR-0527': ['Ribera navarra', 'Castejón', ['judía verde']],
      'AGR-0540': ['Ribera navarra', 'Cortes', ['judía verde']],
      'AGR-0561': ['Ribera navarra', 'Ribaforada', ['judía verde']],
      'AGR-0613': ['Ribera navarra', 'Valtierra', ['maíz dulce']],
      'AGR-0634': ['Ribera navarra', 'Cadreita', ['maíz dulce']],
      'AGR-0658': ['Ribera navarra', 'Milagro', ['maíz dulce']],
      'AGR-0671': ['Ribera navarra', 'Castejón', ['maíz dulce']],
      'AGR-0702': ['Ribera navarra', 'Arguedas', ['pimiento', 'berenjena']],
      'AGR-0718': ['Ribera navarra', 'Tudela', ['calabacín']],
      'AGR-0719': ['Ribera alta del Ebro', 'Mendavia', ['maíz dulce']],
      'AGR-0741': ['Ribera navarra', 'Cabanillas', ['cebolla']]
    };
    /* [agricultor, cultivo, hectáreas, siembra] · municipio y zona, los del agricultor */
    const PARCELS = {
      'P-0412-07': ['AGR-0412', 'guisante', 4.2, '2026-05-28'],
      'P-0412-09': ['AGR-0412', 'guisante', 3.6, '2026-05-30'],
      'P-0455-02': ['AGR-0455', 'guisante', 5.1, '2026-03-10'],
      'P-0455-05': ['AGR-0455', 'guisante', 4.4, '2026-03-12'],
      'P-0388-01': ['AGR-0388', 'brócoli', 6, '2026-02-20'],
      'P-0291-03': ['AGR-0291', 'espinaca', 3.8, '2026-02-15'],
      'P-0527-03': ['AGR-0527', 'judía verde', 5.5, '2026-07-01'],
      'P-0613-11': ['AGR-0613', 'maíz dulce', 1.2, '2026-06-01'],
      'P-0613-12': ['AGR-0613', 'maíz dulce', 0.9, '2026-06-03'],
      'P-0702-04': ['AGR-0702', 'pimiento', 2.6, '2026-05-05'],
      'P-0702-06': ['AGR-0702', 'berenjena', 1.9, '2026-05-08'],
      'P-0718-02': ['AGR-0718', 'calabacín', 2.2, '2026-06-10'],
      'P-0741-01': ['AGR-0741', 'cebolla', 3, '2026-03-01']
    };
    /* Plan de cosecha del 30/09 (fin de campaña) · [parcela, agricultor, cultivo, t esperadas, índice de madurez, km, franja, min campo→túnel, dentro de la regla, pasada de madurez, túnel] */
    const CAMPAIGN = [
      ['P-0613-14', 'AGR-0613', 'maíz dulce', 20, 0.88, 19, '06-08', 89, true, false, 'TUN-1'],
      ['P-0634-03', 'AGR-0634', 'maíz dulce', 21, 0.9, 23, '08-10', 93, true, false, 'TUN-1'],
      ['P-0634-05', 'AGR-0634', 'maíz dulce', 18, 0.86, 23, '10-12', 93, true, false, 'TUN-1'],
      ['P-0658-01', 'AGR-0658', 'maíz dulce', 16, 0.84, 36, '12-14', 107, true, false, 'TUN-1'],
      ['P-0658-02', 'AGR-0658', 'maíz dulce', 17, 0.83, 36, '14-16', 107, true, false, 'TUN-1'],
      ['P-0671-07', 'AGR-0671', 'maíz dulce', 13, 0.81, 26, '14-16', 97, true, false, 'TUN-1'],
      ['P-0613-15', 'AGR-0613', 'maíz dulce', 19, 1.03, 19, '16-18', 89, true, true, 'TUN-1'],
      ['P-0719-02', 'AGR-0719', 'maíz dulce', 14, 0.87, 78, '18-20', 160, false, false, 'TUN-1'],
      ['P-0527-05', 'AGR-0527', 'judía verde', 12, 0.84, 26, '06-08', 87, true, false, 'TUN-2'],
      ['P-0527-06', 'AGR-0527', 'judía verde', 13, 0.86, 26, '08-10', 87, true, false, 'TUN-2'],
      ['P-0540-02', 'AGR-0540', 'judía verde', 11, 0.8, 16, '10-12', 77, true, false, 'TUN-2'],
      ['P-0540-03', 'AGR-0540', 'judía verde', 10, 0.78, 16, '12-14', 77, true, false, 'TUN-2'],
      ['P-0561-01', 'AGR-0561', 'judía verde', 12, 0.88, 8, '14-16', 69, true, false, 'TUN-2'],
      ['P-0540-04', 'AGR-0540', 'judía verde', 9, 0.79, 16, '14-16', 77, true, false, 'TUN-2'],
      ['P-0561-02', 'AGR-0561', 'judía verde', 10, 0.9, 8, '16-18', 69, true, false, 'TUN-2']
    ];
    const OPTIMAL = { 'maíz dulce': '0,80-0,95', 'judía verde': '0,75-0,92' };

    /* Graneles de origen (proceso de campaña) */
    const BULKS = {
      'G26-176-FUS-GUI': { crop: 'guisante', product: 'Guisante IQF a granel', plant: 'Fustiñana', date: '2026-06-25', line: 'Línea L2 (guisante / judía verde)', route: 'limpieza LIM-2 → despedregadora DP-2 → escaldador ESC-2 → túnel IQF TUN-2 → óptica OPT-2', storage: 'SIL-2', storageLabel: 'Silo automático 2 (Fustiñana)', grower: 'AGR-0455', parcels: ['P-0455-02', 'P-0455-05'], intake: ['REC-26-09412', '07:18', 26.1], maturity: 'tenderómetro 102 TR (especificación 95-120 TR)' },
      'G26-132-FUS-BRO': { crop: 'brócoli', product: 'Brócoli en floretes IQF a granel', plant: 'Fustiñana', date: '2026-05-12', line: 'Línea L3 (judía verde / brócoli)', route: 'despuntadora/cortadora COR-3 → escaldador ESC-3 → túnel IQF TUN-1 → óptica OPT-3', storage: 'SIL-1', storageLabel: 'Silo automático 1 (Fustiñana)', grower: 'AGR-0388', parcels: ['P-0388-01'], intake: ['REC-26-06120', '06:55', 18.4], maturity: 'cabeza compacta, sin floración; calibre de florete 30-50 mm' },
      'G26-098-ALF-ESP': { crop: 'espinaca', product: 'Espinaca en porciones IQF a granel', plant: 'Alfaro', date: '2026-04-08', line: 'Línea de hoja L1 (Alfaro)', route: 'lavadora LAV-A1 → escaldador ESC-A1 → porcionadora PRT-A1 → túnel IQF TUN-A2', storage: 'ALF-C1', storageLabel: 'Cámara de granel 1 (Alfaro)', grower: 'AGR-0291', parcels: ['P-0291-03'], intake: ['REC-26-04877', '08:30', 15.2], maturity: 'hoja entera, sin espigado' },
      'G26-240-ARG-PIM': { crop: 'pimiento', product: 'Pimiento rojo asado en tiras a granel', plant: 'Arguedas', date: '2026-08-28', line: 'Línea de grill G1 (Arguedas)', route: 'grill (plancha) GRL-1 → túnel IQF TUN-A1', storage: 'ARG-C3', storageLabel: 'Cámara ARG-C3 (Arguedas)', grower: 'AGR-0702', parcels: ['P-0702-04'], intake: ['REC-26-19905', '08:10', 12.8], maturity: '' },
      'G26-236-ARG-CAL': { crop: 'calabacín', product: 'Calabacín a la plancha a granel', plant: 'Arguedas', date: '2026-08-24', line: 'Línea de grill G1 (Arguedas)', route: 'grill (plancha) GRL-1 → túnel IQF TUN-A1', storage: 'ARG-C3', storageLabel: 'Cámara ARG-C3 (Arguedas)', grower: 'AGR-0718', parcels: ['P-0718-02'], intake: ['REC-26-19511', '07:45', 14.1], maturity: '' },
      'G26-238-ARG-BER': { crop: 'berenjena', product: 'Berenjena a la plancha a granel', plant: 'Arguedas', date: '2026-08-26', line: 'Línea de grill G1 (Arguedas)', route: 'grill (plancha) GRL-1 → túnel IQF TUN-A1', storage: 'ARG-C3', storageLabel: 'Cámara ARG-C3 (Arguedas)', grower: 'AGR-0702', parcels: ['P-0702-06'], intake: ['REC-26-19730', '09:05', 9.6], maturity: '' },
      'G26-229-ARG-CEB': { crop: 'cebolla', product: 'Cebolla asada a granel', plant: 'Arguedas', date: '2026-08-17', line: 'Línea de grill G1 (Arguedas)', route: 'grill (plancha) GRL-1 → túnel IQF TUN-A1', storage: 'ARG-C3', storageLabel: 'Cámara ARG-C3 (Arguedas)', grower: 'AGR-0741', parcels: ['P-0741-01'], intake: ['REC-26-18010', '11:20', 10.2], maturity: '' }
    };

    /* Lotes de producto terminado. alloc: reparto de palés en el orden de numeración de los SSCC. */
    const LOTS = [
      {
        code: 'L26-261-FUS-GUI-03', product: 'Guisante fino 1 kg', brand: 'Verleal (retail ES)', sku: 'VL-GUI-1000',
        plant: 'Fustiñana', line: 'Línea L4 (reenvasado desde granel)', date: '2026-09-18', shift: 'mañana', bb: '09/2028', kgPallet: 800,
        origin: 'Granel G26-176-FUS-GUI (25/06/2026)', bulk: 'G26-176-FUS-GUI', growers: ['AGR-0455'], parcels: ['P-0455-02', 'P-0455-05'], intakes: [['REC-26-09412', '2026-06-25', '07:18', 26.1, 'tenderómetro 102 TR']],
        sscc: ['261', '03'],
        alloc: [{ k: 4, ship: 'EXP-26-41102' }, { k: 8, loc: 'C-07', lane: 2, plan: 'EXP-26-41107' }, { k: 10, loc: 'SIL-3' }],
        steps: [
          ['2026-06-25', 'Campo', 'Agricultor AGR-0455 · parcelas P-0455-02, P-0455-05 (Ribera navarra) · guisante', 'AGR-0455'],
          ['2026-06-25 07:18', 'Recepción', 'Ticket REC-26-09412 · tenderómetro 102 TR · 26,1 t', 'REC-26-09412'],
          ['2026-06-25', 'Proceso de campaña (granel)', 'Línea L2 (guisante / judía verde): limpieza LIM-2 → despedregadora DP-2 → escaldador ESC-2 → túnel IQF TUN-2 → óptica OPT-2 → granel G26-176-FUS-GUI en Silo automático 2 (Fustiñana)', 'G26-176-FUS-GUI'],
          ['2026-09-18', 'Reenvasado', 'Línea L4 (reenvasado desde granel): volcador de octavines TOL-4 → criba de desterronado CRB-4 → envasado ENV-2 → detector de metales DM-2 · turno mañana', 'L4'],
          ['2026-09-18', 'Calidad', 'Granel de origen: tenderómetro 102 TR en recepción (especificación 95-120 TR); Reenvasado: control de peso y sellado conforme (muestreo cada 30 min); Detector de metales DM-2 verificado cada 2 h durante el turno: conforme', '']
        ],
        qc: ['Granel de origen: tenderómetro 102 TR en recepción (especificación 95-120 TR)', 'Reenvasado: control de peso y sellado conforme (muestreo cada 30 min)', 'Detector de metales DM-2 verificado cada 2 h durante el turno: conforme'],
        balance: '22 palés: 8 en C-07, 10 en SIL-3, 4 expedidos a Plataforma logística retail ES (EXP-26-41102)'
      },
      {
        code: 'L26-258-FUS-BRO-01', product: 'Brócoli floretes 2,5 kg', brand: 'EC foodservice', sku: 'EC-BRO-2500',
        plant: 'Fustiñana', line: 'Línea L4 (reenvasado desde granel)', date: '2026-09-15', shift: 'tarde', bb: '09/2028', kgPallet: 720,
        origin: 'Granel G26-132-FUS-BRO (12/05/2026)', bulk: 'G26-132-FUS-BRO', growers: ['AGR-0388'], parcels: ['P-0388-01'], intakes: [['REC-26-06120', '2026-05-12', '06:55', 18.4, 'cabeza compacta, calibre de florete 30-50 mm']],
        sscc: ['258', '01'],
        alloc: [{ k: 6, loc: 'C-07', lane: 1, plan: 'EXP-26-41106' }, { k: 12, loc: 'SIL-1' }],
        steps: [
          ['2026-05-12', 'Campo', 'Agricultor AGR-0388 · parcelas P-0388-01 (Ribera navarra) · brócoli', 'AGR-0388'],
          ['2026-05-12 06:55', 'Recepción', 'Ticket REC-26-06120 · Cabeza compacta, sin floración; calibre de florete 30-50 mm · 18,4 t', 'REC-26-06120'],
          ['2026-05-12', 'Proceso de campaña (granel)', 'Línea L3 (judía verde / brócoli): despuntadora/cortadora COR-3 → escaldador ESC-3 → túnel IQF TUN-1 → óptica OPT-3 → granel G26-132-FUS-BRO en Silo automático 1 (Fustiñana)', 'G26-132-FUS-BRO'],
          ['2026-09-15', 'Reenvasado', 'Línea L4 (reenvasado desde granel): volcador de octavines TOL-4 → criba de desterronado CRB-4 → envasado ENV-1 → detector de metales DM-2 · turno tarde', 'L4'],
          ['2026-09-15', 'Calidad', 'Floretes: calibre 30-50 mm conforme; Detector de metales DM-2: verificaciones conformes', '']
        ],
        qc: ['Floretes: calibre 30-50 mm conforme', 'Detector de metales DM-2: verificaciones conformes'],
        balance: '18 palés: 6 en C-07, 12 en SIL-1'
      },
      {
        code: 'L26-262-FUS-MIX-02', product: 'Salteado de verduras a la plancha 600 g', brand: 'Marca blanca retailer UK (vía EC Foods UK)', sku: 'UK-MIX-600',
        plant: 'Fustiñana', line: 'Línea L5 (mezclas)', date: '2026-09-19', shift: 'mañana', bb: '09/2028', kgPallet: 648,
        origin: 'Mezcla de 4 componentes', bulks: ['G26-240-ARG-PIM', 'G26-236-ARG-CAL', 'G26-238-ARG-BER', 'G26-229-ARG-CEB'], growers: ['AGR-0702', 'AGR-0718', 'AGR-0741'], parcels: ['P-0702-04', 'P-0718-02', 'P-0702-06', 'P-0741-01'],
        intakes: [['REC-26-19905', '2026-08-28', '08:10', 12.8, 'pimiento'], ['REC-26-19511', '2026-08-24', '07:45', 14.1, 'calabacín'], ['REC-26-19730', '2026-08-26', '09:05', 9.6, 'berenjena'], ['REC-26-18010', '2026-08-17', '11:20', 10.2, 'cebolla']],
        sscc: ['262', '02'],
        alloc: [{ k: 9, ship: 'EXP-26-41083' }, { k: 7, loc: 'C-07', lane: 4, plan: 'EXP-26-41109' }],
        steps: [
          ['2026-08-28', 'Componente', 'Pimiento rojo asado en tiras (30 %) · granel G26-240-ARG-PIM · Arguedas: grill (plancha) GRL-1 → túnel IQF TUN-A1 · agricultor AGR-0702 (P-0702-04)', 'G26-240-ARG-PIM'],
          ['2026-08-24', 'Componente', 'Calabacín a la plancha (30 %) · granel G26-236-ARG-CAL · Arguedas: grill (plancha) GRL-1 → túnel IQF TUN-A1 · agricultor AGR-0718 (P-0718-02)', 'G26-236-ARG-CAL'],
          ['2026-08-26', 'Componente', 'Berenjena a la plancha (20 %) · granel G26-238-ARG-BER · Arguedas: grill (plancha) GRL-1 → túnel IQF TUN-A1 · agricultor AGR-0702 (P-0702-06)', 'G26-238-ARG-BER'],
          ['2026-08-17', 'Componente', 'Cebolla asada (20 %) · granel G26-229-ARG-CEB · Arguedas: grill (plancha) GRL-1 → túnel IQF TUN-A1 · agricultor AGR-0741 (P-0741-01)', 'G26-229-ARG-CEB'],
          ['2026-09-19', 'Mezcla y envasado', 'Línea L5 (mezclas): dosificación DOS-5 → mezcladora MZ-5 → envasado ENV-5 → detector de metales DM-4 · turno mañana', 'L5'],
          ['2026-09-19', 'Calidad', 'Receta 30/30/20/20 % verificada con la báscula de dosificación; Detector de metales DM-4: verificaciones conformes; Especificación del cliente UK: etiquetado en inglés verificado', '']
        ],
        qc: ['Receta 30/30/20/20 % verificada con la báscula de dosificación', 'Detector de metales DM-4: verificaciones conformes', 'Especificación del cliente UK: etiquetado en inglés verificado'],
        balance: '16 palés: 7 en C-07, 9 expedidos a EC Foods UK Ltd (filial EC, Reino Unido) (EXP-26-41083)'
      },
      {
        code: 'L26-255-ALF-ESP-04', product: 'Espinaca en porciones 1 kg', brand: 'Verleal', sku: 'VL-ESP-1000',
        plant: 'Alfaro', line: 'Línea de envasado L2 (Alfaro)', date: '2026-09-12', shift: 'mañana', bb: '09/2028', kgPallet: 800,
        origin: 'Granel G26-098-ALF-ESP (08/04/2026)', bulk: 'G26-098-ALF-ESP', growers: ['AGR-0291'], parcels: ['P-0291-03'], intakes: [['REC-26-04877', '2026-04-08', '08:30', 15.2, 'hoja entera, sin espigado']],
        sscc: ['255', '04'],
        alloc: [{ k: 5, loc: 'C-07', lane: 3, plan: 'EXP-26-41107' }, { k: 7, loc: 'SIL-2' }],
        transfer: { code: 'TRF-26-3310', date: '2026-09-14', time: '12:15', from: 'ALF', to: 'FUS', pallets: 12, transport: TRUCK },
        steps: [
          ['2026-04-08', 'Campo', 'Agricultor AGR-0291 · parcelas P-0291-03 (Rioja Baja) · espinaca', 'AGR-0291'],
          ['2026-04-08 08:30', 'Recepción', 'Ticket REC-26-04877 · Hoja entera, sin espigado · 15,2 t', 'REC-26-04877'],
          ['2026-04-08', 'Proceso de campaña (granel)', 'Línea de hoja L1 (Alfaro): lavadora LAV-A1 → escaldador ESC-A1 → porcionadora PRT-A1 → túnel IQF TUN-A2 → granel G26-098-ALF-ESP en Cámara de granel 1 (Alfaro)', 'G26-098-ALF-ESP'],
          ['2026-09-12', 'Reenvasado', 'Línea de envasado L2 (Alfaro): envasado ENV-A2 → detector de metales DM-A1 · turno mañana', 'ALF-L2'],
          ['2026-09-14', 'Transferencia', 'ALF → FUS · 12 palés · Camión frigorífico -25 °C', 'TRF-26-3310'],
          ['2026-09-12', 'Calidad', 'Porciones: peso medio conforme; Detector de metales DM-A1: verificaciones conformes', '']
        ],
        qc: ['Porciones: peso medio conforme', 'Detector de metales DM-A1: verificaciones conformes'],
        balance: '12 palés: 5 en C-07, 7 en SIL-2'
      },
      {
        code: 'L26-259-FUS-JUD-01', product: 'Judía verde redonda 1 kg', brand: 'Importador Francia', sku: 'FR-JUD-1000',
        plant: 'Fustiñana', line: 'Línea L3 (judía verde / brócoli)', date: '2026-09-16', shift: 'tarde', bb: '09/2028', kgPallet: 800,
        origin: 'Campo · AGR-0527 · cosecha 16/09/2026', growers: ['AGR-0527'], parcels: ['P-0527-03'], intakes: [['REC-26-21045', '2026-09-16', '15:20', 21.8, 'índice de madurez 0,83 (óptimo 0,75-0,92)']],
        sscc: ['259', '01'],
        alloc: [{ k: 14, ship: 'EXP-26-41071' }, { k: 6, loc: 'C-07', lane: 5, plan: 'EXP-26-41111' }],
        steps: [
          ['2026-09-16', 'Campo', 'Agricultor AGR-0527 · parcelas P-0527-03 (Ribera navarra) · judía verde', 'AGR-0527'],
          ['2026-09-16 15:20', 'Recepción', 'Ticket REC-26-21045 · índice de madurez 0,83 · 21,8 t', 'REC-26-21045'],
          ['2026-09-16', 'Proceso', 'Línea L3 (judía verde / brócoli): limpieza LIM-3 → despuntadora/cortadora COR-3 → escaldador ESC-3 → túnel IQF TUN-2 → óptica OPT-3 → envasado ENV-3 · turno tarde', 'L3'],
          ['2026-09-16', 'Calidad', 'Recepción: índice de madurez 0,83 (óptimo 0,75-0,92); Ensayo de peroxidasa tras el escaldado: negativo (conforme); Selectora óptica OPT-3: rechazo del 1,2 %', '']
        ],
        qc: ['Recepción: índice de madurez 0,83 (óptimo 0,75-0,92)', 'Ensayo de peroxidasa tras el escaldado: negativo (conforme)', 'Selectora óptica OPT-3: rechazo del 1,2 %'],
        balance: '20 palés: 6 en C-07, 14 expedidos a Importador Francia (EXP-26-41071)'
      },
      {
        code: 'L26-263-FUS-MAI-02', product: 'Maíz dulce 450 g', brand: 'EC Frozen Foods LLC (EE. UU.)', sku: 'US-MAI-450',
        plant: 'Fustiñana', line: 'Línea L1 (maíz dulce)', date: '2026-09-20', shift: 'mañana', bb: '09/2028', kgPallet: 756,
        origin: 'Campo · AGR-0613 · cosecha 20/09/2026', growers: ['AGR-0613'], parcels: ['P-0613-11', 'P-0613-12'], intakes: [['REC-26-21390', '2026-09-20', '06:40', 32.5, 'índice de madurez 0,88 (óptimo 0,80-0,95), 15,1 °Brix']],
        sscc: ['263', '02'],
        alloc: [{ k: 6, loc: 'C-07', lane: 6, plan: 'EXP-26-41118' }, { k: 18, loc: 'SIL-4' }],
        steps: [
          ['2026-09-20', 'Campo', 'Agricultor AGR-0613 · parcelas P-0613-11, P-0613-12 (Ribera navarra) · maíz dulce', 'AGR-0613'],
          ['2026-09-20 06:40', 'Recepción', 'Ticket REC-26-21390 · índice de madurez 0,88, 15,1 °Brix · 32,5 t', 'REC-26-21390'],
          ['2026-09-20', 'Proceso', 'Línea L1 (maíz dulce): desgranadora DES-1 → lavadora LAV-1 → escaldador ESC-1 → túnel IQF TUN-1 → óptica OPT-1 → envasado ENV-3 → detector de metales DM-1 · turno mañana', 'L1'],
          ['2026-09-20', 'Calidad', 'Recepción: índice de madurez 0,88 (óptimo 0,80-0,95), 15,1 °Brix; Detector de metales DM-1 (PCC): verificaciones cada 2 h conformes ese día; Etiquetado EE. UU. (inglés, 16 oz) verificado', '']
        ],
        qc: ['Recepción: índice de madurez 0,88 (óptimo 0,80-0,95), 15,1 °Brix', 'Detector de metales DM-1 (PCC): verificaciones cada 2 h conformes ese día', 'Etiquetado EE. UU. (inglés, 16 oz) verificado'],
        balance: '24 palés: 6 en C-07, 18 en SIL-4'
      },
      {
        code: 'L26-231-FUS-GUI-01', product: 'Guisante 1 kg (Garden Peas 1kg)', brand: 'Marca blanca retailer UK (vía EC Foods UK)', sku: 'UK-GUI-1000',
        plant: 'Fustiñana', line: 'Línea L2 (guisante / judía verde)', date: '2026-08-19', shift: 'mañana', bb: '08/2028', kgPallet: 800,
        origin: 'Campo · AGR-0412 · cosecha 19/08/2026', growers: ['AGR-0412'], parcels: ['P-0412-07', 'P-0412-09'], intakes: [['REC-26-18233', '2026-08-19', '10:42', 24.6, 'tenderómetro 108 TR (especificación 95-120 TR)']],
        sscc: ['231', '01'], complaint: true,
        alloc: [{ k: 12, ship: 'EXP-26-40911' }, { k: 8, ship: 'EXP-26-40957' }, { k: 2, loc: 'SIL-3' }],
        steps: [
          ['2026-08-19', 'Campo', 'Agricultor AGR-0412 · parcelas P-0412-07, P-0412-09 (Ribera navarra) · guisante', 'AGR-0412'],
          ['2026-08-19 10:42', 'Recepción', 'Ticket REC-26-18233 · tenderómetro 108 TR · 24,6 t', 'REC-26-18233'],
          ['2026-08-19', 'Proceso', 'Línea L2 (guisante / judía verde): limpieza LIM-2 → despedregadora DP-2 → escaldador ESC-2 → túnel IQF TUN-2 → óptica OPT-2 → envasado ENV-4 · turno mañana', 'L2'],
          ['2026-08-19', 'Calidad', 'Recepción: tenderómetro 108 TR (especificación 95-120 TR): conforme; Recepción: muestra de 2 kg sin piedras ni terrones (conforme); Selectora óptica OPT-2: rechazo del 1,6 % en el turno (referencia 1,5 %); Envasado ENV-4: control de peso y sellado conforme', ''],
          ['2026-08-18', 'Mantenimiento', 'Despedregadora DP-2: desgaste de la malla anotado en la inspección semanal; sustitución programada. OT-26-07415: abierta, pendiente de repuesto', 'OT-26-07415']
        ],
        qc: ['Recepción: tenderómetro 108 TR (especificación 95-120 TR): conforme', 'Recepción: muestra de 2 kg sin piedras ni terrones (conforme)', 'Selectora óptica OPT-2: rechazo del 1,6 % en el turno (referencia 1,5 %)', 'Envasado ENV-4: control de peso y sellado conforme'],
        maint: [{ eq: 'DP-2', wo: 'OT-26-07415', date: '2026-08-18', status: 'abierta, pendiente de repuesto', text: 'Desgaste de la malla anotado en la inspección semanal; sustitución programada' }],
        balance: '22 palés: 2 en SIL-3, 20 expedidos a EC Foods UK Ltd (filial EC, Reino Unido) (EXP-26-40911, EXP-26-40957)'
      }
    ];

    /* ------------------------------------------------------------ Derivados */
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
            loc: a.ship ? 'Expedido' : LOC[a.loc],
            pos: a.lane ? `calle ${a.lane} · hueco ${h}` : '',
            status: a.ship ? { status: 'shipped', label: 'Expedido' } : { status: 'ok', label: 'En stock' },
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
    const tone = (stage) => (stage === 'Mantenimiento' ? 'warn' : stage === 'Calidad' ? 'ok' : 'brand');
    const COMPLAINT_STEP = { when: '2026-09-26 10:14', stage: 'Reclamación', detail: 'EC Foods UK Ltd comunica la reclamación de un consumidor del Reino Unido: piedra de unos 8 mm, sin lesiones. Pide informe de investigación en 5 días hábiles', ref: 'UKC-44718', tone: 'crit' };
    const COMPLAINT_NOTE = { title: 'Reclamación UKC-44718', body: 'Piedra de unos 8 mm en un envase de este lote, procesado en L2 un día después de anotarse el desgaste de la malla de DP-2. Respuesta al cliente antes del 2026-10-02.', tone: 'crit', icon: 'mail' };
    const UNIT_COLS = [
      { key: 'n', label: 'Palé' },
      { key: 'sscc', label: 'SSCC', mono: true },
      { key: 'kg', label: 'Kg' },
      { key: 'loc', label: 'Ubicación', sub: 'pos' },
      { key: 'status', label: 'Estado', chip: true },
      { key: 'ship', label: 'Expedición' }
    ];
    const cleanUnits = (rows) => rows.map((u) => ({ n: u.n, sscc: u.sscc, kg: u.kg, loc: u.loc, pos: u.pos, status: u.status, ship: u.ship }));

    /* ------------------------------------------------------------ Lote de producto terminado */
    function lotRecord(L) {
      const back = L.steps.map(([when, stage, detail, ref]) => ({ when, stage, detail, ref, tone: tone(stage) }));
      if (L.c07) back.push({ when: '2026-09-29 05:50', stage: 'Excursión en C-07', detail: `${pl(L.c07.k, 'palé', 'palés')} en la calle ${L.c07.lane} durante la ${EXC}`, ref: 'ALM-C07-0550', tone: 'crit' });
      if (L.complaint) back.push(COMPLAINT_STEP);
      const rows = [];
      L.alloc.forEach((a) => {
        if (a.ship) return;
        rows.push({
          dest: a.loc, what: `${LOC[a.loc]}${a.lane ? ` · calle ${a.lane}` : ''}`, pallets: String(a.k),
          when: a.plan ? `Para ${shipLabel(a.plan)}` : '—', client: a.plan ? CUSTOMERS[SHIPMENTS[a.plan][3]].label : '—', end: '',
          status: a.loc === 'C-07' ? { status: 'evaluate', label: 'En stock · a evaluar' } : { status: 'ok', label: 'En stock' }
        });
      });
      const ships = Array.from(new Set(L.alloc.map((a) => a.ship || a.plan).filter(Boolean)));
      ships.forEach((id) => {
        const s = SHIPMENTS[id];
        const c = CUSTOMERS[s[3]];
        rows.push({
          dest: id, what: s[5] ? `${s[5]} · ${s[4]}` : s[4], pallets: String(L.alloc.filter((a) => a.ship === id || a.plan === id).reduce((t, a) => t + a.k, 0)),
          when: `${d(s[0])} ${s[1]}`, client: c.label, end: c.end || '',
          status: s[2] === 'expedida' ? { status: 'shipped', label: 'Expedida' } : { status: 'planned', label: 'Planificada' }
        });
      });
      const notes = (L.maint || []).map((m) => ({ title: `${m.eq} · ${m.wo} (${m.status})`, body: `${m.text} · anotado el ${m.date}`, tone: 'warn', icon: 'wrench' }));
      if (L.c07) notes.push({ title: 'Retención a decidir por Calidad', body: `Los ${L.c07.k} palés de la calle ${L.c07.lane} estuvieron en la ${EXC}. PNT-CAL-012 exige evaluarlos antes de cargar ${shipLabel(L.c07.plan)}.`, tone: 'crit', icon: 'thermometer' });
      if (L.complaint) notes.push(COMPLAINT_NOTE);
      return {
        kind: 'Lote',
        title: `Lote ${L.code} · ${L.product}`,
        summary: [
          ['Producto', L.product],
          ['Marca y canal', L.brand],
          ['SKU', L.sku],
          ['Planta y línea', `${L.plant} · ${L.line}`],
          ['Fabricación', `${d(L.date)} · turno de ${L.shift}`],
          ['Consumo preferente', L.bb],
          ['Producido', `${pl(L.pallets, 'palé', 'palés')} · ${n(L.kg)} kg`],
          ['Origen', L.origin]
        ],
        back,
        forward: {
          title: 'Stock por ubicación y expediciones',
          cols: [
            { key: 'dest', label: 'Ubicación o expedición', mono: true, sub: 'what' },
            { key: 'pallets', label: 'Palés' },
            { key: 'when', label: 'Fecha' },
            { key: 'client', label: 'Cliente', sub: 'end' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows,
          note: L.transfer
            ? { title: `Traslado ${L.transfer.code}`, body: `${L.transfer.pallets} palés de ${L.transfer.from} a ${L.transfer.to} el ${d(L.transfer.date)} a las ${L.transfer.time} · ${L.transfer.transport}. Balance: ${L.balance}.`, icon: 'truck' }
            : { title: 'Balance del lote', body: `${L.balance}.`, icon: 'scale' }
        },
        units: { label: 'Palés (SSCC)', cols: UNIT_COLS, rows: cleanUnits(L.units) },
        quality: L.qc.slice(),
        notes
      };
    }

    /* ------------------------------------------------------------ Granel de origen */
    function bulkRecord(code) {
      const B = BULKS[code];
      const lots = lotsOfBulk(code);
      const g = GROWERS[B.grower];
      return {
        kind: 'Lote de granel',
        title: `Granel ${code} · ${B.product}`,
        summary: [
          ['Producto', B.product],
          ['Proceso de campaña', `${d(B.date)} · ${B.line}`],
          ['Ruta', B.route],
          ['Almacenado en', `${B.storageLabel} · ${B.storage}`],
          ['Agricultor', `${B.grower} · ${g[1]} (${g[0]})`],
          ['Parcelas', B.parcels.join(', ')],
          ['Recepción', `${B.intake[0]} · ${d(B.date)} ${B.intake[1]} · ${n(B.intake[2])} t`],
          ['Lotes trazados', lots.map((L) => L.code).join(', ')]
        ],
        back: [
          { when: B.date, stage: 'Campo', detail: `Agricultor ${B.grower} · parcelas ${B.parcels.join(', ')} (${g[0]}) · ${B.crop}`, ref: B.grower },
          { when: `${B.date} ${B.intake[1]}`, stage: 'Recepción', detail: `Ticket ${B.intake[0]}${B.maturity ? ` · ${B.maturity}` : ''} · ${n(B.intake[2])} t`, ref: B.intake[0] },
          { when: B.date, stage: 'Proceso de campaña', detail: `${B.line}: ${B.route} → ${B.storageLabel}`, ref: code }
        ],
        forward: {
          title: 'Lotes de producto terminado',
          cols: [
            { key: 'lot', label: 'Lote', mono: true, sub: 'what' },
            { key: 'when', label: 'Fabricación' },
            { key: 'pallets', label: 'Palés' },
            { key: 'where', label: 'Planta y línea' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: lots.map((L) => ({ lot: L.code, what: L.product, when: d(L.date), pallets: String(L.pallets), where: `${L.plant} · ${L.line}`, status: L.c07 ? { status: 'evaluate', label: 'Palés en C-07' } : { status: 'ok', label: 'Trazado' } })),
          note: { title: 'Ubicación del granel', body: `${B.storageLabel}, a −25 °C.`, icon: 'warehouse' }
        },
        quality: [B.maturity ? `Recepción: ${B.maturity}.` : `Recepción ${B.intake[0]} conforme.`, `Proceso de campaña: ${B.route}.`],
        notes: []
      };
    }

    /* ------------------------------------------------------------ Expedición */
    function shipmentRecord(id) {
      const s = SHIPMENTS[id];
      const c = CUSTOMERS[s[3]];
      const lots = lotsOfShipment(id);
      const units = LOTS.reduce((acc, L) => acc.concat(L.units.filter((u) => u._ship === id)), []);
      const kg = units.reduce((t, u) => t + Number(u.kg.replace(/\./g, '')), 0);
      const shipped = s[2] === 'expedida';
      const c07 = lots.filter((L) => L.c07 && L.c07.plan === id);
      const back = lots.map((L) => ({ when: L.date, stage: 'Fabricación', detail: `${L.code} · ${L.product} · ${L.plant}, ${L.line}`, ref: L.code, tone: 'brand' }));
      if (c07.length) back.push({ when: '2026-09-29 05:50', stage: 'Excursión en C-07', detail: `${pl(c07.reduce((t, L) => t + L.c07.k, 0), 'palé', 'palés')} de la expedición estuvieron en la ${EXC}`, ref: 'ALM-C07-0550', tone: 'crit' });
      back.push({ when: `${s[0]} ${s[1]}`, stage: shipped ? 'Expedición' : 'Salida planificada', detail: `${s[5] ? `${s[5]} · ` : ''}${s[4]} · ${c.label}`, ref: id, tone: shipped ? 'ok' : 'brand' });
      if (lots.some((L) => L.complaint)) back.push(COMPLAINT_STEP);
      back.sort((a, b) => a.when.localeCompare(b.when));
      const notes = [];
      if (c07.length) notes.push({ title: 'Palés pendientes de decisión', body: `Los palés salen de C-07 (calle ${list(c07.map((L) => String(L.c07.lane)))}). Cargar solo si Calidad los libera tras evaluar la excursión (PNT-CAL-012).`, tone: 'crit', icon: 'thermometer' });
      if (lots.some((L) => L.complaint)) notes.push({ title: 'Expedición con lote reclamado', body: 'Incluye palés del lote L26-231-FUS-GUI-01, objeto de la reclamación UKC-44718.', tone: 'warn', icon: 'mail' });
      return {
        kind: 'Expedición',
        title: `Expedición ${id} · ${c.label}`,
        summary: [
          ['Fecha y hora', `${d(s[0])} ${s[1]}`],
          ['Estado', shipped ? 'Expedida' : 'Planificada'],
          ['Cliente', c.label],
          ['Cliente final', c.end || '—'],
          ['Origen', 'Fustiñana (FUS)'],
          ['Muelle', s[5] || '—'],
          ['Transporte', s[4]],
          ['Carga', `${pl(units.length, 'palé', 'palés')} · ${n(kg)} kg · ${pl(lots.length, 'lote', 'lotes')}`]
        ],
        back,
        forward: {
          title: 'Lotes de la expedición',
          cols: [
            { key: 'lot', label: 'Lote', mono: true, sub: 'what' },
            { key: 'pallets', label: 'Palés' },
            { key: 'kg', label: 'Kg' },
            { key: 'from', label: 'Procedencia' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: lots.map((L) => {
            const k = L.units.filter((u) => u._ship === id).length;
            const a = L.alloc.find((x) => x.ship === id || x.plan === id);
            return {
              lot: L.code, what: L.product, pallets: String(k), kg: n(k * L.kgPallet),
              from: a.loc ? `${LOC[a.loc]} · calle ${a.lane}` : 'Expedido',
              status: shipped ? { status: 'shipped', label: 'Expedido' } : a.loc === 'C-07' ? { status: 'evaluate', label: 'A evaluar (excursión)' } : { status: 'planned', label: 'Planificado' }
            };
          }),
          note: { title: shipped ? 'Entregada' : 'Carga prevista', body: `${c.label}${c.end ? ` · ${c.end}` : ''} · ${c.country} · canal ${c.channel}.`, icon: 'truck' }
        },
        units: { label: 'Palés (SSCC)', cols: UNIT_COLS, rows: cleanUnits(units) },
        quality: [
          `Transporte: ${s[4]}.`,
          shipped ? `Registro de temperatura del transporte: ${s[6]}.` : 'Registro de temperatura del transporte: pendiente (expedición planificada).'
        ],
        notes
      };
    }

    /* ------------------------------------------------------------ Agricultor */
    function growerRecord(id) {
      const g = GROWERS[id];
      const own = Object.keys(PARCELS).filter((p) => PARCELS[p][0] === id);
      const plan = CAMPAIGN.filter((c) => c[1] === id);
      const lots = lotsOfGrower(id);
      const back = own.map((p) => ({ when: PARCELS[p][3], stage: 'Siembra', detail: `Parcela ${p} · ${PARCELS[p][1]} · ${n(PARCELS[p][2])} ha`, ref: p, tone: 'brand' }));
      lots.forEach((L) => L.intakes.forEach((it) => {
        if (L.parcels.some((p) => PARCELS[p] && PARCELS[p][0] === id) && !back.some((b) => b.ref === it[0]) && (L.growers.length === 1 || it[4] && GROWERS[id][2].includes(it[4]))) {
          back.push({ when: `${it[1]} ${it[2]}`, stage: 'Entrega en recepción', detail: `Ticket ${it[0]} · ${n(it[3])} t · ${it[4]}`, ref: it[0], tone: 'ok' });
        }
      }));
      back.sort((a, b) => a.when.localeCompare(b.when));
      const rows = lots.map((L) => ({
        ref: L.code, what: L.product, when: d(L.date), qty: pl(L.pallets, 'palé', 'palés'),
        status: L.complaint ? { status: 'open', label: 'Reclamado (UKC-44718)' } : L.c07 ? { status: 'evaluate', label: 'Palés en C-07' } : { status: 'ok', label: 'Trazado' }
      })).concat(plan.map((c) => ({
        ref: c[0], what: `Cosecha prevista · franja ${c[6]} h · ${c[10]}`, when: '30/09/2026', qty: `${n(c[3])} t`,
        status: !c[8] ? { status: 'critical', label: `Fuera de la regla (${c[7]} min)` } : c[9] ? { status: 'warning', label: 'Pasada de madurez' } : { status: 'planned', label: 'Planificada' }
      })));
      return {
        kind: 'Agricultor',
        title: `Agricultor ${id} · ${g[1]}`,
        summary: [
          ['Zona', g[0]],
          ['Municipio', g[1]],
          ['Cultivos', list(g[2])],
          ['Contrato', 'Contrato de campaña 2026'],
          ['Parcelas', own.concat(plan.map((c) => c[0])).join(', ') || '—'],
          ['Lotes trazados', lots.map((L) => L.code).join(', ') || 'Ninguno en las trazas disponibles'],
          ['Cosecha prevista el 30/09', plan.length ? `${pl(plan.length, 'parcela', 'parcelas')} · ${n(plan.reduce((t, c) => t + c[3], 0))} t` : '—']
        ],
        back,
        forward: {
          title: 'Lotes trazados y cosecha prevista',
          cols: [
            { key: 'ref', label: 'Lote o parcela', mono: true, sub: 'what' },
            { key: 'when', label: 'Fecha' },
            { key: 'qty', label: 'Cantidad' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows,
          note: { title: 'Plan de cosecha', body: 'El plan del 30/09 (fin de campaña de maíz dulce y judía verde) lo propone el Jefe de campaña en Siemens Opcenter APS; regla: máximo 150 min del campo al túnel.', icon: 'leaf' }
        },
        units: {
          label: 'Parcelas',
          cols: [
            { key: 'code', label: 'Parcela', mono: true, sub: 'crop' },
            { key: 'mun', label: 'Municipio' },
            { key: 'ha', label: 'Superficie' },
            { key: 'sow', label: 'Siembra' }
          ],
          rows: own.map((p) => ({ code: p, crop: PARCELS[p][1], mun: g[1], ha: `${n(PARCELS[p][2])} ha`, sow: d(PARCELS[p][3]) }))
            .concat(plan.map((c) => ({ code: c[0], crop: c[2], mun: g[1], ha: '—', sow: '—' })))
        },
        quality: lots.map((L) => `${L.code}: ${L.intakes.filter((it) => L.growers.length === 1 || g[2].includes(it[4])).map((it) => `${it[0]} · ${it[4]}`).join('; ')}`)
          .concat(plan.map((c) => `${c[0]}: índice de madurez ${n(c[4])} (óptimo ${OPTIMAL[c[2]]}) · ${n(c[5])} km · ${c[7]} min del campo al túnel`)),
        notes: plan.filter((c) => !c[8] || c[9]).map((c) => (!c[8]
          ? { title: `${c[0]} fuera de la regla de 150 min`, body: `A ${n(c[5])} km, la cosecha llegaría al túnel en ${c[7]} min. Replanificar la franja o la parcela.`, tone: 'crit', icon: 'clock' }
          : { title: `${c[0]} pasada de madurez`, body: `Índice ${n(c[4])}, por encima del óptimo ${OPTIMAL[c[2]]}: adelantar la cosecha.`, tone: 'warn', icon: 'leaf' }))
      };
    }

    /* ------------------------------------------------------------ Parcela */
    function parcelRecord(id) {
      const P = PARCELS[id];
      if (P) {
        const g = GROWERS[P[0]];
        const lots = lotsOfParcel(id);
        const back = [{ when: P[3], stage: 'Siembra', detail: `${P[1]} · ${n(P[2])} ha · ${g[1]} (${g[0]})`, ref: id, tone: 'brand' }];
        lots.forEach((L) => L.intakes.filter((it) => L.growers.length === 1 || it[4] === P[1]).forEach((it) => back.push({ when: `${it[1]} ${it[2]}`, stage: 'Cosecha y recepción', detail: `Ticket ${it[0]} · ${it[4]} · ${n(it[3])} t (entrega del agricultor)`, ref: it[0], tone: 'ok' })));
        return {
          kind: 'Parcela',
          title: `Parcela ${id} · ${P[1]}`,
          summary: [
            ['Agricultor', P[0]],
            ['Municipio y zona', `${g[1]} · ${g[0]}`],
            ['Cultivo', P[1]],
            ['Superficie', `${n(P[2])} ha`],
            ['Siembra', d(P[3])],
            ['Lotes trazados', lots.map((L) => L.code).join(', ') || '—']
          ],
          back,
          forward: {
            title: 'Lotes con producto de la parcela',
            cols: [
              { key: 'lot', label: 'Lote', mono: true, sub: 'what' },
              { key: 'when', label: 'Fabricación' },
              { key: 'pallets', label: 'Palés' },
              { key: 'status', label: 'Estado', chip: true }
            ],
            rows: lots.map((L) => ({ lot: L.code, what: L.product, when: d(L.date), pallets: String(L.pallets), status: L.complaint ? { status: 'open', label: 'Reclamado (UKC-44718)' } : L.c07 ? { status: 'evaluate', label: 'Palés en C-07' } : { status: 'ok', label: 'Trazado' } }))
          },
          quality: lots.map((L) => `${L.code}: ${L.qc[0]}`),
          notes: []
        };
      }
      const c = CAMPAIGN.find((x) => x[0] === id);
      const g = GROWERS[c[1]];
      return {
        kind: 'Parcela',
        title: `Parcela ${id} · ${c[2]}`,
        summary: [
          ['Agricultor', c[1]],
          ['Municipio y zona', `${g[1]} · ${g[0]}`],
          ['Cultivo', c[2]],
          ['Cosecha prevista', `30/09/2026 · franja ${c[6]} h`],
          ['Producción esperada', `${n(c[3])} t`],
          ['Índice de madurez', `${n(c[4])} (óptimo ${OPTIMAL[c[2]]})`],
          ['Distancia a Fustiñana', `${n(c[5])} km`],
          ['Del campo al túnel', `${c[7]} min (máximo 150 min) · ${c[10]}`]
        ],
        back: [
          { when: '2026-09-29', stage: 'Muestreo de madurez', detail: `Índice ${n(c[4])} (óptimo ${OPTIMAL[c[2]]})`, ref: id, tone: c[9] ? 'warn' : 'ok' },
          { when: '2026-09-30', stage: 'Cosecha prevista', detail: `Franja ${c[6]} h · ${n(c[3])} t al túnel ${c[10]} en ${c[7]} min`, ref: c[10], tone: c[8] ? 'brand' : 'crit' }
        ],
        forward: {
          title: 'Plan de cosecha del 30/09',
          cols: [
            { key: 'slot', label: 'Franja', mono: true, sub: 'tunnel' },
            { key: 'qty', label: 'Toneladas' },
            { key: 'time', label: 'Campo → túnel' },
            { key: 'status', label: 'Estado', chip: true }
          ],
          rows: [{ slot: `${c[6]} h`, tunnel: c[10], qty: `${n(c[3])} t`, time: `${c[7]} min`, status: !c[8] ? { status: 'critical', label: 'Fuera de la regla' } : c[9] ? { status: 'warning', label: 'Pasada de madurez' } : { status: 'planned', label: 'Planificada' } }]
        },
        quality: [`Índice de madurez ${n(c[4])} (óptimo ${OPTIMAL[c[2]]}).`, `Regla de planta: máximo 150 min del campo al túnel; esta parcela, ${c[7]} min.`],
        notes: !c[8]
          ? [{ title: 'Fuera de la regla de 150 min', body: `A ${n(c[5])} km, la cosecha llegaría al túnel en ${c[7]} min. Replanificar la franja o la parcela.`, tone: 'crit', icon: 'clock' }]
          : c[9] ? [{ title: 'Pasada de madurez', body: `Índice ${n(c[4])}, por encima del óptimo ${OPTIMAL[c[2]]}: adelantar la cosecha.`, tone: 'warn', icon: 'leaf' }] : []
      };
    }

    /* ------------------------------------------------------------ Índice (claves en mayúsculas) */
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
