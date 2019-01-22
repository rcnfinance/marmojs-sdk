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
    confirmation: number

    constructor (txHash: string, relayer: string, blockNumber: number, success: boolean, confirmation: number) {
        this.txHash = txHash
        this.relayer = relayer
        this.blockNumber = blockNumber
        this.success = success
        this.confirmation = confirmation
    }
}

export class Status {
    code: string
    receipt: IntentReceipt

    constructor(code: StatusCode, receipt: IntentReceipt) {
        this.code = StatusCode[code]
        this.receipt = receipt
    }
}