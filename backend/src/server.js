import express from "express";
const app = express();
import cors from "cors";
import { config } from "dotenv";
config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
const logger = morgan("dev");

const port = process.env.SERVER_PORT || 8080;
// conexion DB
import { dbConnection } from "./DB/connection.js";
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(logger);



import authRouter from "./routes/auth.routes.js";
app.use('/api',authRouter);
import materialesRouter from "./routes/materiales.routes.js";
app.use('/api', materialesRouter);
import usuariosRouter from "./routes/usuarios.routes.js";
app.use('/api', usuariosRouter);


const server = app.listen(port, () => {
    console.log(`Server running on port: ${server.address().port}`);
});