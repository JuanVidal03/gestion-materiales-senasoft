import { createContext, useState } from 'react';

export const UsuariosContext = createContext();

const UsuariosContextProvider = ({ children }) => {
    
    const [usuarios, setUsuarios] = useState([]);
    // actualizar la tabla cada vez que se perciban cambios
    let [tableCounter, setTableCounter] = useState(1);
    const handleTableCounter = () => setTableCounter(tableCounter++);

    return (
        <UsuariosContext.Provider value={{
            usuarios,
            setUsuarios,
            tableCounter,
            setTableCounter,
            handleTableCounter
        }}>
            { children }
        </UsuariosContext.Provider>
    );
}

export default UsuariosContextProvider;
