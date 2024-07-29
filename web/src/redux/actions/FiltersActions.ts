import { SET_FILTERS } from "../actionTypes/FiltersTypes";

export const SetFilters = (filter: any) => {
    return {
        type: SET_FILTERS,
        payload: filter,
    };
};
