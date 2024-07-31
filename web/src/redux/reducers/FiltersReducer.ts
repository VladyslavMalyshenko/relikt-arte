import { SET_FILTERS } from "../actionTypes/FiltersTypes";

const initialState = {
    filters: [],
};

export const FiltersReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_FILTERS:
            return {
                filters: action.payload,
            };
        default:
            return state;
    }
};
