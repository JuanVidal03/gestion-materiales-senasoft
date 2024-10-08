import { Suspense, lazy, useEffect, useContext } from "react";
import "./usuarios.css";

import LoggedLayout from "../../layout/loggedLayout/Logged.layout.jsx";

const Loader = lazy(() => import("../../components/loader/Loader.jsx"));
const UserTable = lazy(() => import("../../components/userTable/UserTable.jsx"));
const Button = lazy(() => import("../../components/button/Button.jsx"));

import { getAllUsers } from "../../services/usuarios.service.js";

import { UsuariosContext } from "../../context/Usuarios.context.jsx";
import { GolbalContext } from "../../context/Global.context.jsx";

const Usuarios = () => {

    document.title = "Usuarios - Gestor de Materiales";
    const { setUsuarios, usuarios, tableCounter } = useContext(UsuariosContext);
    const { setStateModal } = useContext(GolbalContext);


    useEffect(() => {
        const allUsers = async() => {
            try {
                const users = await getAllUsers();
                setUsuarios(users.data);
            } catch (error) {
                console.log(error);
            }
        }
        allUsers();
    }, [tableCounter]);

    return (
        <Suspense fallback={<Loader/>}>
            <LoggedLayout>
                <div className="usuarios-container">
                    <div className="usuarios-title">
                        <h1>Listado de usuarios</h1>
                        <Button
                            text="Agregar"
                            event={() => setStateModal(true)}
                        />
                    </div>
                    {
                        usuarios.length > 0 ? <UserTable users={usuarios} /> : <h1>No hay usarios disponibles!</h1>
                    }
                </div>
            </LoggedLayout>
        </Suspense>
    );
}

export default Usuarios;