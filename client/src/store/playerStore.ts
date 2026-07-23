import { createSlice, PayloadAction, configureStore } from '@reduxjs/toolkit';
import { Song } from '../types';

interface PlayerState {
  currentSong: Song | null;
  isPlaying: boolean;
  volume: number;
  isMuted: boolean;
  currentTime: number;
  duration: number;
  queue: Song[];
  queueIndex: number;
  isShuffle: boolean;
  repeatMode: 'off' | 'all' | 'one';
  showLyrics: boolean;
  showQueue: boolean;
}

const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
  volume: 0.8,
  isMuted: false,
  currentTime: 0,
  duration: 0,
  queue: [],
  queueIndex: -1,
  isShuffle: false,
  repeatMode: 'off',
  showLyrics: false,
  showQueue: false
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setSong: (state, action: PayloadAction<{ song: Song; queue?: Song[] }>) => {
      state.currentSong = action.payload.song;
      state.isPlaying = true;
      if (action.payload.queue && action.payload.queue.length > 0) {
        state.queue = action.payload.queue;
        state.queueIndex = action.payload.queue.findIndex(s => s.id === action.payload.song.id);
      } else if (!state.queue.some(s => s.id === action.payload.song.id)) {
        state.queue.push(action.payload.song);
        state.queueIndex = state.queue.length - 1;
      }
    },
    togglePlay: (state) => {
      if (state.currentSong) {
        state.isPlaying = !state.isPlaying;
      }
    },
    setIsPlaying: (state, action: PayloadAction<boolean>) => {
      state.isPlaying = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.volume = action.payload;
      state.isMuted = action.payload === 0;
    },
    toggleMute: (state) => {
      state.isMuted = !state.isMuted;
    },
    setProgress: (state, action: PayloadAction<{ currentTime: number; duration: number }>) => {
      state.currentTime = action.payload.currentTime;
      state.duration = action.payload.duration;
    },
    nextSong: (state) => {
      if (state.queue.length === 0) return;
      if (state.isShuffle) {
        const randomIndex = Math.floor(Math.random() * state.queue.length);
        state.queueIndex = randomIndex;
      } else {
        state.queueIndex = (state.queueIndex + 1) % state.queue.length;
      }
      state.currentSong = state.queue[state.queueIndex];
      state.isPlaying = true;
    },
    prevSong: (state) => {
      if (state.queue.length === 0) return;
      state.queueIndex = (state.queueIndex - 1 + state.queue.length) % state.queue.length;
      state.currentSong = state.queue[state.queueIndex];
      state.isPlaying = true;
    },
    toggleShuffle: (state) => {
      state.isShuffle = !state.isShuffle;
    },
    toggleRepeat: (state) => {
      const modes: ('off' | 'all' | 'one')[] = ['off', 'all', 'one'];
      const nextIdx = (modes.indexOf(state.repeatMode) + 1) % modes.length;
      state.repeatMode = modes[nextIdx];
    },
    toggleLyrics: (state) => {
      state.showLyrics = !state.showLyrics;
    },
    toggleQueueDrawer: (state) => {
      state.showQueue = !state.showQueue;
    }
  }
});

export const {
  setSong,
  togglePlay,
  setIsPlaying,
  setVolume,
  toggleMute,
  setProgress,
  nextSong,
  prevSong,
  toggleShuffle,
  toggleRepeat,
  toggleLyrics,
  toggleQueueDrawer
} = playerSlice.actions;

export const store = configureStore({
  reducer: {
    player: playerSlice.reducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
