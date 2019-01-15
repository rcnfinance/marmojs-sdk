import { EventReceipt } from "../model/EventReceipt";
import { EventStorage } from "../storage/EventStorage";

export class DispatchService {

  private eventStorage;

  constructor(eventStorage: EventStorage) {
    this.eventStorage = eventStorage
  }

  dispatch(event, events) {
    return this.storeReceipt(event.id, events[0].transactionHash)
  }

  storeReceipt(eventId, txHash) {
    console.log('Storing', arguments)
    let receipt: EventReceipt  = new EventReceipt();
    receipt.setEventId(eventId);
    receipt.setTxHash(txHash);
    return this.eventStorage.getEventReceiptCollection().create(receipt)
  }
}
