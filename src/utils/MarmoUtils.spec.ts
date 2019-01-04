import { Intent } from '../model/Intent';
import * as Utils from './MarmoUtils';
import { equal } from 'assert';
import { SignedIntent } from '../model/SignedIntent';

describe('IntentBuilder Test', () => {

  it('Should be sign intent with message "A test message"', () => {

    let intent: Intent = new Intent();
    intent.setId("A test message");

    const signedIntent: SignedIntent = Utils.sign(intent, "512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a");

    equal(signedIntent.getSignatureData().getR(), '0xfa00ea6660b4f8bdf687624f77985275f7ff291ffc13d8f8b8f15431c8db0586')
    equal(signedIntent.getSignatureData().getS(), '0x28a7ad4e685dca52e02a22c8fed647c3e6c75fe83d2bb736ad756a15ad5ea7db')
    equal(signedIntent.getSignatureData().getV(), '0x1b')

  });

  it('Should be create address "0x8bdd988a19f5c9fb82bd98797ac78c1f48bd5af8"', () => {

    let result: string = Utils.generateAddress('0x9d7713f5048c270d7c1dBe65F44644F4eA47f774');
    equal(result, '0x8bdd988a19f5c9fb82bd98797ac78c1f48bd5af8');

  });

  it('Should be create address "0x095b8e85656540e5382b6bcbd3a7775a2abed760"', () => {

    let result: string = Utils.generateAddress('0x6684C2F982758685780b8d488c32fAfA4d008A53');
    equal(result, '0x095b8e85656540e5382b6bcbd3a7775a2abed760');

  });

  it('Should be create address "0xb03482487c33469ffac18550483a848b2a0f23b1"', () => {

    let result: string = Utils.generateAddress('0x0000000000000000000000000000000000000000');
    equal(result, '0xb03482487c33469ffac18550483a848b2a0f23b1');

  });

  it('Should be create address "0x6470a2b21207f7b78dfa933f67ee2c7d3a4be3bc"', () => {

    let result: string = Utils.generateAddress('0x737f3Fb60533Ce0C51B4100139AD94418F7d8775');
    equal(result, '0x6470a2b21207f7b78dfa933f67ee2c7d3a4be3bc');

  });

  it('Should be create address "0x9c71fafcac5529c3aa9aeace418a47b8dee8aabc"', () => {

    let result: string = Utils.generateAddress('0xfeeCF219dDE537abf28E097b08657e096B24738E');
    equal(result, '0x9c71fafcac5529c3aa9aeace418a47b8dee8aabc');

  });

});
