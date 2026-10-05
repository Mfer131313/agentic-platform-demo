agenticPack('autopista', {
  workflow: {
    title: 'De petición a contrato: proceso de venta',
    description: 'Narrativa de cómo Agentic Platform convierte peticiones textuales en órdenes de venta estructuradas.',
    scenario: 'Un cliente llama al centro de contacto: «Busco un Seat Ibiza automático de gama media, financiado con entrada de 20 k€, para usar en Madrid.» La plataforma extrae entidades (marca, modelo, transmisión, precio, ciudad), genera un plan de búsqueda en inventario (filtro: Seat Ibiza, automático, precio ≤ 65 k€, stock en Madrid), propone alternativas con márgenes altos, y redacta un contrato borrador con financiación preaprobada.',
    steps: [
      { step: 1, action: 'Captura de petición', input: 'Texto libre en chat o SMS', output: 'Entidades extraídas: {marca: Seat, modelo: Ibiza, transmisión: automático, financiación: 80%, entrada: 20000, ubicación: Madrid}' },
      { step: 2, action: 'Búsqueda en inventario', input: 'Filtros estructurados', output: 'Candidatos: VIN-2026-MAD-SEAT-03 (64500 €), VIN-2026-BCN-SEAT-15 (65200 €, stock Barcelona)' },
      { step: 3, action: 'Aprobación de financiación', input: 'Datos cliente + vehículo', output: 'Pre-aprobación: TAE 3.99%, cuota mensual 324 €, plazo 60 meses. Documento: HIPOTECA-2026-18472' },
      { step: 4, action: 'Redacción de propuesta', input: 'Entidades + financiación', output: 'Contrato PDF borrador enviado a cliente por email y SMS. Incluye: descripción vehículo, precio, cuota mensual, seguros recomendados.' },
      { step: 5, action: 'Aprobación del cliente', input: 'Firma digital e-sign', output: 'Contrato firmado. Estado SAP: «Pedido confirmado». Referencia: PED-2026-0847.' },
      { step: 6, action: 'Generación de factura', input: 'Contrato + datos financieros', output: 'Factura emitida. Entrega programada. Correo de confirmación al cliente.' }
    ],
    key_integrations: ['Salesforce (CRM)', 'SAP (ERP + financiación)', 'Twilio (SMS)', 'Stripe (pagos iniciales)', 'DocuSign (firmas)'],
    approval_gates: [
      { gate: 'Aprobación de financiación', owned_by: 'Responsable de finanzas', escalation: '> 70.000 €' },
      { gate: 'Revisión de contrato', owned_by: 'Asesor legal', escalation: 'Cliente VIP o términos especiales' }
    ]
  }
});
