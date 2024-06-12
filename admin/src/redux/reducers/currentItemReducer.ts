import { SET_CURRENT_ITEM } from "../actionTypes/currentItemActionTypes";

const initialState = {
    item: {},
};

export const currentItemReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CURRENT_ITEM:
            return {
                item: action.payload,
            };
        default:
            return state;
    }
};
