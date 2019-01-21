import { IntentAction } from '../IntentAction';
import BigNumber = require("bn.js");

const Web3 = require('web3');
const web3 = new Web3();

export class ERC20 {
    contractAddress: string;

    constructor(contractAddress: string) {
        this.contractAddress = contractAddress;
    }

    totalSupply(): IntentAction {
        const inputs = {
            name: 'totalSupply',
            type: 'function'
        }
        return this.getIntentAction(inputs, []);
    }

    balanceOf(who: string): IntentAction {
        const inputs = {
            name: 'balanceOf',
            type: 'function',
            inputs: [{
                type: 'address',
                name: 'who'
            }]
        };
        return this.getIntentAction(inputs, [who]);
    }

    allowance(owner: string, spender: string): IntentAction {
        const inputs = {
            name: 'allowance',
            type: 'function',
            inputs: [{
                type: 'address',
                name: 'owner'
            },
            {
                type: 'address',
                name: 'spender'
            }]
        }
        return this.getIntentAction(inputs, [owner, spender]);
    }

    transfer(to: string, value: number | string | BigNumber): IntentAction {
        const inputs = {
            name: 'transfer',
            type: 'function',
            inputs: [{
                type: 'address',
                name: 'to'
            },
            {
                type: 'uint256',
                name: 'value'
            }]
        };
        return this.getIntentAction(inputs, [to, new BigNumber(value).toString()]);
    }

    approve(to: string, value: number | string | BigNumber): IntentAction {
        const inputs = {
            name: 'approve',
            type: 'function',
            inputs: [{
                type: 'address',
                name: 'to'
            },
            {
                type: 'uint256',
                name: 'value'
            }]
        };
        return this.getIntentAction(inputs, [to, new BigNumber(value).toString()]);
    }

    transferFrom(from: string, to: string, value: number | string | BigNumber): IntentAction {
        const inputs = {
            name: 'transferFrom',
            type: 'function',
            inputs: [{
                type: 'address',
                name: 'from'
            },
            {
                type: 'address',
                name: 'to'
            },
            {
                type: 'uint256',
                name: 'value'
            }]
        };
        return this.getIntentAction(inputs, [from, to, new BigNumber(value).toString()]);
    }

    private getIntentAction(json: any, params: any[]): IntentAction {
        return new IntentAction(
            this.contractAddress,
            new BigNumber(0),
            web3.eth.abi.encodeFunctionCall(json, params)
        );
    }
}
