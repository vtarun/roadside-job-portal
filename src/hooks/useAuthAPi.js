import { useCallback, useState } from "react";
import { loginApi, signUpAPi } from "@/api/auth.api";

const useAuthApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const loginUser = useCallback(async (email, password) => {
        setLoading(true);
        setError(null);
        try{
            const data = await loginApi(email, password);
            return data;
        } catch(err){
            setError(err.message || "An error occurred during login.");
            throw err;
        } finally{
            setLoading(false);
        }
    })

    const signUpUser =  useCallback(async (firstname, lastname, email, password) => {
        setLoading(true);
        setError(null);
        try{
            const data = await signUpAPi(firstname, lastname, email, password);
            return data;
        }catch(err){
            setError(err.message || "An error occurred during signUp.");
            throw err;
        }finally{
            setLoading(false);
        }
    })

    return { loading, error, loginUser, signUpUser };
}

export default useAuthApi;