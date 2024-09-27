import { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { paths } from "../../router/paths";
import {
    changeEmail,
    changeMainInfo,
    changePassword,
} from "../../utils/handleUser";
import Button from "./Button";
import Input from "./Input";

type ProfileSettingsWindowProps = {
    currentCategory: string;
    profileInfo: any;
    setProfileInfo: any;
};

const ProfileSettingsWindow = ({
    currentCategory,
    profileInfo,
    setProfileInfo,
}: ProfileSettingsWindowProps) => {
    const didMount = useRef(false);
    const navigate = useNavigate();
    const [successMessage, setSuccessMessage] = useState("");
    const [previousValues, setPreviousValues] = useState<any>({});
    const {
        watch,
        handleSubmit,
        reset,
        control,
        setValue,
        setError,
        clearErrors,
        formState: { errors },
    } = useFormContext();

    const setPreviousValue = (key: string, value: any) => {
        setPreviousValues((prev: any) => ({ ...prev, [key]: value }));
    };

    const setProfileInfoValue = (keys: string | string[], data: any) => {
        const changedValuesObject: any = {};

        if (Array.isArray(keys)) {
            for (const key of keys) {
                if (data[key]) changedValuesObject[key] = data[key];
            }
        } else {
            changedValuesObject[keys] = data[keys];
        }

        setProfileInfo((prev: any) => ({ ...prev, ...changedValuesObject }));
    };

    useEffect(() => {
        setSuccessMessage("");
        setPreviousValues({});

        if (didMount.current) {
            reset();
        } else {
            didMount.current = true;
        }
    }, [currentCategory]);

    const handleData = async (data: any) => {
        setSuccessMessage("");
        for (const dataKey of Object.keys(data))
            if (
                data[dataKey] === profileInfo[dataKey] ||
                [
                    "new_email",
                    "old_password",
                    "new_password",
                    "new_password_confirm",
                ].some((key: string) => key === dataKey && !data[key])
            )
                delete data[dataKey];

        console.log(data);

        if (JSON.stringify(data) !== "{}") {
            if (data?.new_email) {
                if (previousValues["new_email"] === data.new_email) return;

                setPreviousValue("new_email", data.new_email);

                const currentEmail: any = await changeEmail(data.new_email);

                if (
                    currentEmail &&
                    !(currentEmail?.error || currentEmail.new_email)
                ) {
                    clearErrors("new_email");
                    setValue("new_email", "");
                    setSuccessMessage(
                        `На ${profileInfo.email} було надіслано повідомлення для підтвердження зміни відповідної адреси на ${data.new_email}.`
                    );
                } else if (currentEmail?.error || currentEmail.new_email) {
                    setError("new_email", {
                        type: "custom",
                        message: currentEmail.error || currentEmail.new_email,
                    });
                } else if (!currentEmail) {
                    navigate(paths.register);
                }
            } else if (data?.phone || data?.full_name) {
                for (const key of Object.keys(data)) {
                    setPreviousValue(key, data[key]);
                }

                const newInfo = await changeMainInfo(data);

                if (newInfo && !newInfo?.error) {
                    clearErrors(["phone", "full_name"]);
                    setProfileInfoValue(["phone", "full_name"], data);
                    setSuccessMessage(`Ви успішно оновили свої дані!`);
                } else if (newInfo?.error) {
                    if (!newInfo.error) {
                        for (const field of Object.keys(newInfo)) {
                            setError(field, {
                                type: "custom",
                                message: newInfo[field],
                            });
                        }
                    } else {
                        setError("phone", {
                            type: "custom",
                            message: newInfo.error,
                        });
                    }
                } else if (!newInfo) {
                    navigate(paths.register);
                }
            } else if (
                data.old_password &&
                data.new_password &&
                data.new_password_confirm
            ) {
                const passwordChange = await changePassword(data);
                const keys = [
                    "old_password",
                    "new_password",
                    "new_password_confirm",
                ];

                if (passwordChange && !passwordChange?.error) {
                    clearErrors(keys);
                    setProfileInfoValue(keys, data);
                    setSuccessMessage(`Ви успішно змінили пароль!`);
                } else if (passwordChange?.error) {
                    if (!passwordChange.error) {
                        for (const field of Object.keys(passwordChange)) {
                            setError(field, {
                                type: "custom",
                                message: passwordChange[field],
                            });
                        }
                    } else {
                        setError("new_password_confirm", {
                            type: "custom",
                            message: passwordChange.error,
                        });
                    }
                } else if (!passwordChange) {
                    navigate(paths.register);
                }
            }
        }
    };

    return (
        <div className="profile-settings-main-content">
            {currentCategory === "профіль" && (
                <>
                    <Input
                        name="full_name"
                        control={control}
                        errors={errors}
                        placeholder="Ім'я"
                        type="text"
                        hasLabel={true}
                    />

                    <Input
                        name="phone"
                        control={control}
                        errors={errors}
                        placeholder="Номер телефону"
                        type="phone"
                        hasLabel={true}
                    />

                    {successMessage && (
                        <p style={{ color: "var(--green)" }} className="small">
                            {successMessage}
                        </p>
                    )}

                    <Button
                        inversed={true}
                        borderless={false}
                        additionalClasses={["upper"]}
                        onClickCallback={handleSubmit(handleData)}
                    >
                        зберегти
                    </Button>
                </>
            )}

            {currentCategory === "email" && (
                <>
                    <Input
                        name="email"
                        control={control}
                        errors={errors}
                        placeholder="email"
                        type="email"
                        hasLabel={true}
                        readOnly={true}
                    />

                    <Input
                        name="new_email"
                        control={control}
                        errors={errors}
                        placeholder="новий email"
                        type="email"
                        hasLabel={true}
                    />

                    {successMessage && (
                        <p style={{ color: "var(--green)" }} className="small">
                            {successMessage}
                        </p>
                    )}

                    <Button
                        inversed={true}
                        borderless={false}
                        additionalClasses={["upper"]}
                        onClickCallback={handleSubmit(handleData)}
                    >
                        змініти
                    </Button>
                </>
            )}

            {currentCategory === "пароль" && (
                <>
                    <Input
                        name="old_password"
                        control={control}
                        errors={errors}
                        placeholder="поточний пароль"
                        type="password"
                        rules={{
                            required: "Поточний пароль є обов'язковим",
                        }}
                        hasLabel={true}
                    />

                    <Input
                        name="new_password"
                        control={control}
                        errors={errors}
                        placeholder="новий пароль"
                        type="password"
                        rules={{
                            required: "Новий пароль є обов'язковим",
                        }}
                        hasLabel={true}
                    />

                    <Input
                        name="new_password_confirm"
                        control={control}
                        errors={errors}
                        placeholder="підтвердити пароль"
                        type="password"
                        rules={{
                            required: "Повторний пароль є обов'язковим",
                            validate: (value: string) =>
                                value === watch("new_password") ||
                                "Паролі не співпадають",
                        }}
                        hasLabel={true}
                    />

                    {successMessage && (
                        <p style={{ color: "var(--green)" }} className="small">
                            {successMessage}
                        </p>
                    )}

                    <Button
                        inversed={true}
                        borderless={false}
                        additionalClasses={["upper"]}
                        onClickCallback={handleSubmit(handleData)}
                    >
                        змініти
                    </Button>
                </>
            )}

            {currentCategory === "зовнішній вхід" && (
                <Button borderless={false} colorScheme={"facebook"} />
            )}

            {currentCategory === "приватні дані" && (
                <>
                    <div className="profile-settings-main-content-info">
                        <p className="pre-small black">
                            Ваш обліковий запис містить особисті дані, які ви
                            надали нам. На цій сторінці можна скачати або
                            видалити ці дані.
                        </p>
                        <p className="pre-small black bold">
                            Видалення цих даних призведе до безповоротного
                            видалення вашого облікового запису, і його не можна
                            буде відновити.
                        </p>
                    </div>

                    <Button
                        inversed={true}
                        borderless={false}
                        additionalClasses={["upper"]}
                    >
                        завантажити
                    </Button>

                    <Button
                        style={{ maxWidth: "230px" }}
                        colorScheme={"grey"}
                        additionalClasses={["upper"]}
                    >
                        видалити
                    </Button>
                </>
            )}
        </div>
    );
};

export default ProfileSettingsWindow;
