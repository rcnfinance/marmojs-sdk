import { IntentAction } from '../IntentAction';
import { Function } from './Function';
import BigNumber = require("bn.js");

export class ERC20 {
    contractAddress: string;

    constructor(contractAddress: string) {
        this.contractAddress = contractAddress
    }

    totalSupply(): IntentAction {
        return new Function("totalSupply", this.contractAddress).encode()
    }

    balanceOf(who: string): IntentAction {
        return new Function("balanceOf", this.contractAddress, ['address']).encode([who])
    }

    allowance(owner: string, spender: string): IntentAction {
        return new Function("allowance", this.contractAddress, ['address', 'address']).encode([owner, spender])
    }

    transfer(to: string, value: number | string | BigNumber): IntentAction {
        return new Function("transfer", this.contractAddress, ['address', 'uint256']).encode([to, value.toString()])
    }

    approve(to: string, value: number | string | BigNumber): IntentAction {
        return new Function("approve", this.contractAddress, ['address', 'uint256']).encode([to, value.toString()])
    }

    transferFrom(from: string, to: string, value: number | string | BigNumber): IntentAction {
        return new Function("transferFrom", this.contractAddress, ['address', 'address', 'uint256']).encode([from, to, value.toString()])
    }

}
