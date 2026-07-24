import React from 'react';
import { Briefcase, MapPin, CheckCircle2, Award, GraduationCap, Building } from 'lucide-react';
import { EXPERIENCES } from '../../data/portfolioData';

export const ExperienceTimeline: React.FC = () => {
  const educationData = [
    {
      institution: "Vellore Institute of Technology",
      degree: "Bachelor of Technology in Electronics and Communication Engineering",
      location: "Vellore, India",
      period: "Aug 2023 – Jul 2027 (Expected)",
      highlight: "Completed 6th Semester with CGPA of 9.05/10",
      badge: "CGPA 9.05 / 10"
    },
    {
      institution: "Narayana Group of Schools and Colleges",
      degree: "Intermediate (MPC - Mathematics, Physics, Chemistry)",
      location: "Andhra Pradesh, India",
      period: "Higher Secondary",
      highlight: "Secured 97.7% with strong fundamentals in Mathematics and Science",
      badge: "97.7% Score"
    },
    {
      institution: "Narayana Group of Schools",
      degree: "SSC (10th Class)",
      location: "Andhra Pradesh, India",
      period: "Secondary School",
      highlight: "Achieved 100% academic performance with a strong educational foundation",
      badge: "100% Performance"
    }
  ];

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>EDUCATION & WORK EXPERIENCE</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Education & Professional Journey
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mt-2">
            Academic milestones at VIT Vellore and industrial experience at RKM PowerGen Ltd and Gravitas 2025.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-600 rounded-full mt-4" />
        </div>

        {/* Education Section Grid */}
        <div className="mb-16">
          <h3 className="text-xl font-bold font-display text-white mb-6 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-cyan-400" />
            <span>Education</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {educationData.map((edu, idx) => (
              <div key={idx} className="engineering-card rounded-2xl p-6 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 bg-cyan-950 text-cyan-300 border border-cyan-500/30 rounded text-[11px] font-mono">
                      {edu.badge}
                    </span>
                    <span className="text-[11px] font-mono text-slate-400">{edu.period}</span>
                  </div>

                  <h4 className="text-base font-bold font-display text-white group-hover:text-cyan-400 transition-colors">
                    {edu.institution}
                  </h4>
                  <p className="text-xs font-semibold text-slate-300 mt-1 mb-3">
                    {edu.degree}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {edu.highlight}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400" />
                    {edu.location}
                  </span>
                  <span className="text-emerald-400 font-bold">Verified</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline Section */}
        <div>
          <h3 className="text-xl font-bold font-display text-white mb-8 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-cyan-400" />
            <span>Industrial Experience & Leadership</span>
          </h3>

          <div className="relative border-l-2 border-cyan-500/30 ml-4 sm:ml-32 space-y-12 pl-6 sm:pl-10">
            {EXPERIENCES.map((exp) => (
              <div key={exp.id} className="relative group">
                
                {/* Node Icon */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-8 h-8 rounded-full bg-[#050816] border-2 border-cyan-400 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/30 group-hover:bg-cyan-500 group-hover:text-black transition-all">
                  <Building className="w-4 h-4" />
                </div>

                {/* Period Badge */}
                <div className="sm:absolute sm:-left-36 sm:top-2 mb-2 sm:mb-0 text-xs font-mono text-cyan-400 font-semibold bg-cyan-950/60 px-2.5 py-1 rounded-lg border border-cyan-500/30 w-fit">
                  {exp.period}
                </div>

                {/* Experience Card */}
                <div className="engineering-card rounded-2xl p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <div>
                      <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest">{exp.type}</span>
                      <h4 className="text-xl font-bold font-display text-white mt-0.5">{exp.role}</h4>
                      <h5 className="text-sm font-semibold text-slate-300">{exp.company}</h5>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-slate-400 bg-white/5 px-3 py-1 rounded-lg border border-white/10 w-fit">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6 text-slate-300 text-xs leading-relaxed">
                    {exp.description.map((desc, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                    {exp.technologies.map((tech) => (
                      <span key={tech} className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-cyan-300 text-[11px] font-mono rounded">
                        {tech}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
