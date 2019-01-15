import { EventService }  from './service/eventService';
import { ConfigurationService } from "./service/EventConfiguration";

export class EventRoute {

  private eventService: EventService
  private configurationService: ConfigurationService

  constructor() {
    this.configurationService = new ConfigurationService()
    this.eventService = this.configurationService.eventService;
  }

  public async run() {
    await this.configurationService.startWatching()
  }

  public work() {
    this.run().catch(console.log)
    console.log('---------')
  }

  public addEvent(event) {
    this.eventService.storeNewEvent(event)
  }

}

