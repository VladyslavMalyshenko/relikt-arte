import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/UI/Auth.scss";
import "../../../styles/components/pages/passwordrecoverypage/PasswordRecoverySection.scss";
import { generateUrl } from "../../../utils/generateUrl";
import Button from "../../UI/Button";
import Input from "../../UI/Input";

const PasswordResetSection = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [success, setSuccess] = useState(false);
    const { token } = useParams();
    const navigate = useNavigate();
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        defaultValues: { new_password: "", new_password_confirm: "" },
    });

    const resetPassword = async (data: any) => {
        const result = await axios
            .post(
                generateUrl(`/user/password_reset_confirm?token=${token}`),
                data
            )
            .then((res) => res.data)
            .catch(() => false);

        if (result !== undefined) {
            setIsLoaded(true);
            setSuccess(result);
        }
    };

    const onSubmit = () => {
        navigate(paths.singIn);
    };

    useEffect(() => {
        if (isLoaded && !success)
            setTimeout(() => navigate(paths.register), 3000);
    }, [success]);

    return (
        <div className="auth-section">
            <p className="black big upper">скинути пароль</p>
            {!success ? (
                <>
                    <div className="password-modal">
                        <div className="auth-modal-inputs-wrapper">
                            <Input
                                type="password"
                                control={control}
                                errors={errors}
                                placeholder="Пароль"
                                name="new_password"
                                rules={{
                                    required: "Пароль є обов'язковим",
                                    minLength: {
                                        value: 6,
                                        message: "Пароль занадто короткий",
                                    },
                                }}
                            />
                            <Input
                                type="password"
                                control={control}
                                errors={errors}
                                placeholder="Повторний пароль"
                                name="new_password_confirm"
                                rules={{
                                    required: "Повторний пароль є обов'язковим",
                                    validate: (value: string) =>
                                        value === watch("new_password") ||
                                        "Паролі не співпадають",
                                }}
                            />

                            <Button
                                additionalClasses={["upper"]}
                                inversed={true}
                                borderless={false}
                                style={{ width: "100%" }}
                                onClickCallback={handleSubmit(resetPassword)}
                            >
                                скинути пароль
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <p className="mid" style={{ color: "var(--green)" }}>
                        Ви успішно скинули пароль. Перейдіть до авторизації та
                        увійдіть до аккаунту вже з новим паролем ;)
                    </p>
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
                </>
            )}
        </div>
    );
};

export default PasswordResetSection;
