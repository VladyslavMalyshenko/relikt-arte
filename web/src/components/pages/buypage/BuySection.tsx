import { useSelector } from "react-redux";
import { paths } from "../../../router/paths";
import "../../../styles/components/pages/buypage/BuySection.scss";
import BuySectionFilters from "../../UI/BuySectionFilters";
import BuySectionProducts from "../../UI/BuySectionProducts";
import Path from "../../UI/Path";

const BuySection = () => {
    const isLoaded = useSelector((state: any) => state.LoadReducer.isLoaded);

    return (
        <div className="buy-section">
            <Path
                segments={[
                    { name: "головна", location: paths.main },
                    { name: "продукція", location: paths.buy },
                ]}
            />

            <p className="upper biggest black bold">продукція</p>

            <div className="buy-section-inner">
                <BuySectionFilters />
                <BuySectionProducts />
            </div>
        </div>
    );
};

export default BuySection;
