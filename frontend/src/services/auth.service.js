import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

export const login = async(username, password) => {
    try {

        const user = await axios.post(`${apiUrl}/login`, {username, password});
        return user;
        
    } catch (error) {
        console.log("Error al loggearse a la aplicacion", error);
    }
}