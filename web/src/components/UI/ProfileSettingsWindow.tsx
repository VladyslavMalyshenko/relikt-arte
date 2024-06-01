import { Control, Controller } from "react-hook-form";
import Button from "./Button";

type ProfileSettingsWindowProps = {
    control: Control<any>;
    currentCategory: string;
};

const ProfileSettingsWindow = ({
    control,
    currentCategory,
}: ProfileSettingsWindowProps) => {
    return (
        <div className="profile-settings-main-content">
            {currentCategory === "профіль" && (
                <>
                    <Controller
                        name="username"
                        control={control}
                        render={({ field }) => (
                            <label className="upper black small">
                                ім'я
                                <input
                                    {...field}
                                    className="profile-settings-main-content-input"
                                    type="text"
                                    placeholder="ім'я"
                                />
                            </label>
                        )}
                    />
                    <Controller
                        name="phoneNumber"
                        control={control}
                        render={({ field }) => (
                            <label className="upper black small">
                                номер телефону
                                <input
                                    {...field}
                                    className="profile-settings-main-content-input"
                                    type="text"
                                    placeholder="номер телефону"
                                />
                            </label>
                        )}
                    />
                    <Button
                        inversed={true}
                        borderless={false}
                        additionalClasses={["upper"]}
                    >
                        зберегти
                    </Button>
                </>
            )}

            {currentCategory === "email" && (
                <>
                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <label className="upper black small">
                                email
                                <input
                                    {...field}
                                    className="profile-settings-main-content-input"
                                    type="text"
                                    placeholder="email"
                                />
                            </label>
                        )}
                    />
                    <Controller
                        name="newEmail"
                        control={control}
                        render={({ field }) => (
                            <label className="upper black small">
                                новий email
                                <input
                                    {...field}
                                    className="profile-settings-main-content-input"
                                    type="text"
                                    placeholder="новий email"
                                />
                            </label>
                        )}
                    />
                    <Button
                        inversed={true}
                        borderless={false}
                        additionalClasses={["upper"]}
                    >
                        змініти
                    </Button>
                </>
            )}

            {currentCategory === "пароль" && (
                <>
                    <Controller
                        name="currentPassword"
                        control={control}
                        render={({ field }) => (
                            <label className="upper black small">
                                поточний пароль
                                <input
                                    {...field}
                                    className="profile-settings-main-content-input"
                                    type="password"
                                    placeholder="поточний пароль"
                                />
                            </label>
                        )}
                    />
                    <Controller
                        name="newPassword"
                        control={control}
                        render={({ field }) => (
                            <label className="upper black small">
                                новий пароль
                                <input
                                    {...field}
                                    className="profile-settings-main-content-input"
                                    type="password"
                                    placeholder="новий пароль"
                                />
                            </label>
                        )}
                    />
                    <Controller
                        name="confirmPassword"
                        control={control}
                        render={({ field }) => (
                            <label className="upper black small">
                                підтвердити пароль
                                <input
                                    {...field}
                                    className="profile-settings-main-content-input"
                                    type="password"
                                    placeholder="підтвердити пароль"
                                />
                            </label>
                        )}
                    />
                    <Button
                        inversed={true}
                        borderless={false}
                        additionalClasses={["upper"]}
                    >
                        змініти
                    </Button>
                </>
            )}

            {currentCategory === "зовнішній вхід" && (
                <Button borderless={false} colorScheme={"facebook"} />
            )}

            {currentCategory === "others" && (
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
