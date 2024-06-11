import axios from "axios";
import { encodeData } from "./encodeData";
import { generateUrl } from "./generateUrl";

export const getItems = async (url_part: string, data: string) => {
    const filters = encodeData(data);
    const validUrl = generateUrl(url_part);

    await axios.get(`${validUrl}?filters=${filters}`);
};
