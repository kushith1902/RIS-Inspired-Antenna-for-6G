import React, { useState } from 'react';
import { BookOpen, FileText, ArrowRight, Award, ExternalLink, Sparkles } from 'lucide-react';
import { RESEARCH_PAPERS } from '../../data/portfolioData';
import { ResearchPaper } from '../../types/portfolio';
import { PaperViewerModal } from './PaperViewerModal';

export const ResearchSection: React.FC = () => {
  const [selectedPaper, setSelectedPaper] = useState<ResearchPaper | null>(null);

  return (
    <section id="research" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-mono mb-3">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>RESEARCH WORKS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            My Research Works
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mt-2">
            Research projects in optical wireless communications (RSMA VLC) and dense wavelength division multiplexing (4-Channel WDM fiber optics).
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-purple-400 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* Papers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {RESEARCH_PAPERS.map((paper) => (
            <div
              key={paper.id}
              className="engineering-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

              <div>
                <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="px-3 py-1 bg-purple-950/80 text-purple-300 border border-purple-500/30 rounded-full text-xs font-mono">
                    {paper.status}
                  </span>
                  <span className="text-xs font-mono text-cyan-400">
                    {paper.year}
                  </span>
                </div>

                <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-1">
                  {paper.researchArea}
                </span>

                <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-400 transition-colors mb-3 leading-snug">
                  {paper.title}
                </h3>

                <p className="text-xs font-mono text-cyan-300 mb-4">
                  Venue: {paper.conferenceOrJournal}
                </p>

                <p className="text-slate-300 text-xs leading-relaxed line-clamp-4 mb-6">
                  {paper.abstract}
                </p>
              </div>

              {/* Action Controls */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={() => setSelectedPaper(paper)}
                  className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/btn"
                >
                  <span>Read Full Abstract & Citation</span>
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={() => setSelectedPaper(paper)}
                  className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                  title="PDF Viewer"
                >
                  <FileText className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Paper Viewer Modal */}
        <PaperViewerModal
          paper={selectedPaper}
          onClose={() => setSelectedPaper(null)}
        />

      </div>
    </section>
  );
};
