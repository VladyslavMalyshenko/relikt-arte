import { useState } from "react";
import { Filter as FilterType, filtersData } from "../../data/filters";
import "../../styles/components/UI/BuySectionFilters.scss";
import { handleInputByAllowedSymbols } from "../../utils/handleInputByAllowedSymbols";
import Filter from "./Filter";

const BuySectionFilters = () => {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");

    return (
        <div className="filters-container">
            <p className="upper pre-small black bold">фільтр</p>
            <div className="filters-price">
                <p className="upper small black">ціна</p>
                <div className="filters-price-inputs">
                    <input
                        type="text"
                        value={minPrice}
                        onChange={(e) =>
                            handleInputByAllowedSymbols(e, setMinPrice)
                        }
                        placeholder="ВІД"
                    />
                    <span></span>
                    <input
                        type="text"
                        value={maxPrice}
                        onChange={(e) =>
                            handleInputByAllowedSymbols(e, setMaxPrice)
                        }
                        placeholder="ДО"
                    />
                </div>
            </div>

            {filtersData.map((filter: FilterType, index: number) => (
                <Filter key={`filter[${index}]`} filter={filter} />
            ))}
        </div>
    );
};

export default BuySectionFilters;
