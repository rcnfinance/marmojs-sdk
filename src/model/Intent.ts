export class Intent {
    private id: string;
    private dependencies: Array<number>;
    private signer: string;
    private wallet: string;
    private salt: number;

    /* For transactions */
    private to: string;
    private value: number;
    private data: number;
    private minGasLimit: number;
    private maxGasPrice: number;

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }
    
    public getDependencies(): Array<number> {
        return this.dependencies;
    }

    public setDependencies(dependencies: Array<number>): void {
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

    public getSalt(): number {
        return this.salt;
    }

    public setSalt(salt: number): void {
        this.salt = salt;
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

    public getData(): number {
        return this.data;
    }

    public setData(data: number): void {
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