import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthSection from "./components/AuthSection";
import Content from "./components/Content";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Notifications from "./components/Notifications";
import Sidebar from "./components/Sidebar";
import { SetAuth } from "./redux/actions/authActions";
import "./styles/App.scss";
import { validateToken } from "./utils/tokenUtils";

const App = () => {
    const isAuth = useSelector((state: any) => state.authReducer.auth);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const handleUserAuth = async () => {
            setIsLoading(true);
            const response = await validateToken().then((res) => {
                setIsLoading(false);
                return res;
            });

            dispatch(SetAuth(response));
        };

        handleUserAuth();
    }, []);
    return (
        <div className="App">
            {isLoading ? (
                <Loader />
            ) : isAuth ? (
                <>
                    <Header />

                    <div className="main">
                        <Sidebar />
                        <Content />
                    </div>

                    <Notifications />
                </>
            ) : (
                <AuthSection />
            )}
        </div>
    );
};

export default App;
