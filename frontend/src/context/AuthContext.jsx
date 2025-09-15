import { createContext, useState, useEffect, use } from "react";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(savedUser);
        }
    }, []);

    const login = (username) => {
        setUser(username);
        localStorage.setItem('user', username);
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    return(
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;