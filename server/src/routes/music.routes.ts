import { Router } from "express";
import { MusicController } from "../controllers/music.controller";

const router = Router();

router.get("/songs", MusicController.getSongs);
router.get("/songs/:id", MusicController.getSongById);
router.get("/genres", MusicController.getGenres);
router.get("/albums", MusicController.getAlbums);
router.get("/stream/:id", MusicController.streamAudio as any);

export default router;
