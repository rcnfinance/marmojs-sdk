import { Intent } from "./Intent";
import { SignatureData } from "./SignatureData";

export class SignedIntent {
    private intent: Intent;
    private signatureData: SignatureData;

    public getIntent(): Intent {
        return this.intent;
    }

    public setIntent(intent: Intent): void {
        this.intent = intent;
    }

    public getSignatureData(): SignatureData {
        return this.signatureData;
    }

    public setSignatureData(signatureData: SignatureData): void {
        this.signatureData = signatureData;
    }
}