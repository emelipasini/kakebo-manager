import { userInfo } from "node:os";
import inquirer from "inquirer";
import chalk from "chalk";

import addExpense from "./prompts/expense.js";
import addSaving from "./prompts/saving.js";
import seePartialBalance from "./prompts/balance.js";

import type Saving from "./types/saving.js";
import type Expense from "./types/expense.js";
import type Balance from "./types/balance.js";

export function menu(): void {
    greet();

    inquirer
        .prompt({
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: ["Add expense", "Add saving", "Create budget", "Consult partial balance", "Exit"],
        })
        .then((answers: { menu: string }) => {
            if (answers.menu === "Add expense") {
                addExpense();
            } else if (answers.menu === "Add saving") {
                addSaving();
            } else if (answers.menu === "Consult partial balance") {
                seePartialBalance();
            } else if (answers.menu === "Exit") {
                exit();
            }
        })
        .catch((error) => {
            console.error(error);
        });
}

export function printData(entity: Saving | Expense | Balance): void {
    console.log(chalk.magenta("\n==========================================\n"));
    console.log(entity);
}

function greet(): void {
    let username = userInfo().username;
    username = username.charAt(0).toUpperCase() + username.slice(1);
    console.log(chalk.magenta("\n============= Kakebo Manager =============\n"));
    console.log(chalk.blue(`Welcome ${username}!\n`));
}

function exit(): void {
    console.log(chalk.blue("\nGoodbye! :D"));
    console.log(chalk.magenta("\n==========================================\n"));
    process.exit(0);
}

menu();
