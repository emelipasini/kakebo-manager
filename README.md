# Kakebo Manager

Kakebo or [Kakeibo](https://en.wikipedia.org/wiki/Kakeibo) is a Japanese saving method. The word "kakeibo" can be translated "household ledger" and is literally meant for household financial management. At the beginning of the month, the kakeibo writes down the income and necessary expenses for the beginning month and decides some kind of savings target. The user then records their own expenses on a daily basis, which are added together first at the end of the week and later at the end of the month. At the end of the month, a summary of the month's spending is written in kakeibo. In addition to expenses and income, thoughts and observations are written in kakeibo with the aim of raising awareness of one's own consumption.

Kakebo specifies 4 pillars or categories of spending:

-   Necessary: the essentials like housing, groceries, car payments, or student loans.
-   Treat: enjoyable but not totally necessary purchases (takeout food, hobbies, entertainment).
-   Culture: any spending on cultural activities — books, museum fees, concert tickets, TV streaming services, etc.
-   Extra: other expenses that crop up, like medical bills or home repairs.

To these categories I added a fifth: `Fixed` for expenses that are fixed and are not going to change in the near future. For example, the rent of the house or the car payment.

## Menu

The menu allows you to do the following actions:

-   Add expense/income: add a new expense, to simplify incomes are a type of expenses, it is indicated with the type of expense `income`.
-   Add/Subtract saving: add a new saving, savings can be positive or negative. If you spend money from your savings you can add a negative one.
-   Partial balance: show the partial balance of the month with days and money left.
-   Last month balance: show the balance of the last month.

## Structure

src/

-   prompts: console printing related
-   services: business logic
-   type: classes and types
-   index.ts: menu

## How to use

First of all you need to install the dependencies and then build the project

```bash
npm install

npm run build
```

Then you can run the project with

```bash
npm start
```
