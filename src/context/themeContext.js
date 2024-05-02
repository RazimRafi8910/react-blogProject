import React, { createContext, useContext } from "react";

export const themeContext = createContext({
    theme: 'light',
    changeTheme: () => {}
});

export const ThemeProvider = themeContext.Provider;

export default function useTheme() {
    return useContext(themeContext);
}
