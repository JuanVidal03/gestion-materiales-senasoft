import { Router } from "express";
import { allMateriales, createMaterial, updateMaterial, deleteMaterial, materialById } from "../controllers/materiales.controller.js";


const materialesRouter = Router();

materialesRouter.get('/materiales', allMateriales);
materialesRouter.get('/materiales/:id', materialById);
materialesRouter.post('/materiales', createMaterial);
materialesRouter.put('/materiales/:id', updateMaterial);
materialesRouter.delete('/materiales/:id', deleteMaterial);


export default materialesRouter;