import { useEffect, useState } from "react";
import { ProductType, productsData } from "../../data/products";
import "../../styles/components/UI/BuySectionProducts.scss";
import BuyProductsPagination from "./BuyProductsPagination";
import DoorCard from "./DoorCard";

const BuySectionProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const pages = 4;

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
                        <DoorCard key={`product[${index}]`} product={product} />
                    ))}
            </div>

            <BuyProductsPagination
                currentPage={currentPage}
                pages={pages}
                changePage={changePage}
            />
        </div>
    );
};

export default BuySectionProducts;
