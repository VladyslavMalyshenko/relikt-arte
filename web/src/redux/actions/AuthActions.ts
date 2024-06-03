import { SET_AUTH } from "../actionTypes/AuthTypes";

export const SetAuth = (payload: boolean) => {
    return {
        type: SET_AUTH,
        payload,
    };
};
