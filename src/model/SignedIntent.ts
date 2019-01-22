import { Intent } from "./Intent";
import { Signature } from "./Signature";
import { Wallet } from "../model/Wallet";
import { RelayClient } from "../client/RelayClient";
import { Provider } from "../Provider";

export class SignedIntent {
    intent: Intent;
    signature: Signature;
    wallet: Wallet;
    id: string;

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

    toJson(): string {
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

    relay(provider: Provider) {
        if (provider === null || provider === undefined) {
            throw Error("The provider can not be null or undefined");
            provider = Provider.getGlobal();
            if (provider === null) throw Error("A valid configuration must be provided or set as global");
        }
        if (provider.relayer === null || provider.relayer === undefined) {
            throw Error("The provider is invalid, have not relayer");
        }

        const relayClient = new RelayClient(provider.relayer);
        relayClient.post(this);
    }

    status(provider: Provider) {
        if (provider === null || provider === undefined) {
            throw Error("The provider can not be null or undefined");
        }
        // TODO: CODE
    }

}
