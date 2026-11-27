/*
 * Hornalba · demo «Red global de máquinas y PLC».
 * Empresa, plantas, marcas, máquinas, datos, clientes e incidencias ficticios, preparados por MFM.
 */
window.CN_DATA = {
  meta: {
    id: 'hornalba',
    standalone: false,
    industry: 'Masas congeladas · operación global de plantas',
    company: 'Hornalba',
    short: 'HB',
    site: 'Red global · Ingeniería y Mantenimiento',
    user_role: 'Dirección global de Mantenimiento',
    user_initials: 'DM',
    user_sub: 'Sede central · hora CET',
    today: '2026-11-26',
    epoch: '2026-11-26T07:05:00',
    clock_title: 'Hora de la sede (CET)',
    doc_org: 'Hornalba · Ingeniería global (documento de ejemplo)',
    theme: { brand: '#8A4B2A', dark: '#5E321C', deep: '#2E190E', tint: '#F6EDE7' },
    data_nouns: 'Máquinas, autómatas (PLC), variables, lecturas, alarmas, órdenes de trabajo, repuestos, costes y documentos',
    system_icons: { 'OPC UA': 'activity', 'MQTT': 'route', 'SAP PM': 'wrench', 'SCADA': 'activity', 'MES': 'factory', 'Registro de activos': 'database', 'Histórico de series': 'bar-chart', 'Edge': 'server', 'Almacén de repuestos': 'warehouse', 'Plan de producción': 'calendar', 'Repositorio de programas': 'git-branch', 'Manuales': 'book-open', 'Teams': 'message-square' },
    connectors: ['OPC UA', 'MQTT Sparkplug B', 'EtherNet/IP', 'PROFINET', 'SAP PM', 'MES', 'SCADA', 'Microsoft Teams', 'Outlook'],
    about: [
      ['Qué es', 'Una simulación interactiva de cómo Hornalba podría registrar, vigilar y gestionar las máquinas de todas sus plantas con una capa de agentes por encima de los PLC. Se abre en el navegador, sin instalación y sin acceso a ningún sistema real.'],
      ['Qué es ficticio', 'Todo: la empresa, sus plantas y marcas, las máquinas, los datos, los clientes y las incidencias. El escenario representa 13 de las 26 plantas de un grupo inventado.'],
      ['Qué es sintético', 'Máquinas, PLC, direcciones IP, firmware, variables, lecturas, alarmas, órdenes, repuestos, costes, avisos de seguridad, documentos y personas. No describen la instalación real de ninguna planta.'],
      ['Acciones', 'Escrituras en PLC, órdenes de trabajo, reservas y avisos se simulan y no salen de este navegador. Todo queda en el registro de auditoría de la sesión y se borra con «Reiniciar demo».'],
      ['Conectores', 'OPC UA, MQTT Sparkplug B, EtherNet/IP, PROFINET, SAP PM, MES, SCADA y Microsoft 365 son conectores de demostración. En un proyecto real, los sistemas se confirman en el descubrimiento.'],
      ['Seguridad industrial', 'En la propuesta que representa la demo, los agentes nunca escriben en la lógica ni en los sistemas de seguridad del PLC. Solo pueden cambiar consignas de una lista cerrada, dentro de límites, con aprobación humana y a través del equipo edge de la planta.'],
      ['Modelo de lenguaje', 'Esta página no llama a ningún modelo: las respuestas están preparadas. En un piloto, el modelo lo elige Hornalba y la plataforma se instala en su infraestructura.']
    ]
  }
};

