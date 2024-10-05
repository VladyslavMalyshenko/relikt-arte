import {
    ADD_NOTIFICATION,
    CHANGE_CART_PRODUCT,
    REM_CART_PRODUCT,
    REM_NOTIFICATION,
    SET_CART_PRODUCTS,
} from "../actionTypes/CartTypes";

const initialState = {
    notifications: [],
    cartProducts: [],
};

export const CartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            const newId =
                (state.notifications[state.notifications.length - 1] as any)
                    ?.id + 1 || 1;

            return {
                ...state,
                notifications: [
                    ...state.notifications,
                    { id: newId, ...action.payload },
                ],
            };
        case REM_NOTIFICATION:
            return {
                ...state,
                notifications: state.notifications.filter(
                    (notification: any) => notification?.id !== action.payload
                ),
            };
        case SET_CART_PRODUCTS:
            return {
                ...state,
                cartProducts: action.payload,
            };
        case REM_CART_PRODUCT:
            return {
                ...state,
                cartProducts: state.cartProducts.filter(
                    (product: any) => product?.id !== action.payload
                ),
            };
        case CHANGE_CART_PRODUCT:
            return {
                ...state,
                cartProducts: state.cartProducts.map((product: any) =>
                    action.payload.id === product.id
                        ? { ...product, ...action.payload }
                        : product
                ),
            };
        default:
            return state;
    }
};
