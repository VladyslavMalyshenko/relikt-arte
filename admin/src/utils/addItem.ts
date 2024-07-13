import axios from "axios";
import { SetCurrentAction } from "../redux/actions/currentActionActions";
import {
    AddNotification,
    NotificationBody,
} from "../redux/actions/notificationsActions";
import store from "../redux/store";
import { generateUrl } from "./generateUrl";

export const addItem = async (url_part: string, newItem: any) => {
    let validUrl = generateUrl(url_part);

    await axios
        .post(validUrl, newItem)
        .then(() => {
            const success = {
                message: `Item was created successfully.`,
                type: "success",
            };

            store.dispatch(AddNotification(success as NotificationBody));
            store.dispatch(SetCurrentAction(""));
        })
        .catch(() => {
            const error = {
                message: `Error occurred while creating item.`,
                type: "error",
            };

            store.dispatch(AddNotification(error as NotificationBody));
        });
};
