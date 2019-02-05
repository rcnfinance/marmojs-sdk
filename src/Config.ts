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
        "0x674bd4d0754e3809fb963174498670c4df41f20f7f1b1470897f5239fa7d2518",
        "0xceb46ecca6aac8e5dbc7f2e340c77eb86351a2e0",
        "0x035dfc65c9995e81db28c9ed81326595719a5bfd",
        "0x874ad09c8ab7da34bf75550409e9446b47558364"
    );
}
