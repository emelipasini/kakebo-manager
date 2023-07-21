import inquirer from "inquirer";

import { saveExpense } from "../services/expense.js";

import { menu, printData } from "../index.js";

import ExpenseType from "../types/expense-type.js";

const expenseQuestions = [
    {
        type: "input",
        name: "description",
        message: "Expense description:",
        validate(value: string) {
            const valid = isNaN(parseFloat(value)) && value.length > 0;
            return valid || "Please enter a description";
        },
    },
    {
        type: "input",
        name: "amount",
        message: "Expense amount:",
        validate(value: string) {
            const valid = !isNaN(parseFloat(value));
            return valid || "Please enter a number";
        },
    },
    {
        type: "list",
        name: "type",
        message: "Expense type:",
        choices: [
            ExpenseType.Necessary,
            ExpenseType.Treat,
            ExpenseType.Culture,
            ExpenseType.Extra,
            ExpenseType.Fixed,
            ExpenseType.Income,
        ],
        filter(val: string) {
            return val;
        },
    },
];

export default function addExpense(): void {
    inquirer
        .prompt(expenseQuestions)
        .then((answers: { description: string; amount: number; type: ExpenseType }) => {
            const newExpense = saveExpense(answers.description, answers.amount, answers.type);
            printData(newExpense);
            menu();
        })
        .catch((error) => {
            console.error(error);
        });
}
