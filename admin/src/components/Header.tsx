import Logo from "../assets/relikt_logo.jpg";
import "../styles/components/Header.scss";

const Header = () => {
    return (
        <div className="header">
            <img src={Logo} alt="Relikt Arte" />
        </div>
    );
};

export default Header;
