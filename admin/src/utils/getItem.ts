import axios from "axios";
import { SetCurrentItem } from "../redux/actions/currentItemActions";
import {
  AddNotification,
  NotificationBody,
} from "../redux/actions/notificationsActions";
import store from "../redux/store";
import { generateUrl } from "./generateUrl";

export const getItem = async (url_part: string, data: any) => {
  let validUrl = generateUrl(url_part);

  if (data) {
    Object.keys(data).forEach((key) => {
      validUrl = validUrl.replace(`$${key}`, data[key]);
    });
  }

  return await axios
    .get(validUrl)
    .then((res) => {
      store.dispatch(SetCurrentItem(res.data));
      return res.data;
    })
    .catch(() => {
      const error = {
        message: `Error loading the item with id ${data.id}.`,
        type: "error",
      };

      store.dispatch(AddNotification(error as NotificationBody));
    });
};

export const getItemWithNoDispatch = async (url_part: string, data: any) => {
  let validUrl = generateUrl(url_part);

  if (data) {
    Object.keys(data).forEach((key) => {
      validUrl = validUrl.replace(`$${key}`, data[key]);
    });
  }

  return await axios.get(validUrl).then((res) => {
    return res.data;
  });
};
