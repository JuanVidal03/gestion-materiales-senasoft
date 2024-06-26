import jwt from "jsonwebtoken";
import { dbConfig } from "../DB/dbConfig.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    let { username, name, lastName, password, email, rol_id } = req.body;

    try {

        const db = dbConfig();

        // validar si el usuario existe
        db.query(`SELECT * FROM usuarios`, (error, results) => {

            error && res.status(400).json({ message: "Error al traer los usuarios", error });

            results.forEach(usuario => {
                usuario.username === username && res.status(400).json({ message: 'El usuario ya existe!' });
            })

        });
        
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        
        // guardar el usuario en la DB
        db.query(`INSERT INTO usuarios(username, name, lastName, password, email, rol_id) VALUES ('${username}', '${name}', '${lastName}', '${password}', '${email}', ${rol_id})`, (error, results) => {
            error && res.status(400).json({ message: "Error al guardar el usuario en la DB.", error });
        });

        const user = { username, name, lastName, password, email, rol_id };

        // generar token de inicio de sesion
        jwt.sign(
            { username: username, rol: rol_id },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" },
            (err, token) => {

                err && res.status(400).json({ message: 'Error al generar token de ingreso', err })
                return res.status(200).json({ user, token });
            }
        );

    } catch (error) {
        console.log('<< Error al registrar el usuario >>', error);
        res.status(500).json({ message: 'Error al registrar el usuario.', error: error.message });
    }

}


export const login = (req, res) => {

    const { email, password, username } = req.body;

    try {

        const db = dbConfig();
        // verificar que el usuario existe
        db.query(`SELECT * FROM usuarios WHERE (username = ? OR email = ?)`, [username, email], async (error, results) => {

            error && res.status(400).json({ message: "Error al traer los usuarios", error });

            if (results.length > 0) {
                const user = results[0];

                const comparePassword = await bcrypt.compare(password, user.password);
                comparePassword === false && res.status(400).json({message: 'Usuario o contraseña incorrectos.'});
                // generar token para inicio de sesion
                jwt.sign(
                    { id: user.id, rol: user.rol_id, username: user.username },
                    process.env.TOKEN_SECRET,
                    { expiresIn: "1h" },
                    (err, token) => {
                        err && res.status(400).json({ message: 'Error al generar token de ingreso', err });
                        
                        res.cookie("token", token, {
                            httpOnly: false,
                            secure: true,
                            sameSite: "none"
                        });
                        res.status(200).json({ user, token });
                    }
                );

            } else{
                res.status(400).json({message: 'El usuario no existe!.'});
            }
        });
        
    } catch (error) {
        console.log('<< Error al ingresar a la aplicacion >>', error);
        res.status(500).json({ message: 'Error al ingresar a la aplicacion.', error: error.message });
    }

}


export const logout = (req, res) => {
    try {
        
        res.cookie("token", "", {
            expires: new Date(0)
        });
        res.status(200).json({message: 'Sesion cerrada exitosamente!'});

    } catch (error) {
        console.log('<< Error al salir de la aplicacion >>', error);
        res.status(500).json({ message: 'Error al salir de la aplicacion.', error: error.message });
    }
}


export const verifyToken = async(req, res) => {
    
    
    try {
        const { token } = req.cookies;
        if(!token) return res.status(400).json({message: "Sin autorizacion"})

        const db = dbConfig();

        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
            if(err) return res.status(400).json({message:err});

            db.query("SELECT * FROM usuarios WHERE id = ?", [user.id], (error, user) => {
                error && res.status(400).json({message: error});
                
                if(!user) return res.status(400).json({message: "Usuario no encontrado"});

                return res.status(200).json(user);
            })
            
        })
        
    } catch (error) {
        console.log("Error al verificar el token", error);
        res.status(500).json({message: "Error al verificar el token"});
    }
}