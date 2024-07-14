import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { categoriesData, Category, MainCategory } from "../data/categories";
import { SetCurrentAction } from "../redux/actions/currentActionActions";
import { SetCurrentCategory } from "../redux/actions/currentCategoryActions";
import "../styles/components/Content.scss";
import { getItems } from "../utils/getItems";
import ActionModal from "./ActionModal";
import ItemActions from "./ItemActions";

const Content = () => {
    const category = useSelector(
        (state: any) => state.categoryReducer.category
    );
    const [fields, setFields] = useState(["id", "name", "category", "price"]);
    const [products, setProducts] = useState<any>([]);
    const dispatch = useDispatch();
    const params = useParams();

    const setUpTable = async () => {
        const items = await getItems(category.getUrl);

        setProducts(items || []);
        setFields(category.fields);
    };

    useEffect(() => {
        if (!category.main) {
            setUpTable();
        }
    }, [category, params.category]);

    return (
        <div className="content">
            {category && (
                <>
                    <ActionModal />
                    <p className="category-title">
                        {category.label}

                        {!category.main && (
                            <button
                                className="add-item"
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
                    {category.main ? (
                        <div className="dashboard-container">
                            <div className="dashboard-list">
                                {categoriesData.map(
                                    (
                                        categoryObject: Category | MainCategory,
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
                    ) : (
                        <table>
                            <thead>
                                <tr>
                                    {fields?.length > 0 &&
                                        fields.map((field, index) => (
                                            <th key={index}>
                                                <div>
                                                    <span>{field}</span>
                                                </div>
                                            </th>
                                        ))}
                                    <th>Actions</th>
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
                                                                field,
                                                                fieldIndex
                                                            ) => (
                                                                <td
                                                                    key={
                                                                        fieldIndex
                                                                    }
                                                                >
                                                                    {typeof product[
                                                                        field
                                                                    ] ===
                                                                    "boolean" ? (
                                                                        <input
                                                                            type="checkbox"
                                                                            checked={
                                                                                product[
                                                                                    field
                                                                                ]
                                                                            }
                                                                            readOnly={
                                                                                true
                                                                            }
                                                                        />
                                                                    ) : (
                                                                        product[
                                                                            field
                                                                        ]
                                                                    )}
                                                                </td>
                                                            )
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
                    )}
                </>
            )}
        </div>
    );
};

export default Content;
