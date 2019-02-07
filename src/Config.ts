let globalConf: Config;

export class Config {
    initCode: string;
    marmoFactory: string;
    implementation: string;
    depsUtils: string;

    constructor(
        initCode: string,
        marmoFactory: string,
        implementation: string,
        depsUtils: string
    ) {
        this.initCode = initCode;
        this.marmoFactory = marmoFactory;
        this.implementation = implementation;
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
        "0x14e25af98043632f65f78deb5c4b4cf0c299e2b2e34f034abfde94d138de6a7e",
        "0x534cbda9c0a9c5c29d0dced0d1d24127e3078519",
        "0x2101d39973a6a49061934e40f21db638874b39da",
        "0x874ad09c8ab7da34bf75550409e9446b47558364"
    );
}
