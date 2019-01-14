import eventService from "./eventService";
import EthereumService from "./EthereumService";

const min = (array, prop) => array.reduce((prev, elem) => Math.min(prev, elem[prop]), Infinity)
const max = (array, prop) => array.reduce((prev, elem) => Math.max(prev, elem[prop]), -Infinity)
const nameMatches = (events, eventNames) => {
  eventNames = eventNames.map(name => name.replace(/\([^)]+\)/, ''))
  return events.reduce((prev, event) => prev || eventNames.includes(event.event), false)
}

export default class ScannerService {
  private ethService: EthereumService;
  private eventService: eventService;
  constructor(eventService: eventService, ethService: EthereumService) {
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
      const contracts = ethService.getContracts(await eventService.getContractData(addressToevents))
      const currentTip = await ethService.getCurrentTip()
      const lastBlockSync = currentTip

      const height = await this.ethService.getCurrentTip()
      console.info(`Received new block height: ${height}`)

      await Promise.all(contracts.map(async (contract) => {
        const addressToEvent = addressToevents[contract.address]
        const fromBlock = lastBlockSync[contract.address] - max(addressToEvent, 'blockConfirmations')
        const toBlock = height - min(addressToEvent, 'blockConfirmations')
        const events = await contract.getPastEvents('allEvents', { fromBlock, toBlock })
        console.debug(`Data received for contract in ${contract.address}`, fromBlock, toBlock, events.length)
        const byTransaction = eventService.mapByTransactionId(events)
        for (let events of byTransaction) {
          const confirmations = height - events[0].blockNumber
          await Promise.all(events.map(async (event) => {
            if (confirmations >= event.blockConfirmations
              && nameMatches(events, event.eventNames)
            ) {
              const existingReceipts = await eventService.getReceipt(event.id)
              if (existingReceipts !== undefined) {
                await eventService.dispatchNotification(event, events)
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