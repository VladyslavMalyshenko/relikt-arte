import ProductStaticImage from "../../assets/staticProductImage.webp";
import "../../styles/components/UI/CheckoutProduct.scss";
import { ProductType } from "../../types/productsRelatedTypes";

type CheckoutProductProps = {
    product: ProductType;
};

const CheckoutProduct = ({ product }: CheckoutProductProps) => {
    return (
        <div className="checkout-product">
            <img
                src={ProductStaticImage}
                alt={`door-${product.price}-${product.id}`}
            />
            {/* <p className="upper black pre-small">{product.model}</p> */}
            {/* <p className="upper black pre-small">{product.count} шт</p> */}
            <p className="upper black bold mid">{product.price} ₴</p>
        </div>
    );
};

export default CheckoutProduct;
