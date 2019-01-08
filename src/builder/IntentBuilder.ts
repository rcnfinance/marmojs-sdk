import { Intent } from '../model/Intent';
import { IntentAction } from '../model/IntentAction';
import * as Utils from '../utils/MarmoUtils';

const SIZE: number = 64;
const PREFIX = '0x'
const SHA3_NULL = 'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'

const Web3 = require('web3');
const web3 = new Web3();

export class IntentBuilder {
    private dependencies: Array<string>;
    private signer: string;
    private salt: number = 0;
    private expiration: number = Math.floor(new Date(new Date().setFullYear(new Date().getFullYear() + 1)).getTime() / 1000.0); // now + 1 year

    /* For transactions */
    private to: string;
    private value: number;
    private data: string = PREFIX;
    private minGasLimit: number = 0;
    private maxGasPrice: number = 9999999999;

    withDependencies(value: Array<string>): IntentBuilder {
        this.dependencies = value;
        return this;
    }

    withSigner(value: string): IntentBuilder {
        this.signer = value;
        return this;
    }

    withSalt(value: number): IntentBuilder {
        this.salt = value;
        return this;
    }

    withExpiration(value: number): IntentBuilder {
        this.expiration = value;
        return this;
    }

    withIntentAction(value: IntentAction) {
        if (value.getTo() !== undefined) {
            this.to = value.getTo();
        }
        if (value.getData() !== undefined) {
            this.data = value.getData();
        }
        if (value.getValue() !== undefined) {
            this.value = value.getValue();
        }
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
            throw new Error('Invalid signer');
        }

        if (this.to == null || this.value == null) {
            throw new Error('Invalid action intent');
        }

        let intent = new Intent()
        intent.setId(this.generateId());
        intent.setSigner(this.signer);
        intent.setDependencies(this.dependencies);
        intent.setWallet(Utils.generateAddress(this.signer));
        intent.setSalt(Utils.toHexStringNoPrefixZeroPadded(web3.utils.toHex(this.salt), SIZE));
        intent.setTo(this.to);
        intent.setValue(this.value);
        intent.setData(this.data);
        intent.setMinGasLimit(this.minGasLimit);
        intent.setMaxGasPrice(this.maxGasPrice);
        intent.setExpiration(this.expiration);
        return intent;
    }

    private generateId(): string {
        let wallet: string = Utils.generateAddress(this.signer);
        let dependencies: string = this.sanitizeDependencies(this.dependencies);
        let to: string = this.sanitizePrefix(this.to);
        let value: string = Utils.toHexStringNoPrefixZeroPadded(web3.utils.toHex(this.value), SIZE);
        let data: string = this.sanitizePrefix(web3.utils.sha3(this.data));
        let minGasLimit: string = Utils.toHexStringNoPrefixZeroPadded(web3.utils.toHex(this.minGasLimit), SIZE);
        let maxGasLimit: string = Utils.toHexStringNoPrefixZeroPadded(web3.utils.toHex(this.maxGasPrice), SIZE);
        let salt: string = Utils.toHexStringNoPrefixZeroPadded(web3.utils.toHex(this.salt), SIZE);
        let expiration: string = Utils.toHexStringNoPrefixZeroPadded(web3.utils.toHex(this.expiration), SIZE);

        let encodePackedBuilder: string = '';
        encodePackedBuilder += wallet;
        console.info("Wallet -> ", wallet);
        encodePackedBuilder += dependencies;
        console.info("Dependencies -> ", dependencies);
        encodePackedBuilder += to;
        console.info("To -> ", to);
        encodePackedBuilder += value;
        console.info("Value -> ", value);
        encodePackedBuilder += data;
        console.info("Data -> ", data);
        encodePackedBuilder += minGasLimit;
        console.info("MinGasLimit -> ", minGasLimit);
        encodePackedBuilder += maxGasLimit;
        console.info("MaxGasLimit -> ", maxGasLimit);
        encodePackedBuilder += salt;
        console.info("Salt -> ", salt);
        encodePackedBuilder += expiration;
        console.info("Expiration -> ", expiration);

        console.info("Transaction Data (EncodePacked) -> ", encodePackedBuilder);
        return web3.utils.sha3(encodePackedBuilder);
    }

    private sanitizeDependencies(dependencies: Array<string>): string  {
        if (dependencies === undefined || dependencies.length === 0) {
            return SHA3_NULL;
        }
        let out: string = PREFIX;
        dependencies.forEach(element => {
            out += this.sanitizePrefix(element);
        });
        return this.sanitizePrefix(web3.utils.sha3(out));
    }

    private sanitizePrefix(str: string): string {
        if (str == null) {
            return SHA3_NULL;
        }
        return str.slice(2);
    }

}