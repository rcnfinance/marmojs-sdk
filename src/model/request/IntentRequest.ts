import { IntentTxRequest } from './IntentTxRequest';
import { SignatureDataRequest } from './SignatureDataRequest';

export class IntentRequest {
    private id: string;
    private dependencies: Array<string>;
    private wallet: string;
    private tx: IntentTxRequest;
    private salt: string;
    private signer: string;
    private signature: SignatureDataRequest;

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }

    public getDependencies(): Array<string> {
        return this.dependencies;
    }

    public setDependencies(dependencies: Array<string>): void {
        this.dependencies = dependencies;
    }

    public getWallet(): string {
        return this.wallet;
    }

    public setWallet(wallet: string): void {
        this.wallet = wallet;
    }

    public getTx(): IntentTxRequest {
        return this.tx;
    }

    public setTx(tx: IntentTxRequest): void {
        this.tx = tx;
    }

    public getSalt(): string {
        return this.salt;
    }

    public setSalt(salt: string): void {
        this.salt = salt;
    }

    public getSigner(): string {
        return this.signer;
    }

    public setSigner(signer: string): void {
        this.signer = signer;
    }

    public getSignature(): SignatureDataRequest {
        return this.signature;
    }

    public setSignature(signature: SignatureDataRequest): void {
        this.signature = signature;
    }

}