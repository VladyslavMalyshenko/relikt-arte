import axios from "axios";
import { encodeData } from "./encodeData";
import { generateUrl } from "./generateUrl";

export const getItems = async (url_part: string, data?: string) => {
    let validUrl = generateUrl(url_part);

    if (data) {
        const filters = encodeData(data);

        validUrl += `?filters=${filters}`;
    }

    return await axios
        .get(validUrl)
        .then((res) => res.data)
        .catch(() => []);
};
