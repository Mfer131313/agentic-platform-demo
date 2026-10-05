agenticPack('autopista', {
  cuestionario_en: {
    title: 'Customer Satisfaction Survey',
    subtitle: 'Service Quality and Purchase Experience',
    type: 'survey-feedback',
    active_surveys: [
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
    ],
    key_metrics: [
      { metric: 'Net Promoter Score (NPS) Sales', current: 48, benchmark: 50, trend: 'stagnant' },
      { metric: 'Customer Satisfaction (CSAT) Rental', current: 4.1, benchmark: 4.3, trend: 'declining', concern: 'Price vs value declining' },
      { metric: 'Customer Effort Score (CES) Subscription', current: 1.8, benchmark: 1.5, trend: 'improving' },
      { metric: 'Overall Brand Satisfaction', current: 4.2, benchmark: 4.4, trend: 'stable' }
    ],
    actions_pending: [
      { action: 'Improve APR transparency in sales', priority: 'high', owner: 'Finance Manager', deadline: '2026-10-20' },
      { action: 'Train staff on rental returns', priority: 'medium', owner: 'Fleet Manager', deadline: '2026-10-31' },
      { action: 'Review fuel/damage charge policies', priority: 'high', owner: 'Operations Manager', deadline: '2026-10-15' },
      { action: 'Create 24h rental support protocol', priority: 'high', owner: 'Fleet Manager', deadline: '2026-10-10' }
    ]
  }
});
