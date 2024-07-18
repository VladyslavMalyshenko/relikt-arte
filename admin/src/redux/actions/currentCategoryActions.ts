import { Category, MainCategory } from "../../types/categoriesTypes";
import { SET_CURRENT_CATEGORY } from "../actionTypes/currentCategoryActionTypes";

export const SetCurrentCategory = (category: Category | MainCategory) => {
  return {
    type: SET_CURRENT_CATEGORY,
    payload: category,
  };
};
