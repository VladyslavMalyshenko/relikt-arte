import { Route, Routes } from "react-router-dom";
import Homepage from "../pages/Homepage";
import { paths } from "./paths";

const Router = () => {
    return (
        <Routes>
            <Route path={paths.main} element={<Homepage />} />
        </Routes>
    );
};

export default Router;
