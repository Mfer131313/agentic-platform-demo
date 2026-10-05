/* Autopista Multimotor · Operations and Workshop procedure search with citations (English). Demo scenario with synthetic data (MFM). */
agenticPackEn('autopista', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedures',
    title: 'Ask the procedures',
    agent: 'Procedures',
    system: 'Salesforce Knowledge',
    source: 'Salesforce Knowledge · controlled Operations documents',
    indexed_at: '2026-10-05T06:00',
    doc_org: 'Autopista Multimotor · Quality',
    ui: {
      page_title: 'Operations procedure search',
      intro_title: 'Ask about the Madrid hub procedures',
      intro_text: 'Every sentence of the answer cites the document and the section it comes from. If no indexed document covers it, the search says so and does not answer.',
      placeholder: 'Type a question about the Operations procedures',
      context_title: 'Applied to the Madrid hub today',
      permission: 'Operations · Madrid',
      asker_initials: 'OM',
      asker_role: 'Operations Manager',
      route_to: 'Operations Quality'
    },
    report: { title: 'Operations procedure search', code_prefix: 'CON-PROC', filename: 'procedure-search', scope_label: 'Site', scope: 'Madrid · Marqués de Soria (MAD)' },
    presenter: {
      say: [
        'Search of the Operations procedures: the answer comes only from the controlled documents, and every sentence carries its citation to the document and section.',
        'Eight documents are indexed: critical stock, vehicle hold and release, complaints and 8D, workshop coverage, the rental fleet, the Golf ABS module instruction, a Seat Ibiza specification and the warranty matrix. Here they are synthetic; in the pilot, your current ones.'
      ],
      say_empty: 'It helps to train new shift supervisors, to prepare brand audits and to answer customers with the exact reference.',
      say_answered: 'Clicking a citation opens the document with the exact passage highlighted. And the answer is cross-checked with what is happening today: the BMW X3 alert, complaint CLM-2026-001 or the Golf recall.',
      say_none: 'When there is no source it says so and invents nothing: no answer and no citation. If the topic is in a document that is not indexed, it names it (OPE-REC-018) and lets you route the question to Quality.',
      next_empty: 'Click “What should we do if the stock of a model drops below the critical threshold?” and then citation 1 to see the highlighted passage.',
      next_answered: 'Type a question with no source, for example “How often do we run the recall drill?”, and click “Ask”.',
      next_done: 'Move on to the next scene with the right arrow.'
    },

    docs: [
      {
        code: 'OPE-STK-012',
        title: 'Critical stock and vehicle replenishment on the lot',
        short: 'Critical stock and replenishment',
        type: 'Procedure',
        version: '4',
        date: '2026-03-12',
        owner: 'Operations',
        summary: 'Fewer than 3 units available of a model: critical stock alert, units reserved for confirmed orders and urgent replenishment with the brand. With 1 unit or fewer, maximum critical stock.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'Fewer than 3 units available of a model: critical stock alert, units reserved for confirmed orders and urgent replenishment with the brand. With 1 unit or fewer, maximum critical stock.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Define how critical stock is detected, assessed and recorded on the Madrid lot (Marqués de Soria), so that no delivery is promised that cannot be kept.',
            'It applies to the sales stock of BMW, Audi, Volkswagen, Skoda and Seat recorded in Odoo Inventory. It does not apply to the rental fleet, which is governed by OPE-ALQ-034.'
          ] },
          { id: '2', heading: '2. Definitions', list: [
            'Available stock: units on the lot with no reservation or hold, according to Odoo Inventory synchronised with SAP ERP every 15 min.',
            'Critical stock: fewer than 3 units available of a model.',
            'Maximum critical stock: 1 unit or fewer available of a model.',
            'Open order: a sales order confirmed in Salesforce CRM and pending delivery.'
          ] },
          { id: '3', heading: '3. Responsibilities', list: [
            'Sales shift supervisor: assesses the alert, prioritises the open orders and informs the affected customers.',
            'Brand manager: requests urgent replenishment and confirms the receipt date.',
            'Operations Manager: approves urgent replenishment and transfers between lots.'
          ] },
          { id: '4', heading: '4. Alert criterion', text: [
            'If the available stock of a model drops below 3 units, a critical stock alert is raised and the remaining units are reserved for confirmed orders.',
            'If 1 unit or fewer remains, the stock is at maximum critical level: besides the alert, urgent replenishment is requested from the brand and the Operations Manager is informed.',
            'Units of the same model on other lots are not transferred automatically: they are marked “to assess” and the Operations Manager decides the transfer in view of the cost and the open orders.',
            'A drop below 3 units with receipt confirmed in less than 3 days is recorded without urgent replenishment and reviewed in the weekly stock report.'
          ] },
          { id: '5', heading: '5. Impact assessment', text: [
            'Each alert is assessed by model before a delivery date is promised. Urgent replenishment is approved by the Operations Manager.'
          ], list: [
            'Count the open orders of the model in Salesforce CRM and their committed date.',
            'Check in SAP ERP the receipt date confirmed by the brand.',
            'Decide by order: keep the date, offer an alternative unit or renegotiate the delivery with the customer.'
          ] },
          { id: '6', heading: '6. Recording and communication', list: [
            'The Odoo Inventory alert opens the record: model, units available, open orders and expected receipt date.',
            'The reservation is recorded in Odoo Inventory and in SAP ERP with the alert reference (OPE-VEH-015 if there are units on hold).',
            'The Sales shift supervisor is notified through Slack to inform the customers with an open order.',
            'Repeated alerts for the same model are analysed in the monthly procurement review.'
          ] },
          { id: '7', heading: '7. References', refs: true, list: [
            'OPE-VEH-015 · Commercial hold and release of vehicles.',
            'Supply conditions and replenishment lead times agreed with each brand.',
            'Law 7/1998 on general contracting conditions.'
          ] }
        ]
      },
      {
        code: 'OPE-VEH-015',
        title: 'Commercial hold and release of vehicles',
        short: 'Hold and release',
        type: 'Procedure',
        version: '6',
        date: '2026-01-20',
        owner: 'Operations',
        summary: 'Every hold is recorded in Odoo Inventory (vehicle on hold) and in Salesforce CRM (delivery withheld). Only the Operations Manager releases.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'Every hold is recorded in Odoo Inventory (vehicle on hold) and in Salesforce CRM (delivery withheld). Only the Operations Manager releases.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Ensure that no vehicle with a safety or quality deviation leaves the lot without a documented decision. It applies to sales, rental and subscription vehicles at any location of the Madrid hub.'
          ] },
          { id: '2', heading: '2. Responsibilities', list: [
            'Any shift supervisor can propose a hold on detecting a deviation.',
            'The Workshop Manager approves the hold and defines its scope.',
            'Only the Operations Manager (or, by delegation, the Workshop Manager) can release a vehicle on hold.'
          ] },
          { id: '3', heading: '3. Recording the hold', text: [
            'Every hold is recorded at the same time in Odoo Inventory (vehicle with commercial hold) and in Salesforce CRM (delivery withheld and customer notified). Salesforce CRM does not allow the delivery of a vehicle on hold to be scheduled.',
            'The record includes the reason, the scope (VINs and locations), the source reference (alert, complaint or recall campaign) and who approves it.'
          ] },
          { id: '4', heading: '4. Assessment and disposition', text: [
            'Release requires documented evidence: the result of the inspection or repair in iCare Workshop and a signed conclusion. The disposition is recorded in SAP ERP and can be to release, repair or return to the brand.',
            'No vehicle is released by default or because a deadline has passed.'
          ] },
          { id: '5', heading: '5. Partial release', text: [
            'A group of vehicles can be released by VIN when the inspection allows the affected ones to be separated from those that are not. Each released VIN is identified in Odoo Inventory and in Salesforce CRM.'
          ] },
          { id: '6', heading: '6. Vehicle already delivered', text: [
            'If some of the affected units have already been delivered, the Operations Manager assesses the workshop call-in campaign according to OPE-REC-018 (Recall campaigns and customer communication) and informs the customer within the deadline set by that procedure.'
          ] },
          { id: '7', heading: '7. Records', list: [
            'Holds and dispositions: SAP ERP.',
            'Immobilised vehicles and withheld deliveries: Odoo Inventory and Salesforce CRM.',
            'Inspection or repair evidence: iCare Workshop.'
          ] }
        ]
      },
      {
        code: 'OPE-CLI-020',
        title: 'Customer complaints and APR disputes',
        short: 'Complaints and 8D',
        type: 'Procedure',
        version: '5',
        date: '2026-02-09',
        owner: 'Customer care',
        summary: 'Acknowledgement in 24 h, containment in 48 h and 8D report in 5 working days. APR discrepancies of EUR 2,000 or more are critical.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'Acknowledgement in 24 h, containment in 48 h and 8D report in 5 working days. APR discrepancies of EUR 2,000 or more are critical.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Define how a customer complaint about sales, rental, subscription or workshop is received, investigated and answered, with traceability from receipt to closure.'
          ] },
          { id: '2', heading: '2. Deadlines', list: [
            'Acknowledgement to the customer: 24 h from receipt.',
            'Containment: 48 h to identify and hold the complained-about transaction or vehicle (OPE-VEH-015).',
            '8D report: within the deadline agreed with the customer; if none is agreed, 5 working days.'
          ] },
          { id: '3', heading: '3. Severity classification', list: [
            'Critical severity: financial discrepancy of EUR 2,000 or more, or a risk to the safety of people.',
            'High severity: vehicle defect or rental damage of EUR 500 or more.',
            'Medium or low severity: all other cases, resolved by Customer care.'
          ] },
          { id: '4', heading: '4. Investigating an APR dispute', text: [
            'The investigation of an APR dispute reviews, at a minimum:'
          ], list: [
            'The contract signed in DocuSign and the APR stated in it.',
            'The financing offer approved by the lender (Banco Sabadell) and its date.',
            'The invoice and the instalment plan issued from SAP ERP.',
            'The communications sent to the customer and the APR complaints of the last 12 months.'
          ] },
          { id: '5', heading: '5. 8D report', text: [
            'The 8D report is prepared in Salesforce CRM and follows eight steps:'
          ], list: [
            'D1 · Team: Customer care, Finance and the affected business line.',
            'D2 · Problem description with the customer data.',
            'D3 · Containment: transaction or vehicle on hold and customer informed.',
            'D4 · Root cause, confirmed with evidence.',
            'D5 · Corrective actions.',
            'D6 · Implementation and effectiveness check.',
            'D7 · Prevention: changes to procedures, contract templates or training.',
            'D8 · Closure and communication to the customer.'
          ] },
          { id: '6', heading: '6. Reply to the customer', text: [
            'The reply is written in the customer language and approved by the Operations Manager before it is sent.',
            'A cause is communicated as confirmed only when there is evidence; until then it is presented as a hypothesis under investigation.'
          ] },
          { id: '7', heading: '7. Records', list: [
            'Complaint and deadlines: Salesforce CRM.',
            'Amounts, credit notes and corrected invoices: SAP ERP.',
            'Customer documents: DocuSign.'
          ] }
        ]
      },
      {
        code: 'OPE-TAL-031',
        title: 'Workshop capacity and brand technician coverage',
        short: 'Workshop capacity and coverage',
        type: 'Procedure',
        version: '3',
        date: '2026-04-22',
        owner: 'Workshop Manager',
        summary: 'At least 3 technicians available per brand and shift. With effective capacity below 80 %, preventive maintenance is rescheduled; below 60 %, it is escalated.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'At least 3 technicians available per brand and shift. With effective capacity below 80 %, preventive maintenance is rescheduled; below 60 %, it is escalated.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Keep the capacity of the Madrid brand workshop to meet warranty, recall and maintenance work. It applies to the BMW, Audi, Volkswagen, Skoda and Seat teams.'
          ] },
          { id: '2', heading: '2. Technician coverage', text: [
            'The Workshop Manager reviews coverage at the start of each shift in iCare Workshop and records each absence the same day:'
          ], list: [
            'Each brand has at least 3 technicians available per shift.',
            'Technicians on leave or in training do not count as available.',
            'A multi-brand technician can cover a brand only with a valid certification.'
          ] },
          { id: '3', heading: '3. Capacity criterion', text: [
            'Effective capacity is the ratio between the technician hours available and those planned for the shift.',
            'Below 80 %, preventive maintenance is rescheduled and the affected customers are informed; below 60 %, it is escalated to the Operations Manager.'
          ] },
          { id: '4', heading: '4. Action when a technician is absent', text: [
            'The work is reassigned to a certified multi-brand technician and warranty and recall work take priority over preventive maintenance.',
            'Preventive maintenance is rescheduled with a Twilio SMS notice to the customer, with a new appointment within 5 working days at most.',
            'If the brand is left with fewer than 3 technicians, no new preventive maintenance appointments are accepted for that brand until coverage is restored.'
          ] },
          { id: '5', heading: '5. Recording and follow-up', list: [
            'Absences, reassignments and moved appointments: iCare Workshop.',
            'Customer notices: Twilio SMS, copied to Salesforce CRM.',
            'Coverage by brand is reviewed at the weekly workshop meeting.'
          ] },
          { id: '6', heading: '6. Revision history', text: [
            'Rev. 3 (22/04/2026): rescheduling of preventive maintenance is added for when effective capacity drops below 80 %, as an action of incident INC-2025-0388 (workshop without a Skoda technician for two weeks).'
          ] }
        ]
      },
      {
        code: 'OPE-ALQ-034',
        title: 'Rental fleet: handover, return and inspection',
        short: 'Rental fleet',
        type: 'Procedure',
        version: '4',
        date: '2026-05-18',
        owner: 'Rental fleet manager',
        summary: 'Inspection with 360° photos at handover and at return. New damage is charged to the customer up to the excess; with less than 70 % of the fleet available, the backup fleet is activated.',
        sections: [
          { id: '1', heading: '1. Purpose and scope', text: [
            'Set how a vehicle of the rental fleet (about 1,000 units) is handed over, received and inspected, to protect availability and attribute damage with evidence.'
          ] },
          { id: '2', heading: '2. Handover to the customer', list: [
            'Verify the customer identity and driving licence and assign the vehicle in Odoo Inventory.',
            'Handover inspection with 360° photos, fuel level, mileage and lights test, saved in the contract.',
            'Charge the deposit with Stripe Payments before handing over the keys.'
          ] },
          { id: '3', heading: '3. Return and inspection', text: [
            'At every return the inspection is repeated with 360° photos and compared with the handover one. The results are recorded in Odoo Inventory:'
          ], list: [
            'New damage compared with handover, with a photo of each one.',
            'Fuel level and mileage.',
            'Cleanliness and condition of tyres and lights.'
          ] },
          { id: '4', heading: '4. Damage criterion', text: [
            'Any new damage that appears in the photo comparison is charged to the customer, up to the amount of the contracted excess.',
            'If the damage exceeds EUR 500 or the customer disputes it, the charge is held and a complaint is opened according to OPE-CLI-020; the vehicle goes to a workshop assessment before returning to the fleet.'
          ] },
          { id: '5', heading: '5. Fleet availability', text: [
            'If the available fleet drops below 70 % of the total, the Rental fleet manager activates the backup fleet and notifies the Operations Manager.',
            'The target utilisation is 70 % or more; occupancy is reviewed every morning in Odoo Inventory.'
          ] },
          { id: '6', heading: '6. Records', list: [
            'Contract, photos and inspections: Odoo Inventory.',
            'Deposit and damage charges: Stripe Payments and SAP ERP.',
            'Damage complaints: Salesforce CRM.'
          ] }
        ]
      },
      {
        code: 'IT-TAL-VW-02',
        title: 'ABS module replacement on Volkswagen Golf (campaign REC-VW-2026-001)',
        short: 'Golf ABS module',
        type: 'Technical instruction',
        version: '3',
        date: '2026-09-02',
        owner: 'Workshop Manager',
        summary: 'Golf units in the campaign are held from delivery, the ABS module is replaced in the workshop and braking is verified on the test bench before release. Weekly compliance follow-up.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'Golf units in the campaign are held from delivery, the ABS module is replaced in the workshop and braking is verified on the test bench before release. Weekly compliance follow-up.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Carry out campaign REC-VW-2026-001 (potential ABS module failure). It applies to the Volkswagen Golf and Passat on the lot, in the rental fleet and in subscription: 47 units identified, compliance deadline 15/11/2026.'
          ] },
          { id: '2', heading: '2. Identification and follow-up', text: [
            'Every Monday the Workshop Manager matches the campaign VINs against iCare Workshop and updates compliance:'
          ], list: [
            'Pending VINs, with their location (lot, rental or subscription).',
            'Workshop appointments already scheduled and the expected spare-part date.',
            'Units on hold and deliveries withheld because of the campaign.'
          ] },
          { id: '3', heading: '3. Priority criterion', text: [
            'Priority goes, in this order, to rental units in circulation, subscription units and lot units with a committed delivery.',
            'A Golf with a customer at the wheel or with a scheduled delivery is never handed over without the replacement done.'
          ] },
          { id: '4', heading: '4. Action on an affected unit', text: [
            'The vehicle is put on hold (OPE-VEH-015) and a work order is opened in iCare Workshop with the module replacement scheduled, informing the business line the same day.',
            'Until the replacement, the rental or subscription vehicle does not go out to a new customer; the customer who has it receives a replacement vehicle.',
            'If the module shows an active fault, the vehicle is not driven and is towed to the workshop.'
          ] },
          { id: '5', heading: '5. Replacement and verification', text: [
            'After changing the module, braking is verified on the test bench with 3 correct ABS cycles. The result is recorded in the work order before closing it and releasing the vehicle.'
          ] },
          { id: '6', heading: '6. Revision history', text: [
            'Rev. 3 (02/09/2026): weekly follow-up of pending VINs and the priority of rental units in circulation are added, as an action of campaign REC-VW-2026-001.'
          ] }
        ]
      },
      {
        code: 'FT-SEAT-IBZ-26',
        title: 'Handover specification · Seat Ibiza 1.0 TSI 95 hp (2026)',
        short: 'Specification · Seat Ibiza 1.0 TSI',
        type: 'Specification sheet',
        version: '2',
        date: '2026-03-03',
        owner: 'Seat brand manager',
        summary: 'Seat Ibiza 1.0 TSI 95 hp: 24-month brand warranty, service every 15,000 km or 12 months, handover with full documentation and an internal VIN code in the format VIN-year-site-brand-number.',
        sections: [
          { id: '1', heading: '1. Product', text: [
            'Seat Ibiza 1.0 TSI 95 hp, 5-speed manual gearbox, Style trim. Sold new at the Madrid hub and also offered on a 6-month subscription.'
          ] },
          { id: '2', heading: '2. Warranty and cover', text: [
            'Brand warranty of 24 months with no mileage limit from the delivery date. The battery and consumables have a 12-month warranty.',
            'The warranty is subject to servicing at an authorised brand workshop.'
          ] },
          { id: '3', heading: '3. Specification', list: [
            'Engine: 1.0 TSI 95 hp, petrol.',
            'Approved combined consumption: 5.3 l/100 km.',
            'Emissions: 120 g/km CO2, environmental label C.',
            'Boot capacity: 355 litres.'
          ] },
          { id: '4', heading: '4. Servicing and maintenance', text: [
            'Service every 15,000 km or 12 months, whichever comes first. The first ITV inspection is due 4 years after registration.',
            'On subscription, servicing and tyres are included in the fee and are managed by the hub workshop.'
          ] },
          { id: '5', heading: '5. Preparation and handover documents', list: [
            '40-point pre-delivery inspection and full clean.',
            'Documents handed over: registration certificate, technical data sheet, manual, service book and contract signed in DocuSign.',
            'Registration handled by the hub within 5 to 10 days after signing.'
          ] },
          { id: '6', heading: '6. Standard equipment', list: [
            '8-inch screen with Apple CarPlay and Android Auto.',
            'Lane keeping assist and emergency braking.',
            'Remote key with two sets of keys.'
          ] },
          { id: '7', heading: '7. Internal VIN code', text: [
            'Format VIN-<year>-<site>-<brand>-<no.>. Example: VIN-2026-MAD-SEAT-03 is unit 03 of Seat registered in Madrid in 2026 (arrived on the lot on 22/09/2026).'
          ] }
        ]
      },
      {
        code: 'MAT-GAR-APM',
        title: 'Warranty and included services matrix by business line',
        short: 'Warranty matrix',
        type: 'Matrix',
        version: '9',
        date: '2026-06-30',
        owner: 'Customer care',
        summary: 'Summarises what each Madrid hub line covers: new sales, used sales, rental, 6-month subscription and workshop. Any change of cover requires prior review by Finance and Customer care.',
        sections: [
          { id: '1', heading: '1. Scope', text: [
            'Records, by business line, the warranty and the services included at the Madrid hub. It is reviewed with each change of offer, insurance or brand conditions.'
          ] },
          { id: '2', heading: '2. General situation', text: [
            'All lines have 24 h roadside assistance cover through Autopista Multimotor.',
            'The conditions of each contract prevail over this matrix; the matrix summarises the standard conditions in force.'
          ] },
          { id: '3', heading: '3. Matrix by business line', list: [
            'New sales · 24-month brand warranty · servicing at an authorised workshop · optional financing with Banco Sabadell.',
            'Used sales · 12-month warranty · 80-point prior inspection · optional financing.',
            'Rental · third-party insurance included · damage excess as per contract · 24 h assistance.',
            '6-month subscription · maintenance, fully comprehensive insurance and assistance included · monthly fee with no down payment · maximum commitment of 6 months.',
            'Workshop · repair warranty of 12 months or 20,000 km · replacement vehicle on warranty repairs.'
          ] },
          { id: '4', heading: '4. Change control', text: [
            'Any change of cover, insurance or supplier requires prior review by Finance and Customer care, and an update of this matrix before it is offered.',
            'No verbal cover is promised that is not in the contract signed in DocuSign.'
          ] }
        ]
      }
    ],

    unindexed: {
      'OPE-REC-018': { title: 'Recall campaigns and customer communication', mentionedIn: { doc: 'OPE-VEH-015', sec: '6', quote: 'according to OPE-REC-018 (Recall campaigns and customer communication)' } }
    },

    suggested: ['stock', 'liberar', 'plazos', 'devolucion', 'recall', 'cobertura'],

    intents: [
      {
        id: 'stock', icon: 'package', topic: 'Critical stock · alert and replenishment', scope: 'local',
        q: 'What should we do if the stock of a model drops below the critical threshold?',
        anchors: ['stock', 'inventory', 'threshold', 'replenishment', 'replenish', 'bmw x3'],
        terms: ['drops', 'drop', 'falls', 'critical', 'units', 'model', 'alert', 'reserve', 'reserved', 'act', 'sold out', 'left', 'lot', 'order', 'orders', 'below'],
        min: 3,
        blocks: [
          { t: 'If the available stock of a model drops below 3 units, a critical stock alert is raised and the remaining units are reserved for confirmed orders.', c: [['OPE-STK-012', 4, 'If the available stock of a model drops below 3 units, a critical stock alert is raised']] },
          { t: 'If 1 unit or fewer remains, it is maximum critical: urgent replenishment is also requested from the brand and the Operations Manager is informed.', c: [['OPE-STK-012', 4, 'If 1 unit or fewer remains, the stock is at maximum critical level']] },
          { t: 'The reservation is recorded in both Odoo Inventory and SAP ERP with the alert reference.', c: [['OPE-STK-012', 6, 'The reservation is recorded in Odoo Inventory and in SAP ERP with the alert reference']] },
          { t: 'Each alert is assessed by model before a delivery date is promised: open orders, receipt date from the brand and a decision per order.', c: [['OPE-STK-012', 5, 'Each alert is assessed by model before a delivery date is promised.']] },
          { t: 'The Sales shift supervisor is notified through Slack to inform the customers with an open order.', c: [['OPE-STK-012', 6, 'The Sales shift supervisor is notified through Slack to inform the customers with an open order.']] }
        ],
        context: {
          systems: ['Odoo Inventory', 'SAP ERP'],
          text: 'Alert ALM-AMS-0730 today: BMW X3 20d with 1 unit available (threshold 3) and receipt expected on 14/10/2026. Under section 4 it is maximum critical stock: reserve the unit, urgent replenishment from BMW and a notice to Operations.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Open alarm ALM-AMS-0730'
        },
        followups: ['liberar', 'reasignar']
      },
      {
        id: 'reasignar', icon: 'layers', topic: 'Critical stock · transfer between lots', scope: 'local',
        q: 'Do we have to transfer units of the same model that are on other lots?',
        anchors: ['other lots', 'transfer', 'transfers', 'same model', 'other lot', 'reassign'],
        terms: ['units', 'model', 'lots', 'stock', 'assess', 'transferred', 'automatic', 'automatically'],
        min: 3,
        blocks: [
          { t: 'Not automatically: they are marked “to assess” and the Operations Manager decides the transfer in view of the cost and the open orders.', c: [['OPE-STK-012', 4, 'they are marked “to assess” and the Operations Manager decides the transfer in view of the cost and the open orders']] },
          { t: 'A drop with receipt confirmed in less than 3 days is recorded without urgent replenishment.', c: [['OPE-STK-012', 4, 'with receipt confirmed in less than 3 days is recorded without urgent replenishment']] }
        ],
        context: {
          systems: ['Odoo Inventory'],
          text: 'Odoo Inventory shows no other BMW X3 20d unit on the group lots. The BMW X5 40d (8 units in Madrid) stays “to assess” as an alternative for the waiting customer.',
          go: 'alarma', goLabel: 'Open alarm ALM-AMS-0730'
        },
        followups: ['stock', 'impacto']
      },
      {
        id: 'responsables', icon: 'users', topic: 'Critical stock · responsibilities', scope: 'local',
        q: 'Who does what when a critical stock alert is raised?',
        anchors: ['responsible', 'responsibility', 'responsibilities', 'brand manager', 'sales shift supervisor', 'who does what'],
        terms: ['stock', 'critical', 'alert', 'who', 'does', 'decides', 'approves', 'replenishment'],
        min: 4,
        blocks: [
          { intro: { t: 'Allocation of responsibilities when a critical stock alert is raised:' }, list: [
            { t: 'Sales shift supervisor: assesses the alert, prioritises the open orders and informs the affected customers.', c: [['OPE-STK-012', 3, 'Sales shift supervisor: assesses the alert, prioritises the open orders and informs the affected customers.']] },
            { t: 'Brand manager: requests urgent replenishment and confirms the receipt date.', c: [['OPE-STK-012', 3, 'Brand manager: requests urgent replenishment and confirms the receipt date.']] },
            { t: 'Operations Manager: approves urgent replenishment and transfers between lots.', c: [['OPE-STK-012', 3, 'Operations Manager: approves urgent replenishment and transfers between lots.']] }
          ] },
          { t: 'If 1 unit or fewer remains, the Operations Manager is also informed.', c: [['OPE-STK-012', 4, 'the Operations Manager is informed']] }
        ],
        context: {
          systems: ['Salesforce CRM', 'Slack'],
          text: 'In the alert today, the BMW Brand manager has to confirm the receipt of 14/10/2026 and the Sales shift supervisor must inform the waiting customer for the BMW X3 20d.',
          go: 'alarma', goLabel: 'Open alarm ALM-AMS-0730'
        },
        followups: ['stock', 'liberar']
      },
      {
        id: 'impacto', icon: 'clipboard-check', topic: 'Critical stock · impact on orders', scope: 'local',
        q: 'How is the impact of a critical stock on open orders assessed?',
        anchors: ['impact', 'assessed', 'assess', 'assessment', 'open orders', 'committed date'],
        terms: ['stock', 'critical', 'order', 'orders', 'delivery', 'customer', 'date', 'alternative', 'renegotiate'],
        min: 3,
        blocks: [
          { intro: { t: 'The assessment is done by model and before a date is promised:', c: [['OPE-STK-012', 5, 'Each alert is assessed by model before a delivery date is promised.']] }, list: [
            { t: 'Count the open orders of the model in Salesforce CRM and their committed date.', c: [['OPE-STK-012', 5, 'Count the open orders of the model in Salesforce CRM and their committed date.']] },
            { t: 'Check in SAP ERP the receipt date confirmed by the brand.', c: [['OPE-STK-012', 5, 'Check in SAP ERP the receipt date confirmed by the brand.']] },
            { t: 'Decide by order: keep the date, offer an alternative unit or renegotiate the delivery.', c: [['OPE-STK-012', 5, 'Decide by order: keep the date, offer an alternative unit or renegotiate the delivery with the customer.']] }
          ] },
          { t: 'Urgent replenishment is approved by the Operations Manager.', c: [['OPE-STK-012', 5, 'Urgent replenishment is approved by the Operations Manager.']] }
        ],
        followups: ['stock', 'reasignar']
      },
      {
        id: 'liberar', icon: 'unlock', topic: 'Vehicle hold and release', scope: 'local',
        q: 'Who can release a vehicle on hold?',
        anchors: ['release', 'released', 'releases', 'unblock', 'lift the hold', 'disposition'],
        terms: ['who', 'vehicle', 'car', 'hold', 'blocked', 'withheld', 'retention', 'signs', 'authorises', 'can'],
        min: 3,
        blocks: [
          { t: 'Only the Operations Manager or, by delegation, the Workshop Manager.', c: [['OPE-VEH-015', 2, 'Only the Operations Manager (or, by delegation, the Workshop Manager) can release a vehicle on hold.']] },
          { t: 'Release requires documented evidence (the result of the inspection or repair in iCare Workshop and a signed conclusion) and is recorded as a disposition in SAP ERP: release, repair or return to the brand.', c: [['OPE-VEH-015', 4, 'Release requires documented evidence: the result of the inspection or repair in iCare Workshop and a signed conclusion.'], ['OPE-VEH-015', 4, 'can be to release, repair or return to the brand']] },
          { t: 'No vehicle is released by default or because a deadline has passed.', c: [['OPE-VEH-015', 4, 'No vehicle is released by default or because a deadline has passed.']] },
          { t: 'If the inspection allows it, release can be done by VIN.', c: [['OPE-VEH-015', 5, 'A group of vehicles can be released by VIN']] }
        ],
        followups: ['registro', 'entregado']
      },
      {
        id: 'bloqueo-quien', icon: 'user-check', topic: 'Commercial hold · who decides', scope: 'local',
        q: 'Who decides a commercial hold on a vehicle?',
        anchors: ['hold', 'block', 'blocks', 'retention', 'withhold'],
        terms: ['who', 'decides', 'approves', 'authorises', 'proposes', 'responsible', 'signs', 'commercial'],
        min: 4,
        blocks: [
          { t: 'Any shift supervisor can propose a hold on detecting a deviation.', c: [['OPE-VEH-015', 2, 'Any shift supervisor can propose a hold on detecting a deviation.']] },
          { t: 'The Workshop Manager approves it and also defines its scope.', c: [['OPE-VEH-015', 2, 'The Workshop Manager approves the hold and defines its scope.']] },
          { t: 'Releasing, on the other hand, can only be done by the Operations Manager or, by delegation, the Workshop Manager.', c: [['OPE-VEH-015', 2, 'Only the Operations Manager (or, by delegation, the Workshop Manager) can release a vehicle on hold.']] }
        ],
        followups: ['liberar', 'registro']
      },
      {
        id: 'registro', icon: 'lock', topic: 'Hold and release · recording', scope: 'local',
        q: 'Where is a commercial hold recorded?',
        anchors: ['recorded', 'record', 'recording', 'odoo', 'immobilise', 'immobilised'],
        terms: ['hold', 'block', 'blocked', 'commercial', 'vehicle', 'vin', 'where'],
        min: 3,
        blocks: [
          { t: 'At the same time in Odoo Inventory (vehicle with commercial hold) and in Salesforce CRM (delivery withheld and customer notified).', c: [['OPE-VEH-015', 3, 'Every hold is recorded at the same time in Odoo Inventory (vehicle with commercial hold) and in Salesforce CRM (delivery withheld and customer notified).']] },
          { t: 'Salesforce CRM does not allow the delivery of a vehicle on hold to be scheduled.', c: [['OPE-VEH-015', 3, 'Salesforce CRM does not allow the delivery of a vehicle on hold to be scheduled.']] },
          { t: 'The record includes the reason, the scope (VINs and locations), the source reference and who approves it.', c: [['OPE-VEH-015', 3, 'The record includes the reason, the scope (VINs and locations), the source reference (alert, complaint or recall campaign) and who approves it.']] }
        ],
        followups: ['liberar']
      },
      {
        id: 'entregado', icon: 'truck', topic: 'Vehicle already delivered', scope: 'local', kind: 'partial',
        q: 'What do we do if the affected vehicle has already been delivered to the customer?',
        anchors: ['=delivered', 'already delivered', 'already left', 'at the customer', 'with the customer'],
        terms: ['vehicle', 'car', 'affected', 'hold', 'units', 'customer', 'recall'],
        min: 2,
        blocks: [
          { t: 'If some of the units have already been delivered, the Operations Manager assesses the workshop call-in campaign according to OPE-REC-018 and informs the customer.', c: [['OPE-VEH-015', 6, 'the Operations Manager assesses the workshop call-in campaign according to OPE-REC-018 (Recall campaigns and customer communication)']] }
        ],
        note: 'OPE-REC-018 (Recall campaigns and customer communication) is not among the indexed documents: the campaign steps cannot be detailed from this search.',
        followups: ['liberar']
      },
      {
        id: 'plazos', icon: 'mail', topic: 'Customer complaints · deadlines', scope: 'all',
        q: 'What deadlines do we have to reply to a customer complaint?',
        anchors: ['complaint', 'complaints', 'claim', 'claims', '8d'],
        terms: ['deadline', 'deadlines', 'time', 'reply', 'respond', 'answer', 'acknowledge', 'acknowledgement', 'days', 'hours', 'when', 'send', 'deliver', 'limit', 'due', 'handle', 'handling', 'process', 'procedure', 'manage'],
        min: 3,
        blocks: [
          { intro: { t: 'Deadlines of the complaints procedure:' }, list: [
            { t: 'Acknowledgement to the customer within 24 h of receipt.', c: [['OPE-CLI-020', 2, 'Acknowledgement to the customer: 24 h from receipt.']] },
            { t: 'Containment within 48 h: identify and hold the complained-about transaction or vehicle.', c: [['OPE-CLI-020', 2, 'Containment: 48 h to identify and hold the complained-about transaction or vehicle']] },
            { t: '8D report within the deadline agreed with the customer; if none is agreed, 5 working days.', c: [['OPE-CLI-020', 2, '8D report: within the deadline agreed with the customer; if none is agreed, 5 working days.']] }
          ] },
          { t: 'The reply is written in the customer language and approved by the Operations Manager before it is sent.', c: [['OPE-CLI-020', 6, 'The reply is written in the customer language and approved by the Operations Manager before it is sent.']] }
        ],
        context: {
          systems: ['Salesforce CRM'],
          text: 'Complaint CLM-2026-001 (José María López, BMW X3), opened on 01/10/2026: the contract APR is 3.99 % and the invoice shows 4.25 %. The 24 h acknowledgement has been sent and the 8D report is due on 08/10/2026 (5 working days).',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open complaint CLM-2026-001'
        },
        followups: ['tae', '8d']
      },
      {
        id: '8d', icon: 'list-checks', topic: 'Complaints · 8D report', scope: 'all',
        q: 'What must an 8D report include?',
        anchors: ['8d', 'eight disciplines', 'd1', 'd4', 'd8'],
        terms: ['report', 'include', 'includes', 'steps', 'content', 'structure', 'sections', 'disciplines', 'parts', 'template'],
        min: 2,
        blocks: [
          { intro: { t: 'The 8D report is prepared in Salesforce CRM and follows eight steps:', c: [['OPE-CLI-020', 5, 'The 8D report is prepared in Salesforce CRM and follows eight steps:']] }, list: [
            { t: 'D1 · Team: Customer care, Finance and the affected business line.' },
            { t: 'D2 · Problem description with the customer data.' },
            { t: 'D3 · Containment: transaction or vehicle on hold and customer informed.' },
            { t: 'D4 · Root cause, confirmed with evidence.' },
            { t: 'D5 · Corrective actions.' },
            { t: 'D6 · Implementation and effectiveness check.' },
            { t: 'D7 · Prevention: changes to procedures, contract templates or training.' },
            { t: 'D8 · Closure and communication to the customer.' }
          ] },
          { t: 'A cause is communicated as confirmed only when there is evidence; until then it is presented as a hypothesis under investigation.', c: [['OPE-CLI-020', 6, 'A cause is communicated as confirmed only when there is evidence; until then it is presented as a hypothesis under investigation.']] }
        ],
        followups: ['plazos', 'tae']
      },
      {
        id: 'tae', icon: 'search', topic: 'Complaints · APR disputes', scope: 'all',
        q: 'How is an APR dispute on a financing agreement investigated?',
        anchors: ['apr', 'interest rate', 'interest', 'financing', 'finance', 'instalment', 'instalments', 'overcharge'],
        terms: ['complaint', 'complaints', 'dispute', 'investigate', 'investigated', 'investigation', 'severity', 'classified', 'customer', 'bank', 'invoice', 'contract'],
        min: 3,
        blocks: [
          { t: 'It is of critical severity: a financial discrepancy of EUR 2,000 or more, even if the customer has not paid yet.', c: [['OPE-CLI-020', 3, 'Critical severity: financial discrepancy of EUR 2,000 or more']] },
          { intro: { t: 'The investigation reviews, at a minimum:', c: [['OPE-CLI-020', 4, 'The investigation of an APR dispute reviews, at a minimum:']] }, list: [
            { t: 'The contract signed in DocuSign and the APR stated in it.', c: [['OPE-CLI-020', 4, 'The contract signed in DocuSign and the APR stated in it.']] },
            { t: 'The financing offer approved by the lender and its date.', c: [['OPE-CLI-020', 4, 'The financing offer approved by the lender (Banco Sabadell) and its date.']] },
            { t: 'The invoice and the instalment plan issued from SAP ERP.', c: [['OPE-CLI-020', 4, 'The invoice and the instalment plan issued from SAP ERP.']] },
            { t: 'The communications sent to the customer and the APR complaints of the last 12 months.', c: [['OPE-CLI-020', 4, 'The communications sent to the customer and the APR complaints of the last 12 months.']] }
          ] },
          { t: 'In the reply to the customer, the cause is presented as a hypothesis until there is evidence.', c: [['OPE-CLI-020', 6, 'A cause is communicated as confirmed only when there is evidence']] }
        ],
        context: {
          systems: ['Salesforce CRM', 'SAP ERP', 'DocuSign'],
          text: 'CLM-2026-001: the contract of José María López, signed in DocuSign, states an APR of 3.99 % with Banco Sabadell, but the SAP ERP invoice applies 4.25 %: EUR 2,400 of overcharge in the instalment plan. It is of critical severity under section 3.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open complaint CLM-2026-001'
        },
        followups: ['plazos', '8d']
      },
      {
        id: 'devolucion', icon: 'shield-check', topic: 'Rental fleet · return and inspection', scope: 'local',
        q: 'What inspection is done on a rental car at return and what happens if there is damage?',
        anchors: ['return', 'returned', 'returns', 'inspection', 'inspect', 'excess', 'damage', 'scratch', 'rental'],
        terms: ['car', 'vehicle', 'photos', 'customer', 'charge', 'assessment', 'charged', 'comparison', 'fuel'],
        min: 2,
        blocks: [
          { t: 'At every return the inspection is repeated with 360° photos and compared with the handover one: new damage, fuel, mileage, cleanliness and condition of tyres and lights.', c: [['OPE-ALQ-034', 3, 'At every return the inspection is repeated with 360° photos and compared with the handover one.']] },
          { t: 'Any new damage that appears in the photo comparison is charged to the customer, up to the amount of the contracted excess.', c: [['OPE-ALQ-034', 4, 'Any new damage that appears in the photo comparison is charged to the customer, up to the amount of the contracted excess.']] },
          { t: 'If the damage exceeds EUR 500 or the customer disputes it, the charge is held and a complaint is opened; the vehicle goes to a workshop assessment before returning to the fleet.', c: [['OPE-ALQ-034', 4, 'If the damage exceeds EUR 500 or the customer disputes it, the charge is held']] },
          { t: 'The results are recorded in Odoo Inventory, with the charges in Stripe Payments and SAP ERP.', c: [['OPE-ALQ-034', 6, 'Deposit and damage charges: Stripe Payments and SAP ERP.']] }
        ],
        context: {
          systems: ['Odoo Inventory', 'Stripe Payments'],
          text: 'CLM-2026-003: rental Volkswagen Golf with a scratch on the side door (EUR 800). The customer denies causing it and the assessment is pending; under section 4 the charge is held until the photo comparison is available.',
          go: 'reclamacion', goLabel: 'Open complaints'
        },
        followups: ['flota', 'plazos']
      },
      {
        id: 'flota', icon: 'car', topic: 'Rental fleet · availability', scope: 'local',
        q: 'What should we do if the available rental fleet drops below 70 %?',
        anchors: ['fleet', 'fleets', 'availability', 'utilisation', 'occupancy', 'backup'],
        terms: ['rental', 'drops', 'available', 'percentage', 'activate', 'threshold', 'do', 'cars', 'vehicles'],
        min: 3,
        blocks: [
          { t: 'If the available fleet drops below 70 % of the total, the Rental fleet manager activates the backup fleet and notifies the Operations Manager.', c: [['OPE-ALQ-034', 5, 'If the available fleet drops below 70 % of the total, the Rental fleet manager activates the backup fleet and notifies the Operations Manager.']] },
          { t: 'The target utilisation is 70 % or more and occupancy is reviewed every morning in Odoo Inventory.', c: [['OPE-ALQ-034', 5, 'The target utilisation is 70 % or more; occupancy is reviewed every morning in Odoo Inventory.']] }
        ],
        context: {
          systems: ['Odoo Inventory'],
          text: 'Today 847 of 1,000 vehicles are available (84.7 %) with a utilisation of 75.3 %: above 70 %, the backup fleet does not need to be activated. With 47 Golf units in the ABS recall, availability is watched daily.',
          go: 'turno', goLabel: 'View daily brief'
        },
        followups: ['devolucion', 'recall']
      },
      {
        id: 'taller-carga', icon: 'gauge', topic: 'Workshop · effective capacity', scope: 'local',
        q: 'What should we do if the effective workshop capacity falls below 80 %?',
        anchors: ['capacity', 'load', 'saturated', 'saturation', 'preventive', 'preventive maintenance'],
        terms: ['workshop', 'effective', 'drops', 'falls', 'reschedule', 'reschedules', 'appointments', 'do', 'escalate', 'hours'],
        min: 3,
        blocks: [
          { t: 'Below 80 %, preventive maintenance is rescheduled and the affected customers are informed.', c: [['OPE-TAL-031', 3, 'Below 80 %, preventive maintenance is rescheduled and the affected customers are informed']] },
          { t: 'Below 60 %, it is escalated to the Operations Manager.', c: [['OPE-TAL-031', 3, 'below 60 %, it is escalated to the Operations Manager']] },
          { t: 'Effective capacity is the ratio between the technician hours available and those planned for the shift.', c: [['OPE-TAL-031', 3, 'Effective capacity is the ratio between the technician hours available and those planned for the shift.']] }
        ],
        context: {
          systems: ['iCare Workshop'],
          text: 'Today the workshop runs at 70 % effective capacity because a Volkswagen technician is on medical leave: 23 orders in the queue and 15 scheduled maintenance jobs. Under section 3, preventive work must be rescheduled and the customers notified.',
          go: 'alarma', goLabel: 'Open alarm ALM-AMS-0730'
        },
        followups: ['tecnico', 'cobertura']
      },
      {
        id: 'tecnico', icon: 'wrench', topic: 'Workshop · absent brand technician', scope: 'all',
        q: 'What should we do if a brand technician is missing in the workshop?',
        anchors: ['technician', 'technicians', 'mechanic', 'mechanics', 'absence', 'medical leave', 'multi-brand'],
        terms: ['missing', 'absent', 'brand', 'workshop', 'volkswagen', 'vw', 'cover', 'reassign', 'leave', 'do', 'appointments'],
        min: 2,
        blocks: [
          { t: 'The work is reassigned to a certified multi-brand technician and warranty and recall work take priority over preventive maintenance.', c: [['OPE-TAL-031', 4, 'The work is reassigned to a certified multi-brand technician and warranty and recall work take priority over preventive maintenance.']] },
          { t: 'Preventive maintenance is rescheduled with a Twilio SMS notice to the customer, with a new appointment within 5 working days at most.', c: [['OPE-TAL-031', 4, 'Preventive maintenance is rescheduled with a Twilio SMS notice to the customer, with a new appointment within 5 working days at most.']] },
          { t: 'If the brand is left with fewer than 3 technicians, no new preventive appointments are accepted for that brand until coverage is restored.', c: [['OPE-TAL-031', 4, 'If the brand is left with fewer than 3 technicians, no new preventive maintenance appointments are accepted for that brand until coverage is restored.']] }
        ],
        context: {
          systems: ['iCare Workshop', 'Twilio SMS'],
          text: 'Since 06:00 a Volkswagen technician is missing on medical leave. Workshop capacity is down 30 % and there is VW preventive maintenance to reschedule, with priority for the Golf recall (REC-VW-2026-001).',
          go: 'alarma', goLabel: 'Open alarm ALM-AMS-0730'
        },
        followups: ['cobertura', 'recall']
      },
      {
        id: 'cobertura', icon: 'users', topic: 'Workshop · technician coverage', scope: 'all',
        q: 'How often is the technician coverage of each brand reviewed?',
        anchors: ['coverage', 'available technicians', 'minimum technicians', 'icare'],
        terms: ['how often', 'frequency', 'shift', 'reviewed', 'review', 'brand', 'minimum', 'technicians', 'workshop'],
        min: 3,
        blocks: [
          { intro: { t: 'The Workshop Manager reviews coverage at the start of each shift in iCare Workshop and records each absence the same day. Rules:', c: [['OPE-TAL-031', 2, 'The Workshop Manager reviews coverage at the start of each shift in iCare Workshop and records each absence the same day:']] }, list: [
            { t: 'Each brand has at least 3 technicians available per shift.', c: [['OPE-TAL-031', 2, 'Each brand has at least 3 technicians available per shift.']] },
            { t: 'Technicians on leave or in training do not count as available.' },
            { t: 'A multi-brand technician covers a brand only with a valid certification.' }
          ] },
          { t: 'Coverage by brand is also reviewed at the weekly workshop meeting.', c: [['OPE-TAL-031', 5, 'Coverage by brand is reviewed at the weekly workshop meeting.']] }
        ],
        followups: ['tecnico']
      },
      {
        id: 'recall', icon: 'alert-triangle', topic: 'Recall · Golf with ABS module', scope: 'all',
        q: 'What should we do with a Volkswagen Golf affected by the ABS module recall?',
        anchors: ['recall', 'abs', 'abs module', 'campaign', 'golf', 'rec-vw-2026-001'],
        terms: ['affected', 'volkswagen', 'vw', 'module', 'replace', 'replacement', 'change', 'do', 'work order', 'hold', 'deliver'],
        min: 2,
        blocks: [
          { t: 'The vehicle is put on hold and a work order is opened in iCare Workshop with the module replacement scheduled, informing the business line the same day.', c: [['IT-TAL-VW-02', 4, 'The vehicle is put on hold (OPE-VEH-015) and a work order is opened in iCare Workshop with the module replacement scheduled, informing the business line the same day.']] },
          { t: 'Until the replacement, the rental or subscription vehicle does not go out to a new customer; the customer who has it receives a replacement vehicle.', c: [['IT-TAL-VW-02', 4, 'Until the replacement, the rental or subscription vehicle does not go out to a new customer']] },
          { t: 'If the module shows an active fault, the vehicle is not driven and is towed to the workshop.', c: [['IT-TAL-VW-02', 4, 'If the module shows an active fault, the vehicle is not driven and is towed to the workshop.']] },
          { t: 'After the change, braking is verified on the test bench with 3 correct ABS cycles before release.', c: [['IT-TAL-VW-02', 5, 'After changing the module, braking is verified on the test bench with 3 correct ABS cycles.']] }
        ],
        context: {
          systems: ['iCare Workshop', 'Odoo Inventory'],
          text: 'REC-VW-2026-001: 47 Golf and Passat units affected, 35 pending (25.5 % compliance) with a deadline of 15/11/2026. With the VW technician on leave, the replacement pace is at risk.',
          outcome: 'retirada',
          go: 'retirada', goLabel: 'Open campaign REC-VW-2026-001'
        },
        followups: ['recall-seguimiento', 'tecnico']
      },
      {
        id: 'recall-seguimiento', icon: 'wrench', topic: 'Recall · campaign follow-up', scope: 'all',
        q: 'How often is the progress of the Golf recall campaign reviewed?',
        anchors: ['follow-up', 'progress', 'compliance', 'pending vins', 'monday'],
        terms: ['how often', 'frequency', 'weekly', 'week', 'recall', 'campaign', 'golf', 'reviewed', 'review', 'priority'],
        min: 3,
        blocks: [
          { intro: { t: 'Every Monday the Workshop Manager matches the campaign VINs against iCare Workshop and updates compliance. The review covers:', c: [['IT-TAL-VW-02', 2, 'Every Monday the Workshop Manager matches the campaign VINs against iCare Workshop and updates compliance:']] }, list: [
            { t: 'Pending VINs, with their location (lot, rental or subscription).' },
            { t: 'Scheduled workshop appointments and the expected spare-part date.' },
            { t: 'Units on hold and deliveries withheld because of the campaign.' }
          ] },
          { t: 'Priority goes to rental units in circulation, subscription units and lot units with a committed delivery, in that order.', c: [['IT-TAL-VW-02', 3, 'Priority goes, in this order, to rental units in circulation, subscription units and lot units with a committed delivery.']] }
        ],
        followups: ['recall']
      },
      {
        id: 'ficha', icon: 'file-text', topic: 'Specification · Seat Ibiza 1.0 TSI', scope: 'local',
        q: 'What warranty does the Seat Ibiza specification sheet include?',
        anchors: ['specification', 'specification sheet', 'data sheet', 'warranty', 'warranties', 'seat ibiza', 'ibiza'],
        terms: ['seat', 'cover', 'includes', 'months', 'battery', 'consumption', 'boot', 'technical', 'engine'],
        min: 2,
        blocks: [
          { intro: { t: 'The Seat Ibiza 1.0 TSI 95 hp specification sheet (FT-SEAT-IBZ-26) sets, among other things:', c: [['FT-SEAT-IBZ-26', 1, 'Seat Ibiza 1.0 TSI 95 hp, 5-speed manual gearbox, Style trim.']] }, list: [
            { t: 'A 24-month brand warranty with no mileage limit from delivery.', c: [['FT-SEAT-IBZ-26', 2, 'Brand warranty of 24 months with no mileage limit from the delivery date.']] },
            { t: 'A 12-month warranty on the battery and consumables.', c: [['FT-SEAT-IBZ-26', 2, 'The battery and consumables have a 12-month warranty.']] },
            { t: 'Approved combined consumption of 5.3 l/100 km.', c: [['FT-SEAT-IBZ-26', 3, 'Approved combined consumption: 5.3 l/100 km.']] },
            { t: 'Emissions of 120 g/km CO2 and environmental label C.', c: [['FT-SEAT-IBZ-26', 3, 'Emissions: 120 g/km CO2, environmental label C.']] },
            { t: 'A boot capacity of 355 litres.', c: [['FT-SEAT-IBZ-26', 3, 'Boot capacity: 355 litres.']] }
          ] }
        ],
        context: {
          systems: ['Salesforce CRM'],
          text: 'VIN-2026-MAD-SEAT-03 is a Seat Ibiza 1.0 TSI on the lot, with delivery in progress: the 24-month warranty counts from the delivery date to the customer, not from registration.',
          go: 'trace', goLabel: 'View the vehicle trace'
        },
        followups: ['revisiones', 'vin']
      },
      {
        id: 'revisiones', icon: 'calendar', topic: 'Specification · servicing and ITV', scope: 'local',
        q: 'How often does the Seat Ibiza need servicing and when is the ITV inspection?',
        anchors: ['servicing', 'service', 'services', 'itv', 'maintenance', 'kilometres', 'mileage'],
        terms: ['ibiza', 'seat', 'how often', 'months', 'first', 'years', 'workshop', 'subscription'],
        min: 2,
        blocks: [
          { t: 'Service every 15,000 km or 12 months, whichever comes first.', c: [['FT-SEAT-IBZ-26', 4, 'Service every 15,000 km or 12 months, whichever comes first.']] },
          { t: 'The first ITV inspection is due 4 years after registration.', c: [['FT-SEAT-IBZ-26', 4, 'The first ITV inspection is due 4 years after registration.']] },
          { t: 'On subscription, servicing and tyres are included in the fee and are managed by the hub workshop.', c: [['FT-SEAT-IBZ-26', 4, 'On subscription, servicing and tyres are included in the fee and are managed by the hub workshop.']] }
        ],
        followups: ['ficha', 'vin']
      },
      {
        id: 'vin', icon: 'barcode', topic: 'Internal VIN code', scope: 'local',
        q: 'How do you read the internal VIN code of a vehicle?',
        anchors: ['vin', 'vin code', 'chassis', 'vin format', 'vin-2026-mad-seat-03'],
        terms: ['code', 'read', 'reads', 'means', 'interpret', 'format', 'internal', 'site', 'brand'],
        min: 2,
        blocks: [
          { t: 'Format VIN-<year>-<site>-<brand>-<no.>.', c: [['FT-SEAT-IBZ-26', 7, 'Format VIN-<year>-<site>-<brand>-<no.>.']] },
          { t: 'For example, VIN-2026-MAD-SEAT-03 is unit 03 of Seat registered in Madrid in 2026, arrived on the lot on 22/09/2026.', c: [['FT-SEAT-IBZ-26', 7, 'VIN-2026-MAD-SEAT-03 is unit 03 of Seat registered in Madrid in 2026 (arrived on the lot on 22/09/2026).']] }
        ],
        context: {
          systems: ['Odoo Inventory', 'SAP ERP', 'Salesforce CRM'],
          text: 'Full trace of the example vehicle, from arrival on the lot to delivery to the customer:',
          lot: 'VIN-2026-MAD-SEAT-03'
        },
        followups: ['ficha', 'documentacion']
      },
      {
        id: 'documentacion', icon: 'clipboard-list', topic: 'Specification · handover documents', scope: 'local',
        q: 'What documents are handed over with the vehicle?',
        anchors: ['documents', 'documentation', 'handover', 'registration certificate', 'service book', 'registration'],
        terms: ['vehicle', 'car', 'customer', 'handed', 'delivery', 'keys', 'contract', 'docusign', 'pre-delivery', 'points'],
        min: 3,
        blocks: [
          { t: 'Registration certificate, technical data sheet, manual, service book and contract signed in DocuSign.', c: [['FT-SEAT-IBZ-26', 5, 'Documents handed over: registration certificate, technical data sheet, manual, service book and contract signed in DocuSign.']] },
          { t: 'Before delivery, a 40-point pre-delivery inspection and a full clean are done.', c: [['FT-SEAT-IBZ-26', 5, '40-point pre-delivery inspection and full clean.']] },
          { t: 'Registration is handled by the hub within 5 to 10 days after signing.', c: [['FT-SEAT-IBZ-26', 5, 'Registration handled by the hub within 5 to 10 days after signing.']] }
        ],
        followups: ['vin']
      },
      {
        id: 'garantias', icon: 'shield', topic: 'Warranty and services by business line', scope: 'local',
        q: 'What cover does the 6-month subscription include?',
        anchors: ['subscription', 'subscriptions', 'subscribe', 'cover', 'coverage', 'warranty', 'warranties', 'included', 'includes', 'insurance', 'assistance'],
        terms: ['months', 'line', 'matrix', 'commitment', 'fee', 'maintenance', 'comprehensive', 'rental', 'workshop', 'sales'],
        min: 2,
        blocks: [
          { t: 'All lines have 24 h roadside assistance through Autopista Multimotor.', c: [['MAT-GAR-APM', 2, 'All lines have 24 h roadside assistance cover through Autopista Multimotor.']] },
          { t: '6-month subscription: maintenance, fully comprehensive insurance and assistance included, monthly fee with no down payment and a maximum commitment of 6 months.', c: [['MAT-GAR-APM', 3, '6-month subscription · maintenance, fully comprehensive insurance and assistance included · monthly fee with no down payment · maximum commitment of 6 months.']] },
          { t: 'The conditions of each contract prevail over the matrix, which summarises the standard conditions in force.', c: [['MAT-GAR-APM', 2, 'The conditions of each contract prevail over this matrix']] }
        ],
        /* If the question names a business line, adds its row from the matrix (MAT-GAR-APM §3). */
        build: (q) => {
          const K = window.CN_DOCS;
          const lines = [
            { words: ['used', 'second-hand', 'second hand', 'pre-owned'], key: 'Used sales' },
            { words: ['new sales', 'new', 'brand new'], key: 'New sales' },
            { words: ['rental', 'rent-a-car', 'rent a car', 'rent'], key: 'Rental' },
            { words: ['workshop', 'repair', 'repairs'], key: 'Workshop' }
          ];
          const C = (doc, sec, quote) => [doc, sec, quote];
          const blocks = [
            { t: 'All lines have 24 h roadside assistance through Autopista Multimotor.', c: [C('MAT-GAR-APM', 2, 'All lines have 24 h roadside assistance cover through Autopista Multimotor.')] },
            { t: '6-month subscription: maintenance, fully comprehensive insurance and assistance included, monthly fee with no down payment and a maximum commitment of 6 months.', c: [C('MAT-GAR-APM', 3, '6-month subscription · maintenance, fully comprehensive insurance and assistance included · monthly fee with no down payment · maximum commitment of 6 months.')] }
          ];
          if (K && typeof K.normalize === 'function') {
            const n = ` ${K.normalize(q)} `;
            const hit = lines.find((p) => p.words.some((w) => n.includes(` ${K.normalize(w)} `)));
            const sec = hit ? K.section('MAT-GAR-APM', '3') : null;
            const text = sec && (sec.list || []).find((t) => t.indexOf(hit.key) === 0);
            if (text) blocks.push({ t: `${text.split(' · ')[0]}: ${text.split(' · ').slice(1).join(', ').replace(/\.$/, '')}.`, c: [C('MAT-GAR-APM', 3, text)] });
          }
          blocks.push({ t: 'Any change of cover, insurance or supplier requires prior review by Finance and Customer care and an update of the matrix before it is offered.', c: [C('MAT-GAR-APM', 4, 'requires prior review by Finance and Customer care, and an update of this matrix before it is offered.')] });
          return { blocks, followups: ['ficha'] };
        },
        followups: ['ficha']
      }
    ],

    /* Questions about another site of the group when the answer comes from a Madrid hub document (scope 'local'). */
    other_scopes: {
      topic: 'Another site',
      words: ['barcelona', 'valencia', 'seville', 'sevilla', 'bilbao', 'malaga', 'zaragoza'],
      reason: 'The indexed documents on this topic are from the Madrid hub (Marqués de Soria); there is no evidence for {x}.'
    },

    gaps: [
      { id: 'simulacro', topic: 'Recall drill and communication', anchors: ['drill', 'drills', 'recall drill', 'recall letter', 'call-in', 'campaign closure', 'mass communication'],
        reason: 'No indexed document describes the drill or the steps of a workshop call-in campaign to customers.', related: 'OPE-REC-018' },
      { id: 'rgpd', topic: 'Data protection', anchors: ['gdpr', 'data protection', 'privacy', 'personal data', 'consent'],
        reason: 'No indexed document covers the protection of customer personal data.' },
      { id: 'certificados', topic: 'Brand certifications and audits', anchors: ['certificate', 'certificates', 'certification', 'certifications', 'iso', 'audit', 'audits', 'auditor'],
        reason: 'Certificates and brand audit reports are not among the indexed documents.' },
      { id: 'sostenibilidad', topic: 'Sustainability', anchors: ['sustainability', 'footprint', 'carbon', 'site emissions', 'recycling', 'electrification'],
        reason: 'No indexed document covers sustainability or the environmental footprint of the site.' },
      { id: 'precio', topic: 'Prices, discounts and margins', anchors: ['price', 'prices', 'cost', 'costs', 'discount', 'discounts', 'rate', 'rates', 'margin', 'commission'],
        reason: 'Prices, discounts and margins are not part of the indexed Operations procedures.' },
      { id: 'personal', topic: 'Working conditions', anchors: ['holidays', 'payroll', 'salary', 'wage', 'collective agreement', 'headcount', 'dismissal', 'working hours'],
        reason: 'Working conditions are not part of the indexed Operations procedures.' }
    ]
  }
});

/* Canonical summary by code (procedure data): filled in without overwriting what other files may have set.
   OPE-STK-012 also carries the parameters other scenes use (thresholds and assessment steps). */
(function (id) {
  'use strict';
  const pack = window.AGENTIC_INDUSTRIES_EN[id];
  const procs = pack.procedures = pack.procedures || {};
  pack.procedimientos.docs.forEach((d) => {
    const cur = procs[d.code] = procs[d.code] || {};
    if (!cur.title) cur.title = d.title;
    if (!cur.summary) cur.summary = d.summary;
    if (!cur.version) cur.version = d.version;
  });
  const extra = {
    'OPE-STK-012': {
      critical_units: 3,
      max_critical_units: 1,
      min_days_for_urgent: 3,
      evaluation: [
        'Count the open orders of the model in Salesforce CRM and their committed date',
        'Check in SAP ERP the receipt date confirmed by the brand',
        'Decide by order: keep the date, offer an alternative or renegotiate the delivery'
      ]
    }
  };
  Object.keys(extra).forEach((code) => {
    const cur = procs[code] = procs[code] || {};
    Object.keys(extra[code]).forEach((k) => { if (cur[k] == null) cur[k] = extra[code][k]; });
  });
})('autopista');
