const initialState = {
    auth: false,
};

export const AuthReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case "SET_AUTH":
            return {
                auth: action.payload,
            };
        default:
            return state;
    }
};
