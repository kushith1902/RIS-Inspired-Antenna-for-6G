import React, { useState } from 'react';
import { Rocket, ExternalLink, Github, FileText, ArrowRight, Layers, Cpu, CheckCircle } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { Project } from '../../types/portfolio';
import { ProjectDetailModal } from './ProjectDetailModal';

export const ProjectsSection: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'IoT & ML', 'Cloud & AI', 'Optical Comm', 'Wireless Comm'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/60 border border-blue-500/30 text-blue-300 text-xs font-mono mb-3">
            <Rocket className="w-3.5 h-3.5 text-cyan-400" />
            <span>FLAGSHIP ENGINEERING SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Featured ECE & Systems Projects
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mt-2">
            Real-world systems spanning low-power LoRa mesh telemetry, OptiSystem DWDM simulation, MATLAB RSMA visible light comm, and FastAPI cloud diagnostic platforms.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mt-4" />
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all border ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white border-blue-400 shadow-lg shadow-blue-500/30 font-semibold'
                  : 'bg-[#0B1120] text-slate-300 border-white/10 hover:border-cyan-500/40 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="engineering-card rounded-3xl overflow-hidden flex flex-col justify-between group"
            >
              {/* Thumbnail Container */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-[#0B1120]/40 to-transparent" />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-cyan-950/80 backdrop-blur-md text-cyan-300 border border-cyan-500/30 rounded-full text-xs font-mono">
                    {project.category}
                  </span>
                </div>

                {/* Key Metrics Quick Pill */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                  <span className="text-white font-bold bg-black/60 px-3 py-1 rounded-lg backdrop-blur-md border border-white/10">
                    {project.metrics[0]?.label}: <span className="text-cyan-400">{project.metrics[0]?.value}</span>
                  </span>
                  <span className="text-emerald-400 font-bold bg-emerald-950/80 px-3 py-1 rounded-lg backdrop-blur-md border border-emerald-500/30">
                    Verified Specs
                  </span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold font-display text-white group-hover:text-cyan-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-cyan-400 font-mono mt-1 mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-slate-300 text-xs leading-relaxed line-clamp-3 mb-4">
                    {project.description}
                  </p>

                  {/* Tech Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-slate-300 rounded text-[11px] font-mono">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Card Action Controls */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="flex items-center gap-2 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors group/btn"
                  >
                    <span>View Architecture & Metrics</span>
                    <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        title="GitHub Code"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveDemoUrl && (
                      <a
                        href={project.liveDemoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="p-2 text-slate-400 hover:text-cyan-400 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                        title="Live Demonstration"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        <ProjectDetailModal
          project={activeModalProject}
          onClose={() => setActiveModalProject(null)}
        />

      </div>
    </section>
  );
};
