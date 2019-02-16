import { IntentAction } from "../IntentAction";

import BigNumber = require("bn.js");
import { Contract } from "./Contract";
import { Function } from "./Function";

export class EthWallet {

    sendEth(to: string, value: number | string | BigNumber): IntentAction {
        return new IntentAction(to, new BigNumber(value), "0x", new Function())
    }

}
