import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../services/api';
import { Song } from '../types';
import { useDispatch } from 'react-redux';
import { setSong } from '../store/playerStore';
import { Play, Clock, Heart, MoreHorizontal, Music } from 'lucide-react';

export const PlaylistPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      try {
        const res = await api.get('/music/songs');
        if (res.data.success) setSongs(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPlaylistSongs();
  }, [id]);

  const formatDuration = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainder = Math.floor(secs % 60);
    return `${mins}:${remainder < 10 ? '0' : ''}${remainder}`;
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row items-end gap-6 bg-gradient-to-b from-emerald-900/80 to-spotify-darkbg p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80"
          alt="Playlist Cover"
          className="w-48 h-48 md:w-56 md:h-56 rounded-xl shadow-2xl object-cover"
        />
        <div className="space-y-3">
          <span className="text-xs font-bold uppercase tracking-widest text-spotify-green">Public Playlist</span>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight">Late Night Focus</h1>
          <p className="text-sm text-spotify-textmuted font-medium">
            Created by Alex Rivera • {songs.length} songs, about 25 min
          </p>
        </div>
      </div>

      {/* Control Action Row */}
      <div className="flex items-center gap-6 px-2">
        {songs.length > 0 && (
          <button
            onClick={() => dispatch(setSong({ song: songs[0], queue: songs }))}
            className="w-14 h-14 rounded-full bg-spotify-green hover:scale-105 text-black flex items-center justify-center shadow-xl shadow-spotify-green/30 transition-transform"
          >
            <Play className="w-7 h-7 fill-current ml-1" />
          </button>
        )}

        <button className="text-spotify-textmuted hover:text-spotify-green transition-colors">
          <Heart className="w-8 h-8" />
        </button>

        <button className="text-spotify-textmuted hover:text-white transition-colors">
          <MoreHorizontal className="w-7 h-7" />
        </button>
      </div>

      {/* Song Tracklist Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-spotify-textmuted border-collapse">
          <thead>
            <tr className="border-b border-spotify-border/40 text-xs font-bold uppercase tracking-wider text-spotify-textmuted">
              <th className="py-3 px-4 w-12 text-center">#</th>
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4 hidden md:table-cell">Album</th>
              <th className="py-3 px-4 hidden sm:table-cell text-right">Plays</th>
              <th className="py-3 px-4 w-16 text-center">
                <Clock className="w-4 h-4 mx-auto" />
              </th>
            </tr>
          </thead>
          <tbody>
            {songs.map((song, idx) => (
              <tr
                key={song.id}
                onClick={() => dispatch(setSong({ song, queue: songs }))}
                className="hover:bg-spotify-card/60 group cursor-pointer transition-colors border-b border-spotify-border/20"
              >
                <td className="py-3 px-4 text-center font-semibold group-hover:text-spotify-green">
                  {idx + 1}
                </td>
                <td className="py-3 px-4 flex items-center gap-3">
                  <img
                    src={song.album?.coverArtUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100&q=80'}
                    alt={song.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="overflow-hidden">
                    <p className="font-semibold text-white truncate group-hover:text-spotify-green transition-colors">
                      {song.title}
                    </p>
                    <p className="text-xs text-spotify-textmuted truncate">{song.artist?.name}</p>
                  </div>
                </td>
                <td className="py-3 px-4 hidden md:table-cell truncate text-spotify-textmuted">
                  {song.album?.title || 'Single'}
                </td>
                <td className="py-3 px-4 hidden sm:table-cell text-right text-xs font-mono">
                  {song.playCount.toLocaleString()}
                </td>
                <td className="py-3 px-4 text-center text-xs font-mono">
                  {formatDuration(song.durationSeconds)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
