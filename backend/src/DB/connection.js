import { dbConfig } from './dbConfig.js';

export const dbConnection = () => {

    try {

       const db = dbConfig();
        db.connect((error) => {
            error ? console.log('Error de conexción a la DB', error) : console.log('<< DB conectada exitosamente >>');
        });

    } catch (error) {
        console.log('Error al conectar la DB', error);
    }

} 