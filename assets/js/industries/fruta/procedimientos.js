/* Subtropicales Axarquía · consulta de procedimientos de Calidad y Operaciones con citas. Escenario de demostración con datos sintéticos (MFM). */
agenticPack('fruta', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedimientos',
    title: 'Preguntar a los procedimientos',
    agent: 'Procedimientos',
    system: 'Procedimientos',
    source: 'Procedimientos · documentos controlados de Calidad y Operaciones',
    indexed_at: '2026-11-16T06:00',
    doc_org: 'Subtropicales Axarquía · Calidad',
    ui: {
      page_title: 'Consulta de procedimientos de Calidad y Operaciones',
      intro_title: 'Pregunta sobre los procedimientos del Centro de manipulado de la Axarquía (Málaga)',
      intro_text: 'Cada frase de la respuesta cita el documento y el apartado de donde sale. Si ningún documento indexado lo recoge, la consulta lo indica y no responde.',
      placeholder: 'Escribe una pregunta sobre los procedimientos de Calidad y Operaciones',
      context_title: 'Aplicado al centro hoy',
      permission: 'Calidad · Centro de manipulado',
      asker_initials: 'RO',
      asker_role: 'Responsable de operaciones y calidad',
      route_to: 'Calidad y seguridad alimentaria'
    },
    report: {
      title: 'Consulta de procedimientos de Calidad y Operaciones',
      code_prefix: 'CON-PROC',
      filename: 'consulta-procedimientos',
      scope_label: 'Centro',
      scope: 'Málaga · Centro de manipulado de la Axarquía'
    },
    presenter: {
      say: [
        'Consulta de los procedimientos de Calidad y Operaciones: la respuesta sale solo de los documentos controlados, y cada frase lleva su cita al documento y al apartado.',
        'Hay siete documentos indexados: recepción y muestreo, maduración controlada, LMR y residuos, trazabilidad y retirada, procesado y APPCC, pedidos de la tienda online y exportación. Aquí son sintéticos; en el piloto, los suyos vigentes.'
      ],
      say_empty: 'Sirve para formar a jefes de turno nuevos, para preparar auditorías de clientes, de IFS Food y de GLOBALG.A.P. y para contestar con la referencia exacta.',
      say_answered: 'Al pulsar una cita se abre el documento con el pasaje exacto resaltado. Y la respuesta se cruza con lo que pasa hoy: la alarma de la cámara CM-06, la campaña de retirada RET-2026-1120 o la reclamación CLM-2026-1120.',
      say_none: 'Cuando no hay fuente lo dice y no inventa: ni respuesta ni cita. Si el tema está en un documento que no está indexado, lo nombra (PR-CAL-010) y permite derivar la pregunta a Calidad.',
      next_empty: 'Pulsar "¿Qué hay que hacer si un lote de fruta supera el LMR en el análisis de residuos?" y después la cita 1 para ver el pasaje resaltado.',
      next_answered: 'Escribir una pregunta sin fuente, por ejemplo "¿Qué programa de control de plagas aplica el centro?", y pulsar "Preguntar".',
      next_done: 'Pasar a la siguiente escena con la flecha derecha.'
    },
    docs: [
      {
        code: 'PR-REC-001',
        title: 'Recepción y muestreo de fruta',
        short: 'Recepción y muestreo',
        type: 'Procedimiento',
        version: '4',
        date: '2026-03-02',
        owner: 'Recepción de fruta y campo',
        summary: 'Cada partida se pesa, se registra con su lote de campo y se muestrea en recepción (temperatura de pulpa, firmeza, materia seca o grados Brix y defectos). Una partida no conforme se rechaza o se bloquea.',
        sections: [
          {
            id: 'R',
            heading: 'Resumen',
            text: [
              'Cada partida se pesa, se registra con su lote de campo y se muestrea en recepción (temperatura de pulpa, firmeza, materia seca o grados Brix y defectos). Una partida no conforme se rechaza o se bloquea.'
            ]
          },
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: [
              'Definir la recepción, el muestreo y la aceptación de la fruta de la Axarquía y de importación (Chile y Perú) en el Centro de manipulado de la Axarquía (Málaga).',
              'Aplica al aguacate y al mango frescos. Los residuos de plaguicidas se rigen por PR-CAL-004.'
            ]
          },
          {
            id: '2',
            heading: '2. Recepción y muestreo',
            text: ['Cada partida se pesa y se registra con su lote de campo en Trazabilidad de campo:'],
            list: [
              'Registro del agricultor, la parcela y la fecha de cosecha.',
              'Medición de la temperatura de pulpa en tres piezas por palé.',
              'Muestra de 20 piezas por partida para firmeza, materia seca (aguacate), grados Brix (mango) y defectos.'
            ]
          },
          {
            id: '3',
            heading: '3. Criterios de aceptación',
            list: [
              'Temperatura de pulpa de la fruta a la llegada inferior a 20 °C.',
              'Aguacate Hass: materia seca mínima del 21 % en recepción.',
              'Inspección visual de plagas y cuerpos extraños en el camión y en los palés a la llegada.'
            ]
          },
          {
            id: '4',
            heading: '4. Actuación ante una no conformidad',
            text: [
              'Una partida no conforme se rechaza o se bloquea en SAP QM, y el Jefe de recepción y campo avisa al Responsable de calidad y seguridad alimentaria.',
              'Se rechaza la partida con más del 5 % de piezas con daños o podredumbre.'
            ]
          },
          {
            id: '5',
            heading: '5. Registros',
            list: [
              'Lote de campo, parcela y agricultor: Trazabilidad de campo.',
              'Muestras y análisis: LIMS.',
              'Bloqueos y decisiones de empleo: SAP S/4HANA (QM).'
            ]
          }
        ]
      },
      {
        code: 'PR-MAD-002',
        title: 'Maduración controlada (temperatura y etileno)',
        short: 'Maduración controlada',
        type: 'Procedimiento',
        version: '3',
        date: '2026-04-14',
        owner: 'Maduración y frío',
        summary: 'La fruta se madura en cámaras con temperatura y etileno controlados y registro continuo. Una desviación de la consigna activa una alarma, bloquea los lotes de la cámara y obliga a verificar firmeza y color antes de expedir.',
        sections: [
          {
            id: 'R',
            heading: 'Resumen',
            text: [
              'La fruta se madura en cámaras con temperatura y etileno controlados y registro continuo. Una desviación de la consigna activa una alarma, bloquea los lotes de la cámara y obliga a verificar firmeza y color antes de expedir.'
            ]
          },
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: [
              'Definir la maduración controlada del aguacate y del mango para entregarlos listos para comer (ready to eat) con la firmeza acordada con el cliente.',
              'Aplica a las cámaras de maduración y conservación del Centro de manipulado de la Axarquía (Málaga).'
            ]
          },
          {
            id: '2',
            heading: '2. Condiciones de maduración',
            list: [
              'Consigna de conservación del aguacate Hass antes de madurar: 6,0 °C.',
              'Maduración con etileno a la temperatura y el tiempo de la curva de cada variedad.',
              'Registro continuo de la temperatura de cada cámara cada 5 minutos en el WMS.'
            ]
          },
          {
            id: '3',
            heading: '3. Control de firmeza',
            text: [
              'La firmeza se mide con penetrómetro en una muestra de cada palé antes de expedir.',
              'El cliente recibe fruta dentro del rango de firmeza pactado para su pedido.'
            ]
          },
          {
            id: '4',
            heading: '4. Desviación de temperatura',
            text: [
              'Una desviación de más de 2 °C sobre la consigna durante más de 30 minutos activa una alarma y bloquea los lotes de la cámara en SAP QM.',
              'Se abre una orden de mantenimiento y los palés se trasladan a otra cámara en consigna.',
              'Calidad verifica la firmeza y el color de una muestra de cada palé, y el Responsable de calidad y seguridad alimentaria decide el destino del lote.'
            ]
          },
          {
            id: '5',
            heading: '5. Reclamación de cliente por maduración',
            text: [
              'Ante una reclamación por maduración dispar se envía el acuse de recibo en 24 h y el informe 8D en 10 días hábiles.',
              'Se revisan la curva de maduración y los registros de temperatura del lote y se contrasta con la medición de firmeza del cliente.',
              'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.'
            ]
          },
          {
            id: '6',
            heading: '6. Registros',
            list: [
              'Temperaturas y ubicación de palés: WMS.',
              'Bloqueos y consumo de lotes: SAP S/4HANA.',
              'Reclamaciones e informes 8D: SAP S/4HANA.'
            ]
          }
        ]
      },
      {
        code: 'PR-CAL-004',
        title: 'LMR y análisis de residuos de plaguicidas',
        short: 'LMR y residuos',
        type: 'Procedimiento',
        version: '5',
        date: '2026-02-09',
        owner: 'Laboratorio',
        summary: 'Toda partida de fruta se muestrea en recepción para el análisis multirresiduo y se libera con el certificado del agricultor hasta que el análisis propio confirma el resultado. Una superación del LMR bloquea la partida y los lotes elaborados con ella.',
        sections: [
          {
            id: 'R',
            heading: 'Resumen',
            text: [
              'Toda partida de fruta se muestrea en recepción para el análisis multirresiduo y se libera con el certificado del agricultor hasta que el análisis propio confirma el resultado. Una superación del LMR bloquea la partida y los lotes elaborados con ella.'
            ]
          },
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: [
              'Controlar los residuos de plaguicidas de la fruta recibida frente a los límites máximos de residuos (LMR) del Reglamento (CE) 396/2005.',
              'No incluye el control del agua de riego y de proceso, que se rige por su propio plan.'
            ]
          },
          {
            id: '2',
            heading: '2. Muestreo',
            text: ['Cada partida se muestrea en recepción según el plan de muestreo de LIMS:'],
            list: [
              'Muestra compuesta de al menos 12 piezas por partida.',
              'Análisis multirresiduo con cribado de más de 400 sustancias activas.',
              'Contramuestra congelada y conservada 6 meses.'
            ]
          },
          {
            id: '3',
            heading: '3. Liberación condicionada',
            text: [
              'La partida se libera a manipulado con el certificado del agricultor conforme (liberación condicionada) y queda marcada en SAP QM hasta que el análisis multirresiduo propio en LIMS confirme el resultado, en un máximo de 72 h.'
            ]
          },
          {
            id: '4',
            heading: '4. Actuación ante una superación del LMR',
            text: [
              'Un resultado por encima del LMR bloquea de inmediato la partida y todos los lotes de manipulado elaborados con ella.',
              'El Responsable de calidad y seguridad alimentaria decide el destino de la partida: destruir o devolver al agricultor.',
              'Se localiza el producto ya expedido y se activa PR-TRZ-003 en un máximo de 2 h.'
            ]
          },
          {
            id: '5',
            heading: '5. Responsabilidades',
            list: [
              'Jefe de laboratorio: ejecuta el análisis, comunica el resultado en LIMS y avisa al Responsable de calidad y seguridad alimentaria.',
              'Responsable de calidad y seguridad alimentaria: ordena el bloqueo y decide el destino y la retirada.',
              'Jefe de manipulado y envasado: detiene el uso de la partida y retiene los lotes afectados.'
            ]
          },
          {
            id: '6',
            heading: '6. Registros',
            list: [
              'Resultados y contramuestras: LIMS.',
              'Bloqueos y decisiones de empleo: SAP S/4HANA (QM).',
              'Avisos internos de la superación: Microsoft Teams.'
            ]
          },
          {
            id: '7',
            heading: '7. Referencias',
            refs: true,
            list: [
              'PR-TRZ-003 · Trazabilidad y retirada de lotes.',
              'PR-REC-001 · Recepción y muestreo de fruta.',
              'Reglamento (CE) 396/2005 · Límites máximos de residuos de plaguicidas.'
            ]
          }
        ]
      },
      {
        code: 'PR-TRZ-003',
        title: 'Trazabilidad y retirada de lotes',
        short: 'Trazabilidad y retirada',
        type: 'Procedimiento',
        version: '6',
        date: '2026-01-19',
        owner: 'Calidad y seguridad alimentaria',
        summary: 'Traza un paso atrás y un paso adelante de cualquier lote, incluidos los pedidos de la tienda online. Traza completa y aviso a la autoridad competente y a los clientes en 4 h; cada retirada cierra con un balance de masas.',
        sections: [
          {
            id: 'R',
            heading: 'Resumen',
            text: [
              'Traza un paso atrás y un paso adelante de cualquier lote, incluidos los pedidos de la tienda online. Traza completa y aviso a la autoridad competente y a los clientes en 4 h; cada retirada cierra con un balance de masas.'
            ]
          },
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: [
              'Garantizar la trazabilidad de cada lote de fruta recibida y de manipulado y definir la retirada de producto no seguro, conforme al Reglamento (CE) 178/2002 (arts. 18 y 19).'
            ]
          },
          {
            id: '2',
            heading: '2. Trazabilidad',
            list: [
              'Hacia atrás: cada lote de manipulado enlaza en SAP S/4HANA con sus lotes de recepción, el agricultor y la parcela de Trazabilidad de campo.',
              'En el centro: el WMS registra la ubicación, la cámara y los palés de cada lote.',
              'Hacia delante: cada albarán o pedido enlaza el lote con el cliente y el destino, incluidos los pedidos de la tienda online.'
            ]
          },
          {
            id: '3',
            heading: '3. Objetivo de tiempo',
            text: [
              'La traza completa de un lote (recepción, lotes de manipulado, expediciones, clientes y pedidos online) debe obtenerse en un máximo de 4 h desde la decisión de retirada.',
              'Se informa a la autoridad competente y a los clientes afectados en un máximo de 4 h desde la decisión.'
            ]
          },
          {
            id: '4',
            heading: '4. Actuación ante un producto no seguro',
            text: [
              'Se bloquea el lote de origen y los lotes derivados en SAP QM y en el WMS, se retienen las expediciones y los pedidos pendientes y se localizan los ya entregados.',
              'Si el producto ha llegado al mercado, el Responsable de calidad y seguridad alimentaria notifica a la autoridad competente según el art. 19 del Reglamento (CE) 178/2002 y aprueba el aviso a los clientes.',
              'Los pasos y el contenido de la notificación se detallan según PR-CAL-010 (Gestión de crisis y comunicación con la autoridad competente).'
            ]
          },
          {
            id: '5',
            heading: '5. Aviso a clientes',
            text: [
              'Atención al cliente y Logística contactan con cada cliente por teléfono y correo con la lista de lotes y albaranes, y registran el acuse en SAP S/4HANA.'
            ]
          },
          {
            id: '6',
            heading: '6. Balance de masas',
            text: [
              'Cada retirada cierra con un balance de masas: cantidad del lote de origen = stock bloqueado + producto expedido + producto consumido o destruido.',
              'Un balance que no cuadra se investiga antes de cerrar la campaña.'
            ]
          },
          {
            id: '7',
            heading: '7. Simulacro',
            text: ['Se realiza un simulacro de retirada una vez al año, con el mismo objetivo de 4 h, y su resultado se archiva en SAP S/4HANA.']
          },
          {
            id: '8',
            heading: '8. Registros',
            list: [
              'Trazabilidad de campo, bloqueos y pedidos: SAP S/4HANA, WMS y Trazabilidad de campo.',
              'Avisos a clientes y acuses: SAP S/4HANA y Outlook.',
              'Campaña, balance y simulacros: SAP S/4HANA.'
            ]
          }
        ]
      },
      {
        code: 'PR-PRO-005',
        title: 'Procesado (guacamole y cold press) y APPCC',
        short: 'Procesado y APPCC',
        type: 'Procedimiento',
        version: '4',
        date: '2026-04-21',
        owner: 'Procesado',
        summary: 'Cuatro puntos críticos de control del procesado: recepción y lavado de fruta, tratamiento de conservación, detección de cuerpos extraños y cadena de frío. Verificación semanal de registros, auditoría anual y gestión de alérgenos.',
        sections: [
          {
            id: 'R',
            heading: 'Resumen',
            text: [
              'Cuatro puntos críticos de control del procesado: recepción y lavado de fruta, tratamiento de conservación, detección de cuerpos extraños y cadena de frío. Verificación semanal de registros, auditoría anual y gestión de alérgenos.'
            ]
          },
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: [
              'Definir el plan APPCC del procesado de guacamole, salsas frescas y cold press en el Centro de manipulado de la Axarquía (Málaga), conforme al Reglamento (CE) 852/2004 (higiene de los productos alimenticios) y al esquema IFS Food.',
              'Aplica al área de procesado. La expedición se rige por PR-EXP-004.'
            ]
          },
          {
            id: '2',
            heading: '2. Equipo APPCC',
            list: [
              'Coordina: Responsable de calidad y seguridad alimentaria (APPCC).',
              'Participan: Responsable de procesado, Jefe de laboratorio y Jefe de manipulado y envasado.',
              'El equipo se reúne una vez al trimestre y ante cualquier desviación crítica.'
            ]
          },
          {
            id: '3',
            heading: '3. Puntos críticos de control',
            list: [
              'PCC 1 · Recepción y lavado de fruta: comprobación del resultado multirresiduo y lavado con agua potable antes del despulpado (PR-CAL-004).',
              'PCC 2 · Tratamiento de conservación: alta presión (HPP) o pasteurización, con registro de cada ciclo.',
              'PCC 3 · Detección de cuerpos extraños: detector de metales y rayos X verificados con patrones al inicio de cada turno.',
              'PCC 4 · Cadena de frío: producto terminado por debajo de 4 °C hasta la expedición.'
            ]
          },
          {
            id: '4',
            heading: '4. Medidas correctoras',
            text: [
              'Ante una desviación en un PCC, el lote se bloquea en SAP QM y en el WMS, y solo el Responsable de calidad y seguridad alimentaria decide su destino: liberar, reprocesar o destruir.',
              'Ningún lote bloqueado se libera por defecto ni por vencimiento de plazo.'
            ]
          },
          {
            id: '5',
            heading: '5. Verificación y revisión',
            list: [
              'Verificación semanal de registros de PCC por Calidad.',
              'Auditoría interna del plan APPCC una vez al año.',
              'Revisión completa del plan al cambiar una línea, una receta crítica o un proveedor de fruta.'
            ]
          },
          {
            id: '6',
            heading: '6. Gestión de alérgenos y limpieza',
            text: [
              'Las salsas con alérgenos declarables (por ejemplo, apio, mostaza o frutos de cáscara) se identifican en SAP S/4HANA y se elaboran en una secuencia definida.',
              'El cambio al producto siguiente exige limpieza validada, registrada en el registro de limpiezas del área.'
            ]
          },
          {
            id: '7',
            heading: '7. Registros',
            list: [
              'Resultados analíticos: LIMS.',
              'Bloqueos y decisiones de empleo: SAP S/4HANA (QM).',
              'Ciclos de tratamiento y temperaturas: WMS.'
            ]
          }
        ]
      },
      {
        code: 'PR-ECO-002',
        title: 'Pedidos de la tienda online y envíos',
        short: 'Tienda online y envíos',
        type: 'Procedimiento',
        version: '2',
        date: '2026-05-05',
        owner: 'Tienda online',
        summary: 'Los pedidos cerrados el jueves a las 13:00 se entregan la semana siguiente y el transporte es gratuito a partir de 50 €. Cada caja conserva el lote de cada pieza; ante un lote retenido o retirado se avisa por correo y se ofrece sustitución o reembolso.',
        sections: [
          {
            id: 'R',
            heading: 'Resumen',
            text: [
              'Los pedidos cerrados el jueves a las 13:00 se entregan la semana siguiente y el transporte es gratuito a partir de 50 €. Cada caja conserva el lote de cada pieza; ante un lote retenido o retirado se avisa por correo y se ofrece sustitución o reembolso.'
            ]
          },
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: [
              'Definir la preparación, el envasado y el envío de los pedidos de la tienda online (cajas de 2 y 4 kg y lotes especiales) desde el Centro de manipulado de la Axarquía (Málaga).'
            ]
          },
          {
            id: '2',
            heading: '2. Plazos y envío',
            list: [
              'Los pedidos cerrados el jueves a las 13:00 se preparan y se entregan la semana siguiente.',
              'El transporte es gratuito a partir de 50 €.'
            ]
          },
          {
            id: '3',
            heading: '3. Preparación y trazabilidad',
            list: [
              'El pedido se prepara solo con fruta de lotes liberados.',
              'Cada caja registra los lotes de sus piezas en la Tienda online (PrestaShop) y en SAP S/4HANA.'
            ]
          },
          {
            id: '4',
            heading: '4. Lote retenido o retirado',
            text: [
              'Ante un lote retenido o retirado, Atención al cliente avisa por correo a los clientes con pedidos de la tienda online y ofrece sustitución o reembolso.'
            ]
          },
          {
            id: '5',
            heading: '5. Registros',
            list: ['Pedidos y envíos: Tienda online (PrestaShop) y SAP S/4HANA.', 'Avisos a clientes: Outlook.']
          }
        ]
      },
      {
        code: 'PR-EXP-004',
        title: 'Exportación y documentación fitosanitaria',
        short: 'Exportación y documentación',
        type: 'Procedimiento',
        version: '3',
        date: '2026-02-23',
        owner: 'Expediciones y exportación',
        summary: 'Cada expedición fuera de España lleva el certificado de análisis de residuos del lote y la documentación del país de destino, y se verifica en SAP que el lote no está bloqueado antes de cargar.',
        sections: [
          {
            id: 'R',
            heading: 'Resumen',
            text: [
              'Cada expedición fuera de España lleva el certificado de análisis de residuos del lote y la documentación del país de destino, y se verifica en SAP que el lote no está bloqueado antes de cargar.'
            ]
          },
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: [
              'Definir la documentación y las verificaciones de las expediciones a clientes de la UE y de terceros países desde el Centro de manipulado de la Axarquía (Málaga).'
            ]
          },
          {
            id: '2',
            heading: '2. Documentación de la expedición',
            list: [
              'Albarán y factura comercial con el número de lote.',
              'Certificado de análisis de residuos del lote.',
              'Certificado fitosanitario cuando el país de destino lo exige (por ejemplo, el Reino Unido).',
              'Documento de transporte (CMR) y registro de temperatura del camión frigorífico.'
            ]
          },
          {
            id: '3',
            heading: '3. Verificación previa a la carga',
            text: [
              'Antes de cargar, Expediciones y exportación comprueba en SAP S/4HANA que el cliente y el producto están autorizados para el destino y que el lote no está bloqueado.'
            ]
          },
          {
            id: '4',
            heading: '4. Retirada de un envío exportado',
            text: [
              'Si un lote exportado debe retirarse, Expediciones y exportación localiza el envío y el Responsable de calidad y seguridad alimentaria informa a la autoridad competente del país de destino a través del importador.'
            ]
          },
          {
            id: '5',
            heading: '5. Registros',
            list: ['Expediciones y albaranes: SAP S/4HANA.', 'Certificados y documentos de transporte: SAP S/4HANA y Outlook.']
          }
        ]
      }
    ],
    unindexed: {
      'PR-CAL-010': {
        title: 'Gestión de crisis y comunicación con la autoridad competente',
        mentionedIn: { doc: 'PR-TRZ-003', sec: '4', quote: 'según PR-CAL-010 (Gestión de crisis y comunicación con la autoridad competente)' }
      }
    },
    suggested: ['lmr', 'recepcion', 'maduracion', 'appcc', 'retirada', 'online'],
    intents: [
      {
        id: 'lmr',
        icon: 'alert-triangle',
        topic: 'Residuos · actuación ante una superación del LMR',
        scope: 'local',
        q: '¿Qué hay que hacer si un lote de fruta supera el LMR en el análisis de residuos?',
        anchors: ['lmr', 'residuos', 'plaguicida', 'plaguicidas', 'superación', 'supera', 'multirresiduo'],
        terms: ['fruta', 'lote', 'lotes', 'análisis', 'hacer', 'actuar', 'bloquear', 'bloqueo', 'partida', 'laboratorio', 'detectado'],
        min: 3,
        blocks: [
          {
            t: 'Un resultado por encima del LMR bloquea de inmediato la partida y todos los lotes de manipulado elaborados con ella.',
            c: [
              [
                'PR-CAL-004',
                4,
                'Un resultado por encima del LMR bloquea de inmediato la partida y todos los lotes de manipulado elaborados con ella.'
              ]
            ]
          },
          {
            t: 'El Responsable de calidad y seguridad alimentaria decide el destino de la partida: destruir o devolver al agricultor.',
            c: [
              [
                'PR-CAL-004',
                4,
                'El Responsable de calidad y seguridad alimentaria decide el destino de la partida: destruir o devolver al agricultor.'
              ]
            ]
          },
          {
            t: 'Se localiza el producto ya expedido y se activa el procedimiento de retirada en un máximo de 2 h.',
            c: [['PR-CAL-004', 4, 'Se localiza el producto ya expedido y se activa PR-TRZ-003 en un máximo de 2 h.']]
          },
          {
            t: 'Los bloqueos y las decisiones de empleo se registran en SAP S/4HANA (QM) y el aviso interno se hace por Microsoft Teams.',
            c: [
              ['PR-CAL-004', 6, 'Bloqueos y decisiones de empleo: SAP S/4HANA (QM).'],
              ['PR-CAL-004', 6, 'Avisos internos de la superación: Microsoft Teams.']
            ]
          }
        ],
        context: {
          systems: ['LIMS', 'SAP S/4HANA'],
          text: 'Hoy (informe LAB-2611-0871): residuo de plaguicida por encima del LMR en el mango Keitt MG-2611-KE-031 (18 t del productor Agrícola La Vega 417), recibido el 17/11 y liberado de forma condicionada. El lote pasó a 3 lotes de manipulado y a expediciones a 11 clientes de 3 países, y a 640 pedidos de la tienda online. Por el apartado 4, bloqueo de la partida y de los lotes derivados.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Abrir la campaña de retirada'
        },
        followups: ['condicionada', 'bloqueo-lote', 'retirada']
      },
      {
        id: 'muestreo',
        icon: 'search',
        topic: 'Residuos · muestreo en recepción',
        scope: 'local',
        q: '¿Cómo se muestrea una partida de fruta para el análisis de residuos?',
        anchors: ['muestreo', 'muestrea', 'muestra', 'muestras', 'contramuestra', 'multirresiduo', 'cribado'],
        terms: ['fruta', 'partida', 'piezas', 'residuos', 'análisis', 'laboratorio', 'método', 'cómo'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'Cada partida se muestrea en recepción según el plan de LIMS:',
              c: [['PR-CAL-004', 2, 'Cada partida se muestrea en recepción según el plan de muestreo de LIMS:']]
            },
            list: [
              {
                t: 'Muestra compuesta de al menos 12 piezas por partida.',
                c: [['PR-CAL-004', 2, 'Muestra compuesta de al menos 12 piezas por partida.']]
              },
              {
                t: 'Análisis multirresiduo con cribado de más de 400 sustancias activas.',
                c: [['PR-CAL-004', 2, 'Análisis multirresiduo con cribado de más de 400 sustancias activas.']]
              },
              {
                t: 'Contramuestra congelada y conservada 6 meses.',
                c: [['PR-CAL-004', 2, 'Contramuestra congelada y conservada 6 meses.']]
              }
            ]
          }
        ],
        followups: ['condicionada', 'lmr']
      },
      {
        id: 'recepcion',
        icon: 'truck',
        topic: 'Recepción · control de una partida de fruta',
        scope: 'local',
        q: '¿Qué se controla cuando llega una partida de fruta al centro?',
        anchors: ['llega', 'llegada', 'recepción', 'recibe', 'recibir', 'rechaza', 'rechazo', 'temperatura de pulpa', 'materia seca'],
        terms: ['partida', 'fruta', 'centro', 'controla', 'camión', 'palé', 'aguacate', 'mango', 'lote de campo', 'aceptación'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'Cada partida se pesa y se registra con su lote de campo en Trazabilidad de campo, y se controla:',
              c: [['PR-REC-001', 2, 'Cada partida se pesa y se registra con su lote de campo en Trazabilidad de campo:']]
            },
            list: [
              {
                t: 'Registro del agricultor, la parcela y la fecha de cosecha.',
                c: [['PR-REC-001', 2, 'Registro del agricultor, la parcela y la fecha de cosecha.']]
              },
              {
                t: 'Medición de la temperatura de pulpa en tres piezas por palé.',
                c: [['PR-REC-001', 2, 'Medición de la temperatura de pulpa en tres piezas por palé.']]
              },
              {
                t: 'Muestra de 20 piezas por partida para firmeza, materia seca (aguacate), grados Brix (mango) y defectos.',
                c: [
                  [
                    'PR-REC-001',
                    2,
                    'Muestra de 20 piezas por partida para firmeza, materia seca (aguacate), grados Brix (mango) y defectos.'
                  ]
                ]
              }
            ]
          },
          {
            t: 'La fruta se acepta con una temperatura de pulpa inferior a 20 °C y, en el aguacate Hass, con un mínimo del 21 % de materia seca.',
            c: [
              ['PR-REC-001', 3, 'Temperatura de pulpa de la fruta a la llegada inferior a 20 °C.'],
              ['PR-REC-001', 3, 'Aguacate Hass: materia seca mínima del 21 % en recepción.']
            ]
          },
          {
            t: 'Una partida no conforme se rechaza o se bloquea en SAP QM.',
            c: [['PR-REC-001', 4, 'Una partida no conforme se rechaza o se bloquea en SAP QM']]
          }
        ],
        followups: ['muestreo', 'lmr']
      },
      {
        id: 'condicionada',
        icon: 'unlock',
        topic: 'Residuos · liberación condicionada',
        scope: 'local',
        q: '¿Se puede usar una partida de fruta antes de tener el resultado del análisis de residuos?',
        anchors: ['liberación', 'liberar', 'liberada', 'liberación condicionada', 'certificado del agricultor', 'antes del resultado'],
        terms: ['partida', 'usar', 'manipulado', 'resultado', 'residuos', 'agricultor', 'horas', 'esperar', 'fruta'],
        min: 3,
        blocks: [
          {
            t: 'Sí, con liberación condicionada: la partida pasa a manipulado con el certificado del agricultor conforme y queda marcada en SAP QM.',
            c: [
              [
                'PR-CAL-004',
                3,
                'La partida se libera a manipulado con el certificado del agricultor conforme (liberación condicionada) y queda marcada en SAP QM'
              ]
            ]
          },
          {
            t: 'La marca se mantiene hasta que el análisis multirresiduo propio en LIMS confirme el resultado, en un máximo de 72 h.',
            c: [['PR-CAL-004', 3, 'hasta que el análisis multirresiduo propio en LIMS confirme el resultado, en un máximo de 72 h']]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'LIMS'],
          text: 'El mango Keitt MG-2611-KE-031 se recibió el 17/11 con certificado del agricultor conforme y se liberó de forma condicionada; el análisis propio LAB-2611-0871 confirmó hoy la superación del LMR, dentro de las 72 h.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Abrir campaña RET-2026-1120'
        },
        followups: ['lmr', 'muestreo']
      },
      {
        id: 'maduracion',
        icon: 'thermometer',
        topic: 'Maduración · condiciones y control de firmeza',
        scope: 'local',
        q: '¿Cómo se controla la maduración del aguacate y del mango?',
        anchors: ['maduración', 'madurar', 'madura', 'etileno', 'firmeza', 'ready', 'penetrómetro'],
        terms: ['aguacate', 'mango', 'cámara', 'temperatura', 'controla', 'cómo', 'curva', 'palé', 'cliente'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'La fruta se madura en cámaras con temperatura y etileno controlados:',
              c: [['PR-MAD-002', 2, 'Maduración con etileno a la temperatura y el tiempo de la curva de cada variedad.']]
            },
            list: [
              {
                t: 'Consigna de conservación del aguacate Hass antes de madurar: 6,0 °C.',
                c: [['PR-MAD-002', 2, 'Consigna de conservación del aguacate Hass antes de madurar: 6,0 °C.']]
              },
              {
                t: 'Maduración con etileno a la temperatura y el tiempo de la curva de cada variedad.',
                c: [['PR-MAD-002', 2, 'Maduración con etileno a la temperatura y el tiempo de la curva de cada variedad.']]
              },
              {
                t: 'Registro continuo de la temperatura de cada cámara cada 5 minutos en el WMS.',
                c: [['PR-MAD-002', 2, 'Registro continuo de la temperatura de cada cámara cada 5 minutos en el WMS.']]
              }
            ]
          },
          {
            t: 'La firmeza se mide con penetrómetro en una muestra de cada palé antes de expedir.',
            c: [['PR-MAD-002', 3, 'La firmeza se mide con penetrómetro en una muestra de cada palé antes de expedir.']]
          },
          {
            t: 'El cliente recibe fruta dentro del rango de firmeza pactado para su pedido.',
            c: [['PR-MAD-002', 3, 'El cliente recibe fruta dentro del rango de firmeza pactado para su pedido.']]
          }
        ],
        followups: ['frio', 'reclamacion-maduracion']
      },
      {
        id: 'frio',
        icon: 'alert-triangle',
        topic: 'Maduración · desviación de temperatura en una cámara',
        scope: 'local',
        q: '¿Qué se hace si una cámara de maduración se desvía de la temperatura de consigna?',
        anchors: ['cámara', 'cámaras', 'consigna', 'alarma', 'compresor', 'desvía', 'desviación de temperatura'],
        terms: ['maduración', 'frío', 'lotes', 'bloquea', 'mantenimiento', 'traslado', 'firmeza', 'color', 'hacer', 'temperatura'],
        min: 3,
        blocks: [
          {
            t: 'Una desviación de más de 2 °C sobre la consigna durante más de 30 minutos activa una alarma y bloquea los lotes de la cámara en SAP QM.',
            c: [
              [
                'PR-MAD-002',
                4,
                'Una desviación de más de 2 °C sobre la consigna durante más de 30 minutos activa una alarma y bloquea los lotes de la cámara en SAP QM.'
              ]
            ]
          },
          {
            t: 'Se abre una orden de mantenimiento y los palés se trasladan a otra cámara en consigna.',
            c: [['PR-MAD-002', 4, 'Se abre una orden de mantenimiento y los palés se trasladan a otra cámara en consigna.']]
          },
          {
            t: 'Calidad verifica la firmeza y el color de una muestra de cada palé, y el Responsable de calidad y seguridad alimentaria decide el destino del lote.',
            c: [
              [
                'PR-MAD-002',
                4,
                'Calidad verifica la firmeza y el color de una muestra de cada palé, y el Responsable de calidad y seguridad alimentaria decide el destino del lote.'
              ]
            ]
          }
        ],
        context: {
          systems: ['WMS', 'SAP S/4HANA'],
          text: 'Alarma de hoy (05:50, ALM-FRIO-0612): la cámara de maduración CM-06 está a 11,4 °C frente a la consigna de 6,0 °C desde las 03:40 (fallo de compresor), con 9 palés de aguacate Hass calibre 18 del lote AH-2611-118 (14 t) destinados a 3 pedidos de supermercados y a los pedidos de la tienda online de hoy. Por el apartado 4: bloqueo del lote, traslado a CM-02 y verificación de firmeza y color.',
          outcome: 'alarma',
          go: 'alarma',
          goLabel: 'Abrir la alarma del turno'
        },
        followups: ['maduracion', 'bloqueo-lote', 'online-incidencia']
      },
      {
        id: 'appcc',
        icon: 'clipboard',
        topic: 'APPCC · puntos críticos de control del procesado',
        scope: 'local',
        q: '¿Cuáles son los puntos críticos de control del procesado de guacamole y cold press?',
        anchors: ['appcc', 'pcc', 'puntos críticos', 'punto crítico', 'haccp', 'peligros'],
        terms: ['control', 'procesado', 'guacamole', 'cold press', 'cuáles', 'plan', 'verificación', 'tratamiento', 'lavado'],
        min: 3,
        blocks: [
          {
            intro: { t: 'El plan APPCC define cuatro puntos críticos de control:', c: [['PR-PRO-005', 3, 'PCC 1 · Recepción y lavado de fruta']] },
            list: [
              {
                t: 'Recepción y lavado de fruta: comprobación del resultado multirresiduo y lavado con agua potable antes del despulpado.',
                c: [
                  [
                    'PR-PRO-005',
                    3,
                    'PCC 1 · Recepción y lavado de fruta: comprobación del resultado multirresiduo y lavado con agua potable antes del despulpado'
                  ]
                ]
              },
              {
                t: 'Tratamiento de conservación: alta presión (HPP) o pasteurización, con registro de cada ciclo.',
                c: [['PR-PRO-005', 3, 'PCC 2 · Tratamiento de conservación: alta presión (HPP) o pasteurización, con registro de cada ciclo.']]
              },
              {
                t: 'Detección de cuerpos extraños: detector de metales y rayos X verificados con patrones al inicio de cada turno.',
                c: [
                  [
                    'PR-PRO-005',
                    3,
                    'PCC 3 · Detección de cuerpos extraños: detector de metales y rayos X verificados con patrones al inicio de cada turno.'
                  ]
                ]
              },
              {
                t: 'Cadena de frío: producto terminado por debajo de 4 °C hasta la expedición.',
                c: [['PR-PRO-005', 3, 'PCC 4 · Cadena de frío: producto terminado por debajo de 4 °C hasta la expedición']]
              }
            ]
          },
          {
            t: 'Calidad verifica los registros de los PCC cada semana y el plan se audita una vez al año.',
            c: [
              ['PR-PRO-005', 5, 'Verificación semanal de registros de PCC por Calidad.'],
              ['PR-PRO-005', 5, 'Auditoría interna del plan APPCC una vez al año.']
            ]
          }
        ],
        followups: ['bloqueo-lote', 'alergenos']
      },
      {
        id: 'bloqueo-lote',
        icon: 'lock',
        topic: 'APPCC · destino de un lote bloqueado',
        scope: 'local',
        q: '¿Quién decide qué se hace con un lote bloqueado por una desviación?',
        anchors: ['bloqueado', 'bloqueados', 'bloqueo', 'desviación', 'liberar', 'reprocesar', 'destruir'],
        terms: ['quién', 'decide', 'lote', 'lotes', 'destino', 'decisión', 'empleo', 'sap', 'wms'],
        min: 3,
        blocks: [
          {
            t: 'Ante una desviación en un PCC, el lote se bloquea en SAP QM y en el WMS.',
            c: [['PR-PRO-005', 4, 'el lote se bloquea en SAP QM y en el WMS']]
          },
          {
            t: 'Solo el Responsable de calidad y seguridad alimentaria decide su destino: liberar, reprocesar o destruir.',
            c: [['PR-PRO-005', 4, 'solo el Responsable de calidad y seguridad alimentaria decide su destino: liberar, reprocesar o destruir']]
          },
          {
            t: 'Ningún lote bloqueado se libera por defecto ni por vencimiento de plazo.',
            c: [['PR-PRO-005', 4, 'Ningún lote bloqueado se libera por defecto ni por vencimiento de plazo.']]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'WMS'],
          text: 'Hoy hay 3 lotes de manipulado de mango bloqueados por el residuo por encima del LMR del lote MG-2611-KE-031, con 6 t todavía en almacén. El destino de cada lote lo decide el Responsable de calidad y seguridad alimentaria.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Abrir campaña RET-2026-1120'
        },
        followups: ['lmr', 'retirada']
      },
      {
        id: 'retirada',
        icon: 'truck',
        topic: 'Retirada · plazos de traza y aviso',
        scope: 'local',
        q: '¿En cuánto tiempo hay que tener la traza completa y avisar a la autoridad y a los clientes en una retirada?',
        anchors: ['retirada', 'retirar', 'retiro', 'recall', 'simulacro', '4 h', 'autoridad'],
        terms: ['traza', 'trazabilidad', 'tiempo', 'plazo', 'horas', 'clientes', 'completa', 'avisar', 'informar', 'cuánto'],
        min: 3,
        blocks: [
          {
            t: 'La traza completa del lote (recepción, lotes de manipulado, expediciones, clientes y pedidos online) debe obtenerse en un máximo de 4 h desde la decisión de retirada.',
            c: [['PR-TRZ-003', 3, 'debe obtenerse en un máximo de 4 h desde la decisión de retirada']]
          },
          {
            t: 'La autoridad competente y los clientes afectados se informan en ese mismo plazo de 4 h.',
            c: [['PR-TRZ-003', 3, 'Se informa a la autoridad competente y a los clientes afectados en un máximo de 4 h desde la decisión.']]
          },
          {
            t: 'Se bloquea el lote de origen y los derivados, se retienen las expediciones y los pedidos pendientes y se localizan los ya entregados.',
            c: [
              [
                'PR-TRZ-003',
                4,
                'Se bloquea el lote de origen y los lotes derivados en SAP QM y en el WMS, se retienen las expediciones y los pedidos pendientes y se localizan los ya entregados.'
              ]
            ]
          }
        ],
        context: {
          text: 'Campaña RET-2026-1120: del mango Keitt MG-2611-KE-031 (18 t) a 3 lotes de manipulado, expediciones a 11 clientes de España, Francia y Alemania y 640 pedidos de la tienda online. El objetivo es informar a la autoridad y a los clientes en 4 h (Reglamento (CE) 178/2002, art. 19; Reglamento (CE) 396/2005 sobre LMR).',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Abrir campaña RET-2026-1120',
          systems: ['SAP S/4HANA', 'WMS']
        },
        followups: ['trazabilidad', 'notificacion', 'balance']
      },
      {
        id: 'trazabilidad',
        icon: 'barcode',
        topic: 'Trazabilidad · hacia atrás y hacia delante',
        scope: 'local',
        q: '¿Cómo se traza un lote de fruta hacia atrás y hacia delante?',
        anchors: ['trazar', 'traza', 'trazabilidad', 'hacia atrás', 'hacia delante', 'genealogía', 'albarán', 'albaranes', 'parcela'],
        terms: ['lote', 'fruta', 'cliente', 'agricultor', 'cómo', 'sap', 'wms', 'registro', 'pedido'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'La traza se apoya en tres registros:',
              c: [
                [
                  'PR-TRZ-003',
                  2,
                  'Hacia atrás: cada lote de manipulado enlaza en SAP S/4HANA con sus lotes de recepción, el agricultor y la parcela de Trazabilidad de campo.'
                ]
              ]
            },
            list: [
              {
                t: 'Hacia atrás: cada lote de manipulado enlaza en SAP S/4HANA con sus lotes de recepción, el agricultor y la parcela de Trazabilidad de campo.',
                c: [
                  [
                    'PR-TRZ-003',
                    2,
                    'Hacia atrás: cada lote de manipulado enlaza en SAP S/4HANA con sus lotes de recepción, el agricultor y la parcela de Trazabilidad de campo.'
                  ]
                ]
              },
              {
                t: 'En el centro: el WMS registra la ubicación, la cámara y los palés de cada lote.',
                c: [['PR-TRZ-003', 2, 'En el centro: el WMS registra la ubicación, la cámara y los palés de cada lote.']]
              },
              {
                t: 'Hacia delante: cada albarán o pedido enlaza el lote con el cliente y el destino, incluidos los pedidos de la tienda online.',
                c: [
                  [
                    'PR-TRZ-003',
                    2,
                    'Hacia delante: cada albarán o pedido enlaza el lote con el cliente y el destino, incluidos los pedidos de la tienda online.'
                  ]
                ]
              }
            ]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'Trazabilidad de campo', 'LIMS'],
          text: 'Traza completa del lote de ejemplo, desde las parcelas hasta las expediciones y los pedidos:',
          lot: 'AH-2611-118'
        },
        followups: ['retirada', 'balance']
      },
      {
        id: 'balance',
        icon: 'layers',
        topic: 'Retirada · balance de masas',
        scope: 'local',
        q: '¿Cómo se cierra una retirada y qué es el balance de masas?',
        anchors: ['balance', 'balance de masas', 'cierre', 'cerrar', 'cuadra', 'toneladas'],
        terms: ['retirada', 'campaña', 'masas', 'stock', 'expedido', 'bloqueado', 'cantidad', 'lote'],
        min: 3,
        blocks: [
          {
            t: 'Cada retirada cierra con un balance de masas: cantidad del lote de origen = stock bloqueado + producto expedido + producto consumido o destruido.',
            c: [
              [
                'PR-TRZ-003',
                6,
                'Cada retirada cierra con un balance de masas: cantidad del lote de origen = stock bloqueado + producto expedido + producto consumido o destruido.'
              ]
            ]
          },
          {
            t: 'Un balance que no cuadra se investiga antes de cerrar la campaña.',
            c: [['PR-TRZ-003', 6, 'Un balance que no cuadra se investiga antes de cerrar la campaña.']]
          },
          {
            t: 'La campaña, el balance y los simulacros se archivan en SAP S/4HANA.',
            c: [['PR-TRZ-003', 8, 'Campaña, balance y simulacros: SAP S/4HANA.']]
          }
        ],
        context: {
          text: 'Balance de RET-2026-1120: 18 t = 6 t en almacén + 12 t expedidas a 11 clientes y a los pedidos de la tienda online. Cuadra: no hay producto consumido ni destruido todavía.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Abrir campaña RET-2026-1120',
          systems: ['SAP S/4HANA']
        },
        followups: ['retirada', 'notificacion']
      },
      {
        id: 'notificacion',
        icon: 'mail',
        topic: 'Retirada · notificación a la autoridad',
        scope: 'local',
        kind: 'partial',
        q: '¿Cómo se notifica una retirada a la autoridad competente?',
        anchors: ['=autoridad', 'notificar', 'notificación', 'notifica', 'artículo 19', 'art. 19', '178/2002'],
        terms: ['retirada', 'competente', 'producto', 'mercado', 'cómo', 'aviso', 'clientes'],
        min: 2,
        blocks: [
          {
            t: 'Si el producto ha llegado al mercado, el Responsable de calidad y seguridad alimentaria notifica a la autoridad competente según el art. 19 del Reglamento (CE) 178/2002 y aprueba el aviso a los clientes.',
            c: [
              [
                'PR-TRZ-003',
                4,
                'el Responsable de calidad y seguridad alimentaria notifica a la autoridad competente según el art. 19 del Reglamento (CE) 178/2002 y aprueba el aviso a los clientes'
              ]
            ]
          },
          {
            t: 'Los pasos y el contenido de la notificación se detallan según PR-CAL-010.',
            c: [['PR-TRZ-003', 4, 'según PR-CAL-010 (Gestión de crisis y comunicación con la autoridad competente)']]
          }
        ],
        note: 'PR-CAL-010 (Gestión de crisis y comunicación con la autoridad competente) no está entre los documentos indexados: el contenido de la notificación no se puede detallar desde esta consulta.',
        followups: ['retirada', 'clientes-aviso']
      },
      {
        id: 'clientes-aviso',
        icon: 'users',
        topic: 'Retirada · aviso a clientes y exportaciones',
        scope: 'local',
        q: '¿Cómo se avisa a los clientes en una retirada, incluidos los de fuera de España?',
        anchors: ['avisar', 'aviso', 'avisa', 'clientes', 'acuse', 'importador', 'francia', 'alemania'],
        terms: ['retirada', 'lista', 'lotes', 'albaranes', 'país', 'destino', 'autoridad', 'exportado', 'cómo'],
        min: 3,
        blocks: [
          {
            t: 'Atención al cliente y Logística contactan con cada cliente por teléfono y correo con la lista de lotes y albaranes.',
            c: [
              [
                'PR-TRZ-003',
                5,
                'Atención al cliente y Logística contactan con cada cliente por teléfono y correo con la lista de lotes y albaranes'
              ]
            ]
          },
          { t: 'El acuse de cada cliente se registra en SAP S/4HANA.', c: [['PR-TRZ-003', 5, 'registran el acuse en SAP S/4HANA']] },
          {
            t: 'En un envío exportado, Expediciones y exportación localiza el envío y se informa a la autoridad del país de destino a través del importador.',
            c: [
              [
                'PR-EXP-004',
                4,
                'Expediciones y exportación localiza el envío y el Responsable de calidad y seguridad alimentaria informa a la autoridad competente del país de destino a través del importador'
              ]
            ]
          }
        ],
        context: {
          text: 'De los 11 clientes de RET-2026-1120, hay cadenas de supermercados y mayoristas de España, Francia y Alemania: para los de Francia y Alemania se informa a la autoridad del país de destino a través del importador.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Abrir campaña RET-2026-1120',
          systems: ['SAP S/4HANA', 'Microsoft Teams']
        },
        followups: ['retirada', 'exportacion']
      },
      {
        id: 'alergenos',
        icon: 'alert-triangle',
        topic: 'Procesado · gestión de alérgenos',
        scope: 'local',
        q: '¿Cómo se gestionan los alérgenos en el área de procesado?',
        anchors: ['alérgeno', 'alérgenos', 'alergeno', 'alergenos', 'declarables'],
        terms: ['procesado', 'gestionan', 'gestión', 'salsas', 'secuencia', 'limpieza', 'cambio', 'producto', 'área'],
        min: 2,
        blocks: [
          {
            t: 'Las salsas con alérgenos declarables se identifican en SAP S/4HANA y se elaboran en una secuencia definida.',
            c: [
              [
                'PR-PRO-005',
                6,
                'Las salsas con alérgenos declarables (por ejemplo, apio, mostaza o frutos de cáscara) se identifican en SAP S/4HANA y se elaboran en una secuencia definida.'
              ]
            ]
          },
          {
            t: 'El cambio al producto siguiente exige limpieza validada, registrada en el registro de limpiezas del área.',
            c: [['PR-PRO-005', 6, 'El cambio al producto siguiente exige limpieza validada, registrada en el registro de limpiezas del área.']]
          }
        ],
        followups: ['appcc']
      },
      {
        id: 'online',
        icon: 'box',
        topic: 'Tienda online · plazos y envío',
        scope: 'local',
        q: '¿Cuándo se entregan los pedidos de la tienda online y a partir de qué importe el envío es gratuito?',
        anchors: ['tienda', 'online', 'pedido', 'pedidos', 'jueves', 'envío', 'envíos', 'entrega', 'entregan'],
        terms: ['cuándo', 'importe', 'gratuito', 'plazo', 'cierre', 'semana', 'caja', 'cajas'],
        min: 3,
        blocks: [
          {
            t: 'Los pedidos cerrados el jueves a las 13:00 se preparan y se entregan la semana siguiente.',
            c: [['PR-ECO-002', 2, 'Los pedidos cerrados el jueves a las 13:00 se preparan y se entregan la semana siguiente.']]
          },
          { t: 'El transporte es gratuito a partir de 50 €.', c: [['PR-ECO-002', 2, 'El transporte es gratuito a partir de 50 €.']] },
          {
            t: 'El pedido se prepara solo con fruta de lotes liberados, y cada caja registra los lotes de sus piezas.',
            c: [
              ['PR-ECO-002', 3, 'El pedido se prepara solo con fruta de lotes liberados.'],
              ['PR-ECO-002', 3, 'Cada caja registra los lotes de sus piezas en la Tienda online (PrestaShop) y en SAP S/4HANA.']
            ]
          }
        ],
        context: {
          systems: ['Tienda online (PrestaShop)', 'SAP S/4HANA'],
          text: 'Hoy hay 214 pedidos online a servir; los que llevan aguacate del lote AH-2611-118 dependen de la decisión sobre la cámara CM-06.',
          outcome: 'alarma',
          go: 'alarma',
          goLabel: 'Abrir la alarma del turno'
        },
        followups: ['online-incidencia', 'frio']
      },
      {
        id: 'online-incidencia',
        icon: 'mail',
        topic: 'Tienda online · lote retenido o retirado',
        scope: 'local',
        q: '¿Qué se hace con los pedidos online si un lote queda retenido o se retira?',
        anchors: ['retenido', 'retirado', 'sustitución', 'reembolso', 'pedidos online', 'retiene', 'retira'],
        terms: ['pedidos', 'online', 'tienda', 'lote', 'clientes', 'avisa', 'correo', 'qué'],
        min: 3,
        blocks: [
          {
            t: 'Atención al cliente avisa por correo a los clientes con pedidos de la tienda online afectados.',
            c: [['PR-ECO-002', 4, 'Atención al cliente avisa por correo a los clientes con pedidos de la tienda online']]
          },
          { t: 'Se ofrece sustitución o reembolso.', c: [['PR-ECO-002', 4, 'ofrece sustitución o reembolso']] },
          {
            t: 'Los pedidos pendientes se retienen y solo se preparan con fruta de lotes liberados.',
            c: [
              ['PR-TRZ-003', 4, 'se retienen las expediciones y los pedidos pendientes'],
              ['PR-ECO-002', 3, 'El pedido se prepara solo con fruta de lotes liberados.']
            ]
          }
        ],
        context: {
          text: 'En RET-2026-1120 hay 640 pedidos de la tienda online con fruta de los 3 lotes de manipulado afectados: Atención al cliente los avisa por correo y ofrece sustitución o reembolso.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Abrir campaña RET-2026-1120',
          systems: ['Tienda online (PrestaShop)', 'Outlook']
        },
        followups: ['retirada', 'clientes-aviso']
      },
      {
        id: 'exportacion',
        icon: 'truck',
        topic: 'Exportación · documentación de la expedición',
        scope: 'local',
        q: '¿Qué documentación lleva una expedición a otro país?',
        anchors: ['exportación', 'exportar', 'exportado', 'expedición', 'expediciones', 'documentación', 'certificado fitosanitario', 'cmr'],
        terms: ['país', 'destino', 'albarán', 'factura', 'certificado', 'transporte', 'carga', 'francia', 'alemania', 'lote'],
        min: 3,
        blocks: [
          {
            intro: { t: 'Cada expedición lleva, como mínimo:', c: [['PR-EXP-004', 2, 'Albarán y factura comercial con el número de lote.']] },
            list: [
              {
                t: 'Albarán y factura comercial con el número de lote.',
                c: [['PR-EXP-004', 2, 'Albarán y factura comercial con el número de lote.']]
              },
              {
                t: 'Certificado de análisis de residuos del lote.',
                c: [['PR-EXP-004', 2, 'Certificado de análisis de residuos del lote.']]
              },
              {
                t: 'Certificado fitosanitario cuando el país de destino lo exige (por ejemplo, el Reino Unido).',
                c: [['PR-EXP-004', 2, 'Certificado fitosanitario cuando el país de destino lo exige (por ejemplo, el Reino Unido).']]
              },
              {
                t: 'Documento de transporte (CMR) y registro de temperatura del camión frigorífico.',
                c: [['PR-EXP-004', 2, 'Documento de transporte (CMR) y registro de temperatura del camión frigorífico.']]
              }
            ]
          },
          {
            t: 'Antes de cargar se comprueba en SAP S/4HANA que el cliente y el producto están autorizados para el destino y que el lote no está bloqueado.',
            c: [
              [
                'PR-EXP-004',
                3,
                'comprueba en SAP S/4HANA que el cliente y el producto están autorizados para el destino y que el lote no está bloqueado'
              ]
            ]
          }
        ],
        context: {
          systems: ['SAP S/4HANA'],
          text: 'Entre los 11 clientes de la retirada RET-2026-1120 hay plataformas de Francia y Alemania: sus albaranes llevan el certificado de análisis de residuos del lote.',
          go: 'retirada',
          goLabel: 'Abrir campaña RET-2026-1120'
        },
        followups: ['clientes-aviso', 'retirada']
      },
      {
        id: 'reclamacion-maduracion',
        icon: 'mail',
        topic: 'Reclamación de cliente · maduración dispar',
        scope: 'all',
        q: '¿Qué plazos y pasos hay si un cliente reclama que la fruta llega dura o con maduración dispar?',
        anchors: ['reclamación', 'reclamaciones', 'reclama', 'queja', '8d', 'cliente reclama'],
        terms: ['plazo', 'plazos', 'acuse', 'informe', 'maduración', 'dispar', 'dura', 'fruta', 'firmeza', 'curva', 'días'],
        min: 3,
        blocks: [
          {
            t: 'Acuse de recibo en 24 h e informe 8D en 10 días hábiles.',
            c: [['PR-MAD-002', 5, 'se envía el acuse de recibo en 24 h y el informe 8D en 10 días hábiles']]
          },
          {
            t: 'Se revisan la curva de maduración y los registros de temperatura del lote y se contrasta con la medición de firmeza del cliente.',
            c: [
              [
                'PR-MAD-002',
                5,
                'Se revisan la curva de maduración y los registros de temperatura del lote y se contrasta con la medición de firmeza del cliente.'
              ]
            ]
          },
          {
            t: 'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.',
            c: [
              [
                'PR-MAD-002',
                5,
                'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.'
              ]
            ]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'WMS'],
          text: 'Caso CLM-2026-1120: Supermercados Levante Fresh, S.A. reclama que el 35 % de las piezas de aguacate ready to eat del pedido PED-2026-44718 (lote AH-2611-092) llega duro en 4 tiendas, y pide abono y análisis. Hasta revisar la curva de maduración y los registros de temperatura del lote, la causa es una hipótesis.',
          outcome: 'reclamacion',
          go: 'reclamacion',
          goLabel: 'Abrir reclamación CLM-2026-1120'
        },
        followups: ['maduracion', 'frio']
      }
    ],
    other_scopes: {
      topic: 'Otro centro',
      words: ['almería', 'huelva', 'valencia', 'murcia', 'sevilla', 'canarias'],
      reason: 'Los documentos indexados sobre este tema son del Centro de manipulado de la Axarquía (Málaga); no hay evidencia para {x}.'
    },
    gaps: [
      {
        id: 'plagas',
        topic: 'Control de plagas',
        anchors: ['plaga', 'plagas', 'roedores', 'trampas', 'desratización', 'insectos', 'control de plagas'],
        reason: 'Ningún documento indexado recoge el programa de control de plagas del centro; PR-REC-001 solo menciona la inspección visual de plagas en la recepción.'
      },
      {
        id: 'agua',
        topic: 'Calidad del agua',
        anchors: ['riego', 'agua de riego', 'agua de proceso', 'calidad del agua', 'análisis del agua', 'legionella'],
        reason: 'Ningún documento indexado recoge el plan de análisis del agua de riego ni del agua de proceso; PR-CAL-004 remite a un plan propio.'
      },
      {
        id: 'sostenibilidad',
        topic: 'Sostenibilidad y ESG',
        anchors: ['sostenibilidad', 'huella', 'carbono', 'emisiones', 'esg', 'alcance 1', 'alcance 3', 'huella hídrica'],
        reason: 'Ningún documento indexado trata el inventario de emisiones, la huella hídrica ni la política ESG del centro.'
      },
      {
        id: 'precio',
        topic: 'Precios, descuentos y márgenes',
        anchors: ['precio', 'precios', 'cuesta', 'cuestan', 'descuento', 'descuentos', 'tarifa', 'tarifas', 'margen', 'comisión'],
        reason: 'Precios, descuentos y márgenes no forman parte de los procedimientos de Calidad indexados.'
      },
      {
        id: 'personal',
        topic: 'Condiciones laborales',
        anchors: ['vacaciones', 'nómina', 'salario', 'sueldo', 'convenio', 'plantilla', 'despido', 'horario'],
        reason: 'Las condiciones laborales no forman parte de los procedimientos de Calidad indexados.'
      },
      {
        id: 'crisis',
        topic: 'Gestión de crisis',
        anchors: ['gestión de crisis', 'comité de crisis', 'comunicado de prensa', 'comunicación de crisis'],
        reason: 'Ningún documento indexado describe la gestión de crisis ni el contenido de la notificación a la autoridad.',
        related: 'PR-CAL-010'
      }
    ]
  }
});

/* Resumen canónico por código (datos de procedimientos): se completa sin pisar lo que ya hayan puesto otros ficheros. */
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
})('fruta');
