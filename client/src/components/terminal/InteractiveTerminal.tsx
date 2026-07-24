import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import { PERSONAL_INFO, SKILL_CATEGORIES, PROJECTS, RESEARCH_PAPERS } from '../../data/portfolioData';

interface InteractiveTerminalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const InteractiveTerminal: React.FC<InteractiveTerminalProps> = ({ isOpen, onClose }) => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'welcome',
      output: (
        <div className="space-y-1 text-cyan-300">
          <p className="font-bold text-white">Varsha S - Interactive Engineering Terminal v2.4.0 (ECE Micro-Kernel)</p>
          <p>Type <span className="text-emerald-400 font-bold">'help'</span> to view available commands.</p>
        </div>
      )
    }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    let outputNode: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <p className="text-cyan-400 font-bold">Available CLI Commands:</p>
            <p><span className="text-emerald-400 font-bold">about</span> - Display ECE engineer background & CGPA</p>
            <p><span className="text-emerald-400 font-bold">skills</span> - List categorized technical proficiency</p>
            <p><span className="text-emerald-400 font-bold">projects</span> - View 4 flagship engineering projects</p>
            <p><span className="text-emerald-400 font-bold">research</span> - Read IEEE & Springer paper abstracts</p>
            <p><span className="text-emerald-400 font-bold">contact</span> - Show email, location & social links</p>
            <p><span className="text-emerald-400 font-bold">resume</span> - Download official Engineering Resume PDF</p>
            <p><span className="text-emerald-400 font-bold">clear</span> - Clear terminal buffer screen</p>
          </div>
        );
        break;

      case 'about':
      case 'bio':
        outputNode = (
          <div className="space-y-1 text-slate-200">
            <p className="text-cyan-400 font-bold">{PERSONAL_INFO.name} ({PERSONAL_INFO.title})</p>
            <p>University: {PERSONAL_INFO.university}</p>
            <p>Academic CGPA: <span className="text-emerald-400 font-bold">{PERSONAL_INFO.cgpa}</span></p>
            <p className="text-slate-400">{PERSONAL_INFO.bio}</p>
          </div>
        );
        break;

      case 'skills':
        outputNode = (
          <div className="space-y-2">
            {SKILL_CATEGORIES.map((cat) => (
              <div key={cat.title}>
                <p className="text-cyan-400 font-bold">{cat.title}:</p>
                <p className="text-slate-300">
                  {cat.skills.map(s => `${s.name} (${s.level}%)`).join(', ')}
                </p>
              </div>
            ))}
          </div>
        );
        break;

      case 'projects':
        outputNode = (
          <div className="space-y-2">
            {PROJECTS.map((p, idx) => (
              <div key={p.id} className="text-slate-300">
                <p className="text-cyan-400 font-bold">[{idx + 1}] {p.title}</p>
                <p className="text-xs text-slate-400">{p.subtitle}</p>
                <p className="text-xs text-emerald-400">Category: {p.category} | Metrics: {p.metrics[0].label}: {p.metrics[0].value}</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'research':
        outputNode = (
          <div className="space-y-2">
            {RESEARCH_PAPERS.map((rp) => (
              <div key={rp.id} className="text-slate-300">
                <p className="text-purple-400 font-bold">{rp.title}</p>
                <p className="text-xs text-slate-400">Venue: {rp.conferenceOrJournal} ({rp.year}) - [{rp.status}]</p>
              </div>
            ))}
          </div>
        );
        break;

      case 'contact':
        outputNode = (
          <div className="space-y-1 text-slate-300">
            <p>Email: <a href={`mailto:${PERSONAL_INFO.email}`} className="text-cyan-400 underline">{PERSONAL_INFO.email}</a></p>
            <p>GitHub: <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PERSONAL_INFO.github}</a></p>
            <p>LinkedIn: <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{PERSONAL_INFO.linkedin}</a></p>
          </div>
        );
        break;

      case 'resume':
        outputNode = (
          <div className="text-emerald-400 font-bold">
            [+] Initiating Resume PDF Download Stream... Completed.
          </div>
        );
        break;

      case 'clear':
        setHistory([]);
        setInput('');
        return;

      case 'sudo':
        outputNode = (
          <div className="text-amber-400 font-bold">
            Permission denied: User is already operating as Principal Hardware Engineer.
          </div>
        );
        break;

      default:
        outputNode = (
          <div className="text-rose-400 font-mono">
            Command not recognized: '{cmd}'. Type 'help' for command list.
          </div>
        );
    }

    setHistory((prev) => [...prev, { command: input, output: outputNode }]);
    setInput('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-[#02040A] border border-cyan-500/40 rounded-2xl shadow-2xl shadow-cyan-500/10 overflow-hidden flex flex-col h-[520px]">
        
        {/* Terminal Header */}
        <div className="bg-[#0B1120] border-b border-white/10 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80 cursor-pointer" onClick={onClose} />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-mono text-cyan-400 ml-2 flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5" />
              ece-terminal@varsha-workstation:~
            </span>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white text-xs font-mono">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Terminal Content Buffer */}
        <div className="p-4 font-mono text-xs overflow-y-auto flex-1 space-y-4 text-slate-200">
          {history.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex items-center gap-2 text-cyan-400">
                <span>varsha@ece-node:~$</span>
                <span className="text-white font-semibold">{item.command}</span>
              </div>
              <div className="pl-4">{item.output}</div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input Form */}
        <form onSubmit={handleCommand} className="bg-[#0B1120] border-t border-white/10 px-4 py-3 flex items-center gap-2">
          <span className="text-cyan-400 font-mono text-xs font-bold">varsha@ece-node:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type 'help' for options..."
            className="flex-1 bg-transparent text-xs font-mono text-white focus:outline-none placeholder:text-slate-500"
          />
          <button type="submit" className="text-cyan-400 hover:text-white">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};
