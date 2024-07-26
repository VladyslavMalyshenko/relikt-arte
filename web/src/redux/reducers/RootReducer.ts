import { combineReducers } from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthReducer";
import { PageReducer } from "./PageReducer";
import { ScreenPropertiesReducer } from "./ScreenPropertiesReducer";

export const RootReducer = combineReducers({
    AuthReducer,
    ScreenPropertiesReducer,
    PageReducer,
});
