import Web3 = require('web3')

let globalProvider: Provider;

export class Provider {

    relayer: string;
    web3: Web3;

    constructor(
        relayer?: string,
        node?: string,
        web3?: Web3,
    ) {
        this.web3 = new Web3((web3 !== undefined) ? web3.givenProvider : undefined || node);
        this.relayer = relayer || ""
    }

    asDefault() {
        globalProvider = this;
    }

    static getGlobal(): Provider {
        return globalProvider;
    }

}