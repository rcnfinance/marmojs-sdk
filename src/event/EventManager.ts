import { EventService }  from './service/eventService';
import { ConfigurationService } from "./service/EventConfiguration";
import { Event } from './model/Event';

export class EventManager {

  private eventService: EventService
  private configurationService: ConfigurationService

  constructor() {
    this.configurationService = new ConfigurationService()
    this.eventService = this.configurationService.eventService;
  }

  public async fetch() {
    await this.configurationService.startWatching().catch(console.info)
  }

  public addEvent(event) {
    this.eventService.storeNewEvent(event)
  }

  public getResults(address: string): Event[] {
    return this.eventService.getEvent(address);
  }

}

