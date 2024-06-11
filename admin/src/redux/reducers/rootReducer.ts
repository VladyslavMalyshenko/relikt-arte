import { combineReducers } from "@reduxjs/toolkit";
import { currentActionReducer } from "./currentActionReducer";
import { currentCategoryReducer } from "./currentCategoryReducer";
import { currentItemReducer } from "./currentItemReducer";

export const rootReducer = combineReducers({
    actionReducer: currentActionReducer,
    categoryReducer: currentCategoryReducer,
    itemReducer: currentItemReducer,
});
