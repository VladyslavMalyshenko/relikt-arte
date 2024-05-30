import { useEffect, useState } from "react";
import { ProductType, productsData } from "../../data/products";
import "../../styles/components/UI/BuySectionProducts.scss";
import DoorCard from "./DoorCard";

const BuySectionProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pages = 2;

    useEffect(() => {
        if (currentPage < 1) {
            setCurrentPage(1);
        }
    }, [currentPage]);

    const changePage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="buy-products">
            <div className="buy-products-wrapper">
                {productsData &&
                    productsData.map((product: ProductType, index) => (
                        <DoorCard key={index} product={product} />
                    ))}
            </div>

            <div className="buy-products-pagination">
                <div
                    className={`buy-products-pagination-button${
                        currentPage === 1 ? " disabled" : ""
                    }`}
                    onClick={() =>
                        currentPage !== 1 ? changePage(currentPage - 1) : null
                    }
                >
                    <svg
                        width="6"
                        height="14"
                        viewBox="0 0 6 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M5.33301 1.16675L0.666341 7.00008L5.33301 12.8334"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>

                {pages > 0 ? (
                    Array.from({ length: pages }, (_, index) => (
                        <div
                            className={`buy-products-pagination-button${
                                currentPage === index + 1 ? " active" : ""
                            }`}
                            onClick={() => changePage(index + 1)}
                        >
                            {index + 1}
                        </div>
                    ))
                ) : (
                    <div className="buy-products-pagination-button">1</div>
                )}

                <div
                    className={`buy-products-pagination-button${
                        currentPage >= pages ? " disabled" : ""
                    }`}
                    onClick={() =>
                        currentPage !== pages
                            ? changePage(currentPage + 1)
                            : null
                    }
                >
                    <svg
                        width="6"
                        height="14"
                        viewBox="0 0 6 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0.666016 12.8333L5.33268 6.99992L0.666017 1.16658"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default BuySectionProducts;
