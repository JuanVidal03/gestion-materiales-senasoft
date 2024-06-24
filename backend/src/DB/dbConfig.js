// parametros de coneccion con lal DB
import mysql2 from 'mysql2';

export const dbConfig = () => {
    const db = mysql2.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT
    })
    return db;
} 