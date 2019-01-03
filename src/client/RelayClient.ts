import * as RequestClient from 'request-promise-native';
import { RequestPromiseOptions, FullResponse } from 'request-promise-native';
import { SignedIntent } from "../model/SignedIntent"
import { IntentTxRequest } from "../model/request/IntentTxRequest"
import { IntentResponse } from "../model/response/IntentResponse"
import { IntentRequest } from "../model/request/IntentRequest"
import { SignatureData } from '../model/SignatureData';
import { SignatureDataRequest } from '../model/request/SignatureDataRequest';


export class RelayClient {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    public post(signedIntent: SignedIntent): IntentResponse {
        let options: RequestPromiseOptions = {};
        let requestBody = JSON.stringify(this.transform(signedIntent));
        console.log("RequestBody: ", requestBody);
        options.form = requestBody;
        options.resolveWithFullResponse = true;

        let intentResponse: IntentResponse = new IntentResponse(200)
        async () => {
            let response: FullResponse = await RequestClient.post(`${this.path}/relay`, options)
            intentResponse.setStatusCode(response.statusCode);
        }
        return intentResponse;
    }

    // Move method to class.
    private transform(signedIntent: SignedIntent): IntentRequest {
        let request: IntentRequest = new IntentRequest();

        let intent = signedIntent.getIntent();
        request.setId(intent.getId());
        request.setDependencies(intent.getDependencies());
        request.setSignature(this.transformSignatureData(signedIntent.getSignatureData()));
        request.setSigner(intent.getSigner());
        request.setWallet(intent.getWallet());
        request.setSalt(intent.getSalt());

        let intentTxRequest: IntentTxRequest = new IntentTxRequest();
        intentTxRequest.setData(intent.getData());
        intentTxRequest.setMaxGasPrice(intent.getMaxGasPrice());
        intentTxRequest.setMinGasLimit(intent.getMinGasLimit());
        intentTxRequest.setValue(String(intent.getValue()));

        request.setTx(intentTxRequest);
        return request;
    }

    // Move method to class.
    private transformSignatureData(signatureData: SignatureData): SignatureDataRequest {
        let signatureRequest: SignatureDataRequest = new SignatureDataRequest();
        signatureRequest.setR(signatureData.getR());
        signatureRequest.setS(signatureData.getS());
        signatureRequest.setV(signatureData.getV());
        return signatureRequest;
    }

}