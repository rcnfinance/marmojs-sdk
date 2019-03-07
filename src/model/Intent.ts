import { Wallet } from "../model/Wallet";
import { IntentAction } from "../model/IntentAction";
import BigNumber = require("bn.js");
import { IntentDependency } from "./IntentDependency";
import { Config } from "../Config";
import { Dependency } from "./Dependency";
import { AbiCoder } from 'web3-eth-abi';
import { soliditySha3 } from 'web3-utils';

const abiCoder = new AbiCoder();

export class Intent {
    dependencies: Dependency[];
    action: IntentAction;
    salt: string;
    maxGasPrice: BigNumber;
    maxGasLimit: BigNumber;
    expiration: BigNumber;

    constructor(
        dependencies: Array<Dependency>,
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

    add_dependency(dependency: Dependency) {
        this.dependencies.push(new IntentDependency(
            dependency.address,
            dependency.id
        ));
    }

    id(wallet: Wallet): string {
        return soliditySha3(
            { t: 'address', v: wallet.address },
            { t: 'address', v: wallet.config.implementation },
            {
                t: 'bytes32',
                v: soliditySha3({
                    t: 'bytes',
                    v: this.build_implementation_call(wallet.config)
                })
            }
        );
    }

    build_implementation_call(config: Config): string {
        return abiCoder.encodeParameters(
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

        if (depsCount === 0) {
            // No dependencies
            return "0x";
        } else if (depsCount === 1) {
            // Single dependency, call wallet directly
            const call = abiCoder.encodeFunctionCall({
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
            const call = abiCoder.encodeFunctionCall({
                name: 'multipleDeps',
                type: 'function',
                inputs: [{
                    type: 'address[]',
                    name: '_wallets'
                }, {
                    type: 'bytes32[]',
                    name: '_ids'
                }]
            }, [
                this.dependencies.map(d => d.address).join(),
                this.dependencies.map(d => d.id).join()
            ]);

            return "0x" + config.depsUtils.replace('0x', '') + call.replace('0x', '');
        }
    }
}
