import {
    ADD_NOTIFICATION,
    CHANGE_CART_PRODUCT,
    REM_CART_PRODUCT,
    REM_NOTIFICATION,
    SET_CART_PRODUCTS,
} from "../actionTypes/CartTypes";

export const AddNotification = (notification: any) => {
    return {
        type: ADD_NOTIFICATION,
        payload: notification,
    };
};

export const RemNotification = (notificationId: number) => {
    return {
        type: REM_NOTIFICATION,
        payload: notificationId,
    };
};

export const SetCart = (cart: any) => {
    return {
        type: SET_CART_PRODUCTS,
        payload: cart,
    };
};

export const RemCartProduct = (productId: any) => {
    return {
        type: REM_CART_PRODUCT,
        payload: productId,
    };
};

export const ChangeCartProduct = (product: any) => {
    return {
        type: CHANGE_CART_PRODUCT,
        payload: product,
    };
};
