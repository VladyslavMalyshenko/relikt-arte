import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/UI/Auth.scss";
import Button from "../../UI/Button";

const SingInSection = () => {
    const navigate = useNavigate();

    return (
        <div className="auth-section">
            <div className="auth-modal">
                <p className="upper biggest black">Увійти</p>
                <div className="auth-modal-inputs-wrapper">
                    <Button
                        colorScheme={"facebook"}
                        style={{ width: "100%" }}
                        borderless={false}
                    />

                    <p className="upper black pre-small">або</p>

                    <div className="auth-modal-inputs">
                        <input type="email" placeholder="email" />
                        <input type="password" placeholder="пароль" />

                        <Link
                            to={paths.passwordRecover}
                            className="upper black forgot-password"
                        >
                            забули пароль?
                        </Link>
                    </div>

                    <Button
                        additionalClasses={["upper"]}
                        inversed={true}
                        borderless={false}
                        style={{ width: "100%" }}
                    >
                        увійти
                    </Button>

                    <Button
                        colorScheme={"grey"}
                        additionalClasses={["upper"]}
                        onClickCallback={() => navigate(paths.register)}
                    >
                        реєстрація як новий користувач
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default SingInSection;
