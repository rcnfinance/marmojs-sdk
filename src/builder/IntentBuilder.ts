import { Intent } from '../model/Intent';
import { IntentAction } from '../model/IntentAction';
import * as Utils from '../utils/MarmoUtils';

const SIZE_32: number = 64;
const SIZE_64: number = 64;
const SHA3_NULL = 'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'

const Web3 = require('web3');
const web3 = new Web3();

export class IntentBuilder {
    private dependencies: Array<string>;
    private signer: string;
    private wallet: string;
    private salt: number = 0;
    private expiration: number = 15;

    /* For transactions */
    private to: string;
    private value: number;
    private data: string;
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

    withWallet(value: string): IntentBuilder {
        this.wallet = value;
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
            throw new Error('Invalid signer');
        }
        if (this.wallet == null) {
            throw new Error('Invalid wallet');
        }
        if (this.to == null || this.value == null || this.data == null) {
            throw new Error('Invalid action intent');
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
        intent.setExpiration(this.expiration);
        return intent;
    }

    private generateId(): string {
        let wallet: string = this.wallet;
        let dependencies: string = this.sanitizeDependencies(this.dependencies);
        let to: string = this.sanitizePrefix(this.to);
        let value: string = Utils.toHexStringNoPrefixZeroPadded(web3.utils.toHex(this.value), SIZE_64);
        let data: string = this.sanitizePrefix(web3.utils.keccak256(this.data));
        let minGasLimit: string = Utils.toHexStringNoPrefixZeroPadded(web3.utils.toHex(this.minGasLimit), SIZE_64);
        let maxGasLimit: string = Utils.toHexStringNoPrefixZeroPadded(web3.utils.toHex(this.maxGasPrice), SIZE_64);
        let salt: string = Utils.toHexStringNoPrefixZeroPadded(web3.utils.toHex(this.salt), SIZE_32);
        let expiration: string = Utils.toHexStringNoPrefixZeroPadded(web3.utils.toHex(this.expiration), SIZE_64);

        let encodePackedBuilder: string = '';
        encodePackedBuilder += wallet;
        encodePackedBuilder += dependencies;
        encodePackedBuilder += to;
        encodePackedBuilder += value;
        encodePackedBuilder += data;
        encodePackedBuilder += minGasLimit;
        encodePackedBuilder += maxGasLimit;
        encodePackedBuilder += salt;
        encodePackedBuilder += expiration;

        return web3.utils.sha3(encodePackedBuilder);
    }

    private sanitizeDependencies(dependencies: Array<string>): string  {
        if (dependencies === undefined || dependencies.length === 0) {
            return SHA3_NULL;
        }
        let out: string = '0x';
        dependencies.forEach(element => {
            out += this.sanitizePrefix(element);
        });
        return this.sanitizePrefix(web3.utils.sha3(out));
    }

    private sanitizePrefix(str: string): string {
        return str.slice(2);
    }

}