import { EventReceiptCollection } from "../model/EventReceiptCollection";
import { EventCollection } from "../model/EventCollection";

export class EventStorage {

    private eventReceiptModel: EventReceiptCollection;
    private eventModel: EventCollection;

    constructor() {
        this.eventReceiptModel = new EventReceiptCollection();
        this.eventModel = new EventCollection();
    }

    public getEventReceiptModel(): EventReceiptCollection {
        return this.eventReceiptModel;
    }

    public setEventReceiptModel(eventReceiptModel: EventReceiptCollection): void {
        this.eventReceiptModel = eventReceiptModel;
    }

    public getEventModel(): EventCollection {
        return this.eventModel;
    }

    public setEventModel(eventModel: EventCollection): void {
        this.eventModel = eventModel;
    }



}