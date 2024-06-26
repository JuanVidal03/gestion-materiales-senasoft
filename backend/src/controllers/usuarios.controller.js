import { dbConfig } from "../DB/dbConfig.js";
import bycript from "bcrypt";

export const allUsuarios = (req, res) => {

    try {
        const db = dbConfig();
        
        db.query("SELECT * FROM usuarios", (error, usuarios) => {
            if(error) return res.status(400).json({message: "Error al obtener los usuarios", error}); 
            res.status(200).json(usuarios);
        });

    } catch (error) {
        console.log("Error al obtener todos los usuarios: ", error);
        res.status(500).json({message: "Error al obtener todos los usuarios", error});
    }

}

export const usuarioById = (req, res) => {
    
    const db = dbConfig();
    const { id } = req.params;

    try {

        db.query("SELECT id, username, name, lastName, email, rol_id, createdDate FROM usuarios WHERE id = ? LIMIT 1", [id], (error, usuarios) => {
            
            if (error) return res.status(400).json({message: "Error al  obtener el usuario", error});
            if(usuarios.length === 0) return res.status(404).json({message: `El usuario con id: ${id} no existe.`});
            
            res.status(200).json(usuarios[0]);
        
        });
        
    } catch (error) {
        console.log("Error al obtener el usuario: ", error);
        res.status(500).json({message: "Error al obtener el usuario", error});
    }
}


export const deleteUsuario = (req, res) => {
    
    const db = dbConfig();
    const { id  } = req.params;

    try {

        db.query("DELETE FROM usuarios WHERE id = ?", [id], (error, result) => {
            
            if(error) return res.status(400).json({message: "Error al eliminar el usuario", error});
            if (result.affectedRows === 0) return res.status(404).json({message: `El usuario con id: ${id} no existe.`}); 

            res.status(200).json({message: `El usuario con id: ${id} ha sido eliminado correctamente!`});

        });

    } catch (error) {
        console.log("Error al eliminar el usuario: ", error);
        res.status(500).json({message: "Error al eliminar el usuario", error});
    }
}

export const updateUsuario = (req, res) => {

    const db = dbConfig();
    const { id } = req.params;
    const { username, name, lastName, email, rol_id } = req.body;

    try {
        // encontrando y actualizando el usuario
        db.query("SELECT username, lastName, email, rol_id FROM usuarios WHERE id = ? LIMIT 1", [id], (error, usuarios) => {
            
            if (error) return res.status(400).json({message: "Error al  obtener el usuario", error});
            if(usuarios.length === 0) return res.status(404).json({message: `El usuario con id: ${id} no existe.`});

            db.query("UPDATE usuarios SET username = ?, name = ?, lastName = ?, email = ?, rol_id = ?", [username, name, lastName, email, rol_id], (error, result) => {
                
                if (error) return res.status(400).json({message: "Error al  actualizar el usuario", error});
                console.log(result);
                if(result.affectedRows > 0) return res.status(200).json({message: `El usuario con id: ${id} ha sido actualizado satisfactoriamente.`});

            })
        });
        
    } catch (error) {
        console.log("Error al actualizar el usuario: ", error);
        res.status(500).json({message: "Error al actualizar el usuario", error});
    }
}