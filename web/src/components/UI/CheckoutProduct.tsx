import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import noImage from "../../assets/no_image.png";
import { ChangeCartProduct } from "../../redux/actions/CartActions";
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
    const [withGlass, setWithGlass] = useState(false);
    const dispatch = useDispatch();

    const getProductInfo = async (product: any) => {
        setCurrentProduct(product.product);
        setProductQuantity(product.quantity);
        setPreviousQuantity(product.quantity);
        setCurrentPrice(product.product.price);
        setTotalValue(product.total_price);
        setWithGlass(product?.product?.with_glass || false);
    };

    useEffect(() => {
        getProductInfo(product);
    }, [product]);

    useEffect(() => {
        if (!isProductLoaded.current) {
            isProductLoaded.current = true;
            return;
        }

        const setNewQuantity = () => {
            if (previousQuantity === productQuantity || productQuantity <= 1)
                return;

            setPreviousQuantity(productQuantity);
        };

        const delayDebounceFn = setTimeout(async () => {
            setNewQuantity();

            await changeCartItem(product.id, {
                quantity: productQuantity,
            }).then(async (res) => {
                setTotalValue(currentPrice * productQuantity);

                if (onQuantityChange) {
                    console.log(res.data);

                    await onQuantityChange({
                        currentObject: {
                            ...product,
                            quantity: productQuantity,
                        },
                        data: res.data,
                    });
                }
            });
        }, 300);

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

            if (fieldName === "with_glass" && !value) {
                onChosen("glass_color_id", null, "glass_color_id");
            }
            await changeCartItem(product.id, { [fieldName]: value }).then(() =>
                dispatch(ChangeCartProduct({ ...product, [fieldName]: value }))
            );
        }
    };

    useEffect(() => {
        console.log(product);
    }, [product]);

    return (
        currentProduct && (
            <div className="checkout-product">
                <div className="checkout-product-inner-container">
                    <div className="checkout-product-image-container">
                        <img
                            className="checkout-product-cell"
                            src={currentPhoto || noImage}
                            alt={`door-${currentProduct.price}-${currentProduct.id}`}
                        />
                    </div>

                    <div className="checkout-product-cell main">
                        <div className="checkout-product-info">
                            <p className="small black bold">
                                {currentProduct.name}
                            </p>
                            <p className="small black">
                                Арт. {currentProduct.sku}
                            </p>
                        </div>

                        <div className="checkout-product-active">
                            <div className="checkout-product-count">
                                <div
                                    className="buy-products-pagination-button"
                                    onClick={() =>
                                        setProductQuantity((prev) =>
                                            prev > 1 ? prev - 1 : prev
                                        )
                                    }
                                >
                                    -
                                </div>

                                <p className="upper black pre-small">
                                    {productQuantity || 1} шт
                                </p>

                                <div
                                    className="buy-products-pagination-button"
                                    onClick={() =>
                                        setProductQuantity((prev) => prev + 1)
                                    }
                                >
                                    +
                                </div>
                            </div>

                            <div className="checkout-product-cell">
                                <p className="upper black bold mid">
                                    {totalValue} ₴{" "}
                                </p>

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
                            </div>
                        </div>
                    </div>
                </div>

                <div className="checkout-product-options checkout-product-cell">
                    <DropDown
                        borderless={false}
                        label="колір"
                        field="color_id"
                        options={{
                            url: "api/v1/product/related/product_color/list/",
                            labelKey: "name",
                        }}
                        onChosen={(fieldName: string, value: any) =>
                            onChosen(fieldName, value, "color_id")
                        }
                        defaultValue={{
                            defaultFieldName: "value",
                            defaultValue: product.color_id,
                        }}
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
                            onChosen={(fieldName: string, value: any) =>
                                onChosen(fieldName, value, "size_id")
                            }
                            defaultValue={{
                                defaultFieldName: "value",
                                defaultValue: product.size_id,
                            }}
                        />
                    ) : null}

                    {currentProduct?.have_glass && (
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
                            onChosen={(fieldName: string, value: any) => {
                                onChosen(fieldName, value, "with_glass");
                                setWithGlass(value);
                            }}
                            defaultValue={{
                                defaultFieldName: "value",
                                defaultValue: product?.with_glass,
                            }}
                        />
                    )}

                    {withGlass && (
                        <DropDown
                            borderless={false}
                            label="колір скла"
                            field="glass_color_id"
                            options={{
                                url: "api/v1/product/related/product_glass_color/list/",
                                labelKey: "name",
                            }}
                            onChosen={(fieldName: string, value: any) =>
                                onChosen(fieldName, value, "color_id")
                            }
                            defaultValue={{
                                defaultFieldName: "value",
                                defaultValue: product?.glass_color_id,
                            }}
                        />
                    )}

                    {currentProduct?.material_choice && (
                        <DropDown
                            borderless={false}
                            label="матеріал"
                            field="material"
                            options={[
                                {
                                    name: "Деревина",
                                    value: "wood",
                                },
                                {
                                    name: "МДФ",
                                    value: "mdf",
                                },
                            ]}
                            onChosen={(fieldName: string, value: any) =>
                                onChosen(fieldName, value, "material_choice")
                            }
                            defaultValue={{
                                defaultFieldName: "value",
                                defaultValue: product?.material,
                            }}
                        />
                    )}

                    {currentProduct?.orientation_choice && (
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
                            defaultValue={{
                                defaultFieldName: "value",
                                defaultValue: product?.orientation,
                            }}
                        />
                    )}

                    {currentProduct?.type_of_platband_choice && (
                        <DropDown
                            borderless={false}
                            label="тип лиштви"
                            field="type_of_platband"
                            options={[
                                {
                                    name: "Звичайний",
                                    value: "default",
                                },
                                {
                                    name: "Г-подібний",
                                    value: "L-shaped",
                                },
                            ]}
                            onChosen={(fieldName: string, value: any) =>
                                onChosen(
                                    fieldName,
                                    value,
                                    "type_of_platband_choice"
                                )
                            }
                            defaultValue={{
                                defaultFieldName: "value",
                                defaultValue: product?.type_of_platband,
                            }}
                        />
                    )}
                </div>
            </div>
        )
    );
};

export default CheckoutProduct;
