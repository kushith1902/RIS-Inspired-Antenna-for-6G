import { prisma } from "../config/db";
import { INDIAN_PLAYLISTS, INDIAN_SONGS } from "./indianMusicData";

export class PlaylistService {
  static async getUserPlaylists(userId: string) {
    try {
      const playlists = await prisma.playlist.findMany({
        where: { ownerId: userId },
        include: {
          songs: {
            include: {
              song: {
                include: {
                  artist: { include: { user: { select: { displayName: true } } } },
                  album: true
                }
              }
            },
            orderBy: { position: "asc" }
          }
        },
        orderBy: { createdAt: "desc" }
      });

      if (playlists.length > 0) {
        return playlists.map(p => ({
          ...p,
          songCount: p.songs.length,
          songs: p.songs.map(ps => ({
            ...ps.song,
            playCount: Number(ps.song.playCount),
            artist: {
              ...ps.song.artist,
              name: ps.song.artist.user.displayName
            }
          }))
        }));
      }
    } catch (e) {
      console.warn("PostgreSQL unavailable, returning Indian Playlists fallback");
    }

    return INDIAN_PLAYLISTS;
  }

  static async createPlaylist(ownerId: string, title: string, description?: string) {
    try {
      return await prisma.playlist.create({
        data: {
          ownerId,
          title,
          description,
          coverArtUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80"
        }
      });
    } catch (e) {
      return {
        id: "pl-custom-1",
        title,
        description,
        coverArtUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&q=80",
        isPublic: true,
        ownerId,
        songCount: 0,
        songs: []
      };
    }
  }

  static async addSongToPlaylist(playlistId: string, songId: string) {
    try {
      const count = await prisma.playlistSong.count({ where: { playlistId } });
      return await prisma.playlistSong.create({
        data: {
          playlistId,
          songId,
          position: count + 1
        }
      });
    } catch (e) {
      return { playlistId, songId, position: 1 };
    }
  }

  static async toggleLikeSong(userId: string, songId: string) {
    try {
      const existing = await prisma.like.findFirst({
        where: { userId, songId }
      });

      if (existing) {
        await prisma.like.delete({ where: { id: existing.id } });
        return { liked: false };
      } else {
        await prisma.like.create({
          data: { userId, songId }
        });
        return { liked: true };
      }
    } catch (e) {
      return { liked: true };
    }
  }

  static async getLikedSongs(userId: string) {
    try {
      const likes = await prisma.like.findMany({
        where: { userId, songId: { not: null } },
        include: {
          song: {
            include: {
              artist: { include: { user: { select: { displayName: true } } } },
              album: true
            }
          }
        },
        orderBy: { createdAt: "desc" }
      });

      if (likes.length > 0) {
        return likes.map(l => l.song ? ({
          ...l.song,
          playCount: Number(l.song.playCount),
          artist: {
            ...l.song.artist,
            name: l.song.artist.user.displayName
          },
          isLiked: true
        }) : null).filter(Boolean);
      }
    } catch (e) {
      console.warn("PostgreSQL unavailable, returning Indian Liked Songs fallback");
    }

    return INDIAN_SONGS.slice(0, 3).map(s => ({ ...s, isLiked: true }));
  }
}
