import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { SetAuth } from "../redux/actions/authActions";
import "../styles/components/AuthSection.scss";
import { singInAccount } from "../utils/tokenUtils";

const AuthSection = () => {
    const [message, setMessage] = useState("");
    const [previousData, setPreviousData] = useState({});
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const dispatch = useDispatch();

    const defaultValues = {
        email: "",
        password: "",
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ defaultValues });

    const onSubmit = async (data: any) => {
        if (JSON.stringify(previousData) !== JSON.stringify(data)) {
            setButtonDisabled(true);
            setMessage("");

            const response: any = await singInAccount(data);

            setButtonDisabled(false);

            setPreviousData(data);

            if (response?.error) {
                setMessage(response.error);
                return;
            }

            dispatch(SetAuth(response));
        }
    };

    return (
        <div className="auth-section">
            <div className="input-field-wrapper">
                <label>
                    Логін
                    <input
                        {...register("email", {
                            required: "Email є обов'язковим",
                        })}
                        placeholder="Логін"
                    />
                </label>

                {errors.email?.message && (
                    <p className="input-field-error">{errors.email.message}</p>
                )}
            </div>

            <div className="input-field-wrapper">
                <label>
                    Пароль
                    <input
                        {...register("password", {
                            required: "Пароль є обов'язковим",
                        })}
                        type="password"
                        placeholder="Пароль"
                    />
                </label>

                {errors.password?.message && (
                    <p className="input-field-error">
                        {errors.password.message}
                    </p>
                )}
            </div>

            {message && (
                <p
                    className="black small"
                    style={{
                        color: "var(--red)",
                    }}
                >
                    {message}
                </p>
            )}

            <button
                className="active"
                disabled={buttonDisabled}
                onClick={handleSubmit(onSubmit)}
            >
                Увійти
            </button>
        </div>
    );
};

export default AuthSection;
