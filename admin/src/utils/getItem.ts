import axios from "axios";
import { SetCurrentItem } from "../redux/actions/currentItemActions";
import store from "../redux/store";
import { generateUrl } from "./generateUrl";

export const getItem = async (url_part: string, id: number) => {
    const validUrl = generateUrl(url_part);
    await axios.get(`${validUrl}/${id}`).then((res) => {
        store.dispatch(SetCurrentItem(res.data));
    });
};
