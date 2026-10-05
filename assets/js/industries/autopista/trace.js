/* Autopista Multimotor · registros de traza (vehículos, pedidos, clientes, campañas de retirada y reclamaciones).
 * Los lee App.traceModal desde DATA.trace[código] (claves en mayúsculas).
 * Escenario de demostración con datos sintéticos (MFM). */
agenticPack('autopista', {
  trace: {
    "VIN-2026-MAD-SEAT-03": {
      "kind": "Vehículo",
      "title": "Vehículo VIN-2026-MAD-SEAT-03 · Seat Ibiza 1.0 TSI FR",
      "summary": [
        [
          "Vehículo",
          "Seat Ibiza 1.0 TSI FR 110 CV"
        ],
        [
          "Marca y canal",
          "Seat · Venta (concesionario Madrid)"
        ],
        [
          "SKU",
          "SEAT-IBIZA-FR-2026-003"
        ],
        [
          "Ubicación",
          "Zona de entregas · Hub Marqués de Soria"
        ],
        [
          "Recepción",
          "15/09/2026"
        ],
        [
          "Precio de venta",
          "63.500 €"
        ],
        [
          "Cliente",
          "José María López · CLI-2026-0331"
        ],
        [
          "Estado",
          "Entrega prevista 07/10/2026 10:30"
        ]
      ],
      "back": [
        {
          "when": "2026-09-15 14:00",
          "stage": "Llegada al hub",
          "detail": "Recepción del vehículo desde fábrica de Martorell. Inspección inicial sin defectos.",
          "ref": "REC-2026-0915-03",
          "tone": "brand"
        },
        {
          "when": "2026-09-16 09:30",
          "stage": "Alta en inventario",
          "detail": "Alta en Odoo Inventario y SAP ERP. Fotografía 360° para Salesforce CRM y publicación en la web.",
          "ref": "ODOO-INV-5521",
          "tone": "brand"
        },
        {
          "when": "2026-10-01 16:45",
          "stage": "Consulta de cliente",
          "detail": "Visita presencial de José María López. Solicita prueba de conducción.",
          "ref": "CLI-2026-0331",
          "tone": "brand"
        },
        {
          "when": "2026-10-04 11:00",
          "stage": "Prueba de conducción",
          "detail": "Resultado positivo. Pedido de venta PED-2026-001847 creado en SAP ERP.",
          "ref": "PED-2026-001847",
          "tone": "ok"
        },
        {
          "when": "2026-10-05 10:15",
          "stage": "Solicitud de financiación",
          "detail": "Banco Sabadell aprueba en 24 h: 60 meses, TIN 3,99 %, entrada de 20.000 €, cuota de 801 €.",
          "ref": "SAB-FIN-2026-18472",
          "tone": "ok"
        },
        {
          "when": "2026-10-06 12:20",
          "stage": "Discrepancia de TIN",
          "detail": "El contrato del banco recoge un 4,25 % frente al 3,99 % ofrecido en la propuesta. Finanzas pide corrección antes de la firma.",
          "ref": "CLM-2026-001",
          "tone": "crit"
        },
        {
          "when": "2026-10-07 09:00",
          "stage": "Firma de contrato",
          "detail": "Firma electrónica en DocuSign pendiente de la corrección del TIN.",
          "ref": "DS-2026-7741",
          "tone": "warn"
        }
      ],
      "forward": {
        "title": "Documentos y entrega",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "PED-2026-001847",
            "what": "Pedido de venta",
            "when": "04/10/2026",
            "system": "SAP ERP",
            "status": {
              "status": "ok",
              "label": "Confirmado"
            }
          },
          {
            "ref": "SAB-FIN-2026-18472",
            "what": "Financiación Banco Sabadell",
            "when": "05/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "evaluate",
              "label": "TIN a corregir"
            }
          },
          {
            "ref": "DS-2026-7741",
            "what": "Contrato de compraventa",
            "when": "07/10/2026 09:00",
            "system": "DocuSign",
            "status": {
              "status": "pending",
              "label": "Pendiente de firma"
            }
          },
          {
            "ref": "ENT-2026-1007-03",
            "what": "Entrega al cliente",
            "when": "07/10/2026 10:30",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planificada"
            }
          }
        ],
        "note": {
          "title": "Entrega de hoy",
          "body": "La entrega de las 10:30 depende de corregir el TIN y firmar el contrato. Matriculación en trámite.",
          "icon": "car"
        }
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "PED-2026-001847",
            "what": "Pedido de venta",
            "system": "SAP ERP",
            "date": "04/10/2026",
            "status": {
              "status": "ok",
              "label": "Confirmado"
            }
          },
          {
            "doc": "SAB-FIN-2026-18472",
            "what": "Oferta de financiación",
            "system": "Salesforce CRM",
            "date": "05/10/2026",
            "status": {
              "status": "evaluate",
              "label": "A corregir"
            }
          },
          {
            "doc": "DS-2026-7741",
            "what": "Contrato de compraventa",
            "system": "DocuSign",
            "date": "07/10/2026",
            "status": {
              "status": "pending",
              "label": "Pendiente"
            }
          },
          {
            "doc": "INV-2026-001847",
            "what": "Factura de venta",
            "system": "SAP ERP",
            "date": "07/10/2026",
            "status": {
              "status": "draft",
              "label": "Borrador"
            }
          }
        ]
      },
      "quality": [
        "Inspección de recepción: sin defectos.",
        "Revisión pre-entrega (PDI) completada el 06/10/2026.",
        "Sin campañas de retirada abiertas para este VIN."
      ],
      "notes": [
        {
          "title": "TIN pendiente de corregir",
          "body": "Propuesta al 3,99 % frente a 4,25 % en el contrato del banco. No firmar hasta que Finanzas confirme (CLM-2026-001).",
          "tone": "crit",
          "icon": "alert-triangle"
        }
      ]
    },
    "VIN-2026-MAD-BMW-04": {
      "kind": "Vehículo",
      "title": "Vehículo VIN-2026-MAD-BMW-04 · BMW X3 20d xDrive",
      "summary": [
        [
          "Vehículo",
          "BMW X3 20d xDrive"
        ],
        [
          "Marca y canal",
          "BMW · Venta"
        ],
        [
          "SKU",
          "BMW-X3-20D-2026-004"
        ],
        [
          "Ubicación",
          "Campa A, plaza 14 (Hub Marqués de Soria)"
        ],
        [
          "Recepción",
          "20/09/2026"
        ],
        [
          "Precio de venta",
          "67.500 €"
        ],
        [
          "Cliente",
          "Sin asignar · reserva en curso"
        ],
        [
          "Estado",
          "Stock crítico: 2 unidades de X3 disponibles"
        ]
      ],
      "back": [
        {
          "when": "2026-09-20 09:15",
          "stage": "Recepción del fabricante",
          "detail": "Llegada al hub desde Dingolfing (Alemania).",
          "ref": "REC-BMW-2026-004",
          "tone": "brand"
        },
        {
          "when": "2026-09-20 14:30",
          "stage": "Inspección técnica",
          "detail": "Motor, transmisión, seguridad y pintura verificados. Sin defectos.",
          "ref": "QA-2026-0920-04",
          "tone": "ok"
        },
        {
          "when": "2026-09-21 08:00",
          "stage": "Alta en inventario",
          "detail": "Alta en SAP ERP y Odoo Inventario. Disponible para venta.",
          "ref": "ODOO-INV-5530",
          "tone": "brand"
        },
        {
          "when": "2026-10-06 17:10",
          "stage": "Alerta de stock",
          "detail": "Quedan 2 BMW X3 frente a una demanda de 5 pedidos abiertos. Reposición de fábrica en 19 días.",
          "ref": "OPE-STOCK-002",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Pedidos y reservas",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "RSV-2026-0188",
            "what": "Reserva de cliente (señal 1.000 €)",
            "when": "06/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "ref": "OPE-STOCK-002",
            "what": "Alerta de reposición BMW",
            "when": "06/10/2026",
            "system": "SAP ERP",
            "status": {
              "status": "critical",
              "label": "Crítico"
            }
          }
        ],
        "note": {
          "title": "Reposición",
          "body": "Gestor de marca BMW debe adelantar el pedido de fábrica; hasta entonces, limitar promociones del X3.",
          "icon": "truck"
        }
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "RSV-2026-0188",
            "what": "Reserva de cliente",
            "system": "Salesforce CRM",
            "date": "06/10/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "doc": "QA-2026-0920-04",
            "what": "Informe de inspección",
            "system": "iCare Taller",
            "date": "20/09/2026",
            "status": {
              "status": "ok",
              "label": "Conforme"
            }
          }
        ]
      },
      "quality": [
        "Inspección técnica de recepción conforme.",
        "Sin campañas de retirada abiertas para este VIN."
      ],
      "notes": [
        {
          "title": "Stock crítico BMW X3",
          "body": "Quedan 2 unidades con 5 pedidos abiertos. Pedido de reposición pendiente de adelantar.",
          "tone": "crit",
          "icon": "package"
        }
      ]
    },
    "VIN-2026-MAD-AUDI-07": {
      "kind": "Vehículo",
      "title": "Vehículo VIN-2026-MAD-AUDI-07 · Audi A3 Sportback 30 TFSI",
      "summary": [
        [
          "Vehículo",
          "Audi A3 Sportback 30 TFSI"
        ],
        [
          "Marca y canal",
          "Audi · Suscripción 6 meses"
        ],
        [
          "SKU",
          "AUDI-A3-30TFSI-2026-007"
        ],
        [
          "Ubicación",
          "Con el cliente (Madrid)"
        ],
        [
          "Inicio de suscripción",
          "10/07/2026"
        ],
        [
          "Cuota mensual",
          "689 €"
        ],
        [
          "Cliente",
          "Lucía Ferrer · CLI-2026-0287"
        ],
        [
          "Estado",
          "Suscripción activa · fin 10/01/2027"
        ]
      ],
      "back": [
        {
          "when": "2026-07-08 10:00",
          "stage": "Alta de contrato",
          "detail": "Contrato de suscripción firmado en DocuSign.",
          "ref": "SUS-2026-0287",
          "tone": "brand"
        },
        {
          "when": "2026-07-10 12:00",
          "stage": "Entrega",
          "detail": "Entrega del vehículo con 14 km. Primer cobro por Stripe.",
          "ref": "ENT-2026-0710-07",
          "tone": "ok"
        },
        {
          "when": "2026-10-01 08:00",
          "stage": "Cobro mensual",
          "detail": "Cobro de octubre en Stripe: pago correcto.",
          "ref": "STR-2026-10-0287",
          "tone": "ok"
        },
        {
          "when": "2026-10-06 09:40",
          "stage": "Aviso de revisión",
          "detail": "Twilio SMS enviado: revisión de 15.000 km en iCare Taller.",
          "ref": "SMS-2026-1006-07",
          "tone": "brand"
        }
      ],
      "forward": {
        "title": "Suscripción y taller",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "SUS-2026-0287",
            "what": "Suscripción 6 meses",
            "when": "10/07/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "active",
              "label": "Activa"
            }
          },
          {
            "ref": "OT-2026-0431",
            "what": "Revisión 15.000 km",
            "when": "09/10/2026",
            "system": "iCare Taller",
            "status": {
              "status": "planned",
              "label": "Planificada"
            }
          }
        ],
        "note": {
          "title": "Renovación",
          "body": "Oferta de renovación o sustitución a enviar 30 días antes del fin (10/12/2026).",
          "icon": "refresh-cw"
        }
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "SUS-2026-0287",
            "what": "Contrato de suscripción",
            "system": "DocuSign",
            "date": "08/07/2026",
            "status": {
              "status": "ok",
              "label": "Firmado"
            }
          },
          {
            "doc": "STR-2026-10-0287",
            "what": "Cobro octubre",
            "system": "Stripe",
            "date": "01/10/2026",
            "status": {
              "status": "ok",
              "label": "Cobrado"
            }
          }
        ]
      },
      "quality": [
        "Última revisión: entrega (14 km).",
        "Sin incidencias de pago en la suscripción."
      ],
      "notes": []
    },
    "VIN-2026-MAD-VW-11": {
      "kind": "Vehículo",
      "title": "Vehículo VIN-2026-MAD-VW-11 · VW Golf 1.5 eTSI (flota de alquiler)",
      "summary": [
        [
          "Vehículo",
          "VW Golf 1.5 eTSI 130 CV"
        ],
        [
          "Marca y canal",
          "Volkswagen · Alquiler"
        ],
        [
          "SKU",
          "VW-GOLF-ETSI-2025-011"
        ],
        [
          "Ubicación",
          "Flota de alquiler · Madrid Atocha"
        ],
        [
          "Matriculado",
          "03/2025"
        ],
        [
          "Kilometraje",
          "28.410 km"
        ],
        [
          "Campaña abierta",
          "REC-VW-2026-001"
        ],
        [
          "Estado",
          "Retirada ABS pendiente: no alquilar"
        ]
      ],
      "back": [
        {
          "when": "2026-03-12 09:00",
          "stage": "Alta en flota",
          "detail": "Alta en la flota de alquiler (~1.000 unidades).",
          "ref": "FLT-2025-0011",
          "tone": "brand"
        },
        {
          "when": "2026-09-28 11:00",
          "stage": "Aviso del fabricante",
          "detail": "Volkswagen comunica la revisión del módulo ABS en 47 unidades Golf de la flota.",
          "ref": "REC-VW-2026-001",
          "tone": "crit"
        },
        {
          "when": "2026-10-06 18:00",
          "stage": "Bloqueo preventivo",
          "detail": "Marcado como no alquilable en Odoo Inventario hasta pasar por taller.",
          "ref": "ODOO-INV-3318",
          "tone": "warn"
        }
      ],
      "forward": {
        "title": "Campaña y reservas afectadas",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "REC-VW-2026-001",
            "what": "Retirada ABS Golf (47 uds.)",
            "when": "28/09/2026",
            "system": "iCare Taller",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "ref": "ALQ-2026-5521",
            "what": "Reserva 09/10-12/10 (reasignar)",
            "when": "09/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "evaluate",
              "label": "A reasignar"
            }
          }
        ],
        "note": {
          "title": "Plan",
          "body": "Reasignar la reserva a otro Golf sin campaña y programar taller (cita con técnico VW).",
          "icon": "wrench"
        }
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "REC-VW-2026-001",
            "what": "Comunicado del fabricante",
            "system": "iCare Taller",
            "date": "28/09/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "doc": "ALQ-2026-5521",
            "what": "Reserva de alquiler",
            "system": "Salesforce CRM",
            "date": "09/10/2026",
            "status": {
              "status": "evaluate",
              "label": "A reasignar"
            }
          }
        ]
      },
      "quality": [
        "Riesgo de reducción de presión de frenado por el módulo ABS.",
        "Último mantenimiento: 08/2026, sin incidencias."
      ],
      "notes": [
        {
          "title": "Retirada ABS VW Golf",
          "body": "Vehículo en la lista de 47 unidades de la flota. No alquilar hasta completar la reparación.",
          "tone": "crit",
          "icon": "shield-alert"
        }
      ]
    },
    "VIN-2026-MAD-VW-12": {
      "kind": "Vehículo",
      "title": "Vehículo VIN-2026-MAD-VW-12 · VW Golf 1.5 eTSI en taller",
      "summary": [
        [
          "Vehículo",
          "VW Golf 1.5 eTSI 130 CV"
        ],
        [
          "Marca y canal",
          "Volkswagen · Alquiler / Taller"
        ],
        [
          "SKU",
          "VW-GOLF-ETSI-2025-012"
        ],
        [
          "Ubicación",
          "Taller VW · puesto 3"
        ],
        [
          "Orden de taller",
          "OT-2026-0412"
        ],
        [
          "Campaña",
          "REC-VW-2026-001"
        ],
        [
          "Técnico",
          "Sin asignar (falta un técnico VW)"
        ],
        [
          "Estado",
          "Entrada en taller, esperando técnico"
        ]
      ],
      "back": [
        {
          "when": "2026-10-05 08:30",
          "stage": "Entrada en taller",
          "detail": "Entrada por la campaña ABS en iCare Taller.",
          "ref": "OT-2026-0412",
          "tone": "brand"
        },
        {
          "when": "2026-10-06 15:00",
          "stage": "Sin técnico",
          "detail": "El taller VW trabaja con un técnico menos por baja; cita retrasada a las 12:00 del 07/10.",
          "ref": "OPE-WORKSHOP-003",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Trabajos del taller",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "OT-2026-0412",
            "what": "Sustitución de módulo ABS",
            "when": "07/10/2026 12:00",
            "system": "iCare Taller",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ],
        "note": {
          "title": "Capacidad",
          "body": "Pedir apoyo del taller Audi o subcontratar una jornada de técnico VW.",
          "icon": "users"
        }
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "OT-2026-0412",
            "what": "Orden de taller",
            "system": "iCare Taller",
            "date": "05/10/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ]
      },
      "quality": [
        "Pieza ABS recibida el 06/10/2026.",
        "Prueba de frenado obligatoria al cerrar la orden."
      ],
      "notes": [
        {
          "title": "Falta un técnico VW",
          "body": "Capacidad del taller VW al 80 % esta semana.",
          "tone": "warn",
          "icon": "user-x"
        }
      ]
    },
    "VIN-2026-MAD-SKODA-05": {
      "kind": "Vehículo",
      "title": "Vehículo VIN-2026-MAD-SKODA-05 · Škoda Octavia 1.5 TSI",
      "summary": [
        [
          "Vehículo",
          "Škoda Octavia 1.5 TSI"
        ],
        [
          "Marca y canal",
          "Škoda · Venta"
        ],
        [
          "SKU",
          "SKODA-OCT-TSI-2026-005"
        ],
        [
          "Ubicación",
          "Campa B, plaza 07"
        ],
        [
          "Recepción",
          "29/09/2026"
        ],
        [
          "Precio de venta",
          "31.900 €"
        ],
        [
          "Campaña",
          "REC-SKODA-2026-001"
        ],
        [
          "Estado",
          "En stock · revisión de campaña antes de la entrega"
        ]
      ],
      "back": [
        {
          "when": "2026-09-29 10:00",
          "stage": "Recepción del fabricante",
          "detail": "Llegada desde Mladá Boleslav.",
          "ref": "REC-SKODA-2026-005",
          "tone": "brand"
        },
        {
          "when": "2026-10-02 09:00",
          "stage": "Aviso del fabricante",
          "detail": "Campaña de revisión de software en el cuadro de instrumentos.",
          "ref": "REC-SKODA-2026-001",
          "tone": "warn"
        }
      ],
      "forward": {
        "title": "Campaña",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "REC-SKODA-2026-001",
            "what": "Actualización de software",
            "when": "02/10/2026",
            "system": "iCare Taller",
            "status": {
              "status": "planned",
              "label": "Planificada"
            }
          }
        ]
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "REC-SKODA-2026-001",
            "what": "Comunicado del fabricante",
            "system": "iCare Taller",
            "date": "02/10/2026",
            "status": {
              "status": "planned",
              "label": "Planificada"
            }
          }
        ]
      },
      "quality": [
        "Inspección de recepción conforme."
      ],
      "notes": []
    },
    "PED-2026-001847": {
      "kind": "Pedido de venta",
      "title": "Pedido PED-2026-001847 · Seat Ibiza para José María López",
      "summary": [
        [
          "Cliente",
          "José María López"
        ],
        [
          "Vehículo",
          "VIN-2026-MAD-SEAT-03 · Seat Ibiza 1.0 TSI FR"
        ],
        [
          "Importe",
          "63.500 €"
        ],
        [
          "Entrada",
          "20.000 €"
        ],
        [
          "Financiación",
          "Banco Sabadell · 60 meses · 3,99 %"
        ],
        [
          "Estado",
          "Pendiente de firma"
        ]
      ],
      "back": [
        {
          "when": "2026-10-04 11:00",
          "stage": "Pedido creado",
          "detail": "Tras la prueba de conducción positiva.",
          "ref": "PED-2026-001847",
          "tone": "ok"
        },
        {
          "when": "2026-10-05 10:15",
          "stage": "Financiación aprobada",
          "detail": "Banco Sabadell, 801 €/mes.",
          "ref": "SAB-FIN-2026-18472",
          "tone": "ok"
        }
      ],
      "forward": {
        "title": "Siguientes pasos",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "DS-2026-7741",
            "what": "Firma del contrato",
            "when": "07/10/2026 09:00",
            "system": "DocuSign",
            "status": {
              "status": "pending",
              "label": "Pendiente"
            }
          },
          {
            "ref": "ENT-2026-1007-03",
            "what": "Entrega",
            "when": "07/10/2026 10:30",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planificada"
            }
          }
        ],
        "note": null
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "INV-2026-001847",
            "what": "Factura de venta",
            "system": "SAP ERP",
            "date": "07/10/2026",
            "status": {
              "status": "draft",
              "label": "Borrador"
            }
          }
        ]
      },
      "quality": [
        "Margen del pedido dentro de la política comercial."
      ],
      "notes": []
    },
    "CLI-2026-0331": {
      "kind": "Cliente",
      "title": "Cliente CLI-2026-0331 · José María López",
      "summary": [
        [
          "Nombre",
          "José María López"
        ],
        [
          "Ciudad",
          "Madrid"
        ],
        [
          "Teléfono",
          "+34 91 555 0147"
        ],
        [
          "Comercial",
          "Carlos Martínez"
        ],
        [
          "Pedido activo",
          "PED-2026-001847"
        ],
        [
          "Banco",
          "Banco Sabadell"
        ]
      ],
      "back": [
        {
          "when": "2026-10-01 16:45",
          "stage": "Primera visita",
          "detail": "Visita presencial en el concesionario.",
          "ref": "CLI-2026-0331",
          "tone": "brand"
        },
        {
          "when": "2026-10-04 11:00",
          "stage": "Prueba de conducción",
          "detail": "Seat Ibiza VIN-2026-MAD-SEAT-03",
          "ref": "VIN-2026-MAD-SEAT-03",
          "tone": "ok"
        }
      ],
      "forward": {
        "title": "Operaciones del cliente",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "PED-2026-001847",
            "what": "Pedido de venta",
            "when": "04/10/2026",
            "system": "SAP ERP",
            "status": {
              "status": "ok",
              "label": "Confirmado"
            }
          }
        ],
        "note": null
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "SAB-FIN-2026-18472",
            "what": "Financiación",
            "system": "Salesforce CRM",
            "date": "05/10/2026",
            "status": {
              "status": "evaluate",
              "label": "A corregir"
            }
          }
        ]
      },
      "quality": [
        "Datos de contacto verificados en Salesforce CRM."
      ],
      "notes": []
    },
    "OT-2026-0412": {
      "kind": "Vehículo",
      "title": "Vehículo VIN-2026-MAD-VW-12 · VW Golf 1.5 eTSI en taller",
      "summary": [
        [
          "Vehículo",
          "VW Golf 1.5 eTSI 130 CV"
        ],
        [
          "Marca y canal",
          "Volkswagen · Alquiler / Taller"
        ],
        [
          "SKU",
          "VW-GOLF-ETSI-2025-012"
        ],
        [
          "Ubicación",
          "Taller VW · puesto 3"
        ],
        [
          "Orden de taller",
          "OT-2026-0412"
        ],
        [
          "Campaña",
          "REC-VW-2026-001"
        ],
        [
          "Técnico",
          "Sin asignar (falta un técnico VW)"
        ],
        [
          "Estado",
          "Entrada en taller, esperando técnico"
        ]
      ],
      "back": [
        {
          "when": "2026-10-05 08:30",
          "stage": "Entrada en taller",
          "detail": "Entrada por la campaña ABS en iCare Taller.",
          "ref": "OT-2026-0412",
          "tone": "brand"
        },
        {
          "when": "2026-10-06 15:00",
          "stage": "Sin técnico",
          "detail": "El taller VW trabaja con un técnico menos por baja; cita retrasada a las 12:00 del 07/10.",
          "ref": "OPE-WORKSHOP-003",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Trabajos del taller",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "OT-2026-0412",
            "what": "Sustitución de módulo ABS",
            "when": "07/10/2026 12:00",
            "system": "iCare Taller",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ],
        "note": {
          "title": "Capacidad",
          "body": "Pedir apoyo del taller Audi o subcontratar una jornada de técnico VW.",
          "icon": "users"
        }
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "OT-2026-0412",
            "what": "Orden de taller",
            "system": "iCare Taller",
            "date": "05/10/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ]
      },
      "quality": [
        "Pieza ABS recibida el 06/10/2026.",
        "Prueba de frenado obligatoria al cerrar la orden."
      ],
      "notes": [
        {
          "title": "Falta un técnico VW",
          "body": "Capacidad del taller VW al 80 % esta semana.",
          "tone": "warn",
          "icon": "user-x"
        }
      ]
    },
    "REC-VW-2026-001": {
      "kind": "Campaña de retirada",
      "title": "REC-VW-2026-001 · VW Golf · módulo ABS",
      "summary": [
        [
          "Campaña",
          "VW Golf · módulo ABS"
        ],
        [
          "Marca",
          "VW"
        ],
        [
          "Fecha de aviso",
          "28/09/2026"
        ],
        [
          "Riesgo",
          "Riesgo de reducción de presión de frenado"
        ],
        [
          "Unidades afectadas",
          "47"
        ],
        [
          "Ubicación",
          "Flota de alquiler, stock y clientes"
        ]
      ],
      "back": [
        {
          "when": "2026-09-28 09:00",
          "stage": "Aviso del fabricante",
          "detail": "Riesgo de reducción de presión de frenado",
          "ref": "REC-VW-2026-001",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Vehículos de la campaña",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "VIN-2026-MAD-VW-11",
            "what": "VW Golf · módulo ABS",
            "when": "28/09/2026",
            "system": "iCare Taller",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "ref": "VIN-2026-MAD-VW-12",
            "what": "VW Golf · módulo ABS",
            "when": "28/09/2026",
            "system": "iCare Taller",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ],
        "note": {
          "title": "Alcance",
          "body": "47 unidades afectadas en Autopista Multimotor.",
          "icon": "shield-alert"
        }
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "VIN-2026-MAD-VW-11",
            "what": "VW Golf · módulo ABS",
            "system": "Odoo Inventario",
            "date": "28/09/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "doc": "VIN-2026-MAD-VW-12",
            "what": "VW Golf · módulo ABS",
            "system": "Odoo Inventario",
            "date": "28/09/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ]
      },
      "quality": [
        "Riesgo de reducción de presión de frenado"
      ],
      "notes": []
    },
    "REC-BMW-2026-002": {
      "kind": "Campaña de retirada",
      "title": "REC-BMW-2026-002 · BMW X5 · batería de 12 V",
      "summary": [
        [
          "Campaña",
          "BMW X5 · batería de 12 V"
        ],
        [
          "Marca",
          "BMW"
        ],
        [
          "Fecha de aviso",
          "30/09/2026"
        ],
        [
          "Riesgo",
          "Fallo de arranque por batería"
        ],
        [
          "Unidades afectadas",
          "18"
        ],
        [
          "Ubicación",
          "Flota de alquiler, stock y clientes"
        ]
      ],
      "back": [
        {
          "when": "2026-09-30 09:00",
          "stage": "Aviso del fabricante",
          "detail": "Fallo de arranque por batería",
          "ref": "REC-BMW-2026-002",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Vehículos de la campaña",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [],
        "note": {
          "title": "Alcance",
          "body": "18 unidades afectadas en Autopista Multimotor.",
          "icon": "shield-alert"
        }
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": []
      },
      "quality": [
        "Fallo de arranque por batería"
      ],
      "notes": []
    },
    "REC-AUDI-2026-001": {
      "kind": "Campaña de retirada",
      "title": "REC-AUDI-2026-001 · Audi · cierres de puertas",
      "summary": [
        [
          "Campaña",
          "Audi · cierres de puertas"
        ],
        [
          "Marca",
          "Audi"
        ],
        [
          "Fecha de aviso",
          "15/09/2026"
        ],
        [
          "Riesgo",
          "Cierre defectuoso (completada)"
        ],
        [
          "Unidades afectadas",
          "52"
        ],
        [
          "Ubicación",
          "Flota de alquiler, stock y clientes"
        ]
      ],
      "back": [
        {
          "when": "2026-09-15 09:00",
          "stage": "Aviso del fabricante",
          "detail": "Cierre defectuoso (completada)",
          "ref": "REC-AUDI-2026-001",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Vehículos de la campaña",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [],
        "note": {
          "title": "Alcance",
          "body": "52 unidades afectadas en Autopista Multimotor.",
          "icon": "shield-alert"
        }
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": []
      },
      "quality": [
        "Cierre defectuoso (completada)"
      ],
      "notes": []
    },
    "REC-SKODA-2026-001": {
      "kind": "Campaña de retirada",
      "title": "REC-SKODA-2026-001 · Škoda · software del cuadro",
      "summary": [
        [
          "Campaña",
          "Škoda · software del cuadro"
        ],
        [
          "Marca",
          "Škoda"
        ],
        [
          "Fecha de aviso",
          "02/10/2026"
        ],
        [
          "Riesgo",
          "Actualización de software"
        ],
        [
          "Unidades afectadas",
          "12"
        ],
        [
          "Ubicación",
          "Flota de alquiler, stock y clientes"
        ]
      ],
      "back": [
        {
          "when": "2026-10-02 09:00",
          "stage": "Aviso del fabricante",
          "detail": "Actualización de software",
          "ref": "REC-SKODA-2026-001",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Vehículos de la campaña",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "VIN-2026-MAD-SKODA-05",
            "what": "Škoda · software del cuadro",
            "when": "02/10/2026",
            "system": "iCare Taller",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ],
        "note": {
          "title": "Alcance",
          "body": "12 unidades afectadas en Autopista Multimotor.",
          "icon": "shield-alert"
        }
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "VIN-2026-MAD-SKODA-05",
            "what": "Škoda · software del cuadro",
            "system": "Odoo Inventario",
            "date": "02/10/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ]
      },
      "quality": [
        "Actualización de software"
      ],
      "notes": []
    },
    "CLM-2026-001": {
      "kind": "Reclamación",
      "title": "Reclamación CLM-2026-001",
      "summary": [
        [
          "Asunto",
          "TIN de la financiación: 3,99 % ofrecido frente a 4,25 % en contrato"
        ],
        [
          "Cliente",
          "José María López"
        ],
        [
          "Vehículo",
          "VIN-2026-MAD-SEAT-03"
        ],
        [
          "Canal",
          "Salesforce CRM"
        ],
        [
          "Estado",
          "Abierta"
        ]
      ],
      "back": [
        {
          "when": "2026-10-06 12:20",
          "stage": "Reclamación recibida",
          "detail": "TIN de la financiación: 3,99 % ofrecido frente a 4,25 % en contrato",
          "ref": "CLM-2026-001",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Seguimiento",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "VIN-2026-MAD-SEAT-03",
            "what": "Vehículo afectado",
            "when": "07/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ],
        "note": null
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": []
      },
      "quality": [
        "Plazo de respuesta al cliente: 5 días hábiles."
      ],
      "notes": []
    },
    "CLM-2026-002": {
      "kind": "Reclamación",
      "title": "Reclamación CLM-2026-002",
      "summary": [
        [
          "Asunto",
          "Retraso en la entrega de un Audi A3"
        ],
        [
          "Cliente",
          "Cliente de venta Audi"
        ],
        [
          "Vehículo",
          "VIN-2026-MAD-AUDI-07"
        ],
        [
          "Canal",
          "Salesforce CRM"
        ],
        [
          "Estado",
          "Abierta"
        ]
      ],
      "back": [
        {
          "when": "2026-10-06 12:20",
          "stage": "Reclamación recibida",
          "detail": "Retraso en la entrega de un Audi A3",
          "ref": "CLM-2026-002",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Seguimiento",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "VIN-2026-MAD-AUDI-07",
            "what": "Vehículo afectado",
            "when": "07/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ],
        "note": null
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": []
      },
      "quality": [
        "Plazo de respuesta al cliente: 5 días hábiles."
      ],
      "notes": []
    },
    "CLM-2026-003": {
      "kind": "Reclamación",
      "title": "Reclamación CLM-2026-003",
      "summary": [
        [
          "Asunto",
          "Cobro duplicado de suscripción en Stripe"
        ],
        [
          "Cliente",
          "Lucía Ferrer"
        ],
        [
          "Vehículo",
          "VIN-2026-MAD-AUDI-07"
        ],
        [
          "Canal",
          "Salesforce CRM"
        ],
        [
          "Estado",
          "Abierta"
        ]
      ],
      "back": [
        {
          "when": "2026-10-06 12:20",
          "stage": "Reclamación recibida",
          "detail": "Cobro duplicado de suscripción en Stripe",
          "ref": "CLM-2026-003",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Seguimiento",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "VIN-2026-MAD-AUDI-07",
            "what": "Vehículo afectado",
            "when": "07/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "evaluate",
              "label": "A evaluar"
            }
          }
        ],
        "note": null
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": []
      },
      "quality": [
        "Plazo de respuesta al cliente: 5 días hábiles."
      ],
      "notes": []
    },
    "CLM-2026-004": {
      "kind": "Reclamación",
      "title": "Reclamación CLM-2026-004",
      "summary": [
        [
          "Asunto",
          "Ruido en frenos tras revisión"
        ],
        [
          "Cliente",
          "Cliente de taller"
        ],
        [
          "Vehículo",
          "VIN-2026-MAD-VW-12"
        ],
        [
          "Canal",
          "Salesforce CRM"
        ],
        [
          "Estado",
          "Abierta"
        ]
      ],
      "back": [
        {
          "when": "2026-10-06 12:20",
          "stage": "Reclamación recibida",
          "detail": "Ruido en frenos tras revisión",
          "ref": "CLM-2026-004",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Seguimiento",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "VIN-2026-MAD-VW-12",
            "what": "Vehículo afectado",
            "when": "07/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ],
        "note": null
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": []
      },
      "quality": [
        "Plazo de respuesta al cliente: 5 días hábiles."
      ],
      "notes": []
    },
    "CLM-2026-005": {
      "kind": "Reclamación",
      "title": "Reclamación CLM-2026-005",
      "summary": [
        [
          "Asunto",
          "Fianza de alquiler pendiente de devolución"
        ],
        [
          "Cliente",
          "Cliente de alquiler"
        ],
        [
          "Vehículo",
          "VIN-2026-MAD-VW-11"
        ],
        [
          "Canal",
          "Salesforce CRM"
        ],
        [
          "Estado",
          "Abierta"
        ]
      ],
      "back": [
        {
          "when": "2026-10-06 12:20",
          "stage": "Reclamación recibida",
          "detail": "Fianza de alquiler pendiente de devolución",
          "ref": "CLM-2026-005",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Seguimiento",
        "cols": [
          {
            "key": "ref",
            "label": "Referencia",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Fecha"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "VIN-2026-MAD-VW-11",
            "what": "Vehículo afectado",
            "when": "07/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "evaluate",
              "label": "A evaluar"
            }
          }
        ],
        "note": null
      },
      "units": {
        "label": "Documentos",
        "cols": [
          {
            "key": "doc",
            "label": "Documento",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "Sistema"
          },
          {
            "key": "date",
            "label": "Fecha"
          },
          {
            "key": "status",
            "label": "Estado",
            "chip": true
          }
        ],
        "rows": []
      },
      "quality": [
        "Plazo de respuesta al cliente: 5 días hábiles."
      ],
      "notes": []
    }
  }
});
