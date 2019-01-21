import * as RequestClient from 'request-promise-native';
import { RequestPromiseOptions, FullResponse } from 'request-promise-native';
import { SignedIntent } from "../model/SignedIntent"
import { IntentResponse } from "../model/response/IntentResponse"

export class RelayClient {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    async post(signedIntent: SignedIntent): Promise<IntentResponse> {
        const options: RequestPromiseOptions = {};
        options.form = signedIntent.toJson();
        options.resolveWithFullResponse = true;

        const intentResponse: IntentResponse = new IntentResponse(200)
        const response: FullResponse = await RequestClient.post(this.path, options)
        intentResponse.statusCode = response.statusCode;

        return intentResponse;
    }
}
