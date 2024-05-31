import { configureStore } from "@reduxjs/toolkit";
import { RootReducer } from "../reducers/RootReducer";

export const RootStore = configureStore({
    reducer: RootReducer,
});
