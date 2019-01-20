import { bufferToHex, toBuffer } from "ethereumjs-util";

export class Signature {
    public v: number;
    public r: string;
    public s: string;

    constructor(v: number, r: string, s: string) {
        this.v = v;
        this.r = r;
        this.s = s;
    }

    public join(): string {
        return bufferToHex(Buffer.concat([toBuffer(this.r), toBuffer(this.s), toBuffer(this.v)]));
    }
}
