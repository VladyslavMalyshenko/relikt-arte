import { Route, Routes } from "react-router-dom";
import Buypage from "../pages/Buypage";
import Homepage from "../pages/Homepage";
import { paths } from "./paths";

const Router = () => {
    return (
        <Routes>
            <Route path={paths.main} element={<Homepage />} />
            <Route path={paths.buy} element={<Buypage />} />
        </Routes>
    );
};

export default Router;
