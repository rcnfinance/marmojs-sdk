import BigNumber = require("bn.js");

export class IntentAction {
    to: string
    value: BigNumber
    data: string
    receive: string[]

    constructor(
        to: string,
        value: BigNumber,
        data: string = "0x",
        receive: string[] = []
    ) {
        this.to = to
        this.value = value
        this.data = data
        this.receive = receive
    }

}
