import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Search, Library, Plus, Heart, Music, Disc } from 'lucide-react';

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-spotify-surface h-full flex flex-col p-3 gap-2 border-r border-spotify-border/40 select-none">
      {/* Brand Logo */}
      <div className="px-4 py-3 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-spotify-green flex items-center justify-center text-black font-bold shadow-lg shadow-spotify-green/20">
          <Music className="w-5 h-5 fill-current" />
        </div>
        <span className="font-extrabold text-xl tracking-tight text-white">Spotify</span>
      </div>

      {/* Primary Navigation */}
      <nav className="bg-spotify-surfacemuted/60 rounded-xl p-2 flex flex-col gap-1">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              isActive
                ? 'bg-spotify-card text-white'
                : 'text-spotify-textmuted hover:text-white hover:bg-spotify-card/50'
            }`
          }
        >
          <Home className="w-5 h-5" />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `flex items-center gap-4 px-4 py-3 rounded-lg text-sm font-semibold transition-all ${
              isActive
                ? 'bg-spotify-card text-white'
                : 'text-spotify-textmuted hover:text-white hover:bg-spotify-card/50'
            }`
          }
        >
          <Search className="w-5 h-5" />
          <span>Search</span>
        </NavLink>
      </nav>

      {/* Library Section */}
      <div className="bg-spotify-surfacemuted/60 rounded-xl p-3 flex-1 flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-2 mb-3">
          <NavLink
            to="/library"
            className="flex items-center gap-3 text-spotify-textmuted hover:text-white transition-colors"
          >
            <Library className="w-5 h-5" />
            <span className="font-semibold text-sm">Your Library</span>
          </NavLink>

          <button className="p-1.5 rounded-full text-spotify-textmuted hover:text-white hover:bg-spotify-card transition-colors">
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filter Badges */}
        <div className="flex gap-2 px-1 mb-3">
          <span className="px-3 py-1 bg-spotify-card hover:bg-spotify-cardhover rounded-full text-xs font-medium cursor-pointer transition-colors">
            Playlists
          </span>
          <span className="px-3 py-1 bg-spotify-card hover:bg-spotify-cardhover rounded-full text-xs font-medium cursor-pointer transition-colors">
            Artists
          </span>
          <span className="px-3 py-1 bg-spotify-card hover:bg-spotify-cardhover rounded-full text-xs font-medium cursor-pointer transition-colors">
            Albums
          </span>
        </div>

        {/* Playlists & Liked Songs Scroll List */}
        <div className="flex-1 overflow-y-auto space-y-1 pr-1">
          <NavLink
            to="/liked"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-spotify-card/60 group transition-all"
          >
            <div className="w-12 h-12 rounded-md bg-gradient-to-br from-indigo-600 to-emerald-500 flex items-center justify-center text-white shadow-md">
              <Heart className="w-5 h-5 fill-current" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Liked Songs</p>
              <p className="text-xs text-spotify-textmuted truncate">Playlist • 24 songs</p>
            </div>
          </NavLink>

          <NavLink
            to="/playlist/demo-1"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-spotify-card/60 group transition-all"
          >
            <div className="w-12 h-12 rounded-md bg-spotify-card flex items-center justify-center overflow-hidden">
              <Disc className="w-6 h-6 text-spotify-green animate-spin-slow" />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Late Night Focus</p>
              <p className="text-xs text-spotify-textmuted truncate">Playlist • Alex Rivera</p>
            </div>
          </NavLink>
        </div>
      </div>
    </aside>
  );
};
