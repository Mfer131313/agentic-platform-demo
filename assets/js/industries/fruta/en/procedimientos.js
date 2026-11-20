/* Subtropicales Axarquía · Quality and Operations procedure search with citations (English). Demo scenario with synthetic data (MFM). */
agenticPackEn('fruta', {
  procedimientos: {
    section: 'Calidad',
    nav: 'Procedures',
    title: 'Ask the procedures',
    agent: 'Procedures',
    system: 'Procedimientos',
    source: 'Procedures · controlled Quality and Operations documents',
    indexed_at: '2026-11-16T06:00',
    doc_org: 'Subtropicales Axarquía · Quality',
    ui: {
      page_title: 'Quality and Operations procedure search',
      intro_title: 'Ask about the procedures of the Axarquía handling centre (Málaga)',
      intro_text: 'Every sentence of the answer cites the document and the section it comes from. If no indexed document covers it, the search says so and does not answer.',
      placeholder: 'Type a question about the Quality and Operations procedures',
      context_title: 'Applied to the centre today',
      permission: 'Quality · Handling centre',
      asker_initials: 'RO',
      asker_role: 'Head of Operations and Quality',
      route_to: 'Quality and Food Safety'
    },
    report: {
      title: 'Quality and Operations procedure search',
      code_prefix: 'CON-PROC',
      filename: 'procedure-search',
      scope_label: 'Centre',
      scope: 'Málaga · Axarquía handling centre'
    },
    presenter: {
      say: [
        'Search of the Quality and Operations procedures: the answer comes only from the controlled documents, and every sentence carries its citation to the document and section.',
        'Seven documents are indexed: receipt and sampling, controlled ripening, MRLs and residues, traceability and recall, processing and HACCP, online shop orders and export. Here they are synthetic; in the pilot, your current ones.'
      ],
      say_empty: 'It helps to train new shift supervisors, to prepare customer, IFS Food and GLOBALG.A.P. audits and to answer with the exact reference.',
      say_answered: 'Clicking a citation opens the document with the exact passage highlighted. And the answer is cross-checked with what is happening today: the chamber CM-06 alarm, recall campaign RET-2026-1120 or complaint CLM-2026-1120.',
      say_none: 'When there is no source it says so and invents nothing: no answer and no citation. If the topic is in a document that is not indexed, it names it (PR-CAL-010) and lets you route the question to Quality.',
      next_empty: 'Click "What should we do if a lot of fruit exceeds the MRL in the residue analysis?" and then citation 1 to see the highlighted passage.',
      next_answered: 'Type a question with no source, for example "What pest control programme does the centre apply?", and click "Ask".',
      next_done: 'Move on to the next scene with the right arrow.'
    },
    docs: [
      {
        code: 'PR-REC-001',
        title: 'Fruit receipt and sampling',
        short: 'Receipt and sampling',
        type: 'Procedure',
        version: '4',
        date: '2026-03-02',
        owner: 'Fruit receipt and field',
        summary: 'Every consignment is weighed, recorded with its field lot and sampled on receipt (pulp temperature, firmness, dry matter or Brix degrees and defects). A non-conforming consignment is rejected or blocked.',
        sections: [
          {
            id: 'R',
            heading: 'Summary',
            text: [
              'Every consignment is weighed, recorded with its field lot and sampled on receipt (pulp temperature, firmness, dry matter or Brix degrees and defects). A non-conforming consignment is rejected or blocked.'
            ]
          },
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: [
              'Define the receipt, sampling and acceptance of fruit from the Axarquía and imported fruit (Chile and Peru) at the Axarquía handling centre (Málaga).',
              'It applies to fresh avocado and mango. Pesticide residues are governed by PR-CAL-004.'
            ]
          },
          {
            id: '2',
            heading: '2. Receipt and sampling',
            text: ['Every consignment is weighed and recorded with its field lot in Field traceability:'],
            list: [
              'Record of the grower, the plot and the harvest date.',
              'Pulp temperature measured in three pieces per pallet.',
              'Sample of 20 pieces per consignment for firmness, dry matter (avocado), Brix degrees (mango) and defects.'
            ]
          },
          {
            id: '3',
            heading: '3. Acceptance criteria',
            list: [
              'Pulp temperature of the fruit on arrival below 20 °C.',
              'Hass avocado: minimum dry matter of 21 % on receipt.',
              'Visual inspection for pests and foreign bodies on the truck and the pallets on arrival.'
            ]
          },
          {
            id: '4',
            heading: '4. Action on a non-conformity',
            text: [
              'A non-conforming consignment is rejected or blocked in SAP QM, and the Receipt and Field Manager informs the Quality and Food Safety Manager.',
              'A consignment with more than 5 % of damaged or rotten pieces is rejected.'
            ]
          },
          {
            id: '5',
            heading: '5. Records',
            list: ['Field lot, plot and grower: Field traceability.', 'Samples and tests: LIMS.', 'Blocks and usage decisions: SAP S/4HANA (QM).']
          }
        ]
      },
      {
        code: 'PR-MAD-002',
        title: 'Controlled ripening (temperature and ethylene)',
        short: 'Controlled ripening',
        type: 'Procedure',
        version: '3',
        date: '2026-04-14',
        owner: 'Ripening and cold storage',
        summary: 'Fruit is ripened in chambers with controlled temperature and ethylene and continuous recording. A deviation from the setpoint triggers an alarm, blocks the lots in the chamber and requires firmness and colour to be checked before dispatch.',
        sections: [
          {
            id: 'R',
            heading: 'Summary',
            text: [
              'Fruit is ripened in chambers with controlled temperature and ethylene and continuous recording. A deviation from the setpoint triggers an alarm, blocks the lots in the chamber and requires firmness and colour to be checked before dispatch.'
            ]
          },
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: [
              'Define the controlled ripening of avocado and mango so that they are delivered ready to eat with the firmness agreed with the customer.',
              'It applies to the ripening and storage chambers of the Axarquía handling centre (Málaga).'
            ]
          },
          {
            id: '2',
            heading: '2. Ripening conditions',
            list: [
              'Storage setpoint for Hass avocado before ripening: 6.0 °C.',
              'Ripening with ethylene at the temperature and time of the curve of each variety.',
              'Continuous recording of the temperature of every chamber every 5 minutes in the WMS.'
            ]
          },
          {
            id: '3',
            heading: '3. Firmness control',
            text: [
              'Firmness is measured with a penetrometer on a sample from every pallet before dispatch.',
              'The customer receives fruit within the firmness range agreed for the order.'
            ]
          },
          {
            id: '4',
            heading: '4. Temperature deviation',
            text: [
              'A deviation of more than 2 °C from the setpoint for more than 30 minutes triggers an alarm and blocks the lots in the chamber in SAP QM.',
              'A maintenance order is opened and the pallets are moved to another chamber at setpoint.',
              'Quality checks the firmness and colour of a sample from every pallet, and the Quality and Food Safety Manager decides the fate of the lot.'
            ]
          },
          {
            id: '5',
            heading: '5. Customer complaint about ripening',
            text: [
              'For a complaint about uneven ripening, the acknowledgement is sent within 24 h and the 8D report within 10 working days.',
              'The ripening curve and the temperature records of the lot are reviewed and compared with the firmness measurement of the customer.',
              'A cause is only reported as confirmed when there is evidence; until then it is presented as a hypothesis under investigation.'
            ]
          },
          {
            id: '6',
            heading: '6. Records',
            list: [
              'Temperatures and pallet locations: WMS.',
              'Blocks and lot consumption: SAP S/4HANA.',
              'Complaints and 8D reports: SAP S/4HANA.'
            ]
          }
        ]
      },
      {
        code: 'PR-CAL-004',
        title: 'MRLs and pesticide residue testing',
        short: 'MRLs and residues',
        type: 'Procedure',
        version: '5',
        date: '2026-02-09',
        owner: 'Laboratory',
        summary: 'Every consignment of fruit is sampled on receipt for multi-residue analysis and released with the grower certificate until our own analysis confirms the result. An MRL exceedance blocks the consignment and the lots made with it.',
        sections: [
          {
            id: 'R',
            heading: 'Summary',
            text: [
              'Every consignment of fruit is sampled on receipt for multi-residue analysis and released with the grower certificate until our own analysis confirms the result. An MRL exceedance blocks the consignment and the lots made with it.'
            ]
          },
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: [
              'Control the pesticide residues of the fruit received against the maximum residue levels (MRLs) of Regulation (EC) 396/2005.',
              'It does not include the control of irrigation and process water, which is governed by its own plan.'
            ]
          },
          {
            id: '2',
            heading: '2. Sampling',
            text: ['Every consignment is sampled on receipt according to the LIMS sampling plan:'],
            list: [
              'Composite sample of at least 12 pieces per consignment.',
              'Multi-residue analysis screening more than 400 active substances.',
              'Retained sample frozen and kept for 6 months.'
            ]
          },
          {
            id: '3',
            heading: '3. Conditional release',
            text: [
              'The consignment is released to handling with a compliant grower certificate (conditional release) and stays flagged in SAP QM until our own multi-residue analysis in LIMS confirms the result, within a maximum of 72 h.'
            ]
          },
          {
            id: '4',
            heading: '4. Action on an MRL exceedance',
            text: [
              'A result above the MRL immediately blocks the consignment and all the handling lots made with it.',
              'The Quality and Food Safety Manager decides the fate of the consignment: destroy or return to the grower.',
              'Product already dispatched is located and PR-TRZ-003 is activated within a maximum of 2 h.'
            ]
          },
          {
            id: '5',
            heading: '5. Responsibilities',
            list: [
              'Laboratory Manager: runs the analysis, reports the result in LIMS and informs the Quality and Food Safety Manager.',
              'Quality and Food Safety Manager: orders the block and decides the fate and the recall.',
              'Packing Manager: stops the use of the consignment and holds the affected lots.'
            ]
          },
          {
            id: '6',
            heading: '6. Records',
            list: [
              'Results and retained samples: LIMS.',
              'Blocks and usage decisions: SAP S/4HANA (QM).',
              'Internal alerts of the exceedance: Microsoft Teams.'
            ]
          },
          {
            id: '7',
            heading: '7. References',
            refs: true,
            list: [
              'PR-TRZ-003 · Lot traceability and recall.',
              'PR-REC-001 · Fruit receipt and sampling.',
              'Regulation (EC) 396/2005 · Maximum residue levels of pesticides.'
            ]
          }
        ]
      },
      {
        code: 'PR-TRZ-003',
        title: 'Lot traceability and recall',
        short: 'Traceability and recall',
        type: 'Procedure',
        version: '6',
        date: '2026-01-19',
        owner: 'Quality and Food Safety',
        summary: 'Traces one step back and one step forward for any lot, including online shop orders. Full trace and notice to the competent authority and customers within 4 h; every recall closes with a mass balance.',
        sections: [
          {
            id: 'R',
            heading: 'Summary',
            text: [
              'Traces one step back and one step forward for any lot, including online shop orders. Full trace and notice to the competent authority and customers within 4 h; every recall closes with a mass balance.'
            ]
          },
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: [
              'Ensure the traceability of every lot of fruit received and handled and define the recall of unsafe product, in line with Regulation (EC) 178/2002 (arts. 18 and 19).'
            ]
          },
          {
            id: '2',
            heading: '2. Traceability',
            list: [
              'Backwards: every handling lot links in SAP S/4HANA to its receipt lots, the grower and the plot in Field traceability.',
              'In the centre: the WMS records the location, the chamber and the pallets of every lot.',
              'Forwards: every delivery note or order links the lot to the customer and the destination, including online shop orders.'
            ]
          },
          {
            id: '3',
            heading: '3. Time target',
            text: [
              'The full trace of a lot (receipt, handling lots, shipments, customers and online orders) must be obtained within a maximum of 4 h from the recall decision.',
              'The competent authority and the affected customers are informed within a maximum of 4 h from the decision.'
            ]
          },
          {
            id: '4',
            heading: '4. Action on unsafe product',
            text: [
              'The source lot and the derived lots are blocked in SAP QM and in the WMS, pending shipments and orders are held and those already delivered are located.',
              'If the product has reached the market, the Quality and Food Safety Manager notifies the competent authority under art. 19 of Regulation (EC) 178/2002 and approves the notice to customers.',
              'The steps and the content of the notification are detailed according to PR-CAL-010 (Crisis management and communication with the competent authority).'
            ]
          },
          {
            id: '5',
            heading: '5. Customer notice',
            text: [
              'Customer Care and Logistics contact every customer by phone and email with the list of lots and delivery notes, and record the acknowledgement in SAP S/4HANA.'
            ]
          },
          {
            id: '6',
            heading: '6. Mass balance',
            text: [
              'Every recall closes with a mass balance: quantity of the source lot = blocked stock + dispatched product + consumed or destroyed product.',
              'A balance that does not add up is investigated before the campaign is closed.'
            ]
          },
          {
            id: '7',
            heading: '7. Mock recall',
            text: ['A mock recall is carried out once a year, with the same 4 h target, and its result is filed in SAP S/4HANA.']
          },
          {
            id: '8',
            heading: '8. Records',
            list: [
              'Field traceability, blocks and orders: SAP S/4HANA, WMS and Field traceability.',
              'Customer notices and acknowledgements: SAP S/4HANA and Outlook.',
              'Campaign, balance and mock recalls: SAP S/4HANA.'
            ]
          }
        ]
      },
      {
        code: 'PR-PRO-005',
        title: 'Processing (guacamole and cold press) and HACCP',
        short: 'Processing and HACCP',
        type: 'Procedure',
        version: '4',
        date: '2026-04-21',
        owner: 'Processing',
        summary: 'Four critical control points in processing: fruit receipt and washing, preservation treatment, foreign body detection and cold chain. Weekly record verification, annual audit and allergen management.',
        sections: [
          {
            id: 'R',
            heading: 'Summary',
            text: [
              'Four critical control points in processing: fruit receipt and washing, preservation treatment, foreign body detection and cold chain. Weekly record verification, annual audit and allergen management.'
            ]
          },
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: [
              'Define the HACCP plan for the processing of guacamole, fresh sauces and cold press at the Axarquía handling centre (Málaga), in line with Regulation (EC) 852/2004 (hygiene of foodstuffs) and the IFS Food scheme.',
              'It applies to the processing area. Dispatch is governed by PR-EXP-004.'
            ]
          },
          {
            id: '2',
            heading: '2. HACCP team',
            list: [
              'Coordinator: Quality and Food Safety Manager (HACCP).',
              'Members: Processing Manager, Laboratory Manager and Packing Manager.',
              'The team meets once a quarter and on any critical deviation.'
            ]
          },
          {
            id: '3',
            heading: '3. Critical control points',
            list: [
              'CCP 1 · Fruit receipt and washing: check of the multi-residue result and washing with potable water before pulping (PR-CAL-004).',
              'CCP 2 · Preservation treatment: high pressure processing (HPP) or pasteurisation, with a record of every cycle.',
              'CCP 3 · Foreign body detection: metal detector and X-ray verified with test pieces at the start of every shift.',
              'CCP 4 · Cold chain: finished product below 4 °C until dispatch.'
            ]
          },
          {
            id: '4',
            heading: '4. Corrective actions',
            text: [
              'On a deviation at a CCP, the lot is blocked in SAP QM and in the WMS, and only the Quality and Food Safety Manager decides its fate: release, rework or destroy.',
              'No blocked lot is released by default or because a deadline has expired.'
            ]
          },
          {
            id: '5',
            heading: '5. Verification and review',
            list: [
              'Weekly verification of CCP records by Quality.',
              'Internal audit of the HACCP plan once a year.',
              'Full review of the plan when a line, a critical recipe or a fruit supplier changes.'
            ]
          },
          {
            id: '6',
            heading: '6. Allergen management and cleaning',
            text: [
              'Sauces with declarable allergens (for example celery, mustard or tree nuts) are identified in SAP S/4HANA and made in a defined sequence.',
              'The change to the next product requires validated cleaning, recorded in the cleaning log of the area.'
            ]
          },
          {
            id: '7',
            heading: '7. Records',
            list: ['Analytical results: LIMS.', 'Blocks and usage decisions: SAP S/4HANA (QM).', 'Treatment cycles and temperatures: WMS.']
          }
        ]
      },
      {
        code: 'PR-ECO-002',
        title: 'Online shop orders and shipping',
        short: 'Online shop and shipping',
        type: 'Procedure',
        version: '2',
        date: '2026-05-05',
        owner: 'Online shop',
        summary: 'Orders closed on Thursday at 13:00 are delivered the following week and shipping is free from 50 EUR. Every box keeps the lot of each piece; for a held or recalled lot, customers are notified by email and offered a replacement or refund.',
        sections: [
          {
            id: 'R',
            heading: 'Summary',
            text: [
              'Orders closed on Thursday at 13:00 are delivered the following week and shipping is free from 50 EUR. Every box keeps the lot of each piece; for a held or recalled lot, customers are notified by email and offered a replacement or refund.'
            ]
          },
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: [
              'Define the preparation, packing and shipping of online shop orders (2 kg and 4 kg boxes and special lots) from the Axarquía handling centre (Málaga).'
            ]
          },
          {
            id: '2',
            heading: '2. Deadlines and shipping',
            list: ['Orders closed on Thursday at 13:00 are prepared and delivered the following week.', 'Shipping is free from 50 EUR.']
          },
          {
            id: '3',
            heading: '3. Preparation and traceability',
            list: [
              'The order is prepared only with fruit from released lots.',
              'Every box records the lots of its pieces in the Online shop (PrestaShop) and in SAP S/4HANA.'
            ]
          },
          {
            id: '4',
            heading: '4. Held or recalled lot',
            text: [
              'When a lot is held or recalled, Customer Care notifies by email the customers with online shop orders and offers a replacement or refund.'
            ]
          },
          {
            id: '5',
            heading: '5. Records',
            list: ['Orders and shipments: Online shop (PrestaShop) and SAP S/4HANA.', 'Customer notices: Outlook.']
          }
        ]
      },
      {
        code: 'PR-EXP-004',
        title: 'Export and phytosanitary documentation',
        short: 'Export and documentation',
        type: 'Procedure',
        version: '3',
        date: '2026-02-23',
        owner: 'Dispatch and export',
        summary: 'Every shipment outside Spain carries the residue analysis certificate of the lot and the documentation of the destination country, and it is checked in SAP that the lot is not blocked before loading.',
        sections: [
          {
            id: 'R',
            heading: 'Summary',
            text: [
              'Every shipment outside Spain carries the residue analysis certificate of the lot and the documentation of the destination country, and it is checked in SAP that the lot is not blocked before loading.'
            ]
          },
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: [
              'Define the documentation and checks for shipments to customers in the EU and in third countries from the Axarquía handling centre (Málaga).'
            ]
          },
          {
            id: '2',
            heading: '2. Shipment documentation',
            list: [
              'Delivery note and commercial invoice with the lot number.',
              'Residue analysis certificate of the lot.',
              'Phytosanitary certificate when the destination country requires it (for example, the United Kingdom).',
              'Transport document (CMR) and temperature record of the refrigerated truck.'
            ]
          },
          {
            id: '3',
            heading: '3. Pre-loading check',
            text: [
              'Before loading, Dispatch and Export checks in SAP S/4HANA that the customer and the product are authorised for the destination and that the lot is not blocked.'
            ]
          },
          {
            id: '4',
            heading: '4. Recall of an exported shipment',
            text: [
              'If an exported lot has to be recalled, Dispatch and Export locates the shipment and the Quality and Food Safety Manager informs the competent authority of the destination country through the importer.'
            ]
          },
          {
            id: '5',
            heading: '5. Records',
            list: ['Shipments and delivery notes: SAP S/4HANA.', 'Certificates and transport documents: SAP S/4HANA and Outlook.']
          }
        ]
      }
    ],
    unindexed: {
      'PR-CAL-010': {
        title: 'Crisis management and communication with the competent authority',
        mentionedIn: { doc: 'PR-TRZ-003', sec: '4', quote: 'according to PR-CAL-010 (Crisis management and communication with the competent authority)' }
      }
    },
    suggested: ['lmr', 'recepcion', 'maduracion', 'appcc', 'retirada', 'online'],
    intents: [
      {
        id: 'lmr',
        icon: 'alert-triangle',
        topic: 'Residues · action on an MRL exceedance',
        scope: 'local',
        q: 'What should we do if a lot of fruit exceeds the MRL in the residue analysis?',
        anchors: ['mrl', 'residue', 'residues', 'pesticide', 'pesticides', 'exceedance', 'exceeds', 'multi-residue'],
        terms: ['fruit', 'lot', 'lots', 'analysis', 'do', 'act', 'block', 'hold', 'consignment', 'laboratory', 'detected'],
        min: 3,
        blocks: [
          {
            t: 'A result above the MRL immediately blocks the consignment and all the handling lots made with it.',
            c: [['PR-CAL-004', 4, 'A result above the MRL immediately blocks the consignment and all the handling lots made with it.']]
          },
          {
            t: 'The Quality and Food Safety Manager decides the fate of the consignment: destroy or return to the grower.',
            c: [['PR-CAL-004', 4, 'The Quality and Food Safety Manager decides the fate of the consignment: destroy or return to the grower.']]
          },
          {
            t: 'Product already dispatched is located and the recall procedure is activated within a maximum of 2 h.',
            c: [['PR-CAL-004', 4, 'Product already dispatched is located and PR-TRZ-003 is activated within a maximum of 2 h.']]
          },
          {
            t: 'Blocks and usage decisions are recorded in SAP S/4HANA (QM) and the internal alert is sent through Microsoft Teams.',
            c: [
              ['PR-CAL-004', 6, 'Blocks and usage decisions: SAP S/4HANA (QM).'],
              ['PR-CAL-004', 6, 'Internal alerts of the exceedance: Microsoft Teams.']
            ]
          }
        ],
        context: {
          systems: ['LIMS', 'SAP S/4HANA'],
          text: 'Today (report LAB-2611-0871): pesticide residue above the MRL in Keitt mango MG-2611-KE-031 (18 t from the grower Agrícola La Vega 417), received on 17/11 and conditionally released. The lot went into 3 handling lots and into shipments to 11 customers in 3 countries, and into 640 online shop orders. Under section 4, the consignment and the derived lots are blocked.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Open the recall campaign'
        },
        followups: ['condicionada', 'bloqueo-lote', 'retirada']
      },
      {
        id: 'muestreo',
        icon: 'search',
        topic: 'Residues · sampling on receipt',
        scope: 'local',
        q: 'How is a consignment of fruit sampled for the residue analysis?',
        anchors: ['sampling', 'sampled', 'sample', 'samples', 'retained sample', 'multi-residue', 'screening'],
        terms: ['fruit', 'consignment', 'pieces', 'residues', 'analysis', 'laboratory', 'method', 'how'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'Every consignment is sampled on receipt according to the LIMS plan:',
              c: [['PR-CAL-004', 2, 'Every consignment is sampled on receipt according to the LIMS sampling plan:']]
            },
            list: [
              {
                t: 'Composite sample of at least 12 pieces per consignment.',
                c: [['PR-CAL-004', 2, 'Composite sample of at least 12 pieces per consignment.']]
              },
              {
                t: 'Multi-residue analysis screening more than 400 active substances.',
                c: [['PR-CAL-004', 2, 'Multi-residue analysis screening more than 400 active substances.']]
              },
              {
                t: 'Retained sample frozen and kept for 6 months.',
                c: [['PR-CAL-004', 2, 'Retained sample frozen and kept for 6 months.']]
              }
            ]
          }
        ],
        followups: ['condicionada', 'lmr']
      },
      {
        id: 'recepcion',
        icon: 'truck',
        topic: 'Receipt · checking a consignment of fruit',
        scope: 'local',
        q: 'What is checked when a consignment of fruit arrives at the centre?',
        anchors: ['arrives', 'arrival', 'receipt', 'receive', 'receiving', 'rejected', 'rejection', 'pulp temperature', 'dry matter'],
        terms: ['consignment', 'fruit', 'centre', 'checked', 'truck', 'pallet', 'avocado', 'mango', 'field lot', 'acceptance'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'Every consignment is weighed and recorded with its field lot in Field traceability, and the following is checked:',
              c: [['PR-REC-001', 2, 'Every consignment is weighed and recorded with its field lot in Field traceability:']]
            },
            list: [
              {
                t: 'Record of the grower, the plot and the harvest date.',
                c: [['PR-REC-001', 2, 'Record of the grower, the plot and the harvest date.']]
              },
              {
                t: 'Pulp temperature measured in three pieces per pallet.',
                c: [['PR-REC-001', 2, 'Pulp temperature measured in three pieces per pallet.']]
              },
              {
                t: 'Sample of 20 pieces per consignment for firmness, dry matter (avocado), Brix degrees (mango) and defects.',
                c: [
                  [
                    'PR-REC-001',
                    2,
                    'Sample of 20 pieces per consignment for firmness, dry matter (avocado), Brix degrees (mango) and defects.'
                  ]
                ]
              }
            ]
          },
          {
            t: 'Fruit is accepted with a pulp temperature below 20 °C and, for Hass avocado, a minimum of 21 % dry matter.',
            c: [
              ['PR-REC-001', 3, 'Pulp temperature of the fruit on arrival below 20 °C.'],
              ['PR-REC-001', 3, 'Hass avocado: minimum dry matter of 21 % on receipt.']
            ]
          },
          {
            t: 'A non-conforming consignment is rejected or blocked in SAP QM.',
            c: [['PR-REC-001', 4, 'A non-conforming consignment is rejected or blocked in SAP QM']]
          }
        ],
        followups: ['muestreo', 'lmr']
      },
      {
        id: 'condicionada',
        icon: 'unlock',
        topic: 'Residues · conditional release',
        scope: 'local',
        q: 'Can a consignment of fruit be used before the residue analysis result is available?',
        anchors: ['release', 'released', 'conditional release', 'grower certificate', 'before the result'],
        terms: ['consignment', 'use', 'handling', 'result', 'residues', 'grower', 'hours', 'wait', 'fruit'],
        min: 3,
        blocks: [
          {
            t: 'Yes, with conditional release: the consignment goes to handling with a compliant grower certificate and is flagged in SAP QM.',
            c: [
              [
                'PR-CAL-004',
                3,
                'The consignment is released to handling with a compliant grower certificate (conditional release) and stays flagged in SAP QM'
              ]
            ]
          },
          {
            t: 'The flag stays until our own multi-residue analysis in LIMS confirms the result, within a maximum of 72 h.',
            c: [['PR-CAL-004', 3, 'until our own multi-residue analysis in LIMS confirms the result, within a maximum of 72 h']]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'LIMS'],
          text: 'Keitt mango MG-2611-KE-031 was received on 17/11 with a compliant grower certificate and conditionally released; our own analysis LAB-2611-0871 confirmed the MRL exceedance today, within the 72 h.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Open campaign RET-2026-1120'
        },
        followups: ['lmr', 'muestreo']
      },
      {
        id: 'maduracion',
        icon: 'thermometer',
        topic: 'Ripening · conditions and firmness control',
        scope: 'local',
        q: 'How is the ripening of avocado and mango controlled?',
        anchors: ['ripening', 'ripen', 'ripens', 'ethylene', 'firmness', 'ready', 'penetrometer'],
        terms: ['avocado', 'mango', 'chamber', 'temperature', 'controlled', 'how', 'curve', 'pallet', 'customer'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'Fruit is ripened in chambers with controlled temperature and ethylene:',
              c: [['PR-MAD-002', 2, 'Ripening with ethylene at the temperature and time of the curve of each variety.']]
            },
            list: [
              {
                t: 'Storage setpoint for Hass avocado before ripening: 6.0 °C.',
                c: [['PR-MAD-002', 2, 'Storage setpoint for Hass avocado before ripening: 6.0 °C.']]
              },
              {
                t: 'Ripening with ethylene at the temperature and time of the curve of each variety.',
                c: [['PR-MAD-002', 2, 'Ripening with ethylene at the temperature and time of the curve of each variety.']]
              },
              {
                t: 'Continuous recording of the temperature of every chamber every 5 minutes in the WMS.',
                c: [['PR-MAD-002', 2, 'Continuous recording of the temperature of every chamber every 5 minutes in the WMS.']]
              }
            ]
          },
          {
            t: 'Firmness is measured with a penetrometer on a sample from every pallet before dispatch.',
            c: [['PR-MAD-002', 3, 'Firmness is measured with a penetrometer on a sample from every pallet before dispatch.']]
          },
          {
            t: 'The customer receives fruit within the firmness range agreed for the order.',
            c: [['PR-MAD-002', 3, 'The customer receives fruit within the firmness range agreed for the order.']]
          }
        ],
        followups: ['frio', 'reclamacion-maduracion']
      },
      {
        id: 'frio',
        icon: 'alert-triangle',
        topic: 'Ripening · temperature deviation in a chamber',
        scope: 'local',
        q: 'What is done if a ripening chamber drifts from its temperature setpoint?',
        anchors: ['chamber', 'chambers', 'setpoint', 'alarm', 'compressor', 'drifts', 'temperature deviation'],
        terms: ['ripening', 'cold', 'lots', 'blocks', 'maintenance', 'transfer', 'firmness', 'colour', 'do', 'temperature'],
        min: 3,
        blocks: [
          {
            t: 'A deviation of more than 2 °C from the setpoint for more than 30 minutes triggers an alarm and blocks the lots in the chamber in SAP QM.',
            c: [
              [
                'PR-MAD-002',
                4,
                'A deviation of more than 2 °C from the setpoint for more than 30 minutes triggers an alarm and blocks the lots in the chamber in SAP QM.'
              ]
            ]
          },
          {
            t: 'A maintenance order is opened and the pallets are moved to another chamber at setpoint.',
            c: [['PR-MAD-002', 4, 'A maintenance order is opened and the pallets are moved to another chamber at setpoint.']]
          },
          {
            t: 'Quality checks the firmness and colour of a sample from every pallet, and the Quality and Food Safety Manager decides the fate of the lot.',
            c: [
              [
                'PR-MAD-002',
                4,
                'Quality checks the firmness and colour of a sample from every pallet, and the Quality and Food Safety Manager decides the fate of the lot.'
              ]
            ]
          }
        ],
        context: {
          systems: ['WMS', 'SAP S/4HANA'],
          text: 'Today alarm (05:50, ALM-FRIO-0612): ripening chamber CM-06 is at 11.4 °C against a setpoint of 6.0 °C since 03:40 (compressor failure), holding 9 pallets of Hass avocado size 18 from lot AH-2611-118 (14 t) allocated to 3 supermarket orders and to today online shop orders. Under section 4: the lot is blocked, moved to CM-02 and checked for firmness and colour.',
          outcome: 'alarma',
          go: 'alarma',
          goLabel: 'Open the shift alarm'
        },
        followups: ['maduracion', 'bloqueo-lote', 'online-incidencia']
      },
      {
        id: 'appcc',
        icon: 'clipboard',
        topic: 'HACCP · critical control points in processing',
        scope: 'local',
        q: 'What are the critical control points in the processing of guacamole and cold press?',
        anchors: ['haccp', 'ccp', 'critical control points', 'critical point', 'hazards'],
        terms: ['control', 'processing', 'guacamole', 'cold press', 'which', 'plan', 'verification', 'treatment', 'washing'],
        min: 3,
        blocks: [
          {
            intro: { t: 'The HACCP plan defines four critical control points:', c: [['PR-PRO-005', 3, 'CCP 1 · Fruit receipt and washing']] },
            list: [
              {
                t: 'Fruit receipt and washing: check of the multi-residue result and washing with potable water before pulping.',
                c: [
                  [
                    'PR-PRO-005',
                    3,
                    'CCP 1 · Fruit receipt and washing: check of the multi-residue result and washing with potable water before pulping'
                  ]
                ]
              },
              {
                t: 'Preservation treatment: high pressure processing (HPP) or pasteurisation, with a record of every cycle.',
                c: [
                  [
                    'PR-PRO-005',
                    3,
                    'CCP 2 · Preservation treatment: high pressure processing (HPP) or pasteurisation, with a record of every cycle.'
                  ]
                ]
              },
              {
                t: 'Foreign body detection: metal detector and X-ray verified with test pieces at the start of every shift.',
                c: [
                  [
                    'PR-PRO-005',
                    3,
                    'CCP 3 · Foreign body detection: metal detector and X-ray verified with test pieces at the start of every shift.'
                  ]
                ]
              },
              {
                t: 'Cold chain: finished product below 4 °C until dispatch.',
                c: [['PR-PRO-005', 3, 'CCP 4 · Cold chain: finished product below 4 °C until dispatch']]
              }
            ]
          },
          {
            t: 'Quality verifies the CCP records every week and the plan is audited once a year.',
            c: [
              ['PR-PRO-005', 5, 'Weekly verification of CCP records by Quality.'],
              ['PR-PRO-005', 5, 'Internal audit of the HACCP plan once a year.']
            ]
          }
        ],
        followups: ['bloqueo-lote', 'alergenos']
      },
      {
        id: 'bloqueo-lote',
        icon: 'lock',
        topic: 'HACCP · fate of a blocked lot',
        scope: 'local',
        q: 'Who decides what is done with a lot blocked because of a deviation?',
        anchors: ['blocked', 'hold', 'deviation', 'release', 'rework', 'destroy'],
        terms: ['who', 'decides', 'lot', 'lots', 'fate', 'decision', 'usage', 'sap', 'wms'],
        min: 3,
        blocks: [
          {
            t: 'On a deviation at a CCP, the lot is blocked in SAP QM and in the WMS.',
            c: [['PR-PRO-005', 4, 'the lot is blocked in SAP QM and in the WMS']]
          },
          {
            t: 'Only the Quality and Food Safety Manager decides its fate: release, rework or destroy.',
            c: [['PR-PRO-005', 4, 'only the Quality and Food Safety Manager decides its fate: release, rework or destroy']]
          },
          {
            t: 'No blocked lot is released by default or because a deadline has expired.',
            c: [['PR-PRO-005', 4, 'No blocked lot is released by default or because a deadline has expired.']]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'WMS'],
          text: 'Today there are 3 mango handling lots blocked because of the residue above the MRL in lot MG-2611-KE-031, with 6 t still in the warehouse. The fate of each lot is decided by the Quality and Food Safety Manager.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Open campaign RET-2026-1120'
        },
        followups: ['lmr', 'retirada']
      },
      {
        id: 'retirada',
        icon: 'truck',
        topic: 'Recall · trace and notice deadlines',
        scope: 'local',
        q: 'How quickly must the full trace be available and the authority and customers be notified in a recall?',
        anchors: ['recall', 'withdrawal', 'withdraw', 'mock recall', '4 h', 'authority'],
        terms: ['trace', 'traceability', 'time', 'deadline', 'hours', 'customers', 'full', 'notify', 'inform', 'how long'],
        min: 3,
        blocks: [
          {
            t: 'The full trace of the lot (receipt, handling lots, shipments, customers and online orders) must be obtained within a maximum of 4 h from the recall decision.',
            c: [['PR-TRZ-003', 3, 'must be obtained within a maximum of 4 h from the recall decision']]
          },
          {
            t: 'The competent authority and the affected customers are informed within the same 4 h.',
            c: [
              [
                'PR-TRZ-003',
                3,
                'The competent authority and the affected customers are informed within a maximum of 4 h from the decision.'
              ]
            ]
          },
          {
            t: 'The source lot and the derived lots are blocked, pending shipments and orders are held and those already delivered are located.',
            c: [
              [
                'PR-TRZ-003',
                4,
                'The source lot and the derived lots are blocked in SAP QM and in the WMS, pending shipments and orders are held and those already delivered are located.'
              ]
            ]
          }
        ],
        context: {
          text: 'Campaign RET-2026-1120: from Keitt mango MG-2611-KE-031 (18 t) into 3 handling lots, shipments to 11 customers in Spain, France and Germany and 640 online shop orders. The target is to inform the authority and the customers within 4 h (Regulation (EC) 178/2002, art. 19; Regulation (EC) 396/2005 on MRLs).',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Open campaign RET-2026-1120',
          systems: ['SAP S/4HANA', 'WMS']
        },
        followups: ['trazabilidad', 'notificacion', 'balance']
      },
      {
        id: 'trazabilidad',
        icon: 'barcode',
        topic: 'Traceability · backwards and forwards',
        scope: 'local',
        q: 'How is a lot of fruit traced backwards and forwards?',
        anchors: ['trace', 'traceability', 'backwards', 'forwards', 'genealogy', 'delivery note', 'plot'],
        terms: ['lot', 'fruit', 'customer', 'grower', 'how', 'sap', 'wms', 'record', 'order'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'The trace relies on three records:',
              c: [
                [
                  'PR-TRZ-003',
                  2,
                  'Backwards: every handling lot links in SAP S/4HANA to its receipt lots, the grower and the plot in Field traceability.'
                ]
              ]
            },
            list: [
              {
                t: 'Backwards: every handling lot links in SAP S/4HANA to its receipt lots, the grower and the plot in Field traceability.',
                c: [
                  [
                    'PR-TRZ-003',
                    2,
                    'Backwards: every handling lot links in SAP S/4HANA to its receipt lots, the grower and the plot in Field traceability.'
                  ]
                ]
              },
              {
                t: 'In the centre: the WMS records the location, the chamber and the pallets of every lot.',
                c: [['PR-TRZ-003', 2, 'In the centre: the WMS records the location, the chamber and the pallets of every lot.']]
              },
              {
                t: 'Forwards: every delivery note or order links the lot to the customer and the destination, including online shop orders.',
                c: [
                  [
                    'PR-TRZ-003',
                    2,
                    'Forwards: every delivery note or order links the lot to the customer and the destination, including online shop orders.'
                  ]
                ]
              }
            ]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'Trazabilidad de campo', 'LIMS'],
          text: 'Full trace of the example lot, from the plots to the shipments and orders:',
          lot: 'AH-2611-118'
        },
        followups: ['retirada', 'balance']
      },
      {
        id: 'balance',
        icon: 'layers',
        topic: 'Recall · mass balance',
        scope: 'local',
        q: 'How is a recall closed and what is the mass balance?',
        anchors: ['balance', 'mass balance', 'closure', 'close', 'adds up', 'tonnes'],
        terms: ['recall', 'campaign', 'mass', 'stock', 'dispatched', 'blocked', 'quantity', 'lot'],
        min: 3,
        blocks: [
          {
            t: 'Every recall closes with a mass balance: quantity of the source lot = blocked stock + dispatched product + consumed or destroyed product.',
            c: [
              [
                'PR-TRZ-003',
                6,
                'Every recall closes with a mass balance: quantity of the source lot = blocked stock + dispatched product + consumed or destroyed product.'
              ]
            ]
          },
          {
            t: 'A balance that does not add up is investigated before the campaign is closed.',
            c: [['PR-TRZ-003', 6, 'A balance that does not add up is investigated before the campaign is closed.']]
          },
          {
            t: 'The campaign, the balance and the mock recalls are filed in SAP S/4HANA.',
            c: [['PR-TRZ-003', 8, 'Campaign, balance and mock recalls: SAP S/4HANA.']]
          }
        ],
        context: {
          text: 'Balance of RET-2026-1120: 18 t = 6 t in the warehouse + 12 t dispatched to 11 customers and to online shop orders. It adds up: no product has been consumed or destroyed yet.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Open campaign RET-2026-1120',
          systems: ['SAP S/4HANA']
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
        anchors: ['authority', 'notify', 'notification', 'notified', 'article 19', 'art. 19', '178/2002'],
        terms: ['recall', 'competent', 'product', 'market', 'how', 'notice', 'customers'],
        min: 2,
        blocks: [
          {
            t: 'If the product has reached the market, the Quality and Food Safety Manager notifies the competent authority under art. 19 of Regulation (EC) 178/2002 and approves the notice to customers.',
            c: [
              [
                'PR-TRZ-003',
                4,
                'the Quality and Food Safety Manager notifies the competent authority under art. 19 of Regulation (EC) 178/2002 and approves the notice to customers'
              ]
            ]
          },
          {
            t: 'The steps and the content of the notification are detailed according to PR-CAL-010.',
            c: [['PR-TRZ-003', 4, 'according to PR-CAL-010 (Crisis management and communication with the competent authority)']]
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
        anchors: ['notify', 'notice', 'notified', 'customers', 'acknowledgement', 'importer', 'france', 'germany'],
        terms: ['recall', 'list', 'lots', 'delivery notes', 'country', 'destination', 'authority', 'exported', 'how'],
        min: 3,
        blocks: [
          {
            t: 'Customer Care and Logistics contact every customer by phone and email with the list of lots and delivery notes.',
            c: [
              [
                'PR-TRZ-003',
                5,
                'Customer Care and Logistics contact every customer by phone and email with the list of lots and delivery notes'
              ]
            ]
          },
          {
            t: 'The acknowledgement of each customer is recorded in SAP S/4HANA.',
            c: [['PR-TRZ-003', 5, 'record the acknowledgement in SAP S/4HANA']]
          },
          {
            t: 'For an exported shipment, Dispatch and Export locates the shipment and the authority of the destination country is informed through the importer.',
            c: [
              [
                'PR-EXP-004',
                4,
                'Dispatch and Export locates the shipment and the Quality and Food Safety Manager informs the competent authority of the destination country through the importer'
              ]
            ]
          }
        ],
        context: {
          text: 'Of the 11 customers in RET-2026-1120, there are supermarket chains and wholesalers in Spain, France and Germany: for those in France and Germany, the authority of the destination country is informed through the importer.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Open campaign RET-2026-1120',
          systems: ['SAP S/4HANA', 'Microsoft Teams']
        },
        followups: ['retirada', 'exportacion']
      },
      {
        id: 'alergenos',
        icon: 'alert-triangle',
        topic: 'Processing · allergen management',
        scope: 'local',
        q: 'How are allergens managed in the processing area?',
        anchors: ['allergen', 'allergens', 'declarable'],
        terms: ['processing', 'managed', 'management', 'sauces', 'sequence', 'cleaning', 'change', 'product', 'area'],
        min: 2,
        blocks: [
          {
            t: 'Sauces with declarable allergens are identified in SAP S/4HANA and made in a defined sequence.',
            c: [
              [
                'PR-PRO-005',
                6,
                'Sauces with declarable allergens (for example celery, mustard or tree nuts) are identified in SAP S/4HANA and made in a defined sequence.'
              ]
            ]
          },
          {
            t: 'The change to the next product requires validated cleaning, recorded in the cleaning log of the area.',
            c: [['PR-PRO-005', 6, 'The change to the next product requires validated cleaning, recorded in the cleaning log of the area.']]
          }
        ],
        followups: ['appcc']
      },
      {
        id: 'online',
        icon: 'box',
        topic: 'Online shop · deadlines and shipping',
        scope: 'local',
        q: 'When are online shop orders delivered and from what amount is shipping free?',
        anchors: ['shop', 'online', 'order', 'orders', 'thursday', 'shipping', 'delivery', 'delivered'],
        terms: ['when', 'amount', 'free', 'deadline', 'cut-off', 'week', 'box', 'boxes'],
        min: 3,
        blocks: [
          {
            t: 'Orders closed on Thursday at 13:00 are prepared and delivered the following week.',
            c: [['PR-ECO-002', 2, 'Orders closed on Thursday at 13:00 are prepared and delivered the following week.']]
          },
          { t: 'Shipping is free from 50 EUR.', c: [['PR-ECO-002', 2, 'Shipping is free from 50 EUR.']] },
          {
            t: 'The order is prepared only with fruit from released lots, and every box records the lots of its pieces.',
            c: [
              ['PR-ECO-002', 3, 'The order is prepared only with fruit from released lots.'],
              ['PR-ECO-002', 3, 'Every box records the lots of its pieces in the Online shop (PrestaShop) and in SAP S/4HANA.']
            ]
          }
        ],
        context: {
          systems: ['Tienda online (PrestaShop)', 'SAP S/4HANA'],
          text: 'Today there are 214 online orders to serve; those with avocado from lot AH-2611-118 depend on the decision on chamber CM-06.',
          outcome: 'alarma',
          go: 'alarma',
          goLabel: 'Open the shift alarm'
        },
        followups: ['online-incidencia', 'frio']
      },
      {
        id: 'online-incidencia',
        icon: 'mail',
        topic: 'Online shop · held or recalled lot',
        scope: 'local',
        q: 'What is done with online orders if a lot is held or recalled?',
        anchors: ['held', 'recalled', 'replacement', 'refund', 'online orders', 'hold', 'recall'],
        terms: ['orders', 'online', 'shop', 'lot', 'customers', 'notifies', 'email', 'what'],
        min: 3,
        blocks: [
          {
            t: 'Customer Care notifies by email the customers with affected online shop orders.',
            c: [['PR-ECO-002', 4, 'Customer Care notifies by email the customers with online shop orders']]
          },
          { t: 'A replacement or refund is offered.', c: [['PR-ECO-002', 4, 'offers a replacement or refund']] },
          {
            t: 'Pending orders are held and are only prepared with fruit from released lots.',
            c: [
              ['PR-TRZ-003', 4, 'pending shipments and orders are held'],
              ['PR-ECO-002', 3, 'The order is prepared only with fruit from released lots.']
            ]
          }
        ],
        context: {
          text: 'In RET-2026-1120 there are 640 online shop orders with fruit from the 3 affected handling lots: Customer Care notifies them by email and offers a replacement or refund.',
          outcome: 'retirada',
          go: 'retirada',
          goLabel: 'Open campaign RET-2026-1120',
          systems: ['Tienda online (PrestaShop)', 'Outlook']
        },
        followups: ['retirada', 'clientes-aviso']
      },
      {
        id: 'exportacion',
        icon: 'truck',
        topic: 'Export · shipment documentation',
        scope: 'local',
        q: 'What documentation does a shipment to another country carry?',
        anchors: ['export', 'exported', 'shipment', 'shipments', 'documentation', 'phytosanitary certificate', 'cmr'],
        terms: ['country', 'destination', 'delivery note', 'invoice', 'certificate', 'transport', 'loading', 'france', 'germany', 'lot'],
        min: 3,
        blocks: [
          {
            intro: {
              t: 'Every shipment carries, at the very least:',
              c: [['PR-EXP-004', 2, 'Delivery note and commercial invoice with the lot number.']]
            },
            list: [
              {
                t: 'Delivery note and commercial invoice with the lot number.',
                c: [['PR-EXP-004', 2, 'Delivery note and commercial invoice with the lot number.']]
              },
              { t: 'Residue analysis certificate of the lot.', c: [['PR-EXP-004', 2, 'Residue analysis certificate of the lot.']] },
              {
                t: 'Phytosanitary certificate when the destination country requires it (for example, the United Kingdom).',
                c: [['PR-EXP-004', 2, 'Phytosanitary certificate when the destination country requires it (for example, the United Kingdom).']]
              },
              {
                t: 'Transport document (CMR) and temperature record of the refrigerated truck.',
                c: [['PR-EXP-004', 2, 'Transport document (CMR) and temperature record of the refrigerated truck.']]
              }
            ]
          },
          {
            t: 'Before loading, it is checked in SAP S/4HANA that the customer and the product are authorised for the destination and that the lot is not blocked.',
            c: [
              [
                'PR-EXP-004',
                3,
                'checks in SAP S/4HANA that the customer and the product are authorised for the destination and that the lot is not blocked'
              ]
            ]
          }
        ],
        context: {
          systems: ['SAP S/4HANA'],
          text: 'Among the 11 customers in recall RET-2026-1120 there are platforms in France and Germany: their delivery notes carry the residue analysis certificate of the lot.',
          go: 'retirada',
          goLabel: 'Open campaign RET-2026-1120'
        },
        followups: ['clientes-aviso', 'retirada']
      },
      {
        id: 'reclamacion-maduracion',
        icon: 'mail',
        topic: 'Customer complaint · uneven ripening',
        scope: 'all',
        q: 'What deadlines and steps apply if a customer complains that fruit arrives hard or unevenly ripened?',
        anchors: ['complaint', 'complaints', 'complains', 'claim', '8d', 'customer complains'],
        terms: ['deadline', 'deadlines', 'acknowledgement', 'report', 'ripening', 'uneven', 'hard', 'fruit', 'firmness', 'curve', 'days'],
        min: 3,
        blocks: [
          {
            t: 'Acknowledgement within 24 h and 8D report within 10 working days.',
            c: [['PR-MAD-002', 5, 'the acknowledgement is sent within 24 h and the 8D report within 10 working days']]
          },
          {
            t: 'The ripening curve and the temperature records of the lot are reviewed and compared with the firmness measurement of the customer.',
            c: [
              [
                'PR-MAD-002',
                5,
                'The ripening curve and the temperature records of the lot are reviewed and compared with the firmness measurement of the customer.'
              ]
            ]
          },
          {
            t: 'A cause is only reported as confirmed when there is evidence; until then it is presented as a hypothesis under investigation.',
            c: [
              [
                'PR-MAD-002',
                5,
                'A cause is only reported as confirmed when there is evidence; until then it is presented as a hypothesis under investigation.'
              ]
            ]
          }
        ],
        context: {
          systems: ['SAP S/4HANA', 'WMS'],
          text: 'Case CLM-2026-1120: Supermercados Levante Fresh, S.A. complains that 35 % of the ready-to-eat avocados in order PED-2026-44718 (lot AH-2611-092) arrived hard in 4 stores, and asks for a credit and an analysis. Until the ripening curve and the temperature records of the lot are reviewed, the cause is a hypothesis.',
          outcome: 'reclamacion',
          go: 'reclamacion',
          goLabel: 'Open complaint CLM-2026-1120'
        },
        followups: ['maduracion', 'frio']
      }
    ],
    other_scopes: {
      topic: 'Another centre',
      words: ['almeria', 'huelva', 'valencia', 'murcia', 'seville', 'canary islands'],
      reason: 'The indexed documents on this topic are from the Axarquía handling centre (Málaga); there is no evidence for {x}.'
    },
    gaps: [
      {
        id: 'plagas',
        topic: 'Pest control',
        anchors: ['pest', 'pests', 'rodents', 'traps', 'rodent control', 'insects', 'pest control'],
        reason: 'No indexed document contains the pest control programme of the centre; PR-REC-001 only mentions the visual inspection for pests on receipt.'
      },
      {
        id: 'agua',
        topic: 'Water quality',
        anchors: ['irrigation', 'irrigation water', 'process water', 'water quality', 'water analysis', 'legionella'],
        reason: 'No indexed document contains the analysis plan for irrigation or process water; PR-CAL-004 refers to a plan of its own.'
      },
      {
        id: 'sostenibilidad',
        topic: 'Sustainability and ESG',
        anchors: ['sustainability', 'footprint', 'carbon', 'emissions', 'esg', 'scope 1', 'scope 3', 'water footprint'],
        reason: 'No indexed document covers the emissions inventory, the water footprint or the ESG policy of the centre.'
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
})('fruta');
