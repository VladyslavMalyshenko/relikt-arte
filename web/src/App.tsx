import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { SetDimensions } from "./redux/actions/ScreenPropertiesActions";
import Router from "./router/router";
import "./styles/Default.scss";

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        window.addEventListener("resize", () =>
            dispatch(
                SetDimensions({
                    width: window.innerWidth,
                    height: window.innerHeight,
                })
            )
        );
    }, []);

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
