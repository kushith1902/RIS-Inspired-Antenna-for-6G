import { Response, NextFunction } from "express";
import { PlaylistService } from "../services/playlist.service";
import { AuthenticatedRequest } from "../middlewares/auth";

export class PlaylistController {
  static async getUserPlaylists(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const playlists = await PlaylistService.getUserPlaylists(req.user!.userId);
      res.status(200).json({ success: true, data: playlists });
    } catch (error) {
      next(error);
    }
  }

  static async createPlaylist(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { title, description } = req.body;
      const playlist = await PlaylistService.createPlaylist(req.user!.userId, title, description);
      res.status(201).json({ success: true, data: playlist });
    } catch (error) {
      next(error);
    }
  }

  static async addSong(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { playlistId, songId } = req.body;
      const item = await PlaylistService.addSongToPlaylist(playlistId, songId);
      res.status(200).json({ success: true, data: item });
    } catch (error) {
      next(error);
    }
  }

  static async toggleLike(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { songId } = req.body;
      const result = await PlaylistService.toggleLikeSong(req.user!.userId, songId);
      res.status(200).json({ success: true, data: result });
    } catch (error) {
      next(error);
    }
  }

  static async getLikedSongs(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const songs = await PlaylistService.getLikedSongs(req.user!.userId);
      res.status(200).json({ success: true, data: songs });
    } catch (error) {
      next(error);
    }
  }
}
