import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Search, User, Bell, ShieldCheck } from 'lucide-react';

export const TopNav: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="h-16 px-6 bg-spotify-surface/80 backdrop-blur-md flex items-center justify-between gap-4 border-b border-spotify-border/30 z-30 sticky top-0">
      {/* History Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => navigate(-1)}
          className="w-8 h-8 rounded-full bg-spotify-darkbg/80 flex items-center justify-center text-spotify-textmuted hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => navigate(1)}
          className="w-8 h-8 rounded-full bg-spotify-darkbg/80 flex items-center justify-center text-spotify-textmuted hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Live Search Input (Visible on /search route) */}
      {location.pathname.startsWith('/search') && (
        <form onSubmit={handleSearch} className="flex-1 max-w-md relative">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-spotify-textmuted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="What do you want to play?"
            className="w-full pl-11 pr-4 py-2 bg-spotify-card border border-spotify-border/50 rounded-full text-sm text-white placeholder-spotify-textmuted focus:outline-none focus:border-spotify-green transition-all"
          />
        </form>
      )}

      {/* Profile & Notifications */}
      <div className="flex items-center gap-3">
        <button className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-spotify-card hover:bg-spotify-cardhover rounded-full text-xs font-semibold text-spotify-green border border-spotify-green/30">
          <ShieldCheck className="w-4 h-4" />
          <span>Explore Premium</span>
        </button>

        <button className="w-9 h-9 rounded-full bg-spotify-card flex items-center justify-center text-spotify-textmuted hover:text-white transition-colors">
          <Bell className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 pl-2 cursor-pointer group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 p-0.5 shadow-md">
            <img
              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80"
              alt="Avatar"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <span className="text-sm font-semibold text-white group-hover:text-spotify-green transition-colors">
            Alex Rivera
          </span>
        </div>
      </div>
    </header>
  );
};
