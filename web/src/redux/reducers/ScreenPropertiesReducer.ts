import { SET_DIMENSIONS } from "../actionTypes/ScreenProperties";

const initialState = {
    width: window.innerWidth,
    height: window.innerHeight,
};

export const ScreenPropertiesReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_DIMENSIONS:
            return {
                width: action.payload.width,
                height: action.payload.height,
            };

        default:
            return state;
    }
};
