import "../../../styles/components/pages/buypage/BuySection.scss";
import BuySectionFilters from "../../UI/BuySectionFilters";
import BuySectionProducts from "../../UI/BuySectionProducts";

const BuySection = () => {
    return (
        <div className="buy-section">
            <p className="upper small buy-section-text">
                головна<span>/</span>
                <span className="black">продукція</span>
            </p>

            <p className="upper biggest black bold">продукція</p>

            <div className="buy-section-inner">
                <BuySectionFilters />
                <BuySectionProducts />
            </div>
        </div>
    );
};

export default BuySection;
