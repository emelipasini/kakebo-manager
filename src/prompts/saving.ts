import inquirer from "inquirer";

import { saveSaving } from "../services/saving.js";

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

export default function addSaving(): void {
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
