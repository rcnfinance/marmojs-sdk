export class Event {

    private address: string
    private block: number
    private abi: string
    private eventNames: string
    private blockConfirmations: number
    private confirmationCode: number

    public getAddress(): string {
        return this.address;
    }

    public setAddress(address: string): void {
        this.address = address;
    }

    public getBlock(): number {
        return this.block;
    }

    public setBlock(block: number): void {
        this.block = block;
    }

    public getAbi(): string {
        return this.abi;
    }

    public setAbi(abi: string): void {
        this.abi = abi;
    }

    public getEventNames(): string {
        return this.eventNames;
    }

    public setEventNames(eventNames: string): void {
        this.eventNames = eventNames;
    }

    public getBlockConfirmations(): number {
        return this.blockConfirmations;
    }

    public setBlockConfirmations(blockConfirmations: number): void {
        this.blockConfirmations = blockConfirmations;
    }

    public getConfirmationCode(): number {
        return this.confirmationCode;
    }

    public setConfirmationCode(confirmationCode: number): void {
        this.confirmationCode = confirmationCode;
    }

}