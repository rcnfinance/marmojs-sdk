import { Function } from "./Function";

export class Contract {

    contractAddress: string

    constructor(contractAddress: string) {
        this.contractAddress = contractAddress
    }

    functionEncoder(name: string, inputParameters: string[] = [], outputParameters: string[] = []): Function {
        return new Function(name, this.contractAddress, inputParameters, outputParameters)
    }

}