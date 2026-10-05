/* Empresa de Congelados · reclamación UKC-44718 (piedra en guisante de marca blanca, vía EC Foods UK Ltd).
 * Escenario de la demo de referencia con datos sintéticos (MFM). */
agenticPack('congelados', {
  reclamacion: {
    code: 'UKC-44718',
    nav: 'Reclamación UKC-44718',
    title: 'Reclamación UKC-44718',
    agent: 'Reclamaciones de cliente',
    analyze_label: 'Analizar reclamación',
    nc: 'NC-2026-0419',
    form: { code: 'REG-CAL-020-02', rev: '3' },
    received: { date: '2026-09-26', time: '10:14' },
    due: '2026-10-02',
    holidays: [],
    customer_line: 'EC Foods UK Ltd (filial EC, Reino Unido) · Retailer UK (marca blanca)',
    due_line: 'Informe antes del 02/10/2026',
    cust_name: 'Quality Assurance, EC Foods UK Ltd',
    cust_addr: 'qa.team@ec-foods-uk.example',
    own_name: 'Calidad, Empresa de Congelados',
    own_addr: 'calidad@ec-demo.example',
    mail_domain: 'ec-demo.example',
    mail_sub: 'qa.team@ec-foods-uk.example · buzón calidad@ec-demo.example · inglés',
    mail_title: 'Correo del cliente',
    mail_tab_label: 'Correo (inglés)',
    attachments: ['UKC-44718_photo_1.jpg', 'UKC-44718_photo_2.jpg'],
    email_text: [
      'From: Quality Assurance, EC Foods UK Ltd <qa.team@ec-foods-uk.example>',
      'To: Calidad, Empresa de Congelados <calidad@ec-demo.example>',
      'Date: Sat, 26 Sep 2026 09:14 (UK time)',
      'Subject: Customer complaint - foreign body (stone) - Garden Peas 1kg - Lot L26-231-FUS-GUI-01 - Ref UKC-44718',
      '',
      'Dear Quality Team,',
      '',
      'We have received a consumer complaint through our UK retail customer (own-label frozen range) about the product below, and we need your support to investigate it as a priority.',
      '',
      'Product: Garden Peas 1kg (retailer own label)',
      'Lot code: L26-231-FUS-GUI-01',
      'Best before: 08/2028',
      'Consumer reference: UKC-44718',
      'Complaint received by the retailer: 24/09/2026',
      '',
      'The consumer reports finding a small, hard foreign body, which appears to be a stone of approximately 8 mm, while serving the product. No injury has been reported. The consumer has kept the item and the retailer has shared two photographs (attached). The physical sample is on its way to our UK office and we will forward it to you as soon as we receive it.',
      '',
      'As this is a physical contamination complaint on a retailer own-label product, our customer requests a full investigation report within 5 working days, including:',
      '- traceability of the lot (raw material, harvest, intake and processing line);',
      '- the stone-removal and foreign-body controls on the line (destoner, optical sorting) and their records for the production date;',
      '- root cause, corrective and preventive actions;',
      '- confirmation of whether any other stock from the same lot is affected.',
      '',
      'Please confirm receipt and let us know your investigation reference.',
      '',
      'Kind regards,',
      '',
      'Quality Assurance Team',
      'EC Foods UK Ltd'
    ].join('\n'),
    mail_extra: {
      label: 'Traducción al español',
      note: 'Traducción de control para la revisión; el original en inglés es el que vale.',
      headers: { From: 'Agentic Platform · traducción de control del correo de qa.team@ec-foods-uk.example', Date: 'sáb, 26 sep 2026 10:14', Subject: 'Reclamación de cliente · cuerpo extraño (piedra) · Garden Peas 1kg · lote L26-231-FUS-GUI-01 · ref. UKC-44718' },
      text: [
        'Estimado equipo de Calidad:',
        '',
        'Hemos recibido una reclamación de un consumidor a través de nuestro cliente minorista del Reino Unido (gama de congelados de marca propia) sobre el producto indicado abajo, y necesitamos vuestro apoyo para investigarla con prioridad.',
        '',
        'Producto: Garden Peas 1kg (marca propia del minorista)',
        'Código de lote: L26-231-FUS-GUI-01',
        'Consumo preferente: 08/2028',
        'Referencia del consumidor: UKC-44718',
        'Reclamación recibida por el minorista: 24/09/2026',
        '',
        'El consumidor indica que, al servir el producto, encontró un cuerpo extraño pequeño y duro que parece una piedra de unos 8 mm. No se han comunicado lesiones. El consumidor conserva el objeto y el minorista ha compartido dos fotografías (adjuntas). La muestra física está de camino a nuestra oficina del Reino Unido y os la enviaremos en cuanto la recibamos.',
        '',
        'Al tratarse de una reclamación por contaminación física en un producto de marca propia del minorista, nuestro cliente pide un informe de investigación completo en un plazo de 5 días hábiles, que incluya:',
        '- la trazabilidad del lote (materia prima, cosecha, recepción y línea de proceso);',
        '- los controles de eliminación de piedras y de cuerpos extraños de la línea (despedregadora, selección óptica) y sus registros de la fecha de producción;',
        '- la causa raíz y las acciones correctivas y preventivas;',
        '- la confirmación de si hay otro stock del mismo lote afectado.',
        '',
        'Os pedimos que confirméis la recepción y nos indiquéis vuestra referencia de investigación.',
        '',
        'Un saludo,',
        '',
        'Equipo de Quality Assurance',
        'EC Foods UK Ltd'
      ].join('\n'),
      highlights: [
        { text: 'una piedra de unos 8 mm', label: 'Defecto', tone: 'crit' },
        { text: 'No se han comunicado lesiones.', label: 'Sin lesiones', tone: 'ok' },
        { text: 'en un plazo de 5 días hábiles', label: 'Plazo', tone: 'warn' }
      ]
    },
    highlights: [
      { text: 'Garden Peas 1kg', label: 'Producto', tone: 'brand' },
      { text: 'L26-231-FUS-GUI-01', label: 'Lote', tone: 'brand' },
      { text: '08/2028', label: 'Consumo pref.', tone: 'brand' },
      { text: 'UKC-44718', label: 'Ref.' },
      { text: 'stone of approximately 8 mm', label: 'Defecto', tone: 'crit' },
      { text: 'No injury has been reported', label: 'Sin lesiones', tone: 'ok' },
      { text: 'two photographs (attached)', label: 'Evidencia' },
      { text: 'The physical sample is on its way', label: 'Muestra' },
      { text: 'within 5 working days', label: 'Plazo' }
    ],
    run: {
      title: 'Workflow «Reclamación de cliente»',
      sub: 'Se lanza al entrar una reclamación en el buzón de Calidad · PNT-CAL-020',
      graph_title: 'Workflow de reclamación de cliente',
      idle_footer: 'Lee el correo, extrae y valida los datos, traza el lote y prepara el 8D y la respuesta. Nada sale sin la aprobación de Calidad.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Correo de cliente', sub: 'Buzón de Calidad', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extracción y validación', systems: ['Modelo de lenguaje', 'SAP'], icon: 'search' },
        { id: 'traza', label: 'Traza del lote', systems: ['SAP', 'MES Mapex', 'Easy WMS', 'GMAO'], icon: 'git-branch' },
        { id: 'historico', label: 'Histórico, 8D y respuesta', systems: ['Elara', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Aprobación de Calidad', sub: 'Responsable de Calidad de turno' },
        { id: 'salida', kind: 'output', label: 'Respuesta y contención', systems: ['Outlook', 'SAP QM', 'Elara'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'aprobado' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Palés del lote · 20 expedidos y 2 en SIL-3', value: 22 },
        { label: 'Orden abierta en DP-2 · 42 días', value: 'OT-26-07415', tone: 'warn' },
        { label: 'Reclamación parecida · RCL-2025-0311', value: 1, tone: 'warn' },
        { label: 'Días hábiles para el informe · vence el 02/10/2026', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Lee el correo de qa.team@ec-foods-uk.example en el buzón calidad@ec-demo.example (26/09/2026 10:14)', result: 'Reclamación de cliente en inglés · 2 fotos adjuntas', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extrae los datos de la reclamación', result: 'Lote L26-231-FUS-GUI-01 · Garden Peas 1kg · piedra de unos 8 mm · sin lesiones · ref. UKC-44718 · informe en 5 días hábiles', ms: 2900 },
      { system: 'SAP', action: 'Valida el lote y el producto extraídos', result: 'El lote existe: Guisante 1 kg (Garden Peas 1kg), SKU UK-GUI-1000, consumo preferente 08/2028. Coincide con el correo', ms: 410, tone: 'ok' },
      { system: 'SAP', action: 'Origen de la materia prima', result: 'AGR-0412 (Ribaforada) · parcelas P-0412-07 y P-0412-09 · cosecha del 19/08/2026', ms: 380 },
      { system: 'SAP', action: 'Recepción REC-26-18233', result: '19/08/2026 10:42 · 24,6 t · tenderómetro 108 TR · muestra de 2 kg sin piedras', ms: 350 },
      { system: 'MES Mapex', action: 'Ruta y controles de proceso del 19/08/2026', result: 'Línea L2, turno de mañana: LIM-2, DP-2, ESC-2, TUN-2, OPT-2 y ENV-4 · OPT-2 rechazó el 1,6 % (referencia 1,5 %)', ms: 520 },
      { system: 'GMAO', action: 'Busca órdenes abiertas en los equipos de la ruta', result: 'OT-26-07415 · DP-2: desgaste de la malla anotado en la inspección semanal (18/08/2026) · abierta, pendiente de repuesto', ms: 430, tone: 'warn' },
      { system: 'Mecalux Easy WMS', action: 'Localiza los palés del lote', result: '22 palés · 17.600 kg: 20 expedidos y 2 en SIL-3', ms: 460 },
      { system: 'SAP', action: 'Expediciones del lote', result: 'EXP-26-40911 (12 palés, 25/08) y EXP-26-40957 (8 palés, 28/08) a EC Foods UK Ltd · registro de temperatura conforme', ms: 390 },
      { system: 'Elara', action: 'Busca reclamaciones parecidas en los últimos 12 meses', result: '4 reclamaciones con NC · 1 parecida: RCL-2025-0311 (piedra de unos 6 mm en espinaca en porciones)', ms: 540, tone: 'warn' },
      { system: 'Procedimientos', action: 'Consulta PNT-CAL-020, PNT-CAL-031 e IT-MAN-DP-02', result: 'Informe 8D en 5 días hábiles: antes del 02/10/2026 · IT-MAN-DP-02 pide inspección reforzada de la malla hasta sustituirla', ms: 380 },
      { system: 'Modelo de lenguaje', action: 'Redacta el borrador 8D (D1–D8) con responsables por rol y fechas', result: 'Borrador completo · la relación con DP-2 queda como hipótesis por confirmar', ms: 5200 },
      { system: 'Elara', action: 'Registra la no conformidad y la vincula a la reclamación', result: 'NC-2026-0419 abierta en borrador · vinculada a UKC-44718', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Redacta la respuesta en inglés y su traducción de control', result: 'Borrador listo: acuse de recibo, referencia NC-2026-0419, contención y fecha del informe · pendiente de aprobación', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'L26-231-FUS-GUI-01',
      noun: 'lote',
      label: 'Código de lote',
      fix_title: 'el lote de la reclamación',
      systems: 'SAP/Mapex',
      systems_short: 'SAP/Mapex',
      fix_text: 'Si el cliente ha copiado mal el código, escribe el lote correcto. Agentic Platform lo busca en SAP/Mapex y comprueba que corresponde al producto reclamado antes de cambiar nada.',
      same_body: 'Existe en SAP/Mapex y corresponde a Guisante 1 kg (Garden Peas 1kg) (SKU UK-GUI-1000). Sin cambios.',
      unknown_hint: 'Si el código del cliente es dudoso, pide una foto de la etiqueta del envase.',
      mismatch_body: 'Existe en SAP, pero no es Garden Peas 1kg (SKU UK-GUI-1000), el producto reclamado: no se cambia la ficha.',
      known: {
        'L26-261-FUS-GUI-03': { kind: 'mismatch', title: 'El lote L26-261-FUS-GUI-03 no corresponde a esta reclamación', body: 'Existe en SAP, pero es Guisante fino 1 kg (SKU VL-GUI-1000), fabricado el 18/09/2026 en Línea L4 (reenvasado desde granel). La reclamación es de Garden Peas 1kg (SKU UK-GUI-1000): no se cambia la ficha.' },
        'L26-262-FUS-MIX-02': { kind: 'mismatch', title: 'El lote L26-262-FUS-MIX-02 no corresponde a esta reclamación', body: 'Existe en SAP, pero es Salteado de verduras a la plancha 600 g (SKU UK-MIX-600), fabricado el 19/09/2026 en Línea L5 (mezclas). La reclamación es de Garden Peas 1kg (SKU UK-GUI-1000): no se cambia la ficha.' },
        'L25-310-ALF-ESP-02': { kind: 'mismatch', title: 'L25-310-ALF-ESP-02 es el lote de la reclamación RCL-2025-0311, no el de esta', body: 'Es Espinaca en porciones 1 kg de la planta de Alfaro, de la reclamación cerrada RCL-2025-0311 (piedra de unos 6 mm). Se cita en el histórico como caso parecido, pero no es el lote reclamado. No se cambia la ficha.' }
      }
    },
    sheet: {
      sub: 'Datos extraídos del correo y comprobados en SAP y Elara',
      empty_text: 'Agentic Platform extraerá del correo el lote, el producto, el defecto, la referencia y el plazo, y los comprobará en SAP antes de preparar el 8D y la respuesta.',
      rows: [
        { k: 'Referencia', v: 'UKC-44718', code: true, sub: 'Referencia del consumidor en el retailer' },
        { k: 'Cliente', v: 'EC Foods UK Ltd (filial EC, Reino Unido)', sub: 'CLI-FWF-UK · cliente final: Retailer UK (marca blanca)' },
        { k: 'Producto', v: 'Guisante 1 kg (Garden Peas 1kg)', ok: 'SKU UK-GUI-1000 · coincide con el lote en SAP' },
        { k: 'Lote', lot: true, ok: 'Existe en SAP/Mapex · fabricado el 19/08/2026 en Línea L2' },
        { k: 'Consumo preferente', v: '08/2028', ok: 'Coincide con SAP' },
        { k: 'Defecto', v: 'Cuerpo extraño: piedra de unos 8 mm', sub: 'Peligro físico: objeto duro de 7 mm o más' },
        { k: 'Lesiones', v: 'No', sub: '«No injury has been reported»' },
        { k: 'Evidencias', v: '2 fotos adjuntas · muestra física en camino' },
        { k: 'Fechas', v: 'Retailer: 24/09/2026 · Calidad: 26/09/2026 10:14' },
        { k: 'Plazo', v: 'Informe antes del 02/10/2026', due: true, sub: '5 días hábiles desde la recepción · PNT-CAL-020' },
        { k: 'Registro', v: 'NC-2026-0419', code: true, sub: 'No conformidad en Elara, vinculada a la reclamación' }
      ]
    },
    requests: {
      title: 'Lo que pide el cliente',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Acuse de recibo y referencia de investigación', meta: ['Respuesta al cliente · NC-2026-0419'], quote: 'Please confirm receipt and let us know your investigation reference', side: { pending: { status: 'waiting', label: 'Pendiente de aprobación' }, approved: { status: 'sent', label: 'Enviado' }, rejected: { status: 'rejected', label: 'No enviado' } } },
        { icon: 'check-circle', tone: 'ok', title: 'Trazabilidad del lote: materia prima, cosecha, recepción y línea', meta: ['D2 y anexo A del 8D'], quote: 'traceability of the lot (raw material, harvest, intake and processing line)', side: { status: 'ok', label: 'Reunida' } },
        { icon: 'clock', tone: 'warn', title: 'Controles de despedregado y cuerpos extraños, con sus registros del 19/08/2026', meta: ['D4 · DP-2, OPT-2 y OT-26-07415'], quote: 'the stone-removal and foreign-body controls on the line (destoner, optical sorting) and their records for the production date', side: { status: 'review', label: 'Falta valorarlos' } },
        { icon: 'clock', tone: 'warn', title: 'Causa raíz y acciones correctivas y preventivas', meta: ['D4, D5 y D7 del 8D'], quote: 'root cause, corrective and preventive actions', side: { status: 'review', label: 'Hipótesis' } },
        { icon: 'check-circle', tone: 'ok', title: '¿Hay más stock afectado del mismo lote?', meta: ['D3 · 20 palés expedidos y 2 en SIL-3'], quote: 'confirmation of whether any other stock from the same lot is affected', side: { pending: { status: 'ok', label: 'Localizado' }, approved: { status: 'hold', label: '2 palés retenidos' }, rejected: { status: 'ok', label: 'Localizado' } } },
        { icon: 'calendar', tone: 'warn', title: 'Informe completo en 5 días hábiles', meta: ['Envío del 8D (D1–D5)'], quote: 'within 5 working days', side: { status: 'pending', label: 'Antes del 02/10' } }
      ]
    },
    trace: {
      title: 'Traza del lote L26-231-FUS-GUI-01',
      sub: 'SAP, MES Mapex, Mecalux Easy WMS y GMAO · hacia atrás y hacia delante',
      button_code: 'L26-231-FUS-GUI-01',
      button_label: 'Traza completa · 22 SSCC',
      back_title: 'Hacia atrás',
      back: [
        { time: '18/08', title: 'Mantenimiento · despedregadora DP-2', text: 'Desgaste de la malla anotado en la inspección semanal; sustitución programada.', tone: 'warn', ref: 'OT-26-07415', chip: { status: 'open', label: 'Abierta, pendiente de repuesto' } },
        { time: '19/08', title: 'Campo · cosecha', text: 'AGR-0412 (Ribaforada, Ribera navarra) · parcelas P-0412-07 y P-0412-09 · guisante', tone: 'brand', ref: 'AGR-0412' },
        { time: '19/08', timeSub: '10:42', title: 'Recepción REC-26-18233', text: '24,6 t · tenderómetro 108 TR (especificación 95–120 TR) · muestra de 2 kg sin piedras ni terrones', tone: 'ok', ref: 'REC-26-18233' },
        { time: '19/08', title: 'Proceso · Línea L2, turno de mañana', route: ['LIM-2', 'DP-2', 'ESC-2', 'TUN-2', 'OPT-2', 'ENV-4'], route_mark: 'DP-2', text: 'Envasado en ENV-4 · 22 palés, 17.600 kg', tone: 'brand' },
        { time: '19/08', title: 'Controles del turno', text: 'OPT-2: rechazo del 1,6 % (referencia 1,5 %) · ENV-4: peso y sellado conformes', tone: 'ok' }
      ],
      fwd_title: 'Hacia delante',
      fwd_cols: { id: 'Destino', qty: 'Palés', when: 'Fecha', status: 'Estado' },
      fwd: [
        { id: 'EXP-26-40911', dest: 'EC Foods UK Ltd', sub: 'Retailer UK (marca blanca)', qty: '12', when: '25/08/2026 16:10', status: { pending: { status: 'shipped', label: 'Expedida' }, approved: { status: 'shipped', label: 'Expedida' }, rejected: { status: 'shipped', label: 'Expedida' } } },
        { id: 'EXP-26-40957', dest: 'EC Foods UK Ltd', sub: 'Retailer UK (marca blanca)', qty: '8', when: '28/08/2026 15:30', status: { pending: { status: 'shipped', label: 'Expedida' }, approved: { status: 'shipped', label: 'Expedida' }, rejected: { status: 'shipped', label: 'Expedida' } } },
        { id: 'SIL-3', dest: 'Silo automático 3 (Fustiñana)', sub: 'SSCC 384123452310100214 y 384123452310100221', qty: '2', when: 'En stock', status: { pending: { status: 'pending', label: 'Retención propuesta' }, approved: { status: 'hold', label: 'Retenido' }, rejected: { status: 'pending', label: 'Retención propuesta' } } }
      ],
      fwd_note: '22 palés · 17.600 kg · camión frigorífico a −25 °C · registro de temperatura conforme en las 2 expediciones.',
      hypothesis: {
        title: 'Hipótesis de causa probable · a confirmar por Calidad',
        icon: 'wrench',
        paras: [
          'La malla de la despedregadora DP-2 tenía desgaste anotado el 18/08/2026 (OT-26-07415, abierta, pendiente de repuesto) y este lote pasó por DP-2 el 19/08/2026, un día después.',
          'Por aclarar: la muestra de recepción de 2 kg salió sin piedras y OPT-2 rechazó el 1,6 % ese turno (referencia 1,5 %). Hoy OPT-2 rechaza el 4,8 % (referencia 1,5 %) y la orden sigue abierta (42 días).',
          'Se confirma con la muestra del cliente, la inspección de la malla y los registros de OPT-2. Hasta entonces no se comunica al cliente.'
        ]
      }
    },
    history: {
      sub: 'Elara · reclamaciones con no conformidad · últimos 12 meses',
      col_id: 'Reclamación',
      col_product: 'Producto y lote',
      col_cause: 'Causa raíz',
      rows: [
        { id: 'RCL-2025-0311', date: '2025-11-14', product: 'Espinaca en porciones 1 kg (Verleal)', lot: 'L25-310-ALF-ESP-02', description: 'Piedra de unos 6 mm en espinaca en porciones', category: 'Cuerpo extraño', customer_label: 'Plataforma logística retail ES', root_cause: 'Malla de la despedregadora de la línea de hoja (planta de Alfaro) con desgaste', nc: 'NC-2025-0388', status: 'cerrada (02/12/2025)', similar: true },
        { id: 'RCL-2026-0204', date: '2026-07-15', product: 'Maíz dulce 450 g', lot: 'L26-160-FUS-MAI-01', description: 'Producto apelmazado (bloques de hielo) en destino', category: 'Calidad', customer_label: 'EC Frozen Foods LLC (filial EC, EE. UU.)', root_cause: 'Rotura de frío en el transporte del cliente', nc: 'NC-2026-0233', status: 'cerrada', similar: false },
        { id: 'RCL-2026-0131', date: '2026-05-07', product: 'Judía verde redonda 1 kg', lot: 'L26-118-FUS-JUD-02', description: 'Hilos en la judía verde por encima de especificación', category: 'Calidad', customer_label: 'Importador Francia', root_cause: 'Ajuste de la despuntadora COR-3', nc: 'NC-2026-0158', status: 'cerrada', similar: false },
        { id: 'RCL-2026-0042', date: '2026-02-20', product: 'Guisante fino 1 kg (Verleal)', lot: 'L26-041-FUS-GUI-02', description: 'Bolsa mal sellada (soldadura abierta)', category: 'Envase', customer_label: 'Plataforma logística retail ES', root_cause: 'Temperatura de mordaza baja en ENV-2', nc: 'NC-2026-0097', status: 'cerrada', similar: false }
      ],
      note: {
        title: 'Mismo tipo de causa que RCL-2025-0311',
        body: 'Piedra de unos 6 mm en espinaca en porciones (14/11/2025): malla de la despedregadora de la línea de hoja (planta de Alfaro) con desgaste; NC-2025-0388 cerrada (02/12/2025). Si se confirma la hipótesis de DP-2, sería la segunda piedra por una malla desgastada en menos de un año: el 8D propone en D7 revisar las mallas de todas las plantas.'
      }
    },
    plan: {
      title: 'Borrador 8D · NC-2026-0419',
      sub: 'PNT-CAL-020 · al cliente antes del 02/10/2026 con D1–D5; D6–D8 en seguimiento',
      col_label: 'Disciplina',
      containment_status: { pending: { text: 'Pendiente de aprobación', tone: 'warn' }, approved: { text: 'Aplicada', tone: 'ok' }, rejected: { text: 'No aplicada', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Equipo', owner: ['Responsable de Calidad de planta'], date: '2026-09-29', status: { text: 'Propuesto', tone: 'draft' }, lead: 'Líder: Responsable de Calidad de planta.', items: ['Responsable de Calidad de turno: investigación y contacto con el cliente', 'Mantenimiento de línea: DP-2 y OPT-2 (línea L2)', 'Jefe de campaña: materia prima de AGR-0412', 'Jefe de turno de expedición: stock en SIL-3 y expediciones'], note: 'Contacto externo: Quality Assurance, EC Foods UK Ltd.' },
        { d: 'D2', title: 'Descripción del problema', owner: ['Responsable de Calidad de turno'], date: '2026-09-29', status: { text: 'Completo', tone: 'ok' }, lead: 'Un consumidor del Reino Unido encontró una piedra de unos 8 mm al servir Garden Peas 1kg (marca blanca de un retailer, vía EC Foods UK Ltd). Sin lesiones.', items: ['Lote L26-231-FUS-GUI-01, consumo preferente 08/2028, fabricado el 19/08/2026 en Línea L2, turno de mañana: 22 palés, 17.600 kg', 'Reclamación en el retailer el 24/09/2026; en Calidad, el 26/09/2026 10:14', 'Peligro físico: objeto duro de 7 mm o más', 'Evidencias: 2 fotos; muestra física en camino'] },
        { d: 'D3', title: 'Contención', owner: ['Responsable de Calidad de turno', 'Mantenimiento de línea'], date: '2026-09-29', containment: true, items: ['Retener los 2 palés del lote en SIL-3 (SSCC 384123452310100214 y 384123452310100221) en SAP QM y Easy WMS. Requiere aprobación (PNT-CAL-015)', 'Pedir a EC Foods UK Ltd el stock que queda de EXP-26-40911 (12 palés) y EXP-26-40957 (8 palés)', 'Inspección reforzada de la malla de DP-2 hasta sustituirla (IT-MAN-DP-02)', 'Revisar en SAP y Mapex los lotes procesados en L2 desde el 18/08/2026, fecha del desgaste anotado'] },
        { d: 'D4', title: 'Causa raíz', owner: ['Responsable de Calidad de planta', 'Mantenimiento de línea'], date: '2026-10-01', status: { text: 'Hipótesis', tone: 'warn' }, lead: 'Hipótesis principal, a confirmar: el desgaste de la malla de la despedregadora DP-2 (anotado el 18/08/2026; OT-26-07415 abierta, pendiente de repuesto) dejó pasar la piedra en la fabricación del 19/08/2026.', items: ['A favor: el lote pasó por DP-2 un día después de anotarse el desgaste; RCL-2025-0311 tuvo una causa del mismo tipo (planta de Alfaro)', 'Por aclarar: la muestra de recepción de 2 kg salió sin piedras y OPT-2 rechazó el 1,6 % ese turno (referencia 1,5 %)', 'Verificación: examen de la muestra del cliente, inspección de la malla, registros de OPT-2 del 19/08/2026 y análisis de 5 porqués'] },
        { d: 'D5', title: 'Acciones correctivas', owner: ['Mantenimiento de línea'], date: '2026-10-02', status: { text: 'Planificado', tone: 'info' }, items: ['Sustituir la malla de DP-2 y cerrar OT-26-07415', 'Verificar el ajuste de OPT-2 para piedras con muestras de referencia'] },
        { d: 'D6', title: 'Implantación y eficacia', owner: ['Responsable de Calidad de turno'], date: '2026-10-09', status: { text: 'Planificado', tone: 'info' }, items: ['Tras el cambio de malla, rechazo de OPT-2 en su referencia (1,5 %) durante 5 turnos; hoy está en el 4,8 %', 'Inspección reforzada del producto terminado de L2 sin piedras'] },
        { d: 'D7', title: 'Prevención de la recurrencia', owner: ['Responsable de Calidad de planta'], date: '2026-10-16', status: { text: 'Planificado', tone: 'info' }, items: ['Revisar IT-MAN-DP-02: plazo máximo para trabajar con una malla desgastada y stock mínimo de mallas de repuesto', 'Extender la revisión de mallas a las despedregadoras de todas las plantas (causa del mismo tipo que NC-2025-0388, planta de Alfaro)', 'Aviso automático cuando el rechazo de una selectora óptica duplique su referencia'] },
        { d: 'D8', title: 'Cierre y reconocimiento', owner: ['Responsable de Calidad de planta'], date: '2026-10-23', status: { text: 'Planificado', tone: 'info' }, items: ['Informe final a EC Foods UK Ltd y cierre de NC-2026-0419 en Elara con la evidencia de eficacia', 'Reconocimiento al equipo'] }
      ]
    },
    reply: {
      to_label: 'al cliente',
      subject: 'RE: Customer complaint - foreign body (stone) - Garden Peas 1kg - Lot L26-231-FUS-GUI-01 - Ref UKC-44718 - EC ref. NC-2026-0419',
      sub: 'Para qa.team@ec-foods-uk.example · en inglés',
      tab_label: 'Inglés · se envía',
      text: [
        'Dear Quality Assurance Team,',
        '',
        'Thank you for your email of 26 September 2026. We confirm receipt of consumer complaint UKC-44718 (foreign body: a stone of approximately 8 mm) concerning Garden Peas 1kg, lot L26-231-FUS-GUI-01, best before 08/2028. We are sorry for the concern caused to the consumer and note that no injury has been reported.',
        '',
        'Our investigation reference is NC-2026-0419. The complaint is being handled under our customer complaint procedure and will be documented in an 8D report.',
        '',
        'Initial findings from our records:',
        '- Traceability: the lot was produced at our Fustiñana plant on 19/08/2026 (line L2, morning shift) from peas harvested and received on the same day (grower AGR-0412, intake REC-26-18233).',
        '- Distribution: 22 pallets (17,600 kg) were produced. 20 pallets were dispatched to EC Foods UK Ltd (EXP-26-40911 on 25/08/2026 and EXP-26-40957 on 28/08/2026). The remaining 2 pallets at our warehouse have been placed on quality hold.',
        '- Foreign-body controls: we are reviewing the destoner and optical sorting records for the production date, together with the maintenance records of line L2.',
        '',
        'Next steps:',
        '- We will examine the physical sample as soon as it arrives. Please send it for the attention of our Quality department in Fustiñana, quoting NC-2026-0419.',
        '- We will send you the investigation report, including root cause and corrective and preventive actions, by 2 October 2026.',
        '- To confirm whether any other stock is affected, could you please let us know the quantity of lot L26-231-FUS-GUI-01 still held by EC Foods UK and by the retailer?',
        '',
        'Kind regards,',
        '',
        'Quality Department',
        'Frozen Foods Company · Fustiñana plant',
        'calidad@ec-demo.example'
      ].join('\n'),
      highlights: [
        { text: 'NC-2026-0419', label: 'Referencia', tone: 'brand' },
        { text: 'have been placed on quality hold', label: 'Contención', tone: 'brand' },
        { text: 'by 2 October 2026', label: 'Compromiso', tone: 'brand' }
      ],
      llm_instructions: [
        'Tono formal y profesional, de la planta proveedora al equipo de Quality Assurance de EC Foods UK Ltd, la filial del grupo en el Reino Unido que reclama en nombre de un retailer de marca blanca. Lamenta la preocupación del consumidor sin reconocer culpa.',
        'Agradece el correo del 26 de septiembre de 2026 y acusa recibo de la reclamación del consumidor UKC-44718 (cuerpo extraño: una piedra de unos 8 mm) sobre Garden Peas 1kg, lote L26-231-FUS-GUI-01, consumo preferente 08/2028; toma nota de que no se han comunicado lesiones.',
        'Da la referencia de investigación NC-2026-0419 y di que la reclamación se gestiona según el procedimiento de reclamaciones de cliente y se documentará en un informe 8D.',
        'Primeros datos: el lote se fabricó en Fustiñana el 19/08/2026 (línea L2, turno de mañana) con guisante cosechado y recibido el mismo día (agricultor AGR-0412, recepción REC-26-18233); 22 palés (17.600 kg), 20 expedidos a EC Foods UK Ltd (EXP-26-40911 el 25/08/2026 y EXP-26-40957 el 28/08/2026) y los 2 restantes retenidos por Calidad; se revisan los registros de la despedregadora, de la selección óptica y de mantenimiento de la línea L2.',
        'Próximos pasos: examinar la muestra física en cuanto llegue (enviarla a Calidad en Fustiñana indicando NC-2026-0419), enviar el informe con causa raíz y acciones correctivas y preventivas a más tardar el 2 de octubre de 2026 y preguntar cuánto stock del lote conservan EC Foods UK y el minorista.',
        'No adelantes la causa (ni la malla de la despedregadora DP-2, ni la orden OT-26-07415, ni la reclamación anterior RCL-2025-0311) ni hables de retirada del producto.',
        'Firma: Departamento de Calidad · Empresa de Congelados · planta de Fustiñana · calidad@ec-demo.example'
      ],
      criterion: 'Criterio de redacción: confirma hechos de SAP y Easy WMS y compromete fechas; no adelanta la causa (la hipótesis de DP-2 no está confirmada) ni habla de retirada.',
      control: {
        label: 'Traducción de control',
        note: 'Traducción de control para quien aprueba; no se envía.',
        edited_note: 'La traducción corresponde al borrador de Agentic Platform; la versión editada incluye cambios de Calidad en el texto en inglés.',
        subject: 'RE: Reclamación de cliente · ref. UKC-44718 · ref. EC NC-2026-0419',
        text: [
          'Estimado equipo de Quality Assurance:',
          '',
          'Gracias por su correo del 26 de septiembre de 2026. Confirmamos la recepción de la reclamación del consumidor UKC-44718 (cuerpo extraño: una piedra de unos 8 mm) sobre Garden Peas 1kg, lote L26-231-FUS-GUI-01, consumo preferente 08/2028. Lamentamos la preocupación causada al consumidor y tomamos nota de que no se han comunicado lesiones.',
          '',
          'Nuestra referencia de investigación es NC-2026-0419. La reclamación se gestiona según nuestro procedimiento de reclamaciones de cliente y se documentará en un informe 8D.',
          '',
          'Primeros datos de nuestros registros:',
          '- Trazabilidad: el lote se fabricó en nuestra planta de Fustiñana el 19/08/2026 (línea L2, turno de mañana) con guisante cosechado y recibido el mismo día (agricultor AGR-0412, recepción REC-26-18233).',
          '- Distribución: se fabricaron 22 palés (17.600 kg). 20 palés se expidieron a EC Foods UK Ltd (EXP-26-40911 el 25/08/2026 y EXP-26-40957 el 28/08/2026). Los 2 palés que quedan en nuestro almacén se han retenido por Calidad.',
          '- Controles de cuerpos extraños: estamos revisando los registros de la despedregadora y de la selección óptica de la fecha de producción, junto con los registros de mantenimiento de la línea L2.',
          '',
          'Próximos pasos:',
          '- Examinaremos la muestra física en cuanto llegue. Les rogamos que la envíen a la atención de nuestro departamento de Calidad en Fustiñana, indicando NC-2026-0419.',
          '- Les enviaremos el informe de investigación, con la causa raíz y las acciones correctivas y preventivas, a más tardar el 2 de octubre de 2026.',
          '- Para confirmar si hay otro stock afectado, ¿pueden indicarnos la cantidad del lote L26-231-FUS-GUI-01 que conservan EC Foods UK y el minorista?',
          '',
          'Un saludo,',
          '',
          'Departamento de Calidad',
          'Empresa de Congelados · planta de Fustiñana',
          'calidad@ec-demo.example'
        ].join('\n')
      }
    },
    approval: {
      title: 'Respuesta a EC Foods UK Ltd y contención',
      approver: 'Responsable de Calidad de turno',
      policy: 'PNT-CAL-020 · PNT-CAL-015',
      summary: {
        pending: 'Agentic Platform ha preparado la respuesta en inglés para qa.team@ec-foods-uk.example y la retención del stock que queda del lote. No se envía ni se retiene nada hasta que Calidad lo apruebe.',
        approved: 'Calidad ha aprobado la respuesta y la contención. Agentic Platform ha enviado el correo a qa.team@ec-foods-uk.example, ha retenido el stock del lote y ha actualizado NC-2026-0419.',
        rejected: 'Calidad ha rechazado la propuesta: no se ha enviado la respuesta ni se ha retenido ningún palé.'
      },
      scope: [
        { label: 'Respuesta en inglés', state: { pending: { status: 'pending', chip: 'Enviar' }, approved: { status: 'sent', chip: 'Enviada' }, rejected: { status: 'rejected', chip: 'No enviada' } } },
        { label: 'Palés en SIL-3', value: '2 palés · 1.600 kg', state: { pending: { status: 'pending', chip: 'Retener' }, approved: { status: 'hold', chip: 'Retenidos' }, rejected: { status: 'rejected', chip: 'No retenidos' } } },
        { label: 'Palés expedidos', value: '20 palés', state: { status: 'evaluate', chip: 'Consultar al cliente' } }
      ],
      effects: [
        'Outlook: respuesta enviada desde calidad@ec-demo.example',
        'SAP QM y Easy WMS: bloqueo de calidad del lote y 2 palés inmovilizados en SIL-3',
        'Elara: NC-2026-0419 pasa a «En curso» con la respuesta adjunta'
      ],
      approve_label: 'Aprobar y enviar',
      next_step: 'Siguiente paso: confirmar la causa con la muestra (D4) y enviar el informe 8D antes del 02/10/2026.',
      toast_approved: 'Respuesta enviada a EC Foods UK Ltd · 2 palés retenidos en SIL-3',
      reject_text: 'No se envía la respuesta ni se retiene ningún palé. El motivo queda en el registro de auditoría.',
      reject_placeholder: 'Por ejemplo: esperar a la muestra antes de responder',
      reject_audit: 'no se envía ni se retiene nada',
      toast_rejected: 'Respuesta rechazada: no se ha enviado nada ni se ha retenido ningún palé'
    },
    compare: {
      rows: [
        { k: 'Personas que intervienen', hoy: '3–4: Calidad, Producción, Mantenimiento y Expedición', pro_strong: '1', pro: ': Calidad revisa, corrige si hace falta y aprueba' },
        { k: 'Sistemas que hay que abrir', hoy: '6: Outlook, SAP, Mapex, Easy WMS, GMAO y Elara', pro_strong: '1', pro: ': esta consola; Agentic Platform consulta los 6' }
      ],
      steps_today: '12–15 búsquedas, cruces y redacciones a mano',
      time_label: 'Traza, 8D en borrador y respuesta',
      time_today: '2–5 h de trabajo, repartidas en 1–2 días',
      footer: 'Criterio de aceptación propuesto para el piloto: traza y borrador en menos de 15 minutos, y Calidad acepta el borrador con ediciones menores en al menos el 70 % de los casos.'
    },
    audit: {
      requested: { action: 'Análisis de reclamación solicitado', detail: 'UKC-44718 · correo de qa.team@ec-foods-uk.example del 26/09/2026 10:14' },
      analyzed: { action: 'Reclamación analizada', detail: 'UKC-44718 · lote L26-231-FUS-GUI-01' },
      after_analysis: [
        { action: 'No conformidad registrada en borrador', detail: 'NC-2026-0419 · Elara · vinculada a UKC-44718' },
        { action: 'Borrador 8D preparado', detail: 'NC-2026-0419 · D1–D8 · causa de DP-2 como hipótesis' },
        { action: 'Respuesta al cliente redactada', detail: 'UKC-44718 · inglés · versión 1 · pendiente de aprobación' }
      ],
      approved: { action: 'Respuesta aprobada y enviada', detail: 'UKC-44718 · a qa.team@ec-foods-uk.example · NC-2026-0419' },
      after_approval: [
        { action: 'Retención de calidad aplicada', detail: 'SAP QM y Easy WMS · lote L26-231-FUS-GUI-01 · 2 palés en SIL-3' },
        { action: 'No conformidad actualizada', detail: 'NC-2026-0419 · En curso · respuesta adjunta' }
      ]
    },
    outcome_label: 'Respuesta enviada · NC-2026-0419 en curso',
    toast_analyzed: 'Reclamación analizada · 8D y respuesta en borrador',
    status_chips: { idle: 'Abierta · sin analizar', pending: 'Esperando aprobación', approved: 'Respuesta enviada · 8D en curso', rejected: 'Respuesta rechazada' },
    report: {
      button: 'Descargar informe 8D',
      title: 'Informe 8D · reclamación UKC-44718',
      subtitle: 'Cuerpo extraño (piedra de unos 8 mm) en Garden Peas 1kg · lote L26-231-FUS-GUI-01 · EC Foods UK Ltd (filial EC, Reino Unido), Retailer UK (marca blanca)',
      filename: 'informe-8D-NC-2026-0419-UKC-44718',
      meta: [['Planta', 'Fustiñana (FUS)'], ['Reclamación', 'UKC-44718 · 26/09/2026'], ['Lote', 'L26-231-FUS-GUI-01'], ['Informe al cliente', 'antes del 02/10/2026']],
      state: { pending: 'Borrador · pendiente de aprobación', approved: 'Aprobado para envío · D4 abierta', rejected: 'Borrador · respuesta rechazada' },
      summary: [
        'Reclamación de EC Foods UK Ltd (filial EC, Reino Unido) por un retailer del Reino Unido (marca blanca): piedra de unos 8 mm en Garden Peas 1kg, lote L26-231-FUS-GUI-01. Sin lesiones. El lote se fabricó el 19/08/2026 en Línea L2; 20 de sus 22 palés están expedidos y 2 siguen en SIL-3.',
        'Hipótesis de causa, pendiente de confirmar con la muestra: desgaste de la malla de la despedregadora DP-2 (OT-26-07415, abierta desde el 18/08/2026).'
      ],
      trace_heading: 'Anexo A · Traza del lote',
      trace_rows: [
        { etapa: 'Campo', fecha: '19/08/2026', detalle: 'Agricultor AGR-0412 · parcelas P-0412-07, P-0412-09 (Ribera navarra) · guisante', ref: 'AGR-0412' },
        { etapa: 'Recepción', fecha: '19/08/2026 10:42', detalle: 'Ticket REC-26-18233 · tenderómetro 108 TR · 24,6 t', ref: 'REC-26-18233' },
        { etapa: 'Proceso', fecha: '19/08/2026', detalle: 'Línea L2 (guisante / judía verde): limpieza LIM-2, despedregadora DP-2, escaldador ESC-2, túnel IQF TUN-2, óptica OPT-2, envasado ENV-4 · turno mañana', ref: 'L2' },
        { etapa: 'Calidad', fecha: '19/08/2026', detalle: 'Recepción: tenderómetro 108 TR (especificación 95-120 TR): conforme; Recepción: muestra de 2 kg sin piedras ni terrones (conforme); Selectora óptica OPT-2: rechazo del 1,6 % en el turno (referencia 1,5 %); Envasado ENV-4: control de peso y sellado conforme', ref: '—' },
        { etapa: 'Mantenimiento', fecha: '18/08/2026', detalle: 'Despedregadora DP-2: desgaste de la malla anotado en la inspección semanal; sustitución programada. OT-26-07415: abierta, pendiente de repuesto', ref: 'OT-26-07415' },
        { etapa: 'Expedición', fecha: '25/08/2026 16:10', detalle: '12 palés a EC Foods UK Ltd (filial EC, Reino Unido) · Retailer UK (marca blanca) · camión frigorífico −25 °C', ref: 'EXP-26-40911' },
        { etapa: 'Expedición', fecha: '28/08/2026 15:30', detalle: '8 palés a EC Foods UK Ltd (filial EC, Reino Unido) · Retailer UK (marca blanca) · camión frigorífico −25 °C', ref: 'EXP-26-40957' },
        { etapa: 'Stock', fecha: '29/09/2026', detalle: '2 palés en Silo automático 3 (Fustiñana)', ref: 'SIL-3' }
      ],
      units: {
        heading: 'Anexo B · Palés del lote (22 SSCC)',
        cols: [{ label: 'Palé', key: 'pale', num: true }, { label: 'SSCC', key: 'sscc', mono: true }, { label: 'Kg', key: 'kg', num: true }, { label: 'Ubicación', key: 'ubicacion' }, { label: 'Estado', key: 'estado', status: true }, { label: 'Expedición', key: 'expedicion' }],
        rows: [
          '384123452310100016', '384123452310100023', '384123452310100030', '384123452310100047', '384123452310100054', '384123452310100061',
          '384123452310100078', '384123452310100085', '384123452310100092', '384123452310100108', '384123452310100115', '384123452310100122',
          '384123452310100139', '384123452310100146', '384123452310100153', '384123452310100160', '384123452310100177', '384123452310100184',
          '384123452310100191', '384123452310100207', '384123452310100214', '384123452310100221'
        ].map((sscc, i) => (i < 20
          ? { pale: `${i + 1}/22`, sscc, kg: '800', ubicacion: 'Expedido', estado: 'Expedido', expedicion: i < 12 ? 'EXP-26-40911' : 'EXP-26-40957' }
          : { pale: `${i + 1}/22`, sscc, kg: '800', ubicacion: 'Silo automático 3 (Fustiñana)', estado: 'En stock', estado_after: 'Retenido', expedicion: '—' }))
      },
      history_heading: 'Anexo C · Reclamaciones anteriores (12 meses)',
      approvals: [
        { paso: 'Borradores 8D y respuesta', rol: 'Agentic Platform · agente Reclamaciones de cliente', kind: 'agent' },
        { paso: 'Respuesta al cliente y contención (D3)', rol: 'Responsable de Calidad de turno', kind: 'reply' },
        { paso: 'Confirmación de la causa raíz (D4)', rol: 'Responsable de Calidad de planta', kind: 'pending' },
        { paso: 'Cierre del 8D (D8)', rol: 'Responsable de Calidad de planta', kind: 'pending' }
      ],
      second_signer: { role: 'Responsable de Calidad de planta', note: 'Confirmación de causa (D4) y cierre (D8) · pendiente' }
    },
    presenter: {
      running: 'Mientras corre: señalar la línea de GMAO (la orden de la malla de DP-2 abierta desde el 18/08) y la de Elara (reclamación parecida). Si hace falta, «Acelerar».',
      idle: [
        'Correo de EC Foods UK Ltd, la filial de Empresa de Congelados en el Reino Unido, por un retailer de marca blanca: una piedra de unos 8 mm en guisante de 1 kg. Llegó el sábado 26/09 a las 10:14, en inglés y con plazo.',
        'En producción, Agentic Platform lo analiza en cuanto entra en el buzón de Calidad. Aquí lo lanzamos a mano para ver qué hace y qué sistemas consulta.'
      ],
      pending: [
        'Lo resaltado en el correo es lo que Agentic Platform ha extraído. Cada dato se comprueba en SAP: el lote existe y el producto coincide.',
        'La traza: cosecha del 19/08 de AGR-0412, recepción REC-26-18233 a las 10:42 y línea L2. 20 palés ya están en el Reino Unido y 2 siguen en SIL-3.',
        'El dato que cambia la investigación: la malla de DP-2 tenía una orden abierta desde el 18/08, un día antes de fabricar el lote. Es una hipótesis, no la causa: la confirma Calidad con la muestra.',
        'Histórico: en noviembre de 2025 hubo una piedra en espinaca con una causa del mismo tipo en la planta de Alfaro (RCL-2025-0311). El 8D lo recoge en la prevención (D7).',
        'La respuesta en inglés confirma hechos y fechas y no adelanta la causa. No sale hasta que Calidad la aprueba.'
      ],
      approved: [
        'Aprobada: respuesta enviada, 2 palés retenidos en SIL-3 y la NC-2026-0419 en curso en Elara. Todo queda en el registro de auditoría.',
        'La comparación de abajo: hoy, 3–4 personas y 6 sistemas durante horas; aquí, una revisión y una aprobación. La cifra de «hoy» la medimos en el piloto, no la inventamos.',
        'El informe 8D se descarga como documento controlado: código, revisión, estado, aprobaciones y número de página.'
      ],
      next: {
        idle: 'Pulsar «Analizar reclamación» y leer en voz alta dos líneas del registro: el sistema consultado y lo que encuentra.',
        pending: 'Pulsar «Revisar y aprobar» (arriba) o bajar hasta la respuesta y pulsar «Aprobar y enviar». Opcional: «Corregir» el lote con uno inexistente para enseñar que no inventa datos.',
        approved: 'Pulsar «Descargar informe 8D» y enseñar la cabecera del documento. Después, pasar a «Procedimientos» en la barra lateral.'
      }
    }
  }
});
