import { prisma } from "../config/db";
import { INDIAN_SONGS, INDIAN_GENRES, INDIAN_ALBUMS } from "./indianMusicData";

export class MusicService {
  static async getAllSongs(query?: { genre?: string; search?: string }) {
    try {
      const where: any = {};
      if (query?.search) {
        where.OR = [
          { title: { contains: query.search, mode: "insensitive" } },
          { artist: { user: { displayName: { contains: query.search, mode: "insensitive" } } } }
        ];
      }
      if (query?.genre) {
        where.genres = {
          some: {
            genre: { name: { equals: query.genre, mode: "insensitive" } }
          }
        };
      }

      const songs = await prisma.song.findMany({
        where,
        include: {
          artist: {
            include: {
              user: { select: { displayName: true, avatarUrl: true } }
            }
          },
          album: true,
          genres: { include: { genre: true } },
          lyrics: true
        },
        orderBy: { createdAt: "desc" }
      });

      if (songs.length > 0) {
        return songs.map(s => ({
          ...s,
          playCount: Number(s.playCount),
          artist: {
            ...s.artist,
            name: s.artist.user.displayName
          }
        }));
      }
    } catch (e) {
      console.warn("PostgreSQL unavailable, serving Indian Music dataset from memory fallback");
    }

    // Fallback to Indian Songs Dataset
    let filtered = [...INDIAN_SONGS];
    if (query?.search) {
      const q = query.search.toLowerCase();
      filtered = filtered.filter(s =>
        s.title.toLowerCase().includes(q) || s.artist.name.toLowerCase().includes(q)
      );
    }
    return filtered;
  }

  static async getSongById(songId: string) {
    try {
      const song = await prisma.song.findUnique({
        where: { id: songId },
        include: {
          artist: {
            include: {
              user: { select: { displayName: true, avatarUrl: true } }
            }
          },
          album: true,
          genres: { include: { genre: true } },
          lyrics: true
        }
      });

      if (song) {
        return {
          ...song,
          playCount: Number(song.playCount),
          artist: {
            ...song.artist,
            name: song.artist.user.displayName
          }
        };
      }
    } catch (e) {
      console.warn("PostgreSQL unavailable, looking up Indian Song from fallback");
    }

    const fallbackSong = INDIAN_SONGS.find(s => s.id === songId);
    if (!fallbackSong) {
      return INDIAN_SONGS[0]; // Default fallback track
    }
    return fallbackSong;
  }

  static async getGenres() {
    try {
      const dbGenres = await prisma.genre.findMany({
        orderBy: { name: "asc" }
      });
      if (dbGenres.length > 0) return dbGenres;
    } catch (e) {
      console.warn("PostgreSQL unavailable, returning Indian Genres fallback");
    }
    return INDIAN_GENRES;
  }

  static async getAlbums() {
    try {
      const dbAlbums = await prisma.album.findMany({
        include: {
          artist: {
            include: { user: { select: { displayName: true } } }
          },
          songs: true
        },
        orderBy: { releaseDate: "desc" }
      });

      if (dbAlbums.length > 0) {
        return dbAlbums.map(a => ({
          ...a,
          artistName: a.artist.user.displayName,
          songCount: a.songs.length
        }));
      }
    } catch (e) {
      console.warn("PostgreSQL unavailable, returning Indian Albums fallback");
    }

    return INDIAN_ALBUMS;
  }

  static async incrementPlayCount(songId: string, userId?: string) {
    try {
      await prisma.song.update({
        where: { id: songId },
        data: { playCount: { increment: 1 } }
      });
    } catch (e) {
      // Ignored in fallback mode
    }
  }
}
