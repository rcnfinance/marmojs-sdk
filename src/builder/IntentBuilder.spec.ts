import { IntentBuilder } from './IntentBuilder';
import { IntentAction } from '../model/IntentAction';
import { Intent } from '../model/Intent';
import { equal, throws } from 'assert';
import { ERC20 } from '../model/data/ERC20';

const Web3 = require('web3');
const web3 = new Web3();

describe('IntentBuilder Test', () => {

  it('Should be create intent with id 0x4a9a0a77dae4745c3a6835d7cf03b8e798257bf36d7c2d65eee78e5e12d51c4b', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.transfer(to, 1);
    const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withIntentAction(intentAction)
        .withExpiration(15)

    let intent: Intent = intentBuilder.build();
    equal(intent.getId(), "0x4a9a0a77dae4745c3a6835d7cf03b8e798257bf36d7c2d65eee78e5e12d51c4b");

  });

  it('Should be create intent with id 0x1dde889e52bece403ce9373d1d72ebb7b4498bc557e3e6094d20b5a94773f914', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.balanceOf(to);
    const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withIntentAction(intentAction)
        .withExpiration(15)

    let intent: Intent = intentBuilder.build();
    equal(intent.getId(), "0x1dde889e52bece403ce9373d1d72ebb7b4498bc557e3e6094d20b5a94773f914");

  });

  it('Should be create intent with id 0xb0bb310d10b91b65972623c86818c9afa355ac85de81accc3f2df6cdd230e959', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.balanceOf(to);
    const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e'])
        .withIntentAction(intentAction)
        .withExpiration(15)

    let intent: Intent = intentBuilder.build();

    equal(intent.getId(), "0xb0bb310d10b91b65972623c86818c9afa355ac85de81accc3f2df6cdd230e959");

  });

  it('Should be create intent with id 0x5e4696d4076aa4b28cf2a1829eb27dc824d5122da17e77f83d2cc4a900d4c27a', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.balanceOf(to);
    const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', '0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928'])
        .withIntentAction(intentAction)
        .withExpiration(15)

    let intent: Intent = intentBuilder.build();

    equal(intent.getId(), "0x5e4696d4076aa4b28cf2a1829eb27dc824d5122da17e77f83d2cc4a900d4c27a");

  });

  it('Should be create intent with id 0x794b0ec9938123c6d114ad9cb0c3aa118a5ea625c9af924196b4aad2c5ae6eb3', () => {

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
        .withExpiration(15)

    let intent: Intent = intentBuilder.build();

    equal(intent.getId(), "0x794b0ec9938123c6d114ad9cb0c3aa118a5ea625c9af924196b4aad2c5ae6eb3");

  });

  it('Should be create intent with id 0xd3de2cd576884da1529544d4788c3e17ce3fe1a485e8f109e716e756de7fa6c7', () => {

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
        .withExpiration(15)
        .withSalt(1)

    let intent: Intent = intentBuilder.build();

    equal(intent.getId(), "0xd3de2cd576884da1529544d4788c3e17ce3fe1a485e8f109e716e756de7fa6c7");

  });

  it('Should be create intent with id 0xa0cbe364ecacbf8411aa37ece7202fe473c3d92fc1bb537f5383d0ccf6eab849', () => {

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
        .withExpiration(15)
        .withSalt(2)

    let intent: Intent = intentBuilder.build();

    equal(intent.getId(), "0xa0cbe364ecacbf8411aa37ece7202fe473c3d92fc1bb537f5383d0ccf6eab849");

  });

  it('Should be create intent with id 0xd74a9a8a13b5baada79a0a02ece3adcd25a2349ea191c6f283c09f0579721f09', () => {

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
        .withExpiration(12)
        .withSalt(2)

    let intent: Intent = intentBuilder.build();

    equal(intent.getId(), "0xd74a9a8a13b5baada79a0a02ece3adcd25a2349ea191c6f283c09f0579721f09");

  });

  it('Should be fail because does not have signer', () => {

    let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; // RCN Token
    let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

    let erc20: ERC20 = new ERC20(tokenContractAddress);
    let intentAction: IntentAction = erc20.balanceOf(to);

    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', '0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928'])
        .withIntentAction(intentAction)
        .withMinGasLimit(300000)
        .withMaxGasLimit(999999)
        .withSalt(2)

    throws(() => intentBuilder.build());

  });

  it('Should be fail because does not have intentAction', () => {

    const credentials = web3.eth.accounts.privateKeyToAccount('512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a');

    let intentBuilder: IntentBuilder = new IntentBuilder();
    intentBuilder.withSigner(credentials.address)
        .withDependencies(['0xee2e1b62b008e27a5a3d66352f87e760ed85e723b6834e622f38b626090f536e', '0x6b67aac6eda8798297b1591da36a215bfbe1fed666c4676faf5a214d54e9e928'])
        .withMinGasLimit(300000)
        .withMaxGasLimit(999999)
        .withSalt(2);

    throws(() => intentBuilder.build());

  });

});
