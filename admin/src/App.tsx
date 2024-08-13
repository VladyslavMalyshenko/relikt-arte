import { useEffect, useState } from "react";
import AuthSection from "./components/AuthSection";
import Content from "./components/Content";
import Header from "./components/Header";
import Notifications from "./components/Notifications";
import Sidebar from "./components/Sidebar";
import "./styles/App.scss";
import { validateToken } from "./utils/tokenUtils";

const App = () => {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const handleUserAuth = async () => {
            const response = await validateToken();

            setIsAuth(response);
        };

        handleUserAuth();
    }, []);
    return (
        <div className="App">
            {isAuth ? (
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
