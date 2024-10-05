import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filtersData } from "../../data/filters";
import {
    RANGE,
    VALUE_LESS_THAN_OR_EQUALS,
    VALUE_MORE_THAN_OR_EQUALS,
} from "../../data/operations";
import { SetFilters } from "../../redux/actions/FiltersActions";
import "../../styles/components/UI/BuySectionFilters.scss";
import { getItems } from "../../utils/getItems";
import { handleInputByAllowedSymbols } from "../../utils/handleInputByAllowedSymbols";
import Filter from "./Filter";

const BuySectionFilters = () => {
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [filtersOptions, setFiltersOptions] = useState<any>({});
    const [currentFilters, setCurrentFilters] = useState<any>([]);
    const sidebarRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const [glassChoiceAvailable, setGlassChoiceAvailable] = useState(false);

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

    const getCategoryHaveGlass = () => {
        const categories = currentFilters.filter(
            (item: any) => item.field === "category_id"
        );

        if (categories?.length > 0 && categories) {
            const categoriesGlassAvailability = categories.some(
                (item: any) => item?.originalObject?.is_glass_available
            );

            if (categoriesGlassAvailability) {
                setGlassChoiceAvailable(true);
                return;
            }
        }

        setGlassChoiceAvailable(false);
    };

    useEffect(() => {
        let readyFilters = currentFilters.map((filter: any) => {
            if (filter && JSON.stringify(filter) !== "{}") {
                if (
                    Array.isArray(filter) &&
                    filter.some((value: any) => value === undefined)
                ) {
                    return filter;
                } else {
                    const keys = Object.keys(filter);
                    let invalid = false;

                    for (const key of keys) {
                        if (filter[key] === undefined) {
                            invalid = true;
                        }
                    }

                    if (!invalid) {
                        return filter;
                    }
                }
            }
        });

        const clearFilters = () => {
            const filtersNotDuplicated: any = {};
            for (const filter of readyFilters) {
                if (filter.field === "price") {
                    filtersNotDuplicated[filter.field] = filter;
                } else {
                }
            }

            let newFilters: any = readyFilters.filter(
                (filter: any) => filter.field !== "price"
            );

            Object.keys(filtersNotDuplicated).forEach((key: string) => {
                newFilters.push(filtersNotDuplicated[key]);
            });

            readyFilters = newFilters;
        };

        clearFilters();

        getCategoryHaveGlass();
        if (readyFilters && JSON.stringify(readyFilters) !== "{}") {
            dispatch(SetFilters(readyFilters));
        }
    }, [currentFilters]);

    useEffect(() => {
        const setUpOptions = async () => {
            const filtersOptionsFields = filtersData
                .map((item: any) =>
                    item.optionsUrl
                        ? {
                              field: item.field,
                              url: item.optionsUrl,
                              targetKey: item.targetKey,
                          }
                        : {
                              field: item.field,
                              options: item.options,
                          }
                )
                .filter((item: any) => item);

            if (filtersOptionsFields && filtersOptionsFields.length > 0) {
                const newOptions: any = {};

                for (const field of filtersOptionsFields) {
                    const options = field.url
                        ? await getItems(field.url)
                        : field.options;

                    if (field.url) {
                        if (options && options.length > 0) {
                            const newOption = options.map((option: any) => ({
                                name: option[field.targetKey],
                                value: option.id,
                                field: field.field,
                                originalObject: option,
                            }));

                            newOptions[field.field] = newOption;
                        }
                    } else {
                        const newOption = options.map((option: any) => ({
                            ...option,
                            field: field.field,
                            originalObject: option,
                        }));

                        newOptions[field.field] = newOption;
                    }
                }

                if (JSON.stringify(newOptions) !== "{}") {
                    setFiltersOptions(newOptions);
                }
            }
        };

        setUpOptions();
    }, []);

    useEffect(() => {
        if (minPrice || maxPrice) {
            let field: any = {};
            let value;
            let operation;

            const currentMinPrice = +minPrice;
            const currentMaxPrice = +maxPrice;

            if (currentMinPrice && currentMaxPrice) {
                value = [currentMinPrice, currentMaxPrice];
                operation = RANGE;
            } else if (currentMinPrice) {
                value = currentMinPrice;
                operation = VALUE_MORE_THAN_OR_EQUALS;
            } else if (currentMaxPrice) {
                value = currentMaxPrice;
                operation = VALUE_LESS_THAN_OR_EQUALS;
            }

            field = {
                value,
                field: "price",
                operation,
            };

            setCurrentFilters((prev: any) => [...prev, field]);
        } else if (!minPrice && !maxPrice) {
            setCurrentFilters((prev: any) =>
                prev.filter(
                    (filter: any) => filter[0] || filter.field !== "price"
                )
            );
        }
    }, [minPrice, maxPrice]);

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

                {filtersData.map((filter: any, index: number) =>
                    filter.field !== "have_glass" ? (
                        <Filter
                            key={`filter[${index}]`}
                            label={filter.name}
                            options={
                                filtersOptions[filter.field] || filter.options
                            }
                            filters={currentFilters}
                            handleFilter={(data: any) =>
                                setCurrentFilters(data)
                            }
                            {...(filter.field === "have_glass"
                                ? { type: "radio" }
                                : {})}
                        />
                    ) : (
                        <>
                            {glassChoiceAvailable && (
                                <Filter
                                    key={`filter[${index}]`}
                                    label={filter.name}
                                    options={
                                        filtersOptions[filter.field] ||
                                        filter.options
                                    }
                                    filters={currentFilters}
                                    handleFilter={(data: any) =>
                                        setCurrentFilters(data)
                                    }
                                    {...(filter.field === "have_glass"
                                        ? { type: "radio" }
                                        : {})}
                                />
                            )}
                        </>
                    )
                )}
            </div>
        </>
    );
};

export default BuySectionFilters;
