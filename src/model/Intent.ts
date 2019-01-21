import { Wallet } from "src/model/Wallet";
import { IntentAction } from "src/model/IntentAction";
import BigNumber = require("bn.js");

var Web3 = require('web3');

export class Intent {
    public dependencies: string[];
    public action: IntentAction;
    public salt: string;
    public maxGasPrice: BigNumber;
    public minGasLimit: BigNumber;
    public expiration: BigNumber;

    constructor(
        dependencies: string[],
        action: IntentAction,
        salt: string,
        maxGasPrice: BigNumber,
        minGasLimit: BigNumber,
        expiration: BigNumber
    ) {
        this.dependencies = dependencies;
        this.action = action;
        this.salt = salt;
        this.maxGasPrice = maxGasPrice;
        this.minGasLimit = minGasLimit;
        this.expiration = expiration;
    }

    public id(wallet: Wallet): string {
        const emptyHash = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
        let dataHash;
        let depsHash;

        if (this.action.data.replace("0x","") == "") {
            dataHash = emptyHash;
        } else {
            dataHash = Web3.utils.soliditySha3({ t: 'bytes', v: this.action.data });
        }

        if (this.dependencies.length == 0) {
            depsHash = emptyHash;
        } else {
            depsHash = Web3.utils.soliditySha3({ t: 'bytes32[]', v: this.dependencies });
        }

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