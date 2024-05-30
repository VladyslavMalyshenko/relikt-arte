import { useNavigate } from "react-router-dom";
import "../../../styles/components/pages/homepage/AdSection.scss";
import Button from "../../UI/Button";

const AdSection = () => {
    const navigate = useNavigate();
    return (
        <div className="ad-section">
            <Button
                text="Подивитись продукцію"
                additionalClasses={["upper"]}
                onClickCallback={() => navigate("/buy")}
            />
        </div>
    );
};

export default AdSection;
