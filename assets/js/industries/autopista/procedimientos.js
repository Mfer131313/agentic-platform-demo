/* Autopista Multimotor · consulta de procedimientos de Operaciones y Taller con citas. Escenario de demostración con datos sintéticos (MFM). */
agenticPack('autopista', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedimientos',
    title: 'Preguntar a los procedimientos',
    agent: 'Procedimientos',
    system: 'Salesforce Knowledge',
    source: 'Salesforce Knowledge · documentos controlados de Operaciones',
    indexed_at: '2026-10-05T06:00',
    doc_org: 'Autopista Multimotor · Calidad',
    ui: {
      page_title: 'Consulta de procedimientos de Operaciones',
      intro_title: 'Pregunta sobre los procedimientos del hub de Madrid',
      intro_text: 'Cada frase de la respuesta cita el documento y el apartado de donde sale. Si ningún documento indexado lo recoge, la consulta lo indica y no responde.',
      placeholder: 'Escribe una pregunta sobre los procedimientos de Operaciones',
      context_title: 'Aplicado al hub de Madrid hoy',
      permission: 'Operaciones · Madrid',
      asker_initials: 'RO',
      asker_role: 'Responsable de operaciones',
      route_to: 'Calidad de operaciones'
    },
    report: { title: 'Consulta de procedimientos de Operaciones', code_prefix: 'CON-PROC', filename: 'consulta-procedimientos', scope_label: 'Sede', scope: 'Madrid · Marqués de Soria (MAD)' },
    presenter: {
      say: [
        'Consulta de los procedimientos de Operaciones: la respuesta sale solo de los documentos controlados, y cada frase lleva su cita al documento y al apartado.',
        'Hay ocho documentos indexados: stock crítico, bloqueo y liberación de vehículos, reclamaciones y 8D, cobertura del taller, flota de alquiler, la instrucción del módulo ABS del Golf, una ficha del Seat Ibiza y la matriz de garantías. Aquí son sintéticos; en el piloto, los suyos vigentes.'
      ],
      say_empty: 'Sirve para formar a jefes de turno nuevos, para preparar auditorías de marca y para contestar a clientes con la referencia exacta.',
      say_answered: 'Al pulsar una cita se abre el documento con el pasaje exacto resaltado. Y la respuesta se cruza con lo que pasa hoy: la alerta del BMW X3, la reclamación CLM-2026-001 o el recall del Golf.',
      say_none: 'Cuando no hay fuente lo dice y no inventa: ni respuesta ni cita. Si el tema está en un documento que no está indexado, lo nombra (OPE-REC-018) y permite derivar la pregunta a Calidad.',
      next_empty: 'Pulsar «¿Qué hay que hacer si el stock de un modelo baja del umbral crítico?» y después la cita 1 para ver el pasaje resaltado.',
      next_answered: 'Escribir una pregunta sin fuente, por ejemplo «¿Cada cuánto hacemos el simulacro de recall?», y pulsar «Preguntar».',
      next_done: 'Pasar a la siguiente escena con la flecha derecha.'
    },

    docs: [
      {
        code: 'OPE-STK-012',
        title: 'Stock crítico y reposición de vehículos en campa',
        short: 'Stock crítico y reposición',
        type: 'Procedimiento',
        version: '4',
        date: '2026-03-12',
        owner: 'Operaciones',
        summary: 'Menos de 3 unidades disponibles de un modelo: alerta de stock crítico, reserva de las unidades para pedidos confirmados y reposición urgente con la marca. Con 1 unidad o menos, stock crítico máximo.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Menos de 3 unidades disponibles de un modelo: alerta de stock crítico, reserva de las unidades para pedidos confirmados y reposición urgente con la marca. Con 1 unidad o menos, stock crítico máximo.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Definir cómo se detecta, evalúa y registra un stock crítico en la campa de Madrid (Marqués de Soria), para no comprometer entregas que no se puedan cumplir.',
            'Aplica al stock de venta de BMW, Audi, Volkswagen, Skoda y Seat registrado en Odoo Inventario. No aplica a la flota de alquiler, que se rige por OPE-ALQ-034.'
          ] },
          { id: '2', heading: '2. Definiciones', list: [
            'Stock disponible: unidades en campa sin reserva ni bloqueo, según Odoo Inventario sincronizado con SAP ERP cada 15 min.',
            'Stock crítico: menos de 3 unidades disponibles de un modelo.',
            'Stock crítico máximo: 1 unidad o menos disponible de un modelo.',
            'Pedido abierto: pedido de venta confirmado en Salesforce CRM y pendiente de entrega.'
          ] },
          { id: '3', heading: '3. Responsabilidades', list: [
            'Jefe de turno de ventas: valora la alerta, prioriza los pedidos abiertos e informa a los clientes afectados.',
            'Gestor de marca: solicita la reposición urgente y confirma la fecha de recepción.',
            'Responsable de operaciones: aprueba la reposición urgente y el traslado entre campas.'
          ] },
          { id: '4', heading: '4. Criterio de alerta', text: [
            'Si el stock disponible de un modelo baja de 3 unidades, se genera una alerta de stock crítico y las unidades restantes se reservan para pedidos confirmados.',
            'Si queda 1 unidad o menos, el stock es crítico máximo: además de la alerta, se solicita reposición urgente a la marca y se informa al Responsable de operaciones.',
            'Las unidades del mismo modelo en otras campas no se trasladan de forma automática: se marcan «a valorar» y el Responsable de operaciones decide el traslado a la vista del coste y de los pedidos abiertos.',
            'Una bajada por debajo de 3 unidades con recepción confirmada en menos de 3 días se registra sin reposición urgente y se revisa en el informe semanal de stock.'
          ] },
          { id: '5', heading: '5. Evaluación del impacto', text: [
            'Cada alerta se evalúa por modelo antes de prometer una fecha de entrega. La reposición urgente la aprueba el Responsable de operaciones.'
          ], list: [
            'Contar los pedidos abiertos del modelo en Salesforce CRM y su fecha comprometida.',
            'Comprobar en SAP ERP la fecha de recepción confirmada por la marca.',
            'Decidir por pedido: mantener la fecha, ofrecer una unidad alternativa o renegociar la entrega con el cliente.'
          ] },
          { id: '6', heading: '6. Registro y comunicación', list: [
            'La alerta de Odoo Inventario abre el registro: modelo, unidades disponibles, pedidos abiertos y fecha de recepción prevista.',
            'La reserva se registra en Odoo Inventario y en SAP ERP con la referencia de la alerta (OPE-VEH-015 si hay unidades bloqueadas).',
            'Se avisa al Jefe de turno de ventas por Slack para informar a los clientes con pedido abierto.',
            'Las alertas repetidas de un mismo modelo se analizan en la revisión mensual de aprovisionamiento.'
          ] },
          { id: '7', heading: '7. Referencias', refs: true, list: [
            'OPE-VEH-015 · Bloqueo comercial y liberación de vehículos.',
            'Condiciones de suministro y plazos de reposición pactados con cada marca.',
            'Ley 7/1998 de condiciones generales de la contratación.'
          ] }
        ]
      },
      {
        code: 'OPE-VEH-015',
        title: 'Bloqueo comercial y liberación de vehículos',
        short: 'Bloqueo y liberación',
        type: 'Procedimiento',
        version: '6',
        date: '2026-01-20',
        owner: 'Operaciones',
        summary: 'Todo bloqueo se registra en Odoo Inventario (vehículo bloqueado) y en Salesforce CRM (entrega retenida). Solo el Responsable de operaciones libera.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Todo bloqueo se registra en Odoo Inventario (vehículo bloqueado) y en Salesforce CRM (entrega retenida). Solo el Responsable de operaciones libera.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Asegurar que ningún vehículo con una desviación de seguridad o de calidad sale de la campa sin una decisión documentada. Aplica a vehículos de venta, de alquiler y de suscripción, en cualquier ubicación del hub de Madrid.'
          ] },
          { id: '2', heading: '2. Responsabilidades', list: [
            'Cualquier jefe de turno puede proponer un bloqueo al detectar una desviación.',
            'El Jefe de taller aprueba el bloqueo y define su alcance.',
            'Solo el Responsable de operaciones (o, por delegación, el Jefe de taller) puede liberar un vehículo bloqueado.'
          ] },
          { id: '3', heading: '3. Registro del bloqueo', text: [
            'Todo bloqueo se registra a la vez en Odoo Inventario (vehículo con bloqueo comercial) y en Salesforce CRM (entrega retenida y cliente avisado). Salesforce CRM no permite programar la entrega de un vehículo bloqueado.',
            'El registro incluye el motivo, el alcance (VIN y ubicaciones), la referencia de origen (alerta, reclamación o campaña de recall) y quién lo aprueba.'
          ] },
          { id: '4', heading: '4. Evaluación y decisión de empleo', text: [
            'La liberación exige evidencia documentada: resultado de la inspección o reparación en iCare Taller y conclusión firmada. La decisión de empleo se registra en SAP ERP y puede ser liberar, reparar o devolver a la marca.',
            'Ningún vehículo se libera por defecto ni por vencimiento de plazo.'
          ] },
          { id: '5', heading: '5. Liberación parcial', text: [
            'Un conjunto de vehículos puede liberarse por VIN cuando la inspección permite separar los afectados de los que no lo están. Cada VIN liberado queda identificado en Odoo Inventario y en Salesforce CRM.'
          ] },
          { id: '6', heading: '6. Vehículo ya entregado', text: [
            'Si parte de las unidades afectadas ya se ha entregado, el Responsable de operaciones valora la campaña de llamada a taller según OPE-REC-018 (Campañas de recall y comunicación a clientes) e informa al cliente en el plazo que marque ese procedimiento.'
          ] },
          { id: '7', heading: '7. Registros', list: [
            'Bloqueos y decisiones de empleo: SAP ERP.',
            'Vehículos inmovilizados y entregas retenidas: Odoo Inventario y Salesforce CRM.',
            'Evidencias de la inspección o reparación: iCare Taller.'
          ] }
        ]
      },
      {
        code: 'OPE-CLI-020',
        title: 'Reclamaciones de cliente y disputas de TAE',
        short: 'Reclamaciones y 8D',
        type: 'Procedimiento',
        version: '5',
        date: '2026-02-09',
        owner: 'Atención al cliente',
        summary: 'Acuse de recibo en 24 h, contención en 48 h e informe 8D en 5 días hábiles. Las discrepancias de TAE de 2.000 EUR o más son de gravedad crítica.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Acuse de recibo en 24 h, contención en 48 h e informe 8D en 5 días hábiles. Las discrepancias de TAE de 2.000 EUR o más son de gravedad crítica.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Definir cómo se recibe, investiga y responde una reclamación de cliente de venta, alquiler, suscripción o taller, con trazabilidad desde la recepción hasta el cierre.'
          ] },
          { id: '2', heading: '2. Plazos', list: [
            'Acuse de recibo al cliente: 24 h desde la recepción.',
            'Contención: 48 h para identificar y bloquear la operación o el vehículo reclamado (OPE-VEH-015).',
            'Informe 8D: en el plazo pactado con el cliente; si no hay plazo pactado, 5 días hábiles.'
          ] },
          { id: '3', heading: '3. Clasificación de gravedad', list: [
            'Gravedad crítica: discrepancia económica de 2.000 EUR o más, o riesgo para la seguridad de las personas.',
            'Gravedad alta: defecto del vehículo o daño de alquiler de 500 EUR o más.',
            'Gravedad media o baja: resto de casos, con resolución por Atención al cliente.'
          ] },
          { id: '4', heading: '4. Investigación de una disputa de TAE', text: [
            'La investigación de una disputa de TAE revisa, como mínimo:'
          ], list: [
            'El contrato firmado en DocuSign y la TAE que figura en él.',
            'La oferta de financiación aprobada por la entidad (Banco Sabadell) y su fecha.',
            'La factura y el plan de cuotas emitidos desde SAP ERP.',
            'Las comunicaciones enviadas al cliente y las reclamaciones de TAE de los últimos 12 meses.'
          ] },
          { id: '5', heading: '5. Informe 8D', text: [
            'El informe 8D se prepara en Salesforce CRM y sigue ocho pasos:'
          ], list: [
            'D1 · Equipo: Atención al cliente, Finanzas y la línea de negocio afectada.',
            'D2 · Descripción del problema con los datos del cliente.',
            'D3 · Contención: operación o vehículo bloqueado y cliente informado.',
            'D4 · Causa raíz, confirmada con evidencia.',
            'D5 · Acciones correctivas.',
            'D6 · Implantación y verificación de la eficacia.',
            'D7 · Prevención: cambios en procedimientos, plantillas de contrato o formación.',
            'D8 · Cierre y comunicación al cliente.'
          ] },
          { id: '6', heading: '6. Respuesta al cliente', text: [
            'La respuesta se redacta en el idioma del cliente y la aprueba el Responsable de operaciones antes de enviarla.',
            'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.'
          ] },
          { id: '7', heading: '7. Registros', list: [
            'Reclamación y plazos: Salesforce CRM.',
            'Importes, abonos y facturas rectificativas: SAP ERP.',
            'Documentos del cliente: DocuSign.'
          ] }
        ]
      },
      {
        code: 'OPE-TAL-031',
        title: 'Capacidad de taller y cobertura de técnicos de marca',
        short: 'Capacidad y cobertura de taller',
        type: 'Procedimiento',
        version: '3',
        date: '2026-04-22',
        owner: 'Jefe de taller',
        summary: 'Mínimo de 3 técnicos disponibles por marca y turno. Con capacidad efectiva por debajo del 80 %, se reprograma el mantenimiento preventivo; por debajo del 60 %, se escala.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Mínimo de 3 técnicos disponibles por marca y turno. Con capacidad efectiva por debajo del 80 %, se reprograma el mantenimiento preventivo; por debajo del 60 %, se escala.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Mantener la capacidad del taller de marca de Madrid para cumplir garantías, recalls y mantenimiento. Aplica a los equipos de BMW, Audi, Volkswagen, Skoda y Seat.'
          ] },
          { id: '2', heading: '2. Cobertura de técnicos', text: [
            'El Jefe de taller revisa la cobertura al inicio de cada turno en iCare Taller y registra cada ausencia el mismo día:'
          ], list: [
            'Cada marca tiene como mínimo 3 técnicos disponibles por turno.',
            'Técnicos de baja o en formación no cuentan como disponibles.',
            'Un técnico polivalente puede cubrir una marca solo si tiene la certificación vigente.'
          ] },
          { id: '3', heading: '3. Criterio de capacidad', text: [
            'La capacidad efectiva es el cociente entre las horas de técnico disponibles y las previstas en el turno.',
            'Por debajo del 80 %, se reprograma el mantenimiento preventivo y se informa a los clientes afectados; por debajo del 60 %, se escala al Responsable de operaciones.'
          ] },
          { id: '4', heading: '4. Actuación ante la ausencia de un técnico', text: [
            'Se reasigna el trabajo a un técnico polivalente certificado de la marca y se prioriza la garantía y el recall sobre el mantenimiento preventivo.',
            'Se reprograma el mantenimiento preventivo con aviso por Twilio SMS al cliente, con nueva cita en un máximo de 5 días hábiles.',
            'Si la marca queda con menos de 3 técnicos, no se aceptan nuevas citas de mantenimiento preventivo de esa marca hasta recuperar la cobertura.'
          ] },
          { id: '5', heading: '5. Registro y seguimiento', list: [
            'Ausencias, reasignaciones y citas movidas: iCare Taller.',
            'Avisos a clientes: Twilio SMS, con copia en Salesforce CRM.',
            'La cobertura por marca se revisa en la reunión semanal de taller.'
          ] },
          { id: '6', heading: '6. Historial de revisiones', text: [
            'Rev. 3 (22/04/2026): se añade la reprogramación del mantenimiento preventivo cuando la capacidad efectiva baja del 80 %, como acción de la incidencia INC-2025-0388 (taller sin técnico de Skoda durante dos semanas).'
          ] }
        ]
      },
      {
        code: 'OPE-ALQ-034',
        title: 'Flota de alquiler: entrega, devolución e inspección',
        short: 'Flota de alquiler',
        type: 'Procedimiento',
        version: '4',
        date: '2026-05-18',
        owner: 'Gestor de flota de alquiler',
        summary: 'Inspección con fotos 360° en la entrega y en la devolución. Los daños nuevos se imputan al cliente según la franquicia; con menos del 70 % de la flota disponible se activa la flota de respaldo.',
        sections: [
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Fijar cómo se entrega, se recibe y se inspecciona un vehículo de la flota de alquiler (unas 1.000 unidades) para proteger la disponibilidad y asignar los daños con evidencia.'
          ] },
          { id: '2', heading: '2. Entrega al cliente', list: [
            'Verificar la identidad y el carnet del cliente y asignar el vehículo en Odoo Inventario.',
            'Inspección de entrega con fotos 360°, nivel de combustible, kilometraje y prueba de luces, guardada en el contrato.',
            'Cobro de la fianza con Stripe Pagos antes de entregar las llaves.'
          ] },
          { id: '3', heading: '3. Devolución e inspección', text: [
            'En cada devolución se repite la inspección con fotos 360° y se compara con la de entrega. Los resultados se registran en Odoo Inventario:'
          ], list: [
            'Daños nuevos respecto a la entrega, con foto de cada uno.',
            'Nivel de combustible y kilometraje.',
            'Limpieza y estado de neumáticos y luces.'
          ] },
          { id: '4', heading: '4. Criterio de daños', text: [
            'Se imputa al cliente todo daño nuevo que aparezca en la comparación de fotos, hasta el importe de la franquicia contratada.',
            'Si el daño supera los 500 EUR o el cliente lo discute, se retiene el cargo y se abre una reclamación según OPE-CLI-020; el vehículo pasa a peritaje en taller antes de volver a la flota.'
          ] },
          { id: '5', heading: '5. Disponibilidad de la flota', text: [
            'Si la flota disponible baja del 70 % del total, el Gestor de flota de alquiler activa la flota de respaldo y avisa al Responsable de operaciones.',
            'La utilización objetivo es del 70 % o más; la ocupación se revisa cada mañana en Odoo Inventario.'
          ] },
          { id: '6', heading: '6. Registros', list: [
            'Contrato, fotos e inspecciones: Odoo Inventario.',
            'Cargos de fianza y daños: Stripe Pagos y SAP ERP.',
            'Reclamaciones por daños: Salesforce CRM.'
          ] }
        ]
      },
      {
        code: 'IT-TAL-VW-02',
        title: 'Sustitución del módulo ABS en Volkswagen Golf (campaña REC-VW-2026-001)',
        short: 'Módulo ABS del Golf',
        type: 'Instrucción técnica',
        version: '3',
        date: '2026-09-02',
        owner: 'Jefe de taller',
        summary: 'Los Golf de la campaña se bloquean para la entrega, se sustituye el módulo ABS en taller y se verifica el frenado en banco antes de liberar. Seguimiento semanal del cumplimiento.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Los Golf de la campaña se bloquean para la entrega, se sustituye el módulo ABS en taller y se verifica el frenado en banco antes de liberar. Seguimiento semanal del cumplimiento.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Ejecutar la campaña REC-VW-2026-001 (fallo potencial del módulo ABS). Aplica a los Volkswagen Golf y Passat de la campa, de la flota de alquiler y de suscripción: 47 unidades identificadas, plazo de cumplimiento 15/11/2026.'
          ] },
          { id: '2', heading: '2. Identificación y seguimiento', text: [
            'Cada lunes el Jefe de taller cruza los VIN de la campaña con iCare Taller y actualiza el cumplimiento:'
          ], list: [
            'VIN pendientes, con su ubicación (campa, alquiler o suscripción).',
            'Citas de taller ya programadas y fecha prevista de repuesto.',
            'Unidades bloqueadas y entregas retenidas por la campaña.'
          ] },
          { id: '3', heading: '3. Criterio de prioridad', text: [
            'Se priorizan, por este orden, las unidades de alquiler en circulación, las de suscripción y las de campa con entrega comprometida.',
            'Un Golf con un cliente al volante o con entrega programada nunca se entrega sin la sustitución hecha.'
          ] },
          { id: '4', heading: '4. Actuación con una unidad afectada', text: [
            'Se bloquea el vehículo (OPE-VEH-015) y se abre una orden de trabajo en iCare Taller con la sustitución programada del módulo, informando a la línea de negocio el mismo día.',
            'Hasta la sustitución, el vehículo de alquiler o suscripción no sale a un cliente nuevo; el cliente que lo tiene recibe un vehículo de sustitución.',
            'Si el módulo muestra una avería activa, el vehículo no circula y se remolca al taller.'
          ] },
          { id: '5', heading: '5. Sustitución y verificación', text: [
            'Tras cambiar el módulo se verifica el frenado en banco con 3 ciclos de ABS correctos. El resultado se registra en la orden de trabajo antes de cerrarla y de liberar el vehículo.'
          ] },
          { id: '6', heading: '6. Historial de revisiones', text: [
            'Rev. 3 (02/09/2026): se añade el seguimiento semanal de VIN pendientes y la prioridad de las unidades de alquiler en circulación, como acción de la campaña REC-VW-2026-001.'
          ] }
        ]
      },
      {
        code: 'FT-SEAT-IBZ-26',
        title: 'Ficha técnica de entrega · Seat Ibiza 1.0 TSI 95 CV (2026)',
        short: 'Ficha técnica · Seat Ibiza 1.0 TSI',
        type: 'Ficha técnica',
        version: '2',
        date: '2026-03-03',
        owner: 'Gestor de marca Seat',
        summary: 'Seat Ibiza 1.0 TSI de 95 CV: garantía de marca de 24 meses, revisión cada 15.000 km o 12 meses, entrega con documentación completa y código VIN interno con formato VIN-año-sede-marca-número.',
        sections: [
          { id: '1', heading: '1. Producto', text: [
            'Seat Ibiza 1.0 TSI de 95 CV, cambio manual de 5 velocidades, acabado Style. Se vende nuevo en el hub de Madrid y se ofrece también en suscripción de 6 meses.'
          ] },
          { id: '2', heading: '2. Garantía y cobertura', text: [
            'Garantía de marca de 24 meses sin límite de kilometraje desde la fecha de entrega. La batería y los consumibles tienen garantía de 12 meses.',
            'La garantía queda sujeta a las revisiones en un taller autorizado de la marca.'
          ] },
          { id: '3', heading: '3. Especificación', list: [
            'Motor: 1.0 TSI de 95 CV, gasolina.',
            'Consumo mixto homologado: 5,3 l/100 km.',
            'Emisiones: 120 g/km de CO2, etiqueta ambiental C.',
            'Capacidad del maletero: 355 litros.'
          ] },
          { id: '4', heading: '4. Revisiones y mantenimiento', text: [
            'Revisión cada 15.000 km o 12 meses, lo que ocurra antes. La primera ITV se pasa a los 4 años de la matriculación.',
            'En suscripción, las revisiones y los neumáticos están incluidos en la cuota y las gestiona el taller del hub.'
          ] },
          { id: '5', heading: '5. Preparación y documentación de entrega', list: [
            'Inspección pre-entrega de 40 puntos y limpieza completa.',
            'Documentación entregada: permiso de circulación, ficha técnica, manual, libro de mantenimiento y contrato firmado en DocuSign.',
            'Matriculación gestionada por el hub en 5 a 10 días tras la firma.'
          ] },
          { id: '6', heading: '6. Equipamiento de serie', list: [
            'Pantalla de 8 pulgadas con Apple CarPlay y Android Auto.',
            'Asistente de mantenimiento de carril y frenada de emergencia.',
            'Llave con mando a distancia y dos juegos de llaves.'
          ] },
          { id: '7', heading: '7. Código VIN interno', text: [
            'Formato VIN-<año>-<sede>-<marca>-<nº>. Ejemplo: VIN-2026-MAD-SEAT-03 es la unidad 03 de Seat registrada en Madrid en 2026 (entrada en campa el 22/09/2026).'
          ] }
        ]
      },
      {
        code: 'MAT-GAR-APM',
        title: 'Matriz de garantías y servicios incluidos por línea de negocio',
        short: 'Matriz de garantías',
        type: 'Matriz',
        version: '9',
        date: '2026-06-30',
        owner: 'Atención al cliente',
        summary: 'Resume qué cubre cada línea del hub de Madrid: venta nueva, venta de ocasión, alquiler, suscripción de 6 meses y taller. Cualquier cambio de cobertura exige revisión previa de Finanzas y de Atención al cliente.',
        sections: [
          { id: '1', heading: '1. Alcance', text: [
            'Recoge, por línea de negocio, la garantía y los servicios incluidos en el hub de Madrid. Se revisa con cada cambio de oferta, de seguro o de condiciones de marca.'
          ] },
          { id: '2', heading: '2. Situación general', text: [
            'Todas las líneas tienen cobertura de asistencia en carretera 24 h a través de Autopista Multimotor.',
            'Las condiciones de cada contrato prevalecen sobre esta matriz; la matriz resume las condiciones estándar vigentes.'
          ] },
          { id: '3', heading: '3. Matriz por línea de negocio', list: [
            'Venta nueva · garantía de marca de 24 meses · revisiones en taller autorizado · financiación con Banco Sabadell opcional.',
            'Venta de ocasión · garantía de 12 meses · revisión previa de 80 puntos · financiación opcional.',
            'Alquiler · seguro a terceros incluido · franquicia por daños según contrato · asistencia 24 h.',
            'Suscripción de 6 meses · mantenimiento, seguro a todo riesgo y asistencia incluidos · cuota mensual sin entrada · permanencia máxima de 6 meses.',
            'Taller · garantía de reparación de 12 meses o 20.000 km · vehículo de sustitución en reparaciones de garantía.'
          ] },
          { id: '4', heading: '4. Control de cambios', text: [
            'Cualquier cambio de cobertura, seguro o proveedor requiere la revisión previa de Finanzas y de Atención al cliente, y la actualización de esta matriz antes de ofrecerlo.',
            'No se prometen coberturas verbales que no figuren en el contrato firmado en DocuSign.'
          ] }
        ]
      }
    ],

    unindexed: {
      'OPE-REC-018': { title: 'Campañas de recall y comunicación a clientes', mentionedIn: { doc: 'OPE-VEH-015', sec: '6', quote: 'según OPE-REC-018 (Campañas de recall y comunicación a clientes)' } }
    },

    suggested: ['stock', 'liberar', 'plazos', 'devolucion', 'recall', 'cobertura'],

    intents: [
      {
        id: 'stock', icon: 'package', topic: 'Stock crítico · alerta y reposición', scope: 'local',
        q: '¿Qué hay que hacer si el stock de un modelo baja del umbral crítico?',
        anchors: ['stock', 'existencias', 'umbral', 'inventario', 'reposición', 'bmw x3'],
        terms: ['baja', 'bajar', 'cae', 'critico', 'crítico', 'unidades', 'modelo', 'alerta', 'reservar', 'reserva', 'actuar', 'agotado', 'quedan', 'campa', 'pedido', 'pedidos'],
        min: 3,
        blocks: [
          { t: 'Si el stock disponible de un modelo baja de 3 unidades, se genera una alerta de stock crítico y las unidades restantes se reservan para pedidos confirmados.', c: [['OPE-STK-012', 4, 'Si el stock disponible de un modelo baja de 3 unidades, se genera una alerta de stock crítico']] },
          { t: 'Si queda 1 unidad o menos, es crítico máximo: además se solicita reposición urgente a la marca y se informa al Responsable de operaciones.', c: [['OPE-STK-012', 4, 'Si queda 1 unidad o menos, el stock es crítico máximo']] },
          { t: 'La reserva se registra a la vez en Odoo Inventario y en SAP ERP con la referencia de la alerta.', c: [['OPE-STK-012', 6, 'La reserva se registra en Odoo Inventario y en SAP ERP con la referencia de la alerta']] },
          { t: 'Cada alerta se evalúa por modelo antes de prometer una fecha de entrega: pedidos abiertos, fecha de recepción de la marca y decisión por pedido.', c: [['OPE-STK-012', 5, 'Cada alerta se evalúa por modelo antes de prometer una fecha de entrega.']] },
          { t: 'Se avisa al Jefe de turno de ventas por Slack para informar a los clientes con pedido abierto.', c: [['OPE-STK-012', 6, 'Se avisa al Jefe de turno de ventas por Slack para informar a los clientes con pedido abierto.']] }
        ],
        context: {
          systems: ['Odoo Inventario', 'SAP ERP'],
          text: 'Alerta ALM-AMS-0730 de hoy: BMW X3 20d con 1 unidad disponible (umbral 3) y recepción prevista el 14/10/2026. Por el apartado 4 es stock crítico máximo: reserva de la unidad, reposición urgente a BMW y aviso a Operaciones.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma ALM-AMS-0730'
        },
        followups: ['liberar', 'reasignar']
      },
      {
        id: 'reasignar', icon: 'layers', topic: 'Stock crítico · traslado entre campas', scope: 'local',
        q: '¿Hay que trasladar unidades del mismo modelo que están en otras campas?',
        anchors: ['otras campas', 'traslado', 'trasladar', 'mismo modelo', 'otra campa', 'reasignar'],
        terms: ['unidades', 'modelo', 'campas', 'stock', 'valorar', 'trasladan', 'automático'],
        min: 3,
        blocks: [
          { t: 'No de forma automática: se marcan «a valorar» y el Responsable de operaciones decide el traslado a la vista del coste y de los pedidos abiertos.', c: [['OPE-STK-012', 4, 'se marcan «a valorar» y el Responsable de operaciones decide el traslado a la vista del coste y de los pedidos abiertos']] },
          { t: 'Una bajada con recepción confirmada en menos de 3 días se registra sin reposición urgente.', c: [['OPE-STK-012', 4, 'con recepción confirmada en menos de 3 días se registra sin reposición urgente']] }
        ],
        context: {
          systems: ['Odoo Inventario'],
          text: 'Odoo Inventario no muestra otra unidad de BMW X3 20d en las campas del grupo. El BMW X5 40d (8 unidades en Madrid) queda «a valorar» como alternativa para el cliente en espera.',
          go: 'alarma', goLabel: 'Abrir alarma ALM-AMS-0730'
        },
        followups: ['stock', 'impacto']
      },
      {
        id: 'responsables', icon: 'users', topic: 'Stock crítico · responsabilidades', scope: 'local',
        q: '¿Quién hace qué ante una alerta de stock crítico?',
        anchors: ['responsable', 'responsables', 'responsabilidad', 'responsabilidades', 'gestor de marca', 'jefe de turno de ventas'],
        terms: ['stock', 'crítico', 'alerta', 'quién', 'hace', 'decide', 'aprueba', 'reposición'],
        min: 4,
        blocks: [
          { intro: { t: 'Reparto de responsabilidades ante una alerta de stock crítico:' }, list: [
            { t: 'Jefe de turno de ventas: valora la alerta, prioriza los pedidos abiertos e informa a los clientes afectados.', c: [['OPE-STK-012', 3, 'Jefe de turno de ventas: valora la alerta, prioriza los pedidos abiertos e informa a los clientes afectados.']] },
            { t: 'Gestor de marca: solicita la reposición urgente y confirma la fecha de recepción.', c: [['OPE-STK-012', 3, 'Gestor de marca: solicita la reposición urgente y confirma la fecha de recepción.']] },
            { t: 'Responsable de operaciones: aprueba la reposición urgente y el traslado entre campas.', c: [['OPE-STK-012', 3, 'Responsable de operaciones: aprueba la reposición urgente y el traslado entre campas.']] }
          ] },
          { t: 'Si queda 1 unidad o menos, se informa además al Responsable de operaciones.', c: [['OPE-STK-012', 4, 'se informa al Responsable de operaciones']] }
        ],
        context: {
          systems: ['Salesforce CRM', 'Slack'],
          text: 'En la alerta de hoy, el Gestor de marca BMW tiene que confirmar la recepción del 14/10/2026 y el Jefe de turno de ventas debe informar al cliente en espera del BMW X3 20d.',
          go: 'alarma', goLabel: 'Abrir alarma ALM-AMS-0730'
        },
        followups: ['stock', 'liberar']
      },
      {
        id: 'impacto', icon: 'clipboard-check', topic: 'Stock crítico · impacto en pedidos', scope: 'local',
        q: '¿Cómo se evalúa el impacto de un stock crítico en los pedidos abiertos?',
        anchors: ['impacto', 'evalúa', 'evaluar', 'evaluación', 'pedidos abiertos', 'fecha comprometida'],
        terms: ['stock', 'crítico', 'pedido', 'pedidos', 'entrega', 'cliente', 'fecha', 'alternativa', 'renegociar'],
        min: 3,
        blocks: [
          { intro: { t: 'La evaluación se hace por modelo y antes de prometer una fecha:', c: [['OPE-STK-012', 5, 'Cada alerta se evalúa por modelo antes de prometer una fecha de entrega.']] }, list: [
            { t: 'Contar los pedidos abiertos del modelo en Salesforce CRM y su fecha comprometida.', c: [['OPE-STK-012', 5, 'Contar los pedidos abiertos del modelo en Salesforce CRM y su fecha comprometida.']] },
            { t: 'Comprobar en SAP ERP la fecha de recepción confirmada por la marca.', c: [['OPE-STK-012', 5, 'Comprobar en SAP ERP la fecha de recepción confirmada por la marca.']] },
            { t: 'Decidir por pedido: mantener la fecha, ofrecer una unidad alternativa o renegociar la entrega.', c: [['OPE-STK-012', 5, 'Decidir por pedido: mantener la fecha, ofrecer una unidad alternativa o renegociar la entrega con el cliente.']] }
          ] },
          { t: 'La reposición urgente la aprueba el Responsable de operaciones.', c: [['OPE-STK-012', 5, 'La reposición urgente la aprueba el Responsable de operaciones.']] }
        ],
        followups: ['stock', 'reasignar']
      },
      {
        id: 'liberar', icon: 'unlock', topic: 'Bloqueo y liberación de vehículos', scope: 'local',
        q: '¿Quién puede liberar un vehículo bloqueado?',
        anchors: ['liberar', 'liberación', 'libera', 'liberarlo', 'desbloquear', 'desbloqueo', 'decisión de empleo'],
        terms: ['quién', 'vehículo', 'coche', 'bloqueado', 'bloqueo', 'retenido', 'retención', 'firma', 'autoriza', 'puede'],
        min: 3,
        blocks: [
          { t: 'Solo el Responsable de operaciones o, por delegación, el Jefe de taller.', c: [['OPE-VEH-015', 2, 'Solo el Responsable de operaciones (o, por delegación, el Jefe de taller) puede liberar un vehículo bloqueado.']] },
          { t: 'La liberación exige evidencia documentada (resultado de la inspección o reparación en iCare Taller y conclusión firmada) y se registra como decisión de empleo en SAP ERP: liberar, reparar o devolver a la marca.', c: [['OPE-VEH-015', 4, 'La liberación exige evidencia documentada: resultado de la inspección o reparación en iCare Taller y conclusión firmada.'], ['OPE-VEH-015', 4, 'puede ser liberar, reparar o devolver a la marca']] },
          { t: 'Ningún vehículo se libera por defecto ni por vencimiento de plazo.', c: [['OPE-VEH-015', 4, 'Ningún vehículo se libera por defecto ni por vencimiento de plazo.']] },
          { t: 'Si la inspección lo permite, la liberación puede hacerse por VIN.', c: [['OPE-VEH-015', 5, 'Un conjunto de vehículos puede liberarse por VIN']] }
        ],
        followups: ['registro', 'entregado']
      },
      {
        id: 'bloqueo-quien', icon: 'user-check', topic: 'Bloqueo comercial · quién decide', scope: 'local',
        q: '¿Quién decide un bloqueo comercial de un vehículo?',
        anchors: ['bloqueo', 'bloquear', 'bloquea', 'retención', 'retener'],
        terms: ['quién', 'decide', 'aprueba', 'autoriza', 'propone', 'responsable', 'firma', 'comercial'],
        min: 4,
        blocks: [
          { t: 'Cualquier jefe de turno puede proponer un bloqueo al detectar una desviación.', c: [['OPE-VEH-015', 2, 'Cualquier jefe de turno puede proponer un bloqueo al detectar una desviación.']] },
          { t: 'Lo aprueba el Jefe de taller, que también define su alcance.', c: [['OPE-VEH-015', 2, 'El Jefe de taller aprueba el bloqueo y define su alcance.']] },
          { t: 'Liberar, en cambio, solo puede hacerlo el Responsable de operaciones o, por delegación, el Jefe de taller.', c: [['OPE-VEH-015', 2, 'Solo el Responsable de operaciones (o, por delegación, el Jefe de taller) puede liberar un vehículo bloqueado.']] }
        ],
        followups: ['liberar', 'registro']
      },
      {
        id: 'registro', icon: 'lock', topic: 'Bloqueo y liberación · registro', scope: 'local',
        q: '¿Dónde se registra un bloqueo comercial?',
        anchors: ['registra', 'registrar', 'registro', 'odoo', 'inmovilizar', 'inmovilizados'],
        terms: ['bloqueo', 'bloquear', 'bloqueado', 'comercial', 'vehículo', 'vin', 'dónde'],
        min: 3,
        blocks: [
          { t: 'A la vez en Odoo Inventario (vehículo con bloqueo comercial) y en Salesforce CRM (entrega retenida y cliente avisado).', c: [['OPE-VEH-015', 3, 'Todo bloqueo se registra a la vez en Odoo Inventario (vehículo con bloqueo comercial) y en Salesforce CRM (entrega retenida y cliente avisado).']] },
          { t: 'Salesforce CRM no permite programar la entrega de un vehículo bloqueado.', c: [['OPE-VEH-015', 3, 'Salesforce CRM no permite programar la entrega de un vehículo bloqueado.']] },
          { t: 'El registro incluye el motivo, el alcance (VIN y ubicaciones), la referencia de origen y quién lo aprueba.', c: [['OPE-VEH-015', 3, 'El registro incluye el motivo, el alcance (VIN y ubicaciones), la referencia de origen (alerta, reclamación o campaña de recall) y quién lo aprueba.']] }
        ],
        followups: ['liberar']
      },
      {
        id: 'entregado', icon: 'truck', topic: 'Vehículo ya entregado', scope: 'local', kind: 'partial',
        q: '¿Qué se hace si el vehículo afectado ya se ha entregado al cliente?',
        anchors: ['=entregado', '=entregada', '=entregados', '=entregadas', 'ya se entregó', 'ya ha salido', 'en el cliente'],
        terms: ['vehículo', 'coche', 'afectado', 'bloqueo', 'unidades', 'cliente', 'recall'],
        min: 2,
        blocks: [
          { t: 'Si parte de las unidades ya se ha entregado, el Responsable de operaciones valora la campaña de llamada a taller según OPE-REC-018 e informa al cliente.', c: [['OPE-VEH-015', 6, 'el Responsable de operaciones valora la campaña de llamada a taller según OPE-REC-018 (Campañas de recall y comunicación a clientes)']] }
        ],
        note: 'OPE-REC-018 (Campañas de recall y comunicación a clientes) no está entre los documentos indexados: los pasos de la campaña no se pueden detallar desde esta consulta.',
        followups: ['liberar']
      },
      {
        id: 'plazos', icon: 'mail', topic: 'Reclamaciones de cliente · plazos', scope: 'all',
        q: '¿Qué plazos tenemos para responder a una reclamación de cliente?',
        anchors: ['reclamación', 'reclamaciones', 'queja', 'quejas', '8d'],
        terms: ['plazo', 'plazos', 'tiempo', 'responder', 'contestar', 'acuse', 'días', 'horas', 'cuándo', 'enviar', 'entregar', 'límite', 'vence', 'tenemos', 'gestiona', 'gestionar', 'gestión', 'proceso', 'procedimiento', 'tratar', 'trata'],
        min: 3,
        blocks: [
          { intro: { t: 'Plazos del procedimiento de reclamaciones:' }, list: [
            { t: 'Acuse de recibo al cliente en 24 h desde la recepción.', c: [['OPE-CLI-020', 2, 'Acuse de recibo al cliente: 24 h desde la recepción.']] },
            { t: 'Contención en 48 h: identificar y bloquear la operación o el vehículo reclamado.', c: [['OPE-CLI-020', 2, 'Contención: 48 h para identificar y bloquear la operación o el vehículo reclamado']] },
            { t: 'Informe 8D en el plazo pactado con el cliente; si no hay plazo pactado, 5 días hábiles.', c: [['OPE-CLI-020', 2, 'Informe 8D: en el plazo pactado con el cliente; si no hay plazo pactado, 5 días hábiles.']] }
          ] },
          { t: 'La respuesta se redacta en el idioma del cliente y la aprueba el Responsable de operaciones antes de enviarla.', c: [['OPE-CLI-020', 6, 'La respuesta se redacta en el idioma del cliente y la aprueba el Responsable de operaciones antes de enviarla.']] }
        ],
        context: {
          systems: ['Salesforce CRM'],
          text: 'Reclamación CLM-2026-001 (José María López, BMW X3), abierta el 01/10/2026: la TAE del contrato es 3,99 % y la factura recoge 4,25 %. El acuse de 24 h está enviado y el informe 8D vence el 08/10/2026 (5 días hábiles).',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación CLM-2026-001'
        },
        followups: ['tae', '8d']
      },
      {
        id: '8d', icon: 'list-checks', topic: 'Reclamaciones · informe 8D', scope: 'all',
        q: '¿Qué debe incluir un informe 8D?',
        anchors: ['8d', 'ocho disciplinas', 'd1', 'd4', 'd8'],
        terms: ['informe', 'incluir', 'incluye', 'pasos', 'contenido', 'estructura', 'apartados', 'disciplinas', 'partes', 'plantilla'],
        min: 2,
        blocks: [
          { intro: { t: 'El informe 8D se prepara en Salesforce CRM y sigue ocho pasos:', c: [['OPE-CLI-020', 5, 'El informe 8D se prepara en Salesforce CRM y sigue ocho pasos:']] }, list: [
            { t: 'D1 · Equipo: Atención al cliente, Finanzas y la línea de negocio afectada.' },
            { t: 'D2 · Descripción del problema con los datos del cliente.' },
            { t: 'D3 · Contención: operación o vehículo bloqueado y cliente informado.' },
            { t: 'D4 · Causa raíz, confirmada con evidencia.' },
            { t: 'D5 · Acciones correctivas.' },
            { t: 'D6 · Implantación y verificación de la eficacia.' },
            { t: 'D7 · Prevención: cambios en procedimientos, plantillas de contrato o formación.' },
            { t: 'D8 · Cierre y comunicación al cliente.' }
          ] },
          { t: 'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.', c: [['OPE-CLI-020', 6, 'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.']] }
        ],
        followups: ['plazos', 'tae']
      },
      {
        id: 'tae', icon: 'search', topic: 'Reclamaciones · disputas de TAE', scope: 'all',
        q: '¿Cómo se investiga una disputa de TAE en una financiación?',
        anchors: ['tae', 'apr', 'tipo de interés', 'intereses', 'financiación', 'financiacion', 'cuota', 'cuotas', 'sobrecoste'],
        terms: ['reclamación', 'reclamaciones', 'disputa', 'investiga', 'investigar', 'investigación', 'gravedad', 'clasifica', 'cliente', 'banco', 'factura', 'contrato'],
        min: 3,
        blocks: [
          { t: 'Es de gravedad crítica: discrepancia económica de 2.000 EUR o más, aunque el cliente no haya pagado todavía.', c: [['OPE-CLI-020', 3, 'Gravedad crítica: discrepancia económica de 2.000 EUR o más']] },
          { intro: { t: 'La investigación revisa como mínimo:', c: [['OPE-CLI-020', 4, 'La investigación de una disputa de TAE revisa, como mínimo:']] }, list: [
            { t: 'El contrato firmado en DocuSign y la TAE que figura en él.', c: [['OPE-CLI-020', 4, 'El contrato firmado en DocuSign y la TAE que figura en él.']] },
            { t: 'La oferta de financiación aprobada por la entidad y su fecha.', c: [['OPE-CLI-020', 4, 'La oferta de financiación aprobada por la entidad (Banco Sabadell) y su fecha.']] },
            { t: 'La factura y el plan de cuotas emitidos desde SAP ERP.', c: [['OPE-CLI-020', 4, 'La factura y el plan de cuotas emitidos desde SAP ERP.']] },
            { t: 'Las comunicaciones enviadas al cliente y las reclamaciones de TAE de los últimos 12 meses.', c: [['OPE-CLI-020', 4, 'Las comunicaciones enviadas al cliente y las reclamaciones de TAE de los últimos 12 meses.']] }
          ] },
          { t: 'En la respuesta al cliente, la causa se presenta como hipótesis hasta que haya evidencia.', c: [['OPE-CLI-020', 6, 'Una causa solo se comunica como confirmada cuando hay evidencia']] }
        ],
        context: {
          systems: ['Salesforce CRM', 'SAP ERP', 'DocuSign'],
          text: 'CLM-2026-001: el contrato de José María López, firmado en DocuSign, recoge una TAE del 3,99 % con Banco Sabadell, pero la factura de SAP ERP aplica el 4,25 %: 2.400 EUR de sobrecoste en el plan de cuotas. Es de gravedad crítica por el apartado 3.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación CLM-2026-001'
        },
        followups: ['plazos', '8d']
      },
      {
        id: 'devolucion', icon: 'shield-check', topic: 'Flota de alquiler · devolución e inspección', scope: 'local',
        q: '¿Qué inspección se hace a un coche de alquiler en la devolución y qué pasa si hay daños?',
        anchors: ['devolución', 'devolver', 'devuelve', 'inspección', 'inspecciona', 'franquicia', 'daños', 'raya', 'alquiler'],
        terms: ['coche', 'vehículo', 'fotos', 'cliente', 'cargo', 'peritaje', 'imputa', 'imputar', 'comparación', 'combustible'],
        min: 2,
        blocks: [
          { t: 'En cada devolución se repite la inspección con fotos 360° y se compara con la de entrega: daños nuevos, combustible, kilometraje, limpieza y estado de neumáticos y luces.', c: [['OPE-ALQ-034', 3, 'En cada devolución se repite la inspección con fotos 360° y se compara con la de entrega.']] },
          { t: 'Se imputa al cliente todo daño nuevo que aparezca en la comparación de fotos, hasta el importe de la franquicia contratada.', c: [['OPE-ALQ-034', 4, 'Se imputa al cliente todo daño nuevo que aparezca en la comparación de fotos, hasta el importe de la franquicia contratada.']] },
          { t: 'Si el daño supera los 500 EUR o el cliente lo discute, se retiene el cargo y se abre una reclamación; el vehículo pasa a peritaje en taller antes de volver a la flota.', c: [['OPE-ALQ-034', 4, 'Si el daño supera los 500 EUR o el cliente lo discute, se retiene el cargo']] },
          { t: 'Los resultados se registran en Odoo Inventario, con los cargos en Stripe Pagos y SAP ERP.', c: [['OPE-ALQ-034', 6, 'Cargos de fianza y daños: Stripe Pagos y SAP ERP.']] }
        ],
        context: {
          systems: ['Odoo Inventario', 'Stripe Pagos'],
          text: 'CLM-2026-003: Volkswagen Golf de alquiler con una raya en la puerta lateral (800 EUR). El cliente niega haberla causado y el peritaje está pendiente; por el apartado 4 se retiene el cargo hasta tener la comparación de fotos.',
          go: 'reclamacion', goLabel: 'Abrir reclamaciones'
        },
        followups: ['flota', 'plazos']
      },
      {
        id: 'flota', icon: 'car', topic: 'Flota de alquiler · disponibilidad', scope: 'local',
        q: '¿Qué hacer si la flota de alquiler disponible baja del 70 %?',
        anchors: ['flota', 'flotas', 'disponibilidad', 'utilización', 'ocupación', 'respaldo'],
        terms: ['alquiler', 'baja', 'disponible', 'porcentaje', 'activar', 'umbral', 'hacer', 'coches', 'vehículos'],
        min: 3,
        blocks: [
          { t: 'Si la flota disponible baja del 70 % del total, el Gestor de flota de alquiler activa la flota de respaldo y avisa al Responsable de operaciones.', c: [['OPE-ALQ-034', 5, 'Si la flota disponible baja del 70 % del total, el Gestor de flota de alquiler activa la flota de respaldo y avisa al Responsable de operaciones.']] },
          { t: 'La utilización objetivo es del 70 % o más y la ocupación se revisa cada mañana en Odoo Inventario.', c: [['OPE-ALQ-034', 5, 'La utilización objetivo es del 70 % o más; la ocupación se revisa cada mañana en Odoo Inventario.']] }
        ],
        context: {
          systems: ['Odoo Inventario'],
          text: 'Hoy hay 847 de 1.000 vehículos disponibles (84,7 %) y una utilización del 75,3 %: por encima del 70 %, no hace falta activar la flota de respaldo. Con 47 Golf del recall ABS, la disponibilidad se vigila a diario.',
          go: 'turno', goLabel: 'Ver parte diario'
        },
        followups: ['devolucion', 'recall']
      },
      {
        id: 'taller-carga', icon: 'gauge', topic: 'Taller · capacidad efectiva', scope: 'local',
        q: '¿Qué hacer si la capacidad efectiva del taller cae por debajo del 80 %?',
        anchors: ['capacidad', 'carga', 'saturado', 'saturación', 'preventivo', 'mantenimiento preventivo'],
        terms: ['taller', 'efectiva', 'baja', 'cae', 'reprogramar', 'reprograma', 'citas', 'hacer', 'escalar', 'horas'],
        min: 3,
        blocks: [
          { t: 'Por debajo del 80 %, se reprograma el mantenimiento preventivo y se informa a los clientes afectados.', c: [['OPE-TAL-031', 3, 'Por debajo del 80 %, se reprograma el mantenimiento preventivo y se informa a los clientes afectados']] },
          { t: 'Por debajo del 60 %, se escala al Responsable de operaciones.', c: [['OPE-TAL-031', 3, 'por debajo del 60 %, se escala al Responsable de operaciones']] },
          { t: 'La capacidad efectiva es el cociente entre las horas de técnico disponibles y las previstas en el turno.', c: [['OPE-TAL-031', 3, 'La capacidad efectiva es el cociente entre las horas de técnico disponibles y las previstas en el turno.']] }
        ],
        context: {
          systems: ['iCare Taller'],
          text: 'Hoy el taller trabaja al 70 % de capacidad efectiva por la baja médica de un técnico de Volkswagen: 23 órdenes en cola y 15 mantenimientos programados. Por el apartado 3, hay que reprogramar el preventivo y avisar a los clientes.',
          go: 'alarma', goLabel: 'Abrir alarma ALM-AMS-0730'
        },
        followups: ['tecnico', 'cobertura']
      },
      {
        id: 'tecnico', icon: 'wrench', topic: 'Taller · ausencia de un técnico de marca', scope: 'all',
        q: '¿Qué hacer si falta un técnico de una marca en el taller?',
        anchors: ['técnico', 'técnicos', 'mecánico', 'mecánicos', 'ausencia', 'baja médica', 'polivalente'],
        terms: ['falta', 'ausente', 'marca', 'taller', 'volkswagen', 'vw', 'cubrir', 'reasignar', 'baja', 'hacer', 'citas'],
        min: 2,
        blocks: [
          { t: 'Se reasigna el trabajo a un técnico polivalente certificado de la marca y se prioriza la garantía y el recall sobre el mantenimiento preventivo.', c: [['OPE-TAL-031', 4, 'Se reasigna el trabajo a un técnico polivalente certificado de la marca y se prioriza la garantía y el recall sobre el mantenimiento preventivo.']] },
          { t: 'El mantenimiento preventivo se reprograma con aviso por Twilio SMS al cliente, con nueva cita en un máximo de 5 días hábiles.', c: [['OPE-TAL-031', 4, 'Se reprograma el mantenimiento preventivo con aviso por Twilio SMS al cliente, con nueva cita en un máximo de 5 días hábiles.']] },
          { t: 'Si la marca queda con menos de 3 técnicos, no se aceptan nuevas citas de preventivo de esa marca hasta recuperar la cobertura.', c: [['OPE-TAL-031', 4, 'Si la marca queda con menos de 3 técnicos, no se aceptan nuevas citas de mantenimiento preventivo de esa marca hasta recuperar la cobertura.']] }
        ],
        context: {
          systems: ['iCare Taller', 'Twilio SMS'],
          text: 'Desde las 06:00 falta un técnico de Volkswagen por baja médica. La capacidad del taller baja un 30 % y hay mantenimientos preventivos de VW por reprogramar, con prioridad para el recall del Golf (REC-VW-2026-001).',
          go: 'alarma', goLabel: 'Abrir alarma ALM-AMS-0730'
        },
        followups: ['cobertura', 'recall']
      },
      {
        id: 'cobertura', icon: 'users', topic: 'Taller · cobertura de técnicos', scope: 'all',
        q: '¿Cada cuánto se revisa la cobertura de técnicos de cada marca?',
        anchors: ['cobertura', 'técnicos disponibles', 'mínimo de técnicos', 'iCare'],
        terms: ['cada cuánto', 'frecuencia', 'turno', 'revisa', 'revisar', 'revisión', 'marca', 'mínimo', 'técnicos', 'taller'],
        min: 3,
        blocks: [
          { intro: { t: 'El Jefe de taller revisa la cobertura al inicio de cada turno en iCare Taller y registra cada ausencia el mismo día. Reglas:', c: [['OPE-TAL-031', 2, 'El Jefe de taller revisa la cobertura al inicio de cada turno en iCare Taller y registra cada ausencia el mismo día:']] }, list: [
            { t: 'Cada marca tiene como mínimo 3 técnicos disponibles por turno.', c: [['OPE-TAL-031', 2, 'Cada marca tiene como mínimo 3 técnicos disponibles por turno.']] },
            { t: 'Los técnicos de baja o en formación no cuentan como disponibles.' },
            { t: 'Un técnico polivalente solo cubre una marca con la certificación vigente.' }
          ] },
          { t: 'La cobertura por marca se revisa además en la reunión semanal de taller.', c: [['OPE-TAL-031', 5, 'La cobertura por marca se revisa en la reunión semanal de taller.']] }
        ],
        followups: ['tecnico']
      },
      {
        id: 'recall', icon: 'alert-triangle', topic: 'Recall · Golf con módulo ABS', scope: 'all',
        q: '¿Qué hacer con un Volkswagen Golf afectado por el recall del módulo ABS?',
        anchors: ['recall', 'abs', 'módulo abs', 'campaña', 'golf', 'rec-vw-2026-001'],
        terms: ['afectado', 'afectada', 'volkswagen', 'vw', 'módulo', 'sustituir', 'sustitución', 'cambiar', 'cambio', 'hacer', 'orden de trabajo', 'bloquear', 'entregar'],
        min: 2,
        blocks: [
          { t: 'Se bloquea el vehículo y se abre una orden de trabajo en iCare Taller con la sustitución programada del módulo, informando a la línea de negocio el mismo día.', c: [['IT-TAL-VW-02', 4, 'Se bloquea el vehículo (OPE-VEH-015) y se abre una orden de trabajo en iCare Taller con la sustitución programada del módulo, informando a la línea de negocio el mismo día.']] },
          { t: 'Hasta la sustitución, el vehículo de alquiler o suscripción no sale a un cliente nuevo; el cliente que lo tiene recibe un vehículo de sustitución.', c: [['IT-TAL-VW-02', 4, 'Hasta la sustitución, el vehículo de alquiler o suscripción no sale a un cliente nuevo']] },
          { t: 'Si el módulo muestra una avería activa, el vehículo no circula y se remolca al taller.', c: [['IT-TAL-VW-02', 4, 'Si el módulo muestra una avería activa, el vehículo no circula y se remolca al taller.']] },
          { t: 'Tras el cambio se verifica el frenado en banco con 3 ciclos de ABS correctos antes de liberar.', c: [['IT-TAL-VW-02', 5, 'Tras cambiar el módulo se verifica el frenado en banco con 3 ciclos de ABS correctos.']] }
        ],
        context: {
          systems: ['iCare Taller', 'Odoo Inventario'],
          text: 'REC-VW-2026-001: 47 Golf y Passat afectados, 35 pendientes (25,5 % de cumplimiento) con plazo el 15/11/2026. Con el técnico de VW de baja, el ritmo de sustituciones corre riesgo.',
          outcome: 'retirada',
          go: 'retirada', goLabel: 'Abrir campaña REC-VW-2026-001'
        },
        followups: ['recall-seguimiento', 'tecnico']
      },
      {
        id: 'recall-seguimiento', icon: 'wrench', topic: 'Recall · seguimiento de la campaña', scope: 'all',
        q: '¿Cada cuánto se revisa el avance de la campaña de recall del Golf?',
        anchors: ['seguimiento', 'avance', 'cumplimiento', 'vin pendientes', 'lunes'],
        terms: ['cada cuánto', 'frecuencia', 'semanal', 'semana', 'recall', 'campaña', 'golf', 'revisa', 'revisar', 'prioridad'],
        min: 3,
        blocks: [
          { intro: { t: 'Cada lunes el Jefe de taller cruza los VIN de la campaña con iCare Taller y actualiza el cumplimiento. Se revisan:', c: [['IT-TAL-VW-02', 2, 'Cada lunes el Jefe de taller cruza los VIN de la campaña con iCare Taller y actualiza el cumplimiento:']] }, list: [
            { t: 'VIN pendientes, con su ubicación (campa, alquiler o suscripción).' },
            { t: 'Citas de taller programadas y fecha prevista de repuesto.' },
            { t: 'Unidades bloqueadas y entregas retenidas por la campaña.' }
          ] },
          { t: 'Se priorizan las unidades de alquiler en circulación, las de suscripción y las de campa con entrega comprometida, por este orden.', c: [['IT-TAL-VW-02', 3, 'Se priorizan, por este orden, las unidades de alquiler en circulación, las de suscripción y las de campa con entrega comprometida.']] }
        ],
        followups: ['recall']
      },
      {
        id: 'ficha', icon: 'file-text', topic: 'Ficha técnica · Seat Ibiza 1.0 TSI', scope: 'local',
        q: '¿Qué garantía incluye la ficha técnica del Seat Ibiza?',
        anchors: ['ficha técnica', 'ficha', 'garantía', 'garantias', 'especificación', 'especificaciones', 'seat ibiza', 'ibiza'],
        terms: ['seat', 'cobertura', 'incluye', 'meses', 'batería', 'consumo', 'maletero', 'técnica', 'motor'],
        min: 2,
        blocks: [
          { intro: { t: 'La ficha técnica del Seat Ibiza 1.0 TSI de 95 CV (FT-SEAT-IBZ-26) fija, entre otros:', c: [['FT-SEAT-IBZ-26', 1, 'Seat Ibiza 1.0 TSI de 95 CV, cambio manual de 5 velocidades, acabado Style.']] }, list: [
            { t: 'Garantía de marca de 24 meses sin límite de kilometraje desde la entrega.', c: [['FT-SEAT-IBZ-26', 2, 'Garantía de marca de 24 meses sin límite de kilometraje desde la fecha de entrega.']] },
            { t: 'Batería y consumibles con 12 meses de garantía.', c: [['FT-SEAT-IBZ-26', 2, 'La batería y los consumibles tienen garantía de 12 meses.']] },
            { t: 'Consumo mixto homologado de 5,3 l/100 km.', c: [['FT-SEAT-IBZ-26', 3, 'Consumo mixto homologado: 5,3 l/100 km.']] },
            { t: 'Emisiones de 120 g/km de CO2 y etiqueta ambiental C.', c: [['FT-SEAT-IBZ-26', 3, 'Emisiones: 120 g/km de CO2, etiqueta ambiental C.']] },
            { t: 'Maletero de 355 litros.', c: [['FT-SEAT-IBZ-26', 3, 'Capacidad del maletero: 355 litros.']] }
          ] }
        ],
        context: {
          systems: ['Salesforce CRM'],
          text: 'VIN-2026-MAD-SEAT-03 es un Seat Ibiza 1.0 TSI en campa, con entrega en curso: la garantía de 24 meses se cuenta desde la fecha de entrega al cliente, no desde la matriculación.',
          go: 'trace', goLabel: 'Ver la traza del vehículo'
        },
        followups: ['revisiones', 'vin']
      },
      {
        id: 'revisiones', icon: 'calendar', topic: 'Ficha técnica · revisiones y ITV', scope: 'local',
        q: '¿Cada cuánto hay que revisar el Seat Ibiza y cuándo pasa la ITV?',
        anchors: ['revisión', 'revisiones', 'itv', 'mantenimiento', 'kilómetros', 'kilometraje'],
        terms: ['ibiza', 'seat', 'cada cuánto', 'meses', 'primera', 'años', 'taller', 'suscripción'],
        min: 2,
        blocks: [
          { t: 'Revisión cada 15.000 km o 12 meses, lo que ocurra antes.', c: [['FT-SEAT-IBZ-26', 4, 'Revisión cada 15.000 km o 12 meses, lo que ocurra antes.']] },
          { t: 'La primera ITV se pasa a los 4 años de la matriculación.', c: [['FT-SEAT-IBZ-26', 4, 'La primera ITV se pasa a los 4 años de la matriculación.']] },
          { t: 'En suscripción, las revisiones y los neumáticos están incluidos en la cuota y los gestiona el taller del hub.', c: [['FT-SEAT-IBZ-26', 4, 'En suscripción, las revisiones y los neumáticos están incluidos en la cuota y las gestiona el taller del hub.']] }
        ],
        followups: ['ficha', 'vin']
      },
      {
        id: 'vin', icon: 'barcode', topic: 'Código VIN interno', scope: 'local',
        q: '¿Cómo se lee el código VIN interno de un vehículo?',
        anchors: ['vin', 'código vin', 'codigo vin', 'bastidor', 'formato vin', 'vin-2026-mad-seat-03'],
        terms: ['código', 'leer', 'lee', 'significa', 'interpreta', 'formato', 'interno', 'sede', 'marca'],
        min: 2,
        blocks: [
          { t: 'Formato VIN-<año>-<sede>-<marca>-<nº>.', c: [['FT-SEAT-IBZ-26', 7, 'Formato VIN-<año>-<sede>-<marca>-<nº>.']] },
          { t: 'Por ejemplo, VIN-2026-MAD-SEAT-03 es la unidad 03 de Seat registrada en Madrid en 2026, con entrada en campa el 22/09/2026.', c: [['FT-SEAT-IBZ-26', 7, 'VIN-2026-MAD-SEAT-03 es la unidad 03 de Seat registrada en Madrid en 2026 (entrada en campa el 22/09/2026).']] }
        ],
        context: {
          systems: ['Odoo Inventario', 'SAP ERP', 'Salesforce CRM'],
          text: 'Traza completa del vehículo del ejemplo, desde la entrada en campa hasta la entrega al cliente:',
          lot: 'VIN-2026-MAD-SEAT-03'
        },
        followups: ['ficha', 'documentacion']
      },
      {
        id: 'documentacion', icon: 'clipboard-list', topic: 'Ficha técnica · documentación de entrega', scope: 'local',
        q: '¿Qué documentación se entrega con el vehículo?',
        anchors: ['documentación', 'documentacion', 'entrega', 'permiso de circulación', 'libro de mantenimiento', 'matriculación'],
        terms: ['vehículo', 'coche', 'cliente', 'entregan', 'entrega', 'llaves', 'contrato', 'docusign', 'preentrega', 'puntos'],
        min: 3,
        blocks: [
          { t: 'Permiso de circulación, ficha técnica, manual, libro de mantenimiento y contrato firmado en DocuSign.', c: [['FT-SEAT-IBZ-26', 5, 'Documentación entregada: permiso de circulación, ficha técnica, manual, libro de mantenimiento y contrato firmado en DocuSign.']] },
          { t: 'Antes de la entrega se hace una inspección pre-entrega de 40 puntos y limpieza completa.', c: [['FT-SEAT-IBZ-26', 5, 'Inspección pre-entrega de 40 puntos y limpieza completa.']] },
          { t: 'La matriculación la gestiona el hub en 5 a 10 días tras la firma.', c: [['FT-SEAT-IBZ-26', 5, 'Matriculación gestionada por el hub en 5 a 10 días tras la firma.']] }
        ],
        followups: ['vin']
      },
      {
        id: 'garantias', icon: 'shield', topic: 'Garantías y servicios por línea de negocio', scope: 'local',
        q: '¿Qué cobertura incluye la suscripción de 6 meses?',
        anchors: ['suscripción', 'suscripciones', 'suscribir', 'cobertura', 'coberturas', 'garantía', 'garantías', 'incluido', 'incluye', 'seguro', 'asistencia'],
        terms: ['meses', 'línea', 'matriz', 'permanencia', 'cuota', 'mantenimiento', 'todo riesgo', 'alquiler', 'taller', 'venta'],
        min: 2,
        blocks: [
          { t: 'Todas las líneas tienen asistencia en carretera 24 h a través de Autopista Multimotor.', c: [['MAT-GAR-APM', 2, 'Todas las líneas tienen cobertura de asistencia en carretera 24 h a través de Autopista Multimotor.']] },
          { t: 'Suscripción de 6 meses: mantenimiento, seguro a todo riesgo y asistencia incluidos, cuota mensual sin entrada y permanencia máxima de 6 meses.', c: [['MAT-GAR-APM', 3, 'Suscripción de 6 meses · mantenimiento, seguro a todo riesgo y asistencia incluidos · cuota mensual sin entrada · permanencia máxima de 6 meses.']] },
          { t: 'Las condiciones de cada contrato prevalecen sobre la matriz, que resume las condiciones estándar vigentes.', c: [['MAT-GAR-APM', 2, 'Las condiciones de cada contrato prevalecen sobre esta matriz']] }
        ],
        /* Si la pregunta nombra una línea de negocio, añade su fila de la matriz (MAT-GAR-APM §3). */
        build: (q) => {
          const K = window.CN_DOCS;
          const lines = [
            { words: ['ocasión', 'ocasion', 'segunda mano', 'usado', 'usados'], key: 'Venta de ocasión' },
            { words: ['venta nueva', 'nuevo', 'nuevos', 'nueva'], key: 'Venta nueva' },
            { words: ['alquiler', 'rent-a-car', 'rent a car', 'alquilar'], key: 'Alquiler' },
            { words: ['taller', 'reparación', 'reparacion'], key: 'Taller' }
          ];
          const C = (doc, sec, quote) => [doc, sec, quote];
          const blocks = [
            { t: 'Todas las líneas tienen asistencia en carretera 24 h a través de Autopista Multimotor.', c: [C('MAT-GAR-APM', 2, 'Todas las líneas tienen cobertura de asistencia en carretera 24 h a través de Autopista Multimotor.')] },
            { t: 'Suscripción de 6 meses: mantenimiento, seguro a todo riesgo y asistencia incluidos, cuota mensual sin entrada y permanencia máxima de 6 meses.', c: [C('MAT-GAR-APM', 3, 'Suscripción de 6 meses · mantenimiento, seguro a todo riesgo y asistencia incluidos · cuota mensual sin entrada · permanencia máxima de 6 meses.')] }
          ];
          if (K && typeof K.normalize === 'function') {
            const n = ` ${K.normalize(q)} `;
            const hit = lines.find((p) => p.words.some((w) => n.includes(` ${K.normalize(w)} `)));
            const sec = hit ? K.section('MAT-GAR-APM', '3') : null;
            const text = sec && (sec.list || []).find((t) => t.indexOf(hit.key) === 0);
            if (text) blocks.push({ t: `${text.split(' · ')[0]}: ${text.split(' · ').slice(1).join(', ').replace(/\.$/, '')}.`, c: [C('MAT-GAR-APM', 3, text)] });
          }
          blocks.push({ t: 'Cualquier cambio de cobertura, seguro o proveedor requiere la revisión previa de Finanzas y de Atención al cliente y actualizar la matriz antes de ofrecerlo.', c: [C('MAT-GAR-APM', 4, 'requiere la revisión previa de Finanzas y de Atención al cliente, y la actualización de esta matriz antes de ofrecerlo.')] });
          return { blocks, followups: ['ficha'] };
        },
        followups: ['ficha']
      }
    ],

    /* Preguntas sobre otra sede del grupo cuando la respuesta sale de un documento del hub de Madrid (scope 'local'). */
    other_scopes: {
      topic: 'Otra sede',
      words: ['barcelona', 'valencia', 'sevilla', 'bilbao', 'málaga', 'zaragoza'],
      reason: 'Los documentos indexados sobre este tema son del hub de Madrid (Marqués de Soria); no hay evidencia para {x}.'
    },

    gaps: [
      { id: 'simulacro', topic: 'Simulacro y comunicación de recall', anchors: ['simulacro', 'simulacros', 'simulacro de recall', 'carta de recall', 'llamada a taller', 'cierre de campaña', 'comunicación masiva'],
        reason: 'Ningún documento indexado describe el simulacro ni los pasos de una campaña de llamada a taller a clientes.', related: 'OPE-REC-018' },
      { id: 'rgpd', topic: 'Protección de datos', anchors: ['rgpd', 'protección de datos', 'privacidad', 'lopd', 'datos personales', 'consentimiento'],
        reason: 'Ningún documento indexado trata la protección de datos personales de los clientes.' },
      { id: 'certificados', topic: 'Certificaciones y auditorías de marca', anchors: ['certificado', 'certificados', 'certificación', 'certificaciones', 'iso', 'auditoría', 'auditorías', 'auditor'],
        reason: 'Los certificados y los informes de auditoría de marca no están entre los documentos indexados.' },
      { id: 'sostenibilidad', topic: 'Sostenibilidad', anchors: ['sostenibilidad', 'huella', 'carbono', 'emisiones de la sede', 'reciclaje', 'electrificación'],
        reason: 'Ningún documento indexado trata la sostenibilidad ni la huella ambiental de la sede.' },
      { id: 'precio', topic: 'Precios, descuentos y márgenes', anchors: ['precio', 'precios', 'cuesta', 'cuestan', 'descuento', 'descuentos', 'tarifa', 'tarifas', 'margen', 'comisión'],
        reason: 'Precios, descuentos y márgenes no forman parte de los procedimientos de Operaciones indexados.' },
      { id: 'personal', topic: 'Condiciones laborales', anchors: ['vacaciones', 'nómina', 'salario', 'sueldo', 'convenio', 'plantilla', 'despido', 'horario'],
        reason: 'Las condiciones laborales no forman parte de los procedimientos de Operaciones indexados.' }
    ]
  }
});

