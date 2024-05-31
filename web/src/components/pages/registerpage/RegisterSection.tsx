import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/UI/Auth.scss";
import Button from "../../UI/Button";
import Errors from "../../UI/Errors";

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
        register,
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
                        <input
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: "Invalid email address",
                                },
                            })}
                            className={errors.email ? "invalid" : ""}
                            type="email"
                            placeholder="email"
                        />
                        <div className="auth-modal-inputs-phone">
                            <div className="auth-modal-inputs-phone-article small">
                                +38
                            </div>
                            <Controller
                                name="phoneNumber"
                                control={control}
                                rules={{
                                    required: "Phone number is required",
                                    minLength: {
                                        value: 10,
                                        message: "Invalid phone number",
                                    },
                                }}
                                render={({ field }) => (
                                    <input
                                        type="text"
                                        maxLength={10}
                                        {...field}
                                        className={
                                            errors.phoneNumber ? "invalid" : ""
                                        }
                                        placeholder="номер телефону"
                                        onChange={(e) => {
                                            const cleanValue =
                                                e.target.value.replace(
                                                    /[^0-9]/g,
                                                    ""
                                                );
                                            field.onChange(cleanValue);
                                        }}
                                    />
                                )}
                            />
                        </div>
                        <div className="auth-modal-inputs-devided">
                            <input
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password is too short",
                                    },
                                })}
                                className={errors.password ? "invalid" : ""}
                                type="password"
                                placeholder="пароль"
                            />
                            <input
                                {...register("confirmPassword", {
                                    required: "Please confirm your password",
                                    validate: (value) =>
                                        value === watch("password") ||
                                        "Passwords do not match",
                                })}
                                className={
                                    errors.confirmPassword ? "invalid" : ""
                                }
                                type="password"
                                placeholder="повторити пароль"
                            />
                        </div>
                    </div>

                    <Errors errors={errors} />

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
