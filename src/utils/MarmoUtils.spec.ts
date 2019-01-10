import { Intent } from '../model/Intent';
import * as Utils from './MarmoUtils';
import { equal } from 'assert';
import { SignedIntent } from '../model/SignedIntent';
const Web3 = require('web3');
const web3 = new Web3();

describe('IntentBuilder Test', () => {

  it('Should be sign intent with message "0x29c41ba6f881cf3dc0703912f9525b03c874e7acd76332b3fa0936265cd6aa69"', async function() {

    let intent: Intent = new Intent();
    intent.setId("0x29c41ba6f881cf3dc0703912f9525b03c874e7acd76332b3fa0936265cd6aa69");

    const signedIntent: SignedIntent = await Utils.sign(intent, "512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a");

    equal(signedIntent.getSignatureData().getR(), '0xdffe81bea3c90f2b345fc4f3039af1a076527252b4b42efb4820c61dd690e63d')
    equal(signedIntent.getSignatureData().getS(), '0x383feb2dc675241fcb78a4c740370e08d149ff88866d976d06393deb28cff6df')
    equal(signedIntent.getSignatureData().getV(), '0x1c')

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
