import { EventReceipt } from "./EventReceipt";

export class EventReceiptCollection {

    private events: Map<number, EventReceipt> = new Map();

    public create(receipt: EventReceipt): void {
        this.events[receipt.getId()] = receipt;
    }

    public find(eventId: number): EventReceipt {
        return this.events[eventId];
    }
}