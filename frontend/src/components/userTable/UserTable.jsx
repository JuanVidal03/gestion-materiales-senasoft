import { useContext } from "react";
import "./userTable.css";

import { checkUserRol } from "../../utils/checkUserRol.js";
import { formatDate } from "../../utils/formatDate.js";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faFileArchive } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";

import { deleteUser } from "../../services/usuarios.service.js";
import { UsuariosContext } from "../../context/Usuarios.context.jsx";



const Table = ({ users }) => {

    const { handleTableCounter, setUsuarios, usuarios } = useContext(UsuariosContext);

    const handleDelete = async(id) => {
        try {
            const deletedUser = await deleteUser(id);
            deletedUser.status === 200 ? toast.success(deletedUser.data.message) : toast.error(deletedUser.data.message);

            const userToDelete = usuarios.findIndex(usuario => usuario.id === id);
            if (userToDelete != -1) {
                usuarios.splice(userToDelete, 1);
                setUsuarios([...usuarios])
                handleTableCounter(); // actualizando la tabla
            }

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <ToastContainer/>
            <table className="border-table user-table">
                <thead>
                    <tr className="user-table-tr">
                        <th>ID</th>
                        <th>Nombre de Usuario</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>E-mail</th>
                        <th>Rol</th>
                        <th>Fecha de creacion</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users?.map(usuario => (
                            <tr key={usuario.id}>
                                <td>{usuario.id}</td>
                                <td>{usuario.username}</td>
                                <td>{usuario.name}</td>
                                <td>{usuario.lastName}</td>
                                <td>{usuario.email}</td>
                                <td>{checkUserRol(usuario.rol_id)}</td>
                                <td>{ formatDate(usuario.createdDate)}</td>
                                <td>
                                    <div className="user-table-icons-container">
                                        <FontAwesomeIcon onClick={() => handleDelete(usuario.id)} className="user-table-icon-trash" icon={faTrash}/>
                                        <FontAwesomeIcon className="user-table-icon-update" icon={faFileArchive}/>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default Table;
