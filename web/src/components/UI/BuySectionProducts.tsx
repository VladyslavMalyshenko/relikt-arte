import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { EQUALS, VALUE_IN } from "../../data/operations";
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
    const filters = useSelector((state: any) => state.FiltersReducer.filters);
    const dispatch = useDispatch();

    const changePage = (page: number) => {
        dispatch(SetCurrentPage(page));
    };

    useEffect(() => {
        if (currentPage < 1) {
            changePage(1);
        }

        const getProducts = async () => {
            dispatch(SetIsLoaded(false));

            const filtersProcessor = (filters: any) => {
                const newFilters: any = [];

                for (const filter of filters) {
                    if (filter) {
                        const isFiltersIncludeField = newFilters.some(
                            (filterObject: any) =>
                                filterObject[0] === filter.field
                        );

                        if (!isFiltersIncludeField) {
                            let newField: any = [];

                            if (filter.field === "price") {
                                newField = [
                                    filter.field,
                                    filter.operation,
                                    filter.value,
                                ];
                            } else {
                                let operation = EQUALS;

                                newField = [
                                    filter.field,
                                    operation,
                                    filter.value,
                                ];
                            }

                            newFilters.push(newField);
                        } else {
                            newFilters.forEach((field: any) => {
                                if (filter[0] === "price") {
                                    field[1] = filter.operation;
                                    field[2] = filter.value;
                                } else if (filter[0] === "have_glass") {
                                    field[1] = EQUALS;
                                    field[2] = filter.value;
                                } else if (field[0] === filter.field) {
                                    let operation = "";

                                    const value = field[2];

                                    if (Array.isArray(value)) {
                                        field[2] = [...value, filter.value];
                                        operation = VALUE_IN;
                                    } else if (value && filter.value) {
                                        field[2] = [value, filter.value];
                                        operation = VALUE_IN;
                                    } else if (filter.value) {
                                        field[2] = [value, filter.value];
                                        operation = EQUALS;
                                    }

                                    field[1] = operation;
                                }
                            });
                        }
                    }
                }

                return newFilters.filter((item: any) => item);
            };

            let readyFilters = filtersProcessor(filters);

            if (readyFilters && readyFilters.length < 1) {
                readyFilters = undefined;
            }

            const newProducts = await getItems(
                `/api/v1/product/list`,
                readyFilters,
                true
            );

            dispatch(SetIsLoaded(true));
            setProducts(newProducts || []);
        };

        getProducts();
    }, [currentPage, filters]);

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
