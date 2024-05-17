import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react"

import { AuthService } from "../services/api/auth/AuthService";
import { IAuthContextData } from "../../@types/IAuthContextData";
import { IAuthProvideProps } from "../../@types/IAuthProvideProps";



const AuthContext = createContext({} as IAuthContextData ) // injetando as props de IAuthContextData no context

const LOCAL_STORAGE_KEY_ACCESS_TOKEN = 'APP_ACCESS_TOKEN'
const LOCAL_STORAGE_KEY_USER_ID = 'APP_USER_ID';


export const AuthProvider: React.FC<IAuthProvideProps> = ({ children }) => {
    const [accessToken, setAccessToken] = useState<string>()
    const [userId, setUserId] = useState<number | undefined>();

    useEffect(() => {
        const storedToken = localStorage.getItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        const storedUserId = localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID);
    
        if (storedToken) {
            setAccessToken(storedToken); 
        } else {
            setAccessToken(undefined);
        }

        if (storedUserId) {
            setUserId(Number(storedUserId));
        }

    })

    const handleLogin = useCallback(async (email: string, password: string) => {
        const result = await AuthService.auth(email, password);
    
        if (result instanceof Error) {
            return result.message;
        } else {
            localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, result.BearerToken);
            
            localStorage.setItem(LOCAL_STORAGE_KEY_USER_ID, String(result.id_user));
    
            setAccessToken(result.BearerToken);
            setUserId(result.id_user);

            return 'Login successful'; 
        }
    
    }, []);

    const handleLogout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
        localStorage.removeItem(LOCAL_STORAGE_KEY_USER_ID);
        setAccessToken(undefined);
        setUserId(undefined);
    }, []);
    
    const isAuthenticated = useMemo(() => !!accessToken, [accessToken])

    return (
        // Funções passadas em contexto obrigatoriamente tem que usar o useCallback para não prejudicar o desempenho
        <AuthContext.Provider value={{ isAuthenticated, login: handleLogin, logout: handleLogout, id_user: userId }}>
            { children }
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => useContext(AuthContext);

