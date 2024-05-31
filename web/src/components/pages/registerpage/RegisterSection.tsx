import { useNavigate } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/UI/Auth.scss";
import Button from "../../UI/Button";

const RegisterSection = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-section">
            <div className="auth-modal">
                <p className="upper biggest black">реєстрація</p>
                <div className="auth-modal-inputs-wrapper">
                    <div className="auth-modal-inputs">
                        <input type="email" placeholder="email" />
                        <div className="auth-modal-inputs-phone">
                            <div className="auth-modal-inputs-phone-article small">
                                +38
                            </div>
                            <input
                                type="text"
                                maxLength={10}
                                placeholder="номер телефону"
                            />
                        </div>
                        <div className="auth-modal-inputs-devided">
                            <input type="password" placeholder="пароль" />
                            <input
                                type="password"
                                placeholder="повторити пароль"
                            />
                        </div>
                    </div>

                    <Button
                        additionalClasses={["upper"]}
                        inversed={true}
                        borderless={false}
                        style={{ width: "100%" }}
                    >
                        зареєструватись
                    </Button>

                    <span></span>

                    <Button
                        colorScheme={"facebook"}
                        style={{ width: "100%" }}
                        borderless={false}
                    />

                    <Button
                        colorScheme={"grey"}
                        additionalClasses={["upper"]}
                        onClickCallback={() => navigate(paths.singIn)}
                    >
                        увійти до аккаунту
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default RegisterSection;
