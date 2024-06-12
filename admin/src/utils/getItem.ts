import axios from "axios";
import { SetCurrentItem } from "../redux/actions/currentItemActions";
import {
    AddNotification,
    NotificationBody,
} from "../redux/actions/notificationsActions";
import store from "../redux/store";
import { generateUrl } from "./generateUrl";

export const getItem = async (url_part: string, id: number) => {
    const validUrl = generateUrl(url_part);

    await axios
        .get(`${validUrl}/${id}`)
        .then((res) => {
            const success = {
                message: `Item with id ${id} was loaded successfully.`,
                type: "success",
            };

            store.dispatch(SetCurrentItem(res.data));
            store.dispatch(AddNotification(success as NotificationBody));
        })
        .catch(() => {
            const error = {
                message: `Error loading the item with id ${id}.`,
                type: "error",
            };

            store.dispatch(AddNotification(error as NotificationBody));
        });
};
