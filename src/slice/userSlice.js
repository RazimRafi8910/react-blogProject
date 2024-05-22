import { createSlice } from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        
    },
    reducers: {
        setUserData: (state, { payload }) => {
            state.user = payload;
        },
        removeUserData: (state, action) => {
            state.user = null;
        }
    }
});

export const { setUserData, removeUserData } = userSlice.actions;
export default userSlice.reducer;