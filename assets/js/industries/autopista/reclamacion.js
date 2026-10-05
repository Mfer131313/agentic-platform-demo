/* Autopista Multimotor · reclamación REC-2026-0512 (disputa de TAE en la financiación del Seat Ibiza de José María López, con Banco Sabadell).
 * Escenario de la demo con datos sintéticos (MFM). */
agenticPack('autopista', {
  reclamacion: {
    code: 'REC-2026-0512',
    nav: 'Reclamación REC-2026-0512',
    title: 'Reclamación REC-2026-0512',
    agent: 'Reclamaciones de cliente',
    analyze_label: 'Analizar reclamación',
    nc: 'CAS-2026-0512',
    form: { code: 'REG-ATC-012-02', rev: '3' },
    received: { date: '2026-10-03', time: '10:14' },
    due: '2026-10-09',
    holidays: [],
    customer_line: 'José María López · particular · Seat Ibiza financiado con Banco Sabadell',
    due_line: 'Respuesta antes del 09/10/2026',
    cust_name: 'José María López',
    cust_addr: 'jm.lopez@correo-demo.example',
    own_name: 'Atención al cliente, Autopista Multimotor',
    own_addr: 'atencion.cliente@autopista-multimotor.example',
    mail_domain: 'autopista-multimotor.example',
    mail_sub: 'jm.lopez@correo-demo.example · buzón atencion.cliente@autopista-multimotor.example · español',
    mail_title: 'Correo del cliente',
    mail_tab_label: 'Correo (español)',
    attachments: ['REC-2026-0512_oferta_firmada.pdf', 'REC-2026-0512_contrato_financiacion.pdf'],
    email_text: [
      'From: José María López <jm.lopez@correo-demo.example>',
      'To: Atención al cliente, Autopista Multimotor <atencion.cliente@autopista-multimotor.example>',
      'Date: Sat, 03 Oct 2026 10:14 (hora de Madrid)',
      'Subject: Reclamación - TAE de la financiación distinta de la acordada - Seat Ibiza VIN-2026-MAD-SEAT-03 - Contrato FIN-2026-08841',
      '',
      'Buenos días:',
      '',
      'Compré un Seat Ibiza en su concesionario de Madrid y necesito que revisen con urgencia las condiciones de mi financiación.',
      '',
      'Vehículo: Seat Ibiza 1.0 TSI FR',
      'Bastidor: VIN-2026-MAD-SEAT-03',
      'Contrato de financiación: FIN-2026-08841 (Banco Sabadell)',
      'Fecha de la firma: 18/09/2026',
      'Referencia de la oferta: Q-2026-5127-02',
      '',
      'En la oferta que firmé el 16/09/2026 se me indicaba una TAE del 3,99 %, pero el contrato que me han pasado a la firma el 18/09/2026 recoge una TAE del 4,25 %. Nadie me avisó del cambio y lo he visto ahora, al revisar el cuadro de amortización. Adjunto la oferta firmada y el contrato.',
      '',
      'Solicito que se corrija el contrato a la TAE acordada del 3,99 %, o que se me permita cancelarlo sin penalización. Les pido que no se cobre la primera cuota hasta que se aclare.',
      '',
      'Les pido una respuesta por escrito en un plazo de 5 días hábiles, con la explicación de la diferencia y la copia de los documentos firmados. Confirmen por favor la recepción e indíquenme el número de su expediente.',
      '',
      'Un saludo,',
      '',
      'José María López'
    ].join('\n'),
    highlights: [
      { text: 'Seat Ibiza 1.0 TSI FR', label: 'Vehículo', tone: 'brand' },
      { text: 'VIN-2026-MAD-SEAT-03', label: 'VIN', tone: 'brand' },
      { text: 'FIN-2026-08841', label: 'Contrato', tone: 'brand' },
      { text: 'Q-2026-5127-02', label: 'Oferta' },
      { text: 'TAE del 3,99 %', label: 'TAE acordada', tone: 'ok' },
      { text: 'TAE del 4,25 %', label: 'TAE en contrato', tone: 'crit' },
      { text: 'Adjunto la oferta firmada y el contrato.', label: 'Evidencia' },
      { text: 'no se cobre la primera cuota', label: 'Cobro' },
      { text: 'en un plazo de 5 días hábiles', label: 'Plazo' }
    ],
    run: {
      title: 'Workflow «Reclamación de cliente»',
      sub: 'Se lanza al entrar una reclamación en el buzón de Atención al cliente · PNT-ATC-012',
      graph_title: 'Workflow de reclamación de cliente',
      idle_footer: 'Lee el correo, extrae y valida los datos, traza la venta y prepara el 8D y la respuesta. Nada sale sin la aprobación del Responsable de operaciones.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Correo de cliente', sub: 'Buzón de Atención al cliente', systems: ['Google Workspace'], icon: 'mail' },
        { id: 'extraccion', label: 'Extracción y validación', systems: ['Modelo de lenguaje', 'Salesforce CRM'], icon: 'search' },
        { id: 'traza', label: 'Traza de la venta', systems: ['Salesforce CRM', 'DocuSign', 'SAP ERP', 'Odoo Inventario'], icon: 'git-branch' },
        { id: 'historico', label: 'Histórico, 8D y respuesta', systems: ['Salesforce CRM', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Aprobación de operaciones', sub: 'Responsable de operaciones' },
        { id: 'salida', kind: 'output', label: 'Respuesta y contención', systems: ['Google Workspace', 'SAP ERP', 'Salesforce CRM'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'aprobado' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Cuotas del contrato · 48 meses, la 1.ª vence el 01/11', value: 48 },
        { label: 'Diferencia de TAE · 3,99 % acordado frente a 4,25 %', value: '+0,26 pp', tone: 'warn' },
        { label: 'Reclamación parecida · REC-2026-0318', value: 1, tone: 'warn' },
        { label: 'Días hábiles para la respuesta · vence el 09/10/2026', due: true }
      ]
    },
    steps: [
      { system: 'Google Workspace', action: 'Lee el correo de jm.lopez@correo-demo.example en el buzón atencion.cliente@autopista-multimotor.example (03/10/2026 10:14)', result: 'Reclamación de cliente en español · 2 documentos adjuntos (oferta firmada y contrato)', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extrae los datos de la reclamación', result: 'VIN-2026-MAD-SEAT-03 · Seat Ibiza 1.0 TSI FR · contrato FIN-2026-08841 · TAE 3,99 % acordada frente a 4,25 % en el contrato · respuesta en 5 días hábiles', ms: 2900 },
      { system: 'Salesforce CRM', action: 'Valida el vehículo y el cliente extraídos', result: 'El vehículo existe: Seat Ibiza 1.0 TSI FR, VIN-2026-MAD-SEAT-03, vendido a José María López el 18/09/2026. Coincide con el correo', ms: 410, tone: 'ok' },
      { system: 'Salesforce CRM', action: 'Origen de la venta', result: 'Oportunidad OPP-2026-5127 · presupuesto Q-2026-5127-02 del 12/09/2026 con financiación a 48 meses y TAE 3,99 % (campaña de Banco Sabadell)', ms: 380 },
      { system: 'DocuSign', action: 'Documentos firmados de la operación', result: 'Oferta ENV-DS-77412 firmada el 16/09/2026 con TAE 3,99 % · contrato ENV-DS-77590 firmado el 18/09/2026 con TAE 4,25 %', ms: 350 },
      { system: 'SAP ERP', action: 'Contrato de financiación FIN-2026-08841', result: '16.900 € a 48 meses · TAE 4,25 % · cuota de 382,87 € (con 3,99 % serían 380,97 €: 1,90 € al mes y 91,00 € en total)', ms: 520 },
      { system: 'SAP ERP', action: 'Tarifas de Banco Sabadell vigentes el día de la firma', result: 'CAMP-SAB-0926 (3,99 %) cerró el 15/09/2026; desde el 16/09 rige la tarifa estándar del 4,25 % · la oferta de Salesforce no se actualizó', ms: 430, tone: 'warn' },
      { system: 'Odoo Inventario', action: 'Localiza el vehículo', result: 'Seat Ibiza 1.0 TSI FR entregado el 24/09/2026 desde el hub de Madrid · sin incidencias de entrega', ms: 460 },
      { system: 'Stripe Pagos', action: 'Cobros y desembolso de la operación', result: 'STR-PAY-90412: entrada de 3.000 € cobrada el 18/09 · Banco Sabadell desembolsó 16.900 € el 22/09 · 1.ª cuota (SEPA) programada para el 01/11/2026', ms: 390 },
      { system: 'Salesforce CRM', action: 'Busca reclamaciones parecidas en los últimos 12 meses', result: '4 reclamaciones con caso abierto · 1 parecida: REC-2026-0318 (TAE 2,99 % ofrecida y 3,49 % en el contrato)', ms: 540, tone: 'warn' },
      { system: 'Procedimientos', action: 'Consulta PNT-ATC-012, PNT-FIN-007 y IT-VEN-FIN-02', result: 'Informe 8D en 5 días hábiles: antes del 09/10/2026 · IT-VEN-FIN-02 pide comparar la TAE de la oferta y del contrato antes de la firma', ms: 380 },
      { system: 'Modelo de lenguaje', action: 'Redacta el borrador 8D (D1–D8) con responsables por rol y fechas', result: 'Borrador completo · el origen en la campaña caducada queda como hipótesis por confirmar', ms: 5200 },
      { system: 'Salesforce CRM', action: 'Registra el caso y lo vincula a la reclamación', result: 'CAS-2026-0512 abierto en borrador · vinculado a REC-2026-0512', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Redacta la respuesta en español y su traducción de control', result: 'Borrador listo: acuse de recibo, referencia CAS-2026-0512, pausa de la 1.ª cuota y fecha del informe · pendiente de aprobación', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'VIN-2026-MAD-SEAT-03',
      noun: 'vehículo',
      label: 'Bastidor (VIN)',
      fix_title: 'el vehículo de la reclamación',
      systems: 'Salesforce/SAP',
      systems_short: 'Salesforce/SAP',
      fix_text: 'Si el cliente ha copiado mal el bastidor, escribe el VIN correcto. Agentic Platform lo busca en Salesforce y SAP y comprueba que corresponde al vehículo reclamado antes de cambiar nada.',
      same_body: 'Existe en Salesforce/SAP y corresponde al Seat Ibiza 1.0 TSI FR vendido a José María López. Sin cambios.',
      unknown_hint: 'Si el VIN del cliente es dudoso, pide una foto de la ficha técnica o del contrato.',
      mismatch_body: 'Existe en Salesforce, pero no es el Seat Ibiza VIN-2026-MAD-SEAT-03 de la reclamación: no se cambia la ficha.',
      known: {
        'VIN-2026-MAD-BMW-04': { kind: 'mismatch', title: 'El vehículo VIN-2026-MAD-BMW-04 no corresponde a esta reclamación', body: 'Existe en Odoo, pero es un BMW X3 en stock crítico en el hub de Madrid, sin venta asociada. La reclamación es del Seat Ibiza VIN-2026-MAD-SEAT-03: no se cambia la ficha.' },
        'VIN-2026-MAD-BMW-12': { kind: 'mismatch', title: 'VIN-2026-MAD-BMW-12 es el vehículo de otra reclamación, no el de esta', body: 'Es un BMW X5 40d de Empresa de Transportes Ibérica, con la reclamación REC-2026-0451 abierta por costuras rotas en la tapicería. No es el vehículo reclamado por José María López. No se cambia la ficha.' },
        'VIN-2026-MAD-VW-07': { kind: 'mismatch', title: 'El vehículo VIN-2026-MAD-VW-07 no corresponde a esta reclamación', body: 'Existe en iCare Taller, pero es un VW Golf afectado por la campaña de revisión del ABS, sin relación con la financiación de José María López. No se cambia la ficha.' }
      }
    },
    sheet: {
      sub: 'Datos extraídos del correo y comprobados en Salesforce, DocuSign y SAP',
      empty_text: 'Agentic Platform extraerá del correo el vehículo, el contrato, la TAE, la referencia y el plazo, y los comprobará en Salesforce y SAP antes de preparar el 8D y la respuesta.',
      rows: [
        { k: 'Referencia', v: 'REC-2026-0512', code: true, sub: 'Referencia de la reclamación del cliente' },
        { k: 'Cliente', v: 'José María López', sub: 'Particular · cliente de Salesforce · financiación con Banco Sabadell' },
        { k: 'Vehículo', v: 'Seat Ibiza 1.0 TSI FR', ok: 'Coincide con el pedido de venta en SAP' },
        { k: 'Bastidor', lot: true, ok: 'Existe en Salesforce/SAP · vendido el 18/09/2026 · entregado el 24/09/2026' },
        { k: 'Contrato', v: 'FIN-2026-08841', code: true, ok: 'Coincide con SAP · 16.900 € a 48 meses' },
        { k: 'Discrepancia', v: 'TAE 3,99 % en la oferta frente a 4,25 % en el contrato', sub: 'Diferencia de 1,90 € al mes y 91,00 € en total' },
        { k: 'Petición', v: 'Corregir la TAE o cancelar sin penalización', sub: 'Y no cobrar la primera cuota hasta aclararlo' },
        { k: 'Evidencias', v: '2 documentos adjuntos · oferta y contrato firmados en DocuSign' },
        { k: 'Fechas', v: 'Oferta: 16/09/2026 · contrato: 18/09/2026 · en Atención al cliente: 03/10/2026 10:14' },
        { k: 'Plazo', v: 'Respuesta antes del 09/10/2026', due: true, sub: '5 días hábiles desde la recepción · PNT-ATC-012' },
        { k: 'Registro', v: 'CAS-2026-0512', code: true, sub: 'Caso en Salesforce, vinculado a la reclamación' }
      ]
    },
    requests: {
      title: 'Lo que pide el cliente',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Acuse de recibo y número de expediente', meta: ['Respuesta al cliente · CAS-2026-0512'], quote: 'Confirmen por favor la recepción e indíquenme el número de su expediente', side: { pending: { status: 'waiting', label: 'Pendiente de aprobación' }, approved: { status: 'sent', label: 'Enviado' }, rejected: { status: 'rejected', label: 'No enviado' } } },
        { icon: 'check-circle', tone: 'ok', title: 'Copia de la oferta y del contrato firmados', meta: ['D2 y anexo A del 8D'], quote: 'la copia de los documentos firmados', side: { status: 'ok', label: 'Reunida' } },
        { icon: 'clock', tone: 'warn', title: 'Explicación de la diferencia entre el 3,99 % y el 4,25 %', meta: ['D4 · campaña CAMP-SAB-0926 y FIN-2026-08841'], quote: 'con la explicación de la diferencia', side: { status: 'review', label: 'Falta valorarla' } },
        { icon: 'clock', tone: 'warn', title: 'Corregir el contrato a la TAE acordada o cancelarlo sin penalización', meta: ['D4, D5 y D7 del 8D'], quote: 'Solicito que se corrija el contrato a la TAE acordada del 3,99 %, o que se me permita cancelarlo sin penalización', side: { status: 'review', label: 'Hipótesis' } },
        { icon: 'check-circle', tone: 'ok', title: '¿Se puede pausar el cobro de la primera cuota?', meta: ['D3 · 1.ª cuota SEPA del 01/11/2026'], quote: 'Les pido que no se cobre la primera cuota hasta que se aclare', side: { pending: { status: 'ok', label: 'Localizada' }, approved: { status: 'hold', label: '1.ª cuota pausada' }, rejected: { status: 'ok', label: 'Localizada' } } },
        { icon: 'calendar', tone: 'warn', title: 'Respuesta por escrito en 5 días hábiles', meta: ['Envío del 8D (D1–D5)'], quote: 'en un plazo de 5 días hábiles', side: { status: 'pending', label: 'Antes del 09/10' } }
      ]
    },
    trace: {
      title: 'Traza del vehículo VIN-2026-MAD-SEAT-03',
      sub: 'Salesforce CRM, DocuSign, SAP ERP, Odoo Inventario y Stripe · hacia atrás y hacia delante',
      button_code: 'VIN-2026-MAD-SEAT-03',
      button_label: 'Traza completa · 7 documentos',
      back_title: 'Hacia atrás',
      back: [
        { time: '15/09', title: 'Financiación · campaña de Banco Sabadell', text: 'La tarifa promocional del 3,99 % para el Seat Ibiza tenía vigencia hasta el 15/09/2026; desde el 16/09 rige la tarifa estándar del 4,25 %.', tone: 'warn', ref: 'CAMP-SAB-0926', chip: { status: 'open', label: 'Vencida el 15/09, sin actualizar en el presupuesto' } },
        { time: '16/09', title: 'Venta · oferta firmada en DocuSign', text: 'Q-2026-5127-02 (12/09/2026) · 16.900 € a 48 meses · TAE 3,99 % · firmada por José María López con ENV-DS-77412', tone: 'brand', ref: 'Q-2026-5127-02' },
        { time: '18/09', timeSub: '10:42', title: 'Contrato de financiación FIN-2026-08841', text: '16.900 € a 48 meses · TAE 4,25 % · cuota de 382,87 € (la oferta decía 380,97 €) · firmado con ENV-DS-77590', tone: 'warn', ref: 'FIN-2026-08841' },
        { time: '18/09', title: 'Proceso · venta financiada de Madrid', route: ['OPP-5127', 'Q-02', 'ENV-DS-77412', 'FIN-08841', 'ENV-DS-77590', 'SO-14203'], route_mark: 'FIN-08841', text: 'Pedido SO-2026-14203 · entrega el 24/09/2026 desde Odoo Inventario', tone: 'brand' },
        { time: '18/09', title: 'Controles de la venta', text: 'Identidad y scoring aprobados por Banco Sabadell · documentación completa · sin control automático que compare la TAE de la oferta con la del contrato', tone: 'ok' }
      ],
      fwd_title: 'Hacia delante',
      fwd_cols: { id: 'Movimiento', qty: 'Importe', when: 'Fecha', status: 'Estado' },
      fwd: [
        { id: 'STR-PAY-90412', dest: 'Entrada de la operación', sub: 'Stripe Pagos · José María López', qty: '3.000 €', when: '18/09/2026 12:05', status: { pending: { status: 'shipped', label: 'Cobrada' }, approved: { status: 'shipped', label: 'Cobrada' }, rejected: { status: 'shipped', label: 'Cobrada' } } },
        { id: 'SAB-DES-0922', dest: 'Desembolso de Banco Sabadell', sub: 'FIN-2026-08841 · principal financiado', qty: '16.900 €', when: '22/09/2026 09:30', status: { pending: { status: 'shipped', label: 'Desembolsado' }, approved: { status: 'shipped', label: 'Desembolsado' }, rejected: { status: 'shipped', label: 'Desembolsado' } } },
        { id: 'CUOTA-1', dest: 'Primera cuota (domiciliación SEPA)', sub: 'FIN-2026-08841 · cuota de 382,87 € frente a 380,97 € de la oferta', qty: '382,87 €', when: '01/11/2026', status: { pending: { status: 'pending', label: 'Pausa propuesta' }, approved: { status: 'hold', label: 'Pausada' }, rejected: { status: 'pending', label: 'Pausa propuesta' } } }
      ],
      fwd_note: '48 cuotas · 18.377,68 € con la TAE del contrato frente a 18.286,68 € con la acordada: 91,00 € de diferencia en total. Aún no se ha cobrado ninguna cuota.',
      hypothesis: {
        title: 'Hipótesis de causa probable · a confirmar por Finanzas',
        icon: 'wrench',
        paras: [
          'La campaña CAMP-SAB-0926 al 3,99 % cerró el 15/09/2026 y la oferta Q-2026-5127-02 se firmó el 16/09 con esa tarifa; el contrato se generó el 18/09 con la tarifa estándar del 4,25 %.',
          'Por aclarar: la oferta se emitió el 12/09, dentro de la campaña, y Banco Sabadell pudo mantener la tarifa a las ofertas firmadas hasta cierta fecha. Se pidió al banco su criterio de vigencia y no hay respuesta todavía.',
          'Se confirma con el documento original de la oferta, las condiciones de la campaña y la respuesta de Banco Sabadell. Hasta entonces no se comunica la causa al cliente.'
        ]
      }
    },
    history: {
      sub: 'Salesforce CRM · reclamaciones con caso abierto · últimos 12 meses',
      col_id: 'Reclamación',
      col_product: 'Vehículo y bastidor',
      col_cause: 'Causa raíz',
      rows: [
        { id: 'REC-2026-0318', date: '2026-06-12', product: 'Seat Arona 1.0 TSI (venta financiada)', lot: 'VIN-2026-MAD-SEAT-01', description: 'TAE 2,99 % ofrecida y 3,49 % en el contrato de financiación', category: 'Financiación', customer_label: 'Particular', root_cause: 'Plantilla de presupuesto de Salesforce con la tarifa de campaña ya caducada', nc: 'CAS-2026-0318', status: 'cerrada (30/06/2026)', similar: true },
        { id: 'REC-2026-0204', date: '2026-07-15', product: 'Audi Q3 (alquiler)', lot: 'VIN-2026-MAD-AUDI-09', description: 'Rayón en la puerta que el cliente niega haber causado', category: 'Alquiler', customer_label: 'Empresa de alquiler corporativo', root_cause: 'Fotos de entrada incompletas en la entrega del vehículo', nc: 'CAS-2026-0233', status: 'cerrada', similar: false },
        { id: 'REC-2026-0131', date: '2026-05-07', product: 'VW Golf 1.5 TSI', lot: 'VIN-2026-MAD-VW-02', description: 'Fallo del sensor de aparcamiento tras la entrega', category: 'Calidad', customer_label: 'Particular', root_cause: 'Conector del sensor mal ajustado en la inspección previa a la entrega', nc: 'CAS-2026-0158', status: 'cerrada', similar: false },
        { id: 'REC-2026-0042', date: '2026-02-20', product: 'Skoda Octavia (suscripción)', lot: 'VIN-2026-MAD-SKO-05', description: 'Revisión de los 15.000 km no realizada', category: 'Mantenimiento', customer_label: 'Suscriptor particular', root_cause: 'Aviso de iCare Taller sin enviar al cliente', nc: 'CAS-2026-0097', status: 'cerrada', similar: false }
      ],
      note: {
        title: 'Mismo tipo de causa que REC-2026-0318',
        body: 'TAE del 2,99 % ofrecida y del 3,49 % en el contrato (12/06/2026): plantilla de presupuesto de Salesforce con la tarifa de campaña caducada; CAS-2026-0318 cerrada (30/06/2026). Si se confirma la hipótesis de CAMP-SAB-0926, sería la segunda discrepancia de TAE por una campaña de financiación caducada en menos de cuatro meses: el 8D propone en D7 un control que compare la TAE de la oferta y la del contrato antes de la firma.'
      }
    },
    plan: {
      title: 'Borrador 8D · CAS-2026-0512',
      sub: 'PNT-ATC-012 · al cliente antes del 09/10/2026 con D1–D5; D6–D8 en seguimiento',
      col_label: 'Disciplina',
      containment_status: { pending: { text: 'Pendiente de aprobación', tone: 'warn' }, approved: { text: 'Aplicada', tone: 'ok' }, rejected: { text: 'No aplicada', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Equipo', owner: ['Responsable de operaciones'], date: '2026-10-07', status: { text: 'Propuesto', tone: 'draft' }, lead: 'Líder: Responsable de operaciones.', items: ['Equipo de atención al cliente: investigación y contacto con el cliente', 'Responsable de finanzas: contrato FIN-2026-08841 y comunicación con Banco Sabadell', 'Jefe de turno de ventas: oferta Q-2026-5127-02 y plantilla de presupuesto', 'Responsable de operaciones: cobro de la primera cuota y entrega'], note: 'Contacto externo: José María López y gestor de Banco Sabadell.' },
        { d: 'D2', title: 'Descripción del problema', owner: ['Equipo de atención al cliente'], date: '2026-10-07', status: { text: 'Completo', tone: 'ok' }, lead: 'José María López reclama porque el contrato de financiación de su Seat Ibiza recoge una TAE del 4,25 % y la oferta firmada decía el 3,99 %.', items: ['Vehículo VIN-2026-MAD-SEAT-03, contrato FIN-2026-08841: 16.900 € a 48 meses, vendido el 18/09/2026 y entregado el 24/09/2026', 'Oferta firmada el 16/09/2026 (ENV-DS-77412); contrato firmado el 18/09/2026 (ENV-DS-77590)', 'Diferencia de 1,90 € al mes y 91,00 € en total; aún no se ha cobrado ninguna cuota', 'Evidencias: oferta y contrato en DocuSign; reclamación recibida el 03/10/2026 10:14'] },
        { d: 'D3', title: 'Contención', owner: ['Responsable de operaciones', 'Responsable de finanzas'], date: '2026-10-07', containment: true, items: ['Pausar el cobro de la primera cuota de FIN-2026-08841 (SEPA del 01/11/2026) en SAP ERP. Requiere aprobación (PNT-FIN-007)', 'Pedir a Banco Sabadell que confirme la tarifa aplicable a las ofertas firmadas el 16/09/2026', 'Mantener al cliente informado por escrito con la referencia CAS-2026-0512', 'Revisar en Salesforce y SAP las ventas financiadas entre el 16/09/2026 y hoy con campaña caducada'] },
        { d: 'D4', title: 'Causa raíz', owner: ['Responsable de finanzas', 'Jefe de turno de ventas'], date: '2026-10-08', status: { text: 'Hipótesis', tone: 'warn' }, lead: 'Hipótesis principal, a confirmar: la oferta se firmó el 16/09/2026 con la tarifa de la campaña CAMP-SAB-0926, que había cerrado el 15/09, y el contrato del 18/09 se generó con la tarifa estándar del 4,25 %.', items: ['A favor: la oferta se firmó un día después del cierre de la campaña; REC-2026-0318 tuvo una causa del mismo tipo (tarifa de campaña caducada)', 'Por aclarar: el presupuesto Q-2026-5127-02 es del 12/09, dentro de la campaña, y el banco puede respetar la tarifa a las ofertas firmadas', 'Verificación: documento original de la oferta, condiciones de la campaña, respuesta de Banco Sabadell y análisis de 5 porqués'] },
        { d: 'D5', title: 'Acciones correctivas', owner: ['Responsable de finanzas'], date: '2026-10-09', status: { text: 'Planificado', tone: 'info' }, items: ['Corregir FIN-2026-08841 a la TAE acordada o formalizar la cancelación sin penalización, según el criterio del banco', 'Emitir el cuadro de amortización corregido y reprogramar la primera cuota'] },
        { d: 'D6', title: 'Implantación y eficacia', owner: ['Equipo de atención al cliente'], date: '2026-10-16', status: { text: 'Planificado', tone: 'info' }, items: ['Confirmar con el cliente que el cuadro corregido es el acordado y que la primera cuota se cobra con la TAE correcta', 'Comprobar que no hay otras ventas financiadas con la misma diferencia'] },
        { d: 'D7', title: 'Prevención de la recurrencia', owner: ['Responsable de operaciones'], date: '2026-10-23', status: { text: 'Planificado', tone: 'info' }, items: ['Revisar IT-VEN-FIN-02: comparar la TAE de la oferta con la del contrato antes de enviarlo a firma en DocuSign', 'Bloquear en Salesforce los presupuestos cuya campaña de financiación haya caducado (causa del mismo tipo que CAS-2026-0318)', 'Aviso automático cuando el contrato de SAP ERP tenga una TAE distinta de la oferta'] },
        { d: 'D8', title: 'Cierre y reconocimiento', owner: ['Responsable de operaciones'], date: '2026-10-30', status: { text: 'Planificado', tone: 'info' }, items: ['Informe final a José María López y cierre de CAS-2026-0512 en Salesforce con la evidencia de eficacia', 'Reconocimiento al equipo'] }
      ]
    },
    reply: {
      to_label: 'al cliente',
      subject: 'RE: Reclamación - TAE de la financiación distinta de la acordada - Seat Ibiza VIN-2026-MAD-SEAT-03 - Contrato FIN-2026-08841 - Ref. CAS-2026-0512',
      sub: 'Para jm.lopez@correo-demo.example · en español',
      tab_label: 'Español · se envía',
      text: [
        'Estimado Sr. López:',
        '',
        'Gracias por su correo del 3 de octubre de 2026. Confirmamos la recepción de su reclamación REC-2026-0512 sobre la TAE del contrato de financiación FIN-2026-08841 de su Seat Ibiza 1.0 TSI FR (VIN-2026-MAD-SEAT-03): su oferta del 16/09/2026 indicaba una TAE del 3,99 % y el contrato del 18/09/2026 recoge un 4,25 %. Lamentamos las molestias que esto le ha causado.',
        '',
        'Su número de expediente es CAS-2026-0512. Estamos revisando la operación con nuestro equipo de Finanzas y con Banco Sabadell, y la reclamación se documentará en un informe 8D.',
        '',
        'Primeros datos de nuestros registros:',
        '- Documentos: hemos localizado la oferta firmada el 16/09/2026 (3,99 %) y el contrato firmado el 18/09/2026 (4,25 %), ambos en DocuSign. Le adjuntaremos copia de los dos.',
        '- Importe: sobre 16.900 € a 48 meses, la diferencia sería de 1,90 € al mes y 91,00 € en total.',
        '- Cobros: no se ha cobrado ninguna cuota. Hemos propuesto pausar el cobro de la primera, prevista para el 01/11/2026, hasta aclarar la situación.',
        '',
        'Próximos pasos:',
        '- Pediremos a Banco Sabadell que confirme la tarifa aplicable a su oferta.',
        '- Le enviaremos por escrito el informe con la explicación de la diferencia y la solución, a más tardar el 9 de octubre de 2026.',
        '- Si lo desea, puede indicarnos si prefiere la corrección del contrato o su cancelación, para tenerlo en cuenta en la propuesta.',
        '',
        'Un saludo,',
        '',
        'Atención al cliente',
        'Autopista Multimotor · Madrid',
        'atencion.cliente@autopista-multimotor.example'
      ].join('\n'),
      highlights: [
        { text: 'CAS-2026-0512', label: 'Referencia', tone: 'brand' },
        { text: 'Hemos propuesto pausar el cobro de la primera', label: 'Contención', tone: 'brand' },
        { text: 'a más tardar el 9 de octubre de 2026', label: 'Compromiso', tone: 'brand' }
      ],
      llm_instructions: [
        'Tono cordial, formal y profesional, de Atención al cliente de Autopista Multimotor a José María López, un cliente particular que reclama por la TAE de la financiación de su Seat Ibiza. Lamenta las molestias sin reconocer culpa.',
        'Agradece el correo del 3 de octubre de 2026 y acusa recibo de la reclamación REC-2026-0512 sobre el contrato FIN-2026-08841 (Seat Ibiza 1.0 TSI FR, VIN-2026-MAD-SEAT-03): la oferta del 16/09/2026 decía TAE 3,99 % y el contrato del 18/09/2026 recoge 4,25 %.',
        'Da el número de expediente CAS-2026-0512 y di que se revisa con Finanzas y con Banco Sabadell y se documentará en un informe 8D.',
        'Primeros datos: oferta y contrato localizados en DocuSign (se le adjuntará copia); sobre 16.900 € a 48 meses la diferencia sería de 1,90 € al mes y 91,00 € en total; no se ha cobrado ninguna cuota y se propone pausar la primera, prevista para el 01/11/2026.',
        'Próximos pasos: pedir a Banco Sabadell que confirme la tarifa aplicable, enviar por escrito el informe con la explicación y la solución a más tardar el 9 de octubre de 2026 y preguntar si el cliente prefiere corrección del contrato o cancelación.',
        'No adelantes la causa (ni la campaña CAMP-SAB-0926 caducada el 15/09, ni la reclamación anterior REC-2026-0318) ni prometas la cancelación sin penalización ni la TAE del 3,99 %.',
        'Escribe en español. Firma: Atención al cliente · Autopista Multimotor · Madrid · atencion.cliente@autopista-multimotor.example'
      ],
      criterion: 'Criterio de redacción: confirma hechos de Salesforce, DocuSign y SAP y compromete fechas; no adelanta la causa (la hipótesis de la campaña caducada no está confirmada) ni promete la TAE ni la cancelación.',
      control: {
        label: 'Traducción de control (inglés)',
        note: 'Traducción de control para Cumplimiento del grupo y para quien aprueba; no se envía.',
        edited_note: 'La traducción corresponde al borrador de Agentic Platform; la versión editada incluye cambios de operaciones en el texto en español.',
        subject: 'RE: Complaint - APR different from the agreed one - Seat Ibiza VIN-2026-MAD-SEAT-03 - Contract FIN-2026-08841 - Ref. CAS-2026-0512',
        text: [
          'Dear Mr López,',
          '',
          'Thank you for your email of 3 October 2026. We confirm receipt of your complaint REC-2026-0512 about the APR in financing contract FIN-2026-08841 for your Seat Ibiza 1.0 TSI FR (VIN-2026-MAD-SEAT-03): your offer of 16/09/2026 stated an APR of 3.99% and the contract of 18/09/2026 shows 4.25%. We are sorry for the inconvenience.',
          '',
          'Your case number is CAS-2026-0512. We are reviewing the transaction with our Finance team and with Banco Sabadell, and the complaint will be documented in an 8D report.',
          '',
          'Initial findings from our records:',
          '- Documents: we have located the offer signed on 16/09/2026 (3.99%) and the contract signed on 18/09/2026 (4.25%), both in DocuSign. We will send you a copy of both.',
          '- Amount: on EUR 16,900 over 48 months, the difference would be EUR 1.90 per month and EUR 91.00 in total.',
          '- Payments: no instalment has been collected. We have proposed pausing collection of the first one, due on 01/11/2026, until the situation is clarified.',
          '',
          'Next steps:',
          '- We will ask Banco Sabadell to confirm the rate that applies to your offer.',
          '- We will send you in writing the report with the explanation of the difference and the solution, by 9 October 2026 at the latest.',
          '- If you wish, you can tell us whether you prefer the contract to be corrected or cancelled, so we can take it into account in our proposal.',
          '',
          'Kind regards,',
          '',
          'Customer Service',
          'Autopista Multimotor · Madrid',
          'atencion.cliente@autopista-multimotor.example'
        ].join('\n')
      }
    },
    approval: {
      title: 'Respuesta a José María López y contención',
      approver: 'Responsable de operaciones',
      policy: 'PNT-ATC-012 · PNT-FIN-007',
      summary: {
        pending: 'Agentic Platform ha preparado la respuesta en español para jm.lopez@correo-demo.example y la pausa del cobro de la primera cuota. No se envía ni se pausa nada hasta que Operaciones lo apruebe.',
        approved: 'Operaciones ha aprobado la respuesta y la contención. Agentic Platform ha enviado el correo a jm.lopez@correo-demo.example, ha pausado la primera cuota y ha actualizado CAS-2026-0512.',
        rejected: 'Operaciones ha rechazado la propuesta: no se ha enviado la respuesta ni se ha pausado ninguna cuota.'
      },
      scope: [
        { label: 'Respuesta en español', state: { pending: { status: 'pending', chip: 'Enviar' }, approved: { status: 'sent', chip: 'Enviada' }, rejected: { status: 'rejected', chip: 'No enviada' } } },
        { label: 'Primera cuota (SEPA)', value: '382,87 € · 01/11/2026', state: { pending: { status: 'pending', chip: 'Pausar' }, approved: { status: 'hold', chip: 'Pausada' }, rejected: { status: 'rejected', chip: 'No pausada' } } },
        { label: 'Contrato FIN-2026-08841', value: '16.900 € · 48 meses', state: { status: 'evaluate', chip: 'Consultar al banco' } }
      ],
      effects: [
        'Google Workspace: respuesta enviada desde atencion.cliente@autopista-multimotor.example',
        'SAP ERP: cobro de la primera cuota pausado en FIN-2026-08841',
        'Salesforce CRM: CAS-2026-0512 pasa a «En curso» con la respuesta adjunta'
      ],
      approve_label: 'Aprobar y enviar',
      next_step: 'Siguiente paso: confirmar la causa con Banco Sabadell (D4) y enviar el informe 8D antes del 09/10/2026.',
      toast_approved: 'Respuesta enviada a José María López · 1.ª cuota pausada en FIN-2026-08841',
      reject_text: 'No se envía la respuesta ni se pausa ninguna cuota. El motivo queda en el registro de auditoría.',
      reject_placeholder: 'Por ejemplo: esperar la respuesta de Banco Sabadell antes de contestar',
      reject_audit: 'no se envía ni se pausa nada',
      toast_rejected: 'Respuesta rechazada: no se ha enviado nada ni se ha pausado ninguna cuota'
    },
    compare: {
      rows: [
        { k: 'Personas que intervienen', hoy: '3–4: Atención al cliente, Ventas, Finanzas y el banco', pro_strong: '1', pro: ': Operaciones revisa, corrige si hace falta y aprueba' },
        { k: 'Sistemas que hay que abrir', hoy: '6: Google Workspace, Salesforce, DocuSign, SAP, Stripe y Odoo', pro_strong: '1', pro: ': esta consola; Agentic Platform consulta los 6' }
      ],
      steps_today: '12–15 búsquedas, cruces y redacciones a mano',
      time_label: 'Traza, 8D en borrador y respuesta',
      time_today: '2–5 h de trabajo, repartidas en 1–2 días',
      footer: 'Criterio de aceptación propuesto para el piloto: traza y borrador en menos de 15 minutos, y Operaciones acepta el borrador con ediciones menores en al menos el 70 % de los casos.'
    },
    audit: {
      requested: { action: 'Análisis de reclamación solicitado', detail: 'REC-2026-0512 · correo de jm.lopez@correo-demo.example del 03/10/2026 10:14' },
      analyzed: { action: 'Reclamación analizada', detail: 'REC-2026-0512 · vehículo VIN-2026-MAD-SEAT-03' },
      after_analysis: [
        { action: 'Caso registrado en borrador', detail: 'CAS-2026-0512 · Salesforce CRM · vinculado a REC-2026-0512' },
        { action: 'Borrador 8D preparado', detail: 'CAS-2026-0512 · D1–D8 · campaña caducada como hipótesis' },
        { action: 'Respuesta al cliente redactada', detail: 'REC-2026-0512 · español · versión 1 · pendiente de aprobación' }
      ],
      approved: { action: 'Respuesta aprobada y enviada', detail: 'REC-2026-0512 · a jm.lopez@correo-demo.example · CAS-2026-0512' },
      after_approval: [
        { action: 'Pausa de cobro aplicada', detail: 'SAP ERP · FIN-2026-08841 · 1.ª cuota del 01/11/2026' },
        { action: 'Caso actualizado', detail: 'CAS-2026-0512 · En curso · respuesta adjunta' }
      ]
    },
    outcome_label: 'Respuesta enviada · CAS-2026-0512 en curso',
    toast_analyzed: 'Reclamación analizada · 8D y respuesta en borrador',
    status_chips: { idle: 'Abierta · sin analizar', pending: 'Esperando aprobación', approved: 'Respuesta enviada · 8D en curso', rejected: 'Respuesta rechazada' },
    report: {
      button: 'Descargar informe 8D',
      title: 'Informe 8D · reclamación REC-2026-0512',
      subtitle: 'Disputa de TAE (3,99 % acordada frente a 4,25 % en el contrato) · Seat Ibiza VIN-2026-MAD-SEAT-03 · contrato FIN-2026-08841 · José María López, Banco Sabadell',
      filename: 'informe-8D-CAS-2026-0512-REC-2026-0512',
      meta: [['Sede', 'Madrid (Marqués de Soria)'], ['Reclamación', 'REC-2026-0512 · 03/10/2026'], ['Vehículo', 'VIN-2026-MAD-SEAT-03'], ['Informe al cliente', 'antes del 09/10/2026']],
      state: { pending: 'Borrador · pendiente de aprobación', approved: 'Aprobado para envío · D4 abierta', rejected: 'Borrador · respuesta rechazada' },
      summary: [
        'Reclamación de José María López por la financiación de su Seat Ibiza 1.0 TSI FR con Banco Sabadell: la oferta del 16/09/2026 decía TAE 3,99 % y el contrato FIN-2026-08841 del 18/09/2026 recoge 4,25 %. Son 16.900 € a 48 meses; la diferencia es de 1,90 € al mes y 91,00 € en total. No se ha cobrado ninguna cuota.',
        'Hipótesis de causa, pendiente de confirmar con Banco Sabadell: la campaña CAMP-SAB-0926 cerró el 15/09/2026 y el contrato se generó con la tarifa estándar.'
      ],
      trace_heading: 'Anexo A · Traza de la venta',
      trace_rows: [
        { etapa: 'Financiación', fecha: '15/09/2026', detalle: 'Cierre de la campaña de Banco Sabadell con TAE 3,99 % para Seat Ibiza; desde el 16/09 rige la tarifa estándar del 4,25 %', ref: 'CAMP-SAB-0926' },
        { etapa: 'Presupuesto', fecha: '12/09/2026', detalle: 'Oportunidad OPP-2026-5127 · 16.900 € a 48 meses · TAE 3,99 % · Salesforce CRM', ref: 'Q-2026-5127-02' },
        { etapa: 'Oferta', fecha: '16/09/2026', detalle: 'Oferta firmada por el cliente en DocuSign con TAE 3,99 %', ref: 'ENV-DS-77412' },
        { etapa: 'Contrato', fecha: '18/09/2026 10:42', detalle: 'Contrato de financiación firmado en DocuSign con TAE 4,25 % · cuota de 382,87 € · SAP ERP', ref: 'FIN-2026-08841' },
        { etapa: 'Controles', fecha: '18/09/2026', detalle: 'Identidad y scoring aprobados por Banco Sabadell (conforme); documentación completa (conforme); sin control que compare la TAE de la oferta con la del contrato', ref: '—' },
        { etapa: 'Cobro', fecha: '18/09/2026 12:05', detalle: 'Entrada de 3.000 € cobrada en Stripe Pagos', ref: 'STR-PAY-90412' },
        { etapa: 'Desembolso', fecha: '22/09/2026 09:30', detalle: 'Banco Sabadell desembolsa 16.900 € a Autopista Multimotor', ref: 'SAB-DES-0922' },
        { etapa: 'Entrega', fecha: '24/09/2026', detalle: 'Seat Ibiza 1.0 TSI FR entregado desde el hub de Madrid · Odoo Inventario · pedido SO-2026-14203', ref: 'VIN-2026-MAD-SEAT-03' }
      ],
      units: {
        heading: 'Anexo B · Documentos y movimientos del expediente (7)',
        cols: [{ label: 'N.º', key: 'n', num: true }, { label: 'Documento', key: 'doc' }, { label: 'Referencia', key: 'ref', mono: true }, { label: 'Fecha', key: 'fecha' }, { label: 'Estado', key: 'estado', status: true }, { label: 'Sistema', key: 'sistema' }],
        rows: [
          { n: '1', doc: 'Presupuesto con TAE 3,99 %', ref: 'Q-2026-5127-02', fecha: '12/09/2026', estado: 'Vigente', sistema: 'Salesforce CRM' },
          { n: '2', doc: 'Oferta firmada con TAE 3,99 %', ref: 'ENV-DS-77412', fecha: '16/09/2026', estado: 'Firmada', sistema: 'DocuSign' },
          { n: '3', doc: 'Contrato de financiación con TAE 4,25 %', ref: 'FIN-2026-08841', fecha: '18/09/2026', estado: 'En revisión', sistema: 'SAP ERP' },
          { n: '4', doc: 'Pedido de venta del Seat Ibiza', ref: 'SO-2026-14203', fecha: '18/09/2026', estado: 'Entregado', sistema: 'SAP ERP' },
          { n: '5', doc: 'Entrada de 3.000 €', ref: 'STR-PAY-90412', fecha: '18/09/2026', estado: 'Cobrada', sistema: 'Stripe Pagos' },
          { n: '6', doc: 'Desembolso de 16.900 €', ref: 'SAB-DES-0922', fecha: '22/09/2026', estado: 'Desembolsado', sistema: 'SAP ERP' },
          { n: '7', doc: 'Primera cuota (SEPA) de 382,87 €', ref: 'CUOTA-1', fecha: '01/11/2026', estado: 'Programada', estado_after: 'Pausada', sistema: 'SAP ERP' }
        ]
      },
      history_heading: 'Anexo C · Reclamaciones anteriores (12 meses)',
      approvals: [
        { paso: 'Borradores 8D y respuesta', rol: 'Agentic Platform · agente Reclamaciones de cliente', kind: 'agent' },
        { paso: 'Respuesta al cliente y contención (D3)', rol: 'Responsable de operaciones', kind: 'reply' },
        { paso: 'Confirmación de la causa raíz (D4)', rol: 'Responsable de finanzas', kind: 'pending' },
        { paso: 'Cierre del 8D (D8)', rol: 'Responsable de finanzas', kind: 'pending' }
      ],
      second_signer: { role: 'Responsable de finanzas', note: 'Confirmación de causa (D4) y cierre (D8) · pendiente' }
    },
    presenter: {
      running: 'Mientras corre: señalar la línea de SAP (la campaña de Banco Sabadell cerrada el 15/09) y la de Salesforce (reclamación parecida). Si hace falta, «Acelerar».',
      idle: [
        'Correo de José María López, cliente particular, por la financiación de su Seat Ibiza: la TAE del contrato es 4,25 % y la oferta firmada decía 3,99 %. Llegó el sábado 03/10 a las 10:14, en español y con plazo.',
        'En producción, Agentic Platform lo analiza en cuanto entra en el buzón de Atención al cliente. Aquí lo lanzamos a mano para ver qué hace y qué sistemas consulta.'
      ],
      pending: [
        'Lo resaltado en el correo es lo que Agentic Platform ha extraído. Cada dato se comprueba en Salesforce y SAP: el vehículo existe, el contrato coincide y los dos documentos están firmados en DocuSign.',
        'La traza: presupuesto del 12/09, oferta firmada el 16/09 y contrato del 18/09 por 16.900 € a 48 meses. La entrada está cobrada, Banco Sabadell ha desembolsado y la primera cuota vence el 01/11.',
        'El dato que cambia la investigación: la campaña del 3,99 % cerró el 15/09, un día antes de firmar la oferta. Es una hipótesis, no la causa: la confirma Finanzas con Banco Sabadell.',
        'Histórico: en junio hubo una discrepancia de TAE con una causa del mismo tipo (REC-2026-0318). El 8D lo recoge en la prevención (D7).',
        'La respuesta en español confirma hechos y fechas y no adelanta la causa ni promete la TAE. No sale hasta que Operaciones la aprueba.'
      ],
      approved: [
        'Aprobada: respuesta enviada, primera cuota pausada y el caso CAS-2026-0512 en curso en Salesforce. Todo queda en el registro de auditoría.',
        'La comparación de abajo: hoy, 3–4 personas y 6 sistemas durante horas; aquí, una revisión y una aprobación. La cifra de «hoy» la medimos en el piloto, no la inventamos.',
        'El informe 8D se descarga como documento controlado: código, revisión, estado, aprobaciones y número de página.'
      ],
      next: {
        idle: 'Pulsar «Analizar reclamación» y leer en voz alta dos líneas del registro: el sistema consultado y lo que encuentra.',
        pending: 'Pulsar «Revisar y aprobar» (arriba) o bajar hasta la respuesta y pulsar «Aprobar y enviar». Opcional: «Corregir» el VIN con uno inexistente para enseñar que no inventa datos.',
        approved: 'Pulsar «Descargar informe 8D» y enseñar la cabecera del documento. Después, pasar a «Procedimientos» en la barra lateral.'
      }
    }
  }
});
