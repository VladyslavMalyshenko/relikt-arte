import axios from "axios";
import { SetCurrentAction } from "../redux/actions/currentActionActions";
import {
    AddNotification,
    NotificationBody,
} from "../redux/actions/notificationsActions";
import store from "../redux/store";
import { generateUrl } from "./generateUrl";

export const addItem = async (
    url_part: string,
    newItem: any,
    data?: any,
    onSuccess?: any
) => {
    let validUrl = generateUrl(url_part);
    let isResponseSuccess = false;

    if (data) {
        Object.keys(data).forEach((key) => {
            validUrl = validUrl.replace(`$${key}`, data[key]);
        });
    }

    await axios
        .post(validUrl, newItem)
        .then(async (res) => {
            const success = {
                message: `Item was created successfully.`,
                type: "success",
            };

            store.dispatch(AddNotification(success as NotificationBody));
            store.dispatch(SetCurrentAction(""));
            isResponseSuccess = true;

            if (onSuccess) {
                await onSuccess(res.data);
            }
        })
        .catch(() => {
            const error = {
                message: `Error occurred while creating item.`,
                type: "error",
            };

            store.dispatch(AddNotification(error as NotificationBody));
        });

    return isResponseSuccess;
};
