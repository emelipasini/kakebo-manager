import { type UUID, randomUUID } from "crypto";

import type ExpenseType from "../types/expense-type";

class Expense {
    id: UUID;
    description: string;
    amount: number;
    expenseType: ExpenseType;
    date: Date;

    constructor(description: string, amount: number, expenseType: ExpenseType) {
        this.id = randomUUID();
        this.description = description;
        this.amount = amount;
        this.expenseType = expenseType;
        this.date = new Date();
    }
}

export default Expense;
