import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Category, categories } from "../data/categories";
import { products } from "../data/products";
import "../styles/components/Content.scss";

const Content = () => {
    const { category } = useParams();
    const [categoryLabel, setCategoryLabel] = useState("");

    const fields = ["id", "name", "category", "price"];

    useEffect(() => {
        const newLabel = (categories as any).find(
            (categoryObject: Category) =>
                categoryObject.link.split("/").join("") === (category || "")
        ).label;

        setCategoryLabel(newLabel);
    });
    return (
        <div className="content">
            <p>{categoryLabel}</p>
            <table>
                <thead>
                    <tr>
                        {fields.map((field, index) => (
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
                    {products.map((product: any, index) => (
                        <React.Fragment key={index}>
                            <tr>
                                {fields.map((field, fieldIndex) => (
                                    <td key={fieldIndex}>{product[field]}</td>
                                ))}
                                <td className="actions">
                                    <button className="edit">
                                        <svg
                                            fill="currentColor"
                                            version="1.1"
                                            xmlns="http://www.w3.org/2000/svg"
                                            xmlnsXlink="http://www.w3.org/1999/xlink"
                                            viewBox="0 0 306.637 306.637"
                                            xmlSpace="preserve"
                                        >
                                            <path d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896    l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z" />
                                            <path d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095    L265.13,75.602L231.035,41.507z" />
                                        </svg>
                                    </button>
                                    <button className="delete">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M3 3L6 6M6 6L10 10M6 6V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18M6 6H4M10 10L14 14M10 10V17M14 14L18 18M14 14V17M18 18L21 21M18 6V12.3906M18 6H16M18 6H20M16 6L15.4558 4.36754C15.1836 3.55086 14.4193 3 13.5585 3H10.4415C9.94239 3 9.47572 3.18519 9.11861 3.5M16 6H11.6133"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Content;
