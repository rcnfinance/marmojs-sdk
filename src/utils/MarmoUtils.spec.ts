import { Intent } from '../model/Intent';
import * as Utils from '../utils/MamorUtils';
import assert = require('assert');
import { SignedIntent } from '../model/SignedIntent';

describe('IntentBuilder Test', () => {

  it('Should be sign intent with message "A test message"', () => {

    let intent: Intent = new Intent();
    intent.setId("A test message");

    const signedIntent: SignedIntent = Utils.sign(intent, "512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a");

    assert.equal(signedIntent.getSignatureData().getR(), '0xfa00ea6660b4f8bdf687624f77985275f7ff291ffc13d8f8b8f15431c8db0586')
    assert.equal(signedIntent.getSignatureData().getS(), '0x28a7ad4e685dca52e02a22c8fed647c3e6c75fe83d2bb736ad756a15ad5ea7db')
    assert.equal(signedIntent.getSignatureData().getV(), '0x1b')

  });

});
