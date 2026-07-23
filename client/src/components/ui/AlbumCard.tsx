import React from 'react';
import { Album } from '../../types';
import { Disc } from 'lucide-react';

interface AlbumCardProps {
  album: Album;
}

export const AlbumCard: React.FC<AlbumCardProps> = ({ album }) => {
  return (
    <div className="bg-spotify-card/60 hover:bg-spotify-cardhover p-4 rounded-xl transition-all duration-300 group cursor-pointer border border-spotify-border/30 hover:border-spotify-border flex flex-col">
      <div className="relative aspect-square w-full rounded-lg overflow-hidden mb-3 shadow-lg">
        <img
          src={album.coverArtUrl}
          alt={album.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Disc className="w-10 h-10 text-spotify-green animate-spin-slow" />
        </div>
      </div>

      <h3 className="font-semibold text-sm text-white truncate mb-1 group-hover:text-spotify-green transition-colors">
        {album.title}
      </h3>
      <p className="text-xs text-spotify-textmuted truncate">{album.artistName || 'Album'}</p>
    </div>
  );
};
