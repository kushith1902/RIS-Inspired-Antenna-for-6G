import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/playerStore';
import {
  togglePlay,
  setIsPlaying,
  setProgress,
  nextSong,
  prevSong,
  setVolume,
  toggleMute,
  toggleShuffle,
  toggleRepeat,
  toggleLyrics,
  toggleQueueDrawer
} from '../../store/playerStore';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat,
  Volume2,
  VolumeX,
  FileText,
  ListMusic,
  Heart,
  Maximize2
} from 'lucide-react';

export const MusicPlayerBar: React.FC = () => {
  const dispatch = useDispatch();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const {
    currentSong,
    isPlaying,
    volume,
    isMuted,
    currentTime,
    duration,
    isShuffle,
    repeatMode,
    showLyrics,
    showQueue
  } = useSelector((state: RootState) => state.player);

  // Sync Audio Playback State
  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => dispatch(setIsPlaying(false)));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSong]);

  // Sync Volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      dispatch(
        setProgress({
          currentTime: audioRef.current.currentTime,
          duration: audioRef.current.duration || 0
        })
      );
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const mins = Math.floor(secs / 60);
    const remainderSecs = Math.floor(secs % 60);
    return `${mins}:${remainderSecs < 10 ? '0' : ''}${remainderSecs}`;
  };

  if (!currentSong) return null;

  return (
    <footer className="h-24 bg-spotify-surface/95 backdrop-blur-xl border-t border-spotify-border/40 px-4 sm:px-6 flex items-center justify-between z-40 relative">
      <audio
        ref={audioRef}
        src={currentSong.audioUrl}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => dispatch(nextSong())}
      />

      {/* 1. Track Cover & Meta */}
      <div className="flex items-center gap-3 w-1/4 min-w-[200px]">
        <img
          src={currentSong.album?.coverArtUrl || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=300&q=80'}
          alt={currentSong.title}
          className="w-14 h-14 rounded-md object-cover shadow-md"
        />
        <div className="overflow-hidden">
          <p className="text-sm font-semibold text-white truncate hover:underline cursor-pointer">
            {currentSong.title}
          </p>
          <p className="text-xs text-spotify-textmuted truncate hover:underline cursor-pointer">
            {currentSong.artist?.name || 'Artist'}
          </p>
        </div>
        <button className="text-spotify-textmuted hover:text-spotify-green transition-colors ml-2">
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* 2. Main Controls & Progress Bar */}
      <div className="flex flex-col items-center gap-1.5 flex-1 max-w-xl px-4">
        <div className="flex items-center gap-5">
          <button
            onClick={() => dispatch(toggleShuffle())}
            className={`p-1 transition-colors ${
              isShuffle ? 'text-spotify-green' : 'text-spotify-textmuted hover:text-white'
            }`}
          >
            <Shuffle className="w-4 h-4" />
          </button>

          <button
            onClick={() => dispatch(prevSong())}
            className="text-spotify-textmuted hover:text-white transition-colors"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>

          <button
            onClick={() => dispatch(togglePlay())}
            className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition-transform shadow-md"
          >
            {isPlaying ? (
              <Pause className="w-5 h-5 fill-current" />
            ) : (
              <Play className="w-5 h-5 fill-current ml-0.5" />
            )}
          </button>

          <button
            onClick={() => dispatch(nextSong())}
            className="text-spotify-textmuted hover:text-white transition-colors"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>

          <button
            onClick={() => dispatch(toggleRepeat())}
            className={`p-1 transition-colors ${
              repeatMode !== 'off' ? 'text-spotify-green' : 'text-spotify-textmuted hover:text-white'
            }`}
          >
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        {/* Seekbar */}
        <div className="w-full flex items-center gap-2 text-xs text-spotify-textmuted font-medium">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            min={0}
            max={duration || 100}
            value={currentTime}
            onChange={handleSeek}
            className="flex-1 h-1 bg-spotify-border/60 rounded-lg appearance-none cursor-pointer accent-spotify-green hover:accent-spotify-lightgreen"
          />
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* 3. Utility Controls (Lyrics, Queue, Volume) */}
      <div className="flex items-center justify-end gap-3 w-1/4 min-w-[200px]">
        <button
          onClick={() => dispatch(toggleLyrics())}
          className={`p-1.5 rounded transition-colors ${
            showLyrics ? 'text-spotify-green bg-spotify-card' : 'text-spotify-textmuted hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
        </button>

        <button
          onClick={() => dispatch(toggleQueueDrawer())}
          className={`p-1.5 rounded transition-colors ${
            showQueue ? 'text-spotify-green bg-spotify-card' : 'text-spotify-textmuted hover:text-white'
          }`}
        >
          <ListMusic className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 w-28">
          <button onClick={() => dispatch(toggleMute())} className="text-spotify-textmuted hover:text-white">
            {isMuted || volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={isMuted ? 0 : volume}
            onChange={(e) => dispatch(setVolume(parseFloat(e.target.value)))}
            className="w-full h-1 bg-spotify-border/60 rounded-lg appearance-none cursor-pointer accent-spotify-green"
          />
        </div>
      </div>
    </footer>
  );
};
