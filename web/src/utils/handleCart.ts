import axios from "axios";
import { generateUrl } from "./generateUrl";
import { getAccessToken, validateToken } from "./tokenUtils";

const cartTokenName = "CART_RELIKTARTE_TOKEN";

export const setCartToken = async (token: string) => {
    localStorage.setItem(cartTokenName, token);
    return token;
};

export const getCartToken = async () => {
    let token = localStorage.getItem(cartTokenName);

    if (!token) {
        const newToken = await axios
            .get(generateUrl("api/v1/order/basket/"))
            .then((res) => res.data.basket_token)
            .catch(() => false);

        token = newToken;
        setCartToken(newToken || "");
    } else {
        const currentToken = await axios
            .get(generateUrl(`api/v1/order/basket?basket_token=${token}`))
            .then((res) => res.data.basket_token)
            .catch(
                async () =>
                    await axios
                        .get(generateUrl("api/v1/order/basket/"))
                        .then((res) => res.data.basket_token)
                        .catch(() => false)
            );

        token = currentToken;
        setCartToken(currentToken || "");
    }

    console.log(token);

    return token;
};

export const getCart = async () => {
    const isTokenValid = await validateToken();

    const token = await getCartToken();
    let url = "api/v1/order/basket/";
    const headers: any = {};

    if (token) {
        url += `?basket_token=${token}`;
    }

    if (isTokenValid) {
        headers["Authorization"] = `Bearer ${getAccessToken()}`;
    }
    console.log(url, headers);

    const response: any = await axios
        .get(generateUrl(url), { headers })
        .then((res) => res.data);

    return response;
};

// checkout item type
export const addCartItem = async (item: any) => {
    const isTokenValid = await validateToken();

    const token = await getCartToken();
    let url = "api/v1/order/basket/add_item";
    const headers: any = {};

    if (token) {
        url += `?basket_token=${token}`;
    }

    if (isTokenValid) {
        headers["Authorization"] = `Bearer ${getAccessToken()}`;
    }

    const response: any = await axios
        .post(generateUrl(url), { ...item }, { headers })
        .then((res) => res.data);

    return response.items;
};

export const changeCartItem = async (productId: number, product: any) => {
    const isTokenValid = await validateToken();

    const token = await getCartToken();
    let url = `api/v1/order/basket/update_item/${productId}/`;
    const headers: any = {};

    if (token) {
        url += `?basket_token=${token}`;
    }

    if (isTokenValid) {
        headers["Authorization"] = `Bearer ${getAccessToken()}`;
    }

    const response: any = await axios
        .put(generateUrl(url), { ...product }, { headers })
        .then((res) => res.data);

    return response;
};

export const deleteCartItem = async (productId: number) => {
    const isTokenValid = await validateToken();

    const token = await getCartToken();
    let url = `api/v1/order/basket/remove_item/${productId}/`;
    const headers: any = {};

    if (token) {
        url += `?basket_token=${token}`;
    }

    if (isTokenValid) {
        headers["Authorization"] = `Bearer ${getAccessToken()}`;
    }

    const response: any = await axios
        .delete(generateUrl(url), { headers })
        .then((res) => res.data || false)
        .catch(() => false);

    if (response) {
        return await getCart();
    }

    // return response;
};
