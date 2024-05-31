type HandleInputByAllowedSymbolsParams = {
    event: React.ChangeEvent<HTMLInputElement> | string;
    set?: (value: string) => void;
    changeValue?: boolean;
    allowedSymbols?: string;
};

export const handleInputByAllowedSymbols = ({
    event,
    set,
    changeValue = false,
    allowedSymbols = "0123456789",
}: HandleInputByAllowedSymbolsParams): boolean => {
    let newValue: string;

    if (typeof event === "string") {
        newValue = event;
    } else {
        newValue = event.target.value;
    }

    const isValid = newValue
        .split("")
        .every((char: string) => allowedSymbols.includes(char));

    if (isValid || newValue === "") {
        if (set) {
            set(newValue);
        }

        if (changeValue && !set && typeof event !== "string") {
            event.target.value = newValue;
        }

        return true;
    }

    return false;
};
