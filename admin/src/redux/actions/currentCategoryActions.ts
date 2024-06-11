import { Category } from "../../data/categories";
import { SET_CURRENT_CATEGORY } from "../actionTypes/currentCategoryActionTypes";

export const SetCurrentCategory = (category: Category) => {
    return {
        type: SET_CURRENT_CATEGORY,
        payload: category,
    };
};