window.HB = (function () {
  'use strict';

  /* ---------------------------------------------------------------- Plantas */
  /* utc: desfase respecto a UTC el 26/11 · lat/lon aproximados para el mapa */
  const PLANTS = [
    { id: 'valdecierzo', code: 'VCZ', name: 'Valdecierzo', place: 'Zaragoza', country: 'España', cc: 'ES', lat: 41.6, lon: -0.9, utc: 1, focus: 'Pan de masa madre', lines: 6, machines: 142, plcs: 168, tags: 21400, oee: 82.4, edge: 'ok', vendor: 'Siemens' },
    { id: 'robledal', code: 'ROB', name: 'Robledal', place: 'Burgos', country: 'España', cc: 'ES', lat: 42.3, lon: -3.7, utc: 1, focus: 'Panadería', lines: 5, machines: 118, plcs: 131, tags: 16900, oee: 80.9, edge: 'ok', vendor: 'Siemens' },
    { id: 'montalbar', code: 'MTB', name: 'Montalbar', place: 'Lleida', country: 'España', cc: 'ES', lat: 41.6, lon: 0.6, utc: 1, focus: 'Bollería', lines: 4, machines: 86, plcs: 97, tags: 11200, oee: 79.6, edge: 'ok', vendor: 'Schneider' },
    { id: 'ribera', code: 'RIB', name: 'La Ribera', place: 'Toledo', country: 'España', cc: 'ES', lat: 39.9, lon: -4.0, utc: 1, focus: 'Bollería y brioche', lines: 6, machines: 134, plcs: 156, tags: 19800, oee: 83.1, edge: 'ok', vendor: 'Siemens' },
    { id: 'puertosur', code: 'PSU', name: 'Puerto Sur', place: 'Sevilla', country: 'España', cc: 'ES', lat: 37.4, lon: -6.0, utc: 1, focus: 'Panadería', lines: 3, machines: 64, plcs: 72, tags: 8300, oee: 78.8, edge: 'warn', vendor: 'Schneider' },
    { id: 'saintaubin', code: 'STA', name: 'Saint-Aubin', place: 'región de Lyon', country: 'Francia', cc: 'FR', lat: 45.7, lon: 4.9, utc: 1, focus: 'Bollería y pastelería', lines: 3, machines: 71, plcs: 84, tags: 12600, oee: 76.2, edge: 'ok', vendor: 'Beckhoff' },
    { id: 'nowawola', code: 'NWL', name: 'Nowa Wola', place: 'región de Łódź', country: 'Polonia', cc: 'PL', lat: 51.8, lon: 19.5, utc: 1, focus: 'Rosquillas y bollería', lines: 7, machines: 156, plcs: 181, tags: 24300, oee: 84.0, edge: 'ok', vendor: 'Siemens' },
    { id: 'colverde', code: 'CVD', name: 'Colverde', place: 'región de Parma', country: 'Italia', cc: 'IT', lat: 44.8, lon: 10.3, utc: 1, focus: 'Panadería', lines: 3, machines: 58, plcs: 61, tags: 6900, oee: 77.5, edge: 'ok', vendor: 'Siemens' },
    { id: 'eschenfeld', code: 'ESF', name: 'Eschenfeld', place: 'región de Leipzig', country: 'Alemania', cc: 'DE', lat: 51.3, lon: 12.4, utc: 1, focus: 'Panadería', lines: 2, machines: 41, plcs: 44, tags: 4700, oee: 75.9, edge: 'ok', vendor: 'Schneider' },
    { id: 'pinewood', code: 'PNW', name: 'Pinewood', place: 'Pensilvania', country: 'Estados Unidos', cc: 'US', lat: 40.3, lon: -76.9, utc: -5, focus: 'Trenzas', lines: 4, machines: 92, plcs: 104, tags: 12100, oee: 78.3, edge: 'ok', vendor: 'Rockwell' },
    { id: 'redfield', code: 'RDF', name: 'Redfield', place: 'Texas', country: 'Estados Unidos', cc: 'US', lat: 32.8, lon: -97.0, utc: -6, focus: 'Panadería', lines: 5, machines: 109, plcs: 117, tags: 9400, oee: 74.8, edge: 'onboarding', vendor: 'Rockwell' },
    { id: 'valleazul', code: 'VAZ', name: 'Valle Azul', place: 'Querétaro', country: 'México', cc: 'MX', lat: 20.6, lon: -100.4, utc: -6, focus: 'Bollería', lines: 3, machines: 67, plcs: 74, tags: 8800, oee: 77.1, edge: 'ok', vendor: 'Rockwell' },
    { id: 'binhlac', code: 'BNL', name: 'Binh Lac', place: 'sur de Vietnam', country: 'Vietnam', cc: 'VN', lat: 10.8, lon: 106.7, utc: 7, focus: 'Bollería y pastelería', lines: 4, machines: 73, plcs: 79, tags: 9100, oee: 71.4, edge: 'ok', vendor: 'Mitsubishi' }
  ];
  const plant = (id) => PLANTS.find((p) => p.id === id);

  /* ---------------------------------------------------------------- Familias de autómatas */
  const PLC = {
    Siemens: { model: 'SIMATIC S7-1516-3 PN/DP', order: '6ES7516-3AN02-0AB0', fw: 'V2.9.4', latest: 'V3.1.2', proto: 'OPC UA · PROFINET', tool: 'TIA Portal', ext: 'ap19' },
    Rockwell: { model: 'ControlLogix 5580 (1756-L83E)', order: '1756-L83E/B', fw: 'v33.011', latest: 'v36.011', proto: 'EtherNet/IP · OPC UA', tool: 'Studio 5000', ext: 'ACD' },
    Schneider: { model: 'Modicon M580 (BMEP582040)', order: 'BMEP582040', fw: 'SV3.20', latest: 'SV4.20', proto: 'Modbus TCP · OPC UA', tool: 'Control Expert', ext: 'STU' },
    Beckhoff: { model: 'CX5340 · TwinCAT 3', order: 'CX5340-0175', fw: '3.1.4024', latest: '3.1.4026', proto: 'EtherCAT · OPC UA', tool: 'TwinCAT XAE', ext: 'tszip' },
    Mitsubishi: { model: 'MELSEC iQ-R R08CPU', order: 'R08CPU', fw: '58', latest: '72', proto: 'CC-Link IE · SLMP', tool: 'GX Works3', ext: 'gx3' }
  };

  /* ---------------------------------------------------------------- Máquinas */
  /* [código, planta, línea, tipo, fabricante PLC, salud, vida útil restante (días | null), criticidad] */
  const RAW = [
    ['VCZ-L3-ESP-01', 'valdecierzo', 'Línea 3', 'Congelador espiral', 'Siemens', 58, 9, 'A'],
    ['VCZ-L3-HOR-01', 'valdecierzo', 'Línea 3', 'Horno túnel', 'Siemens', 91, null, 'A'],
    ['VCZ-L3-AMA-02', 'valdecierzo', 'Línea 3', 'Amasadora continua', 'Siemens', 87, null, 'B'],
    ['VCZ-L1-ENV-01', 'valdecierzo', 'Línea 1', 'Envasadora flow-pack', 'Siemens', 79, 41, 'B'],
    ['ROB-SV-CAL-01', 'robledal', 'Servicios', 'Caldera de biomasa', 'Siemens', 84, null, 'A'],
    ['ROB-SV-AIR-02', 'robledal', 'Servicios', 'Compresor de aire', 'Siemens', 66, 22, 'B'],
    ['ROB-L2-HOR-02', 'robledal', 'Línea 2', 'Horno túnel', 'Siemens', 88, null, 'A'],
    ['MTB-L1-LAM-01', 'montalbar', 'Línea 1', 'Laminadora', 'Schneider', 82, null, 'A'],
    ['MTB-L2-FER-01', 'montalbar', 'Línea 2', 'Cámara de fermentación', 'Schneider', 73, 35, 'B'],
    ['RIB-L4-ESP-01', 'ribera', 'Línea 4', 'Congelador espiral', 'Siemens', 89, null, 'A'],
    ['RIB-L6-AMA-01', 'ribera', 'Línea 6', 'Amasadora brioche', 'Siemens', 94, null, 'B'],
    ['RIB-SV-FRI-01', 'ribera', 'Servicios', 'Central frigorífica NH₃/CO₂', 'Siemens', 76, 48, 'A'],
    ['PSU-SV-FRI-01', 'puertosur', 'Servicios', 'Central frigorífica CO₂', 'Schneider', 81, null, 'A'],
    ['PSU-L1-PAL-01', 'puertosur', 'Línea 1', 'Robot paletizador', 'Schneider', 69, 27, 'C'],
    ['STA-L1-LAM-01', 'saintaubin', 'Línea 1', 'Laminadora', 'Beckhoff', 71, 19, 'A'],
    ['STA-L1-FOR-01', 'saintaubin', 'Línea 1', 'Formadora de croissant', 'Beckhoff', 86, null, 'B'],
    ['NWL-L2-FRD-01', 'nowawola', 'Línea 2', 'Freidora continua de rosquillas', 'Siemens', 77, 33, 'A'],
    ['NWL-L2-GLA-01', 'nowawola', 'Línea 2', 'Glaseadora', 'Siemens', 92, null, 'C'],
    ['NWL-L5-ESP-02', 'nowawola', 'Línea 5', 'Congelador espiral', 'Siemens', 93, null, 'A'],
    ['CVD-L2-HOR-01', 'colverde', 'Línea 2', 'Horno de pisos', 'Siemens', 80, null, 'B'],
    ['ESF-L1-AMA-01', 'eschenfeld', 'Línea 1', 'Amasadora espiral', 'Schneider', 74, 44, 'B'],
    ['PNW-L2-ESP-01', 'pinewood', 'Línea 2', 'Congelador espiral', 'Rockwell', 72, 26, 'A'],
    ['PNW-L1-FOR-01', 'pinewood', 'Línea 1', 'Formadora de trenzas', 'Rockwell', 83, null, 'A'],
    ['RDF-L3-HOR-01', 'redfield', 'Línea 3', 'Horno túnel', 'Rockwell', 78, null, 'A'],
    ['VAZ-L1-FER-01', 'valleazul', 'Línea 1', 'Cámara de fermentación', 'Rockwell', 85, null, 'B'],
    ['VAZ-L2-ENV-02', 'valleazul', 'Línea 2', 'Envasadora flow-pack', 'Rockwell', 68, 17, 'B'],
    ['BNL-L2-ESP-01', 'binhlac', 'Línea 2', 'Congelador espiral', 'Mitsubishi', 67, 14, 'A'],
    ['BNL-L1-LAM-01', 'binhlac', 'Línea 1', 'Laminadora', 'Mitsubishi', 79, null, 'A'],
    ['BNL-SV-AIR-01', 'binhlac', 'Servicios', 'Compresor de aire', 'Mitsubishi', 88, null, 'C']
  ];
  const MACHINES = RAW.map((r, i) => {
    const [id, pid, line, type, vendor, health, rul, crit] = r;
    const fam = PLC[vendor];
    const p = plant(pid);
    const old = i % 3 !== 1;
    return {
      id, plant: pid, line, type, vendor, health, rul, crit,
      status: health < 65 ? 'crit' : health < 80 ? 'warn' : 'ok',
      plc: {
        tag: 'PLC-' + id,
        model: fam.model, order: fam.order, proto: fam.proto, tool: fam.tool,
        fw: old ? fam.fw : fam.latest, latest: fam.latest, outdated: old,
        serial: `${vendor.slice(0, 2).toUpperCase()}-${String(402117 + i * 7919).slice(0, 6)}`,
        ip: `10.${20 + PLANTS.indexOf(p)}.${10 + (i % 6)}.${21 + (i % 40)}`,
        vlan: `OT-${100 + PLANTS.indexOf(p)}`,
        mac: `00:1B:1B:${(16 + i).toString(16).toUpperCase()}:4A:${(40 + i * 3).toString(16).toUpperCase()}`,
        program: `${id.split('-').slice(1).join('_')}_v${3 + (i % 4)}.${(i * 3) % 10}.${fam.ext}`,
        backup: i === 14 ? '2026-08-02T23:10:00' : `2026-11-${String(25 - (i % 5)).padStart(2, '0')}T0${1 + (i % 5)}:${String((i * 13) % 60).padStart(2, '0')}:00`,
        cycle: 6 + (i % 9),
        cpu: 28 + ((i * 11) % 47),
        io: `${64 + (i % 5) * 32} DI · ${32 + (i % 4) * 16} DO · ${8 + (i % 3) * 8} AI · ${4 + (i % 3) * 4} AO`,
        installed: `20${15 + (i % 10)}-0${1 + (i % 8)}`
      }
    };
  });
  const machine = (id) => MACHINES.find((m) => m.id === id);

  /* ---------------------------------------------------------------- Variables por tipo */
  /* [nombre canónico, descripción, unidad, valor, aviso, crítico, dirección nativa Siemens, decimales] */
  const T = {
    spiral: [
      ['drive.motor.vibration_rms', 'Vibración del motor de arrastre', 'mm/s', 4.1, 4.5, 7.1, 'DB120.DBD0', 2],
      ['drive.motor.current', 'Intensidad del motor de arrastre', 'A', 18.6, 22, 25, 'DB120.DBD4', 1],
      ['drive.motor.temperature', 'Temperatura del rodamiento', '°C', 54, 70, 85, 'DB120.DBD8', 1],
      ['belt.speed_setpoint', 'Consigna de velocidad de banda', '%', 100, null, null, 'DB121.DBD0', 0],
      ['belt.tension', 'Tensión de banda', 'N', 1420, 1700, 1950, 'DB121.DBD4', 0],
      ['room.air_temperature', 'Temperatura de aire del túnel', '°C', -34.2, -30, -27, 'DB122.DBD0', 1],
      ['product.core_temperature', 'Temperatura de salida del producto', '°C', -19.4, -18, -16, 'DB122.DBD4', 1],
      ['evaporator.fan_power', 'Potencia de ventiladores', 'kW', 61.8, 70, 78, 'DB123.DBD0', 1],
      ['machine.state', 'Estado de la máquina', '', 'MARCHA', null, null, 'DB100.DBW0', 0],
      ['safety.chain_ok', 'Cadena de seguridad (solo lectura)', '', 'OK', null, null, 'F-DB.status', 0]
    ],
    oven: [
      ['zone1.temperature', 'Temperatura zona 1', '°C', 232, 245, 255, 'DB200.DBD0', 0],
      ['zone2.temperature', 'Temperatura zona 2', '°C', 221, 235, 248, 'DB200.DBD4', 0],
      ['zone3.temperature', 'Temperatura zona 3', '°C', 214, 228, 240, 'DB200.DBD8', 0],
      ['belt.bake_time', 'Tiempo de cocción', 'min', 17.5, 20, 22, 'DB201.DBD0', 1],
      ['burner.gas_flow', 'Caudal de gas', 'm³/h', 86, 98, 110, 'DB202.DBD0', 1],
      ['exhaust.fan_vibration', 'Vibración del extractor', 'mm/s', 2.2, 4.5, 7.1, 'DB203.DBD0', 2],
      ['machine.state', 'Estado de la máquina', '', 'MARCHA', null, null, 'DB100.DBW0', 0],
      ['safety.chain_ok', 'Cadena de seguridad (solo lectura)', '', 'OK', null, null, 'F-DB.status', 0]
    ],
    generic: [
      ['drive.motor.vibration_rms', 'Vibración del motor principal', 'mm/s', 2.6, 4.5, 7.1, 'DB10.DBD0', 2],
      ['drive.motor.current', 'Intensidad del motor principal', 'A', 12.4, 17, 20, 'DB10.DBD4', 1],
      ['drive.motor.temperature', 'Temperatura del motor', '°C', 48, 70, 85, 'DB10.DBD8', 1],
      ['process.speed_setpoint', 'Consigna de velocidad', '%', 100, null, null, 'DB11.DBD0', 0],
      ['process.cycle_count', 'Ciclos del turno', 'ciclos', 8412, null, null, 'DB12.DBD0', 0],
      ['energy.active_power', 'Potencia activa', 'kW', 23.9, 32, 38, 'DB13.DBD0', 1],
      ['machine.state', 'Estado de la máquina', '', 'MARCHA', null, null, 'DB100.DBW0', 0],
      ['safety.chain_ok', 'Cadena de seguridad (solo lectura)', '', 'OK', null, null, 'F-DB.status', 0]
    ]
  };
  function nativeAddr(vendor, siemens, name, i) {
    if (vendor === 'Siemens') return siemens;
    if (vendor === 'Rockwell') return name.split('.').map((s) => s.replace(/(^|_)(\w)/g, (a, b, c) => c.toUpperCase())).join('.');
    if (vendor === 'Schneider') return `%MW${4000 + i * 2}`;
    if (vendor === 'Beckhoff') return `GVL.${name.replace(/\./g, '_')}`;
    return `D${5000 + i * 2}`;
  }
  function tagsFor(m) {
    const base = m.type.startsWith('Congelador') ? T.spiral : /Horno/.test(m.type) ? T.oven : T.generic;
    return base.map((t, i) => {
      const [name, desc, unit, v, warn, crit, addr, dec] = t;
      let value = v;
      if (typeof v === 'number' && name.indexOf('setpoint') < 0) {
        const k = 1 + (((m.id.charCodeAt(0) + m.id.charCodeAt(4) + i * 7) % 11) - 5) / 140;
        value = v * k;
        if (name === 'drive.motor.vibration_rms' && m.health < 80) value = m.health < 65 ? 6.4 : 5.1;
      }
      if (m.id === 'VCZ-L3-ESP-01') {
        if (name === 'drive.motor.vibration_rms') value = 7.62;
        if (name === 'drive.motor.current') value = 22.9;
        if (name === 'drive.motor.temperature') value = 73.4;
        if (name === 'belt.tension') value = 1738;
      }
      return { name, desc, unit, value, warn, crit, dec, addr: nativeAddr(m.vendor, addr, name, i), rate: unit === '' ? 'al cambiar' : /temperature/.test(name) ? '5 s' : '1 s' };
    });
  }

  /* Serie de vibración VCZ-L3-ESP-01, últimas 14 días (media diaria) y últimas 3 h */
  const VIB_14D = [['13/11', 3.1], ['14/11', 3.0], ['15/11', 3.2], ['16/11', 3.3], ['17/11', 3.2], ['18/11', 3.5], ['19/11', 3.7], ['20/11', 3.9], ['21/11', 4.2], ['22/11', 4.4], ['23/11', 4.9], ['24/11', 5.5], ['25/11', 6.3], ['26/11', 7.6]].map(([time, value]) => ({ time, value }));
  const VIB_3H = [5.9, 6.0, 6.1, 6.0, 6.3, 6.4, 6.4, 6.6, 6.9, 6.8, 7.0, 7.2, 7.1, 7.3, 7.4, 7.3, 7.5, 7.6, 7.62].map((value, i) => {
    const mm = 4 * 60 + i * 10;
    return { time: `${String(Math.floor(mm / 60)).padStart(2, '0')}:${String(mm % 60).padStart(2, '0')}`, value };
  });
  function trendFor(m) {
    if (m.id === 'VCZ-L3-ESP-01') return VIB_14D;
    const end = m.health < 65 ? 6.4 : m.health < 80 ? 5.0 : 2.5;
    const start = m.health < 80 ? end - 1.8 : end - 0.2;
    return VIB_14D.map((d, i) => ({ time: d.time, value: Math.round((start + (end - start) * Math.pow(i / 13, m.health < 80 ? 1.8 : 1) + Math.sin(i * 2.1 + m.health) * 0.12) * 100) / 100 }));
  }

  /* ---------------------------------------------------------------- Novedades de la noche (follow the sun) */
  const EVENTS = [
    { time: '05:50', plant: 'valdecierzo', machine: 'VCZ-L3-ESP-01', tone: 'crit', title: 'Vibración del motor de la espiral por encima de 7,1 mm/s', text: 'El agente de diagnóstico propone un plan y espera aprobación.', go: 'incidente' },
    { time: '05:12', plant: 'binhlac', machine: 'BNL-L2-ESP-01', tone: 'warn', title: 'Descongelación fuera de ciclo en la espiral de la línea 2', text: '3 paradas cortas en el turno de mañana local. Revisión propuesta para el sábado 05/12.', go: 'maquina/BNL-L2-ESP-01' },
    { time: '03:55', plant: 'valleazul', machine: 'VAZ-L2-ENV-02', tone: 'warn', title: 'Atascos repetidos en la envasadora', text: 'El patrón coincide con desgaste de mordazas de sellado. Vida útil estimada: 17 días.', go: 'maquina/VAZ-L2-ENV-02' },
    { time: '02:20', plant: 'pinewood', machine: 'PNW-L1-FOR-01', tone: 'ok', title: 'Cambio de programa detectado y verificado', text: 'Coincide con la orden aprobada CAM-2026-0391. Copia guardada en el repositorio.', go: 'maquina/PNW-L1-FOR-01' },
    { time: '01:08', plant: 'saintaubin', machine: 'STA-L1-LAM-01', tone: 'warn', title: 'Copia del programa del PLC caducada (116 días)', text: 'No se puede garantizar la recuperación ante fallo. Se pide copia en la próxima parada.', go: 'maquina/STA-L1-LAM-01' },
    { time: '00:30', plant: 'redfield', machine: null, tone: 'brand', title: 'Alta de planta en curso: 71 de 117 PLC descubiertos', text: 'Descubrimiento en modo lectura. Quedan variables por validar.', go: 'datos' },
    { time: 'ayer', plant: 'binhlac', machine: 'BNL-L2-ESP-01', tone: 'warn', title: 'Reclamación de cliente: croissants pegados con hielo', text: 'El acuse vence hoy. Pendiente de análisis.', go: 'reclamacion' }
  ];

  /* ---------------------------------------------------------------- Mantenimiento: decisiones pendientes */
  /* hNo: horas de parada si no se actúa · hPlan: horas si se planifica · cph: coste por hora (€) · prob: probabilidad en 30 días */
  const BACKLOG = [
    { id: 'DEC-2601', machine: 'VCZ-L3-ESP-01', what: 'Cambiar rodamiento lado accionamiento y alinear', prob: 0.86, hNo: 30, hPlan: 5, cph: 6200, part: 'Rodamiento 22218 + sellos', stock: 'En La Ribera (2 ud)', window: 'Vie 27/11 22:00 · limpieza', now: 'Reactivo' },
    { id: 'DEC-2602', machine: 'BNL-L2-ESP-01', what: 'Revisar válvula de desescarche y sonda', prob: 0.64, hNo: 18, hPlan: 4, cph: 2900, part: 'Electroválvula DN32', stock: 'Plazo 9 días', window: 'Sáb 05/12 · parada semanal', now: 'Sin planificar' },
    { id: 'DEC-2603', machine: 'VAZ-L2-ENV-02', what: 'Sustituir mordazas de sellado', prob: 0.71, hNo: 9, hPlan: 2, cph: 2100, part: 'Kit mordazas 320 mm', stock: 'En planta (1 ud)', window: 'Dom 29/11 · cambio de formato', now: 'Preventivo en 6 semanas' },
    { id: 'DEC-2604', machine: 'STA-L1-LAM-01', what: 'Copia del programa y cambio de reductor', prob: 0.48, hNo: 22, hPlan: 6, cph: 4300, part: 'Reductor eje 2', stock: 'Plazo 12 días', window: 'Sáb 12/12 · parada', now: 'Sin planificar' },
    { id: 'DEC-2605', machine: 'ROB-SV-AIR-02', what: 'Cambiar separador y revisar válvula de admisión', prob: 0.42, hNo: 6, hPlan: 2, cph: 3500, part: 'Kit separador', stock: 'En planta', window: 'Mié 02/12 · compresor de reserva', now: 'Preventivo por horas' },
    { id: 'DEC-2606', machine: 'PNW-L2-ESP-01', what: 'Retensar banda y sustituir 3 rodillos', prob: 0.39, hNo: 14, hPlan: 4, cph: 3800, part: 'Rodillos de apoyo', stock: 'En planta', window: 'Dom 06/12 (hora local)', now: 'Sin planificar' },
    { id: 'DEC-2607', machine: 'PSU-L1-PAL-01', what: 'Reemplazar cableado del eje 4', prob: 0.33, hNo: 7, hPlan: 3, cph: 1400, part: 'Mazo eje 4', stock: 'Plazo 5 días', window: 'Sáb 05/12', now: 'Reactivo' },
    { id: 'DEC-2608', machine: 'NWL-L2-FRD-01', what: 'Limpieza de intercambiador y cambio de bomba de aceite', prob: 0.28, hNo: 12, hPlan: 5, cph: 5100, part: 'Bomba de recirculación', stock: 'En planta', window: 'Vie 18/12 · parada mensual', now: 'Preventivo por calendario' }
  ];

  const AGENTS = [
    { id: 'orq', name: 'Orquestador', icon: 'workflow', does: 'Reparte el trabajo entre agentes, aplica la política de autonomía y pide aprobación a quien corresponde.', reads: ['Registro de activos', 'Plan de producción'], runs: 412 },
    { id: 'vig', name: 'Vigilancia de señales', icon: 'activity', does: 'Compara cada variable con su comportamiento habitual y con las máquinas gemelas de otras plantas.', reads: ['Histórico de series'], runs: 38200 },
    { id: 'dia', name: 'Diagnóstico', icon: 'search', does: 'Cruza alarmas, histórico, manuales y averías anteriores para proponer causa probable con su evidencia.', reads: ['Histórico de series', 'Manuales', 'SAP PM'], runs: 57 },
    { id: 'pla', name: 'Planificación', icon: 'calendar', does: 'Encaja las intervenciones en las ventanas de limpieza y cambio de formato sin romper el plan.', reads: ['Plan de producción', 'MES', 'SAP PM'], runs: 31 },
    { id: 'rep', name: 'Repuestos', icon: 'warehouse', does: 'Localiza stock en cualquier planta, reserva y calcula plazos.', reads: ['Almacén de repuestos', 'SAP PM'], runs: 24 },
    { id: 'cib', name: 'Ciberseguridad OT', icon: 'shield', does: 'Vigila firmware, cambios de programa no autorizados, accesos y copias caducadas.', reads: ['Registro de activos', 'Repositorio de programas'], runs: 1884 },
    { id: 'ene', name: 'Energía', icon: 'leaf', does: 'Detecta consumo anómalo por tonelada en frío, hornos y aire comprimido.', reads: ['Histórico de series', 'MES'], runs: 288 },
    { id: 'doc', name: 'Conocimiento', icon: 'book-open', does: 'Responde con cita a manuales y procedimientos en el idioma de la planta.', reads: ['Manuales'], runs: 146 }
  ];

  /* Texto en el idioma activo, para lo que se dibuja o se copia antes de que lo traduzca la página (gráficos, grafos, portapapeles). */
  const tr = (s) => (window.CN_I18N ? window.CN_I18N.text(s) : s);

  return { T: tr, PLANTS, plant, PLC, MACHINES, machine, tagsFor, trendFor, VIB_14D, VIB_3H, EVENTS, BACKLOG, AGENTS };
})();
