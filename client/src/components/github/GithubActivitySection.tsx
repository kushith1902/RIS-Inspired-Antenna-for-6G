import React from 'react';
import { Github, GitCommit, GitFork, Star, ExternalLink, Activity, Code } from 'lucide-react';
import { RECENT_COMMITS, PERSONAL_INFO } from '../../data/portfolioData';

export const GithubActivitySection: React.FC = () => {
  // Generate a simulated 52-week contribution graph (squares)
  const generateContributionMatrix = () => {
    const weeks = 40;
    const daysPerWeek = 7;
    const matrix = [];

    for (let w = 0; w < weeks; w++) {
      const week = [];
      for (let d = 0; d < daysPerWeek; d++) {
        // Higher activity density
        const intensity = Math.random() > 0.3 ? Math.floor(Math.random() * 4) + 1 : 0;
        week.push(intensity);
      }
      matrix.push(week);
    }
    return matrix;
  };

  const contributionMatrix = generateContributionMatrix();

  const getIntensityColor = (level: number) => {
    switch (level) {
      case 1: return 'bg-cyan-900/60 border-cyan-700/40';
      case 2: return 'bg-cyan-600/80 border-cyan-400/50';
      case 3: return 'bg-cyan-400 border-cyan-200';
      case 4: return 'bg-emerald-400 border-emerald-200 shadow-sm shadow-emerald-400';
      default: return 'bg-white/5 border-white/5';
    }
  };

  return (
    <section id="github" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <Github className="w-3.5 h-3.5 text-cyan-400" />
            <span>OPEN SOURCE & REPOSITORY METRICS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            GitHub Contribution Activity
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mt-2">
            Real-time code commits, low-level microcontroller drivers, MATLAB algorithms, and web applications.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mt-4" />
        </div>

        {/* Contribution Heatmap Card */}
        <div className="engineering-card rounded-3xl p-6 sm:p-8 mb-10 overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold font-display text-white flex items-center gap-2">
                <Activity className="w-5 h-5 text-cyan-400" />
                <span>1,248 Contributions in 2024–2025</span>
              </h3>
              <span className="text-xs font-mono text-slate-400">Handle: @kushith1902</span>
            </div>
            <a
              href={PERSONAL_INFO.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 text-cyan-300 hover:text-white border border-white/10 rounded-xl text-xs font-mono transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>Follow on GitHub</span>
            </a>
          </div>

          {/* Matrix Heatmap */}
          <div className="overflow-x-auto pb-2">
            <div className="flex gap-1.5 min-w-[700px]">
              {contributionMatrix.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1.5">
                  {week.map((level, dIdx) => (
                    <div
                      key={dIdx}
                      className={`w-3.5 h-3.5 rounded-sm border ${getIntensityColor(level)} transition-transform hover:scale-125`}
                      title={`Activity Level ${level}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 text-[11px] font-mono text-slate-400 mt-4">
            <span>Less</span>
            <div className="w-3 h-3 rounded-sm bg-white/5 border border-white/5" />
            <div className="w-3 h-3 rounded-sm bg-cyan-900/60" />
            <div className="w-3 h-3 rounded-sm bg-cyan-600/80" />
            <div className="w-3 h-3 rounded-sm bg-cyan-400" />
            <div className="w-3 h-3 rounded-sm bg-emerald-400" />
            <span>More</span>
          </div>

        </div>

        {/* Live Commits Feed */}
        <div className="bg-[#050816] border border-cyan-500/30 rounded-3xl p-6">
          <h3 className="text-base font-bold font-display text-white mb-4 flex items-center gap-2">
            <GitCommit className="w-4 h-4 text-cyan-400" />
            Recent Engineering Commits
          </h3>
          <div className="space-y-3 font-mono text-xs">
            {RECENT_COMMITS.map((c) => (
              <div key={c.id} className="p-3 bg-white/5 border border-white/10 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 bg-cyan-950 text-cyan-400 rounded border border-cyan-500/30 text-[10px]">
                    {c.hash}
                  </span>
                  <span className="text-slate-300 truncate max-w-md">{c.message}</span>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="text-cyan-400">{c.repo}</span>
                  <span>•</span>
                  <span>{c.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
