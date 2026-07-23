import { Router } from "express";
import { PlaylistController } from "../controllers/playlist.controller";
import { authenticateJwt } from "../middlewares/auth";

const router = Router();

router.use(authenticateJwt as any);

router.get("/playlists", PlaylistController.getUserPlaylists as any);
router.post("/playlists", PlaylistController.createPlaylist as any);
router.post("/playlists/add-song", PlaylistController.addSong as any);
router.post("/likes/toggle", PlaylistController.toggleLike as any);
router.get("/likes", PlaylistController.getLikedSongs as any);

export default router;
