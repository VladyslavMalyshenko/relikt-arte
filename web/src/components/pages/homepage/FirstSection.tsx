import { useNavigate } from "react-router-dom";
import { paths } from "../../../router/paths";
import "../../../styles/components/pages/homepage/FirstSection.scss";
import Button from "../../UI/Button";

const FirstSection = () => {
    const navigate = useNavigate();

    return (
        <div className="header-section">
            <div className="header-section-inner">
                <div className="header-section-inner-options">
                    <div className="header-section-inner-option">
                        <p className="extra-bold mid">20+</p>
                        <p className="upper thin small">років довіри</p>
                    </div>

                    <div className="header-section-inner-option">
                        <p className="extra-bold mid">3000+</p>
                        <p className="upper thin small">задоволених клієнтів</p>
                    </div>
                </div>
                <p className="upper biggest">
                    “де кожні двері розповідають історію”
                </p>
                <Button
                    text="Подивитись продукцію"
                    additionalClasses={["upper"]}
                    onClickCallback={() => navigate(paths.buy)}
                />
            </div>
        </div>
    );
};

export default FirstSection;
