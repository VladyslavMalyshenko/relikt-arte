import {
    ADD_NOTIFICATION,
    REM_NOTIFICATION,
} from "../actionTypes/notificationsActionTypes";
import { Notification } from "../actions/notificationsActions";

const initialState = {
    notifications: [],
};

export const notificationsReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case ADD_NOTIFICATION:
            const newId =
                (
                    state.notifications[
                        state.notifications.length - 1
                    ] as Notification
                )?.id + 1 || 1;

            return {
                notifications: [
                    ...state.notifications,
                    { id: newId, ...action.payload },
                ],
            };
        case REM_NOTIFICATION:
            return {
                notifications: state.notifications.filter(
                    (notification: Notification) =>
                        notification.id !== action.payload
                ),
            };

        default:
            return state;
    }
};
