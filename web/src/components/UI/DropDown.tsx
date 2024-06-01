import { useState } from "react";
import "../../styles/components/UI/BuySectionFilters.scss";
import FilterInput from "./FilterInput";

type DropDownProps = {
    label: string;
    options: string[];
    borderless?: boolean;
};

const DropDown = ({ label, options, borderless = true }: DropDownProps) => {
    const [filtersOpened, setFiltersOpened] = useState(false);
    const [selectedOption, setSelectedOption] = useState("");

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
                {options.map((option, index) => (
                    <FilterInput
                        type="radio"
                        key={`option-${index}`}
                        label={option}
                        groupName={label}
                        isChecked={selectedOption === `option-${index}`}
                        onChange={() => setSelectedOption(`option-${index}`)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DropDown;
