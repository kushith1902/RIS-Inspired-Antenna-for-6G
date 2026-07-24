import React, { useState } from 'react';
import { Award, ExternalLink, ShieldCheck, CheckCircle2, FileText } from 'lucide-react';
import { CERTIFICATIONS } from '../../data/portfolioData';
import { Certification } from '../../types/portfolio';
import { CertificateModal } from './CertificateModal';

export const CertificationsSection: React.FC = () => {
  const [activeCert, setActiveCert] = useState<Certification | null>(null);

  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs font-mono mb-3">
            <Award className="w-3.5 h-3.5 text-emerald-400" />
            <span>INDUSTRY CERTIFICATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            Verified Credentials & Elite Badges
          </h2>
          <p className="text-slate-300 text-sm max-w-xl mt-2">
            Professional certifications from ARM, Ansys, DeepLearning.AI, and Meta validating domain mastery.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-400 to-cyan-500 rounded-full mt-4" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {CERTIFICATIONS.map((cert) => (
            <div
              key={cert.id}
              className="engineering-card rounded-2xl p-6 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">{cert.issuer}</span>
                    <h3 className="text-lg font-bold font-display text-white mt-1 group-hover:text-cyan-400 transition-colors">
                      {cert.title}
                    </h3>
                  </div>
                  <span className="text-xs font-mono text-slate-400 bg-white/5 px-2.5 py-1 rounded border border-white/10 shrink-0">
                    {cert.date}
                  </span>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {cert.skills.map((skill) => (
                    <span key={skill} className="px-2.5 py-0.5 bg-white/5 border border-white/10 text-slate-300 rounded text-[11px] font-mono">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">ID: {cert.credentialId}</span>
                <button
                  onClick={() => setActiveCert(cert)}
                  className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>View Certificate</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Modal */}
        <CertificateModal
          cert={activeCert}
          onClose={() => setActiveCert(null)}
        />

      </div>
    </section>
  );
};
