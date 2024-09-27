import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/UI/Auth.scss";
import "../../../styles/components/pages/passwordrecoverypage/PasswordRecoverySection.scss";
import { confirmEmailChange } from "../../../utils/handleUser";
import Button from "../../UI/Button";

const EmailChangeConfirmationSection = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [success, setSuccess] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const confirmRegistrationFunc = async () => {
            const result = await confirmEmailChange(token as string);

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
                            Ви успішно змінили пошту
                        </p>
                    ) : (
                        <p
                            className="upper big black"
                            style={{ color: "var(--red)" }}
                        >
                            Невдалося змінити Вашу пошту ;(
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

export default EmailChangeConfirmationSection;
