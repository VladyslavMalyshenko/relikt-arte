import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/UI/Auth.scss";
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
    const defaultValues = {
        email: "",
        phoneNumber: "",
        password: "",
        confirmPassword: "",
    };
    const {
        control,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm<RegisterFormData>({
        defaultValues,
    });

    const onSubmit = (data: RegisterFormData) => {
        console.log(data);
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
                            name="email "
                        />

                        <Input
                            type="phone"
                            control={control}
                            errors={errors}
                            placeholder="номер телефону"
                            name="phoneNumber"
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
                                name="confirmPassword"
                                rules={{
                                    required: "Повторний пароль є обов'язковим",
                                    validate: (value: string) =>
                                        value === watch("password") ||
                                        "Паролі не співпадають",
                                }}
                            />
                        </div>
                    </div>

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
