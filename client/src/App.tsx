import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { TopNav } from './components/layout/TopNav';
import { RightQueue } from './components/layout/RightQueue';
import { MusicPlayerBar } from './components/player/MusicPlayerBar';
import { LyricsModal } from './components/player/LyricsModal';
import { HomePage } from './pages/HomePage';
import { SearchPage } from './pages/SearchPage';
import { LibraryPage } from './pages/LibraryPage';
import { PlaylistPage } from './pages/PlaylistPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="flex h-screen w-screen bg-spotify-darkbg text-white overflow-hidden">
        {/* Left Collapsible Sidebar */}
        <Sidebar />

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col h-full overflow-hidden bg-spotify-darkbg">
          <TopNav />
          <main className="flex-1 overflow-y-auto px-6 pt-6">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/library" element={<LibraryPage />} />
              <Route path="/liked" element={<LibraryPage />} />
              <Route path="/playlist/:id" element={<PlaylistPage />} />
            </Routes>
          </main>
          {/* Bottom Persistent Audio Player */}
          <MusicPlayerBar />
        </div>

        {/* Right Queue Drawer & Friend Activity */}
        <RightQueue />

        {/* Fullscreen Synced Lyrics Overlay */}
        <LyricsModal />
      </div>
    </BrowserRouter>
  );
};
