import React, { useState } from 'react';
import { Shield, X, Plus, Trash2, Edit3, Eye, Download, FileText, CheckCircle2, Lock, Sparkles } from 'lucide-react';
import { PROJECTS, RESEARCH_PAPERS } from '../../data/portfolioData';

interface AdminDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminDashboardModal: React.FC<AdminDashboardModalProps> = ({ isOpen, onClose }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState<'analytics' | 'projects' | 'research'>('analytics');

  if (!isOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'admin123' || passcode === 'admin') {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0B1120] border border-cyan-500/40 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#050816]/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <Shield className="w-5 h-5 text-cyan-400" />
            <h3 className="text-lg font-bold font-display text-white">
              Engineering Admin Management Panel
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        {!isAuthenticated ? (
          <div className="p-8 flex flex-col items-center justify-center text-center space-y-4 my-auto">
            <div className="w-16 h-16 rounded-full bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="text-xl font-bold font-display text-white">Admin Authentication</h4>
            <p className="text-xs text-slate-400 max-w-sm">
              Enter admin passcode to access site metrics, upload research papers, and manage projects.
            </p>

            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-3 pt-2">
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter passcode (admin123)..."
                className="w-full bg-[#050816] border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 font-mono text-center"
              />
              {error && <span className="text-xs text-rose-400 font-mono block">Incorrect passcode. Try 'admin123'.</span>}
              <button
                type="submit"
                className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs font-mono rounded-xl transition-all shadow-lg shadow-blue-500/25"
              >
                Authenticate Session
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
            
            {/* Admin Tabs */}
            <div className="flex items-center gap-2 border-b border-white/10 pb-4">
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-colors ${
                  activeTab === 'analytics' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                System Analytics
              </button>
              <button
                onClick={() => setActiveTab('projects')}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-colors ${
                  activeTab === 'projects' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Manage Projects ({PROJECTS.length})
              </button>
              <button
                onClick={() => setActiveTab('research')}
                className={`px-4 py-2 rounded-xl text-xs font-mono transition-colors ${
                  activeTab === 'research' ? 'bg-cyan-950 text-cyan-300 border border-cyan-500/30' : 'text-slate-400 hover:text-white'
                }`}
              >
                Manage Papers ({RESEARCH_PAPERS.length})
              </button>
            </div>

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono">
                  <div className="bg-[#050816] p-4 rounded-2xl border border-cyan-500/20 text-center">
                    <span className="text-[10px] text-slate-400 uppercase">Total Portfolio Views</span>
                    <p className="text-2xl font-bold text-cyan-400 mt-1">4,892</p>
                  </div>
                  <div className="bg-[#050816] p-4 rounded-2xl border border-cyan-500/20 text-center">
                    <span className="text-[10px] text-slate-400 uppercase">Resume Downloads</span>
                    <p className="text-2xl font-bold text-emerald-400 mt-1">612</p>
                  </div>
                  <div className="bg-[#050816] p-4 rounded-2xl border border-cyan-500/20 text-center">
                    <span className="text-[10px] text-slate-400 uppercase">Case Study Clicks</span>
                    <p className="text-2xl font-bold text-purple-400 mt-1">1,420</p>
                  </div>
                  <div className="bg-[#050816] p-4 rounded-2xl border border-cyan-500/20 text-center">
                    <span className="text-[10px] text-slate-400 uppercase">Paper Citations</span>
                    <p className="text-2xl font-bold text-blue-400 mt-1">42</p>
                  </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                  <h4 className="text-sm font-bold font-display text-white mb-2">Recruiter Traffic Heatmap</h4>
                  <p className="text-xs text-slate-300">Top visiting locations: Bangalore, San Jose, Cambridge, Munich, Singapore.</p>
                </div>
              </div>
            )}

            {/* Projects Management Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white font-display">Active Flagship Projects</h4>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white font-mono text-xs rounded-lg">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Project</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {PROJECTS.map((p) => (
                    <div key={p.id} className="p-3 bg-[#050816] border border-white/10 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">{p.title}</span>
                        <span className="text-[10px] font-mono text-cyan-400">{p.category}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-cyan-400 bg-white/5 rounded"><Edit3 className="w-3.5 h-3.5" /></button>
                        <button className="p-1.5 text-slate-400 hover:text-rose-400 bg-white/5 rounded"><Trash2 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Research Papers Tab */}
            {activeTab === 'research' && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-bold text-white font-display">IEEE & Springer Manuscripts</h4>
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white font-mono text-xs rounded-lg">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload New Paper</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {RESEARCH_PAPERS.map((rp) => (
                    <div key={rp.id} className="p-3 bg-[#050816] border border-white/10 rounded-xl flex items-center justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">{rp.title}</span>
                        <span className="text-[10px] font-mono text-purple-400">{rp.conferenceOrJournal}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-cyan-400 bg-white/5 rounded"><Edit3 className="w-3.5 h-3.5" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        )}

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-[#050816]/90 backdrop-blur-md flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">Authenticated Session</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl transition-all"
          >
            Exit Panel
          </button>
        </div>

      </div>
    </div>
  );
};
