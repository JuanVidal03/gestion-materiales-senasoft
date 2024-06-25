import express from "express";
import cors from "cors";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
const app = express();
config();
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


import authRouter from "./routes/auth.routes.js";
app.use('/api',authRouter);


const server = app.listen(port, () => {
    console.log(`Server running on port: ${server.address().port}`);
});