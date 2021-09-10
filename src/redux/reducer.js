const initialState = {
    userInfo: {}
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case "updateUserInfo":
            return {
                userInfo: { ...action.payload}
            };

        default:
            return state;
    }
}

export default reducer;