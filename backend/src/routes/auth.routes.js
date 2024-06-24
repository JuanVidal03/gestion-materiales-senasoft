import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
const authRouter = Router();
import { dbConfig } from "../DB/dbConfig.js";


authRouter.post('/register', async (req, res) => {

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

        // generar token de inicio
        jwt.sign(
            { username: username, rol: rol_id },
            process.env.TOKEN_SECRET,
            { expiresIn: "1h" },
            (err, token) => {

                err && res.status(400).json({ message: 'Error al generar token de ingreso', err })
                res.status(200).json({ user, token });

            }
        );


    } catch (error) {
        console.log('<< Error al registrar el usuario >>', error);
        res.status(500).json({ message: 'Error al registrar el usuario.', error: error.message });
    }

});



export default authRouter;