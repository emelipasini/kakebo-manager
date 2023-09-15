import { type UUID, randomUUID } from "node:crypto";

import type ShortDate from "./short-date.js";

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
        date: ShortDate,
        income: number,
        fixed: number,
        necessary: number,
        saving: number,
        treat: number,
        culture: number,
        extra: number
    ) {
        this.id = randomUUID();
        this.date = date;
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
