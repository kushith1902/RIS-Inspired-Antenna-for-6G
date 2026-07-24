import React, { useState } from 'react';
import { Cpu, CircuitBoard, Terminal, Globe, Wrench, Radio, Activity, Wifi, Zap, Sun, Network, Code, Layers, Sliders, Binary, FileCode, Code2, Coffee, Brain, Layout, FileJson, Palette, Server, Database, GitBranch, Monitor, Sparkles, BookOpen } from 'lucide-react';
import { SKILL_CATEGORIES } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState<number>(0);

  // Helper icon mapper
  const getIcon = (iconName: string) => {
    const props = { className: "w-4 h-4" };
    switch (iconName) {
      case 'Radio': return <Radio {...props} />;
      case 'Activity': return <Activity {...props} />;
      case 'Wifi': return <Wifi {...props} />;
      case 'Zap': return <Zap {...props} />;
      case 'Sun': return <Sun {...props} />;
      case 'Network': return <Network {...props} />;
      case 'Cpu': return <Cpu {...props} />;
      case 'Code': return <Code {...props} />;
      case 'Terminal': return <Terminal {...props} />;
      case 'Layers': return <Layers {...props} />;
      case 'Sliders': return <Sliders {...props} />;
      case 'Binary': return <Binary {...props} />;
      case 'FileCode': return <FileCode {...props} />;
      case 'Code2': return <Code2 {...props} />;
      case 'Coffee': return <Coffee {...props} />;
      case 'Brain': return <Brain {...props} />;
      case 'Layout': return <Layout {...props} />;
      case 'FileJson': return <FileJson {...props} />;
      case 'Palette': return <Palette {...props} />;
      case 'Server': return <Server {...props} />;
      case 'Database': return <Database {...props} />;
      case 'GitBranch': return <GitBranch {...props} />;
      case 'Monitor': return <Monitor {...props} />;
      case 'Sparkles': return <Sparkles {...props} />;
      case 'BookOpen': return <BookOpen {...props} />;
      default: return <Cpu {...props} />;
    }
  };

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <CircuitBoard className="w-3.5 h-3.5 text-cyan-400" />
            <span>TECHNICAL PROFICIENCY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Categorized Skills & Tooling
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mt-2">
            Detailed proficiency metrics across Hardware EDA, Microcontrollers, Mathematical Modeling, and Web Cloud Stacks.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mt-4" />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {SKILL_CATEGORIES.map((cat, idx) => {
            const isActive = activeCategoryIndex === idx;
            return (
              <button
                key={cat.title}
                onClick={() => setActiveCategoryIndex(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono transition-all duration-200 border ${
                  isActive
                    ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/30 font-semibold scale-105'
                    : 'bg-[#0B1120] text-slate-300 border-white/10 hover:border-cyan-500/40 hover:text-white'
                }`}
              >
                {getIcon(cat.iconName)}
                <span>{cat.title}</span>
              </button>
            );
          })}
        </div>

        {/* Display Current Active Category Header */}
        <div className="bg-[#0B1120]/80 border border-white/10 rounded-2xl p-6 mb-8 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold font-display text-white flex items-center gap-2">
                {getIcon(SKILL_CATEGORIES[activeCategoryIndex].iconName)}
                <span>{SKILL_CATEGORIES[activeCategoryIndex].title}</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {SKILL_CATEGORIES[activeCategoryIndex].description}
              </p>
            </div>
            <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-3 py-1 rounded-full border border-cyan-500/30">
              {SKILL_CATEGORIES[activeCategoryIndex].skills.length} Technical Skills Verified
            </span>
          </div>
        </div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SKILL_CATEGORIES[activeCategoryIndex].skills.map((skill) => (
            <div
              key={skill.name}
              className="engineering-card rounded-2xl p-5 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center border border-white/10 text-cyan-400"
                      style={{ backgroundColor: `${skill.categoryColor}15` }}
                    >
                      {getIcon(skill.icon)}
                    </div>
                    <div>
                      <h4 className="font-bold text-white text-base group-hover:text-cyan-400 transition-colors">
                        {skill.name}
                      </h4>
                      <span className="text-[11px] font-mono text-slate-400">
                        Experience: {skill.experience}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/30">
                    3.0 / 5.0
                  </span>
                </div>

                {/* 5-Star Rating Indicator (3 out of 5 filled) */}
                <div className="flex items-center gap-1.5 mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <div
                      key={star}
                      className={`h-2 flex-1 rounded-full transition-all ${
                        star <= 3 ? 'bg-cyan-400 shadow-sm shadow-cyan-400' : 'bg-white/10'
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 pt-3 border-t border-white/5">
                <span>RATING: 3 / 5</span>
                <span style={{ color: skill.categoryColor }}>BEGINNER</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
