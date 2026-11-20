/* Subtropicales Axarquía · reclamación CLM-2026-1120 (35 % de las piezas de aguacate "ready to eat" llega duro por maduración dispar en el lote AH-2611-092, de Supermercados Levante Fresh).
 * Escenario de la demo con datos sintéticos (MFM). */
agenticPack('fruta', {
  reclamacion: {
    code: 'CLM-2026-1120',
    nav: 'Reclamación CLM-2026-1120',
    title: 'Reclamación CLM-2026-1120',
    agent: 'Reclamaciones de cliente',
    analyze_label: 'Analizar reclamación',
    nc: 'NC-2026-1120',
    form: { code: 'REG-CAL-012-02', rev: '3' },
    received: { date: '2026-11-19', time: '17:05' },
    due: '2026-12-03',
    holidays: [],
    customer_line: 'Supermercados Levante Fresh, S.A. · cadena de supermercados · Valencia',
    due_line: 'Acuse en 24 h · informe 8D antes del 03/12/2026',
    cust_name: 'Marta Sanchis (Supermercados Levante Fresh)',
    cust_addr: 'calidad@supermercados-levante-fresh.example',
    own_name: 'Atención al cliente, Subtropicales Axarquía',
    own_addr: 'atencion.cliente@subtropicales-axarquia.example',
    mail_domain: 'subtropicales-axarquia.example',
    mail_sub: 'calidad@supermercados-levante-fresh.example · buzón atencion.cliente@subtropicales-axarquia.example · español',
    mail_title: 'Correo del cliente',
    mail_tab_label: 'Correo (español)',
    attachments: ['CLM-2026-1120_informe_INS-LF-2611-33.pdf', 'CLM-2026-1120_albaran_ALB-26-11-1471.pdf'],
    email_text: [
      'From: Marta Sanchis <calidad@supermercados-levante-fresh.example>',
      'To: Atención al cliente, Subtropicales Axarquía <atencion.cliente@subtropicales-axarquia.example>',
      'Date: Thu, 19 Nov 2026 17:05 (hora de Madrid)',
      'Subject: Reclamación - Aguacate ready to eat con maduración dispar - Lote AH-2611-092 - Pedido PED-2026-44718',
      '',
      'Buenas tardes:',
      '',
      'Les escribimos desde el departamento de calidad de Supermercados Levante Fresh, S.A. para reclamar por el aguacate "ready to eat" que nos suministraron el pasado 16/11/2026.',
      '',
      'Producto: Aguacate Hass ready to eat, bandeja de 4 piezas',
      'Lote: AH-2611-092',
      'Albarán: ALB-26-11-1471 (6 palés, 4,8 t) · Pedido: PED-2026-44718',
      'Informe de inspección: INS-LF-2611-33 (nuestras tiendas, 18/11/2026)',
      '',
      'Según nuestra inspección en 4 tiendas, el 35 % de las piezas llega duro (maduración dispar): 42 de las 120 piezas revisadas no están en el punto de consumo que indica la etiqueta. Hemos retirado de la venta las bandejas afectadas y conservamos unas 90 bandejas separadas en nuestra plataforma de Valencia. Adjuntamos el informe de inspección y el albarán.',
      '',
      'Solicitamos que analicen el lote, que nos expliquen la causa de la maduración dispar y nos indiquen las medidas correctivas, y que abonen la parte afectada.',
      '',
      'Les pedimos el acuse de recibo en 24 horas y un informe 8D por escrito en un plazo de 10 días hábiles. Indíquennos por favor el número de su expediente.',
      '',
      'Un saludo,',
      '',
      'Marta Sanchis',
      'Responsable de calidad',
      'Supermercados Levante Fresh, S.A.'
    ].join('\n'),
    highlights: [
      { text: 'Aguacate Hass ready to eat, bandeja de 4 piezas', label: 'Producto', tone: 'brand' },
      { text: 'AH-2611-092', label: 'Lote', tone: 'brand' },
      { text: 'ALB-26-11-1471', label: 'Albarán', tone: 'brand' },
      { text: 'INS-LF-2611-33', label: 'Informe del cliente' },
      { text: 'en el punto de consumo que indica la etiqueta', label: 'Punto de consumo declarado', tone: 'ok' },
      { text: 'el 35 % de las piezas llega duro (maduración dispar)', label: 'Piezas duras según el cliente', tone: 'crit' },
      { text: 'Adjuntamos el informe de inspección y el albarán.', label: 'Evidencia' },
      { text: 'Hemos retirado de la venta las bandejas afectadas', label: 'Contención del cliente' },
      { text: 'el acuse de recibo en 24 horas', label: 'Plazo' },
      { text: 'en un plazo de 10 días hábiles', label: 'Plazo' }
    ],
    run: {
      title: 'Workflow «Reclamación de cliente»',
      sub: 'Se lanza al entrar una reclamación en el buzón de Atención al cliente · PR-MAD-002',
      graph_title: 'Workflow de reclamación de cliente',
      idle_footer: 'Lee el correo, extrae y valida los datos, traza el lote y prepara el 8D y la respuesta. Nada sale sin la aprobación del Responsable de operaciones y calidad.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Correo de cliente', sub: 'Buzón de Atención al cliente', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extracción y validación', systems: ['Modelo de lenguaje', 'SAP S/4HANA'], icon: 'search' },
        { id: 'traza', label: 'Traza del lote', systems: ['SAP S/4HANA', 'Trazabilidad de campo', 'WMS', 'LIMS'], icon: 'git-branch' },
        { id: 'historico', label: 'Histórico, 8D y respuesta', systems: ['SAP S/4HANA', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Aprobación de operaciones y calidad', sub: 'Responsable de operaciones y calidad' },
        { id: 'salida', kind: 'output', label: 'Respuesta y contención', systems: ['Outlook', 'SAP S/4HANA', 'WMS'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'aprobado' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Lotes de las mismas parcelas · P-0418 y P-0733', value: 3, tone: 'warn' },
        { label: 'Piezas duras · 35 % según el cliente frente al 22 % en la salida de cámara', value: '35 %', tone: 'warn' },
        { label: 'Reclamación parecida · CLM-2026-0934', value: 1, tone: 'warn' },
        { label: 'Días hábiles para el informe 8D · vence el 03/12/2026', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Lee el correo de calidad@supermercados-levante-fresh.example en el buzón atencion.cliente@subtropicales-axarquia.example (19/11/2026 17:05)', result: 'Reclamación de cliente en español · 2 documentos adjuntos (informe INS-LF-2611-33 y albarán)', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extrae los datos de la reclamación', result: 'AH-2611-092 · aguacate Hass ready to eat, bandeja de 4 piezas · 35 % de piezas duras (42 de 120) en 4 tiendas · informe INS-LF-2611-33 · pide análisis y abono · acuse en 24 h e informe 8D en 10 días hábiles', ms: 2900 },
      { system: 'SAP S/4HANA', action: 'Valida el cliente y el pedido extraídos', result: 'El cliente existe: Supermercados Levante Fresh, S.A. (Valencia) · pedido PED-2026-44718 con el albarán ALB-26-11-1471 del 16/11/2026. Coincide con el correo', ms: 410, tone: 'ok' },
      { system: 'SAP S/4HANA', action: 'Albarán y lote entregado', result: 'ALB-26-11-1471: 6 palés (4,8 t) de AH-2611-092 entregados el 16/11/2026 · etiqueta "ready to eat" · transporte a 6,2 °C, conforme', ms: 380 },
      { system: 'Trazabilidad de campo', action: 'Origen del lote', result: 'AH-2611-092 recibido el 05/11/2026 (10 t) de dos productores: P-0418 (parcela AX-1187, 6,2 t, cosecha del 03/11) y P-0733 (parcela AX-0942, 3,8 t, cosecha del 04/11)', ms: 350 },
      { system: 'LIMS', action: 'Análisis del lote en la recepción y en la salida de maduración', result: 'LAB-2611-0791 (05/11/2026): materia seca de 24,0 % en P-0418 y 20,9 % en P-0733 (media del lote 22,8 % frente a un mínimo de 21,0 %) · LAB-2611-0824 (11/11/2026): 22 % de piezas por encima de 2,5 kgf frente a un límite del 25 % · lote liberado', ms: 520, tone: 'warn' },
      { system: 'WMS', action: 'Maduración en la cámara CM-03', result: 'MAD-2611-0306 del 06/11/2026: 10 t con un único programa RTE-2 (etileno 24 h, 18 °C, 5 días) para las dos procedencias · salida el 11/11/2026 · temperatura y etileno dentro de rango', ms: 430, tone: 'warn' },
      { system: 'SAP S/4HANA', action: 'Otros lotes de las mismas parcelas', result: 'AH-2611-097 (6 t, expedidas a Hipermercados Ibérica Fresca el 17/11/2026) y AH-2611-101 (4 t en maduración en CM-04) · remanente de AH-2611-092: 1,4 t en el almacén', ms: 460, tone: 'warn' },
      { system: 'LIMS', action: 'Muestra de retención de AH-2611-092', result: '20 piezas guardadas en la cámara de retención · disponibles para repetir la firmeza y la materia seca por productor (PR-MAD-002) · resultado en 24 h', ms: 390 },
      { system: 'SAP S/4HANA', action: 'Busca reclamaciones parecidas en los últimos 12 meses (SAP QM)', result: '4 reclamaciones de producto · 1 parecida: CLM-2026-0934 (aguacate ready to eat con piezas duras en AH-2609-061)', ms: 540, tone: 'warn' },
      { system: 'Procedimientos', action: 'Consulta PR-MAD-002 y PR-REC-001', result: 'Informe 8D en 10 días hábiles: antes del 03/12/2026 · PR-MAD-002 fija el programa de maduración por lote y el límite del 25 % de piezas fuera de rango · PR-REC-001 solo exige la materia seca media del lote (mínimo 21,0 %)', ms: 380 },
      { system: 'Modelo de lenguaje', action: 'Redacta el borrador 8D (D1–D8) con responsables por rol y fechas', result: 'Borrador completo · la mezcla de dos procedencias con distinta materia seca en un único programa de maduración queda como hipótesis por confirmar', ms: 5200 },
      { system: 'SAP S/4HANA', action: 'Registra la no conformidad y la vincula a la reclamación', result: 'NC-2026-1120 abierta en borrador (SAP QM) · vinculada a CLM-2026-1120', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Redacta la respuesta en español y su traducción de control', result: 'Borrador listo: acuse de recibo, referencia NC-2026-1120, retención cautelar del remanente y fecha del informe · pendiente de aprobación', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'AH-2611-092',
      noun: 'lote',
      label: 'Lote de aguacate',
      fix_title: 'el lote de la reclamación',
      systems: 'SAP/Trazabilidad',
      systems_short: 'SAP/Trazabilidad',
      fix_text: 'Si el cliente ha copiado mal el lote, escribe el número correcto. Agentic Platform lo busca en SAP y en Trazabilidad de campo y comprueba que corresponde al producto reclamado antes de cambiar nada.',
      same_body: 'Existe en SAP y en Trazabilidad de campo y corresponde al aguacate Hass ready to eat entregado a Supermercados Levante Fresh. Sin cambios.',
      unknown_hint: 'Si el lote del cliente es dudoso, pide una foto de la etiqueta de la bandeja o del albarán.',
      mismatch_body: 'Existe en SAP, pero no es el lote AH-2611-092 de la reclamación: no se cambia la ficha.',
      known: {
        'AH-2611-097': { kind: 'mismatch', title: 'El lote AH-2611-097 no corresponde a esta reclamación', body: 'Existe en SAP y procede de las mismas parcelas (P-0418 y P-0733), pero se expidió a Hipermercados Ibérica Fresca, sin reclamación abierta. La reclamación es del lote AH-2611-092: no se cambia la ficha.' },
        'AH-2611-118': { kind: 'mismatch', title: 'AH-2611-118 es un lote de otra incidencia, no el de esta reclamación', body: 'Es el aguacate Hass calibre 18 de la cámara CM-06, afectado por la alarma de temperatura ALM-FRIO-0612. No es el lote reclamado por Supermercados Levante Fresh. No se cambia la ficha.' },
        'MG-2611-KE-031': { kind: 'mismatch', title: 'El lote MG-2611-KE-031 no corresponde a esta reclamación', body: 'Es un lote de recepción de mango Keitt incluido en la retirada RET-2026-1120 por el residuo de plaguicida detectado en el LIMS. No es el aguacate reclamado. No se cambia la ficha.' }
      }
    },
    sheet: {
      sub: 'Datos extraídos del correo y comprobados en SAP S/4HANA, Trazabilidad de campo, WMS y LIMS',
      empty_text: 'Agentic Platform extraerá del correo el producto, el lote, el albarán, el porcentaje de piezas duras, el informe y el plazo, y los comprobará en SAP, Trazabilidad de campo, WMS y LIMS antes de preparar el 8D y la respuesta.',
      rows: [
        { k: 'Referencia', v: 'CLM-2026-1120', code: true, sub: 'Referencia de la reclamación del cliente' },
        { k: 'Cliente', v: 'Supermercados Levante Fresh, S.A.', sub: 'Cadena de supermercados · cliente de SAP · Valencia · contacto: Marta Sanchis, Responsable de calidad' },
        { k: 'Producto', v: 'Aguacate Hass ready to eat, bandeja de 4 piezas', ok: 'Coincide con el pedido PED-2026-44718 en SAP' },
        { k: 'Lote', lot: true, ok: 'Existe en SAP y en Trazabilidad de campo · recibido el 05/11/2026 · entregado el 16/11/2026 (4,8 t)' },
        { k: 'Albarán', v: 'ALB-26-11-1471', code: true, ok: 'Coincide con SAP · 6 palés, 4,8 t' },
        { k: 'Discrepancia', v: 'Piezas duras: 35 % en su inspección (42 de 120 piezas en 4 tiendas) frente al 22 % en nuestra salida de cámara', sub: 'Análisis de salida: 22 % de piezas por encima de 2,5 kgf (LAB-2611-0824)' },
        { k: 'Petición', v: 'Analizar el lote, explicar la causa de la maduración dispar y abonar la parte afectada', sub: 'El cliente ha retirado de la venta las bandejas afectadas y conserva unas 90 bandejas separadas' },
        { k: 'Evidencias', v: '2 documentos adjuntos · informe INS-LF-2611-33 y albarán' },
        { k: 'Fechas', v: 'Entrega: 16/11/2026 · inspección del cliente: 18/11/2026 · en Atención al cliente: 19/11/2026 17:05' },
        { k: 'Plazo', v: 'Acuse en 24 h · informe 8D antes del 03/12/2026', due: true, sub: '10 días hábiles desde la recepción · PR-MAD-002' },
        { k: 'Registro', v: 'NC-2026-1120', code: true, sub: 'No conformidad en SAP QM, vinculada a la reclamación' }
      ]
    },
    requests: {
      title: 'Lo que pide el cliente',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Acuse de recibo y número de expediente', meta: ['Respuesta al cliente · NC-2026-1120'], quote: 'Indíquennos por favor el número de su expediente', side: { pending: { status: 'waiting', label: 'Pendiente de aprobación' }, approved: { status: 'sent', label: 'Enviado' }, rejected: { status: 'rejected', label: 'No enviado' } } },
        { icon: 'clock', tone: 'warn', title: 'Análisis del lote con la muestra de retención', meta: ['D3 · LIMS · PR-MAD-002'], quote: 'analicen el lote', side: { status: 'review', label: 'Por repetir en 24 h' } },
        { icon: 'clock', tone: 'warn', title: 'Causa de la maduración dispar y medidas correctivas', meta: ['D4, D5 y D7 del 8D'], quote: 'que nos expliquen la causa de la maduración dispar y nos indiquen las medidas correctivas', side: { status: 'review', label: 'Hipótesis' } },
        { icon: 'clock', tone: 'warn', title: 'Abonar la parte afectada', meta: ['D5 · tras el análisis'], quote: 'que abonen la parte afectada', side: { status: 'review', label: 'Falta valorarlo' } },
        { icon: 'check-circle', tone: 'ok', title: '¿Se puede retener el remanente en el centro?', meta: ['D3 · 1,4 t de AH-2611-092 y 4 t de AH-2611-101'], quote: 'Hemos retirado de la venta las bandejas afectadas', side: { pending: { status: 'ok', label: 'Localizado' }, approved: { status: 'hold', label: 'Remanente retenido' }, rejected: { status: 'ok', label: 'Localizado' } } },
        { icon: 'calendar', tone: 'warn', title: 'Acuse en 24 h e informe 8D en 10 días hábiles', meta: ['Envío del 8D (D1–D5)'], quote: 'en un plazo de 10 días hábiles', side: { status: 'pending', label: 'Antes del 03/12' } }
      ]
    },
    trace: {
      title: 'Traza del lote AH-2611-092',
      sub: 'SAP S/4HANA, Trazabilidad de campo, WMS y LIMS · hacia atrás y hacia delante',
      button_code: 'AH-2611-092',
      button_label: 'Traza completa · 7 documentos',
      back_title: 'Hacia atrás',
      back: [
        { time: '05/11', title: 'Recepción · dos productores', text: 'Entrada de AH-2611-092 (10 t): P-0418 (parcela AX-1187, 6,2 t, materia seca de 24,0 %) y P-0733 (parcela AX-0942, 3,8 t, materia seca de 20,9 %, por debajo del mínimo de 21,0 %). Solo se controla la media del lote (22,8 %).', tone: 'warn', ref: 'AH-2611-092', chip: { status: 'open', label: 'Materia seca de una procedencia baja' } },
        { time: '06/11', title: 'Maduración · cámara CM-03', text: 'MAD-2611-0306 · 10 t con un único programa RTE-2 (etileno 24 h, 18 °C, 5 días) para las dos procedencias · temperatura y etileno dentro de rango', tone: 'brand', ref: 'MAD-2611-0306' },
        { time: '11/11', timeSub: '09:40', title: 'Salida de maduración de AH-2611-092', text: 'LAB-2611-0824: 22 % de piezas por encima de 2,5 kgf frente a un límite del 25 % · lote liberado · 20 piezas de retención conservadas', tone: 'ok', ref: 'LAB-2611-0824' },
        { time: '16/11', title: 'Proceso · del campo al cliente', route: ['P-0418/0733', 'CM-03', 'LAB-0824', 'AH-092', 'ALB-1471', 'SLF'], route_mark: 'AH-092', text: 'Albarán ALB-26-11-1471 · 6 palés (4,8 t) entregados a Supermercados Levante Fresh desde el Centro de manipulado de la Axarquía', tone: 'brand' },
        { time: '16/11', title: 'Controles del lote', text: 'Temperatura de transporte de 6,2 °C conforme · análisis de salida conforme · sin programa de maduración distinto por la materia seca de cada productor', tone: 'warn' }
      ],
      fwd_title: 'Hacia delante',
      fwd_cols: { id: 'Movimiento', qty: 'Cantidad', when: 'Fecha', status: 'Estado' },
      fwd: [
        { id: 'ALB-26-11-1471', dest: 'Entrega a Supermercados Levante Fresh', sub: 'PED-2026-44718 · AH-2611-092', qty: '4,8 t', when: '16/11/2026', status: { pending: { status: 'shipped', label: 'Entregado' }, approved: { status: 'shipped', label: 'Entregado' }, rejected: { status: 'shipped', label: 'Entregado' } } },
        { id: 'STK-AH092', dest: 'Remanente de AH-2611-092 en el centro', sub: 'Almacén de producto terminado · WMS', qty: '1,4 t', when: '20/11/2026', status: { pending: { status: 'pending', label: 'Retención propuesta' }, approved: { status: 'hold', label: 'Retenido' }, rejected: { status: 'pending', label: 'Retención propuesta' } } },
        { id: 'STK-AH101', dest: 'Lote AH-2611-101 en maduración (mismas parcelas)', sub: 'Cámara CM-04 · WMS', qty: '4 t', when: '20/11/2026', status: { pending: { status: 'pending', label: 'Retención propuesta' }, approved: { status: 'hold', label: 'Retenido' }, rejected: { status: 'pending', label: 'Retención propuesta' } } }
      ],
      fwd_note: 'Las mismas parcelas (P-0418 y P-0733) aportaron también AH-2611-097 (6 t, expedidas a Hipermercados Ibérica Fresca el 17/11) y AH-2611-101 (4 t en maduración en CM-04): si se confirma la hipótesis, hay que revisarlos. El cliente conserva unas 90 bandejas separadas y ya retiró de la venta las afectadas en 4 tiendas.',
      hypothesis: {
        title: 'Hipótesis de causa probable · a confirmar por el Laboratorio',
        icon: 'wrench',
        paras: [
          'Las dos procedencias del lote tienen una materia seca distinta (24,0 % y 20,9 %) y maduraron juntas con un único programa; la fruta de P-0733, con menos materia seca, puede haber madurado a otro ritmo. En CLM-2026-0934 la causa fue de ese tipo.',
          'Por aclarar: nuestro análisis de salida (22 % de piezas duras) y la inspección del cliente (35 %) difieren en 13 puntos. También puede deberse a la conservación en las tiendas, a una cadena de frío demasiado fría en destino o al muestreo de la inspección.',
          'Se confirma repitiendo la firmeza y la materia seca por productor en la muestra de retención, revisando las temperaturas de las tiendas y el registro del transporte. Hasta entonces no se comunica la causa al cliente.'
        ]
      }
    },
    history: {
      sub: 'SAP S/4HANA · reclamaciones de producto en SAP QM · últimos 12 meses',
      col_id: 'Reclamación',
      col_product: 'Producto y lote',
      col_cause: 'Causa raíz',
      rows: [
        { id: 'CLM-2026-0934', date: '2026-09-24', product: 'Aguacate Hass ready to eat, bandeja de 2 piezas', lot: 'AH-2609-061', description: 'Piezas duras tras la entrega en 3 tiendas (30 % según el cliente)', category: 'Maduración', customer_label: 'Cadena de supermercados', root_cause: 'Dos recolecciones con distinta materia seca cargadas en la misma maduración con un único programa', nc: 'NC-2026-0301', status: 'cerrada (09/10/2026)', similar: true },
        { id: 'CLM-2026-0872', date: '2026-08-12', product: 'Mango Keitt calibre 8, caja de 4 kg', lot: 'MG-2608-KE-019', description: 'Piezas con daño por frío en la entrega', category: 'Cadena de frío', customer_label: 'Mayorista', root_cause: 'Corte de frío en el camión durante la carga', nc: 'NC-2026-0262', status: 'cerrada', similar: false },
        { id: 'CLM-2026-0655', date: '2026-06-30', product: 'Guacamole fresco de 200 g', lot: 'GU-2606-014', description: 'Oscurecimiento del producto antes de la fecha de consumo preferente', category: 'Calidad del producto', customer_label: 'Cadena de supermercados', root_cause: 'Oxígeno residual en el envasado por un sellado deficiente', nc: 'NC-2026-0210', status: 'cerrada', similar: false },
        { id: 'CLM-2026-0431', date: '2026-04-21', product: 'Caja de 4 kg de la tienda online', lot: 'AH-2604-044', description: 'Caja con fruta golpeada en el transporte', category: 'Logística', customer_label: 'Consumidor final (tienda online)', root_cause: 'Embalaje con holgura en la caja de 4 kg', nc: 'NC-2026-0148', status: 'cerrada', similar: false }
      ],
      note: {
        title: 'Mismo tipo de causa que CLM-2026-0934',
        body: 'Piezas duras en aguacate ready to eat (24/09/2026): dos recolecciones con distinta materia seca en una misma maduración con un único programa; NC-2026-0301 cerrada (09/10/2026). Si se confirma la hipótesis de AH-2611-092, sería la segunda maduración dispar por mezclar procedencias en menos de dos meses: el 8D propone en D7 separar por materia seca en la recepción y fijar un programa de maduración por procedencia.'
      }
    },
    plan: {
      title: 'Borrador 8D · NC-2026-1120',
      sub: 'Acuse en 24 h · al cliente antes del 03/12/2026 con D1–D5; D6–D8 en seguimiento',
      col_label: 'Disciplina',
      containment_status: { pending: { text: 'Pendiente de aprobación', tone: 'warn' }, approved: { text: 'Aplicada', tone: 'ok' }, rejected: { text: 'No aplicada', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Equipo', owner: ['Responsable de operaciones y calidad'], date: '2026-11-20', status: { text: 'Propuesto', tone: 'draft' }, lead: 'Líder: Responsable de operaciones y calidad.', items: ['Jefe de laboratorio: repetición de la firmeza y de la materia seca en la muestra de retención', 'Responsable de maduración y frío: carga y programa de la cámara CM-03', 'Jefe de recepción y campo: procedencias y materia seca por productor', 'Responsable de calidad y seguridad alimentaria: retención en SAP QM y revisión del criterio de liberación', 'Atención al cliente: contacto con el cliente'], note: 'Contacto externo: Marta Sanchis, de Supermercados Levante Fresh. El cliente también recibió mango incluido en la retirada RET-2026-1120, que es independiente.' },
        { d: 'D2', title: 'Descripción del problema', owner: ['Atención al cliente'], date: '2026-11-20', status: { text: 'Completo', tone: 'ok' }, lead: 'Supermercados Levante Fresh reclama porque en su inspección el 35 % de las piezas del lote AH-2611-092 llega duro, con una maduración dispar.', items: ['Lote AH-2611-092 (10 t, recibido el 05/11/2026), 4,8 t entregadas el 16/11/2026 con el albarán ALB-26-11-1471', 'Análisis de salida: 22 % de piezas fuera de rango (LAB-2611-0824); inspección del cliente: 35 %, 42 de 120 piezas en 4 tiendas (INS-LF-2611-33)', 'El cliente ha retirado de la venta las bandejas afectadas y conserva unas 90 bandejas separadas', 'Evidencias: informe y albarán adjuntos; reclamación recibida el 19/11/2026 17:05'] },
        { d: 'D3', title: 'Contención', owner: ['Responsable de calidad y seguridad alimentaria', 'Jefe de laboratorio'], date: '2026-11-20', containment: true, items: ['Retener en SAP QM y en el WMS el remanente de AH-2611-092 (1,4 t) y el lote AH-2611-101 (4 t en CM-04). Requiere aprobación (PR-MAD-002)', 'Repetir la firmeza y la materia seca por productor en la muestra de retención (resultado en 24 h)', 'Revisar el lote AH-2611-097 (expedido a Hipermercados Ibérica Fresca), de las mismas parcelas', 'Mantener al cliente informado por escrito con la referencia NC-2026-1120'] },
        { d: 'D4', title: 'Causa raíz', owner: ['Jefe de laboratorio', 'Responsable de maduración y frío'], date: '2026-11-27', status: { text: 'Hipótesis', tone: 'warn' }, lead: 'Hipótesis principal, a confirmar: la fruta de P-0733 tiene menos materia seca y maduró a otro ritmo que la de P-0418 dentro de un único programa de maduración.', items: ['A favor: CLM-2026-0934 tuvo una causa del mismo tipo; la recepción solo controla la materia seca media del lote', 'Por aclarar: nuestro análisis de salida (22 %) no confirma el 35 % del cliente; puede deberse a la conservación en tienda, a la temperatura en destino o al muestreo de la inspección', 'Verificación: firmeza y materia seca por productor en la muestra de retención, revisión de las temperaturas de las tiendas y análisis de 5 porqués'] },
        { d: 'D5', title: 'Acciones correctivas', owner: ['Responsable de operaciones y calidad'], date: '2026-12-03', status: { text: 'Planificado', tone: 'info' }, items: ['Abonar la parte afectada de AH-2611-092, según el resultado del análisis y el acuerdo con el cliente', 'Si se confirma la causa, separar las procedencias y revisar AH-2611-097 y AH-2611-101'] },
        { d: 'D6', title: 'Implantación y eficacia', owner: ['Responsable de maduración y frío'], date: '2026-12-11', status: { text: 'Planificado', tone: 'info' }, items: ['Confirmar con el cliente que las siguientes entregas llegan en su punto de consumo (inspección conjunta)', 'Comprobar que no hay otros clientes con piezas duras en lotes de P-0418 y P-0733'] },
        { d: 'D7', title: 'Prevención de la recurrencia', owner: ['Responsable de calidad y seguridad alimentaria'], date: '2026-12-18', status: { text: 'Planificado', tone: 'info' }, items: ['Revisar PR-REC-001: controlar la materia seca por productor y no solo la media del lote (causa del mismo tipo que NC-2026-0301)', 'Revisar PR-MAD-002: un programa de maduración por procedencia y no cargar juntas procedencias con más de 2 puntos de diferencia de materia seca', 'Bloquear en SAP QM los lotes con procedencias mezcladas sin programa asignado antes de cargarlos en la cámara'] },
        { d: 'D8', title: 'Cierre y reconocimiento', owner: ['Responsable de operaciones y calidad'], date: '2026-12-23', status: { text: 'Planificado', tone: 'info' }, items: ['Informe final a Supermercados Levante Fresh y cierre de NC-2026-1120 en SAP QM con la evidencia de eficacia', 'Reconocimiento al equipo'] }
      ]
    },
    reply: {
      to_label: 'al cliente',
      subject: 'RE: Reclamación - Aguacate ready to eat con maduración dispar - Lote AH-2611-092 - Pedido PED-2026-44718 - Ref. NC-2026-1120',
      sub: 'Para calidad@supermercados-levante-fresh.example · en español',
      tab_label: 'Español · se envía',
      text: [
        'Estimada Sra. Sanchis:',
        '',
        'Gracias por su correo del 19 de noviembre de 2026. Confirmamos la recepción de su reclamación CLM-2026-1120 sobre la maduración del lote AH-2611-092 de aguacate Hass ready to eat (albarán ALB-26-11-1471): su inspección indica que el 35 % de las piezas llega duro. Lamentamos las molestias que esto le ha causado.',
        '',
        'Su número de expediente es NC-2026-1120. Estamos revisando el caso con nuestro Laboratorio y con Calidad, y la reclamación se documentará en un informe 8D.',
        '',
        'Primeros datos de nuestros registros:',
        '- Entrega: hemos localizado el lote AH-2611-092, recibido el 05/11/2026 y entregado el 16/11/2026 (6 palés, 4,8 t, albarán ALB-26-11-1471).',
        '- Análisis: nuestro análisis de la salida de maduración del 11/11/2026 dio un 22 % de piezas por encima del límite de firmeza. Repetiremos el ensayo en la muestra de retención.',
        '- Existencias: hemos propuesto retener de forma cautelar el remanente del lote que conservamos en el centro.',
        '',
        'Próximos pasos:',
        '- El resultado del nuevo ensayo estará en unas 24 horas y se lo comunicaremos.',
        '- Le enviaremos por escrito el informe con la explicación de la diferencia y las medidas correctivas, a más tardar el 3 de diciembre de 2026.',
        '- Le agradeceríamos que nos envíe fotografías de las bandejas afectadas, la temperatura de conservación en cada tienda y la fecha y hora de recepción, y que mantenga aparte las bandejas que conserva. Nuestro equipo de Calidad se pondrá en contacto con usted.',
        '',
        'Un saludo,',
        '',
        'Atención al cliente',
        'Subtropicales Axarquía · Centro de manipulado de la Axarquía (Málaga)',
        'atencion.cliente@subtropicales-axarquia.example'
      ].join('\n'),
      highlights: [
        { text: 'NC-2026-1120', label: 'Referencia', tone: 'brand' },
        { text: 'hemos propuesto retener de forma cautelar el remanente', label: 'Contención', tone: 'brand' },
        { text: 'a más tardar el 3 de diciembre de 2026', label: 'Compromiso', tone: 'brand' }
      ],
      llm_instructions: [
        'Tono cordial, formal y profesional, de Atención al cliente de Subtropicales Axarquía a Marta Sanchis, Responsable de calidad de Supermercados Levante Fresh, una cadena de supermercados que reclama por la maduración dispar de un aguacate ready to eat. Lamenta las molestias sin reconocer culpa.',
        'Agradece el correo del 19 de noviembre de 2026 y acusa recibo de la reclamación CLM-2026-1120 sobre el lote AH-2611-092 (aguacate Hass ready to eat, albarán ALB-26-11-1471): su inspección indica que el 35 % de las piezas llega duro.',
        'Da el número de expediente NC-2026-1120 y di que se revisa con el Laboratorio y con Calidad y se documentará en un informe 8D.',
        'Primeros datos: lote recibido el 05/11/2026 y entregado el 16/11/2026 (6 palés, 4,8 t); el análisis de la salida de maduración del 11/11/2026 dio un 22 % de piezas por encima del límite de firmeza y se repetirá en la muestra de retención (resultado en unas 24 horas); se propone retener de forma cautelar el remanente del centro.',
        'Próximos pasos: comunicar el resultado del nuevo ensayo, enviar por escrito el informe con la explicación y las medidas correctivas a más tardar el 3 de diciembre de 2026 y pedir fotografías, la temperatura de conservación en cada tienda y la fecha y hora de recepción, y que mantenga aparte las bandejas; avisa de que Calidad contactará con ella.',
        'No adelantes la causa (ni la mezcla de procedencias con distinta materia seca ni la reclamación anterior CLM-2026-0934) ni prometas el abono ni des por buena o mala la cifra del cliente. No menciones la retirada RET-2026-1120.',
        'Escribe en español. Firma: Atención al cliente · Subtropicales Axarquía · Centro de manipulado de la Axarquía (Málaga) · atencion.cliente@subtropicales-axarquia.example'
      ],
      criterion: 'Criterio de redacción: confirma hechos de SAP, Trazabilidad de campo, WMS y LIMS y compromete fechas; no adelanta la causa (la hipótesis de la mezcla de procedencias no está confirmada) ni promete el abono.',
      control: {
        label: 'Traducción de control (inglés)',
        note: 'Traducción de control para Calidad y para quien aprueba; no se envía.',
        edited_note: 'La traducción corresponde al borrador de Agentic Platform; la versión editada incluye cambios de operaciones en el texto en español.',
        subject: 'RE: Complaint - Avocado ready to eat with uneven ripening - Lot AH-2611-092 - Order PED-2026-44718 - Ref. NC-2026-1120',
        text: [
          'Dear Ms Sanchis,',
          '',
          'Thank you for your email of 19 November 2026. We confirm receipt of your complaint CLM-2026-1120 about the ripening of lot AH-2611-092 of ready-to-eat Hass avocado (delivery note ALB-26-11-1471): your inspection shows that 35% of the pieces arrive hard. We are sorry for the inconvenience.',
          '',
          'Your case number is NC-2026-1120. We are reviewing the case with our Laboratory and with Quality, and the complaint will be documented in an 8D report.',
          '',
          'Initial findings from our records:',
          '- Delivery: we have located lot AH-2611-092, received on 05/11/2026 and delivered on 16/11/2026 (6 pallets, 4.8 t, delivery note ALB-26-11-1471).',
          '- Analysis: our analysis at the ripening exit of 11/11/2026 gave 22% of pieces above the firmness limit. We will repeat the test on the retention sample.',
          '- Stock: we have proposed a precautionary hold on the remaining stock of the lot that we hold at the centre.',
          '',
          'Next steps:',
          '- The result of the new test will be available in about 24 hours and we will tell you.',
          '- We will send you in writing the report with the explanation of the difference and the corrective measures, by 3 December 2026 at the latest.',
          '- We would be grateful if you could send us photographs of the affected trays, the storage temperature in each store and the date and time of receipt, and keep the trays that you hold set aside. Our Quality team will contact you.',
          '',
          'Kind regards,',
          '',
          'Customer Care',
          'Subtropicales Axarquía · Axarquía Packing Centre (Málaga)',
          'atencion.cliente@subtropicales-axarquia.example'
        ].join('\n')
      }
    },
    approval: {
      title: 'Respuesta a Supermercados Levante Fresh y contención',
      approver: 'Responsable de operaciones y calidad',
      policy: 'PR-MAD-002 · PR-REC-001',
      summary: {
        pending: 'Agentic Platform ha preparado la respuesta en español para calidad@supermercados-levante-fresh.example y la retención cautelar del remanente. No se envía ni se retiene nada hasta que Operaciones y calidad lo apruebe.',
        approved: 'Operaciones y calidad ha aprobado la respuesta y la contención. Agentic Platform ha enviado el correo a calidad@supermercados-levante-fresh.example, ha retenido el remanente en SAP QM y en el WMS y ha actualizado NC-2026-1120.',
        rejected: 'Operaciones y calidad ha rechazado la propuesta: no se ha enviado la respuesta ni se ha retenido ningún remanente.'
      },
      scope: [
        { label: 'Respuesta en español', state: { pending: { status: 'pending', chip: 'Enviar' }, approved: { status: 'sent', chip: 'Enviada' }, rejected: { status: 'rejected', chip: 'No enviada' } } },
        { label: 'Remanente de AH-2611-092 y lote AH-2611-101', value: '1,4 t + 4 t · SAP QM y WMS', state: { pending: { status: 'pending', chip: 'Retener' }, approved: { status: 'hold', chip: 'Retenido' }, rejected: { status: 'rejected', chip: 'No retenido' } } },
        { label: 'Abono de la parte afectada', value: '4,8 t entregadas · AH-2611-092', state: { status: 'evaluate', chip: 'Tras el análisis' } }
      ],
      effects: [
        'Outlook: respuesta enviada desde atencion.cliente@subtropicales-axarquia.example',
        'SAP S/4HANA: remanente de AH-2611-092 retenido en SAP QM y reclamación CLM-2026-1120 en «En curso» con la respuesta adjunta',
        'WMS: lote AH-2611-101 retenido en la cámara CM-04 hasta confirmar la firmeza'
      ],
      approve_label: 'Aprobar y enviar',
      next_step: 'Siguiente paso: repetir la firmeza y la materia seca en la muestra de retención (D3) y enviar el informe 8D antes del 03/12/2026.',
      toast_approved: 'Respuesta enviada a Supermercados Levante Fresh · remanente retenido en SAP QM y WMS',
      reject_text: 'No se envía la respuesta ni se retiene ningún remanente. El motivo queda en el registro de auditoría.',
      reject_placeholder: 'Por ejemplo: esperar el resultado del nuevo ensayo antes de contestar',
      reject_audit: 'no se envía ni se retiene nada',
      toast_rejected: 'Respuesta rechazada: no se ha enviado nada ni se ha retenido ningún remanente'
    },
    compare: {
      rows: [
        { k: 'Personas que intervienen', hoy: '4–5: Atención al cliente, Calidad, Laboratorio, Maduración y Recepción', pro_strong: '1', pro: ': Operaciones y calidad revisa, corrige si hace falta y aprueba' },
        { k: 'Sistemas que hay que abrir', hoy: '6: Outlook, SAP, Trazabilidad de campo, LIMS, WMS y hojas de cálculo', pro_strong: '1', pro: ': esta consola; Agentic Platform consulta los 5' }
      ],
      steps_today: '15–20 búsquedas, cruces y redacciones a mano',
      time_label: 'Traza, 8D en borrador y respuesta',
      time_today: '3–6 h de trabajo, repartidas en 1–2 días',
      footer: 'Criterio de aceptación propuesto para el piloto: traza y borrador en menos de 15 minutos, y Operaciones y calidad acepta el borrador con ediciones menores en al menos el 70 % de los casos.'
    },
    audit: {
      requested: { action: 'Análisis de reclamación solicitado', detail: 'CLM-2026-1120 · correo de calidad@supermercados-levante-fresh.example del 19/11/2026 17:05' },
      analyzed: { action: 'Reclamación analizada', detail: 'CLM-2026-1120 · lote AH-2611-092' },
      after_analysis: [
        { action: 'No conformidad registrada en borrador', detail: 'NC-2026-1120 · SAP QM · vinculada a CLM-2026-1120' },
        { action: 'Borrador 8D preparado', detail: 'NC-2026-1120 · D1–D8 · mezcla de procedencias como hipótesis' },
        { action: 'Respuesta al cliente redactada', detail: 'CLM-2026-1120 · español · versión 1 · pendiente de aprobación' }
      ],
      approved: { action: 'Respuesta aprobada y enviada', detail: 'CLM-2026-1120 · a calidad@supermercados-levante-fresh.example · NC-2026-1120' },
      after_approval: [
        { action: 'Retención cautelar aplicada', detail: 'SAP QM y WMS · AH-2611-092 (1,4 t) y AH-2611-101 (4 t)' },
        { action: 'Caso actualizado', detail: 'NC-2026-1120 · En curso · respuesta adjunta' }
      ]
    },
    outcome_label: 'Respuesta enviada · NC-2026-1120 en curso',
    toast_analyzed: 'Reclamación analizada · 8D y respuesta en borrador',
    status_chips: { idle: 'Abierta · sin analizar', pending: 'Esperando aprobación', approved: 'Respuesta enviada · 8D en curso', rejected: 'Respuesta rechazada' },
    report: {
      button: 'Descargar informe 8D',
      title: 'Informe 8D · reclamación CLM-2026-1120',
      subtitle: 'Maduración dispar del aguacate ready to eat · lote AH-2611-092 · Supermercados Levante Fresh, S.A.',
      filename: 'informe-8D-NC-2026-1120-CLM-2026-1120',
      meta: [['Sede', 'Centro de manipulado de la Axarquía (Málaga)'], ['Reclamación', 'CLM-2026-1120 · 19/11/2026'], ['Lote', 'AH-2611-092'], ['Informe al cliente', 'antes del 03/12/2026']],
      state: { pending: 'Borrador · pendiente de aprobación', approved: 'Aprobado para envío · D4 abierta', rejected: 'Borrador · respuesta rechazada' },
      summary: [
        'Reclamación de Supermercados Levante Fresh por la maduración dispar del lote AH-2611-092 de aguacate Hass ready to eat: su inspección (INS-LF-2611-33) da un 35 % de piezas duras (42 de 120 en 4 tiendas); nuestro análisis de la salida de maduración (LAB-2611-0824) dio un 22 % de piezas por encima de 2,5 kgf. Se entregaron 4,8 t el 16/11/2026 y el cliente ha retirado de la venta las bandejas afectadas.',
        'Hipótesis de causa, pendiente de confirmar por el Laboratorio: dos procedencias con distinta materia seca (24,0 % y 20,9 %) maduradas juntas con un único programa; también se valoran la conservación en las tiendas y el muestreo de la inspección.'
      ],
      trace_heading: 'Anexo A · Traza del lote',
      trace_rows: [
        { etapa: 'Recepción', fecha: '05/11/2026', detalle: 'Entrada de 10 t de dos productores: P-0418 (6,2 t, materia seca de 24,0 %) y P-0733 (3,8 t, 20,9 %); solo se controla la media del lote (22,8 %)', ref: 'AH-2611-092' },
        { etapa: 'Maduración', fecha: '06/11/2026', detalle: 'Carga de 10 t en la cámara CM-03 con un único programa RTE-2 (etileno 24 h, 18 °C, 5 días) · WMS', ref: 'MAD-2611-0306' },
        { etapa: 'Salida', fecha: '11/11/2026 09:40', detalle: '22 % de piezas por encima de 2,5 kgf frente a un límite del 25 % · lote liberado · 20 piezas de retención conservadas', ref: 'LAB-2611-0824' },
        { etapa: 'Lote', fecha: '12/11/2026', detalle: 'Lote de aguacate Hass ready to eat, bandeja de 4 piezas · SAP S/4HANA', ref: 'AH-2611-092' },
        { etapa: 'Controles', fecha: '16/11/2026', detalle: 'Temperatura y etileno de la cámara (conformes); análisis de salida (conforme); transporte a 6,2 °C (conforme); sin programa de maduración distinto por la materia seca de cada productor', ref: '—' },
        { etapa: 'Entrega', fecha: '16/11/2026', detalle: '6 palés (4,8 t) entregados a Supermercados Levante Fresh, S.A. (Valencia) · pedido PED-2026-44718', ref: 'ALB-26-11-1471' },
        { etapa: 'Reclamación', fecha: '18/11/2026', detalle: 'Inspección del cliente en 4 tiendas con un 35 % de piezas duras', ref: 'INS-LF-2611-33' },
        { etapa: 'Otros lotes', fecha: '17/11 y 18/11/2026', detalle: 'Lotes de las mismas parcelas: AH-2611-097 (6 t expedidas a Hipermercados Ibérica Fresca) y AH-2611-101 (4 t en maduración en CM-04)', ref: 'AH-2611-097/101' }
      ],
      units: {
        heading: 'Anexo B · Documentos y movimientos del expediente (7)',
        cols: [{ label: 'N.º', key: 'n', num: true }, { label: 'Documento', key: 'doc' }, { label: 'Referencia', key: 'ref', mono: true }, { label: 'Fecha', key: 'fecha' }, { label: 'Estado', key: 'estado', status: true }, { label: 'Sistema', key: 'sistema' }],
        rows: [
          { n: '1', doc: 'Recepción de 10 t de dos productores', ref: 'AH-2611-092', fecha: '05/11/2026', estado: 'Recibida', sistema: 'Trazabilidad de campo' },
          { n: '2', doc: 'Carga de maduración de 10 t en CM-03', ref: 'MAD-2611-0306', fecha: '06/11/2026', estado: 'Cerrada', sistema: 'WMS' },
          { n: '3', doc: 'Análisis de firmeza de la salida de maduración', ref: 'LAB-2611-0824', fecha: '11/11/2026', estado: 'Liberado', sistema: 'LIMS' },
          { n: '4', doc: 'Lote de aguacate ready to eat', ref: 'AH-2611-092', fecha: '12/11/2026', estado: 'En revisión', sistema: 'SAP S/4HANA' },
          { n: '5', doc: 'Albarán de 4,8 t a Supermercados Levante Fresh', ref: 'ALB-26-11-1471', fecha: '16/11/2026', estado: 'Entregado', sistema: 'SAP S/4HANA' },
          { n: '6', doc: 'Remanente de AH-2611-092 (1,4 t)', ref: 'STK-AH092', fecha: '20/11/2026', estado: 'Disponible', estado_after: 'Retenido', sistema: 'WMS' },
          { n: '7', doc: 'Lote AH-2611-101 en maduración (4 t)', ref: 'STK-AH101', fecha: '20/11/2026', estado: 'Disponible', estado_after: 'Retenido', sistema: 'WMS' }
        ]
      },
      history_heading: 'Anexo C · Reclamaciones anteriores (12 meses)',
      approvals: [
        { paso: 'Borradores 8D y respuesta', rol: 'Agentic Platform · agente Reclamaciones de cliente', kind: 'agent' },
        { paso: 'Respuesta al cliente y contención (D3)', rol: 'Responsable de operaciones y calidad', kind: 'reply' },
        { paso: 'Confirmación de la causa raíz (D4)', rol: 'Jefe de laboratorio', kind: 'pending' },
        { paso: 'Cierre del 8D (D8)', rol: 'Responsable de calidad y seguridad alimentaria', kind: 'pending' }
      ],
      second_signer: { role: 'Responsable de calidad y seguridad alimentaria', note: 'Confirmación de causa (D4) y cierre (D8) · pendiente' }
    },
    presenter: {
      running: 'Mientras corre: señalar la línea del LIMS (materia seca baja en una procedencia) y la de WMS (un único programa de maduración para las dos). Si hace falta, «Acelerar».',
      idle: [
        'Correo de Marta Sanchis, de Supermercados Levante Fresh: su inspección da un 35 % de piezas duras en el lote AH-2611-092 de aguacate ready to eat. Llegó el jueves 19/11 a las 17:05, en español y con plazos: acuse en 24 h e informe 8D en 10 días hábiles.',
        'En producción, Agentic Platform lo analiza en cuanto entra en el buzón de Atención al cliente. Aquí lo lanzamos a mano para ver qué hace y qué sistemas consulta.'
      ],
      pending: [
        'Lo resaltado en el correo es lo que Agentic Platform ha extraído. Cada dato se comprueba en SAP, Trazabilidad de campo, WMS y LIMS: el lote existe, el albarán coincide y el análisis de salida fue conforme.',
        'La traza: recepción el 05/11 de dos productores, maduración en CM-03 el 06/11, salida el 11/11 con un 22 % de piezas fuera de rango y entrega de 4,8 t el 16/11. Las mismas parcelas están en otros dos lotes.',
        'El dato que cambia la investigación: las dos procedencias tienen una materia seca distinta y maduraron con un único programa. Es una hipótesis, no la causa: la confirma el Laboratorio con un nuevo ensayo.',
        'Histórico: en septiembre hubo una maduración dispar con una causa del mismo tipo (CLM-2026-0934). El 8D lo recoge en la prevención (D7).',
        'La respuesta en español confirma hechos y fechas y no adelanta la causa ni promete el abono. No sale hasta que Operaciones y calidad la aprueba.'
      ],
      approved: [
        'Aprobada: respuesta enviada, remanente retenido y la no conformidad NC-2026-1120 en curso en SAP QM. Todo queda en el registro de auditoría.',
        'La comparación de abajo: hoy, 4–5 personas y 6 sistemas durante horas; aquí, una revisión y una aprobación. La cifra de «hoy» la medimos en el piloto, no la inventamos.',
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
