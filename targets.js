module.exports = [
  // Count target: Assessments
  {
    id: 'assessments',
    type: 'count',
    goal: -1,
    translation_key: 'Assessments',
    appliesTo: 'reports',
    appliesIf: function (contact, report) {
      return report.form === 'assessment';
    },
  },
  
  // Percent target: Referral rate
  {
    id: 'referral-rate',
    type: 'percent',
    translation_key: 'Referral rate',
    appliesTo: 'contacts',
    appliesToType: ['vht'],
    passesIf: function (contact) {
      // Get the count of reports where form is 'referral_follow_up'
      const referredCount = contact.reports.reduce((count, report) => {
        if (report.form === 'referral_follow_up') {
          count++;
        }
        return count;
      }, 0);

      // Get the count of reports where form is 'assessment'
      const assessedCount = contact.reports.reduce((count, report) => {
        if (report.form === 'assessment') {
          count++;
        }
        return count;
      }, 0);

      // Calculate the referral rate as a percentage
      const referralRate = (referredCount / assessedCount) * 100;

      // Define the threshold for the referral rate
      const threshold = 10;

      // Return true if the referral rate is above the threshold, false otherwise
      return referralRate > threshold;
    },
    goal: 80,
  },
];
