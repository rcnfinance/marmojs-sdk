import ConfigurationService from './EventConfiguration';
import DispatchService from './DispatchService'
import { EventStorage } from '../storage/EventStorage';
import { Event } from '../model/Event';

export default class EventService {

  private eventStorage: EventStorage;
  private configuration: ConfigurationService;
  private dispatchService: DispatchService;

  constructor(dispatchService: DispatchService, eventStorage: EventStorage, configurationService: ConfigurationService) {
    this.dispatchService = dispatchService
    this.eventStorage = eventStorage
    this.configuration = configurationService
  }

  /**
   * Retrieve a list of all events
   * @param [where] add restrictions on what events to fetch
   */
  getEvents(addresses: string[]): Map<string, Event[]> {
    return this.eventStorage.getEventModel().getAll(addresses);
  }

  getEvent(id) {
    return this.eventStorage.getEventModel().findById(id);
  }

  confirmEvent(confirmationCode) {
    return this.eventStorage.getEventModel().findByConfirmationCode(confirmationCode);
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
      event.setBlockConfirmations(eventDescription.blockConfirmations)
      event.setEventNames(eventDescription.eventNames)
      const result = await this.eventStorage.getEventModel().create(event)
      return result
    } catch (error) {
      console.log(error.stack)
    }
  }

  /**
   * Retrieve a map of addresses to all events stored in the database
   */
  mapAddressesToEvent(addresses = []): Map<string, Event[]> {
    return this.getEvents(addresses);
  }

  mapByTransactionId(events) {
    const result = {}
    for (let event of events) {
      result[event.transactionHash] = result[event.transactionHash] || []
      result[event.transactionHash].push(event)
    }
    return Object.values(result)
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
  getReceipt(eventId) {
    return this.eventStorage.getEventReceiptModel().find(eventId);
  }

  dispatchNotification(event, event) {
    return this.dispatchService.dispatch(event, event)
  }
}
