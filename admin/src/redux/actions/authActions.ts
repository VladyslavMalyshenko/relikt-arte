import { SET_AUTH } from "../actionTypes/authActionTypes";

export const SetAuth = (auth: boolean) => {
    return {
        type: SET_AUTH,
        payload: auth,
    };
};
