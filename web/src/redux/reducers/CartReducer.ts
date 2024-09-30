import { ADD_NOTIFICATION, REM_NOTIFICATION } from "../actionTypes/CartTypes";

const initialState = {
    notifications: [],
};

export const CartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            const newId =
                (state.notifications[state.notifications.length - 1] as any)
                    ?.id + 1 || 1;

            return {
                notifications: [
                    ...state.notifications,
                    { id: newId, ...action.payload },
                ],
            };
        case REM_NOTIFICATION:
            return {
                notifications: state.notifications.filter(
                    (notification: any) => notification?.id !== action.payload
                ),
            };

        default:
            return state;
    }
};
