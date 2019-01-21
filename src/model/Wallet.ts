import { Intent } from "src";
import { SignedIntent } from "./SignedIntent";
import { Config } from "../Config";
import { Signature } from "./Signature";
import { bufferToHex, privateToAddress, toBuffer, ecsign, bufferToInt } from 'ethereumjs-util'
import { toHexStringZeroPadded, generateAddress2 } from "../utils/EthUtils";
import { Provider } from "../Provider";

export class Wallet {
    private key: string;

    config: Config;
    provider: Provider;
    address: string;
    signer: string;

    constructor(key: string, config?: Config, provider?: Provider) {
        this.key = key;

        if (config == null) {
            this.config = Config.getGlobal();
            if (this.config == null) throw Error("A valid configuration must be provided or set as global");
        } else {
            this.config = config;
        }

        if (provider == null) {
            this.provider = Provider.getGlobal();
            if (this.provider == null) throw Error("A valid configuration must be provided or set as global");
        } else {
            this.provider = provider;
        }

        this.signer = bufferToHex(privateToAddress(toBuffer(key)));
        this.address = bufferToHex(
            generateAddress2(
                toBuffer(this.config.marmoFactory) as Buffer,
                toBuffer(toHexStringZeroPadded(this.signer, 64)) as Buffer,
                toBuffer(this.config.initCode) as Buffer
            )
        )
    }

    sign(intent: Intent): SignedIntent {
        const id = intent.id(this);
        const sig = ecsign(toBuffer(id), toBuffer(this.key));
        return new SignedIntent(
            intent,
            new Signature(
                bufferToInt(sig.v),
                bufferToHex(sig.r),
                bufferToHex(sig.s)
            ),
            this
        );
    }
}
