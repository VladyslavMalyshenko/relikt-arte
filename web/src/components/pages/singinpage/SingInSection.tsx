import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/UI/Auth.scss";
import Button from "../../UI/Button";
import Errors from "../../UI/Errors";

const SingInSection = () => {
    const navigate = useNavigate();

    interface SingInFormData {
        email: string;
        password: string;
    }

    const defaultValues = {
        email: "",
        password: "",
    };

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<SingInFormData>({
        defaultValues,
    });

    const onSubmit = (data: SingInFormData) => {
        console.log(data);
    };

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
                        <input
                            type="email"
                            placeholder="email"
                            className={errors.email ? "invalid" : ""}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                    message: "Invalid email address",
                                },
                            })}
                        />
                        <input
                            type="password"
                            placeholder="пароль"
                            className={errors.password ? "invalid" : ""}
                            {...register("password", {
                                required: "Password is required",
                            })}
                        />

                        <Link
                            to={paths.passwordRecover}
                            className="upper black forgot-password"
                        >
                            забули пароль?
                        </Link>
                    </div>

                    <Errors errors={errors} />

                    <Button
                        additionalClasses={["upper"]}
                        inversed={true}
                        borderless={false}
                        style={{ width: "100%" }}
                        onClickCallback={handleSubmit(onSubmit)}
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
