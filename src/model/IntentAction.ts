export class IntentAction {
    public to: string;
    public value: number;
    public data: string;

    constructor(
        to: string,
        value: number,
        data: string
    ) {
        this.to = to;
        this.value = value;
        this.data = data;
    }
}
