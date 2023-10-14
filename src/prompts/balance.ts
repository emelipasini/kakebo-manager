import inquirer from "inquirer";
import chalk from "chalk";

import { calculateBalanceStatistics, getBalanceData, getBalance } from "../services/balance.js";

import { getShortDate } from "../types/short-date.js";

import type ShortDate from "../types/short-date.js";
import type Balance from "../types/balance.js";

export function seePartialBalance(): void {
    const balanceData = getBalanceData();
    const { daysLeft, monthLeftPercentage, moneyLeftPercentage, totalExpenses } =
        calculateBalanceStatistics(balanceData);

    console.log(chalk.magenta("\n============= Partial balance ============\n"));

    console.log(`+ Income (${balanceData.incomeCant}): ${balanceData.income}€`);
    console.log(`+ Saving (${balanceData.savingCant}): ${balanceData.saving}€`);
    console.log(chalk.green(`Total: ${balanceData.income + balanceData.saving}€\n`));

    console.log(`- Fixed (${balanceData.fixedCant}): ${balanceData.fixed}€`);
    console.log(`- Necessary (${balanceData.necessaryCant}): ${balanceData.necessary}€`);
    console.log(`- Treat (${balanceData.treatCant}): ${balanceData.treat}€`);
    console.log(`- Culture (${balanceData.cultureCant}): ${balanceData.culture}€`);
    console.log(`- Extra (${balanceData.extraCant}): ${balanceData.extra}€`);
    console.log(chalk.red(`Total: ${totalExpenses}€`));

    console.log(
        chalk.blue(
            `\nDays left: ${daysLeft} - ${monthLeftPercentage}% | Money left: ${
                balanceData.income - totalExpenses
            }€ - ${moneyLeftPercentage}%`
        )
    );
    console.log(chalk.magenta("\n==========================================\n"));
}

const balanceQuestions = [
    {
        type: "input",
        name: "date",
        default: getShortDate({ lastMonth: true }),
        message: "Balance date: (Month Year)",
        validate(value: ShortDate) {
            const [monthName, year] = value.split(" ");
            const valid = monthName !== undefined && year !== undefined;
            return valid || "Please enter a date";
        },
    },
];

export function seeBalance(): void {
    inquirer
        .prompt(balanceQuestions)
        .then((answers: { date: string }) => {
            const balance = getBalance(answers.date as ShortDate);
            printBalance(balance);
        })
        .catch((error) => {
            console.error(error);
        });
}

function printBalance(balance: Balance): void {
    const totalExpenses = balance.fixed + balance.necessary + balance.treat + balance.culture + balance.extra;

    console.log(chalk.magenta(`\n=========== Balance ${balance.date} ==========\n`));

    console.log(`Income: ${balance.income}€`);
    console.log(`Saving: ${balance.saving}€`);
    console.log(chalk.green(`Total: ${balance.income + balance.saving}€\n`));

    console.log(`Fixed: ${balance.fixed}€`);
    console.log(`Necessary: ${balance.necessary}€`);
    console.log(`Treat: ${balance.treat}€`);
    console.log(`Culture: ${balance.culture}€`);
    console.log(`Extra: ${balance.extra}€`);
    console.log(chalk.red(`Total: ${totalExpenses}€`));

    console.log(chalk.blue(`\nMoney left: ${balance.income - totalExpenses}€`));

    console.log(chalk.magenta("\n==========================================\n"));
}
