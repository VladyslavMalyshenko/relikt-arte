import {
    SET_CURRENT_PAGE,
    SET_PAGES_COUNT,
} from "../actionTypes/currentPageActionTypes";

export const SetCurrentPage = (page: number) => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page,
    };
};

export const SetAvailablePagesCount = (pagesCount: number) => {
    return {
        type: SET_PAGES_COUNT,
        payload: pagesCount,
    };
};
