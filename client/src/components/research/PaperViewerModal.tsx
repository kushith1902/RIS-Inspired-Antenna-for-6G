import React, { useState } from 'react';
import { X, FileText, Download, Copy, Check, ExternalLink, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';
import { ResearchPaper } from '../../types/portfolio';

interface PaperViewerModalProps {
  paper: ResearchPaper | null;
  onClose: () => void;
}

export const PaperViewerModal: React.FC<PaperViewerModalProps> = ({ paper, onClose }) => {
  const [copiedCitation, setCopiedCitation] = useState(false);

  if (!paper) return null;

  const handleCopyCitation = () => {
    navigator.clipboard.writeText(paper.citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl bg-[#0B1120] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#050816]/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-purple-950/80 text-purple-300 border border-purple-500/30">
              {paper.status}
            </span>
            <span className="text-xs font-mono text-cyan-400">{paper.conferenceOrJournal}</span>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          <div>
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{paper.researchArea}</span>
            <h2 className="text-2xl font-extrabold font-display text-white mt-1">{paper.title}</h2>
            <p className="text-sm font-mono text-slate-300 mt-2">
              Authors: <span className="text-cyan-300">{paper.authors.join(', ')}</span>
            </p>
          </div>

          {/* Abstract */}
          <div className="bg-[#050816] border border-white/10 rounded-2xl p-6">
            <h4 className="text-sm font-bold font-display text-white mb-2 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400" />
              Paper Abstract
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed font-sans">
              {paper.abstract}
            </p>
          </div>

          {/* Key Findings */}
          <div>
            <h4 className="text-base font-bold font-display text-white mb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Key Novel Contributions & Research Findings
            </h4>
            <div className="space-y-2">
              {paper.keyFindings.map((finding, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 leading-relaxed">{finding}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Citation Generator Box */}
          <div className="bg-cyan-950/30 border border-cyan-500/30 rounded-2xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono font-bold text-cyan-400 uppercase">IEEE Format Citation</span>
              <button
                onClick={handleCopyCitation}
                className="flex items-center gap-1 text-xs font-mono text-cyan-300 hover:text-white bg-cyan-900/40 px-3 py-1 rounded-lg border border-cyan-500/30"
              >
                {copiedCitation ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedCitation ? 'Copied to Clipboard' : 'Copy Citation'}</span>
              </button>
            </div>
            <p className="font-mono text-xs text-slate-300 bg-[#050816] p-3 rounded-xl border border-white/10">
              {paper.citation}
            </p>
          </div>

          {/* Embedded PDF Viewer Placeholder / Direct PDF Link */}
          <div className="h-64 rounded-2xl bg-[#02040A] border border-cyan-500/30 flex flex-col items-center justify-center text-center p-6">
            <FileText className="w-12 h-12 text-cyan-400 animate-pulse mb-3" />
            <h4 className="text-base font-bold text-white font-display">PDF Manuscript Document</h4>
            <p className="text-xs text-slate-400 max-w-sm mt-1 mb-4">
              Full IEEE camera-ready PDF document with high-resolution MATLAB signal plots.
            </p>
            <a
              href={paper.pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-blue-500/30 transition-all"
            >
              <Download className="w-4 h-4" />
              <span>Download Manuscript PDF</span>
            </a>
          </div>

        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10 bg-[#050816]/90 backdrop-blur-md flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">IEEE / Springer Conference Series</span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white font-medium text-xs rounded-xl transition-all"
          >
            Close Viewer
          </button>
        </div>

      </div>
    </div>
  );
};
