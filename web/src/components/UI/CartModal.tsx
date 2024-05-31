import { useState } from "react";
import "../../styles/components/UI/CartModal.scss";
import Button from "./Button";

type CartModalProps = {
    closeModal: () => void;
};

const CartModal = ({ closeModal }: CartModalProps) => {
    const stopPropagation = (e: any) => e.stopPropagation();
    const [products, setProducts] = useState([]);

    return (
        <div className="cart-modal" onClick={closeModal}>
            <div className="cart-modal-inner" onClick={stopPropagation}>
                <div className="cart-modal-inner-header">
                    <p className="upper black mid">корзина</p>
                    <svg
                        onClick={closeModal}
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.6575 1.34318L1.34375 12.6569M12.6575 12.6568L1.34375 1.34311"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        />
                    </svg>
                </div>

                <div className="cart-modal-inner-products">
                    <p className="black pre-small">
                        {products.length > 0
                            ? "Ваше замовлення:"
                            : "Тут поки що нічого немає ;("}
                    </p>
                </div>

                <div className="cart-modal-inner-buttons">
                    {products.length > 0 && (
                        <div className="cart-modal-inner-payment">
                            <p className="black mid upper bold">2905 ₴</p>

                            <Button
                                inversed={true}
                                borderless={false}
                                additionalClasses={["upper"]}
                            >
                                перейти до сплати
                            </Button>
                        </div>
                    )}

                    <Button
                        colorScheme={"grey"}
                        onClickCallback={closeModal}
                        additionalClasses={["upper"]}
                    >
                        продовжити покупки
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;
