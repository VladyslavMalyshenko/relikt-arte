import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/UI/Auth.scss";
import "../../../styles/components/pages/passwordrecoverypage/PasswordRecoverySection.scss";
import { confirmRegistration } from "../../../utils/tokenUtils";
import Button from "../../UI/Button";

const RegisterConformationSection = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [success, setSuccess] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const confirmRegistrationFunc = async () => {
            const result = await confirmRegistration(token as string);

            if (result !== undefined) {
                setIsLoaded(true);
                setSuccess(result);
            }
        };

        confirmRegistrationFunc();
    }, [token]);

    const onSubmit = () => {
        navigate(paths.singIn);
    };

    return (
        <div className="auth-section">
            {isLoaded && (
                <>
                    {success ? (
                        <p
                            className="upper big black"
                            style={{ color: "var(--green)" }}
                        >
                            Ви успішно підтвердили реєстрацію
                        </p>
                    ) : (
                        <p
                            className="upper big black"
                            style={{ color: "var(--red)" }}
                        >
                            Невдалося підтвердити реєстрацію
                        </p>
                    )}

                    {success && (
                        <div className="password-modal">
                            <div className="auth-modal-inputs-wrapper">
                                <Button
                                    additionalClasses={["upper"]}
                                    inversed={true}
                                    borderless={false}
                                    style={{ width: "100%" }}
                                    onClickCallback={onSubmit}
                                >
                                    перейти до авторизації
                                </Button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default RegisterConformationSection;
