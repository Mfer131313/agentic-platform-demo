/* Norel Nutrición Animal · cuestionario de auditoría de proveedor de aditivos de Grupo Integrador Levante. Escenario de demostración con datos sintéticos (MFM). */
agenticPack('norel', {
  cuestionario: {
    agent: 'Cuestionarios de cliente',
    lang: 'es',
    default_sel: 'B2',
    reviewer: 'Responsable de calidad y seguridad alimentaria',
    assignee: 'Responsable de calidad y seguridad alimentaria',
    assignee_short: 'Calidad y APPCC',
    team: 'Calidad',
    assign_due: '2026-10-30',
    responder: 'Norel Nutrición Animal (Norel, S.A.) · Planta de premezclas (España)',
    site: 'Planta de premezclas (España)',
    site_label: 'Planta',
    page_title: 'Auditoría de proveedor · Grupo Integrador Levante',
    report_title: 'Respuesta a cuestionario de auditoría de proveedor de aditivos',
    ref_label: 'Referencia del cliente',
    scope_meta_label: 'Productos',
    discard_placeholder: 'Por ejemplo: esta pregunta se responde con el certificado adjunto',
    save_system: 'Salesforce CRM',
    qn: {
      code: 'CUE-2026-052',
      title: 'Cuestionario de auditoría de proveedor de aditivos 2026',
      customer: 'Grupo Integrador Levante',
      via: 'Compras y Calidad de Proveedores',
      received: '2026-10-26T10:15',
      due: '2026-11-06',
      file: 'Levante_Auditoria_proveedor_aditivos_2026.xlsx',
      scope: 'premezclas vitamínico-minerales y aditivos nutricionales para avicultura suministrados a las fábricas de piensos de Grupo Integrador Levante',
      scope_short: 'Premezclas y aditivos avícolas',
      scope_label: '2 familias de producto'
    },
    email: {
      mailbox: 'buzón de Calidad',
      headers: {
        From: 'Compras y Calidad de Proveedores, Grupo Integrador Levante <proveedores@integradorlevante.example>',
        To: 'Calidad, Norel Nutrición Animal <calidad@norel-demo.example>',
        Date: 'lun, 26 oct 2026 10:15 (hora de Madrid)',
        Subject: 'Auditoría de proveedor de aditivos 2026 · cuestionario previo · respuesta antes del 6 de noviembre'
      },
      text: 'Buenos días:\n\nDentro de nuestro programa anual de homologación de proveedores, Grupo Integrador Levante os envía el cuestionario de auditoría de proveedor de aditivos 2026, previo a la auditoría documental, para las premezclas y los aditivos que suministráis a nuestras fábricas de piensos avícolas.\n\nSon 15 preguntas en cinco bloques: sistemas de gestión y certificaciones, seguridad alimentaria, control de proceso, trazabilidad y retirada, y cumplimiento y sostenibilidad.\n\nPara cada respuesta indicad el procedimiento, registro o certificado que la respalda. Necesitamos el cuestionario completado antes del viernes 6 de noviembre de 2026.\n\nUn saludo,\n\nCompras y Calidad de Proveedores\nGrupo Integrador Levante',
      highlights: [
        { text: 'premezclas y los aditivos que suministráis a nuestras fábricas de piensos avícolas', label: 'Alcance', tone: 'brand' },
        { text: '15 preguntas', label: 'Preguntas', tone: 'brand' },
        { text: 'indicad el procedimiento, registro o certificado que la respalda', label: 'Requisito' },
        { text: 'viernes 6 de noviembre de 2026', label: 'Plazo' }
      ]
    },
    sections: [
      { id: 'A', es: 'Sistemas de gestión y certificaciones' },
      { id: 'B', es: 'Seguridad alimentaria' },
      { id: 'C', es: 'Control de proceso' },
      { id: 'D', es: 'Trazabilidad y retirada' },
      { id: 'E', es: 'Cumplimiento y sostenibilidad' }
    ],
    kpi: {
      label: 'Auditorías y visitas en 2025',
      value: 17,
      sub: 'Incluye inspecciones oficiales · 24 jornadas · Informe de Sostenibilidad 2025',
      icon: 'shield-check'
    },
    sources_sub: 'Procedimientos, certificados, registros e informe de sostenibilidad',
    identify_result: 'Grupo Integrador Levante vía Compras y Calidad de Proveedores · premezclas y aditivos avícolas',
    search_scope: 'procedimientos de Calidad, certificados, registros de LIMS y MES e informe de sostenibilidad',
    lookups: [
      {
        system: 'SAP S/4HANA',
        action: 'Consulta los lotes de premezcla y sus materias primas suministrados a Grupo Integrador Levante',
        result: 'PRM-2610-0402: MP-2610-VE-041 y MP-2610-OE-071 · 3 albaranes a Grupo Integrador Levante',
        ms: 520
      },
      {
        system: 'LIMS',
        action: 'Revisa el plan de Salmonella y la verificación de contenidos de 2026',
        result: '428 análisis de Salmonella, 0 positivos hasta el 27/10 · 271 lotes verificados',
        ms: 480
      },
      {
        system: 'MES de planta',
        action: 'Lee las limpiezas de línea y los cambios de producto',
        result: '312 cambios de producto en 12 semanas · 312 con limpieza validada',
        ms: 410
      },
      {
        system: 'SharePoint',
        action: 'Comprueba certificados, expediente regulatorio y procedimientos vigentes',
        result: 'GMP+ B2 vigente hasta el 14/05/2027 · FAMI-QS sin fecha de caducidad en la ficha',
        ms: 300
      },
      {
        system: 'Salesforce CRM',
        action: 'Busca reclamaciones abiertas y cerradas de la planta',
        result: 'CLM-2026-1028 abierta (otro cliente): vitamina E en PRM-2610-0388',
        ms: 350,
        tone: 'warn'
      },
      {
        system: 'LIMS',
        action: 'Cruza los lotes de este cliente con la alerta de hoy',
        result: 'MP-2610-CC-118 positivo a Salmonella · ningún albarán de Grupo Integrador Levante con producto de ese lote',
        ms: 390,
        tone: 'warn'
      }
    ],
    compare: {
      people: '2-3: Calidad y seguridad alimentaria, Laboratorio y, según la pregunta, Asuntos regulatorios o Producción',
      systems: '6-8: correo, Excel del cliente, SAP, LIMS, MES, SharePoint, carpeta de certificados y procedimientos',
      steps: 'Buscar la fuente de cada pregunta, copiar y adaptar respuestas de otros años, pedir datos a Laboratorio y a Planta y montar el Excel',
      time: '4-6 h de trabajo de Calidad, repartidas en 3-4 días'
    },
    presenter: {
      before: [
        'Cada integrador y cada fábrica de piensos trae su cuestionario de proveedor. En 2025 Norel recibió 17 auditorías de clientes, de certificación e inspecciones: 24 jornadas. Es trabajo de fondo que se come horas de Calidad.',
        'Este llega de Grupo Integrador Levante: {total} preguntas sobre las premezclas y los aditivos que suministráis a sus fábricas avícolas, con GMP+ B2, FAMI-QS, APPCC, Salmonella, retirada y ESG.',
        'Al pulsar, Agentic Platform busca en procedimientos, certificados e informe de sostenibilidad, y en los registros de SAP, LIMS, MES, SharePoint y Salesforce, y redacta cada respuesta con su fuente.'
      ],
      during: [
        '{drafted} de {total} con borrador y cita; cada cita se comprueba contra el texto de la fuente. {flagged} quedan para Calidad: micotoxinas, libre de OMG y emisiones. Sin documento que lo respalde, no se inventa nada.',
        'B2: además de responder, avisa de que esta mañana ha dado positivo a Salmonella la colina cloruro MP-2610-CC-118 y de que ningún albarán de este cliente lleva producto de ese lote. Hoy eso depende de que alguien se acuerde.',
        'B4: avisa de que otro cliente tiene abierta la reclamación CLM-2026-1028 por vitamina E antes de afirmar la eficacia de la verificación de contenidos. El cuestionario no vive aislado del resto de la planta.',
        'Nada sale sin aprobación: en bloque solo las de confianza alta; las de confianza media se revisan una a una.'
      ],
      next_during: 'Enseñar B2 (cita y aviso de la Salmonella de hoy) y B3 (sin evidencia). Después "Aprobar las {alta} de confianza alta", aprobar {media_ids} una a una y "Asignar las {flagged} sin fuente a Calidad y APPCC".'
    },
    sources: {
      'PR-CAL-001': {
        type: 'doc',
        kind: 'Procedimiento',
        code: 'PR-CAL-001',
        title: 'APPCC de fabricación de premezclas',
        system: 'Procedimientos',
        sections: [
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: 'Definir el plan APPCC de la fabricación de premezclas vitamínico-minerales y aditivos en la Planta de premezclas (España), conforme al Reglamento (CE) 183/2005 (higiene de piensos) y al esquema GMP+ B2. Aplica a todas las líneas de dosificación, mezcla y envasado. El transporte se rige por PR-EXP-002.'
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
            id: '5',
            heading: '5. Verificación y revisión',
            list: [
              'Verificación semanal de registros de PCC por Calidad.',
              'Auditoría interna del plan APPCC una vez al año.',
              'Revisión completa del plan al cambiar una línea, una fórmula crítica o un proveedor de materia prima.'
            ]
          }
        ]
      },
      'PR-CAL-004': {
        type: 'doc',
        kind: 'Procedimiento',
        code: 'PR-CAL-004',
        title: 'Muestreo y control de Salmonella en materias primas',
        system: 'Procedimientos',
        sections: [
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: 'Controlar Salmonella en las materias primas de riesgo (colina cloruro, vitaminas, oligoelementos de origen orgánico y carriers) recibidas en la planta. El control de micotoxinas se rige por el plan analítico de cada materia prima y no forma parte de este procedimiento.'
          },
          {
            id: '2',
            heading: '2. Muestreo',
            text: 'Cada partida de materia prima de riesgo se muestrea en recepción según el plan de muestreo de LIMS:',
            list: [
              'Muestra compuesta de al menos 10 puntos por partida.',
              'Muestra de 25 g analizada por el método de referencia ISO 6579-1.',
              'Contramuestra conservada 12 meses.'
            ]
          },
          {
            id: '3',
            heading: '3. Liberación condicionada',
            text: 'La partida se libera a producción con el certificado de análisis del proveedor conforme (liberación condicionada) y queda marcada en SAP QM hasta que el análisis propio de Salmonella en LIMS confirme el resultado, en un máximo de 5 días hábiles.'
          },
          {
            id: '4',
            heading: '4. Actuación ante un positivo',
            text: 'Un resultado positivo de Salmonella bloquea de inmediato la partida y todos los lotes de producto elaborados con ella. El Responsable de calidad y seguridad alimentaria decide el destino de la partida: destruir o devolver al proveedor. Se localiza el producto ya expedido y se activa PR-CAL-007 en un máximo de 2 h.'
          }
        ]
      },
      'PR-CAL-007': {
        type: 'doc',
        kind: 'Procedimiento',
        code: 'PR-CAL-007',
        title: 'Retirada y trazabilidad de lotes',
        system: 'Procedimientos',
        sections: [
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: 'Garantizar la trazabilidad de cada lote de materia prima y de premezcla y definir la retirada de producto no seguro, conforme al Reglamento (CE) 178/2002 (arts. 18 y 19).'
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
            text: 'La traza completa de un lote (materia prima, lotes de premezcla, expediciones y clientes) debe obtenerse en un máximo de 4 h desde la decisión de retirada. Se informa a la autoridad competente y a los clientes afectados en un máximo de 4 h desde la decisión.'
          },
          {
            id: '4',
            heading: '4. Actuación ante un producto no seguro',
            text: 'Se bloquea el lote de origen y los lotes derivados en SAP QM y en el MES, se retienen las expediciones pendientes y se localizan las ya entregadas. Si el producto ha llegado al mercado, el Responsable de calidad y seguridad alimentaria notifica a la autoridad competente según el art. 19 del Reglamento (CE) 178/2002 y aprueba el aviso a los clientes. Los pasos y el contenido de la notificación se detallan según PR-CAL-010 (Gestión de crisis y comunicación con la autoridad competente).'
          },
          {
            id: '5',
            heading: '5. Aviso a clientes',
            text: 'Atención al cliente y Norel Solutions contactan con cada cliente por teléfono y correo con la lista de lotes y albaranes, y registran el acuse en Salesforce CRM.'
          },
          {
            id: '6',
            heading: '6. Balance de masas',
            text: 'Cada retirada cierra con un balance de masas: cantidad del lote de origen = stock bloqueado + producto expedido + producto consumido o destruido. Un balance que no cuadra se investiga antes de cerrar la campaña.'
          }
        ]
      },
      'PR-PRO-003': {
        type: 'doc',
        kind: 'Procedimiento',
        code: 'PR-PRO-003',
        title: 'Control de contaminación cruzada y limpieza de líneas',
        system: 'Procedimientos',
        sections: [
          {
            id: '2',
            heading: '2. Secuencia de producción',
            text: 'La planificación ordena las fabricaciones de menor a mayor riesgo. Los productos con aditivos de contenido máximo regulado se fabrican al final de la secuencia y van seguidos de una limpieza.'
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
            text: 'El arrastre máximo admitido entre productos es del 0,5 % y se comprueba cada trimestre con un ensayo de trazador en cada línea. Un arrastre superior al límite bloquea la línea hasta repetir la limpieza y superar de nuevo el ensayo.'
          },
          {
            id: '5',
            heading: '5. Gestión de alérgenos',
            text: 'Las materias primas con alérgenos declarables se identifican en SAP S/4HANA y se almacenan separadas. Los productos con alérgenos se fabrican en una secuencia definida y el cambio al producto siguiente exige limpieza validada.'
          }
        ]
      },
      'PR-REG-002': {
        type: 'doc',
        kind: 'Procedimiento',
        code: 'PR-REG-002',
        title: 'Etiquetado y declaración de aditivos (Reglamento (CE) 1831/2003)',
        system: 'Procedimientos',
        sections: [
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
            text: 'Antes de la primera compra de una sustancia, Asuntos regulatorios verifica el número de registro REACH del proveedor o del fabricante y lo guarda en SAP S/4HANA. Una sustancia sin registro REACH vigente no se adquiere.'
          }
        ]
      },
      'PR-LAB-005': {
        type: 'doc',
        kind: 'Procedimiento',
        code: 'PR-LAB-005',
        title: 'Verificación de contenidos (vitaminas y oligoelementos)',
        system: 'Procedimientos',
        sections: [
          {
            id: '2',
            heading: '2. Muestreo y análisis',
            text: 'Se analiza una muestra de cada lote de premezcla antes de su liberación. Se verifican por método validado las vitaminas liposolubles A, D3 y E y los oligoelementos Cu, Zn, Mn, Fe y Se.'
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
            text: 'Un resultado fuera de tolerancia bloquea el lote en SAP QM y obliga a repetir el análisis en duplicado con la contramuestra. Si se confirma, el Responsable de calidad y seguridad alimentaria decide el destino del lote y se abre un informe 8D.'
          }
        ]
      },
      'PR-EXP-002': {
        type: 'doc',
        kind: 'Procedimiento',
        code: 'PR-EXP-002',
        title: 'Exportación y documentación sanitaria',
        system: 'Procedimientos',
        sections: [
          {
            id: '4',
            heading: '4. Retirada de un envío exportado',
            text: 'Si un lote exportado debe retirarse, Logística y exportación localiza el envío y el Responsable de calidad y seguridad alimentaria informa a la autoridad competente del país de destino a través del importador.'
          }
        ]
      },
      'CERT-GMP': {
        type: 'doc',
        kind: 'Certificado',
        code: 'CERT-GMP-B2',
        title: 'Certificado GMP+ B2 · Producción de aditivos y premezclas',
        system: 'Procedimientos',
        org: 'Entidad de certificación (ficticia) · certificado n.º DEMO-GMP-0412',
        date: '2025-05-15',
        sections: [
          {
            id: 'alc',
            heading: 'Alcance',
            text: 'Producción, comercialización y almacenamiento de premezclas y aditivos para alimentación animal (GMP+ B2). Centro: Planta de premezclas (España).'
          },
          {
            id: 'vig',
            heading: 'Vigencia',
            text: 'Emitido el 15/05/2025; válido hasta el 14/05/2027. Auditoría de seguimiento de 2026 superada sin no conformidades mayores.'
          }
        ]
      },
      'CERT-FAMI': {
        type: 'doc',
        kind: 'Certificado',
        code: 'FAMI-QS',
        title: 'Certificado FAMI-QS · Aditivos y premezclas',
        system: 'Procedimientos',
        org: 'Entidad de certificación (ficticia) · certificado n.º DEMO-FQS-0087',
        sections: [
          {
            id: 'alc',
            heading: 'Alcance',
            text: 'Operador de aditivos y premezclas para alimentación animal, según el Código FAMI-QS. Centro: Planta de premezclas (España).'
          },
          { id: 'nota', heading: 'Nota de indexación', text: 'La ficha indexada no indica la fecha de caducidad del certificado.' }
        ]
      },
      'SP-REG': {
        type: 'record',
        kind: 'Expediente regulatorio',
        code: 'REG-183',
        title: 'Autorización del establecimiento · Reglamento (CE) 183/2005',
        system: 'SharePoint',
        org: 'SharePoint · expediente regulatorio de la planta',
        sections: [
          {
            id: 'aut',
            heading: 'Autorización',
            text: 'Establecimiento autorizado para la fabricación de aditivos y premezclas conforme al Reglamento (CE) 183/2005, con el n.º de autorización ficticio DEMO-183-0007.'
          }
        ]
      },
      'MEM-2025': {
        type: 'doc',
        kind: 'Informe anual',
        code: null,
        label: 'Informe 2025',
        title: 'Informe de Sostenibilidad 2025',
        system: 'Procedimientos',
        org: 'Norel Nutrición Animal · publicado el 30/06/2026 (datos sintéticos)',
        sections: [
          {
            id: 'aud',
            heading: 'Auditorías e inspecciones',
            text: 'Auditorías de clientes, de certificación e inspecciones oficiales en 2025: 17 (24 jornadas), sin sanciones.'
          },
          { id: 'ene', heading: 'Energía', text: 'Consumo eléctrico 2025: 6.480 MWh, el 41 % de origen renovable con garantía de origen.' }
        ]
      },
      'LIMS-SAL': {
        type: 'record',
        kind: 'Resultados de laboratorio',
        code: 'Salmonella 2026',
        title: 'Salmonella en materias primas · resultados de 2026',
        system: 'LIMS',
        org: 'LIMS · resultados de ensayo',
        sections: [{ id: 'res', heading: 'Resultados', text: 'Salmonella en materias primas de riesgo hasta el 27/10/2026: 428 análisis, 0 positivos.' }]
      },
      'LIMS-VER': {
        type: 'record',
        kind: 'Resultados de laboratorio',
        code: 'Contenidos 2026',
        title: 'Verificación de contenidos de premezclas · resultados de 2026',
        system: 'LIMS',
        org: 'LIMS · verificación de lotes',
        sections: [
          {
            id: 'res',
            heading: 'Resultados',
            text: 'Verificación de contenidos hasta el 27/10/2026: 271 lotes de premezcla analizados, 268 conformes y 3 con desviación investigada y cerrada con acción correctora.'
          }
        ]
      },
      'MES-LIM': {
        type: 'record',
        kind: 'Registro de limpiezas',
        code: 'Limpiezas',
        title: 'Cambios de producto y limpiezas validadas',
        system: 'MES de planta',
        org: 'MES de planta · limpiezas de línea',
        sections: [{ id: 'cam', heading: 'Últimas 12 semanas', text: 'Cambios de producto en las últimas 12 semanas: 312, todos con limpieza validada.' }]
      },
      'SAP-LOT': {
        type: 'record',
        kind: 'Ficha de lote',
        code: 'PRM-2610-0402',
        title: 'Lote PRM-2610-0402 · materias primas y fabricación',
        system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · ficha de lote',
        sections: [
          {
            id: 'origen',
            heading: 'Origen y fabricación',
            text: 'Premezcla de vitaminas y oligoelementos para broilers fabricada el 12/10/2026 con las materias primas MP-2610-VE-041 (vitamina E) y MP-2610-OE-071 (oligoelementos); verificación de contenidos conforme'
          }
        ]
      },
      'SAP-ALB': {
        type: 'record',
        kind: 'Traza hacia delante',
        code: 'PRM-2610-0402',
        title: 'Lote PRM-2610-0402 · expediciones y clientes',
        system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · albaranes de expedición',
        sections: [
          {
            id: 'fwd',
            heading: 'Expediciones',
            text: '1 cliente: Grupo Integrador Levante, 3 albaranes (80051231, 80051239 y 80051244) entre el 14/10 y el 19/10/2026'
          }
        ]
      },
      'SF-RCL': {
        type: 'record',
        kind: 'Registro de reclamaciones',
        code: 'Reclamaciones',
        title: 'Reclamaciones de cliente registradas',
        system: 'Salesforce CRM',
        org: 'Salesforce CRM · reclamaciones y casos',
        sections: [
          { id: 'pla', heading: 'Plazos', text: 'Plazos de gestión: acuse de recibo en 24 h e informe 8D en 10 días hábiles.' },
          {
            id: 'res',
            heading: 'Resumen de 2026',
            text: 'Reclamaciones de 2026 hasta el 27/10: 9 cerradas con causa raíz y acción correctora registradas; 1 abierta (CLM-2026-1028).'
          }
        ]
      }
    },
    questions: [
      {
        id: 'A1',
        ref: 'LEV-26 · A1',
        sec: 'A',
        topic: 'Certificaciones de seguridad de piensos',
        conf: 'media',
        qEs: 'Indique las certificaciones de seguridad de piensos del centro que suministra (GMP+ B2, FAMI-QS u otras), con alcance, entidad de certificación y fecha de caducidad.',
        es: 'La Planta de premezclas (España) está certificada en GMP+ B2 para la producción, comercialización y almacenamiento de premezclas y aditivos [1]; el certificado es válido hasta el 14/05/2027 y la auditoría de seguimiento de 2026 se superó sin no conformidades mayores [2]. También opera conforme al Código FAMI-QS [3]. Se adjuntarán las copias de los certificados vigentes, con la entidad de certificación y la fecha de caducidad de cada uno.',
        cites: [
          { src: 'CERT-GMP', q: 'Producción, comercialización y almacenamiento de premezclas y aditivos para alimentación animal (GMP+ B2)' },
          { src: 'CERT-GMP', q: 'válido hasta el 14/05/2027. Auditoría de seguimiento de 2026 superada sin no conformidades mayores' },
          { src: 'CERT-FAMI', q: 'Operador de aditivos y premezclas para alimentación animal, según el Código FAMI-QS' }
        ],
        gap: 'La fecha de caducidad del certificado FAMI-QS y la entidad de certificación de cada certificado no aparecen en las fuentes indexadas. Adjunta los certificados vigentes antes de enviar.'
      },
      {
        id: 'A2',
        ref: 'LEV-26 · A2',
        sec: 'A',
        topic: 'Autorización conforme al Reglamento (CE) 183/2005',
        conf: 'alta',
        qEs: 'Indique el número de autorización o registro del establecimiento conforme al Reglamento (CE) 183/2005 (higiene de piensos) y cómo se vincula con el sistema APPCC.',
        es: 'El establecimiento está autorizado para la fabricación de aditivos y premezclas conforme al Reglamento (CE) 183/2005, con el n.º de autorización DEMO-183-0007 [1]. Su plan APPCC se define conforme a ese reglamento y al esquema GMP+ B2 [2], y el número de autorización figura en la etiqueta de cada producto [3].',
        cites: [
          {
            src: 'SP-REG',
            q: 'Establecimiento autorizado para la fabricación de aditivos y premezclas conforme al Reglamento (CE) 183/2005, con el n.º de autorización ficticio DEMO-183-0007'
          },
          { src: 'PR-CAL-001', q: 'conforme al Reglamento (CE) 183/2005 (higiene de piensos) y al esquema GMP+ B2' },
          {
            src: 'PR-REG-002',
            q: 'Nombre y dirección del operador responsable y número de registro o autorización de la planta (Reglamento (CE) 183/2005).'
          }
        ]
      },
      {
        id: 'A3',
        ref: 'LEV-26 · A3',
        sec: 'A',
        topic: 'Auditorías del último año',
        conf: 'alta',
        qEs: '¿Cuántas auditorías (de clientes, de certificación y oficiales) recibió la empresa el último año y hubo sanciones o actuaciones de la autoridad?',
        es: 'En 2025 Norel recibió 17 auditorías de clientes, de certificación e inspecciones oficiales, con un total de 24 jornadas y sin sanciones [1].',
        cites: [{ src: 'MEM-2025', q: 'Auditorías de clientes, de certificación e inspecciones oficiales en 2025: 17 (24 jornadas), sin sanciones' }],
        note: {
          tone: 'brand',
          icon: 'info',
          title: 'Dato de empresa',
          text: 'El informe publica la cifra de toda la empresa, sin desglose por centro. Si el cliente la pide solo para la planta de premezclas, la completa Calidad.'
        }
      },
      {
        id: 'B1',
        ref: 'LEV-26 · B1',
        sec: 'B',
        topic: 'Plan APPCC de fabricación',
        conf: 'alta',
        qEs: 'Describa el plan APPCC de la fabricación de premezclas: puntos críticos de control, equipo, verificación y revisión.',
        es: 'El plan APPCC define cuatro puntos críticos de control: recepción de materias primas, con análisis de Salmonella y verificación del certificado de análisis antes de liberar el lote [1]; dosificación de microingredientes; mezcla homogénea, con ensayo de homogeneidad y coeficiente de variación inferior al 5 % [2]; y contaminación cruzada. El equipo APPCC reúne a Calidad, Planta, Laboratorio y Norel Solutions [3]. Calidad verifica los registros de los PCC cada semana [4] y el plan se audita una vez al año [5].',
        cites: [
          {
            src: 'PR-CAL-001',
            q: 'PCC 1 · Recepción de materias primas: análisis de Salmonella y verificación del certificado de análisis antes de liberar el lote'
          },
          { src: 'PR-CAL-001', q: 'PCC 3 · Mezcla homogénea: ensayo de homogeneidad con coeficiente de variación inferior al 5 %' },
          { src: 'PR-CAL-001', q: 'Participan: Jefe de planta, Jefe de laboratorio y Norel Solutions (asesoramiento técnico).' },
          { src: 'PR-CAL-001', q: 'Verificación semanal de registros de PCC por Calidad.' },
          { src: 'PR-CAL-001', q: 'Auditoría interna del plan APPCC una vez al año.' }
        ]
      },
      {
        id: 'B2',
        ref: 'LEV-26 · B2',
        sec: 'B',
        topic: 'Control de Salmonella en materias primas',
        conf: 'alta',
        qEs: 'Describa el control de Salmonella en las materias primas: muestreo, método analítico, liberación y actuación ante un positivo, con los resultados del último año.',
        es: 'Cada partida de materia prima de riesgo se muestrea en recepción según el plan de LIMS [1] y se analiza con el método de referencia ISO 6579-1 [2]. La partida se libera con el certificado de análisis del proveedor conforme y queda marcada en SAP hasta que el análisis propio confirma el resultado [3]. Un positivo bloquea de inmediato la partida y todos los lotes elaborados con ella [4]. En 2026, hasta el 27/10, se realizaron 428 análisis sin ningún positivo [5].',
        cites: [
          { src: 'PR-CAL-004', q: 'Cada partida de materia prima de riesgo se muestrea en recepción según el plan de muestreo de LIMS' },
          { src: 'PR-CAL-004', q: 'Muestra de 25 g analizada por el método de referencia ISO 6579-1.' },
          {
            src: 'PR-CAL-004',
            q: 'La partida se libera a producción con el certificado de análisis del proveedor conforme (liberación condicionada) y queda marcada en SAP QM hasta que el análisis propio de Salmonella en LIMS confirme el resultado'
          },
          { src: 'PR-CAL-004', q: 'bloquea de inmediato la partida y todos los lotes de producto elaborados con ella' },
          { src: 'LIMS-SAL', q: 'Salmonella en materias primas de riesgo hasta el 27/10/2026: 428 análisis, 0 positivos.' }
        ],
        note: {
          tone: 'warn',
          icon: 'thermometer',
          title: 'Positivo de hoy en una materia prima · MP-2610-CC-118',
          text: 'El ensayo LAB-2610-0933 de hoy (05:50) da positivo a Salmonella en colina cloruro 60 % lote MP-2610-CC-118. La respuesta describe el procedimiento y el histórico hasta el 27/10; Calidad decide si actualiza la cifra antes de enviar. Ningún albarán de Grupo Integrador Levante recibió producto de ese lote.',
          outcome: 'alarma',
          with: { approved: 'En la alarma del turno: {label}.', any: 'En la alarma del turno se ha rechazado la propuesta.' },
          without: 'La decisión sobre los lotes afectados se toma en la alarma del turno.',
          go: 'alarma',
          goLabel: 'Abrir la alarma'
        }
      },
      {
        id: 'B3',
        ref: 'LEV-26 · B3',
        sec: 'B',
        topic: 'Control de micotoxinas',
        conf: 'none',
        qEs: 'Describa el control de micotoxinas (aflatoxina B1, ocratoxina A, DON y zearalenona) en materias primas y producto terminado: plan analítico, límites y frecuencia.',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados recoge el plan analítico de micotoxinas, sus límites ni su frecuencia.',
          partial: [
            {
              src: 'PR-CAL-004',
              q: 'El control de micotoxinas se rige por el plan analítico de cada materia prima y no forma parte de este procedimiento.',
              why: 'Remite a un plan analítico de micotoxinas que no está entre los documentos indexados.'
            }
          ],
          missing: [
            'Plan analítico de micotoxinas por materia prima (parámetros y frecuencia)',
            'Límites de aceptación aplicados (Directiva 2002/32/CE sobre sustancias indeseables)',
            'Resultados de los análisis de 2025 y 2026'
          ]
        }
      },
      {
        id: 'B4',
        ref: 'LEV-26 · B4',
        sec: 'B',
        topic: 'Verificación de contenidos de vitaminas y oligoelementos',
        conf: 'alta',
        qEs: 'Explique cómo verifica que el contenido de vitaminas y oligoelementos de las premezclas coincide con lo declarado y qué ocurre si un lote queda fuera de tolerancia.',
        es: 'Cada lote de premezcla se analiza en laboratorio antes de su liberación, con método validado para vitaminas A, D3 y E y para oligoelementos [1]. El criterio es de ±15 % para vitaminas [2] y ±10 % para oligoelementos [3] respecto al contenido declarado. Un resultado fuera de tolerancia bloquea el lote y obliga a repetir el análisis en duplicado con la contramuestra [4]. En 2026, hasta el 27/10, se verificaron 271 lotes: 268 conformes y 3 con desviación investigada y cerrada con acción correctora [5].',
        cites: [
          { src: 'PR-LAB-005', q: 'Se analiza una muestra de cada lote de premezcla antes de su liberación.' },
          { src: 'PR-LAB-005', q: 'Vitaminas: ±15 % respecto al contenido declarado.' },
          { src: 'PR-LAB-005', q: 'Oligoelementos: ±10 % respecto al contenido declarado.' },
          {
            src: 'PR-LAB-005',
            q: 'Un resultado fuera de tolerancia bloquea el lote en SAP QM y obliga a repetir el análisis en duplicado con la contramuestra.'
          },
          { src: 'LIMS-VER', q: '271 lotes de premezcla analizados, 268 conformes y 3 con desviación investigada y cerrada con acción correctora' }
        ],
        note: {
          tone: 'warn',
          icon: 'link',
          title: 'Reclamación abierta sobre la verificación de contenidos · CLM-2026-1028',
          text: 'Otro cliente (Piensos Cuenca Mediterráneo, S.A.) reclama una vitamina E un 18 % inferior a la declarada en el lote PRM-2610-0388. No afecta a Grupo Integrador Levante ni a esta respuesta, pero conviene que Calidad la conozca antes de afirmar la eficacia de la verificación.',
          outcome: 'reclamacion',
          with: { any: 'Estado de la reclamación: {label}.' },
          go: 'reclamacion',
          goLabel: 'Abrir la reclamación'
        }
      },
      {
        id: 'C1',
        ref: 'LEV-26 · C1',
        sec: 'C',
        topic: 'Contaminación cruzada y limpieza de líneas',
        conf: 'alta',
        qEs: 'Describa cómo evita la contaminación cruzada entre productos en las líneas de fabricación: secuencia, limpieza, arrastre máximo y verificación.',
        es: 'Las fabricaciones se ordenan de menor a mayor riesgo [1], y los productos con aditivos de contenido máximo regulado se fabrican al final de la secuencia y van seguidos de una limpieza [2]. El 100 % de los cambios de producto lleva limpieza validada, registrada en el MES [3], con lote de arrastre tras los productos con aditivos de riesgo [4]. El arrastre máximo admitido es del 0,5 % y se comprueba cada trimestre con un ensayo de trazador en cada línea [5]. En las últimas 12 semanas hubo 312 cambios de producto, todos con limpieza validada [6].',
        cites: [
          { src: 'PR-PRO-003', q: 'La planificación ordena las fabricaciones de menor a mayor riesgo.' },
          {
            src: 'PR-PRO-003',
            q: 'Los productos con aditivos de contenido máximo regulado se fabrican al final de la secuencia y van seguidos de una limpieza.'
          },
          { src: 'PR-PRO-003', q: 'Limpieza validada del 100 % de los cambios de producto, registrada en el MES.' },
          { src: 'PR-PRO-003', q: 'Lote de arrastre con carrier inerte tras los productos con aditivos de riesgo' },
          {
            src: 'PR-PRO-003',
            q: 'El arrastre máximo admitido entre productos es del 0,5 % y se comprueba cada trimestre con un ensayo de trazador en cada línea.'
          },
          { src: 'MES-LIM', q: 'Cambios de producto en las últimas 12 semanas: 312, todos con limpieza validada.' }
        ]
      },
      {
        id: 'C2',
        ref: 'LEV-26 · C2',
        sec: 'C',
        topic: 'Gestión de alérgenos',
        conf: 'media',
        qEs: 'Describa la gestión de alérgenos en la planta: identificación, almacenamiento separado y control en el cambio de producto.',
        es: 'Las materias primas con alérgenos declarables se identifican en SAP S/4HANA y se almacenan separadas [1]. Los productos con alérgenos se fabrican en una secuencia definida y el cambio al producto siguiente exige limpieza validada [2].',
        cites: [
          { src: 'PR-PRO-003', q: 'Las materias primas con alérgenos declarables se identifican en SAP S/4HANA y se almacenan separadas.' },
          {
            src: 'PR-PRO-003',
            q: 'Los productos con alérgenos se fabrican en una secuencia definida y el cambio al producto siguiente exige limpieza validada.'
          }
        ],
        gap: 'El inventario de materias primas con alérgenos declarables y la evaluación de riesgo de alérgenos no están en las fuentes indexadas. Adjúntalos antes de enviar.'
      },
      {
        id: 'C3',
        ref: 'LEV-26 · C3',
        sec: 'C',
        topic: 'Libre de OMG',
        conf: 'none',
        qEs: 'Confirme si los productos suministrados están libres de OMG y cómo lo acredita (declaraciones de proveedor, análisis PCR y segregación).',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados contiene una declaración de libre de OMG de los proveedores ni análisis PCR.',
          context: 'Agentic Platform no afirma que un producto esté libre de OMG sin la documentación de proveedor que lo respalde.',
          partial: [
            {
              src: 'PR-REG-002',
              q: 'Comprobar que cada aditivo figura en el Registro de la UE de aditivos para alimentación animal y que el etiquetado coincide con su autorización.',
              why: 'Acredita la autorización del aditivo, no la ausencia de OMG.'
            }
          ],
          missing: [
            'Declaraciones de libre de OMG de los proveedores de materia prima',
            'Resultados de análisis PCR de OMG',
            'Procedimiento de segregación de materias primas libres de OMG'
          ]
        }
      },
      {
        id: 'D1',
        ref: 'LEV-26 · D1',
        sec: 'D',
        topic: 'Trazabilidad y simulacro de retirada',
        conf: 'media',
        qEs: 'Indique si puede trazar un lote hacia atrás hasta las materias primas y hacia delante hasta el cliente, el objetivo de tiempo de una traza completa y la fecha y el resultado del último simulacro de retirada.',
        es: 'Sí. Cada lote de premezcla enlaza en SAP S/4HANA con sus lotes de materia prima y proveedor [1], y cada albarán de expedición enlaza el lote con el cliente y el destino [2]. Por ejemplo, el lote PRM-2610-0402 se traza hacia atrás hasta las materias primas MP-2610-VE-041 y MP-2610-OE-071 [3] y hacia delante hasta 3 albaranes de Grupo Integrador Levante [4]. El objetivo es obtener la traza completa en un máximo de 4 h [5].',
        cites: [
          { src: 'PR-CAL-007', q: 'Hacia atrás: cada lote de premezcla enlaza en SAP S/4HANA con sus lotes de materia prima y proveedor.' },
          { src: 'PR-CAL-007', q: 'Hacia delante: cada albarán de expedición enlaza el lote con el cliente y el destino.' },
          { src: 'SAP-LOT', q: 'fabricada el 12/10/2026 con las materias primas MP-2610-VE-041 (vitamina E) y MP-2610-OE-071 (oligoelementos)' },
          { src: 'SAP-ALB', q: '1 cliente: Grupo Integrador Levante, 3 albaranes (80051231, 80051239 y 80051244) entre el 14/10 y el 19/10/2026' },
          { src: 'PR-CAL-007', q: 'debe obtenerse en un máximo de 4 h desde la decisión de retirada' }
        ],
        gap: 'La fecha y el resultado del último simulacro de retirada no están en las fuentes indexadas.',
        gapGo: 'retirada',
        gapGoLabel: 'Hacer un simulacro ahora',
        gapOutcome: 'retirada'
      },
      {
        id: 'D2',
        ref: 'LEV-26 · D2',
        sec: 'D',
        topic: 'Plan de retirada y notificación',
        conf: 'alta',
        qEs: 'Describa su plan de retirada de producto y cómo notifica a la autoridad competente y a los clientes.',
        es: 'La retirada se rige por un procedimiento documentado conforme al Reglamento (CE) 178/2002 [1]. Se bloquea el lote de origen y los lotes derivados en SAP QM y en el MES, se retienen las expediciones pendientes y se localizan las ya entregadas [2]. La autoridad competente y los clientes afectados se informan en un máximo de 4 h desde la decisión [3], y Atención al cliente y Norel Solutions contactan con cada cliente y registran el acuse en Salesforce CRM [4]. En los envíos a otros países se informa además a la autoridad del país de destino a través del importador [5]. Cada retirada cierra con un balance de masas [6].',
        cites: [
          { src: 'PR-CAL-007', q: 'conforme al Reglamento (CE) 178/2002 (arts. 18 y 19)' },
          {
            src: 'PR-CAL-007',
            q: 'Se bloquea el lote de origen y los lotes derivados en SAP QM y en el MES, se retienen las expediciones pendientes y se localizan las ya entregadas.'
          },
          { src: 'PR-CAL-007', q: 'Se informa a la autoridad competente y a los clientes afectados en un máximo de 4 h desde la decisión.' },
          {
            src: 'PR-CAL-007',
            q: 'Atención al cliente y Norel Solutions contactan con cada cliente por teléfono y correo con la lista de lotes y albaranes, y registran el acuse en Salesforce CRM.'
          },
          { src: 'PR-EXP-002', q: 'informa a la autoridad competente del país de destino a través del importador' },
          { src: 'PR-CAL-007', q: 'Cada retirada cierra con un balance de masas' }
        ],
        note: {
          tone: 'ok',
          icon: 'check-circle',
          title: 'Aplicado hoy',
          text: 'Este procedimiento se ha aplicado esta mañana en la alarma del turno:',
          outcome: 'alarma',
          requires: 'approved',
          with: { approved: '{label}.' }
        }
      },
      {
        id: 'D3',
        ref: 'LEV-26 · D3',
        sec: 'D',
        topic: 'Gestión de reclamaciones',
        conf: 'alta',
        qEs: 'Describa el proceso de gestión de reclamaciones de cliente, con los plazos de respuesta y el método de análisis de causa raíz.',
        es: 'Las reclamaciones se registran en Salesforce CRM con acuse de recibo en 24 h e informe 8D en 10 días hábiles [1]. En 2026, hasta el 27/10, se cerraron 9 reclamaciones, todas con su causa raíz y su acción correctora registradas [2].',
        cites: [
          { src: 'SF-RCL', q: 'Plazos de gestión: acuse de recibo en 24 h e informe 8D en 10 días hábiles.' },
          { src: 'SF-RCL', q: '9 cerradas con causa raíz y acción correctora registradas' }
        ]
      },
      {
        id: 'E1',
        ref: 'LEV-26 · E1',
        sec: 'E',
        topic: 'Registro REACH y autorización de aditivos',
        conf: 'alta',
        qEs: 'Confirme el registro REACH de las sustancias que suministra y la autorización de los aditivos conforme al Reglamento (CE) 1831/2003, incluido el etiquetado.',
        es: 'Antes de la primera compra de una sustancia, Asuntos regulatorios verifica el número de registro REACH del proveedor o del fabricante y lo guarda en SAP S/4HANA; una sustancia sin registro vigente no se adquiere [1]. Cada aditivo se comprueba contra el Registro de la UE de aditivos para alimentación animal y su etiquetado coincide con su autorización [2], con su función, número de identificación y contenido garantizado [3].',
        cites: [
          {
            src: 'PR-REG-002',
            q: 'Antes de la primera compra de una sustancia, Asuntos regulatorios verifica el número de registro REACH del proveedor o del fabricante y lo guarda en SAP S/4HANA. Una sustancia sin registro REACH vigente no se adquiere.'
          },
          {
            src: 'PR-REG-002',
            q: 'Comprobar que cada aditivo figura en el Registro de la UE de aditivos para alimentación animal y que el etiquetado coincide con su autorización.'
          },
          { src: 'PR-REG-002', q: 'Nombre y función del aditivo, número de identificación y contenido garantizado.' }
        ]
      },
      {
        id: 'E2',
        ref: 'LEV-26 · E2',
        sec: 'E',
        topic: 'Emisiones y política ESG de proveedores',
        conf: 'none',
        qEs: 'Aporte sus emisiones de gases de efecto invernadero de alcance 1, 2 y 3, sus objetivos de reducción y su política de compras responsables (ESG).',
        flag: {
          reason: 'Solo hay evidencia indirecta: el informe de sostenibilidad recoge el consumo eléctrico, pero ningún documento indexado contiene un inventario de emisiones ni una política ESG de proveedores.',
          partial: [
            {
              src: 'MEM-2025',
              q: 'Consumo eléctrico 2025: 6.480 MWh, el 41 % de origen renovable con garantía de origen.',
              why: 'Es un dato de energía, no un inventario de emisiones de alcance 1, 2 y 3.'
            }
          ],
          missing: [
            'Inventario de emisiones de alcance 1, 2 y 3 (GHG Protocol)',
            'Objetivos de reducción de emisiones y su validación',
            'Política de compras responsables y código de conducta de proveedores'
          ]
        }
      }
    ]
  }
});
