import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { SetIsLoaded } from "./redux/actions/LoadActions";
import { SetDimensions } from "./redux/actions/ScreenPropertiesActions";
import Router from "./router/router";
import "./styles/Default.scss";

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isLoaded = useSelector((state: any) => state.LoadReducer.isLoaded);

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

    const scrollToTop = () => {
        setTimeout(() => {
            window.scrollTo(0, 0);
        }, 10);
    };

    useEffect(() => {
        dispatch(SetIsLoaded(false));
        scrollToTop();
    }, [location.pathname]);

    useEffect(() => {
        if (isLoaded) {
            scrollToTop();
        }
    }, [isLoaded]);

    return (
        <div className="App">
            <Navbar />
            <Router />
            <Footer />
        </div>
    );
};

export default App;
