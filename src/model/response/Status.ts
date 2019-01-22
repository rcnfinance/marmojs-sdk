export enum StatusCode {
    Pending,
    Settling,
    Completed,
    Error
}

export class IntentReceipt {
    txHash: string
    relayer: string
    blockNumber: number
    success: boolean

    constructor () {
        // TODO: Implement
    }
}

export class Status {
    code: StatusCode
    receipt: IntentReceipt

    constructor(code: StatusCode, receipt: IntentReceipt) {
        this.code = code
        this.receipt = receipt
    }
}