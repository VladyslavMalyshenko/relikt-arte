import axios from "axios";
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
    const isTokenValid = await axios
        .post(generateUrl("api/v1/token/verify/"), {
            token: getAccessToken(),
        })
        .then(() => true)
        .catch(() => false);

    if (!isTokenValid) {
        // refresh token logic here
    }
};

export const registerUser = async (data: any) => {
    await axios.post(generateUrl("api/v1/user/create"), {
        ...data,
    });
};

export const confirmRegistration = async (token: string) => {
    const response = await axios
        .post(generateUrl(`api/v1/user/confirm_registration/${token}`))
        .then(() => true)
        .catch(() => false);

    return response;
};
