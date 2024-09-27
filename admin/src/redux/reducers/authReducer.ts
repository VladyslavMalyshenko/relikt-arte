import { SET_AUTH } from "../actionTypes/authActionTypes";

const initialState = {
    auth: false,
};

export const authReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_AUTH:
            return {
                auth: action.payload,
            };
        default:
            return state;
    }
};
