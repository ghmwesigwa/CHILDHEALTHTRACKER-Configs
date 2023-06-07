// Import the TestRunner class
import TestRunner from 'cht-conf-test-harness';

// Create an instance of the TestRunner class
const harness = new TestRunner();

// Check if a report represents an assessment
export const isAssessment = (report) => report.form === 'assessment';

// Check if a report represents a referral
export const isReferral = (report) => report.form === 'referral_follow_up';

// Get the assessment count target using the TestRunner instance
export const getAssessmentCountTarget = (reports) => {
  // Filter assessment reports
  const assessmentReports = reports.filter(isAssessment);

  // Get the count of assessment reports
  const assessmentCount = assessmentReports.length;

  return assessmentCount;
};

// Get the referral rate
export const getReferralRate = (reports) => {
  // Filter referral reports
  const referralReports = reports.filter(isReferral);

  // Get the count of referral reports
  const referralCount = referralReports.length;

  // Get the count of assessment reports
  const assessmentCount = reports.filter(isAssessment).length;

  // Calculate the referral rate
  const referralRate = (referralCount / assessmentCount) * 100;

  return referralRate;
};
