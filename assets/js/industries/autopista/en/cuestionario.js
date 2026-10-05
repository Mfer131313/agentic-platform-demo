(function () {
  'use strict';

  const ACTIVE_SURVEYS = [
    { id: 'ENC-2026-Q4-VENTA', name: 'Direct Sales Experience Survey', target: 'Customers with purchase in last 30 days', created: '2026-10-01', response_rate: '34%', responses_received: 127, responses_target: 375, status: 'active', sections: [
        { section: 'Pre-Purchase Information', questions: 3, avg_score: '4.2/5', comment: 'Clarity on specs and financing options' },
        { section: 'Sales Process', questions: 4, avg_score: '4.5/5', comment: 'Paperwork speed, salesperson courtesy' },
        { section: 'Financing Terms', questions: 3, avg_score: '3.8/5', comment: 'APR transparency, monthly payments' },
        { section: 'Vehicle Delivery', questions: 3, avg_score: '4.6/5', comment: 'Punctuality, vehicle condition, documentation' },
        { section: 'Overall Satisfaction', questions: 2, avg_score: '4.3/5', comment: 'Referral likelihood' }
      ]
    },
    { id: 'ENC-2026-Q4-ALQUILER', name: 'Rental Experience Survey', target: 'Customers with vehicle return in last 60 days', created: '2026-10-01', response_rate: '41%', responses_received: 218, responses_target: 530, status: 'active', sections: [
        { section: 'Booking and Delivery', questions: 3, avg_score: '4.4/5', comment: 'Platform ease, check-in time' },
        { section: 'Vehicle Condition', questions: 3, avg_score: '4.2/5', comment: 'Cleanliness, maintenance, amenities' },
        { section: 'Support During Rental', questions: 3, avg_score: '3.9/5', comment: '24h availability, incident response' },
        { section: 'Return Process', questions: 3, avg_score: '4.1/5', comment: 'Clear inspection, damage resolution' },
        { section: 'Price vs Value', questions: 2, avg_score: '3.7/5', comment: 'Fair pricing, justified extras' },
        { section: 'Loyalty', questions: 1, avg_score: '4.0/5', comment: 'Will rent again' }
      ]
    },
    { id: 'ENC-2026-Q4-SUSCRIPCION', name: 'Subscription Program Survey', target: 'Customers with active subscription > 3 months', created: '2026-09-15', response_rate: '52%', responses_received: 89, responses_target: 171, status: 'active', sections: [
        { section: 'Vehicle Selection', questions: 3, avg_score: '4.3/5', comment: 'Variety, model updates' },
        { section: 'Vehicle Exchange Process', questions: 2, avg_score: '4.5/5', comment: 'Ease, delivery time' },
        { section: 'Included Maintenance', questions: 3, avg_score: '4.7/5', comment: 'Full coverage, no surprises' },
        { section: 'Technical Support', questions: 3, avg_score: '4.2/5', comment: 'Response times, repair quality' },
        { section: 'Contract Flexibility', questions: 2, avg_score: '4.0/5', comment: 'Plan changes, early termination' },
        { section: 'vs Ownership Comparison', questions: 2, avg_score: '4.4/5', comment: 'Cost vs benefits ratio' }
      ]
    },
    { id: 'ENC-2026-Q4-TALLER', name: 'Workshop Service Survey', target: 'Customers with service in last 90 days', created: '2026-09-20', response_rate: '47%', responses_received: 156, responses_target: 332, status: 'active', sections: [
        { section: 'Reception Service', questions: 2, avg_score: '4.3/5', comment: 'Friendliness, initial diagnosis' },
        { section: 'Price Transparency', questions: 3, avg_score: '3.9/5', comment: 'Clear quotes, change communication' },
        { section: 'Repair Quality', questions: 3, avg_score: '4.6/5', comment: 'Defects corrected, durability' },
        { section: 'Timeline Compliance', questions: 2, avg_score: '4.1/5', comment: 'On-time delivery, estimate respect' },
        { section: 'Courtesy Experience', questions: 2, avg_score: '4.4/5', comment: 'Loaner car, waiting area' },
        { section: 'Workshop Recommendation', questions: 1, avg_score: '4.2/5', comment: 'Would return, recommend' }
      ]
    }
  ];

  const KEY_METRICS = [
    { metric: 'Net Promoter Score (NPS) Sales', current: 48, benchmark: 50, trend: 'stagnant' },
    { metric: 'Customer Satisfaction (CSAT) Rental', current: 4.1, benchmark: 4.3, trend: 'declining', concern: 'Price vs value declining' },
    { metric: 'Customer Effort Score (CES) Subscription', current: 1.8, benchmark: 1.5, trend: 'improving' },
    { metric: 'Overall Brand Satisfaction', current: 4.2, benchmark: 4.4, trend: 'stable' }
  ];

  const ACTIONS_PENDING = [
    { action: 'Improve APR transparency in sales', priority: 'high', owner: 'Finance Manager', deadline: '2026-10-20' },
    { action: 'Train staff on rental returns', priority: 'medium', owner: 'Fleet Manager', deadline: '2026-10-31' },
    { action: 'Review fuel/damage charge policies', priority: 'high', owner: 'Operations Manager', deadline: '2026-10-15' },
    { action: 'Create 24h rental support protocol', priority: 'high', owner: 'Fleet Manager', deadline: '2026-10-10' }
  ];

  function activeSurveyCount() {
    return ACTIVE_SURVEYS.filter(s => s.status === 'active').length;
  }

  function avgResponseRate() {
    const rates = ACTIVE_SURVEYS.map(s => parseInt(s.response_rate));
    return (rates.reduce((a, b) => a + b, 0) / rates.length).toFixed(1);
  }

  function pendingActionCount() {
    return ACTIONS_PENDING.filter(a => a.priority === 'high').length;
  }

  agenticPackEn('autopista', {
    cuestionario: {
      nav: 'Customer Surveys',
      title: 'Customer Satisfaction Survey',
      icon: 'clipboard-check',
      page_title: 'Autopista Multimotor · Customer Feedback',
      summary: `${activeSurveyCount()} active surveys: Sales 34% response (127/375), Rental 41% (218/530), Subscription 52% (89/171), Workshop 47% (156/332). NPS Sales 48, CSAT Rental 4.1/5, CES Subscription 1.8. ${pendingActionCount()} high-priority actions: APR transparency, 24h rental support, fuel charge review, staff training.`,
      status: 'active',
      type: 'survey-feedback',
      active_surveys: ACTIVE_SURVEYS,
      key_metrics: KEY_METRICS,
      actions_pending: ACTIONS_PENDING,
      chart: {
        title: 'Customer satisfaction by business line',
        sub: '2026-10-07 · Autopista Multimotor',
        satisfaction_scores: [
          { line: 'Sales', responses: 127, avg_score: 4.3, response_rate: '34%', status: 'needs-attention' },
          { line: 'Rental', responses: 218, avg_score: 4.1, response_rate: '41%', status: 'declining' },
          { line: 'Subscription', responses: 89, avg_score: 4.4, response_rate: '52%', status: 'strong' },
          { line: 'Workshop', responses: 156, avg_score: 4.3, response_rate: '47%', status: 'on-track' }
        ],
        overall_avg: 4.25
      },
      event_kv: [
        ['NPS & CSAT', 'Sales NPS 48 (benchmark 50, stagnant) · Rental CSAT 4.1/5 (benchmark 4.3, declining) · Brand overall 4.2/5 (stable)'],
        ['High Priority', 'APR transparency (Finance, 20/10) · 24h rental support (Fleet, 10/10) · Fuel/damage policies (Ops, 15/10)'],
        ['Response Rates', 'Sales 34% (127 responses) · Rental 41% (218) · Subscription 52% (89, highest) · Workshop 47% (156)'],
        ['Trends', 'Rental price-value declining, Subscription improving (CES 1.8 vs benchmark 1.5), Sales APR transparency gap']
      ]
    }
  });
})();
