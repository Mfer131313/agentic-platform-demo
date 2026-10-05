/**
 * Retirada (Lot Recall Drill) - Empresa de Congelados
 * Campaign RET-2026-0815 | Drill Scope | Started 01/10/2026 10:00
 * English Version
 */

window.CN_Retirada = {
  en: {
    campaign: {
      id: 'RET-2026-0815',
      name: 'Preventive Recall - Green Peas Lot',
      scope: 'drill',
      initiated: '01/10/2026 10:00',
      type: 'lot_recall',
      status: 'active'
    },

    drillLot: {
      code: 'L26-261-FUS-GUI-03',
      product: 'Green peas 1kg',
      productCode: 'GUI-03',
      harvestedAt: '28/09/2026 06:15',
      harvestedLocation: 'Fustiñana',
      pallets: 12,
      weight: '9,600 kg',
      batchOrigin: 'AGR-0401',
      grower: 'Certified Grower AGR-0401',
      silo: 'SIL-1',
      plant: 'FUS'
    },

    relatedLots: [
      {
        code: 'L26-258-FUS-BRO-01',
        product: 'Broccoli 500g',
        harvestedAt: '28/09/2026 06:15',
        pallets: 8,
        weight: '4,000 kg',
        plant: 'FUS',
        silo: 'SIL-2'
      },
      {
        code: 'L26-255-ALF-ESP-04',
        product: 'Green asparagus 750g',
        harvestedAt: '28/09/2026 06:15',
        pallets: 6,
        weight: '4,500 kg',
        plant: 'ALF',
        silo: 'SIL-3'
      }
    ],

    alarmEvent: {
      triggeredAt: '28/09/2026 09:30',
      reason: 'Temperature sensor irregularity Silo 1',
      severity: 'high',
      affectedLots: 3,
      shipmentHoldTime: '28/09/2026 09:30'
    },

    heldShipments: [
      {
        code: 'EXP-26-41106',
        destination: 'UK Regional Distribution Centre',
        status: 'Hold',
        pallets: 10,
        weight: '7,500 kg',
        heldFrom: '28/09/2026 09:30',
        lot: 'L26-261-FUS-GUI-03'
      },
      {
        code: 'EXP-26-41107',
        destination: 'France Regional Distribution Centre',
        status: 'Hold',
        pallets: 8,
        weight: '6,000 kg',
        heldFrom: '28/09/2026 09:30',
        lot: 'L26-258-FUS-BRO-01'
      },
      {
        code: 'EXP-26-41109',
        destination: 'Germany Regional Distribution Centre',
        status: 'Hold',
        pallets: 6,
        weight: '4,500 kg',
        heldFrom: '28/09/2026 09:30',
        lot: 'L26-255-ALF-ESP-04'
      },
      {
        code: 'EXP-26-41111',
        destination: 'Italy Regional Distribution Centre',
        status: 'Hold',
        pallets: 7,
        weight: '5,250 kg',
        heldFrom: '28/09/2026 09:30',
        lot: 'L26-261-FUS-GUI-03'
      },
      {
        code: 'EXP-26-41118',
        destination: 'Spain Regional Distribution Centre',
        status: 'Hold',
        pallets: 7,
        weight: '5,342 kg',
        heldFrom: '28/09/2026 09:30',
        lot: 'L26-258-FUS-BRO-01'
      }
    ],

    affectedCustomers: [
      {
        name: 'Retailer UK',
        region: 'United Kingdom',
        shipmentsReceived: 2,
        palletsDelivered: 8,
        status: 'notified',
        notifiedAt: '28/09/2026 11:15'
      },
      {
        name: 'Distributor Generic 1',
        region: 'France',
        shipmentsReceived: 1,
        palletsDelivered: 5,
        status: 'notified',
        notifiedAt: '28/09/2026 12:00'
      },
      {
        name: 'Distributor Generic 2',
        region: 'Germany',
        shipmentsReceived: 1,
        palletsDelivered: 4,
        status: 'notified',
        notifiedAt: '28/09/2026 12:30'
      },
      {
        name: 'Distributor Generic 3',
        region: 'Italy',
        shipmentsReceived: 1,
        palletsDelivered: 10,
        status: 'pending'
      }
    ],

    plantLocations: {
      FUS: {
        name: 'Fustiñana Plant',
        code: 'FUS',
        silos: ['SIL-1', 'SIL-2', 'SIL-3', 'SIL-4'],
        dock: 'Dock 2'
      },
      ALF: {
        name: 'Alfaro Plant',
        code: 'ALF',
        silos: ['SIL-1', 'SIL-2'],
        dock: 'Dock 1'
      },
      OLM: {
        name: 'Olmedo Plant',
        code: 'OLM',
        silos: ['SIL-1', 'SIL-2', 'SIL-3'],
        dock: 'Dock 3'
      }
    },

    recallSteps: [
      {
        id: 1,
        name: 'Locate all lots',
        description: 'Identify physical location of all lots in FUS silos (SIL-1 to SIL-4)',
        status: 'completed',
        completedAt: '28/09/2026 10:15',
        finding: '38 pallets located at Fustiñana plant, 27 pallets already delivered to customers'
      },
      {
        id: 2,
        name: 'Hold shipments',
        description: 'Hold 5 shipment codes from "Ready" to "Hold" status',
        status: 'completed',
        completedAt: '28/09/2026 10:45',
        finding: 'EXP-26-41106, 41107, 41109, 41111, 41118 marked as Hold'
      },
      {
        id: 3,
        name: 'Notify customers',
        description: 'Contact Retailer UK and 3 regional distributors identified',
        status: 'completed',
        completedAt: '28/09/2026 13:00',
        finding: '4 customers notified; Generic Distributor 4 still pending confirmation'
      },
      {
        id: 4,
        name: 'Verify hold',
        description: 'Review shipping system for updated manifests, confirm 38 pallets',
        status: 'completed',
        completedAt: '28/09/2026 14:30',
        finding: '38 pallets accounted for; 5 Hold shipments confirm full quantity'
      },
      {
        id: 5,
        name: 'Assess damage',
        description: 'Inspect product integrity and packaging, absence of physical damage',
        status: 'completed',
        completedAt: '28/09/2026 15:15',
        finding: 'No physical damage observed, product integrity maintained, normal temperature'
      },
      {
        id: 6,
        name: 'Document recall',
        description: 'Generate report REG-CAL-012-08, 8D draft, legal hold',
        status: 'completed',
        completedAt: '28/09/2026 16:00',
        finding: 'REG-CAL-012-08 created, 8D in progress, legal notified'
      },
      {
        id: 7,
        name: 'Decide destruction or rework',
        description: 'Determine final action: destruction, rework, or discounted sale',
        status: 'pending',
        action: 'destroy',
        finding: 'For drill purposes: assume destruction'
      }
    ],

    agentLanes: [
      {
        id: 'trace',
        name: 'Traceability',
        role: 'shift_supervisor',
        description: 'Map lots to plants, silos and shipments',
        tasks: [
          'Identify L26-261-FUS-GUI-03 in SIL-1 Fustiñana',
          'Identify L26-258-FUS-BRO-01 in SIL-2 Fustiñana',
          'Identify L26-255-ALF-ESP-04 in SIL-3 Alfaro',
          'List 5 shipments under hold'
        ]
      },
      {
        id: 'notify',
        name: 'Customer Notification',
        role: 'communication',
        description: 'Contact affected customers and confirm receipt',
        tasks: [
          'Send alert to Retailer UK',
          'Send alert to Distributor Generic 1 (France)',
          'Send alert to Distributor Generic 2 (Germany)',
          'Send alert to Distributor Generic 3 (Italy)',
          'Record receipt confirmations'
        ]
      },
      {
        id: 'hold',
        name: 'Hold Verification',
        role: 'logistics',
        description: 'Confirm shipment status in system and warehouses',
        tasks: [
          'Confirm EXP-26-41106 on Hold since 28/09 09:30',
          'Confirm EXP-26-41107 on Hold since 28/09 09:30',
          'Confirm EXP-26-41109 on Hold since 28/09 09:30',
          'Confirm EXP-26-41111 on Hold since 28/09 09:30',
          'Confirm EXP-26-41118 on Hold since 28/09 09:30',
          'Verify updated manifests'
        ]
      },
      {
        id: 'document',
        name: 'Documentation and Compliance',
        role: 'quality',
        description: 'Create reports, legal hold and root cause analysis',
        tasks: [
          'Create recall report REG-CAL-012-08',
          'Initiate 8D analysis',
          'Notify legal of hold',
          'Archive temperature alarm evidence',
          'Document corrective actions'
        ]
      }
    ],

    resultTiles: {
      lotsHeld: {
        title: 'Lots Held',
        count: 3,
        totalPallets: 26,
        totalWeight: '18,100 kg',
        lots: [
          'L26-261-FUS-GUI-03',
          'L26-258-FUS-BRO-01',
          'L26-255-ALF-ESP-04'
        ]
      },
      shipmentsHeld: {
        title: 'Shipments on Hold',
        count: 5,
        codes: [
          'EXP-26-41106',
          'EXP-26-41107',
          'EXP-26-41109',
          'EXP-26-41111',
          'EXP-26-41118'
        ],
        status: 'Hold'
      },
      customersNotified: {
        title: 'Customers Notified',
        count: 4,
        customers: [
          'Retailer UK',
          'Distributor Generic 1',
          'Distributor Generic 2',
          'Distributor Generic 3'
        ]
      },
      documentation: {
        title: 'Recall Documentation',
        report: 'REG-CAL-012-08',
        status: '8D in progress',
        legalHold: 'active'
      }
    },

    meta: {
      drillType: 'lot_recall',
      scope: 'drill_only_not_production',
      campaignId: 'RET-2026-0815',
      primaryDrillLot: 'L26-261-FUS-GUI-03',
      industry: 'frozen_goods',
      region: 'pan_european',
      createdAt: '01/10/2026 10:00',
      trace: {
        example: 'L26-261-FUS-GUI-03',
        alarmTrigger: '28/09/2026 09:30',
        supervisor: 'shift_supervisor',
        questionnaire: 'questionnaire_recall_01',
        alarm: 'TEMP_SENSOR_SIL1_HIGH'
      }
    }
  },

  getStatus: function() {
    return {
      campaign: this.en.campaign.id,
      scope: this.en.campaign.scope,
      initiated: this.en.campaign.initiated,
      drillLot: this.en.drillLot.code,
      relatedLots: this.en.relatedLots.map(function(l) { return l.code; }),
      heldShipments: this.en.heldShipments.map(function(s) { return s.code; }),
      completedSteps: this.en.recallSteps.filter(function(s) { return s.status === 'completed'; }).length,
      totalSteps: this.en.recallSteps.length,
      affectedCustomers: this.en.affectedCustomers.length,
      results: this.en.resultTiles
    };
  },

  validateDrillData: function() {
    var drillLots = [this.en.drillLot.code].concat(this.en.relatedLots.map(function(l) { return l.code; }));
    var shipmentCodes = this.en.heldShipments.map(function(s) { return s.code; });
    
    if (drillLots.length < 3) return false;
    if (drillLots.indexOf('L26-261-FUS-GUI-03') === -1) return false;
    if (drillLots.indexOf('L26-258-FUS-BRO-01') === -1) return false;
    if (drillLots.indexOf('L26-255-ALF-ESP-04') === -1) return false;
    
    var requiredShipments = ['EXP-26-41106', 'EXP-26-41107', 'EXP-26-41109', 'EXP-26-41111', 'EXP-26-41118'];
    for (var i = 0; i < requiredShipments.length; i++) {
      if (shipmentCodes.indexOf(requiredShipments[i]) === -1) return false;
    }
    
    return true;
  }
};

if (typeof window !== 'undefined' && window.CN_Retirada) {
  if (!window.CN_Retirada.validateDrillData()) {
    console.warn('[Retirada] Validation check failed - drill data incomplete');
  }
}
