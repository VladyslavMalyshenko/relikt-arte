import { useEffect, useState } from "react";
import "../../styles/components/UI/BuySectionProducts.scss";
import { ProductType } from "../../types/productsRelatedTypes";
import { getItems } from "../../utils/getItems";
import BuyProductsPagination from "./BuyProductsPagination";
import DoorCard from "./DoorCard";

const BuySectionProducts = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProduts] = useState<ProductType[]>([]);
    const pages = 4;

    useEffect(() => {
        let page = currentPage;
        if (currentPage < 1) {
            setCurrentPage(1);
            page = 1;
        }

        const getProducts = async () => {
            const newProducts = await getItems(
                `/api/v1/product/list?page=${page}`
            );
            setProduts(newProducts || []);
        };

        getProducts();
    }, [currentPage]);

    const changePage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="buy-products">
            <div className="buy-products-wrapper">
                {products &&
                    products.map((product: ProductType, index) => (
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
