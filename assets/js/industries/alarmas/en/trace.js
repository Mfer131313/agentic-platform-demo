/* Guardián Ibérica Instalaciones · traceability records (installations, contracts, equipment lots, recall campaigns, alarms and complaints), English.
 * Read by App.traceModal from DATA.trace[code] (upper-case keys).
 * Demo scenario with synthetic data (MFM). */
agenticPackEn('alarmas', {
  trace: {
    "INS-2026-VLC-04417": {
      "kind": "Installation",
      "title": "Installation INS-2026-VLC-04417 · home of Marta Soler Pons (Burjassot)",
      "summary": [
        [
          "Installation",
          "Detached house · Burjassot (Valencia)"
        ],
        [
          "Brand and contract",
          "Sector Alarm · SA-2026-77412"
        ],
        [
          "Equipment",
          "Panel with 4G + 6 sensors (living room PIR, 2 contacts, siren)"
        ],
        [
          "Installed",
          "14/03/2025"
        ],
        [
          "Last check",
          "22/03/2026"
        ],
        [
          "Customer",
          "Marta Soler Pons · CLI-2026-1182"
        ],
        [
          "Branch",
          "Paterna (Valencia)"
        ],
        [
          "Status",
          "Active · open complaint CLM-2026-0619"
        ]
      ],
      "back": [
        {
          "when": "2025-03-14 10:30",
          "stage": "Installation and commissioning",
          "detail": "Installation per PR-INS-001 (grade 2) by a Paterna technician. Each sensor and the link to the ARC tested.",
          "ref": "OT-2025-08812",
          "tone": "ok"
        },
        {
          "when": "2026-03-22 09:15",
          "stage": "Annual check",
          "detail": "Preventive maintenance PR-MAN-004. Living room PIR battery at 61%; no replacement notice.",
          "ref": "OT-2026-17703",
          "tone": "brand"
        },
        {
          "when": "2026-10-08 18:40",
          "stage": "Low battery without warning",
          "detail": "Telemetry of the living room PIR drops below 10% but the brand portal raises no battery warning.",
          "ref": "SA-TEL-77412-0610",
          "tone": "warn"
        },
        {
          "when": "2026-10-12 03:12",
          "stage": "False alarm",
          "detail": "The living room PIR triggers with the home empty; the guard is dispatched and finds nothing. Charge of EUR 39.00.",
          "ref": "SA-ALM-2026-55120",
          "tone": "crit"
        },
        {
          "when": "2026-10-14 04:05",
          "stage": "Second false alarm",
          "detail": "Same cause. Second call-out charge of EUR 39.00.",
          "ref": "SA-ALM-2026-55361",
          "tone": "crit"
        },
        {
          "when": "2026-10-19 07:42",
          "stage": "Complaint",
          "detail": "The customer claims both charges and threatens to cancel with a EUR 180 penalty.",
          "ref": "CLM-2026-0619",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Installation follow-up",
        "cols": [
          {
            "key": "ref",
            "label": "Reference",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Date"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "CLM-2026-0619",
            "what": "Guard call-out charges complaint",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "ref": "OT-2026-31140",
            "what": "Living room PIR battery replacement",
            "when": "20/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planned"
            }
          },
          {
            "ref": "SA-ABN-2026-0619",
            "what": "Credit of both charges (proposal)",
            "when": "19/10/2026",
            "system": "Sector Alarm Partner Hub",
            "status": {
              "status": "evaluate",
              "label": "To decide"
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
        "label": "Documents",
        "cols": [
          {
            "key": "doc",
            "label": "Document",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "date",
            "label": "Date"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "SA-2026-77412",
            "what": "Alarm contract",
            "system": "Sector Alarm Partner Hub",
            "date": "14/03/2025",
            "status": {
              "status": "active",
              "label": "Active"
            }
          },
          {
            "doc": "OT-2026-17703",
            "what": "Annual check report",
            "system": "SAP Business One",
            "date": "22/03/2026",
            "status": {
              "status": "ok",
              "label": "Compliant"
            }
          },
          {
            "doc": "SA-ALM-2026-55120",
            "what": "False alarm report 12/10",
            "system": "Sector Alarm Partner Hub",
            "date": "12/10/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "doc": "SA-ALM-2026-55361",
            "what": "False alarm report 14/10",
            "system": "Sector Alarm Partner Hub",
            "date": "14/10/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ]
      },
      "quality": [
        "Installation compliant with PR-INS-001 (grade 2) on 14/03/2025.",
        "Living room PIR sensor: no low battery warning in the brand portal.",
        "No equipment from lot PIR-2607-A in this home."
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
      "kind": "Installation",
      "title": "Installation INS-2026-VLC-03981 · home in Valencia North (Verisure)",
      "summary": [
        [
          "Installation",
          "Flat · Valencia North (Orriols)"
        ],
        [
          "Brand and contract",
          "Verisure · VER-2025-40871"
        ],
        [
          "Equipment",
          "4G panel with no second SIM or IP + 4 sensors"
        ],
        [
          "Installed",
          "02/09/2025"
        ],
        [
          "Customer",
          "Andrés Ferrer Ibáñez · CLI-2025-3317"
        ],
        [
          "Status",
          "No communication since 05:10 · no backup path"
        ]
      ],
      "back": [
        {
          "when": "2025-09-02 11:00",
          "stage": "Installation and commissioning",
          "detail": "4G panel installed per PR-INS-001. No customer router available for IP backup.",
          "ref": "OT-2025-31204",
          "tone": "ok"
        },
        {
          "when": "2026-10-19 05:10",
          "stage": "Communication lost",
          "detail": "The panel stops communicating over 4G after the mobile operator maintenance.",
          "ref": "ALM-COM-0611",
          "tone": "crit"
        },
        {
          "when": "2026-10-19 06:00",
          "stage": "Classified without backup",
          "detail": "Included in the 38 panels with no IP or second SIM: priority visit required.",
          "ref": "OT-2026-31102",
          "tone": "warn"
        }
      ],
      "forward": {
        "title": "Priority visit",
        "cols": [
          {
            "key": "ref",
            "label": "Reference",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Date"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "OT-2026-31102",
            "what": "Fit second SIM and verify supervision",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planned"
            }
          },
          {
            "ref": "SMS-2026-1019-3981",
            "what": "Customer notice via Twilio SMS",
            "when": "19/10/2026",
            "system": "Twilio SMS",
            "status": {
              "status": "pending",
              "label": "Pending"
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
        "label": "Documents",
        "cols": [
          {
            "key": "doc",
            "label": "Document",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "date",
            "label": "Date"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "VER-2025-40871",
            "what": "Alarm contract",
            "system": "Verisure Partner Portal",
            "date": "02/09/2025",
            "status": {
              "status": "active",
              "label": "Active"
            }
          },
          {
            "doc": "OT-2025-31204",
            "what": "Installation report",
            "system": "SAP Business One",
            "date": "02/09/2025",
            "status": {
              "status": "ok",
              "label": "Compliant"
            }
          }
        ]
      },
      "quality": [
        "Installation compliant with PR-INS-001.",
        "No IP backup path or second SIM."
      ],
      "notes": []
    },
    "INS-2026-VLC-05102": {
      "kind": "Installation",
      "title": "Installation INS-2026-VLC-05102 · small business in Valencia North (Sector Alarm)",
      "summary": [
        [
          "Installation",
          "Shop · Valencia North"
        ],
        [
          "Brand and contract",
          "Sector Alarm · SA-2026-80233"
        ],
        [
          "Equipment",
          "4G panel with IP backup + 5 sensors and camera"
        ],
        [
          "Installed",
          "19/06/2026"
        ],
        [
          "Customer",
          "Carnicería Pons Hermanos · CLI-2026-0904"
        ],
        [
          "Status",
          "Switched to the IP backup path"
        ]
      ],
      "back": [
        {
          "when": "2026-06-19 09:30",
          "stage": "Installation and commissioning",
          "detail": "Panel with IP backup through the shop router. Video verification set up per PR-RGPD-002.",
          "ref": "OT-2026-12907",
          "tone": "ok"
        },
        {
          "when": "2026-10-19 05:12",
          "stage": "4G lost",
          "detail": "4G communication drops; the panel moves to the IP path on its own.",
          "ref": "ALM-COM-0611",
          "tone": "warn"
        },
        {
          "when": "2026-10-19 05:55",
          "stage": "Supervision restored",
          "detail": "The ARC receives the signal again over IP. No impact for the customer.",
          "ref": "OT-2026-31101",
          "tone": "ok"
        }
      ],
      "forward": {
        "title": "Follow-up",
        "cols": [
          {
            "key": "ref",
            "label": "Reference",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Date"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "OT-2026-31101",
            "what": "Verify signal after 4G is restored",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planned"
            }
          }
        ],
        "note": null
      },
      "units": {
        "label": "Documents",
        "cols": [
          {
            "key": "doc",
            "label": "Document",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "date",
            "label": "Date"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "SA-2026-80233",
            "what": "Alarm contract",
            "system": "Sector Alarm Partner Hub",
            "date": "19/06/2026",
            "status": {
              "status": "active",
              "label": "Active"
            }
          }
        ]
      },
      "quality": [
        "Video verification with privacy notice delivered (PR-RGPD-002).",
        "IP backup operational."
      ],
      "notes": []
    },
    "INS-2026-VLC-02650": {
      "kind": "Installation",
      "title": "Installation INS-2026-VLC-02650 · Villa in Paterna",
      "summary": [
        [
          "Installation",
          "Villa in Paterna"
        ],
        [
          "Brand and contract",
          "Verisure · VER-2026-21544"
        ],
        [
          "Affected equipment",
          "PIR-200 detector · lot PIR-2607-A"
        ],
        [
          "Installed",
          "28/07/2026"
        ],
        [
          "Customer",
          "Raúl Navas Gil · CLI-2026-0412"
        ],
        [
          "Status",
          "Pending notice for recall REC-2026-1019"
        ]
      ],
      "back": [
        {
          "when": "2026-07-28 10:00",
          "stage": "Detector installed",
          "detail": "PIR-200 detector from lot PIR-2607-A fitted during a new installation.",
          "ref": "OT-2026-VLC-02650",
          "tone": "ok"
        },
        {
          "when": "2026-10-19 06:20",
          "stage": "Located by the recall",
          "detail": "Lot PIR-2607-A matches this home in Salesforce CRM.",
          "ref": "REC-2026-1019",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Detector recall",
        "cols": [
          {
            "key": "ref",
            "label": "Reference",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Date"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "REC-2026-1019",
            "what": "Lot recall campaign",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "ref": "SMS-02650",
            "what": "Customer notice and replacement appointment",
            "when": "19/10/2026",
            "system": "Twilio SMS",
            "status": {
              "status": "pending",
              "label": "Pending"
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
        "label": "Documents",
        "cols": [
          {
            "key": "doc",
            "label": "Document",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "date",
            "label": "Date"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "PIR-2607-A",
            "what": "PIR-200 detector lot",
            "system": "SAP Business One",
            "date": "19/10/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ]
      },
      "quality": [
        "Detector with a lithium battery at risk of overheating.",
        "Remove and replace per PR-QLT-006."
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
      "kind": "Installation",
      "title": "Installation INS-2026-ALC-02277 · Flat in Alicante (San Juan)",
      "summary": [
        [
          "Installation",
          "Flat in Alicante (San Juan)"
        ],
        [
          "Brand and contract",
          "Prosegur Alarmas · PRO-2026-09310"
        ],
        [
          "Affected equipment",
          "PIR-200 detector · lot PIR-2607-A"
        ],
        [
          "Installed",
          "03/08/2026"
        ],
        [
          "Customer",
          "Elena Mora Cano · CLI-2026-0877"
        ],
        [
          "Status",
          "Pending notice for recall REC-2026-1019"
        ]
      ],
      "back": [
        {
          "when": "2026-08-03 10:00",
          "stage": "Detector installed",
          "detail": "PIR-200 detector from lot PIR-2607-A fitted during a new installation.",
          "ref": "OT-2026-ALC-02277",
          "tone": "ok"
        },
        {
          "when": "2026-10-19 06:20",
          "stage": "Located by the recall",
          "detail": "Lot PIR-2607-A matches this home in Salesforce CRM.",
          "ref": "REC-2026-1019",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Detector recall",
        "cols": [
          {
            "key": "ref",
            "label": "Reference",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Date"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "REC-2026-1019",
            "what": "Lot recall campaign",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "ref": "SMS-02277",
            "what": "Customer notice and replacement appointment",
            "when": "19/10/2026",
            "system": "Twilio SMS",
            "status": {
              "status": "pending",
              "label": "Pending"
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
        "label": "Documents",
        "cols": [
          {
            "key": "doc",
            "label": "Document",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "date",
            "label": "Date"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "PIR-2607-A",
            "what": "PIR-200 detector lot",
            "system": "SAP Business One",
            "date": "19/10/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ]
      },
      "quality": [
        "Detector with a lithium battery at risk of overheating.",
        "Remove and replace per PR-QLT-006."
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
      "kind": "Installation",
      "title": "Installation INS-2026-CAS-01384 · Townhouse in Castellón",
      "summary": [
        [
          "Installation",
          "Townhouse in Castellón"
        ],
        [
          "Brand and contract",
          "Sector Alarm · SA-2026-79102"
        ],
        [
          "Affected equipment",
          "PIR-200 detector · lot PIR-2607-A"
        ],
        [
          "Installed",
          "11/08/2026"
        ],
        [
          "Customer",
          "Jorge Beltrán Sales · CLI-2026-0655"
        ],
        [
          "Status",
          "Pending notice for recall REC-2026-1019"
        ]
      ],
      "back": [
        {
          "when": "2026-08-11 10:00",
          "stage": "Detector installed",
          "detail": "PIR-200 detector from lot PIR-2607-A fitted during a new installation.",
          "ref": "OT-2026-CAS-01384",
          "tone": "ok"
        },
        {
          "when": "2026-10-19 06:20",
          "stage": "Located by the recall",
          "detail": "Lot PIR-2607-A matches this home in Salesforce CRM.",
          "ref": "REC-2026-1019",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Detector recall",
        "cols": [
          {
            "key": "ref",
            "label": "Reference",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Date"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "REC-2026-1019",
            "what": "Lot recall campaign",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "ref": "SMS-01384",
            "what": "Customer notice and replacement appointment",
            "when": "19/10/2026",
            "system": "Twilio SMS",
            "status": {
              "status": "pending",
              "label": "Pending"
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
        "label": "Documents",
        "cols": [
          {
            "key": "doc",
            "label": "Document",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "date",
            "label": "Date"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "PIR-2607-A",
            "what": "PIR-200 detector lot",
            "system": "SAP Business One",
            "date": "19/10/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ]
      },
      "quality": [
        "Detector with a lithium battery at risk of overheating.",
        "Remove and replace per PR-QLT-006."
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
      "kind": "Installation",
      "title": "Installation INS-2026-VLC-04890 · new installation today (Prosegur Alarmas)",
      "summary": [
        [
          "Installation",
          "Flat · Valencia (Benimaclet)"
        ],
        [
          "Brand and contract",
          "Prosegur Alarmas · PRO-2026-10188"
        ],
        [
          "Planned equipment",
          "4G panel with IP backup + 5 sensors (detector lot other than PIR-2607-A)"
        ],
        [
          "Appointment",
          "19/10/2026 11:30"
        ],
        [
          "Customer",
          "Irene Valls Soriano · CLI-2026-1204"
        ],
        [
          "Status",
          "Planned"
        ]
      ],
      "back": [
        {
          "when": "2026-10-12 12:10",
          "stage": "Contract entered",
          "detail": "Contract signed and appointment assigned in Salesforce CRM.",
          "ref": "PRO-2026-10188",
          "tone": "brand"
        },
        {
          "when": "2026-10-19 06:40",
          "stage": "Equipment reserved",
          "detail": "Detectors from a lot with no open campaign reserved in SAP Business One.",
          "ref": "OT-2026-30911",
          "tone": "ok"
        }
      ],
      "forward": {
        "title": "Installation today",
        "cols": [
          {
            "key": "ref",
            "label": "Reference",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Date"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "OT-2026-30911",
            "what": "Installation and commissioning (PR-INS-001)",
            "when": "19/10/2026 11:30",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planned"
            }
          },
          {
            "ref": "PRO-ACT-2026-10188",
            "what": "Registration in the Prosegur Partner Portal",
            "when": "19/10/2026",
            "system": "Prosegur Partner Portal",
            "status": {
              "status": "pending",
              "label": "Pending"
            }
          }
        ],
        "note": null
      },
      "units": {
        "label": "Documents",
        "cols": [
          {
            "key": "doc",
            "label": "Document",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "date",
            "label": "Date"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "PRO-2026-10188",
            "what": "Alarm contract",
            "system": "Prosegur Partner Portal",
            "date": "12/10/2026",
            "status": {
              "status": "active",
              "label": "Active"
            }
          }
        ]
      },
      "quality": [
        "Equipment from a lot with no open campaigns.",
        "Communication and sensor tests at close-out (PR-INS-001)."
      ],
      "notes": []
    },
    "SA-2026-77412": {
      "kind": "Brand contract",
      "title": "Sector Alarm contract SA-2026-77412 · Marta Soler Pons",
      "summary": [
        [
          "Brand",
          "Sector Alarm"
        ],
        [
          "Customer",
          "Marta Soler Pons · CLI-2026-1182"
        ],
        [
          "Installation",
          "INS-2026-VLC-04417"
        ],
        [
          "Start",
          "14/03/2025"
        ],
        [
          "Minimum term",
          "24 months · cancellation penalty EUR 180"
        ],
        [
          "Call-out charge",
          "39,00 EUR"
        ],
        [
          "Status",
          "Active · open complaint"
        ]
      ],
      "back": [
        {
          "when": "2025-03-14 10:30",
          "stage": "Contract signed",
          "detail": "Alarm contract with monitoring and guard call-out.",
          "ref": "SA-2026-77412",
          "tone": "brand"
        },
        {
          "when": "2026-10-19 07:42",
          "stage": "Charges complaint",
          "detail": "The customer disputes the two call-out charges.",
          "ref": "CLM-2026-0619",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Charges and decision",
        "cols": [
          {
            "key": "ref",
            "label": "Reference",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Date"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "SA-ALM-2026-55120",
            "what": "Guard call-out 12/10",
            "when": "12/10/2026",
            "system": "Sector Alarm Partner Hub",
            "status": {
              "status": "open",
              "label": "Charge €39.00"
            }
          },
          {
            "ref": "SA-ALM-2026-55361",
            "what": "Guard call-out 14/10",
            "when": "14/10/2026",
            "system": "Sector Alarm Partner Hub",
            "status": {
              "status": "open",
              "label": "Charge €39.00"
            }
          }
        ],
        "note": null
      },
      "units": {
        "label": "Documents",
        "cols": [
          {
            "key": "doc",
            "label": "Document",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "date",
            "label": "Date"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "SA-ALM-2026-55120",
            "what": "False alarm report",
            "system": "Sector Alarm Partner Hub",
            "date": "12/10/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "doc": "SA-ALM-2026-55361",
            "what": "False alarm report",
            "system": "Sector Alarm Partner Hub",
            "date": "14/10/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ]
      },
      "quality": [
        "Call-out charge applies under the contract unless the cause is attributable to the equipment."
      ],
      "notes": []
    },
    "PIR-2607-A": {
      "kind": "Equipment lot",
      "title": "Lot PIR-2607-A · PIR-200 motion detector (Sentinela Electronics)",
      "summary": [
        [
          "Equipment",
          "PIR-200 motion detector"
        ],
        [
          "Manufacturer",
          "Sentinela Electronics"
        ],
        [
          "Risk",
          "Lithium battery with overheating risk"
        ],
        [
          "Received",
          "2,400 units"
        ],
        [
          "Installed",
          "1,386 in 912 homes"
        ],
        [
          "In warehouse",
          "960"
        ],
        [
          "Returned",
          "54"
        ],
        [
          "Campaign",
          "REC-2026-1019"
        ]
      ],
      "back": [
        {
          "when": "2026-07-14 09:00",
          "stage": "Lot received",
          "detail": "2,400 units received at the Paterna warehouse.",
          "ref": "SAP-GR-2026-4471",
          "tone": "brand"
        },
        {
          "when": "2026-07-15 12:00",
          "stage": "Inventory entry",
          "detail": "Entered in SAP Business One and distributed to the three branches.",
          "ref": "PIR-2607-A",
          "tone": "brand"
        },
        {
          "when": "2026-10-16 17:30",
          "stage": "Manufacturer notice",
          "detail": "Sentinela Electronics reports the battery overheating risk.",
          "ref": "REC-2026-1019",
          "tone": "crit"
        },
        {
          "when": "2026-10-19 06:20",
          "stage": "Warehouse block",
          "detail": "960 units blocked in SAP Business One.",
          "ref": "OT-2026-31103",
          "tone": "warn"
        }
      ],
      "forward": {
        "title": "Homes by brand",
        "cols": [
          {
            "key": "ref",
            "label": "Reference",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Date"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "status",
            "label": "Status",
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
              "label": "540 homes"
            }
          },
          {
            "ref": "PIR-SA",
            "what": "Sector Alarm",
            "when": "19/10/2026",
            "system": "Sector Alarm Partner Hub",
            "status": {
              "status": "open",
              "label": "214 homes"
            }
          },
          {
            "ref": "PIR-PRO",
            "what": "Prosegur Alarmas",
            "when": "19/10/2026",
            "system": "Prosegur Partner Portal",
            "status": {
              "status": "open",
              "label": "158 homes"
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
        "label": "Installations",
        "cols": [
          {
            "key": "doc",
            "label": "Document",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "date",
            "label": "Date"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "INS-2026-VLC-02650",
            "what": "Villa in Paterna · Verisure",
            "system": "Salesforce CRM",
            "date": "28/07/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "doc": "INS-2026-ALC-02277",
            "what": "Flat in Alicante · Prosegur Alarmas",
            "system": "Salesforce CRM",
            "date": "03/08/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "doc": "INS-2026-CAS-01384",
            "what": "Townhouse in Castellón · Sector Alarm",
            "system": "Salesforce CRM",
            "date": "11/08/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ]
      },
      "quality": [
        "Lot affected by lithium battery overheating risk.",
        "Warehouse blocked; replacement at no cost to the customer."
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
      "kind": "Recall campaign",
      "title": "REC-2026-1019 · PIR-200 detector · lot PIR-2607-A",
      "summary": [
        [
          "Campaign",
          "PIR-200 detector recall (lot PIR-2607-A)"
        ],
        [
          "Manufacturer",
          "Sentinela Electronics"
        ],
        [
          "Notice date",
          "16/10/2026"
        ],
        [
          "Risk",
          "Lithium battery overheating"
        ],
        [
          "Homes affected",
          "912 (Verisure 540 · Sector Alarm 214 · Prosegur Alarmas 158)"
        ],
        [
          "Target",
          "Locate and notify within 4 h"
        ]
      ],
      "back": [
        {
          "when": "2026-10-16 17:30",
          "stage": "Manufacturer notice",
          "detail": "Overheating risk of the lithium battery of lot PIR-2607-A.",
          "ref": "REC-2026-1019",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Campaign actions",
        "cols": [
          {
            "key": "ref",
            "label": "Reference",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Date"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "OT-2026-31103",
            "what": "Warehouse block and home location",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "ref": "PIR-2607-A",
            "what": "Affected lot",
            "when": "19/10/2026",
            "system": "SAP Business One",
            "status": {
              "status": "open",
              "label": "Open"
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
        "label": "Documents",
        "cols": [
          {
            "key": "doc",
            "label": "Document",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "date",
            "label": "Date"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "PIR-2607-A",
            "what": "Detector lot",
            "system": "SAP Business One",
            "date": "19/10/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ]
      },
      "quality": [
        "Applicable procedure: PR-QLT-006 Product recall."
      ],
      "notes": []
    },
    "ALM-COM-0611": {
      "kind": "Communication alarm",
      "title": "Alarm ALM-COM-0611 · 4G communication outage in Valencia North",
      "summary": [
        [
          "Alarm",
          "Panels without 4G communication"
        ],
        [
          "Area",
          "Valencia Norte"
        ],
        [
          "Start",
          "19/10/2026 05:10"
        ],
        [
          "Panels",
          "214 (peak of 241 at 05:42)"
        ],
        [
          "No backup",
          "38 panels"
        ],
        [
          "Cause",
          "Mobile operator maintenance"
        ],
        [
          "Status",
          "Open · pending approval"
        ]
      ],
      "back": [
        {
          "when": "2026-10-19 05:10",
          "stage": "Outage begins",
          "detail": "Valencia North panels lose 4G communication.",
          "ref": "COM-4G",
          "tone": "brand"
        },
        {
          "when": "2026-10-19 05:42",
          "stage": "Peak",
          "detail": "241 panels without communication.",
          "ref": "COM-4G",
          "tone": "warn"
        },
        {
          "when": "2026-10-19 05:50",
          "stage": "Alarm",
          "detail": "The Partner Portals report 214 panels without communication.",
          "ref": "ALM-COM-0611",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Response",
        "cols": [
          {
            "key": "ref",
            "label": "Reference",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Date"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "OT-2026-31101",
            "what": "Switch to the backup path and verify",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "ref": "OT-2026-31102",
            "what": "Priority visit to 38 panels",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planned"
            }
          },
          {
            "ref": "SMS-2026-1019-COM",
            "what": "Information SMS to customers",
            "when": "19/10/2026",
            "system": "Twilio SMS",
            "status": {
              "status": "pending",
              "label": "Pending"
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
        "label": "Documents",
        "cols": [
          {
            "key": "doc",
            "label": "Document",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "date",
            "label": "Date"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "OT-2026-31101",
            "what": "Switchover order",
            "system": "Salesforce CRM",
            "date": "19/10/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "doc": "OT-2026-31102",
            "what": "Priority visit order",
            "system": "Salesforce CRM",
            "date": "19/10/2026",
            "status": {
              "status": "planned",
              "label": "Planned"
            }
          }
        ]
      },
      "quality": [
        "Applicable procedure: PR-COM-003 Panel communication loss."
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
      "kind": "Work order",
      "title": "OT-2026-31102 · priority visit to panels without backup",
      "summary": [
        [
          "Order",
          "Priority visit · Valencia North"
        ],
        [
          "Panels",
          "38"
        ],
        [
          "Owner",
          "Maintenance Manager"
        ],
        [
          "Priority",
          "High"
        ],
        [
          "Alarm",
          "ALM-COM-0611"
        ],
        [
          "Status",
          "Planned"
        ]
      ],
      "back": [
        {
          "when": "2026-10-19 06:00",
          "stage": "Order created",
          "detail": "Created by the daily report with high priority.",
          "ref": "OT-2026-31102",
          "tone": "brand"
        }
      ],
      "forward": {
        "title": "Visits",
        "cols": [
          {
            "key": "ref",
            "label": "Reference",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Date"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "INS-2026-VLC-03981",
            "what": "Flat in Orriols · Verisure",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planned"
            }
          },
          {
            "ref": "FLT-RUTA",
            "what": "Routes assigned with Samsara Fleet",
            "when": "19/10/2026",
            "system": "Samsara Flota",
            "status": {
              "status": "planned",
              "label": "Planned"
            }
          }
        ],
        "note": null
      },
      "units": {
        "label": "Installations",
        "cols": [
          {
            "key": "doc",
            "label": "Document",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "date",
            "label": "Date"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "INS-2026-VLC-03981",
            "what": "Installation without backup",
            "system": "Salesforce CRM",
            "date": "19/10/2026",
            "status": {
              "status": "planned",
              "label": "Planned"
            }
          }
        ]
      },
      "quality": [
        "At close-out: check remote supervision with the ARC."
      ],
      "notes": []
    },
    "CLM-2026-0619": {
      "kind": "Complaint",
      "title": "Complaint CLM-2026-0619 · call-out charges for false alarms",
      "summary": [
        [
          "Subject",
          "Two EUR 39.00 charges for false alarms on 12 and 14/10/2026"
        ],
        [
          "Customer",
          "Marta Soler Pons"
        ],
        [
          "Contract",
          "Sector Alarm · SA-2026-77412"
        ],
        [
          "Installation",
          "INS-2026-VLC-04417"
        ],
        [
          "Channel",
          "Email"
        ],
        [
          "Deadline",
          "Acknowledge 24 h · resolve 10 working days"
        ],
        [
          "Status",
          "Open"
        ]
      ],
      "back": [
        {
          "when": "2026-10-19 07:42",
          "stage": "Complaint received",
          "detail": "The customer claims the charges and threatens to cancel with a EUR 180 penalty.",
          "ref": "CLM-2026-0619",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Follow-up",
        "cols": [
          {
            "key": "ref",
            "label": "Reference",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Date"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "INS-2026-VLC-04417",
            "what": "Affected installation",
            "when": "19/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "ref": "OT-2026-31140",
            "what": "PIR battery replacement",
            "when": "20/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planned"
            }
          }
        ],
        "note": null
      },
      "units": {
        "label": "Documents",
        "cols": [
          {
            "key": "doc",
            "label": "Document",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "date",
            "label": "Date"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "doc": "SA-2026-77412",
            "what": "Alarm contract",
            "system": "Sector Alarm Partner Hub",
            "date": "14/03/2025",
            "status": {
              "status": "active",
              "label": "Active"
            }
          }
        ]
      },
      "quality": [
        "Applicable procedure: PR-SOP-007 False alarm handling.",
        "Deadline: acknowledge within 24 h and resolve within 10 working days."
      ],
      "notes": []
    },
    "HOM-2026-031": {
      "kind": "Accreditation",
      "title": "HOM-2026-031 · Prosegur Alarmas annual accreditation questionnaire",
      "summary": [
        [
          "Brand",
          "Prosegur Alarmas"
        ],
        [
          "Installer",
          "Guardián Ibérica Instalaciones, S.L.U."
        ],
        [
          "Scope",
          "Security company licence, UNE-EN 50131, GDPR and video verification, liability insurance, training and subcontractors"
        ],
        [
          "Channel",
          "Prosegur Partner Portal"
        ],
        [
          "Status",
          "In preparation"
        ]
      ],
      "back": [
        {
          "when": "2026-10-12 09:00",
          "stage": "Questionnaire received",
          "detail": "Prosegur Alarmas opens the annual accreditation in the Partner Portal.",
          "ref": "HOM-2026-031",
          "tone": "brand"
        }
      ],
      "forward": {
        "title": "Evidence",
        "cols": [
          {
            "key": "ref",
            "label": "Reference",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "when",
            "label": "Date"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": [
          {
            "ref": "PR-INS-001",
            "what": "Installation and commissioning (grade 2)",
            "when": "19/10/2026",
            "system": "Google Workspace",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "ref": "PR-RGPD-002",
            "what": "Video verification and personal data",
            "when": "19/10/2026",
            "system": "Google Workspace",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ],
        "note": null
      },
      "units": {
        "label": "Documents",
        "cols": [
          {
            "key": "doc",
            "label": "Document",
            "mono": true,
            "sub": "what"
          },
          {
            "key": "system",
            "label": "System"
          },
          {
            "key": "date",
            "label": "Date"
          },
          {
            "key": "status",
            "label": "Status",
            "chip": true
          }
        ],
        "rows": []
      },
      "quality": [
        "Answers cite the procedure and are reviewed by the DPO / Compliance Officer."
      ],
      "notes": []
    }
  }
});
