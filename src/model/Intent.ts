export class Intent {
    private id: string;
    private dependencies: Array<string>;
    private signer: string;
    private wallet: string;
    private salt: string;
    private expiration: number;

    /* For transactions */
    private to: string;
    private value: number;
    private data: string;
    private minGasLimit: number;
    private maxGasPrice: number;

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

    public getSigner(): string {
        return this.signer;
    }

    public setSigner(signer: string): void {
        this.signer = signer;
    }

    public getWallet(): string {
        return this.wallet;
    }

    public setWallet(wallet: string): void {
        this.wallet = wallet;
    }

    public getSalt(): string {
        return this.salt;
    }

    public setSalt(salt: string): void {
        this.salt = salt;
    }

    public getExpiration(): number {
        return this.expiration;
    }

    public setExpiration(expiration: number): void {
        this.expiration = expiration;
    }

    public getTo(): string {
        return this.to;
    }

    public setTo(to: string): void {
        this.to = to;
    }

    public getValue(): number {
        return this.value;
    }

    public setValue(value: number): void {
        this.value = value;
    }

    public getData(): string {
        return this.data;
    }

    public setData(data: string): void {
        this.data = data;
    }

    public getMinGasLimit(): number {
        return this.minGasLimit;
    }

    public setMinGasLimit(minGasLimit: number): void {
        this.minGasLimit = minGasLimit;
    }

    public getMaxGasPrice(): number {
        return this.maxGasPrice;
    }

    public setMaxGasPrice(maxGasPrice: number): void {
        this.maxGasPrice = maxGasPrice;
    }
}