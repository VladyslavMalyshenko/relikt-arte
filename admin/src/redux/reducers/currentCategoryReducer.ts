import { categoriesData } from "../../data/categories";
import { SET_CURRENT_CATEGORY } from "../actionTypes/currentCategoryActionTypes";

const initialState = {
    category: categoriesData[0],
};

export const currentCategoryReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_CURRENT_CATEGORY:
            return {
                category: action.payload,
            };
        default:
            return state;
    }
};
