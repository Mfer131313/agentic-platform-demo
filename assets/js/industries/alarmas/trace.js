/* Guardián Ibérica Instalaciones · registros de traza (instalaciones, contratos, lotes de equipos, campañas de retirada, alarmas y reclamaciones).
 * Los lee App.traceModal desde DATA.trace[código] (claves en mayúsculas).
 * Escenario de demostración con datos sintéticos (MFM). */
agenticPack('alarmas', {
  trace: {
    "INS-2026-VLC-04417": {
      "kind": "Instalación",
      "title": "Instalación INS-2026-VLC-04417 · vivienda de Marta Soler Pons (Burjassot)",
      "summary": [
        [
          "Instalación",
          "Vivienda unifamiliar · Burjassot (Valencia)"
        ],
        [
          "Marca y contrato",
          "Sector Alarm · SA-2026-77412"
        ],
        [
          "Equipos",
          "Panel con 4G + 6 sensores (PIR de salón, 2 contactos, sirena)"
        ],
        [
          "Instalada",
          "14/03/2025"
        ],
        [
          "Última revisión",
          "22/03/2026"
        ],
        [
          "Cliente",
          "Marta Soler Pons · CLI-2026-1182"
        ],
        [
          "Delegación",
          "Paterna (Valencia)"
        ],
        [
          "Estado",
          "Activa · reclamación abierta CLM-2026-0619"
        ]
      ],
      "back": [
        {
          "when": "2025-03-14 10:30",
          "stage": "Instalación y puesta en marcha",
          "detail": "Instalación según PR-INS-001 (grado 2) por un técnico de Paterna. Pruebas de cada sensor y de la comunicación con el CRA.",
          "ref": "OT-2025-08812",
          "tone": "ok"
        },
        {
          "when": "2026-03-22 09:15",
          "stage": "Revisión anual",
          "detail": "Mantenimiento preventivo PR-MAN-004. Batería del PIR de salón al 61 %; sin aviso de sustitución.",
          "ref": "OT-2026-17703",
          "tone": "brand"
        },
        {
          "when": "2026-10-08 18:40",
          "stage": "Batería baja sin aviso",
          "detail": "La telemetría del PIR de salón baja del 10 % pero el portal de la marca no genera el aviso de batería.",
          "ref": "SA-TEL-77412-0610",
          "tone": "warn"
        },
        {
          "when": "2026-10-12 03:12",
          "stage": "Falsa alarma",
          "detail": "Salta el PIR de salón con la vivienda vacía; el vigilante se desplaza y no hay incidencia. Cargo de 39,00 EUR.",
          "ref": "SA-ALM-2026-55120",
          "tone": "crit"
        },
        {
          "when": "2026-10-14 04:05",
          "stage": "Segunda falsa alarma",
          "detail": "Misma causa. Segundo cargo de desplazamiento de 39,00 EUR.",
          "ref": "SA-ALM-2026-55361",
          "tone": "crit"
        },
        {
          "when": "2026-10-19 07:42",
          "stage": "Reclamación",
          "detail": "La clienta reclama los dos cargos y amenaza con la baja con penalización de 180 EUR.",
          "ref": "CLM-2026-0619",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Seguimiento de la instalación",
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
            "ref": "CLM-2026-0619",
            "what": "Reclamación de cargos de vigilante",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "ref": "OT-2026-31140",
            "what": "Sustitución de batería del PIR de salón",
            "when": "20/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planificada"
            }
          },
          {
            "ref": "SA-ABN-2026-0619",
            "what": "Abono de los dos cargos (propuesta)",
            "when": "19/10/2026",
            "system": "Sector Alarm Partner Hub",
            "status": {
              "status": "evaluate",
              "label": "A decidir"
            }
          }
        ],
        "note": {
          "title": "Plazo de respuesta",
          "body": "Acuse en 24 h (hasta el 20/10) y resolución en 10 días hábiles. El abono lo decide el Responsable de operaciones.",
          "tone": "brand",
          "icon": "clock"
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
            "doc": "SA-2026-77412",
            "what": "Contrato de alarma",
            "system": "Sector Alarm Partner Hub",
            "date": "14/03/2025",
            "status": {
              "status": "active",
              "label": "Activo"
            }
          },
          {
            "doc": "OT-2026-17703",
            "what": "Informe de revisión anual",
            "system": "SAP Business One",
            "date": "22/03/2026",
            "status": {
              "status": "ok",
              "label": "Conforme"
            }
          },
          {
            "doc": "SA-ALM-2026-55120",
            "what": "Parte de falsa alarma 12/10",
            "system": "Sector Alarm Partner Hub",
            "date": "12/10/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "doc": "SA-ALM-2026-55361",
            "what": "Parte de falsa alarma 14/10",
            "system": "Sector Alarm Partner Hub",
            "date": "14/10/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ]
      },
      "quality": [
        "Instalación conforme a PR-INS-001 (grado 2) el 14/03/2025.",
        "Sensor PIR de salón: sin aviso de batería baja en el portal de la marca.",
        "Sin equipos del lote PIR-2607-A en esta vivienda."
      ],
      "notes": [
        {
          "title": "Causa raíz de las falsas alarmas",
          "body": "El sensor PIR de salón tenía la batería baja y no avisó. Responsabilidad compartida con la marca: revisar el aviso de telemetría antes de responder (CLM-2026-0619).",
          "tone": "crit",
          "icon": "alert-triangle"
        }
      ]
    },
    "INS-2026-VLC-03981": {
      "kind": "Instalación",
      "title": "Instalación INS-2026-VLC-03981 · vivienda en Valencia Norte (Verisure)",
      "summary": [
        [
          "Instalación",
          "Piso · Valencia Norte (Orriols)"
        ],
        [
          "Marca y contrato",
          "Verisure · VER-2025-40871"
        ],
        [
          "Equipos",
          "Panel 4G sin segunda SIM ni IP + 4 sensores"
        ],
        [
          "Instalada",
          "02/09/2025"
        ],
        [
          "Cliente",
          "Andrés Ferrer Ibáñez · CLI-2025-3317"
        ],
        [
          "Estado",
          "Sin comunicación desde las 05:10 · sin vía de respaldo"
        ]
      ],
      "back": [
        {
          "when": "2025-09-02 11:00",
          "stage": "Instalación y puesta en marcha",
          "detail": "Instalación de panel 4G según PR-INS-001. Sin router del cliente disponible para respaldo IP.",
          "ref": "OT-2025-31204",
          "tone": "ok"
        },
        {
          "when": "2026-10-19 05:10",
          "stage": "Pérdida de comunicación",
          "detail": "El panel deja de comunicar por 4G tras el mantenimiento del operador móvil.",
          "ref": "ALM-COM-0611",
          "tone": "crit"
        },
        {
          "when": "2026-10-19 06:00",
          "stage": "Clasificado sin respaldo",
          "detail": "Incluido en los 38 paneles sin IP ni segunda SIM: requiere visita prioritaria.",
          "ref": "OT-2026-31102",
          "tone": "warn"
        }
      ],
      "forward": {
        "title": "Visita prioritaria",
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
            "ref": "OT-2026-31102",
            "what": "Instalar segunda SIM y verificar supervisión",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planificada"
            }
          },
          {
            "ref": "SMS-2026-1019-3981",
            "what": "Aviso al cliente por Twilio SMS",
            "when": "19/10/2026",
            "system": "Twilio SMS",
            "status": {
              "status": "pending",
              "label": "Pendiente"
            }
          }
        ],
        "note": {
          "title": "Sin supervisión remota",
          "body": "Hasta la visita, la vivienda no está supervisada por el CRA. Priorizar en la ruta de la mañana.",
          "tone": "warn",
          "icon": "alert-triangle"
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
            "doc": "VER-2025-40871",
            "what": "Contrato de alarma",
            "system": "Verisure Partner Portal",
            "date": "02/09/2025",
            "status": {
              "status": "active",
              "label": "Activo"
            }
          },
          {
            "doc": "OT-2025-31204",
            "what": "Informe de instalación",
            "system": "SAP Business One",
            "date": "02/09/2025",
            "status": {
              "status": "ok",
              "label": "Conforme"
            }
          }
        ]
      },
      "quality": [
        "Instalación conforme a PR-INS-001.",
        "Sin vía de respaldo IP ni segunda SIM."
      ],
      "notes": []
    },
    "INS-2026-VLC-05102": {
      "kind": "Instalación",
      "title": "Instalación INS-2026-VLC-05102 · pequeño negocio en Valencia Norte (Sector Alarm)",
      "summary": [
        [
          "Instalación",
          "Local comercial · Valencia Norte"
        ],
        [
          "Marca y contrato",
          "Sector Alarm · SA-2026-80233"
        ],
        [
          "Equipos",
          "Panel 4G con respaldo IP + 5 sensores y cámara"
        ],
        [
          "Instalada",
          "19/06/2026"
        ],
        [
          "Cliente",
          "Carnicería Pons Hermanos · CLI-2026-0904"
        ],
        [
          "Estado",
          "Conmutado a la vía de respaldo IP"
        ]
      ],
      "back": [
        {
          "when": "2026-06-19 09:30",
          "stage": "Instalación y puesta en marcha",
          "detail": "Panel con respaldo IP por el router del local. Videoverificación configurada según PR-RGPD-002.",
          "ref": "OT-2026-12907",
          "tone": "ok"
        },
        {
          "when": "2026-10-19 05:12",
          "stage": "Pérdida de 4G",
          "detail": "Cae la comunicación 4G; el panel pasa solo a la vía IP.",
          "ref": "ALM-COM-0611",
          "tone": "warn"
        },
        {
          "when": "2026-10-19 05:55",
          "stage": "Supervisión recuperada",
          "detail": "El CRA recibe de nuevo la señal por IP. Sin incidencia para el cliente.",
          "ref": "OT-2026-31101",
          "tone": "ok"
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
            "ref": "OT-2026-31101",
            "what": "Verificar señal tras el restablecimiento 4G",
            "when": "19/10/2026",
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
            "doc": "SA-2026-80233",
            "what": "Contrato de alarma",
            "system": "Sector Alarm Partner Hub",
            "date": "19/06/2026",
            "status": {
              "status": "active",
              "label": "Activo"
            }
          }
        ]
      },
      "quality": [
        "Videoverificación con aviso de privacidad entregado (PR-RGPD-002).",
        "Respaldo IP operativo."
      ],
      "notes": []
    },
    "INS-2026-VLC-02650": {
      "kind": "Instalación",
      "title": "Instalación INS-2026-VLC-02650 · Chalet en Paterna",
      "summary": [
        [
          "Instalación",
          "Chalet en Paterna"
        ],
        [
          "Marca y contrato",
          "Verisure · VER-2026-21544"
        ],
        [
          "Equipo afectado",
          "Detector PIR-200 · lote PIR-2607-A"
        ],
        [
          "Instalado",
          "28/07/2026"
        ],
        [
          "Cliente",
          "Raúl Navas Gil · CLI-2026-0412"
        ],
        [
          "Estado",
          "Pendiente de aviso por la retirada REC-2026-1019"
        ]
      ],
      "back": [
        {
          "when": "2026-07-28 10:00",
          "stage": "Instalación del detector",
          "detail": "Detector PIR-200 del lote PIR-2607-A instalado durante una instalación nueva.",
          "ref": "OT-2026-VLC-02650",
          "tone": "ok"
        },
        {
          "when": "2026-10-19 06:20",
          "stage": "Localizado por la retirada",
          "detail": "El lote PIR-2607-A cruza con esta vivienda en Salesforce CRM.",
          "ref": "REC-2026-1019",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Retirada del detector",
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
            "ref": "REC-2026-1019",
            "what": "Campaña de retirada del lote",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "ref": "SMS-02650",
            "what": "Aviso al cliente y cita de sustitución",
            "when": "19/10/2026",
            "system": "Twilio SMS",
            "status": {
              "status": "pending",
              "label": "Pendiente"
            }
          }
        ],
        "note": {
          "title": "Plazo de aviso",
          "body": "Avisar al hogar en menos de 4 h desde la apertura de la campaña y ofrecer la sustitución sin coste.",
          "tone": "warn",
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
            "doc": "PIR-2607-A",
            "what": "Lote del detector PIR-200",
            "system": "SAP Business One",
            "date": "19/10/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ]
      },
      "quality": [
        "Detector con batería de litio con riesgo de sobrecalentamiento.",
        "Retirar y sustituir según PR-QLT-006."
      ],
      "notes": [
        {
          "title": "Lote PIR-2607-A",
          "body": "Detector de la campaña REC-2026-1019. No tocar el equipo hasta la visita del técnico.",
          "tone": "crit",
          "icon": "shield-alert"
        }
      ]
    },
    "INS-2026-ALC-02277": {
      "kind": "Instalación",
      "title": "Instalación INS-2026-ALC-02277 · Piso en Alicante (San Juan)",
      "summary": [
        [
          "Instalación",
          "Piso en Alicante (San Juan)"
        ],
        [
          "Marca y contrato",
          "Prosegur Alarmas · PRO-2026-09310"
        ],
        [
          "Equipo afectado",
          "Detector PIR-200 · lote PIR-2607-A"
        ],
        [
          "Instalado",
          "03/08/2026"
        ],
        [
          "Cliente",
          "Elena Mora Cano · CLI-2026-0877"
        ],
        [
          "Estado",
          "Pendiente de aviso por la retirada REC-2026-1019"
        ]
      ],
      "back": [
        {
          "when": "2026-08-03 10:00",
          "stage": "Instalación del detector",
          "detail": "Detector PIR-200 del lote PIR-2607-A instalado durante una instalación nueva.",
          "ref": "OT-2026-ALC-02277",
          "tone": "ok"
        },
        {
          "when": "2026-10-19 06:20",
          "stage": "Localizado por la retirada",
          "detail": "El lote PIR-2607-A cruza con esta vivienda en Salesforce CRM.",
          "ref": "REC-2026-1019",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Retirada del detector",
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
            "ref": "REC-2026-1019",
            "what": "Campaña de retirada del lote",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "ref": "SMS-02277",
            "what": "Aviso al cliente y cita de sustitución",
            "when": "19/10/2026",
            "system": "Twilio SMS",
            "status": {
              "status": "pending",
              "label": "Pendiente"
            }
          }
        ],
        "note": {
          "title": "Plazo de aviso",
          "body": "Avisar al hogar en menos de 4 h desde la apertura de la campaña y ofrecer la sustitución sin coste.",
          "tone": "warn",
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
            "doc": "PIR-2607-A",
            "what": "Lote del detector PIR-200",
            "system": "SAP Business One",
            "date": "19/10/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ]
      },
      "quality": [
        "Detector con batería de litio con riesgo de sobrecalentamiento.",
        "Retirar y sustituir según PR-QLT-006."
      ],
      "notes": [
        {
          "title": "Lote PIR-2607-A",
          "body": "Detector de la campaña REC-2026-1019. No tocar el equipo hasta la visita del técnico.",
          "tone": "crit",
          "icon": "shield-alert"
        }
      ]
    },
    "INS-2026-CAS-01384": {
      "kind": "Instalación",
      "title": "Instalación INS-2026-CAS-01384 · Adosado en Castellón",
      "summary": [
        [
          "Instalación",
          "Adosado en Castellón"
        ],
        [
          "Marca y contrato",
          "Sector Alarm · SA-2026-79102"
        ],
        [
          "Equipo afectado",
          "Detector PIR-200 · lote PIR-2607-A"
        ],
        [
          "Instalado",
          "11/08/2026"
        ],
        [
          "Cliente",
          "Jorge Beltrán Sales · CLI-2026-0655"
        ],
        [
          "Estado",
          "Pendiente de aviso por la retirada REC-2026-1019"
        ]
      ],
      "back": [
        {
          "when": "2026-08-11 10:00",
          "stage": "Instalación del detector",
          "detail": "Detector PIR-200 del lote PIR-2607-A instalado durante una instalación nueva.",
          "ref": "OT-2026-CAS-01384",
          "tone": "ok"
        },
        {
          "when": "2026-10-19 06:20",
          "stage": "Localizado por la retirada",
          "detail": "El lote PIR-2607-A cruza con esta vivienda en Salesforce CRM.",
          "ref": "REC-2026-1019",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Retirada del detector",
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
            "ref": "REC-2026-1019",
            "what": "Campaña de retirada del lote",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "ref": "SMS-01384",
            "what": "Aviso al cliente y cita de sustitución",
            "when": "19/10/2026",
            "system": "Twilio SMS",
            "status": {
              "status": "pending",
              "label": "Pendiente"
            }
          }
        ],
        "note": {
          "title": "Plazo de aviso",
          "body": "Avisar al hogar en menos de 4 h desde la apertura de la campaña y ofrecer la sustitución sin coste.",
          "tone": "warn",
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
            "doc": "PIR-2607-A",
            "what": "Lote del detector PIR-200",
            "system": "SAP Business One",
            "date": "19/10/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ]
      },
      "quality": [
        "Detector con batería de litio con riesgo de sobrecalentamiento.",
        "Retirar y sustituir según PR-QLT-006."
      ],
      "notes": [
        {
          "title": "Lote PIR-2607-A",
          "body": "Detector de la campaña REC-2026-1019. No tocar el equipo hasta la visita del técnico.",
          "tone": "crit",
          "icon": "shield-alert"
        }
      ]
    },
    "INS-2026-VLC-04890": {
      "kind": "Instalación",
      "title": "Instalación INS-2026-VLC-04890 · nueva instalación de hoy (Prosegur Alarmas)",
      "summary": [
        [
          "Instalación",
          "Piso · Valencia (Benimaclet)"
        ],
        [
          "Marca y contrato",
          "Prosegur Alarmas · PRO-2026-10188"
        ],
        [
          "Equipos previstos",
          "Panel 4G con respaldo IP + 5 sensores (lote de detectores distinto de PIR-2607-A)"
        ],
        [
          "Cita",
          "19/10/2026 11:30"
        ],
        [
          "Cliente",
          "Irene Valls Soriano · CLI-2026-1204"
        ],
        [
          "Estado",
          "Planificada"
        ]
      ],
      "back": [
        {
          "when": "2026-10-12 12:10",
          "stage": "Alta del contrato",
          "detail": "Contrato firmado y cita asignada en Salesforce CRM.",
          "ref": "PRO-2026-10188",
          "tone": "brand"
        },
        {
          "when": "2026-10-19 06:40",
          "stage": "Equipos reservados",
          "detail": "Reserva en SAP Business One de detectores de un lote sin campaña abierta.",
          "ref": "OT-2026-30911",
          "tone": "ok"
        }
      ],
      "forward": {
        "title": "Instalación de hoy",
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
            "ref": "OT-2026-30911",
            "what": "Instalación y puesta en marcha (PR-INS-001)",
            "when": "19/10/2026 11:30",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planificada"
            }
          },
          {
            "ref": "PRO-ACT-2026-10188",
            "what": "Alta en el Prosegur Partner Portal",
            "when": "19/10/2026",
            "system": "Prosegur Partner Portal",
            "status": {
              "status": "pending",
              "label": "Pendiente"
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
            "doc": "PRO-2026-10188",
            "what": "Contrato de alarma",
            "system": "Prosegur Partner Portal",
            "date": "12/10/2026",
            "status": {
              "status": "active",
              "label": "Activo"
            }
          }
        ]
      },
      "quality": [
        "Equipos de un lote sin campañas abiertas.",
        "Pruebas de comunicación y de sensores al cierre (PR-INS-001)."
      ],
      "notes": []
    },
    "SA-2026-77412": {
      "kind": "Contrato de marca",
      "title": "Contrato Sector Alarm SA-2026-77412 · Marta Soler Pons",
      "summary": [
        [
          "Marca",
          "Sector Alarm"
        ],
        [
          "Cliente",
          "Marta Soler Pons · CLI-2026-1182"
        ],
        [
          "Instalación",
          "INS-2026-VLC-04417"
        ],
        [
          "Alta",
          "14/03/2025"
        ],
        [
          "Permanencia",
          "24 meses · penalización de baja 180 EUR"
        ],
        [
          "Cargo de desplazamiento",
          "39,00 EUR"
        ],
        [
          "Estado",
          "Activo · reclamación abierta"
        ]
      ],
      "back": [
        {
          "when": "2025-03-14 10:30",
          "stage": "Alta del contrato",
          "detail": "Contrato de alarma con vigilancia y desplazamiento de vigilante.",
          "ref": "SA-2026-77412",
          "tone": "brand"
        },
        {
          "when": "2026-10-19 07:42",
          "stage": "Reclamación de cargos",
          "detail": "La clienta cuestiona los dos cargos de desplazamiento.",
          "ref": "CLM-2026-0619",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Cargos y decisión",
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
            "ref": "SA-ALM-2026-55120",
            "what": "Desplazamiento de vigilante 12/10",
            "when": "12/10/2026",
            "system": "Sector Alarm Partner Hub",
            "status": {
              "status": "open",
              "label": "Cargo 39,00 €"
            }
          },
          {
            "ref": "SA-ALM-2026-55361",
            "what": "Desplazamiento de vigilante 14/10",
            "when": "14/10/2026",
            "system": "Sector Alarm Partner Hub",
            "status": {
              "status": "open",
              "label": "Cargo 39,00 €"
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
            "doc": "SA-ALM-2026-55120",
            "what": "Parte de falsa alarma",
            "system": "Sector Alarm Partner Hub",
            "date": "12/10/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "doc": "SA-ALM-2026-55361",
            "what": "Parte de falsa alarma",
            "system": "Sector Alarm Partner Hub",
            "date": "14/10/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ]
      },
      "quality": [
        "Cargo por desplazamiento aplicable según contrato, salvo causa imputable al equipo."
      ],
      "notes": []
    },
    "PIR-2607-A": {
      "kind": "Lote de equipos",
      "title": "Lote PIR-2607-A · detector de movimiento PIR-200 (Sentinela Electronics)",
      "summary": [
        [
          "Equipo",
          "Detector de movimiento PIR-200"
        ],
        [
          "Fabricante",
          "Sentinela Electronics"
        ],
        [
          "Riesgo",
          "Batería de litio con riesgo de sobrecalentamiento"
        ],
        [
          "Recibidas",
          "2.400 unidades"
        ],
        [
          "Instaladas",
          "1.386 en 912 hogares"
        ],
        [
          "En almacén",
          "960"
        ],
        [
          "Devueltas",
          "54"
        ],
        [
          "Campaña",
          "REC-2026-1019"
        ]
      ],
      "back": [
        {
          "when": "2026-07-14 09:00",
          "stage": "Recepción del lote",
          "detail": "Entrada de 2.400 unidades en el almacén de Paterna.",
          "ref": "SAP-GR-2026-4471",
          "tone": "brand"
        },
        {
          "when": "2026-07-15 12:00",
          "stage": "Alta en inventario",
          "detail": "Alta en SAP Business One y reparto a las tres delegaciones.",
          "ref": "PIR-2607-A",
          "tone": "brand"
        },
        {
          "when": "2026-10-16 17:30",
          "stage": "Aviso del fabricante",
          "detail": "Sentinela Electronics comunica el riesgo de sobrecalentamiento de la batería.",
          "ref": "REC-2026-1019",
          "tone": "crit"
        },
        {
          "when": "2026-10-19 06:20",
          "stage": "Bloqueo de almacén",
          "detail": "960 unidades bloqueadas en SAP Business One.",
          "ref": "OT-2026-31103",
          "tone": "warn"
        }
      ],
      "forward": {
        "title": "Hogares por marca",
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
            "ref": "PIR-VER",
            "what": "Verisure",
            "when": "19/10/2026",
            "system": "Verisure Partner Portal",
            "status": {
              "status": "open",
              "label": "540 hogares"
            }
          },
          {
            "ref": "PIR-SA",
            "what": "Sector Alarm",
            "when": "19/10/2026",
            "system": "Sector Alarm Partner Hub",
            "status": {
              "status": "open",
              "label": "214 hogares"
            }
          },
          {
            "ref": "PIR-PRO",
            "what": "Prosegur Alarmas",
            "when": "19/10/2026",
            "system": "Prosegur Partner Portal",
            "status": {
              "status": "open",
              "label": "158 hogares"
            }
          }
        ],
        "note": {
          "title": "Objetivo",
          "body": "Localizar y avisar a los 912 hogares en 4 h desde la apertura de la campaña.",
          "tone": "warn",
          "icon": "shield-alert"
        }
      },
      "units": {
        "label": "Instalaciones",
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
            "doc": "INS-2026-VLC-02650",
            "what": "Chalet en Paterna · Verisure",
            "system": "Salesforce CRM",
            "date": "28/07/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "doc": "INS-2026-ALC-02277",
            "what": "Piso en Alicante · Prosegur Alarmas",
            "system": "Salesforce CRM",
            "date": "03/08/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "doc": "INS-2026-CAS-01384",
            "what": "Adosado en Castellón · Sector Alarm",
            "system": "Salesforce CRM",
            "date": "11/08/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ]
      },
      "quality": [
        "Lote afectado por riesgo de sobrecalentamiento de la batería de litio.",
        "Almacén bloqueado; sustitución sin coste para el cliente."
      ],
      "notes": [
        {
          "title": "Retirada en curso",
          "body": "912 hogares con equipo instalado y 960 unidades en almacén. Avisar en 4 h (PR-QLT-006).",
          "tone": "crit",
          "icon": "shield-alert"
        }
      ]
    },
    "REC-2026-1019": {
      "kind": "Campaña de retirada",
      "title": "REC-2026-1019 · detector PIR-200 · lote PIR-2607-A",
      "summary": [
        [
          "Campaña",
          "Retirada del detector PIR-200 (lote PIR-2607-A)"
        ],
        [
          "Fabricante",
          "Sentinela Electronics"
        ],
        [
          "Fecha de aviso",
          "16/10/2026"
        ],
        [
          "Riesgo",
          "Sobrecalentamiento de la batería de litio"
        ],
        [
          "Hogares afectados",
          "912 (Verisure 540 · Sector Alarm 214 · Prosegur Alarmas 158)"
        ],
        [
          "Objetivo",
          "Localizar y avisar en 4 h"
        ]
      ],
      "back": [
        {
          "when": "2026-10-16 17:30",
          "stage": "Aviso del fabricante",
          "detail": "Riesgo de sobrecalentamiento de la batería de litio del lote PIR-2607-A.",
          "ref": "REC-2026-1019",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Acciones de la campaña",
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
            "ref": "OT-2026-31103",
            "what": "Bloqueo de almacén y localización de hogares",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "ref": "PIR-2607-A",
            "what": "Lote afectado",
            "when": "19/10/2026",
            "system": "SAP Business One",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ],
        "note": {
          "title": "Alcance",
          "body": "1.386 detectores instalados, 960 en almacén y 54 devueltos de 2.400 recibidos.",
          "tone": "brand",
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
            "doc": "PIR-2607-A",
            "what": "Lote del detector",
            "system": "SAP Business One",
            "date": "19/10/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          }
        ]
      },
      "quality": [
        "Procedimiento aplicable: PR-QLT-006 Retirada de producto."
      ],
      "notes": []
    },
    "ALM-COM-0611": {
      "kind": "Alarma de comunicación",
      "title": "Alarma ALM-COM-0611 · caída de comunicación 4G en Valencia Norte",
      "summary": [
        [
          "Alarma",
          "Paneles sin comunicación 4G"
        ],
        [
          "Zona",
          "Valencia Norte"
        ],
        [
          "Inicio",
          "19/10/2026 05:10"
        ],
        [
          "Paneles",
          "214 (pico de 241 a las 05:42)"
        ],
        [
          "Sin respaldo",
          "38 paneles"
        ],
        [
          "Causa",
          "Mantenimiento del operador móvil"
        ],
        [
          "Estado",
          "Abierta · pendiente de aprobación"
        ]
      ],
      "back": [
        {
          "when": "2026-10-19 05:10",
          "stage": "Inicio de la caída",
          "detail": "Los paneles de Valencia Norte pierden la comunicación 4G.",
          "ref": "COM-4G",
          "tone": "brand"
        },
        {
          "when": "2026-10-19 05:42",
          "stage": "Pico",
          "detail": "241 paneles sin comunicación.",
          "ref": "COM-4G",
          "tone": "warn"
        },
        {
          "when": "2026-10-19 05:50",
          "stage": "Alarma",
          "detail": "Los Partner Portals notifican 214 paneles sin comunicación.",
          "ref": "ALM-COM-0611",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Respuesta",
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
            "ref": "OT-2026-31101",
            "what": "Conmutar a la vía de respaldo y verificar",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "ref": "OT-2026-31102",
            "what": "Visita prioritaria a 38 paneles",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planificada"
            }
          },
          {
            "ref": "SMS-2026-1019-COM",
            "what": "SMS informativo a los clientes",
            "when": "19/10/2026",
            "system": "Twilio SMS",
            "status": {
              "status": "pending",
              "label": "Pendiente"
            }
          }
        ],
        "note": {
          "title": "Aprueba",
          "body": "Responsable de soporte técnico, según PR-COM-003.",
          "tone": "brand",
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
            "doc": "OT-2026-31101",
            "what": "Orden de conmutación",
            "system": "Salesforce CRM",
            "date": "19/10/2026",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "doc": "OT-2026-31102",
            "what": "Orden de visita prioritaria",
            "system": "Salesforce CRM",
            "date": "19/10/2026",
            "status": {
              "status": "planned",
              "label": "Planificada"
            }
          }
        ]
      },
      "quality": [
        "Procedimiento aplicable: PR-COM-003 Pérdida de comunicación de panel."
      ],
      "notes": [
        {
          "title": "Sin supervisión remota",
          "body": "Los 38 paneles sin respaldo no están supervisados por el CRA hasta la visita.",
          "tone": "crit",
          "icon": "alert-triangle"
        }
      ]
    },
    "OT-2026-31102": {
      "kind": "Orden de trabajo",
      "title": "OT-2026-31102 · visita prioritaria a paneles sin respaldo",
      "summary": [
        [
          "Orden",
          "Visita prioritaria · Valencia Norte"
        ],
        [
          "Paneles",
          "38"
        ],
        [
          "Responsable",
          "Jefe de mantenimiento"
        ],
        [
          "Prioridad",
          "Alta"
        ],
        [
          "Alarma",
          "ALM-COM-0611"
        ],
        [
          "Estado",
          "Planificada"
        ]
      ],
      "back": [
        {
          "when": "2026-10-19 06:00",
          "stage": "Orden creada",
          "detail": "Creada por el parte diario con prioridad alta.",
          "ref": "OT-2026-31102",
          "tone": "brand"
        }
      ],
      "forward": {
        "title": "Visitas",
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
            "ref": "INS-2026-VLC-03981",
            "what": "Piso en Orriols · Verisure",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planificada"
            }
          },
          {
            "ref": "FLT-RUTA",
            "what": "Rutas asignadas con Samsara Flota",
            "when": "19/10/2026",
            "system": "Samsara Flota",
            "status": {
              "status": "planned",
              "label": "Planificada"
            }
          }
        ],
        "note": null
      },
      "units": {
        "label": "Instalaciones",
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
            "doc": "INS-2026-VLC-03981",
            "what": "Instalación sin respaldo",
            "system": "Salesforce CRM",
            "date": "19/10/2026",
            "status": {
              "status": "planned",
              "label": "Planificada"
            }
          }
        ]
      },
      "quality": [
        "Al cierre: comprobar la supervisión remota con el CRA."
      ],
      "notes": []
    },
    "CLM-2026-0619": {
      "kind": "Reclamación",
      "title": "Reclamación CLM-2026-0619 · cargos de desplazamiento por falsas alarmas",
      "summary": [
        [
          "Asunto",
          "Dos cargos de 39,00 EUR por falsas alarmas del 12 y 14/10/2026"
        ],
        [
          "Cliente",
          "Marta Soler Pons"
        ],
        [
          "Contrato",
          "Sector Alarm · SA-2026-77412"
        ],
        [
          "Instalación",
          "INS-2026-VLC-04417"
        ],
        [
          "Canal",
          "Email"
        ],
        [
          "Plazo",
          "Acuse 24 h · resolución 10 días hábiles"
        ],
        [
          "Estado",
          "Abierta"
        ]
      ],
      "back": [
        {
          "when": "2026-10-19 07:42",
          "stage": "Reclamación recibida",
          "detail": "La clienta reclama los cargos y amenaza con la baja con penalización de 180 EUR.",
          "ref": "CLM-2026-0619",
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
            "ref": "INS-2026-VLC-04417",
            "what": "Instalación afectada",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "ref": "OT-2026-31140",
            "what": "Sustitución de batería del PIR",
            "when": "20/10/2026",
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
            "doc": "SA-2026-77412",
            "what": "Contrato de alarma",
            "system": "Sector Alarm Partner Hub",
            "date": "14/03/2025",
            "status": {
              "status": "active",
              "label": "Activo"
            }
          }
        ]
      },
      "quality": [
        "Procedimiento aplicable: PR-SOP-007 Gestión de falsas alarmas.",
        "Plazo: acuse en 24 h y resolución en 10 días hábiles."
      ],
      "notes": []
    },
    "HOM-2026-031": {
      "kind": "Homologación",
      "title": "HOM-2026-031 · cuestionario anual de homologación de Prosegur Alarmas",
      "summary": [
        [
          "Marca",
          "Prosegur Alarmas"
        ],
        [
          "Instalador",
          "Guardián Ibérica Instalaciones, S.L.U."
        ],
        [
          "Ámbito",
          "Habilitación de empresa de seguridad, UNE-EN 50131, RGPD y videoverificación, seguros RC, formación y subcontratas"
        ],
        [
          "Canal",
          "Prosegur Partner Portal"
        ],
        [
          "Estado",
          "En preparación"
        ]
      ],
      "back": [
        {
          "when": "2026-10-12 09:00",
          "stage": "Cuestionario recibido",
          "detail": "Prosegur Alarmas abre la homologación anual en el Partner Portal.",
          "ref": "HOM-2026-031",
          "tone": "brand"
        }
      ],
      "forward": {
        "title": "Evidencias",
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
            "ref": "PR-INS-001",
            "what": "Instalación y puesta en marcha (grado 2)",
            "when": "19/10/2026",
            "system": "Google Workspace",
            "status": {
              "status": "open",
              "label": "Abierta"
            }
          },
          {
            "ref": "PR-RGPD-002",
            "what": "Videoverificación y datos personales",
            "when": "19/10/2026",
            "system": "Google Workspace",
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
        "Respuestas con cita del procedimiento y revisión del DPO / Responsable de cumplimiento."
      ],
      "notes": []
    }
  }
});
