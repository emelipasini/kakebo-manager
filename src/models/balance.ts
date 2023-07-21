import { type UUID, randomUUID } from "node:crypto";

import type ShortDate from "../types/short-date.js";

class Balance {
    id: UUID;
    date: ShortDate;
    income: number;
    fixed: number;
    necessary: number;
    saving: number;
    treat: number;
    culture: number;
    extra: number;

    constructor(
        income: number,
        fixed: number,
        necessary: number,
        saving: number,
        treat: number,
        culture: number,
        extra: number
    ) {
        const time = new Date();
        const month = time.toLocaleDateString("en-US", { month: "long" });
        const year = time.getFullYear();

        this.id = randomUUID();
        this.date = `${month} ${year}`;
        this.income = income;
        this.fixed = fixed;
        this.necessary = necessary;
        this.saving = saving;
        this.treat = treat;
        this.culture = culture;
        this.extra = extra;
    }
}

export default Balance;
