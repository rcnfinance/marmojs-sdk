import { Event } from "./Event";

export class EventCollection {

    private events: Map<string, Event[]> = new Map();

    public create(event: Event): void {
        if (this.events[event.getAddress()] === undefined) {
            this.events[event.getAddress()] = [];
        }
        this.events[event.getAddress()].push(event);
        console.log(this.events);
    }

    public getAll(addresses: string[]): Map<string, Event[]> {
        // TODO (jpgopnzalezra) implementation
        return this.events;
    }

    public findByAddress(address: string): Event {
        // TODO (jpgopnzalezra) implementation
        return new Event();
    }

}