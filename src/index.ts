import { userInfo } from "node:os";
import inquirer from "inquirer";

import addExpense from "./prompts/expense.js";
import addSaving from "./prompts/saving.js";

import type Saving from "./models/saving.js";
import type Expense from "./models/expense.js";

export function menu(): void {
    greet();

    inquirer
        .prompt({
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: ["Add expense", "Add saving", "Create budget", "Consult balance", "Exit"],
        })
        .then((answers: { menu: string }) => {
            if (answers.menu === "Add expense") {
                addExpense();
            } else if (answers.menu === "Add saving") {
                addSaving();
            } else if (answers.menu === "Exit") {
                exit();
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

export function printData(entity: Saving | Expense): void {
    console.log("\n==========================================\n");
    console.log(entity);
}

function greet(): void {
    let username = userInfo().username;
    username = username.charAt(0).toUpperCase() + username.slice(1);
    console.log("\n============= Kakebo Manager =============\n");
    console.log(`Welcome ${username}!\n`);
}

function exit(): void {
    console.log("\nGoodbye! :D");
    console.log("\n==========================================\n");
    process.exit(0);
}

menu();
