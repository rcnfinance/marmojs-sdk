import { IntentAction } from "../IntentAction";

import BigNumber = require("bn.js");

export class EthWallet {
    sendEth(to: string, value: number | string | BigNumber): IntentAction {
        return new IntentAction(to, new BigNumber(value))
    }
}
