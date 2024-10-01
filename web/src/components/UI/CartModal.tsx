import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { paths } from "../../router/paths";
import "../../styles/components/UI/CartModal.scss";
import { deleteCartItem, getCart } from "../../utils/handleCart";
import Button from "./Button";
import CheckoutProduct from "./CheckoutProduct";
import Loader from "./Loader";

type CartModalProps = {
    closeModal: () => void;
};

const CartModal = ({ closeModal }: CartModalProps) => {
    const stopPropagation = (e: any) => e.stopPropagation();
    const navigate = useNavigate();
    const [products, setProducts] = useState<any>([]); // checkout product type needed
    const [itemsInfo, setItemsInfo] = useState<any>({});
    const [totalValue, setTotalValue] = useState(0);
    const [isLoaded, setIsLoaded] = useState(false);
    const [cart, setCart] = useState<any>({});

    useEffect(() => {
        const setUpCart = async () => {
            setIsLoaded(false);

            const cart = await getCart().finally(() => {
                setIsLoaded(true);
            });

            if (cart) {
                setCart(cart);
                setTotalValue(cart.total_value);
                setItemsInfo(cart.items);
                setProducts(cart.items.results);
            }
        };

        setUpCart();
    }, []);

    const deleteItem = async (id: number) => {
        setIsLoaded(false);

        const cart = await deleteCartItem(id).finally(() => [
            setIsLoaded(true),
        ]);

        if (cart) {
            setCart(cart);
            setItemsInfo(cart.items);
            setProducts(cart.items.results);
        }
    };

    return (
        <div className="cart-modal" onClick={closeModal}>
            <div className="cart-modal-inner-wrapper" onClick={stopPropagation}>
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
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div className="cart-modal-inner-products-container">
                        {isLoaded ? (
                            <>
                                <p className="black pre-small">
                                    {products.length > 0
                                        ? "Ваше замовлення:"
                                        : "Тут поки що нічого немає ;("}
                                </p>

                                {products.length > 0 && (
                                    <div className="cart-modal-inner-products">
                                        {products.map((product: any) => (
                                            <CheckoutProduct
                                                product={product}
                                                setValue={() => false}
                                                deleteItem={deleteItem}
                                                onQuantityChange={(data: any) =>
                                                    setTotalValue(
                                                        data.total_value
                                                    )
                                                }
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        ) : (
                            <Loader />
                        )}
                    </div>

                    <div className="cart-modal-inner-buttons">
                        {products.length > 0 && isLoaded ? (
                            <div className="cart-modal-inner-payment">
                                <p className="black mid upper bold">
                                    {totalValue} ₴
                                </p>

                                <Button
                                    inversed={true}
                                    borderless={false}
                                    additionalClasses={["upper"]}
                                    onClickCallback={() => {
                                        closeModal();
                                        navigate(paths.checkout);
                                    }}
                                >
                                    перейти до сплати
                                </Button>
                            </div>
                        ) : null}

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
        </div>
    );
};

export default CartModal;
