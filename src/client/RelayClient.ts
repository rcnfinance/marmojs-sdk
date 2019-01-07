import * as RequestClient from 'request-promise-native';
import { RequestPromiseOptions, FullResponse } from 'request-promise-native';
import { SignedIntent } from "../model/SignedIntent"
import { IntentResponse } from "../model/response/IntentResponse"
import { transformSignedIntent } from "../utils/MarmoUtils";

export class RelayClient {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    public post(signedIntent: SignedIntent): IntentResponse {
        let options: RequestPromiseOptions = {};
        let requestBody = JSON.stringify(transformSignedIntent(signedIntent));
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

}