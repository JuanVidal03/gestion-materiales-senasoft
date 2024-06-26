import { Router } from "express";
import { allUsuarios, deleteUsuario, usuarioById, updateUsuario } from "../controllers/usuarios.controller.js";

const usuariosRouter = Router();

usuariosRouter.get('/usuarios', allUsuarios);
usuariosRouter.get('/usuarios/:id', usuarioById);
usuariosRouter.delete('/usuarios/:id', deleteUsuario);
usuariosRouter.put('/usuarios/:id', updateUsuario);


export default usuariosRouter;