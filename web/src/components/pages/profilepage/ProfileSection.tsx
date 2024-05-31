import "../../../styles/components/pages/profilepage/ProfileSection.scss";
import ProfileSettings from "./ProfileSettings";

const ProfileSection = () => {
    return (
        <div className="profile-section">
            <div className="profile-section-inner">
                <p className="upper biggest black">профіль</p>
                <p className="mid black">
                    Змініть налаштування свого облікового запису.
                </p>
            </div>

            <ProfileSettings />
        </div>
    );
};

export default ProfileSection;
