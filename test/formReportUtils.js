// check if a report represents an assessment
export function isAssessment(report) {
    return report.form === 'assessment';
  }

  // check if a report represents a referral
  export function isReferral(report) {
    return report.form === 'referral_follow_up';
  }

  // Get the assessment count target
  export function getAssessmentCountTarget(reports) {
    // Filter assessment reports
    const assessmentReports = reports.filter(isAssessment);

    // Get the count of assessment reports
    const assessmentCount = assessmentReports.length;

    return assessmentCount;
  }

  // Get the referral rate
  export function getReferralRate(reports) {
    // Filter referral reports
    const referralReports = reports.filter(isReferral);

    // Get the count of referral reports
    const referralCount = referralReports.length;

    // Get the count of assessment reports
    const assessmentCount = reports.filter(isAssessment).length;

    // Calculate the referral rate
    const referralRate = (referralCount / assessmentCount) * 100;

    return referralRate;
  }
