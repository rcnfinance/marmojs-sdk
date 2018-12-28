import { IERC20 } from './IERC20';
import { IntentAction } from '../IntentAction';

const Web3 = require('web3');
const web3 = new Web3();

export class ERC20 implements IERC20 {
    contractAddress: string;

    constructor(contractAddress: string) {
        this.contractAddress = contractAddress;
    }

    public totalSupply(): IntentAction {
        let inputs = {
            name: 'totalSupply',
            type: 'function'
        }
        return this.getIntentAction(inputs, []);
    }

    public balanceOf(who: string): IntentAction {
        let inputs = {
            name: 'balanceOf',
            type: 'function',
            inputs: [{
                type: 'address',
                name: 'who'
            }]
        };
        return this.getIntentAction(inputs, [who]);
    }

    public allowance(owner: string, spender: string): IntentAction {
        let inputs = {
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

    public transfer(to: string, value: number): IntentAction {
        let inputs = {
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
        return this.getIntentAction(inputs, [to, value]);
    }

    public approve(to: string, value: number): IntentAction {
        let inputs = {
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
        return this.getIntentAction(inputs, [to, value]);
    }

    public transferFrom(from: string, to: string, value: number): IntentAction {
        let inputs = {
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
        return this.getIntentAction(inputs, [from, to, value]);
    }

    private getIntentAction(json: any, params: any[]): IntentAction {
        let intentAction: IntentAction = new IntentAction()
        intentAction.setData(web3.eth.abi.encodeFunctionCall(json, params));
        intentAction.setTo(this.contractAddress);
        intentAction.setValue(0);
        return intentAction;
    }

}