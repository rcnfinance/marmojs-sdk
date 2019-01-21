let globalProvider: Provider;

export class Provider {
    node: string;
    networkId: number;

    constructor(
        node: string,
        networkId: number,
    ) {
        this.node = node;
        this.networkId = networkId;
    }

    asDefault() {
        globalProvider = this;
    }

    static getGlobal(): Provider {
        return globalProvider;
    }
}

export class DefaultProvider {
    static PROVIDER = new Provider("0x98ef25e9f596000233ed019f909cc8a5f35984f1cc0b0b9e05407ce7a6820bc1", 3);
}
