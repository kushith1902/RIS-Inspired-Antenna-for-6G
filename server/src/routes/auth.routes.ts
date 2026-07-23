import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { authenticateJwt } from "../middlewares/auth";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.get("/me", authenticateJwt as any, AuthController.me as any);
router.post("/logout", AuthController.logout);

export default router;
