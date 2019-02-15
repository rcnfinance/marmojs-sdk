import { IntentAction } from '../IntentAction';
import BigNumber = require("bn.js");
import { Contract } from './Contract';

export class ERC20 extends Contract {

    totalSupply(): IntentAction {
        return this.functionEncoder("totalSupply").encode()
    }

    balanceOf(who: string): IntentAction {
        return this.functionEncoder("balanceOf", ['address']).encode([who])
    }

    allowance(owner: string, spender: string): IntentAction {
        return this.functionEncoder("allowance", ['address', 'address']).encode([owner, spender])
    }

    transfer(to: string, value: number | string | BigNumber): IntentAction {
        return this.functionEncoder("transfer", ['address', 'uint256']).encode([to, value.toString()])
    }

    approve(to: string, value: number | string | BigNumber): IntentAction {
        return this.functionEncoder("approve", ['address', 'uint256']).encode([to, value.toString()])
    }

    transferFrom(from: string, to: string, value: number | string | BigNumber): IntentAction {
        return this.functionEncoder("transferFrom", ['address', 'address', 'uint256']).encode([from, to, value.toString()])
    }

}
