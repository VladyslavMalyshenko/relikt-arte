import { SET_IS_LOADED } from "../actionTypes/LoadTypes";

const initialState = {
    isLoaded: false,
};

export const LoadReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_IS_LOADED:
            return {
                isLoaded: action.payload,
            };

        default:
            return state;
    }
};
