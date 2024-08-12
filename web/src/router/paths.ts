export const paths = {
    main: "/",
    buy: "/products",
    contacts: "/contacts",
    register: "/register",
    singIn: "/sing-in",
    profile: "/profile",
    passwordRecover: "/password-recover",
    product: "/products/:product_id",
    checkout: "/checkout",
    registerConfirmation: process.env.REACT_APP_CONFIRMATION_LINK + "/:token",
};
