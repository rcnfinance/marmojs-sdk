import { Intent } from '../model/Intent';
import * as Utils from './MarmoUtils';
import { equal } from 'assert';
import { SignedIntent } from '../model/SignedIntent';
import { ERC20 } from '../model/data/ERC20';
import { IntentAction } from '../model/IntentAction';
import { IntentBuilder } from '../builder/IntentBuilder';

const Web3 = require('web3');
const web3 = new Web3();

describe('IntentBuilder Test', () => {

  it('Should be sign intent with message', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.transfer(to, 1);
    const credentials = web3.eth.accounts.privateKeyToAccount('0x512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

    console.log(credentials)
    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withIntentAction(intentAction)
        .withExpiration(15)

    let intent: Intent = intentBuilder.build();

    const signedIntent: SignedIntent = Utils.sign(intent, "512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a");

    equal(signedIntent.getSignatureData().getR(), '0xd60732999a72618e22cc3a282dc214a6fa9ad661fa032d4d7b9cb1f2aa5db9b0')
    equal(signedIntent.getSignatureData().getS(), '0x1d6550804e66ae1cfd947ff9f72e413ea274e4a87b7240d36bf9ba1dbea7e873')
    equal(signedIntent.getSignatureData().getV(), '27')

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
