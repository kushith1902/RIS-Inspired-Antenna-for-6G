import React, { useState, useEffect } from 'react';
import { Terminal, Download, Rocket, Send, Radio, Cpu, Github, Linkedin, Mail, CheckCircle2, ChevronDown, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { downloadResumePDF } from '../../utils/downloadResume';

interface HeroSectionProps {
  onOpenTerminal: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenTerminal }) => {
  const [designationIndex, setDesignationIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  useEffect(() => {
    const currentFullText = PERSONAL_INFO.designations[designationIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(currentFullText.substring(0, displayText.length + 1));
        if (displayText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2000);
          setTypingSpeed(50);
        }
      } else {
        setDisplayText(currentFullText.substring(0, displayText.length - 1));
        if (displayText === '') {
          setIsDeleting(false);
          setDesignationIndex((prev) => (prev + 1) % PERSONAL_INFO.designations.length);
          setTypingSpeed(100);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, designationIndex, typingSpeed]);

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono w-fit backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-semibold text-emerald-400">Available</span>
              <span className="text-slate-400">|</span>
              <span>Electronics & Communication Engineer</span>
            </div>

            {/* Main Name & Title */}
            <div>
              <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight font-display">
                Hello, I'm <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">{PERSONAL_INFO.name}</span>
              </h1>

              {/* Typing Effect Designation */}
              <div className="h-12 mt-3 flex items-center">
                <span className="text-xl sm:text-2xl font-mono text-cyan-400 font-medium">
                  {displayText}
                </span>
                <span className="w-0.5 h-6 bg-cyan-400 ml-1 animate-pulse" />
              </div>
            </div>

            {/* Bio Brief */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl">
              {PERSONAL_INFO.bio}
            </p>

            {/* Engineering Highlights Quick Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {['Embedded Systems', 'RF Engineering', 'MATLAB', 'LoRa IoT', 'WDM Optics', 'VLC Comm'].map((badge) => (
                <span key={badge} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-mono text-slate-300 flex items-center gap-1.5">
                  <Cpu className="w-3 h-3 text-cyan-400" />
                  {badge}
                </span>
              ))}
            </div>

            {/* CTA Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <a
                href="#projects"
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-500/25 transition-all hover:scale-105 active:scale-95"
              >
                <Rocket className="w-4 h-4" />
                <span>Explore Projects</span>
              </a>

              <button
                onClick={downloadResumePDF}
                className="flex items-center gap-2 px-5 py-3 bg-[#0F172A] hover:bg-slate-800 text-slate-200 border border-white/10 text-sm font-medium rounded-xl transition-all hover:border-cyan-500/40 cursor-pointer"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download Resume PDF</span>
              </button>

              <button
                onClick={onOpenTerminal}
                className="flex items-center gap-2 px-5 py-3 bg-cyan-950/40 hover:bg-cyan-900/60 text-cyan-300 border border-cyan-500/40 text-sm font-mono rounded-xl transition-all hover:shadow-lg hover:shadow-cyan-500/20"
              >
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Launch CLI</span>
              </button>
            </div>

            {/* Social Links & Quick Contact */}
            <div className="flex items-center gap-4 pt-4 border-t border-white/10">
              <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Connect:</span>
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <Github className="w-4 h-4" />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" className="p-2 text-slate-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} className="p-2 text-slate-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors">
                <Mail className="w-4 h-4" />
              </a>
              <span className="text-xs text-slate-400 font-mono ml-auto">CGPA: <strong className="text-emerald-400 font-bold">{PERSONAL_INFO.cgpa}</strong></span>
            </div>

          </div>

          {/* Right Column: Hardware Radar & Profile Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              
              {/* Animated Radar Sweep Background */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/10 to-transparent blur-xl" />

              {/* Engineering Hardware Blueprint Frame */}
              <div className="relative bg-[#0B1120]/90 border border-cyan-500/30 rounded-3xl p-6 backdrop-blur-xl shadow-2xl overflow-hidden group">
                
                {/* Chip Corner Pin Visual Accents */}
                <div className="absolute top-2 left-2 flex gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                </div>
                <div className="absolute top-3 right-4 text-[10px] font-mono text-cyan-400/70 uppercase">
                  IC-SPEC // ECE-2025
                </div>

                {/* Radar Grid Graphic */}
                <div className="relative w-full h-64 rounded-2xl bg-[#050816] border border-white/10 overflow-hidden flex items-center justify-center mb-6">
                  {/* Radar Concentric Rings */}
                  <div className="absolute w-48 h-48 rounded-full border border-cyan-500/20" />
                  <div className="absolute w-32 h-32 rounded-full border border-cyan-500/30" />
                  <div className="absolute w-16 h-16 rounded-full border border-cyan-500/40" />
                  
                  {/* Radar Sweep Line */}
                  <div className="radar-sweep" />

                  {/* Central Avatar Icon */}
                  <div className="relative z-10 flex flex-col items-center justify-center gap-2 text-center p-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 p-[2px] shadow-lg shadow-cyan-500/30">
                      <div className="w-full h-full bg-[#0B1120] rounded-full flex items-center justify-center">
                        <Radio className="w-10 h-10 text-cyan-400 animate-pulse" />
                      </div>
                    </div>
                    <span className="font-display font-bold text-white text-base mt-1">RF & Embedded Core</span>
                    <span className="text-[11px] font-mono text-cyan-300 bg-cyan-950/80 px-2.5 py-0.5 rounded-full border border-cyan-500/30">
                      868MHz LoRa / WDM Optics / MATLAB
                    </span>
                  </div>
                </div>

                {/* Live Engineering Metrics Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">CGPA Score</span>
                    <p className="text-xl font-bold font-display text-emerald-400">9.05 / 10</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Research Works</span>
                    <p className="text-xl font-bold font-display text-cyan-400">2 Research Works</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Flagship Projects</span>
                    <p className="text-xl font-bold font-display text-indigo-400">4 Core Systems</p>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                    <span className="text-[10px] font-mono text-slate-400 uppercase">Simulations</span>
                    <p className="text-xl font-bold font-display text-purple-400">MATLAB & OptiSystem</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-12">
          <a href="#about" className="flex flex-col items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors text-xs font-mono group">
            <span>SCROLL TO EXPLORE</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-cyan-400" />
          </a>
        </div>

      </div>
    </section>
  );
};
