const Web3 = require('web3')

export class EthereumService {

  private web3;

  constructor(web3Provider) {
    this.web3 = new Web3(web3Provider)
  }

  async initialize() {
    try {
      await this.getCurrentTip()
    } catch (error) {
      console.error('Could not connect to the Ethereum node', error)
      throw error
    }
  }

  watchNewBlocks(callback) {
    return this.web3.eth.subscribe('newBlockHeaders', callback)
  }

  getCurrentTip() {
    return this.web3.eth.getBlockNumber()
  }

  getContracts(contractData) {
    return contractData.map(data => {
      console.log(data)
      const contract = new this.web3.eth.Contract(data.abi, data.address)
      contract.address = data.address.toLowerCase()
      return contract
    })
  }
}
