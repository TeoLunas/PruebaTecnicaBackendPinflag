import express from "express";
import { buscarPorNombreEnDB, obtenerPersonajes, obtenerPersonajesByDatos,  } from "../controllers/personajesControllers.js";

const router = express.Router();

router.get('/:numeroPersonajes', obtenerPersonajes)
router.post('/', obtenerPersonajesByDatos)
router.get('/buscar/:nombre', buscarPorNombreEnDB)

export default router;