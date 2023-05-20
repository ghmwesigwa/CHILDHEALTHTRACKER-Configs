import { expect } from 'chai';
import TestRunner from 'cht-conf-test-harness';
const harnessDefaults = './harness.defaults.json';
import { describe as _describe, before as _before, after as _after, it as _it } from 'mocha';

const describe = _describe;
const before = _before;
const after = _after;
const it = _it;
harness = new TestRunner();

describe('Referral Follow-up Task', () => {
  let harness;

  before(async () => {

    return await harness.start();
  });

  after(async () => {
    // Tear down the test harness after all tests are completed
    await harness.stop();
  });

  it('should generate and resolve a referral follow-up task for a child assessed with fever and danger signs', async function() {
    // Submit the assessment form for a child with fever and danger signs
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

    // Check if a referral follow-up task is generated
    const tasks = await harness.getTasks();
    const referralFollowUpTask = tasks.find(task => task.form === 'referral_follow_up');
    expect(referralFollowUpTask).to.exist;

    // Submit the referral follow-up form for the assessment
    const followUpForm = {
      went_to_health_facility: 'Yes',
      getting_better: 'No'
    };
    await harness.submitForm('referral_follow_up', followUpForm);

    // Check if the referral follow-up task is resolved
    const resolvedTasks = await harness.getTasks({ resolved: true });
    const resolvedReferralFollowUpTask = resolvedTasks.find(task => task.form === 'referral_follow_up');
    expect(resolvedReferralFollowUpTask).to.exist;
  });
});
