import { resolve, dirname } from "node:path";
import { readFileSync, writeFileSync } from "node:fs";

import Saving from "../types/saving.js";

const DB_PATH = resolve(dirname("."), "database", "savings.json");

const getSavings = (): Saving[] => {
    const data: string = readFileSync(DB_PATH, "utf8");
    const savings: Saving[] = JSON.parse(data) as Saving[];
    return savings;
};

export const getMonthSavings = (): Saving[] => {
    const savings = getSavings();
    const month = new Date().getMonth();
    const year = new Date().getFullYear();
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
