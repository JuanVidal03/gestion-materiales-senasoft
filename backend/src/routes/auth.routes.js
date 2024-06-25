import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Router } from "express";
const authRouter = Router();
import { dbConfig } from "../DB/dbConfig.js";
// controllers
import { login, logout, register, verifyToken } from "../controllers/auth.controller.js";


authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/verify-token', verifyToken);


export default authRouter;