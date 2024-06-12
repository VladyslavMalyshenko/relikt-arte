import { SET_CURRENT_ACTION } from "../actionTypes/currentActionTypes";

export const SetCurrentAction = (action: string) => {
    return {
        type: SET_CURRENT_ACTION,
        payload: action,
    };
};
