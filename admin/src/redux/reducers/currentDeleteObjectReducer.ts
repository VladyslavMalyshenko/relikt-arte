import { SET_DELETE_OBJECT } from "../actionTypes/currentDeleteObjectActionTypes";

const initialState = {
    object: {},
};

export const currentDeleteObjectReducer = (
    state = initialState,
    action: any
) => {
    switch (action.type) {
        case SET_DELETE_OBJECT:
            return {
                object: action.payload,
            };
        default:
            return state;
    }
};
