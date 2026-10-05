/* Autopista Multimotor · supplier due-diligence questionnaire from a corporate customer (Iberian Transport Company), English. Demonstration scenario with synthetic data (MFM). */
agenticPackEn('autopista', {
  cuestionario: {
    agent: 'Customer questionnaires',
    lang: 'en',
    default_sel: 'B1',
    reviewer: 'Shift Quality Lead',
    assignee: 'Hub Quality Manager',
    assignee_short: 'Hub Quality',
    team: 'Quality',
    assign_due: '2026-10-07',
    responder: 'Autopista Multimotor, S.L.U. (Madrid hub)',
    site: 'Madrid (Marqués de Soria)',
    site_label: 'Hub',
    page_title: 'Supplier questionnaire · Iberian Transport Company',
    report_title: 'Response to supplier due-diligence questionnaire',
    ref_label: 'Customer reference',
    scope_meta_label: 'Services',
    discard_placeholder: 'For example: this question is answered with the attached certificate',
    save_system: 'Salesforce CRM',
    qn: {
      code: 'CUE-2026-041',
      title: 'Vendor Mobility Questionnaire 2026',
      customer: 'Iberian Transport Company',
      via: 'ITC Procurement Office',
      received: '2026-09-28T16:20',
      due: '2026-10-09',
      file: 'Vendor_Mobility_Questionnaire_2026.xlsx',
      scope: 'SUB-2026-0188 · 6-month corporate subscription (12 vehicles: 6 VW Golf, 4 Skoda Octavia and 2 SEAT León) and ALQ-CORP · Corporate short-term rental for Iberian Transport Company',
      scope_short: 'SUB-2026-0188 · ALQ-CORP',
      scope_label: '2 mobility services'
    },
    email: {
      mailbox: 'Quality mailbox',
      headers: {
        From: 'Procurement Office, Iberian Transport Company <procurement@iberiantransport.example>',
        To: 'Quality, Autopista Multimotor <calidad@apm-demo.example>',
        Date: 'Mon, 28 Sep 2026 15:20 (Madrid time)',
        Subject: 'Vendor Mobility Questionnaire 2026 - subscription and rental services - response due 9 October'
      },
      text: 'Dear Quality Team,\n\nAs part of the annual review of our mobility suppliers, Iberian Transport Company has issued its Vendor Mobility Questionnaire 2026 for the services you provide to us:\n- Corporate subscription SUB-2026-0188 (12 vehicles, 6 months)\n- Corporate short-term rental (ALQ-CORP)\n\nThe questionnaire has 15 questions in five sections: certification and audits, vehicle safety and integrity, availability and service levels, traceability and incidents, and compliance and sustainability.\n\nPlease answer every question in English and reference the procedure, record or certificate that supports each answer. We need the completed questionnaire by Friday 9 October 2026.\n\nKind regards,\n\nProcurement Office\nIberian Transport Company',
      highlights: [
        { text: 'Corporate subscription SUB-2026-0188 (12 vehicles, 6 months)', label: 'Service', tone: 'brand' },
        { text: 'Corporate short-term rental (ALQ-CORP)', label: 'Service', tone: 'brand' },
        { text: '15 questions', label: 'Questions', tone: 'brand' },
        { text: 'reference the procedure, record or certificate that supports each answer', label: 'Requirement' },
        { text: 'Friday 9 October 2026', label: 'Deadline' }
      ]
    },
    sections: [
      { id: 'A', en: 'Certification and audits' },
      { id: 'B', en: 'Vehicle safety and integrity' },
      { id: 'C', en: 'Availability and service levels' },
      { id: 'D', en: 'Traceability and incidents' },
      { id: 'E', en: 'Compliance and sustainability' }
    ],
    kpi: { label: 'Audits and visits in 2025', value: 23, sub: 'Includes official inspections · 31 audit days · Sustainability Report 2025', icon: 'shield-check' },
    sources_sub: 'Procedures, service sheets, certificates and annual report',
    identify_result: 'Iberian Transport Company via ITC Procurement Office · SUB-2026-0188 and ALQ-CORP',
    search_scope: 'Quality procedures, service sheets, certifications and annual report',
    lookups: [
      { system: 'SAP ERP', action: 'Checks the contract, the manufacturer purchase and the fleet registration of the SUB-2026-0188 vehicles', result: 'VIN-2026-MAD-VW-021: FAC-VW-26-4471, PDI compliant · contract SUB-2026-0188 with 12 vehicles', ms: 520 },
      { system: 'Odoo Inventory', action: 'Reads the delivery route and the recorded inspections of the customer fleet', result: 'Delivery of 01/09/2026: 42-point PDI compliant on all 12 vehicles', ms: 480 },
      { system: 'iCare Workshop', action: 'Reviews the workshop history and the open manufacturer campaigns', result: '6 Golf in scope of REC-VW-2026-001 (ABS) · 10,000 km services compliant', ms: 410 },
      { system: 'DocuSign', action: 'Checks the signed contract and its terms', result: 'SUB-2026-0188 signed on 25/08/2026 · maintenance, insurance and replacement vehicle included', ms: 300 },
      { system: 'Salesforce CRM', action: 'Searches open and closed complaints from this customer', result: 'REC-2026-0451 open: broken seams in a BMW X5 seat', ms: 350, tone: 'warn' },
      { system: 'iCare Workshop', action: 'Cross-checks this customer’s services with today’s incidents', result: '3 Golf services of SUB-2026-0188 affected by the absence of a VW technician (workshop capacity -30%)', ms: 390, tone: 'warn' }
    ],
    compare: {
      people: '2-3: Hub Quality, Customer Quality and, depending on the question, Workshop or Finance',
      systems: '6-8: email, the customer’s Excel file, Salesforce, SAP, certificates folder, procedures and sustainability report',
      steps: 'Find the source for each question, copy and adapt answers from previous years, ask other departments for data and build the Excel file',
      time: '2-4 h of Quality work, spread over 2-3 days'
    },
    presenter: {
      before: [
        'Each corporate customer brings a supplier questionnaire. In 2025 Autopista Multimotor received 23 brand audits, customer visits and inspections, totalling 31 audit days. It is background work that eats up Quality’s hours.',
        'This one comes from Iberian Transport Company: {total} questions in English about its 12-vehicle corporate subscription and the corporate rental. The procedures are written in Spanish; it makes no difference.',
        'When you press the button, Agentic Platform searches the procedures, service sheets and certifications, plus the records in SAP, Odoo, iCare, DocuSign and Salesforce, and drafts each answer with its source.'
      ],
      during: [
        '{drafted} of {total} have a cited draft; every citation is checked against the source text. {flagged} are left for Quality: telematics data protection, electrified vehicle batteries and business continuity. No supporting document, nothing invented.',
        'B1: besides answering, it warns that this same customer has complaint REC-2026-0451 open for broken seams and that 6 of its Golf are still pending the ABS campaign. Today that depends on someone remembering.',
        'C1: 3 Golf services for this customer are affected by today’s VW technician absence. The questionnaire does not live in isolation from the rest of the hub.',
        'Nothing goes out without approval: bulk approval only for high-confidence answers; medium-confidence ones are reviewed one by one.'
      ],
      next_during: 'Show B1 (citation and complaint warning) and B4 (no evidence). Then “Approve the {alta} high-confidence answers”, approve {media_ids} one by one and “Assign the {flagged} without a source to Hub Quality”.'
    },
    sources: {
      'PNT-CAL-012': {
        type: 'doc', kind: 'Procedure', code: 'PNT-CAL-012', title: 'Workshop capacity and service rescheduling', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Workshop capacity and service rescheduling' },
          { id: 'crit', heading: 'Criterion', text: 'Workshop capacity below 80% for more than 24 h: rescheduling of non-urgent services, notice to the customer and priority for subscription and safety-campaign vehicles. If the vehicle is immobilised for more than 24 h: replacement vehicle.' },
          { id: 'eval', heading: 'Assessment', list: ['Measure the available capacity by brand specialty (technicians and work bays)', 'Review the appointments of the next 2 weeks and their priority', 'Decision per service: keep the appointment, reschedule or refer to another workshop in the brand network'] }
        ]
      },
      'PNT-CAL-015': {
        type: 'doc', kind: 'Procedure', code: 'PNT-CAL-015', title: 'Vehicle hold and release (quality hold)', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Vehicle hold and release (quality hold)' },
          { id: 'crit', heading: 'Criterion', text: 'Every hold is recorded in SAP (vehicle blocked for delivery) and in Odoo Inventory (unit immobilised, deliveries held). Only the Quality Manager releases.' }
        ]
      },
      'PNT-CAL-020': {
        type: 'doc', kind: 'Procedure', code: 'PNT-CAL-020', title: 'Customer complaint handling and root cause analysis', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Customer complaint handling and root cause analysis' },
          { id: 'crit', heading: 'Criterion', text: 'Acknowledgement within 24 h, proposed solution within 5 working days and closure within the timescale agreed with the customer (by default, 15 working days).' }
        ]
      },
      'PNT-CAL-031': {
        type: 'doc', kind: 'Procedure', code: 'PNT-CAL-031', title: 'Pre-delivery inspection (PDI) and vehicle safety checks', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Pre-delivery inspection (PDI) and vehicle safety checks' },
          { id: 'crit', heading: 'Criterion', text: 'Safety checks (brakes, tyres and lights) are mandatory: verification at every delivery and every 10,000 km. If a check is not passed, the vehicle is immobilised until Quality decides.' }
        ]
      },
      'IT-TAL-VIN-02': {
        type: 'doc', kind: 'Technical instruction', code: 'IT-TAL-VIN-02', title: 'Manufacturer campaign lookup by VIN and brake review', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Manufacturer campaign lookup by VIN and brake review' },
          { id: 'crit', heading: 'Criterion', text: 'Weekly manufacturer campaign lookup by VIN; if a vehicle is affected, workshop appointment and reinforced review until the campaign is closed.' }
        ]
      },
      'FT-SUB': {
        type: 'doc', kind: 'Service sheet', code: 'FS-SUB-CORP-6M', title: 'Service sheet · 6-month corporate subscription', system: 'Procedimientos',
        org: 'Autopista Multimotor · Service specifications',
        sections: [
          { id: '1', heading: '1. Service', text: '6-month corporate subscription · VW, Skoda and SEAT vehicles with vehicle swap at 6 months at no extra cost.' },
          { id: '2', heading: '2. Includes', text: 'Includes: preventive maintenance, comprehensive insurance with a 500 EUR excess and a replacement vehicle for repairs longer than 24 h.' },
          { id: '3', heading: '3. Exclusions', text: 'Exclusions: traffic fines, fuel and misuse damage. No hidden charges and no cancellation penalty from month 3.' },
          { id: '4', heading: '4. Lead times', text: 'Delivery within 5 working days of contract signature. Vehicle swap within 3 working days.' },
          { id: '5', heading: '5. Management', text: 'Contract signed with DocuSign and monthly billing with Stripe. Contract management in Salesforce and SAP.' }
        ]
      },
      'FT-ALQ': {
        type: 'doc', kind: 'Service sheet', code: 'FS-ALQ-CORP', title: 'Service sheet · Corporate short-term rental', system: 'Procedimientos',
        org: 'Autopista Multimotor · Service specifications',
        sections: [
          { id: '1', heading: '1. Service', text: 'Corporate short-term rental · fleet of around 1,000 BMW, Audi, Volkswagen, Skoda and SEAT units with delivery at the hub or at the customer site.' },
          { id: '2', heading: '2. Includes', text: 'Includes: comprehensive insurance with a 600 EUR excess, 24 h assistance and unlimited mileage.' },
          { id: '3', heading: '3. Exclusions', text: 'Exclusions: traffic fines, fuel and misuse damage. Fuel and damage charges only with a return inspection and 360 photos.' },
          { id: '4', heading: '4. Upkeep', text: 'Cleaning and inspection of each vehicle at every return, with maintenance every 10,000 km.' },
          { id: '5', heading: '5. Management', text: 'Booking on the web platform and fleet management in Odoo Inventory. Payments with Stripe.' }
        ]
      },
      'WEB-CERT': {
        type: 'doc', kind: 'Certifications', code: null, label: 'Corporate website', title: 'Quality and certifications · Madrid hub', system: 'Procedimientos',
        org: 'Autopista Multimotor corporate website · accessed on 29/09/2026',
        sections: [
          { id: 'mad', heading: 'Madrid hub', text: 'Madrid hub (Marqués de Soria): ISO 9001, ISO 14001 and ISO 45001; official service network of VW, Audi, SEAT, Skoda and BMW.' },
          { id: 'nota', heading: 'Indexing note', text: 'The page does not state the certification body or the expiry date of each certificate.' }
        ]
      },
      'MEM-2025': {
        type: 'doc', kind: 'Annual report', code: null, label: 'Report 2025', title: 'Sustainability Report 2025', system: 'Procedimientos',
        org: 'Autopista Multimotor, S.L.U. · published on 01/07/2026',
        sections: [
          { id: 'aud', heading: 'Audits and inspections', text: 'Brand audits, customer visits and inspections in 2025: 23 (31 audit days), no sanctions.' },
          { id: 'tal', heading: 'Workshop staff', text: 'Workshop staff: 24 technicians, 100% with annual brand training.' },
          { id: 'flo', heading: 'Fleet', text: 'Rental fleet: around 1,000 units, 38% with an ECO or zero-emission label.' }
        ]
      },
      'ODOO-SUB': {
        type: 'record', kind: 'Delivery record', code: 'SUB-2026-0188', title: 'Contract SUB-2026-0188 · delivery and inspections', system: 'Odoo Inventory',
        org: 'Odoo Inventory · delivery record',
        sections: [
          { id: 'ent', heading: 'Delivery', text: 'Delivery of the 12 vehicles to Iberian Transport Company on 01/09/2026, within the 5 working days; contract signed on 25/08/2026 with DocuSign.' },
          { id: 'pdi', heading: 'Inspections', list: ['42-point PDI compliant on all 12 vehicles', '360 photos with mileage and fuel level recorded at delivery', 'Manufacturer campaigns checked by VIN before delivery: none open as of 01/09/2026'] }
        ]
      },
      'ODOO-RUTA': {
        type: 'record', kind: 'Process route', code: 'PDI', title: 'Preparation and delivery route for subscription vehicles', system: 'Odoo Inventory',
        org: 'Odoo Inventory · delivery order',
        sections: [
          { id: 'ruta', heading: 'Recorded route', text: 'vehicle intake → 42-point PDI → preparation and cleaning → 360 photos → delivery signature in DocuSign' }
        ]
      },
      'ICARE-REV': {
        type: 'record', kind: 'Safety checks', code: 'SUB-2026-0188', title: 'Safety checks of the SUB-2026-0188 vehicles', system: 'iCare Workshop',
        org: 'iCare Workshop · inspection orders',
        sections: [
          { id: 'qc', heading: 'Checks', list: ['Brakes, tyres and lights verified on all 12 vehicles at delivery on 01/09/2026', '10,000 km services carried out: 5 vehicles, all compliant', 'Preventive maintenance scheduled in iCare for all 12 vehicles'] }
        ]
      },
      'SAP-VIN': {
        type: 'record', kind: 'Vehicle record', code: 'VIN-2026-MAD-VW-021', title: 'Vehicle VIN-2026-MAD-VW-021 · origin and fleet registration', system: 'SAP ERP',
        org: 'SAP ERP · vehicle record',
        sections: [
          { id: 'origen', heading: 'Origin and registration', text: 'VW Golf 1.5 TSI from manufacturer purchase FAC-VW-26-4471 (28/08/2026), received at the Madrid hub at 10:42, 42-point PDI compliant and registered in the subscription fleet' }
        ]
      },
      'ODOO-VIN': {
        type: 'record', kind: 'Forward trace', code: 'VIN-2026-MAD-VW-021', title: 'Vehicle VIN-2026-MAD-VW-021 · contract and workshop orders', system: 'Odoo Inventory',
        org: 'Odoo Inventory · vehicle movements',
        sections: [
          { id: 'fwd', heading: 'Contract and workshop', text: '1 contract: SUB-2026-0188 with Iberian Transport Company, delivered 01/09/2026 and 2 workshop orders (OT-26-3084, OT-26-3110)' }
        ]
      },
      'ASIST-24': {
        type: 'record', kind: 'Incidents', code: '24 h assistance', title: '24 h assistance · Iberian Transport Company incidents', system: 'Twilio SMS',
        org: 'Twilio SMS · assistance alerts',
        sections: [
          { id: 'inc', heading: 'Latest incidents', list: ['INC-26-1180 · 25/08/2026 16:10 · Puncture alert · assistance in 38 min · closed compliant', 'INC-26-1204 · 28/08/2026 15:30 · Oil light · assistance in 41 min · closed compliant', 'INC-26-1297 · 25/09/2026 14:20 · Flat battery · assistance in 35 min · closed compliant'] }
        ]
      },
      'ICARE-TAL': {
        type: 'record', kind: 'Workshop', code: 'MAD', title: 'Madrid · brand workshop capacity', system: 'iCare Workshop',
        org: 'iCare Workshop · workshop master data',
        sections: [
          { id: 'cap', heading: 'Capacity', text: 'Madrid workshop: 14 work bays, 24 brand technicians and a maintenance appointment within 48 h' }
        ]
      },
      'ODOO-PLAN': {
        type: 'record', kind: 'Planning rule', code: 'Fleet 2026', title: 'Delivery and vehicle swap plan · rules', system: 'Odoo Inventory',
        org: 'Odoo Inventory · delivery plan',
        sections: [
          { id: 'reglas', heading: 'Planning rules', list: ['Contract to delivery: 5 working days maximum', 'Subscription vehicle swap: 3 working days maximum', 'Delivery slots of 60 min, from 08:00 to 20:00'] }
        ]
      },
      'ICARE-CAMP': {
        type: 'record', kind: 'Manufacturer campaigns', code: 'Campaigns', title: 'Open manufacturer campaigns in the fleet', system: 'iCare Workshop',
        org: 'iCare Workshop · recall campaigns',
        sections: [
          { id: 'abiertas', heading: 'Open campaigns', list: ['REC-VW-2026-001 · ABS VW Golf/Passat · 47 units · 12 reviewed · 35 pending · deadline 15/11/2026', 'REC-BMW-2026-002 · Hybrid battery BMW X5/X7 · 18 units · 3 reviewed · 15 pending · deadline 30/11/2026'] }
        ]
      },
      'SF-RCL': {
        type: 'record', kind: 'Complaints register', code: 'Complaints', title: 'Registered customer complaints', system: 'Salesforce CRM',
        org: 'Salesforce CRM · complaints and cases',
        sections: [
          { id: 'res', heading: 'Summary', text: '4 closed with root cause and corrective action recorded; 1 open (REC-2026-0451).' },
          { id: 'det', heading: 'Closed complaints', list: ['REC-2026-0204 · 15/07/2026 · Unjustified fuel charge on a rental · cause: Wrong gauge reading at return', 'REC-2026-0131 · 07/05/2026 · Damage not recorded at rental handover · cause: Incomplete 360 photos at check-in', 'REC-2026-0042 · 20/02/2026 · Scheduled service not carried out · cause: Appointment not booked in iCare', 'REC-2025-0311 · 14/11/2025 · Delayed delivery of a subscription vehicle · cause: Transport inspection with a scratch and repaint'] }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'VMQ 2026 · A1', sec: 'A', topic: 'Quality certifications', conf: 'media',
        qEn: 'Please list the quality and management-system certifications held by the supplying site, with scope, certification body and expiry date.',
        en: 'Both services are provided from our Madrid hub, which holds ISO 9001, ISO 14001 and ISO 45001 and is an official service network site for VW, Audi, SEAT, Skoda and BMW [1]. Copies of the current certificates, showing the certification body and expiry date of each, will be attached to this questionnaire.',
        cites: [
          { src: 'WEB-CERT', q: 'Madrid hub (Marqués de Soria): ISO 9001, ISO 14001 and ISO 45001; official service network of VW, Audi, SEAT, Skoda and BMW' }
        ],
        gap: 'The certification body and expiry date of each certificate do not appear in the indexed sources. Attach the current certificates before sending.'
      },
      {
        id: 'A2', ref: 'VMQ 2026 · A2', sec: 'A', topic: 'Audits in the last year', conf: 'alta',
        qEn: 'How many audits (brand, customer and official) did your company receive in the last year, and were there any sanctions or enforcement actions?',
        en: 'In 2025 Autopista Multimotor received 23 brand audits, customer visits and official inspections, totalling 31 audit days, with no sanctions [1].',
        cites: [
          { src: 'MEM-2025', q: 'Brand audits, customer visits and inspections in 2025: 23 (31 audit days), no sanctions' }
        ],
        note: {
          tone: 'brand', icon: 'info', title: 'Company-wide figure',
          text: 'The report publishes the company-wide figure, with no breakdown by site. If the customer asks for the Madrid hub only, Quality completes it.'
        }
      },
      {
        id: 'B1', ref: 'VMQ 2026 · B1', sec: 'B', topic: 'Defects and vehicle condition at delivery', conf: 'alta',
        qEn: 'Describe the controls in place to make sure vehicles are delivered free of defects and with open manufacturer campaigns checked, and how their effectiveness is maintained.',
        en: 'Every vehicle undergoes a 42-point pre-delivery inspection, with 360-degree photos, mileage and fuel level recorded at handover [1]. The registered route is vehicle intake, inspection, preparation and cleaning, photos and a delivery signature [2], under our pre-delivery inspection procedure [3]. Open manufacturer campaigns are checked weekly by VIN; if a vehicle is affected, a workshop appointment is booked and inspection is reinforced until the campaign is closed [4].',
        cites: [
          { src: 'ODOO-SUB', q: '42-point PDI compliant on all 12 vehicles' },
          { src: 'ODOO-RUTA', q: 'vehicle intake → 42-point PDI → preparation and cleaning → 360 photos → delivery signature in DocuSign' },
          { src: 'PNT-CAL-031', q: 'Pre-delivery inspection (PDI) and vehicle safety checks' },
          { src: 'IT-TAL-VIN-02', q: 'Weekly manufacturer campaign lookup by VIN; if a vehicle is affected, workshop appointment and reinforced review until the campaign is closed' }
        ],
        note: {
          tone: 'warn', icon: 'link', title: 'Open complaint from this customer · REC-2026-0451',
          text: 'Iberian Transport Company has complaint REC-2026-0451 open (broken seams in the driver seat of a BMW X5, VIN-2026-MAD-BMW-12) and 6 of its Golf under SUB-2026-0188 are still pending the REC-VW-2026-001 ABS campaign (deadline 15/11/2026). Check that this answer is consistent with the complaint analysis before sending it.',
          outcome: 'reclamacion', with: { any: 'Complaint status: {label}.' },
          go: 'reclamacion', goLabel: 'Open the complaint'
        }
      },
      {
        id: 'B2', ref: 'VMQ 2026 · B2', sec: 'B', topic: 'Safety checks (brakes, tyres, lights)', conf: 'alta',
        qEn: 'Are safety checks on brakes, tyres and lights mandatory? How often are they verified, and what happens to a vehicle if a check is missed or fails?',
        en: 'Yes. Brake, tyre and light checks are mandatory and are verified at every delivery and every 10,000 km [1]. If a check is not passed, the vehicle is immobilised until Quality decides [2]. The safety checks of the 12 vehicles of SUB-2026-0188 are compliant [3].',
        cites: [
          { src: 'PNT-CAL-031', q: 'Safety checks (brakes, tyres and lights) are mandatory: verification at every delivery and every 10,000 km' },
          { src: 'PNT-CAL-031', q: 'the vehicle is immobilised until Quality decides' },
          { src: 'ICARE-REV', q: '10,000 km services carried out: 5 vehicles, all compliant' }
        ],
        note: {
          tone: 'brand', icon: 'activity', title: 'Today’s status at the hub',
          text: 'iCare flags today a 10,000 km service overdue by 4 days on a rental SEAT Ibiza. It does not belong to SUB-2026-0188 or to this customer’s rental, so the answer does not change.'
        }
      },
      {
        id: 'B3', ref: 'VMQ 2026 · B3', sec: 'B', topic: 'Insurance, maintenance and exclusions', conf: 'alta',
        qEn: 'What is included in the subscription and rental services (maintenance, insurance, replacement vehicle), and are there any exclusions or hidden charges?',
        en: 'According to the approved service sheets, the subscription includes preventive maintenance, comprehensive insurance with a 500 EUR excess and a replacement vehicle for repairs longer than 24 h [1], and the rental includes comprehensive insurance with a 600 EUR excess, 24 h assistance and unlimited mileage [2]. Both services exclude only traffic fines, fuel and misuse damage [3][4], with no hidden charges.',
        cites: [
          { src: 'FT-SUB', q: 'Includes: preventive maintenance, comprehensive insurance with a 500 EUR excess and a replacement vehicle for repairs longer than 24 h' },
          { src: 'FT-ALQ', q: 'Includes: comprehensive insurance with a 600 EUR excess, 24 h assistance and unlimited mileage' },
          { src: 'FT-SUB', q: 'Exclusions: traffic fines, fuel and misuse damage. No hidden charges and no cancellation penalty from month 3' },
          { src: 'FT-ALQ', q: 'Exclusions: traffic fines, fuel and misuse damage. Fuel and damage charges only with a return inspection and 360 photos' }
        ]
      },
      {
        id: 'B4', ref: 'VMQ 2026 · B4', sec: 'B', topic: 'Telematics data protection', conf: 'none',
        qEn: 'Describe your data protection programme for vehicle telematics and customer data: GDPR governance, data retention, access controls and breach notification.',
        flag: {
          reason: 'None of the {doc_count} indexed documents covers telematics data protection, and there are no breach records among those consulted.',
          partial: [],
          missing: ['Data protection policy and data protection officer', 'GPS telematics retention periods and access controls', 'Breach notification procedure and results of the latest audits']
        }
      },
      {
        id: 'B5', ref: 'VMQ 2026 · B5', sec: 'B', topic: 'Electrified vehicle batteries', conf: 'none',
        qEn: 'Do you operate a risk-based inspection plan for hybrid and electric vehicle batteries? Please give the inspection frequency, the scope and the high-voltage certification of the technicians.',
        flag: {
          reason: 'There is only indirect evidence: no indexed document describes a battery inspection plan or the high-voltage certification of the technicians.',
          partial: [
            { src: 'ICARE-CAMP', q: 'REC-BMW-2026-002 · Hybrid battery BMW X5/X7 · 18 units · 3 reviewed · 15 pending · deadline 30/11/2026', why: 'It shows that the manufacturer campaign is being handled, but it is not a battery inspection plan.' },
            { src: 'MEM-2025', q: '100% with annual brand training', why: 'Brand training does not replace the inspection plan or prove high-voltage certification.' }
          ],
          missing: ['Inspection plan for hybrid and electric vehicle batteries', 'Inspection frequency and scope', 'High-voltage certification of the technicians (for example, brand HV training)', 'Latest inspection results']
        }
      },
      {
        id: 'C1', ref: 'VMQ 2026 · C1', sec: 'C', topic: 'Workshop capacity and service times', conf: 'alta',
        qEn: 'What are your service levels for scheduled maintenance, and what action is taken if workshop capacity drops?',
        en: 'Our Madrid workshop has 14 work bays, 24 brand technicians and a maintenance appointment available within 48 hours [1]. If workshop capacity stays below 80% for more than 24 hours, non-urgent services are rescheduled with notice to the customer, with priority for subscription and safety-campaign vehicles [2], and a decision is taken for each service: keep the appointment, reschedule or refer it to another workshop in the brand network [3]. If a vehicle is immobilised for more than 24 hours, a replacement vehicle is provided [4].',
        cites: [
          { src: 'ICARE-TAL', q: 'Madrid workshop: 14 work bays, 24 brand technicians and a maintenance appointment within 48 h' },
          { src: 'PNT-CAL-012', q: 'Workshop capacity below 80% for more than 24 h: rescheduling of non-urgent services, notice to the customer and priority for subscription and safety-campaign vehicles' },
          { src: 'PNT-CAL-012', q: 'Decision per service: keep the appointment, reschedule or refer to another workshop in the brand network' },
          { src: 'PNT-CAL-012', q: 'If the vehicle is immobilised for more than 24 h: replacement vehicle' }
        ],
        note: {
          tone: 'warn', icon: 'thermometer', title: 'This customer’s services affected today in the workshop',
          text: '3 Golf services of SUB-2026-0188 (appointments on 08 and 09/10/2026) are affected by the absence of the VW specialist technician (workshop capacity -30% since 06/10, 16:30). The answer describes the procedure, not today’s case.',
          outcome: 'alarma', with: { approved: 'In the shift alarm: {label}.', any: 'In the shift alarm, the proposal was rejected.' },
          without: 'The decision on those services is taken in the shift alarm.',
          go: 'alarma', goLabel: 'Open the alarm'
        }
      },
      {
        id: 'C2', ref: 'VMQ 2026 · C2', sec: 'C', topic: '24 h assistance and telematics', conf: 'alta',
        qEn: 'How is 24-hour roadside assistance provided and recorded for your customers vehicles?',
        en: 'Every vehicle is covered by 24 h assistance, and each incident is logged with its response time in our messaging and case system. The three most recent incidents of Iberian Transport Company, on 25 August, 28 August and 25 September 2026, were attended within 41 minutes at most and closed as compliant [1][2][3].',
        cites: [
          { src: 'ASIST-24', q: 'INC-26-1180 · 25/08/2026 16:10 · Puncture alert · assistance in 38 min · closed compliant' },
          { src: 'ASIST-24', q: 'INC-26-1204 · 28/08/2026 15:30 · Oil light · assistance in 41 min · closed compliant' },
          { src: 'ASIST-24', q: 'INC-26-1297 · 25/09/2026 14:20 · Flat battery · assistance in 35 min · closed compliant' }
        ]
      },
      {
        id: 'C3', ref: 'VMQ 2026 · C3', sec: 'C', topic: 'Vehicle hold and release', conf: 'alta',
        qEn: 'How is a non-conforming or suspect vehicle placed on hold, and who is authorised to release it?',
        en: 'Every hold is recorded in SAP, where the vehicle is blocked for delivery, and in our inventory system, where the unit is immobilised and any planned deliveries are held [1]. Only the Quality Manager can release a held vehicle [2].',
        cites: [
          { src: 'PNT-CAL-015', q: 'Every hold is recorded in SAP (vehicle blocked for delivery) and in Odoo Inventory (unit immobilised, deliveries held)' },
          { src: 'PNT-CAL-015', q: 'Only the Quality Manager releases' }
        ],
        note: {
          tone: 'ok', icon: 'check-circle', title: 'Applied today',
          text: 'This procedure was applied this morning in the shift alarm:',
          outcome: 'alarma', requires: 'approved', with: { approved: '{label}.' }
        }
      },
      {
        id: 'D1', ref: 'VMQ 2026 · D1', sec: 'D', topic: 'Vehicle traceability and mock recall', conf: 'media',
        qEn: 'Can you trace a vehicle back to the manufacturer and forward to the customer contract and workshop history? State your target time for a full trace and the date and result of your last mock recall.',
        en: 'Yes. Each vehicle is linked in SAP, Odoo Inventory and iCare Workshop to its manufacturer purchase, its customer contract and every workshop order. For example, VIN-2026-MAD-VW-021 traces back to the manufacturer invoice FAC-VW-26-4471, with a compliant pre-delivery inspection [1], and forward to contract SUB-2026-0188 with Iberian Transport Company, delivered on 1 September 2026, and 2 workshop orders [2].',
        cites: [
          { src: 'SAP-VIN', q: 'VW Golf 1.5 TSI from manufacturer purchase FAC-VW-26-4471 (28/08/2026), received at the Madrid hub at 10:42, 42-point PDI compliant and registered in the subscription fleet' },
          { src: 'ODOO-VIN', q: '1 contract: SUB-2026-0188 with Iberian Transport Company, delivered 01/09/2026 and 2 workshop orders (OT-26-3084, OT-26-3110)' }
        ],
        gap: 'The target time for a full trace and the date and result of the last mock recall are not in the indexed sources.',
        gapGo: 'retirada', gapGoLabel: 'Run a mock recall now', gapOutcome: 'retirada'
      },
      {
        id: 'D2', ref: 'VMQ 2026 · D2', sec: 'D', topic: 'Complaint handling', conf: 'alta',
        qEn: 'Describe your customer complaint handling process, including response times and the root cause analysis method.',
        en: 'Complaints are handled under a documented procedure: acknowledgement within 24 hours, a proposed solution within 5 working days and closure within the timescale agreed with the customer, 15 working days by default [1]. Each complaint is registered in our CRM, and closed complaints are recorded with their root cause and corrective action [2].',
        cites: [
          { src: 'PNT-CAL-020', q: 'Acknowledgement within 24 h, proposed solution within 5 working days and closure within the timescale agreed with the customer (by default, 15 working days)' },
          { src: 'SF-RCL', q: '4 closed with root cause and corrective action recorded' }
        ],
        note: {
          tone: 'warn', icon: 'mail', title: 'Complaint from this customer · REC-2026-0451',
          text: 'This answer will go out while this same customer’s complaint REC-2026-0451 is still open: the proposed solution is due on 08/10/2026.',
          outcome: 'reclamacion', tone_done: 'brand',
          text_done: 'This same customer’s complaint REC-2026-0451 was handled in this session:', with: { any: '{label}.' },
          go: 'reclamacion', goLabel: 'Open the complaint'
        }
      },
      {
        id: 'D3', ref: 'VMQ 2026 · D3', sec: 'D', topic: 'Business continuity and fraud prevention', conf: 'none',
        qEn: 'Do you have a documented business continuity plan and an anti-fraud and anti-money-laundering risk assessment? When were they last reviewed?',
        flag: {
          reason: 'The business continuity plan and the fraud and money-laundering risk assessment are not among the indexed documents.',
          context: 'As an obliged entity in vehicle sales, Autopista Multimotor must have the money-laundering risk assessment: it should exist in Quality or Finance. Agentic Platform does not describe its content or assume a review date.',
          partial: [],
          missing: ['Business continuity plan', 'Fraud and money-laundering risk assessment', 'Date of the last review of each document']
        }
      },
      {
        id: 'E1', ref: 'VMQ 2026 · E1', sec: 'E', topic: 'Low-emission fleet', conf: 'alta',
        qEn: 'What proportion of your rental fleet holds an ECO or zero-emission label?',
        en: 'Our rental fleet is around 1,000 vehicles, 38% of which hold an ECO or zero-emission label [1].',
        cites: [
          { src: 'MEM-2025', q: 'Rental fleet: around 1,000 units, 38% with an ECO or zero-emission label' }
        ]
      },
      {
        id: 'E2', ref: 'VMQ 2026 · E2', sec: 'E', topic: 'Delivery lead time and condition at handover', conf: 'alta',
        qEn: 'For subscription vehicles, what is the maximum time from contract signature to delivery, and how is vehicle condition checked at handover?',
        en: 'Deliveries are planned so that the vehicle is handed over no more than 5 working days after the contract is signed [1]. Condition is checked at handover with the pre-delivery inspection; for example, the 12 vehicles of SUB-2026-0188 were delivered on 1 September 2026 within that period [2].',
        cites: [
          { src: 'ODOO-PLAN', q: 'Contract to delivery: 5 working days maximum' },
          { src: 'ODOO-SUB', q: 'Delivery of the 12 vehicles to Iberian Transport Company on 01/09/2026, within the 5 working days' }
        ]
      }
    ]
  }
});
