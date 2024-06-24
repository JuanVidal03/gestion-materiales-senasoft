import { Router } from "express";
const authRouter = Router();


authRouter.post('/register', (req, res) => {

    const body = req;

    try {

        


        
    } catch (error) {
        console.log('<< Error al registrar el usuario >>');
        console.log(error);
        res.status(500).json({ message: 'Error al registrar el usuario.', error: error.message });
    }

});








export default authRouter;