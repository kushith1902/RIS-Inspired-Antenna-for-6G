export declare enum UserRole {
    FREE_USER = "FREE_USER",
    PREMIUM_USER = "PREMIUM_USER",
    ARTIST = "ARTIST",
    MODERATOR = "MODERATOR",
    ADMIN = "ADMIN",
    SUPER_ADMIN = "SUPER_ADMIN"
}
export declare enum SubscriptionTier {
    FREE = "FREE",
    INDIVIDUAL_MONTHLY = "INDIVIDUAL_MONTHLY",
    INDIVIDUAL_YEARLY = "INDIVIDUAL_YEARLY",
    FAMILY = "FAMILY"
}
export declare enum SubscriptionStatus {
    INACTIVE = "INACTIVE",
    ACTIVE = "ACTIVE",
    PAST_DUE = "PAST_DUE",
    CANCELED = "CANCELED"
}
export interface User {
    id: string;
    email: string;
    fullName: string;
    displayName: string;
    avatarUrl?: string | null;
    role: UserRole;
    emailVerified: boolean;
    createdAt: string;
    updatedAt: string;
}
export interface Artist {
    id: string;
    userId: string;
    bio?: string | null;
    headerImageUrl?: string | null;
    verified: boolean;
    monthlyListeners: number;
    createdAt: string;
    updatedAt: string;
    user?: User;
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
    createdAt: string;
    updatedAt: string;
    artist?: Artist;
    songs?: Song[];
}
export interface Song {
    id: string;
    title: string;
    durationSeconds: number;
    audioUrl: string;
    hlsPlaylistUrl?: string | null;
    explicit: boolean;
    playCount: number;
    artistId: string;
    albumId?: string | null;
    createdAt: string;
    updatedAt: string;
    artist?: Artist;
    album?: Album;
    genres?: Genre[];
    isLiked?: boolean;
}
export interface Playlist {
    id: string;
    title: string;
    description?: string | null;
    coverArtUrl?: string | null;
    isPublic: boolean;
    isCollaborative: boolean;
    ownerId: string;
    createdAt: string;
    updatedAt: string;
    owner?: User;
    songs?: Song[];
    songCount?: number;
    isLiked?: boolean;
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
export interface PlayerState {
    currentSong: Song | null;
    isPlaying: boolean;
    volume: number;
    isMuted: boolean;
    currentTime: number;
    duration: number;
    queue: Song[];
    queueIndex: number;
    isShuffle: boolean;
    repeatMode: "off" | "all" | "one";
}
export interface AuthTokens {
    accessToken: string;
    refreshToken?: string;
}
export interface AuthResponse {
    user: User;
    tokens: AuthTokens;
}
export interface ApiResponse<T = any> {
    success: boolean;
    data?: T;
    error?: {
        code: string;
        message: string;
        details?: any;
    };
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}
