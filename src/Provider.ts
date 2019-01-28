import Web3 = require('web3')

let globalProvider: Provider;

export class Provider {

    relayer: string;
    web3: Web3;

    constructor(node: string | Web3, relayer: string) {
        this.web3 = node instanceof Web3 ? node : new Web3(relayer);
        this.relayer = relayer;
    }

    asDefault() {
        globalProvider = this;
    }

    static getGlobal(): Provider {
        return globalProvider;
    }
}
