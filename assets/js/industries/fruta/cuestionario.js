/* Subtropicales Axarquía · cuestionario de auditoría de proveedor de fruta de Handelsgruppe Nordfrisch. Escenario de demostración con datos sintéticos (MFM). */
agenticPack('fruta', {
  cuestionario: {
    agent: 'Cuestionarios de cliente',
    lang: 'es',
    default_sel: 'B2',
    reviewer: 'Responsable de calidad y seguridad alimentaria',
    assignee: 'Responsable de calidad y seguridad alimentaria',
    assignee_short: 'Calidad y APPCC',
    team: 'Calidad',
    assign_due: '2026-11-24',
    responder: 'Subtropicales Axarquía (SAX, S.A.) · Centro de manipulado de la Axarquía (Málaga)',
    site: 'Centro de manipulado de la Axarquía (Málaga)',
    site_label: 'Centro',
    page_title: 'Auditoría de proveedor · Handelsgruppe Nordfrisch',
    report_title: 'Respuesta a cuestionario de auditoría de proveedor de fruta',
    ref_label: 'Referencia del cliente',
    scope_meta_label: 'Productos',
    discard_placeholder: 'Por ejemplo: esta pregunta se responde con el certificado adjunto',
    save_system: 'SAP S/4HANA',
    qn: {
      code: 'CUE-2026-063',
      title: 'Cuestionario de auditoría de proveedor de fruta 2026',
      customer: 'Handelsgruppe Nordfrisch',
      via: 'Compras y Calidad de Proveedores',
      received: '2026-11-16T09:40',
      due: '2026-11-27',
      file: 'Nordfrisch_Auditoria_proveedor_fruta_2026.xlsx',
      scope: 'aguacate y mango frescos y procesados (guacamole, salsas frescas y cold press) suministrados a las plataformas logísticas de Handelsgruppe Nordfrisch en Alemania',
      scope_short: 'Aguacate y mango frescos y procesados',
      scope_label: '2 familias de producto'
    },
    email: {
      mailbox: 'buzón de Calidad',
      headers: {
        From: 'Compras y Calidad de Proveedores, Handelsgruppe Nordfrisch <proveedores@nordfrisch.example>',
        To: 'Calidad, Subtropicales Axarquía <calidad@sax-demo.example>',
        Date: 'lun, 16 nov 2026 09:40 (hora de Madrid)',
        Subject: 'Auditoría de proveedor de fruta 2026 · cuestionario previo · respuesta antes del 27 de noviembre'
      },
      text: 'Buenos días:\n\nDentro de nuestro programa anual de homologación de proveedores, Handelsgruppe Nordfrisch os envía el cuestionario de auditoría de proveedor de fruta 2026, previo a la auditoría documental, para el aguacate y el mango, frescos y procesados, que suministráis a nuestras plataformas logísticas en Alemania.\n\nSon 15 preguntas en cinco bloques: sistemas de gestión y certificaciones, seguridad alimentaria, control de proceso, trazabilidad y retirada, y cumplimiento y sostenibilidad.\n\nPara cada respuesta indicad el procedimiento, registro o certificado que la respalda. Necesitamos el cuestionario completado antes del viernes 27 de noviembre de 2026.\n\nUn saludo,\n\nCompras y Calidad de Proveedores\nHandelsgruppe Nordfrisch',
      highlights: [
        {
          text: 'aguacate y el mango, frescos y procesados, que suministráis a nuestras plataformas logísticas en Alemania',
          label: 'Alcance',
          tone: 'brand'
        },
        { text: '15 preguntas', label: 'Preguntas', tone: 'brand' },
        { text: 'indicad el procedimiento, registro o certificado que la respalda', label: 'Requisito' },
        { text: 'viernes 27 de noviembre de 2026', label: 'Plazo' }
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
      value: 19,
      sub: 'Incluye inspecciones oficiales · 26 jornadas · Informe de Sostenibilidad 2025',
      icon: 'shield-check'
    },
    sources_sub: 'Procedimientos, certificados, registros e informe de sostenibilidad',
    identify_result: 'Handelsgruppe Nordfrisch vía Compras y Calidad de Proveedores · aguacate y mango frescos y procesados',
    search_scope: 'procedimientos de Calidad, certificados, registros de LIMS, WMS y trazabilidad de campo e informe de sostenibilidad',
    lookups: [
      {
        system: 'Trazabilidad de campo',
        action: 'Consulta el origen del lote de ejemplo (parcelas y agricultores)',
        result: 'AH-2611-118: aguacate Hass calibre 18 · 14 parcelas de 9 agricultores de la Axarquía',
        ms: 520
      },
      {
        system: 'LIMS',
        action: 'Revisa el plan de análisis multirresiduo de 2026',
        result: '612 análisis multirresiduo, 0 superaciones del LMR hasta el 19/11',
        ms: 480
      },
      {
        system: 'WMS',
        action: 'Lee el registro de temperaturas de las cámaras de maduración',
        result: '11 cámaras con registro continuo · CM-06 fuera de consigna desde las 03:40',
        ms: 410,
        tone: 'warn'
      },
      {
        system: 'SAP S/4HANA',
        action: 'Comprueba certificados, registro sanitario y procedimientos vigentes',
        result: 'IFS Food vigente hasta el 22/03/2027 · GLOBALG.A.P. sin fecha de caducidad en la ficha',
        ms: 300
      },
      {
        system: 'SAP S/4HANA',
        action: 'Busca reclamaciones abiertas y cerradas del centro',
        result: 'CLM-2026-1120 abierta (otro cliente): maduración dispar en PED-2026-44718',
        ms: 350,
        tone: 'warn'
      },
      {
        system: 'LIMS',
        action: 'Cruza los lotes de recepción con la alerta de hoy',
        result: 'MG-2611-KE-031: residuo por encima del LMR · 18 t del productor Agrícola La Vega 417',
        ms: 390,
        tone: 'warn'
      }
    ],
    compare: {
      people: '2-3: Calidad y seguridad alimentaria, Laboratorio y, según la pregunta, Recepción y campo o Maduración',
      systems: '6-8: correo, Excel del cliente, SAP, trazabilidad de campo, LIMS, WMS, carpeta de certificados y procedimientos',
      steps: 'Buscar la fuente de cada pregunta, copiar y adaptar respuestas de otros años, pedir datos a Laboratorio y a los jefes de área y montar el Excel',
      time: '4-6 h de trabajo de Calidad, repartidas en 3-4 días'
    },
    presenter: {
      before: [
        'Cada cadena de supermercados y cada plataforma de compras trae su cuestionario de proveedor. En 2025 SAX recibió 19 auditorías de clientes, de certificación e inspecciones: 26 jornadas. Es trabajo de fondo que se come horas de Calidad.',
        'Este llega de Handelsgruppe Nordfrisch: {total} preguntas sobre el aguacate y el mango que suministráis a sus plataformas en Alemania, con IFS Food, GLOBALG.A.P., GRASP, LMR, trazabilidad, retirada y ESG.',
        'Al pulsar, Agentic Platform busca en procedimientos, certificados e informe de sostenibilidad, y en los registros de SAP, trazabilidad de campo, LIMS y WMS, y redacta cada respuesta con su fuente.'
      ],
      during: [
        '{drafted} de {total} con borrador y cita; cada cita se comprueba contra el texto de la fuente. {flagged} quedan para Calidad: control de plagas, calidad del agua y emisiones. Sin documento que lo respalde, no se inventa nada.',
        'B2: además de responder, avisa de que hoy el LIMS ha detectado un residuo por encima del LMR en el mango Keitt MG-2611-KE-031 y de que la campaña de retirada RET-2026-1120 está abierta. Hoy eso depende de que alguien se acuerde.',
        'C2: avisa de que la cámara CM-06 está fuera de consigna desde las 03:40 antes de afirmar que la cadena de frío se cumple. El cuestionario no vive aislado del resto del centro.',
        'Nada sale sin aprobación: en bloque solo las de confianza alta; las de confianza media se revisan una a una.'
      ],
      next_during: 'Enseñar B2 (cita y aviso del LMR de hoy) y B3 (sin evidencia). Después "Aprobar las {alta} de confianza alta", aprobar {media_ids} una a una y "Asignar las {flagged} sin fuente a Calidad y APPCC".'
    },
    sources: {
      'PR-REC-001': {
        type: 'doc',
        kind: 'Procedimiento',
        code: 'PR-REC-001',
        title: 'Recepción y muestreo de fruta',
        system: 'Procedimientos',
        sections: [
          {
            id: '2',
            heading: '2. Recepción y muestreo',
            text: 'Cada partida se pesa y se registra con su lote de campo en Trazabilidad de campo:',
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
            text: 'Una partida no conforme se rechaza o se bloquea en SAP QM, y el Jefe de recepción y campo avisa al Responsable de calidad y seguridad alimentaria. Se rechaza la partida con más del 5 % de piezas con daños o podredumbre.'
          }
        ]
      },
      'PR-CAL-004': {
        type: 'doc',
        kind: 'Procedimiento',
        code: 'PR-CAL-004',
        title: 'LMR y análisis de residuos de plaguicidas',
        system: 'Procedimientos',
        sections: [
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: 'Controlar los residuos de plaguicidas de la fruta recibida frente a los límites máximos de residuos (LMR) del Reglamento (CE) 396/2005. No incluye el control del agua de riego y de proceso, que se rige por su propio plan.'
          },
          {
            id: '2',
            heading: '2. Muestreo',
            text: 'Cada partida se muestrea en recepción según el plan de muestreo de LIMS:',
            list: [
              'Muestra compuesta de al menos 12 piezas por partida.',
              'Análisis multirresiduo con cribado de más de 400 sustancias activas.',
              'Contramuestra congelada y conservada 6 meses.'
            ]
          },
          {
            id: '3',
            heading: '3. Liberación condicionada',
            text: 'La partida se libera a manipulado con el certificado del agricultor conforme (liberación condicionada) y queda marcada en SAP QM hasta que el análisis multirresiduo propio en LIMS confirme el resultado, en un máximo de 72 h.'
          },
          {
            id: '4',
            heading: '4. Actuación ante una superación del LMR',
            text: 'Un resultado por encima del LMR bloquea de inmediato la partida y todos los lotes de manipulado elaborados con ella. El Responsable de calidad y seguridad alimentaria decide el destino de la partida: destruir o devolver al agricultor. Se localiza el producto ya expedido y se activa PR-TRZ-003 en un máximo de 2 h.'
          }
        ]
      },
      'PR-MAD-002': {
        type: 'doc',
        kind: 'Procedimiento',
        code: 'PR-MAD-002',
        title: 'Maduración controlada (temperatura y etileno)',
        system: 'Procedimientos',
        sections: [
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
            text: 'La firmeza se mide con penetrómetro en una muestra de cada palé antes de expedir. El cliente recibe fruta dentro del rango de firmeza pactado para su pedido.'
          },
          {
            id: '4',
            heading: '4. Desviación de temperatura',
            text: 'Una desviación de más de 2 °C sobre la consigna durante más de 30 minutos activa una alarma y bloquea los lotes de la cámara en SAP QM. Se abre una orden de mantenimiento y los palés se trasladan a otra cámara en consigna. Calidad verifica la firmeza y el color de una muestra de cada palé, y el Responsable de calidad y seguridad alimentaria decide el destino del lote.'
          }
        ]
      },
      'PR-TRZ-003': {
        type: 'doc',
        kind: 'Procedimiento',
        code: 'PR-TRZ-003',
        title: 'Trazabilidad y retirada de lotes',
        system: 'Procedimientos',
        sections: [
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: 'Garantizar la trazabilidad de cada lote de fruta recibida y de manipulado y definir la retirada de producto no seguro, conforme al Reglamento (CE) 178/2002 (arts. 18 y 19).'
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
            text: 'La traza completa de un lote (recepción, lotes de manipulado, expediciones, clientes y pedidos online) debe obtenerse en un máximo de 4 h desde la decisión de retirada. Se informa a la autoridad competente y a los clientes afectados en un máximo de 4 h desde la decisión.'
          },
          {
            id: '4',
            heading: '4. Actuación ante un producto no seguro',
            text: 'Se bloquea el lote de origen y los lotes derivados en SAP QM y en el WMS, se retienen las expediciones y los pedidos pendientes y se localizan los ya entregados. Si el producto ha llegado al mercado, el Responsable de calidad y seguridad alimentaria notifica a la autoridad competente según el art. 19 del Reglamento (CE) 178/2002 y aprueba el aviso a los clientes. Los pasos y el contenido de la notificación se detallan según PR-CAL-010 (Gestión de crisis y comunicación con la autoridad competente).'
          },
          {
            id: '5',
            heading: '5. Aviso a clientes',
            text: 'Atención al cliente y Logística contactan con cada cliente por teléfono y correo con la lista de lotes y albaranes, y registran el acuse en SAP S/4HANA.'
          },
          {
            id: '6',
            heading: '6. Balance de masas',
            text: 'Cada retirada cierra con un balance de masas: cantidad del lote de origen = stock bloqueado + producto expedido + producto consumido o destruido. Un balance que no cuadra se investiga antes de cerrar la campaña.'
          }
        ]
      },
      'PR-PRO-005': {
        type: 'doc',
        kind: 'Procedimiento',
        code: 'PR-PRO-005',
        title: 'Procesado (guacamole y cold press) y APPCC',
        system: 'Procedimientos',
        sections: [
          {
            id: '1',
            heading: '1. Objeto y alcance',
            text: 'Definir el plan APPCC del procesado de guacamole, salsas frescas y cold press en el Centro de manipulado de la Axarquía (Málaga), conforme al Reglamento (CE) 852/2004 (higiene de los productos alimenticios) y al esquema IFS Food. Aplica al área de procesado. La expedición se rige por PR-EXP-004.'
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
            text: 'Las salsas con alérgenos declarables (por ejemplo, apio, mostaza o frutos de cáscara) se identifican en SAP S/4HANA y se elaboran en una secuencia definida. El cambio al producto siguiente exige limpieza validada, registrada en el registro de limpiezas del área.'
          }
        ]
      },
      'PR-ECO-002': {
        type: 'doc',
        kind: 'Procedimiento',
        code: 'PR-ECO-002',
        title: 'Pedidos de la tienda online y envíos',
        system: 'Procedimientos',
        sections: [
          {
            id: '4',
            heading: '4. Lote retenido o retirado',
            text: 'Ante un lote retenido o retirado, Atención al cliente avisa por correo a los clientes con pedidos de la tienda online y ofrece sustitución o reembolso.'
          }
        ]
      },
      'PR-EXP-004': {
        type: 'doc',
        kind: 'Procedimiento',
        code: 'PR-EXP-004',
        title: 'Exportación y documentación fitosanitaria',
        system: 'Procedimientos',
        sections: [
          {
            id: '4',
            heading: '4. Retirada de un envío exportado',
            text: 'Si un lote exportado debe retirarse, Expediciones y exportación localiza el envío y el Responsable de calidad y seguridad alimentaria informa a la autoridad competente del país de destino a través del importador.'
          }
        ]
      },
      'CERT-IFS': {
        type: 'doc',
        kind: 'Certificado',
        code: 'IFS Food',
        title: 'Certificado IFS Food · Manipulado y procesado de fruta',
        system: 'Procedimientos',
        org: 'Entidad de certificación (ficticia) · certificado n.º DEMO-IFS-0291',
        date: '2026-03-23',
        sections: [
          {
            id: 'alc',
            heading: 'Alcance',
            text: 'Manipulado, envasado y procesado (guacamole, salsas frescas y cold press) de aguacate y mango, y maduración controlada, conforme al esquema IFS Food. Centro: Centro de manipulado de la Axarquía (Málaga).'
          },
          {
            id: 'vig',
            heading: 'Vigencia',
            text: 'Emitido el 23/03/2026; válido hasta el 22/03/2027. Auditoría de recertificación de 2026 superada sin no conformidades mayores.'
          }
        ]
      },
      'CERT-GGAP': {
        type: 'doc',
        kind: 'Certificado',
        code: 'GLOBALG.A.P.',
        title: 'Certificado GLOBALG.A.P. · Producción de aguacate y mango (módulo GRASP)',
        system: 'Procedimientos',
        org: 'Entidad de certificación (ficticia) · certificado n.º DEMO-GGN-0158',
        sections: [
          {
            id: 'alc',
            heading: 'Alcance',
            text: 'Producción primaria de aguacate y mango de la red de agricultores de la Axarquía y la costa subtropical de Málaga y Granada, certificada como grupo de productores.'
          },
          {
            id: 'gra',
            heading: 'Módulo GRASP',
            text: 'Evaluación de prácticas sociales (GRASP): contratos, jornada, salarios y salud y seguridad de los trabajadores en las fincas del grupo, verificada en la auditoría anual.'
          },
          { id: 'nota', heading: 'Nota de indexación', text: 'La ficha indexada no indica la fecha de caducidad del certificado.' }
        ]
      },
      'SP-REG': {
        type: 'record',
        kind: 'Registro sanitario',
        code: 'RGSEAA',
        title: 'Registro sanitario del establecimiento · Reglamento (CE) 852/2004',
        system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · expediente regulatorio del centro',
        sections: [
          {
            id: 'reg',
            heading: 'Registro',
            text: 'Establecimiento inscrito en el registro sanitario de empresas alimentarias conforme al Reglamento (CE) 852/2004, con el n.º de registro ficticio DEMO-RGSEAA-0042.'
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
        org: 'Subtropicales Axarquía · publicado el 30/06/2026 (datos sintéticos)',
        sections: [
          {
            id: 'aud',
            heading: 'Auditorías e inspecciones',
            text: 'Auditorías de clientes, de certificación e inspecciones oficiales en 2025: 19 (26 jornadas), sin sanciones.'
          },
          {
            id: 'red',
            heading: 'Origen de la fruta',
            text: 'Red de más de 1.200 agricultores en la Axarquía y la costa subtropical de Málaga y Granada.'
          },
          { id: 'ene', heading: 'Energía', text: 'Consumo eléctrico 2025: 5.240 MWh, el 46 % de origen renovable con garantía de origen.' }
        ]
      },
      'LIMS-LMR': {
        type: 'record',
        kind: 'Resultados de laboratorio',
        code: 'Residuos 2026',
        title: 'Residuos de plaguicidas en fruta · resultados de 2026',
        system: 'LIMS',
        org: 'LIMS · resultados de ensayo',
        sections: [
          {
            id: 'res',
            heading: 'Resultados',
            text: 'Análisis multirresiduo en recepción hasta el 19/11/2026: 612 análisis, 0 superaciones del LMR.'
          }
        ]
      },
      'WMS-FRI': {
        type: 'record',
        kind: 'Registro de temperaturas',
        code: 'Cámaras',
        title: 'Cámaras de maduración y conservación · desviaciones de 2026',
        system: 'WMS',
        org: 'WMS · registro continuo de temperatura',
        sections: [
          {
            id: 'des',
            heading: 'Desviaciones de 2026',
            text: 'Cámaras de maduración y conservación hasta el 19/11/2026: 11 cámaras con registro continuo; 2 desviaciones de más de 2 °C durante más de 30 minutos en 2026, ambas con lotes bloqueados y firmeza verificada.'
          }
        ]
      },
      'TRZ-LOT': {
        type: 'record',
        kind: 'Ficha de lote',
        code: 'AH-2611-118',
        title: 'Lote AH-2611-118 · origen y recepción',
        system: 'Trazabilidad de campo',
        org: 'Trazabilidad de campo · ficha de lote',
        sections: [
          {
            id: 'origen',
            heading: 'Origen y recepción',
            text: 'Aguacate Hass calibre 18 recibido el 17/11/2026 de 14 parcelas de 9 agricultores de la Axarquía; análisis multirresiduo conforme'
          }
        ]
      },
      'SAP-ALB': {
        type: 'record',
        kind: 'Traza hacia delante',
        code: 'AH-2611-118',
        title: 'Lote AH-2611-118 · pedidos y clientes',
        system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · asignación de pedidos',
        sections: [
          {
            id: 'fwd',
            heading: 'Pedidos asignados',
            text: '9 palés (14 t) asignados a 3 pedidos de supermercados y a los pedidos de la tienda online de hoy, sin expediciones todavía'
          }
        ]
      },
      'SAP-RCL': {
        type: 'record',
        kind: 'Registro de reclamaciones',
        code: 'Reclamaciones',
        title: 'Reclamaciones de cliente registradas',
        system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · reclamaciones y casos',
        sections: [
          { id: 'pla', heading: 'Plazos', text: 'Plazos de gestión: acuse de recibo en 24 h e informe 8D en 10 días hábiles.' },
          {
            id: 'res',
            heading: 'Resumen de 2026',
            text: 'Reclamaciones de 2026 hasta el 19/11: 11 cerradas con causa raíz y acción correctora registradas; 1 abierta (CLM-2026-1120).'
          }
        ]
      }
    },
    questions: [
      {
        id: 'A1',
        ref: 'NDF-26 · A1',
        sec: 'A',
        topic: 'Certificaciones de seguridad alimentaria',
        conf: 'media',
        qEs: 'Indique las certificaciones de seguridad alimentaria del centro y de la producción primaria (IFS Food, GLOBALG.A.P. u otras), con alcance, entidad de certificación y fecha de caducidad.',
        es: 'El Centro de manipulado de la Axarquía (Málaga) está certificado en IFS Food para el manipulado, envasado y procesado de aguacate y mango [1]; el certificado es válido hasta el 22/03/2027 y la auditoría de recertificación de 2026 se superó sin no conformidades mayores [2]. La producción primaria de la red de agricultores está certificada en GLOBALG.A.P. [3]. Se adjuntarán las copias de los certificados vigentes, con la entidad de certificación y la fecha de caducidad de cada uno.',
        cites: [
          { src: 'CERT-IFS', q: 'Manipulado, envasado y procesado (guacamole, salsas frescas y cold press) de aguacate y mango' },
          { src: 'CERT-IFS', q: 'válido hasta el 22/03/2027. Auditoría de recertificación de 2026 superada sin no conformidades mayores' },
          {
            src: 'CERT-GGAP',
            q: 'Producción primaria de aguacate y mango de la red de agricultores de la Axarquía y la costa subtropical de Málaga y Granada'
          }
        ],
        gap: 'La fecha de caducidad del certificado GLOBALG.A.P. y la entidad de certificación de cada certificado no aparecen en las fuentes indexadas. Adjunta los certificados vigentes antes de enviar.'
      },
      {
        id: 'A2',
        ref: 'NDF-26 · A2',
        sec: 'A',
        topic: 'Registro sanitario conforme al Reglamento (CE) 852/2004',
        conf: 'alta',
        qEs: 'Indique el número de registro sanitario del establecimiento conforme al Reglamento (CE) 852/2004 y cómo se vincula con el sistema APPCC.',
        es: 'El establecimiento está inscrito en el registro sanitario de empresas alimentarias conforme al Reglamento (CE) 852/2004, con el n.º de registro DEMO-RGSEAA-0042 [1]. Su plan APPCC de procesado se define conforme a ese reglamento y al esquema IFS Food [2].',
        cites: [
          {
            src: 'SP-REG',
            q: 'Establecimiento inscrito en el registro sanitario de empresas alimentarias conforme al Reglamento (CE) 852/2004, con el n.º de registro ficticio DEMO-RGSEAA-0042'
          },
          { src: 'PR-PRO-005', q: 'conforme al Reglamento (CE) 852/2004 (higiene de los productos alimenticios) y al esquema IFS Food' }
        ]
      },
      {
        id: 'A3',
        ref: 'NDF-26 · A3',
        sec: 'A',
        topic: 'Auditorías del último año',
        conf: 'alta',
        qEs: '¿Cuántas auditorías (de clientes, de certificación y oficiales) recibió la empresa el último año y hubo sanciones o actuaciones de la autoridad?',
        es: 'En 2025 SAX recibió 19 auditorías de clientes, de certificación e inspecciones oficiales, con un total de 26 jornadas y sin sanciones [1].',
        cites: [
          {
            src: 'MEM-2025',
            q: 'Auditorías de clientes, de certificación e inspecciones oficiales en 2025: 19 (26 jornadas), sin sanciones'
          }
        ],
        note: {
          tone: 'brand',
          icon: 'info',
          title: 'Dato de empresa',
          text: 'El informe publica la cifra de toda la empresa, sin desglose por centro. Si el cliente la pide solo para el centro de manipulado, la completa Calidad.'
        }
      },
      {
        id: 'B1',
        ref: 'NDF-26 · B1',
        sec: 'B',
        topic: 'Plan APPCC del procesado',
        conf: 'alta',
        qEs: 'Describa el plan APPCC del procesado de guacamole, salsas frescas y cold press: puntos críticos de control, equipo, verificación y revisión.',
        es: 'El plan APPCC define cuatro puntos críticos de control: recepción y lavado de fruta, con comprobación del resultado multirresiduo antes del despulpado [1]; tratamiento de conservación, con registro de cada ciclo [2]; detección de cuerpos extraños, con detector de metales y rayos X verificados con patrones [3]; y cadena de frío. El equipo APPCC reúne a Calidad, Procesado, Laboratorio y Manipulado y envasado [4]. Calidad verifica los registros de los PCC cada semana [5] y el plan se audita una vez al año [6].',
        cites: [
          {
            src: 'PR-PRO-005',
            q: 'PCC 1 · Recepción y lavado de fruta: comprobación del resultado multirresiduo y lavado con agua potable antes del despulpado'
          },
          { src: 'PR-PRO-005', q: 'PCC 2 · Tratamiento de conservación: alta presión (HPP) o pasteurización, con registro de cada ciclo.' },
          {
            src: 'PR-PRO-005',
            q: 'PCC 3 · Detección de cuerpos extraños: detector de metales y rayos X verificados con patrones al inicio de cada turno.'
          },
          { src: 'PR-PRO-005', q: 'Participan: Responsable de procesado, Jefe de laboratorio y Jefe de manipulado y envasado.' },
          { src: 'PR-PRO-005', q: 'Verificación semanal de registros de PCC por Calidad.' },
          { src: 'PR-PRO-005', q: 'Auditoría interna del plan APPCC una vez al año.' }
        ]
      },
      {
        id: 'B2',
        ref: 'NDF-26 · B2',
        sec: 'B',
        topic: 'LMR y plan de análisis de residuos',
        conf: 'alta',
        qEs: 'Describa el control de residuos de plaguicidas en la fruta: muestreo, método analítico, liberación, actuación ante una superación del LMR y resultados del último año.',
        es: 'Cada partida se muestrea en recepción según el plan de LIMS [1] y se somete a un análisis multirresiduo frente a los límites máximos de residuos (LMR) del Reglamento (CE) 396/2005 [2]. La partida se libera a manipulado con el certificado del agricultor conforme y queda marcada en SAP hasta que el análisis propio confirma el resultado [3]. Una superación del LMR bloquea de inmediato la partida y todos los lotes de manipulado elaborados con ella [4]. En 2026, hasta el 19/11, se realizaron 612 análisis sin ninguna superación [5].',
        cites: [
          { src: 'PR-CAL-004', q: 'Cada partida se muestrea en recepción según el plan de muestreo de LIMS' },
          { src: 'PR-CAL-004', q: 'frente a los límites máximos de residuos (LMR) del Reglamento (CE) 396/2005' },
          {
            src: 'PR-CAL-004',
            q: 'La partida se libera a manipulado con el certificado del agricultor conforme (liberación condicionada) y queda marcada en SAP QM hasta que el análisis multirresiduo propio en LIMS confirme el resultado'
          },
          { src: 'PR-CAL-004', q: 'bloquea de inmediato la partida y todos los lotes de manipulado elaborados con ella' },
          { src: 'LIMS-LMR', q: 'Análisis multirresiduo en recepción hasta el 19/11/2026: 612 análisis, 0 superaciones del LMR.' }
        ],
        note: {
          tone: 'warn',
          icon: 'alert-triangle',
          title: 'Superación del LMR de hoy en un lote de recepción · MG-2611-KE-031',
          text: 'El informe LAB-2611-0871 de hoy da un residuo de plaguicida por encima del LMR en el mango Keitt MG-2611-KE-031 (18 t del productor Agrícola La Vega 417). La respuesta describe el procedimiento y el histórico hasta el 19/11; Calidad decide si actualiza la cifra antes de enviar. La campaña de retirada RET-2026-1120 está en curso y Calidad debe confirmar si algún pedido de Handelsgruppe Nordfrisch recibió producto de ese lote.',
          outcome: 'retirada',
          with: { approved: 'En la campaña de retirada: {label}.', any: 'En la campaña de retirada se ha rechazado la propuesta.' },
          without: 'La decisión sobre los lotes afectados se toma en la campaña de retirada.',
          go: 'retirada',
          goLabel: 'Abrir la campaña de retirada'
        }
      },
      {
        id: 'B3',
        ref: 'NDF-26 · B3',
        sec: 'B',
        topic: 'Control de plagas',
        conf: 'none',
        qEs: 'Describa el programa de control de plagas del centro: empresa de control, plano de trampas, frecuencia de inspección y registros.',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados recoge el programa de control de plagas del centro ni sus registros.',
          partial: [
            {
              src: 'PR-REC-001',
              q: 'Inspección visual de plagas y cuerpos extraños en el camión y en los palés a la llegada.',
              why: 'Es una inspección en recepción, no el programa de control de plagas del centro.'
            }
          ],
          missing: [
            'Contrato y procedimiento de la empresa de control de plagas',
            'Plano de trampas y frecuencia de inspección',
            'Registros de inspecciones y actuaciones de 2025 y 2026'
          ]
        }
      },
      {
        id: 'B4',
        ref: 'NDF-26 · B4',
        sec: 'B',
        topic: 'Gestión de alérgenos en el procesado',
        conf: 'media',
        qEs: 'Describa la gestión de alérgenos en el área de procesado: identificación, secuencia de elaboración y control en el cambio de producto.',
        es: 'Las salsas con alérgenos declarables se identifican en SAP S/4HANA y se elaboran en una secuencia definida [1]. El cambio al producto siguiente exige limpieza validada, registrada en el registro de limpiezas del área [2].',
        cites: [
          {
            src: 'PR-PRO-005',
            q: 'Las salsas con alérgenos declarables (por ejemplo, apio, mostaza o frutos de cáscara) se identifican en SAP S/4HANA y se elaboran en una secuencia definida.'
          },
          {
            src: 'PR-PRO-005',
            q: 'El cambio al producto siguiente exige limpieza validada, registrada en el registro de limpiezas del área.'
          }
        ],
        gap: 'El inventario de alérgenos por receta y la evaluación de riesgo de alérgenos no están en las fuentes indexadas. Adjúntalos antes de enviar.'
      },
      {
        id: 'C1',
        ref: 'NDF-26 · C1',
        sec: 'C',
        topic: 'Recepción y control de la fruta',
        conf: 'alta',
        qEs: 'Describa cómo se recibe y se controla la fruta a la llegada: registro de origen, muestreo y criterios de aceptación.',
        es: 'Cada partida se pesa y se registra con su lote de campo en Trazabilidad de campo [1], con la temperatura de pulpa medida en tres piezas por palé [2] y una muestra de 20 piezas para firmeza, materia seca o grados Brix y defectos [3]. La fruta se acepta con una temperatura de pulpa inferior a 20 °C [4] y una partida no conforme se rechaza o se bloquea en SAP QM [5].',
        cites: [
          { src: 'PR-REC-001', q: 'Cada partida se pesa y se registra con su lote de campo en Trazabilidad de campo' },
          { src: 'PR-REC-001', q: 'Medición de la temperatura de pulpa en tres piezas por palé.' },
          {
            src: 'PR-REC-001',
            q: 'Muestra de 20 piezas por partida para firmeza, materia seca (aguacate), grados Brix (mango) y defectos.'
          },
          { src: 'PR-REC-001', q: 'Temperatura de pulpa de la fruta a la llegada inferior a 20 °C.' },
          { src: 'PR-REC-001', q: 'Una partida no conforme se rechaza o se bloquea en SAP QM' }
        ]
      },
      {
        id: 'C2',
        ref: 'NDF-26 · C2',
        sec: 'C',
        topic: 'Maduración controlada y cadena de frío',
        conf: 'alta',
        qEs: 'Describa el control de la maduración y de la cadena de frío: consignas de temperatura y etileno, registro, desviaciones y verificación de firmeza.',
        es: 'La fruta se madura en cámaras con etileno a la temperatura y el tiempo de la curva de cada variedad [1], con registro continuo de la temperatura de cada cámara cada 5 minutos en el WMS [2]. La firmeza se mide con penetrómetro en una muestra de cada palé antes de expedir [3]. Una desviación de más de 2 °C sobre la consigna durante más de 30 minutos activa una alarma y bloquea los lotes de la cámara [4]. En 2026, hasta el 19/11, hubo 2 desviaciones de ese tipo, ambas con lotes bloqueados y firmeza verificada [5].',
        cites: [
          { src: 'PR-MAD-002', q: 'Maduración con etileno a la temperatura y el tiempo de la curva de cada variedad.' },
          { src: 'PR-MAD-002', q: 'Registro continuo de la temperatura de cada cámara cada 5 minutos en el WMS.' },
          { src: 'PR-MAD-002', q: 'La firmeza se mide con penetrómetro en una muestra de cada palé antes de expedir' },
          {
            src: 'PR-MAD-002',
            q: 'Una desviación de más de 2 °C sobre la consigna durante más de 30 minutos activa una alarma y bloquea los lotes de la cámara en SAP QM'
          },
          {
            src: 'WMS-FRI',
            q: '2 desviaciones de más de 2 °C durante más de 30 minutos en 2026, ambas con lotes bloqueados y firmeza verificada'
          }
        ],
        note: {
          tone: 'warn',
          icon: 'thermometer',
          title: 'Desviación de temperatura de hoy · cámara CM-06',
          text: 'La alarma ALM-FRIO-0612 (05:50) detecta la cámara de maduración CM-06 a 11,4 °C frente a la consigna de 6,0 °C desde las 03:40 (fallo de compresor), con 9 palés de aguacate Hass del lote AH-2611-118. La respuesta describe el procedimiento y el histórico hasta el 19/11; Calidad decide si lo menciona antes de enviar.',
          outcome: 'alarma',
          with: { approved: 'En la alarma del turno: {label}.', any: 'En la alarma del turno se ha rechazado la propuesta.' },
          without: 'La decisión sobre los lotes afectados se toma en la alarma del turno.',
          go: 'alarma',
          goLabel: 'Abrir la alarma'
        }
      },
      {
        id: 'C3',
        ref: 'NDF-26 · C3',
        sec: 'C',
        topic: 'Calidad del agua de riego y de proceso',
        conf: 'none',
        qEs: 'Aporte el control de la calidad del agua de riego y del agua de proceso: origen, análisis microbiológicos y frecuencia.',
        flag: {
          reason: 'Ninguno de los {doc_count} documentos indexados recoge el plan de análisis del agua de riego ni del agua de proceso.',
          context: 'Agentic Platform no afirma que el agua cumpla los criterios microbiológicos sin los análisis que lo respalden.',
          partial: [
            {
              src: 'PR-CAL-004',
              q: 'No incluye el control del agua de riego y de proceso, que se rige por su propio plan.',
              why: 'Remite a un plan del agua que no está entre los documentos indexados.'
            }
          ],
          missing: [
            'Plan de análisis del agua de riego y de proceso (parámetros y frecuencia)',
            'Origen del agua y tratamientos aplicados',
            'Resultados de los análisis de 2025 y 2026'
          ]
        }
      },
      {
        id: 'D1',
        ref: 'NDF-26 · D1',
        sec: 'D',
        topic: 'Trazabilidad y simulacro de retirada',
        conf: 'media',
        qEs: 'Indique si puede trazar un lote hacia atrás hasta la parcela y el agricultor y hacia delante hasta el cliente, el objetivo de tiempo de una traza completa y la fecha y el resultado del último simulacro de retirada.',
        es: 'Sí. Cada lote de manipulado enlaza en SAP S/4HANA con sus lotes de recepción, el agricultor y la parcela de Trazabilidad de campo [1], y cada albarán o pedido enlaza el lote con el cliente y el destino [2]. Por ejemplo, el lote AH-2611-118 se traza hacia atrás hasta 14 parcelas de 9 agricultores de la Axarquía [3] y hacia delante hasta 3 pedidos de supermercados y los pedidos de la tienda online [4]. El objetivo es obtener la traza completa en un máximo de 4 h [5].',
        cites: [
          {
            src: 'PR-TRZ-003',
            q: 'Hacia atrás: cada lote de manipulado enlaza en SAP S/4HANA con sus lotes de recepción, el agricultor y la parcela de Trazabilidad de campo.'
          },
          { src: 'PR-TRZ-003', q: 'Hacia delante: cada albarán o pedido enlaza el lote con el cliente y el destino' },
          { src: 'TRZ-LOT', q: 'recibido el 17/11/2026 de 14 parcelas de 9 agricultores de la Axarquía' },
          { src: 'SAP-ALB', q: 'asignados a 3 pedidos de supermercados y a los pedidos de la tienda online de hoy' },
          { src: 'PR-TRZ-003', q: 'debe obtenerse en un máximo de 4 h desde la decisión de retirada' }
        ],
        gap: 'La fecha y el resultado del último simulacro de retirada no están en las fuentes indexadas.',
        gapGo: 'retirada',
        gapGoLabel: 'Hacer un simulacro ahora',
        gapOutcome: 'retirada'
      },
      {
        id: 'D2',
        ref: 'NDF-26 · D2',
        sec: 'D',
        topic: 'Plan de retirada y notificación',
        conf: 'alta',
        qEs: 'Describa su plan de retirada de producto y cómo notifica a la autoridad competente, a los clientes y a los consumidores de la tienda online.',
        es: 'La retirada se rige por un procedimiento documentado conforme al Reglamento (CE) 178/2002 [1]. Se bloquea el lote de origen y los lotes derivados en SAP QM y en el WMS, se retienen las expediciones y los pedidos pendientes y se localizan los ya entregados [2]. La autoridad competente y los clientes afectados se informan en un máximo de 4 h desde la decisión [3], y Atención al cliente y Logística contactan con cada cliente y registran el acuse en SAP S/4HANA [4]. En los envíos a otros países se informa además a la autoridad del país de destino a través del importador [5]. Los clientes con pedidos de la tienda online reciben un aviso por correo y se les ofrece sustitución o reembolso [6]. Cada retirada cierra con un balance de masas [7].',
        cites: [
          { src: 'PR-TRZ-003', q: 'conforme al Reglamento (CE) 178/2002 (arts. 18 y 19)' },
          {
            src: 'PR-TRZ-003',
            q: 'Se bloquea el lote de origen y los lotes derivados en SAP QM y en el WMS, se retienen las expediciones y los pedidos pendientes y se localizan los ya entregados.'
          },
          { src: 'PR-TRZ-003', q: 'Se informa a la autoridad competente y a los clientes afectados en un máximo de 4 h desde la decisión.' },
          {
            src: 'PR-TRZ-003',
            q: 'Atención al cliente y Logística contactan con cada cliente por teléfono y correo con la lista de lotes y albaranes, y registran el acuse en SAP S/4HANA.'
          },
          { src: 'PR-EXP-004', q: 'informa a la autoridad competente del país de destino a través del importador' },
          {
            src: 'PR-ECO-002',
            q: 'Atención al cliente avisa por correo a los clientes con pedidos de la tienda online y ofrece sustitución o reembolso'
          },
          { src: 'PR-TRZ-003', q: 'Cada retirada cierra con un balance de masas' }
        ],
        note: {
          tone: 'ok',
          icon: 'check-circle',
          title: 'Aplicado hoy',
          text: 'Este procedimiento se ha aplicado hoy en la campaña de retirada:',
          outcome: 'retirada',
          requires: 'approved',
          with: { approved: '{label}.' }
        }
      },
      {
        id: 'D3',
        ref: 'NDF-26 · D3',
        sec: 'D',
        topic: 'Gestión de reclamaciones',
        conf: 'alta',
        qEs: 'Describa el proceso de gestión de reclamaciones de cliente, con los plazos de respuesta y el método de análisis de causa raíz.',
        es: 'Las reclamaciones se registran en SAP S/4HANA con acuse de recibo en 24 h e informe 8D en 10 días hábiles [1]. En 2026, hasta el 19/11, se cerraron 11 reclamaciones, todas con su causa raíz y su acción correctora registradas [2].',
        cites: [
          { src: 'SAP-RCL', q: 'Plazos de gestión: acuse de recibo en 24 h e informe 8D en 10 días hábiles.' },
          { src: 'SAP-RCL', q: '11 cerradas con causa raíz y acción correctora registradas' }
        ],
        note: {
          tone: 'warn',
          icon: 'link',
          title: 'Reclamación abierta por maduración dispar · CLM-2026-1120',
          text: 'Otro cliente (Supermercados Levante Fresh, S.A.) reclama que el 35 % de las piezas de aguacate ready to eat del pedido PED-2026-44718 (lote AH-2611-092) llega duro en 4 tiendas. No afecta a Handelsgruppe Nordfrisch ni a esta respuesta, pero conviene que Calidad la conozca antes de afirmar la eficacia del control de maduración.',
          outcome: 'reclamacion',
          with: { any: 'Estado de la reclamación: {label}.' },
          go: 'reclamacion',
          goLabel: 'Abrir la reclamación'
        }
      },
      {
        id: 'E1',
        ref: 'NDF-26 · E1',
        sec: 'E',
        topic: 'Prácticas sociales de los agricultores (GRASP)',
        conf: 'alta',
        qEs: 'Confirme cómo se evalúan las prácticas sociales de los agricultores (GRASP): alcance, frecuencia y cobertura de la red de proveedores.',
        es: 'La red está formada por más de 1.200 agricultores de la Axarquía y de la costa subtropical de Málaga y Granada [1]. Su producción primaria está certificada en GLOBALG.A.P. como grupo de productores [2], con el módulo GRASP de evaluación de prácticas sociales: contratos, jornada, salarios y salud y seguridad de los trabajadores, verificada en la auditoría anual [3].',
        cites: [
          { src: 'MEM-2025', q: 'Red de más de 1.200 agricultores en la Axarquía y la costa subtropical de Málaga y Granada.' },
          { src: 'CERT-GGAP', q: 'certificada como grupo de productores' },
          {
            src: 'CERT-GGAP',
            q: 'Evaluación de prácticas sociales (GRASP): contratos, jornada, salarios y salud y seguridad de los trabajadores en las fincas del grupo, verificada en la auditoría anual.'
          }
        ]
      },
      {
        id: 'E2',
        ref: 'NDF-26 · E2',
        sec: 'E',
        topic: 'Emisiones, huella hídrica y política ESG de proveedores',
        conf: 'none',
        qEs: 'Aporte sus emisiones de gases de efecto invernadero de alcance 1, 2 y 3, su huella hídrica, sus objetivos de reducción y su política de compras responsables (ESG).',
        flag: {
          reason: 'Solo hay evidencia indirecta: el informe de sostenibilidad recoge el consumo eléctrico, pero ningún documento indexado contiene un inventario de emisiones, una huella hídrica ni una política ESG de proveedores.',
          partial: [
            {
              src: 'MEM-2025',
              q: 'Consumo eléctrico 2025: 5.240 MWh, el 46 % de origen renovable con garantía de origen.',
              why: 'Es un dato de energía, no un inventario de emisiones de alcance 1, 2 y 3.'
            }
          ],
          missing: [
            'Inventario de emisiones de alcance 1, 2 y 3 (GHG Protocol)',
            'Huella hídrica y objetivos de reducción de emisiones y de consumo de agua',
            'Política de compras responsables y código de conducta de proveedores'
          ]
        }
      }
    ]
  }
});
