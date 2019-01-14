import { Event } from "./Event";

export class EventCollection {

    private events: Map<number, Event> = new Map();

    public findOne(id: number): Event {
        // TODO (jpgopnzalezra) implementation
        return new Event();
    }

    public create(event: Event): void {
        this.events[event.getId()] = event;
    }

    public getAll(addresses: string[]): Map<string, Event[]> {
        // TODO (jpgopnzalezra) implementation
        /*
            .map(function(event) {
            event.dataValues.abi = JSON.parse(event.dataValues.abi)
            event.dataValues.eventNames = event.dataValues.eventNames.split(';')
            return event.dataValues
        })
        */
        return new Map();
    }

    public findById(id: number): Event {
        // TODO (jpgopnzalezra) implementation
        return new Event();
    }

    public findByConfirmationCode(code: string): Event {
       // TODO (jpgopnzalezra) implementation
       return new Event();
    }

}