export class IntentAction {
    private to: string;
    private value: number;
    private data: number;

    public getTo(): string {
        return this.to;
    }

    public setTo(to: string): void {
        this.to = to;
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(value: number): void {
        this.value = value;
    }

    public getData(): number {
        return this.data;
    }

    public setData(data: number): void {
        this.data = data;
    }


    
}