import { IntentBuilder } from './IntentBuilder';
import { IntentAction } from '../model/IntentAction';
import { Intent } from '../model/Intent';
import { equal, throws } from 'assert';
import { ERC20 } from '../model/data/ERC20';

const Web3 = require('web3');
const web3 = new Web3();

describe('IntentBuilder Test', () => {

  it('Should be create intent with id 0x7935c8f49cb284e1c5c8dd95b3fc6c9cad6519a17555a5f2e43f9aaa31d25a37', () => {

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
    equal(intent.getId(), "0x7935c8f49cb284e1c5c8dd95b3fc6c9cad6519a17555a5f2e43f9aaa31d25a37");

  });

  it('Should be create intent with id 0x0dd96a883c69dca2fef7de903ed543b2751919592a799902aa84ce7ed6a23479', () => {

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
    equal(intent.getId(), "0x0dd96a883c69dca2fef7de903ed543b2751919592a799902aa84ce7ed6a23479");

  });

  it('Should be create intent with id 0x5de183da65683636ad564c80559c6cf68d5c738239f15da75e5a020d039cf7fb', () => {

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

    equal(intent.getId(), "0x5de183da65683636ad564c80559c6cf68d5c738239f15da75e5a020d039cf7fb");

  });

  it('Should be create intent with id 0x0d42d9890e1c0cca4d56ec5b532e6f7f1597f5cda57a0c1726f0eb25d2bc4a26', () => {

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

    equal(intent.getId(), "0x0d42d9890e1c0cca4d56ec5b532e6f7f1597f5cda57a0c1726f0eb25d2bc4a26");

  });

  it('Should be create intent with id 0x40b7b0871f7b3e25020766c21545be0ef33349a949b6f4b9548387d4d539a110', () => {

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

    equal(intent.getId(), "0x40b7b0871f7b3e25020766c21545be0ef33349a949b6f4b9548387d4d539a110");

  });

  it('Should be create intent with id 0x63bfa4961085e360ff2507256aae202ef05fe1883475eb21456796b81f5a0e58', () => {

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

    equal(intent.getId(), "0x63bfa4961085e360ff2507256aae202ef05fe1883475eb21456796b81f5a0e58");

  });

  it('Should be create intent with id 0x6e78ee9f136303375275ad50c6f0823f5863a148d351552409685a8b491d3a98', () => {

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

    equal(intent.getId(), "0x6e78ee9f136303375275ad50c6f0823f5863a148d351552409685a8b491d3a98");

  });

  it('Should be create intent with id 0xd4f72692dc24aab3c71fe00dbfd47c40ae80b4c9324aa0b2fc231ea85c917ca5', () => {

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
        .withExpiration(12)
        .withSalt(2)

    let intent: Intent = intentBuilder.build();

    equal(intent.getId(), "0xd4f72692dc24aab3c71fe00dbfd47c40ae80b4c9324aa0b2fc231ea85c917ca5");

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

    throws(() => intentBuilder.build());

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

    throws(() => intentBuilder.build());

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

    throws(() => intentBuilder.build());

  });

});
