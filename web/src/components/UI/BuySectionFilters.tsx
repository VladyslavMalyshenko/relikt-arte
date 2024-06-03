import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Filter as FilterType, filtersData } from "../../data/filters";
import "../../styles/components/UI/BuySectionFilters.scss";
import { handleInputByAllowedSymbols } from "../../utils/handleInputByAllowedSymbols";
import Filter from "./Filter";

const BuySectionFilters = () => {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const sidebarRef = useRef<HTMLDivElement>(null);

    const currentWidth = useSelector(
        (state: any) => state.ScreenPropertiesReducer.width
    );

    const handleFilters = (e: any) => {
        if (sidebarRef.current) {
            sidebarRef.current.classList.toggle("active");
        }

        if (e.currentTarget) {
            e.currentTarget.classList.toggle("active");
        }
    };

    return (
        <>
            {currentWidth <= 900 && (
                <div className="filters-button" onClick={handleFilters}>
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
                </div>
            )}

            <div className="filters-container" ref={sidebarRef}>
                <p className="upper pre-small black bold">фільтр</p>
                <div className="filters-price">
                    <p className="upper small black">ціна</p>
                    <div className="filters-price-inputs">
                        <input
                            type="text"
                            value={minPrice}
                            onChange={(event) =>
                                handleInputByAllowedSymbols({
                                    event,
                                    set: setMinPrice,
                                })
                            }
                            placeholder="ВІД"
                        />
                        <span></span>
                        <input
                            type="text"
                            value={maxPrice}
                            onChange={(event) =>
                                handleInputByAllowedSymbols({
                                    event,
                                    set: setMaxPrice,
                                })
                            }
                            placeholder="ДО"
                        />
                    </div>
                </div>

                {filtersData.map((filter: FilterType, index: number) => (
                    <Filter key={`filter[${index}]`} filter={filter} />
                ))}
            </div>
        </>
    );
};

export default BuySectionFilters;
