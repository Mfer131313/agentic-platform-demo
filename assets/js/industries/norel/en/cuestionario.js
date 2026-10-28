/* Norel Nutrición Animal · feed additive supplier audit questionnaire from Grupo Integrador Levante (English). Demonstration scenario with synthetic data (MFM). */
agenticPackEn('norel', {
  cuestionario: {
    agent: 'Customer questionnaires',
    lang: 'en',
    default_sel: 'B2',
    reviewer: 'Quality and Food Safety Manager',
    assignee: 'Quality and Food Safety Manager',
    assignee_short: 'Quality and HACCP',
    team: 'Quality',
    assign_due: '2026-10-30',
    responder: 'Norel Nutrición Animal (Norel, S.A.) · Premix plant (Spain)',
    site: 'Premix plant (Spain)',
    site_label: 'Plant',
    page_title: 'Supplier audit · Grupo Integrador Levante',
    report_title: 'Response to feed additive supplier audit questionnaire',
    ref_label: 'Customer reference',
    scope_meta_label: 'Products',
    discard_placeholder: 'For example: this question is answered with the attached certificate',
    save_system: 'Salesforce CRM',
    qn: {
      code: 'CUE-2026-052',
      title: 'Feed Additive Supplier Audit Questionnaire 2026',
      customer: 'Grupo Integrador Levante',
      via: 'Supplier Purchasing and Quality',
      received: '2026-10-26T10:15',
      due: '2026-11-06',
      file: 'Levante_Auditoria_proveedor_aditivos_2026.xlsx',
      scope: 'vitamin-mineral premixes and nutritional additives for poultry supplied to the feed mills of Grupo Integrador Levante',
      scope_short: 'Poultry premixes and additives',
      scope_label: '2 product families'
    },
    email: {
      mailbox: 'Quality mailbox',
      headers: {
        From: 'Compras y Calidad de Proveedores, Grupo Integrador Levante <proveedores@integradorlevante.example>',
        To: 'Calidad, Norel Nutrición Animal <calidad@norel-demo.example>',
        Date: 'Mon, 26 Oct 2026 10:15 (Madrid time)',
        Subject: 'Feed additive supplier audit 2026 - pre-audit questionnaire - response due 6 November'
      },
      text: 'Dear Quality Team,\n\nAs part of our annual supplier approval programme, Grupo Integrador Levante is sending you the 2026 feed additive supplier audit questionnaire, ahead of the document audit, for the premixes and additives you supply to our poultry feed mills.\n\nIt has 15 questions in five sections: management systems and certifications, food safety, process control, traceability and recall, and compliance and sustainability.\n\nFor each answer, please reference the procedure, record or certificate that supports it. We need the completed questionnaire by Friday 6 November 2026.\n\nKind regards,\n\nSupplier Purchasing and Quality\nGrupo Integrador Levante',
      highlights: [
        { text: 'premixes and additives you supply to our poultry feed mills', label: 'Scope', tone: 'brand' },
        { text: '15 questions', label: 'Questions', tone: 'brand' },
        { text: 'reference the procedure, record or certificate that supports it', label: 'Requirement' },
        { text: 'Friday 6 November 2026', label: 'Deadline' }
      ]
    },
    sections: [
      { id: 'A', en: 'Management systems and certifications' },
      { id: 'B', en: 'Food safety' },
      { id: 'C', en: 'Process control' },
      { id: 'D', en: 'Traceability and recall' },
      { id: 'E', en: 'Compliance and sustainability' }
    ],
    kpi: {
      label: 'Audits and visits in 2025',
      value: 17,
      sub: 'Includes official inspections · 24 audit days · Sustainability Report 2025',
      icon: 'shield-check'
    },
    sources_sub: 'Procedures, certificates, records and sustainability report',
    identify_result: 'Grupo Integrador Levante via Supplier Purchasing and Quality · poultry premixes and additives',
    search_scope: 'Quality procedures, certificates, LIMS and MES records and sustainability report',
    lookups: [
      {
        system: 'SAP S/4HANA',
        action: 'Checks the premix batches and their raw materials supplied to Grupo Integrador Levante',
        result: 'PRM-2610-0402: MP-2610-VE-041 and MP-2610-OE-071 · 3 delivery notes to Grupo Integrador Levante',
        ms: 520
      },
      {
        system: 'LIMS',
        action: 'Reviews the Salmonella plan and the 2026 content verification',
        result: '428 Salmonella tests, 0 positives up to 27/10 · 271 batches verified',
        ms: 480
      },
      {
        system: 'Plant MES',
        action: 'Reads the line cleanings and product changes',
        result: '312 product changes in 12 weeks · 312 with validated cleaning',
        ms: 410
      },
      {
        system: 'SharePoint',
        action: 'Checks certificates, the regulatory file and current procedures',
        result: 'GMP+ B2 valid until 14/05/2027 · FAMI-QS with no expiry date on the sheet',
        ms: 300
      },
      {
        system: 'Salesforce CRM',
        action: 'Searches open and closed complaints of the plant',
        result: 'CLM-2026-1028 open (another customer): vitamin E in PRM-2610-0388',
        ms: 350,
        tone: 'warn'
      },
      {
        system: 'LIMS',
        action: 'Cross-checks this customer batches with today alert',
        result: 'MP-2610-CC-118 positive for Salmonella · no Grupo Integrador Levante delivery note with product from that lot',
        ms: 390,
        tone: 'warn'
      }
    ],
    compare: {
      people: '2-3: Quality and Food Safety, Laboratory and, depending on the question, Regulatory Affairs or Production',
      systems: '6-8: email, the customer Excel file, SAP, LIMS, MES, SharePoint, certificates folder and procedures',
      steps: 'Find the source for each question, copy and adapt answers from previous years, ask the Laboratory and the Plant for data and build the Excel file',
      time: '4-6 h of Quality work, spread over 3-4 days'
    },
    presenter: {
      before: [
        'Every integrator and feed mill brings its own supplier questionnaire. In 2025 Norel received 17 customer audits, certification audits and inspections: 24 audit days. It is background work that eats up Quality hours.',
        'This one comes from Grupo Integrador Levante: {total} questions about the premixes and additives you supply to its poultry mills, covering GMP+ B2, FAMI-QS, HACCP, Salmonella, recall and ESG.',
        'When you press the button, Agentic Platform searches procedures, certificates and the sustainability report, plus the records in SAP, LIMS, MES, SharePoint and Salesforce, and drafts each answer with its source.'
      ],
      during: [
        '{drafted} of {total} have a cited draft; every citation is checked against the source text. {flagged} are left for Quality: mycotoxins, GMO-free and emissions. No supporting document, nothing invented.',
        'B2: besides answering, it warns that choline chloride MP-2610-CC-118 tested positive for Salmonella this morning and that none of this customer delivery notes carries product from that lot. Today that depends on someone remembering.',
        'B4: it warns that another customer has complaint CLM-2026-1028 open for vitamin E before the effectiveness of content verification is asserted. The questionnaire does not live in isolation from the rest of the plant.',
        'Nothing goes out without approval: bulk approval only for high-confidence answers; medium-confidence ones are reviewed one by one.'
      ],
      next_during: 'Show B2 (citation and today Salmonella warning) and B3 (no evidence). Then "Approve the {alta} high-confidence answers", approve {media_ids} one by one and "Assign the {flagged} without a source to Quality and HACCP".'
    },
    sources: {
      'PR-CAL-001': {
        type: 'doc',
        kind: 'Procedure',
        code: 'PR-CAL-001',
        title: 'HACCP plan for premix manufacturing',
        system: 'Procedimientos',
        sections: [
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: 'Define the HACCP plan for the manufacture of vitamin-mineral premixes and additives at the Premix plant (Spain), in line with Regulation (EC) 183/2005 (feed hygiene) and the GMP+ B2 scheme. It applies to all dosing, mixing and packing lines. Transport is governed by PR-EXP-002.'
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
            id: '5',
            heading: '5. Verification and review',
            list: [
              'Weekly verification of CCP records by Quality.',
              'Internal audit of the HACCP plan once a year.',
              'Full review of the plan when a line, a critical formula or a raw material supplier changes.'
            ]
          }
        ]
      },
      'PR-CAL-004': {
        type: 'doc',
        kind: 'Procedure',
        code: 'PR-CAL-004',
        title: 'Sampling and Salmonella control in raw materials',
        system: 'Procedimientos',
        sections: [
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: 'Control Salmonella in the high-risk raw materials (choline chloride, vitamins, organic trace minerals and carriers) received at the plant. Mycotoxin control is governed by the analytical plan of each raw material and is not part of this procedure.'
          },
          {
            id: '2',
            heading: '2. Sampling',
            text: 'Every lot of high-risk raw material is sampled on receipt according to the LIMS sampling plan:',
            list: [
              'Composite sample of at least 10 points per lot.',
              '25 g sample tested with the ISO 6579-1 reference method.',
              'Retained sample kept for 12 months.'
            ]
          },
          {
            id: '3',
            heading: '3. Conditional release',
            text: 'The lot is released to production with a compliant supplier certificate of analysis (conditional release) and stays flagged in SAP QM until our own Salmonella test in LIMS confirms the result, within 5 working days at most.'
          },
          {
            id: '4',
            heading: '4. Action on a positive result',
            text: 'A positive Salmonella result immediately blocks the lot and every product batch made with it. The Quality and Food Safety Manager decides what happens to the lot: destroy it or return it to the supplier. Product already shipped is located and PR-CAL-007 is activated within 2 h at most.'
          }
        ]
      },
      'PR-CAL-007': {
        type: 'doc',
        kind: 'Procedure',
        code: 'PR-CAL-007',
        title: 'Recall and batch traceability',
        system: 'Procedimientos',
        sections: [
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: 'Ensure the traceability of every raw material and premix batch and define the recall of unsafe product, in line with Regulation (EC) 178/2002 (arts. 18 and 19).'
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
            text: 'The full trace of a lot (raw material, premix batches, shipments and customers) must be obtained within 4 h at most from the recall decision. The competent authority and the affected customers are informed within 4 h at most from the decision.'
          },
          {
            id: '4',
            heading: '4. Action on unsafe product',
            text: 'The source lot and the derived batches are blocked in SAP QM and in the MES, pending shipments are held and those already delivered are located. If the product has reached the market, the Quality and Food Safety Manager notifies the competent authority under art. 19 of Regulation (EC) 178/2002 and approves the notice to customers. The steps and content of the notification are detailed according to PR-CAL-010 (Crisis management and communication with the competent authority).'
          },
          {
            id: '5',
            heading: '5. Customer notice',
            text: 'Customer Care and Norel Solutions contact each customer by phone and email with the list of lots and delivery notes, and record the acknowledgement in Salesforce CRM.'
          },
          {
            id: '6',
            heading: '6. Mass balance',
            text: 'Every recall closes with a mass balance: quantity of the source lot = blocked stock + product shipped + product consumed or destroyed. A balance that does not tally is investigated before the campaign is closed.'
          }
        ]
      },
      'PR-PRO-003': {
        type: 'doc',
        kind: 'Procedure',
        code: 'PR-PRO-003',
        title: 'Cross-contamination control and line cleaning',
        system: 'Procedimientos',
        sections: [
          {
            id: '2',
            heading: '2. Production sequence',
            text: 'Planning sequences production from lower to higher risk. Products with additives that have a regulated maximum content are made at the end of the sequence and followed by a cleaning.'
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
            text: 'The maximum carry-over allowed between products is 0.5 % and it is checked every quarter with a tracer test on each line. A carry-over above the limit blocks the line until the cleaning is repeated and the test is passed again.'
          },
          {
            id: '5',
            heading: '5. Allergen management',
            text: 'Raw materials with declarable allergens are identified in SAP S/4HANA and stored separately. Products with allergens are made in a defined sequence and the change to the next product requires validated cleaning.'
          }
        ]
      },
      'PR-REG-002': {
        type: 'doc',
        kind: 'Procedure',
        code: 'PR-REG-002',
        title: 'Labelling and declaration of additives (Regulation (EC) 1831/2003)',
        system: 'Procedimientos',
        sections: [
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
            text: 'Before the first purchase of a substance, Regulatory Affairs verifies the REACH registration number of the supplier or manufacturer and stores it in SAP S/4HANA. A substance without a valid REACH registration is not purchased.'
          }
        ]
      },
      'PR-LAB-005': {
        type: 'doc',
        kind: 'Procedure',
        code: 'PR-LAB-005',
        title: 'Content verification (vitamins and trace minerals)',
        system: 'Procedimientos',
        sections: [
          {
            id: '2',
            heading: '2. Sampling and testing',
            text: 'A sample of every premix batch is tested before release. The fat-soluble vitamins A, D3 and E and the trace minerals Cu, Zn, Mn, Fe and Se are verified with a validated method.'
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
            text: 'An out-of-tolerance result blocks the batch in SAP QM and requires the test to be repeated in duplicate with the retained sample. If confirmed, the Quality and Food Safety Manager decides what happens to the batch and an 8D report is opened.'
          }
        ]
      },
      'PR-EXP-002': {
        type: 'doc',
        kind: 'Procedure',
        code: 'PR-EXP-002',
        title: 'Export and sanitary documentation',
        system: 'Procedimientos',
        sections: [
          {
            id: '4',
            heading: '4. Recall of an exported shipment',
            text: 'If an exported batch has to be recalled, Logistics and Export locates the shipment and the Quality and Food Safety Manager informs the competent authority of the destination country through the importer.'
          }
        ]
      },
      'CERT-GMP': {
        type: 'doc',
        kind: 'Certificate',
        code: 'CERT-GMP-B2',
        title: 'GMP+ B2 certificate · Production of additives and premixes',
        system: 'Procedimientos',
        org: 'Certification body (fictitious) · certificate no. DEMO-GMP-0412',
        date: '2025-05-15',
        sections: [
          {
            id: 'alc',
            heading: 'Scope',
            text: 'Production, trade and storage of premixes and additives for animal nutrition (GMP+ B2). Site: Premix plant (Spain).'
          },
          {
            id: 'vig',
            heading: 'Validity',
            text: 'Issued on 15/05/2025; valid until 14/05/2027. 2026 surveillance audit passed with no major non-conformities.'
          }
        ]
      },
      'CERT-FAMI': {
        type: 'doc',
        kind: 'Certificate',
        code: 'FAMI-QS',
        title: 'FAMI-QS certificate · Additives and premixes',
        system: 'Procedimientos',
        org: 'Certification body (fictitious) · certificate no. DEMO-FQS-0087',
        sections: [
          {
            id: 'alc',
            heading: 'Scope',
            text: 'Operator of additives and premixes for animal nutrition, according to the FAMI-QS Code. Site: Premix plant (Spain).'
          },
          { id: 'nota', heading: 'Indexing note', text: 'The indexed sheet does not state the expiry date of the certificate.' }
        ]
      },
      'SP-REG': {
        type: 'record',
        kind: 'Regulatory file',
        code: 'REG-183',
        title: 'Establishment approval · Regulation (EC) 183/2005',
        system: 'SharePoint',
        org: 'SharePoint · plant regulatory file',
        sections: [
          {
            id: 'aut',
            heading: 'Approval',
            text: 'Establishment approved for the manufacture of additives and premixes under Regulation (EC) 183/2005, with the fictitious approval number DEMO-183-0007.'
          }
        ]
      },
      'MEM-2025': {
        type: 'doc',
        kind: 'Annual report',
        code: null,
        label: 'Report 2025',
        title: 'Sustainability Report 2025',
        system: 'Procedimientos',
        org: 'Norel Nutrición Animal · published on 30/06/2026 (synthetic data)',
        sections: [
          {
            id: 'aud',
            heading: 'Audits and inspections',
            text: 'Customer audits, certification audits and official inspections in 2025: 17 (24 audit days), no sanctions.'
          },
          { id: 'ene', heading: 'Energy', text: 'Electricity consumption 2025: 6,480 MWh, 41 % from renewable sources with guarantee of origin.' }
        ]
      },
      'LIMS-SAL': {
        type: 'record',
        kind: 'Laboratory results',
        code: 'Salmonella 2026',
        title: 'Salmonella in raw materials · 2026 results',
        system: 'LIMS',
        org: 'LIMS · test results',
        sections: [{ id: 'res', heading: 'Results', text: 'Salmonella in high-risk raw materials up to 27/10/2026: 428 tests, 0 positives.' }]
      },
      'LIMS-VER': {
        type: 'record',
        kind: 'Laboratory results',
        code: 'Contenidos 2026',
        title: 'Premix content verification · 2026 results',
        system: 'LIMS',
        org: 'LIMS · batch verification',
        sections: [
          {
            id: 'res',
            heading: 'Results',
            text: 'Content verification up to 27/10/2026: 271 premix batches tested, 268 compliant and 3 with a deviation investigated and closed with corrective action.'
          }
        ]
      },
      'MES-LIM': {
        type: 'record',
        kind: 'Cleaning records',
        code: 'Limpiezas',
        title: 'Product changes and validated cleanings',
        system: 'MES de planta',
        org: 'Plant MES · line cleanings',
        sections: [{ id: 'cam', heading: 'Last 12 weeks', text: 'Product changes in the last 12 weeks: 312, all with validated cleaning.' }]
      },
      'SAP-LOT': {
        type: 'record',
        kind: 'Batch record',
        code: 'PRM-2610-0402',
        title: 'Batch PRM-2610-0402 · raw materials and manufacturing',
        system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · batch record',
        sections: [
          {
            id: 'origen',
            heading: 'Origin and manufacturing',
            text: 'Vitamin and trace mineral premix for broilers made on 12/10/2026 with raw materials MP-2610-VE-041 (vitamin E) and MP-2610-OE-071 (trace minerals); content verification compliant'
          }
        ]
      },
      'SAP-ALB': {
        type: 'record',
        kind: 'Forward trace',
        code: 'PRM-2610-0402',
        title: 'Batch PRM-2610-0402 · shipments and customers',
        system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · delivery notes',
        sections: [
          {
            id: 'fwd',
            heading: 'Shipments',
            text: '1 customer: Grupo Integrador Levante, 3 delivery notes (80051231, 80051239 and 80051244) between 14/10 and 19/10/2026'
          }
        ]
      },
      'SF-RCL': {
        type: 'record',
        kind: 'Complaints register',
        code: 'Reclamaciones',
        title: 'Registered customer complaints',
        system: 'Salesforce CRM',
        org: 'Salesforce CRM · complaints and cases',
        sections: [
          { id: 'pla', heading: 'Deadlines', text: 'Handling deadlines: acknowledgement within 24 h and 8D report within 10 working days.' },
          {
            id: 'res',
            heading: '2026 summary',
            text: 'Complaints in 2026 up to 27/10: 9 closed with root cause and corrective action recorded; 1 open (CLM-2026-1028).'
          }
        ]
      }
    },
    questions: [
      {
        id: 'A1',
        ref: 'LEV-26 · A1',
        sec: 'A',
        topic: 'Feed safety certifications',
        conf: 'media',
        qEn: 'Please list the feed safety certifications held by the supplying site (GMP+ B2, FAMI-QS or others), with scope, certification body and expiry date.',
        en: 'The Premix plant (Spain) is GMP+ B2 certified for the production, trade and storage of premixes and additives [1]; the certificate is valid until 14/05/2027 and the 2026 surveillance audit was passed with no major non-conformities [2]. It also operates in line with the FAMI-QS Code [3]. Copies of the current certificates, showing the certification body and expiry date of each, will be attached.',
        cites: [
          { src: 'CERT-GMP', q: 'Production, trade and storage of premixes and additives for animal nutrition (GMP+ B2)' },
          { src: 'CERT-GMP', q: 'valid until 14/05/2027. 2026 surveillance audit passed with no major non-conformities' },
          { src: 'CERT-FAMI', q: 'Operator of additives and premixes for animal nutrition, according to the FAMI-QS Code' }
        ],
        gap: 'The expiry date of the FAMI-QS certificate and the certification body of each certificate do not appear in the indexed sources. Attach the current certificates before sending.'
      },
      {
        id: 'A2',
        ref: 'LEV-26 · A2',
        sec: 'A',
        topic: 'Approval under Regulation (EC) 183/2005',
        conf: 'alta',
        qEn: 'State the approval or registration number of the establishment under Regulation (EC) 183/2005 (feed hygiene) and how it links to the HACCP system.',
        en: 'The establishment is approved for the manufacture of additives and premixes under Regulation (EC) 183/2005, with approval number DEMO-183-0007 [1]. Its HACCP plan is defined in line with that regulation and the GMP+ B2 scheme [2], and the approval number is shown on the label of every product [3].',
        cites: [
          {
            src: 'SP-REG',
            q: 'Establishment approved for the manufacture of additives and premixes under Regulation (EC) 183/2005, with the fictitious approval number DEMO-183-0007'
          },
          { src: 'PR-CAL-001', q: 'in line with Regulation (EC) 183/2005 (feed hygiene) and the GMP+ B2 scheme' },
          {
            src: 'PR-REG-002',
            q: 'Name and address of the responsible operator and the registration or approval number of the plant (Regulation (EC) 183/2005).'
          }
        ]
      },
      {
        id: 'A3',
        ref: 'LEV-26 · A3',
        sec: 'A',
        topic: 'Audits in the last year',
        conf: 'alta',
        qEn: 'How many audits (customer, certification and official) did your company receive in the last year, and were there any sanctions or enforcement actions?',
        en: 'In 2025 Norel received 17 customer audits, certification audits and official inspections, totalling 24 audit days, with no sanctions [1].',
        cites: [{ src: 'MEM-2025', q: 'Customer audits, certification audits and official inspections in 2025: 17 (24 audit days), no sanctions' }],
        note: {
          tone: 'brand',
          icon: 'info',
          title: 'Company-wide figure',
          text: 'The report publishes the company-wide figure, with no breakdown by site. If the customer asks for the premix plant only, Quality completes it.'
        }
      },
      {
        id: 'B1',
        ref: 'LEV-26 · B1',
        sec: 'B',
        topic: 'Manufacturing HACCP plan',
        conf: 'alta',
        qEn: 'Describe the HACCP plan for premix manufacturing: critical control points, team, verification and review.',
        en: 'The HACCP plan defines four critical control points: raw material receipt, with Salmonella testing and verification of the certificate of analysis before the lot is released [1]; micro-ingredient dosing; homogeneous mixing, with a homogeneity test and a coefficient of variation below 5 % [2]; and cross-contamination. The HACCP team brings together Quality, the Plant, the Laboratory and Norel Solutions [3]. Quality verifies the CCP records every week [4] and the plan is audited once a year [5].',
        cites: [
          {
            src: 'PR-CAL-001',
            q: 'CCP 1 · Raw material receipt: Salmonella testing and verification of the certificate of analysis before the lot is released'
          },
          { src: 'PR-CAL-001', q: 'CCP 3 · Homogeneous mixing: homogeneity test with a coefficient of variation below 5 %' },
          { src: 'PR-CAL-001', q: 'Members: Plant Manager, Laboratory Manager and Norel Solutions (technical advisory).' },
          { src: 'PR-CAL-001', q: 'Weekly verification of CCP records by Quality.' },
          { src: 'PR-CAL-001', q: 'Internal audit of the HACCP plan once a year.' }
        ]
      },
      {
        id: 'B2',
        ref: 'LEV-26 · B2',
        sec: 'B',
        topic: 'Salmonella control in raw materials',
        conf: 'alta',
        qEn: 'Describe Salmonella control in raw materials: sampling, analytical method, release and action on a positive result, with last year results.',
        en: 'Every lot of high-risk raw material is sampled on receipt according to the LIMS plan [1] and tested with the ISO 6579-1 reference method [2]. The lot is released with a compliant supplier certificate of analysis and stays flagged in SAP until our own test confirms the result [3]. A positive result immediately blocks the lot and every batch made with it [4]. In 2026, up to 27/10, 428 tests were run with no positives [5].',
        cites: [
          { src: 'PR-CAL-004', q: 'Every lot of high-risk raw material is sampled on receipt according to the LIMS sampling plan' },
          { src: 'PR-CAL-004', q: '25 g sample tested with the ISO 6579-1 reference method.' },
          {
            src: 'PR-CAL-004',
            q: 'The lot is released to production with a compliant supplier certificate of analysis (conditional release) and stays flagged in SAP QM until our own Salmonella test in LIMS confirms the result'
          },
          { src: 'PR-CAL-004', q: 'immediately blocks the lot and every product batch made with it' },
          { src: 'LIMS-SAL', q: 'Salmonella in high-risk raw materials up to 27/10/2026: 428 tests, 0 positives.' }
        ],
        note: {
          tone: 'warn',
          icon: 'thermometer',
          title: 'Today positive result in a raw material · MP-2610-CC-118',
          text: 'Today test LAB-2610-0933 (05:50) is positive for Salmonella in choline chloride 60 % lot MP-2610-CC-118. The answer describes the procedure and the history up to 27/10; Quality decides whether to update the figure before sending. None of the Grupo Integrador Levante delivery notes received product from that lot.',
          outcome: 'alarma',
          with: { approved: 'In the shift alarm: {label}.', any: 'In the shift alarm, the proposal was rejected.' },
          without: 'The decision on the affected batches is taken in the shift alarm.',
          go: 'alarma',
          goLabel: 'Open the alarm'
        }
      },
      {
        id: 'B3',
        ref: 'LEV-26 · B3',
        sec: 'B',
        topic: 'Mycotoxin control',
        conf: 'none',
        qEn: 'Describe the control of mycotoxins (aflatoxin B1, ochratoxin A, DON and zearalenone) in raw materials and finished product: analytical plan, limits and frequency.',
        flag: {
          reason: 'None of the {doc_count} indexed documents contains the mycotoxin analytical plan, its limits or its frequency.',
          partial: [
            {
              src: 'PR-CAL-004',
              q: 'Mycotoxin control is governed by the analytical plan of each raw material and is not part of this procedure.',
              why: 'It refers to a mycotoxin analytical plan that is not among the indexed documents.'
            }
          ],
          missing: [
            'Mycotoxin analytical plan per raw material (parameters and frequency)',
            'Acceptance limits applied (Directive 2002/32/EC on undesirable substances)',
            'Test results for 2025 and 2026'
          ]
        }
      },
      {
        id: 'B4',
        ref: 'LEV-26 · B4',
        sec: 'B',
        topic: 'Verification of vitamin and trace mineral content',
        conf: 'alta',
        qEn: 'Explain how you verify that the vitamin and trace mineral content of the premixes matches the declared content and what happens if a batch is out of tolerance.',
        en: 'Every premix batch is tested in the laboratory before release, with a validated method for vitamins A, D3 and E and for trace minerals [1]. The criterion is ±15 % for vitamins [2] and ±10 % for trace minerals [3] of the declared content. An out-of-tolerance result blocks the batch and requires the test to be repeated in duplicate with the retained sample [4]. In 2026, up to 27/10, 271 batches were verified: 268 compliant and 3 with a deviation investigated and closed with corrective action [5].',
        cites: [
          { src: 'PR-LAB-005', q: 'A sample of every premix batch is tested before release.' },
          { src: 'PR-LAB-005', q: 'Vitamins: ±15 % of the declared content.' },
          { src: 'PR-LAB-005', q: 'Trace minerals: ±10 % of the declared content.' },
          {
            src: 'PR-LAB-005',
            q: 'An out-of-tolerance result blocks the batch in SAP QM and requires the test to be repeated in duplicate with the retained sample.'
          },
          { src: 'LIMS-VER', q: '271 premix batches tested, 268 compliant and 3 with a deviation investigated and closed with corrective action' }
        ],
        note: {
          tone: 'warn',
          icon: 'link',
          title: 'Open complaint about content verification · CLM-2026-1028',
          text: 'Another customer (Piensos Cuenca Mediterráneo, S.A.) claims a vitamin E content 18 % below the declared level in batch PRM-2610-0388. It does not affect Grupo Integrador Levante or this answer, but Quality should be aware of it before asserting the effectiveness of the verification.',
          outcome: 'reclamacion',
          with: { any: 'Complaint status: {label}.' },
          go: 'reclamacion',
          goLabel: 'Open the complaint'
        }
      },
      {
        id: 'C1',
        ref: 'LEV-26 · C1',
        sec: 'C',
        topic: 'Cross-contamination and line cleaning',
        conf: 'alta',
        qEn: 'Describe how you prevent cross-contamination between products on the production lines: sequence, cleaning, maximum carry-over and verification.',
        en: 'Production is sequenced from lower to higher risk [1], and products with additives that have a regulated maximum content are made at the end of the sequence and followed by a cleaning [2]. 100 % of product changes carry a validated cleaning, recorded in the MES [3], with a flushing batch after products with high-risk additives [4]. The maximum carry-over allowed is 0.5 % and it is checked every quarter with a tracer test on each line [5]. In the last 12 weeks there were 312 product changes, all with validated cleaning [6].',
        cites: [
          { src: 'PR-PRO-003', q: 'Planning sequences production from lower to higher risk.' },
          {
            src: 'PR-PRO-003',
            q: 'Products with additives that have a regulated maximum content are made at the end of the sequence and followed by a cleaning.'
          },
          { src: 'PR-PRO-003', q: 'Validated cleaning of 100 % of product changes, recorded in the MES.' },
          { src: 'PR-PRO-003', q: 'Flushing batch with an inert carrier after products with high-risk additives' },
          {
            src: 'PR-PRO-003',
            q: 'The maximum carry-over allowed between products is 0.5 % and it is checked every quarter with a tracer test on each line.'
          },
          { src: 'MES-LIM', q: 'Product changes in the last 12 weeks: 312, all with validated cleaning.' }
        ]
      },
      {
        id: 'C2',
        ref: 'LEV-26 · C2',
        sec: 'C',
        topic: 'Allergen management',
        conf: 'media',
        qEn: 'Describe allergen management in the plant: identification, separate storage and control at product changeover.',
        en: 'Raw materials with declarable allergens are identified in SAP S/4HANA and stored separately [1]. Products with allergens are made in a defined sequence and the change to the next product requires validated cleaning [2].',
        cites: [
          { src: 'PR-PRO-003', q: 'Raw materials with declarable allergens are identified in SAP S/4HANA and stored separately.' },
          {
            src: 'PR-PRO-003',
            q: 'Products with allergens are made in a defined sequence and the change to the next product requires validated cleaning.'
          }
        ],
        gap: 'The inventory of raw materials with declarable allergens and the allergen risk assessment are not in the indexed sources. Attach them before sending.'
      },
      {
        id: 'C3',
        ref: 'LEV-26 · C3',
        sec: 'C',
        topic: 'GMO-free',
        conf: 'none',
        qEn: 'Confirm whether the products supplied are GMO-free and how you demonstrate it (supplier declarations, PCR tests and segregation).',
        flag: {
          reason: 'None of the {doc_count} indexed documents contains a supplier GMO-free declaration or PCR tests.',
          context: 'Agentic Platform does not state that a product is GMO-free without the supplier documentation that supports it.',
          partial: [
            {
              src: 'PR-REG-002',
              q: 'Check that each additive appears in the EU Register of feed additives and that the labelling matches its authorisation.',
              why: 'It proves the authorisation of the additive, not the absence of GMOs.'
            }
          ],
          missing: ['GMO-free declarations from raw material suppliers', 'GMO PCR test results', 'Segregation procedure for GMO-free raw materials']
        }
      },
      {
        id: 'D1',
        ref: 'LEV-26 · D1',
        sec: 'D',
        topic: 'Traceability and mock recall',
        conf: 'media',
        qEn: 'State whether you can trace a batch back to the raw materials and forward to the customer, your target time for a full trace and the date and result of your last mock recall.',
        en: 'Yes. Every premix batch is linked in SAP S/4HANA to its raw material lots and supplier [1], and every delivery note links the batch to the customer and the destination [2]. For example, batch PRM-2610-0402 traces back to raw materials MP-2610-VE-041 and MP-2610-OE-071 [3] and forward to 3 delivery notes of Grupo Integrador Levante [4]. The target is to obtain the full trace within 4 h at most [5].',
        cites: [
          { src: 'PR-CAL-007', q: 'Backwards: every premix batch is linked in SAP S/4HANA to its raw material lots and supplier.' },
          { src: 'PR-CAL-007', q: 'Forwards: every delivery note links the batch to the customer and the destination.' },
          { src: 'SAP-LOT', q: 'made on 12/10/2026 with raw materials MP-2610-VE-041 (vitamin E) and MP-2610-OE-071 (trace minerals)' },
          {
            src: 'SAP-ALB',
            q: '1 customer: Grupo Integrador Levante, 3 delivery notes (80051231, 80051239 and 80051244) between 14/10 and 19/10/2026'
          },
          { src: 'PR-CAL-007', q: 'must be obtained within 4 h at most from the recall decision' }
        ],
        gap: 'The date and result of the last mock recall are not in the indexed sources.',
        gapGo: 'retirada',
        gapGoLabel: 'Run a mock recall now',
        gapOutcome: 'retirada'
      },
      {
        id: 'D2',
        ref: 'LEV-26 · D2',
        sec: 'D',
        topic: 'Recall plan and notification',
        conf: 'alta',
        qEn: 'Describe your product recall plan and how you notify the competent authority and customers.',
        en: 'Recall is governed by a documented procedure in line with Regulation (EC) 178/2002 [1]. The source lot and the derived batches are blocked in SAP QM and in the MES, pending shipments are held and those already delivered are located [2]. The competent authority and the affected customers are informed within 4 h at most from the decision [3], and Customer Care and Norel Solutions contact each customer and record the acknowledgement in Salesforce CRM [4]. For shipments to other countries, the authority of the destination country is also informed through the importer [5]. Every recall closes with a mass balance [6].',
        cites: [
          { src: 'PR-CAL-007', q: 'in line with Regulation (EC) 178/2002 (arts. 18 and 19)' },
          {
            src: 'PR-CAL-007',
            q: 'The source lot and the derived batches are blocked in SAP QM and in the MES, pending shipments are held and those already delivered are located.'
          },
          { src: 'PR-CAL-007', q: 'The competent authority and the affected customers are informed within 4 h at most from the decision.' },
          {
            src: 'PR-CAL-007',
            q: 'Customer Care and Norel Solutions contact each customer by phone and email with the list of lots and delivery notes, and record the acknowledgement in Salesforce CRM.'
          },
          { src: 'PR-EXP-002', q: 'informs the competent authority of the destination country through the importer' },
          { src: 'PR-CAL-007', q: 'Every recall closes with a mass balance' }
        ],
        note: {
          tone: 'ok',
          icon: 'check-circle',
          title: 'Applied today',
          text: 'This procedure was applied this morning in the shift alarm:',
          outcome: 'alarma',
          requires: 'approved',
          with: { approved: '{label}.' }
        }
      },
      {
        id: 'D3',
        ref: 'LEV-26 · D3',
        sec: 'D',
        topic: 'Complaint handling',
        conf: 'alta',
        qEn: 'Describe your customer complaint handling process, including response times and the root cause analysis method.',
        en: 'Complaints are registered in Salesforce CRM with acknowledgement within 24 h and an 8D report within 10 working days [1]. In 2026, up to 27/10, 9 complaints were closed, all with their root cause and corrective action recorded [2].',
        cites: [
          { src: 'SF-RCL', q: 'Handling deadlines: acknowledgement within 24 h and 8D report within 10 working days.' },
          { src: 'SF-RCL', q: '9 closed with root cause and corrective action recorded' }
        ]
      },
      {
        id: 'E1',
        ref: 'LEV-26 · E1',
        sec: 'E',
        topic: 'REACH registration and additive authorisation',
        conf: 'alta',
        qEn: 'Confirm the REACH registration of the substances you supply and the authorisation of additives under Regulation (EC) 1831/2003, including labelling.',
        en: 'Before the first purchase of a substance, Regulatory Affairs verifies the REACH registration number of the supplier or manufacturer and stores it in SAP S/4HANA; a substance without a valid registration is not purchased [1]. Every additive is checked against the EU Register of feed additives and its labelling matches its authorisation [2], showing its function, identification number and guaranteed content [3].',
        cites: [
          {
            src: 'PR-REG-002',
            q: 'Before the first purchase of a substance, Regulatory Affairs verifies the REACH registration number of the supplier or manufacturer and stores it in SAP S/4HANA. A substance without a valid REACH registration is not purchased.'
          },
          {
            src: 'PR-REG-002',
            q: 'Check that each additive appears in the EU Register of feed additives and that the labelling matches its authorisation.'
          },
          { src: 'PR-REG-002', q: 'Name and function of the additive, identification number and guaranteed content.' }
        ]
      },
      {
        id: 'E2',
        ref: 'LEV-26 · E2',
        sec: 'E',
        topic: 'Emissions and supplier ESG policy',
        conf: 'none',
        qEn: 'Provide your scope 1, 2 and 3 greenhouse gas emissions, your reduction targets and your responsible sourcing (ESG) policy.',
        flag: {
          reason: 'There is only indirect evidence: the sustainability report gives electricity consumption, but no indexed document contains an emissions inventory or a supplier ESG policy.',
          partial: [
            {
              src: 'MEM-2025',
              q: 'Electricity consumption 2025: 6,480 MWh, 41 % from renewable sources with guarantee of origin.',
              why: 'It is an energy figure, not a scope 1, 2 and 3 emissions inventory.'
            }
          ],
          missing: [
            'Scope 1, 2 and 3 emissions inventory (GHG Protocol)',
            'Emission reduction targets and their validation',
            'Responsible sourcing policy and supplier code of conduct'
          ]
        }
      }
    ]
  }
});
