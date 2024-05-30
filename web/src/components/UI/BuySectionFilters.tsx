import { useState } from "react";
import { Filter as FilterType, filtersData } from "../../data/filters";
import "../../styles/components/UI/BuySectionFilters.scss";
import Filter from "./Filter";

const BuySectionFilters = () => {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const allowedSymbols = "0123456789";

    const handleInput = (
        e: React.ChangeEvent<HTMLInputElement>,
        set: (value: string) => void
    ) => {
        const newValue = e.target.value;
        const isValid = newValue
            .split("")
            .every((char) => allowedSymbols.includes(char));

        if (isValid || newValue === "") {
            set(newValue);
        }
    };

    return (
        <div className="filters-container">
            <p className="upper pre-small black bold">фільтр</p>
            <div className="filters-price">
                <p className="upper small black">ціна</p>
                <div className="filters-price-inputs">
                    <input
                        type="text"
                        value={minPrice}
                        onChange={(e) => handleInput(e, setMinPrice)}
                        placeholder="ВІД"
                    />
                    <span></span>
                    <input
                        type="text"
                        value={maxPrice}
                        onChange={(e) => handleInput(e, setMaxPrice)}
                        placeholder="ДО"
                    />
                </div>
            </div>

            {filtersData.map((filter: FilterType, index: number) => (
                <Filter key={index} filter={filter} />
            ))}
        </div>
    );
};

export default BuySectionFilters;
