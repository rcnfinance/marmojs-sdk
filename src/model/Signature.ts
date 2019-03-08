import { bufferToHex, toBuffer } from "ethereumjs-util";

export class Signature {
    v: string;
    r: string;
    s: string;

    constructor(v: number, r: string, s: string) {
        this.v = bufferToHex(toBuffer(v));
        this.r = r;
        this.s = s;
    }

    join(): string {
        return bufferToHex(Buffer.concat([toBuffer(this.r), toBuffer(this.s), toBuffer(this.v)]));
    }
}
