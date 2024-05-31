import { Route, Routes } from "react-router-dom";
import BuyPage from "../pages/BuyPage";
import HomePage from "../pages/HomePage";
import PasswordRecoveryPage from "../pages/PasswordRecoveryPage";
import ProductPage from "../pages/ProductPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterPage from "../pages/RegisterPage";
import SingInPage from "../pages/SingInPage";
import { paths } from "./paths";

const Router = () => {
    return (
        <Routes>
            <Route path={paths.main} element={<HomePage />} />
            <Route path={paths.buy} element={<BuyPage />} />
            <Route path={paths.register} element={<RegisterPage />} />
            <Route path={paths.singIn} element={<SingInPage />} />
            <Route
                path={paths.passwordRecover}
                element={<PasswordRecoveryPage />}
            />
            <Route path={paths.product} element={<ProductPage />} />
            <Route path={paths.profile} element={<ProfilePage />} />
        </Routes>
    );
};

export default Router;
