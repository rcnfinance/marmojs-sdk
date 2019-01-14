
export class EventReceipt {

    private id: number;
    private eventId: number;
    private txHash: string;

    public getId(): number {
        return this.id;
    }

    public setId(id: number): void {
        this.id = id;
    }

    public getEventId(): number {
        return this.eventId;
    }

    public setEventId(eventId: number): void {
        this.eventId = eventId;
    }

    public getTxHash(): string {
        return this.txHash;
    }

    public setTxHash(txHash: string): void {
        this.txHash = txHash;
    }

}