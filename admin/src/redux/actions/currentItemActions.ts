import { SET_CURRENT_ITEM } from "../actionTypes/currentItemActionTypes";

export const SetCurrentItem = (item: any) => {
    return {
        type: SET_CURRENT_ITEM,
        payload: item,
    };
};
