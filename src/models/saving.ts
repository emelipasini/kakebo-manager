import { type UUID, randomUUID } from "crypto";

class Saving {
    id: UUID;
    amount: number;
    description: string;
    date: Date;

    constructor(amount: number, description: string) {
        this.id = randomUUID();
        this.amount = amount;
        this.description = description;
        this.date = new Date();
    }
}

export default Saving;
