import AboutUs from "../components/pages/homepage/AboutUs";
import Banners from "../components/pages/homepage/Banners";
import Doors from "../components/pages/homepage/Doors";
import FirstSection from "../components/pages/homepage/FirstSection";
import WhyUs from "../components/pages/homepage/WhyUs";
import "../styles/pages/Page.scss";

const HomePage = () => {
    return (
        <div className="page bottom">
            <FirstSection />
            <AboutUs />
            <Banners />
            <WhyUs />
            <Doors />
        </div>
    );
};

export default HomePage;
