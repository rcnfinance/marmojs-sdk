import { Intent } from "./Intent";
import { SignedIntent } from "./SignedIntent";
import { Config } from "../Config";
import { Signature } from "./Signature";
import { bufferToHex, privateToAddress, toBuffer, ecsign, bufferToInt } from 'ethereumjs-util'
import { toHexStringZeroPadded, generateAddress2 } from "../utils/EthUtils";

export class Wallet {
    private key: string;

    config: Config;
    address: string;
    signer: string;

    constructor(key: string, config?: Config) {
        this.key = key;

        if (config == null) {
            this.config = Config.getGlobal();
            if (this.config == null) throw Error("A valid configuration must be provided or set as global");
        } else {
            this.config = config;
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
                bufferToInt(toBuffer(sig.v)),
                bufferToHex(sig.r),
                bufferToHex(sig.s)
            ),
            this
        );
    }
}
