import { Wallet } from "../model/Wallet";
import { ERC20 } from "../model/data/ERC20";
import { DefaultConf } from "../Config";
import { IntentBuilder } from "../builder/IntentBuilder";
import { Provider } from "../Provider";
import { StatusCode } from "../model/response/Status";

import { equal, ok } from 'assert'
import { SignedIntent } from "../model/SignedIntent";

import BigNumber from "bignumber.js";
import crypto from 'crypto';

const ETH_NODE = "https://ropsten.node.rcn.loans:8545/";
// TODO Change to main Ropsten relayer (port 80)
const RELAYER = "https://marmo-relayer-ropsten.rcn.loans";
const TEST_ERC20 = "0x2f45b6fb2f28a73f110400386da31044b2e953d4";
const TEST_ERC20_2 = "0xa4aebb1ce2d7a3b7cd6f12e73bbcc9d0aaeb43a6";

function bn (value: number) {
    return new BigNumber(value);
}

const wait = ms => new Promise((r, j) => setTimeout(r, ms))

async function waitUntil(predicate: () => Promise<boolean>, timeout: number = 30, period = 1000) {
    const mustEnd = Date.now() + timeout * 1000;
    while (Date.now() < mustEnd) {
        if (await predicate()) {
            return true;
        } else {
            await wait(period)
        }
    }

    return false;
}

describe('IntentBuilder e2e test', () => {
    let provider: Provider;
    let wallet: Wallet;
    let prevIntents: SignedIntent[] = [];

    before(() => {
        DefaultConf.ROPSTEN.asDefault();
        wallet = new Wallet('0x' + crypto.randomBytes(32).toString('hex'));
        provider = new Provider(ETH_NODE, RELAYER);
    });
    it("Should relay a ERC20 transfer and succeed", async () => {
        const walletReceiver = new Wallet('0x' + crypto.randomBytes(32).toString('hex'));

        const intentAction = new ERC20(TEST_ERC20).transfer(walletReceiver.address, 0);
        const intent = new IntentBuilder().withIntentAction(intentAction).build();

        const signedIntent = wallet.sign(intent);
        const result = await signedIntent.relay(provider);

        equal(
            (await signedIntent.status(provider)).code,
            StatusCode.Pending
        );

        ok(await waitUntil(async () => (await signedIntent.status(provider)).code === StatusCode.Settling, 640));
        ok((await signedIntent.status(provider)).receipt!.success);

        prevIntents.push(signedIntent);
    });
    it("Should relay a ERC20 transfer and fail", async () => {
        const walletReceiver = new Wallet('0x' + crypto.randomBytes(32).toString('hex'));

        const intentAction = new ERC20(TEST_ERC20_2).transfer(walletReceiver.address, bn(120) * bn(10).pow(bn(18)));
        const intent = new IntentBuilder().withIntentAction(intentAction).build();

        const signedIntent = wallet.sign(intent);
        const result = await signedIntent.relay(provider);

        equal(
            (await signedIntent.status(provider)).code,
            StatusCode.Pending
        );

        ok(await waitUntil(async () => (await signedIntent.status(provider)).code === StatusCode.Settling, 640));
        equal((await signedIntent.status(provider)).receipt!.success, false);

        prevIntents.push(signedIntent);
    });
    it("Should relay intent with dependency", async () => {
        const walletReceiver = new Wallet('0x' + crypto.randomBytes(32).toString('hex'));

        const intentAction = new ERC20(TEST_ERC20).transfer(walletReceiver.address, 0);
        const intent = new IntentBuilder().withIntentAction(intentAction).withDependencies([prevIntents[0]]).build();

        const signedIntent = wallet.sign(intent);
        const result = await signedIntent.relay(provider);

        equal(
            (await signedIntent.status(provider)).code,
            StatusCode.Pending
        );

        ok(await waitUntil(async () => (await signedIntent.status(provider)).code === StatusCode.Settling, 640));
        ok((await signedIntent.status(provider)).receipt!.success);

        prevIntents.push(signedIntent);
    });
    it("Should relay intent with multiple dependency", async () => {
        const walletReceiver = new Wallet('0x' + crypto.randomBytes(32).toString('hex'));

        const intentAction = new ERC20(TEST_ERC20).transfer(walletReceiver.address, 0);
        const intent = new IntentBuilder().withIntentAction(intentAction).withDependencies(prevIntents).build();

        const signedIntent = wallet.sign(intent);
        const result = await signedIntent.relay(provider);

        equal(
            (await signedIntent.status(provider)).code,
            StatusCode.Pending
        );

        ok(await waitUntil(async function () {
            const status = await signedIntent.status(provider);
            return status.code === StatusCode.Settling || status.code === StatusCode.Completed;
        }, 640));

        ok((await signedIntent.status(provider)).receipt!.success);

        prevIntents.push(signedIntent);
    });
})
