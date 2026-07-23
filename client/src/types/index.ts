export interface User {
  id: string;
  email: string;
  fullName: string;
  displayName: string;
  avatarUrl?: string | null;
  role: string;
}

export interface Artist {
  id: string;
  userId: string;
  name: string;
  bio?: string | null;
  headerImageUrl?: string | null;
  verified: boolean;
  monthlyListeners: number;
}

export interface Genre {
  id: string;
  name: string;
  colorHex: string;
  iconUrl?: string | null;
}

export interface Album {
  id: string;
  title: string;
  coverArtUrl: string;
  releaseDate: string;
  artistId: string;
  artistName?: string;
  songCount?: number;
}

export interface SyncedLyricLine {
  timeMs: number;
  line: string;
}

export interface Lyrics {
  id: string;
  songId: string;
  syncedJson: SyncedLyricLine[];
  plainText: string;
}

export interface Song {
  id: string;
  title: string;
  durationSeconds: number;
  audioUrl: string;
  explicit: boolean;
  playCount: number;
  artistId: string;
  artist?: Artist;
  album?: Album;
  genres?: Genre[];
  lyrics?: Lyrics | null;
  isLiked?: boolean;
}

export interface Playlist {
  id: string;
  title: string;
  description?: string | null;
  coverArtUrl?: string | null;
  isPublic: boolean;
  ownerId: string;
  songs?: Song[];
  songCount?: number;
}
