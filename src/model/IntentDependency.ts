import { Dependency } from "./Dependency";

export class IntentDependency implements Dependency {
    address: string;
    id: string;

    constructor(
        address: string,
        id: string
    ) {
        this.address = address;
        this.id = id;
    }
}