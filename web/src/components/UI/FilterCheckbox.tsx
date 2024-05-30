import { useState } from "react";
import "../../styles/components/UI/BuySectionFilters.scss";

type FilterCheckboxProps = {
    label: string;
};

const FilterCheckbox = ({ label }: FilterCheckboxProps) => {
    const [isChecked, setIsChecked] = useState(false);

    return (
        <div
            className="filters-filter-option"
            onClick={() => setIsChecked(!isChecked)}
        >
            <input type="checkbox" checked={isChecked} onChange={() => null} />
            <div
                className={`filters-filter-option-checkbox${
                    isChecked ? " checked" : ""
                }`}
            >
                <span></span>
            </div>
            <p className="small black">{label}</p>
        </div>
    );
};

export default FilterCheckbox;
