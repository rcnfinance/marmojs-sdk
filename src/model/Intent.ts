const Web3 = require('web3')
const web3 = new Web3("https://ropsten.node.rcn.loans:8545")

const signatureRelayedEvent = web3.eth.abi.encodeEventSignature('Relayed(bytes32,bytes32[],address,uint256,bytes,bytes32,uint256,bool)');

export class Intent {
    private id: string;
    private encodePacked: string;
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

    public getEncodePacked(): string {
        return this.encodePacked;
    }

    public setEncodePacked(encodePacked: string): void {
        this.encodePacked = encodePacked;
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

    public async getStatus(): Promise<string> {
        this.setId('0x34bf00467d90b4a3a27af7c0dc0368fa7bd4aaf6af77e03f76022877da2fefd2')
        this.setWallet('0x4fee6c1ca9b3939ccf442a7d25af45734ce97ecb')

        const data = web3.eth.abi.encodeFunctionCall({
            name: 'relayedAt',
            type: 'function',
            inputs: [{
                type: 'bytes32',
                name: '_id'
            }]
        }, [this.getId()])

        return await web3.eth.call({
            to: this.getWallet(),
            data: data
        }).then((block) =>
            web3.eth.getPastLogs({
                fromBlock: web3.utils.hexToNumber(block),
                address: this.getWallet(),
                topics: [
                    signatureRelayedEvent,
                    this.getId()
                ]
            })
        ).then((logs) => logs[0].type);

    }

}


// 0x000000000000000000000000c2d9018441eda5953f548746b5327c809df058c2

//                          4fee6c1ca9b3939ccf442a7d25af45734ce97ecb