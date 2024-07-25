import { SET_DELETE_OBJECT } from "../actionTypes/currentDeleteObjectActionTypes";

export const SetDeleteItem = (object: any) => {
    return {
        type: SET_DELETE_OBJECT,
        payload: object,
    };
};
