import { Route, Routes } from "react-router-dom";
import BuyPage from "../pages/BuyPage";
import CheckoutPage from "../pages/CheckoutPage";
import ContactsPage from "../pages/ContactsPage";
import EmailChangeConfirmationPage from "../pages/EmailChangeConfirmationPage";
import HomePage from "../pages/HomePage";
import OrderPage from "../pages/OrderPage";
import PasswordRecoveryPage from "../pages/PasswordRecoveryPage";
import PasswordResetPage from "../pages/PasswordResetPage";
import ProductPage from "../pages/ProductPage";
import ProfilePage from "../pages/ProfilePage";
import RegisterConformationPage from "../pages/RegisterConformationPage";
import RegisterPage from "../pages/RegisterPage";
import SingInPage from "../pages/SingInPage";
import { paths } from "./paths";
import MaterialsPage from "../pages/MaterialsPage";

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
            <Route path={paths.checkout} element={<CheckoutPage />} />
            <Route path={paths.contacts} element={<ContactsPage />} />
            <Route path={paths.materials} element={<MaterialsPage />} />
            <Route
                path={paths.registerConfirmation}
                element={<RegisterConformationPage />}
            />
            <Route
                path={paths.emailChangeConfirmation}
                element={<EmailChangeConfirmationPage />}
            />
            <Route
                path={paths.passwordResetConfirmation}
                element={<PasswordResetPage />}
            />
            <Route path={paths.order} element={<OrderPage />} />
        </Routes>
    );
};

export default Router;
