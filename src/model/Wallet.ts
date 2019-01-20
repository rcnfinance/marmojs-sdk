import { Intent } from "src";
import { SignedIntent } from "./SignedIntent";
import { Config } from "../Config";
import { Signature } from "./Signature";
import { bufferToHex, privateToAddress, toBuffer, ecsign, bufferToInt } from 'ethereumjs-util'
import { toHexStringZeroPadded } from "../utils/EthUtils";

declare var generateAddress2: (from: Buffer, salt: Buffer, initCode: Buffer) => Buffer;

export class Wallet {
    private key: string;

    public config: Config;
    public address: string;
    public signer: string;

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

    public sign(intent: Intent): SignedIntent {
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
