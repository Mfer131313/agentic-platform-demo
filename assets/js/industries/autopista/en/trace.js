/* Autopista Multimotor · traceability records (vehicles, orders, customers, recall campaigns and claims), English.
 * Read by App.traceModal from DATA.trace[code] (upper-case keys).
 * Demo scenario with synthetic data (MFM). */
agenticPackEn('autopista', {
  trace: {
    "VIN-2026-MAD-SEAT-03": {
      "kind": "Vehicle",
      "title": "Vehicle VIN-2026-MAD-SEAT-03 · Seat Ibiza 1.0 TSI FR",
      "summary": [
        [
          "Vehicle",
          "Seat Ibiza 1.0 TSI FR 110 CV"
        ],
        [
          "Brand and channel",
          "Seat · Sales (Madrid dealership)"
        ],
        [
          "SKU",
          "SEAT-IBIZA-FR-2026-003"
        ],
        [
          "Location",
          "Delivery bay · Marqués de Soria hub"
        ],
        [
          "Received",
          "15/09/2026"
        ],
        [
          "Sale price",
          "€63,500"
        ],
        [
          "Customer",
          "José María López · CLI-2026-0331"
        ],
        [
          "Status",
          "Delivery planned 07/10/2026 10:30"
        ]
      ],
      "back": [
        {
          "when": "2026-09-15 14:00",
          "stage": "Hub arrival",
          "detail": "Vehicle received from the Martorell plant. Initial inspection with no defects.",
          "ref": "REC-2026-0915-03",
          "tone": "brand"
        },
        {
          "when": "2026-09-16 09:30",
          "stage": "Inventory entry",
          "detail": "Entered in Odoo Inventory and SAP ERP. 360° photos for Salesforce CRM and website listing.",
          "ref": "ODOO-INV-5521",
          "tone": "brand"
        },
        {
          "when": "2026-10-01 16:45",
          "stage": "Customer enquiry",
          "detail": "Walk-in visit by José María López. Test drive requested.",
          "ref": "CLI-2026-0331",
          "tone": "brand"
        },
        {
          "when": "2026-10-04 11:00",
          "stage": "Test drive",
          "detail": "Positive result. Sales order PED-2026-001847 created in SAP ERP.",
          "ref": "PED-2026-001847",
          "tone": "ok"
        },
        {
          "when": "2026-10-05 10:15",
          "stage": "Financing request",
          "detail": "Banco Sabadell approves within 24 h: 60 months, APR 3.99%, 20,000 EUR down payment, 801 EUR per month.",
          "ref": "SAB-FIN-2026-18472",
          "tone": "ok"
        },
        {
          "when": "2026-10-06 12:20",
          "stage": "APR discrepancy",
          "detail": "The bank contract shows 4.25% versus the 3.99% offered in the proposal. Finance asks for a correction before signing.",
          "ref": "CLM-2026-001",
          "tone": "crit"
        },
        {
          "when": "2026-10-07 09:00",
          "stage": "Contract signing",
          "detail": "DocuSign e-signature waiting on the APR correction.",
          "ref": "DS-2026-7741",
          "tone": "warn"
        }
      ],
      "forward": {
        "title": "Documents and delivery",
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
            "ref": "PED-2026-001847",
            "what": "Sales order",
            "when": "04/10/2026",
            "system": "SAP ERP",
            "status": {
              "status": "ok",
              "label": "Confirmed"
            }
          },
          {
            "ref": "SAB-FIN-2026-18472",
            "what": "Banco Sabadell financing",
            "when": "05/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "evaluate",
              "label": "APR to fix"
            }
          },
          {
            "ref": "DS-2026-7741",
            "what": "Purchase contract",
            "when": "07/10/2026 09:00",
            "system": "DocuSign",
            "status": {
              "status": "pending",
              "label": "Awaiting signature"
            }
          },
          {
            "ref": "ENT-2026-1007-03",
            "what": "Customer handover",
            "when": "07/10/2026 10:30",
            "system": "Salesforce CRM",
            "status": {
              "status": "planned",
              "label": "Planned"
            }
          }
        ],
        "note": {
          "title": "Today's handover",
          "body": "The 10:30 handover depends on fixing the APR and signing the contract. Registration in progress.",
          "icon": "car"
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
            "doc": "PED-2026-001847",
            "what": "Sales order",
            "system": "SAP ERP",
            "date": "04/10/2026",
            "status": {
              "status": "ok",
              "label": "Confirmed"
            }
          },
          {
            "doc": "SAB-FIN-2026-18472",
            "what": "Financing offer",
            "system": "Salesforce CRM",
            "date": "05/10/2026",
            "status": {
              "status": "evaluate",
              "label": "To fix"
            }
          },
          {
            "doc": "DS-2026-7741",
            "what": "Purchase contract",
            "system": "DocuSign",
            "date": "07/10/2026",
            "status": {
              "status": "pending",
              "label": "Pending"
            }
          },
          {
            "doc": "INV-2026-001847",
            "what": "Sales invoice",
            "system": "SAP ERP",
            "date": "07/10/2026",
            "status": {
              "status": "draft",
              "label": "Draft"
            }
          }
        ]
      },
      "quality": [
        "Receiving inspection: no defects.",
        "Pre-delivery inspection (PDI) completed on 06/10/2026.",
        "No open recall campaigns for this VIN."
      ],
      "notes": [
        {
          "title": "APR pending correction",
          "body": "Proposal at 3.99% versus 4.25% on the bank contract. Do not sign until Finance confirms (CLM-2026-001).",
          "tone": "crit",
          "icon": "alert-triangle"
        }
      ]
    },
    "VIN-2026-MAD-BMW-04": {
      "kind": "Vehicle",
      "title": "Vehicle VIN-2026-MAD-BMW-04 · BMW X3 20d xDrive",
      "summary": [
        [
          "Vehicle",
          "BMW X3 20d xDrive"
        ],
        [
          "Brand and channel",
          "BMW · Sales"
        ],
        [
          "SKU",
          "BMW-X3-20D-2026-004"
        ],
        [
          "Location",
          "Lot A, bay 14 (Marqués de Soria hub)"
        ],
        [
          "Received",
          "20/09/2026"
        ],
        [
          "Sale price",
          "€67,500"
        ],
        [
          "Customer",
          "Unassigned · reservation in progress"
        ],
        [
          "Status",
          "Critical stock: 2 X3 units available"
        ]
      ],
      "back": [
        {
          "when": "2026-09-20 09:15",
          "stage": "Manufacturer receipt",
          "detail": "Arrival at the hub from Dingolfing (Germany).",
          "ref": "REC-BMW-2026-004",
          "tone": "brand"
        },
        {
          "when": "2026-09-20 14:30",
          "stage": "Technical inspection",
          "detail": "Engine, transmission, safety and paint checked. No defects.",
          "ref": "QA-2026-0920-04",
          "tone": "ok"
        },
        {
          "when": "2026-09-21 08:00",
          "stage": "Inventory entry",
          "detail": "Entered in SAP ERP and Odoo Inventory. Available for sale.",
          "ref": "ODOO-INV-5530",
          "tone": "brand"
        },
        {
          "when": "2026-10-06 17:10",
          "stage": "Stock alert",
          "detail": "2 BMW X3 left against 5 open orders. Factory resupply in 19 days.",
          "ref": "OPE-STOCK-002",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Orders and reservations",
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
            "ref": "RSV-2026-0188",
            "what": "Customer reservation (1,000 EUR deposit)",
            "when": "06/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "ref": "OPE-STOCK-002",
            "what": "BMW resupply alert",
            "when": "06/10/2026",
            "system": "SAP ERP",
            "status": {
              "status": "critical",
              "label": "Critical"
            }
          }
        ],
        "note": {
          "title": "Resupply",
          "body": "The BMW brand manager must pull forward the factory order; until then, limit X3 promotions.",
          "icon": "truck"
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
            "doc": "RSV-2026-0188",
            "what": "Customer reservation",
            "system": "Salesforce CRM",
            "date": "06/10/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "doc": "QA-2026-0920-04",
            "what": "Inspection report",
            "system": "iCare Taller",
            "date": "20/09/2026",
            "status": {
              "status": "ok",
              "label": "Compliant"
            }
          }
        ]
      },
      "quality": [
        "Receiving technical inspection compliant.",
        "No open recall campaigns for this VIN."
      ],
      "notes": [
        {
          "title": "Critical BMW X3 stock",
          "body": "2 units left with 5 open orders. Resupply order still to be pulled forward.",
          "tone": "crit",
          "icon": "package"
        }
      ]
    },
    "VIN-2026-MAD-AUDI-07": {
      "kind": "Vehicle",
      "title": "Vehicle VIN-2026-MAD-AUDI-07 · Audi A3 Sportback 30 TFSI",
      "summary": [
        [
          "Vehicle",
          "Audi A3 Sportback 30 TFSI"
        ],
        [
          "Brand and channel",
          "Audi · 6-month subscription"
        ],
        [
          "SKU",
          "AUDI-A3-30TFSI-2026-007"
        ],
        [
          "Location",
          "With the customer (Madrid)"
        ],
        [
          "Subscription start",
          "10/07/2026"
        ],
        [
          "Monthly fee",
          "€689"
        ],
        [
          "Customer",
          "Lucía Ferrer · CLI-2026-0287"
        ],
        [
          "Status",
          "Subscription active · ends 10/01/2027"
        ]
      ],
      "back": [
        {
          "when": "2026-07-08 10:00",
          "stage": "Contract set-up",
          "detail": "Subscription contract signed in DocuSign.",
          "ref": "SUS-2026-0287",
          "tone": "brand"
        },
        {
          "when": "2026-07-10 12:00",
          "stage": "Handover",
          "detail": "Vehicle handed over with 14 km. First charge via Stripe.",
          "ref": "ENT-2026-0710-07",
          "tone": "ok"
        },
        {
          "when": "2026-10-01 08:00",
          "stage": "Monthly charge",
          "detail": "October charge on Stripe: payment succeeded.",
          "ref": "STR-2026-10-0287",
          "tone": "ok"
        },
        {
          "when": "2026-10-06 09:40",
          "stage": "Service notice",
          "detail": "Twilio SMS sent: 15,000 km service at iCare Workshop.",
          "ref": "SMS-2026-1006-07",
          "tone": "brand"
        }
      ],
      "forward": {
        "title": "Subscription and workshop",
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
            "ref": "SUS-2026-0287",
            "what": "6-month subscription",
            "when": "10/07/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "active",
              "label": "Active"
            }
          },
          {
            "ref": "OT-2026-0431",
            "what": "15,000 km service",
            "when": "09/10/2026",
            "system": "iCare Taller",
            "status": {
              "status": "planned",
              "label": "Planned"
            }
          }
        ],
        "note": {
          "title": "Renewal",
          "body": "Renewal or swap offer to send 30 days before the end (10/12/2026).",
          "icon": "refresh-cw"
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
            "doc": "SUS-2026-0287",
            "what": "Subscription contract",
            "system": "DocuSign",
            "date": "08/07/2026",
            "status": {
              "status": "ok",
              "label": "Signed"
            }
          },
          {
            "doc": "STR-2026-10-0287",
            "what": "October charge",
            "system": "Stripe",
            "date": "01/10/2026",
            "status": {
              "status": "ok",
              "label": "Collected"
            }
          }
        ]
      },
      "quality": [
        "Last service: handover (14 km).",
        "No payment incidents on the subscription."
      ],
      "notes": []
    },
    "VIN-2026-MAD-VW-11": {
      "kind": "Vehicle",
      "title": "Vehicle VIN-2026-MAD-VW-11 · VW Golf 1.5 eTSI (rental fleet)",
      "summary": [
        [
          "Vehicle",
          "VW Golf 1.5 eTSI 130 CV"
        ],
        [
          "Brand and channel",
          "Volkswagen · Rental"
        ],
        [
          "SKU",
          "VW-GOLF-ETSI-2025-011"
        ],
        [
          "Location",
          "Rental fleet · Madrid Atocha"
        ],
        [
          "Registered",
          "03/2025"
        ],
        [
          "Mileage",
          "28.410 km"
        ],
        [
          "Open campaign",
          "REC-VW-2026-001"
        ],
        [
          "Status",
          "ABS recall pending: do not rent"
        ]
      ],
      "back": [
        {
          "when": "2026-03-12 09:00",
          "stage": "Added to fleet",
          "detail": "Added to the rental fleet (~1,000 units).",
          "ref": "FLT-2025-0011",
          "tone": "brand"
        },
        {
          "when": "2026-09-28 11:00",
          "stage": "Manufacturer notice",
          "detail": "Volkswagen announces the ABS module check on 47 Golf units in the fleet.",
          "ref": "REC-VW-2026-001",
          "tone": "crit"
        },
        {
          "when": "2026-10-06 18:00",
          "stage": "Preventive block",
          "detail": "Flagged as not rentable in Odoo Inventory until it goes to the workshop.",
          "ref": "ODOO-INV-3318",
          "tone": "warn"
        }
      ],
      "forward": {
        "title": "Campaign and affected bookings",
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
            "ref": "REC-VW-2026-001",
            "what": "Golf ABS recall (47 units)",
            "when": "28/09/2026",
            "system": "iCare Taller",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "ref": "ALQ-2026-5521",
            "what": "Booking 09/10-12/10 (reassign)",
            "when": "09/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "evaluate",
              "label": "To reassign"
            }
          }
        ],
        "note": {
          "title": "Plan",
          "body": "Reassign the booking to a Golf without the campaign and schedule the workshop (VW technician appointment).",
          "icon": "wrench"
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
            "doc": "REC-VW-2026-001",
            "what": "Manufacturer notice",
            "system": "iCare Taller",
            "date": "28/09/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "doc": "ALQ-2026-5521",
            "what": "Rental booking",
            "system": "Salesforce CRM",
            "date": "09/10/2026",
            "status": {
              "status": "evaluate",
              "label": "To reassign"
            }
          }
        ]
      },
      "quality": [
        "Risk of reduced braking pressure from the ABS module.",
        "Last service: 08/2026, no issues."
      ],
      "notes": [
        {
          "title": "VW Golf ABS recall",
          "body": "Vehicle is on the list of 47 fleet units. Do not rent until the repair is completed.",
          "tone": "crit",
          "icon": "shield-alert"
        }
      ]
    },
    "VIN-2026-MAD-VW-12": {
      "kind": "Vehicle",
      "title": "Vehicle VIN-2026-MAD-VW-12 · VW Golf 1.5 eTSI in workshop",
      "summary": [
        [
          "Vehicle",
          "VW Golf 1.5 eTSI 130 CV"
        ],
        [
          "Brand and channel",
          "Volkswagen · Rental / Workshop"
        ],
        [
          "SKU",
          "VW-GOLF-ETSI-2025-012"
        ],
        [
          "Location",
          "VW workshop · bay 3"
        ],
        [
          "Work order",
          "OT-2026-0412"
        ],
        [
          "Campaign",
          "REC-VW-2026-001"
        ],
        [
          "Technician",
          "Unassigned (VW technician short)"
        ],
        [
          "Status",
          "In workshop, waiting for technician"
        ]
      ],
      "back": [
        {
          "when": "2026-10-05 08:30",
          "stage": "Workshop check-in",
          "detail": "Checked in for the ABS campaign in iCare Workshop.",
          "ref": "OT-2026-0412",
          "tone": "brand"
        },
        {
          "when": "2026-10-06 15:00",
          "stage": "No technician",
          "detail": "The VW workshop is one technician short due to sick leave; appointment delayed to 12:00 on 07/10.",
          "ref": "OPE-WORKSHOP-003",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Workshop jobs",
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
            "ref": "OT-2026-0412",
            "what": "ABS module replacement",
            "when": "07/10/2026 12:00",
            "system": "iCare Taller",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ],
        "note": {
          "title": "Capacity",
          "body": "Request support from the Audi workshop or subcontract one VW technician day.",
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
            "doc": "OT-2026-0412",
            "what": "Work order",
            "system": "iCare Taller",
            "date": "05/10/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ]
      },
      "quality": [
        "ABS part received on 06/10/2026.",
        "Brake test required when closing the order."
      ],
      "notes": [
        {
          "title": "VW technician short",
          "body": "VW workshop capacity at 80% this week.",
          "tone": "warn",
          "icon": "user-x"
        }
      ]
    },
    "VIN-2026-MAD-SKODA-05": {
      "kind": "Vehicle",
      "title": "Vehicle VIN-2026-MAD-SKODA-05 · Škoda Octavia 1.5 TSI",
      "summary": [
        [
          "Vehicle",
          "Škoda Octavia 1.5 TSI"
        ],
        [
          "Brand and channel",
          "Škoda · Sales"
        ],
        [
          "SKU",
          "SKODA-OCT-TSI-2026-005"
        ],
        [
          "Location",
          "Lot B, bay 07"
        ],
        [
          "Received",
          "29/09/2026"
        ],
        [
          "Sale price",
          "€31,900"
        ],
        [
          "Campaign",
          "REC-SKODA-2026-001"
        ],
        [
          "Status",
          "In stock · campaign check before handover"
        ]
      ],
      "back": [
        {
          "when": "2026-09-29 10:00",
          "stage": "Manufacturer receipt",
          "detail": "Arrival from Mladá Boleslav.",
          "ref": "REC-SKODA-2026-005",
          "tone": "brand"
        },
        {
          "when": "2026-10-02 09:00",
          "stage": "Manufacturer notice",
          "detail": "Instrument cluster software update campaign.",
          "ref": "REC-SKODA-2026-001",
          "tone": "warn"
        }
      ],
      "forward": {
        "title": "Campaign",
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
            "ref": "REC-SKODA-2026-001",
            "what": "Software update",
            "when": "02/10/2026",
            "system": "iCare Taller",
            "status": {
              "status": "planned",
              "label": "Planned"
            }
          }
        ]
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
            "doc": "REC-SKODA-2026-001",
            "what": "Manufacturer notice",
            "system": "iCare Taller",
            "date": "02/10/2026",
            "status": {
              "status": "planned",
              "label": "Planned"
            }
          }
        ]
      },
      "quality": [
        "Receiving inspection compliant."
      ],
      "notes": []
    },
    "PED-2026-001847": {
      "kind": "Sales order",
      "title": "Order PED-2026-001847 · Seat Ibiza for José María López",
      "summary": [
        [
          "Customer",
          "José María López"
        ],
        [
          "Vehicle",
          "VIN-2026-MAD-SEAT-03 · Seat Ibiza 1.0 TSI FR"
        ],
        [
          "Amount",
          "€63,500"
        ],
        [
          "Down payment",
          "€20,000"
        ],
        [
          "Financing",
          "Banco Sabadell · 60 months · 3.99%"
        ],
        [
          "Status",
          "Awaiting signature"
        ]
      ],
      "back": [
        {
          "when": "2026-10-04 11:00",
          "stage": "Order created",
          "detail": "After the positive test drive.",
          "ref": "PED-2026-001847",
          "tone": "ok"
        },
        {
          "when": "2026-10-05 10:15",
          "stage": "Financing approved",
          "detail": "Banco Sabadell, 801 EUR/month.",
          "ref": "SAB-FIN-2026-18472",
          "tone": "ok"
        }
      ],
      "forward": {
        "title": "Next steps",
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
            "ref": "DS-2026-7741",
            "what": "Contract signing",
            "when": "07/10/2026 09:00",
            "system": "DocuSign",
            "status": {
              "status": "pending",
              "label": "Pending"
            }
          },
          {
            "ref": "ENT-2026-1007-03",
            "what": "Handover",
            "when": "07/10/2026 10:30",
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
            "doc": "INV-2026-001847",
            "what": "Sales invoice",
            "system": "SAP ERP",
            "date": "07/10/2026",
            "status": {
              "status": "draft",
              "label": "Draft"
            }
          }
        ]
      },
      "quality": [
        "Order margin within sales policy."
      ],
      "notes": []
    },
    "CLI-2026-0331": {
      "kind": "Customer",
      "title": "Customer CLI-2026-0331 · José María López",
      "summary": [
        [
          "Name",
          "José María López"
        ],
        [
          "City",
          "Madrid"
        ],
        [
          "Phone",
          "+34 91 555 0147"
        ],
        [
          "Salesperson",
          "Carlos Martínez"
        ],
        [
          "Active order",
          "PED-2026-001847"
        ],
        [
          "Bank",
          "Banco Sabadell"
        ]
      ],
      "back": [
        {
          "when": "2026-10-01 16:45",
          "stage": "First visit",
          "detail": "Walk-in visit at the dealership.",
          "ref": "CLI-2026-0331",
          "tone": "brand"
        },
        {
          "when": "2026-10-04 11:00",
          "stage": "Test drive",
          "detail": "Seat Ibiza VIN-2026-MAD-SEAT-03",
          "ref": "VIN-2026-MAD-SEAT-03",
          "tone": "ok"
        }
      ],
      "forward": {
        "title": "Customer operations",
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
            "ref": "PED-2026-001847",
            "what": "Sales order",
            "when": "04/10/2026",
            "system": "SAP ERP",
            "status": {
              "status": "ok",
              "label": "Confirmed"
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
            "doc": "SAB-FIN-2026-18472",
            "what": "Financing",
            "system": "Salesforce CRM",
            "date": "05/10/2026",
            "status": {
              "status": "evaluate",
              "label": "To fix"
            }
          }
        ]
      },
      "quality": [
        "Contact details verified in Salesforce CRM."
      ],
      "notes": []
    },
    "OT-2026-0412": {
      "kind": "Vehicle",
      "title": "Vehicle VIN-2026-MAD-VW-12 · VW Golf 1.5 eTSI in workshop",
      "summary": [
        [
          "Vehicle",
          "VW Golf 1.5 eTSI 130 CV"
        ],
        [
          "Brand and channel",
          "Volkswagen · Rental / Workshop"
        ],
        [
          "SKU",
          "VW-GOLF-ETSI-2025-012"
        ],
        [
          "Location",
          "VW workshop · bay 3"
        ],
        [
          "Work order",
          "OT-2026-0412"
        ],
        [
          "Campaign",
          "REC-VW-2026-001"
        ],
        [
          "Technician",
          "Unassigned (VW technician short)"
        ],
        [
          "Status",
          "In workshop, waiting for technician"
        ]
      ],
      "back": [
        {
          "when": "2026-10-05 08:30",
          "stage": "Workshop check-in",
          "detail": "Checked in for the ABS campaign in iCare Workshop.",
          "ref": "OT-2026-0412",
          "tone": "brand"
        },
        {
          "when": "2026-10-06 15:00",
          "stage": "No technician",
          "detail": "The VW workshop is one technician short due to sick leave; appointment delayed to 12:00 on 07/10.",
          "ref": "OPE-WORKSHOP-003",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Workshop jobs",
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
            "ref": "OT-2026-0412",
            "what": "ABS module replacement",
            "when": "07/10/2026 12:00",
            "system": "iCare Taller",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ],
        "note": {
          "title": "Capacity",
          "body": "Request support from the Audi workshop or subcontract one VW technician day.",
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
            "doc": "OT-2026-0412",
            "what": "Work order",
            "system": "iCare Taller",
            "date": "05/10/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ]
      },
      "quality": [
        "ABS part received on 06/10/2026.",
        "Brake test required when closing the order."
      ],
      "notes": [
        {
          "title": "VW technician short",
          "body": "VW workshop capacity at 80% this week.",
          "tone": "warn",
          "icon": "user-x"
        }
      ]
    },
    "REC-VW-2026-001": {
      "kind": "Recall campaign",
      "title": "REC-VW-2026-001 · VW Golf · ABS module",
      "summary": [
        [
          "Campaign",
          "VW Golf · ABS module"
        ],
        [
          "Brand",
          "VW"
        ],
        [
          "Notice date",
          "28/09/2026"
        ],
        [
          "Risk",
          "Risk of reduced braking pressure"
        ],
        [
          "Affected units",
          "47"
        ],
        [
          "Where",
          "Rental fleet, stock and customers"
        ]
      ],
      "back": [
        {
          "when": "2026-09-28 09:00",
          "stage": "Manufacturer notice",
          "detail": "Risk of reduced braking pressure",
          "ref": "REC-VW-2026-001",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Campaign vehicles",
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
            "ref": "VIN-2026-MAD-VW-11",
            "what": "VW Golf · ABS module",
            "when": "28/09/2026",
            "system": "iCare Taller",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "ref": "VIN-2026-MAD-VW-12",
            "what": "VW Golf · ABS module",
            "when": "28/09/2026",
            "system": "iCare Taller",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ],
        "note": {
          "title": "Scope",
          "body": "47 units affected at Autopista Multimotor.",
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
            "doc": "VIN-2026-MAD-VW-11",
            "what": "VW Golf · ABS module",
            "system": "Odoo Inventory",
            "date": "28/09/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          },
          {
            "doc": "VIN-2026-MAD-VW-12",
            "what": "VW Golf · ABS module",
            "system": "Odoo Inventory",
            "date": "28/09/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ]
      },
      "quality": [
        "Risk of reduced braking pressure"
      ],
      "notes": []
    },
    "REC-BMW-2026-002": {
      "kind": "Recall campaign",
      "title": "REC-BMW-2026-002 · BMW X5 · 12 V battery",
      "summary": [
        [
          "Campaign",
          "BMW X5 · 12 V battery"
        ],
        [
          "Brand",
          "BMW"
        ],
        [
          "Notice date",
          "30/09/2026"
        ],
        [
          "Risk",
          "Start failure due to battery"
        ],
        [
          "Affected units",
          "18"
        ],
        [
          "Where",
          "Rental fleet, stock and customers"
        ]
      ],
      "back": [
        {
          "when": "2026-09-30 09:00",
          "stage": "Manufacturer notice",
          "detail": "Start failure due to battery",
          "ref": "REC-BMW-2026-002",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Campaign vehicles",
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
        "rows": [],
        "note": {
          "title": "Scope",
          "body": "18 units affected at Autopista Multimotor.",
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
        "rows": []
      },
      "quality": [
        "Start failure due to battery"
      ],
      "notes": []
    },
    "REC-AUDI-2026-001": {
      "kind": "Recall campaign",
      "title": "REC-AUDI-2026-001 · Audi · door latches",
      "summary": [
        [
          "Campaign",
          "Audi · door latches"
        ],
        [
          "Brand",
          "Audi"
        ],
        [
          "Notice date",
          "15/09/2026"
        ],
        [
          "Risk",
          "Faulty latch (completed)"
        ],
        [
          "Affected units",
          "52"
        ],
        [
          "Where",
          "Rental fleet, stock and customers"
        ]
      ],
      "back": [
        {
          "when": "2026-09-15 09:00",
          "stage": "Manufacturer notice",
          "detail": "Faulty latch (completed)",
          "ref": "REC-AUDI-2026-001",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Campaign vehicles",
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
        "rows": [],
        "note": {
          "title": "Scope",
          "body": "52 units affected at Autopista Multimotor.",
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
        "rows": []
      },
      "quality": [
        "Faulty latch (completed)"
      ],
      "notes": []
    },
    "REC-SKODA-2026-001": {
      "kind": "Recall campaign",
      "title": "REC-SKODA-2026-001 · Škoda · cluster software",
      "summary": [
        [
          "Campaign",
          "Škoda · cluster software"
        ],
        [
          "Brand",
          "Škoda"
        ],
        [
          "Notice date",
          "02/10/2026"
        ],
        [
          "Risk",
          "Software update"
        ],
        [
          "Affected units",
          "12"
        ],
        [
          "Where",
          "Rental fleet, stock and customers"
        ]
      ],
      "back": [
        {
          "when": "2026-10-02 09:00",
          "stage": "Manufacturer notice",
          "detail": "Software update",
          "ref": "REC-SKODA-2026-001",
          "tone": "crit"
        }
      ],
      "forward": {
        "title": "Campaign vehicles",
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
            "ref": "VIN-2026-MAD-SKODA-05",
            "what": "Škoda · cluster software",
            "when": "02/10/2026",
            "system": "iCare Taller",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ],
        "note": {
          "title": "Scope",
          "body": "12 units affected at Autopista Multimotor.",
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
            "doc": "VIN-2026-MAD-SKODA-05",
            "what": "Škoda · cluster software",
            "system": "Odoo Inventory",
            "date": "02/10/2026",
            "status": {
              "status": "open",
              "label": "Open"
            }
          }
        ]
      },
      "quality": [
        "Software update"
      ],
      "notes": []
    },
    "CLM-2026-001": {
      "kind": "Claim",
      "title": "Claim CLM-2026-001",
      "summary": [
        [
          "Subject",
          "Financing APR: 3.99% offered versus 4.25% on contract"
        ],
        [
          "Customer",
          "José María López"
        ],
        [
          "Vehicle",
          "VIN-2026-MAD-SEAT-03"
        ],
        [
          "Channel",
          "Salesforce CRM"
        ],
        [
          "Status",
          "Open"
        ]
      ],
      "back": [
        {
          "when": "2026-10-06 12:20",
          "stage": "Claim received",
          "detail": "Financing APR: 3.99% offered versus 4.25% on contract",
          "ref": "CLM-2026-001",
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
            "ref": "VIN-2026-MAD-SEAT-03",
            "what": "Vehicle concerned",
            "when": "07/10/2026",
            "system": "Salesforce CRM",
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
        "Customer response deadline: 5 working days."
      ],
      "notes": []
    },
    "CLM-2026-002": {
      "kind": "Claim",
      "title": "Claim CLM-2026-002",
      "summary": [
        [
          "Subject",
          "Delayed handover of an Audi A3"
        ],
        [
          "Customer",
          "Audi sales customer"
        ],
        [
          "Vehicle",
          "VIN-2026-MAD-AUDI-07"
        ],
        [
          "Channel",
          "Salesforce CRM"
        ],
        [
          "Status",
          "Open"
        ]
      ],
      "back": [
        {
          "when": "2026-10-06 12:20",
          "stage": "Claim received",
          "detail": "Delayed handover of an Audi A3",
          "ref": "CLM-2026-002",
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
            "ref": "VIN-2026-MAD-AUDI-07",
            "what": "Vehicle concerned",
            "when": "07/10/2026",
            "system": "Salesforce CRM",
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
        "Customer response deadline: 5 working days."
      ],
      "notes": []
    },
    "CLM-2026-003": {
      "kind": "Claim",
      "title": "Claim CLM-2026-003",
      "summary": [
        [
          "Subject",
          "Duplicate subscription charge on Stripe"
        ],
        [
          "Customer",
          "Lucía Ferrer"
        ],
        [
          "Vehicle",
          "VIN-2026-MAD-AUDI-07"
        ],
        [
          "Channel",
          "Salesforce CRM"
        ],
        [
          "Status",
          "Open"
        ]
      ],
      "back": [
        {
          "when": "2026-10-06 12:20",
          "stage": "Claim received",
          "detail": "Duplicate subscription charge on Stripe",
          "ref": "CLM-2026-003",
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
            "ref": "VIN-2026-MAD-AUDI-07",
            "what": "Vehicle concerned",
            "when": "07/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "evaluate",
              "label": "To evaluate"
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
        "Customer response deadline: 5 working days."
      ],
      "notes": []
    },
    "CLM-2026-004": {
      "kind": "Claim",
      "title": "Claim CLM-2026-004",
      "summary": [
        [
          "Subject",
          "Brake noise after service"
        ],
        [
          "Customer",
          "Workshop customer"
        ],
        [
          "Vehicle",
          "VIN-2026-MAD-VW-12"
        ],
        [
          "Channel",
          "Salesforce CRM"
        ],
        [
          "Status",
          "Open"
        ]
      ],
      "back": [
        {
          "when": "2026-10-06 12:20",
          "stage": "Claim received",
          "detail": "Brake noise after service",
          "ref": "CLM-2026-004",
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
            "ref": "VIN-2026-MAD-VW-12",
            "what": "Vehicle concerned",
            "when": "07/10/2026",
            "system": "Salesforce CRM",
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
        "Customer response deadline: 5 working days."
      ],
      "notes": []
    },
    "CLM-2026-005": {
      "kind": "Claim",
      "title": "Claim CLM-2026-005",
      "summary": [
        [
          "Subject",
          "Rental deposit awaiting refund"
        ],
        [
          "Customer",
          "Rental customer"
        ],
        [
          "Vehicle",
          "VIN-2026-MAD-VW-11"
        ],
        [
          "Channel",
          "Salesforce CRM"
        ],
        [
          "Status",
          "Open"
        ]
      ],
      "back": [
        {
          "when": "2026-10-06 12:20",
          "stage": "Claim received",
          "detail": "Rental deposit awaiting refund",
          "ref": "CLM-2026-005",
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
            "ref": "VIN-2026-MAD-VW-11",
            "what": "Vehicle concerned",
            "when": "07/10/2026",
            "system": "Salesforce CRM",
            "status": {
              "status": "evaluate",
              "label": "To evaluate"
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
        "Customer response deadline: 5 working days."
      ],
      "notes": []
    }
  }
});
