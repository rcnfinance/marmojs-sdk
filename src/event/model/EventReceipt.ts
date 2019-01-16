import { Event } from "./Event";

export class EventReceipt {
    private id: string;
    private event: Event;

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getEvent(): Event {
        return this.event;
    }

    public setEvent(event: Event): void {
        this.event = event;
    }
}