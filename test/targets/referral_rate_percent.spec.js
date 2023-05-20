import { expect } from 'chai';
import TestRunner from 'cht-conf-test-harness';
import harnessDefaults from './harness.defaults.json';
import { describe as _describe, before as _before, after as _after, it as _it } from 'mocha';
import { getReferralRate } from '../formReportUtils';

const describe = _describe;
const before = _before;
const after = _after;
const it = _it;

const harness = new TestRunner();

describe('Referral Rate Target', () => {
  let initialReferralRate;

  before(async () => {
    await harness.start();
  });

  after(async () => {
    await harness.stop();
  });

  it('should increase the referral rate percent when children are referred', async () => {
    // Mock: Submit an assessment form for a child with fever and danger signs
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

    // Get the initial referral rate percent
    initialReferralRate = await getReferralRate(harness);

    // Generate a referral follow-up task for the child
    const followUpForm = {
      went_to_health_facility: 'Yes',
      getting_better: 'No'
    };
    await harness.submitForm('referral_follow_up', followUpForm);

    // Get the updated referral rate percent
    const updatedReferralRate = await getReferralRate(harness);

    // Check that the referral rate percent has increased
    expect(updatedReferralRate).to.be.greaterThan(initialReferralRate);
  });
});
