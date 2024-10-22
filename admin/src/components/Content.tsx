import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { categoriesData } from "../data/categories";
import {
    EQUALS,
    RANGE,
    VALUE_IN,
    VALUE_LESS_THAN_OR_EQUALS,
    VALUE_MORE_THAN_OR_EQUALS,
} from "../data/operations";
import { SetCurrentAction } from "../redux/actions/currentActionActions";
import { SetCurrentCategory } from "../redux/actions/currentCategoryActions";
import {
    SetAvailablePagesCount,
    SetCurrentPage,
} from "../redux/actions/currentPageActions";
import "../styles/components/ActionModal.scss";
import "../styles/components/Content.scss";
import {
    Category,
    LetterCategory,
    MainCategory,
    TableField,
} from "../types/categoriesTypes";
import { getItems } from "../utils/getItems";
import ActionModal from "./ActionModal";
import ItemActions from "./ItemActions";
import Pagination from "./Pagination";

const Content = () => {
    const category = useSelector(
        (state: any) => state.categoryReducer.category
    );
    const currentPage = useSelector(
        (state: any) => state.pageReducer.currentPage
    );
    const action = useSelector((state: any) => state.actionReducer.action);
    const [previousAction, setPreviousAction] = useState(action || "");
    const [previousCategory, setPreviousCategory] = useState(
        category.link || ""
    );
    const [previousFilters, setPreviousFilters] = useState([]);
    const [fields, setFields] = useState<(TableField | string)[]>([
        "id",
        "name",
        "category",
        "price",
    ]);
    const [filtersOpened, setFiltersOpened] = useState(false);
    const [products, setProducts] = useState<any>([]);
    const [filters, setFilters] = useState<any>([]);
    const dispatch = useDispatch();
    const params = useParams();
    const { register } = useForm();

    const setUpTable = async () => {
        const areFiltersValid =
            filters && Array.isArray(filters) && filters.length > 0;

        let readyFilters = areFiltersValid ? filters : undefined;

        const items = await getItems(category.getUrl, readyFilters, true);

        setProducts(items || []);
        setFields(category.fields);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    };

    useEffect(() => {
        if (
            (!category.main && !category.letter) ||
            (action === "" &&
                (previousAction === "add" ||
                    previousAction === "edit" ||
                    previousAction === "delete"))
        ) {
            setUpTable();
        }

        if (category.link !== previousCategory || filters !== previousFilters) {
            dispatch(SetCurrentPage(1));
            dispatch(SetAvailablePagesCount(1));

            if (category.link !== previousCategory) {
                setPreviousCategory(category.link);
                setFilters([]);
                setFiltersOpened(false);
            }
        }

        setPreviousFilters(filters);
        setPreviousAction(action);
    }, [category, params.category, action, currentPage, filters]);

    const getListInput = (
        fieldName: string,
        options: any,
        isSingle?: boolean
    ) => {
        const onChange = (e: any, option: any) => {
            setFilters((prev: any) => {
                const currentValue = [...(prev || [])];

                if (currentValue.length > 0) {
                    const filtersHasOptions = filters.some(
                        (filter: any) => filter[0] === fieldName
                    );

                    if (filtersHasOptions) {
                        currentValue.forEach(
                            (prevFilter: any, index: number) => {
                                if (prevFilter[0] === fieldName) {
                                    if (
                                        isSingle ||
                                        prevFilter[2] === undefined
                                    ) {
                                        prevFilter[2] = option.value;
                                        prevFilter[1] = EQUALS;
                                    } else if (Array.isArray(prevFilter[2])) {
                                        const doesValueIncludeCurrentOptionValue =
                                            prevFilter[2].includes(
                                                option.value
                                            );

                                        if (
                                            doesValueIncludeCurrentOptionValue
                                        ) {
                                            prevFilter[2] =
                                                prevFilter[2].filter(
                                                    (value: any) =>
                                                        value !== option.value
                                                );

                                            if (
                                                prevFilter[2].length > 0 &&
                                                prevFilter[2].length === 1
                                            ) {
                                                prevFilter[2] =
                                                    prevFilter[2][0];
                                                prevFilter[1] = EQUALS;
                                            } else if (
                                                prevFilter[2].length > 1
                                            ) {
                                                prevFilter[1] = VALUE_IN;
                                            }
                                        } else if (
                                            !doesValueIncludeCurrentOptionValue
                                        ) {
                                            prevFilter[2].push(option.value);
                                            prevFilter[1] = VALUE_IN;
                                        }
                                    } else if (prevFilter[2] !== undefined) {
                                        if (e.target.checked) {
                                            prevFilter[2] = [
                                                prevFilter[2],
                                                option.value,
                                            ];
                                            prevFilter[1] = VALUE_IN;
                                        } else {
                                            currentValue.splice(index, 1);
                                        }
                                    }
                                }
                            }
                        );
                    } else {
                        currentValue.push([fieldName, EQUALS, option.value]);
                    }
                } else {
                    currentValue.push([fieldName, EQUALS, option.value]);
                }

                return currentValue;
            });
        };

        const isChecked = (value: any) => {
            return Array.isArray(filters)
                ? filters.some(
                      (filter: any) =>
                          filter[0] === fieldName &&
                          (filter[2] === value ||
                              (Array.isArray(filter[2]) &&
                                  filter[2].includes(value)))
                  )
                : false;
        };

        return (
            <div className="input-filter-container">
                <ul className="list-input" id={fieldName}>
                    {options.length > 0 &&
                        options.map((option: any, index: number) => (
                            <li
                                key={`${fieldName}[${index}]`}
                                id={`${fieldName}[${index}]`}
                            >
                                <input
                                    name={fieldName}
                                    type={!isSingle ? "checkbox" : "radio"}
                                    checked={isChecked(option.value)}
                                    onChange={(e) => onChange(e, option)}
                                    {...(isSingle
                                        ? {
                                              onClick: (e: any) =>
                                                  e.target.checked
                                                      ? setFilters(
                                                            (prev: any) => {
                                                                const currentValue =
                                                                    [...prev];

                                                                currentValue.forEach(
                                                                    (
                                                                        filter: any,
                                                                        index: number
                                                                    ) => {
                                                                        if (
                                                                            !Array.isArray(
                                                                                filter[2]
                                                                            )
                                                                        ) {
                                                                            currentValue.splice(
                                                                                index,
                                                                                1
                                                                            );
                                                                        } else {
                                                                            filter[2] =
                                                                                filter[2].filter(
                                                                                    (
                                                                                        value: any
                                                                                    ) =>
                                                                                        value !==
                                                                                        option.value
                                                                                );
                                                                        }
                                                                    }
                                                                );

                                                                return currentValue;
                                                            }
                                                        )
                                                      : null,
                                          }
                                        : {})}
                                />
                                {option.name}
                            </li>
                        ))}
                </ul>
            </div>
        );
    };

    const getNumberInput = (fieldName: string) => {
        const onChange = (value: number, isMax?: boolean) => {
            const valueInt = +value;

            setFilters((prev: any) => {
                const currentValue = [...(prev || [])];

                const isFieldInFilters = filters.some(
                    (filter: any) => filter[0] === fieldName
                );

                if (isFieldInFilters) {
                    currentValue.forEach((filter: any, index: number) => {
                        if (filter[0] === fieldName) {
                            const notUndefinedValue = Array.isArray(filter[2])
                                ? filter[2].find(
                                      (item: any) => item !== undefined
                                  )
                                : filter[2];

                            if (!notUndefinedValue) {
                                currentValue.splice(index, 1);
                                return;
                            }

                            if (!valueInt && Array.isArray(filter[2])) {
                                filter[2] = filter[2][isMax ? 0 : 1];
                                filter[1] = isMax
                                    ? VALUE_MORE_THAN_OR_EQUALS
                                    : VALUE_LESS_THAN_OR_EQUALS;
                                return;
                            } else if (!valueInt) {
                                currentValue.splice(index, 1);
                                return;
                            }

                            if (filter[2] === undefined) {
                                filter[2] = valueInt;
                            } else if (
                                filter[2] !== undefined &&
                                !Array.isArray(filter[2])
                            ) {
                                if (filter[1] === VALUE_MORE_THAN_OR_EQUALS) {
                                    filter[2] = !isMax
                                        ? valueInt
                                        : [filter[2], valueInt];

                                    if (isMax) {
                                        filter[1] = RANGE;
                                    }
                                } else if (
                                    filter[1] === VALUE_LESS_THAN_OR_EQUALS
                                ) {
                                    filter[2] = isMax
                                        ? valueInt
                                        : [valueInt, filter[2]];

                                    if (!isMax) {
                                        filter[1] = RANGE;
                                    }
                                }
                            } else if (
                                filter[2] !== undefined &&
                                Array.isArray(filter[2])
                            ) {
                                filter[2][isMax ? 1 : 0] = valueInt;
                            }
                        }
                    });
                } else {
                    currentValue.push([
                        fieldName,
                        isMax
                            ? VALUE_LESS_THAN_OR_EQUALS
                            : VALUE_MORE_THAN_OR_EQUALS,
                        valueInt,
                    ]);
                }

                return currentValue;
            });
        };
        return (
            <div className="input-filter-container from-to-input">
                <input
                    placeholder="Мінімальне значення"
                    className="filter-input"
                    type="number"
                    onChange={(e: any) => onChange(e.target.value)}
                />
                <span></span>
                <input
                    placeholder="Максимальне значення"
                    className="filter-input"
                    type="number"
                    onChange={(e: any) => onChange(e.target.value, true)}
                />
            </div>
        );
    };

    return (
        <div className="content">
            {category && (
                <>
                    <ActionModal />
                    <p className="category-title">
                        {category.label}

                        {!category.main &&
                            !category.letter &&
                            category.addUrl && (
                                <button
                                    className="active add-item"
                                    onClick={() => {
                                        dispatch(SetCurrentAction("add"));
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        xmlnsXlink="http://www.w3.org/1999/xlink"
                                        fill="currentColor"
                                        version="1.1"
                                        viewBox="0 0 490 490"
                                        xmlSpace="preserve"
                                    >
                                        <path d="M227.8,174.1v53.7h-53.7c-9.5,0-17.2,7.7-17.2,17.2s7.7,17.2,17.2,17.2h53.7v53.7c0,9.5,7.7,17.2,17.2,17.2     s17.1-7.7,17.1-17.2v-53.7h53.7c9.5,0,17.2-7.7,17.2-17.2s-7.7-17.2-17.2-17.2h-53.7v-53.7c0-9.5-7.7-17.2-17.1-17.2     S227.8,164.6,227.8,174.1z" />
                                        <path d="M71.7,71.7C25.5,118,0,179.5,0,245s25.5,127,71.8,173.3C118,464.5,179.6,490,245,490s127-25.5,173.3-71.8     C464.5,372,490,310.4,490,245s-25.5-127-71.8-173.3C372,25.5,310.5,0,245,0C179.6,0,118,25.5,71.7,71.7z M455.7,245     c0,56.3-21.9,109.2-61.7,149s-92.7,61.7-149,61.7S135.8,433.8,96,394s-61.7-92.7-61.7-149S56.2,135.8,96,96s92.7-61.7,149-61.7     S354.2,56.2,394,96S455.7,188.7,455.7,245z" />
                                    </svg>
                                </button>
                            )}
                    </p>

                    {!category.main && !category.letter && (
                        <>
                            {category.filters && category.filters.length > 0 ? (
                                <div
                                    className={`filters-inputs-container${
                                        filtersOpened ? " active" : ""
                                    }`}
                                >
                                    {category.filters.map((filter: any) => (
                                        <div key={`filter[${filter.name}]`}>
                                            <p className="filter-name">
                                                {filter.name}
                                            </p>

                                            {Array.isArray(filter.choices)
                                                ? getListInput(
                                                      filter.field,
                                                      filter.choices,
                                                      filter.type === "radio"
                                                  )
                                                : getNumberInput(filter.field)}
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            <button
                                className="default-button"
                                onClick={() => setFiltersOpened(!filtersOpened)}
                            >
                                Відкрити фільтри
                            </button>
                        </>
                    )}

                    {category.main ? (
                        <div className="dashboard-container">
                            <div className="dashboard-list">
                                {categoriesData.map(
                                    (
                                        categoryObject:
                                            | Category
                                            | MainCategory
                                            | LetterCategory,
                                        index: number
                                    ) => (
                                        <React.Fragment key={index}>
                                            {categoryObject.link !== "/" && (
                                                <li
                                                    key={index}
                                                    className="category"
                                                >
                                                    <Link
                                                        to={categoryObject.link}
                                                        onClick={() =>
                                                            dispatch(
                                                                SetCurrentCategory(
                                                                    categoryObject
                                                                )
                                                            )
                                                        }
                                                    >
                                                        {categoryObject.icon ? (
                                                            <span className="icon">
                                                                {
                                                                    categoryObject.icon
                                                                }
                                                            </span>
                                                        ) : null}

                                                        {categoryObject.label}
                                                    </Link>
                                                </li>
                                            )}
                                        </React.Fragment>
                                    )
                                )}
                            </div>
                        </div>
                    ) : category.letter ? (
                        <button
                            className="default-button show"
                            onClick={() => dispatch(SetCurrentAction("add"))}
                        >
                            Написати листа
                        </button>
                    ) : (
                        <>
                            <table>
                                <thead>
                                    <tr>
                                        {fields?.length > 0 &&
                                            fields.map(
                                                (
                                                    fieldObject:
                                                        | TableField
                                                        | string,
                                                    index
                                                ) => {
                                                    const fieldName =
                                                        typeof fieldObject ===
                                                        "string"
                                                            ? fieldObject
                                                            : fieldObject.name;
                                                    return (
                                                        <th key={index}>
                                                            <div>
                                                                <span>
                                                                    {fieldName}
                                                                </span>
                                                            </div>
                                                        </th>
                                                    );
                                                }
                                            )}
                                        <th>Дії</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products?.length > 0 &&
                                        products.map(
                                            (product: any, index: number) => (
                                                <React.Fragment key={index}>
                                                    <tr>
                                                        {fields?.length > 0 &&
                                                            fields.map(
                                                                (
                                                                    fieldObject:
                                                                        | TableField
                                                                        | string,
                                                                    fieldIndex
                                                                ) => {
                                                                    const fieldName =
                                                                        typeof fieldObject ===
                                                                        "string"
                                                                            ? fieldObject
                                                                            : fieldObject.field;

                                                                    const valueNames =
                                                                        (
                                                                            fieldObject as any
                                                                        )
                                                                            ?.valueNames;

                                                                    const displayedValue =
                                                                        valueNames?.[
                                                                            product[
                                                                                fieldName
                                                                            ]
                                                                        ] ||
                                                                        product[
                                                                            fieldName
                                                                        ];

                                                                    return (
                                                                        <td
                                                                            key={
                                                                                fieldIndex
                                                                            }
                                                                        >
                                                                            {typeof product[
                                                                                fieldName
                                                                            ] ===
                                                                            "boolean" ? (
                                                                                <input
                                                                                    type="checkbox"
                                                                                    checked={
                                                                                        product[
                                                                                            fieldName
                                                                                        ]
                                                                                    }
                                                                                    readOnly={
                                                                                        true
                                                                                    }
                                                                                />
                                                                            ) : (
                                                                                <>
                                                                                    {fieldName ===
                                                                                    "status" ? (
                                                                                        <div
                                                                                            style={{
                                                                                                display:
                                                                                                    "flex",
                                                                                                gap: "10px",
                                                                                                alignItems:
                                                                                                    "center",
                                                                                            }}
                                                                                        >
                                                                                            <span
                                                                                                style={{
                                                                                                    width: "20px",
                                                                                                    height: "20px",
                                                                                                    display:
                                                                                                        "flex",
                                                                                                    borderRadius:
                                                                                                        "50%",
                                                                                                    backgroundColor:
                                                                                                        product?.status ===
                                                                                                        "new"
                                                                                                            ? "var(--red)"
                                                                                                            : product?.status ===
                                                                                                              "accepted"
                                                                                                            ? "var(--yellow)"
                                                                                                            : "var(--green)",
                                                                                                    aspectRatio:
                                                                                                        "1/1",
                                                                                                    flexShrink:
                                                                                                        "0",
                                                                                                }}
                                                                                            ></span>

                                                                                            {
                                                                                                displayedValue
                                                                                            }
                                                                                        </div>
                                                                                    ) : fieldName ===
                                                                                      "created_at" ? (
                                                                                        formatDate(
                                                                                            displayedValue
                                                                                        )
                                                                                    ) : (
                                                                                        displayedValue
                                                                                    )}
                                                                                </>
                                                                            )}
                                                                        </td>
                                                                    );
                                                                }
                                                            )}
                                                        <ItemActions
                                                            id={product.id}
                                                        />
                                                    </tr>
                                                </React.Fragment>
                                            )
                                        )}
                                </tbody>
                            </table>

                            <Pagination />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

export default Content;
