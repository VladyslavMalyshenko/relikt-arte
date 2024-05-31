export const handleInputByAllowedSymbols = (
    e: React.ChangeEvent<HTMLInputElement>,
    set: (value: string) => void,
    allowedSymbols = "0123456789"
) => {
    const newValue = e.target.value;
    const isValid = newValue
        .split("")
        .every((char) => allowedSymbols.includes(char));

    if (isValid || newValue === "") {
        set(newValue);
    }
};
