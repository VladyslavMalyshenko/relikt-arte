import {
    ADD_NOTIFICATION,
    REM_NOTIFICATION,
} from "../actionTypes/notificationsActionTypes";

export type Notification = {
    id: number;
    message: string;
    type: string;
};

export type NotificationBody = {
    id: number;
    message: string;
    type: string;
};

export const AddNotification = (notification: NotificationBody) => {
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
