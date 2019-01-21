import { Intent } from "./Intent";
import { Signature } from "./Signature";
import { Wallet } from "src/model/Wallet";
import { IntentResponse } from "./response/IntentResponse";

export class SignedIntent {
    public intent: Intent;
    public signature: Signature;
    public wallet: Wallet;
    public id: string;

    constructor(
        intent: Intent,
        signature: Signature,
        wallet: Wallet
    ) {
        this.intent = intent;
        this.signature = signature;
        this.wallet = wallet;
        this.id = intent.id(wallet);
    }

    public toJson(): string {
        return JSON.stringify({
            id: this.id,
            dependencies: this.intent.dependencies,
            wallet: this.wallet.address,
            signer: this.wallet.signer,
            tx: {
                to: this.intent.action.to,
                value: this.intent.action.value,
                data: this.intent.action.data,
                maxGasPrice: this.intent.maxGasPrice,
                minGasLimit: this.intent.minGasLimit
            },
            salt: this.intent.salt,
            expiration: this.intent.expiration,
            signature: this.signature.join()
        });
    }

    public relay(relayer: string) {
        
    }
}
