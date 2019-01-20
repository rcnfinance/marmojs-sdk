declare var globalConf: Config;

export class Config {
    public initCode: string;
    public marmoFactory: string;
    public networkId: number;

    constructor(
        initCode: string,
        marmoFactory: string,
        networkId: number
    ) {
        this.initCode = initCode;
        this.marmoFactory = marmoFactory;
        this.networkId = networkId;
    }

    public asDefault() {
        globalConf = this;
    }

    public static getGlobal(): Config {
        return globalConf;
    }
}

export class DefaultConf {
    public static ROPSTEN = new Config("0x98ef25e9f596000233ed019f909cc8a5f35984f1cc0b0b9e05407ce7a6820bc1", "0x6306b6a26c70c03279c037f630be03046104cb37", 3);
}
