import { createContext, useContext, useState, useEffect } from "react";
import { saveOrRemoveJob as updateSavedJobs } from "@/api/jobs.api";

const initialState = {
    user: '',
    token: '',
    loading: true,
    login: () => {},
    logout: () => {},
    saveOrRemoveJob: () => {}
}
const AuthContext = createContext(initialState);

export const AuthProvider = ({children}) => {
    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        const storedToken = localStorage.getItem("token");
    
        if (storedUser) setUser(storedUser);
        if (storedToken) setToken(storedToken);
        setLoading(false);
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

    const saveOrRemoveJob = async (jobId) => {
        const {savedJobs} = await updateSavedJobs(jobId);
        setUser(prev => {
            return {
                ...prev,
                savedJobs
            }
        });
        localStorage.setItem("user", JSON.stringify({...user, savedJobs}));
    }
    
    return <AuthContext.Provider value={{user, login, token, loading, logout, updateRole, saveOrRemoveJob}}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

