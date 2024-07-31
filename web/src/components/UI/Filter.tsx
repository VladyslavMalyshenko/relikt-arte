import { useState } from "react";
import "../../styles/components/UI/BuySectionFilters.scss";
import FilterInput from "./FilterInput";

const Filter = ({ label, options, filters, handleFilter, type }: any) => {
    const [filtersOpened, setFiltersOpened] = useState(false);

    const handleCheckboxChange = (option: any) => {
        const isThereAnyValuesWithField = filters.find(
            (field: any) =>
                field.field === option.field && field.value !== option.value
        );

        if (isThereAnyValuesWithField && type === "radio") {
            handleFilter((prev: any) =>
                prev.filter(
                    (item: any) =>
                        JSON.stringify(isThereAnyValuesWithField) !==
                        JSON.stringify(item)
                )
            );
        }
        if (filters.includes(option)) {
            handleFilter((prev: any) =>
                prev.filter((item: any) => item !== option)
            );
        } else {
            handleFilter((prev: any) => [...prev, option]);
        }
    };

    return (
        <div className="filters-filter">
            <p
                className={`upper small filters-filter-btn${
                    filtersOpened ? " opened" : ""
                }`}
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
                {options &&
                    options.map((option: any, index: any) => {
                        const isChecked = filters.some(
                            (filter: any) => filter.name === option.name
                        );

                        return (
                            <FilterInput
                                type={type || "checkbox"}
                                key={`option${index}`}
                                label={option.name}
                                groupName={label}
                                isChecked={isChecked}
                                onChange={() => handleCheckboxChange(option)}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default Filter;
