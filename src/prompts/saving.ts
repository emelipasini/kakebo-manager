import inquirer from "inquirer";
import chalk from "chalk";

import { saveSaving, getTotalSavings } from "../services/saving.js";

import { menu, printData } from "../index.js";

const savingQuestions = [
    {
        type: "input",
        name: "description",
        message: "Saving description:",
        validate(value: string) {
            const valid = isNaN(parseFloat(value)) && value.length > 0;
            return valid || "Please enter a description";
        },
    },
    {
        type: "input",
        name: "amount",
        message: "Saving amount:",
        validate(value: string) {
            const valid = !isNaN(parseFloat(value));
            return valid || "Please enter a number";
        },
    },
];

export function addSaving(): void {
    inquirer
        .prompt(savingQuestions)
        .then((answers: { description: string; amount: number }) => {
            const newSaving = saveSaving(answers.description, answers.amount);
            printData(newSaving);
            menu();
        })
        .catch((error) => {
            console.error(error);
        });
}

export const checkSavings = (): void => {
    const { totalSavings, savingsByMonth } = getTotalSavings();

    console.log(chalk.magenta("\n================= Savings ================\n"));

    Object.entries(savingsByMonth).forEach(([monthYear, amount]) => {
        console.log(`${monthYear}: ${amount}€`);
    });

    console.log(chalk.green(`\nTotal: ${totalSavings}€`));

    console.log(chalk.magenta("\n==========================================\n"));

    menu();
};
