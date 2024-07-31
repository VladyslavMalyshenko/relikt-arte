import { SET_CURRENT_PAGE, SET_PAGES_COUNT } from "../actionTypes/PageTypes";

const initialState = {
    currentPage: 1,
    availablePages: 1,
};

export const PageReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {
                currentPage: action.payload,
                availablePages: state.availablePages,
            };
        case SET_PAGES_COUNT:
            return {
                currentPage: state.currentPage,
                availablePages: action.payload,
            };
        default:
            return state;
    }
};
