import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Router from "./router/router";
import "./styles/Default.scss";

const App = () => {
    const location = useLocation();

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);
    }, [location.pathname]);

    return (
        <div className="App">
            <Navbar />
            <Router />
            <Footer />
        </div>
    );
};

export default App;
