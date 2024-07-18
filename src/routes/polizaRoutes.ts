import { Router } from "express";
import polizaController from "../controllers/polizaController"

const router = Router()

router
    .post("/", polizaController.createPoliza)
    .get("/", polizaController.viewPolizas)
    .get("/filter", polizaController.filterPolizas)
    .get("/:id", polizaController.viewPolizaById)
    .put("/:id", polizaController.editPolizaById)
    .delete("/:id", polizaController.deletePolizaById)

export default router;