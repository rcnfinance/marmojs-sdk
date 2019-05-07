import { SignedIntent } from "../model/SignedIntent"
import { IntentResponse } from "../model/response/IntentResponse"
import axios from 'axios';

export class RelayClient {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    async post(signedIntent: SignedIntent): Promise<IntentResponse> {
        const data = signedIntent.toJson();

        let config = {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': ''
            }
        }

        const intentResponse: IntentResponse = new IntentResponse(200)

        axios.post(this.path + '/v2/relay', data, config).then((res) => {
            intentResponse.statusCode = res.status;
        })

        return intentResponse;
    }

}