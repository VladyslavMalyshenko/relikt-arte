import axios from "axios";
import { SetCurrentAction } from "../redux/actions/currentActionActions";
import {
    AddNotification,
    NotificationBody,
} from "../redux/actions/notificationsActions";
import store from "../redux/store";
import { generateUrl } from "./generateUrl";
import { getItem } from "./getItem";

export const deleteItem = async (
    url_part: string,
    data: any,
    changeActionTo?: string
) => {
    let validUrl = generateUrl(url_part);

    if (data) {
        Object.keys(data).forEach((key) => {
            validUrl = validUrl.replace(`$${key}`, data[key]);
        });
    }

    await axios
        .delete(validUrl)
        .then(async () => {
            const success = {
                message: `Об'єкт з номером ${data.id} був видалений.`,
                type: "success",
            };

            store.dispatch(AddNotification(success as NotificationBody));
            store.dispatch(SetCurrentAction(changeActionTo || ""));

            if (changeActionTo) {
                const state = store.getState();

                await getItem(state.categoryReducer.category.getItemUrl, {
                    id: state.itemReducer.item.id,
                });
            }
        })
        .catch(() => {
            const error = {
                message: `Помилка під час видалення об'єкту з номером ${data.id}.`,
                type: "error",
            };

            store.dispatch(AddNotification(error as NotificationBody));
        });
};
