
import { EventRoute } from "./EventRoute";

const event = {
    'address': '0x8c7abfbe7ae638c6ba9c3eec0e362d6026929cee',
    'eventNames': ['test'],
    'blockConfirmations': 6,
    'abi': '[{"constant":false,"inputs":[{"name":"number","type":"uint256"}],"name":"test","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"number","type":"uint256"}],"name":"Test","type":"event"}]'
}


const eventRoute: EventRoute = new EventRoute();
console.log(".....")
eventRoute.addEvent(event);
eventRoute.work();


