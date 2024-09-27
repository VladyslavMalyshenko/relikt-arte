import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "../../../styles/components/UI/Auth.scss";
import "../../../styles/components/pages/passwordrecoverypage/PasswordRecoverySection.scss";
import { generateUrl } from "../../../utils/generateUrl";
import Button from "../../UI/Button";
import Input from "../../UI/Input";

const PasswordRecoverySection = () => {
    const [success, setSuccess] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [previousEmail, setPreviousEmail] = useState("");

    interface RecoverFormData {
        email: string;
    }

    const defaultValues = {
        email: "",
    };

    const {
        handleSubmit,
        control,
        setError,
        formState: { errors },
    } = useForm<RecoverFormData>({
        defaultValues,
    });

    const onSubmit = async (data: RecoverFormData) => {
        setIsLoaded(false);
        if (data.email === previousEmail || isLoading) return;

        setIsLoading(true);

        await axios
            .post(generateUrl("user/password_reset"), data)
            .then((res) => setSuccess(res.data))
            .catch((err) => {
                const errData = err.response.data;
                setSuccess(false);
                setPreviousEmail(data.email);
                setError("email", {
                    type: "custom",
                    message: errData.detail?.[0].msg || errData.detail,
                });
            })
            .finally(() => {
                setIsLoading(false);
                setIsLoaded(true);
            });
    };

    return (
        <div className="auth-section">
            <p className="upper biggest black">Відновлення паролю</p>

            {!success ? (
                <div className="password-modal">
                    <div className="auth-modal-inputs-wrapper">
                        <div className="auth-modal-inputs">
                            <Input
                                type="email"
                                control={control}
                                errors={errors}
                                placeholder="email"
                                name="email"
                            />
                        </div>

                        <Button
                            additionalClasses={["upper"]}
                            inversed={true}
                            borderless={false}
                            style={{ width: "100%" }}
                            onClickCallback={handleSubmit(onSubmit)}
                        >
                            скинути пароль
                        </Button>
                    </div>
                </div>
            ) : (
                isLoaded &&
                success && (
                    <p className="mid" style={{ color: "var(--green)" }}>
                        На вашу поштову скниньку було надіслано повідомлення з
                        посиланням на сторінку скидання паролю. Вам потрібно
                        перейти за посиланням та ввести новий пароль.
                    </p>
                )
            )}
        </div>
    );
};

export default PasswordRecoverySection;
