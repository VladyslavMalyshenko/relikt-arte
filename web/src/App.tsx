import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { SetIsLoaded } from "./redux/actions/LoadActions";
import { SetDimensions } from "./redux/actions/ScreenPropertiesActions";
import { paths } from "./router/paths";
import Router from "./router/router";
import "./styles/Default.scss";
import { validateToken } from "./utils/tokenUtils";

const App = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const isLoaded = useSelector((state: any) => state.LoadReducer.isLoaded);
    const navigate = useNavigate();

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

        const redirectOnValidToken = async () => {
            const redirectPaths = [paths.register, paths.singIn];
            const isCurrentPathRedirect = redirectPaths.some(
                (path) => path === location.pathname
            );

            const response: any = await validateToken();

            if (isCurrentPathRedirect) {
                if (response) {
                    navigate(paths.profile);
                }
            } else if (location.pathname === paths.profile && !response) {
                navigate(paths.register);
            }
        };

        redirectOnValidToken();
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
