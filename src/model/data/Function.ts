import { IntentAction } from "../IntentAction";
import { BigNumber } from 'bignumber.js';
import { AbiCoder } from 'web3-eth-abi';

const abiCoder = new AbiCoder();

export class Function {
    name: string
    contract: string
    inputParameters: string[]
    outputParameters: string[]

    constructor(name: string = '', contract: string = '', inputParameters: string[] = [], outputParameters: string[] = []) {
        this.name = name
        this.contract = contract
        this.inputParameters = inputParameters
        this.outputParameters = outputParameters
    }

    encode(inputs: any[] = [], value: BigNumber = new BigNumber(0)): IntentAction {
        return this.resolve(this.inputParameters, inputs, value)
    }

    private resolve(keys: string[], values: any[], value: BigNumber): IntentAction {
        let signatureBuilder: string = this.name
        signatureBuilder += '(';
        let index = 0;
        keys.forEach(key => {
            if (index !== 0) signatureBuilder += ','
            index++
            signatureBuilder += key
        });
        signatureBuilder += ')'
        const signature = abiCoder.encodeFunctionSignature(signatureBuilder)
        const parameters = abiCoder.encodeParameters(keys, values).slice(2)
        const encode = signature + parameters
        return new IntentAction(this.contract, value, encode, this)
    }

}