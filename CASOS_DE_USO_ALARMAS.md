# 30 casos de uso de IA en la instalación y el mantenimiento de alarmas

Escenario de la demo `alarmas`: **Guardián Ibérica Instalaciones, S.L.U.** (ficticia), instalador y mantenedor multimarca
con hub en Paterna (Valencia) y contratos de partner con **Verisure**, **Sector Alarm** y **Prosegur Alarmas**.
Las marcas se citan solo como marcas de contrato y portales de partner; todas las cifras, personas y lotes son ficticios.

Los casos siguen el mismo patrón que los de las demás industrias: un agente prepara el trabajo, el humano aprueba
antes de que se escriba nada en un sistema. Los cinco primeros bloques corresponden a las cinco escenas de caso de la
consola (alarma, reclamación, simulacro de trazabilidad, cuestionario y procedimientos). El sexto reúne el resumen de
turno, la planificación y el análisis. Los casos marcados con **★** están representados en la demo.

| Columna | Significado |
|---|---|
| Agente | Capacidad que hace el trabajo |
| Sistemas | Lo que lee o propone escribir |
| Aprueba | Persona que decide antes de ejecutar |

## A. Incidencias y alarmas operativas (escena «Alarma con aprobación»)

| # | Caso de uso | Qué hace el agente | Sistemas | Aprueba |
|---|---|---|---|---|
| 1 | ★ Caída masiva de comunicación de paneles (ALM-COM-0611) | Detecta 214 paneles 4G sin señal, agrupa por operador y zona, propone conmutar a vía IP de respaldo y avisar a clientes | Portales de partner, Salesforce, Twilio | Responsable de soporte técnico |
| 2 | Pico de falsas alarmas por zona o por modelo | Detecta un aumento anómalo frente a la media, cruza modelo de detector y versión de firmware y propone una revisión remota | Portales de partner, Salesforce | Responsable de soporte técnico |
| 3 | Batería baja o sabotaje sin atender | Prioriza paneles con aviso de batería o tamper sin gestionar en 24 h y crea la visita preventiva | Portales de partner, Samsara | Jefe de mantenimiento |
| 4 | Saturación de agenda de técnicos | Detecta ausencias, reasigna órdenes de trabajo por zona y cualificación y avisa a los clientes movidos | SAP Business One, Samsara, Twilio | Jefe de instalaciones |
| 5 | Stock crítico de equipos y consumibles | Compara consumo previsto con stock de centrales, teclados, detectores y baterías y propone el pedido al distribuidor | SAP Business One | Responsable de almacén |
| 6 | Vehículo de técnico fuera de ruta o parado | Detecta desvíos y retrasos de la ruta del día, replanifica las visitas y avisa al cliente con nueva hora | Samsara, Twilio | Jefe de instalaciones |

## B. Reclamaciones y atención al cliente (escena «Reclamación de cliente»)

| # | Caso de uso | Qué hace el agente | Sistemas | Aprueba |
|---|---|---|---|---|
| 7 | ★ Cargos por falsas alarmas (CLM-2026-0619) | Lee el correo, recupera el historial del contrato y de los sensores, localiza la causa raíz y redacta la respuesta con abono propuesto | Salesforce, portales de partner | Atención al cliente |
| 8 | Baja con penalización | Calcula permanencia y penalización, comprueba incidencias previas imputables al servicio y propone mantener, ajustar o ejecutar la baja | Salesforce, portales de partner | Responsable de operaciones |
| 9 | Reclamación por demora de instalación | Cruza fecha comprometida, disponibilidad de equipo y agenda; propone compensación y fecha cierta | SAP Business One, Salesforce | Jefe de instalaciones |
| 10 | Reclamación por cobro duplicado o error de factura | Concilia recibos y contrato, detecta el doble cobro y prepara el abono y la carta | SAP Business One, Salesforce | Responsable de finanzas |
| 11 | Queja por trato del técnico | Reúne parte de trabajo, fotos y llamadas; clasifica la queja y propone medida y respuesta | Salesforce, Google Workspace | Atención al cliente |
| 12 | Clasificación y respuesta de los correos entrantes | Etiqueta cada correo (avería, baja, factura, reclamación), detecta urgencia y prepara borrador | Google Workspace, Salesforce | Atención al cliente |

## C. Calidad, producto y trazabilidad (escena «Simulacro de trazabilidad»)

