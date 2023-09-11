import chalk from "chalk";

import { calculateBalanceStatistics, getBalanceData } from "../services/balance.js";

export default function seePartialBalance(): void {
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
