import { Request, Response, NextFunction } from "express";
import { MusicService } from "../services/music.service";
import { AuthenticatedRequest } from "../middlewares/auth";
import fs from "fs";
import path from "path";

export class MusicController {
  static async getSongs(req: Request, res: Response, next: NextFunction) {
    try {
      const search = req.query.search as string;
      const genre = req.query.genre as string;
      const songs = await MusicService.getAllSongs({ search, genre });
      res.status(200).json({ success: true, data: songs });
    } catch (error) {
      next(error);
    }
  }

  static async getSongById(req: Request, res: Response, next: NextFunction) {
    try {
      const song = await MusicService.getSongById(req.params.id);
      res.status(200).json({ success: true, data: song });
    } catch (error) {
      next(error);
    }
  }

  static async getGenres(req: Request, res: Response, next: NextFunction) {
    try {
      const genres = await MusicService.getGenres();
      res.status(200).json({ success: true, data: genres });
    } catch (error) {
      next(error);
    }
  }

  static async getAlbums(req: Request, res: Response, next: NextFunction) {
    try {
      const albums = await MusicService.getAlbums();
      res.status(200).json({ success: true, data: albums });
    } catch (error) {
      next(error);
    }
  }

  static async streamAudio(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const songId = req.params.id;
      const song = await MusicService.getSongById(songId);
      await MusicService.incrementPlayCount(songId, req.user?.userId);

      // If audio URL is a external HTTP resource, redirect or proxy
      if (song.audioUrl.startsWith("http://") || song.audioUrl.startsWith("https://")) {
        return res.redirect(song.audioUrl);
      }

      // Local file HTTP Range streaming support
      const filePath = path.resolve(song.audioUrl);
      if (!fs.existsSync(filePath)) {
        return res.status(404).json({ success: false, error: { code: "FILE_NOT_FOUND", message: "Audio file path missing" } });
      }

      const stat = fs.statSync(filePath);
      const fileSize = stat.size;
      const range = req.headers.range;

      if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(filePath, { start, end });
        const head = {
          'Content-Range': `bytes ${start}-${end}/${fileSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': chunksize,
          'Content-Type': 'audio/mpeg',
        };
        res.writeHead(206, head);
        file.pipe(res);
      } else {
        const head = {
          'Content-Length': fileSize,
          'Content-Type': 'audio/mpeg',
        };
        res.writeHead(200, head);
        fs.createReadStream(filePath).pipe(res);
      }
    } catch (error) {
      next(error);
    }
  }
}
