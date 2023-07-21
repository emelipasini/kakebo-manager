import { resolve, dirname } from "node:path";
import { writeFileSync } from "node:fs";

import type ExpenseType from "../types/expense-type.js";

import Expense from "../models/expense.js";

const DB_PATH = resolve(dirname("."), "database/expenses.json");

export const saveExpense = (description: string, amount: number, expenseType: ExpenseType): Expense => {
    const newExpense = new Expense(description, amount, expenseType);
    const data = JSON.stringify(newExpense);
    writeFileSync(DB_PATH, data);
    return newExpense;
};
