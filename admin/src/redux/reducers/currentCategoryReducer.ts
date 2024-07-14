import { categoriesData } from "../../data/categories";
import { SET_CURRENT_CATEGORY } from "../actionTypes/currentCategoryActionTypes";

const initialState = {
    category:
        categoriesData.find(
            (category: any) =>
                (category.link
                    .split("/")
                    .filter((part: string) => part.trim() !== "")[0] || "/") ===
                (window.location.href
                    .split("/")
                    .filter((part: string) => part.trim() !== "")[2] || "/")
        ) || categoriesData[0],
};

console.log(initialState);

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
