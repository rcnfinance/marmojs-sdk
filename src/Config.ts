let globalConf: Config;

export class Config {
    initCode: string;
    marmoFactory: string;
    depsUtils: string;

    constructor(
        initCode: string,
        marmoFactory: string,
        depsUtils: string
    ) {
        this.initCode = initCode;
        this.marmoFactory = marmoFactory;
        this.depsUtils = depsUtils;
    }

    asDefault() {
        globalConf = this;
    }

    static getGlobal(): Config {
        return globalConf;
    }
}

export class DefaultConf {
    static ROPSTEN = new Config(
        "0x98ef25e9f596000233ed019f909cc8a5f35984f1cc0b0b9e05407ce7a6820bc1",
        "0x6306b6a26c70c03279c037f630be03046104cb37",
        "0x874ad09c8ab7da34bf75550409e9446b47558364"
    );
}
