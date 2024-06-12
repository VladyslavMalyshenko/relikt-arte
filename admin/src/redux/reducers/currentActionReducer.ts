import { SET_CURRENT_ACTION } from "../actionTypes/currentActionTypes";

const initialState = {
    action: "",
};

export const currentActionReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CURRENT_ACTION:
            return {
                action: action.payload,
            };
        default:
            return state;
    }
};
