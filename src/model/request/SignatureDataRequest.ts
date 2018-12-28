export class SignatureDataRequest {
    private r: string;
    private s: string;
    private v: string;

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

    public getV(): string {
        return this.v;
    }

    public setV(v: string): void {
        this.v = v;
    }

}