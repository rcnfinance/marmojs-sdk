import { Intent } from "../model/Intent";
import { IntentAction } from "../model/IntentAction";

export class IntentBuilder {
    
    private dependencies: Array<number>;
    private signer: string;
    private wallet: string;
    private salt: number;

    /* For transactions */
    private to: string;
    private value: number;
    private data: number;
    private minGasLimit: number;
    private maxGasPrice: number;

    withDependencies(value: Array<number>): IntentBuilder {
        this.dependencies = value;
        return this;
    }

    withSigner(value: string): IntentBuilder {
        this.signer = value;
        return this;
    }

    withWallet(value: string): IntentBuilder {
        this.wallet = value;
        return this;
    }

    withSalt(value: number): IntentBuilder {
        this.salt = value;
        return this;
    }

    withIntentAction(value: IntentAction){
        this.to = value.getTo();
        this.data = value.getData();
        this.value = value.getValue();
        return this;
    }

    withMinGasLimit(value: number): IntentBuilder {
        this.minGasLimit = value;
        return this;
    }

    withMaxGasLimit(value: number): IntentBuilder {
        this.maxGasPrice = value;
        return this;
    }

    build(): Intent {
        if (this.signer == null) {
            // Exception    
        }
        if (this.wallet == null) {
            // Exception 
        }
        if (this.to == null || this.value == null || this.data == null) {
            // Exception 
        }

        let intent = new Intent()
        intent.setId(this.generateId());
        intent.setSigner(this.signer);
        intent.setDependencies(this.dependencies);
        intent.setWallet(this.wallet);
        intent.setSalt(this.salt);
        intent.setTo(this.to);
        intent.setValue(this.value);
        intent.setData(this.data);
        intent.setMinGasLimit(this.minGasLimit);
        intent.setMaxGasPrice(this.maxGasPrice);
        return intent;
    }

    private generateId(): string {
        return "";
    }
}