import { Intent } from "./Intent";
import { Signature } from "./Signature";
import { Wallet } from "../model/Wallet";
import { RelayClient } from "../client/RelayClient";
import { Provider } from "../Provider";
import { Status, StatusCode, IntentReceipt } from "../model/response/Status";
import Web3 from 'web3';
import { Dependency } from "./Dependency";

interface LogDetail {
    [key: string]: any;
}


export class SignedIntent implements Dependency {
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

    get address(): string {
        return this.wallet.address;
    }

    toJson(): string {
        return JSON.stringify({
            id: this.id,
            wallet: this.wallet.address,
            signer: this.wallet.signer,
            signature: this.signature.join(),
            intent: {
                implementation: this.wallet.config.implementation,
                data: this.intent.build_implementation_call(this.wallet.config),
                detail: {
                    dependency: this.intent.build_dependency_call(this.wallet.config),
                    to: this.intent.action.to,
                    value: this.intent.action.value.toString(),
                    data: this.intent.action.data,
                    maxGasPrice: this.intent.maxGasPrice.toString(),
                    maxGasLimit: this.intent.maxGasLimit.toString(),
                    salt: this.intent.salt,
                    expiration: this.intent.expiration.toString()
                }
            }
        });
    }

    async relay(provider: Provider): Promise<boolean> {
        if (provider === null || provider === undefined) {
            provider = Provider.getGlobal();
            if (provider === null || provider === undefined) throw Error("A valid configuration must be provided or set as global");
        }
        if (provider.relayer === null || provider.relayer === undefined) {
            return false;
        }

        const relayClient = new RelayClient(provider.relayer);
        const response = await relayClient.post(this);
        return response.statusCode === 201;
    }

    async status(provider: Provider): Promise<Status> {
        if (provider === null || provider === undefined) {
            throw Error("The provider can not be null or undefined")
        }

        const web3 = provider.web3

        // TODO: Move to configuration
        const minConfirmation = 32;
        const signatureRelayedEvent = web3.eth.abi.encodeEventSignature('Receipt(bytes32,bool,bytes)')

        const currentBlockNumber = await web3.eth.getBlockNumber()

        const relayedBy = await SignedIntent.relayedBy(web3, this.wallet.address, this.id);
        const block = await SignedIntent.relayedAt(web3, this.wallet.address, this.id);

        if (block === 0) {
            return new Status(StatusCode.Pending);
        }

        const logs = await web3.eth.getPastLogs({
            fromBlock: block,
            toBlock: block,
            address: this.wallet.address,
            topics: [
                signatureRelayedEvent,
                this.id
            ]
        });

        const event = logs[0];

        const logsDetail: LogDetail = web3.eth.abi.decodeLog(
            [{ type: 'bool', name: 'success' }, { type: 'bytes', name: 'result' }],
            event.data, []
        );

        const confirmation = web3.utils.hexToNumber(event.blockNumber) - web3.utils.hexToNumber(currentBlockNumber);

        const intentReceipt = new IntentReceipt(
            event['transactionHash'],
            relayedBy,
            block,
            confirmation,
            logsDetail["success"],
            logsDetail["result"]
        );

        return new Status(
            confirmation < minConfirmation ? StatusCode.Settling : StatusCode.Completed,
            intentReceipt
        );
    }

    static async relayedAt(web3: Web3, wallet: string, id: string): Promise<number> {
        const relayedByData = web3.eth.abi.encodeFunctionCall({
            name: 'relayedAt',
            type: 'function',
            inputs: [{
                type: 'bytes32',
                name: '_id'
            }]
        }, [id])
        return web3.utils.hexToNumber(await web3.eth.call({
            to: wallet,
            data: relayedByData
        }));
    }

    static async relayedBy(web3: Web3, wallet: string, id: string): Promise<string> {
        const relayedByData = web3.eth.abi.encodeFunctionCall({
            name: 'relayedBy',
            type: 'function',
            inputs: [{
                type: 'bytes32',
                name: '_id'
            }]
        }, [id])
        return await web3.eth.call({
            to: wallet,
            data: relayedByData
        })
    }
}
