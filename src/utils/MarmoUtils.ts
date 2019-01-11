import { Intent } from "../model/Intent"
import { SignedIntent } from "../model/SignedIntent"
import { SignatureData } from "../model/SignatureData"
import { simpleEncode } from "ethereumjs-abi"
import { generateAddress2, bufferToHex } from 'ethereumjs-util'
import { IntentRequest } from "../model/request/IntentRequest"
import { SignatureDataRequest } from '../model/request/SignatureDataRequest'
import { IntentTxRequest } from "../model/request/IntentTxRequest"
import * as signUtil from "eth-sig-util"
import * as ethUtil from 'ethereumjs-util'


const BYTECODE_1 = "6080604052348015600f57600080fd5b50606780601d6000396000f3fe6080604052366000803760008036600073";
const BYTECODE_2 = "5af43d6000803e8015156036573d6000fd5b3d6000f3fea165627a7a7230582033b260661546dd9894b994173484da72335f9efc37248d27e6da483f15afc1350029";
const MARMO_CREATOR_ADDRESS = "0x1053deb5e0f1697289b8a1b11aa870f07a7fb221";
const MARMO_ADDRESS = "3618a379f2624f42c0a8c79aad8db9d24d6e0312";
const SIZE: number = 64;
const PREFIX = "0x";

const Web3 = require('web3');
const web3 = new Web3();

/**
 * Generates an address for a contract created using CREATE2
 * @param {strin} signer a signer
 * @return {string}
 */
export function generateAddress(signer: string): string {
    let salt = toHexStringZeroPadded(signer, SIZE)
    return bufferToHex(generateAddress2(MARMO_CREATOR_ADDRESS, salt, getInitCode()));
}

function getInitCode() {
    return PREFIX + BYTECODE_1 + MARMO_ADDRESS + BYTECODE_2;
}

export function toHexStringZeroPadded(value: string, lenght: number): string {
    return PREFIX + toHexStringNoPrefixZeroPadded(value, lenght);
}


export function toHexStringNoPrefixZeroPadded(value: string, lenght: number): string {
    let source: string = value;
    source = source.replace(PREFIX, '');
    if (source.length < lenght) {
        const diff = lenght - source.length;
        source = '0'.repeat(diff) + source;
    }
    return source;
}

export function sign(intent: Intent, privateKey: string): SignedIntent {
    const privKey = new Buffer(privateKey, 'hex')
    const message = intent.getEncodePacked()
    const msgParams = {
        data: message,
        sig: undefined
    }

    const signature = signUtil.personalSign(privKey, msgParams)
    msgParams.sig = signature

    const recovered = signUtil.recoverPersonalSignature(msgParams)
    if (recovered.toString() !== intent.getSigner().toLocaleLowerCase()) {
        throw new Error("The signature is invalid")
    }

    let splitSignature = this.splitSignature(signature)
    const signatureData: SignatureData = new SignatureData(splitSignature.v, splitSignature.r, splitSignature.s);
    let signedIntent: SignedIntent = new SignedIntent();
    signedIntent.setIntent(intent);
    signedIntent.setSignatureData(signatureData);
    return signedIntent;
}

export function splitSignature(signature) {
    const signatureData = ethUtil.fromRpcSig(signature);
    const v = ethUtil.bufferToInt(signatureData.v);
    const r = ethUtil.bufferToHex(signatureData.r);
    const s = ethUtil.bufferToHex(signatureData.s);
    const splitSignature = {
      signatureData,
      v,
      r,
      s
    };
    return splitSignature;
  }

/**
 * Create data field based on smart contract function signature and arguments.
 *
 * @param functionSignature E.g. setName(string)
 * @param functionParameters E.g. A comma separated string. Eg. joaquin
 * @returns {string} 0x prefixed hex string
 */
export function encodeDataPayload(functionSignature: string , functionParameters: string) {
    const params = functionParameters.split(",").filter((x) => x.trim());
    const signatureArgs = [functionSignature].concat(params);
    return PREFIX + simpleEncode.apply(this, signatureArgs).toString("hex");
}

// Move method to class.
export function transformSignedIntent(signedIntent: SignedIntent): IntentRequest {
    let request: IntentRequest = new IntentRequest();

    let intent = signedIntent.getIntent();
    request.setId(intent.getId());
    request.setDependencies(intent.getDependencies());
    request.setSignature(transformSignatureData(signedIntent.getSignatureData()));
    request.setSigner(intent.getSigner());
    request.setWallet(intent.getWallet());
    request.setExpiration(intent.getExpiration());
    request.setSalt(intent.getSalt());

    let intentTxRequest: IntentTxRequest = new IntentTxRequest();
    intentTxRequest.setTo(intent.getTo())
    intentTxRequest.setData(intent.getData());
    intentTxRequest.setMaxGasPrice(intent.getMaxGasPrice());
    intentTxRequest.setMinGasLimit(intent.getMinGasLimit());
    intentTxRequest.setValue(String(intent.getValue()));

    request.setTx(intentTxRequest);
    return request;
}

// Move method to class.
function transformSignatureData(signatureData: SignatureData): SignatureDataRequest {
    let signatureRequest: SignatureDataRequest = new SignatureDataRequest();
    signatureRequest.setR(signatureData.getR());
    signatureRequest.setS(signatureData.getS());
    signatureRequest.setV(signatureData.getV());
    return signatureRequest;
}
