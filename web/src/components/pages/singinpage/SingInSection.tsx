import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/UI/Auth.scss";
import Button from "../../UI/Button";
import Input from "../../UI/Input";

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
        control,
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
                        <Input
                            type="email"
                            control={control}
                            errors={errors}
                            placeholder="email"
                            name="email"
                        />

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

                        <Link
                            to={paths.passwordRecover}
                            className="upper black forgot-password"
                        >
                            забули пароль?
                        </Link>
                    </div>

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
