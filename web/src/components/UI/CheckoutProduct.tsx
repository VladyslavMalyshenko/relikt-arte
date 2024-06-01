import { ProductType } from "../../data/products";
import "../../styles/components/UI/CheckoutProduct.scss";

type CheckoutProductProps = {
    product: ProductType;
};

const CheckoutProduct = ({ product }: CheckoutProductProps) => {
    return (
        <div className="checkout-product">
            <img src={product.image} alt={product.model} />
            <p className="upper black pre-small">{product.model}</p>
            <p className="upper black pre-small">{product.count} шт</p>
            <p className="upper black bold mid">{product.price} ₴</p>
        </div>
    );
};

export default CheckoutProduct;
