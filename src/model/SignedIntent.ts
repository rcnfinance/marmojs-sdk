import { Intent } from "./Intent";
import { Signature } from "./Signature";
import { Wallet } from "../model/Wallet";
import { RelayClient } from "../client/RelayClient";
import { Provider } from "../Provider";
import { Status, StatusCode, IntentReceipt } from "../model/response/Status";

export class SignedIntent {
    intent: Intent;
    signature: Signature;
    wallet: Wallet;
    id: string;

    constructor(
        intent: Intent,
        signature: Signature,
        wallet: Wallet
    ) {
        this.intent = intent;
        this.signature = signature;
        this.wallet = wallet;
        this.id = intent.id(wallet);
    }

    toJson(): string {
        return JSON.stringify({
            id: this.id,
            dependencies: this.intent.dependencies,
            wallet: this.wallet.address,
            signer: this.wallet.signer,
            tx: {
                to: this.intent.action.to,
                value: this.intent.action.value,
                data: this.intent.action.data,
                maxGasPrice: this.intent.maxGasPrice,
                minGasLimit: this.intent.minGasLimit
            },
            salt: this.intent.salt,
            expiration: this.intent.expiration,
            signature: this.signature.join()
        });
    }

    relay(provider: Provider) {
        if (provider === null || provider === undefined) {
            provider = Provider.getGlobal();
            if (provider === null || provider === undefined) throw Error("A valid configuration must be provided or set as global");
        }
        if (provider.relayer === null || provider.relayer === undefined) {
            throw Error("The provider is invalid, have not relayer");
        }

        const relayClient = new RelayClient(provider.relayer);
        relayClient.post(this).then(response => {
            if (response.statusCode !== 200) throw Error("The provider is invalid, have not relayer");
        })
    }

    async status(provider: Provider): Promise<Status> {
        if (provider === null || provider === undefined) {
            throw Error("The provider can not be null or undefined")
        }

        const minConfirmation = 32;
        const web3 = provider.web3
        const signatureRelayedEvent = web3.eth.abi.encodeEventSignature('Relayed(bytes32,bytes32[],address,uint256,bytes,bytes32,uint256,bool)')
        const currentBlockNumber = await web3.eth.getBlockNumber()
        const data = web3.eth.abi.encodeFunctionCall({
            name: 'relayedAt',
            type: 'function',
            inputs: [{
                type: 'bytes32',
                name: '_id'
            }]
        }, [this.id])
        const relayer = web3.eth.abi.encodeFunctionCall({
            name: 'relayedBy',
            type: 'function',
            inputs: [{
                type: 'bytes32',
                name: '_id'
            }]
        }, [this.id])

        return await web3.eth.call({
            to: this.wallet.address,
            data: data
        }).then((block) =>
            web3.eth.getPastLogs({
                fromBlock: web3.utils.hexToNumber(block),
                address: this.wallet.address,
                topics: [
                    signatureRelayedEvent,
                    this.id
                ]
            })
        ).then((logs) => {
            const event = logs[0]
            if (event === undefined || !isMined(event)) {
                return getStatusWithCode(StatusCode.Pending)
            }

            const confirmation: number = web3.utils.hexToNumber(currentBlockNumber) - web3.utils.hexToNumber(event.blockNumber)
            let intentReceipt = new IntentReceipt(event['transactionHash'], relayer, event['blockNumber'], confirmation)

            if (isMined(event) && confirmation < minConfirmation) {
                intentReceipt.success = false
                return new Status(StatusCode.Settling, intentReceipt)
            }
            if (isMined(event) && confirmation >= minConfirmation) {
                intentReceipt.success = true
                return new Status(StatusCode.Completed, intentReceipt)
            }
            return getStatusWithCode(StatusCode.Error)
        })

        function getStatusWithCode(code: StatusCode): Status {
            return new Status(code, new IntentReceipt('0x', '0x', 0, 0))
        }

        function isMined(event): boolean {
            return event['type'] === 'mined';
        }

    }

}
