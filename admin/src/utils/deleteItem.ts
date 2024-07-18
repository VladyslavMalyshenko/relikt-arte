import axios from "axios";
import { generateUrl } from "./generateUrl";
import store from "../redux/store";
import {
  AddNotification,
  NotificationBody,
} from "../redux/actions/notificationsActions";
import { SetCurrentAction } from "../redux/actions/currentActionActions";

export const deleteItem = async (url_part: string, data: any) => {
  let validUrl = generateUrl(url_part);

  if (data) {
    Object.keys(data).forEach((key) => {
      validUrl = validUrl.replace(`$${key}`, data[key]);
    });
  }

  await axios
    .delete(validUrl)
    .then(() => {
      const success = {
        message: `Item with id ${data.id} was deleted.`,
        type: "success",
      };

      store.dispatch(AddNotification(success as NotificationBody));
      store.dispatch(SetCurrentAction(""));
    })
    .catch(() => {
      const error = {
        message: `Error occured while deleting item with id ${data.id}.`,
        type: "error",
      };

      store.dispatch(AddNotification(error as NotificationBody));
    });
};
