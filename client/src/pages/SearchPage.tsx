import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../services/api';
import { Song, Genre } from '../types';
import { SongCard } from '../components/ui/SongCard';
import { Search as SearchIcon, Compass } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [songs, setSongs] = useState<Song[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await api.get('/music/genres');
        if (res.data.success) setGenres(res.data.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchGenres();
  }, []);

  useEffect(() => {
    if (!query) {
      setSongs([]);
      return;
    }
    const searchSongs = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/music/songs?search=${encodeURIComponent(query)}`);
        if (res.data.success) setSongs(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    searchSongs();
  }, [query]);

  return (
    <div className="space-y-8 pb-12">
      {query ? (
        <section className="space-y-4">
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <SearchIcon className="w-8 h-8 text-spotify-green" /> Search Results for "{query}"
          </h1>

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {[1, 2, 3, 4].map((n) => (
                <div key={n} className="h-64 bg-spotify-card/40 rounded-xl animate-pulse" />
              ))}
            </div>
          ) : songs.length === 0 ? (
            <div className="py-16 text-center text-spotify-textmuted space-y-2">
              <p className="text-lg font-semibold">No songs or artists found matching "{query}"</p>
              <p className="text-sm">Please check spelling or try different keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {songs.map((song) => (
                <SongCard key={song.id} song={song} queue={songs} />
              ))}
            </div>
          )}
        </section>
      ) : (
        <section className="space-y-6">
          <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Compass className="w-8 h-8 text-spotify-green" /> Browse All Genres
          </h1>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {genres.map((genre) => (
              <div
                key={genre.id}
                style={{ backgroundColor: genre.colorHex }}
                className="h-44 rounded-2xl p-5 relative overflow-hidden cursor-pointer shadow-xl hover:scale-[1.03] transition-transform group"
              >
                <h3 className="font-extrabold text-2xl text-white tracking-tight leading-tight">
                  {genre.name}
                </h3>
                <img
                  src={genre.iconUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&q=80'}
                  alt={genre.name}
                  className="w-28 h-28 absolute -bottom-2 -right-2 rotate-12 shadow-2xl rounded-lg object-cover group-hover:scale-110 transition-transform"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
