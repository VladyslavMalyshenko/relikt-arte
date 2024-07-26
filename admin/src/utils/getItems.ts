import axios from "axios";
import { SetAvailablePagesCount } from "../redux/actions/currentPageActions";
import store from "../redux/store";
import { encodeData } from "./encodeData";
import { generateUrl } from "./generateUrl";

export const getItems = async (
    url_part: string,
    data?: string | null,
    usePagination?: boolean
) => {
    let validUrl = generateUrl(url_part);

    if (data || (usePagination && validUrl[validUrl.length - 1] === "/")) {
        validUrl = validUrl.slice(0, -1);
    }

    if (data) {
        const filters = encodeData(data);

        validUrl += `${validUrl.includes("?") ? "&" : "?"}filters=${filters}`;
    }

    if (usePagination) {
        const currentState = store.getState();

        validUrl += `${validUrl.includes("?") ? "&" : "?"}page=${
            currentState.pageReducer.currentPage
        }`;
    }

    return await axios
        .get(validUrl)
        .then((res) => {
            if (res.data.pages_count && usePagination) {
                store.dispatch(SetAvailablePagesCount(res.data.pages_count));
            }

            return res.data?.results || res.data;
        })
        .catch(() => []);
};
