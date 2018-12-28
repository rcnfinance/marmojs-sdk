import { IntentBuilder } from './IntentBuilder';
import { IntentAction } from '../model/IntentAction';
import { Intent } from '../model/Intent';
import assert = require('assert');
import { ERC20 } from '../model/data/ERC20';

const Web3 = require('web3');
const web3 = new Web3();

describe('IntentBuilder Test', () => {

  it('Should be create intent with id 0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.transfer(to, 1);
    const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

    let contractAddress: string = "0xDc3914BEd4Fc2E387d0388B2E3868e671c143944";
    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withWallet(contractAddress)
        .withIntentAction(intentAction)

    let intent: Intent = intentBuilder.build();
    assert.equal(intent.getId(), "0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928");

  });

  it('Should be create intent with id 0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.balanceOf(to);
    const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

    let contractAddress: string = "0xbbf289d846208c16edc8474705c748aff07732db";
    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withWallet(contractAddress)
        .withIntentAction(intentAction)

    let intent: Intent = intentBuilder.build();
    assert.equal(intent.getId(), "0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e");

  });

  it('Should be create intent with id 0x19ca8e36872eaf21cd75c9319cfd08769b61fcb7c8ab119d71960c27585595af', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.balanceOf(to);
    const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

    let contractAddress: string = "0xbbf289d846208c16edc8474705c748aff07732db";
    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e'])
        .withWallet(contractAddress)
        .withIntentAction(intentAction)

    let intent: Intent = intentBuilder.build();

    assert.equal(intent.getId(), "0x19ca8e36872eaf21cd75c9319cfd08769b61fcb7c8ab119d71960c27585595af");

  });

  it('Should be create intent with id 0xab4b18a2b163ac552a6d2eac23529e4d5e25ff54c41831b75e8c169a03f39a20', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.balanceOf(to);
    const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

    let contractAddress: string = "0xbbf289d846208c16edc8474705c748aff07732db";
    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', '0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928'])
        .withWallet(contractAddress)
        .withIntentAction(intentAction)

    let intent: Intent = intentBuilder.build();

    assert.equal(intent.getId(), "0xab4b18a2b163ac552a6d2eac23529e4d5e25ff54c41831b75e8c169a03f39a20");

  });

  it('Should be create intent with id 0x9ef832fe6023c21990339fe87724fe5a19fdb4697ce32769c238eb6ab9b92b2c', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.balanceOf(to);
    const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

    let contractAddress: string = "0xbbf289d846208c16edc8474705c748aff07732db";
    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', '0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928'])
        .withWallet(contractAddress)
        .withIntentAction(intentAction)
        .withMinGasLimit(300000)
        .withMaxGasLimit(999999)

    let intent: Intent = intentBuilder.build();

    assert.equal(intent.getId(), "0x9ef832fe6023c21990339fe87724fe5a19fdb4697ce32769c238eb6ab9b92b2c");

  });

  it('Should be create intent with id 0xfc1e9fd25abd26a1be78817f0675a5051285af23957ca0322f2925d93f291ec5', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.balanceOf(to);
    const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

    let contractAddress: string = "0xbbf289d846208c16edc8474705c748aff07732db";
    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', '0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928'])
        .withWallet(contractAddress)
        .withIntentAction(intentAction)
        .withMinGasLimit(300000)
        .withMaxGasLimit(999999)
        .withSalt(1)

    let intent: Intent = intentBuilder.build();

    assert.equal(intent.getId(), "0xfc1e9fd25abd26a1be78817f0675a5051285af23957ca0322f2925d93f291ec5");

  });

  it('Should be create intent with id 0xacd5d801cecc1790b95c5395e4f48a40d964ae0c6b70051b3c907060e67da079', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.balanceOf(to);
    const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

    let contractAddress: string = "0xbbf289d846208c16edc8474705c748aff07732db";
    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', '0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928'])
        .withWallet(contractAddress)
        .withIntentAction(intentAction)
        .withMinGasLimit(300000)
        .withMaxGasLimit(999999)
        .withSalt(2)

    let intent: Intent = intentBuilder.build();

    assert.equal(intent.getId(), "0xacd5d801cecc1790b95c5395e4f48a40d964ae0c6b70051b3c907060e67da079");

  });

  it('Should be fail because does not have signer', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.balanceOf(to);

    let contractAddress: string = "0xbbf289d846208c16edc8474705c748aff07732db";
    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', '0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928'])
        .withWallet(contractAddress)
        .withIntentAction(intentAction)
        .withMinGasLimit(300000)
        .withMaxGasLimit(999999)
        .withSalt(2)

    assert.throws(() => intentBuilder.build());

  });

  it('Should be fail because does not have wallet', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.balanceOf(to);
    const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', '0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928'])
        .withIntentAction(intentAction)
        .withMinGasLimit(300000)
        .withMaxGasLimit(999999)
        .withSalt(2);

    assert.throws(() => intentBuilder.build());

  });

  it('Should be fail because does not have intentAction', () => {

    const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');
    let contractAddress: string = "0xbbf289d846208c16edc8474705c748aff07732db";

    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', '0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928'])
        .withWallet(contractAddress)
        .withMinGasLimit(300000)
        .withMaxGasLimit(999999)
        .withSalt(2);

    assert.throws(() => intentBuilder.build());

  });

});
