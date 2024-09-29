import { useEffect, useState } from "react";
import "../../styles/components/UI/BuySectionFilters.scss";
import { getItems } from "../../utils/getItems";
import FilterInput from "./FilterInput";

export type DefaultDropDownValue = {
    defaultFieldName: string;
    defaultValue: any;
};

type DropDownOption = {
    name: string;
    value: any;
    key?: string;
};

type DropDownAsyncOption = {
    url?: string;
    labelKey: string;
    value?: any;
};

type DropDownProps = {
    label: string;
    options: DropDownOption[] | DropDownAsyncOption;
    field: string;
    borderless?: boolean;
    onChosen: (field: string, value: any, label?: string) => void;
    defaultValue?: DefaultDropDownValue;
    needSearch?: boolean;
};

const DropDown = ({
    label,
    options,
    field,
    onChosen,
    borderless = true,
    needSearch,
    defaultValue,
}: DropDownProps) => {
    const [filtersOpened, setFiltersOpened] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [currentOptions, setCurrentOptions] = useState<DropDownOption[]>([]);
    const [filteredOptions, setFilteredOptions] = useState<DropDownOption[]>(
        []
    );
    const [searchPrompt, setSearchPrompt] = useState("");

    const handleOptionSelect = (
        value: any,
        identifier: string,
        label: string
    ) => {
        if (selectedOption !== identifier) {
            setSelectedOption(identifier);
            onChosen(field, value, label);
        }
    };

    useEffect(() => {
        console.log(options);

        const fetchOptions = async () => {
            let newOptions: DropDownOption[] = [];

            if (
                Array.isArray(
                    (options as DropDownAsyncOption)?.value || options
                )
            ) {
                if (
                    (options as any)?.value &&
                    (options as DropDownAsyncOption).labelKey &&
                    (options as any)?.value.some(
                        (item: any) =>
                            item[(options as DropDownAsyncOption).labelKey]
                    )
                ) {
                    const value = (options as DropDownAsyncOption).value;
                    const labelKey = (options as DropDownAsyncOption).labelKey;

                    newOptions = value.map((item: any) => ({
                        name: item[labelKey],
                        value: item.id,
                        key: `${item[labelKey]}-${item.id}`,
                    }));
                } else {
                    const value = options as any[];
                    if (value.every((item: any) => item.key)) {
                        newOptions = value;
                    } else {
                        newOptions = value.map((item: any) => ({
                            ...item,
                            key: `${item.name}-${item.value}`,
                        }));
                        console.log("H: ", newOptions);
                    }
                }
            } else if ((options as any)?.url && (options as any)?.labelKey) {
                const fetchedItems = await getItems((options as any)?.url);
                newOptions = fetchedItems.map((item: any) => ({
                    name: item[(options as any)?.labelKey],
                    key: `${item[(options as any)?.labelKey]}-${item.id}`,
                    value: item.id,
                }));
            }

            setCurrentOptions(newOptions);
            setFilteredOptions(newOptions);

            if (!selectedOption) {
                const defaultOption = defaultValue
                    ? newOptions.find(
                          (opt: any) =>
                              opt[defaultValue.defaultFieldName] ===
                              defaultValue.defaultValue
                      )
                    : newOptions[0];

                if (defaultOption) {
                    handleOptionSelect(
                        defaultOption.value,
                        `option-${defaultOption.key || defaultOption.name}`,
                        defaultOption.name
                    );
                }
            }
        };

        fetchOptions();
    }, [options, defaultValue]);

    useEffect(() => {
        const lowerCasedPrompt = searchPrompt.toLowerCase();
        setFilteredOptions(
            currentOptions.filter((option) =>
                option.name.toLowerCase().includes(lowerCasedPrompt)
            )
        );
    }, [searchPrompt, currentOptions]);

    return (
        <div className="filters-filter">
            <p
                className={`upper small filters-filter-btn${
                    filtersOpened ? " opened" : ""
                }${borderless ? "" : " border"}`}
                onClick={() => setFiltersOpened(!filtersOpened)}
            >
                {label}
                <svg width="14" height="6" viewBox="0 0 14 6" fill="none">
                    <path
                        d="M12.833 5.33334L6.99967 0.666676L1.16634 5.33334"
                        stroke="currentColor"
                    />
                </svg>
            </p>

            <div
                className={`filters-filter-options${
                    filtersOpened ? " opened" : ""
                }`}
            >
                {needSearch && (
                    <input
                        value={searchPrompt}
                        onChange={(e) => setSearchPrompt(e.target.value)}
                        className="filters-filter-options-search"
                        placeholder="Пошук"
                    />
                )}

                {filteredOptions.length > 0 ? (
                    filteredOptions.map((option) => {
                        const currentIdentifier = `option-${
                            option.key || option.name
                        }`;
                        return (
                            <FilterInput
                                type="radio"
                                key={currentIdentifier}
                                label={option.name}
                                groupName={field}
                                isChecked={selectedOption === currentIdentifier}
                                onChange={() =>
                                    handleOptionSelect(
                                        option.value,
                                        currentIdentifier,
                                        option.name
                                    )
                                }
                            />
                        );
                    })
                ) : (
                    <p className="black small">
                        Пов'язаного з вашим запитом немає у списку ;(
                    </p>
                )}
            </div>
        </div>
    );
};

export default DropDown;
