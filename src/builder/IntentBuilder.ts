import { Intent } from '../model/Intent';
import { IntentAction } from '../model/IntentAction';
import { Dependency } from '../model/Dependency';
import BigNumber = require("bn.js");

export class IntentBuilder {
    dependencies: Array<Dependency> = [];
    salt: string = "0x0000000000000000000000000000000000000000000000000000000000000000";
    expiration: BigNumber = new BigNumber(Math.floor(new Date().getTime() + 86400 * 365));
    action?: IntentAction
    maxGasLimit: BigNumber = new BigNumber(2).pow(new BigNumber(256)).sub(new BigNumber(1));
    maxGasPrice: BigNumber = new BigNumber(2).pow(new BigNumber(256)).sub(new BigNumber(1));

    withDependencies(value: Array<Dependency>): IntentBuilder {
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

    withMaxGasLimit(value: string | number | BigNumber): IntentBuilder {
        this.maxGasLimit = new BigNumber(value);
        return this;
    }

    withMaxGasPrice(value: string | number | BigNumber): IntentBuilder {
        this.maxGasPrice = new BigNumber(value);
        return this;
    }

    build(): Intent {
        if (this.action === null || this.action === undefined) {
            throw Error("The action intent is null or undefined")
        }

        return new Intent(
            this.dependencies,
            this.action,
            this.salt,
            this.maxGasPrice,
            this.maxGasLimit,
            this.expiration
        );
    }
}
