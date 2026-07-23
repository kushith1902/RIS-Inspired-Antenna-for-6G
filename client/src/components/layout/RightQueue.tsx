import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/playerStore';
import { toggleQueueDrawer, setSong } from '../../store/playerStore';
import { X, Play, Music, Users } from 'lucide-react';

export const RightQueue: React.FC = () => {
  const dispatch = useDispatch();
  const { showQueue, queue, queueIndex, currentSong } = useSelector((state: RootState) => state.player);

  if (!showQueue) return null;

  return (
    <aside className="w-80 bg-spotify-surface h-full flex flex-col border-l border-spotify-border/40 p-4 z-20">
      <div className="flex items-center justify-between pb-4 border-b border-spotify-border/40">
        <h3 className="font-bold text-lg text-white flex items-center gap-2">
          <Music className="w-5 h-5 text-spotify-green" />
          Queue & Playing
        </h3>
        <button
          onClick={() => dispatch(toggleQueueDrawer())}
          className="p-1 rounded-full text-spotify-textmuted hover:text-white hover:bg-spotify-card transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Currently Playing Card */}
      {currentSong && (
        <div className="my-4 p-3 bg-spotify-card/80 rounded-xl border border-spotify-border/60 flex items-center gap-3">
          <img
            src={currentSong.album?.coverArtUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80'}
            alt={currentSong.title}
            className="w-14 h-14 rounded-md object-cover"
          />
          <div className="flex-1 overflow-hidden">
            <span className="text-xs font-semibold text-spotify-green uppercase tracking-wider">Now Playing</span>
            <p className="font-semibold text-sm text-white truncate">{currentSong.title}</p>
            <p className="text-xs text-spotify-textmuted truncate">{currentSong.artist?.name || 'Artist'}</p>
          </div>
        </div>
      )}

      {/* Next Up Queue List */}
      <div className="flex-1 overflow-y-auto space-y-2 pr-1">
        <h4 className="text-xs font-bold uppercase tracking-wider text-spotify-textmuted mb-2">Next in Queue</h4>

        {queue.length === 0 ? (
          <p className="text-xs text-spotify-textmuted italic">Queue is empty</p>
        ) : (
          queue.map((song, idx) => (
            <div
              key={`${song.id}-${idx}`}
              onClick={() => dispatch(setSong({ song, queue }))}
              className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors group ${
                idx === queueIndex ? 'bg-spotify-card border border-spotify-green/40' : 'hover:bg-spotify-card/50'
              }`}
            >
              <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0">
                <img src={song.album?.coverArtUrl} alt={song.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Play className="w-4 h-4 fill-white text-white" />
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <p className={`text-xs font-semibold truncate ${idx === queueIndex ? 'text-spotify-green' : 'text-white'}`}>
                  {song.title}
                </p>
                <p className="text-[11px] text-spotify-textmuted truncate">{song.artist?.name}</p>
              </div>
            </div>
          ))
        )}

        {/* Friend Activity Section */}
        <div className="pt-6 border-t border-spotify-border/40 mt-6">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-spotify-textmuted flex items-center gap-1.5">
              <Users className="w-4 h-4" /> Friend Activity
            </h4>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&q=80"
                  alt="Friend"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-spotify-green ring-2 ring-spotify-surface" />
              </div>
              <div className="overflow-hidden text-xs">
                <p className="font-semibold text-white truncate">Elena R.</p>
                <p className="text-spotify-textmuted truncate">Cyberpunk City Nights</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
