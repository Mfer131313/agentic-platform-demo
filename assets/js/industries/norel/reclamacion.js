/* Norel Nutrición Animal · reclamación CLM-2026-1028 (vitamina E un 18 % inferior a la declarada en el lote de premezcla PRM-2610-0388, de Piensos Cuenca Mediterráneo).
 * Escenario de la demo con datos sintéticos (MFM). */
agenticPack('norel', {
  reclamacion: {
    code: 'CLM-2026-1028',
    nav: 'Reclamación CLM-2026-1028',
    title: 'Reclamación CLM-2026-1028',
    agent: 'Reclamaciones de cliente',
    analyze_label: 'Analizar reclamación',
    nc: 'NC-2026-1028',
    form: { code: 'REG-CAL-012-02', rev: '3' },
    received: { date: '2026-10-27', time: '16:20' },
    due: '2026-11-10',
    holidays: [],
    customer_line: 'Piensos Cuenca Mediterráneo, S.A. · fábrica de piensos para rumiantes · Cuenca',
    due_line: 'Acuse en 24 h · informe 8D antes del 10/11/2026',
    cust_name: 'Elena Marín (Piensos Cuenca Mediterráneo)',
    cust_addr: 'calidad@piensos-cuenca-mediterraneo.example',
    own_name: 'Atención al cliente y pedidos, Norel Nutrición Animal',
    own_addr: 'atencion.cliente@norel-nutricion.example',
    mail_domain: 'norel-nutricion.example',
    mail_sub: 'calidad@piensos-cuenca-mediterraneo.example · buzón atencion.cliente@norel-nutricion.example · español',
    mail_title: 'Correo del cliente',
    mail_tab_label: 'Correo (español)',
    attachments: ['CLM-2026-1028_informe_LAB-CLI-2610-77.pdf', 'CLM-2026-1028_albaran_ALB-26-10-1088.pdf'],
    email_text: [
      'From: Elena Marín <calidad@piensos-cuenca-mediterraneo.example>',
      'To: Atención al cliente y pedidos, Norel Nutrición Animal <atencion.cliente@norel-nutricion.example>',
      'Date: Tue, 27 Oct 2026 16:20 (hora de Madrid)',
      'Subject: Reclamación - Vitamina E inferior a la declarada - Premezcla vacuno de leche lote PRM-2610-0388 - Informe LAB-CLI-2610-77',
      '',
      'Buenos días:',
      '',
      'Les escribimos desde el departamento de calidad de Piensos Cuenca Mediterráneo, S.A. para reclamar por el lote de premezcla que nos suministraron el pasado 16/10/2026.',
      '',
      'Producto: Premezcla de vitaminas y oligoelementos para vacuno de leche',
      'Lote: PRM-2610-0388',
      'Albarán: ALB-26-10-1088 (10 t) · Pedido: PV-26-10-0471',
      'Informe de análisis: LAB-CLI-2610-77 (nuestro laboratorio, 26/10/2026)',
      '',
      'Según nuestro análisis, el contenido de vitamina E es de 9.840 mg/kg, un 18 % inferior a los 12.000 mg/kg declarados en la etiqueta. Con este lote hemos fabricado 3 lotes de pienso para vacuno de leche y hemos suspendido su uso; nos quedan unas 4 t en el silo. Adjuntamos el informe de análisis y el albarán.',
      '',
      'Solicitamos que analicen la muestra de retención del lote, que nos expliquen la causa de la diferencia y nos indiquen las medidas correctivas, y que sustituyan o abonen la parte afectada.',
      '',
      'Les pedimos el acuse de recibo en 24 horas y un informe 8D por escrito en un plazo de 10 días hábiles. Indíquennos por favor el número de su expediente.',
      '',
      'Un saludo,',
      '',
      'Elena Marín',
      'Responsable de calidad',
      'Piensos Cuenca Mediterráneo, S.A.'
    ].join('\n'),
    highlights: [
      { text: 'Premezcla de vitaminas y oligoelementos para vacuno de leche', label: 'Producto', tone: 'brand' },
      { text: 'PRM-2610-0388', label: 'Lote', tone: 'brand' },
      { text: 'ALB-26-10-1088', label: 'Albarán', tone: 'brand' },
      { text: 'LAB-CLI-2610-77', label: 'Informe del cliente' },
      { text: '12.000 mg/kg declarados', label: 'Vitamina E declarada', tone: 'ok' },
      { text: '9.840 mg/kg, un 18 % inferior', label: 'Vitamina E según el cliente', tone: 'crit' },
      { text: 'Adjuntamos el informe de análisis y el albarán.', label: 'Evidencia' },
      { text: 'hemos suspendido su uso', label: 'Contención del cliente' },
      { text: 'el acuse de recibo en 24 horas', label: 'Plazo' },
      { text: 'en un plazo de 10 días hábiles', label: 'Plazo' }
    ],
    run: {
      title: 'Workflow «Reclamación de cliente»',
      sub: 'Se lanza al entrar una reclamación en el buzón de Atención al cliente y pedidos · PR-LAB-005',
      graph_title: 'Workflow de reclamación de cliente',
      idle_footer: 'Lee el correo, extrae y valida los datos, traza el lote y prepara el 8D y la respuesta. Nada sale sin la aprobación del Responsable de operaciones y calidad.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Correo de cliente', sub: 'Buzón de Atención al cliente y pedidos', systems: ['Outlook'], icon: 'mail' },
        { id: 'extraccion', label: 'Extracción y validación', systems: ['Modelo de lenguaje', 'Salesforce CRM'], icon: 'search' },
        { id: 'traza', label: 'Traza del lote', systems: ['Salesforce CRM', 'SAP S/4HANA', 'MES de planta', 'LIMS'], icon: 'git-branch' },
        { id: 'historico', label: 'Histórico, 8D y respuesta', systems: ['Salesforce CRM', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Aprobación de operaciones y calidad', sub: 'Responsable de operaciones y calidad' },
        { id: 'salida', kind: 'output', label: 'Respuesta y contención', systems: ['Outlook', 'SAP S/4HANA', 'Salesforce CRM'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'aprobado' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Lotes con la misma vitamina E · MP-2610-VE-044', value: 3, tone: 'warn' },
        { label: 'Diferencia de vitamina E · 12.000 declarados frente a 9.840 mg/kg', value: '-18 %', tone: 'warn' },
        { label: 'Reclamación parecida · CLM-2026-0731', value: 1, tone: 'warn' },
        { label: 'Días hábiles para el informe 8D · vence el 10/11/2026', due: true }
      ]
    },
    steps: [
      { system: 'Outlook', action: 'Lee el correo de calidad@piensos-cuenca-mediterraneo.example en el buzón atencion.cliente@norel-nutricion.example (27/10/2026 16:20)', result: 'Reclamación de cliente en español · 2 documentos adjuntos (informe LAB-CLI-2610-77 y albarán)', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extrae los datos de la reclamación', result: 'PRM-2610-0388 · premezcla de vitaminas y oligoelementos para vacuno de leche · vitamina E 9.840 mg/kg frente a 12.000 declarados (-18 %) · informe LAB-CLI-2610-77 · acuse en 24 h e informe 8D en 10 días hábiles', ms: 2900 },
      { system: 'Salesforce CRM', action: 'Valida el cliente y el pedido extraídos', result: 'El cliente existe: Piensos Cuenca Mediterráneo, S.A. (Cuenca) · pedido PV-26-10-0471 con el albarán ALB-26-10-1088 del 16/10/2026. Coincide con el correo', ms: 410, tone: 'ok' },
      { system: 'SAP S/4HANA', action: 'Albarán y lote entregado', result: 'ALB-26-10-1088: 10 t de PRM-2610-0388 entregadas el 16/10/2026 · etiqueta con vitamina E de 12.000 mg/kg declarada', ms: 380 },
      { system: 'MES de planta', action: 'Orden de fabricación del lote', result: 'OF-2610-0388 del 13/10/2026 en la Planta de premezclas (España) · consume MP-2610-VE-044 (vitamina E acetato 50 %) · pesada dentro de tolerancia y limpieza de línea conforme (PR-PRO-003)', ms: 350 },
      { system: 'LIMS', action: 'Análisis de liberación del lote', result: 'LAB-2610-0871 (14/10/2026): vitamina E 11.950 mg/kg frente a 12.000 declarados (-0,4 %) · lote liberado · muestra de retención conservada', ms: 520 },
      { system: 'SAP S/4HANA', action: 'Materia prima MP-2610-VE-044', result: 'Recibida el 06/10/2026 de Nutrivit Ingredients, S.L. · certificado del proveedor con potencia del 50,4 % · sin análisis propio de potencia en la recepción', ms: 430, tone: 'warn' },
      { system: 'SAP S/4HANA', action: 'Otros lotes fabricados con la misma materia prima', result: 'PRM-2610-0391 (14 t, entregadas a Piensos del Ebro el 19/10/2026) y PRM-2610-0402 (12 t en almacén) · remanente de PRM-2610-0388: 2 t · remanente de MP-2610-VE-044: 1,2 t', ms: 460, tone: 'warn' },
      { system: 'LIMS', action: 'Muestra de retención de PRM-2610-0388', result: 'Disponible para repetir el ensayo de vitamina E por HPLC (PR-LAB-005) · resultado en 48 h', ms: 390 },
      { system: 'Salesforce CRM', action: 'Busca reclamaciones parecidas en los últimos 12 meses', result: '4 reclamaciones con caso abierto · 1 parecida: CLM-2026-0731 (vitamina A un 14 % inferior a la declarada en PRM-2607-0215)', ms: 540, tone: 'warn' },
      { system: 'Procedimientos', action: 'Consulta PR-LAB-005 y PR-REG-002', result: 'Informe 8D en 10 días hábiles: antes del 10/11/2026 · PR-LAB-005 pide repetir el ensayo en la muestra de retención con un método de referencia antes de concluir · PR-REG-002 fija la declaración del aditivo', ms: 380 },
      { system: 'Modelo de lenguaje', action: 'Redacta el borrador 8D (D1–D8) con responsables por rol y fechas', result: 'Borrador completo · la potencia de la vitamina E de MP-2610-VE-044 queda como hipótesis por confirmar', ms: 5200 },
      { system: 'SAP S/4HANA', action: 'Registra la no conformidad y la vincula a la reclamación', result: 'NC-2026-1028 abierta en borrador (SAP QM) · vinculada a CLM-2026-1028', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Redacta la respuesta en español y su traducción de control', result: 'Borrador listo: acuse de recibo, referencia NC-2026-1028, bloqueo cautelar del remanente y fecha del informe · pendiente de aprobación', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'PRM-2610-0388',
      noun: 'lote',
      label: 'Lote de premezcla',
      fix_title: 'el lote de la reclamación',
      systems: 'SAP/MES',
      systems_short: 'SAP/MES',
      fix_text: 'Si el cliente ha copiado mal el lote, escribe el número correcto. Agentic Platform lo busca en SAP y en el MES y comprueba que corresponde al producto reclamado antes de cambiar nada.',
      same_body: 'Existe en SAP y en el MES y corresponde a la premezcla de vitaminas y oligoelementos para vacuno de leche entregada a Piensos Cuenca Mediterráneo. Sin cambios.',
      unknown_hint: 'Si el lote del cliente es dudoso, pide una foto de la etiqueta del saco o del albarán.',
      mismatch_body: 'Existe en SAP, pero no es el lote PRM-2610-0388 de la reclamación: no se cambia la ficha.',
      known: {
        'PRM-2610-0391': { kind: 'mismatch', title: 'El lote PRM-2610-0391 no corresponde a esta reclamación', body: 'Existe en SAP y se fabricó con la misma vitamina E (MP-2610-VE-044), pero es una premezcla de vitaminas y minerales de avicultura entregada a Piensos del Ebro, sin reclamación abierta. La reclamación es del lote PRM-2610-0388: no se cambia la ficha.' },
        'PRM-2610-0417': { kind: 'mismatch', title: 'PRM-2610-0417 es un lote de otra incidencia, no el de esta reclamación', body: 'Es una premezcla vitamínica de porcino incluida en la retirada RET-2026-1028 por la Salmonella detectada en MP-2610-CC-118. No es el lote reclamado por Piensos Cuenca Mediterráneo. No se cambia la ficha.' },
        'PRM-2610-0402': { kind: 'mismatch', title: 'El lote PRM-2610-0402 no corresponde a esta reclamación', body: 'Existe en el MES, pero es un lote de 12 t que sigue en el almacén de producto terminado, sin entregas ni reclamación. No se cambia la ficha.' }
      }
    },
    sheet: {
      sub: 'Datos extraídos del correo y comprobados en SAP S/4HANA, el MES de planta y el LIMS',
      empty_text: 'Agentic Platform extraerá del correo el producto, el lote, el albarán, el contenido reclamado, el informe y el plazo, y los comprobará en SAP, el MES y el LIMS antes de preparar el 8D y la respuesta.',
      rows: [
        { k: 'Referencia', v: 'CLM-2026-1028', code: true, sub: 'Referencia de la reclamación del cliente' },
        { k: 'Cliente', v: 'Piensos Cuenca Mediterráneo, S.A.', sub: 'Fábrica de piensos para rumiantes · cliente de Salesforce · Cuenca · contacto: Elena Marín, Responsable de calidad' },
        { k: 'Producto', v: 'Premezcla de vitaminas y oligoelementos para vacuno de leche', ok: 'Coincide con el pedido PV-26-10-0471 en SAP' },
        { k: 'Lote', lot: true, ok: 'Existe en SAP y en el MES · fabricado el 13/10/2026 · entregado el 16/10/2026 (10 t)' },
        { k: 'Albarán', v: 'ALB-26-10-1088', code: true, ok: 'Coincide con SAP · 10 t' },
        { k: 'Discrepancia', v: 'Vitamina E: 9.840 mg/kg en su análisis frente a 12.000 mg/kg declarados (-18 %)', sub: 'Nuestro análisis de liberación: 11.950 mg/kg (LAB-2610-0871)' },
        { k: 'Petición', v: 'Analizar la muestra de retención, explicar la causa y sustituir o abonar la parte afectada', sub: 'El cliente ha suspendido el uso y conserva unas 4 t en silo' },
        { k: 'Evidencias', v: '2 documentos adjuntos · informe LAB-CLI-2610-77 y albarán' },
        { k: 'Fechas', v: 'Entrega: 16/10/2026 · análisis del cliente: 26/10/2026 · en Atención al cliente: 27/10/2026 16:20' },
        { k: 'Plazo', v: 'Acuse en 24 h · informe 8D antes del 10/11/2026', due: true, sub: '10 días hábiles desde la recepción · PR-LAB-005' },
        { k: 'Registro', v: 'NC-2026-1028', code: true, sub: 'No conformidad en SAP QM, vinculada a la reclamación' }
      ]
    },
    requests: {
      title: 'Lo que pide el cliente',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Acuse de recibo y número de expediente', meta: ['Respuesta al cliente · NC-2026-1028'], quote: 'Indíquennos por favor el número de su expediente', side: { pending: { status: 'waiting', label: 'Pendiente de aprobación' }, approved: { status: 'sent', label: 'Enviado' }, rejected: { status: 'rejected', label: 'No enviado' } } },
        { icon: 'clock', tone: 'warn', title: 'Análisis de la muestra de retención del lote', meta: ['D3 · LIMS · PR-LAB-005'], quote: 'analicen la muestra de retención del lote', side: { status: 'review', label: 'Por repetir en 48 h' } },
        { icon: 'clock', tone: 'warn', title: 'Causa de la diferencia y medidas correctivas', meta: ['D4, D5 y D7 del 8D'], quote: 'que nos expliquen la causa de la diferencia y nos indiquen las medidas correctivas', side: { status: 'review', label: 'Hipótesis' } },
        { icon: 'clock', tone: 'warn', title: 'Sustituir o abonar la parte afectada', meta: ['D5 · tras el análisis'], quote: 'que sustituyan o abonen la parte afectada', side: { status: 'review', label: 'Falta valorarla' } },
        { icon: 'check-circle', tone: 'ok', title: '¿Se puede bloquear el remanente en la planta?', meta: ['D3 · 2 t de PRM-2610-0388 y 1,2 t de MP-2610-VE-044'], quote: 'hemos suspendido su uso', side: { pending: { status: 'ok', label: 'Localizado' }, approved: { status: 'hold', label: 'Remanente bloqueado' }, rejected: { status: 'ok', label: 'Localizado' } } },
        { icon: 'calendar', tone: 'warn', title: 'Acuse en 24 h e informe 8D en 10 días hábiles', meta: ['Envío del 8D (D1–D5)'], quote: 'en un plazo de 10 días hábiles', side: { status: 'pending', label: 'Antes del 10/11' } }
      ]
    },
    trace: {
      title: 'Traza del lote PRM-2610-0388',
      sub: 'SAP S/4HANA, MES de planta y LIMS · hacia atrás y hacia delante',
      button_code: 'PRM-2610-0388',
      button_label: 'Traza completa · 7 documentos',
      back_title: 'Hacia atrás',
      back: [
        { time: '06/10', title: 'Materia prima · vitamina E acetato 50 %', text: 'Entrada de MP-2610-VE-044 de Nutrivit Ingredients, S.L. con certificado del proveedor del 50,4 % de potencia. No se analizó la potencia en la recepción.', tone: 'warn', ref: 'MP-2610-VE-044', chip: { status: 'open', label: 'Potencia sin verificar en la recepción' } },
        { time: '13/10', title: 'Fabricación · orden en el MES de planta', text: 'OF-2610-0388 · 12 t de premezcla de vitaminas y oligoelementos para vacuno de leche · pesada de la vitamina E dentro de tolerancia · limpieza de línea conforme', tone: 'brand', ref: 'OF-2610-0388' },
        { time: '14/10', timeSub: '09:12', title: 'Liberación del lote PRM-2610-0388', text: 'LAB-2610-0871: vitamina E 11.950 mg/kg frente a 12.000 declarados (-0,4 %) · lote liberado · muestra de retención conservada', tone: 'ok', ref: 'LAB-2610-0871' },
        { time: '16/10', title: 'Proceso · de la materia prima al cliente', route: ['VE-044', 'OF-0388', 'LAB-0871', 'PRM-0388', 'ALB-1088', 'PCM'], route_mark: 'PRM-0388', text: 'Albarán ALB-26-10-1088 · 10 t entregadas a Piensos Cuenca Mediterráneo desde la Planta de premezclas (España)', tone: 'brand' },
        { time: '16/10', title: 'Controles del lote', text: 'Pesada y limpieza de línea conformes · análisis de liberación conforme · sin control de potencia de la vitamina E por lote de materia prima en la recepción', tone: 'warn' }
      ],
      fwd_title: 'Hacia delante',
      fwd_cols: { id: 'Movimiento', qty: 'Cantidad', when: 'Fecha', status: 'Estado' },
      fwd: [
        { id: 'ALB-26-10-1088', dest: 'Entrega a Piensos Cuenca Mediterráneo', sub: 'PV-26-10-0471 · PRM-2610-0388', qty: '10 t', when: '16/10/2026', status: { pending: { status: 'shipped', label: 'Entregado' }, approved: { status: 'shipped', label: 'Entregado' }, rejected: { status: 'shipped', label: 'Entregado' } } },
        { id: 'STK-0388', dest: 'Remanente de PRM-2610-0388 en la planta', sub: 'Almacén de producto terminado · SAP QM', qty: '2 t', when: '28/10/2026', status: { pending: { status: 'pending', label: 'Bloqueo propuesto' }, approved: { status: 'hold', label: 'Bloqueado' }, rejected: { status: 'pending', label: 'Bloqueo propuesto' } } },
        { id: 'STK-VE044', dest: 'Remanente de MP-2610-VE-044', sub: 'Almacén de materias primas · SAP QM', qty: '1,2 t', when: '28/10/2026', status: { pending: { status: 'pending', label: 'Bloqueo propuesto' }, approved: { status: 'hold', label: 'Bloqueado' }, rejected: { status: 'pending', label: 'Bloqueo propuesto' } } }
      ],
      fwd_note: 'La misma vitamina E (MP-2610-VE-044) se usó también en PRM-2610-0391 (14 t, entregadas a Piensos del Ebro el 19/10) y en PRM-2610-0402 (12 t en almacén): si se confirma la hipótesis, hay que revisarlos. El cliente conserva unas 4 t de PRM-2610-0388 en silo y ya fabricó 3 lotes de pienso.',
      hypothesis: {
        title: 'Hipótesis de causa probable · a confirmar por el Laboratorio',
        icon: 'wrench',
        paras: [
          'La potencia real de la vitamina E de MP-2610-VE-044 podría ser inferior a la del certificado del proveedor (50,4 %), sin haberse detectado en la recepción; en CLM-2026-0731 la causa fue de ese tipo con la vitamina A.',
          'Por aclarar: el análisis de liberación de Norel (11.950 mg/kg) y el del cliente (9.840 mg/kg) discrepan en un 18 %. También puede deberse a la toma de la muestra en el silo del cliente (segregación) o al método analítico de cada laboratorio.',
          'Se confirma repitiendo el ensayo por HPLC en la muestra de retención, comparando la materia prima y revisando el método y el punto de toma del cliente. Hasta entonces no se comunica la causa al cliente.'
        ]
      }
    },
    history: {
      sub: 'Salesforce CRM · reclamaciones con caso abierto · últimos 12 meses',
      col_id: 'Reclamación',
      col_product: 'Producto y lote',
      col_cause: 'Causa raíz',
      rows: [
        { id: 'CLM-2026-0731', date: '2026-07-21', product: 'Premezcla de vitaminas para vacuno de carne', lot: 'PRM-2607-0215', description: 'Vitamina A un 14 % inferior a la declarada según el análisis del cliente', category: 'Contenido de aditivos', customer_label: 'Fábrica de piensos', root_cause: 'Potencia de la vitamina A del lote de materia prima inferior a la del certificado del proveedor', nc: 'NC-2026-0188', status: 'cerrada (06/08/2026)', similar: true },
        { id: 'CLM-2026-0644', date: '2026-06-10', product: 'Premezcla para acuicultura', lot: 'PRM-2606-0102', description: 'Apelmazamiento del producto en el saco tras el transporte', category: 'Calidad física', customer_label: 'Grupo integrador', root_cause: 'Humedad alta del producto en el ensacado', nc: 'NC-2026-0161', status: 'cerrada', similar: false },
        { id: 'CLM-2026-0452', date: '2026-05-04', product: 'Aditivo ADDIPETS para mascotas', lot: 'PRM-2605-0067', description: 'Etiqueta con una declaración de aditivo errónea', category: 'Etiquetado', customer_label: 'Fábrica de alimentos para mascotas', root_cause: 'Plantilla de etiqueta con una versión anterior de la declaración (PR-REG-002)', nc: 'NC-2026-0117', status: 'cerrada', similar: false },
        { id: 'CLM-2026-0208', date: '2026-03-18', product: 'Premezcla para avicultura', lot: 'PRM-2603-0044', description: 'Palets con sacos dañados en la entrega', category: 'Logística', customer_label: 'Grupo integrador', root_cause: 'Estiba incorrecta en el camión', nc: 'NC-2026-0063', status: 'cerrada', similar: false }
      ],
      note: {
        title: 'Mismo tipo de causa que CLM-2026-0731',
        body: 'Vitamina A un 14 % inferior a la declarada (21/07/2026): potencia de la materia prima inferior a la del certificado del proveedor; NC-2026-0188 cerrada (06/08/2026). Si se confirma la hipótesis de MP-2610-VE-044, sería la segunda diferencia de contenido de una vitamina por la potencia de la materia prima en menos de cuatro meses: el 8D propone en D7 verificar la potencia de las vitaminas en la recepción de cada lote de materia prima.'
      }
    },
    plan: {
      title: 'Borrador 8D · NC-2026-1028',
      sub: 'Acuse en 24 h · al cliente antes del 10/11/2026 con D1–D5; D6–D8 en seguimiento',
      col_label: 'Disciplina',
      containment_status: { pending: { text: 'Pendiente de aprobación', tone: 'warn' }, approved: { text: 'Aplicada', tone: 'ok' }, rejected: { text: 'No aplicada', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Equipo', owner: ['Responsable de operaciones y calidad'], date: '2026-10-28', status: { text: 'Propuesto', tone: 'draft' }, lead: 'Líder: Responsable de operaciones y calidad.', items: ['Jefe de laboratorio: repetición del ensayo de vitamina E y comparación de métodos', 'Jefe de planta: orden OF-2610-0388, pesadas y limpieza de línea', 'Responsable de calidad y seguridad alimentaria (APPCC): bloqueo en SAP QM y revisión de la recepción de materias primas', 'Norel Solutions (asesor técnico) y Atención al cliente y pedidos: contacto con el cliente'], note: 'Contacto externo: Elena Marín, de Piensos Cuenca Mediterráneo, y el proveedor Nutrivit Ingredients. El cliente también figura en la retirada RET-2026-1028, que es independiente.' },
        { d: 'D2', title: 'Descripción del problema', owner: ['Atención al cliente y pedidos'], date: '2026-10-28', status: { text: 'Completo', tone: 'ok' }, lead: 'Piensos Cuenca Mediterráneo reclama porque su análisis da un contenido de vitamina E de 9.840 mg/kg en PRM-2610-0388, un 18 % inferior a los 12.000 mg/kg declarados.', items: ['Lote PRM-2610-0388 (12 t, fabricado el 13/10/2026), 10 t entregadas el 16/10/2026 con el albarán ALB-26-10-1088', 'Análisis de liberación de Norel: 11.950 mg/kg (LAB-2610-0871); análisis del cliente: 9.840 mg/kg (LAB-CLI-2610-77)', 'El cliente ha fabricado 3 lotes de pienso con el producto, ha suspendido su uso y conserva unas 4 t en silo', 'Evidencias: informe y albarán adjuntos; reclamación recibida el 27/10/2026 16:20'] },
        { d: 'D3', title: 'Contención', owner: ['Responsable de calidad y seguridad alimentaria (APPCC)', 'Jefe de laboratorio'], date: '2026-10-28', containment: true, items: ['Bloquear en SAP QM el remanente de PRM-2610-0388 (2 t) y de MP-2610-VE-044 (1,2 t). Requiere aprobación (PR-LAB-005)', 'Repetir el ensayo de vitamina E por HPLC en la muestra de retención del lote (resultado en 48 h)', 'Revisar los lotes PRM-2610-0391 (entregado a Piensos del Ebro) y PRM-2610-0402 (en almacén), fabricados con la misma materia prima', 'Mantener al cliente informado por escrito con la referencia NC-2026-1028'] },
        { d: 'D4', title: 'Causa raíz', owner: ['Jefe de laboratorio', 'Jefe de planta'], date: '2026-11-04', status: { text: 'Hipótesis', tone: 'warn' }, lead: 'Hipótesis principal, a confirmar: la potencia de la vitamina E de MP-2610-VE-044 es inferior a la del certificado del proveedor y no se detectó en la recepción.', items: ['A favor: CLM-2026-0731 tuvo una causa del mismo tipo (potencia de la vitamina A inferior al certificado); no hay análisis propio de potencia en la recepción', 'Por aclarar: el análisis de liberación de Norel (11.950 mg/kg) no confirma la diferencia; puede deberse a la toma de muestra en el silo del cliente o al método analítico', 'Verificación: ensayo por HPLC en la muestra de retención y en la materia prima, revisión del método del cliente y análisis de 5 porqués'] },
        { d: 'D5', title: 'Acciones correctivas', owner: ['Responsable de operaciones y calidad'], date: '2026-11-10', status: { text: 'Planificado', tone: 'info' }, items: ['Sustituir o abonar la parte afectada de PRM-2610-0388, según el resultado del análisis y el acuerdo con el cliente', 'Si se confirma la causa, reclamar al proveedor Nutrivit Ingredients y revisar PRM-2610-0391 y PRM-2610-0402'] },
        { d: 'D6', title: 'Implantación y eficacia', owner: ['Norel Solutions (asesor técnico)'], date: '2026-11-20', status: { text: 'Planificado', tone: 'info' }, items: ['Confirmar con el cliente que el producto sustituido cumple la declaración (análisis conjunto)', 'Comprobar que no hay otros clientes con diferencias de vitamina E en lotes con MP-2610-VE-044'] },
        { d: 'D7', title: 'Prevención de la recurrencia', owner: ['Responsable de calidad y seguridad alimentaria (APPCC)'], date: '2026-11-27', status: { text: 'Planificado', tone: 'info' }, items: ['Revisar PR-LAB-005: verificar la potencia de las vitaminas en la recepción de cada lote de materia prima (causa del mismo tipo que NC-2026-0188)', 'Bloquear en SAP QM los lotes de vitaminas sin verificación de potencia antes de su uso en fabricación', 'Revisar con Asuntos regulatorios la declaración de vitaminas en la etiqueta (PR-REG-002)'] },
        { d: 'D8', title: 'Cierre y reconocimiento', owner: ['Responsable de operaciones y calidad'], date: '2026-12-04', status: { text: 'Planificado', tone: 'info' }, items: ['Informe final a Piensos Cuenca Mediterráneo y cierre de NC-2026-1028 en SAP QM con la evidencia de eficacia', 'Reconocimiento al equipo'] }
      ]
    },
    reply: {
      to_label: 'al cliente',
      subject: 'RE: Reclamación - Vitamina E inferior a la declarada - Premezcla vacuno de leche lote PRM-2610-0388 - Informe LAB-CLI-2610-77 - Ref. NC-2026-1028',
      sub: 'Para calidad@piensos-cuenca-mediterraneo.example · en español',
      tab_label: 'Español · se envía',
      text: [
        'Estimada Sra. Marín:',
        '',
        'Gracias por su correo del 27 de octubre de 2026. Confirmamos la recepción de su reclamación CLM-2026-1028 sobre el contenido de vitamina E del lote PRM-2610-0388 de premezcla de vitaminas y oligoelementos para vacuno de leche (albarán ALB-26-10-1088): su análisis indica 9.840 mg/kg frente a los 12.000 mg/kg declarados. Lamentamos las molestias que esto le ha causado.',
        '',
        'Su número de expediente es NC-2026-1028. Estamos revisando el caso con nuestro Laboratorio y con Calidad, y la reclamación se documentará en un informe 8D.',
        '',
        'Primeros datos de nuestros registros:',
        '- Entrega: hemos localizado el lote PRM-2610-0388, fabricado el 13/10/2026 y entregado el 16/10/2026 (10 t, albarán ALB-26-10-1088).',
        '- Análisis: nuestro análisis de liberación del 14/10/2026 dio 11.950 mg/kg. Repetiremos el ensayo en la muestra de retención con un método de referencia.',
        '- Existencias: hemos propuesto bloquear de forma cautelar el remanente del lote que conservamos en la planta.',
        '',
        'Próximos pasos:',
        '- El resultado del nuevo ensayo estará en unas 48 horas y se lo comunicaremos.',
        '- Le enviaremos por escrito el informe con la explicación de la diferencia y las medidas correctivas, a más tardar el 10 de noviembre de 2026.',
        '- Le agradeceríamos que nos indique el método analítico, la fecha y el punto de toma de la muestra, y que mantenga aparte las 4 t que conserva en el silo. Su asesor técnico de Norel Solutions se pondrá en contacto con usted.',
        '',
        'Un saludo,',
        '',
        'Atención al cliente y pedidos',
        'Norel Nutrición Animal · Madrid',
        'atencion.cliente@norel-nutricion.example'
      ].join('\n'),
      highlights: [
        { text: 'NC-2026-1028', label: 'Referencia', tone: 'brand' },
        { text: 'hemos propuesto bloquear de forma cautelar el remanente', label: 'Contención', tone: 'brand' },
        { text: 'a más tardar el 10 de noviembre de 2026', label: 'Compromiso', tone: 'brand' }
      ],
      llm_instructions: [
        'Tono cordial, formal y profesional, de Atención al cliente y pedidos de Norel Nutrición Animal a Elena Marín, Responsable de calidad de Piensos Cuenca Mediterráneo, una fábrica de piensos que reclama por la vitamina E de una premezcla. Lamenta las molestias sin reconocer culpa.',
        'Agradece el correo del 27 de octubre de 2026 y acusa recibo de la reclamación CLM-2026-1028 sobre el lote PRM-2610-0388 (premezcla de vitaminas y oligoelementos para vacuno de leche, albarán ALB-26-10-1088): su análisis indica 9.840 mg/kg de vitamina E frente a 12.000 mg/kg declarados.',
        'Da el número de expediente NC-2026-1028 y di que se revisa con el Laboratorio y con Calidad y se documentará en un informe 8D.',
        'Primeros datos: lote fabricado el 13/10/2026 y entregado el 16/10/2026 (10 t); el análisis de liberación del 14/10/2026 dio 11.950 mg/kg y se repetirá en la muestra de retención con un método de referencia (resultado en unas 48 horas); se propone bloquear de forma cautelar el remanente de la planta.',
        'Próximos pasos: comunicar el resultado del nuevo ensayo, enviar por escrito el informe con la explicación y las medidas correctivas a más tardar el 10 de noviembre de 2026 y pedir el método analítico, la fecha y el punto de toma de la muestra y que mantenga aparte las 4 t del silo; avisa de que Norel Solutions contactará con ella.',
        'No adelantes la causa (ni la potencia de la vitamina E de MP-2610-VE-044 ni la reclamación anterior CLM-2026-0731) ni prometas la sustitución o el abono ni des por buena o mala la cifra del cliente. No menciones la retirada RET-2026-1028.',
        'Escribe en español. Firma: Atención al cliente y pedidos · Norel Nutrición Animal · Madrid · atencion.cliente@norel-nutricion.example'
      ],
      criterion: 'Criterio de redacción: confirma hechos de SAP, el MES y el LIMS y compromete fechas; no adelanta la causa (la hipótesis de la potencia de la materia prima no está confirmada) ni promete la sustitución o el abono.',
      control: {
        label: 'Traducción de control (inglés)',
        note: 'Traducción de control para Asuntos regulatorios y para quien aprueba; no se envía.',
        edited_note: 'La traducción corresponde al borrador de Agentic Platform; la versión editada incluye cambios de operaciones en el texto en español.',
        subject: 'RE: Complaint - Vitamin E lower than declared - Dairy cattle premix batch PRM-2610-0388 - Report LAB-CLI-2610-77 - Ref. NC-2026-1028',
        text: [
          'Dear Ms Marín,',
          '',
          'Thank you for your email of 27 October 2026. We confirm receipt of your complaint CLM-2026-1028 about the vitamin E content of batch PRM-2610-0388 of vitamin and trace mineral premix for dairy cattle (delivery note ALB-26-10-1088): your analysis shows 9,840 mg/kg against the 12,000 mg/kg declared. We are sorry for the inconvenience.',
          '',
          'Your case number is NC-2026-1028. We are reviewing the case with our Laboratory and with Quality, and the complaint will be documented in an 8D report.',
          '',
          'Initial findings from our records:',
          '- Delivery: we have located batch PRM-2610-0388, made on 13/10/2026 and delivered on 16/10/2026 (10 t, delivery note ALB-26-10-1088).',
          '- Analysis: our release analysis of 14/10/2026 gave 11,950 mg/kg. We will repeat the test on the retention sample with a reference method.',
          '- Stock: we have proposed a precautionary block of the remaining stock of the batch that we hold at the plant.',
          '',
          'Next steps:',
          '- The result of the new test will be available in about 48 hours and we will tell you.',
          '- We will send you in writing the report with the explanation of the difference and the corrective measures, by 10 November 2026 at the latest.',
          '- We would be grateful if you could tell us the analytical method, the date and the sampling point, and keep the 4 t that you hold in the silo set aside. Your Norel Solutions technical adviser will contact you.',
          '',
          'Kind regards,',
          '',
          'Customer Service and Orders',
          'Norel Nutrición Animal · Madrid',
          'atencion.cliente@norel-nutricion.example'
        ].join('\n')
      }
    },
    approval: {
      title: 'Respuesta a Piensos Cuenca Mediterráneo y contención',
      approver: 'Responsable de operaciones y calidad',
      policy: 'PR-LAB-005 · PR-REG-002',
      summary: {
        pending: 'Agentic Platform ha preparado la respuesta en español para calidad@piensos-cuenca-mediterraneo.example y el bloqueo cautelar del remanente. No se envía ni se bloquea nada hasta que Operaciones y calidad lo apruebe.',
        approved: 'Operaciones y calidad ha aprobado la respuesta y la contención. Agentic Platform ha enviado el correo a calidad@piensos-cuenca-mediterraneo.example, ha bloqueado el remanente en SAP QM y ha actualizado NC-2026-1028.',
        rejected: 'Operaciones y calidad ha rechazado la propuesta: no se ha enviado la respuesta ni se ha bloqueado ningún remanente.'
      },
      scope: [
        { label: 'Respuesta en español', state: { pending: { status: 'pending', chip: 'Enviar' }, approved: { status: 'sent', chip: 'Enviada' }, rejected: { status: 'rejected', chip: 'No enviada' } } },
        { label: 'Remanente de PRM-2610-0388 y MP-2610-VE-044', value: '2 t + 1,2 t · SAP QM', state: { pending: { status: 'pending', chip: 'Bloquear' }, approved: { status: 'hold', chip: 'Bloqueado' }, rejected: { status: 'rejected', chip: 'No bloqueado' } } },
        { label: 'Sustitución o abono de la parte afectada', value: '10 t entregadas · PRM-2610-0388', state: { status: 'evaluate', chip: 'Tras el análisis' } }
      ],
      effects: [
        'Outlook: respuesta enviada desde atencion.cliente@norel-nutricion.example',
        'SAP S/4HANA: remanente de PRM-2610-0388 y de MP-2610-VE-044 bloqueado en SAP QM',
        'Salesforce CRM: el caso de Piensos Cuenca Mediterráneo pasa a «En curso» con la respuesta adjunta'
      ],
      approve_label: 'Aprobar y enviar',
      next_step: 'Siguiente paso: repetir el ensayo de vitamina E en la muestra de retención (D3) y enviar el informe 8D antes del 10/11/2026.',
      toast_approved: 'Respuesta enviada a Piensos Cuenca Mediterráneo · remanente bloqueado en SAP QM',
      reject_text: 'No se envía la respuesta ni se bloquea ningún remanente. El motivo queda en el registro de auditoría.',
      reject_placeholder: 'Por ejemplo: esperar el resultado del nuevo ensayo antes de contestar',
      reject_audit: 'no se envía ni se bloquea nada',
      toast_rejected: 'Respuesta rechazada: no se ha enviado nada ni se ha bloqueado ningún remanente'
    },
    compare: {
      rows: [
        { k: 'Personas que intervienen', hoy: '4–5: Atención al cliente, Calidad, Laboratorio, Planta y Norel Solutions', pro_strong: '1', pro: ': Operaciones y calidad revisa, corrige si hace falta y aprueba' },
        { k: 'Sistemas que hay que abrir', hoy: '6: Outlook, Salesforce, SAP, MES, LIMS y SharePoint', pro_strong: '1', pro: ': esta consola; Agentic Platform consulta los 5' }
      ],
      steps_today: '15–20 búsquedas, cruces y redacciones a mano',
      time_label: 'Traza, 8D en borrador y respuesta',
      time_today: '3–6 h de trabajo, repartidas en 1–2 días',
      footer: 'Criterio de aceptación propuesto para el piloto: traza y borrador en menos de 15 minutos, y Operaciones y calidad acepta el borrador con ediciones menores en al menos el 70 % de los casos.'
    },
    audit: {
      requested: { action: 'Análisis de reclamación solicitado', detail: 'CLM-2026-1028 · correo de calidad@piensos-cuenca-mediterraneo.example del 27/10/2026 16:20' },
      analyzed: { action: 'Reclamación analizada', detail: 'CLM-2026-1028 · lote PRM-2610-0388' },
      after_analysis: [
        { action: 'No conformidad registrada en borrador', detail: 'NC-2026-1028 · SAP QM · vinculada a CLM-2026-1028' },
        { action: 'Borrador 8D preparado', detail: 'NC-2026-1028 · D1–D8 · potencia de la vitamina E como hipótesis' },
        { action: 'Respuesta al cliente redactada', detail: 'CLM-2026-1028 · español · versión 1 · pendiente de aprobación' }
      ],
      approved: { action: 'Respuesta aprobada y enviada', detail: 'CLM-2026-1028 · a calidad@piensos-cuenca-mediterraneo.example · NC-2026-1028' },
      after_approval: [
        { action: 'Bloqueo cautelar aplicado', detail: 'SAP QM · PRM-2610-0388 (2 t) y MP-2610-VE-044 (1,2 t)' },
        { action: 'Caso actualizado', detail: 'NC-2026-1028 · En curso · respuesta adjunta' }
      ]
    },
    outcome_label: 'Respuesta enviada · NC-2026-1028 en curso',
    toast_analyzed: 'Reclamación analizada · 8D y respuesta en borrador',
    status_chips: { idle: 'Abierta · sin analizar', pending: 'Esperando aprobación', approved: 'Respuesta enviada · 8D en curso', rejected: 'Respuesta rechazada' },
    report: {
      button: 'Descargar informe 8D',
      title: 'Informe 8D · reclamación CLM-2026-1028',
      subtitle: 'Vitamina E un 18 % inferior a la declarada · lote PRM-2610-0388 · Piensos Cuenca Mediterráneo, S.A.',
      filename: 'informe-8D-NC-2026-1028-CLM-2026-1028',
      meta: [['Sede', 'Planta de premezclas (España) · Madrid'], ['Reclamación', 'CLM-2026-1028 · 27/10/2026'], ['Lote', 'PRM-2610-0388'], ['Informe al cliente', 'antes del 10/11/2026']],
      state: { pending: 'Borrador · pendiente de aprobación', approved: 'Aprobado para envío · D4 abierta', rejected: 'Borrador · respuesta rechazada' },
      summary: [
        'Reclamación de Piensos Cuenca Mediterráneo por el contenido de vitamina E del lote PRM-2610-0388 de premezcla para vacuno de leche: su análisis (LAB-CLI-2610-77) da 9.840 mg/kg frente a 12.000 mg/kg declarados (-18 %); el análisis de liberación de Norel (LAB-2610-0871) dio 11.950 mg/kg. Se entregaron 10 t el 16/10/2026 y el cliente ha suspendido su uso.',
        'Hipótesis de causa, pendiente de confirmar por el Laboratorio: potencia de la vitamina E de MP-2610-VE-044 inferior a la del certificado del proveedor, sin detectar en la recepción; también se valoran la toma de muestra del cliente y el método analítico.'
      ],
      trace_heading: 'Anexo A · Traza del lote',
      trace_rows: [
        { etapa: 'Materia prima', fecha: '06/10/2026', detalle: 'Entrada de vitamina E acetato 50 % de Nutrivit Ingredients, S.L. con certificado del 50,4 % de potencia; sin análisis de potencia en la recepción', ref: 'MP-2610-VE-044' },
        { etapa: 'Fabricación', fecha: '13/10/2026', detalle: 'Orden de fabricación de 12 t de premezcla para vacuno de leche en la Planta de premezclas (España) · MES de planta', ref: 'OF-2610-0388' },
        { etapa: 'Liberación', fecha: '14/10/2026 09:12', detalle: 'Vitamina E 11.950 mg/kg frente a 12.000 declarados (-0,4 %) · lote liberado · muestra de retención conservada', ref: 'LAB-2610-0871' },
        { etapa: 'Lote', fecha: '14/10/2026', detalle: 'Lote de premezcla de vitaminas y oligoelementos para vacuno de leche · SAP S/4HANA', ref: 'PRM-2610-0388' },
        { etapa: 'Controles', fecha: '16/10/2026', detalle: 'Pesada (conforme); limpieza de línea (conforme); análisis de liberación (conforme); sin control de potencia de la vitamina E por lote de materia prima en la recepción', ref: '—' },
        { etapa: 'Entrega', fecha: '16/10/2026', detalle: '10 t entregadas a Piensos Cuenca Mediterráneo, S.A. (Cuenca) · pedido PV-26-10-0471', ref: 'ALB-26-10-1088' },
        { etapa: 'Reclamación', fecha: '26/10/2026', detalle: 'Análisis del cliente con vitamina E de 9.840 mg/kg', ref: 'LAB-CLI-2610-77' },
        { etapa: 'Otros lotes', fecha: '15/10 y 20/10/2026', detalle: 'Lotes fabricados con la misma materia prima: PRM-2610-0391 (14 t entregadas a Piensos del Ebro) y PRM-2610-0402 (12 t en almacén)', ref: 'PRM-2610-0391/0402' }
      ],
      units: {
        heading: 'Anexo B · Documentos y movimientos del expediente (7)',
        cols: [{ label: 'N.º', key: 'n', num: true }, { label: 'Documento', key: 'doc' }, { label: 'Referencia', key: 'ref', mono: true }, { label: 'Fecha', key: 'fecha' }, { label: 'Estado', key: 'estado', status: true }, { label: 'Sistema', key: 'sistema' }],
        rows: [
          { n: '1', doc: 'Entrada de vitamina E acetato 50 %', ref: 'MP-2610-VE-044', fecha: '06/10/2026', estado: 'Recibida', sistema: 'SAP S/4HANA' },
          { n: '2', doc: 'Orden de fabricación de 12 t', ref: 'OF-2610-0388', fecha: '13/10/2026', estado: 'Cerrada', sistema: 'MES de planta' },
          { n: '3', doc: 'Análisis de liberación de vitamina E', ref: 'LAB-2610-0871', fecha: '14/10/2026', estado: 'Liberado', sistema: 'LIMS' },
          { n: '4', doc: 'Lote de premezcla para vacuno de leche', ref: 'PRM-2610-0388', fecha: '14/10/2026', estado: 'En revisión', sistema: 'SAP S/4HANA' },
          { n: '5', doc: 'Albarán de 10 t a Piensos Cuenca Mediterráneo', ref: 'ALB-26-10-1088', fecha: '16/10/2026', estado: 'Entregado', sistema: 'SAP S/4HANA' },
          { n: '6', doc: 'Remanente de PRM-2610-0388 (2 t)', ref: 'STK-0388', fecha: '28/10/2026', estado: 'Disponible', estado_after: 'Bloqueado', sistema: 'SAP S/4HANA' },
          { n: '7', doc: 'Remanente de MP-2610-VE-044 (1,2 t)', ref: 'STK-VE044', fecha: '28/10/2026', estado: 'Disponible', estado_after: 'Bloqueado', sistema: 'SAP S/4HANA' }
        ]
      },
      history_heading: 'Anexo C · Reclamaciones anteriores (12 meses)',
      approvals: [
        { paso: 'Borradores 8D y respuesta', rol: 'Agentic Platform · agente Reclamaciones de cliente', kind: 'agent' },
        { paso: 'Respuesta al cliente y contención (D3)', rol: 'Responsable de operaciones y calidad', kind: 'reply' },
        { paso: 'Confirmación de la causa raíz (D4)', rol: 'Jefe de laboratorio', kind: 'pending' },
        { paso: 'Cierre del 8D (D8)', rol: 'Responsable de calidad y seguridad alimentaria (APPCC)', kind: 'pending' }
      ],
      second_signer: { role: 'Responsable de calidad y seguridad alimentaria (APPCC)', note: 'Confirmación de causa (D4) y cierre (D8) · pendiente' }
    },
    presenter: {
      running: 'Mientras corre: señalar la línea de SAP (vitamina E recibida sin análisis de potencia) y la de Salesforce (reclamación parecida de vitamina A). Si hace falta, «Acelerar».',
      idle: [
        'Correo de Elena Marín, de Piensos Cuenca Mediterráneo: su análisis da un 18 % menos de vitamina E de la declarada en el lote PRM-2610-0388. Llegó el martes 27/10 a las 16:20, en español y con plazos: acuse en 24 h e informe 8D en 10 días hábiles.',
        'En producción, Agentic Platform lo analiza en cuanto entra en el buzón de Atención al cliente y pedidos. Aquí lo lanzamos a mano para ver qué hace y qué sistemas consulta.'
      ],
      pending: [
        'Lo resaltado en el correo es lo que Agentic Platform ha extraído. Cada dato se comprueba en SAP, el MES y el LIMS: el lote existe, el albarán coincide y el análisis de liberación fue conforme.',
        'La traza: vitamina E recibida el 06/10, fabricación el 13/10, liberación el 14/10 con 11.950 mg/kg y entrega de 10 t el 16/10. La misma materia prima está en otros dos lotes.',
        'El dato que cambia la investigación: la potencia de MP-2610-VE-044 solo consta en el certificado del proveedor. Es una hipótesis, no la causa: la confirma el Laboratorio con un nuevo ensayo.',
        'Histórico: en julio hubo una diferencia de vitamina A con una causa del mismo tipo (CLM-2026-0731). El 8D lo recoge en la prevención (D7).',
        'La respuesta en español confirma hechos y fechas y no adelanta la causa ni promete la sustitución. No sale hasta que Operaciones y calidad la aprueba.'
      ],
      approved: [
        'Aprobada: respuesta enviada, remanente bloqueado y la no conformidad NC-2026-1028 en curso en SAP QM. Todo queda en el registro de auditoría.',
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
