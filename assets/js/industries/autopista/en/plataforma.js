(function () {
  'use strict';

  const SYSTEMS = [
    { system: 'Salesforce CRM', status: 'operational', uptime: '99.9%', last_incident: '2026-10-02 19:20-20:15', incident: 'Sync delay (15-20 min lag)', impact: 'Inventory updates delayed, mitigated with direct SAP access', users_affected: 12 },
    { system: 'SAP ERP', status: 'operational', uptime: '99.95%', last_incident: '2026-09-28 02:00-02:30', incident: 'Scheduled maintenance (30 min)', impact: 'No impact - off-hours', users_affected: 0 },
    { system: 'Odoo Inventory', status: 'operational', uptime: '99.8%', last_incident: '2026-10-04 14:45-15:10', incident: 'Large fleet query timeout', impact: 'Availability report slow (2-3 sec)', users_affected: 3 },
    { system: 'iCare Workshop', status: 'operational', uptime: '99.7%', last_incident: '2026-10-01 08:00-08:45', incident: 'OBD connection lost', impact: 'Remote diagnostics unavailable 45 min', users_affected: 6 },
    { system: 'Stripe Payments', status: 'operational', uptime: '99.99%', last_incident: '2026-09-20 (external)', incident: 'Provider maintenance', impact: 'Payments paused 5 min', users_affected: 2 },
    { system: 'Twilio SMS', status: 'operational', uptime: '99.9%', last_incident: '2026-09-15', incident: 'Rate limiting triggered', impact: 'SMS confirmations delayed 2-3 min', users_affected: 15 },
    { system: 'GPS Telemetry', status: 'operational', uptime: '99.85%', last_incident: '2026-10-03 11:30-12:00', incident: 'Provider maintenance', impact: 'Tracking unavailable 30 min', users_affected: 8 },
    { system: 'DocuSign e-signature', status: 'operational', uptime: '99.95%', last_incident: '2026-09-25', incident: 'API rate limit exceeded', impact: 'Document delivery delay 30 sec', users_affected: 1 },
    { system: 'Google Workspace', status: 'operational', uptime: '99.99%', last_incident: 'No recent incidents', incident: 'N/A', impact: 'N/A', users_affected: 0 },
    { system: 'Slack Integrations', status: 'operational', uptime: '99.9%', last_incident: '2026-10-05 09:00-09:15', incident: 'Webhook delivery delay', impact: 'Alert notifications delayed', users_affected: 25 }
  ];

  const CONNECTIVITY = [
    { connection: 'Salesforce → SAP Sync', status: 'ok', latency: '245ms', last_sync: '2026-10-07 07:29:45Z', sync_frequency: 'Real-time (event-based)' },
    { connection: 'Odoo → SAP Inventory Sync', status: 'ok', latency: '180ms', last_sync: '2026-10-07 07:25:12Z', sync_frequency: 'Every 15 minutes' },
    { connection: 'iCare → SAP Finance Sync', status: 'ok', latency: '320ms', last_sync: '2026-10-07 07:15:00Z', sync_frequency: 'Every 30 minutes' },
    { connection: 'Telemetry → Odoo Fleet', status: 'ok', latency: '150ms', last_sync: '2026-10-07 07:28:33Z', sync_frequency: 'Real-time GPS' },
    { connection: 'Stripe → SAP Accounting', status: 'ok', latency: '500ms', last_sync: '2026-10-07 06:00:00Z', sync_frequency: 'Hourly (batch)' }
  ];

  const DATA_QUALITY = [
    { metric: 'CRM Record Completeness', value: '97.2%', trend: 'improving', threshold: '> 95%', status: 'ok' },
    { metric: 'ERP Data Consistency', value: '99.1%', trend: 'stable', threshold: '> 98%', status: 'ok' },
    { metric: 'Inventory Duplicates', value: '0.3%', trend: 'improving', threshold: '< 1%', status: 'ok' },
    { metric: 'Sync Delays', value: '2.4%', trend: 'declining', threshold: '< 5%', status: 'ok' },
    { metric: 'Payment Processing Errors', value: '0.02%', trend: 'stable', threshold: '< 0.1%', status: 'ok' }
  ];

  const SECURITY = [
    { component: 'SSO Authentication', status: 'active', last_audit: '2026-09-15', certificate_expires: '2027-03-15', issues: 'None' },
    { component: 'In-Transit Encryption', status: 'active', protocol: 'TLS 1.3', last_audit: '2026-09-01', issues: 'None' },
    { component: 'At-Rest Encryption', status: 'active', method: 'AES-256 (DB + files)', last_audit: '2026-09-01', issues: 'None' },
    { component: 'Credential Management', status: 'active', vault: 'HashiCorp Vault', last_rotation: '2026-10-01', issues: 'None' },
    { component: 'Audit Logging', status: 'active', retention: '90 days', compliance: 'GDPR + LOPD', issues: 'None' }
  ];

  const PERFORMANCE = [
    { metric: 'CRM Response Time (p95)', value: '850ms', target: '< 2000ms', status: 'excellent' },
    { metric: 'ERP Response Time (p95)', value: '1200ms', target: '< 3000ms', status: 'excellent' },
    { metric: 'API Availability', value: '99.92%', target: '> 99.5%', status: 'excellent' },
    { metric: 'Payment Processing Capacity/h', value: '450 transactions', target: '> 200', status: 'excellent' }
  ];

  const MAINTENANCE_WINDOWS = [
    { system: 'SAP ERP', scheduled: '2026-10-12 02:00-04:00 UTC', duration: '2 hours', purpose: 'Kernel update, no data impact', impact: 'Offline 2h' },
    { system: 'Odoo Inventory', scheduled: '2026-10-08 22:00-23:30 UTC', duration: '1.5 hours', purpose: 'Reporting module upgrade', impact: 'Reports unavailable' },
    { system: 'GPS Telemetry', scheduled: 'Rolling (provider)', frequency: 'Monthly', duration: '30-60 min', purpose: 'Provider maintenance', impact: 'Tracking degraded' }
  ];

  const SUPPORT_CONTACTS = [
    { system: 'Salesforce', team: 'CRM Team', contact: 'crm-support@autopista.local', escalation: 'Salesforce TAM', sla: '4h response' },
    { system: 'SAP', team: 'ERP Team', contact: 'erp-support@autopista.local', escalation: 'SAP Premium Support', sla: '2h critical response' },
    { system: 'iCare Workshop', team: 'Workshop Specialist', contact: 'taller@autopista.local', escalation: 'iCare Provider', sla: '1h response' },
    { system: 'Infrastructure', team: 'DevOps Team', contact: 'devops@autopista.local', escalation: 'On-call engineer 24/7', sla: '30min critical response' }
  ];

  function operationalSystems() {
    return SYSTEMS.filter(s => s.status === 'operational').length;
  }

  function avgUptime() {
    const uptimes = SYSTEMS.map(s => parseFloat(s.uptime));
    return (uptimes.reduce((a, b) => a + b, 0) / uptimes.length).toFixed(2);
  }

  function totalUsersAffected() {
    return SYSTEMS.reduce((sum, s) => sum + s.users_affected, 0);
  }

  function upcomingMaintenance() {
    return MAINTENANCE_WINDOWS.length;
  }

  agenticPackEn('autopista', {
    plataforma: {
      nav: 'Platform Status',
      title: 'Platform and Systems Status',
      icon: 'server',
      page_title: 'Autopista Multimotor · Infrastructure',
      summary: `${operationalSystems()}/${SYSTEMS.length} systems operational, average uptime ${avgUptime()}%. Connectivity: ${CONNECTIVITY.length} integrations syncing (latency 150-500ms). Data quality: CRM 97.2%, ERP 99.1%, zero critical issues. Security: 5 controls active (SSO, TLS 1.3, AES-256, Vault, audit logging). Performance: all metrics excellent (CRM 850ms p95, ERP 1200ms, API 99.92%). ${upcomingMaintenance()} maintenance windows scheduled.`,
      status: 'operational',
      current_status: 'operational',
      last_check: '2026-10-07T07:30:00Z',
      type: 'system-status',
      systems: SYSTEMS,
      connectivity: CONNECTIVITY,
      data_quality: DATA_QUALITY,
      security: SECURITY,
      performance: PERFORMANCE,
      maintenance_windows: MAINTENANCE_WINDOWS,
      support_contacts: SUPPORT_CONTACTS,
      chart: {
        title: 'System uptime and incident summary',
        sub: '2026-10-07 · Autopista Multimotor',
        systems_status: [
          { system: 'Salesforce CRM', uptime: '99.9%', users_affected: 12, status: 'operational' },
          { system: 'SAP ERP', uptime: '99.95%', users_affected: 0, status: 'operational' },
          { system: 'Odoo Inventory', uptime: '99.8%', users_affected: 3, status: 'operational' },
          { system: 'iCare Workshop', uptime: '99.7%', users_affected: 6, status: 'operational' },
          { system: 'Stripe Payments', uptime: '99.99%', users_affected: 2, status: 'operational' },
          { system: 'Twilio SMS', uptime: '99.9%', users_affected: 15, status: 'operational' },
          { system: 'GPS Telemetry', uptime: '99.85%', users_affected: 8, status: 'operational' },
          { system: 'DocuSign', uptime: '99.95%', users_affected: 1, status: 'operational' },
          { system: 'Google Workspace', uptime: '99.99%', users_affected: 0, status: 'operational' },
          { system: 'Slack', uptime: '99.9%', users_affected: 25, status: 'operational' }
        ]
      },
      event_kv: [
        ['Systems', `${operationalSystems()}/10 operational · Avg uptime ${avgUptime()}% · Total users affected by recent incidents: ${totalUsersAffected()}`],
        ['Security', '5/5 controls active (SSO, TLS 1.3, AES-256, Vault, audit) · Last audit 2026-09-15 · Zero issues'],
        ['Performance', 'CRM 850ms (p95) · ERP 1200ms · API 99.92% · Payment capacity 450 tx/h · All metrics excellent'],
        ['Integrations', `${CONNECTIVITY.length} active syncs (latency 150-500ms) · Data quality excellent (CRM 97.2%, ERP 99.1%) · ${upcomingMaintenance()} maintenance windows`]
      ]
    }
  });
})();
