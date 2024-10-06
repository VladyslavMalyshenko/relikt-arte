import axios from "axios";
import { useEffect, useState } from "react";
import noImage from "../../assets/no_image.png";
import "../../styles/components/UI/CheckoutProduct.scss";
import { generateUrl } from "../../utils/generateUrl";

type OrderProductProps = {
    product: any; // checkout product type needed
};

const OrderProduct = ({ product }: OrderProductProps) => {
    const [currentPhoto, setCurrentPhoto] = useState<string>("");
    const [currentProduct, setCurrentProduct] = useState<any>({});
    const [productQuantity, setProductQuantity] = useState<number>(1);
    const [totalValue, setTotalValue] = useState<number>(0);
    const [colorName, setColorName] = useState<boolean | string>(false);
    const [sizeName, setSizeName] = useState<boolean | string>(false);
    const [typeOfPlatband, setTypeOfPlatband] = useState<boolean | string>(
        false
    );
    const [orientation, setOrientation] = useState<boolean | string>(false);
    const [material, setMaterial] = useState<boolean | string>(false);
    const [withGlass, setWithGlass] = useState<boolean | string>(false);
    const [glassColorName, setGlassColorName] = useState<boolean | string>(
        false
    );

    const getProductInfo = async (product: any) => {
        console.log(product);

        setCurrentProduct(product.product);
        setProductQuantity(product.quantity);
        setTotalValue(product.total_price);
    };

    useEffect(() => {
        getProductInfo(product);

        const setChosenOptions = async () => {
            if (product.color_id) {
                await axios
                    .get(
                        generateUrl(
                            `product/related/product_color/${product.color_id}`
                        )
                    )
                    .then((res) => {
                        setColorName(res.data.name);
                    });
            }

            if (product.size_id) {
                await axios
                    .get(generateUrl(`product/size/${product.size_id}`))
                    .then((res) => {
                        setSizeName(res.data.dimensions);
                    });
            }

            if (product.product.type_of_platband_choice) {
                setTypeOfPlatband(
                    product.type_of_platband === "default"
                        ? "Звичайний"
                        : "Г-подібний"
                );
            }

            setOrientation(
                product.orientation
                    ? product.orientation === "left"
                        ? "Ліва"
                        : "Права"
                    : "Ліва"
            );

            if (product.product.material_choice) {
                setMaterial(product.material === "wood" ? "Дерево" : "МДФ");
            }

            if (product.product.have_glass !== undefined) {
                setWithGlass(product.with_glass ? "Присутнє" : "Відсутнє");

                console.log(product);

                if (product.with_glass && product.glass_color_id !== null) {
                    await axios
                        .get(
                            generateUrl(
                                `product/related/product_glass_color/${product.glass_color_id}`
                            )
                        )
                        .then((res) => {
                            setGlassColorName(res.data.name);
                        });
                }
            }
        };

        const setImage = () => {
            setCurrentPhoto(
                product.product?.photos?.find((photo: any) => photo.is_main)
                    ?.photo || ""
            );
        };

        setImage();

        setChosenOptions();
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
                                <p className="upper black pre-small">
                                    {productQuantity || 1} шт
                                </p>
                            </div>
                            <p className="upper black bold mid">
                                {totalValue} ₴
                            </p>
                        </div>
                    </div>
                </div>

                <div className="checkout-product-options order checkout-product-cell">
                    {colorName && (
                        <p className="black small">Колір: {colorName}</p>
                    )}

                    {sizeName && (
                        <p className="black small">
                            Обраний розмір: {sizeName}
                        </p>
                    )}

                    {typeOfPlatband && (
                        <p className="black small">
                            Тип лиштви: {typeOfPlatband}
                        </p>
                    )}

                    {orientation && (
                        <p className="black small">
                            Сторона петель: {orientation}
                        </p>
                    )}

                    {material && (
                        <p className="black small">Матеріал: {material}</p>
                    )}

                    {withGlass && (
                        <>
                            <p className="black small">
                                Наявність скла: {withGlass}
                            </p>

                            {glassColorName && (
                                <p className="black small">
                                    Колір скла: {glassColorName}
                                </p>
                            )}
                        </>
                    )}
                </div>
            </div>
        )
    );
};

export default OrderProduct;
