import axios from "./axios";

export const getAllUsers = async() => {
    try {
        const response = await axios.get('/usuarios');
        return response;
    } catch (error) {
        console.log("Error al obtener todos los usuarios.", error);
    }
}

export const deleteUser = async(id) => {
    try {
        const response = await axios.delete(`/usuarios/${id}`);
        return response;
    } catch (error) {
        console.log(`Error al eliminar el usuario con id:${id}.`, error);
    }
}