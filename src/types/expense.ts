import { type UUID, randomUUID } from "node:crypto";

import type ExpenseType from "./expense-type.js";

class Expense {
    id: UUID;
    description: string;
    amount: number;
    expenseType: ExpenseType;
    date: Date;

    constructor(description: string, amount: number, expenseType: ExpenseType, date: string) {
        this.id = randomUUID();
        this.description = description;
        this.amount = amount;
        this.expenseType = expenseType;

        const [day, month, year] = date.split("/");

        const expenseDate = new Date();
        expenseDate.setDate(Number(day));
        expenseDate.setMonth(Number(month) - 1);
        expenseDate.setFullYear(Number(year));

        this.date = new Date(expenseDate);
    }
}

export default Expense;
