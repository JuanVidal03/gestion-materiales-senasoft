import express from "express";
import { config } from "dotenv";
const app = express();
config();
const port = process.env.SERVER_PORT || 8080;
// conexion DB
import { dbConnection } from "./DB/connection.js";
dbConnection();

app.use(express.json());
app.use(express.urlencoded({ extended:false }));


import authRouter from "./routes/auth.routes.js";
app.use('/api',authRouter);


const server = app.listen(port, () => {
    console.log(`Server running on port: ${server.address().port}`);
});