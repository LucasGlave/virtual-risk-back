import { Router } from "express";
import polizaController from "../controllers/polizaController"

const router = Router()

router
    .post("/", polizaController.createPoliza)
    .get("/", polizaController.viewPolizas)
    .get("/filter", polizaController.filterPolizas)
    .get("/:poliza", polizaController.viewPolizaByNumber)
    .put("/:poliza", polizaController.editPolizaByNumber)
    .delete("/:poliza", polizaController.deletePolizaByNumber)

export default router;