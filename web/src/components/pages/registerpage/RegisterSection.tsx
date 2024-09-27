import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/UI/Auth.scss";
import { registerUser } from "../../../utils/handleUser";
import Button from "../../UI/Button";
import Input from "../../UI/Input";

interface RegisterFormData {
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
}

const RegisterSection = () => {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [success, setSuccess] = useState(false);

    const defaultValues = {
        email: "",
        phone: "",
        password: "",
        password_confirm: "",
    };

    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterFormData>({
        defaultValues,
    });

    const onSubmit = async (data: RegisterFormData) => {
        setSuccess(false);
        setMessage("");

        const response: any = await registerUser(data);

        if (!response.error) {
            setSuccess(true);
            setMessage(
                "Ви успішно пройшли реєстрацію. На Вашу поштову скриньку було надіслано лист з посиланням для підтвердження аккаунту. Перейдіть за посиланням у листі й увійдіть до аккаунту."
            );
        } else {
            setSuccess(false);
            setMessage(response.error);
        }
    };

    return (
        <div className="auth-section">
            <div className="auth-modal">
                <p className="upper biggest black">реєстрація</p>
                <div className="auth-modal-inputs-wrapper">
                    <div className="auth-modal-inputs">
                        <Input
                            type="email"
                            control={control}
                            errors={errors}
                            placeholder="email"
                            name="email"
                        />

                        <Input
                            type="phone"
                            control={control}
                            errors={errors}
                            placeholder="номер телефону"
                            name="phone"
                        />

                        <div className="auth-modal-inputs-devided">
                            <Input
                                type="password"
                                control={control}
                                errors={errors}
                                placeholder="пароль"
                                name="password"
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
                                placeholder="повторити пароль"
                                name="password_confirm"
                                rules={{
                                    required: "Повторний пароль є обов'язковим",
                                    validate: (value: string) =>
                                        value === watch("password") ||
                                        "Паролі не співпадають",
                                }}
                            />
                        </div>
                    </div>

                    {message && (
                        <p
                            className="black small"
                            style={{
                                color: success ? "var(--green)" : "var(--red)",
                            }}
                        >
                            {message}
                        </p>
                    )}

                    <Button
                        additionalClasses={["upper"]}
                        inversed={true}
                        borderless={false}
                        style={{ width: "100%" }}
                        onClickCallback={handleSubmit(onSubmit)}
                    >
                        зареєструватись
                    </Button>

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
