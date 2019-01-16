import { Event } from "./Event";

export class EventCollection {

    private events: Map<string, Event[]> = new Map();

    public create(event: Event): void {
        if (this.events[event.getAddress()] === undefined) {
            this.events[event.getAddress()] = [];
        }
        this.events[event.getAddress()].push(event);
    }

    public getAll(addresses: string[]): Map<string, Event[]> {
        return this.events;
    }

    public findByAddress(address: string): Event[] {
        return this.events[address];
    }

}