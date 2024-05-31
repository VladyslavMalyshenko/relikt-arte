import { Route, Routes } from "react-router-dom";
import Buypage from "../pages/Buypage";
import Homepage from "../pages/Homepage";
import Passrecoverypage from "../pages/Passrecoverypage";
import Productpage from "../pages/Productpage";
import Registerpage from "../pages/Registerpage";
import Singinpage from "../pages/Singinpage";
import { paths } from "./paths";

const Router = () => {
    return (
        <Routes>
            <Route path={paths.main} element={<Homepage />} />
            <Route path={paths.buy} element={<Buypage />} />
            <Route path={paths.register} element={<Registerpage />} />
            <Route path={paths.singIn} element={<Singinpage />} />
            <Route
                path={paths.passwordRecover}
                element={<Passrecoverypage />}
            />
            <Route path={paths.product} element={<Productpage />} />
        </Routes>
    );
};

export default Router;
