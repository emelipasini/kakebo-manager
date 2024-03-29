import { resolve, dirname } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";

import Expense from "../types/expense.js";

import type ExpenseType from "../types/expense-type.js";

const DB_PATH = resolve(dirname("."), "database", "expenses.json");

const getExpenses = (): Expense[] => {
    const data: string = readFileSync(DB_PATH, "utf8");
    const expenses: Expense[] = JSON.parse(data) as Expense[];
    return expenses;
};

export const getMonthExpenses = (month?: number, year?: number): Expense[] => {
    const expenses = getExpenses();
    month = month ?? new Date().getMonth();
    year = year ?? new Date().getFullYear();
    return expenses.filter(
        (expense) => new Date(expense.date).getMonth() === month && new Date(expense.date).getFullYear() === year
    );
};

export const saveExpense = (description: string, amount: number, expenseType: ExpenseType, date: string): Expense => {
    const newExpense = new Expense(description, amount, expenseType, date);
    const expenses = getExpenses();
    expenses.push(newExpense);
    writeFileSync(DB_PATH, JSON.stringify(expenses));
    return newExpense;
};
