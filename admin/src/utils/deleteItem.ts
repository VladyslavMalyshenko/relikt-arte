import axios from "axios";
import { generateUrl } from "./generateUrl";

export const deleteItem = async (url_part: string, id: number) => {
    const validUrl = generateUrl(url_part);
    await axios.delete(`${validUrl}/${id}`);
};
