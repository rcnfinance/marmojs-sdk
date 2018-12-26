import { IntentAction } from '../IntentAction';

export interface IERC20 {

    totalSupply(): IntentAction;

    balanceOf(who: string): IntentAction;

    allowance(owner:string, spender: string): IntentAction;

    transfer(to: string, value: number): IntentAction;

    approve(to: string, value: number): IntentAction;

    transferFrom(from: string, to: string, value: number): IntentAction;

}