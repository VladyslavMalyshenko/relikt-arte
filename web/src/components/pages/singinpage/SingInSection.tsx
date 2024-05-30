import { useNavigate } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/pages/registerpage/RegisterSection.scss";
import Button from "../../UI/Button";

const SingInSection = () => {
    const navigate = useNavigate();

    return (
        <div className="register-section">
            <div className="register-modal">
                <p className="upper biggest black">Увійти</p>
                <div className="register-modal-inputs-wrapper">
                    <Button
                        colorScheme={"facebook"}
                        style={{ width: "100%" }}
                        borderless={false}
                    />

                    <p className="upper black pre-small">або</p>

                    <div className="register-modal-inputs">
                        <input type="text" placeholder="email" />
                        <input type="text" placeholder="пароль" />
                    </div>

                    <Button
                        additionalClasses={["upper"]}
                        inversed={true}
                        borderless={false}
                        style={{ width: "100%" }}
                    >
                        зареєструватись
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
