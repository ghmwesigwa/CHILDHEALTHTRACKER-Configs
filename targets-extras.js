// check if a report represents an assessment
function isAssessment(c, r) {
    return r.form === 'assessment';
}

// check if a report represents a referral
function isReferral(c, r) {
    return r.form === 'referral_follow_up';
}

// count the number of reports of a specific form submitted within a date range
function countReportsSubmittedInWindow(reports, form, start, end) {
    let count = 0;
    for (const report of reports) {
        if (form.indexOf(report.form) !== -1) {
            if ((!start || report.reported_date >= start) && (!end || report.reported_date <= end)) {
                count++;
            }
        }
    }
    return count;
}

module.exports = {
    isAssessment,
    isReferral,
    countReportsSubmittedInWindow

};