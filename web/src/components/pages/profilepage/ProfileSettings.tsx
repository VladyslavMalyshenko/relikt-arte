import { useState } from "react";
import { useForm } from "react-hook-form";
import "../../../styles/components/pages/profilepage/ProfileSection.scss";
import ProfileCategory from "../../UI/ProfileCategory";
import ProfileSettingsWindow from "../../UI/ProfileSettingsWindow";

const defaultValues = {
    username: "",
    email: "",
    newEmail: "",
    phoneNumber: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
};

const ProfileSettings = () => {
    const { handleSubmit, setValue, control } = useForm({ defaultValues });
    const [currentCategory, setCurrentCategory] = useState("профіль");
    const [username, setUsername] = useState("");

    // Example of setting data correctly
    // useEffect(() => {
    //     const timeout = setTimeout(() => {
    //         const newValue = "анастасія брижа";
    //         setValue("username", newValue);
    //         setUsername(newValue);
    //     }, 1000);

    //     return () => clearTimeout(timeout);
    // }, [setValue]);

    const categories = [
        "профіль",
        "email",
        "пароль",
        "зовнішній вхід",
        "приватні дані",
    ];

    return (
        <div className="profile-settings">
            <div className="profile-settings-sidebar">
                <p className="upper black pre-small">{username}</p>

                <div className="profile-settings-sidebar-categories">
                    {categories &&
                        categories.map((category, index) => (
                            <ProfileCategory
                                key={`category[${index}]`}
                                category={category}
                                currentCategory={currentCategory}
                                set={() => setCurrentCategory(category)}
                            />
                        ))}
                </div>
            </div>
            <div className="profile-settings-main">
                <div className="profile-settings-main-category">
                    <p className="upper black mid">{currentCategory}</p>
                </div>

                <ProfileSettingsWindow
                    control={control}
                    currentCategory={currentCategory}
                />
            </div>
        </div>
    );
};

export default ProfileSettings;
