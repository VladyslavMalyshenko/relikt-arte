import { ADD_NOTIFICATION, REM_NOTIFICATION } from "../actionTypes/CartTypes";

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
