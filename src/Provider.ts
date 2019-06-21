import Web3 from 'web3';

let globalProvider: Provider;

export class Provider {
    relayer: string;
    web3: Web3;

    constructor(node: string | Web3, relayer: string) {
        this.web3 = node instanceof Object ? node : new Web3(node);
        this.relayer = relayer;
    }

    asDefault() {
        globalProvider = this;
    }

    static getGlobal(): Provider {
        return globalProvider;
    }
}
