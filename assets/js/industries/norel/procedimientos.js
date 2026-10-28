/* Norel Nutrición Animal · consulta de procedimientos de Calidad y Operaciones con citas. Escenario de demostración con datos sintéticos (MFM). */
agenticPack('norel', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedimientos',
    title: 'Preguntar a los procedimientos',
    agent: 'Procedimientos',
    system: 'SharePoint',
    source: 'SharePoint · documentos controlados de Calidad y Operaciones',
    indexed_at: '2026-10-26T06:00',
    doc_org: 'Norel Nutrición Animal · Calidad',
    ui: {
      page_title: 'Consulta de procedimientos de Calidad y Operaciones',
      intro_title: 'Pregunta sobre los procedimientos de la Planta de premezclas (España)',
      intro_text: 'Cada frase de la respuesta cita el documento y el apartado de donde sale. Si ningún documento indexado lo recoge, la consulta lo indica y no responde.',
      placeholder: 'Escribe una pregunta sobre los procedimientos de Calidad y Operaciones',
      context_title: 'Aplicado a la planta hoy',
      permission: 'Calidad · Planta de premezclas',
      asker_initials: 'RO',
      asker_role: 'Responsable de operaciones y calidad',
      route_to: 'Calidad y seguridad alimentaria'
    },
    report: {
      title: 'Consulta de procedimientos de Calidad y Operaciones',
      code_prefix: 'CON-PROC',
      filename: 'consulta-procedimientos',
      scope_label: 'Planta',
      scope: 'Madrid · Planta de premezclas (España)'
    },
    presenter: {
      say: [
        'Consulta de los procedimientos de Calidad y Operaciones: la respuesta sale solo de los documentos controlados, y cada frase lleva su cita al documento y al apartado.',
        'Hay siete documentos indexados: APPCC de fabricación, control de Salmonella, retirada y trazabilidad, contaminación cruzada, etiquetado de aditivos, verificación de contenidos y exportación. Aquí son sintéticos; en el piloto, los suyos vigentes.'
      ],
      say_empty: 'Sirve para formar a jefes de turno nuevos, para preparar auditorías de clientes y de GMP+ y para contestar con la referencia exacta.',
      say_answered: 'Al pulsar una cita se abre el documento con el pasaje exacto resaltado. Y la respuesta se cruza con lo que pasa hoy: la alarma de Salmonella, la campaña de retirada RET-2026-1028 o la reclamación CLM-2026-1028.',
      say_none: 'Cuando no hay fuente lo dice y no inventa: ni respuesta ni cita. Si el tema está en un documento que no está indexado, lo nombra (PR-CAL-010) y permite derivar la pregunta a Calidad.',
      next_empty: 'Pulsar "¿Qué hay que hacer si una materia prima da positivo a Salmonella?" y después la cita 1 para ver el pasaje resaltado.',
      next_answered: 'Escribir una pregunta sin fuente, por ejemplo "¿Cuál es el límite de aflatoxina B1 que aplicamos?", y pulsar "Preguntar".',
      next_done: 'Pasar a la siguiente escena con la flecha derecha.'
    },
    docs: [
      {
        code: 'PR-CAL-001',
        title: 'APPCC de fabricación de premezclas',
        short: 'APPCC de fabricación',
        type: 'Procedimiento',
        version: '5',
        date: '2026-03-10',
        owner: 'Calidad y seguridad alimentaria',
        summary: 'Cuatro puntos críticos de control: recepción de materias primas, dosificación de microingredientes, mezcla homogénea y contaminación cruzada. Verificación semanal de registros y auditoría anual del plan.',
        sections: [
          {
            id: 'R',
            heading: 'Resumen',
            text: [
              'Cuatro puntos críticos de control: recepción de materias primas, dosificación de microingredientes, mezcla homogénea y contaminación cruzada. Verificación semanal de registros y auditoría anual del plan.'
            ]
          },
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: [
              'Definir el plan APPCC de la fabricación de premezclas vitamínico-minerales y aditivos en la Planta de premezclas (España), conforme al Reglamento (CE) 183/2005 (higiene de piensos) y al esquema GMP+ B2.',
              'Aplica a todas las líneas de dosificación, mezcla y envasado. El transporte se rige por PR-EXP-002.'
            ]
          },
          {
            id: '2',
            heading: '2. Equipo APPCC',
            list: [
              'Coordina: Responsable de calidad y seguridad alimentaria (APPCC).',
              'Participan: Jefe de planta, Jefe de laboratorio y Norel Solutions (asesoramiento técnico).',
              'El equipo se reúne una vez al trimestre y ante cualquier desviación crítica.'
            ]
          },
          {
            id: '3',
            heading: '3. Puntos críticos de control',
            list: [
              'PCC 1 · Recepción de materias primas: análisis de Salmonella y verificación del certificado de análisis antes de liberar el lote (PR-CAL-004).',
              'PCC 2 · Dosificación de microingredientes: pesada con doble verificación y tolerancia máxima del 2 % sobre la fórmula.',
              'PCC 3 · Mezcla homogénea: ensayo de homogeneidad con coeficiente de variación inferior al 5 %.',
              'PCC 4 · Contaminación cruzada: limpieza validada entre productos (PR-PRO-003).'
            ]
          },
          {
            id: '4',
            heading: '4. Medidas correctoras',
            text: [
              'Ante una desviación en un PCC, el lote se bloquea en SAP QM y en el MES, y solo el Responsable de calidad y seguridad alimentaria decide su destino: liberar, reprocesar o destruir.',
              'Ningún lote bloqueado se libera por defecto ni por vencimiento de plazo.'
            ]
          },
          {
            id: '5',
            heading: '5. Verificación y revisión',
            list: [
              'Verificación semanal de registros de PCC por Calidad.',
              'Auditoría interna del plan APPCC una vez al año.',
              'Revisión completa del plan al cambiar una línea, una fórmula crítica o un proveedor de materia prima.'
            ]
          },
          {
            id: '6',
            heading: '6. Registros',
            list: [
              'Resultados analíticos: LIMS.',
              'Bloqueos y decisiones de empleo: SAP S/4HANA (QM).',
              'Registros de dosificación y mezcla: MES de planta.'
            ]
          },
          { id: '7', heading: '7. Historial de revisiones', text: ['Rev. 5 (10/03/2026): se añade el ensayo de homogeneidad como PCC 3.'] }
        ]
      },
      {
        code: 'PR-CAL-004',
        title: 'Muestreo y control de Salmonella en materias primas',
        short: 'Control de Salmonella',
        type: 'Procedimiento',
        version: '4',
        date: '2026-02-16',
        owner: 'Laboratorio',
        summary: 'Toda partida de materia prima de riesgo se muestrea en recepción y se libera con el certificado del proveedor hasta que el análisis propio confirma el resultado. Un positivo bloquea la partida y los lotes elaborados con ella.',
        sections: [
          {
            id: 'R',
            heading: 'Resumen',
            text: [
              'Toda partida de materia prima de riesgo se muestrea en recepción y se libera con el certificado del proveedor hasta que el análisis propio confirma el resultado. Un positivo bloquea la partida y los lotes elaborados con ella.'
            ]
          },
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: [
              'Controlar Salmonella en las materias primas de riesgo (colina cloruro, vitaminas, oligoelementos de origen orgánico y carriers) recibidas en la planta.',
              'El control de micotoxinas se rige por el plan analítico de cada materia prima y no forma parte de este procedimiento.'
            ]
          },
          {
            id: '2',
            heading: '2. Muestreo',
            text: ['Cada partida de materia prima de riesgo se muestrea en recepción según el plan de muestreo de LIMS:'],
            list: [
              'Muestra compuesta de al menos 10 puntos por partida.',
              'Muestra de 25 g analizada por el método de referencia ISO 6579-1.',
              'Contramuestra conservada 12 meses.'
            ]
          },
          {
            id: '3',
            heading: '3. Liberación condicionada',
            text: [
              'La partida se libera a producción con el certificado de análisis del proveedor conforme (liberación condicionada) y queda marcada en SAP QM hasta que el análisis propio de Salmonella en LIMS confirme el resultado, en un máximo de 5 días hábiles.'
            ]
          },
          {
            id: '4',
            heading: '4. Actuación ante un positivo',
            text: [
              'Un resultado positivo de Salmonella bloquea de inmediato la partida y todos los lotes de producto elaborados con ella.',
              'El Responsable de calidad y seguridad alimentaria decide el destino de la partida: destruir o devolver al proveedor.',
              'Se localiza el producto ya expedido y se activa PR-CAL-007 en un máximo de 2 h.'
            ]
          },
          {
            id: '5',
            heading: '5. Responsabilidades',
            list: [
              'Jefe de laboratorio: ejecuta el análisis, comunica el resultado en LIMS y avisa al Responsable de calidad y seguridad alimentaria.',
              'Responsable de calidad y seguridad alimentaria: ordena el bloqueo y decide el destino y la retirada.',
              'Jefe de planta: detiene el uso de la partida y retiene los lotes de producto afectados.'
            ]
          },
          {
            id: '6',
            heading: '6. Registros',
            list: [
              'Resultados y contramuestras: LIMS.',
              'Bloqueos y decisiones de empleo: SAP S/4HANA (QM).',
              'Avisos internos del positivo: Microsoft Teams.'
            ]
          },
          {
            id: '7',
            heading: '7. Referencias',
            refs: true,
            list: [
              'PR-CAL-007 · Retirada y trazabilidad de lotes.',
              'PR-CAL-001 · APPCC de fabricación de premezclas.',
              'Reglamento (CE) 183/2005 · Higiene de los piensos.'
            ]
          }
        ]
      },
      {
        code: 'PR-CAL-007',
        title: 'Retirada y trazabilidad de lotes',
        short: 'Retirada y trazabilidad',
        type: 'Procedimiento',
        version: '6',
        date: '2026-01-26',
        owner: 'Calidad y seguridad alimentaria',
        summary: 'Traza un paso atrás y un paso adelante de cualquier lote. Traza completa y aviso a la autoridad competente y a los clientes en 4 h; cada retirada cierra con un balance de masas.',
        sections: [
          {
            id: 'R',
            heading: 'Resumen',
            text: [
              'Traza un paso atrás y un paso adelante de cualquier lote. Traza completa y aviso a la autoridad competente y a los clientes en 4 h; cada retirada cierra con un balance de masas.'
            ]
          },
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: [
              'Garantizar la trazabilidad de cada lote de materia prima y de premezcla y definir la retirada de producto no seguro, conforme al Reglamento (CE) 178/2002 (arts. 18 y 19).'
            ]
          },
          {
            id: '2',
            heading: '2. Trazabilidad',
            list: [
              'Hacia atrás: cada lote de premezcla enlaza en SAP S/4HANA con sus lotes de materia prima y proveedor.',
              'En planta: el MES registra las órdenes de fabricación, las pesadas y la línea utilizada.',
              'Hacia delante: cada albarán de expedición enlaza el lote con el cliente y el destino.'
            ]
          },
          {
            id: '3',
            heading: '3. Objetivo de tiempo',
            text: [
              'La traza completa de un lote (materia prima, lotes de premezcla, expediciones y clientes) debe obtenerse en un máximo de 4 h desde la decisión de retirada.',
              'Se informa a la autoridad competente y a los clientes afectados en un máximo de 4 h desde la decisión.'
            ]
          },
          {
            id: '4',
            heading: '4. Actuación ante un producto no seguro',
            text: [
              'Se bloquea el lote de origen y los lotes derivados en SAP QM y en el MES, se retienen las expediciones pendientes y se localizan las ya entregadas.',
              'Si el producto ha llegado al mercado, el Responsable de calidad y seguridad alimentaria notifica a la autoridad competente según el art. 19 del Reglamento (CE) 178/2002 y aprueba el aviso a los clientes.',
              'Los pasos y el contenido de la notificación se detallan según PR-CAL-010 (Gestión de crisis y comunicación con la autoridad competente).'
            ]
          },
          {
            id: '5',
            heading: '5. Aviso a clientes',
            text: [
              'Atención al cliente y Norel Solutions contactan con cada cliente por teléfono y correo con la lista de lotes y albaranes, y registran el acuse en Salesforce CRM.'
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
            text: ['Se realiza un simulacro de retirada una vez al año, con el mismo objetivo de 4 h, y su resultado se archiva en SharePoint.']
          },
          {
            id: '8',
            heading: '8. Registros',
            list: [
              'Trazabilidad y bloqueos: SAP S/4HANA y MES de planta.',
              'Avisos a clientes y acuses: Salesforce CRM.',
              'Campaña, balance y simulacros: SharePoint.'
            ]
          }
        ]
      },
      {
        code: 'PR-PRO-003',
        title: 'Control de contaminación cruzada y limpieza de líneas',
        short: 'Contaminación cruzada y limpieza',
        type: 'Procedimiento',
        version: '3',
        date: '2026-04-08',
        owner: 'Jefe de planta',
        summary: 'Secuencia de producción de menor a mayor riesgo, limpieza validada en el 100 % de los cambios de producto y arrastre máximo del 0,5 % comprobado cada trimestre. Los alérgenos se identifican y se almacenan separados.',
        sections: [
          {
            id: 'R',
            heading: 'Resumen',
            text: [
              'Secuencia de producción de menor a mayor riesgo, limpieza validada en el 100 % de los cambios de producto y arrastre máximo del 0,5 % comprobado cada trimestre. Los alérgenos se identifican y se almacenan separados.'
            ]
          },
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: [
              'Evitar el arrastre de aditivos y de alérgenos entre productos en las líneas de dosificación, mezcla y envasado de la Planta de premezclas (España).'
            ]
          },
          {
            id: '2',
            heading: '2. Secuencia de producción',
            text: [
              'La planificación ordena las fabricaciones de menor a mayor riesgo. Los productos con aditivos de contenido máximo regulado se fabrican al final de la secuencia y van seguidos de una limpieza.'
            ]
          },
          {
            id: '3',
            heading: '3. Limpieza de líneas',
            list: [
              'Limpieza en seco con aspiración y aire comprimido entre productos compatibles.',
              'Lote de arrastre con carrier inerte tras los productos con aditivos de riesgo; se identifica y se reutiliza solo en la misma familia.',
              'Limpieza validada del 100 % de los cambios de producto, registrada en el MES.'
            ]
          },
          {
            id: '4',
            heading: '4. Verificación del arrastre',
            text: [
              'El arrastre máximo admitido entre productos es del 0,5 % y se comprueba cada trimestre con un ensayo de trazador en cada línea.',
              'Un arrastre superior al límite bloquea la línea hasta repetir la limpieza y superar de nuevo el ensayo.'
            ]
          },
          {
            id: '5',
            heading: '5. Gestión de alérgenos',
            text: [
              'Las materias primas con alérgenos declarables se identifican en SAP S/4HANA y se almacenan separadas.',
              'Los productos con alérgenos se fabrican en una secuencia definida y el cambio al producto siguiente exige limpieza validada.'
            ]
          },
          {
            id: '6',
            heading: '6. Registros',
            list: ['Limpiezas y cambios de producto: MES de planta.', 'Ensayos de trazador: LIMS.', 'Identificación de alérgenos: SAP S/4HANA.']
          }
        ]
      },
      {
        code: 'PR-REG-002',
        title: 'Etiquetado y declaración de aditivos (Reglamento (CE) 1831/2003)',
        short: 'Etiquetado de aditivos',
        type: 'Procedimiento',
        version: '4',
        date: '2026-03-24',
        owner: 'Asuntos regulatorios',
        summary: 'Cada aditivo se usa y etiqueta conforme a su autorización en el Registro de la UE, y antes de la primera compra de una sustancia se verifica su registro REACH. Ningún cambio de etiqueta se emite sin revisión de Asuntos regulatorios.',
        sections: [
          {
            id: 'R',
            heading: 'Resumen',
            text: [
              'Cada aditivo se usa y etiqueta conforme a su autorización en el Registro de la UE, y antes de la primera compra de una sustancia se verifica su registro REACH. Ningún cambio de etiqueta se emite sin revisión de Asuntos regulatorios.'
            ]
          },
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: [
              'Asegurar que los aditivos y las premezclas se formulan, etiquetan y declaran conforme al Reglamento (CE) 1831/2003 sobre aditivos para alimentación animal.'
            ]
          },
          {
            id: '2',
            heading: '2. Verificación de la autorización',
            list: [
              'Comprobar que cada aditivo figura en el Registro de la UE de aditivos para alimentación animal y que el etiquetado coincide con su autorización.',
              'Respetar las condiciones de uso: especie de destino, contenido mínimo y máximo y período de retirada si procede.'
            ]
          },
          {
            id: '3',
            heading: '3. Contenido del etiquetado',
            list: [
              'Nombre y función del aditivo, número de identificación y contenido garantizado.',
              'Número de lote, fecha de fabricación y condiciones de conservación.',
              'Nombre y dirección del operador responsable y número de registro o autorización de la planta (Reglamento (CE) 183/2005).'
            ]
          },
          {
            id: '4',
            heading: '4. Registro REACH',
            text: [
              'Antes de la primera compra de una sustancia, Asuntos regulatorios verifica el número de registro REACH del proveedor o del fabricante y lo guarda en SAP S/4HANA.',
              'Una sustancia sin registro REACH vigente no se adquiere.'
            ]
          },
          {
            id: '5',
            heading: '5. Cambios de fórmula o de etiqueta',
            text: [
              'Todo cambio de fórmula o de etiqueta requiere la revisión previa de Asuntos regulatorios y de Calidad y la actualización del expediente en SharePoint.'
            ]
          },
          {
            id: '6',
            heading: '6. Registros',
            list: ['Expediente regulatorio por producto: SharePoint.', 'Registros REACH de proveedores y fórmulas: SAP S/4HANA.']
          }
        ]
      },
      {
        code: 'PR-LAB-005',
        title: 'Verificación de contenidos (vitaminas y oligoelementos)',
        short: 'Verificación de contenidos',
        type: 'Procedimiento',
        version: '5',
        date: '2026-05-12',
        owner: 'Laboratorio',
        summary: 'Cada lote de premezcla se analiza antes de liberarlo y debe quedar dentro de la tolerancia del contenido declarado (±15 % vitaminas, ±10 % oligoelementos). Fuera de tolerancia se bloquea el lote y se repite el análisis.',
        sections: [
          {
            id: 'R',
            heading: 'Resumen',
            text: [
              'Cada lote de premezcla se analiza antes de liberarlo y debe quedar dentro de la tolerancia del contenido declarado (±15 % vitaminas, ±10 % oligoelementos). Fuera de tolerancia se bloquea el lote y se repite el análisis.'
            ]
          },
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: ['Verificar que el contenido de vitaminas y oligoelementos de cada lote de premezcla coincide con el declarado en la etiqueta.']
          },
          {
            id: '2',
            heading: '2. Muestreo y análisis',
            text: [
              'Se analiza una muestra de cada lote de premezcla antes de su liberación. Se verifican por método validado las vitaminas liposolubles A, D3 y E y los oligoelementos Cu, Zn, Mn, Fe y Se.'
            ]
          },
          {
            id: '3',
            heading: '3. Criterio de conformidad',
            list: [
              'Vitaminas: ±15 % respecto al contenido declarado.',
              'Oligoelementos: ±10 % respecto al contenido declarado.',
              'El resultado y el certificado de análisis del lote se registran en LIMS.'
            ]
          },
          {
            id: '4',
            heading: '4. Resultado fuera de tolerancia',
            text: [
              'Un resultado fuera de tolerancia bloquea el lote en SAP QM y obliga a repetir el análisis en duplicado con la contramuestra.',
              'Si se confirma, el Responsable de calidad y seguridad alimentaria decide el destino del lote y se abre un informe 8D.'
            ]
          },
          {
            id: '5',
            heading: '5. Reclamación de cliente por contenido',
            text: [
              'Ante una reclamación por contenido inferior al declarado se envía el acuse de recibo en 24 h y el informe 8D en 10 días hábiles.',
              'Se reanaliza la contramuestra del lote en el laboratorio interno y, si procede, en un laboratorio externo acreditado, y se contrasta con el informe analítico del cliente.',
              'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.'
            ]
          },
          {
            id: '6',
            heading: '6. Registros',
            list: [
              'Resultados, certificados y contramuestras: LIMS.',
              'Bloqueos y consumo de materias primas por lote: SAP S/4HANA y MES de planta.',
              'Reclamaciones e informes 8D: Salesforce CRM.'
            ]
          }
        ]
      },
      {
        code: 'PR-EXP-002',
        title: 'Exportación y documentación sanitaria',
        short: 'Exportación y documentación',
        type: 'Procedimiento',
        version: '3',
        date: '2026-02-02',
        owner: 'Logística y exportación',
        summary: 'Cada expedición fuera de España lleva el certificado de análisis del lote y la documentación sanitaria del país de destino, y se verifica en SAP que el lote no está bloqueado antes de cargar.',
        sections: [
          {
            id: 'R',
            heading: 'Resumen',
            text: [
              'Cada expedición fuera de España lleva el certificado de análisis del lote y la documentación sanitaria del país de destino, y se verifica en SAP que el lote no está bloqueado antes de cargar.'
            ]
          },
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: [
              'Definir la documentación y las verificaciones de las expediciones a clientes de la UE y de terceros países desde la Planta de premezclas (España).'
            ]
          },
          {
            id: '2',
            heading: '2. Documentación de la expedición',
            list: [
              'Albarán y factura comercial con el número de lote.',
              'Certificado de análisis del lote.',
              'Certificado sanitario de exportación cuando el país de destino lo exige (por ejemplo, Marruecos).',
              'Documento de transporte (CMR) y lista de bultos o cisternas.'
            ]
          },
          {
            id: '3',
            heading: '3. Verificación previa a la carga',
            text: [
              'Antes de cargar, Logística y exportación comprueba en SAP S/4HANA que el cliente y el producto están autorizados para el destino y que el lote no está bloqueado.'
            ]
          },
          {
            id: '4',
            heading: '4. Retirada de un envío exportado',
            text: [
              'Si un lote exportado debe retirarse, Logística y exportación localiza el envío y el Responsable de calidad y seguridad alimentaria informa a la autoridad competente del país de destino a través del importador.'
            ]
          },
          {
            id: '5',
            heading: '5. Registros',
            list: ['Expediciones y albaranes: SAP S/4HANA.', 'Certificados sanitarios y documentos de transporte: SharePoint.']
          }
        ]
      }
    ],
    unindexed: {
      'PR-CAL-010': {
        title: 'Gestión de crisis y comunicación con la autoridad competente',
        mentionedIn: { doc: 'PR-CAL-007', sec: '4', quote: 'según PR-CAL-010 (Gestión de crisis y comunicación con la autoridad competente)' }
      }
    },
    suggested: ['salmonella', 'appcc', 'retirada', 'contaminacion', 'verificacion', 'etiquetado'],
    intents: [
      {
        id: 'salmonella',
        icon: 'alert-triangle',
        topic: 'Salmonella · actuación ante un positivo',
        scope: 'local',
        q: '¿Qué hay que hacer si una materia prima da positivo a Salmonella?',
        anchors: ['salmonella', 'positivo', 'positivos', 'colina', 'contaminada'],
        terms: ['materia prima', 'lote', 'lotes', 'resultado', 'hacer', 'actuar', 'bloquear', 'bloqueo', 'partida', 'laboratorio', 'detectado'],
        min: 3,
        blocks: [
          {
            t: 'Un resultado positivo bloquea de inmediato la partida y todos los lotes de producto elaborados con ella.',
            c: [
              [
                'PR-CAL-004',
                4,
                'Un resultado positivo de Salmonella bloquea de inmediato la partida y todos los lotes de producto elaborados con ella.'
              ]
            ]
          },
          {
            t: 'El Responsable de calidad y seguridad alimentaria decide el destino de la partida: destruir o devolver al proveedor.',
            c: [
              [
                'PR-CAL-004',
                4,
                'El Responsable de calidad y seguridad alimentaria decide el destino de la partida: destruir o devolver al proveedor.'
              ]
            ]
          },
          {
            t: 'Se localiza el producto ya expedido y se activa el procedimiento de retirada en un máximo de 2 h.',
            c: [['PR-CAL-004', 4, 'Se localiza el producto ya expedido y se activa PR-CAL-007 en un máximo de 2 h.']]
          },
          {
            t: 'Los bloqueos y las decisiones de empleo se registran en SAP S/4HANA (QM) y el aviso interno se hace por Microsoft Teams.',
            c: [
              ['PR-CAL-004', 6, 'Bloqueos y decisiones de empleo: SAP S/4HANA (QM).'],
              ['PR-CAL-004', 6, 'Avisos internos del positivo: Microsoft Teams.']
            ]
          }
        ],
        context: {
          systems: ['LIMS', 'SAP S/4HANA'],
          text: 'Alarma de hoy (05:50): Salmonella positiva en colina cloruro 60 % lote MP-2610-CC-118 (ensayo LAB-2610-0933), recibida el 21/10 y usada en 4 lotes de premezcla (96 t): 31 t siguen en almacén y 65 t se expidieron a 9 clientes. Por el apartado 4, bloqueo de la partida y de los lotes derivados.',
          outcome: 'alarma',
          go: 'alarma',
          goLabel: 'Abrir la alarma del turno'
        },
        followups: ['condicionada', 'bloqueo-lote', 'retirada']
      },
      {
        id: 'muestreo',
        icon: 'search',
        topic: 'Salmonella · muestreo en recepción',
        scope: 'local',
        q: '¿Cómo se muestrea una materia prima de riesgo al recibirla?',
        anchors: ['muestreo', 'muestrea', 'muestra', 'muestras', 'contramuestra', 'recepción', 'iso 6579'],
        terms: ['materia prima', 'riesgo', 'partida', 'salmonella', 'análisis', 'laboratorio', 'método', 'cómo'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'Cada partida de materia prima de riesgo se muestrea en recepción según el plan de LIMS:',
              c: [['PR-CAL-004', 2, 'Cada partida de materia prima de riesgo se muestrea en recepción según el plan de muestreo de LIMS:']]
            },
            list: [
              {
                t: 'Muestra compuesta de al menos 10 puntos por partida.',
                c: [['PR-CAL-004', 2, 'Muestra compuesta de al menos 10 puntos por partida.']]
              },
              {
                t: 'Muestra de 25 g analizada por el método de referencia ISO 6579-1.',
                c: [['PR-CAL-004', 2, 'Muestra de 25 g analizada por el método de referencia ISO 6579-1.']]
              },
              { t: 'Contramuestra conservada 12 meses.', c: [['PR-CAL-004', 2, 'Contramuestra conservada 12 meses.']] }
            ]
          }
        ],
        followups: ['condicionada', 'salmonella']
      },
      {
        id: 'condicionada',
        icon: 'unlock',
        topic: 'Salmonella · liberación condicionada',
        scope: 'local',
        q: '¿Se puede usar una materia prima de riesgo antes de tener el resultado de Salmonella?',
        anchors: ['liberación', 'liberar', 'liberada', 'liberación condicionada', 'certificado de análisis', 'antes del resultado'],
        terms: ['materia prima', 'usar', 'producción', 'resultado', 'salmonella', 'proveedor', 'días', 'esperar'],
        min: 3,
        blocks: [
          {
            t: 'Sí, con liberación condicionada: la partida pasa a producción con el certificado de análisis del proveedor conforme y queda marcada en SAP QM.',
            c: [
              [
                'PR-CAL-004',
                3,
                'La partida se libera a producción con el certificado de análisis del proveedor conforme (liberación condicionada) y queda marcada en SAP QM'
              ]
            ]
          },
          {
            t: 'La marca se mantiene hasta que el análisis propio de Salmonella en LIMS confirme el resultado, en un máximo de 5 días hábiles.',
            c: [['PR-CAL-004', 3, 'hasta que el análisis propio de Salmonella en LIMS confirme el resultado, en un máximo de 5 días hábiles']]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'LIMS'],
          text: 'La colina cloruro MP-2610-CC-118 se recibió el 21/10 con certificado del proveedor conforme y se liberó de forma condicionada; el ensayo propio LAB-2610-0933 se confirmó positivo hoy, a los 5 días hábiles.',
          outcome: 'alarma',
          go: 'alarma',
          goLabel: 'Abrir la alarma del turno'
        },
        followups: ['salmonella', 'muestreo']
      },
      {
        id: 'appcc',
        icon: 'clipboard-check',
        topic: 'APPCC · puntos críticos de control',
        scope: 'local',
        q: '¿Cuáles son los puntos críticos de control de la fabricación de premezclas?',
        anchors: ['appcc', 'pcc', 'puntos críticos', 'punto crítico', 'haccp', 'peligros'],
        terms: ['control', 'fabricación', 'premezclas', 'cuáles', 'plan', 'verificación', 'dosificación', 'mezcla'],
        min: 3,
        blocks: [
          {
            intro: { t: 'El plan APPCC define cuatro puntos críticos de control:', c: [['PR-CAL-001', 3, 'PCC 1 · Recepción de materias primas']] },
            list: [
              {
                t: 'Recepción de materias primas: análisis de Salmonella y verificación del certificado de análisis antes de liberar el lote.',
                c: [
                  [
                    'PR-CAL-001',
                    3,
                    'PCC 1 · Recepción de materias primas: análisis de Salmonella y verificación del certificado de análisis antes de liberar el lote'
                  ]
                ]
              },
              {
                t: 'Dosificación de microingredientes: pesada con doble verificación y tolerancia máxima del 2 % sobre la fórmula.',
                c: [
                  [
                    'PR-CAL-001',
                    3,
                    'PCC 2 · Dosificación de microingredientes: pesada con doble verificación y tolerancia máxima del 2 % sobre la fórmula.'
                  ]
                ]
              },
              {
                t: 'Mezcla homogénea: ensayo de homogeneidad con coeficiente de variación inferior al 5 %.',
                c: [['PR-CAL-001', 3, 'PCC 3 · Mezcla homogénea: ensayo de homogeneidad con coeficiente de variación inferior al 5 %.']]
              },
              {
                t: 'Contaminación cruzada: limpieza validada entre productos.',
                c: [['PR-CAL-001', 3, 'PCC 4 · Contaminación cruzada: limpieza validada entre productos']]
              }
            ]
          },
          {
            t: 'Calidad verifica los registros de los PCC cada semana y el plan se audita una vez al año.',
            c: [
              ['PR-CAL-001', 5, 'Verificación semanal de registros de PCC por Calidad.'],
              ['PR-CAL-001', 5, 'Auditoría interna del plan APPCC una vez al año.']
            ]
          }
        ],
        followups: ['bloqueo-lote', 'contaminacion']
      },
      {
        id: 'bloqueo-lote',
        icon: 'lock',
        topic: 'APPCC · destino de un lote bloqueado',
        scope: 'local',
        q: '¿Quién decide qué se hace con un lote bloqueado por una desviación?',
        anchors: ['bloqueado', 'bloqueados', 'bloqueo', 'desviación', 'liberar', 'reprocesar', 'destruir'],
        terms: ['quién', 'decide', 'lote', 'lotes', 'destino', 'decisión', 'empleo', 'sap', 'mes'],
        min: 3,
        blocks: [
          {
            t: 'Ante una desviación en un PCC, el lote se bloquea en SAP QM y en el MES.',
            c: [['PR-CAL-001', 4, 'el lote se bloquea en SAP QM y en el MES']]
          },
          {
            t: 'Solo el Responsable de calidad y seguridad alimentaria decide su destino: liberar, reprocesar o destruir.',
            c: [['PR-CAL-001', 4, 'solo el Responsable de calidad y seguridad alimentaria decide su destino: liberar, reprocesar o destruir']]
          },
          {
            t: 'Ningún lote bloqueado se libera por defecto ni por vencimiento de plazo.',
            c: [['PR-CAL-001', 4, 'Ningún lote bloqueado se libera por defecto ni por vencimiento de plazo.']]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'MES de planta'],
          text: 'Hoy hay 4 lotes de premezcla bloqueados por la Salmonella de MP-2610-CC-118 (PRM-2610-0417, 0418, 0421 y 0425; 96 t). El destino de cada lote lo decide el Responsable de calidad y seguridad alimentaria.',
          outcome: 'alarma',
          go: 'alarma',
          goLabel: 'Abrir la alarma del turno'
        },
        followups: ['salmonella', 'retirada']
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
            t: 'La traza completa del lote (materia prima, lotes de premezcla, expediciones y clientes) debe obtenerse en un máximo de 4 h desde la decisión de retirada.',
            c: [['PR-CAL-007', 3, 'debe obtenerse en un máximo de 4 h desde la decisión de retirada']]
          },
          {
            t: 'La autoridad competente y los clientes afectados se informan en ese mismo plazo de 4 h.',
            c: [['PR-CAL-007', 3, 'Se informa a la autoridad competente y a los clientes afectados en un máximo de 4 h desde la decisión.']]
          },
          {
            t: 'Se bloquea el lote de origen y los derivados, se retienen las expediciones pendientes y se localizan las ya entregadas.',
            c: [
              [
                'PR-CAL-007',
                4,
                'Se bloquea el lote de origen y los lotes derivados en SAP QM y en el MES, se retienen las expediciones pendientes y se localizan las ya entregadas.'
              ]
            ]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'MES de planta'],
          text: 'Campaña RET-2026-1028: de la colina cloruro MP-2610-CC-118 a 4 lotes de premezcla, 148 albaranes y 9 clientes de España, Portugal y Marruecos. El objetivo es informar a las autoridades y a los clientes en 4 h (Reglamento (CE) 178/2002, art. 19).',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Abrir campaña RET-2026-1028'
        },
        followups: ['trazabilidad', 'notificacion', 'balance']
      },
      {
        id: 'trazabilidad',
        icon: 'barcode',
        topic: 'Trazabilidad · hacia atrás y hacia delante',
        scope: 'local',
        q: '¿Cómo se traza un lote de premezcla hacia atrás y hacia delante?',
        anchors: ['trazar', 'traza', 'trazabilidad', 'hacia atrás', 'hacia delante', 'genealogía', 'albarán', 'albaranes'],
        terms: ['lote', 'premezcla', 'cliente', 'proveedor', 'materia prima', 'cómo', 'sap', 'mes', 'registro'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'La traza se apoya en tres registros:',
              c: [['PR-CAL-007', 2, 'Hacia atrás: cada lote de premezcla enlaza en SAP S/4HANA con sus lotes de materia prima y proveedor.']]
            },
            list: [
              {
                t: 'Hacia atrás: cada lote de premezcla enlaza en SAP S/4HANA con sus lotes de materia prima y proveedor.',
                c: [['PR-CAL-007', 2, 'Hacia atrás: cada lote de premezcla enlaza en SAP S/4HANA con sus lotes de materia prima y proveedor.']]
              },
              {
                t: 'En planta: el MES registra las órdenes de fabricación, las pesadas y la línea utilizada.',
                c: [['PR-CAL-007', 2, 'En planta: el MES registra las órdenes de fabricación, las pesadas y la línea utilizada.']]
              },
              {
                t: 'Hacia delante: cada albarán de expedición enlaza el lote con el cliente y el destino.',
                c: [['PR-CAL-007', 2, 'Hacia delante: cada albarán de expedición enlaza el lote con el cliente y el destino.']]
              }
            ]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'MES de planta', 'LIMS'],
          text: 'Traza completa del lote de ejemplo, desde las materias primas hasta la expedición a los clientes:',
          lot: 'PRM-2610-0417'
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
                'PR-CAL-007',
                6,
                'Cada retirada cierra con un balance de masas: cantidad del lote de origen = stock bloqueado + producto expedido + producto consumido o destruido.'
              ]
            ]
          },
          {
            t: 'Un balance que no cuadra se investiga antes de cerrar la campaña.',
            c: [['PR-CAL-007', 6, 'Un balance que no cuadra se investiga antes de cerrar la campaña.']]
          },
          {
            t: 'La campaña, el balance y los simulacros se archivan en SharePoint.',
            c: [['PR-CAL-007', 8, 'Campaña, balance y simulacros: SharePoint.']]
          }
        ],
        context: {
          systems: ['SAP S/4HANA'],
          text: 'Balance de RET-2026-1028: 96 t = 31 t en almacén de producto terminado + 65 t expedidas a 9 clientes. Cuadra: no hay producto consumido ni destruido todavía.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Abrir campaña RET-2026-1028'
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
                'PR-CAL-007',
                4,
                'el Responsable de calidad y seguridad alimentaria notifica a la autoridad competente según el art. 19 del Reglamento (CE) 178/2002 y aprueba el aviso a los clientes'
              ]
            ]
          },
          {
            t: 'Los pasos y el contenido de la notificación se detallan según PR-CAL-010.',
            c: [['PR-CAL-007', 4, 'según PR-CAL-010 (Gestión de crisis y comunicación con la autoridad competente)']]
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
        anchors: ['avisar', 'aviso', 'avisa', 'clientes', 'acuse', 'importador', 'marruecos', 'portugal'],
        terms: ['retirada', 'lista', 'lotes', 'albaranes', 'país', 'destino', 'autoridad', 'exportado', 'cómo'],
        min: 3,
        blocks: [
          {
            t: 'Atención al cliente y Norel Solutions contactan con cada cliente por teléfono y correo con la lista de lotes y albaranes.',
            c: [
              [
                'PR-CAL-007',
                5,
                'Atención al cliente y Norel Solutions contactan con cada cliente por teléfono y correo con la lista de lotes y albaranes'
              ]
            ]
          },
          { t: 'El acuse de cada cliente se registra en Salesforce CRM.', c: [['PR-CAL-007', 5, 'registran el acuse en Salesforce CRM']] },
          {
            t: 'En un envío exportado, Logística y exportación localiza el envío y se informa a la autoridad del país de destino a través del importador.',
            c: [
              [
                'PR-EXP-002',
                4,
                'Logística y exportación localiza el envío y el Responsable de calidad y seguridad alimentaria informa a la autoridad competente del país de destino a través del importador'
              ]
            ]
          }
        ],
        context: {
          systems: ['Salesforce CRM', 'Microsoft Teams'],
          text: 'De los 9 clientes de RET-2026-1028, hay fábricas de piensos de España, Portugal y Marruecos: para estas últimas se informa a la autoridad del país de destino a través del importador.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Abrir campaña RET-2026-1028'
        },
        followups: ['retirada', 'exportacion']
      },
      {
        id: 'contaminacion',
        icon: 'shield',
        topic: 'Contaminación cruzada · secuencia y limpieza',
        scope: 'local',
        q: '¿Cómo se evita la contaminación cruzada entre productos en las líneas?',
        anchors: ['contaminación cruzada', 'contaminación', 'arrastre', 'limpieza', 'limpiar', 'secuencia', 'trazador'],
        terms: ['líneas', 'productos', 'cambio', 'producto', 'validada', 'evitar', 'cómo', 'fabricación', 'planificación'],
        min: 3,
        blocks: [
          {
            t: 'Las fabricaciones se ordenan de menor a mayor riesgo, y los productos con aditivos de contenido máximo regulado se fabrican al final de la secuencia y van seguidos de una limpieza.',
            c: [
              ['PR-PRO-003', 2, 'La planificación ordena las fabricaciones de menor a mayor riesgo.'],
              [
                'PR-PRO-003',
                2,
                'Los productos con aditivos de contenido máximo regulado se fabrican al final de la secuencia y van seguidos de una limpieza.'
              ]
            ]
          },
          {
            t: 'El 100 % de los cambios de producto lleva limpieza validada, registrada en el MES.',
            c: [['PR-PRO-003', 3, 'Limpieza validada del 100 % de los cambios de producto, registrada en el MES.']]
          },
          {
            t: 'Tras los productos con aditivos de riesgo se usa un lote de arrastre con carrier inerte.',
            c: [['PR-PRO-003', 3, 'Lote de arrastre con carrier inerte tras los productos con aditivos de riesgo']]
          },
          {
            t: 'El arrastre máximo admitido es del 0,5 % y se comprueba cada trimestre con un ensayo de trazador en cada línea.',
            c: [
              [
                'PR-PRO-003',
                4,
                'El arrastre máximo admitido entre productos es del 0,5 % y se comprueba cada trimestre con un ensayo de trazador en cada línea.'
              ]
            ]
          }
        ],
        followups: ['alergenos', 'appcc']
      },
      {
        id: 'alergenos',
        icon: 'alert-triangle',
        topic: 'Contaminación cruzada · alérgenos',
        scope: 'local',
        q: '¿Cómo se gestionan los alérgenos en la planta?',
        anchors: ['alérgeno', 'alérgenos', 'alergeno', 'alergenos', 'declarables'],
        terms: ['planta', 'gestionan', 'gestión', 'almacenan', 'separadas', 'identifican', 'cambio', 'producto', 'materias primas'],
        min: 2,
        blocks: [
          {
            t: 'Las materias primas con alérgenos declarables se identifican en SAP S/4HANA y se almacenan separadas.',
            c: [['PR-PRO-003', 5, 'Las materias primas con alérgenos declarables se identifican en SAP S/4HANA y se almacenan separadas.']]
          },
          {
            t: 'Los productos con alérgenos se fabrican en una secuencia definida y el cambio al producto siguiente exige limpieza validada.',
            c: [
              [
                'PR-PRO-003',
                5,
                'Los productos con alérgenos se fabrican en una secuencia definida y el cambio al producto siguiente exige limpieza validada.'
              ]
            ]
          }
        ],
        followups: ['contaminacion']
      },
      {
        id: 'etiquetado',
        icon: 'file-text',
        topic: 'Etiquetado de aditivos · contenido y autorización',
        scope: 'local',
        q: '¿Qué debe declarar la etiqueta de un aditivo o de una premezcla?',
        anchors: ['etiqueta', 'etiquetado', 'etiquetar', 'declarar', 'declaración', '1831/2003', 'autorización', 'registro de la ue'],
        terms: ['aditivo', 'aditivos', 'premezcla', 'contenido', 'garantizado', 'lote', 'función', 'operador', 'qué'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'La etiqueta debe incluir, como mínimo:',
              c: [['PR-REG-002', 3, 'Nombre y función del aditivo, número de identificación y contenido garantizado.']]
            },
            list: [
              {
                t: 'Nombre y función del aditivo, número de identificación y contenido garantizado.',
                c: [['PR-REG-002', 3, 'Nombre y función del aditivo, número de identificación y contenido garantizado.']]
              },
              {
                t: 'Número de lote, fecha de fabricación y condiciones de conservación.',
                c: [['PR-REG-002', 3, 'Número de lote, fecha de fabricación y condiciones de conservación.']]
              },
              {
                t: 'Nombre y dirección del operador responsable y número de registro o autorización de la planta.',
                c: [
                  [
                    'PR-REG-002',
                    3,
                    'Nombre y dirección del operador responsable y número de registro o autorización de la planta (Reglamento (CE) 183/2005).'
                  ]
                ]
              }
            ]
          },
          {
            t: 'Además, se comprueba que cada aditivo figura en el Registro de la UE y que el etiquetado coincide con su autorización.',
            c: [
              [
                'PR-REG-002',
                2,
                'Comprobar que cada aditivo figura en el Registro de la UE de aditivos para alimentación animal y que el etiquetado coincide con su autorización.'
              ]
            ]
          },
          {
            t: 'Todo cambio de fórmula o de etiqueta requiere la revisión previa de Asuntos regulatorios y de Calidad.',
            c: [['PR-REG-002', 5, 'Todo cambio de fórmula o de etiqueta requiere la revisión previa de Asuntos regulatorios y de Calidad']]
          }
        ],
        followups: ['reach']
      },
      {
        id: 'reach',
        icon: 'clipboard-list',
        topic: 'REACH · compra de una sustancia nueva',
        scope: 'local',
        q: '¿Qué se comprueba antes de comprar una sustancia nueva a un proveedor (REACH)?',
        anchors: ['reach', 'registro reach', 'sustancia', 'sustancias', 'primera compra', 'nuevo proveedor'],
        terms: ['comprar', 'compra', 'proveedor', 'fabricante', 'registro', 'número', 'comprueba', 'verifica', 'asuntos regulatorios'],
        min: 2,
        blocks: [
          {
            t: 'Antes de la primera compra, Asuntos regulatorios verifica el número de registro REACH del proveedor o del fabricante y lo guarda en SAP S/4HANA.',
            c: [
              [
                'PR-REG-002',
                4,
                'Antes de la primera compra de una sustancia, Asuntos regulatorios verifica el número de registro REACH del proveedor o del fabricante y lo guarda en SAP S/4HANA.'
              ]
            ]
          },
          {
            t: 'Una sustancia sin registro REACH vigente no se adquiere.',
            c: [['PR-REG-002', 4, 'Una sustancia sin registro REACH vigente no se adquiere.']]
          }
        ],
        followups: ['etiquetado']
      },
      {
        id: 'verificacion',
        icon: 'gauge',
        topic: 'Verificación de contenidos · análisis y tolerancias',
        scope: 'local',
        q: '¿Cómo se verifica el contenido de vitaminas y oligoelementos de una premezcla?',
        anchors: ['verificación', 'verifica', 'verificar', 'contenido', 'contenidos', 'tolerancia', 'tolerancias', 'vitamina e', 'vitaminas', 'oligoelementos'],
        terms: ['premezcla', 'lote', 'análisis', 'declarado', 'etiqueta', 'laboratorio', 'liberación', 'cómo'],
        min: 3,
        blocks: [
          {
            t: 'Se analiza una muestra de cada lote de premezcla antes de su liberación, por método validado: vitaminas A, D3 y E y oligoelementos Cu, Zn, Mn, Fe y Se.',
            c: [['PR-LAB-005', 2, 'Se analiza una muestra de cada lote de premezcla antes de su liberación.']]
          },
          {
            t: 'Criterio de conformidad: ±15 % para las vitaminas y ±10 % para los oligoelementos respecto al contenido declarado.',
            c: [
              ['PR-LAB-005', 3, 'Vitaminas: ±15 % respecto al contenido declarado.'],
              ['PR-LAB-005', 3, 'Oligoelementos: ±10 % respecto al contenido declarado.']
            ]
          },
          {
            t: 'El resultado y el certificado de análisis del lote se registran en LIMS.',
            c: [['PR-LAB-005', 3, 'El resultado y el certificado de análisis del lote se registran en LIMS.']]
          }
        ],
        followups: ['tolerancia', 'reclamacion-contenido']
      },
      {
        id: 'tolerancia',
        icon: 'lock',
        topic: 'Verificación de contenidos · lote fuera de tolerancia',
        scope: 'local',
        q: '¿Qué se hace si el análisis de un lote queda fuera de tolerancia?',
        anchors: ['fuera de tolerancia', 'fuera de rango', 'no conforme', 'desviación del contenido', 'contramuestra'],
        terms: ['lote', 'análisis', 'resultado', 'bloquea', 'bloqueo', 'repetir', 'duplicado', 'informe 8d', 'destino'],
        min: 2,
        blocks: [
          {
            t: 'El lote se bloquea en SAP QM y el análisis se repite en duplicado con la contramuestra.',
            c: [
              [
                'PR-LAB-005',
                4,
                'Un resultado fuera de tolerancia bloquea el lote en SAP QM y obliga a repetir el análisis en duplicado con la contramuestra.'
              ]
            ]
          },
          {
            t: 'Si se confirma, el Responsable de calidad y seguridad alimentaria decide el destino del lote y se abre un informe 8D.',
            c: [
              [
                'PR-LAB-005',
                4,
                'Si se confirma, el Responsable de calidad y seguridad alimentaria decide el destino del lote y se abre un informe 8D.'
              ]
            ]
          }
        ],
        followups: ['verificacion', 'reclamacion-contenido']
      },
      {
        id: 'reclamacion-contenido',
        icon: 'mail',
        topic: 'Reclamación de cliente · contenido inferior al declarado',
        scope: 'all',
        q: '¿Qué plazos y pasos hay si un cliente reclama un contenido de vitamina inferior al declarado?',
        anchors: ['reclamación', 'reclamaciones', 'reclama', 'queja', '8d', 'cliente reclama'],
        terms: ['plazo', 'plazos', 'acuse', 'informe', 'contenido', 'vitamina', 'inferior', 'declarado', 'contramuestra', 'reanálisis', 'días'],
        min: 3,
        blocks: [
          {
            t: 'Acuse de recibo en 24 h e informe 8D en 10 días hábiles.',
            c: [['PR-LAB-005', 5, 'se envía el acuse de recibo en 24 h y el informe 8D en 10 días hábiles']]
          },
          {
            t: 'Se reanaliza la contramuestra del lote en el laboratorio interno y, si procede, en un laboratorio externo acreditado, y se contrasta con el informe analítico del cliente.',
            c: [
              [
                'PR-LAB-005',
                5,
                'Se reanaliza la contramuestra del lote en el laboratorio interno y, si procede, en un laboratorio externo acreditado, y se contrasta con el informe analítico del cliente.'
              ]
            ]
          },
          {
            t: 'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.',
            c: [
              [
                'PR-LAB-005',
                5,
                'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.'
              ]
            ]
          }
        ],
        context: {
          systems: ['Salesforce CRM', 'LIMS'],
          text: 'Caso CLM-2026-1028: Piensos Cuenca Mediterráneo, S.A. reclama una vitamina E un 18 % inferior a la declarada en el lote PRM-2610-0388, según su informe LAB-CLI-2610-77. Un 18 % queda fuera de la tolerancia del ±15 % del apartado 3 de PR-LAB-005, pero hasta reanalizar la contramuestra la causa es una hipótesis.',
          outcome: 'reclamacion',
          go: 'reclamacion',
          goLabel: 'Abrir reclamación CLM-2026-1028'
        },
        followups: ['verificacion', 'tolerancia']
      },
      {
        id: 'exportacion',
        icon: 'truck',
        topic: 'Exportación · documentación de la expedición',
        scope: 'local',
        q: '¿Qué documentación lleva una expedición a otro país?',
        anchors: ['exportación', 'exportar', 'exportado', 'expedición', 'expediciones', 'documentación', 'certificado sanitario', 'cmr'],
        terms: ['país', 'destino', 'albarán', 'factura', 'certificado', 'transporte', 'carga', 'marruecos', 'portugal', 'lote'],
        min: 3,
        blocks: [
          {
            intro: { t: 'Cada expedición lleva, como mínimo:', c: [['PR-EXP-002', 2, 'Albarán y factura comercial con el número de lote.']] },
            list: [
              {
                t: 'Albarán y factura comercial con el número de lote.',
                c: [['PR-EXP-002', 2, 'Albarán y factura comercial con el número de lote.']]
              },
              { t: 'Certificado de análisis del lote.', c: [['PR-EXP-002', 2, 'Certificado de análisis del lote.']] },
              {
                t: 'Certificado sanitario de exportación cuando el país de destino lo exige (por ejemplo, Marruecos).',
                c: [['PR-EXP-002', 2, 'Certificado sanitario de exportación cuando el país de destino lo exige (por ejemplo, Marruecos).']]
              },
              {
                t: 'Documento de transporte (CMR) y lista de bultos o cisternas.',
                c: [['PR-EXP-002', 2, 'Documento de transporte (CMR) y lista de bultos o cisternas.']]
              }
            ]
          },
          {
            t: 'Antes de cargar se comprueba en SAP S/4HANA que el cliente y el producto están autorizados para el destino y que el lote no está bloqueado.',
            c: [
              [
                'PR-EXP-002',
                3,
                'comprueba en SAP S/4HANA que el cliente y el producto están autorizados para el destino y que el lote no está bloqueado'
              ]
            ]
          }
        ],
        context: {
          systems: ['SAP S/4HANA'],
          text: 'Entre los 9 clientes de la retirada RET-2026-1028 hay fábricas de piensos de Portugal y Marruecos: sus albaranes llevan el certificado de análisis del lote y, en Marruecos, el certificado sanitario de exportación.',
          go: 'retirada',
          goLabel: 'Abrir campaña RET-2026-1028'
        },
        followups: ['clientes-aviso', 'retirada']
      }
    ],
    other_scopes: {
      topic: 'Otra planta',
      words: ['méxico', 'mexico', 'egipto', 'estados unidos', 'brasil', 'singapur'],
      reason: 'Los documentos indexados sobre este tema son de la Planta de premezclas (España); no hay evidencia para {x}.'
    },
    gaps: [
      {
        id: 'micotoxinas',
        topic: 'Micotoxinas',
        anchors: ['micotoxina', 'micotoxinas', 'aflatoxina', 'ocratoxina', 'zearalenona', 'deoxinivalenol'],
        reason: 'Ningún documento indexado recoge el plan analítico de micotoxinas ni sus límites; PR-CAL-004 solo remite al plan analítico de cada materia prima.'
      },
      {
        id: 'omg',
        topic: 'Libre de OMG',
        anchors: ['omg', 'transgénico', 'transgénicos', 'libre de omg', 'modificado genéticamente'],
        reason: 'Ningún documento indexado contiene declaraciones de libre de OMG de los proveedores ni análisis PCR.'
      },
      {
        id: 'sostenibilidad',
        topic: 'Sostenibilidad y ESG',
        anchors: ['sostenibilidad', 'huella', 'carbono', 'emisiones', 'esg', 'alcance 1', 'alcance 3'],
        reason: 'Ningún documento indexado trata el inventario de emisiones ni la política ESG de la planta.'
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
})('norel');
