import { combineReducers } from "@reduxjs/toolkit";
import { currentActionReducer } from "./currentActionReducer";
import { currentCategoryReducer } from "./currentCategoryReducer";
import { currentDeleteObjectReducer } from "./currentDeleteObjectReducer";
import { currentItemReducer } from "./currentItemReducer";
import { currentPageReducer } from "./currentPageReducer";
import { notificationsReducer } from "./notificationsReducer";

export const rootReducer = combineReducers({
    actionReducer: currentActionReducer,
    categoryReducer: currentCategoryReducer,
    itemReducer: currentItemReducer,
    notificationsReducer,
    deleteObjectReducer: currentDeleteObjectReducer,
    pageReducer: currentPageReducer,
});
