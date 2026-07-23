import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { Song, Playlist } from '../types';
import { SongCard } from '../components/ui/SongCard';
import { Heart, ListMusic } from 'lucide-react';
import { Link } from 'react-router-dom';

export const LibraryPage: React.FC = () => {
  const [likedSongs, setLikedSongs] = useState<Song[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    const fetchLibrary = async () => {
      try {
        const [likedRes, playlistsRes] = await Promise.all([
          api.get('/user/likes'),
          api.get('/user/playlists')
        ]);
        if (likedRes.data.success) setLikedSongs(likedRes.data.data);
        if (playlistsRes.data.success) setPlaylists(playlistsRes.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchLibrary();
  }, []);

  return (
    <div className="space-y-8 pb-12">
      <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
        <ListMusic className="w-8 h-8 text-spotify-green" /> Your Music Library
      </h1>

      {/* Liked Songs Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link
          to="/liked"
          className="bg-gradient-to-br from-indigo-700 via-purple-700 to-emerald-700 p-6 rounded-2xl flex flex-col justify-between h-56 shadow-xl hover:scale-[1.02] transition-transform group cursor-pointer"
        >
          <div className="flex justify-end">
            <Heart className="w-10 h-10 fill-white text-white opacity-80 group-hover:scale-110 transition-transform" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Liked Songs</h2>
            <p className="text-sm font-semibold text-white/80 mt-1">{likedSongs.length} liked tracks</p>
          </div>
        </Link>

        {playlists.map((pl) => (
          <Link
            key={pl.id}
            to={`/playlist/${pl.id}`}
            className="bg-spotify-card/80 hover:bg-spotify-cardhover p-6 rounded-2xl flex flex-col justify-between h-56 border border-spotify-border/40 hover:border-spotify-border transition-all group cursor-pointer shadow-xl"
          >
            <img
              src={pl.coverArtUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&q=80'}
              alt={pl.title}
              className="w-16 h-16 rounded-xl object-cover shadow-lg"
            />
            <div>
              <h3 className="text-xl font-bold text-white truncate group-hover:text-spotify-green transition-colors">
                {pl.title}
              </h3>
              <p className="text-xs text-spotify-textmuted truncate mt-1">
                Playlist • {pl.songCount || 0} songs
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Liked Tracks Feed */}
      {likedSongs.length > 0 && (
        <section className="space-y-4 pt-4">
          <h2 className="text-xl font-bold text-white">Favorite Songs</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {likedSongs.map((song) => (
              <SongCard key={song.id} song={song} queue={likedSongs} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
