import { Intent } from '../model/Intent';
import { IntentAction } from 'src';

export class IntentBuilder {
    public dependencies: string[];
    public salt: string = "0x";
    public expiration: number = Math.floor(new Date().getTime() + 86400 * 365);
    public action: IntentAction;
    public minGasLimit: number = 0;
    public maxGasPrice: number = 9999999999;

    withDependencies(value: string[]): IntentBuilder {
        this.dependencies = value;
        return this;
    }

    withSalt(value: string): IntentBuilder {
        this.salt = value;
        return this;
    }

    withExpiration(value: number): IntentBuilder {
        this.expiration = value;
        return this;
    }

    withIntentAction(value: IntentAction) {
        this.action = value;
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
        return new Intent(
            this.dependencies,
            this.action,
            this.salt,
            this.maxGasPrice,
            this.minGasLimit,
            this.expiration
        );
    }
}
