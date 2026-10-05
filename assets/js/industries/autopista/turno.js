agenticPack('autopista', {
  turno: {
    date: '2026-10-07',
    time: '07:30',
    shift: 'Turno de mañana · Autopista Multimotor',
    summary: 'Lunes por la mañana en el hub de Madrid. Estado operativo de venta, alquiler, suscripción y taller. Reunión diaria de coordinación.',
    kpis: [
      { label: 'Entregas programadas hoy', value: '8', status: 'on-track' },
      { label: 'Órdenes de taller en cola', value: '23', status: 'warning' },
      { label: 'Vehículos alquilados en circulación', value: '156', status: 'on-track' },
      { label: 'Suscripciones activas', value: '47', status: 'on-track' },
      { label: 'Ingresos proyectados hoy (€)', value: '28,500', status: 'on-track' }
    ],
    incidents: [
      { type: 'alert', priority: 'high', title: 'Stock crítico: Seat Ibiza 1.0 TSI', detail: 'Solo 2 unidades en inventario. Próxima recepción: 15/10. Recomendación al cliente: Audi A1 como alternativa.' },
      { type: 'alert', priority: 'medium', title: 'Taller: falta mecánico especializado', detail: 'Baja médica de técnico Volkswagen. Capacidad reducida 30%. Reprogramar revisiones no urgentes.' },
      { type: 'info', priority: 'low', title: 'Reunión con proveedor de seguros', detail: '11:00. Oficina de Madrid. Negociación de comisiones Q4.' }
    ],
    briefing: 'Venta: enfoque en Audi Q3 (márgenes altos). Alquiler: pico de demanda corporativa (evento FITUR). Taller: retrasos por falta de personal. Suscripción: renovaciones próximas de 12 contratos.'
  }
});
