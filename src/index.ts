import inquirer from "inquirer";

import expenseQuestions from "./questions/expense.js";
import savingQuestions from "./questions/saving.js";

import type ExpenseType from "./types/expense-type.js";

import { saveExpense } from "./services/expense.js";
import { saveSaving } from "./services/saving.js";

/* eslint-disable no-console */
console.log("\n====== Kakebo Manager ======\n");

inquirer
    .prompt({
        type: "list",
        name: "menu",
        message: "What would you like to do?",
        choices: ["Add expense", "Add saving", "Create budget", "Consult balance"],
    })
    .then((answers: { menu: string }) => {
        if (answers.menu === "Add expense") {
            inquirer
                .prompt(expenseQuestions)
                .then((answers: { description: string; amount: number; type: ExpenseType }) => {
                    console.log("\n============================");
                    const newExpense = saveExpense(answers.description, answers.amount, answers.type);
                    console.log(newExpense);
                })
                .catch((error) => {
                    console.error(error);
                });
        } else if (answers.menu === "Add saving") {
            inquirer
                .prompt(savingQuestions)
                .then((answers: { description: string; amount: number }) => {
                    console.log("\n============================");
                    const newSaving = saveSaving(answers.description, answers.amount);
                    console.log(newSaving);
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    })
    .catch((error) => {
        console.error(error);
    });
