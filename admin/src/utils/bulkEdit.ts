import axios from "axios";
import { SetCurrentAction } from "../redux/actions/currentActionActions";
import {
    AddNotification,
    NotificationBody,
} from "../redux/actions/notificationsActions";
import store from "../redux/store";
import { generateUrl } from "./generateUrl";

export const bulkEdit = async (
    url_part: string,
    newItems: any,
    data: string[]
) => {
    const baseURL = generateUrl(url_part);
    let noError = true;

    for (const newItem of newItems) {
        let validUrl = baseURL;

        if (data) {
            data.forEach((key: string) => {
                validUrl = validUrl.replace(`$${key}`, newItem[key]);
            });
        }

        await axios
            .put(validUrl, newItem)
            .then(() => {
                noError = true;
            })
            .catch(() => {
                noError = false;
            });
    }

    if (!noError) {
        const error = {
            message: `Сталася помилка під час оновлення об'єктів.`,
            type: "error",
        };

        store.dispatch(AddNotification(error as NotificationBody));
    } else {
        const success = {
            message: `Обрані об'єкти були оновлені успішно!`,
            type: "success",
        };

        store.dispatch(AddNotification(success as NotificationBody));
        store.dispatch(SetCurrentAction(""));
    }
};
