import { useEffect, useState } from "react";
import "../../styles/components/UI/BuySectionFilters.scss";
import { getItems } from "../../utils/getItems";
import FilterInput from "./FilterInput";

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
    onChosen: any;
};

const DropDown = ({
    label,
    options,
    field,
    onChosen,
    borderless = true,
}: DropDownProps) => {
    const [filtersOpened, setFiltersOpened] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");
    const [currentOptions, setCurrentOptions] = useState<any>([]);

    useEffect(() => {
        const getOptions = async () => {
            let newCurrentOptions: DropDownAsyncOption | DropDownOption[] =
                options;

            if (Array.isArray(newCurrentOptions)) {
                setCurrentOptions(newCurrentOptions);
            } else if (newCurrentOptions.url && newCurrentOptions.labelKey) {
                let newOptions = await getItems(newCurrentOptions.url);

                newOptions = newOptions.map((item: any) => ({
                    name: item[
                        (newCurrentOptions as DropDownAsyncOption).labelKey
                    ],
                    key: `${
                        item[
                            (newCurrentOptions as DropDownAsyncOption).labelKey
                        ]
                    }-${item.id}`,
                    value: item.id,
                }));

                newCurrentOptions = newOptions;
            } else if (
                !newCurrentOptions.url &&
                (newCurrentOptions.value !== null ||
                    newCurrentOptions.value !== undefined) &&
                newCurrentOptions.labelKey
            ) {
                const newOptions = newCurrentOptions.value.map((item: any) => {
                    const itemName =
                        item[
                            (newCurrentOptions as DropDownAsyncOption).labelKey
                        ];

                    return {
                        name: itemName,
                        key: `${itemName}-${item.id}`,
                        value: item.id,
                    };
                });

                newCurrentOptions = newOptions;
            }

            if (
                newCurrentOptions &&
                (newCurrentOptions as DropDownOption[]).length > 0
            ) {
                const option = (newCurrentOptions as DropDownOption[])[0];
                const targetValue = option.value;

                const currentIdentifier = `option-${option.key || option.name}`;

                onChosen(field, targetValue);
                setSelectedOption(currentIdentifier);
            }

            setCurrentOptions(newCurrentOptions);
        };

        getOptions();
    }, [options]);

    return (
        <div className="filters-filter">
            <p
                className={`upper small filters-filter-btn${
                    filtersOpened ? " opened" : ""
                }${borderless ? "" : " border"}`}
                onClick={() => setFiltersOpened(!filtersOpened)}
            >
                {label}

                <svg
                    width="14"
                    height="6"
                    viewBox="0 0 14 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M12.833 5.33334L6.99967 0.666676L1.16634 5.33334"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </p>

            <div
                className={`filters-filter-options${
                    filtersOpened ? " opened" : ""
                }`}
            >
                {currentOptions.length > 0 &&
                    currentOptions.map((option: DropDownOption) => {
                        const currentIdentifier = `option-${
                            option.key || option.name
                        }`;

                        const targetValue = option.value;

                        return (
                            <FilterInput
                                type="radio"
                                key={currentIdentifier}
                                label={
                                    (option as DropDownOption).name as string
                                }
                                groupName={field}
                                isChecked={selectedOption === currentIdentifier}
                                onChange={() => {
                                    setSelectedOption(currentIdentifier);
                                    onChosen(field, targetValue);
                                }}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default DropDown;
