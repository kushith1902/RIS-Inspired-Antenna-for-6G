import React from 'react';
import { useDispatch } from 'react-redux';
import { setSong } from '../../store/playerStore';
import { Song } from '../../types';
import { Play } from 'lucide-react';

interface SongCardProps {
  song: Song;
  queue?: Song[];
}

export const SongCard: React.FC<SongCardProps> = ({ song, queue }) => {
  const dispatch = useDispatch();

  return (
    <div
      onClick={() => dispatch(setSong({ song, queue }))}
      className="bg-spotify-card/60 hover:bg-spotify-cardhover p-4 rounded-xl transition-all duration-300 group cursor-pointer border border-spotify-border/30 hover:border-spotify-border flex flex-col"
    >
      <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-3 shadow-lg">
        <img
          src={song.album?.coverArtUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80'}
          alt={song.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button className="w-12 h-12 rounded-full bg-spotify-green text-black flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
            <Play className="w-6 h-6 fill-current ml-0.5" />
          </button>
        </div>
      </div>

      <h3 className="font-semibold text-sm text-white truncate mb-1 group-hover:text-spotify-green transition-colors">
        {song.title}
      </h3>
      <p className="text-xs text-spotify-textmuted truncate">{song.artist?.name || 'Artist'}</p>
    </div>
  );
};
