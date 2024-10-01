import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import "../../../styles/components/pages/profilepage/ProfileSection.scss";
import { getProfile } from "../../../utils/handleUser";
import Loader from "../../UI/Loader";
import ProfileCategory from "../../UI/ProfileCategory";
import ProfileSettingsWindow from "../../UI/ProfileSettingsWindow";

const defaultValues = {
    full_name: "",
    phone: "",
    email: "",
    new_email: "",
    old_password: "",
    new_password: "",
    new_password_confirm: "",
};

const ProfileSettings = () => {
    const formController = useForm({ defaultValues });
    const { setValue } = formController;

    const [currentCategory, setCurrentCategory] = useState("профіль");
    const [profileInfo, setProfileInfo] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);
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

    const setUpProfileInfoValues = (profileInfo: any) => {
        setValue("full_name", profileInfo.full_name);
        setValue("phone", profileInfo.phone);
        setValue("email", profileInfo.email);
    };

    useEffect(() => {
        const setUpProfileInfo = async () => {
            setIsLoading(true);
            const profileInfo = await getProfile();

            if (!profileInfo) return;

            setIsLoading(false);
            setProfileInfo(profileInfo);
            setUpProfileInfoValues(profileInfo);
        };

        setUpProfileInfo();
    }, [setValue]);

    useEffect(() => {
        setUpProfileInfoValues(profileInfo);
    }, [currentCategory]);

    const categories = [
        "профіль",
        "email",
        "пароль",
        "зовнішній вхід",
        "приватні дані",
        "історія замовлень",
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
            {!isLoading ? (
                <>
                    <div className="profile-settings-sidebar" ref={sidebarRef}>
                        <p className="upper black pre-small">
                            {profileInfo.full_name}
                        </p>

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

                        <FormProvider {...formController}>
                            <ProfileSettingsWindow
                                currentCategory={currentCategory}
                                profileInfo={profileInfo}
                                setProfileInfo={setProfileInfo}
                            />
                        </FormProvider>
                    </div>
                </>
            ) : (
                <Loader />
            )}
        </div>
    );
};

export default ProfileSettings;
