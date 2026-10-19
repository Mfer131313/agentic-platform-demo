/* Guardián Ibérica Instalaciones · reclamación CLM-2026-0619 (dos cargos de desplazamiento de vigilante por falsas alarmas en el contrato SA-2026-77412 de Sector Alarm, de Marta Soler Pons).
 * Escenario de la demo con datos sintéticos (MFM). */
agenticPack('alarmas', {
  reclamacion: {
    code: 'CLM-2026-0619',
    nav: 'Reclamación CLM-2026-0619',
    title: 'Reclamación CLM-2026-0619',
    agent: 'Reclamaciones de cliente',
    analyze_label: 'Analizar reclamación',
    nc: 'CAS-2026-0619',
    form: { code: 'REG-ATC-006-02', rev: '2' },
    received: { date: '2026-10-19', time: '08:32' },
    due: '2026-11-02',
    holidays: [],
    customer_line: 'Marta Soler Pons · particular · Burjassot · contrato Sector Alarm SA-2026-77412',
    due_line: 'Acuse antes del 20/10/2026 · resolución antes del 02/11/2026',
    cust_name: 'Marta Soler Pons',
    cust_addr: 'marta.soler@correo-demo.example',
    own_name: 'Atención al cliente, Guardián Ibérica Instalaciones',
    own_addr: 'atencion.cliente@guardian-iberica.example',
    mail_domain: 'guardian-iberica.example',
    mail_sub: 'marta.soler@correo-demo.example · buzón atencion.cliente@guardian-iberica.example · español',
    mail_title: 'Correo de la clienta',
    mail_tab_label: 'Correo (español)',
    attachments: ['CLM-2026-0619_aviso_facturacion.pdf', 'CLM-2026-0619_contrato_SA-2026-77412.pdf'],
    email_text: [
      'From: Marta Soler Pons <marta.soler@correo-demo.example>',
      'To: Atención al cliente, Guardián Ibérica Instalaciones <atencion.cliente@guardian-iberica.example>',
      'Date: Mon, 19 Oct 2026 08:32 (hora de Madrid)',
      'Subject: Reclamación - Dos cargos de desplazamiento de vigilante por falsas alarmas - Contrato SA-2026-77412 - Burjassot',
      '',
      'Buenos días:',
      '',
      'Les escribo por los dos cargos de «desplazamiento de vigilante» que me han llegado en el aviso de facturación de octubre y que no me corresponde pagar.',
      '',
      'Titular: Marta Soler Pons (Burjassot)',
      'Contrato de Sector Alarm: SA-2026-77412',
      'Falsas alarmas: 12/10/2026 y 14/10/2026, de madrugada',
      'Cargos: 2 x 39,00 € = 78,00 €',
      '',
      'Las dos veces saltó la alarma del salón sin que hubiera nadie en casa ni ocurriera nada, y la central mandó a un vigilante. Creo que el sensor de movimiento del salón estaba fallando: nadie me avisó de que tuviera la batería baja, no recibí ningún mensaje y en la aplicación no vi nada. Adjunto el aviso de facturación y el contrato.',
      '',
      'Solicito que se anulen los dos cargos y que revisen y arreglen el sensor cuanto antes. Si no se resuelve, daré de baja el contrato y no estoy dispuesta a pagar la penalización de 180 € por la baja.',
      '',
      'Les pido una respuesta por escrito en un plazo máximo de 10 días hábiles, con la explicación de lo ocurrido. Confirmen por favor la recepción e indíquenme el número de su expediente.',
      '',
      'Un saludo,',
      '',
      'Marta Soler Pons'
    ].join('\n'),
    highlights: [
      { text: 'SA-2026-77412', label: 'Contrato', tone: 'brand' },
      { text: '12/10/2026 y 14/10/2026', label: 'Falsas alarmas', tone: 'crit' },
      { text: '2 x 39,00 € = 78,00 €', label: 'Cargos', tone: 'crit' },
      { text: 'sensor de movimiento del salón', label: 'Equipo', tone: 'brand' },
      { text: 'nadie me avisó de que tuviera la batería baja', label: 'Causa señalada', tone: 'warn' },
      { text: 'Adjunto el aviso de facturación y el contrato.', label: 'Evidencia' },
      { text: 'penalización de 180 € por la baja', label: 'Baja', tone: 'warn' },
      { text: 'en un plazo máximo de 10 días hábiles', label: 'Plazo' }
    ],
    run: {
      title: 'Workflow «Reclamación de cliente»',
      sub: 'Se lanza al entrar una reclamación en el buzón de Atención al cliente · PR-SOP-007',
      graph_title: 'Workflow de reclamación de cliente',
      idle_footer: 'Lee el correo, extrae y valida los datos, traza la instalación y prepara el 8D y la respuesta. Nada sale sin la aprobación del Responsable de operaciones.',
      nodes: [
        { id: 'correo', kind: 'trigger', label: 'Correo de cliente', sub: 'Buzón de Atención al cliente', systems: ['Google Workspace'], icon: 'mail' },
        { id: 'extraccion', label: 'Extracción y validación', systems: ['Modelo de lenguaje', 'Salesforce CRM'], icon: 'search' },
        { id: 'traza', label: 'Traza de la instalación', systems: ['Salesforce CRM', 'Sector Alarm Partner Hub', 'SAP Business One', 'Twilio SMS'], icon: 'git-branch' },
        { id: 'historico', label: 'Histórico, 8D y respuesta', systems: ['Salesforce CRM', 'Procedimientos'], icon: 'clipboard' },
        { id: 'aprobacion', kind: 'approval', label: 'Aprobación de operaciones', sub: 'Responsable de operaciones' },
        { id: 'salida', kind: 'output', label: 'Respuesta y contención', systems: ['Google Workspace', 'Sector Alarm Partner Hub', 'Salesforce CRM'], icon: 'send' }
      ],
      edges: [['correo', 'extraccion'], ['extraccion', 'traza'], ['traza', 'historico'], ['historico', 'aprobacion'], { from: 'aprobacion', to: 'salida', label: 'aprobado' }],
      graph_at: { 0: { correo: 'done', extraccion: 'active' }, 2: { extraccion: 'done', traza: 'active' }, 8: { traza: 'done', historico: 'active' }, 13: { historico: 'done', aprobacion: 'waiting' } },
      stats: [
        { label: 'Falsas alarmas reclamadas · 12/10 y 14/10', value: 2 },
        { label: 'Cargos retenibles · 2 x 39,00 € de desplazamiento de vigilante', value: '78,00 €', tone: 'warn' },
        { label: 'Reclamación parecida · CLM-2026-0457', value: 1, tone: 'warn' },
        { label: 'Días hábiles para la resolución · vence el 02/11/2026', due: true }
      ]
    },
    steps: [
      { system: 'Google Workspace', action: 'Lee el correo de marta.soler@correo-demo.example en el buzón atencion.cliente@guardian-iberica.example (19/10/2026 08:32)', result: 'Reclamación de cliente en español · 2 documentos adjuntos (aviso de facturación y contrato)', ms: 320 },
      { system: 'Modelo de lenguaje', action: 'Extrae los datos de la reclamación', result: 'Contrato SA-2026-77412 · falsas alarmas del 12 y 14/10/2026 · 2 x 39,00 € = 78,00 € · sensor del salón con batería baja sin aviso · amenaza de baja con penalización de 180 € · resolución en 10 días hábiles', ms: 2900 },
      { system: 'Salesforce CRM', action: 'Valida la clienta y la instalación extraídas', result: 'La clienta existe: Marta Soler Pons, Burjassot, contrato SA-2026-77412 de Sector Alarm, instalación INS-2026-VLC-02318. Coincide con el correo', ms: 410, tone: 'ok' },
      { system: 'Sector Alarm Partner Hub', action: 'Contrato y equipos de la instalación', result: 'SA-2026-77412 activo desde 14/03/2025 · panel con 4G, 3 contactos de puerta y 1 detector de movimiento PIR en el salón · penalización de baja de 180 € dentro del primer ciclo de permanencia', ms: 380 },
      { system: 'Sector Alarm Partner Hub', action: 'Eventos de la instalación del 05/10 al 14/10/2026', result: '05/10 batería baja del PIR del salón (8 %) · 12/10 03:12 y 14/10 02:47 alarma del PIR del salón verificada como falsa por la CRA · 2 desplazamientos de vigilante a 39,00 €', ms: 520, tone: 'warn' },
      { system: 'Twilio SMS', action: 'Aviso al cliente por el evento de batería baja del 05/10', result: 'SMS enviado el 05/10/2026 al teléfono que consta en el CRM: no entregado (número fuera de servicio) · sin aviso en la aplicación del cliente', ms: 430, tone: 'warn' },
      { system: 'Salesforce CRM', action: 'Datos de contacto de la clienta', result: 'Teléfono del CRM del 03/2025 · la clienta cambió de móvil en 05/2026 y no se actualizó en el CRM · correo vigente', ms: 360, tone: 'warn' },
      { system: 'SAP Business One', action: 'Facturación y mantenimiento de la instalación', result: 'Aviso de facturación de octubre con 78,00 € de cargos de vigilante, cobro SEPA el 01/11/2026 · mantenimiento anual PR-MAN-004 hecho en 02/2026 sin incidencias', ms: 460 },
      { system: 'Samsara Flota', action: 'Disponibilidad de técnicos en la zona de Burjassot', result: 'Hueco el 21/10/2026 por la mañana · propuesta de visita de revisión del PIR OT-2026-08412 en la ruta VLC-Norte', ms: 390 },
      { system: 'Salesforce CRM', action: 'Busca reclamaciones parecidas en los últimos 12 meses', result: '4 reclamaciones con caso abierto · 1 parecida: CLM-2026-0457 (cargo de vigilante tras batería baja sin aviso, Verisure)', ms: 540, tone: 'warn' },
      { system: 'Procedimientos', action: 'Consulta PR-SOP-007, PR-BAJ-005 y PR-MAN-004', result: 'Acuse en 24 h y resolución en 10 días hábiles: antes del 02/11/2026 · PR-SOP-007: la falsa alarma por fallo del equipo o del mantenimiento no se repercute al cliente', ms: 380 },
      { system: 'Modelo de lenguaje', action: 'Redacta el borrador 8D (D1–D8) con responsables por rol y fechas', result: 'Borrador completo · el aviso al teléfono antiguo queda como hipótesis por confirmar', ms: 5200 },
      { system: 'Salesforce CRM', action: 'Registra el caso y lo vincula a la reclamación', result: 'CAS-2026-0619 abierto en borrador · vinculado a CLM-2026-0619', ms: 300, tone: 'ok' },
      { system: 'Modelo de lenguaje', action: 'Redacta la respuesta en español y su traducción de control', result: 'Borrador listo: acuse de recibo, referencia CAS-2026-0619, retención de los 78,00 € y visita de revisión · pendiente de aprobación', ms: 3100, tone: 'warn' }
    ],
    lot: {
      code: 'INS-2026-VLC-02318',
      noun: 'instalación',
      label: 'Instalación',
      fix_title: 'la instalación de la reclamación',
      systems: 'Salesforce/Partner Hub',
      systems_short: 'Salesforce/Partner Hub',
      fix_text: 'Si la clienta ha escrito mal el código de instalación, escribe el correcto. Agentic Platform lo busca en Salesforce y en el portal de partner y comprueba que corresponde a la instalación reclamada antes de cambiar nada.',
      same_body: 'Existe en Salesforce y en el portal de Sector Alarm y corresponde al contrato SA-2026-77412 de Marta Soler Pons. Sin cambios.',
      unknown_hint: 'Si el código de la clienta es dudoso, pide una foto del contrato o de la etiqueta del panel.',
      mismatch_body: 'Existe en Salesforce, pero no es la instalación INS-2026-VLC-02318 de la reclamación: no se cambia la ficha.',
      known: {
        'INS-2026-VLC-04417': { kind: 'mismatch', title: 'La instalación INS-2026-VLC-04417 no corresponde a esta reclamación', body: 'Existe en Salesforce, pero es un contrato de Verisure en Valencia sin falsas alarmas ni cargos de vigilante. La reclamación es de la instalación INS-2026-VLC-02318: no se cambia la ficha.' },
        'INS-2026-ALC-01172': { kind: 'mismatch', title: 'INS-2026-ALC-01172 es la instalación de otra reclamación, no la de esta', body: 'Es un comercio de Prosegur Alarmas en Alicante, con la reclamación CLM-2026-0588 abierta por una cámara de videoverificación mal orientada. No es la instalación reclamada por Marta Soler Pons. No se cambia la ficha.' },
        'INS-2026-CAS-00861': { kind: 'mismatch', title: 'La instalación INS-2026-CAS-00861 no corresponde a esta reclamación', body: 'Existe en el portal de partner, pero es una vivienda de Castellón con un detector del lote PIR-2607-A, sin relación con los cargos de Marta Soler Pons. No se cambia la ficha.' }
      }
    },
    sheet: {
      sub: 'Datos extraídos del correo y comprobados en Salesforce, Sector Alarm Partner Hub y SAP',
      empty_text: 'Agentic Platform extraerá del correo la instalación, el contrato, los cargos, las fechas y el plazo, y los comprobará en Salesforce y en el portal de Sector Alarm antes de preparar el 8D y la respuesta.',
      rows: [
        { k: 'Referencia', v: 'CLM-2026-0619', code: true, sub: 'Referencia de la reclamación de la clienta' },
        { k: 'Clienta', v: 'Marta Soler Pons', sub: 'Particular · Burjassot · cliente de Salesforce · contrato de Sector Alarm' },
        { k: 'Contrato', v: 'SA-2026-77412', code: true, ok: 'Activo en Sector Alarm Partner Hub desde 14/03/2025' },
        { k: 'Instalación', lot: true, ok: 'Existe en Salesforce y en el portal · panel 4G con PIR en el salón' },
        { k: 'Discrepancia', v: '2 cargos de vigilante (2 x 39,00 €) por falsas alarmas del PIR del salón', sub: 'Batería baja del 05/10 sin aviso entregado a la clienta' },
        { k: 'Petición', v: 'Anular los 78,00 € y arreglar el sensor', sub: 'Y no cobrar la penalización de 180 € si causa baja' },
        { k: 'Evidencias', v: '2 documentos adjuntos · aviso de facturación y contrato' },
        { k: 'Fechas', v: 'Falsas alarmas: 12/10/2026 y 14/10/2026 · en Atención al cliente: 19/10/2026 08:32' },
        { k: 'Plazo', v: 'Acuse antes del 20/10 y resolución antes del 02/11/2026', due: true, sub: '24 h para el acuse y 10 días hábiles para resolver · PR-SOP-007' },
        { k: 'Registro', v: 'CAS-2026-0619', code: true, sub: 'Caso en Salesforce, vinculado a la reclamación' }
      ]
    },
    requests: {
      title: 'Lo que pide la clienta',
      items: [
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Acuse de recibo y número de expediente', meta: ['Respuesta a la clienta · CAS-2026-0619'], quote: 'Confirmen por favor la recepción e indíquenme el número de su expediente', side: { pending: { status: 'waiting', label: 'Pendiente de aprobación' }, approved: { status: 'sent', label: 'Enviado' }, rejected: { status: 'rejected', label: 'No enviado' } } },
        { icon: 'check-circle', tone: 'ok', title: 'Explicación de lo ocurrido', meta: ['D2 y anexo A del 8D'], quote: 'con la explicación de lo ocurrido', side: { status: 'ok', label: 'Reunida' } },
        { icon: { pending: 'clock', approved: 'check-circle' }, tone: { pending: 'warn', approved: 'ok' }, title: 'Anular los dos cargos de 39,00 € de desplazamiento de vigilante', meta: ['D3 y D5 · cobro SEPA del 01/11/2026'], quote: 'Solicito que se anulen los dos cargos', side: { pending: { status: 'review', label: 'Retención propuesta' }, approved: { status: 'hold', label: 'Cargos retenidos' }, rejected: { status: 'review', label: 'Retención propuesta' } } },
        { icon: 'clock', tone: 'warn', title: 'Revisar y arreglar el sensor del salón', meta: ['D5 · visita OT-2026-08412 propuesta'], quote: 'revisen y arreglen el sensor cuanto antes', side: { status: 'review', label: 'Visita por aprobar' } },
        { icon: 'clock', tone: 'warn', title: 'No cobrar la penalización de 180 € si se da de baja', meta: ['D4 y D5 · PR-BAJ-005 y criterio de Sector Alarm'], quote: 'no estoy dispuesta a pagar la penalización de 180 € por la baja', side: { status: 'review', label: 'Consultar a Sector Alarm' } },
        { icon: 'calendar', tone: 'warn', title: 'Respuesta por escrito en 10 días hábiles', meta: ['Envío del 8D (D1–D5)'], quote: 'en un plazo máximo de 10 días hábiles', side: { status: 'pending', label: 'Antes del 02/11' } }
      ]
    },
    trace: {
      title: 'Traza de la instalación INS-2026-VLC-02318',
      sub: 'Salesforce CRM, Sector Alarm Partner Hub, Twilio SMS y SAP Business One · hacia atrás y hacia delante',
      button_code: 'INS-2026-VLC-02318',
      button_label: 'Traza completa · 7 registros',
      back_title: 'Hacia atrás',
      back: [
        { time: '14/03/2025', title: 'Instalación y puesta en marcha · PR-INS-001', text: 'Panel 4G, 3 contactos de puerta y 1 detector de movimiento PIR en el salón, grado 2 · alta del contrato SA-2026-77412 en Sector Alarm', tone: 'brand', ref: 'INS-2026-VLC-02318' },
        { time: '02/2026', title: 'Mantenimiento preventivo anual · PR-MAN-004', text: 'Revisión sin incidencias · batería del PIR al 61 % · teléfono de contacto del CRM aún vigente', tone: 'ok', ref: 'OT-2026-01977' },
        { time: '05/2026', title: 'La clienta cambia de móvil', text: 'El número nuevo no se comunicó a Atención al cliente ni se actualizó en Salesforce; en el portal de Sector Alarm sigue el número anterior', tone: 'warn', ref: 'Salesforce CRM', chip: { status: 'open', label: 'Dato de contacto sin actualizar' } },
        { time: '05/10', timeSub: '07:41', title: 'Evento de batería baja del PIR del salón', text: 'El portal de Sector Alarm registra la batería al 8 % y emite el aviso al cliente por SMS; no se genera orden de mantenimiento', tone: 'warn', ref: 'EV-SA-1005-0741' },
        { time: '05/10', title: 'Proceso · aviso de batería baja', route: ['PIR salón', 'Panel 4G', 'Partner Hub', 'Twilio SMS', 'Teléfono antiguo', 'Sin entrega'], route_mark: 'Teléfono antiguo', text: 'SMS enviado al número anterior: no entregado, sin segundo intento ni aviso en la aplicación', tone: 'brand' },
        { time: '05/10', title: 'Controles del aviso', text: 'Evento recibido y aviso emitido (conforme) · sin control que detecte un SMS no entregado y abra una orden de mantenimiento', tone: 'ok' }
      ],
      fwd_title: 'Hacia delante',
      fwd_cols: { id: 'Movimiento', qty: 'Importe', when: 'Fecha', status: 'Estado' },
      fwd: [
        { id: 'ALM-FA-1012', dest: 'Falsa alarma del PIR del salón', sub: 'CRA · desplazamiento de vigilante', qty: '39,00 €', when: '12/10/2026 03:12', status: { pending: { status: 'shipped', label: 'Cargo emitido' }, approved: { status: 'shipped', label: 'Cargo emitido' }, rejected: { status: 'shipped', label: 'Cargo emitido' } } },
        { id: 'ALM-FA-1014', dest: 'Falsa alarma del PIR del salón', sub: 'CRA · desplazamiento de vigilante', qty: '39,00 €', when: '14/10/2026 02:47', status: { pending: { status: 'shipped', label: 'Cargo emitido' }, approved: { status: 'shipped', label: 'Cargo emitido' }, rejected: { status: 'shipped', label: 'Cargo emitido' } } },
        { id: 'REC-SEPA-1101', dest: 'Recibo SEPA de noviembre con los cargos', sub: 'SAP Business One · SA-2026-77412 · incluye 78,00 € de vigilante', qty: '78,00 €', when: '01/11/2026', status: { pending: { status: 'pending', label: 'Retención propuesta' }, approved: { status: 'hold', label: 'Retenidos' }, rejected: { status: 'pending', label: 'Retención propuesta' } } }
      ],
      fwd_note: '2 falsas alarmas · 78,00 € en cargos de vigilante sin cobrar todavía. La penalización de baja de 180 € solo se aplicaría si la clienta tramitase la baja, que no se ha solicitado.',
      hypothesis: {
        title: 'Hipótesis de causa probable · a confirmar por Soporte técnico',
        icon: 'wrench',
        paras: [
          'El aviso de batería baja del 05/10/2026 se envió por SMS al teléfono anterior de la clienta, no se entregó y no hubo segundo intento ni orden de mantenimiento; el PIR siguió con la batería al 8 % hasta las falsas alarmas del 12 y el 14/10.',
          'Por aclarar: el cargo de vigilante lo emite Sector Alarm y no está claro si su criterio exime del cargo a las falsas alarmas por fallo del equipo; se ha pedido su criterio y no hay respuesta todavía.',
          'Se confirma con el registro de eventos del panel, el informe de Twilio y la respuesta de Sector Alarm. Hasta entonces no se comunica la causa a la clienta.'
        ]
      }
    },
    history: {
      sub: 'Salesforce CRM · reclamaciones con caso abierto · últimos 12 meses',
      col_id: 'Reclamación',
      col_product: 'Instalación y contrato',
      col_cause: 'Causa raíz',
      rows: [
        { id: 'CLM-2026-0457', date: '2026-08-03', product: 'Verisure · vivienda en Valencia', lot: 'INS-2026-VLC-01904', description: 'Cargo de vigilante tras una falsa alarma por batería baja sin aviso', category: 'Falsa alarma', customer_label: 'Particular', root_cause: 'Aviso de batería baja enviado a un teléfono desactualizado en el CRM', nc: 'CAS-2026-0457', status: 'cerrada (21/08/2026)', similar: true },
        { id: 'CLM-2026-0388', date: '2026-07-10', product: 'Prosegur Alarmas · comercio en Alicante', lot: 'INS-2026-ALC-01172', description: 'Cámara de videoverificación con imágenes sin aviso previo', category: 'Privacidad', customer_label: 'Pequeño negocio', root_cause: 'Cartel informativo sin colocar en la instalación (PR-RGPD-002)', nc: 'CAS-2026-0388', status: 'cerrada', similar: false },
        { id: 'CLM-2026-0312', date: '2026-05-12', product: 'Sector Alarm · vivienda en Paterna', lot: 'INS-2026-VLC-00977', description: 'Cuota cobrada después de la baja', category: 'Baja', customer_label: 'Particular', root_cause: 'Baja registrada en el portal sin comunicarse a facturación (PR-BAJ-005)', nc: 'CAS-2026-0312', status: 'cerrada', similar: false },
        { id: 'CLM-2026-0140', date: '2026-02-18', product: 'Verisure · vivienda en Castellón', lot: 'INS-2026-CAS-00433', description: 'Revisión anual no realizada en el plazo', category: 'Mantenimiento', customer_label: 'Particular', root_cause: 'Orden de PR-MAN-004 sin asignar por falta de hueco en la ruta', nc: 'CAS-2026-0140', status: 'cerrada', similar: false }
      ],
      note: {
        title: 'Mismo tipo de causa que CLM-2026-0457',
        body: 'Cargo de vigilante tras una falsa alarma por batería baja sin aviso (03/08/2026): aviso enviado a un teléfono desactualizado en el CRM; CAS-2026-0457 cerrada (21/08/2026). Si se confirma la hipótesis del SMS no entregado, sería la segunda falsa alarma por un aviso de batería baja sin entregar en menos de tres meses: el 8D propone en D7 un control que abra una orden de mantenimiento cuando el SMS de batería baja no se entregue.'
      }
    },
    plan: {
      title: 'Borrador 8D · CAS-2026-0619',
      sub: 'PR-SOP-007 · a la clienta antes del 02/11/2026 con D1–D5; D6–D8 en seguimiento',
      col_label: 'Disciplina',
      containment_status: { pending: { text: 'Pendiente de aprobación', tone: 'warn' }, approved: { text: 'Aplicada', tone: 'ok' }, rejected: { text: 'No aplicada', tone: 'neutral' } },
      rows: [
        { d: 'D1', title: 'Equipo', owner: ['Responsable de operaciones'], date: '2026-10-20', status: { text: 'Propuesto', tone: 'draft' }, lead: 'Líder: Responsable de operaciones.', items: ['Atención al cliente: investigación y contacto con la clienta', 'Responsable de soporte técnico: eventos del panel y avisos de batería baja', 'Jefe de mantenimiento: visita de revisión del PIR y PR-MAN-004', 'Responsable de finanzas: cargos de vigilante y recibo SEPA de noviembre'], note: 'Contacto externo: Marta Soler Pons y el gestor de Sector Alarm Partner Hub.' },
        { d: 'D2', title: 'Descripción del problema', owner: ['Atención al cliente'], date: '2026-10-20', status: { text: 'Completo', tone: 'ok' }, lead: 'Marta Soler Pons reclama porque le han cobrado dos desplazamientos de vigilante por falsas alarmas causadas, a su juicio, por un sensor con la batería baja que nadie le avisó.', items: ['Instalación INS-2026-VLC-02318, contrato SA-2026-77412 de Sector Alarm: falsas alarmas del 12/10/2026 03:12 y del 14/10/2026 02:47', 'Dos cargos de 39,00 € (78,00 €) aún sin cobrar; recibo SEPA del 01/11/2026', 'Batería del PIR del salón al 8 % desde el 05/10; SMS de aviso no entregado al teléfono anterior', 'Evidencias: aviso de facturación y contrato; reclamación recibida el 19/10/2026 08:32'] },
        { d: 'D3', title: 'Contención', owner: ['Responsable de operaciones', 'Responsable de finanzas'], date: '2026-10-20', containment: true, items: ['Retener los dos cargos de vigilante (78,00 €) del recibo SEPA del 01/11/2026 en SAP Business One. Requiere aprobación (PR-SOP-007)', 'Pedir a Sector Alarm que confirme si se exime del cargo a las falsas alarmas por fallo del equipo', 'Proponer la visita OT-2026-08412 del 21/10/2026 para revisar y cambiar la batería del PIR', 'Actualizar el teléfono de la clienta y revisar en Salesforce los avisos de batería baja no entregados de la última semana'] },
        { d: 'D4', title: 'Causa raíz', owner: ['Responsable de soporte técnico', 'Atención al cliente'], date: '2026-10-22', status: { text: 'Hipótesis', tone: 'warn' }, lead: 'Hipótesis principal, a confirmar: el aviso de batería baja del 05/10/2026 se envió por SMS al teléfono anterior de la clienta, no se entregó y no se generó ninguna orden de mantenimiento.', items: ['A favor: el SMS figura como no entregado en Twilio; CLM-2026-0457 tuvo una causa del mismo tipo (teléfono desactualizado en el CRM)', 'Por aclarar: el criterio de Sector Alarm sobre el cargo de vigilante en falsas alarmas por fallo del equipo', 'Verificación: registro de eventos del panel, informe de entrega de Twilio, respuesta de Sector Alarm y análisis de 5 porqués'] },
        { d: 'D5', title: 'Acciones correctivas', owner: ['Jefe de mantenimiento', 'Responsable de finanzas'], date: '2026-10-23', status: { text: 'Planificado', tone: 'info' }, items: ['Cambiar la batería del PIR del salón y comprobar el resto de sensores de la instalación', 'Solicitar a Sector Alarm el abono de los dos cargos o su anulación, según su criterio, y no aplicar la penalización de baja mientras el caso siga abierto'] },
        { d: 'D6', title: 'Implantación y eficacia', owner: ['Atención al cliente'], date: '2026-10-30', status: { text: 'Planificado', tone: 'info' }, items: ['Confirmar con la clienta que el sensor funciona, que el teléfono está actualizado y que el recibo de noviembre no incluye los cargos', 'Comprobar que no hay otras instalaciones con la misma batería baja sin avisar'] },
        { d: 'D7', title: 'Prevención de la recurrencia', owner: ['Responsable de soporte técnico'], date: '2026-11-13', status: { text: 'Planificado', tone: 'info' }, items: ['Abrir una orden de mantenimiento cuando el SMS de batería baja no se entregue o el panel no confirme el aviso', 'Revisar PR-SOP-007: segundo aviso por correo y aplicación antes de dar un evento de batería baja por comunicado', 'Pedir confirmación del teléfono en cada visita de PR-MAN-004 y en cada contacto con Atención al cliente'] },
        { d: 'D8', title: 'Cierre y reconocimiento', owner: ['Responsable de operaciones'], date: '2026-11-20', status: { text: 'Planificado', tone: 'info' }, items: ['Informe final a Marta Soler Pons y cierre de CAS-2026-0619 en Salesforce con la evidencia de eficacia', 'Reconocimiento al equipo'] }
      ]
    },
    reply: {
      to_label: 'a la clienta',
      subject: 'RE: Reclamación - Dos cargos de desplazamiento de vigilante por falsas alarmas - Contrato SA-2026-77412 - Burjassot - Ref. CAS-2026-0619',
      sub: 'Para marta.soler@correo-demo.example · en español',
      tab_label: 'Español · se envía',
      text: [
        'Estimada Sra. Soler:',
        '',
        'Gracias por su correo del 19 de octubre de 2026. Confirmamos la recepción de su reclamación CLM-2026-0619 sobre los dos cargos de desplazamiento de vigilante de su contrato SA-2026-77412 de Sector Alarm, por las falsas alarmas del 12 y el 14 de octubre. Lamentamos las molestias que esto le ha causado.',
        '',
        'Su número de expediente es CAS-2026-0619. Estamos revisando lo ocurrido con nuestro equipo de Soporte técnico y con Sector Alarm, y la reclamación se documentará en un informe 8D.',
        '',
        'Primeros datos de nuestros registros:',
        '- Sensor: el detector de movimiento del salón comunicó el 5 de octubre un nivel de batería bajo. Enviamos un aviso por SMS, pero consta como no entregado.',
        '- Cargos: son dos de 39,00 € (78,00 € en total) y todavía no se han cobrado; el recibo está previsto para el 01/11/2026. Hemos propuesto retenerlos hasta aclarar la situación.',
        '- Baja: no consta ninguna solicitud de baja, así que no se ha aplicado ninguna penalización.',
        '',
        'Próximos pasos:',
        '- Proponemos una visita de nuestro técnico el 21/10/2026 por la mañana para revisar el sensor y cambiar la batería. Le llamaremos para confirmarla.',
        '- Pediremos a Sector Alarm que confirme el tratamiento de los dos cargos.',
        '- Le enviaremos por escrito el informe con la explicación y la solución, a más tardar el 2 de noviembre de 2026.',
        '- Para que los avisos le lleguen, le agradeceríamos que nos confirmara su teléfono móvil actual.',
        '',
        'Un saludo,',
        '',
        'Atención al cliente',
        'Guardián Ibérica Instalaciones · Paterna (Valencia)',
        'atencion.cliente@guardian-iberica.example'
      ].join('\n'),
      highlights: [
        { text: 'CAS-2026-0619', label: 'Referencia', tone: 'brand' },
        { text: 'Hemos propuesto retenerlos hasta aclarar la situación.', label: 'Contención', tone: 'brand' },
        { text: 'a más tardar el 2 de noviembre de 2026', label: 'Compromiso', tone: 'brand' }
      ],
      llm_instructions: [
        'Tono cordial, formal y profesional, de Atención al cliente de Guardián Ibérica Instalaciones a Marta Soler Pons, una clienta particular de Burjassot que reclama por dos cargos de desplazamiento de vigilante tras falsas alarmas. Lamenta las molestias sin reconocer culpa.',
        'Agradece el correo del 19 de octubre de 2026 y acusa recibo de la reclamación CLM-2026-0619 sobre los dos cargos de su contrato SA-2026-77412 de Sector Alarm por las falsas alarmas del 12 y el 14 de octubre.',
        'Da el número de expediente CAS-2026-0619 y di que se revisa con Soporte técnico y con Sector Alarm y se documentará en un informe 8D.',
        'Primeros datos: el detector del salón comunicó batería baja el 5 de octubre y el SMS de aviso consta como no entregado; los dos cargos suman 78,00 € y no se han cobrado, y se propone retenerlos antes del recibo del 01/11/2026; no consta solicitud de baja ni penalización.',
        'Próximos pasos: visita del técnico el 21/10/2026 por la mañana para revisar el sensor y cambiar la batería, pedir a Sector Alarm que confirme el tratamiento de los cargos, enviar por escrito el informe a más tardar el 2 de noviembre de 2026 y pedir el teléfono móvil actual.',
        'No adelantes la causa (ni el teléfono antiguo del CRM ni la reclamación anterior CLM-2026-0457) ni prometas la anulación de los cargos ni la exención de la penalización de 180 €.',
        'Escribe en español. Firma: Atención al cliente · Guardián Ibérica Instalaciones · Paterna (Valencia) · atencion.cliente@guardian-iberica.example'
      ],
      criterion: 'Criterio de redacción: confirma hechos de Salesforce, Sector Alarm Partner Hub y SAP y compromete fechas; no adelanta la causa (la hipótesis del SMS no entregado no está confirmada) ni promete la anulación de los cargos ni la exención de la penalización.',
      control: {
        label: 'Traducción de control (inglés)',
        note: 'Traducción de control para el DPO y para quien aprueba; no se envía.',
        edited_note: 'La traducción corresponde al borrador de Agentic Platform; la versión editada incluye cambios de operaciones en el texto en español.',
        subject: 'RE: Complaint - Two security guard call-out charges for false alarms - Contract SA-2026-77412 - Burjassot - Ref. CAS-2026-0619',
        text: [
          'Dear Ms Soler,',
          '',
          'Thank you for your email of 19 October 2026. We confirm receipt of your complaint CLM-2026-0619 about the two security guard call-out charges on your Sector Alarm contract SA-2026-77412, for the false alarms of 12 and 14 October. We are sorry for the inconvenience.',
          '',
          'Your case number is CAS-2026-0619. We are reviewing what happened with our Technical Support team and with Sector Alarm, and the complaint will be documented in an 8D report.',
          '',
          'Initial findings from our records:',
          '- Sensor: the living-room motion detector reported a low battery level on 5 October. We sent an SMS notice, but it is recorded as not delivered.',
          '- Charges: there are two of EUR 39.00 (EUR 78.00 in total) and they have not been collected yet; the direct debit is scheduled for 01/11/2026. We have proposed holding them until the situation is clarified.',
          '- Cancellation: there is no record of a cancellation request, so no penalty has been applied.',
          '',
          'Next steps:',
          '- We propose a visit by our technician on 21/10/2026 in the morning to check the sensor and replace the battery. We will call you to confirm it.',
          '- We will ask Sector Alarm to confirm how the two charges are treated.',
          '- We will send you in writing the report with the explanation and the solution, by 2 November 2026 at the latest.',
          '- So that the notices reach you, we would appreciate it if you could confirm your current mobile number.',
          '',
          'Kind regards,',
          '',
          'Customer Service',
          'Guardián Ibérica Instalaciones · Paterna (Valencia)',
          'atencion.cliente@guardian-iberica.example'
        ].join('\n')
      }
    },
    approval: {
      title: 'Respuesta a Marta Soler Pons y contención',
      approver: 'Responsable de operaciones',
      policy: 'PR-SOP-007 · PR-BAJ-005',
      summary: {
        pending: 'Agentic Platform ha preparado la respuesta en español para marta.soler@correo-demo.example y la retención de los dos cargos de vigilante. No se envía ni se retiene nada hasta que Operaciones lo apruebe.',
        approved: 'Operaciones ha aprobado la respuesta y la contención. Agentic Platform ha enviado el correo a marta.soler@correo-demo.example, ha retenido los dos cargos y ha actualizado CAS-2026-0619.',
        rejected: 'Operaciones ha rechazado la propuesta: no se ha enviado la respuesta ni se ha retenido ningún cargo.'
      },
      scope: [
        { label: 'Respuesta en español', state: { pending: { status: 'pending', chip: 'Enviar' }, approved: { status: 'sent', chip: 'Enviada' }, rejected: { status: 'rejected', chip: 'No enviada' } } },
        { label: 'Cargos de vigilante (SEPA)', value: '2 x 39,00 € · 01/11/2026', state: { pending: { status: 'pending', chip: 'Retener' }, approved: { status: 'hold', chip: 'Retenidos' }, rejected: { status: 'rejected', chip: 'No retenidos' } } },
        { label: 'Contrato SA-2026-77412', value: 'Penalización de baja 180 €', state: { status: 'evaluate', chip: 'Consultar a Sector Alarm' } }
      ],
      effects: [
        'Google Workspace: respuesta enviada desde atencion.cliente@guardian-iberica.example',
        'SAP Business One: dos cargos de vigilante retenidos en el recibo del 01/11/2026 de SA-2026-77412',
        'Salesforce CRM: CAS-2026-0619 pasa a «En curso» con la respuesta adjunta y la visita OT-2026-08412 propuesta'
      ],
      approve_label: 'Aprobar y enviar',
      next_step: 'Siguiente paso: confirmar la causa con Soporte técnico y Sector Alarm (D4) y enviar el informe 8D antes del 02/11/2026.',
      toast_approved: 'Respuesta enviada a Marta Soler Pons · cargos retenidos en SA-2026-77412',
      reject_text: 'No se envía la respuesta ni se retiene ningún cargo. El motivo queda en el registro de auditoría.',
      reject_placeholder: 'Por ejemplo: esperar la respuesta de Sector Alarm antes de contestar',
      reject_audit: 'no se envía ni se retiene nada',
      toast_rejected: 'Respuesta rechazada: no se ha enviado nada ni se ha retenido ningún cargo'
    },
    compare: {
      rows: [
        { k: 'Personas que intervienen', hoy: '3–4: Atención al cliente, Soporte técnico, Mantenimiento y Finanzas', pro_strong: '1', pro: ': Operaciones revisa, corrige si hace falta y aprueba' },
        { k: 'Sistemas que hay que abrir', hoy: '6: Google Workspace, Salesforce, portal de Sector Alarm, SAP, Twilio y Samsara', pro_strong: '1', pro: ': esta consola; Agentic Platform consulta los 6' }
      ],
      steps_today: '12–15 búsquedas, cruces y redacciones a mano',
      time_label: 'Traza, 8D en borrador y respuesta',
      time_today: '2–4 h de trabajo, repartidas en 1–2 días',
      footer: 'Criterio de aceptación propuesto para el piloto: traza y borrador en menos de 15 minutos, y Operaciones acepta el borrador con ediciones menores en al menos el 70 % de los casos.'
    },
    audit: {
      requested: { action: 'Análisis de reclamación solicitado', detail: 'CLM-2026-0619 · correo de marta.soler@correo-demo.example del 19/10/2026 08:32' },
      analyzed: { action: 'Reclamación analizada', detail: 'CLM-2026-0619 · instalación INS-2026-VLC-02318' },
      after_analysis: [
        { action: 'Caso registrado en borrador', detail: 'CAS-2026-0619 · Salesforce CRM · vinculado a CLM-2026-0619' },
        { action: 'Borrador 8D preparado', detail: 'CAS-2026-0619 · D1–D8 · SMS no entregado como hipótesis' },
        { action: 'Respuesta a la clienta redactada', detail: 'CLM-2026-0619 · español · versión 1 · pendiente de aprobación' }
      ],
      approved: { action: 'Respuesta aprobada y enviada', detail: 'CLM-2026-0619 · a marta.soler@correo-demo.example · CAS-2026-0619' },
      after_approval: [
        { action: 'Retención de cargos aplicada', detail: 'SAP Business One · SA-2026-77412 · 2 x 39,00 € del recibo del 01/11/2026' },
        { action: 'Caso actualizado', detail: 'CAS-2026-0619 · En curso · respuesta adjunta · visita OT-2026-08412 propuesta' }
      ]
    },
    outcome_label: 'Respuesta enviada · CAS-2026-0619 en curso',
    toast_analyzed: 'Reclamación analizada · 8D y respuesta en borrador',
    status_chips: { idle: 'Abierta · sin analizar', pending: 'Esperando aprobación', approved: 'Respuesta enviada · 8D en curso', rejected: 'Respuesta rechazada' },
    report: {
      button: 'Descargar informe 8D',
      title: 'Informe 8D · reclamación CLM-2026-0619',
      subtitle: 'Cargos de vigilante por falsas alarmas (2 x 39,00 €) · instalación INS-2026-VLC-02318 · contrato SA-2026-77412 · Marta Soler Pons, Sector Alarm',
      filename: 'informe-8D-CAS-2026-0619-CLM-2026-0619',
      meta: [['Sede', 'Paterna (Valencia)'], ['Reclamación', 'CLM-2026-0619 · 19/10/2026'], ['Instalación', 'INS-2026-VLC-02318'], ['Informe a la clienta', 'antes del 02/11/2026']],
      state: { pending: 'Borrador · pendiente de aprobación', approved: 'Aprobado para envío · D4 abierta', rejected: 'Borrador · respuesta rechazada' },
      summary: [
        'Reclamación de Marta Soler Pons por dos cargos de desplazamiento de vigilante (2 x 39,00 €) tras las falsas alarmas del 12 y el 14/10/2026 en su contrato SA-2026-77412 de Sector Alarm. El detector de movimiento del salón tenía la batería baja desde el 05/10 y el aviso por SMS no se entregó. Los cargos no se han cobrado y no hay solicitud de baja.',
        'Hipótesis de causa, pendiente de confirmar con Soporte técnico y Sector Alarm: el SMS de batería baja se envió a un teléfono anterior de la clienta, sin segundo intento ni orden de mantenimiento.'
      ],
      trace_heading: 'Anexo A · Traza de la instalación',
      trace_rows: [
        { etapa: 'Instalación', fecha: '14/03/2025', detalle: 'Panel 4G, 3 contactos de puerta y 1 detector PIR en el salón, grado 2 · alta del contrato SA-2026-77412', ref: 'INS-2026-VLC-02318' },
        { etapa: 'Mantenimiento', fecha: '02/2026', detalle: 'Revisión anual sin incidencias · batería del PIR al 61 % · PR-MAN-004', ref: 'OT-2026-01977' },
        { etapa: 'Contacto', fecha: '05/2026', detalle: 'La clienta cambia de móvil; el teléfono del CRM y del portal de Sector Alarm no se actualiza', ref: 'Salesforce CRM' },
        { etapa: 'Evento', fecha: '05/10/2026 07:41', detalle: 'Batería baja del PIR del salón (8 %) · aviso por SMS al teléfono anterior · no entregado', ref: 'EV-SA-1005-0741' },
        { etapa: 'Controles', fecha: '05/10/2026', detalle: 'Evento recibido y aviso emitido (conforme); sin control que detecte un SMS no entregado y abra una orden de mantenimiento', ref: '—' },
        { etapa: 'Falsa alarma', fecha: '12/10/2026 03:12', detalle: 'Alarma del PIR del salón verificada como falsa por la CRA · desplazamiento de vigilante de 39,00 €', ref: 'ALM-FA-1012' },
        { etapa: 'Falsa alarma', fecha: '14/10/2026 02:47', detalle: 'Segunda alarma del PIR del salón verificada como falsa · desplazamiento de vigilante de 39,00 €', ref: 'ALM-FA-1014' },
        { etapa: 'Facturación', fecha: '01/11/2026', detalle: 'Recibo SEPA de noviembre con los dos cargos (78,00 €) · SAP Business One', ref: 'REC-SEPA-1101' }
      ],
      units: {
        heading: 'Anexo B · Registros del expediente (7)',
        cols: [{ label: 'N.º', key: 'n', num: true }, { label: 'Registro', key: 'doc' }, { label: 'Referencia', key: 'ref', mono: true }, { label: 'Fecha', key: 'fecha' }, { label: 'Estado', key: 'estado', status: true }, { label: 'Sistema', key: 'sistema' }],
        rows: [
          { n: '1', doc: 'Contrato de alarma con Sector Alarm', ref: 'SA-2026-77412', fecha: '14/03/2025', estado: 'Activo', sistema: 'Sector Alarm Partner Hub' },
          { n: '2', doc: 'Instalación y puesta en marcha', ref: 'INS-2026-VLC-02318', fecha: '14/03/2025', estado: 'Cerrada', sistema: 'Salesforce CRM' },
          { n: '3', doc: 'Evento de batería baja del PIR', ref: 'EV-SA-1005-0741', fecha: '05/10/2026', estado: 'Sin atender', sistema: 'Sector Alarm Partner Hub' },
          { n: '4', doc: 'SMS de aviso de batería baja', ref: 'SMS-TW-1005-0742', fecha: '05/10/2026', estado: 'No entregado', sistema: 'Twilio SMS' },
          { n: '5', doc: 'Falsa alarma y cargo de 39,00 €', ref: 'ALM-FA-1012', fecha: '12/10/2026', estado: 'Emitido', sistema: 'Sector Alarm Partner Hub' },
          { n: '6', doc: 'Falsa alarma y cargo de 39,00 €', ref: 'ALM-FA-1014', fecha: '14/10/2026', estado: 'Emitido', sistema: 'Sector Alarm Partner Hub' },
          { n: '7', doc: 'Recibo SEPA con los dos cargos', ref: 'REC-SEPA-1101', fecha: '01/11/2026', estado: 'Programado', estado_after: 'Retenido', sistema: 'SAP Business One' }
        ]
      },
      history_heading: 'Anexo C · Reclamaciones anteriores (12 meses)',
      approvals: [
        { paso: 'Borradores 8D y respuesta', rol: 'Agentic Platform · agente Reclamaciones de cliente', kind: 'agent' },
        { paso: 'Respuesta a la clienta y contención (D3)', rol: 'Responsable de operaciones', kind: 'reply' },
        { paso: 'Confirmación de la causa raíz (D4)', rol: 'Responsable de soporte técnico', kind: 'pending' },
        { paso: 'Cierre del 8D (D8)', rol: 'Responsable de soporte técnico', kind: 'pending' }
      ],
      second_signer: { role: 'Responsable de soporte técnico', note: 'Confirmación de causa (D4) y cierre (D8) · pendiente' }
    },
    presenter: {
      running: 'Mientras corre: señalar la línea del portal de Sector Alarm (batería baja del 05/10) y la de Twilio (SMS no entregado). Si hace falta, «Acelerar».',
      idle: [
        'Correo de Marta Soler Pons, clienta particular de Burjassot, por dos cargos de vigilante tras falsas alarmas: dice que el sensor del salón tenía la batería baja y nadie le avisó. Llegó el lunes 19/10 a las 08:32, en español y con plazo.',
        'En producción, Agentic Platform lo analiza en cuanto entra en el buzón de Atención al cliente. Aquí lo lanzamos a mano para ver qué hace y qué sistemas consulta.'
      ],
      pending: [
        'Lo resaltado en el correo es lo que Agentic Platform ha extraído. Cada dato se comprueba en Salesforce y en el portal de Sector Alarm: la instalación existe, el contrato coincide y las dos falsas alarmas constan en la central.',
        'La traza: batería baja el 05/10, SMS no entregado, falsas alarmas el 12 y el 14/10, y recibo SEPA del 01/11 con 78,00 €. Todavía no se ha cobrado nada.',
        'El dato que cambia la investigación: el SMS se envió al teléfono anterior de la clienta. Es una hipótesis, no la causa: la confirma Soporte técnico con Sector Alarm.',
        'Histórico: en agosto hubo una falsa alarma con una causa del mismo tipo (CLM-2026-0457). El 8D lo recoge en la prevención (D7).',
        'La respuesta en español confirma hechos y fechas y no adelanta la causa ni promete la anulación. No sale hasta que Operaciones la aprueba.'
      ],
      approved: [
        'Aprobada: respuesta enviada, cargos retenidos y el caso CAS-2026-0619 en curso en Salesforce. Todo queda en el registro de auditoría.',
        'La comparación de abajo: hoy, 3–4 personas y 6 sistemas durante horas; aquí, una revisión y una aprobación. La cifra de «hoy» la medimos en el piloto, no la inventamos.',
        'El informe 8D se descarga como documento controlado: código, revisión, estado, aprobaciones y número de página.'
      ],
      next: {
        idle: 'Pulsar «Analizar reclamación» y leer en voz alta dos líneas del registro: el sistema consultado y lo que encuentra.',
        pending: 'Pulsar «Revisar y aprobar» (arriba) o bajar hasta la respuesta y pulsar «Aprobar y enviar». Opcional: «Corregir» el código de instalación con uno inexistente para enseñar que no inventa datos.',
        approved: 'Pulsar «Descargar informe 8D» y enseñar la cabecera del documento. Después, pasar a «Procedimientos» en la barra lateral.'
      }
    }
  }
});
