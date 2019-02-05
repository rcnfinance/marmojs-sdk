export enum StatusCode {
    Pending,
    Settling,
    Completed,
    Error
}

export class IntentReceipt {
    txHash: string;
    relayer: string;
    blockNumber: number;
    confirmation: number;
    success: boolean;
    result: string;

    constructor (txHash: string, relayer: string, blockNumber: number, confirmation: number, success: boolean, result: string) {
        this.txHash = txHash;
        this.relayer = relayer;
        this.blockNumber = blockNumber;
        this.confirmation = confirmation;
        this.success = success;
        this.result = result;
    }
}

export class Status {
    code: StatusCode;
    receipt?: IntentReceipt;

    constructor(code: StatusCode, receipt: IntentReceipt | undefined = undefined) {
        this.code = code;
        this.receipt = receipt;
    }
}