
import { EventRoute } from "./EventRoute";

const event = {
    'address': '0xcca95e580bbbd04851ebfb85f77fd46c9b91f11c',
    'events': ['LockedBalance'],
    'confirmations': 6,
    'abi': '[{"constant":false,"inputs":[{"name":"target","type":"address"}],"name":"setTargetContract","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"totalLocked","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_acceptingDeposits","type":"bool"}],"name":"changeContractState","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_from","type":"address"},{"name":"mana","type":"uint256"}],"name":"lockMana","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"manaToken","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"landClaim","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"lockedBalance","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"acceptingDeposits","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"payable":false,"type":"function"},{"inputs":[{"name":"_token","type":"address"}],"payable":false,"type":"constructor"},{"payable":true,"type":"fallback"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"mana","type":"uint256"}],"name":"LockedBalance","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"target","type":"address"}],"name":"LandClaimContractSet","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"user","type":"address"},{"indexed":false,"name":"value","type":"uint256"},{"indexed":false,"name":"data","type":"bytes"}],"name":"LandClaimExecuted","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"name":"_acceptingDeposits","type":"bool"}'
}


const eventRoute: EventRoute = new EventRoute();
console.log(".....")
eventRoute.init();
eventRoute.addEvent(event);
