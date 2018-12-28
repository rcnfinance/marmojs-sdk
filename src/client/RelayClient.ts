import * as request from "request-promise-native";
import { SignedIntent } from "../model/signedIntent"
import { IntentResponse } from "../model/response/IntentResponse"
import { IntentRequest } from "../model/request/IntentRequest"


export class RelayClient {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }

    public post(signedIntent: SignedIntent): IntentResponse {
        // TODO
        return null;
    }

    private transform(signedIntent: SignedIntent): IntentRequest {
        // TODO
        return null;
    }

}