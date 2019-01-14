import EthereumService from './EthereumService'
import ScannerService from './ScannerService'

import DispatchService from './DispatchService'
import eventService from './eventService';
import { EventStorage } from '../storage/EventStorage';

export default class ConfigurationService {

  private _ethereum: EthereumService;
  private _eventService: eventService;
  private _scanner: ScannerService;
  private _dispatch: DispatchService;
  private _eventStorage: EventStorage;

  async startWatching() {
    await this.ethereumService.initialize()
    this.scannerService.run()
  }

  get ethereumService() {
    if (!this._ethereum) {
      this._ethereum = new EthereumService('ws://localhost:8546')
    }
    return this._ethereum
  }

  get scannerService() {
    if (!this._scanner) {
      this._scanner = new ScannerService(this.eventService, this.ethereumService)
    }
    return this._scanner
  }

  get eventService() {
    if (!this._eventService) {
      this._eventService = new eventService(
        this.dispatchService,
        this.eventStorage,
        this
      )
    }
    return this._eventService
  }

  get dispatchService() {
    if (!this._dispatch) {
      this._dispatch = new DispatchService(this.eventStorage)
    }
    return this._dispatch
  }

  get eventStorage() {
    if (!this._eventStorage) {
      this._eventStorage = new EventStorage()
    }
    return this._eventStorage
  }


}

