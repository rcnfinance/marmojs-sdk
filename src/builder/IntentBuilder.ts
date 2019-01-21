import { Intent } from '../model/Intent';
import { IntentAction } from 'src';
import BigNumber = require("bn.js");

export class IntentBuilder {
    public dependencies: string[] = [];
    public salt: string = "0x";
    public expiration: BigNumber;
    public action: IntentAction;
    public minGasLimit: BigNumber = new BigNumber(0);
    public maxGasPrice: BigNumber = new BigNumber(9999999999);

    withDependencies(value: string[]): IntentBuilder {
        this.dependencies = value;
        return this;
    }

    withSalt(value: string): IntentBuilder {
        this.salt = value;
        return this;
    }

    withExpiration(value: string | number | BigNumber): IntentBuilder {
        this.expiration = new BigNumber(value);
        return this;
    }

    withIntentAction(value: IntentAction) {
        this.action = value;
        return this;
    }

    withMinGasLimit(value: string | number | BigNumber): IntentBuilder {
        this.minGasLimit = new BigNumber(value);
        return this;
    }

    withMaxGasLimit(value: string | number | BigNumber): IntentBuilder {
        this.maxGasPrice = new BigNumber(value);
        return this;
    }

    build(): Intent {
        if (this.expiration === undefined) {
            this.expiration = new BigNumber(Math.floor(new Date().getTime() + 86400 * 365));
        }

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
