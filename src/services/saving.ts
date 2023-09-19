import { resolve, dirname } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";

import Saving from "../types/saving.js";

const DB_PATH = resolve(dirname("."), "database", "savings.json");

const getSavings = (): Saving[] => {
    const data: string = readFileSync(DB_PATH, "utf8");
    const savings: Saving[] = JSON.parse(data) as Saving[];
    return savings;
};

export const getMonthSavings = (month?: number, year?: number): Saving[] => {
    const savings = getSavings();
    month = month ?? new Date().getMonth();
    year = year ?? new Date().getFullYear();
    return savings.filter(
        (saving) => new Date(saving.date).getMonth() === month && new Date(saving.date).getFullYear() === year
    );
};

export const saveSaving = (description: string, amount: number): Saving => {
    const newSaving = new Saving(amount, description);
    const savings = getSavings();
    savings.push(newSaving);
    writeFileSync(DB_PATH, JSON.stringify(savings));
    return newSaving;
};

export const getTotalSavings = (): { totalSavings: number; savingsByMonth: Record<string, number> } => {
    const savings = getSavings();

    const savingsByMonth = savings.reduce<Record<string, number>>((acc, saving) => {
        const date = new Date(saving.date);

        const month = date.toLocaleDateString("en-US", { month: "long" });
        const year = date.getFullYear();

        const key = `${month} ${year}`;
        if (acc[key] === undefined) {
            acc[key] = 0;
        }
        acc[key] = acc[key] + parseFloat(saving.amount as unknown as string);
        return acc;
    }, {});

    const totalSavings = savings.reduce((acc, saving) => acc + parseFloat(saving.amount as unknown as string), 0);

    return { totalSavings, savingsByMonth };
};
