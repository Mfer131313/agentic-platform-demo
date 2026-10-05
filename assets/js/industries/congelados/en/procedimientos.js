/* Empresa de Congelados · consulta de procedimientos de Calidad con citas (English). Escenario de la demo de referencia con datos sintéticos (MFM). */
agenticPackEn('congelados', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedures',
    title: 'Ask the procedures',
    agent: 'Procedures',
    system: 'Elara',
    source: 'Elara · controlled Quality documents',
    indexed_at: '2026-09-29T06:00',
    doc_org: 'Frozen Foods Company · Quality',
    ui: {
      page_title: 'Quality procedure search',
      intro_title: 'Ask about the Fustiñana Quality procedures',
      intro_text: 'Every sentence of the answer cites the document and the section it comes from. If no indexed document covers it, the search says so and does not answer.',
      placeholder: 'Type a question about the Quality procedures',
      context_title: 'Applied to Fustiñana today',
      permission: 'Quality · Fustiñana',
      asker_initials: 'QS',
      asker_role: 'Shift Quality Manager',
      route_to: 'Plant Quality'
    },
    report: { title: 'Quality procedure search', code_prefix: 'CON-PROC', filename: 'procedure-search', scope_label: 'Plant', scope: 'Fustiñana (FUS)' },
    presenter: {
      say: [
        'Search of the Quality procedures: the answer comes only from the controlled documents, and every sentence carries its citation to the document and section.',
        'Eight Elara documents are indexed: cold chain, hold and release, complaints and 8D, foreign bodies, Listeria, the destoner work instruction, a product specification and the allergen matrix. Here they are synthetic; in the pilot, your own current versions.'
      ],
      say_empty: 'It helps in IFS or BRCGS audits, to train new shifts and to answer customers with the exact reference.',
      say_answered: 'Clicking a citation opens the document with the exact passage highlighted. And the answer is cross-checked with what is happening in the plant today: the C-07 alarm, complaint UKC-44718 or metal detector DM-1.',
      say_none: 'When there is no source it says so and invents nothing: no answer and no citation. If the topic is in a document that is not indexed, it names it (PNT-CAL-018) and lets you route the question to Quality.',
      next_empty: 'Click “What should we do if a cold room goes above −18 °C?” and then citation 1 to see the highlighted passage.',
      next_answered: 'Type a question with no source, for example “How often do we run the product recall drill?”, and click “Ask”.',
      next_done: 'Move on to the next scene with the right arrow.'
    },

    docs: [
      {
        code: 'PNT-CAL-012',
        title: 'Temperature excursions in frozen-product cold rooms',
        short: 'Temperature excursions',
        type: 'Procedure',
        version: '4',
        date: '2026-03-12',
        owner: 'Plant Quality',
        summary: 'Air temperature above −18 °C for more than 15 min: quality hold on the exposed pallets and assessment (product temperature, sensory analysis, disposition decision). Above −15 °C: critical excursion.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'Air temperature above −18 °C for more than 15 min: quality hold on the exposed pallets and assessment (product temperature, sensory analysis, disposition decision). Above −15 °C: critical excursion.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Define how a temperature excursion is detected, assessed and recorded in the frozen-product stores of the Fustiñana plant, to protect product safety and quality and the cold chain up to the customer.',
            'It applies to automatic silos SIL-1 to SIL-4 (setpoint −25 °C) and to the dispatch cold rooms (setpoint −22 °C). It does not apply to transport, which is governed by the conditions agreed with each carrier.'
          ] },
          { id: '2', heading: '2. Definitions', list: [
            'Air temperature: reading of the ambient probe in each cold room (for example, TT-C07-01), recorded in SCADA Galileo every 5 min.',
            'Excursion: air temperature above −18 °C.',
            'Critical excursion: air temperature above −15 °C.',
            'Exposed pallets: pallets that Mecalux Easy WMS places in the cold room between the start and the end of the excursion.'
          ] },
          { id: '3', heading: '3. Responsibilities', list: [
            'Shift Quality Manager: assesses the excursion, approves the hold and decides on the product assessment.',
            'Dispatch Shift Supervisor: holds back loads with exposed pallets until Quality decides.',
            'Refrigeration Maintenance: restores the temperature, investigates the cause and records the intervention.'
          ] },
          { id: '4', heading: '4. Hold criterion', text: [
            'If the air temperature goes above −18 °C for more than 15 consecutive min, all exposed pallets are placed on hold (quality hold under PNT-CAL-015) and are not dispatched until the assessment in point 5 is complete.',
            'If at any time it goes above −15 °C, the excursion is critical: in addition to the hold, a non-conformity is opened in Elara and the Plant Quality Manager is informed.',
            'Pallets of the same lot in other locations are not placed on hold automatically: they are flagged “to be assessed” and the Shift Quality Manager decides their scope in light of the results.',
            'An excursion of 15 min or less that does not reach −15 °C is recorded without a hold and reviewed in the weekly cold-chain report.'
          ] },
          { id: '5', heading: '5. Product assessment', text: [
            'Exposed pallets are assessed by lot before any dispatch. Release is decided by the Quality Manager under PNT-CAL-015, with the results recorded in Elara.'
          ], list: [
            'Measure the product temperature with a probe on the exposed pallets (outer layer and centre).',
            'Sensory and appearance analysis (ice crystals, clumping) by lot.',
            'Disposition decision by lot: release, downgrade or destroy.'
          ] },
          { id: '6', heading: '6. Recording and communication', list: [
            'The SCADA Galileo alarm opens the excursion record: start, end, peak and minutes above −18 °C and above −15 °C.',
            'The hold is recorded in SAP QM and in Mecalux Easy WMS with the alarm reference (PNT-CAL-015).',
            'The Dispatch Shift Supervisor is notified through Microsoft Teams to hold back the planned loads with exposed pallets.',
            'The cause and the corrective action are documented in the non-conformity; repeated excursions in the same cold room are analysed in the monthly cold-chain review.'
          ] },
          { id: '7', heading: '7. References', refs: true, list: [
            'PNT-CAL-015 · Product hold and release (quality hold).',
            'Royal Decree 1109/1991, general standard for quick-frozen foods.',
            'IFS Food v8 · BRCGS Food Safety · FSSC 22000.'
          ] }
        ]
      },
      {
        code: 'PNT-CAL-015',
        title: 'Product hold and release (quality hold)',
        short: 'Hold and release',
        type: 'Procedure',
        version: '6',
        date: '2026-01-20',
        owner: 'Plant Quality',
        summary: 'Every hold is recorded in SAP QM (lot on hold) and in Easy WMS (pallets immobilised, shipments held). Only the Quality Manager releases.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'Every hold is recorded in SAP QM (lot on hold) and in Easy WMS (pallets immobilised, shipments held). Only the Quality Manager releases.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Ensure that no product with a quality or food safety deviation leaves the plant without a documented Quality decision. It applies to finished product, bulk product (octabins) and raw materials in any location in Fustiñana.'
          ] },
          { id: '2', heading: '2. Responsibilities', list: [
            'Any shift supervisor may propose a hold on detecting a deviation.',
            'The Shift Quality Manager approves the hold and defines its scope.',
            'Only the Quality Manager (the plant manager or, by delegation, the shift manager) may release product on hold.'
          ] },
          { id: '3', heading: '3. Recording the hold', text: [
            'Every hold is recorded at the same time in SAP QM (lot with quality hold) and in Mecalux Easy WMS (pallets immobilised and shipments held). Easy WMS does not allow a pallet on hold to be loaded.',
            'The record includes the reason, the scope (lots, SSCCs and locations), the source reference (alarm, non-conformity or complaint) and who approves it.'
          ] },
          { id: '4', heading: '4. Assessment and usage decision', text: [
            'Release requires documented evidence: assessment results, analyses where applicable and a signed conclusion. The usage decision is recorded in SAP QM and may be release, downgrade (industrial use or second grade) or destroy.',
            'No product is released by default or because a deadline has passed.'
          ] },
          { id: '5', heading: '5. Partial release', text: [
            'A lot may be released by pallet (SSCC) when the assessment allows the affected pallets to be separated from those that are not. Each released pallet is identified in SAP QM and in Easy WMS.'
          ] },
          { id: '6', heading: '6. Product already dispatched', text: [
            'If part of the lot has already been dispatched, the Plant Quality Manager assesses withdrawal or recovery under PNT-CAL-018 (Product traceability and recall) and informs the customer within the time set by that procedure.'
          ] },
          { id: '7', heading: '7. Records', list: [
            'Holds and usage decisions: SAP QM.',
            'Immobilised pallets and held shipments: Mecalux Easy WMS.',
            'Assessment evidence: Elara.'
          ] }
        ]
      },
      {
        code: 'PNT-CAL-020',
        title: 'Customer complaint handling and 8D report',
        short: 'Complaints and 8D report',
        type: 'Procedure',
        version: '5',
        date: '2025-12-15',
        owner: 'Plant Quality',
        summary: 'Acknowledgement within 24 h, containment within 48 h and 8D report within the deadline agreed with the customer (by default, 5 working days).',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'Acknowledgement within 24 h, containment within 48 h and 8D report within the deadline agreed with the customer (by default, 5 working days).'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Handle complaints from customers, and from consumers that reach us through them, until they are closed with an 8D report. It includes those received by the sales subsidiaries, such as EC Foods UK in the United Kingdom.'
          ] },
          { id: '2', heading: '2. Deadlines', list: [
            'Acknowledgement to the customer: 24 h from receipt.',
            'Containment: 48 h to identify and place on hold the stock of the lot complained about (PNT-CAL-015).',
            '8D report: within the deadline agreed with the customer; if no deadline has been agreed, 5 working days.'
          ] },
          { id: '3', heading: '3. Classification', text: [
            'High severity: hard or sharp foreign bodies of 7 mm or more, even without injury; undeclared allergens; any suspicion of microbiological risk. The Plant Quality Manager is informed the same day.',
            'Medium severity: quality defects with no health risk (appearance, size grade, weight or packaging).'
          ] },
          { id: '4', heading: '4. Investigation', text: [
            'The investigation of a foreign-body complaint reviews, as a minimum:'
          ], list: [
            'Lot traceability backwards (field, intake, line and shift) and forwards (pallets and shipments).',
            'Line records on the production date: destoner, optical sorter and metal detector.',
            'Maintenance history of the line’s foreign-body control equipment, including open work orders.',
            'Similar complaints in the last 12 months at any plant in the group.'
          ] },
          { id: '5', heading: '5. 8D report', text: [
            'The 8D report is prepared in Elara and follows eight steps:'
          ], list: [
            'D1 · Team: Plant Quality, Production and Line Maintenance.',
            'D2 · Description of the problem with the customer’s data.',
            'D3 · Containment: stock on hold and product held by the customer.',
            'D4 · Root cause, confirmed with evidence.',
            'D5 · Corrective actions.',
            'D6 · Implementation and verification of effectiveness.',
            'D7 · Prevention: changes to procedures, maintenance plans or training.',
            'D8 · Closure and communication to the customer.'
          ] },
          { id: '6', heading: '6. Reply to the customer', text: [
            'The reply is written in the customer’s language and approved by the Plant Quality Manager before it is sent.',
            'A cause is only communicated as confirmed when there is evidence; until then it is presented as a hypothesis under investigation.'
          ] },
          { id: '7', heading: '7. Revision history', text: [
            'Rev. 5 (15/12/2025): review of the destoner maintenance history added to foreign-body complaints, as an action from NC-2025-0388.'
          ] }
        ]
      },
      {
        code: 'PNT-CAL-031',
        title: 'Foreign-body control: destoners, optical sorters and metal detectors',
        short: 'Foreign-body control',
        type: 'Procedure',
        version: '7',
        date: '2026-04-02',
        owner: 'Plant Quality',
        summary: 'The metal detector is a CCP: verification with test pieces every 2 h. If that is exceeded, the product packed since the last correct verification is held.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'The metal detector is a CCP: verification with test pieces every 2 h. If that is exceeded, the product packed since the last correct verification is held.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Prevent foreign bodies (stones, clods, glass, metal and extraneous vegetable matter) in finished product. It applies to lines L1 to L5 in Fustiñana.'
          ] },
          { id: '2', heading: '2. Control barriers', text: [
            'Each line combines successive barriers; none replaces another:'
          ], list: [
            'Cleaner-aspirator: removes soil, leaves and light material.',
            'Destoner: separates stones and clods by density; its screen is maintained under IT-MAN-DP-02.',
            'Optical sorter: rejects pieces by colour and shape after the IQF tunnel.',
            'Metal detector after packing: it is a critical control point (CCP) of the HACCP plan.'
          ] },
          { id: '3', heading: '3. Optical sorters', text: [
            'Each sorter has a reference reject rate per product, set in MES Mapex (for example, 1.5 % for peas).'
          ], list: [
            'Reject rate above 2.5 %: the operator checks the product infeed and the upstream barriers, especially the destoner.',
            'Reject rate above 4 %: immediate alert to Shift Quality and Line Maintenance, and reinforced sampling of finished product.'
          ] },
          { id: '4', heading: '4. Metal detector (CCP)', text: [
            'The metal detector is a CCP. It is verified with certified test pieces of Fe 2.0 mm, non-ferrous 2.5 mm and stainless steel 3.0 mm at the start of the shift, every 2 h and at the end of production.',
            'If a verification fails or more than 2 h pass without verification, all product packed since the last correct verification is held and run through the detector again once the equipment has been corrected.',
            'Rejected product falls into a locked container; only Quality opens it and records its contents.'
          ] },
          { id: '5', heading: '5. Records', list: [
            'Detector verifications: CCP sheet in Elara, signed by the operator and reviewed by Quality.',
            'Sorter reject rates: MES Mapex, by shift.',
            'Destoner screen inspections: CMMS (IT-MAN-DP-02).'
          ] },
          { id: '6', heading: '6. References', refs: true, list: [
            'IT-MAN-DP-02 · Inspection and replacement of destoner screens.',
            'HACCP plan of the Fustiñana plant.'
          ] }
        ]
      },
      {
        code: 'PNT-CAL-034',
        title: 'Environmental monitoring of Listeria monocytogenes',
        short: 'Environmental Listeria monitoring',
        type: 'Procedure',
        version: '2',
        date: '2026-06-30',
        owner: 'Plant Quality',
        summary: 'Environmental sampling by zone after blanching; zone 1 is sampled every week on every line. A positive in zone 1 holds the product made since the last verified cleaning and requires three negative samplings to return to the normal frequency.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'Environmental sampling by zone after blanching; zone 1 is sampled every week on every line. A positive in zone 1 holds the product made since the last verified cleaning and requires three negative samplings to return to the normal frequency.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Detect Listeria in the production environment in time and prevent it from reaching the product. It applies to the post-blanching areas of lines L1 to L5 in Fustiñana: IQF tunnels, optical sorters, packing and adjoining rooms.'
          ] },
          { id: '2', heading: '2. Sampling zones', list: [
            'Zone 1: product-contact surfaces after blanching (belts, IQF tunnel, optical sorter, hoppers and packing scales).',
            'Zone 2: nearby non-contact surfaces (frames, housings and control panels).',
            'Zone 3: rest of the processing room (floors, drains, walls and ceilings).',
            'Zone 4: areas outside production (changing rooms, corridors and packaging store).'
          ] },
          { id: '3', heading: '3. Frequencies', text: [
            'Minimum environmental sampling frequencies:'
          ], list: [
            'Zone 1: weekly on every line, with the line in production.',
            'Zone 2: weekly.',
            'Zone 3: every two weeks, with priority on drains and points with standing water.',
            'Zone 4: monthly.'
          ] },
          { id: '4', heading: '4. Additional sampling', text: [
            'In addition to the minimum frequencies, sampling is carried out after building works, after breakdowns that require zone 1 equipment to be opened and after every end-of-season deep clean.'
          ] },
          { id: '5', heading: '5. Action on a positive result', text: [
            'Listeria spp. positive in zone 1: the product made on that line since the last verified cleaning is held until the Listeria monocytogenes result is known, the area is deep-cleaned and disinfected and samples are taken around the positive point.',
            'The line returns to the normal frequency after three consecutive negative samplings at that point.',
            'Positive in zones 2 or 3: reinforced cleaning and new sampling within 24 to 48 h; if it recurs, the cause is investigated with Line Maintenance.',
            'Every positive is reported the same day to the Plant Quality Manager and recorded in Elara.'
          ] },
          { id: '6', heading: '6. Finished product', text: [
            'Finished product is analysed according to the annual testing plan. Listeria monocytogenes results are assessed under Regulation (EC) 2073/2005, as amended by Regulation (EU) 2024/2895, applicable from 01/07/2026.'
          ] },
          { id: '7', heading: '7. Revision history', refs: true, text: [
            'Rev. 2 (30/06/2026): update for Regulation (EU) 2024/2895.'
          ] }
        ]
      },
      {
        code: 'IT-MAN-DP-02',
        title: 'Inspection and replacement of destoner screens',
        short: 'Destoner screens',
        type: 'Work instruction',
        version: '3',
        date: '2025-12-10',
        owner: 'Line Maintenance',
        summary: 'Weekly screen inspection; if there is wear, scheduled replacement and reinforced inspection until it is changed.',
        sections: [
          { id: 'R', heading: 'Summary', text: [
            'Weekly screen inspection; if there is wear, scheduled replacement and reinforced inspection until it is changed.'
          ] },
          { id: '1', heading: '1. Purpose and scope', text: [
            'Keep the destoners separating effectively. It applies to the destoners at every plant in the group; in Fustiñana, to DP-2 (line L2, peas and green beans).'
          ] },
          { id: '2', heading: '2. Weekly inspection', text: [
            'Once a week, with the line stopped and locked out, Line Maintenance inspects the screen and records the result in the CMMS:'
          ], list: [
            'Tears, deformation and play in the frame.',
            'Wear of the screen aperture, measured with a gauge at five points.',
            'Condition of the seals and of the stone ejection system.'
          ] },
          { id: '3', heading: '3. Wear criterion', text: [
            'There is wear when the screen aperture exceeds the nominal size by more than 10 % at any measured point, or when there are tears or deformation.'
          ] },
          { id: '4', heading: '4. Action when worn', text: [
            'A work order is opened with the scheduled replacement of the screen and Shift Quality is informed the same day.',
            'Until replacement, reinforced inspection: visual check at the start of every shift, noted on the line route sheet, and monitoring of the reject rate of the optical sorter downstream of the tunnel.',
            'If the screen is torn, the line does not start until it has been replaced.'
          ] },
          { id: '5', heading: '5. Replacement and verification', text: [
            'After the screen is changed, separation is verified with 10 test stones of 6 to 10 mm: the destoner must separate all 10. The result is recorded on the work order before it is closed.'
          ] },
          { id: '6', heading: '6. Revision history', text: [
            'Rev. 3 (10/12/2025): reinforced inspection until screen replacement added, as an action from NC-2025-0388 (stone in spinach, leaf line at the Alfaro plant).'
          ] }
        ]
      },
      {
        code: 'FT-UK-GUI-1000',
        title: 'Finished product specification · Peas 1 kg (Garden Peas 1kg)',
        short: 'Specification · Peas 1 kg (United Kingdom)',
        type: 'Product specification',
        version: '2',
        date: '2026-03-03',
        owner: 'Plant Quality',
        summary: 'Private-label IQF peas for the United Kingdom (line L2): no allergens, zero tolerance for stones, glass and metal, storage at −18 °C or below and a 24-month best-before.',
        sections: [
          { id: '1', heading: '1. Product', text: [
            'Shelled peas (Pisum sativum), blanched and quick-frozen by IQF. Private label of a UK retailer, sold through EC Foods UK. Made in Fustiñana, on line L2.'
          ] },
          { id: '2', heading: '2. Ingredients and allergens', text: [
            'Ingredients: peas (100 %).',
            'Allergens: contains none of the 14 allergens requiring mandatory declaration under Regulation (EU) 1169/2011. No cross-contamination risk identified (MAT-ALE-FUS).'
          ] },
          { id: '3', heading: '3. Physical specification', list: [
            'Maturity at intake: tenderometer 95 to 120 TR.',
            'Size grade: 7.5 to 10.2 mm.',
            'Stones, glass and metal: absent (zero tolerance).',
            'Extraneous vegetable matter (pods, leaves): at most 2 pieces per kg.',
            'Defective peas (spotted or split): at most 3 % by weight.'
          ] },
          { id: '4', heading: '4. Microbiology', list: [
            'Escherichia coli: below 100 cfu/g.',
            'Listeria monocytogenes: absent in 25 g, according to the testing plan (PNT-CAL-034).',
            'Aerobic mesophilic count: below 100,000 cfu/g.'
          ] },
          { id: '5', heading: '5. Storage and shelf life', text: [
            'Store at −18 °C or below. Best before: 24 months from production, in MM/YYYY format.',
            'Once thawed, do not refreeze. Cook before eating.'
          ] },
          { id: '6', heading: '6. Packaging and palletisation', list: [
            '1 kg bag; 10 bags per case; 80 cases per pallet (800 kg net).',
            'GS1-128 pallet label with SSCC, lot and best-before date.'
          ] },
          { id: '7', heading: '7. Lot code', text: [
            'Format L<yy>-<Julian day>-<plant>-<product>-<no.>. Example: L26-231-FUS-GUI-01 is lot 01 of peas made in Fustiñana on day 231 of 2026 (19/08/2026).'
          ] }
        ]
      },
      {
        code: 'MAT-ALE-FUS',
        title: 'Allergen matrix · Fustiñana plant',
        short: 'Allergen matrix',
        type: 'Matrix',
        version: '9',
        date: '2026-06-30',
        owner: 'HACCP team',
        summary: 'None of the 14 allergens requiring mandatory declaration is handled in Fustiñana, and no cross-contamination risk has been identified on lines L1 to L5.',
        sections: [
          { id: '1', heading: '1. Scope', text: [
            'Records, by product and line, the presence of the 14 allergens requiring mandatory declaration under Regulation (EU) 1169/2011 at the Fustiñana plant. It is reviewed with every new recipe, raw material or supplier.'
          ] },
          { id: '2', heading: '2. Plant status', text: [
            'None of the 14 allergens is handled at the Fustiñana plant: all recipes are vegetables or vegetable mixes, and the griddled bulk products that arrive from Arguedas are declared allergen-free in their specification.',
            'No allergen cross-contamination risk has been identified on lines L1 to L5.'
          ] },
          { id: '3', heading: '3. Matrix by product', list: [
            'UK-GUI-1000 · Peas 1 kg (Garden Peas 1kg) · line L2 · contains: none · may contain: none.',
            'VL-GUI-1000 · Fine peas 1 kg · line L4 · contains: none · may contain: none.',
            'EC-BRO-2500 · Broccoli florets 2.5 kg · line L4 · contains: none · may contain: none.',
            'FR-JUD-1000 · Round green beans 1 kg · line L3 · contains: none · may contain: none.',
            'US-MAI-450 · Sweetcorn 450 g · line L1 · contains: none · may contain: none.',
            'UK-MIX-600 · Griddled vegetable stir-fry 600 g · line L5 · contains: none · may contain: none.',
            'VL-ESP-1000 · Spinach portions 1 kg · packed at the Alfaro plant; Fustiñana only stores and dispatches it · contains: none · may contain: none.'
          ] },
          { id: '4', heading: '4. Change control', text: [
            'Any new recipe, raw material or supplier with any of the 14 allergens requires prior assessment by the HACCP team and an update of this matrix before it enters the plant.',
            'Bringing food into production areas is forbidden, including tree nuts and sesame.'
          ] }
        ]
      }
    ],

    unindexed: {
      'PNT-CAL-018': { title: 'Product traceability and recall', mentionedIn: { doc: 'PNT-CAL-015', sec: '6', quote: 'under PNT-CAL-018 (Product traceability and recall)' } }
    },

    suggested: ['camara', 'liberar', 'plazos', 'detector', 'malla', 'listeria'],

    intents: [
      {
        id: 'camara', icon: 'thermometer', topic: 'Cold chain · temperature excursions', scope: 'local',
        q: 'What should we do if a cold room goes above −18 °C?',
        anchors: ['cold room', 'cold rooms', 'chamber', 'excursion', 'temperature', 'cold', '18', 'silo', 'silos', 'freezer'],
        terms: ['exceeds', 'exceed', 'above', 'goes', 'rises', 'warm', 'warms', 'alarm', 'hold', 'block', 'act', 'action', 'break', 'chain', 'pallets', 'minutes', '15', 'criterion', 'critical', 'door', 'open'],
        min: 3,
        blocks: [
          { t: 'If the air temperature goes above −18 °C for more than 15 consecutive min, all exposed pallets are placed on hold and not dispatched until they have been assessed.', c: [['PNT-CAL-012', 4, 'If the air temperature goes above −18 °C for more than 15 consecutive min, all exposed pallets are placed on hold']] },
          { t: 'If at any time it goes above −15 °C, the excursion is critical: in addition to the hold, a non-conformity is opened in Elara and the Plant Quality Manager is informed.', c: [['PNT-CAL-012', 4, 'If at any time it goes above −15 °C, the excursion is critical']] },
          { t: 'The hold is recorded at the same time in SAP QM and in Mecalux Easy WMS, which does not allow a pallet on hold to be loaded.', c: [['PNT-CAL-015', 3, 'Every hold is recorded at the same time in SAP QM (lot with quality hold) and in Mecalux Easy WMS (pallets immobilised and shipments held).']] },
          { t: 'Each exposed lot is assessed before dispatch: product temperature with a probe, sensory analysis and disposition decision (release, downgrade or destroy).', c: [['PNT-CAL-012', 5, 'Exposed pallets are assessed by lot before any dispatch.']] },
          { t: 'The Dispatch Shift Supervisor is notified through Microsoft Teams to hold back loads with exposed pallets.', c: [['PNT-CAL-012', 6, 'The Dispatch Shift Supervisor is notified through Microsoft Teams to hold back the planned loads with exposed pallets.']] }
        ],
        context: {
          systems: ['SCADA Galileo', 'Mecalux Easy WMS'],
          text: 'Today’s alarm ALM-C07-0550 in C-07: 50 min above −18 °C and 20 min above −15 °C, peaking at −13.9 °C at 06:25. Under section 4 it is a critical excursion: hold on the 38 exposed pallets (6 lots) and a non-conformity in Elara.',
          outcome: 'alarma',
          go: 'alarma', goLabel: 'Open alarm C-07'
        },
        followups: ['liberar', 'mismo-lote']
      },
      {
        id: 'mismo-lote', icon: 'layers', topic: 'Cold chain · scope of the hold', scope: 'local',
        q: 'Do pallets of the same lot in other locations have to be placed on hold?',
        anchors: ['locations', 'location', 'same lot', 'other cold rooms', 'other silos', 'rest of the lot', 'other locations', 'elsewhere'],
        terms: ['hold', 'block', 'pallets', 'lot', 'silo', 'silos', 'assess', 'assessed', 'same'],
        min: 3,
        blocks: [
          { t: 'Not automatically: they are flagged “to be assessed” and the Shift Quality Manager decides their scope in light of the results.', c: [['PNT-CAL-012', 4, 'they are flagged “to be assessed” and the Shift Quality Manager decides their scope in light of the results']] },
          { t: 'If the assessment allows the affected pallets to be separated from those that are not, the lot can be released by pallet (SSCC).', c: [['PNT-CAL-015', 5, 'A lot may be released by pallet (SSCC) when the assessment allows the affected pallets to be separated from those that are not.']] }
        ],
        context: {
          systems: ['Mecalux Easy WMS'],
          text: 'The 6 lots exposed in C-07 also have 47 pallets in the silos (SIL-1: 12 · SIL-2: 7 · SIL-3: 10 · SIL-4: 18). They are flagged “to be assessed”, with no automatic hold.',
          go: 'alarma', goLabel: 'Open alarm C-07'
        },
        followups: ['liberar', 'evaluacion']
      },
      {
        id: 'responsables', icon: 'users', topic: 'Cold chain · responsibilities', scope: 'local',
        q: 'Who does what in a temperature excursion?',
        anchors: ['responsible', 'responsibility', 'responsibilities', 'refrigeration maintenance', 'dispatch shift supervisor', 'who does what'],
        terms: ['excursion', 'temperature', 'cold room', 'alarm', 'cold', 'who', 'does', 'decides', 'approves'],
        min: 4,
        blocks: [
          { intro: { t: 'Who does what in an excursion:' }, list: [
            { t: 'Shift Quality Manager: assesses the excursion, approves the hold and decides on the product assessment.', c: [['PNT-CAL-012', 3, 'Shift Quality Manager: assesses the excursion, approves the hold and decides on the product assessment.']] },
            { t: 'Dispatch Shift Supervisor: holds back loads with exposed pallets until Quality decides.', c: [['PNT-CAL-012', 3, 'Dispatch Shift Supervisor: holds back loads with exposed pallets until Quality decides.']] },
            { t: 'Refrigeration Maintenance: restores the temperature, investigates the cause and records the intervention.', c: [['PNT-CAL-012', 3, 'Refrigeration Maintenance: restores the temperature, investigates the cause and records the intervention.']] }
          ] },
          { t: 'If the excursion is critical, the Plant Quality Manager is also informed.', c: [['PNT-CAL-012', 4, 'a non-conformity is opened in Elara and the Plant Quality Manager is informed']] }
        ],
        context: {
          systems: ['SCADA Galileo', 'Microsoft Teams'],
          text: 'In today’s C-07 alarm, Refrigeration Maintenance has to confirm the cause hypothesis: the EV-07 defrost (05:40–06:05) overlapped with a closing failure of rapid door P-07 (door-open sensor 05:52–06:31).',
          go: 'alarma', goLabel: 'Open alarm C-07'
        },
        followups: ['camara', 'liberar']
      },
      {
        id: 'evaluacion', icon: 'flask', topic: 'Cold chain · product assessment', scope: 'local',
        q: 'How is product exposed to an excursion assessed?',
        anchors: ['assessed', 'assess', 'assessment', 'probe', 'sensory', 'disposition', 'evaluate', 'evaluation'],
        terms: ['product', 'exposed', 'pallets', 'excursion', 'temperature', 'cold room', 'lot', 'measure', 'measured'],
        min: 3,
        blocks: [
          { intro: { t: 'The assessment is done by lot and before any dispatch:', c: [['PNT-CAL-012', 5, 'Exposed pallets are assessed by lot before any dispatch.']] }, list: [
            { t: 'Product temperature with a probe on the exposed pallets, in the outer layer and in the centre.', c: [['PNT-CAL-012', 5, 'Measure the product temperature with a probe on the exposed pallets (outer layer and centre).']] },
            { t: 'Sensory and appearance analysis by lot: ice crystals and clumping.', c: [['PNT-CAL-012', 5, 'Sensory and appearance analysis (ice crystals, clumping) by lot.']] },
            { t: 'Disposition decision by lot: release, downgrade or destroy.', c: [['PNT-CAL-012', 5, 'Disposition decision by lot: release, downgrade or destroy.']] }
          ] },
          { t: 'The usage decision is recorded in SAP QM and requires documented evidence.', c: [['PNT-CAL-015', 4, 'Release requires documented evidence: assessment results, analyses where applicable and a signed conclusion.']] }
        ],
        followups: ['liberar', 'camara']
      },
      {
        id: 'liberar', icon: 'unlock', topic: 'Product hold and release', scope: 'local',
        q: 'Who can release a lot on hold?',
        anchors: ['release', 'released', 'releases', 'releasing', 'unblock', 'lift the hold', 'usage decision'],
        terms: ['who', 'lot', 'hold', 'held', 'blocked', 'product', 'pallets', 'sign', 'signs', 'authorise', 'authorize', 'can'],
        min: 3,
        blocks: [
          { t: 'Only the Quality Manager: the plant manager or, by delegation, the shift manager.', c: [['PNT-CAL-015', 2, 'Only the Quality Manager (the plant manager or, by delegation, the shift manager) may release product on hold.']] },
          { t: 'Release requires documented evidence (assessment results, analyses where applicable and a signed conclusion) and is recorded as a usage decision in SAP QM: release, downgrade or destroy.', c: [['PNT-CAL-015', 4, 'Release requires documented evidence: assessment results, analyses where applicable and a signed conclusion.'], ['PNT-CAL-015', 4, 'The usage decision is recorded in SAP QM and may be release, downgrade (industrial use or second grade) or destroy.']] },
          { t: 'No product is released by default or because a deadline has passed.', c: [['PNT-CAL-015', 4, 'No product is released by default or because a deadline has passed.']] },
          { t: 'If the assessment allows it, the lot can be released by pallet (SSCC).', c: [['PNT-CAL-015', 5, 'A lot may be released by pallet (SSCC)']] }
        ],
        followups: ['registro', 'expedido']
      },
      {
        id: 'bloqueo-quien', icon: 'user-check', topic: 'Product hold · who decides', scope: 'local',
        q: 'Who decides on a quality hold?',
        anchors: ['hold', 'holds', 'block', 'blocking', 'quality hold'],
        terms: ['who', 'decides', 'decide', 'approves', 'authorises', 'authorizes', 'proposes', 'manager', 'signs'],
        min: 4,
        blocks: [
          { t: 'Any shift supervisor may propose a hold on detecting a deviation.', c: [['PNT-CAL-015', 2, 'Any shift supervisor may propose a hold on detecting a deviation.']] },
          { t: 'It is approved by the Shift Quality Manager, who also defines its scope.', c: [['PNT-CAL-015', 2, 'The Shift Quality Manager approves the hold and defines its scope.']] },
          { t: 'In a temperature excursion, the Shift Quality Manager assesses the excursion, approves the hold and decides on the product assessment.', c: [['PNT-CAL-012', 3, 'Shift Quality Manager: assesses the excursion, approves the hold and decides on the product assessment.']] },
          { t: 'Releasing, on the other hand, can only be done by the Quality Manager: the plant manager or, by delegation, the shift manager.', c: [['PNT-CAL-015', 2, 'Only the Quality Manager (the plant manager or, by delegation, the shift manager) may release product on hold.']] }
        ],
        followups: ['liberar', 'registro']
      },
      {
        id: 'registro', icon: 'lock', topic: 'Hold and release · recording', scope: 'local',
        q: 'Where is a quality hold recorded?',
        anchors: ['recorded', 'record', 'register', 'registered', 'sap qm', 'easy wms', 'immobilise', 'immobilised'],
        terms: ['hold', 'block', 'blocked', 'quality', 'pallets', 'lot', 'where'],
        min: 3,
        blocks: [
          { t: 'At the same time in SAP QM (lot with quality hold) and in Mecalux Easy WMS (pallets immobilised and shipments held).', c: [['PNT-CAL-015', 3, 'Every hold is recorded at the same time in SAP QM (lot with quality hold) and in Mecalux Easy WMS (pallets immobilised and shipments held).']] },
          { t: 'Easy WMS does not allow a pallet on hold to be loaded.', c: [['PNT-CAL-015', 3, 'Easy WMS does not allow a pallet on hold to be loaded.']] },
          { t: 'The record includes the reason, the scope (lots, SSCCs and locations), the source reference and who approves it.', c: [['PNT-CAL-015', 3, 'The record includes the reason, the scope (lots, SSCCs and locations), the source reference (alarm, non-conformity or complaint) and who approves it.']] }
        ],
        followups: ['liberar']
      },
      {
        id: 'expedido', icon: 'truck', topic: 'Product already dispatched', scope: 'local', kind: 'partial',
        q: 'What happens if the affected product has already been dispatched?',
        anchors: ['=dispatched', '=shipped', 'already left', 'has left', 'at the customer', 'already shipped'],
        terms: ['product', 'lot', 'affected', 'hold', 'pallets', 'customer', 'recall', 'withdrawal'],
        min: 2,
        blocks: [
          { t: 'If part of the lot has already been dispatched, the Plant Quality Manager assesses withdrawal or recovery under PNT-CAL-018 and informs the customer.', c: [['PNT-CAL-015', 6, 'the Plant Quality Manager assesses withdrawal or recovery under PNT-CAL-018 (Product traceability and recall)']] }
        ],
        note: 'PNT-CAL-018 (Product traceability and recall) is not among the indexed documents: the recall steps cannot be detailed from this search.',
        followups: ['liberar']
      },
      {
        id: 'plazos', icon: 'mail', topic: 'Customer complaints · deadlines', scope: 'all',
        q: 'What deadlines do we have to answer a customer complaint?',
        anchors: ['complaint', 'complaints', 'claim', 'claims', '8d'],
        terms: ['deadline', 'deadlines', 'time', 'answer', 'reply', 'respond', 'acknowledge', 'acknowledgement', 'days', 'hours', 'when', 'send', 'deliver', 'due', 'limit', 'handle', 'handling', 'process', 'procedure'],
        min: 3,
        blocks: [
          { intro: { t: 'Deadlines in the complaints procedure:' }, list: [
            { t: 'Acknowledgement to the customer within 24 h of receipt.', c: [['PNT-CAL-020', 2, 'Acknowledgement to the customer: 24 h from receipt.']] },
            { t: 'Containment within 48 h: identify and place on hold the stock of the lot complained about.', c: [['PNT-CAL-020', 2, 'Containment: 48 h to identify and place on hold the stock of the lot complained about (PNT-CAL-015).']] },
            { t: '8D report within the deadline agreed with the customer; if none has been agreed, 5 working days.', c: [['PNT-CAL-020', 2, '8D report: within the deadline agreed with the customer; if no deadline has been agreed, 5 working days.']] }
          ] },
          { t: 'The reply is written in the customer’s language and approved by the Plant Quality Manager before it is sent.', c: [['PNT-CAL-020', 6, 'The reply is written in the customer’s language and approved by the Plant Quality Manager before it is sent.']] }
        ],
        context: {
          systems: ['Elara'],
          text: 'Complaint UKC-44718 (EC Foods UK Ltd, EC subsidiary in the United Kingdom), received on 26/09/2026 at 10:14: the customer asks for the report within 5 working days, before 02/10/2026.',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open complaint UKC-44718'
        },
        followups: ['cuerpo-extrano', '8d']
      },
      {
        id: '8d', icon: 'list-checks', topic: 'Complaints · 8D report', scope: 'all',
        q: 'What must an 8D report include?',
        anchors: ['8d', 'eight disciplines', 'd1', 'd4', 'd8'],
        terms: ['report', 'include', 'includes', 'steps', 'content', 'contents', 'structure', 'sections', 'disciplines', 'parts', 'template'],
        min: 2,
        blocks: [
          { intro: { t: 'The 8D report is prepared in Elara and follows eight steps:', c: [['PNT-CAL-020', 5, 'The 8D report is prepared in Elara and follows eight steps:']] }, list: [
            { t: 'D1 · Team: Plant Quality, Production and Line Maintenance.' },
            { t: 'D2 · Description of the problem with the customer’s data.' },
            { t: 'D3 · Containment: stock on hold and product held by the customer.' },
            { t: 'D4 · Root cause, confirmed with evidence.' },
            { t: 'D5 · Corrective actions.' },
            { t: 'D6 · Implementation and verification of effectiveness.' },
            { t: 'D7 · Prevention: changes to procedures, maintenance plans or training.' },
            { t: 'D8 · Closure and communication to the customer.' }
          ] },
          { t: 'A cause is only communicated as confirmed when there is evidence; until then it is presented as a hypothesis under investigation.', c: [['PNT-CAL-020', 6, 'A cause is only communicated as confirmed when there is evidence; until then it is presented as a hypothesis under investigation.']] }
        ],
        followups: ['plazos', 'cuerpo-extrano']
      },
      {
        id: 'cuerpo-extrano', icon: 'search', topic: 'Complaints · foreign bodies', scope: 'all',
        q: 'How is a complaint about a stone or foreign body investigated?',
        anchors: ['stone', 'stones', 'foreign body', 'foreign bodies', 'foreign object', 'glass', 'plastic', 'pebble'],
        terms: ['complaint', 'complaints', 'claim', 'investigated', 'investigate', 'investigation', 'severity', 'classified', 'customer', 'consumer', 'mm'],
        min: 3,
        blocks: [
          { t: 'It is high severity: hard or sharp foreign bodies of 7 mm or more, even without injury. The Plant Quality Manager is informed the same day.', c: [['PNT-CAL-020', 3, 'High severity: hard or sharp foreign bodies of 7 mm or more, even without injury']] },
          { intro: { t: 'The investigation reviews as a minimum:', c: [['PNT-CAL-020', 4, 'The investigation of a foreign-body complaint reviews, as a minimum:']] }, list: [
            { t: 'Lot traceability backwards (field, intake, line and shift) and forwards (pallets and shipments).' },
            { t: 'Destoner, optical sorter and metal detector records on the production date.' },
            { t: 'The maintenance history of that equipment, including open work orders.', c: [['PNT-CAL-020', 4, 'Maintenance history of the line’s foreign-body control equipment, including open work orders.']] },
            { t: 'Similar complaints in the last 12 months at any plant in the group.' }
          ] },
          { t: 'In the reply to the customer, the cause is presented as a hypothesis until there is evidence.', c: [['PNT-CAL-020', 6, 'A cause is only communicated as confirmed when there is evidence']] }
        ],
        context: {
          systems: ['Elara', 'GMAO'],
          text: 'UKC-44718: 8 mm stone in lot L26-231-FUS-GUI-01 (L2, 19/08/2026), high severity under section 3. Destoner DP-2 has had OT-26-07415 open since 18/08/2026 and there is a similar complaint: RCL-2025-0311 (stone of about 6 mm in spinach portions, NC-2025-0388).',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open complaint UKC-44718'
        },
        followups: ['malla', '8d']
      },
      {
        id: 'detector', icon: 'shield-check', topic: 'Foreign bodies · metal detector (CCP)', scope: 'local',
        q: 'How often is the metal detector verified and what happens if it fails?',
        anchors: ['detector', 'detectors', 'metal', 'metals', 'test pieces', 'test piece', 'ccp'],
        terms: ['verified', 'verify', 'verification', 'checked', 'how often', 'frequency', 'fails', 'failure', 'hours', 'hold', 'held', 'reject', 'rejected'],
        min: 2,
        blocks: [
          { t: 'The metal detector is a CCP. It is verified with certified test pieces of Fe 2.0 mm, non-ferrous 2.5 mm and stainless steel 3.0 mm at the start of the shift, every 2 h and at the end of production.', c: [['PNT-CAL-031', 4, 'It is verified with certified test pieces of Fe 2.0 mm, non-ferrous 2.5 mm and stainless steel 3.0 mm at the start of the shift, every 2 h and at the end of production.']] },
          { t: 'If a verification fails or more than 2 h pass without verification, all product packed since the last correct verification is held and run through the detector again once the equipment has been corrected.', c: [['PNT-CAL-031', 4, 'If a verification fails or more than 2 h pass without verification, all product packed since the last correct verification is held']] },
          { t: 'Rejected product falls into a locked container that only Quality opens.', c: [['PNT-CAL-031', 4, 'Rejected product falls into a locked container; only Quality opens it and records its contents.']] },
          { t: 'Each verification is recorded on the CCP sheet in Elara, signed by the operator and reviewed by Quality.', c: [['PNT-CAL-031', 5, 'Detector verifications: CCP sheet in Elara, signed by the operator and reviewed by Quality.']] }
        ],
        context: {
          systems: ['MES Mapex', 'Elara'],
          text: 'DM-1 (line L1) has gone 3.5 h without verification (maximum 2 h); the last correct verification was at 02:30. Under section 4 the product packed on L1 since then must be held; the hold is approved by Quality (PNT-CAL-015).',
          go: 'turno', goLabel: 'View daily report'
        },
        followups: ['optica', 'malla']
      },
      {
        id: 'optica', icon: 'eye', topic: 'Foreign bodies · optical sorters', scope: 'local',
        q: 'What should we do if the optical sorter rejects more than normal?',
        anchors: ['optical', 'sorter', 'sorters', 'optical sorter'],
        terms: ['reject', 'rejects', 'rejection', 'rate', 'percentage', 'normal', 'high', 'rises', 'reference', 'do'],
        min: 2,
        blocks: [
          { t: 'Each sorter has a reference reject rate per product, set in MES Mapex (1.5 % for peas).', c: [['PNT-CAL-031', 3, 'Each sorter has a reference reject rate per product, set in MES Mapex (for example, 1.5 % for peas).']] },
          { list: [
            { t: 'Above 2.5 %, the operator checks the product infeed and the upstream barriers, especially the destoner.', c: [['PNT-CAL-031', 3, 'Reject rate above 2.5 %: the operator checks the product infeed and the upstream barriers, especially the destoner.']] },
            { t: 'Above 4 %, immediate alert to Shift Quality and Line Maintenance, and reinforced sampling of finished product.', c: [['PNT-CAL-031', 3, 'Reject rate above 4 %: immediate alert to Shift Quality and Line Maintenance, and reinforced sampling of finished product.']] }
          ] }
        ],
        context: {
          systems: ['MES Mapex', 'GMAO'],
          text: 'Optical sorter OPT-2 (L2) is rejecting 4.8 % today (reference 1.5 %), above 4 %. Destoner DP-2, upstream of OPT-2 on the same line, has its screen pending replacement (OT-26-07415).',
          go: 'turno', goLabel: 'View daily report'
        },
        followups: ['malla', 'detector']
      },
      {
        id: 'malla', icon: 'wrench', topic: 'Destoner · screen wear', scope: 'all',
        q: 'What should we do if the destoner screen is worn?',
        anchors: ['screen', 'screens', 'destoner', 'destoners', 'dp-2', 'dp2'],
        terms: ['wear', 'worn', 'torn', 'tear', 'broken', 'replace', 'replacement', 'change', 'do', 'work order', 'repair'],
        min: 2,
        blocks: [
          { t: 'A work order is opened with the scheduled replacement of the screen and Shift Quality is informed the same day.', c: [['IT-MAN-DP-02', 4, 'A work order is opened with the scheduled replacement of the screen and Shift Quality is informed the same day.']] },
          { t: 'Until replacement, reinforced inspection: visual check at the start of every shift, noted on the line route sheet, and monitoring of the reject rate of the optical sorter downstream of the tunnel.', c: [['IT-MAN-DP-02', 4, 'Until replacement, reinforced inspection: visual check at the start of every shift, noted on the line route sheet, and monitoring of the reject rate of the optical sorter downstream of the tunnel.']] },
          { t: 'If the screen is torn, the line does not start until it has been replaced.', c: [['IT-MAN-DP-02', 4, 'If the screen is torn, the line does not start until it has been replaced.']] },
          { t: 'After the change it is verified with 10 test stones of 6 to 10 mm: the destoner must separate all 10.', c: [['IT-MAN-DP-02', 5, 'After the screen is changed, separation is verified with 10 test stones of 6 to 10 mm: the destoner must separate all 10.']] }
        ],
        context: {
          systems: ['GMAO', 'MES Mapex'],
          text: 'DP-2 (L2): OT-26-07415 has been open since 18/08/2026 (42 days), awaiting a spare part. OPT-2 is rejecting 4.8 % (reference 1.5 %). Complaint UKC-44718 concerns an L2 lot made on 19/08/2026, one day after the wear was noted.',
          go: 'reclamacion', goLabel: 'Open complaint UKC-44718'
        },
        followups: ['optica', 'cuerpo-extrano']
      },
      {
        id: 'malla-inspeccion', icon: 'wrench', topic: 'Destoner · screen inspection', scope: 'all',
        q: 'How often is the destoner screen inspected?',
        anchors: ['screen', 'screens', 'destoner', 'destoners', 'dp-2', 'dp2'],
        terms: ['how often', 'frequency', 'weekly', 'week', 'inspected', 'inspect', 'inspection', 'checked', 'check', 'review', 'gauge'],
        min: 3,
        blocks: [
          { intro: { t: 'Once a week, with the line stopped and locked out; Line Maintenance records the result in the CMMS. The check covers:', c: [['IT-MAN-DP-02', 2, 'Once a week, with the line stopped and locked out, Line Maintenance inspects the screen and records the result in the CMMS:']] }, list: [
            { t: 'Tears, deformation and play in the frame.' },
            { t: 'Wear of the screen aperture, measured with a gauge at five points.' },
            { t: 'Condition of the seals and of the stone ejection system.' }
          ] },
          { t: 'There is wear when the screen aperture exceeds the nominal size by more than 10 % at any measured point, or when there are tears or deformation.', c: [['IT-MAN-DP-02', 3, 'There is wear when the screen aperture exceeds the nominal size by more than 10 % at any measured point, or when there are tears or deformation.']] },
          { t: 'When worn, and until it is replaced, the screen is checked at the start of every shift.', c: [['IT-MAN-DP-02', 4, 'visual check at the start of every shift']] }
        ],
        followups: ['malla']
      },
      {
        id: 'listeria', icon: 'flask', topic: 'Listeria · environmental sampling', scope: 'local',
        q: 'How often is Listeria sampled in the environment?',
        anchors: ['listeria', 'environmental', 'swabs', 'swab', 'environmental sampling'],
        terms: ['frequency', 'how often', 'sampled', 'sample', 'sampling', 'samples', 'environment', 'weekly', 'plan'],
        min: 2,
        blocks: [
          { intro: { t: 'Minimum environmental sampling frequencies:', c: [['PNT-CAL-034', 3, 'Minimum environmental sampling frequencies:']] }, list: [
            { t: 'Zone 1, product-contact surfaces after blanching: weekly on every line, with the line in production.', c: [['PNT-CAL-034', 2, 'Zone 1: product-contact surfaces after blanching']] },
            { t: 'Zone 2: weekly.' },
            { t: 'Zone 3: every two weeks, with priority on drains and points with standing water.' },
            { t: 'Zone 4: monthly.' }
          ] },
          { t: 'Sampling is also carried out after building works, after breakdowns that require zone 1 equipment to be opened and after every end-of-season deep clean.', c: [['PNT-CAL-034', 4, 'sampling is carried out after building works, after breakdowns that require zone 1 equipment to be opened and after every end-of-season deep clean.']] }
        ],
        followups: ['listeria-positivo']
      },
      {
        id: 'listeria-positivo', icon: 'flask', topic: 'Listeria · action on a positive', scope: 'local',
        q: 'What should we do after a Listeria positive in zone 1?',
        anchors: ['listeria', 'environmental', 'swabs', 'swab'],
        terms: ['positive', 'positives', 'detected', 'found', 'result', 'act', 'hold', 'contamination', 'zone', 'zones'],
        min: 3,
        blocks: [
          { t: 'The product made on that line since the last verified cleaning is held until the Listeria monocytogenes result is known; the area is deep-cleaned and disinfected and samples are taken around the positive point.', c: [['PNT-CAL-034', 5, 'the product made on that line since the last verified cleaning is held until the Listeria monocytogenes result is known']] },
          { t: 'The line returns to the normal frequency after three consecutive negative samplings at that point.', c: [['PNT-CAL-034', 5, 'The line returns to the normal frequency after three consecutive negative samplings at that point.']] },
          { t: 'In zones 2 or 3: reinforced cleaning and new sampling within 24 to 48 h.', c: [['PNT-CAL-034', 5, 'Positive in zones 2 or 3: reinforced cleaning and new sampling within 24 to 48 h']] },
          { t: 'Every positive is reported the same day to the Plant Quality Manager and recorded in Elara.', c: [['PNT-CAL-034', 5, 'Every positive is reported the same day to the Plant Quality Manager and recorded in Elara.']] }
        ],
        followups: ['listeria']
      },
      {
        id: 'ficha', icon: 'file-text', topic: 'Product specification · peas 1 kg (United Kingdom)', scope: 'local',
        q: 'What stone tolerance does the pea product specification allow?',
        anchors: ['tolerance', 'product specification', 'specification', 'specifications', 'spec', 'size grade', 'tenderometer'],
        terms: ['stones', 'stone', 'glass', 'metal', 'peas', 'pea', 'foreign', 'bodies', 'allow', 'allows', 'maximum'],
        min: 2,
        blocks: [
          { intro: { t: 'The specification for peas 1 kg for the United Kingdom (UK-GUI-1000) sets, among other things:', c: [['FT-UK-GUI-1000', 1, 'Shelled peas (Pisum sativum), blanched and quick-frozen by IQF.']] }, list: [
            { t: 'Stones, glass and metal: absent (zero tolerance).', c: [['FT-UK-GUI-1000', 3, 'Stones, glass and metal: absent (zero tolerance).']] },
            { t: 'Maturity at intake: tenderometer 95 to 120 TR.', c: [['FT-UK-GUI-1000', 3, 'Maturity at intake: tenderometer 95 to 120 TR.']] },
            { t: 'Extraneous vegetable matter: at most 2 pieces per kg.', c: [['FT-UK-GUI-1000', 3, 'Extraneous vegetable matter (pods, leaves): at most 2 pieces per kg.']] },
            { t: 'No allergens requiring mandatory declaration.', c: [['FT-UK-GUI-1000', 2, 'contains none of the 14 allergens requiring mandatory declaration']] },
            { t: 'Best before 24 months, stored at −18 °C or below.', c: [['FT-UK-GUI-1000', 5, 'Store at −18 °C or below. Best before: 24 months from production']] }
          ] }
        ],
        context: {
          systems: ['Elara'],
          text: 'UKC-44718: the customer reports an 8 mm stone in lot L26-231-FUS-GUI-01 of this product. The specification allows no stones (zero tolerance).',
          outcome: 'reclamacion',
          go: 'reclamacion', goLabel: 'Open complaint UKC-44718'
        },
        followups: ['vida-util', 'lote']
      },
      {
        id: 'vida-util', icon: 'snowflake', topic: 'Product specification · storage', scope: 'local',
        q: 'What is the shelf life of peas 1 kg and how are they stored?',
        anchors: ['shelf life', 'expiry', 'best before', 'store', 'stored', 'storage', 'thaw', 'thawed', 'refreeze'],
        terms: ['peas', 'pea', 'months', 'temperature', 'specification', 'product', 'freeze', 'years'],
        min: 2,
        blocks: [
          { t: 'For peas 1 kg for the United Kingdom (UK-GUI-1000), best before 24 months from production, in MM/YYYY format.', c: [['FT-UK-GUI-1000', 5, 'Best before: 24 months from production, in MM/YYYY format.']] },
          { t: 'They are stored at −18 °C or below; once thawed they are not refrozen, and they are cooked before eating.', c: [['FT-UK-GUI-1000', 5, 'Store at −18 °C or below.'], ['FT-UK-GUI-1000', 5, 'Once thawed, do not refreeze. Cook before eating.']] }
        ],
        followups: ['ficha', 'lote']
      },
      {
        id: 'lote', icon: 'barcode', topic: 'Lot code', scope: 'local',
        q: 'How do you read the lot code?',
        anchors: ['lot code', 'batch code', 'julian day', 'julian', 'lot format', 'l26'],
        terms: ['lot', 'code', 'read', 'reads', 'means', 'meaning', 'interpret', 'format', 'date'],
        min: 2,
        blocks: [
          { t: 'Format L<yy>-<Julian day>-<plant>-<product>-<no.>.', c: [['FT-UK-GUI-1000', 7, 'Format L<yy>-<Julian day>-<plant>-<product>-<no.>.']] },
          { t: 'For example, L26-231-FUS-GUI-01 is lot 01 of peas made in Fustiñana on day 231 of 2026, that is, 19/08/2026.', c: [['FT-UK-GUI-1000', 7, 'L26-231-FUS-GUI-01 is lot 01 of peas made in Fustiñana on day 231 of 2026 (19/08/2026).']] }
        ],
        context: {
          systems: ['SAP', 'MES Mapex', 'Mecalux Easy WMS'],
          text: 'Full trace of the example lot, backwards and forwards, with its 22 SSCCs:',
          lot: 'L26-231-FUS-GUI-01'
        },
        followups: ['vida-util', 'paletizacion']
      },
      {
        id: 'paletizacion', icon: 'pallet', topic: 'Product specification · packaging and palletisation', scope: 'local',
        q: 'How many cases go on a pallet of peas 1 kg?',
        anchors: ['palletisation', 'palletization', 'palletised', 'cases', 'case', 'bags per case', 'cases per pallet'],
        terms: ['pallet', 'pallets', 'peas', 'pea', 'how many', 'carries', 'kg', 'bag', 'bags', 'label'],
        min: 3,
        blocks: [
          { t: 'For peas 1 kg for the United Kingdom (UK-GUI-1000): 1 kg bag, 10 bags per case and 80 cases per pallet, with 800 kg net.', c: [['FT-UK-GUI-1000', 6, '1 kg bag; 10 bags per case; 80 cases per pallet (800 kg net).']] },
          { t: 'Each pallet carries a GS1-128 label with SSCC, lot and best-before date.', c: [['FT-UK-GUI-1000', 6, 'GS1-128 pallet label with SSCC, lot and best-before date.']] }
        ],
        followups: ['lote']
      },
      {
        id: 'alergenos', icon: 'leaf', topic: 'Allergens · Fustiñana plant', scope: 'local',
        q: 'Which allergens are handled in Fustiñana?',
        anchors: ['allergen', 'allergens', 'allergy', 'allergies', 'gluten', 'celery', 'soy', 'soya', 'sesame', 'tree nuts', 'nuts', 'peanut', 'peanuts', 'lactose', 'milk', 'egg', 'mustard', 'sulphites', 'sulfites', 'lupin', 'crustaceans', 'molluscs'],
        terms: ['fustiñana', 'plant', 'handled', 'contains', 'traces', 'matrix', 'product', 'cross'],
        min: 2,
        blocks: [
          { t: 'None of the 14 allergens requiring mandatory declaration is handled at the Fustiñana plant: all recipes are vegetables or vegetable mixes.', c: [['MAT-ALE-FUS', 2, 'None of the 14 allergens is handled at the Fustiñana plant']] },
          { t: 'No allergen cross-contamination risk has been identified on lines L1 to L5.', c: [['MAT-ALE-FUS', 2, 'No allergen cross-contamination risk has been identified on lines L1 to L5.']] },
          { t: 'A new recipe, raw material or supplier with allergens requires prior assessment by the HACCP team and an update of the matrix before it enters the plant.', c: [['MAT-ALE-FUS', 4, 'requires prior assessment by the HACCP team and an update of this matrix before it enters the plant.']] }
        ],
        /* If the question names a product, adds its row from the matrix (MAT-ALE-FUS §3), as in the reference demo. */
        build: (q) => {
          const K = window.CN_DOCS;
          const words = [
            { words: ['stir-fry', 'stir fry', 'mix', 'griddled', 'vegetable mix'], sku: 'UK-MIX-600' },
            { words: ['broccoli'], sku: 'EC-BRO-2500' },
            { words: ['green beans', 'green bean', 'beans'], sku: 'FR-JUD-1000' },
            { words: ['sweetcorn', 'corn', 'maize'], sku: 'US-MAI-450' },
            { words: ['spinach'], sku: 'VL-ESP-1000' },
            { words: ['garden', 'united kingdom', 'uk'], sku: 'UK-GUI-1000' },
            { words: ['peas', 'pea'], sku: 'VL-GUI-1000' }
          ];
          const C = (doc, sec, quote) => [doc, sec, quote];
          const blocks = [
            { t: 'None of the 14 allergens requiring mandatory declaration is handled at the Fustiñana plant: all recipes are vegetables or vegetable mixes.', c: [C('MAT-ALE-FUS', 2, 'None of the 14 allergens is handled at the Fustiñana plant')] },
            { t: 'No allergen cross-contamination risk has been identified on lines L1 to L5.', c: [C('MAT-ALE-FUS', 2, 'No allergen cross-contamination risk has been identified on lines L1 to L5.')] }
          ];
          if (K && typeof K.normalize === 'function') {
            const n = ` ${K.normalize(q)} `;
            const hit = words.find((p) => p.words.some((w) => n.includes(` ${K.normalize(w)} `)));
            const sec = hit ? K.section('MAT-ALE-FUS', '3') : null;
            const text = sec && (sec.list || []).find((t) => t.indexOf(hit.sku) === 0);
            if (text) blocks.push({ t: `${text.split(' · ')[1] || hit.sku} (${hit.sku}): contains no allergens or traces according to the matrix.`, c: [C('MAT-ALE-FUS', 3, text)] });
          }
          blocks.push({ t: 'A new recipe, raw material or supplier with allergens requires prior assessment by the HACCP team and an update of the matrix before it enters the plant.', c: [C('MAT-ALE-FUS', 4, 'requires prior assessment by the HACCP team and an update of this matrix before it enters the plant.')] });
          return { blocks, followups: ['ficha'] };
        },
        followups: ['ficha']
      }
    ],

    /* Questions about another group plant when the answer comes from a Fustiñana document (scope 'local'). */
    other_scopes: {
      topic: 'Another plant',
      words: ['arguedas', 'alfaro', 'olmedo', 'vega', 'alicante', 'formentera'],
      reason: 'The indexed documents on this topic belong to the Fustiñana plant; there is no evidence for {x}.'
    },

    gaps: [
      { id: 'simulacro', topic: 'Recall drill and product recall', anchors: ['drill', 'drills', 'recall', 'recalls', 'withdrawal', 'withdraw', 'recovery', 'mock'],
        reason: 'No indexed document describes the drill or the steps of a product recall.', related: 'PNT-CAL-018' },
      { id: 'defensa', topic: 'Food defence', anchors: ['food defence', 'food defense', 'sabotage', 'intrusion', 'vulnerability', 'fraud'],
        reason: 'No indexed document covers food defence or vulnerability to fraud.' },
      { id: 'residuos', topic: 'Pesticide residues and contaminants', anchors: ['pesticide', 'pesticides', 'residues', 'chlorate', 'chlorates', 'plant protection', 'nitrates', 'mycotoxins', 'heavy metals'],
        reason: 'No indexed document covers the control of pesticide residues, chlorate or other contaminants.' },
      { id: 'certificados', topic: 'Certificates and audits', anchors: ['certificate', 'certificates', 'certification', 'certifications', 'ifs', 'brcgs', 'brc', 'fssc', 'audit', 'audits', 'auditor'],
        reason: 'Certificates and audit reports are not among the indexed documents.' },
      { id: 'sostenibilidad', topic: 'Sustainability', anchors: ['sustainability', 'footprint', 'carbon', 'co2', 'emissions', 'recycling', 'recyclable'],
        reason: 'No indexed document covers sustainability or the environmental footprint.' },
      { id: 'precio', topic: 'Prices and costs', anchors: ['price', 'prices', 'cost', 'costs', 'costing', 'tariff', 'euros', 'invoicing', 'margin'],
        reason: 'Prices and costs are not part of the indexed Quality procedures.' },
      { id: 'personal', topic: 'Working conditions', anchors: ['holidays', 'holiday', 'payroll', 'salary', 'wage', 'collective agreement', 'headcount', 'contract', 'dismissal', 'working hours'],
        reason: 'Working conditions are not part of the indexed Quality procedures.' }
    ]
  }
});

/* Canonical summary by code (CN_DATA.procedures): filled in without overwriting what other files may have set.
   PNT-CAL-012 also carries the parameters other scenes use (thresholds and assessment steps). */
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
    'PNT-CAL-012': {
      limit_c: -18.0,
      critical_c: -15.0,
      min_minutes_for_hold: 15,
      evaluation: [
        'Measure the product temperature with a probe on the exposed pallets (outer layer and centre)',
        'Sensory and appearance analysis (ice crystals, clumping) by lot',
        'Disposition decision by lot: release, downgrade or destroy'
      ]
    }
  };
  Object.keys(extra).forEach((code) => {
    const cur = procs[code] = procs[code] || {};
    Object.keys(extra[code]).forEach((k) => { if (cur[k] == null) cur[k] = extra[code][k]; });
  });
})('congelados');
