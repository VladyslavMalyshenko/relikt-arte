import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import noImage from "../../../assets/no_image.png";
import { SetIsLoaded } from "../../../redux/actions/LoadActions";
import { paths } from "../../../router/paths";
import "../../../styles/components/pages/productpage/ProductSection.scss";
import {
    ProductPhotoType,
    ProductType,
} from "../../../types/productsRelatedTypes";
import { getItem } from "../../../utils/getItem";
import { addCartItem } from "../../../utils/handleCart";
import Button from "../../UI/Button";
import DropDown from "../../UI/DropDown";
import Loader from "../../UI/Loader";
import Path from "../../UI/Path";

const ProductSection = () => {
    const { product_id } = useParams();
    const [product, setProduct] = useState<ProductType | undefined>(undefined);
    const [productPhotos, setProductPhotos] = useState<ProductPhotoType[]>([]);
    const [currentPhoto, setCurrentPhoto] = useState<string>("");
    const isLoaded = useSelector((state: any) => state.LoadReducer.isLoaded);
    const navigate = useNavigate();
    const { getValues, setValue, handleSubmit } = useForm();
    const [currentValues, setCurrentValues] = useState<any>({});
    const [allowedSizes, setAllowedSizes] = useState<any>([]);
    const dispatch = useDispatch();

    const setIsLoaded = (isLoaded: boolean) => {
        dispatch(SetIsLoaded(isLoaded));
    };

    useEffect(() => {
        const getCurrentProduct = async () => {
            try {
                if (!product) {
                    const newProduct = await getItem("api/v1/product/$id", {
                        id: product_id,
                    });

                    setProduct(newProduct);
                }
            } catch {
                navigate(paths.buy);
            }
        };

        getCurrentProduct();
    }, []);

    useEffect(() => {
        setIsLoaded(false);

        const getAllowedSizes = async () => {
            if (product && product?.category_id !== null) {
                if (allowedSizes.length < 1) {
                    let currentSizes: any = [];

                    const currentCategory = await getItem(
                        `api/v1/product/category/${product.category_id}/`
                    );

                    const currentAllowedSizes = currentCategory.allowed_sizes;

                    if (currentAllowedSizes && currentAllowedSizes.length > 0) {
                        for (const sizeId of currentAllowedSizes) {
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

                setIsLoaded(true);
            }
        };

        const setUpPhotos = () => {
            if (product && product.photos) {
                setProductPhotos(product.photos);
                setCurrentPhoto(
                    product.photos.find(
                        (photo: ProductPhotoType) => photo.is_main
                    )?.photo || ""
                );
            }
        };

        getAllowedSizes();
        setUpPhotos();
    }, [product]);

    const onChosen = (fieldName: string, value: any, field: string) => {
        const newPhoto = productPhotos.find(
            (photo: any) => photo[field] === value
        );

        if (newPhoto) {
            setCurrentPhoto(newPhoto.photo);
        }

        setValue(fieldName, value);
        setCurrentValues(getValues());
    };

    const handleData = async (data: any) => {
        if (product) {
            data.product_id = product.id;

            if (
                data?.with_glass !== undefined &&
                !data.with_glass &&
                data?.glass_color_id
            ) {
                delete data.glass_color_id;
            }

            await addCartItem(data);
        }
    };

    return (
        <div className="product-section">
            <Path
                segments={[
                    { name: "головна", location: paths.main },
                    { name: "продукція", location: paths.buy },
                    {
                        name: product?.sku || "",
                        location: paths.buy + `/${product_id}`,
                    },
                ]}
            />

            {!isLoaded || !product || JSON.stringify(product) === "{}" ? (
                <Loader />
            ) : (
                <>
                    <div className="product-info">
                        <div className="product-info-main">
                            <div className="product-info-main-image">
                                <img src={currentPhoto || noImage} />

                                <p className="small black sku">
                                    Артикул: {product.sku}
                                </p>
                            </div>

                            <div className="product-info-main-description">
                                <div className="product-info-main-description-principal">
                                    <p className="upper black mid">
                                        {product.name}
                                    </p>
                                    <p className="black small">
                                        {product?.description?.text &&
                                            product?.description.text}
                                    </p>
                                </div>

                                <div className="product-info-main-description-button">
                                    <p className="upper black bold big">
                                        {product?.price} ₴
                                    </p>

                                    <Button
                                        inversed={true}
                                        borderless={false}
                                        additionalClasses={["upper"]}
                                        onClickCallback={handleSubmit(
                                            handleData
                                        )}
                                    >
                                        <svg
                                            width="19"
                                            height="20"
                                            viewBox="0 0 28 29"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <g>
                                                <path
                                                    d="M12.833 24.5542C12.833 25.5207 12.0495 26.3042 11.083 26.3042C10.1165 26.3042 9.33301 25.5207 9.33301 24.5542C9.33301 23.5877 10.1165 22.8042 11.083 22.8042C12.0495 22.8042 12.833 23.5877 12.833 24.5542Z"
                                                    stroke="currentColor"
                                                />
                                                <path
                                                    d="M23.333 24.5542C23.333 25.5207 22.5495 26.3042 21.583 26.3042C20.6165 26.3042 19.833 25.5207 19.833 24.5542C19.833 23.5877 20.6165 22.8042 21.583 22.8042C22.5495 22.8042 23.333 23.5877 23.333 24.5542Z"
                                                    stroke="currentColor"
                                                />
                                                <path
                                                    d="M6.99967 5.30416H20.9997C23.577 5.30416 25.6663 7.3935 25.6663 9.97082V15.8042C25.6663 18.3815 23.577 20.4708 20.9997 20.4708H11.6663C9.08901 20.4708 6.99967 18.3815 6.99967 15.8042V5.30416ZM6.99967 5.30416C6.99967 4.01549 5.95501 2.97083 4.66634 2.97083H2.33301M6.99967 9.97082H25.083"
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </g>
                                        </svg>
                                        додати до кошику
                                    </Button>
                                </div>

                                <div className="product-info-main-description-options">
                                    <DropDown
                                        borderless={false}
                                        label="колір"
                                        field="color_id"
                                        options={{
                                            url: "api/v1/product/related/product_color/list/",
                                            labelKey: "name",
                                        }}
                                        onChosen={(
                                            fieldName: string,
                                            value: any
                                        ) =>
                                            onChosen(
                                                fieldName,
                                                value,
                                                "color_id"
                                            )
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
                                            onChosen={(
                                                fieldName: string,
                                                value: any
                                            ) =>
                                                onChosen(
                                                    fieldName,
                                                    value,
                                                    "size_id"
                                                )
                                            }
                                        />
                                    ) : null}

                                    {product?.have_glass && (
                                        <>
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
                                                onChosen={(
                                                    fieldName: string,
                                                    value: any
                                                ) =>
                                                    onChosen(
                                                        fieldName,
                                                        value,
                                                        "have_glass"
                                                    )
                                                }
                                            />

                                            {currentValues.with_glass && (
                                                <DropDown
                                                    borderless={false}
                                                    label="колір скла"
                                                    field="glass_color_id"
                                                    options={{
                                                        url: "api/v1/product/related/product_glass_color/list/",
                                                        labelKey: "name",
                                                    }}
                                                    onChosen={(
                                                        fieldName: string,
                                                        value: any
                                                    ) =>
                                                        onChosen(
                                                            fieldName,
                                                            value,
                                                            "color_id"
                                                        )
                                                    }
                                                />
                                            )}
                                        </>
                                    )}

                                    {product?.material_choice && (
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
                                            onChosen={(
                                                fieldName: string,
                                                value: any
                                            ) =>
                                                onChosen(
                                                    fieldName,
                                                    value,
                                                    "material_choice"
                                                )
                                            }
                                        />
                                    )}

                                    {product?.orientation_choice && (
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
                                            onChosen={(
                                                fieldName: string,
                                                value: any
                                            ) =>
                                                onChosen(
                                                    fieldName,
                                                    value,
                                                    "have_orientation_choice"
                                                )
                                            }
                                        />
                                    )}

                                    {product?.type_of_platband_choice && (
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
                                            onChosen={(
                                                fieldName: string,
                                                value: any
                                            ) =>
                                                onChosen(
                                                    fieldName,
                                                    value,
                                                    "type_of_platband_choice"
                                                )
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="product-info-additional">
                            {product?.description?.advantages &&
                            product.description.advantages.length > 0 ? (
                                <div className="product-info-additional-opportunities">
                                    <p className="upper pre-small black bold">
                                        Переваги
                                    </p>

                                    <div className="product-info-additional-info">
                                        {product.description.advantages.map(
                                            (
                                                advantage: string,
                                                index: number
                                            ) => {
                                                const advantages = product
                                                    ?.description
                                                    ?.advantages as string[];

                                                const lastItem =
                                                    advantages[
                                                        advantages.length - 1
                                                    ];

                                                return (
                                                    <p
                                                        key={`advantagesProduct[${index}]`}
                                                        className="black small"
                                                    >
                                                        - {advantage}{" "}
                                                        {lastItem === advantage
                                                            ? "."
                                                            : ";"}
                                                    </p>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            ) : null}

                            {product?.description?.finishing?.covering
                                ?.advantages &&
                            product.description.finishing.covering.advantages
                                .length > 0 ? (
                                <div className="product-info-additional-decoration">
                                    <p className="upper pre-small black bold">
                                        Оздоблення
                                    </p>

                                    <div className="product-info-additional-info">
                                        <p className="black small">
                                            {
                                                product?.description?.finishing
                                                    ?.covering.text
                                            }
                                        </p>
                                        {product?.description?.finishing?.covering?.advantages.map(
                                            (
                                                advantage: string,
                                                index: number
                                            ) => {
                                                const advantages = product
                                                    ?.description?.finishing
                                                    ?.covering
                                                    ?.advantages as string[];

                                                const lastItem =
                                                    advantages[
                                                        advantages.length - 1
                                                    ];

                                                return (
                                                    <p
                                                        key={`finishingProduct[${index}]`}
                                                        className="black small"
                                                    >
                                                        - {advantage}{" "}
                                                        {lastItem === advantage
                                                            ? "."
                                                            : ";"}
                                                    </p>
                                                );
                                            }
                                        )}
                                    </div>
                                </div>
                            ) : null}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductSection;
