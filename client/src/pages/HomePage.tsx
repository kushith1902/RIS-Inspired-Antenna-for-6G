import React, { useEffect, useState } from 'react';
import { SongCard } from '../components/ui/SongCard';
import { AlbumCard } from '../components/ui/AlbumCard';
import { Song, Album } from '../types';
import { api } from '../services/api';
import { Flame, Sparkles, Radio, Play } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { setSong } from '../store/playerStore';

export const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const [songs, setSongs] = useState<Song[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [songsRes, albumsRes] = await Promise.all([
          api.get('/music/songs'),
          api.get('/music/albums')
        ]);
        if (songsRes.data.success) setSongs(songsRes.data.data);
        if (albumsRes.data.success) setAlbums(albumsRes.data.data);
      } catch (err) {
        console.error('Failed to fetch home feed:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const featuredSong = songs[0];

  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner Card */}
      {featuredSong && (
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-purple-900 via-indigo-900 to-black p-8 md:p-12 shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <span className="px-3 py-1 bg-spotify-green/20 text-spotify-green rounded-full text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5" /> Featured Track
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {featuredSong.title}
            </h1>
            <p className="text-sm md:text-base text-gray-300 font-medium">
              By {featuredSong.artist?.name} • Experience ultra-fidelity audio streaming in lossless audio.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={() => dispatch(setSong({ song: featuredSong, queue: songs }))}
                className="px-8 py-3 bg-spotify-green hover:bg-spotify-lightgreen text-black rounded-full font-bold text-base flex items-center gap-2 shadow-lg shadow-spotify-green/20 hover:scale-105 transition-all"
              >
                <Play className="w-5 h-5 fill-current" /> Play Now
              </button>
            </div>
          </div>

          <img
            src={featuredSong.album?.coverArtUrl}
            alt={featuredSong.title}
            className="w-52 h-52 md:w-64 md:h-64 rounded-xl shadow-2xl object-cover transform hover:rotate-2 transition-transform duration-500"
          />
        </div>
      )}

      {/* Trending Tracks Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Flame className="w-6 h-6 text-orange-500" /> Trending Right Now
          </h2>
          <span className="text-xs font-bold uppercase tracking-wider text-spotify-textmuted hover:text-white cursor-pointer">
            Show All
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((n) => (
              <div key={n} className="h-64 bg-spotify-card/40 rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {songs.map((song) => (
              <SongCard key={song.id} song={song} queue={songs} />
            ))}
          </div>
        )}
      </section>

      {/* Top Albums Section */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
            <Radio className="w-6 h-6 text-spotify-green" /> Popular Albums
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {albums.map((album) => (
            <AlbumCard key={album.id} album={album} />
          ))}
        </div>
      </section>
    </div>
  );
};
