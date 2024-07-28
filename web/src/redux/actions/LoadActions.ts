import { SET_IS_LOADED } from "../actionTypes/LoadTypes";

export const SetIsLoaded = (isLoaded: boolean) => {
    return {
        type: SET_IS_LOADED,
        payload: isLoaded,
    };
};
