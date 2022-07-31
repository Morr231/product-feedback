import { configureStore } from "@reduxjs/toolkit";

import { userUpdatedReducer } from "./userUpdated";

const store = configureStore({
    reducer: {
        userUpdated: userUpdatedReducer,
    },
});

export default store;
