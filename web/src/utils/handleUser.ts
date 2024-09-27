import axios from "axios";
import { generateUrl } from "./generateUrl";
import { handleErrors } from "./handleErrors";
import {
    getAccessToken,
    setAccessToken,
    setRefreshToken,
    validateToken,
} from "./tokenUtils";

// register

export const registerUser = async (data: any) => {
    return await axios
        .post(generateUrl("api/v1/user/create"), {
            ...data,
        })
        .then(() => true)
        .catch((err) => ({
            error: err.response.data.detail || "Щось пішло не так.",
        }));
};

export const singInAccount = async (data: any) => {
    return await axios
        .post(generateUrl("api/v1/user/auth"), {
            ...data,
        })
        .then((res) => {
            setAccessToken(res.data.access_token);
            setRefreshToken(res.data.refresh_token);

            return true;
        })
        .catch((err) => ({
            error: err.response.data.detail || "Щось пішло не так.",
        }));
};

// profile

export const getProfile = async () => {
    const isTokenValid = await validateToken();

    if (isTokenValid) {
        const headers: any = {};

        headers["Authorization"] = `Bearer ${getAccessToken()}`;

        const response = await axios
            .get(generateUrl("/user/profile"), { headers })
            .then((res) => res.data)
            .catch(() => false);

        return response;
    }

    return false;
};

export const changeMainInfo = async (data: any) => {
    const isTokenValid = await validateToken();

    if (isTokenValid) {
        const headers: any = {};

        headers["Authorization"] = `Bearer ${getAccessToken()}`;

        const response = await axios
            .put(generateUrl("/user/update"), data, { headers })
            .then(() => data)
            .catch((err) => {
                const errorData = err?.response?.data;

                return handleErrors(errorData);
            });

        return response;
    }

    return false;
};

export const changeEmail = async (newEmail: string) => {
    const isTokenValid = await validateToken();

    if (isTokenValid) {
        const headers: any = {};

        headers["Authorization"] = `Bearer ${getAccessToken()}`;

        const response = await axios
            .put(
                generateUrl("/user/change_email"),
                { new_email: newEmail },
                { headers }
            )
            .then(() => newEmail)
            .catch((err) => {
                const errorData = err?.response?.data;

                return handleErrors(errorData);
            });

        return response;
    }

    return false;
};

export const changePassword = async (data: any) => {
    const isTokenValid = await validateToken();

    if (isTokenValid) {
        const headers: any = {};

        headers["Authorization"] = `Bearer ${getAccessToken()}`;

        const response = await axios
            .post(generateUrl("/user/password_change"), data, { headers })
            .then(() => data)
            .catch((err) => {
                const errorData = err?.response?.data;

                return handleErrors(errorData);
            });

        return response;
    }

    return false;
};

// confirmation

export const confirmRegistration = async (token: string) => {
    const response = await axios
        .post(generateUrl(`api/v1/user/confirm_registration/${token}`))
        .then(() => true)
        .catch(() => false);

    return response;
};

export const confirmEmailChange = async (token: string) => {
    if (!token) return false;

    const response = await axios
        .post(generateUrl(`/user/confirm_change_email?token=${token}`))
        .then(() => true)
        .catch(() => false);

    return response;
};
