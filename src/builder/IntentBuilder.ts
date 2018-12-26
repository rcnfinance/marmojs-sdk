import { Intent } from "../model/Intent";
import { IntentAction } from "../model/IntentAction";

const SIZE_32: number = 64; 
const SIZE_64: number = 64; 
const web3 = require('web3');
const SHA3_NULL = 'c5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470'
export class IntentBuilder {
    private dependencies: Array<number>;
    private signer: string;
    private wallet: string;
    private salt: number = 0;

    /* For transactions */
    private to: string;
    private value: number;
    private data: Array<number>;
    private minGasLimit: number = 0;
    private maxGasPrice: number = 9999999999;

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

    private generateId(): Array<number> {
        let wallet: string = this.wallet;
        let dependencies: string = this.sanitizeDependencies(this.dependencies);
        let to: string= this.sanitizePrefix(this.to);
        let value: string = this.toHexStringNoPrefixZeroPadded(this.value, SIZE_64);
        let data: string = this.sanitizePrefix(web3.utils.keccak256(this.data));
        let minGasLimit: string = this.toHexStringNoPrefixZeroPadded(this.minGasLimit, SIZE_64);
        let maxGasLimit: string = this.toHexStringNoPrefixZeroPadded(this.maxGasPrice, SIZE_64);
        let salt: string = this.toHexStringNoPrefixZeroPadded(web3.utils.toHex(this.salt), SIZE_32);

        var encodePackedBuilder: string = '';
        encodePackedBuilder += wallet;
        encodePackedBuilder += dependencies;
        encodePackedBuilder += to;
        encodePackedBuilder += value;
        encodePackedBuilder += data;
        encodePackedBuilder += minGasLimit;
        encodePackedBuilder += maxGasLimit;
        encodePackedBuilder += salt;

        let encodePacked: string = web3.utils.sha3(encodePackedBuilder);
        return web3.utils.hexToBytes(encodePacked);
    }

    private sanitizeDependencies(dependencies: Array<number>): string  {
        if (dependencies == undefined || dependencies.length == 0) {
            return SHA3_NULL;
        }
        var out: string[] = [];
        dependencies.forEach(element => {
            out.push(this.sanitizePrefix(element.toString()));
        });
        return web3.utils.sha3(out.toString());
    }

    private sanitizePrefix(str: string): string {
        return str.slice(2);
    }

    private toHexStringNoPrefixZeroPadded(value: number, lenght: number): string {
        let source: string = web3.utils.toHex(value);
        source = source.replace('0x', '');
        if (source.length < lenght) {
            const diff = lenght - source.length;
            source = '0'.repeat(diff) + source;
        }
        return source;
    }
}