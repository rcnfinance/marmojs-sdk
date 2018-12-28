

export class IntentResponse {

    private statusCode: number;

    constructor(statusCode: number) {
        this.statusCode = statusCode;
    }

    public getStatusCode(): number {
        return this.statusCode;
    }

    public setStatusCode(statusCode: number): void {
        this.statusCode = statusCode;
    }

}