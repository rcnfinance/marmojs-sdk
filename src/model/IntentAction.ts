import BigNumber = require("bn.js");

export class IntentAction {
    public to: string;
    public value: BigNumber;
    public data: string;

    constructor(
        to: string,
        value: BigNumber,
        data: string
    ) {
        this.to = to;
        this.value = value;
        this.data = data;
    }
}
