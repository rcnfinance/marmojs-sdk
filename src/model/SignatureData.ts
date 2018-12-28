export class SignatureData {
    private v: string;
    private r: string;
    private s: string;

    constructor(v: string, r: string, s: string) {
        this.v = v;
        this.r = r;
        this.s = s;
    }

    public getV(): string {
        return this.v;
    }

    public setV(v: string): void {
        this.v = v;
    }

    public getR(): string {
        return this.r;
    }

    public setR(r: string): void {
        this.r = r;
    }

    public getS(): string {
        return this.s;
    }

    public setS(s: string): void {
        this.s = s;
    }
}