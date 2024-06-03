import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
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
    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
        watch,
        setValue,
    } = useForm({ defaultValues });
    const [currentCategory, setCurrentCategory] = useState("профіль");
    const [username, setUsername] = useState("");
    const currentWidth = useSelector(
        (state: any) => state.ScreenPropertiesReducer.width
    );

    const sidebarRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLDivElement>(null);

    const handleSidebar = (remove?: boolean) => {
        const sidebarRefClasslist = sidebarRef?.current?.classList;
        const buttonRefClasslist = buttonRef?.current?.classList;

        if (sidebarRefClasslist && buttonRefClasslist) {
            if (remove) {
                sidebarRefClasslist.remove("active");
                buttonRefClasslist.remove("active");
                return;
            }

            sidebarRefClasslist.toggle("active");
            buttonRefClasslist.toggle("active");
        }
    };
    // Example of setting data correctly
    useEffect(() => {
        const timeout = setTimeout(() => {
            const newValue = "анастасія брижа";
            setValue("username", newValue);
            setUsername(newValue);
        }, 1000);

        return () => clearTimeout(timeout);
    }, [setValue]);

    const categories = [
        "профіль",
        "email",
        "пароль",
        "зовнішній вхід",
        "приватні дані",
    ];

    return (
        <div className="profile-settings">
            {currentWidth <= 1150 && (
                <div
                    className="profile-settings-sidebar-button"
                    ref={buttonRef}
                    onClick={() => handleSidebar()}
                >
                    <svg
                        width="14"
                        height="6"
                        viewBox="0 0 14 6"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M12.833 5.33334L6.99967 0.666676L1.16634 5.33334"
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </div>
            )}
            <div className="profile-settings-sidebar" ref={sidebarRef}>
                <p className="upper black pre-small">{username}</p>

                <div className="profile-settings-sidebar-categories">
                    {categories &&
                        categories.map((category, index) => (
                            <ProfileCategory
                                key={`category[${index}]`}
                                category={category}
                                currentCategory={currentCategory}
                                set={() => setCurrentCategory(category)}
                                onClick={() => handleSidebar(true)}
                            />
                        ))}
                </div>
            </div>
            <div className="profile-settings-main">
                <div className="profile-settings-main-category">
                    <p className="upper black mid">{currentCategory}</p>
                </div>

                <ProfileSettingsWindow
                    options={{
                        control,
                        errors,
                        currentCategory,
                        handleSubmit,
                        watch,
                        reset,
                    }}
                />
            </div>
        </div>
    );
};

export default ProfileSettings;
