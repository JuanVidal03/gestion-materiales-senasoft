import { useContext, useState, createContext } from 'react';

export const GolbalContext = createContext();

const GlobalContextProvider = ({children}) => {
    
    // auth states
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    
    return (
        <GolbalContext.Provider value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated
        }}>
            {children}
        </GolbalContext.Provider>
    );
}

export default GlobalContextProvider;