import React, { useState } from 'react';
import { X, ExternalLink, Github, FileText, Cpu, CheckCircle2, Layers, Activity, Code, Copy, Check, Terminal, Sparkles } from 'lucide-react';
import { Project } from '../../types/portfolio';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenResearchPaper?: (paperId: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose, onOpenResearchPaper }) => {
  const [copiedCode, setCopiedCode] = useState(false);

  if (!project) return null;

  const handleCopyCode = () => {
    if (project.codeSnippet) {
      navigator.clipboard.writeText(project.codeSnippet.code);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#0B1120] border border-cyan-500/30 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-[#050816]/90 backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
              {project.category}
            </span>
            <h3 className="text-xl font-bold font-display text-white truncate max-w-md">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
          
          {/* Main Hero Image Banner */}
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-white/10 group">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">Engineering Case Study</span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display mt-1">{project.title}</h2>
                <p className="text-sm text-slate-300 mt-1 max-w-xl">{project.subtitle}</p>
              </div>

              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs rounded-xl border border-white/10 transition-colors"
                  >
                    <Github className="w-4 h-4 text-cyan-400" />
                    <span>GitHub Repo</span>
                  </a>
                )}
                {project.liveDemoUrl && (
                  <a
                    href={project.liveDemoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-blue-500/30 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Live App</span>
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Key Engineering Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.metrics.map((m, idx) => (
              <div key={idx} className="bg-[#050816] border border-cyan-500/20 rounded-xl p-4 text-center">
                <span className="text-[11px] font-mono text-slate-400 uppercase">{m.label}</span>
                <p className="text-xl font-bold font-display text-cyan-400 mt-1">{m.value}</p>
              </div>
            ))}
          </div>

          {/* Problem Statement */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h4 className="text-base font-bold font-display text-white mb-2 flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              Problem Statement & Engineering Challenge
            </h4>
            <p className="text-sm text-slate-300 leading-relaxed">
              {project.problemStatement}
            </p>
          </div>

          {/* System Architecture & Workflow Steps */}
          <div>
            <h4 className="text-lg font-bold font-display text-white mb-4 flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              System Architecture & Telemetry Workflow
            </h4>
            <div className="space-y-3">
              {project.workflow.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-[#050816] border border-white/10 rounded-xl">
                  <div className="w-7 h-7 rounded-lg bg-cyan-950 border border-cyan-500/30 text-cyan-400 font-mono text-xs flex items-center justify-center font-bold shrink-0">
                    0{idx + 1}
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed pt-0.5">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div>
            <h4 className="text-lg font-bold font-display text-white mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Key System Capabilities
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {project.features.map((feat, idx) => (
                <div key={idx} className="p-4 bg-white/5 border border-white/10 rounded-xl flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-xs text-slate-300 leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Technology Stack Breakdown */}
          <div>
            <h4 className="text-lg font-bold font-display text-white mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              Comprehensive Technology Stack
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {project.techStack.map((group, idx) => (
                <div key={idx} className="p-4 bg-[#050816] border border-white/10 rounded-xl">
                  <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider block mb-2">{group.category}</span>
                  <ul className="space-y-1.5 text-xs text-slate-300">
                    {group.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Code Snippet / Simulation Script Viewer */}
          {project.codeSnippet && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold font-display text-white flex items-center gap-2">
                  <Code className="w-5 h-5 text-cyan-400" />
                  Core Source Code / Simulation Script
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-400">{project.codeSnippet.filename}</span>
                  <button
                    onClick={handleCopyCode}
                    className="p-1.5 bg-white/5 hover:bg-white/10 rounded-lg text-slate-300 hover:text-cyan-400 text-xs flex items-center gap-1 transition-colors"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>

              <div className="relative rounded-2xl bg-[#02040A] border border-cyan-500/30 p-4 font-mono text-xs overflow-x-auto text-cyan-300 shadow-inner">
                <pre><code>{project.codeSnippet.code}</code></pre>
              </div>
            </div>
          )}

          {/* Future Improvements */}
          <div className="p-5 bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/30 rounded-2xl">
            <h4 className="text-sm font-bold font-display text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Future Roadmap & Scalability
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              {project.futureImprovements.map((imp, idx) => (
                <li key={idx}>{imp}</li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-white/10 bg-[#050816]/90 backdrop-blur-md flex items-center justify-between">
          <span className="text-xs font-mono text-slate-400">Project ID: {project.id}</span>
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-blue-500/25 transition-all"
          >
            Close Case Study
          </button>
        </div>

      </div>
    </div>
  );
};