| # | Caso de uso | Qué hace el agente | Sistemas | Aprueba |
|---|---|---|---|---|
| 13 | ★ Retirada de un lote de detectores (REC-2026-1019) | Localiza el lote PIR-2607-A en 912 hogares y 3 marcas, agrupa por marca y zona y prepara avisos y visitas | SAP Business One, Salesforce, portales de partner | Responsable de operaciones |
| 14 | Aviso de seguridad del fabricante | Lee el comunicado, identifica modelos y números de serie afectados en la cartera y propone el plan | Salesforce, SAP Business One | Responsable de operaciones |
| 15 | Fallo recurrente de un modelo | Detecta repetición de averías por modelo y lote de fabricación y abre la reclamación al proveedor con evidencias | Salesforce, SAP Business One | Jefe de mantenimiento |
| 16 | Devolución y recepción de equipos retirados | Registra los equipos devueltos, comprueba estado y decide reutilización, reparación o baja | SAP Business One | Responsable de almacén |
| 17 | Trazabilidad instalación a instalación | Reconstruye qué equipos, de qué lote y por qué técnico se instalaron en un domicilio | Salesforce, SAP Business One | Jefe de instalaciones |
| 18 | Verificación de la calidad de una instalación | Revisa fotos y checklist del técnico, detecta incumplimientos de la norma de instalación y pide corrección | Salesforce, Google Workspace | Jefe de instalaciones |

## D. Cumplimiento y homologación (escena «Cuestionario de cliente»)

| # | Caso de uso | Qué hace el agente | Sistemas | Aprueba |
|---|---|---|---|---|
| 19 | ★ Homologación anual de instalador partner (HOM-2026-031) | Responde el cuestionario con evidencias propias citadas: habilitación, normas UNE-EN 50131, seguros y formación | Google Workspace, documentación interna | Responsable de cumplimiento |
| 20 | Auditoría de calidad de un partner | Prepara el dosier de muestras de instalaciones y mantenimientos solicitado por la marca | Salesforce, portales de partner | Responsable de operaciones |
| 21 | Cumplimiento RGPD y videoverificación | Comprueba contratos de encargado, cartelería, conservación de imágenes y registros de acceso | Google Workspace, Salesforce | DPO |
| 22 | Vigencia de habilitaciones y certificados | Vigila caducidades de habilitaciones, carnés de técnico, seguros y calibraciones y avisa con antelación | Google Workspace, SAP Business One | Responsable de cumplimiento |
| 23 | Respuesta a requerimientos de aseguradoras | Prepara certificados de instalación y mantenimiento para clientes que los piden a su aseguradora | Salesforce, Google Workspace | Atención al cliente |

## E. Procedimientos y conocimiento (escena «Procedimientos con citas»)

| # | Caso de uso | Qué hace el agente | Sistemas | Aprueba |
|---|---|---|---|---|
| 24 | ★ Consulta con citas a procedimientos (PR-INS, PR-MAN, PR-SOP…) | Responde al técnico o al operador citando el párrafo exacto del procedimiento vigente | Documentación interna | Autoservicio, con cita |
| 25 | Asistente de campo para técnicos | Guía la puesta en marcha paso a paso y resuelve dudas de cableado, zonas y programación de cada marca | Documentación interna, Salesforce | Autoservicio, con cita |
| 26 | Guion para soporte técnico | Sugiere al operador el diagnóstico probable y el siguiente paso mientras habla con el cliente | Salesforce, portales de partner | Responsable de soporte técnico |
| 27 | Detección de procedimientos desfasados | Compara los procedimientos con las circulares de las marcas y la normativa y propone la revisión | Documentación interna | Responsable de operaciones |

## F. Turno, planificación y análisis (escenas «Resumen del turno» y «De palabras a workflow»)

| # | Caso de uso | Qué hace el agente | Sistemas | Aprueba |
|---|---|---|---|---|
| 28 | ★ Resumen del turno de operaciones | Resume instalaciones, mantenimientos, urgencias y riesgos del día con enlace a cada caso | Salesforce, SAP Business One, Samsara | Responsable de operaciones |
| 29 | ★ De palabras a workflow | Convierte una instrucción («si un panel pierde comunicación más de 30 min, avisa y abre visita») en un flujo revisable con prueba en seco | Editor de workflows | Responsable de operaciones |
| 30 | Previsión de demanda y de capacidad | Estima altas, mantenimientos y averías por zona y propone plantilla, rutas y compras | Salesforce, SAP Business One, Samsara | Responsable de finanzas |

## Cómo se ha construido la lista

- Cada caso responde a una tarea real de un instalador multimarca: la operación diaria, la relación con el cliente, el producto,
  el cumplimiento con las marcas y la normativa, el conocimiento y la planificación.
- Los 7 casos con ★ aparecen en las escenas de la consola de esta industria; el resto es el catálogo que se puede activar a continuación.
- Todos conservan la regla de las demás demos: el agente lee y prepara, y una persona aprueba antes de escribir en un sistema o avisar a un cliente.
- Las referencias a normativa (Ley 5/2014 de Seguridad Privada, Orden INT/316/2011, UNE-EN 50131, RGPD) deben validarse con el asesor
  jurídico antes de usarse fuera de la demo.
