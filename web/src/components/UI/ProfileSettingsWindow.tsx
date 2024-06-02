import { useEffect, useRef } from "react";
import { Control, FieldErrors } from "react-hook-form";
import Button from "./Button";
import Input from "./Input";

type ProfileSettingsWindowOptions = {
    control: Control<any>;
    errors: FieldErrors<any>;
    currentCategory: string;
    handleSubmit: any;
    watch: any;
    reset: any;
};

type ProfileSettingsWindowProps = {
    options: ProfileSettingsWindowOptions;
};

const ProfileSettingsWindow = ({ options }: ProfileSettingsWindowProps) => {
    const didMount = useRef(false);

    useEffect(() => {
        if (didMount.current) {
            options.reset();
        } else {
            didMount.current = true;
        }
    }, [options.currentCategory]);

    return (
        <div className="profile-settings-main-content">
            {options.currentCategory === "профіль" && (
                <>
                    <Input
                        name="username"
                        control={options.control}
                        errors={options.errors}
                        placeholder="Ім'я"
                        type="text"
                        rules={{
                            required: "Ім'я є обов'язковим",
                        }}
                        hasLabel={true}
                    />

                    <Input
                        name="phoneNumber"
                        control={options.control}
                        errors={options.errors}
                        placeholder="Номер телефону"
                        type="phone"
                        hasLabel={true}
                    />

                    <Button
                        inversed={true}
                        borderless={false}
                        additionalClasses={["upper"]}
                        onClickCallback={options.handleSubmit((data: any) =>
                            console.log(data)
                        )}
                    >
                        зберегти
                    </Button>
                </>
            )}

            {options.currentCategory === "email" && (
                <>
                    <Input
                        name="email"
                        control={options.control}
                        errors={options.errors}
                        placeholder="email"
                        type="email"
                        hasLabel={true}
                    />

                    <Input
                        name="newEmail"
                        control={options.control}
                        errors={options.errors}
                        placeholder="новий email"
                        type="email"
                        hasLabel={true}
                    />

                    <Button
                        inversed={true}
                        borderless={false}
                        additionalClasses={["upper"]}
                        onClickCallback={options.handleSubmit((data: any) =>
                            console.log(data)
                        )}
                    >
                        змініти
                    </Button>
                </>
            )}

            {options.currentCategory === "пароль" && (
                <>
                    <Input
                        name="currentPassword"
                        control={options.control}
                        errors={options.errors}
                        placeholder="поточний пароль"
                        type="password"
                        rules={{
                            required: "Поточний пароль є обов'язковим",
                        }}
                        hasLabel={true}
                    />

                    <Input
                        name="newPassword"
                        control={options.control}
                        errors={options.errors}
                        placeholder="новий пароль"
                        type="password"
                        rules={{
                            required: "Новий пароль є обов'язковим",
                        }}
                        hasLabel={true}
                    />

                    <Input
                        name="confirmPassword"
                        control={options.control}
                        errors={options.errors}
                        placeholder="підтвердити пароль"
                        type="password"
                        rules={{
                            required: "Повторний пароль є обов'язковим",
                            validate: (value: string) =>
                                value === options.watch("newPassword") ||
                                "Паролі не співпадають",
                        }}
                        hasLabel={true}
                    />

                    <Button
                        inversed={true}
                        borderless={false}
                        additionalClasses={["upper"]}
                        onClickCallback={options.handleSubmit((data: any) =>
                            console.log(data)
                        )}
                    >
                        змініти
                    </Button>
                </>
            )}

            {options.currentCategory === "зовнішній вхід" && (
                <Button borderless={false} colorScheme={"facebook"} />
            )}

            {options.currentCategory === "приватні дані" && (
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
