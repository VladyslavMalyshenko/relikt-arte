import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../../styles/components/pages/orderpage/OrderSection.scss";
import { generateUrl } from "../../../utils/generateUrl";
import OrderProduct from "../../UI/OrderProduct";

const OrderSection = () => {
    const { order_id } = useParams();
    const [order, setOrder] = useState<any>({});
    const [error, setError] = useState(false);

    useEffect(() => {
        const getOrder = async () => {
            if (order_id) {
                await axios
                    .get(generateUrl(`/order/${order_id}`))
                    .then((res) => setOrder(res.data))
                    .catch(() => setError(true));
            }
        };

        getOrder();
    }, [order_id]);

    useEffect(() => {
        console.log(order);
    }, [order]);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}.${month}.${year}`;
    };

    return JSON.stringify(order) !== "{}" && !error ? (
        <div className="order-container">
            <p className="black small header upper bold">
                Замовлення №{order.id}
            </p>

            <div className="order-inner-wrapper">
                <div className="order-items">
                    {order.items.results.length > 0 &&
                        order.items.results.map((item: any) => (
                            <OrderProduct product={item} />
                        ))}
                </div>

                <div className="order-info">
                    <p className="black small">
                        Ім`я отримувача: {order.full_name}
                    </p>
                    <p className="black small">
                        Номер телефону отримувача: {order.phone}
                    </p>
                    <p className="black small">
                        Email отримувача: {order.email}
                    </p>
                    <p className="black small">
                        Час оформлення: {formatDate(order.created_at)}
                    </p>
                    <p className="black small">
                        Адреса доставки: {order.region},{" "}
                        {order.city_or_settlement}
                    </p>
                    <p className="black small">
                        Адреса відділення нової пошти: {order.warehouse}
                    </p>
                    <p className="black mid bold upper">
                        До сплати: {order.total_value}₴
                    </p>
                </div>
            </div>
        </div>
    ) : (
        <p>На жаль ми не змогли знайти замовлення за даним номером ;(</p>
    );
};

export default OrderSection;