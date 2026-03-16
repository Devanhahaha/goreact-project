import { createContext, useState, useEffect, type ReactNode } from "react";
import Cookies from "js-cookie";

// Menentukan tipe dari context value
interface AuthContextType {
    isAuthenticated: boolean;
    setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

// membuat context dengan default value undefined
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// menentukan tipe props untuk AuthProvider
interface  AuthProviderProps {
    children: ReactNode;
}

// komponen provider untuk konteks autentikasi
export const AuthProvider: React.FC<AuthProviderProps> = ({ children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const handleTokenChange = () => {
            setIsAuthenticated(!!Cookies.get('token'));
        };

        window.addEventListener('storage', handleTokenChange);
        return () => {
            window.removeEventListener('storage', handleTokenChange);
        };
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}