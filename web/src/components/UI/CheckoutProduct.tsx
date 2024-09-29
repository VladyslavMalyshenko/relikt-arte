import { useEffect, useRef, useState } from "react";
import noImage from "../../assets/no_image.png";
import "../../styles/components/UI/CheckoutProduct.scss";
import { ProductPhotoType } from "../../types/productsRelatedTypes";
import { getItem } from "../../utils/getItem";
import { changeCartItem } from "../../utils/handleCart";
import DropDown from "./DropDown";

type CheckoutProductProps = {
    product: any; // checkout product type needed
    setValue?: any;
    deleteItem?: any;
    onQuantityChange?: any;
};

const CheckoutProduct = ({
    product,
    setValue,
    deleteItem,
    onQuantityChange,
}: CheckoutProductProps) => {
    const [allowedSizes, setAllowedSizes] = useState<any>([]);
    const [productPhotos, setProductPhotos] = useState<ProductPhotoType[]>([]);
    const [currentPhoto, setCurrentPhoto] = useState<string>("");
    const [currentProduct, setCurrentProduct] = useState<any>({});
    const [productQuantity, setProductQuantity] = useState<number>(1);
    const [previousQuantity, setPreviousQuantity] = useState<number>(1);
    const [currentPrice, setCurrentPrice] = useState<number>(0);
    const [totalValue, setTotalValue] = useState<number>(0);
    const isProductLoaded = useRef(false);

    const getProductInfo = async (product: any) => {
        console.log(product);

        setCurrentProduct(product.product);
        setProductQuantity(product.quantity);
        setPreviousQuantity(product.quantity);
        setCurrentPrice(product.product.price);
        setTotalValue(product.total_price);
    };

    useEffect(() => {
        getProductInfo(product);
    }, [product]);

    useEffect(() => {
        if (!isProductLoaded.current) {
            isProductLoaded.current = true;
            return;
        }

        const setNewQuantity = async () => {
            if (previousQuantity === productQuantity) return;

            if (productQuantity < 1) {
                setProductQuantity(1);
                setPreviousQuantity(1);
                return;
            }

            setPreviousQuantity(productQuantity);
        };

        const delayDebounceFn = setTimeout(async () => {
            await setNewQuantity();

            await changeCartItem(product.id, {
                quantity: productQuantity,
            }).then(async () => {
                setTotalValue(currentPrice * productQuantity);

                if (onQuantityChange) {
                    await onQuantityChange();
                }
            });
        }, 1000);

        return () => {
            clearTimeout(delayDebounceFn);
        };
    }, [productQuantity]);

    useEffect(() => {
        const getAllowedSizes = async () => {
            if (currentProduct && currentProduct?.category_id) {
                let currentSizes: any = [];

                const currentCategory = await getItem(
                    `api/v1/product/category/${currentProduct.category_id}/`
                );

                const allowedSizes = currentCategory.allowed_sizes;

                if (allowedSizes && allowedSizes.length > 0) {
                    for (const sizeId of allowedSizes) {
                        const sizeObject = await getItem(
                            "api/v1/product/size/$id",
                            {
                                id: sizeId,
                            }
                        );

                        if (sizeObject) {
                            currentSizes.push(sizeObject);
                        }
                    }
                }

                setAllowedSizes(currentSizes);
            }
        };

        const setUpPhotos = () => {
            if (currentProduct && currentProduct.photos) {
                setProductPhotos(currentProduct.photos);
                setCurrentPhoto(
                    currentProduct.photos.find(
                        (photo: ProductPhotoType) => photo.is_main
                    )?.photo || ""
                );
            }
        };

        getAllowedSizes();
        setUpPhotos();
    }, [currentProduct]);

    const onChosen = async (fieldName: string, value: any, field: string) => {
        const newPhoto = productPhotos.find(
            (photo: any) => photo[field] === value
        );

        if (newPhoto) {
            setCurrentPhoto(newPhoto.photo);
        }

        if (product && product[fieldName] !== value) {
            if (setValue) {
                setValue(product.id, fieldName, value);
            }
            await changeCartItem(product.id, { [fieldName]: value });
        }
    };

    return (
        currentProduct && (
            <div className="checkout-product">
                <img
                    className="checkout-product-cell"
                    src={currentPhoto || noImage}
                    alt={`door-${currentProduct.price}-${currentProduct.id}`}
                />
                <div className="checkout-product-count checkout-product-cell">
                    <div
                        className="buy-products-pagination-button"
                        onClick={() => setProductQuantity((prev) => prev - 1)}
                    >
                        -
                    </div>

                    <p className="upper black pre-small">
                        {productQuantity || 1} шт
                    </p>

                    <div
                        className="buy-products-pagination-button"
                        onClick={() => setProductQuantity((prev) => prev + 1)}
                    >
                        +
                    </div>
                </div>
                <p className="upper black bold mid checkout-product-cell">
                    {totalValue} ₴{" "}
                    {deleteItem && (
                        <button
                            className="checkout-product-cell-delete"
                            onClick={async () => {
                                await deleteItem(product.id);
                            }}
                        >
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
                    )}
                </p>

                <div className="checkout-product-options checkout-product-cell">
                    <DropDown
                        borderless={false}
                        label="колір"
                        field="color_id"
                        options={{
                            url: "api/v1/product/related/product_color/list/",
                            labelKey: "name",
                        }}
                        defaultValue={{
                            defaultFieldName: "value",
                            defaultValue: product.color_id,
                        }}
                        onChosen={(fieldName: string, value: any) =>
                            onChosen(fieldName, value, "color_id")
                        }
                    />

                    {allowedSizes && allowedSizes.length > 0 ? (
                        <DropDown
                            borderless={false}
                            label="розмір"
                            field="size_id"
                            options={{
                                value: allowedSizes,
                                labelKey: "dimensions",
                            }}
                            defaultValue={{
                                defaultFieldName: "value",
                                defaultValue: product.size_id,
                            }}
                            onChosen={(fieldName: string, value: any) =>
                                onChosen(fieldName, value, "size_id")
                            }
                        />
                    ) : null}

                    {product?.with_glass && (
                        <DropDown
                            borderless={false}
                            label="наявність скла"
                            field="with_glass"
                            options={[
                                {
                                    name: "Присутнє",
                                    value: true,
                                },
                                {
                                    name: "Відсутнє",
                                    value: false,
                                },
                            ]}
                            onChosen={(fieldName: string, value: any) =>
                                onChosen(fieldName, value, "with_glass")
                            }
                        />
                    )}

                    {product?.orientation && (
                        <DropDown
                            borderless={false}
                            label="сторона петель"
                            field="orientation"
                            options={[
                                { name: "Ліва", value: "left" },
                                {
                                    name: "Права",
                                    value: "right",
                                },
                            ]}
                            onChosen={(fieldName: string, value: any) =>
                                onChosen(fieldName, value, "type_of_platband")
                            }
                        />
                    )}
                </div>
            </div>
        )
    );
};

export default CheckoutProduct;
