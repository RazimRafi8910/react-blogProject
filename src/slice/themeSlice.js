import { createSlice } from "@reduxjs/toolkit";


const themeSlice = createSlice({
    name: "theme",
    initialState: {
        theme:window.localStorage.getItem('theme') || 'light',
    },
    reducers: {
        changeTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
            window.localStorage.setItem('theme', state.theme);
            console.log(state.theme)
        }
    }
});


export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;