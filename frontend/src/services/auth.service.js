import axios from "./axios.js";

const apiUrl = import.meta.env.VITE_API_URL;

export const login = async(username, password) => {
    try {

        const user = await axios.post(`/login`, {username, password});
        return user;
        
    } catch (error) {
        console.log("Error al loggearse a la aplicacion", error);
    }
}

export const verifyToken = () => {
    try {

        const response = axios.get('/verify-token');
        return response;

    } catch (error) {
        console.log("Error al verificar el token", error);
    }
}