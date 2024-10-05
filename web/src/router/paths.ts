export const paths = {
    main: "/",
    buy: "/products",
    contacts: "/contacts",
    materials: "/materials",
    register: "/register",
    singIn: "/sing-in",
    profile: "/profile",
    passwordRecover: "/password-recover",
    product: "/products/:product_id",
    checkout: "/checkout",
    order: "/order/:order_id",
    registerConfirmation:
        process.env.REACT_APP_EMAIL_CONFIRMATION_LINK + "/:token",
    passwordResetConfirmation:
        process.env.REACT_APP_PASSWORD_RESET_CONFIRMATION_LINK + "/:token",
    emailChangeConfirmation:
        process.env.REACT_APP_EMAIL_CHANGE_CONFIRMATION_LINK + "/:token",
};
