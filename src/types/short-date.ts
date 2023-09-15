type ShortDate = `${string} ${number}`;

export default ShortDate;

export const getShortDate = ({ lastMonth = false }): ShortDate => {
    const time = new Date();

    if (lastMonth) {
        time.setMonth(time.getMonth() - 1);
    }

    const month = time.toLocaleDateString("en-US", { month: "long" });
    const year = time.getFullYear();

    return `${month} ${year}`;
};

export const getShortDateFromMonthYear = (month: number, year: number): ShortDate => {
    const time = new Date(year, month);
    const monthName = time.toLocaleDateString("en-US", { month: "long" });
    return `${monthName} ${year}`;
};

export const getMonthYearFromShortDate = (shortDate: ShortDate): { month: number; year: number } => {
    const [monthName, year] = shortDate.split(" ");
    const month = new Date(`${monthName} 1, ${year}`).getMonth();
    return { month, year: Number(year) };
};
