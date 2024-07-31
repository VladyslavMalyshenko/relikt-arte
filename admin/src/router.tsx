import { Route, Routes } from "react-router-dom";
import App from "./App";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/:category" element={<App />} />
        </Routes>
    );
};

export default Router;
