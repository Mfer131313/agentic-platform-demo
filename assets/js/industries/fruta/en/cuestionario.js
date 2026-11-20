/* Subtropicales Axarquía · fruit supplier audit questionnaire from Handelsgruppe Nordfrisch (English). Demonstration scenario with synthetic data (MFM). */
agenticPackEn('fruta', {
  cuestionario: {
    agent: 'Customer questionnaires',
    lang: 'en',
    default_sel: 'B2',
    reviewer: 'Quality and Food Safety Manager',
    assignee: 'Quality and Food Safety Manager',
    assignee_short: 'Quality and HACCP',
    team: 'Quality',
    assign_due: '2026-11-24',
    responder: 'Subtropicales Axarquía (SAX, S.A.) · Axarquía handling centre (Málaga)',
    site: 'Axarquía handling centre (Málaga)',
    site_label: 'Centre',
    page_title: 'Supplier audit · Handelsgruppe Nordfrisch',
    report_title: 'Response to fruit supplier audit questionnaire',
    ref_label: 'Customer reference',
    scope_meta_label: 'Products',
    discard_placeholder: 'For example: this question is answered with the attached certificate',
    save_system: 'SAP S/4HANA',
    qn: {
      code: 'CUE-2026-063',
      title: 'Fruit Supplier Audit Questionnaire 2026',
      customer: 'Handelsgruppe Nordfrisch',
      via: 'Supplier Purchasing and Quality',
      received: '2026-11-16T09:40',
      due: '2026-11-27',
      file: 'Nordfrisch_Auditoria_proveedor_fruta_2026.xlsx',
      scope: 'fresh and processed avocado and mango (guacamole, fresh sauces and cold press) supplied to the logistics platforms of Handelsgruppe Nordfrisch in Germany',
      scope_short: 'Fresh and processed avocado and mango',
      scope_label: '2 product families'
    },
    email: {
      mailbox: 'Quality mailbox',
      headers: {
        From: 'Compras y Calidad de Proveedores, Handelsgruppe Nordfrisch <proveedores@nordfrisch.example>',
        To: 'Calidad, Subtropicales Axarquía <calidad@sax-demo.example>',
        Date: 'Mon, 16 Nov 2026 09:40 (Madrid time)',
        Subject: 'Fruit supplier audit 2026 - pre-audit questionnaire - response due 27 November'
      },
      text: 'Dear Quality Team,\n\nAs part of our annual supplier approval programme, Handelsgruppe Nordfrisch is sending you the 2026 fruit supplier audit questionnaire, ahead of the document audit, for the avocado and mango, fresh and processed, that you supply to our logistics platforms in Germany.\n\nIt has 15 questions in five sections: management systems and certifications, food safety, process control, traceability and recall, and compliance and sustainability.\n\nFor each answer, please reference the procedure, record or certificate that supports it. We need the completed questionnaire by Friday 27 November 2026.\n\nKind regards,\n\nSupplier Purchasing and Quality\nHandelsgruppe Nordfrisch',
      highlights: [
        {
          text: 'avocado and mango, fresh and processed, that you supply to our logistics platforms in Germany',
          label: 'Scope',
          tone: 'brand'
        },
        { text: '15 questions', label: 'Questions', tone: 'brand' },
        { text: 'reference the procedure, record or certificate that supports it', label: 'Requirement' },
        { text: 'Friday 27 November 2026', label: 'Deadline' }
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
      value: 19,
      sub: 'Includes official inspections · 26 audit days · Sustainability Report 2025',
      icon: 'shield-check'
    },
    sources_sub: 'Procedures, certificates, records and sustainability report',
    identify_result: 'Handelsgruppe Nordfrisch via Supplier Purchasing and Quality · fresh and processed avocado and mango',
    search_scope: 'Quality procedures, certificates, LIMS, WMS and field traceability records and sustainability report',
    lookups: [
      {
        system: 'Trazabilidad de campo',
        action: 'Checks the origin of the example lot (plots and growers)',
        result: 'AH-2611-118: Hass avocado size 18 · 14 plots of 9 growers in the Axarquía',
        ms: 520
      },
      {
        system: 'LIMS',
        action: 'Reviews the 2026 multi-residue analysis plan',
        result: '612 multi-residue tests, 0 MRL exceedances up to 19/11',
        ms: 480
      },
      {
        system: 'WMS',
        action: 'Reads the temperature record of the ripening chambers',
        result: '11 chambers with continuous recording · CM-06 out of setpoint since 03:40',
        ms: 410,
        tone: 'warn'
      },
      {
        system: 'SAP S/4HANA',
        action: 'Checks certificates, health registration and current procedures',
        result: 'IFS Food valid until 22/03/2027 · GLOBALG.A.P. with no expiry date on the record',
        ms: 300
      },
      {
        system: 'SAP S/4HANA',
        action: 'Searches open and closed complaints of the centre',
        result: 'CLM-2026-1120 open (another customer): uneven ripening in PED-2026-44718',
        ms: 350,
        tone: 'warn'
      },
      {
        system: 'LIMS',
        action: 'Cross-checks the receipt lots with today alert',
        result: 'MG-2611-KE-031: residue above the MRL · 18 t from the grower Agrícola La Vega 417',
        ms: 390,
        tone: 'warn'
      }
    ],
    compare: {
      people: '2-3: Quality and Food Safety, Laboratory and, depending on the question, Receipt and Field or Ripening',
      systems: '6-8: email, the customer Excel file, SAP, field traceability, LIMS, WMS, certificates folder and procedures',
      steps: 'Find the source for each question, copy and adapt answers from previous years, ask the Laboratory and the area managers for data and build the Excel file',
      time: '4-6 h of Quality work, spread over 3-4 days'
    },
    presenter: {
      before: [
        'Every supermarket chain and every purchasing platform brings its own supplier questionnaire. In 2025 SAX received 19 customer audits, certification audits and inspections: 26 audit days. It is background work that eats up Quality hours.',
        'This one comes from Handelsgruppe Nordfrisch: {total} questions about the avocado and mango you supply to its platforms in Germany, covering IFS Food, GLOBALG.A.P., GRASP, MRLs, traceability, recall and ESG.',
        'When you press the button, Agentic Platform searches procedures, certificates and the sustainability report, plus the records in SAP, field traceability, LIMS and WMS, and drafts each answer with its source.'
      ],
      during: [
        '{drafted} of {total} have a cited draft; every citation is checked against the source text. {flagged} are left for Quality: pest control, water quality and emissions. No supporting document, nothing invented.',
        'B2: besides answering, it warns that the LIMS detected a residue above the MRL in Keitt mango MG-2611-KE-031 today and that recall campaign RET-2026-1120 is open. Today that depends on someone remembering.',
        'C2: it warns that chamber CM-06 has been out of setpoint since 03:40 before the cold chain is asserted to be under control. The questionnaire does not live in isolation from the rest of the centre.',
        'Nothing goes out without approval: bulk approval only for high-confidence answers; medium-confidence ones are reviewed one by one.'
      ],
      next_during: 'Show B2 (citation and today MRL warning) and B3 (no evidence). Then "Approve the {alta} high-confidence answers", approve {media_ids} one by one and "Assign the {flagged} without a source to Quality and HACCP".'
    },
    sources: {
      'PR-REC-001': {
        type: 'doc',
        kind: 'Procedure',
        code: 'PR-REC-001',
        title: 'Fruit receipt and sampling',
        system: 'Procedimientos',
        sections: [
          {
            id: '2',
            heading: '2. Receipt and sampling',
            text: 'Every consignment is weighed and recorded with its field lot in Field traceability:',
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
            text: 'A non-conforming consignment is rejected or blocked in SAP QM, and the Receipt and Field Manager informs the Quality and Food Safety Manager. A consignment with more than 5 % of damaged or rotten pieces is rejected.'
          }
        ]
      },
      'PR-CAL-004': {
        type: 'doc',
        kind: 'Procedure',
        code: 'PR-CAL-004',
        title: 'MRLs and pesticide residue testing',
        system: 'Procedimientos',
        sections: [
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: 'Control the pesticide residues of the fruit received against the maximum residue levels (MRLs) of Regulation (EC) 396/2005. It does not include the control of irrigation and process water, which is governed by its own plan.'
          },
          {
            id: '2',
            heading: '2. Sampling',
            text: 'Every consignment is sampled on receipt according to the LIMS sampling plan:',
            list: [
              'Composite sample of at least 12 pieces per consignment.',
              'Multi-residue analysis screening more than 400 active substances.',
              'Retained sample frozen and kept for 6 months.'
            ]
          },
          {
            id: '3',
            heading: '3. Conditional release',
            text: 'The consignment is released to handling with a compliant grower certificate (conditional release) and stays flagged in SAP QM until our own multi-residue analysis in LIMS confirms the result, within a maximum of 72 h.'
          },
          {
            id: '4',
            heading: '4. Action on an MRL exceedance',
            text: 'A result above the MRL immediately blocks the consignment and all the handling lots made with it. The Quality and Food Safety Manager decides the fate of the consignment: destroy or return to the grower. Product already dispatched is located and PR-TRZ-003 is activated within a maximum of 2 h.'
          }
        ]
      },
      'PR-MAD-002': {
        type: 'doc',
        kind: 'Procedure',
        code: 'PR-MAD-002',
        title: 'Controlled ripening (temperature and ethylene)',
        system: 'Procedimientos',
        sections: [
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
            text: 'Firmness is measured with a penetrometer on a sample from every pallet before dispatch. The customer receives fruit within the firmness range agreed for the order.'
          },
          {
            id: '4',
            heading: '4. Temperature deviation',
            text: 'A deviation of more than 2 °C from the setpoint for more than 30 minutes triggers an alarm and blocks the lots in the chamber in SAP QM. A maintenance order is opened and the pallets are moved to another chamber at setpoint. Quality checks the firmness and colour of a sample from every pallet, and the Quality and Food Safety Manager decides the fate of the lot.'
          }
        ]
      },
      'PR-TRZ-003': {
        type: 'doc',
        kind: 'Procedure',
        code: 'PR-TRZ-003',
        title: 'Lot traceability and recall',
        system: 'Procedimientos',
        sections: [
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: 'Ensure the traceability of every lot of fruit received and handled and define the recall of unsafe product, in line with Regulation (EC) 178/2002 (arts. 18 and 19).'
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
            text: 'The full trace of a lot (receipt, handling lots, shipments, customers and online orders) must be obtained within a maximum of 4 h from the recall decision. The competent authority and the affected customers are informed within a maximum of 4 h from the decision.'
          },
          {
            id: '4',
            heading: '4. Action on unsafe product',
            text: 'The source lot and the derived lots are blocked in SAP QM and in the WMS, pending shipments and orders are held and those already delivered are located. If the product has reached the market, the Quality and Food Safety Manager notifies the competent authority under art. 19 of Regulation (EC) 178/2002 and approves the notice to customers. The steps and the content of the notification are detailed according to PR-CAL-010 (Crisis management and communication with the competent authority).'
          },
          {
            id: '5',
            heading: '5. Customer notice',
            text: 'Customer Care and Logistics contact every customer by phone and email with the list of lots and delivery notes, and record the acknowledgement in SAP S/4HANA.'
          },
          {
            id: '6',
            heading: '6. Mass balance',
            text: 'Every recall closes with a mass balance: quantity of the source lot = blocked stock + dispatched product + consumed or destroyed product. A balance that does not add up is investigated before the campaign is closed.'
          }
        ]
      },
      'PR-PRO-005': {
        type: 'doc',
        kind: 'Procedure',
        code: 'PR-PRO-005',
        title: 'Processing (guacamole and cold press) and HACCP',
        system: 'Procedimientos',
        sections: [
          {
            id: '1',
            heading: '1. Purpose and scope',
            text: 'Define the HACCP plan for the processing of guacamole, fresh sauces and cold press at the Axarquía handling centre (Málaga), in line with Regulation (EC) 852/2004 (hygiene of foodstuffs) and the IFS Food scheme. It applies to the processing area. Dispatch is governed by PR-EXP-004.'
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
            text: 'Sauces with declarable allergens (for example celery, mustard or tree nuts) are identified in SAP S/4HANA and made in a defined sequence. The change to the next product requires validated cleaning, recorded in the cleaning log of the area.'
          }
        ]
      },
      'PR-ECO-002': {
        type: 'doc',
        kind: 'Procedure',
        code: 'PR-ECO-002',
        title: 'Online shop orders and shipping',
        system: 'Procedimientos',
        sections: [
          {
            id: '4',
            heading: '4. Held or recalled lot',
            text: 'When a lot is held or recalled, Customer Care notifies by email the customers with online shop orders and offers a replacement or refund.'
          }
        ]
      },
      'PR-EXP-004': {
        type: 'doc',
        kind: 'Procedure',
        code: 'PR-EXP-004',
        title: 'Export and phytosanitary documentation',
        system: 'Procedimientos',
        sections: [
          {
            id: '4',
            heading: '4. Recall of an exported shipment',
            text: 'If an exported lot has to be recalled, Dispatch and Export locates the shipment and the Quality and Food Safety Manager informs the competent authority of the destination country through the importer.'
          }
        ]
      },
      'CERT-IFS': {
        type: 'doc',
        kind: 'Certificate',
        code: 'IFS Food',
        title: 'IFS Food certificate · Fruit handling and processing',
        system: 'Procedimientos',
        org: 'Certification body (fictitious) · certificate no. DEMO-IFS-0291',
        date: '2026-03-23',
        sections: [
          {
            id: 'alc',
            heading: 'Scope',
            text: 'Handling, packing and processing (guacamole, fresh sauces and cold press) of avocado and mango, and controlled ripening, under the IFS Food scheme. Site: Axarquía handling centre (Málaga).'
          },
          {
            id: 'vig',
            heading: 'Validity',
            text: 'Issued on 23/03/2026; valid until 22/03/2027. 2026 recertification audit passed with no major non-conformities.'
          }
        ]
      },
      'CERT-GGAP': {
        type: 'doc',
        kind: 'Certificate',
        code: 'GLOBALG.A.P.',
        title: 'GLOBALG.A.P. certificate · Avocado and mango production (GRASP module)',
        system: 'Procedimientos',
        org: 'Certification body (fictitious) · certificate no. DEMO-GGN-0158',
        sections: [
          {
            id: 'alc',
            heading: 'Scope',
            text: 'Primary production of avocado and mango from the network of growers in the Axarquía and the subtropical coast of Málaga and Granada, certified as a producer group.'
          },
          {
            id: 'gra',
            heading: 'GRASP module',
            text: 'Social practice assessment (GRASP): contracts, working hours, wages and worker health and safety on the farms of the group, verified in the annual audit.'
          },
          { id: 'nota', heading: 'Indexing note', text: 'The indexed record does not state the expiry date of the certificate.' }
        ]
      },
      'SP-REG': {
        type: 'record',
        kind: 'Health registration',
        code: 'RGSEAA',
        title: 'Health registration of the establishment · Regulation (EC) 852/2004',
        system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · regulatory file of the centre',
        sections: [
          {
            id: 'reg',
            heading: 'Registration',
            text: 'Establishment entered in the health register of food businesses under Regulation (EC) 852/2004, with the fictitious registration no. DEMO-RGSEAA-0042.'
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
        org: 'Subtropicales Axarquía · published on 30/06/2026 (synthetic data)',
        sections: [
          {
            id: 'aud',
            heading: 'Audits and inspections',
            text: 'Customer audits, certification audits and official inspections in 2025: 19 (26 audit days), no sanctions.'
          },
          {
            id: 'red',
            heading: 'Origin of the fruit',
            text: 'Network of more than 1,200 growers in the Axarquía and the subtropical coast of Málaga and Granada.'
          },
          {
            id: 'ene',
            heading: 'Energy',
            text: 'Electricity consumption 2025: 5,240 MWh, 46 % from renewable sources with a guarantee of origin.'
          }
        ]
      },
      'LIMS-LMR': {
        type: 'record',
        kind: 'Laboratory results',
        code: 'Residues 2026',
        title: 'Pesticide residues in fruit · 2026 results',
        system: 'LIMS',
        org: 'LIMS · test results',
        sections: [{ id: 'res', heading: 'Results', text: 'Multi-residue analysis on receipt up to 19/11/2026: 612 tests, 0 MRL exceedances.' }]
      },
      'WMS-FRI': {
        type: 'record',
        kind: 'Temperature record',
        code: 'Chambers',
        title: 'Ripening and storage chambers · 2026 deviations',
        system: 'WMS',
        org: 'WMS · continuous temperature record',
        sections: [
          {
            id: 'des',
            heading: '2026 deviations',
            text: 'Ripening and storage chambers up to 19/11/2026: 11 chambers with continuous recording; 2 deviations of more than 2 °C for more than 30 minutes in 2026, both with lots blocked and firmness checked.'
          }
        ]
      },
      'TRZ-LOT': {
        type: 'record',
        kind: 'Lot record',
        code: 'AH-2611-118',
        title: 'Lot AH-2611-118 · origin and receipt',
        system: 'Trazabilidad de campo',
        org: 'Field traceability · lot record',
        sections: [
          {
            id: 'origen',
            heading: 'Origin and receipt',
            text: 'Hass avocado size 18 received on 17/11/2026 from 14 plots of 9 growers in the Axarquía; multi-residue analysis compliant'
          }
        ]
      },
      'SAP-ALB': {
        type: 'record',
        kind: 'Forward trace',
        code: 'AH-2611-118',
        title: 'Lot AH-2611-118 · orders and customers',
        system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · order allocation',
        sections: [
          {
            id: 'fwd',
            heading: 'Allocated orders',
            text: '9 pallets (14 t) allocated to 3 supermarket orders and to today online shop orders, with no shipments yet'
          }
        ]
      },
      'SAP-RCL': {
        type: 'record',
        kind: 'Complaints register',
        code: 'Complaints',
        title: 'Registered customer complaints',
        system: 'SAP S/4HANA',
        org: 'SAP S/4HANA · complaints and cases',
        sections: [
          { id: 'pla', heading: 'Deadlines', text: 'Handling deadlines: acknowledgement within 24 h and 8D report within 10 working days.' },
          {
            id: 'res',
            heading: '2026 summary',
            text: 'Complaints in 2026 up to 19/11: 11 closed with root cause and corrective action recorded; 1 open (CLM-2026-1120).'
          }
        ]
      }
    },
    questions: [
      {
        id: 'A1',
        ref: 'NDF-26 · A1',
        sec: 'A',
        topic: 'Food safety certifications',
        conf: 'media',
        qEn: 'Please list the food safety certifications of the centre and of primary production (IFS Food, GLOBALG.A.P. or others), with scope, certification body and expiry date.',
        en: 'The Axarquía handling centre (Málaga) is IFS Food certified for the handling, packing and processing of avocado and mango [1]; the certificate is valid until 22/03/2027 and the 2026 recertification audit was passed with no major non-conformities [2]. The primary production of the grower network is GLOBALG.A.P. certified [3]. Copies of the current certificates will be attached, showing the certification body and expiry date of each.',
        cites: [
          { src: 'CERT-IFS', q: 'Handling, packing and processing (guacamole, fresh sauces and cold press) of avocado and mango' },
          { src: 'CERT-IFS', q: 'valid until 22/03/2027. 2026 recertification audit passed with no major non-conformities' },
          {
            src: 'CERT-GGAP',
            q: 'Primary production of avocado and mango from the network of growers in the Axarquía and the subtropical coast of Málaga and Granada'
          }
        ],
        gap: 'The expiry date of the GLOBALG.A.P. certificate and the certification body of each certificate do not appear in the indexed sources. Attach the current certificates before sending.'
      },
      {
        id: 'A2',
        ref: 'NDF-26 · A2',
        sec: 'A',
        topic: 'Health registration under Regulation (EC) 852/2004',
        conf: 'alta',
        qEn: 'State the health registration number of the establishment under Regulation (EC) 852/2004 and how it links to the HACCP system.',
        en: 'The establishment is entered in the health register of food businesses under Regulation (EC) 852/2004, with registration no. DEMO-RGSEAA-0042 [1]. Its processing HACCP plan is defined in line with that regulation and the IFS Food scheme [2].',
        cites: [
          {
            src: 'SP-REG',
            q: 'Establishment entered in the health register of food businesses under Regulation (EC) 852/2004, with the fictitious registration no. DEMO-RGSEAA-0042'
          },
          { src: 'PR-PRO-005', q: 'in line with Regulation (EC) 852/2004 (hygiene of foodstuffs) and the IFS Food scheme' }
        ]
      },
      {
        id: 'A3',
        ref: 'NDF-26 · A3',
        sec: 'A',
        topic: 'Audits in the last year',
        conf: 'alta',
        qEn: 'How many audits (customer, certification and official) did your company receive in the last year, and were there any sanctions or enforcement actions?',
        en: 'In 2025 SAX received 19 customer audits, certification audits and official inspections, totalling 26 audit days, with no sanctions [1].',
        cites: [{ src: 'MEM-2025', q: 'Customer audits, certification audits and official inspections in 2025: 19 (26 audit days), no sanctions' }],
        note: {
          tone: 'brand',
          icon: 'info',
          title: 'Company-wide figure',
          text: 'The report publishes the figure for the whole company, with no breakdown by site. If the customer asks for the handling centre only, Quality completes it.'
        }
      },
      {
        id: 'B1',
        ref: 'NDF-26 · B1',
        sec: 'B',
        topic: 'HACCP plan for processing',
        conf: 'alta',
        qEn: 'Describe the HACCP plan for the processing of guacamole, fresh sauces and cold press: critical control points, team, verification and review.',
        en: 'The HACCP plan defines four critical control points: fruit receipt and washing, with a check of the multi-residue result before pulping [1]; preservation treatment, with a record of every cycle [2]; foreign body detection, with a metal detector and X-ray verified with test pieces [3]; and cold chain. The HACCP team brings together Quality, Processing, the Laboratory and Packing [4]. Quality verifies the CCP records every week [5] and the plan is audited once a year [6].',
        cites: [
          {
            src: 'PR-PRO-005',
            q: 'CCP 1 · Fruit receipt and washing: check of the multi-residue result and washing with potable water before pulping'
          },
          {
            src: 'PR-PRO-005',
            q: 'CCP 2 · Preservation treatment: high pressure processing (HPP) or pasteurisation, with a record of every cycle.'
          },
          {
            src: 'PR-PRO-005',
            q: 'CCP 3 · Foreign body detection: metal detector and X-ray verified with test pieces at the start of every shift.'
          },
          { src: 'PR-PRO-005', q: 'Members: Processing Manager, Laboratory Manager and Packing Manager.' },
          { src: 'PR-PRO-005', q: 'Weekly verification of CCP records by Quality.' },
          { src: 'PR-PRO-005', q: 'Internal audit of the HACCP plan once a year.' }
        ]
      },
      {
        id: 'B2',
        ref: 'NDF-26 · B2',
        sec: 'B',
        topic: 'MRLs and residue testing plan',
        conf: 'alta',
        qEn: 'Describe pesticide residue control in the fruit: sampling, analytical method, release, action on an MRL exceedance and last year results.',
        en: 'Every consignment is sampled on receipt according to the LIMS plan [1] and subjected to a multi-residue analysis against the maximum residue levels (MRLs) of Regulation (EC) 396/2005 [2]. The consignment is released to handling with a compliant grower certificate and stays flagged in SAP until our own analysis confirms the result [3]. An MRL exceedance immediately blocks the consignment and all the handling lots made with it [4]. In 2026, up to 19/11, 612 tests were run with no exceedances [5].',
        cites: [
          { src: 'PR-CAL-004', q: 'Every consignment is sampled on receipt according to the LIMS sampling plan' },
          { src: 'PR-CAL-004', q: 'against the maximum residue levels (MRLs) of Regulation (EC) 396/2005' },
          {
            src: 'PR-CAL-004',
            q: 'The consignment is released to handling with a compliant grower certificate (conditional release) and stays flagged in SAP QM until our own multi-residue analysis in LIMS confirms the result'
          },
          { src: 'PR-CAL-004', q: 'immediately blocks the consignment and all the handling lots made with it' },
          { src: 'LIMS-LMR', q: 'Multi-residue analysis on receipt up to 19/11/2026: 612 tests, 0 MRL exceedances.' }
        ],
        note: {
          tone: 'warn',
          icon: 'alert-triangle',
          title: 'Today MRL exceedance in a receipt lot · MG-2611-KE-031',
          text: 'Today report LAB-2611-0871 shows a pesticide residue above the MRL in Keitt mango MG-2611-KE-031 (18 t from the grower Agrícola La Vega 417). The answer describes the procedure and the history up to 19/11; Quality decides whether to update the figure before sending. Recall campaign RET-2026-1120 is under way and Quality must confirm whether any Handelsgruppe Nordfrisch order received product from that lot.',
          outcome: 'retirada',
          with: { approved: 'In the recall campaign: {label}.', any: 'The proposal was rejected in the recall campaign.' },
          without: 'The decision on the affected lots is taken in the recall campaign.',
          go: 'retirada',
          goLabel: 'Open the recall campaign'
        }
      },
      {
        id: 'B3',
        ref: 'NDF-26 · B3',
        sec: 'B',
        topic: 'Pest control',
        conf: 'none',
        qEn: 'Describe the pest control programme of the centre: pest control contractor, trap map, inspection frequency and records.',
        flag: {
          reason: 'None of the {doc_count} indexed documents contains the pest control programme of the centre or its records.',
          partial: [
            {
              src: 'PR-REC-001',
              q: 'Visual inspection for pests and foreign bodies on the truck and the pallets on arrival.',
              why: 'It is an inspection on receipt, not the pest control programme of the centre.'
            }
          ],
          missing: [
            'Contract and procedure of the pest control contractor',
            'Trap map and inspection frequency',
            'Inspection and action records for 2025 and 2026'
          ]
        }
      },
      {
        id: 'B4',
        ref: 'NDF-26 · B4',
        sec: 'B',
        topic: 'Allergen management in processing',
        conf: 'media',
        qEn: 'Describe allergen management in the processing area: identification, production sequence and control at product changeover.',
        en: 'Sauces with declarable allergens are identified in SAP S/4HANA and made in a defined sequence [1]. The change to the next product requires validated cleaning, recorded in the cleaning log of the area [2].',
        cites: [
          {
            src: 'PR-PRO-005',
            q: 'Sauces with declarable allergens (for example celery, mustard or tree nuts) are identified in SAP S/4HANA and made in a defined sequence.'
          },
          { src: 'PR-PRO-005', q: 'The change to the next product requires validated cleaning, recorded in the cleaning log of the area.' }
        ],
        gap: 'The allergen inventory by recipe and the allergen risk assessment are not in the indexed sources. Attach them before sending.'
      },
      {
        id: 'C1',
        ref: 'NDF-26 · C1',
        sec: 'C',
        topic: 'Fruit receipt and control',
        conf: 'alta',
        qEn: 'Describe how fruit is received and checked on arrival: origin record, sampling and acceptance criteria.',
        en: 'Every consignment is weighed and recorded with its field lot in Field traceability [1], with the pulp temperature measured in three pieces per pallet [2] and a sample of 20 pieces for firmness, dry matter or Brix degrees and defects [3]. Fruit is accepted with a pulp temperature below 20 °C [4] and a non-conforming consignment is rejected or blocked in SAP QM [5].',
        cites: [
          { src: 'PR-REC-001', q: 'Every consignment is weighed and recorded with its field lot in Field traceability' },
          { src: 'PR-REC-001', q: 'Pulp temperature measured in three pieces per pallet.' },
          {
            src: 'PR-REC-001',
            q: 'Sample of 20 pieces per consignment for firmness, dry matter (avocado), Brix degrees (mango) and defects.'
          },
          { src: 'PR-REC-001', q: 'Pulp temperature of the fruit on arrival below 20 °C.' },
          { src: 'PR-REC-001', q: 'A non-conforming consignment is rejected or blocked in SAP QM' }
        ]
      },
      {
        id: 'C2',
        ref: 'NDF-26 · C2',
        sec: 'C',
        topic: 'Controlled ripening and cold chain',
        conf: 'alta',
        qEn: 'Describe the control of ripening and the cold chain: temperature and ethylene setpoints, recording, deviations and firmness checks.',
        en: 'Fruit is ripened in chambers with ethylene at the temperature and time of the curve of each variety [1], with continuous recording of the temperature of every chamber every 5 minutes in the WMS [2]. Firmness is measured with a penetrometer on a sample from every pallet before dispatch [3]. A deviation of more than 2 °C from the setpoint for more than 30 minutes triggers an alarm and blocks the lots in the chamber [4]. In 2026, up to 19/11, there were 2 such deviations, both with lots blocked and firmness checked [5].',
        cites: [
          { src: 'PR-MAD-002', q: 'Ripening with ethylene at the temperature and time of the curve of each variety.' },
          { src: 'PR-MAD-002', q: 'Continuous recording of the temperature of every chamber every 5 minutes in the WMS.' },
          { src: 'PR-MAD-002', q: 'Firmness is measured with a penetrometer on a sample from every pallet before dispatch' },
          {
            src: 'PR-MAD-002',
            q: 'A deviation of more than 2 °C from the setpoint for more than 30 minutes triggers an alarm and blocks the lots in the chamber in SAP QM'
          },
          {
            src: 'WMS-FRI',
            q: '2 deviations of more than 2 °C for more than 30 minutes in 2026, both with lots blocked and firmness checked'
          }
        ],
        note: {
          tone: 'warn',
          icon: 'thermometer',
          title: 'Today temperature deviation · chamber CM-06',
          text: 'Alarm ALM-FRIO-0612 (05:50) detects ripening chamber CM-06 at 11.4 °C against a setpoint of 6.0 °C since 03:40 (compressor failure), holding 9 pallets of Hass avocado from lot AH-2611-118. The answer describes the procedure and the history up to 19/11; Quality decides whether to mention it before sending.',
          outcome: 'alarma',
          with: { approved: 'In the shift alarm: {label}.', any: 'The proposal was rejected in the shift alarm.' },
          without: 'The decision on the affected lots is taken in the shift alarm.',
          go: 'alarma',
          goLabel: 'Open the alarm'
        }
      },
      {
        id: 'C3',
        ref: 'NDF-26 · C3',
        sec: 'C',
        topic: 'Irrigation and process water quality',
        conf: 'none',
        qEn: 'Provide the control of irrigation and process water quality: source, microbiological tests and frequency.',
        flag: {
          reason: 'None of the {doc_count} indexed documents contains the analysis plan for irrigation or process water.',
          context: 'Agentic Platform does not state that water meets the microbiological criteria without the tests that support it.',
          partial: [
            {
              src: 'PR-CAL-004',
              q: 'It does not include the control of irrigation and process water, which is governed by its own plan.',
              why: 'It refers to a water plan that is not among the indexed documents.'
            }
          ],
          missing: [
            'Analysis plan for irrigation and process water (parameters and frequency)',
            'Source of the water and treatments applied',
            'Test results for 2025 and 2026'
          ]
        }
      },
      {
        id: 'D1',
        ref: 'NDF-26 · D1',
        sec: 'D',
        topic: 'Traceability and mock recall',
        conf: 'media',
        qEn: 'State whether you can trace a lot backwards to the plot and the grower and forwards to the customer, the time target for a full trace and the date and result of the last mock recall.',
        en: 'Yes. Every handling lot links in SAP S/4HANA to its receipt lots, the grower and the plot in Field traceability [1], and every delivery note or order links the lot to the customer and the destination [2]. For example, lot AH-2611-118 is traced backwards to 14 plots of 9 growers in the Axarquía [3] and forwards to 3 supermarket orders and the online shop orders [4]. The target is to obtain the full trace within a maximum of 4 h [5].',
        cites: [
          {
            src: 'PR-TRZ-003',
            q: 'Backwards: every handling lot links in SAP S/4HANA to its receipt lots, the grower and the plot in Field traceability.'
          },
          { src: 'PR-TRZ-003', q: 'Forwards: every delivery note or order links the lot to the customer and the destination' },
          { src: 'TRZ-LOT', q: 'received on 17/11/2026 from 14 plots of 9 growers in the Axarquía' },
          { src: 'SAP-ALB', q: 'allocated to 3 supermarket orders and to today online shop orders' },
          { src: 'PR-TRZ-003', q: 'must be obtained within a maximum of 4 h from the recall decision' }
        ],
        gap: 'The date and result of the last mock recall are not in the indexed sources.',
        gapGo: 'retirada',
        gapGoLabel: 'Run a mock recall now',
        gapOutcome: 'retirada'
      },
      {
        id: 'D2',
        ref: 'NDF-26 · D2',
        sec: 'D',
        topic: 'Recall plan and notification',
        conf: 'alta',
        qEn: 'Describe your product recall plan and how you notify the competent authority, customers and online shop consumers.',
        en: 'Recalls follow a documented procedure in line with Regulation (EC) 178/2002 [1]. The source lot and the derived lots are blocked in SAP QM and in the WMS, pending shipments and orders are held and those already delivered are located [2]. The competent authority and the affected customers are informed within a maximum of 4 h from the decision [3], and Customer Care and Logistics contact every customer and record the acknowledgement in SAP S/4HANA [4]. For shipments to other countries, the authority of the destination country is also informed through the importer [5]. Customers with online shop orders receive an email notice and are offered a replacement or refund [6]. Every recall closes with a mass balance [7].',
        cites: [
          { src: 'PR-TRZ-003', q: 'in line with Regulation (EC) 178/2002 (arts. 18 and 19)' },
          {
            src: 'PR-TRZ-003',
            q: 'The source lot and the derived lots are blocked in SAP QM and in the WMS, pending shipments and orders are held and those already delivered are located.'
          },
          {
            src: 'PR-TRZ-003',
            q: 'The competent authority and the affected customers are informed within a maximum of 4 h from the decision.'
          },
          {
            src: 'PR-TRZ-003',
            q: 'Customer Care and Logistics contact every customer by phone and email with the list of lots and delivery notes, and record the acknowledgement in SAP S/4HANA.'
          },
          { src: 'PR-EXP-004', q: 'informs the competent authority of the destination country through the importer' },
          {
            src: 'PR-ECO-002',
            q: 'Customer Care notifies by email the customers with online shop orders and offers a replacement or refund'
          },
          { src: 'PR-TRZ-003', q: 'Every recall closes with a mass balance' }
        ],
        note: {
          tone: 'ok',
          icon: 'check-circle',
          title: 'Applied today',
          text: 'This procedure has been applied today in the recall campaign:',
          outcome: 'retirada',
          requires: 'approved',
          with: { approved: '{label}.' }
        }
      },
      {
        id: 'D3',
        ref: 'NDF-26 · D3',
        sec: 'D',
        topic: 'Complaint handling',
        conf: 'alta',
        qEn: 'Describe the customer complaint handling process, with response deadlines and the root cause analysis method.',
        en: 'Complaints are recorded in SAP S/4HANA with acknowledgement within 24 h and an 8D report within 10 working days [1]. In 2026, up to 19/11, 11 complaints were closed, all with their root cause and corrective action recorded [2].',
        cites: [
          { src: 'SAP-RCL', q: 'Handling deadlines: acknowledgement within 24 h and 8D report within 10 working days.' },
          { src: 'SAP-RCL', q: '11 closed with root cause and corrective action recorded' }
        ],
        note: {
          tone: 'warn',
          icon: 'link',
          title: 'Open complaint about uneven ripening · CLM-2026-1120',
          text: 'Another customer (Supermercados Levante Fresh, S.A.) complains that 35 % of the ready-to-eat avocados in order PED-2026-44718 (lot AH-2611-092) arrived hard in 4 stores. It does not affect Handelsgruppe Nordfrisch or this answer, but Quality should know about it before the effectiveness of the ripening control is asserted.',
          outcome: 'reclamacion',
          with: { any: 'Complaint status: {label}.' },
          go: 'reclamacion',
          goLabel: 'Open the complaint'
        }
      },
      {
        id: 'E1',
        ref: 'NDF-26 · E1',
        sec: 'E',
        topic: 'Social practices of growers (GRASP)',
        conf: 'alta',
        qEn: 'Confirm how the social practices of growers are assessed (GRASP): scope, frequency and coverage of the supplier network.',
        en: 'The network is made up of more than 1,200 growers in the Axarquía and the subtropical coast of Málaga and Granada [1]. Their primary production is GLOBALG.A.P. certified as a producer group [2], with the GRASP social practice assessment module: contracts, working hours, wages and worker health and safety, verified in the annual audit [3].',
        cites: [
          { src: 'MEM-2025', q: 'Network of more than 1,200 growers in the Axarquía and the subtropical coast of Málaga and Granada.' },
          { src: 'CERT-GGAP', q: 'certified as a producer group' },
          {
            src: 'CERT-GGAP',
            q: 'Social practice assessment (GRASP): contracts, working hours, wages and worker health and safety on the farms of the group, verified in the annual audit.'
          }
        ]
      },
      {
        id: 'E2',
        ref: 'NDF-26 · E2',
        sec: 'E',
        topic: 'Emissions, water footprint and supplier ESG policy',
        conf: 'none',
        qEn: 'Provide your scope 1, 2 and 3 greenhouse gas emissions, your water footprint, your reduction targets and your responsible purchasing (ESG) policy.',
        flag: {
          reason: 'There is only indirect evidence: the sustainability report gives electricity consumption, but no indexed document contains an emissions inventory, a water footprint or a supplier ESG policy.',
          partial: [
            {
              src: 'MEM-2025',
              q: 'Electricity consumption 2025: 5,240 MWh, 46 % from renewable sources with a guarantee of origin.',
              why: 'It is an energy figure, not a scope 1, 2 and 3 emissions inventory.'
            }
          ],
          missing: [
            'Scope 1, 2 and 3 emissions inventory (GHG Protocol)',
            'Water footprint and emission and water use reduction targets',
            'Responsible purchasing policy and supplier code of conduct'
          ]
        }
      }
    ]
  }
});
