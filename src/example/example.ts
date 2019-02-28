import { Wallet } from "../model/Wallet";
import { ERC20 } from "../model/data/ERC20";
import { DefaultConf } from "../Config";
import { IntentBuilder } from "../builder/IntentBuilder";
import { Provider } from "../Provider";
import { StatusCode } from "../model/response/Status";
import { SignedIntent } from "../model/SignedIntent";


const crypto = require('crypto')
const ETH_NODE = "https://ropsten.node.rcn.loans:8545/"
const RELAYER = "http://ec2-18-188-99-203.us-east-2.compute.amazonaws.com/"
const TEST_ERC20 = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"

const wait = ms => new Promise((r, j) => setTimeout(r, ms))

async function waitUntil(predicate: () => Promise<boolean>, timeout: number = 30, period = 1000) {
    const mustEnd = Date.now() + timeout * 1000
    while (Date.now() < mustEnd) {
        if (await predicate()) {
            return true;
        } else {
            await wait(period)
        }
    }
    return false;
}

async function example() {
    DefaultConf.ROPSTEN.asDefault();

    const provider: Provider = new Provider(ETH_NODE, RELAYER);
    console.log("----------------------------------------------------")
    console.log("-------------------Marmo----------------------------")
    console.log("----------------------------------------------------")

    const wallet: Wallet = new Wallet('0x' + crypto.randomBytes(32).toString('hex'));
    console.log("From: ", wallet.address)
    console.log("----------------------------------------------------")

    const walletReceiver = new Wallet('0x' + crypto.randomBytes(32).toString('hex'));
    console.log("To: ", wallet.address)
    console.log("----------------------------------------------------")

    const intentAction = new ERC20(TEST_ERC20).transfer(walletReceiver.address, 0);
    const intent = new IntentBuilder().withIntentAction(intentAction).build();

    const signedIntent: SignedIntent = wallet.sign(intent);
    console.log("Send SignedIntent: ", signedIntent)
    console.log("----------------------------------------------------")

    const result = await signedIntent.relay(provider);
    console.log("Result: (Relay)", result)
    console.log("----------------------------------------------------")

    const status = await signedIntent.status(provider)

    console.log("Waiting...")
    console.log("----------------------------------------------------")
    await waitUntil(async () => (await signedIntent.status(provider)).code === StatusCode.Settling, 640);

    const newStatus = await signedIntent.status(provider);
    console.log("Status: ", newStatus)
}

example()