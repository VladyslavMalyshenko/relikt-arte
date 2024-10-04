import axios from "axios";
import { SetCurrentAction } from "../redux/actions/currentActionActions";
import {
    AddNotification,
    NotificationBody,
} from "../redux/actions/notificationsActions";
import store from "../redux/store";
import { generateUrl } from "./generateUrl";

export const editItem = async (
    url_part: string,
    newItem: any,
    data: any,
    onSuccess?: any
) => {
    let validUrl = generateUrl(url_part);

    if (data) {
        Object.keys(data).forEach((key) => {
            validUrl = validUrl.replace(`$${key}`, data[key]);
        });
    }

    await axios
        .put(validUrl, newItem)
        .then(async (res) => {
            const success = {
                message: `Об'єкт під номером ${data.id} був змінений.`,
                type: "success",
            };

            store.dispatch(AddNotification(success as NotificationBody));
            store.dispatch(SetCurrentAction(""));

            if (onSuccess) {
                await onSuccess(res.data);
            }
        })
        .catch(() => {
            const error = {
                message: `Сталася помилка під час зміни об'єкту під номером ${data.id}.`,
                type: "error",
            };

            store.dispatch(AddNotification(error as NotificationBody));
        });
};
