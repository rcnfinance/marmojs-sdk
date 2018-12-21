import { IntentBuilder } from './builder/IntentBuilder';
import { IntentAction } from './model/IntentAction'
//mport { Intent } from './model/Intent'

console.log('See this in your browser console: Typescript Webpack Starter Launched');


let tokenContractAddress: string = "0x2f45b6fb2f28a73f110400386da31044b2e953d4"; //RCN Token
let to: string = "0x7F5EB5bB5cF88cfcEe9613368636f458800e62CB";

let intentAction: IntentAction = new IntentAction();
intentAction.setData("a");
intentAction.setTo(to)
intentAction.setValue(0);

//Credentials credentials = Credentials.create("512850c7ebe3e1ade1d0f28ef6eebdd3ba4e78748e0682f8fda6fc2c2c5b334a");
let contractAddress: string = "0xDc3914BEd4Fc2E387d0388B2E3868e671c143944";
let intent: IntentBuilder = new IntentBuilder();
intent.withSigner("credentials.getAddress()")
    .withWallet(contractAddress)
    .withIntentAction(intentAction)
    .build();


const builder = new IntentBuilder();

console.log(builder);
