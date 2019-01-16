import { ConfigurationService } from './EventConfiguration';
import { DispatchService } from './DispatchService'
import { EventStorage } from '../storage/EventStorage';
import { Event } from '../model/Event';

export class EventService {

  private eventStorage: EventStorage;
  private dispatchService: DispatchService;

  constructor(dispatchService: DispatchService, eventStorage: EventStorage, configurationService: ConfigurationService) {
    this.dispatchService = dispatchService
    this.eventStorage = eventStorage
  }

  /**
   * Retrieve a list of all events
   * @param [where] add restrictions on what events to fetch
   */
  getEvents(addresses: string[]): Map<string, Event[]> {
    return this.eventStorage.getEventModel().getAll(addresses);
  }

  getEvent(address: string): Event[] {
    return this.eventStorage.getEventModel().findByAddress(address);
  }

  /**
   * Store an event in the memory
   */
  async storeNewEvent(eventDescription) {
    // store into the memory
    try {

      let event = new Event();
      event.setAbi(eventDescription.abi)
      event.setAddress(eventDescription.address.toLowerCase())
      event.setBlock(eventDescription.block)
      event.setBlockConfirmations(eventDescription.blockConfirmations)
      event.setEventNames(eventDescription.eventNames)
      const result = await this.eventStorage.getEventModel().create(event)
      return result
    } catch (error) {
      console.error(error.stack)
    }
  }

  /**
   * Retrieve a map of addresses to all events stored in the database
   */
  mapAddressesToEvent(addresses = []): Map<string, Event[]> {
    return this.getEvents(addresses);
  }

  mapByTransactionId(events): any[] {
    const result = {}
    for (let event of events) {
      result[event.transactionHash] = result[event.transactionHash] || []
      result[event.transactionHash].push(event)
    }
    return Object.values(result)
  }

  mapAddressesToLastSync(addresses: string[], defaultLastSync: number): Map<string, number> {
    let out = new Map()
    addresses.forEach(address => {
      let defaultLastSyncTemp = defaultLastSync;
      this.getEvent(address).forEach(event => {
        if (event.getBlock() < defaultLastSyncTemp) {
          defaultLastSyncTemp = event.getBlock()
        }
      })
      out[address] = defaultLastSyncTemp;
    })
    return out;
  }

  getContractData(addressToEvents) {
    return Object.keys(addressToEvents).map(address => {
      return {
        address,
        abi: addressToEvents[address][0].abi
      }
    })
  }

  /**
   * Retrieve a receipt from the memory
   */
  getReceipt(eventId: number) {
    return this.eventStorage.getEventReceiptModel().find(eventId);
  }

  dispatchNotification(eventId: string, event: Event) {
    return this.dispatchService.dispatch(eventId, event)
  }
}
