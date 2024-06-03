import { SET_DIMENSIONS } from "../actionTypes/ScreenProperties";

type SetDimensionsPayloadType = {
    width: number;
    height: number;
};

export const SetDimensions = (payload: SetDimensionsPayloadType) => {
    return {
        type: SET_DIMENSIONS,
        payload,
    };
};
