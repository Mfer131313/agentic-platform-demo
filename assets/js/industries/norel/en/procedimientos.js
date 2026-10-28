/* Norel Nutrición Animal · Quality and Operations procedure search with citations (English). Demo scenario with synthetic data (MFM). */
agenticPackEn('norel', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedures',
    title: 'Ask the procedures',
    agent: 'Procedures',
    system: 'SharePoint',
    source: 'SharePoint · controlled Quality and Operations documents',
    indexed_at: '2026-10-26T06:00',
    doc_org: 'Norel Nutrición Animal · Quality',
    ui: {
      page_title: 'Quality and Operations procedure search',
      intro_title: 'Ask about the Premix plant (Spain) procedures',
      intro_text: 'Every sentence of the answer cites the document and the section it comes from. If no indexed document covers it, the search says so and does not answer.',
      placeholder: 'Type a question about the Quality and Operations procedures',
      context_title: 'Applied to the plant today',
      permission: 'Quality · Premix plant',
      asker_initials: 'RO',
      asker_role: 'Head of Operations and Quality',
      route_to: 'Quality and Food Safety'
    },
    report: {
      title: 'Quality and Operations procedure search',
      code_prefix: 'CON-PROC',
      filename: 'procedure-search',
      scope_label: 'Plant',
      scope: 'Madrid · Premix plant (Spain)'
    },
    presenter: {
      say: [
        'Search of the Quality and Operations procedures: the answer comes only from the controlled documents, and every sentence carries its citation to the document and section.',
        'Seven documents are indexed: manufacturing HACCP, Salmonella control, recall and traceability, cross-contamination, additive labelling, content verification and export. Here they are synthetic; in the pilot, your current ones.'
      ],
      say_empty: 'It helps to train new shift supervisors, to prepare customer and GMP+ audits and to answer with the exact reference.',
      say_answered: 'Clicking a citation opens the document with the exact passage highlighted. And the answer is cross-checked with what is happening today: the Salmonella alarm, recall campaign RET-2026-1028 or complaint CLM-2026-1028.',
      say_none: 'When there is no source it says so and invents nothing: no answer and no citation. If the topic is in a document that is not indexed, it names it (PR-CAL-010) and lets you route the question to Quality.',
      next_empty: 'Click "What should we do if a raw material tests positive for Salmonella?" and then citation 1 to see the highlighted passage.',
      next_answered: 'Type a question with no source, for example "What aflatoxin B1 limit do we apply?", and click "Ask".',
      next_done: 'Move on to the next scene with the right arrow.'
    },
    docs: [
      {
        code: 'PR-CAL-001',
        title: 'HACCP plan for premix manufacturing',
        short: 'Manufacturing HACCP',
        type: 'Procedure',
        version: '5',
        date: '2026-03-10',
        owner: 'Quality and Food Safety',
        summary: 'Four critical control points: raw material receipt, micro-ingredient dosing, homogeneous mixing and cross-contamination. Weekly record verification and annual audit of the plan.',
        sections: [
          {
            id: 'R',
            heading: 'Summary',
            text: [
              'Four critical control points: raw material receipt, micro-ingredient dosing, homogeneous mixing and cross-contamination. Weekly record verification and annual audit of the plan.'
            ]
          },
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: [
              'Define the HACCP plan for the manufacture of vitamin-mineral premixes and additives at the Premix plant (Spain), in line with Regulation (EC) 183/2005 (feed hygiene) and the GMP+ B2 scheme.',
              'It applies to all dosing, mixing and packing lines. Transport is governed by PR-EXP-002.'
            ]
          },
          {
            id: '2',
            heading: '2. HACCP team',
            list: [
              'Coordinator: Quality and Food Safety Manager (HACCP).',
              'Members: Plant Manager, Laboratory Manager and Norel Solutions (technical advisory).',
              'The team meets once a quarter and after any critical deviation.'
            ]
          },
          {
            id: '3',
            heading: '3. Critical control points',
            list: [
              'CCP 1 · Raw material receipt: Salmonella testing and verification of the certificate of analysis before the lot is released (PR-CAL-004).',
              'CCP 2 · Micro-ingredient dosing: weighing with double verification and a maximum tolerance of 2 % over the formula.',
              'CCP 3 · Homogeneous mixing: homogeneity test with a coefficient of variation below 5 %.',
              'CCP 4 · Cross-contamination: validated cleaning between products (PR-PRO-003).'
            ]
          },
          {
            id: '4',
            heading: '4. Corrective actions',
            text: [
              'After a deviation at a CCP, the lot is blocked in SAP QM and in the MES, and only the Quality and Food Safety Manager decides its fate: release, rework or destroy.',
              'No blocked lot is released by default or because a deadline has passed.'
            ]
          },
          {
            id: '5',
            heading: '5. Verification and review',
            list: [
              'Weekly verification of CCP records by Quality.',
              'Internal audit of the HACCP plan once a year.',
              'Full review of the plan when a line, a critical formula or a raw material supplier changes.'
            ]
          },
          {
            id: '6',
            heading: '6. Records',
            list: ['Analytical results: LIMS.', 'Holds and usage decisions: SAP S/4HANA (QM).', 'Dosing and mixing records: plant MES.']
          },
          { id: '7', heading: '7. Revision history', text: ['Rev. 5 (10/03/2026): the homogeneity test is added as CCP 3.'] }
        ]
      },
      {
        code: 'PR-CAL-004',
        title: 'Sampling and Salmonella control in raw materials',
        short: 'Salmonella control',
        type: 'Procedure',
        version: '4',
        date: '2026-02-16',
        owner: 'Laboratory',
        summary: 'Every lot of high-risk raw material is sampled on receipt and released on the supplier certificate until our own test confirms the result. A positive result blocks the lot and every batch made with it.',
        sections: [
          {
            id: 'R',
            heading: 'Summary',
            text: [
              'Every lot of high-risk raw material is sampled on receipt and released on the supplier certificate until our own test confirms the result. A positive result blocks the lot and every batch made with it.'
            ]
          },
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: [
              'Control Salmonella in the high-risk raw materials (choline chloride, vitamins, organic trace minerals and carriers) received at the plant.',
              'Mycotoxin control is governed by the analytical plan of each raw material and is not part of this procedure.'
            ]
          },
          {
            id: '2',
            heading: '2. Sampling',
            text: ['Every lot of high-risk raw material is sampled on receipt according to the LIMS sampling plan:'],
            list: [
              'Composite sample of at least 10 points per lot.',
              '25 g sample tested with the ISO 6579-1 reference method.',
              'Retained sample kept for 12 months.'
            ]
          },
          {
            id: '3',
            heading: '3. Conditional release',
            text: [
              'The lot is released to production with a compliant supplier certificate of analysis (conditional release) and stays flagged in SAP QM until our own Salmonella test in LIMS confirms the result, within 5 working days at most.'
            ]
          },
          {
            id: '4',
            heading: '4. Action on a positive result',
            text: [
              'A positive Salmonella result immediately blocks the lot and every product batch made with it.',
              'The Quality and Food Safety Manager decides what happens to the lot: destroy it or return it to the supplier.',
              'Product already shipped is located and PR-CAL-007 is activated within 2 h at most.'
            ]
          },
          {
            id: '5',
            heading: '5. Responsibilities',
            list: [
              'Laboratory Manager: runs the test, reports the result in LIMS and notifies the Quality and Food Safety Manager.',
              'Quality and Food Safety Manager: orders the hold and decides on disposal and recall.',
              'Plant Manager: stops use of the lot and holds the affected product batches.'
            ]
          },
          {
            id: '6',
            heading: '6. Records',
            list: [
              'Results and retained samples: LIMS.',
              'Holds and usage decisions: SAP S/4HANA (QM).',
              'Internal notice of the positive result: Microsoft Teams.'
            ]
          },
          {
            id: '7',
            heading: '7. References',
            refs: true,
            list: [
              'PR-CAL-007 · Recall and batch traceability.',
              'PR-CAL-001 · HACCP plan for premix manufacturing.',
              'Regulation (EC) 183/2005 · Feed hygiene.'
            ]
          }
        ]
      },
      {
        code: 'PR-CAL-007',
        title: 'Recall and batch traceability',
        short: 'Recall and traceability',
        type: 'Procedure',
        version: '6',
        date: '2026-01-26',
        owner: 'Quality and Food Safety',
        summary: 'One step back and one step forward traceability for any batch. Full trace and notice to the competent authority and to customers within 4 h; every recall closes with a mass balance.',
        sections: [
          {
            id: 'R',
            heading: 'Summary',
            text: [
              'One step back and one step forward traceability for any batch. Full trace and notice to the competent authority and to customers within 4 h; every recall closes with a mass balance.'
            ]
          },
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: [
              'Ensure the traceability of every raw material and premix batch and define the recall of unsafe product, in line with Regulation (EC) 178/2002 (arts. 18 and 19).'
            ]
          },
          {
            id: '2',
            heading: '2. Traceability',
            list: [
              'Backwards: every premix batch is linked in SAP S/4HANA to its raw material lots and supplier.',
              'In the plant: the MES records the production orders, the weighings and the line used.',
              'Forwards: every delivery note links the batch to the customer and the destination.'
            ]
          },
          {
            id: '3',
            heading: '3. Time target',
            text: [
              'The full trace of a lot (raw material, premix batches, shipments and customers) must be obtained within 4 h at most from the recall decision.',
              'The competent authority and the affected customers are informed within 4 h at most from the decision.'
            ]
          },
          {
            id: '4',
            heading: '4. Action on unsafe product',
            text: [
              'The source lot and the derived batches are blocked in SAP QM and in the MES, pending shipments are held and those already delivered are located.',
              'If the product has reached the market, the Quality and Food Safety Manager notifies the competent authority under art. 19 of Regulation (EC) 178/2002 and approves the notice to customers.',
              'The steps and content of the notification are detailed according to PR-CAL-010 (Crisis management and communication with the competent authority).'
            ]
          },
          {
            id: '5',
            heading: '5. Customer notice',
            text: [
              'Customer Care and Norel Solutions contact each customer by phone and email with the list of lots and delivery notes, and record the acknowledgement in Salesforce CRM.'
            ]
          },
          {
            id: '6',
            heading: '6. Mass balance',
            text: [
              'Every recall closes with a mass balance: quantity of the source lot = blocked stock + product shipped + product consumed or destroyed.',
              'A balance that does not tally is investigated before the campaign is closed.'
            ]
          },
          {
            id: '7',
            heading: '7. Mock recall',
            text: ['A mock recall is run once a year, with the same 4 h target, and its result is filed in SharePoint.']
          },
          {
            id: '8',
            heading: '8. Records',
            list: [
              'Traceability and holds: SAP S/4HANA and plant MES.',
              'Customer notices and acknowledgements: Salesforce CRM.',
              'Campaign, balance and mock recalls: SharePoint.'
            ]
          }
        ]
      },
      {
        code: 'PR-PRO-003',
        title: 'Cross-contamination control and line cleaning',
        short: 'Cross-contamination and cleaning',
        type: 'Procedure',
        version: '3',
        date: '2026-04-08',
        owner: 'Plant Manager',
        summary: 'Production sequence from lower to higher risk, validated cleaning on 100 % of product changes and a maximum carry-over of 0.5 % checked every quarter. Allergens are identified and stored separately.',
        sections: [
          {
            id: 'R',
            heading: 'Summary',
            text: [
              'Production sequence from lower to higher risk, validated cleaning on 100 % of product changes and a maximum carry-over of 0.5 % checked every quarter. Allergens are identified and stored separately.'
            ]
          },
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: [
              'Prevent the carry-over of additives and allergens between products on the dosing, mixing and packing lines of the Premix plant (Spain).'
            ]
          },
          {
            id: '2',
            heading: '2. Production sequence',
            text: [
              'Planning sequences production from lower to higher risk. Products with additives that have a regulated maximum content are made at the end of the sequence and followed by a cleaning.'
            ]
          },
          {
            id: '3',
            heading: '3. Line cleaning',
            list: [
              'Dry cleaning with vacuum and compressed air between compatible products.',
              'Flushing batch with an inert carrier after products with high-risk additives; it is identified and reused only within the same family.',
              'Validated cleaning of 100 % of product changes, recorded in the MES.'
            ]
          },
          {
            id: '4',
            heading: '4. Carry-over verification',
            text: [
              'The maximum carry-over allowed between products is 0.5 % and it is checked every quarter with a tracer test on each line.',
              'A carry-over above the limit blocks the line until the cleaning is repeated and the test is passed again.'
            ]
          },
          {
            id: '5',
            heading: '5. Allergen management',
            text: [
              'Raw materials with declarable allergens are identified in SAP S/4HANA and stored separately.',
              'Products with allergens are made in a defined sequence and the change to the next product requires validated cleaning.'
            ]
          },
          {
            id: '6',
            heading: '6. Records',
            list: ['Cleanings and product changes: plant MES.', 'Tracer tests: LIMS.', 'Allergen identification: SAP S/4HANA.']
          }
        ]
      },
      {
        code: 'PR-REG-002',
        title: 'Labelling and declaration of additives (Regulation (EC) 1831/2003)',
        short: 'Additive labelling',
        type: 'Procedure',
        version: '4',
        date: '2026-03-24',
        owner: 'Regulatory Affairs',
        summary: 'Every additive is used and labelled according to its authorisation in the EU Register, and the REACH registration of a substance is verified before its first purchase. No label change is issued without Regulatory Affairs review.',
        sections: [
          {
            id: 'R',
            heading: 'Summary',
            text: [
              'Every additive is used and labelled according to its authorisation in the EU Register, and the REACH registration of a substance is verified before its first purchase. No label change is issued without Regulatory Affairs review.'
            ]
          },
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: [
              'Ensure that additives and premixes are formulated, labelled and declared in line with Regulation (EC) 1831/2003 on additives for use in animal nutrition.'
            ]
          },
          {
            id: '2',
            heading: '2. Authorisation check',
            list: [
              'Check that each additive appears in the EU Register of feed additives and that the labelling matches its authorisation.',
              'Respect the conditions of use: target species, minimum and maximum content and withdrawal period where applicable.'
            ]
          },
          {
            id: '3',
            heading: '3. Label content',
            list: [
              'Name and function of the additive, identification number and guaranteed content.',
              'Lot number, manufacturing date and storage conditions.',
              'Name and address of the responsible operator and the registration or approval number of the plant (Regulation (EC) 183/2005).'
            ]
          },
          {
            id: '4',
            heading: '4. REACH registration',
            text: [
              'Before the first purchase of a substance, Regulatory Affairs verifies the REACH registration number of the supplier or manufacturer and stores it in SAP S/4HANA.',
              'A substance without a valid REACH registration is not purchased.'
            ]
          },
          {
            id: '5',
            heading: '5. Formula or label changes',
            text: ['Every formula or label change requires prior review by Regulatory Affairs and Quality and the update of the file in SharePoint.']
          },
          {
            id: '6',
            heading: '6. Records',
            list: ['Regulatory file per product: SharePoint.', 'Supplier REACH registrations and formulas: SAP S/4HANA.']
          }
        ]
      },
      {
        code: 'PR-LAB-005',
        title: 'Content verification (vitamins and trace minerals)',
        short: 'Content verification',
        type: 'Procedure',
        version: '5',
        date: '2026-05-12',
        owner: 'Laboratory',
        summary: 'Every premix batch is tested before release and must be within the tolerance of the declared content (±15 % vitamins, ±10 % trace minerals). Out of tolerance, the batch is blocked and the test is repeated.',
        sections: [
          {
            id: 'R',
            heading: 'Summary',
            text: [
              'Every premix batch is tested before release and must be within the tolerance of the declared content (±15 % vitamins, ±10 % trace minerals). Out of tolerance, the batch is blocked and the test is repeated.'
            ]
          },
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: ['Verify that the vitamin and trace mineral content of every premix batch matches the content declared on the label.']
          },
          {
            id: '2',
            heading: '2. Sampling and testing',
            text: [
              'A sample of every premix batch is tested before release. The fat-soluble vitamins A, D3 and E and the trace minerals Cu, Zn, Mn, Fe and Se are verified with a validated method.'
            ]
          },
          {
            id: '3',
            heading: '3. Conformity criterion',
            list: [
              'Vitamins: ±15 % of the declared content.',
              'Trace minerals: ±10 % of the declared content.',
              'The result and the certificate of analysis of the batch are recorded in LIMS.'
            ]
          },
          {
            id: '4',
            heading: '4. Out-of-tolerance result',
            text: [
              'An out-of-tolerance result blocks the batch in SAP QM and requires the test to be repeated in duplicate with the retained sample.',
              'If confirmed, the Quality and Food Safety Manager decides what happens to the batch and an 8D report is opened.'
            ]
          },
          {
            id: '5',
            heading: '5. Customer complaint about content',
            text: [
              'For a complaint about content below the declared level, the acknowledgement is sent within 24 h and the 8D report within 10 working days.',
              'The retained sample of the batch is re-tested in the internal laboratory and, where appropriate, in an accredited external laboratory, and compared with the customer analytical report.',
              'A cause is only communicated as confirmed when there is evidence; until then it is presented as a hypothesis under investigation.'
            ]
          },
          {
            id: '6',
            heading: '6. Records',
            list: [
              'Results, certificates and retained samples: LIMS.',
              'Holds and raw material consumption per batch: SAP S/4HANA and plant MES.',
              'Complaints and 8D reports: Salesforce CRM.'
            ]
          }
        ]
      },
      {
        code: 'PR-EXP-002',
        title: 'Export and sanitary documentation',
        short: 'Export and documentation',
        type: 'Procedure',
        version: '3',
        date: '2026-02-02',
        owner: 'Logistics and Export',
        summary: 'Every shipment outside Spain carries the batch certificate of analysis and the sanitary documentation of the destination country, and SAP is checked to confirm the batch is not blocked before loading.',
        sections: [
          {
            id: 'R',
            heading: 'Summary',
            text: [
              'Every shipment outside Spain carries the batch certificate of analysis and the sanitary documentation of the destination country, and SAP is checked to confirm the batch is not blocked before loading.'
            ]
          },
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: ['Define the documentation and checks for shipments to customers in the EU and in third countries from the Premix plant (Spain).']
          },
          {
            id: '2',
            heading: '2. Shipment documents',
            list: [
              'Delivery note and commercial invoice showing the lot number.',
              'Certificate of analysis of the batch.',
              'Sanitary export certificate when the destination country requires it (for example, Morocco).',
              'Transport document (CMR) and list of packages or tankers.'
            ]
          },
          {
            id: '3',
            heading: '3. Pre-loading check',
            text: [
              'Before loading, Logistics and Export checks in SAP S/4HANA that the customer and the product are authorised for the destination and that the batch is not blocked.'
            ]
          },
          {
            id: '4',
            heading: '4. Recall of an exported shipment',
            text: [
              'If an exported batch has to be recalled, Logistics and Export locates the shipment and the Quality and Food Safety Manager informs the competent authority of the destination country through the importer.'
            ]
          },
          {
            id: '5',
            heading: '5. Records',
            list: ['Shipments and delivery notes: SAP S/4HANA.', 'Sanitary certificates and transport documents: SharePoint.']
          }
        ]
      }
    ],
    unindexed: {
      'PR-CAL-010': {
        title: 'Crisis management and communication with the competent authority',
        mentionedIn: { doc: 'PR-CAL-007', sec: '4', quote: 'according to PR-CAL-010 (Crisis management and communication with the competent authority)' }
      }
    },
    suggested: ['salmonella', 'appcc', 'retirada', 'contaminacion', 'verificacion', 'etiquetado'],
    intents: [
      {
        id: 'salmonella',
        icon: 'alert-triangle',
        topic: 'Salmonella · action on a positive result',
        scope: 'local',
        q: 'What should we do if a raw material tests positive for Salmonella?',
        anchors: ['salmonella', 'positive', 'choline', 'contaminated'],
        terms: ['raw material', 'lot', 'lots', 'result', 'do', 'act', 'block', 'hold', 'batch', 'laboratory', 'detected'],
        min: 3,
        blocks: [
          {
            t: 'A positive result immediately blocks the lot and every product batch made with it.',
            c: [['PR-CAL-004', 4, 'A positive Salmonella result immediately blocks the lot and every product batch made with it.']]
          },
          {
            t: 'The Quality and Food Safety Manager decides what happens to the lot: destroy it or return it to the supplier.',
            c: [['PR-CAL-004', 4, 'The Quality and Food Safety Manager decides what happens to the lot: destroy it or return it to the supplier.']]
          },
          {
            t: 'Product already shipped is located and the recall procedure is activated within 2 h at most.',
            c: [['PR-CAL-004', 4, 'Product already shipped is located and PR-CAL-007 is activated within 2 h at most.']]
          },
          {
            t: 'Holds and usage decisions are recorded in SAP S/4HANA (QM) and the internal notice goes out through Microsoft Teams.',
            c: [
              ['PR-CAL-004', 6, 'Holds and usage decisions: SAP S/4HANA (QM).'],
              ['PR-CAL-004', 6, 'Internal notice of the positive result: Microsoft Teams.']
            ]
          }
        ],
        context: {
          systems: ['LIMS', 'SAP S/4HANA'],
          text: 'Today alarm (05:50): positive Salmonella in choline chloride 60 % lot MP-2610-CC-118 (test LAB-2610-0933), received on 21/10 and used in 4 premix batches (96 t): 31 t are still in the warehouse and 65 t were shipped to 9 customers. Under section 4, the lot and the derived batches are blocked.',
          outcome: 'alarma',
          go: 'alarma',
          goLabel: 'Open the shift alarm'
        },
        followups: ['condicionada', 'bloqueo-lote', 'retirada']
      },
      {
        id: 'muestreo',
        icon: 'search',
        topic: 'Salmonella · sampling on receipt',
        scope: 'local',
        q: 'How is a high-risk raw material sampled on receipt?',
        anchors: ['sampling', 'sampled', 'sample', 'samples', 'retained sample', 'receipt', 'iso 6579'],
        terms: ['raw material', 'high-risk', 'lot', 'salmonella', 'test', 'laboratory', 'method', 'how'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'Every lot of high-risk raw material is sampled on receipt according to the LIMS plan:',
              c: [['PR-CAL-004', 2, 'Every lot of high-risk raw material is sampled on receipt according to the LIMS sampling plan:']]
            },
            list: [
              { t: 'Composite sample of at least 10 points per lot.', c: [['PR-CAL-004', 2, 'Composite sample of at least 10 points per lot.']] },
              {
                t: '25 g sample tested with the ISO 6579-1 reference method.',
                c: [['PR-CAL-004', 2, '25 g sample tested with the ISO 6579-1 reference method.']]
              },
              { t: 'Retained sample kept for 12 months.', c: [['PR-CAL-004', 2, 'Retained sample kept for 12 months.']] }
            ]
          }
        ],
        followups: ['condicionada', 'salmonella']
      },
      {
        id: 'condicionada',
        icon: 'unlock',
        topic: 'Salmonella · conditional release',
        scope: 'local',
        q: 'Can a high-risk raw material be used before the Salmonella result is available?',
        anchors: ['release', 'released', 'conditional release', 'certificate of analysis', 'before the result'],
        terms: ['raw material', 'use', 'production', 'result', 'salmonella', 'supplier', 'days', 'wait'],
        min: 3,
        blocks: [
          {
            t: 'Yes, with conditional release: the lot goes to production with a compliant supplier certificate of analysis and stays flagged in SAP QM.',
            c: [
              [
                'PR-CAL-004',
                3,
                'The lot is released to production with a compliant supplier certificate of analysis (conditional release) and stays flagged in SAP QM'
              ]
            ]
          },
          {
            t: 'The flag stays until our own Salmonella test in LIMS confirms the result, within 5 working days at most.',
            c: [['PR-CAL-004', 3, 'until our own Salmonella test in LIMS confirms the result, within 5 working days at most']]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'LIMS'],
          text: 'Choline chloride MP-2610-CC-118 was received on 21/10 with a compliant supplier certificate and released conditionally; our own test LAB-2610-0933 came back positive today, at 5 working days.',
          outcome: 'alarma',
          go: 'alarma',
          goLabel: 'Open the shift alarm'
        },
        followups: ['salmonella', 'muestreo']
      },
      {
        id: 'appcc',
        icon: 'clipboard-check',
        topic: 'HACCP · critical control points',
        scope: 'local',
        q: 'What are the critical control points in premix manufacturing?',
        anchors: ['haccp', 'ccp', 'critical control points', 'critical point', 'hazards'],
        terms: ['control', 'manufacturing', 'premixes', 'which', 'plan', 'verification', 'dosing', 'mixing'],
        min: 3,
        blocks: [
          {
            intro: { t: 'The HACCP plan defines four critical control points:', c: [['PR-CAL-001', 3, 'CCP 1 · Raw material receipt']] },
            list: [
              {
                t: 'Raw material receipt: Salmonella testing and verification of the certificate of analysis before the lot is released.',
                c: [
                  [
                    'PR-CAL-001',
                    3,
                    'CCP 1 · Raw material receipt: Salmonella testing and verification of the certificate of analysis before the lot is released'
                  ]
                ]
              },
              {
                t: 'Micro-ingredient dosing: weighing with double verification and a maximum tolerance of 2 % over the formula.',
                c: [
                  [
                    'PR-CAL-001',
                    3,
                    'CCP 2 · Micro-ingredient dosing: weighing with double verification and a maximum tolerance of 2 % over the formula.'
                  ]
                ]
              },
              {
                t: 'Homogeneous mixing: homogeneity test with a coefficient of variation below 5 %.',
                c: [['PR-CAL-001', 3, 'CCP 3 · Homogeneous mixing: homogeneity test with a coefficient of variation below 5 %.']]
              },
              {
                t: 'Cross-contamination: validated cleaning between products.',
                c: [['PR-CAL-001', 3, 'CCP 4 · Cross-contamination: validated cleaning between products']]
              }
            ]
          },
          {
            t: 'Quality verifies the CCP records every week and the plan is audited once a year.',
            c: [['PR-CAL-001', 5, 'Weekly verification of CCP records by Quality.'], ['PR-CAL-001', 5, 'Internal audit of the HACCP plan once a year.']]
          }
        ],
        followups: ['bloqueo-lote', 'contaminacion']
      },
      {
        id: 'bloqueo-lote',
        icon: 'lock',
        topic: 'HACCP · fate of a blocked lot',
        scope: 'local',
        q: 'Who decides what happens to a batch blocked because of a deviation?',
        anchors: ['blocked', 'hold', 'deviation', 'release', 'rework', 'destroy'],
        terms: ['who', 'decides', 'lot', 'batch', 'fate', 'decision', 'usage', 'sap', 'mes'],
        min: 3,
        blocks: [
          {
            t: 'After a deviation at a CCP, the lot is blocked in SAP QM and in the MES.',
            c: [['PR-CAL-001', 4, 'the lot is blocked in SAP QM and in the MES']]
          },
          {
            t: 'Only the Quality and Food Safety Manager decides its fate: release, rework or destroy.',
            c: [['PR-CAL-001', 4, 'only the Quality and Food Safety Manager decides its fate: release, rework or destroy']]
          },
          {
            t: 'No blocked lot is released by default or because a deadline has passed.',
            c: [['PR-CAL-001', 4, 'No blocked lot is released by default or because a deadline has passed.']]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'Plant MES'],
          text: 'Today 4 premix batches are blocked because of the Salmonella in MP-2610-CC-118 (PRM-2610-0417, 0418, 0421 and 0425; 96 t). The fate of each batch is decided by the Quality and Food Safety Manager.',
          outcome: 'alarma',
          go: 'alarma',
          goLabel: 'Open the shift alarm'
        },
        followups: ['salmonella', 'retirada']
      },
      {
        id: 'retirada',
        icon: 'truck',
        topic: 'Recall · trace and notice deadlines',
        scope: 'local',
        q: 'How quickly must we have the full trace and notify the authority and customers in a recall?',
        anchors: ['recall', 'withdrawal', 'withdraw', 'mock recall', '4 h', 'authority'],
        terms: ['trace', 'traceability', 'time', 'deadline', 'hours', 'customers', 'full', 'notify', 'inform', 'how long'],
        min: 3,
        blocks: [
          {
            t: 'The full trace of the lot (raw material, premix batches, shipments and customers) must be obtained within 4 h at most from the recall decision.',
            c: [['PR-CAL-007', 3, 'must be obtained within 4 h at most from the recall decision']]
          },
          {
            t: 'The competent authority and the affected customers are informed within that same 4 h.',
            c: [['PR-CAL-007', 3, 'The competent authority and the affected customers are informed within 4 h at most from the decision.']]
          },
          {
            t: 'The source lot and the derived batches are blocked, pending shipments are held and those already delivered are located.',
            c: [
              [
                'PR-CAL-007',
                4,
                'The source lot and the derived batches are blocked in SAP QM and in the MES, pending shipments are held and those already delivered are located.'
              ]
            ]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'Plant MES'],
          text: 'Campaign RET-2026-1028: from choline chloride MP-2610-CC-118 to 4 premix batches, 148 delivery notes and 9 customers in Spain, Portugal and Morocco. The target is to inform the authorities and customers within 4 h (Regulation (EC) 178/2002, art. 19).',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Open campaign RET-2026-1028'
        },
        followups: ['trazabilidad', 'notificacion', 'balance']
      },
      {
        id: 'trazabilidad',
        icon: 'barcode',
        topic: 'Traceability · backwards and forwards',
        scope: 'local',
        q: 'How is a premix batch traced backwards and forwards?',
        anchors: ['trace', 'traceability', 'backwards', 'forwards', 'genealogy', 'delivery note'],
        terms: ['batch', 'premix', 'customer', 'supplier', 'raw material', 'how', 'sap', 'mes', 'record'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'The trace relies on three records:',
              c: [['PR-CAL-007', 2, 'Backwards: every premix batch is linked in SAP S/4HANA to its raw material lots and supplier.']]
            },
            list: [
              {
                t: 'Backwards: every premix batch is linked in SAP S/4HANA to its raw material lots and supplier.',
                c: [['PR-CAL-007', 2, 'Backwards: every premix batch is linked in SAP S/4HANA to its raw material lots and supplier.']]
              },
              {
                t: 'In the plant: the MES records the production orders, the weighings and the line used.',
                c: [['PR-CAL-007', 2, 'In the plant: the MES records the production orders, the weighings and the line used.']]
              },
              {
                t: 'Forwards: every delivery note links the batch to the customer and the destination.',
                c: [['PR-CAL-007', 2, 'Forwards: every delivery note links the batch to the customer and the destination.']]
              }
            ]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'Plant MES', 'LIMS'],
          text: 'Full trace of the example batch, from the raw materials to the shipment to customers:',
          lot: 'PRM-2610-0417'
        },
        followups: ['retirada', 'balance']
      },
      {
        id: 'balance',
        icon: 'layers',
        topic: 'Recall · mass balance',
        scope: 'local',
        q: 'How is a recall closed and what is the mass balance?',
        anchors: ['balance', 'mass balance', 'closure', 'close', 'tally', 'tonnes'],
        terms: ['recall', 'campaign', 'mass', 'stock', 'shipped', 'blocked', 'quantity', 'lot'],
        min: 3,
        blocks: [
          {
            t: 'Every recall closes with a mass balance: quantity of the source lot = blocked stock + product shipped + product consumed or destroyed.',
            c: [
              [
                'PR-CAL-007',
                6,
                'Every recall closes with a mass balance: quantity of the source lot = blocked stock + product shipped + product consumed or destroyed.'
              ]
            ]
          },
          {
            t: 'A balance that does not tally is investigated before the campaign is closed.',
            c: [['PR-CAL-007', 6, 'A balance that does not tally is investigated before the campaign is closed.']]
          },
          {
            t: 'The campaign, the balance and the mock recalls are filed in SharePoint.',
            c: [['PR-CAL-007', 8, 'Campaign, balance and mock recalls: SharePoint.']]
          }
        ],
        context: {
          systems: ['SAP S/4HANA'],
          text: 'Balance of RET-2026-1028: 96 t = 31 t in finished-product warehouse + 65 t shipped to 9 customers. It tallies: no product has been consumed or destroyed yet.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Open campaign RET-2026-1028'
        },
        followups: ['retirada', 'notificacion']
      },
      {
        id: 'notificacion',
        icon: 'mail',
        topic: 'Recall · notification to the authority',
        scope: 'local',
        kind: 'partial',
        q: 'How is a recall notified to the competent authority?',
        anchors: ['=authority', 'notify', 'notification', 'notified', 'article 19', 'art. 19', '178/2002'],
        terms: ['recall', 'competent', 'product', 'market', 'how', 'notice', 'customers'],
        min: 2,
        blocks: [
          {
            t: 'If the product has reached the market, the Quality and Food Safety Manager notifies the competent authority under art. 19 of Regulation (EC) 178/2002 and approves the notice to customers.',
            c: [
              [
                'PR-CAL-007',
                4,
                'the Quality and Food Safety Manager notifies the competent authority under art. 19 of Regulation (EC) 178/2002 and approves the notice to customers'
              ]
            ]
          },
          {
            t: 'The steps and content of the notification are detailed according to PR-CAL-010.',
            c: [['PR-CAL-007', 4, 'according to PR-CAL-010 (Crisis management and communication with the competent authority)']]
          }
        ],
        note: 'PR-CAL-010 (Crisis management and communication with the competent authority) is not among the indexed documents: the content of the notification cannot be detailed from this search.',
        followups: ['retirada', 'clientes-aviso']
      },
      {
        id: 'clientes-aviso',
        icon: 'users',
        topic: 'Recall · customer notice and exports',
        scope: 'local',
        q: 'How are customers notified in a recall, including those outside Spain?',
        anchors: ['notify', 'notice', 'customers', 'acknowledgement', 'importer', 'morocco', 'portugal'],
        terms: ['recall', 'list', 'lots', 'delivery notes', 'country', 'destination', 'authority', 'exported', 'how'],
        min: 3,
        blocks: [
          {
            t: 'Customer Care and Norel Solutions contact each customer by phone and email with the list of lots and delivery notes.',
            c: [['PR-CAL-007', 5, 'Customer Care and Norel Solutions contact each customer by phone and email with the list of lots and delivery notes']]
          },
          {
            t: 'Each customer acknowledgement is recorded in Salesforce CRM.',
            c: [['PR-CAL-007', 5, 'record the acknowledgement in Salesforce CRM']]
          },
          {
            t: 'For an exported shipment, Logistics and Export locates the shipment and the authority of the destination country is informed through the importer.',
            c: [
              [
                'PR-EXP-002',
                4,
                'Logistics and Export locates the shipment and the Quality and Food Safety Manager informs the competent authority of the destination country through the importer'
              ]
            ]
          }
        ],
        context: {
          systems: ['Salesforce CRM', 'Microsoft Teams'],
          text: 'Of the 9 customers of RET-2026-1028, there are feed mills in Spain, Portugal and Morocco: for the latter, the authority of the destination country is informed through the importer.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Open campaign RET-2026-1028'
        },
        followups: ['retirada', 'exportacion']
      },
      {
        id: 'contaminacion',
        icon: 'shield',
        topic: 'Cross-contamination · sequence and cleaning',
        scope: 'local',
        q: 'How is cross-contamination between products avoided on the lines?',
        anchors: ['cross-contamination', 'contamination', 'carry-over', 'cleaning', 'clean', 'sequence', 'tracer'],
        terms: ['lines', 'products', 'change', 'product', 'validated', 'avoid', 'how', 'manufacturing', 'planning'],
        min: 3,
        blocks: [
          {
            t: 'Production is sequenced from lower to higher risk, and products with additives that have a regulated maximum content are made at the end of the sequence and followed by a cleaning.',
            c: [
              ['PR-PRO-003', 2, 'Planning sequences production from lower to higher risk.'],
              [
                'PR-PRO-003',
                2,
                'Products with additives that have a regulated maximum content are made at the end of the sequence and followed by a cleaning.'
              ]
            ]
          },
          {
            t: '100 % of product changes carry a validated cleaning, recorded in the MES.',
            c: [['PR-PRO-003', 3, 'Validated cleaning of 100 % of product changes, recorded in the MES.']]
          },
          {
            t: 'After products with high-risk additives, a flushing batch with an inert carrier is used.',
            c: [['PR-PRO-003', 3, 'Flushing batch with an inert carrier after products with high-risk additives']]
          },
          {
            t: 'The maximum carry-over allowed is 0.5 % and it is checked every quarter with a tracer test on each line.',
            c: [
              [
                'PR-PRO-003',
                4,
                'The maximum carry-over allowed between products is 0.5 % and it is checked every quarter with a tracer test on each line.'
              ]
            ]
          }
        ],
        followups: ['alergenos', 'appcc']
      },
      {
        id: 'alergenos',
        icon: 'alert-triangle',
        topic: 'Cross-contamination · allergens',
        scope: 'local',
        q: 'How are allergens managed in the plant?',
        anchors: ['allergen', 'allergens', 'declarable'],
        terms: ['plant', 'managed', 'management', 'stored', 'separately', 'identified', 'change', 'product', 'raw materials'],
        min: 2,
        blocks: [
          {
            t: 'Raw materials with declarable allergens are identified in SAP S/4HANA and stored separately.',
            c: [['PR-PRO-003', 5, 'Raw materials with declarable allergens are identified in SAP S/4HANA and stored separately.']]
          },
          {
            t: 'Products with allergens are made in a defined sequence and the change to the next product requires validated cleaning.',
            c: [
              [
                'PR-PRO-003',
                5,
                'Products with allergens are made in a defined sequence and the change to the next product requires validated cleaning.'
              ]
            ]
          }
        ],
        followups: ['contaminacion']
      },
      {
        id: 'etiquetado',
        icon: 'file-text',
        topic: 'Additive labelling · content and authorisation',
        scope: 'local',
        q: 'What must the label of an additive or a premix declare?',
        anchors: ['label', 'labelling', 'declare', 'declaration', '1831/2003', 'authorisation', 'eu register'],
        terms: ['additive', 'additives', 'premix', 'content', 'guaranteed', 'lot', 'function', 'operator', 'what'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'The label must include, at least:',
              c: [['PR-REG-002', 3, 'Name and function of the additive, identification number and guaranteed content.']]
            },
            list: [
              {
                t: 'Name and function of the additive, identification number and guaranteed content.',
                c: [['PR-REG-002', 3, 'Name and function of the additive, identification number and guaranteed content.']]
              },
              {
                t: 'Lot number, manufacturing date and storage conditions.',
                c: [['PR-REG-002', 3, 'Lot number, manufacturing date and storage conditions.']]
              },
              {
                t: 'Name and address of the responsible operator and the registration or approval number of the plant.',
                c: [
                  [
                    'PR-REG-002',
                    3,
                    'Name and address of the responsible operator and the registration or approval number of the plant (Regulation (EC) 183/2005).'
                  ]
                ]
              }
            ]
          },
          {
            t: 'In addition, it is checked that each additive appears in the EU Register and that the labelling matches its authorisation.',
            c: [
              [
                'PR-REG-002',
                2,
                'Check that each additive appears in the EU Register of feed additives and that the labelling matches its authorisation.'
              ]
            ]
          },
          {
            t: 'Every formula or label change requires prior review by Regulatory Affairs and Quality.',
            c: [['PR-REG-002', 5, 'Every formula or label change requires prior review by Regulatory Affairs and Quality']]
          }
        ],
        followups: ['reach']
      },
      {
        id: 'reach',
        icon: 'clipboard-list',
        topic: 'REACH · buying a new substance',
        scope: 'local',
        q: 'What is checked before buying a new substance from a supplier (REACH)?',
        anchors: ['reach', 'reach registration', 'substance', 'substances', 'first purchase', 'new supplier'],
        terms: ['buy', 'purchase', 'supplier', 'manufacturer', 'registration', 'number', 'check', 'verify', 'regulatory affairs'],
        min: 2,
        blocks: [
          {
            t: 'Before the first purchase, Regulatory Affairs verifies the REACH registration number of the supplier or manufacturer and stores it in SAP S/4HANA.',
            c: [
              [
                'PR-REG-002',
                4,
                'Before the first purchase of a substance, Regulatory Affairs verifies the REACH registration number of the supplier or manufacturer and stores it in SAP S/4HANA.'
              ]
            ]
          },
          {
            t: 'A substance without a valid REACH registration is not purchased.',
            c: [['PR-REG-002', 4, 'A substance without a valid REACH registration is not purchased.']]
          }
        ],
        followups: ['etiquetado']
      },
      {
        id: 'verificacion',
        icon: 'gauge',
        topic: 'Content verification · testing and tolerances',
        scope: 'local',
        q: 'How is the vitamin and trace mineral content of a premix verified?',
        anchors: ['verification', 'verify', 'verified', 'content', 'tolerance', 'tolerances', 'vitamin e', 'vitamins', 'trace minerals'],
        terms: ['premix', 'batch', 'test', 'declared', 'label', 'laboratory', 'release', 'how'],
        min: 3,
        blocks: [
          {
            t: 'A sample of every premix batch is tested before release with a validated method: vitamins A, D3 and E and trace minerals Cu, Zn, Mn, Fe and Se.',
            c: [['PR-LAB-005', 2, 'A sample of every premix batch is tested before release.']]
          },
          {
            t: 'Conformity criterion: ±15 % for vitamins and ±10 % for trace minerals of the declared content.',
            c: [['PR-LAB-005', 3, 'Vitamins: ±15 % of the declared content.'], ['PR-LAB-005', 3, 'Trace minerals: ±10 % of the declared content.']]
          },
          {
            t: 'The result and the certificate of analysis of the batch are recorded in LIMS.',
            c: [['PR-LAB-005', 3, 'The result and the certificate of analysis of the batch are recorded in LIMS.']]
          }
        ],
        followups: ['tolerancia', 'reclamacion-contenido']
      },
      {
        id: 'tolerancia',
        icon: 'lock',
        topic: 'Content verification · out-of-tolerance batch',
        scope: 'local',
        q: 'What happens if the test of a batch is out of tolerance?',
        anchors: ['out of tolerance', 'out of range', 'non-conforming', 'content deviation', 'retained sample'],
        terms: ['batch', 'test', 'result', 'blocks', 'hold', 'repeat', 'duplicate', '8d report', 'fate'],
        min: 2,
        blocks: [
          {
            t: 'The batch is blocked in SAP QM and the test is repeated in duplicate with the retained sample.',
            c: [
              [
                'PR-LAB-005',
                4,
                'An out-of-tolerance result blocks the batch in SAP QM and requires the test to be repeated in duplicate with the retained sample.'
              ]
            ]
          },
          {
            t: 'If confirmed, the Quality and Food Safety Manager decides what happens to the batch and an 8D report is opened.',
            c: [['PR-LAB-005', 4, 'If confirmed, the Quality and Food Safety Manager decides what happens to the batch and an 8D report is opened.']]
          }
        ],
        followups: ['verificacion', 'reclamacion-contenido']
      },
      {
        id: 'reclamacion-contenido',
        icon: 'mail',
        topic: 'Customer complaint · content below the declared level',
        scope: 'all',
        q: 'What deadlines and steps apply if a customer claims a vitamin content below the declared level?',
        anchors: ['complaint', 'complaints', 'claims', 'claim', '8d', 'customer complaint'],
        terms: ['deadline', 'deadlines', 'acknowledgement', 'report', 'content', 'vitamin', 'below', 'declared', 'retained sample', 're-test', 'days'],
        min: 3,
        blocks: [
          {
            t: 'Acknowledgement within 24 h and 8D report within 10 working days.',
            c: [['PR-LAB-005', 5, 'the acknowledgement is sent within 24 h and the 8D report within 10 working days']]
          },
          {
            t: 'The retained sample of the batch is re-tested in the internal laboratory and, where appropriate, in an accredited external laboratory, and compared with the customer analytical report.',
            c: [
              [
                'PR-LAB-005',
                5,
                'The retained sample of the batch is re-tested in the internal laboratory and, where appropriate, in an accredited external laboratory, and compared with the customer analytical report.'
              ]
            ]
          },
          {
            t: 'A cause is only communicated as confirmed when there is evidence; until then it is presented as a hypothesis under investigation.',
            c: [
              [
                'PR-LAB-005',
                5,
                'A cause is only communicated as confirmed when there is evidence; until then it is presented as a hypothesis under investigation.'
              ]
            ]
          }
        ],
        context: {
          systems: ['Salesforce CRM', 'LIMS'],
          text: 'Case CLM-2026-1028: Piensos Cuenca Mediterráneo, S.A. claims a vitamin E content 18 % below the declared level in batch PRM-2610-0388, according to its report LAB-CLI-2610-77. 18 % is outside the ±15 % tolerance of section 3 of PR-LAB-005, but until the retained sample is re-tested the cause is a hypothesis.',
          outcome: 'reclamacion',
          go: 'reclamacion',
          goLabel: 'Open complaint CLM-2026-1028'
        },
        followups: ['verificacion', 'tolerancia']
      },
      {
        id: 'exportacion',
        icon: 'truck',
        topic: 'Export · shipment documents',
        scope: 'local',
        q: 'What documents does a shipment to another country carry?',
        anchors: ['export', 'exporting', 'exported', 'shipment', 'shipments', 'documents', 'sanitary certificate', 'cmr'],
        terms: ['country', 'destination', 'delivery note', 'invoice', 'certificate', 'transport', 'loading', 'morocco', 'portugal', 'lot'],
        min: 3,
        blocks: [
          {
            intro: { t: 'Every shipment carries, at least:', c: [['PR-EXP-002', 2, 'Delivery note and commercial invoice showing the lot number.']] },
            list: [
              {
                t: 'Delivery note and commercial invoice showing the lot number.',
                c: [['PR-EXP-002', 2, 'Delivery note and commercial invoice showing the lot number.']]
              },
              { t: 'Certificate of analysis of the batch.', c: [['PR-EXP-002', 2, 'Certificate of analysis of the batch.']] },
              {
                t: 'Sanitary export certificate when the destination country requires it (for example, Morocco).',
                c: [['PR-EXP-002', 2, 'Sanitary export certificate when the destination country requires it (for example, Morocco).']]
              },
              {
                t: 'Transport document (CMR) and list of packages or tankers.',
                c: [['PR-EXP-002', 2, 'Transport document (CMR) and list of packages or tankers.']]
              }
            ]
          },
          {
            t: 'Before loading, SAP S/4HANA is checked to confirm that the customer and the product are authorised for the destination and that the batch is not blocked.',
            c: [
              [
                'PR-EXP-002',
                3,
                'checks in SAP S/4HANA that the customer and the product are authorised for the destination and that the batch is not blocked'
              ]
            ]
          }
        ],
        context: {
          systems: ['SAP S/4HANA'],
          text: 'Among the 9 customers of recall RET-2026-1028 there are feed mills in Portugal and Morocco: their delivery notes carry the batch certificate of analysis and, for Morocco, the sanitary export certificate.',
          go: 'retirada',
          goLabel: 'Open campaign RET-2026-1028'
        },
        followups: ['clientes-aviso', 'retirada']
      }
    ],
    other_scopes: {
      topic: 'Another plant',
      words: ['mexico', 'egypt', 'united states', 'usa', 'brazil', 'singapore'],
      reason: 'The indexed documents on this topic are from the Premix plant (Spain); there is no evidence for {x}.'
    },
    gaps: [
      {
        id: 'micotoxinas',
        topic: 'Mycotoxins',
        anchors: ['mycotoxin', 'mycotoxins', 'aflatoxin', 'ochratoxin', 'zearalenone', 'deoxynivalenol'],
        reason: 'No indexed document contains the mycotoxin analytical plan or its limits; PR-CAL-004 only refers to the analytical plan of each raw material.'
      },
      {
        id: 'omg',
        topic: 'GMO-free',
        anchors: ['gmo', 'gmos', 'gmo-free', 'genetically modified', 'transgenic'],
        reason: 'No indexed document contains supplier GMO-free declarations or PCR tests.'
      },
      {
        id: 'sostenibilidad',
        topic: 'Sustainability and ESG',
        anchors: ['sustainability', 'footprint', 'carbon', 'emissions', 'esg', 'scope 1', 'scope 3'],
        reason: 'No indexed document covers the emissions inventory or the ESG policy of the plant.'
      },
      {
        id: 'precio',
        topic: 'Prices, discounts and margins',
        anchors: ['price', 'prices', 'cost', 'costs', 'discount', 'discounts', 'rate', 'rates', 'margin', 'commission'],
        reason: 'Prices, discounts and margins are not part of the indexed Quality procedures.'
      },
      {
        id: 'personal',
        topic: 'Working conditions',
        anchors: ['holidays', 'payroll', 'salary', 'wage', 'collective agreement', 'headcount', 'dismissal', 'working hours'],
        reason: 'Working conditions are not part of the indexed Quality procedures.'
      },
      {
        id: 'crisis',
        topic: 'Crisis management',
        anchors: ['crisis management', 'crisis committee', 'press release', 'crisis communication'],
        reason: 'No indexed document describes crisis management or the content of the notification to the authority.',
        related: 'PR-CAL-010'
      }
    ]
  }
});

/* Canonical summary by code (procedure data): filled in without overwriting what other files may have set. */
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
})('norel');
