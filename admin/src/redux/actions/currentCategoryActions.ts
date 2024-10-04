import {
    Category,
    LetterCategory,
    MainCategory,
} from "../../types/categoriesTypes";
import { SET_CURRENT_CATEGORY } from "../actionTypes/currentCategoryActionTypes";

export const SetCurrentCategory = (
    category: Category | MainCategory | LetterCategory
) => {
    return {
        type: SET_CURRENT_CATEGORY,
        payload: category,
    };
};
