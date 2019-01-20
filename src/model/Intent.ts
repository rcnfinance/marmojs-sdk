import { Wallet } from "src/model/Wallet";
import { IntentAction } from "src/model/IntentAction";

var Web3 = require('web3');

export class Intent {
    public dependencies: string[];
    public action: IntentAction;
    public salt: string;
    public maxGasPrice: number;
    public minGasLimit: number;
    public expiration: number;

    constructor(
        dependencies: string[],
        action: IntentAction,
        salt: string,
        maxGasPrice: number,
        minGasLimit: number,
        expiration: number
    ) {
        this.dependencies = dependencies;
        this.action = action;
        this.salt = salt;
        this.maxGasPrice = maxGasPrice;
        this.minGasLimit = minGasLimit;
        this.expiration = expiration;
    }

    public id(wallet: Wallet): string {
        const depsHash = Web3.utils.soliditySha3({ t: 'bytes32[]', v: this.dependencies });
        const dataHash = Web3.utils.soliditySha3({ t: 'bytes', v: this.action.data });
        return Web3.utils.soliditySha3(
            { t: 'address', v: wallet.address },
            { t: 'bytes32', v: depsHash },
            { t: 'address', v: this.action.to },
            { t: 'uint256', v: this.action.value },
            { t: 'bytes32', v: dataHash },
            { t: 'uint256', v: this.minGasLimit },
            { t: 'uint256', v: this.maxGasPrice },
            { t: 'bytes32', v: this.salt },
            { t: 'uint256', v: this.expiration }
        );
    }
}