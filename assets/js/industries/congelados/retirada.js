/**
 * Retirada (Lot Recall Drill) - Empresa de Congelados
 * Campaign RET-2026-0815 | Drill Scope | Started 01/10/2026 10:00
 */

window.CN_Retirada = {
  es: {
    campaign: {
      id: 'RET-2026-0815',
      name: 'Retirada Preventiva - Lote Guisantes Verdes',
      scope: 'drill',
      initiated: '01/10/2026 10:00',
      type: 'lot_recall',
      status: 'active'
    },

    drillLot: {
      code: 'L26-261-FUS-GUI-03',
      product: 'Guisantes verdes 1kg',
      productCode: 'GUI-03',
      harvestedAt: '28/09/2026 06:15',
      harvestedLocation: 'Fustiñana',
      pallets: 12,
      weight: '9,600 kg',
      batchOrigin: 'AGR-0401',
      grower: 'Agricultor Certificado AGR-0401',
      silo: 'SIL-1',
      plant: 'FUS'
    },

    relatedLots: [
      {
        code: 'L26-258-FUS-BRO-01',
        product: 'Brócoli 500g',
        harvestedAt: '28/09/2026 06:15',
        pallets: 8,
        weight: '4,000 kg',
        plant: 'FUS',
        silo: 'SIL-2'
      },
      {
        code: 'L26-255-ALF-ESP-04',
        product: 'Espárragos verdes 750g',
        harvestedAt: '28/09/2026 06:15',
        pallets: 6,
        weight: '4,500 kg',
        plant: 'ALF',
        silo: 'SIL-3'
      }
    ],

    alarmEvent: {
      triggeredAt: '28/09/2026 09:30',
      reason: 'Irregularidad en sensor temperatura Silo 1',
      severity: 'high',
      affectedLots: 3,
      shipmentHoldTime: '28/09/2026 09:30'
    },

    heldShipments: [
      {
        code: 'EXP-26-41106',
        destination: 'Centro Distribución Regional UK',
        status: 'Hold',
        pallets: 10,
        weight: '7,500 kg',
        heldFrom: '28/09/2026 09:30',
        lot: 'L26-261-FUS-GUI-03'
      },
      {
        code: 'EXP-26-41107',
        destination: 'Centro Distribución Regional Francia',
        status: 'Hold',
        pallets: 8,
        weight: '6,000 kg',
        heldFrom: '28/09/2026 09:30',
        lot: 'L26-258-FUS-BRO-01'
      },
      {
        code: 'EXP-26-41109',
        destination: 'Centro Distribución Regional Alemania',
        status: 'Hold',
        pallets: 6,
        weight: '4,500 kg',
        heldFrom: '28/09/2026 09:30',
        lot: 'L26-255-ALF-ESP-04'
      },
      {
        code: 'EXP-26-41111',
        destination: 'Centro Distribución Regional Italia',
        status: 'Hold',
        pallets: 7,
        weight: '5,250 kg',
        heldFrom: '28/09/2026 09:30',
        lot: 'L26-261-FUS-GUI-03'
      },
      {
        code: 'EXP-26-41118',
        destination: 'Centro Distribución Regional España',
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
        region: 'Reino Unido',
        shipmentsReceived: 2,
        palletsDelivered: 8,
        status: 'notified',
        notifiedAt: '28/09/2026 11:15'
      },
      {
        name: 'Distribuidor Generic 1',
        region: 'Francia',
        shipmentsReceived: 1,
        palletsDelivered: 5,
        status: 'notified',
        notifiedAt: '28/09/2026 12:00'
      },
      {
        name: 'Distribuidor Generic 2',
        region: 'Alemania',
        shipmentsReceived: 1,
        palletsDelivered: 4,
        status: 'notified',
        notifiedAt: '28/09/2026 12:30'
      },
      {
        name: 'Distribuidor Generic 3',
        region: 'Italia',
        shipmentsReceived: 1,
        palletsDelivered: 10,
        status: 'pending'
      }
    ],

    plantLocations: {
      FUS: {
        name: 'Planta Fustiñana',
        code: 'FUS',
        silos: ['SIL-1', 'SIL-2', 'SIL-3', 'SIL-4'],
        dock: 'Muelle 2'
      },
      ALF: {
        name: 'Planta Alfaro',
        code: 'ALF',
        silos: ['SIL-1', 'SIL-2'],
        dock: 'Muelle 1'
      },
      OLM: {
        name: 'Planta Olmedo',
        code: 'OLM',
        silos: ['SIL-1', 'SIL-2', 'SIL-3'],
        dock: 'Muelle 3'
      }
    },

    recallSteps: [
      {
        id: 1,
        name: 'Localizar todos los lotes',
        description: 'Identificar ubicación física de todos los lotes en silos FUS (SIL-1 a SIL-4)',
        status: 'completed',
        completedAt: '28/09/2026 10:15',
        finding: '38 pallets ubicados en planta Fustiñana, 27 pallets ya entregados a clientes'
      },
      {
        id: 2,
        name: 'Retener envíos',
        description: 'Retener 5 códigos de envío de estados "Listo" a "Retención"',
        status: 'completed',
        completedAt: '28/09/2026 10:45',
        finding: 'EXP-26-41106, 41107, 41109, 41111, 41118 marcados como Hold'
      },
      {
        id: 3,
        name: 'Notificar clientes',
        description: 'Contactar a Retailer UK y 3 distribuidores regionales identificados',
        status: 'completed',
        completedAt: '28/09/2026 13:00',
        finding: '4 clientes notificados; Generic Distributor 4 aún pendiente confirmación'
      },
      {
        id: 4,
        name: 'Verificar retención',
        description: 'Revisar sistema de envíos por manifiestos actualizados, confirmar 38 pallets',
        status: 'completed',
        completedAt: '28/09/2026 14:30',
        finding: '38 pallets contabilizados; 5 envíos en Hold confirman toda la cantidad'
      },
      {
        id: 5,
        name: 'Evaluar daño',
        description: 'Inspeccionar integridad del producto y empaque, ausencia de daño físico',
        status: 'completed',
        completedAt: '28/09/2026 15:15',
        finding: 'Sin daño físico observado, integridad del producto mantenida, temperatura normal'
      },
      {
        id: 6,
        name: 'Documentar retirada',
        description: 'Generar reporte REG-CAL-012-08, borrador 8D, retención legal',
        status: 'completed',
        completedAt: '28/09/2026 16:00',
        finding: 'REG-CAL-012-08 creado, 8D en progreso, legal notificado'
      },
      {
        id: 7,
        name: 'Decidir destrucción o refabricación',
        description: 'Determinar acción final: destrucción, refabricación, o venta con descuento',
        status: 'pending',
        action: 'destroy',
        finding: 'Para propósitos de simulacro: asumir destrucción'
      }
    ],

    agentLanes: [
      {
        id: 'trace',
        name: 'Trazabilidad',
        role: 'turno',
        description: 'Mapear lotes a plantas, silos y envíos',
        tasks: [
          'Identificar L26-261-FUS-GUI-03 en SIL-1 Fustiñana',
          'Identificar L26-258-FUS-BRO-01 en SIL-2 Fustiñana',
          'Identificar L26-255-ALF-ESP-04 en SIL-3 Alfaro',
          'Listar 5 envíos bajo retención'
        ]
      },
      {
        id: 'notify',
        name: 'Notificación a Clientes',
        role: 'comunicacion',
        description: 'Contactar a clientes afectados y confirmar recepción',
        tasks: [
          'Enviar alerta a Retailer UK',
          'Enviar alerta a Distribuidor Generic 1 (Francia)',
          'Enviar alerta a Distribuidor Generic 2 (Alemania)',
          'Enviar alerta a Distribuidor Generic 3 (Italia)',
          'Registrar confirmaciones de recepción'
        ]
      },
      {
        id: 'hold',
        name: 'Verificación de Retención',
        role: 'logistica',
        description: 'Confirmar estado de envíos en sistema y almacenes',
        tasks: [
          'Confirmar EXP-26-41106 en Hold desde 28/09 09:30',
          'Confirmar EXP-26-41107 en Hold desde 28/09 09:30',
          'Confirmar EXP-26-41109 en Hold desde 28/09 09:30',
          'Confirmar EXP-26-41111 en Hold desde 28/09 09:30',
          'Confirmar EXP-26-41118 en Hold desde 28/09 09:30',
          'Verificar manifiestos actualizados'
        ]
      },
      {
        id: 'document',
        name: 'Documentación y Cumplimiento',
        role: 'calidad',
        description: 'Crear reportes, retención legal y análisis de causa raíz',
        tasks: [
          'Crear reporte de retirada REG-CAL-012-08',
          'Iniciar análisis 8D',
          'Notificar legal de retención',
          'Archivar evidencia de alarma de temperatura',
          'Documentar acciones correctivas'
        ]
      }
    ],

    resultTiles: {
      lotsHeld: {
        title: 'Lotes Retenidos',
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
        title: 'Envíos en Retención',
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
        title: 'Clientes Notificados',
        count: 4,
        customers: [
          'Retailer UK',
          'Distribuidor Generic 1',
          'Distribuidor Generic 2',
          'Distribuidor Generic 3'
        ]
      },
      documentation: {
        title: 'Documentación de Retirada',
        report: 'REG-CAL-012-08',
        status: '8D en progreso',
        legalHold: 'activo'
      }
    },

    meta: {
      drillType: 'lot_recall',
      scope: 'drill_only_not_production',
      campaignId: 'RET-2026-0815',
      primaryDrillLot: 'L26-261-FUS-GUI-03',
      industry: 'congelados',
      region: 'paneuropea',
      createdAt: '01/10/2026 10:00',
      trace: {
        example: 'L26-261-FUS-GUI-03',
        alarmTrigger: '28/09/2026 09:30',
        supervisor: 'turno',
        questionnaire: 'cuestionario_retirada_01',
        alarm: 'TEMP_SENSOR_SIL1_HIGH'
      }
    }
  },

  qEs: {
    campaign: {
      id: 'RET-2026-0815',
      name: 'Retirada Preventiva - Lote Guisantes Verdes'
    },
    drillLot: {
      code: 'L26-261-FUS-GUI-03',
      product: 'Guisantes verdes 1kg'
    }
  },

  getStatus: function() {
    return {
      campaign: this.es.campaign.id,
      scope: this.es.campaign.scope,
      initiated: this.es.campaign.initiated,
      drillLot: this.es.drillLot.code,
      relatedLots: this.es.relatedLots.map(l => l.code),
      heldShipments: this.es.heldShipments.map(s => s.code),
      completedSteps: this.es.recallSteps.filter(s => s.status === 'completed').length,
      totalSteps: this.es.recallSteps.length,
      affectedCustomers: this.es.affectedCustomers.length,
      results: this.es.resultTiles
    };
  },

  validateDrillData: function() {
    var drillLots = [this.es.drillLot.code].concat(this.es.relatedLots.map(function(l) { return l.code; }));
    var shipmentCodes = this.es.heldShipments.map(function(s) { return s.code; });
    
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
