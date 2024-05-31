import { combineReducers } from "@reduxjs/toolkit";
import { AuthReducer } from "./AuthReducer";

export const RootReducer = combineReducers({
    AuthReducer,
});
