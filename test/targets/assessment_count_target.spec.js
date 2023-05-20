import { expect } from 'chai';
import TestRunner from 'cht-conf-test-harness';
const harnessDefaults = './harness.defaults.json';
import { describe as _describe, before as _before, after as _after, it as _it } from 'mocha';
import { getAssessmentCountTarget } from'../formReportUtils';

const describe = _describe;
const before = _before;
const after = _after;
const it = _it;
harness = new TestRunner();

const harness = new TestRunner();

describe('Assessment Count Target', () => {
  let initialCountTarget;

  before(async () => {
    await harness.start();
  });

  after(async () => {
    await harness.stop();
  });

  it('should increase the assessment count target when an assessment form is submitted', async () => {
    // Get the current assessment count target
    initialCountTarget = await harness.getAssessmentCountTarget();

    // Submit an assessment form for a child
    const assessmentForm = {
      patient_name: 'Jake Sully',
      fever: 'Yes',
      fever_duration: '3 days',
      danger_signs: ['Fast breathing', 'Yellow eyes'],
      immunization_up_to_date: 'Yes',
      hiv_contact: 'No',
      tb_contact: 'No'
    };
    await harness.submitForm('assessment', assessmentForm);

    // Get the updated assessment count target
    const updatedCountTarget = await harness.getAssessmentCountTarget();

    // Check that the count increased by 1
    expect(updatedCountTarget).to.equal(initialCountTarget + 1);
  });
});
