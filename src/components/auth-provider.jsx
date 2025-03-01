import { createContext, useContext, useState, useEffect } from "react";

const initialState = {
    user: '',
    token: '',
    login: () => {},
    logout: () => {}
}
const AuthContext = createContext(initialState);

export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");
    
        if (storedUser) setUser(storedUser);
        if (storedToken) setToken(storedToken);
    }, []);

    const login = (userData, token) => {
        setUser(userData);
        setToken(token);
    
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", token);
    }

    const logout =() => {
        setUser(null);
        setToken(null);
    
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    }

    const updateRole = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    }
    
    return <AuthContext.Provider value={{user, login, token, logout, updateRole}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

