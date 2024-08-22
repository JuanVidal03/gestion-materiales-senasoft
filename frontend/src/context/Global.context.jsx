import { useContext, useState, useEffect, createContext } from 'react';
import Cookies from "js-cookie";

import { verifyToken } from '../services/auth.service.js';

export const GolbalContext = createContext();

const GlobalContextProvider = ({children}) => {
    
    // auth states
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    // verificar la cookie de sesion
    useEffect(() => {

        const checkLogin = async() => {
            const cookies = Cookies.get();

            if(!cookies.token) {
                setIsAuthenticated(false);
                setUser(null);
            }
                
            try {
                const res = await verifyToken(cookies.token);
                if(!res.data){
                    setIsAuthenticated(false);
                    setLoading(false);
                    return setUser(null);
                }

                setLoading(false);
                setIsAuthenticated(true);
                setUser(res.data);

            } catch (error) {
                console.log("Error al autenticar el usuario", error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }

        }
        checkLogin();

    }, []);

    // manejar estado del modal
    const [stateModal, setStateModal] = useState(false);

    
    return (
        <GolbalContext.Provider value={{
            user,
            setUser,
            isAuthenticated,
            setIsAuthenticated,
            loading,
            setLoading,
            stateModal,
            setStateModal
        }}>
            {children}
        </GolbalContext.Provider>
    );
}

export default GlobalContextProvider;