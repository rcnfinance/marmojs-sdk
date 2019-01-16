import { EventReceipt } from "../model/EventReceipt";
import { EventStorage } from "../storage/EventStorage";
import { Event } from "../model/Event";

export class DispatchService {

  private eventStorage;

  constructor(eventStorage: EventStorage) {
    this.eventStorage = eventStorage
  }

  dispatch(id: string, event: Event) {
    return this.storeReceipt(id, event)
  }

  storeReceipt(id: string, event: Event) {
    console.info('Storing', arguments)
    let receipt: EventReceipt  = new EventReceipt();
    receipt.setId(id);
    receipt.setEvent(event)
    return this.eventStorage.getEventReceiptModel().create(receipt)
  }
}
