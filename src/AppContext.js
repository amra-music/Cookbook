import React, { createContext, useContext, useState } from "react";
import { getToken } from "utilities/localStorage";

export const UserContext = createContext({});

export const useUserContext = () => useContext(UserContext);

export const AppProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(getToken() !== "");

    return (
        <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
}
