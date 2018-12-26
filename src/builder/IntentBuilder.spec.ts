import { IntentBuilder } from './IntentBuilder';
import { IntentAction } from '../model/IntentAction';
import { Intent } from '../model/Intent';
import assert = require('assert');

const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/df26f7df62b843c0a2b4e1f10e5d5b83"));

describe('IntentBuilder Test', () => {
  
  it('Should be create intent with id 0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; //RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let intentAction: IntentAction = new IntentAction();
    intentAction.setData(web3.utils.hexToBytes("0xa9059cbb0000000000000000000000007f5eb5bb5cf88cfcee9613368636f458800e62cb0000000000000000000000000000000000000000000000000000000000000001"));
    intentAction.setTo(tokenContractAddress)
    intentAction.setValue(0);

    var credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');
    
    let contractAddress: string = "0xDc3914BEd4Fc2E387d0388B2E3868e671c143944";
    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withWallet(contractAddress)
        .withIntentAction(intentAction)

    let intent: Intent = intentBuilder.build();

    assert.equal(web3.utils.bytesToHex(intent.getId()), "0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928");

  });

});
