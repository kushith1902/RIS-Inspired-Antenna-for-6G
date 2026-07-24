import React from 'react';
import { Cpu, ArrowUp, Github, Linkedin, Mail, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { downloadResumePDF } from '../../utils/downloadResume';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#070B14] border-t border-white/10 pt-16 pb-12 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          
          {/* Column 1: Brand */}
          <div className="md:col-span-5 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-400 p-[1px]">
                <div className="w-full h-full bg-[#0F172A] rounded-[11px] flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                {PERSONAL_INFO.name}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm font-sans">
              Electronics & Communication Engineering showcase highlighting Embedded Systems, Cadence RF Design, MATLAB simulations, WDM Optics, and IoT telemetry.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="p-2.5 text-slate-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="p-2.5 text-slate-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="p-2.5 text-slate-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 transition-colors">
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="md:col-span-3 font-mono text-xs space-y-3">
            <span className="text-white font-bold block uppercase tracking-wider mb-4">Engineering Sections</span>
            <a href="#about" className="block text-slate-400 hover:text-cyan-400 transition-colors">01. Academic Summary</a>
            <a href="#skills" className="block text-slate-400 hover:text-cyan-400 transition-colors">02. Skill Matrix</a>
            <a href="#projects" className="block text-slate-400 hover:text-cyan-400 transition-colors">03. Flagship Projects</a>
            <a href="#research" className="block text-slate-400 hover:text-cyan-400 transition-colors">04. Research Works</a>
            <a href="#experience" className="block text-slate-400 hover:text-cyan-400 transition-colors">05. Work & Education</a>
          </div>

          {/* Column 3: Contact & Status */}
          <div className="md:col-span-4 font-mono text-xs space-y-3">
            <span className="text-white font-bold block uppercase tracking-wider mb-4">Engineering Status</span>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-bold">Status: Available</span>
              </div>
              <p className="text-[11px] text-slate-400 font-sans">
                Seeking Embedded Systems / RF Engineering roles.
              </p>
            </div>

            <button
              onClick={downloadResumePDF}
              className="flex items-center justify-center gap-2 w-full py-2 bg-indigo-950/80 hover:bg-indigo-900 text-indigo-300 border border-indigo-500/30 rounded-xl transition-colors font-semibold cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Download Resume PDF</span>
            </button>
          </div>

        </div>

        {/* Bottom Credits Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
          <div>
            © {new Date().getFullYear()} {PERSONAL_INFO.name}. Built with React 19, TypeScript & TailwindCSS.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-cyan-400 rounded-lg border border-white/10 transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
};
