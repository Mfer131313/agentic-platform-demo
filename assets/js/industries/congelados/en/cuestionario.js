/* Empresa de Congelados · supplier technical questionnaire from the UK retailer (via EC Foods UK Ltd), English. Escenario de la demo de referencia con datos sintéticos (MFM). */
agenticPackEn('congelados', {
  cuestionario: {
    agent: 'Customer questionnaires',
    lang: 'en',
    default_sel: 'B1',
    reviewer: 'Shift Quality Lead',
    assignee: 'Plant Quality Manager',
    assignee_short: 'Plant Quality',
    team: 'Quality',
    assign_due: '2026-10-07',
    responder: 'Frozen Foods Company (Fustiñana plant)',
    site: 'Fustiñana (FUS)',
    site_label: 'Plant',
    page_title: 'Technical questionnaire · UK retailer (private label)',
    report_title: 'Response to supplier technical questionnaire',
    ref_label: 'Customer reference',
    scope_meta_label: 'Products',
    discard_placeholder: 'For example: this question is answered with the attached certificate',
    save_system: 'Elara',
    qn: {
      code: 'CUE-2026-041',
      title: 'Supplier Technical Questionnaire 2026',
      customer: 'UK retailer (private label)',
      via: 'EC Foods UK Ltd',
      received: '2026-09-28T16:20',
      due: '2026-10-09',
      file: 'Supplier_Technical_Questionnaire_2026.xlsx',
      scope: 'UK-GUI-1000 · Garden Peas 1kg and UK-MIX-600 · Chargrilled vegetable mix 600g, UK retailer private label',
      scope_short: 'UK-GUI-1000 · UK-MIX-600',
      scope_label: '2 private-label products'
    },
    email: {
      mailbox: 'Quality mailbox',
      headers: {
        From: 'Technical Team, EC Foods UK Ltd <technical@ecfoods-uk.example>',
        To: 'Quality, Frozen Foods Company <calidad@ec-demo.example>',
        Date: 'Mon, 28 Sep 2026 15:20 (UK time)',
        Subject: 'Supplier Technical Questionnaire 2026 - own-label frozen vegetables - response due 9 October'
      },
      text: 'Dear Quality Team,\n\nAs part of the annual supplier review, our UK retail customer has issued its Supplier Technical Questionnaire 2026 for the own-label frozen vegetables you supply:\n- Garden Peas 1kg (UK-GUI-1000)\n- Chargrilled vegetable mix 600g (UK-MIX-600)\n\nThe questionnaire has 15 questions in five sections: certification and audits, food safety controls, temperature and product control, traceability and incidents, and raw materials and sustainability.\n\nPlease answer every question in English and reference the procedure, record or certificate that supports each answer. We need the completed questionnaire by Friday 9 October 2026.\n\nKind regards,\n\nTechnical Team\nEC Foods UK Ltd',
      highlights: [
        { text: 'Garden Peas 1kg (UK-GUI-1000)', label: 'Product', tone: 'brand' },
        { text: 'Chargrilled vegetable mix 600g (UK-MIX-600)', label: 'Product', tone: 'brand' },
        { text: '15 questions', label: 'Questions', tone: 'brand' },
        { text: 'reference the procedure, record or certificate that supports each answer', label: 'Requirement' },
        { text: 'Friday 9 October 2026', label: 'Deadline' }
      ]
    },
    sections: [
      { id: 'A', en: 'Certification and audits' },
      { id: 'B', en: 'Food safety controls' },
      { id: 'C', en: 'Temperature and product control' },
      { id: 'D', en: 'Traceability and incidents' },
      { id: 'E', en: 'Raw materials and sustainability' }
    ],
    kpi: { label: 'Audits and visits in 2025', value: 108, sub: 'Includes official inspections · 143 audit days · Sustainability Report 2025', icon: 'shield-check' },
    sources_sub: 'Procedures, specifications, certificates and annual report',
    identify_result: 'UK retailer (private label) via EC Foods UK · UK-GUI-1000 and UK-MIX-600',
    search_scope: 'Quality procedures, technical specifications, certifications and annual report',
    lookups: [
      { system: 'SAP', action: 'Checks intake and quality checks for the UK-GUI-1000 and UK-MIX-600 lots', result: 'L26-231-FUS-GUI-01: REC-26-18233, 108 TR · L26-262-FUS-MIX-02: DM-4 compliant', ms: 520 },
      { system: 'MES Mapex', action: 'Reads the line route and the recorded process controls', result: 'L2: destoner DP-2 and optical sorter OPT-2 · free chlorine in wash water on LAV-1', ms: 480 },
      { system: 'Mecalux Easy WMS', action: 'Reviews storage and shipments to EC Foods UK', result: '3 shipments by truck at −25 °C with compliant temperature records', ms: 410 },
      { system: 'Siemens Opcenter APS', action: 'Reads the rules of the campaign intake plan', result: 'Field to tunnel: 150 min maximum', ms: 300 },
      { system: 'Elara', action: 'Searches open and closed complaints from this customer', result: 'UKC-44718 open: 8 mm stone in L26-231-FUS-GUI-01', ms: 350, tone: 'warn' },
      { system: 'SCADA Galileo', action: 'Cross-checks this customer’s stock with today’s alarms', result: '7 pallets of UK-MIX-600 were in C-07 during the excursion (05:50–06:40)', ms: 390, tone: 'warn' }
    ],
    compare: {
      people: '2–3: Plant Quality, Customer Quality and, depending on the question, Agronomy or Maintenance',
      systems: '6–8: email, the customer’s Excel file, Elara, SAP, certificates folder, procedures and sustainability report',
      steps: 'Find the source for each question, copy and adapt answers from previous years, ask other departments for data and build the Excel file',
      time: '2–4 h of Quality work, spread over 2–3 days'
    },
    presenter: {
      before: [
        'Each private-label customer brings a technical questionnaire. In 2025 the group received 108 audits, customer visits and inspections, totalling 143 audit days. It is background work that eats up Quality’s hours.',
        'This one comes through EC Foods UK for the UK retailer: {total} questions in English about the 1 kg peas and the 600 g vegetable mix. The procedures are written in Spanish; it makes no difference.',
        'When you press the button, Agentic Platform searches the procedures, technical specifications and certifications, plus the records in SAP, Mapex, Easy WMS, Opcenter and Elara, and drafts each answer with its source.'
      ],
      during: [
        '{drafted} of {total} have a cited draft; every citation is checked against the source text. {flagged} are left for Quality: Listeria, residues and chlorate, and food defence. No supporting document, nothing invented.',
        'B1: besides answering, it warns that this same customer has complaint UKC-44718 open for a stone and that the DP-2 mesh is still pending. Today that depends on someone remembering.',
        'C1: 7 pallets of the vegetable mix for this customer were in C-07 during this morning’s excursion. The questionnaire does not live in isolation from the rest of the plant.',
        'Nothing goes out without approval: bulk approval only for high-confidence answers; medium-confidence ones are reviewed one by one.'
      ],
      next_during: 'Show B1 (citation and complaint warning) and B4 (no evidence). Then “Approve the {alta} high-confidence answers”, approve {media_ids} one by one and “Assign the {flagged} without a source to Plant Quality”.'
    },
    sources: {
      'PNT-CAL-012': {
        type: 'doc', kind: 'Procedure', code: 'PNT-CAL-012', title: 'Temperature excursions in frozen product cold rooms', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Temperature excursions in frozen product cold rooms' },
          { id: 'crit', heading: 'Criterion', text: 'Air temperature above −18 °C for more than 15 min: quality hold on the exposed pallets and assessment (product temperature, sensory analysis, disposition decision). Above −15 °C: critical excursion.' },
          { id: 'eval', heading: 'Assessment', list: ['Measure product temperature with a probe on the exposed pallets (outer layer and core)', 'Sensory and appearance analysis (ice crystals, clumping) per lot', 'Disposition decision per lot: release, reclassify or destroy'] }
        ]
      },
      'PNT-CAL-015': {
        type: 'doc', kind: 'Procedure', code: 'PNT-CAL-015', title: 'Product hold and release (quality hold)', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Product hold and release (quality hold)' },
          { id: 'crit', heading: 'Criterion', text: 'Every hold is recorded in SAP QM (lot blocked) and in Easy WMS (pallets immobilised, shipments retained). Only the Quality Manager releases.' }
        ]
      },
      'PNT-CAL-020': {
        type: 'doc', kind: 'Procedure', code: 'PNT-CAL-020', title: 'Customer complaint handling and 8D report', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Customer complaint handling and 8D report' },
          { id: 'crit', heading: 'Criterion', text: 'Acknowledgement within 24 h, containment within 48 h and an 8D report within the timescale agreed with the customer (by default, 5 working days).' }
        ]
      },
      'PNT-CAL-031': {
        type: 'doc', kind: 'Procedure', code: 'PNT-CAL-031', title: 'Foreign body control: destoners, optical sorters and metal detectors', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Foreign body control: destoners, optical sorters and metal detectors' },
          { id: 'crit', heading: 'Criterion', text: 'The metal detector is a CCP: verification with test pieces every 2 h. If the interval is exceeded, product packed since the last correct verification is held.' }
        ]
      },
      'IT-MAN-DP-02': {
        type: 'doc', kind: 'Technical instruction', code: 'IT-MAN-DP-02', title: 'Inspection and replacement of destoner meshes', system: 'Procedimientos',
        sections: [
          { id: 'obj', heading: 'Purpose', text: 'Inspection and replacement of destoner meshes' },
          { id: 'crit', heading: 'Criterion', text: 'Weekly inspection of the mesh; if there is wear, scheduled replacement and reinforced inspection until it is replaced.' }
        ]
      },
      'FT-GUI': {
        type: 'doc', kind: 'Technical specification', code: 'FT-UK-GUI-1000', title: 'Technical specification · Garden Peas 1kg', system: 'Procedimientos',
        org: 'Frozen Foods Company · Product specifications',
        sections: [
          { id: '1', heading: '1. Product', text: 'Garden Peas 1kg · IQF frozen peas · UK retailer private label (via EC Foods UK).' },
          { id: '2', heading: '2. Ingredients', text: 'Ingredients: peas (100%).' },
          { id: '3', heading: '3. Allergens', text: 'Allergens (Regulation (EU) 1169/2011 and UK FIC): none; no precautionary allergen labelling.' },
          { id: '4', heading: '4. Storage and shelf life', text: 'Store at −18 °C or below. Best before: 24 months from manufacture.' },
          { id: '5', heading: '5. Manufacture', text: 'Line L2 (peas / green beans), Fustiñana.' }
        ]
      },
      'FT-MIX': {
        type: 'doc', kind: 'Technical specification', code: 'FT-UK-MIX-600', title: 'Technical specification · Chargrilled vegetable mix 600g', system: 'Procedimientos',
        org: 'Frozen Foods Company · Product specifications',
        sections: [
          { id: '1', heading: '1. Product', text: 'Chargrilled vegetable mix 600g · roasted and chargrilled vegetables, IQF frozen · UK retailer private label (via EC Foods UK).' },
          { id: '2', heading: '2. Recipe', text: 'Recipe: roasted red pepper strips (30%), chargrilled courgette (30%), chargrilled aubergine (20%) and roasted onion (20%).' },
          { id: '3', heading: '3. Allergens', text: 'Allergens (Regulation (EU) 1169/2011 and UK FIC): none; no precautionary allergen labelling.' },
          { id: '4', heading: '4. Storage and shelf life', text: 'Store at −18 °C or below. Best before: 24 months from manufacture.' },
          { id: '5', heading: '5. Manufacture', text: 'Roasting and chargrilling at Arguedas (continuous grill GRL-1); mixing and packing at Fustiñana (Line L5, mixes). English labelling to the customer specification.' }
        ]
      },
      'WEB-CERT': {
        type: 'doc', kind: 'Certifications', code: null, label: 'Corporate website', title: 'Quality and food safety · certificates by plant', system: 'Procedimientos',
        org: 'Frozen Foods Company corporate website · accessed 29/09/2026',
        sections: [
          { id: 'fus', heading: 'Fustiñana', text: 'Fustiñana: IFS Food (higher level), BRCGS Food Safety (grade AA+) and FSSC 22000.' },
          { id: 'nota', heading: 'Indexing note', text: 'The page does not state the certification body or the expiry date of each certificate.' }
        ]
      },
      'MEM-2025': {
        type: 'doc', kind: 'Annual report', code: null, label: 'Report 2025', title: 'Sustainability Report 2025', system: 'Procedimientos',
        org: 'Frozen Foods Company group · published 01/07/2026',
        sections: [
          { id: 'aud', heading: 'Audits and inspections', text: 'Audits, customer visits and inspections in 2025: 108 (143 audit days), no sanctions.' },
          { id: 'agr', heading: 'Agriculture', text: 'Growers: around 900, farming 27,000 ha; 100% verified to FSA Silver level.' }
        ]
      },
      'SAP-GUI': {
        type: 'record', kind: 'Lot record', code: 'L26-231-FUS-GUI-01', title: 'Lot L26-231-FUS-GUI-01 · origin and quality checks', system: 'SAP',
        org: 'SAP · lot record',
        sections: [
          { id: 'origen', heading: 'Origin and intake', text: 'Peas from AGR-0412 (P-0412-07, P-0412-09, Ribera navarra), harvested 19/08/2026, intake REC-26-18233 at 10:42 (tenderometer 108 TR), L2 morning shift' },
          { id: 'qc', heading: 'Quality checks', list: ['Intake: tenderometer 108 TR (specification 95-120 TR): compliant', 'Intake: 2 kg sample free of stones and clods (compliant)', 'Optical sorter OPT-2: 1.6% reject rate in the shift (reference 1.5%)', 'Packing ENV-4: weight and seal checks compliant'] }
        ]
      },
      'WMS-GUI': {
        type: 'record', kind: 'Forward trace', code: 'L26-231-FUS-GUI-01', title: 'Lot L26-231-FUS-GUI-01 · pallets and shipments', system: 'Mecalux Easy WMS',
        org: 'Mecalux Easy WMS · pallets (SSCC) and shipments',
        sections: [
          { id: 'fwd', heading: 'Pallets and shipments', text: '22 pallets: 2 in SIL-3, 20 shipped to EC Foods UK Ltd (EC subsidiary, United Kingdom) (EXP-26-40911, EXP-26-40957)' }
        ]
      },
      'MAPEX-L2': {
        type: 'record', kind: 'Process route', code: 'L2', title: 'Line L2 (peas / green beans) · route of lot L26-231-FUS-GUI-01', system: 'MES Mapex',
        org: 'MES Mapex · production order',
        sections: [
          { id: 'ruta', heading: 'Recorded route', text: 'cleaner LIM-2 → destoner DP-2 → blancher ESC-2 → IQF tunnel TUN-2 → optical sorter OPT-2 → packing ENV-4' }
        ]
      },
      'MAPEX-LAV1': {
        type: 'record', kind: 'Process control', code: 'LAV-1', title: 'Vegetable washer LAV-1 · free chlorine in wash water', system: 'MES Mapex',
        org: 'MES Mapex · process readings',
        sections: [
          { id: 'ctl', heading: 'Recorded control', text: 'Vegetable washer LAV-1 · free chlorine in wash water · reference 3 ppm' },
          { id: 'lect', heading: 'Latest reading', text: '2.6 ppm in the 06:00 report of 29/09/2026.' }
        ]
      },
      'SAP-MIX': {
        type: 'record', kind: 'Lot record', code: 'L26-262-FUS-MIX-02', title: 'Lot L26-262-FUS-MIX-02 · quality checks', system: 'SAP QM',
        org: 'SAP QM · lot record',
        sections: [
          { id: 'qc', heading: 'Quality checks', list: ['Recipe 30/30/20/20% verified with the dosing scale', 'Metal detector DM-4: verifications compliant', 'UK customer specification: English labelling verified'] }
        ]
      },
      'WMS-EXP': {
        type: 'record', kind: 'Shipments', code: 'EXP · EC Foods UK', title: 'Shipments to EC Foods UK Ltd · temperature record', system: 'Mecalux Easy WMS',
        org: 'Mecalux Easy WMS · shipments',
        sections: [
          { id: 'exp', heading: 'Latest shipments', list: ['EXP-26-40911 · 25/08/2026 16:10 · Refrigerated truck −25 °C · temperature record compliant', 'EXP-26-40957 · 28/08/2026 15:30 · Refrigerated truck −25 °C · temperature record compliant', 'EXP-26-41083 · 25/09/2026 14:20 · Refrigerated truck −25 °C · temperature record compliant'] }
        ]
      },
      'WMS-FUS': {
        type: 'record', kind: 'Warehouse', code: 'FUS', title: 'Fustiñana · finished product storage', system: 'Mecalux Easy WMS',
        org: 'Mecalux Easy WMS · warehouse master data',
        sections: [
          { id: 'alm', heading: 'Storage', text: '4 automated cold stores at −25 °C (Mecalux Easy WMS) + dispatch chambers' }
        ]
      },
      'APS-CAMP': {
        type: 'record', kind: 'Planning rule', code: 'Campaign 2026', title: 'Campaign intake plan · rules', system: 'Siemens Opcenter APS',
        org: 'Siemens Opcenter APS · intake plan',
        sections: [
          { id: 'reglas', heading: 'Planning rules', list: ['Field to tunnel: 150 min maximum', 'Loading in the field: 20 min', 'Intake slots of 120 min, from 06:00 to 22:00'] }
        ]
      },
      'ELARA-RCL': {
        type: 'record', kind: 'Complaints register', code: 'Complaints', title: 'Registered customer complaints', system: 'Elara',
        org: 'Elara · complaints and non-conformities',
        sections: [
          { id: 'res', heading: 'Summary', text: '4 closed with non-conformity and root cause recorded; 1 open (UKC-44718).' },
          { id: 'det', heading: 'Closed complaints', list: ['RCL-2026-0204 · 15/07/2026 · Clumped product (ice blocks) at destination · NC-2026-0233 · cause: Cold chain break in the customer’s transport', 'RCL-2026-0131 · 07/05/2026 · Strings in green beans above specification · NC-2026-0158 · cause: Adjustment of the snipper COR-3', 'RCL-2026-0042 · 20/02/2026 · Badly sealed bag (open seal) · NC-2026-0097 · cause: Low jaw temperature on ENV-2', 'RCL-2025-0311 · 14/11/2025 · Stone of about 6 mm in spinach portions · NC-2025-0388 · cause: Worn destoner mesh on the leaf line (Alfaro plant)'] }
        ]
      }
    },
    questions: [
      {
        id: 'A1', ref: 'STQ 2026 · A1', sec: 'A', topic: 'GFSI certifications', conf: 'media',
        qEn: 'Please list the GFSI-recognised certifications held by the supplying site, with grade, certification body and expiry date.',
        en: 'Both products are packed and dispatched at our Fustiñana site, which is certified to IFS Food (higher level), BRCGS Food Safety (grade AA+) and FSSC 22000 [1]. Copies of the current certificates, showing the certification body and expiry date of each, will be attached to this questionnaire.',
        cites: [
          { src: 'WEB-CERT', q: 'Fustiñana: IFS Food (higher level), BRCGS Food Safety (grade AA+) and FSSC 22000' }
        ],
        gap: 'The certification body and expiry date of each certificate do not appear in the indexed sources. Attach the current certificates before sending.'
      },
      {
        id: 'A2', ref: 'STQ 2026 · A2', sec: 'A', topic: 'Audits in the last year', conf: 'alta',
        qEn: 'How many audits (customer, certification and official) did your company receive in the last year, and were there any sanctions or enforcement actions?',
        en: 'In 2025 the Frozen Foods Company group received 108 audits, customer visits and official inspections, totalling 143 audit days, with no sanctions [1].',
        cites: [
          { src: 'MEM-2025', q: 'Audits, customer visits and inspections in 2025: 108 (143 audit days), no sanctions' }
        ],
        note: {
          tone: 'brand', icon: 'info', title: 'Group figure',
          text: 'The report publishes the group figure, with no breakdown by plant. If the customer asks for Fustiñana only, Quality completes it.'
        }
      },
      {
        id: 'B1', ref: 'STQ 2026 · B1', sec: 'B', topic: 'Stones and field foreign bodies', conf: 'alta',
        qEn: 'Describe the controls in place to remove stones and other field foreign bodies from raw material, and how their effectiveness is maintained.',
        en: 'Raw material is sampled at intake and checked for stones and clods [1]. On the pea line, product passes through a cleaner-aspirator, a destoner and, after freezing, an optical sorter [2], under our foreign body control procedure [3]. Destoner meshes are inspected weekly; if wear is found, replacement is scheduled and inspection is reinforced until the mesh has been replaced [4].',
        cites: [
          { src: 'SAP-GUI', q: 'Intake: 2 kg sample free of stones and clods (compliant)' },
          { src: 'MAPEX-L2', q: 'cleaner LIM-2 → destoner DP-2 → blancher ESC-2 → IQF tunnel TUN-2 → optical sorter OPT-2 → packing ENV-4' },
          { src: 'PNT-CAL-031', q: 'Foreign body control: destoners, optical sorters and metal detectors' },
          { src: 'IT-MAN-DP-02', q: 'Weekly inspection of the mesh; if there is wear, scheduled replacement and reinforced inspection until it is replaced' }
        ],
        note: {
          tone: 'warn', icon: 'link', title: 'Open complaint from this customer · UKC-44718',
          text: 'EC Foods UK has complaint UKC-44718 open (a stone of about 8 mm in lot [[lot:L26-231-FUS-GUI-01]]) and the DP-2 mesh is still awaiting its spare part (OT-26-07415, open since 18/08/2026, 42 days). Check that this answer is consistent with the 8D report before sending it.',
          outcome: 'reclamacion', with: { any: 'Complaint status: {label}.' },
          go: 'reclamacion', goLabel: 'Open the complaint'
        }
      },
      {
        id: 'B2', ref: 'STQ 2026 · B2', sec: 'B', topic: 'Metal detection (CCP)', conf: 'alta',
        qEn: 'Is metal detection a critical control point? How often are detectors verified, and what happens to product if a verification is missed or fails?',
        en: 'Yes. Metal detection is a critical control point in our HACCP plan, and detectors are verified with test pieces every 2 hours [1]. If a verification is not passed within that interval, all product packed since the last correct verification is held for a Quality decision [2]. Verification records for lot L26-262-FUS-MIX-02 of UK-MIX-600 are compliant [3].',
        cites: [
          { src: 'PNT-CAL-031', q: 'The metal detector is a CCP: verification with test pieces every 2 h' },
          { src: 'PNT-CAL-031', q: 'product packed since the last correct verification is held' },
          { src: 'SAP-MIX', q: 'Metal detector DM-4: verifications compliant' }
        ],
        note: {
          tone: 'brand', icon: 'activity', title: 'Plant status today',
          text: 'The 06:00 report shows DM-1 with its verification overdue (3.5 h; maximum 2 h). DM-1 is on line L1 (sweetcorn) and is not involved in this customer’s products, so the answer does not change.'
        }
      },
      {
        id: 'B3', ref: 'STQ 2026 · B3', sec: 'B', topic: 'Allergens', conf: 'alta',
        qEn: 'Do the products supplied contain any of the 14 regulated allergens, or carry precautionary allergen labelling?',
        en: 'No. According to the approved specifications, Garden Peas 1kg (UK-GUI-1000) is 100% peas [1], and the chargrilled vegetable mix 600g (UK-MIX-600) contains roasted red pepper strips, chargrilled courgette, chargrilled aubergine and roasted onion [2]. Neither product contains any of the 14 regulated allergens or carries precautionary allergen labelling [3][4].',
        cites: [
          { src: 'FT-GUI', q: 'Ingredients: peas (100%)' },
          { src: 'FT-MIX', q: 'Recipe: roasted red pepper strips (30%), chargrilled courgette (30%), chargrilled aubergine (20%) and roasted onion (20%)' },
          { src: 'FT-GUI', q: 'Allergens (Regulation (EU) 1169/2011 and UK FIC): none; no precautionary allergen labelling' },
          { src: 'FT-MIX', q: 'Allergens (Regulation (EU) 1169/2011 and UK FIC): none; no precautionary allergen labelling' }
        ]
      },
      {
        id: 'B4', ref: 'STQ 2026 · B4', sec: 'B', topic: 'Environmental Listeria', conf: 'none',
        qEn: 'Describe your environmental monitoring programme for Listeria in post-blanching and packing areas: sampling zones, frequency, trend analysis and corrective actions.',
        flag: {
          reason: 'None of the {doc_count} indexed documents covers environmental sampling for Listeria, and there are no analytical results among the records consulted.',
          partial: [],
          missing: ['Environmental Listeria sampling plan: zones, points and frequencies', 'Results for recent months and trend analysis', 'Corrective actions after a positive result']
        }
      },
      {
        id: 'B5', ref: 'STQ 2026 · B5', sec: 'B', topic: 'Pesticide residues and chlorate', conf: 'none',
        qEn: 'Do you operate a risk-based testing plan for pesticide residues and chlorate? Please give the testing frequency, the scope and the accreditation of the laboratory used.',
        flag: {
          reason: 'There is only indirect evidence: no indexed document describes a testing plan for pesticide residues or chlorate.',
          partial: [
            { src: 'MAPEX-LAV1', q: 'free chlorine in wash water · reference 3 ppm', why: 'Controlling chlorine in the wash water limits chlorate formation, but it is not a residue test.' },
            { src: 'MEM-2025', q: '100% verified to FSA Silver level', why: 'FSA verification of growers does not replace a testing plan.' }
          ],
          missing: ['Testing plan for pesticide residues and chlorate', 'Testing frequency and scope', 'Laboratory and accreditation (for example, ISO/IEC 17025)', 'Latest test results']
        }
      },
      {
        id: 'C1', ref: 'STQ 2026 · C1', sec: 'C', topic: 'Storage temperature', conf: 'alta',
        qEn: 'What are your storage temperature limits for frozen finished product, and what action is taken if a storage temperature deviation occurs?',
        en: 'Finished product is stored at −25 °C in four automated cold stores and in dispatch chambers [1]. If air temperature stays above −18 °C for more than 15 minutes, the exposed pallets are placed on quality hold and evaluated for product temperature and sensory quality [2], and a disposition decision is taken for each lot: release, reclassify or destroy [3]. An excursion above −15 °C is classed as critical [4].',
        cites: [
          { src: 'WMS-FUS', q: '4 automated cold stores at −25 °C (Mecalux Easy WMS) + dispatch chambers' },
          { src: 'PNT-CAL-012', q: 'Air temperature above −18 °C for more than 15 min: quality hold on the exposed pallets and assessment (product temperature, sensory analysis, disposition decision)' },
          { src: 'PNT-CAL-012', q: 'Disposition decision per lot: release, reclassify or destroy' },
          { src: 'PNT-CAL-012', q: 'Above −15 °C: critical excursion' }
        ],
        note: {
          tone: 'warn', icon: 'thermometer', title: 'This customer’s stock in the C-07 excursion',
          text: '7 pallets of UK-MIX-600 (lot [[lot:L26-262-FUS-MIX-02]]) were in C-07 during today’s excursion (05:50–06:40, peak of −13.9 °C) and are planned to ship to this customer (EXP-26-41109, 14:00). The answer describes the procedure, not today’s case.',
          outcome: 'alarma', with: { approved: 'In the C-07 alarm: {label}.', any: 'In the C-07 alarm, the hold proposal was rejected.' },
          without: 'The decision on those pallets is taken in the C-07 alarm.',
          go: 'alarma', goLabel: 'Open the alarm'
        }
      },
      {
        id: 'C2', ref: 'STQ 2026 · C2', sec: 'C', topic: 'Cold chain in transport', conf: 'alta',
        qEn: 'How is the cold chain maintained and recorded during transport to the UK?',
        en: 'Product leaves Fustiñana in refrigerated trucks at −25 °C, and the temperature record of each shipment is kept in our warehouse management system. The three most recent shipments to EC Foods UK, on 25 August, 28 August and 25 September 2026, all have compliant temperature records [1][2][3].',
        cites: [
          { src: 'WMS-EXP', q: 'EXP-26-40911 · 25/08/2026 16:10 · Refrigerated truck −25 °C · temperature record compliant' },
          { src: 'WMS-EXP', q: 'EXP-26-40957 · 28/08/2026 15:30 · Refrigerated truck −25 °C · temperature record compliant' },
          { src: 'WMS-EXP', q: 'EXP-26-41083 · 25/09/2026 14:20 · Refrigerated truck −25 °C · temperature record compliant' }
        ]
      },
      {
        id: 'C3', ref: 'STQ 2026 · C3', sec: 'C', topic: 'Product hold and release', conf: 'alta',
        qEn: 'How is non-conforming or suspect product placed on hold, and who is authorised to release it?',
        en: 'Every hold is recorded in SAP QM, where the lot is blocked, and in our warehouse management system, where the pallets are immobilised and any planned shipments are retained [1]. Only the Quality Manager can release held product [2].',
        cites: [
          { src: 'PNT-CAL-015', q: 'Every hold is recorded in SAP QM (lot blocked) and in Easy WMS (pallets immobilised, shipments retained)' },
          { src: 'PNT-CAL-015', q: 'Only the Quality Manager releases' }
        ],
        note: {
          tone: 'ok', icon: 'check-circle', title: 'Applied today',
          text: 'This procedure was applied this morning in the C-07 alarm:',
          outcome: 'alarma', requires: 'approved', with: { approved: '{label}.' }
        }
      },
      {
        id: 'D1', ref: 'STQ 2026 · D1', sec: 'D', topic: 'Traceability and mock recall', conf: 'media',
        qEn: 'Can you trace a finished lot back to the grower and field, and forward to customers? State your target time for a full trace and the date and result of your last mock recall.',
        en: 'Yes. Each lot is linked in SAP, MES Mapex and Mecalux Easy WMS to its intake, grower and fields, processing line, and to every pallet (SSCC) and shipment. For example, lot L26-231-FUS-GUI-01 traces back to grower AGR-0412, fields P-0412-07 and P-0412-09 and intake REC-26-18233 [1], and forward to 22 pallets: 20 shipped to EC Foods UK and 2 in stock at Fustiñana [2].',
        cites: [
          { src: 'SAP-GUI', q: 'Peas from AGR-0412 (P-0412-07, P-0412-09, Ribera navarra), harvested 19/08/2026, intake REC-26-18233 at 10:42 (tenderometer 108 TR), L2 morning shift' },
          { src: 'WMS-GUI', q: '22 pallets: 2 in SIL-3, 20 shipped to EC Foods UK Ltd (EC subsidiary, United Kingdom) (EXP-26-40911, EXP-26-40957)' }
        ],
        gap: 'The target time for a full trace and the date and result of the last mock recall are not in the indexed sources.',
        gapGo: 'retirada', gapGoLabel: 'Run a mock recall now', gapOutcome: 'retirada'
      },
      {
        id: 'D2', ref: 'STQ 2026 · D2', sec: 'D', topic: 'Complaint handling', conf: 'alta',
        qEn: 'Describe your customer complaint handling process, including response times and the root cause analysis method.',
        en: 'Complaints are handled under a documented procedure: acknowledgement within 24 hours, containment within 48 hours and an 8D report within the timescale agreed with the customer, 5 working days by default [1]. Each complaint is registered in our quality management system, and closed complaints are recorded with their non-conformity and root cause [2].',
        cites: [
          { src: 'PNT-CAL-020', q: 'Acknowledgement within 24 h, containment within 48 h and an 8D report within the timescale agreed with the customer (by default, 5 working days)' },
          { src: 'ELARA-RCL', q: '4 closed with non-conformity and root cause recorded' }
        ],
        note: {
          tone: 'warn', icon: 'mail', title: 'Complaint from this customer · UKC-44718',
          text: 'This answer will arrive while complaint UKC-44718 from this same customer is still open: the report is due on 02/10/2026.',
          outcome: 'reclamacion', tone_done: 'brand',
          text_done: 'Complaint UKC-44718 from this same customer has been handled in this session:', with: { any: '{label}.' },
          go: 'reclamacion', goLabel: 'Open the complaint'
        }
      },
      {
        id: 'D3', ref: 'STQ 2026 · D3', sec: 'D', topic: 'Food defence and fraud', conf: 'none',
        qEn: 'Do you have a documented food defence plan and a food fraud vulnerability assessment? When were they last reviewed?',
        flag: {
          reason: 'The food defence plan and the food fraud vulnerability assessment are not among the indexed documents.',
          context: 'Fustiñana is certified to IFS Food and BRCGS, which require both documents: they should exist in Plant Quality. Agentic Platform does not describe their content or assume a review date.',
          partial: [],
          missing: ['Food defence plan', 'Food fraud vulnerability assessment', 'Date of the last review of each document']
        }
      },
      {
        id: 'E1', ref: 'STQ 2026 · E1', sec: 'E', topic: 'Sustainable agriculture (FSA)', conf: 'alta',
        qEn: 'What proportion of your growers are verified against a recognised sustainable agriculture standard, such as the SAI Platform FSA, and at what level?',
        en: 'All of our growers are verified against the SAI Platform Farm Sustainability Assessment (FSA) at Silver level: around 900 growers farming some 27,000 hectares [1].',
        cites: [
          { src: 'MEM-2025', q: 'Growers: around 900, farming 27,000 ha; 100% verified to FSA Silver level' }
        ]
      },
      {
        id: 'E2', ref: 'STQ 2026 · E2', sec: 'E', topic: 'Field to tunnel and maturity', conf: 'alta',
        qEn: 'For peas, what is the maximum time from harvest to freezing, and how is maturity checked at intake?',
        en: 'Harvesting and intake are planned so that raw material reaches the IQF tunnel no more than 150 minutes after leaving the field [1]. Pea maturity is checked at intake with a tenderometer against a specification of 95–120 TR; for example, intake REC-26-18233 measured 108 TR [2].',
        cites: [
          { src: 'APS-CAMP', q: 'Field to tunnel: 150 min maximum' },
          { src: 'SAP-GUI', q: 'Intake: tenderometer 108 TR (specification 95-120 TR): compliant' }
        ]
      }
    ]
  }
});
