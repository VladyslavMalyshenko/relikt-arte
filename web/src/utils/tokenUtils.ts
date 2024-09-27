import axios from "axios";
import { RootStore } from "../redux/Stores/RootStore";
import { SetAuth } from "../redux/actions/AuthActions";
import { generateUrl } from "./generateUrl";

const accessTokenName = "ACCESS_RELIKTARTE_TOKEN";
const refreshTokenName = "REFRESH_RELIKTARTE_TOKEN";

export const getAccessToken = () => {
    return localStorage.getItem(accessTokenName);
};

export const getRefreshToken = () => {
    return localStorage.getItem(refreshTokenName);
};

export const setAccessToken = (token: string) => {
    return localStorage.setItem(accessTokenName, token);
};

export const setRefreshToken = (token: string) => {
    return localStorage.setItem(refreshTokenName, token);
};

export const validateToken = async () => {
    let isValid = false;

    const accessToken = getAccessToken();
    const refreshToken = getRefreshToken();

    if (accessToken) {
        const isTokenValid = await axios
            .post(generateUrl("api/v1/user/token/verify/"), {
                token: accessToken,
            })
            .then((res) => res.data || false)
            .catch(() => false);
        isValid = isTokenValid;
    }

    if (!isValid && refreshToken) {
        const isRefreshTokenValid = await axios
            .post(generateUrl("api/v1/user/token/access_from_refresh/"), {
                token: refreshToken,
            })
            .then((res) => {
                setAccessToken(res.data.access_token);
                setRefreshToken("");

                return true;
            })
            .catch(() => false);

        isValid = isRefreshTokenValid;
    }

    RootStore.dispatch(SetAuth(isValid));

    return isValid;
};
