import { Router } from "express";
import userController from "../controllers/usuarioController"

const router = Router()

router
    .get("/", userController.getUsers)
    .post("/login", userController.loginUser)
    .post("/logout", userController.logoutUser)
    .delete("/delete-user", userController.deleteUser)

export default router;