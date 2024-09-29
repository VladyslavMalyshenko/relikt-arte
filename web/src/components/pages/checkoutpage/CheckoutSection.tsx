import axios from "axios";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/pages/checkoutpage/CheckoutSection.scss";
import { ProductType } from "../../../types/productsRelatedTypes";
import { generateUrl } from "../../../utils/generateUrl";
import { getCart } from "../../../utils/handleCart";
import { getAccessToken, validateToken } from "../../../utils/tokenUtils";
import Button from "../../UI/Button";
import CheckoutModal from "../../UI/CheckoutModal";
import CheckoutProduct from "../../UI/CheckoutProduct";
import Form from "../../UI/Form";
import Loader from "../../UI/Loader";

const CheckoutSection = () => {
    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState<ProductType[]>([]);
    const [totalValue, setTotalValue] = useState(0);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isOrderSuccess, setIsOrderSuccess] = useState(false);
    const [orderInfo, setOrderInfo] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<any>(false);

    useEffect(() => {
        setIsLoading(true);
        const getCartProducts = async () => {
            const cart = await getCart()
                .catch(() => false)
                .finally(() => setIsLoading(false));

            if (cart) {
                setTotalValue(cart.total_value);
                setCartProducts(cart.items.results || []);
            }
        };

        getCartProducts();
    }, []);

    const formController = useForm({
        defaultValues: {
            full_name: "",
            phone: "",
            email: "",
            region: "",
            city_or_settlement: "",
            warehouse: "",
            additional: "",
        },
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = formController;

    const checkoutFields = [
        {
            control: control,
            errors: errors,
            fields: [
                {
                    type: "text",
                    placeholder: "Ім'я та прізвище",
                    name: "full_name",
                    rules: {
                        required: "Ім'я та прізвище є обов'язковими",
                    },
                },
                {
                    type: "phone",
                    placeholder: "номер телефону",
                    name: "phone",
                },
                {
                    type: "email",
                    placeholder: "email",
                    name: "email",
                },
            ],
        },
        {
            control: control,
            errors: errors,
            fields: [
                {
                    type: "dropdown",
                    placeholder: "Область",
                    name: "region",
                    rules: {
                        required: "Область є обов'язковою",
                    },
                    options: {
                        labelField: "description",
                        valueField: "ref",
                        url: "/nova_post/areas",
                    },
                },
                {
                    type: "dropdown",
                    placeholder: "Місто або населений пункт",
                    name: "city_or_settlement",
                    rules: {
                        required: "Місто або населений пункт є обов'язковими",
                    },
                    options: {
                        labelField: [
                            "settlement_type_description",
                            "description",
                        ],
                        valueField: "ref",
                        url: "/nova_post/cities/$region",
                        load: true,
                    },
                },
                {
                    type: "dropdown",
                    placeholder: "Відділення нової пошти або номер дому",
                    name: "warehouse",
                    rules: {
                        required: "Відділення нової пошти є обов'язковими",
                    },
                    options: {
                        labelField: "description",
                        valueField: "ref",
                        url: "/nova_post/warehouses/$city_or_settlement",
                        load: true,
                    },
                },
            ],
        },

        {
            control: control,
            errors: errors,
            fields: [
                {
                    type: "text",
                    placeholder: "Додаткова інформація",
                    name: "additional",
                },
            ],
        },
    ];

    const navigateToProductionPage = () => {
        navigate(paths.buy);
    };

    const onQuantityChange = async () => {
        const cart = await getCart().catch(() => false);

        if (cart) {
            setTotalValue(cart.total_value);
        }
    };

    const handleData = async (data: any) => {
        const allowedFields = [
            "product_id",
            "color_id",
            "size_id",
            "covering_id",
            "glass_color_id",
            "material",
            "type_of_platband",
            "orientation",
            "with_glass",
            "quantity",
        ];

        const filteredCartProducts = cartProducts.map((cartProduct: any) => {
            const filteredProduct = { ...cartProduct };
            Object.keys(filteredProduct).forEach((key) => {
                if (
                    !allowedFields.includes(key) ||
                    filteredProduct[key] === null
                ) {
                    delete filteredProduct[key];
                }
            });
            return filteredProduct;
        });

        for (const field of ["region", "city_or_settlement", "warehouse"]) {
            data[field] = data[field].label;
        }

        if (!data.items) {
            data.items = [];
        }

        data.items = filteredCartProducts;

        const isTokenValid = await validateToken();

        const headers: any = {};

        if (isTokenValid) {
            headers["Authorization"] = `Bearer ${getAccessToken()}`;
        }

        await axios
            .post(generateUrl("/order/create"), data, { headers })
            .then((res) => {
                setIsOrderSuccess(true);
                setOrderInfo(res.data);
            })
            .finally(() => setIsModalVisible(true));
    };

    return (
        <>
            {isModalVisible && (
                <CheckoutModal
                    closeModal={() => setIsModalVisible(false)}
                    orderInfo={orderInfo}
                    success={isOrderSuccess}
                />
            )}

            <div className="checkout-section">
                <div className="checkout-section-header">
                    <p className="black upper biggest ">
                        оформлення замовлення
                    </p>
                    <Button
                        colorScheme={"grey"}
                        additionalClasses={["upper"]}
                        onClickCallback={navigateToProductionPage}
                    >
                        продовжити покупки
                    </Button>
                </div>

                <div className="checkout-section-inner">
                    <div className="checkout-section-inner-inputs">
                        {checkoutFields.map((fieldGroup, index) => (
                            <div
                                key={`fieldGroup[${index}]`}
                                className="checkout-section-inner-inputs-group"
                            >
                                <FormProvider {...formController}>
                                    <Form
                                        control={fieldGroup.control}
                                        errors={fieldGroup.errors}
                                        fields={fieldGroup.fields}
                                    />
                                </FormProvider>
                            </div>
                        ))}

                        <Button
                            inversed={true}
                            borderless={false}
                            additionalClasses={["upper"]}
                            style={{ width: "100%" }}
                            onClickCallback={handleSubmit(handleData)}
                            disabled={cartProducts.length < 1}
                        >
                            оформити замовлення
                        </Button>
                    </div>
                    <div className="checkout-section-inner-products">
                        {!isLoading ? (
                            cartProducts.length > 0 ? (
                                <>
                                    {cartProducts.map(
                                        (product: ProductType) => (
                                            <CheckoutProduct
                                                key={product.id}
                                                product={product}
                                                onQuantityChange={
                                                    onQuantityChange
                                                }
                                            />
                                        )
                                    )}
                                    <div className="checkout-section-inner-products-checkout">
                                        <p className="upper black pre-small bold">
                                            доставка
                                            <span className="regular">
                                                за тарифами перевезника
                                            </span>
                                        </p>

                                        <p className="upper black pre-small bold">
                                            загальна сума
                                            <span className="regular">
                                                {totalValue} ₴
                                            </span>
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <p className="black small">
                                    Ви ще не вибрали жодного товару для
                                    оформлення замовлення
                                </p>
                            )
                        ) : (
                            <Loader />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default CheckoutSection;
