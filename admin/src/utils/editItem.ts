import axios from "axios";
import { generateUrl } from "./generateUrl";

export const editItem = async (url_part: string, id: number, newItem: any) => {
    const validUrl = generateUrl(url_part);

    await axios.patch(`${validUrl}/${id}`, newItem);
};
