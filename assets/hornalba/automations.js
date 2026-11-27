/*
 * Hornalba · automatizaciones de extremo a extremo (escena «Crear automatización»).
 * steps: [id, columna, tipo, título, detalle, sistemas, resultado de la prueba, tono]
 * edges: [desde, hasta, etiqueta] · read: [lo que pide la instrucción, pasos que genera]
 */
(function () {
  'use strict';
  window.HB.AUTOMATIONS = [
    {
      id: 'e2e', label: 'Avería crítica de extremo a extremo', name: 'Avería crítica: del PLC a la compra, la producción y la calidad',
      scope: '5 congeladores espiral en 4 países', match: /vibra|repuesto|spare|compras?|purchas|pedidos|orders|espiral|spiral/gi,
      text: 'Cuando un congelador espiral supere 7,1 mm/s de vibración o la intensidad del motor suba más de un 20 % durante 15 minutos, investiga la causa comparando con las máquinas gemelas de toda la red y con el histórico de averías en SAP PM. Si el repuesto no está en la planta, búscalo en el resto de plantas y, si tampoco está, prepara la solicitud de compra en SAP MM. Calcula con el MES qué pedidos se verían afectados, propón moverlos a otra línea y replanifica las cargas en el sistema de transporte. Calidad debe retener en el almacén el producto que haya pasado por el túnel fuera de temperatura y pedir muestreo al laboratorio. Pide aprobación a la jefatura de planta antes de reducir la velocidad, y a Compras si la compra supera 5.000 €. Después crea la orden de trabajo, avisa al turno por Teams y comprueba a los 30 minutos que la vibración baja; si no baja, escala a la dirección global.',
      steps: [
        ['t', 0, 'trigger', 'Vibración o intensidad altas', '15 min seguidos', ['Edge', 'Histórico de series'], 'VCZ-L3-ESP-01: 7,6 mm/s e intensidad +23 %', 'crit'],
        ['d', 1, 'agent', 'Diagnóstico entre gemelas', 'Causa probable', ['Histórico de series', 'SAP PM'], 'Misma curva que la avería de Nowa Wola en marzo', 'warn'],
        ['r', 2, 'agent', 'Buscar repuesto', 'En toda la red', ['Almacén de repuestos'], 'Sin stock local · 2 unidades en La Ribera', 'warn'],
        ['p', 2, 'agent', 'Impacto en producción', 'Pedidos afectados', ['MES', 'Plan de producción'], '2 órdenes de producción afectadas', 'ok'],
        ['q', 2, 'action', 'Retener producto', 'Fuera de temperatura', ['WMS'], 'Ningún palé fuera de temperatura en el periodo', 'ok'],
        ['h', 3, 'decision', '¿Hay repuesto?', 'En alguna planta', [], 'Sí, en La Ribera: no hace falta comprar', 'ok'],
        ['l', 3, 'action', 'Replanificar cargas', 'Transporte', ['TMS', 'MES'], 'Cargas sin cambios', 'ok'],
        ['s', 3, 'action', 'Muestreo', 'Laboratorio', ['LIMS'], 'Muestra preventiva solicitada', 'ok'],
        ['c', 4, 'action', 'Solicitud de compra', 'Solo si no hay stock', ['SAP MM'], 'No se ejecuta: hay stock en la red', 'skip'],
        ['a', 4, 'approval', 'Jefatura de planta', 'Reducir velocidad', ['Teams'], '', 'warn'],
        ['b', 5, 'approval', 'Compras', 'Si supera 5.000 €', ['Teams'], 'No se pide: no hay compra', 'skip'],
        ['v', 5, 'action', 'Reducir velocidad', 'Dentro de límites', ['Edge'], 'Consigna al 92 % preparada', 'ok'],
        ['o', 6, 'output', 'Orden y aviso al turno', 'Con la evidencia', ['SAP PM', 'Teams'], 'Orden y mensaje listos', 'ok'],
        ['w', 7, 'decision', '¿Baja en 30 min?', 'Verificación', ['Histórico de series'], 'Previsto: 5,9 mm/s', 'ok'],
        ['x', 8, 'output', 'Escalar a dirección', 'Dirección global', ['Outlook'], 'No haría falta', 'skip'],
        ['z', 8, 'output', 'Cerrar y aprender', 'Actualiza el modelo', ['SAP PM', 'Gestor documental'], 'Caso añadido al histórico de la red', 'ok']
      ],
      edges: [['t', 'd'], ['d', 'r'], ['d', 'p'], ['d', 'q'], ['r', 'h'], ['p', 'l'], ['q', 's'], ['h', 'c', 'No'], ['h', 'a', 'Sí'], ['l', 'a'], ['s', 'a'], ['c', 'b'], ['a', 'v'], ['b', 'o'], ['v', 'o'], ['o', 'w'], ['w', 'x', 'No'], ['w', 'z', 'Sí']],
      read: [['Detectar la avería', ['t']], ['Investigar la causa en toda la red', ['d']], ['Asegurar el repuesto y comprar si falta', ['r', 'h', 'c']], ['Proteger pedidos y transporte', ['p', 'l']], ['Proteger la calidad del producto', ['q', 's']], ['Aprobaciones antes de actuar', ['a', 'b']], ['Actuar, avisar y verificar', ['v', 'o', 'w', 'x', 'z']]],
      limits: ['La velocidad solo puede moverse entre el 85 % y el 100 %', 'Ninguna escritura en el PLC sin aprobación de la jefatura de planta', 'Compras aprueba cualquier pedido superior a 5.000 €', 'Los sistemas de seguridad no se tocan']
    },
    {
      id: 'frio', label: 'Excursión de frío y clientes', name: 'Excursión de frío: lotes, retención, clientes y autoridad',
      scope: 'Todas las espirales de la red', match: /temperatura|temperature|[-−]18|lotes?|batch|calidad|quality|clientes?|customer|desescarche|defrost/gi,
      text: 'Si la temperatura de salida del producto de cualquier espiral supera −18 °C durante más de 5 minutos, o hay un desescarche fuera de ciclo en plena producción, identifica en el MES los lotes fabricados en esa ventana y localiza cada caja en el almacén y en las expediciones. Bloquea de inmediato lo que siga en nuestros almacenes, pide muestreo al laboratorio y revisa si el programa del PLC ha cambiado. Para lo ya entregado, saca del CRM los clientes afectados y prepara el aviso en su idioma, pero no lo envíes sin la aprobación de Calidad. Si hay riesgo para el consumidor, convoca al comité de crisis y prepara el expediente para la autoridad. Abre la orden de mantenimiento, genera el borrador del informe 8D con la evidencia de los PLC y envía a Calidad un resumen cada hora hasta el cierre.',
      steps: [
        ['t', 0, 'trigger', 'Producto sobre −18 °C', 'O desescarche en producción', ['Edge', 'SCADA'], 'BNL-L2-ESP-01: salida a −11 °C el 18/11', 'crit'],
        ['m', 1, 'agent', 'Lotes de la ventana', 'Qué se fabricó', ['MES'], '2 lotes y 414 cajas', 'warn'],
        ['w', 2, 'agent', 'Localizar cajas', 'Almacén y expediciones', ['WMS', 'TMS'], '308 en almacén · 106 entregadas', 'warn'],
        ['p', 2, 'agent', 'Revisar el PLC', 'Cambios de programa', ['Repositorio de programas'], 'Sin cambios', 'ok'],
        ['b', 3, 'action', 'Bloquear stock propio', 'Inmediato', ['WMS'], '308 cajas quedarían bloqueadas', 'ok'],
        ['l', 3, 'action', 'Muestreo', 'Laboratorio', ['LIMS'], 'Muestras pedidas a laboratorio', 'ok'],
        ['c', 3, 'agent', 'Clientes afectados', 'Aviso en su idioma', ['CRM'], '2 clientes · borradores en inglés', 'ok'],
        ['o', 3, 'output', 'Orden de mantenimiento', 'Válvula de desescarche', ['SAP PM'], 'Orden preparada', 'ok'],
        ['r', 4, 'decision', '¿Riesgo al consumidor?', 'Según Calidad y laboratorio', [], 'No declarado: pendiente de muestras', 'warn'],
        ['a', 4, 'approval', 'Calidad', 'Antes de avisar', ['Teams'], '', 'warn'],
        ['k', 5, 'output', 'Comité y expediente', 'Solo si hay riesgo', ['Gestor documental', 'Teams'], 'No se ejecuta de momento', 'skip'],
        ['e', 5, 'output', 'Avisar a clientes', 'Tras aprobación', ['Outlook', 'CRM'], 'Avisos listos, sin enviar', 'ok'],
        ['z', 6, 'output', '8D y resumen horario', 'Hasta el cierre', ['Gestor documental', 'Outlook'], 'Borrador 8D con la curva del PLC', 'ok']
      ],
      edges: [['t', 'm'], ['m', 'w'], ['m', 'p'], ['w', 'b'], ['w', 'l'], ['w', 'c'], ['p', 'o'], ['l', 'r'], ['c', 'a'], ['r', 'k', 'Sí'], ['a', 'e'], ['k', 'z'], ['e', 'z']],
      read: [['Detectar la desviación de frío', ['t']], ['Saber qué lotes y dónde están', ['m', 'w']], ['Contener el producto', ['b', 'l']], ['Descartar un cambio en el PLC', ['p']], ['Avisar a clientes con aprobación', ['c', 'a', 'e']], ['Escalar si hay riesgo sanitario', ['r', 'k']], ['Reparar y documentar', ['o', 'z']]],
      limits: ['El bloqueo interno es automático; liberar producto lo decide Calidad', 'Ningún aviso a clientes ni a la autoridad sin aprobación', 'La evidencia del PLC se guarda sin modificar']
    },
    {
      id: 'ciber', label: 'Ciberseguridad de los PLC', name: 'Cambio no autorizado en un PLC: respuesta de ciberseguridad',
      scope: 'Todos los autómatas registrados', match: /ciber|cyber|huella|fingerprint|SIEM|VPN|NIS2|accesos?|access|sin una orden|without an approved/gi,
      text: 'Vigila la huella de todos los programas de PLC y los accesos de ingeniería. Si un programa cambia sin una orden aprobada en SAP PM, cruza en el SIEM y en el directorio de usuarios quién se ha conectado, desde dónde y a qué hora, incluidas las conexiones remotas de fabricantes por VPN. Compara bloque a bloque con la última copia válida, marca si se han tocado bloques de seguridad y revisa en el MES qué producto se ha fabricado desde el cambio. Propón aislar la red industrial de la planta, pero no lo hagas sin la decisión del responsable de ciberseguridad. Si se confirma el incidente, prepara la notificación NIS2 para las primeras 24 horas, restaura la copia válida junto con Ingeniería, pide a Calidad que retenga la producción afectada y registra toda la evidencia.',
      steps: [
        ['t', 0, 'trigger', 'Huella o acceso anómalo', 'Revisión continua', ['Repositorio de programas', 'Edge'], '1 cambio detectado en Pinewood', 'warn'],
        ['d', 1, 'decision', '¿Orden aprobada?', 'Cambio autorizado', ['SAP PM'], 'En la prueba se simula que no existe', 'crit'],
        ['y', 2, 'output', 'Archivar', 'Cambio autorizado', ['Gestor documental'], 'No aplica en esta prueba', 'skip'],
        ['u', 2, 'agent', 'Quién y desde dónde', 'Incluye fabricantes', ['SIEM', 'Directorio de usuarios', 'VPN'], 'Acceso remoto de fabricante a las 01:52', 'warn'],
        ['c', 2, 'agent', 'Comparar bloques', 'Con la copia válida', ['Repositorio de programas'], '2 bloques distintos · seguridad intacta', 'warn'],
        ['m', 2, 'agent', 'Producto desde el cambio', 'Lotes expuestos', ['MES'], '1 lote en curso', 'warn'],
        ['a', 3, 'approval', 'Ciberseguridad', 'Aislar la red', ['Teams'], '', 'warn'],
        ['i', 4, 'decision', '¿Incidente confirmado?', 'Criterio humano', [], 'Confirmado en el escenario de prueba', 'crit'],
        ['n', 5, 'output', 'Notificación NIS2', 'Primeras 24 h', ['Gestor documental', 'Outlook'], 'Borrador listo, sin enviar', 'ok'],
        ['r', 5, 'action', 'Restaurar copia válida', 'Con Ingeniería', ['Repositorio de programas'], 'Copia verificada disponible', 'ok'],
        ['h', 5, 'action', 'Retener producción', 'Calidad', ['WMS', 'LIMS'], 'Lote marcado para retención', 'ok'],
        ['z', 6, 'output', 'Evidencia y lecciones', 'Expediente', ['Gestor documental'], 'Cronología completa guardada', 'ok']
      ],
      edges: [['t', 'd'], ['d', 'y', 'Sí'], ['d', 'u', 'No'], ['d', 'c'], ['d', 'm'], ['u', 'a'], ['c', 'a'], ['m', 'a'], ['a', 'i'], ['i', 'n', 'Sí'], ['i', 'r'], ['i', 'h'], ['n', 'z'], ['r', 'z'], ['h', 'z']],
      read: [['Detectar cambios y accesos', ['t', 'd', 'y']], ['Identificar el origen', ['u']], ['Medir el alcance del cambio', ['c', 'm']], ['Aislar solo con decisión humana', ['a', 'i']], ['Notificar y restaurar', ['n', 'r']], ['Proteger el producto y la evidencia', ['h', 'z']]],
      limits: ['El agente nunca corta la red ni carga programas', 'La restauración la hace Ingeniería con la herramienta del fabricante', 'La notificación a la autoridad la firma una persona']
    },
    {
      id: 'energia', label: 'Energía, producción y turnos', name: 'Corte o pico de precio: energía, frío, producción y turnos',
      scope: '13 plantas', match: /energ|electricidad|electricity|corte|power cut|MWh|turnos?|shifts?|preenfri|pre-cool/gi,
      text: 'Cada día, y siempre que la distribuidora anuncie un corte o el precio de la electricidad vaya a superar 180 €/MWh, cruza la previsión de energía con el plan de producción, el estado de las cámaras y la salud de las máquinas. Calcula cuánto se puede preenfriar para aguantar sin pasar de −18 °C, qué líneas conviene adelantar o retrasar y qué turnos habría que cambiar en el sistema de personal. Comprueba en el sistema de transporte que los camiones frigoríficos pueden seguir el nuevo plan y estima el ahorro y el CO₂. Pide aprobación a la jefatura de planta para cambiar las consignas de frío dentro de límites y a Recursos Humanos para los turnos. Aplica el plan, vigila las temperaturas cada minuto, deshazlo si alguna cámara se acerca al límite y deja el resultado en el informe de sostenibilidad.',
      steps: [
        ['t', 0, 'trigger', 'Corte o precio alto', 'Más de 180 €/MWh', ['Mercado eléctrico', 'BMS'], 'Pico previsto mañana de 18:00 a 21:00', 'warn'],
        ['f', 1, 'agent', 'Previsión de frío', 'Cámaras y consumo', ['Histórico de series', 'BMS'], 'Las cámaras aguantan 3 h con preenfriado', 'ok'],
        ['l', 2, 'agent', 'Reordenar líneas', 'Adelantar o retrasar', ['Plan de producción', 'MES'], '2 líneas adelantan 4 horas', 'ok'],
        ['h', 2, 'agent', 'Salud de máquinas', 'Evitar equipos en riesgo', ['SAP PM', 'Histórico de series'], 'Se excluye un compresor en vigilancia', 'warn'],
        ['p', 2, 'agent', 'Preenfriado posible', 'Sin pasar de −18 °C', ['SCADA'], 'Bajar a −24 °C entre 14:00 y 18:00', 'ok'],
        ['u', 3, 'agent', 'Cambios de turno', 'Personas necesarias', ['Sistema de personal'], '6 personas cambian de turno', 'ok'],
        ['r', 3, 'agent', 'Transporte frigorífico', 'Nuevo horario', ['TMS'], '3 camiones reprogramables', 'ok'],
        ['e', 3, 'agent', 'Ahorro y CO₂', 'Estimación', ['Mercado eléctrico'], 'Ahorro estimado: 4.200 € y 6 t de CO₂', 'ok'],
        ['b', 4, 'approval', 'Recursos Humanos', 'Turnos', ['Teams'], '', 'warn'],
        ['a', 4, 'approval', 'Jefatura de planta', 'Consignas de frío', ['Teams'], '', 'warn'],
        ['x', 5, 'action', 'Aplicar el plan', 'Dentro de límites', ['Edge', 'MES', 'Sistema de personal'], 'Plan preparado para aplicar', 'ok'],
        ['d', 6, 'decision', '¿Cámara cerca del límite?', 'Cada minuto', ['SCADA'], 'Ninguna en la simulación', 'ok'],
        ['v', 7, 'action', 'Deshacer el cambio', 'Vuelta a consignas', ['Edge'], 'No haría falta', 'skip'],
        ['z', 7, 'output', 'Informe de sostenibilidad', 'Ahorro y emisiones', ['Gestor documental', 'Power BI'], 'Dato registrado', 'ok']
      ],
      edges: [['t', 'f'], ['f', 'p'], ['f', 'l'], ['f', 'h'], ['p', 'e'], ['l', 'u'], ['l', 'r'], ['h', 'r'], ['u', 'b'], ['r', 'a'], ['e', 'a'], ['a', 'x'], ['b', 'x'], ['x', 'd'], ['d', 'v', 'Sí'], ['d', 'z', 'No']],
      read: [['Anticipar el corte o el precio', ['t', 'f']], ['Planificar el frío', ['p', 'h']], ['Reordenar producción, turnos y transporte', ['l', 'u', 'r']], ['Estimar el beneficio', ['e']], ['Dos aprobaciones distintas', ['a', 'b']], ['Aplicar, vigilar y deshacer', ['x', 'd', 'v']], ['Dejar constancia', ['z']]],
      limits: ['Ninguna cámara puede superar −18 °C', 'Los cambios de turno requieren Recursos Humanos', 'Cualquier cambio se puede deshacer en un clic']
    },
    {
      id: 'alta', label: 'Alta de una planta nueva', name: 'Alta de una planta adquirida: de los PLC a la dirección',
      scope: 'Plantas que se incorporan', match: /planta nueva|new plant|descubre|discover|activos?|assets?|adquirid|acquir|incorpor|joins?/gi,
      text: 'Cuando se incorpore una planta nueva, descubre en modo lectura todos los PLC, variadores y redes, y crea cada activo en SAP PM con su jerarquía de planta, línea y máquina. Haz copia de todos los programas, compara el firmware con los avisos de seguridad y marca lo que esté fuera de soporte. Propón el nombre común de cada variable usando las plantas ya conectadas como referencia y envía a Ingeniería solo las dudosas. Importa manuales y esquemas al gestor documental, copia los planes de mantenimiento de las máquinas gemelas y comprueba qué repuestos críticos faltan para pedirlos en SAP MM. Aprende con cuatro semanas de datos antes de enviar ningún aviso y presenta cada viernes a la dirección el avance, los riesgos y la inversión necesaria.',
      steps: [
        ['t', 0, 'trigger', 'Planta incorporada', 'Alta en el registro', ['Registro de activos'], 'Redfield en proceso de alta', 'ok'],
        ['d', 1, 'agent', 'Descubrir PLC y redes', 'Solo lectura', ['Edge'], '117 autómatas esperados · 71 vistos', 'warn'],
        ['a', 2, 'action', 'Crear activos', 'Planta, línea, máquina', ['SAP PM', 'Registro de activos'], 'Jerarquía propuesta para 109 máquinas', 'ok'],
        ['b', 2, 'action', 'Copiar programas', 'Todos los PLC', ['Repositorio de programas'], '29 sin copia localizada', 'crit'],
        ['n', 2, 'agent', 'Nombrar variables', 'Según otras plantas', ['Registro de activos'], '81 % con confianza alta', 'ok'],
        ['m', 2, 'agent', 'Manuales y esquemas', 'Importar', ['Gestor documental'], 'Faltan esquemas del área de hornos', 'warn'],
        ['p', 3, 'agent', 'Planes de gemelas', 'Mantenimiento', ['SAP PM'], 'Planes copiados para 74 máquinas', 'ok'],
        ['f', 3, 'agent', 'Firmware y soporte', 'Avisos de seguridad', ['SIEM'], '6 autómatas fuera de soporte', 'warn'],
        ['v', 3, 'approval', 'Ingeniería', 'Variables dudosas', ['Teams'], '', 'warn'],
        ['r', 4, 'action', 'Repuestos críticos', 'Pedir lo que falta', ['Almacén de repuestos', 'SAP MM'], '12 referencias sin stock', 'warn'],
        ['l', 4, 'agent', 'Aprender 4 semanas', 'Sin avisos', ['Histórico de series'], 'Periodo de aprendizaje programado', 'ok'],
        ['z', 5, 'output', 'Informe de los viernes', 'Avance, riesgo e inversión', ['Power BI', 'Outlook'], 'Primer informe preparado', 'ok']
      ],
      edges: [['t', 'd'], ['d', 'a'], ['d', 'b'], ['d', 'n'], ['d', 'm'], ['a', 'p'], ['b', 'f'], ['n', 'v'], ['p', 'r'], ['v', 'l'], ['r', 'z'], ['f', 'z'], ['l', 'z']],
      read: [['Descubrir sin tocar nada', ['t', 'd']], ['Dar de alta los activos', ['a', 'm']], ['Asegurar programas y firmware', ['b', 'f']], ['Unificar nombres con revisión humana', ['n', 'v']], ['Preparar mantenimiento y repuestos', ['p', 'r']], ['Aprender antes de avisar e informar', ['l', 'z']]],
      limits: ['Descubrimiento solo en lectura y en ventana autorizada', 'Los pedidos se proponen; Compras los aprueba', 'Ningún aviso automático durante el aprendizaje']
    }
  ];
})();
