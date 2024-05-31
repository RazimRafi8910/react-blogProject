import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        status:false,
    },
    reducers: {
        setUserData: (state, { payload }) => {
            state.user = payload;
            state.status = true;
        },
        removeUserData: (state, action) => {
            state.user = null;
            state.status = false;
        }
    }
});

export const { setUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;