import { Wallet } from "src/model/Wallet";
import { IntentAction } from "src/model/IntentAction";
import BigNumber = require("bn.js");
import { SignedIntent } from "./SignedIntent";
import { Config } from "src/Config";

const Web3 = require('web3');

export class IntentDependency {
    address: string;
    id: string;

    constructor(
        address: string,
        id: string
    ) {
        this.address = address;
        this.id = id;
    }
}

export class Intent {
    dependencies: IntentDependency[];
    action: IntentAction;
    salt: string;
    maxGasPrice: BigNumber;
    minGasLimit: BigNumber;
    expiration: BigNumber;

    constructor(
        dependencies: Array<IntentDependency | SignedIntent>,
        action: IntentAction,
        salt: string,
        maxGasPrice: BigNumber,
        minGasLimit: BigNumber,
        expiration: BigNumber
    ) {
        this.dependencies = [];
        this.action = action;
        this.salt = salt;
        this.maxGasPrice = maxGasPrice;
        this.minGasLimit = minGasLimit;
        this.expiration = expiration;

        dependencies.forEach(d => this.add_dependency(d));
    }

    add_dependency(dependency: IntentDependency | SignedIntent) {
        if (dependency instanceof IntentDependency) {
            this.dependencies.push(dependency);
        } else {
            this.dependencies.push(new IntentDependency(
                dependency.wallet.address,
                dependency.id
            ));
        }
    }

    id(wallet: Wallet): string {
        const emptyHash = '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470';
        let dataHash;
        let depsHash;

        if (this.action.data.replace("0x", "") === "") {
            dataHash = emptyHash;
        } else {
            dataHash = Web3.utils.soliditySha3({ t: 'bytes', v: this.action.data });
        }

        if (this.dependencies.length === 0) {
            depsHash = emptyHash;
        } else {
            depsHash = Web3.utils.soliditySha3({ t: 'bytes', v: this.build_dependency_call(wallet.config) });
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

    build_dependency_call(config: Config): string {
        const depsCount = this.dependencies.length

        if (depsCount == 0) {
            // No dependencies
            return "0x";
        } else if (depsCount == 1) {
            // Single dependency, call wallet directly
            const call = Web3.eth.abi.encodeFunctionCall({
                name: 'relayedAt',
                type: 'function',
                inputs: [{
                    type: 'bytes32',
                    name: '_id'
                }]
            }, [this.dependencies[0].id]);

            return "0x" + this.dependencies[0].address.replace('0x', '') + call.replace('0x', '');
        } else {
            // Multiple dependencies, using DepsUtils contract
            const call = Web3.eth.abi.encodeFunctionCall({
                name: 'multipleDeps',
                type: 'function',
                inputs: [{
                    type: 'address[]',
                    name: '_wallets'
                },{
                    type: 'bytes32[]',
                    name: '_ids'
                }]
            }, [
                this.dependencies.map(d => d.address),
                this.dependencies.map(d => d.id)
            ]);

            return "0x" + config.depsUtils.replace('0x', '') + call.replace('0x', '');
        }
    }
}
