import { Intent } from '../model/Intent';
import { IntentAction } from '../model/IntentAction';
import { Dependency } from '../model/Dependency';
import BigNumber from 'bignumber.js';


export class IntentBuilder {
    dependencies: Array<Dependency> = [];
    salt: string = "0x";
    expiration: BigNumber;
    action: IntentAction;
    maxGasLimit: BigNumber = new BigNumber(2).pow(256).minus(new BigNumber(1));
    maxGasPrice: BigNumber = new BigNumber(2).pow(256).minus(new BigNumber(1));

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
        if (this.expiration === undefined) {
            this.expiration = new BigNumber(Math.floor(new Date().getTime() + 86400 * 365));
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
