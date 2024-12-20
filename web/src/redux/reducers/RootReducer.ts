import { combineReducers } from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthReducer";
import { CartReducer } from "./CartReducer";
import { FiltersReducer } from "./FiltersReducer";
import { LoadReducer } from "./LoadReducer";
import { PageReducer } from "./PageReducer";
import { ScreenPropertiesReducer } from "./ScreenPropertiesReducer";

export const RootReducer = combineReducers({
    AuthReducer,
    ScreenPropertiesReducer,
    PageReducer,
    LoadReducer,
    FiltersReducer,
    CartReducer,
});
