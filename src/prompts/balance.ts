import chalk from "chalk";

import { calculateBalanceStatistics, getBalanceData, getLastBalance } from "../services/balance.js";

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

export function seeLastMonthBalance(): void {
    const lastBalance = getLastBalance();
    const totalExpenses =
        lastBalance.fixed + lastBalance.necessary + lastBalance.treat + lastBalance.culture + lastBalance.extra;

    console.log(chalk.magenta(`\n=========== Balance ${lastBalance.date} ==========\n`));

    console.log(`Income: ${lastBalance.income}€`);
    console.log(`Saving: ${lastBalance.saving}€`);
    console.log(chalk.green(`Total: ${lastBalance.income + lastBalance.saving}€\n`));

    console.log(`Fixed: ${lastBalance.fixed}€`);
    console.log(`Necessary: ${lastBalance.necessary}€`);
    console.log(`Treat: ${lastBalance.treat}€`);
    console.log(`Culture: ${lastBalance.culture}€`);
    console.log(`Extra: ${lastBalance.extra}€`);
    console.log(chalk.red(`Total: ${totalExpenses}€`));

    console.log(chalk.blue(`\nMoney left: ${lastBalance.income - totalExpenses}€`));

    console.log(chalk.magenta("\n==========================================\n"));
}
