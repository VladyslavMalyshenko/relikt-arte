import "../../../styles/components/UI/Auth.scss";
import "../../../styles/components/pages/passrecoverypage/PassRecoverySection.scss";
import Button from "../../UI/Button";

const PassRecoverySection = () => {
    return (
        <div className="auth-section">
            <p className="upper biggest black">Відновлення паролю</p>
            <div className="password-modal">
                <div className="auth-modal-inputs-wrapper">
                    <div className="auth-modal-inputs">
                        <input type="email" placeholder="email" />
                    </div>

                    <Button
                        additionalClasses={["upper"]}
                        inversed={true}
                        borderless={false}
                        style={{ width: "100%" }}
                    >
                        скинути пароль
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default PassRecoverySection;
