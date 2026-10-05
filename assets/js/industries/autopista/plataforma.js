/* Autopista Multimotor · estado de plataforma y sistemas. Monitoreo de integraciones (MFM).
 * Las funciones reciben el contexto H de la escena. */
(function () {
  'use strict';

  /* Sistemas integrados: 10 servicios críticos. */
  const SYSTEMS = [
    {
      system: 'Salesforce CRM',
      status: 'operational',
      uptime: '99.9%',
      last_incident: '2026-10-02 19:20-20:15',
      incident: 'Lag en sincronización (15-20 min retraso)',
      impact: 'Inventory updates delayed, mitigated with SAP direct access',
      users_affected: 12
    },
    {
      system: 'SAP ERP',
      status: 'operational',
      uptime: '99.95%',
      last_incident: '2026-09-28 02:00-02:30',
      incident: 'Mantenimiento programado (30 min)',
      impact: 'No impacto - fuera horario operativo',
      users_affected: 0
    },
    {
      system: 'Odoo Inventory',
      status: 'operational',
      uptime: '99.8%',
      last_incident: '2026-10-04 14:45-15:10',
      incident: 'Timeout consulta flota grande',
      impact: 'Reporte de disponibilidad lento (2-3 seg)',
      users_affected: 3
    },
    {
      system: 'iCare Taller',
      status: 'operational',
      uptime: '99.7%',
      last_incident: '2026-10-01 08:00-08:45',
      incident: 'Sincronización OBD connection lost',
      impact: 'Diagnóstico remoto no disponible 45 min',
      users_affected: 6
    },
    {
      system: 'Stripe Pagos',
      status: 'operational',
      uptime: '99.99%',
      last_incident: '2026-09-20 (Stripe external)',
      incident: 'Mantenimiento externo',
      impact: 'Pagos pausados 5 min',
      users_affected: 2
    },
    {
      system: 'Twilio SMS',
      status: 'operational',
      uptime: '99.9%',
      last_incident: '2026-09-15',
      incident: 'Rate limiting triggered',
      impact: 'SMS confirmaciones retrasados 2-3 min',
      users_affected: 15
    },
    {
      system: 'Telemetría GPS',
      status: 'operational',
      uptime: '99.85%',
      last_incident: '2026-10-03 11:30-12:00',
      incident: 'Proveedor GPS maintenance',
      impact: 'Tracking no disponible 30 min',
      users_affected: 8
    },
    {
      system: 'DocuSign e-firma',
      status: 'operational',
      uptime: '99.95%',
      last_incident: '2026-09-25',
      incident: 'API rate limit exceeded',
      impact: 'Retraso 30 seg envío documentos',
      users_affected: 1
    },
    {
      system: 'Google Workspace',
      status: 'operational',
      uptime: '99.99%',
      last_incident: 'No recent incidents',
      incident: 'N/A',
      impact: 'N/A',
      users_affected: 0
    },
    {
      system: 'Slack Integraciones',
      status: 'operational',
      uptime: '99.9%',
      last_incident: '2026-10-05 09:00-09:15',
      incident: 'Webhook delivery delay',
      impact: 'Notificaciones alertas retrasadas',
      users_affected: 25
    }
  ];

  /* Conectividad entre sistemas. */
  const CONNECTIVITY = [
    { connection: 'Conexión datos Salesforce→SAP', status: 'ok', latency: '245ms', last_sync: '2026-10-07 07:29:45Z', sync_frequency: 'Real-time (event-based)' },
    { connection: 'Conexión datos Odoo→SAP Inventario', status: 'ok', latency: '180ms', last_sync: '2026-10-07 07:25:12Z', sync_frequency: 'Cada 15 minutos' },
    { connection: 'Conexión iCare→SAP Finanzas', status: 'ok', latency: '320ms', last_sync: '2026-10-07 07:15:00Z', sync_frequency: 'Cada 30 minutos' },
    { connection: 'Conexión Telemetría→Odoo Flota', status: 'ok', latency: '150ms', last_sync: '2026-10-07 07:28:33Z', sync_frequency: 'Real-time GPS' },
    { connection: 'Conexión Stripe→SAP Contabilidad', status: 'ok', latency: '500ms', last_sync: '2026-10-07 06:00:00Z', sync_frequency: 'Cada 1 hora (batch)' }
  ];

  /* Calidad de datos. */
  const DATA_QUALITY = [
    { metric: 'Completitud registros CRM', value: '97.2%', trend: 'improving', threshold: '> 95%', status: 'ok' },
    { metric: 'Consistencia datos ERP', value: '99.1%', trend: 'stable', threshold: '> 98%', status: 'ok' },
    { metric: 'Duplicados en inventario', value: '0.3%', trend: 'improving', threshold: '< 1%', status: 'ok' },
    { metric: 'Retrasos sincronización', value: '2.4%', trend: 'declining', threshold: '< 5%', status: 'ok' },
    { metric: 'Errores procesamiento pagos', value: '0.02%', trend: 'stable', threshold: '< 0.1%', status: 'ok' }
  ];

  /* Seguridad. */
  const SECURITY = [
    { component: 'Autenticación SSO', status: 'active', last_audit: '2026-09-15', certificate_expires: '2027-03-15', issues: 'None' },
    { component: 'Encriptación datos en tránsito', status: 'active', protocol: 'TLS 1.3', last_audit: '2026-09-01', issues: 'None' },
    { component: 'Encriptación datos en reposo', status: 'active', method: 'AES-256 (BD + archivos)', last_audit: '2026-09-01', issues: 'None' },
    { component: 'Gestión de credenciales', status: 'active', vault: 'HashiCorp Vault', last_rotation: '2026-10-01', issues: 'None' },
    { component: 'Auditoría y logs', status: 'active', retention: '90 días', compliance: 'GDPR + LOPD', issues: 'None' }
  ];

  /* Performance. */
  const PERFORMANCE = [
    { metric: 'Tiempo respuesta CRM (p95)', value: '850ms', target: '< 2000ms', status: 'excellent' },
    { metric: 'Tiempo respuesta ERP (p95)', value: '1200ms', target: '< 3000ms', status: 'excellent' },
    { metric: 'Disponibilidad API', value: '99.92%', target: '> 99.5%', status: 'excellent' },
    { metric: 'Capacidad procesamiento pagos/h', value: '450 transacciones', target: '> 200', status: 'excellent' }
  ];

  /* Ventanas de mantenimiento. */
  const MAINTENANCE_WINDOWS = [
    { system: 'SAP ERP', scheduled: '2026-10-12 02:00-04:00 UTC', duration: '2 horas', purpose: 'Actualización kernel, sin impacto datos', impact: 'Offline 2h' },
    { system: 'Odoo Inventory', scheduled: '2026-10-08 22:00-23:30 UTC', duration: '1.5 horas', purpose: 'Upgrade módulo reporting', impact: 'Reportes no disponibles' },
    { system: 'Telemetría GPS', scheduled: 'Rolling (proveedor)', frequency: 'Mensual', duration: '30-60 min', purpose: 'Mantenimiento proveedor', impact: 'Tracking degradado' }
  ];

  /* Contactos de soporte. */
  const SUPPORT_CONTACTS = [
    { system: 'Salesforce', team: 'Equipo CRM', contact: 'crm-support@autopista.local', escalation: 'Salesforce TAM', sla: '4h respuesta' },
    { system: 'SAP', team: 'Equipo ERP', contact: 'erp-support@autopista.local', escalation: 'SAP Soporte Premium', sla: '2h respuesta crítica' },
    { system: 'iCare Taller', team: 'Especialista Taller', contact: 'taller@autopista.local', escalation: 'Proveedor iCare', sla: '1h respuesta' },
    { system: 'Infraestructura', team: 'Equipo DevOps', contact: 'devops@autopista.local', escalation: 'On-call engineer 24/7', sla: '30min respuesta crítica' }
  ];

  /* Funciones para contexto H. */
  const operationalSystems = (sc) => SYSTEMS.filter((s) => s.status === 'operational').length;
  const avgUptime = (sc) => {
    const sum = SYSTEMS.reduce((acc, s) => acc + parseFloat(s.uptime), 0);
    return (sum / SYSTEMS.length).toFixed(2) + '%';
  };
  const totalUsersAffected = (sc) => SYSTEMS.reduce((sum, s) => sum + s.users_affected, 0);
  const dataQualityOk = (sc) => DATA_QUALITY.filter((m) => m.status === 'ok').length;

  agenticPack('autopista', {
    plataforma: {
      nav: 'Estado de plataforma',
      title: 'Centro de monitoreo de sistemas',
      icon: 'server',
      page_title: 'Autopista Multimotor · Estado de plataforma',
      summary: '10 sistemas operacionales · Uptime 99.9% promedio · 5 conexiones sincronizadas · 5/5 métricas de calidad OK · 5/5 componentes seguridad activos · Performance excelente.',
      status: 'operational',
      current_status: 'operational',
      last_check: '2026-10-07T07:30:00Z',
      operational_systems: operationalSystems(),
      avg_uptime: avgUptime(),
      total_users_affected: totalUsersAffected(),
      data_quality_ok: dataQualityOk(),
      systems: SYSTEMS,
      connectivity: CONNECTIVITY,
      data_quality: DATA_QUALITY,
      security: SECURITY,
      performance: PERFORMANCE,
      maintenance_windows: MAINTENANCE_WINDOWS,
      support_contacts: SUPPORT_CONTACTS,
      chart: {
        title: 'Estado de plataforma y disponibilidad de sistemas',
        sub: '2026-10-07 · Autopista Multimotor · 10 servicios críticos',
        system_status: [
          { system: 'Salesforce CRM', uptime: '99.9%', status: 'operational', incidents_30d: 1 },
          { system: 'SAP ERP', uptime: '99.95%', status: 'operational', incidents_30d: 1 },
          { system: 'Odoo Inventory', uptime: '99.8%', status: 'operational', incidents_30d: 1 },
          { system: 'iCare Taller', uptime: '99.7%', status: 'operational', incidents_30d: 1 },
          { system: 'Stripe Pagos', uptime: '99.99%', status: 'operational', incidents_30d: 1 },
          { system: 'Twilio SMS', uptime: '99.9%', status: 'operational', incidents_30d: 1 },
          { system: 'Telemetría GPS', uptime: '99.85%', status: 'operational', incidents_30d: 1 },
          { system: 'DocuSign e-firma', uptime: '99.95%', status: 'operational', incidents_30d: 1 },
          { system: 'Google Workspace', uptime: '99.99%', status: 'operational', incidents_30d: 0 },
          { system: 'Slack Integraciones', uptime: '99.9%', status: 'operational', incidents_30d: 1 }
        ],
        connectivity_status: [
          { connection: 'Salesforce→SAP', latency: '245ms', status: 'ok' },
          { connection: 'Odoo→SAP Inventario', latency: '180ms', status: 'ok' },
          { connection: 'iCare→SAP Finanzas', latency: '320ms', status: 'ok' },
          { connection: 'Telemetría→Odoo Flota', latency: '150ms', status: 'ok' },
          { connection: 'Stripe→SAP Contabilidad', latency: '500ms', status: 'ok' }
        ]
      },
      event_kv: [
        ['Operacional', '10/10 sistemas operacionales · Uptime 99.9% promedio · Última revisión 07/10 07:30 UTC'],
        ['Conectividad', '5/5 conexiones OK · Latencias 150-500ms · Sincronizaciones real-time y batch'],
        ['Datos', 'Completitud CRM 97.2% · Consistencia ERP 99.1% · 0 errores críticos pagos'],
        ['Seguridad', 'SSO activo · TLS 1.3 · AES-256 · HashiCorp Vault · GDPR + LOPD']
      ]
    }
  });
})();
