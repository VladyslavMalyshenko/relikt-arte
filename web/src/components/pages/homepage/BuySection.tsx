import "../../../styles/components/pages/homepage/BuySection.scss";
import Button from "../../UI/Button";

const BuySection = () => {
    return (
        <div className="buy-section">
            <Button
                text="Подивитись продукцію"
                additionalClasses={["upper"]}
                onClickCallback={() => console.log("Works")}
            />
        </div>
    );
};

export default BuySection;
