import React from 'react';
import { Cpu, Binary, Wifi, Globe, CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES } from '../../data/portfolioData';

export const ServicesSection: React.FC = () => {
  const getServiceIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-6 h-6 text-cyan-400" />;
      case 'Binary': return <Binary className="w-6 h-6 text-cyan-400" />;
      case 'Wifi': return <Wifi className="w-6 h-6 text-cyan-400" />;
      default: return <Globe className="w-6 h-6 text-cyan-400" />;
    }
  };

  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono mb-3">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span>CAPABILITIES & ENGINEERING SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Engineering Solutions & Consulting
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mt-2">
            Specialized technical services spanning hardware circuit prototyping, MATLAB simulation modeling, RF antenna optimization, and cloud software.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mt-4" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="engineering-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-2xl bg-cyan-950/80 border border-cyan-500/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:border-cyan-400 transition-all">
                  {getServiceIcon(srv.icon)}
                </div>

                <h3 className="text-xl font-bold font-display text-white mb-2 group-hover:text-cyan-400 transition-colors">
                  {srv.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  {srv.description}
                </p>

                <div className="mb-6">
                  <span className="text-[11px] font-mono text-cyan-400 uppercase font-bold tracking-wider block mb-2">Key Deliverables</span>
                  <div className="grid grid-cols-2 gap-2">
                    {srv.deliverables.map((d, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="truncate">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-2">
                <div className="flex flex-wrap gap-1.5">
                  {srv.techUsed.map((t) => (
                    <span key={t} className="px-2 py-0.5 bg-white/5 border border-white/10 text-slate-300 rounded text-[10px] font-mono">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href="#contact"
                  className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
