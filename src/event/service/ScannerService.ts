import { EventService }from "./eventService";
import { EthereumService } from "./EthereumService";

const min = (array, prop) => array.reduce((prev, elem) => Math.min(prev, elem[prop]), Infinity)
const max = (array, prop) => array.reduce((prev, elem) => Math.max(prev, elem[prop]), -Infinity)
const nameMatches = (events, eventNames) => {
  eventNames = eventNames.map(name => name.replace(/\([^)]+\)/, ''))
  return events.reduce((prev, event) => prev || eventNames.includes(event.event), false)
}

export class ScannerService {
  private ethService: EthereumService;
  private eventService: EventService;
  constructor(eventService: EventService, ethService: EthereumService) {
    this.ethService = ethService
    this.eventService = eventService
  }

  async run() {
    try {
      return this.ethService.watchNewBlocks(this.checkevents.bind(this))
    } catch (err) {
      console.error('Unable to start watching', err.stack)
    }
  }

  async checkevents() {
    const eventService = this.eventService
    const ethService = this.ethService
    try {
      const addressToevents = await eventService.mapAddressesToEvent()
      const allAddresses = Object.keys(addressToevents)
      const contracts = ethService.getContracts(await eventService.getContractData(addressToevents))
      const currentTip = await ethService.getCurrentTip()
      const lastBlockSync = await eventService.mapAddressesToLastSync(allAddresses, currentTip)

      const height = await this.ethService.getCurrentTip()
      console.info(`Received new block height: ${height}`)

      await Promise.all(contracts.map(async (contract) => {
        const addressToEvent = addressToevents[contract.address];
        const fromBlock = lastBlockSync[contract.address] - max(addressToEvent, 'blockConfirmations');
        const toBlock = height - min(addressToEvent, 'blockConfirmations')
        const events = await contract.getPastEvents('allEvents', { fromBlock, toBlock })
        console.debug(`Data received for contract in ${contract.address}`, fromBlock, toBlock, events.length)
        const byTransaction = eventService.mapByTransactionId(events)
        for (let events of byTransaction) {
          const confirmations = height - events[0].blockNumber
          await Promise.all(addressToEvent.map(async (currentEvent) => {
            if (confirmations >= currentEvent.blockConfirmations/* && nameMatches(events, currentEvent.eventNames)*/) {
              const existingReceipts = await eventService.getReceipt(events[0].transactionHash)
              if (existingReceipts === undefined) {
                await eventService.dispatchNotification(events[0].transactionHash, events)
              }
            }
          }))
        }
      })).catch(err => {
        console.error(`Error: ${err.stack}`)
      })
    } catch (err) {
      console.error(`Error: ${err.stack}`)
    }
  }
}