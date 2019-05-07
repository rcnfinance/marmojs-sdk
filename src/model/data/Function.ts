import { equal } from "assert";
import Web3 = require('web3')
import { IntentAction } from "../IntentAction";
import BigNumber = require("bn.js");
const web3 = new Web3()

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
        equal(keys.length, values.length)
        let signatureBuilder: string = this.name
        signatureBuilder += '(';
        let index = 0;
        keys.forEach(key => {
            if (index !== 0) signatureBuilder += ','
            index++
            signatureBuilder += key
        });
        signatureBuilder += ')'
        const signature = web3.eth.abi.encodeFunctionSignature(signatureBuilder)
        const parameters = web3.eth.abi.encodeParameters(keys, values).slice(2)
        const encode = signature + parameters
        return new IntentAction(this.contract, value, encode, this)
    }

}