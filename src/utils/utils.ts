import { Intent } from "../model/Intent";
import { SignedIntent } from "../model/SignedIntent";

export function toHexStringNoPrefixZeroPadded(value: string, lenght: number): string {
    let source: string = value;
    source = source.replace('0x', '');
    if (source.length < lenght) {
        const diff = lenght - source.length;
        source = '0'.repeat(diff) + source;
    }
    return source;
}

export function sign(intent: Intent, credentials: Any): SignedIntent {
    return null;
}