import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/pages/checkoutpage/CheckoutSection.scss";
import { ProductType } from "../../../types/productsRelatedTypes";
import { getItems } from "../../../utils/getItems";
import Button from "../../UI/Button";
import CheckoutProduct from "../../UI/CheckoutProduct";
import Form from "../../UI/Form";

interface CheckoutFormData {
    fullName: string;
    phoneNumber: string;
    email: string;
    region: string;
    residence: string;
    novaposhtaBranch: string;
    address: string;
    additional: string;
}

const defaultValues = {
    fullName: "",
    phoneNumber: "",
    email: "",
    region: "",
    residence: "",
    novaposhtaBranch: "",
    address: "",
    additional: "",
};

const CheckoutSection = () => {
    const navigate = useNavigate();
    const [cartProducts, setCartProducts] = useState<ProductType[]>([]);

    useEffect(() => {
        const getCartProducts = async () => {
            const newCartProducts = await getItems("/api/v1/product/list");
            setCartProducts(newCartProducts);
        };

        getCartProducts();
    }, []);

    const {
        control,
        handleSubmit,

        formState: { errors },
    } = useForm<CheckoutFormData>({
        defaultValues,
    });

    const checkoutFields = [
        {
            control: control,
            errors: errors,
            fields: [
                {
                    type: "text",
                    placeholder: "Ім'я та прізвище",
                    name: "fullName",
                    rules: {
                        required: "Ім'я та прізвище є обов'язковими",
                    },
                },
                {
                    type: "phone",
                    placeholder: "номер телефону",
                    name: "phoneNumber",
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
                    type: "text",
                    placeholder: "Область",
                    name: "region",
                    rules: {
                        required: "Область є обов'язковою",
                    },
                },
                {
                    type: "text",
                    placeholder: "Місто або населений пункт",
                    name: "residence",
                    rules: {
                        required: "Місто або населений пункт є обов'язковими",
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
                    placeholder: "Відділення нової пошти або номер дому",
                    name: "novaposhtaBranch",
                    rules: {
                        required:
                            "Відділення нової пошти або номер дому є обов'язковими",
                    },
                },
                {
                    type: "text",
                    placeholder: "Вулиця проживання або нової пошти",
                    name: "address",
                    rules: {
                        required:
                            "Вулиця проживання або нової пошти є обов'язковими",
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

    return (
        <div className="checkout-section">
            <div className="checkout-section-header">
                <p className="black upper biggest ">оформлення замовлення</p>
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
                            <Form
                                control={fieldGroup.control}
                                errors={fieldGroup.errors}
                                fields={fieldGroup.fields}
                            />
                        </div>
                    ))}

                    <Button
                        inversed={true}
                        borderless={false}
                        additionalClasses={["upper"]}
                        style={{ width: "100%" }}
                        onClickCallback={handleSubmit((data) =>
                            console.log(data)
                        )}
                    >
                        оформити замовлення
                    </Button>
                </div>
                <div className="checkout-section-inner-products">
                    {cartProducts.map((product: ProductType) => (
                        <CheckoutProduct key={product.id} product={product} />
                    ))}
                    <div className="checkout-section-inner-products-checkout">
                        <p className="upper black pre-small bold">
                            доставка
                            <span className="regular">
                                за тарифами перевезника
                            </span>
                        </p>

                        <p className="upper black pre-small bold">
                            загальна сума
                            <span className="regular">2905 ₴</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSection;
