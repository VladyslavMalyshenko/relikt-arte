import React from "react";
import { useSelector } from "react-redux";
import { products } from "../data/products";
import "../styles/components/Content.scss";
import ActionModal from "./ActionModal";
import ItemActions from "./ItemActions";

const Content = () => {
    const category = useSelector(
        (state: any) => state.categoryReducer.category
    );
    const fields = ["id", "name", "category", "price"];

    return (
        <div className="content">
            {category && (
                <>
                    <ActionModal />
                    <p>{category.label}</p>
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
                                            <td key={fieldIndex}>
                                                {product[field]}
                                            </td>
                                        ))}
                                        <ItemActions id={product.id} />
                                    </tr>
                                </React.Fragment>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

export default Content;
