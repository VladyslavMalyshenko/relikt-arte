import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/pages/productpage/ProductSection.scss";
import {
    ProductPhotoType,
    ProductType,
} from "../../../types/productsRelatedTypes";
import { getItem } from "../../../utils/getItem";
import Button from "../../UI/Button";
import DropDown from "../../UI/DropDown";
import Path from "../../UI/Path";

const ProductSection = () => {
    const { product_id } = useParams();
    const [product, setProduct] = useState<ProductType | undefined>(undefined);
    const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLoaded(false);

        const getCurrentProduct = async () => {
            try {
                const newProduct = await getItem("api/v1/product/$id", {
                    id: product_id,
                });

                setIsLoaded(true);
                setProduct(newProduct);
            } catch {
                navigate(paths.buy);
            }
        };

        getCurrentProduct();
    }, []);
    return (
        <div className="product-section">
            {!isLoaded && (!product || JSON.stringify(product) === "{}") ? (
                <p>Завантаження...</p>
            ) : (
                <>
                    <Path
                        segments={[
                            { name: "головна", location: paths.main },
                            { name: "продукція", location: paths.buy },
                            {
                                name: "тестовий продукт",
                                location: paths.buy + `/${product_id}`,
                            },
                        ]}
                    />

                    <div className="product-info">
                        <div className="product-info-main">
                            <div className="product-info-main-image">
                                <img
                                    src={
                                        product?.photos.find(
                                            (photo: ProductPhotoType) =>
                                                photo.is_main
                                        )?.photo ||
                                        "https://i.pinimg.com/originals/04/fb/4b/04fb4b12ab87e1832d17f723c81d1d69.png"
                                    }
                                />
                            </div>

                            <div className="product-info-main-description">
                                <div className="product-info-main-description-principal">
                                    <p className="upper black mid">
                                        тестовий продукт
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
                                        options={[
                                            "1",
                                            "2",
                                            "1",
                                            "2",
                                            "1",
                                            "2",
                                            "1",
                                            "2",
                                            "1",
                                            "2",
                                            "1",
                                            "2",
                                            "1",
                                            "2",
                                        ]}
                                    />
                                    <DropDown
                                        borderless={false}
                                        label="колір"
                                        options={["1", "2"]}
                                    />
                                    <DropDown
                                        borderless={false}
                                        label="колір"
                                        options={["1", "2"]}
                                    />
                                    <DropDown
                                        borderless={false}
                                        label="колір"
                                        options={[
                                            "1",
                                            "2",
                                            "1",
                                            "2",
                                            "1",
                                            "2",
                                            "1",
                                            "2",
                                            "1",
                                            "2",
                                            "1",
                                            "2",
                                            "1",
                                            "2",
                                            "1",
                                            "2",
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="product-info-additional">
                            {product?.description?.advantages && (
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
                            )}

                            {product?.description?.finishing?.covering
                                ?.advantages && (
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
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default ProductSection;
