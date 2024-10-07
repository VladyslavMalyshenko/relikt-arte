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
    const [showPassword, setShowPassword] = useState(false);

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
                    <div className="password-container">
                        <input
                            {...register("password", {
                                required: "Пароль є обов'язковим",
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder="Пароль"
                        />

                        <div
                            className="password-show-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M2 12C2 12 5.63636 5 12 5C18.3636 5 22 12 22 12C22 12 18.3636 19 12 19C5.63636 19 2 12 2 12Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <path
                                        d="M2.99902 3L20.999 21M9.8433 9.91364C9.32066 10.4536 8.99902 11.1892 8.99902 12C8.99902 13.6569 10.3422 15 11.999 15C12.8215 15 13.5667 14.669 14.1086 14.133M6.49902 6.64715C4.59972 7.90034 3.15305 9.78394 2.45703 12C3.73128 16.0571 7.52159 19 11.9992 19C13.9881 19 15.8414 18.4194 17.3988 17.4184M10.999 5.04939C11.328 5.01673 11.6617 5 11.9992 5C16.4769 5 20.2672 7.94291 21.5414 12C21.2607 12.894 20.8577 13.7338 20.3522 14.5"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            )}
                        </div>
                    </div>
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
