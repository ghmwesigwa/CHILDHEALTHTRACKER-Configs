/// Import necessary functions from targets-extras.js
const { getField } = require('./nools-extras.js');

module.exports = [
  {
    name: 'referral-follow-up',
    title: 'Referral Follow-Up',
    icon: 'icon-follow-up',
    appliesTo: 'reports',
    appliesToType: ['assessed_child'],
    appliesIf: (contact, report) => {
      const hasFever = getField(report, 'fever') === 'yes';
      const hasDangerSigns = getField(report, 'danger_signs') === 'yes';
      return hasFever && (hasDangerSigns === 'yes' || hasDangerSigns === 'true');
    },
    resolvedIf: (contact, report) => {
      if (!contact.reports) {
        return false;
      }

      const referralFollowUpReport = contact.reports.find(reportDoc => {
        if (reportDoc.form !== 'referral_follow_up') {
          return false;
        }
        const referralReportId = getField(report, 'referral_report_id');
        return getField(reportDoc, 'referral_report_id') === referralReportId;
      });

      return !!referralFollowUpReport;
    },
    actions: [
      {
        type: 'report',
        form: 'referral_follow_up',
        modifyContent: (content, contact, report) => {
          content.referral_report_id = getField(report, 'referral_report_id');
        }
      }
    ],
    events: [
      {
        id: 'referral-follow-up-event',
        start: 0,
        end: 2,
        days: 1
      }
    ],
    /**dueDateOffset: 3,
    reminderOffset: -1,
    resolveOffset: 2*/
  }
];
