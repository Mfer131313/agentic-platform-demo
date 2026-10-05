/* Empresa de Congelados · consulta de procedimientos de Calidad con citas. Escenario de la demo de referencia con datos sintéticos (MFM). */
agenticPack('congelados', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedimientos',
    title: 'Preguntar a los procedimientos',
    agent: 'Procedimientos',
    system: 'Elara',
    source: 'Elara · documentos controlados de Calidad',
    indexed_at: '2026-09-29T06:00',
    doc_org: 'Empresa de Congelados · Calidad',
    ui: {
      page_title: 'Consulta de procedimientos de Calidad',
      intro_title: 'Pregunta sobre los procedimientos de Calidad de Fustiñana',
      intro_text: 'Cada frase de la respuesta cita el documento y el apartado de donde sale. Si ningún documento indexado lo recoge, la consulta lo indica y no responde.',
      placeholder: 'Escribe una pregunta sobre los procedimientos de Calidad',
      context_title: 'Aplicado a Fustiñana hoy',
      permission: 'Calidad · Fustiñana',
      asker_initials: 'RC',
      asker_role: 'Responsable de Calidad de turno',
      route_to: 'Calidad de planta'
    },
    report: { title: 'Consulta de procedimientos de Calidad', code_prefix: 'CON-PROC', filename: 'consulta-procedimientos', scope_label: 'Planta', scope: 'Fustiñana (FUS)' },
    presenter: {
      say: [
        'Consulta de los procedimientos de Calidad: la respuesta sale solo de los documentos controlados, y cada frase lleva su cita al documento y al apartado.',
        'Hay ocho documentos de Elara indexados: cadena de frío, bloqueo y liberación, reclamaciones y 8D, cuerpos extraños, Listeria, la instrucción de la despedregadora, una ficha técnica y la matriz de alérgenos. Aquí son sintéticos; en el piloto, los suyos vigentes.'
      ],
      say_empty: 'Sirve en auditorías IFS o BRCGS, para formar a turnos nuevos y para contestar a clientes con la referencia exacta.',
      say_answered: 'Al pulsar una cita se abre el documento con el pasaje exacto resaltado. Y la respuesta se cruza con lo que pasa hoy en planta: la alarma de C-07, la reclamación UKC-44718 o el detector DM-1.',
      say_none: 'Cuando no hay fuente lo dice y no inventa: ni respuesta ni cita. Si el tema está en un documento que no está indexado, lo nombra (PNT-CAL-018) y permite derivar la pregunta a Calidad.',
      next_empty: 'Pulsar «¿Qué hay que hacer si una cámara supera −18 °C?» y después la cita 1 para ver el pasaje resaltado.',
      next_answered: 'Escribir una pregunta sin fuente, por ejemplo «¿Cada cuánto hacemos el simulacro de retirada?», y pulsar «Preguntar».',
      next_done: 'Pasar a la siguiente escena con la flecha derecha.'
    },

    docs: [
      {
        code: 'PNT-CAL-012',
        title: 'Excursiones de temperatura en cámaras de producto congelado',
        short: 'Excursiones de temperatura',
        type: 'Procedimiento',
        version: '4',
        date: '2026-03-12',
        owner: 'Calidad de planta',
        summary: 'Temperatura de aire por encima de −18 °C durante más de 15 min: bloqueo de calidad de los palés expuestos y evaluación (temperatura de producto, análisis sensorial, decisión de destino). Por encima de −15 °C: excursión crítica.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Temperatura de aire por encima de −18 °C durante más de 15 min: bloqueo de calidad de los palés expuestos y evaluación (temperatura de producto, análisis sensorial, decisión de destino). Por encima de −15 °C: excursión crítica.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Definir cómo se detecta, evalúa y registra una excursión de temperatura en los almacenes de producto congelado de la planta de Fustiñana, para proteger la seguridad y la calidad del producto y la cadena de frío hasta el cliente.',
            'Aplica a los silos automáticos SIL-1 a SIL-4 (consigna −25 °C) y a las cámaras de expedición (consigna −22 °C). No aplica al transporte, que se rige por las condiciones pactadas con cada transportista.'
          ] },
          { id: '2', heading: '2. Definiciones', list: [
            'Temperatura de aire: lectura de la sonda de ambiente de cada cámara (por ejemplo, TT-C07-01), registrada en SCADA Galileo cada 5 min.',
            'Excursión: temperatura de aire por encima de −18 °C.',
            'Excursión crítica: temperatura de aire por encima de −15 °C.',
            'Palés expuestos: palés que Mecalux Easy WMS sitúa en la cámara entre el inicio y el fin de la excursión.'
          ] },
          { id: '3', heading: '3. Responsabilidades', list: [
            'Responsable de Calidad de turno: valora la excursión, aprueba el bloqueo y decide la evaluación del producto.',
            'Jefe de turno de expedición: retiene las cargas con palés expuestos hasta la decisión de Calidad.',
            'Mantenimiento frigorífico: restablece la temperatura, investiga la causa y registra la intervención.'
          ] },
          { id: '4', heading: '4. Criterio de bloqueo', text: [
            'Si la temperatura de aire supera −18 °C durante más de 15 min seguidos, se bloquean todos los palés expuestos (bloqueo de calidad según PNT-CAL-015) y no se expiden hasta completar la evaluación del punto 5.',
            'Si en algún momento supera −15 °C, la excursión es crítica: además del bloqueo, se abre una no conformidad en Elara y se informa al Responsable de Calidad de planta.',
            'Los palés del mismo lote que están en otras ubicaciones no se bloquean de forma automática: se marcan «a evaluar» y el Responsable de Calidad de turno decide su alcance a la vista de los resultados.',
            'Una excursión de 15 min o menos que no llega a −15 °C se registra sin bloqueo y se revisa en el informe semanal de cadena de frío.'
          ] },
          { id: '5', heading: '5. Evaluación del producto', text: [
            'Los palés expuestos se evalúan por lote antes de cualquier expedición. La liberación la decide el Responsable de Calidad según PNT-CAL-015, con los resultados registrados en Elara.'
          ], list: [
            'Medir la temperatura de producto con sonda en los palés expuestos (capa exterior y centro).',
            'Análisis sensorial y de aspecto (cristales de hielo, apelmazado) por lote.',
            'Decisión de destino por lote: liberar, reclasificar o destruir.'
          ] },
          { id: '6', heading: '6. Registro y comunicación', list: [
            'La alarma de SCADA Galileo abre el registro de la excursión: inicio, fin, pico y minutos por encima de −18 °C y de −15 °C.',
            'El bloqueo se registra en SAP QM y en Mecalux Easy WMS con la referencia de la alarma (PNT-CAL-015).',
            'Se avisa al Jefe de turno de expedición por Microsoft Teams para retener las cargas planificadas con palés expuestos.',
            'La causa y la acción correctiva se documentan en la no conformidad; las excursiones repetidas en una misma cámara se analizan en la revisión mensual de cadena de frío.'
          ] },
          { id: '7', heading: '7. Referencias', refs: true, list: [
            'PNT-CAL-015 · Bloqueo y liberación de producto (retención de calidad).',
            'Real Decreto 1109/1991, norma general de alimentos ultracongelados.',
            'IFS Food v8 · BRCGS Food Safety · FSSC 22000.'
          ] }
        ]
      },
      {
        code: 'PNT-CAL-015',
        title: 'Bloqueo y liberación de producto (retención de calidad)',
        short: 'Bloqueo y liberación',
        type: 'Procedimiento',
        version: '6',
        date: '2026-01-20',
        owner: 'Calidad de planta',
        summary: 'Todo bloqueo se registra en SAP QM (lote bloqueado) y en Easy WMS (palés inmovilizados, expediciones retenidas). Solo el Responsable de Calidad libera.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Todo bloqueo se registra en SAP QM (lote bloqueado) y en Easy WMS (palés inmovilizados, expediciones retenidas). Solo el Responsable de Calidad libera.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Asegurar que ningún producto con una desviación de calidad o de seguridad alimentaria sale de planta sin una decisión documentada de Calidad. Aplica a producto terminado, graneles (octavines) y materias primas en cualquier ubicación de Fustiñana.'
          ] },
          { id: '2', heading: '2. Responsabilidades', list: [
            'Cualquier responsable de turno puede proponer un bloqueo al detectar una desviación.',
            'El Responsable de Calidad de turno aprueba el bloqueo y define su alcance.',
            'Solo el Responsable de Calidad (de planta o, por delegación, de turno) puede liberar producto bloqueado.'
          ] },
          { id: '3', heading: '3. Registro del bloqueo', text: [
            'Todo bloqueo se registra a la vez en SAP QM (lote con bloqueo de calidad) y en Mecalux Easy WMS (palés inmovilizados y expediciones retenidas). Easy WMS no permite cargar un palé bloqueado.',
            'El registro incluye el motivo, el alcance (lotes, SSCC y ubicaciones), la referencia de origen (alarma, no conformidad o reclamación) y quién lo aprueba.'
          ] },
          { id: '4', heading: '4. Evaluación y decisión de empleo', text: [
            'La liberación exige evidencia documentada: resultados de la evaluación, análisis cuando procedan y conclusión firmada. La decisión de empleo se registra en SAP QM y puede ser liberar, reclasificar (industria o segunda calidad) o destruir.',
            'Ningún producto se libera por defecto ni por vencimiento de plazo.'
          ] },
          { id: '5', heading: '5. Liberación parcial', text: [
            'Un lote puede liberarse por palés (SSCC) cuando la evaluación permite separar los palés afectados de los que no lo están. Cada palé liberado queda identificado en SAP QM y en Easy WMS.'
          ] },
          { id: '6', heading: '6. Producto ya expedido', text: [
            'Si parte del lote ya se ha expedido, el Responsable de Calidad de planta valora la retirada o recuperación según PNT-CAL-018 (Trazabilidad y retirada de producto) e informa al cliente en el plazo que marque ese procedimiento.'
          ] },
          { id: '7', heading: '7. Registros', list: [
            'Bloqueos y decisiones de empleo: SAP QM.',
            'Palés inmovilizados y expediciones retenidas: Mecalux Easy WMS.',
            'Evidencias de la evaluación: Elara.'
          ] }
        ]
      },
      {
        code: 'PNT-CAL-020',
        title: 'Gestión de reclamaciones de cliente e informe 8D',
        short: 'Reclamaciones e informe 8D',
        type: 'Procedimiento',
        version: '5',
        date: '2025-12-15',
        owner: 'Calidad de planta',
        summary: 'Acuse de recibo en 24 h, contención en 48 h e informe 8D en el plazo pactado con el cliente (por defecto, 5 días hábiles).',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Acuse de recibo en 24 h, contención en 48 h e informe 8D en el plazo pactado con el cliente (por defecto, 5 días hábiles).'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Gestionar las reclamaciones de clientes, y las de consumidores que llegan a través de ellos, hasta su cierre con un informe 8D. Incluye las recibidas por las filiales comerciales, como EC Foods UK en el Reino Unido.'
          ] },
          { id: '2', heading: '2. Plazos', list: [
            'Acuse de recibo al cliente: 24 h desde la recepción.',
            'Contención: 48 h para identificar y bloquear el stock del lote reclamado (PNT-CAL-015).',
            'Informe 8D: en el plazo pactado con el cliente; si no hay plazo pactado, 5 días hábiles.'
          ] },
          { id: '3', heading: '3. Clasificación', text: [
            'Gravedad alta: cuerpos extraños duros o cortantes de 7 mm o más, aunque no haya lesión; alérgenos no declarados; cualquier sospecha de riesgo microbiológico. Se informa en el día al Responsable de Calidad de planta.',
            'Gravedad media: defectos de calidad sin riesgo para la salud (aspecto, calibre, peso o envase).'
          ] },
          { id: '4', heading: '4. Investigación', text: [
            'La investigación de una reclamación por cuerpo extraño revisa, como mínimo:'
          ], list: [
            'Trazabilidad del lote hacia atrás (campo, recepción, línea y turno) y hacia delante (palés y expediciones).',
            'Registros de la línea en la fecha de fabricación: despedregadora, selectora óptica y detector de metales.',
            'Historial de mantenimiento de los equipos de control de cuerpos extraños de la línea, incluidas las órdenes abiertas.',
            'Reclamaciones similares de los últimos 12 meses en cualquier planta del grupo.'
          ] },
          { id: '5', heading: '5. Informe 8D', text: [
            'El informe 8D se prepara en Elara y sigue ocho pasos:'
          ], list: [
            'D1 · Equipo: Calidad de planta, Producción y Mantenimiento de línea.',
            'D2 · Descripción del problema con los datos del cliente.',
            'D3 · Contención: stock bloqueado y producto en poder del cliente.',
            'D4 · Causa raíz, confirmada con evidencia.',
            'D5 · Acciones correctivas.',
            'D6 · Implantación y verificación de la eficacia.',
            'D7 · Prevención: cambios en procedimientos, planes de mantenimiento o formación.',
            'D8 · Cierre y comunicación al cliente.'
          ] },
          { id: '6', heading: '6. Respuesta al cliente', text: [
            'La respuesta se redacta en el idioma del cliente y la aprueba el Responsable de Calidad de planta antes de enviarla.',
            'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.'
          ] },
          { id: '7', heading: '7. Historial de revisiones', text: [
            'Rev. 5 (15/12/2025): se añade la revisión del historial de mantenimiento de las despedregadoras en las reclamaciones por cuerpo extraño, como acción de la NC-2025-0388.'
          ] }
        ]
      },
      {
        code: 'PNT-CAL-031',
        title: 'Control de cuerpos extraños: despedregadoras, ópticas y detectores de metales',
        short: 'Control de cuerpos extraños',
        type: 'Procedimiento',
        version: '7',
        date: '2026-04-02',
        owner: 'Calidad de planta',
        summary: 'El detector de metales es un PCC: verificación con probetas cada 2 h. Si se supera, se retiene el producto envasado desde la última verificación correcta.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'El detector de metales es un PCC: verificación con probetas cada 2 h. Si se supera, se retiene el producto envasado desde la última verificación correcta.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Prevenir la presencia de cuerpos extraños (piedras, terrones, vidrio, metal y materia vegetal extraña) en el producto terminado. Aplica a las líneas L1 a L5 de Fustiñana.'
          ] },
          { id: '2', heading: '2. Barreras de control', text: [
            'Cada línea combina barreras sucesivas; ninguna sustituye a otra:'
          ], list: [
            'Limpiadora-aventadora: separa tierra, hojas y material ligero.',
            'Despedregadora: separa piedras y terrones por densidad; su malla se mantiene según IT-MAN-DP-02.',
            'Selectora óptica: rechaza piezas por color y forma después del túnel IQF.',
            'Detector de metales tras el envasado: es un punto de control crítico (PCC) del plan APPCC.'
          ] },
          { id: '3', heading: '3. Selectoras ópticas', text: [
            'Cada selectora tiene una tasa de rechazo de referencia por producto, fijada en MES Mapex (por ejemplo, 1,5 % en guisante).'
          ], list: [
            'Rechazo por encima del 2,5 %: el operador revisa la entrada de producto y las barreras anteriores, en especial la despedregadora.',
            'Rechazo por encima del 4 %: aviso inmediato a Calidad de turno y a Mantenimiento de línea, y muestreo reforzado de producto terminado.'
          ] },
          { id: '4', heading: '4. Detector de metales (PCC)', text: [
            'El detector de metales es un PCC. Se verifica con probetas certificadas de Fe 2,0 mm, no férrico 2,5 mm y acero inoxidable 3,0 mm al inicio del turno, cada 2 h y al final de la producción.',
            'Si una verificación falla o se superan las 2 h sin verificar, se retiene todo el producto envasado desde la última verificación correcta y se vuelve a pasar por el detector una vez corregido el equipo.',
            'El producto rechazado cae a un contenedor cerrado con llave; solo Calidad lo abre y registra su contenido.'
          ] },
          { id: '5', heading: '5. Registros', list: [
            'Verificaciones del detector: hoja de PCC en Elara, firmada por el operador y revisada por Calidad.',
            'Tasas de rechazo de las selectoras: MES Mapex, por turno.',
            'Inspecciones de mallas de despedregadora: GMAO (IT-MAN-DP-02).'
          ] },
          { id: '6', heading: '6. Referencias', refs: true, list: [
            'IT-MAN-DP-02 · Inspección y sustitución de mallas de despedregadora.',
            'Plan APPCC de la planta de Fustiñana.'
          ] }
        ]
      },
      {
        code: 'PNT-CAL-034',
        title: 'Control ambiental de Listeria monocytogenes',
        short: 'Control ambiental de Listeria',
        type: 'Procedimiento',
        version: '2',
        date: '2026-06-30',
        owner: 'Calidad de planta',
        summary: 'Muestreo ambiental por zonas después del escaldado; la zona 1 se muestrea cada semana en cada línea. Un positivo en zona 1 retiene el producto desde la última limpieza verificada y exige tres muestreos negativos para volver a la frecuencia normal.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Muestreo ambiental por zonas después del escaldado; la zona 1 se muestrea cada semana en cada línea. Un positivo en zona 1 retiene el producto desde la última limpieza verificada y exige tres muestreos negativos para volver a la frecuencia normal.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Detectar a tiempo la presencia de Listeria en el entorno de fabricación y evitar que llegue al producto. Aplica a las zonas posteriores al escaldado de las líneas L1 a L5 de Fustiñana: túneles IQF, selectoras ópticas, envasado y salas anexas.'
          ] },
          { id: '2', heading: '2. Zonas de muestreo', list: [
            'Zona 1: superficies en contacto con el producto después del escaldado (cintas, túnel IQF, selectora óptica, tolvas y básculas de envasado).',
            'Zona 2: superficies próximas sin contacto con el producto (bastidores, carcasas y cuadros de mando).',
            'Zona 3: resto de la sala de proceso (suelos, desagües, paredes y techos).',
            'Zona 4: áreas fuera de producción (vestuarios, pasillos y almacén de envases).'
          ] },
          { id: '3', heading: '3. Frecuencias', text: [
            'Frecuencias mínimas de muestreo ambiental:'
          ], list: [
            'Zona 1: semanal en cada línea, con la línea en producción.',
            'Zona 2: semanal.',
            'Zona 3: cada dos semanas, con prioridad en desagües y puntos con agua estancada.',
            'Zona 4: mensual.'
          ] },
          { id: '4', heading: '4. Muestreos adicionales', text: [
            'Además de las frecuencias mínimas, se muestrea después de obras, de averías que obliguen a abrir equipos de la zona 1 y de cada limpieza en profundidad de fin de campaña.'
          ] },
          { id: '5', heading: '5. Actuación ante un resultado positivo', text: [
            'Positivo de Listeria spp. en zona 1: se retiene el producto fabricado en esa línea desde la última limpieza verificada hasta conocer el resultado de Listeria monocytogenes, se limpia y desinfecta en profundidad y se toman muestras alrededor del punto positivo.',
            'La línea vuelve a la frecuencia normal tras tres muestreos consecutivos negativos en ese punto.',
            'Positivo en zonas 2 o 3: limpieza reforzada y nuevo muestreo en 24 a 48 h; si se repite, se investiga la causa con Mantenimiento de línea.',
            'Todo positivo se comunica en el día al Responsable de Calidad de planta y se registra en Elara.'
          ] },
          { id: '6', heading: '6. Producto terminado', text: [
            'El producto terminado se analiza según el plan analítico anual. Los resultados de Listeria monocytogenes se valoran según el Reglamento (CE) 2073/2005, modificado por el Reglamento (UE) 2024/2895, aplicable desde el 01/07/2026.'
          ] },
          { id: '7', heading: '7. Historial de revisiones', refs: true, text: [
            'Rev. 2 (30/06/2026): actualización por el Reglamento (UE) 2024/2895.'
          ] }
        ]
      },
      {
        code: 'IT-MAN-DP-02',
        title: 'Inspección y sustitución de mallas de despedregadora',
        short: 'Mallas de despedregadora',
        type: 'Instrucción técnica',
        version: '3',
        date: '2025-12-10',
        owner: 'Mantenimiento de línea',
        summary: 'Inspección semanal de la malla; si hay desgaste, sustitución programada e inspección reforzada hasta cambiarla.',
        sections: [
          { id: 'R', heading: 'Resumen', text: [
            'Inspección semanal de la malla; si hay desgaste, sustitución programada e inspección reforzada hasta cambiarla.'
          ] },
          { id: '1', heading: '1. Objeto y alcance', text: [
            'Mantener la eficacia de separación de las despedregadoras. Aplica a las despedregadoras de todas las plantas del grupo; en Fustiñana, a DP-2 (línea L2, guisante y judía verde).'
          ] },
          { id: '2', heading: '2. Inspección semanal', text: [
            'Una vez por semana, con la línea parada y consignada, Mantenimiento de línea inspecciona la malla y registra el resultado en la GMAO:'
          ], list: [
            'Roturas, deformaciones y holgura del marco.',
            'Desgaste de la luz de malla, medido con galga en cinco puntos.',
            'Estado de las juntas y del sistema de expulsión de piedras.'
          ] },
          { id: '3', heading: '3. Criterio de desgaste', text: [
            'Hay desgaste cuando la luz de malla supera en más de un 10 % la nominal en cualquier punto medido, o cuando hay roturas o deformaciones.'
          ] },
          { id: '4', heading: '4. Actuación con desgaste', text: [
            'Se abre una orden de trabajo con la sustitución programada de la malla y se informa a Calidad de turno el mismo día.',
            'Hasta la sustitución, inspección reforzada: revisión visual al inicio de cada turno, anotada en la hoja de ruta de la línea, y seguimiento de la tasa de rechazo de la selectora óptica situada después del túnel.',
            'Si la malla presenta rotura, la línea no arranca hasta sustituirla.'
          ] },
          { id: '5', heading: '5. Sustitución y verificación', text: [
            'Tras cambiar la malla se verifica la separación con 10 piedras testigo de 6 a 10 mm: la despedregadora debe separar las 10. El resultado se registra en la orden de trabajo antes de cerrarla.'
          ] },
          { id: '6', heading: '6. Historial de revisiones', text: [
            'Rev. 3 (10/12/2025): se añade la inspección reforzada hasta la sustitución de la malla, como acción de la NC-2025-0388 (piedra en espinaca, línea de hoja de la planta de Alfaro).'
          ] }
        ]
      },
      {
        code: 'FT-UK-GUI-1000',
        title: 'Ficha técnica de producto terminado · Guisante 1 kg (Garden Peas 1kg)',
        short: 'Ficha técnica · Guisante 1 kg (Reino Unido)',
        type: 'Ficha técnica',
        version: '2',
        date: '2026-03-03',
        owner: 'Calidad de planta',
        summary: 'Guisante IQF de marca blanca para el Reino Unido (línea L2): sin alérgenos, tolerancia cero de piedras, vidrio y metal, conservación a −18 °C o menos y consumo preferente de 24 meses.',
        sections: [
          { id: '1', heading: '1. Producto', text: [
            'Guisante (Pisum sativum) desgranado, escaldado y ultracongelado en IQF. Marca blanca de un retailer del Reino Unido, comercializado a través de EC Foods UK. Se fabrica en Fustiñana, en la línea L2.'
          ] },
          { id: '2', heading: '2. Ingredientes y alérgenos', text: [
            'Ingredientes: guisante (100 %).',
            'Alérgenos: no contiene ninguno de los 14 alérgenos de declaración obligatoria del Reglamento (UE) 1169/2011. Sin riesgo de contaminación cruzada identificado (MAT-ALE-FUS).'
          ] },
          { id: '3', heading: '3. Especificación física', list: [
            'Madurez en recepción: tenderómetro de 95 a 120 TR.',
            'Calibre: de 7,5 a 10,2 mm.',
            'Piedras, vidrio y metal: ausencia (tolerancia cero).',
            'Materia vegetal extraña (vainas, hojas): como máximo 2 piezas por kg.',
            'Granos defectuosos (manchados o partidos): como máximo el 3 % en peso.'
          ] },
          { id: '4', heading: '4. Microbiología', list: [
            'Escherichia coli: menos de 100 ufc/g.',
            'Listeria monocytogenes: ausencia en 25 g, según el plan analítico (PNT-CAL-034).',
            'Recuento de aerobios mesófilos: menos de 100.000 ufc/g.'
          ] },
          { id: '5', heading: '5. Conservación y vida útil', text: [
            'Conservar a −18 °C o menos. Consumo preferente: 24 meses desde la fabricación, en formato MM/AAAA.',
            'Una vez descongelado, no volver a congelar. Cocinar antes de consumir.'
          ] },
          { id: '6', heading: '6. Envase y paletización', list: [
            'Bolsa de 1 kg; 10 bolsas por caja; 80 cajas por palé (800 kg netos).',
            'Etiqueta de palé GS1-128 con SSCC, lote y consumo preferente.'
          ] },
          { id: '7', heading: '7. Código de lote', text: [
            'Formato L<aa>-<día juliano>-<planta>-<producto>-<nº>. Ejemplo: L26-231-FUS-GUI-01 es el lote 01 de guisante fabricado en Fustiñana el día 231 de 2026 (19/08/2026).'
          ] }
        ]
      },
      {
        code: 'MAT-ALE-FUS',
        title: 'Matriz de alérgenos · planta de Fustiñana',
        short: 'Matriz de alérgenos',
        type: 'Matriz',
        version: '9',
        date: '2026-06-30',
        owner: 'Equipo APPCC',
        summary: 'En Fustiñana no se manipula ninguno de los 14 alérgenos de declaración obligatoria ni hay riesgo de contaminación cruzada identificado en las líneas L1 a L5.',
        sections: [
          { id: '1', heading: '1. Alcance', text: [
            'Recoge, por producto y línea, la presencia de los 14 alérgenos de declaración obligatoria del Reglamento (UE) 1169/2011 en la planta de Fustiñana. Se revisa con cada receta, materia prima o proveedor nuevo.'
          ] },
          { id: '2', heading: '2. Situación de la planta', text: [
            'En la planta de Fustiñana no se manipula ninguno de los 14 alérgenos: todas las recetas son verdura o mezclas de verduras, y los graneles a la plancha que llegan de Arguedas vienen declarados sin alérgenos en su especificación.',
            'No hay riesgo de contaminación cruzada por alérgenos identificado en las líneas L1 a L5.'
          ] },
          { id: '3', heading: '3. Matriz por producto', list: [
            'UK-GUI-1000 · Guisante 1 kg (Garden Peas 1kg) · línea L2 · contiene: ninguno · puede contener: ninguno.',
            'VL-GUI-1000 · Guisante fino 1 kg · línea L4 · contiene: ninguno · puede contener: ninguno.',
            'EC-BRO-2500 · Brócoli floretes 2,5 kg · línea L4 · contiene: ninguno · puede contener: ninguno.',
            'FR-JUD-1000 · Judía verde redonda 1 kg · línea L3 · contiene: ninguno · puede contener: ninguno.',
            'US-MAI-450 · Maíz dulce 450 g · línea L1 · contiene: ninguno · puede contener: ninguno.',
            'UK-MIX-600 · Salteado de verduras a la plancha 600 g · línea L5 · contiene: ninguno · puede contener: ninguno.',
            'VL-ESP-1000 · Espinaca en porciones 1 kg · envasada en la planta de Alfaro; en Fustiñana solo se almacena y expide · contiene: ninguno · puede contener: ninguno.'
          ] },
          { id: '4', heading: '4. Control de cambios', text: [
            'Cualquier receta, materia prima o proveedor nuevo con alguno de los 14 alérgenos requiere la evaluación previa del equipo APPCC y la actualización de esta matriz antes de entrar en planta.',
            'Está prohibido introducir alimentos en las zonas de producción, incluidos frutos de cáscara y sésamo.'
          ] }
        ]
      }
    ],

    unindexed: {
      'PNT-CAL-018': { title: 'Trazabilidad y retirada de producto', mentionedIn: { doc: 'PNT-CAL-015', sec: '6', quote: 'según PNT-CAL-018 (Trazabilidad y retirada de producto)' } }
    },

    suggested: ['camara', 'liberar', 'plazos', 'detector', 'malla', 'listeria'],

    intents: [
      {
        id: 'camara', icon: 'thermometer', topic: 'Cadena de frío · excursiones de temperatura', scope: 'local',
        q: '¿Qué hay que hacer si una cámara supera −18 °C?',
        anchors: ['cámara', 'cámaras', 'excursión', 'temperatura', 'frío', '18', 'silo', 'silos'],
        terms: ['supera', 'superar', 'sube', 'subir', 'calienta', 'caliente', 'alarma', 'bloquear', 'bloqueo', 'actuar', 'actuación', 'pierde', 'perder', 'rotura', 'cadena', 'encima', 'palés', 'minutos', '15', 'criterio', 'crítica', 'puerta', 'abre', 'abierta'],
        min: 3,
        blocks: [
          { t: 'Si la temperatura de aire supera −18 °C durante más de 15 min seguidos, se bloquean todos los palés expuestos y no se expiden hasta evaluarlos.', c: [['PNT-CAL-012', 4, 'Si la temperatura de aire supera −18 °C durante más de 15 min seguidos, se bloquean todos los palés expuestos']] },
          { t: 'Si en algún momento supera −15 °C, la excursión es crítica: además del bloqueo, se abre una no conformidad en Elara y se informa al Responsable de Calidad de planta.', c: [['PNT-CAL-012', 4, 'Si en algún momento supera −15 °C, la excursión es crítica']] },
          { t: 'El bloqueo se registra a la vez en SAP QM y en Mecalux Easy WMS, que no permite cargar un palé bloqueado.', c: [['PNT-CAL-015', 3, 'Todo bloqueo se registra a la vez en SAP QM (lote con bloqueo de calidad) y en Mecalux Easy WMS (palés inmovilizados y expediciones retenidas).']] },
          { t: 'Cada lote expuesto se evalúa antes de expedirlo: temperatura de producto con sonda, análisis sensorial y decisión de destino (liberar, reclasificar o destruir).', c: [['PNT-CAL-012', 5, 'Los palés expuestos se evalúan por lote antes de cualquier expedición.']] },
          { t: 'Se avisa al Jefe de turno de expedición por Microsoft Teams para retener las cargas con palés expuestos.', c: [['PNT-CAL-012', 6, 'Se avisa al Jefe de turno de expedición por Microsoft Teams para retener las cargas planificadas con palés expuestos.']] }
        ],
        context: {
          systems: ['SCADA Galileo', 'Mecalux Easy WMS'],
          text: 'Alarma ALM-C07-0550 de hoy en C-07: 50 min por encima de −18 °C y 20 min por encima de −15 °C, con pico de −13,9 °C a las 06:25. Por el apartado 4 es una excursión crítica: bloqueo de los 38 palés expuestos (6 lotes) y no conformidad en Elara.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Abrir alarma C-07'
        },
        followups: ['liberar', 'mismo-lote']
      },
      {
        id: 'mismo-lote', icon: 'layers', topic: 'Cadena de frío · alcance del bloqueo', scope: 'local',
        q: '¿Hay que bloquear los palés del mismo lote que están en otras ubicaciones?',
        anchors: ['ubicaciones', 'ubicación', 'mismo lote', 'otras cámaras', 'otros silos', 'resto del lote', 'otras ubicaciones'],
        terms: ['bloquear', 'bloqueo', 'palés', 'lote', 'silo', 'silos', 'evaluar', 'mismo'],
        min: 3,
        blocks: [
          { t: 'No de forma automática: se marcan «a evaluar» y el Responsable de Calidad de turno decide su alcance a la vista de los resultados.', c: [['PNT-CAL-012', 4, 'se marcan «a evaluar» y el Responsable de Calidad de turno decide su alcance a la vista de los resultados']] },
          { t: 'Si la evaluación permite separar los palés afectados de los que no lo están, el lote puede liberarse por palés (SSCC).', c: [['PNT-CAL-015', 5, 'Un lote puede liberarse por palés (SSCC) cuando la evaluación permite separar los palés afectados de los que no lo están.']] }
        ],
        context: {
          systems: ['Mecalux Easy WMS'],
          text: 'Los 6 lotes expuestos en C-07 tienen además 47 palés en los silos (SIL-1: 12 · SIL-2: 7 · SIL-3: 10 · SIL-4: 18). Quedan «a evaluar», sin bloqueo automático.',
          go: 'alarma', goLabel: 'Abrir alarma C-07'
        },
        followups: ['liberar', 'evaluacion']
      },
      {
        id: 'responsables', icon: 'users', topic: 'Cadena de frío · responsabilidades', scope: 'local',
        q: '¿Quién hace qué en una excursión de temperatura?',
        anchors: ['responsable', 'responsables', 'responsabilidad', 'responsabilidades', 'mantenimiento frigorífico', 'jefe de turno de expedición'],
        terms: ['excursión', 'temperatura', 'cámara', 'alarma', 'frío', 'quién', 'hace', 'decide', 'aprueba'],
        min: 4,
        blocks: [
          { intro: { t: 'Reparto de responsabilidades ante una excursión:' }, list: [
            { t: 'Responsable de Calidad de turno: valora la excursión, aprueba el bloqueo y decide la evaluación del producto.', c: [['PNT-CAL-012', 3, 'Responsable de Calidad de turno: valora la excursión, aprueba el bloqueo y decide la evaluación del producto.']] },
            { t: 'Jefe de turno de expedición: retiene las cargas con palés expuestos hasta la decisión de Calidad.', c: [['PNT-CAL-012', 3, 'Jefe de turno de expedición: retiene las cargas con palés expuestos hasta la decisión de Calidad.']] },
            { t: 'Mantenimiento frigorífico: restablece la temperatura, investiga la causa y registra la intervención.', c: [['PNT-CAL-012', 3, 'Mantenimiento frigorífico: restablece la temperatura, investiga la causa y registra la intervención.']] }
          ] },
          { t: 'Si la excursión es crítica, se informa además al Responsable de Calidad de planta.', c: [['PNT-CAL-012', 4, 'se abre una no conformidad en Elara y se informa al Responsable de Calidad de planta']] }
        ],
        context: {
          systems: ['SCADA Galileo', 'Microsoft Teams'],
          text: 'En la alarma de C-07 de hoy, Mantenimiento frigorífico tiene que confirmar la hipótesis de causa: el desescarche de EV-07 (05:40–06:05) se solapó con un fallo de cierre de la puerta rápida P-07 (sensor de puerta abierta 05:52–06:31).',
          go: 'alarma', goLabel: 'Abrir alarma C-07'
        },
        followups: ['camara', 'liberar']
      },
      {
        id: 'evaluacion', icon: 'flask', topic: 'Cadena de frío · evaluación del producto', scope: 'local',
        q: '¿Cómo se evalúa el producto expuesto a una excursión?',
        anchors: ['evalúa', 'evaluar', 'evaluación', 'sonda', 'sensorial', 'destino'],
        terms: ['producto', 'expuesto', 'palés', 'excursión', 'temperatura', 'cámara', 'lote', 'mide', 'medir'],
        min: 3,
        blocks: [
          { intro: { t: 'La evaluación se hace por lote y antes de cualquier expedición:', c: [['PNT-CAL-012', 5, 'Los palés expuestos se evalúan por lote antes de cualquier expedición.']] }, list: [
            { t: 'Temperatura de producto con sonda en los palés expuestos, en la capa exterior y en el centro.', c: [['PNT-CAL-012', 5, 'Medir la temperatura de producto con sonda en los palés expuestos (capa exterior y centro).']] },
            { t: 'Análisis sensorial y de aspecto por lote: cristales de hielo y apelmazado.', c: [['PNT-CAL-012', 5, 'Análisis sensorial y de aspecto (cristales de hielo, apelmazado) por lote.']] },
            { t: 'Decisión de destino por lote: liberar, reclasificar o destruir.', c: [['PNT-CAL-012', 5, 'Decisión de destino por lote: liberar, reclasificar o destruir.']] }
          ] },
          { t: 'La decisión de empleo se registra en SAP QM y exige evidencia documentada.', c: [['PNT-CAL-015', 4, 'La liberación exige evidencia documentada: resultados de la evaluación, análisis cuando procedan y conclusión firmada.']] }
        ],
        followups: ['liberar', 'camara']
      },
      {
        id: 'liberar', icon: 'unlock', topic: 'Bloqueo y liberación de producto', scope: 'local',
        q: '¿Quién puede liberar un lote bloqueado?',
        anchors: ['liberar', 'liberación', 'libera', 'liberarlo', 'desbloquear', 'desbloqueo', 'decisión de empleo'],
        terms: ['quién', 'lote', 'bloqueado', 'bloqueo', 'retenido', 'retención', 'producto', 'palés', 'firma', 'autoriza', 'puede'],
        min: 3,
        blocks: [
          { t: 'Solo el Responsable de Calidad: el de planta o, por delegación, el de turno.', c: [['PNT-CAL-015', 2, 'Solo el Responsable de Calidad (de planta o, por delegación, de turno) puede liberar producto bloqueado.']] },
          { t: 'La liberación exige evidencia documentada (resultados de la evaluación, análisis cuando procedan y conclusión firmada) y se registra como decisión de empleo en SAP QM: liberar, reclasificar o destruir.', c: [['PNT-CAL-015', 4, 'La liberación exige evidencia documentada: resultados de la evaluación, análisis cuando procedan y conclusión firmada.'], ['PNT-CAL-015', 4, 'La decisión de empleo se registra en SAP QM y puede ser liberar, reclasificar (industria o segunda calidad) o destruir.']] },
          { t: 'Ningún producto se libera por defecto ni por vencimiento de plazo.', c: [['PNT-CAL-015', 4, 'Ningún producto se libera por defecto ni por vencimiento de plazo.']] },
          { t: 'Si la evaluación lo permite, el lote puede liberarse por palés (SSCC).', c: [['PNT-CAL-015', 5, 'Un lote puede liberarse por palés (SSCC)']] }
        ],
        followups: ['registro', 'expedido']
      },
      {
        id: 'bloqueo-quien', icon: 'user-check', topic: 'Bloqueo de producto · quién decide', scope: 'local',
        q: '¿Quién decide un bloqueo de calidad?',
        anchors: ['bloqueo', 'bloquear', 'bloquea', 'retención', 'retener'],
        terms: ['quién', 'decide', 'aprueba', 'autoriza', 'propone', 'responsable', 'firma'],
        min: 4,
        blocks: [
          { t: 'Cualquier responsable de turno puede proponer un bloqueo al detectar una desviación.', c: [['PNT-CAL-015', 2, 'Cualquier responsable de turno puede proponer un bloqueo al detectar una desviación.']] },
          { t: 'Lo aprueba el Responsable de Calidad de turno, que también define su alcance.', c: [['PNT-CAL-015', 2, 'El Responsable de Calidad de turno aprueba el bloqueo y define su alcance.']] },
          { t: 'En una excursión de temperatura, el Responsable de Calidad de turno valora la excursión, aprueba el bloqueo y decide la evaluación del producto.', c: [['PNT-CAL-012', 3, 'Responsable de Calidad de turno: valora la excursión, aprueba el bloqueo y decide la evaluación del producto.']] },
          { t: 'Liberar, en cambio, solo puede hacerlo el Responsable de Calidad, de planta o, por delegación, de turno.', c: [['PNT-CAL-015', 2, 'Solo el Responsable de Calidad (de planta o, por delegación, de turno) puede liberar producto bloqueado.']] }
        ],
        followups: ['liberar', 'registro']
      },
      {
        id: 'registro', icon: 'lock', topic: 'Bloqueo y liberación · registro', scope: 'local',
        q: '¿Dónde se registra un bloqueo de calidad?',
        anchors: ['registra', 'registrar', 'registro', 'sap qm', 'easy wms', 'inmovilizar', 'inmovilizados'],
        terms: ['bloqueo', 'bloquear', 'bloqueado', 'calidad', 'palés', 'lote', 'dónde'],
        min: 3,
        blocks: [
          { t: 'A la vez en SAP QM (lote con bloqueo de calidad) y en Mecalux Easy WMS (palés inmovilizados y expediciones retenidas).', c: [['PNT-CAL-015', 3, 'Todo bloqueo se registra a la vez en SAP QM (lote con bloqueo de calidad) y en Mecalux Easy WMS (palés inmovilizados y expediciones retenidas).']] },
          { t: 'Easy WMS no permite cargar un palé bloqueado.', c: [['PNT-CAL-015', 3, 'Easy WMS no permite cargar un palé bloqueado.']] },
          { t: 'El registro incluye el motivo, el alcance (lotes, SSCC y ubicaciones), la referencia de origen y quién lo aprueba.', c: [['PNT-CAL-015', 3, 'El registro incluye el motivo, el alcance (lotes, SSCC y ubicaciones), la referencia de origen (alarma, no conformidad o reclamación) y quién lo aprueba.']] }
        ],
        followups: ['liberar']
      },
      {
        id: 'expedido', icon: 'truck', topic: 'Producto ya expedido', scope: 'local', kind: 'partial',
        q: '¿Qué se hace si el producto afectado ya se ha expedido?',
        anchors: ['=expedido', '=expedida', '=expedidos', '=expedidas', 'ya salió', 'ya ha salido', 'en el cliente'],
        terms: ['producto', 'lote', 'afectado', 'bloqueo', 'palés', 'cliente', 'retirada'],
        min: 2,
        blocks: [
          { t: 'Si parte del lote ya se ha expedido, el Responsable de Calidad de planta valora la retirada o recuperación según PNT-CAL-018 e informa al cliente.', c: [['PNT-CAL-015', 6, 'el Responsable de Calidad de planta valora la retirada o recuperación según PNT-CAL-018 (Trazabilidad y retirada de producto)']] }
        ],
        note: 'PNT-CAL-018 (Trazabilidad y retirada de producto) no está entre los documentos indexados: los pasos de la retirada no se pueden detallar desde esta consulta.',
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
            { t: 'Acuse de recibo al cliente en 24 h desde la recepción.', c: [['PNT-CAL-020', 2, 'Acuse de recibo al cliente: 24 h desde la recepción.']] },
            { t: 'Contención en 48 h: identificar y bloquear el stock del lote reclamado.', c: [['PNT-CAL-020', 2, 'Contención: 48 h para identificar y bloquear el stock del lote reclamado (PNT-CAL-015).']] },
            { t: 'Informe 8D en el plazo pactado con el cliente; si no hay plazo pactado, 5 días hábiles.', c: [['PNT-CAL-020', 2, 'Informe 8D: en el plazo pactado con el cliente; si no hay plazo pactado, 5 días hábiles.']] }
          ] },
          { t: 'La respuesta se redacta en el idioma del cliente y la aprueba el Responsable de Calidad de planta antes de enviarla.', c: [['PNT-CAL-020', 6, 'La respuesta se redacta en el idioma del cliente y la aprueba el Responsable de Calidad de planta antes de enviarla.']] }
        ],
        context: {
          systems: ['Elara'],
          text: 'Reclamación UKC-44718 (EC Foods UK Ltd, filial EC en el Reino Unido), recibida el 26/09/2026 a las 10:14: el cliente pide el informe en 5 días hábiles, antes del 02/10/2026.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación UKC-44718'
        },
        followups: ['cuerpo-extrano', '8d']
      },
      {
        id: '8d', icon: 'list-checks', topic: 'Reclamaciones · informe 8D', scope: 'all',
        q: '¿Qué debe incluir un informe 8D?',
        anchors: ['8d', 'ocho disciplinas', 'd1', 'd4', 'd8'],
        terms: ['informe', 'incluir', 'incluye', 'pasos', 'contenido', 'estructura', 'apartados', 'disciplinas', 'partes', 'plantilla'],
        min: 2,
        blocks: [
          { intro: { t: 'El informe 8D se prepara en Elara y sigue ocho pasos:', c: [['PNT-CAL-020', 5, 'El informe 8D se prepara en Elara y sigue ocho pasos:']] }, list: [
            { t: 'D1 · Equipo: Calidad de planta, Producción y Mantenimiento de línea.' },
            { t: 'D2 · Descripción del problema con los datos del cliente.' },
            { t: 'D3 · Contención: stock bloqueado y producto en poder del cliente.' },
            { t: 'D4 · Causa raíz, confirmada con evidencia.' },
            { t: 'D5 · Acciones correctivas.' },
            { t: 'D6 · Implantación y verificación de la eficacia.' },
            { t: 'D7 · Prevención: cambios en procedimientos, planes de mantenimiento o formación.' },
            { t: 'D8 · Cierre y comunicación al cliente.' }
          ] },
          { t: 'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.', c: [['PNT-CAL-020', 6, 'Una causa solo se comunica como confirmada cuando hay evidencia; hasta entonces se presenta como hipótesis en investigación.']] }
        ],
        followups: ['plazos', 'cuerpo-extrano']
      },
      {
        id: 'cuerpo-extrano', icon: 'search', topic: 'Reclamaciones · cuerpos extraños', scope: 'all',
        q: '¿Cómo se investiga una reclamación por piedra o cuerpo extraño?',
        anchors: ['piedra', 'piedras', 'cuerpo extraño', 'cuerpos extraños', 'objeto extraño', 'cristal', 'vidrio', 'plástico'],
        terms: ['reclamación', 'reclamaciones', 'queja', 'investiga', 'investigar', 'investigación', 'gravedad', 'clasifica', 'cliente', 'consumidor', 'mm'],
        min: 3,
        blocks: [
          { t: 'Es de gravedad alta: cuerpos extraños duros o cortantes de 7 mm o más, aunque no haya lesión. Se informa en el día al Responsable de Calidad de planta.', c: [['PNT-CAL-020', 3, 'Gravedad alta: cuerpos extraños duros o cortantes de 7 mm o más, aunque no haya lesión']] },
          { intro: { t: 'La investigación revisa como mínimo:', c: [['PNT-CAL-020', 4, 'La investigación de una reclamación por cuerpo extraño revisa, como mínimo:']] }, list: [
            { t: 'La trazabilidad del lote hacia atrás (campo, recepción, línea y turno) y hacia delante (palés y expediciones).' },
            { t: 'Los registros de despedregadora, selectora óptica y detector de metales en la fecha de fabricación.' },
            { t: 'El historial de mantenimiento de esos equipos, incluidas las órdenes abiertas.', c: [['PNT-CAL-020', 4, 'Historial de mantenimiento de los equipos de control de cuerpos extraños de la línea, incluidas las órdenes abiertas.']] },
            { t: 'Las reclamaciones similares de los últimos 12 meses en cualquier planta del grupo.' }
          ] },
          { t: 'En la respuesta al cliente, la causa se presenta como hipótesis hasta que haya evidencia.', c: [['PNT-CAL-020', 6, 'Una causa solo se comunica como confirmada cuando hay evidencia']] }
        ],
        context: {
          systems: ['Elara', 'GMAO'],
          text: 'UKC-44718: piedra de 8 mm en el lote L26-231-FUS-GUI-01 (L2, 19/08/2026), gravedad alta según el apartado 3. La despedregadora DP-2 tiene abierta la OT-26-07415 desde el 18/08/2026 y hay una reclamación similar: RCL-2025-0311 (piedra de unos 6 mm en espinaca en porciones, NC-2025-0388).',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación UKC-44718'
        },
        followups: ['malla', '8d']
      },
      {
        id: 'detector', icon: 'shield-check', topic: 'Cuerpos extraños · detector de metales (PCC)', scope: 'local',
        q: '¿Cada cuánto se verifica el detector de metales y qué pasa si falla?',
        anchors: ['detector', 'detectores', 'metales', 'metal', 'probetas', 'probeta', 'pcc'],
        terms: ['verifica', 'verificar', 'verificación', 'cada cuánto', 'frecuencia', 'falla', 'fallo', 'horas', 'retener', 'retiene', 'rechazo', 'rechazado'],
        min: 2,
        blocks: [
          { t: 'El detector de metales es un PCC. Se verifica con probetas certificadas de Fe 2,0 mm, no férrico 2,5 mm y acero inoxidable 3,0 mm al inicio del turno, cada 2 h y al final de la producción.', c: [['PNT-CAL-031', 4, 'Se verifica con probetas certificadas de Fe 2,0 mm, no férrico 2,5 mm y acero inoxidable 3,0 mm al inicio del turno, cada 2 h y al final de la producción.']] },
          { t: 'Si una verificación falla o se superan las 2 h sin verificar, se retiene todo el producto envasado desde la última verificación correcta y se vuelve a pasar por el detector una vez corregido el equipo.', c: [['PNT-CAL-031', 4, 'Si una verificación falla o se superan las 2 h sin verificar, se retiene todo el producto envasado desde la última verificación correcta']] },
          { t: 'El producto rechazado cae a un contenedor cerrado con llave que solo abre Calidad.', c: [['PNT-CAL-031', 4, 'El producto rechazado cae a un contenedor cerrado con llave; solo Calidad lo abre y registra su contenido.']] },
          { t: 'Cada verificación se registra en la hoja de PCC de Elara, firmada por el operador y revisada por Calidad.', c: [['PNT-CAL-031', 5, 'Verificaciones del detector: hoja de PCC en Elara, firmada por el operador y revisada por Calidad.']] }
        ],
        context: {
          systems: ['MES Mapex', 'Elara'],
          text: 'DM-1 (línea L1) lleva 3,5 h sin verificar (máximo 2 h); la última verificación correcta fue a las 02:30. Por el apartado 4 corresponde retener el producto envasado en L1 desde esa hora; la retención la aprueba Calidad (PNT-CAL-015).',
          go: 'turno', goLabel: 'Ver parte diario'
        },
        followups: ['optica', 'malla']
      },
      {
        id: 'optica', icon: 'eye', topic: 'Cuerpos extraños · selectoras ópticas', scope: 'local',
        q: '¿Qué hacer si la selectora óptica rechaza más de lo normal?',
        anchors: ['óptica', 'ópticas', 'selectora', 'selectoras'],
        terms: ['rechazo', 'rechaza', 'rechazos', 'tasa', 'porcentaje', 'normal', 'alta', 'sube', 'referencia', 'hacer'],
        min: 2,
        blocks: [
          { t: 'Cada selectora tiene una tasa de rechazo de referencia por producto, fijada en MES Mapex (1,5 % en guisante).', c: [['PNT-CAL-031', 3, 'Cada selectora tiene una tasa de rechazo de referencia por producto, fijada en MES Mapex (por ejemplo, 1,5 % en guisante).']] },
          { list: [
            { t: 'Por encima del 2,5 %, el operador revisa la entrada de producto y las barreras anteriores, en especial la despedregadora.', c: [['PNT-CAL-031', 3, 'Rechazo por encima del 2,5 %: el operador revisa la entrada de producto y las barreras anteriores, en especial la despedregadora.']] },
            { t: 'Por encima del 4 %, aviso inmediato a Calidad de turno y a Mantenimiento de línea, y muestreo reforzado de producto terminado.', c: [['PNT-CAL-031', 3, 'Rechazo por encima del 4 %: aviso inmediato a Calidad de turno y a Mantenimiento de línea, y muestreo reforzado de producto terminado.']] }
          ] }
        ],
        context: {
          systems: ['MES Mapex', 'GMAO'],
          text: 'Selectora óptica OPT-2 (L2) rechaza hoy el 4,8 % (referencia 1,5 %), por encima del 4 %. La despedregadora DP-2, antes de OPT-2 en la misma línea, tiene la malla pendiente de sustitución (OT-26-07415).',
          go: 'turno', goLabel: 'Ver parte diario'
        },
        followups: ['malla', 'detector']
      },
      {
        id: 'malla', icon: 'wrench', topic: 'Despedregadora · desgaste de malla', scope: 'all',
        q: '¿Qué hacer si la malla de la despedregadora tiene desgaste?',
        anchors: ['malla', 'mallas', 'despedregadora', 'despedregadoras', 'dp-2', 'dp2'],
        terms: ['desgaste', 'desgastada', 'gastada', 'rota', 'rotura', 'sustituir', 'sustitución', 'cambiar', 'cambio', 'hacer', 'orden de trabajo', 'reparar'],
        min: 2,
        blocks: [
          { t: 'Se abre una orden de trabajo con la sustitución programada de la malla y se informa a Calidad de turno el mismo día.', c: [['IT-MAN-DP-02', 4, 'Se abre una orden de trabajo con la sustitución programada de la malla y se informa a Calidad de turno el mismo día.']] },
          { t: 'Hasta la sustitución, inspección reforzada: revisión visual al inicio de cada turno, anotada en la hoja de ruta de la línea, y seguimiento de la tasa de rechazo de la selectora óptica situada después del túnel.', c: [['IT-MAN-DP-02', 4, 'Hasta la sustitución, inspección reforzada: revisión visual al inicio de cada turno, anotada en la hoja de ruta de la línea, y seguimiento de la tasa de rechazo de la selectora óptica situada después del túnel.']] },
          { t: 'Si la malla presenta rotura, la línea no arranca hasta sustituirla.', c: [['IT-MAN-DP-02', 4, 'Si la malla presenta rotura, la línea no arranca hasta sustituirla.']] },
          { t: 'Tras el cambio se verifica con 10 piedras testigo de 6 a 10 mm: la despedregadora debe separar las 10.', c: [['IT-MAN-DP-02', 5, 'Tras cambiar la malla se verifica la separación con 10 piedras testigo de 6 a 10 mm: la despedregadora debe separar las 10.']] }
        ],
        context: {
          systems: ['GMAO', 'MES Mapex'],
          text: 'DP-2 (L2): la OT-26-07415 está abierta desde el 18/08/2026 (42 días), pendiente de repuesto. OPT-2 rechaza el 4,8 % (referencia 1,5 %). La reclamación UKC-44718 es de un lote de L2 fabricado el 19/08/2026, un día después de anotarse el desgaste.',
          go: 'reclamacion', goLabel: 'Abrir reclamación UKC-44718'
        },
        followups: ['optica', 'cuerpo-extrano']
      },
      {
        id: 'malla-inspeccion', icon: 'wrench', topic: 'Despedregadora · inspección de malla', scope: 'all',
        q: '¿Cada cuánto se inspecciona la malla de la despedregadora?',
        anchors: ['malla', 'mallas', 'despedregadora', 'despedregadoras', 'dp-2', 'dp2'],
        terms: ['cada cuánto', 'frecuencia', 'semanal', 'semana', 'inspecciona', 'inspeccionar', 'inspección', 'revisa', 'revisar', 'revisión', 'galga'],
        min: 3,
        blocks: [
          { intro: { t: 'Una vez por semana, con la línea parada y consignada; Mantenimiento de línea registra el resultado en la GMAO. Se revisan:', c: [['IT-MAN-DP-02', 2, 'Una vez por semana, con la línea parada y consignada, Mantenimiento de línea inspecciona la malla y registra el resultado en la GMAO:']] }, list: [
            { t: 'Roturas, deformaciones y holgura del marco.' },
            { t: 'Desgaste de la luz de malla, medido con galga en cinco puntos.' },
            { t: 'Estado de las juntas y del sistema de expulsión de piedras.' }
          ] },
          { t: 'Hay desgaste cuando la luz de malla supera en más de un 10 % la nominal en cualquier punto medido, o cuando hay roturas o deformaciones.', c: [['IT-MAN-DP-02', 3, 'Hay desgaste cuando la luz de malla supera en más de un 10 % la nominal en cualquier punto medido, o cuando hay roturas o deformaciones.']] },
          { t: 'Con desgaste, y hasta sustituirla, la malla se revisa al inicio de cada turno.', c: [['IT-MAN-DP-02', 4, 'revisión visual al inicio de cada turno']] }
        ],
        followups: ['malla']
      },
      {
        id: 'listeria', icon: 'flask', topic: 'Listeria · muestreo ambiental', scope: 'local',
        q: '¿Con qué frecuencia se muestrea Listeria en el entorno?',
        anchors: ['listeria', 'ambiental', 'hisopos', 'hisopo', 'muestreo ambiental'],
        terms: ['frecuencia', 'cada cuánto', 'muestrea', 'muestrean', 'muestreo', 'muestras', 'entorno', 'semanal', 'plan'],
        min: 2,
        blocks: [
          { intro: { t: 'Frecuencias mínimas de muestreo ambiental:', c: [['PNT-CAL-034', 3, 'Frecuencias mínimas de muestreo ambiental:']] }, list: [
            { t: 'Zona 1, superficies en contacto con el producto después del escaldado: semanal en cada línea, con la línea en producción.', c: [['PNT-CAL-034', 2, 'Zona 1: superficies en contacto con el producto después del escaldado']] },
            { t: 'Zona 2: semanal.' },
            { t: 'Zona 3: cada dos semanas, con prioridad en desagües y puntos con agua estancada.' },
            { t: 'Zona 4: mensual.' }
          ] },
          { t: 'Además, se muestrea después de obras, de averías que obliguen a abrir equipos de la zona 1 y de cada limpieza en profundidad de fin de campaña.', c: [['PNT-CAL-034', 4, 'se muestrea después de obras, de averías que obliguen a abrir equipos de la zona 1 y de cada limpieza en profundidad de fin de campaña.']] }
        ],
        followups: ['listeria-positivo']
      },
      {
        id: 'listeria-positivo', icon: 'flask', topic: 'Listeria · actuación ante un positivo', scope: 'local',
        q: '¿Qué hacer ante un positivo de Listeria en zona 1?',
        anchors: ['listeria', 'ambiental', 'hisopos', 'hisopo'],
        terms: ['positivo', 'positiva', 'positivos', 'detecta', 'aparece', 'resultado', 'actuar', 'retener', 'contaminación', 'zona', 'zonas'],
        min: 3,
        blocks: [
          { t: 'Se retiene el producto fabricado en esa línea desde la última limpieza verificada hasta conocer el resultado de Listeria monocytogenes; se limpia y desinfecta en profundidad y se toman muestras alrededor del punto positivo.', c: [['PNT-CAL-034', 5, 'se retiene el producto fabricado en esa línea desde la última limpieza verificada hasta conocer el resultado de Listeria monocytogenes']] },
          { t: 'La línea vuelve a la frecuencia normal tras tres muestreos consecutivos negativos en ese punto.', c: [['PNT-CAL-034', 5, 'La línea vuelve a la frecuencia normal tras tres muestreos consecutivos negativos en ese punto.']] },
          { t: 'En zonas 2 o 3: limpieza reforzada y nuevo muestreo en 24 a 48 h.', c: [['PNT-CAL-034', 5, 'Positivo en zonas 2 o 3: limpieza reforzada y nuevo muestreo en 24 a 48 h']] },
          { t: 'Todo positivo se comunica en el día al Responsable de Calidad de planta y se registra en Elara.', c: [['PNT-CAL-034', 5, 'Todo positivo se comunica en el día al Responsable de Calidad de planta y se registra en Elara.']] }
        ],
        followups: ['listeria']
      },
      {
        id: 'ficha', icon: 'file-text', topic: 'Ficha técnica · guisante 1 kg (Reino Unido)', scope: 'local',
        q: '¿Qué tolerancia de piedras admite la ficha técnica del guisante?',
        anchors: ['tolerancia', 'ficha técnica', 'ficha', 'especificación', 'especificaciones', 'calibre', 'tenderómetro'],
        terms: ['piedras', 'piedra', 'vidrio', 'metal', 'guisante', 'cuerpos', 'extraños', 'admite', 'máximo', 'técnica'],
        min: 2,
        blocks: [
          { intro: { t: 'La ficha técnica del guisante 1 kg para el Reino Unido (UK-GUI-1000) fija, entre otros:', c: [['FT-UK-GUI-1000', 1, 'Guisante (Pisum sativum) desgranado, escaldado y ultracongelado en IQF.']] }, list: [
            { t: 'Piedras, vidrio y metal: ausencia (tolerancia cero).', c: [['FT-UK-GUI-1000', 3, 'Piedras, vidrio y metal: ausencia (tolerancia cero).']] },
            { t: 'Madurez en recepción: tenderómetro de 95 a 120 TR.', c: [['FT-UK-GUI-1000', 3, 'Madurez en recepción: tenderómetro de 95 a 120 TR.']] },
            { t: 'Materia vegetal extraña: como máximo 2 piezas por kg.', c: [['FT-UK-GUI-1000', 3, 'Materia vegetal extraña (vainas, hojas): como máximo 2 piezas por kg.']] },
            { t: 'Sin alérgenos de declaración obligatoria.', c: [['FT-UK-GUI-1000', 2, 'no contiene ninguno de los 14 alérgenos de declaración obligatoria']] },
            { t: 'Consumo preferente de 24 meses, conservado a −18 °C o menos.', c: [['FT-UK-GUI-1000', 5, 'Conservar a −18 °C o menos. Consumo preferente: 24 meses desde la fabricación']] }
          ] }
        ],
        context: {
          systems: ['Elara'],
          text: 'UKC-44718: el cliente reclama una piedra de 8 mm en el lote L26-231-FUS-GUI-01 de este producto. La ficha no admite piedras (tolerancia cero).',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Abrir reclamación UKC-44718'
        },
        followups: ['vida-util', 'lote']
      },
      {
        id: 'vida-util', icon: 'snowflake', topic: 'Ficha técnica · conservación', scope: 'local',
        q: '¿Cuál es la vida útil del guisante 1 kg y cómo se conserva?',
        anchors: ['vida útil', 'caducidad', 'consumo preferente', 'conservar', 'conserva', 'conservación', 'descongelar', 'descongelado', 'recongelar'],
        terms: ['guisante', 'meses', 'temperatura', 'ficha', 'producto', 'congelar', 'años'],
        min: 2,
        blocks: [
          { t: 'Para el guisante 1 kg del Reino Unido (UK-GUI-1000), consumo preferente de 24 meses desde la fabricación, en formato MM/AAAA.', c: [['FT-UK-GUI-1000', 5, 'Consumo preferente: 24 meses desde la fabricación, en formato MM/AAAA.']] },
          { t: 'Se conserva a −18 °C o menos; una vez descongelado no se vuelve a congelar, y se cocina antes de consumir.', c: [['FT-UK-GUI-1000', 5, 'Conservar a −18 °C o menos.'], ['FT-UK-GUI-1000', 5, 'Una vez descongelado, no volver a congelar. Cocinar antes de consumir.']] }
        ],
        followups: ['ficha', 'lote']
      },
      {
        id: 'lote', icon: 'barcode', topic: 'Código de lote', scope: 'local',
        q: '¿Cómo se lee el código de lote?',
        anchors: ['código de lote', 'codigo de lote', 'día juliano', 'juliano', 'formato de lote', 'l26'],
        terms: ['lote', 'código', 'leer', 'lee', 'significa', 'interpreta', 'formato', 'fecha'],
        min: 2,
        blocks: [
          { t: 'Formato L<aa>-<día juliano>-<planta>-<producto>-<nº>.', c: [['FT-UK-GUI-1000', 7, 'Formato L<aa>-<día juliano>-<planta>-<producto>-<nº>.']] },
          { t: 'Por ejemplo, L26-231-FUS-GUI-01 es el lote 01 de guisante fabricado en Fustiñana el día 231 de 2026, es decir, el 19/08/2026.', c: [['FT-UK-GUI-1000', 7, 'L26-231-FUS-GUI-01 es el lote 01 de guisante fabricado en Fustiñana el día 231 de 2026 (19/08/2026).']] }
        ],
        context: {
          systems: ['SAP', 'MES Mapex', 'Mecalux Easy WMS'],
          text: 'Traza completa del lote del ejemplo, hacia atrás y hacia delante, con sus 22 SSCC:',
          lot: 'L26-231-FUS-GUI-01'
        },
        followups: ['vida-util', 'paletizacion']
      },
      {
        id: 'paletizacion', icon: 'pallet', topic: 'Ficha técnica · envase y paletización', scope: 'local',
        q: '¿Cuántas cajas lleva un palé de guisante 1 kg?',
        anchors: ['paletización', 'paletizado', 'cajas', 'caja', 'bolsas por caja', 'cajas por palé'],
        terms: ['palé', 'palés', 'guisante', 'cuántas', 'lleva', 'kg', 'bolsa', 'bolsas', 'etiqueta'],
        min: 3,
        blocks: [
          { t: 'Para el guisante 1 kg del Reino Unido (UK-GUI-1000): bolsa de 1 kg, 10 bolsas por caja y 80 cajas por palé, con 800 kg netos.', c: [['FT-UK-GUI-1000', 6, 'Bolsa de 1 kg; 10 bolsas por caja; 80 cajas por palé (800 kg netos).']] },
          { t: 'Cada palé lleva etiqueta GS1-128 con SSCC, lote y consumo preferente.', c: [['FT-UK-GUI-1000', 6, 'Etiqueta de palé GS1-128 con SSCC, lote y consumo preferente.']] }
        ],
        followups: ['lote']
      },
      {
        id: 'alergenos', icon: 'leaf', topic: 'Alérgenos · planta de Fustiñana', scope: 'local',
        q: '¿Qué alérgenos se manipulan en Fustiñana?',
        anchors: ['alérgeno', 'alérgenos', 'alergia', 'alergias', 'gluten', 'apio', 'soja', 'sésamo', 'frutos de cáscara', 'cacahuete', 'lactosa', 'huevo', 'mostaza', 'sulfitos', 'altramuces', 'crustáceos', 'moluscos'],
        terms: ['fustiñana', 'planta', 'manipulan', 'contiene', 'trazas', 'matriz', 'producto', 'lleva', 'cruzada'],
        min: 2,
        blocks: [
          { t: 'En la planta de Fustiñana no se manipula ninguno de los 14 alérgenos de declaración obligatoria: todas las recetas son verdura o mezclas de verduras.', c: [['MAT-ALE-FUS', 2, 'En la planta de Fustiñana no se manipula ninguno de los 14 alérgenos']] },
          { t: 'No hay riesgo de contaminación cruzada por alérgenos identificado en las líneas L1 a L5.', c: [['MAT-ALE-FUS', 2, 'No hay riesgo de contaminación cruzada por alérgenos identificado en las líneas L1 a L5.']] },
          { t: 'Una receta, materia prima o proveedor nuevo con alérgenos requiere la evaluación previa del equipo APPCC y actualizar la matriz antes de entrar en planta.', c: [['MAT-ALE-FUS', 4, 'requiere la evaluación previa del equipo APPCC y la actualización de esta matriz antes de entrar en planta.']] }
        ],
        /* Si la pregunta nombra un producto, añade su fila de la matriz (MAT-ALE-FUS §3), como en la demo de referencia. */
        build: (q) => {
          const K = window.CN_DOCS;
          const words = [
            { words: ['salteado', 'mezcla', 'plancha', 'mix'], sku: 'UK-MIX-600' },
            { words: ['brocoli', 'brócoli'], sku: 'EC-BRO-2500' },
            { words: ['judia', 'judía', 'judias'], sku: 'FR-JUD-1000' },
            { words: ['maiz', 'maíz'], sku: 'US-MAI-450' },
            { words: ['espinaca', 'espinacas'], sku: 'VL-ESP-1000' },
            { words: ['garden', 'reino unido', 'uk'], sku: 'UK-GUI-1000' },
            { words: ['guisante', 'guisantes'], sku: 'VL-GUI-1000' }
          ];
          const C = (doc, sec, quote) => [doc, sec, quote];
          const blocks = [
            { t: 'En la planta de Fustiñana no se manipula ninguno de los 14 alérgenos de declaración obligatoria: todas las recetas son verdura o mezclas de verduras.', c: [C('MAT-ALE-FUS', 2, 'En la planta de Fustiñana no se manipula ninguno de los 14 alérgenos')] },
            { t: 'No hay riesgo de contaminación cruzada por alérgenos identificado en las líneas L1 a L5.', c: [C('MAT-ALE-FUS', 2, 'No hay riesgo de contaminación cruzada por alérgenos identificado en las líneas L1 a L5.')] }
          ];
          if (K && typeof K.normalize === 'function') {
            const n = ` ${K.normalize(q)} `;
            const hit = words.find((p) => p.words.some((w) => n.includes(` ${K.normalize(w)} `)));
            const sec = hit ? K.section('MAT-ALE-FUS', '3') : null;
            const text = sec && (sec.list || []).find((t) => t.indexOf(hit.sku) === 0);
            if (text) blocks.push({ t: `${text.split(' · ')[1] || hit.sku} (${hit.sku}): no contiene alérgenos ni trazas según la matriz.`, c: [C('MAT-ALE-FUS', 3, text)] });
          }
          blocks.push({ t: 'Una receta, materia prima o proveedor nuevo con alérgenos requiere la evaluación previa del equipo APPCC y actualizar la matriz antes de entrar en planta.', c: [C('MAT-ALE-FUS', 4, 'requiere la evaluación previa del equipo APPCC y la actualización de esta matriz antes de entrar en planta.')] });
          return { blocks, followups: ['ficha'] };
        },
        followups: ['ficha']
      }
    ],

    /* Preguntas sobre otra planta del grupo cuando la respuesta sale de un documento de Fustiñana (scope 'local'). */
    other_scopes: {
      topic: 'Otra planta',
      words: ['arguedas', 'alfaro', 'olmedo', 'vega', 'alicante', 'formentera'],
      reason: 'Los documentos indexados sobre este tema son de la planta de Fustiñana; no hay evidencia para {x}.'
    },

    gaps: [
      { id: 'simulacro', topic: 'Simulacro y retirada de producto', anchors: ['simulacro', 'simulacros', 'retirada', 'retiradas', 'retirar', 'recall', 'recuperación', 'mock'],
        reason: 'Ningún documento indexado describe el simulacro ni los pasos de una retirada de producto.', related: 'PNT-CAL-018' },
      { id: 'defensa', topic: 'Defensa alimentaria', anchors: ['defensa alimentaria', 'food defense', 'sabotaje', 'intrusión', 'vulnerabilidad', 'fraude'],
        reason: 'Ningún documento indexado trata la defensa alimentaria ni la vulnerabilidad al fraude.' },
      { id: 'residuos', topic: 'Residuos de plaguicidas y contaminantes', anchors: ['plaguicidas', 'pesticidas', 'residuos', 'clorato', 'cloratos', 'fitosanitarios', 'nitratos', 'micotoxinas', 'metales pesados'],
        reason: 'Ningún documento indexado trata el control de residuos de plaguicidas, clorato u otros contaminantes.' },
      { id: 'certificados', topic: 'Certificados y auditorías', anchors: ['certificado', 'certificados', 'certificación', 'certificaciones', 'ifs', 'brcgs', 'brc', 'fssc', 'auditoría', 'auditorías', 'auditor'],
        reason: 'Los certificados y los informes de auditoría no están entre los documentos indexados.' },
      { id: 'sostenibilidad', topic: 'Sostenibilidad', anchors: ['sostenibilidad', 'huella', 'carbono', 'co2', 'emisiones', 'reciclaje', 'reciclable'],
        reason: 'Ningún documento indexado trata la sostenibilidad ni la huella ambiental.' },
      { id: 'precio', topic: 'Precios y costes', anchors: ['precio', 'precios', 'cuesta', 'cuestan', 'coste', 'costes', 'costo', 'tarifa', 'euros', 'facturación', 'margen'],
        reason: 'Precios y costes no forman parte de los procedimientos de Calidad indexados.' },
      { id: 'personal', topic: 'Condiciones laborales', anchors: ['vacaciones', 'nómina', 'salario', 'sueldo', 'convenio', 'plantilla', 'contrato', 'despido', 'horario'],
        reason: 'Las condiciones laborales no forman parte de los procedimientos de Calidad indexados.' }
    ]
  }
});

/* Resumen canónico por código (CN_DATA.procedures): se completa sin pisar lo que ya hayan puesto otros ficheros.
   PNT-CAL-012 lleva además los parámetros que usan otras escenas (umbrales y pasos de evaluación). */
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
    'PNT-CAL-012': {
      limit_c: -18.0,
      critical_c: -15.0,
      min_minutes_for_hold: 15,
      evaluation: [
        'Medir la temperatura de producto con sonda en los palés expuestos (capa exterior y centro)',
        'Análisis sensorial y de aspecto (cristales de hielo, apelmazado) por lote',
        'Decisión de destino por lote: liberar, reclasificar o destruir'
      ]
    }
  };
  Object.keys(extra).forEach((code) => {
    const cur = procs[code] = procs[code] || {};
    Object.keys(extra[code]).forEach((k) => { if (cur[k] == null) cur[k] = extra[code][k]; });
  });
})('congelados');
