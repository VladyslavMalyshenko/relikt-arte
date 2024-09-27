import { useNavigate } from "react-router-dom";
import { paths } from "../../router/paths";
import "../../styles/components/UI/CartModal.scss";
import Button from "./Button";

type CheckoutModalProps = {
    closeModal: () => void;
    success: boolean;
    orderInfo?: any;
};

const CheckoutModal = ({
    closeModal,
    success,
    orderInfo,
}: CheckoutModalProps) => {
    const stopPropagation = (e: any) => e.stopPropagation();
    const navigate = useNavigate();

    return (
        <div className="cart-modal" onClick={closeModal}>
            <div className="cart-modal-inner" onClick={stopPropagation}>
                <div className="cart-modal-inner-header">
                    <p className="upper black mid">оформлення замовлення</p>
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

                <div className="cart-modal-inner-products-container centered">
                    {success ? (
                        <p
                            className="black pre-small"
                            style={{
                                color: "var(--green)",
                            }}
                        >
                            Ви оформили замовлення. Номер замовлення - №
                            {orderInfo.id}
                        </p>
                    ) : (
                        <p
                            className="black pre-small"
                            style={{
                                color: "var(--red)",
                            }}
                        >
                            Не вдалося оформити замовлення ;( Спробуйте ще раз
                        </p>
                    )}

                    <div className="cart-modal-inner-buttons">
                        {success && (
                            <Button
                                colorScheme={"grey"}
                                additionalClasses={["upper"]}
                                onClickCallback={() =>
                                    navigate(
                                        paths.order.replace(
                                            ":order_id",
                                            orderInfo.id
                                        )
                                    )
                                }
                            >
                                перейти до деталей
                            </Button>
                        )}

                        <Button
                            colorScheme={"grey"}
                            additionalClasses={["upper"]}
                            onClickCallback={() => navigate(paths.buy)}
                        >
                            продовжити вибір
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutModal;
