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
    maxGasLimit: BigNumber;
    expiration: BigNumber;

    constructor(
        dependencies: Array<IntentDependency | SignedIntent>,
        action: IntentAction,
        salt: string,
        maxGasPrice: BigNumber,
        maxGasLimit: BigNumber,
        expiration: BigNumber
    ) {
        this.dependencies = [];
        this.action = action;
        this.salt = salt;
        this.maxGasPrice = maxGasPrice;
        this.maxGasLimit = maxGasLimit;
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
        return Web3.utils.soliditySha3(
            { t: 'address', v: wallet.address },
            { t: 'address', v: wallet.config.implementation },
            {
                t: 'bytes32',
                v: Web3.utils.soliditySha3({
                    t: 'bytes',
                    v: this.build_implementation_call(wallet.config)
                })
            }
        );
    }

    build_implementation_call(config: Config): string {
        return new Web3().eth.abi.encodeParameters(
            [
                "bytes",
                "address",
                "uint256",
                "bytes",
                "uint256",
                "uint256",
                "uint256",
                "bytes32"
            ],
            [
                this.build_dependency_call(config),
                this.action.to,
                this.action.value.toString(),
                this.action.data,
                this.maxGasLimit.toString(),
                this.maxGasPrice.toString(),
                this.expiration.toString(),
                this.salt
            ]
        )
    }

    build_dependency_call(config: Config): string {
        const depsCount = this.dependencies.length

        if (depsCount == 0) {
            // No dependencies
            return "0x";
        } else if (depsCount == 1) {
            // Single dependency, call wallet directly
            const call = new Web3().eth.abi.encodeFunctionCall({
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
            const call = new Web3().eth.abi.encodeFunctionCall({
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
