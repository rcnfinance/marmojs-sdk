import BigNumber = require("bn.js");
import { Function } from "./data/Function";

export class IntentAction {
    to: string
    value: BigNumber
    data: string
    parent: Function;

    constructor(
        to: string,
        value: BigNumber,
        data: string,
        parent: Function
    ) {
        this.to = to
        this.value = value
        this.data = data
        this.parent = parent
    }

}
