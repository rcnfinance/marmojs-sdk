import { Intent } from "../model/Intent";
import { SignedIntent } from "../model/SignedIntent";
import { SignatureData } from "../model/SignatureData";
const Web3 = require('web3');
const web3 = new Web3();

export function toHexStringNoPrefixZeroPadded(value: string, lenght: number): string {
    let source: string = value;
    source = source.replace('0x', '');
    if (source.length < lenght) {
        const diff = lenght - source.length;
        source = '0'.repeat(diff) + source;
    }
    return source;
}

export function sign(intent: Intent, privateKey: String): SignedIntent {
    const signature = web3.eth.accounts.sign(intent.getId(), privateKey);
    const signatureData: SignatureData = new SignatureData(signature.v, signature.r, signature.s);
    let signedIntent: SignedIntent = new SignedIntent();
    signedIntent.setIntent(intent);
    signedIntent.setSignatureData(signatureData);
    return signedIntent;
}