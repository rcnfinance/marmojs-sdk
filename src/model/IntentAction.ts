import BigNumber = require("bn.js");
import { Function } from "./data/Function";

export class IntentAction {
    to: string
    value: BigNumber
    data: string
    self?: Function;

    constructor(
        to: string,
        value: BigNumber,
        data: string = "0x",
        self?: Function
    ) {
        this.to = to
        this.value = value
        this.data = data
        this.self = self
    }

}
