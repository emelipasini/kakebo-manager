const savingQuestions = [
    {
        type: "input",
        name: "description",
        message: "Saving description:",
        validate(value: string) {
            const valid = isNaN(parseFloat(value)) && value.length > 0;
            return valid || "Please enter a description";
        },
    },
    {
        type: "input",
        name: "amount",
        message: "Saving amount:",
        validate(value: string) {
            const valid = !isNaN(parseFloat(value));
            return valid || "Please enter a number";
        },
    },
];

export default savingQuestions;
