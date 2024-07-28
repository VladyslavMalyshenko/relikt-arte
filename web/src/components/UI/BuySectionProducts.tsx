import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SetIsLoaded } from "../../redux/actions/LoadActions";
import { SetCurrentPage } from "../../redux/actions/PageActions";
import "../../styles/components/UI/BuySectionProducts.scss";
import { ProductType } from "../../types/productsRelatedTypes";
import { getItems } from "../../utils/getItems";
import BuyProductsPagination from "./BuyProductsPagination";
import DoorCard from "./DoorCard";

const BuySectionProducts = () => {
    const currentPage = useSelector(
        (state: any) => state.PageReducer.currentPage
    );
    const availablePages = useSelector(
        (state: any) => state.PageReducer.availablePages
    );
    const isLoaded = useSelector((state: any) => state.LoadReducer.isLoaded);
    const [products, setProducts] = useState<ProductType[]>([]);
    const dispatch = useDispatch();

    const changePage = (page: number) => {
        dispatch(SetCurrentPage(page));
    };

    useEffect(() => {
        let page = currentPage;
        if (currentPage < 1) {
            changePage(1);
            page = 1;
        }

        const getProducts = async () => {
            const newProducts = await getItems(
                `/api/v1/product/list?page=${page}`
            );

            dispatch(SetIsLoaded(true));
            setProducts(newProducts || []);
        };

        getProducts();
    }, [currentPage]);

    return (
        <>
            {isLoaded && (
                <div className="buy-products">
                    <div className="buy-products-wrapper">
                        {products &&
                            products.map((product: ProductType, index) => (
                                <DoorCard
                                    key={`product[${index}]`}
                                    product={product}
                                />
                            ))}
                    </div>

                    <BuyProductsPagination
                        currentPage={currentPage}
                        pages={availablePages}
                        changePage={changePage}
                    />
                </div>
            )}
        </>
    );
};

export default BuySectionProducts;
