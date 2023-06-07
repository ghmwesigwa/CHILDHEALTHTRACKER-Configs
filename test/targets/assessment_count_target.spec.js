import { expect } from 'chai';
import TestRunner from 'cht-conf-test-harness';
import { describe as _describe, before as _before, after as _after, it as _it } from 'mocha';
import { getAssessmentCountTarget } from '../formReportUtils';

const describe = _describe;
const before = _before;
const after = _after;
const it = _it;

const harness = new TestRunner();

// Test suite for the "Assessment Count Target"
describe('Assessment Count Target', () => {
  let initialCountTarget;

  // Set up tasks before running the tests
  before(async () => {
    await harness.start(); // Start the TestRunner
  });

  // Clean up tasks after running the tests
  after(async () => {
    await harness.stop(); // Stop the TestRunner
  });

  // Test case: should increase the assessment count target when an assessment form is submitted
  it('should increase the assessment count target when an assessment form is submitted', async () => {
    const existingDocumentId = 'assessment';
    // Get the current assessment count target
    initialCountTarget = await harness.getAssessmentCountTarget();

    // Submit an assessment form for a child
    const assessmentForm = {
      patient_id: existingDocumentId,
      patient_name: 'Jake Sully',
      fever: 'Yes',
      fever_duration: '3 days',
      danger_signs: ['Fast breathing', 'Yellow eyes'],
      immunization_up_to_date: 'Yes',
      hiv_contact: 'No',
      tb_contact: 'No'
    };
    const result = await harness.fillForm('assessment', assessmentForm); // Fill and submit the form

    // Verify that the form successfully got submitted
    expect(result.errors).to.be.empty;

    // Get the updated assessment count target
    const updatedCountTarget = await harness.getAssessmentCountTarget();

    // Check that the count increased by 1
    expect(updatedCountTarget).to.equal(initialCountTarget + 1);
  });
});
