import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slice/userSlice";
import themeSlice from "../slice/themeSlice";


export  const store = configureStore({
    reducer: {
        userReducer: userSlice,
        themeReducer:themeSlice
    },
});