/* Resumen canónico por código (datos de procedimientos): se completa sin pisar lo que ya hayan puesto otros ficheros.
   OPE-STK-012 lleva además los parámetros que usan otras escenas (umbrales y pasos de evaluación). */
(function (id) {
  'use strict';
  const pack = window.AGENTIC_INDUSTRIES[id];
  const procs = pack.procedures = pack.procedures || {};
  pack.procedimientos.docs.forEach((d) => {
    const cur = procs[d.code] = procs[d.code] || {};
    if (!cur.title) cur.title = d.title;
    if (!cur.summary) cur.summary = d.summary;
    if (!cur.version) cur.version = d.version;
  });
  const extra = {
    'OPE-STK-012': {
      critical_units: 3,
      max_critical_units: 1,
      min_days_for_urgent: 3,
      evaluation: [
        'Contar los pedidos abiertos del modelo en Salesforce CRM y su fecha comprometida',
        'Comprobar en SAP ERP la fecha de recepción confirmada por la marca',
        'Decidir por pedido: mantener la fecha, ofrecer una alternativa o renegociar la entrega'
      ]
    }
  };
  Object.keys(extra).forEach((code) => {
    const cur = procs[code] = procs[code] || {};
    Object.keys(extra[code]).forEach((k) => { if (cur[k] == null) cur[k] = extra[code][k]; });
  });
})('autopista');
