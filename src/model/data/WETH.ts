import { ERC20 } from "./ERC20";
import BigNumber = require("bn.js");
import { IntentAction } from "../IntentAction";
import { Function } from "./Function";


export class WETH extends ERC20 {

    deposit(value: number | string | BigNumber ): IntentAction {
        return new Function("deposit", this.contractAddress).encode([], new BigNumber(value))
    }
}