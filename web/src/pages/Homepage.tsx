import AboutUs from "../components/pages/homepage/AboutUs";
import Banners from "../components/pages/homepage/Banners";
import BuySection from "../components/pages/homepage/BuySection";
import Doors from "../components/pages/homepage/Doors";
import FirstSection from "../components/pages/homepage/FirstSection";
import WhyUs from "../components/pages/homepage/WhyUs";
import "../styles/pages/Homepage.scss";
import "../styles/pages/Page.scss";

const Homepage = () => {
    return (
        <div className="page">
            <FirstSection />
            <AboutUs />
            <Banners />
            <WhyUs />
            <Doors />
            <BuySection />
        </div>
    );
};

export default Homepage;
