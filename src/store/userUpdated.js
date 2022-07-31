import { createSlice } from "@reduxjs/toolkit";

const userUpdatedSlice = createSlice({
    name: "userUpdated",
    initialState: {
        updated: false,
    },
    reducers: {
        setUserUpdated(state) {
            state.updated = !state.updated;
        },
    },
});

export const userUpdatedActions = userUpdatedSlice.actions;
export const userUpdatedReducer = userUpdatedSlice.reducer;
