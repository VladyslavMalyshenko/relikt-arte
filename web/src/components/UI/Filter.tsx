import { useState } from "react";
import { Filter as FilterType } from "../../data/filters";
import "../../styles/components/UI/BuySectionFilters.scss";
import FilterCheckbox from "./FilterCheckbox";

type FilterProps = {
    filter: FilterType;
};

const Filter = ({ filter }: FilterProps) => {
    const [filtersOpened, setFiltersOpened] = useState(false);

    return (
        <div className="filters-filter">
            <p
                className={`upper small filters-filter-btn${
                    filtersOpened ? " opened" : ""
                }`}
                onClick={() => setFiltersOpened(!filtersOpened)}
            >
                {filter.name}

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
                {filter.options &&
                    filter.options.map((option: string, index: number) => (
                        <FilterCheckbox key={index} label={option} />
                    ))}
            </div>
        </div>
    );
};

export default Filter;
