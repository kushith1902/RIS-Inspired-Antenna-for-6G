import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/playerStore';
import { toggleLyrics } from '../../store/playerStore';
import { X, Music } from 'lucide-react';

export const LyricsModal: React.FC = () => {
  const dispatch = useDispatch();
  const { showLyrics, currentSong, currentTime } = useSelector((state: RootState) => state.player);

  if (!showLyrics || !currentSong) return null;

  const lyrics = currentSong.lyrics;
  const currentTimeMs = currentTime * 1000;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl z-50 flex flex-col p-8 overflow-hidden animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Music className="w-6 h-6 text-spotify-green" />
          <span className="font-bold text-lg text-white">Lyrics View</span>
        </div>
        <button
          onClick={() => dispatch(toggleLyrics())}
          className="p-2 rounded-full bg-spotify-card hover:bg-spotify-cardhover text-white transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="flex-1 flex flex-col md:flex-row gap-12 items-center justify-center max-w-6xl mx-auto w-full">
        {/* Album Artwork & Details */}
        <div className="flex flex-col items-center text-center gap-4 max-w-xs">
          <img
            src={currentSong.album?.coverArtUrl}
            alt={currentSong.title}
            className="w-64 h-64 rounded-xl shadow-2xl object-cover"
          />
          <h2 className="text-2xl font-bold text-white tracking-tight">{currentSong.title}</h2>
          <p className="text-base text-spotify-textmuted font-medium">{currentSong.artist?.name}</p>
        </div>

        {/* Synced Lyric Lines */}
        <div className="flex-1 h-[450px] overflow-y-auto space-y-6 text-center md:text-left px-4">
          {lyrics && lyrics.syncedJson && lyrics.syncedJson.length > 0 ? (
            lyrics.syncedJson.map((line, idx) => {
              const isActive =
                currentTimeMs >= line.timeMs &&
                (idx === lyrics.syncedJson.length - 1 || currentTimeMs < lyrics.syncedJson[idx + 1].timeMs);

              return (
                <p
                  key={idx}
                  className={`text-2xl md:text-3xl font-bold transition-all duration-300 ${
                    isActive
                      ? 'text-spotify-green scale-105 opacity-100'
                      : 'text-white/40 hover:text-white/70 opacity-60'
                  }`}
                >
                  {line.line}
                </p>
              );
            })
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="text-xl text-spotify-textmuted font-medium italic">
                {lyrics?.plainText || 'Instrumental or lyrics unavailable for this track.'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
