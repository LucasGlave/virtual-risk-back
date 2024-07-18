import { Router } from "express";
import polizaRoutes from "./polizaRoutes"
import usuarioRoutes from "./usuarioRoutes"

const router = Router()

router.use('/poliza', polizaRoutes)
router.use('/usuario', usuarioRoutes)

export default router