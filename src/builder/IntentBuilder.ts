import { Intent } from "../model/Intent";
import { IntentAction } from "../model/IntentAction";

const isHexPrefixed = require('is-hex-prefixed');
const SIZE_64: number = 64; 
const web3 = require('web3');

export class IntentBuilder {
    private dependencies: Array<number>;
    private signer: string;
    private wallet: string;
    private salt: number;

    /* For transactions */
    private to: string;
    private value: number;
    private data: Array<number>;
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

    private generateId(): Array<number> {
        let wallet: string = this.wallet; console.log(wallet);
        let dependencies: string = web3.utils.keccak256(this.sanitizeDependencies(this.dependencies)); console.log(dependencies);
        let to: string= this.sanitizePrefix(this.to); console.log(to);
        let value: string = this.toHexStringNoPrefixZeroPadded(this.value, SIZE_64); console.log(value);
        let data: string = web3.utils.keccak256(this.data); console.log(data);
        let minGasLimit: string = this.toHexStringNoPrefixZeroPadded(this.minGasLimit, SIZE_64); console.log(minGasLimit);
        let maxGasLimit: string = this.toHexStringNoPrefixZeroPadded(this.maxGasPrice, SIZE_64); console.log(maxGasLimit);
        let salt: string = this.sanitizePrefix(web3.utils.toHex(this.salt)); console.log(salt);

        var encodePackedBuilder: string[] = [];
        encodePackedBuilder.push(wallet)
        encodePackedBuilder.push(dependencies)
        encodePackedBuilder.push(to)
        encodePackedBuilder.push(value)
        encodePackedBuilder.push(data)
        encodePackedBuilder.push(minGasLimit)
        encodePackedBuilder.push(maxGasLimit)
        encodePackedBuilder.push(salt);

        let encodePacked: string = web3.utils.keccak256(encodePackedBuilder.toString());
        return web3.utils.hexToBytes(encodePacked);
    }

    private sanitizeDependencies(dependencies: Array<number>): string  {
        var out: string[] = [];
        dependencies.forEach(element => {
            out.push(this.sanitizePrefix(element.toString()));
        });
        return out.toString();
    }

    private sanitizePrefix(str: string): string {
        if (typeof str !== 'string') {
          return str;
        }
        return isHexPrefixed(str) ? str.slice(2) : str;
    }

    private toHexStringNoPrefixZeroPadded(value: number, lenght: number): string {
        return "";
    }
}