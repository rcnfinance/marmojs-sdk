import * as Utils from '../utils/MarmoUtils';

export class Wallet {

    private signer: string;
    private wallet: string;

    constructor(signer: string) {
        this.signer = signer;
        this.wallet = Utils.generateAddress(this.signer);
    }

    public getSigner(): string {
        return this.signer;
    }

    public getWallet(): string {
        return this.wallet;
    }

}