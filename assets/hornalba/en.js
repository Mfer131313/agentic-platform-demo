/*
 * Hornalba · catálogo en inglés, usado por assets/js/i18n.js.
 * Una línea por texto: español ¦ inglés. ⟦n⟧ marca la parte variable. Códigos, variables e identificadores no se traducen.
 */
window.CN_EN = (function (source) {
  'use strict';
  const out = {};
  source.split('\n').forEach((line) => {
    const i = line.indexOf(' ¦ ');
    if (i > 0) out[line.slice(0, i).trim()] = line.slice(i + 3).trim();
  });
  return out;
}(String.raw`
Saltar al contenido ¦ Skip to content
Esta demostración necesita JavaScript activado. ¦ This demonstration needs JavaScript enabled.
Navegación principal ¦ Main navigation
Agentic Platform · inicio ¦ Agentic Platform · home
Secciones ¦ Sections
Abrir la navegación ¦ Open navigation
Ruta ¦ Breadcrumb
Red global · Ingeniería y Mantenimiento ¦ Global network · Engineering and Maintenance
Operación global ¦ Global operations
Red de plantas ¦ Plant network
Máquinas y PLC ¦ Machines and PLCs
Ficha de máquina ¦ Machine record
Datos de PLC ¦ PLC data
Decisiones ¦ Decisions
Decisión pendiente ¦ Pending decision
Plan de mantenimiento ¦ Maintenance plan
Crear automatización ¦ Create automation
Preguntar a la red ¦ Ask the network
Gobierno y despliegue ¦ Governance and rollout
Agentes y autonomía ¦ Agents and autonomy
Arquitectura y piloto ¦ Architecture and pilot
Dirección global de Mantenimiento ¦ Global Maintenance Director
Sede central · hora CET ¦ Headquarters · CET time
Hora de la sede (CET) ¦ Headquarters time (CET)
Red global de plantas ¦ Global plant network
Demostración ¦ Demonstration
Presentador ¦ Presenter
Reiniciar demo ¦ Reset demo
Reiniciar ¦ Reset
Registro de auditoría ¦ Audit log
Acerca de esta demo ¦ About this demo
Modo presentador ¦ Presenter mode
Modo presentador (P) ¦ Presenter mode (P)
Cerrar el modo presentador ¦ Close presenter mode
Qué decir ¦ What to say
Siguiente clic ¦ Next click
Continuar con la siguiente escena. ¦ Continue to the next screen.
Inicio ¦ Start
Fin ¦ End
Tiempo ¦ Time
Poner a cero ¦ Reset timer
Animaciones ¦ Animations
Normal ¦ Normal
Rápidas ¦ Fast
Ritmo de las animaciones ¦ Animation speed
mostrar u ocultar ¦ show or hide
cambiar de escena ¦ change screen
Datos sintéticos · acciones simuladas ¦ Synthetic data · simulated actions
Empresa ficticia y datos sintéticos · acciones simuladas · preparado por MFM ¦ Fictitious company and synthetic data · simulated actions · prepared by MFM

13 de 26 plantas representadas ¦ 13 of 26 plants represented
⟦0⟧ países ¦ ⟦0⟧ countries
Jueves ⟦0⟧ · seguimiento por husos horarios ¦ Thursday ⟦0⟧ · follow-the-sun monitoring
Una decisión no puede esperar: congelador espiral de Valdecierzo, línea 3 ¦ One decision cannot wait: Valdecierzo spiral freezer, line 3
La vibración del motor ha pasado de 3,1 a 7,6 mm/s en 13 días. Si falla, la línea para unas 30 horas. ¦ Motor vibration has risen from 3.1 to 7.6 mm/s in 13 days. If it fails, the line stops for about 30 hours.
Revisar y decidir ¦ Review and decide
Plantas con datos en vivo ¦ Plants with live data
de 13 ¦ of 13
de 100 ¦ of 100
Redfield en proceso de alta ¦ Redfield being onboarded
Autómatas registrados ¦ Registered PLCs
⟦0⟧ máquinas ¦ ⟦0⟧ machines
Variables vigiladas ¦ Monitored signals
mil ¦ k
mil € ¦ k €
Lectura cada 1 a 5 segundos ¦ Read every 1 to 5 seconds
OEE ponderado de la red ¦ Weighted network OEE
Últimos 7 días (sintético) ¦ Last 7 days (synthetic)
Dónde está pasando algo ¦ Where something is happening
Número de plantas por país; el color es el peor estado. Pulsa para filtrar la tabla. ¦ Number of plants per country; the colour shows the worst status. Click to filter the table.
Ver todos los países ¦ Show all countries
Mapa de plantas por país ¦ Plant map by country
⟦0⟧: ⟦1⟧ plantas ¦ ⟦0⟧: ⟦1⟧ plant(s)
Plantas en ⟦0⟧ ¦ Plants in ⟦0⟧
Vigilar ¦ Watch
Actuar ¦ Act
Anoche en la red ¦ Overnight across the network
Horas en CET ¦ Times in CET
Vibración del motor de la espiral por encima de 7,1 mm/s ¦ Spiral drive motor vibration above 7.1 mm/s
El agente de diagnóstico propone un plan y espera aprobación. ¦ The diagnosis agent proposes a plan and is waiting for approval.
Plan aprobado y en ejecución. ¦ Plan approved and under way.
Propuesta rechazada; sigue en vigilancia. ¦ Proposal rejected; still under watch.
Descongelación fuera de ciclo en la espiral de la línea 2 ¦ Off-cycle defrost on the line 2 spiral freezer
3 paradas cortas en el turno de mañana local. Revisión propuesta para el sábado 05/12. ¦ 3 short stops in the local morning shift. Inspection proposed for Saturday 05/12.
Atascos repetidos en la envasadora ¦ Repeated jams on the packaging machine
El patrón coincide con desgaste de mordazas de sellado. Vida útil estimada: 17 días. ¦ The pattern matches sealing jaw wear. Estimated remaining life: 17 days.
Cambio de programa detectado y verificado ¦ Program change detected and verified
Coincide con la orden aprobada CAM-2026-0391. Copia guardada en el repositorio. ¦ It matches approved change order CAM-2026-0391. Backup saved to the repository.
Copia del programa del PLC caducada (116 días) ¦ PLC program backup out of date (116 days)
No se puede garantizar la recuperación ante fallo. Se pide copia en la próxima parada. ¦ Recovery after a failure cannot be guaranteed. A backup is requested at the next stop.
Alta de planta en curso: 71 de 117 PLC descubiertos ¦ Plant onboarding in progress: 71 of 117 PLCs discovered
Descubrimiento en modo lectura. Quedan variables por validar. ¦ Read-only discovery. Signals still to be validated.
Plantas ¦ Plants
Planta ¦ Plant
Pulsa una planta para ver sus máquinas y autómatas ¦ Click a plant to see its machines and PLCs
Hora local ¦ Local time
Máquinas en alerta ¦ Machines on alert
Conexión ¦ Connection
Conectado ¦ Connected
Con retardo ¦ Delayed
En alta ¦ Onboarding
España ¦ Spain
Francia ¦ France
Polonia ¦ Poland
Italia ¦ Italy
Alemania ¦ Germany
Estados Unidos ¦ United States
México ¦ Mexico
Vietnam ¦ Vietnam
Eschenfeld ¦ Eschenfeld
Valle Azul ¦ Valle Azul
ubicación a confirmar ¦ location to be confirmed
Pensilvania ¦ Pennsylvania
Colverde ¦ Colverde
Pan de masa madre ¦ Sourdough bread
Panadería ¦ Bread
Bollería ¦ Pastry
Bollería y brioche ¦ Pastry and brioche
Bollería y pastelería ¦ Pastry and cakes
Rosquillas y bollería ¦ Doughnuts and pastry
Una sola vista de las plantas, de Zaragoza a Vietnam, con la hora local de cada una. ¦ A single view of the plants, from Zaragoza to Vietnam, each with its local time.
El grupo tiene 26 plantas; aquí representamos 13. Todo es ficticio. ¦ The group has 26 plants; 13 are represented here. Everything is fictitious.
La noche ya está resumida: lo que exige una decisión aparece primero. ¦ The night is already summarised: whatever needs a decision comes first.
Pulsa un país del mapa para filtrar y luego «Revisar y decidir». ¦ Click a country on the map to filter, then “Review and decide”.

Parque de máquinas y autómatas ¦ Machine and PLC fleet
Registro único de cada máquina y su PLC, sea cual sea el fabricante. ¦ A single register of every machine and its PLC, whatever the vendor.
Exportar registro (CSV) ¦ Export register (CSV)
Autómatas por fabricante ¦ PLCs by vendor
13 plantas representadas · cifras sintéticas ¦ 13 plants represented · synthetic figures
Riesgos en la muestra ¦ Risks in the sample
PLC con firmware pendiente ¦ PLCs with pending firmware
Copias de programa caducadas ¦ Out-of-date program backups
Máquinas a vigilar o actuar ¦ Machines to watch or act on
Fabricante del PLC ¦ PLC vendor
Fabricante ¦ Vendor
Todas ¦ All
Todos ¦ All
Buscar ¦ Search
Código, tipo, modelo o IP ¦ Code, type, model or IP
Mostrar ¦ Show
En alerta ¦ On alert
Con firmware pendiente ¦ Pending firmware
29 de 29 máquinas de la muestra ¦ 29 of 29 machines in the sample
⟦0⟧ de ⟦1⟧ máquinas de la muestra ¦ ⟦0⟧ of ⟦1⟧ machines in the sample
Ninguna máquina cumple los filtros. ¦ No machine matches the filters.
Máquina ¦ Machine
Autómata ¦ PLC
Última copia ¦ Last backup
Salud ¦ Health
Vida útil estimada ¦ Estimated remaining life
criticidad ¦ criticality
Línea ¦ Line
Servicios ¦ Utilities
Tipo ¦ Type
Disponible ⟦0⟧ ¦ Available: ⟦0⟧
Al día ¦ Up to date
Hoy ¦ Today
hoy ¦ today
Hace 1 día ¦ 1 day ago
Hace ⟦0⟧ día ¦ ⟦0⟧ day ago
Hace ⟦0⟧ días ¦ ⟦0⟧ days ago
⟦0⟧ días ¦ ⟦0⟧ days
días ¦ days
Índice de salud ⟦0⟧ de 100 ¦ Health index ⟦0⟧ of 100
Congelador espiral ¦ Spiral freezer
Horno túnel ¦ Tunnel oven
Horno de pisos ¦ Deck oven
Amasadora continua ¦ Continuous mixer
Amasadora brioche ¦ Brioche mixer
Amasadora espiral ¦ Spiral mixer
Envasadora flow-pack ¦ Flow-pack wrapper
Caldera de biomasa ¦ Biomass boiler
Compresor de aire ¦ Air compressor
Laminadora ¦ Laminating line
Cámara de fermentación ¦ Proofing chamber
Central frigorífica NH₃/CO₂ ¦ NH₃/CO₂ refrigeration plant
Central frigorífica CO₂ ¦ CO₂ refrigeration plant
Robot paletizador ¦ Palletising robot
Formadora de croissant ¦ Croissant moulder
Formadora de trenzas ¦ Braid forming machine
Freidora continua de rosquillas ¦ Continuous doughnut fryer
Glaseadora ¦ Glazing machine
Este es el inventario que hoy suele estar repartido entre portátiles, hojas de cálculo y la memoria de cada planta. ¦ This is the inventory that today is usually scattered across laptops, spreadsheets and each plant’s memory.
De cada autómata: modelo, firmware, red, programa y última copia, con independencia del fabricante. ¦ For every PLC: model, firmware, network, program and last backup, regardless of vendor.
La muestra son 29 máquinas; el diseño es el mismo para varios miles. ¦ The sample has 29 machines; the design is the same for several thousand.
Filtra por «Con firmware pendiente» y abre VCZ-L3-ESP-01. ¦ Filter by “Pending firmware” and open VCZ-L3-ESP-01.
Descargado: ⟦0⟧ ¦ Downloaded: ⟦0⟧

Ficha digital de máquina ¦ Digital machine record
Cambiar de máquina ¦ Switch machine
Hay una propuesta esperando tu decisión ¦ A proposal is waiting for your decision
Estado ¦ Status
Variables ¦ Signals
Programa y copias ¦ Program and backups
Historial ¦ History
Secciones de la ficha ¦ Record sections
Índice de salud ¦ Health index
Vida útil restante ¦ Remaining useful life
Sin riesgo ¦ No risk
Nada previsto en 90 días ¦ Nothing expected in 90 days
Estimación del modelo (sintética) ¦ Model estimate (synthetic)
Vibración ¦ Vibration
Vibración del motor de arrastre ¦ Drive motor vibration
Intensidad del motor de arrastre ¦ Drive motor current
Temperatura del rodamiento ¦ Bearing temperature
Consigna de velocidad de banda ¦ Belt speed setpoint
Tensión de banda ¦ Belt tension
Temperatura de aire del túnel ¦ Tunnel air temperature
Temperatura de salida del producto ¦ Product exit temperature
Potencia de ventiladores ¦ Fan power
Estado de la máquina ¦ Machine state
Cadena de seguridad (solo lectura) ¦ Safety chain (read only)
Temperatura zona ⟦0⟧ ¦ Zone ⟦0⟧ temperature
Tiempo de cocción ¦ Baking time
Caudal de gas ¦ Gas flow
Vibración del extractor ¦ Exhaust fan vibration
Vibración del motor principal ¦ Main motor vibration
Intensidad del motor principal ¦ Main motor current
Temperatura del motor ¦ Motor temperature
Consigna de velocidad ¦ Speed setpoint
Ciclos del turno ¦ Cycles this shift
ciclos ¦ cycles
Potencia activa ¦ Active power
MARCHA ¦ RUNNING
al cambiar ¦ on change
⟦0⟧ · últimos 14 días ¦ ⟦0⟧ · last 14 days
Media diaria ¦ Daily average
Aviso ⟦0⟧ ¦ Warning ⟦0⟧
Actuar ⟦0⟧ ¦ Act ⟦0⟧
Aviso 4,5 ¦ Warning 4.5
Actuar 7,1 ¦ Act 7.1
⟦0⟧: ⟦1⟧ lecturas de ⟦2⟧ a ⟦3⟧ ¦ ⟦0⟧: ⟦1⟧ readings from ⟦2⟧ to ⟦3⟧
Máquinas del mismo tipo ¦ Machines of the same type
Comparación entre plantas ¦ Comparison across plants
No hay otra igual en la muestra. ¦ There is no other like it in the sample.
Identificación ¦ Identification
Nombre ¦ Name
Modelo ¦ Model
Referencia ¦ Order number
Número de serie ¦ Serial number
Instalado ¦ Installed
Entradas y salidas ¦ Inputs and outputs
Red y funcionamiento ¦ Network and operation
Dirección IP ¦ IP address
Red industrial ¦ Industrial network
Protocolos ¦ Protocols
Herramienta de ingeniería ¦ Engineering tool
Tiempo de ciclo ¦ Cycle time
Carga de CPU ¦ CPU load
Equipo edge ¦ Edge device
· solo lectura salvo consignas autorizadas ¦ · read only except authorised setpoints
Variables en vivo ¦ Live signals
Valores simulados que se actualizan solos ¦ Simulated values, updating on their own
Leyendo ¦ Reading
Variable ¦ Signal
Dirección en el PLC ¦ Address in the PLC
Valor ¦ Value
Aviso / actuar ¦ Warning / act
Muestreo ¦ Sampling
Programa ⟦0⟧ ¦ Program ⟦0⟧
Programa ¦ Program
Cada versión queda guardada con su huella y la orden que la justifica ¦ Every version is stored with its fingerprint and the order that justifies it
Comparar con la anterior ¦ Compare with previous
Pedir copia ahora ¦ Back up now
Versión ¦ Version
Fecha ¦ Date
Origen ¦ Source
Justificación ¦ Justification
Huella ¦ Fingerprint
Copia automática ¦ Automatic backup
En producción ¦ In production
Ingeniería de planta ¦ Plant engineering
Fabricante de la máquina ¦ Machine builder
La última copia tiene 116 días ¦ The last backup is 116 days old
La última copia tiene ⟦0⟧ días ¦ The last backup is ⟦0⟧ days old
Si el autómata fallara hoy, se recuperaría una versión que puede no ser la que está en marcha. ¦ If the PLC failed today, the version recovered might not be the one currently running.
Alarma de vibración (7,1 mm/s) ¦ Vibration alarm (7.1 mm/s)
Detectada por el agente de vigilancia. ¦ Detected by the monitoring agent.
Aviso de vibración (4,5 mm/s) ¦ Vibration warning (4.5 mm/s)
Quedó en observación. ¦ Left under observation.
Engrase de rodamientos ¦ Bearing greasing
Orden preventiva cerrada. ¦ Preventive work order closed.
Cambio de programa ⟦0⟧ ¦ Program change ⟦0⟧
Ajuste de receta autorizado. ¦ Authorised recipe adjustment.
Puesta en marcha del autómata ¦ PLC commissioning
Revisión de turno sin hallazgos ¦ Shift check with no findings
Variables dentro de su comportamiento habitual. ¦ Signals within their usual behaviour.
Mantenimiento preventivo ¦ Preventive maintenance
Orden cerrada en SAP PM. ¦ Work order closed in SAP PM.
Aviso del agente de vigilancia ¦ Monitoring agent warning
Una variable se aleja de su comportamiento habitual. ¦ A signal is drifting from its usual behaviour.
Intervención aprobada ¦ Intervention approved
Velocidad reducida y orden de trabajo creada para el viernes. ¦ Speed reduced and work order created for Friday.
Cambios respecto a la versión anterior ¦ Changes since the previous version
La plataforma compara bloques y parámetros. No modifica el programa. ¦ The platform compares blocks and parameters. It does not modify the program.
Bloque o parámetro ¦ Block or parameter
Antes ¦ Before
Ahora ¦ Now
Orden ¦ Order
Receta / consigna de velocidad ¦ Recipe / speed setpoint
Temporizador de desescarche ¦ Defrost timer
Límite de intensidad (aviso) ¦ Current limit (warning)
21,0 A ¦ 21.0 A
22,0 A ¦ 22.0 A
Bloques de seguridad ¦ Safety blocks
Sin cambios ¦ No changes
Copia del programa guardada en el repositorio (simulado) ¦ Program backup saved to the repository (simulated)
Cada máquina tiene una ficha viva: estado, autómata, variables, programa e historial. ¦ Every machine has a live record: status, PLC, signals, program and history.
Las variables conservan la dirección original del PLC y además un nombre común para toda la red. ¦ Signals keep their original PLC address and also get a name shared across the network.
Con ese nombre común se comparan máquinas gemelas de países distintos. ¦ That shared name lets twin machines in different countries be compared.
Abre las pestañas «Variables» y «Programa y copias». ¦ Open the “Signals” and “Program and backups” tabs.

Cómo se recogen y guardan los datos de cada PLC ¦ How each PLC’s data is collected and stored
Lectura en planta, un nombre común para toda la red y un historial que sirve para decidir. ¦ Read at the plant, one naming standard for the whole network and a history you can decide on.
Recorrido del dato ¦ Data journey
PLC y variadores ¦ PLCs and drives
Siemens, Rockwell, Schneider… ¦ Siemens, Rockwell, Schneider…
Lee y guarda si cae la red ¦ Reads, buffers if offline
Espacio de nombres único ¦ Unified namespace
Mismo nombre en toda la red ¦ Same names network-wide
Activos y programas ¦ Assets and programs
Series y eventos ¦ Time series and events
Capa de agentes ¦ Agent layer
Vigila, diagnostica, planifica ¦ Watches, diagnoses, plans
Transporte ¦ Transport
Guardado ¦ Storage
Decisión ¦ Decision
Disparador ¦ Trigger
Agente ¦ Agent
Aprobación ¦ Approval
Salida ¦ Output
Acción ¦ Action
Condición ¦ Condition
Disparador: ⟦0⟧ ¦ Trigger: ⟦0⟧
Agente: ⟦0⟧ ¦ Agent: ⟦0⟧
Aprobación: ⟦0⟧ ¦ Approval: ⟦0⟧
Salida: ⟦0⟧ ¦ Output: ⟦0⟧
Acción: ⟦0⟧ ¦ Action: ⟦0⟧
Condición: ⟦0⟧ ¦ Condition: ⟦0⟧
Qué se guarda de cada autómata ¦ What is stored for each PLC
Propuesta de modelo de datos; frecuencias y plazos a acordar con cada planta ¦ Proposed data model; frequencies and retention to be agreed with each plant
Bloque ¦ Section
Datos ¦ Data
Frecuencia ¦ Frequency
Conservación ¦ Retention
Identidad ¦ Identity
Registro de activos ¦ Asset registry
Planta, línea, máquina, fabricante, modelo, referencia, número de serie, firmware ¦ Plant, line, machine, vendor, model, order number, serial number, firmware
Descubrimiento + SAP PM ¦ Discovery + SAP PM
Al alta y ante cambios ¦ At onboarding and on change
Vida del activo ¦ Asset lifetime
Red y accesos ¦ Network and access
IP, VLAN, MAC, protocolos, puertos, usuarios y accesos de ingeniería ¦ IP, VLAN, MAC, protocols, ports, users and engineering access
Diaria ¦ Daily
5 años ¦ 5 years
Repositorio de programas ¦ Program repository
Copia completa, versión, huella, diferencias y orden que autoriza el cambio ¦ Full backup, version, fingerprint, differences and the order authorising the change
Herramienta del fabricante ¦ Vendor engineering tool
Diaria y ante cambios ¦ Daily and on change
Todas las versiones ¦ All versions
Configuración ¦ Configuration
Parámetros, recetas, consignas, límites y módulos de E/S ¦ Parameters, recipes, setpoints, limits and I/O modules
Ante cambios ¦ On change
Historial completo ¦ Full history
Señales ¦ Signals
Histórico de series ¦ Time-series history
Vibración, intensidad, temperatura, presión, velocidad, estados, contadores ¦ Vibration, current, temperature, pressure, speed, states, counters
PLC y sensores ¦ PLC and sensors
90 días a resolución completa, 5 años agregado ¦ 90 days at full resolution, 5 years aggregated
Alarmas y eventos ¦ Alarms and events
Eventos ¦ Events
Alarmas, paradas, microparadas, rearmes y cambios de modo ¦ Alarms, stops, micro-stops, resets and mode changes
PLC y SCADA ¦ PLC and SCADA
Al ocurrir ¦ As they happen
Mantenimiento ¦ Maintenance
Órdenes, averías, causas, repuestos, horas y costes ¦ Work orders, breakdowns, causes, spare parts, hours and costs
SAP PM / GMAO ¦ SAP PM / CMMS
Cada 15 min ¦ Every 15 min
Contexto ¦ Context
Producto, lote, turno, plan de producción y ventanas de limpieza ¦ Product, batch, shift, production plan and cleaning windows
MES y planificación ¦ MES and planning
Documentación ¦ Documentation
Documentos ¦ Documents
Manuales, esquemas eléctricos, procedimientos y análisis de riesgo ¦ Manuals, electrical drawings, procedures and risk assessments
Gestor documental ¦ Document management
Vigente e histórico ¦ Current and archived
Nombre único por variable ¦ One name per signal
Estructura empresa / país / planta / línea / máquina ¦ Structure: company / country / plant / line / machine
Ejemplo de lectura ¦ Sample reading
Siempre se conserva de dónde viene ¦ Its origin is always kept
Copiar ¦ Copy
Alta de una planta: Redfield (Texas) ¦ Onboarding a plant: Redfield (Texas)
71 de 117 autómatas descubiertos. Falta el área de hornos. ¦ 71 of 117 PLCs discovered. The oven area is still missing.
Descubrir PLC (solo lectura) ¦ Discover PLCs (read only)
El agente recorre la red industrial desde el edge, identifica cada autómata, lee su lista de variables y propone el nombre común. Nada se escribe en los PLC. ¦ The agent scans the industrial network from the edge device, identifies each PLC, reads its signal list and proposes the standard name. Nothing is written to any PLC.
Descubrimiento en Redfield ¦ Discovery at Redfield
Comprobar ventana autorizada y modo lectura ¦ Check authorised window and read-only mode
Permitido: solo consultas de identificación y lectura ¦ Allowed: identification and read queries only
Recorrer la red OT-110 ¦ Scan network OT-110
46 autómatas y 19 variadores responden ¦ 46 PLCs and 19 drives respond
Identificar modelo, firmware y número de serie ¦ Identify model, firmware and serial number
ControlLogix, CompactLogix y 6 SLC 500 antiguos ¦ ControlLogix, CompactLogix and 6 legacy SLC 500
Buscar copias de programa existentes ¦ Look for existing program backups
29 sin copia localizada ¦ 29 with no backup found
Proponer nombre común para las variables ¦ Propose standard signal names
4.180 propuestas · 81 % con confianza alta ¦ 4,180 proposals · 81% with high confidence
⟦0⟧ de ⟦1⟧ equivalencias validadas en la muestra ¦ ⟦0⟧ of ⟦1⟧ mappings validated in the sample
Validar las de confianza alta ¦ Validate high-confidence ones
Variable en el PLC ¦ Signal in the PLC
Nombre común propuesto ¦ Proposed standard name
Confianza ¦ Confidence
Validación ¦ Validation
sin propuesta fiable ¦ no reliable proposal
Requiere ir a planta ¦ Needs a visit to the plant
Validada ¦ Validated
La base de todo: un equipo en cada planta lee los PLC sin tocarlos y publica los datos con un nombre común. ¦ The foundation: a device in each plant reads the PLCs without touching them and publishes the data under a shared naming standard.
Dar de alta una planta nueva no es meses de integración a mano: los agentes proponen y la ingeniería valida. ¦ Onboarding a new plant is not months of manual integration: agents propose and engineering validates.
Redfield, recién incorporada al grupo, es un buen ejemplo de planta a dar de alta. ¦ Redfield, which has just joined the group, is a good example of a plant to onboard.
Pulsa «Descubrir PLC» y acepta las equivalencias con alta confianza. ¦ Click “Discover PLCs” and accept the high-confidence mappings.

Congelador espiral de Valdecierzo · línea 3 ¦ Valdecierzo spiral freezer · line 3
Alarma a las 05:50 ¦ Alarm at 05:50
Ver ficha de la máquina ¦ Open machine record
Pendiente de decisión ¦ Awaiting decision
Plan en ejecución ¦ Plan under way
Propuesta rechazada ¦ Proposal rejected
Últimas 3 horas, cada 10 minutos ¦ Last 3 hours, every 10 minutes
Tras aplicar la nueva consigna (evolución simulada) ¦ After applying the new setpoint (simulated trend)
Consigna ⟦0⟧ % ¦ Setpoint ⟦0⟧%
Lo que está en juego ¦ What is at stake
Bollería congelada, línea 3 ¦ Frozen pastry, line 3
Parada si falla ¦ Downtime if it fails
30 h estimadas ¦ 30 h estimated
Coste por hora ¦ Cost per hour
Impacto sin actuar ¦ Impact of doing nothing
Producto en la espiral ¦ Product in the spiral
Aprox. 2,1 t en riesgo ¦ About 2.1 t at risk
Diagnóstico de los agentes ¦ Agent diagnosis
Consulta histórico, programa, máquinas gemelas, SAP, manual, almacén y plan ¦ Checks history, program, twin machines, SAP, manual, warehouse and plan
Evidencia usada para la propuesta ¦ Evidence behind the proposal
Lanzar diagnóstico ¦ Run diagnosis
Todo se lee. Ninguna acción se ejecuta durante el diagnóstico. ¦ Everything is read only. No action runs during the diagnosis.
Registro del diagnóstico ¦ Diagnosis log
Revisar 14 días de VCZ-L3-ESP-01 ¦ Review 14 days of VCZ-L3-ESP-01
Vibración de 3,1 a 7,6 mm/s; intensidad +23 %; rodamiento 73 °C ¦ Vibration from 3.1 to 7.6 mm/s; current +23%; bearing 73 °C
Descartar causas de proceso ¦ Rule out process causes
Carga, receta y temperatura de aire sin cambios ¦ Load, recipe and air temperature unchanged
Comprobar cambios en el PLC ¦ Check for PLC changes
Sin cambios desde la orden CAM-2026-0288 ¦ No changes since order CAM-2026-0288
Comparar con las espirales de La Ribera, Nowa Wola, Pinewood y Binh Lac ¦ Compare with the spirals in La Ribera, Nowa Wola, Pinewood and Binh Lac
Nowa Wola mostró la misma curva en marzo antes de fallar el rodamiento ¦ Nowa Wola showed the same curve in March before its bearing failed
Leer la avería de Nowa Wola y sus causas ¦ Read the Nowa Wola breakdown and its causes
Rodamiento lado accionamiento · 31 h de parada · sello dañado en lavado ¦ Drive-side bearing · 31 h of downtime · seal damaged during washdown
Buscar el límite del fabricante ¦ Look up the manufacturer’s limit
Por encima de 7,1 mm/s: reducir carga y sustituir en un máximo de 72 h ¦ Above 7.1 mm/s: reduce load and replace within 72 h
Localizar rodamiento y sellos ¦ Locate bearing and seals
Sin stock en Valdecierzo · 2 unidades en La Ribera (entrega 27/11, 14:00) ¦ No stock in Valdecierzo · 2 units in La Ribera (delivery 27/11, 14:00)
Buscar ventana de intervención ¦ Find an intervention window
Limpieza programada el viernes 27/11 a las 22:00 · 5 h disponibles ¦ Cleaning scheduled Friday 27/11 at 22:00 · 5 h available
Evidencia ¦ Evidence
Fuente ¦ Source
Qué muestra ¦ What it shows
Curva de vibración, intensidad y temperatura de 14 días ¦ 14-day vibration, current and temperature curves
Ver variables ¦ View signals
Máquina gemela ¦ Twin machine
NWL-L5-ESP-02 · avería del 18/03/2026 con la misma curva (31 h de parada) ¦ NWL-L5-ESP-02 · breakdown on 18/03/2026 with the same curve (31 h of downtime)
Ver la gemela ¦ View the twin
Sustituir en un máximo de 72 h por encima de 7,1 mm/s ¦ Replace within 72 h above 7.1 mm/s
Abrir cita ¦ Open citation
Almacén ¦ Warehouse
Rodamiento 22218: 0 en Valdecierzo, 2 en La Ribera ¦ Bearing 22218: 0 in Valdecierzo, 2 in La Ribera
Opciones comparadas ¦ Options compared
Costes sintéticos: parada más capacidad perdida ¦ Synthetic costs: downtime plus lost capacity
Opción ¦ Option
Parada ¦ Downtime
Riesgo de rotura ¦ Failure risk
Coste esperado ¦ Expected cost
Seguir como está ¦ Carry on as is
Probable rotura antes del domingo ¦ Likely failure before Sunday
30 h no planificadas ¦ 30 h unplanned
Bajar al ⟦0⟧ % y cambiar el viernes ¦ Slow to ⟦0⟧% and replace on Friday
Recomendada ¦ Recommended
⟦0⟧ % menos de capacidad durante 39 h ¦ ⟦0⟧% less capacity for 39 h
0 h fuera de la ventana de limpieza ¦ 0 h outside the cleaning window
Parar ahora y esperar el repuesto ¦ Stop now and wait for the part
La pieza llega mañana a las 14:00 ¦ The part arrives tomorrow at 14:00
Aprobación requerida antes de actuar ¦ Approval required before any action
Decide: ⟦0⟧ ¦ Approver: ⟦0⟧
Reducir velocidad ahora y sustituir el rodamiento el viernes ¦ Reduce speed now and replace the bearing on Friday
Causa probable: rodamiento del lado accionamiento dañado, con posible entrada de agua por el sello. Confianza 86 %. ¦ Probable cause: damaged drive-side bearing, possibly with water getting in through the seal. Confidence 86%.
Alcance ¦ Scope
Consigna belt.speed_setpoint (DB121.DBD0) ¦ Setpoint belt.speed_setpoint (DB121.DBD0)
Límite permitido por la política ¦ Range allowed by policy
85 % a 100 % ¦ 85% to 100%
Intervención ¦ Intervention
Vie 27/11 · 22:00 a 03:00 ¦ Fri 27/11 · 22:00 to 03:00
Cadena de seguridad ¦ Safety chain
No se toca ¦ Not touched
Si se aprueba ¦ If approved
El edge de Valdecierzo escribe la consigna ⟦0⟧ % y verifica la lectura de vuelta ¦ The Valdecierzo edge device writes the ⟦0⟧% setpoint and verifies the read-back
Se crea la orden de trabajo en SAP PM con la evidencia adjunta ¦ The work order is created in SAP PM with the evidence attached
Se reservan 1 rodamiento y 2 sellos en La Ribera y se pide el transporte ¦ 1 bearing and 2 seals are reserved in La Ribera and transport is requested
Planificación mueve 2 órdenes de producción a la línea 1 ¦ Planning moves 2 production orders to line 1
Aviso por Teams al jefe de turno de Valdecierzo ¦ Teams notice to the Valdecierzo shift lead
Si la vibración supera 9 mm/s, el agente pide parada controlada ¦ If vibration exceeds 9 mm/s, the agent requests a controlled stop
Nivel 2: el agente actúa solo con aprobación ¦ Level 2: the agent acts only with approval
Cambiar velocidad ¦ Change speed
Rechazar ¦ Reject
Aprobar el plan ¦ Approve plan
Cambiar la velocidad propuesta ¦ Change the proposed speed
Solo se admiten valores dentro del límite de la política. Menos velocidad reduce el riesgo y también la capacidad. ¦ Only values within the policy limit are accepted. Lower speed reduces both risk and capacity.
Cancelar ¦ Cancel
Cerrar ¦ Close
Recalcular ¦ Recalculate
Velocidad de banda ¦ Belt speed
Rechazar la propuesta ¦ Reject the proposal
Motivo ¦ Reason
Obligatorio ¦ Required
Opcional ¦ Optional
Escribe el motivo para continuar ¦ Enter a reason to continue
Por ejemplo: hay un técnico revisando la máquina ahora ¦ For example: a technician is checking the machine right now
Rechazado por ⟦0⟧ · ⟦1⟧ · no se ha aplicado ninguna acción ¦ Rejected by ⟦0⟧ · ⟦1⟧ · no action has been applied
Acciones no aplicadas ¦ Actions not applied
Motivo: ⟦0⟧. La máquina sigue en vigilancia cada minuto y la decisión queda registrada. ¦ Reason: ⟦0⟧. The machine is still checked every minute and the decision is on record.
Reconsiderar ¦ Reconsider
Aprobado por ⟦0⟧ · ⟦1⟧ ¦ Approved by ⟦0⟧ · ⟦1⟧
Acciones aplicadas ¦ Actions applied
Ejecución ¦ Execution
Acciones aplicadas (simuladas) ¦ Actions applied (simulated)
Escribir consigna ⟦0⟧ % y leer de vuelta ¦ Write ⟦0⟧% setpoint and read it back
Confirmado ⟦0⟧ % en ⟦1⟧ ¦ ⟦0⟧% confirmed on ⟦1⟧
Crear orden de trabajo ¦ Create work order
⟦0⟧ · viernes 22:00 · 2 técnicos ¦ ⟦0⟧ · Friday 22:00 · 2 technicians
Reservar en La Ribera y pedir transporte ¦ Reserve in La Ribera and request transport
Reserva confirmada · llegada 27/11 14:00 ¦ Reservation confirmed · arrival 27/11 14:00
Mover 2 órdenes a la línea 1 ¦ Move 2 orders to line 1
Sin retrasos en expediciones ¦ No shipment delays
Avisar al jefe de turno de Valdecierzo ¦ Notify the Valdecierzo shift lead
Mensaje enviado (simulado) ¦ Message sent (simulated)
Comprobar el efecto a los 30 minutos ¦ Check the effect after 30 minutes
Vibración en descenso: ⟦0⟧ mm/s ¦ Vibration falling: ⟦0⟧ mm/s
Aquí está el valor: los agentes juntan en un minuto lo que hoy exige varias llamadas entre plantas. ¦ Here is the value: in a minute the agents gather what today takes several calls between plants.
La pista decisiva viene de una máquina gemela en Polonia. ¦ The decisive clue comes from a twin machine in Poland.
Nadie toca el PLC sin aprobación, y nunca la seguridad. El límite está en la política, no en la buena voluntad del agente. ¦ Nobody touches the PLC without approval, and never the safety system. The limit sits in the policy, not in the agent’s good will.
Pulsa «Lanzar diagnóstico», ajusta la velocidad si quieres y aprueba. ¦ Click “Run diagnosis”, adjust the speed if you like, and approve.
En curso ¦ In progress
Acelerar ¦ Speed up
Acelerado ×4 ¦ Sped up ×4
Mostrar todo ¦ Show all
Completado ¦ Completed
⟦0⟧ de ⟦1⟧ pasos ¦ ⟦0⟧ of ⟦1⟧ steps
Cita del manual ¦ Manual citation
Hornalba · Ingeniería global (documento de ejemplo) ¦ Hornalba · Global engineering (sample document)
Congelador espiral: diagnóstico de vibraciones del grupo de arrastre ¦ Spiral freezer: drive assembly vibration diagnosis
MAN-ESP-07 · extracto ficticio ¦ MAN-ESP-07 · fictitious excerpt
Ingeniería global ¦ Global engineering
Revisión ⟦0⟧ ¦ Revision ⟦0⟧
Vigente desde ⟦0⟧ ¦ Effective from ⟦0⟧
Propietario: ⟦0⟧ ¦ Owner: ⟦0⟧
6.2 Umbrales ¦ 6.2 Thresholds
6.3 Comprobaciones ¦ 6.3 Checks
Aviso a partir de 4,5 mm/s RMS. Por encima de 7,1 mm/s RMS, reducir la carga del arrastre y sustituir el rodamiento en un máximo de 72 horas de funcionamiento. ¦ Warning from 4.5 mm/s RMS. Above 7.1 mm/s RMS, reduce the drive load and replace the bearing within 72 hours of operation.
sustituir el rodamiento en un máximo de 72 horas ¦ replace the bearing within 72 hours
Verificar alineación, estado de sellos y entrada de agua de lavado. No modificar los enclavamientos de seguridad. ¦ Check alignment, seal condition and washdown water ingress. Do not modify the safety interlocks.

Decisiones de mantenimiento de la red ¦ Network maintenance decisions
Ordenadas por pérdida que se evita. Probabilidades, horas y costes son sintéticos. ¦ Ranked by avoided loss. Probabilities, hours and costs are synthetic.
Decisiones abiertas ¦ Open decisions
En 8 plantas ¦ Across 8 plants
Incluidas en el plan ¦ Included in the plan
⟦0⟧ sin orden de trabajo ¦ ⟦0⟧ without a work order
Pérdida esperada que se evita ¦ Expected loss avoided
Próximos 30 días ¦ Next 30 days
Horas de parada no planificada ¦ Unplanned downtime hours
Esperadas si no se actúa ¦ Expected if nothing is done
Cartera de intervenciones ¦ Intervention backlog
Aprobar plan (⟦0⟧) ¦ Approve plan (⟦0⟧)
Plan aprobado ¦ Plan approved
Qué hacer ¦ What to do
Riesgo 30 días ¦ 30-day risk
Parada: fallo / plan ¦ Downtime: failure / planned
Se evita ¦ Avoided
Repuesto ¦ Spare part
Ventana ¦ Window
Cambiar rodamiento lado accionamiento y alinear ¦ Replace drive-side bearing and align
Copia del programa y cambio de reductor ¦ Program backup and gearbox replacement
Revisar válvula de desescarche y sonda ¦ Check defrost valve and probe
Retensar banda y sustituir 3 rodillos ¦ Re-tension belt and replace 3 rollers
Sustituir mordazas de sellado ¦ Replace sealing jaws
Limpieza de intercambiador y cambio de bomba de aceite ¦ Clean heat exchanger and replace oil pump
Cambiar separador y revisar válvula de admisión ¦ Replace separator and check intake valve
Reemplazar cableado del eje 4 ¦ Replace axis 4 cabling
Hoy: reactivo ¦ Today: reactive
Hoy: sin planificar ¦ Today: not planned
Hoy: preventivo en 6 semanas ¦ Today: preventive in 6 weeks
Hoy: preventivo por calendario ¦ Today: calendar-based preventive
Hoy: preventivo por horas ¦ Today: hours-based preventive
Rodamiento 22218 + sellos ¦ Bearing 22218 + seals
En La Ribera (2 ud) ¦ In La Ribera (2 units)
Reductor eje 2 ¦ Axis 2 gearbox
Plazo ⟦0⟧ días ¦ Lead time ⟦0⟧ days
Electroválvula DN32 ¦ DN32 solenoid valve
Rodillos de apoyo ¦ Support rollers
En planta ¦ On site
En planta (1 ud) ¦ On site (1 unit)
Kit mordazas 320 mm ¦ 320 mm jaw kit
Bomba de recirculación ¦ Recirculation pump
Kit separador ¦ Separator kit
Mazo eje 4 ¦ Axis 4 harness
Vie 27/11 22:00 · limpieza ¦ Fri 27/11 22:00 · cleaning
Sáb 12/12 · parada ¦ Sat 12/12 · shutdown
Sáb 05/12 · parada semanal ¦ Sat 05/12 · weekly shutdown
Sáb 05/12 ¦ Sat 05/12
Dom 06/12 (hora local) ¦ Sun 06/12 (local time)
Dom 29/11 · cambio de formato ¦ Sun 29/11 · format changeover
Vie 18/12 · parada mensual ¦ Fri 18/12 · monthly shutdown
Mié 02/12 · compresor de reserva ¦ Wed 02/12 · standby compressor
⟦0⟧ creada ¦ ⟦0⟧ created
Aprobar y crear órdenes ¦ Approve and create orders
Se crearán ⟦0⟧ órdenes de trabajo en SAP PM, se reservarán repuestos y cada planta recibirá su calendario. Todo es simulado. ¦ ⟦0⟧ work orders will be created in SAP PM, spare parts reserved and each plant sent its schedule. Everything is simulated.
⟦0⟧ órdenes creadas (simulado) ¦ ⟦0⟧ orders created (simulated)
Campaña de firmware ¦ Firmware campaign
Una decisión para toda la red, por oleadas ¦ One decision for the whole network, in waves
Preparar oleadas ¦ Plan waves
Preparada ¦ Ready
PLC en la muestra ¦ PLCs in the sample
Ola ⟦0⟧ ¦ Wave ⟦0⟧
Banco de pruebas y una línea no crítica ¦ Test bench and one non-critical line
La Ribera · semana del 07/12 ¦ La Ribera · week of 07/12
Resto de criticidad B y C ¦ Remaining criticality B and C
Paradas semanales de enero ¦ Weekly shutdowns in January
Criticidad A ¦ Criticality A
Solo con copia verificada y plan de vuelta atrás ¦ Only with a verified backup and a rollback plan
Patrón detectado entre plantas ¦ Cross-plant pattern detected
Algo que ninguna planta ve por sí sola ¦ Something no single plant can see
Tres averías de rodamiento en congeladores espiral en 18 meses comparten el mismo sello y lavado a presión en el lado accionamiento. ¦ Three spiral freezer bearing failures in 18 months share the same seal and pressure washing on the drive side.
Máquinas expuestas ¦ Exposed machines
Propuesta ¦ Proposal
Cambiar sello y protocolo de lavado en las 5 espirales ¦ Change the seal and washdown protocol on all 5 spirals
Decide ¦ Decided by
Proponer cambio de estándar ¦ Propose a standard change
Propuesta enviada a Ingeniería global ¦ Proposal sent to Global engineering
Se pasa de mantener por calendario a decidir por riesgo y dinero. ¦ From calendar-based maintenance to decisions based on risk and money.
Cada intervención se coloca en una ventana de limpieza o cambio de formato. ¦ Each intervention is placed in a cleaning or changeover window.
El almacén deja de ser de cada planta: se ve el repuesto en toda la red. ¦ The warehouse is no longer per plant: spare parts are visible across the network.
Marca o desmarca intervenciones y aprueba el plan. ¦ Tick or untick interventions and approve the plan.

De palabras a automatización ¦ From words to automation
Describe qué debe pasar. La plataforma propone los pasos y respeta la política de autonomía. ¦ Describe what should happen. The platform proposes the steps and respects the autonomy policy.
Qué quieres que ocurra ¦ What do you want to happen
Vibración en espirales ¦ Spiral vibration
Cambios de programa ¦ Program changes
Energía por tonelada ¦ Energy per tonne
Descripción de la regla ¦ Rule description
Por ejemplo: si la vibración de una espiral sube, avisa y propón una ventana de mantenimiento… ¦ For example: if a spiral’s vibration rises, alert me and propose a maintenance window…
Convertir en automatización ¦ Turn into automation
Publicadas en esta sesión ¦ Published in this session
Automatización ¦ Automation
Publicada ¦ Published
Publicado ¦ Published
Activa ¦ Active
Todavía no has publicado ninguna. ¦ You have not published any yet.
Escribe la regla o elige un ejemplo ¦ Write the rule or pick an example
Esta demostración solo reconoce tres temas ¦ This demonstration only recognises three topics
Escribe sobre vibración, cambios de programa o energía, o elige un ejemplo. En un piloto, un modelo interpreta la frase. ¦ Write about vibration, program changes or energy, or pick an example. In a pilot, a model interprets the sentence.
Si la vibración de cualquier motor de espiral supera 4,5 mm/s durante 10 minutos, compara con las máquinas gemelas, busca el repuesto y propón una ventana. Antes de cambiar nada en el PLC, pide aprobación. ¦ If the vibration of any spiral motor exceeds 4.5 mm/s for 10 minutes, compare with twin machines, find the spare part and propose a window. Ask for approval before changing anything in the PLC.
Cuando cambie el programa de cualquier PLC, comprueba que existe una orden de cambio aprobada. Si no existe, avisa a ciberseguridad y a la planta, guarda las dos versiones y abre un incidente. ¦ When the program of any PLC changes, check that an approved change order exists. If it does not, alert cybersecurity and the plant, keep both versions and open an incident.
Cada mañana, compara el consumo por tonelada de frío, hornos y aire comprimido de cada planta con sus últimas 6 semanas. Si sube más de un 8 %, explica la causa probable y propón qué revisar. ¦ Every morning, compare each plant’s consumption per tonne for refrigeration, ovens and compressed air with its last 6 weeks. If it rises more than 8%, explain the probable cause and propose what to check.
Vigilancia de vibración en congeladores espiral ¦ Spiral freezer vibration watch
Cambios de programa sin autorización ¦ Unauthorised program changes
Consumo anómalo de energía por tonelada ¦ Abnormal energy use per tonne
Alcance: ⟦0⟧ ¦ Scope: ⟦0⟧
5 congeladores espiral en 4 países ¦ 5 spiral freezers in 4 countries
Todos los autómatas registrados ¦ All registered PLCs
13 plantas ¦ 13 plants
Probar con datos de anoche ¦ Test on last night’s data
Publicar ¦ Publish
Publicada (simulado) ¦ Published (simulated)
Vibración > 4,5 mm/s ¦ Vibration > 4.5 mm/s
10 min seguidos ¦ 10 min in a row
Diagnóstico ¦ Diagnosis
Gemelas e histórico ¦ Twins and history
Repuesto y ventana ¦ Part and window
Toda la red ¦ Whole network
Jefatura de planta ¦ Plant manager
Orden y consigna ¦ Order and setpoint
Dentro de límites ¦ Within limits
Huella del programa distinta ¦ Program fingerprint changed
Revisión diaria y por evento ¦ Daily and event-driven
Buscar orden aprobada ¦ Find approved order
Quién, cuándo y qué ¦ Who, when and what
¿Autorizado? ¦ Authorised?
Sí: archivar · No: seguir ¦ Yes: file · No: continue
Diferencias y accesos ¦ Differences and access
Incidente y aviso ¦ Incident and alert
Planta y seguridad ¦ Plant and security
Cada día a las 06:00 ¦ Every day at 06:00
kWh por tonelada ¦ kWh per tonne
¿Sube más del 8 %? ¦ Up more than 8%?
Frente a 6 semanas ¦ Versus 6 weeks
Causa probable ¦ Probable cause
Parte a la planta ¦ Report to the plant
Con evidencia ¦ With evidence
Prueba sin efectos ¦ Dry run
3 espirales habrían disparado: Valdecierzo, Binh Lac y Pinewood ¦ 3 spirals would have triggered: Valdecierzo, Binh Lac and Pinewood
Correcto, sin efectos reales ¦ OK, no real effects
Se habría pedido aprobación; en la prueba no se envía ¦ Approval would have been requested; not sent in a dry run
1 cambio en Pinewood ¦ 1 change in Pinewood
Sí, orden CAM-2026-0391 ¦ Yes, order CAM-2026-0391
13 plantas evaluadas ¦ 13 plants assessed
Puerto Sur +11 % en frío ¦ Puerto Sur +11% in refrigeration
El jefe de mantenimiento describe la regla como se la diría a su equipo. ¦ The maintenance manager describes the rule as they would to their team.
La plataforma la convierte en pasos visibles, con sus sistemas y su punto de aprobación. ¦ The platform turns it into visible steps, with their systems and approval point.
Una vez publicada, se aplica en todas las plantas que correspondan. ¦ Once published, it applies to every relevant plant.
Elige un ejemplo, pulsa «Convertir» y publica. ¦ Pick an example, click “Turn into automation” and publish.

Preguntar a la red de plantas ¦ Ask the plant network
Respuestas preparadas sobre datos sintéticos, con sus fuentes. ¦ Prepared answers on synthetic data, with their sources.
Tu pregunta ¦ Your question
Escribe una pregunta sobre máquinas, PLC o mantenimiento ¦ Type a question about machines, PLCs or maintenance
Preguntar ¦ Ask
¿Qué autómatas críticos tienen firmware pendiente? ¦ Which critical PLCs have pending firmware?
¿Qué máquinas pueden parar en menos de 30 días? ¦ Which machines could stop within 30 days?
¿Por qué ha bajado el OEE de Binh Lac esta semana? ¦ Why has Binh Lac’s OEE dropped this week?
¿Cada cuánto hay que cambiar el rodamiento de la espiral si vibra? ¦ How soon must the spiral bearing be replaced if it vibrates?
¿De qué PLC no podríamos recuperar el programa hoy? ¦ Which PLC programs could we not recover today?
Las respuestas aparecerán aquí, la más reciente arriba. ¦ Answers will appear here, newest first.
No tengo una fuente para responder a eso en esta demostración. Prueba una de las preguntas sugeridas. ¦ I have no source to answer that in this demonstration. Try one of the suggested questions.
Hay ¦ There are
⟦0⟧ autómatas de criticidad A ¦ ⟦0⟧ criticality-A PLCs
con firmware pendiente en la muestra. ¦ with pending firmware in the sample.
⟦0⟧ máquinas tienen ¦ ⟦0⟧ machines have
tienen una vida útil estimada de 30 días o menos. La más urgente es VCZ-L3-ESP-01. ¦ have an estimated remaining life of 30 days or less. The most urgent is VCZ-L3-ESP-01.
Días ¦ Days
1 autómata ¦ 1 PLC
de la muestra tiene la copia caducada. Además, en Redfield hay 29 sin copia localizada. ¦ in the sample has an out-of-date backup. In addition, 29 in Redfield have no backup found.
En la muestra todas las copias tienen menos de 30 días. En Redfield quedan 29 autómatas sin copia localizada. ¦ All backups in the sample are less than 30 days old. In Redfield, 29 PLCs still have no backup found.
El OEE de Binh Lac está en ¦ Binh Lac’s OEE is
71,4 % ¦ 71.4%
. La mayor pérdida sintética de la semana viene del congelador espiral de la línea 2: descongelaciones fuera de ciclo. ¦ . The week’s largest synthetic loss comes from the line 2 spiral freezer: off-cycle defrosts.
Horas ¦ Hours
Efecto ¦ Effect
Descongelación fuera de ciclo (BNL-L2-ESP-01) ¦ Off-cycle defrost (BNL-L2-ESP-01)
Cambios de formato más largos en laminadora ¦ Longer changeovers on the laminating line
Microparadas de envasado ¦ Packaging micro-stops
6,5 h ¦ 6.5 h
2,8 h ¦ 2.8 h
1,4 h ¦ 1.4 h
−3,9 puntos ¦ −3.9 points
−1,6 puntos ¦ −1.6 points
−0,8 puntos ¦ −0.8 points
Siguiente paso propuesto: revisar la electroválvula de desescarche el sábado 05/12 (repuesto con plazo de 9 días). ¦ Proposed next step: check the defrost solenoid valve on Saturday 05/12 (spare part lead time 9 days).
Con vibración por encima de ¦ With vibration above
7,1 mm/s ¦ 7.1 mm/s
, el manual pide reducir la carga y sustituir el rodamiento en un máximo de ¦ , the manual requires reducing the load and replacing the bearing within
72 horas ¦ 72 hours
, revisando alineación y sellos. ¦ , checking alignment and seals.
Preguntas en lenguaje normal sobre todas las plantas a la vez. ¦ Plain-language questions across all plants at once.
Cada respuesta dice de dónde sale; si no hay fuente, lo reconoce. ¦ Each answer says where it comes from; if there is no source, it says so.
En un piloto se puede preguntar en el idioma de cada planta. ¦ In a pilot, people can ask in each plant’s language.
Pulsa una de las preguntas sugeridas. ¦ Click one of the suggested questions.

La capa agéntica y sus límites ¦ The agentic layer and its limits
Por encima de los PLC y de los sistemas de planta. No sustituye al autómata, al SCADA ni al sistema de mantenimiento. ¦ It sits above the PLCs and plant systems. It does not replace the PLC, SCADA or maintenance system.
Orquestador ¦ Orchestrator
Vigilancia de señales ¦ Signal monitoring
Planificación ¦ Planning
Repuestos ¦ Spare parts
Ciberseguridad OT ¦ OT cybersecurity
Energía ¦ Energy
Conocimiento ¦ Knowledge
Reparte el trabajo entre agentes, aplica la política de autonomía y pide aprobación a quien corresponde. ¦ Splits work among agents, applies the autonomy policy and asks the right person for approval.
Compara cada variable con su comportamiento habitual y con las máquinas gemelas de otras plantas. ¦ Compares each signal with its usual behaviour and with twin machines in other plants.
Cruza alarmas, histórico, manuales y averías anteriores para proponer causa probable con su evidencia. ¦ Cross-checks alarms, history, manuals and past breakdowns to propose a probable cause with evidence.
Encaja las intervenciones en las ventanas de limpieza y cambio de formato sin romper el plan. ¦ Fits interventions into cleaning and changeover windows without breaking the plan.
Localiza stock en cualquier planta, reserva y calcula plazos. ¦ Locates stock in any plant, reserves it and works out lead times.
Vigila firmware, cambios de programa no autorizados, accesos y copias caducadas. ¦ Watches firmware, unauthorised program changes, access and out-of-date backups.
Detecta consumo anómalo por tonelada en frío, hornos y aire comprimido. ¦ Detects abnormal consumption per tonne in refrigeration, ovens and compressed air.
Responde con cita a manuales y procedimientos en el idioma de la planta. ¦ Answers citing manuals and procedures in the plant’s language.
Plan de producción ¦ Production plan
Manuales ¦ Manuals
Almacén de repuestos ¦ Spare parts warehouse
⟦0⟧ ejecuciones en 24 h ¦ ⟦0⟧ runs in 24 h
⟦0⟧ · conector de demostración ¦ ⟦0⟧ · demonstration connector
Qué puede hacer cada uno sin preguntar ¦ What each one may do without asking
Política de toda la red. Cada planta puede ser más estricta, nunca menos. ¦ Network-wide policy. Each plant may be stricter, never looser.
Nivel de autonomía ¦ Autonomy level
Quién aprueba ¦ Who approves
Leer variables, alarmas y configuración ¦ Read signals, alarms and configuration
Siempre (solo lectura) ¦ Always (read only)
Copiar el programa de un PLC ¦ Back up a PLC program
Propone ¦ Proposes
Con aprobación ¦ With approval
Actúa solo ¦ Acts alone
Se informa después ¦ Informed afterwards
Crear una orden de trabajo ¦ Create a work order
Jefatura de mantenimiento ¦ Maintenance manager
Reservar y trasladar repuestos ¦ Reserve and move spare parts
Cambiar una consigna autorizada, dentro de límites ¦ Change an authorised setpoint, within limits
Pedir parada controlada de una máquina ¦ Request a controlled machine stop
Jefatura de turno ¦ Shift lead
Modificar el programa o actualizar firmware ¦ Modify the program or update firmware
Nunca el agente ¦ Never the agent
Ingeniería, con su herramienta ¦ Engineering, with their own tool
Seguridad: paradas de emergencia y PLC de seguridad ¦ Safety: emergency stops and safety PLC
Nunca ¦ Never
Nadie a través de la plataforma ¦ Nobody through the platform
Si cae la red ¦ If the network goes down
La planta sigue produciendo igual. El edge guarda las lecturas y las envía al recuperar la conexión. ¦ The plant keeps producing. The edge device stores readings and sends them once the connection returns.
Si un agente se equivoca ¦ If an agent gets it wrong
Toda escritura pasa por límites en el edge, se verifica leyendo de vuelta y queda registrada con la forma de deshacerla. ¦ Every write passes limits at the edge, is verified by read-back and is logged with the way to undo it.
Si alguien pregunta quién fue ¦ If someone asks who did it
Cada propuesta guarda su evidencia, quién la aprobó y qué se ejecutó. ¦ Every proposal keeps its evidence, who approved it and what was executed.
Ver registro de auditoría ¦ View audit log
Ocho agentes con un encargo concreto cada uno, coordinados por un orquestador. ¦ Eight agents, each with a specific job, coordinated by an orchestrator.
La autonomía se decide por tipo de acción, y se puede ampliar a medida que se gana confianza. ¦ Autonomy is set per type of action and can be widened as trust grows.
Hay cosas que no se pueden activar: tocar la lógica del PLC o la seguridad. ¦ Some things cannot be switched on: touching PLC logic or safety.
Intenta subir la autonomía de una acción y mira el registro de auditoría. ¦ Try raising the autonomy of an action and check the audit log.

Cómo se construye y por dónde empezar ¦ How to build it and where to start
Propuesta de partida, pendiente de contrastar en las plantas. ¦ A starting proposal, still to be validated at the plants.
Arquitectura por capas ¦ Layered architecture
De la máquina a la decisión; los datos suben y las órdenes bajan solo con permiso ¦ From machine to decision; data flows up and commands flow down only with permission
Personas y aplicaciones ¦ People and applications
Central y planta ¦ Central and plant
Consola de la red ¦ Network console
Aprobaciones en Teams ¦ Approvals in Teams
Preguntas en lenguaje normal ¦ Plain-language questions
Cuadros de dirección ¦ Management dashboards
Capa agéntica ¦ Agentic layer
Central ¦ Central
Agentes especialistas ¦ Specialist agents
Política de autonomía ¦ Autonomy policy
Auditoría y coste por petición ¦ Audit and cost per request
Plataforma de datos ¦ Data platform
Nube o centro de datos de Hornalba ¦ Cloud or Hornalba data centre
Registro de activos y PLC ¦ Asset and PLC registry
Eventos y órdenes ¦ Events and work orders
Programas y documentos ¦ Programs and documents
Conectores de negocio ¦ Business connectors
ERP y mantenimiento ¦ ERP and maintenance
Equipo edge en cada planta ¦ Edge device in every plant
Zona intermedia (DMZ industrial) ¦ Intermediate zone (industrial DMZ)
Lectura OPC UA y protocolos nativos ¦ OPC UA and native protocol reads
Almacenamiento local ¦ Local storage
Lista cerrada de escrituras ¦ Closed list of writes
Solo conexiones salientes ¦ Outbound connections only
Máquinas y control ¦ Machines and control
Red industrial de planta ¦ Plant industrial network
PLC de seguridad (aislado) ¦ Safety PLC (isolated)
Sensores añadidos ¦ Add-on sensors
Hoja de ruta ¦ Roadmap
Duraciones orientativas ¦ Indicative durations
Fase ⟦0⟧ ¦ Phase ⟦0⟧
4–6 sem. ¦ 4–6 wks
12 sem. ¦ 12 wks
4–6 meses ¦ 4–6 months
12–24 meses ¦ 12–24 months
Descubrimiento en una planta ¦ Discovery in one plant
Inventario real de PLC, redes, SCADA, sistema de mantenimiento y copias de programa. Resultado: mapa de partida y plan de piloto. ¦ Real inventory of PLCs, networks, SCADA, maintenance system and program backups. Outcome: baseline map and pilot plan.
Piloto en una línea, solo lectura ¦ Single-line pilot, read only
Una línea completa en una planta española: edge, registro, histórico, ficha de máquina y avisos. Sin escrituras. ¦ One full line in a Spanish plant: edge, registry, history, machine record and alerts. No writes.
Tres plantas con tres fabricantes ¦ Three plants, three vendors
Añadir una planta de Estados Unidos y la de Vietnam. Órdenes de trabajo con aprobación y comparación entre gemelas. ¦ Add a United States plant and the Vietnam one. Work orders with approval and twin comparison.
Despliegue global ¦ Global rollout
Resto de plantas por oleadas. Consignas autorizadas donde la planta lo apruebe. Alta estándar para plantas adquiridas. ¦ Remaining plants in waves. Authorised setpoints where the plant agrees. Standard onboarding for acquired plants.
Valor: calculadora de partida ¦ Value: starting calculator
Supuestos de ejemplo, para ajustar con cifras reales. ¦ Example assumptions, to be replaced with real figures.
Líneas dentro del alcance ¦ Lines in scope
Horas de parada no planificada por línea y mes ¦ Unplanned downtime hours per line per month
Coste de una hora de parada ¦ Cost of one hour of downtime
Reducción de paradas no planificadas ¦ Reduction in unplanned downtime
Pérdida evitada al año ¦ Loss avoided per year
sobre ¦ on
horas de parada al año en el alcance. Antes de descontar la inversión y la operación. ¦ downtime hours a year in scope. Before deducting investment and running costs.
Cómo sabremos que funciona ¦ How we will know it works
Objetivo propuesto ¦ Proposed target
PLC inventariados con copia vigente ¦ Inventoried PLCs with a current backup
100 % de la línea piloto ¦ 100% of the pilot line
Averías avisadas con más de 48 h ¦ Breakdowns flagged more than 48 h ahead
Al menos 1 de cada 2 ¦ At least 1 in 2
Avisos útiles sobre el total ¦ Useful alerts as a share of all
Más del 70 % ¦ Over 70%
Tiempo de diagnóstico ¦ Diagnosis time
De horas a minutos ¦ From hours to minutes
Escrituras fuera de política ¦ Out-of-policy writes
Cero ¦ Zero
Lo que necesitamos saber ¦ What we need to know
Marca lo que ya esté contestado ¦ Tick what has already been answered
¿Cuántas plantas y líneas entran en el alcance y cuál es la primera? ¦ How many plants and lines are in scope, and which comes first?
¿Qué fabricantes y antigüedades de PLC hay realmente? ¿Existe un inventario? ¦ Which PLC vendors and ages are really installed? Is there an inventory?
¿Qué SCADA, MES, ERP y sistema de mantenimiento usa cada planta? ¦ Which SCADA, MES, ERP and maintenance system does each plant use?
¿Están separadas las redes industriales? ¿Quién autoriza conexiones? ¦ Are the industrial networks segregated? Who authorises connections?
¿Qué garantías o contratos de fabricantes limitan el acceso a sus máquinas? ¦ Which manufacturer warranties or contracts restrict access to their machines?
¿Cuánto cuesta hoy una hora de parada por tipo de línea? ¦ What does an hour of downtime cost today for each type of line?
¿Qué requisitos fijan ciberseguridad (IEC 62443, NIS2) y la residencia de los datos en cada país? ¦ What requirements do cybersecurity (IEC 62443, NIS2) and data residency set in each country?
Copiar las preguntas pendientes ¦ Copy open questions
Preguntas copiadas ¦ Questions copied
Se empieza leyendo, en una línea, sin tocar ningún PLC. ¦ It starts by reading, on one line, without touching any PLC.
El valor se calcula con las cifras del cliente; las que se ven son supuestos de ejemplo. ¦ Value is calculated with the client’s figures; those shown are example assumptions.
Cerramos con las preguntas que necesitamos contestar para dimensionar el proyecto. ¦ We close with the questions we need answered to size the project.
Mueve los supuestos de la calculadora y acuerda la planta del piloto. ¦ Move the calculator assumptions and agree the pilot plant.

Sesión de demostración · solo se añaden entradas ¦ Demonstration session · entries are only added
Cada acción de la sesión queda registrada con hora de planta, actor y vista. No se edita ni se borra desde la consola; solo «Reiniciar demo» empieza un registro nuevo. ¦ Every action in the session is logged with plant time, actor and screen. It cannot be edited or deleted from the console; only “Reset demo” starts a new log.
Hora ¦ Time
Actor ¦ Actor
Vista ¦ Screen
Exportar JSON ¦ Export JSON
Aún no hay acciones registradas en esta sesión. ¦ No actions logged in this session yet.
Descarga ¦ Download
No se ha podido descargar el fichero ¦ The file could not be downloaded
No se ha podido copiar ¦ Could not copy to clipboard
Copiado ¦ Copied
Registro de auditoría exportado ¦ Audit log exported
⟦0⟧ entradas ¦ ⟦0⟧ entries
Política de autonomía cambiada ¦ Autonomy policy changed
Automatización publicada ¦ Automation published
Automatización generada desde texto ¦ Automation generated from text
Propuesta de estándar enviada ¦ Standard change proposal sent
Sello y protocolo de lavado en congeladores espiral ¦ Seal and washdown protocol on spiral freezers
Campaña de firmware preparada ¦ Firmware campaign planned
3 oleadas · sin cambios aplicados ¦ 3 waves · no changes applied
Plan de mantenimiento aprobado ¦ Maintenance plan approved
Consulta a la red ¦ Network query
Plan de intervención aprobado ¦ Intervention plan approved
⟦0⟧ · consigna ⟦1⟧ % · ⟦2⟧ · reserva en La Ribera (simulado) ¦ ⟦0⟧ · setpoint ⟦1⟧% · ⟦2⟧ · reservation in La Ribera (simulated)
Alcance de la propuesta modificado ¦ Proposal scope changed
Velocidad ⟦0⟧ % ¦ Speed ⟦0⟧%
Diagnóstico lanzado ¦ Diagnosis started
solo lectura ¦ read only
Equivalencias de variables validadas ¦ Signal mappings validated
⟦0⟧ variable(s) ¦ ⟦0⟧ signal(s)
Descubrimiento de PLC iniciado ¦ PLC discovery started
Redfield · área de hornos · modo lectura (simulado) ¦ Redfield · oven area · read-only mode (simulated)
Copia de programa solicitada ¦ Program backup requested
lectura desde el edge, sin parar la máquina (simulado) ¦ read from the edge device, without stopping the machine (simulated)
Qué es ¦ What it is
Una simulación interactiva de cómo Hornalba podría registrar, vigilar y gestionar las máquinas de todas sus plantas con una capa de agentes por encima de los PLC. Se abre en el navegador, sin instalación y sin acceso a ningún sistema real. ¦ An interactive simulation of how Hornalba could register, monitor and manage the machines in all its plants with a layer of agents above the PLCs. It opens in the browser, with no installation and no access to any real system.
Qué es ficticio ¦ What is fictitious
Todo: la empresa, sus plantas y marcas, las máquinas, los datos, los clientes y las incidencias. El escenario representa 13 de las 26 plantas de un grupo inventado. ¦ Everything: the company, its plants and brands, the machines, the data, the customers and the incidents. The scenario represents 13 of the 26 plants of a made-up group.
Qué es sintético ¦ What is synthetic
Máquinas, PLC, direcciones IP, firmware, variables, lecturas, alarmas, órdenes, repuestos, costes, avisos de seguridad, documentos y personas. No describen la instalación real de ninguna planta. ¦ Machines, PLCs, IP addresses, firmware, signals, readings, alarms, orders, spare parts, costs, security advisories, documents and people. They do not describe the real installation of any plant.
Acciones ¦ Actions
Escrituras en PLC, órdenes de trabajo, reservas y avisos se simulan y no salen de este navegador. Todo queda en el registro de auditoría de la sesión y se borra con «Reiniciar demo». ¦ PLC writes, work orders, reservations and alerts are simulated and never leave this browser. Everything goes to the session audit log and is cleared with “Reset demo”.
Conectores ¦ Connectors
OPC UA, MQTT Sparkplug B, EtherNet/IP, PROFINET, SAP PM, MES, SCADA y Microsoft 365 son conectores de demostración. En un proyecto real, los sistemas se confirman en el descubrimiento. ¦ OPC UA, MQTT Sparkplug B, EtherNet/IP, PROFINET, SAP PM, MES, SCADA and Microsoft 365 are demonstration connectors. In a real project, the systems are confirmed during discovery.
Seguridad industrial ¦ Industrial safety
En la propuesta que representa la demo, los agentes nunca escriben en la lógica ni en los sistemas de seguridad del PLC. Solo pueden cambiar consignas de una lista cerrada, dentro de límites, con aprobación humana y a través del equipo edge de la planta. ¦ In the approach shown here, agents never write to PLC logic or safety systems. They may only change setpoints from a closed list, within limits, with human approval and through the plant’s edge device.
Modelo de lenguaje ¦ Language model
Esta página no llama a ningún modelo: las respuestas están preparadas. En un piloto, el modelo lo elige Hornalba y la plataforma se instala en su infraestructura. ¦ This page calls no model: answers are prepared. In a pilot, Hornalba chooses the model and the platform is installed on its infrastructure.
Versión 2.1 · 26/11/2026 · preparado por MFM ¦ Version 2.1 · 26/11/2026 · prepared by MFM
Se borran los workflows publicados, las decisiones, los tickets y el registro de auditoría de esta sesión de Hornalba. Los datos vuelven a las 07:05 del jueves 26/11/2026. ¦ This clears the published workflows, decisions, tickets and audit log of this Hornalba session. Data returns to 07:05 on Thursday 26/11/2026.
Demo reiniciada · jueves 26/11/2026 07:05 ¦ Demo reset · Thursday 26/11/2026 07:05
Sesión anterior recuperada (⟦0⟧ acciones). Para empezar de cero, reinicia la demo. ¦ Previous session restored (⟦0⟧ actions). To start over, reset the demo.
Cada 5 min ¦ Every 5 min
Valdecierzo: intervención aprobada y en curso ¦ Valdecierzo: intervention approved and under way
Valdecierzo: propuesta rechazada, la espiral sigue en vigilancia ¦ Valdecierzo: proposal rejected, the spiral stays under watch
El detalle y la evidencia quedan en la decisión y en el registro de auditoría. ¦ Details and evidence are kept in the decision and in the audit log.
Ver la decisión ¦ View the decision
1 a 5 s ¦ 1 to 5 s
Parte de la red ¦ Network report
Calidad y continuidad ¦ Quality and continuity
Reclamación de cliente ¦ Customer complaint
Caída de una planta ¦ Plant outage
Revisar el panel con el agente ¦ Let the agent review the board
Reclamación de cliente: croissants pegados con hielo ¦ Customer complaint: croissants stuck together with ice
El acuse vence hoy. Pendiente de análisis. ¦ Acknowledgement due today. Awaiting analysis.
Respondida y stock bloqueado. ¦ Answered and stock held.
Respuesta rechazada; sigue abierta. ¦ Reply rejected; still open.
ayer ¦ yday
1 de 13 · Red de plantas ¦ 1 of 13 · Plant network
2 de 13 · Parte de la red ¦ 2 of 13 · Network report
3 de 13 · Máquinas y PLC ¦ 3 of 13 · Machines and PLCs
4 de 13 · Ficha de máquina ¦ 4 of 13 · Machine record
5 de 13 · Datos de PLC ¦ 5 of 13 · PLC data
6 de 13 · Decisión pendiente ¦ 6 of 13 · Pending decision
7 de 13 · Plan de mantenimiento ¦ 7 of 13 · Maintenance plan
8 de 13 · Crear automatización ¦ 8 of 13 · Create automation
9 de 13 · Preguntar a la red ¦ 9 of 13 · Ask the network
10 de 13 · Reclamación de cliente ¦ 10 of 13 · Customer complaint
11 de 13 · Caída de una planta ¦ 11 of 13 · Plant outage
12 de 13 · Agentes y autonomía ¦ 12 of 13 · Agents and autonomy
13 de 13 · Arquitectura y piloto ¦ 13 of 13 · Architecture and pilot
Parte de la red: todas las tarjetas ¦ Network report: every card
Jueves 26/11/2026 ¦ Thursday 26/11/2026
Lecturas de las 07:00 (CET) ¦ Readings at 07:00 (CET)
Máquinas en el panel ¦ Machines on the board
Muestra de 13 plantas ¦ Sample from 13 plants
Muestra de ⟦0⟧ ¦ Sample from ⟦0⟧
Críticas ¦ Critical
Avisos ¦ Warnings
En rango ¦ In range
Panel de máquinas ¦ Machine board
Pulsa una tarjeta para ver su detalle ¦ Click a card to see its detail
Filtrar tarjetas ¦ Filter cards
Desviación de temperatura de sellado ¦ Sealing temperature deviation
Presión diferencial del separador ¦ Separator differential pressure
Desviación de humedad ¦ Humidity deviation
Temperatura de descarga del compresor ¦ Compressor discharge temperature
Intensidad del eje 4 ¦ Axis 4 current
Antigüedad de la copia del programa ¦ Age of the program backup
Deriva de la temperatura del aceite ¦ Oil temperature drift
Desviación de la zona 2 del horno ¦ Oven zone 2 deviation
14 paradas ¦ 14 stops
Atascos por turno ¦ Jams per shift
5 veces ¦ 5 times
Desescarches fuera de ciclo en 7 días ¦ Off-cycle defrosts in 7 days
Diferencia de velocidad entre rodillos ¦ Speed difference between rollers
paradas ¦ stops
veces ¦ times
aviso > ⟦0⟧ ¦ warning > ⟦0⟧
Observación ¦ Observation
Sin incidencias ¦ No issues
Sube desde hace 13 días; propuesta de intervención preparada. ¦ Rising for 13 days; intervention proposal ready.
Reducir velocidad y sustituir el rodamiento el viernes. ¦ Reduce speed and replace the bearing on Friday.
La mordaza inferior tarda más en recuperar temperatura. ¦ The lower jaw takes longer to recover temperature.
Revisar la resistencia de la mordaza en el próximo cambio de formato. ¦ Check the jaw heater at the next changeover.
El separador de aceite está cerca de su límite. ¦ The oil separator is close to its limit.
Cambiar separador con el compresor de reserva en marcha. ¦ Replace the separator with the standby compressor running.
La humedad oscila en la zona 2 de la cámara. ¦ Humidity fluctuates in zone 2 of the chamber.
Comprobar el humidificador y la sonda de la zona 2. ¦ Check the humidifier and the zone 2 probe.
Temperatura de descarga por encima de lo habitual. ¦ Discharge temperature above normal.
Revisar la refrigeración del aceite esta semana. ¦ Check the oil cooling this week.
Picos de intensidad y dos rearmes en el turno de noche. ¦ Current peaks and two resets on the night shift.
Sustituir el mazo de cables del eje 4. ¦ Replace the axis 4 cable harness.
Copia caducada y reductor del eje 2 con vibración creciente. ¦ Outdated backup and rising vibration on the axis 2 gearbox.
Copiar el programa en la próxima parada y cambiar el reductor. ¦ Back up the program at the next stop and replace the gearbox.
El intercambiador pierde rendimiento. ¦ The heat exchanger is losing performance.
Limpiar el intercambiador y revisar la bomba de aceite. ¦ Clean the heat exchanger and check the oil pump.
Consumo alto con la misma receta. ¦ High draw on the same recipe.
Revisar la transmisión y el engrase. ¦ Check the transmission and lubrication.
La banda trabaja por encima de la tensión recomendada. ¦ The belt is running above the recommended tension.
Retensar la banda y sustituir tres rodillos. ¦ Re-tension the belt and replace three rollers.
La zona 2 no mantiene la consigna. ¦ Zone 2 does not hold its setpoint.
Revisar el quemador y la sonda de la zona 2. ¦ Check the burner and the zone 2 probe.
Patrón de desgaste de las mordazas de sellado. ¦ Sealing jaw wear pattern.
Sustituir las mordazas en el cambio de formato del domingo. ¦ Replace the jaws at Sunday’s changeover.
Afectan a la temperatura del producto. ¦ They affect product temperature.
Revisar la válvula de desescarche y la sonda. ¦ Check the defrost valve and the probe.
Puede alterar el laminado de la masa. ¦ It may disturb dough lamination.
Ajustar la sincronización de los rodillos. ¦ Adjust roller synchronisation.
Agente de parte diario ¦ Daily report agent
Reunir las tarjetas del panel ¦ Gather the cards on the board
29 máquinas de 13 plantas ¦ 29 machines from 13 plants
Revisar Valdecierzo ¦ Review Valdecierzo
Revisar Robledal ¦ Review Robledal
Revisar Montalbar ¦ Review Montalbar
Revisar La Ribera ¦ Review La Ribera
Revisar Puerto Sur ¦ Review Puerto Sur
Revisar Saint-Aubin ¦ Review Saint-Aubin
Revisar Nowa Wola ¦ Review Nowa Wola
Revisar Colverde ¦ Review Colverde
Revisar Eschenfeld ¦ Review Eschenfeld
Revisar Pinewood ¦ Review Pinewood
Revisar Redfield ¦ Review Redfield
Revisar Valle Azul ¦ Review Valle Azul
Revisar Binh Lac ¦ Review Binh Lac
1 crítica: rodamiento de la espiral · 1 aviso en envasado ¦ 1 critical: spiral bearing · 1 warning in packaging
1 aviso: separador del compresor ¦ 1 warning: compressor separator
1 aviso: humedad en fermentación ¦ 1 warning: proofing humidity
1 aviso: compresor de frío ¦ 1 warning: refrigeration compressor
1 aviso en el paletizador · datos con retardo ¦ 1 warning on the palletiser · delayed data
Copia de programa caducada y reductor con vibración ¦ Outdated program backup and vibrating gearbox
1 aviso: aceite de la freidora ¦ 1 warning: fryer oil
Todo en rango ¦ All in range
1 aviso: consumo de la amasadora ¦ 1 warning: mixer power draw
1 aviso: tensión de la banda ¦ 1 warning: belt tension
1 aviso: horno · planta aún en alta, vista parcial ¦ 1 warning: oven · plant still onboarding, partial view
1 aviso: atascos en envasado ¦ 1 warning: packaging jams
2 avisos: desescarche de la espiral y laminadora ¦ 2 warnings: spiral defrost and laminating line
Cruzar hallazgos con órdenes y decisiones abiertas ¦ Match findings with open orders and decisions
8 ya tenían decisión abierta · 6 son nuevos ¦ 8 already had an open decision · 6 are new
Buscar patrones entre plantas ¦ Look for cross-plant patterns
Tres espirales con síntomas en el lado de arrastre o desescarche ¦ Three spirals with symptoms on the drive side or defrost
Crear avisos y actualizar decisiones ¦ Create notifications and update decisions
6 avisos creados · 8 decisiones actualizadas ¦ 6 notifications created · 8 decisions updated
Publicar el resumen a las jefaturas de planta ¦ Send the summary to plant managers
Enviado en el idioma de cada planta (simulado) ¦ Sent in each plant’s language (simulated)
Descargar parte (PDF) ¦ Download report (PDF)
Parte generado a las ⟦0⟧ ¦ Report generated at ⟦0⟧
Hallazgos, responsables y acción propuesta ¦ Findings, owners and proposed action
Ver en auditoría ¦ View in audit log
Tarjetas revisadas ¦ Cards reviewed
Avisos nuevos creados ¦ New notifications created
Decisiones actualizadas ¦ Decisions updated
Lo que ninguna planta ve por sí sola ¦ What no single plant can see
Las espirales de Valdecierzo, Pinewood y Binh Lac presentan síntomas a la vez. Conviene revisar el estándar de sellos, tensado y desescarche en toda la red. ¦ The Valdecierzo, Pinewood and Binh Lac spirals show symptoms at the same time. The seal, tensioning and defrost standard should be reviewed network-wide.
Ver el plan de mantenimiento ¦ View the maintenance plan
Aviso o decisión ¦ Notification or decision
Nuevo ¦ New
Actualizada ¦ Updated
Responsable ¦ Owner
Qué ha visto ¦ What it saw
Acción propuesta ¦ Proposed action
Indicador ¦ Indicator
Lectura ¦ Reading
Registro de ejecución del agente ¦ Agent execution log
Parte generado · 6 avisos creados (simulado) ¦ Report generated · 6 notifications created (simulated)
Vista previa del informe ¦ Report preview
Parte de la red de plantas ¦ Plant network report
Descargar HTML ¦ Download HTML
Abrir en pestaña nueva ¦ Open in a new tab
Guardar como PDF ¦ Save as PDF
Imprimir o guardar como PDF ¦ Print or save as PDF
Abre el informe en una pestaña nueva para imprimirlo ¦ Open the report in a new tab to print it
Revisión de todas las tarjetas del panel ¦ Review of every card on the board
Código ¦ Code
Generado ¦ Generated
Lecturas ¦ Readings
Firma ¦ Signature
1. Resumen ¦ 1. Summary
Una máquina crítica en Valdecierzo con propuesta de intervención y trece avisos repartidos por la red. Seis avisos son nuevos y ocho corresponden a decisiones ya abiertas. ¦ One critical machine in Valdecierzo with an intervention proposal and thirteen warnings across the network. Six notifications are new and eight belong to decisions already open.
2. Hallazgos y acciones ¦ 2. Findings and actions
3. Patrón entre plantas ¦ 3. Cross-plant pattern
4. Máquinas en rango ¦ 4. Machines in range
Generado con Agentic Platform el ⟦0⟧ · Demostración con datos sintéticos · preparado por MFM ¦ Generated with Agentic Platform on ⟦0⟧ · Demonstration with synthetic data · prepared by MFM
Informe generado ¦ Report generated
Revisión del panel solicitada ¦ Board review requested
29 tarjetas ¦ 29 cards
Parte de la red generado ¦ Network report generated
14 hallazgos · 6 avisos creados · 8 decisiones actualizadas ¦ 14 findings · 6 notifications created · 8 decisions updated
Reclamación LBH-2026-0417 ¦ Complaint LBH-2026-0417
Recibida el 25/11 a las 18:40 (Binh Lac) ¦ Received 25/11 at 18:40 (Binh Lac)
Planta de Binh Lac · cliente ficticio ¦ Binh Lac plant · fictitious customer
Informe antes del 02/12 ¦ Report due by 02/12
Sin analizar ¦ Not analysed
Respondida ¦ Answered
Respuesta rechazada ¦ Reply rejected
Esperando aprobación ¦ Waiting for approval
Analizar reclamación ¦ Analyse complaint
Qué hará el agente ¦ What the agent will do
Análisis completado ¦ Analysis completed
Análisis de la reclamación ¦ Complaint analysis
Análisis de la reclamación: ⟦0⟧ ¦ Complaint analysis: ⟦0⟧
Correo del cliente ¦ Customer email
En inglés ¦ In English
Extraer y validar ¦ Extract and validate
Lote y producto ¦ Batch and product
Leer el PLC ¦ Read the PLC
Horas de fabricación ¦ Production hours
Alcance e informe ¦ Scope and report
Otros lotes y 8D ¦ Other batches and 8D
Aprobación de Calidad ¦ Quality approval
Planta de Binh Lac ¦ Binh Lac plant
Respuesta y contención ¦ Reply and containment
Tal como ha llegado ¦ As received
De ¦ From
Para ¦ To
Producto ¦ Product
Lote ¦ Batch
Cantidad ¦ Quantity
Defecto ¦ Defect
Sin riesgo sanitario declarado ¦ No health risk reported
Plazo ¦ Deadline
Ref. ¦ Ref.
Una reclamación llega en inglés a la planta de Binh Lac. ¦ A complaint arrives in English at the Binh Lac plant.
La diferencia es que el agente puede ir a los datos del PLC de la hora exacta en que se fabricó el lote. ¦ The difference is that the agent can go to the PLC data for the exact time the batch was made.
Encuentra la causa, otro lote afectado y dónde están las cajas. La respuesta no sale sin aprobación. ¦ It finds the cause, another affected batch and where the cases are. The reply does not go out without approval.
Pulsa «Analizar reclamación», revisa la curva de temperatura y aprueba. ¦ Click “Analyse complaint”, check the temperature curve and approve.
Agente de reclamaciones ¦ Complaints agent
Leer el correo en inglés y extraer los datos ¦ Read the English email and extract the data
8 datos extraídos · sin riesgo sanitario declarado ¦ 8 data points extracted · no health risk reported
Comprobar el lote BNL-261118-L2 ¦ Check batch BNL-261118-L2
Existe · línea 2 · 18/11 de 06:00 a 14:00 · 1.240 cajas ¦ Found · line 2 · 18/11 from 06:00 to 14:00 · 1,240 cases
Leer el PLC de la espiral BNL-L2-ESP-01 en esas horas ¦ Read spiral BNL-L2-ESP-01 PLC data for those hours
Aire del túnel de -34 °C a -22 °C entre las 09:20 y las 10:00 ¦ Tunnel air from −34 °C to −22 °C between 09:20 and 10:00
Explicar la subida de temperatura ¦ Explain the temperature rise
Desescarche fuera de ciclo en plena producción · salida del producto a -11 °C ¦ Off-cycle defrost during production · product exit at −11 °C
Comprobar cambios en el programa del PLC ¦ Check for PLC program changes
Sin cambios esa semana ¦ No changes that week
Acotar las cajas producidas durante la desviación ¦ Narrow down the cases made during the deviation
318 cajas del lote reclamado ¦ 318 cases of the complained batch
Buscar la misma desviación en otros días ¦ Look for the same deviation on other days
20/11: lote BNL-261120-L2, 96 cajas más ¦ 20/11: batch BNL-261120-L2, 96 more cases
Localizar las cajas ¦ Locate the cases
308 en almacén · 48 en Lotus Bay Hospitality · 58 en otro distribuidor ¦ 308 in our warehouse · 48 at Lotus Bay Hospitality · 58 at another distributor
Relacionar con averías abiertas ¦ Link to open breakdowns
Coincide con DEC-2602: válvula de desescarche ¦ Matches DEC-2602: defrost valve
Preparar el informe 8D y la respuesta en inglés ¦ Prepare the 8D report and the reply in English
Borradores listos para revisión ¦ Drafts ready for review
Descargar informe 8D ¦ Download 8D report
Cajas afectadas en dos lotes ¦ Cases affected across two batches
Todavía en nuestro almacén ¦ Still in our warehouse
Ya entregadas ¦ Already delivered
Días hábiles para el informe ¦ Working days left for the report
Lo que registró el PLC el 18/11 ¦ What the PLC recorded on 18/11
Temperatura de aire del túnel · hora de Binh Lac · BNL-L2-ESP-01 ¦ Tunnel air temperature · Binh Lac time · BNL-L2-ESP-01
Ver la máquina ¦ View the machine
Aviso -30 ¦ Warning −30
Crítico ⟦0⟧ ¦ Critical ⟦0⟧
Desescarche ¦ Defrost
El producto de esas horas salió a -11 °C. El límite es -18 °C. ¦ Product from those hours left at −11 °C. The limit is −18 °C.
Dónde están las cajas ¦ Where the cases are
Cajas ¦ Cases
Almacén de Binh Lac ¦ Binh Lac warehouse
Segundo distribuidor ¦ Second distributor
Bloquear ¦ Hold
Recoger y reponer ¦ Collect and replace
Avisar y bloquear ¦ Notify and hold
Resaltado lo que el agente ha extraído. El texto no se modifica. ¦ Highlighted: what the agent extracted. The text is not modified.
Ficha de la reclamación ¦ Complaint record
Cliente ¦ Customer
Lotus Bay Hospitality (ficticio) ¦ Lotus Bay Hospitality (fictitious)
Croissant de mantequilla 70 g, congelado ¦ Butter croissant 70 g, frozen
Fabricado ¦ Produced
18/11 · línea 2 · 06:00 a 14:00 ¦ 18/11 · line 2 · 06:00 to 14:00
Piezas pegadas, hielo y laminado irregular ¦ Pieces stuck together, ice and uneven lamination
Riesgo sanitario ¦ Health risk
No declarado; lo confirma Calidad ¦ None reported; Quality to confirm
Evidencias ¦ Evidence
2 fotos y 6 cajas guardadas por el cliente ¦ 2 photos and 6 cases kept by the customer
Plazos ¦ Deadlines
Acuse en 24 h · informe en 5 días hábiles ¦ Acknowledge within 24 h · report within 5 working days
Registro ¦ Record
Informe 8D ¦ 8D report
Borrador preparado por el agente ¦ Draft prepared by the agent
Hornalba · Calidad (documento de ejemplo) ¦ Hornalba · Quality (sample document)
Informe de investigación ¦ Investigation report
D1 · Equipo ¦ D1 · Team
Calidad y Mantenimiento de la planta de Binh Lac, con apoyo de Ingeniería global. ¦ Binh Lac plant Quality and Maintenance, supported by Global engineering.
D2 · Problema ¦ D2 · Problem
Croissants congelados pegados en bloques, con cristales de hielo y laminado irregular tras el horneado. Lote BNL-261118-L2. ¦ Frozen croissants stuck together in blocks, with ice crystals and uneven lamination after baking. Batch BNL-261118-L2.
D3 · Contención ¦ D3 · Containment
Bloqueo de 308 cajas en almacén, recogida de 48 en el cliente y aviso al segundo distribuidor por 58 cajas. ¦ Hold on 308 cases in the warehouse, collection of 48 from the customer and notice to the second distributor for 58 cases.
D4 · Causa raíz (provisional) ¦ D4 · Root cause (provisional)
Desescarche fuera de ciclo del congelador espiral BNL-L2-ESP-01 durante la producción. El producto salió a -11 °C frente a un límite de -18 °C y volvió a congelarse en la caja. Causa técnica probable: válvula de desescarche; pendiente de confirmar al desmontarla. ¦ Off-cycle defrost of spiral freezer BNL-L2-ESP-01 during production. Product left at −11 °C against a −18 °C limit and refroze in the case. Probable technical cause: defrost valve, to be confirmed on dismantling.
D5 · Acciones correctivas ¦ D5 · Corrective actions
Sustituir la electroválvula de desescarche y verificar la sonda. Fecha prevista: 05/12. ¦ Replace the defrost solenoid valve and verify the probe. Planned date: 05/12.
D6 · Implantación y comprobación ¦ D6 · Implementation and check
Hasta la reparación, desescarche solo fuera de producción y aviso si la salida del producto supera -18 °C durante 5 minutos. ¦ Until repaired, defrost only outside production and alert if product exit stays above −18 °C for 5 minutes.
D7 · Prevención ¦ D7 · Prevention
Llevar la misma regla de temperatura de salida a las cinco espirales de la red y revisar el programa de desescarche. ¦ Apply the same exit temperature rule to the network’s five spirals and review the defrost schedule.
D8 · Cierre ¦ D8 · Closure
Pendiente de verificar eficacia durante dos semanas y de la conformidad del cliente. ¦ Pending two weeks of effectiveness checks and customer sign-off.
Respuesta al cliente ¦ Reply to the customer
Borrador en el idioma del cliente ¦ Draft in the customer’s language
Editada por Calidad ¦ Edited by Quality
Se envía (inglés) ¦ To be sent (English)
Traducción al español ¦ Spanish translation
Idioma de la respuesta ¦ Reply language
Responsable de Calidad de Binh Lac ¦ Binh Lac Quality Manager
Enviar la respuesta, bloquear stock y abrir la orden ¦ Send the reply, hold stock and open the work order
Causa probable: desescarche fuera de ciclo durante la producción. El acuse al cliente vence hoy a las 18:40 de Binh Lac. ¦ Probable cause: off-cycle defrost during production. The acknowledgement to the customer is due today at 18:40 Binh Lac time.
Cajas a bloquear en almacén ¦ Cases to hold in the warehouse
Cajas a recoger o avisar ¦ Cases to collect or notify
Lotes afectados ¦ Batches affected
Abono al cliente ¦ Customer credit
Lo confirma Comercial ¦ To be confirmed by Sales
El almacén bloquea las 308 cajas ¦ The warehouse holds the 308 cases
Se envía la respuesta al cliente en inglés ¦ The reply is sent to the customer in English
Se crea la orden de trabajo de la válvula de desescarche ¦ The defrost valve work order is created
Se activa el aviso de temperatura de salida del producto en la línea 2 ¦ The product exit temperature alert is switched on for line 2
Se avisa al segundo distribuidor ¦ The second distributor is notified
Nada sale al cliente sin aprobación ¦ Nothing goes to the customer without approval
Editar respuesta ¦ Edit reply
Aprobar y enviar ¦ Approve and send
Reclamación analizada · pendiente de aprobación ¦ Complaint analysed · awaiting approval
Editar la respuesta al cliente ¦ Edit the reply to the customer
Texto de la respuesta ¦ Reply text
Guardar versión ¦ Save version
Rechazar la respuesta ¦ Reject the reply
Por ejemplo: falta el análisis de las muestras ¦ For example: the sample analysis is missing
Motivo: ⟦0⟧. No se ha enviado ni bloqueado nada. ¦ Reason: ⟦0⟧. Nothing has been sent or held.
Bloquear las cajas ¦ Hold the cases
308 cajas bloqueadas ¦ 308 cases held
Enviar la respuesta ¦ Send the reply
Enviada a Lotus Bay Hospitality (simulado) ¦ Sent to Lotus Bay Hospitality (simulated)
Crear la orden de la válvula ¦ Create the valve work order
Activar el aviso de temperatura de salida ¦ Switch on the exit temperature alert
Activo en la línea 2; no cambia el programa del PLC ¦ Active on line 2; the PLC program is unchanged
Avisar al segundo distribuidor ¦ Notify the second distributor
Aviso enviado (simulado) ¦ Notice sent (simulated)
Esta reclamación: antes y ahora ¦ This complaint: before and now
Estimación frente a simulación ¦ Estimate versus simulation
Tarea ¦ Task
Hoy · estimación ¦ Today · estimate
Con agentes ¦ With agents
Localizar lote y horas ¦ Find batch and hours
2 a 4 horas ¦ 2 to 4 hours
Segundos ¦ Seconds
Revisar registros de la máquina ¦ Review machine records
1 a 2 días ¦ 1 to 2 days
Detectar otros lotes ¦ Spot other batches
A menudo no se hace ¦ Often not done
Automático ¦ Automatic
Redactar 8D y respuesta ¦ Write the 8D and the reply
Medio día ¦ Half a day
Borrador para revisar ¦ Draft to review
Informe 8D · LBH-2026-0417 ¦ 8D report · LBH-2026-0417
Borrador pendiente de verificación ¦ Draft pending verification
Anexo · Cajas afectadas ¦ Annex · Affected cases
Ubicación ¦ Location
Anexo · Temperatura de aire del túnel el 18/11 ¦ Annex · Tunnel air temperature on 18/11
Temperatura ¦ Temperature
Análisis de reclamación lanzado ¦ Complaint analysis started
Reclamación analizada ¦ Complaint analysed
LBH-2026-0417 · 2 lotes · 414 cajas · 8D y respuesta en borrador ¦ LBH-2026-0417 · 2 batches · 414 cases · 8D and reply in draft
Respuesta a reclamación aprobada ¦ Complaint reply approved
LBH-2026-0417 · 308 cajas bloqueadas · ⟦0⟧ (simulado) ¦ LBH-2026-0417 · 308 cases held · ⟦0⟧ (simulated)
Respuesta a reclamación rechazada ¦ Complaint reply rejected
Respuesta editada ¦ Reply edited
Simulacro de caída de una planta ¦ Plant outage drill
Ejercicio: no se envía nada ni se toca ninguna planta ¦ Exercise: nothing is sent and no plant is touched
Qué quieres poner a prueba ¦ What do you want to test
Planta que cae ¦ Plant that goes down
Causa ¦ Cause
Duración ¦ Duration
7 días ¦ 7 days
21 días ¦ 21 days
Corte eléctrico ¦ Power cut
Fallo de la central de frío ¦ Refrigeration plant failure
Ciberataque a los PLC ¦ Cyberattack on the PLCs
Iniciar simulacro ¦ Start drill
Qué usa el simulacro ¦ What the drill uses
Capacidades, stocks, márgenes y clientes son sintéticos. En un piloto saldrían del plan de producción, el almacén y el registro de PLC. ¦ Capacities, stock, margins and customers are synthetic. In a pilot they would come from the production plan, the warehouse and the PLC registry.
¿Qué pasa si mañana se para una planta entera? Hoy la respuesta se construye a base de llamadas. ¦ What happens if a whole plant stops tomorrow? Today the answer is pieced together through phone calls.
Aquí se elige planta, causa y duración, y sale quién puede fabricar qué, y qué se queda sin cubrir. ¦ Here you pick plant, cause and duration, and see who can make what, and what stays uncovered.
Prueba Nowa Wola a 7 días: enseña de qué depende de una sola planta. Y Saint-Aubin con ciberataque: la copia caducada importa. ¦ Try Nowa Wola for 7 days: it shows what depends on a single plant. And Saint-Aubin with a cyberattack: the outdated backup matters.
Elige planta, causa y duración y pulsa «Iniciar simulacro». ¦ Pick plant, cause and duration, then click “Start drill”.
Orquestador de contingencias ¦ Contingency orchestrator
Detectar que el edge pasa a batería ¦ Detect the edge device switching to battery
Sin alimentación en toda la planta ¦ No power across the plant
Estimar la autonomía de las cámaras ¦ Estimate cold store holding time
⟦0⟧ horas antes de superar -18 °C ¦ ⟦0⟧ hours before rising above −18 °C
Detectar pérdida de presión en la central frigorífica ¦ Detect pressure loss in the refrigeration plant
Compresores parados ¦ Compressors stopped
Detectar programas cambiados sin orden ¦ Detect programs changed without an order
Huellas distintas en varios autómatas ¦ Fingerprints differ on several PLCs
Proponer aislar la red industrial ¦ Propose isolating the industrial network
Requiere decisión de una persona; el agente no corta la red ¦ Needs a person to decide; the agent does not cut the network
Inventariar lo que se para en ⟦0⟧ ¦ List what stops in ⟦0⟧
⟦0⟧ líneas y ⟦1⟧ autómatas ¦ ⟦0⟧ lines and ⟦1⟧ PLCs
Calcular la demanda afectada ¦ Work out the affected demand
⟦0⟧ t en el periodo ¦ ⟦0⟧ t in the period
Buscar capacidad compatible en otras plantas ¦ Find compatible capacity in other plants
Ninguna llega a tiempo: solo hay stock ¦ None can make it in time: stock only
⟦0⟧ plantas pueden ayudar ¦ ⟦0⟧ plants can help
Comprobar stock fuera de la planta y producto en riesgo ¦ Check off-site stock and product at risk
⟦0⟧ t en las cámaras de la planta ¦ ⟦0⟧ t in the plant’s cold stores
Cámaras no afectadas ¦ Cold stores unaffected
Comprobar que los programas se pueden recuperar ¦ Check the programs can be recovered
Todas las copias de la muestra están vigentes ¦ All backups in the sample are current
Hay copias caducadas: retrasan el arranque ¦ Some backups are outdated: they delay restart
Preparar avisos a clientes y al comité de crisis ¦ Prepare notices to customers and the crisis committee
⟦0⟧ clientes en los borradores ¦ ⟦0⟧ customers in the drafts
Montar el plan de contingencia ¦ Build the contingency plan
⟦0⟧ % de la demanda cubierta ¦ ⟦0⟧% of demand covered
Nuevo simulacro ¦ New drill
Descargar informe (PDF) ¦ Download report (PDF)
Simulacro: ⟦0⟧ parada durante ⟦1⟧ ¦ Drill: ⟦0⟧ down for ⟦1⟧
⟦0⟧. Hora de inicio ficticia: hoy a las ⟦1⟧ (CET). ¦ ⟦0⟧. Fictitious start time: today at ⟦1⟧ (CET).
Demanda cubierta ¦ Demand covered
Cubiertas ⟦0⟧ de ⟦1⟧ t ¦ ⟦0⟧ of ⟦1⟧ t covered
Impacto económico estimado ¦ Estimated financial impact
Sobrecoste más margen perdido ¦ Extra cost plus lost margin
Producto en riesgo en cámaras ¦ Product at risk in cold stores
Autonomía de ⟦0⟧ h ¦ Holding time ⟦0⟧ h
El frío sigue en marcha ¦ Refrigeration still running
Clientes a avisar ¦ Customers to notify
Borradores preparados ¦ Drafts prepared
Reparto de la producción ¦ Production reallocation
Reparto de la producción: ⟦0⟧ ¦ Production reallocation: ⟦0⟧
Quién puede fabricar qué mientras dure la parada ¦ Who can make what while the stop lasts
Planta caída ¦ Plant down
Fabrica ¦ Makes it
⟦0⟧ % cubierto ¦ ⟦0⟧% covered
Cobertura por producto ¦ Coverage by product
Demanda ¦ Demand
Desde stock ¦ From stock
Se fabrica en ¦ Made in
Sin cubrir ¦ Uncovered
Cubierto ¦ Covered
Nadie llega a tiempo ¦ Nobody can make it in time
Panecillos para hostelería ¦ Foodservice rolls
Bollería congelada ¦ Frozen pastry
Pastelería ¦ Cakes
Panecillos ¦ Rolls
Croissants ¦ Croissants
¿Se pueden recuperar los autómatas? ¦ Can the PLCs be recovered?
Antigüedad de la copia ¦ Backup age
Recuperable ¦ Recoverable
Copia caducada ¦ Outdated backup
El arranque se alarga ¦ Restart takes longer
Sin una copia vigente habría que reconstruir el programa con el fabricante: se estiman 3 días más. ¦ Without a current backup the program would have to be rebuilt with the manufacturer: an estimated 3 extra days.
Orden de rearranque ¦ Restart sequence
Paso ⟦0⟧ ¦ Step ⟦0⟧
Paso ¦ Step
Actividad ¦ Activity
Detalle ¦ Detail
Energía y servicios ¦ Power and utilities
Subestación, aire comprimido y caldera ¦ Substation, compressed air and boiler
Frío ¦ Refrigeration
Central frigorífica y cámaras antes que las líneas ¦ Refrigeration plant and cold stores before the lines
Autómatas ¦ PLCs
Comprobar que cada PLC arranca con su programa y consignas ¦ Check each PLC starts with its program and setpoints
Líneas ¦ Lines
Arranque escalonado y primer producto retenido hasta verificar ¦ Staged restart, first product held until verified
Contener ¦ Contain
Cerrar cámaras y mover producto por prioridad ¦ Close cold stores and move product by priority
Reparar la central ¦ Repair the plant
Fabricante del equipo y comprobación de fugas ¦ Equipment manufacturer and leak checks
Bajar temperatura ¦ Pull temperature down
Espirales y cámaras en consigna antes de producir ¦ Spirals and cold stores at setpoint before producing
Arranque escalonado con registro de temperatura ¦ Staged restart with temperature logging
Aislar ¦ Isolate
Separar la red industrial y conservar evidencias ¦ Segregate the industrial network and preserve evidence
Verificar copias ¦ Verify backups
Comparar huellas y elegir la última versión autorizada ¦ Compare fingerprints and pick the last authorised version
Restaurar ¦ Restore
Ingeniería carga los programas con la herramienta del fabricante ¦ Engineering loads programs with the vendor tool
Validar ¦ Validate
Pruebas de seguridad antes de volver a producir ¦ Safety tests before producing again
Comité de crisis ¦ Crisis committee
Plan de contingencia para ⟦0⟧ ¦ Contingency plan for ⟦0⟧
Quedan ⟦0⟧ t sin cubrir. Hay que decidir a qué clientes se prioriza. ¦ ⟦0⟧ t remain uncovered. Someone must decide which customers come first.
Toda la demanda del periodo queda cubierta con stock y traslados. ¦ All demand in the period is covered by stock and transfers.
Duración supuesta ¦ Assumed duration
Producción que se traslada ¦ Production transferred
Sobrecoste de fabricar y transportar ¦ Extra manufacturing and transport cost
Margen perdido por lo no cubierto ¦ Margin lost on uncovered volume
Reservar capacidad en las plantas receptoras ¦ Reserve capacity in the receiving plants
Priorizar el stock existente entre clientes ¦ Prioritise existing stock among customers
Pedir transporte frigorífico para el producto en riesgo ¦ Book refrigerated transport for the product at risk
Mantener las cámaras vigiladas ¦ Keep the cold stores monitored
Enviar a cada cliente su aviso, tras revisión comercial ¦ Send each customer their notice, after sales review
Convocar a ciberseguridad y preparar la restauración de programas ¦ Call in cybersecurity and prepare program restoration
Convocar a mantenimiento y al proveedor del equipo ¦ Call in maintenance and the equipment supplier
En un simulacro no se ejecuta ninguna acción real ¦ A drill performs no real action
Activar el plan (simulacro) ¦ Activate the plan (drill)
Plan activado en el simulacro: no se ha enviado nada ¦ Plan activated in the drill: nothing has been sent
Rechazar el plan ¦ Reject the plan
Por ejemplo: la planta receptora no tiene personal ¦ For example: the receiving plant has no staff
Cronómetro ¦ Stopwatch
Tiempo de la simulación frente a una estimación de hoy ¦ Simulation time against an estimate for today
Plan con agentes (simulado) ¦ Plan with agents (simulated)
Primer plan hoy (estimación) ¦ First plan today (estimate)
Plan completo hoy (estimación) ¦ Full plan today (estimate)
4–8 h ¦ 4–8 h
1–2 días ¦ 1–2 days
Registro del simulacro ¦ Drill log
Descargar reparto (CSV) ¦ Download reallocation (CSV)
Simulacro de caída · ⟦0⟧ ¦ Outage drill · ⟦0⟧
Demanda (t) ¦ Demand (t)
Desde stock (t) ¦ From stock (t)
Sin cubrir (t) ¦ Uncovered (t)
1. Cobertura por producto ¦ 1. Coverage by product
2. Copias de programa ¦ 2. Program backups
3. Orden de rearranque ¦ 3. Restart sequence
4. Alcance del ejercicio ¦ 4. Scope of the exercise
Simulacro con datos sintéticos. No se ha enviado ningún aviso ni se ha actuado sobre ninguna planta. ¦ Drill with synthetic data. No notice has been sent and no plant has been acted on.
Simulacro de caída iniciado ¦ Outage drill started
Plan de contingencia preparado ¦ Contingency plan prepared
⟦0⟧ · ⟦1⟧ % de la demanda cubierta ¦ ⟦0⟧ · ⟦1⟧% of demand covered
Plan de contingencia activado (simulacro) ¦ Contingency plan activated (drill)
⟦0⟧ · sin acciones reales ¦ ⟦0⟧ · no real actions
Plan de contingencia rechazado (simulacro) ¦ Contingency plan rejected (drill)
Cada tarjeta es una máquina, con su indicador más relevante ahora mismo. ¦ Each card is a machine, showing its most relevant indicator right now.
Revisar esto planta por planta lleva la mañana; el agente lo hace en segundos y deja los avisos creados. ¦ Reviewing this plant by plant takes the morning; the agent does it in seconds and leaves the notifications created.
Lo que ya tenía una decisión abierta se actualiza, no se duplica. ¦ Anything with an open decision is updated, not duplicated.
Pulsa «Revisar el panel con el agente» y mira cómo recorre las plantas. ¦ Click “Let the agent review the board” and watch it go through the plants.
Rosquillas ¦ Doughnuts
Trenzas ¦ Braids
Cambiar de industria ¦ Switch industry
Zaragoza ¦ Zaragoza
sur de Vietnam ¦ southern Vietnam
Pensilvania ¦ Pennsylvania
región de Lyon ¦ Lyon region
región de Łódź ¦ Łódź region
región de Parma ¦ Parma region
región de Leipzig ¦ Leipzig region
Sevilla ¦ Seville
Francia ¦ France
Polonia ¦ Poland
Italia ¦ Italy
Vietnam ¦ Vietnam
`));
