import axios from "axios";
import { generateUrl } from "./generateUrl";

export const getItem = async (url_part: string, data: any) => {
    let validUrl = generateUrl(url_part);

    if (data) {
        Object.keys(data).forEach((key) => {
            validUrl = validUrl.replace(`$${key}`, data[key]);
        });
    }

    return await axios.get(validUrl).then((res) => res.data);
};
