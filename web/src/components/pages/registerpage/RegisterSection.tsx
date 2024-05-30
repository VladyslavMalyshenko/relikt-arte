import { useNavigate } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/pages/registerpage/RegisterSection.scss";
import Button from "../../UI/Button";

const RegisterSection = () => {
    const navigate = useNavigate();

    return (
        <div className="register-section">
            <div className="register-modal">
                <p className="upper biggest black">реєстрація</p>
                <div className="register-modal-inputs-wrapper">
                    <div className="register-modal-inputs">
                        <input type="text" placeholder="email" />
                        <div className="register-modal-inputs-phone">
                            <div className="register-modal-inputs-phone-article small">
                                +38
                            </div>
                            <input
                                type="text"
                                maxLength={10}
                                placeholder="номер телефону"
                            />
                        </div>
                        <div className="register-modal-inputs-devided">
                            <input type="text" placeholder="пароль" />
                            <input type="text" placeholder="повторити пароль" />
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
