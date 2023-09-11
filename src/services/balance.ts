import { getMonthExpenses } from "./expense.js";
import { getMonthSavings } from "./saving.js";

import ExpenseType from "../types/expense-type.js";
import BalanceData from "../types/balance-data.js";

import type Expense from "../types/expense.js";
import type Saving from "../types/saving.js";

export const getBalanceData = (): BalanceData => {
    const expenses = getMonthExpenses();
    const savings = getMonthSavings();

    const data = getDataByCategory(expenses, savings);
    return data;
};

const getDataByCategory = (expenses: Expense[], savings: Saving[]): BalanceData => {
    const data = new BalanceData();

    for (const expense of expenses) {
        if (expense.expenseType === ExpenseType.Income) {
            data.income += parseFloat(expense.amount as unknown as string);
            data.incomeCant++;
        } else if (expense.expenseType === ExpenseType.Fixed) {
            data.fixed += parseFloat(expense.amount as unknown as string);
            data.fixedCant++;
        } else if (expense.expenseType === ExpenseType.Necessary) {
            data.necessary += parseFloat(expense.amount as unknown as string);
            data.necessaryCant++;
        } else if (expense.expenseType === ExpenseType.Treat) {
            data.treat += parseFloat(expense.amount as unknown as string);
            data.treatCant++;
        } else if (expense.expenseType === ExpenseType.Culture) {
            data.culture += parseFloat(expense.amount as unknown as string);
            data.cultureCant++;
        } else if (expense.expenseType === ExpenseType.Extra) {
            data.extra += parseFloat(expense.amount as unknown as string);
            data.extraCant++;
        }
    }

    data.saving = savings.reduce((acc, saving) => acc + parseFloat(saving.amount as unknown as string), 0);
    data.savingCant = savings.length;

    return data;
};

export const calculateBalanceStatistics = (
    balanceData: BalanceData
): {
    daysLeft: number;
    monthLeftPercentage: number;
    moneyLeftPercentage: number;
    totalExpenses: number;
} => {
    const totalExpenses =
        balanceData.fixed + balanceData.necessary + balanceData.treat + balanceData.culture + balanceData.extra;

    let moneyLeftPercentage = 0;
    if (balanceData.income > 0) {
        const moneySpend = (totalExpenses * 100) / balanceData.income;
        moneyLeftPercentage = Math.round(100 - moneySpend);
    }

    const today = new Date();
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysLeft = lastDayOfMonth.getDate() - today.getDate();

    const daysPassed = (today.getDate() * 100) / lastDayOfMonth.getDate();
    const monthLeftPercentage = Math.round(100 - daysPassed);

    return { daysLeft, monthLeftPercentage, moneyLeftPercentage, totalExpenses };
};
