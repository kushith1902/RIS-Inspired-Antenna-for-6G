import { Router } from "express";
import authRoutes from "./auth.routes";
import musicRoutes from "./music.routes";
import playlistRoutes from "./playlist.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/music", musicRoutes);
router.use("/user", playlistRoutes);

export default router;
