import { IntentAction } from "../IntentAction";

import BigNumber = require("bn.js");

export class EthWallet {
    public sendEth(to: string, value: number | string | BigNumber): IntentAction {
        return new IntentAction(
            to,
            new BigNumber(value),
            "0x"
        );
    }
}
