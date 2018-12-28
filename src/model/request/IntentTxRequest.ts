export class IntentTxRequest {
    private to: string;
    private value: string;
    private data: string;
    private minGasLimit: number;
    private maxGasPrice: number;

    public getTo(): string {
        return this.to;
    }

    public setTo(to: string): void {
        this.to = to;
    }

    public getValue(): string {
        return this.value;
    }

    public setValue(value: string): void {
        this.value = value;
    }

    public getData(): string {
        return this.data;
    }

    public setData(data: string): void {
        this.data = data;
    }

    public getMinGasLimit(): number {
        return this.minGasLimit;
    }

    public setMinGasLimit(minGasLimit: number): void {
        this.minGasLimit = minGasLimit;
    }

    public getMaxGasPrice(): number {
        return this.maxGasPrice;
    }

    public setMaxGasPrice(maxGasPrice: number): void {
        this.maxGasPrice = maxGasPrice;
    }

}