import React, { createContext,useContext } from "react";


export const userContext = createContext({
    userDetails: {},
    changeUserDetails:()=>{}
});


export const UserProvider = userContext.Provider;


export default function useUser() {
    return useContext(userContext);
}