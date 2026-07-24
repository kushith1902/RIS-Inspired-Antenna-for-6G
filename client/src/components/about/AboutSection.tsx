import React from 'react';
import { Cpu, Award, BookOpen, Radio, CheckCircle, Zap, Shield, Sparkles } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  const coreCompetencies = [
    { name: "RF & Antenna Engineering", desc: "Ansys HFSS, Cadence RF, Microwave patch antennas, S-parameters, Impedance matching" },
    { name: "MATLAB System Modeling", desc: "Digital signal processing, Rate-Splitting Multiple Access (RSMA), Convex optimization" },
    { name: "Optical WDM Networks", desc: "OptiSystem 18.0 simulation, Raman amplifier noise modeling, BER & Q-Factor optimization" },
    { name: "IoT Telemetry & Sensors", desc: "LoRa 868MHz wireless telemetry, environmental sensor interfacing, Python ML data pipeline" }
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>ENGINEERING BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            About Me & Technical Vision
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mt-3" />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Academic & Technical Summary Card */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="engineering-card rounded-2xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <h3 className="text-xl font-bold font-display text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-cyan-400" />
                Academic Summary
              </h3>

              <div className="space-y-4 text-slate-300 text-sm leading-relaxed">
                <p>
                  I am a <strong className="text-white">Final-Year Electronics & Communication Engineering (ECE)</strong> undergraduate at <strong className="text-cyan-400">Vellore Institute of Technology</strong> with a strong academic record (<strong className="text-emerald-400">CGPA {PERSONAL_INFO.cgpa}</strong>).
                </p>
                <p>
                  My engineering journey bridges physical hardware, electro-magnetic wave theory, low-power embedded firmware, mathematical simulations, and high-performance modern web platforms.
                </p>
                <p>
                  Whether simulating complex 100km DWDM optical fiber links in OptiSystem, formulating convex rate-splitting optimization in MATLAB, or writing embedded C firmware for 12km LoRa mesh disaster nodes, I strive for mathematical rigor and production reliability.
                </p>
              </div>

              {/* Quick Details Table */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3 font-mono text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Degree:</span>
                  <span className="text-cyan-300 font-semibold">B.Tech Electronics & Comm (ECE)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">CGPA Score:</span>
                  <span className="text-emerald-400 font-semibold">{PERSONAL_INFO.cgpa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Focus Areas:</span>
                  <span className="text-white font-semibold">Embedded, RF, Wireless, IoT & AI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Primary Location:</span>
                  <span className="text-slate-300">{PERSONAL_INFO.location}</span>
                </div>
              </div>

            </div>

            {/* Quick Fact Banner */}
            <div className="bg-gradient-to-r from-blue-900/40 to-cyan-900/40 border border-cyan-500/30 rounded-xl p-5 flex items-center gap-4">
              <div className="p-3 bg-cyan-500/20 rounded-xl">
                <Sparkles className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white font-display">Targeting Top Tech Engineering Roles</h4>
                <p className="text-xs text-slate-300 mt-0.5">Ready for Embedded Software, RF Hardware, IoT Architect, or Full-Stack Engineering positions.</p>
              </div>
            </div>

          </div>

          {/* Right Column: Core Competencies Cards */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {coreCompetencies.map((comp, idx) => (
              <div key={idx} className="engineering-card rounded-xl p-5 flex flex-col justify-between group">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-500/30 flex items-center justify-center mb-3 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                    <CheckCircle className="w-4 h-4" />
                  </div>
                  <h4 className="text-base font-bold font-display text-white mb-1 group-hover:text-cyan-400 transition-colors">
                    {comp.name}
                  </h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {comp.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <span>ENGINEERING COMPONENT</span>
                  <span className="text-cyan-400">0{idx + 1}</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
