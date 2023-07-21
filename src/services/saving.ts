import { resolve, dirname } from "node:path";
import { writeFileSync } from "node:fs";

import Saving from "../models/saving.js";

const DB_PATH = resolve(dirname("."), "database/savings.json");

export const saveSaving = (description: string, amount: number): Saving => {
    const newSaving = new Saving(amount, description);
    const data = JSON.stringify(newSaving);
    writeFileSync(DB_PATH, data);
    return newSaving;
};
